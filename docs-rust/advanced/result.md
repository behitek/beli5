---
sidebar_position: 9
title: "Result: Thành Công Hay Lỗi?"
description: "Tìm hiểu cách xử lý operations có thể thất bại với Result<T, E>"
---

# ✅ Result: Thành Công Hay Lỗi?

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được `Result<T, E>` là gì và khi nào dùng
- ✅ Sử dụng `Ok(T)` và `Err(E)`
- ✅ Pattern matching với `Result`
- ✅ Dùng `?` operator để propagate errors
- ✅ Áp dụng methods: `unwrap()`, `expect()`, `map()`, `and_then()`
- ✅ Tạo custom error types
- ✅ Xử lý errors trong code thực tế

## 🤔 Result Là Gì?

### Ẩn Dụ Cuộc Sống: Gửi Thư

**Result** giống như **gửi thư qua bưu điện**:

📮 **Gửi Thư**:
- **Thành công** → Nhận được xác nhận gửi
- **Thất bại** → Nhận lý do (địa chỉ sai, thiếu tem, ...)
- Luôn có **kết quả rõ ràng**

✅ **`Result<T, E>` Trong Rust**:
- `Ok(value)` → Thành công với giá trị
- `Err(error)` → Thất bại với lỗi
- **Phải xử lý cả 2 cases**

### Result vs Option

| Đặc điểm | `Option<T>` | `Result<T, E>` |
|----------|-----------|--------------|
| **Biểu diễn** | Có/Không có | Thành công/Thất bại |
| **Success** | `Some(T)` | `Ok(T)` |
| **Failure** | `None` | `Err(E)` |
| **Thông tin lỗi** | Không | Có (E) |
| **Dùng khi** | Giá trị có thể null | Operation có thể fail |

## 📦 Định Nghĩa Result

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

**Giải thích**:
- `Result<T, E>` → Generic enum với 2 type parameters
- `Ok(T)` → Success với giá trị kiểu `T`
- `Err(E)` → Failure với error kiểu `E`

### Tạo Result

```rust
fn main() {
    // Ok - thành công
    let success: Result<i32, String> = Ok(42);
    println!("{:?}", success);

    // Err - thất bại
    let failure: Result<i32, String> = Err(String::from("Có lỗi xảy ra"));
    println!("{:?}", failure);
}
```

**Đầu ra**:
```
Ok(42)
Err("Có lỗi xảy ra")
```

## 🎯 Pattern Matching

### Match Expression

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Chia cho 0!"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    let result1 = divide(10.0, 2.0);

    match result1 {
        Ok(value) => println!("Kết quả: {}", value),
        Err(error) => println!("Lỗi: {}", error),
    }

    let result2 = divide(10.0, 0.0);

    match result2 {
        Ok(value) => println!("Kết quả: {}", value),
        Err(error) => println!("Lỗi: {}", error),
    }
}
```

**Đầu ra**:
```
Kết quả: 5
Lỗi: Chia cho 0!
```

### If Let

```rust
fn main() {
    let result = divide(10.0, 2.0);

    if let Ok(value) = result {
        println!("Thành công: {}", value);
    } else {
        println!("Thất bại");
    }
}
```

## 🛠️ Methods Cơ Bản

### `unwrap()` - Lấy Giá Trị (Nguy Hiểm!)

```rust
fn main() {
    let x: Result<i32, &str> = Ok(42);
    println!("{}", x.unwrap());  // OK: 42

    let y: Result<i32, &str> = Err("error");
    // println!("{}", y.unwrap());  // ❌ PANIC!
}
```

### `expect()` - Unwrap Với Message

```rust
fn main() {
    let x: Result<i32, &str> = Ok(42);
    println!("{}", x.expect("Phải thành công!"));

    let y: Result<i32, &str> = Err("failed");
    // println!("{}", y.expect("Lỗi xảy ra!"));  // PANIC với message
}
```

### `is_ok()` và `is_err()`

```rust
fn main() {
    let x: Result<i32, &str> = Ok(42);

    if x.is_ok() {
        println!("x thành công");
    }

    let y: Result<i32, &str> = Err("error");

    if y.is_err() {
        println!("y thất bại");
    }
}
```

### `unwrap_or()` - Giá Trị Mặc Định

```rust
fn main() {
    let x: Result<i32, &str> = Ok(42);
    println!("{}", x.unwrap_or(0));  // 42

    let y: Result<i32, &str> = Err("error");
    println!("{}", y.unwrap_or(0));  // 0
}
```

### `unwrap_or_else()` - Giá Trị Từ Closure

```rust
fn main() {
    let x: Result<i32, &str> = Err("error");

    let value = x.unwrap_or_else(|err| {
        println!("Xử lý lỗi: {}", err);
        -1
    });

    println!("Value: {}", value);
}
```

**Đầu ra**:
```
Xử lý lỗi: error
Value: -1
```

## ⚡ `?` Operator - Propagate Errors

### Cú Pháp Cơ Bản

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut file = File::open("username.txt")?;  // ? propagate error
    let mut username = String::new();
    file.read_to_string(&mut username)?;
    Ok(username)
}

fn main() {
    match read_username_from_file() {
        Ok(name) => println!("Username: {}", name),
        Err(e) => println!("Error: {}", e),
    }
}
```

