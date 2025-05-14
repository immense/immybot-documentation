# Deployments

Deployments in ImmyBot allow you to define what software and configuration tasks should be applied to which targets. They are the core mechanism for managing software and configurations across your environment.

## Understanding Deployments

A deployment consists of three main components:

1. **Maintenance Item**: The software or task to deploy
2. **Target**: The computers, users, or groups that should receive the deployment
3. **Enforcement Type**: How and when the deployment should be applied

### Deployment Types

ImmyBot supports several types of deployments:

- **Local Deployments**: Created and managed within your ImmyBot instance
- **Global/Recommended Deployments**: Curated by the ImmyBot team and available to all instances
- **Approved Deployments**: Recommended deployments that you have approved for use
- **Dismissed Deployments**: Recommended deployments that you have chosen not to use

## Deployment List

The Deployment List page provides a comprehensive view of all deployments in your ImmyBot instance. From this page, you can:

- View all deployments organized by type
- Create new deployments
- Manage deployment ordering (MSP feature)
- Review and approve change requests (MSP feature)
- Perform batch actions on multiple deployments

### Recommended Deployments

Recommended deployments are pre-configured deployments that can be approved or dismissed. When approved, a recommended deployment will be considered for maintenance. If there is a local deployment that targets the same software or task, the local deployment will always have a higher priority.

## Deployment Details

The Deployment Details page allows you to create or edit a deployment. Key components include:

### Maintenance Item Selection

Choose the software or configuration task to deploy:

- **Software**: Applications to install or update
- **Configuration Tasks**: Scripts or commands to execute

### Target Enforcement

Specify how the deployment should be applied:

- **Required**: Enforced on all targets
- **Optional**: Not enforced until opted into (if enabled)
- **Adhoc**: Only enforced through manual deployments
- **Onboarding**: Only enforced during computer onboarding

### Target Selection

Define which targets should receive the deployment:

- **Computers**: Individual computers or computer groups
- **Users**: Individual users or user groups
- **Tenants**: Specific tenants or tenant groups

## Deployment Parameters

Many deployments include configurable parameters that allow you to customize the installation or configuration. These parameters can be:

- **Fixed**: Set at the deployment level and applied consistently
- **Dynamic**: Determined at runtime based on conditions
- **Overridable**: Can be changed for specific targets

## Deployment Ordering

For MSP environments, deployment ordering allows you to control the sequence in which deployments are applied. This is particularly important for:

- Dependencies between software installations
- Ensuring proper configuration sequence
- Managing reboots during maintenance

## Change Requests

In multi-tenant environments, change requests provide a workflow for approving changes to deployments that affect multiple tenants. This feature:

- Allows non-admin users to propose deployment changes
- Requires admin approval before changes are applied
- Provides an audit trail of deployment modifications

## Best Practices

- **Use descriptive names** for deployments to easily identify their purpose
- **Add detailed notes** to document the deployment's purpose and any special considerations
- **Review recommended deployments** regularly to take advantage of pre-configured options
- **Test deployments** on a small group before applying them broadly
- **Use target groups** to organize and manage deployments efficiently
- **Consider dependencies** when creating multiple related deployments

## In-App Documentation

For quick reference while using ImmyBot, each Deployments page includes contextual help documentation that provides essential information about the current view and its features.
