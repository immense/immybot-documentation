# Releases in 2022

## 0.54.7

Released 2023-01-04

### Improvements

- Improved error messages when the error is coming from an integration's API, such as the CW Automate API, CW Manage API, or CW Control ImmyBot extension API.
- Added manufacturer to duplicate agent table
- Added Device ID to the computer overview details

### Bug Fixes

- Fixed a potential issue where a computer architecture could not be found while trying to resolve a dynamic software version
- Fixed a transient issue that was causing detection to fail when it could have continued
- Fixed an issue where pending connectivity sessions would not be triggered for a computer that came online due to a manual resolution for a conflicting agent
- Fixed an issue during identification where the device id of "00000000-0000-0000-0000-000000000000" was allowed as a valid GUID.  It is not valid, and new devices with this GUID will be assigned a new one.

## 0.54.6

Released 2022-12-27

### Improvements
- Only MSP Admins have access to the Tenant Mappings tab now

### Bug Fixes

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

- Fixed an issue with deleting actions that caused sessions to fail
- Fixed an issue saving some database calls due to issues from the migration to flex database servers
- Fixed an issue with saving scripts that incorrectly fail with a message that the name is not unique

## 0.54.4

Released 2022-12-19

### Improvements

- Added bulk cancel and bulk rerun buttons to the maintenance session list page
Added `Split-Path` cmdlet as well as `$ActionId`, `$SessionId` and `$SessionGroupId` to the included variables
- Improved Ephemeral Agent connection speed
- Discontinued use of WMI CreateProcess which flags AV, specifically Windows Defender for Endpoint
- Made modifications to the light color theme to improve readability

### Bug Fixes

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

- Improved enqueueing of maintenance sessions based on priority.  Adhoc > Onboarding > Scheduled maintenance
- Removed service bus form options for CW Control as the service bus is now always used
- Added a health check to the CW Control integration to report unhealthy when the extension is not up to date
- Updated the connected indicator on the computer details page to have a yellow lightning bolt when the ephemeral agent is connected
- Scripts are now allowed to run for computers that have an ephemeral agent connected even if the agents all report disconnected
- Updated the batch actions on the tenant list page to include tenant preferences. e.g. You can now update tenant business hours in bulk
- Clicking "Attempt Identification Again" or "Rety x failed agents" on the identification tab now immediately triggers identification where before it would take up to 60 seconds

### Bug Fixes

- Made computer feature usage calculator no longer count computers that have zero agents
- Fixed a race condition in the Ephemeral Agent that would cause scripts to hang and sessions to timeout

## 0.54.2

Released 2022-11-17

### Improvements
- Improved our identification de-dupe logic to automatically associate re-installed agents to the correct computers
- Added more identification logs for some edge case scenarios to help with debugging
- Added onboarding text to dashboard underneath onboarding computers
- Slightly improved performance of preview/deploy functionality on the dashboard page
- Increased the width of the tag selector in the ImmyBot Installer form and on the computer details page

### Bug Fixes
- Fixed some issues where newly identified agents would always skip onboarding
- Fixed an issue where non-msp admins could not view tag deployments limited to their tenant
- Added missing times to the time dropdown for scheduling adhoc deployments
- Fixed descriptions on the maintenance task get/set/test script dropdowns
- Fixed some mobile styling issues with the navigation bar and on computer list page

## 0.54.1

Released 2022-11-14

### Bug Fixes

- Fixed an issue with CW Control syncs causing CW Control agents to re-sync into ImmyBot unnecessarily

## 0.54.0

Released 2022-11-11

### CW Control Updates

We added support for the breaking changes introduced in CW Control 22.9.
We addressed stability issues with Control crashing due to the ImmyBot extension.  On the Control integration form, make sure you check off the new options for using the Service Bus for better performance.

### Pending Identification Updates

Agent identification now has logging to help you find root causes for why some agents fail to have scripts run against them. View them in Computers -> Pending Identification -> Show Identification Logs

You can also see the identification logs for successfully identified agents under the Computer -> Agents tab.

