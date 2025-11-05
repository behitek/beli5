---
sidebar_position: 2
title: "Match: If-Else Siêu Cấp!"
description: "Khám phá match - công cụ pattern matching mạnh mẽ của Rust. Xử lý nhiều trường hợp dễ dàng và an toàn!"
keywords: [rust match, rust pattern matching, rust switch case, rust match expression, rust exhaustive]
---

# 🎯 Match: If-Else Siêu Cấp!

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Biết cách dùng `match` để xử lý nhiều trường hợp
- ✅ Hiểu **exhaustive checking** (bắt buộc xử lý hết trường hợp)
- ✅ Sử dụng wildcard pattern `_`
- ✅ Viết code rõ ràng hơn if-else dài dòng
:::

---

## 🤔 Vấn Đề Với If-Else Dài

Giả sử bạn cần kiểm tra **nhiều trường hợp**:

```rust
fn main() {
    let diem = 85;

    if diem >= 90 {
        println!("Xuất sắc!");
    } else if diem >= 80 {
        println!("Giỏi!");
    } else if diem >= 70 {
        println!("Khá!");
    } else if diem >= 50 {
        println!("Trung bình!");
    } else {
        println!("Yếu!");
    }
}
```

**Vấn đề:**
- ❌ Dài dòng, khó đọc
- ❌ Dễ quên trường hợp
- ❌ Không rõ ràng có bao nhiêu trường hợp

**Giải pháp:** Dùng `match`! 🎯

---

## 🎨 Match Là Gì?

`match` là công cụ **pattern matching** (so khớp mẫu) của Rust:

- Giống `switch-case` trong C/Java/JavaScript
- **Mạnh hơn nhiều** - bắt buộc xử lý **tất cả trường hợp**
- Rõ ràng, an toàn, dễ đọc

:::info Ẩn Dụ
Hãy tưởng tượng **match** như một **bảng phân loại đồ bảo hộ**:

- Nón bảo hiểm → Bảo vệ đầu
- Găng tay → Bảo vệ tay
- Giày an toàn → Bảo vệ chân
- Các loại khác → Kiểm tra thêm

Rust **bắt buộc** bạn phải phân loại **hết tất cả đồ**, không được bỏ sót! 🛡️
:::

---

## 📝 Cú Pháp Cơ Bản

```rust
match giá_trị {
    mẫu_1 => kết_quả_1,
    mẫu_2 => kết_quả_2,
    mẫu_3 => kết_quả_3,
    _ => kết_quả_mặc_định,  // Wildcard: tất cả trường hợp còn lại
}
```

**Giải thích:**
- `giá_trị` → Giá trị cần kiểm tra
- `mẫu => kết_quả` → Nếu khớp mẫu, trả về kết quả
- `_` → Wildcard (bắt tất cả trường hợp còn lại)

---

## 🔢 Match Với Số

### Ví Dụ: Ngày Trong Tuần

```rust
fn main() {
    let ngay = 3;

    match ngay {
        1 => println!("Thứ Hai"),
        2 => println!("Thứ Ba"),
        3 => println!("Thứ Tư"),
        4 => println!("Thứ Năm"),
        5 => println!("Thứ Sáu"),
        6 => println!("Thứ Bảy"),
        7 => println!("Chủ Nhật"),
        _ => println!("Ngày không hợp lệ!"),
    }
}
```

**Kết quả:**
```
Thứ Tư
```

**Giải thích:**
- `ngay = 3` → Khớp với mẫu `3`
- In "Thứ Tư"
- `_` → Bắt tất cả giá trị không phải 1-7

---

## ✅ Exhaustive Checking: Bắt Buộc Xử Lý Hết!

Điểm **đặc biệt** của Rust: `match` **bắt buộc** xử lý **tất cả trường hợp**!

### Ví Dụ: Quên Trường Hợp

```rust
fn main() {
    let so = 5;

    // ❌ Lỗi biên dịch!
    match so {
        1 => println!("Một"),
        2 => println!("Hai"),
        3 => println!("Ba"),
        // Thiếu trường hợp cho 4, 5, 6, ...
    }
}
```

**Lỗi:**
```
error[E0004]: non-exhaustive patterns: `_` not covered
```

**Giải thích:**
- Rust kiểm tra: "Nếu `so = 4` thì sao?"
- Không có mẫu nào khớp → **Lỗi!**

### Sửa Lỗi: Dùng Wildcard `_`

```rust
fn main() {
    let so = 5;

    match so {
        1 => println!("Một"),
        2 => println!("Hai"),
        3 => println!("Ba"),
        _ => println!("Số khác"),  // ✅ Bắt tất cả trường hợp còn lại
    }
}
```

**Kết quả:**
```
Số khác
```

:::tip Tại Sao Điều Này Tuyệt Vời?
Exhaustive checking giúp bạn **không bao giờ quên xử lý trường hợp**!

Trong C/Java, `switch` không kiểm tra → Dễ có lỗi.
Trong Rust, `match` **bắt buộc xử lý hết** → An toàn hơn! 🛡️
:::

---

## 💡 Match Expressions: Trả Về Giá Trị

Giống `if`, `match` cũng là **expression** - có thể trả về giá trị!

### Ví Dụ: Gán Giá Trị Từ Match

```rust
fn main() {
    let so = 2;

    let ten_so = match so {
        1 => "Một",
        2 => "Hai",
        3 => "Ba",
        _ => "Số khác",
    };

    println!("Số {}: {}", so, ten_so);
}
```

**Kết quả:**
```
Số 2: Hai
```

### Ví Dụ: Tính Giá Vé

```rust
fn main() {
    let loai_ve = "VIP";

    let gia = match loai_ve {
        "Thường" => 100_000,
        "VIP" => 300_000,
        "VVIP" => 500_000,
        _ => 0,
    };

    println!("Giá vé: {}đ", gia);
}
```

**Kết quả:**
```
Giá vé: 300000đ
```

---

## 📦 Match Với Code Block

Nếu cần **nhiều dòng code**, dùng dấu `{}`:

```rust
fn main() {
    let diem = 85;

    match diem {
        90..=100 => {
            println!("🌟 Xuất sắc!");
            println!("Bạn rất giỏi!");
        }
        80..=89 => {
            println!("😊 Giỏi!");
            println!("Tiếp tục cố gắng!");
        }
        70..=79 => {
            println!("🙂 Khá!");
        }
        50..=69 => {
            println!("😐 Trung bình!");
        }
        _ => {
            println!("😢 Yếu!");
        }
    }
}
```

**Kết quả:**
```
😊 Giỏi!
Tiếp tục cố gắng!
```

**Giải thích:**
- `90..=100` → Range từ 90 đến 100 (bao gồm 100)
- Dấu `{}` → Code block có nhiều dòng

---

## 🎯 Match Với Ranges

Rust cho phép match với **khoảng giá trị**:

```rust
fn main() {
    let tuoi = 25;

    match tuoi {
        0..=12 => println!("Trẻ em"),
        13..=17 => println!("Thiếu niên"),
        18..=59 => println!("Người lớn"),
        60..=120 => println!("Người cao tuổi"),
        _ => println!("Tuổi không hợp lệ"),
    }
}
```

**Kết quả:**
```
Người lớn
```

**Giải thích:**
- `0..=12` → Từ 0 đến 12 (bao gồm 12)
- `13..=17` → Từ 13 đến 17
- `_` → Các giá trị ngoài 0-120

---

## 📝 Match Với Chuỗi (String)

```rust
fn main() {
    let ngon_ngu = "rust";

    match ngon_ngu {
        "rust" => println!("🦀 An toàn và nhanh!"),
        "python" => println!("🐍 Dễ học!"),
        "java" => println!("☕ Phổ biến!"),
        "javascript" => println!("🌐 Ngôn ngữ web!"),
        _ => println!("Ngôn ngữ khác"),
    }
}
```

**Kết quả:**
```
🦀 An toàn và nhanh!
```

---

## 🔀 Match Với Nhiều Mẫu

Bạn có thể **gộp nhiều mẫu** bằng dấu `|` (OR):

```rust
fn main() {
    let chu_cai = 'e';

    match chu_cai {
        'a' | 'e' | 'i' | 'o' | 'u' => {
            println!("'{}' là nguyên âm", chu_cai);
        }
        'y' => {
            println!("'y' là bán nguyên âm");
        }
        _ => {
            println!("'{}' là phụ âm", chu_cai);
        }
    }
}
```

