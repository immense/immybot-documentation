
# Troubleshooting Guide

> [!WARNING] *ImmyBot's EV code-signing certificate is changing on Feb. 11th, 2025*
> Please see the [FAQ section for more details](https://docs.immy.bot/FAQ.html#what-should-i-do-about-immybot-s-upcoming-code-signing-certificate-change) on updating security exclusions.

::: danger *ImmyBot no longer supports Windows 7, Server 2008 (or Server 2012 w/o [ESUs](https://learn.microsoft.com/en-us/windows-server/get-started/extended-security-updates-overview)) machines.*
Please see the [FAQ section for more details](https://docs.immy.bot/FAQ.html#what-windows-versions-does-immyagent-support)
:::

This comprehensive guide will help you troubleshoot common issues with ImmyBot, including agent connectivity problems, identification failures, security software conflicts, and more. Follow the step-by-step instructions to diagnose and resolve issues quickly.

## Table of Contents

- [Identification Failures](#identification-failures)
- [Pending Computers](#pending-computers)
- [Security Software Exclusions](#security-software-exclusions)
- [Working With Support](#working-with-support)


## Identification Failures

### Needs a Manual Decision

Generally you will click "Agent Re-installed"

Often when an RMM Agent gets re-installed, it will get a new id in the RMM (ComputerId in Automate, SessionID in Control). ImmyBot will recognize that it is the same computer, but due to the fact that virtualization technologies and hard drive cloning can lead to the same scenario, we require you to tell us whether we should overwrite the existing RmmComputer, or keep both. 99% of the time you will click "Overwrite Existing". If the machine was in fact cloned, you would click Keep Both, in which case Immy shims the duplicate UUID with its own to prevent collisions.

## Pending Computers

Computers in the pending status have yet to be identified.

Computers may get stuck here if we are unable to run our Ephemeral Agent

```mermaid
graph TD
    CheckImmyAgentLogs[Check ImmyAgent Logs in C:\ProgramData\ImmyBot\Logs] --> DidEphemeralAgentStart[Immybot.Agent.Ephemeral.exe start?]
    DidEphemeralAgentStart --> |Yes|CheckEphemeralAgentLogs[Check Ephemeral Agent logs in C:\ProgramData\ImmyBot\Scripts\*\*.log]
    DidEphemeralAgentStart --> |No|BlockedBySecuritySoftware[Exclude Script Path from Security Software]
    CheckEphemeralAgentLogs --> EphemeralAgentConnect[Did Ephemeral Agent Websocket Connect?]
    EphemeralAgentConnect -->|Yes|DidSuccessfullyIdentifyAfterFix
    EphemeralAgentConnect --> |No|TryNoSSLInspect[Put on network without SSL Inspection]
    TryNoSSLInspect --> DidSuccessfullyIdentifyAfterFix[Ephemeral Agent Connect After Fix?]
    DidSuccessfullyIdentifyAfterFix[Machine Identify Successfully?] --> |No|EmailSupport
    DidSuccessfullyIdentifyAfterFix[Machine Identify Successfully?] --> |Yes|Done
    EmailSupport["Email logs from C:\ProgramData\ImmyBot\Logs and C:\ProgramData\ImmyBot\Scripts\*\*.logs to support@immy.bot"]
```

Top 3 reasons for Identification Failures

1. SSL Inspection blocking our websocket
1. Security Software blocking PowerShell
1. Incorrect time is preventing SSL/TLS connection

To understand the various reasons identification can fail, it helps to understand how ImmyBot executions PowerShell

1. RMM or ImmyAgent runs Immybot.Agent.Ephemeral.exe
1. Immybot.Agent.Ephemeral.exe establishes a secure websocket to wss://subdomain.immy.bot and runs Invoke-PSPipeHost.ps1
1. Immybot.Agent.Ephemeral.exe feeds Invoke-PSPipeHost.ps1 PowerShell over a pipe from the websocket session

```mermaid
graph LR
    ImmyBot --> |Parallel|Automate[Run script to download and run Ephemeral Agent via Automate]
    ImmyBot --> |Parallel|Control[Run script to download and run Ephemeral Agent via Control]
    ImmyBot --> |Parallel|ImmyAgent[Run script to download and run Ephemeral Agent via ImmyAgent]
    ImmyBot --> |Parallel|N-Central[Run script to download and run Ephemeral Agent via N-Central]
    Automate --> Immybot.Agent.Ephemeral.exe
    Control --> Immybot.Agent.Ephemeral.exe
    ImmyAgent --> Immybot.Agent.Ephemeral.exe
    N-Central --> Immybot.Agent.Ephemeral.exe
    Immybot.Agent.Ephemeral.exe --> cmd.exe --> powershell.exe --> Invoke-PSPipeHost.ps1
```

The most common cause of identification failure is security software.

To know if this is the case, pull the logs from C:\ProgramData\ImmyBot\Logs and C:\ProgramData\ImmyBot\Scripts\*\*.logs

Normal Immybot Agent logs look like this:

```
2022-06-14 00:02:25.560 -05:00 [DBG] Hosting starting
2022-06-14 00:02:25.799 -05:00 [INF] Starting Immybot Agent
2022-06-14 00:02:25.943 -05:00 [INF] Using configuration file stored at: C:\ProgramData\ImmyBotAgentService\config.json
2022-06-14 00:02:26.875 -05:00 [DBG] Initializing IoT Hub connection
2022-06-14 00:02:35.023 -05:00 [INF] Application started. Hosting environment: Production; Content root path: C:\WINDOWS\TEMP\.net\Immybot.Agent.Service\lreaszzz.wwx\
2022-06-14 00:02:35.024 -05:00 [DBG] Hosting started
2022-06-14 00:02:40.552 -05:00 [WRN] IoT Hub connection status Changed Status => [Connected] Reason => [Connection_Ok]
2022-06-14 02:06:32.159 -05:00 [DBG] Process started; ID: 12724
2022-06-14 02:06:37.358 -05:00 [DBG] Running C:\ProgramData\ImmyBot\Scripts\840290f2bd2142e2bd2c612542436763\Immybot.Agent.Ephemeral.exe --ImmyScriptPath C:\ProgramData\ImmyBot\Scripts\840290f2bd2142e2bd2c612542436763 --BackendAddress wss://immense.immy.bot/ --SessionID c946e1d1-f5fd-d36d-0489-d2a9ad9084e0
2022-06-14 02:06:38.335 -05:00 [DBG] PID 16184 <----- Indicates successful execution
2022-06-14 02:06:38.372 -05:00 [DBG] Process exited; Code: 0
```

Windows Defender will make the logs look like this:

```
2022-11-17 13:13:36.604 +11:00 [DBG] Hosting starting
2022-11-17 13:13:36.817 +11:00 [INF] Starting Immybot Agent
2022-11-17 13:13:36.840 +11:00 [INF] Using configuration file stored at: C:\ProgramData\ImmyBotAgentService\config.json
2022-11-17 13:13:37.590 +11:00 [DBG] Initializing IoT Hub connection
2022-11-17 13:13:37.860 +11:00 [DBG] Hosting started
2022-11-17 13:13:38.598 +11:00 [WRN] IoT Hub connection status Changed Status => [Connected] Reason => [Connection_Ok]
2022-11-17 13:13:39.157 +11:00 [WRN] Dirty-Shutdown detected! Dirty-File created at: "2022-11-07T04:11:59.3975026Z" UTC
2022-11-17 13:13:41.686 +11:00 [DBG] Process started; ID: 5660
2022-11-17 13:13:44.674 +11:00 [DBG] Running C:\ProgramData\ImmyBot\Scripts\4303da9b790b41c6978b50b872fe17cb\Immybot.Agent.Ephemeral.exe --ImmyScriptPath C:\ProgramData\ImmyBot\Scripts\4303da9b790b41c6978b50b872fe17cb --BackendAddress wss://ericom.immy.bot/ --SessionID a92c0ed1-ea3b-7f8a-d9c6-946d9b44ccc5
2022-11-17 13:13:49.577 +11:00 [DBG] WMI Error 2
```

DNS Filtering/Issues make the logs look like this

```
2022-09-20 20:39:59.712 +10:00 [INF] RESPONSE: {
  "Resource": "installer/challenge/request",
  "Method": "POST",
  "StatusCode": 0,
  "ErrorException": {
    "ClassName": "System.Net.WebException",
    "Message": "No such host is known. (XXXX.immy.bot:443)"
```

To correct it, you need to exclude DNS filtering for your instances hostnames, which are found under
 Show more > integrations > Fetch IP Address and Hostnames

If Powershell is failing to start on the endpoint within 60 seconds a timeout will occur.

Here is a suggestion on a cause and possible fix for that one <https://www.reddit.com/r/PowerShell/comments/rx68fw/powershell_slow_to_open_long_load_timesfixed>

## Security Software Exclusions

Ideally you would instruct your security software would support excluding code signed by

::: warning
ImmyBot's current code-signing certificate is set to change on Feb. 11th, 2025.
Please add both our upcoming and existing certificate exlusions to ensure no issues.

Please see the [FAQ section for more details](https://docs.immy.bot/FAQ.html#what-should-i-do-about-immybot-s-upcoming-code-signing-certificate-change)
:::
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

Add ***both*** certificates to avoid issues if following before Feb. 11th, 2025 ***OR*** your instance has existing machines installed (which may have agents installed with older certificate)!

Exclusions based on code signing certificate are an industry standard feature and should be a standard feature in any best-in-class security software. However, if your security software is unable to exclude based on code signing certificate, create an exclusion for your instance's Script Path.

Your script path can be found under Settings->Preferences->Script Path

![image](https://user-images.githubusercontent.com/1424395/173610304-50bab775-c7c8-40b3-944e-fab1dde862ee.png)


- [Troubleshooting](#troubleshooting)
  - [Identification Failures](#identification-failures)
    - [Needs a Manual Decision](#needs-a-manual-decision)
  - [Pending Computers](#pending-computers)
  - [Security Software Exclusions](#security-software-exclusions)
    - [ThreatLocker](#threatlocker)
    - [Sophos Central](#sophos-central)
    - [BitDefender](#bitdefender)
    - [CrowdStrike](#crowdstrike)
    - [Microsoft Defender for Endpoint](#microsoft-defender-for-endpoint)
    - [Cylance](#cylance)
    - [SentinelOne](#sentinelone)
    - [DNSFilter](#dnsfilter)
    - [Group Policy Objects](#group-policy-objects)
  - [Working With Support](#working-with-support)
    - [Gather an Endpoint Trace Log](#gather-an-endpoint-trace-log)
    - [MDMDiagnostics Logs](#mdmdiagnostics-logs)

### ThreatLocker

1. Application Control-> Applications
2. Create New Application
3. Put the following value into Certificate and click Add

::: warning
ImmyBot's current code-signing certificate is set to change on Feb. 11th, 2025.
Please add both our upcoming and existing certificate exlusions to ensure no issues.

Please see the [FAQ section for more details](https://docs.immy.bot/FAQ.html#what-should-i-do-about-immybot-s-upcoming-code-signing-certificate-change)
:::
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

Add ***both*** certificates to avoid issues if following before Feb. 11th, 2025 ***OR*** your instance has existing machines installed (which may have agents installed with older certificate)!

1. Add your instance’s [script path](#script-path-exclusion)
![image](https://user-images.githubusercontent.com/1424395/173602708-b8e239f8-efaa-4e16-a29c-9fb66f72e616.png)
Ultimately it should look like this:
![image](https://user-images.githubusercontent.com/1424395/173602739-2b60922f-5ac8-4d4c-bc93-d52a390e129e.png)
1. Create a New Application Policy
 ![image](https://user-images.githubusercontent.com/1424395/173602798-7042c0ea-1406-476c-a291-0deee6e843c5.png)

### Sophos Central

**Tenant Specific**
Manual Addition:

1. Launch Client Shell
2. Navigate to Global Settings - Allowed Applications
3. Select "Add apps"
4. In the "allow by:" dropdown, select certificate and add the following

```
CN=Immense Networks LLC, O=Immense Networks, L=Baton Rouge, S=Louisiana, C=US
```

Event Log Method:
If Sophos reports that Immy Bot has been blocked, you have the option of going to the Event Log and and select the option to allow by Certificate. This will only work if Sophos has picked up an alert for a process signed by the Immy Bot code signing certificate

**Partner Global Templates**

1. Navigate to Settings & Policies - Global Templates and select the template you would like to modify
2. Once in the template, navigate to Global Settings - Allowed Applications
3. Follow steps 3 and 4 listed in the **Tenant Specific** section above

### BitDefender

BitDefender will intermittently block script execution unless you disable Aggressive scanning mode or add a your instance's [Script Path](#security-software-exclusions) to your policy's exclusion list.

1. Edit the policy->Antimalware->Settings->In-policy Exclusions
2. Add a folder exclusion for your [Script Path](#security-software-exclusions)

### CrowdStrike

CrowdStrike uses AI to decide what to allow and disallow. Periodically this AI will mark the ImmyBot Agent or ImmyBot Ephemeral Agent as malicious. This usually happens after we update it. Marking it as a false positive in your CrowdStrike portal will train the global AI to not treat it as malicious.

### Microsoft Defender for Endpoint

Add a your instance's [Script Path](#security-software-exclusions) to your policy's exclusion list.
<https://docs.microsoft.com/en-us/mem/intune/configuration/device-restrictions-configure#create-the-profile>

### Cylance

Cylance blocks our websocket making the ImmybotAgent log look like this:

```
2022-09-21 12:24:26.562 -04:00 [INF] Process exiting.
2022-09-21 12:24:40.106 -04:00 [DBG] Closing Websocket...
2022-09-21 12:24:49.743 -04:00 [INF] Marked ConnectionState as disconnected.
2022-09-21 12:24:50.171 -04:00 [ERR] Application shutting down (App lifetime token cancelled)
System.IO.IOException: Cannot access a closed stream.
at System.Net.Http.HttpConnection.RawConnectionStream.WriteAsync(ReadOnlyMemory`1 buffer, CancellationToken cancellationToken)
```

To correct it, you need to bypass SSL Inspection for your instances hostnames/IPs, which are found under
 Show more > integrations > Fetch IP Address and Hostnames

### SentinelOne

 Sentinel requires BOTH your instance's Script path and the ImmyBot Agent process excluded. With only the script path excluded, devices will regularly have issues running the ImmyBot Agent to download the ephemeral agent. This is apparent in two cases:
  1. Importing devices - The new agent can't download the ephemeral agent to start running inventory.
   2. Updating ImmyBot Agents - The new agent can't download the corresponding new ephemeral agent when attempting to run deployments or scripts.

You can also set your Exclusion Mode to "Interoperability - Extended".

### DNSFilter

There have been reports indicating that DNSFilter, along with potentially other DNS filtering tools, is not directly blocking subdomain.immy.bot but has failed to resolve some DNS queries.

Specifically, in the case of DNSFilter, it was confirmed that ImmyBot was not being blocked. However, the failure in DNS resolution meant that connection attempts to the backend were unsuccessful.

Explicitly allowing the DNS for subdomain.immy.bot (replacing "subdomain" with your specific ImmyBot instance subdomain) was verified to resolve the issue of failed DNS resolutions.

For guidance on managing allow and block lists, please refer to: https://help.dnsfilter.com/hc/en-us/articles/1500008111381-Allow-and-Block-Lists

### Group Policy Objects

PowerShell execution policies set through Group Policy can affect ImmyBot's ability to run scripts. Ensure the following GPO settings are configured correctly:

**Required GPO Settings:**
- Computer Configuration | Policies | Administrative Templates | Windows Components | Windows PowerShell | Turn on Script Execution (Enabled)
- User Configuration | Policies | Administrative Templates | Windows Components | Windows PowerShell | Turn on Script Execution (Enabled)

These GPOs have been known to cause issues with running scripts if not properly configured. We recommend setting the execution policy to "RemoteSigned" or "Unrestricted" for ImmyBot to function properly.

## Working With Support

When you've tried all the troubleshooting steps and still need assistance, our support team is ready to help.

**Support Contact Information:**
- Email: `support@immy.bot`
- Support Portal: [https://support.immy.bot](https://support.immy.bot)

### Preparing for Support

To help our support team resolve your issue quickly, please provide the following information:

1. **Detailed Description:**
   - What you were trying to do
   - What happened instead
   - Any error messages you received
   - When the issue started occurring

2. **Environment Information:**
   - ImmyBot version
   - Agent version
   - Operating system version
   - Security software in use

3. **Logs and Diagnostics:**
   - Agent logs from C:\ProgramData\ImmyBot\Logs
   - Script logs from C:\ProgramData\ImmyBot\Scripts\*\*.logs
   - Any additional diagnostic information as described below

### Gather an Endpoint Trace Log

Windows Performance Recorder can generate a detailed log of an endpoint's activity, which can be used to identify environmental causes for issues running the ImmyBot Agent.

> [!NOTE]
> These traces can be resource intensive and may require 2-4 GB available RAM, depending on how active an endpoint is and how long a trace is running.

**Steps to Collect a Trace:**

1. From an elevated CMD prompt, run:
```bat
wpr.exe -start CPU -start Minifilter -start FileIO -start Registry
```
2. Recreate the issue that you're experiencing.
3. Wait 3-5 minutes, depending on the available RAM, and run:
```bat
wpr.exe -stop "C:\PerfLogs\examplefilename.etl" -compress
```

If the `wpr -stop` command fails, try running without the "-compress" parameter.

This ETL file can be reviewed in Windows Performance Analyzer from the Windows Performance Toolkit SDK.

### MDMDiagnostics Logs

For issues with device enrollment, MDMDiagnostics logs can help identify the root cause.

**Steps to Collect MDM Diagnostics:**

1. From an elevated CMD Prompt, run:
```bat
MDMdiagnosticstool.exe -area "DeviceProvisioning;DeviceEnrollment" -cab "C:\Temp\MDMDiag_Log.cab"
```

2. The cab file may be too large to email, so you can create a cloud share and send the link to `support@immy.bot`.

## Next Steps

After resolving your issue, consider reviewing these related resources:

- [Common Issues](./common-issues.md) - Solutions to frequently encountered problems
- [Security Software Configuration](./security-software.md) - Configure security software to work with ImmyBot
- [FAQ](./FAQ.md) - Answers to common questions about ImmyBot

---

**Next Steps:** [Common Issues →](./common-issues.md) | [Security Software Configuration →](./security-software.md)

