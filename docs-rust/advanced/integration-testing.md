---
sidebar_position: 31
title: "Integration Testing"
description: "Tìm hiểu cách viết integration tests trong Rust"
---

# 🔗 Integration Testing

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu integration tests vs unit tests
- ✅ Tạo tests directory
- ✅ Test public API của crate
- ✅ Tổ chức integration tests
- ✅ Share code giữa integration tests
- ✅ Test binary crates

## 🤔 Integration Tests Là Gì?

### Ẩn Dụ Cuộc Sống: Kiểm Tra Tổng Thể

**Integration Tests** giống như **test toàn bộ sản phẩm**:

🏭 **Unit Tests**:
- Test từng **bộ phận riêng lẻ**
- Trong nội bộ module
- Private functions

🔗 **Integration Tests**:
- Test **toàn bộ sản phẩm**
- Từ góc nhìn người dùng
- Chỉ public API

### So Sánh

| Feature | Unit Tests | Integration Tests |
|---------|------------|-------------------|
| **Location** | Trong src/ | Trong tests/ |
| **Access** | Private + Public | Chỉ Public |
| **Scope** | Single module | Whole crate |
| **Purpose** | Internal logic | External API |

## 📁 Tests Directory

### Cấu Trúc Project

```
my_project/
├── Cargo.toml
├── src/
│   └── lib.rs
└── tests/
    ├── integration_test.rs
    └── common/
        └── mod.rs
```

### Example Library

```rust
// src/lib.rs
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

pub fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

pub struct Calculator {
    value: i32,
}

impl Calculator {
    pub fn new() -> Self {
        Calculator { value: 0 }
    }

    pub fn add(&mut self, n: i32) {
        self.value += n;
    }

    pub fn get(&self) -> i32 {
        self.value
    }
}
```

### Integration Test

```rust
// tests/integration_test.rs
use my_project::{add, multiply, Calculator};

#[test]
fn test_add() {
    assert_eq!(add(2, 3), 5);
}

#[test]
fn test_multiply() {
    assert_eq!(multiply(2, 3), 6);
}

#[test]
fn test_calculator() {
    let mut calc = Calculator::new();
    calc.add(5);
    calc.add(3);
    assert_eq!(calc.get(), 8);
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: String Utils Library

```rust
// src/lib.rs
pub fn reverse(s: &str) -> String {
    s.chars().rev().collect()
}

pub fn is_palindrome(s: &str) -> bool {
    let cleaned = s.to_lowercase().replace(" ", "");
    cleaned == reverse(&cleaned)
}

pub fn count_vowels(s: &str) -> usize {
    s.chars()
        .filter(|c| "aeiouAEIOU".contains(*c))
        .count()
}
```

```rust
// tests/string_tests.rs
use my_string_utils::*;

#[test]
fn test_reverse() {
    assert_eq!(reverse("hello"), "olleh");
    assert_eq!(reverse("rust"), "tsur");
}

#[test]
fn test_palindrome() {
    assert!(is_palindrome("racecar"));
    assert!(is_palindrome("A man a plan a canal Panama"));
    assert!(!is_palindrome("hello"));
}

#[test]
fn test_count_vowels() {
    assert_eq!(count_vowels("hello"), 2);
    assert_eq!(count_vowels("aeiou"), 5);
    assert_eq!(count_vowels("xyz"), 0);
}
```

### Ví Dụ 2: Math Library

```rust
// src/lib.rs
pub fn factorial(n: u64) -> u64 {
    match n {
        0 | 1 => 1,
        _ => n * factorial(n - 1),
    }
}

pub fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

pub fn is_prime(n: u64) -> bool {
    if n < 2 {
        return false;
    }
    for i in 2..=(n as f64).sqrt() as u64 {
        if n % i == 0 {
            return false;
        }
    }
    true
}
```

```rust
// tests/math_tests.rs
use my_math::*;

#[test]
fn test_factorial() {
    assert_eq!(factorial(0), 1);
    assert_eq!(factorial(1), 1);
    assert_eq!(factorial(5), 120);
    assert_eq!(factorial(10), 3628800);
}

#[test]
fn test_fibonacci() {
    assert_eq!(fibonacci(0), 0);
    assert_eq!(fibonacci(1), 1);
    assert_eq!(fibonacci(10), 55);
}

#[test]
fn test_is_prime() {
    assert!(is_prime(2));
    assert!(is_prime(17));
    assert!(!is_prime(4));
    assert!(!is_prime(1));
}
```

### Ví Dụ 3: User Management

```rust
// src/lib.rs
pub struct User {
    pub username: String,
    pub email: String,
}

