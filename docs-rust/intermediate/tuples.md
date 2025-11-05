---
sidebar_position: 8
title: "Tuple: Gói Nhiều Giá Trị Lại"
description: "Học cách sử dụng tuples trong Rust - gộp nhiều giá trị khác kiểu lại với nhau. Hiểu destructuring, truy cập phần tử và khi nào dùng tuples!"
keywords: [rust tuple, rust tuple destructuring, rust multiple values, rust tuple access]
---

# 🎁 Tuple: Gói Nhiều Giá Trị Lại

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Biết cách tạo và sử dụng tuples
- ✅ Truy cập phần tử tuple với .0, .1, .2
- ✅ Destructuring tuples
- ✅ Hiểu khi nào dùng tuple thay vì array/vector
:::

---

## 🤔 Vấn Đề: Gộp Nhiều Kiểu Khác Nhau

Arrays và Vectors chỉ chứa **cùng kiểu dữ liệu**:

```rust
// ✅ OK - Cùng kiểu i32
let arr = [1, 2, 3];

// ❌ Lỗi - Không thể trộn kiểu
// let arr = [1, "hai", 3.0];
```

**Vấn đề:** Nếu muốn lưu **thông tin sinh viên**: tên (String), tuổi (i32), điểm (f64)?

```rust
// ❌ Cách tệ - Nhiều biến riêng lẻ
let ten = String::from("An");
let tuoi = 20;
let diem = 8.5;
```

**Giải pháp:** Dùng **Tuple**! 🎁

---

## 📝 Tuple Là Gì?

**Tuple** là một collection gộp **nhiều giá trị** lại:

- **Các kiểu khác nhau** (không bắt buộc cùng kiểu)
- **Độ dài cố định** (giống array)
- Lưu trên **stack** (nhanh)
- **Thứ tự quan trọng** (position-based)

:::info Ẩn Dụ
Hãy tưởng tượng **tuple** như **một hộp đồ bảo hộ cá nhân**:

🎁 **Hộp chứa:**
- 🪖 Mũ bảo hiểm (String)
- 👔 Size áo: 42 (i32)
- 👞 Cỡ giày: 39.5 (f64)
- ✅ Đã kiểm tra: true (bool)

**Đặc điểm:**
- Mỗi vị trí chứa **loại đồ khác nhau** (khác kiểu)
- **Thứ tự cố định** (vị trí 0: mũ, vị trí 1: size, ...)
- Không thể thêm/bớt vị trí! 🛡️
:::

---

## 📝 Tạo Tuple

### Cú Pháp

```rust
let tên_tuple: (kiểu1, kiểu2, kiểu3) = (giá_trị1, giá_trị2, giá_trị3);
```

### Ví Dụ Đơn Giản

```rust
fn main() {
    let person = ("An", 20, 8.5);
    println!("Thông tin: {:?}", person);
}
```

**Kết quả:**
```
Thông tin: ("An", 20, 8.5)
```

**Giải thích:**
- `("An", 20, 8.5)` → Tuple 3 phần tử
- `"An"` → &str
- `20` → i32
- `8.5` → f64

### Với Type Annotations

```rust
fn main() {
    let student: (&str, i32, f64) = ("Bình", 21, 9.0);
    println!("Sinh viên: {:?}", student);
}
```

**Kết quả:**
```
Sinh viên: ("Bình", 21, 9.0)
```

---

## 🔍 Truy Cập Phần Tử

Dùng `.index` để truy cập phần tử (index bắt đầu từ 0):

```rust
fn main() {
    let person = ("Chi", 19, 8.8);

    println!("Tên: {}", person.0);   // Index 0
    println!("Tuổi: {}", person.1);  // Index 1
    println!("Điểm: {}", person.2);  // Index 2
}
```

**Kết quả:**
```
Tên: Chi
Tuổi: 19
Điểm: 8.8
```

**Lưu ý:** Khác với array/vector dùng `[index]`, tuple dùng `.index`

```rust
let arr = [1, 2, 3];
println!("{}", arr[0]);  // ✅ Array dùng []

let tup = (1, 2, 3);
println!("{}", tup.0);   // ✅ Tuple dùng .
```

---

## 📦 Destructuring (Giải Nén)

**Destructuring** là cách "mở hộp" tuple thành các biến riêng:

### Cú Pháp

```rust
let (biến1, biến2, biến3) = tuple;
```

### Ví Dụ

```rust
fn main() {
    let student = ("Dũng", 22, 7.5);

    let (ten, tuoi, diem) = student;  // ✅ Destructuring

    println!("Tên: {}", ten);
    println!("Tuổi: {}", tuoi);
    println!("Điểm: {}", diem);
}
```

**Kết quả:**
```
Tên: Dũng
Tuổi: 22
Điểm: 7.5
```

**Giải thích:**
- `let (ten, tuoi, diem) = student;` → "Giải nén" tuple
- `ten` = `"Dũng"`
- `tuoi` = `22`
- `diem` = `7.5`

---

## 🎯 Destructuring Một Phần

Dùng `_` để bỏ qua giá trị không cần:

```rust
fn main() {
    let data = ("Rust", 2015, true, 9.5);

    let (ngon_ngu, _, _, diem) = data;

    println!("Ngôn ngữ: {}", ngon_ngu);
    println!("Điểm: {}", diem);
}
```

**Kết quả:**
```
Ngôn ngữ: Rust
Điểm: 9.5
```

**Giải thích:**
- `_` → Bỏ qua giá trị (không tạo biến)
- Chỉ lấy giá trị cần thiết

---

## 🔄 Tuple Rỗng: Unit Type

Tuple **không có phần tử** gọi là **unit type** `()`:

```rust
fn main() {
    let empty = ();
    println!("Empty tuple: {:?}", empty);
}
```

**Kết quả:**
```
Empty tuple: ()
```

:::info Unit Type Là Gì?
`()` là **giá trị mặc định** của functions không trả về gì:

```rust
fn say_hello() {
    println!("Hello!");
    // Không có return → Tự động trả về ()
}

fn main() {
    let result = say_hello();
    println!("Result: {:?}", result);  // ()
}
```

**Kết quả:**
```
Hello!
Result: ()
```
:::

---

## ✏️ Thay Đổi Tuple (Mutable)

Tuple có thể thay đổi nếu khai báo `mut`:

```rust
fn main() {
    let mut point = (10, 20);

    println!("Trước: {:?}", point);

    point.0 = 30;
    point.1 = 40;

    println!("Sau: {:?}", point);
}
```

**Kết quả:**
```
Trước: (10, 20)
Sau: (30, 40)
```

---

## 🎮 Ví Dụ Thực Tế: Tọa Độ 2D

```rust
fn main() {
    let point_a = (10, 20);
    let point_b = (30, 40);

    println!("📍 Điểm A: ({}, {})", point_a.0, point_a.1);
    println!("📍 Điểm B: ({}, {})", point_b.0, point_b.1);

    // Tính khoảng cách
    let dx = (point_b.0 - point_a.0) as f64;
    let dy = (point_b.1 - point_a.1) as f64;
    let distance = (dx * dx + dy * dy).sqrt();

    println!("📏 Khoảng cách: {:.2}", distance);
}
```

**Kết quả:**
```
📍 Điểm A: (10, 20)
📍 Điểm B: (30, 40)
📏 Khoảng cách: 28.28
```

---

## 🔄 Function Trả Về Tuple

Functions có thể trả về **nhiều giá trị** bằng tuple:

```rust
fn tinh_toan(a: i32, b: i32) -> (i32, i32, i32, i32) {
    let tong = a + b;
    let hieu = a - b;
    let tich = a * b;
    let thuong = a / b;

    (tong, hieu, tich, thuong)  // ✅ Trả về tuple
}

fn main() {
    let (tong, hieu, tich, thuong) = tinh_toan(20, 4);

    println!("Tổng: {}", tong);
    println!("Hiệu: {}", hieu);
    println!("Tích: {}", tich);
    println!("Thương: {}", thuong);
}
```

**Kết quả:**
```
Tổng: 24
Hiệu: 16
Tích: 80
Thương: 5
```

---

## 📊 Ví Dụ: Phân Tích Chuỗi

