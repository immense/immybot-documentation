import { defineConfig } from 'vitepress';
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
    title: "ImmyBot Documentation",
    head: [
        ['meta', { property: 'og:image', content: '/OpenGraph-ImmyBotDefault01.png' }],
        ['meta', { property: 'og:title', content: 'ImmyBot | Technical Documentation' }],
        ['meta', { property: 'og:description', content: 'Dive into getting started guides, recommended deployment workflows, user‑role breakdowns, scripting best practices, and deep dives into integrations and custom metascripts. Get everything you need to streamline your ImmyBot automation toolbox.' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        [
            'script',
            {},
            `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PF34XF88');`
        ]
    ],
    description: "A documentation suite for all things ImmyBot",
    sitemap: {
        hostname: 'https://docs.immy.bot'
    },
    themeConfig: {
        logo: '/immybot-glasses.png',
        // https://vitepress.dev/reference/default-theme-config
         outline: {
            level: [2, 3], // This will show H1, H2, and H3
    },
        sidebar: [

            {
                text: 'Getting Started',
                collapsed: false,
                items: [
                    { text: 'Introduction to ImmyBot', link: '/Documentation/GettingStarted/introduction' },
                    { text: 'Quick Start Guide', link: '/Documentation/GettingStarted/quick-start-guide' },
                    { text: 'ImmyBot Onboarding', link: '/Documentation/GettingStarted/instance-onboarding' },
                    { text: 'Core Concepts', link: '/Documentation/GettingStarted/core-concepts' },
                    { text: 'Common Workflows', link: '/Documentation/GettingStarted/common-workflows' },
                    { text: 'System Requirements', link: '/Documentation/GettingStarted/system-requirements' },
                    { text: 'Instance Best Practices', link: '/Documentation/GettingStarted/instance-best-practices' },
                    { text: 'Recommended Deployments', link: '/Documentation/GettingStarted/recommended-deployments' },

                ],
            },
            {
                text: 'Core Features',
                collapsed: false,
                items: [
                    { text: 'Dashboard', link: '/Documentation/CoreFeatures/dashboard' },
                    { text: 'Tenants', link: '/Documentation/CoreFeatures/tenants-organizations' },
                    { text: 'Computers', link: '/Documentation/CoreFeatures/computers-inventory' },
                    { text: 'Software & Tasks Library', link: '/Documentation/CoreFeatures/software-library' },
                    { text: 'Deployments', link: '/Documentation/CoreFeatures/deployments' },
                    { text: 'Maintenance Sessions', link: '/Documentation/CoreFeatures/maintenance-sessions' },
                    { text: 'Targets & Targeting', link: '/Documentation/CoreFeatures/targets-targeting' },
                    { text: 'Script Editor', link: '/Documentation/CoreFeatures/script-editor' },
                ],
            },
            {
                text: 'How-To Guides',
                collapsed: true,
                items: [
                    {
                        text: 'Instance Management',
                        collapsed: true,
                        items: [
                            {
                                text: 'Basic Instance Management',
                                collapsed: true,
                                items: [
                                    { text: 'Creating & Managing Software', link: '/Documentation/HowToGuides/managing-software' },
                                    { text: 'Creating & Managing Tasks', link: '/Documentation/HowToGuides/working-with-tasks' },
                                    { text: 'Creating & Managing Deployments', link: '/Documentation/HowToGuides/creating-managing-deployments' },
                                    { text: 'Creating & Managing Schedules', link: '/Documentation/HowToGuides/schedules' },
                                    { text: 'Creating & Managing Users', link: '/Documentation/HowToGuides/add-users' },
                                    { text: 'Managing SMTP', link: '/Documentation/HowToGuides/smtp' },
                                    { text: 'Managing Branding', link: '/Documentation/HowToGuides/branding' },
                                    { text: 'Agent Installation', link: '/Documentation/HowToGuides/agent-installation' },
                                    { text: 'Computer Onboarding', link: '/Documentation/HowToGuides/onboarding' },
                                    { text: 'Creating Maintenance Sessions', link: '/Documentation/Administration/maintenance-updates' },
                                ]
                            },
                            {
                                text: 'Advanced Instance Management',
                                collapsed: true,
                                items: [
                                    { text: 'Migrating ImmyBot Instances', link: '/Documentation/HowToGuides/InstanceChanges/migrating-immybot-instances' },
                                    { text: 'Moving the original MSP Tenant to another MSP Tenant', link: '/Documentation/HowToGuides/InstanceChanges/move-the-original-msp-tenant-to-a-new-tenant' },
                                ]
                            },

                        ]
                    },

                    {
                        text: 'Computer Configuration, and Management',
                        collapsed: true,
                        items: [
                            { text: 'Renaming Computers and adding them to an IDP - Configure Directory', link: '/Documentation/HowToGuides/Tasks/ConfigureDirectory' },
                            { text: 'Directory Migration', link: '/Documentation/HowToGuides/Tasks/DirectoryMigration' },
                            { text: 'Upgrading Windows 10 to Windows 11', link: '/Documentation/HowToGuides/upgrading-windows-10-to-windows-11' },
                        ]
                    },
                ],
            },
            {
                text: 'Integrations',
                collapsed: true,
                items: [
                    { text: 'Integration Overview', link: '/Documentation/Integrations/integration-overview' },
                    {
                        text: 'Azure',
                        collapsed: true,
                        items: [
                            { text: 'Azure Integration Setup', link: '/Documentation/Integrations/azure-graph-permissions-setup' },
                            { text: 'Azure Custom Application Permissions', link: '/Documentation/Integrations/azure-custom-application-permissions' },
                            { text: 'Azure GDAP Customer Management', link: '/Documentation/Integrations/azure-gdap-customer-management' },
                            { text: 'Azure Conditional Access Policies and Guidance', link: '/Documentation/Integrations/azure-conditional-access-policies-and-guidance' },
                            { text: 'Managing Azure Tenant Mappings', link: '/Documentation/Integrations/managing-azure-tenant-mappings' },
                        ]
                    },
                    {
                        text: 'RMM Integrations',
                        collapsed: true,
                        items: [
                            { text: 'ConnectWise Automate', link: '/Documentation/Integrations/connectwise-automate-integration-setup' },
                            { text: 'ConnectWise ScreenConnect', link: '/Documentation/Integrations/connectwise-control-integration-setup' },
                            { text: 'N-Central', link: '/Documentation/Integrations/ncentral-integration-setup' },
                            { text: 'NinjaRMM', link: '/Documentation/Integrations/ninjarmm-integration-setup' },
                            { text: 'Datto RMM', link: '/Documentation/Integrations/dattormm' },

                        ]
                    },
                    {
                        text: 'PSA Integrations',
                        collapsed: true,
                        items: [
                            { text: 'ConnectWise Manage', link: '/Documentation/Integrations/connectwise-manage-integration-setup' },
                            { text: 'HaloPSA', link: '/Documentation/Integrations/halo-integration-setup' },
                            { text: 'Autotask', link: '/Documentation/Integrations/autotask' },

                        ]
                    },
                    {
                        text: 'Other Integrations',
                        collapsed: true,
                        items: [
                            { text: 'ConnectSecure', link: '/Documentation/Integrations/connectsecure-integration-setup' },
                            { text: 'Support Override', link: '/Documentation/Integrations/support-override-integration-setup' },
                            { text: 'Acronis', link: '/Documentation/Integrations/acronis' },
                            { text: 'Nodeware', link: '/Documentation/Integrations/nodeware' },
                            { text: 'Beachhead Secure', link: '/Documentation/Integrations/beachhead-secure' },
                        ]
                    },
                    { text: 'Build Your Own Integration', link: '/Documentation/Integrations/build-your-own-integration' },
                ],
            },
            {
                text: 'Administration',
                collapsed: true,
                items: [
                    { text: 'User Roles and Security', link: '/Documentation/Administration/user-roles' },
                    { text: 'Reporting', link: '/Documentation/Administration/reporting' },
                    { text: 'RBAC (coming soon)', link: '/Documentation/Administration/rbac' },
                    { text: 'Tenant Management', link: '/Documentation/Administration/tenant-management' },
                    { text: 'Managing Computers', link: '/Documentation/Administration/managing-computers' },
                    { text: 'Windows Sandbox', link: '/Documentation/Administration/windows-sandbox' },
                    { text: 'Subscription Management and Licenses', link: '/Documentation/Administration/subscription-managment' },
                    { text: 'Deployment Ordering', link: '/Documentation/Administration/deployment-ordering' },
                    { text: 'Preferences in your instance', link: '/Documentation/Administration/preferences' },
                    { text: 'System Status Information', link: '/Documentation/Administration/system-status' },
                    { text: 'Miscellaneous Interface Pages', link: '/Documentation/Administration/misc-interface-pages' },

                ],
            },
            {
                text: 'Advanced Topics',
                collapsed: true,
                items: [
                    { text: 'Scripting Guide', link: '/Documentation/AdvancedTopics/scripts' },
                    { text: 'Metascripts / Cloud Scripts', link: '/Documentation/AdvancedTopics/immy-commands' },
                    { text: 'Deployment Resolution', link: '/Documentation/AdvancedTopics/deployment-resolution' },
                ],
            },
            {
                text: 'Troubleshooting',
                collapsed: true,
                items: [
                    { text: 'Common Issues', link: '/Documentation/Troubleshooting/common-issues' },
                    { text: 'Security Software Exclusions', link: '/Documentation/Troubleshooting/security-software-exclusions' },
                    { text: 'Agent Troubleshooting', link: '/Documentation/Troubleshooting/troubleshooting' },
                    { text: 'App Registration Secret Expired', link: '/Documentation/Troubleshooting/AppRegistrationSecretExpired' },
                ],
            },
            {
                text: 'Reference',
                collapsed: true,
                items: [
                    { text: 'Terminology', link: '/Documentation/Reference/terminology' },
                    { text: 'API Documentation', link: '/Documentation/Reference/api-documentation' },
                    { text: 'Release Notes',  collapsed: true,
                        items: [
                            { text: 'Current Releases', link: '/Documentation/Reference/releases' },
                            { text: 'Archived Releases', link: '/Documentation/Reference/releases-archived',
                                collapsed: true,
                                items: [
                                    { text: '2025', link: '/Documentation/Reference/releases-2025' },
                                    { text: '2024', link: '/Documentation/Reference/releases-2024' },
                                    { text: '2023', link: '/Documentation/Reference/releases-2023',  },
                                    { text: '2022', link: '/Documentation/Reference/releases-2022' },
                                    { text: '2021', link: '/Documentation/Reference/releases-2021',  },
                                    { text: '2020', link: '/Documentation/Reference/releases-2020',  },
                            ] },
                        ]
                    },
                    { text: 'Known issues', link: '/Documentation/Reference/known-issues' },
                ],
            },
            { text: 'Frequently Asked Questions', link: '/Documentation/FAQ' },

        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/immense/immybot-documentation' }
        ],
        search: {
            provider: 'algolia',
            options: {
                apiKey: "e84eee7e1fa61571b3814adfcb2a70f2",
                indexName: "immy",
                appId: 'SU6GB55GXI',
            }
        }
    },
    ignoreDeadLinks: true


});