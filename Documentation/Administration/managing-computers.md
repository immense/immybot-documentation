# Managing Computers

This guide covers everything you need to know about managing computers in ImmyBot, from initial discovery to ongoing maintenance and reporting.

## Computer Discovery

ImmyBot can discover computers through several methods:

### RMM Integration

The most common method is through an RMM integration:

1. Configure your [RMM integration](/Documentation/Integrations/integration-overview.md)
2. ImmyBot automatically imports computers from your RMM
3. Computers are mapped to the appropriate tenants

### Manual Agent Installation

You can also manually install the ImmyBot agent:

1. Navigate to **Download ImmyAgent** in the left sidebar
2. Run the installer on the target computer
3. The computer will appear in the **New Computers** section

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
- **Actions**: Agent and maintenance logs

## Computer Actions

ImmyBot provides several actions you can perform on computers:

### Batch Actions

To perform actions on one or more computers:

1. Select one or more computers from the list
2. Click **Batch Actions** button
3. Choose from available actions in the sidebar:
   - Run Maintenance
   - Reassign to different tenant
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

Follow these best practices for effective computer management:

1. **Consistent Naming**: Establish a naming convention for computers
2. **Regular Maintenance**: Schedule automatic maintenance for all computers
3. **Inventory Review**: Regularly review software and hardware inventory

## Next Steps

Now that you understand how to manage computers in ImmyBot, you might want to explore:

- [Managing Software](/Documentation/HowToGuides/managing-software.md) - Learn how to manage software across your environment
- [Creating Deployments](/Documentation/HowToGuides/creating-managing-deployments.md) - Create effective deployments for your computers
- [Troubleshooting](/Documentation/Troubleshooting/troubleshooting.md) - Resolve common issues with computer management

