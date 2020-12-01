# Scripts

## Script Types

A script will have a specific type.  This type determines which variables and commands will be available in the script.

### Software Detection

These scripts  **must return a valid `System.Version`**.

Software Detection scripts are used to determine whether an existing software is present and what version it may be.

### Software Auto Update

These scripts are useful for automatically adding new versions for a software.

### Software Version Action

These scripts an be used on a software version for installation, post-installation, uninstallation, post-uninstallation, testing, and upgrade scripts.

### Maintenance Task

These scripts are available only on maintenance tasks.

### Metascript Deployment Target

These scripts are used on deployments as a target.

They **must return `$true` or `$false`**.

A value of `$true` indicates that the computer applies to this deployment.  A value of `$false` indicates that the computer does not apply to this deployment.

### Filter Script Deployment Target

These scripts are used on deployments as a target.

They **must return a `Computer[]` array.

The deployment will only apply to computers specified in the returned array.

## Script Execution Contexts

A script will have a specific execution context.  This context determines how the script gets run.

### System

The script runs on the computer under the system user.

### User

The script runs on the computer under a specific user.

### Metascript

The script runs on the server in the context of a specific computer.

### Cloudscript

The script runs on the server in the context of a specific tenant.

## Variables

All variables are strings, but are castable to the datatypes specified.

At this time, the variables are string replacements.

Avoid setting these variables yourself or having variables with similar names.

### $AzureTenantId

`[string] The Azure Principal Id of the computer's tenant.

- Software Detection
- Software Auto Update
- Software Version Action
- Maintenance Task Setter
- Metascript Deployment Target
- Filterscript Deployment Target

### $ComputerName

`[string]` Name of the computer the session is running against

#### Accessible in

- Software Detection
- Software Auto Update
- Software Version Action
- Maintenance Task Setter
- Metascript Deployment Target

### $DetectionString

`[string]` String used to find the software in the registry

#### Accessible in

- Software Version Action

### $DisplayName

`[string]` Display Name of the Software Version

#### Accessible in

- Software Version Action

### $DisplayVersion

`[System.Version]` version of the software being deployed `1.2.3.4`

#### Accessible in

- Software Version Action

### $InstallerFile

`[string]` Full path to the installer file itself

#### Accessible in

- Software Version Action

### $InstallerFolder

`[string]` Full path to the folder the installer file can be found in

#### Accessible in

- Software Version Action

### $InstallerLogFile

`[string]` Suggested full path for log file. When used Immy will get the content of this file for you and display it in our logs.

#### Accessible in

- Software Version Action

### $IsPortable

`[boolean]` 'True' or 'False' indicating whether the current computer is a laptop/tablet

#### Accessible in

- Software Detection
- Software Auto Update
- Software Version Action
- Maintenance Task
- Metascript Deployment Target

### $LicenseFilePath

`[string]` Full path to the license file for the software (from the Deployment) Note: Software must be marked 'Licensed' and Software Version must indicate that it requires a License File and an Deployment applicable to this user/computer must specify a license file.

#### Accessible in

- Software Version Action

### $LicenseValue

`[string]` From Deployment. Used for software that requires a key. Alternative usage could be to use this to hold additional command line parameters to customize installation for different computers. Software must be marked as Licensed for this variable to be replaced.

#### Accessible in

- Software Version Action

### $Method

`[string]` Will be a value consisting of `[ "get" | "set" | "test" ]` that can be used in maintenance task scripts.

#### Accessible in

- Maintenance Task

### $PrimaryPersonAzurePrincipalId

`[Guid]` User's unique identifier in Azure

#### Accessible in

- Software Detection
- Software Auto Update
- Software Version Action
- Maintenance Task
- Metascript Deployment Target

### $PrimaryPersonEmail

`[string]` Mail Address of the person that most frequently uses this computer

#### Accessible in

- Software Detection
- Software Auto Update
- Software Version Action
- Maintenance Task
- Metascript Deployment Target


### $ProductCode

`[string]` Product code of the version being deployed

#### Accessible in

- Software Version Action

### $Software

`[Software]` The software that is running the auto update script.

#### Accessible in

- Software Auto Update

### $SoftwareName

`[string] Name of the Software

#### Accessible in

- Software Detection
- Software Auto Update

### $SoftwareVersions

`[ICollection<SoftwareVersion>]` The software versions of the software.

#### Accessible in

- Software Auto Update

### $TenantName

`[string]` Name of company the computer belongs to

#### Accessible in

- Software Detection
- Software Auto Update
- Software Version Action
- Maintenance Task
- Metascript Deployment Target

### $UpgradeCode

`[string]` Upgrade code of the software

#### Accessible in

- Software Detection
- Software Auto Update