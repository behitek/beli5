---
sidebar_position: 30
title: "Unit Testing: Kiểm Tra Code"
description: "Tìm hiểu cách viết unit tests trong Rust"
---

# ✅ Unit Testing: Kiểm Tra Code

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Viết unit tests với `#[test]`
- ✅ Sử dụng assert macros
- ✅ Tổ chức tests trong modules
- ✅ Chạy tests với `cargo test`
- ✅ Test private functions
- ✅ Test error cases

## 🤔 Testing Là Gì?

### Ẩn Dụ Cuộc Sống: Kiểm Tra Chất Lượng

**Testing** giống như **kiểm tra sản phẩm trước khi bán**:

🏭 **Nhà Máy Sản Xuất**:
- **Kiểm tra từng bộ phận** (unit test)
- Đảm bảo hoạt động đúng
- Phát hiện lỗi sớm
- Tự tin khi ship

🦀 **Testing Trong Rust**:
- **Unit tests** - test từng function
- Tự động kiểm tra
- Ngăn bugs
- Documentation bằng examples

### Ví Dụ Cơ Bản

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[test]
fn test_add() {
    assert_eq!(add(2, 2), 4);
}
```

## 📝 #[test] Attribute

### Định Nghĩa Test

```rust
#[test]
fn it_works() {
    assert_eq!(2 + 2, 4);
}
```

### Multiple Tests

```rust
fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

#[test]
fn test_multiply_positive() {
    assert_eq!(multiply(2, 3), 6);
}

#[test]
fn test_multiply_negative() {
    assert_eq!(multiply(-2, 3), -6);
}

#[test]
fn test_multiply_zero() {
    assert_eq!(multiply(5, 0), 0);
}
```

## ✔️ Assert Macros

### assert!

```rust
#[test]
fn test_is_positive() {
    let x = 5;
    assert!(x > 0);
    assert!(x < 10);
}
```

### assert_eq!

```rust
#[test]
fn test_equality() {
    let result = 2 + 2;
    assert_eq!(result, 4);
}
```

### assert_ne!

```rust
#[test]
fn test_inequality() {
    let x = 5;
    let y = 10;
    assert_ne!(x, y);
}
```

### Custom Messages

```rust
#[test]
fn test_with_message() {
    let x = 5;
    assert!(x > 0, "x should be positive, got {}", x);
    assert_eq!(x, 5, "x should equal 5");
}
```

## 🏃 Running Tests

### cargo test

```bash
cargo test
```

### Run Specific Test

```bash
cargo test test_add
```

### Run Tests in Module

```bash
cargo test tests::
```

### Show Output

```bash
cargo test -- --show-output
```

### Run in Single Thread

```bash
cargo test -- --test-threads=1
```

## 📦 Test Organization

### Tests Module

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 2), 4);
    }

    #[test]
    fn test_add_negative() {
        assert_eq!(add(-2, 2), 0);
    }
}
```

### Multiple Test Modules

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

#[cfg(test)]
mod addition_tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 2), 4);
    }
}

#[cfg(test)]
mod multiplication_tests {
    use super::*;

    #[test]
    fn test_multiply() {
        assert_eq!(multiply(2, 3), 6);
    }
}
```

## 🎯 Testing Functions

### Simple Function

```rust
fn is_even(n: i32) -> bool {
    n % 2 == 0
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_even() {
        assert!(is_even(2));
        assert!(is_even(0));
        assert!(is_even(-4));
    }

    #[test]
    fn test_is_not_even() {
        assert!(!is_even(1));
        assert!(!is_even(3));
        assert!(!is_even(-5));
    }
}
```

### Function with Structs

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_area() {
        let rect = Rectangle {
            width: 10,
            height: 5,
        };
        assert_eq!(rect.area(), 50);
    }

    #[test]
    fn test_can_hold() {
        let rect1 = Rectangle {
            width: 10,
            height: 5,
        };
        let rect2 = Rectangle {
            width: 5,
            height: 3,
        };
        assert!(rect1.can_hold(&rect2));
    }

    #[test]
    fn test_cannot_hold() {
        let rect1 = Rectangle {
            width: 5,
            height: 3,
        };
        let rect2 = Rectangle {
            width: 10,
            height: 5,
        };
        assert!(!rect1.can_hold(&rect2));
    }
}
```

