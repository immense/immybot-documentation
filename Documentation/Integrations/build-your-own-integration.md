# Building Custom Integrations with ImmyBot

ImmyBot provides powerful integration capabilities that allow you to connect with external systems and extend its functionality. This guide explains how to build both inbound and outbound integrations to meet your specific needs.



## Understanding Integration Types

### Inbound vs Outbound Integrations

**Inbound Integrations**: Use the ImmyBot REST API from an external service to trigger actions within ImmyBot. You can also pull information from within your ImmyBot instance into an external platform.

**Outbound Integrations**: Defined in PowerShell within ImmyBot and typically consume another service's API to extend ImmyBot's capabilities.

## Inbound Integrations

Inbound integrations allow external systems to interact with ImmyBot through its REST API. This approach is useful for triggering maintenance sessions, installing software, or retrieving information from ImmyBot.

### Setting Up Authentication

Before creating an inbound integration, you need to set up authentication:

1. **Create an App Registration in Microsoft Entra ID (Azure AD)**:
   - Navigate to [Microsoft Entra ID App Registrations](https://entra.microsoft.com/#view/Microsoft_AAD_RegisteredApps/CreateApplicationBlade/quickStartType~/null/isMSAApp~/false)
   - Create a new registration with default settings, do not change anything except what is required
   - Click Register
   - Copy the Client (Application) ID for later use.

2. **Create a Client Secret**:
   - In your App Registration, go to "Certificates & Secrets"
   - Create a new client secret and copy its VALUE (not the ID)

3. **Configure ImmyBot Access**:
     ::: warning
     Object ID of the Enterprise App is not the Object ID of the App registration
     :::

   - Navigate to the Enterprise App (click the "Managed Application" link in the App Registration)
   - Copy the object ID of the Enterprise App
   - In ImmyBot, go to Show More → People → New
   - Paste the Enterprise App's object ID into the "AD External ID" field and save
   - Make that person a user by navigating back to the People list and clicking Create User on the user you just created
   - Make the user an admin by going to Show More->Users, clicking Edit, and checking the Admin box and clicking Update

### Example: Installing Software on Computers

This example demonstrates how to create a script that:
1. Authenticates with ImmyBot's API
2. Retrieves a list of available software
3. Allows selection of software to install
4. Retrieves and selects target computers
5. Triggers a maintenance session to install the software


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

# Step 1: Get available software
Write-Host "Retrieving available software..." -ForegroundColor Cyan
$Software = Invoke-ImmyBotRestMethod -Endpoint "/api/v1/software/global"
$SelectedSoftware = $Software | Select-Object Id, Name | Out-GridView -OutputMode Single -Title "Select Software to Install"

if (-not $SelectedSoftware) {
    Write-Error "No software selected. Exiting."
    return
}

Write-Host "Selected software: $($SelectedSoftware.Name)" -ForegroundColor Green

# Step 2: Get target computers
Write-Host "Retrieving computers..." -ForegroundColor Cyan

# Optional: Filter computers by primary user email
$email = ''
if ($email) {
    $SelectedComputers = Invoke-ImmyBotRestMethod -Endpoint "/api/v1/computers/dx?filter=['primaryUserEmail','=','$Email']" | ForEach-Object { $_.data }
}
else {
    $Computers = Invoke-ImmyBotRestMethod -Endpoint "/api/v1/computers"
    $SelectedComputers = $Computers | Out-GridView -OutputMode Multiple -Title "Select Computer(s) to Install $($SelectedSoftware.Name)"
}

if (-not $SelectedComputers -or $SelectedComputers.Count -eq 0) {
    Write-Error "No computers selected. Exiting."
    return
}

Write-Host "Selected $($SelectedComputers.Count) computer(s)" -ForegroundColor Green

# Step 3: Trigger maintenance session to install software
Write-Host "Triggering maintenance session..." -ForegroundColor Cyan

$MaintenanceParams = @{
    fullMaintenance = $false  # When true, applies all deployments to the machine
    maintenanceParams = @{
        maintenanceIdentifier = "$($SelectedSoftware.Id)"
        maintenanceType = 0    # 0 = Software
        repair = $false
        desiredSoftwareState = 5  # 5 = NewerOrEqualVersion
    }
    skipBackgroundJob = $true  # Bypasses concurrent session limit
    rebootPreference = 1       # 1 = Suppress
    offlineBehavior = 2        # 2 = ApplyOnConnect
    computers = @($SelectedComputers | ForEach-Object { @{ computerId = $_.id } })
}

# Trigger the maintenance session
$Result = Invoke-ImmyBotRestMethod -Endpoint "/api/v1/run-immy-service" -Method "POST" -Body $MaintenanceParams

Write-Host "Maintenance session created successfully!" -ForegroundColor Green
Write-Host "Session ID: $($Result.id)" -ForegroundColor Cyan

# Optional: Detailed parameter explanation
<#
Maintenance Parameters Reference:
--------------------------------
fullMaintenance: When true, applies all deployments to the machine
resolutionOnly: Determines if software should be installed based on deployments (computer can be offline)
detectionOnly: Detects current software version (computer must be online)
inventoryOnly: Session ends after inventory scripts run
useWinningDeployment: When true, ignores desiredSoftwareState in maintenanceParams
deploymentId: Specify a deployment (when useWinningDeployment is false)
deploymentType: 0 = Global Database, 1 = Local

Desired Software States:
----------------------
0 = NoAction
1 = NotPresent (uninstall)
2 = ThisVersion (specific version)
3 = OlderOrEqualVersion
4 = LatestVersion (from database)
5 = NewerOrEqualVersion (default)
6 = AnyVersion

Reboot Preferences:
-----------------
-1 = Force
0 = Normal
1 = Suppress
#>
```



## Outbound Integrations

Outbound integrations allow ImmyBot to connect with external systems like RMMs, PSAs, and security tools. While initially developed for internal use, this feature is now available for you to create custom integrations with your preferred tools.

### Integration Capabilities

Capabilities are defined through interfaces that typically start with `ISupports...`. Each capability adds specific functionality to your integration:

| Capability Interface               | Description                                          |
| ---------------------------------- | ---------------------------------------------------- |
| `ISupportsListingClients`          | Lists customers/clients from the external system     |
| `ISupportsListingAgents`           | Lists agents/computers from the external system      |
| `ISupportsInventoryIdentification` | Provides scripts to identify agents on computers     |
| `ISupportsTenantInstallToken`      | Retrieves installation tokens for specific tenants   |
| `ISupportsTenantUninstallToken`    | Retrieves uninstallation tokens for specific tenants |
| `ISupportsHttpRequest`             | Handles incoming HTTP requests (webhooks)            |

When you implement a capability, ImmyBot automatically adds the corresponding UI elements and functionality. For example, implementing `ISupportsListingClients` adds a Clients tab to your integration's page:

![Client Mapping UI](https://github.com/immense/immybot-documentation/assets/31077619/67ea8b15-0ae9-44e6-b3e0-9de250b15010)

### Key Integration Features

With outbound integrations, you can:

- **Map Customers**: Connect ImmyBot tenants to clients in external systems
- **Track Agents**: Monitor computers/agents from RMMs, AVs, and other tools
- **Automate Agent Installation**: Use tenant-specific tokens for automated deployments
- **Manage Maintenance Mode**: Toggle maintenance/learning modes in external systems
- **Handle Webhooks**: Process incoming HTTP requests with PowerShell scripts

## Building Your Integration

### Basic Implementation

Every integration starts with a basic implementation using `New-DynamicIntegration`. At minimum, you need to provide:

1. An initialization script block (`-Init`)
2. A health check script block (`-HealthCheck`)

```powershell
# Simplest possible integration
$Integration = New-DynamicIntegration -Init {
    # Initialization code runs when the integration is created or updated
    [OpResult]::Ok()  # Return success
} -HealthCheck {
    # Health check runs periodically to verify the integration is working
    New-HealthyResult  # Return a healthy status
}
```

### Adding Configuration Parameters

Most integrations need configuration parameters like API endpoints, credentials, or other settings. You can add these as parameters to your initialization script:

```powershell
$Integration = New-DynamicIntegration -Init {
    param(
        [Parameter(Mandatory)]
        [Uri]$ApiEndpoint,

        [Parameter(Mandatory)]
        [Password(StripValue = $true)]  # Securely stores the password
        $ApiKey
    )

    # Validate parameters or establish connection here

    [OpResult]::Ok()
} -HealthCheck {
    New-HealthyResult
}
```

These parameters automatically generate a configuration form in the ImmyBot UI:

![Configuration Form](https://github.com/immense/immybot-documentation/assets/1424395/4f8ba329-f57f-4504-875d-c6ee3a53816c)

### Using the Integration Context

The `$IntegrationContext` is a special variable that persists between different script blocks within your integration. Use it to store configuration, connection objects, or any other data that needs to be shared:

```powershell
$Integration = New-DynamicIntegration -Init {
    param(
        [Parameter(Mandatory)]
        [Uri]$ApiEndpoint,

        [Parameter(Mandatory)]
        [Password(StripValue = $true)]
        $ApiKey
    )

    # Store parameters in the integration context
    $IntegrationContext.ApiEndpoint = $ApiEndpoint
    $IntegrationContext.ApiKey = $ApiKey

    # You can also store connection objects or other data
    $IntegrationContext.LastConnectionTime = Get-Date

    [OpResult]::Ok()
} -HealthCheck {
    # Access the stored values in other script blocks
    $endpoint = $IntegrationContext.ApiEndpoint
    $lastConnection = $IntegrationContext.LastConnectionTime

    Write-Verbose "Checking health of connection to $endpoint (last connected: $lastConnection)"
    New-HealthyResult
}
```

---

### Adding Capabilities to Your Integration

Once you've created your base integration, you can add capabilities using the `Add-DynamicIntegrationCapability` cmdlet. Each capability requires implementing specific methods.

#### Listing Clients from External Systems

The `ISupportsListingClients` capability allows your integration to retrieve and display clients from an external system:

```powershell
$Integration | Add-DynamicIntegrationCapability -Interface ISupportsListingClients -GetClients {
    [CmdletBinding()]
    [OutputType([Immybot.Backend.Domain.Providers.IProviderClientDetails[]])]
    param()

    # Retrieve clients from your external system
    # This example uses mock data
    @("Client1", "Client2") | ForEach-Object {
        # Create a client object for each client
        New-IntegrationClient -ClientId $_ -ClientName $_
    }
}
```

#### Listing Agents from External Systems

The `ISupportsListingAgents` capability allows your integration to retrieve and display agents (computers) from an external system:

```powershell
$Integration | Add-DynamicIntegrationCapability -Interface ISupportsListingAgents -GetAgents {
    [CmdletBinding()]
    [OutputType([Immybot.Backend.Domain.Providers.IProviderAgentDetails[]])]
    param(
        [Parameter()]
        [string[]]$ClientIds = $null  # IDs of clients mapped in the UI
    )

    # Retrieve agents from your external system, remove this array initialization and implement real logic to pull your agent data.
    # This example uses mock data.
    $ClientIds = @(
        [PSCustomObject]@{ Name = 'Computer 1'; ID = 101 }
        [PSCustomObject]@{ Name = 'Computer 2'; ID = 102 }
        [PSCustomObject]@{ Name = 'Computer 3'; ID = 103 }
        [PSCustomObject]@{ Name = 'Computer 4'; ID = 104 }
        [PSCustomObject]@{ Name = 'Computer 5'; ID = 105 }
    )
    # End mock data

    foreach ($clientId in $ClientIds) {
        Write-Verbose "Retrieving agents for client: $($clientId.Name)"

        # Create an agent object for each agent
        New-IntegrationAgent -AgentId $clientId.ID -Name $clientId.Name -ClientId $clientId.ID
    }
}
```

### Using Modules for Code Organization

For complex integrations, it's often better to move common code into a PowerShell module:

::: tip
We recommend using self documenting names for functions. If you're creating an integration for "Some Platform" the function names should be:<br>
Connect-SomePlatformAPI <br>
Get-SomePlatformAPI <br>
Get-SomePlatformAgents <br>

So on and so forth
:::

```powershell
# Create a module for your integration
# Save this as a Module script in ImmyBot

function Connect-ExternalAPI {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [Uri]$ApiEndpoint,
        [Parameter(Mandatory)]
        [string]$ApiKey
    )

    # Implementation details...
}

