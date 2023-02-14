# Releases

## 0.55.2

Released 2023-02-14

### Improvements
---

- Increased the font-weight of heading text in the light theme for better contrast
- Fixed an issue where some global software and tasks were incorrectly failing due to permission issues.
- Updated dynamic version scripts to show logs even when it is already cached
- Removed maintenance task parameter description from onboarding form unless the parameter is being specified
- Made onboarding task/assignment title bar visible when scrolling down on dynamic parameter panels
- Added ability to manually refresh dynamic parameters on onboarding form

### Bug Fixes
---
- Fixed an issue with loading deployments that targeted people where the deployment wouldn't allow saving
- Fixed an issue where rerunning a session that contained reran actions would fail unexpectedly
- Fixed an issue with binding malformed uri parameters

## 0.55.1

Released 2023-02-09

### Improvements
---
- Added batch action to maintenance session list to cancel all incomplete sessions.
  -  ![image](https://immybot.blob.core.windows.net/release-media/8a26d693-2e55-4f7e-b836-479548315ea5)
- Improved the performance of the integration client's table. Instances with thousands of clients and tenants should now be able to use this page without running into performance issues.
- Updated the ImmyBot backend from .net 6 to .net 7

### Bug Fixes
---
- Fixed an issue that prevented the maintenance email's reboot now button from rebooting the computer
- Fixed an issue where some assignments using tags would not be resolved to a computer due to using data from a stale cache
- Fixed an issue CW Control integration where it was not forcing https:// on the url


## 0.55.0

Released 2023-02-07

### Stale Computers
---

A new "Stale" tab has been added to the Computers List page showing devices that have not had a recent agent connection event.
By default, the staleness threshold is 30 days. This value can be configured from the System Preferences page.

![image](https://immybot.blob.core.windows.net/release-media/8d9c4bb5-af75-4aa0-992c-74b0340af3db)

This feature can be used to cleanup old computers when you are coming close to the maximum limit for computers.

### Dynamic Maintenance Task Parameters (PowerShell Param Blocks)
---

Maintenance task parameters can now be defined dynamically using a script's param() and dynamicparam{} block.

![image](https://immybot.blob.core.windows.net/release-media/f0a4f734-fbf7-4e7e-adae-5ad3c840d20d)

PowerShell has a robust parameter definition and validation engine. By leveraging it, we give ourselves features like:
* Parameter Sets
* Regex Validation
* Conditional/Dynamic Parameters
* Dynamic Values
* Type enforcement

When deploying Onboarding tasks, you can define which parameters should be visible to the technician, while hiding others or setting their defaults in the Deployment.
![image](https://immybot.blob.core.windows.net/release-media/9d29e0d1-4101-4eba-816e-7fc1f5e71aed)

### GDAP Support
---

"GDAP Customer Syncing" option has been added to the Azure settings page. Enabling this option does the following:
   - Adds the *DelegatedAdminRelationship.Read.All* permission to ImmyBot's default app registration, to allow retrieval of your GDAP customers
   - Enables ImmyBot to offer a consent link for each GDAP customer to be synced by ImmyBot

Please see the [GDAP Customer Syncing documentation](https://docs.immy.bot/azure-graph-permissions-setup.html#gdap-customer-syncing) for usage details.

**Important!** If you are using a custom app registration (also known as the CSP App Registration), your app registration must have a Web redirect URI of https://&lt;your-domain&gt;.immy.bot/consent-callback, replacing &lt;your-domain&gt; appropriately. Please see the updated [custom app registration docs](https://docs.immy.bot/azure-graph-permissions-setup.html#create-an-app-registration) for details on how to add the redirect URI

### Other Improvements
---

- Onboarding only maintenance tasks now have an option to "Ignore during automatic onboarding".  This is useful if you have an installer set to automatically onboard the computer and the task requires data that wasn't able to be provided.
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
- Made the main scripts table use server-side pagination to decrease the amount of data initially transferred to the page.  Global scripts are now showing over 3MB combined.
- Added better error messages when we fail to sync users due to permissions issues
- Improved and simplified some internal logic related to permissions in our Metascript cmdlets

### Bug Fixes
---

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
---
- Fixed a potential deadlock that could cause the ephemeral agent to never connect. Potentially isolated to just devices using CW Automate
- Fixed a potential deadlock in the N-Central integration that could cause Immy to hang up
- Fixed some frontend issues where a maintenance action's status and reason would not show correctly for certain values
- Fixed an issue where a terminating exception in a custom download script would get swallowed and allow the install to continue anyway

## 0.54.7

Released 2023-01-04

### Improvements
---

- Improved error messages when the error is coming from an integration's API, such as the CW Automate API, CW Manage API, or CW Control ImmyBot extension API.
- Added manufacturer to duplicate agent table
- Added Device ID to the computer overview details

### Bug Fixes
---

- Fixed a potential issue where a computer architecture could not be found while trying to resolve a dynamic software version
- Fixed a transient issue that was causing detection to fail when it could have continued
- Fixed an issue where pending connectivity sessions would not be triggered for a computer that came online due to a manual resolution for a conflicting agent
- Fixed an issue during identification where the device id of "00000000-0000-0000-0000-000000000000" was allowed as a valid GUID.  It is not valid, and new devices with this GUID will be assigned a new one.

## 0.54.6

Released 2022-12-27

### Improvements
---
- Only MSP Admins have access to the Tenant Mappings tab now

### Bug Fixes
---

- Fixed an issue where schedules with an invalid cron expression were allowed to be saved
- Existing invalid cron expressions will be converted to a valid cron expression when possible, using NCronTab validation functions.
- Fixed an issue where system and user scripts could possibly timeout before an ephemeral agent was ever established
- Fixed an issue with downloading the immy agent installer as an .iso file
- Fixed an issue preventing computers from being deleted
- Mitigated an issue with N-Central which eventually resulted in N-Central hangs and crashes
- Fixed a transient issue related to starting Ephemeral Agents on some N-Central devices the first time

## 0.54.5

Released 2022-12-22

### Bug Fixes
---

- Fixed an issue with deleting actions that caused sessions to fail
- Fixed an issue saving some database calls due to issues from the migration to flex database servers
- Fixed an issue with saving scripts that incorrectly fail with a message that the name is not unique

## 0.54.4

Released 2022-12-19

### Improvements
---

- Added bulk cancel and bulk rerun buttons to the maintenance session list page
Added `Split-Path` cmdlet as well as `$ActionId`, `$SessionId` and `$SessionGroupId` to the included variables
- Improved Ephemeral Agent connection speed
- Discontinued use of WMI CreateProcess which flags AV, specifically Windows Defender for Endpoint
- Made modifications to the light color theme to improve readability

### Bug Fixes
---

- Fixed several issues with the NCentral integration.  Should be more stable overall.
- Fixed an issue where preview/deploy from the dashboard table header were not getting enqueued and would crash instances by running too many sessions as once.
- Fixed an issue with saving local software versions where it would respond with an error about certain fields being required when they shouldn't be
- Fixed an issue with the `Stop-ImmySession` cmdlet where it was not setting the session or stage status to Cancelled
- Fixed issues with our BITS download where it could get potentially stuck trying to download when an ephemeral agent could not be established
- Fixed an issue with computers getting set to needs onboarding incorrectly when an agent gets assigned to an existing computer that is not new
- Centered the text in the "Session #xxx in progress" button
- Fixed an issue with saving the SMTP form
- Fixed an issue where session logs could repeat "Reboots have been suppressed during business hours" over and over

## 0.54.3

Released 2022-11-23

### Improvements
---

- Improved enqueueing of maintenance sessions based on priority.  Adhoc > Onboarding > Scheduled maintenance
- Removed service bus form options for CW Control as the service bus is now always used
- Added a health check to the CW Control integration to report unhealthy when the extension is not up to date
- Updated the connected indicator on the computer details page to have a yellow lightning bolt when the ephemeral agent is connected
- Scripts are now allowed to run for computers that have an ephemeral agent connected even if the agents all report disconnected
- Updated the batch actions on the tenant list page to include tenant preferences. e.g. You can now update tenant business hours in bulk
- Clicking "Attempt Identification Again" or "Rety x failed agents" on the identification tab now immediately triggers identification where before it would take up to 60 seconds

### Bug Fixes
---

- Made computer feature usage calculator no longer count computers that have zero agents
- Fixed a race condition in the Ephemeral Agent that would cause scripts to hang and sessions to timeout

## 0.54.2

Released 2022-11-17

### Improvements
---
- Improved our identification de-dupe logic to automatically associate re-installed agents to the correct computers
- Added more identification logs for some edge case scenarios to help with debugging
- Added onboarding text to dashboard underneath onboarding computers
- Slightly improved performance of preview/deploy functionality on the dashboard page
- Increased the width of the tag selector in the ImmyBot Installer form and on the computer details page

### Bug Fixes
---
- Fixed some issues where newly identified agents would always skip onboarding
- Fixed an issue where non-msp admins could not view tag deployments limited to their tenant
- Added missing times to the time dropdown for scheduling adhoc deployments
- Fixed descriptions on the maintenance task get/set/test script dropdowns
- Fixed some mobile styling issues with the navigation bar and on computer list page

## 0.54.1

Released 2022-11-14

### Bug Fixes
---

- Fixed an issue with CW Control syncs causing CW Control agents to re-sync into ImmyBot unnecessarily

## 0.54.0

Released 2022-11-11

### CW Control Updates
---

We added support for the breaking changes introduced in CW Control 22.9.
We addressed stability issues with Control crashing due to the ImmyBot extension.  On the Control integration form, make sure you check off the new options for using the Service Bus for better performance.

### Pending Identification Updates
---

Agent identification now has logging to help you find root causes for why some agents fail to have scripts run against them. View them in Computers -> Pending Identification -> Show Identification Logs

You can also see the identification logs for successfully identified agents under the Computer -> Agents tab.

We now utilize the serial numbers for devices that come from trusted manufacturers (currently Lenovo, Dell, and HP). If a computer already exists in ImmyBot for a trusted manufacturer, any additional agents with that computer's serial number will skip identification and automatically be associated.

### Improvements
---
- Fixed issue where Intellisense would throw null reference exception when completing variables
- Updated CW Control integration to support CW Control 22.9 (extension version 0.3.0)
- Added immy subscription information to billing details page
- Made subscription portal show within immy frontend instead of a link to chargebee
- Updated the default combined maintenance task script to leverage the latest function scripts in Immy. The new script is `Get-WindowsRegistryValue -Path "HKLM:\Software\Wow6432Node\MySoftwareVendor\MySoftware" -Name EnableFeature | Registry-ShouldBe -Value 1`
- License files are now downloaded before running a configuration task's test script during detection in case the script relies on the presence of the license file
- Added a new tenant preference "Exclude from Cross-Tenant Deployments and Schedules". When a tenant is excluded, all cross-tenant deployments and schedules targeting the tenant or its computers will not be applied when full maintenance is ran. This is particularly useful for Co-Managed IT situations that don't don't want your cross-tenant schedules or deployments.
- Improved startup time of instances in situations where there was a large number of recently added agents
- Added "Change Tenant" in batch actions for the computers table

## 0.53.12

Released 2022-11-09

### Bug Fixes
---

- Removed the ImmyBot Agent from the Tenant -> Mappings table
- Reduced metric reporter frequency to 30 minutes

## 0.53.11

Released 2022-10-20

### Bug Fixes
---

- Fixed a null reference exception that was occurring when sending the maintenance session follow-up email
- Fixed a potential exception that could occur in the N-Central API
- Fixed an exception that occurred when trying to retrieve the online agents for a computer
- Fixed an uncommon issue where some dynamic version scripts were throwing a null reference exception
- Fixed an uncommon exception with ImmyBot Agent connection events that caused the event to not get saved
- Fixed an issue with syncing devices from CW Automate where it would potentially take a few minutes and block other requests
- Fixed an issue where some CW Control and N-Central agents were not automatically onboarding when they should
- Fixed issue where `Get-ImmyComputer -InventoryKeys` metascript was not auto populating the available keys
- Fixed an issue with incorrect breadcrumbs sometimes showing on the computer list page
- Added a missing debug log that indicates when an ImmyBot agent fails to provide inventory data
- Fixed a bug where we were dropping both dedupe markers over the same agent instead of different agents
- Fixed an issue with maintenance sessions reporting failed after re-running an action successfully
- Fixed an issue where loading the deployments list would throw a `ArgumentNullException`
- Fixed an issue with some Chocolatey and Ninite logs not showing up under a maintenance action's phases

## 0.53.10

Released 2022-10-05

### Bug Fixes
---

- Fixed an issue with displaying large software icon sizes on the Library -> Ordering page

## 0.53.9

Released 2022-10-05

### Improvements
---

- SVGs now render correctly when uploaded as software icons
- Increased some low timeout values on the ephemeral agent that were causing devices with slow network connections to fail
- Changed the Pending Identification tab to default sort descending by Date Added since the most recent machines are the ones we are usually looking for.

### Bug Fixes
---

- Fixed an issue with the ImmyBot Agent connected/disconnected events not propagating for pc reboots and pending connectivity sessions
- Reduced likelyhood of `Output CircularBuffer has already over-run requested index` error in scripts
- Ephemeral Agent reconnection is now prevented upon receiving a 500 status code.  This was previously causing agents to stay running indefinitely.
- Fixed an issue on the system update page where the new releases dropdown was not stretching the width like the current release dropdown

## 0.53.8

Released 2022-9-22

### Improvements
---

- The "Suppress Reboots During Business Hours" flag no longer relies on  offline behavior.  If you are suppressing reboots during business hours and you run a session during business hours, then Immy will suppress reboots.  Business hours are now checked on every script execution, and the `RebootPreference` variable passed to scripts will also be updated to `Suppress` if it was not already set. We did this so that scripts that handle reboots can safely rely on this variable.
- The customer list on the Azure page no longer shows the MSP tenant as a selectable option in the Linked Tenant dropdown since the MSP tenant is mapped by default
- Refactored how we handle ImmyBot agent connected and disconnected events.  Instances that heavily utilize the ImmyBot agent will have significantly improved performance.
- The `Enable Automatic Onboarding` field on the PPKG form is now disabled and shows an alert if the onboarding preference is globally disabled or disabled for the selected tenant.

### Bug Fixes
---

- Fixed an issue with loading the AzureAD module for metascripts.  This issue was causing all scripts that relied on AzureAD commands to fail.
- Fixed an issue where syncing the connected state of large numbers of ImmyBot agents would prevent other system jobs from being performed
- Fixed an issue where configuration tasks for already compliant software were executing at the very end of a maintenance session instead of in the expected order
- Fixed an issue where the default upgrade strategy was set to none instead of install over
- Fixed a permission issue where non-admins could not refresh the connectivity status of a computer
- Fixed an issue with downloading the ImmyAgent installer as an `.iso` file where the extension was incorrectly set to `.ppkg`
- Fixed an issue where software set to perform an update would incorrectly report compliant when the software did not specify an upgrade strategy and the upgrade was never performed.  The action will now fail and report "Upgrade failed: No Upgrade Strategy specified on the software."
- Fixed an issue with maintenance action execution ordering. If the currently executing action has dependencies, it will now immediately execute the dependencies instead of waiting until the end of the session.
- Fixed an issue with selecting a license on the deployment details page where the selected license was not shown upon refreshing

## 0.53.7

Released 2022-09-14

### Improvements
---

- Increased the timeout of the Ephemeral Agent's Ping RPC method from 1 second to 5 seconds.  1 second was too short and was unnecessarily causing scripts to fail on machines with high network latency.
- Added a warning message whenever the Ephemeral Agent's Ping RPC method takes over 1 second to respond to help identify machines with high network latency

### Bug Fixes
---

- Fixed an issue with schedules where updating a schedule from a single tenant to cross tenant would delete the schedule. This was happening due to a bug in a database constraint between schedules and tenants.
- Fixed an issue where the connectivity status button on the computer details page was not actually refreshing the agent's connectivity status
- Fixed an issue where repairing a software would trigger full maintenance

## 0.53.6

Released 2022-09-12

### Improvements
---

- Added `Set-ImmyDeviceId` cmdlet to be used during Inventory to keep the UUID of the machine up to date and prevent new computers from getting created when the UUID of the machine has changed due to a feature update.

### Bug Fixes
---

- Fixed an issue where the "Determine Desired Version" phase was running before the "Detect Installed Version" phase. "Detect Installed Version" needs to run first so we can pass the detected version to scripts that may rely on it when determining the desired version.
- Fixed an issue where dynamic versions were not properly installing dependent versions

## 0.53.5

Released 2022-09-09

### Bug Fixes
---

 - Fixed an issue from 0.53.4 where some code changes were unintentionally  included in the release which caused downloading the PPKG to fail

## 0.53.4

Released 2022-09-08

### Improvements
---

- For maintenance task test scripts, we made Immy tolerant of non-Boolean values by displaying a warning when non-Booleans are found on the pipeline along with helper text for preventing output pollution.
- Updated the ImmyBot Agent to support installing beta versions

### Bug Fixes
---
- Fixed a scripting error that caused Immy to indicate there was no output when there was definitely output

## 0.53.3

Released 2022-08-30

### Software Test Script Changes
---

We now execute the software test script during the detection stage for software that have updates available.

**Before**, if a software needed to be upgraded, we would not run the software's test script in detection.  We would perform the upgrade and then run the test script afterwards.  However, if the test failed, the action would fail without any remediation.

**Now**, if a software needs to be upgraded, and it has a test script, the test script will run in detection. If the test script fails, then the repair strategy will be performed instead of the upgrade strategy.  The test script will still be run after the upgrade as it did before.

### General Improvements
---

- Updated the error text for schedule cron expressions to indicate that a schedule can run at most once per day.
- The ImmyBot Agent service sometimes throws an exception about a missing file `CliWrap.dll`, which causes the agent to bork.  When we encounter this exception, we now auto restart the service to resolve the issue.
- Improved the session log message "Detection stage failed: Software Action Id is not specified on the provided configuration task action" to include more information to help diagnose the issue.  It is usually because the deployment contains out-of-date data and needs to be updated.
- Improved the performance of loading the main computer list when sorting by computer name
- Test methods containing multiple outputs now return the result of ANDing those outputs together to compute the overall result.
- Updated Quick Deploy to allow you to choose a desired state. e.g. "Install, Uninstall, Update If Found, Ignore" or "Enforce, Monitor, Audit"
- Added detection of stuck/non-responsive jobs such as the agent identification job, which can initiate a self-restart of backend.
- Added reboot preference dropdown to quick deploy and override forms
- Moved several action columns on tables to the left side for consistency and best compatibility with mobile views.
- Added an option to schedules and adhoc-deplyoments to send detection emails even when all actions are compliant.  This is to allow users whose computers are already up to date to still receive a maintenance email.
- Updated the script list page and session log component to use the Monaco script editor
- Added the CW Automate icon to the main computer list. Clicking the icon opens up the computer in CW Automate.
- Added "Date Added" to the computer list and made it sortable
- Added a simple "new" tag on the computer list for computers that have been added to ImmyBot within the last 24 hours
- Added an 'X' button to easily remove linked tenants from integrations

### Bug Fixes
---

- After a task is created, the `Runs Against` property is now disabled. Changing this value after it is created can cause issues for deployments that are referencing it.
- Fixed an issue with Ephemeral Agent resilient script output logic that would fail to re-connect if the script had never had any output prior to connection loss. (Ex. SonicWall VPN installer script)
- Added missing triggered by text on the session details page when the session was triggered by a schedule or automatic onboarding
- Fixed a width issue on some dropdown buttons
- Fixed an issue with the integration client list re-sorting after you link/unlink a tenant

## 0.53.2

Released 2022-08-19

### Bug Fixes
---
- Fixed an error that showed on the schedules list when a schedule existed that did not specify a time zone
- Fixed issue introduced in 0.53.1 where the current immy version stopped displaying in the sidebar
- Fixed issue introduced in 0.53.1 where the maintenance item ordering page broke
- Fixed issue introduced in 0.53.1 where showing/adding parameters on the maintenance task page broke
- Fixed an issue where monitor results were only showing the last line of output instead of all output
- Fixed an issue where monitor results were overflowing into other components
- Fixed an issue where re-running actions while showing action details would not displaying logs as they came in
- Fixed an issue introduced for instances that signed up after the release of 0.53.0 where identification would fail due to some missing database configurations

## 0.53.1 (un-published)

Released 2022-08-18

### Improvements
---
- Added a `Trigger Now` button to the Azure User Sync preference on the preferences page
- Added a description to the PPKG reset windows checkbox - "Will perform a reset of windows with the remove user data option"

### Bug Fixes
---
- Fixed an issue with agent identification where users were seeing the following error - `Failed attempt to differentiate existing agent and pending agent: 42883: procedure sp_create_computer_from_agent(integer, uuid, boolean, text, text, text, unknown, boolean) does not exist POSITION: 6`
- Updated the alert of the person list page to match the available actions
- Fixed an issue where the software configuration task edit link was missing
- Fixed an issue where the branding logo alt text was still hardcoded to "Immense Networks" instead of the value provided by the branding
- Fixed an issue with cancelling a detection only session from the computer details page -> software tab.

## 0.53.0

Released 2022-08-16

### UI Improvements
---

#### Dark Mode

![image](https://immybot.blob.core.windows.net/release-media/56e75095-ed15-4b01-88d4-08de18d6b3c1)

#### Deploy Software from Dashboard
![image](https://immybot.blob.core.windows.net/release-media/ab6d9b04-43cc-48fa-9a78-5e69f26ba0d7)

#### Session Details

![image](https://immybot.blob.core.windows.net/release-media/db579877-6aa8-4ede-9d7c-c0b8e33917b6)
![image](https://immybot.blob.core.windows.net/release-media/824b4901-aad1-4e16-8f55-c66cb536745e)

#### Main Menu
Moved commonly used Main Menu items to the top, moved less commonly used items under sub-menus

![image](https://immybot.blob.core.windows.net/release-media/130abc75-7a73-4aa2-9af6-61671cd9d79d)

#### Integrations - New look and feel

![image](https://immybot.blob.core.windows.net/release-media/b11cefd6-a36c-4fc9-93fc-07f32028fe2e)

#### Integrations - Embedded Documentation

![image](https://immybot.blob.core.windows.net/release-media/9835acfb-f516-45de-8956-30223d7e3f02)

### Script Editor
---

Moved Script items into the left pane

![image](https://immybot.blob.core.windows.net/release-media/7e9fbe48-4d66-45bd-9b26-759f29aa7c17)

### New Integration - HaloPSA
---
Deploy software/tasks to customers with specified recurring invoice items

### New Parameter Type - KeyValuePair
---

![image](https://immybot.blob.core.windows.net/release-media/a17d9261-c65f-4531-b5e5-4d912b40922c)

![image](https://immybot.blob.core.windows.net/release-media/0c7ef61b-64fc-415b-a29b-c5c4fff0d70a)

### Improvements
---
- ImmyAgent now detects 'dirty' shutdown events of the ImmyAgent with a `shutdown.dirty` file.
- Added a description to /schedules "Show Postpone Button" checkbox
- Improved the integration details page by embedding the integration's documentation
- Added a button that triggers an immediate Azure AD Sync and a note about automatic Azure AD Sync
- Started improving the dashboard page. Added the ability to trigger actions for items in the dashboard
- Added cmdlets `Expand-String` and `New-LiteralString` cmdlets to help deal with strings that should or should not be expanded before being sent to a remote machine.
- Upgraded Intellisense Engine and Monaco Editor to latest versions
- Moved live chat button to the header navbar so it doesn't potentially block buttons on the page
- Added 8 new Ephemeral Agent Timeline events
- Added "Script Bytes Received" metric to system status page
- Fixed an issue with quick assign not setting the correct desired state when running the detection only session
- Made minor improvements to the getting started wizard
- Moved script details into script editor sidebar for convenience

### Bug Fixes
---
- ImmyAgent now sends 'online' events when we reconnect to IoTHub from an ungraceful network loss to prevent session hangs after the computer restarts
- Fixed an issue with the Automate integration where we were unable to retrieve more than 50 Windows patches
- ImmyAgent now handles exceptions returned from an instance during registration, and will continually retry instead of shutting down.
- Fixed a typo in the SMTP port placeholder text
- Fixed an issue with quick assign not setting the correct desired state when running the detection only session
- Fixed an issue with checking online/offline status of agents during a session
- Fixed an issue where a deployment referenced a specific version even when the desired state did not require one.  This was causing actions to fail
- Fixed an issue with displaying the account dropdown on mobile
- Fixed incorrect tooltip on install Immy agent icon in the computer list
- Fixed an issue with the Automate integration where we were unable to retrieve more than 50 Windows patches.
- Fixed issue where piping to Format-Table would result in an error or no output
- Remove disabling of Cortana from PPKG builder output, as it is no-longer supported & may break newer OOBE installs.
- Fixed issue with version restriction selector on License Edit page
- Fixed issue with licenses deleting when saving a license with no tenant selected
- Fixed issue displaying Customers on Azure Sync page
- Fixed an issue with runnable script editor not including the user's tenantId in readonly cloud script editors
- Fixed agent bug that prevents 'online' event on IoTHub reconnection
- Fixed agent bug that would cause the agent to not retry transient registration failures
- Only show Postpone and Update if "start immediately" not checked

## 0.52.7

Released 2022-07-11

### Improvements

---

- The script list page now persists your filters after refreshing or leaving the page.
- Fixed width issues in the maintenance item column on the deployment list page
- Reduced required permissions for N-Central integration. See [the new N-Central integration docs](https://docs.immy.bot/ncentral-integration-setup.html) for details
- Added a new PowerShell cmdlet `Stop-ImmySession` that will cancel the maintenance session it is currently running in

### Bug Fixes

---

- Fixed some potential issues around agent connected/disconnected events
- Fixed potential N-Central exception with re-sending messages
- Fixed potential issue with 'missing' devices from N-Central due to possible filter contamination in N-Central

## 0.52.6

Released 2022-06-27

### Improvements

---

- Set the default install script for new software to the "Manual Install Script" and the upgrade strategy to "Install Over" whenever we don't have another specific install script to provide
- Set the default software installer type to "Installer File"
- Updated the example New-DynamicVersion script
- We now show a confirmation modal when choosing the "Wiped" option for resolving an agent identification conflict.
- You can now see Cloud Sessions from the main Sessions list!
- Added warnings when the ephemeral agent is failing to establish a connection to help users identify causes for failing script execution
- Fixed an issue with the detection stage stuck running when it fails to execute scripts in the beginning of the stage
- Improved timeline connected/disconnected events. There were edge cases that would show multiple connects/disconnects back to back.
- Removed timeline computer online/offline events to avoid confusion. These events were never actually based on a computer coming online or going offline. We simply emitted "online" when an agent connected and happened to be the only online agent. Similarly for "offline" events, we only emitted the event when an agent disconnected and all agents were offline. ImmyBot does not actively check whether a machine is online or offline. It only checks whether it has any connected agents to use. This concept will be further improved upon to help resolve issues with agents incorrectly reporting connected/disconnected.
- Removed link to software/task on deployment list since people are clicking it thinking it is the edit deployment link
- Moved the software/task selector back above the target selector on the deployment edit page
- Removed the media nav item since it's not actually useful

### Bug Fixes

---

- Moved "Update If Found" from underneath "Installed" to the same level as "Installed" for clarity. A software can be "installed, uninstalled, ignored, or updated if found"
- Fixed an issue with cloud task previews failing with "device offline"
- Fixed an issue where the ImmyBot agent update action would not run when the agent was offline
- Fixed an issue with the agent updates stage, onboarding stage, and resolution stage not honoring pending connectivity
- Fixed an issue where the resume and cancel session buttons were incorrectly showing for postponed sessions
- Fixed an issue with CW Control and CW Automate health error messages excluding important details that can help diagnose the problem
- Fixed an issue where we were not checking if a configuration task is actually marked as a configuration task. This resulted in tasks getting run when they should not have.

## 0.52.5

Released 2022-06-13

### N-Central Beta Updates

---

- Fixed an issue with exceptions that may occur inside the N-Central device-sync job causing memory to bloat
- You can now get registration tokens from the NCentral integration via new PSCmdlet `Get-NCentralRegistrationToken`

![image](https://immybot.blob.core.windows.net/release-media/501dd3bc-d823-40a0-a307-000ec5185e6a)

### Other Improvements

---

- Under "Preferences", the description of the User Affinity Sync feature says it will run every 4 hours; this is incorrect. Verbiage was changed to indicate it will run every 24 hours.
- On the integration details page, a confirmation modal has been added when clicking the "Bulk create tenants..." button to prepare users that this will cause code execution for linked clients.
- Added more improvements to online/offline agent handling during maintenance sessions
- Updated the online/offline event receiver for CW Control to return immediately in an effort to close requests faster

## 0.52.4

Released 2022-05-31

### Improvements

---

- Removed unnecessary checkboxes from the Computers table on the "Edit Schedule" page
- Immy live chat now supports screenshare! Immy support can now request access to view your screen to help resolve issues faster.

### Bug Fixes

---

- Fixed an issue with the maintenance email actions requiring authentication

## 0.52.3

Released 2022-05-27

### Improvements

---

- ImmyAgents no longer need to see a valid board serial number in order to complete registration or rekey. Instead, ImmyAgent may fall back on and rely on an 'ImmyHWID' (Immy hardware id), when a board serial is not available. ImmyHWIDs are derived from CPU, BIOS, MOBO, GPU, and TPM information where available.
- Updated maintenance sessions to listen on agent connected/disconnected events instead of computer online/offline events which have faster responses and higher success rates
- When a new agent comes into ImmyBot, we now kick off the identification job immediately if it isn't already running in an effort to speed up identification
- Added session logs for dependencies indicating what they are for. e.g. `Software A depends on Software B → If not installed then install`.
- The actions in the maintenance email (Reboot Now, Update Now, and Postpone), now link to a form on the ImmyBot instance instead of linking directly to the backend api. The reason for this is because some spam filters will automatically follow links in an email, which has accidentally caused computer reboots. Moving the link to a form allows spam filters to no longer be able to trigger the action automatically.

### Bug Fixes

---

- Fixed an issue causing the computer details page to sometimes not load
- Fixed an issue with the ImmyAgent rekey request not being received
- Fixed an issue where `Get-ImmyComputer` was incorrectly reporting offline
- Fixed an issue where configuration file parameters were not being downloaded when the configuration task did not have any enabled scripts
- Fixed an issue with displaying the dependency badges on maintenance actions
- Fixed an issue with the schedule's day of week selector cutting off the last characters of "Wednesday"
- Fixed an issue with the CompareTo-ImmyBotVersion metascript
- Fixed an issue with some maintenance action start times showing "2021 years ago" instead of "Unavailable" when the action never started
- Bump Azure IoTHub packages to resolve some connection issues with the ImmyAgent

## 0.52.2

Released 2022-05-25

### Ephemeral Agent and Identification Improvements

---

- **ALL** scripts now run through the ephemeral agent, even during identification and computer de-dupe logic 🎉
- Additional exception information is now visible in Identification Failed tab, and in session output. This furthers insight for users to understand and fix potential reasons why the providers may have failed to run our agent.
  ![image](https://immybot.blob.core.windows.net/release-media/22b9d763-3a43-4403-8c01-70e020e3a303)
- Fixed an issue where the date was not being set correctly when adding a AgentIdentificationFailure log, leading the user to think this issue happened at the beginning of time!

### Other Improvements

---

- Added computer batch actions button on the tenants -> tenant details -> computers tab
- You can no longer create a schedule that executes within one hour of detection. This is a safety measure to help prevent reboots during business hours
- Added a checked to the schedules page for "Execute maintenance immediately after detection" to make it easier for those that do actually want to run execution after detection. When checked, you cannot set the execution time.
- The schedule list "Next Run" column now sorts correctly and also shows the browser's local "Next Run" time
- Added clarity to session logs when we are checking if an agent is online
- Quick deploy actions now use Offline Behavior: Apply on Connect
- Auto onboarding sessions now use Offline Behavior: Apply on Connect
- Computer list batch actions - Run Maintenance now uses Offline Behavior: Apply on Connect
- On the schedule details page, renamed "Target Category" to "Runs Against", and changed the options to "Computers" or "Cloud"

### Bug Fixes

---

- Fixed an issue with the primary user not being found when sending emails after an onboarding session
- Fixed an issue with checking off "Send follow-up email" on the onboarding form where it would not actually send the email
- Fixed an issue with unhealthy integration messages not showing the real error message
- Fixed an issue with unhealthy integration agents showing on the computer onboarding form
- Added missing script parameter `$LicenseFilePath` to detection scripts and configuration tasks
- Removed maintenance tasks from accidentally showing in the software prerequisite dropdown
- Updated the computer batch actions sidebar to have better clarity
- Fixed an issue with loading the deployment list when a deployment existed for a computer or person that no longer existed
- Fixed an issue where Get-ImmyAzureAuthHeader -UseMspTenant was failing if the Tenant didn't have an Azure mapping
- Fixed an issue where Get-ImmyAzureAuthHeader -UseMspTenant was returning an access token for the Tenant instead of the MSP
- Fixed an issue where some failed sessions were getting marked as pending connectivity
- Fixed some more issues around offline/online agent detection during sessions
- Implemented a HTTP Concurrency limit for requests to N-Central to prevent issues with too many requests hitting their backend
- Fixed an issue with not being able to skip onboarding
- Fixed an issue with the "Retry X failed computers" where it was re-attempting to identify all failed computers
- Fixed an issue with "Analyze Installer" not returning any data
- Fixed an issue with script output in session logs not being truncated to the last 5 lines
- Fixed an issue with the Immy Agent installation request not reporting whether the integration is disabled or unhealthy

## 0.52.1

Released 2022-05-18

### Bug Fixes

---

- Fixed an issue where tag deployments were not resolving during full maintenance
- Fixed an issue where cloud deployments were not resolving during full maintenance

## 0.52.0

Released 2022-05-18

### Tags

---

You can now add tags to computers, and deploy software to tags! Manage tags under the settings link on the sidebar. Tags help in scenarios where workstations are shared by a variety of users and there is otherwise not a common property to target with a filter script.

Tags can be added to computers as a batch action on the computer list page.

![image](https://immybot.blob.core.windows.net/release-media/ac94e766-2362-48b0-936d-17a901aea82c)

Tags can also be added to a computer on the details page.

![image](https://immybot.blob.core.windows.net/release-media/d0a80ede-0dc5-42e9-a4d6-569eccd498be)

Tags can be deployed as a cross-tenant target scope.

![image](https://immybot.blob.core.windows.net/release-media/2903300b-656c-413c-a180-4a83b4de491f)

Tags can also be deployed as a single-tenant target scope.

![image](https://immybot.blob.core.windows.net/release-media/aa721717-f2ac-495e-88cd-b098abb7c3fb)

Tags can be added to an ImmyBot installer to automatically set tags for new computers

![image](https://immybot.blob.core.windows.net/release-media/1edb4f23-c17f-4ae5-9cb1-2863ca29dfbb)

### Exclude Computer From Maintenance

---

You can now specify that a computer be excluded from maintenance. Excluded computers will not be allowed to run any type of maintenance session.

Settings -> Preferences -> Company Preferences -> Computers Excluded From Maintenance

or

Tenants -> Select a tenant -> Preferences tab -> Computers Excluded From Maintenance

![image](https://immybot.blob.core.windows.net/release-media/900883d7-4019-4d50-b41d-b4a103adc235)

### Immy Chat Integration

---

_Added in 0.51.5_

We added LiveChat to Immy to make it easier for you to get support

### Session Script Execution Improvements

---

Before executing a script on a device, we now check if it is online. If it is not online, we verify whether any of its agents are incorrectly reporting online and refresh the status appropriately. If it is still not online, we will wait up to 30 minutes for it come back online. If it is still not online, then we will mark the session as Pending Connectivity (only for Apply On Connect) or cancel the session due to the computer being offline.

### Other Improvements

---

- On Immy startup, we now sync the online/offline state of all ImmyBot agents
- Added an hourly job to pull the latest online/offline state of all ImmyBot agents
- Updated parts of the frontend codebase with typescript to prevent accidental bugs
- Improved performance of loading certain pages that relied on fetching clients from a provider
- On the deployment details page, deploying to over 10 computers will now prompt to confirm this is the action you want to take
- Active Ephemeral Agents will now prevent Windows from going to sleep to keep sessions from halting
- A new preference has been added to aid in development of Ephemeral agent, as-well as diagnosing of bugs
- Added Offline Behavior selector to the computer onboarding form and set the default option to "Apply On Connect"
- The Run Maintenance button on the computer details page now defaults Offline Behavior to "Apply On Connect"
- The Run Maintenance button on the computer details and list pages now provide a dropdown for the reboot preference
- The Run Maintenance button on the computer details and list pages now have a confirmation modal
- Azure groups now include devices as long as you grant ImmyBot the Device.Read.All permission
- Azure groups now include all sub groups
- Improved the action logs and result message for failed dependencies
- Added a Preferences tab to the Tenant details page
- Updated PowerShell Editor Services from 3.1.5 to 3.3.5

### Bug Fixes

---

- Fixed an issue in the ephemeral agent that prevented the agent from exiting when finished running PowerShell
- Fixed an issue with uninstall strings in the registry not containing quotes around paths with spaces
- Fixed an issue where devices with unknown operating systems (non windows) were coming into Immy
- Fixed an issue where dependencies for software set to update if found would run even if the software was not found
- Fixed an issue where command line uninstall scripts with spaces in the path were not being wrapped in quotes
- Fixed an issue where the access request button was not visible when access requests were disabled
- Fixed an issue where failed dependencies were being removed instead of failed
- Fixed an issue with the branding preview and test email not showing the mascot name

## 0.51.5

Released 2022-05-06

### Chat with ImmyBot

---

- Added a live chat button to ImmyBot as another option for support requests

### Bug Fixes

---

- **COMMAND LINE WORKS AGAIN!** Fixed an issue where Command Line (non-PowerShell) scripts would not run correctly, resulting in software uninstalls not working as expected
- Fixed an issue where maintenance actions with a prerequisite dependency would not execute after the dependency finished successfully
- Fixed an issue where Immy support would be unable to regain access after expiration
- Fixed an issue with the "Show Details" link on the computer software tab not opening
- Increased the timeout for the ImmyBot Agent to connect from 20 seconds to 60 seconds since setting up the ephemeral agent on some machines may take longer
- Fixed an issue with configuration tasks not displaying underneath the software action
- Fixed an issue with configuration tasks not running when using quick deploy

## 0.51.4

Released 2022-04-27

### Deployment List Improvements

---

- Removed the button "Show Recommended Deployments"
- Recommended deployments and the ability to "Approve/Dismiss" them now show up in the list
- Updated the group by filter and added two new filters.

![image](https://immybot.blob.core.windows.net/release-media/98b28b56-ef88-4e63-b850-b5171d28d915)

### Session Log Improvements

---

- Made several logs more concise
- Added action name and stage name to the top level logs
  - ![image](https://immybot.blob.core.windows.net/release-media/0081b188-7cac-4f88-be9c-bed8871ee2df)
- Checking the box to the left of actions do a better job of filtering to the relevant logs for that action
  - ![image](https://immybot.blob.core.windows.net/release-media/5bc3e22c-7799-421c-8858-cdb4d2d4a55e)

### Bug Fixes

---

- Fixed a performance issue with a timeline events database query
- Fixed an issue that was causing the Ephemeral Agent to not extract on machines running Windows PowerShell 4 or below
- Fixed issue where ImmyBot would not verify dependencies for software that is already compliant

## 0.51.3

Released 2022-04-21

### Bug fixes

---

- Fixed an issue with upgrading to 0.51.3 where the instance would fail to start if you had a branding that did not specify a from address (which is now required)

## 0.51.2

Released 2022-04-21

### Branding Updates

---

- Added color picker for `Text Color` and `Table Header Text Color`
- Branding Logo and Mascot images are now optional
- Added live branding preview

![image](https://immybot.blob.core.windows.net/release-media/3466173c-3fbd-4d3b-b56f-1c73d4cbae21)

### Other Improvements

---

- Added more details such as the reboot preference to the session details page. Also added a snazzier stage indicator.
  - ![image](https://immybot.blob.core.windows.net/release-media/5d96e0e4-9928-4f7b-8678-102753559cde)
- Changed access request default options to Three Days and Admin
- Maintenance Tasks now have the "Ignore" option just like software and will take precedence over other deployments for the same task and target group.
- Added desired software state "Any" as an available option for software that use dynamic versions
- Maintenance emails no longer show software actions that have a desired state of "Update If Found" and no detected version.

### Bug Fixes

---

- Fixed an issue with saving a tenant's default time zone
- Fixed an issue with the software/task selector not correctly selecting tasks on the schedule and dashboard page
- Fixed an issue with chocolatey items not showing in the software/task selector
- Removed ability to use metascripts to define schedule targets (since metascripts do not resolve to list of computers)
- Fixed an issue with configuration task file parameters not getting downloaded before the software's action runs
- Fixed an issue where the Cloud Script execution context was not selected by default when creating a new dynamic version script from a software
- Handled some common application initialization failures more gracefully
- Fixed an issue with metascripts being able to override certain variables that were automatically provided.

## 0.51.1

Released 2022-04-12

### Integration Health

---

Integrations can now have a health status of `Healthy`, `Degraded`, `Unhealthly`, or `Disabled`.

- Healthy: All is well
- Degraded: Started experiencing issues in the last few minutes
- Unhealthy: Consistently experiencing issues (integration is no longer usable)
- Disabled: Integration has been explicitly turned off by a user

Unhealthy integrations will return to healthy automatically when transient issues subside.

An alert with the latest message is shown on the integration details page.

![image](https://immybot.blob.core.windows.net/release-media/e1a32644-c0a0-4a71-a77d-51ffc2cec2a9)

A badge has been added to the integration list and on the computer details -> agents tab.

![image](https://immybot.blob.core.windows.net/release-media/683eddb6-ffcf-4d6c-b9f7-6adb15a0898e)

![image](https://immybot.blob.core.windows.net/release-media/bd0cdf65-4eab-442d-8c70-e8ca407bcbfd)

The "Download ImmyBot Agent Installer" dropdown will now be disabled if the integration is unhealthy or disabled.

![image](https://immybot.blob.core.windows.net/release-media/41646a94-3576-4a08-b8d6-8132eebab391)

### Other Improvements

---

- Schedules can no longer be created with cron expressions using a `*` `,` `-` or `/` in the minute or hour position to help prevent to frequent scheduling.
- **Important:** Schedules that are currently using a `*` `,` `-` or `/` in the minute or hour position will be automatically disabled in this version.
- Software items in emails show "Up to Date" after successfully updating instead of "Update Available" which causes confusion whether the software has actually updated
- Quick Assign and Assign actions are no longer disabled when the computer is already running a maintenance session
- Added OS version after the OS name in the computer details overview info
- MSP non-admins can now see the recommended deployments on the list page to know that they exist
- Added detected version to items in the software tab
- Removed the integration priority table and details since they are no longer applicable
- When a maintenance session is manually resumed, the name of the user that resumed it now shows up in the logs. Or if it was resumed from an email, then it will indicate that a user clicked the "Update Now" button in the email.
- Added field for maintenance task notes.

### Bug Fixes

---

- Fixed an issue where the dynamic version response was incorrectly cached when the script was shared for multiple software and required different output for each software
- Fixed an issue where the software detection radio options were disabled and unable to be changed
- Fixed an issue where the "Skip x onboarding computers" button would disable even if you had computers selected
- Undid the change that disabled the onboarding tab since it was a bad decision
- Fixed an issue with slug not saving when creating a tenant

## 0.51.0

Released 2022-04-08

### Onboarding Form: Maintenance Task Parameter Override

---

- New checkbox added to maintenance task parameters on the deployment details page: 'Allow override from computer onboarding'

  ![image](https://immybot.blob.core.windows.net/release-media/882f6817-8b54-4d14-8ce9-f85d3fabee5e)

- The checked parameters will show on the computer onboarding form, allowing the user to override the value just for the onboarding session

  ![image](https://immybot.blob.core.windows.net/release-media/1e37389e-827a-4ec3-a9d6-20e141dcfd59)

### Other Improvements

---

- Implemented a Get-Hash cmdlet in the Metascript engine useful for interacting with APIs like NinjaRMM and Mimecast that require HMACSHA1 signatures
- We moved the Target Selector above the Software / Task Selector on the deployment page since it felt more natural to answer "Who am I creating a deployment for?" before answering "What am I creating a deployment for?"
- Software Display Name Regex detection now supports capture groups to pull the version

  ![image](https://immybot.blob.core.windows.net/release-media/60a6c664-4047-42b1-9966-0c8566713670)

- Added Azure ID column to the User List page
- Improved handling of integration API routes
- Added a "Do not remember" option when overriding an "Update If Found" deployment, and added more options for overriding certain desired states.

  ![image](https://immybot.blob.core.windows.net/release-media/4b5328d4-a1e0-4862-abdd-af62942286ec)

- Added Tenant Slug. `$TenantSlug` is now exposed for all scripts executed against a computer. You can also conveniently edit the tenant slug directly in the Tenant List.

  ![image](https://immybot.blob.core.windows.net/release-media/060b53e2-e7f5-45ed-be46-2403613662fa)

- Hid the maintenance item selector behind a checkbox on the schedule details page since it was causing some confusion

  ![image](https://immybot.blob.core.windows.net/release-media/d5b18e5a-7169-4925-af55-bcef87a90ae6)

### Bug Fixes

---

- Fixed an issue where dynamic versions that throw a terminating exception were not displaying the exception message under the maintenance action
- Fixed an issue with the "New Version" notice not showing up
- Fixed an issue preventing the Getting Started Wizard modal from showing
- Fixed an issue with configuration tasks running before the software was deemed compliant
- Fixed an issue with non-msp users not being able to create configuration tasks from the software details page
- Fixed various issues with deploying Ninite software
- Fixed issue with software repair not re-installing software
- [Global Software Only] Fixed an issue with saving a custom download installer script to a global software
- Removed double base64 encoding that triggered alerts in BitDefender and Arctic Wolf
- Fixed the script documentation link
- Fixed issues with Invoke-ImmyCommand forcing terminating errors instead of honoring the error action preference set by the script
- Fixed an issue with configuration task parameters not being provided to the test script when run during detection
- Fixed an issue with loading deployments when you have multiple of the same provider type enabled
- Fixed issues with loading CW Control, Automate, and Manage target groups on the deployment details page
- Fixed some exceptions that were occurring when sending emails
- Removed duplicate "Should not be present" text showing in the maintenance actions list

## 0.50.13

Released 2022-04-1

### Capture Version from DisplayName with Regex

---

For software that puts its version in the DisplayName instead of the DisplayVersion field like this:

![image](https://immybot.blob.core.windows.net/release-media/5fb9b29c-3f67-486f-b34b-3b85ff8a9ca0)

You can now use a capture group to capture the version from the DisplayName

#### Example

HexCmp 2.34.1 can be captured with

```regex
HexCmp (\d+\.\d+)
```

### Script Editor Improvements

---

Within filter scripts, Get-ImmyComputer -InventoryKeys now shows valid InventoryKeys

![image](https://immybot.blob.core.windows.net/release-media/76854789-9bf2-484b-9bd2-875f2ad55bc9)

## 0.50.12

Released 2022-03-29

### Improvements

---

- Made the software override options more similar to the quick deploy options
- The ImmyBot Agent no longer writes and executes scripts from C:\Windows\Temp\ImmyBot.
- You can now add a Tenant Slug under the "Edit" tab on the Tenant Details page. This value is exposed as the variable `$TenantSlug` for scripts that run against this tenant's computers.

### Bug Fixes

---

- Fixed an issue preventing the 'Getting Started Wizard' from showing
- Fixed an issue with non-MSP users not being able to create configuration tasks from the software details page
- Fixed an issue with the 'New Version' notice not showing up
- Fixed an issue with configuration tasks running before the software was deemed compliant
- Fixed an issue where dynamic versions that threw a terminating exception were not displaying the exception message under the maintenance action

## 0.50.11

Released 2022-03-21

### Improvements

---

- Added ability to choose "install" when overriding "update if found" deployments on the quick deploy form

### Bug Fixes

---

- Fixed an issue where deployments with the same target type were resolving "update if found" as a higher priority than "latest version"
- Fixed an issue where scripts run in Control were visible in the Commands tab
- Fixed an issue where registry manipulation scripts would fail with `ProviderNotFound: Microsoft.PowerShell.Core\Registry`

## 0.50.10

---

Released 2022-03-14

### Intellisense Improvements

---

Intellisense no longer restarts when syntax error is detected.

Quickfix Actions work

![image](https://immybot.blob.core.windows.net/release-media/883af21b-7a81-415b-8756-ff889273e390)

![image](https://immybot.blob.core.windows.net/release-media/5e1e1e7a-70cf-4406-b4ba-4adfe02521c9)

No more duplicate definition on hover

![image](https://immybot.blob.core.windows.net/release-media/7b58fe4b-7bf6-4a42-8ea5-3a24f072f98f)

### Bug Fixes

---

- Fixed an issue with downloading ImmyBot Agent EXEs which would intermittently fail
- Fixed an issue where an unreachable integration could cause ImmyBot background jobs to not start up correctly
- Fixed a null reference that could occur when re-running a maintenance action
- Refactored some ephemeral agent PowerShell code for easier testing

## 0.50.9

---

Released 2022-03-08

### Bug Fixes

---

- Fixed a bug that was causing new instances of Immybot to crash when starting up

## 0.50.8

Released 2022-03-04

### Onboarding Deployments

---

The **Onboarding** target type has been moved to a separate checkbox so that you can limit deployments to onboarding only AND use the target type filters.

### ImmyAgent Improvements

---

Updated internal infrastructure to utilize our new [extended verification code-signing certificate](https://www.digicert.com/signing/code-signing-certificates#EV-Code-Signing).

We currently sign:

1. ImmyAgent executable & MSI/EXE/PPKG Installers
2. Ephemeral Agent executable
3. Static PoSH run on computers

In addition to being more secure, this ensures our software is no-longer flagged by SmartScreen.

**IMPORTANT NOTE**

Customers utilizing software such as ThreatLocker _MUST_ ensure our new certificate is whitelisted, as our new EV cert required "LLC" to be present on our CN and O.

![image](https://immybot.blob.core.windows.net/release-media/40220de1-d9f9-48fb-a39e-ebb791bd19fe)

### Bug Fixes

---

- Improved exception handling during maintenance sessions
- Fixed an issue with re-running cloud scripts from a session log where it would throw an exception
- Fixed some performance issues and improved caching of function scripts

## 0.50.7

Released 2022-02-25

### Maintenance Task Serial Execution

---

A maintenance task now has the option to "Execute Serially".

When checked, this maintenance task is guaranteed to only have one instance active at a time.

e.g. If three maintenance sessions have an action for a maintenance task that executes serially, then one session will execute the maintenance task while the other two wait for it to complete. Once the first completes, the second will execute. Once the second completes, the third will execute.

This is useful for maintenance tasks that rely on the state of subsequent executions.

### Other Improvements

---

- Added a `Status` and `Types` column to the CW Manage client list on the integration details page so you can easily filter your list to clients you want to create tenants for. Also made the `Linked Tenants` column filterable to "Linked" or "Not linked". The `Bulk create tenants for unassigned clients` is now `Bulk create tenants for filtered unassigned clients` and will only bulk create tenants for those visible rows matching the table filters.
- Added checks to ensure that the identification job is running properly

### Bug Fixes

---

- Fixed an error that was preventing the computer overview page from loading
- Fixed an issue with scripts running multiple times if you opened, closed, and re-opened a script editor
- Fixed issues with the CW Control integration not updating the device name, os name, and serial number of the agent

## 0.50.6

Skipped

## 0.50.5

Released 2022-02-18

### Improvements

---

- Updated ImmyBot from dotnet 5 to dotnet 6
- Non-existent items on the deployment ordering page are now automatically removed
- Added description below the "Suppress reboots during business hours" checkbox to indicate that it is only applied for maintenance sessions that resume after a device comes back online
- Deployments can now be disabled which will exclude them from being applied during full maintenance sessions. This can be useful if you want to stop a deployment from happening without deleting it.
- ImmyAgent PPKG's should now work on Windows Home editions
- Improved the load time of the maintenance session list for instances that have 1+ million sessions

### Bug Fixes

---

- Removed unnecessary device online check when running metascripts through the script editor
- Fixed issue with parameters not getting provided to scripts that are re-run from maintenance session logs
- Fixed a format exception that occurred when attempting to schedule adhoc deployments to run after midnight
- Fixed a null reference exception thrown when using the "Limited" option on the "Software Access Level" field
- Fixed issue with the "Last logged on user" fields not showing on the computer overview tab
- Updated the error text of user scripts to indicate whether or not there is currently a logged in user
- Fixed an argument exception that occurred when trying to uninstall a software by product code
- Fixed an internal issue with migrating items to global
- Fixed an issue with maintenance action timeline events that was preventing them from showing in the list
- Fixed a bug where cancelling scripts from the editor would not close the PowerShell stream reader
- Updated broken links to https://docs.immy.bot
- Fixed a poor performing query with instances that have millions of maintenance sessions
- Fixed issue allowing you to click the install Immy agent button on computers that did not have an online agent to install it with

* Fixed issue where local accounts created by the PPKG were not being hidden
* Fixed potential issue where local accounts created by the PPKG were not being added to the local administrators group if the local administrators group name wasn't called 'Administrators'

## 0.50.4

Skipped

## 0.50.3

Released 2022-02-11

### ImmyBot Agent Updates

---

- Fixed a bug where agent installers that were created before 0.50.0 were failing to register on new devices
- Increased the verbosity of logging during agent installation for easier debugging
- Fixed a null reference issue occurring on startup
- Updated the MSI uninstallation to remove the `config.json` and `registration.json` files located under `C:\ProgramData\ImmyBotAgentService`.

### Improvements

---

- Increased the Ephemeral Agent named-pipe connection timeout from 10s -> 60s to allow computers with extremely poor PowerShell initialization time likely due to system issues to still run scripts
- Added software / task descriptions to deployment details page and license details page. The descriptions are accessible by clicking the the question mark button

### Bug Fixes

---

- Fixed an issue where filter scripts and software auto update scripts were not showing any output in the script editor
- Fixed a label issue on tenant category schedules and tenant category deployments
- Fixed an issue on the schedule details page where the maintenance item selector would should a blank selection by default
  ![image](https://immybot.blob.core.windows.net/release-media/2b3ae6f7-2d72-4952-8aa5-37afd78cf20a)
- Removed unnecessary code that fetched software twice during detection
- Fixed an issue where the selected computers on the new computers page would de-select automatically
- Put in an update to the CW Control ImmyBot extension to work on CW Control 21.15+. CW Control 21.15 introduced a breaking change to the API.
- Fixed an issue where cross tenant device group target types were taking precedence over tenant specific target types

## 0.50.2

Released 2022-02-09

### Bug Fixes

---

- Fixed an issue with azure sync job creating duplicate users in the MSP tenant
- Fixed an issue where a disabled integration could not be deleted

## 0.50.1

Released 2022-02-08

### Improvements

---

- When ImmyBot restarts, it will now attempt to restart any maintenance session that was active when it shutdown. Before, it would only attempt to restart scheduled sessions
- Restarting maintenance sessions should now be idempotent. If an action was running when the backend rebooted, then it will be restarted.
- Removed some thread blocking code to improve performance

### Bug Fixes

---

- Fixed issue with Microsoft.PowerShell.Security functions not found in metascripts
- Fixed an issue with "Uninstall By Package Info" failing to uninstall via product code
- Fixed an issue where pending connectivity sessions were not triggering for computers that had exactly one agent

## 0.50.0

Released 2022-02-07

### Intellisense `(beta)`

---

Intellisense can be enabled on the application preferences page (disabled by default). Having intellisense inside the script editor is going to make your life much easier when it comes to writing ImmyBot scripts.

This feature is considered `beta` and there may be a few bugs present that will be get patched over the next few releases.

![image](https://immybot.blob.core.windows.net/release-media/c3e74cc2-fafa-40e9-9fca-66ea816233cf)

![image](https://immybot.blob.core.windows.net/release-media/5c2add32-38b5-4aca-9cf2-176b768be6a5)

![image](https://immybot.blob.core.windows.net/release-media/3f5d35d8-1963-4a6a-96a1-7e6fe22dd44c)

![image](https://immybot.blob.core.windows.net/release-media/92762a7f-5884-4e80-ae74-26403ebcfa01)

### Other Improvements

---

- Added navigation link for tenant on the computer overview tab and the maintenance session list
- Improved performance of filtering maintenance action table and dashboard results
- Improved performance for instances that have a large number of ImmyBot agents by optimizing some database calls
- Added compression support for JavaScript and CSS assets to decrease the initial page load time

### Bug Fixes

---

- Fixed an issue with some deployments not resolving to computers that are auto-onboarding
- Fixed an issue where clicking `Include Offline` in the Onboarding computer list would be de-selected after 5 seconds
- Fixed an error that showed on the tenant details page for ImmyWorkbench instances that do not have schedules enabled

## 0.49.9

Released 2022-02-02

### Improvements

- Inventory during a maintenance session now runs before resolving deployments since a deployment may rely on inventory data. e.g. Filter Scripts

## 0.49.8

Released 2022-01-27

### Bug Fixes

---

- Fixed a bug with quick deploy where maintenance actions were failing due to `Parameter <X> is marked required... and no value has been set`

## 0.49.7

Released 2022-01-26

### Improvements

---

- General cleanup/refactoring to improve performance
- Added an index that improves some maintenance session queries

### Bug Fixes

---

- Fixed an issue with uploading licenses and software installers with users who have names that contain non-Latin1 characters
- Fixed an issue where failed audit tasks were showing as compliant
- Fixed an issue where the maintenance item selector was not showing correct results for the Tenant target category
- Fixed an issue uploading an MSI where the `Uninstall MSI By ProductCode` script was being used on the software instead of the correct `Uninstall MSI By UpgradeCode`. The `Uninstall MSI By ProductCode` is now set on the software version. The software upgrade strategy is also defaulted to `install/over` instead of none.
- Fixed several issues around script timeouts and memory management
- Fixed an issue with some slow computer list queries
- Fixed an issue with software test scripts causing detection to fail due to missing required maintenance task parameters

## 0.49.4

Released 2022-01-19

### Improvements

---

- Significantly improved performance of re-initializing maintenance sessions upon the server starting up
- Immy will now wait for one or more of a device's agents to reconnect when the device goes offline while attempting to run a script

### Bug Fixes

---

- Fixed an issue with application restarts taking a long time to re-enqueue pending maintenance sessions
- Fixed an issue with some exceptions that occur in maintenance sessions causing the sessions to be stuck in the "Created" status

## 0.49.3

Released 2022-01-18

### Improvements

---

- Reduced the number of concurrent inventory jobs that can run to preserve performance until it can be refactored
- Delivery of Ephemeral Agents on computers that don't support TLS v1.2 no longer spit out scary looking error. Instead, it now shows a warning that it will fallback to TLS v1.0.

![image](https://immybot.blob.core.windows.net/release-media/f75ad884-21de-4737-9c79-0c0d55a05411)

- Monitor maintenance tasks now run during execution except for previews which still run during detection

### Bug Fixes

---

- Fixed an issue with maintenance item specific schedules causing sessions to get stuck in created
- Fixed an issue with ephemeral agents not working correctly on Win7 x64-era machines
- Fixed issue with immy version not showing in footer

## 0.49.2

Released 2022-01-18

### Bug Fixes

---

- Fixed an issue where scripts run from the editor could throw the error: `An item with the same key has already been added. DebugPreference`

## 0.49.1

Released 2022-01-17

### Improvements

---

- The `$VerbosePreference` and `$DebugPreference` in a metascript now get passed down to the computer
- The top navbar on smaller screen sizes is now accessible from a collapsible button
- Added docs nav icon linking to https://docs.immy.bot
- Standardized task verbiage in the UI
- Added an additional task type filter on the task list page for "All, Computer, Cloud, Configuration"
- `Write-Progress` now appends to the session log output
- Added a health check for when the Hangfire server crashes and fails to restart
- Changed chocolatey actions to no longer use a hardcoded path `C:\ProgramData\chocolatey\bin\choco.exe`. We now retrieve the path by using `Get-Command choco -ErrorAction Stop | select -expand Source`. This ensures we can run chocolatey when it is not in installed in the default location (Looking at you `SyncroRMM`).
- Deployment filter scripts can now utilize function scripts
- Added license description field
- Improved performance of resolving azure group deployments

### Bug Fixes

---

- Resolved issue where computers running non-English version of Windows could not run any scripts. This issue also prevented successful identification for those computers.
- Resolved parameters not being passed to user-context scripts
- Fixed an issue with boolean deployment parameters not honoring `false`
- Fixed an issue with adhoc deployments not using the parameters specified on the page
- Fixed an issue with sessions showing passed when it should show partial passed
- Fixed issue where duplicating deployments did not copy over the parameter values
- Fixed issue with [ctrl-s] saving scripts from the editor
- Fixed a bug where software from deleted deployments were still showing in the assigned software tab
- Fixed a bug where the ephemeral agent retry logic was being ignored
- Fixed an issue with the logs panel failing to stay scrolled to the bottom
- Fixed an issue where inventory session logs were not showing up correctly
- Fixed an issue where needs attention actions were showing "unavailable" for the date time
- Fixed word wrapping on maintenance task parameter text
- Fixed a bug where deployments targeting "All computers / No Filter" would show "Workstations and portable devices" instead
- Fixed a bug where uploading files for global maintenance tasks would fail
- Fixed a bug where schedule and deployment provider specific target data was not loading properly

## 0.49.0

Released 2022-01-11

### Improved Performance

---

In this release, codenamed "Cheetah" we achieved a **20x** improvement in script execution performance through the use of WebSockets, Named Pipes, and removing code that is no longer necessary since the introduction of the Ephemeral Agent.

We also made restarting machines faster by using the new event driven Wait-ImmyComputer cmdlet when waiting for computers to reconnect after a reboot.

### Apply on Connect

---

#### Problem to solve

Computers that are offline never receive maintenance. These computers need a way to update when they miss their maintenance window.

#### Solution

You can now specify the offline behavior for computers on schedules and ad-hoc deployments.

![image](https://immybot.blob.core.windows.net/release-media/a720eb9f-74b7-4a9d-935e-4fb0cbe6ace1)

When offline behavior is set to `Apply On Connect`, a session will get marked as ![image](https://immybot.blob.core.windows.net/release-media/5df28983-4e9d-455c-b1b3-21a8638b6e6a) when the device is offline. When the device comes online, the session will resume.

![image](https://immybot.blob.core.windows.net/release-media/e6b38fd2-0370-4e09-b75d-527867cfeedd)

Since devices can come online at anytime, the option to `Suppress Reboots During Business Hours` is checked by default.

If a device is offline before the detection stage, then it will run the detection stage when it comes online.

If a device is offline before the execution stage, then it will only run the execution stage when it comes online. It will not re-run detection.

Maintenance emails are only sent out once regardless if the device goes offline.

### Timeline

---

On the computer details overview tab, there is now a section called Timeline that
shows particular events that have occurred for the computer.

![image](https://immybot.blob.core.windows.net/release-media/90b4b265-8744-44cb-b3ce-47c2bd6ec0e0)

The events we are currently showing are:

1. Agent disconnected
1. Agent connected
1. Maintenance action started (only shows if the action required execution)
1. Maintenance action completed (only shows if the action required execution)

More events will be added in the future.

### Other Improvements

---

- Improved performance of determining desired state of deployments during maintenance
- Improved performance of some update queries
- Added a new metascript cmdlet `Wait-ImmyComputer` that returns as soon as a computer has connectivity
- Added & Updated Ephemeral Agent connection statistics in 'System Status' page to report data/data-rate metrics about the underlying Ephemeral Agent connection to the backend

### Bug Fixes

---

- Fixed an issue where software download scripts were timing out after 60 seconds if the script didn't specify its own timeout
- Fixed an issue where changes made to a configuration task parameters from the software page were not saving
- Fixed issues displaying incorrect text in the target type column on the deployment and schedule list pages
- Fixed a bug where you could not remove a software download script
- Fixed a bug with `Add-UriQueryParameter` where it did not accept array values or parse existing parameters
- Fixed an issue with Ephemeral Agent "end-of-stream" response exceptions resulting in termination of stage
- Fixed various issues with agent connection events and improved performance
- Fixed an issue where immy agent registrations could cause resource depletion in the backend's IoT service
- Fixed the timezone selector to show the region to differentiate the options
- Fixed a bug where dynamic versions could depend on itself and cause an infinite loop

## 0.48.7

Released 2021-12-10

### Access Requests

---

Your users and the ImmyBot support team can now request access to your instance! When an unauthorized person authenticates, a "Request Access" button is available that will submit an access request. An MSP user can then grant or deny access from the user list page. An expiration of one hour, one day, or never can be set for the user.

The access request feature can be enabled/disabled on the preferences page.

![image](https://immybot.blob.core.windows.net/release-media/bb34184f-c7c3-41cf-9fa3-f6489e6c3600)

### Improvements

---

- Made some small improvements to the User list page
- Added auto refreshing to the new computers page
- Made the session list on the computer details page reload when it is shown

### Bug Fixes

---

- Removed some extra whitespace showing on the tenant details page
- Fixed a bug when using custom download scripts where the action would fail with `An item with the same key has already been added`
- Changed "Triggered By" text from "Unknown" to "System - Automatic Onboarding" for maintenance sessions that onboard automatically
- Changed parameter text from "override" to "specify" when a default valued is not specified
- Fixed a bug where deployment parameter notes were not honoring line breaks
- Changed the default target filter from `No Filter` to `Workstations and Portable Devices`
- Fixed an error in metascripts, `Tee-Output : Cannot bind argument...`, that would occur if you ran the script `$null`, which should return null
- Fixed a browser caching issue which would cause new features and bug fixes to not be immediately available when updating ImmyBot
- Fixed an issue where the end time of the ImmyBot agent update action was not getting set, causing the time running to continually increase
- Fixed an issue with the ImmyBot Chocolatey Feed app preference not updating when toggled

## 0.48.6

Released 2021-12-06

### Bug Fixes

---

- Fixed a bug where deployments targeting an integration were getting deleted when updating to a different target type

## 0.48.5

Released 2021-12-03

### Bug Fixes

---

- Fixed a bug where failed test scripts run after an install were not setting the action to non-compliant

## 0.48.4

Released 2021-12-03

### Bug Fixes

---

- Fixed an issue with some ImmyBot instances not being able to run scheduled jobs
- Fixed a bug with basic downloads failing because paths were using forward slashes instead of backslashes. This was causing all license downloads to fail.

## 0.48.3

Released 2021-12-02

### Improvements

---

- Added logout and switch user buttons to the landing page when you are signed in as an unauthorized user

![image](https://immybot.blob.core.windows.net/release-media/9ac4a8a6-3d2b-4518-9219-8407c32dd072)

### Bug Fixes

---

- Fixed a bug where completed configuration tasks were incorrectly showing the message "Action interrupted"
- Fixed a bug where providers failing to initialize were not getting disabled, causing them to continually throw exceptions

## 0.48.2

Released 2021-12-01

### Bug Fixes

---

- Fixed an issue with internal packages behaving incorrectly on the new Linux backend
- Fixed a caching bug that was showing the previously viewed maintenance session details when switching to a different computer

## 0.48.1

Released 2021-11-30

### Improvements

---

- Ephemeral Agent now uses Win32API directly to invoke Powershell, replacing the WMI calls which suffered from `System.PlatformNotSupportedException: The native library 'C:\Windows\Microsoft.NET\Framework64\v4.0.30319\wminet_utils.dll' does not have all required functions. Please, update the .NET Framework.` errors on some specific machines.

### Bug Fixes

---

- Resolves issue with Ephemeral Agent sometimes launching PowerShell in 32-bit mode
- Added additional error logging when maintenance task get/set/test fail
- Fixed an issue with file paths containing "/" instead of "\"
- Added back missing metascript aliases
- Resolved 'AmsiContext' warnings being spammed in frontend
  - ![image](https://immybot.blob.core.windows.net/release-media/d5da6576-6856-48bf-a516-5c4a96d6f3e7)
- Improved the readability of the Azure page
- Added an alert to the user page about creating new users
- Replaced references to "Immybot" with "ImmyBot"

## 0.48.0

Released 2021-11-29

### IMPORTANT

---

#### **The changes in this release will require reconsent at first login!**

**ⓘ If your Azure AD is configured to not allow non-Admin users to consent to new apps, you will need to login once as a user with sufficient privileges.**

![image](https://immybot.blob.core.windows.net/release-media/4aebeec7-2bcf-414f-952e-272e3deaffc5)

- Consolidated backend and frontend into a single Enterprise Application (Service Principal)
- Removed `backend.subdomain.immy.bot` and pointed all API calls to `subdomain.immy.bot`
  - This has the additional benefit of increasing performance as the browser no longer makes a CORS pre-flight check when hitting the API
    - Note: If you are using the ImmyBot API, you will need to remove `backend.` from your URI

## 0.47.12

Released 2021-11-29

### Bug Fixes

---

- Fixed a bug introduced in 0.47.11 where BITS downloads fail for files that do not specify an MD5 hash

## 0.47.11

Released 2021-11-24

### Improvements

---

- Files without MD5 hashes will now always get overwritten for better security.

### Bug Fixes

---

- Fixed Ephemeral Agent PowerShell execution failures on some machines
- Fixed an issue with nested exceptions not showing the correct output

## 0.47.10

Released 2021-11-23

### Improvements

---

- Ephemeral Agent EXE respects global proxies for https:// even though it uses wss://

### Bug Fixes

---

- Fixed issue where Ephemeral Agent EXE failed to launch due to an extraction issue on Windows Server Core

## 0.47.9

Released 2021-11-22

### Bug Fixes

---

1. Fixed an issue with inventory and script-run cancellation logic causing high memory usage
1. Fixed an issue with function scripts being used in metascripts causing heavy load on global database
1. Switched to force Ephemeral Agent EXE to utilize System Proxy settings to alleviate connection refusal for some users
1. Fixed an issue with PowerShell execution occasionally throwing an error that would crash ImmyBot

## 0.47.8

Released 2021-11-17

### Features

#### Ephemeral Agent EXE

1. The ephemeral agent now executes as an `.exe` instead of a PowerShell script.
1. This allows us to use a WebSocket instead of polling, which improves performance and resiliency as we can immediately detect disconnections.
1. Decreased initial connection time by attempting to connect using all RMMs simultaneously instead of in sequence.
1. Substantially improved logging to help troubleshoot script execution issues

**Note: You may have to exclude your instance's hostname in the firewall from SSL Inspection policies! SSL Inspection may interfere with the WebSocket connection from this new agent!**

**Note: You may also need to adjust your security software to allow the EXE to execute. We recommend adding an exclusion for the Immense Networks code signing certificate as it will be used to sign all ImmyBot PowerShell scripts and Executables.**

The subject of the certificate is:

```
CN=Immense Networks, O=Immense Networks, L=Baton Rouge, S=Louisiana, C=US
```

### Improvements

- Inventory scripts now run in parallel
- ImmyBot will always overwrite license files to prevent issues with software not activating because the previous license file is still in the ImmyBot download folder.
- The script terminal on the computer details page is no longer cleared when swapping between tabs.
- Updated the instance disabled text to specify that only an admin user can re-enable immy

### Bug Fixes

- The EXE ephemeral agent addresses intermittent ScriptTimeout exceptions that would occur for a variety of reasons
- Implemented a "Script Execution Circuit Breaker" per computer to prevent RMM overload when retrying ephemeral connections (This can happen when security software blocks execution or firewalls prevent outbound connections)
- Fixed several issues around script error handling. Line numbers now display correctly. Exceptions that occur before running a script are now caught and displayed properly.
- Fixed an issue where inventory output with a value of `null` was being treated as successful and overwriting good results
- Fixed a bug with session logs showing null references when a script was cancelled or timed out
- Fixed a bug with quick deploy where the deployment resolution stage was unnecessarily reaching out to the computer to retrieve its software
- Fixed a bug during maintenance sessions, `Field at index '1' does not exist...`, where retrieving the list of installed chocolatey software would fail
- Resolved a potential issue around re-acquiring ephemeral agent sessions under concurrent script execution scenarios
- Fixed a bug when re-authenticating to ImmyBot where you wouldn't be redirected to the page you were previously on due to the URL not including query parameters

## 0.47.0

Released 2021-10-28

### Maintenance Execution Order

---

You can now specify the order in which maintenance items are executed by navigating to "/deployments/ordering" or by clicking the "Ordering" link in the side nav bar under "Deployments".

![Maintenance Execution Order](https://immybot.blob.core.windows.net/release-media/itemorderingscreenshot.png)

### Other Improvements

---

- Made the software, maintenance task, script, and media list pages default to showing "All" for convenience. Additionally made small changes to these pages to make them more consistent in their appearance.
- Configuration tasks are now executed immediately after their compliant software.
- Refactored some code to be platform agnostic in preparation for hosting ImmyBot in Linux instead of Windows
- Made some internal improvements to how we store core PowerShell code that will make development and script signing easier
- Allowed dynamic version software to use the "Update If Found" desired state
- Allowed inventory to use metascripts
- Parallelized inventory to run up to 4 scripts in parallel for faster execution
- When creating scripts from a software or maintenance task, the script name will now have a default value. E.g. If creating a new installation script the default name will be " Installation Script" made in this MR for use in release notes
- Added a maintenance item column to the schedule list page
- Simplified the "Getting Started Wizard"
- Removed unnecessary padding in the "Getting Started Wizard"
- New instances will now automatically approve all recommended target assignments

### Bug Fixes

---

- Fixed a bug with adding the CW Automate integration where it would throw an error if the list of clients being imported was extremely large
- Fixed command-line scripts so uninstall logic works as expected
- Updated the target assignment resolution to exclude assignments that are tied to disabled provider links
- Fixed a bug where the test script on a software was not getting called if the software was detected
- Fixed a bug with maintenance item ordering where the preferred initial order of recommended items was not being set
- Fixed an issue that was causing a memory leak that scaled with the number of ImmyBot agent installers

## 0.46.9

Released 2021-10-04

### Bug Fixes

---

- Fixed a bug where configuration tasks were failing with `"Parameter '<parameter name>' is marked required for Maintenance Task...and no value has been set"` when the parameter value was actually set

## 0.46.8

Released 2021-09-30

### Bug Fixes

---

- Fixed a bug with maintenance tasks where the default parameter value was being used instead of the overridden value
- Fixed a bug where deploying tenant maintenance tasks would incorrectly show the computer target options instead of the tenant target options on the deployment form

## 0.46.7

Released 2021-09-27

### Bug Fixes

---

- Added code to help certain scripts honor the system web proxy on a computer
- Fixed a bug where the ephemeral agent was not honoring the correct polling interval, causing scripts to execute much slower than expected

## 0.46.6

Released 2021-09-24

### Improvements

---

- Updated the help text at the top of the Branding list page to indicate what the blue and red stars are for
- Inventory running for a computer now updates the computer details page in real-time after each inventory script
- Clicking the re-inventory button now runs detection after the inventory scripts

### Bug Fixes

---

- Added missing preference to select the default branding
- Fixed a bug with the "Bulk Create Tenants" buttons on the provider details page where it would throw an erorr
- Fixed a bug with running user context scripts where an error was being swallowed and the scripts would inevitably time out
- Fixed an issue with updating the "Installer Executable Path / Installer File" field on the software version form where it would revert to the previous value
- Fixed a bug where software marked as "Download Only" would attempt to run its configuration task. Software that is set to download only no longer adds an action for its configuration task.
- Fixed an issue that was causing the azure user sync to stop running. When it encounters an issue syncing a specific tenant, it will now log some details that will help the immy team determine why it is failing and then continue attempting to sync other tenants.
- Fixed a bug with running `Get-AgentInstallScript` where it would return the error `Tenant # is not linked to a client for the specified provider`
- Fixed a bug saving the onboarding form where we were not disabling the onboarding save buttons while the page was still loading. Attempting to to save before the page was loaded was causing an error to be thrown
- Fixed a bug where the branding list was showing brandings as "Expired" when they actually weren't
- Fixed a bug where updating brandings with no selected tenant would cause the branding to get deleted instead
- Fixed a bug where using the "Re-inventory" button on the computer details page would often time out and show an error
- Fixed a bug where the edit deployment page always showed the desired version: latest

## 0.46.5

Released 2021-09-22

### Improvements

---

- A session that resolves to 0 maintenance actions now results in a successful session.
- Added the detected version to the dynamic versions script
- Renamed the description text for safelisting the ephemeral agent script execution paths on the preferences page
- Added computer name-change propagation to the frontend when using `Refresh-ComputerSystemInfo` metascript

### Bug Fixes

---

- Found a bug where updating a computer on the onboarding form would cause problems if the computer has an active maintenance session. We now prevent saving the onboarding form if the computer has an active maintenance session.
- Fixed potential issues with scripts not getting ran by prefixing our scripts with, `[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;`
- Removed "Powered by Immense Networks" from the footer of maintenance emails
- Fixed a bug where after uploading and analyzing software, the analyzed upgrade code was not executing the search to see if it was found on existing machines
- Fixed a bug on the computer list page where a computer's online status was considering disabled links. Since a disabled link can result in stale data, we no longer use them to determine the online status of a computer.
- Fixed a bug with clicking the "Delete Offline Agent" button on the computer agents tab
- Fixed a bug where default configuration task parameters were missing when deploying from the computer software tab
- Fixed a null reference exception that was occurring when attempting to run a script against an offline computer
- Fixed an issue with saving computers from the onboarding screen where it would fail when the computer had an automate agent
- Fixed script reference counts for dynamic version scripts, download installer scripts, and all default software scripts
- Fixed a bug with assigning a local download installer script to a local software

## 0.46.4

Released 2021-09-16

### Improvements

---

- Updated sandbox identification to preserve maintenance session data instead of deleting old data since that data could still be useful for debugging

### Bug Fixes

---

- Fixed a bug in deserializing data that resulted in `The requested operation requires an element of type 'Number', but the target element has type 'String'.`
- Fixed a potential null reference exception when retrieving bulk software
- Fixed a bug with session logs not showing the correct end date time

## 0.46.3

Released 2021-09-16

### Bug Fixes

---

- Fixed a bug that prevented Immy instances from receiving new Immy Agent releases

## 0.46.2

Released 2021-09-15

### Improvements

---

- Changed ImmyAgent to use callbacks internally to response to Ephemeral Agent script start events. This should improve issues where the Ephemeral Agent doesn't start when using the ImmyAgent
- Added a new switch parameter to `Invoke-ImmyCommand` called `-IncludeLocals`, which will automatically include all variables from the metascript runspace. When using `-IncludeLocals` you no longer need to specify $using variables.

### Bug Fixes

---

- Fixed an issue where system scripts timeouts were not being honored
- Fixed backwards-compatibility of `Get-RmmInfo`and `Get-RmmComputer` metascripts
- Fixed an issue with automate groups not loading on deployment form
- Fixed a null reference bug when calculating MD5 hashes
- Fixed a bug with `Invoke-ImmyCommand` where $using variables were throwing a warning: `WARNING: Parameter '__using_command' already exists with value "some-value"`
- Fixed a regression where `Get-RmmInstallScript` was renamed to `Get-AgentInstallscript`. `Get-RmmInstallScript` is now an alias for `Get-AgentInstallScript`

## 0.46.1

Released 2021-09-14

### Bug Fixes

---

Fix ImmyAgent bug which would cause Temp PS1 path to not be created.

## 0.46.0

Released 2021-09-14

### Ephemeral Agent Script Execution

---

ImmyBot now uses "Ephemeral Agents" for script execution.

This new method will normalize the time it takes to run scripts across all RMM Providers. The initial payload to start the ephemeral agent will be sent through the RMM, but then all subsequent scripts will communicate directly with the ephemeral agent.

An Ephemeral Agent is a lightweight PowerShell script that establishes a direct connection with the ImmyBot backend via Polling or SSE (Server-Sent Events) to receive script payloads to execute. Script output is then sent through an Azure Service Bus for high throughput handling. The ImmyBot backend manages the lifetime of ephemeral agents and is able to re-use them efficiently.

### Script Path Preference

---

It is now easier to whitelist ImmyBot in your Antivirus. The Ephemeral Agent will use a script path containing a hash unique to your instance that you can rekey yourself.

![image](https://immybot.blob.core.windows.net/release-media/e29c58d2-d877-430c-b1b3-6035e855038e)

### Default Software Scripts

---

You can now specify install, uninstall, post-install, post-uninstall, upgrade, and test scripts directly on the software.

This reduces duplication for software where the versions use the same exact scripts while also making software easier to manage.

**Considerations**

1. If the software has a script and the desired version has a script, then the script on the version takes precedence. (e.g. the version's install script will be used instead of the software's install script if both are present)
1. If the version does not have a script, then we will attempt to use the one on the software if the script is present.

### Custom Download Script

---

You can now assign a "Download Installer" script to software that will be used instead of the core Immy download installer logic. This is valuable when downloading 3rd party installers from URLs that require authentication or specific headers.

### Other Improvements

---

- Combined RMM Links and PSA Links into a single Integrations page under Settings
- Improved Tarma InstallMate package analyzer detection
- Added documentation for Ephemeral Agent & ServiceBus Script-Result handler info tiles in System Status page to better explain what they mean, and how to discern specific pieces of information from them
- Fixed an issue where password parameters with `$` characters were getting stripped
  ServiceBus Script-Result handling & Ephemeral Agent sessions are enabled by default for new Instances
- Integration type capabilities are now listed on the New Integration page
- ServiceBus Script-Result handling can now process results at a much higher throughput & more reliably than before.
- ServiceBus Result latency has been improved to around ~100ms under normal load conditions from ~3s.
- Implemented caching for tenant preferences to reduce database calls during maintenance sessions
- Reduced some complexity in how we structure RMM Links and PSA Links (now known as integrations)
- Reworded script-start-failed log to not include integration link name since the integration is not responsible for starting the scripts
- Added basic logging of inventory script names and any errors to session logs

### Bug Fixes

---

- Fixed an issue with pages not loading when there are a large number of tenants
- Fixed a bug causing configuration tasks to fail if you were deploying software with the desired state of "Any Version"
- Fixed an issue with CW Control Secondary Grouping property causing exceptions when used in Deployment.
- Fixed a bug where script parameters were being duplicated due to case-sensitivity
- Fixed a few potential ImmyAgent Installation issues that may occur on very old systems missing .NET standard assembly 2.x. Additionally Lowered .NET framework dependency down to 4.6.1 from 4.7.2
- Fixed a bug where full maintenance sessions were attempting to resolve assignments that definitely should not be resolved
- Fixed an issue the computer table counts showing incorrect numbers
- Patched a number of ServiceBus Result-Handling bugs that could cause instability & unexpected output when in use.

## 0.45.8

Released 2021-08-25

### Bug Fixes & Improvements

---

- Fixed a bug where reboots were not being suppressed for maintenance triggered in the batch action on the main computer list page
- Fixed issues with running global or MSP-created meta scripts that use commands such as `Invoke-CWARestMethod` or `Get-RmmInfo`
- Fixed issues with the sidebar not allowing you to select dropdown items when the scrollbar was showing
- Fixed a bug on the media uploader that prevents users from dragging and dropping files to upload
- Added the missing "Reboot Preference" label on the schedule details page

## 0.45.7

Released 2021-08-23

### Bug Fixes & Improvements

---

- Fixed an issue where the `Get-RmmInfo` command was not being found in metascripts during auto onboarding sessions
- Fixed an issue that was preventing users from deleting tenants. The error received was "An error occurred while deleting tenants".
- Fixed an issue where saving a script on the script details page would inconveniently scroll you back to the top of the page

## 0.45.6

Released 2021-08-20

### Bug Fixes

---

- Fixed a bug where configuration task file parameters were not getting downloaded to the computer before the software action ran
- Fixed a bug where running a deployment with a configuration task that did not have any scripts enabled was causing the software scripts to not include the configuration task parameters

## 0.45.5

Released 2021-08-18

### Bug Fixes

---

- Fixed a bug that surfaced in 0.45.4 where computers were not running the onboarding stage during maintenance sessions

## 0.45.4

Released 2021-08-18

### Bug Fixes and Improvements

---

- Fixed an issue with schedules that were targeting (+ offset) timezones, e.g. (UTC +10:00) where the schedule was not getting scheduled at the correct time
- Fixed an issue where linking a tenant to an RMM client was incorrectly pushing the synced computers to Needs Onboarding. Computers synced by linking a tenant are automatically marked as onboarding since it is the initial sync.
- Fixed an issue with creating deployments where the maintenance item search was not returning maintenance tasks with the Tenant Category
- Added a session log to warn users when you attempt to run a cloud script (tenants only) against a computer. This shouldn't be possible, but there is a bug on the deployment form that is allowing you to save an invalid deployment. This bug will be fixed in an upcoming release
- Updated the Azure CSP Preconsent instructions on https://docs.immy.bot/guide/csp-preconsent-instructions.html to reflect the latest UI.
- Fixed an issue with global maintenance task file parameters where we were not downloading the files to the computer

## 0.45.3

Released 2021-08-18

### Bug Fixes and Improvements

---

- Fixed an issue that could prevent Immy from starting up properly where the database as referencing computer ids for computers that no longer exist
- Fixed an issue on the Deployment List page where global software / maintenance tasks were getting incorrectly linked to local software / maintenance tasks
- Fixed a rare exception getting thrown if an instance was started and stopped very quickly
- Fixed an asset caching bug that would cause new features to be unavailable until the user performed a hard refresh in the browser
- You will now receive a notification when new frontend updates are available to prompt you to reload the page
- Fixed a bug where starting sessions for computers that are actively having maintenance scheduled by ImmyBot could cause the schedule to stop scheduling sessions

## 0.45.2

Released 2021-08-04

### Bug Fixes

---

- Fixed an issue introduced in 0.45.0 that prevented users from creating deployments for installing Chocolatey and Ninite software
- Fixed an issue with new computers getting stuck under failed with the specific error message "duplicate key value violates unique constraint "ix_computers_device_id"

## 0.45.1

Skipped

## 0.45.0

Released 2021-08-03

### New Deployment Targets

---

#### CW Automate Groups

You can now deploy software to CW Automate Groups and to CW Control Sessions sharing the same custom property values\*

![image](https://immybot.blob.core.windows.net/release-media/703d5619-28cf-4385-9b6b-4debaf1010ce)

#### CW Control Custom Groups

_Requires CW Control ImmyBot extension to version 0.1.7_ -- Awaiting ConnectWise Control Marketplace Approval

![image](https://immybot.blob.core.windows.net/release-media/b89ab8ed-c531-4c42-a9dd-6d3e97d1a6fe)

You can define which custom property number you want to use for the client name and secondary grouping property on the RMM Link details page.

![image](https://immybot.blob.core.windows.net/release-media/f4cc8b5e-8135-40ab-8748-097f4ae86f11)

### Improvements

---

- `Invoke-ImmyCommand` can now run on multiple computers in parallel, using the `-Parallel` switch
- MSP Admin users can now set a flag `Allow Access To MSP Resources` on schedules that will allow all scripts run by the schedule to have access to MSP resources. An example would be allowing the metascript `Get-ImmyAzureAuthHeader` to use the flag `-UseMSPTenant` to retrieve the msp tenant's access token.
- You can now connect to Azure AD as the MSP Tenant from scripts run on client devices by passing `-UseMSPTenant` to the `Connect-ImmyAzureAD` metascript
- Added a new tag ![image](https://immybot.blob.core.windows.net/release-media/81842495-9a7e-4273-a4c7-a4c01230941e) for computers to indicate it is a sandbox
- You can now delete computers from the "New Computers" page.
- You can now use MSP KeyVault secrets in customer scripts. This is useful if, for example, you'd like to access your IT Glue API keys while running a metascript against a customer computer. Provide `-UseMSPTenant` to `Get-ImmyAzureAuthHeader`
- `Write-Progress` can now be used inside `Invoke-ImmyCommand` blocks
- Added a preference to set the default timezone that gets selected on the schedule and deployment pages
- Agent installer modal now defaults Auto Onboard to false to avoid accidental auto onboarding
- Reduced the local admin username minimum length from 3 characters to 2 characters. Allows for two-character naming such as "MC" or "LA"
- Users now have the ability to specify the 'ClientName' CustomProperty index in the CW Control RMM Link, in the rare case it isn't the default.
- Switched to using service bus for `Invoke-ImmyCommand` usage in metascripts when service bus is enabled for script results
- Made some refactoring changes around how computers get identified
- Refactored the "Needs a Manual Decision" tab to be more useful

### Bug Fixes

---

- Fixed an issue where scripts that were run from the script editor page were not able to be cancelled
- Fixed an issue with sessions getting stuck while attempting to update the immy agent provider
- Fixed issue with deployments targeting a specific version where it would revert to latest when reloading the page
- Fixed issue with creating maintenance tasks and them not showing up on the deployment page when you click "Deploy"
- Fixed issue with the person select box not showing the person name and email
- Fixed issue where task audits were not running during preview
- Fixed an issue where task audits would always return compliant even if they were non-complaint
- When uploading an installer or providing one through a URL, the package type must now be selected in order to continue
- CW Control Extension now inserts events from ImmyBot with correct eventAttributes which will alleviate some script failure issues.

## 0.44.7

Released 2021-07-21

### Bug Fixes

---

- Fixed a permission issue with managing individual target assignments
- Fixed an issue where permission messages were always defaulting to "Permission Check Failed", instead of showing a more detailed message.

## 0.44.6

Released 2021-07-19

### Improvements

---

- Added ability to delete computers from ImmyBot on the main computer list page and on the computer details page
- Added permissions to only allow an admin to create, update and delete schedules
- Added a "Triggered By" column to the maintenance session list page to indicate who manually started a session
- Added text to the maintenance details page indicating who manually started the session
- Configuration Tasks are now grouped together with their corresponding software action on the maintenance session details page. This should be more convenient than having all configuration tasks grouped at the end of the page.

![image](https://immybot.blob.core.windows.net/release-media/80c94fb5-d15c-498c-896b-12cba58fdc1b)

- Session table now shows the execution date for pending scheduled sessions. Hovering over the text will show the exact date time.

![image](https://immybot.blob.core.windows.net/release-media/c46d8002-6f5b-49bd-860d-a10dbd55b18b)

- Session details page now shows the execution date for pending scheduled sessions

![image](https://immybot.blob.core.windows.net/release-media/55efc4bd-54ee-4aee-ac42-35de6d59c2f8)

- Updated the text description for enforce, audit, and monitor modes on the deployment details page
- Changed the text of "Hide Successful Deploys" to "Hide Compliant Deployments" for consistency
- The getting started wizard will now suggest you enter wireless information and remind the user to connect the Ethernet if they don't configure a wireless profile
- When creating a tenant or updating an existing tenant's name, an error will now be thrown if the name already exists.
- MSP non-admin users can no longer see cross-tenant deployments
- Configuration tasks that have a test script will now run the test script during detection if the software is detected on the machine.
- Updated the logs for showing why a test script errored and cannot continue.

![image](https://immybot.blob.core.windows.net/release-media/d0a0d514-c80a-4344-aed3-4860e1f81667)

- Updated the maintenance action result reason with the message as well

![image](https://immybot.blob.core.windows.net/release-media/a7fdcad3-4f00-46f3-a263-21b294e18b6b)

- Clicking "Show/Hide no-action results" on the deployment page no longer hides maintenance task audit and monitor.

### Bug Fixes

---

- Fixed an issue with device-cached inventory scripts not being executed on devices that use PowerShell 2.0
- Fixed an issue with Immy Agent running on 32-bit systems not being able to execute scripts
- Fixed an issue with PowerShell errors not being stored when they occur during inventory scripts
- Fixed an issue with domain joining failing when the domain controller is 2008 R2/PowerShell 2.0
- Fixed issues with the computer deployment excel export
- Fixed an issue with restoring scheduled jobs when Redis goes down for maintenance
- Added missing detection email options to the computer deployment page. **Show Postpone Button on Detection Email** and **Show Update Now Button on Detection Email**
- Deployments with the desired state "Update If Found", will no longer add a configuration task if the software is not found on the computer
- Fixed an issue with some session logs not getting persisted due to invalid characters in PowerShell responses
- Fixed issue where the edit global script button was showing for non-immense users
- Fixed issues with the resolution only and detection only tags showing incorrectly on the session details page
- Fixed an issue with the package analyzer throwing an error when analyzing from a URL.
- Fixed an issue with devices with UUID 03000200-0400-0500-0006-000700080009 causing computers to always need to go through rmm-computer-resolution in order to be fully identified

## 0.44.5

Released 2021-07-12

### Improvements

---

- Updated computer deployment preview/deploy result for maintenance task audit to say either "Audit returned false" (highlighted red) or "Audit returned true" (highlighted green)
- Removed computer deployment preview/deploy result field when running a maintenance task monitor since a monitor does not currently show compliance

### Bug Fixes

---

- Fixed an issue where specific tenant onboarding deployments were not overriding cross tenant onboarding deployments
- Fixed an error that was occurring when saving software with prerequisites
- Fixed an issue with the package analyzer where it would unexpectedly fail

## 0.44.4

Released 2021-07-12

### Improvements

---

- Added multi-selection to the computer list and onboarding computer list
- Added software references to the maintenance task page.
- Added option to schedules for `Show Maintenance Actions In Emails` that controls whether the maintenance action table is shown in the maintenance emails
- Added `TenantId` to the list of available script parameters
- Immybot now sends smaller payloads over RMMs when running inventory scripts
- Configuration tasks now have access to the software and desired software version script parameters

### Bug Fixes

---

- Fixed some usability issues with selecting persons and tenants on the Download Rmm Installer form
- Fixed an issue with the Getting Started wizard not showing up by default for new Immy customers
- Fixed issue with the SMTP page not showing the form
- Fixed an issue where the selected tenant would disappear after saving a CWA-location-targetted deployment
- Fixed a null reference error when requesting a chocolatey version that does not exist
- Fixed issue with displaying the Azure Prinicipal Id on the person details page
- Added missing icon to maintenance tasks on the session details page
- Fixed an issue where workstations were incorrectly resolving to domain controller specific deployments

## 0.44.3

Released 2021-07-06

### Bug Fixes

- Resolved an issue with creating software versions from the software version upload form

## 0.44.2

Released 2021-07-01

### Bug Fixes

---

- Fixed a serialization bug introduced in 0.44.1

## 0.44.1

Released 2021-07-01

### Tenant Details Page Improvements

---

1. Added a cloud / computer type selector to the sessions and actions tabs.
1. Replaced the tasks tab with an actions tab
1. Added a schedules tab

The actions tab shows the latest actions performed against a computer or tenant. This table can be used to help identify issues with software and maintenance tasks.

#### Example 1: Find all computers that have a large number of failing actions

Filter the status column to non-compliant and then group by the computer.

![image](https://immybot.blob.core.windows.net/release-media/253ae11d-3c33-4da6-9b0d-2fe085546034)

#### Example 2: Find software and maintenance tasks that are failing across many computers

![image](https://immybot.blob.core.windows.net/release-media/905d64bf-91b0-4b88-b67a-4f6c0709a44c)

### Dashboard - Load Top 10 Non-Compliant Items

---

A new button was added to the dashboard, `Load Top 10 Non-Compliant Items`, that will show up when you have selected a tenant scoped target. This can be used as a quick way to identify issues for devices.

![image](https://immybot.blob.core.windows.net/release-media/cbc243f5-e240-4d9d-847f-5a1ebc095d99)

### Bug Fixes And Other Improvements

---

- Fixed issue with computer list not being able to filter by serial number
- Added a configuration task tag to configuration task maintenance actions on the session details page

## 0.44.0

Released 2021-06-28

### Quick Deploy

---

Deploying software for a specific computer is now easier. Located at the top of the Software tab on the computer details page. Tell your techs to use this form if they need to deploy software to a specific computer.

![image](https://immybot.blob.core.windows.net/release-media/c70b0628-847b-40b6-99db-456f69ce5115)

After selecting a software / maintenance task that you want to deploy, a session will be kicked off to determine if the computer has any applicable deployments. If a deployment is found, then you'll be presented actions for that deployment.

![image](https://immybot.blob.core.windows.net/release-media/87d9a5a0-0f1d-41ea-94ba-8868fbe674f5)

If a deployment is not found, then you are asked if you would like to create one.

![image](https://immybot.blob.core.windows.net/release-media/e268d0b8-2538-4019-bbe3-492468f162d8)

If the selected item requires configuration task parameter values or a license, then you still need to create the deployment from the traditional deployment page. We plan on expanding on this to allow supplying a license and parameters directly on this form.

![image](https://immybot.blob.core.windows.net/release-media/f351d75d-738e-4acb-9588-3103842fcda4)

### Computer List Search Improvements

---

Searching for computers is now much faster after some internal refactoring of how the data was stored. We removed the need to select a filter so you can now search by any of the available fields specified in the placeholder.

![image](https://immybot.blob.core.windows.net/release-media/ae56632e-651a-4e41-8f4d-0f62d6947f47)

- Added `Onboarding` as a support Target Type for convience.
- Made device inventory storage processes more efficient and started caching some often-accessed computer data (like computer names)

### Download ImmyBot Agent Installer Improvements

---

Updated the interface for downloading an immy agent installer. You can now assign default behavior to any of the installation methods. The `Deploy` tab will now automatically update when your computer shows up in ImmyBot.

![image](https://immybot.blob.core.windows.net/release-media/7ab85162-0ce8-49bd-ab16-a76a6c105dab)

![image](https://immybot.blob.core.windows.net/release-media/b16dcf31-9e06-4f09-818f-bfff57c19f0f)

### Inventory Results over Service Bus (Beta)

---

Inventory scripts sent over any Rmm Provider connection will have their results sent over an Azure ServiceBus connection. This allows us to stream results in real-time, eliminating message size constraints. Since this is a new feature, you must manually enable this functionality under preferences. In a later release, we will extend the service bus script result handling to all scripts ran through Immy

![image](https://immybot.blob.core.windows.net/release-media/39e9a698-cff7-4db5-af1d-d34dd0b74c64)

### Bug Fixes And Other Improvements

---

- Added some automated testing to the package analyzer for stability
- Made the package analyzer partially download files for analysis. This will allow large installers to be analyzed more efficiently
- Fixed issue where the default install/uninstall scripts were not being selected after uploading and analyzing an installer
- Fixed an issue where the onboarding reboot preference was not being honored
- Fixed a bug running maintenance tasks where the maintenance task parameters specified from the deployment were not getting passed down to the running script
- Fixed an issue that was causing `Invoke-ImmyCommand` run from cloud scripts to not actually execute
- Added a brand new test suite to the frontend code to help fight against regressions
- Fixed AppPref SB Bug where SB Subscriptions weren't being torn down and recreated
- Fixed Powershell 2.0 compatibility issues with ServiceBus usage
- Fixed issue with the software analyzer where it was not properly returning the install executable path for .zip files
- Added more computer columns to the maintenance session list that can be toggled from the column chooser

## 0.43.7

Released 2021-06-17

### Bug Fixes

---

- Fixed issue with ImmyBot Agent online/offline states not syncing properly
- Fixed issue with `Get-ImmyComputer` not setting many properties on the computer response objects

## 0.43.6

Released 2021-06-16

### Improvements

---

- Decreased the load time of maintenance session details
- If retrieving bulk software during maintenance fails, we now display any errors that occurred
- Moved the computer reboot logic to a global function script called `Restart-ComputerAndWait`. A computer that needs a reboot during a maintenance session will now utilize this global function script. This script can be overridden by a local function script with the same name, `Restart-ComputerAndWait`.

### Bug Fixes

---

- Fixed issue on the deployment list where azure groups and automate location deployments were showing under cross tenant instead of single tenant
- Fixed some common exceptions that were occurring for CW Control online/offline events

## 0.43.3

Released 2021-06-07

### Improvements

---

- Chocolatey installation script no longer uses `iex` which was potentially flagging some AV
- Moved Chocolatey installation script to global so that it can be quickly updated if necessary
- Detection only sessions now show actions as either compliant or non-compliant
- Added missing software and maintenance task icons to the computer's software tab

### Bug Fixes

---

- Fixed issues with saving configuration tasks for software
- Fixed some regressions with populating data on the deployment form and deployment list
- Fixed issue with software version test scripts not detecting the boolean result at the end of the output

## 0.43.2

Released 2021-06-04

### New fields on Windows 10 Setup USB Package

---

1. You can now set the reboot preference when you enable automatic onboarding.
1. You can now specify additional persons
1. Send Follow-up Email has been added here and also on the computer onboarding form to send an email when the onboarding session finishes.

![image](https://immybot.blob.core.windows.net/release-media/1daaeb95-cf29-4ae5-8cb1-5200dff431cc)

### General Improvements

---

- Added a test email button to the branding form so you can preview how the maintenance emails will look
- Progress session logs no longer show the activity id when id is 0
- Onboarding sessions now run perform a full inventory of the computer
- Increased the size of the row details icon in the logs panel to make it easier to see/click
- Session logs are now now auto expanded when you click the row details icon
- The primary log result is no longer truncated by default
- On the script details form, the timeout field now specifies (seconds) as the unit
- Updated the package type options on the software upload form to be "None, Zip file, Single file installer"
- Added a description for zip files on the software upload form
- Updated the action reference table to include the computer's online status
- Added a refresh button to the dashboard table. This is useful if you have running sessions and you want to refresh the results of the table
- Licensing can now be marked as 'Optional' on Software. This is useful for software that installs in trial mode when no license is specified
- Added a DEPLOY button to the maintenance task form
- Added maintenance action references to the maintenance task form
- Added a "Missing Install Script" alert message to software version form when the version does not have an installation script
- Updated maintenance action messages and session logs to indicate when a software is being installed without an installation script

### Bug Fixes

---

- Follow-up emails now send correctly in sessions that have an agent update action
- Disabled syntax highlighting for script output in session logs
- Fixed an issue with being unable to delete an offline agent
- Fixed an issue where onboarding computers were not able to apply metascript targets that depended on inventoried software since inventory had not run yet
- Fixed issue with metascript deployments where we converting the entire result to a boolean instead of checking whether the result ends with a boolean
- Resolves issue with software failing to install when it was marked as 'Licensed' but no license was specified on the deployment. For these cases, you can now select 'Optional' on the Software to install it without a license
- Fixed some issues with showing session and action dates
- Fixed some issues with the agent update stage

## 0.43.0

Released 2021-06-01

### Agent Updating

---

The Immy Agent now gets updated during full maintenance sessions. You can also manually trigger an update by going to the computer's details page and under the Agents tab.

![image](https://immybot.blob.core.windows.net/release-media/a6a6cdbb-f45e-4b95-91a9-e4272979527c)

### Assignment Override

---

As part of a refactor of the computer software tab, we added the ability to override assignments. This is useful when resolving one off computers that do not need to be part of a larger assignment.

![image](https://immybot.blob.core.windows.net/release-media/0a02d6ac-21f5-425d-8ab7-1b881d7d16f2)

### Getting Started Wizard

---

A new 'Getting Started' feature is available, which guides the user through first-time ImmyBot setup and installation of the ImmyAgent on a device using PPKG. You can access this feature by clicking the "show Getting Started Wizard" link under your user email dropdown in the top right.

![image](https://immybot.blob.core.windows.net/release-media/e24d1489-c7fa-46ed-bde9-8a9bde0df04f)

### Recommended Deployments

---

A recommended deployment is a global deployment that is accessible to all ImmyBot users. Recommended deployments represent common scenarios that most companies use. You can approve / dismiss recommended deployments. Approving a deployment will allow it to be considered as a valid deployment when running maintenance. Dismissing a deployment will disallow it from being considered during maintenance.

When a new recommended deployment is added, you will receive a notification, "You have new recommended deployments". Clicking this link will prompt you to approve / disapprove the deployment.

You can manage the approval of all recommended deployments from the main Deployment List page by clicking the "View Recommended Deployments" button at the top.

![image](https://immybot.blob.core.windows.net/release-media/479a8f6b-14b1-45c6-a5d5-97d9fd8a6d04)

### Improvements

---

- In an effort to make script execution more reliable in the presence of Antivirus, we discontinued the use of Invoke-Expression when running scripts in the System context.
- Made some primary buttons secondary where they weren't the primary action
- Refactored the agents tab
- Set max widths in inputs
- Changed script selector and task selector buttons to links.
- Moved configuration task actions to the execution phase of maintenance. Configuration tasks do nothing during detection.

### Bug Fixes

---

- Fixed issue on the software assignment reference table where the target and desired software state columns were missing text
- Fixed sorting computer column on the deployment page
- Fixed issue with dates showing as `0001-01-01`
- Set maintenance sessions table time filter default to 7 days
- Moved the maintenance task link directly under software in the nav menu
- Set "Include Offline" default to false on the Ready For Onboarding tab on the New Computers page
- Updated the actions needing attention section to only consider actions from the last week
- Fixed an issue where software only linked to Ninite or Chocolatey were unable to perform upgrades
- Fixed an issue where we were appending "/qn" to uninstall strings that were not using `MsiExec.exe`
- Fixed issue where configuration task scripts were getting run when its software action failed

## 0.42.3

Released 2021-05-06

### PPKG Primary User

---

You can now specify the primary user as part of the provisioning package configuration.

![image](https://immybot.blob.core.windows.net/release-media/623c688e-9d35-43a1-8e36-c378f2b0fa01)

### Maintenance Task Icons

---

Maintenance Tasks can now have icons!

![image](https://immybot.blob.core.windows.net/release-media/7a4e8ac6-202d-4ab7-8479-c966a28490e0)

### Deployment: Multiple Action Results

---

The deployment page can now show multiple action results. This is useful when a software has a configuration task or dependencies.

When there are 2 actions:

![image](https://immybot.blob.core.windows.net/release-media/66e95cd9-7ec8-4c8e-b78e-20dc597194c5)

When there are more than 2 actions:

![image](https://immybot.blob.core.windows.net/release-media/40f243cf-b00d-48b6-ae65-31d227c6959f)

Showing extra actions:

![image](https://immybot.blob.core.windows.net/release-media/72980fac-e8de-4083-a294-0a338e8455d4)

### Improvements

---

- Added license for Entity Framework Extensions
- Updated the descriptions for Windows Updates on the Schedule Page. We now hide the windows updates checkbox when it is not available.
  - ![image](https://immybot.blob.core.windows.net/release-media/9b4d861b-41ef-4039-8259-20689aa1b053)
- The error alert at the top of a page now indicates that the requested resource could not be found if the api call resulted in a 404.
  - ![image](https://immybot.blob.core.windows.net/release-media/1b419a4a-471a-49c0-983f-eea4d27e6eb3)

### Bug Fixes

---

- Fixed issue with merging tenants where some users were receiving the following error: `Configured execution strategy SqlServerRetryingExecutionStrategy does not support user initiated transactions `
- Fixed issues with determining winning deployments. A tenant filter script now has priority over a cross tenant filter script. Ordering has also been added to the target group filter. E.g. A deployment targeting primary domain controllers will now take priority over a deployment targeting servers.
- Fixed issue where multiple actions returned on the edit deployment screen would overwrite each other when previewing or deploying
- Fixed extra spacing between items on the computer software list
- Fixed issue where some null dates were showing as Jan 01 0001 - They now show as n/a.
- Fixed issue with creating, updating, and deleting deployments where the request would hang and eventually timeout
- Fixed issue with the deployment details page slug having duplicate text

## 0.42.2

### Improvements

---

- Added ability to merge and delete tenants
- Reduced agent install MSI from 41MB to 14MB
- ImmyAgent can now be installed without an internet connection
  - The Provisioning Package now embeds the MSI instead of downloading it, preventing the need for an internet
- ImmyAgent Service is now a single exe file
- ImmyAgent gracefully shuts down quickly preventing connection errors on service restart because the previous process is still running
- Better online/offline tracking: ImmyAgent now sends messages to the backend to indicate when it connects and disconnects. The prevents issues where a restart may not be noticed on machines that reboot quickly because the IoTHub filters out connection events that happen quickly.
- When joining the domain from the Onboarding screen, the logs indicate what domain controller is being used to fetch the offline domain join token
- When scripts are running in the Metascript context, we say execution is happening in the ImmyBot Backend instead of 'Server' as it could be confused with a server managed by ImmyBot

### Bug Fixes

---

- Fixed Offline Domain join
  - This also fixed an issue where Invoke-ImmyCommand would not respect the Computer argument
- Fixed issue where license values werent being provided during Onboarding sessions
- Fixed issue where PPKG would fail to apply if wireless was specified and the machine doesn't have a wireless adapter
- Fixed an issue with upgrades failing for global softwares that use choco provider
- Fixed an issue where cloud scripts were not able to be debugged with the correct script parameters from tenant session details
- Fixed issue causing deployments to fail when global software is linked to Ninite and Ninite integration is not enabled.
- Fixed an issue where rekeyed agents never show up in Immy.
- Fixed an issue with rerunning script from tenant session trying to run against a computer
- Fixed an issue that could cause the first instance of a schedule to not run if the schedule was created between your timezone's offset and midnight. (I.E Between 6PM CDT and Midnight CDT)

## 0.42.1

### Improvements and Bug Fixes

---

- Fixed an issue on the deployment form when invalid text would incorrectly show up when a chocolatey or ninite software was selected
- Fixed an issue that was preventing successful installs of ninite and chocolatey software

## 0.42.0

### Tenant Details Page

---

Added a tenant details page similar to the computer details page. The tenant list page link has been moved out from `Settings -> Tenants` to the top level in the navbar.

1. Maintenance sessions run directly against a tenant can be viewed in the Sessions tab.
1. Assigned Tenant Maintenance Tasks can be viewed in the Tasks tab.
1. The Terminal tab is auto scoped to run meta scripts for a particular tenant.
1. The Mappings tab allows you to link/un-link a tenant from RMM Providers.
1. The edit tab allows you to change the name of the tenant.

![image](https://immybot.blob.core.windows.net/release-media/33988012-0209-4220-9fa8-dc6a8211f3a2)

### Software Providers

---

#### What is a Software Provider?

A Software Provider tells ImmyBot how to install/uninstall a software. Currently, Local, Global, Chocolatey and Ninite are supported as providers. You can assign the available providers to a software on the software's edit page. A local/global software will inherently be a Local/Global Provider if there are software versions present.

![image](https://immybot.blob.core.windows.net/release-media/a54835ec-7977-48f4-85c6-b9cce0f53c5f)

The provider that is used during a maintenance session can be specified on the deployment. For example, if the Chocolatey provider is added on a software and is selected on a deployment, then Immy will always attempt to install/uninstall the software through Chocolatey.

![image](https://immybot.blob.core.windows.net/release-media/2ee5c1c5-0011-4f82-bb9b-983b4aafffcb)

If a specific provider is not selected, then the software will be installed/uninstalled using the following logic:

1. If the deployment is set to install the latest version or update if found, then the provider that contains the latest software version will be used.
   - e.g. If chocolatey has a newer software version then global, then chocolatey will be used.
1. For any other desired state, the local/global provider will be used (normal behavior).

If the Ninite integration is enabled and Ninite is set as an alternate provider, then Ninite will take priority over Local/Global and Chocolatey.

### Detection Outdated

---

Added a flag to computers to indicate that a deployment for the computer has been updated and that detection should be re-run to ensure the computer is up to date.

![image](https://immybot.blob.core.windows.net/release-media/1fbec2a1-cf19-402a-8118-4596c3d835dd)

### Computer Software Page Updates

---

Added more tabs to filter the computer's software list

![image](https://immybot.blob.core.windows.net/release-media/8f25f22c-ab5d-4d7b-8ebd-db40321d6718)

#### Unassignable

The unassignable tab lists all software that exist on the computer but does not exist in ImmyBot as managed Software.

#### Assignable

The assignable tab now has two potential actions: **Quick Assign** and **Assign**. Quick Assign will immediately create a deployment targeting the primary person (if present) or the computer. A detection only session will also start immediately to determine the current state of the software. Assign will open the New Deployment Page and allow you to create a new assignment for the software. Quick assign is currently only available for software that do not have a configuration task or a license.

![image](https://immybot.blob.core.windows.net/release-media/396d2451-2e36-4793-b63f-99ed514bd536)

#### Assigned

The assigned tab now provides 3 potential actions: **Action to take (Install, Update, Enforce, etc)**, **Re-run detection (refresh icon)**, and **Manage (edit deployment)**"

![image](https://immybot.blob.core.windows.net/release-media/016316a8-470a-42e8-a57a-b2c79ebb512f)

### Improvements and Bug Fixes

- Added ability to bulk delete tenants and associated data from the tenant list page
- Added a new system preference "Allow Non-Admin Users To Manage Deployments". This is enabled by default.
- Removed company column from dashboard table and excel export if the target is a single company
- Updated the dashboard excel export file name to `<company> Computers - <date>.xslx` when the target is a single company
- Added result reason to dashboard table and excel export
- Reworded Action Success to Compliant, Failed, to Non-Compliant, and Missing to Not Found
- Allowed schedules to target tenant maintenance tasks
- Allowed the dashboard to target tenant maintenance tasks
- Uninstalls using the vendor's uninstall string now check to ensure that the uninstall string is using `/X` and not `/I` and appends `/qn` (quiet) if it is missing.
- Fixed a bug in metascripts where `write-warning "some text"` was not outputing anything to the console
- Improved performance of running multiple maintenance sessions at the same time
- Fixed a bug where uninstalling by MSI uninstall string was failing if the semantic version stored in the registry was not a valid semantic version
- Fixed a bug with the primary person dropdown where it was limiting results to 1 and including people from any tenant.
- Fixed a bug when running cloud scripts where it would fail because "the computer is not online"
- Fixed an issue with repairs not triggering the configuration task or software dependencies
- Fixed issues with being unable to cancel old maintenance sessions
- Several other small QOL improvements throughout the codebase
- Fixed bug where ImmyAgent Service stops immediately when stop is requested from the Windows Services

## 0.41.13

Released 2021-04-13

### Bug Fixes and Improvements

---

- Fixed issue where non-strings weren't being passed into $using variables with `Invoke-ImmyCommand { }`
- Fixed a null reference exception that could occur when performing an action for a maintenance task on the computer software table.

## 0.41.12

Released 2021-04-12

### Bug Fixes and Improvements

---

- Improved the performance of a poor performing SQL query that populates the "Needs Attention" section of the computer details page

## 0.41.11

Released 2021-04-09

### Bug Fixes and Improvements

---

- Improved performance of loading computers on the Deployment Details page
- A schedule can now specify whether it will "Apply Windows Updates". **Note** If the schedule is limited to a specific software or maintenance task, then windows updates will not be applied.
- Made minor improvements to BITS transfers
- Fixed issue with Chocolatey latest version allowing prereleases
- Fixed a bug causing maintenance task files to fail downloading

## 0.41.10

- Skipped

## 0.41.9

Released 2021-04-08

### Bug Fixes and Improvements

---

- Now auto preselects MSP tenant when creating a new person and the user is an MSP user
- Auto navigate back to Person List when creating/updating a person
- Added a link to Microsoft documentation on how to obtain a user's Object ID
- Added filtering to Stages column on the maintenance session table
  ![image](https://immybot.blob.core.windows.net/release-media/6387bac3-666c-4606-a514-15c46797ff1d)
- String variables passed into a remote runspace now get expanded automatically just like running normal scripts, preventing the need to run ExpandString on variables containing paths like $InstallerFile and $InstallerFolder
  - ```powershell
    Invoke-ImmyCommand {
        # This is no longer necessary
        $InstallerFile = $ExecutionContext.InvokeCommand.ExpandString($using:InstallerFile)
        # You can now use $using:InstallerFile directly
        Start-Process -Wait $using:InstallerFile
    }
    ```
- Fixed issue preventing a user from re-running an action on a failed session
- Fixed issue where a person could be saved with an external id that was not a valid GUID
- Fixed an issue where required file parameters were still throwing the "parameter x is marked required..." exception even when present
- Added the `PrimaryPersonId` and `PrimaryPersonName` fields to the response from the metascript `Get-ImmyComputer -TargetGroupFilter All` method
- Fixed issue with computers undergoing onboarding where the computer would get set to onboarded before detection ran, which would exclude any target assignments relying on the onboarding flag
- Fixed an issue that prevented a user from resolving conflicts for new computers

## 0.41.8

Released 2021-04-06

### Bug Fixes and Improvements

---

- Added the most recently updated computers by default in the computer dropdown on the deployment form
- Updated the descriptions for the start date and end date for brandings to indicate that they are **inclusive**. A branding is applicable if it is greater than or equal to the start date and less than or equal to the end date
- Added a "DEPLOY" button to items on the Maintenance Tasks list, and added a badge for maintenance tasks that are marked as "Configuration Task" to help identify them
- ConnectWise Control: You may now Switch Logon Sessions (including using backstage) and Run Toolbox Items from Remote Sessions started with ImmyBot
- Removed blank extra column from software deployment references table
- Fixed a bug where deployments for a specific chocolatey software were failing
- Fixed a bug where you could not save a deployment that had a required maintenance task parameter file

## 0.41.7

Released 2021-03-31

### Bug Fixes and Improvements

---

- Added pending actions to dashboard results
- Fixed an issue where sessions with no actions requiring execution would still enqueue the execution stage.
- Improved SSL certificate handling

## 0.41.6

Released 2021-03-30

### Configuration Tasks

---

Added better support for Software Configuration Tasks by allowing a maintenance task to be checked off as a Configuration Task.

Configuration Tasks are used to provide parameters to software install scripts and/or provide additional configuration after the software is installed. Checking this box allows you to select this Maintenance Task from the Configuration Task section of the 'Edit Software' page. Configuration Tasks are not select-able on the 'Edit Deployment' Page to prevent accidental deployment without the associated software.

![image](https://immybot.blob.core.windows.net/release-media/ec4caad0-653c-47e1-9ed3-4cc465e62e2e)

The Configuration Task selector on the Software Edit Page now only show maintenance tasks that have Configuration Task checked.

![image](https://immybot.blob.core.windows.net/release-media/2a70e1a1-dbbb-4b8c-9e60-8b11dfcbd0dc)

## 0.41.5

Released 2021-03-26

### Bug Fixes

Fixed a problem with the computer identification job timing out too early

## 0.41.4

Released 2021-03-26

### Bug Fixes

Fixed an issue on startup that was causing issues with computer identification

## 0.41.3

Released 2021-03-26

### Bug Fixes

<span style="color: red">**IMPORTANT**</span> - Fixed an issue that caused computer identification and device syncing from RMM providers to stop working. This bug was introduced in an update to a database dependency in 0.41.0.

## 0.41.2

Released 2021-03-26

### Bug Fixes

Fixed an error that was occurring when uploading software

## 0.41.1

Released 2021-03-25

### Recommended Software and Maintenance Tasks

---

Added the ability to mark a software or maintenance task as _Recommended_.

![image](https://immybot.blob.core.windows.net/release-media/635573a1-b763-400c-b9f8-c2328b1f60c4)

The Maintenance Item selector in the Edit Deployment Screen will push Software and Maintenance Tasks marked as recommended to the top of the list, making it easier to disambiguate packages that exist in multiple repositories.

![image](https://immybot.blob.core.windows.net/release-media/d930984c-6bea-437e-a943-1401b88a3ad9)

![image](https://immybot.blob.core.windows.net/release-media/e73663be-9474-49b0-bb15-859bc298a554)

Added new filters to the top of the software list page

![image](https://immybot.blob.core.windows.net/release-media/040c029c-a56a-49a7-a1bd-55b65ba211dc)

Added new filters to the top of the maintenance task list page

![image](https://immybot.blob.core.windows.net/release-media/9a226551-a7f5-434a-9224-20abcb4b5889)

### Bug Fixes and Other Improvements

- Hid maintenance actions on the computer's software list where the desired state is not present and the software is missing
- Added the computer's name to the page title on the computer details page.
- Fixed a bug with previewing and deploying tenant maintenance tasks on the deployment page
- Fixed a bug with saving tenant maintenance tasks
- Fixed issue with previewing offline computers on the deployment page

## 0.41.0

Released 2021-03-23

### Software Icons

QOL feature where we added the ability to upload icons to software that can be displayed in software lists.

We will incrementally start adding icons to Global Software and displaying the icons on various pages where software are shown, such as the Dashboard and Maintenance Session Details pages.

![image](https://immybot.blob.core.windows.net/release-media/87ac591e-eba5-401f-b80d-850940b3e5ca)

![image](https://immybot.blob.core.windows.net/release-media/252f3f9b-2927-472f-9790-defb29ff0188)

#### Media

---

ImmyBot now officially supports uploading media that can be used in Maintenance Tasks as file parameters. Existing media can now be selected from the media library for re-use on multiple maintenance tasks.

![image](https://immybot.blob.core.windows.net/release-media/fd69024e-cbf5-4940-8dfa-b42c25c7e886)

#### Detection Only Maintenance Sessions

---

Detection only maintenance sessions are replacing the "Preview" feature where we determine what needs to be done for a computer to be compliant without actually enforcing compliance. The benefit over the old "preview" is that detection only maintenance sessions will persist to the database.

A detection only session will gather all deployments for a computer, and if the computer is online, it will then run detection to determine compliance. If the computer is offline, it will only determine what the desired state is.

#### Additional computer software list filtering

---

Added additional filtering to the computer's software list that allows you to filter by managed software, inventoried software, or both. Also, a toggle to show "Hidden Items" was added to show or hide system component inventoried software.

![image](https://immybot.blob.core.windows.net/release-media/0e0cc80d-3e40-496b-aace-fcf3025f38d4)

#### Max session indicator

---

Updated the Sessions List page headers to show Created Sessions and the max number of running sessions Immy can run concurrently.

![image](https://immybot.blob.core.windows.net/release-media/3f27e7c1-89aa-4caf-8654-677be3f9297e)

### Bug fixes and other improvements

---

- Reduced the vendors bundle size by ~7MB by chunking out the dependencies for exceljs and monaco-editor which will decrease initial page load
- Updated Entity Framework Core to EF Core 5
- Licenses restricted to major version are now allowed for software with a desired state of Latest, Any, or Update If Found
- Improved the merging of software found from actions and inventory in the computer software list by merging on upgrade code and software table detection if possible
- The onboarding form's Primary Person and Additional Person inputs now pre-populate with the 5 most recently updated people
- Reduced bundle size of assets for faster loading
- Fixed an issue with run-script responses of semantic versions being coerced into numbers
- Invoke-ImmyCommand no longer throws warning when script output is null
  - ![image](https://immybot.blob.core.windows.net/release-media/0ccf4e26-87d8-4737-9a4a-16f645832dec)
- Fixed issue with the computer select box returning orphaned computers

## 0.40.4

Released 2021-03-17

### New Features

- Exposed the current agent installer version as "ExtraData.AgentInstallerVersion" in the `Get-RmmInfo` call when returning ImmyAgent RMM Links
  - ![image](https://immybot.blob.core.windows.net/release-media/4e66275a-8fdc-4824-b1ad-15e986efbc9b)

### Improvements

- Increased BITS transfer timeout from 60s to 300s
- Added some extra information to BITS failure logs

## 0.40.3

Released 2021-03-12

### Bug Fixes

Fixed a bug in the ImmyBot Agent where devices would fail the re-key request when the serial number changed.

## 0.40.2

Released 2021-03-08

### Azure Improvements

----Added the ability to create tenants from your Azure Customers from the Azure page. This is convenient for those only using the ImmyBot Agent, and want to quickly create tenants from their Azure Customers. We also added the Azure Customer Domain to the table since this may be valuable to see.

![image](https://immybot.blob.core.windows.net/release-media/22e52fe4-1739-49e3-b624-d3cd307be64b)

### Chocolatey Improvements

---

Our managed server that proxies and caches Chocolatey requests can at times be unreliable. Also, this server is not geographically replicated so it is not the best solution for those using ImmyBot outside of the US. We added logic that automatically falls back to using Chocolatey directly whenever our managed server is responding poorly. We also improved our caching which resulted in better response times and fewer requests sent to Chocolatey.

### Script Session Logs Improvements

---

Updated the styling of script session logs. Clicking "Open Debugger" now copies the script output to the terminal.

![image](https://immybot.blob.core.windows.net/release-media/0681edc0-c106-4e2c-8ed9-649cd7fe3473)

### Schedule Improvements

---

The default detection time for new schedules has been changed to 2PM. The default execution time for new schedules has been changed to 10PM. Extra details were added to detection and execution time descriptions on new schedule form.

![image](https://immybot.blob.core.windows.net/release-media/8f1f906f-4e21-4f16-998e-32f4563f600d)

### Deployment Improvements

---

Deployment options more clearly indicate that they will only affect sessions created on the deployment page and will not be saved with the deployment itself.

![image](https://immybot.blob.core.windows.net/release-media/dae05886-dc34-46fb-871a-582992fc75fa)

### Bug Fixes

---

- Fixed an issue with the software auto update method `Add-SoftwareVersion` where it would not accept valid versions.
- Fixed an issue in Firefox where clicking inside the "Download ImmyBot Agent Installer" dropdown closed the dropdown
- Fixed issues in computer software list where local and global software/tasks did not have links
- Fixed an issue with displaying emails in the iPhone mail app, where the body of the email was very small
- Fixed a bug during renaming a computer where it would still attempt the rename even if the computer already had the desired name
- Fixed bug where CWA RMM Link form was not verifying correctly when manual entry code was filled-out then cleared
- Added validations to ensure that CW Automate manual entry codes are at least 7 digits in length and must contain only alpha-numeric characters
- Fixed issue with Immy Emails having the wrong action text
- Fixed metascript output logs not showing up as primary highlighted logs
- Removed duplicate output log from cloud scripts
- Fixed an issue where logs were unclear if download failed

## 0.40.1

Released 2021-03-01

### Added PPKG option to disable hibernation

Set to true by default.

### Schedule specific maintenance items alert message

---

Added an alert message on the schedule details page to better clarify why some computers may not have maintenance sessions started.

![image](https://immybot.blob.core.windows.net/release-media/7d7ccc18-bb2b-49b1-9032-3bf74ab3192d)

### Improved Custom Detection Script logic

---

Custom Detection Scripts can now return any output as long as the last word is a valid semantic version.

#### Example

```powershell
write-output "The version found is 1.0.0" ## translates to a detected version of 1.0.0
write-output "Version:`n`n1.0.0" ## translates to a detected version of 1.0.0
```

### Bug Fixes

---

1. Fixed issues with setting appropriate fields when the analyzer returns data for an uploaded software
1. Fixed an issue where new computers were not getting moved to onboarding after being identified if the computer already existed.
1. Fixed an issue when re-installing with the uninstall/install method, where the installer failed to downloaded and left the software uninstalled
1. Replaced the word "undetermined" in Immy emails with a blank
1. Fixes an issue displaying output logs for cloud scripts on the deployment page
1. Fixed configuration task search not using case-insensitive searching.
1. Configuration Task selector now shows 5 most recently updated items by default
1. Fixed a bug where the view software buttons on the Software List Page were missing
1. Fixed an issue with software version test script logic that was triggering a re-install when the test script did not explicitly return `false`. Test scripts must now explicitly return `false` in order to trigger a re-install. Returning `null`, `""`, and `0` will not trigger a re-install.
1. Enabled the metascript execution context for custom detection scripts
1. Removed the "all scripts are disabled for task" alert on the deployment form for configuration tasks
1. Fixed a bug on the deployment form where it would not let you save if you changed the selected maintenance item from one software to another
1. Fixed a bug on the deployment form where it would not keep your selected desired state when changing the selected maintenance item from one software to another
1. Fixed a bug preventing the logout button from working

## 0.40.0

Released 2021-02-24

#### Dashboard Page

---

Added a new page that can provide you the latest actions for software and maintenance tasks that were run against a group of computers. The page is intended to help produce audits and show whether or not computers are compliant. This page is a work in progress and will be iterated on over the next few weeks.

![image](https://immybot.blob.core.windows.net/release-media/7a0c32f8-3011-450a-94a1-2633b6a65c09)

##### How to use it

1. Select a target scope for the computers you are interested in.
1. Select one or more software or maintenance tasks
1. The table will then show you a green check, a red x, or nothing to indicate the compliance of the selected item for that computer
   - A green check indicates that the latest action for the item is compliant.
   - A red x indicates that the latest action for the item is not compliant.
   - Nothing indicates that ImmyBot has not run an action against the computer for the item.

![image](https://immybot.blob.core.windows.net/release-media/22f43392-98f8-42f5-9923-4ef171a657f5)

- You can filter the data for each software or maintenance task added by clicking the filter button next to the item's name.
- You can remove an item from the table by clicking the red X button next to the item's name.

![image](https://immybot.blob.core.windows.net/release-media/532a234c-7deb-44aa-8097-e1be0465ada6)

- Click the `xlsx` button located at the top-right corner of the table to export the data in the table.

![image](https://immybot.blob.core.windows.net/release-media/2cc6c4be-09a2-489c-876e-18c8fcdd10b0)

- The excel export will contain an "Overview" worksheet, that provides you the compliancy of the selected software and tasks for each computer.

![image](https://immybot.blob.core.windows.net/release-media/555ff1ca-f2f9-47bd-967b-b7a7ae111e7f)

- For each software and task you have in the table, an additional worksheet will be added that provides you information about the latest action taken.

![image](https://immybot.blob.core.windows.net/release-media/8d1bb0b7-ca66-427d-bb27-4d08cdccda76)

#### Restart ImmyBot

---

Added a **Restart ImmyBot** button to the System Status Page. The System Status Page has been moved to the top of the navbar.

_Note_: Only MSP Admin users can see this page.

![image](https://immybot.blob.core.windows.net/release-media/830b95ea-9f95-4d35-b878-27de5ddb4303)

#### Get-RmmInstallScript Metascript

---

Exposed new metascript `Get-RmmInstallSCript -RmmLinkId <int>` that will return a script block containing the powershell install script for the specified rmm link. This is was added to provide an quick way to update the ImmyBot Agent on computers. Long term, we will add auto update logic to the ImmyBot Agents so we don't have to do this.

##### Example usage

```powershell
$RmmInfo = Get-RmmInfo -ProviderType ImmybotAgent
$ScriptBlock = Get-RmmInstallScript -RmmLinkId $RmmInfo.RmmLinkId
Invoke-ImmyCommand $ScriptBlock
```

#### Improved Software Detection

---

We expanded the "Software Table" detection method to have three search modes: Contains, Regex, and Traditional.

We added a lookup table that can search the known software on your computers to help create better detection methods.

The **Contains** search mode allows you to target software using a contains search.

![image](https://immybot.blob.core.windows.net/release-media/2fd1fa6c-7a5a-4e1f-b31b-2a8f25df8c0c)

The **Regex** search mode allows to target software using regular expressions.

![image](https://immybot.blob.core.windows.net/release-media/acb119f1-2b67-4ccc-85f4-cb51ed455f93)

The **Traditional** search mode is the old detection style used by ImmyBot. This method is essentially the same as Regex, but replaces occurrences of _ with ._

##### Software Lookup Table

---

The table will show software already installed on your computers that matches the detection method you provide.

We provide the software name, version, upgrade code (if present), and how many computers in your instance have it installed.

![image](https://immybot.blob.core.windows.net/release-media/2ae846c2-29e0-4819-8b0e-3d09e3dc5336)

#### Software Repair

---

Added a software repair option to the Software Details Page

![image](https://immybot.blob.core.windows.net/release-media/c399015c-161c-4548-bd83-570ec932248c)

On a computer's software tab, you can now click a repair button that will perform the specified repair logic.

![image](https://immybot.blob.core.windows.net/release-media/3a3f0587-0b05-4af0-ac10-bd06e31164b5)

#### Updated the azure dependencies for the Immy Agent

---

#### License Restriction Improvements

---

Updated the license page's software version restriction component for better clarity

![image](https://immybot.blob.core.windows.net/release-media/a924f0d1-c204-48bb-ae05-f43204e0c089)

Added help text to the license selector on the deployment page to indicate how licenses are filtered

![image](https://immybot.blob.core.windows.net/release-media/f9818cda-26b6-474a-8009-8184213e927f)

#### CleanPC option for PPKG

---

Added option to PPKG to remove pre-installed software.

- Improved the overall speed of the New Computers page
- Removed offline computers from the "Needs a Manual Decision" and "Failed" columns from the New Computers page.

### Bug Fixes

---

- Added condition to fail a maintenance task action if the deployment does not specify a maintenance task mode.
- Fixed a bug where global software custom detection scripts were not being found correctly.
- Fixed intermittent deadlock that would occur when running scripts against recently connected ImmyAgent computers
- Fixed an issue with logs at the end of the session showing up under 'Starting execution phase'

## 0.39.8

Released 2021-02-12

### New Features

- Added support for Google Two-Factor Authentication for CW Automate RMM links

### Improvements

- Removed CW Automate SQL-over-SOAP usage / switched to using the CW Automate REST API for command execution
- Removed legacy RmmComputer Contact lookup during sessions as this was an artifact from when Immy was a part of Automate and didn't work anyway

### Bug Fixes

- Fixed a bug with cross tenant filter scripts not properly resolving to the desired computers

## 0.39.7

Released 2021-02-01

### Improvements

- Added more indexing to the computer table to help load the computer list page faster
- Updated ConnectWise ScreenConnect extension to support older versions that are not running at least c## 6.
- Improved the computer identification job to detect fresh installs with OfflineInstallationId
- Improved the computer ientification job to detect whether a computer is a sandbox. If it is, then it will always overwrite an existing sandbox to make testing simpler.
- On the Schedule Details Page, updates the maintenance item selector description to say "Optionally limit this schedule to a specific software or maintenance task. ImmyBot will only create sessions for computers that have a deployment for the selected item."
- Refactored the ImmyBot maintenance email code for better maintainability
- Changed default ImmyAgent protocol to MQTT dto reduce periodic reconnections

### Bug Fixes

- Fixed an issue where re-running a maintenance task was not setting the script parameters
- Fixed a bug where user scripts set to run at logon were failing to find the method `New-PowershellLogonScript`
- Fixed an issue with terminal text being displayed as double-spaced on MacOS/iOS/Linux browsers
- Fixed an issue on the deployment page where unchecking a parameter's "Override" option was still using the stored overridden value when previewing or deploying
- Fixed filter script deployments not showing correct data on the deployment list page
- Escaped backslashes in the default new maintenance task script

## 0.39.6

Released 2021-01-27

### Bug Fixes

- Fixed issue with inventory being rescheduled when the inventory tasks failed
- Fixed an issue with the `New-SoftwareVersion` auto-update script failing

## 0.39.5

Released 2021-01-26

### Bug Fixes

- Removes an unnecessary session log
- Fixes an issue introduced in 0.39.0 where maintenance task parameter values were not getting set properly when the task was being enforced

## 0.39.4

Released 2021-01-25

### Progress Logs

- Enhanced the logs panel to group related data
- Added a progress bar to the detection and assignment resolution log group
- Added support for metascript `write-progress` to save progress logs during a session.

![image](https://immybot.blob.core.windows.net/release-media/def4f8c8-3c26-49e9-8adc-0af46a62af0c)

---

### Upload Files From Computers

- New MetaScript cmdlet: `New-ImmyUploadSasUri [-BlobName <string>] [-Permission <string>] [-ExpiryTime <DateTime> = now + 1 day]`
- With no parameters, `New-ImmyUploadSasUri` will generate a URI that can be used to create and upload blobs into local storage
- With the `BlobName` parameter, `New-ImmyUploadSasUri` will generate a URI that can be used to upload data into a blob file in local storage
- See [the Azure documentation on blob operations](https://docs.microsoft.com/en-us/rest/api/storageservices/operations-on-blobs) for more details on blobs

---

### Schedule Individual Maintenance Items

![image](https://immybot.blob.core.windows.net/release-media/3e577323-4f7d-4b19-914f-da51a319600a)

- Added ability for schedules to target a specific piece of software or maintenance task

---

### My Devices

- Adds a section under the user dropdown in the top navbar for **My Devices**. Under **My Devices**, you will see all computers where the currently logged on user is the primary person.

![image](https://immybot.blob.core.windows.net/release-media/88197235-35f2-4ce3-93ad-19c786bbbd5e)

---

### Primary Domain Controller Target Group Filter

- Adds "Primary Domain Controllers" target group filter to schedules and deployments.

![image](https://immybot.blob.core.windows.net/release-media/8053653b-703c-4d6b-a338-b708106d82b9)

---

### Allows for licenses to be restricted to a major version.

![image](https://immybot.blob.core.windows.net/release-media/6a8c48c4-901a-4b99-accd-c88a3e2ff294)

---

### Metascript Error Handling

- Results from Invoke-ImmyCommand are no longer lost when a terminating error is thrown
- Line numbers are preserved in error messages in Invoke-ImmyCommand
  ![image](https://immybot.blob.core.windows.net/release-media/b71a372f-e810-420a-b73e-7896855ef00b)
  ![image](https://immybot.blob.core.windows.net/release-media/55ea5c09-a62f-45d5-ba4f-5a572683f4bd)

---

### New Script Parameters

Variables $RebootPreference and $ActionType are available in scripts.

![image](https://immybot.blob.core.windows.net/release-media/9ca5166e-4e64-4b1b-baa4-87440143c8a4)

- ActionType helps code re-use when an Update script is very similar to the Install Script with the exception of requiring additional parameters to indicate update mode (Quickbooks)
- RebootPreference allows you to honor the Session's RebootPreference in metascripts that otherwise would reboot the computer.
  $Parameters variable now additionally added to Metascripts to allow easy passing of all parameters to remote machines

```powershell
$Parameters.ComputerName
Invoke-ImmyCommand {
    $Parameters = $using:Parameters
    $Parameters.ComputerName
}
```

---

### Timezone Support for Schedules

- Schedules now have the ability to specify a timezone. The detection and execution time are then relative to the selected timezone. If you use a custom cron expression, then it will also be relative to the selected timezone. The default option will be UTC to match the previous functionality.

![image](https://immybot.blob.core.windows.net/release-media/7fd865a5-36ab-4e28-90fc-94ef2ce19612)

- The deployment options on the deployment page also provide you the ability to select which timezone to use when selecting the "later" option.

![image](https://immybot.blob.core.windows.net/release-media/ad6a352e-861b-4d93-ab96-26bb949228f5)

---

### My Customers (CSP Preconsent)

![image](https://immybot.blob.core.windows.net/release-media/75d8a4af-0833-41b8-b963-86054f34ea12)

- If you are on the `My Customers` Azure Level, we made assigning Azure customers to tenants and syncing people easier. Matching an azure customer to a tenant will now save and sync automatically.
- If you are on the `Customer` Azure Level, we made assigning Azure customers to tenants and syncing people easier. Selecting a tenant will now automatically save and sync.

---

### Software List Type Filter

- Added software type filter to the software list page fore easier filtering based on type

![image](https://immybot.blob.core.windows.net/release-media/ffc5e9fd-f769-4e1f-a111-692398800c93)

---

### Bug Fixes

- Metascript and Filterscript dropdowns now show recent scripts immediately
- Fixes a bug where maintenance task file parameters were not getting downloaded to the computer
- Fixes a bug where uploading .zip maintenance task files threw an error.
- Fixed issue where it was impossible to upload zip files as parameters to maintenance tasks
- Fixed a bug where we were overwriting computer details when an error occurred.
- Rerunning a configuration task now properly contains the task's parameter values
- Fixed an issue with errors being shown in session logs when ImmyBot stops

## 0.39.3

Released 2021-01-22

### Progress Logs

- Enhanced the logs panel to group related data
- Added a progress bar to the detection and assignment resolution log group
- Added Metascript support for PowerShell's native `Write-Progress` to create live progress bars to track the progress of long running scripts

![image](https://immybot.blob.core.windows.net/release-media/def4f8c8-3c26-49e9-8adc-0af46a62af0c)

### Upload Files From Computers

- New MetaScript cmdlet: `New-ImmyUploadSasUri [-BlobName <string>] [-Permission <string>] [-ExpiryTime <DateTime> = now + 1 day]`
- With no parameters, `New-ImmyUploadSasUri` will generate a URI that can be used to create and upload blobs into local storage
- With the `BlobName` parameter, `New-ImmyUploadSasUri` will generate a URI that can be used to upload data into a blob file in local storage
- See [the Azure documentation on blob operations](https://docs.microsoft.com/en-us/rest/api/storageservices/operations-on-blobs) for more details on blobs

### Schedule Individual Maintenance Items

![image](https://immybot.blob.core.windows.net/release-media/3e577323-4f7d-4b19-914f-da51a319600a)

- Added ability for schedules to target a specific piece of software or maintenance task

### My Devices

- Adds a section under the user dropdown in the top navbar for **My Devices**. Under **My Devices**, you will see all computers where the currently logged on user is the primary person.

![image](https://immybot.blob.core.windows.net/release-media/88197235-35f2-4ce3-93ad-19c786bbbd5e)

### Primary Domain Controller Target Group Filter

- Adds "Primary Domain Controllers" target group filter to schedules and deployments.

![image](https://immybot.blob.core.windows.net/release-media/8053653b-703c-4d6b-a338-b708106d82b9)

### Allows for licenses to be restricted to a major version.

![image](https://immybot.blob.core.windows.net/release-media/6a8c48c4-901a-4b99-accd-c88a3e2ff294)

### Metascript Error Handling

- Results from Invoke-ImmyCommand are no longer lost when a terminating error is thrown
- Line numbers are preserved in error messages in Invoke-ImmyCommand
  ![image](https://immybot.blob.core.windows.net/release-media/b71a372f-e810-420a-b73e-7896855ef00b)
  ![image](https://immybot.blob.core.windows.net/release-media/55ea5c09-a62f-45d5-ba4f-5a572683f4bd)

### New Script Parameters

Variables $RebootPreference and $ActionType are available in scripts.

![image](https://immybot.blob.core.windows.net/release-media/9ca5166e-4e64-4b1b-baa4-87440143c8a4)

- ActionType helps code re-use when an Update script is very similar to the Install Script with the exception of requiring additional parameters to indicate update mode (Quickbooks)
- RebootPreference allows you to honor the Session's RebootPreference in metascripts that otherwise would reboot the computer.
  $Parameters variable now additionally added to Metascripts to allow easy passing of all parameters to remote machines

```powershell
$Parameters.ComputerName
Invoke-ImmyCommand {
    $Parameters = $using:Parameters
    $Parameters.ComputerName
}
```

### Timezone Support for Schedules

- Schedules now have the ability to specify a timezone. The detection and execution time are then relative to the selected timezone. If you use a custom cron expression, then it will also be relative to the selected timezone. The default option will be UTC to match the previous functionality.

![image](https://immybot.blob.core.windows.net/release-media/7fd865a5-36ab-4e28-90fc-94ef2ce19612)

- The deployment options on the deployment page also provide you the ability to select which timezone to use when selecting the "later" option.

![image](https://immybot.blob.core.windows.net/release-media/ad6a352e-861b-4d93-ab96-26bb949228f5)

### My Customers (CSP Preconsent)

![image](https://immybot.blob.core.windows.net/release-media/75d8a4af-0833-41b8-b963-86054f34ea12)

- If you are on the `My Customers` Azure Level, we made assigning Azure customers to tenants and syncing people easier. Matching an azure customer to a tenant will now save and sync automatically.
- If you are on the `Customer` Azure Level, we made assigning Azure customers to tenants and syncing people easier. Selecting a tenant will now automatically save and sync.

### Software List Type Filter

- Added software type filter to the software list page fore easier filtering based on type

![image](https://immybot.blob.core.windows.net/release-media/ffc5e9fd-f769-4e1f-a111-692398800c93)

### Bug Fixes

- Metascript and Filterscript dropdowns now show recent scripts immediately
- Fixes a bug where maintenance task file parameters were not getting downloaded to the computer
- Fixes a bug where uploading .zip maintenance task files threw an error.
- Fixed issue where it was impossible to upload zip files as parameters to maintenance tasks
- Fixed a bug where we were overwriting computer details when an error occurred.
- Rerunning a configuration task now properly contains the task's parameter values
- Fixed an issue with errors being shown in session logs when ImmyBot stops

## 0.38.4

Released 2021-01-15

### Improvements

- Invoke-CWARestMethod now supports all verbs Automate accepts, including PUT and DELETE
- Invoke-CWARestMethod no longer requires that the body is an array, and no longer errors when the API returns a non-array

### Bug Fixes

- Fixes a bug where the script modal would close when you hit save even if the script had an error. It now stays open until it is successfully saved.
- Fixes a bug where the Ready for Onboarding count was not matching the number of items in the table.
- Fixes a bug where click `Overwrite existing computer` on the New Computers page threw an error about not being able to find the existing computer
- Fixes a bug with `URI` type parameter values where if no scheme is provided it would fail. It now defaults to `https://`.
- Fixes a potential issue where a tenant filter script could get run for a different tenant.
- Fixes a bug where the path to the file that was downloaded was incorrect for maintenance task file parameters.
- Corrects an issue where the Agent Install fails to get the serialnumber of the machine because we are referencing the incorrect WMI class.

## 0.38.3

Released 2021-01-04

### Improvements

#### Computer Software list loads instantly

- Computer->Software tab loads instantly allowing you to perform actions immediately instead of waiting 1-2 minutes. Keep an eye out in 0.39 for major functionality on this page!
- Added indications on to the Computer-Software tab about whether or not Immy installed the software, and if so whether it was a one-off 'adhoc' deployment or part of a saved Deployment.

![image](https://immybot.blob.core.windows.net:443/media/050700b1-4a9d-4e7b-8cf5-ce179e8f22c7.png)

#### Parameter Ordering

- Added parameter ordering on the maintenance task form, and made the deployment form use that ordering when listing maintenance task parameters
- ![image](https://immybot.blob.core.windows.net:443/media/7557672f-de44-44ad-85c0-e09632e557a5.png)

### Bug Fixes

- Fixed an issue with not being able to re-enable a disabled psa link
- Fixed an issue with Immy attempting to sync psa clients for a disabled psa link
- Computers without system inventory would not appear in the computer list. They now appear in the list and can be filtered on their Immybot device_id instead of computer name as computer name is not present.
- Fixed an issue where the entire maintenance session would fail if an assignment had invalid parameters
- Fixed a bug introduced in 0.38.2 that would cause BITS downloads to fail and the basic download to be used.
- Fixed a bug where we were not clearing certain fields when a file upload was removed from the uploader.
- Fixed a permission issue with returning script data for non-msp users.
- Pressing Deploy on the Edit Deployment page no longer auto expands the logs, making it easier to Deploy to multiple individual computers
- Fixed a bug where you could not edit or view a disabled PSA Link
- Invoke-CWARestMethod and other cmdlets used for interacting with the CWA API now contain error information returned by the API itself instead of being stripped down to a generic server error.

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
