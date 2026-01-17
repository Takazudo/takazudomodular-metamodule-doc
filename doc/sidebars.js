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
    'document/setup',
    'document/plugins',
    'document/basic-vcv-patching',
    'document/firmware-building',
    'document/firmware-boot',
    'document/firmware-debugging',
    'document/firmware-loading',
    'document/user-firmware-update',
    'document/simulator-building',
    'document/simulator-usage',
    'document/simulator-ext-plugins',
    'document/porting',
  ],
};

export default sidebars;
