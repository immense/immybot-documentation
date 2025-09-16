<!-- How To Template -->
# Miscellaneous Interface Pages

## Overview
This pages is the home for interface pages that need minimal documentation. These are typically pages that provide information, or are otherwise simple in nature.


## Prerequisites
An active ImmyBot subscription or [trial](https://www.immy.bot/pricing/)

## Notifications
### Objective
- Provides a single pane of glass for all notifications sent to your user
### Navigation
- **Show More** > **Notifications**

## Media
### Objective
- Provides a list of icons that can be attached to various items in ImmyBot
### Navigation
- **Show More** > **Media**

::: info
ImmyBot managed media cannot be deleted.
:::

## Tags
### Objective
- Provides a list of tags available in your instance.
### Navigation
- **Show More** > **Tags**
### Description
You can create and manage Tags from this page. Tags are used to target tenants and computers for specific deployments.

## Inventory
### Objective
- These tasks will be run on their specified schedules and will run their specified scripts on devices to collect system information for the purpose of inventorying the devices within immy.bot. The data collected by these scripts is stored on the Computer object under the 'inventory' column. The results of each script will be nested under the "inventory key" specified by the script. These results are accessible from the Computer Details page.

### Navigation
- **Show More** > **Inventory**

## System Update
### Objective
- This page gives you the configuration page for System Updates to your ImmyBot instance, specifically the Release Channel and if there is an update available, an update now button.
### Navigation
- **Show More** > **System Update**

## Audit
### Objective
- This page gives you the audit information for most things that happen in you're ImmyBot instance
### Navigation
- **Show More** > **Audit**

## OAuth Tokens
### Objective
- This pages gives you the list of OAuth tokens in your instance.
### Navigation
- **Show More** > **OAuth Tokens**
### Description
There is no credentials that are shown in plain text here, however, confidential informaiton (Token IDs, ClientIDs, etc) are shown.

## Locks
### Objective
- This page gives you a list of ephemeral locks currently in use. Locks are used when a maintenance item needs to be run serially, such as the Change Name and Join Domain task.
### Navigation
- **Show More** > **Locks**
### Description
You can delete locks, but you really only should do that if the endpoint looses connection to ImmyBot and the session is holding up a large onboarding push.



<br><br><br>
>[!NOTE] Document information
>Author:
<br>
>Date Published:
><br>
>Date Revised:
><br>
>Version Number:
