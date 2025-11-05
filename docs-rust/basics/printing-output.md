---
sidebar_position: 5
title: In Thông Tin Ra Màn Hình
description: Học cách sử dụng println!, print!, format strings và in nhiều kiểu dữ liệu trong Rust
keywords: [rust, println, print, format, output, console, debugging, eli5]
---

# 📺 In Thông Tin Ra Màn Hình

## Giới Thiệu

Trong lập trình, chúng ta thường xuyên cần **in thông tin ra màn hình** để:
- 🐛 Debug (tìm lỗi)
- 📊 Hiển thị kết quả
- 💬 Giao tiếp với người dùng
- ✅ Kiểm tra code có chạy đúng không

:::tip Giải Thích Cho Bạn 5 Tuổi
In ra màn hình giống như **robot nói chuyện với bạn**:
- 🤖 Robot có gì muốn nói
- 📢 Robot nói ra loa (màn hình)
- 👂 Bạn nghe (đọc trên màn hình)

`println!` là cách robot nói! 🎙️
:::

## 🎯 Các Cách In Trong Rust

### 1. `println!` - In Và Xuống Dòng

```rust
fn main() {
    println!("Hello");
    println!("World");
}
```

**Kết quả:**
```
Hello
World
```

**Đặc điểm:**
- ✅ In và **tự động xuống dòng**
- ✅ Dùng nhiều nhất

### 2. `print!` - In Không Xuống Dòng

```rust
fn main() {
    print!("Hello ");
    print!("World");
}
```

**Kết quả:**
```
Hello World
```

**Đặc điểm:**
- ⚠️ Không xuống dòng
- ⚠️ Dùng ít hơn

### 3. `eprintln!` - In Lỗi (Error Output)

```rust
fn main() {
    println!("Thông tin bình thường");
    eprintln!("Đây là lỗi!");
}
```

**Kết quả:**
```
Thông tin bình thường
Đây là lỗi!
```

**Đặc điểm:**
- 🔴 In ra **stderr** (standard error)
- ✅ Dùng cho error messages
- ✅ Có thể redirect riêng

### So Sánh

| Macro | Xuống dòng? | Output | Khi nào dùng |
|-------|------------|--------|--------------|
| `println!` | ✅ | stdout | Thông tin bình thường |
| `print!` | ❌ | stdout | In trên cùng 1 dòng |
| `eprintln!` | ✅ | stderr | Thông báo lỗi |
| `eprint!` | ❌ | stderr | Lỗi không xuống dòng |

## 🎨 Format Strings - In Biến

### Placeholder Cơ Bản: `{}`

```rust
fn main() {
    let name = "An";
    let age = 20;

    println!("Tên tôi là {}", name);
    println!("Tôi {} tuổi", age);
}
```

**Kết quả:**
```
Tên tôi là An
Tôi 20 tuổi
```

**Giải thích:**
- `{}` = chỗ trống (placeholder)
- Rust điền giá trị vào `{}`
- Theo thứ tự từ trái sang phải

### Nhiều Placeholders

```rust
fn main() {
    let name = "Bình";
    let age = 25;
    let city = "Hà Nội";

    println!("{} {} tuổi, sống ở {}", name, age, city);
}
```

**Kết quả:**
```
Bình 25 tuổi, sống ở Hà Nội
```

### Named Placeholders (Có Tên)

```rust
fn main() {
    println!("{name} {age} tuổi", name="Cường", age=30);
}
```

**Kết quả:**
```
Cường 30 tuổi
```

**Ưu điểm:**
- ✅ Dễ đọc hơn
- ✅ Không cần đúng thứ tự
- ✅ Có thể dùng lại

### Positional Arguments (Vị Trí)

```rust
fn main() {
    println!("{0} ăn {1}, {0} thích {1}", "An", "phở");
}
```

**Kết quả:**
```
An ăn phở, An thích phở
```

**Giải thích:**
- `{0}` = argument đầu tiên (index 0)
- `{1}` = argument thứ hai (index 1)
- Có thể dùng nhiều lần

## 🔢 In Các Kiểu Dữ Liệu

### Số Nguyên (Integers)

```rust
fn main() {
    let x = 42;
    let y = -15;

    println!("x = {}", x);
    println!("y = {}", y);
    println!("x + y = {}", x + y);
}
```

**Kết quả:**
```
x = 42
y = -15
x + y = 27
```

### Số Thực (Floats)

