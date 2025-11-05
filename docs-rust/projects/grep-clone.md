---
sidebar_position: 8
title: 🔍 Mini Grep Tool
description: Xây dựng công cụ tìm kiếm text đơn giản như grep với Rust - CLI args, file reading, pattern matching
keywords: [rust, project, grep, search, cli, pattern matching, intermediate, tìm kiếm]
---

# 🔍 Mini Grep Tool

## 🎯 Mục Tiêu Dự Án

Xây dựng một **công cụ tìm kiếm text** đơn giản tương tự `grep` với các tính năng:
- 🔎 Tìm kiếm pattern trong file
- 📁 Hỗ trợ nhiều file cùng lúc
- 🔤 Case-sensitive và case-insensitive
- 📊 Hiển thị số dòng (line numbers)
- 🎨 Output có màu sắc (colored output)
- 📈 Đếm số kết quả

### Bạn Sẽ Học Được
- ✅ Parse **command-line arguments** với `std::env`
- ✅ **File reading** và xử lý line-by-line
- ✅ **String searching** và pattern matching
- ✅ **Error handling** với Result
- ✅ Multiple file processing
- ✅ ANSI color codes cho terminal

## 📦 Bước 1: Tạo Project

```bash
cargo new mini_grep
cd mini_grep
```

## 🎮 Bước 2: Version 1 - Basic Grep

Mở `src/main.rs`:

```rust
use std::env;
use std::fs;
use std::process;

fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new();

    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }

    results
}

fn run(query: &str, filename: &str) -> Result<(), String> {
    let contents = fs::read_to_string(filename)
        .map_err(|e| format!("Không đọc được file '{}': {}", filename, e))?;

    let results = search(query, &contents);

    if results.is_empty() {
        println!("❌ Không tìm thấy '{}' trong {}", query, filename);
    } else {
        println!("✅ Tìm thấy {} kết quả trong {}:", results.len(), filename);
        for line in results {
            println!("{}", line);
        }
    }

    Ok(())
}

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        eprintln!("❌ Cách dùng: {} <pattern> <file>", args[0]);
        eprintln!("💡 Ví dụ: {} \"hello\" test.txt", args[0]);
        process::exit(1);
    }

    let query = &args[1];
    let filename = &args[2];

    if let Err(e) = run(query, filename) {
        eprintln!("❌ Lỗi: {}", e);
        process::exit(1);
    }
}
```

## 🚀 Chạy Thử

Tạo file test:
```bash
echo "Hello World
Rust is awesome
hello rust
HELLO EVERYONE" > test.txt
```

Chạy:
```bash
cargo run hello test.txt
```

**Output:**
```
✅ Tìm thấy 2 kết quả trong test.txt:
Hello World
hello rust
```

## 📖 Giải Thích Code

### 1. Command-line Arguments

```rust
let args: Vec<String> = env::args().collect();
```

- `env::args()`: Iterator qua tất cả arguments
- `args[0]`: Tên chương trình
- `args[1]`: Argument đầu tiên (pattern)
- `args[2]`: Argument thứ hai (filename)

### 2. Search Function

```rust
fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new();
    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }
    results
}
```

- `<'a>`: Lifetime annotation - results sống cùng contents
- `contains()`: Kiểm tra substring

### 3. Error Handling

```rust
let contents = fs::read_to_string(filename)
    .map_err(|e| format!("Không đọc được: {}", e))?;
```

- `map_err()`: Chuyển error type
- `?`: Propagate error lên caller

## 🎨 Bước 3: Version 2 - Case-insensitive và Line Numbers

