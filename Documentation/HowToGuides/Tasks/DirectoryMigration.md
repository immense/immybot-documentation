# Directory Migration

## Overview
The Directory Migration Task is intended to move computers from one IDP to another. This will simplify your projects to move computers from Active Directory to Azure AD, or Workgroup to Active Directory, etc. You can find a compatibility matrix below. The task will also migrate the user profiles so that they can get back to work as soon as the migration is complete.


## Prerequisites

An active ImmyBot subscription or [trial](https://www.immy.bot/pricing/)

- Admin access to your Microsoft Tenant.
- Computers that are migrating cannot be Windows Home.
- [Custom Azure Permissions](/Documentation/Integrations/azure-custom-application-permissions) are set up and established for the tenant.
- If you're using Enhanced AzureAD Join, you need to set up automatic [Intune Enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/quickstart-setup-auto-enrollment)
- Do not have folder redirection set up to a server via GPO.
- Ensure that all available updates are applied to the computer(s).



## Parameters
| Parameter                              | Description                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DestinationDirectoryType**           |                                                                                                                                                                                                                                                                                                                                                   |
| **ProfileTypesToMigrate**              | For each profile on a machine, ImmyBot gets the SID of the associated user, and determines if that SID is Local, ActiveDirectory, or AzureAD. ImmyBot will not attempt to migrate the machine if it can't find a target account in the destination directory for every profile. You can avoid this by limiting the profiles using this parameter. |
| **Workgroup Migrations**               | Use this if the computer(s) are in a workgroup. This will allow us to convert generic profiles into named profiles. (e.g., C:\Users\JFrontDesk actually belongs to jane.doe@company.com)                                                                                                                                                          |
| **ProfileNamesToAvoid**                | Use this to avoid migrating profiles that don't have a matching identity in the target AzureAD. (Like local admin accounts). Does a case insensitive "Contains" search. For example, C:\Users\ITAdmin would be excluded if you enter ITAdmin or admin.                                                                                            |
| **FuzzyMatch**                         | Enable this to allow Immy to find usernames in the target directory based on profile foldername                                                                                                                                                                                                                                                   |
| **IgnoreProfilesWithoutMatchingUsers** | Not recommended. This will suppress errors when Immy can't find a user to map a profile to.                                                                                                                                                                                                                                                       |
| **SkipDomainControllerLookup**         | Use this in a hostile takeover situation where you are unable to install an agent on the domain controller. The domain controller is used to verify that user is active and still exists (to prevent trying to map profiles to users for employees that are no longer with the company)                                                           |
| **LimitToPrimaryUser**                 | This only works in Hybrid Joined environments! We ask Azure AD for the OnPremiseSecurityIdentifier of the primary user. Then we only migrate the profile associated to that user. This is useful if you don't want to have to exclude all profiles that can't be mapped.                                                                          |
| **OAuthInfo**                          | Login using a device enrollment manager account in the target tenant                                                                                                                                                                                                                                                                              |
| **CacheProvisioningPackage**           |                                                                                                                                                                                                                                                                                                                                                   |
| **SkipRegistryTest**                   | Skips registry validation and modification steps required for Azure AD Join. When not specified, the script performs checks for Azure AD Join-related registry settings, diagnoses potential issues with DSRegCmd and Intune enrollment states, and removes conflicting MDM policy enrollments.                                                   |
| **ClearExistingEnrollments**           | Set this to clear all existing enrollments before joining (including User/Workplace Joins).                                                                                                                                                                                                                                                       |
| **UseEnhancedAzureADJoin**             | Use certificate-based Azure AD Join instead of PPKG (BETA). Important: Test thoroughly before production use. Limitations: The following parameters are not supported with this option: • RequireInternetEnrollment • CacheProvisioningPackage                                                                                                    |

## Supported Migrations

| Source ↓ Destination -> | Workgroup   | AzureAD     | Active Directory |
| ----------------------- | ----------- | ----------- | ---------------- |
| Workgroup               | Unsupported | Supported   | Supported        |
| AzureAD                 | Unsupported | Unsupported | Supported        |
| Active Directory        | Unsupported | Supported   | Supported        |

## Troubleshooting



## Azure Specific Issues

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
