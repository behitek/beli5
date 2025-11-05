---
sidebar_position: 12
title: 🛠️ Professional CLI Tool với Clap
description: Xây dựng command-line application chuyên nghiệp với Rust - Clap parser, subcommands, config files, colors
keywords: [rust, project, cli, clap, terminal, command-line, advanced, tool]
---

# 🛠️ Professional CLI Tool với Clap

## 🎯 Mục Tiêu Dự Án

Xây dựng một **professional CLI application** (File Organizer Tool) với đầy đủ tính năng:
- 📁 File organization với custom rules
- 🎨 Colored output và progress bars
- ⚙️ Configuration file support (TOML/JSON)
- 🔍 Subcommands với nhiều options
- 📊 Detailed logging và verbosity levels
- 🚀 Shell completion scripts
- ✅ Input validation và error handling
- 📝 Comprehensive help messages

### Bạn Sẽ Học Được
- ✅ **Clap v4** cho argument parsing
- ✅ **Subcommands** và nested commands
- ✅ **Configuration management** với serde
- ✅ **Colored output** với colored crate
- ✅ **Progress bars** với indicatif
- ✅ **Logging** với env_logger và log
- ✅ **Shell completion** generation
- ✅ **Error handling** với anyhow và thiserror

## 📦 Bước 1: Setup Project

```bash
cargo new fileorg
cd fileorg
```

Thêm dependencies vào `Cargo.toml`:

```toml
[dependencies]
clap = { version = "4.4", features = ["derive", "cargo"] }
clap_complete = "4.4"
colored = "2.1"
indicatif = "0.17"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
toml = "0.8"
anyhow = "1.0"
thiserror = "1.0"
log = "0.4"
env_logger = "0.10"
chrono = "0.4"
walkdir = "2.4"
regex = "1.10"
```

## 🎮 Bước 2: Version 1 - Basic CLI với Clap

Tạo `src/cli.rs`:

```rust
use clap::{Parser, Subcommand};
use std::path::PathBuf;

#[derive(Parser)]
#[command(name = "fileorg")]
#[command(author, version, about, long_about = None)]
#[command(propagate_version = true)]
pub struct Cli {
    /// Verbosity level (-v, -vv, -vvv)
    #[arg(short, long, action = clap::ArgAction::Count)]
    pub verbose: u8,

    /// Disable colored output
    #[arg(long)]
    pub no_color: bool,

    /// Configuration file path
    #[arg(short, long, value_name = "FILE")]
    pub config: Option<PathBuf>,

    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand)]
pub enum Commands {
    /// Organize files in a directory
    Organize {
        /// Source directory to organize
        #[arg(value_name = "DIR")]
        source: PathBuf,

        /// Destination directory (default: source directory)
        #[arg(short, long, value_name = "DIR")]
        dest: Option<PathBuf>,

        /// Dry run - don't actually move files
        #[arg(short = 'n', long)]
        dry_run: bool,

        /// Organization strategy
        #[arg(short, long, value_enum, default_value = "extension")]
        strategy: Strategy,
    },

    /// List files in a directory with filtering
    List {
        /// Directory to list
        #[arg(value_name = "DIR", default_value = ".")]
        path: PathBuf,

        /// Filter by extension (e.g., txt, pdf)
        #[arg(short, long)]
        extension: Option<String>,

        /// Recursive listing
        #[arg(short, long)]
        recursive: bool,

        /// Show hidden files
        #[arg(short = 'a', long)]
        all: bool,
    },

    /// Search for files matching a pattern
    Search {
        /// Search pattern (regex)
        #[arg(value_name = "PATTERN")]
        pattern: String,

        /// Directory to search in
        #[arg(value_name = "DIR", default_value = ".")]
        path: PathBuf,

        /// Case-insensitive search
        #[arg(short, long)]
        ignore_case: bool,
    },

    /// Show statistics about files in directory
    Stats {
        /// Directory to analyze
        #[arg(value_name = "DIR", default_value = ".")]
        path: PathBuf,

        /// Show detailed breakdown
        #[arg(short, long)]
        detailed: bool,
    },

    /// Generate shell completion script
    Completion {
        /// Shell type
        #[arg(value_enum)]
        shell: clap_complete::Shell,
    },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, clap::ValueEnum)]
pub enum Strategy {
    /// Organize by file extension
    Extension,
    /// Organize by creation date
    Date,
    /// Organize by file size
    Size,
    /// Organize by first letter
    Letter,
}

impl std::fmt::Display for Strategy {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Strategy::Extension => write!(f, "extension"),
            Strategy::Date => write!(f, "date"),
            Strategy::Size => write!(f, "size"),
            Strategy::Letter => write!(f, "letter"),
        }
    }
}
```

