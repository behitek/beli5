---
sidebar_position: 11
title: "Closures: Hàm Ẩn Danh"
description: "Học cách sử dụng closures trong Rust - functions ẩn danh có thể capture environment. Hiểu về capturing, types và sử dụng với iterators!"
keywords: [rust closure, rust anonymous function, rust lambda, rust closure capture, rust closure iterator]
---

# 🎁 Closures: Hàm Ẩn Danh

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Biết cách tạo và sử dụng closures
- ✅ Hiểu capturing environment (borrow, mut, move)
- ✅ Sử dụng closures với iterators (.map, .filter)
- ✅ Phân biệt closures vs functions
:::

---

## 🤔 Closures Là Gì?

**Closure** là **function ẩn danh** (không có tên) có thể:

- Được gán vào biến
- Truyền làm argument cho function khác
- **Capture** (bắt giữ) biến từ môi trường xung quanh

```rust
fn main() {
    let chao = |ten| {
        println!("Xin chào, {}!", ten);
    };

    chao("An");
    chao("Bình");
}
```

**Kết quả:**
```
Xin chào, An!
Xin chào, Bình!
```

**Giải thích:**
- `|ten|` → Parameter của closure
- `{ ... }` → Body của closure
- Lưu vào biến `chao`

:::info Ẩn Dụ
Hãy tưởng tượng **closure** như **một công nhân cá nhân với dụng cụ riêng**:

👷 **Function thường:**
- Đến công trường, dùng dụng cụ chung
- Không mang theo đồ riêng

👷 **Closure:**
- **Mang theo** búa, cưa riêng (captured variables)
- Có thể làm việc ở bất kỳ đâu
- Linh hoạt, có "bối cảnh" riêng 🛡️
:::

---

## 📝 Cú Pháp Closures

### Cú Pháp Đầy Đủ

```rust
|param1, param2, ...| {
    // Body
    return_value
}
```

### Ví Dụ Đơn Giản

```rust
fn main() {
    // Closure không parameter
    let say_hi = || println!("Hi!");
    say_hi();

    // Closure một parameter
    let double = |x| x * 2;
    println!("Double 5 = {}", double(5));

    // Closure nhiều parameters
    let add = |a, b| a + b;
    println!("3 + 4 = {}", add(3, 4));
}
```

**Kết quả:**
```
Hi!
Double 5 = 10
3 + 4 = 7
```

---

## 🎯 Type Inference

Rust **tự suy luận kiểu** cho closures:

```rust
fn main() {
    // ✅ Rust tự suy luận x là i32
    let double = |x| x * 2;
    println!("{}", double(5));

    // ✅ Có thể khai báo kiểu rõ ràng
    let add = |a: i32, b: i32| -> i32 { a + b };
    println!("{}", add(3, 4));
}
```

**Kết quả:**
```
10
7
```

:::tip Lưu Ý Type Inference
Closure **học kiểu** từ lần gọi đầu tiên:

```rust
fn main() {
    let process = |x| x;

    let s = process(String::from("hello"));
    // let n = process(5);  // ❌ Lỗi - Đã "học" là String!
}
```
:::

---

## 📦 Capturing Environment

Điểm **đặc biệt** của closures: **Capture biến từ bên ngoài**!

### Immutable Borrow

```rust
fn main() {
    let name = String::from("An");

    let greet = || {
        println!("Xin chào, {}!", name);  // ✅ Capture name
    };

    greet();
    greet();

    println!("Vẫn dùng: {}", name);  // ✅ OK
}
```

**Kết quả:**
```
Xin chào, An!
Xin chào, An!
Vẫn dùng: An
```

**Giải thích:**
- Closure **mượn** `name` (immutable borrow)
- `name` vẫn dùng được sau closure

### Mutable Borrow

```rust
fn main() {
    let mut count = 0;

    let mut increment = || {
        count += 1;  // ✅ Mượn mutable
        println!("Count: {}", count);
    };

    increment();
    increment();
    increment();
}
```

**Kết quả:**
```
Count: 1
Count: 2
Count: 3
```

**Giải thích:**
- Closure cần `mut` vì **thay đổi** `count`
- Closure mượn `&mut count`

### Move Ownership

Dùng `move` để closure **lấy ownership**:

```rust
fn main() {
    let name = String::from("An");

    let greet = move || {
        println!("Xin chào, {}!", name);  // Move name vào closure
    };

    greet();
    // println!("{}", name);  // ❌ Lỗi - name đã move!
}
```

**Kết quả:**
```
Xin chào, An!
```

**Khi nào dùng `move`?**
- Closure sống lâu hơn biến bên ngoài
- Cần gửi closure sang thread khác

```rust
use std::thread;

fn main() {
    let name = String::from("An");

    let handle = thread::spawn(move || {
        println!("Thread: {}", name);  // ✅ move cần thiết
    });

    handle.join().unwrap();
}
```

