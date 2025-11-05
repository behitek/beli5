---
sidebar_position: 2
title: 💻 Thuật Ngữ Lập Trình Chung
description: Từ điển các thuật ngữ lập trình cơ bản - variable, function, type, memory, concurrency và nhiều hơn
keywords: [programming, glossary, variable, function, type, compile, runtime, memory, stack, heap, concurrency, parallelism]
---

# 💻 Thuật Ngữ Lập Trình Chung

Các thuật ngữ lập trình cơ bản được giải thích trong ngữ cảnh của Rust và tiếng Việt!

:::tip Dành Cho Ai?
Glossary này phù hợp cho:
- 🌱 **Người mới** - Chưa biết lập trình
- 🔄 **Người chuyển ngôn ngữ** - Đã biết Python/Java, học Rust
- 📚 **Tra cứu nhanh** - Cần refresh kiến thức
:::

---

## A

### Abstraction
**Việt**: Trừu tượng hóa

**ELI5**: Như lái xe - bạn chỉ cần biết vặn chìa khóa, đạp ga, không cần hiểu động cơ hoạt động thế nào! 🚗

**Giải thích**: Ẩn đi chi tiết phức tạp, chỉ để lộ ra interface đơn giản.

```rust
// Abstraction: Người dùng không cần biết cách tính
struct Circle {
    radius: f64,
}

impl Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }
}

fn main() {
    let circle = Circle { radius: 5.0 };
    println!("Diện tích: {}", circle.area()); // Dễ dùng!
}
```

### Algorithm
**Việt**: Thuật toán

**ELI5**: Như công thức nấu ăn - các bước cụ thể để giải quyết vấn đề! 👨‍🍳📋

**Giải thích**: Tập hợp các bước logic để giải quyết một bài toán.

```rust
// Thuật toán tìm số lớn nhất
fn tim_max(numbers: &[i32]) -> Option<i32> {
    let mut max = numbers.first()?;

    for &num in numbers {
        if num > *max {
            max = &num;
        }
    }

    Some(*max)
}
```

### API (Application Programming Interface)
**Việt**: Giao diện lập trình ứng dụng

**ELI5**: Như menu nhà hàng - liệt kê những gì bạn có thể order mà không cần vào bếp! 🍽️

**Giải thích**: Tập hợp functions/methods mà library cung cấp.

```rust
// Vec::new() là API của Vec
let mut v = Vec::new();
v.push(1);          // push() là API
v.pop();            // pop() là API
let len = v.len();  // len() là API
```

### Argument / Parameter
**Việt**: Đối số / Tham số

**ELI5**:
- **Parameter**: Ô trống trên đơn đặt hàng 📝
- **Argument**: Thông tin bạn điền vào ô đó ✍️

**Giải thích**:
- **Parameter**: Biến trong định nghĩa hàm
- **Argument**: Giá trị thực tế khi gọi hàm

```rust
// x, y là parameters
fn cong(x: i32, y: i32) -> i32 {
    x + y
}

fn main() {
    // 5, 3 là arguments
    let ket_qua = cong(5, 3);
    println!("{}", ket_qua);
}
```

### Array
**Việt**: Mảng

**ELI5**: Như dãy tủ locker - mỗi tủ có số thứ tự, cùng kích thước, số lượng cố định! 🗄️

**Giải thích**: Tập hợp các phần tử cùng type, kích thước cố định.

```rust
fn main() {
    // Array: [type; length]
    let numbers: [i32; 5] = [1, 2, 3, 4, 5];

    println!("Phần tử đầu: {}", numbers[0]);
    println!("Độ dài: {}", numbers.len());
}
```

---

## B

### Binary
**Việt**: Nhị phân / File thực thi

**ELI5**: File .exe trên Windows - click vào là chạy! 💿

**Giải thích**: Chương trình đã compile, máy tính có thể chạy trực tiếp.

```bash
# Build binary
cargo build --release
# File binary trong target/release/my_program
```

### Boolean
**Việt**: Kiểu logic / Đúng-Sai

**ELI5**: Như công tắc đèn - chỉ có 2 trạng thái: BẬT hoặc TẮT! 💡

**Giải thích**: Kiểu dữ liệu chỉ có 2 giá trị: `true` hoặc `false`.

```rust
fn main() {
    let dang_mua = true;
    let troi_nang = false;

    if dang_mua {
        println!("Nhớ mang ô!");
    }

    let can_ao = dang_mua || !troi_nang;
}
```

### Bug
**Việt**: Lỗi phần mềm

**ELI5**: Như chính tả sai trong bài văn - code chạy không đúng ý muốn! 🐛

**Giải thích**: Lỗi trong code làm chương trình hoạt động sai.

```rust
// Bug: Quên kiểm tra chia cho 0
fn chia(a: i32, b: i32) -> i32 {
    a / b  // ❌ Bug nếu b = 0!
}

// Fixed:
fn chia_an_toan(a: i32, b: i32) -> Option<i32> {
    if b == 0 {
        None
    } else {
        Some(a / b)
    }
}
```

---

## C

### Compilation / Compiler
**Việt**: Biên dịch / Trình biên dịch

**ELI5**: Như dịch tiếng Việt sang tiếng máy tính - máy mới hiểu được! 🔄💻

**Giải thích**:
- **Compiler**: Chương trình dịch code sang machine code
- **Compilation**: Quá trình dịch

```bash
# rustc là compiler của Rust
rustc main.rs        # Compile file đơn
cargo build          # Compile cả project
```

**Compile-time vs Runtime**:
- **Compile-time**: Khi đang dịch code (bắt lỗi sớm!)
- **Runtime**: Khi chương trình đang chạy

### Concurrency
**Việt**: Đồng thời / Song song

**ELI5**: Như nấu nhiều món cùng lúc - vừa luộc mì, vừa rán trứng, vừa cắt rau! 🍳🥗

**Giải thích**: Nhiều tasks chạy "cùng lúc" (có thể xen kẽ hoặc thực sự song song).

```rust
use std::thread;

fn main() {
    let handle1 = thread::spawn(|| {
        println!("Thread 1 chạy!");
    });

    let handle2 = thread::spawn(|| {
        println!("Thread 2 chạy!");
    });

    handle1.join().unwrap();
    handle2.join().unwrap();
}
```

### Constant
**Việt**: Hằng số

**ELI5**: Như luật vật lý - không bao giờ thay đổi! 🔒

**Giải thích**: Giá trị không thay đổi trong suốt chương trình.

```rust
const MAX_POINTS: u32 = 100_000;
const PI: f64 = 3.14159;

fn main() {
    println!("Max points: {}", MAX_POINTS);
    // MAX_POINTS = 5; // ❌ Lỗi! Không thể thay đổi const
}
```

---

## D

### Data Structure
**Việt**: Cấu trúc dữ liệu

**ELI5**: Như cách tổ chức đồ trong phòng - xếp sách trên kệ, quần áo trong tủ! 📚👔

**Giải thích**: Cách tổ chức và lưu trữ dữ liệu hiệu quả.

```rust
// Vector - Dynamic array
let mut v = vec![1, 2, 3];

// HashMap - Key-value pairs
use std::collections::HashMap;
let mut scores = HashMap::new();
scores.insert("Alice", 100);

// Custom struct
struct Point {
    x: i32,
    y: i32,
}
```

### Debugging
**Việt**: Gỡ lỗi

**ELI5**: Như thám tử tìm hung thủ - tìm xem lỗi ở đâu trong code! 🕵️

**Giải thích**: Quá trình tìm và sửa bugs.

```rust
fn main() {
    let x = 5;
    let y = 10;

    // Debug print
    println!("x = {}, y = {}", x, y);
    dbg!(x);  // Macro debug

    let result = x + y;
    assert_eq!(result, 15); // Kiểm tra kết quả
}
```