Tạo `src/main.rs`:

```rust
mod cli;
mod commands;
mod config;
mod error;

use clap::Parser;
use cli::{Cli, Commands};
use colored::*;

fn main() {
    let cli = Cli::parse();

    // Setup logging
    let log_level = match cli.verbose {
        0 => "error",
        1 => "warn",
        2 => "info",
        3 => "debug",
        _ => "trace",
    };

    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or(log_level))
        .init();

    // Disable colors if requested
    if cli.no_color {
        colored::control::set_override(false);
    }

    // Execute command
    let result = match cli.command {
        Commands::Organize { source, dest, dry_run, strategy } => {
            commands::organize::execute(source, dest, dry_run, strategy)
        },
        Commands::List { path, extension, recursive, all } => {
            commands::list::execute(path, extension, recursive, all)
        },
        Commands::Search { pattern, path, ignore_case } => {
            commands::search::execute(pattern, path, ignore_case)
        },
        Commands::Stats { path, detailed } => {
            commands::stats::execute(path, detailed)
        },
        Commands::Completion { shell } => {
            commands::completion::execute(shell);
            return;
        },
    };

    if let Err(e) = result {
        eprintln!("{} {}", "Error:".red().bold(), e);
        std::process::exit(1);
    }
}
```

## 📖 Giải Thích Code

### 1. Clap Derive Macros

```rust
#[derive(Parser)]
#[command(name = "fileorg")]
#[command(author, version, about)]
pub struct Cli {
    #[arg(short, long)]
    pub verbose: u8,
    // ...
}
```

- `#[derive(Parser)]`: Auto-generate argument parser
- `#[command(...)]`: Metadata về CLI app
- `#[arg(...)]`: Configure individual arguments

### 2. Subcommands

```rust
#[derive(Subcommand)]
pub enum Commands {
    Organize { /* fields */ },
    List { /* fields */ },
}
```

- Mỗi variant là một subcommand
- Fields trong variant là arguments cho subcommand đó

### 3. Value Enums

```rust
#[derive(clap::ValueEnum)]
pub enum Strategy {
    Extension,
    Date,
    Size,
}
```

- Auto-generate valid values cho argument
- Case-insensitive parsing

## 🎨 Bước 3: Version 2 - Implement Commands

Tạo `src/commands/organize.rs`:

```rust
use std::path::{Path, PathBuf};
use std::fs;
use colored::*;
use indicatif::{ProgressBar, ProgressStyle};
use anyhow::{Context, Result};
use crate::cli::Strategy;

pub fn execute(
    source: PathBuf,
    dest: Option<PathBuf>,
    dry_run: bool,
    strategy: Strategy,
) -> Result<()> {
    if !source.exists() {
        anyhow::bail!("Source directory does not exist: {}", source.display());
    }

    if !source.is_dir() {
        anyhow::bail!("Source path is not a directory: {}", source.display());
    }

    let dest = dest.unwrap_or_else(|| source.clone());

    println!(
        "{} Organizing files in {} using {} strategy",
        "📁".bold(),
        source.display().to_string().cyan(),
        strategy.to_string().yellow()
    );

    if dry_run {
        println!("{}", "🔍 DRY RUN - No files will be moved".yellow().bold());
    }

    let entries: Vec<_> = fs::read_dir(&source)
        .context("Failed to read source directory")?
        .filter_map(Result::ok)
        .filter(|e| e.path().is_file())
        .collect();

    let pb = ProgressBar::new(entries.len() as u64);
    pb.set_style(
        ProgressStyle::default_bar()
            .template("{spinner:.green} [{elapsed_precise}] [{bar:40.cyan/blue}] {pos}/{len} {msg}")
            .unwrap()
            .progress_chars("=>-")
    );

    let mut moved_count = 0;
    let mut error_count = 0;

    for entry in entries {
        let path = entry.path();
        let file_name = path.file_name().unwrap().to_string_lossy();

        pb.set_message(format!("Processing: {}", file_name));

        match organize_file(&path, &dest, strategy, dry_run) {
            Ok(target) => {
                moved_count += 1;
                log::info!("Moved: {} -> {}", path.display(), target.display());
            }
            Err(e) => {
                error_count += 1;
                log::error!("Failed to move {}: {}", path.display(), e);
            }
        }

        pb.inc(1);
    }

    pb.finish_with_message("Done!");

    println!();
    println!("{}", "Summary:".bold());
    println!("  {} files processed", moved_count.to_string().green());

    if error_count > 0 {
        println!("  {} errors", error_count.to_string().red());
    }

    Ok(())
}

fn organize_file(
    file: &Path,
    dest: &Path,
    strategy: Strategy,
    dry_run: bool,
) -> Result<PathBuf> {
    let target_dir = match strategy {
        Strategy::Extension => {
            let ext = file
                .extension()
                .and_then(|s| s.to_str())
                .unwrap_or("no_extension");
            dest.join(ext)
        }
        Strategy::Date => {
            let metadata = fs::metadata(file)?;
            let created = metadata.created()
                .or_else(|_| metadata.modified())?;

            let datetime: chrono::DateTime<chrono::Local> = created.into();
            dest.join(datetime.format("%Y/%m").to_string())
        }
        Strategy::Size => {
            let size = fs::metadata(file)?.len();
            let category = match size {
                0..=1_048_576 => "small",           // < 1MB
                1_048_577..=10_485_760 => "medium", // 1MB - 10MB
                _ => "large",                       // > 10MB
            };
            dest.join(category)
        }
        Strategy::Letter => {
            let first_char = file
                .file_name()
                .and_then(|s| s.to_str())
                .and_then(|s| s.chars().next())
                .unwrap_or('_');

            let folder = if first_char.is_alphabetic() {
                first_char.to_uppercase().to_string()
            } else {
                "Other".to_string()
            };

            dest.join(folder)
        }
    };

    if !dry_run {
        fs::create_dir_all(&target_dir)?;

        let target_path = target_dir.join(file.file_name().unwrap());
        fs::rename(file, &target_path)?;

        Ok(target_path)
    } else {
        Ok(target_dir.join(file.file_name().unwrap()))
    }
}
```

Tạo `src/commands/list.rs`:

```rust
use std::path::PathBuf;
use std::fs;
use colored::*;
use walkdir::WalkDir;
use anyhow::Result;

pub fn execute(
    path: PathBuf,
    extension: Option<String>,
    recursive: bool,
    show_all: bool,
) -> Result<()> {
    if !path.exists() {
        anyhow::bail!("Path does not exist: {}", path.display());
    }

    println!(
        "{} Listing files in {}",
        "📋".bold(),
        path.display().to_string().cyan()
    );

    if let Some(ref ext) = extension {
        println!("  Filter: *.{}", ext.yellow());
    }

    println!();

    let entries: Box<dyn Iterator<Item = walkdir::DirEntry>> = if recursive {
        Box::new(
            WalkDir::new(&path)
                .into_iter()
                .filter_map(Result::ok)
        )
    } else {
        Box::new(
            fs::read_dir(&path)?
                .filter_map(Result::ok)
                .map(|e| walkdir::DirEntry::from(e))
        )
    };

    let mut file_count = 0;
    let mut dir_count = 0;
    let mut total_size = 0u64;

    for entry in entries {
        let path = entry.path();

        // Skip hidden files unless --all
        if !show_all {
            if let Some(name) = path.file_name() {
                if name.to_string_lossy().starts_with('.') {
                    continue;
                }
            }
        }

        // Filter by extension
        if let Some(ref ext) = extension {
            if path.extension().and_then(|s| s.to_str()) != Some(ext.as_str()) {
                continue;
            }
        }

        let metadata = match fs::metadata(&path) {
            Ok(m) => m,
            Err(_) => continue,
        };

        let size = metadata.len();
        let size_str = format_size(size);

        if metadata.is_dir() {
            dir_count += 1;
            println!(
                "  {} {}",
                "📁".blue(),
                path.display().to_string().blue()
            );
        } else {
            file_count += 1;
            total_size += size;
            println!(
                "  {} {} {}",
                "📄".white(),
                path.display(),
                format!("({})", size_str).dimmed()
            );
        }
    }

    println!();
    println!("{}", "Summary:".bold());
    println!("  {} directories", dir_count.to_string().blue());
    println!("  {} files", file_count.to_string().green());
    println!("  {} total size", format_size(total_size).yellow());

    Ok(())
}

fn format_size(size: u64) -> String {
    const KB: u64 = 1024;
    const MB: u64 = KB * 1024;
    const GB: u64 = MB * 1024;

    if size >= GB {
        format!("{:.2} GB", size as f64 / GB as f64)
    } else if size >= MB {
        format!("{:.2} MB", size as f64 / MB as f64)
    } else if size >= KB {
        format!("{:.2} KB", size as f64 / KB as f64)
    } else {
        format!("{} B", size)
    }
}
```

