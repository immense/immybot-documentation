# Azure Custom Application Permissions

## Overview
This document is intended to go over the custom permissions necessary for the advanced features of ImmyBot.

## Create an App Registration

Navigate to: <https://aad.portal.azure.com/>

![](/.vitepress/images/2020-12-07-15-46-18.png)

![](/.vitepress/images/2020-12-07-15-47-07.png)

![](/.vitepress/images/2022-12-12_10-42-55.png)

**Important!** Your app registration must have a Web redirect uri of `https://<your-domain>.immy.bot/consent-callback`, replacing `<your-domain>` appropriately

## Grant Permissions

See the screenshots below for the minimum permissions.

![](/.vitepress/images/2020-12-07-15-47-33.png)

![image](https://github.com/immense/immybot-documentation/assets/1424395/24640a0d-b078-4575-8125-e035788f06e8)

![image](https://github.com/immense/immybot-documentation/assets/1424395/f5c4ec0f-35f2-49ad-a690-7e940c187d0a)

> [!NOTE]
> Since they are commonly used, please note that the `DeviceManagementManagedDevices.ReadWrite.All` permission is required for MDM enrollment with the **"Join AzureAD"** and **"Configure Directory"** tasks.

## Create Client Secret

![](/.vitepress/images/2021-08-16-13-19-15.png)

![](/.vitepress/images/2021-08-16-13-20-45.png)

![](/.vitepress/images/2021-08-16-13-23-26.png)

**Please see [GDAP Customers](/Documentation/Integrations/azure-gdap-customer-management) if you want ImmyBot to access your customers' data**.

:::info
Copy the `Application (client) ID` and `Client Secret Value` into the form in ImmyBot.
:::