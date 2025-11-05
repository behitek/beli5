---
sidebar_position: 8
title: "Option: Có Hoặc Không Có"
description: "Tìm hiểu cách xử lý giá trị có thể không tồn tại với Option<T>"
---

# 🎁 Option: Có Hoặc Không Có

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được `Option<T>` là gì và tại sao không có `null`
- ✅ Sử dụng `Some(T)` và `None`
- ✅ Pattern matching với `Option`
- ✅ Dùng methods: `unwrap()`, `expect()`, `unwrap_or()`
- ✅ Áp dụng `map()`, `and_then()`, `filter()`
- ✅ Xử lý `Option` an toàn trong code thực tế

## 🤔 Option Là Gì?

### Ẩn Dụ Cuộc Sống: Hộp Quà Bí Ẩn

**Option** giống như **hộp quà có thể rỗng**:

🎁 **Hộp Quà**:
- Có thể **chứa quà** (Some) → Mở ra thấy món đồ
- Có thể **rỗng** (None) → Mở ra không có gì
- Phải **kiểm tra** trước khi dùng

🎁 **Option<T> Trong Rust**:
- `Some(value)` → Có giá trị
- `None` → Không có gì
- **Phải xử lý cả 2 cases**

### Tại Sao Không Có `null`?

Nhiều ngôn ngữ có `null`:

```javascript
// JavaScript - Lỗi runtime!
let user = null;
console.log(user.name);  // TypeError: Cannot read property 'name' of null
```

**Vấn đề với `null`**:
- ❌ Dễ quên kiểm tra
- ❌ Lỗi runtime khó debug
- ❌ "Billion-dollar mistake" - Tony Hoare

**Rust dùng `Option`**:
- ✅ Compiler **bắt buộc** xử lý
- ✅ Lỗi bắt được lúc compile
- ✅ Type-safe

## 📦 Định Nghĩa Option

```rust
enum Option<T> {
    Some(T),
    None,
}
```

**Giải thích**:
- `Option<T>` → Generic enum
- `Some(T)` → Chứa giá trị kiểu `T`
- `None` → Không có giá trị

### Tạo Option

```rust
fn main() {
    // Some - có giá trị
    let some_number: Option<i32> = Some(5);
    let some_string: Option<String> = Some(String::from("Hello"));

    // None - không có giá trị
    let absent_number: Option<i32> = None;

    println!("{:?}", some_number);
    println!("{:?}", absent_number);
}
```

**Đầu ra**:
```
Some(5)
None
```

## 🎯 Pattern Matching

### Match Expression

```rust
fn main() {
    let x: Option<i32> = Some(5);

    match x {
        Some(value) => println!("Có giá trị: {}", value),
        None => println!("Không có gì"),
    }

    let y: Option<i32> = None;

    match y {
        Some(value) => println!("Có giá trị: {}", value),
        None => println!("Không có gì"),
    }
}
```

**Đầu ra**:
```
Có giá trị: 5
Không có gì
```

### If Let

```rust
fn main() {
    let number = Some(7);

    // If let - chỉ quan tâm case Some
    if let Some(n) = number {
        println!("Số: {}", n);
    } else {
        println!("Không có số");
    }
}
```

### While Let

```rust
fn main() {
    let mut stack = vec![1, 2, 3, 4, 5];

    while let Some(top) = stack.pop() {
        println!("{}", top);
    }
}
```

**Đầu ra**:
```
5
4
3
2
1
```

## 🛠️ Methods Cơ Bản

### `unwrap()` - Lấy Giá Trị (Nguy Hiểm!)

```rust
fn main() {
    let x = Some(5);
    println!("{}", x.unwrap());  // OK: 5

    let y: Option<i32> = None;
    // println!("{}", y.unwrap());  // ❌ PANIC!
}
```

**Cảnh báo**: Chỉ dùng khi **chắc chắn** có giá trị!

### `expect()` - Unwrap Với Message

```rust
fn main() {
    let x = Some("value");
    println!("{}", x.expect("Phải có giá trị!"));

    let y: Option<&str> = None;
    // println!("{}", y.expect("Lỗi: Không có giá trị!"));  // PANIC với message
}
```

### `is_some()` và `is_none()`

```rust
fn main() {
    let x = Some(2);

    if x.is_some() {
        println!("x có giá trị");
    }

    let y: Option<i32> = None;

    if y.is_none() {
        println!("y không có giá trị");
    }
}
```

