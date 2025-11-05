---
sidebar_position: 24
title: "RefCell: Interior Mutability"
description: "Tìm hiểu interior mutability pattern với RefCell"
---

# 🔐 RefCell: Interior Mutability

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu interior mutability pattern
- ✅ Sử dụng `RefCell<T>` để mutate immutable data
- ✅ Biết `.borrow()` và `.borrow_mut()`
- ✅ Hiểu runtime borrow checking
- ✅ Kết hợp `Rc<RefCell<T>>` pattern
- ✅ Tránh runtime panics

## 🤔 RefCell Là Gì?

### Ẩn Dụ Cuộc Sống: Két Sắt Thông Minh

**RefCell** giống như **két sắt có hệ thống check-in/check-out**:

🏦 **Két Sắt Thông Minh**:
- **Bên ngoài**: Két không di chuyển được (immutable)
- **Bên trong**: Đồ có thể thay đổi
- **Check-in/out**: Theo dõi ai đang dùng
- **Runtime check**: Kiểm tra khi mở két

🦀 **RefCell Trong Rust**:
- **Immutable reference** bên ngoài
- **Interior mutability** bên trong
- **Runtime borrow checking**
- Panic nếu vi phạm rules

### Ví Dụ Cơ Bản

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(5);

    // Borrow immutable
    let borrowed = data.borrow();
    println!("Value: {}", *borrowed);
    drop(borrowed);  // Release borrow

    // Borrow mutable
    let mut borrowed_mut = data.borrow_mut();
    *borrowed_mut += 10;
    drop(borrowed_mut);  // Release borrow

    println!("New value: {}", data.borrow());
}
```

## 📊 Interior Mutability

### Vấn Đề Cần Giải Quyết

```rust
// ❌ Compile error!
fn main() {
    let x = 5;
    // x.mutate(); // ERROR: x is immutable

    let vec = vec![1, 2, 3];
    // vec.push(4); // ERROR: vec is immutable
}
```

**Rust's borrowing rules** (compile-time):
- Hoặc **một** `&mut T`
- Hoặc **nhiều** `&T`

### Giải Pháp: RefCell

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(vec![1, 2, 3]);

    // Immutable reference to RefCell
    // But can mutate INTERIOR!
    data.borrow_mut().push(4);

    println!("{:?}", data.borrow()); // [1, 2, 3, 4]
}
```

## 🔧 Sử Dụng RefCell

### `.borrow()` - Immutable Borrow

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(String::from("hello"));

    // Immutable borrow
    let borrowed1 = data.borrow();
    let borrowed2 = data.borrow();  // ✅ OK: nhiều immutable borrows

    println!("{}, {}", borrowed1, borrowed2);
}
```

### `.borrow_mut()` - Mutable Borrow

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(String::from("hello"));

    {
        let mut borrowed = data.borrow_mut();
        borrowed.push_str(" world");
    }  // borrowed dropped here

    println!("{}", data.borrow()); // "hello world"
}
```

### Runtime Panic

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(5);

    let borrow1 = data.borrow_mut();

    // ❌ PANIC at runtime!
    // let borrow2 = data.borrow_mut();  // Already mutably borrowed!

    drop(borrow1);  // Release first

    let borrow2 = data.borrow_mut();  // ✅ OK now
}
```

### `.try_borrow()` - Safe Alternative

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(5);

    let borrow1 = data.borrow_mut();

    // Try borrow - returns Result
    match data.try_borrow() {
        Ok(b) => println!("Borrowed: {}", b),
        Err(e) => println!("Cannot borrow: {:?}", e),
    }

    drop(borrow1);

    match data.try_borrow() {
        Ok(b) => println!("Borrowed: {}", b),  // ✅ Success
        Err(e) => println!("Cannot borrow: {:?}", e),
    }
}
```

## 🔗 `Rc<RefCell<T>>` Pattern

### Vấn Đề: Shared Mutable State

```rust
use std::rc::Rc;

fn main() {
    let data = Rc::new(vec![1, 2, 3]);

    let data1 = Rc::clone(&data);
    let data2 = Rc::clone(&data);

    // ❌ Cannot mutate! Rc is immutable
    // data1.push(4);  // ERROR!
}
```

