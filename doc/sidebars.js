// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  documentSidebar: [
    'document/index',
    {
      type: 'category',
      label: 'はじめに',
      items: ['document/getting-started'],
    },
    {
      type: 'category',
      label: '基本操作',
      items: [
        'document/using-knobs',
        'document/using-jacks',
        'document/using-midi',
        'document/shortcuts',
      ],
    },
    {
      type: 'category',
      label: 'VCV Rack',
      items: ['document/using-vcv-rack'],
    },
    {
      type: 'category',
      label: 'プラグインと設定',
      items: [
        'document/plugins',
        'document/action-menu',
        'document/patch-settings',
        'document/preferences',
      ],
    },
    {
      type: 'category',
      label: 'エクスパンダー',
      items: ['document/wifi-expander', 'document/meta-aio', 'document/meta-buttons'],
    },
    {
      type: 'category',
      label: 'ヘルプ',
      items: ['document/troubleshooting', 'document/faq', 'document/versions', 'document/specs'],
    },
  ],
};

export default sidebars;
