# ⚡ Concurrent Downloader Project: Advanced Async Programming

🤖 **AI-Generated Content**: This page was created by AI to help explain Rust programming concepts in simple terms. While we've checked it carefully, always ask an adult or teacher if something doesn't make sense!

---

## 🎯 Project Goal

Build a concurrent file downloader that safely downloads multiple files simultaneously, demonstrating advanced async programming and concurrency patterns.

---

## 🏗️ What You'll Build

A high-performance downloader that:
- Downloads multiple files concurrently
- Shows download progress for each file
- Handles network failures gracefully
- Demonstrates Rust's fearless concurrency

```rust
use reqwest;
use tokio;
use std::sync::Arc;
use tokio::sync::Semaphore;

struct DownloadManager {
    max_concurrent: usize,
    client: reqwest::Client,
}

impl DownloadManager {
    fn new(max_concurrent: usize) -> Self {
        DownloadManager {
            max_concurrent,
            client: reqwest::Client::new(),
        }
    }
    
    async fn download_files(&self, urls: Vec<String>) -> Vec<DownloadResult> {
        let semaphore = Arc::new(Semaphore::new(self.max_concurrent));
        let mut tasks = Vec::new();
        
        for (index, url) in urls.into_iter().enumerate() {
            let permit = semaphore.clone();
            let client = self.client.clone();
            
            let task = tokio::spawn(async move {
                let _permit = permit.acquire().await.unwrap();
                println!("🚀 Starting download {}: {}", index + 1, url);
                
                match download_single_file(client, &url).await {
                    Ok(size) => {
                        println!("✅ Completed download {}: {} bytes", index + 1, size);
                        DownloadResult::Success { url, size }
                    },
                    Err(error) => {
                        println!("❌ Failed download {}: {}", index + 1, error);
                        DownloadResult::Failed { url, error: error.to_string() }
                    }
                }
            });
            
            tasks.push(task);
        }
        
        let mut results = Vec::new();
        for task in tasks {
            match task.await {
                Ok(result) => results.push(result),
                Err(error) => {
                    println!("⚠️ Task failed: {}", error);
                }
            }
        }
        
        results
    }
}

#[derive(Debug)]
enum DownloadResult {
    Success { url: String, size: usize },
    Failed { url: String, error: String },
}

async fn download_single_file(client: reqwest::Client, url: &str) -> Result<usize, Box<dyn std::error::Error>> {
    let response = client.get(url).send().await?;
    let bytes = response.bytes().await?;
    Ok(bytes.len())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("⚡ CONCURRENT DOWNLOADER v1.0");
    println!("=============================");
    
    let urls = vec![
        "https://httpbin.org/json".to_string(),
        "https://httpbin.org/xml".to_string(),
        "https://httpbin.org/html".to_string(),
        "https://httpbin.org/robots.txt".to_string(),
    ];
    
    let downloader = DownloadManager::new(2); // Max 2 concurrent downloads
    
    println!("📥 Starting concurrent downloads...");
    let start_time = std::time::Instant::now();
    
    let results = downloader.download_files(urls).await;
    
    let duration = start_time.elapsed();
    
    println!("\n📊 DOWNLOAD SUMMARY:");
    println!("====================");
    
    let mut successful = 0;
    let mut total_bytes = 0;
    
    for result in &results {
        match result {
            DownloadResult::Success { url, size } => {
                successful += 1;
                total_bytes += size;
                println!("✅ {}: {} bytes", url, size);
            },
            DownloadResult::Failed { url, error } => {
                println!("❌ {}: {}", url, error);
            }
        }
    }
    
    println!("\n📈 Statistics:");
    println!("  Successful: {}/{}", successful, results.len());
    println!("  Total bytes: {}", total_bytes);
    println!("  Time taken: {:.2}s", duration.as_secs_f64());
    
    Ok(())
}
```

This project teaches advanced concurrency patterns, async/await, semaphores, and building high-performance applications.

---

**Congratulations!** You've completed all Rust projects. Check out [What's Next?](../whats-next) for your continued learning journey! 🚀

*🦀 You've mastered concurrent programming - the pinnacle of Rust development!*