**`?` làm gì?**:
- Nếu `Ok(value)` → Unwrap và tiếp tục
- Nếu `Err(e)` → Return `Err(e)` ngay lập tức

**Tương đương với**:
```rust
fn read_username_from_file() -> Result<String, io::Error> {
    let mut file = match File::open("username.txt") {
        Ok(f) => f,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}
```

### Chain Với `?`

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();

    File::open("username.txt")?.read_to_string(&mut username)?;

    Ok(username)
}
```

### `?` Trong `main()`

```rust
use std::error::Error;
use std::fs::File;

fn main() -> Result<(), Box<dyn Error>> {
    let file = File::open("hello.txt")?;
    println!("File opened successfully");
    Ok(())
}
```

## 🔄 Transform Methods

### `map()` - Biến Đổi Ok Value

```rust
fn main() {
    let x: Result<i32, &str> = Ok(5);

    let doubled = x.map(|n| n * 2);
    println!("{:?}", doubled);  // Ok(10)

    let y: Result<i32, &str> = Err("error");
    let doubled_err = y.map(|n| n * 2);
    println!("{:?}", doubled_err);  // Err("error")
}
```

### `map_err()` - Biến Đổi Error

```rust
fn main() {
    let x: Result<i32, &str> = Err("error");

    let mapped = x.map_err(|e| format!("Lỗi: {}", e));
    println!("{:?}", mapped);  // Err("Lỗi: error")
}
```

### `and_then()` - Chain Operations

```rust
fn parse_number(s: &str) -> Result<i32, String> {
    s.parse().map_err(|_| String::from("Parse lỗi"))
}

fn double(n: i32) -> Result<i32, String> {
    Ok(n * 2)
}

