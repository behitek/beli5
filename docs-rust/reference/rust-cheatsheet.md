# Rust Syntax Quick Reference

A comprehensive quick reference guide for Rust syntax, common patterns, and idioms.

## Table of Contents
- [Variables and Types](#variables-and-types)
- [Functions](#functions)
- [Control Flow](#control-flow)
- [Collections](#collections)
- [Structs and Enums](#structs-and-enums)
- [Traits](#traits)
- [Ownership and Borrowing](#ownership-and-borrowing)
- [Pattern Matching](#pattern-matching)
- [Generics](#generics)
- [Macros](#macros)
- [Common Idioms](#common-idioms)

## Variables and Types

### Variable Declaration
```rust
// Immutable variable
let x = 5;

// Mutable variable
let mut y = 10;

// Type annotation
let z: i32 = 15;

// Constant
const MAX_POINTS: u32 = 100_000;

// Static
static GLOBAL: &str = "global";
```

### Primitive Types
| Type | Description | Example |
|------|-------------|---------|
| `i8`, `i16`, `i32`, `i64`, `i128` | Signed integers | `let x: i32 = -42;` |
| `u8`, `u16`, `u32`, `u64`, `u128` | Unsigned integers | `let x: u32 = 42;` |
| `f32`, `f64` | Floating point | `let x: f64 = 3.14;` |
| `bool` | Boolean | `let x: bool = true;` |
| `char` | Unicode character | `let x: char = '🦀';` |
| `&str` | String slice | `let x: &str = "hello";` |
| `String` | Owned string | `let x = String::from("hello");` |

### Type Casting
```rust
let x = 5;
let y = x as f64;  // Integer to float
let z = 3.7 as i32;  // Float to integer (truncates)
```

## Functions

### Basic Function
```rust
fn add(a: i32, b: i32) -> i32 {
    a + b  // Implicit return (no semicolon)
}

// Explicit return
fn subtract(a: i32, b: i32) -> i32 {
    return a - b;
}
```

### Multiple Return Values (Tuples)
```rust
fn divide(a: f64, b: f64) -> (f64, bool) {
    if b == 0.0 {
        (0.0, false)
    } else {
        (a / b, true)
    }
}

let (result, success) = divide(10.0, 2.0);
```

### Associated Functions (Static Methods)
```rust
impl MyStruct {
    fn new() -> Self {
        Self { /* ... */ }
    }
}

let instance = MyStruct::new();
```

## Control Flow

### If Expressions
```rust
let number = 6;

if number % 2 == 0 {
    println!("even");
} else {
    println!("odd");
}

// If as expression
let result = if number > 5 { "big" } else { "small" };
```

### Loops
```rust
// Infinite loop
loop {
    break;  // Exit loop
}

// While loop
while condition {
    // code
}

// For loop
for i in 0..5 {  // 0 to 4
    println!("{}", i);
}

for i in 0..=5 {  // 0 to 5 (inclusive)
    println!("{}", i);
}

// Iterate over collection
for item in vec.iter() {
    println!("{}", item);
}

// Loop with return value
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;
    }
};
```

### Match Expression
```rust
match value {
    1 => println!("one"),
    2 | 3 => println!("two or three"),
    4..=9 => println!("four through nine"),
    _ => println!("anything else"),
}

// Match with return
let description = match number {
    0 => "zero",
    1 => "one",
    _ => "other",
};
```

## Collections

### Vec (Dynamic Array)
```rust
// Create
let mut v: Vec<i32> = Vec::new();
let v = vec![1, 2, 3];

// Add elements
v.push(4);
v.extend([5, 6, 7]);

// Access
let third = &v[2];
let third = v.get(2);  // Returns Option<&T>

// Iterate
for item in &v {
    println!("{}", item);
}

// Iterate mutably
for item in &mut v {
    *item += 1;
}
```

### HashMap
```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

// Get value
let score = scores.get("Blue");  // Returns Option<&V>

// Insert if not present
scores.entry(String::from("Blue")).or_insert(50);

// Iterate
for (key, value) in &scores {
    println!("{}: {}", key, value);
}
```

### HashSet
```rust
use std::collections::HashSet;

let mut set = HashSet::new();
set.insert(1);
set.insert(2);

if set.contains(&1) {
    println!("found it");
}
```

## Structs and Enums

### Struct Definition
```rust
// Classic struct
struct User {
    username: String,
    email: String,
    active: bool,
}

// Tuple struct
struct Color(i32, i32, i32);

// Unit struct
struct AlwaysEqual;

// Struct with lifetime
struct ImportantExcerpt<'a> {
    part: &'a str,
}
```

### Struct Usage
```rust
// Create instance
let user = User {
    username: String::from("user1"),
    email: String::from("user@example.com"),
    active: true,
};

// Struct update syntax
let user2 = User {
    email: String::from("another@example.com"),
    ..user
};

// Access fields
println!("{}", user.username);
```

### Enum Definition
```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

// Option and Result (built-in)
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

### Enum Usage
```rust
let msg = Message::Write(String::from("hello"));

match msg {
    Message::Quit => println!("quit"),
    Message::Move { x, y } => println!("move to {}, {}", x, y),
    Message::Write(text) => println!("text: {}", text),
    Message::ChangeColor(r, g, b) => println!("color: {}, {}, {}", r, g, b),
}
```

## Traits

### Define Trait
```rust
trait Summary {
    fn summarize(&self) -> String;

    // Default implementation
    fn summarize_author(&self) -> String {
        String::from("(Read more...)")
    }
}
```

### Implement Trait
```rust
impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}, by {}", self.headline, self.author)
    }
}
```

### Trait Bounds
```rust
// Function parameter
fn notify<T: Summary>(item: &T) {
    println!("{}", item.summarize());
}

// Multiple bounds
fn notify<T: Summary + Display>(item: &T) { }

// Where clause
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{ }

// Return type
fn returns_summarizable() -> impl Summary { }
```

### Common Traits
| Trait | Purpose | Example |
|-------|---------|---------|
| `Clone` | Explicit copy | `let y = x.clone();` |
| `Copy` | Implicit copy | Primitives |
| `Debug` | `{:?}` formatting | `println!("{:?}", value);` |
| `Display` | `{}` formatting | `println!("{}", value);` |
| `PartialEq` | `==` comparison | `if x == y { }` |
| `Eq` | Full equality | Extends `PartialEq` |
| `PartialOrd` | `<`, `>` comparison | `if x < y { }` |
| `Ord` | Full ordering | Sorting |
| `Default` | Default value | `T::default()` |

## Ownership and Borrowing

### Ownership Rules
```rust
// 1. Each value has an owner
let s = String::from("hello");

// 2. Only one owner at a time
let s2 = s;  // s is moved, no longer valid

// 3. Value dropped when owner goes out of scope
{
    let s = String::from("hello");
}  // s is dropped here
```

### Borrowing
```rust
// Immutable borrow
let s = String::from("hello");
let len = calculate_length(&s);

fn calculate_length(s: &String) -> usize {
    s.len()
}

// Mutable borrow
let mut s = String::from("hello");
change(&mut s);

fn change(s: &mut String) {
    s.push_str(", world");
}

// Rules:
// - Can have many immutable borrows OR one mutable borrow
// - References must always be valid
```

### Slices
```rust
let s = String::from("hello world");
let hello = &s[0..5];
let world = &s[6..11];

// Shortcuts
let slice = &s[..5];   // From start
let slice = &s[6..];   // To end
let slice = &s[..];    // Entire string

// Array slices
let a = [1, 2, 3, 4, 5];
let slice = &a[1..3];  // [2, 3]
```

## Pattern Matching

### Match Patterns
```rust
// Literal matching
match x {
    1 => println!("one"),
    2 => println!("two"),
    _ => println!("other"),
}

// Multiple patterns
match x {
    1 | 2 => println!("one or two"),
    _ => println!("other"),
}

// Range matching
match x {
    1..=5 => println!("one through five"),
    _ => println!("other"),
}

// Destructuring structs
match point {
    Point { x: 0, y } => println!("On y-axis at {}", y),
    Point { x, y: 0 } => println!("On x-axis at {}", x),
    Point { x, y } => println!("On neither axis: ({}, {})", x, y),
}

// Destructuring enums
match msg {
    Message::Move { x, y } => println!("Move to {}, {}", x, y),
    _ => (),
}
```

### If Let
```rust
// Instead of this:
match some_value {
    Some(3) => println!("three"),
    _ => (),
}

// Use this:
if let Some(3) = some_value {
    println!("three");
}
```

### While Let
```rust
let mut stack = Vec::new();
stack.push(1);
stack.push(2);

while let Some(top) = stack.pop() {
    println!("{}", top);
}
```

## Generics

### Generic Functions
```rust
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

### Generic Structs
```rust
struct Point<T> {
    x: T,
    y: T,
}

// Multiple type parameters
struct Point<T, U> {
    x: T,
    y: U,
}
```

### Generic Enums
```rust
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

### Generic Methods
```rust
impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

// Specific type implementation
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
```

## Macros

### Common Macros
```rust
// Print macros
println!("Hello, world!");
print!("No newline");
eprintln!("Error message");

// Format macro
let s = format!("x = {}, y = {}", x, y);

// Vector macro
let v = vec![1, 2, 3];

// Panic macro
panic!("Something went wrong!");

// Assert macros
assert!(x == 5);
assert_eq!(x, 5);
assert_ne!(x, 6);

// Debug macro
dbg!(x);  // Prints debug info and returns value

// Unreachable macro
unreachable!("This code should never run");

// Todo macro
todo!("Implement this later");

// Unimplemented macro
unimplemented!("Not yet implemented");
```

### Declarative Macros
```rust
macro_rules! my_macro {
    ($x:expr) => {
        println!("Got: {}", $x);
    };
}

my_macro!(42);
```

## Common Idioms

### Error Handling with ?
```rust
fn read_file(path: &str) -> Result<String, std::io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}
```

### Option Handling
```rust
// unwrap_or
let value = option.unwrap_or(default);

// unwrap_or_else
let value = option.unwrap_or_else(|| expensive_computation());

// map
let length = name.map(|n| n.len());

// and_then
let result = value.and_then(|v| process(v));

// ok_or
let result: Result<T, E> = option.ok_or(error);
```

### Iterator Methods
```rust
// map
let doubled: Vec<_> = vec![1, 2, 3].iter().map(|x| x * 2).collect();

// filter
let even: Vec<_> = vec![1, 2, 3, 4].into_iter().filter(|x| x % 2 == 0).collect();

// fold
let sum = vec![1, 2, 3].iter().fold(0, |acc, x| acc + x);

// collect
let numbers: Vec<i32> = (0..5).collect();

// chain
let combined: Vec<_> = vec1.iter().chain(vec2.iter()).collect();

// zip
let pairs: Vec<_> = vec1.iter().zip(vec2.iter()).collect();
```

### Builder Pattern
```rust
struct Config {
    name: String,
    timeout: u32,
    retries: u32,
}

impl Config {
    fn builder() -> ConfigBuilder {
        ConfigBuilder::default()
    }
}

struct ConfigBuilder {
    name: Option<String>,
    timeout: Option<u32>,
    retries: Option<u32>,
}

impl ConfigBuilder {
    fn name(mut self, name: String) -> Self {
        self.name = Some(name);
        self
    }

    fn timeout(mut self, timeout: u32) -> Self {
        self.timeout = Some(timeout);
        self
    }

    fn build(self) -> Config {
        Config {
            name: self.name.unwrap_or_default(),
            timeout: self.timeout.unwrap_or(30),
            retries: self.retries.unwrap_or(3),
        }
    }
}

let config = Config::builder()
    .name("MyApp".to_string())
    .timeout(60)
    .build();
```

### RAII Pattern
```rust
// Resource cleanup happens automatically
{
    let file = File::create("foo.txt")?;
    // Use file
}  // File is automatically closed here

// Custom RAII
struct Guard<'a> {
    mutex: &'a Mutex<i32>,
}

impl<'a> Drop for Guard<'a> {
    fn drop(&mut self) {
        println!("Cleaning up");
    }
}
```

### Type Conversion
```rust
// From/Into
let s = String::from("hello");
let s: String = "hello".into();

// TryFrom/TryInto
let num = i32::try_from(value)?;

// as (primitive casting)
let x = 5i32 as f64;

// to_string
let s = 42.to_string();

// parse
let num: i32 = "42".parse()?;
```

## Quick Tips

1. **Use `cargo clippy`** for linting suggestions
2. **Use `cargo fmt`** to format code
3. **Use `#[derive(Debug)]`** on structs for easy debugging
4. **Prefer iterators** over manual loops for performance
5. **Use `?` operator** for clean error propagation
6. **Avoid `.unwrap()`** in production code
7. **Use `&str`** for function parameters instead of `&String`
8. **Use `impl Trait`** for simpler function signatures
9. **Learn iterator methods** - they're powerful and efficient
10. **Read compiler errors carefully** - they're very helpful
