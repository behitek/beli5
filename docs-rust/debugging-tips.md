---
title: 🐛 Debug Rust Code Hiệu Quả
description: Hướng dẫn debug Rust - từ println! debugging đến VS Code debugger, hiểu compiler messages và các công cụ hữu ích
keywords: [rust, debugging, println, debugger, VS Code, compiler messages, clippy, rust-analyzer, common mistakes]
---

# 🐛 Debug Rust Code Hiệu Quả

Debugging trong Rust khác biệt - compiler giúp bạn rất nhiều! Học cách tận dụng các công cụ để debug nhanh và hiệu quả.

:::tip Philosophy
**Trong Rust: Nếu compile được, thường sẽ chạy đúng!**

Phần lớn bugs được bắt lúc compile-time, không phải runtime. 🎯
:::

---

## 🎯 Debug Strategy

### Level 1: Compiler Messages (Bắt 80% lỗi)
```
Compile → Read errors → Fix → Repeat
```

### Level 2: println! Debugging (Bắt 15% lỗi)
```
Add prints → Run → Analyze output → Fix
```

### Level 3: Debugger (Bắt 5% lỗi còn lại)
```
Set breakpoints → Step through → Inspect → Fix
```

---

## 📖 Level 1: Hiểu Compiler Messages

### The Rust Compiler Là Mentor Tốt Nhất!

**ELI5**: Compiler như thầy giáo kiên nhẫn - chỉ ra lỗi và cách sửa! 👨‍🏫

---

### Error Message Anatomy

```rust
fn main() {
    let s = String::from("hello");
    let s2 = s;
    println!("{}", s);  // ❌
}
```

**Compiler output**:
```
error[E0382]: borrow of moved value: `s`
 --> src/main.rs:4:20
  |
2 |     let s = String::from("hello");
  |         - move occurs because `s` has type `String`, which does not implement the `Copy` trait
3 |     let s2 = s;
  |              - value moved here
4 |     println!("{}", s);
  |                    ^ value borrowed here after move
  |
  = note: consider cloning the value if the performance cost is acceptable: `s.clone()`

For more information about this error, try `rustc --explain E0382`.
```

**Phân tích từng phần**:

1. **Error code**: `E0382`
   ```bash
   # Xem giải thích chi tiết
   rustc --explain E0382
   ```

2. **Error message**: `borrow of moved value`
   - Mô tả vấn đề ngắn gọn

3. **Location**: `src/main.rs:4:20`
   - File, line, column chính xác

4. **Explanation với arrows**:
   ```
   2 | let s = String::from("hello");
     |     - move occurs because...
   3 | let s2 = s;
     |          - value moved here
   4 | println!("{}", s);
     |                ^ value borrowed here after move
   ```
   - Chỉ rõ điều gì xảy ra ở đâu

5. **Note/Help**:
   ```
   = note: consider cloning the value if the performance cost is acceptable
   ```
   - Gợi ý cách fix!

---

### Common Error Codes

#### E0382: Borrow of Moved Value

**Vấn đề**: Dùng value đã bị move

```rust
// ❌ Lỗi
let s = String::from("hello");
let s2 = s;  // s moved to s2
println!("{}", s);  // Error!
```

**Fix options**:
```rust
// ✅ Option 1: Clone
let s = String::from("hello");
let s2 = s.clone();
println!("{}", s);  // OK!

// ✅ Option 2: Borrow
let s = String::from("hello");
let s2 = &s;
println!("{}", s);  // OK!

// ✅ Option 3: Use s2
let s = String::from("hello");
let s2 = s;
println!("{}", s2);  // OK!
```

---

#### E0502: Cannot Borrow As Mutable

**Vấn đề**: Cố mượn mutable khi đã có borrow khác

```rust
// ❌ Lỗi
let mut v = vec![1, 2, 3];
let first = &v[0];       // Immutable borrow
v.push(4);               // Mutable borrow - Error!
println!("{}", first);
```

**Fix**:
```rust
// ✅ Drop immutable borrow trước
let mut v = vec![1, 2, 3];
{
    let first = &v[0];
    println!("{}", first);
}  // first dropped here
v.push(4);  // OK!
```

---

#### E0499: Cannot Borrow As Mutable More Than Once

**Vấn đề**: Nhiều mutable borrows cùng lúc

