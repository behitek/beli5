---
sidebar_position: 20
title: "Iterators: Xử Lý Dãy Dữ Liệu"
description: "Tìm hiểu cách sử dụng Iterators để xử lý dữ liệu hiệu quả"
---

# 🔄 Iterators: Xử Lý Dãy Dữ Liệu Hiệu Quả

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu Iterator trait và cách hoạt động
- ✅ Sử dụng `.iter()`, `.iter_mut()`, `.into_iter()`
- ✅ Transform data với `.map()` và `.filter()`
- ✅ Aggregate data với `.fold()`, `.sum()`, `.count()`
- ✅ Hiểu lazy evaluation
- ✅ Chain nhiều operations lại với nhau

## 🤔 Iterator Là Gì?

### Ẩn Dụ Cuộc Sống: Băng Chuyền Sản Xuất

**Iterator** giống như **băng chuyền trong nhà máy**:

🏭 **Băng Chuyền**:
- **Từng món một** di chuyển qua
- Mỗi trạm xử lý khác nhau (map, filter)
- Không tốn bộ nhớ cho toàn bộ
- Dừng khi cần

🦀 **Iterator Trong Rust**:
- **Lazy evaluation** - không chạy cho đến khi cần
- Chain operations lại với nhau
- Zero-cost abstraction
- Hiệu năng như viết loop thủ công

### Ví Dụ Cơ Bản

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Iterator: lazy, chưa chạy
    let doubled = numbers.iter().map(|x| x * 2);

    // Chỉ chạy khi collect
    let result: Vec<_> = doubled.collect();

    println!("{:?}", result); // [2, 4, 6, 8, 10]
}
```

## 🔧 Iterator Trait

### Iterator Trait Definition

```rust
trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;

    // Nhiều methods khác...
}
```

### Ví Dụ: Iterator Thủ Công

```rust
fn main() {
    let v = vec![1, 2, 3];
    let mut iter = v.iter();

    println!("{:?}", iter.next()); // Some(1)
    println!("{:?}", iter.next()); // Some(2)
    println!("{:?}", iter.next()); // Some(3)
    println!("{:?}", iter.next()); // None
}
```

## 📦 Ba Cách Tạo Iterator

### `.iter()` - Immutable References

```rust
fn main() {
    let numbers = vec![1, 2, 3];

    for n in numbers.iter() {
        println!("{}", n); // n is &i32
    }

    // numbers vẫn dùng được
    println!("{:?}", numbers);
}
```

### `.iter_mut()` - Mutable References

```rust
fn main() {
    let mut numbers = vec![1, 2, 3];

    for n in numbers.iter_mut() {
        *n *= 2; // Modify in place
    }

    println!("{:?}", numbers); // [2, 4, 6]
}
```

### `.into_iter()` - Take Ownership

```rust
fn main() {
    let numbers = vec![1, 2, 3];

    for n in numbers.into_iter() {
        println!("{}", n); // n is i32 (owned)
    }

    // numbers không dùng được nữa (moved)
    // println!("{:?}", numbers); // ERROR!
}
```

### So Sánh Ba Loại

```rust
fn main() {
    let v = vec![String::from("a"), String::from("b")];

    // iter() - borrow
    for s in v.iter() {
        println!("{}", s); // s: &String
    }
    println!("v still valid: {:?}", v);

    // iter_mut() - mutable borrow
    let mut v2 = vec![String::from("a"), String::from("b")];
    for s in v2.iter_mut() {
        s.push_str("!"); // Modify
    }
    println!("{:?}", v2); // ["a!", "b!"]

    // into_iter() - take ownership
    let v3 = vec![String::from("a"), String::from("b")];
    for s in v3.into_iter() {
        println!("{}", s); // s: String (owned)
    }
    // v3 không còn tồn tại
}
```

## 🔄 Map - Transform Elements

### Basic Map

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let doubled: Vec<_> = numbers
        .iter()
        .map(|x| x * 2)
        .collect();

    println!("{:?}", doubled); // [2, 4, 6, 8, 10]
}
```

### Map với Closures Phức Tạp

```rust
fn main() {
    let words = vec!["hello", "world", "rust"];

    let lengths: Vec<_> = words
        .iter()
        .map(|word| word.len())
        .collect();

    println!("{:?}", lengths); // [5, 5, 4]
}
```

