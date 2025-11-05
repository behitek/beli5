---
sidebar_position: 2
title: Cài Đặt Rust và Công Cụ
description: Hướng dẫn cài đặt Rust, Cargo và setup môi trường phát triển trên Windows, macOS và Linux
keywords: [rust, installation, rustup, cargo, windows, macos, linux, setup, vscode]
---

# 📥 Cài Đặt Rust và Công Cụ

## Giới Thiệu

Trước khi bắt đầu viết code Rust, bạn cần cài đặt các công cụ cần thiết. Đừng lo, quá trình này rất đơn giản! ⚙️

:::tip Giải Thích Cho Bạn 5 Tuổi
Học Rust giống như học vẽ:
- **Rustup**: Cửa hàng văn phòng phẩm (mua bút, giấy, màu)
- **Rust compiler**: Chiếc bút vẽ
- **Cargo**: Cặp đựng đồ vẽ
- **VS Code**: Bàn vẽ chuyên nghiệp 🎨
:::

## 🎯 Bạn Sẽ Cài Đặt Gì?

### 1. Rustup - Công Cụ Quản Lý Rust 🔧

**Rustup** giúp bạn:
- Cài đặt Rust compiler (`rustc`)
- Cài đặt Cargo (package manager)
- Cập nhật Rust lên phiên bản mới
- Quản lý nhiều phiên bản Rust

### 2. Rust Compiler - Biên Dịch Code 📝

**Rustc** chuyển đổi:
```
Code Rust (.rs) → Compiler → File thực thi (.exe)
```

### 3. Cargo - Trợ Thủ Đắc Lực 📦

**Cargo** giúp bạn:
- Tạo project mới
- Build và run code
- Quản lý dependencies (thư viện)
- Chạy tests

### 4. Code Editor - Nơi Viết Code 💻

Chúng ta sẽ dùng **VS Code** hoặc **RustRover**.

## 📋 Yêu Cầu Hệ Thống

### Windows
- Windows 7 hoặc mới hơn
- ~400MB ổ đĩa trống
- Kết nối internet

### macOS
- macOS 10.12 (Sierra) hoặc mới hơn
- ~400MB ổ đĩa trống
- Xcode Command Line Tools

### Linux
- Hầu hết các distro hiện đại
- ~400MB ổ đĩa trống
- GCC hoặc Clang

## 🪟 Cài Đặt Trên Windows

### Bước 1: Tải Rustup

1. Mở trình duyệt, vào: https://rustup.rs/
2. Click nút **"Download rustup-init.exe"**
3. Chạy file vừa tải về

### Bước 2: Cài Đặt Visual Studio C++ Build Tools

**Tại sao cần?** Rust trên Windows cần C++ build tools.

1. Installer sẽ hỏi: **"Install Visual Studio C++ Build Tools?"**
2. Chọn **"Quick install"** (khuyến nghị)
3. Hoặc tải riêng từ: https://visualstudio.microsoft.com/visual-cpp-build-tools/

**Components cần:**
- ✅ MSVC v142 - VS 2019 C++ build tools
- ✅ Windows 10 SDK

### Bước 3: Chạy Rustup Installer

1. Mở Command Prompt hoặc PowerShell
2. Chạy `rustup-init.exe`
3. Bạn sẽ thấy:

```
Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Current installation options:

   default host triple: x86_64-pc-windows-msvc
     default toolchain: stable
               profile: default
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
>
```

4. Gõ **1** và nhấn Enter (hoặc chỉ Enter)

### Bước 4: Đợi Cài Đặt

Installer sẽ:
- Tải Rust compiler (~150MB)
- Tải Cargo
- Cài đặt vào `C:\Users\<TênBạn>\.cargo` và `.rustup`
- Thêm vào PATH

**Thời gian**: 5-10 phút (tùy internet)

### Bước 5: Restart Terminal

**Quan trọng!** Đóng Command Prompt/PowerShell và mở lại.

### Bước 6: Kiểm Tra Cài Đặt

```bash
# Kiểm tra Rust compiler
rustc --version

# Bạn sẽ thấy: rustc 1.75.0 (82e1608df 2023-12-21)
```

```bash
# Kiểm tra Cargo
cargo --version

# Bạn sẽ thấy: cargo 1.75.0 (1d8b05cdd 2023-11-20)
```

