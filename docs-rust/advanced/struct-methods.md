---
sidebar_position: 6
title: "Methods: Hàm Bên Trong Struct"
description: "Tìm hiểu cách định nghĩa methods và associated functions cho structs"
---

# 🎯 Methods: Hàm Bên Trong Struct

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được method là gì và khác gì với function
- ✅ Định nghĩa methods với `impl` blocks
- ✅ Sử dụng `&self`, `&mut self`, và `self`
- ✅ Tạo associated functions (như constructors)
- ✅ Sử dụng nhiều impl blocks
- ✅ Áp dụng method chaining

## 🤔 Method Là Gì?

### Ẩn Dụ Cuộc Sống: Điều Khiển Từ Xa

**Method** giống như **các nút trên điều khiển TV**:

📺 **Điều Khiển TV**:
- Mỗi nút là một hành động: Bật/tắt, Tăng âm, Đổi kênh
- Nút gắn liền với TV, không thể dùng cho tủ lạnh
- Các nút "biết" cách điều khiển TV

🎯 **Methods Trong Rust**:
- **Hàm gắn liền với struct**
- Truy cập qua dot notation: `rect.area()`
- Tham số đầu tiên là `self` (instance)

### Method vs Function

**Function**:
```rust
fn calculate_area(rect: &Rectangle) -> u32 {
    rect.width * rect.height
}

// Gọi
let area = calculate_area(&rect);
```

**Method**:
```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

// Gọi
let area = rect.area();
```

**Lợi ích của methods**:
- ✅ Gọn gàng: `rect.area()` thay vì `calculate_area(&rect)`
- ✅ Tổ chức: Tất cả logic của Rectangle ở một chỗ
- ✅ Namespacing: Nhiều structs có thể có method `area()`

## 🛠️ Impl Blocks

### Cú Pháp Cơ Bản

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };

    println!("Diện tích: {}", rect.area());
}
```

**Giải thích**:
- `impl Rectangle` → Implementation block cho Rectangle
- `fn area(&self)` → Method với tham số đầu là `&self`
- `self.width` → Truy cập field của instance

## 🔑 `self`, `&self`, và `&mut self`

### `&self` - Immutable Borrow

```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };

    println!("Area: {}", rect1.area());
    println!("Can hold: {}", rect1.can_hold(&rect2));

    // rect1 vẫn dùng được
    println!("{:?}", rect1);
}
```

**Khi nào dùng `&self`**:
- Chỉ **đọc** dữ liệu
- Không thay đổi instance
- Cho phép gọi nhiều lần

### `&mut self` - Mutable Borrow

```rust
impl Rectangle {
    fn scale(&mut self, factor: u32) {
        self.width *= factor;
        self.height *= factor;
    }

    fn set_width(&mut self, width: u32) {
        self.width = width;
    }
}

fn main() {
    let mut rect = Rectangle { width: 10, height: 20 };

    println!("Trước: {:?}", rect);

    rect.scale(2);
    println!("Sau scale: {:?}", rect);

    rect.set_width(100);
    println!("Sau set_width: {:?}", rect);
}
```

**Khi nào dùng `&mut self`**:
- Cần **sửa đổi** instance
- Instance phải là `mut`

### `self` - Take Ownership

```rust
impl Rectangle {
    fn into_square(self) -> Rectangle {
        let side = self.width.min(self.height);
        Rectangle {
            width: side,
            height: side,
        }
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };

    let square = rect.into_square();

    // ❌ rect không dùng được nữa - đã bị consume
    // println!("{:?}", rect);

    println!("Square: {:?}", square);
}
```

**Khi nào dùng `self`**:
- **Transform** instance thành giá trị khác
- **Consume** instance
- Hiếm khi dùng

## 🏭 Associated Functions

Functions không có `self` parameter:

```rust
impl Rectangle {
    // Associated function (không có self)
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }

    // Constructor
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

