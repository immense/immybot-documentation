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

You will need to set up a DEM user for each of your tenants if you're planning on joining to AzureAD.

If you need to add the computers to AzureAD, you need to set up automatic [Intune Enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/quickstart-setup-auto-enrollment)

If you're using local Active Directory, you will need Domain Controllers with the permanent agent installed.


<!--@include: @/.vitepress/includes/DEMUser.md-->



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
| UseEnhancedAzureADJoin        | Use certificate based Azure AD join instead of PPKG.                                                                       | Set up and enable                                                                                    |

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
>Author: Mark Gomez and Brandon Ritchey
<br>
>Date Published: 11/14/2025
><br>
>Date Revised: N/A
><br>
>Version Number: 1.0

