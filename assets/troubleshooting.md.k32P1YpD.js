import{_ as c,D as p,c as d,b as s,w as t,a7 as o,a6 as r,j as e,o as a,I as i,a as l}from"./chunks/framework.B49Yz1nR.js";const P=JSON.parse('{"title":"Troubleshooting","description":"","frontmatter":{},"headers":[],"relativePath":"troubleshooting.md","filePath":"troubleshooting.md"}'),u={name:"troubleshooting.md"},h=r('<div class="warning custom-block"><p class="custom-block-title"><em>ImmyBot&#39;s EV code-signing certificate is changing on Feb. 11th, 2025</em></p><p>Please see the <a href="https://docs.immy.bot/FAQ.html#what-should-i-do-about-immybot-s-upcoming-code-signing-certificate-change" target="_blank" rel="noreferrer">FAQ section for more details</a> on updating security exclusions.</p></div><div class="danger custom-block"><p class="custom-block-title"><em>ImmyBot no longer supports Windows 7, Server 2008 (or Server 2012 w/o <a href="https://learn.microsoft.com/en-us/windows-server/get-started/extended-security-updates-overview" target="_blank" rel="noreferrer">ESUs</a>) machines.</em></p><p>Please see the <a href="https://docs.immy.bot/FAQ.html#what-windows-versions-does-immyagent-support" target="_blank" rel="noreferrer">FAQ section for more details</a></p></div><h1 id="troubleshooting" tabindex="-1">Troubleshooting <a class="header-anchor" href="#troubleshooting" aria-label="Permalink to &quot;Troubleshooting&quot;">​</a></h1><h2 id="identification-failures" tabindex="-1">Identification Failures <a class="header-anchor" href="#identification-failures" aria-label="Permalink to &quot;Identification Failures&quot;">​</a></h2><h3 id="needs-a-manual-decision" tabindex="-1">Needs a Manual Decision <a class="header-anchor" href="#needs-a-manual-decision" aria-label="Permalink to &quot;Needs a Manual Decision&quot;">​</a></h3><p>Generally you will click &quot;Agent Re-installed&quot;</p><p>Often when an RMM Agent gets re-installed, it will get a new id in the RMM (ComputerId in Automate, SessionID in Control). ImmyBot will recognize that it is the same computer, but due to the fact that virtualization technologies and hard drive cloning can lead to the same scenario, we require you to tell us whether we should overwrite the existing RmmComputer, or keep both. 99% of the time you will click &quot;Overwrite Existing&quot;. If the machine was in fact cloned, you would click Keep Both, in which case Immy shims the duplicate UUID with its own to prevent collisions.</p><h2 id="pending-computers" tabindex="-1">Pending Computers <a class="header-anchor" href="#pending-computers" aria-label="Permalink to &quot;Pending Computers&quot;">​</a></h2><p>Computers in the pending status have yet to be identified.</p><p>Computers may get stuck here if we are unable to run our Ephemeral Agent</p>',10),m=e("p",null,"Top 3 reasons for Identification Failures",-1),g=e("ol",null,[e("li",null,"SSL Inspection blocking our websocket"),e("li",null,"Security Software blocking PowerShell"),e("li",null,"Incorrect time is preventing SSL/TLS connection")],-1),f=e("p",null,"To understand the various reasons identification can fail, it helps to understand how ImmyBot executions PowerShell",-1),b=e("ol",null,[e("li",null,"RMM or ImmyAgent runs Immybot.Agent.Ephemeral.exe"),e("li",null,"Immybot.Agent.Ephemeral.exe establishes a secure websocket to wss://subdomain.immy.bot and runs Invoke-PSPipeHost.ps1"),e("li",null,"Immybot.Agent.Ephemeral.exe feeds Invoke-PSPipeHost.ps1 PowerShell over a pipe from the websocket session")],-1),y=r(`<p>The most common cause of identification failure is security software.</p><p>To know if this is the case, pull the logs from C:\\ProgramData\\ImmyBotAgentService*.log</p><p><img src="https://user-images.githubusercontent.com/1424395/173621779-51bd5d6d-e877-41a3-9b68-c1724747db21.png" alt="image"></p><p>Normal Immybot Agent logs look like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2022-06-14 00:02:25.560 -05:00 [DBG] Hosting starting</span></span>
<span class="line"><span>2022-06-14 00:02:25.799 -05:00 [INF] Starting Immybot Agent</span></span>
<span class="line"><span>2022-06-14 00:02:25.943 -05:00 [INF] Using configuration file stored at: C:\\ProgramData\\ImmyBotAgentService\\config.json</span></span>
<span class="line"><span>2022-06-14 00:02:26.875 -05:00 [DBG] Initializing IoT Hub connection</span></span>
<span class="line"><span>2022-06-14 00:02:35.023 -05:00 [INF] Application started. Hosting environment: Production; Content root path: C:\\WINDOWS\\TEMP\\.net\\Immybot.Agent.Service\\lreaszzz.wwx\\</span></span>
<span class="line"><span>2022-06-14 00:02:35.024 -05:00 [DBG] Hosting started</span></span>
<span class="line"><span>2022-06-14 00:02:40.552 -05:00 [WRN] IoT Hub connection status Changed Status =&gt; [Connected] Reason =&gt; [Connection_Ok]</span></span>
<span class="line"><span>2022-06-14 02:06:32.159 -05:00 [DBG] Process started; ID: 12724</span></span>
<span class="line"><span>2022-06-14 02:06:37.358 -05:00 [DBG] Running C:\\ProgramData\\ImmyBot\\Scripts\\840290f2bd2142e2bd2c612542436763\\Immybot.Agent.Ephemeral.exe --ImmyScriptPath C:\\ProgramData\\ImmyBot\\Scripts\\840290f2bd2142e2bd2c612542436763 --BackendAddress wss://immense.immy.bot/ --SessionID c946e1d1-f5fd-d36d-0489-d2a9ad9084e0</span></span>
<span class="line"><span>2022-06-14 02:06:38.335 -05:00 [DBG] PID 16184 &lt;----- Indicates successful execution</span></span>
<span class="line"><span>2022-06-14 02:06:38.372 -05:00 [DBG] Process exited; Code: 0</span></span></code></pre></div><p>Windows Defender will make the logs look like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2022-11-17 13:13:36.604 +11:00 [DBG] Hosting starting</span></span>
<span class="line"><span>2022-11-17 13:13:36.817 +11:00 [INF] Starting Immybot Agent</span></span>
<span class="line"><span>2022-11-17 13:13:36.840 +11:00 [INF] Using configuration file stored at: C:\\ProgramData\\ImmyBotAgentService\\config.json</span></span>
<span class="line"><span>2022-11-17 13:13:37.590 +11:00 [DBG] Initializing IoT Hub connection</span></span>
<span class="line"><span>2022-11-17 13:13:37.860 +11:00 [DBG] Hosting started</span></span>
<span class="line"><span>2022-11-17 13:13:38.598 +11:00 [WRN] IoT Hub connection status Changed Status =&gt; [Connected] Reason =&gt; [Connection_Ok]</span></span>
<span class="line"><span>2022-11-17 13:13:39.157 +11:00 [WRN] Dirty-Shutdown detected! Dirty-File created at: &quot;2022-11-07T04:11:59.3975026Z&quot; UTC</span></span>
<span class="line"><span>2022-11-17 13:13:41.686 +11:00 [DBG] Process started; ID: 5660</span></span>
<span class="line"><span>2022-11-17 13:13:44.674 +11:00 [DBG] Running C:\\ProgramData\\ImmyBot\\Scripts\\4303da9b790b41c6978b50b872fe17cb\\Immybot.Agent.Ephemeral.exe --ImmyScriptPath C:\\ProgramData\\ImmyBot\\Scripts\\4303da9b790b41c6978b50b872fe17cb --BackendAddress wss://ericom.immy.bot/ --SessionID a92c0ed1-ea3b-7f8a-d9c6-946d9b44ccc5</span></span>
<span class="line"><span>2022-11-17 13:13:49.577 +11:00 [DBG] WMI Error 2</span></span></code></pre></div><p>DNS Filtering/Issues make the logs look like this</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2022-09-20 20:39:59.712 +10:00 [INF] RESPONSE: {</span></span>
<span class="line"><span>  &quot;Resource&quot;: &quot;installer/challenge/request&quot;,</span></span>
<span class="line"><span>  &quot;Method&quot;: &quot;POST&quot;,</span></span>
<span class="line"><span>  &quot;StatusCode&quot;: 0,</span></span>
<span class="line"><span>  &quot;ErrorException&quot;: {</span></span>
<span class="line"><span>    &quot;ClassName&quot;: &quot;System.Net.WebException&quot;,</span></span>
<span class="line"><span>    &quot;Message&quot;: &quot;No such host is known. (XXXX.immy.bot:443)&quot;</span></span></code></pre></div><p>To correct it, you need to exclude DNS filtering for your instances hostnames, which are found under Show more &gt; integrations &gt; Fetch IP Address and Hostnames</p><p>If Powershell is failing to start on the endpoint within 60 seconds a timeout will occur.</p><p>Here is a suggestion on a cause and possible fix for that one <a href="https://www.reddit.com/r/PowerShell/comments/rx68fw/powershell_slow_to_open_long_load_timesfixed" target="_blank" rel="noreferrer">https://www.reddit.com/r/PowerShell/comments/rx68fw/powershell_slow_to_open_long_load_timesfixed</a></p><h2 id="security-software-exclusions" tabindex="-1">Security Software Exclusions <a class="header-anchor" href="#security-software-exclusions" aria-label="Permalink to &quot;Security Software Exclusions&quot;">​</a></h2><p>Ideally you would instruct your security software would support excluding code signed by</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>ImmyBot&#39;s current code-signing certificate is set to change on Feb. 11th, 2025. Please add both our upcoming and existing certificate exlusions to ensure no issues.</p><p>Please see the <a href="https://docs.immy.bot/FAQ.html#what-should-i-do-about-immybot-s-upcoming-code-signing-certificate-change" target="_blank" rel="noreferrer">FAQ section for more details</a></p></div><p>This certificate is used to sign our Agent binaries &amp; installers delivered to machines.</p><p>Unfortunately, our new certificate&#39;s <code>Organization(O)</code> and <code>Common Name(CN)</code> fields are changing from <code>Immense Networks</code> to <code>ImmyBot LLC</code>.</p><p>New Certificate on Feb. 11th, 2025:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CN=ImmyBot LLC, O=ImmyBot LLC, L=Baton Rouge, S=Louisiana, C=US</span></span></code></pre></div><p>Existing Certificate:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CN=Immense Networks, O=Immense Networks, L=Baton Rouge, S=Louisiana, C=US</span></span></code></pre></div><p>Add <em><strong>both</strong></em> certificates to avoid issues if following before Feb. 11th, 2025 <em><strong>OR</strong></em> your instance has existing machines installed (which may have agents installed with older certificate)!</p><p>Exclusions based on code signing certificate are an industry standard feature and should be a standard feature in any best-in-class security software. However, if your security software is unable to exclude based on code signing certificate, create an exclusion for your instance&#39;s Script Path.</p><p>Your script path can be found under Settings-&gt;Preferences-&gt;Script Path</p><p><img src="https://user-images.githubusercontent.com/1424395/173610304-50bab775-c7c8-40b3-944e-fab1dde862ee.png" alt="image"></p><ul><li><a href="#troubleshooting">Troubleshooting</a><ul><li><a href="#identification-failures">Identification Failures</a><ul><li><a href="#needs-a-manual-decision">Needs a Manual Decision</a></li></ul></li><li><a href="#pending-computers">Pending Computers</a></li><li><a href="#security-software-exclusions">Security Software Exclusions</a><ul><li><a href="#threatlocker">ThreatLocker</a></li><li><a href="#sophos-central">Sophos Central</a></li><li><a href="#bitdefender">BitDefender</a></li><li><a href="#crowdstrike">CrowdStrike</a></li><li><a href="#microsoft-defender-for-endpoint">Microsoft Defender for Endpoint</a></li><li><a href="#cylance">Cylance</a></li><li><a href="#sentinelone">SentinelOne</a></li><li><a href="#dnsfilter">DNSFilter</a></li><li><a href="#group-policy-objects">Group Policy Objects</a></li></ul></li></ul></li></ul><h3 id="threatlocker" tabindex="-1">ThreatLocker <a class="header-anchor" href="#threatlocker" aria-label="Permalink to &quot;ThreatLocker&quot;">​</a></h3><ol><li>Application Control-&gt; Applications</li><li>Create New Application</li><li>Put the following value into Certificate and click Add</li></ol><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>ImmyBot&#39;s current code-signing certificate is set to change on Feb. 11th, 2025. Please add both our upcoming and existing certificate exlusions to ensure no issues.</p><p>Please see the <a href="https://docs.immy.bot/FAQ.html#what-should-i-do-about-immybot-s-upcoming-code-signing-certificate-change" target="_blank" rel="noreferrer">FAQ section for more details</a></p></div><p>This certificate is used to sign our Agent binaries &amp; installers delivered to machines.</p><p>Unfortunately, our new certificate&#39;s <code>Organization(O)</code> and <code>Common Name(CN)</code> fields are changing from <code>Immense Networks</code> to <code>ImmyBot LLC</code>.</p><p>New Certificate on Feb. 11th, 2025:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CN=ImmyBot LLC, O=ImmyBot LLC, L=Baton Rouge, S=Louisiana, C=US</span></span></code></pre></div><p>Existing Certificate:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CN=Immense Networks, O=Immense Networks, L=Baton Rouge, S=Louisiana, C=US</span></span></code></pre></div><p>Add <em><strong>both</strong></em> certificates to avoid issues if following before Feb. 11th, 2025 <em><strong>OR</strong></em> your instance has existing machines installed (which may have agents installed with older certificate)!</p><ol><li>Add your instance’s <a href="#script-path-exclusion">script path</a><img src="https://user-images.githubusercontent.com/1424395/173602708-b8e239f8-efaa-4e16-a29c-9fb66f72e616.png" alt="image"> Ultimately it should look like this: <img src="https://user-images.githubusercontent.com/1424395/173602739-2b60922f-5ac8-4d4c-bc93-d52a390e129e.png" alt="image"></li><li>Create a New Application Policy <img src="https://user-images.githubusercontent.com/1424395/173602798-7042c0ea-1406-476c-a291-0deee6e843c5.png" alt="image"></li></ol><h3 id="sophos-central" tabindex="-1">Sophos Central <a class="header-anchor" href="#sophos-central" aria-label="Permalink to &quot;Sophos Central&quot;">​</a></h3><p><strong>Tenant Specific</strong> Manual Addition:</p><ol><li>Launch Client Shell</li><li>Navigate to Global Settings - Allowed Applications</li><li>Select &quot;Add apps&quot;</li><li>In the &quot;allow by:&quot; dropdown, select certificate and add the following</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CN=Immense Networks LLC, O=Immense Networks, L=Baton Rouge, S=Louisiana, C=US</span></span></code></pre></div><p>Event Log Method: If Sophos reports that Immy Bot has been blocked, you have the option of going to the Event Log and and select the option to allow by Certificate. This will only work if Sophos has picked up an alert for a process signed by the Immy Bot code signing certificate</p><p><strong>Partner Global Templates</strong></p><ol><li>Navigate to Settings &amp; Policies - Global Templates and select the template you would like to modify</li><li>Once in the template, navigate to Global Settings - Allowed Applications</li><li>Follow steps 3 and 4 listed in the <strong>Tenant Specific</strong> section above</li></ol><h3 id="bitdefender" tabindex="-1">BitDefender <a class="header-anchor" href="#bitdefender" aria-label="Permalink to &quot;BitDefender&quot;">​</a></h3><p>BitDefender will intermittently block script execution unless you disable Aggressive scanning mode or add a your instance&#39;s <a href="#security-software-exclusions">Script Path</a> to your policy&#39;s exclusion list.</p><ol><li>Edit the policy-&gt;Antimalware-&gt;Settings-&gt;In-policy Exclusions</li><li>Add a folder exclusion for your <a href="#security-software-exclusions">Script Path</a></li></ol><h3 id="crowdstrike" tabindex="-1">CrowdStrike <a class="header-anchor" href="#crowdstrike" aria-label="Permalink to &quot;CrowdStrike&quot;">​</a></h3><p>CrowdStrike uses AI to decide what to allow and disallow. Periodically this AI will mark the ImmyBot Agent or ImmyBot Ephemeral Agent as malicious. This usually happens after we update it. Marking it as a false positive in your CrowdStrike portal will train the global AI to not treat it as malicious.</p><h3 id="microsoft-defender-for-endpoint" tabindex="-1">Microsoft Defender for Endpoint <a class="header-anchor" href="#microsoft-defender-for-endpoint" aria-label="Permalink to &quot;Microsoft Defender for Endpoint&quot;">​</a></h3><p>Add a your instance&#39;s <a href="#security-software-exclusions">Script Path</a> to your policy&#39;s exclusion list. <a href="https://docs.microsoft.com/en-us/mem/intune/configuration/device-restrictions-configure#create-the-profile" target="_blank" rel="noreferrer">https://docs.microsoft.com/en-us/mem/intune/configuration/device-restrictions-configure#create-the-profile</a></p><h3 id="cylance" tabindex="-1">Cylance <a class="header-anchor" href="#cylance" aria-label="Permalink to &quot;Cylance&quot;">​</a></h3><p>Cylance blocks our websocket making the ImmybotAgent log look like this:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2022-09-21 12:24:26.562 -04:00 [INF] Process exiting.</span></span>
<span class="line"><span>2022-09-21 12:24:40.106 -04:00 [DBG] Closing Websocket...</span></span>
<span class="line"><span>2022-09-21 12:24:49.743 -04:00 [INF] Marked ConnectionState as disconnected.</span></span>
<span class="line"><span>2022-09-21 12:24:50.171 -04:00 [ERR] Application shutting down (App lifetime token cancelled)</span></span>
<span class="line"><span>System.IO.IOException: Cannot access a closed stream.</span></span>
<span class="line"><span>at System.Net.Http.HttpConnection.RawConnectionStream.WriteAsync(ReadOnlyMemory\`1 buffer, CancellationToken cancellationToken)</span></span></code></pre></div><p>To correct it, you need to bypass SSL Inspection for your instances hostnames/IPs, which are found under Show more &gt; integrations &gt; Fetch IP Address and Hostnames</p><h3 id="sentinelone" tabindex="-1">SentinelOne <a class="header-anchor" href="#sentinelone" aria-label="Permalink to &quot;SentinelOne&quot;">​</a></h3><p>Sentinel requires BOTH your instance&#39;s Script path and the ImmyBot Agent process excluded. With only the script path excluded, devices will regularly have issues running the ImmyBot Agent to download the ephemeral agent. This is apparent in two cases:</p><ol><li>Importing devices - The new agent can&#39;t download the ephemeral agent to start running inventory.</li><li>Updating ImmyBot Agents - The new agent can&#39;t download the corresponding new ephemeral agent when attempting to run deployments or scripts.</li></ol><p>You can also set your Exclusion Mode to &quot;Interoperability - Extended&quot;.</p><h3 id="dnsfilter" tabindex="-1">DNSFilter <a class="header-anchor" href="#dnsfilter" aria-label="Permalink to &quot;DNSFilter&quot;">​</a></h3><p>There have been reports indicating that DNSFilter, along with potentially other DNS filtering tools, is not directly blocking subdomain.immy.bot but has failed to resolve some DNS queries.</p><p>Specifically, in the case of DNSFilter, it was confirmed that ImmyBot was not being blocked. However, the failure in DNS resolution meant that connection attempts to the backend were unsuccessful.</p><p>Explicitly allowing the DNS for subdomain.immy.bot (replacing &quot;subdomain&quot; with your specific ImmyBot instance subdomain) was verified to resolve the issue of failed DNS resolutions.</p><p>For guidance on managing allow and block lists, please refer to: <a href="https://help.dnsfilter.com/hc/en-us/articles/1500008111381-Allow-and-Block-Lists" target="_blank" rel="noreferrer">https://help.dnsfilter.com/hc/en-us/articles/1500008111381-Allow-and-Block-Lists</a></p><h3 id="group-policy-objects" tabindex="-1">Group Policy Objects <a class="header-anchor" href="#group-policy-objects" aria-label="Permalink to &quot;Group Policy Objects&quot;">​</a></h3><p>Computer Configuration | Policies | Administrative Templates | Windows Components | Windows PowerShell | Turn on Script Execution (Enabled)</p><p>User Configuration | Policies | Administrative Templates | Windows Components | Windows PowerShell | Turn on Script Execution (Enabled)</p><p>These GPOs have been known to cause issues with running scripts.</p>`,68);function w(C,k,S,I,A,v){const n=p("Mermaid");return a(),d("div",null,[h,(a(),s(o,null,{default:t(()=>[i(n,{id:"mermaid-34",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20CheckImmyAgentLogs%5BCheck%20ImmyAgent%20Logs%20in%20C%3A%5CProgramData%5CImmyBot%5CLogs%5D%20--%3E%20DidEphemeralAgentStart%5BImmybot.Agent.Ephemeral.exe%20start%3F%5D%0A%20%20%20%20DidEphemeralAgentStart%20--%3E%20%7CYes%7CCheckEphemeralAgentLogs%5BCheck%20Ephemeral%20Agent%20logs%20in%20C%3A%5CProgramData%5CImmyBot%5CScripts%5C*%5C*.log%5D%0A%20%20%20%20DidEphemeralAgentStart%20--%3E%20%7CNo%7CBlockedBySecuritySoftware%5BExclude%20Script%20Path%20from%20Security%20Software%5D%0A%20%20%20%20CheckEphemeralAgentLogs%20--%3E%20EphemeralAgentConnect%5BDid%20Ephemeral%20Agent%20Websocket%20Connect%3F%5D%0A%20%20%20%20EphemeralAgentConnect%20--%3E%7CYes%7CDidSuccessfullyIdentifyAfterFix%0A%20%20%20%20EphemeralAgentConnect%20--%3E%20%7CNo%7CTryNoSSLInspect%5BPut%20on%20network%20without%20SSL%20Inspection%5D%0A%20%20%20%20TryNoSSLInspect%20--%3E%20DidSuccessfullyIdentifyAfterFix%5BEphemeral%20Agent%20Connect%20After%20Fix%3F%5D%0A%20%20%20%20DidSuccessfullyIdentifyAfterFix%5BMachine%20Identify%20Successfully%3F%5D%20--%3E%20%7CNo%7CEmailSupport%0A%20%20%20%20DidSuccessfullyIdentifyAfterFix%5BMachine%20Identify%20Successfully%3F%5D%20--%3E%20%7CYes%7CDone%0A%20%20%20%20EmailSupport%5B%22Email%20logs%20from%20C%3A%5CProgramData%5CImmyBot%5CLogs%20and%20C%3A%5CProgramData%5CImmyBot%5CScripts%5C*%5C*.logs%20to%20support%40immy.bot%22%5D%0A"})]),fallback:t(()=>[l(" Loading... ")]),_:1})),m,g,f,b,(a(),s(o,null,{default:t(()=>[i(n,{id:"mermaid-75",class:"mermaid",graph:"graph%20LR%0A%20%20%20%20ImmyBot%20--%3E%20%7CParallel%7CAutomate%5BRun%20script%20to%20download%20and%20run%20Ephemeral%20Agent%20via%20Automate%5D%0A%20%20%20%20ImmyBot%20--%3E%20%7CParallel%7CControl%5BRun%20script%20to%20download%20and%20run%20Ephemeral%20Agent%20via%20Control%5D%0A%20%20%20%20ImmyBot%20--%3E%20%7CParallel%7CImmyAgent%5BRun%20script%20to%20download%20and%20run%20Ephemeral%20Agent%20via%20ImmyAgent%5D%0A%20%20%20%20ImmyBot%20--%3E%20%7CParallel%7CN-Central%5BRun%20script%20to%20download%20and%20run%20Ephemeral%20Agent%20via%20N-Central%5D%0A%20%20%20%20Automate%20--%3E%20Immybot.Agent.Ephemeral.exe%0A%20%20%20%20Control%20--%3E%20Immybot.Agent.Ephemeral.exe%0A%20%20%20%20ImmyAgent%20--%3E%20Immybot.Agent.Ephemeral.exe%0A%20%20%20%20N-Central%20--%3E%20Immybot.Agent.Ephemeral.exe%0A%20%20%20%20Immybot.Agent.Ephemeral.exe%20--%3E%20cmd.exe%20--%3E%20powershell.exe%20--%3E%20Invoke-PSPipeHost.ps1%0A"})]),fallback:t(()=>[l(" Loading... ")]),_:1})),y])}const E=c(u,[["render",w]]);export{P as __pageData,E as default};