fn main() {
    let result = parse_number("5")
        .and_then(double)
        .and_then(double);

    println!("{:?}", result);  // Ok(20) - 5 * 2 * 2
}
```

### `or()` và `or_else()` - Fallback

```rust
fn main() {
    let x: Result<i32, &str> = Err("first error");
    let y: Result<i32, &str> = Ok(42);

    println!("{:?}", x.or(y));  // Ok(42)

    let a: Result<i32, &str> = Err("error a");
    let b: Result<i32, &str> = Err("error b");

    println!("{:?}", a.or(b));  // Err("error b")
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Parse Input

```rust
fn parse_age(input: &str) -> Result<u32, String> {
    match input.parse::<u32>() {
        Ok(age) => {
            if age > 0 && age < 150 {
                Ok(age)
            } else {
                Err(String::from("Tuổi không hợp lệ"))
            }
        }
        Err(_) => Err(String::from("Không phải số")),
    }
}

fn main() {
    let inputs = vec!["25", "abc", "200", "30"];

    for input in inputs {
        match parse_age(input) {
            Ok(age) => println!("'{}' -> Tuổi: {}", input, age),
            Err(e) => println!("'{}' -> Lỗi: {}", input, e),
        }
    }
}
```

**Đầu ra**:
```
'25' -> Tuổi: 25
'abc' -> Lỗi: Không phải số
'200' -> Lỗi: Tuổi không hợp lệ
'30' -> Tuổi: 30
```

### Ví Dụ 2: File Operations

```rust
use std::fs::File;
use std::io::{self, Read, Write};

fn write_to_file(filename: &str, content: &str) -> Result<(), io::Error> {
    let mut file = File::create(filename)?;
    file.write_all(content.as_bytes())?;
    Ok(())
}

fn read_from_file(filename: &str) -> Result<String, io::Error> {
    let mut file = File::open(filename)?;
    let mut content = String::new();
    file.read_to_string(&mut content)?;
    Ok(content)
}

fn main() {
    // Write
    match write_to_file("test.txt", "Hello Rust!") {
        Ok(()) => println!("Ghi file thành công"),
        Err(e) => println!("Ghi file lỗi: {}", e),
    }

    // Read
    match read_from_file("test.txt") {
        Ok(content) => println!("Nội dung: {}", content),
        Err(e) => println!("Đọc file lỗi: {}", e),
    }
}
```

### Ví Dụ 3: Calculator

```rust
#[derive(Debug)]
enum CalcError {
    DivideByZero,
    InvalidOperation,
}

fn calculate(op: &str, a: f64, b: f64) -> Result<f64, CalcError> {
    match op {
        "+" => Ok(a + b),
        "-" => Ok(a - b),
        "*" => Ok(a * b),
        "/" => {
            if b == 0.0 {
                Err(CalcError::DivideByZero)
            } else {
                Ok(a / b)
            }
        }
        _ => Err(CalcError::InvalidOperation),
    }
}

fn main() {
    let operations = vec![
        ("+", 5.0, 3.0),
        ("/", 10.0, 2.0),
        ("/", 10.0, 0.0),
        ("!", 5.0, 3.0),
    ];

    for (op, a, b) in operations {
        match calculate(op, a, b) {
            Ok(result) => println!("{} {} {} = {}", a, op, b, result),
            Err(CalcError::DivideByZero) => {
                println!("{} {} {} -> Lỗi: Chia cho 0", a, op, b)
            }
            Err(CalcError::InvalidOperation) => {
                println!("{} {} {} -> Lỗi: Phép toán không hợp lệ", a, op, b)
            }
        }
    }
}
```

**Đầu ra**:
```
5 + 3 = 8
10 / 2 = 5
10 / 0 -> Lỗi: Chia cho 0
5 ! 3 -> Lỗi: Phép toán không hợp lệ
```

### Ví Dụ 4: User Registration

```rust
#[derive(Debug)]
enum RegistrationError {
    UsernameTooShort,
    PasswordTooWeak,
    EmailInvalid,
}

struct User {
    username: String,
    password: String,
    email: String,
}

fn validate_username(username: &str) -> Result<(), RegistrationError> {
    if username.len() < 3 {
        Err(RegistrationError::UsernameTooShort)
    } else {
        Ok(())
    }
}

fn validate_password(password: &str) -> Result<(), RegistrationError> {
    if password.len() < 8 {
        Err(RegistrationError::PasswordTooWeak)
    } else {
        Ok(())
    }
}

fn validate_email(email: &str) -> Result<(), RegistrationError> {
    if email.contains('@') {
        Ok(())
    } else {
        Err(RegistrationError::EmailInvalid)
    }
}

fn register_user(username: &str, password: &str, email: &str)
    -> Result<User, RegistrationError> {
    validate_username(username)?;
    validate_password(password)?;
    validate_email(email)?;

    Ok(User {
        username: username.to_string(),
        password: password.to_string(),
        email: email.to_string(),
    })
}

fn main() {
    let attempts = vec![
        ("ab", "password123", "user@example.com"),
        ("alice", "weak", "user@example.com"),
        ("alice", "password123", "invalid-email"),
        ("alice", "password123", "alice@example.com"),
    ];

    for (username, password, email) in attempts {
        match register_user(username, password, email) {
            Ok(user) => println!("✓ Đăng ký thành công: {}", user.username),
            Err(RegistrationError::UsernameTooShort) => {
                println!("✗ Username quá ngắn: {}", username)
            }
            Err(RegistrationError::PasswordTooWeak) => {
                println!("✗ Password quá yếu: {}", username)
            }
            Err(RegistrationError::EmailInvalid) => {
                println!("✗ Email không hợp lệ: {}", email)
            }
        }
    }
}
```

**Đầu ra**:
```
✗ Username quá ngắn: ab
✗ Password quá yếu: alice
✗ Email không hợp lệ: invalid-email
✓ Đăng ký thành công: alice
```

### Ví Dụ 5: Network Request Simulation

```rust
#[derive(Debug)]
enum NetworkError {
    Timeout,
    ConnectionRefused,
    NotFound,
}

fn fetch_data(url: &str) -> Result<String, NetworkError> {
    // Simulate different scenarios
    if url.contains("timeout") {
        Err(NetworkError::Timeout)
    } else if url.contains("refused") {
        Err(NetworkError::ConnectionRefused)
    } else if url.contains("404") {
        Err(NetworkError::NotFound)
    } else {
        Ok(format!("Data from {}", url))
    }
}

fn process_request(url: &str) -> Result<String, NetworkError> {
    let data = fetch_data(url)?;
    let processed = data.to_uppercase();
    Ok(processed)
}

fn main() {
    let urls = vec![
        "https://example.com/api",
        "https://example.com/timeout",
        "https://example.com/refused",
        "https://example.com/404",
    ];

    for url in urls {
        match process_request(url) {
            Ok(data) => println!("✓ {}: {}", url, data),
            Err(e) => println!("✗ {}: {:?}", url, e),
        }
    }
}
```

**Đầu ra**:
```
✓ https://example.com/api: DATA FROM HTTPS://EXAMPLE.COM/API
✗ https://example.com/timeout: Timeout
✗ https://example.com/refused: ConnectionRefused
✗ https://example.com/404: NotFound
```

## 🎨 Custom Error Types

### Sử Dụng String

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Chia cho 0"))
    } else {
        Ok(a / b)
    }
}
```

### Custom Enum Error

```rust
#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeSquareRoot,
    Overflow,
}

