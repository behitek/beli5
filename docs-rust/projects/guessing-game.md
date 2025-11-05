---
sidebar_position: 1
title: 🎲 Trò Chơi Đoán Số
description: Xây dựng trò chơi đoán số đầu tiên với Rust - Học về random numbers, user input, loops và error handling
keywords: [rust, project, game, guessing game, random, input, beginner, dự án]
---

# 🎲 Trò Chơi Đoán Số

## 🎯 Mục Tiêu Dự Án

Xây dựng trò chơi đoán số đầu tiên của bạn! Máy tính sẽ nghĩ ra một số ngẫu nhiên từ 1-100, và người chơi phải đoán số đó. Mỗi lần đoán, chương trình sẽ cho biết:
- 📉 "Quá thấp!" - Số bạn đoán nhỏ hơn
- 📈 "Quá cao!" - Số bạn đoán lớn hơn
- 🎉 "Chính xác!" - Bạn đã thắng!

### Bạn Sẽ Học Được
- ✅ Tạo số ngẫu nhiên với crate `rand`
- ✅ Nhận input từ người dùng
- ✅ Sử dụng loops để chơi nhiều lần
- ✅ So sánh số với `Ordering`
- ✅ Xử lý lỗi khi người dùng nhập sai
- ✅ Quản lý dependencies với Cargo

## 📦 Bước 1: Tạo Project Mới

```bash
# Tạo project mới
cargo new guessing_game
cd guessing_game

# Mở project trong editor
code .  # VS Code
# hoặc
idea . # IntelliJ IDEA
```

Cargo sẽ tạo cấu trúc:
```
guessing_game/
├── Cargo.toml
├── src/
│   └── main.rs
```

## 📝 Bước 2: Thêm Dependency

Mở `Cargo.toml` và thêm crate `rand`:

```toml
[package]
name = "guessing_game"
version = "0.1.0"
edition = "2021"

[dependencies]
rand = "0.8.5"
```

:::tip Crate Rand Là Gì?
`rand` là thư viện để tạo số ngẫu nhiên trong Rust. Giống như `random` trong Python!
:::

## 🎮 Bước 3: Viết Code Game

### Version 1: Basic Game

Mở `src/main.rs`:

```rust
use std::io;  // Thư viện nhập xuất
use std::cmp::Ordering;  // So sánh số
use rand::Rng;  // Tạo số ngẫu nhiên

fn main() {
    println!("🎲 Chào mừng đến với trò chơi đoán số!");
    println!("================================");

    // Tạo số ngẫu nhiên từ 1-100
    let secret_number = rand::thread_rng()
        .gen_range(1..=100);

    println!("💡 Tôi đã nghĩ ra một số từ 1 đến 100!");
    println!("❓ Hãy đoán xem!");

    loop {  // Lặp vô hạn cho đến khi đoán đúng
        println!("\n📝 Nhập số của bạn:");

        // Tạo String để lưu input
        let mut guess = String::new();

        // Đọc input từ người dùng
        io::stdin()
            .read_line(&mut guess)
            .expect("❌ Không đọc được input!");

        // Chuyển String thành số u32
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("⚠️  Vui lòng nhập một số hợp lệ!");
                continue;  // Quay lại đầu loop
            }
        };

        println!("🎯 Bạn đoán: {}", guess);

        // So sánh số đoán với số bí mật
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("📉 Quá thấp!"),
            Ordering::Greater => println!("📈 Quá cao!"),
            Ordering::Equal => {
                println!("🎉 Chính xác! Bạn thắng rồi!");
                break;  // Thoát khỏi loop
            }
        }
    }
}
```

## 🚀 Bước 4: Chạy Thử Game

```bash
cargo run
```

**Output mẫu:**
```
🎲 Chào mừng đến với trò chơi đoán số!
================================
💡 Tôi đã nghĩ ra một số từ 1 đến 100!
❓ Hãy đoán xem!

📝 Nhập số của bạn:
50
🎯 Bạn đoán: 50
📈 Quá cao!

📝 Nhập số của bạn:
25
🎯 Bạn đoán: 25
📉 Quá thấp!

📝 Nhập số của bạn:
37
🎯 Bạn đoán: 37
🎉 Chính xác! Bạn thắng rồi!
```

## 📖 Giải Thích Code Chi Tiết

### 1. Import Các Thư Viện

```rust
use std::io;           // Nhập xuất dữ liệu
use std::cmp::Ordering; // Enum để so sánh
use rand::Rng;         // Trait để tạo random
```

### 2. Tạo Số Ngẫu Nhiên

```rust
let secret_number = rand::thread_rng()  // Tạo random generator
    .gen_range(1..=100);                 // Số từ 1 đến 100 (bao gồm 100)
```

- `thread_rng()`: Tạo random number generator cho thread hiện tại
- `gen_range(1..=100)`: Tạo số từ 1 đến 100 (inclusive)
- `..=` nghĩa là bao gồm cả số cuối (100)

### 3. Loop Vô Hạn

```rust
loop {
    // Code ở đây chạy mãi cho đến khi gặp break
}
```

### 4. Đọc Input

```rust
let mut guess = String::new();  // Tạo String rỗng

io::stdin()
    .read_line(&mut guess)      // Đọc vào guess
    .expect("Không đọc được!");  // Xử lý lỗi
```

### 5. Parse String Thành Số

```rust
let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,      // Parse thành công
    Err(_) => {           // Parse thất bại
        println!("Nhập số hợp lệ!");
        continue;         // Quay lại đầu loop
    }
};
```

- `.trim()`: Xóa khoảng trắng và newline
- `.parse()`: Chuyển String thành số
- `match`: Xử lý Result (Ok hoặc Err)

### 6. So Sánh Số

```rust
match guess.cmp(&secret_number) {
    Ordering::Less => println!("Quá thấp!"),
    Ordering::Greater => println!("Quá cao!"),
    Ordering::Equal => {
        println!("Chính xác!");
        break;  // Thoát loop
    }
}
```

## 🎨 Bước 5: Cải Tiến Game

### Version 2: Đếm Số Lần Đoán

```rust
use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
    println!("🎲 Trò Chơi Đoán Số - Phiên Bản Nâng Cấp!");
    println!("==========================================");

    let secret_number = rand::thread_rng().gen_range(1..=100);
    let mut attempts = 0;  // Đếm số lần đoán

    println!("💡 Tôi đã nghĩ ra một số từ 1 đến 100!");
    println!("❓ Bạn có thể đoán trong bao nhiêu lần?");

    loop {
        attempts += 1;
        println!("\n📝 Lần thử #{} - Nhập số của bạn:", attempts);

        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("❌ Không đọc được input!");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => {
                if num < 1 || num > 100 {
                    println!("⚠️  Số phải từ 1 đến 100!");
                    attempts -= 1;  // Không tính lần này
                    continue;
                }
                num
            },
            Err(_) => {
                println!("⚠️  Vui lòng nhập một số hợp lệ!");
                attempts -= 1;  // Không tính lần này
                continue;
            }
        };

        println!("🎯 Bạn đoán: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("📉 Quá thấp! Thử số cao hơn."),
            Ordering::Greater => println!("📈 Quá cao! Thử số thấp hơn."),
            Ordering::Equal => {
                println!("\n🎉 Chúc mừng! Bạn đã đoán đúng!");
                println!("🏆 Số bí mật: {}", secret_number);
                println!("📊 Số lần đoán: {}", attempts);

                // Đánh giá hiệu suất
                if attempts <= 5 {
                    println!("⭐⭐⭐ Xuất sắc!");
                } else if attempts <= 7 {
                    println!("⭐⭐ Khá tốt!");
                } else {
                    println!("⭐ Cố gắng thêm nhé!");
                }
                break;
            }
        }
    }
}
```

### Version 3: Chơi Nhiều Lần

