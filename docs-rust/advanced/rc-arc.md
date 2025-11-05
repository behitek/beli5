---
sidebar_position: 23
title: "Rc và Arc: Chia Sẻ Ownership"
description: "Tìm hiểu cách chia sẻ ownership với reference counting"
---

# 🔗 Rc và Arc: Chia Sẻ Ownership

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu reference counting
- ✅ Sử dụng `Rc<T>` cho single-threaded
- ✅ Sử dụng `Arc<T>` cho multi-threaded
- ✅ Hiểu `Weak<T>` references
- ✅ Tránh memory leaks với cycles
- ✅ So sánh Rc vs Arc vs Box

## 🤔 Rc và Arc Là Gì?

### Ẩn Dụ Cuộc Sống: Tài Liệu Chia Sẻ

**Rc/Arc** giống như **tài liệu photocopy**:

📄 **Box (Ownership Duy Nhất)**:
- **Chỉ 1 người** giữ tài liệu gốc
- Khi người đó đi, tài liệu mất

🔗 **Rc/Arc (Shared Ownership)**:
- **Nhiều người** cùng giữ copy
- Đếm số người đang giữ
- Khi không ai giữ nữa → hủy tài liệu

🦀 **Trong Rust**:
- **Rc** = Reference Counted (single-thread)
- **Arc** = Atomic Reference Counted (thread-safe)
- Tự động cleanup khi count = 0

### Ví Dụ Cơ Bản - Rc

```rust
use std::rc::Rc;

fn main() {
    let a = Rc::new(5);

    println!("count after creating a = {}", Rc::strong_count(&a)); // 1

    let b = Rc::clone(&a);  // Tăng count
    println!("count after creating b = {}", Rc::strong_count(&a)); // 2

    {
        let c = Rc::clone(&a);  // Tăng count
        println!("count after creating c = {}", Rc::strong_count(&a)); // 3
    }
    // c out of scope, giảm count

    println!("count after c goes out of scope = {}", Rc::strong_count(&a)); // 2
}
```

## 📊 Rc - Reference Counted

### Tạo Rc

```rust
use std::rc::Rc;

fn main() {
    let rc1 = Rc::new(42);
    let rc2 = Rc::new(String::from("hello"));
    let rc3 = Rc::new(vec![1, 2, 3]);

    println!("{}, {}, {:?}", rc1, rc2, rc3);
}
```

### Clone Rc (Tăng Reference Count)

```rust
use std::rc::Rc;

fn main() {
    let original = Rc::new(String::from("Rust"));

    // Clone pointer, KHÔNG clone data
    let clone1 = Rc::clone(&original);
    let clone2 = Rc::clone(&original);

    println!("Count: {}", Rc::strong_count(&original)); // 3

    println!("{}, {}, {}", original, clone1, clone2);
}
```

**Lưu ý**: `Rc::clone()` chỉ clone pointer (cheap), không clone data!

### Shared Ownership Example

```rust
use std::rc::Rc;

#[derive(Debug)]
struct Node {
    value: i32,
    next: Option<Rc<Node>>,
}

fn main() {
    let node3 = Rc::new(Node { value: 3, next: None });
    let node2 = Rc::new(Node { value: 2, next: Some(Rc::clone(&node3)) });
    let node1 = Rc::new(Node { value: 1, next: Some(Rc::clone(&node2)) });

    // node3 có 2 owners: node2 và thằng clone ở trên
    println!("node3 strong count: {}", Rc::strong_count(&node3)); // 2
}
```

### Graph Structure với Rc

```rust
use std::rc::Rc;

#[derive(Debug)]
struct Node {
    id: i32,
    neighbors: Vec<Rc<Node>>,
}

fn main() {
    let node1 = Rc::new(Node { id: 1, neighbors: vec![] });
    let node2 = Rc::new(Node { id: 2, neighbors: vec![Rc::clone(&node1)] });
    let node3 = Rc::new(Node { id: 3, neighbors: vec![Rc::clone(&node1), Rc::clone(&node2)] });

    println!("node1 count: {}", Rc::strong_count(&node1)); // 3
    println!("node2 count: {}", Rc::strong_count(&node2)); // 2
}
```

## ⚡ Arc - Atomic Reference Counted

### Arc cho Multi-Threading

```rust
use std::sync::Arc;
use std::thread;

fn main() {
    let data = Arc::new(vec![1, 2, 3, 4, 5]);

    let mut handles = vec![];

    for i in 0..3 {
        let data_clone = Arc::clone(&data);

        let handle = thread::spawn(move || {
            println!("Thread {}: {:?}", i, data_clone);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final count: {}", Arc::strong_count(&data));
}
```

### Arc với Shared State

```rust
use std::sync::Arc;
use std::thread;
use std::time::Duration;

fn main() {
    let numbers = Arc::new(vec![1, 2, 3, 4, 5]);

    let mut handles = vec![];

    for i in 0..3 {
        let numbers = Arc::clone(&numbers);

        let handle = thread::spawn(move || {
            let sum: i32 = numbers.iter().sum();
            println!("Thread {} sum: {}", i, sum);
            thread::sleep(Duration::from_millis(100));
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

### Rc vs Arc

```rust
use std::rc::Rc;
use std::sync::Arc;

fn main() {
    // Rc - Single-threaded only
    let rc = Rc::new(42);
    let rc2 = Rc::clone(&rc);

    // Arc - Thread-safe (có thể dùng trong threads)
    let arc = Arc::new(42);
    let arc2 = Arc::clone(&arc);

    // Cả hai đều immutable!
}
```

| Feature | `Rc<T>` | `Arc<T>` |
|---------|-------|--------|
| **Thread-safe** | ❌ No | ✅ Yes |
| **Performance** | Nhanh hơn | Chậm hơn (atomic ops) |
| **Use case** | Single-threaded | Multi-threaded |
| **Overhead** | Thấp | Cao hơn (atomics) |

## 🔗 Weak References

### Vấn Đề: Reference Cycles

```rust
use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    next: Option<Rc<RefCell<Node>>>,
    prev: Option<Rc<RefCell<Node>>>,  // ❌ Cycle!
}

// Nếu A -> B và B -> A, memory leak!
```

### Giải Pháp: `Weak<T>`

```rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    next: Option<Rc<RefCell<Node>>>,
    prev: Option<Weak<RefCell<Node>>>,  // ✅ Weak reference
}

fn main() {
    let node1 = Rc::new(RefCell::new(Node {
        value: 1,
        next: None,
        prev: None,
    }));

    let node2 = Rc::new(RefCell::new(Node {
        value: 2,
        next: None,
        prev: Some(Rc::downgrade(&node1)),  // Weak reference
    }));

    node1.borrow_mut().next = Some(Rc::clone(&node2));

    println!("No memory leak!");
}
```

### Weak Count Example

```rust
use std::rc::Rc;

fn main() {
    let strong = Rc::new(String::from("hello"));

    println!("Strong count: {}", Rc::strong_count(&strong)); // 1
    println!("Weak count: {}", Rc::weak_count(&strong));     // 0

    let weak1 = Rc::downgrade(&strong);
    let weak2 = Rc::downgrade(&strong);

    println!("Strong count: {}", Rc::strong_count(&strong)); // 1
    println!("Weak count: {}", Rc::weak_count(&strong));     // 2

    // Upgrade weak to strong
    if let Some(upgraded) = weak1.upgrade() {
        println!("Upgraded: {}", upgraded);
        println!("Strong count: {}", Rc::strong_count(&strong)); // 2
    }
}
```

### Weak with Arc

```rust
use std::sync::{Arc, Weak};
use std::thread;

