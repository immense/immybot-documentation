# Inventory Tasks

Inventory Tasks in ImmyBot are specialized scripts that collect system information from managed computers. This page explains how inventory tasks work and how to use them effectively.

## Understanding Inventory Tasks

Inventory tasks serve a specific purpose in ImmyBot:

- They run on a scheduled basis to collect system information
- The data they collect is stored on the Computer object under the 'inventory' column
- Each script's results are nested under the "inventory key" specified by the script
- The collected data is accessible from the Computer Details page

## Creating Inventory Tasks

### Creating a New Inventory Task

1. Navigate to **Inventory Tasks** in the left sidebar
2. Use the **New Inventory Task** form at the top of the page
3. Fill out the task details:
   - Name: A descriptive name for the task
   - Frequency: How often the task should run
   - Specified Number of Minutes: For custom frequency intervals

### Frequency Options

When creating an inventory task, you can select from several frequency options:

- **Daily**: Runs once per day
- **Weekly**: Runs once per week
- **Monthly**: Runs once per month
- **Every Maintenance**: Runs during every maintenance session
- **Custom**: Runs at a specified interval in minutes

## Adding Scripts to Inventory Tasks

Each inventory task can contain multiple scripts, each collecting different types of information:

1. Navigate to **Inventory Tasks** in the left sidebar
2. Find the task you want to add a script to
3. Click on the task to expand it
4. Use the **New Inventory Task Script** form
5. Fill out the script details:
   - Inventory Key: The key under which the data will be stored
   - Script: The PowerShell script that will collect the data

### Script Requirements

Inventory task scripts must follow these requirements:

- The script must return structured data (objects or hashtables)
- The returned data should be serializable to JSON
- The script should handle errors gracefully
- The script should be efficient to avoid performance impact

Example inventory script:

```powershell
# Collect installed antivirus products
$antivirusProducts = Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct | Select-Object displayName, productState, pathToSignedProductExe

# Return the collected data
return $antivirusProducts
```

## Viewing Inventory Data

The data collected by inventory tasks is available on the Computer Details page:

1. Navigate to **Computers** in the left sidebar
2. Click on a computer to view its details
3. Go to the **Inventory** tab
4. Expand the relevant inventory key to view the collected data

## Managing Inventory Tasks

### Editing Inventory Tasks

1. Navigate to **Inventory Tasks** in the left sidebar
2. Find the task you want to edit
3. Click on the task to expand it
4. Make changes to the task or its scripts
5. Changes are saved automatically

### Removing Scripts from Tasks

1. Navigate to **Inventory Tasks** in the left sidebar
2. Find the task containing the script you want to remove
3. Click on the task to expand it
4. Find the script you want to remove
5. Click the **Delete** button (trash icon) next to the script

### Deleting Inventory Tasks

1. Navigate to **Inventory Tasks** in the left sidebar
2. Find the task you want to delete
3. Click the **Delete** button (trash icon) next to the task
4. Confirm the deletion when prompted

## Common Inventory Task Examples

### Hardware Inventory

Collects detailed hardware information:

```powershell
$computerSystem = Get-CimInstance Win32_ComputerSystem | Select-Object Manufacturer, Model, TotalPhysicalMemory
$processor = Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors
$diskDrives = Get-CimInstance Win32_DiskDrive | Select-Object Model, Size, MediaType

return @{
    ComputerSystem = $computerSystem
    Processor = $processor
    DiskDrives = $diskDrives
}
```

### Software Inventory

Collects information about installed software:

```powershell
$installedSoftware = Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | 
    Where-Object { $_.DisplayName } | 
    Select-Object DisplayName, DisplayVersion, Publisher, InstallDate

return $installedSoftware
```

### Security Settings

Collects information about security settings:

```powershell
$firewallStatus = Get-NetFirewallProfile | Select-Object Name, Enabled
$antivirusProducts = Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct | 
    Select-Object displayName, productState
$bitlockerVolumes = Get-BitLockerVolume | Select-Object MountPoint, VolumeStatus, EncryptionPercentage

return @{
    FirewallStatus = $firewallStatus
    AntivirusProducts = $antivirusProducts
    BitLockerStatus = $bitlockerVolumes
}
```

## Best Practices

### Script Efficiency

- Keep scripts lightweight and focused
- Avoid resource-intensive operations
- Use efficient PowerShell cmdlets and techniques
- Limit the amount of data collected to what's necessary

### Inventory Keys

- Use descriptive inventory keys that indicate the type of data
- Use consistent naming conventions
- Organize related data under the same key
- Avoid overly generic keys

### Scheduling

- Schedule inventory tasks appropriately based on how frequently the data changes
- Avoid running too many inventory tasks simultaneously
- Consider the impact on network and server resources

### Data Usage

- Use inventory data to inform deployment decisions
- Create filter scripts that leverage inventory data
- Build reports based on collected inventory data
- Use inventory data for compliance verification

## Troubleshooting

### Script Execution Failures

If an inventory script fails to execute:

1. Check the maintenance logs for specific error messages
2. Verify that the script has the necessary permissions
3. Test the script manually on a computer
4. Check for dependencies that might be missing

### Missing or Incomplete Data

If inventory data is missing or incomplete:

1. Verify that the inventory task is running on schedule
2. Check that the script is returning data in the expected format
3. Look for errors in the script execution
4. Ensure that the computer was online when the task was scheduled to run

## Related Topics

- [Computers & Inventory](./computers-inventory.md)
- [Managing Computers](./managing-computers.md)
- [Maintenance Tasks](./maintenance-tasks.md)
- [Maintenance Sessions](./maintenance-sessions.md)

---

**Next Steps:** [Computers & Inventory →](./computers-inventory.md) | [Managing Computers →](./managing-computers.md)
