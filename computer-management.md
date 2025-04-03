# Computer Management

Computer Management in ImmyBot allows you to view, organize, and maintain all computers across your organization or client base. The system provides comprehensive tools for tracking computer status, running maintenance, and managing the computer lifecycle.

## Computer List

The Computer List page is the central hub for managing all computers in your ImmyBot instance. It provides a comprehensive view of your managed devices, organized into several tabs:

### Tabs

- **Active**: All currently active computers in your system
- **New**: Computers that need to be onboarded
- **Pending**: Computers with pending agent identification issues
- **Stale**: Computers that have been offline for an extended period
- **Lab**: Development and testing virtual machines
- **Deleted**: Computers that have been removed from the system
- **Agents**: View of all agents across computers (MSP feature)

### Key Features

- **Batch Actions**: Perform actions on multiple selected computers
- **Filtering**: Filter computers by name, tenant, or other properties
- **Online Status**: Toggle to show or hide offline computers
- **Maintained Computers**: Filter to show only computers that have had maintenance sessions during the current billing cycle

![Computer List Page](./public/computer-list.png)

## Computer Details

The Computer Details page provides comprehensive information about a specific computer, organized into tabs:

### Overview Tab

General information about the computer, including:
- Computer name, operating system, and manufacturer
- Primary user and tenant
- Online status and agent information
- Quick actions for maintenance and remote control

### Software Tab

View and manage software installed on the computer:
- Currently installed software
- Software deployment status
- Software compliance information

### Sessions Tab

View maintenance session history:
- Current and past maintenance sessions
- Session status and results
- Detailed logs for troubleshooting

### Actions Tab

View individual maintenance actions:
- Software installations and updates
- Task executions
- Action status and results

### Additional Tabs

- **Drives**: Physical and logical disk information
- **Networking**: Network adapter configuration and status
- **Antivirus**: Antivirus software status and configuration
- **Processes**: Running processes on the computer
- **Registry**: Windows registry access and management
- **Agents**: Provider agents installed on the computer
- **Terminal**: Command-line access to the computer
- **User Affinity**: User associations with the computer
- **Onboarding**: Computer onboarding status and actions

![Computer Details Page](./public/computer-details.png)

## Computer Lifecycle

Computers in ImmyBot go through several states:

1. **Needs Onboarding**: A new computer that requires initial setup
2. **Onboarding**: A computer currently going through the onboarding process
3. **Onboarded**: A fully configured computer ready for maintenance
4. **Stale**: A computer that has been offline for an extended period
5. **Deleted**: A computer that has been removed from the system

### Onboarding Process

The onboarding process typically includes:
1. Agent installation
2. Initial inventory collection
3. Software deployment based on applicable rules
4. Configuration tasks execution

## Key Actions

### Run Maintenance

Execute maintenance tasks on a computer:
- Software installations and updates
- Configuration tasks
- Inventory updates

### Run Detection with Inventory

Update software inventory and detection status:
- Collects current software inventory
- Determines compliance with deployments
- Updates detection status for future maintenance

### Set to Needs Onboarding

Reset a computer to the onboarding state:
- Useful for computers that need to be reconfigured
- Triggers the onboarding process again

### Remote Control

Access a computer remotely through provider integrations:
- Connect to the computer using integrated remote control tools
- Available through compatible provider integrations

### Batch Actions

Perform actions on multiple computers simultaneously:
- Run maintenance on multiple computers
- Update inventory across multiple computers
- Set multiple computers to needs onboarding
- Delete multiple computers

## Computer Identification

ImmyBot identifies computers using a unique Device ID. When a new agent connects, ImmyBot attempts to match it with an existing computer based on:

1. Device ID
2. Computer name
3. Serial number
4. Other identifying information

If a match cannot be determined automatically, the computer will appear in the Pending tab for manual resolution.

## Troubleshooting

### Common Issues

- **Agent Connection Issues**: Check network connectivity and firewall settings
- **Identification Failures**: Resolve in the Pending tab
- **Maintenance Failures**: Check session logs for detailed error information
- **Stale Computers**: Verify the computer is online and the agent is running

### Agent Circuit Breaker

ImmyBot implements a circuit breaker pattern for agent connections:
- Prevents excessive retries on problematic computers
- Can be reset from the Computer Details page
- Automatically resets after a cooling-off period

## Best Practices

- Regularly review the Stale tab to identify computers that may need attention
- Use tags to organize computers for easier management
- Leverage batch actions for efficient maintenance
- Resolve pending identification issues promptly
- Document custom configurations in the computer notes
