# Users & Permissions

ImmyBot provides a comprehensive user management system with role-based access control. This page explains how to manage users and permissions in your ImmyBot environment.

## User Types

ImmyBot supports several types of users:

### Administrator Users

Administrators have full access to the ImmyBot platform, including:
- Managing tenants and organizations
- Creating and managing users
- Configuring system settings
- Accessing all features and functions

### Technician Users

Technicians have access to day-to-day operations, including:
- Managing computers
- Creating and running deployments
- Executing maintenance sessions
- Viewing reports and logs

### Tenant Users

Tenant users have limited access to their specific tenant, including:
- Viewing their tenant's computers
- Accessing the self-service portal
- Requesting software installations
- Viewing reports for their tenant

### Integration Users

Integration users are service accounts used for connecting to external systems:
- Limited to API access
- Used for RMM and PSA integrations
- Configured with specific permissions for integration functions

## User Roles

ImmyBot uses role-based access control to manage permissions:

### Built-in Roles

ImmyBot includes several built-in roles:

- **Global Administrator**: Full access to all features and functions
- **Tenant Administrator**: Full access to a specific tenant
- **Technician**: Access to manage computers and deployments
- **Read-Only**: View-only access to the system
- **Self-Service**: Limited access to the self-service portal

### Custom Roles

You can create custom roles with specific permissions:

1. Navigate to **Settings** > **Roles**
2. Click **Add Role**
3. Enter a name and description
4. Select the permissions to include
5. Click **Save**

## Permission Categories

Permissions in ImmyBot are organized into categories:

### Computer Management

- View computers
- Add computers
- Edit computers
- Delete computers
- Run maintenance sessions
- Access remote control

### Deployment Management

- View deployments
- Create deployments
- Edit deployments
- Delete deployments
- Approve recommended deployments

### Software Management

- View software library
- Add software
- Edit software
- Delete software
- Manage software versions

### User Management

- View users
- Add users
- Edit users
- Delete users
- Manage roles and permissions

### System Configuration

- View system settings
- Edit system settings
- Manage integrations
- View system logs
- Manage licenses

## Managing Users

### Adding Users

1. Navigate to **Settings** > **Users**
2. Click **Add User**
3. Enter the user's email address
4. Select a role
5. Assign to tenants if applicable
6. Click **Save**
7. The user will receive an email invitation

### Editing Users

1. Navigate to **Settings** > **Users**
2. Find the user in the list
3. Click **Edit**
4. Modify the user's details, role, or tenant assignments
5. Click **Save**

### Disabling Users

1. Navigate to **Settings** > **Users**
2. Find the user in the list
3. Click **Edit**
4. Toggle the **Enabled** switch to Off
5. Click **Save**

### Deleting Users

1. Navigate to **Settings** > **Users**
2. Find the user in the list
3. Click **Delete**
4. Confirm the deletion

## Tenant Access Control

### Assigning Users to Tenants

Users can be assigned to specific tenants:

1. Navigate to **Settings** > **Users**
2. Find the user in the list
3. Click **Edit**
4. In the **Tenant Access** section, select the tenants
5. Click **Save**

### Tenant-Specific Roles

Users can have different roles for different tenants:

1. Navigate to **Settings** > **Users**
2. Find the user in the list
3. Click **Edit**
4. In the **Tenant Access** section, select a tenant
5. Choose a role for that tenant
6. Click **Save**

## Best Practices

### User Management

- **Principle of Least Privilege**: Assign users only the permissions they need
- **Regular Audits**: Periodically review user accounts and permissions
- **Role Standardization**: Create standard roles for common job functions
- **Documentation**: Document your role definitions and permission assignments

### Security

- **Strong Passwords**: Enforce strong password policies
- **Multi-Factor Authentication**: Enable MFA for administrative accounts
- **Account Monitoring**: Monitor login attempts and account activity
- **Prompt Offboarding**: Disable accounts immediately when users leave

## Related Topics

- [Tenants & Organizations](./tenants-organizations)
- [Self-Service Portal](./self-service-portal)
- [Troubleshooting](./troubleshooting)