```rust
use std::env;
use std::fs;
use std::process;

struct Config {
    query: String,
    filename: String,
    case_sensitive: bool,
    show_line_numbers: bool,
}

impl Config {
    fn new(args: &[String]) -> Result<Config, String> {
        if args.len() < 3 {
            return Err("Thiếu arguments!".to_string());
        }

        let mut case_sensitive = true;
        let mut show_line_numbers = false;
        let mut query = String::new();
        let mut filename = String::new();

        let mut i = 1;
        while i < args.len() {
            match args[i].as_str() {
                "-i" | "--ignore-case" => case_sensitive = false,
                "-n" | "--line-number" => show_line_numbers = true,
                _ => {
                    if query.is_empty() {
                        query = args[i].clone();
                    } else if filename.is_empty() {
                        filename = args[i].clone();
                    }
                }
            }
            i += 1;
        }

        if query.is_empty() || filename.is_empty() {
            return Err("Thiếu pattern hoặc filename!".to_string());
        }

        Ok(Config {
            query,
            filename,
            case_sensitive,
            show_line_numbers,
        })
    }
}

fn search<'a>(query: &str, contents: &'a str, case_sensitive: bool) -> Vec<(usize, &'a str)> {
    let mut results = Vec::new();
    let query_lower = query.to_lowercase();

    for (line_num, line) in contents.lines().enumerate() {
        let matches = if case_sensitive {
            line.contains(query)
        } else {
            line.to_lowercase().contains(&query_lower)
        };

        if matches {
            results.push((line_num + 1, line));
        }
    }

    results
}

fn run(config: Config) -> Result<(), String> {
    let contents = fs::read_to_string(&config.filename)
        .map_err(|e| format!("Không đọc được file '{}': {}", config.filename, e))?;

    let results = search(&config.query, &contents, config.case_sensitive);

    if results.is_empty() {
        println!("❌ Không tìm thấy '{}' trong {}", config.query, config.filename);
    } else {
        println!("✅ Tìm thấy {} kết quả trong {}:", results.len(), config.filename);
        for (line_num, line) in results {
            if config.show_line_numbers {
                println!("{}: {}", line_num, line);
            } else {
                println!("{}", line);
            }
        }
    }

    Ok(())
}

fn print_help(program: &str) {
    println!("🔍 Mini Grep - Tìm kiếm text trong file");
    println!("\n📖 Cách dùng:");
    println!("  {} [OPTIONS] <pattern> <file>", program);
    println!("\n⚙️  Options:");
    println!("  -i, --ignore-case    Không phân biệt hoa/thường");
    println!("  -n, --line-number    Hiển thị số dòng");
    println!("  -h, --help           Hiển thị trợ giúp");
    println!("\n💡 Ví dụ:");
    println!("  {} hello test.txt", program);
    println!("  {} -i HELLO test.txt", program);
    println!("  {} -n -i rust test.txt", program);
}

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 || args.contains(&"--help".to_string()) || args.contains(&"-h".to_string()) {
        print_help(&args[0]);
        process::exit(0);
    }

    let config = match Config::new(&args) {
        Ok(c) => c,
        Err(e) => {
            eprintln!("❌ Lỗi: {}", e);
            eprintln!("💡 Dùng --help để xem hướng dẫn");
            process::exit(1);
        }
    };

    if let Err(e) = run(config) {
        eprintln!("❌ Lỗi: {}", e);
        process::exit(1);
    }
}
```

**Chạy thử:**
```bash
# Case-sensitive (mặc định)
cargo run hello test.txt

# Case-insensitive
cargo run -i hello test.txt

# Với line numbers
cargo run -n hello test.txt

# Kết hợp
cargo run -i -n hello test.txt
```

## 🎨 Bước 4: Version 3 - Multiple Files và Colored Output

Thêm vào `Cargo.toml`:
```toml
[dependencies]
colored = "2.1"
```

Code:

```rust
use colored::*;
use std::env;
use std::fs;
use std::process;

struct Config {
    query: String,
    filenames: Vec<String>,
    case_sensitive: bool,
    show_line_numbers: bool,
    count_only: bool,
}

impl Config {
    fn new(args: &[String]) -> Result<Config, String> {
        if args.len() < 3 {
            return Err("Thiếu arguments!".to_string());
        }

        let mut case_sensitive = true;
        let mut show_line_numbers = false;
        let mut count_only = false;
        let mut query = String::new();
        let mut filenames = Vec::new();

        let mut i = 1;
        while i < args.len() {
            match args[i].as_str() {
                "-i" | "--ignore-case" => case_sensitive = false,
                "-n" | "--line-number" => show_line_numbers = true,
                "-c" | "--count" => count_only = true,
                _ => {
                    if query.is_empty() {
                        query = args[i].clone();
                    } else {
                        filenames.push(args[i].clone());
                    }
                }
            }
            i += 1;
        }

        if query.is_empty() || filenames.is_empty() {
            return Err("Thiếu pattern hoặc filename!".to_string());
        }

        Ok(Config {
            query,
            filenames,
            case_sensitive,
            show_line_numbers,
            count_only,
        })
    }
}

fn search<'a>(query: &str, contents: &'a str, case_sensitive: bool) -> Vec<(usize, &'a str)> {
    let mut results = Vec::new();
    let query_lower = query.to_lowercase();

    for (line_num, line) in contents.lines().enumerate() {
        let matches = if case_sensitive {
            line.contains(query)
        } else {
            line.to_lowercase().contains(&query_lower)
        };

        if matches {
            results.push((line_num + 1, line));
        }
    }

    results
}

fn highlight_match(line: &str, query: &str, case_sensitive: bool) -> String {
    if case_sensitive {
        line.replace(query, &query.red().bold().to_string())
    } else {
        let query_lower = query.to_lowercase();
        let line_lower = line.to_lowercase();

        let mut result = String::new();
        let mut last_end = 0;

        for (i, _) in line_lower.match_indices(&query_lower) {
            result.push_str(&line[last_end..i]);
            result.push_str(&line[i..i + query.len()].red().bold().to_string());
            last_end = i + query.len();
        }
        result.push_str(&line[last_end..]);
        result
    }
}

fn search_file(filename: &str, config: &Config) -> Result<(), String> {
    let contents = fs::read_to_string(filename)
        .map_err(|e| format!("Không đọc được file '{}': {}", filename, e))?;

    let results = search(&config.query, &contents, config.case_sensitive);

    if config.count_only {
        if results.is_empty() {
            println!("{}: {}", filename, "0".yellow());
        } else {
            println!("{}: {}", filename, results.len().to_string().green().bold());
        }
    } else if results.is_empty() {
        println!("\n{}", format!("📁 {}: Không tìm thấy", filename).yellow());
    } else {
        println!("\n{}", format!("📁 {}: {} kết quả", filename, results.len()).green().bold());

        for (line_num, line) in results {
            let highlighted = highlight_match(line, &config.query, config.case_sensitive);

            if config.show_line_numbers {
                println!("  {}: {}", line_num.to_string().blue(), highlighted);
            } else {
                println!("  {}", highlighted);
            }
        }
    }

    Ok(())
}

fn run(config: Config) -> Result<(), String> {
    let mut total_matches = 0;
    let mut errors = Vec::new();

    for filename in &config.filenames {
        match search_file(filename, &config) {
            Ok(_) => {},
            Err(e) => errors.push(e),
        }
    }

    if !errors.is_empty() {
        println!("\n{}", "⚠️  Lỗi:".yellow());
        for error in errors {
            println!("  {}", error.red());
        }
    }

    Ok(())
}

fn print_help(program: &str) {
    println!("{}", "🔍 Mini Grep - Tìm kiếm text trong file".bold());
    println!("\n📖 Cách dùng:");
    println!("  {} [OPTIONS] <pattern> <file...>", program);
    println!("\n⚙️  Options:");
    println!("  -i, --ignore-case    Không phân biệt hoa/thường");
    println!("  -n, --line-number    Hiển thị số dòng");
    println!("  -c, --count          Chỉ đếm số kết quả");
    println!("  -h, --help           Hiển thị trợ giúp");
    println!("\n💡 Ví dụ:");
    println!("  {} hello test.txt", program);
    println!("  {} -i HELLO test.txt", program);
    println!("  {} -n rust *.rs", program);
    println!("  {} -c -i error log1.txt log2.txt", program);
}

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 || args.contains(&"--help".to_string()) || args.contains(&"-h".to_string()) {
        print_help(&args[0]);
        process::exit(0);
    }

    let config = match Config::new(&args) {
        Ok(c) => c,
        Err(e) => {
            eprintln!("{} {}", "❌ Lỗi:".red().bold(), e);
            eprintln!("💡 Dùng --help để xem hướng dẫn");
            process::exit(1);
        }
    };

    if let Err(e) = run(config) {
        eprintln!("{} {}", "❌ Lỗi:".red().bold(), e);
        process::exit(1);
    }
}
```

