---
sidebar_position: 3
title: 📦 Cấu Trúc Dữ Liệu
description: Từ điển các cấu trúc dữ liệu trong Rust - Vector, HashMap, Box, Rc, Arc và nhiều hơn
keywords: [rust, data structures, vector, hashmap, hashset, array, slice, string, box, rc, arc, refcell]
---

# 📦 Cấu Trúc Dữ Liệu

Từ điển các cấu trúc dữ liệu (data structures) trong Rust với giải thích dễ hiểu và ví dụ thực tế!

:::tip Tại Sao Quan Trọng?
Chọn đúng cấu trúc dữ liệu = Code nhanh hơn, dễ đọc hơn, ít bug hơn! 🚀
:::

---

## Collections - Bộ Sưu Tập

### Array
**Việt**: Mảng cố định

**ELI5**: Như hộp trứng 10 quả - đúng 10 ô, không thêm không bớt! 🥚

**Đặc điểm**:
- ✅ Kích thước cố định
- ✅ Stack allocated (nhanh)
- ✅ Truy cập O(1)
- ❌ Không thể thay đổi size

```rust
fn main() {
    // Khai báo: [type; size]
    let numbers: [i32; 5] = [1, 2, 3, 4, 5];

    // Khởi tạo giá trị giống nhau
    let zeros = [0; 100];  // 100 số 0

    // Truy cập
    println!("Phần tử đầu: {}", numbers[0]);
    println!("Độ dài: {}", numbers.len());

    // Lặp qua array
    for num in numbers.iter() {
        println!("{}", num);
    }
}
```

**Khi nào dùng**:
- ✅ Biết trước số lượng phần tử
- ✅ Cần performance cao
- ✅ Dữ liệu nhỏ, đơn giản

---

### Vector (`Vec<T>`)
**Việt**: Mảng động

**ELI5**: Như chiếc ba lô ma thuật - bỏ thêm đồ vào được, lấy ra được! 🎒✨

**Đặc điểm**:
- ✅ Kích thước linh hoạt
- ✅ Heap allocated
- ✅ Có thể thêm/xóa phần tử
- ✅ Truy cập O(1)

```rust
fn main() {
    // Cách tạo Vec
    let mut v1: Vec<i32> = Vec::new();
    let mut v2 = vec![1, 2, 3];

    // Thêm phần tử
    v1.push(10);
    v1.push(20);
    v1.push(30);

    // Xóa phần tử cuối
    let last = v1.pop();  // Some(30)

    // Truy cập
    let first = v1[0];           // Panic nếu out of bounds
    let second = v1.get(1);      // Option<&i32> - an toàn hơn

    // Lặp
    for num in &v1 {
        println!("{}", num);
    }

    // Lặp và modify
    for num in &mut v1 {
        *num *= 2;
    }
}
```

**Methods hữu ích**:
```rust
let mut v = vec![1, 2, 3];

v.len()             // Độ dài: 3
v.is_empty()        // false
v.contains(&2)      // true
v.insert(0, 0)      // Chèn 0 vào đầu
v.remove(1)         // Xóa phần tử index 1
v.clear()           // Xóa tất cả
```

**Khi nào dùng**:
- ✅ Không biết trước số lượng
- ✅ Cần thêm/xóa động
- ✅ List, stack, queue

---

### Slice (`&[T]`)
**Việt**: Lát cắt / View của array/vector

**ELI5**: Như xem 1 phần của bộ phim, không phải cả phim! 🎬👀

**Đặc điểm**:
- ✅ Reference đến một phần của array/vec
- ✅ Không own data
- ✅ Kích thước biết lúc runtime