Tạo `src/commands/search.rs`:

```rust
use std::path::PathBuf;
use colored::*;
use regex::RegexBuilder;
use walkdir::WalkDir;
use anyhow::Result;

pub fn execute(pattern: String, path: PathBuf, ignore_case: bool) -> Result<()> {
    if !path.exists() {
        anyhow::bail!("Path does not exist: {}", path.display());
    }

    let regex = RegexBuilder::new(&pattern)
        .case_insensitive(ignore_case)
        .build()?;

    println!(
        "{} Searching for pattern: {}",
        "🔍".bold(),
        pattern.yellow()
    );
    println!("  in directory: {}", path.display().to_string().cyan());
    println!();

    let mut found_count = 0;

    for entry in WalkDir::new(&path).into_iter().filter_map(Result::ok) {
        let entry_path = entry.path();

        if !entry_path.is_file() {
            continue;
        }

        if let Some(file_name) = entry_path.file_name() {
            let file_name_str = file_name.to_string_lossy();

            if regex.is_match(&file_name_str) {
                found_count += 1;

                // Highlight matched text
                let highlighted = regex.replace_all(&file_name_str, |caps: &regex::Captures| {
                    caps[0].red().bold().to_string()
                });

                println!("  {} {}", "✓".green(), entry_path.display());
                println!("    {}", highlighted);
            }
        }
    }

    println!();
    if found_count > 0 {
        println!(
            "{} Found {} matching files",
            "✓".green().bold(),
            found_count.to_string().green()
        );
    } else {
        println!("{}", "No matching files found".yellow());
    }

    Ok(())
}
```

Tạo `src/commands/stats.rs`:

```rust
use std::path::PathBuf;
use std::collections::HashMap;
use std::fs;
use colored::*;
use walkdir::WalkDir;
use anyhow::Result;

pub fn execute(path: PathBuf, detailed: bool) -> Result<()> {
    if !path.exists() {
        anyhow::bail!("Path does not exist: {}", path.display());
    }

    println!(
        "{} Analyzing directory: {}",
        "📊".bold(),
        path.display().to_string().cyan()
    );
    println!();

    let mut total_files = 0;
    let mut total_dirs = 0;
    let mut total_size = 0u64;
    let mut ext_stats: HashMap<String, (usize, u64)> = HashMap::new();

    for entry in WalkDir::new(&path).into_iter().filter_map(Result::ok) {
        let entry_path = entry.path();
        let metadata = match fs::metadata(entry_path) {
            Ok(m) => m,
            Err(_) => continue,
        };

        if metadata.is_dir() {
            total_dirs += 1;
        } else {
            total_files += 1;
            let size = metadata.len();
            total_size += size;

            // Track extension statistics
            let ext = entry_path
                .extension()
                .and_then(|s| s.to_str())
                .unwrap_or("no extension")
                .to_lowercase();

            let stats = ext_stats.entry(ext).or_insert((0, 0));
            stats.0 += 1;
            stats.1 += size;
        }
    }

    // Display summary
    println!("{}", "Summary:".bold().underline());
    println!("  Total directories: {}", total_dirs.to_string().blue());
    println!("  Total files:       {}", total_files.to_string().green());
    println!("  Total size:        {}", format_size(total_size).yellow());
    println!();

    if detailed && !ext_stats.is_empty() {
        println!("{}", "Breakdown by Extension:".bold().underline());

        let mut sorted_exts: Vec<_> = ext_stats.iter().collect();
        sorted_exts.sort_by(|a, b| b.1.1.cmp(&a.1.1)); // Sort by size descending

        for (ext, (count, size)) in sorted_exts.iter().take(10) {
            let percentage = (*size as f64 / total_size as f64) * 100.0;
            let bar_length = (percentage / 2.0) as usize;
            let bar = "█".repeat(bar_length);

            println!(
                "  {:<15} {:>4} files  {:>10}  {:>5.1}%  {}",
                ext.cyan(),
                count.to_string().white(),
                format_size(**size).yellow(),
                percentage,
                bar.green()
            );
        }
    }

    Ok(())
}

fn format_size(size: u64) -> String {
    const KB: u64 = 1024;
    const MB: u64 = KB * 1024;
    const GB: u64 = MB * 1024;

    if size >= GB {
        format!("{:.2} GB", size as f64 / GB as f64)
    } else if size >= MB {
        format!("{:.2} MB", size as f64 / MB as f64)
    } else if size >= KB {
        format!("{:.2} KB", size as f64 / KB as f64)
    } else {
        format!("{} B", size)
    }
}
```

Tạo `src/commands/completion.rs`:

```rust
use clap_complete::{generate, Shell};
use std::io;

pub fn execute(shell: Shell) {
    let mut cmd = crate::cli::Cli::command();
    let name = cmd.get_name().to_string();

    generate(shell, &mut cmd, name, &mut io::stdout());
}
```

Tạo `src/commands/mod.rs`:

```rust
pub mod organize;
pub mod list;
pub mod search;
pub mod stats;
pub mod completion;
```

## 🎨 Bước 4: Version 3 - Configuration File Support

Tạo `src/config.rs`:

```rust
use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};
use std::fs;
use anyhow::{Context, Result};

#[derive(Debug, Serialize, Deserialize)]
pub struct Config {
    pub default_strategy: String,
    pub ignore_patterns: Vec<String>,
    pub extension_categories: ExtensionCategories,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ExtensionCategories {
    pub documents: Vec<String>,
    pub images: Vec<String>,
    pub videos: Vec<String>,
    pub audio: Vec<String>,
    pub archives: Vec<String>,
    pub code: Vec<String>,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            default_strategy: "extension".to_string(),
            ignore_patterns: vec![
                ".DS_Store".to_string(),
                "Thumbs.db".to_string(),
                "desktop.ini".to_string(),
            ],
            extension_categories: ExtensionCategories {
                documents: vec![
                    "pdf".to_string(),
                    "doc".to_string(),
                    "docx".to_string(),
                    "txt".to_string(),
                    "rtf".to_string(),
                ],
                images: vec![
                    "jpg".to_string(),
                    "jpeg".to_string(),
                    "png".to_string(),
                    "gif".to_string(),
                    "bmp".to_string(),
                    "svg".to_string(),
                ],
                videos: vec![
                    "mp4".to_string(),
                    "avi".to_string(),
                    "mov".to_string(),
                    "mkv".to_string(),
                    "wmv".to_string(),
                ],
                audio: vec![
                    "mp3".to_string(),
                    "wav".to_string(),
                    "flac".to_string(),
                    "aac".to_string(),
                    "ogg".to_string(),
                ],
                archives: vec![
                    "zip".to_string(),
                    "tar".to_string(),
                    "gz".to_string(),
                    "rar".to_string(),
                    "7z".to_string(),
                ],
                code: vec![
                    "rs".to_string(),
                    "py".to_string(),
                    "js".to_string(),
                    "ts".to_string(),
                    "java".to_string(),
                    "cpp".to_string(),
                    "c".to_string(),
                    "go".to_string(),
                ],
            },
        }
    }
}

impl Config {
    pub fn load(path: &Path) -> Result<Self> {
        let content = fs::read_to_string(path)
            .context(format!("Failed to read config file: {}", path.display()))?;

        if path.extension().and_then(|s| s.to_str()) == Some("json") {
            serde_json::from_str(&content)
                .context("Failed to parse JSON config")
        } else {
            toml::from_str(&content)
                .context("Failed to parse TOML config")
        }
    }

    pub fn save(&self, path: &Path) -> Result<()> {
        let content = if path.extension().and_then(|s| s.to_str()) == Some("json") {
            serde_json::to_string_pretty(self)?
        } else {
            toml::to_string_pretty(self)?
        };

        fs::write(path, content)
            .context(format!("Failed to write config file: {}", path.display()))?;

        Ok(())
    }

    pub fn get_category(&self, extension: &str) -> Option<String> {
        let ext = extension.to_lowercase();

        if self.extension_categories.documents.contains(&ext) {
            Some("Documents".to_string())
        } else if self.extension_categories.images.contains(&ext) {
            Some("Images".to_string())
        } else if self.extension_categories.videos.contains(&ext) {
            Some("Videos".to_string())
        } else if self.extension_categories.audio.contains(&ext) {
            Some("Audio".to_string())
        } else if self.extension_categories.archives.contains(&ext) {
            Some("Archives".to_string())
        } else if self.extension_categories.code.contains(&ext) {
            Some("Code".to_string())
        } else {
            None
        }
    }
}

pub fn default_config_path() -> PathBuf {
    if let Some(config_dir) = dirs::config_dir() {
        config_dir.join("fileorg").join("config.toml")
    } else {
        PathBuf::from("config.toml")
    }
}
```

