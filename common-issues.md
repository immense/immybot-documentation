# Common Issues

This guide addresses the most frequently encountered issues in ImmyBot and provides step-by-step solutions to resolve them quickly.

## Agent Connection Issues

### Agent Shows as Offline

**Symptoms:**
- Computer appears offline in ImmyBot
- Cannot run maintenance or tasks
- Remote control options unavailable

**Troubleshooting Steps:**

1. **Verify Network Connectivity**
   - Ensure the computer has internet access
   - Check that it can reach the ImmyBot server
   - Verify firewall rules allow the connection

2. **Check Agent Service**
   - On the computer, open Services (services.msc)
   - Locate the "ImmyBot Agent" service
   - Verify it's set to Automatic and is Running
   - If not running, start the service

3. **Reinstall Agent**
   - Download the agent installer from ImmyBot
   - Uninstall the existing agent
   - Restart the computer
   - Install the new agent

4. **Check for Security Software Interference**
   - Temporarily disable security software
   - See if the agent connects
   - If it does, configure exclusions (see [Security Software Configuration](./security-software.md))

### Agent Identification Failures

**Symptoms:**
- Agent connects but shows as "Unidentified"
- Computer appears in New Computers repeatedly
- Multiple entries for the same computer

**Troubleshooting Steps:**

1. **Check Computer Name**
   - Verify the computer name is unique
   - Ensure it doesn't contain special characters

2. **Review Identification Methods**
   - Navigate to **Show more** > **Preferences** > **Agent Settings**
   - Review the identification methods and order
   - Ensure appropriate methods are enabled

3. **Check Hardware Changes**
   - Significant hardware changes can affect identification
   - Review the computer's hardware profile
   - Update identification if needed

4. **Manual Identification**
   - Locate the computer in New Computers
   - Select the computer and use the appropriate action from the action menu
   - Choose the correct existing computer to associate with this agent

## Maintenance Session Issues

### Maintenance Session Fails to Start

**Symptoms:**
- Maintenance session shows as "Pending" indefinitely
- Session never progresses to "Running"
- No actions are executed

**Troubleshooting Steps:**

1. **Check Agent Status**
   - Verify the agent is online
   - Restart the agent service if needed

2. **Check Server Load**
   - High server load can delay session starts
   - Check active sessions count
   - Consider rescheduling during off-peak hours

3. **Review Session Logs**
   - Navigate to the session details
   - Check for any error messages
   - Look for connection timeout errors

4. **Restart ImmyBot Services**
   - If you have server access, restart ImmyBot services
   - Check if sessions start properly after restart

### Software Installation Failures

**Symptoms:**
- Maintenance action shows as "Failed"
- Software not installed
- Error in installation logs

**Troubleshooting Steps:**

1. **Check Installation Source**
   - Verify the installation file is accessible
   - Check file permissions
   - Ensure the URL is valid for downloaded installers

2. **Review Installation Script**
   - Check the software's installation script
   - Look for errors or outdated commands
   - Test the script manually if possible

3. **Check Disk Space**
   - Verify sufficient disk space is available
   - Clean up temporary files if needed

4. **Check Prerequisites**
   - Ensure all prerequisites are installed
   - Verify correct order of installations
   - Check for version conflicts

5. **Review Logs**
   - Check detailed logs for the specific error
   - Look for exit codes or error messages
   - Use these to refine your troubleshooting

## Deployment Issues

### Deployment Not Applying

**Symptoms:**
- Deployment shows as active but doesn't apply
- No maintenance actions for the deployment
- Software or configuration not applied

**Troubleshooting Steps:**

1. **Check Targeting**
   - Verify the deployment targets include the computer
   - Check for exclusions that might apply
   - Test with a direct computer target

2. **Review Deployment Settings**
   - Check that the deployment is enabled
   - Verify the deployment mode is correct
   - Ensure version settings are appropriate

3. **Check Dependencies**
   - Verify any dependent software or configurations
   - Ensure prerequisites are properly deployed

4. **Force Maintenance**
   - Run a manual maintenance session
   - Select the specific deployment to apply
   - Monitor the session for issues

