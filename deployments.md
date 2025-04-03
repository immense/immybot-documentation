# Deployments

Deployments in ImmyBot are rules that assign Software or Tasks (collectively known as "Maintenance Items") to a Target. They are conceptually similar to Group Policies in that they assign settings to a group of users or computers.

## Deployment List

The Deployment List view shows all deployments configured in your ImmyBot environment, allowing you to manage and monitor them from a central location.

![Deployment List View](./.vitepress/images/deployments/deployment-list.png)

### Key Features

- **Filter and Search**: Quickly find deployments by name, target, or maintenance item
- **Status Indicators**: Visual indicators show the status of each deployment
- **Bulk Actions**: Select multiple deployments to perform actions in bulk
- **Custom Views**: Save and load custom views with specific filters and columns

## Creating a Deployment

To create a new deployment, click the "New Deployment" button in the Deployment List view. This opens the deployment creation form where you can configure all aspects of the deployment.

![Create Deployment](./.vitepress/images/deployments/create-deployment.png)

### Deployment Configuration

When creating or editing a deployment, you'll need to configure the following:

#### 1. Maintenance Item

Select the Software or Task that you want to deploy. This can be:
- Software from the Global Software catalog
- Software from your My Software catalog
- Tasks that you've created

![Select Maintenance Item](./.vitepress/images/deployments/select-maintenance-item.png)

#### 2. Target

Define which computers or tenants should receive this deployment. Targets can be:
- All Computers
- Specific Tenants
- Specific Computers
- Dynamic groups based on criteria
- Azure AD groups

![Select Target](./.vitepress/images/deployments/select-target.png)

#### 3. Desired State

For Software deployments, specify the desired state:
- **Installed**: Ensures the software is installed
- **Latest**: Ensures the latest version is installed
- **Specific Version**: Ensures a specific version is installed
- **Uninstalled**: Ensures the software is not installed
- **Ignored**: ImmyBot will not manage this software for the target

![Desired State](./.vitepress/images/deployments/desired-state.png)

#### 4. Configuration Parameters

Some software and tasks require configuration parameters. These are displayed in the deployment form when applicable.

![Configuration Parameters](./.vitepress/images/deployments/configuration-parameters.png)

#### 5. Deployment Notes

You can add notes to a deployment to provide context or instructions for other administrators.

![Deployment Notes](./.vitepress/images/deployments/deployment-notes.png)

## Deployment Details

Clicking on a deployment in the list opens the detailed view for that specific deployment, providing comprehensive information and management options.

![Deployment Details](./.vitepress/images/deployments/deployment-details.png)

### Deployment Details Tabs

The Deployment Details page is organized into several tabs:

#### Overview Tab

The Overview tab provides essential information about the deployment, including:
- Maintenance Item details
- Target details
- Desired State
- Configuration Parameters
- Deployment Notes

#### Computers Tab

The Computers tab shows all computers affected by this deployment, allowing you to:
- View the current status of the deployment on each computer
- Start maintenance sessions for specific computers
- Filter and search for specific computers

![Deployment Computers Tab](./.vitepress/images/deployments/deployment-computers.png)

#### History Tab

The History tab shows the change history for the deployment, including:
- Who made changes
- What changes were made
- When changes were made

![Deployment History Tab](./.vitepress/images/deployments/deployment-history.png)

## Deployment Resolution

When multiple deployments target the same computer with the same maintenance item, ImmyBot must determine which deployment "wins." This process is called Deployment Resolution.

The general rules for deployment resolution are:
1. More specific targets win over less specific targets
2. Deployments with "Uninstalled" desired state win over "Installed"
3. Deployments with "Specific Version" win over "Latest"

For detailed examples of deployment resolution, see the [Deployment Resolution section in Terminology](./terminology.md#deployment-resolution).

## Target Visibility

The Target Visibility feature helps control where and how deployments can be accessed in ImmyBot. When enabled, this makes the deployment visible and accessible through the technician tools interface.

![Target Visibility](./.vitepress/images/deployments/target-visibility.png)

## Related Features

- [Computers](./computers.md): View and manage computers affected by deployments
- [Schedules](./terminology.md#schedules): Configure automatic application of deployments
- [Maintenance Sessions](./terminology.md#maintenance-session): Learn more about how maintenance sessions work
- [Technician Tools](./terminology.md#technician-tools): Access deployments from the technician interface
