---
sidebar_position: 28
title: "Async/Await: Lập Trình Bất Đồng Bộ"
description: "Tìm hiểu async/await và lập trình bất đồng bộ trong Rust"
---

# ⚡ Async/Await: Lập Trình Bất Đồng Bộ

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu async vs sync programming
- ✅ Sử dụng `async fn` và `.await`
- ✅ Hiểu Futures trong Rust
- ✅ So sánh async vs threads
- ✅ Blocking vs non-blocking
- ✅ Giới thiệu async runtimes

## 🤔 Async Programming Là Gì?

### Ẩn Dụ Cuộc Sống: Nhà Hàng Phục Vụ

**Async** giống như **cách nhà hàng phục vụ khách**:

🍽️ **Sync (Đồng Bộ)**:
- Phục vụ từng bàn một
- Đợi món xong mới sang bàn khác
- Chậm, lãng phí thời gian chờ

⚡ **Async (Bất Đồng Bộ)**:
- Nhận order nhiều bàn
- Khi bếp nấu, phục vụ bàn khác
- Quay lại khi món sẵn sàng
- Hiệu quả hơn!

🦀 **Async Trong Rust**:
- **Không block** khi chờ I/O
- Xử lý nhiều tasks đồng thời
- Lightweight - không cần nhiều threads
- Zero-cost abstractions

### Ví Dụ Cơ Bản

```rust
// Cần thêm tokio vào Cargo.toml:
// tokio = { version = "1", features = ["full"] }

use tokio::time::{sleep, Duration};

async fn say_hello() {
    println!("Hello");
    sleep(Duration::from_secs(1)).await;
    println!("World");
}

#[tokio::main]
async fn main() {
    say_hello().await;
}
```

## 📝 Async Functions

### Định Nghĩa Async Function

```rust
// Sync function
fn sync_function() -> String {
    String::from("Hello")
}

// Async function
async fn async_function() -> String {
    String::from("Hello")
}

// async fn returns Future<Output = String>
```

### Calling Async Functions

```rust
async fn fetch_data() -> i32 {
    42
}

#[tokio::main]
async fn main() {
    // Phải dùng .await để get kết quả
    let data = fetch_data().await;
    println!("Data: {}", data);
}
```

### Multiple Async Calls

```rust
use tokio::time::{sleep, Duration};

async fn task1() -> String {
    sleep(Duration::from_secs(1)).await;
    String::from("Task 1 done")
}

async fn task2() -> String {
    sleep(Duration::from_secs(1)).await;
    String::from("Task 2 done")
}

#[tokio::main]
async fn main() {
    // Sequential - takes 2 seconds
    let r1 = task1().await;
    let r2 = task2().await;

    println!("{}", r1);
    println!("{}", r2);
}
```

## ⏳ .await Keyword

### Await là gì?

```rust
use tokio::time::{sleep, Duration};

async fn slow_operation() -> i32 {
    println!("Starting...");
    sleep(Duration::from_secs(2)).await;  // Pause here
    println!("Done!");
    42
}

#[tokio::main]
async fn main() {
    let result = slow_operation().await;
    println!("Result: {}", result);
}
```

### Await Multiple Operations

```rust
use tokio::time::{sleep, Duration};

async fn operation1() -> i32 {
    sleep(Duration::from_secs(1)).await;
    10
}

async fn operation2() -> i32 {
    sleep(Duration::from_secs(1)).await;
    20
}

async fn operation3() -> i32 {
    sleep(Duration::from_secs(1)).await;
    30
}

#[tokio::main]
async fn main() {
    let a = operation1().await;
    let b = operation2().await;
    let c = operation3().await;

    println!("Sum: {}", a + b + c);  // Takes 3 seconds total
}
```

## 🔀 Concurrent Execution

### tokio::join! - Run Concurrently

```rust
use tokio::time::{sleep, Duration};

async fn task1() -> String {
    sleep(Duration::from_secs(2)).await;
    String::from("Task 1")
}

async fn task2() -> String {
    sleep(Duration::from_secs(2)).await;
    String::from("Task 2")
}

#[tokio::main]
async fn main() {
    // Run concurrently - only 2 seconds total!
    let (r1, r2) = tokio::join!(task1(), task2());

    println!("{}, {}", r1, r2);
}
```

### tokio::spawn - Spawn Task

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let handle = tokio::spawn(async {
        sleep(Duration::from_secs(1)).await;
        println!("Task completed!");
        42
    });

    println!("Task spawned");

    let result = handle.await.unwrap();
    println!("Result: {}", result);
}
```

### Multiple Spawned Tasks

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let mut handles = vec![];

    for i in 0..5 {
        let handle = tokio::spawn(async move {
            sleep(Duration::from_millis(100 * i)).await;
            println!("Task {} done", i);
            i
        });

        handles.push(handle);
    }

    for handle in handles {
        let result = handle.await.unwrap();
        println!("Result: {}", result);
    }
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Simulated API Calls

```rust
use tokio::time::{sleep, Duration};

