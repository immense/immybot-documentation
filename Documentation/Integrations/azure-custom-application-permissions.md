# Azure Custom Application Permissions

## Overview
This document is intended to go over the custom permissions necessary for the advanced features of ImmyBot.

## Create an App Registration

Navigate to: <https://aad.portal.azure.com/>
1. Click on app registration
:::details <font style="font-size:20px">📷</font>
![alt](/.vitepress/images/2020-12-07-15-46-18.png)
:::
2. Click on new registration
:::details <font style="font-size:20px">📷</font>
![alt](/.vitepress/images/2020-12-07-15-47-07.png)
:::
3. Name it something recognizable such as "ImmyBot Custom Application"
4. Select second radial button for (Any Microsoft Entra ID tenant - Multitenant)"
5. Add your Web redirect URI
6. Click Register
::: details <font style="font-size:20px">📷</font>
![alt](/.vitepress/images/2022-12-12_10-42-55.png)
:::

:::warning
**Important!** Your app registration must have a Web redirect uri of `https://<your-domain>.immy.bot/consent-callback`, replacing `<your-domain>` appropriately
:::

## Grant Permissions

See the <font style="font-size:20px">📷</font>s below for the minimum permissions.
1. Click on API Permissions
2. Click Add Permissions
   ::: details <font style="font-size:20px">📷</font>
   ![](/.vitepress/images/2020-12-07-15-47-33.png)
   :::
3. Click on Microsoft Graph
   ::: details 📷
   ![alt text](MSGraph.png)
4. Click on Application Permissions
   :::details <font style="font-size:20px">📷</font>
   ![alt text](MSGraph-ApplicationPerms.png)
   :::
5. Add the following permissions
   1. DelegatedAdminRelationship.Read.All
   2. DeviceManagementManagedDevices.ReadWrite.All
   3. Directory.Read.All
   4. User.Read
   ::: details <font style="font-size:20px">📷</font>
   ![alt text](GranularPerms.png)
   :::
6. Click Grant Admin Consent for <'your Azure tenant name'>
   :::details <font style="font-size:20px">📷</font>
   ![alt text](GrantAdminPerms.png)
   :::


## Create Client Secret
1. Click on Certificates & Secrets which is under Manage
2. Click on New Client Secret
   ::: details <font style="font-size:20px">📷</font>
   ![](/.vitepress/images/2021-08-16-13-19-15.png)
   :::
3. Create a meaningful description
4. Set the Expires timeline to 24 months
5. Click Add
   ::: details <font style="font-size:20px">📷</font>
   ![](/.vitepress/images/2021-08-16-13-20-45.png)
   :::
6. Copy the Secret Value and paste it into ImmyBot
   ::: details <font style="font-size:20px">📷</font>
   ![](/.vitepress/images/2021-08-16-13-23-26.png)
   :::

**Please see [GDAP Customers](/Documentation/Integrations/azure-gdap-customer-management) if you want ImmyBot to access your customers' data**.

:::info
Copy the `Application (client) ID` and `Client Secret Value` into the form in ImmyBot.
:::