### Declaration
**Việt**: Khai báo

**ELI5**: Như giới thiệu bạn mới - "Đây là Minh, 20 tuổi"! 👋

**Giải thích**: Báo với compiler về sự tồn tại của biến/hàm.

```rust
// Khai báo biến
let x: i32;

// Khai báo và khởi tạo
let y: i32 = 5;

// Khai báo hàm
fn greet(name: &str) {
    println!("Hello, {}", name);
}
```

---

## E

### Expression
**Việt**: Biểu thức

**ELI5**: Như phép tính toán - có kết quả trả về! ➕✅

**Giải thích**: Đoạn code trả về một giá trị.

```rust
fn main() {
    // Expressions - có giá trị trả về
    let x = 5;              // 5 là expression
    let y = x + 1;          // x + 1 là expression

    let z = {               // Block cũng là expression!
        let a = 3;
        a + 2               // Return 5 (không có dấu ;)
    };

    println!("z = {}", z);  // 5
}
```

**Expression vs Statement**:
```rust
let x = 5;      // Statement - không trả về giá trị
x + 1           // Expression - trả về 6
```

---

## F

### Function
**Việt**: Hàm

**ELI5**: Như máy ép trái cây - cho vào cam, ra nước cam! 🍊➡️🥤

**Giải thích**: Block code có tên, có thể gọi lại nhiều lần.

```rust
// Định nghĩa hàm
fn tinh_dien_tich(dai: f64, rong: f64) -> f64 {
    dai * rong
}

fn main() {
    let dt = tinh_dien_tich(5.0, 3.0);
    println!("Diện tích: {}", dt);
}
```

**Các loại hàm**:
- **Function**: Hàm độc lập
- **Method**: Hàm thuộc struct/enum
- **Associated function**: Hàm gắn với type (như `String::new()`)

---

## G

### Generic
**Việt**: Tổng quát / Kiểu tổng quát

**ELI5**: Như hộp đựng đồ vạn năng - đựng được sách, bút, đồ chơi, gì cũng được! 📦

**Giải thích**: Viết code hoạt động với nhiều types khác nhau.

```rust
// Generic function - hoạt động với mọi type T
fn print_it<T: std::fmt::Display>(item: T) {
    println!("{}", item);
}

fn main() {
    print_it(5);           // T = i32
    print_it("Hello");     // T = &str
    print_it(3.14);        // T = f64
}
```

---

## H

### Hash / Hash Function
**Việt**: Hàm băm

**ELI5**: Như chuyển tên thành số điện thoại - mỗi người một số duy nhất! 📱

**Giải thích**: Chuyển đổi dữ liệu thành một số cố định.

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();

    // "Alice" được hash thành một số
    map.insert("Alice", 100);
    map.insert("Bob", 80);

    println!("{:?}", map.get("Alice"));
}
```

### Heap
**Việt**: Vùng nhớ heap / Đống

**ELI5**: Như kho chứa lớn - để đồ lâu dài, kích thước bất kỳ! 🏗️

**Giải thích**: Vùng nhớ động, cấp phát/giải phóng thủ công (trong Rust tự động qua ownership).

```rust
fn main() {
    // String được lưu trên heap (kích thước không biết trước)
    let s = String::from("hello");

    // Vec cũng lưu trên heap
    let v = vec![1, 2, 3, 4, 5];
}
```

**Heap vs Stack**:
| Stack | Heap |
|-------|------|
| Nhanh | Chậm hơn |
| Kích thước cố định | Kích thước linh hoạt |
| LIFO (Last In First Out) | Truy cập ngẫu nhiên |
| i32, bool, &str | String, Vec, Box |

---

## I

### Immutable
**Việt**: Không thay đổi / Bất biến

**ELI5**: Như viết bằng bút mực - không xóa được! 🖊️

**Giải thích**: Biến không thể thay đổi sau khi khởi tạo.

```rust
fn main() {
    let x = 5;
    // x = 6;  // ❌ Lỗi! x immutable

    let mut y = 5;
    y = 6;     // ✅ OK! y mutable
}
```

### Index
**Việt**: Chỉ số / Vị trí

**ELI5**: Như số nhà - nhà số 0, số 1, số 2... 🏠

**Giải thích**: Vị trí của phần tử trong collection (bắt đầu từ 0).

```rust
fn main() {
    let arr = [10, 20, 30, 40, 50];

    println!("Index 0: {}", arr[0]);  // 10
    println!("Index 2: {}", arr[2]);  // 30
}
```

### Iterator
**Việt**: Bộ lặp

**ELI5**: Như băng chuyền sushi - từng món một đi qua! 🍣➡️

**Giải thích**: Cách duyệt qua các phần tử trong collection.

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Dùng iterator
    for num in numbers.iter() {
        println!("{}", num);
    }

    // Iterator methods
    let sum: i32 = numbers.iter().sum();
    let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();
}
```

