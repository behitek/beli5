---
sidebar_position: 22
title: "Box: Con Trỏ Thông Minh"
description: "Tìm hiểu cách sử dụng Box để lưu trữ dữ liệu trên heap"
---

# 📦 Box: Con Trỏ Thông Minh

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu Stack vs Heap
- ✅ Biết khi nào dùng Box<T>
- ✅ Tạo recursive types với Box
- ✅ Sử dụng Deref trait
- ✅ Hiểu ownership với Box
- ✅ So sánh Box vs references

## 🤔 Box Là Gì?

### Ẩn Dụ Cuộc Sống: Kho Chứa Đồ

**Box** giống như **thuê kho lưu trữ**:

🏠 **Nhà (Stack)**:
- **Không gian hạn chế**
- Đồ nhỏ để trong nhà
- Biết trước kích thước
- Nhanh truy cập

📦 **Kho (Heap)**:
- **Không gian lớn**
- Đồ to để ở kho
- Kích thước linh hoạt
- Có địa chỉ (pointer)

🦀 **Box Trong Rust**:
- **Lưu data trên heap**
- Pointer trên stack
- Ownership duy nhất
- Tự động cleanup

### Ví Dụ Cơ Bản

```rust
fn main() {
    // Tạo Box - data trên heap
    let b = Box::new(5);

    println!("b = {}", b); // 5

    // Box tự động free khi out of scope
}
```

## 📊 Stack vs Heap

### Stack - Ngăn Nắp, Nhanh

```rust
fn main() {
    let x = 5;           // Trên stack
    let y = 10;          // Trên stack
    let arr = [1, 2, 3]; // Trên stack (fixed size)

    // Tất cả biết trước kích thước
}
```

**Đặc điểm Stack**:
- ✅ Cực nhanh (push/pop)
- ✅ Tự động quản lý
- ❌ Kích thước cố định
- ❌ Giới hạn dung lượng

### Heap - Linh Hoạt, Chậm Hơn

```rust
fn main() {
    let b = Box::new(5);              // Data trên heap
    let v = vec![1, 2, 3];            // Data trên heap
    let s = String::from("hello");    // Data trên heap

    // Kích thước linh hoạt
}
```

**Đặc điểm Heap**:
- ✅ Không giới hạn kích thước (tương đối)
- ✅ Kích thước runtime
- ❌ Chậm hơn stack
- ❌ Cần quản lý memory

### So Sánh

```rust
fn main() {
    // Stack: nhanh, nhỏ, fixed size
    let stack_num = 42;

    // Heap: linh hoạt, lớn hơn
    let heap_num = Box::new(42);

    println!("Stack: {}", stack_num);
    println!("Heap: {}", heap_num);
}
```

## 📦 Khi Nào Dùng Box?

### Trường Hợp 1: Recursive Types

**Vấn đề**: Rust cần biết kích thước type tại compile time

```rust
// ❌ COMPILE ERROR!
enum List {
    Cons(i32, List),  // Kích thước vô hạn!
    Nil,
}
```

**Giải pháp**: Dùng Box

```rust
enum List {
    Cons(i32, Box<List>),  // ✅ Kích thước cố định (pointer)
    Nil,
}

fn main() {
    let list = List::Cons(1,
        Box::new(List::Cons(2,
            Box::new(List::Cons(3,
                Box::new(List::Nil))))));

    println!("Created linked list!");
}
```

### Trường Hợp 2: Large Data

```rust
fn main() {
    // Array lớn trên stack có thể gây stack overflow
    let large_array = Box::new([0; 1_000_000]);

    println!("Created large array on heap");
}
```

### Trường Hợp 3: Transfer Ownership Mà Không Copy

```rust
fn main() {
    let data = Box::new([0; 1000]);

    // Move Box (chỉ move pointer, không copy data)
    let data2 = data;

    // data không dùng được nữa
    // println!("{:?}", data); // ERROR!
}
```

### Trường Hợp 4: Trait Objects

```rust
trait Animal {
    fn speak(&self);
}

struct Dog;
impl Animal for Dog {
    fn speak(&self) {
        println!("Woof!");
    }
}

struct Cat;
impl Animal for Cat {
    fn speak(&self) {
        println!("Meow!");
    }
}

fn main() {
    // Vec của trait objects
    let animals: Vec<Box<dyn Animal>> = vec![
        Box::new(Dog),
        Box::new(Cat),
    ];

    for animal in animals {
        animal.speak();
    }
}
```

## 🔧 Sử Dụng Box

### Tạo Box

```rust
fn main() {
    // Box::new()
    let b1 = Box::new(5);
    let b2 = Box::new(String::from("hello"));
    let b3 = Box::new(vec![1, 2, 3]);

    println!("{}, {}, {:?}", b1, b2, b3);
}
```

### Truy Cập Data

```rust
fn main() {
    let boxed = Box::new(42);

    // Tự động dereference
    println!("{}", boxed);           // 42
    println!("{}", *boxed);          // 42 (explicit deref)

    let value = *boxed;              // Copy value out
    println!("{}", value);           // 42
}
```

