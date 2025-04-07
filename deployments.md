# Deployments

Deployments in ImmyBot are rules that assign Software or Tasks (collectively known as "Maintenance Items") to a Target. This section provides comprehensive information about creating and managing deployments in ImmyBot, based on the actual implementation in the codebase.

## Understanding Deployments

Deployments are the core mechanism for managing software and configurations across your environment. They function similarly to Group Policies in Windows environments, allowing administrators to define what software or configurations should be applied to specific computers or groups.

### Deployment Components

A deployment consists of three main components:

1. **Maintenance Item**: The software or task to deploy (what)
2. **Target**: The computers, users, or groups that should receive the deployment (where)
3. **Desired State**: How the maintenance item should be configured (how)

### Deployment Types

ImmyBot supports several types of deployments:

- **Standard Deployments**: Created and managed within your ImmyBot instance
- **Recommended Deployments**: Curated by the ImmyBot team and available to all instances
- **Approved Deployments**: Recommended deployments that you have approved for use
- **Dismissed Deployments**: Recommended deployments that you have chosen not to use

### How Deployments Work

When a maintenance session runs on a computer, ImmyBot:

1. Evaluates all deployments that target the computer
2. Resolves conflicts when multiple deployments target the same maintenance item
3. Determines the desired state for each maintenance item
4. Executes the necessary actions to achieve the desired state

## Creating and Managing Deployments

### Deployment List View

The Deployment List view shows all deployments configured in your ImmyBot environment, allowing you to manage and monitor them from a central location.

![Deployment List View](./.vitepress/images/deployments/deployment-list.png)

#### How to Use the Deployment List

1. **Navigating the List**:
   - Use the search box to find deployments by name or other attributes
   - Use filters to narrow down the list by maintenance item, target, or status
   - Sort the list by clicking on column headers
   - Save custom views for frequently used filters

2. **Creating New Deployments**:
   - Click the "New Deployment" button
   - Follow the deployment creation wizard
   - Configure all required components
   - Save the deployment when finished

3. **Managing Existing Deployments**:
   - Click on a deployment to view or edit its details
   - Use the actions menu for common operations
   - Select multiple deployments for batch actions
   - Use tags to organize deployments

4. **Reviewing Deployment Status**:
   - Check the status indicators for each deployment
   - View compliance information
   - Identify deployments that need attention
   - Monitor recent changes

### Creating a Deployment

To create a new deployment, click the "New Deployment" button in the Deployment List view. This opens the deployment creation form where you can configure all aspects of the deployment.

![Create Deployment](./.vitepress/images/deployments/create-deployment.png)

#### Step 1: Select a Maintenance Item

Choose the Software or Task that you want to deploy:

- **Software from the Global Software catalog**: Standard software packages available to all tenants
- **Software from your My Software catalog**: Custom software packages specific to your tenant
- **Tasks**: Custom scripts or configuration tasks you've created
- **Integration-linked Software**: Software managed through third-party integrations

Tips for selecting maintenance items:
- Use the search function to quickly find items
- Filter by category to narrow down options
- Review the details of each item before selecting
- Consider dependencies between software packages

#### Step 2: Choose a Target

Define which computers or tenants should receive this deployment. Targets can be:

- **All Computers**: Apply to every computer in the system or tenant
- **Specific Tenants**: Apply to all computers in selected tenants
- **Specific Computers**: Apply to individually selected computers
- **Tags**: Apply to computers with specific tags
- **Dynamic Groups**: Apply to computers matching specific criteria
- **Azure AD Groups**: Apply to computers associated with specific Azure AD groups

Tips for selecting targets:
- Use the most specific target type possible
- Consider using tags for logical grouping
- Test deployments on a small target group first
- Review the target preview to confirm selection

#### Step 3: Configure Desired State

For Software deployments, specify the desired state:

- **Installed**: Ensures the software is installed
- **Latest**: Ensures the latest version is installed
- **Specific Version**: Ensures a specific version is installed
- **Uninstalled**: Ensures the software is not installed
- **Ignored**: ImmyBot will not manage this software for the target

For Task deployments, the desired state is always "Executed".

Tips for configuring desired state:
- Use "Latest" for software that should stay updated
- Use "Specific Version" for software with compatibility requirements
- Use "Uninstalled" to remove unwanted software
- Consider the impact of state changes on users