```rust
fn main() {
    let pi = 3.14159;
    println!("Pi = {}", pi);
}
```

**Kết quả:**
```
Pi = 3.14159
```

### Boolean

```rust
fn main() {
    let is_rust_cool = true;
    println!("Rust có tuyệt không? {}", is_rust_cool);
}
```

**Kết quả:**
```
Rust có tuyệt không? true
```

### Ký Tự (Character)

```rust
fn main() {
    let letter = 'A';
    let emoji = '🦀';

    println!("Chữ cái: {}", letter);
    println!("Emoji: {}", emoji);
}
```

**Kết quả:**
```
Chữ cái: A
Emoji: 🦀
```

### Chuỗi (String)

```rust
fn main() {
    let greeting = "Xin chào";
    let name = String::from("Rust");

    println!("{} {}!", greeting, name);
}
```

**Kết quả:**
```
Xin chào Rust!
```

## 🎭 Format Specifiers - Định Dạng Chi Tiết

### `:?` - Debug Format

Dùng cho kiểu dữ liệu phức tạp:

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    println!("{:?}", numbers);
}
```

**Kết quả:**
```
[1, 2, 3, 4, 5]
```

### `:#?` - Pretty Debug Format

In đẹp hơn cho struct/array phức tạp:

```rust
fn main() {
    let data = vec![
        vec![1, 2, 3],
        vec![4, 5, 6],
        vec![7, 8, 9],
    ];

    println!("{:#?}", data);
}
```

**Kết quả:**
```
[
    [
        1,
        2,
        3,
    ],
    [
        4,
        5,
        6,
    ],
    [
        7,
        8,
        9,
    ],
]
```

### `:b` - Binary (Nhị Phân)

```rust
fn main() {
    let num = 42;
    println!("Binary: {:b}", num);
}
```

**Kết quả:**
```
Binary: 101010
```

### `:x` / `:X` - Hexadecimal (Thập Lục Phân)

```rust
fn main() {
    let num = 255;
    println!("Hex lowercase: {:x}", num);
    println!("Hex uppercase: {:X}", num);
}
```

**Kết quả:**
```
Hex lowercase: ff
Hex uppercase: FF
```

### `:o` - Octal (Bát Phân)

```rust
fn main() {
    let num = 64;
    println!("Octal: {:o}", num);
}
```

**Kết quả:**
```
Octal: 100
```

## 📏 Căn Chỉnh và Padding

### Căn Trái `:<width>`

```rust
fn main() {
    println!("{:<10}|", "left");
}
```

**Kết quả:**
```
left      |
```

### Căn Phải `:>width`

```rust
fn main() {
    println!("{:>10}|", "right");
}
```

**Kết quả:**
```
     right|
```

### Căn Giữa `:^width`

```rust
fn main() {
    println!("{:^10}|", "center");
}
```

**Kết quả:**
```
  center  |
```

### Padding Với Ký Tự Khác

```rust
fn main() {
    println!("{:*<10}|", "left");
    println!("{:*>10}|", "right");
    println!("{:*^10}|", "center");
}
```

**Kết quả:**
```
left******|
*****right|
**center**|
```

### Bảng Đẹp

```rust
fn main() {
    println!("{:<10} | {:>10} | {:^10}", "Name", "Age", "City");
    println!("{:-<10}-+-{:->10}-+-{:-^10}", "", "", "");
    println!("{:<10} | {:>10} | {:^10}", "An", 20, "Hà Nội");
    println!("{:<10} | {:>10} | {:^10}", "Bình", 25, "Đà Nẵng");
}
```

**Kết quả:**
```
Name       |        Age |    City
-----------+-----------+-----------
An         |         20 |  Hà Nội
Bình       |         25 |  Đà Nẵng
```

## 🔢 Format Số

### Số Thập Phân

```rust
fn main() {
    let pi = 3.14159265359;

    println!("Pi: {}", pi);
    println!("Pi (2 decimals): {:.2}", pi);
    println!("Pi (4 decimals): {:.4}", pi);
}
```

**Kết quả:**
```
Pi: 3.14159265359
Pi (2 decimals): 3.14
Pi (4 decimals): 3.1416
```

### Thêm Dấu `+`

```rust
fn main() {
    println!("{:+}", 42);
    println!("{:+}", -42);
}
```

**Kết quả:**
```
+42
-42
```

### Zero Padding

```rust
fn main() {
    println!("{:05}", 42);
    println!("{:08}", 123);
}
```