```rust
fn main() {
    let arr = [1, 2, 3, 4, 5];

    // Tạo slices
    let slice1 = &arr[1..4];   // [2, 3, 4]
    let slice2 = &arr[..3];    // [1, 2, 3]
    let slice3 = &arr[2..];    // [3, 4, 5]
    let slice4 = &arr[..];     // [1, 2, 3, 4, 5]

    print_slice(slice1);
}

fn print_slice(s: &[i32]) {
    for item in s {
        println!("{}", item);
    }
}
```

---

### HashMap (`HashMap<K, V>`)
**Việt**: Bảng băm / Từ điển

**ELI5**: Như danh bạ điện thoại - tra tên ra số điện thoại! 📱

**Đặc điểm**:
- ✅ Key-value pairs
- ✅ Truy cập nhanh O(1) trung bình
- ✅ Key phải implement `Hash` và `Eq`
- ❌ Không có thứ tự

```rust
use std::collections::HashMap;

fn main() {
    // Tạo HashMap
    let mut scores = HashMap::new();

    // Thêm data
    scores.insert("Alice", 100);
    scores.insert("Bob", 80);
    scores.insert("Charlie", 95);

    // Truy cập
    match scores.get("Alice") {
        Some(&score) => println!("Alice: {}", score),
        None => println!("Không tìm thấy"),
    }

    // Hoặc dùng entry API
    scores.entry("David").or_insert(70);

    // Update giá trị
    let score = scores.entry("Alice").or_insert(0);
    *score += 10;  // Alice giờ có 110

    // Lặp qua HashMap
    for (name, score) in &scores {
        println!("{}: {}", name, score);
    }

    // Xóa
    scores.remove("Bob");
}
```

**Methods hữu ích**:
```rust
let mut map = HashMap::new();

map.insert(key, value)         // Thêm/cập nhật
map.get(&key)                  // Lấy giá trị: Option<&V>
map.contains_key(&key)         // Kiểm tra tồn tại
map.remove(&key)               // Xóa
map.len()                      // Số lượng entries
map.is_empty()                 // Kiểm tra rỗng

// Entry API - powerful!
map.entry(key).or_insert(default)
map.entry(key).and_modify(|v| *v += 1)
```

**Khi nào dùng**:
- ✅ Cần tra cứu nhanh bằng key
- ✅ Không quan tâm thứ tự
- ✅ Cache, database in-memory

---

### HashSet (`HashSet<T>`)
**Việt**: Tập hợp / Set

**ELI5**: Như danh sách khách mời - mỗi người chỉ có tên 1 lần! 📝

**Đặc điểm**:
- ✅ Không có duplicate
- ✅ Kiểm tra tồn tại O(1)
- ✅ T phải implement `Hash` và `Eq`
- ❌ Không có thứ tự

```rust
use std::collections::HashSet;

fn main() {
    let mut set = HashSet::new();

    // Thêm phần tử
    set.insert(1);
    set.insert(2);
    set.insert(2);  // Không thêm được (duplicate)

    println!("Số phần tử: {}", set.len());  // 2

    // Kiểm tra tồn tại
    if set.contains(&1) {
        println!("Có số 1");
    }

    // Set operations
    let set1: HashSet<_> = [1, 2, 3].iter().collect();
    let set2: HashSet<_> = [2, 3, 4].iter().collect();

    let union: HashSet<_> = set1.union(&set2).collect();
    let intersection: HashSet<_> = set1.intersection(&set2).collect();
    let difference: HashSet<_> = set1.difference(&set2).collect();
}
```

**Khi nào dùng**:
- ✅ Cần unique values
- ✅ Kiểm tra membership nhanh
- ✅ Set operations (union, intersection)

---

### VecDeque
**Việt**: Double-ended queue

**ELI5**: Như hàng đợi có thể vào ra cả 2 đầu! ↔️

**Đặc điểm**:
- ✅ Thêm/xóa đầu và cuối O(1)
- ✅ Truy cập index O(1)
- ✅ Tốt cho queue và deque

