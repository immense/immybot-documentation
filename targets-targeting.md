# Target

A "Target" is a grouping of computers (or Tenants in the case of "Cloud Tasks")

ImmyBot's ability to resolve Targets to a group of computers is perhaps its most powerful feature.

For example, you can select a Group of users from AzureAD (which includes on-prem synced groups, and Teams) and ImmyBot will automatically resolve that to the list of computers in use by the people in that group.

If you enable PSA integration, a Target could be all computers covered under a certain type of Agreement, or computers covered by an Agreement that includes a certain product.

This is particularly useful for security software, help desk portals, or anything else in your stack that you may only want to be installed for customers that are paying you for it.

## Offboarding
Conversely, you could create Deployments that remove your stack for customers you are offboarding.

Create an "Offboarding" product in your PSA
Create a deployment for each of the pieces of software you would like removed setting the desired state to Uninstalled
Target all customers with the "Offboarding" product on their agreement
Note: ImmyBot even honors the date range on additions, making scheduled offboarding easier if say the customer wants your software removed on the last day of the month.