function Get-ExternalClients {
    [CmdletBinding()]
    param()

    # Implementation details...
}

function Get-ExternalAgents {
    [CmdletBinding()]
    param([string]$ClientId)

    # Implementation details...
}

Export-ModuleMember -Function @(
    'Connect-ExternalAPI',
    'Get-ExternalClients',
    'Get-ExternalAgents'
)
```

Then use the module in your integration:

```powershell
$Integration | Add-DynamicIntegrationCapability -Interface ISupportsListingClients -GetClients {
    # Import your module
    Import-Module YourIntegrationModule

    # Use the module functions
    Get-ExternalClients | ForEach-Object {
        New-IntegrationClient -ClientId $_.Id -ClientName $_.Name
    }
}

$Integration | Add-DynamicIntegrationCapability -Interface ISupportsListingAgents -GetAgents {
    Import-Module YourIntegrationModule

    foreach ($clientId in $ClientIds) {
        Get-ExternalAgents -ClientId $clientId | ForEach-Object {
            New-IntegrationAgent -AgentId $_.Id -Name $_.Name -ClientId $clientId
        }
    }
}
```

---


## Integration Context and Security

### Understanding the Integration Context

The `$IntegrationContext` is a special hashtable that serves as a secure storage mechanism for your integration:

- **Scope**: Only available within the integration's script blocks
- **Purpose**: Securely store sensitive data like API tokens and connection objects
- **Security**: Not accessible from outside the integration, even in the debugger
- **Persistence**: Data persists between different script blocks and method calls

### Accessing Integration Data from Scripts

Since the `$IntegrationContext` is not directly accessible from maintenance scripts, ImmyBot provides special cmdlets to securely access integration data:

| Cmdlet                                | Description                                 |
| ------------------------------------- | ------------------------------------------- |
| `Get-IntegrationAgentInstallToken`    | Retrieves installation tokens for agents    |
| `Get-IntegrationTenantUninstallToken` | Retrieves uninstallation tokens for tenants |
| `Get-IntegrationAgentUninstallToken`  | Retrieves uninstallation tokens for agents  |

These cmdlets automatically determine the correct integration and tenant context based on the current maintenance action, so you don't need to provide any parameters.

### Integration Workflow Example

Here's how the integration context works in practice:

1. **Create an Integration**: Define an integration for a security tool like SentinelOne
2. **Create Agent Software**: Create a software entry in ImmyBot for the agent
3. **Link Software to Integration**: Associate the software with your integration type (Edit Software > Scroll down and expand **Advanced** > Select Integration Type from the drop down and save)
4. **Create Deployment**: When creating a deployment, select the specific integration instance
5. **Install Script**: In the installation script, use `Get-IntegrationAgentInstallToken` to retrieve the token

When the installation script runs:
1. ImmyBot identifies which integration instance is linked to the deployment
2. It looks up the computer's tenant in the integration's client mapping
3. It calls the appropriate method on the integration to get the token
4. The token is securely passed to your script

![Integration Selection](https://github.com/immense/immybot-documentation/assets/31077619/ebdbfab0-a149-4d0d-8e56-cad8291df879)

![Integration Mapping](https://github.com/immense/immybot-documentation/assets/31077619/f5a9d865-2a7d-4843-9a58-298557dd674d)

### Example: SentinelOne
```powershell
$Integration = New-DynamicIntegration -Init {
    # These parameters generate the form on the New/Edit Integration page
    param(
        [Parameter(Mandatory)]
        [Uri]$S1Uri,
        [Parameter(Mandatory)]
        # [DisplayName("API Key")]
        [Password(StripValue = $true)]
        $S1ApiKey
    )
    $providerTypeFormData | Write-Variable
    # Note: The SentinelOne module is a Module script in Global
    Import-Module SentinelOne
    Get-Command -Module SentinelOne | Out-String | Write-Host
    $S1AuthHeader = Connect-S1API -S1Uri $S1Uri -S1APIToken $S1ApiKey

    # The SentinelOne module in Global will automatically use the following $IntegrationContext values if present
    $IntegrationContext.S1Uri = $S1Uri
    $IntegrationContext.S1ApiKey = $S1ApiKey
    $IntegrationContext.AuthHeader = $S1AuthHeader

    [OpResult]::Ok()
} -HealthCheck {
    [CmdletBinding()]
    [OutputType([HealthCheckResult])]
    param(

    )
    # todo: implement health check
    return New-HealthyResult
}

# ISupportsListingClients will create a Clients tab on the Integration for mapping ImmyBot tenants to the Clients returned by this script
$Integration | Add-DynamicIntegrationCapability -Interface ISupportsListingClients -GetClients {
    [CmdletBinding()]
    [OutputType([Immybot.Backend.Domain.Providers.IProviderClientDetails[]])]
    param()
    # return a list of clients for this integration using the New-IntegrationClient cmdlet
    Import-Module SentinelOne
    Get-S1Site -Verbose | ForEach-Object {
        New-IntegrationClient -ClientId $_.Id -ClientName $_.Name
    }
}

# supports listing agents

$Integration | Add-DynamicIntegrationCapability -Interface ISupportsListingAgents -GetAgents {
    [CmdletBinding()]
    [OutputType([Immybot.Backend.Domain.Providers.IProviderAgentDetails[]])]
    param(
        [Parameter()]
        [string[]]$ClientIds = $null
    )
    # ClientIds will contain the clientids you mapped to ImmyBot tenants under the Integration->Clients tab
    # The agents you return here will go into the Computers->Pending Identification area until they are linked to Computers via the AgentId provided by ISupportsInventoryIdentification

    Import-Module SentinelOne
    foreach($ClientId in $ClientIds)
    {
        Get-S1Agent -SiteId $ClientId -Verbose | ForEach-Object {
            New-IntegrationAgent -AgentId $_.uuid -Name $_.computerName -SerialNumber $_.serialNumber -OSName $_.osName -Manufacturer $_.modelName -ClientId $_.siteId -IsOnline $true -AgentVersion $_.agentVersion -SupportsRunningScripts $false
    }
}
}


