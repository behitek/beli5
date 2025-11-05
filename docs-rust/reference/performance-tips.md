# Performance Optimization in Rust

A comprehensive guide to writing high-performance Rust code, including profiling tools, common bottlenecks, and optimization techniques.

## Table of Contents
- [Zero-Cost Abstractions](#zero-cost-abstractions)
- [Profiling Tools](#profiling-tools)
- [Memory Optimization](#memory-optimization)
- [Avoiding Allocations](#avoiding-allocations)
- [Iterator Optimization](#iterator-optimization)
- [Concurrency and Parallelism](#concurrency-and-parallelism)
- [Common Bottlenecks](#common-bottlenecks)
- [Compiler Optimizations](#compiler-optimizations)
- [Benchmarking](#benchmarking)

## Zero-Cost Abstractions

### What Are Zero-Cost Abstractions?

Rust's abstractions have no runtime overhead - the abstraction costs nothing compared to hand-written code.

```rust
// High-level iterator code
let sum: i32 = (0..1000)
    .filter(|x| x % 2 == 0)
    .map(|x| x * 2)
    .sum();

// Compiles to essentially the same machine code as:
let mut sum = 0;
for i in 0..1000 {
    if i % 2 == 0 {
        sum += i * 2;
    }
}
```

### Generics (Monomorphization)

Generic code is specialized at compile time - no virtual dispatch overhead.

```rust
// Generic function
fn add<T: std::ops::Add<Output = T>>(a: T, b: T) -> T {
    a + b
}

// At compile time, generates separate functions:
// fn add_i32(a: i32, b: i32) -> i32 { a + b }
// fn add_f64(a: f64, b: f64) -> f64 { a + b }

let x = add(5, 10);      // Uses add_i32
let y = add(5.0, 10.0);  // Uses add_f64
```

### Smart Pointers

```rust
// Box has same performance as raw pointer
let boxed = Box::new(42);
let value = *boxed;  // Zero-cost dereference

// Rc/Arc only pay for reference counting when cloned
let rc = Rc::new(42);
let rc2 = Rc::clone(&rc);  // Increment ref count (small cost)
let value = *rc;  // Dereference is zero-cost
```

## Profiling Tools

### cargo-flamegraph

**Installation**:
```bash
cargo install flamegraph
```

**Usage**:
```bash
# Profile your application
cargo flamegraph

# Profile specific binary
cargo flamegraph --bin my_binary

# Profile tests
cargo flamegraph --test my_test

# With specific arguments
cargo flamegraph --bin my_binary -- arg1 arg2
```

**Output**: Generates `flamegraph.svg` showing time spent in each function.

### perf (Linux)

```bash
# Record performance data
cargo build --release
perf record --call-graph=dwarf ./target/release/my_binary

# View report
perf report

# Generate flame graph
perf script | stackcollapse-perf.pl | flamegraph.pl > flame.svg
```

### Instruments (macOS)

```bash
# Build with debug symbols
cargo build --release --bin my_binary

# Launch with Instruments
instruments -t "Time Profiler" ./target/release/my_binary
```

### cargo-profdata

```bash
# Install
cargo install cargo-profdata

# Profile
cargo profdata -- run --release
```

### valgrind (Memory profiling)

```bash
# Check for memory leaks
valgrind --leak-check=full ./target/debug/my_binary

# Profile cache usage
valgrind --tool=cachegrind ./target/release/my_binary

# Profile heap usage
valgrind --tool=massif ./target/release/my_binary
```

### heaptrack (Heap profiling)

```bash
# Record heap allocations
heaptrack ./target/release/my_binary

# Analyze results
heaptrack_gui heaptrack.my_binary.12345.gz
```

## Memory Optimization

### Use Appropriate Data Structures

```rust
// Bad: Vec for small, fixed-size arrays
let coords: Vec<f64> = vec![x, y, z];  // Heap allocation

// Good: Array for fixed size
let coords: [f64; 3] = [x, y, z];  // Stack allocation

// Bad: String for small strings
let status: String = String::from("OK");  // Heap allocation

// Good: &str for literals
let status: &str = "OK";  // No allocation

// Consider: smallvec for small vectors
use smallvec::{SmallVec, smallvec};
let small: SmallVec<[i32; 4]> = smallvec![1, 2, 3];  // Stack if ≤4 items
```

### Pre-allocate Capacity

```rust
// Bad: Growing vector causes reallocations
let mut vec = Vec::new();
for i in 0..1000 {
    vec.push(i);  // Multiple reallocations
}

// Good: Pre-allocate
let mut vec = Vec::with_capacity(1000);
for i in 0..1000 {
    vec.push(i);  // No reallocations
}

// For HashMap
let mut map = HashMap::with_capacity(100);
```

### Reuse Allocations

```rust
// Bad: Allocating in loop
for _ in 0..1000 {
    let mut buffer = Vec::new();
    read_data(&mut buffer);
    process(&buffer);
}  // Buffer dropped and reallocated each iteration

// Good: Reuse buffer
let mut buffer = Vec::new();
for _ in 0..1000 {
    buffer.clear();  // Keep capacity
    read_data(&mut buffer);
    process(&buffer);
}
```

### Use Compact Data Structures

```rust
// Less efficient: Each field aligned
struct Large {
    a: u8,     // 1 byte + 7 padding
    b: u64,    // 8 bytes
    c: u8,     // 1 byte + 7 padding
    d: u64,    // 8 bytes
}  // Total: 32 bytes

// More efficient: Group by size
struct Compact {
    b: u64,    // 8 bytes
    d: u64,    // 8 bytes
    a: u8,     // 1 byte
    c: u8,     // 1 byte + 6 padding
}  // Total: 24 bytes

// Check size
assert_eq!(std::mem::size_of::<Large>(), 32);
assert_eq!(std::mem::size_of::<Compact>(), 24);
```

### Use References Instead of Cloning

```rust
// Bad: Unnecessary clones
fn process_names(names: Vec<String>) {
    for name in names.iter() {
        let upper = name.clone().to_uppercase();  // Bad
        println!("{}", upper);
    }
}

// Good: Work with references
fn process_names(names: &[String]) {
    for name in names {
        let upper = name.to_uppercase();  // to_uppercase creates new String
        println!("{}", upper);
    }
}
```

### Pool Allocations

```rust
use std::sync::{Arc, Mutex};

struct ObjectPool<T> {
    objects: Arc<Mutex<Vec<T>>>,
}

impl<T> ObjectPool<T> {
    fn new() -> Self {
        Self {
            objects: Arc::new(Mutex::new(Vec::new())),
        }
    }

    fn acquire(&self) -> Option<T> {
        self.objects.lock().unwrap().pop()
    }

    fn release(&self, obj: T) {
        self.objects.lock().unwrap().push(obj);
    }
}

// Usage: Reuse expensive objects
let pool = ObjectPool::<Vec<u8>>::new();
let mut buffer = pool.acquire().unwrap_or_else(|| Vec::with_capacity(1024));
// Use buffer...
pool.release(buffer);
```

## Avoiding Allocations

### Use Cow for Conditional Allocation

```rust
use std::borrow::Cow;

// Only allocate if modification needed
fn normalize<'a>(input: &'a str) -> Cow<'a, str> {
    if input.chars().all(|c| c.is_lowercase()) {
        Cow::Borrowed(input)  // No allocation
    } else {
        Cow::Owned(input.to_lowercase())  // Allocate only if needed
    }
}

let s1 = normalize("hello");  // No allocation
let s2 = normalize("HELLO");  // Allocates
```

### String Building

```rust
// Bad: Multiple allocations
let s = "Hello".to_string() + ", " + "world" + "!";

// Good: Format macro
let s = format!("Hello, {}!", "world");

// Better: Pre-allocated string
let mut s = String::with_capacity(50);
s.push_str("Hello, ");
s.push_str("world");
s.push('!');
```

### Stack Arrays vs Heap Vectors

```rust
// Stack allocation (fast, fixed size)
let array: [i32; 100] = [0; 100];

// Heap allocation (flexible, slower)
let vector: Vec<i32> = vec![0; 100];

// Use stack when size is known at compile time
const SIZE: usize = 1024;
let buffer: [u8; SIZE] = [0; SIZE];
```

### Slice Operations

```rust
// Bad: Creating new vector
fn first_three(v: &Vec<i32>) -> Vec<i32> {
    v[0..3].to_vec()  // Allocates
}

// Good: Return slice
fn first_three(v: &[i32]) -> &[i32] {
    &v[0..3]  // No allocation
}
```

### Static Strings

```rust
// Bad: Allocating string for constant
fn get_greeting() -> String {
    "Hello".to_string()  // Unnecessary allocation
}

// Good: Return static string slice
fn get_greeting() -> &'static str {
    "Hello"  // No allocation
}
```

## Iterator Optimization

### Use Iterator Adapters

```rust
// Good: Lazy evaluation, single pass
let sum: i32 = numbers
    .iter()
    .filter(|&&x| x > 0)
    .map(|&x| x * 2)
    .sum();

// Bad: Multiple passes, intermediate collections
let positive: Vec<_> = numbers.iter().filter(|&&x| x > 0).collect();
let doubled: Vec<_> = positive.iter().map(|&&x| x * 2).collect();
let sum: i32 = doubled.iter().sum();
```

### Avoid Collect When Not Needed

```rust
// Bad: Unnecessary collection
let has_negative = numbers
    .iter()
    .filter(|&&x| x < 0)
    .collect::<Vec<_>>()
    .len() > 0;

// Good: Use iterator methods
let has_negative = numbers.iter().any(|&x| x < 0);
```

### Use fold vs collect + sum

```rust
// Less efficient: Creates intermediate vector
let sum: i32 = (0..1000)
    .map(|x| x * 2)
    .collect::<Vec<_>>()
    .iter()
    .sum();

// More efficient: Direct fold
let sum: i32 = (0..1000)
    .map(|x| x * 2)
    .sum();
```

### Parallel Iterators (rayon)

```rust
use rayon::prelude::*;

// Sequential
let sum: i32 = (0..1_000_000)
    .map(|x| expensive_computation(x))
    .sum();

// Parallel (uses all CPU cores)
let sum: i32 = (0..1_000_000)
    .into_par_iter()
    .map(|x| expensive_computation(x))
    .sum();
```

## Concurrency and Parallelism

### Thread Pool

```rust
use rayon::ThreadPoolBuilder;

// Create thread pool
let pool = ThreadPoolBuilder::new()
    .num_threads(4)
    .build()
    .unwrap();

// Execute in pool
pool.install(|| {
    // Parallel work here
    (0..1000).into_par_iter().for_each(|i| {
        process(i);
    });
});
```

### Async for I/O-Bound Tasks

```rust
use tokio::task;

// Bad: Blocking operations in async
async fn process_files() {
    for file in files {
        let content = std::fs::read_to_string(file).unwrap();  // Blocks!
        process(content);
    }
}

// Good: Use async I/O
async fn process_files() {
    for file in files {
        let content = tokio::fs::read_to_string(file).await.unwrap();
        process(content);
    }
}

// Better: Concurrent processing
async fn process_files_concurrent(files: Vec<String>) {
    let tasks: Vec<_> = files
        .into_iter()
        .map(|file| {
            task::spawn(async move {
                let content = tokio::fs::read_to_string(file).await.unwrap();
                process(content)
            })
        })
        .collect();

    for task in tasks {
        task.await.unwrap();
    }
}
```

### Message Passing vs Shared State

```rust
// Prefer message passing for better performance
use std::sync::mpsc;

// Good: Lock-free message passing
let (tx, rx) = mpsc::channel();
thread::spawn(move || {
    for i in 0..1000 {
        tx.send(i).unwrap();
    }
});

for received in rx {
    println!("{}", received);
}

// Shared state requires locking (slower)
let counter = Arc::new(Mutex::new(0));
// Multiple threads locking counter...
```

## Common Bottlenecks

### String Concatenation

```rust
// Slow: Multiple allocations
let mut s = String::new();
for i in 0..1000 {
    s = s + &i.to_string();  // Reallocates each time!
}

// Fast: Pre-allocate and push
let mut s = String::with_capacity(4000);
for i in 0..1000 {
    s.push_str(&i.to_string());
}

// Fastest: Use format! with join
let numbers: Vec<String> = (0..1000).map(|i| i.to_string()).collect();
let s = numbers.join("");
```

### HashMap Lookups

```rust
// Slow: Multiple lookups
if map.contains_key(&key) {
    let value = map.get(&key).unwrap();
    process(value);
}

// Fast: Single lookup
if let Some(value) = map.get(&key) {
    process(value);
}

// Even better: Entry API for mutations
map.entry(key)
    .and_modify(|v| *v += 1)
    .or_insert(1);
```

### Vector Growth

```rust
// Slow: Unknown capacity, many reallocations
let mut vec = Vec::new();
for data in large_dataset {
    vec.push(process(data));
}

// Fast: Pre-allocated
let mut vec = Vec::with_capacity(large_dataset.len());
for data in large_dataset {
    vec.push(process(data));
}

// Fastest: Use collect with size hint
let vec: Vec<_> = large_dataset
    .iter()
    .map(|data| process(data))
    .collect();
```

### Regex Compilation

```rust
// Slow: Compiling regex in loop
for line in lines {
    let re = Regex::new(r"\d+").unwrap();  // Recompiles each time!
    if re.is_match(line) {
        // ...
    }
}

// Fast: Compile once
let re = Regex::new(r"\d+").unwrap();
for line in lines {
    if re.is_match(line) {
        // ...
    }
}

// Better: Use lazy_static
use lazy_static::lazy_static;

lazy_static! {
    static ref RE: Regex = Regex::new(r"\d+").unwrap();
}

for line in lines {
    if RE.is_match(line) {
        // ...
    }
}
```

## Compiler Optimizations

### Release Mode

```bash
# Always benchmark in release mode
cargo build --release
cargo run --release
cargo bench
```

**Cargo.toml**:
```toml
[profile.release]
opt-level = 3              # Maximum optimization
lto = true                 # Link-Time Optimization
codegen-units = 1          # Better optimization, slower compile
strip = true               # Strip symbols
panic = "abort"            # Smaller binary, faster panic
```

### Profile-Guided Optimization (PGO)

```bash
# Step 1: Build with instrumentation
RUSTFLAGS="-Cprofile-generate=/tmp/pgo-data" cargo build --release

# Step 2: Run to generate profile data
./target/release/my_binary

# Step 3: Rebuild with profile data
RUSTFLAGS="-Cprofile-use=/tmp/pgo-data/merged.profdata" cargo build --release
```

### Target CPU

```bash
# Optimize for current CPU
RUSTFLAGS="-C target-cpu=native" cargo build --release

# Or in .cargo/config.toml
[build]
rustflags = ["-C", "target-cpu=native"]
```

### Inline Hints

```rust
// Suggest inlining
#[inline]
fn small_function() -> i32 {
    42
}

// Force inlining (use sparingly)
#[inline(always)]
fn must_inline() -> i32 {
    42
}

// Prevent inlining
#[inline(never)]
fn should_not_inline() {
    // ...
}
```

### Bounds Check Elimination

```rust
// Compiler can eliminate bounds checks
fn process_slice(slice: &[i32]) -> i32 {
    let mut sum = 0;
    for i in 0..slice.len() {
        sum += slice[i];  // Bounds check eliminated
    }
    sum
}

// Iterator version (also no bounds checks)
fn process_slice_iter(slice: &[i32]) -> i32 {
    slice.iter().sum()
}

// Unsafe (skip bounds checks manually)
fn process_slice_unsafe(slice: &[i32]) -> i32 {
    let mut sum = 0;
    for i in 0..slice.len() {
        sum += unsafe { *slice.get_unchecked(i) };
    }
    sum
}
```

## Benchmarking

### Using Criterion

**Cargo.toml**:
```toml
[dev-dependencies]
criterion = { version = "0.5", features = ["html_reports"] }

[[bench]]
name = "my_benchmark"
harness = false
```

**benches/my_benchmark.rs**:
```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion, BenchmarkId};

fn fibonacci_recursive(n: u64) -> u64 {
    match n {
        0 => 1,
        1 => 1,
        n => fibonacci_recursive(n-1) + fibonacci_recursive(n-2),
    }
}

fn fibonacci_iterative(n: u64) -> u64 {
    let mut a = 0;
    let mut b = 1;
    for _ in 0..n {
        let c = a + b;
        a = b;
        b = c;
    }
    b
}

fn bench_fibonacci(c: &mut Criterion) {
    let mut group = c.benchmark_group("fibonacci");

    for i in [10, 15, 20].iter() {
        group.bench_with_input(BenchmarkId::new("recursive", i), i,
            |b, i| b.iter(|| fibonacci_recursive(black_box(*i))));

        group.bench_with_input(BenchmarkId::new("iterative", i), i,
            |b, i| b.iter(|| fibonacci_iterative(black_box(*i))));
    }

    group.finish();
}

criterion_group!(benches, bench_fibonacci);
criterion_main!(benches);
```

**Run benchmarks**:
```bash
cargo bench
```

### Micro-benchmarking Tips

```rust
use criterion::{black_box, Criterion};

fn benchmark(c: &mut Criterion) {
    // Use black_box to prevent compiler optimizations
    c.bench_function("compute", |b| {
        b.iter(|| {
            let n = black_box(100);
            expensive_function(n)
        })
    });

    // Setup and teardown
    c.bench_function("with_setup", |b| {
        b.iter_batched(
            || setup_data(),  // Setup (not timed)
            |data| process(data),  // Operation to benchmark
            criterion::BatchSize::SmallInput,
        )
    });
}
```

## Performance Checklist

### Before Optimizing
- [ ] Profile first - find actual bottlenecks
- [ ] Use release mode for benchmarks
- [ ] Measure, don't guess
- [ ] Focus on hot paths (90/10 rule)

### Memory
- [ ] Pre-allocate collections with capacity
- [ ] Reuse allocations in loops
- [ ] Use `&str` instead of `String` for parameters
- [ ] Consider `Cow` for conditional allocation
- [ ] Use appropriate data structures (Vec vs SmallVec, etc.)

### Algorithms
- [ ] Use iterators instead of manual loops
- [ ] Avoid unnecessary `collect()` calls
- [ ] Use parallel iterators for CPU-bound work
- [ ] Cache expensive computations
- [ ] Use efficient data structures (HashMap vs BTreeMap)

### Compilation
- [ ] Enable LTO in release profile
- [ ] Set `codegen-units = 1` for max optimization
- [ ] Use `target-cpu=native` if not distributing
- [ ] Consider PGO for critical applications

### Code Structure
- [ ] Inline small hot functions
- [ ] Avoid deep call stacks in hot paths
- [ ] Use `&[T]` instead of `&Vec<T>` for parameters
- [ ] Minimize trait object overhead in hot paths
- [ ] Use concrete types over generics when performance critical

## Tools Quick Reference

| Tool | Purpose | Command |
|------|---------|---------|
| cargo-flamegraph | CPU profiling | `cargo flamegraph` |
| perf | Linux profiling | `perf record ./binary` |
| valgrind | Memory profiling | `valgrind ./binary` |
| heaptrack | Heap profiling | `heaptrack ./binary` |
| criterion | Benchmarking | `cargo bench` |
| cargo-bloat | Binary size analysis | `cargo bloat --release` |
| cargo-asm | View assembly | `cargo asm` |

## Optimization Priorities

1. **Correctness first** - Don't sacrifice correctness for speed
2. **Profile before optimizing** - Measure to find real bottlenecks
3. **Algorithm over micro-optimizations** - O(n²) to O(n log n) wins
4. **Memory allocations** - Often the biggest bottleneck
5. **Unnecessary work** - Compute once, cache results
6. **Parallelization** - Use all CPU cores when appropriate
7. **Micro-optimizations** - Only after profiling shows need

Remember: **Premature optimization is the root of all evil.** Profile first, optimize what matters, and maintain readability.
