---
sidebar_position: 6
title: Viết Ghi Chú Trong Code
description: Học cách viết comments trong Rust - line comments, block comments, và doc comments
keywords: [rust, comments, documentation, doc comments, line comments, block comments, eli5]
---

# 📝 Viết Ghi Chú Trong Code

## Comments Là Gì?

**Comments** (ghi chú) là những dòng chữ trong code mà:
- ❌ Máy tính **KHÔNG** đọc
- ❌ Compiler **BỎ QUA**
- ✅ Người lập trình **ĐỌC** để hiểu code

:::tip Giải Thích Cho Bạn 5 Tuổi
Comments giống như **ghi chú bên lề** trong sách giáo khoa:
- 📖 Bạn viết ghi chú để nhớ
- 👀 Chỉ bạn (và người đọc) thấy
- 🤖 Máy tính không quan tâm

Ví dụ: Bạn giải toán, viết bên cạnh "Nhớ: a² + b² = c²"
Code cũng vậy! 📚✨
:::

## 🎯 Tại Sao Cần Comments?

### 1. Giải Thích Code Phức Tạp

```rust
fn main() {
    // Tính diện tích hình tròn
    // Công thức: S = π × r²
    let radius = 5.0;
    let area = 3.14159 * radius * radius;

    println!("Diện tích: {}", area);
}
```

### 2. Nhắc Nhở Bản Thân Sau Này

```rust
fn main() {
    // TODO: Thêm validation cho input
    // FIXME: Bug khi radius âm
    let radius = -5.0;  // Cần fix!
}
```

### 3. Giúp Người Khác Hiểu Code

```rust
fn main() {
    // Thuật toán bubble sort
    // Độ phức tạp: O(n²)
    // Chỉ dùng cho mảng nhỏ!
    let mut arr = vec![5, 2, 8, 1, 9];
    // ... code bubble sort
}
```

### 4. Tắt Code Tạm Thời

```rust
fn main() {
    println!("Hello");

    // Tạm thời không dùng
    // println!("Debug info");
    // println!("More debug");

    println!("World");
}
```

## 📝 Các Loại Comments Trong Rust

### 1. Line Comments `//` - Comment Một Dòng

```rust
// Đây là comment
fn main() {
    // Comment có thể ở đầu dòng
    println!("Hello");  // Hoặc cuối dòng

    // Comment trên nhiều dòng
    // Mỗi dòng cần //
    // Như thế này
}
```

**Đặc điểm:**
- ✅ Dùng nhiều nhất
- ✅ Dễ viết, dễ đọc
- ✅ Tự động xuống dòng

### 2. Block Comments `/* */` - Comment Nhiều Dòng

```rust
/*
   Đây là block comment
   Có thể viết nhiều dòng
   Không cần // ở đầu mỗi dòng
*/

fn main() {
    println!("Hello");
}
```

**Nested block comments** (Rust hỗ trợ!):

```rust
fn main() {
    /*
       Comment ngoài
       /* Comment trong */
       Tiếp comment ngoài
    */
    println!("Hello");
}
```

**Khi nào dùng?**
- ⚠️ Ít dùng hơn `//`
- ✅ Comment nhiều dòng
- ✅ Tắt cả đoạn code lớn

### 3. Doc Comments `///` - Documentation

Comment cho documentation (tài liệu):

```rust
/// Tính diện tích hình chữ nhật
///
/// # Arguments
/// * `width` - Chiều rộng
/// * `height` - Chiều cao
///
/// # Example
/// ```
/// let area = calculate_area(5, 10);
/// assert_eq!(area, 50);
/// ```
fn calculate_area(width: i32, height: i32) -> i32 {
    width * height
}
```

**Sinh ra HTML documentation:**
```bash
cargo doc --open
```

### 4. Module-level Doc Comments `//!`

Document cho file/module:

```rust
//! # My Math Library
//!
//! Thư viện tính toán đơn giản
//! Hỗ trợ các phép toán cơ bản

fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

## 🎨 Comment Style Guide

### ✅ Comments TỐT

#### 1. Giải Thích "TẠI SAO", Không Phải "CÁI GÌ"

```rust
// ✅ TỐT - Giải thích lý do
// Dùng f64 vì cần độ chính xác cao cho tính toán tài chính
let price: f64 = 19.99;

// ❌ TỆ - Chỉ nói cái hiển nhiên
// Khai báo biến price kiểu f64
let price: f64 = 19.99;
```

#### 2. Giải Thích Business Logic

```rust
// ✅ TỐT
// Giảm 20% cho đơn hàng trên 1 triệu
if order_total > 1_000_000 {
    discount = 0.20;
}

// ❌ TỆ
// Nếu order_total lớn hơn 1000000
if order_total > 1_000_000 {
    discount = 0.20;
}
```

#### 3. Cảnh Báo Khi Cần

```rust
// ⚠️ CẢNH BÁO: Không thay đổi giá trị này!
// Magic number từ spec v2.1 của API
const MAX_RETRIES: u32 = 3;

// ⚠️ HACK: Workaround cho bug trong library X
// TODO: Remove khi upgrade lên v2.0
thread::sleep(Duration::from_millis(100));
```

#### 4. TODO và FIXME

```rust
fn main() {
    // TODO: Thêm validation cho email
    let email = get_user_input();

    // FIXME: Crash khi input rỗng
    process_email(email);

    // NOTE: Feature này đang thử nghiệm
    experimental_feature();
}
```

### ❌ Comments TỆ

#### 1. Lặp Lại Code

```rust
// ❌ TỆ - Lặp lại những gì code đã nói
// Set x = 5
let x = 5;

// In x ra màn hình
println!("{}", x);
```

#### 2. Comments Sai/Lỗi Thời

```rust
// ❌ TỆ - Comment sai!
// Tính tổng
let result = a * b;  // Thực ra là nhân!
```

#### 3. Quá Dài, Quá Chi Tiết

```rust
// ❌ TỆ - Quá dài không cần thiết
// Đầu tiên, chúng ta khai báo một biến tên là x
// và gán cho nó giá trị 5, biến này sẽ được
// sử dụng để lưu trữ số lượng items...
// (50 dòng comment)
let x = 5;
```

## 💡 Best Practices

### 1. Code Tự Giải Thích > Comments

**Thay vì:**
```rust
// ❌ Cần comment để hiểu
let d = 86400;  // seconds in a day
```

**Hãy viết:**
```rust
// ✅ Tên biến tự giải thích
let seconds_in_a_day = 86400;
```

### 2. Cập Nhật Comments Khi Sửa Code

```rust
// ❌ TỆ - Comment lỗi thời
// Returns the sum of two numbers
fn multiply(a: i32, b: i32) -> i32 {
    a * b  // Đổi từ cộng sang nhân nhưng quên sửa comment!
}

// ✅ TỐT
// Returns the product of two numbers
fn multiply(a: i32, b: i32) -> i32 {
    a * b
}
```

### 3. Dùng Comments Cho Complex Logic

```rust
fn fibonacci(n: u32) -> u32 {
    // Base cases
    if n == 0 {
        return 0;
    }
    if n == 1 {
        return 1;
    }

    // Recursive case: fib(n) = fib(n-1) + fib(n-2)
    // Không tối ưu nhưng dễ hiểu cho người mới
    fibonacci(n - 1) + fibonacci(n - 2)
}
```

### 4. Comment Cho Weird Hacks

```rust
fn buggy_workaround() {
    // HACK: Sleep 100ms để tránh race condition
    // Đây là workaround tạm thời cho bug trong library X v1.2
    // Issue: https://github.com/example/repo/issues/123
    // TODO: Remove khi upgrade lên v2.0
    thread::sleep(Duration::from_millis(100));
}
```

## 🔍 Doc Comments Chi Tiết

### Cấu Trúc Doc Comment

```rust
/// Brief description (một dòng)
///
/// Detailed description (nhiều dòng)
/// Giải thích chi tiết hơn
///
/// # Arguments
/// * `param1` - Mô tả parameter 1
/// * `param2` - Mô tả parameter 2
///
/// # Returns
/// Mô tả giá trị trả về
///
/// # Example
/// ```
/// let result = my_function(1, 2);
/// assert_eq!(result, 3);
/// ```
///
/// # Panics
/// Function panic khi nào (nếu có)
///
/// # Errors
/// Các lỗi có thể xảy ra (nếu trả về Result)
///
/// # Safety
/// Safety requirements (cho unsafe code)
fn my_function(param1: i32, param2: i32) -> i32 {
    param1 + param2
}
```

### Ví Dụ Thực Tế

```rust
/// Kiểm tra xem một số có phải là số nguyên tố không
///
/// Số nguyên tố là số chỉ chia hết cho 1 và chính nó.
/// Function này dùng thuật toán trial division.
///
/// # Arguments
/// * `n` - Số cần kiểm tra (phải >= 0)
///
/// # Returns
/// * `true` nếu n là số nguyên tố
/// * `false` nếu không phải
///
/// # Example
/// ```
/// assert_eq!(is_prime(2), true);
/// assert_eq!(is_prime(4), false);
/// assert_eq!(is_prime(17), true);
/// ```
///
/// # Performance
/// Độ phức tạp: O(√n)
fn is_prime(n: u32) -> bool {
    if n < 2 {
        return false;
    }

    for i in 2..=(n as f64).sqrt() as u32 {
        if n % i == 0 {
            return false;
        }
    }

    true
}
```

### Markdown Trong Doc Comments

Doc comments hỗ trợ Markdown:

```rust
/// # Heading 1
/// ## Heading 2
///
/// **Bold text**
/// *Italic text*
///
/// - List item 1
/// - List item 2
///
/// [Link](https://example.com)
///
/// `inline code`
///
/// ```rust
/// // Code block
/// let x = 5;
/// ```
fn documented_function() {}
```

## 🎯 Thực Hành

### Bài Tập 1: Thêm Comments

Thêm comments cho code này:

```rust
fn main() {
    let a = 10;
    let b = 20;
    let sum = a + b;
    println!("{}", sum);
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    // Khai báo hai số cần cộng
    let a = 10;
    let b = 20;

    // Tính tổng
    let sum = a + b;

    // In kết quả ra màn hình
    println!("{}", sum);
}
```

Hoặc tốt hơn (ít comments vì code đã rõ):

```rust
fn main() {
    // Tính tổng hai số và in ra
    let a = 10;
    let b = 20;
    let sum = a + b;
    println!("{}", sum);
}
```

</details>

### Bài Tập 2: Tìm Comments Tệ

Tìm và sửa comments tệ:

```rust
// Set x to 5
let x = 5;

// Add 10 to x
let y = x + 10;

// Multiply y by 2
let z = y * 2;

// Print z
println!("{}", z);
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
// Tính (x + 10) × 2 theo công thức business
// x: Giá trị base
// Cộng 10: Phí cố định
// Nhân 2: Thuế VAT
let x = 5;
let y = x + 10;
let z = y * 2;
println!("Tổng tiền: {}", z);
```

Hoặc không cần comment vì code đã rõ:

```rust
let base_price = 5;
let with_fixed_fee = base_price + 10;
let with_vat = with_fixed_fee * 2;
println!("Tổng tiền: {}", with_vat);
```

</details>

### Bài Tập 3: Viết Doc Comment

Viết doc comment cho function:

```rust
fn calculate_bmi(weight: f64, height: f64) -> f64 {
    weight / (height * height)
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
/// Tính chỉ số BMI (Body Mass Index)
///
/// BMI = cân nặng (kg) / (chiều cao (m))²
///
/// # Arguments
/// * `weight` - Cân nặng tính bằng kg
/// * `height` - Chiều cao tính bằng mét
///
/// # Returns
/// Chỉ số BMI (f64)
///
/// # Example
/// ```
/// // Người cao 1m70, nặng 65kg
/// let bmi = calculate_bmi(65.0, 1.70);
/// assert!((bmi - 22.49).abs() < 0.01);
/// ```
///
/// # Phân loại BMI
/// - < 18.5: Thiếu cân
/// - 18.5 - 24.9: Bình thường
/// - 25.0 - 29.9: Thừa cân
/// - >= 30.0: Béo phì
fn calculate_bmi(weight: f64, height: f64) -> f64 {
    weight / (height * height)
}
```

</details>

## 📚 Tóm Tắt

**Các loại comments:**
- `//` - Line comment (dùng nhiều nhất)
- `/* */` - Block comment
- `///` - Doc comment cho item
- `//!` - Doc comment cho module

**Best practices:**
- ✅ Giải thích "TẠI SAO", không phải "CÁI GÌ"
- ✅ Code tự giải thích > Comments
- ✅ Cập nhật comments khi sửa code
- ✅ Dùng TODO, FIXME, NOTE
- ❌ Không lặp lại code
- ❌ Không để comments sai/lỗi thời

**Khi nào cần comments:**
- Complex logic
- Business rules
- Workarounds/hacks
- Performance considerations
- Non-obvious decisions

## 🚀 Bước Tiếp Theo

Bạn đã biết cách viết comments! Tiếp theo, học về biến - cách lưu trữ dữ liệu:

➡️ **Tiếp theo**: [Biến Trong Rust: Immutable vs Mutable](variables-and-mutability)

---

:::tip Lời Khuyên Vàng
**"Code là cách bạn nói với máy tính. Comments là cách bạn nói với người khác (và bản thân sau này)!"**

Viết comments tốt giúp:
- 🧠 Bạn nhớ logic sau 6 tháng
- 🤝 Teammates hiểu code của bạn
- 🐛 Debug dễ dàng hơn
- 📚 Onboard người mới nhanh hơn

Nhưng nhớ: **Good code > Good comments!** ✨
:::

**Tiếp theo**: [Biến Trong Rust →](variables-and-mutability)
