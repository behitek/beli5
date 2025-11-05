---
sidebar_position: 12
title: Nhận Input Từ Người Dùng
description: Học cách đọc input từ console, parse strings thành numbers, và xử lý errors trong Rust
keywords: [rust, input, stdin, read_line, parse, user input, console, io, Result, expect, eli5]
---

# ⌨️ Nhận Input Từ Người Dùng

## Giới Thiệu

Để chương trình **tương tác** với người dùng, cần nhận input từ bàn phím.

:::tip Giải Thích Cho Bạn 5 Tuổi
Input giống như **nói chuyện với máy tính**:
- 🤖 Máy tính hỏi: "Tên bạn là gì?"
- ⌨️ Bạn gõ: "An"
- 📥 Máy tính nhận: "An"
- 💬 Máy tính trả lời: "Xin chào An!"

Trong Rust, đọc input **phức tạp hơn Python/JavaScript** một chút vì:
- 🛡️ Phải xử lý errors (người dùng có thể nhập sai!)
- 🔄 Phải chuyển đổi kiểu (String → Number)
- ✅ An toàn hơn, nhưng cần nhiều code hơn!
:::

## 📥 Module `std::io`

Để đọc input, cần module `std::io`:

```rust
use std::io;  // Import module

fn main() {
    // Giờ có thể dùng io::stdin()
}
```

## 📖 Đọc String Từ Console

### Bước Cơ Bản

```rust
use std::io;

fn main() {
    println!("Tên bạn là gì?");

    let mut input = String::new();  // 1. Tạo String rỗng

    io::stdin()                      // 2. Lấy stdin
        .read_line(&mut input)       // 3. Đọc vào input
        .expect("Không đọc được");   // 4. Xử lý lỗi

    println!("Xin chào, {}!", input);
}
```

**Giải thích từng bước:**

#### 1. Tạo String Rỗng

```rust
let mut input = String::new();
```

- `mut`: Cần mutable vì sẽ thay đổi
- `String::new()`: Tạo String rỗng

#### 2. Lấy Standard Input

```rust
io::stdin()
```

- `stdin()`: Lấy handle đến standard input (bàn phím)

#### 3. Đọc Dòng

```rust
.read_line(&mut input)
```

- `read_line()`: Đọc một dòng
- `&mut input`: Ghi vào biến input (mutable reference)

#### 4. Xử Lý Lỗi

```rust
.expect("Không đọc được")
```

- `read_line()` trả về `Result<usize, Error>`
- `expect()`: Panic nếu lỗi, hiển thị message

### Ví Dụ Đầy Đủ

```rust
use std::io;

fn main() {
    println!("Nhập tên của bạn:");

    let mut name = String::new();

    io::stdin()
        .read_line(&mut name)
        .expect("Không thể đọc input");

    // Loại bỏ newline
    let name = name.trim();

    println!("Xin chào, {}!", name);
}
```

**Chạy:**
```
Nhập tên của bạn:
An
Xin chào, An!
```

### Vấn Đề Newline

`read_line()` **giữ ký tự newline** `\n`!

```rust
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Error");

    // input = "An\n" (có \n!)
    println!("Input: '{}'", input);
    println!("Length: {}", input.len());  // 3 (A, n, \n)
}
```

**Giải pháp:** Dùng `.trim()`

```rust
let input = input.trim();  // Loại bỏ \n, spaces
```

## 🔢 Parse String Thành Number

### Parse Integer

```rust
use std::io;

fn main() {
    println!("Nhập tuổi:");

    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Error");

    // Parse thành i32
    let age: i32 = input.trim().parse().expect("Không phải số!");

    println!("Năm sau bạn {} tuổi", age + 1);
}
```

**Chạy:**
```
Nhập tuổi:
20
Năm sau bạn 21 tuổi
```

### Parse Float

```rust
use std::io;

fn main() {
    println!("Nhập chiều cao (m):");

    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Error");

    let height: f64 = input.trim().parse().expect("Không phải số!");

    println!("Chiều cao: {:.2}m", height);
}
```

### Turbofish Syntax `::<>`

Cách khác để chỉ định type:

```rust
let age = input.trim().parse::<i32>().expect("Error");
```

**So sánh:**

```rust
// Cách 1: Type annotation
let age: i32 = input.trim().parse().expect("Error");

// Cách 2: Turbofish
let age = input.trim().parse::<i32>().expect("Error");
```

## ✅ Xử Lý Input Sai

### Với `expect()` - Panic Khi Sai

```rust
use std::io;

fn main() {
    println!("Nhập số:");

    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Error");

    // Panic nếu không phải số!
    let num: i32 = input.trim().parse().expect("Phải là số!");

    println!("Bạn nhập: {}", num);
}
```