```rust
fn phan_tich_chuoi(s: &str) -> (usize, usize, usize) {
    let do_dai = s.len();
    let so_ky_tu = s.chars().count();
    let so_tu = s.split_whitespace().count();

    (do_dai, so_ky_tu, so_tu)
}

fn main() {
    let text = "Học Rust rất thú vị!";

    let (bytes, chars, words) = phan_tich_chuoi(text);

    println!("📝 Chuỗi: \"{}\"", text);
    println!("📊 Số bytes: {}", bytes);
    println!("📊 Số ký tự: {}", chars);
    println!("📊 Số từ: {}", words);
}
```

**Kết quả:**
```
📝 Chuỗi: "Học Rust rất thú vị!"
📊 Số bytes: 24
📊 Số ký tự: 20
📊 Số từ: 5
```

---

## 🎁 Tuple Lồng Nhau (Nested Tuples)

Tuple có thể chứa tuple khác:

```rust
fn main() {
    let student = (
        "An",
        20,
        (8.5, 9.0, 7.5)  // Tuple điểm 3 môn
    );

    println!("Tên: {}", student.0);
    println!("Tuổi: {}", student.1);
    println!("Điểm môn 1: {}", (student.2).0);
    println!("Điểm môn 2: {}", (student.2).1);
    println!("Điểm môn 3: {}", (student.2).2);
}
```

**Kết quả:**
```
Tên: An
Tuổi: 20
Điểm môn 1: 8.5
Điểm môn 2: 9.0
Điểm môn 3: 7.5
```

**Hoặc dùng destructuring:**

```rust
fn main() {
    let student = ("Bình", 21, (8.5, 9.0, 7.5));

    let (ten, tuoi, (diem1, diem2, diem3)) = student;

    println!("Tên: {}", ten);
    println!("Tuổi: {}", tuoi);
    println!("Điểm: {}, {}, {}", diem1, diem2, diem3);
}
```

**Kết quả:**
```
Tên: Bình
Tuổi: 21
Điểm: 8.5, 9.0, 7.5
```

---

## 🔄 Swap Values Với Tuple

Hoán đổi giá trị dễ dàng với tuple:

```rust
fn main() {
    let mut a = 10;
    let mut b = 20;

    println!("Trước: a = {}, b = {}", a, b);

    // ✅ Swap đơn giản với tuple
    (a, b) = (b, a);

    println!("Sau: a = {}, b = {}", a, b);
}
```

**Kết quả:**
```
Trước: a = 10, b = 20
Sau: a = 20, b = 10
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Dùng [] Thay Vì .

```rust
let tup = (1, 2, 3);

// ❌ Lỗi - Tuple không dùng []
// println!("{}", tup[0]);

// ✅ Đúng - Dùng .
println!("{}", tup.0);
```

### 2. Số Lượng Biến Không Khớp

```rust
let tup = (1, 2, 3);

// ❌ Lỗi - 3 phần tử nhưng chỉ có 2 biến
// let (a, b) = tup;

// ✅ Đúng - Đủ 3 biến
let (a, b, c) = tup;

// ✅ Hoặc dùng _
let (a, _, c) = tup;
```

### 3. Index Không Tồn Tại

```rust
let tup = (1, 2, 3);

// ❌ Lỗi compile - Không có .3
// println!("{}", tup.3);

// ✅ Chỉ có .0, .1, .2
println!("{}", tup.2);
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Thông Tin Sách

Tạo tuple lưu thông tin sách (tên, tác giả, năm xuất bản, giá) và in ra.

```rust
fn main() {
    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let sach = ("Rust Programming", "Steve Klabnik", 2018, 450_000);

    let (ten, tac_gia, nam, gia) = sach;

    println!("📚 Thông tin sách:");
    println!("Tên: {}", ten);
    println!("Tác giả: {}", tac_gia);
    println!("Năm XB: {}", nam);
    println!("Giá: {}đ", gia);
}
```

**Kết quả:**
```
📚 Thông tin sách:
Tên: Rust Programming
Tác giả: Steve Klabnik
Năm XB: 2018
Giá: 450000đ
```
</details>

---

### Bài 2: Function Tìm Min/Max

Viết function nhận array, trả về tuple (min, max).

```rust
fn tim_min_max(arr: &[i32]) -> (i32, i32) {
    // Viết code của bạn ở đây
}

fn main() {
    let numbers = [45, 23, 67, 12, 89, 34];
    let (min, max) = tim_min_max(&numbers);

    println!("Mảng: {:?}", numbers);
    println!("Min: {}, Max: {}", min, max);
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn tim_min_max(arr: &[i32]) -> (i32, i32) {
    let mut min = arr[0];
    let mut max = arr[0];

    for &num in arr {
        if num < min {
            min = num;
        }
        if num > max {
            max = num;
        }
    }

    (min, max)
}

fn main() {
    let numbers = [45, 23, 67, 12, 89, 34];
    let (min, max) = tim_min_max(&numbers);

    println!("Mảng: {:?}", numbers);
    println!("Min: {}, Max: {}", min, max);
}
```

**Kết quả:**
```
Mảng: [45, 23, 67, 12, 89, 34]
Min: 12, Max: 89
```
</details>

---

### Bài 3: RGB Color

Tạo tuple lưu màu RGB (r, g, b) và in thông tin màu.

```rust
fn main() {
    let color = (255, 100, 50);

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let color = (255, 100, 50);

    println!("🎨 Màu RGB:");
    println!("Red: {}", color.0);
    println!("Green: {}", color.1);
    println!("Blue: {}", color.2);
    println!("Hex: #{:02X}{:02X}{:02X}", color.0, color.1, color.2);
}
```

**Kết quả:**
```
🎨 Màu RGB:
Red: 255
Green: 100
Blue: 50
Hex: #FF6432
```
</details>

---

## 📝 Tóm Tắt

| Khái Niệm | Cú Pháp | Mô Tả |
|-----------|---------|-------|
| Tạo tuple | `(1, "hai", 3.0)` | Gộp nhiều giá trị |
| Type annotation | `(i32, &str, f64)` | Chỉ định kiểu |
| Truy cập | `tup.0`, `tup.1` | Dùng `.index` |
| Destructuring | `let (a, b, c) = tup;` | Giải nén tuple |
| Bỏ qua | `let (a, _, c) = tup;` | Dùng `_` |
| Unit type | `()` | Tuple rỗng |

**Điểm Quan Trọng:**
- ✅ Chứa **nhiều kiểu khác nhau**
- ✅ Độ dài **cố định**
- ✅ Truy cập bằng `.index` (không phải `[index]`)
- ✅ Hữu ích cho **trả về nhiều giá trị**

---

## 🎯 Khi Nào Dùng Tuple?

### ✅ Dùng Tuple khi:

1. **Trả về nhiều giá trị** từ function
   ```rust
   fn divide(a: i32, b: i32) -> (i32, i32) {
       (a / b, a % b)  // Thương và dư
   }
   ```

2. **Gộp vài giá trị liên quan** (2-4 giá trị)
   ```rust
   let point = (10, 20);  // Tọa độ x, y
   let rgb = (255, 128, 0);  // Màu
   ```

3. **Swap values**
   ```rust
   (a, b) = (b, a);
   ```

4. **Destructuring pattern matching**
   ```rust
   match result {
       (0, _) => println!("X = 0"),
       (_, 0) => println!("Y = 0"),
       _ => println!("Khác"),
   }
   ```

### ❌ Không dùng Tuple khi:

1. **Quá nhiều phần tử** (> 4-5) → Dùng **Struct**
2. **Cần tên field rõ ràng** → Dùng **Struct**
3. **Cần thêm/xóa phần tử** → Dùng **Vec**

```rust
// ❌ Tệ - Quá nhiều, khó nhớ
let data = (1, 2, 3, 4, 5, 6, 7, 8);

// ✅ Tốt - Dùng Struct
struct Data {
    id: i32,
    name: String,
    age: i32,
    // ...
}
```

---

## 🎯 Bước Tiếp Theo

Bạn đã hiểu Collections cơ bản (Arrays, Vectors, Tuples) rồi! 🎉

Bài tiếp theo, chúng ta sẽ học **Functions** - cách đóng gói code có thể tái sử dụng! 🚀

➡️ **Tiếp theo**: [Hàm: Đóng Gói Code Có Thể Tái Sử Dụng](functions-basics)
