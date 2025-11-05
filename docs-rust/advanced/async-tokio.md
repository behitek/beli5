---
sidebar_position: 29
title: "Tokio: Async Runtime"
description: "Tìm hiểu Tokio - async runtime phổ biến nhất cho Rust"
---

# 🚀 Tokio: Async Runtime Phổ Biến

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Setup Tokio trong project
- ✅ Sử dụng `#[tokio::main]`
- ✅ Tokio tasks và spawning
- ✅ Async I/O với Tokio
- ✅ Timers và intervals
- ✅ Synchronization primitives

## 🤔 Tokio Là Gì?

**Tokio** là **async runtime** phổ biến nhất cho Rust:

🎭 **Async Runtime**:
- Scheduler để chạy async tasks
- I/O event loop
- Timers và utilities
- Multi-threaded work stealing

🦀 **Tokio Features**:
- Fast và reliable
- Nhiều utilities built-in
- Production-ready
- Được nhiều companies sử dụng

## 📦 Setup Tokio

### Cargo.toml

```toml
[dependencies]
tokio = { version = "1", features = ["full"] }
```

### Features Phổ Biến

```toml
# Full - tất cả features
tokio = { version = "1", features = ["full"] }

# Minimal - chỉ runtime
tokio = { version = "1", features = ["rt"] }

# Với macros và time
tokio = { version = "1", features = ["macros", "time"] }

# Multi-threaded runtime
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
```

## 🎯 #[tokio::main]

### Basic Usage

```rust
#[tokio::main]
async fn main() {
    println!("Hello from Tokio!");
}
```

### Flavor Options

```rust
// Single-threaded (default cho async fn main)
#[tokio::main(flavor = "current_thread")]
async fn main() {
    println!("Single-threaded runtime");
}

// Multi-threaded
#[tokio::main(flavor = "multi_thread", worker_threads = 4)]
async fn main() {
    println!("Multi-threaded with 4 workers");
}
```

### Manual Runtime

```rust
use tokio::runtime::Runtime;

fn main() {
    let rt = Runtime::new().unwrap();

    rt.block_on(async {
        println!("Running async code");
    });
}
```

## 🧵 Tokio Tasks

### tokio::spawn

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let handle = tokio::spawn(async {
        sleep(Duration::from_secs(1)).await;
        println!("Task completed!");
        42
    });

    let result = handle.await.unwrap();
    println!("Result: {}", result);
}
```

### Multiple Tasks

```rust
use tokio::time::{sleep, Duration};

async fn worker(id: u32, delay: u64) -> String {
    sleep(Duration::from_millis(delay)).await;
    format!("Worker {} done", id)
}

#[tokio::main]
async fn main() {
    let handles: Vec<_> = (0..5)
        .map(|i| tokio::spawn(worker(i, i * 100)))
        .collect();

    for handle in handles {
        let result = handle.await.unwrap();
        println!("{}", result);
    }
}
```

### Task Cancellation

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let handle = tokio::spawn(async {
        loop {
            println!("Working...");
            sleep(Duration::from_secs(1)).await;
        }
    });

    sleep(Duration::from_secs(3)).await;

    handle.abort();
    println!("Task aborted");
}
```

## ⏱️ Time và Timers

### tokio::time::sleep

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    println!("Start");
    sleep(Duration::from_secs(2)).await;
    println!("2 seconds later");
}
```

### tokio::time::interval

```rust
use tokio::time::{interval, Duration};

#[tokio::main]
async fn main() {
    let mut interval = interval(Duration::from_secs(1));

    for i in 0..5 {
        interval.tick().await;
        println!("Tick {}", i);
    }
}
```

### timeout

```rust
use tokio::time::{sleep, timeout, Duration};

async fn slow_task() -> String {
    sleep(Duration::from_secs(5)).await;
    String::from("Done")
}

