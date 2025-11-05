---
sidebar_position: 13
title: "Cắt Chuỗi và Indexing"
description: "Học cách slicing strings trong Rust - truy cập từng phần chuỗi an toàn. Hiểu về UTF-8, chars(), bytes() và tránh panic với indexing!"
keywords: [rust string slicing, rust string index, rust utf8, rust chars bytes, rust string slice]
---

# ✂️ Cắt Chuỗi và Indexing

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Hiểu tại sao không thể index String với `s[0]`
- ✅ Sử dụng string slices với `&s[start..end]`
- ✅ Làm việc với chars() và bytes()
- ✅ Truy cập chuỗi an toàn, tránh panic
:::

---

## 🤔 Vấn Đề: Không Thể Index Trực Tiếp

Trong nhiều ngôn ngữ, bạn có thể làm:

```python
# Python
s = "Hello"
print(s[0])  # 'H'
```

Nhưng trong Rust:

```rust
fn main() {
    let s = String::from("Hello");
    // ❌ Lỗi compile!
    // let c = s[0];
}
```

**Tại sao?** Vì Rust lưu String dưới dạng **UTF-8**!

:::info Ẩn Dụ
Hãy tưởng tượng **String** như **một cuộn băng ghi âm**:

📼 **Băng ghi âm UTF-8:**
- Mỗi **bài hát** (ký tự) có **độ dài khác nhau**
- Bài 1: 3 phút (3 bytes)
- Bài 2: 2 phút (2 bytes)
- Bài 3: 5 phút (5 bytes)

❌ **Không thể** nói "Phút thứ 5" để chỉ bài hát cụ thể!
✅ **Phải biết** từng bài chiếm bao nhiêu phút

**Đồ bảo hộ an toàn** (Rust) không cho phép truy cập sai vị trí! 🛡️
:::

---

## 📝 UTF-8 Là Gì?

**UTF-8** là cách mã hóa Unicode:

- **Mỗi ký tự** chiếm **1-4 bytes**
- Chữ cái tiếng Anh: 1 byte
- Chữ có dấu (à, é, ô): 2-3 bytes
- Emoji: 4 bytes

```rust
fn main() {
    let english = "Hello";
    let vietnamese = "Xin chào";
    let emoji = "👋";

    println!("English - Bytes: {}", english.len());
    println!("Vietnamese - Bytes: {}", vietnamese.len());
    println!("Emoji - Bytes: {}", emoji.len());
}
```

**Kết quả:**
```
English - Bytes: 5
Vietnamese - Bytes: 10
Emoji - Bytes: 4
```

**Giải thích:**
- "Hello" = 5 bytes (5 ký tự × 1 byte)
- "Xin chào" = 10 bytes (8 ký tự, nhưng 'à' và 'o' có dấu chiếm nhiều hơn)
- "👋" = 4 bytes (1 emoji)

---

## 🔪 String Slicing

Dùng `&s[start..end]` để lấy **slice** (lát cắt) của String:

### Với Chuỗi ASCII

```rust
fn main() {
    let s = String::from("Hello World");

    let hello = &s[0..5];   // "Hello"
    let world = &s[6..11];  // "World"

    println!("Part 1: {}", hello);
    println!("Part 2: {}", world);
}
```

**Kết quả:**
```
Part 1: Hello
Part 2: World
```

### Cú Pháp Ngắn Gọn

```rust
fn main() {
    let s = String::from("Hello");

    println!("{}", &s[0..5]);   // Từ 0 đến 4
    println!("{}", &s[..5]);    // Từ đầu đến 4
    println!("{}", &s[1..]);    // Từ 1 đến cuối
    println!("{}", &s[..]);     // Toàn bộ
}
```

**Kết quả:**
```
Hello
Hello
ello
Hello
```

---

## ⚠️ Nguy Hiểm Với UTF-8

**Cảnh báo:** Slicing có thể **panic** nếu cắt giữa ký tự UTF-8!

```rust
fn main() {
    let s = String::from("Xin chào");

    // ✅ OK - Cắt đúng boundary
    println!("{}", &s[0..3]);  // "Xin"

    // ❌ PANIC! - Cắt giữa ký tự 'à'
    // println!("{}", &s[0..5]);
}
```

**Lỗi runtime:**
```
thread 'main' panicked at 'byte index 5 is not a char boundary'
```

:::caution Quy Tắc Vàng
**KHÔNG** slice bừa bãi với chuỗi UTF-8!

```rust
// ❌ Nguy hiểm - Có thể panic
let slice = &s[0..5];

// ✅ An toàn - Dùng chars()
let chars: Vec<char> = s.chars().collect();
let slice = &chars[0..5];
```
:::

---

## 🔤 chars() - Lặp Qua Ký Tự

Cách **an toàn** để truy cập từng ký tự:

```rust
fn main() {
    let s = String::from("Xin chào");

    for (i, c) in s.chars().enumerate() {
        println!("Ký tự {}: {}", i, c);
    }
}
```

**Kết quả:**
```
Ký tự 0: X
Ký tự 1: i
Ký tự 2: n
Ký tự 3:
Ký tự 4: c
Ký tự 5: h
Ký tự 6: à
Ký tự 7: o
```

### Lấy Ký Tự Tại Vị Trí

```rust
fn main() {
    let s = String::from("Xin chào");

    if let Some(c) = s.chars().nth(6) {
        println!("Ký tự thứ 6: {}", c);
    }
}
```

**Kết quả:**
```
Ký tự thứ 6: à
```

---

## 🔢 bytes() - Lặp Qua Bytes

Truy cập từng **byte** (không phải ký tự):

```rust
fn main() {
    let s = String::from("Hi");

    for (i, b) in s.bytes().enumerate() {
        println!("Byte {}: {}", i, b);
    }
}
```

**Kết quả:**
```
Byte 0: 72
Byte 1: 105
```

**Giải thích:**
- 'H' = 72 (ASCII)
- 'i' = 105 (ASCII)

### Với Tiếng Việt

```rust
fn main() {
    let s = String::from("à");

    println!("Số bytes: {}", s.len());
    println!("Số ký tự: {}", s.chars().count());

    print!("Bytes: ");
    for b in s.bytes() {
        print!("{} ", b);
    }
    println!();
}
```

**Kết quả:**
```
Số bytes: 2
Số ký tự: 1
Bytes: 195 160
```

**Giải thích:**
- 'à' chiếm **2 bytes** trong UTF-8
- Byte 1: 195
- Byte 2: 160

---

## 🎯 Ví Dụ: Lấy N Ký Tự Đầu

```rust
fn lay_n_ky_tu_dau(s: &str, n: usize) -> String {
    s.chars().take(n).collect()
}

fn main() {
    let text = "Xin chào, tôi học Rust";

    println!("5 ký tự đầu: {}", lay_n_ky_tu_dau(&text, 5));
    println!("10 ký tự đầu: {}", lay_n_ky_tu_dau(&text, 10));
}
```

**Kết quả:**
```
5 ký tự đầu: Xin c
10 ký tự đầu: Xin chào,
```

---

## 🔍 Ví Dụ: Tìm Vị Trí Ký Tự

```rust
fn tim_vi_tri(s: &str, target: char) -> Option<usize> {
    s.chars().position(|c| c == target)
}

fn main() {
    let text = "Học Rust rất vui";

    match tim_vi_tri(&text, 'R') {
        Some(pos) => println!("Tìm thấy 'R' tại vị trí {}", pos),
        None => println!("Không tìm thấy"),
    }

    match tim_vi_tri(&text, 'Z') {
        Some(pos) => println!("Tìm thấy 'Z' tại vị trí {}", pos),
        None => println!("Không tìm thấy 'Z'"),
    }
}
```

**Kết quả:**
```
Tìm thấy 'R' tại vị trí 4
Không tìm thấy 'Z'
```

---

## 🎮 Ví Dụ Thực Tế: Kiểm Tra Palindrome

```rust
fn la_palindrome(s: &str) -> bool {
    let clean: String = s.chars()
        .filter(|c| c.is_alphanumeric())
        .map(|c| c.to_lowercase().next().unwrap())
        .collect();

    let reversed: String = clean.chars().rev().collect();

    clean == reversed
}

fn main() {
    let tests = vec![
        "radar",
        "hello",
        "A man a plan a canal Panama",
        "race car",
    ];

    for test in tests {
        let result = if la_palindrome(test) {
            "✅ Palindrome"
        } else {
            "❌ Không phải"
        };
        println!("{:30} -> {}", test, result);
    }
}
```

**Kết quả:**
```
radar                          -> ✅ Palindrome
hello                          -> ❌ Không phải
A man a plan a canal Panama    -> ✅ Palindrome
race car                       -> ✅ Palindrome
```

---

## 🔄 Đảo Ngược Chuỗi An Toàn

```rust
fn dao_nguoc(s: &str) -> String {
    s.chars().rev().collect()
}

fn main() {
    let text = "Xin chào";

    println!("Gốc: {}", text);
    println!("Đảo: {}", dao_nguoc(text));
}
```

**Kết quả:**
```
Gốc: Xin chào
Đảo: oàhc niX
```

**Giải thích:**
- `.chars()` → Iterator qua các ký tự
- `.rev()` → Đảo ngược iterator
- `.collect()` → Thu thập thành String

---

## 📊 So Sánh: Array vs String Indexing

| Đặc Điểm | Array `[i32]` | String |
|----------|---------------|--------|
| Index trực tiếp | ✅ `arr[0]` | ❌ Không có |
| Lý do | Phần tử cố định | UTF-8 biến đổi |
| Cách an toàn | `arr[i]` hoặc `.get(i)` | `.chars().nth(i)` |
| Slicing | `&arr[0..3]` | `&s[0..3]` (cẩn thận!) |

```rust
fn main() {
    // ✅ Array - OK
    let arr = [1, 2, 3, 4, 5];
    println!("{}", arr[2]);  // 3

    // ❌ String - Lỗi
    let s = String::from("Hello");
    // println!("{}", s[2]);  // ❌ Không compile

    // ✅ String - Dùng chars()
    if let Some(c) = s.chars().nth(2) {
        println!("{}", c);  // 'l'
    }
}
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Slice Giữa Ký Tự UTF-8

```rust
fn main() {
    let s = String::from("Xin chào");

    // ❌ PANIC! - 8 không phải char boundary
    // println!("{}", &s[0..8]);

    // ✅ An toàn - Dùng chars()
    let first_7: String = s.chars().take(7).collect();
    println!("{}", first_7);
}
```

### 2. Nghĩ len() Là Số Ký Tự

```rust
fn main() {
    let s = String::from("Xin chào");

    // ❌ Sai - len() trả về bytes
    println!("Độ dài: {}", s.len());  // 10

    // ✅ Đúng - Đếm ký tự
    println!("Số ký tự: {}", s.chars().count());  // 8
}
```

### 3. Dùng [] Thay Vì chars().nth()

```rust
fn main() {
    let s = String::from("Hello");

    // ❌ Lỗi compile
    // let c = s[0];

    // ✅ Đúng
    if let Some(c) = s.chars().nth(0) {
        println!("{}", c);
    }
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Lấy N Ký Tự Cuối

Viết function lấy n ký tự cuối chuỗi.

```rust
fn lay_n_ky_tu_cuoi(s: &str, n: usize) -> String {
    // Viết code của bạn ở đây
}

fn main() {
    let text = "Học Rust vui lắm";
    println!("3 ký tự cuối: {}", lay_n_ky_tu_cuoi(&text, 3));
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn lay_n_ky_tu_cuoi(s: &str, n: usize) -> String {
    let total = s.chars().count();
    if n >= total {
        s.to_string()
    } else {
        s.chars().skip(total - n).collect()
    }
}

fn main() {
    let text = "Học Rust vui lắm";
    println!("Gốc: {}", text);
    println!("3 ký tự cuối: {}", lay_n_ky_tu_cuoi(&text, 3));
    println!("5 ký tự cuối: {}", lay_n_ky_tu_cuoi(&text, 5));
}
```

**Kết quả:**
```
Gốc: Học Rust vui lắm
3 ký tự cuối: lắm
5 ký tự cuối: i lắm
```
</details>

---

### Bài 2: Đếm Nguyên Âm

Viết function đếm số nguyên âm sử dụng chars().

```rust
fn dem_nguyen_am(s: &str) -> usize {
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
fn dem_nguyen_am(s: &str) -> usize {
    let nguyen_am = "aeiouAEIOU";
    s.chars()
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

### Bài 3: Cắt Chuỗi An Toàn

Viết function cắt chuỗi n ký tự đầu, an toàn với UTF-8.

```rust
fn cat_chuoi_an_toan(s: &str, n: usize) -> String {
    // Viết code của bạn ở đây
}

fn main() {
    let text = "Xin chào, tôi học Rust";
    println!("5 ký tự: {}", cat_chuoi_an_toan(&text, 5));
    println!("10 ký tự: {}", cat_chuoi_an_toan(&text, 10));
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn cat_chuoi_an_toan(s: &str, n: usize) -> String {
    s.chars().take(n).collect()
}

fn main() {
    let text = "Xin chào, tôi học Rust";
    println!("Gốc: {}", text);
    println!("5 ký tự: {}", cat_chuoi_an_toan(&text, 5));
    println!("10 ký tự: {}", cat_chuoi_an_toan(&text, 10));
}
```

**Kết quả:**
```
Gốc: Xin chào, tôi học Rust
5 ký tự: Xin c
10 ký tự: Xin chào,
```
</details>

---

## 📝 Tóm Tắt

| Khái Niệm | Cú Pháp | An Toàn? |
|-----------|---------|----------|
| Direct index | `s[0]` | ❌ Không có |
| Slice | `&s[0..5]` | ⚠️ Cẩn thận UTF-8 |
| chars() | `.chars().nth(i)` | ✅ An toàn |
| bytes() | `.bytes()` | ✅ An toàn |
| Take n chars | `.chars().take(n)` | ✅ An toàn |

**Quy Tắc Vàng:**
- ❌ **KHÔNG** dùng `s[i]` với String
- ⚠️ **Cẩn thận** khi slice `&s[start..end]` với UTF-8
- ✅ **Dùng** `.chars()` để an toàn
- ✅ **Dùng** `.bytes()` nếu cần bytes

---

## 🎯 Best Practices

### 1. Ưu Tiên chars() Thay Vì Slicing

```rust
// ❌ Nguy hiểm
let first_5 = &s[0..5];

// ✅ An toàn
let first_5: String = s.chars().take(5).collect();
```

### 2. Kiểm Tra Boundary Trước Khi Slice

```rust
// ✅ Kiểm tra trước
if s.is_char_boundary(5) {
    println!("{}", &s[0..5]);
} else {
    println!("Không thể slice tại vị trí 5");
}
```

### 3. Dùng Iterators Cho UTF-8

```rust
// ✅ An toàn với mọi encoding
for (i, c) in s.chars().enumerate() {
    println!("Ký tự {}: {}", i, c);
}
```

---

## 🎯 Kết Luận Intermediate Section

🎉 **Chúc mừng!** Bạn đã hoàn thành **13 bài Intermediate**:

✅ Control Flow (if-else, match)
✅ Loops (loop, while, for)
✅ Collections (arrays, vectors, tuples)
✅ Functions (basics, parameters, closures)
✅ Strings (methods, slicing)

**Bạn giờ đã:**
- Viết được control flow và loops
- Xử lý collections linh hoạt
- Tạo functions và closures
- Làm việc với strings an toàn

---

## 🎯 Bước Tiếp Theo

Bạn đã vững **Intermediate level** rồi! 🎊

Tiếp theo là **Advanced topics** - chúng ta sẽ học về **Ownership** sâu hơn, **Structs & Enums**, **Error Handling**, và nhiều khái niệm mạnh mẽ khác! 🚀

➡️ **Tiếp theo**: Advanced Section - Ownership Basics

:::tip Nghỉ Ngơi!
Đây là lúc tốt để:
- 🔄 Ôn lại các bài intermediate
- 💪 Làm thêm bài tập
- 🎮 Thử viết project nhỏ
- ☕ Uống cà phê và tự hào về tiến bộ của bạn!
:::
