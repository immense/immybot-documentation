# Support Ticket Override Dynamic Integration

### Setting up this integration allows you to:

- Redirect support requests submitted through your instance.
  - <small>ImmyBot Support will not receive a copy of support requests when this integration is enabled.</small>
- **(Optional)** Override the default behavior and branding/UI on both the Support Sidebar and Session Support Request modal.

## Create an Integration Type

1. Go to **Show more** -> **Integration Types** -> **New**
2. Fill out your integration type's details.
3. Create or Select an **Integration Script** implementing the `ISupportsSupportTicketDetailOverride` interface.

## Integration Script Setup

1. Create a `New-DynamicIntegration`.
2. Pipe in the `Add-DynamicIntegrationCapability` cmdlet followed by the interface of `ISupportsSupportTicketDetailOverride`.
3. Add the `-CreateTicket` parameter and adjust to your liking. The Script Editor will allow you to autocomplete a template to get started.
4. **(Optional)** Add the `-NewSupportFormBranding` parameter to adjust the behavior and branding of UI elements used in the 'Support Sidebar' and/or the 'Session Support Request' modal. [See UI Example](#ui-branding-change-example)
5. Save the script.

You should end up with a script that resembles the following. [See examples](#examples) below.

## Create the Integration

1. Create a new Support Ticket Override Integration from **Show More** -> **Integration** -> **Add Integration** -> **[Your Support Override Integration Name]**.
2. Click "Update"
3. You're done. Navigate to the Support Sidebar to see or test your changes.

::: info Additional Information

- Only **one** Integration implementing the `ISupportsSupportTicketDetailOverride` integration capability may be enabled at a time. [Please disable any that are active before attempting to enable another](#enabling-multiple-support-ticket-override-integrations).
- The `$blobUrls` parameter will contain download urls for any file attachments present in a support request.
  :::

## Examples

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

## Enabling Multiple Support Ticket Override Integrations

This is an example of a warning you will receive when a second integration with the `ISupportsSupportTicketDetailOverride` capability is enabled. To resolve the issue, disable the current integration. Navigate to the previous integration implementing this support override capability. Disable and Update it. Then navigate back to the desired support override integration you wish to enable and enable/update it.

![image](/.vitepress/images/supportoverridedocs/IntegrationEnabledError.png)

## UI / Branding Change Example

![image](/.vitepress/images/supportoverridedocs/BrandingChangeExample.png)
