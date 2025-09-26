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
    pythonSidebar: [
        {
            type: 'doc',
            id: 'intro',
            label: '🎯 Bắt Đầu Tại Đây!',
        },
        {
            type: 'category',
            label: '🟢 Cơ Bản Siêu Dễ',
            collapsed: false,
            items: [
                'basics/what-is-python',
                'basics/installing-python',
                'basics/python-environment',
                'basics/first-program',
                'basics/printing-messages',
                'basics/getting-input',
                'basics/comments',
            ],
        },
        {
            type: 'doc',
            id: 'help-and-tips',
            label: '🆘 Trợ Giúp & Mẹo Hay',
        },
        {
            type: 'doc',
            id: 'whats-next',
            label: '🚀 Bước Tiếp Theo',
        },
    ],
};

module.exports = sidebars;