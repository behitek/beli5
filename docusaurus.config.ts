import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Beli5 - Lập Trình Dễ Hiểu',
  tagline: 'Behitek + ELI5: Blog Chia Sẻ Lập Trình Được Giải Thích Như Bạn 5 Tuổi',
  favicon: 'img/favicon.ico',

  // Facebook App ID cho comments plugin
  customFields: {
    facebookAppId: '4183372098576273',
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://behitek.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/beli5/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'behitek', // Usually your GitHub org/user name.
  projectName: 'beli5', // Usually your repo name.

  onBrokenLinks: 'throw',

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
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
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
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
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
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
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
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blog',
        path: 'blog',
        routeBasePath: 'blog',
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        showReadingTime: true,
        readingTime: ({content, frontMatter, defaultReadingTime}) =>
          defaultReadingTime({content, locale: 'vi', frontMatter, options: {wordsPerMinute: 200}}),
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        editUrl: 'https://github.com/behitek/beli5/tree/main/',
        blogTitle: 'Hướng Dẫn & Mẹo Lập Trình',
        blogDescription: 'Chia sẻ hướng dẫn, mẹo và kinh nghiệm lập trình dành cho người học',
        postsPerPage: 10,
        blogSidebarTitle: 'Bài viết gần đây',
        blogSidebarCount: 5,
      },
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],
  
  // In order for Mermaid to work, you also need to enable the Remark plugin with this option
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          path: 'news',
          routeBasePath: 'news',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, locale: 'vi', frontMatter, options: {wordsPerMinute: 200}}),
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/behitek/beli5/tree/main/',
          blogTitle: 'Tin Tức & Cập Nhật',
          blogDescription: 'Những tin tức và cập nhật mới nhất về blog chia sẻ lập trình ELI5',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'Tất cả tin tức',
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
      {name: 'keywords', content: 'lập trình, hướng dẫn, blog, ELI5, người mới bắt đầu, python, java, cpp, rust, tiếng việt'},
      {name: 'description', content: 'Blog chia sẻ lập trình ELI5, giải thích bằng thuật ngữ đơn giản cho người mới bắt đầu hoàn toàn'},
    ],
    
    // Replace with your project's social card
    image: 'img/ai-tutorials-social-card.jpg',
    
    // Color mode configuration
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    // Announcement bar for ELI5 blog sharing
    announcementBar: {
      id: 'eli5-blog-sharing',
      content:
        '📚 Blog chia sẻ kiến thức lập trình theo phong cách ELI5 (Giải Thích Như Bạn 5 Tuổi) dành cho người Việt! Học dễ hiểu, vui vẻ và không lo lắng! 🎉',
      backgroundColor: '#ffd700',
      textColor: '#091E42',
      isCloseable: true,
    },

    navbar: {
      title: 'Beli5',
      logo: {
        alt: 'Logo Blog Lập Trình ELI5',
        src: 'img/logo.svg',
      },
      items: [
        // Separate menu items for each tutorial (not dropdown)
        {to: '/python/intro', label: '🐍 Python', position: 'left'},
        {to: '/java/intro', label: '☕ Java', position: 'left'},
        {to: '/cpp/intro', label: '⚡ C++', position: 'left'},
        {to: '/rust/intro', label: '🦀 Rust', position: 'left'},
        {to: '/blog', label: '📖 Blog', position: 'left'},
        {to: '/news', label: '📝 Cập Nhật', position: 'right'},
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
              label: 'Hướng Dẫn & Mẹo',
              to: '/blog',
            },
            {
              label: 'Tin Tức Mới Nhất',
              to: '/news',
            },
            {
              label: 'Luyện Code (LCOJ)',
              href: 'https://luyencode.net',
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
          <strong>📚 Blog ELI5:</strong> Nội dung được chia sẻ theo phong cách ELI5 (Giải Thích Như Bạn 5 Tuổi) để học dễ hiểu và vui vẻ.
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

    // Mermaid theme configuration for both light and dark modes
    mermaid: {
      theme: {
        light: 'neutral', // Better contrast in light mode
        dark: 'forest',     // Optimized for dark mode
      },
      options: {
        // Global Mermaid options for better accessibility
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: 16,
        // Ensure good contrast ratios
        theme: 'base',
        themeVariables: {
          // Light mode colors (high contrast)
          primaryColor: '#4f46e5',
          primaryTextColor: '#1f2937',
          primaryBorderColor: '#374151',
          lineColor: '#6b7280',
          secondaryColor: '#f3f4f6',
          tertiaryColor: '#e5e7eb',
          background: '#ffffff',
          mainBkg: '#ffffff',
          secondBkg: '#f9fafb',
          // Ensure text is readable
          textColor: '#111827',
          // Node styling
          nodeBkg: '#f3f4f6',
          nodeBorder: '#d1d5db',
          // Arrow styling
          arrowheadColor: '#374151',
        },
      },
    },

  } satisfies Preset.ThemeConfig,
};

export default config;