fn sqrt(x: f64) -> Result<f64, MathError> {
    if x < 0.0 {
        Err(MathError::NegativeSquareRoot)
    } else {
        Ok(x.sqrt())
    }
}
```

### Implementing Display

```rust
use std::fmt;

#[derive(Debug)]
enum AppError {
    NotFound(String),
    PermissionDenied,
    InvalidInput(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::NotFound(item) => write!(f, "Không tìm thấy: {}", item),
            AppError::PermissionDenied => write!(f, "Không có quyền truy cập"),
            AppError::InvalidInput(msg) => write!(f, "Dữ liệu không hợp lệ: {}", msg),
        }
    }
}

fn main() {
    let error = AppError::NotFound(String::from("user.txt"));
    println!("{}", error);
}
```

**Đầu ra**:
```
Không tìm thấy: user.txt
```

## 🚫 Lỗi Thường Gặp

### Lỗi 1: Unwrap Trên Err

```rust
fn main() {
    let result: Result<i32, &str> = Err("error");
    // let value = result.unwrap();  // ❌ PANIC!

    // ✅ Dùng unwrap_or hoặc match
    let value = result.unwrap_or(0);
    println!("{}", value);
}
```

### Lỗi 2: Không Xử Lý Error

```rust
fn risky_operation() -> Result<i32, String> {
    Err(String::from("Failed"))
}