---

## 🔧 Closures vs Functions

### Sự Khác Biệt

```rust
fn main() {
    let x = 5;

    // ❌ Function không capture
    fn add_x(n: i32) -> i32 {
        // n + x  // ❌ Lỗi - Function không biết x!
        n + 5
    }

    // ✅ Closure capture được
    let add_x_closure = |n| n + x;

    println!("Function: {}", add_x(10));
    println!("Closure: {}", add_x_closure(10));
}
```

**Kết quả:**
```
Function: 15
Closure: 15
```

### So Sánh

| Đặc Điểm | Function | Closure |
|----------|----------|---------|
| Tên | Có tên | Ẩn danh |
| Capture | ❌ Không | ✅ Có |
| Cú pháp | `fn name() {}` | `\|args\| {}` |
| Type inference | ❌ Phải khai báo | ✅ Tự suy luận |
| Dùng làm argument | Có, qua function pointer | Có, qua traits |

---

## 🔄 Closures Với Iterators

Closures **rất hữu ích** với iterator methods:

### .map() - Biến Đổi

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let doubled: Vec<i32> = numbers
        .iter()
        .map(|x| x * 2)  // ✅ Closure nhân đôi
        .collect();

    println!("Gốc: {:?}", numbers);
    println!("Nhân đôi: {:?}", doubled);
}
```

**Kết quả:**
```
Gốc: [1, 2, 3, 4, 5]
Nhân đôi: [2, 4, 6, 8, 10]
```

### .filter() - Lọc

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let evens: Vec<i32> = numbers
        .iter()
        .filter(|&x| x % 2 == 0)  // ✅ Closure lọc chẵn
        .copied()
        .collect();

    println!("Số chẵn: {:?}", evens);
}
```

**Kết quả:**
```
Số chẵn: [2, 4, 6, 8, 10]
```

### .for_each() - Xử Lý Từng Phần Tử

```rust
fn main() {
    let names = vec!["An", "Bình", "Chi"];

    names
        .iter()
        .for_each(|name| {
            println!("Xin chào, {}!", name);
        });
}
```

**Kết quả:**
```
Xin chào, An!
Xin chào, Bình!
Xin chào, Chi!
```

---

## 🎮 Ví Dụ Thực Tế: Xử Lý Danh Sách

```rust
fn main() {
    let products = vec![
        ("Áo", 200_000),
        ("Quần", 300_000),
        ("Giày", 500_000),
        ("Mũ", 100_000),
    ];

    // Lọc sản phẩm giá < 300k
    let affordable: Vec<_> = products
        .iter()
        .filter(|(_, price)| *price < 300_000)
        .collect();

    println!("Sản phẩm dưới 300k:");
    for (name, price) in affordable {
        println!("- {}: {}đ", name, price);
    }

    // Tính tổng giá
    let total: i32 = products
        .iter()
        .map(|(_, price)| price)
        .sum();

    println!("\nTổng giá trị: {}đ", total);
}
```

**Kết quả:**
```
Sản phẩm dưới 300k:
- Áo: 200000đ
- Mũ: 100000đ

Tổng giá trị: 1100000đ
```

---

## 🔗 Chain Methods

Kết hợp nhiều methods với closures:

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let result: Vec<i32> = numbers
        .iter()
        .filter(|&x| x % 2 == 0)  // Lọc chẵn
        .map(|x| x * x)            // Bình phương
        .filter(|&x| x > 10)       // Lọc > 10
        .collect();

    println!("Kết quả: {:?}", result);
}
```

**Kết quả:**
```
Kết quả: [16, 36, 64, 100]
```

**Giải thích:**
1. Lọc số chẵn: [2, 4, 6, 8, 10]
2. Bình phương: [4, 16, 36, 64, 100]
3. Lọc > 10: [16, 36, 64, 100]

---

## 📊 Ví Dụ: Tìm Kiếm Với Closure

```rust
fn tim_phan_tu<T>(arr: &[T], predicate: impl Fn(&T) -> bool) -> Option<usize> {
    for (i, item) in arr.iter().enumerate() {
        if predicate(item) {
            return Some(i);
        }
    }
    None
}

fn main() {
    let numbers = [10, 25, 30, 42, 55];

    // Tìm số đầu tiên > 30
    match tim_phan_tu(&numbers, |&x| x > 30) {
        Some(i) => println!("Tìm thấy tại index {}: {}", i, numbers[i]),
        None => println!("Không tìm thấy"),
    }

    // Tìm số chia hết cho 5
    match tim_phan_tu(&numbers, |&x| x % 5 == 0) {
        Some(i) => println!("Tìm thấy tại index {}: {}", i, numbers[i]),
        None => println!("Không tìm thấy"),
    }
}
```

**Kết quả:**
```
Tìm thấy tại index 3: 42
Tìm thấy tại index 0: 10
```

---

## 🎯 Function Nhận Closure

Functions có thể nhận closures làm parameters:

```rust
fn apply_twice<F>(f: F, x: i32) -> i32
where
    F: Fn(i32) -> i32,
{
    f(f(x))
}

