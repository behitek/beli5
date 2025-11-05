# Error Handling Exercises

Master Rust's error handling with these exercises covering Option, Result, the ? operator, custom errors, and error propagation patterns.

---

## Exercise 1: Option Basics

**Difficulty**: Easy

**Problem**: Write functions that work with `Option` to handle missing values.

**Requirements**:
- Get element at index (return `Option`)
- Find first element matching predicate
- Use pattern matching and combinators

**Example**:
```rust
let numbers = vec![1, 2, 3, 4, 5];
get_element(&numbers, 2)  // Some(3)
get_element(&numbers, 10) // None
```

**Hints**:
- Use `get()` method on slices
- Use `iter().find()` for searching
- Return `Option<T>`

<details>
<summary>Solution</summary>

```rust
fn get_element<T: Clone>(items: &[T], index: usize) -> Option<T> {
    items.get(index).cloned()
}

fn find_first_even(numbers: &[i32]) -> Option<i32> {
    numbers.iter()
        .find(|&&n| n % 2 == 0)
        .copied()
}

fn first_and_last<T: Clone>(items: &[T]) -> Option<(T, T)> {
    if items.is_empty() {
        None
    } else {
        Some((items[0].clone(), items[items.len() - 1].clone()))
    }
}

fn safe_divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    match get_element(&numbers, 2) {
        Some(n) => println!("Element at index 2: {}", n),
        None => println!("Index out of bounds"),
    }

    match find_first_even(&numbers) {
        Some(n) => println!("First even number: {}", n),
        None => println!("No even number found"),
    }

    match first_and_last(&numbers) {
        Some((first, last)) => println!("First: {}, Last: {}", first, last),
        None => println!("Empty array"),
    }

    println!("10 / 2 = {:?}", safe_divide(10.0, 2.0));
    println!("10 / 0 = {:?}", safe_divide(10.0, 0.0));
}
```

</details>

**Learning Points**:
- `Option<T>` for nullable values
- Pattern matching on Option
- Using `get()` for safe indexing
- Returning None for error cases

---

## Exercise 2: Option Combinators

**Difficulty**: Easy

**Problem**: Use Option combinators instead of explicit pattern matching.

**Requirements**:
- Use `map`, `and_then`, `unwrap_or`, `unwrap_or_else`
- Chain operations on Option values
- Avoid nested match statements

**Example**:
```rust
let maybe_number = Some(5);
let doubled = maybe_number.map(|n| n * 2);  // Some(10)
```

**Hints**:
- `map` transforms the inner value
- `and_then` for chaining Options
- `unwrap_or` for default values
- `unwrap_or_else` for computed defaults

<details>
<summary>Solution</summary>

```rust
fn double_if_even(n: i32) -> Option<i32> {
    if n % 2 == 0 {
        Some(n)
    } else {
        None
    }
    .map(|x| x * 2)
}

fn process_string(s: Option<&str>) -> String {
    s.map(|text| text.to_uppercase())
        .unwrap_or_else(|| "DEFAULT".to_string())
}

fn chain_operations(n: Option<i32>) -> Option<i32> {
    n.map(|x| x + 1)
        .and_then(|x| if x > 10 { Some(x) } else { None })
        .map(|x| x * 2)
}

fn get_length(s: Option<&str>) -> usize {
    s.map(|text| text.len())
        .unwrap_or(0)
}

fn main() {
    println!("Double if even(4): {:?}", double_if_even(4));
    println!("Double if even(5): {:?}", double_if_even(5));

    println!("Process Some: {}", process_string(Some("hello")));
    println!("Process None: {}", process_string(None));

    println!("Chain(Some(10)): {:?}", chain_operations(Some(10)));
    println!("Chain(Some(5)): {:?}", chain_operations(Some(5)));

    println!("Length of Some: {}", get_length(Some("hello")));
    println!("Length of None: {}", get_length(None));
}
```

</details>

**Learning Points**:
- Option combinators for cleaner code
- `map` for transformations
- `and_then` for chaining fallible operations
- `unwrap_or` and `unwrap_or_else` for defaults

---

## Exercise 3: Result Basics

**Difficulty**: Easy

**Problem**: Create functions that return `Result` for operations that can fail.

**Requirements**:
- Parse string to integer
- Validate input
- Use custom error messages
- Return `Result<T, String>`

**Example**:
```rust
parse_positive("42")   // Ok(42)
parse_positive("-5")   // Err("Number must be positive")
parse_positive("abc")  // Err("Invalid number")
```

**Hints**:
- Use `str::parse()` which returns Result
- Check conditions and return Err
- Use descriptive error messages

<details>
<summary>Solution</summary>

