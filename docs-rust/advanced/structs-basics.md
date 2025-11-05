---
sidebar_position: 5
title: "Structs: Tạo Kiểu Dữ Liệu Riêng"
description: "Tìm hiểu cách định nghĩa và sử dụng structs để tổ chức dữ liệu"
---

# 🏗️ Structs: Tạo Kiểu Dữ Liệu Riêng

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được struct là gì và khi nào dùng
- ✅ Định nghĩa structs với named fields
- ✅ Tạo instances của structs
- ✅ Truy cập và sửa đổi fields
- ✅ Sử dụng tuple structs và unit-like structs
- ✅ Áp dụng struct update syntax

## 🤔 Struct Là Gì?

### Ẩn Dụ Cuộc Sống: Hồ Sơ Nhân Viên

**Struct** giống như **một mẫu hồ sơ**:

📋 **Hồ Sơ Nhân Viên**:
- Có các mục cố định: Họ tên, Tuổi, Email, Lương
- Mỗi nhân viên có một hồ sơ riêng
- Tất cả hồ sơ cùng định dạng

🏗️ **Struct Trong Rust**:
- **Template** (khuôn mẫu) cho kiểu dữ liệu
- Nhóm nhiều giá trị liên quan
- Mỗi field có tên và kiểu riêng

### Tại Sao Cần Structs?

**Không dùng struct** (khó quản lý):
```rust
fn main() {
    let name = String::from("An");
    let age = 25;
    let email = String::from("an@example.com");
    let salary = 5000;

    // Phải truyền nhiều tham số
    print_info(name, age, email, salary);
}

fn print_info(name: String, age: u32, email: String, salary: u32) {
    println!("{} - {} - {} - {}", name, age, email, salary);
}
```

**Dùng struct** (rõ ràng, dễ quản lý):
```rust
struct Employee {
    name: String,
    age: u32,
    email: String,
    salary: u32,
}

fn main() {
    let employee = Employee {
        name: String::from("An"),
        age: 25,
        email: String::from("an@example.com"),
        salary: 5000,
    };

    print_info(&employee);
}

fn print_info(emp: &Employee) {
    println!("{} - {} - {} - {}", emp.name, emp.age, emp.email, emp.salary);
}
```

**Lợi ích**:
- ✅ Nhóm dữ liệu liên quan
- ✅ Rõ ràng, dễ đọc
- ✅ Dễ mở rộng thêm fields
- ✅ Type safety

## 📦 Định Nghĩa Struct

### Cú Pháp Cơ Bản

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
```

**Giải thích**:
- `struct` → Keyword
- `User` → Tên struct (PascalCase)
- `username: String` → Field name và type
- Mỗi field cách nhau bởi dấu phẩy

### Tạo Instance

```rust
fn main() {
    let user1 = User {
        username: String::from("alice123"),
        email: String::from("alice@example.com"),
        sign_in_count: 1,
        active: true,
    };

    println!("Username: {}", user1.username);
    println!("Email: {}", user1.email);
}
```

**Chú ý**:
- Dùng `{}` để khởi tạo
- Phải cung cấp **tất cả fields**
- Thứ tự fields không quan trọng

### Truy Cập Fields

```rust
fn main() {
    let user = User {
        username: String::from("bob456"),
        email: String::from("bob@example.com"),
        sign_in_count: 5,
        active: true,
    };

    // Dot notation
    println!("Username: {}", user.username);
    println!("Sign-in count: {}", user.sign_in_count);
}
```

### Mutable Structs

```rust
fn main() {
    let mut user = User {
        username: String::from("charlie"),
        email: String::from("charlie@example.com"),
        sign_in_count: 0,
        active: false,
    };

    // Sửa đổi field
    user.email = String::from("charlie_new@example.com");
    user.sign_in_count += 1;
    user.active = true;

    println!("New email: {}", user.email);
    println!("Sign-in count: {}", user.sign_in_count);
}
```

**Chú ý**:
- Toàn bộ instance phải là `mut`
- Rust không cho phép chỉ một số fields là mutable

## 🛠️ Tạo Instances

### Constructor Function

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn build_user(email: String, username: String) -> User {
    User {
        email: email,
        username: username,
        sign_in_count: 1,
        active: true,
    }
}

fn main() {
    let user = build_user(
        String::from("user@example.com"),
        String::from("user123"),
    );

    println!("{}", user.username);
}
```

### Field Init Shorthand

Khi tên biến và tên field **giống nhau**, dùng shorthand:

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email,      // Thay vì email: email
        username,   // Thay vì username: username
        sign_in_count: 1,
        active: true,
    }
}
```

**Lợi ích**:
- Ngắn gọn hơn
- Tránh lặp lại

### Struct Update Syntax

Tạo instance mới từ instance cũ:

```rust
fn main() {
    let user1 = User {
        email: String::from("user1@example.com"),
        username: String::from("user1"),
        sign_in_count: 5,
        active: true,
    };

    // Tạo user2 dựa trên user1
    let user2 = User {
        email: String::from("user2@example.com"),
        ..user1  // Copy các fields còn lại từ user1
    };

    println!("User2 username: {}", user2.username);
    println!("User2 email: {}", user2.email);

    // ❌ user1 không dùng được nữa vì username bị move
    // println!("{}", user1.username);
}
```

**Chú ý**:
- `..user1` phải ở **cuối**
- Fields có `Copy` trait → được copy
- Fields không có `Copy` (như `String`) → bị move

## 🎭 Tuple Structs

Struct không có tên field:

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);

    println!("Black: ({}, {}, {})", black.0, black.1, black.2);
    println!("Origin: ({}, {}, {})", origin.0, origin.1, origin.2);

    // ❌ Lỗi - Color và Point là kiểu khác nhau!
    // let color: Color = origin;
}
```

**Khi nào dùng?**:
- Khi không cần tên field
- Muốn phân biệt các kiểu có cùng dữ liệu

### Destructuring Tuple Struct

```rust
fn main() {
    let color = Color(255, 100, 50);

    // Destructure
    let Color(r, g, b) = color;

    println!("R: {}, G: {}, B: {}", r, g, b);
}
```

## 👻 Unit-Like Structs

Struct không có fields:

```rust
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;

    // Dùng cho traits (sẽ học sau)
}
```

**Khi nào dùng?**:
- Implement traits mà không cần dữ liệu
- Marker types

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Rectangle

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };

    let area = calculate_area(&rect);

    println!("Diện tích: {}", area);
}

fn calculate_area(rect: &Rectangle) -> u32 {
    rect.width * rect.height
}
```

**Đầu ra**:
```
Diện tích: 1500
```

### Ví Dụ 2: Student

```rust
struct Student {
    name: String,
    age: u8,
    grade: f32,
}

fn main() {
    let mut student = Student {
        name: String::from("An"),
        age: 20,
        grade: 8.5,
    };

    println!("Trước: {} - {}", student.name, student.grade);

    // Cộng điểm
    student.grade += 0.5;

    println!("Sau: {} - {}", student.name, student.grade);
}
```

**Đầu ra**:
```
Trước: An - 8.5
Sau: An - 9
```

### Ví Dụ 3: Point 2D

```rust
struct Point {
    x: f64,
    y: f64,
}

fn main() {
    let p1 = Point { x: 0.0, y: 0.0 };
    let p2 = Point { x: 3.0, y: 4.0 };

    let distance = calculate_distance(&p1, &p2);

    println!("Khoảng cách: {:.2}", distance);
}

fn calculate_distance(p1: &Point, p2: &Point) -> f64 {
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    (dx * dx + dy * dy).sqrt()
}
```

**Đầu ra**:
```
Khoảng cách: 5.00
```

### Ví Dụ 4: Book

```rust
struct Book {
    title: String,
    author: String,
    pages: u32,
    available: bool,
}

fn main() {
    let mut book = Book {
        title: String::from("The Rust Programming Language"),
        author: String::from("Steve Klabnik"),
        pages: 552,
        available: true,
    };

    display_book(&book);

    // Mượn sách
    book.available = false;
    println!("\nSau khi mượn:");
    display_book(&book);
}

fn display_book(book: &Book) {
    println!("Tiêu đề: {}", book.title);
    println!("Tác giả: {}", book.author);
    println!("Số trang: {}", book.pages);
    println!("Có sẵn: {}", if book.available { "Có" } else { "Không" });
}
```

**Đầu ra**:
```
Tiêu đề: The Rust Programming Language
Tác giả: Steve Klabnik
Số trang: 552
Có sẵn: Có

Sau khi mượn:
Tiêu đề: The Rust Programming Language
Tác giả: Steve Klabnik
Số trang: 552
Có sẵn: Không
```

### Ví Dụ 5: Nested Structs

```rust
struct Address {
    street: String,
    city: String,
}

struct Person {
    name: String,
    age: u32,
    address: Address,
}

fn main() {
    let person = Person {
        name: String::from("Bình"),
        age: 30,
        address: Address {
            street: String::from("123 Lê Lợi"),
            city: String::from("TP.HCM"),
        },
    };

    println!("Tên: {}", person.name);
    println!("Tuổi: {}", person.age);
    println!("Địa chỉ: {}, {}", person.address.street, person.address.city);
}
```

**Đầu ra**:
```
Tên: Bình
Tuổi: 30
Địa chỉ: 123 Lê Lợi, TP.HCM
```

## 🚫 Lỗi Thường Gặp

### Lỗi 1: Thiếu Field

```rust
struct User {
    username: String,
    email: String,
}

fn main() {
    // ❌ Lỗi - thiếu email
    let user = User {
        username: String::from("alice"),
    };
}
```

**Sửa**:
```rust
let user = User {
    username: String::from("alice"),
    email: String::from("alice@example.com"),
};
```

### Lỗi 2: Sửa Immutable Struct

```rust
fn main() {
    let user = User {
        username: String::from("bob"),
        email: String::from("bob@example.com"),
    };

    // ❌ Lỗi - user không phải mut
    user.email = String::from("new@example.com");
}
```

**Sửa**:
```rust
let mut user = User {
    username: String::from("bob"),
    email: String::from("bob@example.com"),
};

user.email = String::from("new@example.com");
```

### Lỗi 3: Move Trong Update Syntax

```rust
fn main() {
    let user1 = User {
        username: String::from("user1"),
        email: String::from("user1@example.com"),
    };

    let user2 = User {
        email: String::from("user2@example.com"),
        ..user1  // username bị move
    };

    // ❌ Lỗi - username đã move
    println!("{}", user1.username);
}
```

**Sửa**:
```rust
// Clone username
let user2 = User {
    email: String::from("user2@example.com"),
    username: user1.username.clone(),
};

println!("{}", user1.username);
```

### Lỗi 4: Truy Cập Field Không Tồn Tại

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 10, y: 20 };

    // ❌ Lỗi - không có field z
    // println!("{}", p.z);
}
```

## 🎓 Derive Debug Trait

In struct dễ dàng hơn:

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };

    // Debug print
    println!("{:?}", rect);

    // Pretty print
    println!("{:#?}", rect);
}
```

**Đầu ra**:
```
Rectangle { width: 30, height: 50 }
Rectangle {
    width: 30,
    height: 50,
}
```

### Derive Clone và Copy

```rust
#[derive(Debug, Clone, Copy)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p1 = Point { x: 10, y: 20 };

    // Copy tự động (vì có Copy trait)
    let p2 = p1;

    println!("{:?}", p1);  // ✅ OK - p1 vẫn dùng được
    println!("{:?}", p2);
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Car Struct

```rust
struct Car {
    brand: String,
    model: String,
    year: u32,
}

fn main() {
    let car = Car {
        // TODO: Tạo một chiếc xe
    };

    // TODO: In ra thông tin xe
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let car = Car {
        brand: String::from("Toyota"),
        model: String::from("Camry"),
        year: 2023,
    };

    println!("{} {} ({})", car.brand, car.model, car.year);
}
```
</details>

### Bài 2: Temperature Converter