## ❌ Testing Errors

### should_panic

```rust
fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("Division by zero!");
    }
    a / b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic]
    fn test_divide_by_zero() {
        divide(10, 0);
    }

    #[test]
    #[should_panic(expected = "Division by zero")]
    fn test_divide_by_zero_with_message() {
        divide(10, 0);
    }
}
```

### Testing Result

```rust
fn safe_divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_safe_divide_ok() -> Result<(), String> {
        let result = safe_divide(10, 2)?;
        assert_eq!(result, 5);
        Ok(())
    }

    #[test]
    fn test_safe_divide_error() {
        let result = safe_divide(10, 0);
        assert!(result.is_err());
    }
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Calculator

```rust
struct Calculator;

impl Calculator {
    fn add(a: i32, b: i32) -> i32 {
        a + b
    }

    fn subtract(a: i32, b: i32) -> i32 {
        a - b
    }

    fn multiply(a: i32, b: i32) -> i32 {
        a * b
    }

    fn divide(a: f64, b: f64) -> Result<f64, String> {
        if b == 0.0 {
            Err(String::from("Division by zero"))
        } else {
            Ok(a / b)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(Calculator::add(2, 3), 5);
        assert_eq!(Calculator::add(-2, 3), 1);
    }

    #[test]
    fn test_subtract() {
        assert_eq!(Calculator::subtract(5, 3), 2);
        assert_eq!(Calculator::subtract(3, 5), -2);
    }

    #[test]
    fn test_multiply() {
        assert_eq!(Calculator::multiply(2, 3), 6);
        assert_eq!(Calculator::multiply(-2, 3), -6);
    }

    #[test]
    fn test_divide() {
        let result = Calculator::divide(10.0, 2.0).unwrap();
        assert_eq!(result, 5.0);
    }

    #[test]
    fn test_divide_by_zero() {
        let result = Calculator::divide(10.0, 0.0);
        assert!(result.is_err());
    }
}
```

### Ví Dụ 2: String Utilities

```rust
fn reverse_string(s: &str) -> String {
    s.chars().rev().collect()
}

fn is_palindrome(s: &str) -> bool {
    let s = s.to_lowercase().replace(" ", "");
    s == reverse_string(&s)
}

fn count_words(s: &str) -> usize {
    s.split_whitespace().count()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_reverse() {
        assert_eq!(reverse_string("hello"), "olleh");
        assert_eq!(reverse_string("rust"), "tsur");
    }

    #[test]
    fn test_palindrome() {
        assert!(is_palindrome("racecar"));
        assert!(is_palindrome("A man a plan a canal Panama"));
        assert!(!is_palindrome("hello"));
    }

    #[test]
    fn test_count_words() {
        assert_eq!(count_words("hello world"), 2);
        assert_eq!(count_words("one two three"), 3);
        assert_eq!(count_words(""), 0);
    }
}
```

### Ví Dụ 3: Vector Operations

```rust
fn sum_vec(v: &[i32]) -> i32 {
    v.iter().sum()
}

fn average_vec(v: &[i32]) -> f64 {
    if v.is_empty() {
        0.0
    } else {
        sum_vec(v) as f64 / v.len() as f64
    }
}

fn max_vec(v: &[i32]) -> Option<i32> {
    v.iter().max().copied()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sum() {
        assert_eq!(sum_vec(&[1, 2, 3, 4, 5]), 15);
        assert_eq!(sum_vec(&[]), 0);
    }

    #[test]
    fn test_average() {
        assert_eq!(average_vec(&[1, 2, 3, 4, 5]), 3.0);
        assert_eq!(average_vec(&[]), 0.0);
    }

    #[test]
    fn test_max() {
        assert_eq!(max_vec(&[1, 5, 3, 2]), Some(5));
        assert_eq!(max_vec(&[]), None);
    }
}
```

### Ví Dụ 4: User Validation

```rust
struct User {
    username: String,
    email: String,
    age: u32,
}

impl User {
    fn new(username: &str, email: &str, age: u32) -> Result<Self, String> {
        if username.is_empty() {
            return Err(String::from("Username cannot be empty"));
        }

        if !email.contains('@') {
            return Err(String::from("Invalid email"));
        }

        if age < 13 {
            return Err(String::from("User must be at least 13 years old"));
        }

        Ok(User {
            username: username.to_string(),
            email: email.to_string(),
            age,
        })
    }

