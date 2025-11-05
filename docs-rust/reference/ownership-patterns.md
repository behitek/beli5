# Common Ownership Patterns

A comprehensive guide to ownership patterns, borrowing strategies, and smart pointer usage in Rust.

## Table of Contents
- [Borrowing Patterns](#borrowing-patterns)
- [Clone vs References](#clone-vs-references)
- [Smart Pointers](#smart-pointers)
- [Builder Pattern](#builder-pattern)
- [Interior Mutability](#interior-mutability)
- [Common Idioms](#common-idioms)
- [Lifetime Patterns](#lifetime-patterns)
- [Anti-Patterns](#anti-patterns)

## Borrowing Patterns

### Pass by Reference (Read-Only)

**Pattern**: Accept `&T` when you only need to read data

```rust
// Good: Accept reference for read-only access
fn calculate_length(s: &String) -> usize {
    s.len()
}

// Better: Accept &str (more flexible)
fn calculate_length(s: &str) -> usize {
    s.len()
}

// Usage
let s = String::from("hello");
let len = calculate_length(&s);
println!("Length: {}", len);
// s is still valid here
```

**When to use**:
- Function only reads data
- You want to keep ownership in caller
- Multiple reads from same data
- Data is too large to copy

### Pass by Mutable Reference

**Pattern**: Accept `&mut T` when you need to modify data

```rust
fn append_world(s: &mut String) {
    s.push_str(", world");
}

// Usage
let mut s = String::from("hello");
append_world(&mut s);
println!("{}", s);  // "hello, world"
```

**Rules**:
- Only one mutable reference at a time
- No immutable references while mutable reference exists
- Mutable reference must go out of scope before data can be used again

### Pass by Value (Take Ownership)

**Pattern**: Accept `T` when function needs ownership

```rust
fn process_and_consume(data: Vec<i32>) {
    // Do something with data
    println!("Processing {} items", data.len());
    // data is dropped here
}

// Usage
let data = vec![1, 2, 3];
process_and_consume(data);
// data is no longer valid here
```

**When to use**:
- Function needs to own the data
- Data will be consumed or transformed
- Function needs to return modified data
- Transferring ownership to another scope

### Return Ownership

**Pattern**: Return `T` to transfer ownership back to caller

```rust
fn create_and_return() -> String {
    let s = String::from("hello");
    s  // Ownership transferred to caller
}

fn transform(s: String) -> String {
    format!("{}, world", s)  // Return new owned value
}

// Usage
let s1 = create_and_return();
let s2 = transform(s1);
println!("{}", s2);
```

### Multiple Immutable References

**Pattern**: Many readers pattern

```rust
fn analyze_data(data: &[i32]) {
    let r1 = data;  // First reference
    let r2 = data;  // Second reference
    let r3 = data;  // Third reference

    println!("Analysis 1: {:?}", r1);
    println!("Analysis 2: {:?}", r2);
    println!("Analysis 3: {:?}", r3);
    // All references valid simultaneously
}
```

### Reborrowing

**Pattern**: Create new reference from existing reference

```rust
fn process(data: &mut Vec<i32>) {
    // Reborrow for helper function
    helper(&*data);  // Immutable reborrow

    // Original mutable reference still valid
    data.push(4);
}

fn helper(data: &[i32]) {
    println!("{:?}", data);
}
```

## Clone vs References

### When to Clone

**Pattern 1: Need independent copies**
```rust
use std::thread;

let data = vec![1, 2, 3];

// Clone for thread ownership
let data_clone = data.clone();
let handle = thread::spawn(move || {
    println!("Thread: {:?}", data_clone);
});

// Original data still available
println!("Main: {:?}", data);
handle.join().unwrap();
```

**Pattern 2: Simplify borrow checker issues**
```rust
struct Cache {
    data: HashMap<String, String>,
}

impl Cache {
    fn get_or_default(&self, key: &str) -> String {
        // Clone to avoid borrowing issues
        self.data.get(key)
            .cloned()
            .unwrap_or_else(|| "default".to_string())
    }
}
```

**Pattern 3: Storing in collections**
```rust
let name = String::from("Alice");
let mut names = Vec::new();

// Clone to keep original
names.push(name.clone());
println!("Original: {}", name);  // Still valid
```

### When to Use References

**Pattern 1: Reading large data**
```rust
struct LargeData {
    buffer: Vec<u8>,  // Megabytes of data
}

// Good: Reference avoids expensive copy
fn analyze(data: &LargeData) -> usize {
    data.buffer.len()
}

// Bad: Unnecessary clone
fn analyze_bad(data: LargeData) -> usize {
    data.buffer.len()
}
```

**Pattern 2: Chaining operations**
```rust
fn process(s: &str) -> String {
    s.to_uppercase()
        .trim()
        .to_string()
}

let input = "hello  ";
let output = process(&input);
```

**Pattern 3: Multiple uses of same data**
```rust
let data = fetch_large_data();

// Use references to avoid cloning
validate(&data)?;
process(&data)?;
store(&data)?;

fn validate(data: &Data) -> Result<()> { /* ... */ Ok(()) }
fn process(data: &Data) -> Result<()> { /* ... */ Ok(()) }
fn store(data: &Data) -> Result<()> { /* ... */ Ok(()) }
```

### Clone Strategically

```rust
// Good: Clone early if you need ownership
fn process_items(items: &[Item]) -> Vec<ProcessedItem> {
    items.iter()
        .cloned()  // Clone once
        .filter(|item| item.is_valid())
        .map(|item| process(item))
        .collect()
}

// Bad: Multiple clones
fn process_items_bad(items: &[Item]) -> Vec<ProcessedItem> {
    items.iter()
        .filter(|item| item.clone().is_valid())  // Clone for filter
        .map(|item| process(item.clone()))  // Clone for map
        .collect()
}
```

## Smart Pointers

### `Box<T>` - Heap Allocation

**Pattern**: Store data on heap

```rust
// Large data structure
struct LargeStruct {
    data: [u8; 1024 * 1024],  // 1 MB
}

// Box moves it to heap
let large = Box::new(LargeStruct {
    data: [0; 1024 * 1024],
});
```

**Pattern**: Recursive types
```rust
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

let list = Cons(1, Box::new(Cons(2, Box::new(Nil))));
```

**Pattern**: Trait objects
```rust
trait Animal {
    fn speak(&self);
}

struct Dog;
impl Animal for Dog {
    fn speak(&self) {
        println!("Woof!");
    }
}

let animal: Box<dyn Animal> = Box::new(Dog);
animal.speak();
```

### `Rc<T>` - Reference Counting (Single-Threaded)

**Pattern**: Multiple ownership

```rust
use std::rc::Rc;

struct Node {
    value: i32,
    children: Vec<Rc<Node>>,
}

// Multiple owners of same node
let shared_node = Rc::new(Node {
    value: 5,
    children: vec![],
});

let parent1 = Node {
    value: 1,
    children: vec![Rc::clone(&shared_node)],
};

let parent2 = Node {
    value: 2,
    children: vec![Rc::clone(&shared_node)],
};

println!("Shared node ref count: {}", Rc::strong_count(&shared_node));
```

**Pattern**: Caching and shared state
```rust
use std::collections::HashMap;
use std::rc::Rc;

struct Cache {
    data: HashMap<String, Rc<ExpensiveData>>,
}

impl Cache {
    fn get(&self, key: &str) -> Option<Rc<ExpensiveData>> {
        self.data.get(key).cloned()  // Clone Rc, not data
    }
}
```

### `Arc<T>` - Atomic Reference Counting (Thread-Safe)

**Pattern**: Share data across threads

```rust
use std::sync::Arc;
use std::thread;

let data = Arc::new(vec![1, 2, 3, 4, 5]);

let mut handles = vec![];

for _ in 0..5 {
    let data = Arc::clone(&data);
    let handle = thread::spawn(move || {
        println!("Sum: {}", data.iter().sum::<i32>());
    });
    handles.push(handle);
}

for handle in handles {
    handle.join().unwrap();
}
```

**Pattern**: Shared configuration
```rust
use std::sync::Arc;

#[derive(Clone)]
struct Config {
    settings: Arc<Settings>,
}

impl Config {
    fn new(settings: Settings) -> Self {
        Self {
            settings: Arc::new(settings),
        }
    }

    // Cheap to clone
    fn clone_config(&self) -> Self {
        Self {
            settings: Arc::clone(&self.settings),
        }
    }
}
```

### Rc vs Arc vs Box

| Type | Use Case | Thread-Safe | Overhead |
|------|----------|-------------|----------|
| `Box<T>` | Single owner, heap allocation | No | Minimal |
| `Rc<T>` | Multiple owners, single thread | No | Reference counting |
| `Arc<T>` | Multiple owners, multi-threaded | Yes | Atomic ref counting |

```rust
// Box: Single owner
let b = Box::new(5);

// Rc: Multiple owners, single thread
let rc1 = Rc::new(5);
let rc2 = Rc::clone(&rc1);

// Arc: Multiple owners, thread-safe
let arc1 = Arc::new(5);
let arc2 = Arc::clone(&arc1);
```

## Builder Pattern

### Basic Builder

```rust
pub struct Config {
    host: String,
    port: u16,
    timeout: u64,
    retries: u32,
}

pub struct ConfigBuilder {
    host: Option<String>,
    port: Option<u16>,
    timeout: Option<u64>,
    retries: Option<u32>,
}

impl ConfigBuilder {
    pub fn new() -> Self {
        Self {
            host: None,
            port: None,
            timeout: None,
            retries: None,
        }
    }

    pub fn host(mut self, host: impl Into<String>) -> Self {
        self.host = Some(host.into());
        self
    }

    pub fn port(mut self, port: u16) -> Self {
        self.port = Some(port);
        self
    }

    pub fn timeout(mut self, timeout: u64) -> Self {
        self.timeout = Some(timeout);
        self
    }

    pub fn build(self) -> Result<Config, String> {
        Ok(Config {
            host: self.host.ok_or("host is required")?,
            port: self.port.unwrap_or(8080),
            timeout: self.timeout.unwrap_or(30),
            retries: self.retries.unwrap_or(3),
        })
    }
}

// Usage
let config = ConfigBuilder::new()
    .host("localhost")
    .port(3000)
    .timeout(60)
    .build()?;
```

### Consuming Builder

```rust
impl ConfigBuilder {
    // Takes self by value, enabling method chaining
    pub fn host(mut self, host: String) -> Self {
        self.host = Some(host);
        self  // Return self for chaining
    }

    pub fn port(mut self, port: u16) -> Self {
        self.port = Some(port);
        self
    }
}
```

### Non-Consuming Builder

```rust
impl ConfigBuilder {
    // Takes &mut self, allows reuse
    pub fn host(&mut self, host: String) -> &mut Self {
        self.host = Some(host);
        self
    }

    pub fn port(&mut self, port: u16) -> &mut Self {
        self.port = Some(port);
        self
    }
}

// Usage
let mut builder = ConfigBuilder::new();
builder.host("localhost".to_string())
       .port(3000);

// Can reuse builder
builder.timeout(60);
let config = builder.build()?;
```

## Interior Mutability

### `RefCell<T>` - Runtime Borrow Checking

**Pattern**: Mutate through immutable reference

```rust
use std::cell::RefCell;

struct Logger {
    logs: RefCell<Vec<String>>,
}

impl Logger {
    fn new() -> Self {
        Self {
            logs: RefCell::new(Vec::new()),
        }
    }

    // Takes &self but can mutate logs
    fn log(&self, message: &str) {
        self.logs.borrow_mut().push(message.to_string());
    }

    fn get_logs(&self) -> Vec<String> {
        self.logs.borrow().clone()
    }
}

let logger = Logger::new();
logger.log("First message");
logger.log("Second message");
println!("{:?}", logger.get_logs());
```

**Pattern**: Caching
```rust
use std::cell::RefCell;
use std::collections::HashMap;

struct Cache {
    data: RefCell<HashMap<String, i32>>,
}

impl Cache {
    fn new() -> Self {
        Self {
            data: RefCell::new(HashMap::new()),
        }
    }

    fn get(&self, key: &str) -> Option<i32> {
        self.data.borrow().get(key).copied()
    }

    fn set(&self, key: String, value: i32) {
        self.data.borrow_mut().insert(key, value);
    }
}
```

### `Cell<T>` - Simple Interior Mutability

**Pattern**: Mutating Copy types

```rust
use std::cell::Cell;

struct Counter {
    count: Cell<i32>,
}

impl Counter {
    fn new() -> Self {
        Self {
            count: Cell::new(0),
        }
    }

    fn increment(&self) {
        let current = self.count.get();
        self.count.set(current + 1);
    }

    fn get(&self) -> i32 {
        self.count.get()
    }
}

let counter = Counter::new();
counter.increment();
counter.increment();
println!("Count: {}", counter.get());  // 2
```

### `Mutex<T>` - Thread-Safe Interior Mutability

**Pattern**: Shared mutable state across threads

```rust
use std::sync::{Arc, Mutex};
use std::thread;

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
```

### `RwLock<T>` - Read-Write Lock

**Pattern**: Many readers, occasional writer

```rust
use std::sync::{Arc, RwLock};
use std::thread;

let data = Arc::new(RwLock::new(vec![1, 2, 3]));

// Multiple readers
let mut handles = vec![];
for _ in 0..5 {
    let data = Arc::clone(&data);
    let handle = thread::spawn(move || {
        let read = data.read().unwrap();
        println!("Read: {:?}", *read);
    });
    handles.push(handle);
}

// One writer
let data = Arc::clone(&data);
let handle = thread::spawn(move || {
    let mut write = data.write().unwrap();
    write.push(4);
});
handles.push(handle);

for handle in handles {
    handle.join().unwrap();
}
```

## Common Idioms

### Option to Result

```rust
fn get_user(id: u64) -> Option<User> {
    // ...
    None
}

// Convert Option to Result
fn get_user_result(id: u64) -> Result<User, Error> {
    get_user(id).ok_or(Error::UserNotFound(id))
}

// With closure for lazy error
fn get_user_result2(id: u64) -> Result<User, Error> {
    get_user(id).ok_or_else(|| Error::UserNotFound(id))
}
```

### Entry API Pattern

```rust
use std::collections::HashMap;

let mut map = HashMap::new();

// Pattern: Insert if not present
map.entry("key".to_string())
    .or_insert("default value".to_string());

// Pattern: Update or insert
map.entry("key".to_string())
    .and_modify(|v| v.push_str(" updated"))
    .or_insert("new value".to_string());

// Pattern: Compute value lazily
map.entry("key".to_string())
    .or_insert_with(|| expensive_computation());
```

### RAII Pattern

**Pattern**: Automatic resource cleanup

```rust
struct FileGuard {
    file: File,
}

impl FileGuard {
    fn new(path: &str) -> io::Result<Self> {
        Ok(Self {
            file: File::create(path)?,
        })
    }
}

impl Drop for FileGuard {
    fn drop(&mut self) {
        // Cleanup happens automatically
        let _ = self.file.sync_all();
        println!("File guard dropped");
    }
}

// Usage
{
    let guard = FileGuard::new("test.txt")?;
    // Use file
}  // File automatically closed here
```

### Newtype Pattern

**Pattern**: Type safety through wrapping

```rust
struct UserId(u64);
struct ProductId(u64);

fn get_user(id: UserId) -> Option<User> {
    // Implementation
    None
}

// Type safety prevents mistakes
let user_id = UserId(1);
let product_id = ProductId(1);

get_user(user_id);  // OK
// get_user(product_id);  // Error: type mismatch
```

## Lifetime Patterns

### Lifetime Elision

```rust
// Elided lifetime (compiler infers)
fn first_word(s: &str) -> &str {
    s.split_whitespace().next().unwrap_or("")
}

// Explicit lifetime
fn first_word_explicit<'a>(s: &'a str) -> &'a str {
    s.split_whitespace().next().unwrap_or("")
}
```

### Struct Lifetimes

```rust
struct Context<'a> {
    data: &'a str,
}

impl<'a> Context<'a> {
    fn new(data: &'a str) -> Self {
        Self { data }
    }

    fn get_data(&self) -> &str {
        self.data
    }
}
```

### Static Lifetime

```rust
// String literal has 'static lifetime
const GREETING: &'static str = "Hello";

// Function returning static reference
fn get_greeting() -> &'static str {
    "Hello, world!"
}
```

## Anti-Patterns

### Unnecessary Clone

```rust
// BAD: Cloning when not needed
fn process_bad(data: &Data) -> Result<()> {
    let data_copy = data.clone();  // Unnecessary
    analyze(&data_copy)?;
    Ok(())
}

// GOOD: Use reference
fn process_good(data: &Data) -> Result<()> {
    analyze(data)?;
    Ok(())
}
```

### Fighting the Borrow Checker

```rust
// BAD: Using Rc/RefCell everywhere to avoid borrow checker
struct Bad {
    data: Rc<RefCell<Vec<i32>>>,
}

// GOOD: Restructure to work with borrow checker
struct Good {
    data: Vec<i32>,
}

impl Good {
    fn process(&mut self) {
        self.data.push(42);
    }
}
```

### Over-using Arc/Mutex

```rust
// BAD: Arc<Mutex> when not needed
fn process_bad(data: Arc<Mutex<i32>>) {
    let value = *data.lock().unwrap();
    println!("{}", value);
}

// GOOD: Simple reference
fn process_good(data: &i32) {
    println!("{}", data);
}
```

## Best Practices Summary

1. **Prefer borrowing over cloning** for read-only access
2. **Clone strategically** when you genuinely need independent copies
3. **Use Box** for heap allocation and trait objects
4. **Use Rc** for shared ownership in single-threaded code
5. **Use Arc** for shared ownership across threads
6. **Use RefCell/Cell** for interior mutability when necessary
7. **Use Mutex/RwLock** for thread-safe interior mutability
8. **Apply builder pattern** for complex object construction
9. **Use newtype pattern** for type safety
10. **Let the compiler guide you** - borrow checker errors often suggest better designs
