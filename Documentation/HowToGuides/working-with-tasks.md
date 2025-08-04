# Creating & Managing Tasks

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
- User must be logged in when scripts in this context run

### Metascript Context

- Runs on the ImmyBot server
- Can orchestrate actions across multiple computers and across multiple contexts
- Ideal for coordinating complex workflows
- Must use Invoke-ImmyCommand to access computer resources

### Cloud Context

- Runs exclusively on the ImmyBot Server
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

::: info NOTE
If using a combined script, be sure to include a Switch on $Method that includes at least Test and Set, and optionally Get
:::

1. **Configure Parameters**
   - Click **Add Parameter** to create script parameters
   - For each parameter:
     - Enter a name
     - Select a type (String, Number, Boolean, etc.)
     - Set a default value (optional)
     - Add a description
     - Configure validation rules (optional)

2. **Configure Success Criteria**
   - Define what constitutes successful execution
   - Use your Test Script or Test Script Block to return $True if the execution was successful and $False if the execution was unsuccessful

3. **Save the Task**
   - Click **Save** to create the task
   - The task is now available for use in deployments

## Task Examples

Here are some common task examples to help you get started:

### System Context Example: Clear Temporary Files

```powershell
# Clear temporary files to free up disk space
$FilesToDeleteCount = 0

$TempPathToFiles = Join-Path $TempFolder "*"
$FilesToDelete = Get-ChildItem $TempPathToFiles -Recurse -Force # Check for files to delete
$FilesToDeleteCount = $FilesToDelete | measure | select -Expand Count # Count how many need to be deleted for testing

switch($method)
{
    'test'
    {
        # If files are found that need to be deleted this will return $True and trigger the Set phase if appropriate
        $FilesToDeleteCount -eq 0
    }
    'set'
    {
        $FilesToDelete.FullName | Out-String
        $FilesToDelete | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "Deleted $FilesToDeleteCount file(s) from $TempPathToFiles"
    }
}
```

### User Context Example: Get Signed In User's UPN
Since User context scripts will fail if the user is not signed in, running them as metascripts and using Invoke-ImmyCommand -Context User can provide better error handling.

```powershell
try {
    Invoke-ImmyCommand -Context User {
        $userDomain = $env:USERDOMAIN
        $computerName = $env:COMPUTERNAME

        if ($userDomain -ne $computerName) {
            whoami /upn
        }
    } -ErrorAction Stop
} catch {
    if ($_.FullyQualifiedErrorId -eq "Immybot.Agent.MinimalShared.NoLoggedOnUserException" -or
        $_.FullyQualifiedErrorId -eq "OperationTimeout") {
        $_
        $Error[0] = $null
    } else {
        throw
    }
}
```

### Metascript Example: Reset-Outlook Profile

