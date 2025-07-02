# Known Issues

- Non admin user cannot create tenant deployments
  - Workaround: Navigate to **Show More** > **Preferences** > Cycle **Allow non admin users to create tenant level deployments**

- Dell Command Update - Version not found or otherwise not installed
  - There is a know issue with Dell's API that we are working through, no workaround at this time

- Cloud Radial - Checks are failing with API error
  - Due to a redirect for their API that is not working, work in progress internally at ImmyBot, no workaround at this time.
- ImmyBot instance becomes unresponsive due to unhealthy integration
  - Check for unhealthy integratoin: *Show More* > *Integrations*, review any that are labled unhealthy
  - Workaround: Resolve the issues for that integraton: Edit the integration and resolving the issues listed.
  - Workaround: Disable the integration