### `unwrap_or()` - Giá Trị Mặc Định

```rust
fn main() {
    let x = Some(5);
    println!("{}", x.unwrap_or(0));  // 5

    let y: Option<i32> = None;
    println!("{}", y.unwrap_or(0));  // 0 (default)
}
```

**Đầu ra**:
```
5
0
```

### `unwrap_or_else()` - Giá Trị Từ Closure

```rust
fn main() {
    let x: Option<i32> = None;

    let value = x.unwrap_or_else(|| {
        println!("Tính toán giá trị mặc định");
        100
    });

    println!("{}", value);
}
```

**Đầu ra**:
```
Tính toán giá trị mặc định
100
```

### `unwrap_or_default()` - Default Trait

```rust
fn main() {
    let x: Option<i32> = None;
    println!("{}", x.unwrap_or_default());  // 0

    let y: Option<String> = None;
    println!("{}", y.unwrap_or_default());  // ""
}
```

## 🔄 Transform Methods

### `map()` - Biến Đổi Giá Trị

```rust
fn main() {
    let x = Some(5);

    // Nhân đôi nếu có giá trị
    let doubled = x.map(|n| n * 2);

    println!("{:?}", doubled);  // Some(10)

    let y: Option<i32> = None;
    let doubled_none = y.map(|n| n * 2);

    println!("{:?}", doubled_none);  // None
}
```

### `map_or()` - Map Với Default

```rust
fn main() {
    let x = Some("hello");

    let len = x.map_or(0, |s| s.len());
    println!("{}", len);  // 5

    let y: Option<&str> = None;
    let len_none = y.map_or(0, |s| s.len());
    println!("{}", len_none);  // 0
}
```

### `and_then()` - Chainable Operations

```rust
fn main() {
    fn square(x: i32) -> Option<i32> {
        Some(x * x)
    }

    let x = Some(2);

    let result = x.and_then(square).and_then(square);

    println!("{:?}", result);  // Some(16) - (2^2)^2
}
```

### `filter()` - Lọc Giá Trị

```rust
fn main() {
    fn is_even(n: &i32) -> bool {
        n % 2 == 0
    }

    let x = Some(4);
    println!("{:?}", x.filter(is_even));  // Some(4)

    let y = Some(5);
    println!("{:?}", y.filter(is_even));  // None
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Tìm Kiếm Trong Vector

```rust
fn main() {
    let numbers = vec![10, 20, 30, 40, 50];

    // first() trả về Option<&i32>
    match numbers.first() {
        Some(&n) => println!("Đầu tiên: {}", n),
        None => println!("Vector rỗng"),
    }

    // get() trả về Option<&i32>
    match numbers.get(2) {
        Some(&n) => println!("Index 2: {}", n),
        None => println!("Index không hợp lệ"),
    }

    match numbers.get(10) {
        Some(&n) => println!("Index 10: {}", n),
        None => println!("Index không hợp lệ"),
    }
}
```

**Đầu ra**:
```
Đầu tiên: 10
Index 2: 30
Index không hợp lệ
```

### Ví Dụ 2: Tìm User Theo ID

```rust
struct User {
    id: u32,
    name: String,
}

fn find_user(users: &[User], id: u32) -> Option<&User> {
    users.iter().find(|user| user.id == id)
}

fn main() {
    let users = vec![
        User { id: 1, name: String::from("An") },
        User { id: 2, name: String::from("Bình") },
        User { id: 3, name: String::from("Chi") },
    ];

    match find_user(&users, 2) {
        Some(user) => println!("Tìm thấy: {}", user.name),
        None => println!("Không tìm thấy user"),
    }

    match find_user(&users, 99) {
        Some(user) => println!("Tìm thấy: {}", user.name),
        None => println!("Không tìm thấy user"),
    }
}
```

**Đầu ra**:
```
Tìm thấy: Bình
Không tìm thấy user
```

### Ví Dụ 3: Parse String To Number

```rust
fn main() {
    let num_str = "42";

    // parse() trả về Result, ok() chuyển thành Option
    let number: Option<i32> = num_str.parse().ok();

    match number {
        Some(n) => println!("Số: {}", n),
        None => println!("Parse lỗi"),
    }

    let invalid = "abc";
    let invalid_number: Option<i32> = invalid.parse().ok();

    if invalid_number.is_none() {
        println!("'{}' không phải số", invalid);
    }
}
```

**Đầu ra**:
```
Số: 42
'abc' không phải số
```

### Ví Dụ 4: Configuration

```rust
struct Config {
    host: String,
    port: Option<u16>,
    timeout: Option<u32>,
}

