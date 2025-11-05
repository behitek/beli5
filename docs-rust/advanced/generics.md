---
sidebar_position: 12
title: "Generics: Code Cho Nhiều Kiểu Dữ Liệu"
description: "Tìm hiểu cách viết code hoạt động với nhiều kiểu dữ liệu khác nhau"
---

# 🎨 Generics: Code Cho Nhiều Kiểu Dữ Liệu

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được generics là gì và tại sao cần generics
- ✅ Viết generic functions
- ✅ Tạo generic structs
- ✅ Sử dụng generic enums
- ✅ Áp dụng trait bounds
- ✅ Hiểu monomorphization

## 🤔 Generics Là Gì?

### Ẩn Dụ Cuộc Sống: Hộp Đựng Đồ

**Generics** giống như **hộp đựng đồ đa năng**:

📦 **Hộp Cụ Thể**:
- Hộp đựng giày → Chỉ đựng giày
- Hộp đựng sách → Chỉ đựng sách
- Phải có nhiều loại hộp khác nhau

🎁 **Hộp Generic**:
- **Một loại hộp** đựng được nhiều thứ
- Giày, sách, đồ chơi, ... đều OK
- Linh hoạt, tái sử dụng

### Tại Sao Cần Generics?

**Không dùng generics** (lặp code):
```rust
fn largest_i32(list: &[i32]) -> i32 {
    let mut largest = list[0];
    for &item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn largest_char(list: &[char]) -> char {
    let mut largest = list[0];
    for &item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

// Phải viết lại cho mỗi kiểu! 😫
```

**Dùng generics** (một hàm cho tất cả):
```rust
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    println!("Largest: {}", largest(&numbers));

    let chars = vec!['y', 'm', 'a', 'q'];
    println!("Largest: {}", largest(&chars));
}
```

## 🔧 Generic Functions

### Cú Pháp Cơ Bản

```rust
fn print_value<T>(value: T) {
    println!("{:?}", value);  // Cần Debug trait
}

// Với trait bound
fn print_value<T: std::fmt::Debug>(value: T) {
    println!("{:?}", value);
}

fn main() {
    print_value(5);
    print_value("hello");
    print_value(vec![1, 2, 3]);
}
```

### Multiple Type Parameters

```rust
fn swap<T, U>(tuple: (T, U)) -> (U, T) {
    (tuple.1, tuple.0)
}

fn main() {
    let pair = ("hello", 42);
    let swapped = swap(pair);
    println!("{:?}", swapped);  // (42, "hello")
}
```

### Ví Dụ: Find First

```rust
fn find_first<T: PartialEq>(list: &[T], target: &T) -> Option<usize> {
    for (index, item) in list.iter().enumerate() {
        if item == target {
            return Some(index);
        }
    }
    None
}

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    println!("{:?}", find_first(&numbers, &3));  // Some(2)

    let words = vec!["hello", "world", "rust"];
    println!("{:?}", find_first(&words, &"rust"));  // Some(2)
}
```

## 📦 Generic Structs

### Định Nghĩa

```rust
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer_point = Point { x: 5, y: 10 };
    let float_point = Point { x: 1.0, y: 4.0 };

    println!("Integer: ({}, {})", integer_point.x, integer_point.y);
    println!("Float: ({}, {})", float_point.x, float_point.y);
}
```

### Multiple Type Parameters

```rust
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let point = Point { x: 5, y: 4.0 };
    println!("x: {}, y: {}", point.x, point.y);
}
```

### Methods Với Generics

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }

    fn new(x: T, y: T) -> Self {
        Point { x, y }
    }
}

// Method chỉ cho kiểu cụ thể
impl Point<f64> {
    fn distance_from_origin(&self) -> f64 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

fn main() {
    let p = Point::new(5, 10);
    println!("x: {}", p.x());

    let p2 = Point::new(3.0, 4.0);
    println!("Distance: {}", p2.distance_from_origin());
}
```

### Ví Dụ: Wrapper Type

```rust
struct Container<T> {
    value: T,
}

impl<T> Container<T> {
    fn new(value: T) -> Self {
        Container { value }
    }

