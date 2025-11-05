---
sidebar_position: 1
title: "Ownership: Chỉ Có Một Chủ!"
description: "Hiểu về Ownership - trái tim của Rust. Học 3 quy tắc ownership, move semantics, scope và drop. Đây là khái niệm quan trọng nhất!"
keywords: [rust ownership, rust move semantics, rust memory safety, rust ownership rules, rust drop]
---

# 👑 Ownership: Chỉ Có Một Chủ!

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Hiểu 3 quy tắc ownership cơ bản
- ✅ Biết cách hoạt động của move semantics
- ✅ Hiểu scope và khi nào giá trị bị drop
- ✅ Phân biệt Copy types và Move types
:::

---

## 🤔 Ownership Là Gì?

**Ownership** là tính năng **độc nhất** của Rust - cách quản lý bộ nhớ:

- **Không có Garbage Collector** (khác Java, Python)
- **Không cần quản lý thủ công** (khác C/C++)
- **Compiler kiểm tra** tại compile time
- **Zero cost** - không ảnh hưởng runtime

:::info Ẩn Dụ
Hãy tưởng tượng **ownership** như **sở hữu đất đai**:

🏠 **Quy tắc sở hữu:**
1. Mỗi **mảnh đất** (dữ liệu) có **một chủ sở hữu duy nhất**
2. Khi **chuyển nhượng** (move) → Chủ cũ **mất quyền**
3. Khi **chủ rời đi** (out of scope) → Đất được **thu hồi**

**Đồ bảo hộ an toàn** (Rust) đảm bảo:
- ❌ Không ai dùng đất của người khác
- ❌ Không có tranh chấp quyền sở hữu
- ✅ Bộ nhớ luôn an toàn! 🛡️
:::

---

## 📜 Ba Quy Tắc Ownership

### Quy Tắc 1: Mỗi Giá Trị Có Một Owner

```rust
fn main() {
    let s = String::from("hello");  // s là owner của "hello"
}
```

**Giải thích:**
- Biến `s` **sở hữu** String "hello"
- Chỉ có **một owner** duy nhất
- Owner có **toàn quyền** với giá trị

### Quy Tắc 2: Chỉ Có Một Owner Tại Một Thời Điểm

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;  // ✅ Ownership chuyển sang s2

    // println!("{}", s1);  // ❌ Lỗi - s1 không còn owner!
    println!("{}", s2);     // ✅ OK - s2 là owner
}
```

**Kết quả:**
```
hello
```

### Quy Tắc 3: Khi Owner Out of Scope, Giá Trị Bị Drop

```rust
fn main() {
    {
        let s = String::from("hello");
        println!("{}", s);
    }  // ✅ s out of scope → String bị drop

    // println!("{}", s);  // ❌ Lỗi - s không còn tồn tại
}
```

---

## 🔄 Move Semantics

Khi **gán** hoặc **truyền** giá trị, ownership **chuyển** (move):

### Move Khi Gán

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;  // ✅ s1 move sang s2

    // println!("{}", s1);  // ❌ Lỗi
    println!("{}", s2);     // ✅ OK
}
```

**Điều gì xảy ra?**

```
Trước:  s1 → ["hello"]

Sau:    s1 (invalid)
        s2 → ["hello"]
```

### Move Khi Truyền Vào Function

```rust
fn take_ownership(s: String) {
    println!("Nhận: {}", s);
}  // s bị drop ở đây

fn main() {
    let s = String::from("hello");

    take_ownership(s);  // s move vào function

    // println!("{}", s);  // ❌ Lỗi - s đã move!
}
```

**Kết quả:**
```
Nhận: hello
```

### Move Khi Return

```rust
fn give_ownership() -> String {
    let s = String::from("hello");
    s  // ✅ Return ownership cho caller
}

fn main() {
    let s = give_ownership();  // ✅ Nhận ownership
    println!("{}", s);
}
```

**Kết quả:**
```
hello
```

---

## 📦 Scope và Drop

**Scope** là phạm vi mà biến còn hiệu lực:

```rust
fn main() {
    {
        let s = String::from("hello");  // s bắt đầu scope
        println!("{}", s);
    }  // ✅ s kết thúc scope → drop

    // s không tồn tại nữa
}
```

### Ví Dụ Phức Tạp

```rust
fn main() {
    let s1 = String::from("hello");     // s1 vào scope

    {
        let s2 = String::from("world");  // s2 vào scope
        println!("{} {}", s1, s2);       // Cả hai OK
    }  // s2 drop ở đây

    println!("{}", s1);  // ✅ s1 vẫn OK
    // println!("{}", s2);  // ❌ s2 đã drop
}  // s1 drop ở đây
```

**Kết quả:**
```
hello world
hello
```

---

## 🔢 Copy Types vs Move Types

### Copy Types (Tự Động Copy)

Các kiểu **đơn giản** tự động **copy** thay vì move:

```rust
fn main() {
    let x = 5;
    let y = x;  // ✅ Copy, không move

    println!("x = {}, y = {}", x, y);  // ✅ Cả hai OK
}
```

**Kết quả:**
```
x = 5, y = 5
```

