import{_ as c,D as h,c as u,b as n,w as e,a7 as i,a6 as l,j as r,a,o as t,I as s}from"./chunks/framework.B49Yz1nR.js";const d="/assets/2021-03-01-08-42-41.BdO1eeEs.png",p="/assets/2021-03-01-08-44-19.DxWpnxPw.png",m="/assets/2021-03-01-08-51-38.CHkYjk4h.png",f="/assets/2021-02-23-08-47-36.RQcrcNyf.png",g="/assets/2021-02-23-08-46-09.B9VWyRBz.png",y="/assets/2021-02-23-09-44-51.B5SaGcGw.png",b="/assets/2021-02-23-06-14-05.BkVlffY-.png",w="/assets/2021-02-23-09-18-04.BXIdr31W.png",q="/assets/2021-02-23-09-15-27.DlRPwHUk.png",k="/assets/2021-03-01-14-17-29.Ui23ea9E.png",T="/assets/2021-02-23-06-18-23.BGlqLMwh.png",A="/assets/2021-02-23-06-34-22.DUk9lR_9.png",_="/assets/2021-02-23-06-44-25.XILbubUc.png",C="/assets/2021-02-23-06-45-47.7M8JsL7z.png",S="/assets/image-3.DpVosG6l.png",v="/assets/image-7.CQrvluq-.png",I="/assets/image-6.m35gMvKa.png",H=JSON.parse('{"title":"Terminology","description":"","frontmatter":{},"headers":[],"relativePath":"terminology.md","filePath":"terminology.md"}'),P={name:"terminology.md"},x=l('<h1 id="terminology" tabindex="-1">Terminology <a class="header-anchor" href="#terminology" aria-label="Permalink to &quot;Terminology&quot;">​</a></h1><h2 id="tenants" tabindex="-1">Tenants <a class="header-anchor" href="#tenants" aria-label="Permalink to &quot;Tenants&quot;">​</a></h2><p>These are your Customers. We recommend syncing Tenants from CW Automate or Azure.</p><h2 id="user-computer-affinity" tabindex="-1">User Computer Affinity <a class="header-anchor" href="#user-computer-affinity" aria-label="Permalink to &quot;User Computer Affinity&quot;">​</a></h2><p>ImmyBot periodically runs whoami /upn on all computers and keeps a rolling list of the last 10 UPNs. It assigns the Primary User of the computer to the &quot;Person&quot; (Synced from Azure) with the matching UPN.</p><p>For environments without AzureAD, ImmyBot will lookup the UPN of the Person from a Domain Controller in the computer&#39;s Tenant</p><h2 id="deployment" tabindex="-1">Deployment <a class="header-anchor" href="#deployment" aria-label="Permalink to &quot;Deployment&quot;">​</a></h2><p>Deployments were originally called &quot;Assignments&quot; and are still called Assignments under the hood.</p><p>Note: You won&#39;t see the word &quot;Assignment&quot; in the user interface anywhere, but we plan to re-rename &quot;Deployment&quot; back to &quot;Assignment&quot; it in a future release.</p><p>A deployment is a rule that assigns <a href="#software">Software</a> or <a href="#task">Tasks</a> (Collectively known as &quot;Maintenance Items&quot;) to a <a href="#target">Target</a>.</p><p><img src="'+d+'" alt=""></p><p>Deployments are conceptually similar to Group Policies in that they assign settings to a group of users or computers.</p><p>DO NOT BE AFRAID TO SAVE YOUR DEPLOYMENTS. THEY DO NOT APPLY AUTOMATICALLY.</p><p>If you DO want your Deployments to be applied automatically, you need to create a <a href="#schedules">Schedule</a>.</p><h2 id="deployment-resolution" tabindex="-1">Deployment Resolution <a class="header-anchor" href="#deployment-resolution" aria-label="Permalink to &quot;Deployment Resolution&quot;">​</a></h2><p>Also known as</p><ul><li>Creating Exceptions</li><li>&quot;Winning&quot; Deployments</li><li>Dealing with Snowflakes</li></ul><p>Like Group Policies have a &quot;Winning Policy&quot;, ImmyBot must have a &quot;Winning Deployment&quot; for a given Maintenance Item on a computer.</p><p>Let&#39;s say you have a customer &quot;Contoso&quot; that uses Adobe Acrobat instead of Adobe Reader, and you would like that to be installed instead.</p><p>First, create a Deployment that sets the desired state of Adobe Reader to Uninstalled for Contoso</p><p><img src="'+p+'" alt=""></p><p>Then, create a Deployment that Installs Adobe Acrobat for their computers</p><p><img src="'+m+'" alt=""></p><h2 id="target" tabindex="-1"><a href="#target">Target</a> <a class="header-anchor" href="#target" aria-label="Permalink to &quot;[Target](#target)&quot;">​</a></h2><p>A &quot;<a href="#target">Target</a>&quot; is a grouping of computers (or Tenants in the case of &quot;Cloud Tasks&quot;)</p><p>ImmyBot&#39;s ability to resolve <a href="#target">Targets</a> to a group of computers is perhaps its most powerful feature.</p><p>For example, you can select a Group of users from AzureAD (which includes on-prem synced groups, and Teams) and ImmyBot will automatically resolve that to the list of computers in use by the people in that group.</p><p>If you enable PSA integration, a <a href="#target">Target</a> could be all computers covered under a certain type of Agreement, or computers covered by an Agreement that includes a certain product.</p><p>This is particularly useful for security software, help desk portals, or anything else in your stack that you may only want to be installed for customers that are paying you for it.</p><h3 id="offboarding" tabindex="-1">Offboarding <a class="header-anchor" href="#offboarding" aria-label="Permalink to &quot;Offboarding&quot;">​</a></h3><p>Conversely, you could create Deployments that remove your stack for customers you are offboarding.</p><ul><li>Create an &quot;Offboarding&quot; product in your PSA</li><li>Create a deployment for each of the pieces of software you would like removed setting the desired state to Uninstalled</li><li>Target all customers with the &quot;Offboarding&quot; product on their agreement</li></ul><p>Note: ImmyBot even honors the date range on additions, making scheduled offboarding easier if say the customer wants your software removed on the last day of the month.</p><h2 id="maintenance-session" tabindex="-1"><a href="#maintenance-session">Maintenance Session</a> <a class="header-anchor" href="#maintenance-session" aria-label="Permalink to &quot;[Maintenance Session](#maintenance-session)&quot;">​</a></h2><p>A <a href="#maintenance-session">Maintenance Session</a> is conceptually similar to running gpupdate /force</p><p>In other systems, different types of maintenance happen on their own schedule. Windows Updates may run on Tuesday night, but Third Party updates may run on Wednesday night, and auto-fix tasks may run whenever an alert is fired for a failed monitor, which has its own polling interval.</p><p>By forcing all automation to happen in a sequential set of actions we call a <a href="#maintenance-session">Maintenance Session</a>, we can deliver predictability not only as to <em>what</em> changes will be made, but also <em>when</em>.</p><p>This also provides a cohesive mechanism for setting up a new computer. At best in traditional RMMs you can assign Monitors that detect the absence of required software and run Install scripts when they are missing, but this doesn&#39;t scale as pre-requisites and exclusions are required.</p><p>Imagine if Group Policy could reliably deploy any type of software, and gpupdate /force worked reliably off-net, and when you ran it, it gave you real-time feedback about exactly what it was doing. Also imagine that it could optionally notify the end user before and after with a branded email telling them exactly what is being done, that optionally lets them cancel.</p><p>That&#39;s a <a href="#maintenance-session">Maintenance Session</a>.</p><p>You can view <a href="#maintenance-session">Maintenance Sessions</a> for all computers under Computers-&gt;Sessions</p><p><img src="'+f+'" alt=""></p><p>Or, you can view <a href="#maintenance-session">Maintenance Sessions</a> for a specific Computer under the Sessions tab for that Computer</p><p><img src="'+g+'" alt=""></p><h2 id="maintenance-session-stages" tabindex="-1"><a href="#maintenance-session">Maintenance Session</a> Stages <a class="header-anchor" href="#maintenance-session-stages" aria-label="Permalink to &quot;[Maintenance Session](#maintenance-session) Stages&quot;">​</a></h2><h3 id="detection-stage" tabindex="-1">Detection Stage <a class="header-anchor" href="#detection-stage" aria-label="Permalink to &quot;Detection Stage&quot;">​</a></h3><p>During the Detection Stage, ImmyBot &quot;Detects&quot; which Maintenance Actions are necessary to bring the computer into compliance. These Actions are added to the <a href="#maintenance-session">Maintenance Session</a>.</p><p>This is a read-only process, and typically done while the user is active. This is so ImmyBot can notify the user of changes that will occur later during the Execution Stage. By doing this during the day, and scheduling Execution for later, we are giving the end user the best possible chance to be aware of the upcoming maintenance, Postponing if you allow. The Postpone feature is very popular among engineers that do may need to leave renderings and analysis tasks running overnight.</p><h3 id="execution-stage" tabindex="-1">Execution Stage <a class="header-anchor" href="#execution-stage" aria-label="Permalink to &quot;Execution Stage&quot;">​</a></h3><p><img src="'+y+'" alt=""></p><h2 id="maintenance-action" tabindex="-1"><a href="#maintenance-action">Maintenance Action</a> <a class="header-anchor" href="#maintenance-action" aria-label="Permalink to &quot;[Maintenance Action](#maintenance-action)&quot;">​</a></h2>',51),D=l('<p>A <em><a href="#maintenance-session">Maintenance Session</a></em> has one or more <em><a href="#maintenance-action">Maintenance Actions</a></em>. A <a href="#maintenance-action">Maintenance Action</a> could be to install software, apply a Windows Update, or run a <a href="#task">Task</a>.</p><p>The image below depicts a typical <a href="#maintenance-session">Maintenance Session</a> with many <a href="#maintenance-action">Maintenance Actions</a></p><p><img src="'+b+'" alt=""></p><h2 id="software" tabindex="-1">Software <a class="header-anchor" href="#software" aria-label="Permalink to &quot;Software&quot;">​</a></h2><p>Software, in the context of ImmyBot refers to Software objects in My Software or Global Software.</p><p>My Software - Initially empty. When you upload your own software to ImmyBot, it goes into My Software</p><p>Global Software - Read-Only, managed by the ImmyBot team.</p><p>At the bare minimum, Software requires a <a href="#detection-method">Detection Method</a>. Software can have many <a href="#software-version">Software Versions</a>.</p>',8),M=l('<h3 id="pre-requisities" tabindex="-1">Pre-Requisities <a class="header-anchor" href="#pre-requisities" aria-label="Permalink to &quot;Pre-Requisities&quot;">​</a></h3><p>This is a VERY powerful, and critically underrated feature in ImmyBot. ImmyBot resolves dependencies recursively, with built-in circular reference detection.</p><p>Common uses for Pre-Requisites include</p><ul><li>Ensuring a piece of software is installed before installing another <ul><li>C++ Redistributables before 3CX Client</li><li>Office is installed before an Outlook Add-in</li></ul></li><li>Ensuring a piece of software is <em>uninstalled</em> before install another <ul><li>Removing Adobe Acrobat Reader before installing Adobe Acrobat Professional</li></ul></li></ul><h3 id="install-required-dependencies" tabindex="-1">Install required dependencies <a class="header-anchor" href="#install-required-dependencies" aria-label="Permalink to &quot;Install required dependencies&quot;">​</a></h3><p><img src="'+w+'" alt=""></p><h3 id="ordering-maintenance-actions" tabindex="-1">Ordering <a href="#maintenance-action">Maintenance Actions</a> <a class="header-anchor" href="#ordering-maintenance-actions" aria-label="Permalink to &quot;Ordering [Maintenance Actions](#maintenance-action)&quot;">​</a></h3><p><img src="'+q+'" alt=""></p><h2 id="detection-method" tabindex="-1">Detection Method <a class="header-anchor" href="#detection-method" aria-label="Permalink to &quot;Detection Method&quot;">​</a></h2><p>A Detection Method is required in order to know whether or not a piece of Software is installed on a machine.</p><p>For Software, the detection method must returns the version of the software installed on the machine, if any.</p><p>For <a href="#task">Tasks</a>, the Detection Method is the &quot;test&quot; mechanism, which must return true or false to indicate whether or not the machine is in compliance.</p><h2 id="software-version" tabindex="-1">Software Version <a class="header-anchor" href="#software-version" aria-label="Permalink to &quot;Software Version&quot;">​</a></h2>',13),B=r("h2",{id:"task",tabindex:"-1"},[a("Task "),r("a",{class:"header-anchor",href:"#task","aria-label":'Permalink to "Task"'},"​")],-1),E=r("p",null,"A Task (aka Mainenance Task) is a catch-all for anything that isn't software.",-1),R=r("p",null,"or",-1),W=l('<h2 id="task-modes" tabindex="-1">Task Modes <a class="header-anchor" href="#task-modes" aria-label="Permalink to &quot;Task Modes&quot;">​</a></h2><h3 id="enforce" tabindex="-1">Enforce <a class="header-anchor" href="#enforce" aria-label="Permalink to &quot;Enforce&quot;">​</a></h3><p>Runs the &quot;test&quot; script, if the test returns false, runs &quot;set&quot;, then runs &quot;test&quot; again to verify.</p><h3 id="audit" tabindex="-1">Audit <a class="header-anchor" href="#audit" aria-label="Permalink to &quot;Audit&quot;">​</a></h3><p>Runs the &quot;test&quot; script which should return true or false. It can output whatever it wants, but the last output should be boolean.</p><h3 id="monitor" tabindex="-1">Monitor <a class="header-anchor" href="#monitor" aria-label="Permalink to &quot;Monitor&quot;">​</a></h3><p>Runs the &quot;get&quot; script, which can return anything. Useful for collecting data like Bitlocker Keys, Quickbooks Licenses, or any other piece of information you are interested in.</p><h2 id="scripts" tabindex="-1">Scripts <a class="header-anchor" href="#scripts" aria-label="Permalink to &quot;Scripts&quot;">​</a></h2><p>From the above diagrams, you can see that scripts are the building blocks for higher level objects like Software and Tasks.</p><h2 id="execution-context" tabindex="-1">Execution Context <a class="header-anchor" href="#execution-context" aria-label="Permalink to &quot;Execution Context&quot;">​</a></h2><h3 id="system" tabindex="-1">System <a class="header-anchor" href="#system" aria-label="Permalink to &quot;System&quot;">​</a></h3><p>Run as a service on the machine</p><h3 id="user" tabindex="-1">User <a class="header-anchor" href="#user" aria-label="Permalink to &quot;User&quot;">​</a></h3><p>Will attempt to run as the logged on user</p><h3 id="metascript" tabindex="-1">Metascript <a class="header-anchor" href="#metascript" aria-label="Permalink to &quot;Metascript&quot;">​</a></h3><p>Runs in the ImmyBot backend, and can spawn code on the system by using Invoke-ImmyCommand</p><h3 id="cloud-script" tabindex="-1">Cloud Script <a class="header-anchor" href="#cloud-script" aria-label="Permalink to &quot;Cloud Script&quot;">​</a></h3><p>Runs in the ImmyBot backend, but intended to be run against a Tenant (perhaps for the purpose of getting or setting some setting in 365/Azure or some other system with an API). These are used exclusively in <a href="#task">Tasks</a> targetting &quot;Tenants&quot;.</p><p><img src="'+k+'" alt=""></p><h2 id="schedules" tabindex="-1">Schedules <a class="header-anchor" href="#schedules" aria-label="Permalink to &quot;Schedules&quot;">​</a></h2><p>Used to run maintenance periodically on machines. Can optionally be limited to a single Maintenance Item.</p><p>NOTE You must also have a Deployment for the Maintenance Item to set the desired state. Imagine a scenario where you need to ensure a single piece of software is up-to-date on all computers except for a CNC machine. Create 2 deployments, the first setting the desired state to Installed-&gt;Latest for all computers, then a second stating that the desired state is Ignored for the CNC machine. When you create the schedule, the software will be ignored for the CNC machine.</p><h2 id="integrations" tabindex="-1">Integrations <a class="header-anchor" href="#integrations" aria-label="Permalink to &quot;Integrations&quot;">​</a></h2><p>To ImmyBot, an RMM is a system that provides a list of computers, and a mechanism to run PowerShell scripts on them.</p><p><img src="'+T+'" alt=""></p><p>To avoid having to deploy the ImmyAgent to existing machines, ImmyBot optionally integrates with RMMs like ConnectWise Automate and ConnectWise Control and uses their agents instead. These systems are not as performant as the ImmyAgent, but can suppliment ImmyBot functionality.</p><p>For example, if you add an RMM Link for ConnectWise Control, you can open a remote session to the computer directly within ImmyBot:</p><p><img src="'+A+'" alt=""></p><p>If you add an RMM integration for ConnectWise Automate, Scheduled <a href="#maintenance-session">Maintenance Sessions</a> will apply all Approved Windows Updates using the ConnectWise Automate API based on your Approval Policies in Automate Patch Manager.</p><p>You can even add multiple RMMs of the same type, which is often useful in merger and acquisition scenarios. You may choose to use ImmyBot as your single pane of glass to manage both, or simply let ImmyBot be a neutral third party for facilitating the consolidation of RMM agents to the parent company&#39;s RMM.</p><h2 id="identification" tabindex="-1">Identification <a class="header-anchor" href="#identification" aria-label="Permalink to &quot;Identification&quot;">​</a></h2><p>Because the same computer often exists in multiple RMMs (Like how CW Automate typically installs CW Control Automatically), ImmyBot prevents duplicates by identifying the computer by a unique id. We DO NOT use MAC Address! This unique id persists even if you wipe and reload the machine.</p><p>When a new machine is detected, it first goes to New Computers-&gt;Actively Identifying <img src="'+_+'" alt=""></p><p>It uses the following script to collect the UUID from the machine:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gwmi Win32_ComputerSystemProduct | select -expand UUID</span></span></code></pre></div><p>This value is static even if you wipe and reload the machine, although we have <strong>VERY</strong> rarely seen this value change following a BIOS upgrade or due to a mainboard fault. We chose this value instead of Mac Address or Hard Drive serial number because of issues other systems have with USB Ethernet cables and hard drive replacement. We did not use serialnumber because we learned that many computers do not have serial numbers.</p><p>In practice, this value works almost <em>too</em> well. Machines you just wiped and expect to find in New Computers, are often associated to their pre-wiped computer objects. To find them, you often have to search for the serial number of the computer in the Computer List. In 0.40.1 we began using the Windows OfflineInstallationID value to identify when an existing computer has been wiped so we can set its status to &quot;Needs Onboarding&quot; which causes it to show up under New Computers as expected.</p><p>If it is a machine ImmyBot has seen before, it will be associated to the existing Computer, and you will find a new entry under the Computer&#39;s Agents tab. Under the hood we call these entries &quot;RmmComputers&quot;.</p><p>Computers can have one or more RmmComputers(Agents). You can think of these as logical &quot;pathways&quot; to the computer. We only need one to be online to function.</p><p><img src="'+C+'" alt=""></p><h2 id="target-visibility" tabindex="-1">Target Visibility <a class="header-anchor" href="#target-visibility" aria-label="Permalink to &quot;Target Visibility&quot;">​</a></h2><p>The Target Visibility feature helps control where and how software deployments, task deployments, and other actions can be accessed in ImmyBot. There is currently one option:</p><p><a href="#technician-tools">Technician Tools</a>: When enabled, this makes the deployment visible and accessible through the technician tools interface. This is useful for actions that can assist IT staff when working on support tickets.</p><p>This option is located at the bottom of the deployment details page.</p><p><img src="'+S+'" alt="alt text"></p><h2 id="technician-tools" tabindex="-1">Technician Tools <a class="header-anchor" href="#technician-tools" aria-label="Permalink to &quot;Technician Tools&quot;">​</a></h2><p>Technician Tools is a specialized interface designed for IT technicians working within PSA (Professional Services Automation) tickets.</p><p>Think of it as a streamlined &quot;command center&quot; that gives technicians quick access to the tools and information they need while working on a support ticket, without having to switch between different systems or search for the relevant computers and software details.</p><h3 id="what-it-looks-like" tabindex="-1">What it looks like <a class="header-anchor" href="#what-it-looks-like" aria-label="Permalink to &quot;What it looks like&quot;">​</a></h3><p>When a technician opens a ticket from their PSA system (like HaloPSA), this page shows relevant deployments from ImmyBot that resolved to that ticket.</p><p><img src="'+v+'" alt="alt text"></p><p><img src="'+I+'" alt="alt text"></p><h3 id="deciding-which-deployments-show-up" tabindex="-1">Deciding which deployments show up <a class="header-anchor" href="#deciding-which-deployments-show-up" aria-label="Permalink to &quot;Deciding which deployments show up&quot;">​</a></h3><p>Deployment <a href="#target-visibility">target visibility</a> determines if it is enabled for a particular page. Technician Tools is one of the available visibility options. When this option is selected and the deployment resolves to a person, tenant, or computer associated with the opened PSA ticket, it will show up in the list.</p><h3 id="supported-integrations" tabindex="-1">Supported Integrations <a class="header-anchor" href="#supported-integrations" aria-label="Permalink to &quot;Supported Integrations&quot;">​</a></h3><ul><li><a href="/halo-integration-setup.html#technician-tools">HaloPSA</a></li></ul>',56);function N(U,O,V,L,Y,F){const o=h("Mermaid");return t(),u("div",null,[x,(t(),n(i,null,{default:e(()=>[s(o,{id:"mermaid-181",class:"mermaid",graph:"flowchart%20TD%0A%20SoftwareInstall%20--%3E%20Detect%7BSoftware%20Installed%3F%7D%0A%20Detect%20--%3E%20%7CNo%7C%20Install%0A%20Detect%20--%3E%20%7CYes%7C%20HasConfigurationTask%7BHas%20Configuration%20Task%3F%7D%0A%20Install%20--%3E%20PostInstallDetect%7BSoftware%20Installed%3F%7D%0A%20PostInstallDetect%20--%3E%20%7CYes%7CHasConfigurationTask%0A%20HasConfigurationTask%20--%3E%20%7CYes%7C%20MaintenanceTaskTest%7BRun%20Test%20Script%7D%0A%20MaintenanceTaskTest%20--%3E%20%7Creturn%20%24true%7C%20Compliant%0A%20MaintenanceTaskTest%20--%3E%20%7Creturn%20%24false%7C%20RunSetScript(Run%20Set%20Script)%0A%20RunSetScript%20--%3E%20PostMaintenanceTaskTest%7BRun%20Test%20Script%7D%0A%20PostMaintenanceTaskTest%20--%3E%20%7Creturn%20%24true%7C%20Compliant%0A%20PostMaintenanceTaskTest%20--%3E%20%7Creturn%20%24false%7C%20Non-Compliant%0A%20PostInstallDetect%20--%3E%20%7CNo%7C%20Non-Compliant%0A"})]),fallback:e(()=>[a(" Loading... ")]),_:1})),D,(t(),n(i,null,{default:e(()=>[s(o,{id:"mermaid-206",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20C%5BSoftware%5D%20--%3E%20D%5BCustom%20Detection%20Script%5D%0A%20%20%20%20C%20--%3EE%5BDefault%20Uninstall%20Script%5D%0A%20%20%20%20C%20--%3E%20F%5BAuto-Update%20Script%5D%0A"})]),fallback:e(()=>[a(" Loading... ")]),_:1})),M,(t(),n(i,null,{default:e(()=>[s(o,{id:"mermaid-274",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20C%5BSoftware%20Version%5D%20--%3E%20Install%0A%20%20%20%20C%20--%3E%20Uninstall%0A%20%20%20%20C%20--%3E%20Upgrade%0A%20%20%20%20C%20--%3E%20Repair%0A%20%20%20%20C%20--%3E%20Test%0A"})]),fallback:e(()=>[a(" Loading... ")]),_:1})),B,E,(t(),n(i,null,{default:e(()=>[s(o,{id:"mermaid-281",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20C%5BTask%5D%0A%20%20%20%20C%20--%3E%20Get%0A%20%20%20%20C%20--%3E%20Set%0A%20%20%20%20C%20--%3E%20Test%0A"})]),fallback:e(()=>[a(" Loading... ")]),_:1})),R,(t(),n(i,null,{default:e(()=>[s(o,{id:"mermaid-285",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20C%5BTask%5D%0A%20%20%20%20C%20--%3E%20S%5BCombined%20Script%20with%20%24method%20parameter%20containing%20'get'%2C'set'%2C%20or%20'test'%5D%0A"})]),fallback:e(()=>[a(" Loading... ")]),_:1})),W])}const z=c(P,[["render",N]]);export{H as __pageData,z as default};