fn main() {
    let strong = Arc::new(42);
    let weak = Arc::downgrade(&strong);

    let handle = thread::spawn(move || {
        // Try to upgrade weak reference
        match weak.upgrade() {
            Some(value) => println!("Got value: {}", value),
            None => println!("Value was dropped"),
        }
    });

    handle.join().unwrap();
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Shared Config

```rust
use std::sync::Arc;
use std::thread;

struct Config {
    api_key: String,
    timeout: u32,
}

fn main() {
    let config = Arc::new(Config {
        api_key: String::from("secret-key"),
        timeout: 30,
    });

    let mut handles = vec![];

    for i in 0..3 {
        let config = Arc::clone(&config);

        let handle = thread::spawn(move || {
            println!("Thread {}: API Key = {}, Timeout = {}",
                     i, config.api_key, config.timeout);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

### Ví Dụ 2: Graph Traversal

```rust
use std::rc::Rc;

#[derive(Debug)]
struct Node {
    id: i32,
    children: Vec<Rc<Node>>,
}

impl Node {
    fn new(id: i32) -> Rc<Self> {
        Rc::new(Node { id, children: vec![] })
    }

    fn add_child(&mut self, child: Rc<Node>) {
        self.children.push(child);
    }
}

fn print_tree(node: &Rc<Node>, depth: usize) {
    let indent = "  ".repeat(depth);
    println!("{}Node {}", indent, node.id);

    for child in &node.children {
        print_tree(child, depth + 1);
    }
}

fn main() {
    let leaf1 = Node::new(3);
    let leaf2 = Node::new(4);

    let mut branch = Rc::new(Node { id: 2, children: vec![] });

    // Need RefCell for mutation - see refcell.md
    println!("Created tree");
}
```

### Ví Dụ 3: Observer Pattern

```rust
use std::rc::Rc;
use std::cell::RefCell;

trait Observer {
    fn update(&self, message: &str);
}

struct ConcreteObserver {
    id: i32,
}

impl Observer for ConcreteObserver {
    fn update(&self, message: &str) {
        println!("Observer {} received: {}", self.id, message);
    }
}

struct Subject {
    observers: Vec<Rc<dyn Observer>>,
}

impl Subject {
    fn new() -> Self {
        Subject { observers: vec![] }
    }

    fn attach(&mut self, observer: Rc<dyn Observer>) {
        self.observers.push(observer);
    }

    fn notify(&self, message: &str) {
        for observer in &self.observers {
            observer.update(message);
        }
    }
}

fn main() {
    let mut subject = Subject::new();

    let observer1 = Rc::new(ConcreteObserver { id: 1 });
    let observer2 = Rc::new(ConcreteObserver { id: 2 });

    subject.attach(Rc::clone(&observer1));
    subject.attach(Rc::clone(&observer2));

    subject.notify("Event occurred!");
}
```

### Ví Dụ 4: Cache System

```rust
use std::sync::Arc;
use std::collections::HashMap;
use std::thread;

struct Cache {
    data: HashMap<String, String>,
}

impl Cache {
    fn new() -> Self {
        let mut data = HashMap::new();
        data.insert("key1".to_string(), "value1".to_string());
        data.insert("key2".to_string(), "value2".to_string());

        Cache { data }
    }

    fn get(&self, key: &str) -> Option<&String> {
        self.data.get(key)
    }
}

fn main() {
    let cache = Arc::new(Cache::new());

    let mut handles = vec![];

    for i in 0..3 {
        let cache = Arc::clone(&cache);

        let handle = thread::spawn(move || {
            if let Some(value) = cache.get("key1") {
                println!("Thread {} got: {}", i, value);
            }
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

### Ví Dụ 5: Linked List với Weak

```rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    next: Option<Rc<RefCell<Node>>>,
    prev: Option<Weak<RefCell<Node>>>,
}

impl Node {
    fn new(value: i32) -> Rc<RefCell<Self>> {
        Rc::new(RefCell::new(Node {
            value,
            next: None,
            prev: None,
        }))
    }
}

fn main() {
    let node1 = Node::new(1);
    let node2 = Node::new(2);
    let node3 = Node::new(3);

    // Forward links (strong)
    node1.borrow_mut().next = Some(Rc::clone(&node2));
    node2.borrow_mut().next = Some(Rc::clone(&node3));

    // Backward links (weak)
    node2.borrow_mut().prev = Some(Rc::downgrade(&node1));
    node3.borrow_mut().prev = Some(Rc::downgrade(&node2));

    println!("Doubly linked list created!");
    println!("node1 strong: {}", Rc::strong_count(&node1)); // 1
    println!("node2 strong: {}", Rc::strong_count(&node2)); // 2
    println!("node2 weak: {}", Rc::weak_count(&node2));     // 1
}
```

## 🆚 Rc vs Arc vs Box

### So Sánh

```rust
use std::rc::Rc;
use std::sync::Arc;

fn main() {
    // Box - Single owner
    let b = Box::new(42);
    // let b2 = b; // Move, b không dùng được

    // Rc - Multiple owners (single-thread)
    let rc = Rc::new(42);
    let rc2 = Rc::clone(&rc);  // Both valid

    // Arc - Multiple owners (multi-thread)
    let arc = Arc::new(42);
    let arc2 = Arc::clone(&arc);  // Thread-safe
}
```

| Feature | `Box<T>` | `Rc<T>` | `Arc<T>` |
|---------|----------|---------|----------|
| **Owners** | 1 | Many | Many |
| **Thread-safe** | N/A | ❌ No | ✅ Yes |
| **Mutability** | Mutable | Immutable* | Immutable* |
| **Overhead** | Minimal | Low | Medium |
| **Use case** | Single owner | Shared (single-thread) | Shared (multi-thread) |

*Cần kết hợp với RefCell/Mutex để mutate

## ⚠️ Tránh Memory Leaks

### Reference Cycle Problem

```rust
use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    next: Option<Rc<RefCell<Node>>>,
}

fn main() {
    let a = Rc::new(RefCell::new(Node { next: None }));
    let b = Rc::new(RefCell::new(Node { next: None }));

    // Create cycle: a -> b -> a
    a.borrow_mut().next = Some(Rc::clone(&b));
    b.borrow_mut().next = Some(Rc::clone(&a));  // ❌ Memory leak!

    println!("a count: {}", Rc::strong_count(&a)); // 2
    println!("b count: {}", Rc::strong_count(&b)); // 2

    // Khi a và b out of scope:
    // - a's count: 2 -> 1 (still 1 from b)
    // - b's count: 2 -> 1 (still 1 from a)
    // NEVER reaches 0! Memory leak!
}
```

### Solution: Use Weak

```rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    next: Option<Rc<RefCell<Node>>>,
    prev: Option<Weak<RefCell<Node>>>,  // ✅ Weak!
}

fn main() {
    let a = Rc::new(RefCell::new(Node { next: None, prev: None }));
    let b = Rc::new(RefCell::new(Node { next: None, prev: None }));

    a.borrow_mut().next = Some(Rc::clone(&b));
    b.borrow_mut().prev = Some(Rc::downgrade(&a));  // ✅ Weak reference

    // No memory leak!
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Basic Rc

```rust
use std::rc::Rc;

fn main() {
    let data = Rc::new(vec![1, 2, 3]);

    // TODO: Tạo 2 clones của data
    // TODO: In strong_count
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::rc::Rc;

fn main() {
    let data = Rc::new(vec![1, 2, 3]);

    let clone1 = Rc::clone(&data);
    let clone2 = Rc::clone(&data);

    println!("Strong count: {}", Rc::strong_count(&data)); // 3
    println!("Data: {:?}", data);
}
```
</details>

### Bài 2: Arc với Threads

```rust
use std::sync::Arc;
use std::thread;

fn main() {
    let numbers = Arc::new(vec![1, 2, 3, 4, 5]);

    // TODO: Spawn 3 threads, mỗi thread print numbers
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::sync::Arc;
use std::thread;

fn main() {
    let numbers = Arc::new(vec![1, 2, 3, 4, 5]);

    let mut handles = vec![];

    for i in 0..3 {
        let numbers = Arc::clone(&numbers);

        let handle = thread::spawn(move || {
            println!("Thread {}: {:?}", i, numbers);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```
</details>

### Bài 3: Weak References

```rust
use std::rc::{Rc, Weak};

fn main() {
    let strong = Rc::new(String::from("hello"));

    // TODO: Tạo weak reference
    // TODO: Upgrade weak thành strong
    // TODO: In counts
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::rc::{Rc, Weak};

fn main() {
    let strong = Rc::new(String::from("hello"));

    let weak = Rc::downgrade(&strong);

    println!("Strong count: {}", Rc::strong_count(&strong)); // 1
    println!("Weak count: {}", Rc::weak_count(&strong));     // 1

    if let Some(upgraded) = weak.upgrade() {
        println!("Upgraded: {}", upgraded);
        println!("Strong count: {}", Rc::strong_count(&strong)); // 2
    }
}
```
</details>

## 🎯 Tóm Tắt

| Smart Pointer | Thread-Safe | Use Case |
|---------------|-------------|----------|
| **`Rc<T>`** | ❌ No | Shared ownership (single-thread) |
| **`Arc<T>`** | ✅ Yes | Shared ownership (multi-thread) |
| **`Weak<T>`** | Depends | Avoid cycles, non-owning reference |

**Quy tắc vàng**:
- ✅ Dùng Rc cho shared ownership trong single thread
- ✅ Dùng Arc cho shared ownership trong multiple threads
- ✅ Dùng Weak để tránh reference cycles
- ✅ Rc::clone() chỉ clone pointer, không clone data
- ✅ Kết hợp với RefCell/Mutex để mutate

## 🔗 Liên Kết Hữu Ích

- [std::rc::Rc](https://doc.rust-lang.org/std/rc/struct.Rc.html)
- [std::sync::Arc](https://doc.rust-lang.org/std/sync/struct.Arc.html)
- [std::rc::Weak](https://doc.rust-lang.org/std/rc/struct.Weak.html)

---

**Bài tiếp theo**: [RefCell: Interior Mutability →](./refcell.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **RefCell** - cách mutate data bên trong immutable references!
