# Creating & Managing Users

::: warning
 We require all users to be authenticated through Azure. No personal accounts can be used. No "Local ImmyBot" accounts are possible
:::

This guide explains how to add and manage users in ImmyBot.

## User Authentication Methods

ImmyBot uses Azure AD/Entra ID for authentication:

1. **Azure AD/Entra ID Integration**: Required for all ImmyBot instances
2. **Self-Registration**: Allow users to request access (with admin approval)

## Adding Users via Self-Registration

Self-registration is one way to add users to ImmyBot:

1. Have the person navigate to your ImmyBot instance (e.g., `https://yourdomain.immy.bot`)
2. They will see a login screen where they can request access:

![User requesting access](/Documentation/HowToGuides/Request-Access.png))

3. As an administrator, you'll see a yellow notification indicator at the top of your screen
4. Click the notification to review and approve the access request:

![Approving access request](/Documentation/HowToGuides/Approve-Access.png)

5. Select the appropriate role for the user (see [User Roles and Security](/Documentation/Administration/user-roles.md) for details)
6. Click **Grant Access** to approve their access

## Managing People and Users

In ImmyBot, there's an important distinction:
- **People** are added to the system first (either through self-registration or Azure AD).  People correspond to users you can select as the primary user of computers being deployed and are largely populated by syncing users from Azure/Microsoft Partner Center. This sync happens roughly ever hour.
- These people are then assigned as **users** with specific roles and permissions to allow them to login to your ImmyBot instance.

To manage people:

1. Navigate to **Show more** > **People**
2. View the list of all People in your ImmyBot instance.
3. Click on the Edit person link to edit their details:
   - Tags can be assigned to the person here
   - Any other changes to the details here will be overwritten by the Azure sync.

>**Tip** If you need to force a sync for Azure people, you can do so per tenant by going to **Tenants** > Select the tenant to sync > Go to the Azure tab and click **Sync Azure Details**

To manage Users:
1. Navigate to **Show More** > **Users**
2. View the list of all Users in your ImmyBot instance.
3. Click on the Edit User link to edit their details:
   - Set an Access Expiration
   - Adjust current roles and permissions
   - If enabled, you can also Impersonate the user to see what they see.  The Audit trail will reflect the session is impersonated and by whom.

## Best Practices

Follow these best practices for user management:

1. **Principle of Least Privilege**: Assign the minimum necessary permissions
2. **Regular Audits**: Periodically review user accounts and permissions
3. **Offboarding Process**: Disable accounts promptly when users leave
4. **Role-Based Access**: Use roles to manage permissions consistently
5. **Documentation**: Maintain documentation of who has access and why

## Next Steps

After adding users, you might want to explore:

- [User Roles and Security](/Documentation/Administration/user-roles.md) - Learn about user permissions and security
- [Tenant Management](/Documentation/Administration/tenant-management.md) - Configure tenant access for users
- [Azure AD/Entra ID Integration](/Documentation/Integrations/azure-graph-permissions-setup.md) - Configure Azure AD/Entra permissions
