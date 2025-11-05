---
sidebar_position: 19
title: "HashSet: Tập Hợp Duy Nhất"
description: "Tìm hiểu cách sử dụng HashSet để lưu trữ giá trị unique"
---

# 🎯 HashSet: Tập Hợp Duy Nhất

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được HashSet là gì và khi nào dùng
- ✅ Tạo và sử dụng HashSet
- ✅ Insert, remove, contains
- ✅ Set operations: union, intersection, difference
- ✅ So sánh HashSet vs Vec vs HashMap
- ✅ Áp dụng HashSet trong code thực tế

## 🤔 HashSet Là Gì?

### Ẩn Dụ Cuộc Sống: Danh Sách Khách Mời

**HashSet** giống như **danh sách khách mời tiệc cưới**:

📋 **Danh Sách Khách Mời**:
- **Mỗi người chỉ có 1 lần** (không trùng lặp)
- Kiểm tra nhanh: "Người này có được mời không?"
- Thêm/xóa tên dễ dàng
- Không quan tâm thứ tự

🎯 **HashSet Trong Rust**:
- **Mỗi giá trị unique**
- Lookup O(1) (trung bình)
- Insert/Remove O(1)
- Không có order

### Ví Dụ Cơ Bản

```rust
use std::collections::HashSet;

fn main() {
    let mut guests = HashSet::new();

    guests.insert("Alice");
    guests.insert("Bob");
    guests.insert("Alice"); // Trùng - không thêm!

    println!("Total guests: {}", guests.len()); // 2

    if guests.contains("Alice") {
        println!("Alice is invited!");
    }
}
```

**Đầu ra**:
```
Total guests: 2
Alice is invited!
```

## 📦 Tạo HashSet

### `new()` Method

```rust
use std::collections::HashSet;

fn main() {
    let mut set: HashSet<i32> = HashSet::new();

    set.insert(1);
    set.insert(2);
    set.insert(3);

    println!("{:?}", set);
}
```

### Từ Array/Vec

```rust
use std::collections::HashSet;

fn main() {
    let numbers = vec![1, 2, 3, 2, 1, 4];
    let unique: HashSet<_> = numbers.into_iter().collect();

    println!("{:?}", unique); // {1, 2, 3, 4}
}
```

### Với Capacity

```rust
use std::collections::HashSet;

fn main() {
    let mut set = HashSet::with_capacity(10);

    set.insert("value");

    println!("Capacity: {}", set.capacity());
}
```

## 🔧 Basic Operations

### Insert

```rust
use std::collections::HashSet;

fn main() {
    let mut set = HashSet::new();

    // insert returns bool (true nếu giá trị mới)
    let inserted1 = set.insert("apple");
    let inserted2 = set.insert("apple"); // Trùng

    println!("First insert: {}", inserted1);  // true
    println!("Second insert: {}", inserted2); // false

    println!("{:?}", set);
}
```

**Đầu ra**:
```
First insert: true
Second insert: false
{"apple"}
```

### Contains

```rust
use std::collections::HashSet;

fn main() {
    let mut set = HashSet::new();
    set.insert("rust");
    set.insert("python");

    if set.contains("rust") {
        println!("Rust is in the set!");
    }

    if !set.contains("java") {
        println!("Java is NOT in the set");
    }
}
```

### Remove

```rust
use std::collections::HashSet;

fn main() {
    let mut set = HashSet::new();
    set.insert(10);
    set.insert(20);
    set.insert(30);

    println!("Before: {:?}", set);

    let removed = set.remove(&20);
    println!("Removed 20: {}", removed); // true

    let removed2 = set.remove(&99);
    println!("Removed 99: {}", removed2); // false

    println!("After: {:?}", set);
}
```

### Len và Is Empty

```rust
use std::collections::HashSet;

fn main() {
    let mut set = HashSet::new();

    println!("Empty: {}", set.is_empty()); // true

    set.insert(1);
    set.insert(2);

    println!("Length: {}", set.len()); // 2
    println!("Empty: {}", set.is_empty()); // false
}
```

## 🔄 Set Operations

### Union - Hợp

```rust
use std::collections::HashSet;

fn main() {
    let a: HashSet<_> = [1, 2, 3].iter().collect();
    let b: HashSet<_> = [3, 4, 5].iter().collect();

    let union: HashSet<_> = a.union(&b).collect();
    println!("Union: {:?}", union); // {1, 2, 3, 4, 5}
}
```

