---
sidebar_position: 27
title: "Shared State: Mutex và RwLock"
description: "Tìm hiểu cách share mutable state giữa threads với Mutex và RwLock"
---

# 🔒 Shared State: Mutex và RwLock

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu shared mutable state
- ✅ Sử dụng `Mutex<T>` để lock data
- ✅ Kết hợp `Arc<Mutex<T>>`
- ✅ Sử dụng `RwLock<T>` cho multiple readers
- ✅ Tránh deadlocks
- ✅ So sánh Mutex vs RwLock vs Channels

## 🤔 Shared State Là Gì?

### Ẩn Dụ Cuộc Sống: Phòng Họp

**Mutex** giống như **phòng họp có khóa**:

🚪 **Phòng Họp**:
- **Chỉ 1 người** dùng tại một thời điểm
- Phải khóa cửa khi vào
- Người khác chờ bên ngoài
- Mở khóa khi ra

🔐 **Mutex Trong Rust**:
- **Mutual Exclusion** - loại trừ lẫn nhau
- Lock để truy cập data
- Chỉ một thread access tại một thời điểm
- Tự động unlock khi out of scope

### Ví Dụ Cơ Bản

```rust
use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        let mut num = m.lock().unwrap();
        *num = 6;
    }  // Lock released here

    println!("m = {:?}", m);
}
```

## 🔒 `Mutex<T>`

### Creating Mutex

```rust
use std::sync::Mutex;

fn main() {
    let mutex = Mutex::new(0);

    {
        let mut data = mutex.lock().unwrap();
        *data += 1;
        println!("Data: {}", data);
    }  // MutexGuard dropped, lock released

    println!("Mutex: {:?}", mutex);
}
```

### Lock và Unlock

```rust
use std::sync::Mutex;

fn main() {
    let counter = Mutex::new(0);

    // Lock
    let mut num = counter.lock().unwrap();
    *num += 1;

    // Unlock tự động khi num out of scope
    drop(num);

    // Can lock again
    let num2 = counter.lock().unwrap();
    println!("Counter: {}", num2);
}
```

## 🧵 `Arc<Mutex<T>>` Pattern

### Share Mutex Across Threads

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
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
}
```

### Multiple Threads Modifying Data

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let data = Arc::new(Mutex::new(vec![]));

    let mut handles = vec![];

    for i in 0..5 {
        let data = Arc::clone(&data);

        let handle = thread::spawn(move || {
            let mut v = data.lock().unwrap();
            v.push(i);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Data: {:?}", data.lock().unwrap());
}
```

## 📖 `RwLock<T>`

### Multiple Readers, Single Writer

```rust
use std::sync::RwLock;

fn main() {
    let lock = RwLock::new(5);

    // Multiple readers
    {
        let r1 = lock.read().unwrap();
        let r2 = lock.read().unwrap();
        println!("r1 = {}, r2 = {}", r1, r2);
    }

    // Single writer
    {
        let mut w = lock.write().unwrap();
        *w += 1;
    }

    println!("lock = {:?}", lock);
}
```

### RwLock với Threads

```rust
use std::sync::{Arc, RwLock};
use std::thread;

fn main() {
    let data = Arc::new(RwLock::new(0));

    let mut handles = vec![];

    // Writer threads
    for i in 0..3 {
        let data = Arc::clone(&data);

        let handle = thread::spawn(move || {
            let mut w = data.write().unwrap();
            *w += 1;
            println!("Writer {} incremented to {}", i, *w);
        });

        handles.push(handle);
    }

    // Reader threads
    for i in 0..5 {
        let data = Arc::clone(&data);

        let handle = thread::spawn(move || {
            let r = data.read().unwrap();
            println!("Reader {} read {}", i, *r);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

### When to Use RwLock

```rust
use std::sync::{Arc, RwLock};
use std::thread;