#### Step 4: Set Configuration Parameters

Some software and tasks require configuration parameters. These are displayed in the deployment form when applicable and may include:

- Installation options
- License keys
- Configuration settings
- Script parameters

For security reasons, sensitive configuration parameters for software linked to integrations are stored in the integration settings rather than in the deployment itself.

Tips for configuration parameters:
- Document parameter choices in the deployment notes
- Test parameters on a single computer before deploying widely
- Use variables for dynamic parameters when available
- Consider parameter dependencies

#### Step 5: Add Deployment Notes

You can add notes to a deployment to provide context or instructions for other administrators. These notes are visible in the deployment details and can include:

- Purpose of the deployment
- Special considerations
- Implementation details
- Change history context

Tips for deployment notes:
- Be detailed and specific
- Include contact information for the deployment owner
- Document any testing that was performed
- Note any known issues or limitations

#### Step 6: Configure Schedule (Optional)

You can configure when the deployment should be applied:

- **Manual**: Only applied when manually triggered
- **Scheduled**: Applied according to a defined schedule
- **Immediate**: Applied as soon as possible
- **Maintenance Window**: Applied during defined maintenance windows

Tips for scheduling:
- Consider user impact when scheduling
- Use maintenance windows for disruptive changes
- Stagger deployments to large groups
- Monitor scheduled deployments for completion

### Managing Deployment Details

Clicking on a deployment in the list opens the detailed view for that specific deployment, providing comprehensive information and management options.

![Deployment Details](./.vitepress/images/deployments/deployment-details.png)

#### Overview Tab

The Overview tab provides essential information about the deployment, including:

- Maintenance Item details and version information
- Target details and scope
- Desired State configuration
- Configuration Parameters
- Deployment Notes
- Schedule information
- Creation and modification timestamps

How to use the Overview tab:
- Review all deployment settings at a glance
- Check for recent modifications
- Verify target scope and configuration
- Use the edit button to make changes

#### Computers Tab

The Computers tab shows all computers affected by this deployment, allowing you to:

- View the current compliance status of each computer
- Start maintenance sessions for specific computers
- Filter and search for specific computers
- View detailed information about why computers are non-compliant
- See when the deployment was last applied to each computer

![Deployment Computers Tab](./.vitepress/images/deployments/deployment-computers.png)

How to use the Computers tab:
- Monitor compliance across all targeted computers
- Identify and troubleshoot non-compliant computers
- Run maintenance on specific computers
- Export computer lists for reporting

#### History Tab

The History tab shows the change history for the deployment, including:

- Who made changes
- What changes were made
- When changes were made
- Previous configuration values

![Deployment History Tab](./.vitepress/images/deployments/deployment-history.png)

How to use the History tab:
- Track changes over time
- Identify when issues may have been introduced
- Understand the deployment's evolution
- Verify authorized changes

## Deployment Resolution

When multiple deployments target the same computer with the same maintenance item, ImmyBot must determine which deployment "wins." This process is called Deployment Resolution.

### Resolution Rules

The general rules for deployment resolution are:

1. More specific targets win over less specific targets (Computer > Tag > Tenant > All Computers)
2. Deployments with "Uninstalled" desired state win over "Installed"
3. Deployments with "Specific Version" win over "Latest"
4. If there's still a tie, the deployment with the highest priority wins

During maintenance sessions, ImmyBot evaluates all applicable deployments and determines the winning deployment for each maintenance item on each computer.

### Resolution Examples

**Example 1: Target Specificity**
- Deployment A: Targets all computers, installs Chrome
- Deployment B: Targets computers with tag "Marketing", installs Chrome
- Result: Deployment B wins for computers with the "Marketing" tag

**Example 2: Desired State Precedence**
- Deployment A: Targets all computers, installs Chrome
- Deployment B: Targets all computers, uninstalls Chrome
- Result: Deployment B wins (Uninstalled wins over Installed)

**Example 3: Version Specificity**
- Deployment A: Targets all computers, installs latest Chrome
- Deployment B: Targets all computers, installs Chrome version 88
- Result: Deployment B wins (Specific Version wins over Latest)

