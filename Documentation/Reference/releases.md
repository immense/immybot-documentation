## 0.76.3

Released 01/27/2026

### Bug Fixes

- Fixed an issue where users would not be redirected to the billing page when a trial expired or when the selected billing plan required any changes

## 0.76.2

Released 01/26/2026

### Stability Improvements

- Improved memory footprint of integration audit logs around refreshing an agent's online status
- Improved CPU and memory footprint when writing output to PowerShell streams.
- Improved CPU and memory footprint in Azure data syncs
- Improved memory footprint in global software caches and lookups

## 0.76.1

Released 01/22/2026

### Bug Fixes

- Fixed an issue with some tenant admins unable to load the tag list page
- Fixed an issue where the preferences page would continually reload when toggling on PII mode

## 0.76.0

Released 01/19/2026

### Bug Fixes

- Fixed an issue where duplicate media api requests were being made when loading certain pages
- Fixed an issue with the batch actions button's disabled state on the computer list page
- Fixed an issue where clicking agent icons on a deleted computer responded with a 404 instead of a messaging stating you must restore the computer to perform this action
- Fixed issues wirth certain response types causing issues when loading the Swagger API page
- Fixed a rare uncaught exception that could cause the server to shutdown
- Fixed an issue with saving the script timeout value where the value would still be used even when the checkbox to override was unchecked
- Fixed the display of integration logos in timeline events
- Fixed a rare issue that could cause the deployments page and search to not load properly
- Fixed an issue that prevented the application locks page from loading
- Fixed an issue where `New-DropDownParameter` returned null when the multiselect switch was used
- Fixed an issue with calling `Get-ProviderAgent` in cloud scripts
- Fixed a typo in the error message displayed when a device has no connected agents
- Fixes an issue with redacting some in provider logs. Keeps REDACTED visible without errors.
- Fixed an issue when child tenants were created and linked to the same Azure tenant as the MSP tenant, the Azure user sync process would incorrectly move people objects between tenants based on domain filtering. This caused MSP Users and Admins to lose management access.
- Fixed an issue where the computer table export button would be shown even if the user didn't have permission to export computers
- Fixed an issue where desired version was not showing up in maintenance actions during resolution only sessions or detection sessions triggered from quick deploy
- Fixed an issue where integrations not using inventory identification were showing up in the computer overview tab. An example is "CW Manage Agent -- Not Inventoried Yet"
- Fixed an issue where disabling integrations from pulling agents in from linked clients would not always work and agents would still sync
- Fixed an exception that would occur during an integration's client sync when the client did not have any linked clients
- Fixed `PSStreamObject` cast exceptions by wrapping ephemeral agent error stream messages in `ErrorRecord`
- Fixed an issue where choco results would not show up in the maintenance selector
- Fixed an issue where sending test emails from the SMTP page were failing
### Improvements

- Improved performance of the maintenance sessions list page
- Upgraded the server to use .NET 10
- Updated styling of right-side sidebar to have more contrast in dark-mode
- Added the ability to load drafts for modified scripts that were closed before they could be saved or discarded.
- Updated ScreenConnect extension to be compatible with newer versions and made some performance improvements.
- `Set-Session` now persists the reboot preference to the session which allows the new preference to be picked up on future actions.
- Local software can now select a global integration type as the agent integration
- We now hide the "Getting Started" dropdown menu item when the checklist has been completed
- Improved the styling of the maintenance task parameter form
- Resizing the script editor panes now persists when closing the script editor or browser
- Added PKCE support to `New-OAuthConsentParameter` cmdlet

