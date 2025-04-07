# Tenants & Organizations

In ImmyBot, tenants and organizations form the foundation of your management structure. This page explains how these concepts work and how to use them effectively.

## Understanding the Hierarchy

ImmyBot uses a hierarchical structure to organize managed environments:

```
Organization
└── Tenant
    └── Child Tenant
        └── Computer
```

### Organizations

An organization is the top-level entity in ImmyBot. It represents your MSP or IT department. Each ImmyBot instance has one organization, which contains all your tenants, users, and resources.

### Tenants

Tenants represent your clients or business units. They are the primary way to segment your managed environment. Each tenant can have:

- Its own computers
- Dedicated users and permissions
- Specific deployments
- Custom settings and configurations

### Child Tenants

Tenants can have child tenants, allowing you to create a hierarchical structure. This is useful for:

- Representing client departments or locations
- Creating test environments within a client
- Segmenting large organizations into manageable units

## Tenant Management

### Creating Tenants

1. Navigate to **Settings** > **Tenants**
2. Click **Add Tenant**
3. Enter the tenant name and other details
4. Select a parent tenant if applicable
5. Click **Save**

### Tenant Settings

Each tenant can have specific settings, including:

- **Display Name**: The name shown in the ImmyBot interface
- **External ID**: Used for integration with other systems
- **Parent Tenant**: The tenant that this tenant belongs to
- **Tenant Type**: Categorization for the tenant (Client, Internal, etc.)
- **Contact Information**: Email, phone, and address details
- **Custom Fields**: Additional information specific to your needs

### Tenant Visibility

Resources in ImmyBot can have different visibility settings:

- **Tenant-specific**: Only visible to the tenant they belong to
- **Inherited**: Visible to the tenant and its child tenants
- **Global**: Visible to all tenants

## Organization Settings

Organization-wide settings affect all tenants and are managed by administrators:

- **User Management**: Creating and managing user accounts
- **Role Definitions**: Defining permissions for different user roles
- **Integration Configuration**: Setting up connections to external systems
- **Global Deployments**: Creating deployments that apply to all tenants
- **License Management**: Managing your ImmyBot license

## Best Practices

### Tenant Structure

- **Create a logical hierarchy**: Organize tenants in a way that reflects your business relationships
- **Limit hierarchy depth**: Keep your tenant structure to 2-3 levels for simplicity
- **Use consistent naming**: Adopt a naming convention for tenants and child tenants

### Resource Sharing

- **Use global resources** for common software and configurations
- **Create tenant-specific resources** for unique client requirements
- **Leverage inheritance** to share resources with child tenants

### Security and Separation

- **Assign appropriate permissions** to users based on their responsibilities
- **Use tenant-specific users** for client access
- **Limit cross-tenant visibility** to maintain client separation

## Related Topics

- [Users & Permissions](./users-permissions)
- [Deployments](./deployments)
- [Computer Onboarding](./onboarding)
