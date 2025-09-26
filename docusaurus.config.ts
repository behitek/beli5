import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Beli5 - Lập Trình Dễ Hiểu',
  tagline: 'Behitek + ELI5: Hướng Dẫn Lập Trình AI Được Giải Thích Như Bạn 5 Tuổi',
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
    defaultLocale: 'vi',
    locales: ['vi'],
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

  themes: ['@docusaurus/theme-mermaid'],
  
  // In order for Mermaid to work, you also need to enable the Remark plugin with this option
  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      {
        docs: false, // Disable default docs since we're using multiple instances
        blog: {
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, locale: 'vi', frontMatter, options: {wordsPerMinute: 200}}),
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/behitek/beli5/tree/main/',
          blogTitle: 'Cập Nhật Học Tập AI',
          blogDescription: 'Những cập nhật mới nhất về hướng dẫn lập trình được tạo bởi AI',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'Tất cả bài viết',
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
      {name: 'keywords', content: 'lập trình, hướng dẫn, AI, ELI5, người mới bắt đầu, python, java, cpp, rust, tiếng việt'},
      {name: 'description', content: 'Hướng dẫn lập trình được tạo bởi AI, giải thích bằng thuật ngữ đơn giản cho người mới bắt đầu hoàn toàn'},
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
        '🤖 Tất cả hướng dẫn đều được tạo bởi AI và thiết kế dành cho người mới bắt đầu hoàn toàn! Học theo tốc độ của bạn và đừng lo lắng về việc mắc lỗi! 🎉',
      backgroundColor: '#ffd700',
      textColor: '#091E42',
      isCloseable: true,
    },

    navbar: {
      title: 'Beli5',
      logo: {
        alt: 'Logo Hướng Dẫn Lập Trình AI',
        src: 'img/logo.svg',
      },
      items: [
        // Separate menu items for each tutorial (not dropdown)
        {to: '/python/intro', label: '🐍 Python (AI)', position: 'left'},
        {to: '/java/intro', label: '☕ Java (AI)', position: 'left'},
        {to: '/cpp/intro', label: '⚡ C++ (AI)', position: 'left'},
        {to: '/rust/intro', label: '🦀 Rust (AI)', position: 'left'},
        {to: '/blog', label: '📝 Cập Nhật', position: 'left'},
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
          title: 'Ngôn Ngữ Lập Trình',
          items: [
            {
              label: '🐍 Hướng Dẫn Python',
              to: '/python/intro',
            },
            {
              label: '☕ Hướng Dẫn Java',
              to: '/java/intro',
            },
            {
              label: '⚡ Hướng Dẫn C++',
              to: '/cpp/intro',
            },
            {
              label: '🦀 Hướng Dẫn Rust',
              to: '/rust/intro',
            },
          ],
        },
        {
          title: 'Tài Nguyên Học Tập',
          items: [
            {
              label: 'Bắt Đầu',
              to: '/',
            },
            {
              label: 'Từ Điển Lập Trình',
              to: '/glossary',
            },
            {
              label: 'Mẹo Xin Giúp Đỡ',
              to: '/help-tips',
            },
          ],
        },
        {
          title: 'Cộng Đồng & Cập Nhật',
          items: [
            {
              label: 'Cập Nhật Mới Nhất',
              to: '/blog',
            },
            {
              label: 'Kho GitHub',
              href: 'https://github.com/behitek/beli5',
            },
            {
              label: 'Báo Lỗi',
              href: 'https://github.com/behitek/beli5/issues',
            },
          ],
        },
      ],
      copyright: `
        <div style="margin-bottom: 10px;">
          <strong>🤖 Thông Báo Nội Dung AI:</strong> Tất cả nội dung được tạo bởi AI và trình bày theo phong cách ELI5 (Giải Thích Như Bạn 5 Tuổi) để học dễ dàng.
        </div>
        <div>
          Bản quyền © ${new Date().getFullYear()} Beli5 - Behitek. Được xây dựng với ❤️ bằng Docusaurus.
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