fn main() {
    // ❌ Bỏ qua Result
    risky_operation();  // Compiler warning!

    // ✅ Xử lý Result
    let _ = risky_operation();  // Explicitly ignore
    // Hoặc
    match risky_operation() {
        Ok(v) => println!("Success: {}", v),
        Err(e) => println!("Error: {}", e),
    }
}
```

### Lỗi 3: Sai Error Type Với `?`

```rust
use std::fs::File;
use std::io;

// ❌ Lỗi - return type không match
// fn read_file() -> Result<String, String> {
//     let mut file = File::open("test.txt")?;  // io::Error, không phải String
//     Ok(String::new())
// }

// ✅ Đúng
fn read_file() -> Result<String, io::Error> {
    let mut file = File::open("test.txt")?;
    Ok(String::new())
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Safe Division

```rust
fn safe_divide(a: f64, b: f64) -> Result<f64, String> {
    // TODO
}

fn main() {
    println!("{:?}", safe_divide(10.0, 2.0));
    println!("{:?}", safe_divide(10.0, 0.0));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn safe_divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Chia cho 0"))
    } else {
        Ok(a / b)
    }
}
```
</details>

### Bài 2: Parse And Double

```rust
fn parse_and_double(s: &str) -> Result<i32, String> {
    // TODO: Parse string thành i32, nhân đôi
}

fn main() {
    println!("{:?}", parse_and_double("5"));
    println!("{:?}", parse_and_double("abc"));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn parse_and_double(s: &str) -> Result<i32, String> {
    let num = s.parse::<i32>()
        .map_err(|_| String::from("Parse lỗi"))?;
    Ok(num * 2)
}
```
</details>

### Bài 3: Validate Email

```rust
fn validate_email(email: &str) -> Result<String, String> {
    // TODO: Kiểm tra email có @ và .
}

fn main() {
    println!("{:?}", validate_email("user@example.com"));
    println!("{:?}", validate_email("invalid"));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn validate_email(email: &str) -> Result<String, String> {
    if email.contains('@') && email.contains('.') {
        Ok(email.to_string())
    } else {
        Err(String::from("Email không hợp lệ"))
    }
}
```
</details>

## 🎯 Tóm Tắt

| Method | Cú Pháp | Kết Quả |
|--------|---------|---------|
| **`unwrap()`** | `result.unwrap()` | Giá trị hoặc panic |
| **`expect()`** | `result.expect("msg")` | Giá trị hoặc panic với msg |
| **`unwrap_or()`** | `result.unwrap_or(default)` | Giá trị hoặc default |
| **`is_ok()`** | `result.is_ok()` | `true` nếu Ok |
| **`is_err()`** | `result.is_err()` | `true` nếu Err |
| **`map()`** | `result.map(f)` | Transform Ok value |
| **`map_err()`** | `result.map_err(f)` | Transform Err value |
| **`and_then()`** | `result.and_then(f)` | Chain operations |
| **`?`** | `expr?` | Propagate error |

**Quy tắc vàng**:
- ✅ Dùng `Result<T, E>` cho operations có thể fail
- ✅ Luôn xử lý cả `Ok` và `Err`
- ✅ Dùng `?` để propagate errors
- ✅ Tạo custom error types cho clarity
- ✅ Tránh `unwrap()` - dùng `unwrap_or()` hoặc `match`

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Error Handling](https://doc.rust-lang.org/book/ch09-00-error-handling.html)
- [Rust Std - Result](https://doc.rust-lang.org/std/result/enum.Result.html)

---

**Bài tiếp theo**: Advanced Error Handling (Sắp ra mắt!)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **xử lý lỗi nâng cao** với `thiserror` và `anyhow`!
