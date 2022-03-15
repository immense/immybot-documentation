# Metascripts / Cloud Scripts

A Metascript is a script that runs scripts. These scripts run in the backend of ImmyBot. A Metascript can run a script on a computer using Invoke-ImmyCommand, which is modelled after PowerShell's native Invoke-Command, up to and including the ability to pass real objects into and out of the remote runspace, while preserving stream information. We consider our approach superior to capturing standard output and standard error as a string like most automation tools.

Metascripts allow you to do things like persist reboots since the context is held by the backend.

A Cloud script is the same as a Metascript except it targets a Tenant instead of a specific computer. This is useful for manipulating settings in each customer's Azure environment.

Collectively we refer to Metascripts and Cloud scripts as server-side scripts.

## Common Commands

These commands are available in all server-side scripts.

### Connect-ImmyAzureAD

Provides a wrapper around `Connect-AzureAD`

- https://docs.microsoft.com/en-us/powershell/module/azuread/connect-azuread?view=azureadps-2.0

#### Example

```powershell
Connect-ImmyAzureAD 
Get-AzureADUser -All $true
```

### Get-ImmyAzureAuthHeader

Obtains an auth header for the specified endpoint

#### Usage

```powershell
Get-ImmyAzureAuthHeader [-Endpoint] <["MSGraph", "AzureAD"]>
```

Returns a `[dictionary]` containing the auth header

#### Examples

```powershell
$Header = Get-ImmyAzureAuthHeader -ErrorAction Stop
$Groups = Invoke-RestMethod "https://graph.microsoft.com/v1.0/groups/
```
### Get-ProviderInfo

Retrieves an instance of an RMM Provider for the specified type.

#### Alias
Get-RmmInfo

#### Usage

```powershell
Get-ProviderInfo [[-ProviderType] <string>] [-IncludeClients] [<CommonParameters>]
```

#### Examples

```powershell
param(
    [string]$FieldName,
    [string]$Value,
    $Computer
)

if(!$Computer)
{
    $Computer = Get-ImmyComputer
}
$RmmComputer = Get-RmmComputer -Computer $Computer -ProviderType CWAutomate
$RmmInfo = Get-ProviderInfo -ProviderType CWAutomate

$EDF = Get-CWAComputerEDF -FieldName $FieldName -Computer $Computer
if(!$EDF)
{
    Write-Warning "Aborting: Unable to find EDF $FieldName"
    return
}

$ExtraFieldDefinitionId = $EDF.ExtraFieldDefinitionId
$ValueProperty = $EDF | select *FieldSettings* | Get-Member -MemberType NoteProperty | select -First 1 | %{$_.Name}
$PatchPath = "$ValueProperty/Value"
$Uri = "cwa/api/v1/computers/$($RmmComputer.RmmDeviceId)/extrafields/$ExtraFieldDefinitionId"
$Body = ConvertTo-Json @(@{"op"="replace";"path"=$PatchPath;"value"=$Value})
Invoke-CWARestMethod $Uri -Provider $RmmInfo.Provider -Method PATCH -Body $Body
```

## Metascript Commands

### Invoke-ImmyCommand

A powerful command that allows you to execute scripts remotely on devices.

#### Usage

```powershell
Invoke-ImmyCommand [-ScriptBlock] <Object> [-Computer <PSComputer>] [-Context <string>] [-ArgumentList <array>] [-Timeout <int>] [-ConnectTimeout <int>] [-DisableConnectTimeoutWarnings] [-Parallel] [<CommonParameters>]
```

`-Context` accepts either "System" or "User"

`-Timeout` accepts an integer denoted in seconds. The default is 120.

`-Parallel` (switch, makes the script block run on all the computers simultaneously instead of in series)

`-ConnectTimeout` (integer, seconds, to override the amount of time before giving up on trying to start the script on a computer)

`-DisableConnectTimeoutWarnings` (switch, to suppress "WARNING: Timed out waiting for script to start on COMPUTER" for every computer that fails to start within the connect timeout).

#### Examples

```powershell
<# Execute a metascript against the primary computer #>
Invoke-ImmyCommand {
  <# add powershell to run on the comptuer #>
  write-output "hello"
}
```

