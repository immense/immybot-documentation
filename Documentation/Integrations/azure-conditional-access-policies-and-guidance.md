# Azure Conditional Access Policies and Guidance

## Overview
This document is intended to give you information on how to configure Conditional Access Policies (CAPs) to work with ImmyBot. In general, in order for ImmyBot to work with Azure and Intune Joining you will need to ensure that the DEM user you're using oAuth with is excluded from CAPs that cover device registration.

## Prerequisites
Admin access to your Azure tenant to review and change Conditional Access Policies.

## Guidance
We recommend excluding the DEM users you use for oAuth from the CAPs that cover the Device Registration Service (01cb2876-7ebd-4aa4-9cc9-d28bd4d359a9). In general you can exclude the user from all CAPs, and create a duplicate CAP that only effects this DEM user. This CAP would cover include All Resources, and exclude Device Registration Service.

## User Specific Conditional Access Policy
This is a generic CAP works with ImmyBot's Azure requirements when utilizing AzureAD Join and Intune Enrollment.

Navigate to [Azure Portal](https://portal.azure.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Policies)

Create a Conditional Access Policy with the following settings
::: info CAP Settings
<pre>
Name: ImmyBot DEM
Users:
    Include: *Your ImmyBot DEM user for this client*
    Exclude: None
Target Resources:
    Include: All Resources
    Exclude: Device Registration Service (01cb2876-7ebd-4aa4-9cc9-d28bd4d359a9)
Network: Not configured
Conditions: Not Configured
Grant:
    Grant Access:
      Require multifactor authentication
Session: Not Configured
</pre>
:::
### Session Exceptions
If your security requirements need to have session settings set, below are the ones we recommend keeping disabled where possible.

#### Sign in frequency
This is a hard requirement for a user to re-authenticate their sessions. If this is set and applied to your DEM users, it will make the tokens in ImmyBot expire and you will have to reauthenticate however often it's required by this setting.

#### Continuous Access
This allows Microsoft to revoke a token at any time based on critical events or real-time policy evaluation. While this is a good option to use, it can cause issues with ImmyBot not being able to renew oAuth tokens, we reccomened leaving this disabled for the CAP that covers your DEM users.

#### Token Protection
This requires all long-lived tokens to be bound to the device using software key binding or hardware security module binding where available. ImmyBot does not use static infrastructure resources, and as a result, this may cause your authentication tokens to become invalid if your instance is redeployed.

<br><br><br>
>[!NOTE] Document information
>Author:
<br>
>Date Published:
><br>
>Date Revised:
><br>
>Version Number:
