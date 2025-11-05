---
sidebar_position: 21
title: "Iterator Adapters Nâng Cao"
description: "Tìm hiểu các Iterator adapters mạnh mẽ trong Rust"
---

# 🔗 Iterator Adapters Nâng Cao

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Sử dụng `.zip()` để kết hợp iterators
- ✅ Dùng `.enumerate()` để có index
- ✅ Giới hạn với `.take()` và `.skip()`
- ✅ Kết nối iterators với `.chain()`
- ✅ Flatten nested structures
- ✅ Tạo custom iterator

## 🤔 Iterator Adapters Là Gì?

### Ẩn Dụ Cuộc Sống: Lắp Ráp LEGO

**Iterator Adapters** giống như **các mảnh LEGO đặc biệt**:

🧩 **LEGO Blocks**:
- **Kết nối** các mảnh lại (chain)
- **Ghép đôi** các mảnh (zip)
- **Đánh số** từng mảnh (enumerate)
- **Lấy một số** mảnh (take, skip)

🦀 **Iterator Adapters**:
- Transform iterators
- Combine multiple iterators
- Control iteration flow
- Create complex pipelines

### Ví Dụ Cơ Bản

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let letters = vec!['a', 'b', 'c'];

    // Zip hai iterators lại
    let paired: Vec<_> = numbers
        .iter()
        .zip(letters.iter())
        .collect();

    println!("{:?}", paired); // [(1, 'a'), (2, 'b'), (3, 'c')]
}
```

## 🔢 Enumerate - Thêm Index

### Basic Enumerate

```rust
fn main() {
    let fruits = vec!["apple", "banana", "cherry"];

    for (index, fruit) in fruits.iter().enumerate() {
        println!("{}: {}", index, fruit);
    }
}
```

**Đầu ra**:
```
0: apple
1: banana
2: cherry
```

### Enumerate với Filter

```rust
fn main() {
    let numbers = vec![10, 20, 30, 40, 50];

    let result: Vec<_> = numbers
        .iter()
        .enumerate()
        .filter(|(_, &num)| num > 25)
        .collect();

    println!("{:?}", result); // [(2, 30), (3, 40), (4, 50)]
}
```

### Enumerate từ Index Khác

```rust
fn main() {
    let items = vec!["first", "second", "third"];

    // Bắt đầu từ 1 thay vì 0
    for (i, item) in items.iter().enumerate() {
        println!("{}: {}", i + 1, item);
    }
}
```

**Đầu ra**:
```
1: first
2: second
3: third
```

## 🔗 Zip - Kết Hợp Hai Iterators

### Basic Zip

```rust
fn main() {
    let names = vec!["Alice", "Bob", "Charlie"];
    let ages = vec![30, 25, 35];

    let people: Vec<_> = names
        .iter()
        .zip(ages.iter())
        .collect();

    for (name, age) in people {
        println!("{} is {} years old", name, age);
    }
}
```

**Đầu ra**:
```
Alice is 30 years old
Bob is 25 years old
Charlie is 35 years old
```

### Zip Dừng Ở Iterator Ngắn Nhất

```rust
fn main() {
    let a = vec![1, 2, 3, 4, 5];
    let b = vec!['a', 'b', 'c']; // Ngắn hơn

    let zipped: Vec<_> = a.iter().zip(b.iter()).collect();

    println!("{:?}", zipped); // [(1, 'a'), (2, 'b'), (3, 'c')]
    // 4 và 5 bị bỏ qua
}
```

### Zip với Map

```rust
fn main() {
    let quantities = vec![2, 3, 1];
    let prices = vec![10, 20, 15];

    let totals: Vec<_> = quantities
        .iter()
        .zip(prices.iter())
        .map(|(qty, price)| qty * price)
        .collect();

    println!("{:?}", totals); // [20, 60, 15]
}
```

### Multiple Zips

```rust
fn main() {
    let names = vec!["Alice", "Bob"];
    let ages = vec![30, 25];
    let cities = vec!["Hanoi", "HCMC"];

    // Zip 3 vectors
    let people: Vec<_> = names
        .iter()
        .zip(ages.iter())
        .zip(cities.iter())
        .map(|((name, age), city)| (name, age, city))
        .collect();

    for (name, age, city) in people {
        println!("{}, {} - {}", name, age, city);
    }
}
```

## ✂️ Take - Lấy N Elements Đầu

### Basic Take

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let first_five: Vec<_> = numbers
        .iter()
        .take(5)
        .collect();

    println!("{:?}", first_five); // [1, 2, 3, 4, 5]
}
```

### Take với Filter

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Lấy 3 số chẵn đầu tiên
    let result: Vec<_> = numbers
        .iter()
        .filter(|x| *x % 2 == 0)
        .take(3)
        .collect();

    println!("{:?}", result); // [2, 4, 6]
}
```

### Take_While - Lấy Trong Khi Điều Kiện Đúng

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 2, 1];

    let result: Vec<_> = numbers
        .iter()
        .take_while(|&&x| x < 5)
        .collect();

    println!("{:?}", result); // [1, 2, 3, 4]
    // Dừng khi gặp 5, không lấy 2, 1 phía sau
}
```

## ⏭️ Skip - Bỏ Qua N Elements Đầu

### Basic Skip

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let after_two: Vec<_> = numbers
        .iter()
        .skip(2)
        .collect();

    println!("{:?}", after_two); // [3, 4, 5]
}
```

### Skip với Take - Pagination

```rust
fn main() {
    let items = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let page = 2;
    let page_size = 3;

    let page_items: Vec<_> = items
        .iter()
        .skip((page - 1) * page_size)
        .take(page_size)
        .collect();

    println!("Page {}: {:?}", page, page_items); // [4, 5, 6]
}
```

### Skip_While - Bỏ Qua Trong Khi Điều Kiện Đúng

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 2, 1];

    let result: Vec<_> = numbers
        .iter()
        .skip_while(|&&x| x < 4)
        .collect();

    println!("{:?}", result); // [4, 5, 2, 1]
    // Bỏ qua cho đến khi gặp >= 4
}
```

## ⛓️ Chain - Nối Iterators

### Basic Chain

```rust
fn main() {
    let a = vec![1, 2, 3];
    let b = vec![4, 5, 6];

    let combined: Vec<_> = a
        .iter()
        .chain(b.iter())
        .collect();

    println!("{:?}", combined); // [1, 2, 3, 4, 5, 6]
}
```

### Chain Multiple Iterators

```rust
fn main() {
    let a = vec![1, 2];
    let b = vec![3, 4];
    let c = vec![5, 6];

    let all: Vec<_> = a
        .iter()
        .chain(b.iter())
        .chain(c.iter())
        .collect();

    println!("{:?}", all); // [1, 2, 3, 4, 5, 6]
}
```

### Chain với Transform

```rust
fn main() {
    let evens = vec![2, 4, 6];
    let odds = vec![1, 3, 5];

    let all_doubled: Vec<_> = evens
        .iter()
        .chain(odds.iter())
        .map(|x| x * 2)
        .collect();

    println!("{:?}", all_doubled); // [4, 8, 12, 2, 6, 10]
}
```

## 🪆 Flatten - Làm Phẳng Nested Structures

### Basic Flatten

```rust
fn main() {
    let nested = vec![
        vec![1, 2, 3],
        vec![4, 5],
        vec![6, 7, 8, 9],
    ];

    let flat: Vec<_> = nested
        .iter()
        .flatten()
        .collect();

    println!("{:?}", flat); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
}
```

### Flatten với Map (flat_map)

```rust
fn main() {
    let words = vec!["hello", "world"];

    // Tách thành chars
    let chars: Vec<_> = words
        .iter()
        .flat_map(|word| word.chars())
        .collect();

    println!("{:?}", chars); // ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
}
```

### Flatten Options

```rust
fn main() {
    let options = vec![Some(1), None, Some(2), Some(3), None];

    let values: Vec<_> = options
        .into_iter()
        .flatten()
        .collect();

    println!("{:?}", values); // [1, 2, 3]
}
```

### Flatten Results

```rust
fn main() {
    let results: Vec<Result<i32, &str>> = vec![
        Ok(1),
        Err("error"),
        Ok(2),
        Ok(3),
    ];

    let values: Vec<_> = results
        .into_iter()
        .flatten()
        .collect();

    println!("{:?}", values); // [1, 2, 3]
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: CSV Processing

```rust
fn main() {
    let csv_lines = vec![
        "Alice,30,Hanoi",
        "Bob,25,HCMC",
        "Charlie,35,Danang",
    ];

    let people: Vec<_> = csv_lines
        .iter()
        .enumerate()
        .map(|(i, line)| {
            let parts: Vec<_> = line.split(',').collect();
            (i + 1, parts[0], parts[1], parts[2])
        })
        .collect();

    for (id, name, age, city) in people {
        println!("{}: {} ({}) from {}", id, name, age, city);
    }
}
```

### Ví Dụ 2: Pagination System

```rust
fn paginate<T: Clone>(items: &[T], page: usize, size: usize) -> Vec<T> {
    items
        .iter()
        .skip((page - 1) * size)
        .take(size)
        .cloned()
        .collect()
}

fn main() {
    let data: Vec<_> = (1..=20).collect();

    let page1 = paginate(&data, 1, 5);
    let page2 = paginate(&data, 2, 5);
    let page3 = paginate(&data, 3, 5);

    println!("Page 1: {:?}", page1); // [1, 2, 3, 4, 5]
    println!("Page 2: {:?}", page2); // [6, 7, 8, 9, 10]
    println!("Page 3: {:?}", page3); // [11, 12, 13, 14, 15]
}
```

### Ví Dụ 3: Merge Sorted Lists

```rust
fn main() {
    let list1 = vec![1, 3, 5, 7];
    let list2 = vec![2, 4, 6, 8];

    let mut merged: Vec<_> = list1
        .iter()
        .chain(list2.iter())
        .collect();

    merged.sort();

    println!("{:?}", merged); // [1, 2, 3, 4, 5, 6, 7, 8]
}
```

### Ví Dụ 4: Matrix Operations

```rust
fn main() {
    let matrix = vec![
        vec![1, 2, 3],
        vec![4, 5, 6],
        vec![7, 8, 9],
    ];

    // Flatten to 1D
    let flat: Vec<_> = matrix.iter().flatten().copied().collect();
    println!("Flat: {:?}", flat);

    // Sum all elements
    let sum: i32 = matrix.iter().flatten().sum();
    println!("Sum: {}", sum); // 45
}
```

### Ví Dụ 5: Text File Processing

```rust
fn main() {
    let lines = vec![
        "apple banana cherry",
        "dog elephant fox",
        "guitar house ice",
    ];

    // Lấy từ đầu tiên của mỗi dòng
    let first_words: Vec<_> = lines
        .iter()
        .enumerate()
        .map(|(i, line)| {
            let first = line.split_whitespace().next().unwrap();
            (i + 1, first)
        })
        .collect();

    for (line_num, word) in first_words {
        println!("Line {}: {}", line_num, word);
    }
}
```

### Ví Dụ 6: Window Processing

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Sliding window of size 3
    let windows: Vec<_> = numbers
        .windows(3)
        .collect();

    for window in windows {
        println!("{:?}", window);
    }
}
```

**Đầu ra**:
```
[1, 2, 3]
[2, 3, 4]
[3, 4, 5]
```

## 🔧 Custom Iterator

### Tạo Custom Iterator

```rust
struct Counter {
    count: u32,
    max: u32,
}

impl Counter {
    fn new(max: u32) -> Counter {
        Counter { count: 0, max }
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.count < self.max {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {
    let counter = Counter::new(5);

    for num in counter {
        println!("{}", num);
    }
}
```

**Đầu ra**:
```
1
2
3
4
5
```

### Custom Iterator với State

```rust
struct Fibonacci {
    curr: u32,
    next: u32,
}

impl Fibonacci {
    fn new() -> Self {
        Fibonacci { curr: 0, next: 1 }
    }
}

impl Iterator for Fibonacci {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        let result = self.curr;
        let new_next = self.curr + self.next;
        self.curr = self.next;
        self.next = new_next;
        Some(result)
    }
}

fn main() {
    let fib = Fibonacci::new();

    let first_10: Vec<_> = fib.take(10).collect();

    println!("{:?}", first_10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
}
```

### Custom Iterator with IntoIterator

