::: danger _ImmyBot will no longer support Windows 7, Server 2008 (or Server 2012 w/o [ESUs](https://learn.microsoft.com/en-us/windows-server/get-started/extended-security-updates-overview)) machines after May 14th, 2024_
.NET 7 support is ending May 14th, and as a result we will be transitioning the Agent to .NET 8 at that time period. We will not be offering support for these machines after May 14th.

Please see the [FAQ section for more details](https://docs.immy.bot/FAQ.html#what-windows-versions-does-immyagent-support)
:::

# Releases

## 0.68.0

Released 06/05/25

### Improvements
- Improved exception logging for scripts that fail preflight
- Updated the "references in deployments" section on the software, software version, and task pages to display more information
- Added back the ability to permanently delete computers. On the computer list page's deleted tab, you can now permanently delete computers through batch actions.
- Improved the styling of the software prerequisite builder

### Bug Fixes
- Fixed an issue where software deployments with a desired state of "not present" would prompt for a license. "Not present" deployments do not require a license to be specified.
- Fixed an issue with sending test emails on the SMTP form always requiring authentication
- Fixed an issue where maintenance action activities would fail to save if the activity name was over 150 characters
- Fixed an issue where the Immy agent integration was able to be deleted, causing unexpected behavior since this is not allowed
- Fixed an issue where the software prerequisite selector was too narrow
- Fixed an issue where the application could get stuck in a login loop if it was rendered inside of an iframe
- Fixed an issue with client name column filtering on the integration clients tab
- Fixed an issue with the text in the alert using the wrong color in light mode when on the integration clients tab
- Fixed an issue with an undefined exception being thrown when filtering on the Types column from the integration clients tab
- Fixed an issue where dynamic integrations supporting listing agents would overwrite the integration's preference for whether online status support was enabled. Online status support is now tied directly to running scripts which can also be disabled on the integrations page in the capabilities section.
- Fixed an issue where license files would not be found due to inconsistent download paths
- Fixed an issue where some scripts in onboarding sessions would incorrectly fail due to missing permissions if the session was triggered by a non-msp user

## 0.67.9

Released 05/28/25

### Authentication Improvements

- Enabled sliding expiration for authentication cookies to automatically renew the session while the user remains active which provides a better user experience.

### Agent Log Improvements

- Previously, the agent would put logs all over the place in subdirectories inside `/ProgramData/ImmyBot`. We've consolidated the agent's logs to all go into just a few different files in `/ProgramData/ImmyBot/Logs`.

- A fix has also been applied that prevents clobbering of ephemeral logs by multiple concurrent ephemeral agents.

### General Improvements

- The Azure group dropdown on deployments no longer returns all Azure groups by default. It now supports searching and only returns groups found within the search. This has a potentially significant performance impact for customers who have hundreds or thousands of Azure groups.
- Maintenance sessions now accurately report "time running" on the list page by accumulating the duration during which the session is actively running.  For example, if a computer goes offline during a maintenance session and comes back online 3 days later, the "time running" value will not include the 3 days the computer was offline.
- On the software page, when using a custom detection script, we now show the detection string inputs since this data is available inside of a custom detection script.
- Improved the performance of loading logs for a maintenance session which reduces the overall load time for the page.
- The computer list's pending tab now allows searching by OS name.
- On the software page, a "Depends On" column has been added to the versions grid so you can see dependencies without having to edit each version.
- We now also show canceled for any maintenance action or phase that was actively running when the session was cancelled. This will help prevent confusion about whether an action is still running when the session has been cancelled.
- The "Triggered By" filter on the sessions page now allows selecting of the "System Automatic Onboarding" or "Schedule" options when attempting to filter maintenance sessions which previously limited users' ability to filter sessions by their trigger source.

### Bug Fixes

- Fixed an issue where the getting started checklist and subscription details API routes were returning a 403 for non-MSP users. These routes are no longer called for non-MSP users.
- Fixed a caching issue with user impersonation where it would use stale permissions on the frontend before the cache expired a minute later.
- Fixed a caching issue with application preferences where toggling a preference related to user permissions did not take effect immediately.
- Fixed an issue where the computer overview page's "Last Boot Time" was displaying "in X hours" instead of "x hours ago".
- Fixed an issue with tenant deletion that could result in the application restarting due to an unhandled exception.
- Fixed a permission issue with script execution through the script editor.
- Fixed an issue on the landing page where the logged in user's name could show up as null.
- Fixed an issue that allowed for deletion of MSP tenants. As a safety-check, a tenant must manually first be marked as non-MSP in order to be deleted.
- Fixed an issue with the notification table not showing all notifications
- Fixed an issue on the software version page where the "Depends On" dropdown would not show all versions when creating a new version.
- Fixed an issue affecting MSP users where exporting software data to Excel from a specific tenant's view would contain data for all tenants instead of just the selected tenant.
- Fixed an issue where the navbar dropdown on mobile would incorrectly stay open when toggling the sidebar or clicking outside the dropdown.
- Fixed an issue in the technician pod where technicians could not change the selected computer
- Fixed an issue where deleted computers were still showing up in the "Computers Excluded From Maintenance" tenant preference
- Fixed an issue where the repair button of the computer software did nothing when clicked.
- Fixed an issue on the billing page where it was showing "undefined" for concurrent sessions when a user had the concurrent sessions add-on.
- Fixed an issue where computer timeline events would never load due to a poor performing sql query
- Fixed an issue where tenant admins could not create new maintenance tasks

## 0 67.8

Released 05/08/25

### Zip File Script Parameter Changes

Fixed an issue where the zip file parameter value never actually pointed to the zip file.

For example (using $Drivers as the uploaded file):

#### Original behavior

- Drivers pointed to: $($env:SystemRoot)\Temp\ImmyBot\bd09dc93-5ece-74dc-9c72-29ed855e643a\Drivers.zip (this never existed)
- DriversFolder pointed to: $($env:SystemRoot)\Temp\ImmyBot\bd09dc93-5ece-74dc-9c72-29ed855e643a

#### New behavior

- Drivers will point to: $($env:SystemRoot)\Temp\ImmyBot\bd09dc93-5ece-74dc-9c72-29ed855e643a.zip
- DriversFolder still points to: $($env:SystemRoot)\Temp\ImmyBot\bd09dc93-5ece-74dc-9c72-29ed855e643a

### Other Improvements

- Added the `TargetGroupFilter` parameter to the `Get-ImmyComputer` command when used in a filter script.
- An audit log is now added after a schedule executes. In the event of a failure to execute a schedule, a notification will be created with exception details.
- Improved the load time of the maintenance session details page

### Bug Fixes

- Fixed user access check on local script execution route
- Fixed some broken maintenance item links in the actions tab of tenants and computers
- Fixed an issue that was preventing the deployment list from loading
- Fixed an issue where the Dashboard page filter blanks option was not always filtering out rows correctly
- Fixed an issue where the server could restart due to an uncaught exception while deleting tenants

## 0.67.7

Released 04/28/25

### Improvements

- Improved telemetry to help identify bugs and performance issues within the application


### Bug Fixes

- Fixed an issue with some loading spinners repeatedly showing on auto-refreshes
- Fixed an issue with the default page size on the notifications list page
- Fixed a typo in the tooltip text when hovering over MSP tenants in the tenants list.
- Fixed an error being thrown when attempting to retry agent identification
- Fixed an issue with the azure customer mapper where the sort would revert whenever a customer is selected
- Fixed an issue with setting the timezone in tenant preferences where it would not allow you to select a value if one wasn't already selected
- Fixed an issue with the software configuration task selector not showing up on the software details page
- Fixed an issue with duplicate error messages from scripts showing up on the maintenance session details page

## 0.67.6

## Features and Improvements
- Added parent tenant information to computer details overview page (only shown for child tenants)
- Added creating, updating, and deleting users to the audit log
- Starting remote control sessions are now recorded in the audit table
- Added object name to audit entries for software, tasks, scripts and several other object types
- Added People option to the user filter selection
- Made Agent and Computer tables more responsive by improving load times

## Bug Fixes
- Fixed an issue where required KeyValuePair parameters were not properly saved or validated
- Fixed token refresh logic to properly handle expired refresh tokens
- Fixed "More Actions" button visibility on software page
- Fixed an issue with the feature usage email containing extra text and malformed URI
- Fixed an issue where authenticating to Immybot from service principals was failing with 'No principal id was provided with the request'

## 0.67.5

Released 3/27/25

### Bug Fixes

- Fixed an issue introduced in 0.67.4 where editor services failed to load
- Reverted a fix introduced in 0.67.4 where expired OAuth tokens were supposed to be removed, but the problem was made worse by incorrectly removing valid tokens when we failed to perform a refresh

## 0.67.4

Released 3/27/25

### 🐛 Bug Fixes

- Fixed an issue that prevented the swagger api endpoint from loading
- Fixed an issue with running `Get-ProviderInfo` from a script in the script editor where it could return all providers instead of the correct one.
- Fixed an issue with missing global software scripts on the software details page.
- Fixed an issue where navigating to the /login page would fail to redirect you to the correct page if you were already authenticated.
- Fixed an issue where MSP non-admins could duplicate a cross-tenant deployment even though they are not allowed to create or edit them
- Fixed a long-standing issue where the scheduled agent sync jobs would stop running in the event a disconnect occurred to the Redis cache we use for job scheduling
- Fixed an issue with recently uploaded global software files failing to download

### 🔧 Improvements

- Exposed a new script variable called `$CanAccessParentTenant` that indicates whether you get use `Get-Immycomputer -UseParentTenant` to retrieve computers from the parent tenant.
- A computer timeline event has been added to indicate when an immy agent self updates to a newer version.
- Computer timeline events now utilize an infinite scroll with better load time and are now limited to the last 30 days.
- The new computers tab now includes offline computers by default to represent an accurate count of all computers in the onboarding state.

## 0.67.3

Released 3/12/25

### Bug Fixes

- Fixed an issue with the CW Automate provider and CW Control provider not handling script execution correctly,
- Fixed an issue with key/value pair parameters where clearing all values would still use the default values instead of respecting the user's intention to have no values.
- Fixed an issue where "more actions" dropdowns will now properly be hidden when no options are available,
- Fixed an issue that prevented the swagger api endpoint from loading.
- Fixed an issue with max running sessions exceeding the limit in the UI.
- Fixed an issue with missing global software scripts on the software details page.

### Improvements

- Modified `Get-ProviderInfo` to return the provider linked to the script. Fixes an issue where the wrong provider could have been chosen if multiple providers of the same type existed.
- Added `-IgnoreLinkedProvider` switch to `Get-ProviderInfo` to allow retrieving of all providers of the specified type.

## 0.67.2

Released 2/27/25

### Bug Fixes

- Fixed an issue where CW Automate and CW Control would stop executing scripts. A common error for this would appear as "CancellationTokenSource has been disposed".

## 0.67.1

Released 2/26/25

### Improvements
- Added file upload capability to the support sidebar, allowing users to attach files directly to support tickets
- Optimized database performance for agent connection events
- Enhanced security by masking password fields in the `Get-ProviderInfo` cmdlet output

### Bug Fixes
- Fixed ConnectWise Automate maintenance mode state preservation after session completion. If the agent was already in maintenance mode before the session, then it will remain in maintenance mode after.
- On schedules, fixed "Start execution after active hours" flag incorrectly persisting when switching to immediate execution mode
- Fixed issues with cloud session links not navigating to the cloud session details page
- Fixed issues with previous state persisting when reopening the agent installer modal
- Fixed an uncommon database issue where some agent installers were breaking some foreign-key constraints
- Fixed an issue preventing function syntax from displaying correctly in script editor sidebar


## 0.67.0

Released 2/17/25

### Bug Fixes
- Fixed an issue where the Immy agent could disconnect during auto-updates due to locked files
- Fixed issues where some scheduled cloud sessions were failing
- Fixed an issue preventing some Immy agents from connecting
- Fixed an issue where impersonating a user would still show the real user's email address in the header
- Fixed date formatting issues
- Fixed issues with task parameter handling in the script editor
- Fixed an issue with change requests where the page would fail to load and new parameters were not included
- Fixed an issue where "Start execution after active hours" setting would persist when switching a schedule to immediate execution mode.
- Fixed a bug where configuration task parameters were not visible when creating deployments for software or tasks with integrations.
- Fixed an issue with the Software/Task dropdown on the Dashboard page where the dropdown would get stuck showing a small subset of options.

### Performance Improvements
- Improved efficiency of tenant deletions with background processing and progress notifications
- Enhanced script recovery and agent connection stability on intermittent network issues
- Optimized database operations around maintenance sessions

### Agent Improvements
- Fixed an issue where network problems could cause persistent agents to maintain dead connections
- Improved connection handling and recovery for ephemeral agents
- Enhanced logging and error handling for agent operations

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

## 0.59.3

Released 12-20-23

### Bug Fixes

- Fixed a caching issue where adhoc deploying to multiple computers and then re-running a session would sometimes trigger the session for a different computer
- Fixed an issue where msp admins would sometimes show up as MSP Tenants
- Fixed an issue with the detected computer software table where it was not updating information after re-running inventory
- Fixed an issue where configuration task actions would sometimes not showing the detect stage progress line

## 0.59.2

Released 12-19-23

### Bug Fixes

- Fixed issue with showing media on the media list page
- Fixed issue on the tenant details page where the batch actions button on the computer table was not working
- Fixed issue with calls to Get-ImmyComputer from metascripts where it was incorrectly excluding computers that were excluded from maintenance. This check is only supposed to happen when resolving computers for a deployment or a schedule.

## 0.59.1

Released 12-13-23

### Bug Fixes

- Fixed issue where Computers and Tenants were still being included in the preview for the Edit Deployment screen even though the tenant had the "Exclude from Cross Tenant Schedules and Deployments" preference set
- Fixed a caching issue where scheduled maintenance sessions were not always picking the correct deployment

## 0.59.0

Released 12-12-23

### Detected Computer Software Export

We added a page to view all computer detected software and a button to export it to a csv file.

You can access this page from `/reporting/detected-computer-software`. Values from this table are populated from inventory.

<img src="https://immybot.blob.core.windows.net/media-qa/f30cb597-3a97-49d9-b26a-7018b1dd5605" max-width="100%" />

### OAuth Parameters

Added the ability to create and select auto-refreshing OAuth tokens as script parameters

<img src="https://immybot.blob.core.windows.net/media-qa/85259b64-917e-4676-9f44-8cde043e6fa6" max-width="100%" />

---

<img src="https://immybot.blob.core.windows.net/media-qa/ec13e684-8bd3-479c-9c94-69ee21103dfc" max-width="100%" />

---

<img src="https://immybot.blob.core.windows.net/media-qa/94275c46-2c78-4739-a0fb-43260f210f88" max-width="100%" />

---

Added a button to the Azure Partner Settings page to pre-consent customers to the default or custom app registration via the Partner Center API

This removes the need to provide consent for each customer manually using an admin account from the customer

<img src="https://immybot.blob.core.windows.net/media-qa/8a3c312d-b8d4-4b94-8f1a-5c2c1cb13d65" max-width="100%" />

---

Added an OAuth Token Acquisition mechanism to allow Partner admins to give ImmyBot consent to use the Partner Center API

<img src="https://immybot.blob.core.windows.net/media-qa/1d78a586-637b-49b5-9ec4-5a349a8c77b4" max-width="100%" />

---

### Automatic ImmyBot Agent Updates (Alpha)

When a computer attempts to run a script and we establish an ephemeral agent connection, we now also upgrade the ImmyBot Agent if it is outdated. This is currently in alpha and
can be opted into from the Application Preferences page.

### Improvements

- You can use the new ScriptTimeout attribute to override the default execution time of 60 seconds in integration scripts (Supports up to 300 seconds)
- Integrations supporting ISupportsHttpRequest now display the HttpRequest Uri
- Added integration release stage badges to indicate whether an integration is in the `Alpha`, `Beta`, or `Production` stage.
- Uninstalling software no longer enforces required parameters specified by the deployment.
- \[Alpha Opt-In\] `Write-Progress -Activity "Activity 1" -Status "Migrating"` Calling Write-Progress with both Activity and Status parameters creates a new row on the action in the session. This helps visualize the progress of long running tasks.
- Added BitLocker Status to the logical disk tab on the computer details page
- Added TPM Version to the overview on the computer details page
- Added disabled deploy button next to configuration tasks with a tooltip explaining that they cannot be deployed directly. The missing deploy button was causing confusion.
- Added a docs link for agent identification failures under the computer page -> pending tab.
- Updated help text of desired software state - Latest Version, to read "Will install/update the software to the latest version"
- Added a link to the ordering page from the deployment list page
- Updated the execution order help text to read "All tasks that are limited to onboarding computers will
  be executed at the beginning of the session in the onboarding stage, following the
  sequence in which they are listed. Once the onboarding process is complete, we will proceed to
  execute all other actions, also in the order they are listed."
- Added 'Azure Tenant Problems Detected' notifications to indicate errors and other detected problems related to Azure tenants
- Made notification creation more performant
- Added User preference area and moved the theme toggle to it.
- Improved some UI color settings
- Creating, updating, and deleting schedules show up in the audit table.
- Maintenance tasks can now specify an integration to link
- Fixed an issue on startup that was causing some startup jobs to not run
- The logic that ensures we have online agents before running a script on a computer no longer runs if we have an active ephemeral agent connection
- Added `AssignmentScope` as a script parameter. Possible values are `CrossTenant`, `SingleTenant`, and `Individual`.
- When ImmyBot restarts, we no longer cancel sessions due to them being considered "outdated". This was an old piece of code that was there to prevent accidental reboots during business hours. This check is no longer needed since we check for active hours and business hours during the maintenance session when deciding if the computer needs to reboot.
- **Important** - ImmyBot agents that are installed with automatic onboarding will now **ALWAYS** automatically onboard. Before, we would optionally not perform onboarding if the agent resolved to an existing computer that had previously run at least one maintenance session.
- Removed converted parameter values from parameter validation responses since it could possibility contain sensitive data and the value was not being used on the frontend
- `Invoke-CommandCached` and `Invoke-AtomicCommand` cmdlets are now available for use inside Filter Scripts.
- Action errors regarding missing/failed software prerequisites now show the software's name instead of the type and identifier.
- Changes to software prerequisites now show up in the audit table
- Added a link to the ImmyBot community forum to the navbar
- Minimizing the script editor persists any ephemeral tabs you had open.
- Extended the ephemeral agent disconnected text to say "This computer does not have an ephemeral agent. An ephemeral agent will connect when a script is run against this computer."
- Several new Azure-related notifications have been added
- Fixed an issue where multiple sidebars could be showing and overlapping at the same time
- Parameter descriptions are now always visible. Before, they were only visible if you were overriding the default value.
- Improved styling of default value key/value pair parameters on the deployment form
- Improved serial execution of maintenance tasks by adding a more visible locking mechanism. You can now see who the currently executing computer / session is.
- Added a check when creating or updating a deployment that warns you when a duplicate deployment is detected. You have the option to replace the existing deployment or fix the newer one such that it is no longer a duplicate.
- Schedules and Adhoc Deployments now apply batching to create the maintenance sessions. We've seen about a 6x improvement in speed in creation.
- Debounced script editor changes to prevent Intellisense crashes
- You can now save scripts that have syntax errors by acknowledging the confirmation modal. Useful for saving unfinished scripts or scripts that may not actually have syntax errors when run on an endpoint
- Improved ImmyAgent setup when deploying new instances that should result in fewer errors and faster instance setup
- Improved performance of session cancellation by simplifying the database queries
- Adding an invisible Formatter, so that information can be easily hidden. Using this to hide ParameterSetBinding messages.
- In the Debugger section Parameters and Variables, the subsections are now open by default
- In the Script Details section for the Type dropdown, the Software Auto Update element has been removed
- Added integration capability `ISupportsAgentDownload`. Allowing integrations to provide their own "Download Installer" script.
- Added integration capability `ISupportsAuthenticatedDownload`. Allowing integrations to provide authentication information without leaking sensitive information.
- N-Central integration has finally graduated from Beta status, and can now be found in the Integrations page 🎉

### Bug Fixes

- Fixed an issue where some ImmyBot tenants linked to Azure customers were getting reset to Partner type within ImmyBot
  - **For Customer tenants that are erroneously set to Partner in ImmyBot, you can fix these by finding the customer on the Azure Settings page, and unlinking/relinking it**
- Fixed an issue where full maintenance schedule sessions did not have the "Full Maintenance" tag in the sessions table
  Fixed an issue with N-Central integration failing to re-authenticate after ~24hrs of running.
- Fixed an issue where starting ImmyBot remote control for an outdated agent was kicking off a session that contained actions other than the agent update.
- Fixed an issue with license descriptions now showing on the deployment page
- Fixed potential null reference exception on Deployment page when ValidateScript is used
- Fixed an issue where wiped computers were not being treated as wiped if an existing computer was found. A wiped computer is one where the hostname and OS install date are different that the computer we already see inside of ImmyBot.
- Fixed a divide by zero error that could occur while computing a software installer's download speed.
- Set the audit user text to show the user's email address if the user does not have a first or last name specified
- Fixed an issue where some ImmyAgent & Ephemeral Agent binaries included some unsigned assemblies, falsely triggering some security tooling like ThreatLocker.
- Fixed an issue where Immy Starter plans were able to select the schedules nav item
- Fixed an issue where resolving agent identification issues resulted in "404 - entity could not be found."
- Fixed an issue where resolving agent identification issues with "Let Immy Try again" was not doing anything.
- Fixed an issue where some ImmyBot agents were failing to connect to ImmyBot when it was re-installed
- Fixed an issue where only the ImmyBot team could view global dynamic integration types
- Fixed an issue with scheduling the user computer affinity job once a day
- Removed some old migration code that was delaying startup and potentially causing issues
- Fixed an issue where some Immy Agent upgrades would leave installs dead in the water due to a config parsing issue.
- Fixed an issue where sometimes analyzing an installer package would cause an IOException.
- Fixed an issue where a software prerequisite would not be installed if an "update if found" deployment for the prerequisite resulted in "no action" because it was not found on the endpoint. Now, an install action for the prerequisite will be created anyway.
- Fixed an issue where selecting text on expanded script-runs would collapse the script
- Fixed an issue with fetching CW Manage agreement products where the deployment would show "Server error. Please contact your Administrator." Occurred when CW Manage attempted to return several hundred agreement products.
- Fixed an issue running `invoke-immycommand` from a cloud script against a computer that would throw an error during the preflight check, "Value cannot be null. (Parameter 'psComputers')".
- Fixed issue removing previous pages breadcrumbs on the session list page
- Fixed an issue on the onboarding form where mandatory parameters would not show the input by default if the parameter was dynamically discovered
- Fixed several minor issues found with the agent installer download modal and the getting started wizard modal
- Fixed a caching issue with inserting session logs into the database
- Fixed a caching issue with detected software from a machine
- Fixed an issue where database queries to get a list of sorted deployments during a maintenance session were not being cached
- Fixed an issue where the Package Analyzer would throw a `The process cannot access the file` error
- Fixed issue with our script analyzer rule for detecting missing $using: in Invoke-ImmyCommand
- Fixed the N-Central issue that keeps appearing "InvalidLoginCredentialsException: New tab request failed!"
- ParameterSetBinding should not emit output.

## 0.58.3

Released 11-1-23

### Notifications

#### Notification Sidebar

We have updated how our notification system works.

The bell icon in the navbar will provide a number of the unacknowledged notifications you have.

![image](https://immybot.blob.core.windows.net/release-media/bfedef8b-0e81-4e63-b114-5e1908af6b12)

The sidebar will show when clicking this icon.

![image](https://immybot.blob.core.windows.net/release-media/8e8bd0e6-5cfd-485f-8e2c-fb9b2b4438ec)

#### Notification History

You can access all notifications from the primary sidebar under "Show More" -> "Notifications". By default, it will only show you unacknowledged notifications. You can click the "reset" link or change the filter on the "Acknowledgement" column to view acknowledged notifications.

![image](https://immybot.blob.core.windows.net/release-media/3b1dd160-7e04-4da1-8bf0-09c5c021b463)

#### Silencing notifications

From the notification sidebar, you can silence notifications by the notification type or for the specific object the notification was for.

![image](https://immybot.blob.core.windows.net/release-media/74f3d26c-0c5d-4f27-a954-17c2b0c3a046)

You can then view all of your silenced notifications from the notification history page.

![image](https://immybot.blob.core.windows.net/release-media/9d04a155-a82e-4d81-9732-e3e0fd79001f)

#### Notification Types

We have plenty of notification types in the pipeline. Here are the notification types currently implemented.

1. Integration Unhealthy - a notification to let MSP users know that an integration has become unhealthy
2. Access Requested - a notification to let MSP users know that someone is requesting access to their instance of ImmyBot
3. Large Script Output - a notification to let MSP users know that a specific script has outputted a large amount of data. When scripts like this run during maintenance for hundreds of devices, it can easily cause high CPU and memory which leads to sluggish performance and potential crashes.
4. Unacknowledged Recommended Deployments - a notification to let MSP users know that there are new recommended deployments that need to be allowed or denied.

Some notification types that will be coming soon include, but are not limited to:

1. Agents Requires Manual Decision - a notification that lets MSP users know there are agents pending identification that could not be automatically resolved to a computer and require manual actions.
2. ImmyBot Updated - a notification that lets MSP users know that ImmyBot has been updated to a newer version
3. Cross-Tenant Deployment Requires Approval - a notification that lets MSP admin users know that a cross-tenant deployment was created or modified and needs approval from an MSP Admin. (Feature coming soon)
4. Azure related notifications

### Improvements

- Updated variable alert on the license details page to be the same alert shown on the software details page -> license help alert
- Added random jitter to the time we schedule some of our recurring jobs so that we reduce high database load due to all instances kicking off the jobs at the same time.
- For maintenance sessions that target a specific item, a session log has been added at the beginning that provides the name of the maintenance item
- Added auditing for static software versions and static maintenance task parameters
- Schedules that target a specific maintenance item will now always create a maintenance session for every computer resolved in the schedule's target group. If the computer does not have a deployment for the specified maintenance item, then the session will complete instantly with no actions added.
- Upgraded PowerShell Editor Services from 3.6 to 3.13
- Batch actions sidebar now slides out underneath the navbar to not block actions
- Batch actions sidebar background color was updated to provide more contrast
- You can now restart Intellisense from the status bar.
  - ![image](https://immybot.blob.core.windows.net/release-media/f10daf67-7113-402b-8686-be1e2c0692c0)
- Intellisense will restart automatically when changing script type.
- Removed dependency on Ace.js that shaved off 366KB from the project
- Made a slight performance change to schedule logic that should result in faster start times for schedules with many computers
- Added a "Job Args" property to the session details page info panel that expands to show more data associated with the session.
- ImmyBot no longer tries to run scripts against non-Pro N-Central agents
- Added custom PSScriptAnalyzerRule with Code Action to detect and fix missing $using: scope modifier in Invoke-ImmyCommand
  - ![image](https://immybot.blob.core.windows.net/release-media/0b53ca8b-e399-4b04-90e5-4f59d424df99)

### Bug Fixes

- Fixed an issue with azure tenant data sync job not getting scheduled correctly
- Fixed an issue with cloud deployments targeting tags where the session would error in a `NotImplementedException`
- Fixed an issue where agent updates only maintenance sessions were not viewable by a non-msp admin even if the computer was under their tenant
- Improve deadlock handling when integrations need to be created, removed, or re-initialized
- Fixed an issue where users were unable to upload license files
- Fixed an issue on instance startup where integrations were possibly initializing twice unnecessarily
- Added a default timeout of 5 minutes to every API request made to Automate. We were not specifying a timeout before so the request could have been long-lived
- Improved the initialization of the CW Automate integration by reducing the number of times we instantiate an API client to communicate with the Automate Server
- Refactored the logic that handles enqueuing scripts to execute over CW Automate to prevent potential locking and add additional debug logging
- Fixed an issue where the system status page was not showing metrics under CW Automate and CW Control when it should have
- Fixed issue where Intellisense would be unrecoverable after selecting script type Software Auto Update
- Fixed an issue where provider sync jobs could continually enqueue when only one should ever be enqueued at a time.
- Fixed an issue where CWControl provider would fail to initialize due to Azure changing the machine hostname, causing it to exceed maximum expected length
  - ![image](https://immybot.blob.core.windows.net/release-media/69441580-fc89-4acf-86a3-4edbd1ac662d)
- Fixed an issue where some actions would result in an error of "Invalid maintenance action type."
- Fixed a potential issue with all providers remaining unhealthy upon server starting up
- Improved the load time of the application on startup
- Fixed an issue where some more known bad device ids were being used to uniquely identify a computer, e.g. ffffffff-ffff-ffff-ffff-ffffffffffff
- Fixed an issue where ImmyAgent provider would fail to initialize due to Azure changing the machine hostname, causing it to exceed maximum expected length.
  - ![image](https://immybot.blob.core.windows.net/release-media/781b7878-5628-4ea0-aaab-14941f1293af)

## 0.58.2

Released 10-11-23

### Audit Page

An audit page was added that MSP admins can use to view changes made to objects such as Target Assignments and Scripts. This also includes changes made to global objects. This is part one of an effort to provide more transparency around changes made to global data. This page is accessible under Show More -> Audit, or "your-instance.immy.bot/settings/audit".

### Improvements

- `Get-ImmyComputer -IncludeTags` from a filter script or a meta script now include the tags for the computer's tenant and primary user
- Improved our resiliency for Redis reconnection for background jobs
- Updated the Hangfire Service watcher to fix common issues that may occur when it restarts
- Improved some internal logging that will help diagnose application crashes
- Added some additional logging to detect performance issues related to CW Control connection events
- Added support for putting an agent in maintenance mode at the beginning of a session
- Sessions with reboot preference set to force now only force a reboot at the beginning and end of the session. Reboot checks after each action will only reboot if necessary.
- Added the ability to toggle online status support for agents of an integration since some dynamic integrations don't support online status
- The "Install Agent" button on the computer details page now kicks off a maintenance session instead of installing behind the scenes
- Updated the version of our dependency on the Azure.Storage.Blobs package, which provides better performance.

### Bug Fixes

- Fixed some theme styling issues on some of the tables
- Fixed an error in the web inspector console that was reporting `BackendVersion` was null
- Fixed an issue where array parameters that used `[ValidateSet]` would not render the dropdown of valid values
- Fixed an incorrect variable name in the license alert on the software details form. `$LicenseFile` should have been `$LicenseFilePath`
- Fixed an issue where the session resume button would stay disabled if you clicked it but didn't confirm the action.
- Fixed an issue where deployment parameters were not showing in the correct positions
  Fixed an issue with the Package Analyzer failing to download some software hosted behind CloudFront CDN.
- Fixed an issue where `Invoke-CommandCached` would return objects slightly differently than expected, causing some unexpected behavior for scripts.
- Fixed an issue where the "Show value view" on a parameter form would not actually show the parameter values
- Fixed an issue with agent inventory identification where old agents tied to a computer were not getting replaced by the a newer agent
- Fixed an issue where a phase could be considered successful if the agent went offline at just the right time
- Fixed an issue where an agent going offline would fail a maintenance task action during the Download Installer phase
- Fixed an issue where refreshing the computer's connected status would throw an error regarding some agents not supporting the ability to refresh an agent's online status
- Fixed a potential null reference exception that was thrown when reloading integration types
- Fixed an issue where dynamic integration agents were not syncing updated data, such as changed name, serial number, or osname
- Fixed an issue with pending connectivity kicking off incorrectly for disabled/unhealthy links
- Fixed an issue where the ImmyAgent provider would fail to initialize due to Azure changing the machine hostname, causing it to exceed maximum expected length.

## 0.58.1

Released 09-28-23

### Improvements

- Made errors that occur while interacting with the graph api show on the frontend to help guide the user on how to resolve common Azure configuration problems
- Added the ability to specify a docs url for dynamic integrations that will be shown on the integration edit details page
- Added the installer download url to the session log when attempting a BITS or basic download
- ImmyBot now defaults to dark mode unless the browser preference is set to light
- Moved immy support access preference to the top of the preferences page
- Made Add-UriQueryParameter no longer require -Parameter when Uri is passed in via Pipeline
- Added the ability to trigger an agent sync from an integration on the clients tab and agents tab
- Added support for incoming http request inspection to integration audit logging
- Added support for non-mandatory integration method parameters
- Dynamic Integrations that support agents can now specify whether the agent supports an online/offline status. Some integrations were defaulting to always online which caused issues with the pending connectivity logic
- Updated session log text about retrying to fetch PowerShell version
- Added a better error message when a dynamic version script returns a newer version than what was detected previously in the session. The message is "The dynamic version script is returning a newer version than what was retrieved the last time the script was ran. If so, re-deploy this action. We will automatically handle this scenario in a future release."

### Bug Fixes

- Fixed an issue with onboarding and deployment parameters where the form would sometimes not render due to hidden errors. The errors are now visible in this case.
- Fixed an issue on the onboarding form where values specified on the deployment form were not considered when resolving any errors
- Fixed a bug where only the first 300 Azure customers of a partner tenant would show up in the Azure customer mapper
- Fixed an issue where global software -> agent integration dropdown was showing local integrations
- Fixed a bug where linking an az customer would incorrectly set the az tenant type as Standalone, preventing usage of the graph api for that customer
- Fixed an issue where sessions would sometimes not show the computer name, and links to the computer would result in a 404
- Fixed an issue where a license couldn't be deleted because it was used by a deployment that was no longer showing the license selector. The selector now shows and the license can be successfully removed from the deployment
- Fixed a rare issue where agents would fail to be synced if the integration reported multiple agents with the same agent id
- Fixed an issue where `Immybot.Agent.Shared.dll` from the ImmyBot agent MSI installer was not signed
- Fixed an issue where linking a dynamic integration client was removing other agents incorrectly during the sync
- Fixed a bug where tenant select boxes couldn't be searched on provider client link pages
- Fixed an issue where custom app reg could not be changed without first toggling permission level
- Fixed an issue where reloading integration types would result in a permission error
- Fixed an issue where the unlinked msp client banner would show up even when the msp client was linked
- Fixed an issue that was preventing the ImmyBot agent's .dlls to be signed
- Removed extra "$" in front of version in the dynamic version response
- Removed the agent's client name from the agent tab to prevent confusion
- Fixed an issue where a pending agent "Let Immy Try Agent" action was not working as expected
- Fixed an issue where a script dropdown would show incorrect results if it was toggled to only show global scripts or toggled to only show local scripts
- Fixed a "downlaod" typo in "Action To Take"

## 0.58.0

Released 09-13-23

### Bring Your Own Integrations

The goal of this feature is primarily for our own use to more rapidly implement integrations with other RMMs and PSA, but we have opened it up for you to create your own integrations as well.

[https://docs.immy.bot/build-your-own-integration.html](https://docs.immy.bot/build-your-own-integration.html)

### New Parameter New-OAuthConsentParameter

This parameter creates a button that will perform the oauth code authorization flow and allow you to use the response in the script.

[https://docs.immy.bot/scripts.html#parameters](https://docs.immy.bot/scripts.html#parameters)

### Agent Tracking

The Computer -> Agents tab now includes all agents, not just ones used to run scripts. This is preparation for the upcoming computer/tenant offboarding feature. Which will allow us to not only uninstall the agents from the machine but de-provision them from their respective platforms.

### Metascript WebHooks

You can now receive web requests from within Metascripts.

The webhook URL is _{your-domain}.immy.bot/api/v1/webhooks/{web-hook-id}_, and it accepts Post and Get requests. The webhook id can be retrieved from `$Hook.Id`

An example scenario is this can be used to map Toast buttons to actions in ImmyBot.

```powershell
$Hook = New-ImmyWebHook
$Hook.PublicUri | Add-UriQueryParameter @{
    MyParam = "MyVal"
}
$Hook.PublicUri.ToString()
Write-Host "Waiting for Hook"
$Hook | Wait-ImmyWebHook
Write-Host "Got WebHook!"
```

### Atomic and Cache Cmdlets

Added 3 new Cmdlets, `Set-CacheKeyExpiration` , `Invoke-CommandCached`, and `Invoke-AtomicCommand`

![image](https://immybot.blob.core.windows.net/release-media/24ae8f1d-08ee-4bfb-9bd7-daf35a69c869)

![image](https://immybot.blob.core.windows.net/release-media/28df2016-3fed-455f-b31a-7c07dbfd5401)

![image](https://immybot.blob.core.windows.net/release-media/4c710593-4424-4137-8ec5-6377664ac721)

### Other Improvements

- Error text for deployment parameters now show as markdown
- Added Completion for Attribute parameters
- Immy-specific core types no longer tab complete to lowercase
- Immy-specific Attributes like DropdownAttribute and OAuthConsentAttribute no longer tab-complete to include "Attribute"
- Remote control can now automatically reconnect after logging off a Windows user or rebooting the computer.
- Improved performance of loading maintenance sessions with hundreds of actions
- Added a background service that periodically checks for online computers that have pending connectivity sessions and runs them
- `Get-Hash` cmdlet now supports an additional `AsHex` switch to get a hexadecimal output.
- Prevented recurring inventory jobs from retrying to connect an ephemeral agent more than once so we can quickly move on to the next computer needing inventory
- You can now target provider client groups (e.g. CW Manage Agreement Products) with cloud tasks
- Reduced memory footprint of some session related data
- Added an Agents tab to the Integration Details Page if the integration supports listing agents.
- Saving a script in the script editor now shows a loading icon in the tab and disables the buttons to prevent multiple requests
- You can now link ImmyBot tenants to Azure tenants (including partner tenants) from the Tenant Edit page
- You can now have multiple MSP tenants
- ImmyBot tenants can be upgraded to MSP tenants from the Tenant Edit page
- The software dropdown on the license details page is now limited to software that support licenses
- Added text to the maintenance ordering page that explains that onboarding actions will always be executed at the beginning of the session in the order that they are listed.
- Added a log interceptor that can be used for dynamic and built-in integrations to log method calls
- Implemented `ISupportsAgentUninstallToken` and `Get-IntegrationAgentUninstallToken` (for SentinelOne) and removed the need for specifying the clientid

### Bug Fixes

- Fixed issue where Computers running ImmyAgent < 0.51.0 and no other agents failed to establish an Ephemeral connection.
- Fixed an issue where a session would fail with "Uncaught exception running maintenance session. Computer does not have any enabled agents that support running scripts"
- Fixed an issue where updating a schedule would bring you back to the computer list page
- Added some additional logging around the Immy Agent when attempting to establish an ephemeral agent connection
- Fixed possible errors that could occur after an IoT Hub has been removed
- Fixed an issue where exporting to Excel from dashboard would fail if there are multiple maintenance items with the same name
- Fixed a bug where GDAP Customer would incorrectly show up as a warning in certain circumstances, causing confusion consenting as GDAP Azure Customers
- Fixed an issue where Automate patches were being performed on action reruns
- Fixed an issue where Automate patches were not being performed during manual onboarding
- Fixed an issue where there was one non-dismissible notification for a recommended deployment
- Fixed an issue where the Provider Audit table would cause an `IAsyncEnumerableReader` error to be thrown.
- Fixed a potential script deadlock issue when using `Invoke-CommandCached`
- Fixed an issue where the `ExtraData` property from an IProvider was inaccessible.
- Fixed an issue where some dynamic form bind errors were not showing in the script editor
- Fixed an issue with persons selected to be notified on onboarding screen not showing up
- Fixed an issue updating tenant slugs on the tenant list page
- Fixed an issue where licenses were failing to be updated
- Fixed an issue where versions listed on the software details page were not sorting by version correctly
- Fixed an issue with ImmyAgent EXE installers being corrupted during download.
- Fixed an issue where integrations would sometimes become unhealthy on startup with "The JSON value could not be converted to System.Boolean...`
- The "More Actions" link on global software is now hidden for non-immybot-core users since no actions can be taken
- Fixed an issue on the dashboard table where the company column was not sorting or filtering
- Fixed an issue where users could update/delete the ImmyAgent integration which could potentially cause issues
- Fixed an ordering issue on the deployment page where the cross-tenant tag target type was showing a lower priority than integration target types
- Fixed a wrapping issue with the new integration page
- Fixed an issue where non-msp users could not see their tenant's filter script deployments
- Made Get-ImmyAzureAuthHeader cmdlet respect the app registration that the customer was consented with
- Fixed an issue where computers show licensed even when they haven't had maint in the current usage period

## 0.57.6

Released 08-10-23

### Improvements

- Implemented new `Get-CwControlFields` cmdlet

  ![image](https://immybot.blob.core.windows.net/release-media/6bb5e5e8-2fd5-4390-abd3-371f1a919ca1)

- Added a new `Get-OTP` cmdlet, capable of creating TOTP & HOTP codes.

  ![image](https://immybot.blob.core.windows.net/release-media/d2c7329a-eba8-4b9a-8c39-7ac86ba0c33b)

- The script that downloads and starts the ephemeral agent script now uses an absolute path for PowerShell. `%systemroot%\System32\WindowsPowerShell\v1.0\powershell.exe`
- Optimized the code responsible for syncing agents from integrations

### Bug Fixes

- Fixed an issue where array values specified in the script editor parameters pane were not getting passed to the script
- Fixed an issue where reran actions may have contained incorrect information from another action
- Fixed an issue where rerunning a session after rerunning an action would cause the new session to only perform the reran action
- Fixed an issue where ImmyBot would show offline when you did not have access to login

## 0.57.5

Released 08-08-23

### Bug Fixes

- Fixed a bug introduced in 0.57.4 where the default value for CW Control's Custom Property Client Name and Secondary Index fields had the wrong values
- Fixed an issue with new instances having a disabled / non-working ImmyBot integration

## 0.57.4

Released 08-07-23

### Improvements

- Started work on improving performance of computer and tenant deletions. More improvements to come.
- In the global script editor, scripts with param blocks will now only have the parameters auto-binded when the script has been newly opened instead of when it was focused.
- Fixed a bug where `undefined` would sometimes show up as an error in the global script editor output.
- Eliminated 2-step Verify/Create on Integrations
- Updated the error message you get when you attempt to create a deployment for software that does not have a version to deploy. "There are no available versions for this software. The software must have a static version, a dynamic version script, or be linked to software from an alternate provider such as Ninite or Chocolatey in order to be installed."
- Made `New-Parameter -Position` nullable and not default to 0 to prevent parameter binding error "Cannot bind positional parameters because no names were given."
- The ephemeral agent exe now has the correct version where before it would always have 0.0.1
- Moved Remote Control feature to the top of the Preference Page for better visibility
- Package Analyzer will fallback to use `FileVersion` if `ProductVersion` is missing on EXE installers.
- Package Analyzer will now return relative path to installer nested multiple directories inside of a ZIP archive.
  For example, a package bundled like `(MyInstallerPackage.zip) => [MyInstallerPackage] -> [InnerFolder] -> Setup.exe` will return `InnerFolder\Setup.exe` as the FileName instead of `Setup.exe`
- Package Analyzer will now fallback to a list of known-good DNS servers for downloading binary. This should help alleviate issues for a few customers where Azure's default DNS fails to resolve the address. Errors stemming from downloading issues will additionally contain a DNS Audit trail.
  Package Analyzer download speed has been improved by up to 50%, reducing time waiting for analysis.

### Bug Fixes

- Fixed a `NullReferenceException` when no response was received from `InvokeCWARestMethod`
- Fixes an issue where the computer was not showing the active session tag for all computers that had one
- Fixed an issue where Cloud Tasks were failing because pre-flight script were trying to run
- Remote Control: Fixed an issue where some special characters would cause "Type Clipboard" function to fail.
- Fixed a bug with Package Analyzer which caused it to fail to analyze some installers where the server inappropriately returned a quoted filename.
- Fixed an issue with Package Analyzer failing to extrapolate filename (if one wasn't provided) from the download URL if the server didn't return a `content-disposition` header.

## 0.57.3

Released 07-14-23

### Improvements

- Optimized the load time of the Computer List page

### Bug Fixes

- Fixed an issue where an ephemeral agent would disconnect after attempting to run a user script without a logged-on user

## 0.57.2

Released 07-11-23

### Bug Fixes

- Limited Support Technician access to members of the Immense Entra ID with the Immy Support Technician role

## 0.57.1

Released 06-30-23

Fixed an issue for new instances deployed without an IoTHub being unable to install Immy Agents.

## 0.57.0

Released 06-29-23

### Agent Delivery - Whitelist **cdn.immy.bot**

Make sure to whitelist cdn.immy.bot in your endpoint protection tools.

The ImmyBot Agent and the Ephemeral Agent are now served from a Cloudflare CDN at https://cdn.immy.bot

### ImmyBot Remote Control (Remotely) - BETA

Initial support for remote control is here!

The newest version of the ImmyBot Agent will support the ability to establish remote control sessions.

Remote control can be established by clicking the "Open Remote Session" dropdown and then clicking the "ImmyBot Agent" option.

![image](https://immybot.blob.core.windows.net/release-media/96fe75cd-c059-46ce-ad2b-ca040e7e04c1)

You can also select the initial Windows session within which to start remote control.

### Task Deprecation & Supersedence

Old tasks can now be deprecated in favor of newer tasks.

You can deprecate a task by supply a "Superseded By" task on the task form. You can additionally supply a parameter migration script
that will migrate the parameters specified by the deprecated deployment to the parameters of the superseding one.

![image](https://immybot.blob.core.windows.net/release-media/6c6e05f5-5ebe-4eb9-9519-471969479421)

### Schedule using the computer's timezone and Active Hours

The schedule details page has been cleaned up and re-organized for easier understanding.

We are introducing two new ways to schedule execution against a computer.

1. Use the computer's timezone for execution

   A common complaint is that it is hard to schedule maintenance for a group of computers that are all in different timezones. Another complaint is that scheduling maintenance against laptops for people who travel is difficult because they are constantly changing timezones.

   You now have the option to schedule maintenance at a particular time according to the timezone specified by the computer.

2. Start execution after active hours if available

   For computers that are running Windows 10+, you can opt into using the Active Hours specified by the computer instead of executing at the specified time on the schedule.

   For now, if active hours are used, execution will be scheduled in the middle of non-active hours. e.g. If active hours ends at 1pm and starts again at 10pm, we will schedule execution at 5pm.

### Active Hours as Business Hours

When active hours are used to schedule maintenance for a computer, checks against business hours will resolve to active hours. This is necessary because we don't want to accidentally reboot the computer when in use, when "Suppress Reboots During Business Hours" is checked on the schedule.

Both "Use computer's timezone for execution", and "Start execution after active hours if available" are available for use on the deployment details page as well.

### Pending Ephemeral Agent Session Status

A new session status has been added called Pending Ephemeral Agent Session.

Anytime during a maintenance session, if we fail to establish an ephemeral agent, the session will go into Pending Ephemeral Agent Session. The action it was performing when the failure occurred will not be failed so that it can resume when the ephemeral agent is finally connected. A background service will continually attempt to establish an ephemeral agent on sessions that are marked with this status.

With this change, we were able to remove the Script Execution Circuit Breaker that has not proved to be very useful.

### Terminating Exceptions

System scripts will now throw terminating exceptions if we fail to establish an ephemeral agent or an actual terminating exception was thrown in the script.

Metascripts will also now throw terminating exceptions when an ephemeral agent fails to establish when using `Invoke-ImmyCommand`. You must now explicitly use a `try/catch` in order to prevent the terminating exception from ending the script.

This behavior will prevent software and tasks from continuing script execution in the event of a terminating exception, which will prevent false-positive results and report better errors.

#### User Script Terminating Exceptions

When running `Invoke-ImmyCommand -Context "User"`, an additional parameter will be available called `TerminateFromNoLoggedOnUser`. When set, the script with throw a terminating exception when there is no logged on user. By default, user scripts will not throw a terminating exception when there is no logged on user.

### Made pending-connectivity session triggering more robust

- Removed some event handling from pending connectivity service since the session finished event is not emitted in all circumstances
- Reduced different entrypoints to starting a session to improve consistency and reliability
- Added logic to check for and start the first pending connectivity session in the queue when any session finishes (both pass and fail) directly from the Immy Service Job

### Session Preflight Scripts

A new script category has been added called "Preflight". Preflight scripts run after an ephemeral agent is established and before we attempt to run any other script against a computer. If the preflight scripts do not return any exceptions, then preflight is consider "passed" and scripts can be executed as normal. Otherwise, if any preflight script fails, script execution will not be allowed against a computer.

The major reason we added preflight scripts was to detect whether a computer is currently applying windows updates. Agents can report online and connected while windows updates are applying. However, it's possible that certain actions will not perform successfully while the computer is applying those updates. If we attempt to start or resume a session while windows updates are applying, we run the risk of rebooting the computer during an update and potentially bricking it.

The first global preflight script that has been added will check if the computer is currently applying windows updates and will throw an exception if it is, preventing script execution on the computer until windows updates are completed.

#### Pending Preflight Session Status

A new session status has been added called "Pending Preflight". When a preflight script fails during a session, the session will go into "Pending Preflight". The action that was actively being performed when the preflight script failed will not failed so that it can be resumed when the computer passes preflight. A background service will continually attempt to run preflight against a computer until it passes. Once preflight passes, the session will continue.

### Built-In ImmyBot Agent Software

Before 0.57.0, we had hardcoded an action to perform the ImmyBot Agent update, which resulted in a lot of failures.

The built-in agent update now utilizes the ImmyBot Agent software located in the global repository.

#### Before

![image](https://immybot.blob.core.windows.net/release-media/0edc7126-032c-43f2-91fa-32dd15e25689)

#### After

![image](https://immybot.blob.core.windows.net/release-media/30da3005-a460-47e6-887b-6e4f892aee61)

### Prepared removal of Azure IotHub for the ImmyBot Agent

The 0.57.0 ImmyBot agent introduces a new method of establishing a connection to the backend using WebSockets.

With this approach, we will be able to remove dependency upon the Azure IoT Hub and provide a more reliable connection to devices.

### Other Improvements

- Added license icons on computers to indicate which ones are actively being counted towards the license count for the month.
- For instances on Immy Standard, we added a checkbox on the computer list page that allows you to filter to only computers that are licensed
- Added fallback for tls when using `Download-FileToFolder`
- The .dlls extracted from the ImmyBot Agent and Ephemeral Agent executable are now signed, which should make whitelisting by our certificate in A/V tools easier.
- Improved the readability of the billing page
- Renamed Get-Hash to Get-KeyedHash as it only supported keyed hashes like HMACMD5, HMACSHA1, HMACSHA256, HMACSHA384, and HMACSHA512
- Implemented Get-Hash for non-Keyed algorithms like MD5, SHA1, SHA256, SHA384, and SHA512
- The "Update agent on device" button under the Agents Tab -> ImmyBot agent is clickable even when the computer is offline. It will put the session in pending connectivity and update when the computer comes back online.
- For ImmyBot Agents version 0.57.0 and above, the version is now displayed on the Agents tab.
- `C:\Program Files (x86)\ImmyBot\Immybot.Agent.exe` now contains the correct file version
- ImmyBot Remote Control and Require Consent For External Session Provider tenant preferences now have a tri-state value. They can be enabled, disabled, or use the application default value.
- Actions can now be sorted by the date/time execution started
- ImmyAgent binaries now show correct version
- Added a tenant preference to enable/disable the User Affinity Sync

### Bug Fixes

- Fixed an issue where commands and output from the computer terminal and the script editor were showing up in both
- Fixed an issue where creating a new filter script or metascript from the deployment page was selecting the wrong execution context
- Fixed another issue that was causing the azure user sync to sometimes fail
- Fixed an issue with schedules not being able to update when they are using a deleted filter script
- Fixed an issue where failing to refresh an agent's online status could cause detection to fail
- Fixed a potential bug that could occur when script-output recovery would happen, that would cause a false `Recovery is not possible` error to be thrown.
- Fixed issue where running a User-context script w/o a logged on user would cause
  `throw $args[0]; # If you can see this, report it to the ImmyBot Dev Team.` to be displayed in powershell output.
- Fixed an issue with Update If Found deployments for software with a test script incorrectly running the test script even when the software was not found
- Fixed some theme color issues with table column choosers and filters
- Cleaned up action error messages when a test or get script failed.
- Fixed an issue where the session would not go to pending connectivity when the AgentsOfflineException would be thrown but a provider agent is incorrectly reporting online still.
- Fixed an exception that was occurring when duplicating some global maintenance tasks
- Fixed an issue preventing the azure sync from running
- Fixed an issue with PowerShell returning System.Type arrays causing out of memeory exceptions
- Fixed instance of inventory json parsing exceptions causing sessions to fail hard
- Fixed an issue with publishing the agent as a single file

## 0.56.5

Released 2023-05-11

### Improvements

- Made it more obvious when actions are skipped because reboots are suppressed and the action's software requires a reboot
- Removed the hardcoded "Uninstall by Package Info" logic from software uninstall steps since it could cause unexpected reboots
- Updated the description of the tenant Onboarding Patching preference to indicate that it currently only applies to CW Automate
- Added PowerShell Version to computer overview tab

### Bug Fixes

- Added missing logs around reboot checks
- Fixed a XSS vulnerability found in param block descriptions
- Fixed an issue where GDAP customers that need consent would show up as consented when they had previously been synced as a non-GDAP customer
- Fixed an issue with quick deploy where it would sometimes not kick off the session
- Fixed an issue where dynamic form errors were not clearing upon refresh
- Fixed issue where the url in a cloud session's support request was incorrect

## 0.56.4

Released 2023-05-08

### Bug Fixes

- Fixed an issue where duplicating a task would not copy over all data
- Fixed an issue that sometimes prevented the onboarding task forms from loading
- Fixed an issue where scripts with the category "Filter Script Deployment Target" and "Metascript Deployment Target" were not automatically selecting the correct execution context
- Fixed an issue where some actions would have incorrect parameters or variables when multiple sessions executed the script at the same time

## 0.56.3

Released 2023-05-04

### Improvements

- Added a note to the ImmyBot Agent installer modal indicating that there's an issue on Windows 11 22h2 builds that prevent the PPKG from working and added notes on how to resolve it.

### Bug Fixes

- Added missed user auditing to certain software, task, and deployment operations
- Fixed an issue with assigning tags while creating a new tenant
- Fixed an issue where schedules targeting a specific maintenance item were picking up onboarding only deployments
- Fixed an issue where some macOS agents were not being excluded
- Fixed an issue where navigating to a computer that did not exist threw a non-404 unexpected error
- Fixed an issue with schedules targeting CW Control groups not being limited to the specified tenant on the schedule
- Fixed an issue with sessions failing when attempting to retrieve bulk software and the bulk software response contains text that is not representable as valid UTF-8

## 0.56.2

Released 2023-04-27

### Improvements

- Updated the alert on the schedule details page when targeting a specific item to state, "Metascript deployment targets are not supported when the schedule is limited to a specific maintenance item because it would require executing a script against every computer in the system."
- Azure User Sync now excludes external users
- Renamed the "All" tab to "Active" on the computer list page to avoid confusion. "All" implies it should contain "Pending" agents, which it does not.

### Bug Fixes

- Fixed an issue where new instances would not be able to use immy agent provider
- Fixed an issue where some business hours were not being computed correctly and the session incorrectly reported that we were within business hours
- Fixed an issue with the computer terminal not maintaining execution when toggling between tabs
- Fixed bug where exceptions that occur while resolving Cw Control remote screen share URLs caused the maintenance session page to not load any data
- Software Post Uninstall phase is now only shown when the software or version has a post uninstall script

## 0.56.1

Released 2023-04-24

### Improvements

- When an agent is identified to a computer that already exists in ImmyBot, we will now automatically select the "Wiped" option if the computer name and OS install date reported by the agent are different than what is reported by the existing computer.
- The ephemeral agent no longer extracts to c:/windows/temp. This alleviates issues around A/V blocking .dlls coming from the temp directory, and also alleviates issues around windows randomly removing required .dlls for the ephemeral agent to run.
- Updated the identification log text that explains why a manual decision is required
- Added the manufacturer name and serial number of an agent in the agent identification logs when resolving a trusted manufacturer
- Added ability to group by target on the deployment list

### Bug Fixes

- Fixed issue with tenant tags not resolving deployments
- Fixed issue where cancelling sessions would sometimes cause session to retry some number of times
- Fixed an issue causing new instances immy agent integration to not be properly initialized
- Fixed a bug where alternate providers were not getting disabled when dynamic versions are selected
- Fixed an internal issue where Immy Support Technicians were not allowed access due to existing expired access requests
- Fixed an issue where a pending agent that has the same trusted manufacturer and serial number as an existing computer would sometimes require a manual decision instead of automatically replacing the existing agent

## 0.56.0

Released 2023-04-17

### Tenant and Person tags

Support has been added for Person and Tenant tags.

A tag no longer has a "type". A tag can be assigned to any person, computer, or tenant.

Deploying a software or maintenance task with a tag target type now resolves computers for the following:

1. computers that have the tag
2. computers for tenants that have the tag
3. primary computers for people who have the tag

Deploying a cloud task can now target tags assigned to tenants, as well as integrations that support client groups.

Now that tags can target tenants, you can create a schedule that targets tags to run a single schedule across multiple tenants.

Tags for tenants can be assigned on the tenant list and tenant details pages.

Tags for persons can be assigned on the person list and person details pages.

### ImmyBot Session Support Requests

You can now request support from Immy technicians from maintenance sessions. When requesting support, you can:

- Add details about the issue you are experiencing
- Select whether an Immy technician should be allowed to access your instance
  - If selected, there is no need to approve an access request for the Immy tech to log into your instance
  - You can disable Immy technician access at any time from the Application Preferences page
- Select whether the session's logs and computer timeline events should be available in the support ticket
  - The logs / timeline events are formatted as a text file and stored in your instance's blob storage account, and a link to download this file is added to the support ticket
  - You can also download this file before submitting the ticket

### Global Script Editor

Below are some of the new features in the script editor!

- General VS Code "vibe"
- Open/Close multiple scripts(tabs)
- Go To Definition support for function scripts
- Script Search and Directory Views with result highlighting
- Variable preview based on script execution context, category, and a selected target (computer, tenant, task, software).
- Parameter Form for scripts with param blocks, selected software that have configuration tasks, and selected maintenance tasks that have parameters
- Closing a script tab with unsaved changes alerts you
- Function name/definition view that shows the results of `Get-Help {functionName} -Detailed | Out-String`
- Basic hotkey support

![image](https://immybot.blob.core.windows.net/release-media/9be569f7-c3d4-4013-bad2-00693efc73ba)

![image](https://immybot.blob.core.windows.net/release-media/87aa4eef-f90f-4939-9587-38f0c89fdf4f)

![image](https://immybot.blob.core.windows.net/release-media/93b1246a-18d4-41f8-a24c-89fd50289f75)

![image](https://immybot.blob.core.windows.net/release-media/e50180a3-1d07-4dc7-8709-a50f441bff1d)

You can access the script editor from the top navbar or in the sidebar under Library -> Script Editor

![image](https://immybot.blob.core.windows.net/release-media/f5850129-0f74-43d4-a2a2-67d54a42a60d)

![image](https://immybot.blob.core.windows.net/release-media/fa21a1a2-1206-457f-ae3e-3f02669e4d86)

### Parameter Value View

Sometimes deployment parameters result in an exception when performing the binding. This can happens when the parameter types have been updated but the values have not.

You can now toggle the parameter form to a value view that provides you the ability to remove/reset values that may be causing issues.

![image](https://immybot.blob.core.windows.net/release-media/6fbe70fc-96b0-42dc-9416-b654c2aa7276)

### Tenant Software

The Tenant Details Page now has a Software tab that displays a grid of software that was detected on endpoint machines and could be matched to software in the global database. The result set is grouped by global software name/ID and sorted descending by total installs (i.e. number of devices that have it installed). Each group has a Deploy button, which will open a new deployment for the software that targets all computers under that tenant.

![image](https://immybot.blob.core.windows.net/release-media/fb09bb5c-d6d0-4473-a1e7-60fbede16b02)

### Other Improvements

- On the Deployment List Page, tenants with missing or deleted tenants will show `Tenant no-longer exists` under tenant column and the entire row will be highlighted red.
- The current ImmyBot agent version is now shown on the frontend in the installer modal and in the sidebar's ImmyBot Agent Download box.
- Added the ImmyBot version in a session log at the start of a session. This will be useful when debugging session-related issues since we can correlate the problems to the version ImmyBot was on when the session ran.
- You can now install the ImmyBot Script Editor as a progressive web app.
- Cleaned up some of the error messages returned by integrations
- Fixed issues with tag deployments not getting applied during an onboarding session
- System scripts that use param blocks will now through an error letting users known that param blocks are only available in metascript and cloudscript contexts.
- Maintenance tasks can now specify function scripts
- Added a session log when attempting to apply a windows patch since there are currently none
- Added a check for whether the computer is online before attempting to apply windows patches
- Get-Hash now supports HMACMD5, HMACSHA256, HMACSHA384, and HMACSHA512
- Added back session list "Completed" count and filter and removed "All"
- Added internal auditing tables for scripts, software, tasks, and deployments. The future plan is to expose an audit trail for these objects so you can see who made changes and when they were made, with the ability to revert changes.
- Moved the tenant tag selector to the edit tab. The tags now show inline next to the tenant's name
- Made session log database handler more efficient by breaking large updates into smaller queries
- Reduced likelihood of CW Control Integration failing to sync devices.
- The deployment page no longer hangs when attempting to preview/deploy to a large number of computers
- Improved Package Analyzer to handle improper/malformed `content-disposition` header returned from some file servers, which resulted in a failure to analyze a package.
- Expired users can now be un-expired from the edit user form
- `Wait-ImmyComputer` (and therefor `Restart-ComputerAndWait`) has been improved with a new `RebootWithPollingFallback` option that should help alleviate issues with ImmyBot not detecting when a machine has been rebooted and now back online. This option will periodically poll providers/integrations about machine connectivity status if they haven't reported target machine as online after an expected `WaitForEventTimeout` period.
- You can now define multiple functions in a Module script and import them into other scripts using Import-Module
- Maintenance task get/test can now create child actions during detection using the new cmdlet `Add-ImmyMaintenanceActionChild`

### Bug Fixes

- Fixed an exception in the Sync Azure Users Job that was preventing some person entities from being deleted
- Fixed a bug where integrations would all become unhealthy until ImmyBot restarts when one provider failed to initialize in a timely fashion
- Fixed an issue where a specific unrecoverable ephemeral agent exception was being suppressed
- Fixed an issue with postpone button from scheduled maintenance emails not actually postponing the session in some circumstances
- Fixed unnecessary logging of an exception when an Ephemeral Agent Session was disposed correctly
- Fixed an internal exception with ephemeral agent sessions where we were failing to dispose of the connection timeout callback
- Fixed issue with instances that have large session logs tables having poor database performance and dropping session logs
- Fixed issue with logs displayed on maintenance sessions occasionally showing up unsorted-by-timestamp
- Fixed an issue that was allowing a device to sleep when the ephemeral is connected
- Potentially fixed an issue where sessions would get stuck in the running status after the backend restarted
- Fixed an issue where tasks marked to be ignored would show as compliant instead of ignored on the maintenance session's action list
- Resolve potential bug with ImmyAgent causing IoTHub issues
- Fixed browser warnings about using variable names starting with $ or \_ in setup()
- `Restart-ComputerAndWait` now will show agent timeline events in correct order
- Fixed issue with gdap customers not showing up when azure permission level is reset from custom to default and custom didn't have correct permissions
- Fixed an issue with media missing the base url
- Fixed an issue where software deployments don't report download failures correctly and will continue on.
- Fixed an issue where quick deploying software would not also deploy the configuration task if it had one

* Fixed $using variables on single line scripts

- Fixed an issue where the cross tenant deployment grooup was not sorted at the top of the deployment list page

* Delete existing UserAffinities when new user is set to prevent reverting to old user

## 0.55.13

Released 2023-04-03

### Bug Fixes

- Fixed a regression in 0.55.12 where some business hours checks would report within business hours but the computer would still be rebooted

## 0.55.12

Released 2023-03-31

### Improvements

- Added timespan parameter `-AgentConnectionWaitTimeout` to `Invoke-ImmyCommand` so you can override the default 5 minute wait time.

### Bug Fixes

- Fixed an issue where some session logs were failing to save due to issues sanitizing a script's param block
- Fixed an issue where deployments targeting an Azure Group were not applying when the computer's primary user was set during the onboarding stage
- Fixed an issue where executing quick deployments against computers needing onboarding would incorrectly trigger the onboarding stage
- Fixed an issue with the onboarding form's assignment links not bringing users to the specified assignment
- Fixed an issue where reboots were occurring during business hours than spanned over to the following day. e.g 9am - 4am
- Fixed an issue where the Primary User task was running after Set Computer Name and Domain Join. This was causing computers to not get the correct name when the computer is named after the primary user.
- Fixed a long-standing issue where Immy PPKGs wouldn't reliably disable sleep/hibernation when the option was checked on some computers. This has been improved.

## 0.55.11

Released 2023-03-22

### Bug Fixes

- Fixed issues with the websocket connection randomly disconnecting when adhoc deploying to a large number of computers
- Fixed an issue with PowerShell Editor Services continually starting and stopping

## 0.55.10

Released 2023-03-21

### Bug Fixes

- Fixed an issue where adhoc deployed sessions would go over the session limit and cause performance issues
- Fixed an issue in the ImmyBot Agent that would cause devices to rapidly send connected messages to the IoTHub, depleting the quota and preventing new devices from registering

## 0.55.9

Released 2023-03-16

### Improvements

- Using the `[Person()]` attribute on param block parameters now takes into account the selected tenant on the deployment form and only shows people belonging to the selected tenant.
- The computer list page now supports the following query parameters: `filter` and `includeDisconnected`. This can be used to filter the computer list e.g `demo.immy.bot/computers?filter=desktop-R2D2&includeDisconnected=true`

### Bug Fixes

- Fixed an issue with hashtable parameter values not working when provided from the deployment
- Fixed an issue with the CW Control device sync

## 0.55.8

Released 2023-03-15

### Improvements

- Improved performance of syncing devices from all integrations. Automate in particular was failing to sync device updates (online/offline statuses).

### Bug Fixes

- Fixed a WebSocket exception where we were attempting to close the WebSocket after it was already closed

## 0.55.7

Released 2023-03-14

### Improvements

- Parameters for "Not Present" deployments now show up on the deployment edit page.
- Removed 100 and 1000 page sizes from all tables for performance reasons

### Bug Fixes

- Fixed an issue in the azure sync users job that was causing it to fail
- Fixed more issues with the ephemeral agent getting locked up
- Fixed an issue where agent disconnect events would show duplicated in the timeline events table
- Fixed an issue where computers would be moved to needs-onboarding after a new agent connects for an existing online computer
- Fixed issue where newly-installed immy agents would not result in new computers in ImmyBot under some circumstances

## 0.55.6

Released 2023-03-08

### Improvements

- Improved performance of searching the main computer list
- Added a button near maintenance task parameters to copy the parameters as a script param block string. Useful in converting a task to use a script param block

### Bug Fixes

- Fixed an issue where identification logs would sometimes not be sorted by date.
- Fixed an issue where we were not considering case-insensitive serial numbers for trusted manufacturers
- Made non-admins able to delete their tenant's computers
- Made non-admins able to add and remove tags from their tenant's computers
- Fixed an exception that was occurring where the azure sync was trying to delete people who existed as an Immy user.
- Fix issue with PowerShell formatting of `System.Version`

## 0.55.5

Released 2023-02-28

### Improvements

- Improved performance of session counts on session list page

### Bug Fixes

- Fixed an exception that was occurring frequently when the ephemeral agent established a websocket connection
- Fixed an internal error that occurred when we add function scripts to the PowerShell InitialSessionState

## 0.55.4

Released 2023-02-24

### Improvements

- A new application preference has been added: "Allow Non-Admins and Non-MSP Users to Use Terminal and Edit Scripts"
  - Default: disabled (by default, only MSP Admins will be able to use terminals or edit scripts)
- Added ephemeral agent details under the Computer Details Page -> Agents tab with the ability to kill the active ephemeral agent

### Bug Fixes

- The ImmyStarter plan no longer allows maintenance to be run against computers that were added into Immy over 7 days ago.
- Added "Tags" to the default display set returned from `Get-ImmyComputer`

## 0.55.3

Released 2023-02-21

### Improvements

- Syncing azure users now deletes people in Immy that no longer exist in Azure (if the person in Immy has the Azure Object Id set).
- You can now upload .msp, .appx, .appxbundle, .msix, and .msixbundle installer files!

### Bug Fixes

- Fixed an issue related to N-Central providers executing scripts on machines

## 0.55.2

Released 2023-02-14

### Improvements

- Increased the font-weight of heading text in the light theme for better contrast
- Fixed an issue where some global software and tasks were incorrectly failing due to permission issues.
- Updated dynamic version scripts to show logs even when it is already cached
- Removed maintenance task parameter description from onboarding form unless the parameter is being specified
- Made onboarding task/assignment title bar visible when scrolling down on dynamic parameter panels
- Added ability to manually refresh dynamic parameters on onboarding form

### Bug Fixes

- Fixed an issue with loading deployments that targeted people where the deployment wouldn't allow saving
- Fixed an issue where rerunning a session that contained reran actions would fail unexpectedly
- Fixed an issue with binding malformed uri parameters

## 0.55.1

Released 2023-02-09

### Improvements

- Added batch action to maintenance session list to cancel all incomplete sessions.
  - ![image](https://immybot.blob.core.windows.net/release-media/8a26d693-2e55-4f7e-b836-479548315ea5)
- Improved the performance of the integration client's table. Instances with thousands of clients and tenants should now be able to use this page without running into performance issues.
- Updated the ImmyBot backend from .net 6 to .net 7

### Bug Fixes

- Fixed an issue that prevented the maintenance email's reboot now button from rebooting the computer
- Fixed an issue where some assignments using tags would not be resolved to a computer due to using data from a stale cache
- Fixed an issue CW Control integration where it was not forcing https:// on the url

## 0.55.0

Released 2023-02-07

### Stale Computers

A new "Stale" tab has been added to the Computers List page showing devices that have not had a recent agent connection event.
By default, the staleness threshold is 30 days. This value can be configured from the System Preferences page.

![image](https://immybot.blob.core.windows.net/release-media/8d9c4bb5-af75-4aa0-992c-74b0340af3db)

This feature can be used to cleanup old computers when you are coming close to the maximum limit for computers.

### Dynamic Maintenance Task Parameters (PowerShell Param Blocks)

Maintenance task parameters can now be defined dynamically using a script's param() and dynamicparam{} block.

![image](https://immybot.blob.core.windows.net/release-media/f0a4f734-fbf7-4e7e-adae-5ad3c840d20d)

PowerShell has a robust parameter definition and validation engine. By leveraging it, we give ourselves features like:

- Parameter Sets
- Regex Validation
- Conditional/Dynamic Parameters
- Dynamic Values
- Type enforcement

When deploying Onboarding tasks, you can define which parameters should be visible to the technician, while hiding others or setting their defaults in the Deployment.
![image](https://immybot.blob.core.windows.net/release-media/9d29e0d1-4101-4eba-816e-7fc1f5e71aed)

### GDAP Support

"GDAP Customer Syncing" option has been added to the Azure settings page. Enabling this option does the following:

- Adds the _DelegatedAdminRelationship.Read.All_ permission to ImmyBot's default app registration, to allow retrieval of your GDAP customers
- Enables ImmyBot to offer a consent link for each GDAP customer to be synced by ImmyBot

Please see the [GDAP Customer Syncing documentation](https://docs.immy.bot/azure-graph-permissions-setup.html#gdap-customer-syncing) for usage details.

**Important!** If you are using a custom app registration (also known as the CSP App Registration), your app registration must have a Web redirect URI of https://&lt;your-domain&gt;.immy.bot/consent-callback, replacing &lt;your-domain&gt; appropriately. Please see the updated [custom app registration docs](https://docs.immy.bot/azure-graph-permissions-setup.html#create-an-app-registration) for details on how to add the redirect URI

### Other Improvements

- Onboarding only maintenance tasks now have an option to "Ignore during automatic onboarding". This is useful if you have an installer set to automatically onboard the computer and the task requires data that wasn't able to be provided.
- Improved code around establishing Ephemeral Agent connection & eliminated possible race condition.
- Prepend an "[ImmyBot User]" tag for the username that displays for remote session started from a supported provider.
  This makes it clear at a glance who is connected to a machine initiated from an ImmyBot user.
- Removed the need for executing suspicious-looking encoded powershell for N-Central integration which would trigger some AV alerts while also moderately decreasing latency to start ephemeral agent.
- When the Immy Agent fails to update during a maintenance session, it will now retry up to 3 times in case it failed due to a transient error
- You can now assign tags to a computer from its Onboarding form
  - ![image](https://immybot.blob.core.windows.net/release-media/0c452151-e33b-4f4f-9c5a-2ec21c4670a2)
- When we run a script and to establish an ephemeral agent and detect that there are no online agents, we only wait 5 minutes instead of 30 minutes. For integrations like Automate and N-Central and don't support connectivity changed events, a machine would potentially restart so fast the RMM was unaware, therefore we would wait 30 minutes before realizing the machine was actually online.
- Removed execute and verify progress bars when action is a task monitor, and changed the "detect" progress text to "monitor".
- Added the ability to change a computer's primary user from the overview page.
- Improved performance of computer list page when sorting by Date Created
- Added `-IncludeTags` switch parameter to `Get-ImmyComputer` that includes an array of tags containing the tag id and the tag name
- Added a date input to the dashboard page to optionally return actions that were executed on or after the specified date
- Added basic health check functionality to all integrations that were missing health checks
- Added a test suite for the NCentral integration to run in our build pipeline to help reduce bugs
- Made the main scripts table use server-side pagination to decrease the amount of data initially transferred to the page. Global scripts are now showing over 3MB combined.
- Added better error messages when we fail to sync users due to permissions issues
- Improved and simplified some internal logic related to permissions in our Metascript cmdlets

### Bug Fixes

- Fixed an issue with tag acccess levels not saving the limited tenants selected
- Fixed an issue with metacript exception handling where any error with the category `OperationStopped` was being treated as terminating exception
- Fixed an issue with Uri parameter values being inserted into scripts with type `string` instead of type `Uri`
- Fixed an issue where the software upload analysis result description had the wrong color making it impossible to read
- Fixed issue on the computer list -> pending tab where massive exceptions were not limited to a reasonable height
- Fixed issues with SQL queries timing out early than intended
  Fixed a bug that would prevent users from actually using the N-Central integration with servers that are hosted on a non-standard port.
- Fixed an issue where the tenant link on a computer's overview page had a bunch of whitespace that could be accidentally clicked.

## 0.54.8

Released 2023-01-17

### Bug Fixes

- Fixed a potential deadlock that could cause the ephemeral agent to never connect. Potentially isolated to just devices using CW Automate
- Fixed a potential deadlock in the N-Central integration that could cause Immy to hang up
- Fixed some frontend issues where a maintenance action's status and reason would not show correctly for certain values
- Fixed an issue where a terminating exception in a custom download script would get swallowed and allow the install to continue anyway

## Releases in 2022

[Go to 2022 releases](/releases-2022.html)
