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
4. Clicking on any existing software will bring you to the Software Details page.

### Software Details

Click on any software to view detailed information:

- **Software Info**: General information, Icon, Notes, and reboot requirements
- **Licensing**: Configure if a license file or key is needed for installing the software.  This is also for MST files if you need to apply transforms for MSI installs.
- **Version Detection**: Configure the detection method.  Display Name and Upgrade code will cover most software and the version table in this section is dynamically updated based on the Search Filter provided.
- **Scripts**: Install, Uninstall, and Configuration scripts can be specified along with Upgrade Strategy and any Installation Prerequisites.
- **Advanced Settings**: Dynamic Version scripts and number of less often used types of scripts can be specified here including Post-Install, Post-Uninstall, Testing, Download.  You can also specify Repair Strategy and any linked Integration type.


## Creating Software Definitions

ImmyBot comes with many pre-defined software packages, but you can also create your own:

### Creating Basic Software

1. Navigate to **Library** > **Software**
2. Click **New**
3. Statically versioned software can upload a file or specify a URL for the version to be created.
4. Dynamically versioned software can specify None here to set a dynamic version script on the next page.
5. Confirm adding a version to new software.
6. Specify a Software Name, Detection Method and any applicable scripts.
7. Specify a Version String for statically versioned software.
8. Click on Create

### Adding Software Versions

1. Open the software definition
2. Scroll to the bottom of the page to the **Versions** section
3. Click **New** in the Versions section
4. Follow the onscreen instructions to upload the installer package or create your own installation methods.
5. Confirm the Version string is correct
6. Click **Save** to add the version

### Version Detection Methods
::: tip
Use the Terminal tab on the computer and run Detect-Software from Metascript context after installing software.  Then you can look at how ImmyBot will see the Display Name and Upgrade Code in the list it returns
:::

Detection methods determine if software is already installed:

1. Open the software definition
2. Scroll to the **Version Detection** section on the software details page
3. Select what kind of detection you want to use
   - Display name
   - Upgrade Code
   - Custom detection script
4. Follow the on screen instructions to edit and live view your changes.

::: info Version Detection
Display Name and Upgrade Code usually work for most software.

When using Custom Detection Scripts, the software may not be displayed in inventory accurately.
:::



### Creating Installation Scripts

::: warning
ImmyBot Support does not provide custom scripting support
:::

::: tip
We recommend using the default install scripts where possible, search for “default” in the script drop down to find various default install scripts. The Default NSIS is a great starting point for customizing your own install scripts too.
:::

Installation scripts handle the software installation process:

1. Open the software definition
2. Navigate to the **Installation** section
3. Click **New**
4. Write or paste your PowerShell script
   - Be sure to look up any silent install information that might be available from the vendor to help you write your script
5. Make sure to set your Execution Context for the script appropriately on the right side.
6. Use ImmyBot helper functions as needed
   - Review our [Scripting Guide](/Documentation/AdvancedTopics/scripts) for more information.
7. Click **Save**

### Automatic Updates

For software that should always be on the latest version you will need to create a Dynamic Version Script.  Dynamic Version scripts should return an array of objects. Each object must include at least a “Version” and “URL” property.  There are several existing functions in global that start with “Get-DynamicVersion” that you can use to help build your own Dynamic Version scripts, and many examples of how to use them in global also.

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

::: tip
Sorting by Version can help to identify outdated software
:::

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
