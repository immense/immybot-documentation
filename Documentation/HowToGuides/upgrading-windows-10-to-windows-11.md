<!-- How To Template -->
# Update Windows 10 to Windows 11

## Overview
With the upcoming retirement of Windows 10, we have published this document to give you guidance on upgrading Windows 10 to Windows 11 utilizing ImmyBot.
At a high level this document will inform you on the proper deployments to utilize to upgrade Windows 10 to Windows 11 as well give you some best practices that you can integrate into your deployment projects.


## Prerequisites
- An active ImmyBot subscription
- Advanced knowledge on creating and managing Deployments using Tags.

## Best Practices
- Utilize Cross Tenant Deployments to prevent repeating processes where possible.


## Process
::: info If you're using **Install Windows Updates (Beta)** in your deployments already, we recommend creating a Single Tenant Deployment to ignore this task so that you have a controlled deployment otherwise you will run into issue where the Windows 11 upgrade is pushed outside of your deployment window.
:::

#### Set up your Tag
1. Create a tag with the name **Windows 11 Upgrade**

#### Set up your Deployments

1. Create a deployment with the task **Windows 10 to Windows 11 Upgrade**
    - Task Mode: Enforced
    - Parameters: Leave default
    - Target Enforcement: Adhoc
    - Target Scope: Cross Tenant
      - Target Type: Tag
        - Tag Name: **Windows 11 Upgrade**
      - Target Filter: Workstations and Portable Devices

## Before Day of Deployment

1. Ensure computers don't have any pending updates. You can utilize ImmyBot's Global Task **Install Windows Updates**.

## Deployment Time
::: info Schedule this
If you're an ImmyBot Standard customer, you can schedule this.
:::

1. Tag all target computers with the tag **Windows 11 Upgrade**
2. Schedule or manually run maintenance sessions for this task **with Forced Reboots**

### After Successful Upgrade
1. Remove the tag **Windows 11 Upgrade** from computers
2. Remove any deployments you created to stop the Windows Update Beta from running.

## Advise and Issues

### Advice
- You don't **NEED** to use tags for this. If you want you can use single tenant deployments for all of this, we recommend tags as a way to manage this en masse without having to do the same thing over and over again.

### Issues We Ran Into
- ImmyBot still shows Windows 10 but the desktop is Windows 11
  -  Don't fret, just run inventory again.
  -  Click on Computers > Check the box to the left of the computer(s) in question > Batch Actions > Maintenance > Set drop down to Inventory Scripts > Click Run. After that session is complete, you should see that ImmyBot sees Windows 11.


<br><br><br>
>[!NOTE] Document information
>Author: Mark Gomez
<br>
>Date Published: 2025/08
><br>
>Date Revised: N/A
><br>
>Version Number: 1.0
