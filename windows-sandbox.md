# Testing with Windows Sandbox

Windows Sandbox is a fast loading disposable container in Windows that loses all settings when shutdown or restarted. It is very convenient for testing software deployments. It should be noted that not all software is compatible with Windows Sandbox, particular software that installs drivers or requires restarts.

If you haven't used Windows Sandbox before, you can enable it by opening Windows PowerShell as Admin and running the following command:

```powershell
Enable-WindowsOptionalFeature -FeatureName "Containers-DisposableClientVM" -All -Online -NoRestart
```

## Download Windows Sandbox file (.wsb)

![](./.vitepress/images/2021-03-15-08-29-07.png)

![](./.vitepress/images/2021-03-15-08-29-35.png)

Wait for ImmyBot Agent to install
![](./.vitepress/images/2021-03-15-08-29-41.png)


[Onboard](#onboarding) the Sandbox
![](./.vitepress/images/2021-03-15-08-30-29.png)

![](./.vitepress/images/2021-03-15-08-47-28.png)

![](./.vitepress/images/2021-03-15-08-37-50.png)

This will create an "Onboarding" Session (sessions are like running gpupdate) that will apply all applicable Deployments (deployments are like Group Policies)
