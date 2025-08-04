<!-- How To Template -->
# Creating & Managing Schedules
::: info ImmyBot Standard and ImmyBot Forever Clients only
If you're an ImmyBot starter client, you do not have access to Schedules in ImmyBot
:::

## Overview
This document is intended to show you how to create schedules in ImmyBot for ongoing maintenance. Within Schedules you can manage when maintenance runs for your endpoints, set whether to send notification emails out, and choose which deployments to apply the Schedule to.

## Prerequisites
Access to an ImmyBot instance that is either Immy Standard or Immy Forever.

## Creating a Schedule
1. Navigate to **Schedules** on the left hand column
2. Click **New** at the top
3. Fill out this form as necessary
4. Click Create

## Creating Schedules for Specific Tenants
There are 2 ways to go about this.
1. Follow the Creating a Schedule instructions above and set Tenant in the Target section to whoever you need it to apply to
2. Create the Schedule within the Tenant itself
   1. Navigate to **Tenants** on the left hand column
   2. Click on **Schedules**
   3. Click on **New**
   4. Fill out the form as necessary

## Deleting a Schedule
1. Navigate to **Schedules** on the left hand column
2. Click on the Red Trashcan button to the left of the Schedule you want to delete

## Recovering a Schedule
ImmyBot does not support recovery of Schedules nativley, however, you can look at the Audit Log and recreate the deleted Schedule.
1. Navigate to **Show More** > **Audit**
2. Filter the **Object Type** to **Schedule**
3. Find the Schedule that was deleted and expand the audit log
4. This contains the information of the schedule that was deleted. You will need to follow the Creating a Schedule instructions above and recreate the Schedule.

## Best Practices
Please see [Best Practices](/Documentation/GettingStarted/instance-best-practices) for our recommendations.

<br><br><br>
>[!NOTE] Document information
>Author: Mark Gomez
<br>
>Date Published: 2025/07/23
><br>
>Date Revised: N/A
><br>
>Version Number: 1.0