# supports inventory identification

$Integration | Add-DynamicIntegrationCapability -Interface ISupportsInventoryIdentification -GetInventoryScript {
    [CmdletBinding()]
    param()
    # This ScriptBlock will be run in the Metascript context for every machine during initial identification and daily inventory
    Invoke-ImmyCommand {
        # Return the SentinelOne AgentId
        # We will match it to New-IntegrationAgent -AgentId you returned in ISupportsListingAgents
        $path = Resolve-Path  "C:\Program Files\SentinelOne\Sentinel Agent*\SentinelCtl.exe"
        if($path)
        {
            . $path.Path agent_id
        }
    }
}

# supports retrieving a tenant install token

$Integration |  Add-DynamicIntegrationCapability -Interface ISupportsTenantInstallToken -GetTenantInstallToken {
    [CmdletBinding()]
    [OutputType([System.String])]
    param(
        [Parameter(Mandatory=$true)]
        [string]$clientId
    )
    Get-S1Site -Id $clientId | %{ $_.registrationToken}
}

# supports retrieving a tenant uninstall token

$Integration | Add-DynamicIntegrationCapability -Interface ISupportsTenantUninstallToken -GetTenantUninstallToken {
    [CmdletBinding()]
    [OutputType([System.String])]
    param(
        [Parameter(Mandatory=$true)]
        [System.String]$clientId
    )
    return "implement me"
}

