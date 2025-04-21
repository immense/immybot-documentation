# Adding Users

This guide explains how to add and manage users in ImmyBot.

## User Authentication Methods

ImmyBot uses Azure AD/Entra ID for authentication:

1. **Azure AD/Entra ID Integration**: Required for all ImmyBot installations
2. **Self-Registration**: Allow users to request access (with admin approval)

## Adding Users via Self-Registration

The only way to add users is through self-registration:

1. Have the person navigate to your ImmyBot instance (e.g., `https://yourdomain.immy.bot`)
2. They will see a login screen where they can request access:

![User requesting access](https://user-images.githubusercontent.com/1424395/153074628-4a22c81a-177e-4ebb-9845-898ab0f95d88.jpeg)

3. As an administrator, you'll see a yellow notification indicator at the top of your screen
4. Click the notification to review and approve the access request:

![Approving access request](https://immybot.blob.core.windows.net/release-media/bb34184f-c7c3-41cf-9fa3-f6489e6c3600)

5. Select the appropriate role for the user (see [User Roles and Security](./user-roles.md) for details)
6. Click **Approve** to grant access

## Managing Existing Users

To manage existing users:

1. Navigate to **Show more** > **Users**
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