```rust
// ❌ Lỗi
let mut s = String::from("hello");
let r1 = &mut s;
let r2 = &mut s;  // Error!
println!("{}, {}", r1, r2);
```

**Fix**:
```rust
// ✅ Dùng tuần tự
let mut s = String::from("hello");
{
    let r1 = &mut s;
    r1.push_str(" world");
}  // r1 dropped
let r2 = &mut s;
r2.push_str("!");
```

---

#### E0597: Borrowed Value Does Not Live Long Enough

**Vấn đề**: Reference sống lâu hơn data

```rust
// ❌ Lỗi
fn bad() -> &String {
    let s = String::from("hello");
    &s  // Error! s dropped khi function kết thúc
}
```

**Fix**:
```rust
// ✅ Return owned value
fn good() -> String {
    let s = String::from("hello");
    s  // Move ownership
}

// ✅ Hoặc dùng 'static
fn static_ref() -> &'static str {
    "hello"  // String literal lives forever
}
```

---

## 🖨️ Level 2: println! Debugging

### The Classic Approach

**ELI5**: Như để dấu vết bánh mì - in ra để biết code đi đâu! 🍞

---

### Basic println! Debugging

```rust
fn calculate(x: i32, y: i32) -> i32 {
    println!("calculate called with x={}, y={}", x, y);

    let result = x * 2 + y;
    println!("intermediate result: {}", result);

    let final_result = result - 5;
    println!("final result: {}", final_result);

    final_result
}

fn main() {
    println!("Program started");
    let result = calculate(10, 5);
    println!("Got result: {}", result);
    println!("Program ended");
}
```

**Output**:
```
Program started
calculate called with x=10, y=5
intermediate result: 25
final result: 20
Got result: 20
Program ended
```

---

### Debug Print với `{:?}`

```rust
#[derive(Debug)]
struct User {
    name: String,
    age: u32,
}

fn main() {
    let user = User {
        name: "Alice".to_string(),
        age: 25,
    };

    // Debug print
    println!("User: {:?}", user);
    // Output: User: User { name: "Alice", age: 25 }

    // Pretty debug print
    println!("User: {:#?}", user);
    // Output:
    // User: User {
    //     name: "Alice",
    //     age: 25
    // }
}
```

---

### dbg! Macro - Debug Print Better

**Advantages over println!**:
- ✅ Prints file, line, expression
- ✅ Returns ownership
- ✅ Prints to stderr (không làm rối stdout)

```rust
fn main() {
    let x = 5;
    let y = 10;

    // println! approach
    println!("x = {}, y = {}", x, y);

    // dbg! approach - better!
    dbg!(x);
    dbg!(y);
    dbg!(x + y);

    // Can use in expressions
    let z = dbg!(x * 2) + dbg!(y * 3);
    dbg!(z);
}
```

**Output**:
```
[src/main.rs:6] x = 5
[src/main.rs:7] y = 10
[src/main.rs:8] x + y = 15
[src/main.rs:11] x * 2 = 10
[src/main.rs:11] y * 3 = 30
[src/main.rs:12] z = 40
```

---

### Conditional Debug Prints

```rust
// Only compile in debug builds
fn calculate(x: i32) -> i32 {
    #[cfg(debug_assertions)]
    println!("DEBUG: calculate called with x={}", x);

    x * 2
}

// Custom debug flag
const DEBUG: bool = true;

fn process(data: &str) {
    if DEBUG {
        println!("Processing: {}", data);
    }
    // ... actual processing
}
```

---

### Debug Print với Timestamps

```rust
use std::time::Instant;

fn main() {
    let start = Instant::now();

    println!("[{:?}] Program started", start.elapsed());

    // Some work
    std::thread::sleep(std::time::Duration::from_millis(100));
    println!("[{:?}] After sleep", start.elapsed());

    // More work
    let _result = calculate();
    println!("[{:?}] After calculate", start.elapsed());
}

fn calculate() -> i32 {
    std::thread::sleep(std::time::Duration::from_millis(50));
    42
}
```

**Output**:
```
[0ns] Program started
[100.5ms] After sleep
[150.8ms] After calculate
```

---

### Tracing với log crate

**Better cho production code**:

```toml
# Cargo.toml
[dependencies]
log = "0.4"
env_logger = "0.10"
```

```rust
use log::{debug, error, info, trace, warn};

fn main() {
    env_logger::init();

    trace!("Very detailed");
    debug!("Debug info");
    info!("Informational");
    warn!("Warning!");
    error!("Error occurred!");
}
```

