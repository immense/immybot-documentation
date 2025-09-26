# NinjaRMM Dynamic Integration

### Setting up this integration allows you to:

- Import customers from NinjaRMM
- Import computers from NinjaRMM
- Manage all computers in NinjaRMM without deploying the ImmyBot Agent
- Create ImmyBot Role in NinjaRMM

### Configure the following in general settings (Administration -> General -> Settings):

- Ninja Agent uninstall prevention -> OFF (Optional: This permission is only needed so ImmyBot can also uninstall the Ninja agent)
- Advanced Installer Options -> ON

### ImmyBot currently requires the following client app scopes to operate correctly:

- Monitoring
- Management
- Control

### As well as the following grant types:

- Authorization Code
- Refresh Token

## Create a client app in your NinjaRMM instance using above permissions:
(`Administration` -> `Apps` -> `Api` -> `Add`)

1. Set the Application platform to Web
2. Set the Name to ImmyBot or whatever you want
3. Set the redirect URI to `https://<instance>.immy.bot/consent-callback`
   - You need to press Enter after inputting your URI.
   > [!WARNING]
   > Note: Change the "instance" in the redirect uri to your ImmyBot subdomain

4. Under scopes check `Monitoring`, `Management`, and `Control`
5. Under Allowed Grant Types select `Authorization Code` and `Refresh Token`

![image](https://github.com/user-attachments/assets/5a27d217-a574-4a34-b42a-dd9a984e2ce1)

## Copy the below script to NinjaRMM Automation library and name it ImmyBot:
(`Administration` -> `Library` -> `Automation` -> `Add` -> `New Script`)

```powershell
Param(
    [Parameter(Mandatory=$true)]
    [string]$code
)

$bytes = [System.Convert]::FromBase64String($code)
$DecodedCommand = [System.Text.Encoding]::UTF8.GetString($bytes)

# Execute Script Content
iex $DecodedCommand
Write-Host "Ephemeral Agent started"
```
The script should be set to
- Name: ImmyBot
- Language: Powershell
- Operating System: Windows
- Architecture: All
- Run As: System
### Note the Script ID
Before leaving the script, also create a `Script Variable`.
1. Hit `+ Add` next to `Script Variables`.
2. Select the `String/Text` type.
3. Enter `Code` as the variable name.
4. Hit `Add` to save it.

Note the script Id in the URL `https://{region}.ninjarmm.com/#/editor/script/71` -> `71`.
It will be needed as one of the parameters in the integration setup to run scripts.

## In ImmyBot, create a new dynamic integration with the NinjaRMM integration type:
(`Show More` -> `Integrations` -> `Add Integration` -> `NinjaRMM`)

Add the required parameters and authenticate the OAuthInfo parameter with a NinjaRMM user with sufficient privileges:

- Name: NinjaRMM
- ClientID: Provided to you by NinjaRMM
- ClientSecret: Provided to you by NinjaRMM
- Region: This is the subdomain
- ScriptID: From the URL in the [script step above](/Documentation/Integrations/ninjarmm-integration-setup.html#note-the-script-id)


![image](https://github.com/user-attachments/assets/78b760fd-b0f9-4230-9b3e-389d487dfea3)
> [!WARNING]
> At this time Client IDs do not support special characters.
> Please create a new client app if one is generated for you.


> [!WARNING]
> Currently the UI element for the OAuthInfo parameter button will not persist when you refresh the browser window.
> This will not kill your integration, so just leave it as is.


At this point, you should be able to map clients. Once clients are mapped, agents will start getting identified.