```rust
fn parse_positive(s: &str) -> Result<i32, String> {
    let num = s.parse::<i32>()
        .map_err(|_| "Invalid number".to_string())?;

    if num > 0 {
        Ok(num)
    } else {
        Err("Number must be positive".to_string())
    }
}

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Division by zero".to_string())
    } else {
        Ok(a / b)
    }
}

fn validate_email(email: &str) -> Result<String, String> {
    if email.contains('@') && email.contains('.') {
        Ok(email.to_string())
    } else {
        Err("Invalid email format".to_string())
    }
}

fn sqrt_safe(n: f64) -> Result<f64, String> {
    if n < 0.0 {
        Err("Cannot take square root of negative number".to_string())
    } else {
        Ok(n.sqrt())
    }
}

fn main() {
    match parse_positive("42") {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    match parse_positive("-5") {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    match divide(10.0, 2.0) {
        Ok(result) => println!("10 / 2 = {}", result),
        Err(e) => println!("Error: {}", e),
    }

    match validate_email("test@example.com") {
        Ok(email) => println!("Valid email: {}", email),
        Err(e) => println!("Error: {}", e),
    }
}
```

</details>

**Learning Points**:
- `Result<T, E>` for fallible operations
- `Ok` for success, `Err` for failure
- Using `?` operator for early return
- `map_err` for transforming errors

---

## Exercise 4: The ? Operator

**Difficulty**: Medium

**Problem**: Use the `?` operator to propagate errors cleanly.

**Requirements**:
- Chain multiple fallible operations
- Use `?` to propagate errors
- Simplify error handling code
- Return appropriate Result type

**Example**:
```rust
fn process_data(input: &str) -> Result<i32, String> {
    let num = parse_number(input)?;
    let doubled = multiply_by_two(num)?;
    Ok(doubled)
}
```

**Hints**:
- `?` automatically returns Err if operation fails
- Works with both Option and Result
- Must be used in functions returning Result/Option
- Converts error types automatically with From trait

<details>
<summary>Solution</summary>

```rust
fn parse_number(s: &str) -> Result<i32, String> {
    s.parse::<i32>()
        .map_err(|e| format!("Parse error: {}", e))
}

fn multiply_by_two(n: i32) -> Result<i32, String> {
    if n > i32::MAX / 2 {
        Err("Overflow would occur".to_string())
    } else {
        Ok(n * 2)
    }
}

fn process_data(input: &str) -> Result<i32, String> {
    let num = parse_number(input)?;
    let doubled = multiply_by_two(num)?;
    Ok(doubled)
}

fn calculate_average(numbers: &[&str]) -> Result<f64, String> {
    let mut sum = 0.0;
    let mut count = 0;

    for s in numbers {
        let num = s.parse::<f64>()
            .map_err(|e| format!("Failed to parse '{}': {}", s, e))?;
        sum += num;
        count += 1;
    }

    if count == 0 {
        Err("No numbers provided".to_string())
    } else {
        Ok(sum / count as f64)
    }
}

fn read_and_parse(data: &str) -> Result<Vec<i32>, String> {
    data.split(',')
        .map(|s| s.trim().parse::<i32>()
            .map_err(|e| format!("Parse error: {}", e)))
        .collect()
}

fn main() {
    match process_data("21") {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }

    match process_data("abc") {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }

    let numbers = vec!["10", "20", "30"];
    match calculate_average(&numbers) {
        Ok(avg) => println!("Average: {}", avg),
        Err(e) => println!("Error: {}", e),
    }

    match read_and_parse("1, 2, 3, 4, 5") {
        Ok(nums) => println!("Parsed: {:?}", nums),
        Err(e) => println!("Error: {}", e),
    }
}
```

</details>

**Learning Points**:
- `?` operator for error propagation
- Cleaner than explicit match statements
- Works with collect() on iterators
- Error conversion with map_err

---

## Exercise 5: Custom Error Types

**Difficulty**: Medium

**Problem**: Define custom error types for your domain.

**Requirements**:
- Create an enum for different error cases
- Implement `Display` and `Debug`
- Use in Result types
- Provide meaningful error messages

**Example**:
```rust
enum MathError {
    DivisionByZero,
    NegativeSquareRoot,
    Overflow,
}
```

**Hints**:
- Use enum for multiple error variants
- Derive `Debug`
- Implement `Display` for user-friendly messages
- Can store additional error data in variants

<details>
<summary>Solution</summary>

