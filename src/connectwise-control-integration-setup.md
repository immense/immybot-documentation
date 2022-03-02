# ConnectWise Control

Setting up this integration allows you to
1. Import customers from Control
2. Import computers from Control
3. Manage all computers in Control without deploying the ImmyBot Agent
4. Remote into computers from the ImmyBot interface using Control (Note: We default to requiring customer consent, you can disable this under Settings->Preferences)
5. Fix the Automate agent using the Control agent (by creating a cross-tenant deployment for the Automate Agent and creating a schedule for your customers)

## Install ImmyBot Extension for Control

![](./.vuepress/images/2021-03-23-19-12-34.png)

![](./.vuepress/images/2021-03-23-19-13-56.png)

![](./.vuepress/images/2021-03-23-19-17-38.png)

## Create RMMLink for Control

![](./.vuepress/images/2022-01-26-00-11-38.png)
![](./.vuepress/images/2022-01-26-00-09-33.png)

FAQ
What custom property do I use?
By default most ConnectWise Control instances you would select 1 for the ClientName CustomProperty field, this is the "Company" property in Control.
Secondary group is any number between 1-8 that you would like to group from based on Control groups.
You can find more infomation about Control custom propertys here;
https://docs.connectwise.com/ConnectWise_Control_Documentation/Get_started/Administration_page/Appearance_page/Add_custom_properties_to_sessions

## Import your customers

![](./.vuepress/images/2021-03-23-18-57-19.png)

![](./.vuepress/images/2021-03-23-19-01-36.png)

Alternatively, you can create/map only certain customers.

When you map a customer from an RMM, the computers will undergo Identification

![](./.vuepress/images/2021-03-23-19-21-03.png)

![](./.vuepress/images/2021-03-23-19-24-06.png)

![](./.vuepress/images/2021-03-23-19-08-30.png)
