# Deployments Overview

Deployments are rules that assign software or tasks to targets (computers, tenants, or users). They determine what gets installed or configured during maintenance sessions.

## What is a Deployment?

A deployment consists of:
- A **maintenance item** (software or task)
- A **target** (computers, tenants, or users)
- **Enforcement settings** (required, optional, adhoc, or onboarding)
- Optional **visibility settings** (self-service portal, technician tools)

When ImmyBot runs a maintenance session, it evaluates all deployments that apply to the target and executes them according to their settings.

Deployments are conceptually similar to Group Policies in that they assign settings to a group of users or computers. The key difference is that ImmyBot deployments can manage software installation and complex configuration tasks beyond what Group Policy can handle.

## Deployment Types

### Required Deployments
Required deployments are automatically enforced on all matching targets during maintenance sessions. Use these for software or configurations that should always be present.

### Optional Deployments
Optional deployments are only enforced when explicitly opted into. These are useful for software that is available but not mandatory for all users.

### Adhoc Deployments
Adhoc deployments are only enforced when manually triggered. Use these for one-time or occasional tasks that shouldn't run automatically.

### Onboarding Deployments
Onboarding deployments only run during the computer onboarding process. Use these for initial setup tasks that should only happen once.

## Deployment Resolution

When multiple deployments target the same software or task, ImmyBot follows these resolution rules:

1. **Local deployments** take precedence over recommended deployments
2. **More specific targets** take precedence over less specific ones
3. **Required enforcement** takes precedence over optional or adhoc

Like Group Policies have a "Winning Policy", ImmyBot must have a "Winning Deployment" for a given Maintenance Item on a computer.

### Example: Creating Exceptions

Let's say you have a customer "Contoso" that uses Adobe Acrobat instead of Adobe Reader, and you would like that to be installed instead.

First, create a Deployment that sets the desired state of Adobe Reader to Uninstalled for Contoso. Then, create a Deployment that Installs Adobe Acrobat for their computers.

## Recommended Deployments

Recommended deployments are pre-configured deployments that can be approved or dismissed. When approved, they function like regular deployments but with lower priority than local deployments.

Deployments that have not been approved or dismissed are considered dismissed by default.

When approved, a recommended deployment will be considered for maintenance. If there is a local deployment that targets the same software or task, then the local deployment will always have a higher priority and will be used instead.

For more detailed information about recommended deployments, see the [Recommended Deployments](./recommended-deployments) documentation.

## Target Visibility

The Target Visibility feature helps control where and how deployments can be accessed in ImmyBot. Current options include:

**Technician Tools**: When enabled, this makes the deployment visible and accessible through the technician tools interface. This is useful for actions that can assist IT staff when working on support tickets.

## Best Practices

- Use **required enforcement** for essential software and security configurations
- Use **optional enforcement** for software that's available but not mandatory
- Use **adhoc enforcement** for maintenance tasks that should only run on demand
- Use **onboarding enforcement** for initial setup tasks
- Add descriptive notes to deployments for future reference
- Review deployments regularly to ensure they're still needed
- Create logical exceptions using deployment resolution rules

## Related Topics
- [Creating & Managing Deployments](./creating-managing-deployments)
- [Deployment Resolution](./deployment-resolution)
- [Recommended Deployments](./recommended-deployments)
- [Maintenance Sessions](./maintenance-sessions)
- [Software Library](./software-library)
- [Maintenance Tasks](./maintenance-tasks)