**Kết quả:**
```
00042
00000123
```

### Kết Hợp

```rust
fn main() {
    let price = 1234.5;
    println!("Price: ${:>10.2}", price);
}
```

**Kết quả:**
```
Price: $   1234.50
```

## 💡 Ví Dụ Thực Tế

### Menu Nhà Hàng

```rust
fn main() {
    println!("╔═══════════════════════════╗");
    println!("║    MENU NHÀ HÀNG RUST    ║");
    println!("╠═══════════════════════════╣");
    println!("║ {:<15} {:>8} ║", "Món ăn", "Giá");
    println!("╠═══════════════════════════╣");
    println!("║ {:<15} {:>6} đ ║", "Phở", "35000");
    println!("║ {:<15} {:>6} đ ║", "Bún chả", "40000");
    println!("║ {:<15} {:>6} đ ║", "Cơm tấm", "38000");
    println!("╚═══════════════════════════╝");
}
```

**Kết quả:**
```
╔═══════════════════════════╗
║    MENU NHÀ HÀNG RUST    ║
╠═══════════════════════════╣
║ Món ăn              Giá ║
╠═══════════════════════════╣
║ Phở              35000 đ ║
║ Bún chả          40000 đ ║
║ Cơm tấm          38000 đ ║
╚═══════════════════════════╝
```

### Progress Bar

```rust
fn main() {
    let progress = 75;
    let bar_width = 20;
    let filled = progress * bar_width / 100;

    print!("Progress: [");
    for _ in 0..filled {
        print!("█");
    }
    for _ in filled..bar_width {
        print!("░");
    }
    println!("] {}%", progress);
}
```

**Kết quả:**
```
Progress: [███████████████░░░░░] 75%
```

### Bảng Điểm

```rust
fn main() {
    println!("{:─<50}", "");
    println!("{:<15} {:>10} {:>10} {:>10}", "Môn", "Điểm", "Hệ số", "Kết quả");
    println!("{:─<50}", "");

    println!("{:<15} {:>10} {:>10} {:>10.1}", "Toán", 8.5, 2, 8.5 * 2.0);
    println!("{:<15} {:>10} {:>10} {:>10.1}", "Văn", 7.0, 1, 7.0 * 1.0);
    println!("{:<15} {:>10} {:>10} {:>10.1}", "Anh", 9.0, 2, 9.0 * 2.0);

    println!("{:─<50}", "");
    let total = (8.5 * 2.0 + 7.0 * 1.0 + 9.0 * 2.0) / 5.0;
    println!("{:<15} {:>33.2}", "Trung bình:", total);
}
```

**Kết quả:**
```
──────────────────────────────────────────────────
Môn                  Điểm     Hệ số   Kết quả
──────────────────────────────────────────────────
Toán                  8.5         2       17.0
Văn                   7.0         1        7.0
Anh                   9.0         2       18.0
──────────────────────────────────────────────────
Trung bình:                              8.40
```

## 🐛 Debug vs Display

### Display (Default)

```rust
fn main() {
    let text = "Hello";
    println!("{}", text);  // Display
}
```

### Debug

```rust
fn main() {
    let numbers = vec![1, 2, 3];
    // println!("{}", numbers);  // ❌ Error! Vec không có Display
    println!("{:?}", numbers);   // ✅ OK! Dùng Debug
}
```

### Struct với Debug

```rust
#[derive(Debug)]
struct Person {
    name: String,
    age: u32,
}

fn main() {
    let person = Person {
        name: String::from("An"),
        age: 20,
    };

    println!("{:?}", person);
    println!("{:#?}", person);  // Pretty print
}
```

**Kết quả:**
```
Person { name: "An", age: 20 }
Person {
    name: "An",
    age: 20,
}
```

## 🎯 Macro `format!` - Tạo String

`format!` giống `println!` nhưng **trả về String** thay vì in ra:

```rust
fn main() {
    let name = "Rust";
    let greeting = format!("Hello, {}!", name);

    println!("{}", greeting);  // Hello, Rust!

    // Dùng greeting nhiều lần
    println!("{}", greeting);
    println!("{}", greeting);
}
```

**Khi nào dùng?**
- ✅ Cần lưu text để dùng sau
- ✅ Ghép nhiều strings
- ✅ Format trước khi gửi đi

