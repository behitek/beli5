---
sidebar_position: 10
title: "Tham Số Hàm: Truyền Dữ Liệu Vào"
description: "Học cách truyền tham số vào functions trong Rust. Hiểu về ownership, borrowing với parameters, và khi nào dùng pass by value vs reference!"
keywords: [rust function parameters, rust pass by value, rust pass by reference, rust borrowing parameters, rust ownership functions]
---

# 📥 Tham Số Hàm: Truyền Dữ Liệu Vào

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Hiểu cách truyền nhiều parameters
- ✅ Biết sự khác biệt giữa pass by value và reference
- ✅ Sử dụng mutable parameters
- ✅ Tránh lỗi ownership khi truyền tham số
:::

---

## 🤔 Parameters Là Gì?

**Parameters** (tham số) là **đầu vào** của function - cách để truyền dữ liệu vào function.

```rust
fn chao(ten: &str) {  // ten là parameter
    println!("Xin chào, {}!", ten);
}

fn main() {
    chao("An");  // "An" là argument
}
```

:::info Ẩn Dụ
Hãy tưởng tượng **parameters** như **nguyên liệu đầu vào** cho máy móc:

🏗️ **Máy sản xuất gạch:**
- **Parameters**: Xi măng, cát, nước (nguyên liệu)
- **Process**: Trộn, đúc, ép
- **Output**: Gạch hoàn thiện

**Đặc điểm:**
- Máy **cần biết chính xác** nguyên liệu (kiểu dữ liệu)
- **Không** xi măng → Máy không chạy được
- **Sai tỷ lệ** → Gạch kém chất lượng 🛡️
:::

---

## 📝 Một Parameter

Cú pháp đầy đủ:

```rust
fn function_name(parameter_name: Type) {
    // Code
}
```

### Ví Dụ

```rust
fn in_boi_so(n: i32) {
    println!("Bội số của {}:", n);
    for i in 1..=5 {
        println!("{} × {} = {}", n, i, n * i);
    }
}

fn main() {
    in_boi_so(7);
}
```

**Kết quả:**
```
Bội số của 7:
7 × 1 = 7
7 × 2 = 14
7 × 3 = 21
7 × 4 = 28
7 × 5 = 35
```

---

## 🔢 Nhiều Parameters

Cách viết nhiều parameters, **cách nhau bằng dấu phẩy**:

```rust
fn tinh_dien_tich(width: i32, height: i32) {
    let area = width * height;
    println!("Diện tích {}×{} = {}", width, height, area);
}

fn main() {
    tinh_dien_tich(10, 20);
    tinh_dien_tich(5, 8);
}
```

**Kết quả:**
```
Diện tích 10×20 = 200
Diện tích 5×8 = 40
```

### Nhiều Kiểu Khác Nhau

```rust
fn thong_tin_sinh_vien(ten: &str, tuoi: i32, diem: f64) {
    println!("📝 Sinh viên: {}", ten);
    println!("🎂 Tuổi: {}", tuoi);
    println!("📊 Điểm: {:.2}", diem);
}

fn main() {
    thong_tin_sinh_vien("An", 20, 8.5);
}
```

**Kết quả:**
```
📝 Sinh viên: An
🎂 Tuổi: 20
📊 Điểm: 8.50
```

---

## 🔄 Pass By Value (Chuyển Giá Trị)

Với **kiểu đơn giản** (Copy types), Rust **copy giá trị**:

```rust
fn nhan_doi(mut x: i32) {
    x *= 2;
    println!("Trong function: x = {}", x);
}

fn main() {
    let so = 5;
    println!("Trước: so = {}", so);

    nhan_doi(so);

    println!("Sau: so = {}", so);  // ✅ Vẫn là 5!
}
```

**Kết quả:**
```
Trước: so = 5
Trong function: x = 10
Sau: so = 5
```

**Giải thích:**
- `nhan_doi(so)` → **Copy** giá trị 5
- Thay đổi `x` trong function **không ảnh hưởng** `so` bên ngoài
- Các kiểu Copy: i32, f64, bool, char, ...