We now utilize the serial numbers for devices that come from trusted manufacturers (currently Lenovo, Dell, and HP). If a computer already exists in ImmyBot for a trusted manufacturer, any additional agents with that computer's serial number will skip identification and automatically be associated.

### Improvements
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

- Removed the ImmyBot Agent from the Tenant -> Mappings table
- Reduced metric reporter frequency to 30 minutes

## 0.53.11

Released 2022-10-20

### Bug Fixes

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

- Fixed an issue with displaying large software icon sizes on the Library -> Ordering page

## 0.53.9

Released 2022-10-05

### Improvements

- SVGs now render correctly when uploaded as software icons
- Increased some low timeout values on the ephemeral agent that were causing devices with slow network connections to fail
- Changed the Pending Identification tab to default sort descending by Date Added since the most recent machines are the ones we are usually looking for.

### Bug Fixes

- Fixed an issue with the ImmyBot Agent connected/disconnected events not propagating for pc reboots and pending connectivity sessions
- Reduced likelyhood of `Output CircularBuffer has already over-run requested index` error in scripts
- Ephemeral Agent reconnection is now prevented upon receiving a 500 status code.  This was previously causing agents to stay running indefinitely.
- Fixed an issue on the system update page where the new releases dropdown was not stretching the width like the current release dropdown

## 0.53.8

Released 2022-9-22

### Improvements

- The "Suppress Reboots During Business Hours" flag no longer relies on  offline behavior.  If you are suppressing reboots during business hours and you run a session during business hours, then Immy will suppress reboots.  Business hours are now checked on every script execution, and the `RebootPreference` variable passed to scripts will also be updated to `Suppress` if it was not already set. We did this so that scripts that handle reboots can safely rely on this variable.
- The customer list on the Azure page no longer shows the MSP tenant as a selectable option in the Linked Tenant dropdown since the MSP tenant is mapped by default
- Refactored how we handle ImmyBot agent connected and disconnected events.  Instances that heavily utilize the ImmyBot agent will have significantly improved performance.
- The `Enable Automatic Onboarding` field on the PPKG form is now disabled and shows an alert if the onboarding preference is globally disabled or disabled for the selected tenant.

### Bug Fixes

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

- Increased the timeout of the Ephemeral Agent's Ping RPC method from 1 second to 5 seconds.  1 second was too short and was unnecessarily causing scripts to fail on machines with high network latency.
- Added a warning message whenever the Ephemeral Agent's Ping RPC method takes over 1 second to respond to help identify machines with high network latency

### Bug Fixes

- Fixed an issue with schedules where updating a schedule from a single tenant to cross tenant would delete the schedule. This was happening due to a bug in a database constraint between schedules and tenants.
- Fixed an issue where the connectivity status button on the computer details page was not actually refreshing the agent's connectivity status
- Fixed an issue where repairing a software would trigger full maintenance

## 0.53.6

Released 2022-09-12

### Improvements

- Added `Set-ImmyDeviceId` cmdlet to be used during Inventory to keep the UUID of the machine up to date and prevent new computers from getting created when the UUID of the machine has changed due to a feature update.

### Bug Fixes

- Fixed an issue where the "Determine Desired Version" phase was running before the "Detect Installed Version" phase. "Detect Installed Version" needs to run first so we can pass the detected version to scripts that may rely on it when determining the desired version.
- Fixed an issue where dynamic versions were not properly installing dependent versions

## 0.53.5

Released 2022-09-09

### Bug Fixes

 - Fixed an issue from 0.53.4 where some code changes were unintentionally  included in the release which caused downloading the PPKG to fail

## 0.53.4

Released 2022-09-08

### Improvements

- For maintenance task test scripts, we made Immy tolerant of non-Boolean values by displaying a warning when non-Booleans are found on the pipeline along with helper text for preventing output pollution.
- Updated the ImmyBot Agent to support installing beta versions

### Bug Fixes
- Fixed a scripting error that caused Immy to indicate there was no output when there was definitely output

## 0.53.3

Released 2022-08-30

### Software Test Script Changes

We now execute the software test script during the detection stage for software that have updates available.