fn main() {
    // Gọi với ::
    let sq = Rectangle::square(20);
    let rect = Rectangle::new(10, 30);

    println!("Square: {:?}", sq);
    println!("Rect: {:?}", rect);
}
```

**Khi nào dùng**:
- ✅ Constructors
- ✅ Factory methods
- ✅ Utility functions liên quan đến type

## 🔗 Method Chaining

Methods return `&mut self` để chain:

```rust
impl Rectangle {
    fn set_width(&mut self, width: u32) -> &mut Self {
        self.width = width;
        self
    }

    fn set_height(&mut self, height: u32) -> &mut Self {
        self.height = height;
        self
    }

    fn scale(&mut self, factor: u32) -> &mut Self {
        self.width *= factor;
        self.height *= factor;
        self
    }
}

fn main() {
    let mut rect = Rectangle::new(10, 20);

    // Method chaining
    rect.set_width(30)
        .set_height(40)
        .scale(2);

    println!("{:?}", rect);
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Circle

```rust
#[derive(Debug)]
struct Circle {
    radius: f64,
}

impl Circle {
    fn new(radius: f64) -> Circle {
        Circle { radius }
    }

    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }

    fn circumference(&self) -> f64 {
        2.0 * std::f64::consts::PI * self.radius
    }

    fn scale(&mut self, factor: f64) {
        self.radius *= factor;
    }
}

fn main() {
    let mut circle = Circle::new(5.0);

    println!("Radius: {}", circle.radius);
    println!("Area: {:.2}", circle.area());
    println!("Circumference: {:.2}", circle.circumference());

    circle.scale(2.0);
    println!("After scale: {:?}", circle);
}
```

**Đầu ra**:
```
Radius: 5
Area: 78.54
Circumference: 31.42
After scale: Circle { radius: 10.0 }
```

### Ví Dụ 2: BankAccount

```rust
#[derive(Debug)]
struct BankAccount {
    owner: String,
    balance: f64,
}

impl BankAccount {
    fn new(owner: String) -> BankAccount {
        BankAccount {
            owner,
            balance: 0.0,
        }
    }

    fn deposit(&mut self, amount: f64) {
        if amount > 0.0 {
            self.balance += amount;
            println!("Nạp {} thành công", amount);
        }
    }

    fn withdraw(&mut self, amount: f64) -> bool {
        if amount > 0.0 && self.balance >= amount {
            self.balance -= amount;
            println!("Rút {} thành công", amount);
            true
        } else {
            println!("Rút tiền thất bại!");
            false
        }
    }

    fn get_balance(&self) -> f64 {
        self.balance
    }
}

fn main() {
    let mut account = BankAccount::new(String::from("An"));

    account.deposit(1000.0);
    account.deposit(500.0);

    account.withdraw(300.0);
    account.withdraw(2000.0);  // Thất bại

    println!("Số dư: {}", account.get_balance());
}
```

**Đầu ra**:
```
Nạp 1000 thành công
Nạp 500 thành công
Rút 300 thành công
Rút tiền thất bại!
Số dư: 1200
```

### Ví Dụ 3: Counter

```rust
#[derive(Debug)]
struct Counter {
    count: i32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }

    fn increment(&mut self) -> &mut Self {
        self.count += 1;
        self
    }

    fn decrement(&mut self) -> &mut Self {
        self.count -= 1;
        self
    }

    fn reset(&mut self) -> &mut Self {
        self.count = 0;
        self
    }

    fn get(&self) -> i32 {
        self.count
    }
}

fn main() {
    let mut counter = Counter::new();

    counter
        .increment()
        .increment()
        .increment()
        .decrement()
        .increment();

    println!("Count: {}", counter.get());

    counter.reset();
    println!("After reset: {}", counter.get());
}
```

**Đầu ra**:
```
Count: 3
After reset: 0
```

### Ví Dụ 4: Student

```rust
#[derive(Debug)]
struct Student {
    name: String,
    scores: Vec<f32>,
}

impl Student {
    fn new(name: String) -> Student {
        Student {
            name,
            scores: Vec::new(),
        }
    }

    fn add_score(&mut self, score: f32) {
        self.scores.push(score);
    }

    fn average(&self) -> f32 {
        if self.scores.is_empty() {
            return 0.0;
        }
        let sum: f32 = self.scores.iter().sum();
        sum / self.scores.len() as f32
    }

    fn passed(&self) -> bool {
        self.average() >= 5.0
    }
}

fn main() {
    let mut student = Student::new(String::from("Bình"));

    student.add_score(7.5);
    student.add_score(8.0);
    student.add_score(6.5);

    println!("Student: {}", student.name);
    println!("Scores: {:?}", student.scores);
    println!("Average: {:.2}", student.average());
    println!("Passed: {}", if student.passed() { "Đậu" } else { "Rớt" });
}
```

**Đầu ra**:
```
Student: Bình
Scores: [7.5, 8.0, 6.5]
Average: 7.33
Passed: Đậu
```

### Ví Dụ 5: Todo List

```rust
#[derive(Debug)]
struct Task {
    description: String,
    completed: bool,
}

struct TodoList {
    tasks: Vec<Task>,
}

impl TodoList {
    fn new() -> TodoList {
        TodoList { tasks: Vec::new() }
    }

    fn add(&mut self, description: String) {
        self.tasks.push(Task {
            description,
            completed: false,
        });
    }

    fn complete(&mut self, index: usize) {
        if index < self.tasks.len() {
            self.tasks[index].completed = true;
        }
    }

    fn list(&self) {
        println!("Todo List:");
        for (i, task) in self.tasks.iter().enumerate() {
            let status = if task.completed { "✓" } else { " " };
            println!("  [{}] {}. {}", status, i + 1, task.description);
        }
    }

    fn remaining(&self) -> usize {
        self.tasks.iter().filter(|t| !t.completed).count()
    }
}

fn main() {
    let mut todos = TodoList::new();

    todos.add(String::from("Học Rust"));
    todos.add(String::from("Làm bài tập"));
    todos.add(String::from("Viết project"));

    todos.list();

    todos.complete(0);
    todos.complete(1);

    println!();
    todos.list();

    println!("\nCòn lại: {} việc", todos.remaining());
}
```

**Đầu ra**:
```
Todo List:
  [ ] 1. Học Rust
  [ ] 2. Làm bài tập
  [ ] 3. Viết project

Todo List:
  [✓] 1. Học Rust
  [✓] 2. Làm bài tập
  [ ] 3. Viết project

Còn lại: 1 việc
```

## 🎨 Nhiều Impl Blocks

Có thể có nhiều `impl` blocks:

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

// Block 1: Basic methods
impl Rectangle {
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }

    fn area(&self) -> u32 {
        self.width * self.height
    }
}