```rust
use std::collections::VecDeque;

fn main() {
    let mut deque = VecDeque::new();

    // Thêm vào cuối
    deque.push_back(1);
    deque.push_back(2);

    // Thêm vào đầu
    deque.push_front(0);

    // [0, 1, 2]

    let first = deque.pop_front();  // Some(0)
    let last = deque.pop_back();    // Some(2)
}
```

---

## String Types - Các Loại String

### String
**Việt**: Chuỗi động

**ELI5**: Như văn bản trên Word - có thể sửa, thêm, xóa! 📝

**Đặc điểm**:
- ✅ Owned, heap allocated
- ✅ Có thể thay đổi
- ✅ UTF-8 encoded
- ✅ Grow/shrink động

```rust
fn main() {
    // Tạo String
    let mut s = String::new();
    let s1 = String::from("Hello");
    let s2 = "World".to_string();

    // Thêm text
    s.push_str("Hello");
    s.push(' ');
    s.push_str("World");

    // Concatenation
    let s3 = s1 + " " + &s2;  // s1 moved!

    // Format macro
    let s4 = format!("{} {}", "Hello", "World");

    // Methods
    println!("Độ dài: {}", s.len());
    println!("Rỗng? {}", s.is_empty());
    println!("Chứa 'ell'? {}", s.contains("ell"));
}
```

---

### `&str` (String Slice)
**Việt**: Slice chuỗi / String immutable

**ELI5**: Như đọc text trong PDF - chỉ xem, không sửa! 👀

**Đặc điểm**:
- ✅ Reference, không own
- ✅ Immutable
- ✅ UTF-8 encoded
- ✅ Có thể trỏ đến String hoặc literal

```rust
fn main() {
    // String literal là &str
    let s1: &str = "Hello";

    // Slice từ String
    let s2 = String::from("Hello, World!");
    let slice = &s2[0..5];  // "Hello"

    print_str(s1);
    print_str(&s2);  // String coerce thành &str
}

fn print_str(s: &str) {
    println!("{}", s);
}
```

**String vs &str**:
| String | &str |
|--------|------|
| Owned | Borrowed |
| Mutable | Immutable |
| Heap | Stack hoặc data segment |
| `String::from()` | `"literal"` |

---

## Smart Pointers - Con Trỏ Thông Minh

### Box (`Box<T>`)
**Việt**: Hộp thông minh

**ELI5**: Như cất đồ vào kho thay vì để trong phòng - tiết kiệm không gian! 📦🏠

**Đặc điểm**:
- ✅ Lưu data trên heap
- ✅ Owned pointer
- ✅ Kích thước cố định (pointer)
- ✅ Single ownership

```rust
fn main() {
    // Box đơn giản
    let b = Box::new(5);
    println!("b = {}", b);

    // Recursive type - phải dùng Box!
    enum List {
        Cons(i32, Box<List>),
        Nil,
    }

    use List::{Cons, Nil};

    let list = Cons(1,
        Box::new(Cons(2,
            Box::new(Cons(3,
                Box::new(Nil))))));
}
```

**Khi nào dùng**:
- ✅ Data lớn, không muốn copy
- ✅ Recursive types
- ✅ Trait objects: `Box<dyn Trait>`

---

### Rc (`Rc<T>`)
**Việt**: Reference Counted

**ELI5**: Như văn phòng dùng chung - nhiều người cùng dùng, người cuối ra tắt đèn! 💡👥

**Đặc điểm**:
- ✅ Multiple ownership
- ✅ Reference counting
- ✅ Single-threaded only
- ❌ Immutable (cần `RefCell` để mutate)

```rust
use std::rc::Rc;

fn main() {
    let data = Rc::new(vec![1, 2, 3]);

    let a = Rc::clone(&data);
    let b = Rc::clone(&data);

    println!("Reference count: {}", Rc::strong_count(&data)); // 3

    // Tất cả đều trỏ đến cùng data
    println!("{:?}", a);
    println!("{:?}", b);
}
```

