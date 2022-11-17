# Scripting Guide

## Best Practices
* Look for a script that already does what you want. There is a lot of good logic in the built in function scripts
* Have a machine you can test on
* Have a _separate_ machine to test your sanity if you bork your first machine
* Test by clicking Open Debugger in the logs
  * This gives you all available parameters on the left so you can test the script in its natural context
  * You can quickly revise the script here until it works as expected
  * Saving the script here saves it permanently
* Don’t hardcode paths to installer or license files, instead rely on $InstallerFile and $LicenseFilePath
* Don’t hardcode license values or other sensitive information, instead utilize $LicenseValue or a custom parameter
* Avoid (where possible) installers that have client specfic licenses or customizations built in
  * If a generic installer isn't available (BitDefender) use Dynamic Versions (and potentially a URL parameter) to specify the download URL per customer or perhaps use an API to find the URL for the given customer
  * If the URL requires authentication, use a custom Download script to perform the authenticated download (CrowdStrike/SentinelOne)
* Don’t repeat yourself. Leverage function scripts to reuse code
* Include code to verify that the script did what it intended to do
    * For Tasks, implement a “test” script
    * For Software, make sure your Detection method works, and optionally implement a Test script to verify things are in working order
        * When a software Test script returns $false, ImmyBot will re-install the software.
* Use Metascripts, especially if your script needs to restart the machine or access APIs like IT Glue and therefore will contain sensitive data like API keys
* Use throw “The bad thing that happened, what user should do” to prevent cascading failure. That message will be shown to the user in a prominent location so they can take corrective action
* Tasks have a “test” mechanism that should return $true or $false to indicate compliance

**While it may be cumbersome to write additional logic to verify your work, the reward of knowing exactly how many machines are or are not compliant with your desired state is worth it. Without it, you are flying blind. With it, you know exactly how many machines require additional attention, giving you the opportunity to write better code that handles more edge cases. See the Helper Function section to see how we make your life easier.**

## Script Types

A script will have a specific type.  This type determines which variables and commands will be available in the script.

### Software Detection

Software Detection scripts are used to determine whether an existing software is present and what version it may be.

Avoid custom detection scripts where possible. Software with a custom detection script can't be matched to pre-existing inventory data on the machine, making it difficult to report on how many machines have the software already. Further, the "Assignable" software tab won't work since that matches the detection method to existing inventory data. However if your software doesn't create an entry in Add/Remove Programs, you may have no choice but to use a custom detection script. It is important to note that a lot of software creates hidden entries under Add/Remove Programs, ImmyBot inventories these hidden entries, further reducing the need for custom detection scripts.

When you write your custom detection script, your best bet is to find a exe or dll file under Program Files\<software name> or ProgramData\<softwarename> that shows the version when you right click on it and go to Properties. To retrieve this version use a script similar to the following:

```powershell
Get-Command "C:\Program Files*\<softwarename>\mysoftware.exe" -ErrorAction SilentlyContinue | %{ $_.Version.ToString() }
```

If there is no exe or dll file containing the version, perhaps there is a .ini, .config, .json or .xml file that contains the installed version.

If all else fails, you can simply return "1.0" if a file associated to the software exists. 

These scripts  **must return a string that will cast to a valid `System.Version`**. 
Returning an actual `System.Version` will fail. (Although we may correct this in the future)
For example 
```
$version = [String]"1.2.3"
return $version
```
will work, but currently 
```
$version = [System.Version]"1.2.3"
return $version
```
will fail.

### Software Auto Update (Deprecated, use dynamic versions instead)

These scripts are useful for automatically adding new versions for a software.
Script should return a `$SoftwareVersion` object.
```
$SoftwareVersion = @{}
$SoftwareVersion.url = $LatestPackage.OriginFile.OriginUri
$SoftwareVersion.displayVersion = $VersionFromMsi
return $SoftwareVersion
```

### Software Version Action

These scripts can be used on a software version for installation, post-installation, uninstallation, post-uninstallation, testing, and upgrade scripts.

### Maintenance Task

These scripts are available only on maintenance tasks.

### Metascript Deployment Target

These scripts are used on deployments as a target.

They **must return `$true` or `$false`**.

A value of `$true` indicates that the computer applies to this deployment.  A value of `$false` indicates that the computer does not apply to this deployment.

### Filter Script Deployment Target

These scripts are used on deployments as a target.

They **must return a `Computer[]` array**.

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

Avoid setting these variables yourself or having variables with similar names.

### $AzureTenantId

`[string]` The Azure Principal Id of the computer's tenant.

#### Accessible in

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

`[string]` Will be a value consisting of `[ "get" | "set" | "test" ]` that can be used in Combined Task scripts.

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

`[string]` Name of the Software

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

## Scripting Frequently Asked Questions
### Can I use custom parameters in my scripts?
Yes. Add parameters to the Task your script is associated to. If this is a software install script, associate the task to the software as a "Configuration Task", and all parameters are passed into the Install scripts

