# Computer Onboarding Guide

This guide walks you through the process of onboarding a new computer with ImmyBot, from initial connection to successful deployment of your standard configurations.

## Prerequisites

Before you begin, make sure you have:
- An active ImmyBot account
- Administrator access to the computer you want to onboard
- A USB drive (for physical computers) or ISO (for virtual machines)

## Creating Your ImmyBot Provisioning Media

When you first login to ImmyBot, the Getting Started Wizard will prompt you to create your ImmyBot provisioning media.

> [!IMPORTANT]
> **THIS IS A ONE-TIME PROCESS.** You do not need to create a new USB drive for each client. You will assign the client after the machine connects to ImmyBot.

### Option 1: USB Drive (Recommended)

![USB Drive Creation](https://user-images.githubusercontent.com/1424395/173570369-b7a69a46-95b8-4a85-a4f9-9a4dda57b7e7.png)

1. Insert a USB drive into your computer
2. Follow the wizard to create the ImmyBot provisioning drive
3. Use this drive for all future computer onboarding

### Option 2: ISO File (For Virtual Machines)

If you're testing with a virtual machine:

![ISO Creation](https://user-images.githubusercontent.com/1424395/173570635-c50681ea-5612-4326-8203-c0de62e2c154.png)

1. Select the "Create ISO" option in the wizard
2. Download and mount the ISO to your virtual machine
3. At the Windows region selection screen, press the Windows key 5 times
4. If you're past the region selection screen, simply double-click the PPKG file from the mounted disk

![PPKG Application](https://user-images.githubusercontent.com/1424395/173571790-482162a3-a655-42ce-8d06-8dcd6ae973e8.png)

> [!TIP]
> We recommend using a physical computer (Dell, HP, or Lenovo) for your first onboarding to experience the full capabilities of ImmyBot, including BIOS and driver updates.

## Computer Identification and Assignment

Once the computer connects to ImmyBot, you'll be directed to begin the onboarding process:

![Computer Identification](https://user-images.githubusercontent.com/1424395/173592966-cb7d3ccd-098c-4940-bfa0-a435ca68d513.png)

To properly configure the computer, ImmyBot needs:

1. **Customer (Required)**: The organization that owns the computer
2. **Primary User (Recommended)**: The person who will primarily use this computer

![Assign Customer and User](https://user-images.githubusercontent.com/1424395/173594097-f975123b-217f-42ef-aa47-2b816a5593b6.png)

> [!TIP]
> If this is your first time using ImmyBot, you'll only have your MSP as a customer and yourself as a user. That's fine for testing - just select these options.

> [!TIP]
> Customers can be imported from your RMM, PSA, or by setting up the Azure integration.

> [!TIP]
> People are imported from your customers' Azure AD via the Azure integration.

## Starting the Onboarding Process

After assigning the customer and user:

1. Click **Start Onboarding**
2. An "Onboarding" maintenance session will be created for this computer
3. ImmyBot will automatically apply all "Recommended Deployments" to the computer
4. You can monitor the progress in real-time from the Sessions tab

## What Happens During Onboarding?

During the onboarding process, ImmyBot:

1. Installs and configures software based on your deployments
2. Applies security settings and policies
3. Configures user-specific settings for the primary user
4. Updates drivers and BIOS (for supported manufacturers)
5. Applies Windows updates

> [!TIP]
> You can add your own Deployments and re-run this session as many times as you like until everything is to your liking.

## Next Steps

After successful onboarding:

- **Review the Results**: Check the completed maintenance session for any issues
- **Add Custom Deployments**: Create your own deployments for additional software or configurations
- **Re-run the Session**: You can re-run the onboarding session as needed until everything is configured to your liking

For more detailed information, see our [First Computer Setup](first-computer-setup.md) guide.

---

**Next Steps:** [Core Concepts →](core-concepts.md) | [Creating Your First Deployment →](creating-deployments.md)

