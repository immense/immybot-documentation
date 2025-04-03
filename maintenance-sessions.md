# Maintenance Sessions

Maintenance Sessions in ImmyBot are scheduled or on-demand processes that apply deployments to target computers. They ensure that software and configurations are consistently applied according to defined policies.

## Overview

The Maintenance Sessions page provides a centralized view of all maintenance activities in your ImmyBot environment. From this page, you can:

- Monitor the status of ongoing and completed maintenance sessions
- Filter sessions by type, status, and time period
- Initiate new maintenance sessions for individual or multiple computers
- View detailed logs and results for each session

![Maintenance Sessions List](./public/maintenance-sessions-list.png)

## Types of Maintenance Sessions

ImmyBot supports several types of maintenance sessions, each designed for specific scenarios:

### Full Maintenance

Full maintenance sessions apply all required deployments to target computers. This ensures that computers have all necessary software installed and configured according to your policies.

- Applies all required deployments to a computer
- Checks for software updates and installs them if needed
- Applies configuration tasks and scripts
- Runs on a schedule or on-demand

### Targeted Maintenance

Targeted maintenance sessions focus on specific deployments rather than applying all policies. This is useful when you need to deploy or update specific software quickly.

- Applies only selected deployments to computers
- Faster than full maintenance for urgent updates
- Can target specific software or configuration tasks
- Useful for testing new deployments on a limited set of computers

### Onboarding

Onboarding sessions are special maintenance sessions that run when a new computer is added to ImmyBot. They ensure that new computers receive all required software and configurations.

- Applies deployments marked for onboarding
- Sets up new computers with standard configurations
- Installs required software packages
- Runs automatically when computers are added to ImmyBot

### Detection

Detection sessions scan computers for installed software without making any changes. This is useful for inventory purposes and for planning future deployments.

- Scans computers for installed software
- Updates the software inventory in ImmyBot
- Does not install or modify any software
- Useful for auditing and compliance reporting

## Maintenance Session States

Maintenance sessions progress through several states during their lifecycle:

- **Pending**: Session is queued but not yet started
- **Running**: Session is currently executing
- **Completed**: Session has finished successfully
- **Failed**: Session encountered errors
- **Cancelled**: Session was manually cancelled

## Scheduling Maintenance

ImmyBot provides flexible scheduling options for maintenance sessions:

- **On-demand**: Run maintenance immediately when needed
- **Recurring**: Schedule maintenance to run automatically on a daily, weekly, or monthly basis
- **Maintenance Windows**: Define specific time periods when maintenance can run
- **Computer Events**: Trigger maintenance when computers start up or shut down

## Batch Actions

The Batch Actions panel allows you to perform maintenance operations on multiple computers simultaneously:

- Run full maintenance on selected computers
- Run detection with inventory on selected computers
- Schedule maintenance for a future time
- Apply specific deployments to selected computers

## Viewing Maintenance Results

Each maintenance session provides detailed results to help you understand what happened during the session:

- Success/failure status for each deployment
- Detailed logs of actions taken
- Error messages for troubleshooting
- Duration of each deployment
- Overall session statistics

## Best Practices

For optimal results with maintenance sessions:

- Schedule regular maintenance during off-hours to minimize user disruption
- Use maintenance windows to ensure maintenance runs only during appropriate times
- Review maintenance logs regularly to identify and address recurring issues
- Test new deployments on a limited set of computers before deploying widely
- Use targeted maintenance for urgent updates that can't wait for scheduled maintenance
- Monitor failed maintenance sessions and address issues promptly
