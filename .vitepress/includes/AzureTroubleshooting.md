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