**Kết quả:**
```
'e' là nguyên âm
```

**Giải thích:**
- `'a' | 'e' | 'i' | 'o' | 'u'` → Khớp với **bất kỳ** ký tự nào trong số này

---

## 🎮 Ví Dụ Thực Tế: Menu Chọn

```rust
fn main() {
    let lua_chon = 2;

    match lua_chon {
        1 => {
            println!("📝 Tạo tài khoản mới");
            println!("Vui lòng nhập thông tin...");
        }
        2 => {
            println!("🔐 Đăng nhập");
            println!("Nhập username và password...");
        }
        3 => {
            println!("❓ Quên mật khẩu");
            println!("Gửi email khôi phục...");
        }
        4 => {
            println!("👋 Thoát chương trình");
        }
        _ => {
            println!("❌ Lựa chọn không hợp lệ!");
            println!("Vui lòng chọn 1-4");
        }
    }
}
```

**Kết quả:**
```
🔐 Đăng nhập
Nhập username và password...
```

---

## 🆚 So Sánh: Match vs If-Else

### If-Else: Dài Dòng

```rust
fn main() {
    let diem = 'B';

    if diem == 'A' {
        println!("Xuất sắc");
    } else if diem == 'B' {
        println!("Giỏi");
    } else if diem == 'C' {
        println!("Khá");
    } else if diem == 'D' {
        println!("Trung bình");
    } else {
        println!("Yếu");
    }
}
```

### Match: Rõ Ràng, Ngắn Gọn

```rust
fn main() {
    let diem = 'B';

    match diem {
        'A' => println!("Xuất sắc"),
        'B' => println!("Giỏi"),
        'C' => println!("Khá"),
        'D' => println!("Trung bình"),
        _ => println!("Yếu"),
    }
}
```

**Ưu điểm của Match:**
- ✅ Ngắn gọn hơn
- ✅ Rõ ràng hơn (dễ thấy tất cả trường hợp)
- ✅ Compiler kiểm tra hết trường hợp
- ✅ Không thể quên trường hợp nào

---

## ⚠️ Lỗi Thường Gặp

### 1. Quên Wildcard `_`

```rust
fn main() {
    let x = 100;

    // ❌ Lỗi - Không xử lý hết trường hợp
    match x {
        1 => println!("Một"),
        2 => println!("Hai"),
    }
}
```

**Sửa:**
```rust
match x {
    1 => println!("Một"),
    2 => println!("Hai"),
    _ => println!("Số khác"),  // ✅ Thêm wildcard
}
```

### 2. Kiểu Dữ Liệu Không Khớp

```rust
// ❌ Lỗi - Nhánh trả về kiểu khác nhau
let ket_qua = match x {
    1 => "một",      // &str
    2 => 2,          // i32
    _ => "khác",     // &str
};

// ✅ Đúng - Tất cả cùng kiểu
let ket_qua = match x {
    1 => "một",
    2 => "hai",
    _ => "khác",
};
```

### 3. Range Không Bao Gồm Cuối

```rust
// ❌ Sai - 10 không nằm trong range
match x {
    0..10 => println!("0-9"),  // Không bao gồm 10
    10..20 => println!("10-19"),
    _ => println!("Khác"),
}

// ✅ Đúng - Dùng ..= để bao gồm cuối
match x {
    0..=9 => println!("0-9"),
    10..=19 => println!("10-19"),
    _ => println!("Khác"),
}
```

### 4. Arm Không Thể Reach (Unreachable)

```rust
match x {
    1..=100 => println!("1-100"),
    50 => println!("50"),  // ❌ Lỗi - 50 đã bị bắt ở trên!
    _ => println!("Khác"),
}

// ✅ Đúng - Kiểm tra cụ thể trước
match x {
    50 => println!("50"),
    1..=100 => println!("1-100 (không phải 50)"),
    _ => println!("Khác"),
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Đoán Số

Viết chương trình đoán số từ 1-10 và in kết quả:

```rust
fn main() {
    let so_doan = 7;

    // Viết code với match ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let so_doan = 7;
    let so_may_chon = 7;

    match so_doan {
        n if n == so_may_chon => println!("🎉 Chúc mừng! Bạn đoán đúng!"),
        1..=10 => println!("😢 Sai rồi! Số đúng là {}", so_may_chon),
        _ => println!("❌ Số không hợp lệ (phải từ 1-10)"),
    }
}
```

**Hoặc đơn giản hơn:**

```rust
fn main() {
    let so_doan = 7;

    match so_doan {
        7 => println!("🎉 Chúc mừng! Bạn đoán đúng!"),
        1..=10 => println!("😢 Sai rồi! Số đúng là 7"),
        _ => println!("❌ Số không hợp lệ (phải từ 1-10)"),
    }
}
```
</details>

---

### Bài 2: Phân Loại Ký Tự

Viết chương trình phân loại ký tự:
- 'a'-'z' hoặc 'A'-'Z': Chữ cái
- '0'-'9': Số
- Còn lại: Ký tự đặc biệt

```rust
fn main() {
    let ky_tu = '5';

    // Viết code với match ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let ky_tu = '5';

    match ky_tu {
        'a'..='z' | 'A'..='Z' => {
            println!("'{}' là chữ cái", ky_tu);
        }
        '0'..='9' => {
            println!("'{}' là số", ky_tu);
        }
        _ => {
            println!("'{}' là ký tự đặc biệt", ky_tu);
        }
    }
}
```

**Kết quả:**
```
'5' là số
```
</details>

---

### Bài 3: Converter Nhiệt Độ

Viết chương trình chuyển đổi nhiệt độ dựa trên đơn vị:
- 'C': In "Độ C"
- 'F': In "Độ F"
- 'K': In "Độ Kelvin"
- Khác: "Đơn vị không hợp lệ"

```rust
fn main() {
    let don_vi = 'C';

    // Viết code với match ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let don_vi = 'C';
    let nhiet_do = 25.0;

    let ten_don_vi = match don_vi {
        'C' => "Độ C",
        'F' => "Độ F",
        'K' => "Độ Kelvin",
        _ => {
            println!("❌ Đơn vị không hợp lệ!");
            return;
        }
    };

    println!("Nhiệt độ: {}{}", nhiet_do, ten_don_vi);
}
```

**Kết quả:**
```
Nhiệt độ: 25Độ C
```
</details>

---

## 📝 Tóm Tắt

| Khái Niệm | Cú Pháp | Mục Đích |
|-----------|---------|----------|
| `match` | `match giá_trị { mẫu => kết_quả }` | So khớp mẫu |
| Wildcard | `_ => kết_quả` | Bắt tất cả trường hợp còn lại |
| Range | `0..=100 => kết_quả` | Khớp khoảng giá trị |
| Multiple patterns | `'a' \| 'b' => kết_quả` | Khớp nhiều mẫu |
| Code block | `mẫu => { /* nhiều dòng */ }` | Xử lý phức tạp |

**Điểm Quan Trọng:**
- ✅ **Exhaustive checking** - Bắt buộc xử lý hết trường hợp
- ✅ Match là **expression**, có thể trả về giá trị
- ✅ Tất cả nhánh **phải cùng kiểu dữ liệu**
- ✅ Rõ ràng, an toàn, dễ đọc hơn if-else dài

---

## 🎯 Khi Nào Dùng Match vs If-Else?

### Dùng `match` khi:
- ✅ Có **nhiều giá trị cố định** cần kiểm tra (1, 2, 3, ...)
- ✅ Cần **bảo đảm xử lý hết trường hợp**
- ✅ Kiểm tra **ranges** hoặc **patterns**

### Dùng `if-else` khi:
- ✅ Điều kiện **phức tạp** (nhiều `&&`, `||`)
- ✅ So sánh **khoảng không cố định** (`x > y`, `a < b * 2`)
- ✅ Chỉ có **1-2 điều kiện đơn giản**

---

## 🎯 Bước Tiếp Theo

Bạn đã biết `match` rồi! Giờ chúng ta sẽ học cách **lặp lại công việc** với loops. 🔄

➡️ **Tiếp theo**: [Lặp Lại Công Việc: loop](loop-basic)