### Map Chain

```rust
fn main() {
    let numbers = vec![1, 2, 3];

    let result: Vec<_> = numbers
        .iter()
        .map(|x| x * 2)      // [2, 4, 6]
        .map(|x| x + 1)      // [3, 5, 7]
        .collect();

    println!("{:?}", result);
}
```

## 🎯 Filter - Lọc Elements

### Basic Filter

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6];

    let evens: Vec<_> = numbers
        .iter()
        .filter(|x| *x % 2 == 0)
        .collect();

    println!("{:?}", evens); // [2, 4, 6]
}
```

### Filter với Điều Kiện Phức Tạp

```rust
fn main() {
    let words = vec!["apple", "a", "banana", "ab", "cherry"];

    let long_words: Vec<_> = words
        .iter()
        .filter(|word| word.len() > 2)
        .collect();

    println!("{:?}", long_words); // ["apple", "banana", "cherry"]
}
```

### Map + Filter

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6];

    let result: Vec<_> = numbers
        .iter()
        .filter(|x| *x % 2 == 0)  // Lọc số chẵn
        .map(|x| x * x)           // Bình phương
        .collect();

    println!("{:?}", result); // [4, 16, 36]
}
```

## 📥 Collect - Thu Thập Kết Quả

### Collect to Vec

```rust
fn main() {
    let numbers = vec![1, 2, 3];

    let result: Vec<i32> = numbers
        .iter()
        .map(|x| x * 2)
        .collect();

    println!("{:?}", result);
}
```

### Collect to HashSet

```rust
use std::collections::HashSet;

fn main() {
    let numbers = vec![1, 2, 2, 3, 3, 3];

    let unique: HashSet<_> = numbers.into_iter().collect();

    println!("{:?}", unique); // {1, 2, 3}
}
```

### Collect to String

```rust
fn main() {
    let chars = vec!['h', 'e', 'l', 'l', 'o'];

    let word: String = chars.into_iter().collect();

    println!("{}", word); // "hello"
}
```

### Collect with Result

```rust
fn main() {
    let strings = vec!["1", "2", "3", "4"];

    let numbers: Result<Vec<_>, _> = strings
        .iter()
        .map(|s| s.parse::<i32>())
        .collect();

    println!("{:?}", numbers); // Ok([1, 2, 3, 4])
}
```

## 🔢 Aggregate Operations

### Sum

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let total: i32 = numbers.iter().sum();

    println!("Total: {}", total); // 15
}
```

### Product

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4];

    let product: i32 = numbers.iter().product();

    println!("Product: {}", product); // 24
}
```

### Count

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6];

    let count = numbers
        .iter()
        .filter(|x| *x % 2 == 0)
        .count();

    println!("Even count: {}", count); // 3
}
```

### Min và Max

```rust
fn main() {
    let numbers = vec![3, 1, 4, 1, 5, 9];

    let min = numbers.iter().min();
    let max = numbers.iter().max();

    println!("Min: {:?}", min); // Some(1)
    println!("Max: {:?}", max); // Some(9)
}
```

## 🎯 Fold - Powerful Aggregation

### Basic Fold

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let sum = numbers.iter().fold(0, |acc, x| acc + x);

    println!("Sum: {}", sum); // 15
}
```

**Giải thích**:
- `0` là giá trị khởi đầu (accumulator)
- `acc` là giá trị tích lũy
- `x` là element hiện tại
- Return giá trị mới của accumulator

### Fold để Tạo String

```rust
fn main() {
    let words = vec!["Hello", "World", "Rust"];

    let sentence = words.iter().fold(String::new(), |acc, word| {
        acc + word + " "
    });

    println!("{}", sentence.trim()); // "Hello World Rust"
}
```

