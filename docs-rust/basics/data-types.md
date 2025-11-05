---
sidebar_position: 8
title: Các Kiểu Dữ Liệu Cơ Bản
description: Học về integers, floats, booleans, characters và các kiểu dữ liệu scalar trong Rust
keywords: [rust, data types, integers, floats, boolean, char, scalar types, i32, u32, f64, eli5]
---

# 🔢 Các Kiểu Dữ Liệu Cơ Bản

## Kiểu Dữ Liệu Là Gì?

**Kiểu dữ liệu** (data type) cho Rust biết loại giá trị và cách lưu trữ trong bộ nhớ.

:::tip Giải Thích Cho Bạn 5 Tuổi
Kiểu dữ liệu giống như **loại hộp** để đựng đồ:
- 📦 **Hộp số nguyên**: Đựng số không dấu phẩy (1, 2, 3)
- 🎁 **Hộp số thực**: Đựng số có dấu phẩy (3.14, 2.5)
- ✅ **Hộp đúng/sai**: Đựng true/false
- 🔤 **Hộp ký tự**: Đựng một chữ cái ('A', '🦀')

Mỗi loại hộp có **kích thước và công dụng riêng**! 📏
:::

## 🎯 Hai Loại Chính

Rust có 2 categories:

### 1. Scalar Types (Kiểu Vô Hướng)
Một giá trị đơn:
- Integers (số nguyên)
- Floating-point (số thực)
- Booleans (đúng/sai)
- Characters (ký tự)

### 2. Compound Types (Kiểu Phức Hợp)
Nhiều giá trị gộp lại:
- Tuples
- Arrays

**Bài này học Scalar Types!**

## 🔢 Integers (Số Nguyên)

Số không có phần thập phân: `1`, `42`, `-100`

### Các Loại Integers

| Độ dài | Có dấu | Không dấu | Phạm vi (có dấu) |
|--------|--------|-----------|------------------|
| 8-bit | `i8` | `u8` | -128 đến 127 |
| 16-bit | `i16` | `u16` | -32,768 đến 32,767 |
| 32-bit | `i32` | `u32` | -2 tỷ đến 2 tỷ |
| 64-bit | `i64` | `u64` | -9 triệu tỷ đến 9 triệu tỷ |
| 128-bit | `i128` | `u128` | Cực lớn! |
| arch | `isize` | `usize` | Phụ thuộc CPU |

**Giải thích:**
- `i` = **i**nteger có dấu (âm/dương)
- `u` = **u**nsigned (chỉ dương)
- Số = số bits

### `i32` - Default Choice

```rust
fn main() {
    let x = 42;  // Rust mặc định dùng i32
    let y: i32 = 100;

    println!("x = {}, y = {}", x, y);
}
```

**Tại sao i32?**
- ✅ Đủ lớn cho hầu hết cases
- ✅ Nhanh nhất trên CPU 32-bit và 64-bit
- ✅ Cân bằng giữa size và performance

### Có Dấu vs Không Dấu

```rust
fn main() {
    // i32 - Có dấu (có thể âm)
    let temperature: i32 = -10;
    let debt: i32 = -5000;

    // u32 - Không dấu (chỉ dương)
    let age: u32 = 20;
    let score: u32 = 9500;

    println!("Nhiệt độ: {}°C", temperature);
    println!("Tuổi: {}", age);
}
```

**Khi nào dùng?**
- `i32/i64`: Khi có thể âm (nhiệt độ, tọa độ, balance)
- `u32/u64`: Khi chắc chắn dương (tuổi, số lượng, index)

### Integer Literals (Cách Viết Số)

```rust
fn main() {
    let decimal = 98_222;          // Thập phân (có _ để dễ đọc)
    let hex = 0xff;                 // Thập lục phân
    let octal = 0o77;               // Bát phân
    let binary = 0b1111_0000;       // Nhị phân
    let byte = b'A';                // Byte (chỉ u8)

    println!("Decimal: {}", decimal);
    println!("Hex: {}", hex);
    println!("Octal: {}", octal);
    println!("Binary: {}", binary);
    println!("Byte: {}", byte);
}
```

**Kết quả:**
```
Decimal: 98222
Hex: 255
Octal: 63
Binary: 240
Byte: 65
```

### Type Suffix

Chỉ định kiểu ngay trong số:

```rust
fn main() {
    let x = 42u8;      // u8
    let y = 100_i32;   // i32
    let z = 1000u64;   // u64

    println!("x: {}, y: {}, z: {}", x, y, z);
}
```

### Integer Overflow

**Vấn đề:** Số quá lớn cho kiểu dữ liệu!

```rust
fn main() {
    let x: u8 = 255;  // Max của u8
    // let y: u8 = 256;  // ❌ Compile error! Quá lớn!
}
```

**Debug mode:**
- Rust panic (crash) khi overflow

**Release mode:**
- Overflow "wrap around" (quay vòng)
- 256 → 0, 257 → 1, ...

**Xử lý an toàn:**

```rust
fn main() {
    let x: u8 = 250;

    // Checked - Trả về Option
    let result = x.checked_add(10);
    println!("{:?}", result);  // None (vì overflow)

    // Wrapping - Quay vòng
    let result = x.wrapping_add(10);
    println!("{}", result);  // 4 (250 + 10 = 260 → 4)

    // Saturating - Dừng ở max
    let result = x.saturating_add(10);
    println!("{}", result);  // 255 (max của u8)

    // Overflowing - Trả về (result, overflow bool)
    let (result, overflow) = x.overflowing_add(10);
    println!("{}, overflow: {}", result, overflow);  // 4, overflow: true
}
```

## 🎈 Floating-Point (Số Thực)

Số có dấu phẩy: `3.14`, `2.5`, `-0.5`

### Hai Loại

```rust
fn main() {
    let x = 2.0;       // f64 (mặc định)
    let y: f32 = 3.0;  // f32

    println!("x: {}, y: {}", x, y);
}
```

| Kiểu | Bits | Độ chính xác | Khi nào dùng |
|------|------|--------------|--------------|
| `f32` | 32 | ~6-7 chữ số | Đồ họa, không cần chính xác cao |
| `f64` | 64 | ~15-16 chữ số | Tính toán khoa học, tài chính |

**Khuyến nghị:** Dùng `f64` (chính xác hơn, không chậm hơn)

### Ví Dụ

```rust
fn main() {
    let pi = 3.14159265359;
    let e = 2.71828;
    let negative = -0.5;

    println!("π ≈ {}", pi);
    println!("e ≈ {}", e);
    println!("Negative: {}", negative);

    // Tính diện tích hình tròn
    let radius = 5.0;
    let area = pi * radius * radius;
    println!("Diện tích: {:.2}", area);
}
```

**Kết quả:**
```
π ≈ 3.14159265359
e ≈ 2.71828
Negative: -0.5
Diện tích: 78.54
```

### ⚠️ Floating-Point Precision

```rust
fn main() {
    let x = 0.1 + 0.2;
    println!("{}", x);  // 0.30000000000000004 (không phải 0.3!)

    // So sánh floats
    let epsilon = 1e-10;
    if (x - 0.3).abs() < epsilon {
        println!("Gần bằng 0.3");
    }
}
```

**Lưu ý:**
- ❌ Đừng dùng `==` với floats
- ✅ Dùng `(a - b).abs() < epsilon`

### Special Values

```rust
fn main() {
    let inf = f64::INFINITY;
    let neg_inf = f64::NEG_INFINITY;
    let nan = f64::NAN;

    println!("Infinity: {}", inf);
    println!("Negative Infinity: {}", neg_inf);
    println!("Not a Number: {}", nan);

    // Kiểm tra
    println!("Is NaN: {}", nan.is_nan());
    println!("Is finite: {}", (10.5).is_finite());
}
```

## ✅ Boolean

Đúng hoặc Sai: `true` / `false`

### Khai Báo

```rust
fn main() {
    let is_rust_cool = true;
    let is_python_slow = true;
    let is_tired: bool = false;

    println!("Rust cool? {}", is_rust_cool);
    println!("Python slow? {}", is_python_slow);
    println!("Tired? {}", is_tired);
}
```

### Kích Thước

**1 byte** (8 bits) - Nhưng chỉ dùng 1 bit!

```rust
use std::mem;

fn main() {
    println!("Size of bool: {} byte", mem::size_of::<bool>());
}
```

### Dùng Trong Điều Kiện

```rust
fn main() {
    let age = 18;
    let is_adult = age >= 18;

    if is_adult {
        println!("Bạn đã trưởng thành!");
    } else {
        println!("Bạn còn nhỏ!");
    }
}
```

### Logic Operations (Sẽ học kỹ sau)

```rust
fn main() {
    let a = true;
    let b = false;

    println!("AND: {}", a && b);  // false
    println!("OR: {}", a || b);   // true
    println!("NOT: {}", !a);      // false
}
```

## 🔤 Character (Ký Tự)

**Một** ký tự Unicode: `'A'`, `'😊'`, `'あ'`

### Khai Báo

```rust
fn main() {
    let letter = 'A';
    let emoji = '😊';
    let chinese = '中';
    let vietnamese = 'ế';

    println!("Letter: {}", letter);
    println!("Emoji: {}", emoji);
    println!("Chinese: {}", chinese);
    println!("Vietnamese: {}", vietnamese);
}
```

**Lưu ý:**
- Dùng **dấu ngoặc đơn** `'A'` (không phải `"A"`)
- `char` ≠ String!

### Kích Thước

**4 bytes** - Hỗ trợ Unicode!

```rust
use std::mem;

fn main() {
    let c = 'A';
    println!("Size of char: {} bytes", mem::size_of::<char>());
}
```

### Unicode Scalar Value

```rust
fn main() {
    // ASCII
    let a = 'A';
    println!("'A' = U+{:04X}", a as u32);  // U+0041

    // Emoji
    let crab = '🦀';
    println!("'🦀' = U+{:04X}", crab as u32);  // U+1F980

    // Vietnamese
    let o_horn = 'ơ';
    println!("'ơ' = U+{:04X}", o_horn as u32);  // U+01A1
}
```

### `char` vs String

```rust
fn main() {
    // char - Một ký tự
    let c: char = 'A';

    // String - Nhiều ký tự
    let s: &str = "ABC";

    // ❌ Lỗi - Không thể dùng "" cho char
    // let c: char = "A";

    // ❌ Lỗi - Không thể dùng '' cho string
    // let s: &str = 'A';
}
```

## 📏 Type Conversion (Chuyển Đổi Kiểu)

### Explicit Casting Với `as`

```rust
fn main() {
    // Integer to integer
    let x: i32 = 100;
    let y: i64 = x as i64;
    println!("i32 → i64: {}", y);

    // Integer to float
    let a: i32 = 42;
    let b: f64 = a as f64;
    println!("i32 → f64: {}", b);

    // Float to integer (truncate)
    let c: f64 = 3.99;
    let d: i32 = c as i32;
    println!("f64 → i32: {} (truncated)", d);  // 3

    // char to integer
    let ch: char = 'A';
    let code: u32 = ch as u32;
    println!("'A' → u32: {}", code);  // 65
}
```

### ⚠️ Lossy Conversions

```rust
fn main() {
    // Mất độ chính xác
    let big: i64 = 9_999_999_999;
    let small: i32 = big as i32;  // Overflow!
    println!("{}", small);  // Không phải 9999999999!

    // Float to int - Mất phần thập phân
    let pi = 3.14159;
    let truncated = pi as i32;
    println!("{}", truncated);  // 3
}
```

### Type Inference

Rust thông minh!

```rust
fn main() {
    let x = 5;  // Rust biết là i32

    // Rust suy luận từ context
    let y = x + 10;  // y cũng là i32

    // From function return type
    let s: String = "42".parse().unwrap();  // parse biết trả về String
}
```

## 📊 Chọn Kiểu Nào?

### Integers

```rust
fn main() {
    // Age - Luôn dương, < 150
    let age: u8 = 25;

    // Population - Lớn, dương
    let population: u64 = 100_000_000;

    // Temperature - Có thể âm
    let temp: i32 = -10;

    // Array index - Dương
    let index: usize = 5;

    // Money (cents) - Có thể âm (debt)
    let balance: i64 = -5000;
}
```

### Floats

```rust
fn main() {
    // Price - Cần chính xác
    let price: f64 = 19.99;

    // Pi - Cần chính xác
    let pi: f64 = 3.14159265359;

    // Game position - Không cần quá chính xác
    let x: f32 = 100.5;
}
```

### Best Practices