```rust
use std::fmt;

#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeSquareRoot,
    Overflow,
    InvalidInput(String),
}

impl fmt::Display for MathError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            MathError::DivisionByZero => write!(f, "Cannot divide by zero"),
            MathError::NegativeSquareRoot => write!(f, "Cannot take square root of negative number"),
            MathError::Overflow => write!(f, "Arithmetic overflow occurred"),
            MathError::InvalidInput(msg) => write!(f, "Invalid input: {}", msg),
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

fn sqrt(n: f64) -> Result<f64, MathError> {
    if n < 0.0 {
        Err(MathError::NegativeSquareRoot)
    } else {
        Ok(n.sqrt())
    }
}

fn checked_multiply(a: i32, b: i32) -> Result<i32, MathError> {
    a.checked_mul(b)
        .ok_or(MathError::Overflow)
}

fn calculate(operation: &str, a: f64, b: f64) -> Result<f64, MathError> {
    match operation {
        "add" => Ok(a + b),
        "subtract" => Ok(a - b),
        "multiply" => Ok(a * b),
        "divide" => divide(a, b),
        _ => Err(MathError::InvalidInput(format!("Unknown operation: {}", operation))),
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }

    match divide(10.0, 0.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }

    match sqrt(-4.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }

    match checked_multiply(1000000, 1000000) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
}
```

</details>

**Learning Points**:
- Custom error enums
- Implementing `Display` trait
- Implementing `Error` trait
- Variants with and without data
- Type-safe error handling

---

## Exercise 6: Converting Between Error Types

**Difficulty**: Medium

**Problem**: Convert between different error types using `From` trait.

**Requirements**:
- Implement `From` for error conversion
- Use `?` operator with different error types
- Chain operations with mixed error types
- Use `map_err` when From isn't available

**Example**:
```rust
impl From<ParseIntError> for MyError {
    fn from(err: ParseIntError) -> Self {
        MyError::ParseError(err.to_string())
    }
}
```

**Hints**:
- Implement `From<OtherError>` for automatic conversion
- `?` operator uses `From` for conversion
- Use `map_err` for manual conversion
- `Box<dyn Error>` for generic errors

<details>
<summary>Solution</summary>

```rust
use std::num::ParseIntError;
use std::fmt;

#[derive(Debug)]
enum AppError {
    ParseError(String),
    IoError(String),
    ValidationError(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::ParseError(msg) => write!(f, "Parse error: {}", msg),
            AppError::IoError(msg) => write!(f, "IO error: {}", msg),
            AppError::ValidationError(msg) => write!(f, "Validation error: {}", msg),
        }
    }
}

impl std::error::Error for AppError {}

// Automatic conversion from ParseIntError
impl From<ParseIntError> for AppError {
    fn from(err: ParseIntError) -> Self {
        AppError::ParseError(err.to_string())
    }
}

// Now we can use ? with ParseIntError directly
fn parse_and_validate(s: &str) -> Result<i32, AppError> {
    let num: i32 = s.parse()?;  // Automatically converted to AppError

    if num < 0 {
        return Err(AppError::ValidationError("Number must be positive".to_string()));
    }

    Ok(num)
}

fn process_multiple(inputs: &[&str]) -> Result<Vec<i32>, AppError> {
    inputs.iter()
        .map(|s| parse_and_validate(s))
        .collect()
}

// Using Box<dyn Error> for maximum flexibility
fn flexible_error_handling(s: &str) -> Result<i32, Box<dyn std::error::Error>> {
    let num: i32 = s.parse()?;
    Ok(num * 2)
}

fn main() {
    match parse_and_validate("42") {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    match parse_and_validate("-5") {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    match parse_and_validate("abc") {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    let inputs = vec!["1", "2", "3"];
    match process_multiple(&inputs) {
        Ok(nums) => println!("All parsed: {:?}", nums),
        Err(e) => println!("Error: {}", e),
    }
}
```

</details>

**Learning Points**:
- `From` trait for error conversion
- Automatic conversion with `?`
- `Box<dyn Error>` for flexibility
- Chaining different error types
- `collect()` with Result

---

## Exercise 7: Error Context with map_err

**Difficulty**: Medium

**Problem**: Add context to errors as they propagate.

**Requirements**:
- Use `map_err` to add context
- Preserve original error information
- Make errors more informative
- Chain context through multiple levels

**Example**:
```rust
fn read_config() -> Result<Config, String> {
    let content = read_file("config.json")
        .map_err(|e| format!("Failed to read config: {}", e))?;
    // ...
}
```

**Hints**:
- `map_err` transforms error values
- Can wrap errors with context
- Useful for debugging error chains
- Consider including file names, line numbers, etc.

<details>
<summary>Solution</summary>

