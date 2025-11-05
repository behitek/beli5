---
sidebar_position: 12
title: "Làm Việc Với Chuỗi"
description: "Học cách xử lý String trong Rust với các methods hữu ích: len, is_empty, to_uppercase, to_lowercase, trim, split, format! và nhiều hơn nữa!"
keywords: [rust string methods, rust string manipulation, rust string functions, rust trim split, rust string format]
---

# 📝 Làm Việc Với Chuỗi

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Sử dụng các methods cơ bản: len, is_empty, trim
- ✅ Chuyển đổi case: to_uppercase, to_lowercase
- ✅ Tách chuỗi với split
- ✅ Nối chuỗi với +, format!, push_str
:::

---

## 🤔 Tại Sao Cần Xử Lý Chuỗi?

Trong lập trình, chúng ta thường xuyên cần:

- Kiểm tra độ dài text
- Chuyển chữ hoa/thường
- Loại bỏ khoảng trắng
- Tách chuỗi thành từng phần
- Nối nhiều chuỗi lại

**String methods** giúp làm việc này dễ dàng! 🎯

:::info Ẩn Dụ
Hãy tưởng tượng **String methods** như **công cụ sửa chữa biển báo công trình**:

🛠️ **Bộ công cụ:**
- ✂️ **Cắt** (split): Cắt biển thành từng phần
- 📏 **Đo** (len): Đo độ dài chữ
- 🧹 **Lau** (trim): Xóa bụi bẩn hai đầu
- 🔠 **Viết hoa** (uppercase): Làm chữ to hơn
- 🔗 **Hàn** (push_str): Nối thêm text

**Đồ bảo hộ an toàn** (Rust) đảm bảo bạn không phá hỏng biển gốc! 🛡️
:::

---

## 📏 len() - Độ Dài Chuỗi

Trả về **số bytes** trong String:

```rust
fn main() {
    let text = String::from("Hello");
    println!("Độ dài: {}", text.len());
}
```

**Kết quả:**
```
Độ dài: 5
```

### Lưu Ý Với Unicode

```rust
fn main() {
    let english = String::from("Hello");
    let vietnamese = String::from("Xin chào");

    println!("English - Bytes: {}", english.len());
    println!("English - Chars: {}", english.chars().count());

    println!("Vietnamese - Bytes: {}", vietnamese.len());
    println!("Vietnamese - Chars: {}", vietnamese.chars().count());
}
```

**Kết quả:**
```
English - Bytes: 5
English - Chars: 5
Vietnamese - Bytes: 10
Vietnamese - Chars: 8
```

:::caution Chú Ý
`.len()` trả về **số bytes**, không phải số ký tự!

Với tiếng Việt có dấu, mỗi ký tự có thể chiếm **nhiều bytes**:
- 'a' = 1 byte
- 'à' = 2 bytes
- 'ă' = 2 bytes

Dùng `.chars().count()` để đếm **số ký tự**.
:::

---

## ❓ is_empty() - Kiểm Tra Rỗng

Kiểm tra String có rỗng không:

```rust
fn main() {
    let text1 = String::from("Hello");
    let text2 = String::from("");

    println!("text1 rỗng? {}", text1.is_empty());
    println!("text2 rỗng? {}", text2.is_empty());
}
```

**Kết quả:**
```
text1 rỗng? false
text2 rỗng? true
```

### Ví Dụ Thực Tế

```rust
fn main() {
    let mut input = String::new();

    if input.is_empty() {
        println!("⚠️ Vui lòng nhập dữ liệu!");
    } else {
        println!("✅ Đã nhập: {}", input);
    }
}
```

**Kết quả:**
```
⚠️ Vui lòng nhập dữ liệu!
```

---

## 🔠 to_uppercase() / to_lowercase()

Chuyển đổi chữ hoa/thường:

```rust
fn main() {
    let text = String::from("Rust Programming");

    let upper = text.to_uppercase();
    let lower = text.to_lowercase();

    println!("Gốc: {}", text);
    println!("Hoa: {}", upper);
    println!("Thường: {}", lower);
}
```

**Kết quả:**
```
Gốc: Rust Programming
Hoa: RUST PROGRAMMING
Thường: rust programming
```

### Ví Dụ: So Sánh Không Phân Biệt Hoa Thường

```rust
fn main() {
    let input = String::from("RUST");
    let target = "rust";

    if input.to_lowercase() == target {
        println!("✅ Khớp!");
    } else {
        println!("❌ Không khớp!");
    }
}
```

**Kết quả:**
```
✅ Khớp!
```

---

## 🧹 trim() - Loại Bỏ Khoảng Trắng

Xóa khoảng trắng **đầu và cuối** chuỗi:

```rust
fn main() {
    let text = String::from("   Hello World   ");

    println!("Trước: '{}'", text);
    println!("Sau: '{}'", text.trim());
}
```

**Kết quả:**
```
Trước: '   Hello World   '
Sau: 'Hello World'
```

### Các Biến Thể

```rust
fn main() {
    let text = String::from("   Hello   ");

    println!("trim_start: '{}'", text.trim_start());  // Xóa đầu
    println!("trim_end: '{}'", text.trim_end());      // Xóa cuối
    println!("trim: '{}'", text.trim());              // Xóa cả hai
}
```

**Kết quả:**
```
trim_start: 'Hello   '
trim_end: '   Hello'
trim: 'Hello'
```

### Ví Dụ Thực Tế: Xử Lý Input

```rust
use std::io;

fn main() {
    let mut input = String::new();
    println!("Nhập tên:");

    io::stdin().read_line(&mut input).expect("Lỗi đọc input");

    let name = input.trim();  // ✅ Xóa \n và khoảng trắng

    if !name.is_empty() {
        println!("Xin chào, {}!", name);
    } else {
        println!("Bạn chưa nhập tên!");
    }
}
```

---

## ✂️ split() - Tách Chuỗi

Tách chuỗi thành các phần nhỏ:

```rust
fn main() {
    let text = "Táo,Cam,Chuối,Xoài";

    for fruit in text.split(',') {
        println!("🍎 {}", fruit);
    }
}
```

**Kết quả:**
```
🍎 Táo
🍎 Cam
🍎 Chuối
🍎 Xoài
```

### split_whitespace() - Tách Theo Khoảng Trắng

```rust
fn main() {
    let sentence = "Học   Rust   rất   vui";

    let words: Vec<&str> = sentence.split_whitespace().collect();

    println!("Số từ: {}", words.len());
    for (i, word) in words.iter().enumerate() {
        println!("{}. {}", i + 1, word);
    }
}
```

**Kết quả:**
```
Số từ: 4
1. Học
2. Rust
3. rất
4. vui
```

### Ví Dụ: Phân Tích CSV

```rust
fn main() {
    let csv_line = "An,20,8.5";

    let parts: Vec<&str> = csv_line.split(',').collect();

    let ten = parts[0];
    let tuoi = parts[1].parse::<i32>().unwrap();
    let diem = parts[2].parse::<f64>().unwrap();

    println!("📝 Sinh viên: {}", ten);
    println!("🎂 Tuổi: {}", tuoi);
    println!("📊 Điểm: {}", diem);
}
```

**Kết quả:**
```
📝 Sinh viên: An
🎂 Tuổi: 20
📊 Điểm: 8.5
```

---

## 🔗 Nối Chuỗi

### Cách 1: Toán Tử +

```rust
fn main() {
    let s1 = String::from("Hello");
    let s2 = String::from(" World");

    let result = s1 + &s2;  // ✅ s1 bị move, s2 mượn

    // println!("{}", s1);  // ❌ Lỗi - s1 đã move
    println!("{}", result);
    println!("{}", s2);     // ✅ s2 vẫn dùng được
}
```

**Kết quả:**
```
Hello World
 World
```

:::caution Lưu Ý Ownership
Với `+`:
- **String đầu** bị **move** (không dùng được nữa)
- **String sau** được **mượn** (&)

```rust
let s1 = String::from("Hello");
let s2 = String::from(" World");
let result = s1 + &s2;  // s1 move, s2 borrow
```
:::

### Cách 2: format! Macro

**Không** move ownership, tạo String mới:

```rust
fn main() {
    let s1 = String::from("Hello");
    let s2 = String::from("World");

    let result = format!("{} {}", s1, s2);

    println!("{}", result);
    println!("Vẫn dùng: {} và {}", s1, s2);  // ✅ Cả hai OK
}
```

**Kết quả:**
```
Hello World
Vẫn dùng: Hello và World
```

### Cách 3: push_str() - Thêm Vào Cuối

```rust
fn main() {
    let mut text = String::from("Hello");

    text.push_str(" World");
    text.push('!');  // push() cho một ký tự

    println!("{}", text);
}
```

**Kết quả:**
```
Hello World!
```

### So Sánh

```rust
fn main() {
    // 1. + operator
    let s1 = String::from("A");
    let result1 = s1 + " B";  // s1 bị move

    // 2. format! macro
    let s2 = String::from("A");
    let result2 = format!("{} B", s2);  // s2 vẫn dùng được

    // 3. push_str
    let mut s3 = String::from("A");
    s3.push_str(" B");  // Sửa trực tiếp

    println!("{}", result1);
    println!("{}", result2);
    println!("{}", s3);
}
```

**Kết quả:**
```
A B
A B
A B
```

:::tip Nên Dùng Cách Nào?

| Method | Khi Nào Dùng | Ownership |
|--------|--------------|-----------|
| `+` | Nối 2 chuỗi đơn giản | Move s1 |
| `format!` | Nối nhiều, giữ ownership | Không move |
| `push_str` | Thêm vào cuối, in-place | Cần mut |

```rust
// ✅ Nối 2 chuỗi
let result = s1 + &s2;

// ✅ Nối nhiều, giữ ownership
let result = format!("{}-{}-{}", a, b, c);

// ✅ Thêm vào có sẵn
text.push_str(" more");
```
:::

---

## 🔍 contains() - Kiểm Tra Chứa

```rust
fn main() {
    let text = String::from("Học Rust rất thú vị");

    println!("Có 'Rust'? {}", text.contains("Rust"));
    println!("Có 'Python'? {}", text.contains("Python"));
}
```

**Kết quả:**
```
Có 'Rust'? true
Có 'Python'? false
```

---

## 🔄 replace() - Thay Thế

```rust
fn main() {
    let text = String::from("Tôi học Python");

    let new_text = text.replace("Python", "Rust");

    println!("Trước: {}", text);
    println!("Sau: {}", new_text);
}
```

**Kết quả:**
```
Trước: Tôi học Python
Sau: Tôi học Rust
```

### Ví Dụ: Thay Tất Cả

```rust
fn main() {
    let text = String::from("Hello Hello Hello");

    let new_text = text.replace("Hello", "Hi");

    println!("Trước: {}", text);
    println!("Sau: {}", new_text);
}
```

**Kết quả:**
```
Trước: Hello Hello Hello
Sau: Hi Hi Hi
```

---

## 🎮 Ví Dụ Thực Tế: Xử Lý Email

```rust
fn main() {
    let email = String::from("  USER@EXAMPLE.COM  ");

    // Chuẩn hóa email
    let clean = email.trim().to_lowercase();

    println!("Gốc: '{}'", email);
    println!("Chuẩn hóa: '{}'", clean);

    // Kiểm tra hợp lệ
    if clean.contains('@') && clean.contains('.') {
        println!("✅ Email hợp lệ");

        // Tách username và domain
        let parts: Vec<&str> = clean.split('@').collect();
        println!("Username: {}", parts[0]);
        println!("Domain: {}", parts[1]);
    } else {
        println!("❌ Email không hợp lệ");
    }
}
```

**Kết quả:**
```
Gốc: '  USER@EXAMPLE.COM  '
Chuẩn hóa: 'user@example.com'
✅ Email hợp lệ
Username: user
Domain: example.com
```

---

## 📊 Ví Dụ: Phân Tích Văn Bản

```rust
fn main() {
    let text = String::from("Rust là ngôn ngữ lập trình an toàn và nhanh");

    println!("📝 Văn bản: {}", text);
    println!("📏 Độ dài: {} bytes", text.len());
    println!("🔤 Số ký tự: {}", text.chars().count());
    println!("📊 Số từ: {}", text.split_whitespace().count());

    // Đếm từ "an"
    let count = text.matches("an").count();
    println!("🔍 Số lần xuất hiện 'an': {}", count);

    // Chuyển sang chữ hoa
    let upper = text.to_uppercase();
    println!("🔠 Viết hoa: {}", upper);
}
```