async fn fetch_user(id: u32) -> String {
    sleep(Duration::from_secs(1)).await;
    format!("User {}", id)
}

async fn fetch_posts(user: &str) -> Vec<String> {
    sleep(Duration::from_secs(1)).await;
    vec![
        format!("{}'s post 1", user),
        format!("{}'s post 2", user),
    ]
}

#[tokio::main]
async fn main() {
    let user = fetch_user(1).await;
    println!("Got user: {}", user);

    let posts = fetch_posts(&user).await;
    for post in posts {
        println!("- {}", post);
    }
}
```

### Ví Dụ 2: Concurrent API Calls

```rust
use tokio::time::{sleep, Duration};

async fn fetch_user(id: u32) -> String {
    sleep(Duration::from_secs(1)).await;
    format!("User {}", id)
}

#[tokio::main]
async fn main() {
    let start = std::time::Instant::now();

    // Fetch 3 users concurrently
    let (u1, u2, u3) = tokio::join!(
        fetch_user(1),
        fetch_user(2),
        fetch_user(3)
    );

    println!("Users: {}, {}, {}", u1, u2, u3);
    println!("Time: {:?}", start.elapsed());  // ~1 second instead of 3!
}
```

### Ví Dụ 3: Timeout Pattern

```rust
use tokio::time::{sleep, timeout, Duration};

async fn slow_operation() -> String {
    sleep(Duration::from_secs(5)).await;
    String::from("Done")
}

#[tokio::main]
async fn main() {
    match timeout(Duration::from_secs(2), slow_operation()).await {
        Ok(result) => println!("Result: {}", result),
        Err(_) => println!("Operation timed out!"),
    }
}
```

### Ví Dụ 4: Select - Race Multiple Futures

```rust
use tokio::time::{sleep, Duration};

async fn task1() -> &'static str {
    sleep(Duration::from_secs(1)).await;
    "Task 1"
}

async fn task2() -> &'static str {
    sleep(Duration::from_secs(2)).await;
    "Task 2"
}

#[tokio::main]
async fn main() {
    tokio::select! {
        result = task1() => {
            println!("Task 1 finished first: {}", result);
        }
        result = task2() => {
            println!("Task 2 finished first: {}", result);
        }
    }
}
```

### Ví Dụ 5: Process Items Concurrently

```rust
use tokio::time::{sleep, Duration};

async fn process_item(id: u32) -> u32 {
    sleep(Duration::from_millis(100)).await;
    id * 2
}

#[tokio::main]
async fn main() {
    let items = vec![1, 2, 3, 4, 5];

    let tasks: Vec<_> = items
        .into_iter()
        .map(|id| tokio::spawn(async move { process_item(id).await }))
        .collect();

    let results: Vec<_> = futures::future::join_all(tasks)
        .await
        .into_iter()
        .map(|r| r.unwrap())
        .collect();

    println!("Results: {:?}", results);
}
```

### Ví Dụ 6: Async Channels

```rust
use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(32);

    tokio::spawn(async move {
        for i in 0..5 {
            tx.send(i).await.unwrap();
        }
    });

    while let Some(value) = rx.recv().await {
        println!("Received: {}", value);
    }
}
```

## 📊 Futures

### Future Trait

```rust
// Simplified Future trait
trait Future {
    type Output;

    fn poll(self: Pin<&mut Self>, cx: &mut Context) -> Poll<Self::Output>;
}

enum Poll<T> {
    Ready(T),
    Pending,
}
```

### Async Function Returns Future

```rust
async fn example() -> i32 {
    42
}

// Roughly equivalent to:
fn example() -> impl Future<Output = i32> {
    async { 42 }
}
```

### Futures Are Lazy

```rust
async fn lazy_task() {
    println!("This won't print!");
}

#[tokio::main]
async fn main() {
    let future = lazy_task();  // Future created but NOT executed

    // future.await;  // Only executes when awaited
}
```

## 🆚 Async vs Threads

### Comparison

```rust
use std::thread;
use tokio::time::{sleep, Duration};