**Nếu nhập "abc":**
```
thread 'main' panicked at 'Phải là số!: ParseIntError { ... }'
```

### Với `match` - Xử Lý Lỗi

```rust
use std::io;

fn main() {
    println!("Nhập số:");

    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Error");

    match input.trim().parse::<i32>() {
        Ok(num) => println!("Bạn nhập: {}", num),
        Err(_) => println!("Đó không phải là số hợp lệ!"),
    }
}
```

**Chạy:**
```
Nhập số:
abc
Đó không phải là số hợp lệ!
```

### Với `if let` - Ngắn Gọn Hơn

```rust
use std::io;

fn main() {
    println!("Nhập số:");

    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Error");

    if let Ok(num) = input.trim().parse::<i32>() {
        println!("Số hợp lệ: {}", num);
    } else {
        println!("Số không hợp lệ!");
    }
}
```

### Loop Cho Đến Khi Đúng

```rust
use std::io;

fn main() {
    loop {
        println!("Nhập số (1-10):");

        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("Error");

        match input.trim().parse::<i32>() {
            Ok(num) if num >= 1 && num <= 10 => {
                println!("Bạn chọn: {}", num);
                break;  // Thoát loop
            }
            Ok(_) => println!("Số phải từ 1-10!"),
            Err(_) => println!("Không phải số!"),
        }
    }
}
```

## 📝 Ví Dụ Thực Tế

### 1. Calculator Đơn Giản

```rust
use std::io;

fn main() {
    println!("=== MÁY TÍNH ===");

    // Nhập số thứ nhất
    println!("Nhập số thứ nhất:");
    let mut input1 = String::new();
    io::stdin().read_line(&mut input1).expect("Error");
    let num1: f64 = input1.trim().parse().expect("Không phải số!");

    // Nhập phép toán
    println!("Nhập phép toán (+, -, *, /):");
    let mut op = String::new();
    io::stdin().read_line(&mut op).expect("Error");
    let op = op.trim();

    // Nhập số thứ hai
    println!("Nhập số thứ hai:");
    let mut input2 = String::new();
    io::stdin().read_line(&mut input2).expect("Error");
    let num2: f64 = input2.trim().parse().expect("Không phải số!");

    // Tính toán
    let result = match op {
        "+" => num1 + num2,
        "-" => num1 - num2,
        "*" => num1 * num2,
        "/" => num1 / num2,
        _ => {
            println!("Phép toán không hợp lệ!");
            return;
        }
    };

    println!("{} {} {} = {}", num1, op, num2, result);
}
```

### 2. Guess The Number

```rust
use std::io;

fn main() {
    let secret = 42;
    println!("=== ĐOÁN SỐ ===");
    println!("Tôi đã nghĩ ra một số từ 1-100");

    loop {
        println!("\nĐoán xem:");

        let mut guess = String::new();
        io::stdin().read_line(&mut guess).expect("Error");

        let guess: i32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("Vui lòng nhập số!");
                continue;
            }
        };

        if guess < secret {
            println!("Quá nhỏ!");
        } else if guess > secret {
            println!("Quá lớn!");
        } else {
            println!("🎉 Chính xác! Bạn thắng!");
            break;
        }
    }
}
```

### 3. BMI Calculator

```rust
use std::io;

fn get_number(prompt: &str) -> f64 {
    loop {
        println!("{}", prompt);

        let mut input = String::new();
        io::stdin().read_line(&mut input).expect("Error");

        match input.trim().parse::<f64>() {
            Ok(num) if num > 0.0 => return num,
            Ok(_) => println!("Số phải lớn hơn 0!"),
            Err(_) => println!("Không phải số!"),
        }
    }
}

fn main() {
    println!("=== TÍNH CHỈ SỐ BMI ===");

    let weight = get_number("Nhập cân nặng (kg):");
    let height = get_number("Nhập chiều cao (m):");

    let bmi = weight / (height * height);

    println!("\nKết quả:");
    println!("Cân nặng: {} kg", weight);
    println!("Chiều cao: {} m", height);
    println!("BMI: {:.2}", bmi);

    let category = if bmi < 18.5 {
        "Thiếu cân"
    } else if bmi < 25.0 {
        "Bình thường"
    } else if bmi < 30.0 {
        "Thừa cân"
    } else {
        "Béo phì"
    };

    println!("Phân loại: {}", category);
}
```

### 4. Menu Selection

```rust
use std::io;

fn main() {
    loop {
        println!("\n=== MENU ===");
        println!("1. Xem thông tin");
        println!("2. Cài đặt");
        println!("3. Thoát");
        println!("\nChọn (1-3):");

        let mut choice = String::new();
        io::stdin().read_line(&mut choice).expect("Error");

        match choice.trim() {
            "1" => println!("📊 Hiển thị thông tin..."),
            "2" => println!("⚙️ Mở cài đặt..."),
            "3" => {
                println!("👋 Tạm biệt!");
                break;
            }
            _ => println!("❌ Lựa chọn không hợp lệ!"),
        }
    }
}
```