fn main() {
    let cache = Arc::new(RwLock::new(vec![1, 2, 3, 4, 5]));

    // Many readers - efficient!
    let readers: Vec<_> = (0..10)
        .map(|i| {
            let cache = Arc::clone(&cache);
            thread::spawn(move || {
                let data = cache.read().unwrap();
                println!("Reader {} sum: {}", i, data.iter().sum::<i32>());
            })
        })
        .collect();

    // Few writers
    let writer = {
        let cache = Arc::clone(&cache);
        thread::spawn(move || {
            let mut data = cache.write().unwrap();
            data.push(6);
        })
    };

    for r in readers {
        r.join().unwrap();
    }
    writer.join().unwrap();
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Shared Counter

```rust
use std::sync::{Arc, Mutex};
use std::thread;

struct Counter {
    count: Mutex<i32>,
}

impl Counter {
    fn new() -> Self {
        Counter {
            count: Mutex::new(0),
        }
    }

    fn increment(&self) {
        let mut count = self.count.lock().unwrap();
        *count += 1;
    }

    fn get(&self) -> i32 {
        *self.count.lock().unwrap()
    }
}

fn main() {
    let counter = Arc::new(Counter::new());

    let handles: Vec<_> = (0..10)
        .map(|_| {
            let counter = Arc::clone(&counter);
            thread::spawn(move || {
                for _ in 0..100 {
                    counter.increment();
                }
            })
        })
        .collect();

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", counter.get());
}
```

### Ví Dụ 2: Thread-Safe Cache

```rust
use std::collections::HashMap;
use std::sync::{Arc, RwLock};
use std::thread;

struct Cache {
    data: RwLock<HashMap<String, String>>,
}

impl Cache {
    fn new() -> Self {
        Cache {
            data: RwLock::new(HashMap::new()),
        }
    }

    fn get(&self, key: &str) -> Option<String> {
        let data = self.data.read().unwrap();
        data.get(key).cloned()
    }

    fn set(&self, key: String, value: String) {
        let mut data = self.data.write().unwrap();
        data.insert(key, value);
    }
}

fn main() {
    let cache = Arc::new(Cache::new());

    // Writer
    {
        let cache = Arc::clone(&cache);
        thread::spawn(move || {
            cache.set("key1".to_string(), "value1".to_string());
            cache.set("key2".to_string(), "value2".to_string());
        })
        .join()
        .unwrap();
    }

    // Readers
    let readers: Vec<_> = (0..5)
        .map(|i| {
            let cache = Arc::clone(&cache);
            thread::spawn(move || {
                if let Some(value) = cache.get("key1") {
                    println!("Reader {} got: {}", i, value);
                }
            })
        })
        .collect();

    for r in readers {
        r.join().unwrap();
    }
}
```

### Ví Dụ 3: Job Queue

```rust
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

struct JobQueue {
    jobs: Mutex<Vec<String>>,
}

impl JobQueue {
    fn new() -> Self {
        JobQueue {
            jobs: Mutex::new(vec![]),
        }
    }

    fn add_job(&self, job: String) {
        let mut jobs = self.jobs.lock().unwrap();
        jobs.push(job);
    }

    fn take_job(&self) -> Option<String> {
        let mut jobs = self.jobs.lock().unwrap();
        jobs.pop()
    }
}

fn worker(id: usize, queue: Arc<JobQueue>) {
    loop {
        if let Some(job) = queue.take_job() {
            println!("Worker {} processing: {}", id, job);
            thread::sleep(Duration::from_millis(100));
        } else {
            break;
        }
    }
}

fn main() {
    let queue = Arc::new(JobQueue::new());

    // Add jobs
    for i in 1..=10 {
        queue.add_job(format!("Job {}", i));
    }

    // Spawn workers
    let workers: Vec<_> = (0..3)
        .map(|i| {
            let queue = Arc::clone(&queue);
            thread::spawn(move || worker(i, queue))
        })
        .collect();

    for w in workers {
        w.join().unwrap();
    }
}
```

### Ví Dụ 4: Parallel Computation với Shared Result

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let results = Arc::new(Mutex::new(vec![]));

    let handles: Vec<_> = (1..=10)
        .map(|i| {
            let results = Arc::clone(&results);
            thread::spawn(move || {
                let square = i * i;
                results.lock().unwrap().push((i, square));
            })
        })
        .collect();

    for handle in handles {
        handle.join().unwrap();
    }

    let mut final_results = results.lock().unwrap();
    final_results.sort_by_key(|(i, _)| *i);

    for (i, square) in final_results.iter() {
        println!("{} squared = {}", i, square);
    }
}
```

### Ví Dụ 5: Bank Account

```rust
use std::sync::{Arc, Mutex};
use std::thread;