**Before**, if a software needed to be upgraded, we would not run the software's test script in detection.  We would perform the upgrade and then run the test script afterwards.  However, if the test failed, the action would fail without any remediation.

**Now**, if a software needs to be upgraded, and it has a test script, the test script will run in detection. If the test script fails, then the repair strategy will be performed instead of the upgrade strategy.  The test script will still be run after the upgrade as it did before.

### General Improvements

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

- After a task is created, the `Runs Against` property is now disabled. Changing this value after it is created can cause issues for deployments that are referencing it.
- Fixed an issue with Ephemeral Agent resilient script output logic that would fail to re-connect if the script had never had any output prior to connection loss. (Ex. SonicWall VPN installer script)
- Added missing triggered by text on the session details page when the session was triggered by a schedule or automatic onboarding
- Fixed a width issue on some dropdown buttons
- Fixed an issue with the integration client list re-sorting after you link/unlink a tenant

## 0.53.2

Released 2022-08-19

### Bug Fixes
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
- Added a `Trigger Now` button to the Azure User Sync preference on the preferences page
- Added a description to the PPKG reset windows checkbox - "Will perform a reset of windows with the remove user data option"

### Bug Fixes
- Fixed an issue with agent identification where users were seeing the following error - `Failed attempt to differentiate existing agent and pending agent: 42883: procedure sp_create_computer_from_agent(integer, uuid, boolean, text, text, text, unknown, boolean) does not exist POSITION: 6`
- Updated the alert of the person list page to match the available actions
- Fixed an issue where the software configuration task edit link was missing
- Fixed an issue where the branding logo alt text was still hardcoded to "Immense Networks" instead of the value provided by the branding
- Fixed an issue with cancelling a detection only session from the computer details page -> software tab.

## 0.53.0

Released 2022-08-16

### UI Improvements

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

Moved Script items into the left pane