**Copy Types:**
- `i32`, `u32`, `i64`, `f64`, ... (số)
- `bool`
- `char`
- Tuples chỉ chứa Copy types: `(i32, i32)`

### Move Types (Phải Move)

Các kiểu **phức tạp** sẽ move:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;  // ✅ Move, không copy

    // println!("{}", s1);  // ❌ Lỗi
    println!("{}", s2);     // ✅ OK
}
```

**Move Types:**
- `String`
- `Vec<T>`
- Struct (thường)
- Các kiểu không implement `Copy` trait

---

## 🎮 Ví Dụ Thực Tế: Quản Lý Dữ Liệu

```rust
fn process(data: String) {
    println!("Xử lý: {}", data);
}  // data bị drop

fn main() {
    let message = String::from("Important data");

    process(message);  // message move vào function

    // ❌ Không dùng được message nữa
    // println!("{}", message);

    // ✅ Phải tạo mới
    let new_message = String::from("New data");
    println!("{}", new_message);
}
```

**Kết quả:**
```
Xử lý: Important data
New data
```

---

## 🔄 Pattern: Take and Return

Function **nhận ownership** và **trả lại**:

```rust
fn process_and_return(s: String) -> String {
    println!("Xử lý: {}", s);
    s  // ✅ Trả ownership lại
}

fn main() {
    let s1 = String::from("hello");
    let s2 = process_and_return(s1);  // s1 move in, s2 nhận về

    // println!("{}", s1);  // ❌ s1 đã move
    println!("{}", s2);     // ✅ s2 có ownership
}
```

**Kết quả:**
```
Xử lý: hello
hello
```

---

## 🎯 Clone: Copy Thủ Công

Dùng `.clone()` để **sao chép** thay vì move:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();  // ✅ Copy toàn bộ dữ liệu

    println!("s1 = {}, s2 = {}", s1, s2);  // ✅ Cả hai OK
}
```

**Kết quả:**
```
s1 = hello, s2 = hello
```

:::caution Lưu Ý
`.clone()` **tốn kém** (expensive) vì copy toàn bộ dữ liệu!

```rust
let big_data = vec![1; 1_000_000];
let copy = big_data.clone();  // ⚠️ Copy 1 triệu số!
```

Chỉ dùng khi **thực sự cần** hai bản copy độc lập.
:::

---

## 📊 So Sánh: Rust vs Các Ngôn Ngữ Khác

### Java/Python: Garbage Collector

```python
# Python - GC tự động
s1 = "hello"
s2 = s1  # Cả hai trỏ cùng dữ liệu
# GC sẽ dọn khi không còn reference
```

**Nhược điểm:**
- ❌ Overhead runtime (chậm hơn)
- ❌ Pause time unpredictable

### C/C++: Thủ Công

```c
// C - Phải free thủ công
char* s1 = malloc(100);
strcpy(s1, "hello");
// ...
free(s1);  // ❌ Dễ quên → Memory leak
```

**Nhược điểm:**
- ❌ Dễ memory leak
- ❌ Dễ use-after-free
- ❌ Dễ double-free

### Rust: Ownership

```rust
// Rust - Compiler kiểm tra
let s = String::from("hello");
// Tự động drop khi out of scope
```

**Ưu điểm:**
- ✅ Không có GC overhead
- ✅ Không cần free thủ công
- ✅ Compiler đảm bảo an toàn
- ✅ Zero cost!

---

## 💡 Ví Dụ: Vector Ownership

```rust
fn main() {
    let v1 = vec![1, 2, 3];
    let v2 = v1;  // v1 move sang v2

    // println!("{:?}", v1);  // ❌ Lỗi
    println!("{:?}", v2);     // ✅ OK

    // Nếu muốn giữ cả hai
    let v3 = vec![4, 5, 6];
    let v4 = v3.clone();  // ✅ Clone

    println!("{:?}", v3);  // ✅ OK
    println!("{:?}", v4);  // ✅ OK
}
```

**Kết quả:**
```
[1, 2, 3]
[4, 5, 6]
[4, 5, 6]
```

---

## 🎯 Ví Dụ: Tuple Ownership

```rust
fn main() {
    let t1 = (String::from("hello"), 42);
    let t2 = t1;  // ⚠️ Tuple move (vì chứa String)

    // println!("{:?}", t1);  // ❌ Lỗi
    println!("{:?}", t2);     // ✅ OK

    // Copy tuple chỉ chứa Copy types
    let t3 = (1, 2, 3);
    let t4 = t3;  // ✅ Copy

    println!("{:?}", t3);  // ✅ OK
    println!("{:?}", t4);  // ✅ OK
}
```

**Kết quả:**
```
("hello", 42)
(1, 2, 3)
(1, 2, 3)
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Sử Dụng Sau Move

```rust
fn main() {
    let s = String::from("hello");
    let s2 = s;  // s move sang s2

    // ❌ Lỗi compile
    // println!("{}", s);
}
```

**Sửa:** Dùng clone hoặc borrow (bài sau)

```rust
let s = String::from("hello");
let s2 = s.clone();
println!("{}", s);  // ✅ OK
```

### 2. Move Trong Loop

```rust
fn main() {
    let s = String::from("hello");

    for _ in 0..3 {
        // ❌ Lỗi - s move ở lần lặp đầu
        // println!("{}", s);
        // let s2 = s;
    }
}
```

**Sửa:** Dùng reference (bài sau)

### 3. Quên Return Ownership

```rust
fn process(s: String) {
    println!("{}", s);
    // ❌ Quên return s
}

fn main() {
    let s = String::from("hello");
    process(s);
    // s đã mất ownership!
}
```

**Sửa:**

```rust
fn process(s: String) -> String {
    println!("{}", s);
    s  // ✅ Return ownership
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Phân Tích Ownership

Dự đoán code sau compile được không? Tại sao?

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    let s3 = s2;
    println!("{}", s3);
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

**Compile được!** ✅

```rust
fn main() {
    let s1 = String::from("hello");  // s1 owner
    let s2 = s1;                     // s1 → s2 (s1 invalid)
    let s3 = s2;                     // s2 → s3 (s2 invalid)
    println!("{}", s3);              // s3 còn valid
}
```

**Kết quả:**
```
hello
```

Chỉ có `s3` cuối cùng còn ownership.
</details>

---

### Bài 2: Fix Lỗi Ownership

Sửa code sau để compile được:

```rust
fn print_length(s: String) {
    println!("Length: {}", s.len());
}

fn main() {
    let text = String::from("Rust");
    print_length(text);
    print_length(text);  // ❌ Lỗi!
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

**Cách 1: Clone**

```rust
fn print_length(s: String) {
    println!("Length: {}", s.len());
}

fn main() {
    let text = String::from("Rust");
    print_length(text.clone());
    print_length(text.clone());
}
```

**Cách 2: Return ownership**

```rust
fn print_length(s: String) -> String {
    println!("Length: {}", s.len());
    s
}

fn main() {
    let text = String::from("Rust");
    let text = print_length(text);
    let text = print_length(text);
}
```

**Cách 3: Borrow (tốt nhất - học ở bài sau!)**

```rust
fn print_length(s: &String) {
    println!("Length: {}", s.len());
}

fn main() {
    let text = String::from("Rust");
    print_length(&text);
    print_length(&text);
}
```
</details>

---

### Bài 3: Ownership Với Vec

Code sau có compile không?

```rust
fn main() {
    let v = vec![1, 2, 3];
    let v2 = v;
    println!("{}", v[0]);
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

**Không compile!** ❌

```
error[E0382]: borrow of moved value: `v`
```

**Sửa:**

```rust
fn main() {
    let v = vec![1, 2, 3];
    let v2 = v.clone();  // ✅ Clone
    println!("{}", v[0]);
}
```

Hoặc:

```rust
fn main() {
    let v = vec![1, 2, 3];
    let v2 = &v;  // ✅ Borrow
    println!("{}", v[0]);
}
```
</details>

---

## 📝 Tóm Tắt

**Ba Quy Tắc Ownership:**

1. ✅ Mỗi giá trị có **một owner**
2. ✅ Chỉ có **một owner tại một thời điểm**
3. ✅ Owner out of scope → giá trị **drop**

**Move vs Copy:**

| Kiểu | Hành Vi | Ví Dụ |
|------|---------|-------|
| Copy types | Copy tự động | `i32`, `bool`, `char` |
| Move types | Move ownership | `String`, `Vec<T>` |

**Các Khái Niệm:**

- **Move**: Chuyển ownership
- **Clone**: Copy toàn bộ dữ liệu
- **Drop**: Giải phóng bộ nhớ
- **Scope**: Phạm vi hiệu lực

---

## 🎯 Tại Sao Ownership Quan Trọng?

### 1. Memory Safety

```rust
// ✅ Rust - Không thể use-after-free
let s = String::from("hello");
drop(s);  // Drop sớm
// println!("{}", s);  // ❌ Compiler báo lỗi!
```

### 2. No Data Races

```rust
// ✅ Rust - Không thể có data race
// Chỉ một thread có ownership tại một thời điểm
```

### 3. Zero Cost

- Không có GC overhead
- Không có reference counting
- Tất cả check tại **compile time**

---

## 🎯 Bước Tiếp Theo

Ownership giải quyết vấn đề "ai sở hữu dữ liệu", nhưng nếu chỉ muốn **mượn tạm**?

Bài tiếp theo, chúng ta sẽ học **Borrowing** - cách mượn dữ liệu mà không cần lấy ownership! 🔄

➡️ **Tiếp theo**: [Mượn Dữ Liệu: Borrowing](borrowing)

:::tip Lời Khuyên
Ownership là khái niệm **khó nhất** của Rust, nhưng cũng là **quan trọng nhất**!

- 📚 Đọc lại nhiều lần
- 💻 Thực hành nhiều
- 🤔 Suy nghĩ về "ai sở hữu dữ liệu"
- 🎯 Compiler sẽ dạy bạn!

Đừng nản! Mọi người đều mất thời gian để hiểu ownership. 💪
:::