### Box với Struct

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Box::new(Point { x: 10, y: 20 });

    println!("x: {}, y: {}", p.x, p.y);  // Tự động deref
}
```

### Box với Method

```rust
struct Data {
    value: i32,
}

impl Data {
    fn print(&self) {
        println!("Value: {}", self.value);
    }
}

fn main() {
    let data = Box::new(Data { value: 42 });

    data.print();  // Tự động deref để call method
}
```

## 🔗 Linked List Example

### Định Nghĩa

```rust
#[derive(Debug)]
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(
        Cons(2, Box::new(
            Cons(3, Box::new(Nil))
        ))
    ));

    println!("{:?}", list);
}
```

### Với Helper Function

```rust
#[derive(Debug)]
enum List {
    Cons(i32, Box<List>),
    Nil,
}

impl List {
    fn new() -> List {
        List::Nil
    }

    fn prepend(self, value: i32) -> List {
        List::Cons(value, Box::new(self))
    }

    fn len(&self) -> usize {
        match self {
            List::Cons(_, tail) => 1 + tail.len(),
            List::Nil => 0,
        }
    }
}

fn main() {
    let list = List::new()
        .prepend(3)
        .prepend(2)
        .prepend(1);

    println!("Length: {}", list.len()); // 3
}
```

## 🔄 Deref Trait

### Box Implements Deref

```rust
use std::ops::Deref;

fn main() {
    let x = 5;
    let y = Box::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y);  // Deref coercion

    // Box<T> -> &T tự động
}
```

### Deref Coercion

```rust
fn hello(name: &str) {
    println!("Hello, {}!", name);
}

fn main() {
    let m = Box::new(String::from("Rust"));

    // Box<String> -> &String -> &str
    hello(&m);  // Tự động deref!
}
```

### Custom Deref

```rust
use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

