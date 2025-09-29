/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    rustSidebar: [
        {
            type: 'doc',
            id: 'intro',
            label: '🦀 Rust - Sắp Ra Mắt!',
        },
        {
            type: 'doc',
            id: 'help-and-tips',
            label: '🆘 Nhờ Người Lớn Giúp Đỡ',
        },
        {
            type: 'doc',
            id: 'whats-next',
            label: '🚀 Tiếp Theo Là Gì?',
        },
    ],
};

module.exports = sidebars;
