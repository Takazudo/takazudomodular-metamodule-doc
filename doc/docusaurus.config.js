// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Takazudo Modular MetaModuleサポート',
  tagline: 'MetaModule 日本語ドキュメント',
  favicon: 'img/favicon.ico',

  // Future flags
  future: {
    v4: true,
  },

  // Set the production url of your site here
  url: 'https://takazudomodular.com',
  baseUrl: '/pj/metamodule-doc/',

  // Don't add trailing slash
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Japanese locale
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  // Enable Mermaid diagrams
  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/docs',
          editUrl: undefined,
          // Show last update time and author from git history
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          // Add remark plugin to inject creation dates
          beforeDefaultRemarkPlugins: [[require('./plugins/remark-creation-date.js'), {}]],
        },
        // Disable blog feature
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Force dark mode and disable theme switching
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Takazudo Modular MetaModuleサポート',
        logo: {
          alt: 'Takazudo Modular MetaModuleサポート',
          src: 'img/logo.svg',
          href: '/pj/metamodule-doc/docs/document/',
        },
        items: [
          {
            type: 'doc',
            docId: 'document/index',
            position: 'left',
            label: 'ドキュメント',
          },
          {
            type: 'html',
            position: 'right',
            value:
              '<a href="https://takazudomodular.com/" class="navbar__takazudo-modular" rel="noopener noreferrer"><img src="/pj/metamodule-doc/img/logo.svg" alt="" /><span>Takazudo Modular</span></a>',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Takazudo. Documentation built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.oneDark,
      },
    }),
};

export default config;
