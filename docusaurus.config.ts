import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Beli5 - Programming Made Simple',
  tagline: 'Behitek + ELI5: AI-Generated Programming Tutorials Explained Like You\'re 5',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://behitek.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/beli5/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'behitek', // Usually your GitHub org/user name.
  projectName: 'beli5', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    // Multiple docs instances for each programming language
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'python',
        path: 'docs-python',
        routeBasePath: 'python',
        sidebarPath: './sidebars-python.js',
        editUrl: 'https://github.com/behitek/beli5/tree/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'java',
        path: 'docs-java',
        routeBasePath: 'java',
        sidebarPath: './sidebars-java.js',
        editUrl: 'https://github.com/behitek/beli5/tree/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cpp',
        path: 'docs-cpp',
        routeBasePath: 'cpp',
        sidebarPath: './sidebars-cpp.js',
        editUrl: 'https://github.com/behitek/beli5/tree/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'rust',
        path: 'docs-rust',
        routeBasePath: 'rust',
        sidebarPath: './sidebars-rust.js',
        editUrl: 'https://github.com/behitek/beli5/tree/main/',
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: false, // Disable default docs since we're using multiple instances
        blog: {
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 200}}),
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/behitek/beli5/tree/main/',
          blogTitle: 'AI Learning Updates',
          blogDescription: 'Latest updates on AI-generated programming tutorials',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // SEO and metadata
    metadata: [
      {name: 'keywords', content: 'programming, tutorials, AI, ELI5, beginner, python, java, cpp, rust'},
      {name: 'description', content: 'AI-generated programming tutorials explained in simple terms for complete beginners'},
    ],
    
    // Replace with your project's social card
    image: 'img/ai-tutorials-social-card.jpg',
    
    // Color mode configuration
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // Announcement bar for AI disclaimer
    announcementBar: {
      id: 'ai-disclaimer',
      content:
        '🤖 All tutorials are AI-generated and designed for complete beginners! Learn at your own pace and don\'t worry about making mistakes! 🎉',
      backgroundColor: '#ffd700',
      textColor: '#091E42',
      isCloseable: true,
    },

    navbar: {
      title: 'Beli5',
      logo: {
        alt: 'AI Programming Tutorials Logo',
        src: 'img/logo.svg',
      },
      items: [
        // Separate menu items for each tutorial (not dropdown)
        {to: '/python/intro', label: '🐍 Python (AI)', position: 'left'},
        {to: '/java/intro', label: '☕ Java (AI)', position: 'left'},
        {to: '/cpp/intro', label: '⚡ C++ (AI)', position: 'left'},
        {to: '/rust/intro', label: '🦀 Rust (AI)', position: 'left'},
        {to: '/blog', label: '📝 Updates', position: 'left'},
        {
          href: 'https://github.com/behitek/beli5',
          label: 'GitHub',
          position: 'right',
        },
        // Dark mode toggle is automatically added by Docusaurus
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Programming Languages',
          items: [
            {
              label: '🐍 Python Tutorial',
              to: '/python/intro',
            },
            {
              label: '☕ Java Tutorial',
              to: '/java/intro',
            },
            {
              label: '⚡ C++ Tutorial',
              to: '/cpp/intro',
            },
            {
              label: '🦀 Rust Tutorial',
              to: '/rust/intro',
            },
          ],
        },
        {
          title: 'Learning Resources',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'Programming Glossary',
              to: '/glossary',
            },
            {
              label: 'Ask for Help Tips',
              to: '/help-tips',
            },
          ],
        },
        {
          title: 'Community & Updates',
          items: [
            {
              label: 'Latest Updates',
              to: '/blog',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/behitek/beli5',
            },
            {
              label: 'Report Issues',
              href: 'https://github.com/behitek/beli5/issues',
            },
          ],
        },
      ],
      copyright: `
        <div style="margin-bottom: 10px;">
          <strong>🤖 AI Content Disclaimer:</strong> All content is AI-generated and presented in ELI5 (Explain Like I'm 5) style for easy learning.
        </div>
        <div>
          Copyright © ${new Date().getFullYear()} Beli5 - Behitek. Built with ❤️ using Docusaurus.
        </div>
      `,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      // Enable syntax highlighting for multiple languages
      additionalLanguages: [
        'python',
        'java',
        'cpp',
        'c',
        'rust',
        'css',
        'javascript',
        'typescript',
        'json',
        'bash',
        'sql',
      ],
    },

    // Search can be configured later with Algolia or local search

    // Additional theme config for better UX
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    // Code block features
    codeblock: {
      showGutter: true,
    },

  } satisfies Preset.ThemeConfig,
};

export default config;
