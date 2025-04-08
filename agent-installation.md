# Agent Installation

The ImmyBot Agent is a lightweight service that runs on managed computers and communicates with the ImmyBot server. This page explains the different methods for installing the agent and best practices for agent deployment.

## Understanding the ImmyBot Agent

The ImmyBot Agent is responsible for:

- Executing scripts and commands on the managed computer
- Reporting inventory information to the ImmyBot server
- Installing and configuring software
- Applying system settings and configurations
- Reporting maintenance status and results

## Agent Types

ImmyBot uses two types of agents:

### Persistent Agent

The Persistent Agent is a Windows service that runs continuously on the managed computer. It:

- Maintains a constant connection to the ImmyBot server
- Responds to commands and maintenance requests
- Reports inventory information on a regular schedule
- Handles scheduled maintenance sessions

### Ephemeral Agent

The Ephemeral Agent is a temporary agent that runs for a specific task and then terminates. It:

- Executes a single script or maintenance session
- Reports results back to the ImmyBot server
- Does not require installation or permanent presence on the computer
- Is useful for one-time tasks or computers that can't have the persistent agent installed

## Installation Methods

ImmyBot supports several methods for installing the agent:

### Provisioning Package (PPKG)

The PPKG method is ideal for new computers or computers being reimaged:

1. Navigate to **Download ImmyBot Agent** in the ImmyBot portal
2. Configure the PPKG options:
   - Select the tenant (or leave blank for manual assignment)
   - Choose whether to auto-onboard
   - Configure Windows Reset options if needed
3. Download the PPKG file
4. Copy the PPKG to a USB drive
5. Insert the USB drive during Windows Out-of-Box Experience (OOBE)
6. The PPKG will automatically install the ImmyBot agent

### Manual Installation

For existing computers that are already in use:

1. Navigate to **Download ImmyBot Agent** in the ImmyBot portal
2. Download the agent installer
3. Run the installer on the target computer with administrator privileges
4. The agent will install and connect to the ImmyBot server

### RMM Deployment

If you have an RMM integration configured:

1. Navigate to **Download ImmyBot Agent** in the ImmyBot portal
2. Download the agent installer
3. Create a deployment package in your RMM
4. Deploy the agent to target computers through your RMM
5. The agent will install and connect to the ImmyBot server

### Intune Deployment

For organizations using Microsoft Intune:

1. Use the "Deploy ImmyBot Agent to Intune" task in ImmyBot
2. Configure the task parameters:
   - Select the Azure tenant
   - Configure installation options
3. Run the task
4. ImmyBot will create an Intune package for the agent
5. Intune will deploy the agent to managed devices

### Embedding in an Image

For organizations that use system imaging:

1. Create a PPKG and place it in `C:\Recovery\Customizations` (create the folder if it doesn't exist)
2. Alternatively, use the SetupComplete method:
   - Place both the ImmyBot Agent installer and a SetupComplete.cmd file in the C:\Windows\Setup\Scripts directory
   - In SetupComplete.cmd, add: `start C:\Windows\Setup\Scripts\ImmyAgentInstallerBundle.exe /qn`
3. Another option is to use DISM:
   ```
   DISM.exe /Image:D:\mount /Add-ProvisioningPackage /PackagePath:C:\Users\Username\Downloads\ImmyBotAgentInstaller.ppkg
   ```

## Agent Configuration

### Installation Options

The agent installer supports several command-line options:

- `/qn`: Quiet installation with no user interface
- `/norestart`: Prevents automatic restart after installation
- `/log [path]`: Specifies a log file path for installation logging

### Agent Settings

After installation, the agent can be configured through:

1. Group Policy (for domain-joined computers)
2. Registry settings
3. Configuration files in the agent installation directory

## Agent Management

### Updating the Agent

ImmyBot automatically updates the agent when new versions are released. You can also manually update the agent:

1. Navigate to a computer's details page
2. Click **Update Agent**
3. The agent will update to the latest version

### Uninstalling the Agent

To uninstall the ImmyBot Agent:

1. Create a deployment for the "ImmyBot Agent" with the desired state set to "Uninstalled"
2. Run maintenance on the target computers

Alternatively, you can uninstall manually:

```powershell
wmic product where name="ImmyBot Agent" call uninstall /nointeractive
```

Or:

```powershell
$product = Get-WmiObject win32_product | where{$_.name -eq "ImmyBot Agent"}
msiexec /x $product.IdentifyingNumber /quiet /noreboot
```

## Troubleshooting

### Common Issues

- **Connection Issues**: Ensure the computer can reach the ImmyBot server
- **Installation Failures**: Check for security software blocking the installation
- **Authentication Errors**: Verify the agent has the correct authentication tokens
- **"SAS Token Expired" Error**: This occurs if the device's system time is incorrect. Ensure the system time is correct and restart the ImmyBot Agent Service.

### Agent Logs

Agent logs are stored in:

- `%ProgramData%\ImmyBot\Logs` for the persistent agent
- `%TEMP%\ImmyBot` for the ephemeral agent

Review these logs for troubleshooting installation and connectivity issues.

## Security Considerations

### Network Requirements

The ImmyBot Agent requires outbound access to:

- The ImmyBot server (HTTPS, port 443)
- Windows Update servers (for Windows updates)
- Software distribution servers (for software downloads)

### Security Software Exclusions

Some security software may block the agent's activities. Create exclusions for:

- The agent executable: `%ProgramFiles%\ImmyBot\ImmyBot.Agent.exe`
- The agent installation directory: `%ProgramFiles%\ImmyBot\`
- The agent data directory: `%ProgramData%\ImmyBot\`

### Code Signing

The ImmyBot Agent is signed with a code-signing certificate. The certificate details are:

Current Certificate (until Feb. 11th, 2025):
```
CN=Immense Networks, O=Immense Networks, L=Baton Rouge, S=Louisiana, C=US
```

New Certificate (from Feb. 11th, 2025):
```
CN=ImmyBot LLC, O=ImmyBot LLC, L=Baton Rouge, S=Louisiana, C=US
```

If you have security software that verifies code signatures, you may need to add both certificates to your trusted publishers list.

## Related Topics

- [Computer Onboarding](./computer-onboarding)
- [Maintenance Sessions](./maintenance-sessions)
- [Troubleshooting](./troubleshooting)
- [Security Best Practices](./security-best-practices)