### Deployment Conflicts

**Symptoms:**
- Multiple deployments trying to manage the same software
- Inconsistent software versions
- Deployments overriding each other

**Troubleshooting Steps:**

1. **Identify Conflicting Deployments**
   - Search for deployments targeting the same software
   - Check for version conflicts
   - Look for different deployment modes

2. **Resolve Conflicts**
   - Disable or delete redundant deployments
   - Consolidate deployments where possible
   - Ensure consistent versioning

3. **Use Deployment Precedence**
   - Configure deployment precedence settings
   - Ensure higher-priority deployments take precedence
   - Test to verify correct behavior

## Integration Issues

### RMM Integration Not Importing Computers

**Symptoms:**
- Computers not appearing in ImmyBot
- Customer mapping issues
- Synchronization errors

**Troubleshooting Steps:**

1. **Check API Credentials**
   - Verify API key or credentials are correct
   - Ensure the API user has sufficient permissions
   - Test API connection manually if possible

2. **Review Integration Settings**
   - Check synchronization settings
   - Verify customer mapping configuration
   - Ensure correct filters are applied

3. **Check Logs**
   - Review integration logs for errors
   - Look for API rate limiting or timeout issues
   - Check for data format problems

4. **Manual Sync**
   - Trigger a manual synchronization
   - Monitor the process for errors
   - Check results after completion

### PSA Integration Ticket Issues

**Symptoms:**
- Tickets not being created
- Missing information in tickets
- Incorrect ticket assignment

**Troubleshooting Steps:**

1. **Check API Connection**
   - Verify API credentials are correct
   - Test the connection to the PSA
   - Check for API errors

2. **Review Ticket Templates**
   - Check ticket template configuration
   - Verify variable substitution is working
   - Test with a manual ticket creation

3. **Check User Mapping**
   - Verify user mapping between systems
   - Ensure technicians are properly mapped
   - Check default assignments

4. **Review Notification Settings**
   - Check which events trigger tickets
   - Verify notification settings
   - Test with a manual trigger event

## Performance Issues

### Slow Maintenance Sessions

**Symptoms:**
- Maintenance sessions take unusually long
- Actions timeout frequently
- System performance degradation during maintenance

**Troubleshooting Steps:**

1. **Check Network Performance**
   - Verify network bandwidth and latency
   - Test connection speed to the ImmyBot server
   - Check for network congestion

2. **Review Resource Usage**
   - Check CPU and memory usage during maintenance
   - Look for resource-intensive scripts
   - Monitor disk I/O performance

3. **Optimize Maintenance Windows**
   - Distribute maintenance across different time windows
   - Avoid peak usage times
   - Limit concurrent sessions

4. **Review Script Efficiency**
   - Identify slow-running scripts
   - Optimize script performance
   - Break large scripts into smaller components

### High Resource Usage

**Symptoms:**
- ImmyBot agent using excessive resources
- Server performance issues
- Slow overall system performance

**Troubleshooting Steps:**

1. **Check Agent Resource Usage**
   - Monitor agent CPU and memory usage
   - Look for spikes during specific operations
   - Check for memory leaks

2. **Review Logging Level**
   - Check logging verbosity settings
   - Reduce logging level if too verbose
   - Monitor impact on performance

3. **Update Agent**
   - Ensure you're using the latest agent version
   - Apply any available performance updates
   - Test performance after update

4. **Optimize Server Resources**
   - If hosting ImmyBot, check server resources
   - Allocate appropriate resources based on environment size
   - Consider scaling options for larger environments

## Next Steps

If you're still experiencing issues after following these troubleshooting steps:

- [Contact Support](https://support.immy.bot) for additional assistance
- Check the [Community Forums](https://community.immy.bot) for similar issues
- Review the [Agent Troubleshooting](./troubleshooting.md) guide for more detailed agent troubleshooting
- See [Security Software Configuration](./security-software.md) for security software-specific issues

---

**Next Steps:** [Agent Troubleshooting →](./troubleshooting.md) | [Security Software Configuration →](./security-software.md)