```rust
#[derive(Debug)]
struct Config {
    host: String,
    port: u16,
}

fn parse_port(s: &str) -> Result<u16, String> {
    s.parse::<u16>()
        .map_err(|e| format!("Invalid port '{}': {}", s, e))
}

fn validate_host(host: &str) -> Result<String, String> {
    if host.is_empty() {
        Err("Host cannot be empty".to_string())
    } else if host.len() > 255 {
        Err(format!("Host too long: {} characters", host.len()))
    } else {
        Ok(host.to_string())
    }
}

fn parse_config(host: &str, port: &str) -> Result<Config, String> {
    let host = validate_host(host)
        .map_err(|e| format!("Host validation failed: {}", e))?;

    let port = parse_port(port)
        .map_err(|e| format!("Port parsing failed: {}", e))?;

    Ok(Config { host, port })
}

fn load_config(config_str: &str) -> Result<Config, String> {
    let parts: Vec<&str> = config_str.split(':').collect();

    if parts.len() != 2 {
        return Err(format!("Invalid config format: expected 'host:port', got '{}'", config_str));
    }

    parse_config(parts[0], parts[1])
        .map_err(|e| format!("Failed to load config from '{}': {}", config_str, e))
}

fn process_configs(configs: &[&str]) -> Result<Vec<Config>, String> {
    configs.iter()
        .enumerate()
        .map(|(i, config)| {
            load_config(config)
                .map_err(|e| format!("Config #{}: {}", i + 1, e))
        })
        .collect()
}

fn main() {
    match load_config("localhost:8080") {
        Ok(config) => println!("Config: {:?}", config),
        Err(e) => println!("Error: {}", e),
    }

    match load_config("localhost:invalid") {
        Ok(config) => println!("Config: {:?}", config),
        Err(e) => println!("Error: {}", e),
    }

    match load_config(":8080") {
        Ok(config) => println!("Config: {:?}", config),
        Err(e) => println!("Error: {}", e),
    }

    let configs = vec!["localhost:8080", "server:9000", "bad"];
    match process_configs(&configs) {
        Ok(configs) => println!("All configs: {:?}", configs),
        Err(e) => println!("Error: {}", e),
    }
}
```

</details>

**Learning Points**:
- Adding context with `map_err`
- Error messages with helpful information
- Tracking error location in processing
- Building error chains

---

## Exercise 8: Combining Option and Result

**Difficulty**: Medium

**Problem**: Work with functions that return both Option and Result.

**Requirements**:
- Convert Option to Result with `ok_or`
- Convert Result to Option with `ok()`
- Use `transpose()` for `Option<Result<T, E>>`
- Chain operations mixing both types

**Example**:
```rust
fn find_and_parse(numbers: &[&str], index: usize) -> Result<i32, String> {
    numbers.get(index)
        .ok_or("Index out of bounds")?
        .parse()
        .map_err(|e| format!("Parse error: {}", e))
}
```

**Hints**:
- `ok_or` converts None to Err
- `ok_or_else` computes error lazily
- `ok()` converts Result to Option
- Use `?` with both types

<details>
<summary>Solution</summary>

```rust
fn get_and_parse(numbers: &[&str], index: usize) -> Result<i32, String> {
    numbers.get(index)
        .ok_or_else(|| format!("Index {} out of bounds", index))?
        .parse()
        .map_err(|e| format!("Parse error: {}", e))
}

fn find_user_age(users: &[(String, Option<u32>)], name: &str) -> Result<u32, String> {
    users.iter()
        .find(|(n, _)| n == name)
        .ok_or_else(|| format!("User '{}' not found", name))?
        .1
        .ok_or_else(|| format!("User '{}' has no age", name))
}

fn safe_division_lookup(nums: &[i32], dividend_idx: usize, divisor_idx: usize) -> Result<f64, String> {
    let dividend = nums.get(dividend_idx)
        .ok_or("Dividend index out of bounds")?;

    let divisor = nums.get(divisor_idx)
        .ok_or("Divisor index out of bounds")?;

    if *divisor == 0 {
        Err("Division by zero".to_string())
    } else {
        Ok(*dividend as f64 / *divisor as f64)
    }
}

// Working with Option<Result<T, E>>
fn process_optional_results(data: Vec<Option<Result<i32, String>>>) -> Result<Vec<i32>, String> {
    data.into_iter()
        .map(|opt_res| {
            opt_res.ok_or("Missing value")? // Option -> Result
        })
        .collect()
}

fn main() {
    let numbers = vec!["1", "2", "3", "4", "5"];

    match get_and_parse(&numbers, 2) {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    match get_and_parse(&numbers, 10) {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    let users = vec![
        ("Alice".to_string(), Some(30)),
        ("Bob".to_string(), None),
        ("Carol".to_string(), Some(25)),
    ];

    match find_user_age(&users, "Alice") {
        Ok(age) => println!("Alice's age: {}", age),
        Err(e) => println!("Error: {}", e),
    }

    match find_user_age(&users, "Bob") {
        Ok(age) => println!("Bob's age: {}", age),
        Err(e) => println!("Error: {}", e),
    }

    let nums = vec![10, 20, 30, 0, 5];
    match safe_division_lookup(&nums, 1, 0) {
        Ok(result) => println!("Division result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
}
```

