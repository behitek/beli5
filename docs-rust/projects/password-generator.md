---
sidebar_position: 6
title: 🔐 Password Generator
description: Tạo mật khẩu ngẫu nhiên an toàn với Rust - Random generation, character sets, và customization
keywords: [rust, project, password, generator, random, security, intermediate, mật khẩu]
---

# 🔐 Password Generator

## 🎯 Mục Tiêu Dự Án

Xây dựng một **công cụ tạo mật khẩu ngẫu nhiên** với các tính năng:
- 🔤 Tùy chỉnh độ dài (length)
- 🎲 Chọn loại ký tự (chữ thường, HOA, số, ký tự đặc biệt)
- 🔒 Phân tích độ mạnh mật khẩu (strength analysis)
- 📋 Tạo nhiều mật khẩu cùng lúc
- 💪 Đảm bảo entropy cao (secure randomness)

### Bạn Sẽ Học Được
- ✅ Làm việc với **rand crate** cho random generation
- ✅ Xử lý **character sets** và encoding
- ✅ **Bitwise operations** cho options
- ✅ Phân tích độ mạnh mật khẩu
- ✅ CLI argument parsing
- ✅ Security best practices

## 📦 Bước 1: Tạo Project và Dependencies

```bash
cargo new password_generator
cd password_generator
```

Thêm vào `Cargo.toml`:

```toml
[dependencies]
rand = "0.8"
```

## 🎮 Bước 2: Version 1 - Basic Generator

Mở `src/main.rs`:

```rust
use rand::Rng;
use std::io;

fn generate_password(length: usize) -> String {
    // Tất cả ký tự có thể dùng
    let chars: Vec<char> = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
        .chars()
        .collect();

    let mut rng = rand::thread_rng();
    let mut password = String::new();

    for _ in 0..length {
        let random_index = rng.gen_range(0..chars.len());
        password.push(chars[random_index]);
    }

    password
}

fn main() {
    println!("🔐 Password Generator - Version 1");
    println!("==================================\n");

    loop {
        println!("📏 Nhập độ dài mật khẩu (hoặc 'exit' để thoát):");
        print!("> ");

        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("❌ Không đọc được input!");

        let input = input.trim();

        if input.to_lowercase() == "exit" {
            println!("👋 Tạm biệt!");
            break;
        }

        match input.parse::<usize>() {
            Ok(length) => {
                if length == 0 {
                    println!("⚠️  Độ dài phải lớn hơn 0!");
                    continue;
                }

                if length > 128 {
                    println!("⚠️  Độ dài quá lớn! Giới hạn: 128 ký tự");
                    continue;
                }

                let password = generate_password(length);
                println!("✅ Mật khẩu: {}\n", password);
            },
            Err(_) => println!("⚠️  Vui lòng nhập số hợp lệ!"),
        }
    }
}
```

## 🚀 Chạy Thử

```bash
cargo run
```

**Output mẫu:**
```
🔐 Password Generator - Version 1
==================================

📏 Nhập độ dài mật khẩu (hoặc 'exit' để thoát):
> 12
✅ Mật khẩu: aK9#mL2@pX7!

📏 Nhập độ dài mật khẩu (hoặc 'exit' để thoát):
> 16
✅ Mật khẩu: zQ8*hN3$vB6&tY2@
```

## 📖 Giải Thích Code

### 1. Character Set

```rust
let chars: Vec<char> = "abcd...".chars().collect();
```

- `chars()`: Chuyển String thành iterator của char
- `collect()`: Thu thập thành Vec<char>
- Bao gồm: chữ thường, chữ hoa, số, ký tự đặc biệt

### 2. Random Number Generation

```rust
let mut rng = rand::thread_rng();
let random_index = rng.gen_range(0..chars.len());
```

- `thread_rng()`: Random number generator an toàn cho thread
- `gen_range(0..n)`: Tạo số ngẫu nhiên từ 0 đến n-1

### 3. Build String

```rust
for _ in 0..length {
    password.push(chars[random_index]);
}
```

- Loop `length` lần
- Chọn random char và thêm vào password

## 🎨 Bước 3: Version 2 - Customizable Options

Cho phép chọn loại ký tự:

```rust
use rand::Rng;
use std::io::{self, Write};

struct PasswordOptions {
    length: usize,
    use_lowercase: bool,
    use_uppercase: bool,
    use_numbers: bool,
    use_symbols: bool,
}

impl PasswordOptions {
    fn new(length: usize) -> Self {
        PasswordOptions {
            length,
            use_lowercase: true,
            use_uppercase: true,
            use_numbers: true,
            use_symbols: true,
        }
    }

    fn get_charset(&self) -> Vec<char> {
        let mut charset = String::new();

        if self.use_lowercase {
            charset.push_str("abcdefghijklmnopqrstuvwxyz");
        }
        if self.use_uppercase {
            charset.push_str("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        }
        if self.use_numbers {
            charset.push_str("0123456789");
        }
        if self.use_symbols {
            charset.push_str("!@#$%^&*()_+-=[]{}|;:,.<>?");
        }

        charset.chars().collect()
    }
}

fn generate_password(options: &PasswordOptions) -> Result<String, String> {
    let charset = options.get_charset();

    if charset.is_empty() {
        return Err("Phải chọn ít nhất một loại ký tự!".to_string());
    }

    let mut rng = rand::thread_rng();
    let mut password = String::new();

    for _ in 0..options.length {
        let random_index = rng.gen_range(0..charset.len());
        password.push(charset[random_index]);
    }

    Ok(password)
}

fn get_yes_no(prompt: &str) -> bool {
    print!("{} (y/n): ", prompt);
    io::stdout().flush().unwrap();

    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();

    matches!(input.trim().to_lowercase().as_str(), "y" | "yes")
}

fn main() {
    println!("🔐 Password Generator - Version 2");
    println!("==================================\n");

    loop {
        println!("📏 Nhập độ dài mật khẩu (hoặc 'exit' để thoát):");
        print!("> ");
        io::stdout().flush().unwrap();

        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("❌ Không đọc được input!");

        let input = input.trim();

        if input.to_lowercase() == "exit" {
            println!("👋 Tạm biệt!");
            break;
        }

        let length = match input.parse::<usize>() {
            Ok(l) if l > 0 && l <= 128 => l,
            Ok(_) => {
                println!("⚠️  Độ dài phải từ 1-128!");
                continue;
            },
            Err(_) => {
                println!("⚠️  Vui lòng nhập số hợp lệ!");
                continue;
            }
        };

        println!("\n🎨 Tùy chỉnh ký tự:");
        let mut options = PasswordOptions::new(length);
        options.use_lowercase = get_yes_no("🔤 Chữ thường (a-z)");
        options.use_uppercase = get_yes_no("🔠 Chữ HOA (A-Z)");
        options.use_numbers = get_yes_no("🔢 Số (0-9)");
        options.use_symbols = get_yes_no("🔣 Ký tự đặc biệt (!@#$...)");

        match generate_password(&options) {
            Ok(password) => {
                println!("\n✅ Mật khẩu: {}", password);
                println!("📊 Số lượng ký tự khả dụng: {}\n", options.get_charset().len());
            },
            Err(e) => println!("⚠️  {}\n", e),
        }
    }
}
```

**Output mẫu:**
```
📏 Nhập độ dài mật khẩu (hoặc 'exit' để thoát):
> 16

🎨 Tùy chỉnh ký tự:
🔤 Chữ thường (a-z) (y/n): y
🔠 Chữ HOA (A-Z) (y/n): y
🔢 Số (0-9) (y/n): y
🔣 Ký tự đặc biệt (!@#$...) (y/n): n

✅ Mật khẩu: aK7mBqL9xR2hT5pN
📊 Số lượng ký tự khả dụng: 62
```

## 🎨 Bước 4: Version 3 - Với Password Strength Analysis

Thêm phân tích độ mạnh:

```rust
use rand::Rng;
use std::io::{self, Write};

struct PasswordOptions {
    length: usize,
    use_lowercase: bool,
    use_uppercase: bool,
    use_numbers: bool,
    use_symbols: bool,
}

impl PasswordOptions {
    fn new(length: usize) -> Self {
        PasswordOptions {
            length,
            use_lowercase: true,
            use_uppercase: true,
            use_numbers: true,
            use_symbols: true,
        }
    }

    fn get_charset(&self) -> Vec<char> {
        let mut charset = String::new();

        if self.use_lowercase {
            charset.push_str("abcdefghijklmnopqrstuvwxyz");
        }
        if self.use_uppercase {
            charset.push_str("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        }
        if self.use_numbers {
            charset.push_str("0123456789");
        }
        if self.use_symbols {
            charset.push_str("!@#$%^&*()_+-=[]{}|;:,.<>?");
        }

        charset.chars().collect()
    }
}

#[derive(Debug, PartialEq)]
enum PasswordStrength {
    VeryWeak,
    Weak,
    Medium,
    Strong,
    VeryStrong,
}

impl PasswordStrength {
    fn as_str(&self) -> &str {
        match self {
            PasswordStrength::VeryWeak => "Rất yếu",
            PasswordStrength::Weak => "Yếu",
            PasswordStrength::Medium => "Trung bình",
            PasswordStrength::Strong => "Mạnh",
            PasswordStrength::VeryStrong => "Rất mạnh",
        }
    }

    fn emoji(&self) -> &str {
        match self {
            PasswordStrength::VeryWeak => "🔴",
            PasswordStrength::Weak => "🟠",
            PasswordStrength::Medium => "🟡",
            PasswordStrength::Strong => "🟢",
            PasswordStrength::VeryStrong => "🟢🟢",
        }
    }
}

fn analyze_password(password: &str) -> PasswordStrength {
    let mut score = 0;

    // Độ dài
    let length = password.len();
    score += match length {
        0..=7 => 0,
        8..=11 => 1,
        12..=15 => 2,
        16..=19 => 3,
        _ => 4,
    };

    // Có chữ thường
    if password.chars().any(|c| c.is_lowercase()) {
        score += 1;
    }

    // Có chữ HOA
    if password.chars().any(|c| c.is_uppercase()) {
        score += 1;
    }

    // Có số
    if password.chars().any(|c| c.is_numeric()) {
        score += 1;
    }

    // Có ký tự đặc biệt
    if password.chars().any(|c| !c.is_alphanumeric()) {
        score += 2;
    }

    // Phân loại
    match score {
        0..=2 => PasswordStrength::VeryWeak,
        3..=4 => PasswordStrength::Weak,
        5..=6 => PasswordStrength::Medium,
        7..=8 => PasswordStrength::Strong,
        _ => PasswordStrength::VeryStrong,
    }
}

fn calculate_entropy(password: &str, charset_size: usize) -> f64 {
    // Entropy = length * log2(charset_size)
    let length = password.len() as f64;
    let charset = charset_size as f64;
    length * charset.log2()
}

fn generate_password(options: &PasswordOptions) -> Result<String, String> {
    let charset = options.get_charset();

    if charset.is_empty() {
        return Err("Phải chọn ít nhất một loại ký tự!".to_string());
    }

    let mut rng = rand::thread_rng();
    let mut password = String::new();

    for _ in 0..options.length {
        let random_index = rng.gen_range(0..charset.len());
        password.push(charset[random_index]);
    }

    Ok(password)
}

fn generate_multiple_passwords(options: &PasswordOptions, count: usize) -> Vec<String> {
    (0..count)
        .filter_map(|_| generate_password(options).ok())
        .collect()
}

fn get_yes_no(prompt: &str, default: bool) -> bool {
    let default_str = if default { "Y/n" } else { "y/N" };
    print!("{} ({}): ", prompt, default_str);
    io::stdout().flush().unwrap();

    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();

    let input = input.trim().to_lowercase();
    if input.is_empty() {
        return default;
    }

    matches!(input.as_str(), "y" | "yes")
}

fn print_password_info(password: &str, charset_size: usize) {
    let strength = analyze_password(password);
    let entropy = calculate_entropy(password, charset_size);

    println!("\n┌─────────────────────────────────────────────");
    println!("│ 🔐 Mật khẩu: {}", password);
    println!("├─────────────────────────────────────────────");
    println!("│ 📏 Độ dài: {} ký tự", password.len());
    println!("│ 💪 Độ mạnh: {} {}", strength.emoji(), strength.as_str());
    println!("│ 📊 Entropy: {:.2} bits", entropy);
    println!("│ 🎲 Charset: {} ký tự", charset_size);
    println!("└─────────────────────────────────────────────\n");
}

fn main() {
    println!("🔐 Password Generator - Version 3");
    println!("==================================\n");

    loop {
        println!("📏 Nhập độ dài mật khẩu (hoặc 'exit' để thoát):");
        print!("> ");
        io::stdout().flush().unwrap();

        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("❌ Không đọc được input!");

        let input = input.trim();

        if input.to_lowercase() == "exit" {
            println!("👋 Tạm biệt!");
            break;
        }

        let length = match input.parse::<usize>() {
            Ok(l) if l > 0 && l <= 128 => l,
            Ok(_) => {
                println!("⚠️  Độ dài phải từ 1-128!");
                continue;
            },
            Err(_) => {
                println!("⚠️  Vui lòng nhập số hợp lệ!");
                continue;
            }
        };

        println!("\n🎨 Tùy chỉnh ký tự:");
        let mut options = PasswordOptions::new(length);
        options.use_lowercase = get_yes_no("🔤 Chữ thường (a-z)", true);
        options.use_uppercase = get_yes_no("🔠 Chữ HOA (A-Z)", true);
        options.use_numbers = get_yes_no("🔢 Số (0-9)", true);
        options.use_symbols = get_yes_no("🔣 Ký tự đặc biệt", true);

        println!("\n📦 Số lượng mật khẩu cần tạo:");
        print!("> ");
        io::stdout().flush().unwrap();

        let mut count_input = String::new();
        io::stdin().read_line(&mut count_input).unwrap();

        let count = count_input.trim().parse::<usize>().unwrap_or(1);

        if count == 0 {
            println!("⚠️  Số lượng phải lớn hơn 0!");
            continue;
        }

        if count > 50 {
            println!("⚠️  Giới hạn: 50 mật khẩu!");
            continue;
        }

        let charset_size = options.get_charset().len();
        let passwords = generate_multiple_passwords(&options, count);

        if passwords.is_empty() {
            println!("⚠️  Phải chọn ít nhất một loại ký tự!\n");
            continue;
        }

        if count == 1 {
            print_password_info(&passwords[0], charset_size);
        } else {
            println!("\n✅ Đã tạo {} mật khẩu:", passwords.len());
            for (i, password) in passwords.iter().enumerate() {
                println!("  {}. {}", i + 1, password);
            }
            println!();
        }
    }
}
```

