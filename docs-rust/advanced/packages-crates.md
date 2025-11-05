---
sidebar_position: 16
title: "Packages và Crates"
description: "Tìm hiểu về packages, crates, và quản lý dependencies"
---

# 📦 Packages và Crates

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được package và crate là gì
- ✅ Phân biệt binary và library crates
- ✅ Quản lý dependencies trong Cargo.toml
- ✅ Tạo workspace cho multi-crate projects
- ✅ Hiểu crate publishing basics

## 🤔 Package vs Crate

### Ẩn Dụ Cuộc Sống: Hộp và Sản Phẩm

📦 **Package** - Hộp đựng:
- Một hoặc nhiều crates
- Có file `Cargo.toml`
- Quản lý dependencies

📚 **Crate** - Sản phẩm bên trong:
- Binary crate → Chương trình chạy được
- Library crate → Code tái sử dụng

### Cấu Trúc Package

```
my_package/
├── Cargo.toml
├── src/
│   ├── main.rs      # Binary crate root
│   └── lib.rs       # Library crate root
└── tests/
    └── integration_test.rs
```

## 📂 Binary Crates

### Tạo Binary Crate

```bash
cargo new my_app
cd my_app
```

**Cargo.toml**:
```toml
[package]
name = "my_app"
version = "0.1.0"
edition = "2021"

[dependencies]
```

**src/main.rs**:
```rust
fn main() {
    println!("Hello, world!");
}
```

### Multiple Binary Crates

```
my_package/
├── Cargo.toml
└── src/
    ├── main.rs
    └── bin/
        ├── tool1.rs
        └── tool2.rs
```

```bash
cargo run               # Chạy main.rs
cargo run --bin tool1   # Chạy tool1.rs
cargo run --bin tool2   # Chạy tool2.rs
```

## 📚 Library Crates

### Tạo Library Crate

```bash
cargo new my_lib --lib
cd my_lib
```

**src/lib.rs**:
```rust
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
}
```

### Sử Dụng Library

```toml
# Cargo.toml
[dependencies]
my_lib = { path = "../my_lib" }
```

```rust
// main.rs
use my_lib::add;

fn main() {
    let result = add(5, 3);
    println!("Result: {}", result);
}
```

## 🔧 Cargo.toml

### Dependencies

```toml
[dependencies]
serde = "1.0"                    # Từ crates.io
rand = { version = "0.8", features = ["small_rng"] }
my_lib = { path = "../my_lib" }  # Local path
my_git_dep = { git = "https://github.com/user/repo" }
```

### Dev Dependencies

```toml
[dev-dependencies]
criterion = "0.5"  # Chỉ dùng cho tests/benchmarks
```

### Build Dependencies

```toml
[build-dependencies]
cc = "1.0"  # Chỉ dùng cho build scripts
```

### Features

```toml
[features]
default = ["feature1"]
feature1 = []
feature2 = ["dep:some_dependency"]

[dependencies]
some_dependency = { version = "1.0", optional = true }
```

## 🏢 Workspaces

### Tạo Workspace

```
my_workspace/
├── Cargo.toml (workspace)
├── app/
│   ├── Cargo.toml
│   └── src/
│       └── main.rs
└── lib/
    ├── Cargo.toml
    └── src/
        └── lib.rs
```

**Cargo.toml (root)**:
```toml
[workspace]
members = [
    "app",
    "lib",
]
```

**app/Cargo.toml**:
```toml
[package]
name = "app"
version = "0.1.0"
edition = "2021"

[dependencies]
lib = { path = "../lib" }
```

### Quản Lý Workspace

```bash
cargo build              # Build tất cả
cargo build -p app       # Build specific package
cargo test               # Test tất cả
cargo run -p app         # Run specific binary
```

## 📌 Versions

### Semantic Versioning

```
MAJOR.MINOR.PATCH
1.2.3
```

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Version Requirements

```toml
[dependencies]
serde = "1.0"       # >= 1.0.0, < 2.0.0
serde = "1.0.100"   # >= 1.0.100, < 2.0.0
serde = "=1.0.100"  # Exactly 1.0.100
serde = ">=1.0"     # >= 1.0.0
serde = "*"         # Any version (không khuyến khích!)
```

## 🌐 Publishing to crates.io

### Chuẩn Bị

```toml
[package]
name = "my_awesome_crate"
version = "0.1.0"
edition = "2021"
authors = ["Your Name <you@example.com>"]
license = "MIT"
description = "A short description"
homepage = "https://github.com/you/repo"
repository = "https://github.com/you/repo"
keywords = ["cli", "tool"]
categories = ["command-line-utilities"]
```

### Publish

```bash
# Login
cargo login YOUR_API_TOKEN

# Publish
cargo publish

# Dry run
cargo publish --dry-run
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: App + Library

**workspace/Cargo.toml**:
```toml
[workspace]
members = ["math_lib", "calculator"]
```

**math_lib/src/lib.rs**:
```rust
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

pub fn multiply(a: i32, b: i32) -> i32 {
    a * b
}
```

**calculator/src/main.rs**:
```rust
use math_lib::{add, multiply};

fn main() {
    println!("5 + 3 = {}", add(5, 3));
    println!("5 * 3 = {}", multiply(5, 3));
}
```

### Ví Dụ 2: Features

**Cargo.toml**:
```toml
[package]
name = "my_crate"
version = "0.1.0"

[features]
default = ["basic"]
basic = []
advanced = ["dep:serde"]

[dependencies]
serde = { version = "1.0", optional = true }
```

**src/lib.rs**:
```rust
#[cfg(feature = "basic")]
pub fn basic_function() {
    println!("Basic feature");
}

#[cfg(feature = "advanced")]
pub fn advanced_function() {
    println!("Advanced feature with serde");
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Tạo Workspace

Tạo workspace với 2 crates:
- `utils` library
- `app` binary sử dụng utils

<details>
<summary>💡 Gợi ý</summary>

```bash
mkdir my_workspace
cd my_workspace

# Root Cargo.toml
cat > Cargo.toml << EOF
[workspace]
members = ["utils", "app"]
EOF

# Create crates
cargo new utils --lib
cargo new app

# utils/src/lib.rs
# pub fn greet(name: &str) { println!("Hello, {}!", name); }

# app/Cargo.toml - add dependency
# [dependencies]
# utils = { path = "../utils" }

# app/src/main.rs
# use utils::greet;
# fn main() { greet("World"); }
```
</details>

## 🎯 Tóm Tắt

| Concept | Mô Tả | Ví Dụ |
|---------|-------|-------|
| **Package** | Chứa một hoặc nhiều crates | `cargo new my_app` |
| **Binary crate** | Executable program | `src/main.rs` |
| **Library crate** | Reusable code | `src/lib.rs` |
| **Workspace** | Multi-crate project | `[workspace]` |
| **Dependencies** | External crates | `[dependencies]` |
| **Features** | Optional functionality | `[features]` |

**Quy tắc vàng**:
- ✅ Binary crate cho applications
- ✅ Library crate cho reusable code
- ✅ Workspace cho large projects
- ✅ Semantic versioning cho versions
- ✅ Features cho optional functionality

## 🔗 Liên Kết Hữu Ích

- [Cargo Book](https://doc.rust-lang.org/cargo/)
- [crates.io](https://crates.io/)
- [Rust Book - Packages](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)

---

**Bài tiếp theo**: [Use và Paths →](./use-and-paths.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **use keyword và paths** để import items!
