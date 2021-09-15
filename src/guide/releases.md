# Releases

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

An Ephemeral Agent is a lightweight PowerShell script that establishes a direct connection with the ImmyBot backend via Polling or SSE (Server-Sent Events) to receive script payloads to execute. Script output is then sent through an Azure Service Bus for high throughput handling.  The ImmyBot backend manages the lifetime of ephemeral agents and is able to re-use them efficiently.

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

You can now assign a "Download Installer" script to software that will be used instead of the core Immy download installer logic.  This is valuable when downloading 3rd party installers from URLs that require authentication or specific headers.

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

- Fixed an issue where the `Get-RmmInfo`  command was not being found in metascripts during auto onboarding sessions
- Fixed an issue that was preventing users from deleting tenants.  The error received was "An error occurred while deleting tenants".
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
- Fixed an issue where linking a tenant to an RMM client was incorrectly pushing the synced computers to Needs Onboarding.  Computers synced by linking a tenant are automatically marked as onboarding since it is the initial sync.
- Fixed an issue with creating deployments where the maintenance item search was not returning maintenance tasks with the Tenant Category
- Added a session log to warn users when you attempt to run a cloud script (tenants only) against a computer.  This shouldn't be possible, but there is a bug on the deployment form that is allowing you to save an invalid deployment.  This bug will be fixed in an upcoming release
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

You can now deploy software to CW Automate Groups and to CW Control Sessions sharing the same custom property values*

