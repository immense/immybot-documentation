# Custom Integrations

This guide explains how to build custom integrations with ImmyBot, allowing you to connect with systems that don't have built-in integration support.

## Understanding Custom Integrations

ImmyBot provides several ways to integrate with external systems:

1. **API Integration**: Using the ImmyBot API to interact with the platform
2. **Webhook Integration**: Receiving event notifications from ImmyBot
3. **Custom RMM Integration**: Creating a custom RMM integration for computer discovery
4. **Custom PSA Integration**: Creating a custom PSA integration for customer management
5. **Metascript Integration**: Using Metascripts to orchestrate complex integration workflows

## Prerequisites

Before building a custom integration, you'll need:

- API access to both ImmyBot and the external system
- Authentication credentials for both systems
- Understanding of the data structures in both systems
- Knowledge of PowerShell or another programming language
- Development environment for testing

## API Integration

The most common approach to custom integration is using the ImmyBot API.

### Authentication

First, create an API key in ImmyBot:

1. Navigate to **Show more** > **OAuth Tokens**
2. Click **Create API Key**
3. Enter a name and description
4. Select the appropriate permissions
5. Click **Create**
6. Copy and securely store the API key

### Making API Requests

Use the API key in the `Authorization` header:

```powershell
$apiKey = "YOUR_API_KEY"
$baseUrl = "https://yourdomain.immy.bot/api/v1"

$headers = @{
    "Authorization" = "Bearer $apiKey"
}

$response = Invoke-RestMethod -Uri "$baseUrl/computers" -Headers $headers -Method Get
```

See the [API Documentation](./api-documentation.md) for a complete reference of available endpoints.

## Webhook Integration

Webhooks allow ImmyBot to send notifications to your system when events occur.

### Configuring Webhooks