struct BankAccount {
    balance: Mutex<i32>,
}

impl BankAccount {
    fn new(initial_balance: i32) -> Self {
        BankAccount {
            balance: Mutex::new(initial_balance),
        }
    }

    fn deposit(&self, amount: i32) {
        let mut balance = self.balance.lock().unwrap();
        *balance += amount;
        println!("Deposited {}. New balance: {}", amount, *balance);
    }

    fn withdraw(&self, amount: i32) -> Result<(), String> {
        let mut balance = self.balance.lock().unwrap();
        if *balance >= amount {
            *balance -= amount;
            println!("Withdrew {}. New balance: {}", amount, *balance);
            Ok(())
        } else {
            Err("Insufficient funds".to_string())
        }
    }

    fn get_balance(&self) -> i32 {
        *self.balance.lock().unwrap()
    }
}

fn main() {
    let account = Arc::new(BankAccount::new(1000));

    let handles: Vec<_> = (0..5)
        .map(|i| {
            let account = Arc::clone(&account);
            thread::spawn(move || {
                if i % 2 == 0 {
                    account.deposit(100);
                } else {
                    let _ = account.withdraw(50);
                }
            })
        })
        .collect();

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final balance: {}", account.get_balance());
}
```

## ⚠️ Deadlocks

### Deadlock Example

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let resource1 = Arc::new(Mutex::new(0));
    let resource2 = Arc::new(Mutex::new(0));

    let r1 = Arc::clone(&resource1);
    let r2 = Arc::clone(&resource2);

    let handle1 = thread::spawn(move || {
        let _lock1 = r1.lock().unwrap();
        println!("Thread 1 locked resource 1");

        // Simulate work
        std::thread::sleep(std::time::Duration::from_millis(50));

        let _lock2 = r2.lock().unwrap();
        println!("Thread 1 locked resource 2");
    });

    let r1 = Arc::clone(&resource1);
    let r2 = Arc::clone(&resource2);

    let handle2 = thread::spawn(move || {
        // Lock in SAME order to avoid deadlock
        let _lock1 = r1.lock().unwrap();
        println!("Thread 2 locked resource 1");

        let _lock2 = r2.lock().unwrap();
        println!("Thread 2 locked resource 2");
    });

    handle1.join().unwrap();
    handle2.join().unwrap();
}
```

### Avoiding Deadlocks

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let resource1 = Arc::new(Mutex::new(0));
    let resource2 = Arc::new(Mutex::new(0));

    // Always lock in SAME ORDER
    let r1 = Arc::clone(&resource1);
    let r2 = Arc::clone(&resource2);

    let handle1 = thread::spawn(move || {
        let _lock1 = r1.lock().unwrap();
        let _lock2 = r2.lock().unwrap();
        println!("Thread 1 got both locks");
    });

    let r1 = Arc::clone(&resource1);
    let r2 = Arc::clone(&resource2);

    let handle2 = thread::spawn(move || {
        let _lock1 = r1.lock().unwrap();
        let _lock2 = r2.lock().unwrap();
        println!("Thread 2 got both locks");
    });

    handle1.join().unwrap();
    handle2.join().unwrap();
}
```

### `try_lock()` - Avoid Blocking

```rust
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

fn main() {
    let mutex = Arc::new(Mutex::new(0));

    let m1 = Arc::clone(&mutex);
    let handle = thread::spawn(move || {
        let _lock = m1.lock().unwrap();
        thread::sleep(Duration::from_secs(2));
    });

    thread::sleep(Duration::from_millis(100));

    // Try to lock without blocking
    match mutex.try_lock() {
        Ok(guard) => println!("Got lock: {}", *guard),
        Err(_) => println!("Could not acquire lock"),
    }

    handle.join().unwrap();
}
```

## 🆚 Mutex vs RwLock vs Channels

### Comparison

```rust
use std::sync::{Arc, Mutex, RwLock, mpsc};
use std::thread;

