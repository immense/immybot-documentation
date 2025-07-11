# Creating and Managing Deployments

This guide walks you through the process of creating and managing deployments in ImmyBot, from basic setup to advanced configurations.

## Understanding Deployments

Deployments are the core building blocks of ImmyBot. They define what should be installed or configured on which computers. A deployment consists of:

1. **Type**: The software or task to deploy
2. **Targets**: The computers or users that should receive the deployment
3. **Enforcement Type**: How strictly the deployment should be applied
4. **Configuration Settings**: Additional configuration options

## Creating a Basic Deployment

### Step 1: Navigate to Deployments

1. Log in to your ImmyBot instance
2. Click on **Deployments** in the left navigation menu
3. Click **New** to create a new deployment

![Deployments Page](./Deployment-New.png)

### Step 2: Software or Task

Choose the maintenance item you want to deploy:

- **Software**: Install or uninstall an application
- **Task**: Run a script or configuration task

### Step 3: Configure Enforcement Type

Select how strictly the deployment should be enforced:

- **Required**: Automatically installed during maintenance
- **Onboarding**: Applied only during computer onboarding
- **Ad Hoc**: Only run when explicitly triggered

### Step 4: Select Targets

Define which computers should receive this deployment:

1. Select from the following
   1. Cross Tenant
      - Will apply to all computers in all tenants in the instnace, except where a more specific deployment wins.
   2. Single Tenant
      - Will apply to all computers in a single tenant, except where a more specific deployment wins.
   3. Individual
      - Applies to an individual computer or user.
2. Configure the selected target type
   - All Computers
   - Filter Script
   - Metascript
   - Integration filters
      - Some integrations such as ConnectWise Manage allow you to filter against other groups or agreement additions.
   - Tags
3. Target filters - Here you can configure any extra filtering you may need.

### Step 5: Configure Additional parameters

Depending on the mainteance item, you may have additional settings to configure. Follow the parameter block on the screen.

### Step 6: Save the Deployment

1. Review your deployment configuration
2. Click **Create** to save the deployment

## Managing Existing Deployments

### Viewing Deployments

1. Navigate to **Deployments** in the left menu
2. Use the search and filter options to find specific deployments
3. Click on a deployment to view its details

### Editing Deployments

1. Navigate to the deployment you want to edit
2. Make your changes directly in the deployment details page
3. Click **Update** to save your changes

### Disabling Deployments

To temporarily disable a deployment without deleting it:

1. Navigate to the deployment
2. Click the **More Actions** dropdown next to the page title
3. Select **Disable**
4. Confirm the action if prompted

### Deleting Deployments

1. Navigate to the deployment you want to delete
2. Click the **More Actions** dropdown next to the page title
3. Select **Delete**
4. Confirm the deletion when prompted

## Advanced Deployment Configurations

### Using Filter Scripts

Filter scripts allow you to dynamically determine which computers should receive a deployment based on custom criteria:

1. When adding a target, select **Filter Script**
2. Choose an existing filter script or create a new one
3. Configure any parameters for the script

Example filter script (checks if computer has sufficient disk space):

```powershell
param(
    [Parameter(Mandatory=$true)]
    [int]$RequiredSpaceGB
)

$systemDrive = Get-WmiObject Win32_LogicalDisk -Filter "DeviceID='C:'"
$freeSpaceGB = [math]::Round($systemDrive.FreeSpace / 1GB, 2)

if ($freeSpaceGB -ge $RequiredSpaceGB) {
    return $true
} else {
    return $false
}
```

### Deployment Dependencies

Dependencies ensure that deployments are applied in the correct order:

1. When creating or editing a deployment, go to the **Dependencies** section
2. Click **Add Dependency**
3. Select the deployment that must be applied first
4. Configure the dependency type:
   - **Hard**: The dependent deployment must succeed
   - **Soft**: The dependent deployment must run, but can fail

### Supersedence

Supersedence allows you to replace older deployments with newer ones:

1. When creating or editing a deployment, go to the **Supersedence** section
2. Click **Add Superseded Deployment**
3. Select the deployment that this new deployment replaces
4. The superseded deployment will be automatically disabled when this deployment is enabled

## Best Practices

### Targeting Strategy

- Start with smaller, specific targets before expanding to larger groups
- Use filter scripts for complex targeting scenarios
- Test deployments on a small group before applying to all computers

### Testing Deployments

Before deploying to production:

1. Create a test deployment with a limited target (e.g., a test computer)
2. Run a maintenance session to apply the deployment
3. Verify that the deployment works as expected
4. Monitor for any issues or errors
5. Expand the target to include production computers

## Troubleshooting

### Deployment Not Applying

If a deployment isn't being applied during maintenance:

1. Check the maintenance logs for errors
2. Verify that the computer matches the target criteria
3. Ensure the deployment is enabled
4. Check for dependencies that might be failing
5. Verify the enforcement type is set correctly

### Software Installation Failures

If software installations are failing:

1. Check the installation logs in the maintenance session
2. Verify that the installation source is accessible
3. Test the installation manually on a test computer
4. Check for conflicts with existing software
5. Verify that the computer meets the system requirements

## Related Topics

- [Deployments](/Documentation/CoreFeatures/deployments.md)
- [Maintenance Sessions](/Documentation/CoreFeatures/maintenance-sessions.md)
- [Software Library](/Documentation/CoreFeatures/software-library.md)
- [Maintenance Tasks](/Documentation/Administration/maintenance-updates.md)

