# ConnectWise Manage Integration

Setting up this agreement allows you to
1. Deploy Software to machines covered by a certain agreement type (Deploy Huntress to all customers with a Managed Security Agreement)
2. (Preferred) Deploy Software to machines covered by an Agreement with a specific Addition (Deploy SentinelOne to all computers that have SentinelOne as an Addition on their agreement)

Follow this guide to setup ConnectWise Manage as a PSA Link.

## Create an ImmyBot Role with the following permissions

- *Company -> Company Maintenance -> Inquire Level (All)*
- *Finance -> Agreements -> Inquire Level (All)*
- *Procurement -> Product Catalog -> Inquire Level (All)*
- *Procurement -> Product -> Inquire Level (All)*
- *System -> API Reports -> Inquire Level (All)*

![](../.vuepress/images/2021-03-23-14-26-14.png)

![](../.vuepress/images/manage-sc.png)

## Create an API Member

Go to *System -> Members* and create a new **API Member**

![](../.vuepress/images/2021-03-23-14-28-30.png)

Create a new API key

![](../.vuepress/images/2021-03-23-14-43-35.png)

## Plugin the API Keys in ImmyBot

Create a new PSA Link and fill in the **Provider Info**

![](../.vuepress/images/2021-03-23-14-44-05.png)
