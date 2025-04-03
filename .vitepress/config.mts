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
                text: 'Introduction',
                collapsed: false,
                items: [
                    { text: 'Getting Started', link: '/getting-started' },
                    { text: 'What\'s New', link: '/releases' },
                    { text: 'Add Users', link: './add-users' },
                    { text: 'Onboarding', link: './onboarding' },
                    { text: 'Recommended Deployments', link: './recommended-deployments' },
                    { text: 'Terminology', link: './terminology' },
                    { text: 'Troubleshooting', link: './troubleshooting' },
                    { text: 'User Roles', link: './user-roles' },
                    { text: 'Windows Sandbox', link: './windows-sandbox' },
                    { text: 'Computer Management', link: './computer-management' },
                ],
            },
            {
                text: 'Integrations',
                collapsed: false,
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
                collapsed: false,
                items: [
                    { text: 'Scripting Guide', link: '/scripts' },
                    { text: 'Metascripts / Cloud Scripts', link: '/immy-commands' },
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
