const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'ImmyDocs',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'immense/immybot-documentation',
    editLinks: true,
    docsDir: 'src',
    docsBranch: 'main',
    editLinkText: '',
    lastUpdated: true,
    displayAllHeaders: true,
    smoothScroll: true,
    algolia: {
      apiKey: 'b9a03fdc7b6a3221b1efd3f75210b6c7',
      indexName: 'immy',
      sitemap_urls: ["https://docs.immy.bot"]
    },
    nav: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    sidebar: [
      {
        title: `What's New`,
        collapsable: false,
        sidebarDepth: 0,
        children: [
          'releases',
        ]
      },
      {
        title: 'Getting Started',   // required
        path: '/',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 2,    // optional, defaults to 1
      },
      {
        title: 'Frequently Asked Questions',   // required
        path: '/FAQ',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 2,    // optional, defaults to 1
      },
      {
        title: 'Advanced',
        collapsable: false,
        children: [
          'scripts',
          'immy-commands',
        ]
      },
      {
        title: "Integrations",
        collapsable: false,
        children: [
          'connectwise-automate-integration-setup',
          'connectwise-control-integration-setup',
          'connectwise-manage-integration-setup',
          'ncentral-integration-setup',
          'csp-preconsent-instructions'
        ]
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'vuepress-plugin-mermaidjs',
    [
      'sitemap',
      {
        hostname: 'http://localhost:8081'
      },
    ]
  ]
}
