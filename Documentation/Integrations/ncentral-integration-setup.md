# N-Central REST API Dynamic Integration
::: info
This page is now dedicated to the new N-Central integration, utilizing the new N-Central REST API & ImmyBot Dynamic Integrations.

This new integration should provide improved stability over our classic (and soon to be deprecated) integration.

Looking for the classic N-Central integration guide?
We recommend against it, but here is [the classic setup guide](/old-ncentral-integration-setup.html).
:::

Setting up this integration allows you to:
1. Import customers from N-Central
2. Import computers from N-Central
3. Manage all computers in N-Central without deploying the ImmyBot Agent

## Create ImmyBot Role in N-Central

ImmyBot currently requires the following role permissions to operate correctly:

### Devices
- Devices View
  - All Devices -> Read Only
- Scheduled Tasks
  - Scheduled Tasks -> Manage
- Downloads
  - N-central Installers Download

Create an "ImmyBot" role in your N-Central instance using above roles.
![](/.vitepress/images/ncentraldocs/add_userrole_guide_1.png)

![](/.vitepress/images/ncentraldocs/new_add_user_guide_1.png)


## Create an API-Only ImmyBot user in N-Central

N-Able themselves have an [official short guide for doing this we recommend following](https://documentation.n-able.com/N-central/userguide/Content/User_Management/Role%20Based%20Permissions/role_based_permissions_create_APIuser.htm) for this part, but here is a recap:

1. Create a new "ImmyBot" user in the instance with the "ImmyBot" role applied.
2. Set a password (it is required for now but the api team is working on removing this)
3. Under "Access Groups", add an Access Group that covers all of your tenants (or at least an access group that covers the tenants you want to have access to in ImmyBot)
4. Under "API Access", ensure "Api-Only User" is checked. <u>2FA MUST be disabled for the API User!</u>
5. Save the new ImmyBot user, and press the "Generate JSON Web Token" button. Copy this value somewhere for later.

**IMPORTANT** - Right now, the password for the api user needs to be reset every 90 days. Your integration will stop working if you do not reset the password. The api team has also mentioned they are looking to remove this functionality for api users.


## Add the necessary 'RunScript' Automation Policy

After completing the new API-Only user setup, it's time time add an Automation Policy to N-Central so ImmyBot can
run scripts on the machines.

First, navigate to the "Script/Software Repository" under "Schedules Tasks" beneath the "Configuration" tab in N-Central.
Once at the Script Repository page, select "Add" -> "Automation Policy".
![](/.vitepress/images/ncentraldocs/add_automation_policy_1.png)

Second, <a href="https://docs.immy.bot/ImmyBotRunScriptV2.amp" target="_self">download the ImmyBot RunScript Automation Policy</a> and upload it to your instance. Fill out the Name and Description how you see fit if required.
![](/.vitepress/images/ncentraldocs/add_automation_policy_2.png)

Last step is to ensure this new automation policy we have uploaded is able to be invoked by the ImmyBot API User.
Find the automation by searching for "ImmyBot", then flipping the `Enable API` switch. Accept the confirmation modal, then copy the `Repository ID` for later use.
::: warning Make sure you copy YOUR `Repository ID`, as this identifier for the automation policy will be unique across every N-Central instance!
:::
![](/.vitepress/images/ncentraldocs/add_automation_policy_3.png)

## Add integration for N-Central

After completing setup in N-Central, it's time to add the integration to ImmyBot.
Navigate to the "Integrations" page in ImmyBot, and create a new `N-Central v2` integration.
Input a name you'd like for the integration, followed by your N-Central server URL, and the `JWT` you copied in the steps to make an "ImmyBot" API user.
Then, input the `RepositoryId` gathered from the step before.
Lastly, flip the `Enable Integration` switch.

::: warning If the `Health Check` reports an error after enabling the integration, ensure you have completed the above steps correctly. If you continue to have issues, reach out to the community or support for assistance.
:::

**If your error message contains "Unable to validate UI session: javax.validation.ValidationException: Unable to validate UI session.", then reset the password on your api user and generate a new JWT. This is a limitation imposed by N-Central**

![](/.vitepress/images/ncentraldocs/add_integration_guide_new_1.png)

## Import your customers

1. From the CW Automate Integration screen click on Clients
2. Link your MSP tenant manually first
3. You can bulk Create tenants or manually link tenants between ImmyBot and CW Automate
   1. Alternatively, ImmyBot will suggest tenants that it thinks are the correct ones to link

Alternatively, you can create/map only certain customers.
When you map a customer from an RMM, the computers will undergo Identification

![](/LinkingClientsInIntegration.png)

## Troubleshooting

### My customers are showing up but no computers
Login to N-Central as the ImmyBot User and accept the EULA

### Unable to validate UI session

If your error message contains "Unable to validate UI session: javax.validation.ValidationException: Unable to validate UI session.", then reset the password on your api user and generate a new JWT. Passwords are required to be reset every 90 days, even for api users - https://github.com/ToschAutomatisering/PS-NCentral/issues/5. This is a limitation imposed by N-Central that will hopefully be addressed in a future release.