**Run với log level**:
```bash
RUST_LOG=debug cargo run
RUST_LOG=info cargo run
RUST_LOG=trace cargo run
```

---

## 🔧 Level 3: VS Code Debugger

### Setup

**1. Install Extensions**:
- "rust-analyzer" - Rust language support
- "CodeLLDB" - Debugger

**2. Create `launch.json`**:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "lldb",
            "request": "launch",
            "name": "Debug",
            "cargo": {
                "args": [
                    "build",
                    "--bin=my_program",
                    "--package=my_package"
                ],
                "filter": {
                    "name": "my_program",
                    "kind": "bin"
                }
            },
            "args": [],
            "cwd": "${workspaceFolder}"
        }
    ]
}
```

---

### Using The Debugger

**Set Breakpoints**:
- Click bên trái line numbers (red dot)

**Run Debugger**:
- F5 hoặc Run > Start Debugging

**Controls**:
- **F10** - Step Over (next line)
- **F11** - Step Into (vào function)
- **Shift+F11** - Step Out (thoát function)
- **F5** - Continue (chạy đến breakpoint tiếp)

**Watch Variables**:
- Hover over variables
- Add to Watch panel
- View in Variables panel

---

### Debug Example

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Set breakpoint here
    let sum = calculate_sum(&numbers);

    // Set breakpoint here
    println!("Sum: {}", sum);
}

fn calculate_sum(nums: &[i32]) -> i32 {
    let mut total = 0;

    // Set breakpoint here
    for &num in nums {
        total += num;  // Step through loop
    }

    total
}
```

**Debug steps**:
1. Set breakpoint tại `let sum = calculate_sum`
2. F5 to run
3. F11 to step into `calculate_sum`
4. F10 to step through loop
5. Inspect `total` variable
6. F5 to continue

---

### Conditional Breakpoints

**Right-click breakpoint → Edit Breakpoint**:

**Expression**:
```
num > 3
```
- Chỉ break khi `num > 3`

**Hit Count**:
```
5
```
- Chỉ break lần thứ 5

---

## 🛠️ Debug Tools

### 1. cargo check

**Fastest way to check errors**:
```bash
cargo check
```
- Không build binary
- Nhanh hơn `cargo build`
- Dùng liên tục khi code

---

### 2. cargo clippy

**Linter - tìm code smells**:
```bash
cargo clippy
```

**Examples of clippy suggestions**:

```rust
// ❌ Clippy warning
if x == true { }
// ✅ Suggestion
if x { }

// ❌ Clippy warning
let v = vec![1, 2, 3];
let first = v.get(0).unwrap();
// ✅ Suggestion
let first = &v[0];  // Or use if let
```

**Clippy as errors**:
```bash
cargo clippy -- -D warnings
```

---

### 3. cargo fmt

**Auto-format code**:
```bash
cargo fmt
```
- Uniform style
- Dễ đọc
- Tránh style debates

---

### 4. cargo tree

**View dependency tree**:
```bash
cargo tree
```

**Find duplicate dependencies**:
```bash
cargo tree --duplicates
```

---

### 5. cargo expand

**See macro expansions**:
```bash
cargo install cargo-expand
cargo expand
```

**Example**:
```rust
#[derive(Debug)]
struct Point { x: i32, y: i32 }

// cargo expand shows generated code:
impl std::fmt::Debug for Point {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        // ... generated implementation
    }
}
```

---

### 6. rust-analyzer

**IDE features**:
- ✅ **Inline errors** - See errors as you type
- ✅ **Hover hints** - Type information
- ✅ **Go to definition** - F12
- ✅ **Find references** - Shift+F12
- ✅ **Rename** - F2
- ✅ **Code actions** - Ctrl+.

---

## 🎯 Common Mistakes & How To Spot

### 1. Off-by-One Errors

```rust
// ❌ Bug
let v = vec![1, 2, 3];
for i in 0..=v.len() {  // <= causes out of bounds!
    println!("{}", v[i]);
}

// ✅ Fix
for i in 0..v.len() {
    println!("{}", v[i]);
}

// ✅ Better
for item in &v {
    println!("{}", item);
}
```

**Debug**:
- Print `i` and `v.len()`
- Use debugger to step through

---

### 2. Integer Overflow (Debug Mode)

