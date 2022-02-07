# ConnectWise Automate Integration

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
  - Locations.Show All
  - Patch Manager.Read (Required if you want Immy to apply approved Windows Updates)
  
![](../.vuepress/images/2021-03-23-15-18-39.png)

![](../.vuepress/images/2021-03-23-15-19-31.png)

## Create ImmyBot User
![](../.vuepress/images/2021-03-23-16-14-24.png)

![](../.vuepress/images/2021-03-23-16-19-01.png)

![](../.vuepress/images/2021-03-23-16-30-41.png)

## Enable Google MFA for ImmyBot User

![](../.vuepress/images/2021-03-23-18-35-49.png)

![](../.vuepress/images/2021-03-23-18-35-28.png)

![](../.vuepress/images/2021-03-23-18-39-00.png)

## Add RMM Link for CW Automate

![](../.vuepress/images/2021-03-23-15-05-59.png)

![](../.vuepress/images/2021-03-23-18-59-10.png)

![](../.vuepress/images/2021-03-23-19-00-04.png)

![](../.vuepress/images/2021-03-23-18-59-44.png)

## Import your customers

![](../.vuepress/images/2021-03-23-18-57-19.png)

![](../.vuepress/images/2021-03-23-19-01-36.png)

Alternatively, you can create/map only certain customers.

When you map a customer from an RMM, the computers will undergo Identification

![](../.vuepress/images/2021-03-23-19-03-33.png)

![](../.vuepress/images/2021-03-23-19-06-55.png)

![](../.vuepress/images/2021-03-23-19-08-30.png)
