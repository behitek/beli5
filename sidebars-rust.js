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
            label: '🟢 Cơ Bản Siêu Dễ',
            collapsed: true,
            items: [
                'basics/what-is-rust',
                'basics/installing-rust',
                'basics/cargo-basics',
                'basics/first-program',
                'basics/printing-output',
                'basics/comments',
                'basics/variables-and-mutability',
                'basics/data-types',
                'basics/strings-basics',
                'basics/arithmetic-operations',
                'basics/boolean-and-logic',
                'basics/input-output',
                'basics/error-basics',
            ],
        },
        {
            type: 'category',
            label: '🟡 Trung Bình Thú Vị',
            collapsed: true,
            items: [
                'intermediate/if-else',
                'intermediate/match',
                'intermediate/loop-basic',
                'intermediate/while-loop',
                'intermediate/for-loop',
                'intermediate/arrays',
                'intermediate/vectors',
                'intermediate/tuples',
                'intermediate/functions-basics',
                'intermediate/function-parameters',
                'intermediate/closures',
                'intermediate/string-methods',
                'intermediate/string-slicing',
            ],
        },
        {
            type: 'category',
            label: '🔴 Nâng Cao Pro',
            collapsed: true,
            items: [
                'advanced/ownership-basics',
                'advanced/borrowing',
                'advanced/slices',
                'advanced/lifetimes',
                'advanced/structs-basics',
                'advanced/struct-methods',
                'advanced/enums',
                'advanced/option',
                'advanced/result',
                'advanced/error-handling-advanced',
                'advanced/thiserror-anyhow',
                'advanced/generics',
                'advanced/traits',
                'advanced/trait-objects',
                'advanced/modules',
                'advanced/packages-crates',
                'advanced/use-and-paths',
                'advanced/hashmap',
                'advanced/hashset',
                'advanced/iterators',
                'advanced/iterator-adapters',
                'advanced/box',
                'advanced/rc-arc',
                'advanced/refcell',
                'advanced/threads',
                'advanced/message-passing',
                'advanced/shared-state',
                'advanced/async-basics',
                'advanced/async-tokio',
                'advanced/unit-testing',
                'advanced/integration-testing',
                'advanced/declarative-macros',
            ],
        },
        {
            type: 'category',
            label: '🎮 Dự Án Thực Hành',
            collapsed: true,
            items: [
                {
                    type: 'category',
                    label: '🌱 Beginner',
                    collapsed: false,
                    items: [
                        'projects/guessing-game',
                        'projects/calculator',
                        'projects/temperature-converter',
                        'projects/fizzbuzz',
                    ],
                },
                {
                    type: 'category',
                    label: '🌿 Intermediate',
                    collapsed: false,
                    items: [
                        'projects/todo-cli',
                        'projects/password-generator',
                        'projects/markdown-parser',
                        'projects/grep-clone',
                    ],
                },
                {
                    type: 'category',
                    label: '🌳 Advanced',
                    collapsed: false,
                    items: [
                        'projects/web-server',
                        'projects/rest-api',
                        'projects/chat-app',
                        'projects/cli-tool',
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: '💪 Bài Tập Luyện Tập',
            collapsed: true,
            items: [
                'practice/basic-exercises',
                'practice/ownership-exercises',
                'practice/struct-enum-exercises',
                'practice/iterator-exercises',
                'practice/error-handling-exercises',
                'practice/concurrency-exercises',
                'practice/async-exercises',
            ],
        },
        {
            type: 'category',
            label: '📚 Tài Liệu Tham Khảo',
            collapsed: true,
            items: [
                'reference/rust-cheatsheet',
                'reference/std-library',
                'reference/cargo-commands',
                'reference/popular-crates',
                'reference/best-practices',
                'reference/compiler-errors',
                'reference/ownership-patterns',
                'reference/performance-tips',
            ],
        },
        {
            type: 'category',
            label: '📖 Từ Điển Thuật Ngữ',
            collapsed: true,
            items: [
                'glossary/rust-specific',
                'glossary/programming-terms',
                'glossary/data-structures',
                'glossary/rust-ecosystem',
            ],
        },
        {
            type: 'category',
            label: '🆘 Trợ Giúp & Mẹo Hay',
            collapsed: true,
            items: [
                'help-and-tips',
                'debugging-tips',
            ],
        },
        {
            type: 'doc',
            id: 'whats-next',
            label: '🚀 Bước Tiếp Theo',
        },
    ],
};

module.exports = sidebars;
