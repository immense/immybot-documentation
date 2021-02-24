# Introduction

## Deployment (aka "[Target](#target)Assignment")

**Important**
If you are just getting into ImmyBot, making Deployments is where you should start.

A deployment is a rule that assigns Software or [Maintenance Tasks](#maintenance-task) (Collectively known as "Maintenance Items") to a [Target](#target).

Deployments are conceptually similar to Group Policies in that they assign settings to a group of users or computers.

IF YOU ARE JUST GETTING START WITH IMMYBOT, DO NOT BE AFRAID TO SAVE YOUR DEPLOYMENTS. THEY DO NOT APPLY AUTOMATICALLY.

If you DO want your Deployments to be applied automatically, you need to create a Schedule.

![](../.vuepress/images/2021-02-23-08-22-00.png)

![](../.vuepress/images/2021-02-23-09-46-59.png)


### [Target](#target)
A "[Target](#target)" is a grouping of computers (or Tenants in the case of "Cloud Tasks")

ImmyBot's ability to resolve [Targets](#target) to a group of computers is perhaps the most powerful feature. 

For example, you can select a Group from AzureAD (which includes on-prem synced groups, and Teams) and ImmyBot will automatically resolve that to the list of computers in use by the people in that group.

If you enable PSA integration, a [Target](#target) could be all computers covered under a certain type of Agreement, or computers covered any type of Agreement that includes a certain product.

## [Maintenance Session](#maintenance-session)

A [Maintenance Session](#maintenance-session) is conceptually similar to running gpupdate /force

In other systems, different types of maintenance happen on their own schedule. Windows Updates may run on Tuesday night, but Third Party updates may run on Wednesday night, and auto-fix tasks may run whenever an alert is fired for a failed monitor, which has its own polling interval. 

By forcing all automation to happen in a single, linear set of actions we call a [Maintenance Session](#maintenance-session), we can deliver predictability not only as to _what_ changes will be made, but also _when_.

This also provides a cohesive mechanism for setting up a new computer. At best in traditional RMMs you can assign Monitors that detect the absence of required software and run Install scripts when they are missing, but this doesn't scale as pre-requisites and exclusions are required.

Imagine if Group Policy could reliably deploy any type of software, and gpupdate /force worked reliably off-net, and when you ran it, it gave you real-time feedback about exactly what it was doing. Also imagine that it could optionally notify the end user before and after with a branded email telling them exactly what is being done, that optionally lets them cancel.

That's a [Maintenance Session](#maintenance-session).

You can view [Maintenance Sessions](#maintenance-session) for all computers under Computers->Sessions

![](../.vuepress/images/2021-02-23-08-47-36.png)

Or, you can view [Maintenance Sessions](#maintenance-session) for a specific Computer under the Sessions tab for that Computer

![](../.vuepress/images/2021-02-23-08-46-09.png)

## [Maintenance Session](#maintenance-session) Stages

### Detection Stage

During the Detection Stage, ImmyBot "Detects" which Maintenance Actions are necessary to bring the computer into compliance. These Actions are added to the [Maintenance Session](#maintenance-session).

This is a read-only process, and typically done while the user is active. This is so ImmyBot can notify the user of changes that will occur later during the Execution Stage. By doing this during the day, and scheduling Execution for later, we are giving the end user the best possible chance to be aware of the upcoming maintenance, Postponing if you allow. The Postpone feature is very popular among engineers that do may need to leave renderings and analysis tasks running overnight.

### Execution Stage

![](../.vuepress/images/2021-02-23-09-44-51.png)

## [Maintenance Action](#maintenance-action)

A *[Maintenance Session](#maintenance-session)* has one or more *[Maintenance Actions](#maintenance-action)*. A [Maintenance Action](#maintenance-action) could be to install software, apply a Windows Update, or run a [Maintenance Task](#maintenance-task). 

The image below depicts a typical [Maintenance Session](#maintenance-session) with many [Maintenance Actions](#maintenance-action)

![](../.vuepress/images/2021-02-23-06-14-05.png)

## Software
Software, in the context of ImmyBot refers to Software objects in My Software or Global Software.

At the bare minimum, Software requires a [Detection Method](#detection-method). 
Software can have many [Software Versions](#software-version). 
![](../.vuepress/images/2021-02-23-08-13-18.png)

### Pre-Requisities 
This is a VERY powerful, and critically underrated feature in ImmyBot. ImmyBot resolves dependencies recursively, with built-in circular reference logic. 

Common uses for Pre-Requisites include
* Ensuring a piece of software is installed before installing another 
  * C++ Redistributables before 3CX Client
  * Office is installed before an Outlook Add-in
* Ensuring a piece of software is _uninstalled_ before install another 
  * Removing Adobe Acrobat Reader before installing Adobe Acrobat Professional

#### Install required dependencies

![](../.vuepress/images/2021-02-23-09-18-04.png)

#### Ordering [Maintenance Actions](#maintenance-action)
![](../.vuepress/images/2021-02-23-09-15-27.png)

### Detection Method
A Detection Method is required in order to know whether or not a piece of Software is installed on a machine.

For Software, the detection method must returns the version of the software installed on the machine, if any.

For Maintenance Tasks, the Detection Method is the "test" mechanism, which must return true or false to indicate whether or not the machine is in compliance.

## Software Version
![](../.vuepress/images/2021-02-23-08-08-39.png)

## Maintenance Task
![](../.vuepress/images/2021-02-23-08-05-57.png)

or

![](../.vuepress/images/2021-02-23-08-06-49.png)

### Maintenance Task Modes

#### Enforce
Runs the "test" script, if the test returns false, runs "set", then runs "test" again to verify.

#### Audit
Runs the "test" script which should return true or false. It can output whatever it wants, but the last output should be boolean.

#### Monitor
Runs the "get" script, which can return anything. Useful for collecting data like Bitlocker Keys, Quickbooks Licenses, or any other piece of information you are interested in.

## Scripts
From the above diagrams, you can see that scripts are the building blocks for higher level objects in 

### Execution Context
#### System
Run as a service on the machine

#### User
Will attempt to run as the logged on user

#### Metascript
Runs in the ImmyBot backend, and can spawn code on the system by using Invoke-ImmyCommand 

## Schedules
Used to run maintenance periodically on machines. Can optionally be limited to a single Maintenance Item. NOTE You must also have a Deployment for the Maintenance Item!

## RMM Links

To ImmyBot an RMM is a system that provides a list of computers, and a mechanism to run PowerShell scripts on them.

![](../.vuepress/images/2021-02-23-06-18-23.png)

To avoid having to deploy the ImmyAgent to existing machines, ImmyBot optionally integrates with RMMs like ConnectWise Automate and ConnectWise Control and uses their agents instead. These systems are not as performant as the ImmyAgent, but can suppliment ImmyBot functionality.  

For example, if you add an RMM Link for ConnectWise Control, you can open a remote session to the computer directly within ImmyBot:

![](../.vuepress/images/2021-02-23-06-34-22.png)

If you add an RMM Link for ConnectWise Automate, Scheduled [Maintenance Sessions](#maintenance-session) will apply all Approved Windows Updates using the ConnectWise Automate API based on your Approval Policies in Automate Patch Manager.

You can even add multiple RMMs of the same type, which is often useful in merger and acquisition scenarios. You may choose to use ImmyBot as your single pane of glass to manage both, or simply let ImmyBot be a neutral third party for facilitating the consolidation of RMM agents to the parent company's RMM.

## Identification

Because the same computer often exists in multiple RMMs (Like how CW Automate typically installs CW Control Automatically), ImmyBot prevents duplicates by identifying the computer by a unique id. We DO NOT use MAC Address! This unique id persists even if you wipe and reload the machine. 

When a new machine is detected, it first goes to New Computers->Actively Identifying
![](../.vuepress/images/2021-02-23-06-44-25.png)

If it is a machine ImmyBot has seen before, it will be associated to the existing Computer, and you will find a new entry under the Computer's Agents tab. Under the hood we call these entries "RmmComputers". 

Computers can have one or more RmmComputers

![](../.vuepress/images/2021-02-23-06-45-47.png)

### Identification Failures

#### Needs a Manual Decision
Often when an RMM Agent gets re-installed, it will get a new id in the RMM (ComputerId in Automate, SessionID in Control). ImmyBot will recognize that it is the same computer, but due to the fact that virtualization technologies and hard drive cloning can lead to the same scenario, we require you to tell us whether we should overwrite the existing RmmComputer, or keep both.

#### Failed

![](../.vuepress/images/2021-02-23-06-51-47.png)

The most common causes of identification failure are an overloaded or unresponsive RMM, or the machine has broken WMI, preventing us from retrieving the uniqueid of the machine. You may retry identification on one or all of the failed computers once these conditions are resolved.

# Onboarding

In ImmyBot, Onboarding is the first [Maintenance Session](#maintenance-session) run against a machine. 

## Tenants

These are your Customers. We recommend syncing Tenants from CW Automate or Azure.

## User Computer Affinity
ImmyBot periodically runs whoami /upn on all computers and keeps a rolling list of the last 10 UPNs. It assigns the Primary User of the computer to the "Person" (Synced from Azure) with the matching UPN.

For environments without AzureAD, ImmyBot will lookup the UPN of the Person from a Domain Controller in the computer's Tenant