**Chạy thử:**
```bash
# Tìm trong nhiều file
cargo run rust file1.txt file2.txt file3.txt

# Đếm số kết quả
cargo run -c error *.log

# Tất cả options
cargo run -i -n -c hello *.txt
```

## 🎨 Bước 5: Version 4 - Regex Support

Thêm vào `Cargo.toml`:
```toml
[dependencies]
colored = "2.1"
regex = "1.10"
```

Code với regex:

```rust
use colored::*;
use regex::Regex;
use std::env;
use std::fs;
use std::process;

struct Config {
    pattern: String,
    filenames: Vec<String>,
    case_sensitive: bool,
    show_line_numbers: bool,
    count_only: bool,
    use_regex: bool,
}

impl Config {
    fn new(args: &[String]) -> Result<Config, String> {
        if args.len() < 3 {
            return Err("Thiếu arguments!".to_string());
        }

        let mut case_sensitive = true;
        let mut show_line_numbers = false;
        let mut count_only = false;
        let mut use_regex = false;
        let mut pattern = String::new();
        let mut filenames = Vec::new();

        let mut i = 1;
        while i < args.len() {
            match args[i].as_str() {
                "-i" | "--ignore-case" => case_sensitive = false,
                "-n" | "--line-number" => show_line_numbers = true,
                "-c" | "--count" => count_only = true,
                "-e" | "--regex" => use_regex = true,
                _ => {
                    if pattern.is_empty() {
                        pattern = args[i].clone();
                    } else {
                        filenames.push(args[i].clone());
                    }
                }
            }
            i += 1;
        }

        if pattern.is_empty() || filenames.is_empty() {
            return Err("Thiếu pattern hoặc filename!".to_string());
        }

        Ok(Config {
            pattern,
            filenames,
            case_sensitive,
            show_line_numbers,
            count_only,
            use_regex,
        })
    }
}

fn search_regex<'a>(pattern: &str, contents: &'a str, case_sensitive: bool) -> Result<Vec<(usize, &'a str)>, String> {
    let regex_pattern = if case_sensitive {
        pattern.to_string()
    } else {
        format!("(?i){}", pattern)
    };

    let re = Regex::new(&regex_pattern)
        .map_err(|e| format!("Regex không hợp lệ: {}", e))?;

    let mut results = Vec::new();

    for (line_num, line) in contents.lines().enumerate() {
        if re.is_match(line) {
            results.push((line_num + 1, line));
        }
    }

    Ok(results)
}

fn search<'a>(query: &str, contents: &'a str, case_sensitive: bool) -> Vec<(usize, &'a str)> {
    let mut results = Vec::new();
    let query_lower = query.to_lowercase();

    for (line_num, line) in contents.lines().enumerate() {
        let matches = if case_sensitive {
            line.contains(query)
        } else {
            line.to_lowercase().contains(&query_lower)
        };

        if matches {
            results.push((line_num + 1, line));
        }
    }

    results
}

fn highlight_match(line: &str, pattern: &str, case_sensitive: bool, use_regex: bool) -> String {
    if use_regex {
        let regex_pattern = if case_sensitive {
            pattern.to_string()
        } else {
            format!("(?i){}", pattern)
        };

        if let Ok(re) = Regex::new(&regex_pattern) {
            return re.replace_all(line, |caps: &regex::Captures| {
                caps[0].red().bold().to_string()
            }).to_string();
        }
    }

    if case_sensitive {
        line.replace(pattern, &pattern.red().bold().to_string())
    } else {
        let pattern_lower = pattern.to_lowercase();
        let line_lower = line.to_lowercase();

        let mut result = String::new();
        let mut last_end = 0;

        for (i, _) in line_lower.match_indices(&pattern_lower) {
            result.push_str(&line[last_end..i]);
            result.push_str(&line[i..i + pattern.len()].red().bold().to_string());
            last_end = i + pattern.len();
        }
        result.push_str(&line[last_end..]);
        result
    }
}

fn search_file(filename: &str, config: &Config) -> Result<(), String> {
    let contents = fs::read_to_string(filename)
        .map_err(|e| format!("Không đọc được file '{}': {}", filename, e))?;

    let results = if config.use_regex {
        search_regex(&config.pattern, &contents, config.case_sensitive)?
    } else {
        search(&config.pattern, &contents, config.case_sensitive)
    };

    if config.count_only {
        if results.is_empty() {
            println!("{}: {}", filename, "0".yellow());
        } else {
            println!("{}: {}", filename, results.len().to_string().green().bold());
        }
    } else if results.is_empty() {
        println!("\n{}", format!("📁 {}: Không tìm thấy", filename).yellow());
    } else {
        println!("\n{}", format!("📁 {}: {} kết quả", filename, results.len()).green().bold());

        for (line_num, line) in results {
            let highlighted = highlight_match(line, &config.pattern, config.case_sensitive, config.use_regex);

            if config.show_line_numbers {
                println!("  {}: {}", line_num.to_string().blue(), highlighted);
            } else {
                println!("  {}", highlighted);
            }
        }
    }

    Ok(())
}

fn run(config: Config) -> Result<(), String> {
    let mut errors = Vec::new();

    for filename in &config.filenames {
        match search_file(filename, &config) {
            Ok(_) => {},
            Err(e) => errors.push(e),
        }
    }

    if !errors.is_empty() {
        println!("\n{}", "⚠️  Lỗi:".yellow());
        for error in errors {
            println!("  {}", error.red());
        }
    }

    Ok(())
}

fn print_help(program: &str) {
    println!("{}", "🔍 Mini Grep - Tìm kiếm text trong file".bold());
    println!("\n📖 Cách dùng:");
    println!("  {} [OPTIONS] <pattern> <file...>", program);
    println!("\n⚙️  Options:");
    println!("  -i, --ignore-case    Không phân biệt hoa/thường");
    println!("  -n, --line-number    Hiển thị số dòng");
    println!("  -c, --count          Chỉ đếm số kết quả");
    println!("  -e, --regex          Dùng regular expression");
    println!("  -h, --help           Hiển thị trợ giúp");
    println!("\n💡 Ví dụ:");
    println!("  {} hello test.txt", program);
    println!("  {} -i HELLO test.txt", program);
    println!("  {} -n rust *.rs", program);
    println!("  {} -e \"fn \\w+\" main.rs", program);
    println!("  {} -i -e \"error|warning\" *.log", program);
}

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 || args.contains(&"--help".to_string()) || args.contains(&"-h".to_string()) {
        print_help(&args[0]);
        process::exit(0);
    }

    let config = match Config::new(&args) {
        Ok(c) => c,
        Err(e) => {
            eprintln!("{} {}", "❌ Lỗi:".red().bold(), e);
            eprintln!("💡 Dùng --help để xem hướng dẫn");
            process::exit(1);
        }
    };

    if let Err(e) = run(config) {
        eprintln!("{} {}", "❌ Lỗi:".red().bold(), e);
        process::exit(1);
    }
}
```

