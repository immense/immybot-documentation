# Creating Deployments

Deployments are the core of ImmyBot's functionality, defining how computers "should be" configured. This guide walks you through creating effective deployments for various scenarios.

## Understanding Deployments

A deployment in ImmyBot consists of:

- **Type**: Software, Task, or Configuration
- **Content**: The specific software, task, or configuration to apply
- **Targets**: The computers, users, or groups that should receive this deployment
- **Settings**: Additional options that control how the deployment behaves

Deployments are similar to Group Policy Objects in Windows environments but more powerful and flexible.

## Types of Deployments

ImmyBot supports three main types of deployments:

### Software Deployments

Software deployments install, update, or remove software on target computers:

- **Enforced**: Software is installed and kept at the specified version
- **Available**: Software is available for users to install on-demand
- **Removed**: Software is actively uninstalled if found

### Task Deployments

Task deployments run scripts or commands on target computers:

- **One-time**: Run once and complete
- **Recurring**: Run on a schedule
- **Compliance-based**: Run only when a computer is out of compliance

### Configuration Deployments

Configuration deployments apply settings to target computers:

- **Registry**: Set registry keys and values
- **Files**: Create, modify, or delete files
- **Settings**: Apply Windows or application settings

## Creating a Software Deployment

Follow these steps to create a software deployment:

1. **Navigate to Deployments**
   - Click on **Deployments** in the left sidebar
   - Click **Create Deployment**

2. **Enter Basic Information**
   - Enter a descriptive name for the deployment
   - (Optional) Add a description
   - Select **Software** as the deployment type

3. **Select Software**
   - Search for the software in the dropdown
   - Select the software you want to deploy
   - Choose the version (specific version or "Latest")

4. **Configure Deployment Options**
   - **Deployment Mode**: Choose Enforced, Available, or Removed
   - **Installation Context**: Select System or User
   - **Upgrade Behavior**: Define how upgrades should be handled
   - **Installation Options**: Configure software-specific options

5. **Define Targets**
   - Click **Add Target**
   - Select the target type:
     - **Computers**: Specific computers
     - **Computer Groups**: Groups of computers
     - **Users**: Specific users
     - **User Groups**: Groups of users
     - **Filter Script**: Dynamic targeting based on a script
   - Configure the selected target type
   - Add multiple targets if needed

6. **Save the Deployment**
   - Click **Save** to create the deployment
   - The deployment will be applied during the next maintenance session

## Creating a Task Deployment

Follow these steps to create a task deployment:

1. **Navigate to Deployments**
   - Click on **Deployments** in the left sidebar
   - Click **Create Deployment**

2. **Enter Basic Information**
   - Enter a descriptive name for the deployment
   - (Optional) Add a description
   - Select **Task** as the deployment type

3. **Create or Select a Task**
   - Click **Create New Task** or select an existing task
   - For a new task:
     - Enter a name and description
     - Select the execution context (System, User, Metascript, Cloud)
     - Write or paste your PowerShell script
     - Configure any parameters

4. **Configure Task Options**
   - **Execution Mode**: One-time, Recurring, or Compliance-based
   - **Schedule**: For recurring tasks, define the schedule
   - **Success Criteria**: Define what constitutes successful execution

5. **Define Targets**
   - Click **Add Target**
   - Select and configure targets as described above
   - Add multiple targets if needed

6. **Save the Deployment**
   - Click **Save** to create the deployment
   - The task will be executed according to the configured options

## Creating a Configuration Deployment

Follow these steps to create a configuration deployment:

1. **Navigate to Deployments**
   - Click on **Deployments** in the left sidebar
   - Click **Create Deployment**

2. **Enter Basic Information**
   - Enter a descriptive name for the deployment
   - (Optional) Add a description
   - Select **Configuration** as the deployment type

3. **Select Configuration Type**
   - Choose the type of configuration:
     - **Registry**: Set registry keys and values
     - **Files**: Create, modify, or delete files
     - **Settings**: Apply Windows or application settings

4. **Configure Settings**
   - For Registry: Define keys, values, and data types
   - For Files: Specify file paths, content, and actions
   - For Settings: Configure specific settings and values

5. **Define Targets**
   - Click **Add Target**
   - Select and configure targets as described above
   - Add multiple targets if needed

6. **Save the Deployment**
   - Click **Save** to create the deployment
   - The configuration will be applied during the next maintenance session

## Advanced Targeting

ImmyBot offers powerful targeting options to ensure deployments apply to the right computers:

### Filter Scripts

Filter scripts use PowerShell to dynamically determine which computers should receive a deployment:

1. Click **Add Target**
2. Select **Filter Script**
3. Write a PowerShell script that returns `$true` for computers that should receive the deployment
4. Use the `$computer` variable to access computer properties

Example filter script for Windows 10 computers with less than 8GB of RAM:

```powershell
$computer.OperatingSystem -like "*Windows 10*" -and $computer.PhysicalMemoryGB -lt 8
```

### Nested Targeting

You can create complex targeting rules using multiple targets with AND/OR logic:

1. Add your first target
2. Click **Add Target Group**
3. Select **AND** or **OR** logic
4. Add additional targets within the group
5. Create nested groups for complex logic

### Exclusion Targeting

You can exclude specific computers from a deployment:

1. Add your main target
2. Click **Add Exclusion**
3. Configure the exclusion target
4. Computers matching the exclusion will not receive the deployment

## Testing Deployments

Before applying deployments widely, test them on a small set of computers:

1. Create the deployment with limited targets
2. Run maintenance on a test computer
3. Monitor the maintenance session
4. Check logs for any issues
5. Verify that the deployment applied correctly
6. Make adjustments as needed
7. Expand targets once testing is successful

## Deployment Best Practices

Follow these best practices for effective deployments:

1. **Use Descriptive Names**: Make deployment names clear and specific
2. **Start Small**: Begin with a small target group and expand
3. **Document Purpose**: Add descriptions to explain what the deployment does
4. **Use Tags**: Tag deployments for easier organization
5. **Regular Review**: Periodically review deployments for relevance
6. **Test Changes**: Always test changes before applying widely
7. **Monitor Compliance**: Regularly check deployment compliance
