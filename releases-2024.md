## 0.66.2

Released 12/30/24

### Bug Fixes
- Fixed an issue with support technicians receiving a 500 on certain api requests
- Enhanced support debugging capabilities by providing more details in failed http requests

## 0.66.1

Released 12/11/24

### 🔧 Improvements
- Added ability to access parent tenant domain controllers using `UseParentTenant` switch in Get-ImmyComputer command
- Added form change detection and confirmation dialog to Edit Deployment screen
- Enhanced user impersonation to show name and email of impersonated user
- Added missing task category in deployment list
- Improved performance of loading target assignments

### 🐛 Bug Fixes
- Fixed remote control launch failures
- Fixed issue with repair actions not detecting integration parameters from saved deployments
- Fixed 500 error in computer inventory export when filter is null
- Fixed scrollbar background visibility issue
- Fixed issue where self-hosted HaloPSA integration health checks were marked as unhealthy
- Fixed issue with cancelled session events not propagating for person/tenant sessions
- Fixed exclude integration capabilities not taking effect

## 0.66.0

Released 11/07/24

### 🚀 Features

#### User Reboot Prompts and Enhanced Reboot Logic

- Added new "Prompt" option for pending reboots
- Administrators can now prompt end-users when a pending reboot is detected
- New properties added:
  - `Prompt Timeout Action`: Specifies action if user doesn't respond in time
  - `Prompt Timeout (minutes)`: Sets timeout duration before default action
- Enhanced reboot handling logic to incorporate user prompts
- Updated UI with new radio button option and additional settings

