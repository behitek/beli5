---
sidebar_position: 2
title: 🧮 Máy Tính Đơn Giản
description: Xây dựng máy tính console với Rust - Học về functions, pattern matching, và xử lý input
keywords: [rust, project, calculator, arithmetic, functions, beginner, máy tính]
---

# 🧮 Máy Tính Đơn Giản

## 🎯 Mục Tiêu Dự Án

Xây dựng một **máy tính console** có thể thực hiện các phép toán cơ bản:
- ➕ Cộng (Addition)
- ➖ Trừ (Subtraction)
- ✖️ Nhân (Multiplication)
- ➗ Chia (Division)
- 📐 Modulo (Chia lấy dư)
- 🔢 Lũy thừa (Power)

### Bạn Sẽ Học Được
- ✅ Xử lý nhiều loại phép toán với `match`
- ✅ Tạo functions để tổ chức code
- ✅ Parse và validate input
- ✅ Xử lý lỗi chia cho 0
- ✅ Làm việc với floating-point numbers

## 📦 Bước 1: Tạo Project

```bash
cargo new calculator
cd calculator
```

## 🎮 Bước 2: Version 1 - Basic Calculator

Mở `src/main.rs`:

```rust
use std::io;

fn main() {
    println!("🧮 Máy Tính Đơn Giản");
    println!("====================");

    loop {
        println!("\n📝 Nhập phép toán (ví dụ: 5 + 3):");
        println!("💡 Hoặc gõ 'exit' để thoát");

        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("❌ Không đọc được input!");

        let input = input.trim();

        // Kiểm tra thoát
        if input.to_lowercase() == "exit" {
            println!("👋 Tạm biệt!");
            break;
        }

        // Tách input thành các phần
        let parts: Vec<&str> = input.split_whitespace().collect();

        // Kiểm tra format đúng: số toán_tử số
        if parts.len() != 3 {
            println!("⚠️  Format không đúng! Ví dụ: 5 + 3");
            continue;
        }

        // Parse số thứ nhất
        let num1: f64 = match parts[0].parse() {
            Ok(n) => n,
            Err(_) => {
                println!("⚠️  '{}' không phải là số!", parts[0]);
                continue;
            }
        };

        // Lấy toán tử
        let operator = parts[1];

        // Parse số thứ hai
        let num2: f64 = match parts[2].parse() {
            Ok(n) => n,
            Err(_) => {
                println!("⚠️  '{}' không phải là số!", parts[2]);
                continue;
            }
        };

        // Tính toán
        let result = match operator {
            "+" => num1 + num2,
            "-" => num1 - num2,
            "*" => num1 * num2,
            "/" => {
                if num2 == 0.0 {
                    println!("⚠️  Không thể chia cho 0!");
                    continue;
                }
                num1 / num2
            },
            "%" => {
                if num2 == 0.0 {
                    println!("⚠️  Không thể chia cho 0!");
                    continue;
                }
                num1 % num2
            },
            _ => {
                println!("⚠️  Toán tử không hợp lệ: {}", operator);
                println!("💡 Các toán tử hợp lệ: + - * / %");
                continue;
            }
        };

        // Hiển thị kết quả
        println!("✅ {} {} {} = {}", num1, operator, num2, result);
    }
}
```

## 🚀 Chạy Thử

```bash
cargo run
```

**Output mẫu:**
```
🧮 Máy Tính Đơn Giản
====================

📝 Nhập phép toán (ví dụ: 5 + 3):
💡 Hoặc gõ 'exit' để thoát
10 + 5
✅ 10 + 5 = 15

📝 Nhập phép toán (ví dụ: 5 + 3):
💡 Hoặc gõ 'exit' để thoát
20 / 4
✅ 20 / 4 = 5

📝 Nhập phép toán (ví dụ: 5 + 3):
💡 Hoặc gõ 'exit' để thoát
15 * 3
✅ 15 * 3 = 45
```

## 📖 Giải Thích Code

### 1. Split Input

```rust
let parts: Vec<&str> = input.split_whitespace().collect();
```

- `split_whitespace()`: Tách chuỗi theo khoảng trắng
- `collect()`: Tập hợp thành Vector
- Ví dụ: `"5 + 3"` → `["5", "+", "3"]`

### 2. Parse Numbers

```rust
let num1: f64 = match parts[0].parse() {
    Ok(n) => n,           // Parse thành công
    Err(_) => {           // Parse thất bại
        println!("Không phải số!");
        continue;         // Quay lại đầu loop
    }
};
```

- `f64`: Số thực (có thể có dấu phẩy)
- `.parse()`: Chuyển string thành số

### 3. Match Operator

```rust
let result = match operator {
    "+" => num1 + num2,
    "-" => num1 - num2,
    "*" => num1 * num2,
    "/" => {
        if num2 == 0.0 {
            // Xử lý chia cho 0
            continue;
        }
        num1 / num2
    },
    _ => {
        // Toán tử không hợp lệ
        continue;
    }
};
```

## 🎨 Bước 3: Version 2 - Với Functions

Tổ chức code tốt hơn với functions:

```rust
use std::io;

fn main() {
    println!("🧮 Máy Tính Đơn Giản - Version 2");
    println!("=================================");
    print_help();

    loop {
        let input = get_input();

        if input.to_lowercase() == "exit" {
            println!("👋 Tạm biệt!");
            break;
        }

        if input.to_lowercase() == "help" {
            print_help();
            continue;
        }

        match process_calculation(&input) {
            Ok(result) => println!("✅ Kết quả: {}", result),
            Err(err) => println!("⚠️  Lỗi: {}", err),
        }
    }
}

fn get_input() -> String {
    println!("\n📝 Nhập phép toán:");
    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("❌ Không đọc được input!");
    input.trim().to_string()
}

fn print_help() {
    println!("\n💡 Hướng dẫn sử dụng:");
    println!("  • Cộng:        5 + 3");
    println!("  • Trừ:         10 - 4");
    println!("  • Nhân:        6 * 7");
    println!("  • Chia:        20 / 4");
    println!("  • Chia lấy dư: 10 % 3");
    println!("  • Lũy thừa:    2 ^ 8");
    println!("  • Trợ giúp:    help");
    println!("  • Thoát:       exit");
}

fn process_calculation(input: &str) -> Result<f64, String> {
    let parts: Vec<&str> = input.split_whitespace().collect();

    if parts.len() != 3 {
        return Err("Format không đúng! Ví dụ: 5 + 3".to_string());
    }

    let num1 = parse_number(parts[0])?;
    let operator = parts[1];
    let num2 = parse_number(parts[2])?;

    calculate(num1, operator, num2)
}

fn parse_number(s: &str) -> Result<f64, String> {
    s.parse::<f64>()
        .map_err(|_| format!("'{}' không phải là số hợp lệ!", s))
}

fn calculate(num1: f64, operator: &str, num2: f64) -> Result<f64, String> {
    match operator {
        "+" => Ok(num1 + num2),
        "-" => Ok(num1 - num2),
        "*" | "x" | "×" => Ok(num1 * num2),
        "/" | "÷" => {
            if num2 == 0.0 {
                Err("Không thể chia cho 0!".to_string())
            } else {
                Ok(num1 / num2)
            }
        },
        "%" => {
            if num2 == 0.0 {
                Err("Không thể chia cho 0!".to_string())
            } else {
                Ok(num1 % num2)
            }
        },
        "^" | "**" => Ok(num1.powf(num2)),
        _ => Err(format!("Toán tử không hợp lệ: '{}'", operator)),
    }
}
```

## 🎨 Bước 4: Version 3 - Advanced Features

Thêm nhiều tính năng hơn:

```rust
use std::io;

fn main() {
    println!("🧮 Máy Tính Nâng Cao");
    println!("=====================");
    print_help();

    let mut history: Vec<String> = Vec::new();

    loop {
        let input = get_input();
        let input_lower = input.to_lowercase();

        match input_lower.as_str() {
            "exit" | "quit" => {
                println!("👋 Tạm biệt!");
                break;
            },
            "help" => {
                print_help();
                continue;
            },
            "history" => {
                print_history(&history);
                continue;
            },
            "clear" => {
                history.clear();
                println!("✅ Đã xóa lịch sử!");
                continue;
            },
            _ => {}
        }

        match process_calculation(&input) {
            Ok(result) => {
                let calculation = format!("{} = {}", input, result);
                println!("✅ {}", calculation);
                history.push(calculation);
            },
            Err(err) => println!("⚠️  {}", err),
        }
    }
}

fn get_input() -> String {
    print!("\n📝 > ");
    use std::io::Write;
    std::io::stdout().flush().unwrap();

    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("❌ Không đọc được input!");
    input.trim().to_string()
}

fn print_help() {
    println!("\n💡 Lệnh hỗ trợ:");
    println!("  • help     - Hiển thị trợ giúp");
    println!("  • history  - Xem lịch sử tính toán");
    println!("  • clear    - Xóa lịch sử");
    println!("  • exit     - Thoát chương trình");
    println!("\n🔢 Các phép toán:");
    println!("  • Cộng:        5 + 3");
    println!("  • Trừ:         10 - 4");
    println!("  • Nhân:        6 * 7");
    println!("  • Chia:        20 / 4");
    println!("  • Chia lấy dư: 10 % 3");
    println!("  • Lũy thừa:    2 ^ 8");
    println!("  • Căn bậc 2:   sqrt 16");
    println!("  • Giá trị tuyệt đối: abs -5");
}

fn print_history(history: &Vec<String>) {
    if history.is_empty() {
        println!("📋 Chưa có lịch sử tính toán!");
        return;
    }

    println!("\n📋 Lịch sử tính toán:");
    for (i, calc) in history.iter().enumerate() {
        println!("  {}. {}", i + 1, calc);
    }
}

fn process_calculation(input: &str) -> Result<f64, String> {
    // Xử lý hàm một tham số (sqrt, abs, etc.)
    if let Some(result) = process_single_arg_function(input) {
        return result;
    }

    // Xử lý phép toán hai tham số
    let parts: Vec<&str> = input.split_whitespace().collect();

    if parts.len() != 3 {
        return Err("Format không đúng! Ví dụ: 5 + 3".to_string());
    }

    let num1 = parse_number(parts[0])?;
    let operator = parts[1];
    let num2 = parse_number(parts[2])?;

    calculate(num1, operator, num2)
}

fn process_single_arg_function(input: &str) -> Option<Result<f64, String>> {
    let parts: Vec<&str> = input.split_whitespace().collect();

    if parts.len() != 2 {
        return None;
    }

    let function = parts[0].to_lowercase();
    let num = match parse_number(parts[1]) {
        Ok(n) => n,
        Err(e) => return Some(Err(e)),
    };

    match function.as_str() {
        "sqrt" | "√" => {
            if num < 0.0 {
                Some(Err("Không thể tính căn bậc hai của số âm!".to_string()))
            } else {
                Some(Ok(num.sqrt()))
            }
        },
        "abs" => Some(Ok(num.abs())),
        "sin" => Some(Ok(num.to_radians().sin())),
        "cos" => Some(Ok(num.to_radians().cos())),
        "tan" => Some(Ok(num.to_radians().tan())),
        "ln" => {
            if num <= 0.0 {
                Some(Err("Logarit tự nhiên chỉ cho số dương!".to_string()))
            } else {
                Some(Ok(num.ln()))
            }
        },
        _ => None,
    }
}

fn parse_number(s: &str) -> Result<f64, String> {
    s.parse::<f64>()
        .map_err(|_| format!("'{}' không phải là số hợp lệ!", s))
}

fn calculate(num1: f64, operator: &str, num2: f64) -> Result<f64, String> {
    match operator {
        "+" => Ok(num1 + num2),
        "-" => Ok(num1 - num2),
        "*" | "x" | "×" => Ok(num1 * num2),
        "/" | "÷" => {
            if num2 == 0.0 {
                Err("Không thể chia cho 0!".to_string())
            } else {
                Ok(num1 / num2)
            }
        },
        "%" => {
            if num2 == 0.0 {
                Err("Không thể chia cho 0!".to_string())
            } else {
                Ok(num1 % num2)
            }
        },
        "^" | "**" => Ok(num1.powf(num2)),
        _ => Err(format!("Toán tử không hợp lệ: '{}'", operator)),
    }
}
```

**Tính năng mới:**
- 📋 Lưu lịch sử tính toán
- 🔢 Hàm toán học: sqrt, abs, sin, cos, tan, ln
- 🎨 Interface thân thiện hơn

## 🐛 Lỗi Thường Gặp

### Lỗi 1: Không Xử Lý Chia Cho 0

```rust
// ❌ SAI: Crash khi chia cho 0
"/" => num1 / num2,

// ✅ ĐÚNG: Kiểm tra trước
"/" => {
    if num2 == 0.0 {
        return Err("Không thể chia cho 0!".to_string());
    }
    num1 / num2
}
```

### Lỗi 2: So Sánh Float Không Chính Xác

```rust
// ❌ SAI: Float có thể không chính xác tuyệt đối
if num2 == 0.0 { }

// ✅ TỐT HƠN: Dùng epsilon
if num2.abs() < 1e-10 { }
```

### Lỗi 3: Không Xử Lý Số Âm

```rust
// Input: -5 + 3
// Vector: ["-5", "+", "3"]  ✅ OK

// Input: 5 + -3
// Vector: ["5", "+", "-3"]  ✅ OK

// Input: -5 + -3
// Vector: ["-5", "+", "-3"] ✅ OK
```

## 💪 Thử Thách Nâng Cao

### Thử Thách 1: Calculator Với Dấu Ngoặc

Hỗ trợ: `(5 + 3) * 2`

<details>
<summary>💡 Gợi ý</summary>

Dùng thuật toán **Shunting Yard** hoặc **Recursive Descent Parser**
</details>

### Thử Thách 2: Lưu Lịch Sử Ra File

Lưu tất cả phép toán vào file `history.txt`

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::fs::OpenOptions;
use std::io::Write;

fn save_to_history(calculation: &str) -> std::io::Result<()> {
    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open("history.txt")?;
    writeln!(file, "{}", calculation)?;
    Ok(())
}
```
</details>

### Thử Thách 3: Biến Số

Cho phép lưu kết quả vào biến:
```
> x = 5 + 3
✅ x = 8
> y = x * 2
✅ y = 16
> x + y
✅ 24
```

## 📚 Kiến Thức Đã Học

✅ **String Processing**: `split_whitespace()`, `collect()`
✅ **Parsing**: Chuyển string thành số
✅ **Pattern Matching**: Match nhiều cases
✅ **Functions**: Tổ chức code thành functions
✅ **Result Type**: Trả về `Result<T, E>` cho error handling
✅ **Vectors**: Lưu trữ lịch sử
✅ **Input/Output**: Đọc và in dữ liệu
✅ **Float Operations**: Toán học với `f64`

## 🎯 Bước Tiếp Theo

➡️ **Tiếp theo**: [Chuyển Đổi Nhiệt Độ](temperature-converter.md)
➡️ **Hoặc**: [FizzBuzz Challenge](fizzbuzz.md)

---

🎉 **Tuyệt vời! Bạn đã có một máy tính hoạt động!** 🧮
