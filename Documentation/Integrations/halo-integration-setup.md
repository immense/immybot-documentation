# HaloPSA

Setting up this integration allows you to
1. Deploy Software to machines covered by a certain contract type
  - Example: Deploy Huntress to all customers with a Managed Security Contract
1. (Preferred) Deploy Software to machines covered by an Contract with a specific recurring invoice item
  - Example: Deploy SentinelOne to all computers that have SentinelOne on a recurring invoice as a recurring invoice item on their contract

## Create an ImmyBot Application under /config/integrations/api/applications

- Under the details section, select the Client ID and Secret Authentication Method
- Generate and copy the Client ID and Client Secret
- The API will need to have the API permissions below.
- The Login Type should be "Agent", and you should select an "Agent to log in as"
- When selecting the "Agent to log in as" be sure it has the Agent permissions below.

## Agent Permissions:
The agent user must be part of a the Team used for support and have the following permissions either from a Role or directly applied.

### Feature Access Permissions
| Permission                      | Value           |
| ------------------------------- | --------------- |
| Tickets Access Level            | Read Only       |
| Clients Access Level            | Read Only       |
| Users Access Level              | Read Only       |
| CRM Access Level                | Read Only       |
| Assets Access Level             | Read and Modify |
| Suppliers Access Level          | Read Only       |
| Items Access Level              | Read Only       |
| Sales Access Level              | Read Only       |
| Quotations Access Level         | Read Only       |
| Sales Orders Access Level       | Read Only       |
| Purchase Orders Access Level    | Read Only       |
| Billing Details Access Level    | Read Only       |
| Invoices Access Level           | Read Only       |
| Reporting Access Level          | Read and Modify |
| Client Contracts Access Level   | Read Only       |
| Supplier Contracts Access Level | Read Only       |

### Tickets Permissions
| Permission                                         | Value |
| -------------------------------------------------- | ----- |
| Can view Unassigned Tickets                        | Yes   |
| Can view Tickets that are assigned to other Agents | Yes   |
| Can export tickets                                 | Yes   |

### Billing Permissions
| Permission           | Value     |
| -------------------- | --------- |
| Can View Item Costs  | Read Only |
| Can View Item Prices | Read Only |
| Can View Item SKU    | Read Only |

## API Permissions:

| Permission     | Value | Notes                                                                                      |
| -------------- | ----- | ------------------------------------------------------------------------------------------ |
| read:customers | Yes   |                                                                                            |
| read:contracts | Yes   |                                                                                            |
| read:items     | Yes   |                                                                                            |
| edit:reporting | Yes   |                                                                                            |
| edit:items     | Yes   | *Should not be needed > 2.99, API bug will not allow listing items without edit rights*    |
| read:invoices  | Yes   |                                                                                            |
| read:software  | Yes   |                                                                                            |
| read:tickets   | Yes   | Required for the **Technician Tools** feature                                              |
| read:assets    | Yes   | *Future feature of the integration will include asset population, not currently necessary* |
| edit:assets    | Yes   | *Future feature of the integration will include asset population, not currently necessary* |

## Plug in the Client ID and Client Secret in ImmyBot

Create a HaloPSA Integration Link and fill in the **Integration Settings**

![image](https://user-images.githubusercontent.com/18588314/184726437-c4398dec-1add-48c3-9443-88dc1b384c5b.png)


## Embedded Ticket Tab
HaloPSA version 2.125.5, introduced a new feature called Custom Tabs. You can configure these Custom Tabs to point to a web address, similar to an iframe.

Within HaloPSA, configure the tab as follows:

![image](https://github.com/immense/immybot-documentation/assets/16939160/c851198c-60fb-4eb6-b9c8-36ce4bf6fd6c)

This tab will then show on all tickets in the system, like this:

![image](https://github.com/immense/immybot-documentation/assets/16939160/f4aaf5f2-08bf-4d56-b313-eeea62e21051)

## Technician Tools

[What is Technician Tools?](/Documentation/Reference/terminology.html#technician-tools)

HaloPSA version 2.125.5 introduced a new feature called Custom Tabs. You can configure these Custom Tabs to point to a web address that is rendered as an iframe.

Within HaloPSA, configure the tab as follows:

![alt text](/image-10.png)

Copy the url template:

```https://<your-domain>.immy.bot/technician-pod/psa/<halo-integration-id>/ticket/$FAULTID```

The URL is specific to your instance.  You'll need to replace `<your-domain>` with your domain and `<halo-integration-id>` with your halo integration id. This id can be found here:

![alt text](/image-2.png)

After you setup the tab, navigate to a ticket and select the tab with the name you just created. It should load the technician tools page of immy.bot.