</details>

**Learning Points**:
- Converting between Option and Result
- `ok_or` and `ok_or_else`
- Chaining Option and Result operations
- Working with nested types

---

## Exercise 9: Error Recovery

**Difficulty**: Medium

**Problem**: Implement functions that can recover from errors with fallback values.

**Requirements**:
- Provide default values on error
- Try multiple approaches
- Use `or_else` for recovery
- Implement retry logic

**Example**:
```rust
fn load_config_with_fallback() -> Config {
    load_config("config.json")
        .or_else(|_| load_config("default.json"))
        .unwrap_or(Config::default())
}
```

**Hints**:
- `unwrap_or` for simple defaults
- `unwrap_or_else` for computed defaults
- `or_else` to try alternative
- Chain multiple recovery strategies

<details>
<summary>Solution</summary>

```rust
#[derive(Debug, Clone)]
struct Config {
    host: String,
    port: u16,
}

impl Config {
    fn default() -> Self {
        Config {
            host: "localhost".to_string(),
            port: 8080,
        }
    }
}

fn parse_config(s: &str) -> Result<Config, String> {
    let parts: Vec<&str> = s.split(':').collect();
    if parts.len() != 2 {
        return Err("Invalid format".to_string());
    }

    let host = parts[0].to_string();
    let port = parts[1].parse()
        .map_err(|_| "Invalid port".to_string())?;

    Ok(Config { host, port })
}

fn load_config_with_fallback(primary: &str, secondary: &str) -> Config {
    parse_config(primary)
        .or_else(|_| parse_config(secondary))
        .unwrap_or_else(|_| Config::default())
}

fn get_value_with_default(map: &std::collections::HashMap<String, i32>, key: &str) -> i32 {
    map.get(key)
        .copied()
        .unwrap_or(0)
}

fn parse_with_retry(inputs: &[&str]) -> Result<i32, String> {
    for (i, input) in inputs.iter().enumerate() {
        match input.parse::<i32>() {
            Ok(n) => return Ok(n),
            Err(_) if i < inputs.len() - 1 => continue,
            Err(e) => return Err(format!("All attempts failed. Last error: {}", e)),
        }
    }
    Err("No inputs provided".to_string())
}

fn safe_divide_with_fallback(a: f64, b: f64, fallback: f64) -> f64 {
    if b == 0.0 {
        fallback
    } else {
        a / b
    }
}

fn main() {
    // Test fallback loading
    let config1 = load_config_with_fallback("localhost:8080", "server:9000");
    println!("Config 1: {:?}", config1);

    let config2 = load_config_with_fallback("invalid", "server:9000");
    println!("Config 2: {:?}", config2);

    let config3 = load_config_with_fallback("invalid", "also-invalid");
    println!("Config 3 (default): {:?}", config3);

    // Test parse with retry
    let inputs1 = vec!["abc", "def", "42"];
    match parse_with_retry(&inputs1) {
        Ok(n) => println!("Parsed on retry: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    let inputs2 = vec!["abc", "def", "ghi"];
    match parse_with_retry(&inputs2) {
        Ok(n) => println!("Parsed on retry: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    // Test safe division
    println!("10 / 2 with fallback: {}", safe_divide_with_fallback(10.0, 2.0, -1.0));
    println!("10 / 0 with fallback: {}", safe_divide_with_fallback(10.0, 0.0, -1.0));
}
```

</details>

**Learning Points**:
- Error recovery strategies
- `or_else` for alternative attempts
- `unwrap_or_else` for default values
- Retry logic patterns
- Graceful degradation

---

## Exercise 10: Validation with Multiple Errors

**Difficulty**: Hard

**Problem**: Collect all validation errors instead of stopping at the first one.

**Requirements**:
- Validate multiple fields
- Collect all errors
- Return all issues at once
- Use `Vec<Error>` or custom type

**Example**:
```rust
fn validate_user(user: &User) -> Result<(), Vec<ValidationError>> {
    let mut errors = Vec::new();
    // Check all fields
    if !errors.is_empty() {
        Err(errors)
    } else {
        Ok(())
    }
}
```

**Hints**:
- Check all conditions before returning
- Accumulate errors in a Vec
- Return all at once
- Consider using a custom ValidationResult type

<details>
<summary>Solution</summary>