fn main() {
    let x = 5;
    let y = MyBox::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Binary Tree

```rust
#[derive(Debug)]
struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

impl TreeNode {
    fn new(value: i32) -> Self {
        TreeNode {
            value,
            left: None,
            right: None,
        }
    }

    fn insert_left(&mut self, value: i32) {
        self.left = Some(Box::new(TreeNode::new(value)));
    }

    fn insert_right(&mut self, value: i32) {
        self.right = Some(Box::new(TreeNode::new(value)));
    }
}

fn main() {
    let mut root = TreeNode::new(10);
    root.insert_left(5);
    root.insert_right(15);

    if let Some(left) = &mut root.left {
        left.insert_left(3);
        left.insert_right(7);
    }

    println!("{:#?}", root);
}
```

### Ví Dụ 2: Dynamic Dispatch

```rust
trait Shape {
    fn area(&self) -> f64;
}

struct Circle {
    radius: f64,
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
}

struct Rectangle {
    width: f64,
    height: f64,
}

impl Shape for Rectangle {
    fn area(&self) -> f64 {
        self.width * self.height
    }
}

fn main() {
    let shapes: Vec<Box<dyn Shape>> = vec![
        Box::new(Circle { radius: 5.0 }),
        Box::new(Rectangle { width: 10.0, height: 20.0 }),
    ];

    for shape in shapes {
        println!("Area: {}", shape.area());
    }
}
```

### Ví Dụ 3: Large Struct

```rust
struct LargeData {
    data: [u8; 1_000_000],
}

impl LargeData {
    fn new() -> Box<Self> {
        Box::new(LargeData {
            data: [0; 1_000_000],
        })
    }
}

fn process(data: Box<LargeData>) {
    println!("Processing large data...");
    // No copy, just move the pointer
}

fn main() {
    let data = LargeData::new();
    process(data);
}
```

### Ví Dụ 4: Closure Storage

```rust
fn create_adder(x: i32) -> Box<dyn Fn(i32) -> i32> {
    Box::new(move |y| x + y)
}

fn main() {
    let add_5 = create_adder(5);
    let add_10 = create_adder(10);

    println!("{}", add_5(3));  // 8
    println!("{}", add_10(3)); // 13
}
```

### Ví Dụ 5: State Machine

```rust
trait State {
    fn handle(self: Box<Self>) -> Box<dyn State>;
    fn name(&self) -> &str;
}

struct StateA;
impl State for StateA {
    fn handle(self: Box<Self>) -> Box<dyn State> {
        println!("Transitioning from A to B");
        Box::new(StateB)
    }
    fn name(&self) -> &str { "State A" }
}

struct StateB;
impl State for StateB {
    fn handle(self: Box<Self>) -> Box<dyn State> {
        println!("Transitioning from B to C");
        Box::new(StateC)
    }
    fn name(&self) -> &str { "State B" }
}

struct StateC;
impl State for StateC {
    fn handle(self: Box<Self>) -> Box<dyn State> {
        println!("Transitioning from C to A");
        Box::new(StateA)
    }
    fn name(&self) -> &str { "State C" }
}

fn main() {
    let mut state: Box<dyn State> = Box::new(StateA);

    for _ in 0..5 {
        println!("Current: {}", state.name());
        state = state.handle();
    }
}
```

## 🆚 Box vs References

### Box - Ownership

```rust
fn main() {
    let b = Box::new(String::from("hello"));

    // b owns the String
    let b2 = b;  // Move ownership

    // b không dùng được nữa
    // println!("{}", b); // ERROR!
}
```

### Reference - Borrowing

```rust
fn main() {
    let s = String::from("hello");

    // Borrow, không move
    let r = &s;

    // Cả s và r đều dùng được
    println!("{}", s);
    println!("{}", r);
}
```

### So Sánh

```rust
fn main() {
    // Box - Heap allocation + Ownership
    let boxed = Box::new(42);
    // boxed owns the value on heap

    // Reference - Just borrow
    let value = 42;
    let reference = &value;
    // reference borrows, doesn't own
}
```

| Feature | Box<T> | &T |
|---------|--------|----|
| **Ownership** | Owns data | Borrows |
| **Location** | Heap | Stack or Heap |
| **Lifetime** | 'static (owned) | Must be valid |
| **Move** | Moves ownership | Can copy reference |
| **Use case** | Recursive types, large data | Temporary access |

## 💻 Bài Tập Thực Hành

### Bài 1: Create Box

```rust
fn main() {
    // TODO: Tạo Box chứa số 100
    // let b = ...

    // TODO: In giá trị
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let b = Box::new(100);

    println!("Value: {}", b);
    println!("Dereferenced: {}", *b);
}
```
</details>

### Bài 2: Linked List

```rust
enum List {
    Cons(i32, Box<List>),
    Nil,
}

fn main() {
    // TODO: Tạo list: 1 -> 2 -> 3 -> Nil
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(
        Cons(2, Box::new(
            Cons(3, Box::new(Nil))
        ))
    ));

    println!("Created linked list");
}
```
</details>

### Bài 3: Trait Objects

```rust
trait Animal {
    fn speak(&self);
}

struct Dog;
// TODO: Implement Animal for Dog

struct Cat;
// TODO: Implement Animal for Cat

fn main() {
    // TODO: Tạo Vec<Box<dyn Animal>> với Dog và Cat
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
trait Animal {
    fn speak(&self);
}

struct Dog;
impl Animal for Dog {
    fn speak(&self) {
        println!("Woof!");
    }
}

struct Cat;
impl Animal for Cat {
    fn speak(&self) {
        println!("Meow!");
    }
}

fn main() {
    let animals: Vec<Box<dyn Animal>> = vec![
        Box::new(Dog),
        Box::new(Cat),
        Box::new(Dog),
    ];

    for animal in animals {
        animal.speak();
    }
}
```
</details>

### Bài 4: Binary Tree Insert

```rust
struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

impl TreeNode {
    fn new(value: i32) -> Self {
        TreeNode { value, left: None, right: None }
    }

    // TODO: Implement insert method
    fn insert(&mut self, value: i32) {
        // Insert left if value < self.value
        // Insert right if value >= self.value
    }
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
struct TreeNode {
    value: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

impl TreeNode {
    fn new(value: i32) -> Self {
        TreeNode { value, left: None, right: None }
    }

    fn insert(&mut self, value: i32) {
        if value < self.value {
            match &mut self.left {
                Some(node) => node.insert(value),
                None => self.left = Some(Box::new(TreeNode::new(value))),
            }
        } else {
            match &mut self.right {
                Some(node) => node.insert(value),
                None => self.right = Some(Box::new(TreeNode::new(value))),
            }
        }
    }
}

fn main() {
    let mut root = TreeNode::new(10);
    root.insert(5);
    root.insert(15);
    root.insert(3);
    root.insert(7);

    println!("Tree created!");
}
```
</details>

## 🎯 Tóm Tắt

| Khái Niệm | Mô Tả |
|-----------|-------|
| **Box<T>** | Smart pointer lưu data trên heap |
| **Stack** | Nhanh, fixed size, tự động quản lý |
| **Heap** | Linh hoạt, runtime size, cần quản lý |
| **Recursive types** | Dùng Box để break infinite size |
| **Deref** | Tự động dereference Box -> T |
| **Ownership** | Box owns data, tự động cleanup |

**Khi nào dùng Box**:
- ✅ Recursive types (linked list, tree)
- ✅ Large data structures
- ✅ Trait objects (dynamic dispatch)
- ✅ Transfer ownership without copy

**Quy tắc vàng**:
- Box owns data trên heap
- Tự động cleanup khi out of scope
- Zero runtime overhead cho deref
- Dùng khi cần heap allocation với ownership

## 🔗 Liên Kết Hữu Ích

- [std::boxed::Box](https://doc.rust-lang.org/std/boxed/struct.Box.html)
- [Deref Trait](https://doc.rust-lang.org/std/ops/trait.Deref.html)

---

**Bài tiếp theo**: [Rc và Arc: Shared Ownership →](./rc-arc.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Rc và Arc** - cách chia sẻ ownership!
