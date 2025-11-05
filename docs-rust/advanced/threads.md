---
sidebar_position: 25
title: "Threads: Lập Trình Đa Nhiệm"
description: "Tìm hiểu cách sử dụng threads để chạy đa nhiệm trong Rust"
---

# 🧵 Threads: Lập Trình Đa Nhiệm

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu threads và concurrency
- ✅ Tạo threads với `thread::spawn`
- ✅ Join threads và nhận kết quả
- ✅ Sử dụng move closures
- ✅ Hiểu thread safety trong Rust
- ✅ Tránh data races

## 🤔 Threads Là Gì?

### Ẩn Dụ Cuộc Sống: Nhà Hàng Đa Nhiệm

**Threads** giống như **đội ngũ nhân viên nhà hàng**:

🍽️ **Nhà Hàng Single-Thread**:
- **1 nhân viên** làm mọi việc
- Nhận order → Nấu → Phục vụ → Lặp lại
- Chậm khi đông khách

👥 **Nhà Hàng Multi-Thread**:
- **Nhiều nhân viên** cùng làm việc
- Phục vụ nhiều bàn đồng thời
- Nhanh hơn, hiệu quả hơn
- Cần phối hợp tốt

🦀 **Threads Trong Rust**:
- **Concurrent execution** - chạy song song
- Mỗi thread có call stack riêng
- Share memory an toàn
- Ownership rules ngăn data races

### Ví Dụ Cơ Bản

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("Thread: {}", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("Main: {}", i);
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap();
}
```

## 🚀 Creating Threads

### `thread::spawn`

```rust
use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        println!("Hello from spawned thread!");
    });

    println!("Hello from main thread!");

    handle.join().unwrap();
}
```

### Multiple Threads

```rust
use std::thread;

fn main() {
    let mut handles = vec![];

    for i in 0..5 {
        let handle = thread::spawn(move || {
            println!("Thread {} started", i);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

### Thread với Function

```rust
use std::thread;

fn worker(id: i32) {
    println!("Worker {} is running", id);
}

fn main() {
    let handle = thread::spawn(|| worker(1));

    handle.join().unwrap();
}
```

## 🔗 Joining Threads

### `.join()` - Đợi Thread Hoàn Thành

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        thread::sleep(Duration::from_secs(2));
        println!("Thread finished!");
        42
    });

    println!("Waiting for thread...");

    let result = handle.join().unwrap();
    println!("Thread returned: {}", result);
}
```

### Join Multiple Threads

```rust
use std::thread;

fn main() {
    let handles: Vec<_> = (0..3)
        .map(|i| {
            thread::spawn(move || {
                println!("Thread {}", i);
                i * 2
            })
        })
        .collect();

    let results: Vec<_> = handles
        .into_iter()
        .map(|h| h.join().unwrap())
        .collect();

    println!("Results: {:?}", results);
}
```

### Join Error Handling

```rust
use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        panic!("Thread panicked!");
    });

    match handle.join() {
        Ok(_) => println!("Thread completed successfully"),
        Err(e) => println!("Thread panicked: {:?}", e),
    }
}
```

## 📦 Move Closures

### Move Ownership to Thread

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("Vector: {:?}", v);
    });

    // v không dùng được nữa - đã move
    // println!("{:?}", v); // ERROR!

    handle.join().unwrap();
}
```

### Without Move - Error

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    // ❌ COMPILE ERROR!
    // let handle = thread::spawn(|| {
    //     println!("Vector: {:?}", v);
    // });
    // Closure may outlive the current function
}
```

### Multiple Values

```rust
use std::thread;

fn main() {
    let x = 10;
    let s = String::from("hello");

    let handle = thread::spawn(move || {
        println!("{} {}", x, s);
    });

    // x và s đã move
    // println!("{} {}", x, s); // ERROR!

    handle.join().unwrap();
}
```

## 🔒 Thread Safety với Arc

### Share Data với Arc

```rust
use std::sync::Arc;
use std::thread;

