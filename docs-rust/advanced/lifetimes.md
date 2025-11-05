---
sidebar_position: 4
title: "Lifetimes: Dữ Liệu Sống Bao Lâu?"
description: "Tìm hiểu về lifetime annotations và cách Rust đảm bảo references luôn valid"
---

# ⏰ Lifetimes: Dữ Liệu Sống Bao Lâu?

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được lifetime là gì và tại sao cần lifetimes
- ✅ Đọc và hiểu lifetime annotations (`'a`, `'b`)
- ✅ Sử dụng lifetimes trong functions
- ✅ Sử dụng lifetimes trong structs
- ✅ Nắm vững lifetime elision rules
- ✅ Xử lý được lỗi borrow checker liên quan đến lifetimes

## 🤔 Lifetime Là Gì?

### Ẩn Dụ Cuộc Sống: Thẻ Vào Cửa Hạn Ngày

**Lifetime** giống như **thẻ vào cửa công ty có hạn sử dụng**:

🎫 **Thẻ Vào Cửa**:
- Có ngày bắt đầu và ngày hết hạn
- Chỉ valid trong khoảng thời gian đó
- Không được dùng sau khi hết hạn

📦 **Reference Trong Rust**:
- Có "thời gian sống" (lifetime)
- Chỉ valid khi dữ liệu gốc còn tồn tại
- Không thể outlive (sống lâu hơn) dữ liệu gốc

### Tại Sao Cần Lifetimes?

Rust cần biết references sẽ sống bao lâu để đảm bảo:
- ✅ Không có dangling references (trỏ đến dữ liệu đã bị drop)
- ✅ Mọi reference đều valid khi sử dụng
- ✅ An toàn bộ nhớ mà không cần garbage collector

```rust
fn main() {
    let r;

    {
        let x = 5;
        r = &x;  // ❌ Lỗi! x sẽ bị drop, r sẽ dangling
    }

    println!("{}", r);
}
```

**Lỗi**:
```
error[E0597]: `x` does not live long enough
```

**Giải thích**:
- `x` chỉ sống trong inner scope
- `r` cố gắng sống lâu hơn
- Rust ngăn chặn vì sẽ unsafe!

## 🏷️ Lifetime Annotations

### Cú Pháp Cơ Bản

Lifetime annotations bắt đầu với dấu `'` (apostrophe):

```rust
&i32        // reference
&'a i32     // reference với lifetime 'a
&'a mut i32 // mutable reference với lifetime 'a
```

**Quy ước**:
- `'a`, `'b`, `'c` → Tên lifetime ngắn gọn
- `'static` → Lifetime đặc biệt (sống suốt chương trình)

### Lifetime Không Thay Đổi Thời Gian Sống

**Quan trọng**: Lifetime annotations **không thay đổi** thời gian sống thực tế!

Chúng chỉ:
- 📝 **Mô tả** mối quan hệ giữa lifetimes
- ✅ **Giúp compiler kiểm tra** tính hợp lệ
- 🚫 **Không kéo dài** hoặc rút ngắn lifetime

Giống như **ghi ngày hết hạn lên thẻ** → Không làm thẻ sống lâu hơn, chỉ ghi nhận thực tế!

## 🔧 Lifetimes Trong Functions

### Ví Dụ Cần Lifetime

```rust
// ❌ Lỗi - thiếu lifetime annotation
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

**Lỗi**:
```
error[E0106]: missing lifetime specifier
```

**Tại sao lỗi?**:
- Compiler không biết return `x` hay `y`
- Không biết return value sẽ sống bao lâu
- Cần explicit lifetime annotation

### Thêm Lifetime Annotation

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("hello");
    let string2 = String::from("world");

    let result = longest(&string1, &string2);

    println!("Dài nhất: {}", result);
}
```

**Giải thích**:
- `<'a>` → Khai báo lifetime parameter
- `x: &'a str` → `x` có lifetime `'a`
- `y: &'a str` → `y` có lifetime `'a`
- `-> &'a str` → Return value cũng có lifetime `'a`

**Ý nghĩa**:
- Return value sẽ sống **ít nhất bằng** lifetime ngắn nhất trong `x` và `y`
- Nếu `x` sống 5s, `y` sống 10s → return sẽ sống 5s

