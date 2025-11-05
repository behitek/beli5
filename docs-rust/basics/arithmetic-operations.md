---
sidebar_position: 10
title: Phép Toán Số Học Cơ Bản
description: Học các phép toán cộng, trừ, nhân, chia, chia lấy dư, và ép kiểu trong Rust
keywords: [rust, arithmetic, math, operations, operators, integer division, type casting, overflow, eli5]
---

# ➕ Phép Toán Số Học Cơ Bản

## Giới Thiệu

Rust hỗ trợ đầy đủ các phép toán số học cơ bản. Điểm đặc biệt: **Rust rất cẩn thận với types**!

:::tip Giải Thích Cho Bạn 5 Tuổi
Phép toán giống như **máy tính bỏ túi**:
- ➕ Cộng: 2 + 3 = 5
- ➖ Trừ: 5 - 2 = 3
- ✖️ Nhân: 3 × 4 = 12
- ➗ Chia: 10 ÷ 2 = 5

**Nhưng** Rust là máy tính **siêu cẩn thận**:
- ❌ Không cho cộng táo + cam
- ❌ Không cho chia cho 0
- ✅ Phải **cùng kiểu** mới tính được!

Đây là "đồ bảo hộ" giúp tránh lỗi! 🛡️
:::

## ➕ Phép Cộng (Addition)

```rust
fn main() {
    let a = 10;
    let b = 5;
    let sum = a + b;

    println!("{} + {} = {}", a, b, sum);
}
```

**Kết quả:**
```
10 + 5 = 15
```

### Với Floats

```rust
fn main() {
    let x = 10.5;
    let y = 3.2;
    let sum = x + y;

    println!("{} + {} = {}", x, y, sum);
}
```

**Kết quả:**
```
10.5 + 3.2 = 13.7
```

### Compound Assignment

```rust
fn main() {
    let mut x = 10;
    x += 5;  // Tương đương: x = x + 5

    println!("x = {}", x);  // 15
}
```

## ➖ Phép Trừ (Subtraction)

```rust
fn main() {
    let a = 20;
    let b = 8;
    let difference = a - b;

    println!("{} - {} = {}", a, b, difference);
}
```

**Kết quả:**
```
20 - 8 = 12
```

### Số Âm

```rust
fn main() {
    let a = 5;
    let b = 10;
    let result = a - b;  // Âm!

    println!("{} - {} = {}", a, b, result);
}
```

**Kết quả:**
```
5 - 10 = -5
```

### Underflow (Unsigned)

```rust
fn main() {
    let a: u32 = 5;
    let b: u32 = 10;
    // let result = a - b;  // ❌ Panic! u32 không thể âm

    // ✅ Dùng i32
    let a: i32 = 5;
    let b: i32 = 10;
    let result = a - b;
    println!("{}", result);  // -5
}
```

### Compound Assignment

```rust
fn main() {
    let mut x = 100;
    x -= 30;  // x = x - 30

    println!("x = {}", x);  // 70
}
```

## ✖️ Phép Nhân (Multiplication)

```rust
fn main() {
    let a = 6;
    let b = 7;
    let product = a * b;

    println!("{} × {} = {}", a, b, product);
}
```

**Kết quả:**
```
6 × 7 = 42
```

### Với Floats

```rust
fn main() {
    let pi = 3.14159;
    let radius = 5.0;
    let area = pi * radius * radius;

    println!("Diện tích: {:.2}", area);
}
```

**Kết quả:**
```
Diện tích: 78.54
```

### Compound Assignment

```rust
fn main() {
    let mut x = 5;
    x *= 3;  // x = x * 3

    println!("x = {}", x);  // 15
}
```

## ➗ Phép Chia (Division)

### Integer Division

```rust
fn main() {
    let a = 10;
    let b = 3;
    let quotient = a / b;  // Integer division!

    println!("{} / {} = {}", a, b, quotient);
}
```

**Kết quả:**
```
10 / 3 = 3
```

**⚠️ Lưu ý:** Integer division **loại bỏ** phần dư!

### Float Division

```rust
fn main() {
    let a = 10.0;
    let b = 3.0;
    let quotient = a / b;

    println!("{} / {} = {}", a, b, quotient);
}
```

**Kết quả:**
```
10 / 3 = 3.3333333333333335
```

### Chia Cho 0

```rust
fn main() {
    let a = 10;
    let b = 0;
    // let result = a / b;  // ❌ Panic!

    // ✅ Kiểm tra trước
    if b != 0 {
        let result = a / b;
        println!("Result: {}", result);
    } else {
        println!("Không thể chia cho 0!");
    }
}
```

### Compound Assignment

```rust
fn main() {
    let mut x = 100;
    x /= 4;  // x = x / 4

    println!("x = {}", x);  // 25
}
```

## 🔢 Chia Lấy Dư (Modulus)

```rust
fn main() {
    let a = 10;
    let b = 3;
    let remainder = a % b;

    println!("{} % {} = {}", a, b, remainder);
}
```

