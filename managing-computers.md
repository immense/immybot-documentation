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

1. Navigate to **Download ImmyAgent** in the left sidebar
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

### Maintenance

To run maintenance on a computer:

1. Select the computer from the list
2. Click **Maintenance** in the action bar
3. Choose **Run Maintenance**
4. Select options for the maintenance session
5. Click **Start**

### Remote Control

To connect to a computer remotely:

1. Select the computer from the list
2. Click **Remote Control** in the action bar
3. Choose your preferred remote control method
4. The remote session will open in a new tab

### Power Actions

To perform power actions:

1. Select the computer from the list
2. Click **Power** in the action bar
3. Choose from:
   - Restart
   - Shutdown
   - Wake (requires Wake-on-LAN support)

### Reassign

To change a computer's customer or primary user:

1. Select the computer from the list
2. Click **Reassign** in the action bar
3. Select the new customer and/or primary user
4. Click **Save**

## Computer Groups

Computer groups help organize computers and target deployments:

### Creating Computer Groups

1. Navigate to **Computer Groups** in the left sidebar
2. Click **Create Group**
3. Enter a name and description
4. Choose the group type:
   - **Static**: Manually add computers
   - **Dynamic**: Use a filter script to determine membership
5. Add computers or configure the filter script
6. Click **Save**

### Using Computer Groups

Computer groups can be used to:

- Target deployments to specific sets of computers
- Organize computers by function, department, or location
- Create reports on specific computer sets
- Apply bulk actions to multiple computers

## Computer Reporting

ImmyBot provides several ways to report on computer status:

### Software Inventory

To view software across your environment:

1. Navigate to **Reports** > **Software Inventory**
2. Filter by software name, version, or status
3. Group by customer, operating system, or other attributes
4. Export the report if needed

### Hardware Inventory

To view hardware information:

1. Navigate to **Reports** > **Hardware Inventory**
2. Filter by hardware specifications
3. Identify computers that need upgrades
4. Export the report if needed

### Compliance Reporting

To check deployment compliance:

1. Navigate to **Reports** > **Compliance**
2. View which computers are missing required deployments
3. Filter by deployment or customer
4. Take action on non-compliant computers

## Best Practices

Follow these best practices for effective computer management:

1. **Consistent Naming**: Establish a naming convention for computers
2. **Regular Maintenance**: Schedule automatic maintenance for all computers
3. **Group Organization**: Create logical computer groups for targeting
4. **Tag Usage**: Use tags to add custom attributes for filtering
5. **Inventory Review**: Regularly review software and hardware inventory

## Next Steps

Now that you understand how to manage computers in ImmyBot, you might want to explore:

- [Managing Software](./managing-software.md) - Learn how to manage software across your environment
- [Creating Deployments](./creating-deployments.md) - Create effective deployments for your computers
- [Troubleshooting](./troubleshooting.md) - Resolve common issues with computer management

---

**Next Steps:** [Managing Software →](./managing-software.md) | [Creating Deployments →](./creating-deployments.md)
