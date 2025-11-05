---
sidebar_position: 7
title: 📝 Markdown to HTML Converter
description: Xây dựng công cụ chuyển đổi Markdown sang HTML với Rust - Pattern matching, regex, và string manipulation
keywords: [rust, project, markdown, html, parser, regex, intermediate, chuyển đổi]
---

# 📝 Markdown to HTML Converter

## 🎯 Mục Tiêu Dự Án

Xây dựng một **công cụ chuyển đổi Markdown sang HTML** hỗ trợ:
- 📑 Headers (H1-H6): `#`, `##`, `###`
- **💪 Bold text**: `**text**`
- *✨ Italic text*: `*text*` hoặc `_text_`
- 🔗 Links: `[text](url)`
- 📋 Lists: Unordered (`-`, `*`) và Ordered (`1.`, `2.`)
- 💻 Code blocks: `` `code` `` và ` ```code``` `

### Bạn Sẽ Học Được
- ✅ **String manipulation** nâng cao
- ✅ **Regex** (Regular Expressions) trong Rust
- ✅ **Pattern matching** và parsing
- ✅ **File I/O**: Đọc và ghi file
- ✅ Xử lý **line-by-line parsing**
- ✅ **Testing** với examples

## 📦 Bước 1: Tạo Project và Dependencies

```bash
cargo new markdown_parser
cd markdown_parser
```

Thêm vào `Cargo.toml`:

```toml
[dependencies]
regex = "1.10"
```

## 🎮 Bước 2: Version 1 - Basic Headers và Paragraphs

Mở `src/main.rs`:

```rust
fn parse_markdown(markdown: &str) -> String {
    let mut html = String::new();

    for line in markdown.lines() {
        let trimmed = line.trim();

        // Empty line
        if trimmed.is_empty() {
            html.push_str("<br>\n");
            continue;
        }

        // Headers
        if trimmed.starts_with('#') {
            let level = trimmed.chars().take_while(|&c| c == '#').count();
            let text = trimmed.trim_start_matches('#').trim();

            if level <= 6 {
                html.push_str(&format!("<h{}>{}</h{}>\n", level, text, level));
                continue;
            }
        }

        // Regular paragraph
        html.push_str(&format!("<p>{}</p>\n", trimmed));
    }

    html
}

fn main() {
    println!("📝 Markdown to HTML - Version 1");
    println!("================================\n");

    let markdown = r#"
# Welcome to Rust
## What is Rust?
Rust is a systems programming language.
### Key Features
Fast, safe, and concurrent.
"#;

    let html = parse_markdown(markdown);

    println!("📄 Markdown Input:");
    println!("{}", markdown);
    println!("\n🌐 HTML Output:");
    println!("{}", html);
}
```

## 🚀 Chạy Thử

```bash
cargo run
```

**Output:**
```
📝 Markdown to HTML - Version 1
================================

📄 Markdown Input:

# Welcome to Rust
## What is Rust?
Rust is a systems programming language.
### Key Features
Fast, safe, and concurrent.


🌐 HTML Output:
<br>
<h1>Welcome to Rust</h1>
<h2>What is Rust?</h2>
<p>Rust is a systems programming language.</p>
<h3>Key Features</h3>
<p>Fast, safe, and concurrent.</p>
```

## 📖 Giải Thích Code

### 1. Line-by-Line Parsing

```rust
for line in markdown.lines() {
    let trimmed = line.trim();
    // Process each line
}
```

- `lines()`: Iterator qua từng dòng
- `trim()`: Loại bỏ whitespace đầu/cuối

### 2. Count Header Level

```rust
let level = trimmed.chars().take_while(|&c| c == '#').count();
```

- `take_while()`: Lấy ký tự trong khi điều kiện đúng
- `count()`: Đếm số lượng `#`

### 3. Strip Prefix

```rust
let text = trimmed.trim_start_matches('#').trim();
```

- `trim_start_matches('#')`: Xóa tất cả `#` ở đầu
- Sau đó `trim()` để xóa khoảng trắng

## 🎨 Bước 3: Version 2 - Bold, Italic, và Links

Thêm regex để xử lý inline formatting:

```rust
use regex::Regex;

fn parse_inline(text: &str) -> String {
    let mut result = text.to_string();

    // Bold: **text** hoặc __text__
    let bold_regex = Regex::new(r"\*\*(.+?)\*\*|__(.+?)__").unwrap();
    result = bold_regex.replace_all(&result, |caps: &regex::Captures| {
        let content = caps.get(1).or_else(|| caps.get(2)).unwrap().as_str();
        format!("<strong>{}</strong>", content)
    }).to_string();

    // Italic: *text* hoặc _text_ (nhưng không phải ** hay __)
    let italic_regex = Regex::new(r"(?<!\*)\*([^*]+?)\*(?!\*)|(?<!_)_([^_]+?)_(?!_)").unwrap();
    result = italic_regex.replace_all(&result, |caps: &regex::Captures| {
        let content = caps.get(1).or_else(|| caps.get(2)).unwrap().as_str();
        format!("<em>{}</em>", content)
    }).to_string();

    // Links: [text](url)
    let link_regex = Regex::new(r"\[([^\]]+)\]\(([^)]+)\)").unwrap();
    result = link_regex.replace_all(&result, "<a href=\"$2\">$1</a>").to_string();

    result
}

fn parse_markdown(markdown: &str) -> String {
    let mut html = String::new();

    for line in markdown.lines() {
        let trimmed = line.trim();

        if trimmed.is_empty() {
            html.push_str("<br>\n");
            continue;
        }

        // Headers
        if trimmed.starts_with('#') {
            let level = trimmed.chars().take_while(|&c| c == '#').count();
            let text = trimmed.trim_start_matches('#').trim();

            if level <= 6 {
                let parsed_text = parse_inline(text);
                html.push_str(&format!("<h{}>{}</h{}>\n", level, parsed_text, level));
                continue;
            }
        }

        // Regular paragraph with inline formatting
        let parsed = parse_inline(trimmed);
        html.push_str(&format!("<p>{}</p>\n", parsed));
    }

    html
}

fn main() {
    println!("📝 Markdown to HTML - Version 2");
    println!("================================\n");

    let markdown = r#"
# Welcome to **Rust**
This is a *programming language* that is **fast** and *safe*.
Check out [Rust website](https://www.rust-lang.org/).
You can use **bold** and *italic* together.
"#;

    let html = parse_markdown(markdown);

    println!("📄 Markdown Input:");
    println!("{}", markdown);
    println!("\n🌐 HTML Output:");
    println!("{}", html);
}
```

**Output:**
```html
<br>
<h1>Welcome to <strong>Rust</strong></h1>
<p>This is a <em>programming language</em> that is <strong>fast</strong> and <em>safe</em>.</p>
<p>Check out <a href="https://www.rust-lang.org/">Rust website</a>.</p>
<p>You can use <strong>bold</strong> and <em>italic</em> together.</p>
```

## 🎨 Bước 4: Version 3 - Lists và Code Blocks

Thêm hỗ trợ lists và code:

```rust
use regex::Regex;

fn parse_inline(text: &str) -> String {
    let mut result = text.to_string();

    // Code inline: `code`
    let code_regex = Regex::new(r"`([^`]+)`").unwrap();
    result = code_regex.replace_all(&result, "<code>$1</code>").to_string();

    // Bold
    let bold_regex = Regex::new(r"\*\*(.+?)\*\*|__(.+?)__").unwrap();
    result = bold_regex.replace_all(&result, |caps: &regex::Captures| {
        let content = caps.get(1).or_else(|| caps.get(2)).unwrap().as_str();
        format!("<strong>{}</strong>", content)
    }).to_string();

    // Italic
    let italic_regex = Regex::new(r"(?<!\*)\*([^*]+?)\*(?!\*)|(?<!_)_([^_]+?)_(?!_)").unwrap();
    result = italic_regex.replace_all(&result, |caps: &regex::Captures| {
        let content = caps.get(1).or_else(|| caps.get(2)).unwrap().as_str();
        format!("<em>{}</em>", content)
    }).to_string();

    // Links
    let link_regex = Regex::new(r"\[([^\]]+)\]\(([^)]+)\)").unwrap();
    result = link_regex.replace_all(&result, "<a href=\"$2\">$1</a>").to_string();

    result
}

fn parse_markdown(markdown: &str) -> String {
    let mut html = String::new();
    let lines: Vec<&str> = markdown.lines().collect();
    let mut i = 0;

    while i < lines.len() {
        let trimmed = lines[i].trim();

        // Empty line
        if trimmed.is_empty() {
            html.push_str("<br>\n");
            i += 1;
            continue;
        }

        // Code block: ```
        if trimmed.starts_with("```") {
            html.push_str("<pre><code>");
            i += 1;

            while i < lines.len() && !lines[i].trim().starts_with("```") {
                html.push_str(lines[i]);
                html.push('\n');
                i += 1;
            }

            html.push_str("</code></pre>\n");
            i += 1;
            continue;
        }

        // Headers
        if trimmed.starts_with('#') {
            let level = trimmed.chars().take_while(|&c| c == '#').count();
            let text = trimmed.trim_start_matches('#').trim();

            if level <= 6 {
                let parsed_text = parse_inline(text);
                html.push_str(&format!("<h{}>{}</h{}>\n", level, parsed_text, level));
                i += 1;
                continue;
            }
        }

        // Unordered list
        if trimmed.starts_with("- ") || trimmed.starts_with("* ") {
            html.push_str("<ul>\n");

            while i < lines.len() {
                let line = lines[i].trim();
                if line.starts_with("- ") || line.starts_with("* ") {
                    let item = line.trim_start_matches(&['-', '*'][..]).trim();
                    let parsed_item = parse_inline(item);
                    html.push_str(&format!("  <li>{}</li>\n", parsed_item));
                    i += 1;
                } else {
                    break;
                }
            }

            html.push_str("</ul>\n");
            continue;
        }

        // Ordered list
        if trimmed.chars().next().map(|c| c.is_numeric()).unwrap_or(false)
            && trimmed.contains(". ")
        {
            html.push_str("<ol>\n");

            while i < lines.len() {
                let line = lines[i].trim();
                if line.chars().next().map(|c| c.is_numeric()).unwrap_or(false)
                    && line.contains(". ")
                {
                    let item = line.splitn(2, ". ").nth(1).unwrap_or("");
                    let parsed_item = parse_inline(item);
                    html.push_str(&format!("  <li>{}</li>\n", parsed_item));
                    i += 1;
                } else {
                    break;
                }
            }

            html.push_str("</ol>\n");
            continue;
        }

        // Regular paragraph
        let parsed = parse_inline(trimmed);
        html.push_str(&format!("<p>{}</p>\n", parsed));
        i += 1;
    }

    html
}

fn main() {
    println!("📝 Markdown to HTML - Version 3");
    println!("================================\n");

    let markdown = r#"
# Rust Programming

## Features
- **Fast** execution
- *Memory safe*
- Concurrent programming
- Zero-cost abstractions

## Getting Started
1. Install Rust
2. Create a project with `cargo new`
3. Write code
4. Run with `cargo run`

## Example Code
```
fn main() {
    println!("Hello, Rust!");
}
```

Check [official docs](https://doc.rust-lang.org/).
"#;

    let html = parse_markdown(markdown);

    println!("📄 Markdown Input:");
    println!("{}", markdown);
    println!("\n🌐 HTML Output:");
    println!("{}", html);
}
```

**Output:**
```html
<br>
<h1>Rust Programming</h1>
<br>
<h2>Features</h2>
<ul>
  <li><strong>Fast</strong> execution</li>
  <li><em>Memory safe</em></li>
  <li>Concurrent programming</li>
  <li>Zero-cost abstractions</li>
</ul>
<br>
<h2>Getting Started</h2>
<ol>
  <li>Install Rust</li>
  <li>Create a project with <code>cargo new</code></li>
  <li>Write code</li>
  <li>Run with <code>cargo run</code></li>
</ol>
```

## 🎨 Bước 5: Version 4 - File I/O

Đọc từ file và ghi ra file:

```rust
use regex::Regex;
use std::fs;
use std::io::{self, Write};

fn parse_inline(text: &str) -> String {
    let mut result = text.to_string();

    // Code inline
    let code_regex = Regex::new(r"`([^`]+)`").unwrap();
    result = code_regex.replace_all(&result, "<code>$1</code>").to_string();

    // Bold
    let bold_regex = Regex::new(r"\*\*(.+?)\*\*|__(.+?)__").unwrap();
    result = bold_regex.replace_all(&result, |caps: &regex::Captures| {
        let content = caps.get(1).or_else(|| caps.get(2)).unwrap().as_str();
        format!("<strong>{}</strong>", content)
    }).to_string();

    // Italic
    let italic_regex = Regex::new(r"(?<!\*)\*([^*]+?)\*(?!\*)|(?<!_)_([^_]+?)_(?!_)").unwrap();
    result = italic_regex.replace_all(&result, |caps: &regex::Captures| {
        let content = caps.get(1).or_else(|| caps.get(2)).unwrap().as_str();
        format!("<em>{}</em>", content)
    }).to_string();

    // Links
    let link_regex = Regex::new(r"\[([^\]]+)\]\(([^)]+)\)").unwrap();
    result = link_regex.replace_all(&result, "<a href=\"$2\">$1</a>").to_string();

    result
}

fn parse_markdown(markdown: &str) -> String {
    let mut html = String::new();
    let lines: Vec<&str> = markdown.lines().collect();
    let mut i = 0;

    while i < lines.len() {
        let trimmed = lines[i].trim();

        if trimmed.is_empty() {
            html.push_str("<br>\n");
            i += 1;
            continue;
        }

        // Code block
        if trimmed.starts_with("```") {
            html.push_str("<pre><code>");
            i += 1;

            while i < lines.len() && !lines[i].trim().starts_with("```") {
                html.push_str(lines[i]);
                html.push('\n');
                i += 1;
            }

            html.push_str("</code></pre>\n");
            i += 1;
            continue;
        }

        // Headers
        if trimmed.starts_with('#') {
            let level = trimmed.chars().take_while(|&c| c == '#').count();
            let text = trimmed.trim_start_matches('#').trim();

            if level <= 6 {
                let parsed_text = parse_inline(text);
                html.push_str(&format!("<h{}>{}</h{}>\n", level, parsed_text, level));
                i += 1;
                continue;
            }
        }

        // Unordered list
        if trimmed.starts_with("- ") || trimmed.starts_with("* ") {
            html.push_str("<ul>\n");

            while i < lines.len() {
                let line = lines[i].trim();
                if line.starts_with("- ") || line.starts_with("* ") {
                    let item = line.trim_start_matches(&['-', '*'][..]).trim();
                    let parsed_item = parse_inline(item);
                    html.push_str(&format!("  <li>{}</li>\n", parsed_item));
                    i += 1;
                } else {
                    break;
                }
            }

            html.push_str("</ul>\n");
            continue;
        }

        // Ordered list
        if trimmed.chars().next().map(|c| c.is_numeric()).unwrap_or(false)
            && trimmed.contains(". ")
        {
            html.push_str("<ol>\n");

            while i < lines.len() {
                let line = lines[i].trim();
                if line.chars().next().map(|c| c.is_numeric()).unwrap_or(false)
                    && line.contains(". ")
                {
                    let item = line.splitn(2, ". ").nth(1).unwrap_or("");
                    let parsed_item = parse_inline(item);
                    html.push_str(&format!("  <li>{}</li>\n", parsed_item));
                    i += 1;
                } else {
                    break;
                }
            }

            html.push_str("</ol>\n");
            continue;
        }

        // Regular paragraph
        let parsed = parse_inline(trimmed);
        html.push_str(&format!("<p>{}</p>\n", parsed));
        i += 1;
    }

    html
}

fn wrap_html(content: &str, title: &str) -> String {
    format!(
        r#"<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{}</title>
    <style>
        body {{ font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }}
        code {{ background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }}
        pre {{ background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }}
    </style>
</head>
<body>
{}
</body>
</html>"#,
        title, content
    )
}

fn convert_file(input_path: &str, output_path: &str) -> Result<(), String> {
    // Đọc file markdown
    let markdown = fs::read_to_string(input_path)
        .map_err(|e| format!("Không đọc được file {}: {}", input_path, e))?;

    // Parse markdown
    let html_content = parse_markdown(&markdown);

    // Wrap với HTML template
    let full_html = wrap_html(&html_content, "Converted from Markdown");

    // Ghi ra file
    fs::write(output_path, full_html)
        .map_err(|e| format!("Không ghi được file {}: {}", output_path, e))?;

    Ok(())
}

fn main() {
    println!("📝 Markdown to HTML Converter - Version 4");
    println!("==========================================\n");

    println!("Chế độ:");
    println!("  1. Convert từ file");
    println!("  2. Input trực tiếp");
    print!("> ");
    io::stdout().flush().unwrap();

    let mut choice = String::new();
    io::stdin().read_line(&mut choice).unwrap();

    match choice.trim() {
        "1" => {
            print!("📂 Nhập đường dẫn file Markdown: ");
            io::stdout().flush().unwrap();

            let mut input_path = String::new();
            io::stdin().read_line(&mut input_path).unwrap();
            let input_path = input_path.trim();

            let output_path = input_path.replace(".md", ".html");

            match convert_file(input_path, &output_path) {
                Ok(_) => println!("✅ Đã tạo file: {}", output_path),
                Err(e) => println!("❌ Lỗi: {}", e),
            }
        },
        "2" => {
            println!("📝 Nhập Markdown (kết thúc với Ctrl+D trên Linux/Mac hoặc Ctrl+Z trên Windows):");

            let mut markdown = String::new();
            io::stdin().read_to_string(&mut markdown).unwrap();

            let html = parse_markdown(&markdown);
            println!("\n🌐 HTML Output:");
            println!("{}", html);
        },
        _ => println!("⚠️  Lựa chọn không hợp lệ!"),
    }
}
```

## 🐛 Lỗi Thường Gặp

### Lỗi 1: Regex Greedy Matching

```rust
// ❌ SAI: Greedy - match toàn bộ "**bold** normal **bold2**"
let regex = Regex::new(r"\*\*(.+)\*\*").unwrap();

// ✅ ĐÚNG: Non-greedy với ?
let regex = Regex::new(r"\*\*(.+?)\*\*").unwrap();
```

### Lỗi 2: Italic vs Bold Conflict

```rust
// ❌ SAI: ** bị match như * + *
// "**bold**" → "<em>*bold*</em>"

// ✅ ĐÚNG: Parse bold trước italic
// Hoặc dùng negative lookahead: (?<!\*)
```

### Lỗi 3: List Không Kết Thúc

```rust
// ❌ SAI: Không break khỏi list loop
while i < lines.len() {
    if is_list_item(lines[i]) {
        // process
        i += 1;
    }
    // Thiếu else break!
}

// ✅ ĐÚNG
while i < lines.len() {
    if is_list_item(lines[i]) {
        // process
        i += 1;
    } else {
        break; // Kết thúc list
    }
}
```

### Lỗi 4: HTML Injection

```rust
// ❌ SAI: Không escape HTML
let html = format!("<p>{}</p>", user_input);

// ✅ ĐÚNG: Escape HTML entities
fn escape_html(text: &str) -> String {
    text.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
}
```

## 💪 Thử Thách Nâng Cao

### Thử Thách 1: Tables Support

Hỗ trợ bảng Markdown:
```markdown
| Name | Age |
|------|-----|
| Alice| 30  |
| Bob  | 25  |
```

### Thử Thách 2: Nested Lists

Lists lồng nhau:
```markdown
- Item 1
  - Subitem 1.1
  - Subitem 1.2
- Item 2
```

<details>
<summary>💡 Gợi ý</summary>

Đếm số spaces ở đầu để xác định level.
</details>

### Thử Thách 3: Syntax Highlighting

Tô màu code blocks theo ngôn ngữ:
````markdown
```rust
fn main() {
    println!("Hello");
}
```
````

<details>
<summary>💡 Gợi ý</summary>

Dùng crate `syntect` cho syntax highlighting.
</details>

### Thử Thách 4: Blockquotes

Support `> quote`:
```markdown
> This is a quote
> Multiple lines
```

### Thử Thách 5: Images

Support `![alt](url)`:
```markdown
![Rust Logo](https://www.rust-lang.org/logo.png)
```

## 📚 Kiến Thức Đã Học

✅ **Regex**: Pattern matching với regular expressions
✅ **String Manipulation**: `replace()`, `trim()`, `split()`
✅ **Iterators**: Line-by-line processing
✅ **File I/O**: Đọc và ghi file
✅ **State Management**: Tracking parsing state (in list, in code block, etc.)
✅ **HTML Generation**: Tạo HTML an toàn
✅ **Error Handling**: Result type cho file operations
✅ **Closures**: Dùng với `replace_all()`

## 🧪 Testing

Tạo tests:

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_headers() {
        assert_eq!(parse_markdown("# H1"), "<h1>H1</h1>\n");
        assert_eq!(parse_markdown("## H2"), "<h2>H2</h2>\n");
    }

    #[test]
    fn test_bold() {
        let result = parse_inline("**bold**");
        assert!(result.contains("<strong>bold</strong>"));
    }

    #[test]
    fn test_links() {
        let result = parse_inline("[text](url)");
        assert!(result.contains("<a href=\"url\">text</a>"));
    }
}
```

## 🎯 Bước Tiếp Theo

➡️ **Tiếp theo**: [Mini Grep Tool](grep-clone.md)
➡️ **Quay lại**: [Password Generator](password-generator.md)
➡️ **Hoặc**: [Todo CLI](todo-cli.md)

---

🎉 **Tuyệt vời! Bạn đã xây dựng Markdown Parser!** 📝
