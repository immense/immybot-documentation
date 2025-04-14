# Proposed Documentation Structure for docs.immy.bot

Based on our discussions about improving the ImmyBot documentation, I've created a proposed structure that better organizes both existing and new content. This structure separates conceptual documentation from task-based guides and groups related features together for easier navigation.

## Proposed Navigation Structure

```javascript
sidebar: [
  {
    text: 'Getting Started',
    collapsed: false,
    items: [
      { text: 'Introduction to ImmyBot', link: '/introduction' },
      { text: 'Quick Start Guide', link: '/quick-start' },
      { text: 'What\'s New', link: '/releases' },
      { text: 'Terminology', link: '/terminology' },
      { text: 'System Requirements', link: '/system-requirements' },
    ]
  },
  {
    text: 'Core Concepts',
    collapsed: false,
    items: [
      { text: 'Tenants & Organizations', link: '/tenants-organizations' },
      { text: 'Computers & Inventory', link: '/computers-inventory' },
      { text: 'Users & Permissions', link: '/users-permissions' },
      { text: 'Software Library', link: '/software-library' },
      { text: 'Maintenance Tasks', link: '/maintenance-tasks' },
      { text: 'Maintenance Sessions', link: '/maintenance-sessions' },
    ]
  },
  {
    text: 'Key Features',
    collapsed: true,
    items: [
      {
        text: 'Deployments',
        collapsed: true,
        items: [
          { text: 'Deployments Overview', link: '/deployments' },
          { text: 'Recommended Deployments', link: '/recommended-deployments' },
          { text: 'Deployment Resolution', link: '/deployment-resolution' },
        ]
      },
      {
        text: 'Computer Management',
        collapsed: true,
        items: [
          { text: 'Computer Onboarding', link: '/onboarding' },
          { text: 'Computer Inventory', link: '/computer-inventory' },
          { text: 'Computer Maintenance', link: '/computer-maintenance' },
        ]
      },
      {
        text: 'User Management',
        collapsed: true,
        items: [
          { text: 'User Roles', link: '/user-roles' },
          { text: 'User Affinity', link: '/user-affinity' },
          { text: 'Self-Service Portal', link: '/self-service-portal' },
        ]
      },
      {
        text: 'Scripting & Automation',
        collapsed: true,
        items: [
          { text: 'Scripting Guide', link: '/scripts' },
          { text: 'Metascripts / Cloud Scripts', link: '/immy-commands' },
          { text: 'Windows Sandbox', link: '/windows-sandbox' },
        ]
      },
    ]
  },
  {
    text: 'How-To Guides',
    collapsed: true,
    items: [
      { text: 'Creating & Managing Deployments', link: '/creating-managing-deployments' },
      { text: 'Onboarding Computers', link: '/onboarding-computers' },
      { text: 'Managing Software', link: '/managing-software' },
      { text: 'Running Maintenance', link: '/running-maintenance' },
      { text: 'Adding Users', link: '/add-users' },
      { text: 'Troubleshooting', link: '/troubleshooting' },
    ]
  },
  {
    text: 'Integrations',
    collapsed: true,
    items: [
      { text: 'Integration Overview', link: '/integration-overview' },
      {
        text: 'RMM Integrations',
        collapsed: true,
        items: [
          { text: 'ConnectWise Automate', link: '/connectwise-automate-integration-setup' },
          { text: 'ConnectWise Control', link: '/connectwise-control-integration-setup' },
          { text: 'N-Central', link: '/ncentral-integration-setup' },
          { text: 'NinjaRMM', link: '/ninjarmm-integration-setup' },
        ]
      },
      {
        text: 'PSA Integrations',
        collapsed: true,
        items: [
          { text: 'ConnectWise Manage', link: '/connectwise-manage-integration-setup' },
          { text: 'HaloPSA', link: '/halo-integration-setup' },
        ]
      },
      {
        text: 'Other Integrations',
        collapsed: true,
        items: [
          { text: 'Azure', link: '/azure-graph-permissions-setup' },
          { text: 'ConnectSecure', link: '/connectsecure-integration-setup' },
        ]
      },
      { text: 'Build Your Own', link: '/build-your-own-integration' },
    ]
  },
  {
    text: 'Reference',
    collapsed: true,
    items: [
      { text: 'API Documentation', link: '/api-documentation' },
      { text: 'PowerShell Module', link: '/powershell-module' },
      { text: 'Command Line Interface', link: '/cli' },
    ]
  },
  { text: 'Frequently Asked Questions', link: '/FAQ' },
]
```

## Key Improvements

1. **Logical Organization**: Content is organized into clear categories based on user needs:
   - Getting Started: For new users
   - Core Concepts: For understanding the system
   - Key Features: For detailed feature documentation
   - How-To Guides: For task-based instructions
   - Integrations: For setting up connections to other systems
   - Reference: For technical documentation

2. **Nested Structure**: Related content is grouped together in nested categories, making it easier to find related information.

3. **Progressive Disclosure**: Categories are collapsed by default (except for Getting Started and Core Concepts), reducing information overload while still providing access to all content.

4. **Separation of Concerns**: 
   - Feature documentation (what something is and how it works)
   - Task-based guides (how to accomplish specific goals)
   - Reference material (technical details)

## Content Migration Plan

1. **Existing Content**: Most existing content can be migrated to the new structure with minimal changes.

2. **New Content Needed**:
   - Introduction to ImmyBot (expanded from current Getting Started)
   - Quick Start Guide (new, focused on immediate value)
   - System Requirements (new)
   - Several feature-specific pages that currently don't exist

3. **Content Consolidation**:
   - Some existing pages may need to be split or combined to fit the new structure
   - For example, the current "Onboarding" page could be split into conceptual information (Computer Onboarding) and task-based guide (Onboarding Computers)

## Implementation Approach

1. **Phase 1**: Create the new structure and migrate existing content
2. **Phase 2**: Identify and fill content gaps
3. **Phase 3**: Add page-level and form-field help to the application with links to the new documentation
4. **Phase 4**: Review and refine based on user feedback

This structure provides a foundation that can grow with the product while maintaining a clear organization that helps users find what they need.
