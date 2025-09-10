# Azure GDAP Customer Management

## Overview
To sync users from GDAP customers of your Azure Partner, permission must be granted in the customer
tenants to Immy's app registration (_Default_ or _Custom_). This can be achieved either by clicking
on the `Consent` button for each customer individually ("Manual consent") or by using the
Pre-consent button ("Pre-consent").

## Manual Consent

This can be done by clicking on the `Consent` or `Reconsent` button for the customer on either the
Azure Settings page or ont he Azure tab of the ImmyBot tenat linked to the customer.

**NB: When manually consenting to an Azure customer, you must authenticate using an administrator account from that customer!**

## Pre-Consent

Immy can automatically grant consent to your GDAP customers using the Partner Center API, removing
the need to consent to each customer individually. To do this, you must authenticate to the Partner
Center API with a user in the partner tenant that meets these requirements:
1. Is a member of the `AdminAgents` security group
2. Is given the `Application administrator` and `Privileged role administrator` Entra roles at the customer through the GDAP relationship

### Example: GDAP Role Assignments

Here is an example GDAP relationship configuration that will work with Immy's pre-consent functionality:

1. Create security group in the partner tenant named `Application Administrators`
2. Create security group in the partner tenant named `Privileged Role Administrators`
3. Assign the `Application administrator` Entra role to the `Application Administrators` security group on the customer's admin relationship
4. Assign the `Privileged role administrator` Entra role to the `Privileged Role Administrators` security group on the customer's admin relationship
5. Add the partner user that you wish to sign-in to the Partner Center API with to  `AdminAgents`, `Application Administrators` and `Privileged Role Administrators` security groups

For more information, see these Azure docs:
- [Obtain permissions to manage customer](https://learn.microsoft.com/en-us/partner-center/gdap-obtain-admin-permissions-to-manage-customer)
- [Assign Microsoft Entra roles](https://learn.microsoft.com/en-us/partner-center/gdap-assign-microsoft-entra-roles)