// Block 2: Comparison methods
impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    fn is_square(&self) -> bool {
        self.width == self.height
    }
}

fn main() {
    let rect = Rectangle::new(10, 20);

    println!("Area: {}", rect.area());
    println!("Is square: {}", rect.is_square());
}
```

**Lợi ích**:
- Tổ chức code theo chức năng
- Dễ đọc với struct lớn

## 🚫 Lỗi Thường Gặp

### Lỗi 1: Quên `&` Trong `&self`

```rust
impl Rectangle {
    // ❌ Lỗi - thiếu &
    fn area(self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle::new(10, 20);
    let area = rect.area();
    // ❌ rect đã bị consumed!
    // println!("{:?}", rect);
}
```

**Sửa**:
```rust
fn area(&self) -> u32 {
    self.width * self.height
}
```

### Lỗi 2: Gọi Method Trên Immutable Mà Cần Mut

```rust
impl Rectangle {
    fn scale(&mut self, factor: u32) {
        self.width *= factor;
        self.height *= factor;
    }
}

fn main() {
    let rect = Rectangle::new(10, 20);  // Immutable

    // ❌ Lỗi - rect không phải mut
    rect.scale(2);
}
```

**Sửa**:
```rust
let mut rect = Rectangle::new(10, 20);
rect.scale(2);
```

### Lỗi 3: Gọi Associated Function Như Method

```rust
impl Rectangle {
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

fn main() {
    let rect = Rectangle { width: 10, height: 20 };

    // ❌ Lỗi - new là associated function, không phải method
    // rect.new(30, 40);

    // ✅ Đúng
    let rect2 = Rectangle::new(30, 40);
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Temperature

```rust
struct Temperature {
    celsius: f64,
}

impl Temperature {
    fn new(celsius: f64) -> Temperature {
        // TODO
    }

    fn to_fahrenheit(&self) -> f64 {
        // TODO: C * 9/5 + 32
    }

    fn to_kelvin(&self) -> f64 {
        // TODO: C + 273.15
    }
}

fn main() {
    let temp = Temperature::new(25.0);

    println!("{}°C", temp.celsius);
    println!("{}°F", temp.to_fahrenheit());
    println!("{}K", temp.to_kelvin());
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
impl Temperature {
    fn new(celsius: f64) -> Temperature {
        Temperature { celsius }
    }

    fn to_fahrenheit(&self) -> f64 {
        self.celsius * 9.0 / 5.0 + 32.0
    }

    fn to_kelvin(&self) -> f64 {
        self.celsius + 273.15
    }
}
```
</details>

### Bài 2: Vector2D

```rust
#[derive(Debug)]
struct Vector2D {
    x: f64,
    y: f64,
}

impl Vector2D {
    fn new(x: f64, y: f64) -> Vector2D {
        // TODO
    }

    fn magnitude(&self) -> f64 {
        // TODO: sqrt(x² + y²)
    }

    fn add(&self, other: &Vector2D) -> Vector2D {
        // TODO
    }
}

fn main() {
    let v1 = Vector2D::new(3.0, 4.0);
    let v2 = Vector2D::new(1.0, 2.0);

    println!("v1 magnitude: {}", v1.magnitude());

    let v3 = v1.add(&v2);
    println!("v3: {:?}", v3);
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
impl Vector2D {
    fn new(x: f64, y: f64) -> Vector2D {
        Vector2D { x, y }
    }

    fn magnitude(&self) -> f64 {
        (self.x * self.x + self.y * self.y).sqrt()
    }

    fn add(&self, other: &Vector2D) -> Vector2D {
        Vector2D {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}
```
</details>

### Bài 3: String Builder

```rust
struct StringBuilder {
    content: String,
}

impl StringBuilder {
    fn new() -> StringBuilder {
        // TODO
    }

    fn append(&mut self, s: &str) -> &mut Self {
        // TODO
    }

    fn build(&self) -> String {
        // TODO
    }
}

fn main() {
    let mut sb = StringBuilder::new();

    let result = sb.append("Hello")
        .append(" ")
        .append("Rust")
        .build();

    println!("{}", result);
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
impl StringBuilder {
    fn new() -> StringBuilder {
        StringBuilder {
            content: String::new(),
        }
    }

    fn append(&mut self, s: &str) -> &mut Self {
        self.content.push_str(s);
        self
    }

    fn build(&self) -> String {
        self.content.clone()
    }
}
```
</details>

## 🎯 Tóm Tắt

| Khái Niệm | Cú Pháp | Khi Nào Dùng |
|-----------|---------|--------------|
| **`&self`** | `fn method(&self)` | Chỉ đọc |
| **`&mut self`** | `fn method(&mut self)` | Sửa đổi |
| **`self`** | `fn method(self)` | Consume instance |
| **Associated function** | `fn new() -> Self` | Constructor, không cần instance |
| **Method chaining** | `-> &mut Self` | Gọi nhiều methods liên tiếp |
| **Multiple impl** | Nhiều `impl` blocks | Tổ chức code |

**Quy tắc vàng**:
- ✅ Dùng `&self` mặc định (immutable borrow)
- ✅ Dùng `&mut self` khi cần sửa đổi
- ✅ Hiếm khi dùng `self` (ownership transfer)
- ✅ Associated functions dùng `::`, methods dùng `.`
- ✅ Return `&mut Self` để chain methods

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Method Syntax](https://doc.rust-lang.org/book/ch05-03-method-syntax.html)
- [Rust By Example - Methods](https://doc.rust-lang.org/rust-by-example/fn/methods.html)

---

**Bài tiếp theo**: [Enums →](./enums.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **enums** - kiểu dữ liệu cho "một trong nhiều khả năng"!