---

## 📦 Pass By Reference (Mượn Tham Chiếu)

Với **kiểu phức tạp** (String, Vec, ...), dùng **reference** để **mượn**:

### Immutable Reference `&T`

```rust
fn in_thong_tin(text: &String) {
    println!("Độ dài: {}", text.len());
    println!("Nội dung: {}", text);
}

fn main() {
    let message = String::from("Hello Rust!");

    in_thong_tin(&message);  // ✅ Mượn

    println!("Vẫn dùng được: {}", message);  // ✅ OK
}
```

**Kết quả:**
```
Độ dài: 11
Nội dung: Hello Rust!
Vẫn dùng được: Hello Rust!
```

**Giải thích:**
- `&message` → Mượn reference (không chuyển ownership)
- Function chỉ **đọc**, không thay đổi
- Sau function, `message` **vẫn dùng được**

### Mutable Reference `&mut T`

```rust
fn them_cam_tan(text: &mut String) {
    text.push_str("!!!");
}

fn main() {
    let mut message = String::from("Hello");

    println!("Trước: {}", message);

    them_cam_tan(&mut message);  // ✅ Mượn mutable

    println!("Sau: {}", message);
}
```

**Kết quả:**
```
Trước: Hello
Sau: Hello!!!
```

**Giải thích:**
- `&mut message` → Mượn mutable reference
- Function **có thể thay đổi** giá trị
- Vẫn giữ ownership ở `main`

---

## 🆚 Pass By Value vs Reference

### Ví Dụ So Sánh

```rust
fn move_ownership(s: String) {
    println!("Move: {}", s);
    // s bị drop ở đây
}

fn borrow_immutable(s: &String) {
    println!("Borrow: {}", s);
}

fn borrow_mutable(s: &mut String) {
    s.push_str(" - Modified");
}

fn main() {
    // 1. Move ownership
    let s1 = String::from("Test 1");
    move_ownership(s1);
    // println!("{}", s1);  // ❌ Lỗi - s1 đã move!

    // 2. Borrow immutable
    let s2 = String::from("Test 2");
    borrow_immutable(&s2);
    println!("Vẫn dùng: {}", s2);  // ✅ OK

    // 3. Borrow mutable
    let mut s3 = String::from("Test 3");
    borrow_mutable(&mut s3);
    println!("Đã sửa: {}", s3);  // ✅ OK
}
```

**Kết quả:**
```
Move: Test 1
Borrow: Test 2
Vẫn dùng: Test 2
Đã sửa: Test 3 - Modified
```

:::tip Khi Nào Dùng Cái Nào?

| Loại | Khi Nào Dùng | Ưu Điểm | Nhược Điểm |
|------|--------------|---------|------------|
| Value `T` | Copy types (i32, bool) | Đơn giản | Copy overhead với lớn |
| `&T` | Chỉ đọc, không sửa | Hiệu quả, an toàn | Không sửa được |
| `&mut T` | Cần sửa đổi | Hiệu quả, linh hoạt | Phức tạp hơn |

```rust
// ✅ i32 → Pass by value
fn cong(a: i32, b: i32) -> i32 { a + b }

// ✅ String → Pass by reference (đọc)
fn in_string(s: &String) { println!("{}", s); }

// ✅ String → Pass by mut reference (sửa)
fn them_text(s: &mut String) { s.push_str("!"); }

// ❌ Tránh - Move ownership trừ khi cần thiết
fn xu_ly(s: String) { /* s bị drop */ }
```
:::

---

## 🎮 Ví Dụ Thực Tế: Xử Lý Vector

```rust
fn tinh_tong(numbers: &Vec<i32>) -> i32 {
    let mut sum = 0;
    for &num in numbers {
        sum += num;
    }
    sum
}

fn nhan_doi_tat_ca(numbers: &mut Vec<i32>) {
    for num in numbers.iter_mut() {
        *num *= 2;
    }
}

fn main() {
    let mut data = vec![10, 20, 30, 40];

    println!("Dữ liệu: {:?}", data);

    let tong = tinh_tong(&data);  // Mượn immutable
    println!("Tổng: {}", tong);

    nhan_doi_tat_ca(&mut data);   // Mượn mutable
    println!("Sau nhân đôi: {:?}", data);
}
```

**Kết quả:**
```
Dữ liệu: [10, 20, 30, 40]
Tổng: 100
Sau nhân đôi: [20, 40, 60, 80]
```

---

## 🔄 Return Ownership

Function có thể **trả về ownership**:

```rust
fn tao_string(text: &str) -> String {
    String::from(text)  // ✅ Trả về ownership
}

fn them_huyen(mut s: String) -> String {
    s.push('!');
    s  // ✅ Trả về ownership
}

fn main() {
    let s1 = tao_string("Hello");
    println!("s1: {}", s1);

    let s2 = them_huyen(s1);  // s1 move vào function
    // println!("{}", s1);    // ❌ Lỗi - s1 đã move
    println!("s2: {}", s2);
}
```

**Kết quả:**
```
s1: Hello
s2: Hello!
```

---

## 🎯 Pattern: Mượn, Xử Lý, Trả Về

Pattern phổ biến: **Mượn đầu vào, tạo mới, trả về**:

```rust
fn capitalize(s: &str) -> String {
    s.to_uppercase()  // Tạo String mới
}

fn main() {
    let text = "rust";
    let upper = capitalize(text);

    println!("Gốc: {}", text);
    println!("Viết hoa: {}", upper);
}
```

**Kết quả:**
```
Gốc: rust
Viết hoa: RUST
```

---

## 📊 Ví Dụ: Tìm Kiếm Trong Array

```rust
fn tim_kiem(arr: &[i32], target: i32) -> Option<usize> {
    for (index, &value) in arr.iter().enumerate() {
        if value == target {
            return Some(index);
        }
    }
    None
}

fn main() {
    let numbers = [10, 25, 30, 42, 55];

    match tim_kiem(&numbers, 30) {
        Some(index) => println!("Tìm thấy tại vị trí {}", index),
        None => println!("Không tìm thấy"),
    }

    match tim_kiem(&numbers, 99) {
        Some(index) => println!("Tìm thấy tại vị trí {}", index),
        None => println!("Không tìm thấy"),
    }
}
```

**Kết quả:**
```
Tìm thấy tại vị trí 2
Không tìm thấy
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Quên & Khi Truyền Reference

```rust
fn xu_ly(s: &String) {
    println!("{}", s);
}

fn main() {
    let text = String::from("Hello");

    // ❌ Lỗi - Thiếu &
    // xu_ly(text);

    // ✅ Đúng
    xu_ly(&text);
}
```

### 2. Sử Dụng Sau Khi Move

```rust
fn consume(s: String) {
    println!("{}", s);
}

fn main() {
    let text = String::from("Hello");

    consume(text);  // text bị move

    // ❌ Lỗi - text đã move
    // println!("{}", text);
}
```

**Sửa:** Dùng reference:

```rust
fn consume(s: &String) {
    println!("{}", s);
}

fn main() {
    let text = String::from("Hello");
    consume(&text);
    println!("{}", text);  // ✅ OK
}
```

### 3. Nhiều Mutable Borrows

```rust
fn main() {
    let mut data = vec![1, 2, 3];

    let r1 = &mut data;
    // let r2 = &mut data;  // ❌ Lỗi - Chỉ một &mut tại một thời điểm!

    r1.push(4);
}
```

### 4. Thay Đổi Immutable Reference

```rust
fn them(s: &String) {
    // ❌ Lỗi - s là immutable reference
    // s.push_str("!");
}

// ✅ Đúng - Dùng &mut
fn them(s: &mut String) {
    s.push_str("!");
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Đếm Từ

Viết function đếm số từ trong một chuỗi.

```rust
fn dem_tu(text: &str) -> usize {
    // Viết code của bạn ở đây
}

fn main() {
    let cau = "Học Rust rất thú vị";
    println!("Câu: \"{}\"", cau);
    println!("Số từ: {}", dem_tu(cau));
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn dem_tu(text: &str) -> usize {
    text.split_whitespace().count()
}

fn main() {
    let cau = "Học Rust rất thú vị";
    println!("Câu: \"{}\"", cau);
    println!("Số từ: {}", dem_tu(cau));
}
```

**Kết quả:**
```
Câu: "Học Rust rất thú vị"
Số từ: 4
```
</details>

---

### Bài 2: Lọc Số Chẵn

Viết function nhận vector, trả về vector mới chỉ chứa số chẵn.

```rust
fn loc_so_chan(numbers: &Vec<i32>) -> Vec<i32> {
    // Viết code của bạn ở đây
}

fn main() {
    let data = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let chan = loc_so_chan(&data);

    println!("Gốc: {:?}", data);
    println!("Chẵn: {:?}", chan);
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn loc_so_chan(numbers: &Vec<i32>) -> Vec<i32> {
    let mut result = Vec::new();
    for &num in numbers {
        if num % 2 == 0 {
            result.push(num);
        }
    }
    result
}

fn main() {
    let data = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let chan = loc_so_chan(&data);

    println!("Gốc: {:?}", data);
    println!("Chẵn: {:?}", chan);
}
```

**Kết quả:**
```
Gốc: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Chẵn: [2, 4, 6, 8, 10]
```
</details>

---

### Bài 3: Đảo Ngược Chuỗi In-Place

Viết function đảo ngược String sử dụng mutable reference.

```rust
fn dao_nguoc(s: &mut String) {
    // Viết code của bạn ở đây
}

fn main() {
    let mut text = String::from("Hello");
    println!("Trước: {}", text);

    dao_nguoc(&mut text);
    println!("Sau: {}", text);
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn dao_nguoc(s: &mut String) {
    *s = s.chars().rev().collect();
}

fn main() {
    let mut text = String::from("Hello");
    println!("Trước: {}", text);

    dao_nguoc(&mut text);
    println!("Sau: {}", text);
}
```

**Kết quả:**
```
Trước: Hello
Sau: olleH
```
</details>

---

## 📝 Tóm Tắt

| Kiểu Parameter | Cú Pháp | Khi Nào Dùng |
|----------------|---------|--------------|
| By value | `fn f(x: i32)` | Copy types (i32, bool, char) |
| Immutable ref | `fn f(x: &String)` | Chỉ đọc, không sửa |
| Mutable ref | `fn f(x: &mut String)` | Cần sửa đổi |
| Move ownership | `fn f(x: String)` | Function sở hữu giá trị |

**Quy Tắc Vàng:**
- ✅ **Copy types** (i32, f64, bool) → Pass by value
- ✅ **Chỉ đọc** → `&T` (immutable reference)
- ✅ **Cần sửa** → `&mut T` (mutable reference)
- ⚠️ **Move** → Chỉ khi cần ownership

---

## 🎯 Best Practices

### 1. Ưu Tiên Borrowing

```rust
// ❌ Tệ - Move ownership không cần thiết
fn print_len(s: String) {
    println!("{}", s.len());
}

// ✅ Tốt - Borrow
fn print_len(s: &String) {
    println!("{}", s.len());
}

// ✅ Tốt hơn - str slice
fn print_len(s: &str) {
    println!("{}", s.len());
}
```

### 2. Dùng Slices Thay Vì References

```rust
// ✅ Linh hoạt hơn - Nhận cả &String, &str, string literal
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}
```

### 3. Trả Về Ownership Khi Cần

```rust
// ✅ Tạo và trả về - Pattern phổ biến
fn make_greeting(name: &str) -> String {
    format!("Xin chào, {}!", name)
}
```

---

## 🎯 Bước Tiếp Theo

Bạn đã hiểu về parameters rồi! Bài tiếp theo, chúng ta sẽ học **Closures** - functions ẩn danh có thể capture environment! 🚀

➡️ **Tiếp theo**: [Closures: Hàm Ẩn Danh](closures)
