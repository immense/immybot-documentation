# Maintenance Tasks

Maintenance Tasks in ImmyBot are PowerShell scripts that perform specific actions on computers. This page provides an overview of the different types of tasks and how to use them effectively.

## Understanding Task Types

ImmyBot supports different types of maintenance tasks:

- **Computer Tasks**: Designed to run on individual computers for maintenance purposes
- **Cloud Tasks**: Designed to target cloud objects such as Azure resources
- **Configuration Tasks**: Designed to modify a software installation script

Tasks can also be categorized by their source:

- **Local Tasks**: Created by users in your ImmyBot instance
- **Global Tasks**: Created and managed by the ImmyBot team
- **Recommended Tasks**: Suggested tasks for use in your ImmyBot instance

## Creating Maintenance Tasks

### Creating a New Task

1. Navigate to **Tasks** in the left sidebar
2. Click the **New** button in the top-right corner
3. Fill out the task details:
   - Name: A descriptive name for the task
   - Category: Computer, Cloud, or Configuration
   - Script: The PowerShell script that will be executed
   - Parameters: Any parameters that can be passed to the script
   - Icon (optional): A visual identifier for the task
4. Click **Save** to create the task

### Script Context

When creating a task, you can specify the context in which the script will run:

- **System**: Runs with SYSTEM privileges (highest level)
- **Current User**: Runs in the context of the currently logged-in user
- **Specific User**: Runs as a specific user account
- **Cloud**: Runs in the cloud context (for cloud tasks)

### Parameters

Tasks can accept parameters that modify their behavior:

1. Define parameters in your script using the `param()` block
2. ImmyBot will automatically detect these parameters
3. When the task is used in a deployment, users can provide values for these parameters

Example script with parameters:

```powershell
param(
    [string]$ServerName,
    [int]$Port = 443,
    [bool]$EnableLogging = $true
)

# Script logic using the parameters
Write-Host "Connecting to $ServerName on port $Port"
if ($EnableLogging) {
    Write-Host "Logging is enabled"
}
```

## Managing Tasks

### Editing Tasks

1. Navigate to **Tasks** in the left sidebar
2. Find the task you want to edit
3. Click the **Edit** button (pencil icon)
4. Make your changes
5. Click **Save** to update the task

### Duplicating Tasks

1. Navigate to **Tasks** in the left sidebar
2. Find the task you want to duplicate
3. Click the **Duplicate** button (clone icon)
4. Modify the duplicate task as needed
5. Click **Save** to create the new task

### Deploying Tasks

1. Navigate to **Tasks** in the left sidebar
2. Find the task you want to deploy
3. Click the **Deploy** button
4. Configure the deployment settings
5. Click **Create** to create the deployment

## Task Categories

### Computer Tasks

Computer tasks run on individual computers and can perform a wide range of actions:

- Configure system settings
- Install or remove software
- Manage services
- Perform maintenance operations
- Collect data

### Cloud Tasks

Cloud tasks interact with cloud services like Azure:

- Manage Azure resources
- Configure cloud services
- Automate cloud operations
- Sync data between on-premises and cloud

### Configuration Tasks

Configuration tasks modify software installation scripts:

- Add custom configurations to software installations
- Set application preferences
- Configure software features
- Apply license information

## Best Practices

### Script Writing

- Include detailed comments in your scripts
- Handle errors gracefully with try/catch blocks
- Use logging to track script execution
- Test scripts thoroughly before deploying

### Naming Conventions

Use clear, descriptive names for your tasks:

- Include the purpose of the task
- Use consistent capitalization
- Prefix with category if helpful (e.g., "Config: Set Chrome Homepage")

### Parameter Design

- Provide default values for optional parameters
- Use appropriate data types for parameters
- Include validation for parameter values
- Use descriptive parameter names

### Testing

- Test tasks in a controlled environment before deploying
- Verify that tasks work as expected with different parameter values
- Test tasks on different Windows versions if applicable

## Troubleshooting

### Script Execution Failures

If a task fails to execute:

1. Check the maintenance logs for specific error messages
2. Verify that the script has the necessary permissions
3. Test the script manually on a computer
4. Check for dependencies that might be missing

### Parameter Issues

If parameters are not working correctly:

1. Verify that the parameter names match between the script and the deployment
2. Check that the parameter values are of the correct type
3. Ensure that any required parameters have values

## Related Topics

- [Deployments](./deployments.md)
- [Creating & Managing Deployments](./creating-managing-deployments.md)
- [Software Library](./software-library.md)
- [Maintenance Sessions](./maintenance-sessions.md)

---

**Next Steps:** [Software Library →](./software-library.md) | [Deployments →](./deployments.md)
