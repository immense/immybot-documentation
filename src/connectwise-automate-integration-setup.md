# ConnectWise Automate

Setting up this integration allows you to
1. Import customers from Automate
2. Import computers from Automate
3. Manage all computers in Automate without deploying the ImmyBot Agent
4. Map customers from Manage to ImmyBot tenant based on existing Automate<->Manage relationship

## Create ImmyBot Role
ImmyBot requires the following permissions in Automate

- Core
  - Clients.Read
  - Clients.Show All
  - Computers.Show All
  - Groups.Show All
  - Locations.Show All
  - Patch Manager.Read (Required if you want Immy to apply approved Windows Updates)
  
![](./.vuepress/images/2021-03-23-15-18-39.png)

![Immy-CWA-User Class Manager-Permissions](https://user-images.githubusercontent.com/5932122/187803601-f2d49a3a-11cc-46b9-8aa2-b7ea1123902e.png)


## Create ImmyBot User
![](./.vuepress/images/2021-03-23-16-14-24.png)

![](./.vuepress/images/2021-03-23-16-19-01.png)

![](./.vuepress/images/2021-03-23-16-30-41.png)

## Enable Google MFA for ImmyBot User

![](./.vuepress/images/2021-03-23-18-35-49.png)

![](./.vuepress/images/2021-03-23-18-35-28.png)

![](./.vuepress/images/2021-03-23-18-39-00.png)

## Add RMM Link for CW Automate

![image](https://user-images.githubusercontent.com/1424395/156473997-68337c8f-4c50-4f94-b197-f62218a8276c.png)

![](./.vuepress/images/2021-03-23-18-59-10.png)

![](./.vuepress/images/2021-03-23-19-00-04.png)

![](./.vuepress/images/2021-03-23-18-59-44.png)

## Import your customers

![](./.vuepress/images/2021-03-23-18-57-19.png)

![](./.vuepress/images/2021-03-23-19-01-36.png)

Alternatively, you can create/map only certain customers.

When you map a customer from an RMM, the computers will undergo Identification

![](./.vuepress/images/2021-03-23-19-03-33.png)

![](./.vuepress/images/2021-03-23-19-06-55.png)

![](./.vuepress/images/2021-03-23-19-08-30.png)
