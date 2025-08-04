# Releases in 2020

## 0.38.2

Released 2020-12-29

### New Features

Updated the export default name to be meaningful.

![image](https://immybot.blob.core.windows.net:443/media/15b34d24-cffc-453f-a8f1-bf2db2efc422.png)

![image](https://immybot.blob.core.windows.net:443/media/f0c9037a-85f3-4163-b122-9fe5fdeacaa6.png)

Added a Uri datatype for maintenance task parameters.

![image](https://immybot.blob.core.windows.net:443/media/c6a0ee48-29e4-48a3-a349-44aaf7d601b1.png)

This parameter is available as a Uri type in power shell for users to us inside of scripts.

![image](https://immybot.blob.core.windows.net:443/media/e54f2606-7869-4fab-a18b-c8868c49f319.png)

### Improvements

- When creating new software versions, we will default the new version's settings to the previous version's settings. This is generally more reliable that using the analysis results by default. If there is no previous version, then we will still use the analysis results as default.
- Adds the result message to the action column in the deployment excel export to help indicate success/failure.
- Using the new Uri datatype no additional parsing will be needed to convert a string to a Uri inside of the script.
- Made the system update page show current version release notes
- Added current release update notes; Switched to using cards for displaying releases
- Display computer provider type button for each RMM Link instead of type and hid disabled links
- Updates the Schedules List to show the same Target fields that the Deployment List shows.

  - ![image](https://immybot.blob.core.windows.net:443/media/ea0054df-3343-43cf-8326-6ac5f0fdf5b2.png)

### Bug Fixes

- Fixed issue with saving global maintenance task with non-file parameters
- Fixed an issue when uploading an installer Immy would not try and match it to an existing software.
- Fixed a bug on the upload software version page where clicking the **next** button was not loading the next screen.
- Fixed a bug when saving cross tenant deployments where we did not clear the tenant field if the deployment was previously for a specific tenant.
- Fixed issues with the session list page not showing correct results when the time filter was applied.
- Fixed an issue where we could show non IP addresses for a computer's external IP field when the External IP Inventory script runs
- Fixed an issue where BITS Download would not fallback to basic download if the command timed out.
- Fixed issue with showing the updated by and update by by person on the Schedules List page.
- Hid the Download ImmyAgent link when ImmyAgent RMMLink is disabled.
- When detecting software version after install a newer version than expected will no longer cause a failure for that action.
  - This fixes the case in where some software auto update themselves right after installation.

## 0.38.1

Released 2020-12-23

### Bug Fixes

- Corrected issue preventing Maintenance Tasks from being saved

## 0.38.0

Released 2020-12-21

### New Features

#### Maintenance Tasks Files

![image](https://immybot.blob.core.windows.net:443/media/a3575538-bde6-4d5b-89a2-85c0efdaeba4.png)

- Specify a default file if the user doesn't specify one
- Include utilities with maintenance tasks by marking the parameter as hidden

![image](https://immybot.blob.core.windows.net:443/media/a3575538-bde6-4d5b-89a2-85c0efdaeba4.png)

#### Log Highlighting

![image](https://immybot.blob.core.windows.net:443/media/372b9485-34a8-4316-96cb-89ff338152a2.png)

- Highlights the important logs for a software or task so they are more easily recognized.

#### Safely create Uris for REST APIs

![image](https://immybot.blob.core.windows.net:443/media/a5e267ee-bda3-40e8-89e0-67a7a3c07e9d.png)

##### Example

```powershell
Add-UriQueryParameter -Uri 'https://my.thingwithqueryparams.com/items' -Parameter @{'Filter'='subject like "hello"'}
```

##### Output

```
https://my.thingwithqueryparams.com:443/items?Filter=subject+like+%22hello%22
```

#### Accessing Azure KeyVault

```powershell
$Headers = Get-ImmyAzureAuthHeader -Endpoint Keyvault
Invoke-RestMethod 'https://<yourvault>.vault.azure.net/secrets/secretname?api-version=7.1' -Header $Headers | Select -Expand Value
```

![image](https://immybot.blob.core.windows.net:443/media/6b9e3afc-b182-4d51-b6c6-d01fff3033b9.png)

#### Access arbitrary Azure authenticated resource URIs

```powershell
$Headers = Get-ImmyAzureAuthHeader -ResourceUri 'https://vault.azure.net'
Invoke-RestMethod 'https://<yourvault>.vault.azure.net/secrets/secretname?api-version=7.1' -Header $Headers
```

### Improvements

- Added the capability for ImmyAgent Provisioning packages to be downloaded an ISO.
  ![image](https://immybot.blob.core.windows.net:443/media/67960ec4-5b96-4d2c-8d68-a1f5d0010234.png)
- Added date/time tooltips to session times to see specifically when a session started
- Removed automatic software evaluation run from computer details page
- Adds Open remote session buttons to the computer deployment list.
- Adds a checkbox to include/exclude offline computers from the computer list page.
- Configuration task parameters are now available in software test scripts.
- Added OS Name and Manufacturer to the Computer Overview tab.
- Added dependency badges to maintenance action items
- Added default to maintenance action table to hide actions with `No Action` to reduce clutter.

* Removed unnecessary show preview div from Computer Details->Software tab
* Removed automatic software evaluation from Computer Details page
* Added Remote Session button on Edit Deployment page
* Added offline computer checkbox filter to computer list page
* Fixed test script result parsing and added config task variables to it
* Removed legacy TestResult syntax from SoftwareVersion scripts
* Added date tooltips to sessions/actions times
* Set JobArgs to Suppress reboots when running action from Computer Details; Needs Attention
* Moved the drag handle for RMM Priority ordering to the left side
* Start system required inventory in overwrite existing command
* Added dependency badge to maintenance session action list item and action table
* Refactored to keep GetAuthConnectionString() private and added -Endpoint KeyVault as an alias for the resourceUri
* Added parametersetnames to Get-ImmyAzureAuthHeader to differentiate between orthogonal use cases
* Default to hiding 'No Action' in the computer actions table
* Removed string expansion from MetascriptHost to prevent need for backticks in Set-ComputerName Metascript
* Decreased timeout for the pending reboot check as this could cause sessions to hang for an unnecessarily long period of time if the script doesn't respond

### Bug Fixes

- Fixed 'Rerun' button action not suppressing reboots.
- Fixed maintenance action start and end time issues showing the wrong times
- Fixed an issue where the computer would show online even though all agents were disabled.
- Maintenance Task parameters and built in variables values are preserved and no longer string expanded in the Metascript context, allowing you to pass these values unaltered to scripts run via Invoke-ImmyCommand
- Fixed UTC/local issues with action start and end time
- Fixed online status for disabled RMMLinks

## 0.37.10

Released 2020-12-15

### Bug Fixes

- Fixes an issue on the computer software list where some fields were not immediately updating.
- Reduces padding of each item in the software list
- Fixed issue where scripts would occasionally fail to execute as the user even though the user is logged in
- Invoke-ImmyCommand no longer returns System.Object instead of $null, making it easier to detect null results
- $using variables no longer throw a null reference exception when the value is null in the parent context
- $using variables will issue a warning when they are not present in the parent context, previously a NullReferenceException was thrown both when the variable was declared but had a null value and when the variable was not declared. (Sometimes null is a valid value)

## 0.37.9

Released 2020-12-14

### Bug Fixes

- Fixed regression in 0.37.8 that broke inventory for most machines

## 0.37.8

Released 2020-12-12

### New Features

- Adds a helpful alert letting the user know that user scripts with a user action trigger of `Run once at login`, `Run at every login`, and `Active Setup at login` will run immediately if the user is logged in.

### Bug Fixes

- Fixes an issue running some inventory scripts against computers running PowerShell 2.0 (And possibly other PS versions, causing inventory to fail and computer names to be displayed as GUIDs)
- Un-reversed order of first and last names on edit deployment page
- Adds missing maintenance task category to the maintenance task details page
- Fixes an issue where we were not properly updating the maintenance action if the desired state was `Update If Found` and the software was not present`
  - Now properly resolves the action result to `Success`, the Action Type to `No Action`, and the Action Reason to `Software Missing`.
- Fixes issue where RunAsUser fails because user is not a local admin
- Fixed issue where Immy was pre-selecting incorrect Software after analyzing non-MSI installers
- Fixes error when using 'Update if Found' with ninite packages.

## 0.37.7

Released 2020-12-10

### Enhancements

- Allows for saving scripts while focused in the editor by pressing Ctrl S.
- Adds an alert prompting to save changes when navigating away from a modified script

### Bug Fixes

- Fixes a permission issue when searching the computer list by primary user
- Fixed object serialization issue from Windows Server 2003 machines

## 0.37.6

Released 2020-12-09

### Bug Fixes

- Fixes an issue where CW Control RMM Links were failing if the CW Control URL contained a specific route.
  - e.g. https://contoso.com/specificroute would not work, but it now does
- Fixes the excel export on the Deployment page's Affected Computers panel
- Fixes a bug on script details form where the scripts timeout was not showing the correct value
- Fixes a bug when viewing the script details in a modal, where the default timeout was not being supplied.
- Resolves issue where Immy incorrectly reports "User is not logged in" when a user is logged in over RDP
- Fixes a bug on the computer details page sessions tab where sessions for other computers show up if you change the time filter
- Fixes a bug in the computer list page, if the computer name is missing, we now show the device id

### Enhancements

- If a provider fails to initialize, it will be automatically disabled to increase the overall health of Immy.

## 0.37.5

Released 2020-12-08

### New Features

- Function Scripts! Keep your code dry! You can now call scripts from other scripts. Simply create a new script with category Function, define your logic, and then call the function from another **MetaScript**.
- Adds a new column to the session table called "Type" to indicate whether the session was "Scheduled" or "Manual".

### Bug Fixes

- Fixed duplicate persons issue. Syncing persons from azure users now checks if there is an existing person with the same user principal name (email) and will update that person instead of creating a new one.
- Fixes an issue where the onboarding form's primary user selector was returning people outside of the selected tenant (Only an issue for MSP users).
- Fixes a bug where the `New` and `Copy as New` buttons were missing from the script selector.
- Fixed an issue with Immybot using the incorrect software version when deploying the "latest" version
- You can now analyze a version without specifying the "Installer Executable Path" if the file is a zip file
- Renamed metascript `Get-RmmProvider` to `Get-RmmInfo` and added the information required to retrieve EDFs for Clients and Computers from Automate
- Addresses memory performance issues with the computer list page
- Fixes some default properties when loading the maintenance task form in a modal.
  Fixes a bug in Invoke-ImmyCommand where providing the same $using variable with different capitalization threw a duplicate variable error.

### Enhancements

- Added logic to auto select an existing software by upgrade code on the software version upload page
- Updates the deployment form's software, version, and configuration task "View" buttons

## 0.37.4

Released 2020-12-08

### Bug Fixes

- Fixed an issue with inventory scripts being retried every minute on devices that return exceptions

## 0.37.3

Released 2020-12-01

### Bug Fixes

- Fixed issue with terminal not rendering output when launched from Edit button on session logs
- Fixes an issue where the suggested rmm link name conflicted with an existing name
- Set the Hangfire Redis MaxStateHistoryLength to 5 to fix issues with uncontrolled memory leak

## 0.37.2

Released 2020-11-24

### Hotfixes

- Fixed several broken maintenance session links that were not bringing the user to the correct page.
- Fixed an error in metascripts about the use of duplicate `$__using` variables.
- Fixed an issue rendering the xterm terminal within the script editor modal.

## 0.37.1

Released 2020-11-23

### Hotfixes

- Fixed filter scripts to only return a single computer when run for a maintenance session. Not doing this was causing memory to balloon up unnecessarily.

## 0.37.0

Released 2020-11-23

### Enhancements

Check out our new documentation site! https://docs.immy.bot/

##### Actionable Software Inventory

- Updated the _Software_ tab to now provide actionable buttons for software and maintenance tasks that are not compliant

##### Automatic Onboarding

- Plug in the USB drive and setup begins automatically without having to login to Immy
  - Create a new _Windows 10 Setup USB Package_ and enable the auto-onboarding option
- Added a new tab called _Sessions_ that allows a user to easily see computer sessions without leaving the computer details page
- Added an _Onboarding_ tab to the computer details page to allow easier changing of customer and primary user

##### Script Engine

- Simplified Filter Script syntax, removed -TargetType and -TargetGroupFilter as these are selectable in the UI
- Added xterm.js to the Script Editor for better handling of large return payloads
- Write-Host output is no longer suppressed when run within Invoke-ImmyCommand
- Write-Debug, Write-Verbose, Write-Warning, and Write-Error all work both within Metascripts, and scripts run via Invoke-ImmyCommand (Note: $DebugPreference and $VerbosePreference need to be set to 'Continue' as the PowerShell default will suppress the output from these cmdlets)
- Write-Host in Metascripts and Cloudscripts supports -ForegroundColor, -BackgroundColor and -NoNewLine parameters
- Terminal now formats Errors and many other objects according to the PowerShell 7 default
- PowerShell 7 $ErrorView= 'ConciseView' is now supported
- Exceptions thrown within scripts now show the script line instead of a backend stack trace
- Added $AzureTenantId variable to all scripts

### Stability

- Fixed memory leak in the user affinity job that was causing instances to hang on an error page
- Added availability health checks for some azure resources to help diagnose issues faster.

#### Hotfixes

- Fixed an issue where renaming a computer did not immediately show the change in the browser
- Fixed an issue with sending test emails from the smtp page. It would sometimes incorrectly throw an error about enabling authentication
- Added Update If Found desired state for Ninite Software
- Fixed selecting a software on the deployment page to auto select "Installed" and "Latest" as the default options
- Fixed an issue where it was not possible to view global maintenance task scripts from within the Maintenance Task interface
- ImmyAgent no longer executes Batch/CommandLine as PowerShell

#### Security

- Get-ImmyComputer no longer returns computers from other tenants when run by a non-MSP user

## 0.36.4

Released 2020-11-19

### Bug Fixes

- Moved the pending reboot check from the beginning of the session to the beginning of the execution phase so computers do not reboot during detection. Computers usually run detection during the day and we do not want to reboot computers while they are being used.

## 0.36.3

Released 2020-11-13

### Bug Fixes

- Fixes bug where rebooting a computer would sometimes hang the maintenance session
- Fixes a typo `reading for onboarding` -> `ready for onboarding`
- Fixed issue preventing a computer from rebooting if necessary before it starts a maintenance session
- Fixes an issue where an action would immediately fail if the computer failed to reboot
  - e.g. A software is supposed to be uninstalled and then reinstalled. After the uninstall, a reboot may be attempted. If it fails, we will now still attempt the reinstall anyway.
- Fixes a critical bug that could allow a person to be incorrectly associated with another tenant.

## 0.36.2

Released 2020-11-04

### Bug Fixes

- Fixed an issue where the `Update Now` and `Postpone` buttons were missing on the maintenance email when they were set to be shown by its schedule.

## 0.36.1

Released 2020-11-02

### Bug Fixes

- Run Maintenance button at the top of the Computer Details Page now suppresses reboots by default
- Edit PSALink page no longer throws exception when CWManage API returns duplicate companies
- Updated task type and task category label names on the task form
- Fixed a null reference exception when calling Get-ImmyComputer passing in InventoryKeys

## 0.36.0

Released 2020-10-26

### Features

- New and improved **Computer Details Page** that shows much more details
- Added Inventory Task feature
- Added a **System Status Page** that shows script execution metrics for enabled RMM Providers
- Added a **System Update Page** that allows an administrator to update to newer versions of ImmyBot when they are released
- Implemented Downgrade logic for software

#### Enhancements

- Optimized script execution when using the CW Control RMM Provider
- Optimized background job scheduling
- Re-designed the **Computer List Page**
- Merged the Onboarding and Pending Computer Pages into one page called **New Computers**
- Made the ImmyAgent more scalable
- Added a loading animation when filtering the **Computer List Page**
- When a session expires and the page is reloaded, you will now be redirected back to the page you were on

#### Bug fixes

- Fixed CW Control extension to work on latest version of CW Control (2020.11)
- Fixed session failing with Ninite fails to download
- Fixed a CORS issue when new instances are registered with uppercase characters
- Fixed an edge case when scripts erroneously indicate they have been modified when pressing cancel
- Removed validation requirement for username in SMTP settings
- Fixed Automate Computers with _UTC+0_ (UK) do not sync due an issue with using `DateTime.Subtract(0)`
- Fixed an error occurring on Windows 7/PS 2.0
- Fixed an edge case where a server got caught in an endless reboot
- Removed the WiFi SSID minimum length for PPKGs
- Fixed a bug where license files did not download before running the **Test** script
- Fixed an issue where **User Context Scripts** were returning `'gt' is not recognized`
- Fixed a bug where maintenance tasks were performed out of order when there was a software dependency
- Fixed a bug on the Deployment Page where selecting a domain controller was causing an error
- Fixed a bug in metascripts where `Get-ImmyComputer -TargetType TenantDomainControllers` was failing
- Fixed bug where the Users List showed a _System_ user
- Fixed a bug where bulk software detection failed on PS 2.0 and PS 3.0 when using `[Guid]::new`
- Fixed a bug where the CW Automate Provider was not leveraging the 301 command
- Fixed a bug where the ImmyAgent did not start on VMware VMs due to lack of BoardSerialNumber
- Fixed some edge cases where sessions kept getting stuck in the _Created_ status
- Fixed a bug where the ImmyAgent was defaulting to 10 seconds for the script execution
- Fixed a bug where the software selector on the license form was showing parameters for linked maintenance tasks
- Fixed a bug where maintenance task fields _Hidden_ and _Default Values_ were not saving on Create
- Fixed a bug in the package analyzer where it was throwing `Key Not Found` for Inno version 6 installers
- Fixed a bug with Deployments using a desired state of Uninstall/NotPresent that was causing failures due to _missing required parameters_
- Fixed a bug with maintenance task parameters not being provided to software install scripts
- Fixed a bug where users could not open the **Maintenance Session Details Page** for computers they onboarded
- Fixed a bug where deployments for maintenance tasks with password parameter types were unable to be deployed
- Fixed a bug where the _Current User_ user action trigger was not available for scripts created on the software version form
- Fixed a bug where the RMM to PSA auto client mapping failed when the RMM returns non-unique external ids
- Fixed a bug where non-msp users could not access software or deploy the ImmyAgent

## 0.35.16

Released 2020-10-23

This is the first release in the release cycle
