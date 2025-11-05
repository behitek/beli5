---
sidebar_position: 4
title: "While: Lặp Khi Điều Kiện Đúng"
description: "Học cách dùng while loop trong Rust - lặp lại công việc khi điều kiện còn đúng. Ngắn gọn và dễ đọc hơn loop với if!"
keywords: [rust while, rust while loop, rust conditional loop, rust loop condition]
---

# 🔁 While: Lặp Khi Điều Kiện Đúng

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Biết cách dùng `while` để lặp khi điều kiện đúng
- ✅ Hiểu sự khác biệt giữa `while` và `loop`
- ✅ Tránh infinite loops với điều kiện sai
- ✅ Viết code ngắn gọn và dễ đọc hơn
:::

---

## 🤔 Vấn Đề Với Loop + If

Trong bài trước, chúng ta dùng `loop` với `if` và `break`:

```rust
fn main() {
    let mut dem = 0;

    loop {
        if dem >= 5 {
            break;  // Điều kiện dừng
        }

        println!("Đếm: {}", dem);
        dem += 1;
    }
}
```

**Vấn đề:** Dài dòng, phải nhớ `break`!

**Giải pháp:** Dùng `while`! 🎯

---

## 📝 While Cơ Bản

`while` lặp **khi điều kiện còn đúng** - tự động dừng khi điều kiện sai.

### Cú Pháp

```rust
while điều_kiện {
    // Code lặp lại khi điều kiện đúng
}
```

### Ví Dụ: Đếm Từ 0-4

```rust
fn main() {
    let mut dem = 0;

    while dem < 5 {
        println!("Đếm: {}", dem);
        dem += 1;
    }

    println!("Xong!");
}
```

**Kết quả:**
```
Đếm: 0
Đếm: 1
Đếm: 2
Đếm: 3
Đếm: 4
Xong!
```

**Giải thích:**
1. Kiểm tra `dem < 5` → Đúng (0 < 5)
2. Chạy code trong `{}`
3. `dem` tăng lên 1
4. Quay lại bước 1
5. Khi `dem = 5` → Điều kiện sai → Dừng

:::info Ẩn Dụ
Hãy tưởng tượng **while** như **kiểm tra đồ bảo hộ trước khi vào công trường**:

- **While** có đồ bảo hộ đầy đủ → Vào làm việc
- **While** nhiệt độ < 40°C → Tiếp tục làm
- **While** còn vật liệu → Tiếp tục xây

Khi điều kiện **không còn đúng** → Dừng lại! 🛡️
:::

---

## 🆚 So Sánh: While vs Loop

### Loop + If + Break

```rust
fn main() {
    let mut x = 0;

    loop {
        if x >= 3 {
            break;
        }
        println!("{}", x);
        x += 1;
    }
}
```

### While (Ngắn Gọn Hơn)

```rust
fn main() {
    let mut x = 0;

    while x < 3 {
        println!("{}", x);
        x += 1;
    }
}
```

**Ưu điểm của While:**
- ✅ Ngắn gọn hơn
- ✅ Điều kiện rõ ràng ngay từ đầu
- ✅ Không cần nhớ `break`

---

## 🔢 Ví Dụ: Đếm Ngược

```rust
fn main() {
    let mut rocket = 10;

    println!("🚀 Chuẩn bị phóng tên lửa!");

    while rocket > 0 {
        println!("{}...", rocket);
        rocket -= 1;
    }

    println!("🚀 Phóng!");
}
```

**Kết quả:**
```
🚀 Chuẩn bị phóng tên lửa!
10...
9...
8...
7...
6...
5...
4...
3...
2...
1...
🚀 Phóng!
```

---

## 📊 Ví Dụ: Tính Tổng

```rust
fn main() {
    let mut tong = 0;
    let mut so = 1;

    while so <= 10 {
        tong += so;
        so += 1;
    }

    println!("Tổng từ 1-10: {}", tong);
}
```

**Kết quả:**
```
Tổng từ 1-10: 55
```

**Giải thích:** 1 + 2 + 3 + ... + 10 = 55

---

## 🎮 Ví Dụ Thực Tế: Kiểm Tra Password

```rust
use std::io;

fn main() {
    let password_dung = "rust2024";
    let mut so_lan_thu = 0;
    let max_lan_thu = 3;

    println!("🔐 Nhập mật khẩu:");

    while so_lan_thu < max_lan_thu {
        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("Lỗi đọc input");

        let password = input.trim();

        if password == password_dung {
            println!("✅ Đăng nhập thành công!");
            break;  // ✅ Có thể dùng break trong while
        } else {
            so_lan_thu += 1;
            let con_lai = max_lan_thu - so_lan_thu;

            if con_lai > 0 {
                println!("❌ Sai mật khẩu! Còn {} lần thử.", con_lai);
            }
        }
    }

    if so_lan_thu >= max_lan_thu {
        println!("🚫 Đã hết lượt thử! Tài khoản bị khóa.");
    }
}
```

**Ví dụ chạy:**
```
🔐 Nhập mật khẩu:
123456
❌ Sai mật khẩu! Còn 2 lần thử.
password
❌ Sai mật khẩu! Còn 1 lần thử.
rust2024
✅ Đăng nhập thành công!
```

---

## 🔍 Ví Dụ: Tìm Kiếm Trong Mảng

```rust
fn main() {
    let danh_sach = [10, 25, 30, 42, 55];
    let tim_kiem = 30;

    let mut i = 0;
    let mut tim_thay = false;

    while i < danh_sach.len() {
        if danh_sach[i] == tim_kiem {
            println!("✅ Tìm thấy {} ở vị trí {}", tim_kiem, i);
            tim_thay = true;
            break;
        }
        i += 1;
    }

    if !tim_thay {
        println!("❌ Không tìm thấy {}", tim_kiem);
    }
}
```

**Kết quả:**
```
✅ Tìm thấy 30 ở vị trí 2
```

---

## ⚠️ While True: Vòng Lặp Vô Hạn

`while true` giống như `loop` - lặp mãi mãi!

### Ví Dụ

```rust
fn main() {
    let mut dem = 0;

    while true {  // ⚠️ Giống loop
        println!("Lần {}", dem);
        dem += 1;

        if dem >= 5 {
            break;
        }
    }
}
```

:::tip Nên Dùng Gì?
- `loop` → Rõ ràng hơn, ý định lặp vô hạn
- `while true` → Có thể gây nhầm lẫn

```rust
// ✅ Tốt hơn - Rõ ràng là infinite loop
loop {
    // ...
    if dieu_kien {
        break;
    }
}

// ❌ Kém hơn - Trông như có điều kiện nhưng lại true
while true {
    // ...
}
```
:::

---

## 🔄 While Với Continue

`continue` cũng hoạt động trong `while`:

```rust
fn main() {
    let mut so = 0;

    while so < 10 {
        so += 1;

        if so % 2 == 0 {
            continue;  // ⏭️ Bỏ qua số chẵn
        }

        println!("{} là số lẻ", so);
    }
}
```

**Kết quả:**
```
1 là số lẻ
3 là số lẻ
5 là số lẻ
7 là số lẻ
9 là số lẻ
```

**Lưu ý:** Đảm bảo biến đếm tăng **trước** `continue`!

```rust
// ❌ Lỗi - Infinite loop!
let mut x = 0;
while x < 5 {
    if x == 2 {
        continue;  // Bỏ qua x += 1 → x mãi = 2!
    }
    x += 1;
}

// ✅ Đúng
let mut x = 0;
while x < 5 {
    x += 1;  // ✅ Tăng trước
    if x == 2 {
        continue;
    }
    println!("{}", x);
}
```

---

## 🧮 Ví Dụ: Số Nguyên Tố

```rust
fn main() {
    let so = 29;
    let mut i = 2;
    let mut la_nguyen_to = true;

    while i <= so / 2 {
        if so % i == 0 {
            la_nguyen_to = false;
            break;
        }
        i += 1;
    }

    if la_nguyen_to && so > 1 {
        println!("{} là số nguyên tố", so);
    } else {
        println!("{} không phải số nguyên tố", so);
    }
}
```

**Kết quả:**
```
29 là số nguyên tố
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Điều Kiện Luôn Đúng - Infinite Loop

```rust
// ❌ Lỗi - x không bao giờ thay đổi!
let mut x = 0;
while x >= 0 {  // Luôn đúng với số không âm
    println!("{}", x);
    // Quên tăng x!
}
```

**Sửa:**
```rust
let mut x = 0;
while x < 5 {  // ✅ Điều kiện có thể sai
    println!("{}", x);
    x += 1;  // ✅ Thay đổi biến
}
```

### 2. Điều Kiện Không Bao Giờ Đúng

```rust
// ❌ Không chạy lần nào
let mut x = 10;
while x < 5 {  // Sai ngay từ đầu
    println!("{}", x);
    x -= 1;
}
```

### 3. Thay Đổi Biến Sai Hướng

```rust
// ❌ Lỗi - x tăng mãi, không bao giờ < 5
let mut x = 10;
while x < 5 {
    println!("{}", x);
    x += 1;  // ❌ Càng xa 5!
}

// ✅ Đúng
let mut x = 10;
while x > 5 {  // Đổi điều kiện
    println!("{}", x);
    x -= 1;  // ✅ Giảm về 5
}
```

### 4. Quên Cập Nhật Biến Trong Continue

```rust
// ❌ Lỗi - Infinite loop
let mut i = 0;
while i < 10 {
    if i == 5 {
        continue;  // ❌ i không tăng!
    }
    println!("{}", i);
    i += 1;
}