### Giải Pháp: `Rc<RefCell<T>>`

```rust
use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let data = Rc::new(RefCell::new(vec![1, 2, 3]));

    let data1 = Rc::clone(&data);
    let data2 = Rc::clone(&data);

    // ✅ Can mutate interior!
    data1.borrow_mut().push(4);
    data2.borrow_mut().push(5);

    println!("{:?}", data.borrow()); // [1, 2, 3, 4, 5]
}
```

### Shared Mutable Graph

```rust
use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    children: RefCell<Vec<Rc<Node>>>,
}

impl Node {
    fn new(value: i32) -> Rc<Self> {
        Rc::new(Node {
            value,
            children: RefCell::new(vec![]),
        })
    }

    fn add_child(self: &Rc<Self>, child: Rc<Node>) {
        self.children.borrow_mut().push(child);
    }
}

fn main() {
    let root = Node::new(1);
    let child1 = Node::new(2);
    let child2 = Node::new(3);

    root.add_child(Rc::clone(&child1));
    root.add_child(Rc::clone(&child2));

    println!("Root has {} children", root.children.borrow().len()); // 2
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Mock Object (Testing)

```rust
use std::cell::RefCell;

struct MockDatabase {
    calls: RefCell<Vec<String>>,
}

impl MockDatabase {
    fn new() -> Self {
        MockDatabase {
            calls: RefCell::new(vec![]),
        }
    }

    fn query(&self, sql: &str) -> String {
        // Track calls (mutate interior)
        self.calls.borrow_mut().push(sql.to_string());

        format!("Result for: {}", sql)
    }

    fn call_count(&self) -> usize {
        self.calls.borrow().len()
    }
}

fn main() {
    let db = MockDatabase::new();

    db.query("SELECT * FROM users");
    db.query("SELECT * FROM products");

    println!("Database called {} times", db.call_count()); // 2
}
```

### Ví Dụ 2: Tree với Parent References

```rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

impl Node {
    fn new(value: i32) -> Rc<Self> {
        Rc::new(Node {
            value,
            parent: RefCell::new(Weak::new()),
            children: RefCell::new(vec![]),
        })
    }

    fn add_child(self: &Rc<Self>, child: &Rc<Node>) {
        child.parent.borrow_mut().clone_from(&Rc::downgrade(self));
        self.children.borrow_mut().push(Rc::clone(child));
    }
}

fn main() {
    let root = Node::new(1);
    let child = Node::new(2);

    root.add_child(&child);

    println!("Root has {} children", root.children.borrow().len());

    if let Some(parent) = child.parent.borrow().upgrade() {
        println!("Child's parent: {}", parent.value);
    }
}
```

### Ví Dụ 3: Cache với Statistics

```rust
use std::cell::RefCell;
use std::collections::HashMap;

struct Cache {
    data: HashMap<String, String>,
    hits: RefCell<u32>,
    misses: RefCell<u32>,
}

impl Cache {
    fn new() -> Self {
        Cache {
            data: HashMap::new(),
            hits: RefCell::new(0),
            misses: RefCell::new(0),
        }
    }

    fn get(&self, key: &str) -> Option<&String> {
        if let Some(value) = self.data.get(key) {
            *self.hits.borrow_mut() += 1;
            Some(value)
        } else {
            *self.misses.borrow_mut() += 1;
            None
        }
    }

    fn stats(&self) {
        println!("Hits: {}, Misses: {}", self.hits.borrow(), self.misses.borrow());
    }
}

fn main() {
    let mut cache = Cache::new();
    cache.data.insert("key1".to_string(), "value1".to_string());

    cache.get("key1");  // Hit
    cache.get("key2");  // Miss
    cache.get("key1");  // Hit

    cache.stats();  // Hits: 2, Misses: 1
}
```

### Ví Dụ 4: Observer Pattern

```rust
use std::rc::Rc;
use std::cell::RefCell;

trait Observer {
    fn update(&self, message: &str);
}

