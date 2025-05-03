# Maintenance Sessions

Maintenance Sessions are the core mechanism through which ImmyBot applies deployments to managed computers. This page explains how maintenance sessions work and how to manage them effectively.

## Understanding Maintenance Sessions

A Maintenance Session is a scheduled or on-demand process that evaluates all applicable deployments for a computer and applies them according to their settings. During a maintenance session, ImmyBot:

1. Evaluates which deployments apply to the computer
2. Determines the current state of each deployment
3. Takes actions to bring the computer into compliance
4. Records the results for reporting and troubleshooting

## Types of Maintenance Sessions

ImmyBot supports several types of maintenance sessions:

### Scheduled Maintenance

Scheduled maintenance runs automatically at defined intervals:

- **Daily**: Runs every day at a specified time
- **Weekly**: Runs on specific days of the week
- **Monthly**: Runs on specific days of the month
- **Custom**: Runs according to a custom schedule

### On-Demand Maintenance

On-demand maintenance is triggered manually:

- **Single Computer**: Run maintenance on a specific computer
- **Computer Group**: Run maintenance on a group of computers
- **Tenant**: Run maintenance on all computers in a tenant

### Onboarding Maintenance

Onboarding maintenance runs when a computer is first added to ImmyBot:

- Applies all deployments with the "Onboarding" enforcement type
- Sets up the initial configuration for the computer
- Establishes a baseline for future maintenance

## Maintenance Session Process

### Session Phases

A maintenance session proceeds through several phases:

1. **Initialization**: Gathering computer information and applicable deployments
2. **Evaluation**: Determining which deployments need to be applied
3. **Execution**: Applying deployments in the correct order
4. **Completion**: Recording results and generating reports

### Deployment Resolution

When multiple deployments target the same software or task, ImmyBot follows these resolution rules:

1. **Local deployments** take precedence over recommended deployments
2. **More specific targets** take precedence over less specific ones
3. **Required enforcement** takes precedence over optional or adhoc

For more details, see the [Deployment Resolution](./deployment-resolution) documentation.

## Managing Maintenance Sessions

### Scheduling Maintenance

To schedule regular maintenance:

1. Navigate to **Settings** > **Maintenance Schedules**
2. Click **Add Schedule**
3. Configure the schedule:
   - Name
   - Frequency (daily, weekly, monthly)
   - Time
   - Target computers or tenants
4. Click **Save**

### Running On-Demand Maintenance

To run maintenance immediately:

1. Navigate to **Computers**
2. Select one or more computers
3. Click **Run Maintenance**
4. Configure the maintenance options:
   - Include required deployments
   - Include optional deployments
   - Include adhoc deployments
5. Click **Run**

### Monitoring Maintenance

To monitor ongoing maintenance:

1. Navigate to **Maintenance** > **Active Sessions**
2. View the list of active maintenance sessions
3. Click on a session to see detailed progress

### Reviewing Maintenance History

To review past maintenance sessions:

1. Navigate to **Maintenance** > **History**
2. Filter by date, computer, or tenant
3. Click on a session to see detailed results

## Maintenance Session Results

### Success States

Maintenance actions can have several success states:

- **Success**: The action completed successfully
- **Already Compliant**: No action was needed
- **Skipped**: The action was skipped due to dependencies or conditions
- **Not Applicable**: The action does not apply to this computer

### Failure States

Maintenance actions can also have failure states:

- **Error**: The action encountered an error
- **Timeout**: The action took too long to complete
- **Dependency Failure**: A required dependency failed
- **Incompatible**: The action is not compatible with the computer

## Troubleshooting

### Common Issues

- **Connection Issues**: Ensure the computer is online and accessible
- **Agent Issues**: Verify the ImmyBot agent is running
- **Permission Issues**: Check that the agent has the necessary permissions
- **Resource Issues**: Ensure the computer has sufficient resources
- **Script Errors**: Review script logs for syntax or logic errors

### Maintenance Logs

To view detailed logs for a maintenance session:

1. Navigate to **Maintenance** > **History**
2. Find the session in the list
3. Click on the session to open the details
4. Review the logs for each action

### Retrying Failed Actions

To retry failed maintenance actions:

1. Navigate to **Maintenance** > **History**
2. Find the session with failed actions
3. Click on the session to open the details
4. Select the failed actions
5. Click **Retry**

## Best Practices

### Scheduling

- **Off-Hours Maintenance**: Schedule routine maintenance during off-hours
- **Staggered Schedules**: Stagger maintenance for large groups of computers
- **Maintenance Windows**: Align with organizational maintenance windows
- **Frequency**: Balance frequency with business needs

### Performance

- **Batch Size**: Limit the number of computers in simultaneous maintenance
- **Resource Monitoring**: Monitor resource usage during maintenance
- **Dependency Management**: Properly manage dependencies between deployments
- **Timeout Settings**: Configure appropriate timeouts for actions

### Reporting

- **Regular Reviews**: Regularly review maintenance results
- **Trend Analysis**: Look for patterns in failures or issues
- **Documentation**: Document recurring issues and solutions
- **Stakeholder Communication**: Share maintenance results with stakeholders

## Related Topics

- [Deployments](./deployments)
- [Deployment Resolution](./deployment-resolution)
- [Maintenance Tasks](./maintenance-tasks)
- [Troubleshooting](./troubleshooting)
