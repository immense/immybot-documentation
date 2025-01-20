import{_ as c,D as h,c as u,b as n,w as e,a7 as i,a6 as l,j as r,a,o as t,I as s}from"./chunks/framework.B49Yz1nR.js";const d="/assets/2021-03-01-08-42-41.BdO1eeEs.png",p="/assets/2021-03-01-08-44-19.DxWpnxPw.png",m="/assets/2021-03-01-08-51-38.CHkYjk4h.png",f="/assets/2021-02-23-08-47-36.RQcrcNyf.png",g="/assets/2021-02-23-08-46-09.B9VWyRBz.png",y="/assets/2021-02-23-09-44-51.B5SaGcGw.png",b="/assets/2021-02-23-06-14-05.BkVlffY-.png",w="/assets/2021-02-23-09-18-04.BXIdr31W.png",q="/assets/2021-02-23-09-15-27.DlRPwHUk.png",k="/assets/2021-03-01-14-17-29.Ui23ea9E.png",T="/assets/2021-02-23-06-18-23.BGlqLMwh.png",A="/assets/2021-02-23-06-34-22.DUk9lR_9.png",_="/assets/2021-02-23-06-44-25.XILbubUc.png",C="/assets/2021-02-23-06-45-47.7M8JsL7z.png",S="/assets/image-3.DpVosG6l.png",v="/assets/image-7.CQrvluq-.png",I="/assets/image-6.m35gMvKa.png",H=JSON.parse('{"title":"Terminology","description":"","frontmatter":{},"headers":[],"relativePath":"terminology.md","filePath":"terminology.md"}'),P={name:"terminology.md"},x=l("",51),D=l("",8),M=l("",13),B=r("h2",{id:"task",tabindex:"-1"},[a("Task "),r("a",{class:"header-anchor",href:"#task","aria-label":'Permalink to "Task"'},"​")],-1),E=r("p",null,"A Task (aka Mainenance Task) is a catch-all for anything that isn't software.",-1),R=r("p",null,"or",-1),W=l("",56);function N(U,O,V,L,Y,F){const o=h("Mermaid");return t(),u("div",null,[x,(t(),n(i,null,{default:e(()=>[s(o,{id:"mermaid-181",class:"mermaid",graph:"flowchart%20TD%0A%20SoftwareInstall%20--%3E%20Detect%7BSoftware%20Installed%3F%7D%0A%20Detect%20--%3E%20%7CNo%7C%20Install%0A%20Detect%20--%3E%20%7CYes%7C%20HasConfigurationTask%7BHas%20Configuration%20Task%3F%7D%0A%20Install%20--%3E%20PostInstallDetect%7BSoftware%20Installed%3F%7D%0A%20PostInstallDetect%20--%3E%20%7CYes%7CHasConfigurationTask%0A%20HasConfigurationTask%20--%3E%20%7CYes%7C%20MaintenanceTaskTest%7BRun%20Test%20Script%7D%0A%20MaintenanceTaskTest%20--%3E%20%7Creturn%20%24true%7C%20Compliant%0A%20MaintenanceTaskTest%20--%3E%20%7Creturn%20%24false%7C%20RunSetScript(Run%20Set%20Script)%0A%20RunSetScript%20--%3E%20PostMaintenanceTaskTest%7BRun%20Test%20Script%7D%0A%20PostMaintenanceTaskTest%20--%3E%20%7Creturn%20%24true%7C%20Compliant%0A%20PostMaintenanceTaskTest%20--%3E%20%7Creturn%20%24false%7C%20Non-Compliant%0A%20PostInstallDetect%20--%3E%20%7CNo%7C%20Non-Compliant%0A"})]),fallback:e(()=>[a(" Loading... ")]),_:1})),D,(t(),n(i,null,{default:e(()=>[s(o,{id:"mermaid-206",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20C%5BSoftware%5D%20--%3E%20D%5BCustom%20Detection%20Script%5D%0A%20%20%20%20C%20--%3EE%5BDefault%20Uninstall%20Script%5D%0A%20%20%20%20C%20--%3E%20F%5BAuto-Update%20Script%5D%0A"})]),fallback:e(()=>[a(" Loading... ")]),_:1})),M,(t(),n(i,null,{default:e(()=>[s(o,{id:"mermaid-274",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20C%5BSoftware%20Version%5D%20--%3E%20Install%0A%20%20%20%20C%20--%3E%20Uninstall%0A%20%20%20%20C%20--%3E%20Upgrade%0A%20%20%20%20C%20--%3E%20Repair%0A%20%20%20%20C%20--%3E%20Test%0A"})]),fallback:e(()=>[a(" Loading... ")]),_:1})),B,E,(t(),n(i,null,{default:e(()=>[s(o,{id:"mermaid-281",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20C%5BTask%5D%0A%20%20%20%20C%20--%3E%20Get%0A%20%20%20%20C%20--%3E%20Set%0A%20%20%20%20C%20--%3E%20Test%0A"})]),fallback:e(()=>[a(" Loading... ")]),_:1})),R,(t(),n(i,null,{default:e(()=>[s(o,{id:"mermaid-285",class:"mermaid",graph:"graph%20TD%0A%20%20%20%20C%5BTask%5D%0A%20%20%20%20C%20--%3E%20S%5BCombined%20Script%20with%20%24method%20parameter%20containing%20'get'%2C'set'%2C%20or%20'test'%5D%0A"})]),fallback:e(()=>[a(" Loading... ")]),_:1})),W])}const z=c(P,[["render",N]]);export{H as __pageData,z as default};