pub struct UserManager {
    users: Vec<User>,
}

impl UserManager {
    pub fn new() -> Self {
        UserManager { users: vec![] }
    }

    pub fn add_user(&mut self, username: String, email: String) -> Result<(), String> {
        if self.users.iter().any(|u| u.username == username) {
            return Err(String::from("Username already exists"));
        }
        self.users.push(User { username, email });
        Ok(())
    }

    pub fn get_user(&self, username: &str) -> Option<&User> {
        self.users.iter().find(|u| u.username == username)
    }

    pub fn user_count(&self) -> usize {
        self.users.len()
    }
}
```

```rust
// tests/user_tests.rs
use my_app::*;

#[test]
fn test_add_user() {
    let mut manager = UserManager::new();
    let result = manager.add_user("alice".to_string(), "alice@example.com".to_string());
    assert!(result.is_ok());
    assert_eq!(manager.user_count(), 1);
}

#[test]
fn test_duplicate_username() {
    let mut manager = UserManager::new();
    manager.add_user("alice".to_string(), "alice@example.com".to_string()).unwrap();
    let result = manager.add_user("alice".to_string(), "alice2@example.com".to_string());
    assert!(result.is_err());
}

#[test]
fn test_get_user() {
    let mut manager = UserManager::new();
    manager.add_user("alice".to_string(), "alice@example.com".to_string()).unwrap();

    let user = manager.get_user("alice");
    assert!(user.is_some());
    assert_eq!(user.unwrap().email, "alice@example.com");
}

#[test]
fn test_get_nonexistent_user() {
    let manager = UserManager::new();
    let user = manager.get_user("bob");
    assert!(user.is_none());
}
```

## 📚 Common Test Utilities

### Shared Test Code

```rust
// tests/common/mod.rs
pub fn setup() -> TestContext {
    TestContext {
        // Setup test environment
    }
}

pub struct TestContext {
    // Test data
}

impl TestContext {
    pub fn cleanup(&self) {
        // Cleanup after test
    }
}
```

```rust
// tests/integration_test.rs
mod common;

#[test]
fn test_with_common() {
    let ctx = common::setup();

    // Test code here

    ctx.cleanup();
}
```

### Example: Database Setup

```rust
// tests/common/mod.rs
use my_db::Database;

pub struct TestDb {
    pub db: Database,
}

impl TestDb {
    pub fn new() -> Self {
        let db = Database::new_in_memory();
        TestDb { db }
    }

    pub fn seed_data(&mut self) {
        self.db.insert("key1", "value1");
        self.db.insert("key2", "value2");
    }
}

impl Drop for TestDb {
    fn drop(&mut self) {
        // Cleanup
    }
}
```

```rust
// tests/db_tests.rs
mod common;
use common::TestDb;

#[test]
fn test_database_operations() {
    let mut test_db = TestDb::new();
    test_db.seed_data();

    // Run tests
    assert_eq!(test_db.db.get("key1"), Some("value1"));
}
```

## 🎯 Multiple Integration Test Files

### Organizing Tests

```
tests/
├── string_tests.rs
├── math_tests.rs
├── user_tests.rs
└── common/
    └── mod.rs
```

```rust
// tests/string_tests.rs
use my_lib::string_utils::*;

#[test]
fn test_strings() {
    // String tests
}
```

```rust
// tests/math_tests.rs
use my_lib::math::*;

#[test]
fn test_math() {
    // Math tests
}
```

### Running Specific Test File

```bash
cargo test --test string_tests
```

## 🔧 Testing Binary Crates

### Problem: Binaries Can't Be Imported

```rust
// src/main.rs
fn main() {
    // Can't test this directly from integration tests
}
```

### Solution: Extract to Library

```
my_project/
├── Cargo.toml
├── src/
│   ├── lib.rs      # Library code
│   └── main.rs     # Binary wrapper
└── tests/
    └── integration_test.rs
```

```rust
// src/lib.rs
pub fn run() {
    // Main logic here
}
```

```rust
// src/main.rs
use my_project;

fn main() {
    my_project::run();
}
```

```rust
// tests/integration_test.rs
use my_project;

#[test]
fn test_run() {
    // Test the library
}
```

## 🎯 Best Practices

### 1. Test Public API Only

```rust
// ✅ Good - testing public API
#[test]
fn test_public_function() {
    assert_eq!(my_lib::public_function(), 42);
}