Thêm vào `Cargo.toml`:
```toml
dirs = "5.0"
```

## 🎨 Bước 5: Error Handling với Thiserror

Tạo `src/error.rs`:

```rust
use thiserror::Error;
use std::path::PathBuf;

#[derive(Error, Debug)]
pub enum FileOrgError {
    #[error("Directory not found: {0}")]
    DirectoryNotFound(PathBuf),

    #[error("File operation failed: {0}")]
    FileOperationFailed(String),

    #[error("Invalid configuration: {0}")]
    InvalidConfig(String),

    #[error("Permission denied: {0}")]
    PermissionDenied(PathBuf),

    #[error("Invalid pattern: {0}")]
    InvalidPattern(String),

    #[error(transparent)]
    IoError(#[from] std::io::Error),

    #[error(transparent)]
    RegexError(#[from] regex::Error),
}
```

## 🧪 Testing

Tạo `tests/cli_tests.rs`:

```rust
use assert_cmd::Command;
use predicates::prelude::*;
use tempfile::TempDir;
use std::fs;

#[test]
fn test_list_command() {
    let temp_dir = TempDir::new().unwrap();
    let test_file = temp_dir.path().join("test.txt");
    fs::write(&test_file, "test content").unwrap();

    let mut cmd = Command::cargo_bin("fileorg").unwrap();
    cmd.arg("list")
        .arg(temp_dir.path())
        .assert()
        .success()
        .stdout(predicate::str::contains("test.txt"));
}

#[test]
fn test_organize_dry_run() {
    let temp_dir = TempDir::new().unwrap();
    fs::write(temp_dir.path().join("test.txt"), "content").unwrap();
    fs::write(temp_dir.path().join("test.pdf"), "content").unwrap();

    let mut cmd = Command::cargo_bin("fileorg").unwrap();
    cmd.arg("organize")
        .arg(temp_dir.path())
        .arg("--dry-run")
        .assert()
        .success();

    // Files should still be in original location
    assert!(temp_dir.path().join("test.txt").exists());
}

#[test]
fn test_search_command() {
    let temp_dir = TempDir::new().unwrap();
    fs::write(temp_dir.path().join("hello.txt"), "content").unwrap();
    fs::write(temp_dir.path().join("world.txt"), "content").unwrap();

    let mut cmd = Command::cargo_bin("fileorg").unwrap();
    cmd.arg("search")
        .arg("hello")
        .arg(temp_dir.path())
        .assert()
        .success()
        .stdout(predicate::str::contains("hello.txt"));
}

#[test]
fn test_help_message() {
    let mut cmd = Command::cargo_bin("fileorg").unwrap();
    cmd.arg("--help")
        .assert()
        .success()
        .stdout(predicate::str::contains("organize"))
        .stdout(predicate::str::contains("list"))
        .stdout(predicate::str::contains("search"));
}
```

Thêm vào `Cargo.toml`:
```toml
[dev-dependencies]
assert_cmd = "2.0"
predicates = "3.0"
tempfile = "3.8"
```

Chạy tests:
```bash
cargo test
```

## 🐛 Lỗi Thường Gặp

### Lỗi 1: Path Not Found

```rust
// ❌ Không check existence
fs::rename(&source, &dest)?; // Panic nếu không tồn tại!

// ✅ Validate paths trước
if !source.exists() {
    anyhow::bail!("Source path does not exist: {}", source.display());
}
```

### Lỗi 2: Invalid Regex Pattern

