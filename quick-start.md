# Quick Start Guide

This guide will help you get up and running with ImmyBot quickly. Follow these steps to set up your first deployment and start managing your computers.

## 1. Sign Up for ImmyBot

1. Visit [immy.bot](https://immy.bot) and click "Sign Up"
2. Complete the registration process
3. Check your email for a verification link
4. Set up your organization and tenant structure

## 2. Connect Your First Computer

### Create an ImmyBot USB Drive

1. Insert a USB drive into your computer
2. From the ImmyBot dashboard, click on **Download ImmyAgent** in the left navigation
3. Select **Create USB Drive**
4. Choose your USB drive from the dropdown menu
5. Click **Create**

> **Note:** You only need to create this USB drive once. The same drive can be used for all clients and computers.

### For Physical Computers

1. Power on the computer and boot to Windows
2. When you reach the Windows setup screen (region selection), insert your ImmyBot USB drive
3. The computer will automatically detect the ImmyBot provisioning package
4. Follow any on-screen prompts to apply the package

### For Virtual Machines

1. From the ImmyBot dashboard, click on **Download ImmyAgent**
2. Select **Create ISO**
3. Mount the ISO to your virtual machine
4. At the Windows region selection screen, press the Windows key 5 times
5. Alternatively, double-click the PPKG file from the mounted disk

### Connect Through an RMM Integration (Alternative)

1. Navigate to **Settings** > **Integrations**
2. Select your RMM provider from the list
3. Follow the integration setup instructions
4. Once connected, your RMM-managed computers will appear in ImmyBot

## 3. Create Your First Deployment

1. Navigate to **Deployments** and click **New**
2. Select a software application to deploy
3. Choose **Required** as the enforcement type
4. Select your target computer(s)
5. Click **Create**

## 4. Identify and Assign the Computer

Once connected, your computer will appear in the **New Computers** section:

1. Go to **New Computers** in the ImmyBot dashboard
2. Locate your newly connected computer in the list
3. Click on the computer to begin the onboarding process
4. Assign a **Customer** (required) and **Primary User** (recommended)
5. Click **Start Onboarding**

ImmyBot will automatically apply all recommended deployments to the computer.

## 5. Run Your First Maintenance Session

1. Navigate to **Computers**
2. Select the computer you want to maintain
3. Click **Run Maintenance**
4. Watch as ImmyBot applies your deployment

## 5. Explore Key Features

Now that you've completed your first deployment, explore these key features:

- **Software Library**: Add and configure software for deployment
- **Maintenance Tasks**: Create custom scripts and configurations
- **Recommended Deployments**: Review and approve suggested deployments
- **Computer Inventory**: View detailed information about your managed computers

## Next Steps

- [Learn about Tenants and Organizations](./tenants-organizations)
- [Understand Deployments in depth](./deployments)
- [Explore Maintenance Sessions](./maintenance-sessions)
- [Set up User Roles and Permissions](./users-permissions)

## Getting Help

If you need assistance, check out our [Troubleshooting](./troubleshooting) guide or [Frequently Asked Questions](./FAQ).
