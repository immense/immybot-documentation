# AzureAD/365

Enabling this allows ImmyBot to

1. Sync all users from your partner tenant
2. Sync all users from your customer's tenants
3. Install the 365 applications a user is licensed for (Apps for business/Apps for entrprise/Project/Visio)
4. Deploy software to Teams, On-Premises Security Groups (Ex. Everyone in the Engineering Team gets AutoCAD 2022)

## Create an App Registration

Navigate to: https://aad.portal.azure.com/

![](./.vuepress/images/2020-12-07-15-46-18.png)

![](./.vuepress/images/2020-12-07-15-47-07.png)

![](./.vuepress/images/2020-12-07-15-47-18.png)

## Grant Permissions

### Target devices in Azure Groups

If you would also like to target devices from your Azure groups, you will need to include the `Microsoft Graph - Devices.Read.All` permission.

See the screenshots below for the minimum permissions.

![](./.vuepress/images/2020-12-07-15-47-33.png)

![](./.vuepress/images/2020-12-07-15-47-40.png)

![](./.vuepress/images/2020-12-07-15-47-49.png)

![](./.vuepress/images/2020-12-07-15-47-52.png)

## Create Client Secret

![](./.vuepress/images/2021-08-16-13-19-15.png)

![](./.vuepress/images/2021-08-16-13-20-45.png)

![](./.vuepress/images/2021-08-16-13-23-26.png)

## Granular Delegated Admin Permissions (GDAP)
- Create a Security Group in Azure AD called "ImmyBot Security Group"
- Add the ImmyBot Service Principal to that group
- For each customer in the Partner Center, add the "ImmyBot Security Group" and add the "Directory readers" role.

## Add to Admin Agents Group (Legacy DAP)

![](./.vuepress/images/2020-12-07-15-48-22.png)

![](./.vuepress/images/2020-12-07-15-48-26.png)

![](./.vuepress/images/2020-12-07-15-48-31.png)

![](./.vuepress/images/2020-12-07-15-48-35.png)

![](./.vuepress/images/2020-12-07-15-48-38.png)

## Copy the `Application (client) ID` and `Client Secret Value` into the form in ImmyBot.