```rust
#[derive(Debug)]
enum ValidationError {
    EmptyField(String),
    TooShort { field: String, min_length: usize, actual_length: usize },
    TooLong { field: String, max_length: usize, actual_length: usize },
    InvalidFormat(String),
    OutOfRange { field: String, min: i32, max: i32, value: i32 },
}

impl std::fmt::Display for ValidationError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            ValidationError::EmptyField(field) => write!(f, "{} cannot be empty", field),
            ValidationError::TooShort { field, min_length, actual_length } =>
                write!(f, "{} too short: expected at least {}, got {}", field, min_length, actual_length),
            ValidationError::TooLong { field, max_length, actual_length } =>
                write!(f, "{} too long: expected at most {}, got {}", field, max_length, actual_length),
            ValidationError::InvalidFormat(msg) => write!(f, "Invalid format: {}", msg),
            ValidationError::OutOfRange { field, min, max, value } =>
                write!(f, "{} out of range: expected {}-{}, got {}", field, min, max, value),
        }
    }
}

struct User {
    username: String,
    email: String,
    age: i32,
    bio: String,
}

fn validate_user(user: &User) -> Result<(), Vec<ValidationError>> {
    let mut errors = Vec::new();

    // Validate username
    if user.username.is_empty() {
        errors.push(ValidationError::EmptyField("username".to_string()));
    } else if user.username.len() < 3 {
        errors.push(ValidationError::TooShort {
            field: "username".to_string(),
            min_length: 3,
            actual_length: user.username.len(),
        });
    } else if user.username.len() > 20 {
        errors.push(ValidationError::TooLong {
            field: "username".to_string(),
            max_length: 20,
            actual_length: user.username.len(),
        });
    }

    // Validate email
    if user.email.is_empty() {
        errors.push(ValidationError::EmptyField("email".to_string()));
    } else if !user.email.contains('@') {
        errors.push(ValidationError::InvalidFormat("email must contain @".to_string()));
    }

    // Validate age
    if user.age < 13 || user.age > 120 {
        errors.push(ValidationError::OutOfRange {
            field: "age".to_string(),
            min: 13,
            max: 120,
            value: user.age,
        });
    }

    // Validate bio
    if user.bio.len() > 500 {
        errors.push(ValidationError::TooLong {
            field: "bio".to_string(),
            max_length: 500,
            actual_length: user.bio.len(),
        });
    }

    if errors.is_empty() {
        Ok(())
    } else {
        Err(errors)
    }
}

fn main() {
    let user1 = User {
        username: "jo".to_string(),
        email: "invalid-email".to_string(),
        age: 150,
        bio: "Short bio".to_string(),
    };

    match validate_user(&user1) {
        Ok(()) => println!("User is valid"),
        Err(errors) => {
            println!("Validation errors:");
            for error in errors {
                println!("  - {}", error);
            }
        }
    }

    let user2 = User {
        username: "john_doe".to_string(),
        email: "john@example.com".to_string(),
        age: 30,
        bio: "Valid bio".to_string(),
    };

    match validate_user(&user2) {
        Ok(()) => println!("\nUser 2 is valid!"),
        Err(errors) => {
            println!("\nValidation errors:");
            for error in errors {
                println!("  - {}", error);
            }
        }
    }
}
```

</details>

**Learning Points**:
- Collecting multiple errors
- Validation patterns
- Comprehensive error reporting
- User-friendly error messages

---

## Exercise 11: File Operations with Errors

**Difficulty**: Medium

**Problem**: Handle file I/O errors properly.

**Requirements**:
- Read file with error handling
- Parse file contents
- Chain file operations
- Provide meaningful error context

**Example**:
```rust
fn read_numbers_from_file(path: &str) -> Result<Vec<i32>, String> {
    // Read, parse, validate
}
```

**Hints**:
- Use `std::fs::read_to_string`
- Chain parsing operations
- Add context to I/O errors
- Handle both I/O and parse errors

<details>
<summary>Solution</summary>

