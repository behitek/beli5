---
sidebar_position: 1
title: 📚 Thuật Ngữ Đặc Trưng Rust
description: Từ điển các thuật ngữ đặc trưng của Rust - ownership, borrowing, lifetime, trait, macro và nhiều hơn nữa
keywords: [rust, glossary, ownership, borrowing, lifetime, trait, macro, crate, cargo, unsafe, FFI, move, copy, clone]
---

# 📚 Thuật Ngữ Đặc Trưng Rust

Đây là từ điển các thuật ngữ đặc biệt của Rust - những khái niệm mà bạn sẽ không tìm thấy ở ngôn ngữ khác!

:::tip Cách Sử Dụng
Các thuật ngữ được sắp xếp theo **thứ tự alphabet** để dễ tra cứu. Mỗi thuật ngữ có:
- 🇻🇳 **Giải thích tiếng Việt** dễ hiểu
- 🎯 **Ví dụ ELI5** (Giải thích cho bé 5 tuổi)
- 💻 **Code mẫu** thực tế
:::

---

## A

### `async` / `await`
**Việt**: Bất đồng bộ / Chờ đợi

**ELI5**: Giống như bạn gọi món ăn online và làm việc khác trong khi chờ shipper mang đến, thay vì ngồi đợi suốt! 🍕

**Giải thích**: Cho phép viết code bất đồng bộ (non-blocking) một cách dễ đọc.

```rust
async fn tai_du_lieu() -> String {
    // Code chạy không chặn thread khác
    "Dữ liệu đã tải!".to_string()
}

async fn main_async() {
    let ket_qua = tai_du_lieu().await; // Chờ kết quả
    println!("{}", ket_qua);
}
```

---

## B

### Borrow / Borrowing
**Việt**: Mượn / Việc mượn

**ELI5**: Bạn cho bạn mượn sách, nhưng sách vẫn là của bạn. Bạn có thể lấy lại khi họ đọc xong! 📚

**Giải thích**: Cho phép code khác "mượn" dữ liệu tạm thời mà không chiếm quyền sở hữu.

```rust
fn main() {
    let sach = String::from("Rust Book");
    doc_sach(&sach);  // Cho mượn (borrow)
    println!("Tôi vẫn có: {}", sach); // ✅ Vẫn dùng được
}

fn doc_sach(ten_sach: &String) {  // &String = mượn
    println!("Đang đọc: {}", ten_sach);
}
```

**Quy tắc**:
- ✅ Nhiều **immutable borrows** (`&T`) cùng lúc
- ✅ Hoặc MỘT **mutable borrow** (`&mut T`)
- ❌ KHÔNG được mix cả hai!

### Borrow Checker
**Việt**: Trình kiểm tra mượn

**ELI5**: Người giám sát trong thư viện, đảm bảo không ai cầm 2 quyển sách cùng tên cùng lúc! 👮

**Giải thích**: Phần của compiler kiểm tra các quy tắc borrowing lúc compile time.

```rust
fn main() {
    let mut x = 5;
    let r1 = &x;     // ✅ Mượn immutable
    let r2 = &x;     // ✅ Nhiều immutable OK
    // let r3 = &mut x; // ❌ Borrow checker chặn!
    println!("{}, {}", r1, r2);
}
```

---

## C

### Cargo
**Việt**: Công cụ quản lý dự án Rust

**ELI5**: Như "trợ lý ảo" giúp bạn build code, download thư viện, chạy test - tất cả chỉ bằng 1 lệnh! 🚀

**Giải thích**: Build tool và package manager chính thức của Rust.

**Lệnh thường dùng**:
```bash
cargo new my_project    # Tạo dự án mới
cargo build            # Build dự án
cargo run              # Build + chạy
cargo test             # Chạy tests
cargo add serde        # Thêm dependency
```

### Clone
**Việt**: Sao chép / Nhân bản

**ELI5**: Photocopy cả quyển sách, bạn có bản gốc và bản copy riêng biệt! 📄📄

**Giải thích**: Tạo bản sao sâu (deep copy) của dữ liệu.

```rust
fn main() {
    let s1 = String::from("Hello");
    let s2 = s1.clone();  // Tạo bản copy hoàn toàn mới

    println!("s1: {}, s2: {}", s1, s2); // ✅ Cả 2 đều dùng được
}
```