    fn get(&self) -> &T {
        &self.value
    }

    fn set(&mut self, value: T) {
        self.value = value;
    }
}

fn main() {
    let mut int_container = Container::new(42);
    println!("Value: {}", int_container.get());

    int_container.set(100);
    println!("New value: {}", int_container.get());

    let string_container = Container::new(String::from("Hello"));
    println!("String: {}", string_container.get());
}
```

## 🎲 Generic Enums

### Option<T> và Result<T, E>

```rust
// Định nghĩa trong std library
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}

fn main() {
    let some_number: Option<i32> = Some(5);
    let some_string: Option<String> = Some(String::from("hello"));

    let ok_value: Result<i32, String> = Ok(10);
    let err_value: Result<i32, String> = Err(String::from("error"));
}
```

### Custom Generic Enum

```rust
enum Either<L, R> {
    Left(L),
    Right(R),
}

impl<L, R> Either<L, R> {
    fn is_left(&self) -> bool {
        matches!(self, Either::Left(_))
    }

    fn is_right(&self) -> bool {
        matches!(self, Either::Right(_))
    }
}

fn main() {
    let left: Either<i32, String> = Either::Left(42);
    let right: Either<i32, String> = Either::Right(String::from("hello"));

    println!("Is left: {}", left.is_left());
    println!("Is right: {}", right.is_right());
}
```

### Ví Dụ: Tree Node

```rust
#[derive(Debug)]
enum Tree<T> {
    Leaf(T),
    Node {
        value: T,
        left: Box<Tree<T>>,
        right: Box<Tree<T>>,
    },
}

fn main() {
    let tree = Tree::Node {
        value: 10,
        left: Box::new(Tree::Leaf(5)),
        right: Box::new(Tree::Leaf(15)),
    };

    println!("{:?}", tree);
}
```

## 🔒 Trait Bounds

### Cú Pháp

```rust
// Cách 1: Inline bound
fn largest<T: PartialOrd>(a: T, b: T) -> T {
    if a > b { a } else { b }
}

// Cách 2: where clause
fn largest<T>(a: T, b: T) -> T
where
    T: PartialOrd,
{
    if a > b { a } else { b }
}

fn main() {
    println!("{}", largest(10, 20));
    println!("{}", largest(3.5, 2.8));
}
```

### Multiple Bounds

```rust
use std::fmt::Display;

fn print_and_return<T: Display + Clone>(value: T) -> T {
    println!("Value: {}", value);
    value.clone()
}

fn main() {
    let x = 42;
    let y = print_and_return(x);
    println!("Returned: {}", y);
}
```

### Ví Dụ: Comparable

```rust
fn max<T: PartialOrd + Copy>(a: T, b: T) -> T {
    if a > b { a } else { b }
}

fn min<T: PartialOrd + Copy>(a: T, b: T) -> T {
    if a < b { a } else { b }
}

fn clamp<T: PartialOrd + Copy>(value: T, min_val: T, max_val: T) -> T {
    if value < min_val {
        min_val
    } else if value > max_val {
        max_val
    } else {
        value
    }
}

fn main() {
    println!("Max: {}", max(10, 20));
    println!("Min: {}", min(10, 20));
    println!("Clamp: {}", clamp(15, 10, 20));
    println!("Clamp: {}", clamp(5, 10, 20));
    println!("Clamp: {}", clamp(25, 10, 20));
}
```

**Đầu ra**:
```
Max: 20
Min: 10
Clamp: 15
Clamp: 10
Clamp: 20
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Pair

```rust
#[derive(Debug)]
struct Pair<T, U> {
    first: T,
    second: U,
}

impl<T, U> Pair<T, U> {
    fn new(first: T, second: U) -> Self {
        Pair { first, second }
    }

    fn swap(self) -> Pair<U, T> {
        Pair {
            first: self.second,
            second: self.first,
        }
    }
}

impl<T: Display, U: Display> Pair<T, U> {
    fn display(&self) {
        println!("({}, {})", self.first, self.second);
    }
}

use std::fmt::Display;

fn main() {
    let pair = Pair::new(1, "hello");
    pair.display();

    let swapped = pair.swap();
    swapped.display();
}
```

**Đầu ra**:
```
(1, hello)
(hello, 1)
```

### Ví Dụ 2: Stack

```rust
struct Stack<T> {
    items: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Self {
        Stack { items: Vec::new() }
    }

    fn push(&mut self, item: T) {
        self.items.push(item);
    }

    fn pop(&mut self) -> Option<T> {
        self.items.pop()
    }

    fn peek(&self) -> Option<&T> {
        self.items.last()
    }

    fn is_empty(&self) -> bool {
        self.items.is_empty()
    }

    fn len(&self) -> usize {
        self.items.len()
    }
}

fn main() {
    let mut stack = Stack::new();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    println!("Top: {:?}", stack.peek());
    println!("Length: {}", stack.len());

    while let Some(item) = stack.pop() {
        println!("Popped: {}", item);
    }

    println!("Is empty: {}", stack.is_empty());
}
```

**Đầu ra**:
```
Top: Some(3)
Length: 3
Popped: 3
Popped: 2
Popped: 1
Is empty: true
```

### Ví Dụ 3: Cache

```rust
use std::collections::HashMap;
use std::hash::Hash;

struct Cache<K, V> {
    map: HashMap<K, V>,
}

impl<K: Eq + Hash, V> Cache<K, V> {
    fn new() -> Self {
        Cache {
            map: HashMap::new(),
        }
    }

    fn get(&self, key: &K) -> Option<&V> {
        self.map.get(key)
    }

    fn insert(&mut self, key: K, value: V) {
        self.map.insert(key, value);
    }

    fn contains(&self, key: &K) -> bool {
        self.map.contains_key(key)
    }
}

fn main() {
    let mut cache = Cache::new();

    cache.insert("user:1", "Alice");
    cache.insert("user:2", "Bob");

    if let Some(name) = cache.get(&"user:1") {
        println!("Found: {}", name);
    }

    println!("Contains user:3: {}", cache.contains(&"user:3"));
}
```

**Đầu ra**:
```
Found: Alice
Contains user:3: false
```

### Ví Dụ 4: Validator

```rust
trait Validate {
    fn is_valid(&self) -> bool;
}

struct Validator<T: Validate> {
    items: Vec<T>,
}

impl<T: Validate> Validator<T> {
    fn new() -> Self {
        Validator { items: Vec::new() }
    }

    fn add(&mut self, item: T) {
        self.items.push(item);
    }

    fn validate_all(&self) -> Vec<bool> {
        self.items.iter().map(|item| item.is_valid()).collect()
    }

    fn count_valid(&self) -> usize {
        self.items.iter().filter(|item| item.is_valid()).count()
    }
}

struct Email {
    address: String,
}

impl Validate for Email {
    fn is_valid(&self) -> bool {
        self.address.contains('@')
    }
}

fn main() {
    let mut validator = Validator::new();

    validator.add(Email {
        address: String::from("user@example.com"),
    });
    validator.add(Email {
        address: String::from("invalid-email"),
    });
    validator.add(Email {
        address: String::from("another@test.com"),
    });

    let results = validator.validate_all();
    println!("Validation results: {:?}", results);
    println!("Valid count: {}", validator.count_valid());
}
```

**Đầu ra**:
```
Validation results: [true, false, true]
Valid count: 2
```

## ⚡ Monomorphization

### Compile-Time Code Generation

Rust tạo code cụ thể cho mỗi kiểu:

```rust
fn print<T: std::fmt::Display>(value: T) {
    println!("{}", value);
}

fn main() {
    print(5);
    print("hello");
}

// Compiler tạo:
// fn print_i32(value: i32) { ... }
// fn print_str(value: &str) { ... }
```

**Lợi ích**:
- ✅ Không có runtime overhead
- ✅ Nhanh như code không generic
- ✅ Tối ưu hóa cho từng kiểu

**Nhược điểm**:
- ❌ Binary size lớn hơn
- ❌ Compile time lâu hơn

## 🚫 Lỗi Thường Gặp

### Lỗi 1: Thiếu Trait Bound

```rust
// ❌ Lỗi
fn largest<T>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list {
        if item > largest {  // T không có >
            largest = item;
        }
    }
    largest
}

// ✅ Sửa
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

### Lỗi 2: Lifetime Với Generics

```rust
// ❌ Lỗi
struct Wrapper<T> {
    value: &T,  // Missing lifetime
}

// ✅ Sửa
struct Wrapper<'a, T> {
    value: &'a T,
}
```

### Lỗi 3: Type Mismatch

```rust
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    // ❌ Lỗi - x và y khác kiểu
    // let p = Point { x: 5, y: 4.0 };

    // ✅ Sửa - dùng 2 type parameters
    struct Point<T, U> {
        x: T,
        y: U,
    }

    let p = Point { x: 5, y: 4.0 };
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Generic Max Function

```rust
fn max<T>(a: T, b: T) -> T {
    // TODO: Return larger value
}

fn main() {
    println!("{}", max(10, 20));
    println!("{}", max(3.5, 2.8));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn max<T: PartialOrd>(a: T, b: T) -> T {
    if a > b { a } else { b }
}
```
</details>

### Bài 2: Generic Container

```rust
struct Box<T> {
    // TODO
}

impl<T> Box<T> {
    fn new(value: T) -> Self {
        // TODO
    }

    fn get(&self) -> &T {
        // TODO
    }
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
struct Box<T> {
    value: T,
}

impl<T> Box<T> {
    fn new(value: T) -> Self {
        Box { value }
    }

    fn get(&self) -> &T {
        &self.value
    }
}
```
</details>

### Bài 3: Generic Pair With Method

```rust
struct Pair<T> {
    first: T,
    second: T,
}

impl<T: PartialOrd> Pair<T> {
    fn larger(&self) -> &T {
        // TODO: Return reference to larger value
    }
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
impl<T: PartialOrd> Pair<T> {
    fn larger(&self) -> &T {
        if self.first > self.second {
            &self.first
        } else {
            &self.second
        }
    }
}
```
</details>

## 🎯 Tóm Tắt

| Concept | Cú Pháp | Ví Dụ |
|---------|---------|-------|
| **Generic function** | `fn name<T>()` | `fn print<T>(x: T)` |
| **Generic struct** | `struct Name<T>` | `struct Point<T> { x: T }` |
| **Generic enum** | `enum Name<T>` | `enum Option<T> { Some(T), None }` |
| **Trait bound** | `<T: Trait>` | `<T: Display>` |
| **Multiple bounds** | `<T: A + B>` | `<T: Display + Clone>` |
| **where clause** | `where T: Trait` | `where T: Display` |

**Quy tắc vàng**:
- ✅ Generics giúp tái sử dụng code cho nhiều kiểu
- ✅ Không có runtime overhead (monomorphization)
- ✅ Dùng trait bounds để giới hạn kiểu
- ✅ `where` clause cho bounds phức tạp
- ✅ Kết hợp với lifetimes khi cần

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Generic Types](https://doc.rust-lang.org/book/ch10-01-syntax.html)
- [Rust By Example - Generics](https://doc.rust-lang.org/rust-by-example/generics.html)

---

**Bài tiếp theo**: [Traits →](./traits.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Traits** - định nghĩa hành vi chung cho nhiều kiểu!
