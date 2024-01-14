import { defineConfig } from 'vitepress';
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "immy.bot",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
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
        ],
      },
      {
        text: 'Integrations',
        collapsed: false,
        items: [
          { text: 'Build Your Own', link: '/build-your-own-integration' },
          { text: 'ConnectWise Automate', link: '/connectwise-automate-integration-setup' },
          { text: 'ConnectWise Control', link: '/connectwise-control-integration-setup' },
          { text: 'ConnectWise Manage', link: '/connectwise-manage-integration-setup' },
          { text: 'N-Central', link: '/ncentral-integration-setup' },
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
        apiKey: "b9a03fdc7b6a3221b1efd3f75210b6c7",
        indexName: "immy",
        appId: 'BH4D9OD16A',
      }
    }
  }
});
