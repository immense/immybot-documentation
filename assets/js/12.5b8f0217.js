(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{387:function(e,t,a){"use strict";a.r(t);var n=a(42),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),a("h2",{attrs:{id:"deployment-aka-targetassignment"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deployment-aka-targetassignment"}},[e._v("#")]),e._v(' Deployment (aka "TargetAssignment")')]),e._v(" "),a("p",[a("strong",[e._v("Important")]),e._v("\nIf you are just getting into ImmyBot, making Deployments is where you should start.")]),e._v(" "),a("p",[e._v('A deployments is a rules that assigns Software or Maintenance Tasks (Collectively known as "Maintenance Items") to Targets.')]),e._v(" "),a("p",[e._v("Deployments are conceptually similar to Group Policies in that they assign settings to a group of users or computers.")]),e._v(" "),a("p",[e._v("DO NOT BE AFRAID TO SAVE YOUR DEPLOYMENTS, UNLIKE GROUP POLICY THEY DO NOT APPLY AUTOMATICALLY.")]),e._v(" "),a("p",[e._v("If you DO want your Deployments to be applied automatically, you need to create a Schedule.")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-08-22-00.png",alt:""}})]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-09-46-59.png",alt:""}})]),e._v(" "),a("h3",{attrs:{id:"target"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#target"}},[e._v("#")]),e._v(" Target")]),e._v(" "),a("p",[e._v('A "Target" is a grouping of computers (or Tenants in the case of "Cloud Tasks")')]),e._v(" "),a("p",[e._v("Immybot's ability to resolve targets to a group of computers is perhaps the most powerful feature.")]),e._v(" "),a("p",[e._v("For example, you can select a Group from AzureAD (which includes on-prem synced groups, and Teams) and ImmyBot will automatically resolve that to the list of computers in use by the people in that group.")]),e._v(" "),a("p",[e._v("If you enable PSA integration, ImmyBot a Target could be all computers covered under a certain type of Agreement, or computers covered any type of Agreement that includes a certain product.")]),e._v(" "),a("h2",{attrs:{id:"maintenance-session"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#maintenance-session"}},[e._v("#")]),e._v(" Maintenance Session")]),e._v(" "),a("p",[e._v("A Maintenance Session is conceptually similar to running gpupdate /force")]),e._v(" "),a("p",[e._v("In other systems, different types of maintenance happen on their own schedule. Windows Updates may run on Tuesday night, but Third Party updates may run on Wednesday night, and auto-fix tasks may run whenever an alert is fired for a failed monitor, which has its own polling interval.")]),e._v(" "),a("p",[e._v("By forcing all automation to happen in a single, linear set of actions we call a Maintenance Session, we can deliver predictability not only as to "),a("em",[e._v("what")]),e._v(" changes will be made, but also "),a("em",[e._v("when")]),e._v(".")]),e._v(" "),a("p",[e._v("This also provides a cohesive mechanism for setting up a new computer. At best in traditional RMMs you can assign Monitors that detect the absence of required software and run Install scripts when they are missing, but this doesn't scale as pre-requisites and exclusions are required.")]),e._v(" "),a("p",[e._v("Imagine if Group Policy could reliably deploy any type of software, and gpupdate /force worked reliably off-net, and when you ran it, it gave you real-time immediate feedback about exactly what it was doing. Also imagine that it could optionally notify the end user before and after with a branded email telling them exactly what we are changing, that optionally lets them cancel.")]),e._v(" "),a("p",[e._v("That's a Maintenance Session.")]),e._v(" "),a("p",[e._v("You can view Maintenance Sessions for all computers under Computers-Sessions")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-08-47-36.png",alt:""}})]),e._v(" "),a("p",[e._v("Or, you can view Maintenance Sessions for a specific Computer under the Sessions tab for that Computer")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-08-46-09.png",alt:""}})]),e._v(" "),a("h2",{attrs:{id:"maintenance-session-stages"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#maintenance-session-stages"}},[e._v("#")]),e._v(" Maintenance Session Stages")]),e._v(" "),a("h3",{attrs:{id:"detection-stage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#detection-stage"}},[e._v("#")]),e._v(" Detection Stage")]),e._v(" "),a("p",[e._v("During the Detection Stage, the Maintenance Session is populated with a list of Maintenance Actions.")]),e._v(" "),a("p",[e._v("This is a read-only process, and during this time (usually during the day) you can optionally have Immy send an email to the user letting them know that maintenance will be run later.")]),e._v(" "),a("h3",{attrs:{id:"execution-stage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#execution-stage"}},[e._v("#")]),e._v(" Execution Stage")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-09-44-51.png",alt:""}})]),e._v(" "),a("h2",{attrs:{id:"maintenance-action"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#maintenance-action"}},[e._v("#")]),e._v(" Maintenance Action")]),e._v(" "),a("p",[e._v("A "),a("em",[e._v("Maintenance Session")]),e._v(" has one or more "),a("em",[e._v("Maintenance Actions")]),e._v(". A Maintenance Action could be to install software, apply a Windows Update, or run a Maintenance Task.")]),e._v(" "),a("p",[e._v("The image below depicts a typical Maintenance Session with many Maintenance Actions")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-06-14-05.png",alt:""}})]),e._v(" "),a("h2",{attrs:{id:"software"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#software"}},[e._v("#")]),e._v(" Software")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-08-13-18.png",alt:""}})]),e._v(" "),a("h3",{attrs:{id:"pre-requisities"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pre-requisities"}},[e._v("#")]),e._v(" Pre-Requisities")]),e._v(" "),a("h4",{attrs:{id:"install-required-dependencies"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-required-dependencies"}},[e._v("#")]),e._v(" Install required dependencies")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-09-18-04.png",alt:""}})]),e._v(" "),a("h4",{attrs:{id:"ordering-maintenance-actions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ordering-maintenance-actions"}},[e._v("#")]),e._v(" Ordering Maintenance Actions")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-09-15-27.png",alt:""}})]),e._v(" "),a("h3",{attrs:{id:"detection-method"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#detection-method"}},[e._v("#")]),e._v(" Detection Method")]),e._v(" "),a("p",[e._v("A Detection Method is required in order to know")]),e._v(" "),a("h2",{attrs:{id:"software-version"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#software-version"}},[e._v("#")]),e._v(" Software Version")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-08-08-39.png",alt:""}})]),e._v(" "),a("h2",{attrs:{id:"maintenance-task"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#maintenance-task"}},[e._v("#")]),e._v(" Maintenance Task")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-08-05-57.png",alt:""}})]),e._v(" "),a("p",[e._v("or")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-08-06-49.png",alt:""}})]),e._v(" "),a("h3",{attrs:{id:"maintenance-task-modes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#maintenance-task-modes"}},[e._v("#")]),e._v(" Maintenance Task Modes")]),e._v(" "),a("h4",{attrs:{id:"enforce"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enforce"}},[e._v("#")]),e._v(" Enforce")]),e._v(" "),a("p",[e._v('Runs the "test" script, if the test returns false, runs "set", then runs "test" again to verify.')]),e._v(" "),a("h4",{attrs:{id:"audit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#audit"}},[e._v("#")]),e._v(" Audit")]),e._v(" "),a("p",[e._v('Runs the "test" script which should return true or false. It can output whatever it wants, but the last output should be boolean.')]),e._v(" "),a("h4",{attrs:{id:"monitor"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#monitor"}},[e._v("#")]),e._v(" Monitor")]),e._v(" "),a("p",[e._v('Runs the "get" script, which can return anything. Useful for collecting data like Bitlocker Keys, Quickbooks Licenses, or any other piece of information you are interested in.')]),e._v(" "),a("h2",{attrs:{id:"scripts"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scripts"}},[e._v("#")]),e._v(" Scripts")]),e._v(" "),a("p",[e._v("From the above diagrams, you can see that scripts are the building blocks for higher level objects in")]),e._v(" "),a("h3",{attrs:{id:"execution-context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#execution-context"}},[e._v("#")]),e._v(" Execution Context")]),e._v(" "),a("h4",{attrs:{id:"system"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#system"}},[e._v("#")]),e._v(" System")]),e._v(" "),a("p",[e._v("Run as a service on the machine")]),e._v(" "),a("h4",{attrs:{id:"user"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#user"}},[e._v("#")]),e._v(" User")]),e._v(" "),a("p",[e._v("Will attempt to run as the logged on user")]),e._v(" "),a("h4",{attrs:{id:"metascript"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#metascript"}},[e._v("#")]),e._v(" Metascript")]),e._v(" "),a("p",[e._v("Runs in the ImmyBot backend, and can spawn code on the system by using Invoke-ImmyCommand")]),e._v(" "),a("h2",{attrs:{id:"schedules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#schedules"}},[e._v("#")]),e._v(" Schedules")]),e._v(" "),a("p",[e._v("Used to run maintenance periodically on machines. Can optionally be limited to a single Maintenance Item. NOTE You must also have a Deployment for the Maintenance Item!")]),e._v(" "),a("h2",{attrs:{id:"rmm-links"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rmm-links"}},[e._v("#")]),e._v(" RMM Links")]),e._v(" "),a("p",[e._v("To ImmyBot an RMM is a system that provides a list of computers, and a mechanism to run PowerShell scripts on them.")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-06-18-23.png",alt:""}})]),e._v(" "),a("p",[e._v("To avoid having to deploy the ImmyAgent to existing machines, ImmyBot optionally integrates with RMMs like ConnectWise Automate and ConnectWise Control and uses their agents instead. These systems are not as performant as the ImmyAgent, but can suppliment ImmyBot functionality.")]),e._v(" "),a("p",[e._v("For example, if you add an RMM Link for ConnectWise Control, you can open a remote session to the computer directly within ImmyBot:")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-06-34-22.png",alt:""}})]),e._v(" "),a("p",[e._v("If you add an RMM Link for ConnectWise Automate, Scheduled Maintenance Sessions will apply all Approved Windows Updates using the ConnectWise Automate API based on your Approval Policies in Automate Patch Manager.")]),e._v(" "),a("p",[e._v("You can even add multiple RMMs of the same type, which is often useful in merger and acquisition scenarios. You may choose to use ImmyBot as your single pane of glass to manage both, or simply let ImmyBot be a neutral third party for facilitating the consolidation of RMM agents to the parent company's RMM.")]),e._v(" "),a("h2",{attrs:{id:"identification"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#identification"}},[e._v("#")]),e._v(" Identification")]),e._v(" "),a("p",[e._v("Because the same computer often exists in multiple RMMs (Like how CW Automate typically installs CW Control Automatically), ImmyBot prevents duplicates by identifying the computer by a unique id. We DO NOT use MAC Address! This unique id persists even if you wipe and reload the machine.")]),e._v(" "),a("p",[e._v("When a new machine is detected, it first goes to New Computers->Actively Identifying\n"),a("img",{attrs:{src:"img/2021-02-23-06-44-25.png",alt:""}})]),e._v(" "),a("p",[e._v('If it is a machine ImmyBot has seen before, it will be associated to the existing Computer, and you will find a new entry under the Computer\'s Agents tab. Under the hood we call these entries "RmmComputers".')]),e._v(" "),a("p",[e._v("Computers can have one or more RmmComputers")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-06-45-47.png",alt:""}})]),e._v(" "),a("h3",{attrs:{id:"identification-failures"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#identification-failures"}},[e._v("#")]),e._v(" Identification Failures")]),e._v(" "),a("h4",{attrs:{id:"needs-a-manual-decision"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#needs-a-manual-decision"}},[e._v("#")]),e._v(" Needs a Manual Decision")]),e._v(" "),a("p",[e._v("Often when an RMM Agent gets re-installed, it will get a new id in the RMM (ComputerId in Automate, SessionID in Control). ImmyBot will recognize that it is the same computer, but due to the fact that virtualization technologies and hard drive cloning can lead to the same scenario, we require you to tell us whether we should overwrite the existing RmmComputer, or keep both.")]),e._v(" "),a("h4",{attrs:{id:"failed"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#failed"}},[e._v("#")]),e._v(" Failed")]),e._v(" "),a("p",[a("img",{attrs:{src:"img/2021-02-23-06-51-47.png",alt:""}})]),e._v(" "),a("p",[e._v("The most common causes of identification failure are an overloaded or unresponsive RMM, or the machine has broken WMI, preventing us from retrieving the uniqueid of the machine. You may retry identification on one or all of the failed computers once these conditions are resolved.")]),e._v(" "),a("h1",{attrs:{id:"onboarding"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#onboarding"}},[e._v("#")]),e._v(" Onboarding")]),e._v(" "),a("p",[e._v("In ImmyBot, Onboarding is the first Maintenance Session run against a machine.")]),e._v(" "),a("h2",{attrs:{id:"tenants"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tenants"}},[e._v("#")]),e._v(" Tenants")]),e._v(" "),a("p",[e._v("These are your Customers. We recommend syncing Tenants from CW Automate or Azure.")]),e._v(" "),a("h2",{attrs:{id:"user-computer-affinity"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#user-computer-affinity"}},[e._v("#")]),e._v(" User Computer Affinity")]),e._v(" "),a("p",[e._v('ImmyBot periodically runs whoami /upn on all computers and keeps a rolling list of the last 10 UPNs. It assigns the Primary User of the computer to the "Person" (Synced from Azure) with the matching UPN.')]),e._v(" "),a("p",[e._v("For environments without AzureAD, ImmyBot will lookup the UPN of the Person from a Domain Controller in the computer's Tenant")])])}),[],!1,null,null,null);t.default=s.exports}}]);