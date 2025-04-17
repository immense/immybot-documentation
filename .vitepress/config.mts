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
                    { text: 'Quick Start Guide', link: '/quick-start-guide' },
                    { text: 'First Computer Setup', link: '/first-computer-setup' },
                    { text: 'Core Concepts', link: '/core-concepts' },
                    { text: 'Common Workflows', link: '/common-workflows' },
                    { text: 'System Requirements', link: '/system-requirements' },
                ],
            },
            {
                text: 'Core Features',
                collapsed: false,
                items: [
                    { text: 'Tenants & Organizations', link: '/tenants-organizations' },
                    { text: 'Computers & Inventory', link: '/computers-inventory' },
                    { text: 'Users & Permissions', link: '/users-permissions' },
                    { text: 'Software Library', link: '/software-library' },
                    { text: 'Maintenance Tasks', link: '/maintenance-tasks' },
                    { text: 'Maintenance Sessions', link: '/maintenance-sessions' },
                    { text: 'Deployments', link: '/deployments' },
                    { text: 'User Affinity', link: '/user-affinity' },
                    { text: 'Targets & Targeting', link: '/targets-targeting' },
                ],
            },
            {
                text: 'How-To Guides',
                collapsed: false,
                items: [
                    { text: 'Creating & Managing Deployments', link: '/creating-managing-deployments' },
                    { text: 'Managing Software', link: '/managing-software' },
                    { text: 'Working with Tasks', link: '/working-with-tasks' },
                    { text: 'Computer Onboarding', link: '/computer-onboarding' },
                    { text: 'Agent Installation', link: '/agent-installation' },
                    { text: 'User Management', link: '/add-users' },
                    { text: 'Recommended Deployments', link: '/recommended-deployments' },
                ],
            },
            {
                text: 'Integrations',
                collapsed: true,
                items: [
                    { text: 'Integration Overview', link: '/integration-overview' },
                    { text: 'Build Your Own', link: '/build-your-own-integration' },
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
                ],
            },
            {
                text: 'Administration',
                collapsed: true,
                items: [
                    { text: 'User Roles and Security', link: '/user-roles' },
                    { text: 'Tenant Management', link: '/tenant-management' },
                    { text: 'Maintenance and Updates', link: '/maintenance-updates' },
                    { text: 'Windows Sandbox', link: '/windows-sandbox' },
                ],
            },
            {
                text: 'Advanced Topics',
                collapsed: true,
                items: [
                    { text: 'Scripting Guide', link: '/scripts' },
                    { text: 'Metascripts / Cloud Scripts', link: '/immy-commands' },
                    { text: 'Deployment Resolution', link: '/deployment-resolution' },
                ],
            },
            {
                text: 'Troubleshooting',
                collapsed: true,
                items: [
                    { text: 'Common Issues', link: '/common-issues' },
                    { text: 'Security Software Configuration', link: '/security-software' },
                    { text: 'Agent Troubleshooting', link: '/troubleshooting' },
                ],
            },
            {
                text: 'Reference',
                collapsed: true,
                items: [
                    { text: 'Terminology', link: '/terminology' },
                    { text: 'API Documentation', link: '/api-documentation' },
                    { text: 'Release Notes', link: '/releases' },
                ],
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
