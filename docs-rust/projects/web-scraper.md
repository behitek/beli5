# 🌐 Web Scraper Project: Network Programming with Rust

🤖 **AI-Generated Content**: This page was created by AI to help explain Rust programming concepts in simple terms. While we've checked it carefully, always ask an adult or teacher if something doesn't make sense!

---

## 🎯 Project Goal

Build a web scraper that safely downloads and processes web content, demonstrating Rust's networking capabilities and external crate usage.

---

## 🏗️ What You'll Build

A web scraper that:
- Makes HTTP requests safely
- Parses HTML content
- Handles network errors gracefully
- Demonstrates async programming basics

```rust
use reqwest;
use tokio;

#[derive(Debug)]
struct ScrapedData {
    title: String,
    links: Vec<String>,
    status: u16,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("🌐 SAFE WEB SCRAPER v1.0");
    println!("========================");
    
    let url = "https://httpbin.org/html";
    
    match scrape_website(url).await {
        Ok(data) => {
            println!("✅ Successfully scraped: {}", url);
            println!("📄 Title: {}", data.title);
            println!("🔗 Found {} links", data.links.len());
            println!("📊 Status: {}", data.status);
        },
        Err(error) => {
            println!("❌ Scraping failed: {}", error);
        }
    }
    
    Ok(())
}

async fn scrape_website(url: &str) -> Result<ScrapedData, Box<dyn std::error::Error>> {
    println!("🔍 Fetching: {}", url);
    
    let response = reqwest::get(url).await?;
    let status = response.status().as_u16();
    let body = response.text().await?;
    
    // Simple HTML parsing (in real project, use scraper crate)
    let title = extract_title(&body).unwrap_or("No title found".to_string());
    let links = extract_links(&body);
    
    Ok(ScrapedData {
        title,
        links,
        status,
    })
}

fn extract_title(html: &str) -> Option<String> {
    // Simple title extraction
    if let Some(start) = html.find("<title>") {
        if let Some(end) = html[start..].find("</title>") {
            let title = &html[start + 7..start + end];
            return Some(title.to_string());
        }
    }
    None
}

fn extract_links(html: &str) -> Vec<String> {
    // Simple link extraction
    let mut links = Vec::new();
    let mut search_pos = 0;
    
    while let Some(start) = html[search_pos..].find("href=\"") {
        let abs_start = search_pos + start + 6;
        if let Some(end) = html[abs_start..].find("\"") {
            let link = &html[abs_start..abs_start + end];
            links.push(link.to_string());
            search_pos = abs_start + end;
        } else {
            break;
        }
    }
    
    links
}
```

This project teaches async programming, HTTP clients, error handling, and working with external crates.

---

**Next Project**: [Concurrent Downloader](./concurrent-downloader) ⚡

*🦀 Master network programming and async Rust!*