**Ví dụ:**
```rust
fn main() {
    let first = "Nguyễn";
    let last = "Văn A";
    let full_name = format!("{} {}", first, last);

    let message = format!("Xin chào, {}! Chào mừng đến với Rust.", full_name);
    println!("{}", message);
}
```

## 🔍 Escape Characters

### Ký Tự Đặc Biệt

```rust
fn main() {
    println!("Dòng 1\nDòng 2");     // \n = newline
    println!("Tab\tở đây");          // \t = tab
    println!("Quote: \"Hello\"");    // \" = dấu "
    println!("Backslash: \\");       // \\ = \
}
```

**Kết quả:**
```
Dòng 1
Dòng 2
Tab	ở đây
Quote: "Hello"
Backslash: \
```

### Raw Strings

Không xử lý escape characters:

```rust
fn main() {
    println!(r"C:\Users\name\Documents");  // Raw string
    println!(r#"He said "Hello""#);        // Với dấu "
}
```

**Kết quả:**
```
C:\Users\name\Documents
He said "Hello"
```

## 🎯 Thực Hành

### Bài Tập 1: In Thông Tin Cá Nhân

In ra:
```
━━━━━━━━━━━━━━━━━━━━
  THÔNG TIN CÁ NHÂN
━━━━━━━━━━━━━━━━━━━━
Họ tên: Nguyễn Văn A
Tuổi:   20
Email:  a@example.com
━━━━━━━━━━━━━━━━━━━━
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    println!("━━━━━━━━━━━━━━━━━━━━");
    println!("  THÔNG TIN CÁ NHÂN");
    println!("━━━━━━━━━━━━━━━━━━━━");
    println!("Họ tên: {}", "Nguyễn Văn A");
    println!("Tuổi:   {}", 20);
    println!("Email:  {}", "a@example.com");
    println!("━━━━━━━━━━━━━━━━━━━━");
}
```

</details>

### Bài Tập 2: Máy Tính Đơn Giản

In phép tính:
```
12 + 8 = 20
12 - 8 = 4
12 * 8 = 96
12 / 8 = 1
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let a = 12;
    let b = 8;

    println!("{} + {} = {}", a, b, a + b);
    println!("{} - {} = {}", a, b, a - b);
    println!("{} * {} = {}", a, b, a * b);
    println!("{} / {} = {}", a, b, a / b);
}
```

</details>

### Bài Tập 3: Hóa Đơn

Tạo hóa đơn:
```
═══════════════════════════
       HÓA ĐƠN MUA HÀNG
═══════════════════════════
Phở              35,000 đ
Bún chả          40,000 đ
Cà phê           20,000 đ
───────────────────────────
Tổng cộng:       95,000 đ
═══════════════════════════
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    println!("═══════════════════════════");
    println!("       HÓA ĐƠN MUA HÀNG");
    println!("═══════════════════════════");
    println!("{:<15} {:>10} đ", "Phở", "35,000");
    println!("{:<15} {:>10} đ", "Bún chả", "40,000");
    println!("{:<15} {:>10} đ", "Cà phê", "20,000");
    println!("───────────────────────────");
    println!("{:<15} {:>10} đ", "Tổng cộng:", "95,000");
    println!("═══════════════════════════");
}
```

</details>

## 📚 Tóm Tắt

**In cơ bản:**
- `println!("...")` - In và xuống dòng
- `print!("...")` - In không xuống dòng
- `eprintln!("...")` - In lỗi

**Format strings:**
- `{}` - Placeholder cơ bản
- `{:?}` - Debug format
- `{:#?}` - Pretty debug
- `{:.2}` - 2 số thập phân
- `{:>10}` - Căn phải, width 10
- `{:<10}` - Căn trái, width 10
- `{:^10}` - Căn giữa, width 10

**Macros khác:**
- `format!()` - Tạo String
- `dbg!()` - Debug nhanh

## 🚀 Bước Tiếp Theo

Bạn đã biết cách in thông tin ra màn hình! Tiếp theo, học cách viết ghi chú trong code:

➡️ **Tiếp theo**: [Viết Ghi Chú Trong Code](comments)

---

:::tip Lời Khuyên
**`println!` là công cụ debug tốt nhất!**

Khi bạn không biết code sai ở đâu, hãy thêm `println!` để xem giá trị các biến. Đây là cách debug đơn giản và hiệu quả nhất cho người mới học! 🐛✨
:::

**Tiếp theo**: [Viết Ghi Chú Trong Code →](comments)