$Integration | Add-DynamicIntegrationCapability -Interface ISupportsHttpRequest -HandleHttpRequest {
    [CmdletBinding()]
    [OutputType([Microsoft.AspNetCore.Mvc.IActionResult])]
    param(
        [Parameter(Mandatory=$True)]
        [Microsoft.AspNetCore.Http.HttpContext]$httpContext,
        [Parameter(Mandatory=$false)]
        $body,
        [Parameter(Mandatory=$True)]
        $route
    )
will response to  "plugins/api/v1/{providerLinkId}"
    # handle a http request sent to this integration
    # return an [ObjectResult] and set the status code
    $res = [ObjectResult]::new('ok')
    $res.StatusCode = 200;
    return $res;
}
return $Integration
```

#### SentinelOne Module
```powershell
function Connect-S1API {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [Uri]$S1Uri,
        [Parameter(Mandatory)]
        [string]$S1APIToken
    )

    $S1AuthHeader = @{ 'Authorization' = "APIToken $S1ApiToken" }

    # if we have an integration context, then store it
    if ($null -ne $IntegrationContext) {
        $IntegrationContext.AuthHeader = $S1AuthHeader
    }

    $script:S1AuthHeader = $S1AuthHeader
    $script:S1Uri = $S1Uri
    [Uri]$script:S1Uri = $S1Uri

    try {
        $SystemInfo = Invoke-S1RestMethod -Endpoint 'system/info'
        if ($SystemInfo.latestAgentVersion -like "*.*") {
            Write-Progress "Authenticated to SentinelOne API and retrieved system/info. LatestAgentVersion: $($SystemInfo.LatestAgentVersion)"
            $script:S1AuthHeader
        } else {
            $script:S1AuthHeader = $null
            throw "Invalid response from system/info API"
        }
        Write-Verbose "SystemInfo:`r`n$($SystemInfo | Format-List * | Out-String)"
    } catch {
        $script:S1AuthHeader = $null
        throw
    }
}

