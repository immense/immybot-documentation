# API Documentation

ImmyBot provides a comprehensive API that allows you to integrate with and extend the platform. This guide explains how to authenticate, make requests, and use the available endpoints.

## API Overview

The ImmyBot API is a RESTful API that uses standard HTTP methods and returns JSON responses. You can use the API to:

- Manage computers and users
- Create and update deployments
- Run maintenance sessions
- Retrieve inventory information
- Automate workflows
- Integrate with other systems

## Authentication

All API requests require authentication using an API key.

### Obtaining an API Key

1. Log in to ImmyBot as an administrator
2. Navigate to **Show more** > **OAuth Tokens**
3. Click **Create API Key**
4. Enter a name and description for the key
5. Select the appropriate permissions
6. Click **Create**
7. Copy and securely store the API key (it will only be shown once)

### Using API Keys

Include your API key in the `Authorization` header of all requests:

```
Authorization: Bearer YOUR_API_KEY
```

Example using curl:

```bash
curl -X GET "https://yourdomain.immy.bot/api/v1/computers" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Base URL

The base URL for all API requests is:

```
https://yourdomain.immy.bot/api/v1/
```

Replace `yourdomain.immy.bot` with your actual ImmyBot instance domain.

## Common Endpoints

### Computers

#### List Computers

```
GET /computers
```

Query parameters:
- `tenant_id`: Filter by tenant ID
- `status`: Filter by status (Online, Offline)
- `os`: Filter by operating system

> **Note:** The current API version does not support pagination.

Example response:

```json
{
  "total": 256,
  "computers": [
    {
      "id": "c12345",
      "name": "DESKTOP-ABC123",
      "status": "Online",
      "tenant_id": "t789",
      "tenant_name": "Acme Corp",
      "os": "Windows 10 Pro 21H2",
      "last_seen": "2023-06-15T14:32:10Z",
      "primary_user_id": "u456",
      "primary_user_name": "John Doe"
    },
    // More computers...
  ]
}
```

#### Get Computer Details

```
GET /computers/{computer_id}
```

Example response:

```json
{
  "id": "c12345",
  "name": "DESKTOP-ABC123",
  "status": "Online",
  "tenant_id": "t789",
  "tenant_name": "Acme Corp",
  "os": "Windows 10 Pro 21H2",
  "last_seen": "2023-06-15T14:32:10Z",
  "primary_user_id": "u456",
  "primary_user_name": "John Doe",
  "hardware": {
    "manufacturer": "Dell Inc.",
    "model": "Latitude 5420",
    "serial_number": "ABC123XYZ",
    "processor": "Intel(R) Core(TM) i5-1135G7",
    "memory_gb": 16,
    "disk_gb": 512
  },
  "network": {
    "hostname": "DESKTOP-ABC123",
    "domain": "acme.local",
    "ip_addresses": ["192.168.1.100", "fe80::1234:5678:9abc:def0"]
  }
}
```

#### Run Maintenance

```
POST /computers/{computer_id}/maintenance
```

Request body:

```json
{
  "deployment_ids": ["d123", "d456"],  // Optional: specific deployments to run
  "notify_user": true,                 // Optional: whether to notify the user
  "priority": "High"                   // Optional: priority (High, Normal, Low)
}
```

Example response:

```json
{
  "session_id": "s789",
  "computer_id": "c12345",
  "status": "Pending",
  "created_at": "2023-06-15T15:00:00Z"
}
```

### Deployments

#### List Deployments

```
GET /deployments
```

Query parameters:
- `type`: Filter by type (Software, Task, Configuration)
- `tenant_id`: Filter by tenant ID

> **Note:** The current API version does not support pagination.

Example response:

```json
{
  "total": 45,
  "deployments": [
    {
      "id": "d123",
      "name": "Install Chrome",
      "type": "Software",
      "software_id": "s456",
      "software_name": "Google Chrome",
      "version": "114.0.5735.134",
      "mode": "Enforced",
      "created_at": "2023-01-15T10:20:30Z",
      "updated_at": "2023-05-20T14:25:10Z"
    },
    // More deployments...
  ]
}
```

#### Create Deployment

```
POST /deployments
```

Request body:

```json
{
  "name": "Install Firefox",
  "type": "Software",
  "software_id": "s789",
  "version": "Latest",
  "mode": "Enforced",
  "targets": [
    {
      "type": "Tenant",
      "id": "t456"
    }
  ]
}
```

Example response:

```json
{
  "id": "d890",
  "name": "Install Firefox",
  "type": "Software",
  "software_id": "s789",
  "software_name": "Mozilla Firefox",
  "version": "Latest",
  "mode": "Enforced",
  "created_at": "2023-06-15T15:10:00Z",
  "updated_at": "2023-06-15T15:10:00Z"
}
```

### Maintenance Sessions

#### List Sessions

```
GET /sessions
```

Query parameters:
- `status`: Filter by status (Pending, Running, Completed, Failed)
- `computer_id`: Filter by computer ID
- `tenant_id`: Filter by tenant ID

> **Note:** The current API version does not support pagination.

Example response:

```json
{
  "total": 1256,
  "sessions": [
    {
      "id": "s123",
      "computer_id": "c456",
      "computer_name": "DESKTOP-XYZ789",
      "status": "Completed",
      "start_time": "2023-06-15T14:00:00Z",
      "end_time": "2023-06-15T14:15:30Z",
      "action_count": 5,
      "success_count": 5,
      "failure_count": 0
    },
    // More sessions...
  ]
}
```

#### Get Session Details

```
GET /sessions/{session_id}
```

Example response:

```json
{
  "id": "s123",
  "computer_id": "c456",
  "computer_name": "DESKTOP-XYZ789",
  "status": "Completed",
  "start_time": "2023-06-15T14:00:00Z",
  "end_time": "2023-06-15T14:15:30Z",
  "actions": [
    {
      "id": "a123",
      "deployment_id": "d789",
      "deployment_name": "Install Chrome",
      "type": "Software",
      "status": "Success",
      "start_time": "2023-06-15T14:01:10Z",
      "end_time": "2023-06-15T14:05:45Z",
      "details": "Google Chrome 114.0.5735.134 installed successfully"
    },
    // More actions...
  ]
}
```

## Webhooks

ImmyBot can send webhook notifications for various events.

### Configuring Webhooks

1. Navigate to **Show more** > **Integrations** > **Webhooks**
2. Click **Create Webhook**
3. Enter a name and description
4. Enter the destination URL
5. Select the events to trigger the webhook
6. Configure any additional options
7. Click **Save**

### Webhook Events

ImmyBot can send webhooks for the following events:

- Session Started
- Session Completed
- Session Failed
- Computer Added
- Computer Status Changed
- Deployment Created
- Deployment Updated
- Software Added
- Software Updated

### Webhook Format

Webhooks are sent as HTTP POST requests with a JSON body. The exact format depends on the event type, but all webhooks include:

```json
{
  "event_type": "session.completed",
  "timestamp": "2023-06-15T14:15:30Z",
  "instance_id": "your-instance-id",
  "data": {
    // Event-specific data
  }
}
```

## Rate Limiting

The ImmyBot API implements rate limiting to prevent abuse. The current limits are:

- 60 requests per minute per API key
- 1000 requests per hour per API key

If you exceed these limits, you'll receive a `429 Too Many Requests` response.

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

### PowerShell Example: Get All Online Computers

```powershell
$apiKey = "YOUR_API_KEY"
$baseUrl = "https://yourdomain.immy.bot/api/v1"

$headers = @{
    "Authorization" = "Bearer $apiKey"
}

$response = Invoke-RestMethod -Uri "$baseUrl/computers?status=Online" -Headers $headers -Method Get

foreach ($computer in $response.computers) {
    Write-Host "$($computer.name) - $($computer.tenant_name)"
}
```

### Python Example: Create a Deployment

```python
import requests

api_key = "YOUR_API_KEY"
base_url = "https://yourdomain.immy.bot/api/v1"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "name": "Install Notepad++",
    "type": "Software",
    "software_id": "s123",
    "version": "Latest",
    "mode": "Enforced",
    "targets": [
        {
            "type": "Tenant",
            "id": "t456"
        }
    ]
}

response = requests.post(f"{base_url}/deployments", headers=headers, json=data)
print(response.json())
```

## Next Steps

Now that you understand the basics of the ImmyBot API, you might want to explore:

- [Scripting Guide](./scripts.md) - Learn how to use the API in scripts
- [Integration Overview](./integration-overview.md) - Connect ImmyBot to your existing tools
- [Build Your Own Integration](./build-your-own-integration.md) - Create custom integrations using the API

---

**Next Steps:** [Scripting Guide →](./scripts.md) | [Integration Overview →](./integration-overview.md)
