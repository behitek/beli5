---
sidebar_position: 9
title: Chuỗi Ký Tự - String vs &str
description: Hiểu sự khác biệt giữa String và &str trong Rust, cách tạo và sử dụng strings
keywords: [rust, string, str, string slice, string literal, ownership, heap, stack, eli5]
---

# 🔤 Chuỗi Ký Tự - String vs &str

## Strings Trong Rust

Rust có **HAI** kiểu string chính:
- `String` - Owned, có thể thay đổi, trên heap
- `&str` - Borrowed, không thay đổi, string slice

**Đây là điểm khó nhất cho người mới!** 😅

:::tip Giải Thích Cho Bạn 5 Tuổi
Tưởng tượng bạn có **cuốn sách**:

📕 **String** = Cuốn sách **BẠN SỞ HỮU**
- Bạn có thể viết thêm
- Bạn có thể xóa trang
- Bạn có thể cho người khác mượn
- Bạn quyết định khi nào vứt đi

📖 **&str** = **MƯỢN** sách để đọc
- Chỉ được đọc, không được viết
- Không thể xé trang
- Phải trả lại chủ
- Không quyết định khi nào vứt

**String = Chủ nhân, &str = Người mượn!** 🎭
:::

## 📕 String Literals (`&str`)

### Khai Báo

```rust
fn main() {
    let s1 = "Hello";  // Type: &str
    let s2: &str = "World";

    println!("{} {}", s1, s2);
}
```

**Đặc điểm:**
- ✅ Lưu trong **binary** (part of program)
- ✅ **Immutable** (không đổi)
- ✅ Nhanh và nhẹ
- ✅ Dùng nhiều nhất cho text cố định

### String Literals Ở Đâu?

```rust
fn main() {
    // Các string literals này lưu trong binary
    let greeting = "Xin chào";
    let farewell = "Tạm biệt";

    // Khi compile, chúng embedded vào executable
}
```

**Memory layout:**
```
┌─────────────────┐
│   Your Program  │
├─────────────────┤
│   Code (.text)  │
├─────────────────┤
│ Data (.rodata)  │ ← String literals ở đây!
│ "Xin chào"      │
│ "Tạm biệt"      │
└─────────────────┘
```

## 📗 String Type

### Tạo String

```rust
fn main() {
    // From string literal
    let s1 = String::from("Hello");

    // Using to_string()
    let s2 = "World".to_string();

    // Empty string
    let s3 = String::new();

    println!("s1: {}", s1);
    println!("s2: {}", s2);
    println!("s3: '{}'", s3);
}
```

**Kết quả:**
```
s1: Hello
s2: World
s3: ''
```

### String Trên Heap

```rust
fn main() {
    let s = String::from("Hello");
    // String data lưu trên heap!
}
```

**Memory layout:**
```
Stack                   Heap
┌──────────┐           ┌─────────────┐
│ ptr      │─────────→ │ H e l l o   │
│ len: 5   │           └─────────────┘
│ capacity │
└──────────┘
```

### Tại Sao Hai Loại?

| Feature | `String` | `&str` |
|---------|----------|--------|
| **Ownership** | Owned | Borrowed |
| **Mutable** | ✅ Có thể | ❌ Không |
| **Memory** | Heap | Stack/Binary |
| **Size** | Có thể thay đổi | Fixed |
| **Cost** | Allocation | Cheap |
| **Khi nào dùng** | Cần modify | Read-only |

## 🔄 Chuyển Đổi Giữa String và &str

### &str → String

```rust
fn main() {
    let s1: &str = "Hello";

    // Cách 1: String::from()
    let s2: String = String::from(s1);

    // Cách 2: .to_string()
    let s3: String = s1.to_string();

    // Cách 3: .to_owned()
    let s4: String = s1.to_owned();

    println!("{}, {}, {}", s2, s3, s4);
}
```

### String → &str

```rust
fn main() {
    let s1: String = String::from("Hello");

    // Cách 1: Borrow với &
    let s2: &str = &s1;

    // Cách 2: .as_str()
    let s3: &str = s1.as_str();

    println!("{}, {}", s2, s3);
}
```

**Ví dụ thực tế:**

```rust
fn main() {
    let owned = String::from("Rust");

    // Pass as &str
    print_str(&owned);  // ✅ OK - &String → &str tự động

    // Keep ownership
    println!("Still have: {}", owned);
}

fn print_str(s: &str) {
    println!("Received: {}", s);
}
```

## ✏️ Thao Tác Với String

### Thêm Text (Mutable)

```rust
fn main() {
    let mut s = String::from("Hello");

    // push_str - Thêm &str
    s.push_str(", world");
    println!("{}", s);  // Hello, world

    // push - Thêm char
    s.push('!');
    println!("{}", s);  // Hello, world!
}
```

### Concatenation (Nối Chuỗi)

```rust
fn main() {
    let s1 = String::from("Hello");
    let s2 = String::from("World");

    // Cách 1: + operator
    let s3 = s1 + " " + &s2;  // s1 bị moved!
    // println!("{}", s1);  // ❌ Error! s1 đã moved

    println!("{}", s3);  // Hello World

    // Cách 2: format! macro (không move)
    let s4 = String::from("Xin");
    let s5 = String::from("chào");
    let s6 = format!("{} {}", s4, s5);

    println!("{}", s6);  // Xin chào
    println!("{}, {}", s4, s5);  // ✅ Still have s4, s5!
}
```

### String Interpolation

```rust
fn main() {
    let name = "An";
    let age = 20;

    let message = format!("Tên: {}, Tuổi: {}", name, age);
    println!("{}", message);
}
```

## 🔍 String Indexing (KHÔNG Được!)

**Rust KHÔNG cho phép index strings!**

```rust
fn main() {
    let s = String::from("Hello");
    // let c = s[0];  // ❌ Error!
}
```

**Tại sao?**
- ❌ UTF-8: Một char có thể nhiều bytes
- ❌ "Hello"[0] = 'H' (1 byte)
- ❌ "Xin chào"[4] = ? (không rõ ràng!)

### Cách Đúng: Iterate

```rust
fn main() {
    let s = String::from("Xin chào 🦀");

    // By chars (characters)
    for c in s.chars() {
        println!("{}", c);
    }

    // By bytes
    for b in s.bytes() {
        println!("{}", b);
    }
}
```

**Kết quả (chars):**
```
X
i
n

c
h
à
o

🦀
```

### Slicing (Cẩn Thận!)

```rust
fn main() {
    let s = String::from("Hello World");

    // Slice - byte range
    let hello = &s[0..5];  // "Hello"
    let world = &s[6..11]; // "World"

    println!("{}", hello);
    println!("{}", world);
}
```

**⚠️ Cảnh báo với Unicode:**

```rust
fn main() {
    let s = String::from("Xin chào");

    // ❌ Có thể panic nếu cắt giữa character!
    // let bad = &s[0..5];  // Panic! 'à' = 2 bytes

    // ✅ An toàn hơn
    let safe = s.chars().take(4).collect::<String>();
    println!("{}", safe);  // "Xin "
}
```

## 📏 String Length

```rust
fn main() {
    let s = String::from("Hello");

    // Length in bytes
    println!("Bytes: {}", s.len());  // 5

    // Length in characters
    println!("Chars: {}", s.chars().count());  // 5

    // UTF-8 example
    let s2 = String::from("Xin chào");
    println!("Bytes: {}", s2.len());  // 9 (not 8!)
    println!("Chars: {}", s2.chars().count());  // 8
}
```

**Giải thích:**
- `len()` = số bytes
- `chars().count()` = số characters
- Với ASCII: giống nhau
- Với Unicode: khác nhau!

## 🎯 Best Practices

### 1. Function Parameters: Dùng &str

```rust
// ✅ TỐT - Flexible
fn print_message(msg: &str) {
    println!("{}", msg);
}

fn main() {
    let s1 = String::from("Hello");
    let s2 = "World";

    print_message(&s1);  // ✅ Works
    print_message(s2);   // ✅ Works
}
```

```rust
// ❌ TỆ - Không flexible
fn print_message(msg: String) {  // Takes ownership!
    println!("{}", msg);
}

fn main() {
    let s = String::from("Hello");
    print_message(s);
    // print_message(s);  // ❌ Error! s đã moved
}
```

### 2. Return String Khi Cần Ownership

```rust
// ✅ TỐT
fn create_greeting(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    let name = "An";
    let greeting = create_greeting(name);
    println!("{}", greeting);
}
```

### 3. Dùng String Literals Khi Có Thể

```rust
fn main() {
    // ✅ TỐT - Không cần String
    let msg = "Hello";  // &str

    // ❌ TỆ - Không cần thiết
    let msg = String::from("Hello");
}
```

### 4. format! Cho Concatenation

```rust
fn main() {
    let first = "Nguyễn";
    let last = "Văn A";

    // ✅ TỐT - Dễ đọc, không move
    let full = format!("{} {}", first, last);

    // ❌ TỆ - Phức tạp, có move
    let full = first.to_string() + " " + last;
}
```

## 🎯 Thực Hành

### Bài Tập 1: Tạo Greeting

Viết function nhận tên và trả về lời chào:

```rust
fn greet(name: &str) -> String {
    // TODO: Return "Xin chào, [name]!"
}

fn main() {
    let greeting = greet("An");
    println!("{}", greeting);
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn greet(name: &str) -> String {
    format!("Xin chào, {}!", name)
}

fn main() {
    let greeting = greet("An");
    println!("{}", greeting);  // Xin chào, An!
}
```

</details>

### Bài Tập 2: String Manipulation

Tạo full name từ first và last name:

```rust
fn main() {
    let first = "Nguyễn";
    let middle = "Văn";
    let last = "A";

    // TODO: Tạo full_name = "Nguyễn Văn A"
    // TODO: In ra
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let first = "Nguyễn";
    let middle = "Văn";
    let last = "A";

    // Cách 1: format!
    let full_name = format!("{} {} {}", first, middle, last);
    println!("{}", full_name);

    // Cách 2: String + push_str
    let mut full_name = String::from(first);
    full_name.push(' ');
    full_name.push_str(middle);
    full_name.push(' ');
    full_name.push_str(last);
    println!("{}", full_name);
}
```

</details>

### Bài Tập 3: Count Words

Đếm số từ trong câu:

```rust
fn count_words(text: &str) -> usize {
    // TODO: Đếm số từ (split by spaces)
}

fn main() {
    let sentence = "Rust is awesome";
    let count = count_words(sentence);
    println!("Số từ: {}", count);
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn count_words(text: &str) -> usize {
    text.split_whitespace().count()
}

fn main() {
    let sentence = "Rust is awesome";
    let count = count_words(sentence);
    println!("Số từ: {}", count);  // Số từ: 3

    let vietnamese = "Rust rất tuyệt vời";
    println!("Số từ: {}", count_words(vietnamese));  // Số từ: 4
}
```

</details>

## 🔍 So Sánh Với Ngôn Ngữ Khác

### Python

```python
# Python - Chỉ có một kiểu string
s = "Hello"  # str
s = s + " World"  # Tạo string mới
```

### JavaScript

```javascript
// JavaScript - Chỉ có một kiểu
let s = "Hello";  // string
s = s + " World"; // Tạo string mới
```

### Rust

```rust
// Rust - Hai kiểu
let s1: &str = "Hello";  // String literal
let s2: String = String::from("World");  // Owned string

// Phải explicit về ownership!
```

## 📚 Tóm Tắt

**Hai kiểu strings:**
- `&str` - String slice, borrowed, immutable
- `String` - Owned, growable, mutable

**Chuyển đổi:**
- `&str → String`: `.to_string()`, `String::from()`
- `String → &str`: `&s`, `.as_str()`

**Best practices:**
- Function parameters: Dùng `&str`
- Return type: Dùng `String` nếu tạo mới
- Concatenation: Dùng `format!()`
- String literals: Dùng `&str`

**Lưu ý:**
- ❌ Không được index strings
- ✅ Dùng `.chars()` hoặc `.bytes()`
- ⚠️ UTF-8: một char có thể nhiều bytes

## 🚀 Bước Tiếp Theo

Bạn đã hiểu về strings! Tiếp theo, học các phép toán số học:

➡️ **Tiếp theo**: [Phép Toán Số Học](arithmetic-operations)

---

:::tip Lời Khuyên Vàng
**"String vs &str" là khó nhất cho người mới học Rust!**

**Quy tắc đơn giản:**
- 📖 **Chỉ đọc?** → Dùng `&str`
- ✏️ **Cần sửa?** → Dùng `String`
- 🎁 **Trả về giá trị mới?** → Dùng `String`
- 📥 **Nhận parameter?** → Dùng `&str`

Ban đầu bối rối là bình thường! Sau 2-3 tuần, bạn sẽ quen! 🦀✨

**Mẹo**: Khi compiler báo lỗi về string, thử thêm `&` hoặc `.to_string()`. Compiler sẽ dạy bạn! 🎓
:::

**Tiếp theo**: [Phép Toán Số Học →](arithmetic-operations)
