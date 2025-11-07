::: danger _ImmyBot will no longer support Windows 7, Server 2008 (or Server 2012 w/o [ESUs](https://learn.microsoft.com/en-us/windows-server/get-started/extended-security-updates-overview)) machines after May 14th, 2024_
.NET 7 support is ending May 14th, and as a result we will be transitioning the Agent to .NET 8 at that time period. We will not be offering support for these machines after May 14th.

Please see the [FAQ section for more details](https://docs.immy.bot/FAQ.html#what-windows-versions-does-immyagent-support)
:::

## 0.73.1

Released 10/30/2025

### Bug Fixes

- Fixed an issue where MSP non-admins were not allowed to manage deployments even when the preference "Allow Non-Admin Users to Manage Deployments" was enabled.
- Fixed a performance issue that was causing the computer details page to load slowly for instances that contained a large number of computers

## 0.73.0

Released 10/27/25

### Bug Fixes
- Fixed an issue where MSP non-admins were still allowed to manage deployments even when the preference "Allow Non-Admin Users to Manage Deployments" was not enabled.
- Fixed an issue where cancelling a session quickly after creating it could result in the session stuck in the running status
- Fixed the onboarding form to honor deployment `Require` overrides. Parameters marked `Require` now show as required and block submission when empty on the onboarding form. Aligned UI/validation across parameter sets and removed a few edge-case false errors.
- Fixed an issue where the existing primary user would get wiped out during onboarding even when you didn't have onboarding tasks managing the primary user
- Fixed an uncommon issue where schedules would not kick off at the expected time
- Fixed OAuth access token deletion error that was causing a 500-server error with "InvalidOperationException: Failed to delete secret" when attempting to delete tokens
- Fixed the "Reboot preference Normal is not recognized. No action taken." error that occurs when using "If Necessary" reboot preference
- Fixed intermittent failure of the "Create and go back" button on deployment creation form
- Fixed Invoke-AtomicCommand to support positional parameters by adding Position = 1 to the ScriptBlock parameter. Now works like Invoke-ImmyCommand without requiring explicit parameter names.

### Improvements

- The computer timeline now shows the immy icon for ephemeral agent session events.
- Improved ephemeral agent error handling
- Improved performance of saving computer inventory changes to the database
- Improved resilience of saving maintenance session data to the database
- `Get-ImmyComputer -InventoryKeys SomeKey` is now matched using a case-insensitive search.
- Schedules now have a "Name" input for easier identification in the schedules list.
- The main sidebar now keeps the current page's link highlighted when navigating to child pages.
- Actions for deleting and restoring computers now show up in the audit table.
- Added batch actions to the schedule list page, allowing for bulk disable/enable, run/cancel, and delete.
- Removed the default values on the "New Tag" page and replaced them with input placeholder text This helps accidentally prevents labels having the name "Example Tag".
- Removes the disruptive "Editor idle timeout reached. Editor Services has been terminated to conserve resources." modal and replaces it with a user-friendly status bar indicator.
- OAuth2 parameter values now indicate whether it matches the ImmyBot default app registration or a custom app registration
- Critical services on the server now cause the application to restart if they stop working.  Unexpected errors were occurring by letting the application continue to run when critical services stopped working.
- Reduced calls to dynamic version scripts by 2-3x during maintenance sessions
- Updated internal usage of `choco list` to support version 2.0.0
- ARM devices can now fall back to x86/x64 installer versions when ARM-specific versions are not available in dynamic version scripts. This fixes the issue where ARM computers failed to install software like Adobe Reader that only provides x86/x64 builds.

## 0.72.1

Released 10/20/25

### Security Fix

- Updated the docker image which contains a fix for https://github.com/dotnet/aspnetcore/issues/64033

## 0.72.0

Released 09/24/25

### Bug Fixes

- Fixes an issue where a Filter Script could be saved / executed as a Metascript
- Fixed some grammar errors in the UI
- Fixed issue where `ISupportsExternalProviderAgentUrl` would break dynamic integration icons
- Fixed timeout issues with tenant deletion
- Fixed `RestoreComputers` API endpoint that was always returning "No computers were found to restore" when attempting to restore deleted computers
- Fixed an issue where computers excluded from maintenance couldn't run inventory scripts, even though the UI indicates inventory should still be allowed
- Fixed a PowerShell script output byte count overflow issue
- Fixed prerequisite failure messages to show readable software names (e.g., "Google Chrome") instead of technical IDs (e.g., "GlobalSoftware-307")
- Fixed an issue with maintenance sessions where sessions would get stuck in the running status forever, even after restarting Immybot.
- Fixed the alignment of integration icons in the main computer table
- Fixed off-center alignment of login page, and improved page responsiveness on smaller screensizes
- Fixed cut-off text in the Tenant Details -> Mappings table
- Fixed Tenant Details page tabs to not wrap text
- Fixed an issue where global task references were missing at the top of global task details pages.
- Fixed other various minor UI issues
- Fixed an issue where integrations could not be deleted when the underlying integration type was deleted
- Fixed an issue where dynamic integration types were not showing an error message when the script failed to return the $integration object
- Fixed an issue where viewing change requests could incorrectly result in a 403
- Fixed an issue where the deployment preview/deploy buttons would transiently throw errors on the server

### Improvements

- Improved handling of PowerShell runspaces such that scripts should now start and end on the same thread/runspace. This will help prevent unexpected errors such as "There is no Runspace available to run scripts in this thread" from occurring.
- Implemented one-click schedule duplication. Users can now duplicate existing schedules with a single button click, creating a new disabled schedule with all original properties preserved.
- Pagination controls are now always show in tables that support it
- Updated the Maintenance Sessions page's Session Status column header filter to accept text input instead of only numeric values.
- Clicking the Update to Release button on the System Update page now shows a modal for confirmation.
- Normalized spacing and padding between table action buttons
- Made the session count panels at the top of the Maintenance Session list page have equal heights.
- On the Computer Details -> Agents tab: added a button to "View agent in external portal" for integrations supporting it.  Updated the CW Control integration to support this.
- Added more logos to the computer timeline for integration-specific events

## 0.71.1

Released 09/03/25

### Bug Fixes

- Fixed an issue where telemetry was unexpectedly getting dropped
- Fixed an issue where `Invoke-ImmyCommand -ContextString User -TerminateFromNoLoggedOnUser` would not terminate the script when no user was logged on.
- Fixed an issue where non-msp users were shown the "Can Manage Cross Tenant Deployments flag" in the UI. This flag is only available for MSP users.

## 0.71.0

Released 08/19/25

### Agent Improvements

- Implemented agent PowerShell execution host pooling to reduce script startup time
- Added ability to fully cancel running agent scripts by killing the script's PowerShell process
- Improved agent reconnection script recovery
- Added more detailed agent connection logs to Computer timeline
- Ensured agent script PowerShell processes run as 64-bit to work around SentinelOne access violation bug
- Consolidate and fix agent logs


### Other Improvements

- Added a login hint to avoid Microsoft's account selector screen when logged into multiple accounts
- Improved internal handling of rebooting computers
- When creating an integration, we now check if you have an existing integration and set the default integration name with a numeric suffix, (e.g CW Control 3). This helps avoid duplicate names and errors on submission.
 no longer suggests a duplicate name and avoids 409 errors.
- For schedules, When users toggle between "Execute Immediately After Detection" and "At a specific time", the Active Hours checkbox setting is now properly preserved. Previously, switching back to scheduled execution would lose the user's Active Hours preference.
- Enhanced the Get-ProviderAgent cmdlet to return a strongly-typed PSProviderAgent object instead of a generic dictionary, providing more consistent and reliable access to provider agent properties in PowerShell metascripts.
- Added immediate domain controller detection for newly installed agents. Domain controller badge now appears immediately after agent installation without waiting for maintenance.
- Continued development of RBAC

### Bug Fixes

- Fixed a memory leak in our PowerShell runspace pool management that was leading to instance crashes after prolonged uptime
- Fixed a regression where software marked as "reboot required" weren't properly throwing errors when reboots were suppressed
- Fixed an issue when requesting access to ImmyBot where the screen would reload every 10 seconds
- Fixed an issue where items set to "Onboarding Only" and ordered before non-onboarding tasks were not respecting deployment ordering
- Fixed an issue where newly created Automate clients were syncing with an empty “Customer Name”. The mapping now checks Company for null or whitespace and, when blank, falls back to Name.
- Fixed an issue where the "Complete Azure Setup" button redirected to the wrong page
- Fixed an issue where loading a computer details page would sometimes show the error 'Cannot set properties of null (setting "inventory")'
- Fixed an issue where deleting a person would throw an error if the person was assigned as a primary user of a computer. The primary user field is now wiped out in this scenario.
- Fixed an issue where loading the script editor would consistently throw intellisense errors in the output window
- Fixed an issue where ImmyBot was incorrectly selecting x64 installers instead of ARM installers on ARM computers because it only used the "Architecture" field which shows "64-bit" for ARM64 systems

## 0.70.0

Released 07/23/25

### New Features
- Continued update to RBAC for permission checks on the server
- Enhanced enum handling in API to display enums as strings instead of integers in Swagger UI
- Computer list now auto-refreshes with selective polling and live badge sync
- Added more descriptive session logs when performing a task audit
- Significantly improved the performance of the main computer list
- The run button for schedules on the list page is no longer disabled when the schedule is disabled.

### Bug Fixes
- Fixed an issue where agents under the computer details page -> agents tab would show disconnected with a green (healthy) background
- Fixed session context handling for parameter validation when debugging scripts
- Fixed OAuth consent service to trim trailing slashes from redirect URIs
- Fixed issues with tenant-specific computer views for MSP users
- Fixed some incorrect access request handling and impersonation behavior
- Fixed user cache handling for multiple UPNs
- Fixed a performance issue with how we were caching authenticated users that lead to high memory in certain situations
- Fixed an issue where maintenance sessions did not follow computers when computers were moved to a different tenant
- Fixed an issue where tasks with script block parameters were being quick deployed without being allowed to specify the parameters
- Fixed an issue where the batch actions button was missing from the Tenant Details Page -> Sessions tab
-  Fixed an issue with trailing forward-slashes in the oauth flow consent-callback uri



## 0.69.0

Released 06/23/25

### Support Ticket Integration Capability

- A new integration capability, `ISupportsSupportTicketDetails` has been added that allows you to change where support requests are sent.
- In addition to controlling where support requests are sent, you can modify some of the branding on the support request sidebar.

The following is an example integration script:

```powershell
$Integration = New-DynamicIntegration -Init {
    param(

    )
    [OpResult]::Ok()
} -HealthCheck {
    New-HealthyResult
}

$Integration | Add-DynamicIntegrationCapability -Interface ISupportsSupportTicketDetailOverride -CreateTicket {
    [CmdletBinding()]
    [OutputType([SupportTicketCreationResult])]
    param(
        [Parameter(Mandatory)]
        [string]$requesterEmail,
        [Parameter(Mandatory)]
        [string]$subject,
        [Parameter(Mandatory)]
        [string]$notes,
        [string[]]$blobUrls,
        [string]$sessionUrl,
        [Parameter(Mandatory)]
        [Immybot.Backend.Domain.Models.User]$user
    )
    try {
        Write-Verbose "Creating support ticket with subject: $subject"
        Write-Verbose "Requester email: $requesterEmail"

        $ticketData = @{
            email = $requesterEmail
            subject = $subject
            description = $notes
            attachments = $attachmentUrls
            userId = $user.Id
            userName = "$($user.FirstName) $($user.LastName)"
            # Add any other fields required by your ticketing system
        }
        Write-Output $ticketData
        # Make the API call to your ticketing system
        # This is just an example - replace with your actual API endpoint and authentication
        # $headers = @{
        #     'Authorization' = 'Bearer your-api-token'
        #     'Content-Type' = 'application/json'
        # }
        # $response = Invoke-RestMethod -Uri 'https://your-psa-system.com/api/tickets' `
        #                              -Method Post `
        #                              -Headers $headers `
        #                              -Body ($ticketData | ConvertTo-Json) `
        #                              -ErrorAction Stop

        # For this example, we'll simulate a successful ticket creation
        # In a real implementation, you would extract the ticket ID and URL from the API response
        $ticketId = [Guid]::NewGuid().ToString()
        $ticketUrl = "https://your-psa-system.com/tickets/$ticketId"

        Write-Verbose "Ticket created successfully with ID: $ticketId"

        # Create and return the result object
        $result = [SupportTicketCreationResult]::new()
        $result.Success = $true
        $result.Message = "Support ticket created successfully"
        return $result
    }
    catch {
        # Handle any errors that occur during ticket creation
        Write-Error "Error creating support ticket: $($_.Exception.Message)"

        $result = [SupportTicketCreationResult]::new()
        $result.Success = $false
        $result.Message = "Failed to create support ticket: $($_.Exception.Message)"

        return $result
    }

} -NewSupportFormBranding {
    [CmdletBinding()]
    [OutputType([DotNext.Optional[Immybot.Backend.Providers.Interfaces.ProviderSupportFormBranding]])]
    param(

    )

    # Replace the default Immybot Support Sidebar and Session Support Modal UI details with your own branding

    # Available parameters:
    # - $supportSidebarTitle: The title of the support sidebar panel
    # - $headerAlertMessage: The text residing in the alert at the top of the support sidebar panel
    # - $descriptionPlaceholderText: The placeholder text for the description field in the support form
    # - $descriptionAlertMessage: The text residing in the alert under the description field
    # - $showConfirmationCheckbox: Boolean indicating whether to show the 'I've read FAQ' confirmation checkbox
    # - $footerMessage: The text residing in the footer of the support sidebar panel
    # - $sessionSupportButtonTitle: The title of the button for the session support modal
    # - $showSessionSupportConfirmCheckbox: Boolean indicating whether to show the 'I've read the Security Software Exclusions' confirmation checkbox in the session support modal

    New-SupportFormBranding -SupportSidebarTitle 'Your Branding Request Title' `
                            -HeaderAlertMessage 'Welcome to [Brand] Customer Care!' `
                            -DescriptionPlaceholderText 'Describe your experience or issue here' `
                            -DescriptionAlertMessage 'Please provide specific details about your order, location, and time of visit to help us serve you better!' `
                            -ShowConfirmationCheckbox $false `
                            -FooterMessage 'Thank you for contacting [Brand]. We are committed to making things right!' `
                            -SessionSupportButtonTitle 'Request Help' `
                            -ShowSessionSupportConfirmCheckbox $false `
}

return $Integration
```
This would result in the the following support request sidebar:

![Image](https://camo.githubusercontent.com/400ac37e3fdfe9c4e7b4a39fae7daf5ef7dc71d5c96416901de7396b9decba5b/68747470733a2f2f696d6d79626f742e626c6f622e636f72652e77696e646f77732e6e65742f72656c656173652d6d656469612f31383466303733302d313739662d343433372d383366652d303838393461356433666531)

### Improvements

- Added a notes field to the computer details overview tab. The notes also show up in the main computer list page.
- Added a "Computers" column to the tenant list page that displays the total number of computers for each tenant.
- Updated the Immy Agent integration page to no longer show the form since it can't be updated
- Continued work on implementing role-based access control on the server

### Bug Fixes

- Fixed an issue where assigning a tenant's parent could create a circular reference
- Fixed an issue where MSP non-admin users were unable to create tenants.
- Fixed an issue with cloud sessions where it would incorrectly not start the session if a computer session for that tenant was running
- Fixed an issue where onboarding sessions would occasionally show the wrong user that triggered it. This issue was related to caching and did not affect security.

## 0.68.1

Released 06/09/25

### Bug Fixes

- Fixed an issue where an integration cmdlet had a parameter removed that would cause some integrations to fail to initialize.
- Fixed an issue where ImmyBot Agent deployments could sometimes still fail with "Provider ImmyBot Agent does not have a client linked to tenant xxx"

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

### Features and Improvements
- Added parent tenant information to computer details overview page (only shown for child tenants)
- Added creating, updating, and deleting users to the audit log
- Starting remote control sessions are now recorded in the audit table
- Added object name to audit entries for software, tasks, scripts and several other object types
- Added People option to the user filter selection
- Made Agent and Computer tables more responsive by improving load times

### Bug Fixes
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