---

## L

### Library / Crate
**Việt**: Thư viện

**ELI5**: Như siêu thị - có sẵn nhiều thứ, không cần tự làm! 🛒

**Giải thích**: Code đã viết sẵn, có thể tái sử dụng.

```toml
# Cargo.toml
[dependencies]
serde = "1.0"       # Serialization library
tokio = "1.0"       # Async runtime
reqwest = "0.11"    # HTTP client
```

### Loop
**Việt**: Vòng lặp

**ELI5**: Như chạy bộ quanh sân - chạy vòng đi vòng lại! 🏃‍♂️🔄

**Giải thích**: Lặp lại một đoạn code nhiều lần.

```rust
// loop - Lặp vô hạn
loop {
    println!("Mãi mãi!");
    break; // Thoát
}

// while - Lặp khi điều kiện đúng
let mut i = 0;
while i < 5 {
    println!("{}", i);
    i += 1;
}

// for - Lặp qua collection
for num in 1..=5 {
    println!("{}", num);
}
```

---

## M

### Memory
**Việt**: Bộ nhớ

**ELI5**: Như RAM trong máy tính - nơi lưu trữ tạm thời! 💾

**Giải thích**: Nơi chương trình lưu dữ liệu khi chạy.

**Loại memory**:
- **Stack**: Nhanh, nhỏ, tự động dọn dẹp
- **Heap**: Chậm hơn, lớn, cần quản lý (Rust tự động)

### Method
**Việt**: Phương thức

**ELI5**: Như kỹ năng của nhân vật game - mỗi nhân vật có kỹ năng riêng! 🎮⚔️

**Giải thích**: Function thuộc về một struct/enum.

```rust
struct Dog {
    name: String,
}

impl Dog {
    // Method - có self
    fn bark(&self) {
        println!("{} says: Gâu gâu!", self.name);
    }

    // Associated function - không có self
    fn new(name: String) -> Dog {
        Dog { name }
    }
}

fn main() {
    let dog = Dog::new("Lulu".to_string());
    dog.bark();  // Gọi method
}
```

### Mutable
**Việt**: Có thể thay đổi

**ELI5**: Như viết bằng bút chì - xóa và viết lại được! ✏️

**Giải thích**: Biến có thể thay đổi giá trị.

```rust
fn main() {
    let mut x = 5;
    println!("x = {}", x);

    x = 10;  // ✅ OK vì có `mut`
    println!("x = {}", x);
}
```

---

## N

### Null / None
**Việt**: Rỗng / Không có giá trị

**ELI5**: Như hộp quà rỗng - mở ra không có gì! 🎁❌

**Giải thích**:
- Rust **KHÔNG CÓ null**!
- Dùng `Option<T>` để biểu thị có thể không có giá trị

