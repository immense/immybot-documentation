# Software Library

The Software Library is a central repository of software applications and packages that can be deployed to your managed computers. This page explains how to manage and use the Software Library in ImmyBot.

## Software Library Overview

The Software Library contains:

- **Software Applications**: Applications that can be installed on managed computers
- **Software Versions**: Specific versions of each application
- **Installation Scripts**: Scripts that handle the installation process
- **Configuration Settings**: Parameters that control how software is installed
- **Detection Methods**: Scripts that determine if software is already installed

## Adding Software

### Adding Standard Software

1. Navigate to **Software Library**
2. Click **Add Software**
3. Enter the software details:
   - Name
   - Description
   - Publisher
   - Category
   - Icon (optional)
4. Click **Save**

### Adding Software Versions

After creating a software entry:

1. Navigate to the software details page
2. Click **Add Version**
3. Enter the version details:
   - Version number
   - Release date
   - Download URL (if applicable)
   - Installation script
   - Detection script
4. Click **Save**

### Using Software Templates

ImmyBot includes templates for common software:

1. Navigate to **Software Library**
2. Click **Add from Template**
3. Browse or search for the desired software
4. Select the software and click **Add**
5. Customize the settings if needed
6. Click **Save**

## Software Types

### Windows Software

ImmyBot supports various Windows software installation methods:

- **MSI Packages**: Windows Installer packages
- **EXE Installers**: Executable installers
- **ZIP Archives**: Compressed software packages
- **PowerShell Scripts**: Custom installation scripts
- **Chocolatey Packages**: Software from the Chocolatey repository
- **Ninite Packages**: Software from the Ninite service

### macOS Software

For macOS computers, ImmyBot supports:

- **DMG Packages**: Disk image packages
- **PKG Installers**: macOS installer packages
- **ZIP Archives**: Compressed software packages
- **Shell Scripts**: Custom installation scripts
- **Homebrew Packages**: Software from the Homebrew repository

## Software Configuration

### Installation Parameters

Many software packages support configuration parameters:

1. Navigate to the software version details
2. Click **Edit Parameters**
3. Add or modify parameters:
   - Name
   - Data type (string, number, boolean, etc.)
   - Default value
   - Description
4. Click **Save**

### Silent Installation

Configure software for silent installation:

1. Navigate to the software version details
2. Click **Edit Installation Script**
3. Add silent installation switches or parameters
4. Click **Save**

## Software Detection

### Detection Methods

ImmyBot uses detection scripts to determine if software is installed:

- **Registry Check**: Verify registry keys or values
- **File Check**: Check for specific files or directories
- **Version Check**: Compare installed version with desired version
- **Custom Script**: Run a custom detection script

### Creating Detection Scripts

1. Navigate to the software version details
2. Click **Edit Detection Script**
3. Write or modify the detection script
4. Click **Save**

## Software Management

### Updating Software

To update software in the library:

1. Navigate to the software details page
2. Click **Add Version**
3. Enter the new version details
4. Click **Save**

### Deprecating Software

To mark software as deprecated:

1. Navigate to the software details page
2. Click **Edit**
3. Toggle the **Deprecated** switch to On
4. Click **Save**

### Removing Software

To remove software from the library:

1. Navigate to the software details page
2. Click **Delete**
3. Confirm the deletion

## Best Practices

### Software Organization

- **Consistent Naming**: Use consistent naming conventions
- **Proper Categorization**: Assign software to appropriate categories
- **Complete Documentation**: Include detailed descriptions and notes
- **Version Management**: Maintain multiple versions for compatibility

### Script Development

- **Error Handling**: Include robust error handling in scripts
- **Logging**: Add logging to help troubleshoot issues
- **Idempotence**: Ensure scripts can run multiple times without issues
- **Testing**: Test scripts in various environments before deployment

## Related Topics

- [Deployments](./deployments)
- [Maintenance Tasks](./maintenance-tasks)
- [Creating & Managing Deployments](./creating-managing-deployments)
