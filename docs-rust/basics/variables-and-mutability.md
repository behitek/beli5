---
sidebar_position: 7
title: Biến Trong Rust - Không Thay Đổi Theo Mặc Định!
description: Học về variables, immutability, mutability, constants, và shadowing trong Rust
keywords: [rust, variables, immutable, mutable, let, mut, const, shadowing, eli5]
---

# 🔐 Biến Trong Rust - Không Thay Đổi Theo Mặc Định!

## Biến Là Gì?

**Biến** (variable) là "hộp" để lưu trữ dữ liệu trong chương trình.

:::tip Giải Thích Cho Bạn 5 Tuổi
Biến giống như **hộp đựng đồ có nhãn**:
- 📦 Hộp = nơi chứa dữ liệu
- 🏷️ Nhãn = tên biến
- 🎁 Đồ vật = giá trị

**Đặc biệt ở Rust**: Hộp có **khóa** theo mặc định! 🔒
- Bạn để đồ vào
- Khóa lại
- **Không thể thay đổi** trừ khi mở khóa!

Đây là "đồ bảo hộ an toàn" của Rust! 🛡️
:::

## 🎯 Khai Báo Biến Với `let`

### Syntax Cơ Bản

```rust
let variable_name = value;
```

### Ví Dụ

```rust
fn main() {
    let x = 5;
    let name = "An";
    let is_rust_cool = true;

    println!("x = {}", x);
    println!("name = {}", name);
    println!("Rust cool? {}", is_rust_cool);
}
```

**Kết quả:**
```
x = 5
name = An
Rust cool? true
```

## 🔒 Immutable By Default (Mặc Định Không Thay Đổi)

**Điểm khác biệt lớn nhất của Rust:**

**Biến mặc định là IMMUTABLE (không thay đổi được)!**

### Thử Thay Đổi Biến

```rust
fn main() {
    let x = 5;
    println!("x = {}", x);

    x = 10;  // ❌ LỖI!
    println!("x = {}", x);
}
```

**Compiler báo lỗi:**
```
error[E0384]: cannot assign twice to immutable variable `x`
 --> src/main.rs:5:5
  |
2 |     let x = 5;
  |         - first assignment to `x`
...
5 |     x = 10;
  |     ^^^^^^ cannot assign twice to immutable variable
  |
help: consider making this binding mutable
  |
2 |     let mut x = 5;
  |         +++
```

**Compiler thông minh!** Nó bảo: "Dùng `mut` nếu muốn thay đổi!"

## 🔓 Mutable Variables Với `mut`

Muốn thay đổi biến? Thêm `mut`:

```rust
fn main() {
    let mut x = 5;  // Thêm mut
    println!("x = {}", x);

    x = 10;  // ✅ OK!
    println!("x = {}", x);
}
```

**Kết quả:**
```
x = 5
x = 10
```

### Ví Dụ Thực Tế

```rust
fn main() {
    let mut score = 0;  // Điểm ban đầu

    println!("Điểm: {}", score);

    score = score + 10;  // Cộng điểm
    println!("Điểm: {}", score);

    score = score + 20;  // Cộng thêm
    println!("Điểm: {}", score);
}
```

**Kết quả:**
```
Điểm: 0
Điểm: 10
Điểm: 30
```

## 🤔 Tại Sao Immutable Mặc Định?

### 1. An Toàn Hơn 🛡️

```rust
fn main() {
    let password = "secret123";

    // ... 1000 dòng code ...

    // password vẫn là "secret123"
    // Không ai có thể vô tình thay đổi!
}
```

### 2. Dễ Hiểu Hơn 🧠

```rust
fn main() {
    let price = 100;

    // Đọc code, bạn biết chắc:
    // price LUÔN là 100
    // Không cần lo nó thay đổi!

    calculate_tax(price);  // price vẫn là 100
    apply_discount(price);  // price vẫn là 100
}
```

### 3. Tránh Bugs 🐛

```rust
// ❌ Lỗi trong ngôn ngữ khác (JavaScript, Python)
let total = 100;

// ... nhiều code ...

total = 200;  // Ai đó vô tình sửa!

// Bug! total không còn là 100 nữa!
```

```rust
// ✅ Rust ngăn chặn
let total = 100;

// ... nhiều code ...

total = 200;  // ❌ Compiler chặn ngay!
```

### 4. Performance 🚀

Compiler có thể tối ưu tốt hơn khi biết biến không đổi.

## 📊 `let` vs `let mut` - Khi Nào Dùng?

### Dùng `let` (Immutable) Khi:

✅ Giá trị không cần thay đổi
✅ Constants/configuration
✅ Data từ user input (đã validate)
✅ Results từ calculations

**Ví dụ:**
```rust
fn main() {
    let pi = 3.14159;  // Không đổi
    let user_name = get_input();  // Không đổi sau khi nhận
    let result = calculate(10, 20);  // Không đổi
}
```

### Dùng `let mut` (Mutable) Khi:

✅ Cần thay đổi giá trị
✅ Counters/accumulators
✅ State trong loops
✅ Buffers

**Ví dụ:**
```rust
fn main() {
    let mut counter = 0;  // Tăng dần
    let mut sum = 0;  // Tích lũy
    let mut buffer = String::new();  // Thêm dữ liệu
}
```

### Rule of Thumb

> **"Dùng `let` by default. Chỉ dùng `mut` khi thực sự cần!"**

## 🎭 Type Annotations (Chỉ Định Kiểu)

Rust thường tự suy luận kiểu, nhưng bạn có thể chỉ định:

### Type Inference (Tự Động)

```rust
fn main() {
    let x = 5;  // Rust biết x là i32
    let y = 2.5;  // Rust biết y là f64
    let name = "An";  // Rust biết name là &str
}
```

### Explicit Type (Chỉ Định Rõ)

```rust
fn main() {
    let x: i32 = 5;
    let y: f64 = 2.5;
    let name: &str = "An";

    let mut score: u32 = 0;
}
```

**Khi nào cần chỉ định?**
- Compiler không suy luận được
- Muốn dùng kiểu cụ thể
- Code rõ ràng hơn

### Ví Dụ Cần Chỉ Định

```rust
fn main() {
    // ❌ Error - Compiler không biết kiểu gì
    let x = "42".parse().expect("Not a number");

    // ✅ OK - Chỉ định kiểu
    let x: i32 = "42".parse().expect("Not a number");
}
```

## 💎 Constants (Hằng Số)

Constants khác với immutable variables!

### Khai Báo Với `const`

```rust
const MAX_POINTS: u32 = 100_000;

fn main() {
    println!("Max points: {}", MAX_POINTS);
}
```

### `const` vs `let`

| Feature | `const` | `let` |
|---------|---------|-------|
| Mutable | ❌ KHÔNG BAO GIỜ | ✅ Có thể với `mut` |
| Type annotation | ✅ BẮT BUỘC | ⚠️ Optional |
| Scope | Global hoặc local | Local |
| Naming | SCREAMING_SNAKE_CASE | snake_case |
| Compute time | Compile time | Runtime |
| Có thể dùng function? | ❌ Không | ✅ Có |

### Ví Dụ

```rust
// Global constant
const PI: f64 = 3.14159;
const MAX_USERS: u32 = 1000;

fn main() {
    // Local constant
    const SECONDS_IN_DAY: u32 = 86400;

    println!("PI: {}", PI);
    println!("Max users: {}", MAX_USERS);
    println!("Seconds/day: {}", SECONDS_IN_DAY);
}
```

### Khi Nào Dùng `const`?

✅ Giá trị thật sự không bao giờ đổi
✅ Magic numbers
✅ Configuration values
✅ Cần dùng ở nhiều nơi

```rust
const TAX_RATE: f64 = 0.10;  // 10% thuế
const MAX_RETRY: u32 = 3;
const API_TIMEOUT: u64 = 30;  // 30 seconds

fn main() {
    let price = 100.0;
    let total = price * (1.0 + TAX_RATE);
    println!("Total with tax: {}", total);
}
```

## 🎪 Shadowing (Che Phủ Biến)

**Shadowing** = Khai báo lại biến với cùng tên!

### Ví Dụ Cơ Bản

```rust
fn main() {
    let x = 5;  // x = 5

    let x = x + 1;  // x = 6 (shadowing)

    let x = x * 2;  // x = 12 (shadowing again)

    println!("x = {}", x);  // x = 12
}
```

**Kết quả:**
```
x = 12
```

### Shadowing Khác Với Mutable

```rust
fn main() {
    // Shadowing - OK
    let x = 5;
    let x = x + 1;  // ✅ New variable

    // Mutable - OK
    let mut y = 5;
    y = y + 1;  // ✅ Change value
}
```

### Tại Sao Dùng Shadowing?

#### 1. Đổi Kiểu Dữ Liệu

```rust
fn main() {
    // Nhận input là String
    let spaces = "   ";

    // Chuyển thành number
    let spaces = spaces.len();

    println!("Number of spaces: {}", spaces);
}
```

**Với `mut` sẽ lỗi:**
```rust
fn main() {
    let mut spaces = "   ";
    spaces = spaces.len();  // ❌ Error! Kiểu khác nhau!
}
```

