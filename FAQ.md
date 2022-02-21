## What if I don’t know which user will be using the computer?
Do your best to find out, or assign machines to specific users ahead of time. Without this, user level customizations are impossible. However, you may find yourself in a shared-computer scenario where every computer gets the same 365 applications. Simply create a deployment for those 365 applications for all computers under that tenant.

## Can Immy join AzureAD?
Yes. Create a deployment for the Join AzureAD task. We use the bulk enrollment technique and generate a provisioning package to join the machine to AzureAD. At the time of writing, this requires you to create a user in each customer’s tenant. We plan to remove this requirement in the future.

## Can Immy help migrate my customers to AzureAD from On-Premises environments?
Yes, we have a [Task](#task) that utilizes Forensit’s ProfWiz Corporate Edition to associate the user’s profile to their Azure AD identity.

## Domain Join didn’t work, what gives?
Make sure there is a Domain Controller in Immy for the machine. If you are using a supported RMM like CW Automate/Control setup the integration so the Domain Controller is imported automatically. Otherwise, you’ll need to install the ImmyAgent on a domain controller for that customer.

If the Domain Controller doesn’t have the red “Domain Controller” designation, press “Run Inventory”. This may happen if it was recently added to ImmyBot.

Pay attention to the script output, Immy may be reporting that there is a name collision, or that it was unable to run scripts on the domain controller, usually due to security software.

## Why are my computers stuck in [Identification](#identification)
1. The machine has a security tool like Defender for Endpoint, Crowdstrike, Bitdefender or Threatlocker blocking our scripts from running
  - You'll want to create exclusions for ImmyBot
1. WMI is broken on the machine (Usually on older machines)