### Can I deploy files along with my scripts?
Yes. Tasks have a “File” parameter type. Immy will download the file and provide the path to the file in variable.

### Can I deploy a script to all of my computers?
Yes, you do this by creating a Task. We strongly recommend your task includes a ‘Test’ so Immy can check its work and provide reporting on the effectiveness of your script.

### Why do I have to create a Configuration Task to get custom parameters into my Software?
- Some software can only be configured at install time by providing command line parameters to the installer, think Antivirus products.
- Some software can only be configured after they are installed, think VPN Profiles
- Some software can go either way (Generally by manipulating config files or registry values)

Let’s say your Software package accepts command line parameters at install time. You would create a Configuration Task with those parameters without implementing the scripts on that Task. ImmyBot will pass the parameters into the install script.

Later you need to reconfigure this software on lots of machines. You discover that the parameters you passed into the installer are ultimately held as registry values (Duo Logon Provider is like this). At this time you would implement the scripts on the Software’s Configuration Task. These scripts task will test the existing registry values against the desired ones, and set them to the desired value, and then re-test to verify.

### How does Immy get the latest version of software?
This is done via “Dynamic Versions”. Rather than upload the latest installer for every version of a piece of software, create a dynamic versions script that returns the most current version number, and the URL to download it. Reader, Zoom, 7zip, Chrome, Edge, Firefox, Bluebeam, Citrix, Egnyte,  and many more already have dynamic version scripts defined. This allows Immy to keep these items up to date on all your machines.

## Configuration Task Helper Functions
We provide helper functions for common tasks like Registry and configuration file manipulation

When used in the context of a Task, these functions honor the $method variable containing the mode the script should be run in (‘test’, ‘set’, or ‘get’)

**These must be run from the Metascript context
### Get-WindowsRegistryValue | RegistryShould-Be
#### Overview
Get-WindowsRegistryValue fetches the value of the specified Path and Name, and RegistryShould-Be tests and sets the value, creating missing keys/values if required 

On average this saves 8-10 lines of PowerShell per registry value and makes your code significantly more readable

#### Usage
* Microsoft Edge

#### Example
This assumes you have a parameter called ServerAddress

```powershell
Get-WindowsRegistryValue -Path "HKLM:\Software\MySoftware" -Name "ServerAddress" | RegistryShould-Be -Value $ServerAddress
```
### FileShould-Be
#### Overview
This accepts the source file path as input and verifies the files exists in the destination path, overwriting if the hashes don't match

#### Example 1 - Config File
This assumes you have created a parameter called ConfigFile
```powershell
$ConfigFile | FileShould-Be -in "C:\ProgramData\MySoftware"
```

#### Example 2 - Zip File
This assumes you have a parameter called ZippedConfig

The following script will iterate recursively over the extracted files and place them in the target directory. It will verify the hash matches when in test mode.

```powershell
# ImmyBot will automatically extract the Zip file and put the path it extracted it to into a variable named $ZippedConfigFolder
$ZippedConfigFolder = Invoke-ImmyCommand { Get-ChildItem $using:Folder -Recurse -File }
$ZippedConfigFolder | select -Expand FullName | ForEach-Object {
  $FilePath = $_
  $FilePath | FileShould-Be -in "C:\Program Files*\MySoftware" 
}
```

### XMLShould-Be
Let's say your software has an XML file you need to change settings in.

This assumes you have a parameter called ServerAddress
#### Usage
* OpenDental
* SmartBoard

#### Example
See the scripts for OpenDental and SmartBoard for usage of this

```powershell
$ConfigFilePath = "C:\ProgramData\MySoftware\configuration.xml"
$XML = Get-Content $ConfigFilePath
$XML = $XML | XMLShould-Be -XPath "/ServerAddress" -Value $ServerAddress
$XML | Set-Content $ConfigFilePath 
```

### HKCUShould-Be
```powershell
Get-WindowsRegistryValue -Path "HKCU:\Software\Policies\OneDrive" -Name EnableADAL | HKCUShould-Be 1
```

### ShouldHave-One

One of the aggravating things about PowerShell is ensuring there is exactly one item in a variable

Typically you would do something like this:

```powershell
$MatchingUsers = Get-ADUser -Filter * | ?{$_.SAMAccountName -like "Admin*" }
$MatchingUserCount = $MatchingUsers | measure | select -Expand Count
if($MatchingUserCount -eq 0)
{
  throw "No matching users found"
}
else if($MatchingUserCount -gt 1)
{
  throw "Multiple users found: $($MatchingUsers | Out-String)"
}
```

Is reduced to
```powershell
$MatchingUsers = Get-ADUser -Filter * | ?{$_.SAMAccountName -like "Admin*" }
$MatchingUsers | ShouldHave-One
```

If you simply want to take the first element but warn if there are multiple, use the -TakeFirst switch

```powershell
$MatchingUsers = Get-ADUser -Filter * | ?{$_.SAMAccountName -like "Admin*" }
$MatchingUser = $MatchingUsers | ShouldHave-One -TakeFirst
```
