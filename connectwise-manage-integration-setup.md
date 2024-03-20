# ConnectWise Manage

Setting up this integration allows you to
1. Deploy Software to machines covered by a certain agreement type
  - Example: Deploy Huntress to all customers with a Managed Security Agreement
1. (Preferred) Deploy Software to machines covered by an Agreement with a specific Addition
  - Example: Deploy SentinelOne to all computers that have SentinelOne as an Addition on their agreement

**If you use Automate, setup the Automate integration first and import your customers from there. Importing customers from Manage generally results in many unnecessary Tenants being created in ImmyBot. You can link Automate to Manage to leverage the existing mappings between Automate<->Manage instead of manually mapping your Manage customers**

## Create an ImmyBot Role with the following permissions

- *Company -> Company Maintenance -> Inquire Level (All)*
- *Finance -> Agreements -> Inquire Level (All)*
- *Procurement -> Product Catalog -> Inquire Level (All)*
- *Procurement -> Product -> Inquire Level (All)*
- *System -> API Reports -> Inquire Level (All)*

![](./.vitepress/images/2021-03-23-14-26-14.png)

![](./.vitepress/images/2022-02-23_15-00-31.png)

## Create an API Member

Go to *System -> Members* and create a new **API Member**

![](./.vitepress/images/2021-03-23-14-28-30.png)

Create a new API key

![](./.vitepress/images/2021-03-23-14-43-35.png)

## Plugin the API Keys in ImmyBot

Create a new PSA Link and fill in the **Provider Info**

![](./.vitepress/images/2021-03-23-14-44-05.png)

# CW Manage Pod v1

Setting up this integration allows you to Look up the contact's email address in Immy and shows you their computers (Immy does User Computer Affinity behind the scenes so you don't have to do it manually). Technicians can jump into their computers or push software via the ticket.

![image](https://github.com/immense/immybot-documentation/assets/95599350/c9b28636-c7d9-4f80-b850-780efefe6b4e)


Go to Show More -> Integrations

Add CW Manage Pod

Go to ConnectWise -> Setup Tables -> Manage Hosted API -> +

![image](https://github.com/immense/immybot-documentation/assets/1424395/88fade4c-0ee7-4b88-971e-34138929e4e3)

