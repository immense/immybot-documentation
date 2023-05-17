# Azure AD/365 - Granular Delegated Admin Permissions

Enabling this allows ImmyBot to

1. Sync all users from your partner tenant
2. Sync all users from your customer's tenants
3. Install the 365 applications a user is licensed for (Apps for business/Apps for entrprise/Project/Visio)
4. Deploy software to Teams, On-Premises Security Groups (Ex. Everyone in the Engineering Team gets AutoCAD 2022)

## Default

In this mode, you don't need to create an app registration. You consent as an administrator, allowing ImmyBot access users in your tenant.

[GDAP Customer Syncing](#gdap-customer-syncing) can be enabled in this mode.

## Custom

In this mode, you create an app registration and provide its credentials to ImmyBot. This mode is required if you want to be able to [sync non-GDAP customers](#csp-preconsent).

[GDAP Customer Syncing](#gdap-customer-syncing) can be enabled in this mode.

### Create an App Registration

Navigate to: https://aad.portal.azure.com/

![](./.vuepress/images/2020-12-07-15-46-18.png)

![](./.vuepress/images/2020-12-07-15-47-07.png)

![](./.vuepress/images/2020-12-07-15-47-18.png)

### Grant Permissions

See the screenshots below for the minimum permissions.

![](./.vuepress/images/2020-12-07-15-47-33.png)

![image](https://github.com/immense/immybot-documentation/assets/1424395/ed4d173b-b0dc-4a11-a3bc-85e8231e1dbd)

![image](https://github.com/immense/immybot-documentation/assets/1424395/db0bbf02-ecea-499d-80f2-a1d92ff6764d)

![image](https://github.com/immense/immybot-documentation/assets/1424395/f5c4ec0f-35f2-49ad-a690-7e940c187d0a)

### Create Client Secret

![](./.vuepress/images/2021-08-16-13-19-15.png)

![](./.vuepress/images/2021-08-16-13-20-45.png)

![](./.vuepress/images/2021-08-16-13-23-26.png)

### Assign GDAP Permissions to ImmyBot Service Principal 
- Create a Security Group in Azure AD called "ImmyBot Security Group"
- Add the ImmyBot Service Principal to that group
- For each customer in the Partner Center, add the "ImmyBot Security Group" and add the "Directory Readers" and "Global Reader" role.

### Add to Admin Agents Group (Legacy DAP)

![](./.vuepress/images/2020-12-07-15-48-22.png)

![](./.vuepress/images/2020-12-07-15-48-26.png)

![](./.vuepress/images/2020-12-07-15-48-31.png)

![](./.vuepress/images/2020-12-07-15-48-35.png)

![](./.vuepress/images/2020-12-07-15-48-38.png)

### Copy the `Application (client) ID` and `Client Secret Value` into the form in ImmyBot.