![image](https://immybot.blob.core.windows.net/release-media/703d5619-28cf-4385-9b6b-4debaf1010ce)

#### CW Control Custom Groups

*Requires CW Control ImmyBot extension to version 0.1.7* -- Awaiting ConnectWise Control Marketplace Approval

![image](https://immybot.blob.core.windows.net/release-media/b89ab8ed-c531-4c42-a9dd-6d3e97d1a6fe)

You can define which custom property number you want to use for the client name and secondary grouping property on the RMM Link details page.

![image](https://immybot.blob.core.windows.net/release-media/f4cc8b5e-8135-40ab-8748-097f4ae86f11)

### Improvements
---

- `Invoke-ImmyCommand` can now run on multiple computers in parallel, using the `-Parallel` switch
- MSP Admin users can now set a flag `Allow Access To MSP Resources` on schedules that will allow all scripts run by the schedule to have access to MSP resources.  An example would be allowing the metascript `Get-ImmyAzureAuthHeader` to use the flag `-UseMSPTenant` to retrieve the msp tenant's access token.
- You can now connect to Azure AD as the MSP Tenant from scripts run on client devices by passing `-UseMSPTenant` to the `Connect-ImmyAzureAD` metascript
- Added a new tag ![image](https://immybot.blob.core.windows.net/release-media/81842495-9a7e-4273-a4c7-a4c01230941e) for computers to indicate it is a sandbox
- You can now delete computers from the "New Computers" page.
- You can now use MSP KeyVault secrets in customer scripts. This is useful if, for example, you'd like to access your IT Glue API keys while running a metascript against a customer computer. Provide `-UseMSPTenant` to `Get-ImmyAzureAuthHeader`
- `Write-Progress` can now be used inside `Invoke-ImmyCommand` blocks
- Added a preference to set the default timezone that gets selected on the schedule and deployment pages
- Agent installer modal now defaults Auto Onboard to false to avoid accidental auto onboarding
- Reduced the local admin username minimum length from 3 characters to 2 characters.  Allows for two-character naming such as "MC" or "LA"
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
- Configuration Tasks are now grouped together with their corresponding software action on the maintenance session details page.  This should be more convenient than having all configuration tasks grouped at the end of the page.

![image](https://immybot.blob.core.windows.net/release-media/80c94fb5-d15c-498c-896b-12cba58fdc1b)
- Session table now shows the execution date for pending scheduled sessions.  Hovering over the text will show the exact date time.

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
- Added missing detection email options to the computer deployment page.  **Show Postpone Button on Detection Email** and **Show Update Now Button on Detection Email**
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
- Added option to schedules for  `Show Maintenance Actions In Emails` that controls whether the maintenance action table is shown in the maintenance emails
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

The actions tab shows the latest actions performed against a computer or tenant.  This table can be used to help identify issues with software and maintenance tasks.

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

Deploying software for a specific computer is now easier.   Located at the top of the Software tab on the computer details page.  Tell your techs to use this form if they need to deploy software to a specific computer.

![image](https://immybot.blob.core.windows.net/release-media/c70b0628-847b-40b6-99db-456f69ce5115)

After selecting a software / maintenance task that you want to deploy, a session will be kicked off to determine if the computer has any applicable deployments.  If a deployment is found, then you'll be presented actions for that deployment.

![image](https://immybot.blob.core.windows.net/release-media/87d9a5a0-0f1d-41ea-94ba-8868fbe674f5)

If a deployment is not found, then you are asked if you would like to create one.

![image](https://immybot.blob.core.windows.net/release-media/e268d0b8-2538-4019-bbe3-492468f162d8)

If the selected item requires configuration task parameter values or a license, then you still need to create the deployment from the traditional deployment page.  We plan on expanding on this to allow supplying a license and parameters directly on this form.

![image](https://immybot.blob.core.windows.net/release-media/f351d75d-738e-4acb-9588-3103842fcda4)

### Computer List Search Improvements
---

Searching for computers is now much faster after some internal refactoring of how the data was stored.  We removed the need to select a filter so you can now search by any of the available fields specified in the placeholder.

![image](https://immybot.blob.core.windows.net/release-media/ae56632e-651a-4e41-8f4d-0f62d6947f47)
- Added `Onboarding` as a support Target Type for convience.
- Made device inventory storage processes more efficient and started caching some often-accessed computer data (like computer names)

### Download ImmyBot Agent Installer Improvements
---

Updated the interface for downloading an immy agent installer.  You can now assign default behavior to any of the installation methods.  The `Deploy` tab will now automatically update when your computer shows up in ImmyBot.

![image](https://immybot.blob.core.windows.net/release-media/7ab85162-0ce8-49bd-ab16-a76a6c105dab)

![image](https://immybot.blob.core.windows.net/release-media/b16dcf31-9e06-4f09-818f-bfff57c19f0f)

### Inventory Results over Service Bus (Beta)
---

Inventory scripts sent over any Rmm Provider connection will have their results sent over an Azure ServiceBus connection.  This allows us to stream results in real-time, eliminating message size constraints.  Since this is a new feature, you must manually enable this functionality under preferences.  In a later release, we will extend the service bus script result handling to all scripts ran through Immy

![image](https://immybot.blob.core.windows.net/release-media/39e9a698-cff7-4db5-af1d-d34dd0b74c64)

### Bug Fixes And Other Improvements
---

- Added some automated testing to the package analyzer for stability
- Made the package analyzer partially download files for analysis.  This will allow large installers to be analyzed more efficiently
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
- Moved the computer reboot logic to a global function script called `Restart-ComputerAndWait`.  A computer that needs a reboot during a maintenance session will now utilize this global function script.  This script can be overridden by a local function script with the same name, `Restart-ComputerAndWait`.

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
- Added a refresh button to the dashboard table.  This is useful if you have running sessions and you want to refresh the results of the table
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

The Immy Agent now gets updated during full maintenance sessions.  You can also manually trigger an update by going to the computer's details page and under the Agents tab.

![image](https://immybot.blob.core.windows.net/release-media/a6a6cdbb-f45e-4b95-91a9-e4272979527c)

### Assignment Override
---

As part of a refactor of the computer software tab, we added the ability to override assignments.  This is useful when resolving one off computers that do not need to be part of a larger assignment.

![image](https://immybot.blob.core.windows.net/release-media/0a02d6ac-21f5-425d-8ab7-1b881d7d16f2)

### Getting Started Wizard
---

A new 'Getting Started' feature is available, which guides the user through first-time ImmyBot setup and installation of the ImmyAgent on a device using PPKG.  You can access this feature by clicking the "show Getting Started Wizard" link under your user email dropdown in the top right.

![image](https://immybot.blob.core.windows.net/release-media/e24d1489-c7fa-46ed-bde9-8a9bde0df04f)

### Recommended Deployments
---

A recommended deployment is a global deployment that is accessible to all ImmyBot users.  Recommended deployments represent common scenarios that most companies use.  You can approve / dismiss recommended deployments.  Approving a deployment will allow it to be considered as a valid deployment when running maintenance.  Dismissing a deployment will disallow it from being considered during maintenance.

When a new recommended deployment is added, you will receive a notification, "You have new recommended deployments".  Clicking this link will prompt you to approve / disapprove the deployment.

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

The deployment page can now show multiple action results.  This is useful when a software has a configuration task or dependencies.

When there are 2 actions:

![image](https://immybot.blob.core.windows.net/release-media/66e95cd9-7ec8-4c8e-b78e-20dc597194c5)

When there are more than 2 actions:

![image](https://immybot.blob.core.windows.net/release-media/40f243cf-b00d-48b6-ae65-31d227c6959f)

Showing extra actions:

![image](https://immybot.blob.core.windows.net/release-media/72980fac-e8de-4083-a294-0a338e8455d4)

### Improvements
---

- Added license for Entity Framework Extensions
- Updated the descriptions for Windows Updates on the Schedule Page.  We now hide the windows updates checkbox when it is not available.
  - ![image](https://immybot.blob.core.windows.net/release-media/9b4d861b-41ef-4039-8259-20689aa1b053)
- The error alert at the top of a page now indicates that the requested resource could not be found if the api call resulted in a 404.
  - ![image](https://immybot.blob.core.windows.net/release-media/1b419a4a-471a-49c0-983f-eea4d27e6eb3)

### Bug Fixes
---

- Fixed issue with merging tenants where some users were receiving the following error: `Configured execution strategy SqlServerRetryingExecutionStrategy does not support user initiated transactions `
- Fixed issues with determining winning deployments.  A tenant filter script now has priority over a cross tenant filter script.  Ordering has also been added to the target group filter.  E.g. A deployment targeting primary domain controllers will now take priority over a deployment targeting servers.
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
Added a tenant details page similar to the computer details page.  The tenant list page link has been moved out from `Settings -> Tenants` to the top level in the navbar.

1. Maintenance sessions run directly against a tenant can be viewed in the Sessions tab.
1. Assigned Tenant Maintenance Tasks can be viewed in the Tasks tab.
1. The Terminal tab is auto scoped to run meta scripts for a particular tenant.
1. The Mappings tab allows you to link/un-link a tenant from RMM Providers.
1. The edit tab allows you to change the name of the tenant.

![image](https://immybot.blob.core.windows.net/release-media/33988012-0209-4220-9fa8-dc6a8211f3a2)

### Software Providers
---

#### What is a Software Provider?

A Software Provider tells ImmyBot how to install/uninstall a software.  Currently, Local, Global, Chocolatey and Ninite are supported as providers.  You can assign the available providers to a software on the software's edit page.  A local/global software will inherently be a Local/Global Provider if there are software versions present.

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

The assignable tab now has two potential actions: **Quick Assign** and **Assign**.  Quick Assign will immediately create a deployment targeting the primary person (if present) or the computer.  A detection only session will also start immediately to determine the current state of the software.  Assign will open the New Deployment Page and allow you to create a new assignment for the software.  Quick assign is currently only available for software that do not have a configuration task or a license.

![image](https://immybot.blob.core.windows.net/release-media/396d2451-2e36-4793-b63f-99ed514bd536)

#### Assigned

The assigned tab now provides 3 potential actions: **Action to take (Install, Update, Enforce, etc)**, **Re-run detection (refresh icon)**, and **Manage (edit deployment)**"

![image](https://immybot.blob.core.windows.net/release-media/016316a8-470a-42e8-a57a-b2c79ebb512f)

### Improvements and Bug Fixes

- Added ability to bulk delete tenants and associated data from the tenant list page
- Added a new system preference "Allow Non-Admin Users To Manage Deployments".  This is enabled by default.
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
-  Fixed issues with being unable to cancel old maintenance sessions
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
- A schedule can now specify whether it will "Apply Windows Updates".  **Note** If the schedule is limited to a specific software or maintenance task, then windows updates will not be applied.
- Made minor improvements to BITS transfers
- Fixed issue with Chocolatey latest version allowing prereleases
- Fixed a bug causing maintenance task files to fail downloading

## 0.41.10

- Skipped

## 0.41.9

Released 2021-04-08

###  Bug Fixes and Improvements
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
- Updated the descriptions for the start date and end date for brandings to indicate that they are **inclusive**.  A branding is applicable if it is greater than or equal to the start date and less than or equal to the end date
- Added a "DEPLOY" button to items on the Maintenance Tasks list, and added a badge for maintenance tasks that are marked as "Configuration Task" to help identify  them
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

Configuration Tasks are used to provide parameters to software install scripts and/or provide additional configuration after the software is installed.  Checking this box allows you to select this Maintenance Task from the Configuration Task section of the 'Edit Software' page. Configuration Tasks are not select-able on the 'Edit Deployment' Page to prevent accidental deployment without the associated software.

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
<span style="color: red">**IMPORTANT**</span> - Fixed an issue that caused computer identification and device syncing from RMM providers to stop working.  This bug was introduced in an update to a database dependency in 0.41.0.

## 0.41.2

Released 2021-03-26

### Bug Fixes
 Fixed an error that was occurring when uploading software
## 0.41.1

Released 2021-03-25

### Recommended Software and Maintenance Tasks
---

Added the ability to mark a software or maintenance task as *Recommended*.

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
ImmyBot now officially supports uploading media that can be used in Maintenance Tasks as file parameters.  Existing media can now be selected from the media library for re-use on multiple maintenance tasks.

![image](https://immybot.blob.core.windows.net/release-media/fd69024e-cbf5-4940-8dfa-b42c25c7e886)

#### Detection Only Maintenance Sessions
---

Detection only maintenance sessions are replacing the "Preview" feature where we determine what needs to be done for a computer to be compliant without actually enforcing compliance.  The benefit over the old "preview" is that detection only maintenance sessions will persist to the database.

A detection only session will gather all deployments for a computer, and if the computer is online, it will then run detection to determine compliance.  If the computer is offline, it will only determine what the desired state is.

#### Additional computer software list filtering
---

Added additional filtering to the computer's software list that allows you to filter by managed software, inventoried software, or both.  Also, a toggle to show "Hidden Items" was added to show or hide system component inventoried software.

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
    -  ![image](https://immybot.blob.core.windows.net/release-media/0ccf4e26-87d8-4737-9a4a-16f645832dec)
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


----Added the ability to create tenants from your Azure Customers from the Azure page.  This is convenient for those only using the ImmyBot Agent, and want to quickly create tenants from their Azure Customers. We also added the Azure Customer Domain to the table since this may be valuable to see.

![image](https://immybot.blob.core.windows.net/release-media/22e52fe4-1739-49e3-b624-d3cd307be64b)

### Chocolatey Improvements
---

Our managed server that proxies and caches Chocolatey requests can at times be unreliable.  Also, this server is not geographically replicated so it is not the best solution for those using ImmyBot outside of the US. We added logic that automatically falls back to using Chocolatey directly whenever our managed server is responding poorly.  We also improved our caching which resulted in better response times and fewer requests sent to Chocolatey.

### Script Session Logs Improvements
---

Updated the styling of script session logs.  Clicking "Open Debugger" now copies the script output to the terminal.

![image](https://immybot.blob.core.windows.net/release-media/0681edc0-c106-4e2c-8ed9-649cd7fe3473)

### Schedule Improvements
---

The default detection time for new schedules has been changed to 2PM.  The default execution time for new schedules has been changed to 10PM.  Extra details were added to detection and execution time descriptions on new schedule form.

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
1. Fixed an issue with software version test script logic that was triggering a re-install when the test script did not explicitly return `false`.  Test scripts must now explicitly return `false` in order to trigger a re-install.  Returning `null`, `""`, and `0` will not trigger a re-install.
1. Enabled the metascript execution context for custom detection scripts
1. Removed the "all scripts are disabled for task" alert on the deployment form for configuration tasks
1. Fixed a bug on the deployment form where it would not let you save if you changed the selected maintenance item from one software to another
1. Fixed a bug on the deployment form where it would not keep your selected desired state when changing the selected maintenance item from one software to another
1. Fixed a bug preventing the logout button from working
## 0.40.0

Released 2021-02-24

#### Dashboard Page
---

Added a new page that can provide you the latest actions for software and maintenance tasks that were run against a group of computers.  The page is intended to help produce audits and show whether or not computers are compliant.  This page is a work in progress and will be iterated on over the next few weeks.

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
Added a **Restart ImmyBot** button to the System Status Page.  The System Status Page has been moved to the top of the navbar.

*Note*: Only MSP Admin users can see this page.

![image](https://immybot.blob.core.windows.net/release-media/830b95ea-9f95-4d35-b878-27de5ddb4303)

#### Get-RmmInstallScript Metascript
---

Exposed new metascript `Get-RmmInstallSCript -RmmLinkId <int>` that will return a script block containing the powershell install script for the specified rmm link.  This is was added to provide an quick way to update the ImmyBot Agent on computers.  Long term, we will add auto update logic to the ImmyBot Agents so we don't have to do this.

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

The **Traditional** search mode is the old detection style used by ImmyBot.  This method is essentially the same as Regex, but replaces occurrences of * with .*

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
- On the Schedule Details Page, updates the maintenance item selector description to say "Optionally limit this schedule to a specific software or maintenance task.  ImmyBot will only create sessions for computers that have a deployment for the selected item."
- Refactored the ImmyBot maintenance email code for better maintainability
- Changed default ImmyAgent protocol to MQTT dto reduce periodic reconnections

### Bug Fixes

- Fixed an issue where re-running a maintenance task was not setting the script parameters
- Fixed a bug where user scripts set to run at logon were failing to find the method `New-PowershellLogonScript`
- Fixed an issue with terminal text being displayed as double-spaced on MacOS/iOS/Linux browsers
- Fixed an issue on the deployment page where unchecking a parameter's "Override"  option was still using the stored overridden value when previewing or deploying
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

***

### Upload Files From Computers

  - New MetaScript cmdlet: `New-ImmyUploadSasUri [-BlobName <string>] [-Permission <string>] [-ExpiryTime <DateTime> = now + 1 day]`
  - With no parameters, `New-ImmyUploadSasUri` will generate a URI that can be used to create and upload blobs into local storage
  - With the `BlobName` parameter, `New-ImmyUploadSasUri` will generate a URI that can be used to upload data into a blob file in local storage
  - See [the Azure documentation on blob operations](https://docs.microsoft.com/en-us/rest/api/storageservices/operations-on-blobs) for more details on blobs

***

### Schedule Individual Maintenance Items

![image](https://immybot.blob.core.windows.net/release-media/3e577323-4f7d-4b19-914f-da51a319600a)

- Added ability for schedules to target a specific piece of software or maintenance task

***

### My Devices

- Adds a section under the user dropdown in the top navbar for **My Devices**.  Under **My Devices**, you will see all computers where the currently logged on user is the primary person.

![image](https://immybot.blob.core.windows.net/release-media/88197235-35f2-4ce3-93ad-19c786bbbd5e)

***

### Primary Domain Controller Target Group Filter

- Adds "Primary Domain Controllers" target group filter to schedules and deployments.

![image](https://immybot.blob.core.windows.net/release-media/8053653b-703c-4d6b-a338-b708106d82b9)

***

### Allows for licenses to be restricted to a major version.

![image](https://immybot.blob.core.windows.net/release-media/6a8c48c4-901a-4b99-accd-c88a3e2ff294)

***

### Metascript Error Handling

- Results from Invoke-ImmyCommand are no longer lost when a terminating error is thrown
- Line numbers are preserved in error messages in Invoke-ImmyCommand
![image](https://immybot.blob.core.windows.net/release-media/b71a372f-e810-420a-b73e-7896855ef00b)
![image](https://immybot.blob.core.windows.net/release-media/55ea5c09-a62f-45d5-ba4f-5a572683f4bd)

***

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

***

### Timezone Support for Schedules

- Schedules now have the ability to specify a timezone.  The detection and execution time are then relative to the selected timezone. If you use a custom cron expression, then it will also be relative to the selected timezone.  The default option will be UTC to match the previous functionality.

![image](https://immybot.blob.core.windows.net/release-media/7fd865a5-36ab-4e28-90fc-94ef2ce19612)

- The deployment options on the deployment page also provide you the ability to select which timezone to use when selecting the "later" option.

![image](https://immybot.blob.core.windows.net/release-media/ad6a352e-861b-4d93-ab96-26bb949228f5)

***

### My Customers (CSP Preconsent)

![image](https://immybot.blob.core.windows.net/release-media/75d8a4af-0833-41b8-b963-86054f34ea12)

- If you are on the `My Customers` Azure Level, we made assigning Azure customers to tenants and syncing people easier. Matching an azure customer to a tenant will now save and sync automatically.
- If you are on the `Customer` Azure Level, we made assigning Azure customers to tenants and syncing people easier.  Selecting a tenant will now automatically save and sync.

***

### Software List Type Filter

- Added software type filter to the software list page fore easier filtering based on type

![image](https://immybot.blob.core.windows.net/release-media/ffc5e9fd-f769-4e1f-a111-692398800c93)

***

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

- Adds a section under the user dropdown in the top navbar for **My Devices**.  Under **My Devices**, you will see all computers where the currently logged on user is the primary person.

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

- Schedules now have the ability to specify a timezone.  The detection and execution time are then relative to the selected timezone. If you use a custom cron expression, then it will also be relative to the selected timezone.  The default option will be UTC to match the previous functionality.

![image](https://immybot.blob.core.windows.net/release-media/7fd865a5-36ab-4e28-90fc-94ef2ce19612)

- The deployment options on the deployment page also provide you the ability to select which timezone to use when selecting the "later" option.

![image](https://immybot.blob.core.windows.net/release-media/ad6a352e-861b-4d93-ab96-26bb949228f5)

### My Customers (CSP Preconsent)

![image](https://immybot.blob.core.windows.net/release-media/75d8a4af-0833-41b8-b963-86054f34ea12)

- If you are on the `My Customers` Azure Level, we made assigning Azure customers to tenants and syncing people easier. Matching an azure customer to a tenant will now save and sync automatically.
- If you are on the `Customer` Azure Level, we made assigning Azure customers to tenants and syncing people easier.  Selecting a tenant will now automatically save and sync.

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
- Fixes a bug where the script modal would close when you hit save even if the script had an error.  It now stays open until it is successfully saved.
- Fixes a bug where the Ready for Onboarding count was not matching the number of items in the table.
- Fixes a bug where click `Overwrite existing computer` on the New Computers page threw an error about not being able to find the existing computer
- Fixes a bug with `URI` type parameter values where if no scheme is provided it would fail.  It now defaults to `https://`.
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

- When creating new software versions, we will default the new version's settings to the previous version's settings.  This is generally more reliable that using the analysis results by default.  If there is no previous version, then we will still use the analysis results as default.
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
* Corrected issue preventing Maintenance Tasks from being saved
## 0.38.0

Released 2020-12-21

### New Features

#### Maintenance Tasks Files
![image](https://immybot.blob.core.windows.net:443/media/a3575538-bde6-4d5b-89a2-85c0efdaeba4.png)

* Specify a default file if the user doesn't specify one
* Include utilities with maintenance tasks by marking the parameter as hidden

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
- Fixed duplicate persons issue.  Syncing persons from azure users now checks if there is an existing person with the same user principal name (email) and will update that person instead of creating a new one.
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
* Fixed issue with terminal not rendering output when launched from Edit button on session logs
* Fixes an issue where the suggested rmm link name conflicted with an existing name
* Set the Hangfire Redis MaxStateHistoryLength to 5 to fix issues with uncontrolled memory leak
## 0.37.2

Released 2020-11-24

### Hotfixes

- Fixed several broken maintenance session links that were not bringing the user to the correct page.
- Fixed an error in metascripts about the use of duplicate `$__using` variables.
- Fixed an issue rendering the xterm terminal within the script editor modal.
## 0.37.1

Released 2020-11-23

### Hotfixes

- Fixed filter scripts to only return a single computer when run for a maintenance session.  Not doing this was causing memory to balloon up unnecessarily.
## 0.37.0

Released 2020-11-23

### Enhancements

Check out our new documentation site! https://docs.immy.bot/

##### Actionable Software Inventory
- Updated the *Software* tab to now provide actionable buttons for software and maintenance tasks that are not compliant

##### Automatic Onboarding
- Plug in the USB drive and setup begins automatically without having to login to Immy
  - Create a new *Windows 10 Setup USB Package* and enable the auto-onboarding option
- Added a new tab called *Sessions* that allows a user to easily see computer sessions without leaving the computer details page
- Added an *Onboarding* tab to the computer details page to allow easier changing of customer and primary user

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
- Fixed an issue with sending test emails from the smtp page.  It would sometimes incorrectly throw an error about enabling authentication
- Added Update If Found desired state for Ninite Software
- Fixed selecting a software on the deployment page to auto select "Installed" and "Latest" as the default options
- Fixed an issue where it was not possible to view global maintenance task scripts from within the Maintenance Task interface
- ImmyAgent no longer executes Batch/CommandLine as PowerShell

#### Security
- Get-ImmyComputer no longer returns computers from other tenants when run by a non-MSP user
## 0.36.4

Released 2020-11-19

### Bug Fixes
- Moved the pending reboot check from the beginning of the session to the beginning of the execution phase so computers do not reboot during detection.  Computers usually run detection during the day and we do not want to reboot computers while they are being used.
## 0.36.3

Released 2020-11-13

### Bug Fixes

- Fixes bug where rebooting a computer would sometimes hang the maintenance session
- Fixes a typo `reading for onboarding`  -> `ready for onboarding`
- Fixed issue preventing a computer from rebooting if necessary before it starts a maintenance session
- Fixes an issue where an action would immediately fail if the computer failed to reboot
  - e.g. A software is supposed to be uninstalled and then reinstalled.  After the uninstall, a reboot may be attempted.  If it fails, we will now still attempt the reinstall anyway.
- Fixes a critical bug that could allow a person to be incorrectly associated with another tenant.
## 0.36.2

Released 2020-11-04

### Bug Fixes

- Fixed an issue where the `Update Now` and `Postpone` buttons were missing on the maintenance email when they were set to be shown by its schedule.
## 0.36.1

Released 2020-11-02

### Bug Fixes
* Run Maintenance button at the top of the Computer Details Page now suppresses reboots by default
* Edit PSALink page no longer throws exception when CWManage API returns duplicate companies
* Updated task type and task category label names on the task form
* Fixed a null reference exception when calling Get-ImmyComputer passing in InventoryKeys

## 0.36.0

Released 2020-10-26

### Features

* New and improved **Computer Details Page** that shows much more details
* Added Inventory Task feature
* Added a **System Status Page** that shows script execution metrics for enabled RMM Providers
* Added a **System Update Page** that allows an administrator to update to newer versions of ImmyBot when they are released
* Implemented Downgrade logic for software

#### Enhancements

* Optimized script execution when using the CW Control RMM Provider
* Optimized background job scheduling
* Re-designed the **Computer List Page**
* Merged the Onboarding and Pending Computer Pages into one page called **New Computers**
* Made the ImmyAgent more scalable
* Added a loading animation when filtering the **Computer List Page**
* When a session expires and the page is reloaded, you will now be redirected back to the page you were on

#### Bug fixes

* Fixed CW Control extension to work on latest version of CW Control (2020.11)
* Fixed session failing with Ninite fails to download
* Fixed a CORS issue when new instances are registered with uppercase characters
* Fixed an edge case when scripts erroneously indicate they have been modified when pressing cancel
* Removed validation requirement for username in SMTP settings
* Fixed Automate Computers with *UTC+0* (UK) do not sync due an issue with using `DateTime.Subtract(0)`
* Fixed an error occurring on Windows 7/PS 2.0
* Fixed an edge case where a server got caught in an endless reboot
* Removed the WiFi SSID minimum length for PPKGs
* Fixed a bug where license files did not download before running the **Test** script
* Fixed an issue where **User Context Scripts** were returning `'gt' is not recognized`
* Fixed a bug where maintenance tasks were performed out of order when there was a software dependency
* Fixed a bug on the Deployment Page where selecting a domain controller was causing an error
* Fixed a bug in metascripts where `Get-ImmyComputer -TargetType TenantDomainControllers` was failing
* Fixed bug where the Users List showed a *System* user
* Fixed a bug where bulk software detection failed on PS 2.0 and PS 3.0 when using `[Guid]::new`
* Fixed a bug where the CW Automate Provider was not leveraging the 301 command
* Fixed a bug where the ImmyAgent did not start on VMware VMs due to lack of BoardSerialNumber
* Fixed some edge cases where sessions kept getting stuck in the *Created* status
* Fixed a bug where the ImmyAgent was defaulting to 10 seconds for the script execution
* Fixed a bug where the software selector on the license form was showing parameters for linked maintenance tasks
* Fixed a bug where maintenance task fields *Hidden* and *Default Values* were not saving on Create
* Fixed a bug in the package analyzer where it was throwing `Key Not Found` for Inno version 6 installers
* Fixed a bug with Deployments using a desired state of Uninstall/NotPresent that was causing failures due to *missing required parameters*
* Fixed a bug with maintenance task parameters not being provided to software install scripts
* Fixed a bug where users could not open the **Maintenance Session Details Page** for computers they onboarded
* Fixed a bug where deployments for maintenance tasks with password parameter types were unable to be deployed
* Fixed a bug where the *Current User* user action trigger was not available for scripts created on the software version form
* Fixed a bug where the RMM to PSA auto client mapping failed when the RMM returns non-unique external ids
* Fixed a bug where non-msp users could not access software or deploy the ImmyAgent
## 0.35.16

Released 2020-10-23

This is the first release in the release cycle