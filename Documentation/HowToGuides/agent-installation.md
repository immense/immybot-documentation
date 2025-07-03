# Agent Installation
**Please see [System Requirements](/Documentation/GettingStarted/system-requirements.md) before proceeding**

## Provisioning Package (New Computer Flash Drive)
This option is perfect for brand new computers, or computers that have been newly wiped and reloaded. Once you configure your settings for the deployment, you will be given a file to download. Once downloaded, and placed on a flash drive like a regular file, you will need to insert the flash drive into the computer and turn it on. From there, Windows will see the Provisioning Package, and take it from there. ImmyBot will be installed, and if Automatic Onboarding was selected, the computer will begin onboarding.

This option allows you to
- Skip the OOBE entirely saving you time
- Drop ship computers to clients and remotly onboard brand new computers
- Reload a computer with Windows, with a few clicks
  - Add the PPKG file to the root of a Windows install drive and leave it in untill the install is complete and the provisioning is complete

## Powershell
This is a great option for computers that are already set up, and you have a remote option to run PowerShell.

This will allow you to:
- Enable Automatic Onboarding
- Set the Primary User from the agent configuration interface
- Utilize RMM scripting to push the Immy Agent to machines

## Executable file

The executable file is good option to deploy the ImmyBot agent when you do not have remote access to the machine, or to have end users deploy the ImmyBot Agent.

## Sandbox
The best option for testing deployments on the fly. Do not use this option for testing Automatic Onboarding, Sandbox instances get reverted by [Windows on instance reboot](https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/).

See [Windows Sandbox](/Documentation/Administration/windows-sandbox.md) for more information