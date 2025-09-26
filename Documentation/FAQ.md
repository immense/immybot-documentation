# Frequently Asked Questions

<style>
Moreinfo {
  text-indent: 50px;
}
</style>

::: warning *ImmyBot's EV code-signing certificate is changing on Feb. 11th, 2025*
Please see the [section below](#what-should-i-do-about-immybots-upcoming-code-signing-certificate-change) for more details on updating security exclusions.
:::

::: danger *ImmyBot no longer supports Windows 7, Server 2008 (or Server 2012 w/o [ESUs](https://learn.microsoft.com/en-us/windows-server/get-started/extended-security-updates-overview)) machines.*
Please see the [section below](#what-windows-versions-does-immyagent-support) for more details.
:::

This comprehensive FAQ addresses common questions about ImmyBot, including licensing, deployment, configuration, and troubleshooting. If you don't find the answer to your question here, please check our [Common Issues](/Documentation/Troubleshooting/common-issues.md) guide or contact our [support team](mailto:support@immy.bot).



## Licensing and Plans
#### What is the difference between the Starter and Standard plan?
::: details Standard allows for ongoing maintenance of agents

Both plans allow you to import all of your existing agents into ImmyBot if you use one of our support integrations.

Both plans allow installing and updating of the ImmyBot agent on all of your existing computers.

Both plans allow running maintenance on all of your computers given that the computer was imported into ImmyBot in the last 7 days.
:::
#### Starter Plan
::: details Starter does not charge maintenance per computer since it does not support ongoing maintenance for your computers.

Once a computer has been in ImmyBot for at least 7 days, maintenance can no longer be executed against it. This includes all onboarding, full maintenance, and adhoc sessions. If you need to manage ongoing maintenance against a computer older than 7 days, then you will need to upgrade to Standard.
:::

#### Standard Plan
::: details Standard counts per maintained computer, since it supports ongoing maintenance, until you hit your cap.
Standard includes unlimited onboarding computers.

Onboarding a computer does not count towards your standard licenses.

You will see a check mark on the top left hand corner of the computer icon when reviewing.
:::

#### What is a maintained computer?
::: details A computer that has had a maintenance session run against it on or after day 8

Since we allow you to import all of your agents into ImmyBot, we don't simply charge per agent.

Instead, we only consider computers that have received ongoing maintenance.

A computer has received ongoing maintenance if an onboarding, full maintenance, or adhoc session has been run against it after the computer has been in ImmyBot for over 7 days.
:::
#### Maintenance per computer
::: details We only charge per maintained computer
When maintenance is performed against a computer older than 7 days, ImmyBot will check the following:

1) Is this computer already counted towards your maintained count?

    - If it is, then maintenance can be performed on this computer.

2) Are we at the maximum number of maintained computers for this subscription?

    - If it is not, then this computer will be added to your active maintained computer count, and maintenance can be performed on this computer.

When a subscription is at the maximum maintained count, only maintenance for computers considered in the count will be allowed. In order to run maintenance on other computers, you can purchase more computer licenses for your subscription.
:::

#### For purchasing Immy, do you guys prefer Credit card or invoice? Would you rather us pay monthly, or can we pay all upfront?
::: details We bill automatically to a credit card every month.
We utilize an external PCI DSS compliant platform to handle all billing.
:::

## Deployment and Configuration
#### Will ImmyBot start doing anything without my consent? Like when I save a deployment, will it automatically deploy?
::: details ImmyBot does not deploy anything automatically.

 You can feel safe saving your Deployments. Think of them like documenting how things SHOULD be. If you want ImmyBot to automatically enforce deployments, you would need the ImmyBot Standard plan which allows you to create schedules.

Think of it like if Group Policy only updated if you manually ran gpupdate /force or otherwise specified a schedule for the gpupdates to happen. We understand that updating and installing software on existing computers can be intrusive to the user which is why we schedule these actions out and give the user the ability to postpone via interactive emails.

IMPORTANT: If you setup integration with your RMM, when you map an RMM client to an ImmyBot tenant, ImmyBot will begin running inventory scripts on those machines every 24 hours. These scripts are read-only, but if you have aggressive monitoring software it may cause false alarms.
:::

#### What if I don’t know which user will be using the computer?
::: details It's ok, but do your best to find out

Do your best to find out, or assign machines to specific users ahead of time. Without this, user level customizations are impossible. However, you may find yourself in a shared-computer scenario where every computer gets the same 365 applications. Simply create a deployment for those 365 applications for all computers under that tenant.
:::

#### Why are my computers stuck in identification?
::: details Its either a security platform, or WMI is broken

1. The machine has a security tool like Defender for Endpoint, Crowdstrike, Bitdefender or Threatlocker blocking our scripts from running.
   - You'll want to create exclusions for ImmyBot

2. WMI is broken on the machine (Usually on older machines)
:::
#### How/are we able to define which version of Windows is installed during the initial setup?

::: details ImmyBot doesn't install Windows on bare metal.
 The workflow is you unbox the system from Dell, HP, Lenovo, Microsoft, or your manufacturer of choice and insert the USB with the ImmyBot.ppkg file at the root while the machine is at the out of box screen.

We don't image the machine, we script the factory image into compliance.

We can, however, install Feature Updates during Onboarding (as well as after Onboarding)
:::

#### Since Immy.Bot doesn’t use an ISO, does it require a device to have the ability to have 2 USB devices plugged in? One for a Windows ISO and one for the ImmyBot ppkg?
::: details Create a Windows installation flash drive and put the PPKG in the root

If you want to wipe the computer you can use the Media Creation Tool to create a Windows Setup flash drive and then put our .ppkg file on the root of the flash drive. After installing Windows, it will automatically apply the provisioning package. You should only have 1 .ppkg file per USB, otherwise you will have to manually select which on to use.
:::

#### Does Immy’s setup process support a USB NIC for WiFi?  If so, how do we present those drivers to Immy, or do we even need to?
::: details You can't ImmyBot runs on top of Windows
I've found Windows has built in drivers for most USB NICs. If yours doesn't have drivers built into Windows, I'd suggest purchasing one that does.
:::

#### Does ImmyBot rely on the Windows preboot for drivers during initial deployment, or does the ImmyBot agent installer have drivers?
::: details Since we are working with the manufacturer's image, all drivers are typically installed.
We will automatically install Dell, HP, and Lenovo driver and BIOS updates via those manufacturer's tools (Dell Command, HP Image Assistant, Lenovo System Update)
:::

#### Are there any repository limits for software deployments?  Either to the size of custom software or number of custom installers we can upload?
::: details No. Please don't be the reason that this changes.
There are currently no limits. Everything you upload goes into an Azure Storage Account created just for your ImmyBot instance. Don't be the reason we can't have nice things.
:::
####  Is ImmyBot able to reset Windows / Wipe and Reload a computer?
::: details Yes, expand for instructions.

Yes, the current process will be simplified but here's how to do it:

1. Click Download ImmyAgent on the left to create a PPKG with the Windows Reset option selected

![image](https://user-images.githubusercontent.com/1424395/235902691-46845e47-2965-4141-a68c-2004a02b7300.png)

![image](https://user-images.githubusercontent.com/1424395/235902014-4a63dc2f-efe3-454c-a2f4-5c6578190982.png)

2. Create a Deployment for "Apply Provisioning Package (PPKG)" to deploy the PPKG to the specified machine

![image](https://user-images.githubusercontent.com/1424395/235902286-5ad3303e-167c-4cd4-abb6-5dea45da3600.png)
:::

#### What are trusted manufacturers?
::: details A manufacturer that provides unique serial numbers for their devices.

Dell, HP, and Lenovo are considered trusted manufacturers.  A trusted manufacturer is expected to provide unique serial numbers for their devices. We rely on trusted manufactuers and device serial numbers during device identification.  If the agent reports it comes from a trusted manufacturer and a computer already exists inside ImmyBot with the same manufacturer and serial number, then we will automatically associated the agent with the existing computer.
:::

#### For computer rename, are there any other operators we can use when naming devices other then the ones shown? Can we add operators?

::: details You can duplicate the Task into your instance an manipulate it however you like.
If it's something you think other MSPs could use, I'd encourage you to submit a request on the [ImmyBot Community](https://community.immy.bot) and we can add it.
:::

#### Employee profile caching during on-boarding - is this supported?  If so/how?
::: details ImmyBot will create a profile for the Primary Person you selected for this machine

ImmyBot will create a profile for the Primary Person you selected for this machine on the Onboarding screen (It does this via the "Create Profile for Primary Person" task)

We do this so subsequent tasks that set user level settings like default PDF handler and default browser, have the profile for the primary person and thus that user's HKCU where those settings live.
:::

#### Is ImmyBot able to group devices and then do role based deployments to them? I assume this is done by tags?
::: details Yes. Tags.
Yes, you would accomplish this with tags.
:::

## AzureAD and Intune
#### Can ImmyBot join AzureAD?
::: details Yes, via a deployment.
Yes. Create a deployment for the Join AzureAD task. We use the bulk enrollment technique and generate a provisioning package to join the machine to AzureAD. We recommend using oAuth over DEM user.
:::
#### My AzureAD Join action is failing, what are some common fixes?
::: details Check MFA, CAPs, and logs.

Check if MFA Requirement for Joining is enabled via [Conditional Access](https://portal.azure.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Policies) or [Azure Device Settings](https://portal.azure.com/#view/Microsoft_AAD_Devices/DevicesMenuBlade/~/DeviceSettings/menuId~/null).
MFA requirement for all users in [Conditional Access](https://portal.azure.com/#view/Microsoft_AAD_ConditionalAccess/ConditionalAccessBlade/~/Policies) will also block the execution, as the package_XXX user will encounter a MFA prompt.
Most other situations are noted during execution failure.
:::

#### Can ImmyBot make deploying via Intune more simple?
::: details Absolutely! There is a global Task labeled "**Deploy ImmyAgent to Intune**"

Absolutely! There is a global Task labeled "**Deploy ImmyAgent to Intune**" that can do an excellent job of it.
- Ensure you are using the [**Custom** Graph Permissions](https://docs.immy.bot/azure-graph-permissions-setup.html#custom)
- Ensure you have added the Graph **Application** permission DeviceManagementConfiguration.ReadWrite.All to your app registration
- Ensure you have re-consented to your linked tenants with your new Custom registration
- If there is a failure of the deployment, there is likely a permissions issue with the app registration
:::

#### Can ImmyBot help migrate my customers to AzureAD from On-Premises environments?
::: details Yes, we have a Task that can migrate machines

Yes, we have a Task that can migrate machines to associate the user’s profile to their Azure AD identity and join the machine to Azure AD. It can also do the same to and from Active Directory
:::

#### Can you target devices in Azure Groups?
::: details Yes, but ImmyBot requires an additional permissions
Yes, but ImmyBot requires an additional permissions on the ImmyBot app registration. You need to grant the `Microsoft Graph - Devices.Read.All` permission in order for devices to be pulled from Azure Groups.
:::

## Compatibility

#### What Windows versions does ImmyAgent support?
::: details Any Windows OS that is currently under Microsoft support, is generally supported by ImmyBot

The ImmyAgent is written in .NET, and as such supports the same [Windows versions the .NET runtime supports](https://github.com/dotnet/core/blob/main/release-notes/8.0/supported-os.md).
**Currently, the ImmyAgent runs on .NET 7 and therefore supports Win7+ devices. However, support for .NET 7 is ending May 14th, 2024.**
After May 14th, ImmyBot will be transitioning the Agent to the .NET 8 runtime. Win7 is not officially supported in .NET 8, and as such will no longer be supported in ImmyBot.
Older systems may continue to work inside of ImmyBot with necessary updates applied, however, we will not be offering any support for unsupported machines.
 - Internal testing has shown Win7 (and similar) machines can still work on .NET 8 as long as they have the necessary updates, utilizing a [3rd party tool such as Legacy Update](https://legacyupdate.net/).
 - See [Supported Operating Systems](/Documentation/GettingStarted/system-requirements.md)
>[!DANGER]
>We do not endorse or support agents that utilize Legacy Update or similar tools. The best thing to do is upgrade the system. Use at your own risk.
:::

#### Can I install the ImmyAgent on MacOS or Linux?
::: details No. We do not support non Windows machines
No. We may get there some day but, for the time being, our platform is **Windows only**.

See [Supported Operating Systems](/Documentation/GettingStarted/system-requirements.md)
:::

#### Can the ImmyAgent be used on ARM architecture?
::: details Yes and no.
Yes and no. While we don't actively consider it during the design phase of the agent, it has had a fairly high degree of success with ARM devices.
:::

## Security and Certificates

#### What should I do about ImmyBot's upcoming code-signing certificate change?
::: details Update your security platforms to ensure it will still work

ImmyBot's current code-signing certificate is set to expire Feb. 12th, 2025. We plan to switch over to our new certificate a day early on Feb. 11th, 2025 to ensure a smooth transition.

This certificate is used to sign our Agent binaries & installers delivered to machines.

Unfortunately, our new certificate's `Organization(O)` and `Common Name(CN)` fields are changing from `Immense Networks` to `ImmyBot LLC`.

New Certificate on Feb. 11th, 2025:
```
CN=ImmyBot LLC, O=ImmyBot LLC, L=Baton Rouge, S=Louisiana, C=US
```

Existing Certificate:
```
CN=Immense Networks, O=Immense Networks, L=Baton Rouge, S=Louisiana, C=US
```
This means if you have followed either the [Security Software Exclusions](https://docs.immy.bot/troubleshooting.html#security-software-exclusions) or [ThreatLocker](https://docs.immy.bot/troubleshooting.html#threatlocker) Setup guides in the past,
you must go through the guides again, adding our new certificate ***in addition*** to the existing certificate exclusion.
:::

#### Will this certificate change mean I need to generate all new agent installers? Do I need to re-install the ImmyBot Agent on all my machines?
::: details No.

No. Binaries and installers signed with the existing certificate ***are valid and will continue to work past Feb. 12th, 2025 indefinitely*** as they were signed before the certificate expiry.
Only new agents releases and installers generated after our transition period will be signed with our new certificate. This is why it is important to keep the prior certificate exclusions for instances with pre-exisiting machines.
:::

#### SentinelOne - How do we define which site ImmyBot places the agent in during installation of the S1 agent?
::: details Give your deployment an API key, we will handle the rest.

Supply ImmyBot with an API Key to SentinelOne, and ImmyBot will look for a Site in your SentinelOne instance that matches the name of the Tenant you are onboarding the computer for.
:::

#### BitLocker - does this write the key to Azure AD by chance?
::: details Yes, but we cannot verify it after.

Yes, but we can't verify that it is written to Azure AD as that would require additional privileges that our App Registration doesn't request.

We also write the BitLocker Recovery Key to Active Directory for Domain Joined machines. This doesn't require any Group Policy setup, or line of site to the domain controller. This works as long as the machine is joined to a domain and there is a domain controller for that domain in ImmyBot.
:::

## Agent Management
#### Can I embed the ImmyAgent into an image?
::: details Yes, expand for more info.

Create a PPKG and place it in `C:\Recovery\Customizations`, create the folder if it doesn't exist.

You can also use [SetupComplete](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/add-a-custom-script-to-windows-setup?view=windows-11)
This method was confirmed working on Server 2022.

Place both the ImmyAgent EXE installer and the SetupComplete.cmd in the C:\Windows\Setup\Scripts directory
Content of SetupComplete.cmd can be as simple as:
start C:\Windows\Setup\Scripts\ImmyAgentInstallerBundle.exe /qn

A member of the ImmyBot community also likes to use the below method to embedded a PPKG into an image:
```
DISM.exe /Image:D:\mount /Add-ProvisioningPackage /PackagePath:C:\Users\Moi\Downloads\ImmyBotAgentInstaller.ppkg
```
:::

#### Do I need a separate USB/Installer per tenant?
::: details No.
No. Create a USB pointing to your own tenant (or create an “Onboarding” tenant) and don’t select the Auto-Onboard option.

You will change the tenant of the computer on the Onboarding area of the computer after it comes into New Computers
:::

#### How do I uninstall the ImmyAgent?
::: details Create a deployment for the "ImmyBot Agent" and set software should be to "Uninstalled"
Create a deployment for the "ImmyBot Agent" and set software should be to "Uninstalled"

![image](https://github.com/immense/immybot-documentation/assets/95599350/02be5654-7393-4f95-bf56-dde089582ccf)

Or run the following from Command Line:
```batch
wmic product where name="ImmyBot Agent" call uninstall /nointeractive
```
Or from PowerShell:
```powershell
$product = Get-WmiObject win32_product | where {$_.name -eq "ImmyBot Agent"}
Write-Host $product.IdentifyingNumber
$Arguments = "/x $($product.IdentifyingNumber) /quiet /noreboot"

Start-Process -FilePath msiexec -ArgumentList $Arguments -Wait -Passthru
```
:::

## Troubleshooting
#### Why am I getting this system update notification?
::: details Because you're not on the latest version of ImmyBot

System update notifications indicate that we've released new features or bug fixes for your ImmyBot instance. Here's what you need to know:

- Updates typically take 5-10 minutes to apply and restart your instance
- During the update, your instance will not be accessible
- No maintenance sessions are triggered on endpoints as a result of the update
- Any running sessions will be restarted after the update completes

If you prefer to automate updates, you can schedule a time for automatic system updates under **Show More** > **Preferences**. This allows you to set updates to occur during non-business hours to minimize disruption.
:::

#### Where do I find a file that was uploaded to a computer through ImmyBot Remote Control?
::: details %ProgramData%\RemoteControl\Shared
Files uploaded through ImmyBot Remote Control are stored in a specific location on the target computer:

```batch
%ProgramData%\RemoteControl\Shared
```

This folder contains all files transferred during remote control sessions. You can access this location directly through File Explorer or by running a command prompt and navigating to the directory.
:::

#### Do you take requests for features/software/tasks/scripts?
::: details Yes, we welcome feature requests and contributions from our community!
Yes, we welcome feature requests and contributions from our community! Please submit your requests on the [ImmyBot Community](https://community.immy.bot) portal. Our team regularly reviews these requests and prioritizes them based on user demand and alignment with our product roadmap.
:::

#### Domain Join didn’t work, what gives?
::: details It's likely that the DC is missing entirely, or ImmyBot hasn't identified the agent as a DC
Make sure there is a Domain Controller in ImmyBot for the machine. If you are using a supported RMM like CW Automate/Control setup the integration so the Domain Controller is imported automatically. Otherwise, you’ll need to install the ImmyAgent on a domain controller for that customer.

If the Domain Controller doesn’t have the red “Domain Controller” designation, press “Run Inventory”. This may happen if it was recently added to ImmyBot.

Pay attention to the script output, ImmyBot may be reporting that there is a name collision, or that it was unable to run scripts on the domain controller, usually due to security software.

The "Set Computer Name and Domain Join" task needs to be run serially. If you're doing a large batch of onboardings, they may get stuck on this task. Ensure that all of the computers and Domain Controllers are online and connected to ImmyBot to ensure that they get through that task quickly.
:::
#### ImmyBot Agent logs show an error of "The specified SAS token is expired"
::: details This will occur if the device's system time is incorrect.

This will occur if the device's system time is incorrect.  Ensure that the system time is correct and then restart the ImmyBot Agent Service.
:::

## Miscellaneous
#### We are rebranding, how do we change our company information?
::: details Branding information is [here](/Documentation/HowToGuides/branding.md).

Branding information is [here](/Documentation/HowToGuides/branding.md). If you want to change your ImmyBot subdomain, you need to put submit a ticket to ImmyBot support.
:::

## Next Steps

After reviewing these FAQs, you might want to explore:

- [Common Issues](/Documentation/Troubleshooting/common-issues.md) - Solutions to frequently encountered problems
- [Troubleshooting Guide](/Documentation/Troubleshooting/troubleshooting.md) - Detailed troubleshooting steps
- [ImmyBot Overview](/immybot-overview.md) - Learn more about ImmyBot's capabilities
