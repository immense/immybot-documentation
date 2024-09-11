## Build Your Own Integrations

### Inbound vs Outbound Integrations

An inbound integration uses the ImmyBot REST API from an external service.

An outbound integration is defined in PowerShell within ImmyBot and typically consumes another service's API.

## Inbound Integrations

### Example - Install Software on a Computer

The following example will prompt you to select a piece of software, then select one or more computers to install that software on

1. Create a brand new App Registration in https://entra.microsoft.com/#view/Microsoft_AAD_RegisteredApps/CreateApplicationBlade/quickStartType~/null/isMSAApp~/false, leave it completely unmodified, don’t change any defaults.
1. Copy the Client (Application) ID into the $ClientID variable below
1. Create a secret under Certificates and Secrets and copy the secret VALUE (NOT THE ID!!!!!!!1) into the $Secret variable below
1. Plug one of your domains into the $AzureDomain variable below
1. Navigate to the Enterprise App that was created in your Azure AD (You can do this by clicking the Managed Application link on the bottom right of the App Registration) and copy the *object id* of the Enterprise App
1. Go into Immy->Show More->People->New and paste the Enterprise App's *object id* into the AD External ID field
1. Make that person a user by navigating back to the People list and clicking Create User on the user you just created
1. Make the user an admin by going to Show More->Users, clicking Edit, and checking the Admin box and clicking Update
1. Run The code below
1. Find the API endpoints by going to <yourinstance.immy.bot/swagger/index.html or by using the network tab in your browser as our frontend consumes those APIs.
1. Modify the code below to suit your needs


```powershell
$AzureDomain = '' # contoso.com
$ClientID = '' # From the steps above
$Secret = '' # From the steps above
$InstanceSubdomain = '' # myinstance (don't include .immy.bot)

#####################
$TokenEndpointUri = [uri](Invoke-RestMethod "https://login.windows.net/$AzureDomain/.well-known/openid-configuration").token_endpoint
$TenantID = ($TokenEndpointUri.Segments | Select-Object -Skip 1 -First 1).Replace("/", "")
$Script:BaseURL = "https://$($InstanceSubdomain).immy.bot"

Function Get-ImmyBotApiAuthToken {
    Param ($TenantId, $ApplicationId, $Secret, $ApiEndpointUri)
    $RequestAccessTokenUri = "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token"
    $body = "grant_type=client_credentials&client_id=$applicationId&client_secret=$Secret&scope=$($Script:BaseURL)/.default"
    $contentType = 'application/x-www-form-urlencoded'
    try {
        $Token = Invoke-RestMethod -Method Post -Uri $RequestAccessTokenUri -Body $body -ContentType $contentType
        return $Token
    }
    catch { throw }
}
$Token = Get-ImmyBotApiAuthToken -ApplicationId $ClientId -TenantId $TenantID -Secret $Secret -ApiEndpointUri $BaseURL
$Script:ImmyBotApiAuthHeader = @{
    "authorization" = "Bearer $($Token.access_token)"
}

Function Invoke-ImmyBotRestMethod {
    param([string]$Endpoint, [string]$Method, $Body)
    if($body -is [Hashtable])
    {
        $Body = $Body | ConvertTo-Json -Depth 100
    }
    $Endpoint = $Endpoint.TrimStart('/')
    $params = @{}
    if ($Method) {
        $params.method = $Method
    }
    if ($Body) {
        $params.body = $body
    }
    Invoke-RestMethod -Uri "$($Script:BaseURL)/$Endpoint" -Headers $Script:ImmyBotApiAuthHeader -ContentType "application/json" @params
}
$Software = Invoke-ImmyBotRestMethod -Endpoint "/api/v1/software/global"
$SelectedSoftware = $Software | select Id, Name | Out-GridView -OutputMode Single -Title "Select a Software"

# Specify an email to limit the list of computers to computers whose primary user's email matches the email specified.
$email = ''
if($email){
    $SelectedComputers = Invoke-ImmyBotRestMethod -Endpoint "/api/v1/computers/dx?filter=['primaryUserEmail','=','$Email']" | % data
}else{
    $Computers = Invoke-ImmyBotRestMethod -Endpoint "/api/v1/computers"
    $SelectedComputers = $Computers | Out-GridView -OutputMode Multiple -Title "Select Computer(s) to install $($SelectedSoftware.Name)"
}


# Note: Many of these fields can likely be omitted but are included for completeness
Invoke-ImmyBotRestMethod -Endpoint "/api/v1/run-immy-service" `
-Method "POST" `
-Body @{
    fullMaintenance = $false # When true, the triggered session will have all software/tasks applied to the machine. If false, it will be limited to one. You must provide a maintenanceParams property to specify the one you want
    resolutionOnly = $false # When this is true, we "resolve" the desired state of the software against the deployments. This is is useful for determining if the user/computer should have the software installed. The computer does not need to be online for resolution to run.
    detectionOnly = $false # Detection just detects what version of the software exists on the machine, if any. Both resolution and detection are required to determine what action is necessary to acheive the desired state. The computer must be online for detection to run.
    inventoryOnly = $false # Session will end after the inventory scripts run
    runInventoryInDetection = $false # When this is true, all inventory scripts will be run during detection. When this is false, only the Software Inventory script is run
    cacheOnly = $false # Skips Software Inventory script and uses the most recent software inventory to determine the currently installed version
    useWinningDeployment = $false # When true, the desiredSoftwareState in the maintenanceParams below is ignored
    deploymentId = $null # If useWinningDeployment is false, you can specify a deployment here. When null,use maintenanceParams below, or if maintenanceParams are not specified resolution will determine the "winning" deployment
    deploymentType = $null # The deploymentId is in what database? 0 - Global Database (Recommended deployments), 1 - Local (Typical)
    maintenanceParams = @{
        maintenanceIdentifier = "$($SelectedSoftware.Id)"
        maintenanceType = 0
        repair = $false
        desiredSoftwareState = 5
        <#
            DesiredSoftwareState.NoAction => 0,
            DesiredSoftwareState.NotPresent => 1,
            DesiredSoftwareState.ThisVersion => 2,
            DesiredSoftwareState.OlderOrEqualVersion => 3,
            DesiredSoftwareState.LatestVersion => 4,
            DesiredSoftwareState.NewerOrEqualVersion => 5, # This is the default. It should be called "Newer or Equal to the _expected_ version". Sure you would think LatestVersion would be the default but LatestVersion refers to the latest version in our database (before dynamic versions) and NewerOrEqual was added to prevent the action from being marked as failed if the software self-updates during installation to a version newer than we expected.
            DesiredSoftwareState.AnyVersion => 6,
        #>
        maintenanceTaskMode = 0
    }
    skipBackgroundJob = $true # true bypasses the concurrent session limit. Careful, you can quickly overload your instance if you abuse this
    rebootPreference = 1 # Force = -1, Normal = 0, Suppress = 1
    scheduleExecutionAfterActiveHours = $false
    useComputersTimezoneForExecution = $false
    offlineBehavior = 2 #  Skip = 1, ApplyOnConnect = 2
    suppressRebootsDuringBusinessHours = $false
    sendDetectionEmail = $false
    sendDetectionEmailWhenAllActionsAreCompliant = $false
    sendFollowUpEmail = $false
    sendFollowUpOnlyIfActionNeeded = $false
    showRunNowButton = $false
    showPostponeButton = $false
    showMaintenanceActions = $false
    computers = @($SelectedComputers | %{ @{ computerId = $_.id } })
    tenants = @() # If the specified maintenanceItem is a Cloud Task you would specify this instead of computers
}
```