struct ConcreteObserver {
    id: i32,
    messages: RefCell<Vec<String>>,
}

impl ConcreteObserver {
    fn new(id: i32) -> Self {
        ConcreteObserver {
            id,
            messages: RefCell::new(vec![]),
        }
    }

    fn message_count(&self) -> usize {
        self.messages.borrow().len()
    }
}

impl Observer for ConcreteObserver {
    fn update(&self, message: &str) {
        self.messages.borrow_mut().push(message.to_string());
        println!("Observer {} received: {}", self.id, message);
    }
}

struct Subject {
    observers: RefCell<Vec<Rc<dyn Observer>>>,
}

impl Subject {
    fn new() -> Self {
        Subject {
            observers: RefCell::new(vec![]),
        }
    }

    fn attach(&self, observer: Rc<dyn Observer>) {
        self.observers.borrow_mut().push(observer);
    }

    fn notify(&self, message: &str) {
        for observer in self.observers.borrow().iter() {
            observer.update(message);
        }
    }
}

fn main() {
    let subject = Subject::new();

    let observer1 = Rc::new(ConcreteObserver::new(1));
    let observer2 = Rc::new(ConcreteObserver::new(2));

    subject.attach(Rc::clone(&observer1));
    subject.attach(Rc::clone(&observer2));

    subject.notify("Event 1");
    subject.notify("Event 2");

    println!("Observer 1 received {} messages", observer1.message_count());
}
```

### Ví Dụ 5: Mutable Callback

```rust
use std::cell::RefCell;

struct Counter {
    count: RefCell<i32>,
}

impl Counter {
    fn new() -> Self {
        Counter {
            count: RefCell::new(0),
        }
    }

    fn increment(&self) {
        *self.count.borrow_mut() += 1;
    }

    fn get(&self) -> i32 {
        *self.count.borrow()
    }
}

fn process_items<F>(items: &[i32], callback: F)
where
    F: Fn(i32),
{
    for &item in items {
        callback(item);
    }
}

fn main() {
    let counter = Counter::new();

    let items = vec![1, 2, 3, 4, 5];

    process_items(&items, |_| {
        counter.increment();
    });

    println!("Processed {} items", counter.get()); // 5
}
```

## 🆚 RefCell vs Cell vs Mutex

### `Cell<T>`

```rust
use std::cell::Cell;

fn main() {
    let data = Cell::new(5);

    // Get copy
    let value = data.get();
    println!("{}", value);

    // Set new value
    data.set(10);
    println!("{}", data.get());

    // Cell: Copy types only, no references
}
```

### `RefCell<T>`

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(String::from("hello"));

    // Borrow
    {
        let mut borrowed = data.borrow_mut();
        borrowed.push_str(" world");
    }

    println!("{}", data.borrow());

    // RefCell: Any type, returns references
}
```

### `Mutex<T>`

```rust
use std::sync::Mutex;

fn main() {
    let data = Mutex::new(5);

    {
        let mut locked = data.lock().unwrap();
        *locked += 10;
    }

    println!("{:?}", data.lock().unwrap());

    // Mutex: Thread-safe, blocking
}
```

| Type | Thread-Safe | Borrow Check | Overhead | Use Case |
|------|-------------|--------------|----------|----------|
| **`Cell<T>`** | ❌ No | None | Very low | Copy types, single-thread |
| **`RefCell<T>`** | ❌ No | Runtime | Low | Any type, single-thread |
| **`Mutex<T>`** | ✅ Yes | Runtime | High | Multi-thread |

## ⚠️ Pitfalls và Best Practices

### Pitfall 1: Holding Borrows Too Long

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(5);

    let borrow = data.borrow_mut();

    // ❌ PANIC! Already mutably borrowed
    // let another = data.borrow();

    drop(borrow);  // ✅ Release early

    let another = data.borrow();  // ✅ OK
}
```

### Pitfall 2: Nested Borrows

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(vec![1, 2, 3]);

    // ❌ PANIC! Try to borrow_mut while iterating (which borrows)
    // for item in data.borrow().iter() {
    //     data.borrow_mut().push(*item); // PANIC!
    // }

    // ✅ Collect first
    let items: Vec<_> = data.borrow().iter().copied().collect();
    for item in items {
        data.borrow_mut().push(item);
    }
}
```

