#!/usr/bin/env node

/**
 * Thumbnail Generator cho Blog Behitek/Beli5
 * 
 * Script này tự động tạo thumbnail cho các bài blog dựa trên:
 * - Tiêu đề bài viết
 * - Tags (ngôn ngữ lập trình)
 * - Màu sắc theo chủ đề
 * - Branding Behitek/Beli5
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const matter = require('gray-matter');

// Cấu hình đường dẫn
const BLOG_DIR = path.join(__dirname, '../blog');
const OUTPUT_DIR = path.join(__dirname, '../static/img/blog/generated');
const TEMPLATE_DIR = path.join(__dirname, 'templates');

// Tạo thư mục output nếu chưa có
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

if (!fs.existsSync(TEMPLATE_DIR)) {
    fs.mkdirSync(TEMPLATE_DIR, { recursive: true });
}

// Cấu hình kích thước
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 630;

// Color schemes theo ngôn ngữ/chủ đề
const COLOR_SCHEMES = {
    python: {
        primary: '#3776ab',
        secondary: '#ffd43b',
        accent: '#306998',
        gradient: 'linear-gradient(135deg, #3776ab 0%, #306998 100%)'
    },
    java: {
        primary: '#f89820',
        secondary: '#5382a1',
        accent: '#ed8b00',
        gradient: 'linear-gradient(135deg, #f89820 0%, #ed8b00 100%)'
    },
    cpp: {
        primary: '#00599c',
        secondary: '#659ad2',
        accent: '#004482',
        gradient: 'linear-gradient(135deg, #00599c 0%, #004482 100%)'
    },
    rust: {
        primary: '#ce422b',
        secondary: '#f74c00',
        accent: '#a33317',
        gradient: 'linear-gradient(135deg, #ce422b 0%, #a33317 100%)'
    },
    javascript: {
        primary: '#f7df1e',
        secondary: '#323330',
        accent: '#f0db4f',
        gradient: 'linear-gradient(135deg, #f7df1e 0%, #f0db4f 100%)'
    },
    algorithms: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#4f46e5',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
    },
    math: {
        primary: '#059669',
        secondary: '#10b981',
        accent: '#047857',
        gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
    },
    basics: {
        primary: '#7c3aed',
        secondary: '#a855f7',
        accent: '#6d28d9',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
    },
    default: {
        primary: '#1f2937',
        secondary: '#6b7280',
        accent: '#374151',
        gradient: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)'
    }
};

// Icons cho các ngôn ngữ/chủ đề
const THEME_ICONS = {
    python: '🐍',
    java: '☕',
    cpp: '⚡',
    rust: '🦀',
    javascript: '🟨',
    algorithms: '🧮',
    math: '📐',
    basics: '📚',
    recursion: '🔄',
    factorial: '❗',
    default: '💻'
};

/**
 * Phát hiện chủ đề chính của bài viết từ tags
 */
function detectTheme(tags) {
    if (!Array.isArray(tags)) return 'default';

    const tagString = tags.join(' ').toLowerCase();

    // Kiểm tra ngôn ngữ lập trình trước
    if (tagString.includes('python')) return 'python';
    if (tagString.includes('java')) return 'java';
    if (tagString.includes('cpp') || tagString.includes('c++')) return 'cpp';
    if (tagString.includes('rust')) return 'rust';
    if (tagString.includes('javascript') || tagString.includes('js')) return 'javascript';

    // Kiểm tra chủ đề
    if (tagString.includes('algorithm') || tagString.includes('factorial') || tagString.includes('recursion')) return 'algorithms';
    if (tagString.includes('math')) return 'math';
    if (tagString.includes('basics')) return 'basics';

    return 'default';
}

/**
 * Tạo HTML template cho thumbnail
 */
function createThumbnailHTML(blogPost) {
    const { title, tags, date } = blogPost.data;
    const theme = detectTheme(tags);
    const colorScheme = COLOR_SCHEMES[theme] || COLOR_SCHEMES.default;
    const icon = THEME_ICONS[theme] || THEME_ICONS.default;

    // Format date
    const dateStr = date ? new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : '';

    // Format tags với icons
    const formattedTags = tags ? tags.slice(0, 5).map(tag => {
        const tagIcon = THEME_ICONS[tag.toLowerCase()] || '';
        return tagIcon ? `${tagIcon} ${tag}` : `#${tag}`;
    }).join(' • ') : '';

    return `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thumbnail</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            width: ${CANVAS_WIDTH}px;
            height: ${CANVAS_HEIGHT}px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: ${colorScheme.gradient};
            position: relative;
            overflow: hidden;
        }
        
        /* Background pattern */
        .background-pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.1;
            background-image: 
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%),
                radial-gradient(circle at 75% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                radial-gradient(circle at 25% 75%, rgba(255,255,255,0.2) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 0%, transparent 50%);
        }
        
        /* Main container */
        .container {
            position: relative;
            width: 100%;
            height: 100%;
            padding: 60px 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            z-index: 1;
        }
        
        /* Header với logo */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
        }
        
        .brand {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            padding: 20px 30px;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .brand-title {
            font-size: 36px;
            font-weight: 800;
            color: white;
            margin-bottom: 4px;
            letter-spacing: -0.5px;
        }
        
        .brand-subtitle {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 400;
        }
        
        .theme-icon {
            font-size: 100px;
            opacity: 0.3;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
        }
        
        /* Main content */
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 40px 0;
        }
        
        .title {
            font-size: 64px;
            font-weight: 700;
            color: white;
            line-height: 1.1;
            margin-bottom: 30px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            word-wrap: break-word;
            hyphens: auto;
        }
        
        .decorative-line {
            width: 120px;
            height: 6px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 3px;
            margin-bottom: 40px;
        }
        
        /* Footer */
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        
        .tags {
            font-size: 22px;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
            max-width: 800px;
        }
        
        .date {
            font-size: 18px;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 400;
        }
        
        /* Responsive adjustments */
        @media (max-width: 800px) {
            .title {
                font-size: 48px;
            }
        }
        
        /* Bottom border */
        .bottom-border {
            position: absolute;
            bottom: 0;
            left: 80px;
            right: 80px;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px 2px 0 0;
        }
    </style>
</head>
<body>
    <div class="background-pattern"></div>
    
    <div class="container">
        <div class="header">
            <div class="brand">
                <div class="brand-title">Beli5</div>
                <div class="brand-subtitle">behitek.com</div>
            </div>
            <div class="theme-icon">${icon}</div>
        </div>
        
        <div class="content">
            <div class="decorative-line"></div>
            <div class="title">${title}</div>
        </div>
        
        <div class="footer">
            <div class="tags">${formattedTags}</div>
            <div class="date">${dateStr}</div>
        </div>
    </div>
    
    <div class="bottom-border"></div>
</body>
</html>
    `;
}