**Nếu thấy version numbers** → 🎉 Thành công!

### 🔧 Troubleshooting Windows

**Lỗi: "rustc is not recognized"**
- ✅ Đã restart terminal chưa?
- ✅ Kiểm tra PATH: `echo %PATH%` có chứa `.cargo\bin` không?

**Lỗi: "link.exe not found"**
- ✅ Cài Visual Studio C++ Build Tools
- ✅ Restart sau khi cài

## 🍎 Cài Đặt Trên macOS

### Bước 1: Cài Xcode Command Line Tools

1. Mở Terminal (Applications → Utilities → Terminal)
2. Chạy lệnh:

```bash
xcode-select --install
```

3. Một hộp thoại xuất hiện → Click **"Install"**
4. Đợi 5-10 phút

### Bước 2: Cài Rustup

1. Trong Terminal, chạy:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. Bạn sẽ thấy:

```
Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Current installation options:

   default host triple: x86_64-apple-darwin
     default toolchain: stable
               profile: default
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
>
```

3. Gõ **1** và nhấn Enter

### Bước 3: Load Cargo Environment

```bash
source $HOME/.cargo/env
```

**Lưu ý**: Chỉ cần làm lần đầu. Sau đó tự động load khi mở Terminal mới.

### Bước 4: Kiểm Tra Cài Đặt

```bash
# Kiểm tra Rust
rustc --version

# Kiểm tra Cargo
cargo --version
```

**Thành công!** 🎉

### 🔧 Troubleshooting macOS

**Lỗi: "xcrun: error: invalid active developer path"**
- ✅ Cài Xcode Command Line Tools: `xcode-select --install`

**Lỗi: "command not found: cargo"**
- ✅ Chạy: `source $HOME/.cargo/env`
- ✅ Hoặc restart Terminal

## 🐧 Cài Đặt Trên Linux

### Bước 1: Cài Development Tools

#### Ubuntu / Debian

```bash
sudo apt update
sudo apt install build-essential
```

#### Fedora / RHEL / CentOS

```bash
sudo dnf install gcc
```

#### Arch Linux

```bash
sudo pacman -S base-devel
```

### Bước 2: Cài Rustup

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Chọn option **1** (default installation).

### Bước 3: Load Environment

```bash
source $HOME/.cargo/env
```

Hoặc thêm vào `.bashrc` / `.zshrc`:

```bash
echo 'source $HOME/.cargo/env' >> ~/.bashrc
source ~/.bashrc
```

### Bước 4: Kiểm Tra

```bash
rustc --version
cargo --version
```

**Hoàn thành!** 🎉

### 🔧 Troubleshooting Linux

**Lỗi: "linker `cc` not found"**
- ✅ Cài build tools: `sudo apt install build-essential`

**Lỗi: "SSL certificate problem"**
- ✅ Cài CA certificates: `sudo apt install ca-certificates`

## 💻 Cài Đặt Code Editor

### Option 1: Visual Studio Code (Khuyến Nghị) ⭐

#### Cài VS Code

1. Tải từ: https://code.visualstudio.com/
2. Cài đặt theo hướng dẫn

#### Cài Extensions Cho Rust

Mở VS Code, cài các extensions sau:

1. **rust-analyzer** (Chính thức, quan trọng nhất!)
   - Autocomplete thông minh
   - Error checking real-time
   - Code navigation
   - Refactoring tools

2. **CodeLLDB** (Để debug)
   - Debug Rust code
   - Breakpoints
   - Watch variables

3. **crates** (Quản lý dependencies)
   - Hiển thị version mới nhất
   - Update dependencies

4. **Even Better TOML** (Để đọc Cargo.toml)
   - Syntax highlighting cho TOML
   - Auto-completion

#### Cài Extensions:

1. Click icon Extensions (Ctrl+Shift+X)
2. Tìm "rust-analyzer"
3. Click **Install**
4. Làm tương tự với các extensions khác

### Option 2: RustRover (IDE Chuyên Nghiệp)

**RustRover** by JetBrains:
- IDE đầy đủ tính năng
- Tốt cho người thích IntelliJ/PyCharm
- Có phí (miễn phí cho sinh viên)

