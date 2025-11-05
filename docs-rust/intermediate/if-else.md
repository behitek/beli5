---
sidebar_position: 1
title: "Câu Lệnh Điều Kiện: if-else"
description: "Học cách ra quyết định trong code Rust với if, else if, và else. Hiểu if expressions trả về giá trị!"
keywords: [rust if else, rust điều kiện, rust control flow, rust if expression, rust conditional]
---

# 🔀 Câu Lệnh Điều Kiện: if-else

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Biết cách sử dụng `if`, `else if`, `else` để ra quyết định
- ✅ Hiểu if expressions (trả về giá trị!)
- ✅ Tránh được lỗi thường gặp với conditions
- ✅ Viết nested conditions rõ ràng và dễ đọc
:::

---

## 🤔 Tại Sao Cần Điều Kiện?

Hãy tưởng tượng bạn đang xây nhà. **Đồ bảo hộ an toàn** (Rust) cần kiểm tra điều kiện:

- **Nếu** trời mưa → Dừng làm việc trên mái nhà
- **Nếu** nhiệt độ quá cao → Nghỉ giữa trưa
- **Nếu không** → Tiếp tục làm việc bình thường

Trong code, chúng ta cũng cần **ra quyết định** dựa trên điều kiện!

---

## 📝 If Cơ Bản

### Cú Pháp

```rust
if điều_kiện {
    // Code chạy nếu điều kiện đúng
}
```

### Ví Dụ Đơn Giản

```rust
fn main() {
    let tuoi = 18;

    if tuoi >= 18 {
        println!("Bạn đủ tuổi thi bằng lái xe!");
    }
}
```

**Giải thích:**
- `if tuoi >= 18` → Kiểm tra điều kiện
- Dấu `{}` → Code block chỉ chạy nếu điều kiện **đúng**
- Nếu `tuoi < 18` → Không in gì cả

:::caution Chú Ý
Điều kiện trong if **phải là boolean** (`true` hoặc `false`). Không như C/Python, Rust **không tự động chuyển đổi** kiểu dữ liệu!

```rust
// ❌ Lỗi - Rust không chấp nhận
if 5 {
    println!("Số 5");
}

// ✅ Đúng - Phải dùng boolean
if 5 > 0 {
    println!("Số 5 lớn hơn 0");
}
```
:::

---

## 🔄 If-Else: Hai Lựa Chọn

### Cú Pháp

```rust
if điều_kiện {
    // Code nếu điều kiện đúng
} else {
    // Code nếu điều kiện sai
}
```

### Ví Dụ Thực Tế

```rust
fn main() {
    let diem = 75;

    if diem >= 50 {
        println!("🎉 Chúc mừng! Bạn đã đậu!");
    } else {
        println!("😢 Tiếc quá! Bạn chưa đậu. Cố gắng lần sau!");
    }
}
```

**Kết quả:**
```
🎉 Chúc mừng! Bạn đã đậu!
```

---

## 🎯 Else If: Nhiều Điều Kiện

Khi có **nhiều khả năng**, dùng `else if`:

### Cú Pháp

```rust
if điều_kiện_1 {
    // Code cho trường hợp 1
} else if điều_kiện_2 {
    // Code cho trường hợp 2
} else if điều_kiện_3 {
    // Code cho trường hợp 3
} else {
    // Code cho các trường hợp còn lại
}
```

### Ví Dụ: Xếp Loại Học Lực

```rust
fn main() {
    let diem = 85;

    if diem >= 90 {
        println!("🌟 Xuất sắc!");
    } else if diem >= 80 {
        println!("😊 Giỏi!");
    } else if diem >= 70 {
        println!("🙂 Khá!");
    } else if diem >= 50 {
        println!("😐 Trung bình!");
    } else {
        println!("😢 Yếu!");
    }
}
```

**Kết quả:**
```
😊 Giỏi!
```

**Giải thích:**
1. Kiểm tra `diem >= 90` → Sai (85 < 90)
2. Kiểm tra `diem >= 80` → **Đúng!** ✅
3. In "Giỏi!" và **dừng lại** (không kiểm tra tiếp)

:::tip Mẹo Hay
Rust kiểm tra điều kiện **từ trên xuống** và **dừng ngay** khi gặp điều kiện đúng đầu tiên!

```rust
let x = 100;

if x > 50 {
    println!("Lớn hơn 50");  // ✅ Chạy cái này
} else if x > 75 {
    println!("Lớn hơn 75");  // ⏭️ Không chạy (đã dừng rồi)
}
```
:::