**Kết quả:**
```
📝 Văn bản: Rust là ngôn ngữ lập trình an toàn và nhanh
📏 Độ dài: 53 bytes
🔤 Số ký tự: 47
📊 Số từ: 9
🔍 Số lần xuất hiện 'an': 2
🔠 Viết hoa: RUST LÀ NGÔN NGỮ LẬP TRÌNH AN TOÀN VÀ NHANH
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Quên trim() Khi Đọc Input

```rust
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();

    // ❌ Lỗi - input có \n ở cuối
    if input == "yes" {
        println!("Yes!");
    }

    // ✅ Đúng - Dùng trim()
    if input.trim() == "yes" {
        println!("Yes!");
    }
}
```

### 2. Sử Dụng Sau Khi Move (Với +)

```rust
fn main() {
    let s1 = String::from("Hello");
    let s2 = String::from(" World");

    let result = s1 + &s2;

    // ❌ Lỗi - s1 đã move
    // println!("{}", s1);

    // ✅ Dùng format! để giữ ownership
    let s1 = String::from("Hello");
    let result = format!("{}{}", s1, s2);
    println!("{}", s1);  // ✅ OK
}
```

### 3. Nhầm len() Với chars().count()

```rust
fn main() {
    let text = String::from("Xin chào");

    // ❌ Sai - Đếm bytes
    println!("Độ dài: {}", text.len());  // 10

    // ✅ Đúng - Đếm ký tự
    println!("Số ký tự: {}", text.chars().count());  // 8
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Đếm Nguyên Âm

Viết function đếm số nguyên âm trong chuỗi.

```rust
fn dem_nguyen_am(text: &str) -> usize {
    // Viết code của bạn ở đây
}

fn main() {
    let text = "Học Rust rất thú vị";
    println!("Số nguyên âm: {}", dem_nguyen_am(text));
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn dem_nguyen_am(text: &str) -> usize {
    let nguyen_am = "aeiouAEIOU";
    text.chars()
        .filter(|c| nguyen_am.contains(*c))
        .count()
}

fn main() {
    let text = "Học Rust rất thú vị";
    println!("Văn bản: {}", text);
    println!("Số nguyên âm: {}", dem_nguyen_am(text));
}
```

**Kết quả:**
```
Văn bản: Học Rust rất thú vị
Số nguyên âm: 5
```
</details>

---

### Bài 2: Chuẩn Hóa Tên

Viết function chuẩn hóa tên (viết hoa chữ cái đầu mỗi từ).

```rust
fn chuan_hoa_ten(name: &str) -> String {
    // Viết code của bạn ở đây
}

fn main() {
    let name = "  nguyễn  văn   an  ";
    println!("Gốc: '{}'", name);
    println!("Chuẩn hóa: '{}'", chuan_hoa_ten(name));
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn chuan_hoa_ten(name: &str) -> String {
    name.split_whitespace()
        .map(|word| {
            let mut chars = word.chars();
            match chars.next() {
                None => String::new(),
                Some(first) => {
                    first.to_uppercase().collect::<String>()
                        + &chars.as_str().to_lowercase()
                }
            }
        })
        .collect::<Vec<String>>()
        .join(" ")
}

fn main() {
    let name = "  nguyễn  văn   an  ";
    println!("Gốc: '{}'", name);
    println!("Chuẩn hóa: '{}'", chuan_hoa_ten(name));
}
```

**Kết quả:**
```
Gốc: '  nguyễn  văn   an  '
Chuẩn hóa: 'Nguyễn Văn An'
```
</details>

---

### Bài 3: Tìm Từ Dài Nhất

Viết function tìm từ dài nhất trong câu.

```rust
fn tim_tu_dai_nhat(sentence: &str) -> &str {
    // Viết code của bạn ở đây
}

fn main() {
    let text = "Rust là ngôn ngữ lập trình";
    println!("Câu: {}", text);
    println!("Từ dài nhất: {}", tim_tu_dai_nhat(text));
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn tim_tu_dai_nhat(sentence: &str) -> &str {
    sentence
        .split_whitespace()
        .max_by_key(|word| word.len())
        .unwrap_or("")
}

fn main() {
    let text = "Rust là ngôn ngữ lập trình";
    println!("Câu: {}", text);
    println!("Từ dài nhất: {}", tim_tu_dai_nhat(text));
}
```

**Kết quả:**
```
Câu: Rust là ngôn ngữ lập trình
Từ dài nhất: trình
```
</details>

---

## 📝 Tóm Tắt

| Method | Mô Tả | Ví Dụ |
|--------|-------|-------|
| `.len()` | Số bytes | `text.len()` |
| `.is_empty()` | Kiểm tra rỗng | `text.is_empty()` |
| `.to_uppercase()` | Chữ hoa | `text.to_uppercase()` |
| `.to_lowercase()` | Chữ thường | `text.to_lowercase()` |
| `.trim()` | Xóa khoảng trắng | `text.trim()` |
| `.split()` | Tách chuỗi | `text.split(',')` |
| `+` | Nối chuỗi | `s1 + &s2` |
| `format!` | Nối chuỗi | `format!("{} {}", a, b)` |
| `.push_str()` | Thêm vào cuối | `text.push_str(" hi")` |
| `.contains()` | Kiểm tra chứa | `text.contains("Rust")` |
| `.replace()` | Thay thế | `text.replace("old", "new")` |

---

## 🎯 Best Practices

### 1. Dùng &str Thay Vì &String

```rust
// ❌ Không tốt
fn process(s: &String) { }

// ✅ Tốt hơn - Linh hoạt hơn
fn process(s: &str) { }
```

### 2. Dùng format! Khi Nối Nhiều

```rust
// ❌ Khó đọc
let result = s1 + &s2 + &s3 + &s4;

// ✅ Rõ ràng hơn
let result = format!("{}{}{}{}", s1, s2, s3, s4);
```

### 3. Trim Input Từ User

```rust
// ✅ Luôn trim input
let input = get_user_input().trim();
```

---

## 🎯 Bước Tiếp Theo

Bạn đã biết các String methods rồi! Bài tiếp theo, chúng ta sẽ học **String Slicing** - cách cắt và truy cập từng phần của chuỗi! ✂️

➡️ **Tiếp theo**: [Cắt Chuỗi và Indexing](string-slicing)
