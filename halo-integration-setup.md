# HaloPSA

Setting up this integration allows you to
1. Deploy Software to machines covered by a certain contract type 
  - Example: Deploy Huntress to all customers with a Managed Security Contract
1. (Preferred) Deploy Software to machines covered by an Contract with a specific recurring invoice item
  - Example: Deploy SentinelOne to all computers that have SentinelOne on a recurring invoice as a recurring invoice item on their contract

## Create an ImmyBot Application under /config/integrations/api/applications 

- Under the details section, select the Client ID and Secret Authentication Method
- Generate and copy the Client ID and Client Secret
- The Login Type should be "Agent", and you should select an "Agent to log in as"

## Permissions:

- read:customers -> Yes
- read:contracts -> Yes
- read:items -> Yes
- edit:items -> Yes (*should not be needed > 2.99, API bug will not allow listing items without edit rights)
- read:invoices -> Yes
- read:software -> Yes
- read:assets -> Yes (*future feature of the integration will include asset population, not currently necessary)
- edit:assets -> Yes (*future feature of the integration will include asset population, not currently necessary)

## Plug in the Client ID and Client Secret in ImmyBot

Create a HaloPSA Integration Link and fill in the **Integration Settings**

![image](https://user-images.githubusercontent.com/18588314/184726437-c4398dec-1add-48c3-9443-88dc1b384c5b.png)