![image](https://immybot.blob.core.windows.net/release-media/8052a2b1-bb17-4f1d-a911-76bb3140627a)

**Dark Mode:**

![image](https://immybot.blob.core.windows.net/release-media/8b3aea62-772c-4369-aaeb-416f7ed33092)

**Light Mode:**

![image](https://immybot.blob.core.windows.net/release-media/c2672f71-c63f-45a7-a7ec-a5ca86cf8dda)

#### PowerShell Editor Services Improvements

- Implemented session idle detection and disconnection prompts
- Added resource management features to improve stability
- New prompt to inform users of impending Editor Services termination due to inactivity
- Added option to disconnect least-active terminal session when process limit is reached

### 🐛 Bug Fixes

- Fixed an issue where CW Control Agents were showing up as deleted multiple times in the timeline
- Resolved problem with OAuth consent input button continuing to show "Provide Consent" after authentication
- Fixed bug causing reporting pages to fail when exporting to Excel spreadsheet
- Corrected issue with extremely old versions of Immy Agent permanently showing online
- Resolved swagger API documentation loading problem
- Fixed provisioning package creation in Getting Started Wizard to include necessary scripts
- Corrected input handling in ImmyInput test configuration for proper saving of changes

### 🛠 Improvements

- Enhanced HaloPSA API routes to use SQL report API for better performance
- Improved readability of Preferences page descriptions
- Added form change detection and confirmation dialog to Edit Deployment screen
- Updated PSES resource management for better stability and error handling

### 🧰 Maintenance

- Removed Serilog and related components
- Refactored logging system and configuration
- Updated agent to .NET 8

## 0.65.5

Released 07/21/24

### Bug Fixes

- Fixed an issue where recommended deployments were not resolving for maintenance sessions

## 0.65.4

Released 07/30/24

### Improvements

- You can now change the User Override for all parameters of an onboarding Deployment with a single click
- More excludable capabilities have been added to the integration details page
- The properties "Manufacturer" and "Model" have been added to the Computers Report
- OAuth tokens are now refreshed every 24 hours instead of 89 days.
- The function script cache is now busted automatically when you interactively run a script from the debugger. The cache is also busted when you interactively run a maintenance session.

### Bug Fixes

- Fixed an issue where software install prerequisites would fail because the parent's parameters were incorrectly being passed to its prerequisites.
- Fixed an issue with ConnectWise ScreenConnect 24.2 not being able to open remote sessions.
- Fixed an issue where some devices arriving in Immy with no `Win32_ComputerSystemProduct` in the registry will fail to identify, resulting in an `JsonReaderException: Unexpected character encountered while parsing value: {. Path 'DeviceId'` error.
- Fixed some potential slow memory leaks that cause high memory after several days of uptime
- Fixed an issue where debugging scripts for software linked to an integration would throw the error "An integration is not linked to this script..."

## 0.65.3

Released 07/15/24

### Bug Fixes

- Fixed an issue where variables such as `$TenantId` were not available from within a dynamicparam block
- Fixed an issue where calls to `Connect-ImmyAzureAD` would fail because the base command `Connect-AzureAD` was not recognized
- Fixed an issue where dropdown parameters that used `Hashtable` or `PSObject` values would not work correctly from within a session
- Fixed an issue where clicking "Clear Output" in the script editor would not always clear the first line of output
- Fixed an issue with the Configure Directory and Directory Migration tasks where they would get stuck parsing the parameters at runtime.

## 0.65.2

Released 07/08/24

### Bug Fixes

- Fixed an issue with utilizing the Azure cmdlets from within a dynamic param block where it would fail with the error message "No tenant was specified for this script".

## 0.65.1

Released 07/05/24

### Bug Fixes

- Fixed an issue with some onboarding tasks not showing all of the parameters on the onboarding form unless you manually hit the refresh button
- Fixed an issue with CW Automate where agents were not being synced

## 0.65.0

Released 07/02/24

### Metascript Improvements

#### Fixed a bug where dropdown attributes, e.g. `[Dropdown({@{Option1=1; Option2=2}})]`, were incorrectly stripping the leading and trailing braces `{...}`
```powershell
param(
  [Dropdown({@{Option1=1; Option2=2}})]
  $DropdownParam
 )
```
would not work but the following would
```powershell
param(
[Dropdown({@{ Option1=1; Option2=2}
})]$DropdownParam
)
```

#### Dynamic Parameters can be declared without `New-ParameterCollection`

```powershell
[CmdletBinding()]
param()
dynamicparam
{
    # Before
    New-ParameterCollection @(
        New-Parameter -Name FirstName -Mandatory
        New-Parameter -Name LastName -Mandatory
    )
}
process{}
```

```powershell
[CmdletBinding()]
param()
dynamicparam
{
    # After
    New-Parameter -Name FirstName -Mandatory
    New-Parameter -Name LastName -Mandatory
}
process{}
```

#### Introduced `New-DatetimeParameter`

![image](https://immybot.blob.core.windows.net/release-media/a978b293-1b7a-409d-a4fb-7491f3b214cb)
![image](https://immybot.blob.core.windows.net/release-media/436fb487-afc1-4b25-afe8-76d4e1c2d706)

##### Simple Usage
```powershell
[CmdletBinding()]
param()
dynamicparam
{
    New-Parameter -Name FirstName -Mandatory
    New-Parameter -Name LastName -Mandatory
    New-DateTimeParameter -Name StartDate -Mandatory
}
process{}
```

##### Advanced Usage
```powershell
[CmdletBinding()]
param()
dynamicparam
{
    New-Parameter -Name FirstName -Mandatory
    if($FirstName -like "Darren*"){
        New-HelpText FirstNameWarning -HelpMessage "This guy is a jerk"
    }
    New-Parameter -Name LastName -Mandatory
    New-DateTimeParameter -Name StartDate -Mandatory -ValidateScript {
        if($_ -lt (Get-Date))
        {
            throw "StartDate must be in the future"
        }
        else{
            $true
        }
    }
}
process{}
```
![image](https://immybot.blob.core.windows.net/release-media/6e7387b7-7e03-43af-b646-73e18a75092b)

#### Throwing from within a ValidateScript block will now correctly associate the message to the parameter in the frontend.

![image](https://immybot.blob.core.windows.net/release-media/8fc780bb-1513-4b13-8bf1-bb341c3a6eb3)

### Script Editor

#### Updated terminal colors for better readability

![image](https://immybot.blob.core.windows.net/release-media/0bfad8da-b7b1-43b3-8e57-ea0598fbaf5f)

![image](https://immybot.blob.core.windows.net/release-media/f0424ca1-0aa9-4ac2-9ecc-924b760b8c30)

#### Fixed an issue where the script editor's search input would not focus after using the shortcut `ctrl+shift+f` or `ctrl+shift+p`

#### The script editor now has the ability to view previous changes to the script.

![image](https://immybot.blob.core.windows.net/release-media/76ead535-a368-466f-9b6c-26040926f344)

### Diff Editor UI

![image](https://immybot.blob.core.windows.net/release-media/62b6d394-9e28-4079-a513-12f9a8f06022)

### Remote Control

- In remote control on mobile devices, the virtual keyboard button is now a toggle.
  - The virtual keyboard will remain visible until toggled off.
- Fixed an issue in remote control for some browsers (e.g. Firefox) that was causing a "Paste" button to constantly pop up.
  - This was due to new security restrictions introduced in some browsers.
  - These new restrictions prevent automatic background syncing of the clipboard.
  - Details about API restrictions can be found here: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API#security_considerations
  - Chromium-based browsers are (so far) not affected.
- Fixed an issue where remote control input would stop working after a file transfer.
- Fixed a bug in remote control that would sometimes cause input events to fire incorrectly.

### Preflight Scripts
Added the ability for an MSP user to disable specific local or global preflight scripts from executing.  A toggle has been added in the script editor when viewing a preflight script to enable or disable it.

![image](https://immybot.blob.core.windows.net/release-media/89cc5048-bc4c-4bf4-b642-7c17e2d808ca)

### Dynamic Integrations

- Added the capability for Dynamic integrations to specify a custom refresh interval for `GetAgents` job via the new `JobSettings` attribute over default period of 1 hour. ex: `[JobSettings(PeriodMinutes = 5)]`
- Fixed an issue where `Get-ProviderInfo` would fail to return `Configuration` form data for dynamic integrations.

### N-Central Integration
- Fixed: This integration has recently started experiencing issues. The requested operation requires an element of type 'Object', but the target element has type 'Array'.

### Registry Search
On the Registry tab, you can now search for keys, value names, and value data.

![image](https://immybot.blob.core.windows.net/release-media/a2eea6ff-800f-4f1a-8a4a-69a1255ccc38)

### Localization and Branding

#### Added the option to use .NET time formatting strings on Immy emails from the Brandings page

![image](https://immybot.blob.core.windows.net/release-media/a12176ee-fcf1-412b-96ec-781608a7b387)

### Integrations

#### Integrations now allow capabilities to be excluded

![image](https://immybot.blob.core.windows.net/release-media/ba545e6b-5aa0-4c49-aa9b-b7259f56c34d)

### Improvements
- Minor UI padding improvements to computer list
- We no longer include the AzureAD module in every metascript's runspace. A script now has to call `Import-Module AzureAD` if it wants to use Azure AD commands. This reduces our memory footprint from 7MB to 4MB per script invocation.
- Improved the load time of the actions tab on the tenant details page
- Improved the load time of "This software has been recently used in X actions/deployments" data.

### Bug Fixes
- Fixed an issue with logs not expanding when toggling the computer details page -\> actions tab row details
- Fixed an issue where saving a software would sometimes clear the selected configuration task
- Fixed an issue with deployments targeting tags not displaying the saved tag correctly
- Fixed an issue where searching in the script editor did not allow for certain special characters
- Correct the color of invalid input field warning icons
- Fixed an issue where agents retrieved from some dynamic integrations were never re-attempting identification on failure or when specified to retry
- Fixed an issue in the software prerequisite builder where you could incorrectly specify "Install Software A if Software A is installed".
- Fixed an issue where onboarding only tasks could not be rerun
- Fixed an issue loading the detected software report page
- Fixed an issue with the new computer software tab not showing
- Fixed an issue where the function script cache was not invalidating when creating new function scripts
- CW Automate agents will now properly be reassigned to the successor computer when a machine is deleted
- Fixed an issue that could lead to app crashes when `Invoke-AtomicCommand` cmdlet attempts to cancel script execution due to requested cancellation.
- Introduced a new PowerShell cmdlet, `Clear-ImmyPrimaryUser`, to allow clearing the Immy primary user ID from a computer.
- Fixed an issue where filter scripts could not use `Get-ImmyAzureAuthHeader`
- Fixed an issue where `Get-ProviderInfo` would fail when targeting static integration types.
- `Get-ProviderInfo` now doesn't throw terminating errors for Integration types that don't exist to simplify usage patterns.
- Improved error handling and logging for the `Send-ImmyEmail` cmdlet
- Added the ability for `Add-UriQueryParameter` to remove existing query arguments that match input names to prevent arrays from being formed via `OverwriteParameters`.
- Fixed an issue where `Stop-ImmySession` would not stop the session correctly
- Forms generated from PowerShell parameters now load in 1/3 the time
- Debugger->Parameters panel updates automatically as changes are made to the script

## 0.64.1

Released 05/10/24

### Improvements

- Increased detected-software uninstall string column size in the database to prevent issues with some software objects not being created
- Fixed a transient bug with notifications occasionally failing to save
- Optimized memory and db performance when running scripts by relying on an improved cache of all available function scripts. The cache is busted after any function scripts are modified
- Computer and Tenant software tab now has a grid view for direct access to software data

### Bug Fixes

- Fixed a bug preventing users from entering new immy instances
- Fixed a bug preventing the maintenance action duration timer from incrementing.

## 0.64.0

Released 05/08/24

### Azure Domain Splitting

Azure customers can now be split into multiple Immy tenants from the Azure Customer Mapper

You can select one or more domains to link to an Immy tenant. Azure users whose UPNs match those domains will then be synced into the domain-linked Immy tenant instead of the default Immy tenant.

Splitting an Azure customer on domain will also automatically set the domain-linked Immy tenant as the "child" of the Azure customer's default Immy tenant, so that deployments targeting the parent can propagate to the domain-linked tenants

### Child Tenants

ImmyBot supports sites/location by allowing you to set a parent/child relation between tenants. You can set the parent tenant as a batch action on the tenant list page or from the edit tab on a tenant's details page.

### User Affinity Table

User Affinity results are now exposed under Reporting -> User Affinity and on the computer's details page.

### Deployment Page Changes

- Deployments for software linked to an integration can no longer specify configuration parameters.
- For software linked to a provider, the deployment configuration parameters are now inherited from the linked integration.
- This helps keep sensitive data like API keys and passwords private by not displaying the information in the deployment configuration parameters and instead storing the information in the integration.

### Deployment Migrations

- GLOBAL software linked to an integration can now automatically migrate data out of relevant deployments and into a new or existing integration.
- All GLOBAL software linked to integrations with the "Production" tag will be migrated.
- Added a new App Preference, "Allow Beta Integrations to Migrate Deployments".

### Improvements

- Any software can now be selected for install/uninstall in "Installation Prerequisites"
- Added parent-tenant-assignment batch action to the Tenants list
- Added parent-tenant column to the Tenants list
- Removed ability to deploy/preview cross-tenant computers on the deployment details page from MSP non-admin users that don't have the "can manage cross tenant deployments" permission
- Added an audit log that records when the application starts up
- Added an excel export button to the computer inventory scripts report table
- Increased the timeout for Expand-ZipFile from 1500 to 3600 seconds
- After updating a user, we now invalidate the cache for that user so the changes are propagated immediately
- Setting the primary user for a computer now shows up in the audit table. This includes the User Affinity Job and PPKGs that have a primary user set on the installer.
- Added Chassis Types to our initial inventory so newly created computers don't have the "Unknown Computer Type" badge
- Decreased PowerShell execution time by optimizing module loading
  UI improvements in line with what's desired by support and most useful to users
  -Alerts added as seen fit by support to better inform the user submitting a ticket.

### Bug Fixes

- Fixed an issue preventing software from being selected in "Installation Prerequisites"
- Fixed an issue with the dashboard table headers not loading correctly
- Fixed an issue where moving a computer that had an immy agent to another tenant would cause the agent to be deleted if you were to delete the original tenant the computer was assigned to
- Fixed a possible null reference exception that could occur when executing scripts over the CW Automate agent
- Fixed an issue preventing integration inventory scripts from running.
- Fixed an issue with CW Control target assignments saving the incorrect value for Control secondary groups
- Fixed spelling of "invetory"
- Fixed an issue with the dedupe inventory script failing with "System.Reflection.TargetInvocationException: Exception has been thrown by the target of an invocation"
- Added a missing comma in the meta robots attribute
- Fixed an issue setting the primary person from the user affinity job
- Fixed ProviderNotFoundException thrown by PSScriptAnalyzer
- User cannot cause an error by submitting a ticket with the technician access box checked even as a non-admin. They can no longer check the box as it is grayed out.

## 0.63.3

Released 04/17/24

### Bug Fixes

- Fixed an issue setting the primary person from the user affinity job

## 0.63.2

Released 04/16/24

### Improvements

- Dynamic Integrations now allow you to implement ISupportsClientGrouping. This is useful when integrating with PSAs as clients can be grouped by what products they pay you for or the types of agreement they have.

### Bug Fixes

- Fixed an issue where rekeyed/soft-deleted agents would throw an error whenever we would update their status to online (due to a unique constraint violation in our database)
- Fixed an issue where instances may not reliably automatically update when `Days to wait after update is available` was set to an interval longer than our typical release schedule.
- Fixed an issue that was causing new devices to fail during registration.
- The primary sidebar now automatically closes and opens when resizing between the desktop and mobile view
- Resumed sessions will now execute immediately if Offline Behavior is set to Apply On Connect and the execution time has already passed. Before, it would re-schedule execution at the same time the next day.

## 0.63.1

Released 04/15/24

### Computer Registry Tab

We have introduced a new tab on the computer details page that lets you remotely navigate the computer's registry and generate configuration tasks from selected values.

![image](https://immybot.blob.core.windows.net/release-media/d2846535-7df6-4f03-ba42-53ace07203c9)

More functionality is expected to get shipped with version 0.64.0, such as the ability to search and create/edit/delete registry entries.

### Improvements

- All users can now see the maintenance item ordering page. Only MSP users have the ability to update the ordering.
- After identification, a computer now runs full inventory immediately with priority.
- Dynamic Integrations can now use dynamic parameters
- You no longer need to emit [opresult]::Ok(); in your Integration's Init method
- You can now create a script directly from the Registry tab. Afterward, you're sent to the New Task page with the script pre-selected.
- Added padding to stage indicators on the session table
- Added regex validation to the software page
- Added the ability to run user scripts from the computer terminal tab.
- Non-terminal errors/warnings coming from a Powershell host starting up will get pushed out as warnings in the console.
- Removed parallel execution of inventory scripts when run through scheduled sessions. This should improve performance when we have the maximum number of sessions running at once from schedules
- Depreciated User Action triggers has been fully removed to prevent confusion.
- When immy restarts, it will now re-enqueue already running sessions first, then pending sessions, and then finally created sessions

### Bug Fixes

- Fixed an issue where the user affinity job was assigning a primary person to a computer, even when the person was from a different tenant than the computer
- Fixed an issue where an action's duration would continue to increment when a session was completed while the action was still running
- Fixed an issue where the spinner icon in the Deployment Detection button was broken
- Fixed an issue where loading a computer detail page would sometimes throw "InvalidOperationException: Sequence contains no elements"
- Fixed an issue where schedules targeting CW Control secondary groups become could become borked when a CW Control company was renamed
- Fixed an edge case issue where a scheduled job that's in "Pending Connectivity" status could run concurrently with a newly-created onboarding task of the agent is reinstalled with "automatic onboarding" enabled.
- Fixed an issue where a software could incorrectly have a prereq on itself
- Fixed a bug where it was possible to encounter a `Pipe is broken` exception while trying to execute scripts on a machine due to a possibility of the agent attempting to use a Powershell host that has faulted/exited recently before we could detect it.
- Fixed a bug that lead to User-context scripts to incorrectly use the System-context Environment variables (such as `TEMP`, `USERPROFILE`)
- Fixed an issue where the "show more" sidebar dropdown would collapse when selecting the notifications link
- Scripts no longer appends unwanted prompt query param values to your new-OAuthConsent -ExtraQueryParams @{ prompt = 'login' }
- Fixed an issue with re-ran actions incorrectly failing due to missing required parameters when they were present in a deployment
- Fixed an issue where msp non-admins could not view cross-tenant deployments
- Fixed an issue where msp non-admins could see access request notifications when it should have been admin only
- Fixed an issue with incorrect breadcrumbs showing on the schedules list page
- "User Action Trigger" dropdown have been removed in the Script Editor

## 0.63.0

Released 04/02/24

### Automatic Agent Update Changes

The preference to enable automatic agent upgrades has been added back.

We no longer rely on MSI installers to automatically update the immy agent. Instead, we copy the ephemeral agent binary into "C:\Program Files (x86)\ImmyBot" whenever we detect that the agent binary is on an older version. Logic has been put in place to protect agent installations from breaking due to failed upgrades. Overall, the automatic updates should be more resilient.

### Notification Table Improvements

- Severity is now the left-most column.
- Added icons to the Severity column.
- The Created column is now hidden by default.
- The column chooser is now visible.
- Table is ordered by updated date by default.

### Improvements

- Added filters to the dynamic integration types page to show "local/global" integration types and to show "developer/alpha/beta/production" release stages.
- New Integration scripts come prepopulated with a working example
- Changed the Resolved column in the notification table to an icon instead of a checkbox.
- Added new notification for deployment migrations.
- Release notes are now available to all users on the System Update page.
- The deployment table can now be exported to excel!
- Added an icon to integration cards on the integration list page to indicate it has a non-production release tag
- Added a release tag badge to the integration details page
- The Test-PendingReboot script used in maintenance sessions is now in global.
- Added release tag selector to the provider link list page
- Added missing datetime tooltips to computer timeline events and the session created date on the session list page
- Added the year to all timestamps in the session logs view
- Agents now get updated in the database when the integration reports a new manufacturer
- Updated error message when navigating to a computer that does not exist to read: "Computer with id xxx was not found".
- Updated error message when navigating to a computer that has been replaced by another computer to read: "Computer with id xxx has been replaced by computer with id xxx"
- Updated error message when navigating to a computer that has been deleted to state: "Computer with id xxx has been deleted."
- The tenant software page UI has been updated to contain new views for deployments, computers, and persons for each found software.

### Bug Fixes

- Fixed an issue in the script editor about `The term 'Invoke-ScriptAnalyzer' is not recognized`
- Fixed an issue where some PSPipeHosts that failed to connect wouldn't provide as much useful data for diagnostics.
- Forms with Password inputs no longer autofill and replace content in other fields
- Integrations with no parameters (like the CW Manage Pod) no longer show “Please correct above errors” error message
- Resolved an issue where some machines were experiencing ephemeral port exhaustion when Ephemeral agent was in a retry loop.
- The Text on the deployments no longer includes the tenant name for cross-tenant deployments. This gave users the false impression that the deployment was tenant specific when it was not.
- If an Immy tenant was linked to an Azure customer but accidentally set as Partner, then unlinking it from the Tenant Details Azure tab and linking it again from the Azure Customer Mapper should now correctly reset the tenant to Customer
- Fixed a bug where tenant consented-at/consented-with details were not updating after consent until the page was refreshed
- Fixed an issue where uploading global software failed
- Fixed an error that occurred when targeting CW Automate groups on a deployment
- Fixed some exceptions that were occurring during inventory
- Fixes css inconsistencies on tenant software list, devextreme, and ImmyLink
- Fixed an issue where bits transfer errors were not being shown in the session log output
- Fixed an issue where the ISO option was now available in the immy agent download modal
- Fixed a bug where some machines fail to return OS install date due to culture issues resulting in a failure to identify.
- Removed the Default Hourly Inventory Task from the UI since we only support running inventory on a schedule once per day
- Fixed an issue where agent integration syncs were unable to bring back agents that were deleted. Most commonly found from CW Control and CW Automate.
- Fixed an issue where deleted agents were still showing up on the Integration -> Agents tab

## 0.62.6

Released 03/22/24

### Bug Fixes

- Fixed a performance issue with intellisense in the script editor that was causing high CPU
- Fixed a common exception that was occurring during scheduled inventory jobs

## 0.62.5

Released 03/19/24

### Bug Fixes

- Fixed an exception that occurred when analyzing a package by url

## 0.62.4

Released 03/12/24

### Bug Fixes

- Fixed a bug where instance-updated emails were not getting sent after updating ImmyBot to the latest version
- Fixed an issue with updating maintenance tasks where it sometimes complained about certain fields being required when it should not have
- Fixed a bug where reboot pref would not update on schedule page

## 0.62.3

Released 03/12/24

### Bug Fixes

- Fixed an error that occurred when uploading a license
- Fixed an error that occurred when creating a deployment for a CW Automate Group or CW Control Secondary Group

## 0.62.2

Released 03/07/24

### Bug Fixes

- Fixed an issue with N-Central where the dynamic version script would not run and prevented installs and updates

## 0.62.1

Released 03/06/24

### Bug Fixes

- Fixed an issue creating/updating tags with limited tenants specified
- Fixed an issue creating/updating software licenses

## 0.62.0

Released 02/29/24

### Bug Fixes

- Fixed an issue where computers that failed to run inventory were incorrectly being classified as workstations/desktops by default. This was causing workstation deployments to incorrectly resolve to the computer.
- Fixed an issue with application errors disappearing when clicking the "Show Details" link
- Chocolatey packages no longer fail detection (Removed -lo from Choco command)
- Fixed issue where even though an "Agent Integration" was specified with GetDynamicVersions implemented, Immy would not run GetDynamicVersions unless the "Use dynamic versions" checkbox was checked
- Fixed a long standing issue where The Immy Agent/Ephemeral would drop & invoke an unsigned powershell script named Invoke-PSPipeHost.ps1. This would cause some AV & EDR to not like us.
- Fixed an issue where some computers were stuck in the onboarding status after completion of an onboarding session
- Fixed an issue where the stale link in preferences was not working
- Fixed a minor issue in the Application Locks page that would show all active locks fetched as 'cancellable' when they may actually be 'terminal' when requested.
- Fixed a bug where changing the slug from tenants list page for an MSP tenant would unset the tenant's MSP status
- Fixed a null reference exception that could occur in the NCentral API client
- Fixed several null reference exceptions that could occur when loading certain pages
- Fixed a null reference exception that could occur when parsing a dynamic version result
- Fixed some null reference exceptions that were occurring sending commands to CW Automate
- Fixed a null reference exception that was occurring for immy agents attempting to execute scripts over the IoT Hub even when the hub has been removed
- The detected computer software table now includes software that have SystemComponent set to 0 in the registry.

### Improvements

- Added a new reporting page called Computer Inventory Scripts that contains the latest results of all inventory scripts ran against computers
- Added more details to exceptions coming from integrations to help diagnose issues
- (Developer improvement) We have integrated new security testing into our code repository to help us detect potential vulnerabilities before they are released.
- The version text in the download agent button on the sidebar has been removed to avoid confusion. The agent version is still displayed in the modal that shows after clicking the button.
- We have exposed the immy.bot API under your-instance.immy.bot/swagger using the Swagger OpenAPI spec. https://swagger.io/specification/. Although officially this is not support, it may be useful if you are attempting to use our api in a 3rd party application.
- Edit Software: Advanced items with overridden (non-default) values are visible without expanding Advanced
- Edit Software: Selecting an Integration hides Version/Dynamic Versions UI to make it more obvious that the expectation is for the Integration to handle this logic.
- If a software is linked to an integration type but the deployment is missing the IntegrationId, but only one integration of that type exists, Immy will fall back to using that single integration.
- Updated ImmyBot references to immy.bot
- Removed deprecated IoT Hub code and dependencies from the latest version of the ImmyBot Agent
- Added a help button explaining global vs local on the Software and Tasks pages
- Removed progress bar from System context scripts that don't specify PercentComplete. Only the most recent ProgressRecords show status
- You can now create your own computer inventory tasks. In another release we will add the ability to represent them in the UI. For now, you can see results in the Computer Inventory Table and query them in filter/meta scripts.
- Added more maintenance options to the computer batch actions. In addition to running full maintenance, you can now run inventory scripts, deployment resolution, and deployment detection.
- On the computer details page toolbar, "Re-Inventory" was renamed to "Deployment Detection"

## 0.61.6

Released 02-21-24

### Improvements

- The session logs for verifying the installed software version now include the detected version
- Inventory is now always performed for full maintenance sessions to ensure inventory data is as up to date as possible before resolving deployments

### Bug Fixes

- Fixed an issue with tags not immediately displaying in the tenant list
- Fixed an issue with some checkbox values not updating after the first click

## 0.61.5

Released 02-15-24

### Bug Fixes

- Fixed an issue where users were unable to toggle Remote Control tenant preferences
- Fixed an issue with non-MSP users unable to load the deployment list
- Fixed an issue with the "Show dismissed recommended deployments" selector not working
- Fixed an issue with manually identified agents always being associated with the MSP tenant instead of the selected tenant

## 0.61.4

Released 02-12-24

### Bug Fixes

- Fixed an issue with the script editor not showing output when loading a script for the first time.

## 0.61.3

Released 02-09-24

### Bug Fixes

- Fixed an issue where target assignments for an azure group were failing with "PostgresException: 42703: column i.deleted_at does not exist"
- Fixed an issue with intellisense not starting when opening a script from a maintenance session

## 0.61.2

Released 02-08-24

### Bug Fixes

- Fixed an issue with not being able to update the value of licenses

## 0.61.1

Released 02-08-24

### Bug Fixes

- Fixed an issue in the ImmyAgent where it was attempting to connect over the IoT Hub even if the agent was never registered with the IoT Hub. This issue manifested in the agent never showing up in pending list.

### Improvements

- The latest version of the ImmyAgent removes references to the IoT Hub since it has been deprecated.
- For agents that experienced the bug with the IoT Hub mentioned above, they will now be able to successfully connect to Immy and show up in the pending list. Some agents will automatically get associated to their existing computers while some may need to be manually identified to the correct tenant.

## 0.61.0

Released 02-05-24

### Deployment Notes

Deployments can now have notes. After saving a deployment, notes can be added to it.

![image](https://immybot.blob.core.windows.net/release-media/88f21756-7837-4b69-81cf-c6019f80711f)

A notes column has been added on the deployment list page. If it is not visible by default, click the ![image](https://immybot.blob.core.windows.net/release-media/1336fb35-f27f-4edd-9a51-d529021fb80d) icon to add it.

![image](https://immybot.blob.core.windows.net/release-media/6f4017b6-10a1-49e9-a9cf-ec66f93c84a5)

### Computer Excel Export

Located under `Reporting -> Computers` or at the URL /reporting/computers.

A new report table has been added for "Computers" that can be used to generate an excel report of computers by clicking the xlsx button.

When the table is filtered, only the results in the filter will be exported.

### Soft Delete Computers & Agents

Deletion of computers and agents are now performed using a soft-delete.

The current exceptions are:

1. Deleting tenants: which will cascade delete all computers for the tenant
2. Deleting integrations: which will cascade delete all agents for the integration

### General Improvements

- The system status page now refreshes automatically every 5 seconds
- Updated the deployment list column visibility defaults to hide the software version and disabled columns and show the notes column
- Most recent `Write-Progress -Activity <value>` now shown on activity detail and current activity overview
- Added system preference to exclude Chocolatey software results from the deployment software search
- Dymamic Integrations can implement required interface for running scripts on target
- Notifications for agents requiring a manual decision are now automatically resolved if there are no more agents that require a manual decision
- Added warning messages to the deployment screen when required scripts are missing
- Improved performance by fixing possible memory leaks that could occur during maintenance sessions
- You can now add a person selector as a dropdown parameter via `New-PersonParameter`
- Newly generated Powershell install scripts for Immy Agents now point to an always-latest installer binary 🥳🎉
- Computer Software report is now generated using excel instead of csv. Also, the export now only exports rows matching the current filter.
- Added up to 3 retry attempts when attempting to set the unique identifier for a device during identification
- Added logic to track computers that have been wiped and replaced by other computers. This isn't shown anywhere in the UI as of right now, but can be added in the future
- Standardized order of Filter Script and Metascript between Cross Tenant and Single Tenant selections when creating deployments
- Improved performance of saving maintenance session related data to the database
- Removed word assignment from deployment page data column.
- Added autocomplete="off" to dynamic form inputs to prevent browsers from injecting unwanted values on deployment and integration pages
- The "New" software button on the software list page now links directly to the software upload page
- ISupportsMaintenanceMode for dynamic integrations now disables maintenance mode at the end of sessions
- Versions details page will automatically show overrides if any are present
- Software details version table now displays when the version has overrides
- Updated the software details detection method table to pull results from the detected computer software table used in reporting. This provides better performance and unifies the results between this feature and the reporting.
- Added warning tooltips to computer overview page for unsupported OS and PowerShell versions
- Added security exclusions confirmation on session support request page
- Added hidden column to the detected computer software table that shows the potentially matched global software id
- Added new report page for computers with the ability to export to excel
- The "Show Identification Logs" button in the computer page / pending tab is now aligned to the top right instead of in the middle of the row, and renders above any potential errors
- Application Locks (used for things such as `Invoke-AtomicCommand`, `Invoke-CommandCached`) are now visible & controlable via the new 'Application Locks' page under 'Show More'.

### Bug Fixes

- When viewing page on mobile, the sidebar is now hidden on navigation change
- Fixed an issue where the filter on the tags list was not working as expected
- Fixed an issue where adhoc maintenance sessions marked as pending connectivity were never being resumed
- Agents Requiring Manual Decision Notification shows resolved text when no more agents require a manual decision
- Fixed duplicate text under the Script Path application preference
- Fixed an issue where checking if we are within business hours was not getting cached, causing additional unnecessary checks
- Fixed an issue where the within business hours session log was not getting emitted
- Fixed a deadlock issue that could occur when cancelling a session
- Updated copyright date to be dynamically set
- Fixed an issue where `New-MediaParameter` values were not being set to the path to the downloaded file
- Fixed styling of access request notifications
- Added missing border to the top of the Azure notification group header
- Corrected inconsistent padding of Azure notification group header
- Fixed issue with missing bottom padding between integrations on integration list page
- Fixed an issue where some filter scripts were not specifying the cloud context
- Integration Audit Entries no longer get hung and show no output when clicking details
- Intellisense no longer stops working when you switch between script tabs
- Status spinner no longer spins forever when in Stopped state
- Fixed an issue where multiple ephemeral agents were possibly spinning up during identification of a device
- Fixed a visual issue where loading a schedule would incorrectly show "Sunday" as the day to run when the value was not "Sunday"
- Fixed an issue where a duplicate streaming button would show up when streaming agent identification logs
- The primary user deployment is now hidden from the deployment list since it is a mandatory deployment
- Updated uninstall help text to reflect existing behavior
- Fixed an issue where brandings that didn't specify a logo or header image would sometimes still show a broken image
- Fixed an issue where we were not checking if the port had been specified for an SMTP and resulted in an obscure exception for the end user if the port value was missing
- Fixed an issue where the person dropdown parameter in onboarding tasks were not limited to persons in the computer's tenant.
- Fixed an issue on the software upload page, where the validation message for the software version was not showing up.
- Fixed an issue on the Tasks list page where filtering to Computer tasks were incorrectly including configuration tasks
- Fixes incorrect PPKG text in download modal
- Fixed an issue where scripts could fail with FileNotFound.
- Fixed issue with detected computer software table where it would exclude registry entries that had duplicate display names, but different versions, or some being linked to global and not others
- Added missing timestamps when hovering over "x days ago" text throughout the application
- New software versions will now default to the Inherited upgrade strategy
- Fixed an issue where some Win7 machines were failing to start Ephemeral agent.

## 0.60.0

Released 01-09-24

### Automatic ImmyBot Version Upgrades

When a new version of ImmyBot is released, you can now specify if you want to automatically update to that release after a specified amount of time. This behavior is configurable in preferences.

![image](https://immybot.blob.core.windows.net/release-media/9f9fafab-054b-4b22-98e4-f0343d1dea4d)

### Release Channel

The release channel determines what versions of ImmyBot are available to you. You can now choose which release channel you want to subscribe to.

The available channels are: Alpha, Beta, and General.

- **Alpha**: This channel contains releases that have passed development but may still be unstable. Only use this channel if it's absolutely necessary for a critical fix or to test brand new features and provide feedback.
- **Beta**: This channel is for early adopters and contains releases that are in the final rounds of testing. Use this channel to test new features and provide feedback.
- **General**: This channel contains releases that have been tested and are ready for general use. This is the recommended channel for stability.

All instances will default to the General channel.

You can change your channel on the System Update Page.

![image](https://immybot.blob.core.windows.net/release-media/3498b1e7-a742-471d-9ef5-13f3a8ed4b2f)

### ImmyBot is on .NET 8

The ImmyBot backend is now running .NET 8. While this doesn't introduce new features to end users, it does provide better performance and newer development features that benefit ImmyBot.

### Cross-Tenant Deployment Change Requests

A new application preference has been introduced that when enabled will require MSP non-admin users to submit change requests
when creating or updating cross-tenant deployments.

![image](https://immybot.blob.core.windows.net/release-media/73850538-f178-4b45-99c3-a47ee1ea748a)

On a per user basis, you can additionally opt-out of requiring change requests by assigning the user the following capability from the edit user page:

![image](https://immybot.blob.core.windows.net/release-media/0bd8b8e5-89f6-4c5e-96ed-e024d345e209)

Change requests are submitted from the deployment details page in the same area you would normally create and update a deployment.

![image](https://immybot.blob.core.windows.net/release-media/9ba72b1a-0069-4bfa-a306-2399792aa072)

Once submitted, the change request can be reviewed in a read-only format. MSP non-admins will have the option to edit the change request, while MSP admins will have the ability to approve or deny the change request.

#### MSP non-admins see

![image](https://immybot.blob.core.windows.net/release-media/c04cdad1-9391-43c0-9646-2fd8ef07f01d)

#### MSP admins see

![image](https://immybot.blob.core.windows.net/release-media/2a7bcdd1-3f2a-4807-a806-4126729f49bc)

All open change requests can be seen from the deployment list page.

![image](https://immybot.blob.core.windows.net/release-media/e666d95b-b85e-479a-8253-3e3f027e6c3c)

### Improvements

- Added hidden column to the detected computer software table that shows the potentially matched global software id
- The tenant software search tab on the tenant details page now renders as a filterable table with the ability to export
- Automatic ImmyAgent updates are now enabled by default
- When creating a new deployment, selecting Onboarding Only will now default to "Value from: deployment".
- Changed notifications list page to hide resolved notifications by default
- Deployments page will now default to grouping by tenant
- IntelliSense can be restarted without refreshing the browser

### Bug Fixes

- Fixed issue with some property text in the audit table colliding with other property text
- Fixed issue where unmatched software in the detected computer software table were not filterable
- Fixed an issue where detection could fail with "Exception of type 'CwAutomateProvider.CwAutomateHttpException' was thrown." when checking for windows patching. It will now skip windows patching, provide a more useful message, and continue the session.
- Fixed an issue where creating/updating deployments for integration group targets was not saving the selected tenant
- Fixed an issue where starting ephemeral agent would cause an error on some older machines.
- Fixed an issue where the getting started wizard was popping up even when a computer had already been added
- Fixed an issue where the software repair custom script was not showing up under the Repair Strategy label on the software details page
- Persistent Agent main connection will now more aggressively obey System Web proxy when attempting to connect.
- Fixed an issue where Immy Agent EXE downloads would produce a corrupted binary.
- Fixed an issue where upgrade code and product code were failing to match to global software during detection
- Fixed issue where Azure Tenant Problem notifications were being created when there were not actually any problems

