# Configure Directory

## Overview
This document will go over setting up, using, and troubleshooting the task Configure Directory.

Configure Directory is a combination of `Set Computer Name and Domain Join` and `AzureAD Join`. We utilize the access that ImmyBot has to determine if you're tenants are using Active Directory, or AzureAD. Similar to Set Computer Name and Domain Join, you have the choice of joining a domain at all.

This task is intended to replace Join AzureAD and Set Computer Name and Domain Join. If you're trying to add a computer to a domain, change the name, etc, utilize this task.

## Deployment Planning
You can set up a Cross Tenant deployment for local Active Directory joins, the task will automatically utilize the Domain Controller in the tenant. If you plan on doing any AzureAD Joining, you will need to set up a single tenant deployment per tenant.

If you only want to maintain a naming convention, just set DirectoryType to None, and set up your naming convention.

## Prerequisites
An active ImmyBot subscription or [trial](https://www.immy.bot/pricing/)

Permissions to configure Deployments

You will need to set up a DEM user for each of your tenants if you're planning on joining to AzureAD

If you're using Enhanced AzureAD Join, you need to set up automatic [Intune Enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/quickstart-setup-auto-enrollment)

If you're using local Active Directory, you will need Domain Controllers with the permanent agent installed.



### DEM User Creation

::: info
You only need to create DEM users if you're adding these computers to Azure.
:::

AzureAD/Entra Join DEM User Instructions
1. Create a DEM (Device Enrollment Manager) user in the Customer's Azure AD (Ex. dem@contoso.com)
2. Assign the DEM user an Intune license (Intune Plan 1 is fine)
3. Do NOT make the user a Global Admin (You shouldn't be bypassing MFA for Global Admins)
4. Go to Roles and administrators and assign the Cloud Device Administrator or Cloud PC Administrator role
5. Go to Device Enrollment Managers and make the user a Device Enrollment Manager
6. Go to MFA Enrollment Settings and verify Require Multi-Factor Authentication to register or join devices with Azure AD is set to "No"
7. MANUALLY LOGON AS THE USER AN INCOGNITO WINDOW
   - Verify a password change is not required
8. Verify the user is not being prompted for MFA or MFA Registration

## Parameters

| Name                          | Description                                                                                                                | Recommendation                                                                                       |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| PrimaryPerson                 | This will be used to determine what software to install based on licensing in 365 and the groups the user is in.           | For Cross Tenant Deployments, leave default                                                          |
| Directory Type                | Choose is this is a local Active Directory, Azure Active Directory, or if you don't want this deployment to join a domain. | For Cross tenant Deployments, leave default                                                          |
| ComputerNameTemplate          | The templated computer naming scheme for your tenants. Supports tokens, more information below                             | For Cross Tenant Deployments, utilize Tenant Slug where possible.                                    |
| Username Template             |                                                                                                                            | Leave default                                                                                        |
| PreferredDomainControllerName | If you would like to specify a specific domain controller to use, configure that here                                      | Leave default                                                                                        |
| CacheProvisioningPackage      |                                                                                                                            | Set to True                                                                                          |
| SkipRegistryTest              | Skips registry validation and modification steps required for Azure AD Join.                                               | Use this if registry settings are confirmed correct or for testing purposes, otherwise leave default |
| ClearExistingEnrollments      | Set this to clear all existing enrollments before joining (including User/Workplace Joins).                                | Leave Default                                                                                        |
| UseEnhancedAzureADJoin        | Use certificate based Azure AD join instead of PPKG. Needs Automtic Intune Enrollment set up                               | Set up and enable                                                                                    |

### Computer Name Template

Supported Tokens:
| Token            | Example                                                        |
| ---------------- | -------------------------------------------------------------- |
| $TenantSlug      | ABC (Specified under Tenant -> Edit)                           |
| $FirstInitial    | J                                                              |
| $FirstName       | John                                                           |
| $LastName        | Doe                                                            |
| $LastInitial     | D                                                              |
| $Manufacturer    | Dell, Lenovo, etc                                              |
| $SerialNumber    | Service Tag on Dell Devices, otherwise serial number on device |
| $FormFactorShort | PC/LPTP/SFC/VM                                                 |
| $FormFactorLong  | DESKTOP/LAPTOP/ SURFACE/VIRTUAL                                |
| $Year            | Current Year, 2025                                             |
| $YearShort       | Current Year, 25                                               |
| $AssetTag        | Enter manually                                                 |
| #                | 1                                                              |
| ##               | 01                                                             |
| ###              | 001                                                            |

### Examples

$TenantSlug-$FormFactorShort-### -> `ABC-PC-001`

$TenantSlug-$FirstInitial$LastName -> `ABC-JDOE`

$SerialNumber-$Year-### -> `ABC123-2025-001`

## Troubleshooting


<!--@include: @/.vitepress/includes/AzureTroubleshooting.md-->


<br><br><br>
>[!NOTE] Document information
>Author:
<br>
>Date Published:
><br>
>Date Revised:
><br>
>Version Number:

