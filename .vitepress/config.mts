import { defineConfig } from 'vitepress';
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
    title: "immy.bot",
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
