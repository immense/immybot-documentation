# AutoTask

## Overview
This document will instruct you on configuring and managing your Autotask integration.

## Prerequisites
An active ImmyBot subscription or [trial](https://www.immy.bot/pricing/)

MSP Admin permissions to your ImmyBot Tenant

Admin permissions to your AutoTask instance

## Process

### Create API user in AutoTask
1. Log in to AutoTask.
2. Go to: Features & Settings > Account Settings & Users >  Resources/Users (HR) > Resources/Users > New > New API User.
3. Enter values for the First Name, Last Name, and Email Address fields.
4. Make a selection in the Security Level field.
5. Use the Generate... button associated with the Username and Password fields to automatically populate the fields.
     - Make note of this before exiting the window, it will only be shown once.
     - If you choose to create your own entries for these fields:
      - The username must contain letters and numbers, may contain special characters (@ ( ) ; : [ ] | \ are not allowed), and must be unique for your database (including inactive resources).
      - The password must match the criteria configured in the system settings for your AutoTask Site Setup.
6. Select ImmyBot under API Tracking Identifier.
7. Click Save & Close.

### Create Integration in ImmyBot

1. Navigate to Show More > Integrations
2. Click add integration
3. Click AutoTask
4. Name your integration
5. Input your integration code
6. Input the username and secret for your API user
8. Click update
9. Toggle your capabilities (see below for more information)
10. Toggle the enable integration switch
11. Review your clients in Acronis and link to your ImmyBot tenants

### Capabilities
- Mapping clients from the integration to tenants in ImmyBot
- Retrieving client groups and clients in groups


<br><br><br>
>[!NOTE] Document information
>Author: Mark Gomez
<br>
>Date Published: 9/30/2025
><br>
>Date Revised: N/A
><br>
>Version Number: 1.0