impl Config {
    fn new(host: String) -> Config {
        Config {
            host,
            port: None,
            timeout: None,
        }
    }

    fn get_port(&self) -> u16 {
        self.port.unwrap_or(8080)  // Default port
    }

    fn get_timeout(&self) -> u32 {
        self.timeout.unwrap_or(30)  // Default 30s
    }
}

fn main() {
    let config1 = Config::new(String::from("localhost"));
    println!("Host: {}, Port: {}", config1.host, config1.get_port());

    let mut config2 = Config::new(String::from("example.com"));
    config2.port = Some(3000);
    config2.timeout = Some(60);

    println!("Host: {}, Port: {}, Timeout: {}",
        config2.host, config2.get_port(), config2.get_timeout());
}
```

**Đầu ra**:
```
Host: localhost, Port: 8080
Host: example.com, Port: 3000, Timeout: 60
```

### Ví Dụ 5: Division

```rust
fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}

fn main() {
    let result1 = divide(10.0, 2.0);
    println!("{:?}", result1);  // Some(5.0)

    let result2 = divide(10.0, 0.0);
    println!("{:?}", result2);  // None

    // Sử dụng map
    let doubled = divide(10.0, 2.0).map(|x| x * 2.0);
    println!("{:?}", doubled);  // Some(10.0)

    // Chain operations
    let result = divide(100.0, 2.0)
        .and_then(|x| divide(x, 5.0))
        .and_then(|x| divide(x, 2.0));

    println!("{:?}", result);  // Some(5.0) - 100/2/5/2
}
```

**Đầu ra**:
```
Some(5.0)
None
Some(10.0)
Some(5.0)
```

### Ví Dụ 6: Shopping Cart

```rust
struct Product {
    name: String,
    price: f64,
}

struct Cart {
    items: Vec<Product>,
}

impl Cart {
    fn new() -> Cart {
        Cart { items: Vec::new() }
    }

    fn add(&mut self, product: Product) {
        self.items.push(product);
    }

    fn find_product(&self, name: &str) -> Option<&Product> {
        self.items.iter().find(|p| p.name == name)
    }

    fn get_price(&self, name: &str) -> Option<f64> {
        self.find_product(name).map(|p| p.price)
    }

    fn total(&self) -> f64 {
        self.items.iter().map(|p| p.price).sum()
    }
}

fn main() {
    let mut cart = Cart::new();

    cart.add(Product { name: String::from("Laptop"), price: 1000.0 });
    cart.add(Product { name: String::from("Mouse"), price: 25.0 });
    cart.add(Product { name: String::from("Keyboard"), price: 75.0 });

    // Tìm sản phẩm
    if let Some(product) = cart.find_product("Mouse") {
        println!("Tìm thấy: {} - ${}", product.name, product.price);
    }

    // Lấy giá
    let price = cart.get_price("Laptop").unwrap_or(0.0);
    println!("Giá Laptop: ${}", price);

    // Tổng
    println!("Tổng: ${}", cart.total());
}
```

**Đầu ra**:
```
Tìm thấy: Mouse - $25
Giá Laptop: $1000
Tổng: $1100
```

## 🔗 Combining Options

### `?` Operator (Preview)

```rust
fn add_options(a: Option<i32>, b: Option<i32>) -> Option<i32> {
    Some(a? + b?)
}

