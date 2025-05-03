# Software Library

The Software Library in ImmyBot is where you manage all software packages that can be deployed to computers. This page provides an overview of the Software Library and how to use it effectively.

## Understanding Software Types

The Software Library contains different types of software packages:

- **Local Software**: Created by users in your ImmyBot instance
- **Global Software**: Created and managed by the ImmyBot team
- **Recommended Software**: Suggested software packages for use in your ImmyBot instance

## Managing Software

### Adding New Software

1. Navigate to **Software** in the left sidebar
2. Click the **New** button in the top-right corner
3. Fill out the software details:
   - Name
   - Version
   - Installation method
   - Installation script
   - Detection method
   - Icon (optional)
4. Click **Save** to add the software to your library

### Editing Existing Software

1. Navigate to **Software** in the left sidebar
2. Find the software you want to edit
3. Click the **Edit** button (pencil icon)
4. Make your changes
5. Click **Save** to update the software

### Deploying Software

1. Navigate to **Software** in the left sidebar
2. Find the software you want to deploy
3. Click the **Deploy** button
4. Configure the deployment settings
5. Click **Create** to create the deployment

## Software Installation Methods

ImmyBot supports multiple installation methods:

### PowerShell Script

Write custom PowerShell scripts to install software. This is the most flexible method and allows for complex installation scenarios.

```powershell
# Example PowerShell installation script
$installerPath = Join-Path $env:TEMP "installer.exe"
Invoke-WebRequest -Uri "https://example.com/installer.exe" -OutFile $installerPath
Start-Process -FilePath $installerPath -ArgumentList "/S" -Wait
Remove-Item $installerPath -Force
```

### MSI/EXE Installer

Upload installer files directly to ImmyBot. The system will handle the installation process.

### Chocolatey

Use the Chocolatey package manager to install software. Simply specify the package name and version.

### Winget

Use the Windows Package Manager (Winget) to install software. Specify the package ID and version.

## Software Detection Methods

ImmyBot uses detection methods to determine if software is already installed:

### Registry Check

Check if a specific registry key or value exists.

### File Check

Check if a specific file exists at a given path.

### PowerShell Script

Use a custom PowerShell script to detect if the software is installed.

## Best Practices

### Naming Conventions

Use clear, descriptive names for your software packages:

- Include the software name and version
- Use consistent capitalization
- Avoid abbreviations unless commonly understood

Example: "Google Chrome 120.0.6099.130"

### Version Management

- Always specify the exact version of the software
- Update the version when new releases are available
- Consider creating separate entries for major versions if you need to maintain both

### Testing

- Test all software installations in a controlled environment before deploying
- Verify that detection methods work correctly
- Test uninstallation procedures if applicable

### Documentation

- Add detailed notes to each software package
- Document any special requirements or configurations
- Include links to vendor documentation when relevant

## Troubleshooting

### Installation Failures

If software fails to install:

1. Check the maintenance logs for specific error messages
2. Verify that the installation script is correct
3. Test the installation manually on a computer
4. Check for prerequisites that might be missing

### Detection Issues

If software is not being detected correctly:

1. Verify that the detection method is appropriate for the software
2. Check for changes in registry keys or file paths in newer versions
3. Test the detection script manually on a computer with the software installed

## Related Topics

- [Deployments](./deployments.md)
- [Creating & Managing Deployments](./creating-managing-deployments.md)
- [Maintenance Tasks](./maintenance-tasks.md)
- [Maintenance Sessions](./maintenance-sessions.md)

---

**Next Steps:** [Maintenance Tasks →](./maintenance-tasks.md) | [Deployments →](./deployments.md)