---

## 💡 If Expressions: Trả Về Giá Trị!

Điểm **siêu đặc biệt** của Rust: `if` là một **expression** (biểu thức), có thể **trả về giá trị**!

### Gán Giá Trị Từ If

```rust
fn main() {
    let tuoi = 20;

    // if trả về giá trị!
    let loai_ve = if tuoi >= 18 {
        "Người lớn"  // ✅ Không cần return
    } else {
        "Trẻ em"
    };

    println!("Vé: {}", loai_ve);
}
```

**Kết quả:**
```
Vé: Người lớn
```

**Giải thích:**
- If-else **trả về chuỗi**
- Gán vào biến `loai_ve`
- Không cần keyword `return`!

### Ví Dụ Với Số

```rust
fn main() {
    let diem = 75;

    let ket_qua = if diem >= 50 {
        1  // ✅ Đậu
    } else {
        0  // ❌ Trượt
    };

    println!("Kết quả: {}", ket_qua);
}
```

**Kết quả:**
```
Kết quả: 1
```

:::caution Lưu Ý Quan Trọng
Tất cả các nhánh if-else **phải trả về cùng kiểu dữ liệu**!

```rust
// ❌ Lỗi - Kiểu không khớp
let ket_qua = if diem >= 50 {
    1       // i32
} else {
    "Fail"  // &str
};

// ✅ Đúng - Cùng kiểu &str
let ket_qua = if diem >= 50 {
    "Pass"
} else {
    "Fail"
};
```
:::

---

## 🔗 Nested Conditions (Điều Kiện Lồng Nhau)

Bạn có thể đặt `if` bên trong `if` khác:

### Ví Dụ: Kiểm Tra Vé Xem Phim

```rust
fn main() {
    let tuoi = 16;
    let co_nguoi_lon_di_cung = true;

    if tuoi >= 18 {
        println!("✅ Được xem phim 18+");
    } else {
        if co_nguoi_lon_di_cung {
            println!("✅ Được xem phim 18+ (có người lớn đi cùng)");
        } else {
            println!("❌ Không được xem phim 18+");
        }
    }
}
```

**Kết quả:**
```
✅ Được xem phim 18+ (có người lớn đi cùng)
```

### Cách Viết Rõ Ràng Hơn: Dùng &&

```rust
fn main() {
    let tuoi = 16;
    let co_nguoi_lon_di_cung = true;

    if tuoi >= 18 {
        println!("✅ Được xem phim 18+");
    } else if tuoi < 18 && co_nguoi_lon_di_cung {
        println!("✅ Được xem phim 18+ (có người lớn đi cùng)");
    } else {
        println!("❌ Không được xem phim 18+");
    }
}
```

:::tip Mẹo Hay
Nếu có thể, **tránh lồng quá nhiều `if`**. Dùng `&&`, `||` để code dễ đọc hơn!

```rust
// ❌ Khó đọc
if x > 0 {
    if x < 100 {
        println!("x nằm trong khoảng 0-100");
    }
}

// ✅ Dễ đọc hơn
if x > 0 && x < 100 {
    println!("x nằm trong khoảng 0-100");
}
```
:::

---

## 🎮 Ví Dụ Thực Tế: Kiểm Tra Đăng Nhập

```rust
fn main() {
    let username = "admin";
    let password = "123456";
    let is_verified = true;

    if username == "admin" && password == "123456" {
        if is_verified {
            println!("🎉 Đăng nhập thành công!");
        } else {
            println!("⚠️ Vui lòng xác thực email!");
        }
    } else {
        println!("❌ Sai tên đăng nhập hoặc mật khẩu!");
    }
}
```

**Kết quả:**
```
🎉 Đăng nhập thành công!
```

---

## 🧮 Ví Dụ: Máy Tính BMI

```rust
fn main() {
    let chieu_cao_m = 1.75;
    let can_nang_kg = 70.0;

    let bmi = can_nang_kg / (chieu_cao_m * chieu_cao_m);

    println!("BMI của bạn: {:.1}", bmi);

    if bmi < 18.5 {
        println!("📊 Thiếu cân");
    } else if bmi < 25.0 {
        println!("📊 Bình thường");
    } else if bmi < 30.0 {
        println!("📊 Thừa cân");
    } else {
        println!("📊 Béo phì");
    }
}
```

**Kết quả:**
```
BMI của bạn: 22.9
📊 Bình thường
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Quên Dấu Ngoặc Nhọn

```rust
// ❌ Lỗi - Thiếu {}
if x > 5
    println!("Lớn hơn 5");

