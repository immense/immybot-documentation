# User Affinity

User Affinity is the relationship between users and computers in ImmyBot. This page explains how user affinity works and how it enables user-based targeting and personalization.

## Understanding User Affinity

User Affinity is the mechanism ImmyBot uses to determine which users are associated with which computers. This relationship is crucial for:

- Targeting deployments to computers based on user attributes
- Applying user-specific configurations
- Personalizing software installations
- Managing user-specific licenses

## How User Affinity Works

ImmyBot establishes user affinity through several methods:

### Primary User Detection

ImmyBot automatically detects the primary user of a computer by:

1. Running `whoami /upn` on the computer during inventory
2. Keeping a rolling list of the last 10 UPNs (User Principal Names) for each computer
3. Determining the most frequent user based on this history
4. Assigning that user as the Primary User of the computer

### Manual Assignment

Administrators can manually assign users to computers:

1. Navigate to the computer's details page
2. Click on the **Users** tab
3. Click **Edit Primary User**
4. Select the appropriate user
5. Click **Save**

### Azure AD Integration

If you have Azure AD integration enabled:

1. ImmyBot queries Azure AD for device ownership information
2. It maps Azure AD users to users in ImmyBot
3. It assigns device owners as Primary Users of the corresponding computers

## User Affinity in Targeting

User affinity enables several powerful targeting scenarios:

### User-Based Targeting

You can target deployments to computers based on their Primary User:

1. Create a deployment
2. Set the target to a specific user or user group
3. ImmyBot will apply the deployment to all computers where those users are the Primary User

### Azure AD Group Targeting

With Azure AD integration, you can target based on group membership:

1. Create a deployment
2. Set the target to an Azure AD group
3. ImmyBot will apply the deployment to all computers where the Primary User is a member of that group

### License-Based Targeting

You can use user affinity for license-based software deployment:

1. Create a deployment with a filter script that checks license assignment
2. The script can check if the Primary User has a license for the software
3. ImmyBot will only deploy the software to computers where the Primary User has a license

## User Profiles

User affinity also enables ImmyBot to work with user profiles:

### Profile Creation

ImmyBot can create user profiles during onboarding:

1. The "Create Profile for Primary Person" task creates a profile for the Primary User
2. This ensures that user-specific settings can be applied even if the user hasn't logged in yet

### User Context Scripts

With user affinity established, ImmyBot can run scripts in the user context:

1. Create a maintenance task with the "User" execution context
2. The task will run in the context of the Primary User
3. This allows configuring user-specific settings like default applications and browser preferences

## Best Practices

### User Management

- **Keep User Information Updated**: Ensure user information is accurate and up-to-date
- **Review Primary User Assignments**: Periodically review and update Primary User assignments
- **Document Special Cases**: Document any manual Primary User assignments and their reasons

### Targeting Efficiency

- **Use User Groups**: Group users by role or department for efficient targeting
- **Combine with Computer Targeting**: Use both user and computer attributes for precise targeting
- **Test User Resolution**: Verify that user-based targets resolve to the expected computers

### Security Considerations

- **Principle of Least Privilege**: Only assign users the minimum required software and configurations
- **User Offboarding**: Update user affinity when users leave the organization
- **Audit User Changes**: Regularly review who can modify user affinity and what changes have been made

## Troubleshooting

### Common Issues

- **Missing User Affinity**: If a computer doesn't have a Primary User, check if inventory is running correctly
- **Incorrect User Assignment**: If the wrong user is assigned, check the login history or manually assign the correct user
- **User Not Found**: If a user can't be found, ensure they exist in ImmyBot and have the correct UPN

### Debugging Tips

- **Check Inventory Logs**: Review inventory logs to see which UPNs have been detected
- **Verify Azure AD Sync**: If using Azure AD integration, verify that the sync is working correctly
- **Test User Context**: Test user context scripts to ensure they run in the correct user profile

## Related Topics

- [Targets & Targeting](./targets-targeting)
- [Deployments](./deployments)
- [Azure AD Integration](./azure-ad-integration)
- [Users & Permissions](./users-permissions)
