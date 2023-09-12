## Build Your Own Integrations

The goal of this feature is primarily for our own use to more rapidly implement integrations with other RMMs and PSA, but we have opened it up for you to create your own integrations as well.

![Alt text](image.png)

![Alt text](image-1.png)

#### Example: SentinelOne (Implemented in Global already)
```powershell
$Integration = New-DynamicIntegration -Init {
    param(
        [Parameter(Mandatory)]
        [Uri]$S1Uri,
        [Parameter(Mandatory)]
        # [DisplayName("API Key")]
        [Password(StripValue = $true)]
        $S1ApiKey
    )
    $providerTypeFormData | Write-Variable
    Import-Module SentinelOne    
    Get-Command -Module SentinelOne | Out-String | Write-Host
    $S1AuthHeader = Connect-S1API -S1Uri $S1Uri -S1APIToken $S1ApiKey
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

# supports listing clients
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
        [string[]]$clientIds = $null
    )
    Import-Module SentinelOne
    Get-S1Agent -Verbose | ForEach-Object {
        New-IntegrationAgent -Name $_.computerName -SerialNumber $_.serialNumber -OSName $_.osName -Manufacturer $_.modelName -ClientId $_.siteId -AgentId $_.uuid -IsOnline $true -AgentVersion $_.agentVersion -SupportsRunningScripts $false
    }
}


# supports inventory identification

$Integration | Add-DynamicIntegrationCapability -Interface ISupportsInventoryIdentification -GetInventoryScript {
    [CmdletBinding()]
    param()
    Invoke-ImmyCommand {
        # implement a script block that will be ran on a computer to retrieve the agent identifier for this integration.
        $path = Resolve-Path  "C:\Program Files\SentinelOne\Sentinel Agent*\SentinelCtl.exe"
        . $path.Path agent_id
    }
}

# supports retrieving a tenant install token

$Integration |  Add-DynamicIntegrationCapability -Interface ISupportsTenantInstallToken -GetTenantInstallToken {
    [CmdletBinding()]
    [OutputType([System.String])]
    param(
        [Parameter(Mandatory=$true)]
        [System.String]$clientId
    )
    return "implement me"
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

return $Integration
```

![Alt text](image-2.png)

#### Dynamic Integration Capabilities
* List Customers from the remote system so they can be mapped in the ImmyBot UI
* 