```rust
struct Temperature {
    celsius: f64,
}

fn main() {
    let temp = Temperature { celsius: 25.0 };

    // TODO: Viết hàm chuyển sang Fahrenheit
    let fahrenheit = to_fahrenheit(&temp);

    println!("{}°C = {}°F", temp.celsius, fahrenheit);
}

fn to_fahrenheit(temp: &Temperature) -> f64 {
    // TODO
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn to_fahrenheit(temp: &Temperature) -> f64 {
    temp.celsius * 9.0 / 5.0 + 32.0
}
```
</details>

### Bài 3: Product

```rust
#[derive(Debug)]
struct Product {
    name: String,
    price: f64,
    quantity: u32,
}

fn main() {
    let mut product = Product {
        // TODO: Tạo sản phẩm
    };

    println!("{:#?}", product);

    // TODO: Giảm quantity đi 5
    // TODO: In lại
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let mut product = Product {
        name: String::from("Laptop"),
        price: 1500.0,
        quantity: 10,
    };

    println!("Trước: {:#?}", product);

    product.quantity -= 5;

    println!("Sau: {:#?}", product);
}
```
</details>

### Bài 4: Circle

```rust
struct Circle {
    radius: f64,
}

fn main() {
    let circle = Circle { radius: 5.0 };

    let area = calculate_area(&circle);
    let circumference = calculate_circumference(&circle);

    println!("Bán kính: {}", circle.radius);
    println!("Diện tích: {:.2}", area);
    println!("Chu vi: {:.2}", circumference);
}

fn calculate_area(circle: &Circle) -> f64 {
    // TODO: π * r²
}

fn calculate_circumference(circle: &Circle) -> f64 {
    // TODO: 2 * π * r
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::f64::consts::PI;

fn calculate_area(circle: &Circle) -> f64 {
    PI * circle.radius * circle.radius
}

fn calculate_circumference(circle: &Circle) -> f64 {
    2.0 * PI * circle.radius
}
```
</details>

### Bài 5: User Builder

```rust
struct User {
    username: String,
    email: String,
    active: bool,
}

fn create_user(username: String, email: String) -> User {
    // TODO: Dùng field init shorthand
}

fn main() {
    let user1 = create_user(
        String::from("alice"),
        String::from("alice@example.com"),
    );

    // TODO: Tạo user2 từ user1, chỉ đổi email
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn create_user(username: String, email: String) -> User {
    User {
        username,
        email,
        active: true,
    }
}

fn main() {
    let user1 = create_user(
        String::from("alice"),
        String::from("alice@example.com"),
    );

    let user2 = User {
        email: String::from("bob@example.com"),
        ..user1
    };

    println!("User2: {}", user2.email);
}
```
</details>

## 🎯 Tóm Tắt

| Khái Niệm | Cú Pháp | Ví Dụ |
|-----------|---------|-------|
| **Định nghĩa** | `struct Name { ... }` | `struct User { name: String }` |
| **Tạo instance** | `Name { field: value }` | `User { name: String::from("An") }` |
| **Truy cập field** | `instance.field` | `user.name` |
| **Mutable** | `let mut` | `let mut user = User { ... }` |
| **Field shorthand** | `Name { field }` | `User { email, username }` |
| **Update syntax** | `..instance` | `User { email, ..user1 }` |
| **Tuple struct** | `struct Name(T)` | `struct Point(i32, i32)` |
| **Unit struct** | `struct Name;` | `struct Marker;` |

**Quy tắc vàng**:
- ✅ Dùng PascalCase cho tên struct
- ✅ Dùng snake_case cho tên field
- ✅ Toàn bộ instance phải là mut, không thể chỉ một field
- ✅ Dùng `&` để borrow thay vì transfer ownership
- ✅ Derive Debug để dễ in struct

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Defining and Instantiating Structs](https://doc.rust-lang.org/book/ch05-01-defining-structs.html)
- [Rust By Example - Structs](https://doc.rust-lang.org/rust-by-example/custom_types/structs.html)

---

**Bài tiếp theo**: [Struct Methods →](./struct-methods.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu cách thêm **methods** vào structs để tạo hành vi!
