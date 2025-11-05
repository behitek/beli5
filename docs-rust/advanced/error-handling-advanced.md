---
sidebar_position: 10
title: "Xử Lý Lỗi Chuyên Nghiệp"
description: "Tìm hiểu về panic!, propagating errors, và custom error types"
---

# 🚨 Xử Lý Lỗi Chuyên Nghiệp

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu sự khác biệt giữa `panic!` và `Result`
- ✅ Biết khi nào nên dùng `panic!`
- ✅ Propagate errors hiệu quả với `?`
- ✅ Tạo custom error types
- ✅ Implement `Error` trait
- ✅ Áp dụng best practices cho error handling

## 🤔 `panic!` vs `Result`

### Ẩn Dụ Cuộc Sống: Xử Lý Sự Cố

**Error Handling** giống như **xử lý sự cố trong công ty**:

🚨 **Panic** - Khẩn Cấp:
- Ngừng toàn bộ hoạt động
- Sơ tán khẩn cấp
- Không thể phục hồi

✅ **Result** - Xử Lý Có Kế Hoạch:
- Xác định vấn đề
- Có phương án dự phòng
- Tiếp tục hoạt động

### `panic!` - Unrecoverable Errors

```rust
fn main() {
    // Panic ngay lập tức
    panic!("Có lỗi nghiêm trọng!");

    println!("Dòng này không bao giờ chạy");
}
```

**Khi nào dùng `panic!`?**:
- ❌ Lỗi logic nghiêm trọng trong code
- ❌ Invariants bị vi phạm
- ❌ Trong tests
- ❌ Prototyping/examples

**Ví dụ hợp lệ**:
```rust
fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("KHÔNG BAO GIỜ chia cho 0!");
    }
    a / b
}
```

### `Result` - Recoverable Errors

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Chia cho 0"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10, 0) {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
        // Chương trình tiếp tục
    }

    println!("Chương trình vẫn chạy!");
}
```

**Khi nào dùng `Result`?**:
- ✅ Lỗi có thể xảy ra trong runtime
- ✅ User input không hợp lệ
- ✅ File/network operations
- ✅ Parsing data

## ⚡ Propagating Errors Với `?`

### Chuỗi Lỗi

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut file = File::open("username.txt")?;
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

### Chain Nhiều Operations

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_and_parse() -> Result<i32, Box<dyn std::error::Error>> {
    let mut file = File::open("number.txt")?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    let number: i32 = contents.trim().parse()?;
    Ok(number)
}
```

**Giải thích**:
- Mỗi `?` propagate error nếu có
- Error types khác nhau → Dùng `Box<dyn Error>`
- Concise và dễ đọc

## 🎨 Custom Error Types

### Enum Error Type

```rust
#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeSquareRoot,
    Overflow,
}

impl std::fmt::Display for MathError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            MathError::DivisionByZero => write!(f, "Chia cho 0"),
            MathError::NegativeSquareRoot => write!(f, "Căn bậc hai của số âm"),
            MathError::Overflow => write!(f, "Tràn số"),
        }
    }
}

impl std::error::Error for MathError {}

fn divide(a: f64, b: f64) -> Result<f64, MathError> {
    if b == 0.0 {
        Err(MathError::DivisionByZero)
    } else {
        Ok(a / b)
    }
}

fn sqrt(x: f64) -> Result<f64, MathError> {
    if x < 0.0 {
        Err(MathError::NegativeSquareRoot)
    } else {
        Ok(x.sqrt())
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(result) => println!("10 / 2 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match sqrt(-4.0) {
        Ok(result) => println!("sqrt(-4) = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
```

**Đầu ra**:
```
10 / 2 = 5
Lỗi: Căn bậc hai của số âm
```

### Struct Error Type Với Context

