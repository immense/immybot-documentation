# Autotask

## Overview
This document will instruct you on configuring and managing your Autotask integration.

## Prerequisites
An active ImmyBot subscription or [trial](https://www.immy.bot/pricing/)

MSP Admin permissions to your ImmyBot Tenant

Admin permissions to your Autotask instance

## Process

### Create API user in Autotask
1. Log in to Autotask.
2. Go to: Features & Settings > Account Settings & Users >  Resources/Users (HR) > Resources/Users > New > New API User.
3. Enter values for the First Name, Last Name, and Email Address fields.
4. Make a selection in the Security Level field, we have confirmed that System User works.
5. Use the Generate... button associated with the Username and Password fields to automatically populate the fields.
      - Make note of this before exiting the window, it will only be shown once.
      - If you choose to create your own entries for these fields:
      - The username must contain letters and numbers, may contain special characters (@ ( ) ; : [ ] | \ are not allowed), and must be unique for your database (including inactive resources).
      - The password must match the criteria configured in the system settings for your Autotask Site Setup.
6. Select Integration Vendor radial button under API Tracking Identifier.
7. Select ImmyBot under the Integration Vendor dropdown
8. Click Save & Close.

### Create Integration in ImmyBot

1. Navigate to `Show More` -> `Integrations`
2. Click add integration
3. Click Autotask
4. Name your integration
5. Input the username and secret for your API user
6. Leave IntegrationCode default, do not put anything in that field
7. Click update
8. Toggle your capabilities (see below for more information)
9. Toggle the enable integration switch
10. Review your clients in Autotask and link to your ImmyBot tenants

### Capabilities
- Mapping clients from the integration to tenants in ImmyBot
- Retrieving client groups and clients in groups

### Migrating your Autotask API
In October 2025, ImmyBot completed the approval process for an official integration with Autotask. Please follow this process if you had the Autotask integration set up prior to October 31, 2025 and you created a custom Integration Identifier.

1. Follow the above steps to create a new API user. You cannot reuse your old API User
2. Navigate to your integration in your ImmyBot instance
   1. `Show More` -> `Integrations` -> `Edit your integration`
3. Remove your Integration Code by clicking "Remove Specified Value"
4. Update your API Username and Password
5. Click update and toggle the enabled switch to force the integration to refresh and start using your new API user.


<br><br><br>
>[!NOTE] Document information
>Author: Mark Gomez
<br>
>Date Published: 9/30/2025
><br>
>Date Revised: 10/31/2025
><br>
>Version Number: 1.1