### Lifetime Scope Example

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("long string");

    {
        let string2 = String::from("short");
        let result = longest(&string1, &string2);
        println!("{}", result); // ✅ OK - result dùng trong scope
    }

    // println!("{}", result); // ❌ Lỗi - result đã hết scope
}
```

### Lỗi Lifetime Mismatch

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let string1 = String::from("long string");
    let result;

    {
        let string2 = String::from("xyz");
        result = longest(&string1, &string2);
    } // string2 drop ở đây

    println!("{}", result); // ❌ Lỗi!
}
```

**Lỗi**:
```
error[E0597]: `string2` does not live long enough
```

**Giải thích**:
- `result` cố gắng sống lâu hơn `string2`
- Nhưng `result` có thể trỏ đến `string2`
- Rust ngăn chặn!

## 🏗️ Lifetimes Trong Structs

### Struct Chứa References

```rust
struct Excerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");

    let first_sentence = novel.split('.').next().unwrap();

    let excerpt = Excerpt {
        part: first_sentence,
    };

    println!("Trích dẫn: {}", excerpt.part);
}
```

**Giải thích**:
- `Excerpt<'a>` → Struct có lifetime parameter
- `part: &'a str` → Field là reference với lifetime `'a`
- Instance của `Excerpt` không thể outlive `novel`

### Lỗi Struct Lifetime

```rust
struct Excerpt<'a> {
    part: &'a str,
}

fn main() {
    let excerpt;

    {
        let novel = String::from("Some text");
        excerpt = Excerpt { part: &novel };
    } // novel drop ở đây

    // println!("{}", excerpt.part); // ❌ Lỗi!
}
```

### Methods Với Lifetimes

```rust
struct Excerpt<'a> {
    part: &'a str,
}

impl<'a> Excerpt<'a> {
    fn level(&self) -> i32 {
        3
    }

    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Chú ý! {}", announcement);
        self.part
    }
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first = novel.split('.').next().unwrap();

    let excerpt = Excerpt { part: first };

    println!("Level: {}", excerpt.level());
    println!("Part: {}", excerpt.announce_and_return_part("Bắt đầu!"));
}
```

**Chú ý**:
- `impl<'a> Excerpt<'a>` → Impl block cũng cần lifetime
- Method có thể có lifetime riêng hoặc dùng lifetime của struct

## 🎓 Lifetime Elision Rules

### Quy Tắc Tự Động

Trong nhiều trường hợp, Rust **tự suy luận** lifetimes mà không cần explicit annotations.

**Ba quy tắc elision**:

1️⃣ **Mỗi parameter có lifetime riêng**:
```rust
fn foo(x: &str) -> &str
// Rust hiểu thành:
fn foo<'a>(x: &'a str) -> &str
```

2️⃣ **Nếu có đúng 1 input lifetime → output dùng lifetime đó**:
```rust
fn first_word(s: &str) -> &str
// Rust hiểu thành:
fn first_word<'a>(s: &'a str) -> &'a str
```

3️⃣ **Nếu có `&self` hoặc `&mut self` → output dùng lifetime của self**:
```rust
impl Excerpt {
    fn part(&self) -> &str
    // Rust hiểu thành:
    fn part<'a>(&'a self) -> &'a str
}
```

### Ví Dụ Không Cần Annotation

```rust
// ✅ Không cần lifetime - Rule 2
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }
    &s[..]
}

// ✅ Không cần lifetime - Rule 3
impl<'a> Excerpt<'a> {
    fn get_part(&self) -> &str {
        self.part
    }
}
```

### Khi Nào Cần Explicit Lifetimes?

```rust
// ❌ Cần explicit - nhiều inputs, không rõ output liên quan với input nào
fn longest(x: &str, y: &str) -> &str {
    // ...
}

// ✅ Thêm lifetime
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

## 🌟 The Static Lifetime

### `'static` - Lifetime Đặc Biệt

```rust
fn main() {
    // String literal có lifetime 'static
    let s: &'static str = "Hello, world!";

    println!("{}", s);
}
```

**Đặc điểm `'static`**:
- Sống **suốt chương trình**
- Lưu trong binary
- Luôn valid, không bao giờ bị drop

### Khi Nào Dùng `'static`?

```rust
// ✅ String literals
let s: &'static str = "I'm static!";

// ✅ Constants
const MAX: i32 = 100;
static NAME: &str = "Rust";

// ❌ Không nên dùng 'static để "fix" lỗi!
// Thường có cách tốt hơn
```

**Cảnh báo**: Đừng dùng `'static` chỉ để compiler im lặng! Thường có vấn đề design.

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: So Sánh Strings

