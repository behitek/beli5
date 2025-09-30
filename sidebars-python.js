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
            collapsed: true,
            items: [
                'basics/what-is-python',
                'basics/installing-python',
                'basics/python-environment',
                'basics/first-program',
                'basics/printing-messages',
                'basics/getting-input',
                'basics/comments',
                'basics/variables-and-data-types',
                'basics/strings-basics',
                'basics/basic-math-operations',
                'basics/boolean-and-logic',
                'basics/errors-and-debugging',
            ],
        },
        {
            type: 'category',
            label: '🟡 Trung Bình Thú Vị',
            collapsed: true,
            items: [
                'intermediate/conditional-statements',
                'intermediate/loops-for',
                'intermediate/loops-while',
                'intermediate/lists-basics',
                'intermediate/lists-methods',
                'intermediate/dictionaries',
                'intermediate/tuples',
                'intermediate/sets',
                'intermediate/functions-basics',
                'intermediate/functions-parameters',
                'intermediate/scope-and-variables',
                'intermediate/string-methods',
                'intermediate/list-comprehension',
                'intermediate/error-handling',
                'intermediate/datetime',
                'intermediate/enums',
            ],
        },
        {
            type: 'category',
            label: '🔴 Nâng Cao Pro',
            collapsed: true,
            items: [
                'advanced/classes-and-objects',
                'advanced/inheritance',
                'advanced/polymorphism',
                'advanced/abstract-classes',
                'advanced/decorators-basics',
                'advanced/lambda-functions',
                'advanced/map-filter-reduce',
                'advanced/generators',
                'advanced/context-managers',
                'advanced/modules-and-packages',
                'advanced/file-handling',
                'advanced/regular-expressions',
                'advanced/working-with-json',
                'advanced/working-with-apis',
            ],
        },
        {
            type: 'category',
            label: '🎮 Dự Án Thực Hành',
            collapsed: true,
            items: [
                'projects/calculator',
                'projects/guessing-game',
                'projects/password-generator',
                'projects/todo-list',
                'projects/quiz-game',
                'projects/file-organizer',
                'projects/weather-app',
                'projects/web-scraper',
            ],
        },
        {
            type: 'category',
            label: '💪 Bài Tập Luyện Tập',
            collapsed: true,
            items: [
                'practice/basic-exercises',
                'practice/variable-exercises',
                'practice/conditional-exercises',
                'practice/loop-exercises',
                'practice/list-exercises',
                'practice/string-exercises',
                'practice/function-exercises',
                'practice/file-exercises',
            ],
        },
        {
            type: 'category',
            label: '📚 Tài Liệu Tham Khảo',
            collapsed: true,
            items: [
                'reference/python-cheatsheet',
                'reference/built-in-functions',
                'reference/common-modules',
                'reference/best-practices',
                'reference/coding-style',
                'reference/performance-tips',
                'reference/error-messages',
                'reference/data-analysis',
            ],
        },
        {
            type: 'category',
            label: '📖 Từ Điển Thuật Ngữ',
            collapsed: true,
            items: [
                'glossary/python-specific',
                'glossary/programming-terms',
                'glossary/data-structures',
                'glossary/algorithms',
            ],
        },
        {
            type: 'doc',
            id: 'python-todo',
            label: '📝 TODO List',
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