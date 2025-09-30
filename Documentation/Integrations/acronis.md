<!-- How To Template -->
# Acronis

## Overview
This document is intended to go over the configuration of the Acronis integration in ImmyBot.

## Prerequisites
An active ImmyBot subscription or [trial](https://www.immy.bot/pricing/)

MSP Admin access to ImmyBot

Admin access to Acronis

## Process

### Create the Acronis API User
1. Login to your Acronis Portal
2. Settings > API Clients > Create API Client

Vendor documentation: https://developer.acronis.com/doc/cyberapps/settings/index.html

### Create the Integration in ImmyBot

1. Navigate to Show More > Integrations
2. Click add integration
3. Click Acronis
4. Name your integration
5. Input your datacenter URL
   - You can find your datacenter URL in the URL after you log in.
   - ex: https://eu8-cloud.acronis.com
6. Input your API Client ID and Secret into their respective fields
7. Click update
8. Toggle your capabilities (see below for more information)
9. Toggle the enable integration switch
10. Review your clients in Acronis and link to your ImmyBot tenants

### Integration Capabilities

- Retrieving agent installers dynamically from a URL
- Agent identification by adding an inventory script to be run against all of your endpoints
- Importing agents from linked clients into ImmyBot
- Mapping clients from the integration to tenants in ImmyBot
- Getting an install token for a specific client

<br><br><br>
>[!NOTE] Document information
>Author: Mark Gomez
<br>
>Date Published: 9/30/2025
><br>
>Date Revised: N/A
><br>
>Version Number: 1.0