```rust
use std::fmt;

#[derive(Debug)]
struct AppError {
    kind: ErrorKind,
    message: String,
}

#[derive(Debug)]
enum ErrorKind {
    Io,
    Parse,
    Validation,
}

impl AppError {
    fn new(kind: ErrorKind, message: impl Into<String>) -> Self {
        AppError {
            kind,
            message: message.into(),
        }
    }

    fn io(message: impl Into<String>) -> Self {
        Self::new(ErrorKind::Io, message)
    }

    fn parse(message: impl Into<String>) -> Self {
        Self::new(ErrorKind::Parse, message)
    }

    fn validation(message: impl Into<String>) -> Self {
        Self::new(ErrorKind::Validation, message)
    }
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:?}: {}", self.kind, self.message)
    }
}

impl std::error::Error for AppError {}

fn validate_age(age: i32) -> Result<i32, AppError> {
    if age < 0 {
        Err(AppError::validation("Tuổi không thể âm"))
    } else if age > 150 {
        Err(AppError::validation("Tuổi không hợp lệ"))
    } else {
        Ok(age)
    }
}

fn main() {
    match validate_age(-5) {
        Ok(age) => println!("Tuổi hợp lệ: {}", age),
        Err(e) => println!("Lỗi: {}", e),
    }

    match validate_age(200) {
        Ok(age) => println!("Tuổi hợp lệ: {}", age),
        Err(e) => println!("Lỗi: {}", e),
    }
}
```

**Đầu ra**:
```
Lỗi: Validation: Tuổi không thể âm
Lỗi: Validation: Tuổi không hợp lệ
```

## 🔄 Converting Between Error Types

### `From` Trait

```rust
use std::fmt;
use std::num::ParseIntError;

#[derive(Debug)]
struct MyError {
    message: String,
}

impl fmt::Display for MyError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl std::error::Error for MyError {}

// Convert ParseIntError -> MyError
impl From<ParseIntError> for MyError {
    fn from(err: ParseIntError) -> Self {
        MyError {
            message: format!("Parse error: {}", err),
        }
    }
}

fn parse_number(s: &str) -> Result<i32, MyError> {
    let num = s.parse()?;  // ParseIntError tự động chuyển thành MyError
    Ok(num * 2)
}

fn main() {
    match parse_number("42") {
        Ok(n) => println!("Result: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    match parse_number("abc") {
        Ok(n) => println!("Result: {}", n),
        Err(e) => println!("Error: {}", e),
    }
}
```

**Đầu ra**:
```
Result: 84
Error: Parse error: invalid digit found in string
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: File Reader With Custom Errors

```rust
use std::fs::File;
use std::io::{self, Read};
use std::fmt;

#[derive(Debug)]
enum FileError {
    Io(io::Error),
    Empty,
    TooLarge,
}

impl fmt::Display for FileError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            FileError::Io(e) => write!(f, "IO error: {}", e),
            FileError::Empty => write!(f, "File is empty"),
            FileError::TooLarge => write!(f, "File too large (max 1MB)"),
        }
    }
}

impl std::error::Error for FileError {}

impl From<io::Error> for FileError {
    fn from(err: io::Error) -> Self {
        FileError::Io(err)
    }
}

const MAX_SIZE: u64 = 1_000_000; // 1MB

fn read_file_safe(path: &str) -> Result<String, FileError> {
    let mut file = File::open(path)?;

    let metadata = file.metadata()?;
    if metadata.len() == 0 {
        return Err(FileError::Empty);
    }
    if metadata.len() > MAX_SIZE {
        return Err(FileError::TooLarge);
    }

    let mut contents = String::new();
    file.read_to_string(&mut contents)?;

    Ok(contents)
}

fn main() {
    match read_file_safe("test.txt") {
        Ok(contents) => println!("File contents:\n{}", contents),
        Err(e) => println!("Error: {}", e),
    }
}
```

### Ví Dụ 2: User Input Validation

```rust
use std::fmt;

#[derive(Debug)]
enum ValidationError {
    TooShort { min: usize, actual: usize },
    TooLong { max: usize, actual: usize },
    InvalidFormat(String),
}

impl fmt::Display for ValidationError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ValidationError::TooShort { min, actual } => {
                write!(f, "Quá ngắn (tối thiểu {}, thực tế {})", min, actual)
            }
            ValidationError::TooLong { max, actual } => {
                write!(f, "Quá dài (tối đa {}, thực tế {})", max, actual)
            }
            ValidationError::InvalidFormat(msg) => {
                write!(f, "Định dạng không hợp lệ: {}", msg)
            }
        }
    }
}

impl std::error::Error for ValidationError {}

