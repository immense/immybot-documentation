# System Status

The System Status page in ImmyBot provides detailed information about the health and performance of your ImmyBot instance. This page explains the various metrics and actions available on the System Status page.

## Understanding System Metrics

The System Status page displays various metrics organized into sections:

### Application Metrics

These metrics provide information about the overall health of the ImmyBot application:

- **Server Performance**: CPU, memory, and disk usage
- **Database Performance**: Query times and connection status
- **API Performance**: Response times and request counts
- **Background Jobs**: Status of scheduled tasks and maintenance operations

### Integration Metrics

These metrics show the status of your integrations with external systems:

- **Connection Status**: Whether the integration is connected and functioning
- **API Calls**: Number of API calls made to the external system
- **Sync Status**: Status of data synchronization with the external system
- **Error Rates**: Frequency of errors encountered with the integration

### Circuit Breaker Policies

Circuit breakers protect the system from cascading failures by temporarily disabling problematic components:

- **Closed**: Working normally - the policy is allowing execution
- **Open**: Not working because failed - the policy is not allowing execution to occur because an exception occurred. It will automatically switch to closed after a certain period of time
- **Isolated**: Intentionally not working - someone has manually opened the circuit. It will not automatically switch back to closed unless the server restarts

## Ephemeral Agent Metrics

Ephemeral Agents are temporary agents that execute specific tasks on computers. The System Status page provides detailed metrics about these agents:

### Ephemeral Agent Session Handler Metrics

- **Created Ephemeral Sessions**: The rate at which Ephemeral Sessions (also known as Ephemeral Agents) are being created.
- **Force-Terminated Zombie Sessions**: The rate at which Ephemeral Sessions are 'forcefully' ended. This specifically means the session never connected to the backend within a timeout period, and is unresponsive (thus is a 'Zombie').
- **Total watched Sessions**: The total number of sessions currently being handled by backend. This will be **Second-class Sessions** + **First-class Sessions** + **Sessions that haven't established a connection yet**. The difference of the total watched and [First+Second]-class is the number of sessions that haven't established a first connection yet.
- **Completed Ephemeral Sessions**: The rate at which Ephemeral Sessions are being gracefully ended/completed. Graceful shutdown of session happens when session has surpassed idle timeout or max allowable lifespan.
- **Ephemeral Agent Lifespan**: The histogram breaks down statistics about Ephemeral session lifespans (how long they are active on a computer before being ended).
- **Ephemeral Agent Lifespan Executions**: The histogram breaks down statistics about Ephemeral session lifespan-executions (how many commands [upgrade/downgrade/PoSH-exec] the session executed before being ended).
- **Ended Idle Sessions**: The rate at which Ephemeral Sessions are being ended as they exceeded idle timeout (usually, 5 mins). Idle is where an Ephemeral Sessions is running but there are no pending commands for it to be running.
- **Ended Expired Sessions**: The rate at which Ephemeral Sessions are being ended as they exceeded max allowable lifespan (usually, 25 mins). The sessions have a max sessions lifespan to ensure we are cycling around sessions efficiently.

## Administrative Actions

The System Status page provides several administrative actions that can be performed:

### Restarting ImmyBot

If you encounter issues with your ImmyBot instance, you can restart it from the System Status page:

1. Click the **Restart immy.bot** button at the top of the page
2. Confirm the restart when prompted
3. Wait for the application to restart (this typically takes a few minutes)

> **Note:** Restarting ImmyBot will temporarily make the application unavailable. Only perform this action when necessary and preferably during off-hours.

### Managing Circuit Breakers

Circuit breakers can be manually controlled from the System Status page:

1. Click the **toggle** button next to "Circuit Breaker Policies" to show the policies
2. For each circuit breaker, you can:
   - Click **Open Indefinitely** to manually open the circuit
   - Click **Reset (close circuit)** to manually close the circuit

### Refreshing Metrics

Each section of metrics can be refreshed independently:

1. Click the **Refresh** button at the top of the section
2. The metrics will be updated with the latest data

## Troubleshooting

### High Resource Usage

If you notice high CPU, memory, or disk usage:

1. Check for large maintenance sessions running simultaneously
2. Look for background tasks that might be consuming resources
3. Consider scaling up your ImmyBot server if resource usage is consistently high

### Integration Issues

If you're experiencing problems with integrations:

1. Check the integration metrics for error rates
2. Verify that the integration credentials are still valid
3. Ensure that the external system is accessible from your ImmyBot server

### Circuit Breaker Activations

If circuit breakers are frequently activating:

1. Identify which component is causing the issues
2. Check the logs for specific error messages
3. Address the underlying issue before resetting the circuit breaker

## Best Practices

### Regular Monitoring

- Check the System Status page regularly to identify potential issues
- Set up alerts for critical metrics
- Monitor trends over time to identify gradual degradation

### Maintenance Windows

- Schedule regular maintenance windows for system updates
- Perform restarts during off-hours to minimize disruption
- Notify users before performing maintenance actions

### Documentation

- Document baseline metrics for your environment
- Keep records of any system issues and their resolutions
- Document any custom configurations or optimizations

## Related Topics

- [Maintenance Sessions](./maintenance-sessions.md)
- [Agent Installation](./agent-installation.md)
- [Troubleshooting](./troubleshooting.md)

---

**Next Steps:** [Troubleshooting →](./troubleshooting.md) | [Maintenance Sessions →](./maintenance-sessions.md)