function Invoke-S1RestMethod {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Endpoint,
        [string]$Method,
        [string]$Body,
        [HashTable]$QueryParameters = @{}
    )

    $Endpoint = $Endpoint.TrimStart('/')
    $params = @{}
    $params.ContentType = 'application/json'

    if ($Method) {
        $params.method = $Method
    }

    if ($Body) {
        $params.body = $body
        Write-Verbose "ThisBody:`r`n$($params.Body)"
    }

    $AuthHeader = $IntegrationContext.AuthHeader ?? $script:S1AuthHeader
    $BaseUri = $IntegrationContext.S1Uri ?? $script:S1Uri
    $Uri = "$($BaseUri)web/api/v2.1/$($Endpoint)"

    try {
        do {
            if ($QueryParameters) {
                Write-Verbose "QueryParameters: $($QueryParameters | Out-String)"
                $UriWithQuery = Add-UriQueryParameter -Uri $Uri -Parameter $QueryParameters
                $UriWithQuery = $UriWithQuery.ToString().Replace("+", "%20")
            }
            Write-Verbose $UriWithQuery
            $Results = $null
            Invoke-RestMethod -Uri $UriWithQuery -Headers $AuthHeader @params -ErrorAction Stop | Tee-Object -Variable Results | Select-Object -Expand data
            $Results | Format-List * | Out-String | Write-Verbose

            if ($Results.pagination -and $Results.pagination.nextcursor) {
                $QueryParameters.cursor = $Results.pagination.nextcursor
            }
        } while ($Results.pagination -and $Results.pagination.nextcursor)
    } catch {
        if ($_.Exception.Response.StatusCode -eq "Unauthorized") {
            Write-Error "Unauthorized when accessing $Endpoint, please ensure the user associated with the API Key can access this endpoint."
            Write-Error -Exception $_.Exception -ErrorAction Stop
        } else {
            throw $_ #.Exception.Response
        }
    }
}

function Get-S1Site {
    [CmdletBinding()]
    param(
        [string]$Name,
        [string]$Id
    )

    $Endpoint = "sites"

    if ($Id) {
        $Endpoint += "/$id"
        Invoke-S1RestMethod -Endpoint $Endpoint
        return
    }

    $QueryParameters = @{}
    $LimitParameter = @{ limit = 100 }

    if ($Name) {
        $QueryParameters['name'] = $Name
    }

    $CombinedParameters = $QueryParameters + $LimitParameter

    if (-not $Name) {
        Invoke-S1RestMethod -Endpoint $Endpoint -QueryParameters $LimitParameter | Select-Object -Expand sites | Sort-Object name
    } else {
        $Sites = Invoke-S1RestMethod -Endpoint $Endpoint -QueryParameters $CombinedParameters | Select-Object -Expand sites
        if (-not $Sites) {
            Write-Progress "No sites matched name: $Name using API filter. Fetching all sites..."
            $Sites = Invoke-S1RestMethod -Endpoint $Endpoint -QueryParameters $LimitParameter | Select-Object -Expand sites | Sort-Object name
            $SiteCount = $Sites | Measure-Object | Select-Object -expand Count
            Write-Progress "Found $SiteCount site(s)"
        }
        $Sites | Select-Object id, name, isDefault, registrationToken | Out-String | Write-Verbose
        $Site = $Sites | Where-Object { $_.name.Trim() -like $Name } # Potential edge case where the `name` property includes whitespace
        $Site = $Site | Should-HaveOne "SentinelOne Site matching $Name" -TakeFirst
        $Site
    }
}

