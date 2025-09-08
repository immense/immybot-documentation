# API Documentation

ImmyBot provides a comprehensive API that allows you to integrate with and extend the platform. This guide explains how to authenticate, make requests, and use the available endpoints.

## API Overview

::: info
We utilize Sieve for sorting, filtering and pagenation https://github.com/Biarity/Sieve
:::

The ImmyBot API is a RESTful API that uses standard HTTP methods and returns JSON responses. You can use the API to:

- Manage computers and users
- Create and update deployments
- Run maintenance sessions
- Retrieve inventory information
- Automate workflows
- Integrate with other systems

### API Documentation with Swagger

ImmyBot provides interactive API documentation through Swagger UI, which allows you to explore and test all available endpoints directly in your browser:

1. Navigate to `https://yourdomain.immy.bot/swagger` (replace "yourdomain" with your ImmyBot instance name)
2. Browse the available endpoints organized by category
3. Expand any endpoint to see details about parameters, request body format, and response schemas
4. Test endpoints directly from the Swagger UI by providing required parameters

## Authentication

All API requests require authentication using an Azure Enterprise application.

1. **Create an App Registration in Microsoft Entra ID (Azure AD)**:
   - Navigate to [Microsoft Entra ID App Registrations](https://entra.microsoft.com/#view/Microsoft_AAD_RegisteredApps/CreateApplicationBlade/quickStartType~/null/isMSAApp~/false)
   - Create a new registration with default settings, do not change anything except what is required
   - Click Register
   - Copy the Client (Application) ID for later use.

2. **Create a Client Secret**:
   - In your App Registration, go to "Certificates & Secrets"
   - Create a new client secret and copy its VALUE (not the ID)

3. **Configure ImmyBot Access**:
   - Navigate to Enterprise Apps in Azure
   - Click on your API Application that you just made
   - Copy the object ID of the Enterprise App (Not the Application ID)
   - In ImmyBot, go to Show More → People → New
   - Paste the Enterprise App's object ID into the "AD External ID" field
   - Fill out the rest of the form as you see fit
   - Create a user from this person and grant admin privileges

### Using the API

Example:

:::info
This script is for demonstration purposes only. You should not hard code API secrets into your code. This script will:
1. Take your configured variables and get an authentication token from Azure
2. It will load 2 functions into the powershell context that the script is running in
   1. Get-ImmyBotApiAuthToken
   2. Invoke-ImmyBotRestMethod
3. Create an ImmyBot authentication token based on the Azure token

From there, in the same PowerShell context, you will be able to call Invoke-ImmyBotRestMethod and provide an endpoint. By default Invoke-ImmyBotRestMethod uses GET as the method, however, you can set that to any other applicable method.
:::

```powershell
# Configuration Variables
$AzureDomain = ''          # Your domain, e.g., contoso.com
$ClientID = ''             # Application (Client) ID from App Registration
$Secret = ''               # Client Secret value from App Registration
$InstanceSubdomain = ''    # Your ImmyBot instance subdomain name (without .immy.bot)

# Authentication Setup
$TokenEndpointUri = [uri](Invoke-RestMethod "https://login.windows.net/$AzureDomain/.well-known/openid-configuration").token_endpoint
$TenantID = ($TokenEndpointUri.Segments | Select-Object -Skip 1 -First 1).Replace("/", "")
$Script:BaseURL = "https://$($InstanceSubdomain).immy.bot"

Function Get-ImmyBotApiAuthToken {
    [CmdletBinding()]
    Param (
        [Parameter(Mandatory)]
        [string]$TenantId,
        [Parameter(Mandatory)]
        [string]$ApplicationId,
        [Parameter(Mandatory)]
        [string]$Secret,
        [Parameter(Mandatory)]
        [string]$ApiEndpointUri
    )

    $RequestAccessTokenUri = "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token"
    $body = "grant_type=client_credentials&client_id=$applicationId&client_secret=$Secret&scope=$($ApiEndpointUri)/.default"
    $contentType = 'application/x-www-form-urlencoded'

    try {
        $Token = Invoke-RestMethod -Method Post -Uri $RequestAccessTokenUri -Body $body -ContentType $contentType
        return $Token
    }
    catch {
        Write-Error "Failed to obtain authentication token: $_"
        throw
    }
}

# Get authentication token
$Token = Get-ImmyBotApiAuthToken -ApplicationId $ClientId -TenantId $TenantID -Secret $Secret -ApiEndpointUri $BaseURL
$Script:ImmyBotApiAuthHeader = @{
    "authorization" = "Bearer $($Token.access_token)"
}

# Helper function for API calls
Function Invoke-ImmyBotRestMethod {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Endpoint,

        [Parameter()]
        [string]$Method = "GET",

        [Parameter()]
        $Body
    )

    if($body -is [Hashtable]) {
        $Body = $Body | ConvertTo-Json -Depth 100
    }

    $Endpoint = $Endpoint.TrimStart('/')
    $params = @{
        Method = $Method
        ContentType = "application/json"
    }

    if ($Body) {
        $params.Body = $body
    }

    try {
        Invoke-RestMethod -Uri "$($Script:BaseURL)/$Endpoint" -Headers $Script:ImmyBotApiAuthHeader @params
    }
    catch {
        Write-Error "API call to $Endpoint failed: $_"
        throw
    }
}
```

## Error Handling

The API uses standard HTTP status codes to indicate success or failure:

- `200 OK`: The request was successful
- `201 Created`: The resource was created successfully
- `400 Bad Request`: The request was invalid
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: The API key doesn't have permission
- `404 Not Found`: The resource doesn't exist
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Something went wrong on the server

Error responses include a JSON body with more information:

```json
{
  "error": {
    "code": "invalid_parameter",
    "message": "The parameter 'deployment_id' is invalid",
    "details": "Deployment with ID 'd999' not found"
  }
}
```

## Examples

Please see [Building your own integration](/Documentation/Integrations/build-your-own-integration.md) for examples for API scripts


## Next Steps

Now that you understand the basics of the ImmyBot API, you might want to explore:

- [Scripting Guide](/Documentation/AdvancedTopics/scripts.md) - Learn how to use the API in scripts
- [Integration Overview](/Documentation/Integrations/integration-overview.md) - Connect ImmyBot to your existing tools
- [Build Your Own Integration](/Documentation/Integrations/build-your-own-integration.md) - Create custom integrations using the API
