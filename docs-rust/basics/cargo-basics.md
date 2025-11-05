---
sidebar_position: 3
title: Cargo - Trợ Thủ Đắc Lực Của Rust
description: Học cách sử dụng Cargo - package manager và build tool của Rust để tạo, build và quản lý projects
keywords: [rust, cargo, package manager, build tool, dependencies, crates, toml]
---

# 📦 Cargo - Trợ Thủ Đắc Lực Của Rust

## Cargo Là Gì?

**Cargo** là "người bạn tốt nhất" khi bạn làm việc với Rust. Nó giúp bạn:
- ✅ Tạo project mới
- ✅ Build (biên dịch) code
- ✅ Chạy chương trình
- ✅ Quản lý dependencies (thư viện bên ngoài)
- ✅ Chạy tests
- ✅ Tạo documentation
- ✅ Publish packages

:::tip Giải Thích Cho Bạn 5 Tuổi
Cargo giống như **cặp sách thông minh** của bạn:
- 📚 Giúp bạn sắp xếp sách vở (organize code)
- 📝 Nhắc bạn bài tập cần làm (build tasks)
- 🎒 Mang theo đồ dùng cần thiết (dependencies)
- ✅ Kiểm tra bài xem đúng chưa (tests)

Bạn chỉ cần nói "Cargo, làm giúp mình!" và nó lo hết! 🎉
:::

## 🎯 So Sánh Với Công Cụ Khác

| Ngôn ngữ | Build Tool | Package Manager |
|----------|------------|-----------------|
| JavaScript | npm | npm |
| Python | - | pip |
| Java | Maven/Gradle | Maven/Gradle |
| Go | go build | go get |
| **Rust** | **cargo** | **cargo** |

**Cargo = Build tool + Package manager** trong một!

## 🚀 Tạo Project Mới

### Tạo Binary Project (Chương trình chạy được)

```bash
cargo new my_project
```

**Cargo sẽ tạo:**
```
my_project/
├── Cargo.toml          # File cấu hình
├── src/
│   └── main.rs         # Code chính
└── .gitignore          # Git ignore
```

### Tạo Library Project (Thư viện)

```bash
cargo new my_library --lib
```

**Cargo sẽ tạo:**
```
my_library/
├── Cargo.toml
├── src/
│   └── lib.rs          # Code thư viện
└── .gitignore
```

### Tạo Project Trong Thư Mục Hiện Tại

```bash
mkdir my_project
cd my_project
cargo init
```

## 📄 File Cargo.toml

**Cargo.toml** là file cấu hình quan trọng nhất!

### Ví Dụ Cargo.toml

```toml
[package]
name = "my_project"          # Tên project
version = "0.1.0"            # Phiên bản
edition = "2021"             # Rust edition
authors = ["Nguyen Van A <a@example.com>"]
description = "Mô tả project"
license = "MIT"

[dependencies]
# Thư viện bên ngoài sẽ ở đây
```

### Giải Thích Các Phần

#### [package] - Thông Tin Project

```toml
[package]
name = "hello_rust"          # Tên project (snake_case)
version = "0.1.0"            # Phiên bản (semantic versioning)
edition = "2021"             # Rust edition (2015, 2018, 2021)
```

**Rust Edition**:
- **2015**: Edition đầu tiên
- **2018**: Nhiều cải tiến
- **2021**: Mới nhất, khuyến nghị dùng

#### [dependencies] - Thư Viện

```toml
[dependencies]
serde = "1.0"                    # Version cụ thể
rand = "0.8.5"                   # Version cụ thể
tokio = { version = "1", features = ["full"] }  # Với features
```

**Cài dependencies**: Chỉ cần thêm vào file, rồi chạy `cargo build`!

## 🔨 Các Lệnh Cargo Cơ Bản

### `cargo build` - Build Project

```bash
# Build ở chế độ debug (nhanh, để dev)
cargo build

# Build ở chế độ release (chậm, tối ưu)
cargo build --release
```

**Kết quả**:
```
my_project/
└── target/
    ├── debug/            # Debug builds
    │   └── my_project    # Executable (Linux/Mac)
    │   └── my_project.exe  # Executable (Windows)
    └── release/          # Release builds
        └── my_project
```

**Debug vs Release**:
| Mode | Build Time | Run Speed | File Size | Dùng Khi |
|------|------------|-----------|-----------|----------|
| Debug | Nhanh | Chậm | Lớn | Develop |
| Release | Chậm | Nhanh | Nhỏ | Production |

### `cargo run` - Build và Chạy

```bash
# Build (nếu cần) và chạy
cargo run

# Run với release mode
cargo run --release

# Run với arguments
cargo run -- arg1 arg2
```