fn validate_username(username: &str) -> Result<String, ValidationError> {
    let len = username.len();

    if len < 3 {
        return Err(ValidationError::TooShort { min: 3, actual: len });
    }

    if len > 20 {
        return Err(ValidationError::TooLong { max: 20, actual: len });
    }

    if !username.chars().all(|c| c.is_alphanumeric() || c == '_') {
        return Err(ValidationError::InvalidFormat(
            String::from("Chỉ chấp nhận chữ, số, và _")
        ));
    }

    Ok(username.to_string())
}

fn main() {
    let usernames = vec!["ab", "valid_user", "this_is_a_very_long_username", "user@123"];

    for username in usernames {
        match validate_username(username) {
            Ok(name) => println!("✓ '{}' hợp lệ", name),
            Err(e) => println!("✗ '{}': {}", username, e),
        }
    }
}
```

**Đầu ra**:
```
✗ 'ab': Quá ngắn (tối thiểu 3, thực tế 2)
✓ 'valid_user' hợp lệ
✗ 'this_is_a_very_long_username': Quá dài (tối đa 20, thực tế 28)
✗ 'user@123': Định dạng không hợp lệ: Chỉ chấp nhận chữ, số, và _
```

### Ví Dụ 3: API Client

```rust
use std::fmt;

#[derive(Debug)]
enum ApiError {
    NetworkError(String),
    Unauthorized,
    NotFound,
    ServerError(u16),
    ParseError(String),
}

impl fmt::Display for ApiError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ApiError::NetworkError(msg) => write!(f, "Network error: {}", msg),
            ApiError::Unauthorized => write!(f, "Unauthorized - please login"),
            ApiError::NotFound => write!(f, "Resource not found"),
            ApiError::ServerError(code) => write!(f, "Server error: {}", code),
            ApiError::ParseError(msg) => write!(f, "Parse error: {}", msg),
        }
    }
}

impl std::error::Error for ApiError {}

struct ApiClient {
    base_url: String,
}

impl ApiClient {
    fn new(base_url: String) -> Self {
        ApiClient { base_url }
    }

    fn get_user(&self, id: u32) -> Result<String, ApiError> {
        // Simulate API call
        if id == 0 {
            return Err(ApiError::NotFound);
        }

        if id == 999 {
            return Err(ApiError::Unauthorized);
        }

        Ok(format!("User data for ID {}", id))
    }

    fn create_user(&self, name: &str) -> Result<u32, ApiError> {
        if name.is_empty() {
            return Err(ApiError::ParseError(String::from("Name cannot be empty")));
        }

        // Simulate successful creation
        Ok(42)
    }
}

fn main() {
    let client = ApiClient::new(String::from("https://api.example.com"));

    match client.get_user(1) {
        Ok(user) => println!("✓ {}", user),
        Err(e) => println!("✗ {}", e),
    }

    match client.get_user(0) {
        Ok(user) => println!("✓ {}", user),
        Err(e) => println!("✗ {}", e),
    }

    match client.get_user(999) {
        Ok(user) => println!("✓ {}", user),
        Err(e) => println!("✗ {}", e),
    }

    match client.create_user("Alice") {
        Ok(id) => println!("✓ Created user with ID: {}", id),
        Err(e) => println!("✗ {}", e),
    }

    match client.create_user("") {
        Ok(id) => println!("✓ Created user with ID: {}", id),
        Err(e) => println!("✗ {}", e),
    }
}
```

**Đầu ra**:
```
✓ User data for ID 1
✗ Resource not found
✗ Unauthorized - please login
✓ Created user with ID: 42
✗ Parse error: Name cannot be empty
```

## 🎓 Best Practices

### 1. Prefer `Result` Over `panic!`

```rust
// ❌ Tránh
fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("Division by zero!");
    }
    a / b
}

// ✅ Tốt hơn
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}
```

### 2. Implement `Display` và `Error` Trait

```rust
use std::fmt;

#[derive(Debug)]
struct MyError {
    message: String,
}