1. Navigate to **Show more** > **Integrations** > **Webhooks**
2. Click **Create Webhook**
3. Enter a name and description
4. Enter the destination URL (your system's endpoint)
5. Select the events to trigger the webhook
6. Configure any additional options
7. Click **Save**

### Receiving Webhooks

Create an endpoint in your system to receive the webhook data:

```csharp
// Example ASP.NET Core controller
[ApiController]
[Route("api/webhooks/immybot")]
public class ImmyBotWebhookController : ControllerBase
{
    [HttpPost]
    public IActionResult ReceiveWebhook([FromBody] WebhookPayload payload)
    {
        // Process the webhook data
        switch (payload.EventType)
        {
            case "session.completed":
                ProcessCompletedSession(payload.Data);
                break;
            case "computer.added":
                ProcessNewComputer(payload.Data);
                break;
            // Handle other event types
        }
        
        return Ok();
    }
}
```

## Custom RMM Integration

If you need to integrate with an RMM system that doesn't have built-in support, you can create a custom RMM integration.

### Integration Components

A custom RMM integration typically includes:

1. **Computer Discovery**: Retrieving computer information from the RMM
2. **Customer Mapping**: Mapping RMM customers to ImmyBot tenants
3. **Remote Control**: Enabling remote control through the RMM
4. **Status Synchronization**: Keeping computer status in sync

### Implementation Example

Here's a simplified example of a custom RMM integration using PowerShell:

```powershell
# Configuration
$immyApiKey = "YOUR_IMMY_API_KEY"
$immyBaseUrl = "https://yourdomain.immy.bot/api/v1"
$rmmApiKey = "YOUR_RMM_API_KEY"
$rmmBaseUrl = "https://your-rmm-provider.com/api"

# Set up headers
$immyHeaders = @{
    "Authorization" = "Bearer $immyApiKey"
    "Content-Type" = "application/json"
}
$rmmHeaders = @{
    "Authorization" = "Bearer $rmmApiKey"
    "Content-Type" = "application/json"
}

# Get customers from RMM
$rmmCustomers = Invoke-RestMethod -Uri "$rmmBaseUrl/customers" -Headers $rmmHeaders -Method Get

# Map customers to ImmyBot tenants
foreach ($customer in $rmmCustomers) {
    # Check if tenant exists
    $tenantResponse = Invoke-RestMethod -Uri "$immyBaseUrl/tenants?name=$($customer.name)" -Headers $immyHeaders -Method Get
    
    if ($tenantResponse.total -eq 0) {
        # Create tenant
        $tenantData = @{
            name = $customer.name
            external_id = $customer.id
            integration_source = "Custom RMM"
        } | ConvertTo-Json
        
        $newTenant = Invoke-RestMethod -Uri "$immyBaseUrl/tenants" -Headers $immyHeaders -Method Post -Body $tenantData
        $tenantId = $newTenant.id
    } else {
        $tenantId = $tenantResponse.tenants[0].id
    }
    
    # Get computers for this customer
    $rmmComputers = Invoke-RestMethod -Uri "$rmmBaseUrl/customers/$($customer.id)/computers" -Headers $rmmHeaders -Method Get
    
    # Import computers to ImmyBot
    foreach ($computer in $rmmComputers) {
        $computerData = @{
            name = $computer.hostname
            tenant_id = $tenantId
            external_id = $computer.id
            os = $computer.operating_system
            status = if ($computer.online) { "Online" } else { "Offline" }
            integration_source = "Custom RMM"
            properties = @{
                ip_address = $computer.ip_address
                mac_address = $computer.mac_address
                manufacturer = $computer.manufacturer
                model = $computer.model
            }
        } | ConvertTo-Json
        
        # Check if computer exists
        $computerResponse = Invoke-RestMethod -Uri "$immyBaseUrl/computers?external_id=$($computer.id)" -Headers $immyHeaders -Method Get
        
        if ($computerResponse.total -eq 0) {
            # Create computer
            Invoke-RestMethod -Uri "$immyBaseUrl/computers" -Headers $immyHeaders -Method Post -Body $computerData
        } else {
            # Update computer
            $computerId = $computerResponse.computers[0].id
            Invoke-RestMethod -Uri "$immyBaseUrl/computers/$computerId" -Headers $immyHeaders -Method Put -Body $computerData
        }
    }
}
```

## Custom PSA Integration

A custom PSA integration allows you to connect ImmyBot with your PSA system for customer management and ticketing.

### Integration Components

A custom PSA integration typically includes:

1. **Customer Synchronization**: Importing customers from the PSA
2. **Ticket Creation**: Creating tickets in the PSA for ImmyBot events
3. **User Mapping**: Mapping users between systems
4. **Time Tracking**: Recording time spent on maintenance

### Implementation Example

Here's a simplified example of a custom PSA integration for ticket creation:

```powershell
# Configuration
$immyApiKey = "YOUR_IMMY_API_KEY"
$immyBaseUrl = "https://yourdomain.immy.bot/api/v1"
$psaApiKey = "YOUR_PSA_API_KEY"
$psaBaseUrl = "https://your-psa-provider.com/api"

# Set up headers
$immyHeaders = @{
    "Authorization" = "Bearer $immyApiKey"
    "Content-Type" = "application/json"
}
$psaHeaders = @{
    "Authorization" = "Bearer $psaApiKey"
    "Content-Type" = "application/json"
}

# Function to create a ticket in the PSA
function Create-PsaTicket {
    param (
        [string]$CustomerId,
        [string]$Summary,
        [string]$Description,
        [string]$Priority = "Medium"
    )
    
    $ticketData = @{
        customer_id = $CustomerId
        summary = $Summary
        description = $Description
        priority = $Priority
        status = "New"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$psaBaseUrl/tickets" -Headers $psaHeaders -Method Post -Body $ticketData
    return $response
}

# Get failed maintenance sessions
$failedSessions = Invoke-RestMethod -Uri "$immyBaseUrl/sessions?status=Failed" -Headers $immyHeaders -Method Get

# Create tickets for failed sessions
foreach ($session in $failedSessions.sessions) {
    # Get computer details
    $computer = Invoke-RestMethod -Uri "$immyBaseUrl/computers/$($session.computer_id)" -Headers $immyHeaders -Method Get
    
    # Get tenant details
    $tenant = Invoke-RestMethod -Uri "$immyBaseUrl/tenants/$($computer.tenant_id)" -Headers $immyHeaders -Method Get
    
    # Get PSA customer ID from tenant external_id
    $psaCustomerId = $tenant.external_id
    
    # Create ticket summary and description
    $summary = "ImmyBot Maintenance Failed: $($computer.name)"
    $description = @"
Maintenance session failed on computer $($computer.name).

Session ID: $($session.id)
Start Time: $($session.start_time)
End Time: $($session.end_time)

Failed Actions:
"@
    
    # Get session details
    $sessionDetails = Invoke-RestMethod -Uri "$immyBaseUrl/sessions/$($session.id)" -Headers $immyHeaders -Method Get
    
    # Add failed actions to description
    foreach ($action in $sessionDetails.actions | Where-Object { $_.status -eq "Failed" }) {
        $description += "`n- $($action.deployment_name): $($action.details)"
    }
    
    # Create ticket in PSA
    Create-PsaTicket -CustomerId $psaCustomerId -Summary $summary -Description $description -Priority "High"
}
```

## Metascript Integration

Metascripts provide a powerful way to create complex integrations that can orchestrate actions across multiple systems.

### Creating a Metascript Integration

1. Navigate to **Tasks**
2. Click **Create Task**
3. Select **Metascript** as the execution context
4. Write your integration script
5. Save the task
6. Create a deployment to run the task on a schedule

### Example: Synchronizing User Information

```powershell
# Get users from external system
$externalUsers = Get-ExternalUsers  # Replace with your actual function

