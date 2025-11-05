---
sidebar_position: 26
title: "Message Passing: Channels"
description: "Tìm hiểu cách giao tiếp giữa threads với channels"
---

# 📬 Message Passing: Channels

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu message passing pattern
- ✅ Sử dụng channels (mpsc)
- ✅ Send và receive messages
- ✅ Multiple producers pattern
- ✅ Bounded vs unbounded channels
- ✅ Xử lý errors với channels

## 🤔 Message Passing Là Gì?

### Ẩn Dụ Cuộc Sống: Hệ Thống Bưu Điện

**Channels** giống như **hệ thống gửi thư**:

📮 **Hệ Thống Bưu Điện**:
- **Người gửi** bỏ thư vào hòm thư
- **Người nhận** lấy thư từ hòm thư
- Nhiều người có thể gửi
- Chỉ một người nhận
- Thư được xếp hàng

🦀 **Channels Trong Rust**:
- **Sender** gửi messages
- **Receiver** nhận messages
- Multiple producers, single consumer (mpsc)
- Thread-safe communication
- Không cần locks!

### Ví Dụ Cơ Bản

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        tx.send("Hello from thread!").unwrap();
    });

    let msg = rx.recv().unwrap();
    println!("Received: {}", msg);
}
```

## 📡 Creating Channels

### `mpsc::channel()`

```rust
use std::sync::mpsc;

fn main() {
    // Create channel
    let (tx, rx) = mpsc::channel();

    // tx: Sender (transmitter)
    // rx: Receiver

    tx.send(42).unwrap();

    let value = rx.recv().unwrap();
    println!("Received: {}", value);
}
```

### Channel với Different Types

```rust
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel::<String>();

    tx.send(String::from("Hello")).unwrap();

    println!("{}", rx.recv().unwrap());
}
```

## 📤 Sending Messages

### Basic Send

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let messages = vec![
            "message 1",
            "message 2",
            "message 3",
        ];

        for msg in messages {
            tx.send(msg).unwrap();
        }
    });

    for received in rx {
        println!("Got: {}", received);
    }
}
```

### Send Multiple Values

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        for i in 1..=5 {
            tx.send(i).unwrap();
            thread::sleep(Duration::from_millis(100));
        }
    });

    for received in rx {
        println!("Received: {}", received);
    }
}
```

### Send Error Handling

```rust
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    drop(rx);  // Receiver dropped

    match tx.send(42) {
        Ok(_) => println!("Sent successfully"),
        Err(e) => println!("Send failed: {}", e),
    }
}
```

## 📥 Receiving Messages

### `.recv()` - Blocking

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        thread::sleep(Duration::from_secs(2));
        tx.send("Hello").unwrap();
    });

    println!("Waiting for message...");
    let msg = rx.recv().unwrap();  // Blocks until message arrives
    println!("Received: {}", msg);
}
```

### `.try_recv()` - Non-blocking

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        thread::sleep(Duration::from_secs(1));
        tx.send("Hello").unwrap();
    });

    loop {
        match rx.try_recv() {
            Ok(msg) => {
                println!("Received: {}", msg);
                break;
            }
            Err(_) => {
                println!("No message yet...");
                thread::sleep(Duration::from_millis(200));
            }
        }
    }
}
```

### Iterate Over Receiver

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        for i in 1..=5 {
            tx.send(i).unwrap();
        }
        // tx dropped here, channel closes
    });

    // Iterate until channel closes
    for received in rx {
        println!("Got: {}", received);
    }

    println!("Channel closed");
}
```

## 👥 Multiple Producers

### Clone Sender

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    let tx1 = tx.clone();
    let tx2 = tx.clone();

    thread::spawn(move || {
        tx1.send("from thread 1").unwrap();
    });

    thread::spawn(move || {
        tx2.send("from thread 2").unwrap();
    });

    drop(tx);  // Drop original sender

    for msg in rx {
        println!("Received: {}", msg);
    }
}
```

### Multiple Workers

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    for i in 0..3 {
        let tx = tx.clone();

        thread::spawn(move || {
            thread::sleep(Duration::from_millis(100 * i));
            tx.send(format!("Worker {} done", i)).unwrap();
        });
    }

    drop(tx);  // Drop original

    for msg in rx {
        println!("{}", msg);
    }
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Task Queue

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

enum Task {
    Process(i32),
    Quit,
}

fn worker(id: usize, rx: mpsc::Receiver<Task>) {
    loop {
        match rx.recv() {
            Ok(Task::Process(value)) => {
                println!("Worker {} processing {}", id, value);
                thread::sleep(Duration::from_millis(100));
            }
            Ok(Task::Quit) => {
                println!("Worker {} quitting", id);
                break;
            }
            Err(_) => {
                println!("Worker {} channel closed", id);
                break;
            }
        }
    }
}

fn main() {
    let (tx, rx) = mpsc::channel();

    let handle = thread::spawn(move || worker(1, rx));

    for i in 1..=5 {
        tx.send(Task::Process(i)).unwrap();
    }

    tx.send(Task::Quit).unwrap();

    handle.join().unwrap();
}
```

### Ví Dụ 2: Producer-Consumer

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn producer(tx: mpsc::Sender<i32>) {
    for i in 1..=10 {
        println!("Producing: {}", i);
        tx.send(i).unwrap();
        thread::sleep(Duration::from_millis(50));
    }
}

fn consumer(rx: mpsc::Receiver<i32>) {
    for value in rx {
        println!("  Consuming: {}", value);
        thread::sleep(Duration::from_millis(100));
    }
}

fn main() {
    let (tx, rx) = mpsc::channel();

    let producer_handle = thread::spawn(move || producer(tx));
    let consumer_handle = thread::spawn(move || consumer(rx));

    producer_handle.join().unwrap();
    consumer_handle.join().unwrap();
}
```

### Ví Dụ 3: Result Collector

```rust
use std::sync::mpsc;
use std::thread;

fn compute(id: usize, value: i32) -> i32 {
    println!("Computing {} * {}", id, value);
    id as i32 * value
}

fn main() {
    let (tx, rx) = mpsc::channel();

    let values = vec![10, 20, 30, 40, 50];

    for (id, value) in values.into_iter().enumerate() {
        let tx = tx.clone();

        thread::spawn(move || {
            let result = compute(id, value);
            tx.send((id, result)).unwrap();
        });
    }

    drop(tx);

    let mut results: Vec<_> = rx.iter().collect();
    results.sort_by_key(|(id, _)| *id);

    for (id, result) in results {
        println!("Result {}: {}", id, result);
    }
}
```

### Ví Dụ 4: Pipeline Pattern

```rust
use std::sync::mpsc;
use std::thread;

fn stage1(input: Vec<i32>) -> mpsc::Receiver<i32> {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        for num in input {
            tx.send(num * 2).unwrap();
        }
    });

    rx
}

fn stage2(rx: mpsc::Receiver<i32>) -> mpsc::Receiver<i32> {
    let (tx, rx_out) = mpsc::channel();

    thread::spawn(move || {
        for num in rx {
            tx.send(num + 10).unwrap();
        }
    });

    rx_out
}

fn stage3(rx: mpsc::Receiver<i32>) -> Vec<i32> {
    rx.iter().filter(|&x| x > 20).collect()
}

fn main() {
    let input = vec![1, 2, 3, 4, 5];

    let rx1 = stage1(input);
    let rx2 = stage2(rx1);
    let results = stage3(rx2);

    println!("Results: {:?}", results);
}
```

### Ví Dụ 5: Request-Response Pattern

```rust
use std::sync::mpsc;
use std::thread;

enum Request {
    Get(String, mpsc::Sender<String>),
    Set(String, String),
    Quit,
}

fn database_server(rx: mpsc::Receiver<Request>) {
    use std::collections::HashMap;

    let mut db = HashMap::new();

    for request in rx {
        match request {
            Request::Get(key, response_tx) => {
                let value = db.get(&key)
                    .cloned()
                    .unwrap_or_else(|| "Not found".to_string());
                response_tx.send(value).unwrap();
            }
            Request::Set(key, value) => {
                db.insert(key, value);
            }
            Request::Quit => {
                println!("Database shutting down");
                break;
            }
        }
    }
}

fn main() {
    let (tx, rx) = mpsc::channel();

    let server_handle = thread::spawn(move || database_server(rx));

    // Set values
    tx.send(Request::Set("name".to_string(), "Alice".to_string())).unwrap();
    tx.send(Request::Set("age".to_string(), "30".to_string())).unwrap();

    // Get values
    let (response_tx, response_rx) = mpsc::channel();
    tx.send(Request::Get("name".to_string(), response_tx.clone())).unwrap();
    println!("Name: {}", response_rx.recv().unwrap());

    tx.send(Request::Get("age".to_string(), response_tx)).unwrap();
    println!("Age: {}", response_rx.recv().unwrap());

    tx.send(Request::Quit).unwrap();

    server_handle.join().unwrap();
}
```

### Ví Dụ 6: Fan-Out Pattern

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    // Distributor
    let handles: Vec<_> = (0..3)
        .map(|i| {
            let rx_clone = rx.clone();  // ❌ Can't clone receiver!
            // This won't work - receivers can't be cloned
        });

    // Correct approach: use separate channels
    let (tx, rx) = mpsc::channel();

    let workers: Vec<_> = (0..3)
        .map(|i| {
            let (worker_tx, worker_rx) = mpsc::channel();

            let handle = thread::spawn(move || {
                for value in worker_rx {
                    println!("Worker {} got: {}", i, value);
                }
            });

            (worker_tx, handle)
        })
        .collect();

    // Distribute work
    for i in 0..9 {
        let worker_id = i % 3;
        workers[worker_id].0.send(i).unwrap();
    }

    // Drop senders to close channels
    drop(workers);
}
```

## 🔒 Sync Channel (Bounded)

### Creating Sync Channel

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::sync_channel(2);  // Buffer size = 2

    let producer = thread::spawn(move || {
        for i in 1..=5 {
            println!("Sending: {}", i);
            tx.send(i).unwrap();  // Blocks when buffer full
            println!("Sent: {}", i);
        }
    });

    thread::sleep(Duration::from_secs(2));

    for value in rx {
        println!("Received: {}", value);
        thread::sleep(Duration::from_millis(500));
    }

    producer.join().unwrap();
}
```

### Bounded vs Unbounded

```rust
use std::sync::mpsc;

fn main() {
    // Unbounded - unlimited buffer
    let (tx_unbounded, rx_unbounded) = mpsc::channel();

    // Bounded - limited buffer
    let (tx_bounded, rx_bounded) = mpsc::sync_channel(5);

    // Unbounded never blocks sender
    for i in 0..1000 {
        tx_unbounded.send(i).unwrap();  // Never blocks
    }

    // Bounded blocks when full
    // for i in 0..10 {
    //     tx_bounded.send(i).unwrap();  // Blocks after 5
    // }
}
```

## ⚠️ Error Handling

### Send Errors

```rust
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    drop(rx);  // Close receiver

    match tx.send(42) {
        Ok(_) => println!("Sent"),
        Err(e) => println!("Failed to send: {:?}", e),
    }
}
```

### Recv Errors

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel::<i32>();

    thread::spawn(move || {
        drop(tx);  // Close sender immediately
    })
    .join()
    .unwrap();

    match rx.recv() {
        Ok(value) => println!("Received: {}", value),
        Err(_) => println!("Channel closed"),
    }
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Basic Channel

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    // TODO: Tạo channel
    // TODO: Spawn thread gửi "Hello"
    // TODO: Receive và print message
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        tx.send("Hello").unwrap();
    });

    let msg = rx.recv().unwrap();
    println!("Received: {}", msg);
}
```
</details>

### Bài 2: Multiple Messages

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    // TODO: Spawn thread gửi numbers 1 to 5
    // TODO: Receive và print tất cả
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        for i in 1..=5 {
            tx.send(i).unwrap();
        }
    });

    for received in rx {
        println!("Got: {}", received);
    }
}
```
</details>

### Bài 3: Multiple Producers

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    // TODO: Tạo 3 threads, mỗi thread gửi 1 message
    // TODO: Receive tất cả messages
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    for i in 0..3 {
        let tx = tx.clone();

        thread::spawn(move || {
            tx.send(format!("Thread {}", i)).unwrap();
        });
    }

    drop(tx);

    for msg in rx {
        println!("Received: {}", msg);
    }
}
```
</details>

## 🎯 Tóm Tắt

| Method | Mô Tả | Blocking |
|--------|-------|----------|
| **`mpsc::channel()`** | Tạo unbounded channel | N/A |
| **`mpsc::sync_channel(n)`** | Tạo bounded channel | N/A |
| **`.send(value)`** | Gửi message | Bounded only |
| **`.recv()`** | Nhận message | ✅ Yes |
| **`.try_recv()`** | Try nhận message | ❌ No |

**Quy tắc vàng**:
- ✅ Channels là cách an toàn để giao tiếp giữa threads
- ✅ mpsc = Multiple Producer, Single Consumer
- ✅ Clone sender để có multiple producers
- ✅ Receiver không thể clone
- ✅ Drop tất cả senders để close channel
- ✅ Bounded channels block khi full
- ✅ Unbounded channels không bao giờ block

## 🔗 Liên Kết Hữu Ích

- [std::sync::mpsc](https://doc.rust-lang.org/std/sync/mpsc/)
- [Message Passing](https://doc.rust-lang.org/book/ch16-02-message-passing.html)

---

**Bài tiếp theo**: [Shared State: Mutex →](./shared-state.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Mutex và RwLock** - shared state concurrency!