## 💡 Helper Function

Tạo function để đơn giản hóa:

```rust
use std::io;

fn read_string(prompt: &str) -> String {
    println!("{}", prompt);

    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Không đọc được input");

    input.trim().to_string()
}

fn read_number<T: std::str::FromStr>(prompt: &str) -> T
where
    T::Err: std::fmt::Debug
{
    loop {
        let input = read_string(prompt);

        match input.parse::<T>() {
            Ok(num) => return num,
            Err(_) => println!("Không hợp lệ, thử lại!"),
        }
    }
}

fn main() {
    let name = read_string("Tên:");
    let age: i32 = read_number("Tuổi:");

    println!("Xin chào {}, {} tuổi!", name, age);
}
```

## 🎯 Thực Hành

### Bài Tập 1: Hello User

Nhập tên và in lời chào:

```rust
use std::io;

fn main() {
    // TODO: Nhập tên
    // TODO: In "Xin chào, [tên]!"
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
use std::io;

fn main() {
    println!("Tên bạn là gì?");

    let mut name = String::new();
    io::stdin().read_line(&mut name).expect("Error");

    let name = name.trim();

    println!("Xin chào, {}!", name);
}
```

</details>

### Bài Tập 2: Age Calculator

Nhập năm sinh, tính tuổi:

```rust
use std::io;

fn main() {
    let current_year = 2024;

    // TODO: Nhập năm sinh
    // TODO: Tính tuổi
    // TODO: In kết quả
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
use std::io;

fn main() {
    let current_year = 2024;

    println!("Bạn sinh năm nào?");

    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Error");

    let birth_year: i32 = input.trim().parse().expect("Không phải số!");

    let age = current_year - birth_year;

    println!("Bạn {} tuổi (hoặc sắp {})", age - 1, age);
}
```

</details>

### Bài Tập 3: Temperature Converter

Chuyển Celsius sang Fahrenheit:

```rust
use std::io;

fn main() {
    // TODO: Nhập celsius
    // TODO: Tính fahrenheit (F = C * 9/5 + 32)
    // TODO: In kết quả
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
use std::io;

fn main() {
    println!("Nhập nhiệt độ (°C):");

    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Error");

    let celsius: f64 = input.trim().parse().expect("Không phải số!");

    let fahrenheit = celsius * 9.0 / 5.0 + 32.0;

    println!("{}°C = {}°F", celsius, fahrenheit);
}
```

</details>

## 📚 Tóm Tắt

**Đọc string:**
```rust
use std::io;

let mut input = String::new();
io::stdin().read_line(&mut input).expect("Error");
let input = input.trim();  // Loại bỏ \n
```

**Parse number:**
```rust
// Cách 1: Type annotation
let num: i32 = input.parse().expect("Error");

// Cách 2: Turbofish
let num = input.parse::<i32>().expect("Error");
```

**Xử lý lỗi:**
```rust
// expect - Panic nếu sai
let num: i32 = input.parse().expect("Không phải số!");

// match - Xử lý lỗi
match input.parse::<i32>() {
    Ok(num) => println!("{}", num),
    Err(_) => println!("Lỗi!"),
}

// if let - Ngắn gọn
if let Ok(num) = input.parse::<i32>() {
    println!("{}", num);
}
```

**Lưu ý:**
- ⚠️ `read_line()` giữ newline → Dùng `.trim()`
- ⚠️ Parse có thể lỗi → Phải xử lý
- ✅ Loop cho đến khi input đúng
- ✅ Tạo helper functions để reuse

## 🚀 Bước Tiếp Theo

Bạn đã biết nhận input! Tiếp theo, học cách hiểu và xử lý errors:

➡️ **Tiếp theo**: [Lỗi Là Bạn, Không Phải Kẻ Thù!](error-basics)

---

:::tip Lời Khuyên Vàng
**"Input từ user = Nguy hiểm nhất trong programming!"**

Người dùng có thể nhập:
- 🔤 Chữ khi cần số
- 🔢 Số âm khi cần dương
- 📏 Số quá lớn/nhỏ
- 🚫 Empty string
- 💥 Ký tự đặc biệt

**Rust ép bạn xử lý mọi trường hợp!**

Điều này tốt vì:
- 🛡️ Code an toàn hơn
- 🐛 Ít bugs hơn
- ✅ UX tốt hơn

**Mẹo**: Luôn validate input! Loop cho đến khi đúng! 🔄✨
:::

**Tiếp theo**: [Lỗi Là Bạn, Không Phải Kẻ Thù →](error-basics)