## Outbound Integrations

The goal of this feature is primarily for our own use to more rapidly implement integrations with other RMMs and PSA, but we have opened it up for you to create your own integrations as well.

### Concepts

Behind the scenes, an integration is any class that inherits from the `IProvider` interface.

We have created a new `Integration` script type with `New-DynamicIntegration` and `Add-DynamicIntegrationCapability` Cmdlets that allow you to construct your own `IProvider` and give it capabilities, all within PowerShell.

Integrations capabilities are defined in interfaces typically prefixed with `ISupports...`

Let's say you want your integration to have a Client mapping UI in ImmyBot. You would implement `ISupportsListingClients` which has a `GetClients` method.

When loading your integration, the ImmyBot engine will recognize that `integration is ISupportsListingClients` and will show the Clients tab on the Integration page.

![image](https://github.com/immense/immybot-documentation/assets/31077619/67ea8b15-0ae9-44e6-b3e0-9de250b15010)

#### Dynamic Integration Capabilities
* List Customers from the remote system so they can be mapped in the ImmyBot UI
* List Computers/Agents (Think RMM Agent, AV agent etc) from a remote system
* Provide an inventory script that returns the agent id (that gets mapped to the id from the API)
* Provide Tenant level install tokens automatically scoped based on the Customer mapping above
* Disable/Enable Maintenance Mode/Learning Mode in remote systems during maintenance
* Respond to HttpRequests in PowerShell (like an Azure PowerShell function) but utilizing the Metascript engine

---
### **Basic Implementation**
```powershell
New-DynamicIntegration -Init {
    [OpResult]::Ok()
} -HealthCheck {
    New-HealthyResult
}
```
---

### **Initialization with Parameters**

```powershell
$Integration = New-DynamicIntegration -Init {
    param(
        [Parameter(Mandatory)]
        [Uri]$S1Uri,
        [Parameter(Mandatory)]
        [Password(StripValue = $true)]
        $S1ApiKey
    )

    [OpResult]::Ok()
} -HealthCheck {
    New-HealthyResult
}
```

![image](https://github.com/immense/immybot-documentation/assets/1424395/4f8ba329-f57f-4504-875d-c6ee3a53816c)

---

### **Initialization with Parameters & `$IntegrationContext`**

Building on the previous example, the integration parameters are stored in the `$IntegrationContext`:

```powershell
$Integration = New-DynamicIntegration -Init {
    param(
        [Parameter(Mandatory)]
        [Uri]$S1Uri,
        [Parameter(Mandatory)]
        [Password(StripValue = $true)]
        $S1ApiKey
    )

    $IntegrationContext.S1Uri = $S1Uri
    $IntegrationContext.S1ApiKey = $S1ApiKey

    [OpResult]::Ok()
} -HealthCheck {
    New-HealthyResult
}
```

---

### **Adding `ISupportsListingClients`**

```powershell
$Integration = New-DynamicIntegration -Init {
    param(
        [Parameter(Mandatory)]
        [Uri]$S1Uri,
        [Parameter(Mandatory)]
        [Password(StripValue = $true)]
        $S1ApiKey
    )
} -HealthCheck {
    New-HealthyResult
}

$Integration | Add-DynamicIntegrationCapability -Interface ISupportsListingClients -GetClients {
    [CmdletBinding()]
    [OutputType([Immybot.Backend.Domain.Providers.IProviderClientDetails[]])]
    param()
    # Implement logic to get clients directly in this script
    # Mockup code for example purposes
    @("Client1", "Client2") | ForEach-Object {
        New-IntegrationClient -ClientId $_ -ClientName $_
    }
}
```

---

### **Adding `ISupportsListingAgents`**

```powershell
$Integration = New-DynamicIntegration -Init {
    # ... *same as above* ...
} -HealthCheck {
    New-HealthyResult
}
$Integration | Add-DynamicIntegrationCapability -Interface ISupportsListingClients -GetClients {
    [CmdletBinding()]
    [OutputType([Immybot.Backend.Domain.Providers.IProviderClientDetails[]])]
    param()
    # Implement logic to get clients directly in this script
    # Mockup code for example purposes
    @("Client1", "Client2") | ForEach-Object {
        New-IntegrationClient -ClientId $_ -ClientName $_
    }
}

$Integration | Add-DynamicIntegrationCapability -Interface ISupportsListingAgents -GetAgents {
    [CmdletBinding()]
    [OutputType([Immybot.Backend.Domain.Providers.IProviderAgentDetails[]])]
    param(
        [Parameter()]
        [string[]]$ClientIds = $null
    )
    # Implement logic to get agents directly in this script
    # Mockup code for example purposes
    @("Agent1", "Agent2") | ForEach-Object {
        New-IntegrationAgent -AgentId $_ -Name $_
    }
}
```

---

###  **Move duplicate code to a Module**

```powershell
$Integration = New-DynamicIntegration -Init {
    param(
        [Parameter(Mandatory)]
        [Uri]$S1Uri,
        [Parameter(Mandatory)]
        [Password(StripValue = $true)]
        $S1ApiKey
    )
} -HealthCheck {
    New-HealthyResult
}

$Integration | Add-DynamicIntegrationCapability -Interface ISupportsListingClients -GetClients {
    Import-Module SentinelOne
    Get-S1Site | ForEach-Object {
        New-IntegrationClient -ClientId $_.Id -ClientName $_.Name
    }
}

$Integration | Add-DynamicIntegrationCapability -Interface ISupportsListingAgents -GetAgents {
    Import-Module SentinelOne
    Get-S1Agent | ForEach-Object {
        New-IntegrationAgent -AgentId $_.Id -Name $_.Name
    }
}
```

---


#### Integration Context

`$IntegrationContext` is a Hashtable used to share data between the ScriptBlocks *within the integration only*.

By design, the data in `$IntegrationContext` is where you put sensitive data like Access Tokens.

It is not available in scripts outside of the integration as this could expose those tokens via the Debugger.

Instead, we provide the following Cmdlets to access integration data from the Metascript context:

- Get-IntegrationAgentInstallToken
- Get-IntegrationTenantUninstallTokenCmdlet
- Get-IntegrationAgentUninstallTokenCmdlet

These Cmdlets do not require any parameters as everything they need is available in the Action's context.

Let's say you create an integration that has an agent that requires an install token.

You would create a piece of Software and link it to that Integration Type, essentially saying "This software is the agent for SentinelOne".

When you create a Deployment for that Software, if there are multiple integrations of that type, you will be required to select one. (Maybe you are migrating SentinelOne from one server to another)

That Deployment will create an Action on the session linked back to that Deployment, that is linked to that specific SentinelOne instance.

When you call Get-IntegrationAgentInstallToken from within the SentinelOne install script, the backend calls GetTenantInstallToken(string clientId) on the SentinelOne integration provided by the Deployment. ClientId is provided automatically by looking up the Computer's ImmyBot tenantId in the integration's Client mapping.

![image](https://github.com/immense/immybot-documentation/assets/31077619/ebdbfab0-a149-4d0d-8e56-cad8291df879)

![image](https://github.com/immense/immybot-documentation/assets/31077619/f5a9d865-2a7d-4843-9a58-298557dd674d)

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
