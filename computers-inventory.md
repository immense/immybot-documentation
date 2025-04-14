# Computers & Inventory

ImmyBot provides comprehensive computer management and inventory capabilities. This page explains how to track, manage, and maintain your computer inventory.

## Computer Discovery

ImmyBot can discover computers through several methods:

### Agent-Based Discovery

When you install the ImmyBot agent on a computer, it automatically registers with your ImmyBot instance and appears in your inventory.

### RMM Integration Discovery

If you've set up an RMM integration, ImmyBot can discover computers from your RMM platform. This allows you to manage computers without installing the ImmyBot agent.

### Agent Installation

The primary way to add computers to ImmyBot is by installing the ImmyBot agent:

1. Download the agent installer from ImmyBot
2. Run the installer on the target computer
3. The computer will automatically register with ImmyBot

For detailed instructions, see [Agent Installation](./agent-installation).

## Computer Information

ImmyBot collects and displays detailed information about each computer:

### System Information

- **Hostname**: The computer's network name
- **Operating System**: Windows or macOS version
- **Domain**: Active Directory domain (if applicable)
- **IP Address**: Local and public IP addresses
- **MAC Address**: Network adapter MAC addresses
- **Last Seen**: When the computer last connected to ImmyBot

### Hardware Information

- **Manufacturer**: Computer manufacturer (Dell, HP, etc.)
- **Model**: Computer model
- **Serial Number**: Hardware serial number
- **Processor**: CPU model and specifications
- **Memory**: Installed RAM
- **Storage**: Disk drives and capacity
- **Graphics**: GPU information

### Software Inventory

ImmyBot maintains a list of installed software on each computer:

- **Installed Applications**: All detected software
- **Version Information**: Current version of each application
- **Installation Date**: When the software was installed
- **Installation Source**: How the software was installed (ImmyBot, manual, etc.)

## Computer Management

### Computer Tags

Organize computers using tags for easier management:

1. Navigate to a computer's details page
2. Click **Edit Tags**
3. Add or remove tags
4. Click **Save**

Tags can then be used for targeting deployments and filtering computers in the inventory view.

### Computer Filters

Create dynamic filters to group computers based on criteria:

1. Navigate to **Computers** > **Filters**
2. Click **Add Filter**
3. Define filter criteria (OS, hardware, software, etc.)
4. Enter a name and description
5. Click **Save**

### Computer Tags

Apply tags to computers for custom categorization:

1. Navigate to a computer's details page
2. Click **Edit Tags**
3. Add or remove tags
4. Click **Save**

## Inventory Reports

ImmyBot provides several reports to help you manage your inventory:

### Software Inventory Report

View software installed across your environment:

1. Navigate to **Reports** > **Software Inventory**
2. Filter by tenant, computer group, or software
3. Export the report if needed

### Hardware Inventory Report

View hardware details across your environment:

1. Navigate to **Reports** > **Hardware Inventory**
2. Filter by tenant, computer group, or hardware criteria
3. Export the report if needed

### Compliance Report

Check computers against your deployment requirements:

1. Navigate to **Reports** > **Compliance**
2. View computers that are missing required software
3. Take action to bring computers into compliance

## Best Practices

### Inventory Management

- **Regular Scanning**: Schedule regular inventory scans to keep data current
- **Consistent Naming**: Use consistent naming conventions for computers
- **Group Organization**: Create logical computer groups based on function or location
- **Tag Usage**: Use tags to mark computers with special requirements or characteristics

### Data Quality

- **Complete Information**: Ensure all computers have complete profile information
- **Regular Cleanup**: Remove decommissioned computers from your inventory
- **Verification**: Periodically verify inventory accuracy against physical assets

## Related Topics

- [Computer Onboarding](./onboarding)
- [Maintenance Sessions](./maintenance-sessions)
- [Deployments](./deployments)
