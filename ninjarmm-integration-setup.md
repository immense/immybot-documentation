<h1>NinjaRMM Dynamic Integration</h1>

<h3>Setting up this integration allows you to:</h3>

- Import customers from NinjaRMM
- Import computers from NinjaRMM
- Manage all computers in NinjaRMM without deploying the ImmyBot Agent
- Create ImmyBot Role in NinjaRMM

<h3>Configure the following in general settings (Administration -> General -> Settings):</h3>

- Ninja Agent uninstall prevention -> OFF
- Advanced Installer Options -> ON

<h3>ImmyBot currently requires the following client app scopes to operate correctly:</h3>

- Monitoring
- Management
- Control

<h3>As well as the following grant types:</h3>

- Authorization Code
- Refresh Token

<h2>Create a client app in your NinjaRMM instance using above permissions:</h2>
(Administration -> Apps -> Api -> Add)
 
![image](https://github.com/user-attachments/assets/5a27d217-a574-4a34-b42a-dd9a984e2ce1)
<p color="yellow">Note: Change the "instance" in the redirect uri to your ImmyBot subdomain</p>

<h2>Copy the below script to NinjaRMM Automation library and name it ImmyBot:</h2>
(Administration -> Library -> Automation -> Add -> New Script)
 
```powershell
Param(
    [Parameter(Mandatory=$true)]
    [string]$code
)

$bytes = [System.Convert]::FromBase64String($code)
$DecodedCommand = [System.Text.Encoding]::UTF8.GetString($bytes)

# Execute Script Content
iex $DecodedCommand
```

Make a note of the script Id in the URL https://{region}.ninjarmm.com/#/editor/script/71 -> 71. It will be needed as one of the parameters in the integration setup to run scripts.

<h2>In ImmyBot, create a new dynamic integration with the NinjaRMM integration type:</h2>
(Show More -> Integrations -> Add Integration -> NinjaRMM)

Add the required parameters and authenticate the OAuthInfo parameter with a NinjaRMM user with sufficient privileges:
![image](https://github.com/user-attachments/assets/78b760fd-b0f9-4230-9b3e-389d487dfea3)
<p color="yellow">Note: Currently the OAuthInfo parameter button will not stay when you refresh the browser window. </br>This will not kill your integration, so just leave it as is.</p>

At this point, you should be able to map clients. Once clients are mapped, agents will start getting identified.
