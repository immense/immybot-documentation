# Executing Scripts on the Server

Immy provides different ways of executing a script on the ImmyBot server.  When used properly they can be very powerful.

## Common Commands

These commands are available in all server-side scripts.

### Connect-ImmyAzureAD

Provides a wrapper around `Connect-AzureAD`

- https://docs.microsoft.com/en-us/powershell/module/azuread/connect-azuread?view=azureadps-2.0

#### Examples

Coming soon

### Get-ImmyAzureAuthHeader

Obtains an auth header for the specified endpoint

#### Usage

```powershell
Get-ImmyAzureAuthHeader [-Endpoint] <["MSGraph", "AzureAD"]>
```

Returns a `[dictionary]` containing the auth header

#### Examples

Coming soon

### Get-ImmyGraphAccessToken

Obtains an access token for the specified endpoint

#### Usage

```powershell
Get-ImmyGraphAccessToken [-Endpoint] <["MSGraph", "AzureAD"]>
```

Returns a `[string]` containing the access token

#### Examples

Coming soon

### Get-RMMProvider

Retrieves an instance of an RMM Provider for the specified type.

#### Usage

```powershell
Get-RmmProvider [-ProviderType] <["CWAutomate", "CWControl", "ImmyAgent"]>
```

#### Examples

Coming soon

## Metascript Commands

### Send-ImmyEmail

Sends an Immybot styled email.  If no `To` is provided, then the email will be sent using the same logic for sending the detection emails during a maintenance session.

#### Usage

```powershell
Send-ImmyEmail [-Subject] <string> [-Body] <string> [[-To] <List[string]>] [[-Bcc] <List[string]>]
```

#### Examples

Coming Soon

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

Coming Soon

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