#### 2. Transform Data

```rust
fn main() {
    let input = "42";
    let input: i32 = input.parse().expect("Not a number");
    let input = input * 2;

    println!("Result: {}", input);
}
```

#### 3. Tạm Thời Mutable, Sau Đó Immutable

```rust
fn main() {
    let mut data = vec![3, 1, 4, 1, 5];
    data.sort();  // Sort (cần mut)

    let data = data;  // Giờ immutable!

    // data không thể thay đổi nữa
    // data.push(6);  // ❌ Error!
}
```

## 🎯 Thực Hành

### Bài Tập 1: Tìm Lỗi

Code này có lỗi. Tìm và sửa:

```rust
fn main() {
    let age = 20;
    age = 21;
    println!("Age: {}", age);
}
```

<details>
<summary>💡 Xem đáp án</summary>

**Lỗi:** `age` là immutable, không thể thay đổi.

**Sửa - Option 1:** Dùng `mut`

```rust
fn main() {
    let mut age = 20;
    age = 21;
    println!("Age: {}", age);
}
```

**Sửa - Option 2:** Dùng shadowing

```rust
fn main() {
    let age = 20;
    let age = 21;
    println!("Age: {}", age);
}
```

</details>

### Bài Tập 2: Tính Tổng

Viết code tính tổng từ 1 đến 10:

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let mut sum = 0;  // Cần mut vì sẽ thay đổi

    for i in 1..=10 {
        sum = sum + i;  // Hoặc: sum += i;
    }

    println!("Sum: {}", sum);
}
```

**Kết quả:** `Sum: 55`

</details>

### Bài Tập 3: Temperature Converter

Chuyển đổi Celsius sang Fahrenheit:

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

    println!("{} °C = {} °F", celsius, fahrenheit);
}
```

**Kết quả:** `25 °C = 77 °F`

</details>

### Bài Tập 4: Shadowing Practice

Dùng shadowing để:
1. Nhận input string "123"
2. Parse thành số
3. Nhân đôi
4. In ra

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let input = "123";
    println!("Input string: {}", input);

    let input: i32 = input.parse().expect("Not a number");
    println!("Parsed number: {}", input);

    let input = input * 2;
    println!("Doubled: {}", input);
}
```

**Kết quả:**
```
Input string: 123
Parsed number: 123
Doubled: 246
```

</details>

## 🔍 So Sánh Với Ngôn Ngữ Khác

### Python

```python
# Python - Mọi biến đều mutable
x = 5
x = 10  # OK
```

### JavaScript

```javascript
// JavaScript
let x = 5;
x = 10;  // OK

const y = 5;
y = 10;  // Error
```

### Rust

```rust
// Rust - Immutable by default
let x = 5;
x = 10;  // ❌ Error

let mut y = 5;
y = 10;  // ✅ OK

const Z: i32 = 5;
Z = 10;  // ❌ Error (const không bao giờ đổi)
```

## 📚 Tóm Tắt

**Variables:**
- `let x = 5;` - Immutable (mặc định)
- `let mut x = 5;` - Mutable (có thể thay đổi)
- `const X: i32 = 5;` - Constant (không bao giờ đổi)

**Immutable by default:**
- ✅ An toàn hơn
- ✅ Dễ hiểu hơn
- ✅ Tránh bugs
- ✅ Performance tốt hơn

**Shadowing:**
- Khai báo lại biến cùng tên
- Có thể đổi kiểu
- Khác với mutable

**Best practices:**
- Dùng `let` by default
- Chỉ dùng `mut` khi cần
- Dùng `const` cho true constants
- Shadowing cho transformations

## 🚀 Bước Tiếp Theo

Bạn đã hiểu về biến! Tiếp theo, học về các kiểu dữ liệu trong Rust:

➡️ **Tiếp theo**: [Các Kiểu Dữ Liệu Cơ Bản](data-types)

---

:::tip Lời Khuyên Vàng
**"Immutable by default" là siêu năng lực của Rust!** 🦸

Rust ép bạn suy nghĩ: "Biến này CÓ THỰC SỰ CẦN thay đổi không?"

90% trường hợp, câu trả lời là KHÔNG!

Điều này làm code:
- 🛡️ An toàn hơn
- 🧠 Dễ hiểu hơn
- 🐛 Ít bug hơn
- 🚀 Nhanh hơn

Ban đầu khó chịu, nhưng sau này bạn sẽ yêu nó! ✨
:::

**Tiếp theo**: [Các Kiểu Dữ Liệu Cơ Bản →](data-types)