```rust
struct Book {
    title: String,
    pages: Vec<String>,
}

impl Book {
    fn new(title: &str, pages: Vec<String>) -> Self {
        Book {
            title: title.to_string(),
            pages,
        }
    }
}

impl IntoIterator for Book {
    type Item = String;
    type IntoIter = std::vec::IntoIter<String>;

    fn into_iter(self) -> Self::IntoIter {
        self.pages.into_iter()
    }
}

fn main() {
    let book = Book::new(
        "Rust Book",
        vec![
            "Page 1".to_string(),
            "Page 2".to_string(),
            "Page 3".to_string(),
        ],
    );

    for page in book {
        println!("{}", page);
    }
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Enumerate và Filter

```rust
fn main() {
    let numbers = vec![10, 15, 20, 25, 30, 35];

    // TODO: Lấy index và giá trị của số chẵn
    // Expected: [(0, 10), (2, 20), (4, 30)]
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let numbers = vec![10, 15, 20, 25, 30, 35];

    let result: Vec<_> = numbers
        .iter()
        .enumerate()
        .filter(|(_, &num)| num % 2 == 0)
        .map(|(i, &num)| (i, num))
        .collect();

    println!("{:?}", result);
}
```
</details>

### Bài 2: Zip và Calculate

```rust
fn main() {
    let prices = vec![100, 200, 150];
    let quantities = vec![2, 1, 3];

    // TODO: Tính tổng tiền (price * quantity)
    // Expected: 850 (200 + 200 + 450)
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let prices = vec![100, 200, 150];
    let quantities = vec![2, 1, 3];

    let total: i32 = prices
        .iter()
        .zip(quantities.iter())
        .map(|(p, q)| p * q)
        .sum();

    println!("{}", total); // 850
}
```
</details>

### Bài 3: Chain và Sort

```rust
fn main() {
    let a = vec![5, 3, 8];
    let b = vec![1, 9, 4];

    // TODO: Nối lại và sort
    // Expected: [1, 3, 4, 5, 8, 9]
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let a = vec![5, 3, 8];
    let b = vec![1, 9, 4];

    let mut result: Vec<_> = a
        .iter()
        .chain(b.iter())
        .copied()
        .collect();

    result.sort();

    println!("{:?}", result);
}
```
</details>

### Bài 4: Flatten Matrix

```rust
fn main() {
    let matrix = vec![
        vec![1, 2],
        vec![3, 4],
        vec![5, 6],
    ];

    // TODO: Flatten và tính tổng
    // Expected: 21
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let matrix = vec![
        vec![1, 2],
        vec![3, 4],
        vec![5, 6],
    ];

    let sum: i32 = matrix.iter().flatten().sum();

    println!("{}", sum); // 21
}
```
</details>

## 🎯 Tóm Tắt

| Adapter | Mô Tả | Example |
|---------|-------|---------|
| **`.enumerate()`** | Thêm index (0, 1, 2...) | `(0, 'a'), (1, 'b')` |
| **`.zip(other)`** | Kết hợp hai iterators | `(1, 'a'), (2, 'b')` |
| **`.take(n)`** | Lấy n elements đầu | `[1, 2, 3]` |
| **`.skip(n)`** | Bỏ qua n elements đầu | `[4, 5, 6]` |
| **`.take_while(f)`** | Lấy trong khi điều kiện true | Stop khi false |
| **`.skip_while(f)`** | Bỏ qua trong khi điều kiện true | Start khi false |
| **`.chain(other)`** | Nối iterators | `[1, 2] + [3, 4]` |
| **`.flatten()`** | Làm phẳng nested | `[[1, 2], [3]]` → `[1, 2, 3]` |
| **`.flat_map(f)`** | Map rồi flatten | Combine map + flatten |

**Quy tắc vàng**:
- ✅ Enumerate cho index
- ✅ Zip để combine hai sequences
- ✅ Take/Skip cho pagination
- ✅ Chain để nối iterators
- ✅ Flatten cho nested structures
- ✅ Custom iterators với Iterator trait

## 🔗 Liên Kết Hữu Ích

- [Iterator Methods](https://doc.rust-lang.org/std/iter/trait.Iterator.html)
- [Iterator Trait](https://doc.rust-lang.org/std/iter/trait.Iterator.html)

---

**Bài tiếp theo**: [Box: Smart Pointers →](./box.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Smart Pointers** - bắt đầu với Box!