impl fmt::Display for MyError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl std::error::Error for MyError {}
```

### 3. Use `From` Cho Error Conversion

```rust
impl From<std::io::Error> for MyError {
    fn from(err: std::io::Error) -> Self {
        MyError {
            message: format!("IO error: {}", err),
        }
    }
}
```

### 4. Context Trong Error Messages

```rust
// ❌ Không đủ thông tin
Err(String::from("File error"))

// ✅ Có context
Err(format!("Failed to read file '{}': {}", filename, err))
```

### 5. Structured Errors

```rust
#[derive(Debug)]
struct DetailedError {
    kind: ErrorKind,
    message: String,
    source: Option<Box<dyn std::error::Error>>,
}
```

## 🚫 Lỗi Thường Gặp

### Lỗi 1: Panic Khi Nên Dùng Result

```rust
// ❌ Sai
fn parse_config(s: &str) -> Config {
    let value = s.parse().unwrap();  // Panic!
    Config { value }
}

// ✅ Đúng
fn parse_config(s: &str) -> Result<Config, ParseError> {
    let value = s.parse()?;
    Ok(Config { value })
}
```

### Lỗi 2: Thiếu Context

```rust
// ❌ Không rõ lỗi gì
Err("Error")

// ✅ Rõ ràng
Err(format!("Failed to parse age '{}': not a number", input))
```

### Lỗi 3: Không Implement Error Trait

```rust
// ❌ Thiếu Error trait
#[derive(Debug)]
struct MyError {
    msg: String,
}

// ✅ Đầy đủ
impl std::error::Error for MyError {}
impl std::fmt::Display for MyError { /* ... */ }
```

## 💻 Bài Tập Thực Hành

### Bài 1: Custom Division Error

```rust
#[derive(Debug)]
enum DivisionError {
    DivideByZero,
    Overflow,
}

fn safe_divide(a: i32, b: i32) -> Result<i32, DivisionError> {
    // TODO: Implement
}

fn main() {
    println!("{:?}", safe_divide(10, 2));
    println!("{:?}", safe_divide(10, 0));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::fmt;

#[derive(Debug)]
enum DivisionError {
    DivideByZero,
    Overflow,
}

impl fmt::Display for DivisionError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            DivisionError::DivideByZero => write!(f, "Cannot divide by zero"),
            DivisionError::Overflow => write!(f, "Division overflow"),
        }
    }
}

impl std::error::Error for DivisionError {}

fn safe_divide(a: i32, b: i32) -> Result<i32, DivisionError> {
    if b == 0 {
        Err(DivisionError::DivideByZero)
    } else {
        a.checked_div(b).ok_or(DivisionError::Overflow)
    }
}
```
</details>

### Bài 2: Password Validator

```rust
fn validate_password(password: &str) -> Result<(), String> {
    // TODO: Check length >= 8, has uppercase, has number
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn validate_password(password: &str) -> Result<(), String> {
    if password.len() < 8 {
        return Err(String::from("Password must be at least 8 characters"));
    }

    if !password.chars().any(|c| c.is_uppercase()) {
        return Err(String::from("Password must contain uppercase letter"));
    }

    if !password.chars().any(|c| c.is_numeric()) {
        return Err(String::from("Password must contain a number"));
    }

    Ok(())
}
```
</details>

## 🎯 Tóm Tắt

| Concept | Khi Nào Dùng | Ví Dụ |
|---------|--------------|-------|
| **`panic!`** | Lỗi không thể phục hồi | Logic errors, tests |
| **`Result`** | Lỗi có thể xử lý | File I/O, parsing, validation |
| **`?` operator** | Propagate errors | Chain operations |
| **Custom errors** | Domain-specific errors | API errors, validation |
| **`From` trait** | Error conversion | Convert between error types |

**Quy tắc vàng**:
- ✅ Prefer `Result` over `panic!`
- ✅ Implement `Display` và `Error` trait
- ✅ Provide context in error messages
- ✅ Use `?` để propagate errors
- ✅ Create custom error types cho clarity

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Error Handling](https://doc.rust-lang.org/book/ch09-00-error-handling.html)
- [Rust By Example - Error Handling](https://doc.rust-lang.org/rust-by-example/error.html)

---

**Bài tiếp theo**: [thiserror & anyhow →](./thiserror-anyhow.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **thiserror** và **anyhow** - thư viện giúp error handling dễ dàng hơn!