### Intersection - Giao

```rust
use std::collections::HashSet;

fn main() {
    let a: HashSet<_> = [1, 2, 3, 4].iter().collect();
    let b: HashSet<_> = [3, 4, 5, 6].iter().collect();

    let intersection: HashSet<_> = a.intersection(&b).collect();
    println!("Intersection: {:?}", intersection); // {3, 4}
}
```

### Difference - Hiệu

```rust
use std::collections::HashSet;

fn main() {
    let a: HashSet<_> = [1, 2, 3, 4].iter().collect();
    let b: HashSet<_> = [3, 4, 5, 6].iter().collect();

    // Elements in A but not in B
    let diff: HashSet<_> = a.difference(&b).collect();
    println!("A - B: {:?}", diff); // {1, 2}

    // Elements in B but not in A
    let diff2: HashSet<_> = b.difference(&a).collect();
    println!("B - A: {:?}", diff2); // {5, 6}
}
```

### Symmetric Difference - Hiệu Đối Xứng

```rust
use std::collections::HashSet;

fn main() {
    let a: HashSet<_> = [1, 2, 3, 4].iter().collect();
    let b: HashSet<_> = [3, 4, 5, 6].iter().collect();

    // Elements in A or B but not both
    let sym_diff: HashSet<_> = a.symmetric_difference(&b).collect();
    println!("Symmetric diff: {:?}", sym_diff); // {1, 2, 5, 6}
}
```

### Is Subset / Is Superset

```rust
use std::collections::HashSet;

fn main() {
    let a: HashSet<_> = [1, 2].iter().collect();
    let b: HashSet<_> = [1, 2, 3, 4].iter().collect();

    println!("A is subset of B: {}", a.is_subset(&b));       // true
    println!("B is superset of A: {}", b.is_superset(&a));   // true
    println!("A is disjoint from B: {}", a.is_disjoint(&b)); // false
}
```

### Is Disjoint - Rời Nhau

```rust
use std::collections::HashSet;

fn main() {
    let a: HashSet<_> = [1, 2, 3].iter().collect();
    let b: HashSet<_> = [4, 5, 6].iter().collect();
    let c: HashSet<_> = [3, 4, 5].iter().collect();

    println!("A and B disjoint: {}", a.is_disjoint(&b)); // true
    println!("A and C disjoint: {}", a.is_disjoint(&c)); // false (có 3)
}
```

## 🔁 Iteration

### Iterate Over Values

```rust
use std::collections::HashSet;

fn main() {
    let mut set = HashSet::new();
    set.insert("apple");
    set.insert("banana");
    set.insert("cherry");

    for item in &set {
        println!("{}", item);
    }
}
```

**Lưu ý**: Thứ tự không được đảm bảo!

### Collect from Iterator

```rust
use std::collections::HashSet;

fn main() {
    let numbers = vec![1, 2, 2, 3, 3, 3, 4];

    // Remove duplicates
    let unique: HashSet<_> = numbers.iter().collect();

    println!("{:?}", unique); // {1, 2, 3, 4}
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Remove Duplicates

```rust
use std::collections::HashSet;

fn remove_duplicates(numbers: Vec<i32>) -> Vec<i32> {
    let set: HashSet<_> = numbers.into_iter().collect();
    set.into_iter().collect()
}

fn main() {
    let numbers = vec![1, 2, 2, 3, 4, 4, 5];
    let unique = remove_duplicates(numbers);

    println!("{:?}", unique);
}
```

### Ví Dụ 2: Find Common Elements

```rust
use std::collections::HashSet;

fn find_common(list1: &[i32], list2: &[i32]) -> Vec<i32> {
    let set1: HashSet<_> = list1.iter().collect();
    let set2: HashSet<_> = list2.iter().collect();

    set1.intersection(&set2)
        .map(|&&x| x)
        .collect()
}

fn main() {
    let a = vec![1, 2, 3, 4, 5];
    let b = vec![3, 4, 5, 6, 7];

    let common = find_common(&a, &b);
    println!("Common elements: {:?}", common); // [3, 4, 5]
}
```

### Ví Dụ 3: Word Uniqueness

```rust
use std::collections::HashSet;

fn unique_words(text: &str) -> usize {
    let words: HashSet<_> = text
        .split_whitespace()
        .map(|w| w.to_lowercase())
        .collect();

    words.len()
}

fn main() {
    let text = "Hello world hello Rust world";
    let count = unique_words(text);

    println!("Unique words: {}", count); // 3 (hello, world, rust)
}
```

### Ví Dụ 4: Visited Tracker

```rust
use std::collections::HashSet;

struct WebCrawler {
    visited: HashSet<String>,
}

impl WebCrawler {
    fn new() -> Self {
        WebCrawler {
            visited: HashSet::new(),
        }
    }

    fn visit(&mut self, url: &str) -> bool {
        if self.visited.contains(url) {
            println!("Already visited: {}", url);
            false
        } else {
            println!("Visiting: {}", url);
            self.visited.insert(url.to_string());
            true
        }
    }

    fn stats(&self) {
        println!("Total pages visited: {}", self.visited.len());
    }
}

fn main() {
    let mut crawler = WebCrawler::new();

    crawler.visit("https://example.com");
    crawler.visit("https://example.com/page1");
    crawler.visit("https://example.com"); // Already visited

    crawler.stats();
}
```

**Đầu ra**:
```
Visiting: https://example.com
Visiting: https://example.com/page1
Already visited: https://example.com
Total pages visited: 2
```

### Ví Dụ 5: Tag System

```rust
use std::collections::HashSet;

struct Article {
    title: String,
    tags: HashSet<String>,
}

impl Article {
    fn new(title: &str) -> Self {
        Article {
            title: title.to_string(),
            tags: HashSet::new(),
        }
    }

    fn add_tag(&mut self, tag: &str) {
        self.tags.insert(tag.to_string());
    }

    fn has_tag(&self, tag: &str) -> bool {
        self.tags.contains(tag)
    }

    fn common_tags(&self, other: &Article) -> Vec<String> {
        self.tags
            .intersection(&other.tags)
            .cloned()
            .collect()
    }
}

fn main() {
    let mut article1 = Article::new("Rust Basics");
    article1.add_tag("rust");
    article1.add_tag("programming");
    article1.add_tag("tutorial");

    let mut article2 = Article::new("Rust Advanced");
    article2.add_tag("rust");
    article2.add_tag("advanced");
    article2.add_tag("programming");

    let common = article1.common_tags(&article2);
    println!("Common tags: {:?}", common); // ["rust", "programming"]
}
```

### Ví Dụ 6: Access Control

```rust
use std::collections::HashSet;

struct User {
    username: String,
    permissions: HashSet<String>,
}

impl User {
    fn new(username: &str) -> Self {
        User {
            username: username.to_string(),
            permissions: HashSet::new(),
        }
    }

    fn grant_permission(&mut self, perm: &str) {
        self.permissions.insert(perm.to_string());
    }

    fn has_permission(&self, perm: &str) -> bool {
        self.permissions.contains(perm)
    }

    fn has_all_permissions(&self, required: &[&str]) -> bool {
        required.iter().all(|&p| self.has_permission(p))
    }
}

fn main() {
    let mut user = User::new("alice");

    user.grant_permission("read");
    user.grant_permission("write");

    if user.has_permission("read") {
        println!("User can read");
    }

    if user.has_all_permissions(&["read", "write"]) {
        println!("User can read and write");
    }

    if !user.has_permission("delete") {
        println!("User cannot delete");
    }
}
```

## 📊 HashSet vs Vec vs HashMap

```rust
use std::collections::{HashSet, HashMap};

fn main() {
    // Vec - ordered, allows duplicates
    let vec = vec![1, 2, 2, 3];
    println!("Vec: {:?}", vec); // [1, 2, 2, 3]

    // HashSet - unordered, unique values only
    let set: HashSet<_> = vec![1, 2, 2, 3].into_iter().collect();
    println!("HashSet: {:?}", set); // {1, 2, 3}

    // HashMap - unordered, key-value pairs
    let mut map = HashMap::new();
    map.insert("key", "value");
    println!("HashMap: {:?}", map); // {"key": "value"}
}
```

| Collection | Order | Duplicates | Lookup | Use Case |
|------------|-------|------------|--------|----------|
| **Vec** | ✅ Ordered | ✅ Allowed | O(n) | Sequential data |
| **HashSet** | ❌ Unordered | ❌ Unique only | O(1) | Unique values |
| **HashMap** | ❌ Unordered | Keys unique | O(1) | Key-value pairs |

## 💻 Bài Tập Thực Hành

### Bài 1: Unique Elements

```rust
use std::collections::HashSet;