```rust
use std::fs;
use std::io;

#[derive(Debug)]
enum FileError {
    IoError(String),
    ParseError(String),
    ValidationError(String),
}

impl std::fmt::Display for FileError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            FileError::IoError(msg) => write!(f, "IO Error: {}", msg),
            FileError::ParseError(msg) => write!(f, "Parse Error: {}", msg),
            FileError::ValidationError(msg) => write!(f, "Validation Error: {}", msg),
        }
    }
}

impl From<io::Error> for FileError {
    fn from(err: io::Error) -> Self {
        FileError::IoError(err.to_string())
    }
}

fn read_numbers_from_file(path: &str) -> Result<Vec<i32>, FileError> {
    let content = fs::read_to_string(path)
        .map_err(|e| FileError::IoError(format!("Failed to read {}: {}", path, e)))?;

    let numbers: Result<Vec<i32>, _> = content
        .lines()
        .filter(|line| !line.trim().is_empty())
        .map(|line| {
            line.trim().parse::<i32>()
                .map_err(|e| FileError::ParseError(format!("Invalid number '{}': {}", line, e)))
        })
        .collect();

    numbers
}

fn read_config_file(path: &str) -> Result<Vec<(String, String)>, FileError> {
    let content = fs::read_to_string(path)?;

    content.lines()
        .filter(|line| !line.trim().is_empty() && !line.starts_with('#'))
        .map(|line| {
            let parts: Vec<&str> = line.splitn(2, '=').collect();
            if parts.len() == 2 {
                Ok((parts[0].trim().to_string(), parts[1].trim().to_string()))
            } else {
                Err(FileError::ParseError(format!("Invalid config line: {}", line)))
            }
        })
        .collect()
}

// Simulated functions for demonstration
fn simulate_read_file(path: &str) -> Result<String, FileError> {
    match path {
        "numbers.txt" => Ok("1\n2\n3\n4\n5".to_string()),
        "invalid.txt" => Ok("1\n2\nabc\n4".to_string()),
        "config.txt" => Ok("host=localhost\nport=8080\n# comment\ntimeout=30".to_string()),
        _ => Err(FileError::IoError(format!("File not found: {}", path))),
    }
}

fn main() {
    // Note: In a real program, you would use actual file I/O
    // Here we're simulating for demonstration

    println!("Example of file error handling patterns:");
    println!("(Using simulated file content for demonstration)\n");

    // Demonstrate error types
    let examples = vec![
        ("numbers.txt", "Valid numbers file"),
        ("invalid.txt", "File with invalid number"),
        ("missing.txt", "Non-existent file"),
    ];

    for (filename, description) in examples {
        println!("Reading {}: {}", filename, description);
        // In real code, would call read_numbers_from_file(filename)
        println!("  (Simulation - actual file I/O would happen here)\n");
    }
}
```

</details>

**Learning Points**:
- File I/O error handling
- Converting std::io::Error
- Chaining file operations
- Error context for debugging

---

## Exercise 12: Result Combinators

**Difficulty**: Medium

**Problem**: Use Result combinators to transform and chain operations.

**Requirements**:
- Use `and_then` for chaining
- Use `map` for transformation
- Use `map_or` for default values
- Compare with explicit match

**Example**:
```rust
result
    .and_then(|x| validate(x))
    .map(|x| x * 2)
    .map_or(0, |x| x)
```

**Hints**:
- `and_then` chains Result-producing functions
- `map` transforms Ok values
- `map_or` provides default for Err
- `map_or_else` computes default

<details>
<summary>Solution</summary>

```rust
fn parse_number(s: &str) -> Result<i32, String> {
    s.parse()
        .map_err(|e| format!("Parse error: {}", e))
}

fn validate_positive(n: i32) -> Result<i32, String> {
    if n > 0 {
        Ok(n)
    } else {
        Err(format!("{} is not positive", n))
    }
}

fn double_if_small(n: i32) -> Result<i32, String> {
    if n < 100 {
        Ok(n * 2)
    } else {
        Err(format!("{} is too large to double", n))
    }
}

// Using combinators
fn process_with_combinators(s: &str) -> i32 {
    parse_number(s)
        .and_then(validate_positive)
        .and_then(double_if_small)
        .map(|n| n + 10)
        .map_or(0, |n| n)
}

// Same logic with explicit matching
fn process_with_match(s: &str) -> i32 {
    match parse_number(s) {
        Ok(n) => match validate_positive(n) {
            Ok(n) => match double_if_small(n) {
                Ok(n) => n + 10,
                Err(_) => 0,
            },
            Err(_) => 0,
        },
        Err(_) => 0,
    }
}

fn calculate_with_fallback(a: &str, b: &str) -> i32 {
    parse_number(a)
        .and_then(|x| parse_number(b).map(|y| x + y))
        .unwrap_or(0)
}

fn transform_and_validate(s: &str) -> Result<String, String> {
    parse_number(s)
        .and_then(validate_positive)
        .map(|n| format!("Valid number: {}", n))
}

fn main() {
    let test_cases = vec!["10", "-5", "150", "abc"];

    for input in test_cases {
        let result = process_with_combinators(input);
        println!("Input: '{}' -> Result: {}", input, result);
    }

    println!("\nCalculations:");
    println!("'5' + '10' = {}", calculate_with_fallback("5", "10"));
    println!("'5' + 'abc' = {}", calculate_with_fallback("5", "abc"));

    println!("\nTransform and validate:");
    match transform_and_validate("42") {
        Ok(msg) => println!("{}", msg),
        Err(e) => println!("Error: {}", e),
    }
}
```

</details>

**Learning Points**:
- Result combinators for cleaner code
- `and_then` for chaining fallible operations
- `map_or` and `map_or_else` for defaults
- Comparing combinator vs match style

