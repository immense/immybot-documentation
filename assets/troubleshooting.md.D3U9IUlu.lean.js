import{_ as c,D as p,c as d,b as s,w as t,a7 as o,a6 as r,j as e,o as a,I as i,a as l}from"./chunks/framework.BoRoJPP-.js";const D=JSON.parse('{"title":"Troubleshooting","description":"","frontmatter":{},"headers":[],"relativePath":"troubleshooting.md","filePath":"troubleshooting.md"}'),u={name:"troubleshooting.md"},h=r("",9),m=e("p",null,"Top 3 reasons for Identification Failures",-1),g=e("ol",null,[e("li",null,"SSL Inspection blocking our websocket"),e("li",null,"Security Software blocking PowerShell"),e("li",null,"Incorrect time is preventing SSL/TLS connection")],-1),f=e("p",null,"To understand the various reasons identification can fail, it helps to understand how ImmyBot executions PowerShell",-1),b=e("ol",null,[e("li",null,"RMM or ImmyAgent runs Immybot.Agent.Ephemeral.exe"),e("li",null,"Immybot.Agent.Ephemeral.exe establishes a secure websocket to wss://subdomain.immy.bot and runs Invoke-PSPipeHost.ps1"),e("li",null,"Immybot.Agent.Ephemeral.exe feeds Invoke-PSPipeHost.ps1 PowerShell over a pipe from the websocket session")],-1),y=r("",54);function w(C,S,k,I,A,v){const n=p("Mermaid");return a(),d("div",null,[h,(a(),s(o,null,{default:t(()=>[i(n,{id:"mermaid-32",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20CheckImmyAgentLogs%5BCheck%20ImmyAgent%20Logs%20in%20C%3A%5CProgramData%5CImmyBot%5CLogs%5D%20--%3E%20DidEphemeralAgentStart%5BImmybot.Agent.Ephemeral.exe%20start%3F%5D%0A%20%20%20%20DidEphemeralAgentStart%20--%3E%20%7CYes%7CCheckEphemeralAgentLogs%5BCheck%20Ephemeral%20Agent%20logs%20in%20C%3A%5CProgramData%5CImmyBot%5CScripts%5C*%5C*.log%5D%0A%20%20%20%20DidEphemeralAgentStart%20--%3E%20%7CNo%7CBlockedBySecuritySoftware%5BExclude%20Script%20Path%20from%20Security%20Software%5D%0A%20%20%20%20CheckEphemeralAgentLogs%20--%3E%20EphemeralAgentConnect%5BDid%20Ephemeral%20Agent%20Websocket%20Connect%3F%5D%0A%20%20%20%20EphemeralAgentConnect%20--%3E%7CYes%7CDidSuccessfullyIdentifyAfterFix%0A%20%20%20%20EphemeralAgentConnect%20--%3E%20%7CNo%7CTryNoSSLInspect%5BPut%20on%20network%20without%20SSL%20Inspection%5D%0A%20%20%20%20TryNoSSLInspect%20--%3E%20DidSuccessfullyIdentifyAfterFix%5BEphemeral%20Agent%20Connect%20After%20Fix%3F%5D%0A%20%20%20%20DidSuccessfullyIdentifyAfterFix%5BMachine%20Identify%20Successfully%3F%5D%20--%3E%20%7CNo%7CEmailSupport%0A%20%20%20%20DidSuccessfullyIdentifyAfterFix%5BMachine%20Identify%20Successfully%3F%5D%20--%3E%20%7CYes%7CDone%0A%20%20%20%20EmailSupport%5B%22Email%20logs%20from%20C%3A%5CProgramData%5CImmyBot%5CLogs%20and%20C%3A%5CProgramData%5CImmyBot%5CScripts%5C*%5C*.logs%20to%20support%40immy.bot%22%5D%0A"})]),fallback:t(()=>[l(" Loading... ")]),_:1})),m,g,f,b,(a(),s(o,null,{default:t(()=>[i(n,{id:"mermaid-73",class:"mermaid",graph:"graph%20LR%0A%20%20%20%20ImmyBot%20--%3E%20%7CParallel%7CAutomate%5BRun%20script%20to%20download%20and%20run%20Ephemeral%20Agent%20via%20Automate%5D%0A%20%20%20%20ImmyBot%20--%3E%20%7CParallel%7CControl%5BRun%20script%20to%20download%20and%20run%20Ephemeral%20Agent%20via%20Control%5D%0A%20%20%20%20ImmyBot%20--%3E%20%7CParallel%7CImmyAgent%5BRun%20script%20to%20download%20and%20run%20Ephemeral%20Agent%20via%20ImmyAgent%5D%0A%20%20%20%20ImmyBot%20--%3E%20%7CParallel%7CN-Central%5BRun%20script%20to%20download%20and%20run%20Ephemeral%20Agent%20via%20N-Central%5D%0A%20%20%20%20Automate%20--%3E%20Immybot.Agent.Ephemeral.exe%0A%20%20%20%20Control%20--%3E%20Immybot.Agent.Ephemeral.exe%0A%20%20%20%20ImmyAgent%20--%3E%20Immybot.Agent.Ephemeral.exe%0A%20%20%20%20N-Central%20--%3E%20Immybot.Agent.Ephemeral.exe%0A%20%20%20%20Immybot.Agent.Ephemeral.exe%20--%3E%20cmd.exe%20--%3E%20powershell.exe%20--%3E%20Invoke-PSPipeHost.ps1%0A"})]),fallback:t(()=>[l(" Loading... ")]),_:1})),y])}const E=c(u,[["render",w]]);export{D as __pageData,E as default};