#[tokio::main]
async fn main() {
    match timeout(Duration::from_secs(2), slow_task()).await {
        Ok(result) => println!("Result: {}", result),
        Err(_) => println!("Timeout!"),
    }
}
```

### Instant và elapsed

```rust
use tokio::time::Instant;

#[tokio::main]
async fn main() {
    let start = Instant::now();

    // Do some async work
    tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;

    println!("Elapsed: {:?}", start.elapsed());
}
```

## 📡 Async I/O

### Reading Files

```rust
use tokio::fs::File;
use tokio::io::AsyncReadExt;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let mut file = File::open("example.txt").await?;

    let mut contents = String::new();
    file.read_to_string(&mut contents).await?;

    println!("File contents: {}", contents);

    Ok(())
}
```

### Writing Files

```rust
use tokio::fs::File;
use tokio::io::AsyncWriteExt;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let mut file = File::create("output.txt").await?;

    file.write_all(b"Hello, Tokio!").await?;

    println!("File written");

    Ok(())
}
```

### Copy Files

```rust
use tokio::fs;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    fs::copy("source.txt", "destination.txt").await?;

    println!("File copied");

    Ok(())
}
```

## 🔀 Synchronization

### tokio::sync::Mutex

```rust
use tokio::sync::Mutex;
use std::sync::Arc;

#[tokio::main]
async fn main() {
    let counter = Arc::new(Mutex::new(0));

    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);

        let handle = tokio::spawn(async move {
            let mut num = counter.lock().await;
            *num += 1;
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.await.unwrap();
    }

    println!("Counter: {}", *counter.lock().await);
}
```

### tokio::sync::RwLock

```rust
use tokio::sync::RwLock;
use std::sync::Arc;

#[tokio::main]
async fn main() {
    let data = Arc::new(RwLock::new(vec![1, 2, 3]));

    // Multiple readers
    let data1 = Arc::clone(&data);
    let reader1 = tokio::spawn(async move {
        let r = data1.read().await;
        println!("Reader 1: {:?}", *r);
    });

    let data2 = Arc::clone(&data);
    let reader2 = tokio::spawn(async move {
        let r = data2.read().await;
        println!("Reader 2: {:?}", *r);
    });

    // Writer
    let data3 = Arc::clone(&data);
    let writer = tokio::spawn(async move {
        let mut w = data3.write().await;
        w.push(4);
    });

    reader1.await.unwrap();
    reader2.await.unwrap();
    writer.await.unwrap();

    println!("Final: {:?}", *data.read().await);
}
```

### tokio::sync::mpsc

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

### tokio::sync::oneshot

```rust
use tokio::sync::oneshot;