// ✅ Đúng
if x > 5 {
    println!("Lớn hơn 5");
}
```

### 2. Dùng = Thay Vì ==

```rust
let x = 5;

// ❌ Lỗi - = là gán, không phải so sánh
if x = 5 {
    println!("x bằng 5");
}

// ✅ Đúng - Dùng ==
if x == 5 {
    println!("x bằng 5");
}
```

### 3. Kiểu Dữ Liệu Không Khớp

```rust
// ❌ Lỗi - if và else trả về kiểu khác nhau
let ket_qua = if true {
    5       // i32
} else {
    "sai"   // &str
};

// ✅ Đúng - Cùng kiểu
let ket_qua = if true {
    5
} else {
    0
};
```

### 4. Điều Kiện Không Phải Boolean

```rust
let x = 10;

// ❌ Lỗi - x không phải boolean
if x {
    println!("x tồn tại");
}

// ✅ Đúng - So sánh trả về boolean
if x > 0 {
    println!("x lớn hơn 0");
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Kiểm Tra Số Chẵn Lẻ

Viết chương trình nhận một số và in ra số đó là chẵn hay lẻ.

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

    if so % 2 == 0 {
        println!("{} là số chẵn", so);
    } else {
        println!("{} là số lẻ", so);
    }
}
```

**Kết quả:**
```
7 là số lẻ
```
</details>

---

### Bài 2: Tính Giá Vé

Viết chương trình tính giá vé dựa trên tuổi:
- Dưới 6 tuổi: Miễn phí
- 6-17 tuổi: 50,000đ
- 18-59 tuổi: 100,000đ
- 60+ tuổi: 70,000đ

```rust
fn main() {
    let tuoi = 25;

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let tuoi = 25;

    let gia_ve = if tuoi < 6 {
        0
    } else if tuoi < 18 {
        50_000
    } else if tuoi < 60 {
        100_000
    } else {
        70_000
    };

    if gia_ve == 0 {
        println!("Miễn phí!");
    } else {
        println!("Giá vé: {}đ", gia_ve);
    }
}
```

**Kết quả:**
```
Giá vé: 100000đ
```
</details>

---

### Bài 3: Kiểm Tra Năm Nhuận

Viết chương trình kiểm tra một năm có phải năm nhuận không:
- Chia hết cho 4 VÀ (không chia hết cho 100 HOẶC chia hết cho 400)

```rust
fn main() {
    let nam = 2024;

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let nam = 2024;

    let la_nam_nhuan = if nam % 4 == 0 {
        if nam % 100 == 0 {
            nam % 400 == 0
        } else {
            true
        }
    } else {
        false
    };

    if la_nam_nhuan {
        println!("{} là năm nhuận! 🗓️", nam);
    } else {
        println!("{} không là năm nhuận", nam);
    }
}
```

**Hoặc viết gọn hơn:**

```rust
fn main() {
    let nam = 2024;

    if (nam % 4 == 0 && nam % 100 != 0) || (nam % 400 == 0) {
        println!("{} là năm nhuận! 🗓️", nam);
    } else {
        println!("{} không là năm nhuận", nam);
    }
}
```

**Kết quả:**
```
2024 là năm nhuận! 🗓️
```
</details>

---

## 📝 Tóm Tắt

| Khái Niệm | Cú Pháp | Mục Đích |
|-----------|---------|----------|
| `if` | `if điều_kiện { }` | Chạy code nếu điều kiện đúng |
| `else` | `if { } else { }` | Chạy code nếu điều kiện sai |
| `else if` | `if { } else if { } else { }` | Kiểm tra nhiều điều kiện |
| If expression | `let x = if cond { a } else { b };` | If trả về giá trị |

**Điểm Quan Trọng:**
- ✅ Điều kiện **phải là boolean**
- ✅ If là **expression**, có thể trả về giá trị
- ✅ Tất cả nhánh **phải cùng kiểu dữ liệu**
- ✅ Rust kiểm tra từ trên xuống, dừng khi gặp điều kiện đúng

---

## 🎯 Bước Tiếp Theo

Bạn đã biết `if-else` rồi! Nhưng nếu có **nhiều trường hợp cần kiểm tra**, `if-else` sẽ dài dòng.

Bài tiếp theo, chúng ta sẽ học **`match`** - công cụ siêu mạnh để xử lý nhiều trường hợp một cách rõ ràng và an toàn! 🚀

➡️ **Tiếp theo**: [Match: If-Else Siêu Cấp!](match)
