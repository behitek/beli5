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
            label: '🎯 Start Here!',
        },
        {
            type: 'category',
            label: '🟢 Super Easy Basics',
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
            label: '🟡 Getting Warmer',
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
            label: '🔴 Challenge Time!',
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
            label: '🏆 Rust Craftsman Projects',
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
            label: '🆘 Ask an Adult for Help',
        },
        {
            type: 'doc',
            id: 'whats-next',
            label: '🚀 What\'s Next?',
        },
    ],
};

module.exports = sidebars;