### Copy
**Việt**: Sao chép tự động

**ELI5**: Như viết số điện thoại lên giấy - bạn copy mà không mất bản gốc! ✏️

**Giải thích**: Trait cho phép sao chép giá trị tự động (cho kiểu đơn giản lưu trên stack).

```rust
fn main() {
    let x = 5;        // i32 có Copy trait
    let y = x;        // Tự động copy
    println!("x: {}, y: {}", x, y); // ✅ Cả 2 đều OK
}
```

**Các type có Copy**:
- Số: `i32`, `u64`, `f64`...
- Bool: `true`, `false`
- Char: `'a'`, 'ඞ'
- Tuple của các type Copy: `(i32, i32)`

### Crate
**Việt**: Thùng hàng / Gói thư viện

**ELI5**: Như một hộp LEGO với các mảnh ghép sẵn, bạn lấy về và dùng! 🧱

**Giải thích**: Đơn vị code độc lập trong Rust - có thể là library hoặc binary.

```toml
# Cargo.toml
[dependencies]
serde = "1.0"      # External crate
tokio = "1.0"      # Async runtime crate
```

**Loại crates**:
- **Binary crate**: Tạo file thực thi (có `main()`)
- **Library crate**: Tạo thư viện cho người khác dùng

---

## D

### Derive
**Việt**: Tự động sinh code

**ELI5**: Như nhờ máy điền sẵn đơn thay vì phải tự viết tay! 📝✨

**Giải thích**: Macro tự động implement traits phổ biến.

```rust
#[derive(Debug, Clone, PartialEq)]
struct User {
    name: String,
    age: u32,
}

fn main() {
    let user = User {
        name: "Minh".to_string(),
        age: 25,
    };

    println!("{:?}", user);        // Debug trait
    let user2 = user.clone();      // Clone trait
    println!("{}", user == user2); // PartialEq trait
}
```

**Derive thường dùng**:
- `Debug` - In debug
- `Clone` - Sao chép
- `Copy` - Copy tự động
- `PartialEq`, `Eq` - So sánh
- `Default` - Giá trị mặc định

### Deref / Deref Coercion
**Việt**: Tự động chuyển đổi tham chiếu

**ELI5**: Như mở hộp quà để lấy món quà bên trong! 🎁

**Giải thích**: Tự động convert từ `&T` sang `&U` khi cần.

```rust
fn main() {
    let s = String::from("hello");
    // String tự động deref thành &str
    let len = do_dai(&s);  // &String -> &str
    println!("Độ dài: {}", len);
}

fn do_dai(s: &str) -> usize {
    s.len()
}
```

### `dyn`
**Việt**: Dynamic dispatch / Trait object

**ELI5**: Như nói "mang 1 con vật nào đó đến" thay vì "mang con chó" hay "mang con mèo" cụ thể! 🐕🐈

**Giải thích**: Tạo trait object, quyết định method nào gọi lúc runtime.

```rust
trait Animal {
    fn sound(&self) -> &str;
}

struct Dog;
impl Animal for Dog {
    fn sound(&self) -> &str { "Gâu gâu!" }
}

struct Cat;
impl Animal for Cat {
    fn sound(&self) -> &str { "Meo meo!" }
}

fn main() {
    let animals: Vec<Box<dyn Animal>> = vec![
        Box::new(Dog),
        Box::new(Cat),
    ];

    for animal in animals {
        println!("{}", animal.sound());
    }
}
```

---

## F

### FFI (Foreign Function Interface)
**Việt**: Giao diện hàm ngoại lai

**ELI5**: Như dùng phiên dịch viên để nói chuyện với người nước ngoài! 🗣️🌍

**Giải thích**: Cơ chế gọi code C/C++ từ Rust hoặc ngược lại.

```rust
// Gọi hàm C từ Rust
extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Giá trị tuyệt đối của -3: {}", abs(-3));
    }
}
```

---

## I

### `impl`
**Việt**: Triển khai / Implementation

**ELI5**: Như viết cách làm cụ thể cho công thức nấu ăn! 👨‍🍳

**Giải thích**: Từ khóa để implement methods cho struct/enum hoặc implement traits.

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

