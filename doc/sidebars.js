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
  coreModulesSidebar: [
    'core-modules/index',
    {
      type: 'category',
      label: 'ユーティリティ',
      collapsible: false,
      items: [
        'core-modules/atvert',
        'core-modules/mnmx',
        'core-modules/oct',
        'core-modules/pan',
        'core-modules/sample-and-hold',
        'core-modules/src',
        'core-modules/slw',
      ],
    },
    {
      type: 'category',
      label: 'オシレーター/サウンドソース',
      collapsible: false,
      items: ['core-modules/fm', 'core-modules/nse', 'core-modules/multi-lfo', 'core-modules/kpls'],
    },
    {
      type: 'category',
      label: 'ドラム/パーカッション',
      collapsible: false,
      items: ['core-modules/djembe', 'core-modules/drum', 'core-modules/lpg'],
    },
    {
      type: 'category',
      label: 'フィルター',
      collapsible: false,
      items: ['core-modules/bpf', 'core-modules/hpf'],
    },
    {
      type: 'category',
      label: 'エンベロープ/モジュレーション',
      collapsible: false,
      items: ['core-modules/complex-eg', 'core-modules/flw', 'core-modules/gate'],
    },
    {
      type: 'category',
      label: 'エフェクト',
      collapsible: false,
      items: [
        'core-modules/detune',
        'core-modules/freeverb',
        'core-modules/pitch-shift',
        'core-modules/verb',
      ],
    },
    {
      type: 'category',
      label: 'クロック/シーケンサー',
      collapsible: false,
      items: [
        'core-modules/clkd',
        'core-modules/clkm',
        'core-modules/prob-8',
        'core-modules/seq-8',
      ],
    },
    {
      type: 'category',
      label: 'ルーティング/スイッチング',
      collapsible: false,
      items: ['core-modules/switch-1-4', 'core-modules/switch-4-1', 'core-modules/stereo-mixer'],
    },
    {
      type: 'category',
      label: 'サンプラー',
      collapsible: false,
      items: ['core-modules/basic-wav-player'],
    },
  ],
  documentSidebar: [
    'document/index',
    {
      type: 'category',
      label: 'はじめに',
      collapsible: false,
      items: ['document/getting-started'],
    },
    {
      type: 'category',
      label: '基本操作',
      collapsible: false,
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
      collapsible: false,
      items: ['document/using-vcv-rack'],
    },
    {
      type: 'category',
      label: 'プラグインと設定',
      collapsible: false,
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
      collapsible: false,
      items: ['document/wifi-expander', 'document/meta-aio', 'document/meta-buttons'],
    },
    {
      type: 'category',
      label: 'ヘルプ',
      collapsible: false,
      items: ['document/troubleshooting', 'document/faq', 'document/versions', 'document/specs'],
    },
  ],
};

export default sidebars;