## 🐛 Lỗi Thường Gặp

### Lỗi 1: Không Kiểm Tra Args Length

```rust
// ❌ SAI: Panic nếu thiếu args
let query = &args[1];  // Panic nếu args.len() < 2!

// ✅ ĐÚNG: Kiểm tra trước
if args.len() < 3 {
    eprintln!("Thiếu arguments!");
    process::exit(1);
}
```

### Lỗi 2: Lifetime Issues

```rust
// ❌ SAI: Lifetime không khớp
fn search(query: &str, contents: &str) -> Vec<&str> {
    // results chứa references đến contents
}

// ✅ ĐÚNG: Explicit lifetime
fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    // OK!
}
```

### Lỗi 3: Regex Escape

```rust
// ❌ SAI: Regex characters không escape
let pattern = "test.txt";  // . match bất kỳ char!

// ✅ ĐÚNG: Escape hoặc dùng literal
let pattern = regex::escape("test.txt");
```

### Lỗi 4: Case-insensitive So Sánh

```rust
// ❌ SAI: to_lowercase() mỗi lần
for line in lines {
    if line.to_lowercase().contains(&query.to_lowercase()) {
        // Inefficient!
    }
}

// ✅ ĐÚNG: Lowercase query một lần
let query_lower = query.to_lowercase();
for line in lines {
    if line.to_lowercase().contains(&query_lower) {
        // Tốt hơn!
    }
}
```