```rust
// ❌ Không validate regex
let regex = Regex::new(&user_input).unwrap(); // Panic!

// ✅ Handle regex errors
let regex = Regex::new(&user_input)
    .context("Invalid regex pattern")?;
```

### Lỗi 3: Colored Output trong Pipe

```rust
// ❌ Colors trong non-TTY environment
println!("{}", "text".red()); // Broken in pipes

// ✅ Detect TTY
use atty::Stream;
if atty::is(Stream::Stdout) {
    println!("{}", "text".red());
} else {
    println!("text");
}
```

### Lỗi 4: Missing Subcommand

```rust
// ❌ Default behavior unclear
fileorg  // What happens?

// ✅ Show help by default hoặc require subcommand
#[command(arg_required_else_help = true)]
pub struct Cli { /* ... */ }
```

## 💪 Thử Thách Nâng Cao

### Thử Thách 1: Undo Function

Implement undo để revert organize operations:

```rust
pub struct UndoLog {
    operations: Vec<FileOperation>,
}

pub enum FileOperation {
    Move { from: PathBuf, to: PathBuf },
    Delete { path: PathBuf },
}
```

### Thử Thách 2: Watch Mode

Monitor directory và auto-organize new files:

```rust
use notify::{Watcher, RecursiveMode};

pub fn watch_directory(path: PathBuf) -> Result<()> {
    let (tx, rx) = channel();
    let mut watcher = watcher(tx, Duration::from_secs(1))?;
    watcher.watch(&path, RecursiveMode::Recursive)?;
    // Handle events...
}
```

### Thử Thách 3: Duplicate Detection

Find và handle duplicate files:

```rust
use std::collections::HashMap;
use sha2::{Sha256, Digest};

pub fn find_duplicates(path: &Path) -> HashMap<String, Vec<PathBuf>> {
    // Compute hash for each file
    // Group by hash
}
```

### Thử Thách 4: Plugin System

Allow users to write custom organization strategies:

```rust
pub trait OrganizationStrategy {
    fn organize(&self, file: &Path) -> Result<PathBuf>;
}
```

### Thử Thách 5: Interactive Mode

TUI với ratatui cho interactive file management.

## 📚 Kiến Thức Đã Học

✅ **Clap v4**: Modern argument parsing với derive macros
✅ **Subcommands**: Structured CLI với nhiều commands
✅ **Configuration**: TOML/JSON config file management
✅ **Colored Output**: Beautiful terminal output
✅ **Progress Bars**: Visual feedback cho long operations
✅ **Logging**: Structured logging với verbosity levels
✅ **Shell Completion**: Auto-generate completion scripts
✅ **Error Handling**: anyhow và thiserror cho robust errors

## 🎨 Shell Completion Setup

Generate completion scripts:

```bash
# Bash
fileorg completion bash > ~/.local/share/bash-completion/completions/fileorg

# Zsh
fileorg completion zsh > ~/.zfunc/_fileorg

# Fish
fileorg completion fish > ~/.config/fish/completions/fileorg.fish

# PowerShell
fileorg completion powershell | Out-File -Encoding UTF8 fileorg.ps1
```

## 🚀 Deployment

Build release:
```bash
cargo build --release
```

Install globally:
```bash
cargo install --path .
```

Package for distribution:
```bash
# Linux/Mac
tar -czf fileorg-linux-x64.tar.gz -C target/release fileorg

# Windows
Compress-Archive target/release/fileorg.exe fileorg-windows-x64.zip
```

## 📝 Documentation

Generate documentation:
```bash
cargo doc --no-deps --open
```

Create man pages:
```bash
help2man -N target/release/fileorg > fileorg.1
```

## ⚡ Performance Tips

1. **Parallel Processing**: Dùng rayon cho parallel file operations
2. **Buffered I/O**: Buffer reads/writes cho better performance
3. **Lazy Evaluation**: Compute chỉ khi cần thiết
4. **Memory Mapping**: Dùng mmap cho large files

## 🎯 Bước Tiếp Theo

➡️ **Quay lại**: [Real-time Chat Application](chat-app.md)
➡️ **Hoặc**: [REST API với Actix-Web](rest-api.md)
➡️ **Hoặc**: [Multi-threaded Web Server](web-server.md)

---

🎉 **Tuyệt vời! Bạn đã xây dựng một professional CLI tool!** 🛠️