// Implement methods cho Rectangle
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle { width: 10, height: 5 };
    println!("Diện tích: {}", rect.area());
}
```

---

## L

### Lifetime
**Việt**: Thời gian sống / Vòng đời

**ELI5**: Như ghi ngày hết hạn trên sữa - compiler biết được dữ liệu tồn tại bao lâu! 🥛📅

**Giải thích**: Annotation chỉ ra references tồn tại trong bao lâu.

```rust
// 'a là lifetime parameter
fn longest<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() {
        s1
    } else {
        s2
    }
}

fn main() {
    let str1 = String::from("hello");
    let str2 = String::from("world!");

    let result = longest(&str1, &str2);
    println!("Chuỗi dài hơn: {}", result);
}
```

**Lifetime thường gặp**:
- `'a`, `'b` - Custom lifetimes
- `'static` - Tồn tại suốt chương trình

---

## M

### Macro
**Việt**: Vĩ lệnh / Macro

**ELI5**: Như phím tắt trên máy tính - bấm 1 nút mà làm được 10 việc! ⌨️✨

**Giải thích**: Code sinh code lúc compile time.

**Các loại macro**:

```rust
// Declarative macro
macro_rules! say_hello {
    () => {
        println!("Xin chào!");
    };
    ($name:expr) => {
        println!("Xin chào, {}!", $name);
    };
}

fn main() {
    say_hello!();           // "Xin chào!"
    say_hello!("Minh");     // "Xin chào, Minh!"
}
```

**Built-in macros**:
- `println!()` - In ra console
- `vec![]` - Tạo vector
- `panic!()` - Crash chương trình
- `assert!()` - Kiểm tra điều kiện

### Match Guard
**Việt**: Điều kiện bổ sung trong match

**ELI5**: Như kiểm tra hành lý: không chỉ xem loại vali mà còn cân nặng! 🧳⚖️

**Giải thích**: Thêm điều kiện `if` trong match arm.

```rust
fn main() {
    let num = Some(4);

    match num {
        Some(x) if x < 5 => println!("Nhỏ hơn 5: {}", x),
        Some(x) => println!("Lớn hơn hoặc bằng 5: {}", x),
        None => println!("Không có giá trị"),
    }
}
```

### Move Semantics
**Việt**: Ngữ nghĩa di chuyển

**ELI5**: Như tặng quà - sau khi tặng, món quà không còn là của bạn nữa! 🎁➡️

**Giải thích**: Transfer ownership từ nơi này sang nơi khác.

```rust
fn main() {
    let s1 = String::from("Hello");
    let s2 = s1;  // s1 moved to s2

    // println!("{}", s1); // ❌ Lỗi! s1 không còn valid
    println!("{}", s2);    // ✅ OK
}
```

---

## O

### Ownership
**Việt**: Quyền sở hữu

**ELI5**: Như chìa khóa xe máy - chỉ có 1 người giữ chìa khóa tại 1 thời điểm! 🔑🏍️

**Giải thích**: Hệ thống quản lý bộ nhớ độc đáo của Rust.

**3 Quy tắc vàng**:
1. Mỗi giá trị có **đúng 1 owner**
2. Chỉ có **1 owner tại 1 thời điểm**
3. Khi owner ra khỏi scope, giá trị bị **drop**

```rust
fn main() {
    let s = String::from("hello"); // s owns the string
    take_ownership(s);              // s moved, ownership transferred

    // println!("{}", s); // ❌ Lỗi! s không còn owner
}

fn take_ownership(text: String) {
    println!("{}", text);
} // text dropped here
```

---

## P

### Pattern Matching
**Việt**: Khớp mẫu

**ELI5**: Như phân loại rác - giấy vào thùng xanh, nhựa vào thùng vàng, kim loại vào thùng đỏ! ♻️

**Giải thích**: Kiểm tra cấu trúc của dữ liệu và extract giá trị.

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(String), // Quarter có state
}

fn gia_tri(coin: Coin) -> u32 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("Quarter từ {}!", state);
            25
        }
    }
}
```

---

## S

### `Self` vs `self`
**Việt**: Bản thân type vs bản thân instance

**ELI5**:
- `Self` = "Loài người" (type)
- `self` = "Tôi" (instance cụ thể)

**Giải thích**:
- `Self` - Refers to the type being implemented
- `self` - Refers to the instance

```rust
struct Person {
    name: String,
}

impl Person {
    // Self = Person type
    fn new(name: String) -> Self {
        Self { name }  // Same as Person { name }
    }