// ❌ Bad - can't access private
// #[test]
// fn test_private_function() {
//     assert_eq!(my_lib::private_function(), 42); // ERROR
// }
```

### 2. One Feature Per File

```rust
// tests/authentication.rs
#[test]
fn test_login() { /* ... */ }

#[test]
fn test_logout() { /* ... */ }

// tests/database.rs
#[test]
fn test_insert() { /* ... */ }

#[test]
fn test_query() { /* ... */ }
```

### 3. Use Descriptive Names

```rust
#[test]
fn user_can_register_with_valid_credentials() {
    // Test implementation
}

#[test]
fn registration_fails_with_invalid_email() {
    // Test implementation
}
```

### 4. Setup và Teardown

```rust
mod common;

#[test]
fn test_with_setup() {
    // Setup
    let ctx = common::setup();

    // Test
    // ...

    // Teardown (automatic with Drop)
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Test Calculator Library

```rust
// src/lib.rs
pub struct Calculator {
    value: f64,
}

impl Calculator {
    pub fn new() -> Self {
        Calculator { value: 0.0 }
    }

    pub fn add(&mut self, n: f64) -> &mut Self {
        self.value += n;
        self
    }

    pub fn subtract(&mut self, n: f64) -> &mut Self {
        self.value -= n;
        self
    }

    pub fn multiply(&mut self, n: f64) -> &mut Self {
        self.value *= n;
        self
    }

    pub fn result(&self) -> f64 {
        self.value
    }
}

// TODO: Viết integration tests trong tests/calculator_tests.rs
```

<details>
<summary>💡 Gợi ý</summary>

```rust
// tests/calculator_tests.rs
use my_calculator::Calculator;

#[test]
fn test_basic_operations() {
    let mut calc = Calculator::new();
    calc.add(10.0).subtract(3.0).multiply(2.0);
    assert_eq!(calc.result(), 14.0);
}

#[test]
fn test_chain_operations() {
    let result = Calculator::new()
        .add(5.0)
        .add(3.0)
        .multiply(2.0)
        .result();
    assert_eq!(result, 16.0);
}
```
</details>

### Bài 2: Test TodoList Library

```rust
// src/lib.rs
pub struct TodoList {
    items: Vec<String>,
}

impl TodoList {
    pub fn new() -> Self {
        TodoList { items: vec![] }
    }

    pub fn add(&mut self, item: String) {
        self.items.push(item);
    }

    pub fn remove(&mut self, index: usize) -> Option<String> {
        if index < self.items.len() {
            Some(self.items.remove(index))
        } else {
            None
        }
    }

    pub fn get(&self, index: usize) -> Option<&String> {
        self.items.get(index)
    }

    pub fn len(&self) -> usize {
        self.items.len()
    }
}

// TODO: Viết integration tests
```

<details>
<summary>💡 Gợi ý</summary>

```rust
// tests/todo_tests.rs
use my_todo::TodoList;

#[test]
fn test_add_items() {
    let mut list = TodoList::new();
    list.add("Task 1".to_string());
    list.add("Task 2".to_string());
    assert_eq!(list.len(), 2);
}

#[test]
fn test_remove_item() {
    let mut list = TodoList::new();
    list.add("Task 1".to_string());
    let removed = list.remove(0);
    assert_eq!(removed, Some("Task 1".to_string()));
    assert_eq!(list.len(), 0);
}

#[test]
fn test_remove_invalid_index() {
    let mut list = TodoList::new();
    let removed = list.remove(10);
    assert_eq!(removed, None);
}
```
</details>

## 🎯 Tóm Tắt

| Aspect | Unit Tests | Integration Tests |
|--------|------------|-------------------|
| **Location** | `src/` with `#[cfg(test)]` | `tests/` directory |
| **Scope** | Single module | Whole crate |
| **Access** | Private + Public | Public only |
| **Compile** | Part of crate | Separate binary |
| **Purpose** | Internal logic | External API |

**Quy tắc vàng**:
- ✅ Integration tests trong `tests/` directory
- ✅ Mỗi file là một integration test
- ✅ Chỉ test public API
- ✅ Dùng `common/` cho shared code
- ✅ Tổ chức tests theo features
- ✅ Test như end user sử dụng

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Integration Tests](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
- [Cargo Test Documentation](https://doc.rust-lang.org/cargo/commands/cargo-test.html)

---

**Bài tiếp theo**: [Declarative Macros →](./declarative-macros.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Macros** - viết code sinh code!