---

## Exercise 13: Early Returns with ?

**Difficulty**: Easy

**Problem**: Refactor nested match statements to use the `?` operator.

**Requirements**:
- Simplify deeply nested code
- Use `?` for early returns
- Maintain same error handling
- Improve readability

**Example**:
```rust
// Before
match operation1() {
    Ok(v1) => match operation2(v1) {
        Ok(v2) => match operation3(v2) {
            Ok(v3) => Ok(v3),
            Err(e) => Err(e),
        },
        Err(e) => Err(e),
    },
    Err(e) => Err(e),
}

// After
let v1 = operation1()?;
let v2 = operation2(v1)?;
let v3 = operation3(v2)?;
Ok(v3)
```

**Hints**:
- Replace match with `?`
- Each `?` returns Err if present
- Much more readable
- Same behavior, cleaner code

<details>
<summary>Solution</summary>

```rust
// Complex nested matching (before)
fn process_nested_match(input: &str) -> Result<i32, String> {
    match input.parse::<i32>() {
        Ok(n) => {
            match check_range(n) {
                Ok(n) => {
                    match double_number(n) {
                        Ok(n) => {
                            match add_ten(n) {
                                Ok(result) => Ok(result),
                                Err(e) => Err(e),
                            }
                        }
                        Err(e) => Err(e),
                    }
                }
                Err(e) => Err(e),
            }
        }
        Err(e) => Err(format!("Parse error: {}", e)),
    }
}

// Same logic with ? operator (after)
fn process_with_question_mark(input: &str) -> Result<i32, String> {
    let n = input.parse::<i32>()
        .map_err(|e| format!("Parse error: {}", e))?;
    let n = check_range(n)?;
    let n = double_number(n)?;
    let result = add_ten(n)?;
    Ok(result)
}

// Even more concise
fn process_concise(input: &str) -> Result<i32, String> {
    let n = input.parse::<i32>().map_err(|e| format!("Parse error: {}", e))?;
    add_ten(double_number(check_range(n)?)?)
}

fn check_range(n: i32) -> Result<i32, String> {
    if n >= 0 && n <= 100 {
        Ok(n)
    } else {
        Err(format!("Number {} out of range 0-100", n))
    }
}

fn double_number(n: i32) -> Result<i32, String> {
    n.checked_mul(2)
        .ok_or_else(|| format!("Overflow doubling {}", n))
}

fn add_ten(n: i32) -> Result<i32, String> {
    n.checked_add(10)
        .ok_or_else(|| format!("Overflow adding 10 to {}", n))
}

fn main() {
    let test_inputs = vec!["50", "150", "-10", "abc"];

    for input in test_inputs {
        match process_with_question_mark(input) {
            Ok(result) => println!("'{}' -> {}", input, result),
            Err(e) => println!("'{}' -> Error: {}", input, e),
        }
    }
}
```

</details>

**Learning Points**:
- `?` operator for cleaner code
- Eliminating nested matches
- Early return pattern
- Readability improvements

---

## Error Handling Best Practices

### 1. Use Specific Error Types
```rust
// Good: Specific error type
enum DatabaseError {
    ConnectionFailed,
    QueryFailed(String),
    NotFound,
}

// Less good: Generic string
fn query() -> Result<Data, String>
```

### 2. Provide Context
```rust
// Good: Context in error
file.read().map_err(|e| format!("Failed to read {}: {}", filename, e))?

// Less good: Raw error
file.read()?
```

### 3. Don't Panic in Libraries
```rust
// Good: Return Result
pub fn process(data: &str) -> Result<Output, Error>

// Bad: Panic in library code
pub fn process(data: &str) -> Output {
    data.parse().unwrap() // Don't do this!
}
```

### 4. Use ? Operator
```rust
// Good: Clean with ?
let result = step1()?.step2()?.step3()?;

// Less good: Nested matches
match step1() {
    Ok(v1) => match step2(v1) { ... }
}
```

## Common Patterns

### Pattern 1: Multiple Error Types
```rust
#[derive(Debug)]
enum AppError {
    Io(std::io::Error),
    Parse(std::num::ParseIntError),
    Custom(String),
}
```

### Pattern 2: Error Chain
```rust
fn operation() -> Result<T, Error> {
    sub_operation()
        .map_err(|e| format!("Operation failed: {}", e))?;
    Ok(result)
}
```

### Pattern 3: Collecting Errors
```rust
let results: Result<Vec<_>, _> = items
    .iter()
    .map(|item| process(item))
    .collect();
```

## Next Steps

- Study the `thiserror` and `anyhow` crates
- Learn about error trait objects
- Practice with real-world APIs
- Move on to concurrency exercises
- Build robust error handling into projects
