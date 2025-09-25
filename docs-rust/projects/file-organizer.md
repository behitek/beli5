# 📁 File Organizer Project: System Programming with Rust

🤖 **AI-Generated Content**: This page was created by AI to help explain Rust programming concepts in simple terms. While we've checked it carefully, always ask an adult or teacher if something doesn't make sense!

---

## 🎯 Project Goal

Build a file organizer that safely manages files and directories, demonstrating Rust's system programming capabilities and error handling.

---

## 🏗️ What You'll Build

A command-line tool that:
- Scans directories for files
- Organizes files by type (images, documents, etc.)
- Handles file system errors gracefully
- Uses Rust's standard library for file operations

```rust
use std::fs;
use std::path::Path;

struct FileOrganizer {
    source_dir: String,
    target_dir: String,
}

impl FileOrganizer {
    fn new(source: String, target: String) -> Self {
        FileOrganizer {
            source_dir: source,
            target_dir: target,
        }
    }
    
    fn organize_files(&self) -> Result<(), Box<dyn std::error::Error>> {
        let entries = fs::read_dir(&self.source_dir)?;
        
        for entry in entries {
            let entry = entry?;
            let path = entry.path();
            
            if path.is_file() {
                self.move_file_by_type(&path)?;
            }
        }
        
        Ok(())
    }
    
    fn move_file_by_type(&self, file_path: &Path) -> Result<(), Box<dyn std::error::Error>> {
        let extension = file_path.extension()
            .and_then(|ext| ext.to_str())
            .unwrap_or("unknown");
            
        let category = match extension.to_lowercase().as_str() {
            "jpg" | "png" | "gif" => "images",
            "pdf" | "doc" | "txt" => "documents",
            "mp3" | "wav" | "mp4" => "media",
            _ => "others",
        };
        
        println!("📄 Organizing: {:?} -> {}", file_path.file_name().unwrap(), category);
        Ok(())
    }
}
```

This project teaches file I/O, error propagation, pattern matching, and working with the standard library.

---

**Next Project**: [Web Scraper](./web-scraper) 🌐

*🦀 Learn system programming and file handling with Rust!*