**Kết quả:**
```
10 % 3 = 1
```

### Ứng Dụng: Kiểm Tra Chẵn/Lẻ

```rust
fn main() {
    let num = 42;

    if num % 2 == 0 {
        println!("{} là số chẵn", num);
    } else {
        println!("{} là số lẻ", num);
    }
}
```

### Ứng Dụng: Wrap Around

```rust
fn main() {
    let hours = 25;
    let hour_of_day = hours % 24;

    println!("{}h = {}h trong ngày", hours, hour_of_day);
}
```

**Kết quả:**
```
25h = 1h trong ngày
```

### Compound Assignment

```rust
fn main() {
    let mut x = 17;
    x %= 5;  // x = x % 5

    println!("x = {}", x);  // 2
}
```

## 🔀 Type Casting Với `as`

**Quan trọng:** Phải cùng kiểu mới tính được!

### Lỗi Type Mismatch

```rust
fn main() {
    let a: i32 = 10;
    let b: f64 = 3.0;
    // let result = a + b;  // ❌ Error! Khác kiểu!
}
```

### Casting Integer → Float

```rust
fn main() {
    let a: i32 = 10;
    let b: f64 = 3.0;

    let result = a as f64 + b;  // ✅ Cast a thành f64

    println!("Result: {}", result);  // 13.0
}
```

### Casting Float → Integer

```rust
fn main() {
    let x: f64 = 10.7;
    let y: i32 = x as i32;  // Truncate (cắt phần thập phân)

    println!("x: {}, y: {}", x, y);
}
```

**Kết quả:**
```
x: 10.7, y: 10
```

### Chia Chính Xác

```rust
fn main() {
    let a = 10;
    let b = 3;

    // Integer division
    let int_result = a / b;
    println!("Integer: {}", int_result);  // 3

    // Float division
    let float_result = a as f64 / b as f64;
    println!("Float: {:.4}", float_result);  // 3.3333
}
```

## 📐 Phép Toán Phức Tạp

### Thứ Tự Ưu Tiên

```rust
fn main() {
    let result = 2 + 3 * 4;
    println!("{}", result);  // 14 (không phải 20!)

    let result = (2 + 3) * 4;
    println!("{}", result);  // 20
}
```

**Ưu tiên (cao → thấp):**
1. `()` - Ngoặc
2. `*`, `/`, `%` - Nhân, chia, chia dư
3. `+`, `-` - Cộng, trừ

### Công Thức Toán Học

```rust
fn main() {
    // Công thức bậc 2: ax² + bx + c
    let a = 2.0;
    let b = 3.0;
    let c = 1.0;
    let x = 5.0;

    let result = a * x * x + b * x + c;
    println!("{}x² + {}x + {} tại x={} = {}", a, b, c, x, result);
}
```

**Kết quả:**
```
2x² + 3x + 1 tại x=5 = 66
```

### Diện Tích Hình Tròn

```rust
fn main() {
    let pi = 3.14159;
    let radius = 10.0;

    let area = pi * radius * radius;
    let circumference = 2.0 * pi * radius;

    println!("Bán kính: {}", radius);
    println!("Diện tích: {:.2}", area);
    println!("Chu vi: {:.2}", circumference);
}
```

## 🧮 Math Functions

Rust không có math functions built-in. Dùng methods:

### Power (Lũy Thừa)

```rust
fn main() {
    let base = 2;
    let power = 10;
    let result = base.pow(power);

    println!("{}^{} = {}", base, power, result);  // 2^10 = 1024
}
```

### Square Root (Căn Bậc Hai)

```rust
fn main() {
    let num = 16.0;
    let sqrt = num.sqrt();

    println!("√{} = {}", num, sqrt);  // √16 = 4
}
```

### Absolute Value (Giá Trị Tuyệt Đối)

```rust
fn main() {
    let x = -42;
    let abs_x = x.abs();

    println!("|{}| = {}", x, abs_x);  // |-42| = 42
}
```

### Min/Max

```rust
fn main() {
    let a = 10;
    let b = 20;

    println!("Min: {}", a.min(b));  // 10
    println!("Max: {}", a.max(b));  // 20
}
```

## ⚠️ Overflow và Underflow

### Debug Mode

```rust
fn main() {
    let mut x: u8 = 255;
    x += 1;  // ❌ Panic! Overflow!
    println!("{}", x);
}
```

### Release Mode

```rust
fn main() {
    let mut x: u8 = 255;
    x += 1;  // Wrap around → 0
    println!("{}", x);  // 0
}
```

### Xử Lý An Toàn

```rust
fn main() {
    let x: u8 = 250;

    // checked_add - Trả về Option
    match x.checked_add(10) {
        Some(result) => println!("Result: {}", result),
        None => println!("Overflow!"),
    }

    // saturating_add - Dừng ở max
    let result = x.saturating_add(10);
    println!("Saturating: {}", result);  // 255

    // wrapping_add - Wrap around
    let result = x.wrapping_add(10);
    println!("Wrapping: {}", result);  // 4
}
```

