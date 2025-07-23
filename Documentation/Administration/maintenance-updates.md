# Creating Maintenance Sessions

This guide explains how to configure and manage maintenance sessions and updates in ImmyBot, ensuring your managed computers stay up-to-date and properly configured.

## Prerequisites

You must have already set up Software and / or Task deployments.
Please see [Deployments](/Documentation/HowToGuides/Creating-managing-deployments) for more information

## Scheduled Maintenance Sessions

Automated maintenance sessions are handled by Schedules. Please see [Schedules](/Documentation/HowToGuides/schedules.md) on how to accomplish this

You can control how often maintenance runs in the Schedule, please also see our [best practices](/Documentation/GettingStarted/instance-best-practices.html#scheduled-maintenance) for more information

## Manual Maintenance Sessions

You can also trigger maintenance sessions manually when needed. You can do it individually or in batch actions.

### Running Maintenance on a Single Computer

1. Navigate to **Computers**
2. Select the computer
3. Choose **Run Maintenance**
4. Select Reboot option
   - Suppress Reboots
   - Reboot if Necessary
   - Force Reboot
5. This will start the maintance session

### Running Maintenance on Multiple Computers

1. Navigate to **Computers**
2. Select multiple computers using the checkboxes
3. Click **Batch Actions** in the action bar
4. Under Maintenance Session select your settings
5. Click **Run**

## Maintenance Session Reviews

ImmyBot provides detailed accounting on maintenance activities.

### Viewing Maintenance Sessions

1. Navigate to **Sessions**
2. View all maintenance sessions across your environment
3. Filter by:
   - Status (Completed, Failed, In Progress)
   - Computer
   - Tenant
   - Date range

### Session Details

Click on any session to view detailed information:

- Actions performed
- Success/failure status
- Detailed logs
- Duration and timing
- Affected deployments

## Maintenance Notifications

ImmyBot can send notifications about maintenance activities.

### Configuring Email Notifications
::: info Set up SMTP settings before hand
You must have followed the information in the [SMTP](/Documentation/HowToGuides/smtp) Guide as well as the [Branding](/Documentation/HowToGuides/branding) guide for ImmyBot to send maintenance notifications.
:::

There are 2 ways to sent email notification for maintenance sessions.
1. Through AdHoc session options
   1. Edit the deployment you intent to run an adhoc session for
   2. Edit the maintance options on the right to send the required email
2. Through Schedules
   1. Within the [Schedules](/Documentation/HowToGuides/schedules), you can set the email notifcation requirements.


## Best Practices

Follow these best practices for effective maintenance management:

1. **Staggered Windows**: Create staggered maintenance windows to avoid overloading your infrastructure
2. **Test First**: Test updates on a small group before deploying widely
3. **Regular Review**: Periodically review maintenance logs and compliance reports
4. **Clear Communication**: Inform users about maintenance windows and expected changes
5. **Backup First**: Ensure critical systems have recent backups before major updates

## Troubleshooting

[Click here](/Documentation/Troubleshooting/troubleshooting) for more detailed troublshooting

If you encounter issues with maintenance sessions:

### Common Problems and Solutions

1. **Sessions Not Starting**
   - Check agent status
   - Verify maintenance window configuration
   - Check for server resource constraints

2. **Failed Actions**
   - Review detailed logs
   - Check for security software interference
   - Verify network connectivity
   - Ensure sufficient disk space

3. **Incomplete Sessions**
   - Check for timeout settings
   - Look for user interruptions
   - Verify deployment configurations