---

### Arc (`Arc<T>`)
**Việt**: Atomic Reference Counted

**ELI5**: Như Rc nhưng thread-safe - nhiều thread cùng dùng an toàn! 🔒

**Đặc điểm**:
- ✅ Multiple ownership
- ✅ Thread-safe
- ✅ Atomic reference counting
- 🐌 Chậm hơn Rc một chút

```rust
use std::sync::Arc;
use std::thread;

fn main() {
    let data = Arc::new(vec![1, 2, 3]);

    let handles: Vec<_> = (0..3)
        .map(|_| {
            let data = Arc::clone(&data);
            thread::spawn(move || {
                println!("{:?}", data);
            })
        })
        .collect();

    for handle in handles {
        handle.join().unwrap();
    }
}
```

---

### RefCell (`RefCell<T>`)
**Việt**: Interior Mutability

**ELI5**: Như két sắt - từ ngoài nhìn immutable nhưng bên trong có thể thay đổi! 🔐

**Đặc điểm**:
- ✅ Interior mutability
- ✅ Borrow checking lúc runtime
- ❌ Single-threaded only
- ⚠️ Panic nếu vi phạm borrow rules

```rust
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(5);

    // Borrow immutable
    {
        let r1 = data.borrow();
        let r2 = data.borrow();
        println!("{}, {}", r1, r2);
    }

    // Borrow mutable
    {
        let mut r = data.borrow_mut();
        *r += 1;
    }

    println!("{}", data.borrow());  // 6
}
```

**Kết hợp Rc + RefCell**:
```rust
use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let data = Rc::new(RefCell::new(5));

    let a = Rc::clone(&data);
    let b = Rc::clone(&data);

    // Cả 2 đều có thể modify!
    *a.borrow_mut() += 1;
    *b.borrow_mut() += 1;

    println!("{}", data.borrow());  // 7
}
```

---

### Mutex (`Mutex<T>`)
**Việt**: Khóa mutual exclusion

**ELI5**: Như phòng vệ sinh - có người đang dùng thì người khác phải đợi! 🚪🔒

**Đặc điểm**:
- ✅ Thread-safe interior mutability
- ✅ Chỉ 1 thread truy cập tại 1 thời điểm
- ✅ Thường dùng với Arc

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());  // 10
}
```

---

## Tuple
**Việt**: Bộ / Tuple

**ELI5**: Như combo đồ ăn - gồm nhiều món khác nhau đóng gói! 🍔🍟🥤

**Đặc điểm**:
- ✅ Cố định số lượng phần tử
- ✅ Mỗi phần tử có type riêng
- ✅ Truy cập bằng index: `.0`, `.1`

```rust
fn main() {
    // Tuple
    let person: (&str, i32, bool) = ("Alice", 25, true);

    // Truy cập
    let name = person.0;
    let age = person.1;
    let is_student = person.2;

    // Destructuring
    let (n, a, s) = person;
    println!("{} is {} years old", n, a);

    // Function return multiple values
    let (min, max) = find_min_max(&[1, 5, 2, 8, 3]);
}

fn find_min_max(arr: &[i32]) -> (i32, i32) {
    let min = *arr.iter().min().unwrap();
    let max = *arr.iter().max().unwrap();
    (min, max)
}
```

---

## Struct
**Việt**: Cấu trúc

**ELI5**: Như tờ khai thông tin - có các trường cụ thể (tên, tuổi, địa chỉ)! 📋

**Đặc điểm**:
- ✅ Named fields
- ✅ Tự định nghĩa type
- ✅ Có thể có methods

```rust
// Regular struct
struct User {
    name: String,
    age: u32,
    email: String,
}

// Tuple struct
struct Color(u8, u8, u8);

// Unit struct
struct AlwaysTrue;