**Output mẫu:**
```
📏 Nhập độ dài mật khẩu (hoặc 'exit' để thoát):
> 16

🎨 Tùy chỉnh ký tự:
🔤 Chữ thường (a-z) (Y/n):
🔠 Chữ HOA (A-Z) (Y/n):
🔢 Số (0-9) (Y/n):
🔣 Ký tự đặc biệt (Y/n):

📦 Số lượng mật khẩu cần tạo:
> 1

┌─────────────────────────────────────────────
│ 🔐 Mật khẩu: aK7#mB2@qL9*xR5$
│ ├─────────────────────────────────────────────
│ 📏 Độ dài: 16 ký tự
│ 💪 Độ mạnh: 🟢🟢 Rất mạnh
│ 📊 Entropy: 103.21 bits
│ 🎲 Charset: 88 ký tự
└─────────────────────────────────────────────
```

## 🐛 Lỗi Thường Gặp

### Lỗi 1: Charset Rỗng

```rust
// ❌ SAI: Không kiểm tra
let charset = options.get_charset();
let idx = rng.gen_range(0..charset.len()); // Panic nếu rỗng!

// ✅ ĐÚNG: Kiểm tra trước
if charset.is_empty() {
    return Err("Charset không được rỗng!".to_string());
}
```

### Lỗi 2: Dùng Random Không An Toàn

```rust
// ❌ SAI: Không đủ an toàn cho password
use rand::random;
let idx = random::<usize>() % charset.len();

// ✅ ĐÚNG: Dùng thread_rng() an toàn hơn
let mut rng = rand::thread_rng();
let idx = rng.gen_range(0..charset.len());
```

### Lỗi 3: So Sánh Enum

```rust
// ❌ SAI: Không derive PartialEq
#[derive(Debug)]
enum PasswordStrength { /* ... */ }

// ✅ ĐÚNG: Cần PartialEq để so sánh
#[derive(Debug, PartialEq)]
enum PasswordStrength { /* ... */ }
```

### Lỗi 4: Tính Entropy Sai

```rust
// ❌ SAI: Chỉ dùng length
let entropy = password.len();

// ✅ ĐÚNG: length * log2(charset_size)
let entropy = (password.len() as f64) * (charset_size as f64).log2();
```