```rust
use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
    println!("🎲 Trò Chơi Đoán Số - Ultimate Edition!");
    println!("========================================");

    loop {
        play_game();

        println!("\n🔄 Bạn muốn chơi lại không? (y/n)");
        let mut answer = String::new();
        io::stdin()
            .read_line(&mut answer)
            .expect("Không đọc được input!");

        if answer.trim().to_lowercase() != "y" {
            println!("👋 Cảm ơn bạn đã chơi! Hẹn gặp lại!");
            break;
        }
    }
}

fn play_game() {
    let secret_number = rand::thread_rng().gen_range(1..=100);
    let mut attempts = 0;

    println!("\n💡 Tôi đã nghĩ ra một số từ 1 đến 100!");

    loop {
        attempts += 1;
        println!("\n📝 Lần thử #{} - Nhập số:", attempts);

        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("Không đọc được input!");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) if num >= 1 && num <= 100 => num,
            _ => {
                println!("⚠️  Nhập số từ 1-100!");
                attempts -= 1;
                continue;
            }
        };

        println!("🎯 Bạn đoán: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("📉 Quá thấp!"),
            Ordering::Greater => println!("📈 Quá cao!"),
            Ordering::Equal => {
                println!("🎉 Chính xác trong {} lần!", attempts);
                break;
            }
        }
    }
}
```

## 🐛 Lỗi Thường Gặp

### Lỗi 1: Quên Thêm Crate `rand`

```
error[E0433]: failed to resolve: use of undeclared crate or module `rand`
```

**Giải pháp:** Thêm `rand = "0.8.5"` vào `Cargo.toml`

### Lỗi 2: Parse Thất Bại

```rust
// ❌ SAI: Không xử lý lỗi
let guess: u32 = guess.trim().parse().unwrap();

// ✅ ĐÚNG: Xử lý với match
let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => continue,
};
```

### Lỗi 3: Quên `mut` Cho Biến Đổi

```rust
// ❌ SAI
let guess = String::new();
io::stdin().read_line(&mut guess);  // Lỗi! guess không mut

// ✅ ĐÚNG
let mut guess = String::new();
io::stdin().read_line(&mut guess);
```

## 💪 Thử Thách Nâng Cao

### Thử Thách 1: Giới Hạn Số Lần Đoán
Thêm giới hạn 10 lần đoán. Nếu hết lần thì thua!

<details>
<summary>💡 Gợi ý</summary>

```rust
let max_attempts = 10;
let mut attempts = 0;

loop {
    attempts += 1;

    if attempts > max_attempts {
        println!("😢 Hết lượt! Số bí mật là: {}", secret_number);
        break;
    }

    // ... code đoán số
}
```
</details>

### Thử Thách 2: Chế Độ Khó

Cho phép người chơi chọn độ khó:
- Dễ: 1-50, không giới hạn lần đoán
- Trung bình: 1-100, 15 lần đoán
- Khó: 1-500, 20 lần đoán

### Thử Thách 3: Lưu High Score

Lưu số lần đoán tốt nhất vào file và hiển thị.

## 📚 Kiến Thức Đã Học

Trong dự án này, bạn đã học:

✅ **Cargo & Dependencies**: Thêm và sử dụng crate bên ngoài
✅ **Random Numbers**: Tạo số ngẫu nhiên với `rand`
✅ **User Input**: Đọc dữ liệu từ console
✅ **Loops**: `loop` và `break`/`continue`
✅ **Pattern Matching**: `match` với `Ordering` và `Result`
✅ **Error Handling**: Xử lý lỗi parse với `match`
✅ **Variables**: Sử dụng `mut` cho biến có thể thay đổi
✅ **Shadowing**: Tái sử dụng tên biến `guess`
✅ **Functions**: Tách code thành functions

## 🎯 Bước Tiếp Theo

Bây giờ bạn đã biết cách:
- Tạo project với Cargo
- Thêm dependencies
- Làm việc với input/output
- Sử dụng loops và match

Sẵn sàng cho dự án tiếp theo?

➡️ **Tiếp theo**: [Máy Tính Đơn Giản](calculator.md) - Xây dựng calculator với các phép toán cơ bản!

## 📖 Tài Nguyên Thêm

- [The Rust Book - Guessing Game](https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html)
- [Crate rand Documentation](https://docs.rs/rand/)
- [std::io Module](https://doc.rust-lang.org/std/io/)
- [std::cmp::Ordering](https://doc.rust-lang.org/std/cmp/enum.Ordering.html)

---

🎉 **Chúc mừng bạn đã hoàn thành dự án đầu tiên!** 🦀