## 💪 Thử Thách Nâng Cao

### Thử Thách 1: Context Lines

Hiển thị n dòng trước/sau kết quả (giống `grep -A`, `-B`, `-C`)

<details>
<summary>💡 Gợi ý</summary>

```rust
struct Match {
    line_num: usize,
    before: Vec<String>,
    matched: String,
    after: Vec<String>,
}
```
</details>

### Thử Thách 2: Recursive Directory Search

Tìm kiếm trong tất cả file trong thư mục (giống `grep -r`)

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::fs;

fn search_directory(dir: &str, config: &Config) -> Result<(), String> {
    for entry in fs::read_dir(dir)? {
        let entry = entry?;
        let path = entry.path();

        if path.is_file() {
            search_file(path.to_str().unwrap(), config)?;
        } else if path.is_dir() {
            search_directory(path.to_str().unwrap(), config)?;
        }
    }
    Ok(())
}
```
</details>

### Thử Thách 3: Binary File Detection

Bỏ qua binary files (file không phải text)

<details>
<summary>💡 Gợi ý</summary>

```rust
fn is_binary_file(contents: &[u8]) -> bool {
    // Kiểm tra null bytes
    contents.iter().any(|&b| b == 0)
}
```
</details>

### Thử Thách 4: Performance - Memory Mapping

Dùng memory-mapped files cho file lớn

<details>
<summary>💡 Gợi ý</summary>

Dùng crate `memmap2`:
```rust
use memmap2::Mmap;

let file = File::open(path)?;
let mmap = unsafe { Mmap::map(&file)? };
let contents = std::str::from_utf8(&mmap)?;
```
</details>

### Thử Thách 5: Inverted Match

Option `-v` để hiển thị lines KHÔNG match pattern

## 📚 Kiến Thức Đã Học

✅ **Command-line Args**: `std::env::args()` và parsing
✅ **File I/O**: Đọc file với `fs::read_to_string()`
✅ **String Searching**: `contains()`, pattern matching
✅ **Regex**: Regular expressions với `regex` crate
✅ **Error Handling**: Result type và `?` operator
✅ **Iterators**: `lines()`, `enumerate()`, `match_indices()`
✅ **Lifetimes**: Hiểu và sử dụng lifetime annotations
✅ **ANSI Colors**: Terminal output với màu sắc
✅ **Process Exit**: `process::exit()` với exit codes

## 🧪 Testing

Tạo tests:

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_case_sensitive() {
        let query = "rust";
        let contents = "Rust:\nsafe, fast, rust.";

        let results = search(query, contents, true);
        assert_eq!(results.len(), 1);
        assert!(results[0].1.contains("rust."));
    }

    #[test]
    fn test_case_insensitive() {
        let query = "RUST";
        let contents = "Rust:\nsafe, fast, rust.";

        let results = search(query, contents, false);
        assert_eq!(results.len(), 2);
    }

    #[test]
    fn test_regex_search() {
        let pattern = r"fn \w+";
        let contents = "fn main() {\n    fn test() {}\n}";

        let results = search_regex(pattern, contents, true).unwrap();
        assert_eq!(results.len(), 2);
    }
}
```

## 🎯 Bước Tiếp Theo

➡️ **Quay lại**: [Markdown Parser](markdown-parser.md)
➡️ **Hoặc**: [Password Generator](password-generator.md)
➡️ **Hoặc**: [Todo CLI](todo-cli.md)
➡️ **Tiếp tục**: Khám phá các dự án Rust nâng cao hơn!

---

🎉 **Tuyệt vời! Bạn đã xây dựng Mini Grep Tool!** 🔍
