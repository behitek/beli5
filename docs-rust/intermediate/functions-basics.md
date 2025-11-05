---
sidebar_position: 9
title: "Hàm: Đóng Gói Code Có Thể Tái Sử Dụng"
description: "Học cách định nghĩa và sử dụng functions trong Rust. Hiểu parameters, return values, expressions vs statements!"
keywords: [rust function, rust fn, rust return value, rust expression statement, rust function basics]
---

# 🔧 Hàm: Đóng Gói Code Có Thể Tái Sử Dụng

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Biết cách định nghĩa functions với `fn`
- ✅ Hiểu parameters và return values
- ✅ Phân biệt expressions và statements
- ✅ Viết functions rõ ràng và dễ tái sử dụng
:::

---

## 🤔 Tại Sao Cần Functions?

Giả sử bạn cần tính diện tích hình chữ nhật nhiều lần:

```rust
fn main() {
    // Tính diện tích lần 1
    let width1 = 10;
    let height1 = 20;
    let area1 = width1 * height1;
    println!("Diện tích 1: {}", area1);

    // Tính diện tích lần 2
    let width2 = 15;
    let height2 = 25;
    let area2 = width2 * height2;
    println!("Diện tích 2: {}", area2);

    // ❌ Lặp code quá nhiều!
}
```

**Vấn đề:**
- ❌ Code lặp lại (DRY - Don't Repeat Yourself)
- ❌ Khó bảo trì (sửa 1 chỗ phải sửa nhiều chỗ)
- ❌ Dễ mắc lỗi

**Giải pháp:** Dùng **Function**! 🎯

---

## 📝 Function Là Gì?

**Function** (hàm) là một **khối code có tên** có thể:

- **Nhận đầu vào** (parameters)
- **Xử lý logic**
- **Trả về kết quả** (return value)
- **Tái sử dụng** nhiều lần

:::info Ẩn Dụ
Hãy tưởng tượng **function** như **một máy móc trên công trường**:

🏗️ **Máy trộn bê tông:**
- **Input**: Xi măng, cát, nước
- **Xử lý**: Trộn đều các nguyên liệu
- **Output**: Bê tông sẵn sàng

**Đặc điểm:**
- Có **tên** rõ ràng: "Máy trộn bê tông"
- **Tái sử dụng** nhiều lần (không cần xây lại)
- **Đồ bảo hộ an toàn** (Rust): Kiểm tra input/output! 🛡️
:::

---

## 📝 Định Nghĩa Function

### Cú Pháp

```rust
fn tên_function(tham_số: kiểu) -> kiểu_trả_về {
    // Code của function
    giá_trị_trả_về  // Không có dấu ;
}
```

### Ví Dụ Đơn Giản

```rust
fn chao_hoi() {
    println!("Xin chào!");
}

fn main() {
    chao_hoi();  // Gọi function
    chao_hoi();  // Gọi lại
}
```

**Kết quả:**
```
Xin chào!
Xin chào!
```

**Giải thích:**
- `fn chao_hoi()` → Định nghĩa function tên `chao_hoi`
- `chao_hoi();` → Gọi (call) function

---

## 🔢 Function Với Parameters

**Parameters** (tham số) là **đầu vào** của function:

```rust
fn chao_ten(ten: &str) {
    println!("Xin chào, {}!", ten);
}

fn main() {
    chao_ten("An");
    chao_ten("Bình");
    chao_ten("Chi");
}
```

**Kết quả:**
```
Xin chào, An!
Xin chào, Bình!
Xin chào, Chi!
```

### Nhiều Parameters

```rust
fn tinh_tong(a: i32, b: i32) {
    let tong = a + b;
    println!("{} + {} = {}", a, b, tong);
}

fn main() {
    tinh_tong(5, 3);
    tinh_tong(10, 20);
}
```

**Kết quả:**
```
5 + 3 = 8
10 + 20 = 30
```

:::caution Lưu Ý
Trong Rust, **bắt buộc phải khai báo kiểu** cho mọi parameter!

```rust
// ❌ Lỗi - Thiếu kiểu
fn tong(a, b) {
    a + b
}

// ✅ Đúng - Có kiểu
fn tong(a: i32, b: i32) -> i32 {
    a + b
}
```
:::

---

## 🔄 Return Values

Functions có thể **trả về giá trị** với `->`:

```rust
fn tinh_tong(a: i32, b: i32) -> i32 {
    a + b  // ✅ Không có dấu ;
}

fn main() {
    let ket_qua = tinh_tong(10, 20);
    println!("Tổng: {}", ket_qua);
}
```

**Kết quả:**
```
Tổng: 30
```

**Giải thích:**
- `-> i32` → Function trả về kiểu i32
- `a + b` → Giá trị trả về (không có `;`)

### Dùng return Keyword

```rust
fn tinh_hieu(a: i32, b: i32) -> i32 {
    return a - b;  // ✅ Dùng return rõ ràng
}

fn main() {
    println!("Hiệu: {}", tinh_hieu(20, 8));
}
```

**Kết quả:**
```
Hiệu: 12
```

:::tip return vs Không return

```rust
// ✅ Cách 1: Implicit return (không dấu ;)
fn tong1(a: i32, b: i32) -> i32 {
    a + b  // Trả về giá trị cuối
}

// ✅ Cách 2: Explicit return
fn tong2(a: i32, b: i32) -> i32 {
    return a + b;  // Dùng return
}

// ❌ Lỗi - Có dấu ; thành statement
fn tong3(a: i32, b: i32) -> i32 {
    a + b;  // ❌ Không trả về gì!
}
```

**Rust style**: Ưu tiên **implicit return** (không dùng `return` ở cuối)
:::

---

## 📊 Expressions vs Statements

Điểm **quan trọng** trong Rust: Phân biệt **Expression** và **Statement**!

### Statement (Câu Lệnh)

**Statement** **không trả về giá trị**:

```rust
fn main() {
    let x = 5;  // ✅ Statement
    x + 1;      // ✅ Statement (có ;)
}
```

### Expression (Biểu Thức)

**Expression** **trả về giá trị**:

```rust
fn main() {
    let x = 5;
    let y = x + 1;  // x + 1 là expression

    let z = {
        let a = 3;
        a * 2  // ✅ Expression (không có ;)
    };

    println!("z = {}", z);  // 6
}
```

**Kết quả:**
```
z = 6
```

### So Sánh

```rust
fn main() {
    // Expression - Trả về giá trị
    let x = {
        let a = 3;
        a + 1  // ✅ 4
    };
    println!("x = {}", x);

    // Statement - Không trả về
    let y = {
        let a = 3;
        a + 1;  // ❌ Có ; → Statement → Trả về ()
    };
    println!("y = {:?}", y);  // ()
}
```

**Kết quả:**
```
x = 4
y = ()
```

:::tip Quy Tắc Vàng
- **Không có `;`** → Expression → Trả về giá trị
- **Có `;`** → Statement → Không trả về (trả về `()`)

```rust
fn cong_hai(x: i32) -> i32 {
    x + 2  // ✅ Expression - Trả về i32
}

fn cong_hai_sai(x: i32) -> i32 {
    x + 2;  // ❌ Statement - Trả về (), lỗi!
}
```
:::

---

## 🎮 Ví Dụ Thực Tế: Tính Diện Tích

```rust
fn tinh_dien_tich_chu_nhat(width: i32, height: i32) -> i32 {
    width * height
}

fn tinh_chu_vi_chu_nhat(width: i32, height: i32) -> i32 {
    2 * (width + height)
}

fn main() {
    let w = 10;
    let h = 20;

    let dien_tich = tinh_dien_tich_chu_nhat(w, h);
    let chu_vi = tinh_chu_vi_chu_nhat(w, h);

    println!("📐 Hình chữ nhật {}x{}", w, h);
    println!("📊 Diện tích: {}", dien_tich);
    println!("📏 Chu vi: {}", chu_vi);
}
```

**Kết quả:**
```
📐 Hình chữ nhật 10x20
📊 Diện tích: 200
📏 Chu vi: 60
```

---

## 🧮 Ví Dụ: Kiểm Tra Số Nguyên Tố

```rust
fn la_nguyen_to(n: i32) -> bool {
    if n <= 1 {
        return false;
    }

    for i in 2..=n/2 {
        if n % i == 0 {
            return false;  // ✅ Early return
        }
    }

    true  // ✅ Implicit return
}

fn main() {
    let numbers = [2, 3, 4, 5, 15, 17, 20, 29];

    for &num in &numbers {
        if la_nguyen_to(num) {
            println!("{} là số nguyên tố", num);
        } else {
            println!("{} không phải số nguyên tố", num);
        }
    }
}
```

**Kết quả:**
```
2 là số nguyên tố
3 là số nguyên tố
4 không phải số nguyên tố
5 là số nguyên tố
15 không phải số nguyên tố
17 là số nguyên tố
20 không phải số nguyên tố
29 là số nguyên tố
```

---

## 🔄 Functions Gọi Functions

Functions có thể gọi functions khác:

```rust
fn cong(a: i32, b: i32) -> i32 {
    a + b
}

fn nhan_doi(x: i32) -> i32 {
    x * 2
}

fn cong_roi_nhan_doi(a: i32, b: i32) -> i32 {
    let tong = cong(a, b);      // Gọi function cong
    nhan_doi(tong)              // Gọi function nhan_doi
}

fn main() {
    let ket_qua = cong_roi_nhan_doi(5, 3);
    println!("Kết quả: {}", ket_qua);  // (5+3)*2 = 16
}
```

**Kết quả:**
```
Kết quả: 16
```

---

## 📝 Function Không Trả Về (Unit Type)

Nếu function không trả về gì, kiểu trả về là `()` (unit type):

```rust
fn in_thong_bao(msg: &str) {  // Không có -> ...
    println!("📢 {}", msg);
    // Tự động trả về ()
}

fn main() {
    in_thong_bao("Xin chào!");
    in_thong_bao("Học Rust vui!");
}
```

**Kết quả:**
```
📢 Xin chào!
📢 Học Rust vui!
```

**Giải thích:**
- Không có `-> kiểu` → Mặc định trả về `()`
- Tương đương: `fn in_thong_bao(msg: &str) -> () { ... }`

---

## 🎯 Early Return

Dùng `return` để **thoát sớm** khỏi function:

```rust
fn chia(a: i32, b: i32) -> i32 {
    if b == 0 {
        println!("❌ Lỗi: Không thể chia cho 0!");
        return 0;  // ✅ Thoát sớm
    }

    a / b  // ✅ Implicit return
}

fn main() {
    println!("10 / 2 = {}", chia(10, 2));
    println!("10 / 0 = {}", chia(10, 0));
}
```

**Kết quả:**
```
10 / 2 = 5
❌ Lỗi: Không thể chia cho 0!
10 / 0 = 0
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Quên Khai Báo Kiểu Parameter

```rust
// ❌ Lỗi
fn tong(a, b) {
    a + b
}

// ✅ Đúng
fn tong(a: i32, b: i32) -> i32 {
    a + b
}
```

### 2. Thêm Dấu ; Ở Cuối

```rust
// ❌ Lỗi - Có ; thành statement
fn cong(a: i32, b: i32) -> i32 {
    a + b;  // ❌ Trả về (), không phải i32
}

// ✅ Đúng - Không có ;
fn cong(a: i32, b: i32) -> i32 {
    a + b  // ✅ Expression
}
```

### 3. Kiểu Trả Về Không Khớp

```rust
// ❌ Lỗi - Khai báo i32 nhưng trả về &str
fn get_number() -> i32 {
    "42"  // ❌ &str, không phải i32
}

// ✅ Đúng
fn get_number() -> i32 {
    42
}
```

### 4. Gọi Function Chưa Định Nghĩa

```rust
fn main() {
    // ❌ Lỗi nếu function chưa tồn tại
    greet();
}

// ✅ Định nghĩa function (có thể ở sau main)
fn greet() {
    println!("Hello!");
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Chuyển Đổi Nhiệt Độ

Viết function chuyển Celsius sang Fahrenheit: `F = C * 9/5 + 32`

```rust
fn celsius_to_fahrenheit(celsius: f64) -> f64 {
    // Viết code của bạn ở đây
}

fn main() {
    println!("0°C = {}°F", celsius_to_fahrenheit(0.0));
    println!("25°C = {}°F", celsius_to_fahrenheit(25.0));
    println!("100°C = {}°F", celsius_to_fahrenheit(100.0));
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn celsius_to_fahrenheit(celsius: f64) -> f64 {
    celsius * 9.0 / 5.0 + 32.0
}

fn main() {
    println!("0°C = {}°F", celsius_to_fahrenheit(0.0));
    println!("25°C = {}°F", celsius_to_fahrenheit(25.0));
    println!("100°C = {}°F", celsius_to_fahrenheit(100.0));
}
```

**Kết quả:**
```
0°C = 32°F
25°C = 77°F
100°C = 212°F
```
</details>

---

### Bài 2: Tính Giai Thừa

Viết function tính giai thừa: `n! = n × (n-1) × ... × 1`

```rust
fn giai_thua(n: i32) -> i32 {
    // Viết code của bạn ở đây
}

fn main() {
    println!("5! = {}", giai_thua(5));
    println!("7! = {}", giai_thua(7));
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn giai_thua(n: i32) -> i32 {
    let mut ket_qua = 1;
    for i in 1..=n {
        ket_qua *= i;
    }
    ket_qua
}

fn main() {
    println!("5! = {}", giai_thua(5));
    println!("7! = {}", giai_thua(7));
}
```

**Kết quả:**
```
5! = 120
7! = 5040
```
</details>

---

### Bài 3: Số Fibonacci

Viết function tính số Fibonacci thứ n.

```rust
fn fibonacci(n: i32) -> i32 {
    // Viết code của bạn ở đây
}

fn main() {
    for i in 0..10 {
        println!("F({}) = {}", i, fibonacci(i));
    }
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn fibonacci(n: i32) -> i32 {
    if n <= 1 {
        return n;
    }

    let mut a = 0;
    let mut b = 1;

    for _ in 2..=n {
        let temp = a + b;
        a = b;
        b = temp;
    }

    b
}

fn main() {
    for i in 0..10 {
        println!("F({}) = {}", i, fibonacci(i));
    }
}
```

**Kết quả:**
```
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34
```
</details>

---

## 📝 Tóm Tắt

| Khái Niệm | Cú Pháp | Mô Tả |
|-----------|---------|-------|
| Định nghĩa | `fn name() { }` | Tạo function |
| Parameters | `fn f(x: i32) { }` | Đầu vào |
| Return type | `fn f() -> i32 { }` | Kiểu trả về |
| Return value | `x + 1` hoặc `return x + 1;` | Trả về giá trị |
| Unit type | `fn f() { }` | Không trả về (trả về `()`) |
| Call function | `f();` | Gọi function |

**Điểm Quan Trọng:**
- ✅ **Bắt buộc khai báo kiểu** cho parameters
- ✅ **Không có `;`** → Expression (trả về giá trị)
- ✅ **Có `;`** → Statement (không trả về)
- ✅ Function có thể ở **bất kỳ đâu** (trước/sau `main`)

---

## 🎯 Best Practices

### 1. Đặt Tên Function Rõ Ràng

```rust
// ❌ Tệ
fn f(x: i32) -> i32 { x * 2 }

// ✅ Tốt
fn nhan_doi(so: i32) -> i32 { so * 2 }
```

### 2. Function Nên Làm Một Việc

```rust
// ❌ Tệ - Làm nhiều việc
fn xu_ly_du_lieu(data: Vec<i32>) {
    // Validate
    // Transform
    // Save
    // Send email
    // ...
}

// ✅ Tốt - Tách nhỏ
fn validate_data(data: &Vec<i32>) -> bool { }
fn transform_data(data: Vec<i32>) -> Vec<i32> { }
fn save_data(data: &Vec<i32>) { }
```

### 3. Ưu Tiên Implicit Return

```rust
// ❌ Không cần thiết
fn tong(a: i32, b: i32) -> i32 {
    return a + b;
}

// ✅ Ngắn gọn hơn
fn tong(a: i32, b: i32) -> i32 {
    a + b
}
```

---

## 🎯 Bước Tiếp Theo

Bạn đã biết cách tạo functions cơ bản rồi! Bài tiếp theo, chúng ta sẽ tìm hiểu sâu hơn về **parameters** - cách truyền dữ liệu vào functions! 📥

➡️ **Tiếp theo**: [Tham Số Hàm: Truyền Dữ Liệu Vào](function-parameters)