Tải từ: https://www.jetbrains.com/rust/

### Option 3: Các Editors Khác

- **Vim/Neovim**: Plugin `rust.vim`
- **Emacs**: Mode `rustic`
- **Sublime Text**: Package `Rust Enhanced`
- **Atom**: Package `language-rust`

## ✅ Kiểm Tra Setup Hoàn Chỉnh

### Test 1: Version Check

```bash
rustc --version
cargo --version
rustfmt --version
rust-analyzer --version
```

Tất cả đều hiển thị version → ✅

### Test 2: Tạo Project Thử

```bash
# Tạo project mới
cargo new hello_rust
cd hello_rust

# Build project
cargo build

# Chạy project
cargo run
```

**Kết quả mong đợi**:
```
   Compiling hello_rust v0.1.0
    Finished dev [unoptimized + debuginfo] target(s) in 2.34s
     Running `target/debug/hello_rust`
Hello, world!
```

**Nếu thấy "Hello, world!"** → 🎉 Hoàn hảo!

### Test 3: Editor Integration

1. Mở project trong VS Code: `code .`
2. Mở file `src/main.rs`
3. Gõ `fn test` và để rust-analyzer autocomplete
4. Nếu thấy suggestions → ✅ Rust-analyzer hoạt động!

## 🔄 Cập Nhật Rust

Rust ra bản mới 6 tuần/lần.

### Cập Nhật Lên Phiên Bản Mới Nhất

```bash
rustup update
```

### Kiểm Tra Phiên Bản Hiện Tại

```bash
rustup show
```

### Thay Đổi Toolchain

```bash
# Sử dụng stable (mặc định)
rustup default stable

# Sử dụng nightly (tính năng thử nghiệm)
rustup default nightly

# Sử dụng beta
rustup default beta
```

**Khuyến nghị**: Dùng **stable** khi mới học!

## 🛠️ Công Cụ Bổ Sung

### Rustfmt - Format Code

**Tự động format code** theo Rust style:

```bash
# Cài rustfmt (thường đã có sẵn)
rustup component add rustfmt

# Format file
rustfmt src/main.rs

# Format toàn bộ project
cargo fmt
```

### Clippy - Linter

**Kiểm tra code** và đề xuất cải thiện:

```bash
# Cài Clippy
rustup component add clippy

# Chạy Clippy
cargo clippy
```

Clippy sẽ gợi ý:
- Code có thể viết tốt hơn
- Performance improvements
- Idiomatic Rust patterns

### Rust Docs - Documentation

**Đọc docs offline**:

```bash
# Mở Rust documentation
rustup doc

# Mở docs của một crate cụ thể
cargo doc --open
```

## 📂 Cấu Trúc Sau Khi Cài Đặt

```
~/.cargo/                    # Cargo home
├── bin/                     # Các executables
│   ├── cargo                # Cargo
│   ├── rustc                # Compiler
│   ├── rustfmt              # Formatter
│   └── clippy-driver        # Clippy
├── registry/                # Downloaded crates
└── config                   # Cargo config

~/.rustup/                   # Rustup home
├── toolchains/              # Rust versions
│   └── stable-<arch>/       # Stable toolchain
├── downloads/               # Temp downloads
└── settings.toml            # Rustup settings
```

## 🎯 Tóm Tắt

Bạn đã cài đặt:
- ✅ **Rustup** - Quản lý Rust
- ✅ **Rust compiler** (rustc) - Biên dịch code
- ✅ **Cargo** - Package manager
- ✅ **VS Code + rust-analyzer** - Editor
- ✅ **Rustfmt + Clippy** - Code quality tools

## 🚀 Bước Tiếp Theo

Giờ bạn đã sẵn sàng! Hãy chuyển sang:

1. ➡️ [Làm Quen Với Cargo](cargo-basics) - Học cách dùng Cargo
2. ➡️ [Chương Trình Đầu Tiên](first-program) - Viết Hello, World!

---

:::tip Lời Khuyên
**Cập nhật Rust thường xuyên** để có tính năng mới và bug fixes:
```bash
rustup update
```
Nên chạy lệnh này **mỗi tháng một lần**! 🔄
:::

**Tiếp theo**: [Làm Quen Với Cargo →](cargo-basics)