## 💪 Thử Thách Nâng Cao

### Thử Thách 1: Passphrase Generator

Tạo passphrase từ danh sách từ (ví dụ: "correct-horse-battery-staple")

<details>
<summary>💡 Gợi ý</summary>

```rust
const WORDS: &[&str] = &["apple", "banana", "cherry", /* ... */];

fn generate_passphrase(word_count: usize, separator: char) -> String {
    let mut rng = rand::thread_rng();
    (0..word_count)
        .map(|_| WORDS[rng.gen_range(0..WORDS.len())])
        .collect::<Vec<_>>()
        .join(&separator.to_string())
}
```
</details>

### Thử Thách 2: Avoid Ambiguous Characters

Tránh các ký tự dễ nhầm lẫn: `0O`, `1lI`, `5S`, `8B`

<details>
<summary>💡 Gợi ý</summary>

```rust
fn get_unambiguous_charset() -> Vec<char> {
    "abcdefghjkmnpqrstuvwxyz\
     ABCDEFGHJKLMNPQRSTUVWXYZ\
     23456789\
     !@#$%^&*()"
        .chars()
        .collect()
}
```
</details>

### Thử Thách 3: Copy to Clipboard

Tự động copy password vào clipboard.

<details>
<summary>💡 Gợi ý</summary>

Thêm vào `Cargo.toml`:
```toml
[dependencies]
clipboard = "0.5"
```

Code:
```rust
use clipboard::{ClipboardProvider, ClipboardContext};

fn copy_to_clipboard(text: &str) -> Result<(), Box<dyn std::error::Error>> {
    let mut ctx: ClipboardContext = ClipboardProvider::new()?;
    ctx.set_contents(text.to_string())?;
    Ok(())
}
```
</details>

### Thử Thách 4: Password History

Lưu lịch sử các password đã tạo (CHỈ metadata, KHÔNG lưu password thật!)

<details>
<summary>💡 Gợi ý</summary>

```rust
use chrono::Local;

struct PasswordMetadata {
    created_at: String,
    length: usize,
    strength: PasswordStrength,
}

fn save_metadata(metadata: &PasswordMetadata) {
    // Lưu vào file JSON
}
```
</details>

### Thử Thách 5: Pronounceable Passwords

Tạo mật khẩu có thể phát âm được (alternating consonants và vowels)

<details>
<summary>💡 Gợi ý</summary>

```rust
const VOWELS: &str = "aeiou";
const CONSONANTS: &str = "bcdfghjklmnprstvwxyz";

fn generate_pronounceable(length: usize) -> String {
    let mut rng = rand::thread_rng();
    let mut result = String::new();

    for i in 0..length {
        let chars = if i % 2 == 0 { CONSONANTS } else { VOWELS };
        let idx = rng.gen_range(0..chars.len());
        result.push(chars.chars().nth(idx).unwrap());
    }

    result
}
```
</details>

## 📚 Kiến Thức Đã Học

✅ **Random Generation**: `rand` crate và `thread_rng()`
✅ **Character Sets**: Làm việc với các tập ký tự khác nhau
✅ **Structs & Options**: Tổ chức cấu hình
✅ **Enums**: Định nghĩa các trạng thái (strength levels)
✅ **Match Expressions**: Pattern matching cho logic
✅ **Iterators**: `filter_map()`, `collect()`, `map()`
✅ **Entropy Calculation**: Tính toán độ mạnh mật khẩu
✅ **User Input**: Xử lý và validate input
✅ **Error Handling**: Result type cho error propagation

## 🔒 Security Best Practices

1. **Dùng Cryptographically Secure RNG**: `thread_rng()` thay vì `random()`
2. **Độ dài tối thiểu**: Ít nhất 12-16 ký tự
3. **Entropy cao**: Kết hợp nhiều loại ký tự
4. **Không lưu password**: Chỉ lưu metadata nếu cần
5. **Clear memory**: Xóa password khỏi memory sau khi dùng

## 🎯 Bước Tiếp Theo

➡️ **Tiếp theo**: [Markdown Parser](markdown-parser.md)
➡️ **Hoặc**: [Mini Grep Tool](grep-clone.md)
➡️ **Quay lại**: [Todo CLI](todo-cli.md)

---

🎉 **Tuyệt vời! Bạn đã tạo được Password Generator an toàn!** 🔐
