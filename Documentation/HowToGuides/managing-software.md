# Managing Software

This guide explains how to effectively manage software across your environment using ImmyBot, from creating software definitions to deploying and maintaining software on your managed computers.

## Understanding Software in ImmyBot

In ImmyBot, software is more than just an application. A software definition includes:

- **Versions**: Different versions that can be deployed
- **Detection Methods**: Scripts that determine if the software is already installed
- **Installation Scripts**: Scripts that handle the installation process
- **Configuration Scripts**: Scripts that configure the software after installation

## Software Library

The Software Library is your central repository for all software definitions:

### Browsing the Software Library

1. Navigate to **Library** > **Software** in the left sidebar
2. Browse the list of available software
3. Use filters to narrow down the list

### Software Details

Click on any software to view detailed information:

- **Software Info**: General information, and reboot requirements
- **Scripts**: Installation, detection, and configuration scripts
- **

## Creating Software Definitions

ImmyBot comes with many pre-defined software packages, but you can also create your own:

### Creating Basic Software

1. Navigate to **Library** > **Software**
2. Click **New**
3. Follow the on screen instruction to upload the installer package or create your own installation methods.

### Adding Software Versions

1. Open the software definition
2. Scroll to the bottom of the page to the **Versions** section
3. Click **New** in the Versions section
4. Follow the onscreen instructions to upload the installer package or create your own installation methods.
6. Click **Save** to add the version

### Version Detection Methods

Detection methods determine if software is already installed:

1. Open the software definition
2. Scroll to the **Version Detection** section on the software details page
3. Select what kind of detection you want to use
   - Display name
   - Upgrade Code
   - Custom detection script
4. Follow the on screen instructions to edit and live view your changes.

### Creating Installation Scripts

::: tip
We reccomend using the default MSI and EXE scripts where possible.
:::

Installation scripts handle the software installation process:

1. Open the software definition
2. Navigate to the **Installation** section
3. Click **New**
4. Write or paste your PowerShell script
5. Use ImmyBot helper functions as needed
6. Click **Save**

### Automatic Updates

For software that should always be on the latest version:

1. Edit the deployment
2. Set **Desired Version** to **Latest**
3. Configure update behavior
4. Save changes

## Software Inventory

ImmyBot maintains a detailed inventory of installed software:

### Viewing Software Inventory

1. Navigate to **Reporting** > **Computer Software**
2. View all software across your environment
3. Filter by:
   - Software name
   - Version
   - Customer
   - Computer

### Identifying Outdated Software

1. Navigate to **Reporting** > **Computer Software**
2. Filter for specific software
3. Group by version
4. Identify computers with outdated versions
5. Create or update deployments as needed

## Best Practices

Follow these best practices for effective software management:

1. **Standardize Versions**: Deploy the same version across your environment when possible
2. **Test Updates**: Always test new versions before deploying widely
3. **Document Configurations**: Add notes to software definitions about specific configurations
5. **Regular Audits**: Periodically review your software inventory for compliance and security

## Next Steps

Now that you understand how to manage software in ImmyBot, you might want to explore:

- [Creating Deployments](/Documentation/HowToGuides/creating-managing-deployments.md) - Learn advanced deployment techniques
- [Working with Tasks](/Documentation/HowToGuides/working-with-tasks.md) - Use tasks to configure and maintain software
- [Scripting Guide](/Documentation/AdvancedTopics/scripts.md) - Master the art of scripting for software management