```rust
fn compare<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let s1 = String::from("Rust");
    let s2 = "Programming";

    let longer = compare(&s1, s2);
    println!("Dài hơn: {}", longer);
}
```

### Ví Dụ 2: Parser

```rust
struct Parser<'a> {
    text: &'a str,
    position: usize,
}

impl<'a> Parser<'a> {
    fn new(text: &'a str) -> Self {
        Parser { text, position: 0 }
    }

    fn next_word(&mut self) -> Option<&'a str> {
        let start = self.position;

        while self.position < self.text.len() {
            if self.text.as_bytes()[self.position] == b' ' {
                let word = &self.text[start..self.position];
                self.position += 1;
                return Some(word);
            }
            self.position += 1;
        }

        if start < self.text.len() {
            Some(&self.text[start..])
        } else {
            None
        }
    }
}

fn main() {
    let text = String::from("hello rust programming");
    let mut parser = Parser::new(&text);

    while let Some(word) = parser.next_word() {
        println!("Từ: {}", word);
    }
}
```

**Đầu ra**:
```
Từ: hello
Từ: rust
Từ: programming
```

### Ví Dụ 3: Config Holder

```rust
struct Config<'a> {
    name: &'a str,
    version: &'a str,
}

impl<'a> Config<'a> {
    fn new(name: &'a str, version: &'a str) -> Self {
        Config { name, version }
    }

    fn display(&self) {
        println!("{} v{}", self.name, self.version);
    }
}

fn main() {
    let app_name = String::from("MyApp");
    let app_version = "1.0.0";

    let config = Config::new(&app_name, app_version);
    config.display();
}
```

**Đầu ra**:
```
MyApp v1.0.0
```

### Ví Dụ 4: Multiple Lifetimes

```rust
fn mix<'a, 'b>(x: &'a str, y: &'b str, use_first: bool) -> &'a str {
    if use_first {
        x
    } else {
        x  // Phải return 'a, không thể return 'b
    }
}

fn main() {
    let s1 = String::from("first");
    let s2 = String::from("second");

    let result = mix(&s1, &s2, true);
    println!("{}", result);
}
```

**Giải thích**:
- `'a` và `'b` là hai lifetimes độc lập
- Return type là `&'a` → chỉ có thể return `x`
- Nếu muốn return `x` hoặc `y`, cần cùng lifetime

## 🚫 Lỗi Thường Gặp

### Lỗi 1: Missing Lifetime Specifier

```rust
// ❌ Lỗi
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() { x } else { y }
}
```

**Sửa**:
```rust
// ✅ Thêm lifetime
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

### Lỗi 2: Returning Reference To Local

```rust
// ❌ Lỗi - return reference đến local variable
fn dangle<'a>() -> &'a str {
    let s = String::from("hello");
    &s  // Lỗi! s sẽ bị drop
}
```

**Sửa**:
```rust
// ✅ Return ownership
fn no_dangle() -> String {
    String::from("hello")
}
```

### Lỗi 3: Struct Outlives Referenced Data

```rust
struct Holder<'a> {
    data: &'a str,
}