/**
 * Tạo thumbnail bằng Puppeteer
 */
async function generateThumbnail(blogPost, outputPath) {
    const { title, tags } = blogPost.data;
    const theme = detectTheme(tags);

    console.log(`🎨 Tạo thumbnail cho: "${title}" (theme: ${theme})`);

    let browser;
    try {
        // Khởi tạo Puppeteer
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        });

        const page = await browser.newPage();

        // Set viewport
        await page.setViewport({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            deviceScaleFactor: 1
        });

        // Tạo HTML content
        const htmlContent = createThumbnailHTML(blogPost);

        // Load HTML
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });

        // Chờ fonts load
        await page.evaluateHandle('document.fonts.ready');

        // Chụp screenshot
        await page.screenshot({
            path: outputPath,
            type: 'jpeg',
            quality: 90,
            fullPage: false
        });

        console.log(`✅ Đã tạo: ${path.basename(outputPath)}`);
        return outputPath;

    } catch (error) {
        console.error(`❌ Lỗi khi tạo thumbnail cho "${title}":`, error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

/**
 * Tạo slug từ filename
 */
function createSlug(filename) {
    return filename
        .replace(/^\d{4}-\d{2}-\d{2}-/, '') // Remove date prefix
        .replace(/\.(md|mdx)$/, '') // Remove extension
        .toLowerCase();
}

/**
 * Cập nhật frontmatter với đường dẫn thumbnail
 */
function updateBlogPostThumbnail(filePath, thumbnailPath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    // Tạo đường dẫn relative từ static
    const relativeThumbnailPath = thumbnailPath.replace(
        path.join(__dirname, '../static'),
        ''
    ).replace(/\\/g, '/');

    // Cập nhật frontmatter
    parsed.data.image = relativeThumbnailPath;

    // Ghi lại file
    const updatedContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, updatedContent);

    console.log(`📝 Cập nhật frontmatter: ${path.basename(filePath)}`);
}

/**
 * Main function - tạo thumbnails cho tất cả blog posts
 */
async function generateAllThumbnails() {
    console.log('🚀 Bắt đầu tạo thumbnails cho blog...\n');

    try {
        // Đọc tất cả file blog
        const blogFiles = fs.readdirSync(BLOG_DIR)
            .filter(file => file.match(/\.(md|mdx)$/))
            .filter(file => !file.startsWith('.'))
            .sort(); // Sort để consistent order

        console.log(`📁 Tìm thấy ${blogFiles.length} bài blog\n`);

        let generated = 0;
        let updated = 0;
        let skipped = 0;

        for (const filename of blogFiles) {
            const filePath = path.join(BLOG_DIR, filename);
            const content = fs.readFileSync(filePath, 'utf8');
            const blogPost = matter(content);

            // Skip nếu không có title
            if (!blogPost.data.title) {
                console.log(`⏭️  Bỏ qua: ${filename} (không có title)`);
                skipped++;
                continue;
            }

            // Tạo tên file thumbnail
            const slug = createSlug(filename);
            const thumbnailName = `${slug}-thumbnail.jpg`;
            const thumbnailPath = path.join(OUTPUT_DIR, thumbnailName);

            // Kiểm tra xem có cần tạo mới không
            const needsGeneration = !fs.existsSync(thumbnailPath) ||
                !blogPost.data.image ||
                !blogPost.data.image.includes('generated');

            if (needsGeneration) {
                await generateThumbnail(blogPost, thumbnailPath);
                updateBlogPostThumbnail(filePath, thumbnailPath);
                generated++;
            } else {
                console.log(`⏭️  Bỏ qua: ${filename} (đã có thumbnail)`);
                skipped++;
            }

            updated++;
        }

        console.log(`\n🎉 Hoàn thành!`);
        console.log(`   • Tạo mới: ${generated} thumbnails`);
        console.log(`   • Bỏ qua: ${skipped} files`);
        console.log(`   • Tổng xử lý: ${updated} bài blog`);
        console.log(`   • Thư mục output: ${OUTPUT_DIR}`);

    } catch (error) {
        console.error('❌ Lỗi khi tạo thumbnails:', error);
        process.exit(1);
    }
}

// Chạy script nếu được gọi trực tiếp
if (require.main === module) {
    generateAllThumbnails();
}

module.exports = {
    generateAllThumbnails,
    generateThumbnail,
    COLOR_SCHEMES,
    THEME_ICONS
};