### Fold với Logic Phức Tạp

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Tính tổng bình phương các số chẵn
    let result = numbers
        .iter()
        .filter(|x| *x % 2 == 0)
        .fold(0, |acc, x| acc + x * x);

    println!("{}", result); // 4 + 16 = 20
}
```

## ⚡ Lazy Evaluation

### Iterators Are Lazy

```rust
fn main() {
    let numbers = vec![1, 2, 3];

    // Chỉ define, chưa chạy!
    let doubled = numbers.iter().map(|x| {
        println!("Processing {}", x);
        x * 2
    });

    println!("Iterator created");

    // Chỉ chạy khi collect
    let result: Vec<_> = doubled.collect();

    println!("{:?}", result);
}
```

**Đầu ra**:
```
Iterator created
Processing 1
Processing 2
Processing 3
[2, 4, 6]
```

### Ưu Điểm Lazy Evaluation

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Short-circuit: dừng sớm khi tìm thấy
    let first_big = numbers
        .iter()
        .map(|x| {
            println!("Checking {}", x);
            x
        })
        .find(|x| **x > 5);

    println!("Found: {:?}", first_big);
}
```

**Đầu ra** (chỉ check đến 6):
```
Checking 1
Checking 2
Checking 3
Checking 4
Checking 5
Checking 6
Found: Some(6)
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Process User Data

```rust
#[derive(Debug)]
struct User {
    name: String,
    age: u32,
    active: bool,
}

fn main() {
    let users = vec![
        User { name: "Alice".to_string(), age: 30, active: true },
        User { name: "Bob".to_string(), age: 25, active: false },
        User { name: "Charlie".to_string(), age: 35, active: true },
        User { name: "David".to_string(), age: 28, active: true },
    ];

    // Lấy tên của active users trên 26 tuổi
    let names: Vec<_> = users
        .iter()
        .filter(|u| u.active && u.age > 26)
        .map(|u| &u.name)
        .collect();

    println!("{:?}", names); // ["Alice", "Charlie"]
}
```

### Ví Dụ 2: Text Processing

```rust
fn main() {
    let text = "Hello World Rust Programming";

    let result: Vec<_> = text
        .split_whitespace()
        .filter(|word| word.len() > 4)
        .map(|word| word.to_lowercase())
        .collect();

    println!("{:?}", result); // ["hello", "world", "programming"]
}
```

### Ví Dụ 3: Statistics

```rust
fn main() {
    let scores = vec![85, 90, 78, 92, 88, 95, 73, 89];

    let total: i32 = scores.iter().sum();
    let count = scores.len();
    let average = total as f64 / count as f64;

    let above_avg = scores
        .iter()
        .filter(|&&score| score as f64 > average)
        .count();

    println!("Total: {}", total);
    println!("Average: {:.2}", average);
    println!("Above average: {}", above_avg);
}
```

**Đầu ra**:
```
Total: 690
Average: 86.25
Above average: 4
```

### Ví Dụ 4: Data Transformation

```rust
fn main() {
    let prices = vec![100, 200, 150, 300, 250];

    // Giảm giá 10%, làm tròn, chỉ lấy >= 180
    let discounted: Vec<_> = prices
        .iter()
        .map(|&price| (price as f64 * 0.9) as i32)
        .filter(|&price| price >= 180)
        .collect();

    println!("{:?}", discounted); // [180, 270, 225]
}
```

### Ví Dụ 5: Find Pattern

```rust
fn main() {
    let numbers = vec![1, 3, 5, 8, 10, 12, 15];

    // Tìm số chẵn đầu tiên
    let first_even = numbers.iter().find(|&&x| x % 2 == 0);

    // Tìm vị trí số chẵn đầu tiên
    let position = numbers.iter().position(|&x| x % 2 == 0);

    // Có số chẵn nào không?
    let has_even = numbers.iter().any(|&x| x % 2 == 0);

    // Tất cả đều dương?
    let all_positive = numbers.iter().all(|&x| x > 0);

    println!("First even: {:?}", first_even);     // Some(8)
    println!("Position: {:?}", position);         // Some(3)
    println!("Has even: {}", has_even);           // true
    println!("All positive: {}", all_positive);   // true
}
```

### Ví Dụ 6: Group và Count

```rust
use std::collections::HashMap;

fn main() {
    let words = vec!["apple", "banana", "apple", "cherry", "banana", "apple"];

    let counts = words.iter().fold(HashMap::new(), |mut acc, word| {
        *acc.entry(word).or_insert(0) += 1;
        acc
    });

    println!("{:?}", counts);
}
```

## 🆚 Iterator vs Loop

### For Loop (Cách Cũ)

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let mut result = Vec::new();

    for num in &numbers {
        if num % 2 == 0 {
            result.push(num * 2);
        }
    }

    println!("{:?}", result);
}
```

