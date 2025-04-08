# Managing Computers

This guide covers everything you need to know about managing computers in ImmyBot, from initial discovery to ongoing maintenance and reporting.

## Computer Discovery

ImmyBot can discover computers through several methods:

### RMM Integration

The most common method is through an RMM integration:

1. Configure your [RMM integration](./integration-overview.md)
2. ImmyBot automatically imports computers from your RMM
3. Computers are mapped to the appropriate tenants

### Manual Agent Installation

You can also manually install the ImmyBot agent:

1. Find the agent installers in the sidebar's bottom section
2. Download the appropriate installer for your operating system
3. Run the installer on the target computer
4. The computer will appear in the **New Computers** section

### Provisioning Package

For new computers or reimaged devices:

1. Create an ImmyBot USB drive or ISO
2. Use it during Windows setup
3. The computer will connect to ImmyBot automatically

## Computer Inventory

The **Computers** section provides a comprehensive view of all managed computers:

### Viewing Computers

1. Navigate to **Computers** in the left sidebar
2. Use filters to narrow down the list:
   - Status (Online/Offline)
   - Customer
   - Operating System
   - Tags
   - Custom attributes

### Computer Details

Click on any computer to view detailed information:

- **Overview**: General information and status
- **Software**: Installed software inventory
- **Hardware**: Detailed hardware specifications
- **Sessions**: History of maintenance sessions
- **Logs**: Agent and maintenance logs
- **Settings**: Computer-specific settings

## Computer Actions

ImmyBot provides several actions you can perform on computers:

### Batch Actions

To perform actions on one or more computers:

1. Select one or more computers from the list
2. Click **Batch Actions** button
3. Choose from available actions in the sidebar:
   - Run Maintenance
   - Remote Control
   - Power Actions (Restart, Shutdown, Wake)
   - Reassign to different tenant or user
   - Delete Computer
   - Add/Remove Tags

### Individual Computer Actions

You can also perform actions on individual computers:

1. Click on a computer to view its details
2. Use the action buttons in the computer details view
3. Available actions include:
   - Run Maintenance
   - Remote Control
   - Edit Computer Details
   - View Maintenance History

## Computer Tags and Filtering

ImmyBot allows you to organize computers using tags and filters:

### Using Tags

Tags help categorize and filter computers:

1. Select one or more computers from the list
2. Click **Batch Actions**
3. Select **Add/Remove Tags**
4. Add appropriate tags to categorize computers
5. Use the filter bar to filter computers by tag

### Advanced Filtering

The Computers list offers powerful filtering capabilities:

1. Click the filter icon in the column headers
2. Select from predefined filters or create custom filters
3. Combine multiple filters for precise computer selection
4. Save frequently used filters for quick access

## Computer Information and Reporting

ImmyBot provides detailed information about your managed computers:

### Software Inventory

To view software installed on a computer:

1. Click on a computer in the Computers list
2. Navigate to the **Software** tab
3. View all installed software with version information
4. Filter by software name or status

### Hardware Information

To view hardware details:

1. Click on a computer in the Computers list
2. Navigate to the **Hardware** tab
3. View processor, memory, disk, and other hardware specifications

### Maintenance History

To view maintenance history:

1. Click on a computer in the Computers list
2. Navigate to the **Sessions** tab
3. View all maintenance sessions that have run on the computer
4. Click on a session to view detailed results

## Best Practices

### Computer Naming

Use consistent naming conventions for computers:

- Include location or department
- Include computer type (desktop, laptop, server)
- Use a numbering system for easy identification

Example: `NYC-ACCT-LT-001` for an accounting department laptop in New York.

### Computer Tags

Use tags to organize computers by:

- Department
- Location
- Hardware type
- Software requirements
- Maintenance schedule

### Regular Maintenance

Schedule regular maintenance to keep computers up to date:

1. Create maintenance windows during off-hours
2. Use the **Schedules** feature to automate maintenance
3. Monitor maintenance results for failures
4. Address issues promptly to prevent downtime

### Computer Retirement

When retiring a computer:

1. Back up any important data
2. Remove the computer from any deployments
3. Delete the computer from ImmyBot
4. Document the retirement in your asset management system

## Troubleshooting

### Computer Not Appearing

If a newly installed computer doesn't appear:

1. Verify the agent is installed correctly
2. Check network connectivity to the ImmyBot server
3. Verify firewall settings allow agent communication
4. Check for agent logs on the computer

### Agent Connection Issues

If a computer shows as offline:

1. Verify the computer is powered on and connected to the network
2. Check if the ImmyBot agent service is running
3. Restart the agent service if necessary
4. Check for network restrictions that might block agent communication

### Maintenance Failures

If maintenance fails on a computer:

1. Check the maintenance logs for specific errors
2. Verify the computer meets the requirements for the deployed software
3. Check for conflicts with existing software
4. Try running maintenance again with verbose logging enabled

## Related Topics

- [Deployment Resolution](./deployment-resolution.md)
- [Agent Installation](./agent-installation.md)
- [Computer Onboarding](./computer-onboarding.md)
- [User Affinity](./user-affinity.md)

---

**Next Steps:** [Agent Installation →](./agent-installation.md) | [Computer Onboarding →](./computer-onboarding.md)