fn main() {
    // Mutex - exclusive access
    let mutex_data = Arc::new(Mutex::new(0));

    // RwLock - multiple readers OR single writer
    let rwlock_data = Arc::new(RwLock::new(0));

    // Channel - message passing
    let (tx, rx) = mpsc::channel();
}
```

| Approach | Best For | Pros | Cons |
|----------|----------|------|------|
| **Mutex** | Shared mutable state | Simple, exclusive access | Slower, can deadlock |
| **RwLock** | Many readers, few writers | Fast reads | Complex, writer starvation |
| **Channels** | Communication, pipelines | No shared state | Overhead, copying data |

### When to Use What

```rust
// Use Mutex when:
// - Need to mutate shared state
// - Reads and writes are balanced

// Use RwLock when:
// - Many readers, few writers
// - Reads are much more common

// Use Channels when:
// - Prefer message passing over shared state
// - Building pipelines
// - Communication between threads
```

## 💻 Bài Tập Thực Hành

### Bài 1: Shared Counter

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));

    // TODO: Tạo 5 threads
    // Mỗi thread increment counter 100 times
    // Print final value
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));

    let handles: Vec<_> = (0..5)
        .map(|_| {
            let counter = Arc::clone(&counter);
            thread::spawn(move || {
                for _ in 0..100 {
                    *counter.lock().unwrap() += 1;
                }
            })
        })
        .collect();

    for h in handles {
        h.join().unwrap();
    }

    println!("Counter: {}", *counter.lock().unwrap());
}
```
</details>

### Bài 2: RwLock Example

```rust
use std::sync::{Arc, RwLock};
use std::thread;

fn main() {
    let data = Arc::new(RwLock::new(vec![1, 2, 3]));

    // TODO: Tạo 3 reader threads print sum
    // TODO: Tạo 1 writer thread push 4
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::sync::{Arc, RwLock};
use std::thread;

fn main() {
    let data = Arc::new(RwLock::new(vec![1, 2, 3]));

    // Readers
    let readers: Vec<_> = (0..3)
        .map(|i| {
            let data = Arc::clone(&data);
            thread::spawn(move || {
                let r = data.read().unwrap();
                println!("Reader {} sum: {}", i, r.iter().sum::<i32>());
            })
        })
        .collect();

    // Writer
    let writer = {
        let data = Arc::clone(&data);
        thread::spawn(move || {
            data.write().unwrap().push(4);
        })
    };

    for r in readers {
        r.join().unwrap();
    }
    writer.join().unwrap();
}
```
</details>

### Bài 3: Thread-Safe Vec

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let shared_vec = Arc::new(Mutex::new(vec![]));

    // TODO: 5 threads, mỗi thread push ID của nó
    // TODO: Print final vector
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let shared_vec = Arc::new(Mutex::new(vec![]));

    let handles: Vec<_> = (0..5)
        .map(|i| {
            let vec = Arc::clone(&shared_vec);
            thread::spawn(move || {
                vec.lock().unwrap().push(i);
            })
        })
        .collect();

    for h in handles {
        h.join().unwrap();
    }

    println!("Vec: {:?}", shared_vec.lock().unwrap());
}
```
</details>

## 🎯 Tóm Tắt

| Type | Access | Readers | Writers | Use Case |
|------|--------|---------|---------|----------|
| **`Mutex<T>`** | Exclusive | 1 at a time | 1 at a time | General shared state |
| **`RwLock<T>`** | Shared/Exclusive | Many | 1 at a time | Read-heavy workloads |

**Quy tắc vàng**:
- ✅ `Arc<Mutex<T>>` cho shared mutable state
- ✅ `RwLock` cho many readers, few writers
- ✅ Lock trong scope nhỏ nhất có thể
- ✅ Luôn lock theo thứ tự để tránh deadlock
- ✅ Dùng try_lock() để tránh blocking
- ✅ Prefer channels over shared state khi có thể

## 🔗 Liên Kết Hữu Ích

- [std::sync::Mutex](https://doc.rust-lang.org/std/sync/struct.Mutex.html)
- [std::sync::RwLock](https://doc.rust-lang.org/std/sync/struct.RwLock.html)

---

**Bài tiếp theo**: [Async Basics →](./async-basics.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Async/Await** - lập trình bất đồng bộ!
