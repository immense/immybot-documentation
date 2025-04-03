# Adding Users

This guide explains how to add and manage users in ImmyBot, including different authentication methods and role assignments.

## User Authentication Methods

ImmyBot mandates authentication against Azure AD/Entra ID:

1. **Azure AD/Entra ID Integration**: Required for all ImmyBot installations
2. **Email Invitation**: Available for inviting users already in your Azure AD/Entra directory
3. **Self-Registration**: Allow users to request access (with admin approval)

## Adding Users via Self-Registration

The simplest way to add users is through self-registration:

1. Have the person navigate to your ImmyBot instance (e.g., `https://yourdomain.immy.bot`)
2. They will see a login screen where they can request access:

![User requesting access](https://user-images.githubusercontent.com/1424395/153074628-4a22c81a-177e-4ebb-9845-898ab0f95d88.jpeg)

3. As an administrator, you'll see a yellow notification indicator at the top of your screen
4. Click the notification to review and approve the access request:

![Approving access request](https://immybot.blob.core.windows.net/release-media/bb34184f-c7c3-41cf-9fa3-f6489e6c3600)

5. Select the appropriate role for the user (see [User Roles and Security](./user-roles.md) for details)
6. Click **Approve** to grant access

## Adding Users via Email Invitation

For more controlled user addition:

1. Navigate to **Settings** > **Users**
2. Click **Invite User**
3. Enter the user's email address
4. Select the appropriate role
5. (Optional) Assign the user to specific tenants
6. Click **Send Invitation**
7. The user will receive an email with instructions to complete registration

## Adding Users via Azure AD/Entra ID

Azure AD/Entra ID integration is mandatory for ImmyBot authentication:

1. Navigate to **Settings** > **Authentication** to configure your Azure AD/Entra integration
2. There are two ways to add users from Azure AD/Entra:
   - **Basic Consent Level**: You'll need to know the user's ID (GUID) to add them
   - **Recommended Consent Level**: Users can be added directly from the Persons page without knowing their GUID
3. To increase the consent level to recommended settings:
   - Navigate to **Settings** > **Authentication** > **Azure AD**
   - Click on **Increase Consent Level**
   - Follow the prompts to grant additional permissions
4. Users can now sign in with their Microsoft credentials
5. Assign appropriate roles to new users after they sign in

## Managing Existing Users

To manage existing users:

1. Navigate to **Settings** > **Users**
2. View the list of all users in your ImmyBot instance
3. Click on a user to edit their details:
   - Change their role
   - Adjust tenant access
   - Enable/disable account
   - Reset password

## Best Practices

Follow these best practices for user management:

1. **Principle of Least Privilege**: Assign the minimum necessary permissions
2. **Regular Audits**: Periodically review user accounts and permissions
3. **Offboarding Process**: Disable accounts promptly when users leave
4. **Role-Based Access**: Use roles to manage permissions consistently
5. **Documentation**: Maintain documentation of who has access and why

## Next Steps

After adding users, you might want to explore:

- [User Roles and Security](./user-roles.md) - Learn about user permissions and security
- [Tenant Management](./tenant-management.md) - Configure tenant access for users
- [Azure AD/Entra ID Integration](./azure-graph-permissions-setup.md) - Configure Azure AD/Entra permissions

---

**Next Steps:** [User Roles and Security →](./user-roles.md) | [Tenant Management →](./tenant-management.md)
