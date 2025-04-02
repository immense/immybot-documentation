# Managing Software

This guide explains how to effectively manage software across your environment using ImmyBot, from creating software definitions to deploying and maintaining software on your managed computers.

## Understanding Software in ImmyBot

In ImmyBot, software is more than just an application. A software definition includes:

- **Metadata**: Name, publisher, description, and icons
- **Versions**: Different versions that can be deployed
- **Detection Methods**: Scripts that determine if the software is already installed
- **Installation Scripts**: Scripts that handle the installation process
- **Configuration Scripts**: Scripts that configure the software after installation

## Software Library

The Software Library is your central repository for all software definitions:

### Browsing the Software Library

1. Navigate to **Software Library** in the left sidebar
2. Browse the list of available software
3. Use filters to narrow down the list:
   - Category
   - Publisher
   - Status (Active/Inactive)
   - Custom tags

### Software Details

Click on any software to view detailed information:

- **Overview**: General information and available versions
- **Scripts**: Installation, detection, and configuration scripts
- **Deployments**: List of deployments using this software
- **Inventory**: Computers with this software installed

## Creating Software Definitions

ImmyBot comes with many pre-defined software packages, but you can also create your own:

### Creating Basic Software

1. Navigate to **Software Library**
2. Click **Create Software**
3. Enter basic information:
   - Name
   - Publisher
   - Description
   - Category
   - Icon (optional)
4. Click **Save** to create the basic definition

### Adding Software Versions

1. Open the software definition
2. Click **Add Version**
3. Enter version information:
   - Version number
   - Release date
   - Notes
4. Configure installation options:
   - Installation file or command
   - Silent installation switches
   - Success codes
5. Click **Save** to add the version

### Creating Detection Methods

Detection methods determine if software is already installed:

1. Open the software definition
2. Navigate to the **Detection** tab
3. Click **Add Detection Method**
4. Choose a detection type:
   - **Registry**: Check for registry keys or values
   - **File**: Check for file existence or version
   - **Script**: Use a custom PowerShell script
5. Configure the detection parameters
6. Click **Save**

### Creating Installation Scripts

Installation scripts handle the software installation process:

1. Open the software definition
2. Navigate to the **Installation** tab
3. Click **Edit Installation Script**
4. Write or paste your PowerShell script
5. Use ImmyBot helper functions as needed
6. Click **Save**

## Deploying Software

Once you've defined software, you can deploy it to your computers:

### Creating Software Deployments

1. Navigate to **Deployments** in the left sidebar
2. Click **Create Deployment**
3. Enter a name for the deployment
4. Select **Software** as the deployment type
5. Search for and select your software
6. Choose the version to deploy
7. Configure deployment options:
   - **Deployment Mode**: Enforced, Available, or Removed
   - **Installation Context**: System or User
   - **Upgrade Behavior**: How to handle upgrades
8. Define targets (computers, users, or groups)
9. Click **Save**

### Testing Software Deployments

Before deploying to your entire environment:

1. Create a test deployment with limited targets
2. Run maintenance on a test computer
3. Verify that the software installs correctly
4. Check logs for any issues
5. Make adjustments as needed

## Software Updates

ImmyBot makes it easy to manage software updates:

### Adding New Versions

1. Open the software definition
2. Click **Add Version**
3. Enter information for the new version
4. Configure installation options
5. Click **Save**

### Updating Deployments

1. Navigate to the deployment
2. Change the version to the new release
3. Click **Save**
4. Run maintenance to apply the update

### Automatic Updates

For software that should always be on the latest version:

1. Edit the deployment
2. Set **Version** to **Latest**
3. Configure update behavior
4. Save changes

## Software Inventory

ImmyBot maintains a detailed inventory of installed software:

### Viewing Software Inventory

1. Navigate to **Reports** > **Software Inventory**
2. View all software across your environment
3. Filter by:
   - Software name
   - Version
   - Customer
   - Computer

### Identifying Outdated Software

1. Navigate to **Reports** > **Software Inventory**
2. Filter for specific software
3. Group by version
4. Identify computers with outdated versions
5. Create or update deployments as needed

## Best Practices

Follow these best practices for effective software management:

1. **Standardize Versions**: Deploy the same version across your environment when possible
2. **Test Updates**: Always test new versions before deploying widely
3. **Document Configurations**: Add notes to software definitions about specific configurations
4. **Use Tags**: Tag software for easier organization and filtering
5. **Regular Audits**: Periodically review your software inventory for compliance and security

## Next Steps

Now that you understand how to manage software in ImmyBot, you might want to explore:

- [Creating Deployments](./creating-deployments.md) - Learn advanced deployment techniques
- [Working with Tasks](./working-with-tasks.md) - Use tasks to configure and maintain software
- [Scripting Guide](./scripts.md) - Master the art of scripting for software management

---

**Next Steps:** [Creating Deployments →](./creating-deployments.md) | [Working with Tasks →](./working-with-tasks.md)