fn main() {
    let data = Arc::new(vec![1, 2, 3, 4, 5]);

    let mut handles = vec![];

    for i in 0..3 {
        let data = Arc::clone(&data);

        let handle = thread::spawn(move || {
            let sum: i32 = data.iter().sum();
            println!("Thread {}: sum = {}", i, sum);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

### Arc với Complex Data

```rust
use std::sync::Arc;
use std::thread;

#[derive(Debug)]
struct Config {
    name: String,
    value: i32,
}

fn main() {
    let config = Arc::new(Config {
        name: String::from("AppConfig"),
        value: 42,
    });

    let mut handles = vec![];

    for i in 0..3 {
        let config = Arc::clone(&config);

        let handle = thread::spawn(move || {
            println!("Thread {}: {:?}", i, config);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

## ⏱️ Thread Sleep và Yield

### `thread::sleep`

```rust
use std::thread;
use std::time::Duration;

fn main() {
    println!("Starting...");

    thread::sleep(Duration::from_secs(2));

    println!("2 seconds later...");
}
```

### `thread::yield_now`

```rust
use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        for i in 0..5 {
            println!("Thread: {}", i);
            thread::yield_now();  // Cho phép threads khác chạy
        }
    });

    for i in 0..5 {
        println!("Main: {}", i);
        thread::yield_now();
    }

    handle.join().unwrap();
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Parallel Computation

```rust
use std::thread;

fn compute_sum(start: i32, end: i32) -> i32 {
    (start..=end).sum()
}

fn main() {
    let handle1 = thread::spawn(|| compute_sum(1, 1000));
    let handle2 = thread::spawn(|| compute_sum(1001, 2000));
    let handle3 = thread::spawn(|| compute_sum(2001, 3000));

    let sum1 = handle1.join().unwrap();
    let sum2 = handle2.join().unwrap();
    let sum3 = handle3.join().unwrap();

    let total = sum1 + sum2 + sum3;

    println!("Total: {}", total);
}
```

### Ví Dụ 2: Concurrent File Processing

```rust
use std::thread;
use std::sync::Arc;

fn process_data(id: usize, data: &[i32]) -> i32 {
    println!("Worker {} processing {} items", id, data.len());
    data.iter().sum()
}

fn main() {
    let data = Arc::new(vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    let chunk_size = 3;
    let mut handles = vec![];

    for (i, chunk_start) in (0..data.len()).step_by(chunk_size).enumerate() {
        let data = Arc::clone(&data);

        let handle = thread::spawn(move || {
            let chunk_end = (chunk_start + chunk_size).min(data.len());
            let chunk = &data[chunk_start..chunk_end];
            process_data(i, chunk)
        });

        handles.push(handle);
    }

    let results: Vec<_> = handles
        .into_iter()
        .map(|h| h.join().unwrap())
        .collect();

    println!("Results: {:?}", results);
    println!("Total: {}", results.iter().sum::<i32>());
}
```

### Ví Dụ 3: Worker Pool Pattern

```rust
use std::thread;
use std::time::Duration;

struct Worker {
    id: usize,
}

impl Worker {
    fn new(id: usize) -> Self {
        Worker { id }
    }

    fn work(&self, task: i32) {
        println!("Worker {} started task {}", self.id, task);
        thread::sleep(Duration::from_millis(100));
        println!("Worker {} finished task {}", self.id, task);
    }
}

fn main() {
    let tasks = vec![1, 2, 3, 4, 5];
    let mut handles = vec![];

    for (i, task) in tasks.into_iter().enumerate() {
        let handle = thread::spawn(move || {
            let worker = Worker::new(i);
            worker.work(task);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("All tasks completed!");
}
```

### Ví Dụ 4: Progress Tracking

```rust
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

fn main() {
    let progress = Arc::new(Mutex::new(0));
    let total_tasks = 10;

    let mut handles = vec![];

    for i in 0..total_tasks {
        let progress = Arc::clone(&progress);

        let handle = thread::spawn(move || {
            thread::sleep(Duration::from_millis(100 * (i + 1)));

            let mut p = progress.lock().unwrap();
            *p += 1;
            println!("Task {} completed. Progress: {}/{}", i, *p, total_tasks);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("All tasks completed!");
}
```

### Ví Dụ 5: Timeout Pattern

```rust
use std::thread;
use std::time::Duration;

fn long_running_task() -> String {
    thread::sleep(Duration::from_secs(3));
    String::from("Task completed")
}

fn main() {
    let handle = thread::spawn(long_running_task);

    // Simulate timeout
    thread::sleep(Duration::from_secs(1));

    if !handle.is_finished() {
        println!("Task is still running...");
    }

    let result = handle.join().unwrap();
    println!("{}", result);
}
```

### Ví Dụ 6: Map-Reduce Pattern

```rust
use std::thread;

fn map_phase(data: Vec<i32>) -> Vec<i32> {
    data.into_iter().map(|x| x * x).collect()
}

fn reduce_phase(data: Vec<i32>) -> i32 {
    data.into_iter().sum()
}

fn main() {
    let datasets = vec![
        vec![1, 2, 3],
        vec![4, 5, 6],
        vec![7, 8, 9],
    ];

    // Map phase - parallel
    let map_handles: Vec<_> = datasets
        .into_iter()
        .map(|data| thread::spawn(move || map_phase(data)))
        .collect();

    let mapped_results: Vec<_> = map_handles
        .into_iter()
        .map(|h| h.join().unwrap())
        .collect();

    println!("Mapped: {:?}", mapped_results);

    // Reduce phase - parallel
    let reduce_handles: Vec<_> = mapped_results
        .into_iter()
        .map(|data| thread::spawn(move || reduce_phase(data)))
        .collect();

    let reduced_results: Vec<_> = reduce_handles
        .into_iter()
        .map(|h| h.join().unwrap())
        .collect();

    println!("Reduced: {:?}", reduced_results);

    let final_result: i32 = reduced_results.iter().sum();
    println!("Final: {}", final_result);
}
```

## 🛡️ Thread Safety trong Rust

### Rust Ngăn Data Races

```rust
use std::thread;

fn main() {
    let mut data = vec![1, 2, 3];

    // ❌ COMPILE ERROR!
    // thread::spawn(|| {
    //     data.push(4);  // Mutable access from thread
    // });

    // data.push(5);  // Mutable access from main

    // Rust compiler prevents this at compile time!
}
```

### Send và Sync Traits

```rust
use std::thread;
use std::rc::Rc;

fn main() {
    let data = vec![1, 2, 3];

    // ✅ Vec implements Send
    thread::spawn(move || {
        println!("{:?}", data);
    });

    // ❌ Rc does NOT implement Send
    let rc_data = Rc::new(vec![1, 2, 3]);
    // thread::spawn(move || {
    //     println!("{:?}", rc_data);  // ERROR!
    // });
}
```

**Send trait**: Type có thể move giữa threads
**Sync trait**: Type có thể share references giữa threads

## 🎓 Thread Naming và Builder

### Named Threads

```rust
use std::thread;

fn main() {
    let handle = thread::Builder::new()
        .name("worker-1".to_string())
        .spawn(|| {
            println!("Thread name: {:?}", thread::current().name());
        })
        .unwrap();

    handle.join().unwrap();
}
```

### Thread với Stack Size

```rust
use std::thread;

fn main() {
    let handle = thread::Builder::new()
        .name("custom".to_string())
        .stack_size(4 * 1024 * 1024)  // 4 MB
        .spawn(|| {
            println!("Custom thread running");
        })
        .unwrap();

    handle.join().unwrap();
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Simple Thread

```rust
use std::thread;

fn main() {
    // TODO: Spawn thread print "Hello from thread!"
    // TODO: Print "Hello from main!" từ main thread
    // TODO: Join thread
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        println!("Hello from thread!");
    });

    println!("Hello from main!");

    handle.join().unwrap();
}
```
</details>

### Bài 2: Parallel Sum

```rust
use std::thread;