### Iterator (Cách Rust)

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let result: Vec<_> = numbers
        .iter()
        .filter(|x| *x % 2 == 0)
        .map(|x| x * 2)
        .collect();

    println!("{:?}", result);
}
```

### Ưu Điểm Iterator

✅ **Dễ đọc hơn** - rõ ràng từng bước
✅ **Functional style** - ít bugs hơn
✅ **Chainable** - kết hợp nhiều operations
✅ **Lazy** - hiệu quả hơn trong nhiều trường hợp
✅ **Zero-cost** - compiler tối ưu thành machine code tương tự loop

## 💻 Bài Tập Thực Hành

### Bài 1: Filter và Map

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // TODO: Lọc số lẻ, nhân 3, collect
    // let result: Vec<_> = ...

    // Expected: [3, 9, 15, 21, 27]
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let result: Vec<_> = numbers
        .iter()
        .filter(|x| *x % 2 != 0)
        .map(|x| x * 3)
        .collect();

    println!("{:?}", result);
}
```
</details>

### Bài 2: Sum với Điều Kiện

```rust
fn main() {
    let numbers = vec![10, 20, 30, 40, 50];

    // TODO: Tính tổng các số > 25
    // let sum: i32 = ...

    // Expected: 120 (30 + 40 + 50)
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let numbers = vec![10, 20, 30, 40, 50];

    let sum: i32 = numbers
        .iter()
        .filter(|&&x| x > 25)
        .sum();

    println!("{}", sum); // 120
}
```
</details>

### Bài 3: Text Processing

```rust
fn main() {
    let words = vec!["hello", "WORLD", "Rust", "CODE"];

    // TODO: Chuyển thành lowercase, lọc >= 4 ký tự
    // let result: Vec<String> = ...

    // Expected: ["hello", "world", "rust", "code"]
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let words = vec!["hello", "WORLD", "Rust", "CODE"];

    let result: Vec<String> = words
        .iter()
        .map(|w| w.to_lowercase())
        .filter(|w| w.len() >= 4)
        .collect();

    println!("{:?}", result);
}
```
</details>

### Bài 4: Find Maximum

```rust
fn main() {
    let numbers = vec![45, 12, 67, 23, 89, 34];

    // TODO: Tìm số lớn nhất sử dụng fold
    // let max = numbers.iter().fold(...);

    // Expected: 89
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let numbers = vec![45, 12, 67, 23, 89, 34];

    let max = numbers.iter().fold(i32::MIN, |acc, &x| {
        if x > acc { x } else { acc }
    });

    println!("{}", max); // 89
}
```
</details>

## 🎯 Tóm Tắt

| Method | Mô Tả | Return |
|--------|-------|--------|
| **`.iter()`** | Iterator với &T | `Iterator<Item=&T>` |
| **`.iter_mut()`** | Iterator với &mut T | `Iterator<Item=&mut T>` |
| **`.into_iter()`** | Iterator với T (owned) | `Iterator<Item=T>` |
| **`.map(f)`** | Transform mỗi element | `Iterator` |
| **`.filter(f)`** | Lọc elements theo điều kiện | `Iterator` |
| **`.collect()`** | Thu thập thành collection | `Vec`, `HashSet`, etc. |
| **`.fold(init, f)`** | Aggregate với accumulator | Single value |
| **`.sum()`** | Tính tổng | Number |
| **`.count()`** | Đếm elements | usize |
| **`.find(f)`** | Tìm element đầu tiên | `Option<T>` |
| **`.any(f)`** | Có element nào thỏa không? | bool |
| **`.all(f)`** | Tất cả đều thỏa không? | bool |

**Quy tắc vàng**:
- ✅ Iterators are **lazy** - chỉ chạy khi consume
- ✅ Chain operations để code dễ đọc
- ✅ Sử dụng `.collect()` để thu thập kết quả
- ✅ `.fold()` cho complex aggregations
- ✅ Zero-cost abstraction - nhanh như loop

## 🔗 Liên Kết Hữu Ích

- [std::iter](https://doc.rust-lang.org/std/iter/)
- [Iterator Trait](https://doc.rust-lang.org/std/iter/trait.Iterator.html)

---

**Bài tiếp theo**: [Iterator Adapters →](./iterator-adapters.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Iterator Adapters nâng cao** như zip, enumerate, chain, flatten!
