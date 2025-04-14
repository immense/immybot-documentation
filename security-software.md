# Security Software Configuration

This guide provides detailed instructions for configuring various security software products to work properly with ImmyBot. Proper configuration ensures that the ImmyBot agent can function correctly while maintaining security.

## Why Security Software Configuration Is Necessary

Security software such as antivirus, anti-malware, and endpoint protection solutions can sometimes interfere with ImmyBot's operations by:

- Blocking agent installation
- Preventing script execution
- Interfering with software deployment
- Blocking remote management functions

Configuring exclusions for ImmyBot in your security software allows the agent to function properly while maintaining protection for the rest of the system.

## General Exclusion Guidelines

Regardless of which security software you use, you should configure the following exclusions:

### File and Folder Exclusions

Add these paths to your file/folder exclusion list:

```
C:\Program Files\ImmyBot\*
C:\Program Files (x86)\ImmyBot\*
C:\Windows\Temp\ImmyBot\*
C:\Windows\Temp\*.ps1
C:\Windows\Temp\*.bat
C:\Windows\Temp\*.exe
C:\Windows\Temp\*.msi
```

### Process Exclusions

Add these processes to your process exclusion list:

```
C:\Program Files\ImmyBot\ImmyAgent.exe
C:\Program Files\ImmyBot\ImmyUpdater.exe
C:\Program Files (x86)\ImmyBot\ImmyAgent.exe
C:\Program Files (x86)\ImmyBot\ImmyUpdater.exe
```

### Network Exclusions

Allow these network connections:

```
*.immy.bot:443
*.immy.bot:80
```

## Microsoft Defender

### Configuring Microsoft Defender via Group Policy

1. Open the Group Policy Management Console
2. Create or edit a policy that applies to your managed computers
3. Navigate to **Computer Configuration** > **Administrative Templates** > **Windows Components** > **Microsoft Defender Antivirus** > **Exclusions**
4. Configure the following settings:

#### Path Exclusions

1. Open **Path Exclusions**
2. Set to **Enabled**
3. Click **Show**
4. Add each path listed in the General Exclusion Guidelines
5. Click **OK** to save

#### Process Exclusions

1. Open **Process Exclusions**
2. Set to **Enabled**
3. Click **Show**
4. Add each process listed in the General Exclusion Guidelines
5. Click **OK** to save

### Configuring Microsoft Defender via PowerShell

Run the following PowerShell commands as Administrator:

```powershell
# Add path exclusions
Add-MpPreference -ExclusionPath "C:\Program Files\ImmyBot"
Add-MpPreference -ExclusionPath "C:\Program Files (x86)\ImmyBot"
Add-MpPreference -ExclusionPath "C:\Windows\Temp\ImmyBot"
Add-MpPreference -ExclusionPath "C:\Windows\Temp\*.ps1"
Add-MpPreference -ExclusionPath "C:\Windows\Temp\*.bat"
Add-MpPreference -ExclusionPath "C:\Windows\Temp\*.exe"
Add-MpPreference -ExclusionPath "C:\Windows\Temp\*.msi"

# Add process exclusions
Add-MpPreference -ExclusionProcess "C:\Program Files\ImmyBot\ImmyAgent.exe"
Add-MpPreference -ExclusionProcess "C:\Program Files\ImmyBot\ImmyUpdater.exe"
Add-MpPreference -ExclusionProcess "C:\Program Files (x86)\ImmyBot\ImmyAgent.exe"
Add-MpPreference -ExclusionProcess "C:\Program Files (x86)\ImmyBot\ImmyUpdater.exe"
```

## Sophos

### Configuring Sophos Central

1. Log in to Sophos Central
2. Navigate to **Endpoint Protection** > **Anti-Virus** > **Exclusions**
3. Click **Add Exclusion**
4. Select **Windows**
5. Configure the following exclusions:

#### File and Folder Exclusions

1. Select **Scan Exclusion**
2. Choose **File/Folder**
3. Add each path listed in the General Exclusion Guidelines
4. Click **Add Exclusion**

#### Process Exclusions

1. Select **Authorization**
2. Choose **Process**
3. Add each process listed in the General Exclusion Guidelines
4. Click **Add Exclusion**

### Configuring Sophos Enterprise Console

1. Open Sophos Enterprise Console
2. Select the computers or groups to configure
3. Right-click and select **Configure Anti-virus** > **Exclusions**
4. Add each path and process listed in the General Exclusion Guidelines
5. Click **OK** to save

## Webroot

### Configuring Webroot via Console

1. Log in to the Webroot Management Console
2. Navigate to **Group Settings** > **Policies**
3. Select the policy to edit
4. Click **Override** next to **Scan Exclusions**
5. Add the following exclusions:

#### File and Folder Exclusions

1. Click **Add**
2. Select **File/Folder Path**
3. Add each path listed in the General Exclusion Guidelines
4. Click **Save**

#### Process Exclusions

