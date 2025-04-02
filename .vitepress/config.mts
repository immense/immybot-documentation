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
                    { text: 'ImmyBot Overview', link: '/immybot-overview' },
                    { text: 'Quick Start Guide', link: '/quick-start-guide' },
                    { text: 'First Computer Setup', link: '/first-computer-setup' },
                    { text: 'Core Concepts', link: '/core-concepts' },
                    { text: 'Common Workflows', link: '/common-workflows' },
                ],
            },
            {
                text: 'User Guides',
                collapsed: false,
                items: [
                    { text: 'Managing Computers', link: '/managing-computers' },
                    { text: 'Managing Software', link: '/managing-software' },
                    { text: 'Creating Deployments', link: '/creating-deployments' },
                    { text: 'Working with Tasks', link: '/working-with-tasks' },
                    { text: 'User Management', link: '/add-users' },
                    { text: 'Recommended Configurations', link: '/recommended-deployments' },
                ],
            },
            {
                text: 'Integrations',
                collapsed: false,
                items: [
                    { text: 'Integration Overview', link: '/integration-overview' },
                    { text: 'Build Your Own', link: '/build-your-own-integration' },
                    { text: 'ConnectSecure', link: '/connectsecure-integration-setup' },
                    { text: 'ConnectWise Automate', link: '/connectwise-automate-integration-setup' },
                    { text: 'ConnectWise Control', link: '/connectwise-control-integration-setup' },
                    { text: 'ConnectWise Manage', link: '/connectwise-manage-integration-setup' },
                    { text: 'N-Central', link: '/ncentral-integration-setup' },
                    { text: 'NinjaRMM', link: '/ninjarmm-integration-setup' },
                    { text: 'HaloPSA', link: '/halo-integration-setup' },
                    { text: 'Azure', link: '/azure-graph-permissions-setup' },
                ],
            },
            {
                text: 'Administration',
                collapsed: false,
                items: [
                    { text: 'User Roles and Security', link: '/user-roles' },
                    { text: 'Tenant Management', link: '/tenant-management' },
                    { text: 'Maintenance and Updates', link: '/maintenance-updates' },
                    { text: 'Windows Sandbox', link: '/windows-sandbox' },
                ],
            },
            {
                text: 'Troubleshooting',
                collapsed: false,
                items: [
                    { text: 'Common Issues', link: '/common-issues' },
                    { text: 'Security Software Configuration', link: '/security-software' },
                    { text: 'Agent Troubleshooting', link: '/troubleshooting' },
                ],
            },
            {
                text: 'Advanced Topics',
                collapsed: false,
                items: [
                    { text: 'Scripting Guide', link: '/scripts' },
                    { text: 'Metascripts / Cloud Scripts', link: '/immy-commands' },
                    { text: 'Custom Integrations', link: '/custom-integrations' },
                ],
            },
            {
                text: 'Reference',
                collapsed: false,
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
