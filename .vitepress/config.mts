import { defineConfig } from 'vitepress';
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
    title: "ImmyBot Documentation",
    head: [
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
        sidebar: [
            {
                text: 'Getting Started',
                collapsed: false,
                items: [
                    { text: 'Introduction to ImmyBot', link: '/Documentation/GettingStarted/introduction' },
                    { text: 'Quick Start Guide', link: '/Documentation/GettingStarted/quick-start-guide' },
                    { text: 'Core Concepts', link: '/Documentation/GettingStarted/core-concepts' },
                    { text: 'Common Workflows', link: '/Documentation/GettingStarted/common-workflows' },
                    { text: 'System Requirements', link: '/Documentation/GettingStarted/system-requirements' },

                ],
            },
            {
                text: 'Core Features',
                collapsed: false,
                items: [
                    { text: 'Tenants', link: '/Documentation/CoreFeatures/tenants-organizations' },
                    { text: 'Computers', link: '/Documentation/CoreFeatures/computers-inventory' },
                    //{ text: 'Users & Permissions', link: 'users-permissions' },
                    { text: 'Software Library', link: '/Documentation/CoreFeatures/software-library' },
                    //{ text: 'Maintenance Tasks', link: 'maintenance-tasks' },
                    { text: 'Maintenance Sessions', link: '/Documentation/CoreFeatures/maintenance-sessions' },
                    { text: 'Deployments', link: '/Documentation/CoreFeatures/deployments' },
                    //{ text: 'User Affinity', link: 'user-affinity' },
                    { text: 'Targets & Targeting', link: '/Documentation/CoreFeatures/targets-targeting' },
                    { text: 'Script Editor', link: '/Documentation/CoreFeatures/script-editor' },
                ],
            },
            {
                text: 'How-To Guides',
                collapsed: true,
                items: [
                    { text: 'Creating & Managing Deployments', link: '/Documentation/HowToGuides/creating-managing-deployments' },
                    { text: 'Managing Software', link: '/Documentation/HowToGuides/managing-software' },
                    { text: 'Working with Tasks', link: '/Documentation/HowToGuides/working-with-tasks' },
                    { text: 'Computer Onboarding', link: '/Documentation/HowToGuides/onboarding' },
                    { text: 'Agent Installation', link: '/Documentation/HowToGuides/agent-installation' },
                    { text: 'User Management', link: '/Documentation/HowToGuides/add-users' },
                    { text: 'Recommended Deployments', link: '/Documentation/HowToGuides/recommended-deployments' },
                    { text: 'SMTP', link: '/Documentation/HowToGuides/smtp' },
                    { text: 'Branding', link: '/Documentation/HowToGuides/branding' },
                ],
            },
            {
                text: 'Integrations',
                collapsed: true,
                items: [
                    { text: 'Integration Overview', link: '/Documentation/Integrations/integration-overview' },
                    { text: 'Build Your Own', link: '/Documentation/Integrations/build-your-own-integration' },
                    {
                        text: 'RMM Integrations',
                        collapsed: true,
                        items: [
                            { text: 'ConnectWise Automate', link: '/Documentation/Integrations/connectwise-automate-integration-setup' },
                            { text: 'ConnectWise Control', link: '/Documentation/Integrations/connectwise-control-integration-setup' },
                            { text: 'N-Central', link: '/Documentation/Integrations/ncentral-integration-setup' },
                            { text: 'NinjaRMM', link: '/Documentation/Integrations/ninjarmm-integration-setup' },
                        ]
                    },
                    {
                        text: 'PSA Integrations',
                        collapsed: true,
                        items: [
                            { text: 'ConnectWise Manage', link: '/Documentation/Integrations/connectwise-manage-integration-setup' },
                            { text: 'HaloPSA', link: '/Documentation/Integrations/halo-integration-setup' },
                        ]
                    },
                    {
                        text: 'Other Integrations',
                        collapsed: true,
                        items: [
                            { text: 'Azure', link: '/Documentation/Integrations/azure-graph-permissions-setup' },
                            { text: 'ConnectSecure', link: '/Documentation/Integrations/connectsecure-integration-setup' },
                             { text: "Support Override", link: '/Documentation/Integrations/support-override-integration-setup' },
                        ]
                    },
                ],
            },
            {
                text: 'Administration',
                collapsed: true,
                items: [
                    { text: 'User Roles and Security', link: '/Documentation/Administration/user-roles' },
                    { text: 'Tenant Management', link: '/Documentation/Administration/tenant-management' },
                    { text: 'Maintenance and Updates', link: '/Documentation/Administration/maintenance-updates' },
                    { text: 'Managing Computers', link: '/Documentation/Administration/managing-computers' },
                    { text: 'Windows Sandbox', link: '/Documentation/Administration/windows-sandbox' },
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
                    { text: 'Security Software Configuration', link: '/Documentation/Troubleshooting/security-software' },
                    { text: 'Agent Troubleshooting', link: '/Documentation/Troubleshooting/troubleshooting' },
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