| Tình huống | Kiểu | Lý do |
|------------|------|-------|
| Đếm, số lượng | `i32` / `u32` | Default, đủ lớn |
| Array index | `usize` | Khớp với size_t |
| Tiền, tài chính | `f64` hoặc integer (cents) | Chính xác |
| Tuổi | `u8` | 0-255 đủ |
| ID, key | `u64` | Đủ lớn, không trùng |
| Đúng/Sai | `bool` | Rõ ràng |

## 🎯 Thực Hành

### Bài Tập 1: Chọn Kiểu Đúng

Chọn kiểu phù hợp cho mỗi biến:

```rust
fn main() {
    let age = 20;           // Kiểu gì?
    let pi = 3.14159;       // Kiểu gì?
    let is_student = true;  // Kiểu gì?
    let grade = 'A';        // Kiểu gì?
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let age: u8 = 20;              // u8 (tuổi không âm, < 255)
    let pi: f64 = 3.14159;         // f64 (cần chính xác)
    let is_student: bool = true;   // bool (đúng/sai)
    let grade: char = 'A';         // char (một ký tự)
}
```

</details>

### Bài Tập 2: Type Conversion

Sửa lỗi trong code:

```rust
fn main() {
    let x: i32 = 42;
    let y: f64 = 3.14;
    let result = x + y;  // ❌ Lỗi!
    println!("{}", result);
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let x: i32 = 42;
    let y: f64 = 3.14;

    // Cách 1: Convert x thành f64
    let result = x as f64 + y;
    println!("{}", result);

    // Cách 2: Convert y thành i32 (mất độ chính xác)
    let result = x + y as i32;
    println!("{}", result);
}
```

</details>

### Bài Tập 3: BMI Calculator

Tính BMI với kiểu dữ liệu đúng:

```rust
fn main() {
    let weight = 65.5;  // kg
    let height = 1.70;  // mét

    // TODO: Tính BMI = weight / (height * height)
    // TODO: In kết quả với 2 chữ số thập phân
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let weight: f64 = 65.5;  // kg
    let height: f64 = 1.70;   // mét

    let bmi = weight / (height * height);

    println!("Cân nặng: {} kg", weight);
    println!("Chiều cao: {} m", height);
    println!("BMI: {:.2}", bmi);

    // Phân loại
    if bmi < 18.5 {
        println!("Thiếu cân");
    } else if bmi < 25.0 {
        println!("Bình thường");
    } else if bmi < 30.0 {
        println!("Thừa cân");
    } else {
        println!("Béo phì");
    }
}
```

**Kết quả:**
```
Cân nặng: 65.5 kg
Chiều cao: 1.7 m
BMI: 22.65
Bình thường
```

</details>

## 📚 Tóm Tắt

**Scalar Types:**

| Loại | Kiểu | Ví dụ | Dùng khi |
|------|------|-------|----------|
| **Integer** | `i8`-`i128`, `u8`-`u128` | `42`, `-10` | Số nguyên |
| **Float** | `f32`, `f64` | `3.14`, `-0.5` | Số thực |
| **Boolean** | `bool` | `true`, `false` | Đúng/Sai |
| **Character** | `char` | `'A'`, `'🦀'` | Một ký tự Unicode |

**Defaults:**
- Integer: `i32`
- Float: `f64`

**Type conversion:**
- Dùng `as` keyword
- Explicit, không tự động
- Có thể mất dữ liệu

**Best practices:**
- Dùng `i32` cho integers mặc định
- Dùng `f64` cho floats mặc định
- Dùng `u32/u64` khi chắc chắn không âm
- Dùng `usize` cho array indexing

## 🚀 Bước Tiếp Theo

Bạn đã biết các kiểu dữ liệu cơ bản! Tiếp theo, học về strings - kiểu dữ liệu đặc biệt trong Rust:

➡️ **Tiếp theo**: [Strings: String vs &str](strings-basics)

---

:::tip Lời Khuyên Vàng
**"Chọn kiểu dữ liệu đúng = An toàn + Hiệu quả!"**

Rust cẩn thận về types vì:
- 🛡️ **An toàn**: Không overflow vô tình
- 🚀 **Nhanh**: Compiler tối ưu tốt hơn
- 🐛 **Ít lỗi**: Bắt lỗi lúc compile
- 💾 **Tiết kiệm**: Dùng đúng size

Mất vài phút suy nghĩ về type = Tiết kiệm hàng giờ debug! ✨
:::

**Tiếp theo**: [Strings: String vs &str →](strings-basics)
