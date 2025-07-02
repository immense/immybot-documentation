# ImmyBot Command Reference

This comprehensive guide explains the powerful scripting capabilities available in ImmyBot through Metascripts, Cloud Scripts, and their associated commands.

## Understanding Server-Side Scripts

### Metascripts

A Metascript is a PowerShell script that runs in the ImmyBot backend and can execute commands on remote computers. Metascripts provide a powerful way to orchestrate actions across multiple devices while maintaining state in the ImmyBot backend.

Key capabilities of Metascripts:
- Execute commands on remote computers
- Pass objects between the server and client
- Maintain context across reboots
- Access ImmyBot's internal APIs and data

#### Example: Comparing PowerShell Versions

```powershell
$ServerPSVersionTable = $PSVersionTable
$ComputerPSVersionTable = Invoke-ImmyCommand {
    $ServerPSVersionTable = $using:ServerPSVersionTable
    Write-Host "Running from $env:ComputerName but ImmyBot backend is running PowerShell $($ServerPSVersionTable.PSVersion)" -ForegroundColor Green
    return $PSVersionTable
}
$VerbosePreference = 'Continue'
Write-Verbose "Running from ImmyBot backend, but the computer is running Windows PowerShell $($ComputerPSVersionTable.PSVersion)"
```

#### Output
![PowerShell Version Comparison](https://user-images.githubusercontent.com/1424395/186782839-81293dbb-8206-4dbb-be78-f94efbfbbacf.png)

Invoke-ImmyCommand is modeled after PowerShell's native Invoke-Command, with the ability to pass real objects into and out of the remote runspace while preserving stream information. This approach is superior to capturing standard output and standard error as strings, which is common in many automation tools.

### Cloud Scripts

Cloud Scripts are similar to Metascripts but target a Tenant instead of a specific computer. They're particularly useful for:

- Managing tenant-wide settings
- Interacting with cloud services like Microsoft 365
- Performing operations across all computers in a tenant
- Manipulating settings in each customer's Azure environment

Collectively, Metascripts and Cloud Scripts are referred to as "server-side scripts" in ImmyBot.

## Common Commands

These commands are available in all server-side scripts.

### Azure Integration Commands

#### Connect-ImmyAzureAD

Provides a wrapper around `Connect-AzureAD` to authenticate with Azure AD.

```powershell
# Authenticate with Azure AD and retrieve all users
Connect-ImmyAzureAD
$users = Get-AzureADUser -All $true
Write-Host "Found $($users.Count) users in Azure AD"
```

Documentation: [Microsoft Connect-AzureAD Reference](https://docs.microsoft.com/en-us/powershell/module/azuread/connect-azuread?view=azureadps-2.0)

#### Get-ImmyAzureAuthHeader

Obtains an authentication header for the specified Microsoft endpoint.

```powershell
# Get authentication header for Microsoft Graph API
$Header = Get-ImmyAzureAuthHeader -Endpoint "MSGraph" -ErrorAction Stop

# Use the header to make a Graph API request
$Groups = Invoke-RestMethod "https://graph.microsoft.com/v1.0/groups/" -Headers $Header
Write-Host "Found $($Groups.value.Count) groups in Azure AD"
```

**Parameters:**
- `-Endpoint`: Accepts either "MSGraph" or "AzureAD"

**Returns:** A dictionary containing the authentication header

### RMM Integration Commands

#### Get-ProviderInfo

Retrieves an instance of an RMM Provider for the specified type.

**Alias:** Get-RmmInfo

```powershell
# Get information about the ConnectWise Automate integration
$RmmInfo = Get-ProviderInfo -ProviderType CWAutomate
Write-Host "Connected to $($RmmInfo.Provider.Name) at $($RmmInfo.Provider.Url)"
```

**Parameters:**
- `-ProviderType`: The type of RMM provider (e.g., "CWAutomate", "NinjaRMM")
- `-IncludeClients`: Include client information from the RMM

**Example: Updating a ConnectWise Automate EDF Field**

```powershell
param(
    [string]$FieldName,
    [string]$Value,
    $Computer
)

# Get the current computer if not specified
if(!$Computer) {
    $Computer = Get-ImmyComputer
}

# Get the RMM computer and provider information
$RmmComputer = Get-RmmComputer -Computer $Computer -ProviderType CWAutomate
$RmmInfo = Get-ProviderInfo -ProviderType CWAutomate

# Find the EDF field
$EDF = Get-CWAComputerEDF -FieldName $FieldName -Computer $Computer
if(!$EDF) {
    Write-Warning "Aborting: Unable to find EDF $FieldName"
    return
}

# Update the EDF field value
$ExtraFieldDefinitionId = $EDF.ExtraFieldDefinitionId
$ValueProperty = $EDF | Select-Object *FieldSettings* | Get-Member -MemberType NoteProperty | Select-Object -First 1 | ForEach-Object {$_.Name}
$PatchPath = "$ValueProperty/Value"
$Uri = "cwa/api/v1/computers/$($RmmComputer.RmmDeviceId)/extrafields/$ExtraFieldDefinitionId"
$Body = ConvertTo-Json @(@{"op"="replace";"path"=$PatchPath;"value"=$Value})
Invoke-CWARestMethod $Uri -Provider $RmmInfo.Provider -Method PATCH -Body $Body
```

## Metascript Commands

### Remote Execution

#### Invoke-ImmyCommand

A powerful command that allows you to execute scripts remotely on devices.

```powershell
# Basic example - run a command on the current computer
Invoke-ImmyCommand {
    Write-Output "Hello from $env:COMPUTERNAME"
    Get-Service | Where-Object { $_.Status -eq 'Running' } | Select-Object -First 5
}

# Run a command on all workstations in parallel
Get-ImmyComputer -TargetGroupFilter Workstations | Invoke-ImmyCommand -Parallel {
    $ComputerInfo = Get-ComputerInfo
    [PSCustomObject]@{
        ComputerName = $env:COMPUTERNAME
        OSVersion = $ComputerInfo.OsVersion
        LastBoot = $ComputerInfo.OsLastBootUpTime
        FreeMemory = [math]::Round($ComputerInfo.OsFreePhysicalMemory / 1MB, 2)
    }
} | Format-Table -AutoSize
```

**Parameters:**
- `-ScriptBlock`: The PowerShell script to execute remotely
- `-Computer`: The target computer(s) to run the script on
- `-Context`: Either "System" (default) or "User" execution context
- `-ArgumentList`: Arguments to pass to the script
- `-Timeout`: Maximum execution time in seconds (default: 120)
- `-ConnectTimeout`: Time to wait for connection in seconds
- `-DisableConnectTimeoutWarnings`: Suppress timeout warnings
- `-Parallel`: Run the script on all computers simultaneously

**Using the `$using` Scope Modifier:**

The `$using` scope modifier allows you to reference variables from the calling script in your remote script block:

```powershell
$AppName = "Microsoft Office"
$Results = Invoke-ImmyCommand {
    $App = Get-WmiObject -Class Win32_Product | Where-Object { $_.Name -like "*$using:AppName*" }
    if ($App) {
        return [PSCustomObject]@{
            Name = $App.Name
            Version = $App.Version
            Installed = $true
        }
    } else {
        return [PSCustomObject]@{
            Name = $using:AppName
            Version = $null
            Installed = $false
        }
    }
}
```

### Email Notifications

#### Send-ImmyEmail

Sends an ImmyBot-styled email to specified recipients.

```powershell
# Send an email to the default recipients (based on maintenance session settings)
Send-ImmyEmail -Subject "Weekly Maintenance Report" -Body "All systems have been updated successfully."

# Send an email to specific recipients
Send-ImmyEmail -Subject "Critical Update Required" -Body "Please approve the pending update." -To @("admin@example.com", "manager@example.com")
```

**Parameters:**
- `-Subject`: Email subject line
- `-Body`: Email body content (can be HTML)
- `-To`: List of email addresses to send to
- `-Bcc`: List of email addresses to BCC

### Computer Management

#### Refresh-ComputerSystemInfo

Updates ImmyBot's inventory information for the specified computer.

```powershell
# Refresh information for the current computer
Refresh-ComputerSystemInfo

# Refresh information for all servers
Get-ImmyComputer -TargetGroupFilter Servers | Refresh-ComputerSystemInfo
```

This command updates the following computer information:
- ComputerName
- SerialNumber
- ChassisTypes
- DomainRole
- Domain
- OsName
- OsInstallDate
- LastBootTime
- Model
- Manufacturer

**Parameters:**
- `-Computer`: The computer to refresh information for (defaults to current session computer)

#### Get-RmmComputer

Retrieves RMM-specific information about a computer.

```powershell
# Get RMM information for the current computer
$RmmComputer = Get-RmmComputer
Write-Host "RMM Device ID: $($RmmComputer.RmmDeviceId)"
```

#### Get-ImmyComputer

Retrieves ImmyBot computer objects.

```powershell
# Get all computers in the current tenant
$Computers = Get-ImmyComputer
Write-Host "Found $($Computers.Count) computers in the tenant"

# Get computers with specific inventory values
$WindowsComputers = Get-ImmyComputer -InventoryKeys @("OsName=Windows 10*")
```

## Filterscript Commands

### Get-ImmyComputer

Returns a list of computers for the specified tenant, or all computers if it is cross-tenant scoped.

```powershell
# Get all Windows 10 computers
$Windows10Computers = Get-ImmyComputer -InventoryKeys @("OsName=Windows 10*")

# Get all Dell laptops
$DellLaptops = Get-ImmyComputer -InventoryKeys @("Manufacturer=Dell*", "ChassisTypes=Laptop")
```

**Parameters:**
- `-InventoryKeys`: Array of inventory key-value pairs to filter by

## Software Auto Update Commands

### Add-Script

Adds a script to ImmyBot's script library.

```powershell
# Example coming soon
```

### Get-Script

Retrieves scripts from ImmyBot's script library.

```powershell
# Example coming soon
```

### Add-SoftwareVersion

Adds a new software version to ImmyBot.

```powershell
# Example: Add a new version of DBeaver
$download_page = Invoke-WebRequest -Uri 'https://github.com/dbeaver/dbeaver/releases/latest' -UseBasicParsing
$url = $download_page.links | Where-Object { $_.href -match '\.exe$' } | Select-Object -Expand href -First 1 | ForEach-Object { 'https://github.com' + $_ }
$versionString = $url -split '/' | Select-Object -Last 1 -Skip 1
$latestVersion = $SoftwareVersions | Sort-Object SemanticVersion | Select-Object -Last 1
$createdVersion = Add-SoftwareVersion -SoftwareVersion $latestVersion -SemanticVersion $versionString -Url $url

Write-Host "Added DBeaver version $versionString with URL: $url"
```

**Key Parameters:**
- `-SoftwareVersion`: Base software version to clone
- `-SoftwareType`: Type of software (GlobalSoftware, LocalSoftware, etc.)
- `-DisplayName`: Display name for the software
- `-SemanticVersion`: Version number in semantic versioning format
- `-Url`: Download URL for the software
- `-InstallerFile`: Path to installer file
- Various script IDs and types for installation, testing, etc.

### Get-AllLocalScripts

Retrieves all local scripts in ImmyBot.

```powershell
# Example coming soon
```

### Get-AllGlobalScripts

Retrieves all global scripts in ImmyBot.

```powershell
# Example coming soon
```

## ConnectWise Automate Commands

### Invoke-CWAQuery

Executes a query against the ConnectWise Automate database.

```powershell
# Example coming soon
```

### Invoke-CWARestMethod

Executes a REST API call against the ConnectWise Automate API.

```powershell
# Example coming soon
```

### Get-CWARestPages

Retrieves paginated results from the ConnectWise Automate API.

```powershell
# Example coming soon
```

## Best Practices

When working with ImmyBot commands, consider these best practices:

1. **Error Handling**: Always include proper error handling in your scripts
   ```powershell
   try {
       $result = Invoke-ImmyCommand { Get-Service WinRM } -ErrorAction Stop
   } catch {
       Write-Error "Failed to execute command: $_"
   }
   ```

2. **Timeout Management**: Set appropriate timeouts for long-running operations
   ```powershell
   Invoke-ImmyCommand { Start-Process -FilePath "C:\Setup.exe" -Wait } -Timeout 300
   ```

3. **Parallel Execution**: Use the `-Parallel` parameter for bulk operations
   ```powershell
   Get-ImmyComputer -TargetGroupFilter All | Invoke-ImmyCommand -Parallel { Get-HotFix }
   ```

4. **Variable Scope**: Use the `$using:` scope modifier to reference local variables
   ```powershell
   $appName = "Chrome"
   Invoke-ImmyCommand { Get-Process -Name "*$using:appName*" }
   ```

5. **Context Awareness**: Specify the appropriate context for your commands
   ```powershell
   # Run in system context (default)
   Invoke-ImmyCommand { Get-Service } -Context System

   # Run in user context
   Invoke-ImmyCommand { Get-Process } -Context User
   ```