1. Click **Add**
2. Select **Process**
3. Add each process listed in the General Exclusion Guidelines
4. Click **Save**

### Configuring Webroot Locally

1. Open Webroot SecureAnywhere on the computer
2. Click **PC Security**
3. Click **Advanced Settings**
4. Select **Exclusions**
5. Add each path and process listed in the General Exclusion Guidelines
6. Click **Save**

## Bitdefender

### Configuring Bitdefender GravityZone

1. Log in to the GravityZone Control Center
2. Navigate to **Policies**
3. Edit the policy applied to your managed computers
4. Select **Antimalware** > **Advanced** > **Exclusions**
5. Configure the following exclusions:

#### File and Folder Exclusions

1. Click **Add** under **Scan Exclusions**
2. Select **Path**
3. Add each path listed in the General Exclusion Guidelines
4. Click **OK**

#### Process Exclusions

1. Click **Add** under **Process Exclusions**
2. Add each process listed in the General Exclusion Guidelines
3. Click **OK**

### Configuring Bitdefender Endpoint Security Tools

1. Open Bitdefender Endpoint Security Tools
2. Click **Settings**
3. Select **Antimalware** > **Exclusions**
4. Add each path and process listed in the General Exclusion Guidelines
5. Click **Save**

## ESET

### Configuring ESET Remote Administrator

1. Log in to ESET Remote Administrator
2. Navigate to **Policies**
3. Create or edit a policy
4. Navigate to **Detection Engine** > **Exclusions**
5. Configure the following exclusions:

#### Path Exclusions

1. Click **Add** under **Performance Exclusions**
2. Add each path listed in the General Exclusion Guidelines
3. Click **OK**

#### Process Exclusions

1. Click **Add** under **Process Exclusions**
2. Add each process listed in the General Exclusion Guidelines
3. Click **OK**

### Configuring ESET Endpoint Security Locally

1. Open ESET Endpoint Security
2. Press **F5** to access Advanced Setup
3. Navigate to **Detection Engine** > **Exclusions**
4. Add each path and process listed in the General Exclusion Guidelines
5. Click **OK**

## SentinelOne

### Configuring SentinelOne via Management Console

1. Log in to the SentinelOne Management Console
2. Navigate to **Sentinels** > **Exclusions**
3. Click **New Exclusion**
4. Configure the following exclusions:

#### Path Exclusions

1. Select **Path Exclusion**
2. Choose **Windows** as the OS
3. Set **Type** to **Exact Match**
4. Add each path listed in the General Exclusion Guidelines
5. Click **Create**

#### Process Exclusions

1. Select **Process Exclusion**
2. Choose **Windows** as the OS
3. Set **Type** to **Exact Match**
4. Add each process listed in the General Exclusion Guidelines
5. Click **Create**

## CrowdStrike

### Configuring CrowdStrike Falcon

1. Log in to the CrowdStrike Falcon console
2. Navigate to **Configuration** > **Prevention Policies**
3. Select the policy to edit
4. Click **Add** under **Custom IOA Exclusions**
5. Configure the following exclusions:

#### Path Exclusions

1. Set **Type** to **Path**
2. Add each path listed in the General Exclusion Guidelines
3. Click **Save**

#### Process Exclusions

1. Set **Type** to **Process**
2. Add each process listed in the General Exclusion Guidelines
3. Click **Save**

## Verifying Exclusions

After configuring exclusions, verify that they're working correctly:

1. Install or update the ImmyBot agent on a test computer
2. Run a maintenance session that includes software installation
3. Check for any security alerts or blocked actions
4. Review the maintenance session logs for any security-related failures
5. Adjust exclusions as needed based on your findings

## Troubleshooting

If you're still experiencing issues after configuring exclusions:

### Common Problems and Solutions

1. **Agent Installation Blocked**
   - Temporarily disable security software during installation
   - Verify that all installation paths are excluded
   - Check security software logs for specific blocked actions

2. **Scripts Not Running**
   - Ensure PowerShell execution policy is properly configured
   - Verify that script paths are excluded
   - Check for script scanning features that might need configuration

3. **Software Deployment Failures**
   - Check if the security software is quarantining installation files
   - Verify that temporary folders are excluded
   - Look for real-time protection features that might need adjustment

### Security Software Logs

Most security software products maintain detailed logs of blocked actions. Check these logs to identify specific files or processes that need to be excluded:

1. Look for entries related to ImmyBot
2. Note any blocked files, processes, or network connections
3. Add these to your exclusions
4. Test again to verify the issue is resolved

## Next Steps

After configuring your security software:

- [Agent Troubleshooting](./troubleshooting.md) - For more detailed agent troubleshooting
- [Common Issues](./common-issues.md) - For other common ImmyBot issues
- [Integration Overview](./integration-overview.md) - To integrate ImmyBot with your security tools

---

**Next Steps:** [Agent Troubleshooting →](./troubleshooting.md) | [Common Issues →](./common-issues.md)
