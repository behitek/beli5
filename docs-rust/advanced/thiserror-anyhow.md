---
sidebar_position: 11
title: "thiserror & anyhow: Thư Viện Xử Lý Lỗi"
description: "Tìm hiểu cách sử dụng thiserror và anyhow để xử lý lỗi dễ dàng hơn"
---

# 📦 thiserror & anyhow: Thư Viện Xử Lý Lỗi

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu sự khác biệt giữa `thiserror` và `anyhow`
- ✅ Sử dụng `thiserror` cho library code
- ✅ Sử dụng `anyhow` cho application code
- ✅ Kết hợp nhiều error types
- ✅ Áp dụng best practices
- ✅ Chọn đúng tool cho từng trường hợp

## 🤔 thiserror vs anyhow

### Ẩn Dụ Cuộc Sống: Công Cụ Cho Mục Đích Khác Nhau

**thiserror** và **anyhow** như **hai loại công cụ**:

🔧 **thiserror** - Công Cụ Chuyên Dụng:
- Cho **library authors**
- Tạo error types cụ thể
- Rõ ràng, type-safe
- Người khác có thể match errors

🛠️ **anyhow** - Công Cụ Đa Năng:
- Cho **application code**
- Xử lý mọi loại lỗi
- Nhanh, tiện lợi
- Không cần define từng error type

### So Sánh

| Đặc điểm | thiserror | anyhow |
|----------|-----------|--------|
| **Dùng cho** | Libraries | Applications |
| **Error types** | Specific | Generic |
| **Boilerplate** | Ít (derive macro) | Rất ít |
| **Type safety** | Cao | Trung bình |
| **Match errors** | Có | Không (dùng downcast) |
| **Context** | Manual | `.context()` helper |

## 🔧 thiserror - Cho Libraries

### Cài Đặt

```toml
# Cargo.toml
[dependencies]
thiserror = "1.0"
```

### Ví Dụ Cơ Bản

```rust
use thiserror::Error;

#[derive(Error, Debug)]
enum DataStoreError {
    #[error("Data not found: {0}")]
    NotFound(String),

    #[error("Invalid data format")]
    InvalidFormat,

    #[error("Connection failed: {reason}")]
    ConnectionFailed { reason: String },

    #[error("IO error")]
    Io(#[from] std::io::Error),
}

fn find_data(id: &str) -> Result<String, DataStoreError> {
    if id == "404" {
        return Err(DataStoreError::NotFound(id.to_string()));
    }

    if id == "bad" {
        return Err(DataStoreError::InvalidFormat);
    }

    Ok(format!("Data for {}", id))
}

fn main() {
    match find_data("404") {
        Ok(data) => println!("Found: {}", data),
        Err(DataStoreError::NotFound(id)) => {
            println!("Data '{}' not found", id);
        }
        Err(e) => println!("Error: {}", e),
    }
}
```

**Đầu ra**:
```
Data '404' not found
```

### Attributes Của thiserror

#### `#[error("...")]` - Error Message

```rust
use thiserror::Error;

#[derive(Error, Debug)]
enum MyError {
    #[error("Value {0} is too large")]
    TooLarge(i32),

    #[error("Invalid input: {input}, expected: {expected}")]
    InvalidInput { input: String, expected: String },

    #[error("Failed with code {code}: {message}")]
    Failed { code: i32, message: String },
}
```

#### `#[from]` - Automatic Conversion

```rust
use thiserror::Error;
use std::io;
use std::num::ParseIntError;

#[derive(Error, Debug)]
enum AppError {
    #[error("IO error: {0}")]
    Io(#[from] io::Error),

    #[error("Parse error: {0}")]
    Parse(#[from] ParseIntError),

    #[error("Custom error: {0}")]
    Custom(String),
}

fn read_number_from_file(path: &str) -> Result<i32, AppError> {
    let contents = std::fs::read_to_string(path)?;  // Auto-convert io::Error
    let number = contents.trim().parse()?;          // Auto-convert ParseIntError
    Ok(number)
}
```

#### `#[source]` - Error Source

```rust
use thiserror::Error;

#[derive(Error, Debug)]
enum HighLevelError {
    #[error("Operation failed")]
    OperationFailed {
        #[source]
        source: LowLevelError,
    },
}

#[derive(Error, Debug)]
#[error("Low level error: {msg}")]
struct LowLevelError {
    msg: String,
}
```

### Ví Dụ Thực Tế: Config Parser

```rust
use thiserror::Error;
use std::fs;
use std::path::PathBuf;

#[derive(Error, Debug)]
enum ConfigError {
    #[error("Config file not found: {path}")]
    FileNotFound { path: PathBuf },

    #[error("Failed to read config file")]
    ReadError(#[from] std::io::Error),

    #[error("Invalid config format: {0}")]
    ParseError(String),

    #[error("Missing required field: {0}")]
    MissingField(String),

    #[error("Invalid value for {field}: {value}")]
    InvalidValue { field: String, value: String },
}

struct Config {
    host: String,
    port: u16,
}

fn parse_config(path: &str) -> Result<Config, ConfigError> {
    let path_buf = PathBuf::from(path);

    if !path_buf.exists() {
        return Err(ConfigError::FileNotFound { path: path_buf });
    }

    let contents = fs::read_to_string(&path_buf)?;

    // Simplified parsing
    let mut host = None;
    let mut port = None;

    for line in contents.lines() {
        let parts: Vec<&str> = line.split('=').collect();
        if parts.len() != 2 {
            continue;
        }

        match parts[0].trim() {
            "host" => host = Some(parts[1].trim().to_string()),
            "port" => {
                port = parts[1].trim().parse().ok();
            }
            _ => {}
        }
    }

    let host = host.ok_or_else(|| ConfigError::MissingField("host".to_string()))?;
    let port = port.ok_or_else(|| ConfigError::MissingField("port".to_string()))?;

    Ok(Config { host, port })
}

fn main() {
    match parse_config("config.txt") {
        Ok(config) => {
            println!("Config loaded: {}:{}", config.host, config.port);
        }
        Err(ConfigError::FileNotFound { path }) => {
            println!("Config file not found: {:?}", path);
        }
        Err(ConfigError::MissingField(field)) => {
            println!("Missing field: {}", field);
        }
        Err(e) => {
            println!("Error: {}", e);
        }
    }
}
```

## 🛠️ anyhow - Cho Applications

### Cài Đặt

```toml
# Cargo.toml
[dependencies]
anyhow = "1.0"
```

### Ví Dụ Cơ Bản

```rust
use anyhow::{Result, Context};
use std::fs;

fn read_config(path: &str) -> Result<String> {
    let contents = fs::read_to_string(path)
        .context("Failed to read config file")?;
    Ok(contents)
}

fn parse_port(contents: &str) -> Result<u16> {
    let port: u16 = contents
        .trim()
        .parse()
        .context("Failed to parse port number")?;
    Ok(port)
}

fn main() -> Result<()> {
    let contents = read_config("port.txt")?;
    let port = parse_port(&contents)?;
    println!("Port: {}", port);
    Ok(())
}
```

### `Context` Trait

```rust
use anyhow::{Context, Result};
use std::fs;

fn process_file(path: &str) -> Result<String> {
    let contents = fs::read_to_string(path)
        .with_context(|| format!("Failed to read file: {}", path))?;

    let processed = contents
        .parse::<i32>()
        .context("Not a valid number")?
        .to_string();

    Ok(processed)
}
```

### `anyhow!` Macro

```rust
use anyhow::{anyhow, Result};

fn validate_age(age: i32) -> Result<()> {
    if age < 0 {
        return Err(anyhow!("Age cannot be negative: {}", age));
    }

    if age > 150 {
        return Err(anyhow!("Age {} seems unrealistic", age));
    }

    Ok(())
}

fn main() -> Result<()> {
    validate_age(-5)?;
    Ok(())
}
```

### `bail!` Macro

```rust
use anyhow::{bail, Result};

fn divide(a: i32, b: i32) -> Result<i32> {
    if b == 0 {
        bail!("Cannot divide by zero");
    }
    Ok(a / b)
}
```

### Ví Dụ Thực Tế: File Processor

```rust
use anyhow::{Context, Result};
use std::fs;
use std::path::Path;

fn process_directory(dir: &str) -> Result<Vec<String>> {
    let path = Path::new(dir);

    if !path.exists() {
        anyhow::bail!("Directory does not exist: {}", dir);
    }

    let entries = fs::read_dir(path)
        .with_context(|| format!("Failed to read directory: {}", dir))?;

    let mut results = Vec::new();

    for entry in entries {
        let entry = entry.context("Failed to read directory entry")?;
        let path = entry.path();

        if path.is_file() {
            let contents = fs::read_to_string(&path)
                .with_context(|| format!("Failed to read file: {:?}", path))?;

            let line_count = contents.lines().count();
            results.push(format!("{:?}: {} lines", path, line_count));
        }
    }

    Ok(results)
}

fn main() -> Result<()> {
    match process_directory("./test_dir") {
        Ok(results) => {
            for result in results {
                println!("{}", result);
            }
        }
        Err(e) => {
            eprintln!("Error: {:?}", e);
        }
    }

    Ok(())
}
```

## 🔗 Kết Hợp thiserror và anyhow

### Library Với thiserror

```rust
// my_library/src/lib.rs
use thiserror::Error;

#[derive(Error, Debug)]
pub enum DatabaseError {
    #[error("Connection failed: {0}")]
    ConnectionFailed(String),

    #[error("Query failed: {0}")]
    QueryFailed(String),

    #[error("Record not found: {0}")]
    NotFound(String),
}

pub fn query_user(id: u32) -> Result<String, DatabaseError> {
    if id == 0 {
        return Err(DatabaseError::NotFound(format!("User {}", id)));
    }

    if id == 999 {
        return Err(DatabaseError::ConnectionFailed(
            "Database unreachable".to_string()
        ));
    }

    Ok(format!("User data for {}", id))
}
```

### Application Với anyhow

```rust
// main.rs
use anyhow::{Context, Result};

fn fetch_and_process(id: u32) -> Result<()> {
    let user_data = my_library::query_user(id)
        .with_context(|| format!("Failed to fetch user {}", id))?;

    println!("Processing: {}", user_data);

    Ok(())
}

fn main() -> Result<()> {
    fetch_and_process(1)?;
    fetch_and_process(0)?;  // Error

    Ok(())
}
```

**Output**:
```
Processing: User data for 1
Error: Failed to fetch user 0

Caused by:
    Record not found: User 0
```

## 🎯 Best Practices

### 1. Chọn Đúng Tool

```rust
// ✅ Library - dùng thiserror
use thiserror::Error;

#[derive(Error, Debug)]
pub enum LibraryError {
    #[error("Something went wrong")]
    SomeError,
}

// ✅ Application - dùng anyhow
use anyhow::Result;

fn main() -> Result<()> {
    // ...
    Ok(())
}
```

### 2. Thêm Context

```rust
use anyhow::{Context, Result};

fn read_file(path: &str) -> Result<String> {
    std::fs::read_to_string(path)
        .with_context(|| format!("Failed to read '{}'", path))?
        .trim()
        .parse()
        .context("File content is not valid")?
}
```

### 3. Downcast Errors (anyhow)

```rust
use anyhow::Result;

fn handle_error() -> Result<()> {
    let result: Result<(), MyError> = Err(MyError::Custom);

    match result {
        Ok(()) => {}
        Err(e) => {
            // Downcast to specific error
            if let Some(my_err) = e.downcast_ref::<MyError>() {
                println!("Specific error: {:?}", my_err);
            }
        }
    }

    Ok(())
}
```

### 4. Error Chain

```rust
use anyhow::{Context, Result};

fn inner() -> Result<()> {
    anyhow::bail!("Inner error");
}

fn middle() -> Result<()> {
    inner().context("Middle layer failed")?;
    Ok(())
}

fn outer() -> Result<()> {
    middle().context("Outer layer failed")?;
    Ok(())
}

fn main() {
    if let Err(e) = outer() {
        eprintln!("Error: {:?}", e);
        // Shows full error chain
    }
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: thiserror - User Manager

```rust
use thiserror::Error;