// ❌ Lỗi
fn create_holder() -> Holder {
    let text = String::from("data");
    Holder { data: &text }  // Lỗi! text sẽ bị drop
}
```

**Sửa**:
```rust
// ✅ Truyền reference từ bên ngoài
fn create_holder<'a>(text: &'a str) -> Holder<'a> {
    Holder { data: text }
}
```

### Lỗi 4: Multiple Lifetime Mismatch

```rust
// ❌ Lỗi - return type không match
fn choose<'a, 'b>(x: &'a str, y: &'b str, first: bool) -> &'a str {
    if first {
        x
    } else {
        y  // Lỗi! 'b không thể coerce thành 'a
    }
}
```

**Sửa**:
```rust
// ✅ Dùng cùng lifetime
fn choose<'a>(x: &'a str, y: &'a str, first: bool) -> &'a str {
    if first { x } else { y }
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: First Word

Viết hàm tìm từ đầu tiên trong chuỗi:

```rust
fn main() {
    let sentence = String::from("Hello Rust world");

    let word = first_word(&sentence);

    println!("Từ đầu: {}", word);
}

fn first_word(s: &str) -> &str {
    // TODO
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn first_word(s: &str) -> &str {
    for (i, &byte) in s.as_bytes().iter().enumerate() {
        if byte == b' ' {
            return &s[..i];
        }
    }
    &s[..]
}
```
</details>

### Bài 2: Struct With Reference

```rust
struct Book<'a> {
    title: &'a str,
    author: &'a str,
}

impl<'a> Book<'a> {
    fn new(title: &'a str, author: &'a str) -> Self {
        // TODO
    }

    fn display(&self) {
        // TODO: In ra "title by author"
    }
}

fn main() {
    let title = String::from("The Rust Book");
    let author = "Steve Klabnik";

    let book = Book::new(&title, author);
    book.display();
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
impl<'a> Book<'a> {
    fn new(title: &'a str, author: &'a str) -> Self {
        Book { title, author }
    }

    fn display(&self) {
        println!("{} by {}", self.title, self.author);
    }
}
```
</details>

### Bài 3: Shortest String

Viết hàm tìm chuỗi ngắn nhất:

```rust
fn main() {
    let s1 = "hello";
    let s2 = "hi";

    let short = shortest(s1, s2);
    println!("Ngắn nhất: {}", short);
}

fn shortest<'a>(x: &'a str, y: &'a str) -> &'a str {
    // TODO
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn shortest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() < y.len() { x } else { y }
}
```
</details>

### Bài 4: Contains Substring

```rust
struct TextAnalyzer<'a> {
    text: &'a str,
}

impl<'a> TextAnalyzer<'a> {
    fn new(text: &'a str) -> Self {
        // TODO
    }

    fn contains(&self, pattern: &str) -> bool {
        // TODO
    }

    fn word_count(&self) -> usize {
        // TODO
    }
}

fn main() {
    let content = String::from("Rust is awesome");
    let analyzer = TextAnalyzer::new(&content);

    println!("Contains 'Rust': {}", analyzer.contains("Rust"));
    println!("Word count: {}", analyzer.word_count());
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
impl<'a> TextAnalyzer<'a> {
    fn new(text: &'a str) -> Self {
        TextAnalyzer { text }
    }

    fn contains(&self, pattern: &str) -> bool {
        self.text.contains(pattern)
    }

    fn word_count(&self) -> usize {
        self.text.split_whitespace().count()
    }
}
```
</details>

### Bài 5: Multiple References

```rust
struct MultiRef<'a, 'b> {
    first: &'a str,
    second: &'b str,
}

impl<'a, 'b> MultiRef<'a, 'b> {
    fn new(first: &'a str, second: &'b str) -> Self {
        // TODO
    }

    fn get_longer(&self) -> String {
        // TODO: Return the longer one as owned String
    }
}

fn main() {
    let s1 = String::from("short");
    let s2 = String::from("longer text");

    let refs = MultiRef::new(&s1, &s2);
    println!("Longer: {}", refs.get_longer());
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
impl<'a, 'b> MultiRef<'a, 'b> {
    fn new(first: &'a str, second: &'b str) -> Self {
        MultiRef { first, second }
    }

    fn get_longer(&self) -> String {
        if self.first.len() > self.second.len() {
            self.first.to_string()
        } else {
            self.second.to_string()
        }
    }
}
```
</details>

## 🎯 Tóm Tắt

| Khái Niệm | Cú Pháp | Ý Nghĩa |
|-----------|---------|---------|
| **Lifetime Parameter** | `<'a>` | Khai báo lifetime generic |
| **Reference với Lifetime** | `&'a T` | Reference có lifetime `'a` |
| **Static Lifetime** | `'static` | Sống suốt chương trình |
| **Multiple Lifetimes** | `<'a, 'b>` | Nhiều lifetimes độc lập |
| **Struct Lifetime** | `struct Foo<'a>` | Struct chứa references |
| **Impl Lifetime** | `impl<'a> Foo<'a>` | Methods với lifetime |

**Quy tắc vàng**:
- ✅ Lifetime annotations **mô tả** mối quan hệ, không thay đổi thời gian sống
- ✅ Compiler thường tự suy luận (elision rules)
- ✅ Chỉ cần explicit khi có nhiều inputs/outputs
- ✅ `'static` là lifetime đặc biệt - dùng cẩn thận
- ✅ References không thể outlive dữ liệu gốc

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Validating References with Lifetimes](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html)
- [Rust By Example - Lifetimes](https://doc.rust-lang.org/rust-by-example/scope/lifetime.html)

---

**Bài tiếp theo**: [Structs →](./structs-basics.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu cách tạo **structs** - kiểu dữ liệu tùy chỉnh của riêng bạn!
