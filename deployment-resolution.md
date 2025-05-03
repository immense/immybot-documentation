# Deployment Resolution

Deployment resolution is the process ImmyBot uses to determine which deployment "wins" when multiple deployments target the same software or task on a computer. This page explains how deployment resolution works and how to create exceptions for specific scenarios.

## Understanding Deployment Resolution

When multiple deployments target the same software or task, ImmyBot must determine which one takes precedence. This is similar to how Group Policies have a "Winning Policy" that ultimately applies to a computer.

ImmyBot follows these resolution rules:

1. **Local deployments** take precedence over recommended deployments
2. **More specific targets** take precedence over less specific ones
3. **Required enforcement** takes precedence over optional or adhoc

## Creating Exceptions

Exceptions are a common use case for deployment resolution. For example, you might want most computers to have Adobe Reader, but a specific client needs Adobe Acrobat instead.

### Example: Adobe Reader vs. Adobe Acrobat

Let's say you have a customer "Contoso" that uses Adobe Acrobat instead of Adobe Reader:

1. Create a Deployment that sets the desired state of Adobe Reader to **Uninstalled** for Contoso
2. Create a Deployment that sets Adobe Acrobat to **Installed** for Contoso's computers

When maintenance runs on Contoso's computers, the Adobe Reader deployment will uninstall Reader, and the Adobe Acrobat deployment will install Acrobat.

### Example: Excluding Specific Computers

You might want to deploy software to all computers except for a few specific ones:

1. Create a Deployment that sets the software to **Installed** for all computers
2. Create a more specific Deployment that sets the software to **Ignored** for the specific computers you want to exclude

The more specific deployment targeting the excluded computers will win, and the software will not be installed on those machines.

## Target Specificity

The specificity of a target is a key factor in deployment resolution. From most specific to least specific:

1. **Individual Computer**: A deployment targeting a specific computer
2. **Computer Tag**: A deployment targeting computers with a specific tag
3. **User or User Group**: A deployment targeting a specific user or group
4. **Tenant**: A deployment targeting all computers in a tenant
5. **All Computers**: A deployment targeting all computers in the system

When deployments conflict, the one with the more specific target wins.

## Enforcement Types

The enforcement type also affects deployment resolution:

1. **Required**: Highest priority, automatically enforced during maintenance
2. **Optional**: Medium priority, only enforced when opted into
3. **Adhoc**: Lowest priority, only enforced when manually triggered

When deployments have the same target specificity, the one with the higher enforcement priority wins.

## Recommended Deployments

Recommended deployments have the lowest priority in deployment resolution. If there is a local deployment that targets the same software or task, the local deployment will always win.

Deployments that have not been approved or dismissed are considered dismissed by default. When approved, a recommended deployment will be considered for maintenance, but still at a lower priority than local deployments.

## Viewing Deployment Resolution

To see which deployments apply to a specific computer:

1. Navigate to the computer's details page
2. Click on the **Deployments** tab
3. Review the list of applicable deployments

For each software or task, you can see which deployment is "winning" and will be applied during maintenance.

## Best Practices

- **Use Tenant-Level Deployments** for standard software that most clients should have
- **Create Exceptions at the Computer Level** for specific machines that need different configurations
- **Document Your Exceptions** to maintain clarity about why certain deployments exist
- **Review Deployments Regularly** to ensure they still align with your requirements
- **Test Deployment Resolution** before applying to production environments

## Related Topics

- [Deployments](./deployments)
- [Creating & Managing Deployments](./creating-managing-deployments)
- [Maintenance Sessions](./maintenance-sessions)
- [Targets & Targeting](./targets-targeting)
