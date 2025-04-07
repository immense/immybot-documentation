# Creating and Managing Deployments

This guide walks you through common tasks for working with deployments in ImmyBot.

## Task: Create a Required Software Deployment

Follow these steps to create a deployment that automatically installs software on all matching targets:

1. Navigate to **Deployments** and click the **New** button
2. In the **Maintenance Item** section:
   - Select **Software** as the item type
   - Search for and select the software you want to deploy
   - Choose the desired version (Latest, Specific, or Not Installed)
   - Configure any software-specific parameters
3. In the **Target Enforcement** section:
   - Select **Required** to ensure automatic installation
4. In the **Target Selection** section:
   - Choose the target type (Computers, Tenants, or Users)
   - Select specific targets or use filters to define your target scope
5. Add descriptive notes to document the purpose of this deployment
6. Click **Create** to save the deployment

Your software will now be automatically installed on all matching targets during the next maintenance session.

## Task: Create an Optional Software Deployment

Follow these steps to create a deployment that users can opt into:

1. Navigate to **Deployments** and click the **New** button
2. In the **Maintenance Item** section:
   - Select **Software** as the item type
   - Search for and select the software you want to make available
   - Choose the desired version
3. In the **Target Enforcement** section:
   - Select **Optional** to make this an opt-in deployment
4. In the **Target Selection** section:
   - Choose the target type and select your targets
5. Add notes explaining what this software is used for
6. Click **Create** to save the deployment

Users will now be able to opt into this software through the self-service portal or technician tools.

## Task: Deploy a Configuration Task

Follow these steps to create a deployment for a configuration task:

1. Navigate to **Deployments** and click the **New** button
2. In the **Maintenance Item** section:
   - Select **Task** as the item type
   - Search for and select the configuration task
   - Configure any required parameters
3. In the **Target Enforcement** section:
   - Select the appropriate enforcement type
4. In the **Target Selection** section:
   - Choose the target type and select your targets
5. Add notes explaining the purpose of this configuration
6. Click **Create** to save the deployment

## Task: Duplicate an Existing Deployment

To create a similar deployment based on an existing one:

1. Navigate to **Deployments**
2. Find and click on the deployment you want to duplicate
3. Click the **More Actions** menu (three dots)
4. Select **Duplicate**
5. Modify any settings as needed in the new deployment
6. Click **Create** to save the new deployment

## Task: Disable a Deployment Temporarily

To temporarily prevent a deployment from running:

1. Navigate to **Deployments**
2. Find and click on the deployment you want to disable
3. Toggle the **Enabled** switch to Off
4. Click **Save** to update the deployment

The deployment will remain in your list but won't be enforced during maintenance sessions.

## Task: Manage Recommended Deployments

To review and act on recommended deployments:

1. Navigate to **Deployments**
2. Look for deployments with the **Recommended** tag
3. To approve a recommended deployment:
   - Select the deployment
   - Click **Approve**
   - The deployment will now be enforced according to its settings
4. To dismiss a recommended deployment:
   - Select the deployment
   - Click **Dismiss**
   - The deployment will be ignored

## Task: Troubleshoot a Deployment Not Running

If a deployment isn't running as expected:

1. Navigate to **Deployments**
2. Find and click on the deployment
3. Check the following:
   - Is the deployment **Enabled**?
   - Does the **Target Enforcement** match your expectations?
   - Are the **Targets** correctly specified?
   - For software: Is the version available for the target operating systems?
4. Review the **Maintenance Session Logs** for the affected computers:
   - Navigate to **Computers**
   - Select the computer
   - Click on **Maintenance** tab
   - Review the logs for any errors related to this deployment

## Task: Create an Onboarding Deployment

To create a deployment that only runs during computer onboarding:

1. Navigate to **Deployments** and click the **New** button
2. In the **Maintenance Item** section:
   - Select the software or task for initial setup
3. In the **Target Enforcement** section:
   - Select **Onboarding**
4. In the **Target Selection** section:
   - Choose the target type and select your targets
5. Add notes explaining this is part of the onboarding process
6. Click **Create** to save the deployment

This deployment will only run when a computer is being onboarded to ImmyBot.

## Related Resources

- [Deployments Overview](./deployments.html)
- [Maintenance Sessions](./maintenance-sessions.html)
- [Software Library](./software-library.html)
