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
    repo: '',
    editLinks: true,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    algolia: {
      apiKey: 'b9a03fdc7b6a3221b1efd3f75210b6c7',
      indexName: 'immy',
      sitemap_urls: ["https://docs.immy.bot"]
    },
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          children: [
            '',
            'scripts',
            'immy-commands',
            'csp-preconsent-instructions'
          ]
        }
      ],
    }
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
