---
sidebar_position: 13
title: "Traits: Hành Vi Chung"
description: "Tìm hiểu cách định nghĩa và implement traits cho nhiều kiểu dữ liệu"
---

# 🎭 Traits: Hành Vi Chung

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được trait là gì và khi nào dùng
- ✅ Định nghĩa traits
- ✅ Implement traits cho structs
- ✅ Sử dụng trait bounds
- ✅ Default implementations
- ✅ Common traits trong Rust

## 🤔 Trait Là Gì?

### Ẩn Dụ Cuộc Sống: Giấy Phép Lái Xe

**Trait** giống như **giấy phép/chứng chỉ**:

🚗 **Giấy Phép Lái Xe**:
- Chứng nhận bạn **có khả năng** lái xe
- Không quan tâm bạn lái xe gì (ô tô, xe máy, xe tải)
- Đảm bảo bạn **biết cách** lái

🎭 **Trait Trong Rust**:
- Định nghĩa **hành vi chung**
- Nhiều kiểu khác nhau có thể implement
- Đảm bảo kiểu đó **có các methods**

### Ví Dụ Đơn Giản

```rust
// Định nghĩa trait
trait Speak {
    fn speak(&self);
}

// Implement cho Dog
struct Dog;

impl Speak for Dog {
    fn speak(&self) {
        println!("Gâu gâu!");
    }
}

// Implement cho Cat
struct Cat;

impl Speak for Cat {
    fn speak(&self) {
        println!("Meo meo!");
    }
}

fn main() {
    let dog = Dog;
    let cat = Cat;

    dog.speak();
    cat.speak();
}
```

**Đầu ra**:
```
Gâu gâu!
Meo meo!
```

## 📝 Định Nghĩa Traits

### Cú Pháp Cơ Bản

```rust
trait Summary {
    fn summarize(&self) -> String;
}

struct Article {
    title: String,
    content: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}: {}", self.title, self.content)
    }
}

fn main() {
    let article = Article {
        title: String::from("Rust"),
        content: String::from("Amazing language"),
    };

    println!("{}", article.summarize());
}
```

### Multiple Methods

```rust
trait Shape {
    fn area(&self) -> f64;
    fn perimeter(&self) -> f64;
}

struct Rectangle {
    width: f64,
    height: f64,
}

impl Shape for Rectangle {
    fn area(&self) -> f64 {
        self.width * self.height
    }

    fn perimeter(&self) -> f64 {
        2.0 * (self.width + self.height)
    }
}

struct Circle {
    radius: f64,
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }

    fn perimeter(&self) -> f64 {
        2.0 * std::f64::consts::PI * self.radius
    }
}

fn main() {
    let rect = Rectangle {
        width: 10.0,
        height: 5.0,
    };
    println!("Rectangle area: {}", rect.area());

    let circle = Circle { radius: 3.0 };
    println!("Circle perimeter: {:.2}", circle.perimeter());
}
```

## 🎨 Default Implementations

```rust
trait Greet {
    fn greet(&self) -> String {
        String::from("Hello!")  // Default
    }

    fn greet_loudly(&self) -> String {
        format!("{}!!!", self.greet())  // Dùng default greet
    }
}

struct Person {
    name: String,
}

// Dùng default
impl Greet for Person {}

struct Robot {
    id: u32,
}

// Override default
impl Greet for Robot {
    fn greet(&self) -> String {
        format!("Beep boop! Robot {}", self.id)
    }
}

fn main() {
    let person = Person {
        name: String::from("Alice"),
    };
    println!("{}", person.greet());
    println!("{}", person.greet_loudly());

    let robot = Robot { id: 42 };
    println!("{}", robot.greet());
    println!("{}", robot.greet_loudly());
}
```

**Đầu ra**:
```
Hello!
Hello!!!
Beep boop! Robot 42
Beep boop! Robot 42!!!
```

## 🔗 Trait Bounds

### Function Parameters

```rust
trait Summary {
    fn summarize(&self) -> String;
}

// Cách 1: impl Trait
fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

// Cách 2: Trait bound
fn notify2<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

// Cách 3: where clause
fn notify3<T>(item: &T)
where
    T: Summary,
{
    println!("Breaking news! {}", item.summarize());
}
```

### Multiple Bounds

```rust
use std::fmt::Display;

fn print_info<T: Display + Clone>(value: T) {
    println!("Value: {}", value);
    let cloned = value.clone();
    println!("Cloned: {}", cloned);
}

fn main() {
    print_info(42);
    print_info("Hello");
}
```

### Return Types

```rust
trait Animal {
    fn sound(&self) -> String;
}

struct Dog;
impl Animal for Dog {
    fn sound(&self) -> String {
        String::from("Woof!")
    }
}

fn create_animal() -> impl Animal {
    Dog  // Return concrete type
}

fn main() {
    let animal = create_animal();
    println!("{}", animal.sound());
}
```

## 🎯 Common Traits

### Debug và Display

```rust
use std::fmt;

#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

fn main() {
    let p = Point { x: 10, y: 20 };

    println!("{:?}", p);  // Debug
    println!("{}", p);    // Display
}
```

### Clone và Copy

```rust
#[derive(Clone, Copy, Debug)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p1 = Point { x: 10, y: 20 };
    let p2 = p1;  // Copy (vì có Copy trait)

    println!("{:?}", p1);  // p1 vẫn dùng được
    println!("{:?}", p2);
}
```

### PartialEq và Eq

```rust
#[derive(Debug, PartialEq)]
struct Person {
    name: String,
    age: u32,
}

fn main() {
    let p1 = Person {
        name: String::from("Alice"),
        age: 30,
    };

    let p2 = Person {
        name: String::from("Alice"),
        age: 30,
    };

    println!("Equal: {}", p1 == p2);  // true
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Area Trait

```rust
trait Area {
    fn area(&self) -> f64;
}

struct Square {
    side: f64,
}

// TODO: Implement Area for Square

fn main() {
    let square = Square { side: 5.0 };
    println!("Area: {}", square.area());
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
impl Area for Square {
    fn area(&self) -> f64 {
        self.side * self.side
    }
}
```
</details>

## 🎯 Tóm Tắt

| Concept | Cú Pháp | Ví Dụ |
|---------|---------|-------|
| **Define trait** | `trait Name { }` | `trait Speak { fn speak(&self); }` |
| **Implement** | `impl Trait for Type` | `impl Speak for Dog` |
| **Trait bound** | `<T: Trait>` | `<T: Display>` |
| **impl Trait** | `fn(item: impl Trait)` | Param hoặc return |
| **Derive** | `#[derive(Trait)]` | `#[derive(Debug, Clone)]` |

**Quy tắc vàng**:
- ✅ Traits định nghĩa hành vi chung
- ✅ Nhiều kiểu có thể implement cùng trait
- ✅ Dùng derive cho common traits
- ✅ Trait bounds giới hạn generic types
- ✅ Default implementations tái sử dụng code

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Traits](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [Rust By Example - Traits](https://doc.rust-lang.org/rust-by-example/trait.html)

---

**Bài tiếp theo**: [Trait Objects →](./trait-objects.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Trait Objects** - dynamic dispatch với `dyn Trait`!
