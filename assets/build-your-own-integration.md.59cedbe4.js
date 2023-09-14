import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.392dd896.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"build-your-own-integration.md","filePath":"build-your-own-integration.md"}'),p={name:"build-your-own-integration.md"},o=l(`<h2 id="build-your-own-integrations" tabindex="-1">Build Your Own Integrations <a class="header-anchor" href="#build-your-own-integrations" aria-label="Permalink to &quot;Build Your Own Integrations&quot;">​</a></h2><p>The goal of this feature is primarily for our own use to more rapidly implement integrations with other RMMs and PSA, but we have opened it up for you to create your own integrations as well.</p><p><img src="https://github.com/immense/immybot-documentation/assets/31077619/ebdbfab0-a149-4d0d-8e56-cad8291df879" alt="image"></p><p><img src="https://github.com/immense/immybot-documentation/assets/31077619/f5a9d865-2a7d-4843-9a58-298557dd674d" alt="image"></p><h4 id="example-sentinelone-implemented-in-global-already" tabindex="-1">Example: SentinelOne (Implemented in Global already) <a class="header-anchor" href="#example-sentinelone-implemented-in-global-already" aria-label="Permalink to &quot;Example: SentinelOne (Implemented in Global already)&quot;">​</a></h4><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$Integration </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">New-DynamicIntegration</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Init {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">param</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#79B8FF;">Parameter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">Mandatory</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#F97583;">Uri</span><span style="color:#E1E4E8;">]$S1Uri</span><span style="color:#F97583;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#79B8FF;">Parameter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">Mandatory</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># [DisplayName(&quot;API Key&quot;)]</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#F97583;">Password</span><span style="color:#E1E4E8;">(StripValue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">$true</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#E1E4E8;">        $S1ApiKey</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">    $providerTypeFormData </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Write-Variable</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">Import-Module</span><span style="color:#E1E4E8;"> SentinelOne    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">Get-Command</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Module SentinelOne </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Out-String</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Write-Host</span></span>
<span class="line"><span style="color:#E1E4E8;">    $S1AuthHeader </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Connect-S1API</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">S1Uri $S1Uri </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">S1APIToken $S1ApiKey</span></span>
<span class="line"><span style="color:#E1E4E8;">    $IntegrationContext.S1Uri </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> $S1Uri</span></span>
<span class="line"><span style="color:#E1E4E8;">    $IntegrationContext.S1ApiKey </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> $S1ApiKey</span></span>
<span class="line"><span style="color:#E1E4E8;">    $IntegrationContext.AuthHeader </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> $S1AuthHeader</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#F97583;">OpResult</span><span style="color:#E1E4E8;">]::Ok()</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">HealthCheck {</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#79B8FF;">CmdletBinding</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#79B8FF;">OutputType</span><span style="color:#E1E4E8;">([</span><span style="color:#F97583;">HealthCheckResult</span><span style="color:#E1E4E8;">])]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">param</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># todo: implement health check</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">New-HealthyResult</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># supports listing clients</span></span>
<span class="line"><span style="color:#E1E4E8;">$Integration </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Add-DynamicIntegrationCapability</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Interface ISupportsListingClients </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">GetClients {</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#79B8FF;">CmdletBinding</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#79B8FF;">OutputType</span><span style="color:#E1E4E8;">([</span><span style="color:#F97583;">Immybot.Backend.Domain.Providers.IProviderClientDetails</span><span style="color:#E1E4E8;">[]])]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">param</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># return a list of clients for this integration using the New-IntegrationClient cmdlet</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">Import-Module</span><span style="color:#E1E4E8;"> SentinelOne</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">Get-S1Site</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Verbose </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ForEach-Object</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">New-IntegrationClient</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">ClientId </span><span style="color:#79B8FF;">$_</span><span style="color:#E1E4E8;">.Id </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">ClientName </span><span style="color:#79B8FF;">$_</span><span style="color:#E1E4E8;">.Name</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># supports listing agents</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">$Integration </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Add-DynamicIntegrationCapability</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Interface ISupportsListingAgents </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">GetAgents {</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#79B8FF;">CmdletBinding</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#79B8FF;">OutputType</span><span style="color:#E1E4E8;">([</span><span style="color:#F97583;">Immybot.Backend.Domain.Providers.IProviderAgentDetails</span><span style="color:#E1E4E8;">[]])]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">param</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#79B8FF;">Parameter</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">[]]$clientIds </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">$null</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">Import-Module</span><span style="color:#E1E4E8;"> SentinelOne</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">Get-S1Agent</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Verbose </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ForEach-Object</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">New-IntegrationAgent</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Name </span><span style="color:#79B8FF;">$_</span><span style="color:#E1E4E8;">.computerName </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">SerialNumber </span><span style="color:#79B8FF;">$_</span><span style="color:#E1E4E8;">.serialNumber </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">OSName </span><span style="color:#79B8FF;">$_</span><span style="color:#E1E4E8;">.osName </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Manufacturer </span><span style="color:#79B8FF;">$_</span><span style="color:#E1E4E8;">.modelName </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">ClientId </span><span style="color:#79B8FF;">$_</span><span style="color:#E1E4E8;">.siteId </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">AgentId </span><span style="color:#79B8FF;">$_</span><span style="color:#E1E4E8;">.uuid </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">IsOnline </span><span style="color:#79B8FF;">$true</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">AgentVersion </span><span style="color:#79B8FF;">$_</span><span style="color:#E1E4E8;">.agentVersion </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">SupportsRunningScripts </span><span style="color:#79B8FF;">$false</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># supports inventory identification</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">$Integration </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Add-DynamicIntegrationCapability</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Interface ISupportsInventoryIdentification </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">GetInventoryScript {</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#79B8FF;">CmdletBinding</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">param</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">Invoke-ImmyCommand</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># implement a script block that will be ran on a computer to retrieve the agent identifier for this integration.</span></span>
<span class="line"><span style="color:#E1E4E8;">        $path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Resolve-Path</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;C:\\Program Files\\SentinelOne\\Sentinel Agent*\\SentinelCtl.exe&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;"> $path.Path agent_id</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># supports retrieving a tenant install token</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">$Integration </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Add-DynamicIntegrationCapability</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Interface ISupportsTenantInstallToken </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">GetTenantInstallToken {</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#79B8FF;">CmdletBinding</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#79B8FF;">OutputType</span><span style="color:#E1E4E8;">([</span><span style="color:#F97583;">System.String</span><span style="color:#E1E4E8;">])]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">param</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#79B8FF;">Parameter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">Mandatory</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">$true</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#F97583;">System.String</span><span style="color:#E1E4E8;">]$clientId</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;implement me&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># supports retrieving a tenant uninstall token</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">$Integration </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Add-DynamicIntegrationCapability</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Interface ISupportsTenantUninstallToken </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">GetTenantUninstallToken {</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#79B8FF;">CmdletBinding</span><span style="color:#E1E4E8;">()]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#79B8FF;">OutputType</span><span style="color:#E1E4E8;">([</span><span style="color:#F97583;">System.String</span><span style="color:#E1E4E8;">])]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">param</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#79B8FF;">Parameter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">Mandatory</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">$true</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#E1E4E8;">        [</span><span style="color:#F97583;">System.String</span><span style="color:#E1E4E8;">]$clientId</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;implement me&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> $Integration</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$Integration </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">New-DynamicIntegration</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Init {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">param</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#005CC5;">Parameter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">Mandatory</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#D73A49;">Uri</span><span style="color:#24292E;">]$S1Uri</span><span style="color:#D73A49;">,</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#005CC5;">Parameter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">Mandatory</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># [DisplayName(&quot;API Key&quot;)]</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#D73A49;">Password</span><span style="color:#24292E;">(StripValue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">$true</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#24292E;">        $S1ApiKey</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">    $providerTypeFormData </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Write-Variable</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">Import-Module</span><span style="color:#24292E;"> SentinelOne    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">Get-Command</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Module SentinelOne </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Out-String</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Write-Host</span></span>
<span class="line"><span style="color:#24292E;">    $S1AuthHeader </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Connect-S1API</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">S1Uri $S1Uri </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">S1APIToken $S1ApiKey</span></span>
<span class="line"><span style="color:#24292E;">    $IntegrationContext.S1Uri </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> $S1Uri</span></span>
<span class="line"><span style="color:#24292E;">    $IntegrationContext.S1ApiKey </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> $S1ApiKey</span></span>
<span class="line"><span style="color:#24292E;">    $IntegrationContext.AuthHeader </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> $S1AuthHeader</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#D73A49;">OpResult</span><span style="color:#24292E;">]::Ok()</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">HealthCheck {</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#005CC5;">CmdletBinding</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#005CC5;">OutputType</span><span style="color:#24292E;">([</span><span style="color:#D73A49;">HealthCheckResult</span><span style="color:#24292E;">])]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">param</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># todo: implement health check</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">New-HealthyResult</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># supports listing clients</span></span>
<span class="line"><span style="color:#24292E;">$Integration </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Add-DynamicIntegrationCapability</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Interface ISupportsListingClients </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">GetClients {</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#005CC5;">CmdletBinding</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#005CC5;">OutputType</span><span style="color:#24292E;">([</span><span style="color:#D73A49;">Immybot.Backend.Domain.Providers.IProviderClientDetails</span><span style="color:#24292E;">[]])]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">param</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># return a list of clients for this integration using the New-IntegrationClient cmdlet</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">Import-Module</span><span style="color:#24292E;"> SentinelOne</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">Get-S1Site</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Verbose </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ForEach-Object</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">New-IntegrationClient</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">ClientId </span><span style="color:#005CC5;">$_</span><span style="color:#24292E;">.Id </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">ClientName </span><span style="color:#005CC5;">$_</span><span style="color:#24292E;">.Name</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># supports listing agents</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">$Integration </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Add-DynamicIntegrationCapability</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Interface ISupportsListingAgents </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">GetAgents {</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#005CC5;">CmdletBinding</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#005CC5;">OutputType</span><span style="color:#24292E;">([</span><span style="color:#D73A49;">Immybot.Backend.Domain.Providers.IProviderAgentDetails</span><span style="color:#24292E;">[]])]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">param</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#005CC5;">Parameter</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">[]]$clientIds </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">$null</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">Import-Module</span><span style="color:#24292E;"> SentinelOne</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">Get-S1Agent</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Verbose </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ForEach-Object</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">New-IntegrationAgent</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Name </span><span style="color:#005CC5;">$_</span><span style="color:#24292E;">.computerName </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">SerialNumber </span><span style="color:#005CC5;">$_</span><span style="color:#24292E;">.serialNumber </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">OSName </span><span style="color:#005CC5;">$_</span><span style="color:#24292E;">.osName </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Manufacturer </span><span style="color:#005CC5;">$_</span><span style="color:#24292E;">.modelName </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">ClientId </span><span style="color:#005CC5;">$_</span><span style="color:#24292E;">.siteId </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">AgentId </span><span style="color:#005CC5;">$_</span><span style="color:#24292E;">.uuid </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">IsOnline </span><span style="color:#005CC5;">$true</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">AgentVersion </span><span style="color:#005CC5;">$_</span><span style="color:#24292E;">.agentVersion </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">SupportsRunningScripts </span><span style="color:#005CC5;">$false</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># supports inventory identification</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">$Integration </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Add-DynamicIntegrationCapability</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Interface ISupportsInventoryIdentification </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">GetInventoryScript {</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#005CC5;">CmdletBinding</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">param</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">Invoke-ImmyCommand</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># implement a script block that will be ran on a computer to retrieve the agent identifier for this integration.</span></span>
<span class="line"><span style="color:#24292E;">        $path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Resolve-Path</span><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;C:\\Program Files\\SentinelOne\\Sentinel Agent*\\SentinelCtl.exe&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">.</span><span style="color:#24292E;"> $path.Path agent_id</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># supports retrieving a tenant install token</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">$Integration </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">Add-DynamicIntegrationCapability</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Interface ISupportsTenantInstallToken </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">GetTenantInstallToken {</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#005CC5;">CmdletBinding</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#005CC5;">OutputType</span><span style="color:#24292E;">([</span><span style="color:#D73A49;">System.String</span><span style="color:#24292E;">])]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">param</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#005CC5;">Parameter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">Mandatory</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">$true</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#D73A49;">System.String</span><span style="color:#24292E;">]$clientId</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;implement me&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># supports retrieving a tenant uninstall token</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">$Integration </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Add-DynamicIntegrationCapability</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Interface ISupportsTenantUninstallToken </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">GetTenantUninstallToken {</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#005CC5;">CmdletBinding</span><span style="color:#24292E;">()]</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#005CC5;">OutputType</span><span style="color:#24292E;">([</span><span style="color:#D73A49;">System.String</span><span style="color:#24292E;">])]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">param</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#005CC5;">Parameter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">Mandatory</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">$true</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#24292E;">        [</span><span style="color:#D73A49;">System.String</span><span style="color:#24292E;">]$clientId</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;implement me&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> $Integration</span></span></code></pre></div><p><img src="https://github.com/immense/immybot-documentation/assets/31077619/67ea8b15-0ae9-44e6-b3e0-9de250b15010" alt="image"></p><h4 id="dynamic-integration-capabilities" tabindex="-1">Dynamic Integration Capabilities <a class="header-anchor" href="#dynamic-integration-capabilities" aria-label="Permalink to &quot;Dynamic Integration Capabilities&quot;">​</a></h4><ul><li>List Customers from the remote system so they can be mapped in the ImmyBot UI</li></ul>`,9),e=[o];function t(r,c,E,y,i,F){return n(),a("div",null,e)}const C=s(p,[["render",t]]);export{d as __pageData,C as default};