// Threads - OS threads, heavy
fn with_threads() {
    let mut handles = vec![];

    for i in 0..1000 {
        let handle = thread::spawn(move || {
            thread::sleep(std::time::Duration::from_millis(10));
            i
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}

// Async - lightweight tasks
#[tokio::main]
async fn with_async() {
    let mut handles = vec![];

    for i in 0..1000 {
        let handle = tokio::spawn(async move {
            sleep(Duration::from_millis(10)).await;
            i
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.await.unwrap();
    }
}
```

| Feature | Threads | Async Tasks |
|---------|---------|-------------|
| **Weight** | Heavy (OS threads) | Lightweight |
| **Context switch** | Expensive | Cheap |
| **Số lượng** | Limited (~thousands) | Many (~millions) |
| **Use case** | CPU-bound | I/O-bound |
| **Overhead** | High | Low |

### When to Use Async

```rust
// ✅ Good for async: I/O-bound
async fn fetch_url(url: &str) -> String {
    // Waiting for network response
    // Async is perfect here!
}

// ❌ Bad for async: CPU-bound
fn compute_fibonacci(n: u64) -> u64 {
    // Pure computation
    // Use threads instead!
}
```

## 🎓 Blocking vs Non-blocking

### Blocking Code trong Async

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    tokio::spawn(async {
        // ❌ BAD: blocks entire runtime!
        std::thread::sleep(std::time::Duration::from_secs(10));
    });

    // This task will be blocked too!
    sleep(Duration::from_secs(1)).await;
    println!("This might not print for 10 seconds!");
}
```

### Using spawn_blocking

```rust
use tokio::task;

#[tokio::main]
async fn main() {
    let handle = task::spawn_blocking(|| {
        // ✅ GOOD: blocking work in thread pool
        std::thread::sleep(std::time::Duration::from_secs(5));
        42
    });

    let result = handle.await.unwrap();
    println!("Result: {}", result);
}
```

## 🔧 Async Runtime

### Tokio Runtime

```rust
// Using macro
#[tokio::main]
async fn main() {
    println!("Hello from Tokio!");
}

// Equivalent to:
fn main() {
    let rt = tokio::runtime::Runtime::new().unwrap();
    rt.block_on(async {
        println!("Hello from Tokio!");
    });
}
```

### Custom Runtime Configuration

```rust
use tokio::runtime::Runtime;

fn main() {
    let rt = Runtime::new().unwrap();

    rt.block_on(async {
        println!("Running async code");
    });
}
```

### Multi-threaded Runtime

```rust
#[tokio::main(flavor = "multi_thread", worker_threads = 4)]
async fn main() {
    // 4 worker threads
    println!("Multi-threaded runtime");
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Basic Async

```rust
use tokio::time::{sleep, Duration};

async fn greet(name: &str) -> String {
    // TODO: Sleep 1 second
    // TODO: Return greeting
}

#[tokio::main]
async fn main() {
    // TODO: Call greet và print result
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use tokio::time::{sleep, Duration};

async fn greet(name: &str) -> String {
    sleep(Duration::from_secs(1)).await;
    format!("Hello, {}!", name)
}

#[tokio::main]
async fn main() {
    let result = greet("Alice").await;
    println!("{}", result);
}
```
</details>

### Bài 2: Concurrent Tasks

```rust
use tokio::time::{sleep, Duration};

async fn task(id: u32, delay: u64) -> u32 {
    sleep(Duration::from_secs(delay)).await;
    id * 2
}

#[tokio::main]
async fn main() {
    // TODO: Run task(1, 2) và task(2, 1) concurrently với tokio::join!
    // TODO: Print results
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use tokio::time::{sleep, Duration};

async fn task(id: u32, delay: u64) -> u32 {
    sleep(Duration::from_secs(delay)).await;
    id * 2
}

#[tokio::main]
async fn main() {
    let (r1, r2) = tokio::join!(task(1, 2), task(2, 1));
    println!("Results: {}, {}", r1, r2);
}
```
</details>

### Bài 3: Spawn Tasks

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    // TODO: Spawn 5 tasks với tokio::spawn
    // Mỗi task sleep i * 100ms và return i
    // Collect và print results
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let mut handles = vec![];

    for i in 0..5 {
        let handle = tokio::spawn(async move {
            sleep(Duration::from_millis(i * 100)).await;
            i
        });
        handles.push(handle);
    }

    for handle in handles {
        let result = handle.await.unwrap();
        println!("Result: {}", result);
    }
}
```
</details>

## 🎯 Tóm Tắt

| Keyword | Mô Tả |
|---------|-------|
| **`async fn`** | Định nghĩa async function |
| **`.await`** | Chờ Future hoàn thành |
| **`tokio::spawn`** | Spawn async task |
| **`tokio::join!`** | Chạy futures concurrently |
| **`tokio::select!`** | Race multiple futures |
| **`timeout`** | Đặt timeout cho operation |

**Quy tắc vàng**:
- ✅ Async cho I/O-bound tasks
- ✅ Threads cho CPU-bound tasks
- ✅ Luôn `.await` async functions
- ✅ Futures are lazy - phải await để execute
- ✅ Dùng `spawn_blocking` cho blocking code
- ✅ `tokio::join!` để run concurrently
- ✅ Async tasks lightweight hơn threads nhiều

## 🔗 Liên Kết Hữu Ích

- [Async Book](https://rust-lang.github.io/async-book/)
- [Tokio Tutorial](https://tokio.rs/tokio/tutorial)
- [std::future](https://doc.rust-lang.org/std/future/)

---

**Bài tiếp theo**: [Tokio Runtime →](./async-tokio.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu chi tiết về **Tokio** - async runtime phổ biến nhất!
