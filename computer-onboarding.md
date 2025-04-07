# Computer Onboarding

Computer onboarding is the process of bringing new computers into your ImmyBot environment. This page explains the different onboarding methods and best practices for setting up new computers.

## Understanding Computer Onboarding

Onboarding is the first step in managing a computer with ImmyBot. During onboarding, ImmyBot:

1. Installs the ImmyBot agent
2. Gathers inventory information
3. Applies onboarding deployments
4. Configures the computer according to your standards

## Onboarding Methods

ImmyBot supports several methods for onboarding computers:

### USB Provisioning Package

The USB method is ideal for new computers or computers being reimaged:

1. Download the ImmyBot Provisioning Package (PPKG)
2. Copy the PPKG to a USB drive
3. Insert the USB drive during Windows Out-of-Box Experience (OOBE)
4. The PPKG will automatically install the ImmyBot agent and begin onboarding

### Manual Agent Installation

For existing computers that are already in use:

1. Download the ImmyBot agent installer
2. Run the installer on the target computer
3. The agent will connect to ImmyBot and begin onboarding

### RMM Integration

If you have an RMM integration configured:

1. ImmyBot discovers computers from your RMM
2. You can deploy the ImmyBot agent through your RMM
3. Once the agent is installed, onboarding begins automatically

### Intune Integration

For organizations using Microsoft Intune:

1. Use the "Deploy ImmyBot Agent to Intune" task
2. ImmyBot creates an Intune package for the agent
3. Intune deploys the agent to managed devices
4. Once the agent is installed, onboarding begins automatically

## The Onboarding Process

### New Computer Detection

When a new computer connects to ImmyBot:

1. The computer appears in the "New Computers" section
2. ImmyBot attempts to identify the computer based on its serial number and manufacturer
3. If a match is found, the computer is automatically associated with the existing record
4. If no match is found, you need to manually assign the computer to a tenant

### Tenant Assignment

To assign a computer to a tenant:

1. Navigate to the "New Computers" section
2. Select the computer
3. Click "Assign to Tenant"
4. Select the appropriate tenant
5. Click "Assign"

### Computer Setup

During onboarding, ImmyBot performs several setup tasks:

1. **Computer Naming**: Applies your naming convention
2. **Domain/Azure AD Join**: Joins the computer to your domain or Azure AD
3. **User Profile Creation**: Creates a profile for the primary user
4. **Software Installation**: Installs required software
5. **Configuration**: Applies system settings and configurations

## Onboarding Deployments

Onboarding deployments are special deployments that only run during the onboarding process:

### Creating Onboarding Deployments

1. Navigate to **Deployments**
2. Click **New**
3. Configure the deployment as usual
4. Set the enforcement type to **Onboarding**
5. Click **Create**

### Common Onboarding Deployments

- **Computer Naming**: Sets the computer name according to your naming convention
- **Domain Join**: Joins the computer to your Active Directory domain
- **Azure AD Join**: Joins the computer to Azure AD
- **Local Admin**: Creates or configures local administrator accounts
- **Security Software**: Installs antivirus and security tools
- **Standard Software**: Installs your standard software suite
- **Windows Updates**: Ensures Windows is up to date
- **BitLocker**: Enables disk encryption
- **Power Settings**: Configures power management settings

## Best Practices

### Preparation

- **Standardize Naming**: Establish a consistent naming convention
- **Create Tenant Structure**: Set up your tenant hierarchy before onboarding
- **Define Standard Software**: Determine what software should be installed on all computers
- **Configure Security Settings**: Define your security baseline

### Efficiency

- **Use USB Method for New Computers**: The USB method is fastest for new computers
- **Batch Onboarding**: Onboard multiple computers at once when possible
- **Automate Assignment**: Use RMM integration to automate tenant assignment
- **Prepare User Information**: Have user information ready before onboarding

### Troubleshooting

- **Check Agent Connectivity**: Ensure the agent can connect to ImmyBot
- **Review Maintenance Logs**: Check logs for any errors during onboarding
- **Verify Network Access**: Ensure the computer has internet access
- **Check Security Software**: Some security software may block the agent

## Related Topics

- [Deployments](./deployments)
- [Maintenance Sessions](./maintenance-sessions)
- [Agent Installation](./agent-installation)
- [Computer Naming](./computer-naming)
- [Domain Join](./domain-join)
- [Azure AD Join](./azure-ad-join)