```powershell
[CmdletBinding(DefaultParameterSetName = 'AllUsers')]
param([string]$ProfileName = 'Outlook',
[Parameter(Mandatory=$False, ParameterSetName='AllUsers')]
[switch]$AllUsers,
[Parameter(Mandatory=$False, ParameterSetName='LoggedOnUser')]
[switch]$LoggedOnUser)

if($AllUsers){
    $LoggedOnUser = $false
}

switch($method){
    'test' {
        $OutlookTest = Invoke-HKCU -LimitToSID ($ProfilesToMigrate.SID) -ScriptBlock {
            $BasePath = 'HKCU:\SOFTWARE\Microsoft\Office'
            $ZeroConfigValue = Get-ItemProperty -Path "$BasePath\AutoDiscover" -Name ZeroConfigExchange -ErrorAction SilentlyContinue | %{$_.ZeroConfigExchange}
            if($ZeroConfigValue -ne 1)
            {
                Write-Warning "Outlook: ZeroConfigValue not equal 1: $ZeroConfigValue"
                return $false
            }
            $ProfilesExists = Test-Path "$BasePath\16.0\Outlook\Profiles"
            if($ProfilesExists)
            {
                Write-Warning "Outlook: Profiles exist: $ProfilesExists"
                return $false
            }
            $FirstRun = Get-ItemProperty -Path "$BasePath\16.0\Outlook\Setup" -Name 'First-Run' -ErrorAction SilentlyContinue | %{$_.'First-Run'}
            if($FirstRun)
            {
                Write-Warning "Outlook: First-Run Exists"
                return $false
            }
            return $true
        }
        Write-Host "OutlookTest: $OutlookTest"
        if($OutlookTest -eq $false)
        {
            Write-Warning "Outlook needs to be reconfigured"
            $Status = $false
        }
    }
    'set'{

        Write-Host "Ensuring Outlook is not running"
        Invoke-ImmyCommand { taskkill /im outlook.exe /f 2>&1 | Out-Null }
        Invoke-HKCU -LimitToLoggedOnUser:($LoggedOnUser) -ScriptBlock {
            $ProfileName = $using:ProfileName
            $OutlookRegistryPath = "HKCU:\SOFTWARE\Microsoft\Office\16.0\Outlook"
            $OldDefaultProfile = Get-ItemProperty -Path $OutlookRegistryPath -Name DefaultProfile | %{$_.DefaultProfile}
            $OldDefaultProfileRegistryPath = "$OutlookRegistryPath\Profiles\$OldDefaultProfile"
            $NewDefaultProfileRegistryPath = "$OutlookRegistryPath\Profiles\$ProfileName"

            $NewOldProfileName = $OldDefaultProfile
            while((Test-Path "$OutlookRegistryPath\Profiles\$NewOldProfileName"))
            {
                $NewOldProfileName = "_" + $NewOldProfileName
            }
            if($OldDefaultProfile -ne $NewOldProfileName)
            {
                Write-Host "Desired ProfileName $ProfileName already exists, renaming to $NewOldProfileName"
                Rename-Item -Path $OldDefaultProfileRegistryPath -NewName $NewOldProfileName -ErrorAction SilentlyContinue
            }
            Write-Host "Creating Outlook profile $ProfileName"
            New-Item -Path $NewDefaultProfileRegistryPath -Force | Out-Null
            Write-Host "Setting $ProfileName as Default"
            Set-ItemProperty -Path $OutlookRegistryPath -Name DefaultProfile -Value $ProfileName
            Write-Host "Renaming First-Run to _First-Run"
            Rename-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Office\16.0\Outlook\Setup\" -Name 'First-Run' -NewName '_First-Run' -ErrorAction SilentlyContinue
            if (!(Test-Path "HKCU:\SOFTWARE\Microsoft\Office\AutoDiscover\"))
            {
                New-Item "HKCU:\SOFTWARE\Microsoft\Office\AutoDiscover\" -Force | Out-Null
            }
            Write-Host "Setting ZeroConfigExchange to 1"
            New-ItemProperty -PropertyType DWord -Path "HKCU:\SOFTWARE\Microsoft\Office\AutoDiscover\" -Name ZeroConfigExchange -Value 1 -ErrorAction SilentlyContinue | Out-Null
        }
    }
}
```


## Task Best Practices

Follow these best practices for effective task management:

1. **Use Descriptive Names**: Make task names clear and specific
2. **Add Comments**: Document your scripts and tasks with comments and descriptions
3. **Handle Errors**: Include error handling in your scripts
4. **Test Thoroughly**: Test tasks on a small set of computers before deploying widely
5. **Use Parameters**: Make tasks flexible with parameters
6. **Log Actions**: Include logging in your scripts
7. **Idempotence**: Design tasks to be safely re-runnable

## Troubleshooting Tasks

If a task isn't working as expected:

1. **Check Logs**: Review the task execution logs
2. **Test with Script Debugger**: Run the script using the script debugger in Immybot
3. **Check Permissions**: Ensure the task has the necessary permissions
4. **Verify Context**: Confirm you're using the appropriate execution context
5. **Debug Mode**: Add debug output to your script
6. **Simplify**: Break complex tasks into smaller, simpler tasks

## Next Steps

Now that you understand how to work with tasks in ImmyBot, you might want to explore:

- [Scripting Guide](/Documentation/AdvancedTopics/scripts.md) - Master the art of scripting in ImmyBot
- [Metascripts / Cloud Scripts](/Documentation/AdvancedTopics/immy-commands.md) - Learn about advanced scripting capabilities
- [Common Workflows](/Documentation/GettingStarted/common-workflows.md) - See examples of common task scenarios