fn main() {
    let double = |x| x * 2;
    let add_one = |x| x + 1;

    println!("Apply double twice: {}", apply_twice(double, 5));
    println!("Apply add_one twice: {}", apply_twice(add_one, 5));
}
```

**Kết quả:**
```
Apply double twice: 20
Apply add_one twice: 7
```

**Giải thích:**
- `apply_twice(double, 5)` → `double(double(5))` → `double(10)` → `20`
- `apply_twice(add_one, 5)` → `add_one(add_one(5))` → `add_one(6)` → `7`

---

## ⚠️ Lỗi Thường Gặp

### 1. Quên `mut` Cho Closure

```rust
fn main() {
    let mut count = 0;

    // ❌ Lỗi - Closure thay đổi count
    let increment = || {
        count += 1;
    };

    // ✅ Đúng - Thêm mut
    let mut increment = || {
        count += 1;
    };

    increment();
}
```

### 2. Sử Dụng Sau Move

```rust
fn main() {
    let s = String::from("hello");

    let consume = move || {
        println!("{}", s);
    };

    consume();
    // println!("{}", s);  // ❌ Lỗi - s đã move!
}
```

### 3. Type Không Khớp

```rust
fn main() {
    let f = |x| x;

    let s = f(String::from("hi"));
    // let n = f(5);  // ❌ Lỗi - Đã "học" là String
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Tính Tổng Với Closure

Dùng closure và `.fold()` để tính tổng.

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let sum = numbers
        .iter()
        .fold(0, |acc, x| acc + x);

    println!("Tổng: {}", sum);
}
```

**Kết quả:**
```
Tổng: 15
```
</details>

---

### Bài 2: Lọc và Biến Đổi

Từ vec số, lọc số lẻ, bình phương, thu thập kết quả.

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let result: Vec<i32> = numbers
        .iter()
        .filter(|&x| x % 2 != 0)  // Lọc lẻ
        .map(|x| x * x)            // Bình phương
        .collect();

    println!("Gốc: {:?}", numbers);
    println!("Lẻ bình phương: {:?}", result);
}
```

**Kết quả:**
```
Gốc: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Lẻ bình phương: [1, 9, 25, 49, 81]
```
</details>

---

### Bài 3: Counter Closure

Tạo closure đếm số lần gọi.

```rust
fn main() {
    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let mut count = 0;

    let mut counter = || {
        count += 1;
        count
    };

    println!("Lần 1: {}", counter());
    println!("Lần 2: {}", counter());
    println!("Lần 3: {}", counter());
    println!("Lần 4: {}", counter());
}
```

**Kết quả:**
```
Lần 1: 1
Lần 2: 2
Lần 3: 3
Lần 4: 4
```
</details>

---

## 📝 Tóm Tắt

| Khái Niệm | Cú Pháp | Mô Tả |
|-----------|---------|-------|
| Closure cơ bản | `\|x\| x + 1` | Function ẩn danh |
| Capture borrow | `\|\| println!("{}", x)` | Mượn biến |
| Capture mutable | `mut \|\| count += 1` | Mượn mutable |
| Move capture | `move \|\| use(x)` | Lấy ownership |
| With iterators | `.map(\|x\| x * 2)` | Biến đổi |

**Điểm Quan Trọng:**
- ✅ Closures có thể **capture** biến bên ngoài
- ✅ Rust **tự suy luận** kiểu parameters và return
- ✅ Dùng `move` khi cần **ownership**
- ✅ Rất hữu ích với **iterator methods**

---

## 🎯 Khi Nào Dùng Closures?

### ✅ Dùng Closures khi:

1. **Iterator methods** (.map, .filter, .fold)
   ```rust
   vec.iter().map(|x| x * 2).collect()
   ```

2. **Callbacks và event handlers**
   ```rust
   button.on_click(|| println!("Clicked!"));
   ```

3. **Custom behavior**
   ```rust
   vec.sort_by(|a, b| a.cmp(b));
   ```

4. **Lazy evaluation**
   ```rust
   let compute = || expensive_calculation();
   ```

### ❌ Không cần Closures khi:

1. **Function đơn giản không capture**
   ```rust
   // ❌ Không cần closure
   vec.iter().map(|x| double(x))

   // ✅ Dùng function trực tiếp
   vec.iter().map(double)
   ```

2. **Tái sử dụng nhiều nơi** → Dùng function thường

---

## 🎯 Bước Tiếp Theo

Bạn đã hiểu Functions và Closures rồi! 🎉 Tiếp theo, chúng ta sẽ học về **String Manipulation** - xử lý chuỗi trong Rust! 📝

➡️ **Tiếp theo**: [Làm Việc Với Chuỗi](string-methods)