fn main() {
    // TODO: Tạo 3 threads
    // Thread 1: sum 1..=100
    // Thread 2: sum 101..=200
    // Thread 3: sum 201..=300
    // TODO: Tính tổng của 3 results
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::thread;

fn main() {
    let h1 = thread::spawn(|| (1..=100).sum::<i32>());
    let h2 = thread::spawn(|| (101..=200).sum::<i32>());
    let h3 = thread::spawn(|| (201..=300).sum::<i32>());

    let total = h1.join().unwrap() + h2.join().unwrap() + h3.join().unwrap();

    println!("Total: {}", total);
}
```
</details>

### Bài 3: Share Data với Arc

```rust
use std::sync::Arc;
use std::thread;

fn main() {
    let numbers = Arc::new(vec![1, 2, 3, 4, 5]);

    // TODO: Tạo 3 threads
    // Mỗi thread in ra numbers
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::sync::Arc;
use std::thread;

fn main() {
    let numbers = Arc::new(vec![1, 2, 3, 4, 5]);

    let mut handles = vec![];

    for i in 0..3 {
        let numbers = Arc::clone(&numbers);

        let handle = thread::spawn(move || {
            println!("Thread {}: {:?}", i, numbers);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```
</details>

## 🎯 Tóm Tắt

| Function | Mô Tả |
|----------|-------|
| **`thread::spawn(f)`** | Tạo thread mới |
| **`.join()`** | Đợi thread hoàn thành |
| **`thread::sleep(d)`** | Thread ngủ một khoảng thời gian |
| **`thread::yield_now()`** | Cho phép threads khác chạy |
| **`thread::current()`** | Lấy handle của thread hiện tại |

**Quy tắc vàng**:
- ✅ Dùng `move` để transfer ownership vào thread
- ✅ Dùng Arc để share immutable data
- ✅ Always join threads để nhận kết quả
- ✅ Rust compiler ngăn data races tại compile time
- ✅ Send trait cho types có thể move giữa threads
- ✅ Sync trait cho types có thể share giữa threads

## 🔗 Liên Kết Hữu Ích

- [std::thread](https://doc.rust-lang.org/std/thread/)
- [Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html)

---

**Bài tiếp theo**: [Message Passing →](./message-passing.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Message Passing** - giao tiếp giữa threads với channels!
