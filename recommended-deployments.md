# Recommended Deployments

ImmyBot comes with several pre-configured "Recommended Deployments" that provide a solid foundation for managing your endpoints. This guide explains each recommended deployment and how to use them effectively.

## Table of Contents

- [Recommended Deployments](#recommended-deployments)
  - [Table of Contents](#table-of-contents)
  - [Create Profile for Primary User](#create-profile-for-primary-user)
    - [How It Works](#how-it-works)
  - [Microsoft 365 Apps](#microsoft-365-apps)
    - [Included Applications](#included-applications)
    - [Smart License Detection](#smart-license-detection)
  - [Dell/Lenovo/HP Updates](#delllenovohp-updates)
    - [Manufacturer-Specific Targeting](#manufacturer-specific-targeting)
  - [Adobe Reader](#adobe-reader)
    - [Handling Exceptions](#handling-exceptions)
  - [Set Computer Name and Domain Join](#set-computer-name-and-domain-join)
    - [Customization Recommended](#customization-recommended)
  - [Customizing Recommended Deployments](#customizing-recommended-deployments)
  - [Next Steps](#next-steps)

## Create Profile for Primary User

This deployment creates a user profile for the primary user, allowing ImmyBot to set user-specific settings like default browser and PDF editors.

### How It Works

When configuring a new computer, ImmyBot needs to set user-specific settings, but faces a challenge:

1. User-level settings like default browser and PDF handler are stored in the user's registry
2. On a new computer, the user hasn't logged in yet, so no profile exists
3. Without a profile, these settings can't be configured

**ImmyBot's Solution:**
- Fetches the user's SID (Security Identifier) from Azure AD
- For AD-synced users, uses the SID from Active Directory
- For cloud-only users, uses their Azure AD SID
- Creates the profile without requiring the user's password
- Handles the UserChoice hash (Microsoft's anti-tamper mechanism) automatically

This deployment is essential for proper user experience configuration and should typically remain enabled.

## Microsoft 365 Apps

ImmyBot intelligently installs Microsoft 365 applications based on the user's license entitlements.

### Included Applications

ImmyBot contains recommended deployments for:
* Microsoft 365 Apps for Business
* Microsoft 365 Apps for Enterprise
* Microsoft Project
* Microsoft Visio

### Smart License Detection

You might worry that enabling these deployments will install all Microsoft 365 apps on every computer. However, ImmyBot uses conditional logic:

- Each deployment includes a "Metascript" filter
- This script connects to the Microsoft Graph API
- It checks whether the selected user has a license for the specific product
- Only licensed applications are installed

This approach ensures users get exactly the applications they're entitled to use, without wasting resources on unlicensed software.

## Dell/Lenovo/HP Updates

ImmyBot will install the latest updates from major manufacturers, including:
- Driver updates
- BIOS/firmware updates
- Hardware-specific utilities

### Manufacturer-Specific Targeting

Each manufacturer deployment includes a filter script that:
- Detects the computer's make and model
- Only applies updates from the matching manufacturer
- Prevents cross-manufacturer updates (e.g., HP updates won't apply to Dell machines)

These deployments help maintain hardware at optimal performance and security levels with minimal effort.

## Adobe Reader

This deployment installs and configures the latest version of Adobe Reader on workstations.

### Handling Exceptions

Some organizations may use alternative PDF readers (like Foxit or PDF-XChange) instead of Adobe Reader. Rather than disabling this deployment globally:

1. Keep the Adobe Reader deployment enabled as the default
2. Create exception deployments for specific customers or computers
3. Set the alternative PDF reader to install and Adobe Reader to uninstall for those targets

For more details on handling exceptions, see the [Deployment Resolution](./terminology.md#deployment-resolution) section.

## Set Computer Name and Domain Join

This deployment demonstrates ImmyBot's ability to:
- Set computer names according to your naming convention
- Join computers to your Active Directory domain
- Configure domain-specific settings

### Customization Recommended

Unlike other recommended deployments, this one should typically be customized for each customer:

1. Turn off the default deployment
2. Create customer-specific versions with appropriate naming conventions and domain settings
3. Apply these custom deployments to the relevant customer targets

## Customizing Recommended Deployments

While recommended deployments provide a solid starting point, you should review and customize them to match your specific requirements:

1. **Review each deployment** to understand its purpose and configuration
2. **Enable or disable** deployments based on your needs
3. **Create exceptions** for specific customers or computers as needed
4. **Clone and customize** deployments that require customer-specific settings

Remember that deployments only take effect when maintenance is run, so you can safely experiment with different configurations.

## Next Steps

After reviewing the recommended deployments:

- [Create your own deployments](./creating-deployments.md) for additional software and configurations
- Learn about [deployment resolution](./terminology.md#deployment-resolution) to handle exceptions
- Explore [maintenance sessions](./terminology.md#maintenance-session) to apply your deployments

