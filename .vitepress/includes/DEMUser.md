### DEM User Creation

::: info
You only need to create DEM users if you're adding these computers to Azure.
:::

AzureAD/Entra Join DEM User Instructions
1. Create a DEM (Device Enrollment Manager) user in the Customer's Azure AD (Ex. dem@contoso.com)
2. Assign the DEM user an Intune license (Intune Plan 1 is fine)
3. Do NOT make the user a Global Admin (You shouldn't be bypassing MFA for Global Admins)
4. Go to [Roles and administrators](https://portal.azure.com/#view/Microsoft_AAD_IAM/RolesManagementMenuBlade/~/AllRoles/adminUnitObjectId//resourceScope/%2F) and assign the Cloud Device Administrator or Cloud PC Administrator role
5. Go to [Device Enrollment Managers](https://intune.microsoft.com/#view/Microsoft_Intune_DeviceSettings/DevicesEnrollmentMenu/~/enrollmentManagers) and make the user a Device Enrollment Manager
6. Go to [MFA Enrollment](https://portal.azure.com/#view/Microsoft_AAD_Devices/DevicesMenuBlade/~/DeviceSettings/menuId/) Settings and verify Require Multi-Factor Authentication to register or join devices with Azure AD is set to "No"
7. MANUALLY LOGON AS THE USER AN INCOGNITO WINDOW
   - Verify a password change is not required
8. Verify the user is not being prompted for MFA or MFA Registration