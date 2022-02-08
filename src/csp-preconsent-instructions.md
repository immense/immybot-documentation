# AzureAD/365 Integration

Enabling this allows ImmyBot to
1. Sync all users from your partner tenant
2. Sync all users from your customer's tenants
3. Install the 365 applications a user is licensed for (Apps for business/Apps for entrprise/Project/Visio)
4. Deploy software to Teams, On-Premises Security Groups (Ex. Everyone in the Engineering Team gets AutoCAD 2022)

## 1. Create an App Registration

Navigate to: https://aad.portal.azure.com/

![](./.vuepress/images/2020-12-07-15-46-18.png)

![](./.vuepress/images/2020-12-07-15-47-07.png)

![](./.vuepress/images/2020-12-07-15-47-18.png)

## 2. Grant Permissions

![](./.vuepress/images/2020-12-07-15-47-33.png)

![](./.vuepress/images/2020-12-07-15-47-40.png)

![](./.vuepress/images/2020-12-07-15-47-49.png)

![](./.vuepress/images/2020-12-07-15-47-52.png)

## 3. Create Client Secret

![](./.vuepress/images/2021-08-16-13-19-15.png)

![](./.vuepress/images/2021-08-16-13-20-45.png)

![](./.vuepress/images/2021-08-16-13-23-26.png)

## 4. Add to Admin Agents Group

![](./.vuepress/images/2020-12-07-15-48-22.png)

![](./.vuepress/images/2020-12-07-15-48-26.png)

![](./.vuepress/images/2020-12-07-15-48-31.png)

![](./.vuepress/images/2020-12-07-15-48-35.png)

![](./.vuepress/images/2020-12-07-15-48-38.png)


## 5. Copy the `Application (client) ID` and `Client Secret Value` into the form in ImmyBot.
