---
sidebar_position: 18
title: "HashMap: Từ Điển Key-Value"
description: "Tìm hiểu cách sử dụng HashMap để lưu trữ dữ liệu dạng key-value"
---

# 🗺️ HashMap: Từ Điển Key-Value

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được HashMap là gì và khi nào dùng
- ✅ Tạo và sử dụng HashMap
- ✅ Insert, get, remove các entries
- ✅ Iterate qua HashMap
- ✅ Update values hiệu quả
- ✅ Áp dụng HashMap trong code thực tế

## 🤔 HashMap Là Gì?

### Ẩn Dụ Cuộc Sống: Từ Điển

**HashMap** giống như **từ điển**:

📖 **Từ Điển**:
- **Từ** (key) → **Nghĩa** (value)
- Tra cứu nhanh theo từ
- Mỗi từ chỉ có một nghĩa (trong context này)

🗺️ **HashMap Trong Rust**:
- **Key** → **Value**
- Lookup O(1) (trung bình)
- Mỗi key unique

### Ví Dụ Cơ Bản

```rust
use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    let team = String::from("Blue");
    let score = scores.get(&team);

    match score {
        Some(&s) => println!("Score: {}", s),
        None => println!("Team not found"),
    }
}
```

**Đầu ra**:
```
Score: 10
```

## 📦 Tạo HashMap

### `new()` Method

```rust
use std::collections::HashMap;

fn main() {
    let mut map: HashMap<String, i32> = HashMap::new();

    map.insert(String::from("key1"), 10);
    map.insert(String::from("key2"), 20);

    println!("{:?}", map);
}
```

### Từ Vectors

```rust
use std::collections::HashMap;

fn main() {
    let teams = vec![String::from("Blue"), String::from("Yellow")];
    let scores = vec![10, 50];

    let map: HashMap<_, _> = teams.iter()
        .zip(scores.iter())
        .map(|(k, v)| (k.clone(), *v))
        .collect();

    println!("{:?}", map);
}
```

### Với Capacity

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::with_capacity(10);

    map.insert("key", "value");

    println!("Capacity: {}", map.capacity());
}
```

## 🔧 Basic Operations

### Insert

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();

    map.insert("name", "Alice");
    map.insert("age", "30");

    println!("{:?}", map);
}
```

### Get

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("name", "Alice");

    // Option<&V>
    match map.get("name") {
        Some(value) => println!("Name: {}", value),
        None => println!("Not found"),
    }

    // With unwrap_or
    let age = map.get("age").unwrap_or(&"unknown");
    println!("Age: {}", age);
}
```

### Remove

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("key1", 10);
    map.insert("key2", 20);

    println!("Before: {:?}", map);

    let removed = map.remove("key1");
    println!("Removed: {:?}", removed);
    println!("After: {:?}", map);
}
```

**Đầu ra**:
```
Before: {"key1": 10, "key2": 20}
Removed: Some(10)
After: {"key2": 20}
```

### Contains Key

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("key", "value");

    if map.contains_key("key") {
        println!("Key exists!");
    }

    if !map.contains_key("other") {
        println!("Other key doesn't exist");
    }
}
```

## 🔄 Updating Values

### Overwrite

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();

    map.insert("key", 10);
    println!("First: {:?}", map);

    map.insert("key", 20);  // Overwrite
    println!("After: {:?}", map);
}
```

### Insert If Not Exists - `entry()`

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();

    map.entry("key").or_insert(10);
    map.entry("key").or_insert(20);  // Không overwrite

    println!("{:?}", map);  // {"key": 10}
}
```

### Update Based on Old Value

```rust
use std::collections::HashMap;

fn main() {
    let text = "hello world wonderful world";
    let mut word_count = HashMap::new();

    for word in text.split_whitespace() {
        let count = word_count.entry(word).or_insert(0);
        *count += 1;
    }

    println!("{:?}", word_count);
}
```

**Đầu ra**:
```
{"hello": 1, "world": 2, "wonderful": 1}
```

## 🔁 Iteration

### Iterate Over Keys and Values

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("a", 1);
    map.insert("b", 2);
    map.insert("c", 3);

    for (key, value) in &map {
        println!("{}: {}", key, value);
    }
}
```

### Iterate Over Keys Only

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("a", 1);
    map.insert("b", 2);

    for key in map.keys() {
        println!("Key: {}", key);
    }
}
```

### Iterate Over Values Only

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("a", 1);
    map.insert("b", 2);

    for value in map.values() {
        println!("Value: {}", value);
    }
}
```

### Mutable Iteration

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("a", 1);
    map.insert("b", 2);

    // Nhân đôi tất cả values
    for value in map.values_mut() {
        *value *= 2;
    }

    println!("{:?}", map);
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: User Database

```rust
use std::collections::HashMap;

struct User {
    name: String,
    email: String,
}

fn main() {
    let mut users = HashMap::new();

    users.insert(1, User {
        name: String::from("Alice"),
        email: String::from("alice@example.com"),
    });

    users.insert(2, User {
        name: String::from("Bob"),
        email: String::from("bob@example.com"),
    });

    // Tìm user
    if let Some(user) = users.get(&1) {
        println!("User 1: {} ({})", user.name, user.email);
    }

    // Iterate
    for (id, user) in &users {
        println!("{}: {}", id, user.name);
    }
}
```

### Ví Dụ 2: Word Frequency

```rust
use std::collections::HashMap;

fn word_frequency(text: &str) -> HashMap<String, usize> {
    let mut freq = HashMap::new();

    for word in text.split_whitespace() {
        let word = word.to_lowercase();
        *freq.entry(word).or_insert(0) += 1;
    }

    freq
}

fn main() {
    let text = "Hello world Hello Rust world";
    let freq = word_frequency(text);

    for (word, count) in &freq {
        println!("{}: {}", word, count);
    }
}
```

**Đầu ra**:
```
hello: 2
world: 2
rust: 1
```

### Ví Dụ 3: Cache

```rust
use std::collections::HashMap;

struct Cache {
    store: HashMap<String, String>,
}

impl Cache {
    fn new() -> Self {
        Cache {
            store: HashMap::new(),
        }
    }

    fn get(&self, key: &str) -> Option<&String> {
        self.store.get(key)
    }

    fn set(&mut self, key: String, value: String) {
        self.store.insert(key, value);
    }

    fn clear(&mut self) {
        self.store.clear();
    }

    fn size(&self) -> usize {
        self.store.len()
    }
}

fn main() {
    let mut cache = Cache::new();

    cache.set(String::from("user:1"), String::from("Alice"));
    cache.set(String::from("user:2"), String::from("Bob"));

    if let Some(name) = cache.get("user:1") {
        println!("Found: {}", name);
    }

    println!("Cache size: {}", cache.size());

    cache.clear();
    println!("After clear: {}", cache.size());
}
```

### Ví Dụ 4: Configuration

```rust
use std::collections::HashMap;

fn load_config() -> HashMap<String, String> {
    let mut config = HashMap::new();

    config.insert(String::from("host"), String::from("localhost"));
    config.insert(String::from("port"), String::from("8080"));
    config.insert(String::from("debug"), String::from("true"));

    config
}

fn main() {
    let config = load_config();

    let host = config.get("host").unwrap_or(&String::from("0.0.0.0"));
    let port = config.get("port").unwrap_or(&String::from("3000"));

    println!("Server: {}:{}", host, port);

    if let Some(debug) = config.get("debug") {
        if debug == "true" {
            println!("Debug mode enabled");
        }
    }
}
```

### Ví Dụ 5: Student Grades

```rust
use std::collections::HashMap;

fn main() {
    let mut grades: HashMap<String, Vec<f64>> = HashMap::new();

    // Thêm điểm
    grades.entry(String::from("Alice")).or_insert(Vec::new()).push(8.5);
    grades.entry(String::from("Alice")).or_insert(Vec::new()).push(9.0);
    grades.entry(String::from("Bob")).or_insert(Vec::new()).push(7.5);
    grades.entry(String::from("Bob")).or_insert(Vec::new()).push(8.0);

    // Tính trung bình
    for (student, scores) in &grades {
        let average: f64 = scores.iter().sum::<f64>() / scores.len() as f64;
        println!("{}: {:.2}", student, average);
    }
}
```

**Đầu ra**:
```
Alice: 8.75
Bob: 7.75
```

## 💻 Bài Tập Thực Hành

### Bài 1: Phone Book

```rust
use std::collections::HashMap;

fn main() {
    let mut phone_book = HashMap::new();

    // TODO: Add contacts
    // phone_book.insert(...)

    // TODO: Lookup a contact
    // if let Some(number) = phone_book.get(...) { }
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::collections::HashMap;

fn main() {
    let mut phone_book = HashMap::new();

    phone_book.insert("Alice", "123-456-7890");
    phone_book.insert("Bob", "987-654-3210");

    if let Some(number) = phone_book.get("Alice") {
        println!("Alice's number: {}", number);
    }
}
```
</details>

### Bài 2: Count Characters

```rust
use std::collections::HashMap;

fn count_chars(s: &str) -> HashMap<char, usize> {
    // TODO: Count frequency of each character
}

fn main() {
    let text = "hello";
    let freq = count_chars(text);
    println!("{:?}", freq);
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn count_chars(s: &str) -> HashMap<char, usize> {
    let mut freq = HashMap::new();

    for ch in s.chars() {
        *freq.entry(ch).or_insert(0) += 1;
    }

    freq
}
```
</details>

## 🎯 Tóm Tắt

| Method | Mô Tả | Return |
|--------|-------|--------|
| **`new()`** | Tạo HashMap mới | `HashMap<K, V>` |
| **`insert(k, v)`** | Thêm/cập nhật | `Option<V>` (old value) |
| **`get(&k)`** | Lấy value | `Option<&V>` |
| **`remove(&k)`** | Xóa entry | `Option<V>` |
| **`contains_key(&k)`** | Kiểm tra tồn tại | `bool` |
| **`entry(k)`** | Entry API | `Entry<K, V>` |
| **`keys()`** | Iterator keys | `Keys<K, V>` |
| **`values()`** | Iterator values | `Values<K, V>` |
| **`len()`** | Số lượng entries | `usize` |
| **`clear()`** | Xóa tất cả | `()` |

**Quy tắc vàng**:
- ✅ HashMap cho key-value lookups
- ✅ Keys phải implement `Eq + Hash`
- ✅ Dùng `entry()` API cho updates
- ✅ `get()` returns `Option<&V>`
- ✅ Order không được đảm bảo

## 🔗 Liên Kết Hữu Ích

- [Rust Book - HashMap](https://doc.rust-lang.org/book/ch08-03-hash-maps.html)
- [std::collections::HashMap](https://doc.rust-lang.org/std/collections/struct.HashMap.html)

---

**Bài tiếp theo**: [HashSet →](./hashset.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **HashSet** - tập hợp các giá trị unique!