```rust
fn main() {
    let some_number: Option<i32> = Some(5);
    let no_number: Option<i32> = None;

    match some_number {
        Some(n) => println!("Có số: {}", n),
        None => println!("Không có gì"),
    }
}
```

---

## O

### Object
**Việt**: Đối tượng

**ELI5**: Như một con robot - có thuộc tính (màu sắc, kích thước) và hành động (đi, nói)! 🤖

**Giải thích**: Instance của một struct/class.

```rust
struct Robot {
    name: String,
    battery: u32,
}

impl Robot {
    fn say_hello(&self) {
        println!("Tôi là {}!", self.name);
    }
}

fn main() {
    let my_robot = Robot {
        name: "R2D2".to_string(),
        battery: 100,
    };

    my_robot.say_hello();
}
```

---

## P

### Parallelism
**Việt**: Song song thực sự

**ELI5**: Như 4 người cùng xây nhà - thật sự làm cùng lúc! 👷👷👷👷

**Giải thích**: Nhiều tasks chạy ĐỒNG THỜI trên nhiều CPU cores.

```rust
use rayon::prelude::*;

fn main() {
    let numbers: Vec<i32> = (1..1000).collect();

    // Parallel processing
    let sum: i32 = numbers.par_iter().sum();
    println!("Tổng: {}", sum);
}
```

**Concurrency vs Parallelism**:
- **Concurrency**: Xen kẽ (1 CPU làm nhiều việc)
- **Parallelism**: Đồng thời (nhiều CPU làm cùng lúc)

### Pointer / Reference
**Việt**: Con trỏ / Tham chiếu

**ELI5**: Như địa chỉ nhà - không phải cái nhà, mà là chỉ dẫn đến nhà! 🏠📍

**Giải thích**:
- **Pointer**: Địa chỉ trong memory
- **Reference**: Pointer an toàn trong Rust

```rust
fn main() {
    let x = 5;
    let r = &x;  // r là reference đến x

    println!("x = {}", x);
    println!("r = {}", r);   // Tự động dereference
    println!("*r = {}", *r); // Explicit dereference
}
```

---

## R

### Recursion
**Việt**: Đệ quy

**ELI5**: Như búp bê Nga - trong búp bê lại có búp bê nhỏ hơn! 🪆

**Giải thích**: Hàm gọi chính nó.

```rust
fn giai_thua(n: u32) -> u32 {
    if n == 0 {
        1  // Base case
    } else {
        n * giai_thua(n - 1)  // Recursive case
    }
}

fn main() {
    println!("5! = {}", giai_thua(5));  // 120
}
```

### Runtime
**Việt**: Thời gian chạy

**ELI5**: Khi chương trình đang chạy trên máy! ⚡

**Giải thích**:
1. Thời điểm chương trình đang thực thi
2. Môi trường hỗ trợ chương trình chạy (như Tokio runtime)

```rust
// Runtime error - chỉ xảy ra khi chạy
fn main() {
    let v = vec![1, 2, 3];
    // let x = v[10];  // Panic tại runtime!

    // An toàn hơn:
    match v.get(10) {
        Some(x) => println!("{}", x),
        None => println!("Index không hợp lệ"),
    }
}
```

---

## S

### Scope
**Việt**: Phạm vi / Vùng

**ELI5**: Như phạm vi Wi-Fi - ra khỏi phòng thì mất sóng! 📶

**Giải thích**: Vùng code mà biến còn tồn tại và có thể dùng.

```rust
fn main() {
    {
        let x = 5;
        println!("Trong scope: {}", x);
    } // x dropped here

    // println!("{}", x); // ❌ Lỗi! x out of scope
}
```

### Stack
**Việt**: Ngăn xếp

**ELI5**: Như chồng đĩa - bỏ vào cuối, lấy ra cũng từ cuối! 🍽️

**Giải thích**: Vùng nhớ LIFO (Last In First Out), nhanh, kích thước cố định.