```powershell
<# Retrieve a list of computers and run a command on all of them #>
Get-ImmyComputer -TargetGroupFilter All | Invoke-ImmyCommand {
  Write-Output "Hello"
}
```
### Send-ImmyEmail

Sends an Immybot styled email.  If no `To` is provided, then the email will be sent using the same logic for sending the detection emails during a maintenance session.

#### Usage

```powershell
Send-ImmyEmail [-Subject] <string> [-Body] <string> [[-To] <List[string]>] [[-Bcc] <List[string]>]
```

#### Examples

```powershell
<# Sends an email using the same logic used in sending detection emails out during maintenance. #>
Send-ImmyEmail -Subject "Test" -Body "Some Body"
```

### Refresh-ComputerSystemInfo

#### Usage

This command will run an inventory command to refresh the following computer information:

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

```powershell
Refresh-ComputerSystemInfo [[-Computer] <PSComputer>]
```

#### Examples

```powershell
<# If you do not supply the Computer parameter, then it will default to using the computer for the current session #>
Refresh-ComputerSystemInfo
```

```powershell
<# This will refresh the computer system info for all servers. #>
Get-ImmyComputer -TargetGroupFilter Servers | Refresh-ComputerSystemInfo
```


### Get-RmmComputer

Coming Soon

### Get-ImmyComputer

Coming Soon

## Filterscript Commands

### Get-ImmyComputer

Returns a list of computers for the specified tenant, or all computers if it is cross tenant scoped.

#### Usage

```powershell
Get-ImmyComputer [-InventoryKeys] <string[]>
```

#### Examples

Coming soon

## Software Auto Update Commands

### Add-Script

Coming Soon

### Get-Script

Coming Soon

### Add-SoftwareVersion

#### Usage

```powershell
Add-SoftwareVersion [-SoftwareVersion <SoftwareVersion>]
  [-SoftwareType {GlobalSoftware | LocalSoftware | WindowsUpdate | Chocolatey | Ninite}]
  [-DisplayName <string>]
  [-SemanticVersion <string>]
  [-TestRequired <bool>]
  [-Url <string>]
  [-RelativeCacheSourcePath <string>]
  [-InstallerFile <string>]
  [-PackageHash <string>]
  [-TestFailedError <string>]
  [-InstallScriptId <int>]
  [-InstallScriptType {Global | Local}]
  [-TestScriptId <int>]
  [-TestScriptType {Global | Local}]
  [-UpgradeScriptId <int>]
  [-UpgradeScriptType {Global | Local}]
  [-UninstallScriptId <int>]
  [-UninstallScriptType {Global | Local}]
  [-PostInstallScriptId <int>]
  [-PostInstallScriptType {Global | Local}]
  [-PostUninstallScriptId <int>]
  [-PostUninstallScriptType {Global | Local}]
  [-LicenseType {None | LicenseFile | Key}]
  [-UpgradeStrategy {None | UninstallInstall | InstallOver | UpgradeScript}]
  [-PackageType {None | EntireFolder | InstallerFile}]
  [-InstallerType {None | File | Url}]
  [-BlobName <string>]
  [-Notes <string>]
  [-ProductCode <string>]
  [<CommonParameters>]
```

#### Examples

```powershell
$download_page = Invoke-WebRequest -Uri 'https://github.com/dbeaver/dbeaver/releases/latest' -UseBasicParsing
$url = $download_page.links | ? href -match '\.exe$' | select -Expand href -First 1 | % { 'https://github.com' + $_ }
$versionString = $url -split '/' | select -Last 1 -Skip 1
$latestVersion = $SoftwareVersions | sort SemanticVersion | select -last 1
$createdVersion = Add-SoftwareVersion -SoftwareVersion $latestVersion -SemanticVersion  $versionString -Url $url
```

### Get-AllLocalScripts

Coming Soon

### Get-AllGlobalScripts

Coming Soon

## CW Automate Commands

### Invoke-CWAQuery

Coming Soon

### Invoke-CWARestMethod

Coming Soon

### Get-CWARestPages

Coming Soon
