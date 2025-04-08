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
                    { text: 'Introduction', link: '/introduction' },
                    { text: 'Quick Start', link: '/quick-start' },
                    { text: 'System Requirements', link: '/system-requirements' },
                    { text: 'What\'s New', link: '/releases' },
                ],
            },
            {
                text: 'Core Concepts',
                collapsed: false,
                items: [
                    { text: 'Tenants & Organizations', link: '/tenants-organizations' },
                    { text: 'Deployments', link: '/deployments' },
                    { text: 'Creating & Managing Deployments', link: '/creating-managing-deployments' },
                    { text: 'Deployment Resolution', link: '/deployment-resolution' },
                    { text: 'Maintenance Sessions', link: '/maintenance-sessions' },
                    { text: 'Software Library', link: '/software-library' },
                    { text: 'Maintenance Tasks', link: '/maintenance-tasks' },
                    { text: 'User Affinity', link: '/user-affinity' },
                    { text: 'Targets & Targeting', link: '/targets-targeting' },
                    { text: 'Terminology', link: '/terminology' },
                ],
            },
            {
                text: 'Computer Management',
                collapsed: false,
                items: [
                    { text: 'Managing Computers', link: '/managing-computers' },
                    { text: 'Computer Onboarding', link: '/computer-onboarding' },
                    { text: 'Agent Installation', link: '/agent-installation' },
                    { text: 'Computers & Inventory', link: '/computers-inventory' },
                    { text: 'Inventory Tasks', link: '/inventory-tasks' },
                    { text: 'Recommended Deployments', link: '/recommended-deployments' },
                ],
            },
            {
                text: 'User Management',
                collapsed: false,
                items: [
                    { text: 'Users & Permissions', link: '/users-permissions' },
                    { text: 'Adding Users', link: '/add-users' },
                    { text: 'User Roles', link: '/user-roles' },
                ],
            },
            {
                text: 'Integrations',
                collapsed: true,
                items: [
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
                text: 'Advanced',
                collapsed: true,
                items: [
                    { text: 'Scripting Guide', link: '/scripts' },
                    { text: 'Metascripts / Cloud Scripts', link: '/immy-commands' },
                    { text: 'Windows Sandbox', link: '/windows-sandbox' },
                ],
            },
            {
                text: 'Help & Support',
                collapsed: true,
                items: [
                    { text: 'System Status', link: '/system-status' },
                    { text: 'Troubleshooting', link: '/troubleshooting' },
                    { text: 'Frequently Asked Questions', link: '/FAQ' },
                ],
            },
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