### Best Practice 1: Drop Early

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(5);

    {
        let mut borrow = data.borrow_mut();
        *borrow += 10;
    }  // Drop immediately

    // Can borrow again
    println!("{}", data.borrow());
}
```

### Best Practice 2: Use try_borrow

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(5);

    let _borrow = data.borrow_mut();

    // Safe check
    if let Ok(b) = data.try_borrow() {
        println!("Borrowed: {}", b);
    } else {
        println!("Cannot borrow now");
    }
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Basic RefCell

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(10);

    // TODO: Borrow và in giá trị
    // TODO: Borrow mutable và tăng giá trị lên 5
    // TODO: In giá trị mới
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(10);

    println!("Original: {}", data.borrow());

    *data.borrow_mut() += 5;

    println!("New: {}", data.borrow()); // 15
}
```
</details>

### Bài 2: `Rc<RefCell<T>>`

```rust
use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let data = Rc::new(RefCell::new(vec![1, 2, 3]));

    // TODO: Clone Rc 2 lần
    // TODO: Dùng một clone để push 4
    // TODO: Dùng clone khác để push 5
    // TODO: In vector từ original
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let data = Rc::new(RefCell::new(vec![1, 2, 3]));

    let clone1 = Rc::clone(&data);
    let clone2 = Rc::clone(&data);

    clone1.borrow_mut().push(4);
    clone2.borrow_mut().push(5);

    println!("{:?}", data.borrow()); // [1, 2, 3, 4, 5]
}
```
</details>

### Bài 3: Statistics Tracker

```rust
use std::cell::RefCell;

struct Stats {
    total: RefCell<i32>,
    count: RefCell<i32>,
}

impl Stats {
    fn new() -> Self {
        // TODO: Implement
    }

    fn add(&self, value: i32) {
        // TODO: Update total and count
    }

    fn average(&self) -> f64 {
        // TODO: Calculate average
    }
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::cell::RefCell;

struct Stats {
    total: RefCell<i32>,
    count: RefCell<i32>,
}

impl Stats {
    fn new() -> Self {
        Stats {
            total: RefCell::new(0),
            count: RefCell::new(0),
        }
    }

    fn add(&self, value: i32) {
        *self.total.borrow_mut() += value;
        *self.count.borrow_mut() += 1;
    }

    fn average(&self) -> f64 {
        let total = *self.total.borrow() as f64;
        let count = *self.count.borrow() as f64;
        total / count
    }
}

fn main() {
    let stats = Stats::new();

    stats.add(10);
    stats.add(20);
    stats.add(30);

    println!("Average: {}", stats.average()); // 20.0
}
```
</details>

## 🎯 Tóm Tắt

| Method | Mô Tả | Return |
|--------|-------|--------|
| **`.borrow()`** | Immutable borrow | `Ref<T>` |
| **`.borrow_mut()`** | Mutable borrow | `RefMut<T>` |
| **`.try_borrow()`** | Safe immutable borrow | `Result<Ref<T>>` |
| **`.try_borrow_mut()`** | Safe mutable borrow | `Result<RefMut<T>>` |
| **`.into_inner()`** | Consume và lấy value | `T` |

**Quy tắc vàng**:
- ✅ RefCell cho interior mutability
- ✅ Runtime borrow checking (có thể panic!)
- ✅ Single-threaded only
- ✅ Kết hợp với `Rc<RefCell<T>>` cho shared mutable state
- ✅ Drop borrows sớm để tránh conflicts
- ✅ Dùng try_borrow* để safe check

## 🔗 Liên Kết Hữu Ích

- [std::cell::RefCell](https://doc.rust-lang.org/std/cell/struct.RefCell.html)
- [Interior Mutability](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)

---

**Bài tiếp theo**: [Threads: Concurrency →](./threads.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Threads** và multi-threading trong Rust!