```rust
fn main() {
    let x: u8 = 255;
    let y = x + 1;  // Panic in debug, wrap in release!
    println!("{}", y);
}
```

**Debug**:
```rust
// ✅ Explicit handling
let x: u8 = 255;
let y = x.checked_add(1);
match y {
    Some(val) => println!("{}", val),
    None => println!("Overflow!"),
}
```

---

### 3. Dangling References

```rust
// ❌ Won't compile - compiler catches!
fn bad() -> &String {
    let s = String::from("hello");
    &s  // Error: s dropped
}
```

**Compiler helps you!**

---

### 4. Uninitialized Variables

```rust
// ❌ Won't compile
let x: i32;
println!("{}", x);  // Error: use of possibly uninitialized variable

// ✅ Fix
let x: i32 = 0;
println!("{}", x);
```

---

### 5. Forgotten .await

```rust
async fn fetch_data() -> String {
    "data".to_string()
}

async fn process() {
    // ❌ Forgot .await
    let data = fetch_data();  // This is a Future, not String!

    // ✅ Correct
    let data = fetch_data().await;
}
```

**Debug**: Compiler error về type mismatch

---

## 📊 Debug Strategies By Error Type

### Compile Errors
**Strategy**: Read compiler message carefully
- ✅ Use `rustc --explain`
- ✅ Check line numbers
- ✅ Follow suggestions

### Logic Errors
**Strategy**: println! / dbg! debugging
- ✅ Print intermediate values
- ✅ Check assumptions
- ✅ Trace execution flow

### Performance Issues
**Strategy**: Profiling
- ✅ Use `cargo flamegraph`
- ✅ Benchmark với criterion
- ✅ Check với `cargo bloat`

### Runtime Panics
**Strategy**: Backtrace
```bash
RUST_BACKTRACE=1 cargo run
RUST_BACKTRACE=full cargo run
```

---

## 🔍 Advanced Debug Techniques

### Custom Debug Implementations

```rust
use std::fmt;

struct Point {
    x: i32,
    y: i32,
}

impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Point({}, {})", self.x, self.y)
    }
}

fn main() {
    let p = Point { x: 1, y: 2 };
    println!("{:?}", p);  // Point(1, 2)
}
```

---

### Debug Assertions

```rust
fn divide(a: i32, b: i32) -> i32 {
    debug_assert!(b != 0, "Divisor cannot be zero!");
    a / b
}
```
- Chỉ check trong debug builds
- Zero cost trong release

---

### Logging Levels

```rust
use log::{debug, info, warn, error};

fn process_file(path: &str) {
    info!("Processing file: {}", path);

    match read_file(path) {
        Ok(content) => {
            debug!("Read {} bytes", content.len());
            parse(content);
        }
        Err(e) => {
            error!("Failed to read file: {}", e);
        }
    }
}
```

---

## 💡 Pro Tips

:::tip Debug Like A Pro
1. **Read compiler first** - 80% vấn đề đã được giải thích
2. **Use dbg!() over println!()** - Better info
3. **Learn debugger** - Save time cho complex issues
4. **Clippy is your friend** - Run regularly
5. **RUST_BACKTRACE=1** - For panics
6. **Test small pieces** - Easier to debug
7. **Git bisect** - Find when bug introduced
8. **Ask for help** - After trying 30 minutes
:::

---

## 🎓 Debug Checklist

Khi gặp bug:

- [ ] Đọc error message kỹ
- [ ] `rustc --explain Exxxx`
- [ ] Run `cargo clippy`
- [ ] Add `dbg!()` prints
- [ ] Check assumptions
- [ ] Simplify code
- [ ] Test với simple inputs
- [ ] Google error message
- [ ] Ask on Discord/Forums

---

## 📚 Resources

**Official**:
- [Rust Error Index](https://doc.rust-lang.org/error-index.html)
- [Rust Compiler Error Index](https://doc.rust-lang.org/error_codes/)

**Tools**:
- [rust-analyzer](https://rust-analyzer.github.io/)
- [Clippy Lints](https://rust-lang.github.io/rust-clippy/master/)

**Community**:
- Discord #beginners
- Stack Overflow [rust] tag

---

**Remember**: Debugging trong Rust dễ hơn nhiều ngôn ngữ khác - compiler là ally lớn nhất! 🦀

**Tiếp theo**: [What's Next?](./whats-next) 🚀
