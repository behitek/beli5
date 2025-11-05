# Rust Best Practices

A comprehensive guide to writing idiomatic, maintainable, and performant Rust code.

## Table of Contents
- [Code Organization](#code-organization)
- [Error Handling](#error-handling)
- [Performance](#performance)
- [Security](#security)
- [Testing](#testing)
- [Documentation](#documentation)
- [API Design](#api-design)
- [Memory Management](#memory-management)
- [Concurrency](#concurrency)
- [Dependencies](#dependencies)

## Code Organization

### Module Structure

**Best Practice**: Organize code into logical modules

```rust
// Good: Clear module hierarchy
my_project/
├── src/
│   ├── main.rs
│   ├── lib.rs
│   ├── models/
│   │   ├── mod.rs
│   │   ├── user.rs
│   │   └── post.rs
│   ├── handlers/
│   │   ├── mod.rs
│   │   └── api.rs
│   └── utils/
│       ├── mod.rs
│       └── helpers.rs
```

```rust
// lib.rs
pub mod models;
pub mod handlers;
pub mod utils;

// Re-export commonly used items
pub use models::{User, Post};
pub use handlers::api;
```

### File Organization

**Best Practice**: One primary type per file

```rust
// user.rs - Good
pub struct User {
    // fields
}

impl User {
    // methods
}

// Helper types related to User
pub struct UserBuilder {
    // fields
}

// BAD: Multiple unrelated types in one file
pub struct User { }
pub struct Database { }  // Should be in separate file
```

### Use Declarative Macros for Visibility

```rust
// Good: Make visibility explicit
pub struct Config {
    pub host: String,
    pub port: u16,
    timeout: Duration,  // private
}

impl Config {
    pub fn new(host: String, port: u16) -> Self {
        Self {
            host,
            port,
            timeout: Duration::from_secs(30),
        }
    }

    // Private helper
    fn validate(&self) -> Result<(), Error> {
        // validation logic
    }
}
```

### Prefer Smaller Functions

```rust
// Good: Small, focused functions
fn process_user(user: &User) -> Result<()> {
    validate_user(user)?;
    update_database(user)?;
    send_notification(user)?;
    Ok(())
}

fn validate_user(user: &User) -> Result<()> {
    if user.email.is_empty() {
        return Err(Error::InvalidEmail);
    }
    Ok(())
}

// BAD: Large monolithic function
fn process_user_bad(user: &User) -> Result<()> {
    // 200 lines of mixed concerns
}
```

## Error Handling

### Use Result for Recoverable Errors

```rust
// Good: Use Result for errors that can be handled
fn read_config(path: &Path) -> Result<Config, ConfigError> {
    let content = fs::read_to_string(path)?;
    let config = parse_config(&content)?;
    Ok(config)
}

// BAD: Don't use panic for recoverable errors
fn read_config_bad(path: &Path) -> Config {
    let content = fs::read_to_string(path)
        .expect("Failed to read config");  // BAD
    parse_config(&content).unwrap()  // BAD
}
```

### Create Custom Error Types

```rust
// Good: Informative custom errors
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ConfigError {
    #[error("Failed to read config file: {0}")]
    Io(#[from] std::io::Error),

    #[error("Invalid configuration: {0}")]
    Parse(String),

    #[error("Missing required field: {field}")]
    MissingField { field: String },
}

// Usage
fn load_config() -> Result<Config, ConfigError> {
    let content = fs::read_to_string("config.toml")?;
    parse_toml(&content)
        .map_err(|e| ConfigError::Parse(e.to_string()))
}
```

### Use ? Operator for Error Propagation

```rust
// Good: Clean error propagation
fn process() -> Result<Data, Error> {
    let input = read_input()?;
    let parsed = parse_data(&input)?;
    let validated = validate_data(parsed)?;
    Ok(validated)
}

// BAD: Verbose match statements
fn process_bad() -> Result<Data, Error> {
    let input = match read_input() {
        Ok(i) => i,
        Err(e) => return Err(e),
    };
    // ... repeated for each call
}
```

### Provide Context for Errors

```rust
use anyhow::{Context, Result};

// Good: Add context to errors
fn load_user_config(user_id: u64) -> Result<Config> {
    let path = format!("/users/{}/config.toml", user_id);

    let content = fs::read_to_string(&path)
        .context(format!("Failed to read config for user {}", user_id))?;

    let config = parse_config(&content)
        .context("Invalid configuration format")?;

    Ok(config)
}
```

### Use Option for Missing Values

```rust
// Good: Use Option for values that may not exist
fn find_user(id: u64) -> Option<User> {
    database.users.get(&id).cloned()
}

// Good: Convert Option to Result when needed
fn get_user(id: u64) -> Result<User, Error> {
    find_user(id)
        .ok_or_else(|| Error::UserNotFound(id))
}
```

## Performance

### Avoid Unnecessary Allocations

```rust
// Good: Use &str for read-only strings
fn process_name(name: &str) -> String {
    format!("Hello, {}", name)
}

// BAD: Unnecessary String allocation
fn process_name_bad(name: String) -> String {
    format!("Hello, {}", name)
}

// Good: Reuse buffers
fn read_lines(path: &Path) -> Result<Vec<String>> {
    let file = File::open(path)?;
    let reader = BufReader::new(file);
    reader.lines().collect()
}
```

### Use Iterators Instead of Loops

```rust
// Good: Iterator chains (lazy evaluation)
let sum: i32 = numbers
    .iter()
    .filter(|&&x| x > 0)
    .map(|&x| x * 2)
    .sum();

// Less efficient: Manual loop
let mut sum = 0;
for &num in &numbers {
    if num > 0 {
        sum += num * 2;
    }
}
```

### Clone Strategically

```rust
// Good: Clone only when necessary
fn process(data: &Data) -> Result<Output> {
    // Work with references when possible
    analyze(data)?;

    // Clone only when ownership is needed
    let owned_data = data.clone();
    transform(owned_data)
}

// BAD: Unnecessary clones
fn process_bad(data: &Data) -> Result<Output> {
    let copy1 = data.clone();  // BAD: Not needed
    let copy2 = data.clone();  // BAD: Not needed
    analyze(&copy1)?;
    transform(copy2)
}
```

### Use `Cow` for Conditional Ownership

```rust
use std::borrow::Cow;

// Good: Avoid allocation when not needed
fn normalize(input: &str) -> Cow<str> {
    if input.contains("bad_word") {
        Cow::Owned(input.replace("bad_word", "***"))
    } else {
        Cow::Borrowed(input)  // No allocation
    }
}
```

### Prefer `Vec::with_capacity`

```rust
// Good: Pre-allocate when size is known
let mut vec = Vec::with_capacity(1000);
for i in 0..1000 {
    vec.push(i);
}

// Less efficient: Multiple reallocations
let mut vec = Vec::new();
for i in 0..1000 {
    vec.push(i);
}
```

## Security

### Validate All Input

```rust
// Good: Validate input
pub fn create_user(email: &str, age: i32) -> Result<User, ValidationError> {
    if !is_valid_email(email) {
        return Err(ValidationError::InvalidEmail);
    }

    if age < 0 || age > 150 {
        return Err(ValidationError::InvalidAge);
    }

    Ok(User { email: email.to_string(), age })
}

fn is_valid_email(email: &str) -> bool {
    // Email validation logic
    email.contains('@') && email.contains('.')
}
```

### Use Type Safety for Security

```rust
// Good: Type-safe password handling
pub struct Password(String);

impl Password {
    pub fn new(password: String) -> Result<Self, Error> {
        if password.len() < 8 {
            return Err(Error::PasswordTooShort);
        }
        Ok(Self(password))
    }
}

// Prevents accidental password logging
impl std::fmt::Debug for Password {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Password([REDACTED])")
    }
}
```

### Avoid Panics in Library Code

```rust
// Good: Return Result instead of panicking
pub fn divide(a: f64, b: f64) -> Result<f64, MathError> {
    if b == 0.0 {
        Err(MathError::DivisionByZero)
    } else {
        Ok(a / b)
    }
}

// BAD: Library code that panics
pub fn divide_bad(a: f64, b: f64) -> f64 {
    if b == 0.0 {
        panic!("Division by zero");  // BAD for libraries
    }
    a / b
}
```

### Use Zeroize for Sensitive Data

```toml
[dependencies]
zeroize = "1.7"
```

```rust
use zeroize::Zeroize;

pub struct SecretKey {
    key: Vec<u8>,
}

impl Drop for SecretKey {
    fn drop(&mut self) {
        self.key.zeroize();  // Clear memory on drop
    }
}
```

## Testing

### Write Unit Tests

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 2), 4);
    }

    #[test]
    fn test_divide() {
        assert!(divide(10.0, 2.0).is_ok());
        assert!(divide(10.0, 0.0).is_err());
    }

    #[test]
    #[should_panic(expected = "index out of bounds")]
    fn test_panic() {
        let v = vec![1, 2, 3];
        let _ = v[99];
    }
}
```

### Write Integration Tests

```rust
// tests/integration_test.rs
use my_crate::*;

#[test]
fn test_end_to_end() {
    let config = Config::load("test_config.toml").unwrap();
    let result = process_with_config(&config).unwrap();
    assert_eq!(result, expected_output());
}
```

### Use Test Helpers

```rust
#[cfg(test)]
mod tests {
    use super::*;

    // Test helper functions
    fn create_test_user() -> User {
        User {
            id: 1,
            name: "Test User".to_string(),
            email: "test@example.com".to_string(),
        }
    }

    #[test]
    fn test_user_operations() {
        let user = create_test_user();
        assert_eq!(user.id, 1);
    }
}
```

### Test Error Cases

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_error_cases() {
        // Test error conditions
        assert!(parse_age("-1").is_err());
        assert!(parse_age("abc").is_err());
        assert!(parse_age("200").is_err());

        // Test success case
        assert_eq!(parse_age("25").unwrap(), 25);
    }
}
```

### Use Property-Based Testing

```rust
use proptest::prelude::*;

proptest! {
    #[test]
    fn test_reverse_twice(ref vec in prop::collection::vec(any::<i32>(), 0..100)) {
        let reversed_twice = reverse(&reverse(vec));
        prop_assert_eq!(vec, &reversed_twice);
    }
}
```

## Documentation

### Document Public APIs

```rust
/// Calculates the sum of two numbers.
///
/// # Arguments
///
/// * `a` - The first number
/// * `b` - The second number
///
/// # Examples
///
/// ```
/// use my_crate::add;
/// assert_eq!(add(2, 2), 4);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

### Document Error Cases

```rust
/// Divides two numbers.
///
/// # Errors
///
/// Returns `DivisionError::ZeroDivisor` if `b` is zero.
///
/// # Examples
///
/// ```
/// use my_crate::divide;
/// assert_eq!(divide(10.0, 2.0).unwrap(), 5.0);
/// assert!(divide(10.0, 0.0).is_err());
/// ```
pub fn divide(a: f64, b: f64) -> Result<f64, DivisionError> {
    if b == 0.0 {
        Err(DivisionError::ZeroDivisor)
    } else {
        Ok(a / b)
    }
}
```

### Use Inline Comments Sparingly

```rust
// Good: Code is self-explanatory
fn calculate_total_price(items: &[Item], tax_rate: f64) -> f64 {
    let subtotal = items.iter().map(|i| i.price).sum::<f64>();
    let tax = subtotal * tax_rate;
    subtotal + tax
}

// BAD: Redundant comments
fn calculate_total_price_bad(items: &[Item], tax_rate: f64) -> f64 {
    // Calculate subtotal
    let subtotal = items.iter().map(|i| i.price).sum::<f64>();
    // Calculate tax
    let tax = subtotal * tax_rate;
    // Return total
    subtotal + tax
}

// GOOD: Explaining non-obvious logic
fn process_data(data: &[u8]) -> Result<Vec<u8>> {
    // We need to skip the first 4 bytes because they contain
    // the legacy header format from version 1.0
    let payload = &data[4..];
    decompress(payload)
}
```

### Document Module Purpose

```rust
//! # User Management Module
//!
//! This module provides functionality for managing user accounts,
//! including creation, authentication, and profile updates.
//!
//! # Examples
//!
//! ```
//! use my_app::users::{User, create_user};
//!
//! let user = create_user("alice", "alice@example.com")?;
//! ```
```

## API Design

### Accept Borrowed Types

```rust
// Good: Accept &str and &[T]
pub fn process_name(name: &str) -> String {
    format!("Hello, {}", name)
}

pub fn sum_numbers(numbers: &[i32]) -> i32 {
    numbers.iter().sum()
}

// BAD: Forces unnecessary allocation
pub fn process_name_bad(name: String) -> String {
    format!("Hello, {}", name)
}
```

### Return Owned Types

```rust
// Good: Return owned types
pub fn create_greeting(name: &str) -> String {
    format!("Hello, {}", name)
}

// BAD: Unnecessary lifetime complexity
pub fn create_greeting_bad<'a>(name: &'a str) -> &'a str {
    // Can't modify the string
    name
}
```

### Use Builder Pattern for Complex Construction

```rust
pub struct Config {
    host: String,
    port: u16,
    timeout: Duration,
    retries: u32,
}

pub struct ConfigBuilder {
    host: String,
    port: u16,
    timeout: Option<Duration>,
    retries: Option<u32>,
}

impl ConfigBuilder {
    pub fn new(host: impl Into<String>, port: u16) -> Self {
        Self {
            host: host.into(),
            port,
            timeout: None,
            retries: None,
        }
    }

    pub fn timeout(mut self, timeout: Duration) -> Self {
        self.timeout = Some(timeout);
        self
    }

    pub fn retries(mut self, retries: u32) -> Self {
        self.retries = Some(retries);
        self
    }

    pub fn build(self) -> Config {
        Config {
            host: self.host,
            port: self.port,
            timeout: self.timeout.unwrap_or(Duration::from_secs(30)),
            retries: self.retries.unwrap_or(3),
        }
    }
}

// Usage
let config = ConfigBuilder::new("localhost", 8080)
    .timeout(Duration::from_secs(60))
    .retries(5)
    .build();
```

### Use `impl Trait` for Return Types

```rust
// Good: Hide implementation details
pub fn get_numbers() -> impl Iterator<Item = i32> {
    (0..10).map(|x| x * 2)
}

// BAD: Exposes implementation
pub fn get_numbers_bad() -> std::iter::Map<std::ops::Range<i32>, fn(i32) -> i32> {
    (0..10).map(|x| x * 2)
}
```

### Design for Extension

```rust
// Good: Use traits for extensibility
pub trait DataProcessor {
    fn process(&self, data: &[u8]) -> Result<Vec<u8>>;
}

pub struct CompressProcessor;
impl DataProcessor for CompressProcessor {
    fn process(&self, data: &[u8]) -> Result<Vec<u8>> {
        // compression logic
        Ok(data.to_vec())
    }
}

pub struct EncryptProcessor;
impl DataProcessor for EncryptProcessor {
    fn process(&self, data: &[u8]) -> Result<Vec<u8>> {
        // encryption logic
        Ok(data.to_vec())
    }
}
```

## Memory Management

### Prefer References Over Clone

```rust
// Good: Use references
fn analyze_data(data: &LargeData) -> Summary {
    Summary {
        size: data.items.len(),
        total: data.items.iter().sum(),
    }
}

// BAD: Unnecessary clone
fn analyze_data_bad(data: LargeData) -> Summary {
    Summary {
        size: data.items.len(),
        total: data.items.iter().sum(),
    }
}
```

### Use Arc for Shared Ownership

```rust
use std::sync::Arc;
use std::thread;

// Good: Shared ownership across threads
fn process_in_parallel(data: Arc<Vec<i32>>) {
    let data1 = Arc::clone(&data);
    let handle1 = thread::spawn(move || {
        println!("Thread 1: {}", data1.len());
    });

    let data2 = Arc::clone(&data);
    let handle2 = thread::spawn(move || {
        println!("Thread 2: {}", data2.len());
    });

    handle1.join().unwrap();
    handle2.join().unwrap();
}
```

### Use Drop for Resource Cleanup

```rust
pub struct FileGuard {
    file: File,
}

impl Drop for FileGuard {
    fn drop(&mut self) {
        // Cleanup happens automatically
        self.file.sync_all().ok();
        println!("File closed");
    }
}
```

## Concurrency

### Use Message Passing

```rust
use std::sync::mpsc;
use std::thread;

fn worker_pattern() {
    let (tx, rx) = mpsc::channel();

    // Spawn worker thread
    thread::spawn(move || {
        for msg in rx {
            process_message(msg);
        }
    });

    // Send messages
    for i in 0..10 {
        tx.send(i).unwrap();
    }
}
```

### Use Mutex for Shared State

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn shared_counter() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```

### Prefer RwLock for Read-Heavy Workloads

```rust
use std::sync::{Arc, RwLock};

fn cache_example() {
    let cache = Arc::new(RwLock::new(HashMap::new()));

    // Multiple readers
    {
        let read = cache.read().unwrap();
        println!("{:?}", read.get("key"));
    }

    // Single writer
    {
        let mut write = cache.write().unwrap();
        write.insert("key", "value");
    }
}
```

## Dependencies

### Minimize Dependencies

```toml
# Good: Only necessary dependencies
[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1.0", features = ["rt-multi-thread", "macros"] }

# BAD: Unnecessary or overly broad features
[dependencies]
tokio = { version = "1.0", features = ["full"] }  # Usually too much
```

### Pin Critical Dependencies

```toml
# Good: Pin version for critical deps
[dependencies]
security-lib = "=1.2.3"  # Exact version

# Development deps can be more flexible
[dev-dependencies]
criterion = "0.5"  # Use semantic versioning
```

### Audit Dependencies Regularly

```bash
# Install cargo-audit
cargo install cargo-audit

# Check for vulnerabilities
cargo audit

# Update dependencies
cargo update
```

## Quick Checklist

### Before Committing
- [ ] Run `cargo fmt` to format code
- [ ] Run `cargo clippy` and fix warnings
- [ ] Run `cargo test` and ensure all tests pass
- [ ] Check `cargo doc` builds without errors
- [ ] Review for unwrap() calls (use ? or proper error handling)
- [ ] Ensure public APIs are documented
- [ ] Add tests for new functionality

### Before Releasing
- [ ] Update version in Cargo.toml
- [ ] Update CHANGELOG.md
- [ ] Run full test suite with all features
- [ ] Run `cargo audit` for security issues
- [ ] Check dependencies are up to date
- [ ] Ensure documentation is complete
- [ ] Review breaking changes

### Code Review Checklist
- [ ] Error handling is appropriate
- [ ] No unnecessary allocations or clones
- [ ] Public APIs follow Rust conventions
- [ ] Code is well-documented
- [ ] Tests cover edge cases
- [ ] No unwrap() in library code
- [ ] Lifetimes are minimal and necessary
