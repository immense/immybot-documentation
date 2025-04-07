# Targets & Targeting

Targeting is one of ImmyBot's most powerful features, allowing you to specify which computers, users, or tenants should receive specific deployments. This page explains how targeting works and how to use it effectively.

## What is a Target?

A "Target" is a grouping of computers (or tenants in the case of "Cloud Tasks") that a deployment applies to. ImmyBot's ability to resolve targets to a group of computers enables sophisticated deployment scenarios.

## Target Types

ImmyBot supports several types of targets:

### Computer Targets

- **Individual Computers**: Target specific computers by name or ID
- **Computer Tags**: Target computers with specific tags
- **Computer Types**: Target computers based on their type (workstation, server, etc.)
- **Computer Manufacturers**: Target computers from specific manufacturers
- **Computer Models**: Target computers of specific models

### User Targets

- **Individual Users**: Target computers used by specific people
- **User Groups**: Target computers used by members of specific groups
- **Azure AD Groups**: Target computers used by members of Azure AD groups
- **Teams**: Target computers used by members of Microsoft Teams

### Tenant Targets

- **Individual Tenants**: Target all computers in a specific tenant
- **Tenant Tags**: Target all computers in tenants with specific tags
- **Tenant Types**: Target all computers in tenants of a specific type

### Dynamic Targets

- **Filter Scripts**: Use PowerShell scripts to dynamically determine which computers should be targeted
- **PSA Agreement Types**: Target computers covered by specific agreement types in your PSA
- **PSA Products**: Target computers covered by agreements that include specific products

## Target Resolution

When you create a deployment with a target, ImmyBot resolves that target to a list of computers at runtime. This resolution process is dynamic, meaning the list of computers can change over time as your environment changes.

### User to Computer Resolution

When targeting users or user groups, ImmyBot resolves these to computers through user affinity:

1. ImmyBot periodically runs `whoami /upn` on all computers
2. It keeps a rolling list of the last 10 UPNs for each computer
3. It assigns the Primary User of the computer to the "Person" with the matching UPN
4. When you target a user, ImmyBot targets all computers where that user is the Primary User

### Azure AD Group Resolution

For Azure AD groups (including on-prem synced groups and Teams):

1. ImmyBot queries Azure AD for the members of the group
2. It resolves these members to users in ImmyBot
3. It then resolves these users to computers through user affinity

### PSA Integration Resolution

If you enable PSA integration, targeting can be based on agreement information:

1. ImmyBot queries your PSA for agreements and their associated clients
2. It maps PSA clients to ImmyBot tenants
3. It resolves tenants to computers
4. This allows targeting computers covered by specific agreement types or products

## Creating Effective Targets

### Combining Target Types

You can combine multiple target types to create sophisticated targeting rules:

- Target all workstations in a specific tenant
- Target all computers used by members of a specific group
- Target all servers with a specific tag

### Using Filter Scripts

Filter scripts provide the most flexible targeting option:

1. Create a PowerShell script that returns `$true` or `$false` for each computer
2. The script can access computer properties, user information, and external data
3. Computers that return `$true` will be included in the target

Example use cases for filter scripts:

- Target computers with specific hardware configurations
- Target computers with specific software installed
- Target computers based on license information from external systems

## Target Visibility

The Target Visibility feature helps control where and how deployments can be accessed in ImmyBot. Current options include:

- **Technician Tools**: When enabled, this makes the deployment visible and accessible through the technician tools interface. This is useful for actions that can assist IT staff when working on support tickets.

## Best Practices

### Target Organization

- **Use Consistent Naming**: Adopt a naming convention for tags and other targeting attributes
- **Document Target Logic**: Document complex targeting rules, especially filter scripts
- **Review Targets Regularly**: Ensure targets still align with your organizational structure

### Target Efficiency

- **Balance Specificity**: Too specific targets can lead to maintenance overhead, while too broad targets may apply deployments too widely
- **Use Hierarchical Targeting**: Leverage tenant and user hierarchies for efficient targeting
- **Test Target Resolution**: Verify that targets resolve to the expected computers before applying deployments

### Security Considerations

- **Principle of Least Privilege**: Target only the computers that need a specific deployment
- **Separate Production and Test**: Use different targets for testing deployments before applying them to production
- **Audit Target Changes**: Regularly review who can modify targets and what changes have been made

## Related Topics

- [Deployments](./deployments)
- [Creating & Managing Deployments](./creating-managing-deployments)
- [Deployment Resolution](./deployment-resolution)
- [User Affinity](./user-affinity)
- [Tenants & Organizations](./tenants-organizations)
