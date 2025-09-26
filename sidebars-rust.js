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
            label: '🎯 Bắt Đầu Tại Đây!',
        },
        {
            type: 'category',
            label: '🟢 Kiến Thức Cơ Bản Siêu Dễ',
            collapsed: false,
            items: [
                'basics/rust-like-safety-gear',
                'basics/variables-and-ownership',
                'basics/your-first-rust-program',
                'basics/memory-safety-explained',
            ],
        },
        {
            type: 'category',
            label: '🟡 Đang Nóng Dần Lên',
            collapsed: false,
            items: [
                'intermediate/functions-and-modules',
                'intermediate/structs-and-enums',
                'intermediate/error-handling-results',
                'intermediate/collections-vectors',
            ],
        },
        {
            type: 'category',
            label: '🔴 Thời Gian Thách Thức!',
            collapsed: true,
            items: [
                'advanced/ownership-and-borrowing',
                'advanced/lifetimes-explained',
                'advanced/traits-and-generics',
                'advanced/concurrency-threads',
            ],
        },
        {
            type: 'category',
            label: '🏆 Dự Án Thợ Rust Chuyên Nghiệp',
            collapsed: true,
            items: [
                'projects/safe-calculator',
                'projects/file-organizer',
                'projects/web-scraper',
                'projects/concurrent-downloader',
            ],
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