![image](https://immybot.blob.core.windows.net/release-media/7e9fbe48-4d66-45bd-9b26-759f29aa7c17)

### New Integration - HaloPSA
Deploy software/tasks to customers with specified recurring invoice items

### New Parameter Type - KeyValuePair

![image](https://immybot.blob.core.windows.net/release-media/a17d9261-c65f-4531-b5e5-4d912b40922c)

![image](https://immybot.blob.core.windows.net/release-media/0c7ef61b-64fc-415b-a29b-c5c4fff0d70a)

### Improvements
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


- The script list page now persists your filters after refreshing or leaving the page.
- Fixed width issues in the maintenance item column on the deployment list page
- Reduced required permissions for N-Central integration. See [the new N-Central integration docs](https://docs.immy.bot/ncentral-integration-setup.html) for details
- Added a new PowerShell cmdlet `Stop-ImmySession` that will cancel the maintenance session it is currently running in

### Bug Fixes


- Fixed some potential issues around agent connected/disconnected events
- Fixed potential N-Central exception with re-sending messages
- Fixed potential issue with 'missing' devices from N-Central due to possible filter contamination in N-Central

## 0.52.6

Released 2022-06-27

### Improvements


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


- Fixed an issue with exceptions that may occur inside the N-Central device-sync job causing memory to bloat
- You can now get registration tokens from the NCentral integration via new PSCmdlet `Get-NCentralRegistrationToken`

![image](https://immybot.blob.core.windows.net/release-media/501dd3bc-d823-40a0-a307-000ec5185e6a)

### Other Improvements


- Under "Preferences", the description of the User Affinity Sync feature says it will run every 4 hours; this is incorrect. Verbiage was changed to indicate it will run every 24 hours.
- On the integration details page, a confirmation modal has been added when clicking the "Bulk create tenants..." button to prepare users that this will cause code execution for linked clients.
- Added more improvements to online/offline agent handling during maintenance sessions
- Updated the online/offline event receiver for CW Control to return immediately in an effort to close requests faster

## 0.52.4

Released 2022-05-31

### Improvements


- Removed unnecessary checkboxes from the Computers table on the "Edit Schedule" page
- Immy live chat now supports screenshare! Immy support can now request access to view your screen to help resolve issues faster.

### Bug Fixes


- Fixed an issue with the maintenance email actions requiring authentication

## 0.52.3

Released 2022-05-27

### Improvements


- ImmyAgents no longer need to see a valid board serial number in order to complete registration or rekey. Instead, ImmyAgent may fall back on and rely on an 'ImmyHWID' (Immy hardware id), when a board serial is not available. ImmyHWIDs are derived from CPU, BIOS, MOBO, GPU, and TPM information where available.
- Updated maintenance sessions to listen on agent connected/disconnected events instead of computer online/offline events which have faster responses and higher success rates
- When a new agent comes into ImmyBot, we now kick off the identification job immediately if it isn't already running in an effort to speed up identification
- Added session logs for dependencies indicating what they are for. e.g. `Software A depends on Software B → If not installed then install`.
- The actions in the maintenance email (Reboot Now, Update Now, and Postpone), now link to a form on the ImmyBot instance instead of linking directly to the backend api. The reason for this is because some spam filters will automatically follow links in an email, which has accidentally caused computer reboots. Moving the link to a form allows spam filters to no longer be able to trigger the action automatically.

### Bug Fixes


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


- **ALL** scripts now run through the ephemeral agent, even during identification and computer de-dupe logic 🎉
- Additional exception information is now visible in Identification Failed tab, and in session output. This furthers insight for users to understand and fix potential reasons why the providers may have failed to run our agent.
  ![image](https://immybot.blob.core.windows.net/release-media/22b9d763-3a43-4403-8c01-70e020e3a303)
- Fixed an issue where the date was not being set correctly when adding a AgentIdentificationFailure log, leading the user to think this issue happened at the beginning of time!

### Other Improvements


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


- Fixed an issue where tag deployments were not resolving during full maintenance
- Fixed an issue where cloud deployments were not resolving during full maintenance

## 0.52.0

Released 2022-05-18

### Tags


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


You can now specify that a computer be excluded from maintenance. Excluded computers will not be allowed to run any type of maintenance session.

Settings -> Preferences -> Company Preferences -> Computers Excluded From Maintenance

or

Tenants -> Select a tenant -> Preferences tab -> Computers Excluded From Maintenance

![image](https://immybot.blob.core.windows.net/release-media/900883d7-4019-4d50-b41d-b4a103adc235)

### Immy Chat Integration


_Added in 0.51.5_

We added LiveChat to Immy to make it easier for you to get support

### Session Script Execution Improvements


Before executing a script on a device, we now check if it is online. If it is not online, we verify whether any of its agents are incorrectly reporting online and refresh the status appropriately. If it is still not online, we will wait up to 30 minutes for it come back online. If it is still not online, then we will mark the session as Pending Connectivity (only for Apply On Connect) or cancel the session due to the computer being offline.

### Other Improvements


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


- Added a live chat button to ImmyBot as another option for support requests

### Bug Fixes


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


- Removed the button "Show Recommended Deployments"
- Recommended deployments and the ability to "Approve/Dismiss" them now show up in the list
- Updated the group by filter and added two new filters.

![image](https://immybot.blob.core.windows.net/release-media/98b28b56-ef88-4e63-b850-b5171d28d915)

### Session Log Improvements


- Made several logs more concise
- Added action name and stage name to the top level logs
  - ![image](https://immybot.blob.core.windows.net/release-media/0081b188-7cac-4f88-be9c-bed8871ee2df)
- Checking the box to the left of actions do a better job of filtering to the relevant logs for that action
  - ![image](https://immybot.blob.core.windows.net/release-media/5bc3e22c-7799-421c-8858-cdb4d2d4a55e)

### Bug Fixes


- Fixed a performance issue with a timeline events database query
- Fixed an issue that was causing the Ephemeral Agent to not extract on machines running Windows PowerShell 4 or below
- Fixed issue where ImmyBot would not verify dependencies for software that is already compliant

## 0.51.3

Released 2022-04-21

### Bug fixes


- Fixed an issue with upgrading to 0.51.3 where the instance would fail to start if you had a branding that did not specify a from address (which is now required)

## 0.51.2

Released 2022-04-21

### Branding Updates


- Added color picker for `Text Color` and `Table Header Text Color`
- Branding Logo and Mascot images are now optional
- Added live branding preview

![image](https://immybot.blob.core.windows.net/release-media/3466173c-3fbd-4d3b-b56f-1c73d4cbae21)

### Other Improvements


- Added more details such as the reboot preference to the session details page. Also added a snazzier stage indicator.
  - ![image](https://immybot.blob.core.windows.net/release-media/5d96e0e4-9928-4f7b-8678-102753559cde)
- Changed access request default options to Three Days and Admin
- Maintenance Tasks now have the "Ignore" option just like software and will take precedence over other deployments for the same task and target group.
- Added desired software state "Any" as an available option for software that use dynamic versions
- Maintenance emails no longer show software actions that have a desired state of "Update If Found" and no detected version.

### Bug Fixes


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


- Fixed an issue where the dynamic version response was incorrectly cached when the script was shared for multiple software and required different output for each software
- Fixed an issue where the software detection radio options were disabled and unable to be changed
- Fixed an issue where the "Skip x onboarding computers" button would disable even if you had computers selected
- Undid the change that disabled the onboarding tab since it was a bad decision
- Fixed an issue with slug not saving when creating a tenant

## 0.51.0

Released 2022-04-08

### Onboarding Form: Maintenance Task Parameter Override


- New checkbox added to maintenance task parameters on the deployment details page: 'Allow override from computer onboarding'

  ![image](https://immybot.blob.core.windows.net/release-media/882f6817-8b54-4d14-8ce9-f85d3fabee5e)

- The checked parameters will show on the computer onboarding form, allowing the user to override the value just for the onboarding session

  ![image](https://immybot.blob.core.windows.net/release-media/1e37389e-827a-4ec3-a9d6-20e141dcfd59)

### Other Improvements


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


For software that puts its version in the DisplayName instead of the DisplayVersion field like this:

![image](https://immybot.blob.core.windows.net/release-media/5fb9b29c-3f67-486f-b34b-3b85ff8a9ca0)

You can now use a capture group to capture the version from the DisplayName

#### Example

HexCmp 2.34.1 can be captured with

```regex
HexCmp (\d+\.\d+)
```

### Script Editor Improvements


Within filter scripts, Get-ImmyComputer -InventoryKeys now shows valid InventoryKeys

![image](https://immybot.blob.core.windows.net/release-media/76854789-9bf2-484b-9bd2-875f2ad55bc9)

## 0.50.12

Released 2022-03-29

### Improvements


- Made the software override options more similar to the quick deploy options
- The ImmyBot Agent no longer writes and executes scripts from C:\Windows\Temp\ImmyBot.
- You can now add a Tenant Slug under the "Edit" tab on the Tenant Details page. This value is exposed as the variable `$TenantSlug` for scripts that run against this tenant's computers.

### Bug Fixes


- Fixed an issue preventing the 'Getting Started Wizard' from showing
- Fixed an issue with non-MSP users not being able to create configuration tasks from the software details page
- Fixed an issue with the 'New Version' notice not showing up
- Fixed an issue with configuration tasks running before the software was deemed compliant
- Fixed an issue where dynamic versions that threw a terminating exception were not displaying the exception message under the maintenance action

## 0.50.11

Released 2022-03-21

### Improvements


- Added ability to choose "install" when overriding "update if found" deployments on the quick deploy form

### Bug Fixes


- Fixed an issue where deployments with the same target type were resolving "update if found" as a higher priority than "latest version"
- Fixed an issue where scripts run in Control were visible in the Commands tab
- Fixed an issue where registry manipulation scripts would fail with `ProviderNotFound: Microsoft.PowerShell.Core\Registry`

## 0.50.10


Released 2022-03-14

### Intellisense Improvements


Intellisense no longer restarts when syntax error is detected.

Quickfix Actions work

![image](https://immybot.blob.core.windows.net/release-media/883af21b-7a81-415b-8756-ff889273e390)

![image](https://immybot.blob.core.windows.net/release-media/5e1e1e7a-70cf-4406-b4ba-4adfe02521c9)

No more duplicate definition on hover

![image](https://immybot.blob.core.windows.net/release-media/7b58fe4b-7bf6-4a42-8ea5-3a24f072f98f)

### Bug Fixes


- Fixed an issue with downloading ImmyBot Agent EXEs which would intermittently fail
- Fixed an issue where an unreachable integration could cause ImmyBot background jobs to not start up correctly
- Fixed a null reference that could occur when re-running a maintenance action
- Refactored some ephemeral agent PowerShell code for easier testing

## 0.50.9


Released 2022-03-08

### Bug Fixes


- Fixed a bug that was causing new instances of Immybot to crash when starting up

## 0.50.8

Released 2022-03-04

### Onboarding Deployments


The **Onboarding** target type has been moved to a separate checkbox so that you can limit deployments to onboarding only AND use the target type filters.

### ImmyAgent Improvements


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


- Improved exception handling during maintenance sessions
- Fixed an issue with re-running cloud scripts from a session log where it would throw an exception
- Fixed some performance issues and improved caching of function scripts

## 0.50.7

Released 2022-02-25

### Maintenance Task Serial Execution


A maintenance task now has the option to "Execute Serially".

When checked, this maintenance task is guaranteed to only have one instance active at a time.

e.g. If three maintenance sessions have an action for a maintenance task that executes serially, then one session will execute the maintenance task while the other two wait for it to complete. Once the first completes, the second will execute. Once the second completes, the third will execute.

This is useful for maintenance tasks that rely on the state of subsequent executions.

### Other Improvements


- Added a `Status` and `Types` column to the CW Manage client list on the integration details page so you can easily filter your list to clients you want to create tenants for. Also made the `Linked Tenants` column filterable to "Linked" or "Not linked". The `Bulk create tenants for unassigned clients` is now `Bulk create tenants for filtered unassigned clients` and will only bulk create tenants for those visible rows matching the table filters.
- Added checks to ensure that the identification job is running properly

### Bug Fixes


- Fixed an error that was preventing the computer overview page from loading
- Fixed an issue with scripts running multiple times if you opened, closed, and re-opened a script editor
- Fixed issues with the CW Control integration not updating the device name, os name, and serial number of the agent

## 0.50.6

Skipped

## 0.50.5

Released 2022-02-18

### Improvements


- Updated ImmyBot from dotnet 5 to dotnet 6
- Non-existent items on the deployment ordering page are now automatically removed
- Added description below the "Suppress reboots during business hours" checkbox to indicate that it is only applied for maintenance sessions that resume after a device comes back online
- Deployments can now be disabled which will exclude them from being applied during full maintenance sessions. This can be useful if you want to stop a deployment from happening without deleting it.
- ImmyAgent PPKG's should now work on Windows Home editions
- Improved the load time of the maintenance session list for instances that have 1+ million sessions

### Bug Fixes


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


- Fixed a bug where agent installers that were created before 0.50.0 were failing to register on new devices
- Increased the verbosity of logging during agent installation for easier debugging
- Fixed a null reference issue occurring on startup
- Updated the MSI uninstallation to remove the `config.json` and `registration.json` files located under `C:\ProgramData\ImmyBotAgentService`.

### Improvements


- Increased the Ephemeral Agent named-pipe connection timeout from 10s -> 60s to allow computers with extremely poor PowerShell initialization time likely due to system issues to still run scripts
- Added software / task descriptions to deployment details page and license details page. The descriptions are accessible by clicking the the question mark button

### Bug Fixes


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


- Fixed an issue with azure sync job creating duplicate users in the MSP tenant
- Fixed an issue where a disabled integration could not be deleted

## 0.50.1

Released 2022-02-08

### Improvements


- When ImmyBot restarts, it will now attempt to restart any maintenance session that was active when it shutdown. Before, it would only attempt to restart scheduled sessions
- Restarting maintenance sessions should now be idempotent. If an action was running when the backend rebooted, then it will be restarted.
- Removed some thread blocking code to improve performance

### Bug Fixes


- Fixed issue with Microsoft.PowerShell.Security functions not found in metascripts
- Fixed an issue with "Uninstall By Package Info" failing to uninstall via product code
- Fixed an issue where pending connectivity sessions were not triggering for computers that had exactly one agent

## 0.50.0

Released 2022-02-07

### Intellisense `(beta)`


Intellisense can be enabled on the application preferences page (disabled by default). Having intellisense inside the script editor is going to make your life much easier when it comes to writing ImmyBot scripts.

This feature is considered `beta` and there may be a few bugs present that will be get patched over the next few releases.

![image](https://immybot.blob.core.windows.net/release-media/c3e74cc2-fafa-40e9-9fca-66ea816233cf)

![image](https://immybot.blob.core.windows.net/release-media/5c2add32-38b5-4aca-9cf2-176b768be6a5)

![image](https://immybot.blob.core.windows.net/release-media/3f5d35d8-1963-4a6a-96a1-7e6fe22dd44c)

![image](https://immybot.blob.core.windows.net/release-media/92762a7f-5884-4e80-ae74-26403ebcfa01)

### Other Improvements


- Added navigation link for tenant on the computer overview tab and the maintenance session list
- Improved performance of filtering maintenance action table and dashboard results
- Improved performance for instances that have a large number of ImmyBot agents by optimizing some database calls
- Added compression support for JavaScript and CSS assets to decrease the initial page load time

### Bug Fixes


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


- Fixed a bug with quick deploy where maintenance actions were failing due to `Parameter <X> is marked required... and no value has been set`

## 0.49.7

Released 2022-01-26

### Improvements


- General cleanup/refactoring to improve performance
- Added an index that improves some maintenance session queries

### Bug Fixes


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


- Significantly improved performance of re-initializing maintenance sessions upon the server starting up
- Immy will now wait for one or more of a device's agents to reconnect when the device goes offline while attempting to run a script

### Bug Fixes


- Fixed an issue with application restarts taking a long time to re-enqueue pending maintenance sessions
- Fixed an issue with some exceptions that occur in maintenance sessions causing the sessions to be stuck in the "Created" status

## 0.49.3

Released 2022-01-18

### Improvements


- Reduced the number of concurrent inventory jobs that can run to preserve performance until it can be refactored
- Delivery of Ephemeral Agents on computers that don't support TLS v1.2 no longer spit out scary looking error. Instead, it now shows a warning that it will fallback to TLS v1.0.

![image](https://immybot.blob.core.windows.net/release-media/f75ad884-21de-4737-9c79-0c0d55a05411)

- Monitor maintenance tasks now run during execution except for previews which still run during detection

### Bug Fixes


- Fixed an issue with maintenance item specific schedules causing sessions to get stuck in created
- Fixed an issue with ephemeral agents not working correctly on Win7 x64-era machines
- Fixed issue with immy version not showing in footer

## 0.49.2

Released 2022-01-18

### Bug Fixes


- Fixed an issue where scripts run from the editor could throw the error: `An item with the same key has already been added. DebugPreference`

## 0.49.1

Released 2022-01-17

### Improvements


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


In this release, codenamed "Cheetah" we achieved a **20x** improvement in script execution performance through the use of WebSockets, Named Pipes, and removing code that is no longer necessary since the introduction of the Ephemeral Agent.

We also made restarting machines faster by using the new event driven Wait-ImmyComputer cmdlet when waiting for computers to reconnect after a reboot.

### Apply on Connect


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


- Improved performance of determining desired state of deployments during maintenance
- Improved performance of some update queries
- Added a new metascript cmdlet `Wait-ImmyComputer` that returns as soon as a computer has connectivity
- Added & Updated Ephemeral Agent connection statistics in 'System Status' page to report data/data-rate metrics about the underlying Ephemeral Agent connection to the backend

### Bug Fixes


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

## Releases in 2021

[Go to 2021 releases](/releases-2021.html)