// ✅ Đúng
let mut i = 0;
while i < 10 {
    i += 1;  // ✅ Tăng trước
    if i == 5 {
        continue;
    }
    println!("{}", i);
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Tính Giai Thừa

Viết chương trình tính giai thừa của 5 (5! = 5 × 4 × 3 × 2 × 1)

```rust
fn main() {
    let n = 5;
    let mut ket_qua = 1;

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let n = 5;
    let mut ket_qua = 1;
    let mut i = 1;

    while i <= n {
        ket_qua *= i;
        i += 1;
    }

    println!("{}! = {}", n, ket_qua);
}
```

**Kết quả:**
```
5! = 120
```

**Giải thích:** 5! = 5 × 4 × 3 × 2 × 1 = 120
</details>

---

### Bài 2: In Bảng Cửu Chương

Viết chương trình in bảng cửu chương của số 7.

```rust
fn main() {
    let so = 7;

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let so = 7;
    let mut i = 1;

    println!("📊 Bảng cửu chương {}", so);

    while i <= 10 {
        println!("{} × {} = {}", so, i, so * i);
        i += 1;
    }
}
```

**Kết quả:**
```
📊 Bảng cửu chương 7
7 × 1 = 7
7 × 2 = 14
7 × 3 = 21
7 × 4 = 28
7 × 5 = 35
7 × 6 = 42
7 × 7 = 49
7 × 8 = 56
7 × 9 = 63
7 × 10 = 70
```
</details>

---

### Bài 3: Đảo Ngược Số

Viết chương trình đảo ngược một số (123 → 321)

```rust
fn main() {
    let mut so = 12345;
    let mut dao_nguoc = 0;

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let mut so = 12345;
    let mut dao_nguoc = 0;

    while so > 0 {
        let chu_so = so % 10;        // Lấy chữ số cuối
        dao_nguoc = dao_nguoc * 10 + chu_so;  // Thêm vào số đảo ngược
        so /= 10;                    // Bỏ chữ số cuối
    }

    println!("Số đảo ngược: {}", dao_nguoc);
}
```

**Kết quả:**
```
Số đảo ngược: 54321
```

**Giải thích:**
- Lần 1: 12345 → chu_so = 5, dao_nguoc = 5, so = 1234
- Lần 2: 1234 → chu_so = 4, dao_nguoc = 54, so = 123
- Lần 3: 123 → chu_so = 3, dao_nguoc = 543, so = 12
- Lần 4: 12 → chu_so = 2, dao_nguoc = 5432, so = 1
- Lần 5: 1 → chu_so = 1, dao_nguoc = 54321, so = 0
</details>

---

## 📝 Tóm Tắt

| Khái Niệm | Cú Pháp | Mục Đích |
|-----------|---------|----------|
| `while` | `while điều_kiện { }` | Lặp khi điều kiện đúng |
| `while true` | `while true { }` | Giống `loop` (vô hạn) |
| `break` | `break;` | Thoát while |
| `continue` | `continue;` | Bỏ qua lần lặp hiện tại |

**Điểm Quan Trọng:**
- ✅ While lặp **khi điều kiện còn đúng**
- ✅ Tự động dừng khi điều kiện **sai**
- ✅ Ngắn gọn hơn `loop + if + break`
- ✅ Cẩn thận với **infinite loops** (điều kiện luôn đúng)

---

## 🎯 Khi Nào Dùng While vs Loop?

### Dùng `while` khi:
- ✅ Có **điều kiện rõ ràng** để lặp
- ✅ Điều kiện đơn giản, dễ kiểm tra
- ✅ Muốn code **ngắn gọn, dễ đọc**

**Ví dụ:**
```rust
while dem < 10 {  // ✅ Điều kiện rõ ràng
    dem += 1;
}
```

### Dùng `loop` khi:
- ✅ Lặp **vô hạn** (chờ sự kiện)
- ✅ Điều kiện **phức tạp**, nhiều chỗ break
- ✅ Cần **trả về giá trị** từ loop

**Ví dụ:**
```rust
loop {  // ✅ Rõ ràng là vô hạn
    let input = read_input();
    if input.is_valid() {
        break input;  // Trả về giá trị
    }
}
```

---

## 🎯 Bước Tiếp Theo

Bạn đã biết `while` rồi! Nhưng nếu muốn **lặp qua một dãy số** hoặc **mảng**, có cách tối ưu hơn.

Bài tiếp theo, chúng ta sẽ học **`for`** - công cụ lặp mạnh mẽ nhất của Rust! 🔥

➡️ **Tiếp theo**: [For: Lặp Qua Dãy Số và Mảng](for-loop)