**Ví dụ**:
```bash
$ cargo run
   Compiling my_project v0.1.0
    Finished dev [unoptimized + debuginfo] target(s) in 0.50s
     Running `target/debug/my_project`
Hello, world!
```

### `cargo check` - Kiểm Tra Lỗi Nhanh

```bash
cargo check
```

**Tại sao dùng?**
- ⚡ Nhanh hơn `cargo build` (không tạo executable)
- ✅ Chỉ kiểm tra code có compile được không
- 🔄 Dùng khi viết code để check lỗi nhanh

### `cargo clean` - Xóa Build Files

```bash
cargo clean
```

**Khi nào dùng?**
- 💾 Giải phóng ổ đĩa (target/ rất lớn!)
- 🔄 Build lại từ đầu
- 🐛 Debug build issues

### `cargo test` - Chạy Tests

```bash
# Chạy tất cả tests
cargo test

# Chạy test cụ thể
cargo test test_name

# Show output của tests
cargo test -- --show-output
```

### `cargo doc` - Tạo Documentation

```bash
# Tạo docs
cargo doc

# Tạo và mở trong browser
cargo doc --open
```

### `cargo update` - Cập Nhật Dependencies

```bash
# Cập nhật tất cả dependencies
cargo update

# Cập nhật một dependency cụ thể
cargo update serde
```

## 📦 Thêm Dependencies

### Cách 1: Thêm Vào Cargo.toml

1. Mở `Cargo.toml`
2. Thêm vào section `[dependencies]`:

```toml
[dependencies]
rand = "0.8.5"
```

3. Chạy `cargo build` để tải về

### Cách 2: Dùng cargo-edit (Khuyến nghị)

Cài `cargo-edit`:
```bash
cargo install cargo-edit
```

Thêm dependency:
```bash
# Thêm dependency mới nhất
cargo add rand

# Thêm với version cụ thể
cargo add serde@1.0

# Thêm với features
cargo add tokio --features full
```

Xóa dependency:
```bash
cargo rm rand
```

### Tìm Crates Trên crates.io

1. Vào https://crates.io
2. Tìm crate cần dùng (ví dụ: "serde")
3. Copy dòng dependencies:

```toml
serde = "1.0"
```

### Version Syntax

```toml
[dependencies]
# Exact version
serde = "=1.0.152"

# Greater than or equal
serde = ">=1.0.0"

# Compatible updates (default)
serde = "1.0"          # Tương đương "^1.0"
                        # Cho phép 1.0.0 đến <2.0.0

# Tilde requirements
serde = "~1.0.150"     # Cho phép 1.0.150 đến <1.1.0

# Wildcard
serde = "1.*"          # Cho phép 1.x.x
```

**Khuyến nghị**: Dùng `"1.0"` (compatible updates)

## 🏗️ Cấu Trúc Project

### Binary Project (Executable)

```
my_app/
├── Cargo.toml
├── Cargo.lock          # Lock versions (tự động tạo)
├── src/
│   ├── main.rs         # Entry point
│   ├── lib.rs          # Library code (optional)
│   └── modules/        # Module files
│       ├── mod.rs
│       └── utils.rs
├── tests/              # Integration tests
│   └── integration_test.rs
├── benches/            # Benchmarks
│   └── my_benchmark.rs
└── examples/           # Example programs
    └── example1.rs
```

### Chạy Examples

```bash
# Liệt kê examples
cargo build --examples

# Chạy example
cargo run --example example1
```

## 🎯 Cargo Workspace (Nhiều Projects)

Khi bạn có nhiều projects liên quan:

### Tạo Workspace

**Cargo.toml** (root):
```toml
[workspace]
members = [
    "app",
    "lib1",
    "lib2",
]
```

**Cấu trúc**:
```
my_workspace/
├── Cargo.toml          # Workspace config
├── app/                # Binary
│   ├── Cargo.toml
│   └── src/
│       └── main.rs
├── lib1/               # Library 1
│   ├── Cargo.toml
│   └── src/
│       └── lib.rs
└── lib2/               # Library 2
    ├── Cargo.toml
    └── src/
        └── lib.rs
```

### Dùng Workspace

```bash
# Build tất cả
cargo build

# Build một project
cargo build -p app

# Run project cụ thể
cargo run -p app
```

## ⚙️ Cargo Configuration

### Cargo.toml - Project Config

**Profile configurations**:

```toml
[profile.dev]
opt-level = 0          # Không tối ưu (nhanh compile)

[profile.release]
opt-level = 3          # Tối ưu tối đa
lto = true             # Link Time Optimization
codegen-units = 1      # Tối ưu single-threaded
```

### .cargo/config.toml - Global Config

Tạo file `.cargo/config.toml` trong project:

```toml
[build]
# Số CPU cores để compile
jobs = 4

[target.x86_64-unknown-linux-gnu]
# Linker cụ thể cho Linux
linker = "clang"
```

## 🔍 Cargo Commands Khác

### `cargo search` - Tìm Crates

```bash
cargo search serde
```

### `cargo tree` - Xem Dependency Tree

```bash
cargo tree
```

**Kết quả**:
```
my_project v0.1.0
├── rand v0.8.5
│   ├── rand_core v0.6.4
│   └── rand_chacha v0.3.1
└── serde v1.0.152
```

### `cargo bench` - Benchmarks

```bash
cargo bench
```

### `cargo publish` - Publish Crate

```bash
# Publish lên crates.io
cargo publish
```

## 💡 Tips & Tricks

### 1. Compile Nhanh Hơn

**Dùng `cargo-watch`** - Auto rebuild khi file thay đổi:

```bash
# Cài cargo-watch
cargo install cargo-watch

# Watch và run
cargo watch -x run

# Watch và check
cargo watch -x check
```

### 2. Build Cache

**Dùng `sccache`** - Cache compilation:

```bash
# Cài sccache
cargo install sccache

# Set environment variable
export RUSTC_WRAPPER=sccache
```

### 3. Offline Development

```bash
# Tải tất cả dependencies
cargo fetch

# Build offline
cargo build --offline
```

### 4. Vendor Dependencies

```bash
# Copy dependencies vào project
cargo vendor
```

Hữu ích khi:
- Deploy không có internet
- Audit dependencies
- Reproducible builds

## 🐛 Troubleshooting

### Lỗi: "Could not find Cargo.toml"

**Nguyên nhân**: Bạn không ở trong project directory

**Giải pháp**:
```bash
cd my_project  # Vào thư mục project
cargo build    # Chạy lại
```

### Lỗi: "Failed to download dependencies"

**Nguyên nhân**: Lỗi mạng hoặc crates.io down

**Giải pháp**:
```bash
# Thử lại
cargo build

# Hoặc clean và build lại
cargo clean
cargo build
```

### Lỗi: "Blocking waiting for file lock"

**Nguyên nhân**: Cargo process khác đang chạy

**Giải pháp**:
- Đợi process kia xong
- Hoặc kill process: `pkill cargo`

## 📚 Tóm Tắt Commands

| Command | Mô tả | Khi nào dùng |
|---------|-------|--------------|
| `cargo new` | Tạo project mới | Bắt đầu project |
| `cargo init` | Init trong thư mục hiện tại | Thư mục đã có |
| `cargo build` | Build project | Tạo executable |
| `cargo run` | Build và chạy | Development |
| `cargo check` | Kiểm tra lỗi | Viết code |
| `cargo test` | Chạy tests | Testing |
| `cargo clean` | Xóa build files | Giải phóng ổ đĩa |
| `cargo doc` | Tạo docs | Documentation |
| `cargo add` | Thêm dependency | Cần thư viện |
| `cargo update` | Cập nhật deps | Update libraries |

## 🎯 Best Practices

### 1. Commit Cargo.lock

**Binary projects**: Commit `Cargo.lock`
**Library projects**: Thêm vào `.gitignore`

### 2. Version Dependencies Đúng Cách

```toml
[dependencies]
# Good - compatible updates
serde = "1.0"

# Bad - always latest (không stable!)
serde = "*"
```

### 3. Organize Code

```
src/
├── main.rs         # Entry point
├── lib.rs          # Public API
└── modules/        # Internal modules
    ├── mod.rs
    └── utils.rs
```

### 4. Use Features

```toml
[features]
default = ["feature1"]
feature1 = []
feature2 = ["dep:optional_crate"]

[dependencies]
optional_crate = { version = "1.0", optional = true }
```

Build với features:
```bash
cargo build --features feature2
```

## 🚀 Bước Tiếp Theo

Bạn đã biết:
- ✅ Cargo là gì và làm gì
- ✅ Tạo project với `cargo new`
- ✅ File Cargo.toml
- ✅ Build, run, check, test
- ✅ Quản lý dependencies
- ✅ Cargo workspace

Giờ hãy viết chương trình Rust đầu tiên!

➡️ **Tiếp theo**: [Chương Trình Đầu Tiên - Hello, World!](first-program)

---

:::tip Lời Khuyên
**Cargo là người bạn tốt nhất của bạn!** Hãy dùng nó cho mọi thứ:
- `cargo run` thay vì `rustc main.rs`
- `cargo add` thay vì edit Cargo.toml
- `cargo check` khi viết code
- `cargo clippy` để học cách viết Rust tốt hơn

Cargo làm mọi thứ đơn giản hơn nhiều! 🎉
:::

**Tiếp theo**: [Chương Trình Đầu Tiên →](first-program)