#[tokio::main]
async fn main() {
    let (tx, rx) = oneshot::channel();

    tokio::spawn(async move {
        tx.send("Hello from task!").unwrap();
    });

    let result = rx.await.unwrap();
    println!("Received: {}", result);
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: HTTP Server (Conceptual)

```rust
use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    println!("Server listening on port 8080");

    loop {
        let (mut socket, addr) = listener.accept().await?;
        println!("New connection from: {}", addr);

        tokio::spawn(async move {
            let mut buf = [0; 1024];

            loop {
                let n = match socket.read(&mut buf).await {
                    Ok(n) if n == 0 => return,
                    Ok(n) => n,
                    Err(_) => return,
                };

                if socket.write_all(&buf[0..n]).await.is_err() {
                    return;
                }
            }
        });
    }
}
```

### Ví Dụ 2: Parallel File Processing

```rust
use tokio::fs;

async fn process_file(path: &str) -> std::io::Result<usize> {
    let contents = fs::read_to_string(path).await?;
    Ok(contents.len())
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let files = vec!["file1.txt", "file2.txt", "file3.txt"];

    let tasks: Vec<_> = files
        .into_iter()
        .map(|file| tokio::spawn(async move {
            process_file(file).await
        }))
        .collect();

    for task in tasks {
        match task.await {
            Ok(Ok(size)) => println!("File size: {}", size),
            Ok(Err(e)) => println!("Error: {}", e),
            Err(e) => println!("Task error: {}", e),
        }
    }

    Ok(())
}
```

### Ví Dụ 3: Rate Limiter

```rust
use tokio::time::{interval, Duration};

struct RateLimiter {
    interval: tokio::time::Interval,
}

impl RateLimiter {
    fn new(rate_per_second: u64) -> Self {
        let duration = Duration::from_millis(1000 / rate_per_second);
        RateLimiter {
            interval: interval(duration),
        }
    }

    async fn acquire(&mut self) {
        self.interval.tick().await;
    }
}

#[tokio::main]
async fn main() {
    let mut limiter = RateLimiter::new(5); // 5 requests per second

    for i in 0..10 {
        limiter.acquire().await;
        println!("Request {} sent", i);
    }
}
```

### Ví Dụ 4: Worker Pool

```rust
use tokio::sync::mpsc;

async fn worker(id: u32, mut rx: mpsc::Receiver<u32>) {
    while let Some(job) = rx.recv().await {
        println!("Worker {} processing job {}", id, job);
        tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;
    }
}

#[tokio::main]
async fn main() {
    let (tx, rx) = mpsc::channel(32);

    // Spawn 3 workers sharing the receiver
    for i in 0..3 {
        let rx_clone = rx.clone();
        tokio::spawn(worker(i, rx_clone));
    }
    drop(rx); // Drop original

    // Send jobs
    for job in 0..10 {
        tx.send(job).await.unwrap();
    }

    drop(tx); // Close channel

    tokio::time::sleep(tokio::time::Duration::from_secs(2)).await;
}
```

Wait, receivers can't be cloned in mpsc. Let me fix this:

```rust
use tokio::sync::mpsc;
use std::sync::Arc;

async fn worker(id: u32, rx: Arc<tokio::sync::Mutex<mpsc::Receiver<u32>>>) {
    loop {
        let job = {
            let mut rx = rx.lock().await;
            rx.recv().await
        };

        match job {
            Some(job) => {
                println!("Worker {} processing job {}", id, job);
                tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;
            }
            None => break,
        }
    }
}

#[tokio::main]
async fn main() {
    let (tx, rx) = mpsc::channel(32);
    let rx = Arc::new(tokio::sync::Mutex::new(rx));

    // Spawn 3 workers
    let mut handles = vec![];
    for i in 0..3 {
        let rx = Arc::clone(&rx);
        handles.push(tokio::spawn(worker(i, rx)));
    }

    // Send jobs
    for job in 0..10 {
        tx.send(job).await.unwrap();
    }

    drop(tx); // Close channel

    for handle in handles {
        handle.await.unwrap();
    }
}
```

### Ví Dụ 5: Retry Pattern

```rust
use tokio::time::{sleep, Duration};

async fn unreliable_operation() -> Result<String, String> {
    // Simulate 50% failure rate
    if rand::random() {
        Ok(String::from("Success!"))
    } else {
        Err(String::from("Failed"))
    }
}

async fn retry<F, Fut, T>(mut f: F, max_attempts: u32) -> Result<T, String>
where
    F: FnMut() -> Fut,
    Fut: std::future::Future<Output = Result<T, String>>,
{
    for attempt in 1..=max_attempts {
        match f().await {
            Ok(result) => return Ok(result),
            Err(e) if attempt == max_attempts => return Err(e),
            Err(_) => {
                println!("Attempt {} failed, retrying...", attempt);
                sleep(Duration::from_secs(1)).await;
            }
        }
    }
    unreachable!()
}

#[tokio::main]
async fn main() {
    match retry(unreliable_operation, 5).await {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("All attempts failed: {}", e),
    }
}
```

### Ví Dụ 6: Fan-out / Fan-in

```rust
use tokio::sync::mpsc;

async fn producer(id: u32, tx: mpsc::Sender<(u32, String)>) {
    for i in 0..3 {
        let msg = format!("Producer {} - Message {}", id, i);
        tx.send((id, msg)).await.unwrap();
        tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;
    }
}

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(32);

    // Fan-out: spawn multiple producers
    for i in 0..3 {
        let tx = tx.clone();
        tokio::spawn(producer(i, tx));
    }
    drop(tx); // Drop original

    // Fan-in: collect all messages
    let mut messages = vec![];
    while let Some((id, msg)) = rx.recv().await {
        println!("Received from producer {}: {}", id, msg);
        messages.push((id, msg));
    }

    println!("Total messages: {}", messages.len());
}
```

## 🛡️ Error Handling

### Result Propagation

```rust
use tokio::fs;

async fn read_file(path: &str) -> std::io::Result<String> {
    let contents = fs::read_to_string(path).await?;
    Ok(contents)
}

#[tokio::main]
async fn main() {
    match read_file("example.txt").await {
        Ok(contents) => println!("Contents: {}", contents),
        Err(e) => eprintln!("Error: {}", e),
    }
}
```

### Join Error Handling

```rust
use tokio::task::JoinError;

async fn fallible_task(should_fail: bool) -> Result<i32, String> {
    if should_fail {
        Err(String::from("Task failed!"))
    } else {
        Ok(42)
    }
}

#[tokio::main]
async fn main() {
    let handle = tokio::spawn(fallible_task(false));

    match handle.await {
        Ok(Ok(value)) => println!("Success: {}", value),
        Ok(Err(e)) => println!("Task error: {}", e),
        Err(e) => println!("Join error: {}", e),
    }
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Basic Task

```rust
#[tokio::main]
async fn main() {
    // TODO: Spawn 3 tasks, mỗi task sleep i seconds và return i
    // TODO: Await tất cả và print results
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let handles: Vec<_> = (1..=3)
        .map(|i| {
            tokio::spawn(async move {
                sleep(Duration::from_secs(i)).await;
                i
            })
        })
        .collect();

    for handle in handles {
        let result = handle.await.unwrap();
        println!("Result: {}", result);
    }
}
```
</details>

### Bài 2: Interval Timer

```rust
use tokio::time::{interval, Duration};

#[tokio::main]
async fn main() {
    // TODO: Tạo interval 500ms
    // TODO: Print "Tick" 5 times
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use tokio::time::{interval, Duration};

#[tokio::main]
async fn main() {
    let mut interval = interval(Duration::from_millis(500));

    for _ in 0..5 {
        interval.tick().await;
        println!("Tick");
    }
}
```
</details>

### Bài 3: Channel Communication

```rust
use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    // TODO: Tạo channel
    // TODO: Spawn task gửi 5 messages
    // TODO: Receive và print messages
}
```

<details>
<summary>💡 Gợi ý</summary>

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
</details>

## 🎯 Tóm Tắt

| Module | Mô Tả |
|--------|-------|
| **`tokio::task`** | Task spawning và management |
| **`tokio::time`** | Timers, intervals, timeouts |
| **`tokio::sync`** | Async synchronization primitives |
| **`tokio::fs`** | Async file operations |
| **`tokio::net`** | Async networking |
| **`tokio::io`** | Async I/O traits |

**Quy tắc vàng**:
- ✅ Tokio cho production async Rust
- ✅ #[tokio::main] để setup runtime
- ✅ tokio::spawn cho concurrent tasks
- ✅ Dùng tokio::sync cho async synchronization
- ✅ interval cho periodic tasks
- ✅ timeout để tránh hang forever
- ✅ Multi-threaded runtime cho CPU-bound work

## 🔗 Liên Kết Hữu Ích

- [Tokio Docs](https://tokio.rs/)
- [Tokio Tutorial](https://tokio.rs/tokio/tutorial)
- [Tokio API Docs](https://docs.rs/tokio/)

---

**Bài tiếp theo**: [Unit Testing →](./unit-testing.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Testing** trong Rust!
