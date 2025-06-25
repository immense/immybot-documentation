# ConnectSecure Dynamic Integration

### Setting up this integration allows you to:

- Agent identification by adding an inventory script to be run against all of your endpoints
- Importing agents from linked clients into ImmyBot
- Mapping clients from the integration to tenants in ImmyBot
- Getting an install token for a specific client

### Prerequisites

- The tenant name you use to log in to the ConnectSecure portal

## Create ImmyBot Api User

1. On the home page, switch to the Global view

   ![image](/.vitepress/images/connectsecuredocs/ApiUser_Step01.png)

2. Open the toolbar on the left and navigate to Settings > Users

   ![image](/.vitepress/images/connectsecuredocs/ApiUser_Step02.png)

3. Create a new api user, `AssetViewer` is the only role you need. Other viewer roles might be utlized in future interfaces, if you want to add them.

   ![image](/.vitepress/images/connectsecuredocs/ApiUser_Step03.png)

4. Save and copy the Client ID and Client Secret

## Get "pod" URL

1. Open the API Documentation from user icon menu in ConnectSecure portal.

   ![image](/.vitepress/images/connectsecuredocs/PodURL_Step01.png)

2. Grab the root URL from the API Documentation

   ![image](/.vitepress/images/connectsecuredocs/PodURL_Step02.png)

## Create Integration in ImmyBot

1. Create a new ConnectSecure Dynamic Integration from Show More -> Integration -> Add Integration -> ConnectSecure.

2. Insert the information you have previously obtained into the parameter fields.

   ![image](/.vitepress/images/connectsecuredocs/Integration_Step01.png)

3. Click "Update"
4. Map clients, as necessary.

   ![image](/.vitepress/images/connectsecuredocs/Integration_Step02.png)

5. Your done