For detailed examples of deployment resolution, see the [Deployment Resolution section in Terminology](./terminology.md#deployment-resolution).

## Target Visibility

The Target Visibility feature helps control where and how deployments can be accessed in ImmyBot. When enabled, this makes the deployment visible and accessible through the technician tools interface, allowing technicians to apply deployments without needing access to the full deployment management interface.

![Target Visibility](./.vitepress/images/deployments/target-visibility.png)

### How to Use Target Visibility

1. **Enable Target Visibility**:
   - Edit the deployment
   - Check the "Target Visibility" option
   - Save the deployment

2. **Access from Technician Tools**:
   - Open the Technician Tools interface
   - Select a computer
   - View available deployments
   - Apply the deployment as needed

3. **Benefits of Target Visibility**:
   - Allows technicians to apply deployments without full deployment access
   - Simplifies the interface for occasional users
   - Maintains control over deployment configuration
   - Provides a streamlined workflow for common tasks

## Common Issues and Troubleshooting

### Deployment Not Applying

If a deployment is not applying to a computer:

1. **Check Target Configuration**:
   - Verify the computer matches the target criteria
   - Check for conflicting deployments
   - Ensure the computer is online and has an active agent

2. **Check Maintenance Session Logs**:
   - Run a maintenance session manually
   - Review the logs for errors
   - Look for deployment resolution conflicts
   - Check for software installation failures

3. **Verify Configuration Parameters**:
   - Ensure all required parameters are provided
   - Check for syntax errors in parameters
   - Verify license keys and credentials
   - Test parameters on a single computer

4. **Check Scheduling**:
   - Verify the deployment is not restricted to a schedule
   - Check maintenance window configurations
   - Ensure scheduled tasks are running
   - Check for conflicts with other scheduled tasks

### Deployment Conflicts

When deployments conflict:

1. **Identify Conflicting Deployments**:
   - Use the Computers tab to see all deployments affecting a computer
   - Check for multiple deployments targeting the same maintenance item
   - Review desired states for conflicts

2. **Resolve Conflicts**:
   - Adjust target specificity
   - Modify desired states
   - Set priorities
   - Consolidate deployments if possible

3. **Test Resolution**:
   - Run maintenance on a test computer
   - Verify the correct deployment wins
   - Check logs for resolution details
   - Document the resolution for future reference

### Parameter Issues

For problems with deployment parameters:

1. **Check Parameter Requirements**:
   - Review documentation for the maintenance item
   - Verify required parameters are provided
   - Check parameter formats and types
   - Test parameters in isolation

2. **Test with Simplified Parameters**:
   - Remove optional parameters
   - Use default values where possible
   - Test on a single computer
   - Add parameters back one at a time

3. **Check for Environment Variables**:
   - Verify environment variables are available
   - Check for variable syntax errors
   - Test with hardcoded values temporarily
   - Document variable requirements

## Best Practices

### Deployment Organization

- Use a consistent naming convention for deployments
- Group related deployments with tags
- Document deployment purpose and configuration
- Review and clean up unused deployments regularly
- Use folders or categories for logical organization

### Target Management

- Use the most specific target type possible
- Create and maintain logical tag groups
- Test deployments on small target groups first
- Review target membership regularly
- Document target selection criteria

### Configuration Management

- Document parameter choices and rationale
- Store sensitive information securely
- Test configuration changes before deployment
- Use variables for dynamic configuration
- Maintain a change log for significant changes

### Deployment Testing

- Create a test environment with representative computers
- Test all deployments before production rollout
- Verify both installation and uninstallation
- Test upgrade paths for versioned software
- Document testing procedures and results

### Maintenance Planning

- Schedule disruptive deployments during off-hours
- Communicate changes to affected users
- Stagger deployments to large groups
- Monitor deployment progress and compliance
- Have a rollback plan for critical deployments

## In-App Documentation

For quick reference while using ImmyBot, each Deployments page includes contextual help documentation that provides essential information about the current view and its features. This documentation is accessible through the help icon in the top-right corner of each page.

The in-app documentation provides:
- Quick reference for page features
- Step-by-step instructions for common tasks
- Links to more detailed documentation
- Context-sensitive help based on the current view

For more comprehensive information, refer to the external documentation at [docs.immy.bot](https://docs.immy.bot).
