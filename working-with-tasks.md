# Working with Tasks

Tasks in ImmyBot are powerful scripts that perform specific actions on computers. This guide explains how to create, manage, and deploy tasks effectively.

## Understanding Tasks

Unlike software deployments, tasks:
- Don't necessarily install anything
- Can be used for configuration, maintenance, or information gathering
- Can run in different contexts (System, User, Metascript, Cloud)
- Can be one-time, recurring, or compliance-based

## Task Execution Contexts

ImmyBot supports four execution contexts for tasks:

### System Context

- Runs with SYSTEM privileges on the computer
- Ideal for system-level changes and configurations
- Has access to all local resources
- Cannot interact with user interfaces

### User Context

- Runs in the context of a specific user
- Ideal for user-specific configurations
- Can interact with user interfaces
- Limited to user permissions

### Metascript Context

- Runs on the ImmyBot server
- Can orchestrate actions across multiple computers
- Ideal for coordinating complex workflows
- Cannot directly access computer resources

### Cloud Context

- Runs in a cloud environment
- Has access to cloud-specific APIs
- Ideal for interacting with cloud services
- Cannot directly access computer resources

## Creating Tasks

Follow these steps to create a new task:

1. **Navigate to Tasks**
   - Click on **Tasks** in the left sidebar
   - Click **Create Task**

2. **Enter Basic Information**
   - Enter a descriptive name for the task
   - (Optional) Add a description
   - Select the execution context (System, User, Metascript, Cloud)

3. **Write the Script**
   - Write or paste your PowerShell script in the editor
   - Use ImmyBot helper functions as needed
   - Add comments to explain complex sections

4. **Configure Parameters**
   - Click **Add Parameter** to create script parameters
   - For each parameter:
     - Enter a name
     - Select a type (String, Number, Boolean, etc.)
     - Set a default value (optional)
     - Add a description
     - Configure validation rules (optional)

5. **Configure Success Criteria**
   - Define what constitutes successful execution
   - Options include:
     - Exit code
     - Output contains
     - Custom condition

6. **Save the Task**
   - Click **Save** to create the task
   - The task is now available for use in deployments

## Task Examples

Here are some common task examples to help you get started:

### System Context Example: Clear Temporary Files

```powershell
# Clear temporary files to free up disk space
$tempFolders = @(
    "C:\Windows\Temp\*",
    "$env:TEMP\*"
)

foreach ($folder in $tempFolders) {
    Write-Host "Clearing $folder"
    try {
        Remove-Item -Path $folder -Force -Recurse -ErrorAction SilentlyContinue
        Write-Host "Successfully cleared $folder"
    }
    catch {
        Write-Warning "Failed to clear $folder: $_"
    }
}

Write-Host "Temporary files cleanup complete"
```

### User Context Example: Configure Outlook Signature

```powershell
# Configure Outlook signature for the current user
$userName = $env:USERNAME
$userProfile = $env:USERPROFILE
$signaturePath = "$userProfile\AppData\Roaming\Microsoft\Signatures"

# Create signature directory if it doesn't exist
if (!(Test-Path $signaturePath)) {
    New-Item -Path $signaturePath -ItemType Directory -Force
}

# Create signature file
$signatureContent = @"
John Doe
IT Support Specialist
Contoso Ltd.
Email: john.doe@contoso.com
Phone: (555) 123-4567
"@

$signatureFile = "$signaturePath\Company Signature.txt"
$signatureContent | Out-File -FilePath $signatureFile -Force

Write-Host "Outlook signature created at $signatureFile"
```

### Metascript Example: Report Computers with Low Disk Space

```powershell
# Get all computers
$computers = Get-ImmyComputers

# Filter for online computers
$onlineComputers = $computers | Where-Object { $_.Status -eq "Online" }

# Initialize results array
$results = @()

# Check disk space on each computer
foreach ($computer in $onlineComputers) {
    $scriptBlock = {
        Get-PSDrive -PSProvider FileSystem | Where-Object { $_.Free -lt 10GB -and $_.Used -gt 0 }
    }
    
    $result = Invoke-ImmyCommand -ComputerID $computer.ID -ScriptBlock $scriptBlock
    
    if ($result) {
        foreach ($drive in $result) {
            $results += [PSCustomObject]@{
                ComputerName = $computer.Name
                DriveLetter = $drive.Name
                TotalGB = [math]::Round($drive.Used / 1GB + $drive.Free / 1GB, 2)
                FreeGB = [math]::Round($drive.Free / 1GB, 2)
                PercentFree = [math]::Round(($drive.Free / ($drive.Used + $drive.Free)) * 100, 2)
            }
        }
    }
}

# Output results
$results | Format-Table -AutoSize
```

## Deploying Tasks

Tasks can be deployed to computers in several ways:

### Creating a Task Deployment

1. Navigate to **Deployments** in the left sidebar
2. Click **Create Deployment**
3. Enter a name for the deployment
4. Select **Task** as the deployment type
5. Select your task from the dropdown
6. Configure task parameters
7. Define targets (computers, users, or groups)
8. Click **Save**

### Running Tasks Manually

1. Navigate to **Computers**
2. Select one or more computers
3. Click **Run Task**
4. Select the task to run
5. Configure task parameters
6. Click **Run**

### Scheduling Tasks

1. Create a task deployment
2. Configure the schedule:
   - One-time: Runs once during maintenance
   - Recurring: Runs on a defined schedule
   - Compliance-based: Runs when a condition is met
3. Save the deployment

## Task Best Practices

Follow these best practices for effective task management:

1. **Use Descriptive Names**: Make task names clear and specific
2. **Add Comments**: Document your scripts with comments
3. **Handle Errors**: Include error handling in your scripts
4. **Test Thoroughly**: Test tasks on a small set of computers before deploying widely
5. **Use Parameters**: Make tasks flexible with parameters
6. **Log Actions**: Include logging in your scripts
7. **Idempotence**: Design tasks to be safely re-runnable

## Troubleshooting Tasks

If a task isn't working as expected:

1. **Check Logs**: Review the task execution logs
2. **Test Locally**: Run the script locally to verify it works
3. **Check Permissions**: Ensure the task has the necessary permissions
4. **Verify Context**: Confirm you're using the appropriate execution context
5. **Debug Mode**: Add debug output to your script
6. **Simplify**: Break complex tasks into smaller, simpler tasks

## Next Steps

Now that you understand how to work with tasks in ImmyBot, you might want to explore:

- [Scripting Guide](./scripts.md) - Master the art of scripting in ImmyBot
- [Metascripts / Cloud Scripts](./immy-commands.md) - Learn about advanced scripting capabilities
- [Common Workflows](./common-workflows.md) - See examples of common task scenarios

---

**Next Steps:** [Scripting Guide →](./scripts.md) | [Metascripts / Cloud Scripts →](./immy-commands.md)
