# Understanding Rust Compiler Errors

A guide to reading, understanding, and fixing common Rust compiler errors.

## Table of Contents
- [Reading Error Messages](#reading-error-messages)
- [Ownership Errors](#ownership-errors)
- [Borrowing Errors](#borrowing-errors)
- [Lifetime Errors](#lifetime-errors)
- [Type Errors](#type-errors)
- [Trait Errors](#trait-errors)
- [Pattern Matching Errors](#pattern-matching-errors)
- [Async Errors](#async-errors)
- [Common Clippy Lints](#common-clippy-lints)

## Reading Error Messages

### Anatomy of a Rust Error

Rust error messages follow a structured format:

```
error[E0382]: borrow of moved value: `s`
 --> src/main.rs:5:20
  |
3 |     let s = String::from("hello");
  |         - move occurs because `s` has type `String`
4 |     let s2 = s;
  |              - value moved here
5 |     println!("{}", s);
  |                    ^ value borrowed here after move
  |
  = note: if you need to use `s` after moving, consider cloning
  help: consider cloning the value if it's okay to create a copy
  |
4 |     let s2 = s.clone();
  |               ++++++++
```

**Components**:
1. **Error code**: `E0382` - Searchable in Rust documentation
2. **Error message**: Brief description of the problem
3. **Location**: File and line number
4. **Code context**: Shows relevant code with annotations
5. **Note**: Additional explanation
6. **Help**: Suggested fix

### Getting More Information

```bash
# Get detailed explanation of error code
rustc --explain E0382

# Verbose compiler output
cargo build --verbose

# See full error without truncation
cargo build --color=always 2>&1 | less -R
```

## Ownership Errors

### E0382: Borrow of Moved Value

**Error**:
```rust
let s = String::from("hello");
let s2 = s;  // s is moved to s2
println!("{}", s);  // ERROR: s no longer valid
```

**Why it happens**: Value was moved and original variable no longer owns it.

**Solutions**:

```rust
// Solution 1: Clone the value
let s = String::from("hello");
let s2 = s.clone();
println!("{}", s);  // OK: s is still valid

// Solution 2: Borrow instead of moving
let s = String::from("hello");
let s2 = &s;  // Borrow, don't move
println!("{} and {}", s, s2);  // Both valid

// Solution 3: Use after move
let s = String::from("hello");
let s2 = s;
println!("{}", s2);  // Use s2 instead
```

### E0384: Cannot Assign Twice to Immutable Variable

**Error**:
```rust
let x = 5;
x = 6;  // ERROR: cannot assign twice to immutable variable
```

**Solution**:
```rust
// Make variable mutable
let mut x = 5;
x = 6;  // OK

// Or use shadowing
let x = 5;
let x = 6;  // OK: new binding
```

### E0505: Cannot Move Out of Borrowed Content

**Error**:
```rust
let s = String::from("hello");
let r = &s;
let s2 = s;  // ERROR: cannot move out of `s` because it is borrowed
println!("{}", r);
```

**Solution**:
```rust
// Solution 1: Drop reference before moving
let s = String::from("hello");
{
    let r = &s;
    println!("{}", r);
}  // r goes out of scope
let s2 = s;  // OK: no active borrows

// Solution 2: Clone instead of moving
let s = String::from("hello");
let r = &s;
let s2 = s.clone();  // OK: clone, don't move
println!("{}", r);
```

## Borrowing Errors

### E0502: Cannot Borrow as Mutable Because Also Borrowed as Immutable

**Error**:
```rust
let mut s = String::from("hello");
let r1 = &s;
let r2 = &mut s;  // ERROR: cannot borrow as mutable
println!("{}", r1);
```

**Why it happens**: Can't have mutable borrow while immutable borrows exist.

**Solution**:
```rust
// Ensure immutable borrows end before mutable borrow
let mut s = String::from("hello");
{
    let r1 = &s;
    println!("{}", r1);
}  // r1 goes out of scope
let r2 = &mut s;  // OK: no immutable borrows active
r2.push_str(" world");

// Or with Non-Lexical Lifetimes (NLL)
let mut s = String::from("hello");
let r1 = &s;
println!("{}", r1);  // r1 last used here
let r2 = &mut s;  // OK: r1 no longer used
r2.push_str(" world");
```

### E0499: Cannot Borrow as Mutable More Than Once

**Error**:
```rust
let mut s = String::from("hello");
let r1 = &mut s;
let r2 = &mut s;  // ERROR: cannot borrow as mutable more than once
println!("{}, {}", r1, r2);
```

**Solution**:
```rust
// Solution 1: Use one at a time
let mut s = String::from("hello");
{
    let r1 = &mut s;
    r1.push_str(" world");
}  // r1 goes out of scope
let r2 = &mut s;
r2.push_str("!");

// Solution 2: Split borrows (if applicable)
let mut v = vec![1, 2, 3, 4];
let (left, right) = v.split_at_mut(2);
left[0] = 10;
right[0] = 20;
```

### E0596: Cannot Borrow as Mutable

**Error**:
```rust
let s = String::from("hello");
s.push_str(" world");  // ERROR: cannot borrow as mutable
```

**Solution**:
```rust
// Make variable mutable
let mut s = String::from("hello");
s.push_str(" world");  // OK
```

### E0503: Cannot Use Variable While Borrowed

**Error**:
```rust
let mut vec = vec![1, 2, 3];
let first = &vec[0];
vec.push(4);  // ERROR: cannot borrow `vec` as mutable
println!("{}", first);
```

**Solution**:
```rust
// Copy the value instead of holding reference
let mut vec = vec![1, 2, 3];
let first = vec[0];  // Copy the value (i32 implements Copy)
vec.push(4);  // OK
println!("{}", first);

// Or ensure reference is no longer used
let mut vec = vec![1, 2, 3];
let first = &vec[0];
println!("{}", first);  // Last use of first
vec.push(4);  // OK: first no longer used
```

## Lifetime Errors

### E0106: Missing Lifetime Specifier

**Error**:
```rust
fn longest(x: &str, y: &str) -> &str {  // ERROR: missing lifetime specifier
    if x.len() > y.len() { x } else { y }
}
```

**Why it happens**: Compiler can't determine lifetime of return reference.

**Solution**:
```rust
// Add lifetime parameter
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// Or return owned value
fn longest(x: &str, y: &str) -> String {
    if x.len() > y.len() {
        x.to_string()
    } else {
        y.to_string()
    }
}
```

### E0597: Borrowed Value Does Not Live Long Enough

**Error**:
```rust
fn main() {
    let r;
    {
        let x = 5;
        r = &x;  // ERROR: `x` does not live long enough
    }
    println!("{}", r);
}
```

**Solution**:
```rust
// Move value creation outside inner scope
fn main() {
    let x = 5;
    let r = &x;
    println!("{}", r);  // OK
}

// Or copy the value
fn main() {
    let r;
    {
        let x = 5;
        r = x;  // Copy, not borrow
    }
    println!("{}", r);  // OK
}
```

### E0716: Temporary Value Dropped

**Error**:
```rust
let r = &String::from("hello");  // ERROR: temporary value dropped
```

**Solution**:
```rust
// Bind to variable first
let s = String::from("hello");
let r = &s;  // OK

// Or just use the String directly
let s = String::from("hello");
println!("{}", s);
```

## Type Errors

### E0308: Mismatched Types

**Error**:
```rust
fn add(a: i32, b: i32) -> i32 {
    a + b;  // ERROR: expected `i32`, found `()`
}
```

**Why it happens**: Function expects return value but got unit type `()`.

**Solution**:
```rust
// Remove semicolon for implicit return
fn add(a: i32, b: i32) -> i32 {
    a + b  // OK
}

// Or use explicit return
fn add(a: i32, b: i32) -> i32 {
    return a + b;  // OK
}
```

**Common cases**:
```rust
// ERROR: expected `Option<i32>`, found `i32`
fn find_number() -> Option<i32> {
    42  // Wrong
}

// Solution: Wrap in Some
fn find_number() -> Option<i32> {
    Some(42)  // Correct
}

// ERROR: expected `Result<(), Error>`, found `()`
fn process() -> Result<(), Error> {
    do_something();  // Wrong
}

// Solution: Return Ok
fn process() -> Result<(), Error> {
    do_something();
    Ok(())  // Correct
}
```

### E0277: Trait Not Implemented

**Error**:
```rust
fn print_value<T>(val: T) {
    println!("{}", val);  // ERROR: `T` doesn't implement `Display`
}
```

**Solution**:
```rust
// Add trait bound
use std::fmt::Display;

fn print_value<T: Display>(val: T) {
    println!("{}", val);  // OK
}

// Or use Debug trait
fn print_value<T: std::fmt::Debug>(val: T) {
    println!("{:?}", val);  // OK
}
```

### E0369: Binary Operation Not Supported

**Error**:
```rust
#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

let p1 = Point { x: 1, y: 2 };
let p2 = Point { x: 3, y: 4 };
let p3 = p1 + p2;  // ERROR: cannot add `Point` to `Point`
```

**Solution**:
```rust
// Implement the Add trait
use std::ops::Add;

impl Add for Point {
    type Output = Point;

    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

let p3 = p1 + p2;  // OK
```

## Trait Errors

### E0599: Method Not Found

**Error**:
```rust
let v = vec![1, 2, 3];
v.push(4);  // ERROR: method not found (v is immutable)
```

**Solution**:
```rust
// Make variable mutable
let mut v = vec![1, 2, 3];
v.push(4);  // OK
```

### E0277: Trait Bound Not Satisfied

**Error**:
```rust
fn process<T>(item: T) {
    item.clone();  // ERROR: trait bound `T: Clone` not satisfied
}
```

**Solution**:
```rust
// Add trait bound
fn process<T: Clone>(item: T) {
    item.clone();  // OK
}

// Multiple bounds
fn process<T: Clone + Debug>(item: T) {
    // ...
}

// Where clause for complex bounds
fn process<T>(item: T)
where
    T: Clone + Debug + Send,
{
    // ...
}
```

### E0407: Method Not Found in Trait

**Error**:
```rust
trait MyTrait {
    fn method_a(&self);
}

impl MyTrait for MyType {
    fn method_a(&self) { }
    fn method_b(&self) { }  // Not in trait
}
```

**Solution**:
```rust
// Add to trait or implement separately
impl MyTrait for MyType {
    fn method_a(&self) { }
}

// Implement method_b separately
impl MyType {
    fn method_b(&self) { }
}
```

## Pattern Matching Errors

### E0004: Non-Exhaustive Patterns

**Error**:
```rust
enum Color {
    Red,
    Green,
    Blue,
}

let color = Color::Red;
match color {
    Color::Red => println!("red"),
    Color::Green => println!("green"),
    // ERROR: pattern `Blue` not covered
}
```

**Solution**:
```rust
// Cover all cases
match color {
    Color::Red => println!("red"),
    Color::Green => println!("green"),
    Color::Blue => println!("blue"),
}

// Or use wildcard
match color {
    Color::Red => println!("red"),
    Color::Green => println!("green"),
    _ => println!("other"),
}
```

### E0162: Irrefutable Pattern in If Let

**Error**:
```rust
let x = Some(5);
if let Some(y) = x {  // Warning: irrefutable pattern
    // This always matches
}
```

**Solution**:
```rust
// Use regular let binding
let x = Some(5);
let Some(y) = x else {
    panic!("Expected Some");
};

// Or if pattern might fail, keep if let
let x: Option<i32> = None;
if let Some(y) = x {  // OK: might be None
    println!("{}", y);
}
```

## Async Errors

### E0277: Future Cannot Be Sent Between Threads

**Error**:
```rust
async fn process(data: Rc<Data>) {  // ERROR: `Rc` cannot be sent
    // ...
}
```

**Solution**:
```rust
// Use Arc instead of Rc for thread-safe reference counting
use std::sync::Arc;

async fn process(data: Arc<Data>) {  // OK
    // ...
}
```

### E0733: Recursion in Async Function

**Error**:
```rust
async fn recursive(n: u32) {
    if n > 0 {
        recursive(n - 1).await;  // ERROR: recursive async function
    }
}
```

**Solution**:
```rust
// Use Box::pin for recursive async functions
use std::pin::Pin;
use std::future::Future;

fn recursive(n: u32) -> Pin<Box<dyn Future<Output = ()>>> {
    Box::pin(async move {
        if n > 0 {
            recursive(n - 1).await;
        }
    })
}
```

### Cannot Use `.await` Outside Async Context

**Error**:
```rust
fn main() {
    let result = async_function().await;  // ERROR: not in async context
}
```

**Solution**:
```rust
// Use async runtime
#[tokio::main]
async fn main() {
    let result = async_function().await;  // OK
}

// Or use block_on
fn main() {
    let result = tokio::runtime::Runtime::new()
        .unwrap()
        .block_on(async_function());  // OK
}
```

## Common Clippy Lints

### Unnecessary Clone

**Warning**:
```rust
let s = String::from("hello");
let s2 = s.clone();
drop(s);  // s is never used again
```

**Fix**:
```rust
let s = String::from("hello");
let s2 = s;  // Just move it
```

### Redundant Pattern Matching

**Warning**:
```rust
if let Some(_) = some_option {
    true
} else {
    false
}
```

**Fix**:
```rust
some_option.is_some()
```

### Useless Conversion

**Warning**:
```rust
let s = String::from("hello");
let s2 = s.to_string();  // Already a String
```

**Fix**:
```rust
let s = String::from("hello");
let s2 = s;  // Just move or clone if needed
```

### Needless Borrow

**Warning**:
```rust
fn process(s: &str) { }

let s = String::from("hello");
process(&s);  // &String coerces to &str automatically
```

**Fix**:
```rust
process(&s);  // Keep as is, or use as_str() explicitly
```

## Debugging Strategies

### 1. Read the Entire Error Message
Don't skip the notes and help sections - they often contain the solution.

### 2. Use `rustc --explain`
```bash
rustc --explain E0382
```

### 3. Simplify the Code
Create a minimal example that reproduces the error.

### 4. Check the Rust Book
Most errors are covered with examples in the official Rust book.

### 5. Use the Compiler's Suggestions
The compiler often suggests the exact fix you need.

### 6. Add Type Annotations
Help the compiler (and yourself) understand the types:
```rust
// Hard to debug
let x = something();

// Easier to debug
let x: Vec<i32> = something();
```

### 7. Use `dbg!` Macro
```rust
fn calculate(x: i32) -> i32 {
    dbg!(x);  // Prints: [src/main.rs:2] x = 5
    x * 2
}
```

### 8. Enable Verbose Errors
```bash
RUST_BACKTRACE=1 cargo run
RUST_BACKTRACE=full cargo run  # Even more detailed
```

## Common Patterns and Solutions

### Pattern: Return from Function
```rust
// ERROR: mismatched types
fn get_value() -> i32 {
    if condition {
        return 5;
    }
}  // Missing return value for else case

// Fix: Ensure all paths return a value
fn get_value() -> i32 {
    if condition {
        5
    } else {
        0
    }
}
```

### Pattern: Working with Options
```rust
// ERROR: can't use ? on Option in function that returns Result
fn process() -> Result<(), Error> {
    let value = some_option?;  // ERROR
    Ok(())
}

// Fix: Convert Option to Result
fn process() -> Result<(), Error> {
    let value = some_option.ok_or(Error::MissingValue)?;
    Ok(())
}
```

### Pattern: Mutable Self
```rust
// ERROR: cannot borrow as mutable
impl MyStruct {
    fn update(&self) {
        self.field = 10;  // ERROR: self is &self, not &mut self
    }
}

// Fix: Make self mutable
impl MyStruct {
    fn update(&mut self) {
        self.field = 10;  // OK
    }
}
```

## Learning from Errors

Rust's compiler errors are designed to teach. Each error is an opportunity to:
1. **Understand ownership**: Why does this value need to be owned/borrowed?
2. **Learn type system**: What trait is missing and why?
3. **Improve design**: Is there a better way to structure this code?
4. **Write safer code**: What potential bug did the compiler prevent?

### Embrace the Compiler
- The compiler is your pair programmer
- Errors prevent bugs before they happen
- Each fix makes you a better Rust developer
- The learning curve is steep but worth it

## Quick Error Reference

| Error Code | Description | Common Fix |
|------------|-------------|------------|
| E0382 | Use of moved value | Clone, borrow, or restructure |
| E0384 | Cannot assign twice to immutable | Add `mut` |
| E0499 | Multiple mutable borrows | Use one at a time |
| E0502 | Mutable and immutable borrows | End immutable borrows first |
| E0503 | Use while borrowed | Copy value or end borrow |
| E0597 | Value doesn't live long enough | Extend lifetime or clone |
| E0106 | Missing lifetime specifier | Add lifetime parameter |
| E0308 | Mismatched types | Check return type and value |
| E0277 | Trait not implemented | Add trait bound or implement trait |
| E0599 | Method not found | Check trait bounds and mutability |
| E0004 | Non-exhaustive patterns | Add missing cases or wildcard |