function Get-S1Agent {
    [CmdletBinding()]
    param(
        [string]$Name
    )

    $Endpoint = "agents"

    $QueryParameters = @{}
    $LimitParameter = @{ limit = 100 }

    if ($Name) {
        $QueryParameters['name'] = $Name
    }

    $CombinedParameters = $QueryParameters + $LimitParameter

    if (-not $Name) {
        Invoke-S1RestMethod -Endpoint $Endpoint -QueryParameters $LimitParameter | Sort-Object computerName
    } else {
        $QueryParameters.name = $Name
        $Agents = Invoke-S1RestMethod -Endpoint $Endpoint -QueryParameters $CombinedParameters
        if (-not $Agents) {
            Write-Progress "No Agents matched name: $Name using API filter. Fetching all Agents..."
            $Agents = Get-S1Site
            $AgentCount = $Agents | Measure-Object | Select-Object -expand Count
            Write-Progress "Found $AgentCount agent(s)"
        }
        $Agents | Select-Object id, name, isDefault, registrationToken | Out-String | Write-Verbose
        $Agent = $Agent | Where-Object { $_.name.Trim() -like $Name } # Potential edge case where the `name` property includes whitespace
        $Agent = $Agent | Should-HaveOne "SentinelOne Agent matching $Name" -TakeFirst
        $Agent
    }
}

Export-ModuleMember -Function @(
    'Connect-S1API',
    'Invoke-S1RestMethod',
    'Get-S1Site',
    'Get-S1Agent'
)
```

##### Example - Respond to webhook with ISupportsHttpRequest


```powershell
$Integration = New-DynamicIntegration -Init {
    param()
    [OpResult]::Ok()
} -HealthCheck {
    New-HealthyResult
}
$Integration | Add-DynamicIntegrationCapability -Interface ISupportsHttpRequest -HandleHttpRequest {
    [CmdletBinding()]
    [OutputType([Microsoft.AspNetCore.Mvc.IActionResult])]
    param(
        [Parameter(Mandatory=$True)]
        [Microsoft.AspNetCore.Http.HttpContext]$httpContext,
        [Parameter(Mandatory=$false)]
        $body,
        [Parameter(Mandatory=$True)]
        $route
    )
    # handle a http request sent to this integration
    # return an [ObjectResult] and set the status code
    $res = [ObjectResult]::new('ok')
    $res.StatusCode = 200;
    return $res;
}

$Integration
```
<img width="688" alt="image" src="https://github.com/immense/immybot-documentation/assets/1424395/6bf7dd8b-3700-4414-aa57-ad6d8151245f">

## Conclusion and Next Steps

Building custom integrations with ImmyBot allows you to extend its capabilities and connect with your preferred external systems. By following the guidelines in this document, you can create powerful integrations that enhance your IT management workflow.

### Key Takeaways

- **Inbound Integrations**: Allow external systems to interact with ImmyBot through its REST API
- **Outbound Integrations**: Allow ImmyBot to interact with external systems through PowerShell-based implementations
- **Integration Capabilities**: Add specific functionality to your integration through interfaces like `ISupportsListingClients` and `ISupportsHttpRequest`
- **Security**: Use the `$IntegrationContext` to securely store sensitive data and access it through dedicated cmdlets

### Where to Go From Here

1. **Explore Example Integrations**: Study the SentinelOne example provided in this guide
2. **Start Simple**: Begin with a basic integration that implements one or two capabilities
3. **Test Thoroughly**: Ensure your integration works correctly with real-world data
4. **Expand Gradually**: Add more capabilities as your needs evolve

For more information on working with ImmyBot's API and integrations, see:

- [API Documentation](/Documentation/Reference/api-documentation.md)
- [Integration Overview](/Documentation/Integrations/integration-overview.md)