fn main() {
    let numbers = vec![1, 2, 3, 2, 4, 3, 5];

    // TODO: Tạo HashSet từ vec để loại bỏ duplicates
    // let unique: HashSet<_> = ...

    // TODO: In ra số lượng unique elements
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::collections::HashSet;

fn main() {
    let numbers = vec![1, 2, 3, 2, 4, 3, 5];

    let unique: HashSet<_> = numbers.into_iter().collect();

    println!("Unique count: {}", unique.len()); // 5
    println!("Unique elements: {:?}", unique);
}
```
</details>

### Bài 2: Set Operations

```rust
use std::collections::HashSet;

fn main() {
    let set_a: HashSet<_> = [1, 2, 3, 4, 5].iter().collect();
    let set_b: HashSet<_> = [4, 5, 6, 7, 8].iter().collect();

    // TODO: Tìm union
    // TODO: Tìm intersection
    // TODO: Tìm difference (A - B)
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::collections::HashSet;

fn main() {
    let set_a: HashSet<_> = [1, 2, 3, 4, 5].iter().collect();
    let set_b: HashSet<_> = [4, 5, 6, 7, 8].iter().collect();

    let union: HashSet<_> = set_a.union(&set_b).collect();
    println!("Union: {:?}", union);

    let intersection: HashSet<_> = set_a.intersection(&set_b).collect();
    println!("Intersection: {:?}", intersection);

    let difference: HashSet<_> = set_a.difference(&set_b).collect();
    println!("Difference: {:?}", difference);
}
```
</details>

### Bài 3: Email Validator

```rust
use std::collections::HashSet;

fn has_unique_emails(emails: &[&str]) -> bool {
    // TODO: Check if all emails are unique
    // Hint: Compare Vec length with HashSet length
}

fn main() {
    let emails1 = vec!["a@test.com", "b@test.com"];
    let emails2 = vec!["a@test.com", "a@test.com"];

    println!("List 1 unique: {}", has_unique_emails(&emails1));
    println!("List 2 unique: {}", has_unique_emails(&emails2));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::collections::HashSet;

fn has_unique_emails(emails: &[&str]) -> bool {
    let set: HashSet<_> = emails.iter().collect();
    set.len() == emails.len()
}

fn main() {
    let emails1 = vec!["a@test.com", "b@test.com"];
    let emails2 = vec!["a@test.com", "a@test.com"];

    println!("List 1 unique: {}", has_unique_emails(&emails1)); // true
    println!("List 2 unique: {}", has_unique_emails(&emails2)); // false
}
```
</details>

## 🎯 Tóm Tắt

| Method | Mô Tả | Return |
|--------|-------|--------|
| **`new()`** | Tạo HashSet mới | `HashSet<T>` |
| **`insert(v)`** | Thêm value | `bool` (true nếu mới) |
| **`remove(&v)`** | Xóa value | `bool` |
| **`contains(&v)`** | Kiểm tra tồn tại | `bool` |
| **`len()`** | Số lượng elements | `usize` |
| **`is_empty()`** | Kiểm tra rỗng | `bool` |
| **`union()`** | Hợp hai sets | Iterator |
| **`intersection()`** | Giao hai sets | Iterator |
| **`difference()`** | Hiệu hai sets | Iterator |
| **`symmetric_difference()`** | Hiệu đối xứng | Iterator |
| **`is_subset()`** | Kiểm tra subset | `bool` |
| **`is_superset()`** | Kiểm tra superset | `bool` |
| **`is_disjoint()`** | Kiểm tra rời nhau | `bool` |

**Quy tắc vàng**:
- ✅ HashSet cho unique values
- ✅ O(1) lookup, insert, remove
- ✅ Values phải implement `Eq + Hash`
- ✅ Order không được đảm bảo
- ✅ Dùng cho: deduplication, membership tests, set operations

## 🔗 Liên Kết Hữu Ích

- [std::collections::HashSet](https://doc.rust-lang.org/std/collections/struct.HashSet.html)
- [Rust Book - HashSet](https://doc.rust-lang.org/book/ch08-03-hash-maps.html)

---

**Bài tiếp theo**: [Iterators →](./iterators.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Iterators** - công cụ mạnh mẽ để xử lý sequences!
