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
### Join Issues

#### MFA Prohibiting AAD Joins (0xCAA2000C):
If your conditional access policies require MFA for all users, adjust the settings as follows:

1. Exclude 'Microsoft Intune Enrollment' from the Cloud Apps requiring MFA.

2. In Azure AD, create a Dynamic Security Group named 'Provisioning Packages'.
   Set its Dynamic Membership Rule to: user.userPrincipalName -startsWith "package_"

3. Ensure that this 'Provisioning Packages' group is excluded from the MFA requirement.

#### Azure SyncFabric App
This cloud app needs to exist for the task to run properly. Many new environments do not have the app when they are created, so you will need to create them. Microsoft has also been known to occasionally remove the app from tenants that already have it.

To add the cloud app to the desired tenant, run the following script:
```powershell
#Install-Module AzureAD #Uncomment this if you do not already have the AzureAD module installed
Import-Module AzureAD
Connect-AzureAd -TenantId contoso.com # Login as Global admin in customer tenant
New-AzureADServicePrincipal -AppId 00000014-0000-0000-c000-000000000000
```

>:warning: WARNING
> Replace the "contoso.com" domain with the one corresponding to your desired tenant.

Alternatively, there is a cloud task that can add Azure SyncFabric back to the tenant. It may require a custom app registration, though.

#### Known Error Codes

#### 0xCAA10059
The account (DEM) you are using to enroll the device does not have permissions to join devices to Azure AD.
Add the account to 'Selected Users' or enable 'Allow All' users to join devices at:

[Microsoft Entra ID - Device Settings](https://aad.portal.azure.com/#view/Microsoft_AAD_Devices/DevicesMenuBlade/~/DeviceSettings)

#### 0xCAA50021
The AAD Broker Plugin has been reset by us. You'll need to re-run the task if you see this.

#### 0x8018000A
The device is already enrolled by a user. Re-run with 'ClearExistingEnrollments' set to 'True'.

#### 0x801C0024
The package_ AAD user associated with the PPKG was not found. Please run again with 'CacheProvisioningPackage' set to 'False' to generate a new package and user. This one shouldn't be an issue anymore, since we implemented retries that will generate a new package user if we are unable to create a token on the first try.

#### 0x800700B7
The provisioning package already exists. This may happen if you have executed the provisioning package earlier on this machine.

#### AADSTS90092 or AADSTS90202

This tenant is missing the Microsoft.Graph.SyncFabric app (Microsoft stopped including it at some point in life)

Refer to [Azure SyncFabric App](https://community.immy.bot/t/everything-we-know-of-that-can-go-wrong-with-azuread/2669#p-5196-azure-syncfabric-app-5)

#### AADSTS240005

To correct this, navigate to [Intune - Roles](https://aka.ms/in/#view/Microsoft_Intune_DeviceSettings/RolesLandingMenuBlade/~/roles)

Assign the Cloud Device Administrator or Cloud PC Administrator role to the DEM account you are using and try again.

#### AADSTS50126

The credentials are invalid OR the user has not been excluded from your Registration Campaign

[Microsoft Entra Admin Center - Registration Campaign](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/AuthenticationMethodsMenuBlade/~/RegistrationCampaign/fromNav/Identity)

#### AADSTS50055

Reset the user's password via [Microsoft Admin Center](https://admin.microsoft.com)

#### AADSTS240003

This issue might be related to Multi-Factor Authentication (MFA) being enabled for $Username.

It's recommended to disable MFA for this account or consider using OAuth for a more secure authentication method.

#### AADSTS90002

This error can typically be resolved by using the OAuth flow instead of the username/password flow.

#### Registered Application Issues

- I'll come by and update this with more later, but for now just make sure that if you modify permissions on the app, it requires reconsenting in ImmyBot.
### Creating a DEM (Device Enrollment Manager)
1. Create a service account in Intune
2. Apply an Intune User license to the account
3. Apply the Cloud Device Administrator role to the account
4. Go to [Microsoft Intune Admin Center - Devices](https://intune.microsoft.com/#view/Microsoft_Intune_DeviceSettings/DevicesMenu/~/enrollment) under the "Device Enrollment Managers" tab and add the account
5. MFA exclusions and enrollment policies may need to be adjusted to fit your use-case (as mentioned above)

::: danger Do not use a Global Administrator
From a security standpoint, we do NOT recommend using a global admin or existing user as a DEM.
:::


<br><br><br>
>[!NOTE] Document information
>Author:
<br>
>Date Published:
><br>
>Date Revised:
><br>
>Version Number:

