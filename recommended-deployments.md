# Recommended Deployments

## Create Profile for Primary User

This allows Immy to set default browser and pdf editors.

Remember how Microsoft made default PDF handler and default browser user level settings? These settings are stored in the profile of the user. Specifically in the user’s registry. But this is a new computer, and there is no user registry because the user hasn’t logged into the computer, and therefore a profile doesn’t exist for us to specify those settings. Rather than requiring you to ask the user for their password, we fetch their SID from AzureAD. If we find that the user is synced from Active Directory, we will use the SID from Active Directory. If the user is cloud only, we use their Azure AD SID. For the more discerning you may be wondering how we deal with the UserChoice hash, the anti-tamper mechanism preventing the automatic setting of these preferences.

## Microsoft 365 Apps
Immy installs the apps the selected user is licensed for.
Immy contains recommended deployments for
* Apps for business
* Apps for enterprise
* Project
* Visio

You may be tempted to disable these because you are afraid Immy will install all of these apps on every computer. These deployments are limited using a “Metascript” filter that reaches out to the Microsoft Graph API to determine whether the selected user has a license for the product in question.

## Dell/Lenovo/HP Updates
ImmyBot will install the latest updates from Dell, HP, and Lenovo, including driver updates and BIOS updates.

You may be tempted to disable these Deployments as you don’t want HP updates applying to your Dell. This won’t happen. Each deployment uses a Filter script to ensure that these updates only apply to the appropriate machines

## Adobe Reader
You may be tempted to disable this deployment because not all of your customers use Adobe Reader. You should instead leave it enabled and handle exceptions to the rule. See more under “Deployment Resolution”

## Set Computer Name and Domain Join
This is one that I’d advise you to turn off, and instead customize for each customer. We leave it as a recommended deployment mostly to raise awareness that ImmyBot has the capability, but fully expect you to override it to suit your needs.
