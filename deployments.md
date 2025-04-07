# Deployments

Deployments are rules that assign software or tasks to targets (computers, tenants, or users). They determine what gets installed or configured during maintenance sessions.

## Overview

A deployment consists of:
- A **maintenance item** (software or task)
- A **target** (computers, tenants, or users)
- **Enforcement settings** (required, optional, adhoc, or onboarding)
- Optional **visibility settings** (self-service portal, technician tools)

When ImmyBot runs a maintenance session, it evaluates all deployments that apply to the target and executes them according to their settings.

## Deployment Types

### Required Deployments
Required deployments are automatically enforced on all matching targets during maintenance sessions. Use these for software or configurations that should always be present.

### Optional Deployments
Optional deployments are only enforced when explicitly opted into. These are useful for software that is available but not mandatory for all users.

### Adhoc Deployments
Adhoc deployments are only enforced when manually triggered. Use these for one-time or occasional tasks that shouldn't run automatically.

### Onboarding Deployments
Onboarding deployments only run during the computer onboarding process. Use these for initial setup tasks that should only happen once.

## Creating a Deployment

1. Navigate to **Deployments** and click **New**
2. Select the software or task to deploy
3. Configure any parameters or settings for the maintenance item
4. Select the target enforcement type
5. Choose the target (computers, tenants, or users)
6. Set visibility options if desired
7. Click **Create**

## Deployment Resolution

When multiple deployments target the same software or task, ImmyBot follows these resolution rules:

1. **Local deployments** take precedence over recommended deployments
2. **More specific targets** take precedence over less specific ones
3. **Required enforcement** takes precedence over optional or adhoc

## Recommended Deployments

Recommended deployments are pre-configured deployments that can be approved or dismissed. When approved, they function like regular deployments but with lower priority than local deployments.

For more detailed information about recommended deployments, see the [Recommended Deployments](./recommended-deployments) documentation.

## Managing Deployments

### Editing a Deployment
To modify an existing deployment, click on it in the deployments list and make your changes.

### Duplicating a Deployment
To create a similar deployment, use the **Duplicate** option from the more actions menu.

### Disabling a Deployment
Disabling a deployment will exclude it from being considered during maintenance sessions without deleting it.

### Deleting a Deployment
Permanently removes the deployment rule from the system.

## Best Practices

- Use **required enforcement** for essential software and security configurations
- Use **optional enforcement** for software that's available but not mandatory
- Use **adhoc enforcement** for maintenance tasks that should only run on demand
- Use **onboarding enforcement** for initial setup tasks
- Add descriptive notes to deployments for future reference
- Review deployments regularly to ensure they're still needed

## Troubleshooting

### Deployment Not Running
- Verify the target matches the intended computers/tenants
- Check if the deployment is disabled
- Ensure the enforcement type is appropriate
- Review maintenance session logs for errors

### Conflicting Deployments
- Remember that local deployments override recommended ones
- More specific targets override less specific ones
- Check for deployments that might be conflicting

## Related Topics
- [Maintenance Sessions](./maintenance-sessions)
- [Software Management](./software-library)
- [Maintenance Tasks](./maintenance-tasks)
- [Terminology](./terminology)