```rust
fn main() {
    let a = 5;        // Lưu trên stack
    let b = true;     // Lưu trên stack
    let c = 'x';      // Lưu trên stack

    // Khi function kết thúc, stack tự động dọn dẹp
}
```

### Statement
**Việt**: Câu lệnh

**ELI5**: Như câu mệnh lệnh - làm việc gì đó nhưng không trả về kết quả! 📣

**Giải thích**: Đoạn code thực hiện action nhưng không trả về giá trị.

```rust
fn main() {
    let x = 5;              // Statement
    println!("Hello");      // Statement

    let y = {
        let z = 3;          // Statement
        z + 1               // Expression (return 4)
    };
}
```

### String
**Việt**: Chuỗi ký tự

**ELI5**: Như dãy chữ cái viết liền nhau! 🔤

**Giải thích**: Dữ liệu văn bản.

```rust
fn main() {
    // String - heap allocated, có thể thay đổi
    let mut s1 = String::from("Hello");
    s1.push_str(", world!");

    // &str - string slice, immutable
    let s2: &str = "Hello, world!";
}
```

---

## T

### Type
**Việt**: Kiểu dữ liệu

**ELI5**: Như phân loại đồ vật - số, chữ, đúng/sai! 🔢🔤✅

**Giải thích**: Định nghĩa loại dữ liệu và operations có thể làm.

```rust
fn main() {
    let num: i32 = 5;           // Integer type
    let pi: f64 = 3.14;         // Float type
    let is_rust_cool: bool = true;  // Boolean type
    let letter: char = 'A';     // Character type
    let text: &str = "Hello";   // String slice type
}
```

**Type inference**: Rust tự suy luận type
```rust
let x = 5;        // Rust biết x là i32
let y = 3.14;     // Rust biết y là f64
```

---

## V

### Variable
**Việt**: Biến

**ELI5**: Như cái hộp có tên, bỏ đồ vào để dùng sau! 📦

**Giải thích**: Nơi lưu trữ dữ liệu có tên.

```rust
fn main() {
    // Immutable variable
    let x = 5;

    // Mutable variable
    let mut y = 10;
    y = 20;

    // Type annotation
    let z: i32 = 100;
}
```

---

## 📊 Bảng So Sánh Các Khái Niệm

### Memory: Stack vs Heap

| Stack | Heap |
|-------|------|
| ⚡ Nhanh | 🐌 Chậm hơn |
| 📏 Kích thước cố định | 📐 Kích thước linh hoạt |
| 🔄 LIFO | 🎯 Random access |
| `i32`, `bool`, `&T` | `String`, `Vec`, `Box` |

### Compile-time vs Runtime

| Compile-time | Runtime |
|--------------|---------|
| 🔧 Khi đang build | ▶️ Khi chương trình chạy |
| 🛡️ Bắt lỗi sớm | ⚠️ Lỗi khó đoán hơn |
| `type errors`, `borrow errors` | `panic!`, `division by zero` |

---

## 🎯 Các Thuật Ngữ Quan Trọng Nhất

:::info Top 10 Phải Biết
1. **Variable** - Biến
2. **Function** - Hàm
3. **Type** - Kiểu dữ liệu
4. **Loop** - Vòng lặp
5. **Condition** (if/else) - Điều kiện
6. **Array/Vector** - Mảng
7. **Compiler** - Trình biên dịch
8. **Memory** (Stack/Heap) - Bộ nhớ
9. **Error** - Lỗi
10. **Library** - Thư viện
:::

---

## 💡 Tips Học Thuật Ngữ

:::tip Mẹo Nhớ Lâu
1. **Liên tưởng** - Gắn với hình ảnh đời thường
2. **Thực hành** - Dùng trong code thực tế
3. **Dạy lại** - Giải thích cho người khác
4. **So sánh** - So với ngôn ngữ đã biết
:::

---

**Tiếp theo**: Tìm hiểu [Cấu Trúc Dữ Liệu](./data-structures) 📦