#[derive(Error, Debug)]
enum UserError {
    // TODO: Define error variants
    // - NotFound
    // - InvalidEmail
    // - PermissionDenied
}

fn find_user(id: u32) -> Result<String, UserError> {
    // TODO
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use thiserror::Error;

#[derive(Error, Debug)]
enum UserError {
    #[error("User not found: {0}")]
    NotFound(u32),

    #[error("Invalid email: {0}")]
    InvalidEmail(String),

    #[error("Permission denied for user {0}")]
    PermissionDenied(u32),
}

fn find_user(id: u32) -> Result<String, UserError> {
    if id == 0 {
        return Err(UserError::NotFound(id));
    }
    Ok(format!("User {}", id))
}
```
</details>

### Bài 2: anyhow - Config Loader

```rust
use anyhow::{Context, Result};

fn load_config(path: &str) -> Result<Config> {
    // TODO: Use .context() to add helpful error messages
}

fn main() -> Result<()> {
    let config = load_config("config.toml")?;
    Ok(())
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use anyhow::{Context, Result};
use std::fs;

struct Config {
    host: String,
    port: u16,
}

fn load_config(path: &str) -> Result<Config> {
    let contents = fs::read_to_string(path)
        .with_context(|| format!("Failed to read config file: {}", path))?;

    // Simple parsing
    let mut lines = contents.lines();

    let host = lines
        .next()
        .context("Missing host line")?
        .trim()
        .to_string();

    let port: u16 = lines
        .next()
        .context("Missing port line")?
        .trim()
        .parse()
        .context("Invalid port number")?;

    Ok(Config { host, port })
}

fn main() -> Result<()> {
    let config = load_config("config.txt")?;
    println!("Config: {}:{}", config.host, config.port);
    Ok(())
}
```
</details>

### Bài 3: Kết Hợp Cả Hai

Tạo một library với thiserror, và application với anyhow sử dụng library đó.

<details>
<summary>💡 Gợi ý</summary>

```rust
// Library code
use thiserror::Error;

#[derive(Error, Debug)]
pub enum MathError {
    #[error("Division by zero")]
    DivisionByZero,

    #[error("Overflow")]
    Overflow,
}

pub fn safe_divide(a: i32, b: i32) -> Result<i32, MathError> {
    if b == 0 {
        return Err(MathError::DivisionByZero);
    }
    a.checked_div(b).ok_or(MathError::Overflow)
}

// Application code
use anyhow::{Context, Result};

fn calculate() -> Result<()> {
    let result = safe_divide(10, 2)
        .context("First division failed")?;

    println!("10 / 2 = {}", result);

    let result = safe_divide(10, 0)
        .context("Second division failed")?;

    println!("10 / 0 = {}", result);

    Ok(())
}

fn main() -> Result<()> {
    calculate()?;
    Ok(())
}
```
</details>

## 🎯 Tóm Tắt

| Tool | Dùng Cho | Ưu Điểm | Nhược Điểm |
|------|----------|---------|------------|
| **thiserror** | Libraries | Type-safe, matchable | Cần define types |
| **anyhow** | Applications | Quick, flexible | Không match được |

**Quy tắc vàng**:
- ✅ **Library**: Dùng `thiserror` - type-safe, specific errors
- ✅ **Application**: Dùng `anyhow` - quick, với context
- ✅ Kết hợp: Library dùng thiserror, app dùng anyhow
- ✅ Luôn thêm context cho errors
- ✅ Dùng `?` operator để propagate

**Macro hữu ích**:
- `anyhow!()` - Tạo error nhanh
- `bail!()` - Return error ngay
- `.context()` - Thêm context
- `.with_context()` - Lazy context

## 🔗 Liên Kết Hữu Ích

- [thiserror crate](https://docs.rs/thiserror)
- [anyhow crate](https://docs.rs/anyhow)
- [Rust Error Handling Survey](https://blog.burntsushi.net/rust-error-handling/)

---

**Bài tiếp theo**: [Generics →](./generics.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Generics** - viết code hoạt động với nhiều kiểu dữ liệu!
