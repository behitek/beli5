# 🎨 Thumbnail Generation System

This system automatically generates beautiful, branded thumbnails for all blog posts in your Docusaurus site.

## Features

- ✅ **Automatic generation** during build process
- 🎨 **Theme-based colors** for different programming languages
- 🔧 **Responsive design** optimized for social media (1200x630)
- 🌏 **Vietnamese language support** with proper fonts
- 📱 **Icons and branding** with Behitek/Beli5 styling
- ⚡ **GitHub Actions compatible** - works perfectly with CI/CD

## How It Works

1. **During build**: `npm run build` automatically runs thumbnail generation
2. **Analyzes blog posts**: Extracts title, tags, date from frontmatter
3. **Detects theme**: Based on tags (python, java, cpp, rust, algorithms, etc.)
4. **Generates HTML template**: Creates responsive design with proper styling
5. **Screenshots with Puppeteer**: Converts HTML to high-quality JPEG
6. **Updates frontmatter**: Automatically sets `image` field to generated thumbnail
7. **Builds site**: Docusaurus includes the new thumbnails

## Generated Thumbnails

Thumbnails are saved to: `static/img/blog/generated/`

Example: `tinh-giai-thua-thumbnail.jpg`

## Theme Detection

The system automatically detects themes based on tags:

| Theme | Tags | Color Scheme | Icon |
|-------|------|--------------|------|
| Python | `python` | Blue gradient | 🐍 |
| Java | `java` | Orange gradient | ☕ |
| C++ | `cpp`, `c++` | Blue gradient | ⚡ |
| Rust | `rust` | Red gradient | 🦀 |
| Algorithms | `algorithms`, `factorial`, `recursion` | Purple gradient | 🧮 |
| Math | `math` | Green gradient | 📐 |
| Basics | `basics` | Purple gradient | 📚 |

## Usage

### Automatic (Recommended)

Just build your site normally:

```bash
npm run build
# This automatically runs thumbnail generation first
```

### Manual Generation

To generate thumbnails without building:

```bash
npm run generate-thumbnails
```

### GitHub Actions

The system works automatically in GitHub Actions. Your workflow already includes:

```yaml
- name: Generate blog thumbnails
  run: npm run generate-thumbnails
- name: Build website  
  run: npm run build-only
```

## Customization

### Adding New Themes

Edit `scripts/generate-thumbnails.js`:

1. Add color scheme to `COLOR_SCHEMES`
2. Add icon to `THEME_ICONS`
3. Add detection logic in `detectTheme()`

### Modifying Template

The HTML template is in `createThumbnailHTML()` function. You can:

- Change fonts, colors, layout
- Add new elements
- Modify responsive behavior
- Adjust branding

## Troubleshooting

### Thumbnails Not Generating

1. Check if blog post has `title` in frontmatter
2. Verify file is `.md` or `.mdx`
3. Check console output for errors

### GitHub Actions Fails

- Puppeteer is automatically installed in CI
- No additional system dependencies needed
- Works on Ubuntu runners (which GitHub Actions uses)

### Regenerating Thumbnails

To force regeneration of all thumbnails:

1. Delete `static/img/blog/generated/` directory
2. Run `npm run generate-thumbnails`

## File Structure

```
scripts/
├── generate-thumbnails.js          # Main generation script
static/img/blog/generated/
├── .gitkeep                        # Keep directory in git
├── tinh-giai-thua-thumbnail.jpg    # Generated thumbnails
└── ...
```

## Performance

- **First run**: Generates all thumbnails (~5-10 seconds per thumbnail)
- **Subsequent runs**: Only generates new/missing thumbnails
- **CI/CD**: Runs automatically, adds ~30-60 seconds to build
- **Output size**: ~50-100KB per thumbnail (optimized JPEG)

## Benefits

1. **Consistent branding** across all blog posts
2. **Better social media sharing** with proper Open Graph images
3. **No manual work** required - fully automated
4. **Professional appearance** with themed designs
5. **SEO benefits** from proper meta images

---

🎉 **Your blog now has beautiful, automatically generated thumbnails!**