# Get ImmyBot tenants
$tenants = Get-ImmyTenants

foreach ($tenant in $tenants) {
    # Filter users for this tenant
    $tenantUsers = $externalUsers | Where-Object { $_.CompanyId -eq $tenant.external_id }
    
    foreach ($user in $tenantUsers) {
        # Check if user exists in ImmyBot
        $existingUser = Get-ImmyUser -Email $user.Email
        
        if ($existingUser) {
            # Update user
            Update-ImmyUser -UserId $existingUser.Id -Properties @{
                FirstName = $user.FirstName
                LastName = $user.LastName
                Phone = $user.Phone
                Department = $user.Department
                Title = $user.Title
            }
        } else {
            # Create user
            New-ImmyUser -TenantId $tenant.Id -Properties @{
                Email = $user.Email
                FirstName = $user.FirstName
                LastName = $user.LastName
                Phone = $user.Phone
                Department = $user.Department
                Title = $user.Title
            }
        }
    }
}
```

## Best Practices

Follow these best practices for successful custom integrations:

1. **Error Handling**: Implement robust error handling and logging
2. **Idempotence**: Design integrations to be safely re-runnable
3. **Rate Limiting**: Respect API rate limits for both systems
4. **Incremental Updates**: Process only changed data when possible
5. **Secure Credentials**: Store API keys and credentials securely
6. **Testing**: Test thoroughly in a non-production environment
7. **Documentation**: Document your integration for future maintenance
8. **Monitoring**: Implement monitoring to detect integration failures

## Troubleshooting

If you encounter issues with your custom integration:

1. **Check API Responses**: Examine the full response from both APIs
2. **Review Logs**: Check logs for error messages
3. **Verify Credentials**: Ensure API keys are valid and have appropriate permissions
4. **Test Connectivity**: Verify network connectivity to both systems
5. **Validate Data**: Ensure data formats match expectations
6. **Check Rate Limits**: Verify you're not hitting API rate limits

## Next Steps

Now that you understand how to build custom integrations with ImmyBot, you might want to explore:

- [API Documentation](./api-documentation.md) - Complete reference for the ImmyBot API
- [Scripting Guide](./scripts.md) - Master the art of scripting in ImmyBot
- [Metascripts / Cloud Scripts](./immy-commands.md) - Learn about advanced scripting capabilities

---

**Next Steps:** [API Documentation →](./api-documentation.md) | [Scripting Guide →](./scripts.md)
