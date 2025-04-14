# Maintenance Tasks

Maintenance Tasks in ImmyBot are scripts and actions that configure systems or perform maintenance operations. This page explains how to create, manage, and use maintenance tasks.

## Understanding Maintenance Tasks

Maintenance Tasks are PowerShell or Shell scripts that perform specific actions on managed computers. They can:

- Configure system settings
- Install or configure software
- Perform maintenance operations
- Troubleshoot issues
- Collect information

## Types of Maintenance Tasks

ImmyBot supports several types of maintenance tasks:

### PowerShell Tasks

PowerShell tasks run PowerShell scripts on Windows computers. They can:

- Modify registry settings
- Configure Windows features
- Manage services
- Interact with the file system
- Execute Windows commands

### Shell Tasks

Shell tasks run Bash or Zsh scripts on macOS computers. They can:

- Configure system preferences
- Manage applications
- Set up user environments
- Execute terminal commands

### MetaScripts

MetaScripts run on the ImmyBot server and can orchestrate actions across multiple computers. They can:

- Coordinate complex deployments
- Manage dependencies between tasks
- Process data from multiple sources
- Make decisions based on computer information

### Cloud Scripts

Cloud Scripts run in the cloud and can interact with external APIs and services. They can:

- Connect to cloud services
- Process data from external sources
- Trigger actions in other systems
- Perform operations that don't require direct computer access

## Creating Maintenance Tasks

### Basic Task Creation

1. Navigate to **Maintenance Tasks**
2. Click **Add Task**
3. Enter the task details:
   - Name
   - Description
   - Category
   - Script type (PowerShell, Shell, MetaScript, Cloud)
4. Write or paste your script
5. Click **Save**

### Adding Parameters

Parameters allow you to customize task behavior:

1. In the task editor, click **Add Parameter**
2. Configure the parameter:
   - Name
   - Data type (string, number, boolean, etc.)
   - Default value
   - Description
   - Required/Optional
3. Click **Save**

### Setting Execution Context

The execution context determines how the task runs:

- **System**: Runs with system privileges
- **User**: Runs in the user context
- **MetaScript**: Runs on the ImmyBot server
- **Cloud**: Runs in the cloud

Select the appropriate context based on your task's requirements.

## Using Maintenance Tasks

### Deploying Tasks

To deploy a maintenance task:

1. Navigate to **Deployments**
2. Click **New**
3. Select **Task** as the maintenance item type
4. Choose your maintenance task
5. Configure any parameters
6. Select the target and enforcement type
7. Click **Create**

### Running Tasks Manually

To run a task manually:

1. Navigate to **Computers**
2. Select the target computer
3. Click **Run Task**
4. Select your maintenance task
5. Configure any parameters
6. Click **Run**

### Scheduling Tasks

To schedule a task:

1. Navigate to **Scheduled Maintenance**
2. Click **Add Schedule**
3. Select your maintenance task
4. Configure the schedule (daily, weekly, monthly)
5. Select the target computers
6. Click **Save**

## Best Practices

### Script Development

- **Error Handling**: Include robust error handling in your scripts
- **Logging**: Add logging to help troubleshoot issues
- **Idempotence**: Ensure scripts can run multiple times without issues
- **Testing**: Test scripts in various environments before deployment
- **Comments**: Document your script's purpose and functionality

### Parameter Design

- **Meaningful Names**: Use clear, descriptive parameter names
- **Default Values**: Provide sensible default values when possible
- **Validation**: Include parameter validation in your scripts
- **Documentation**: Document each parameter's purpose and expected values

### Security Considerations

- **Principle of Least Privilege**: Use the minimum required permissions
- **Credential Management**: Avoid hardcoding credentials in scripts
- **Input Validation**: Validate all input parameters
- **Secure Output**: Avoid outputting sensitive information

## Troubleshooting

### Common Issues

- **Script Errors**: Check the script syntax and logic
- **Permission Issues**: Verify the execution context and permissions
- **Parameter Problems**: Ensure parameters are correctly defined and used
- **Connectivity Issues**: Check network connectivity for cloud scripts
- **Timeout Errors**: Optimize long-running scripts or increase timeouts

### Debugging Tips

- **Verbose Logging**: Enable verbose logging in your scripts
- **Test Environment**: Test scripts in a controlled environment first
- **Incremental Testing**: Test script sections individually
- **Error Messages**: Review error messages in the maintenance session logs

## Related Topics

- [Deployments](./deployments)
- [Maintenance Sessions](./maintenance-sessions)
- [Scripting Guide](./scripts)