fn main() {
    println!("{:?}", add_options(Some(5), Some(10)));  // Some(15)
    println!("{:?}", add_options(Some(5), None));      // None
}
```

### `zip()` - Combine Two Options

```rust
fn main() {
    let x = Some(1);
    let y = Some(2);

    let zipped = x.zip(y);
    println!("{:?}", zipped);  // Some((1, 2))

    let x2 = Some(1);
    let y2: Option<i32> = None;

    let zipped2 = x2.zip(y2);
    println!("{:?}", zipped2);  // None
}
```

### `or()` - Fallback

```rust
fn main() {
    let x = Some(2);
    let y = None;

    println!("{:?}", x.or(y));  // Some(2)
    println!("{:?}", y.or(x));  // Some(2)

    let a: Option<i32> = None;
    let b: Option<i32> = None;
    println!("{:?}", a.or(b));  // None
}
```

## 🚫 Lỗi Thường Gặp

### Lỗi 1: Unwrap Trên None

```rust
fn main() {
    let x: Option<i32> = None;
    // let value = x.unwrap();  // ❌ PANIC!

    // ✅ Dùng unwrap_or hoặc match
    let value = x.unwrap_or(0);
    println!("{}", value);
}
```

### Lỗi 2: Không Xử Lý None Case

```rust
fn main() {
    let numbers = vec![1, 2, 3];

    // ❌ Sai - có thể panic
    // let first = numbers.first().unwrap();

    // ✅ Đúng
    match numbers.first() {
        Some(n) => println!("First: {}", n),
        None => println!("Empty vector"),
    }
}
```

### Lỗi 3: Quên Dereference

```rust
fn main() {
    let x = Some(5);

    match x {
        // ❌ Lỗi - n có kiểu &i32, không thể + trực tiếp
        // Some(n) => println!("{}", n + 1),

        // ✅ Đúng - dùng &n để borrow
        Some(&n) => println!("{}", n + 1),

        None => println!("None"),
    }
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Safe Division

```rust
fn safe_divide(a: i32, b: i32) -> Option<i32> {
    // TODO: Trả về Some(a/b) nếu b != 0, None nếu b == 0
}

fn main() {
    println!("{:?}", safe_divide(10, 2));
    println!("{:?}", safe_divide(10, 0));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn safe_divide(a: i32, b: i32) -> Option<i32> {
    if b == 0 {
        None
    } else {
        Some(a / b)
    }
}
```
</details>

### Bài 2: Find Max

```rust
fn find_max(numbers: &[i32]) -> Option<i32> {
    // TODO: Tìm số lớn nhất, None nếu slice rỗng
}

fn main() {
    let nums = vec![3, 7, 2, 9, 1];
    println!("{:?}", find_max(&nums));

    let empty: Vec<i32> = vec![];
    println!("{:?}", find_max(&empty));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn find_max(numbers: &[i32]) -> Option<i32> {
    if numbers.is_empty() {
        None
    } else {
        Some(*numbers.iter().max().unwrap())
    }
}
```
</details>

### Bài 3: Get Username

```rust
struct User {
    name: Option<String>,
}

fn get_display_name(user: &User) -> String {
    // TODO: Trả về name nếu có, "Guest" nếu không
}

fn main() {
    let user1 = User { name: Some(String::from("Alice")) };
    let user2 = User { name: None };

    println!("{}", get_display_name(&user1));
    println!("{}", get_display_name(&user2));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn get_display_name(user: &User) -> String {
    user.name.clone().unwrap_or(String::from("Guest"))
}
```
</details>

### Bài 4: Chain Operations

```rust
fn double(x: i32) -> Option<i32> {
    Some(x * 2)
}

fn add_one(x: i32) -> Option<i32> {
    Some(x + 1)
}

fn main() {
    let x = Some(5);

    // TODO: Chain double và add_one
    let result = /* TODO */;

    println!("{:?}", result);  // Should be Some(11)
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let x = Some(5);

    let result = x.and_then(double).and_then(add_one);

    println!("{:?}", result);  // Some(11): (5 * 2) + 1
}
```
</details>

## 🎯 Tóm Tắt

| Method | Cú Pháp | Kết Quả |
|--------|---------|---------|
| **`unwrap()`** | `opt.unwrap()` | Giá trị hoặc panic |
| **`expect()`** | `opt.expect("msg")` | Giá trị hoặc panic với msg |
| **`unwrap_or()`** | `opt.unwrap_or(default)` | Giá trị hoặc default |
| **`is_some()`** | `opt.is_some()` | `true` nếu Some |
| **`is_none()`** | `opt.is_none()` | `true` nếu None |
| **`map()`** | `opt.map(f)` | Transform giá trị |
| **`and_then()`** | `opt.and_then(f)` | Chain operations |
| **`filter()`** | `opt.filter(predicate)` | Lọc giá trị |

**Quy tắc vàng**:
- ✅ Dùng `Option<T>` thay vì `null`
- ✅ Luôn xử lý cả `Some` và `None`
- ✅ Tránh `unwrap()` - dùng `unwrap_or()` hoặc `match`
- ✅ Dùng `map()` và `and_then()` để chain operations
- ✅ `?` operator để propagate None

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Option](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html#the-option-enum-and-its-advantages-over-null-values)
- [Rust Std - Option](https://doc.rust-lang.org/std/option/enum.Option.html)

---

**Bài tiếp theo**: [Result →](./result.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Result** - cách xử lý operations có thể thất bại!