fn main() {
    // Tạo instance
    let user = User {
        name: String::from("Alice"),
        age: 25,
        email: String::from("alice@example.com"),
    };

    // Truy cập fields
    println!("Name: {}", user.name);

    // Tuple struct
    let black = Color(0, 0, 0);
    println!("RGB: {}, {}, {}", black.0, black.1, black.2);
}
```

---

## Enum
**Việt**: Kiểu liệt kê

**ELI5**: Như menu nhà hàng - chỉ chọn được 1 trong các món có sẵn! 📜

**Đặc điểm**:
- ✅ Multiple variants
- ✅ Mỗi variant có thể mang data
- ✅ Pattern matching

```rust
// Simple enum
enum Direction {
    North,
    South,
    East,
    West,
}

// Enum with data
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}

fn main() {
    let msg = Message::Write(String::from("Hello"));

    match msg {
        Message::Quit => println!("Quit"),
        Message::Move { x, y } => println!("Move to ({}, {})", x, y),
        Message::Write(text) => println!("Text: {}", text),
        Message::ChangeColor(r, g, b) => {
            println!("RGB: {}, {}, {}", r, g, b);
        }
    }
}
```

---

## Option và Result

### Option (`Option<T>`)
**Việt**: Có thể có hoặc không có giá trị

**ELI5**: Như hộp quà - có thể có quà bên trong, hoặc rỗng! 🎁

```rust
fn main() {
    let some_number: Option<i32> = Some(5);
    let no_number: Option<i32> = None;

    // Pattern matching
    match some_number {
        Some(n) => println!("Có: {}", n),
        None => println!("Không có"),
    }

    // Unwrap (unsafe!)
    let x = some_number.unwrap();

    // Unwrap với default
    let y = no_number.unwrap_or(0);

    // Methods
    if let Some(n) = some_number {
        println!("{}", n);
    }
}
```

---

### Result (`Result<T, E>`)
**Việt**: Kết quả thành công hoặc lỗi

**ELI5**: Như thi đỗ/rớt - hoặc đậu với điểm số, hoặc rớt với lý do! 📝✅❌

```rust
use std::fs::File;
use std::io::Error;

fn main() {
    let file_result = File::open("hello.txt");

    match file_result {
        Ok(file) => println!("File opened!"),
        Err(error) => println!("Error: {:?}", error),
    }

    // Unwrap
    let file = File::open("hello.txt").unwrap();

    // Expect với message
    let file = File::open("hello.txt")
        .expect("Failed to open file");

    // Operator ?
    let file = File::open("hello.txt")?;  // Early return nếu Err
}
```

---

## 📊 Bảng Chọn Data Structure

| Cần gì? | Dùng gì? |
|---------|----------|
| List thêm/xóa cuối | `Vec<T>` |
| List thêm/xóa đầu/cuối | `VecDeque<T>` |
| Tra cứu key-value | `HashMap<K, V>` |
| Set không duplicate | `HashSet<T>` |
| String có thể sửa | `String` |
| String không sửa | `&str` |
| Heap allocation | `Box<T>` |
| Multiple owners (single thread) | `Rc<T>` |
| Multiple owners (multi thread) | `Arc<T>` |
| Interior mutability (single thread) | `RefCell<T>` |
| Interior mutability (multi thread) | `Mutex<T>` |
| Có thể không có giá trị | `Option<T>` |
| Thành công hoặc lỗi | `Result<T, E>` |

---

## 🎯 Tips Chọn Data Structure

:::tip Quy Tắc Vàng
1. **Mặc định dùng Vec** - Đơn giản, nhanh, phổ biến
2. **Cần tra cứu nhanh?** → HashMap/HashSet
3. **Cần share ownership?** → Rc/Arc + RefCell/Mutex
4. **Recursive type?** → Box
5. **Có thể None?** → Option
6. **Có thể Error?** → Result
:::

---

**Tiếp theo**: Tìm hiểu [Rust Ecosystem](./rust-ecosystem) 🦀
