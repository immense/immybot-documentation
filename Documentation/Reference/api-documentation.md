# API Documentation

ImmyBot provides a comprehensive API that allows you to integrate with and extend the platform. This guide explains how to authenticate, make requests, and use the available endpoints.

## API Overview

The ImmyBot API is a RESTful API that uses standard HTTP methods and returns JSON responses. You can use the API to:

- Manage computers and users
- Create and update deployments
- Run maintenance sessions
- Retrieve inventory information
- Automate workflows
- Integrate with other systems

### API Documentation with Swagger

ImmyBot provides interactive API documentation through Swagger UI, which allows you to explore and test all available endpoints directly in your browser:

1. Navigate to `https://yourdomain.immy.bot/swagger` (replace "yourdomain" with your ImmyBot instance name)
2. Browse the available endpoints organized by category
3. Expand any endpoint to see details about parameters, request body format, and response schemas
4. Test endpoints directly from the Swagger UI by providing required parameters and your API key

## Authentication

All API requests require authentication using an API key.

1. **Create an App Registration in Microsoft Entra ID (Azure AD)**:
   - Navigate to [Microsoft Entra ID App Registrations](https://entra.microsoft.com/#view/Microsoft_AAD_RegisteredApps/CreateApplicationBlade/quickStartType~/null/isMSAApp~/false)
   - Create a new registration with default settings, do not change anything except what is required
   - Click Register
   - Copy the Client (Application) ID for later use.

2. **Create a Client Secret**:
   - In your App Registration, go to "Certificates & Secrets"
   - Create a new client secret and copy its VALUE (not the ID)

3. **Configure ImmyBot Access**:
   - Navigate to the Enterprise App (click the "Managed Application" link in the App Registration)
   - Copy the object ID of the Enterprise App
   - In ImmyBot, go to Show More → People → New
   - Paste the Enterprise App's object ID into the "AD External ID" field
   - Create a user from this person and grant admin privileges

### Using API Keys

Include your API key in the `Authorization` header of all requests:

```
Authorization: Bearer YOUR_API_KEY
```

Example:

```powershell
# Configuration Variables
$AzureDomain = ''          # Your domain, e.g., contoso.com
$ClientID = ''             # Application (Client) ID from App Registration
$Secret = ''               # Client Secret value from App Registration
$InstanceSubdomain = ''    # Your ImmyBot instance subdomain name (without .immy.bot)

# Authentication Setup
$TokenEndpointUri = [uri](Invoke-RestMethod "https://login.windows.net/$AzureDomain/.well-known/openid-configuration").token_endpoint
$TenantID = ($TokenEndpointUri.Segments | Select-Object -Skip 1 -First 1).Replace("/", "")
$Script:BaseURL = "https://$($InstanceSubdomain).immy.bot"

Function Get-ImmyBotApiAuthToken {
    [CmdletBinding()]
    Param (
        [Parameter(Mandatory)]
        [string]$TenantId,
        [Parameter(Mandatory)]
        [string]$ApplicationId,
        [Parameter(Mandatory)]
        [string]$Secret,
        [Parameter(Mandatory)]
        [string]$ApiEndpointUri
    )

    $RequestAccessTokenUri = "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token"
    $body = "grant_type=client_credentials&client_id=$applicationId&client_secret=$Secret&scope=$($ApiEndpointUri)/.default"
    $contentType = 'application/x-www-form-urlencoded'

    try {
        $Token = Invoke-RestMethod -Method Post -Uri $RequestAccessTokenUri -Body $body -ContentType $contentType
        return $Token
    }
    catch {
        Write-Error "Failed to obtain authentication token: $_"
        throw
    }
}

# Get authentication token
$Token = Get-ImmyBotApiAuthToken -ApplicationId $ClientId -TenantId $TenantID -Secret $Secret -ApiEndpointUri $BaseURL
$Script:ImmyBotApiAuthHeader = @{
    "authorization" = "Bearer $($Token.access_token)"
}

# Helper function for API calls
Function Invoke-ImmyBotRestMethod {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Endpoint,

        [Parameter()]
        [string]$Method = "GET",

        [Parameter()]
        $Body
    )

    if($body -is [Hashtable]) {
        $Body = $Body | ConvertTo-Json -Depth 100
    }

    $Endpoint = $Endpoint.TrimStart('/')
    $params = @{
        Method = $Method
        ContentType = "application/json"
    }

    if ($Body) {
        $params.Body = $body
    }

    try {
        Invoke-RestMethod -Uri "$($Script:BaseURL)/$Endpoint" -Headers $Script:ImmyBotApiAuthHeader @params
    }
    catch {
        Write-Error "API call to $Endpoint failed: $_"
        throw
    }
}
```


## Common Endpoints


## Webhooks

ImmyBot can send webhook notifications for various events.

### Configuring Webhooks

1. Navigate to **Show more** > **Integrations** > **Webhooks**
2. Click **Create Webhook**
3. Enter a name
4. Click **Save**

### Webhook Events

ImmyBot can send webhooks for the following events:

- Session Started
- Session Completed
- Session Failed
- Computer Added
- Computer Status Changed
- Deployment Created
- Deployment Updated
- Software Added
- Software Updated

### Webhook Format

Webhooks are sent as HTTP POST requests with a JSON body. The exact format depends on the event type, but all webhooks include:

```json
{
  "event_type": "session.completed",
  "timestamp": "2023-06-15T14:15:30Z",
  "instance_id": "your-instance-id",
  "data": {
    // Event-specific data
  }
}
```

## Rate Limiting

The ImmyBot API implements rate limiting to prevent abuse. The current limits are:

- 60 requests per minute per API key
- 1000 requests per hour per API key

If you exceed these limits, you'll receive a `429 Too Many Requests` response.

## Error Handling

The API uses standard HTTP status codes to indicate success or failure:

- `200 OK`: The request was successful
- `201 Created`: The resource was created successfully
- `400 Bad Request`: The request was invalid
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: The API key doesn't have permission
- `404 Not Found`: The resource doesn't exist
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Something went wrong on the server

Error responses include a JSON body with more information:

```json
{
  "error": {
    "code": "invalid_parameter",
    "message": "The parameter 'deployment_id' is invalid",
    "details": "Deployment with ID 'd999' not found"
  }
}
```

## Examples

Please see [Building your own integration](./build-your-own-integration.md) for examples for API scripts


## Next Steps

Now that you understand the basics of the ImmyBot API, you might want to explore:

- [Scripting Guide](./scripts.md) - Learn how to use the API in scripts
- [Integration Overview](./integration-overview.md) - Connect ImmyBot to your existing tools
- [Build Your Own Integration](./build-your-own-integration.md) - Create custom integrations using the API