    fn is_adult(&self) -> bool {
        self.age >= 18
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_user() {
        let user = User::new("alice", "alice@example.com", 20);
        assert!(user.is_ok());
    }

    #[test]
    fn test_empty_username() {
        let user = User::new("", "alice@example.com", 20);
        assert!(user.is_err());
    }

    #[test]
    fn test_invalid_email() {
        let user = User::new("alice", "invalid-email", 20);
        assert!(user.is_err());
    }

    #[test]
    fn test_too_young() {
        let user = User::new("alice", "alice@example.com", 10);
        assert!(user.is_err());
    }

    #[test]
    fn test_is_adult() {
        let user = User::new("alice", "alice@example.com", 20).unwrap();
        assert!(user.is_adult());

        let user2 = User::new("bob", "bob@example.com", 15).unwrap();
        assert!(!user2.is_adult());
    }
}
```

### Ví Dụ 5: Shopping Cart

```rust
#[derive(Debug, PartialEq)]
struct Item {
    name: String,
    price: f64,
    quantity: u32,
}

struct Cart {
    items: Vec<Item>,
}

impl Cart {
    fn new() -> Self {
        Cart { items: vec![] }
    }

    fn add_item(&mut self, name: &str, price: f64, quantity: u32) {
        self.items.push(Item {
            name: name.to_string(),
            price,
            quantity,
        });
    }

    fn total(&self) -> f64 {
        self.items
            .iter()
            .map(|item| item.price * item.quantity as f64)
            .sum()
    }

    fn item_count(&self) -> usize {
        self.items.len()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new_cart() {
        let cart = Cart::new();
        assert_eq!(cart.item_count(), 0);
        assert_eq!(cart.total(), 0.0);
    }

    #[test]
    fn test_add_item() {
        let mut cart = Cart::new();
        cart.add_item("Apple", 1.5, 3);
        assert_eq!(cart.item_count(), 1);
    }

    #[test]
    fn test_total() {
        let mut cart = Cart::new();
        cart.add_item("Apple", 1.5, 3);   // 4.5
        cart.add_item("Banana", 2.0, 2);  // 4.0
        assert_eq!(cart.total(), 8.5);
    }
}
```

## 🔧 Testing Private Functions

### Testing in Same Module

```rust
fn public_function(x: i32) -> i32 {
    private_helper(x) * 2
}

fn private_helper(x: i32) -> i32 {
    x + 1
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_public() {
        assert_eq!(public_function(5), 12);
    }

    #[test]
    fn test_private() {
        // Can test private functions in same module
        assert_eq!(private_helper(5), 6);
    }
}
```

## 🎓 #[ignore] Tests

### Ignoring Tests

```rust
#[test]
fn quick_test() {
    assert_eq!(2 + 2, 4);
}

#[test]
#[ignore]
fn slow_test() {
    // This test takes long time
    std::thread::sleep(std::time::Duration::from_secs(5));
    assert_eq!(2 + 2, 4);
}
```

### Running Ignored Tests

```bash
cargo test -- --ignored
```

### Running All Tests

```bash
cargo test -- --include-ignored
```

## 💻 Bài Tập Thực Hành

### Bài 1: Test Simple Function

```rust
fn is_prime(n: u32) -> bool {
    if n < 2 {
        return false;
    }
    for i in 2..=(n as f64).sqrt() as u32 {
        if n % i == 0 {
            return false;
        }
    }
    true
}

#[cfg(test)]
mod tests {
    use super::*;

    // TODO: Viết tests cho is_prime
    // Test: 2, 3, 5, 7 là prime
    // Test: 0, 1, 4, 6 không phải prime
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_prime_numbers() {
        assert!(is_prime(2));
        assert!(is_prime(3));
        assert!(is_prime(5));
        assert!(is_prime(7));
    }