## 🎯 Thực Hành

### Bài Tập 1: Máy Tính Đơn Giản

Viết calculator cho 4 phép toán:

```rust
fn main() {
    let a = 20;
    let b = 8;

    // TODO: Tính và in kết quả
    // a + b
    // a - b
    // a * b
    // a / b
    // a % b
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let a = 20;
    let b = 8;

    println!("{} + {} = {}", a, b, a + b);
    println!("{} - {} = {}", a, b, a - b);
    println!("{} × {} = {}", a, b, a * b);
    println!("{} ÷ {} = {}", a, b, a / b);
    println!("{} % {} = {}", a, b, a % b);
}
```

**Kết quả:**
```
20 + 8 = 28
20 - 8 = 12
20 × 8 = 160
20 ÷ 8 = 2
20 % 8 = 4
```

</details>

### Bài Tập 2: Chuyển Đổi Nhiệt Độ

Chuyển Celsius sang Fahrenheit:
Formula: `F = C × 9/5 + 32`

```rust
fn main() {
    let celsius = 25.0;

    // TODO: Tính fahrenheit
    // TODO: In kết quả
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let celsius = 25.0;
    let fahrenheit = celsius * 9.0 / 5.0 + 32.0;

    println!("{}°C = {}°F", celsius, fahrenheit);
}
```

**Kết quả:**
```
25°C = 77°F
```

</details>

### Bài Tập 3: Tính Tiền Tip

Tính tiền tip 15% và tổng cộng:

```rust
fn main() {
    let bill = 125.50;
    let tip_percent = 15.0;

    // TODO: Tính tip
    // TODO: Tính total
    // TODO: In kết quả
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let bill = 125.50;
    let tip_percent = 15.0;

    let tip = bill * tip_percent / 100.0;
    let total = bill + tip;

    println!("Hóa đơn: ${:.2}", bill);
    println!("Tip ({}%): ${:.2}", tip_percent, tip);
    println!("Tổng cộng: ${:.2}", total);
}
```

**Kết quả:**
```
Hóa đơn: $125.50
Tip (15%): $18.82
Tổng cộng: $144.32
```

</details>

### Bài Tập 4: Diện Tích và Chu Vi

Tính diện tích và chu vi hình chữ nhật:

```rust
fn main() {
    let width = 10.0;
    let height = 5.0;

    // TODO: Tính area
    // TODO: Tính perimeter
    // TODO: In kết quả
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let width = 10.0;
    let height = 5.0;

    let area = width * height;
    let perimeter = 2.0 * (width + height);

    println!("Chiều rộng: {}", width);
    println!("Chiều cao: {}", height);
    println!("Diện tích: {}", area);
    println!("Chu vi: {}", perimeter);
}
```

**Kết quả:**
```
Chiều rộng: 10
Chiều cao: 5
Diện tích: 50
Chu vi: 30
```

</details>

## 📚 Tóm Tắt

**Phép toán cơ bản:**
- `+` - Cộng
- `-` - Trừ
- `*` - Nhân
- `/` - Chia (integer division cho integers!)
- `%` - Chia lấy dư (modulus)

**Compound assignment:**
- `+=`, `-=`, `*=`, `/=`, `%=`

**Type casting:**
- Dùng `as` keyword
- `i32 as f64` - Integer to float
- `f64 as i32` - Float to integer (truncate)

**Math methods:**
- `.pow()` - Lũy thừa
- `.sqrt()` - Căn bậc hai
- `.abs()` - Giá trị tuyệt đối
- `.min()`, `.max()` - Min/max

**Overflow handling:**
- `.checked_add()` - Trả về Option
- `.saturating_add()` - Dừng ở max/min
- `.wrapping_add()` - Wrap around

**Lưu ý:**
- ⚠️ Phải cùng kiểu mới tính được
- ⚠️ Integer division loại bỏ phần dư
- ⚠️ Không chia cho 0
- ⚠️ Cẩn thận với overflow

## 🚀 Bước Tiếp Theo

Bạn đã biết các phép toán số học! Tiếp theo, học về boolean và logic:

➡️ **Tiếp theo**: [Boolean và Logic Operators](boolean-and-logic)

---

:::tip Lời Khuyên Vàng
**"Rust cẩn thận với types = Ít bug hơn!"**

Nhiều ngôn ngữ khác tự động convert types:
```javascript
// JavaScript - Tự động convert
10 + "5" = "105"  // 😱 String concatenation!
"10" - "5" = 5    // 😱 Number subtraction!
```

**Rust không làm vậy!**
```rust
// Rust - Phải explicit
10 + 5 = 15       // ✅ OK
// 10 + "5"       // ❌ Error! Phải convert
```

Ban đầu phiền, nhưng **giúp tránh bugs khó tìm**! 🐛✨

**Mẹo**: Khi lỗi type mismatch, thêm `as` để cast!
:::

**Tiếp theo**: [Boolean và Logic Operators →](boolean-and-logic)
