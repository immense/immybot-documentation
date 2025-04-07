# System Requirements

This page outlines the system requirements for running ImmyBot and its components.

## ImmyBot Agent Requirements

### Windows

The ImmyBot Agent supports the following Windows operating systems:

- Windows 10 (all editions)
- Windows 11 (all editions)
- Windows Server 2016
- Windows Server 2019
- Windows Server 2022

#### Minimum Hardware Requirements
- **Processor**: 1 GHz or faster
- **RAM**: 2 GB
- **Disk Space**: 100 MB for the agent
- **Network**: Internet connectivity to reach the ImmyBot server

### macOS

The ImmyBot Agent supports the following macOS versions:

- macOS 10.15 (Catalina)
- macOS 11 (Big Sur)
- macOS 12 (Monterey)
- macOS 13 (Ventura)
- macOS 14 (Sonoma)

#### Minimum Hardware Requirements
- **Processor**: Intel or Apple Silicon
- **RAM**: 2 GB
- **Disk Space**: 100 MB for the agent
- **Network**: Internet connectivity to reach the ImmyBot server

## Browser Requirements

The ImmyBot web interface supports the following browsers:

- Google Chrome (latest 2 versions)
- Microsoft Edge (latest 2 versions)
- Mozilla Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Network Requirements

### Outbound Connectivity

The ImmyBot Agent requires outbound connectivity to the following endpoints:

- `*.immy.bot` - For communication with the ImmyBot server
- `*.blob.core.windows.net` - For downloading software packages
- `*.azureedge.net` - For content delivery

### Firewall Configuration

If your organization uses a firewall, ensure the following ports are open for outbound traffic:

- **TCP 443** (HTTPS) - For secure communication with the ImmyBot server
- **TCP 80** (HTTP) - For non-secure communication (redirects to HTTPS)

## Integration Requirements

### RMM Integrations

Different RMM integrations may have specific requirements. See the individual integration setup pages for details:

- [ConnectWise Automate](./connectwise-automate-integration-setup)
- [ConnectWise Control](./connectwise-control-integration-setup)
- [N-Central](./ncentral-integration-setup)
- [NinjaRMM](./ninjarmm-integration-setup)

### PSA Integrations

PSA integrations also have specific requirements. See the individual integration setup pages for details:

- [ConnectWise Manage](./connectwise-manage-integration-setup)
- [HaloPSA](./halo-integration-setup)

## Proxy Configuration

ImmyBot supports operation through proxy servers. The following proxy types are supported:

- HTTP proxies
- HTTPS proxies
- SOCKS proxies

For detailed proxy configuration instructions, see the [Troubleshooting](./troubleshooting) guide.