    // self = instance cụ thể
    fn greet(&self) {
        println!("Xin chào, tôi là {}", self.name);
    }
}
```

---

## T

### Trait
**Việt**: Đặc điểm / Khả năng

**ELI5**: Như "biết bơi", "biết bay" - các khả năng mà nhiều loài vật khác nhau đều có thể có! 🏊🦅

**Giải thích**: Định nghĩa behavior chung mà nhiều types có thể implement.

```rust
trait CanSpeak {
    fn speak(&self) -> String;
}

struct Dog;
impl CanSpeak for Dog {
    fn speak(&self) -> String {
        "Gâu gâu!".to_string()
    }
}

struct Cat;
impl CanSpeak for Cat {
    fn speak(&self) -> String {
        "Meo meo!".to_string()
    }
}

fn main() {
    let dog = Dog;
    let cat = Cat;
    println!("{}", dog.speak());
    println!("{}", cat.speak());
}
```

**Standard traits quan trọng**:
- `Clone` - Có thể clone
- `Copy` - Có thể copy
- `Debug` - Có thể debug print
- `Display` - Có thể format đẹp
- `Iterator` - Có thể iterate

### Trait Bound
**Việt**: Ràng buộc trait

**ELI5**: Như yêu cầu "ứng viên phải biết tiếng Anh" - chỉ chấp nhận những type có trait cụ thể! 📋✅

**Giải thích**: Giới hạn generic type phải implement trait nào đó.

```rust
// T phải implement Display trait
fn print_it<T: std::fmt::Display>(item: T) {
    println!("{}", item);
}

fn main() {
    print_it(5);           // ✅ i32 có Display
    print_it("Hello");     // ✅ &str có Display
    // print_it(vec![1,2]); // ❌ Vec không có Display
}
```

---

## U

### `unsafe`
**Việt**: Không an toàn / Vùng nguy hiểm

**ELI5**: Như khu vực "tự chịu trách nhiệm" - compiler không bảo vệ bạn nữa! ⚠️

**Giải thích**: Block code mà Rust không thể verify an toàn - programmer chịu trách nhiệm.

```rust
fn main() {
    let mut num = 5;

    // Tạo raw pointer
    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;

    unsafe {
        // Chỉ dereference raw pointer trong unsafe block
        println!("r1: {}", *r1);
        *r2 = 10;
        println!("r2: {}", *r2);
    }
}
```

**Khi nào dùng unsafe**:
- Dereference raw pointers
- Gọi unsafe functions
- Access/modify static mutable variables
- Implement unsafe traits
- Access fields of unions

---

## Z

### Zero-Cost Abstraction
**Việt**: Trừu tượng hóa không tốn chi phí

**ELI5**: Như viết code đẹp, dễ đọc nhưng vẫn chạy nhanh như code xấu, khó đọc! 🚀✨

**Giải thích**: Abstractions trong Rust compile thành code tối ưu như code viết tay.

```rust
// Code dễ đọc
let sum: i32 = (1..=100)
    .filter(|x| x % 2 == 0)
    .sum();

// Compile thành code nhanh như viết vòng for thủ công!
```

---

## 📊 Bảng So Sánh Nhanh

| Thuật ngữ | Khi nào dùng | Ví dụ |
|-----------|--------------|-------|
| `move` | Chuyển ownership | `let s2 = s1;` |
| `copy` | Sao chép tự động | `let y = x;` (x là i32) |
| `clone` | Sao chép thủ công | `let s2 = s1.clone();` |
| `borrow` | Mượn tạm | `&x` hoặc `&mut x` |
| `lifetime` | Chỉ định thời gian sống | `fn foo<'a>(&'a str)` |
| `trait` | Định nghĩa behavior | `impl Display for MyType` |

---

## 🎯 Lời Khuyên

:::tip Học Từ Vựng Rust
1. **Không học vẹt** - Hiểu khái niệm, đừng chỉ nhớ định nghĩa
2. **Code thực tế** - Dùng từng thuật ngữ trong code của bạn
3. **So sánh** - So với ngôn ngữ bạn đã biết
4. **Tra cứu thường xuyên** - Không sao nếu quên, cứ quay lại đọc!
:::

---

**Tiếp theo**: Khám phá [Thuật Ngữ Lập Trình Chung](./programming-terms) 📖
