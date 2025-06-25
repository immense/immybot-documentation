# ConnectWise Automate

Setting up this integration allows you to
- Import customers from Automate
- Import computers from Automate
- Manage all computers in Automate without deploying the ImmyBot Agent
- Map customers from Manage to ImmyBot tenant based on existing Automate<->Manage relationship

## Prerequisites
- You must be an administrator in ImmyBot
- You must be able to manage security roles and users in Automate
- You must be able to to manage API keys in Automate

## Create ImmyBot Role
ImmyBot requires the following permissions in Automate

1. Navigate to **System** > **User Class Manager**
2. In **User Class Manager**, create a new role and enable the following permissions

- Core
  - Clients.Read
  - Clients.Show All
  - Computers.Show All
  - Computers.Edit (For moving existing computers to new locations)
  - Computers.Delete (For retiring duplicate computers)
  - Groups.Show All
  - Locations.Show All
  - Patch Manager.Read (Required if you want Immy to apply approved Windows Updates)

![Immy-CWA-User Class Manager-Permissions](https://user-images.githubusercontent.com/5932122/187803601-f2d49a3a-11cc-46b9-8aa2-b7ea1123902e.png)


## Create ImmyBot User

1. Navigate to **System** > **Users**
2. Add a User and add the following information on the General tab
   1. Username: ImmyBot
   2. Password: Something complex and unique
   3. Email Address: Set this to your own email address
3. Click on the Permissions tab, right click on the User Classes, and select the ImmyBot Role that you created.
![](/.vitepress/images/2021-03-23-16-14-24.png)

![](/.vitepress/images/2021-03-23-16-19-01.png)

![](/.vitepress/images/2021-03-23-16-30-41.png)

## Enable Google MFA for ImmyBot User

The integration requires Google for MFA. Duo is not supported as Duo does not expose the MFA token anywhere for us to use and doesn't appear to be the standard TOTP like Google uses.
You will need to exclude the integration user from your Duo deployment if using Duo and configure the Google MFA plugin for Automate for this user.

![](/.vitepress/images/2021-03-23-18-35-49.png)

![](/.vitepress/images/2021-03-23-18-35-28.png)

![](/.vitepress/images/2021-03-23-18-39-00.png)

## Add RMM Link for CW Automate

1. In ImmyBot, navigate to **Show More** > **Integrations** and click on **Add Integration**
2. Find and add the **CW Automate** integration
3. Edit the integration and fill out the form
   1. Automate URL: Your Automate Url (ie https://automate.mymsp.com)
   2. Automate Username: the Username you created in the Create ImmyBot user step, should be ImmyBot unless you went with something else
   3. Automate Password: the password you created in the Create ImmyBot user step
   4. Manual Entry code: The Google MFA code you got in your email

![](/CWAutomateIntegrationForm-GoogleMFA.png)

## Import your customers

1. From the CW Automate Integration screen click on Clients
2. Link your MSP tenant manually first
3. You can bulk Create tenants or manually link tenants between ImmyBot and CW Automate
   1. Alternativly, ImmyBot will suggest tenants that it thinks are the correct ones to link

Alternatively, you can create/map only certain customers.
When you map a customer from an RMM, the computers will undergo Identification

![](/LinkingClientsInIntegration.png)