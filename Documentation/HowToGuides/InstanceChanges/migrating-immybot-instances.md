<!-- How To Template -->
# Migrating ImmyBot Instances

> [!WARNING] This is a manual process
> ImmyBot does not have an automated method to migrate instances, except for the computers themselves. This is due to the issues that may arise when moving integrations, and cross tenant deployments. This also affords you the opportunity to not migrate Deployments, Software, Tasks, etc that are not needed anymore, and bring the source material to your Destination instance standards.

::: info
You may contact support for one on one review of instances, or guidance for this process
:::
<!-- You can use HTML tags to help organize, but in general VitePress will take care of everything dynamically-->


## Overview
This document goes over the ins and outs of migrating one ImmyBot instance to another. Due to how unique each instance can be, this serves to be a generic checklist that should be followed in order to ensure that the migration goes smoothly. At its core, the migration is going to involve you identifying what is different in the Source tenant from the Destination Instance, and moving those things over to the Destination Instance.

## Prerequisites
- Admin access to both instances
- The ability to create API keys for integrations and deployments where needed
- Instance identification
  - Decide which instance will be the "Winning" or "Destination" instance and which one is the "Losing" or "Source" instance.
  - For the sake of this document we will be using the terms Destination and Source.
- Knowledge of ImmyBot to create Tenants, Deployments, Software, Tasks, and Integrations.

## Migrating Core ImmyBot Functions
### Review the instances
  - Review the Destination instance against the Source instance. Your Destination should be the source of truth, so you are looking for:
     - Deployments that are covered by Cross Tenant deployments in your Destination instance.
     - One off deployments that are going to need to be copied over
     - Integrations that need to be copied over
     - Check if there are any non-standard schedules from your Source instance
     - Non standard tags

### Migrate Integrations that Manage Companies
  - Follow the specific integration guide to recreate the integrations from your Source instance to the Destination instance. We want to do this first in the event that you are managing your tenants through your PSA or RMM.
  - If your integration does both, we recommend disabling any options that allow scripts to run on the endpoints first.

### Migrate Tags
  - If necessary, migrate any tags that are not standard in the Destination tenant

### Migrate Tenants
  - Automatically create tenants
    - Utilize your integrations to create the tenants that are in the Source tenant to the Target tenant.
  - Manually create tenants
    - If you don't have integrations to create and manage tenants, you will need to create the tenants manually.
  - Migrate tenant specific settings. This is a short list, but the most commonly changed from default
    - Time Zones
    - Azure
    - Slugs
    - Parent tenants to Child tenants
    - Tags
    - Business Hours

### Migrate Software and Tasks
  - Recreate any local software in the Destination tenant.
    - For software that you uploaded files to, you can download them from the Source instance and then reupload the Destination tenant.
    - You can access to the scripts through the software, or through the script editor
  - Be sure to review and update the Deployment Ordering

### Migrate Deployments
  - Recreate any deployments that need to be. Typically these are going to be one-off's that are per tenant such as Line of Business applications that are for a specific vertical.

### Migrate Schedules
  - Copy schedules from the Source instance to the Destination instance

<!--
### Migrate RBAC roles (Due End of Month July 2025, this is a placeholer)
  - Specifically talking about any co-managed IT situations you may have.
- -->

### Migrate Users
  - Recreate any users that need to be. These are going to be MSP Users and Admins, co-managed IT users, etc.

### Migrate Integrations that Manage Computers
  - Follow the specific integration guide to recreate the integrations from your Source instance to the Destination instance.
  - We recommend disabling any options that allow scripts to run on the endpoints until you're ready to cut over and move agents.

### Migrate Computers
  - ImmyBot has a task called 'Migrate ImmyAgent' that you need to run in the Source tenant to migrate the computers automatically. The information you need to put into the Deployment is going to come from the Destination tenant ImmyBot PowerShell installer.
  - This task should not be run cross tenant. It needs to be run tenant by tenant, and you need to create the [PowerShell](/Documentation/HowToGuides/agent-installation.md#powershell) installer Tenant by Tenant in the Destination instance.
  - Alternatively if you have an integration that can run scripts on computers, you can use that to move the computers over. e.g. ScreenConnect.

<br><br><br>
>[!NOTE] Document information
>Author: Mark Gomez and Drew Hackworth
><br>
>Date Published: 2025/07/14
><br>
>Date Revised: N/A
><br>
>Version Number: 1.0