    #[test]
    fn test_non_prime_numbers() {
        assert!(!is_prime(0));
        assert!(!is_prime(1));
        assert!(!is_prime(4));
        assert!(!is_prime(6));
    }
}
```
</details>

### Bài 2: Test with Result

```rust
fn parse_positive(s: &str) -> Result<i32, String> {
    let num: i32 = s.parse()
        .map_err(|_| String::from("Invalid number"))?;

    if num <= 0 {
        return Err(String::from("Number must be positive"));
    }

    Ok(num)
}

#[cfg(test)]
mod tests {
    use super::*;

    // TODO: Test valid positive numbers
    // TODO: Test invalid strings
    // TODO: Test negative numbers
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_positive() {
        assert_eq!(parse_positive("5").unwrap(), 5);
        assert_eq!(parse_positive("100").unwrap(), 100);
    }

    #[test]
    fn test_invalid_string() {
        assert!(parse_positive("abc").is_err());
    }

    #[test]
    fn test_negative() {
        assert!(parse_positive("-5").is_err());
    }

    #[test]
    fn test_zero() {
        assert!(parse_positive("0").is_err());
    }
}
```
</details>

### Bài 3: Test Struct

```rust
struct BankAccount {
    balance: f64,
}

impl BankAccount {
    fn new(initial_balance: f64) -> Self {
        BankAccount { balance: initial_balance }
    }

    fn deposit(&mut self, amount: f64) -> Result<(), String> {
        if amount <= 0.0 {
            return Err(String::from("Amount must be positive"));
        }
        self.balance += amount;
        Ok(())
    }

    fn withdraw(&mut self, amount: f64) -> Result<(), String> {
        if amount <= 0.0 {
            return Err(String::from("Amount must be positive"));
        }
        if amount > self.balance {
            return Err(String::from("Insufficient funds"));
        }
        self.balance -= amount;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // TODO: Test new account
    // TODO: Test deposit
    // TODO: Test withdraw
    // TODO: Test insufficient funds
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new_account() {
        let account = BankAccount::new(100.0);
        assert_eq!(account.balance, 100.0);
    }

    #[test]
    fn test_deposit() {
        let mut account = BankAccount::new(100.0);
        account.deposit(50.0).unwrap();
        assert_eq!(account.balance, 150.0);
    }

    #[test]
    fn test_withdraw() {
        let mut account = BankAccount::new(100.0);
        account.withdraw(30.0).unwrap();
        assert_eq!(account.balance, 70.0);
    }

    #[test]
    fn test_insufficient_funds() {
        let mut account = BankAccount::new(100.0);
        assert!(account.withdraw(150.0).is_err());
    }

    #[test]
    fn test_negative_deposit() {
        let mut account = BankAccount::new(100.0);
        assert!(account.deposit(-50.0).is_err());
    }
}
```
</details>

## 🎯 Tóm Tắt

| Macro | Mô Tả | Example |
|-------|-------|---------|
| **`#[test]`** | Đánh dấu test function | `#[test] fn test() {}` |
| **`assert!`** | Assert condition true | `assert!(x > 0)` |
| **`assert_eq!`** | Assert equality | `assert_eq!(x, 5)` |
| **`assert_ne!`** | Assert inequality | `assert_ne!(x, y)` |
| **`#[should_panic]`** | Expect panic | `#[should_panic]` |
| **`#[ignore]`** | Ignore test | `#[ignore]` |

**Quy tắc vàng**:
- ✅ Viết tests cho mọi function public
- ✅ Test cả success và error cases
- ✅ Dùng descriptive test names
- ✅ Tổ chức tests trong modules
- ✅ Run tests thường xuyên
- ✅ Tests là documentation

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Testing](https://doc.rust-lang.org/book/ch11-00-testing.html)
- [Cargo Test](https://doc.rust-lang.org/cargo/commands/cargo-test.html)

---

**Bài tiếp theo**: [Integration Testing →](./integration-testing.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Integration Testing** - test toàn bộ crate!
