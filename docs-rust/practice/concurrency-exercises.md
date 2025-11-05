# Concurrency Exercises

Master Rust's concurrency primitives with these exercises covering threads, message passing, shared state, and safe concurrent programming.

---

## Exercise 1: Basic Thread Spawning

**Difficulty**: Easy

**Problem**: Create and join multiple threads.

**Requirements**:
- Spawn multiple threads
- Wait for all threads to complete
- Pass data to threads
- Collect results from threads

**Example**:
```rust
let handle = thread::spawn(|| {
    println!("Hello from thread!");
});
handle.join().unwrap();
```

**Hints**:
- Use `thread::spawn()`
- Use `join()` to wait for completion
- Move closures capture their environment
- Collect handles in a Vec

<details>
<summary>Solution</summary>

```rust
use std::thread;
use std::time::Duration;

fn basic_thread() {
    let handle = thread::spawn(|| {
        for i in 1..=5 {
            println!("Thread: count {}", i);
            thread::sleep(Duration::from_millis(100));
        }
    });

    for i in 1..=3 {
        println!("Main: count {}", i);
        thread::sleep(Duration::from_millis(150));
    }

    handle.join().unwrap();
}

fn multiple_threads() {
    let mut handles = vec![];

    for i in 0..5 {
        let handle = thread::spawn(move || {
            println!("Thread {} starting", i);
            thread::sleep(Duration::from_millis(100));
            println!("Thread {} done", i);
            i * 2  // Return value
        });
        handles.push(handle);
    }

    for handle in handles {
        let result = handle.join().unwrap();
        println!("Thread returned: {}", result);
    }
}

fn parallel_computation() {
    let data = vec![1, 2, 3, 4, 5, 6, 7, 8];
    let chunk_size = data.len() / 4;
    let mut handles = vec![];

    for chunk_id in 0..4 {
        let start = chunk_id * chunk_size;
        let end = if chunk_id == 3 { data.len() } else { start + chunk_size };
        let chunk = data[start..end].to_vec();

        let handle = thread::spawn(move || {
            chunk.iter().sum::<i32>()
        });
        handles.push(handle);
    }

    let total: i32 = handles.into_iter()
        .map(|h| h.join().unwrap())
        .sum();

    println!("Total sum: {}", total);
}

fn main() {
    println!("=== Basic Thread ===");
    basic_thread();

    println!("\n=== Multiple Threads ===");
    multiple_threads();

    println!("\n=== Parallel Computation ===");
    parallel_computation();
}
```

</details>

**Learning Points**:
- Thread creation with `spawn`
- Joining threads to wait for completion
- Moving data into threads
- Returning values from threads

---

## Exercise 2: Message Passing with Channels

**Difficulty**: Easy

**Problem**: Use channels to communicate between threads.

**Requirements**:
- Create a channel
- Send messages from one thread
- Receive messages in another thread
- Handle multiple senders

**Example**:
```rust
let (tx, rx) = mpsc::channel();
thread::spawn(move || {
    tx.send("Hello").unwrap();
});
let msg = rx.recv().unwrap();
```

**Hints**:
- Use `std::sync::mpsc::channel()`
- `tx` is the transmitter, `rx` is the receiver
- Can clone `tx` for multiple senders
- Use `recv()` to receive messages

<details>
<summary>Solution</summary>

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn simple_channel() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let messages = vec!["hello", "from", "the", "thread"];

        for msg in messages {
            tx.send(msg).unwrap();
            thread::sleep(Duration::from_millis(100));
        }
    });

    for received in rx {
        println!("Received: {}", received);
    }
}

fn multiple_senders() {
    let (tx, rx) = mpsc::channel();

    for i in 0..3 {
        let tx_clone = tx.clone();
        thread::spawn(move || {
            for j in 0..3 {
                let msg = format!("Thread {}, message {}", i, j);
                tx_clone.send(msg).unwrap();
                thread::sleep(Duration::from_millis(50));
            }
        });
    }

    drop(tx); // Drop original sender

    for received in rx {
        println!("Got: {}", received);
    }
}

fn worker_pool() {
    let (job_tx, job_rx) = mpsc::channel();
    let (result_tx, result_rx) = mpsc::channel();

    // Spawn worker threads
    for worker_id in 0..3 {
        let job_rx = job_rx.clone();
        let result_tx = result_tx.clone();

        thread::spawn(move || {
            loop {
                match job_rx.recv() {
                    Ok(job) => {
                        println!("Worker {} processing job: {}", worker_id, job);
                        thread::sleep(Duration::from_millis(100));
                        result_tx.send(format!("Result from worker {}", worker_id)).unwrap();
                    }
                    Err(_) => break, // Channel closed
                }
            }
        });
    }

    drop(job_rx); // Close unused receiver in main thread
    drop(result_tx); // Close unused sender in main thread

    // Send jobs
    for i in 0..9 {
        job_tx.send(i).unwrap();
    }
    drop(job_tx); // Signal no more jobs

    // Collect results
    for result in result_rx {
        println!("Got: {}", result);
    }
}

fn main() {
    println!("=== Simple Channel ===");
    simple_channel();

    println!("\n=== Multiple Senders ===");
    multiple_senders();

    println!("\n=== Worker Pool ===");
    worker_pool();
}
```

</details>

**Learning Points**:
- Creating channels with `mpsc::channel()`
- Sending and receiving messages
- Multiple producer, single consumer pattern
- Closing channels properly

---

## Exercise 3: Shared State with Mutex

**Difficulty**: Medium

**Problem**: Share mutable state between threads using Mutex.

**Requirements**:
- Create a Mutex-protected counter
- Increment from multiple threads
- Avoid data races
- Use Arc for shared ownership

**Example**:
```rust
let counter = Arc::new(Mutex::new(0));
// Share counter between threads
```

**Hints**:
- Use `Arc` for shared ownership
- Use `Mutex` for interior mutability
- Lock the mutex before accessing data
- Lock is automatically released when dropped

<details>
<summary>Solution</summary>

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn shared_counter() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            for _ in 0..100 {
                let mut num = counter.lock().unwrap();
                *num += 1;
            }
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final count: {}", *counter.lock().unwrap());
}

fn shared_vector() {
    let data = Arc::new(Mutex::new(Vec::new()));
    let mut handles = vec![];

    for i in 0..5 {
        let data = Arc::clone(&data);
        let handle = thread::spawn(move || {
            let mut vec = data.lock().unwrap();
            vec.push(i);
            println!("Thread {} added {}", i, i);
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    let final_data = data.lock().unwrap();
    println!("Final vector: {:?}", *final_data);
}

fn parallel_sum_with_mutex() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let result = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    let chunk_size = numbers.len() / 4;

    for i in 0..4 {
        let result = Arc::clone(&result);
        let start = i * chunk_size;
        let end = if i == 3 { numbers.len() } else { start + chunk_size };
        let chunk = numbers[start..end].to_vec();

        let handle = thread::spawn(move || {
            let sum: i32 = chunk.iter().sum();
            let mut total = result.lock().unwrap();
            *total += sum;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Total: {}", *result.lock().unwrap());
}

fn main() {
    println!("=== Shared Counter ===");
    shared_counter();

    println!("\n=== Shared Vector ===");
    shared_vector();

    println!("\n=== Parallel Sum with Mutex ===");
    parallel_sum_with_mutex();
}
```

</details>

**Learning Points**:
- `Arc` for atomic reference counting
- `Mutex` for mutual exclusion
- Lock acquisition and release
- Combining Arc and Mutex for shared mutable state

---

## Exercise 4: Producer-Consumer Pattern

**Difficulty**: Medium

**Problem**: Implement a producer-consumer pattern using channels.

**Requirements**:
- Multiple producers generating data
- Multiple consumers processing data
- Proper channel closing
- Work distribution

**Example**:
```rust
// Producers send work
// Consumers receive and process work
```

**Hints**:
- Use channels for communication
- Clone sender for multiple producers
- Multiple receivers can share one channel (with mutex)
- Or use multiple channels

<details>
<summary>Solution</summary>

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn producer_consumer() {
    let (tx, rx) = mpsc::channel();

    // Spawn producers
    for producer_id in 0..2 {
        let tx = tx.clone();
        thread::spawn(move || {
            for i in 0..5 {
                let item = format!("Producer {} - Item {}", producer_id, i);
                println!("Producing: {}", item);
                tx.send(item).unwrap();
                thread::sleep(Duration::from_millis(100));
            }
        });
    }

    drop(tx); // Close the original sender

    // Spawn consumers
    let mut handles = vec![];
    for consumer_id in 0..2 {
        let rx = rx.clone();
        let handle = thread::spawn(move || {
            loop {
                match rx.recv() {
                    Ok(item) => {
                        println!("Consumer {} processing: {}", consumer_id, item);
                        thread::sleep(Duration::from_millis(150));
                    }
                    Err(_) => {
                        println!("Consumer {} shutting down", consumer_id);
                        break;
                    }
                }
            }
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}

fn bounded_buffer() {
    let (tx, rx) = mpsc::sync_channel(3); // Bounded channel with capacity 3

    let producer = thread::spawn(move || {
        for i in 0..10 {
            println!("Producing item {}", i);
            tx.send(i).unwrap();
            println!("Sent item {}", i);
        }
    });

    thread::sleep(Duration::from_millis(500)); // Let buffer fill up

    let consumer = thread::spawn(move || {
        for item in rx {
            println!("Consuming item {}", item);
            thread::sleep(Duration::from_millis(200));
        }
    });

    producer.join().unwrap();
    consumer.join().unwrap();
}

fn main() {
    println!("=== Producer-Consumer ===");
    producer_consumer();

    println!("\n=== Bounded Buffer ===");
    bounded_buffer();
}
```

</details>

**Learning Points**:
- Producer-consumer pattern
- Work distribution across threads
- Bounded vs unbounded channels
- Backpressure with bounded channels

---

## Exercise 5: Thread Pool Implementation

**Difficulty**: Hard

**Problem**: Implement a simple thread pool.

**Requirements**:
- Create a fixed number of worker threads
- Accept jobs through a channel
- Execute jobs on available workers
- Graceful shutdown

**Example**:
```rust
let pool = ThreadPool::new(4);
pool.execute(|| { /* work */ });
```

**Hints**:
- Workers wait for jobs on a channel
- Jobs are closures (FnOnce)
- Use `Arc<Mutex<Receiver>>` for shared receiver
- Handle shutdown signal

<details>
<summary>Solution</summary>

```rust
use std::sync::{Arc, Mutex, mpsc};
use std::thread;

type Job = Box<dyn FnOnce() + Send + 'static>;

struct ThreadPool {
    workers: Vec<Worker>,
    sender: mpsc::Sender<Job>,
}

impl ThreadPool {
    fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let (sender, receiver) = mpsc::channel();
        let receiver = Arc::new(Mutex::new(receiver));

        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            workers.push(Worker::new(id, Arc::clone(&receiver)));
        }

        ThreadPool { workers, sender }
    }

    fn execute<F>(&self, f: F)
    where
        F: FnOnce() + Send + 'static,
    {
        let job = Box::new(f);
        self.sender.send(job).unwrap();
    }
}

struct Worker {
    id: usize,
    thread: thread::JoinHandle<()>,
}

impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || loop {
            let job = receiver.lock().unwrap().recv();

            match job {
                Ok(job) => {
                    println!("Worker {} got a job; executing.", id);
                    job();
                }
                Err(_) => {
                    println!("Worker {} shutting down.", id);
                    break;
                }
            }
        });

        Worker { id, thread }
    }
}

fn main() {
    let pool = ThreadPool::new(4);

    for i in 0..8 {
        pool.execute(move || {
            println!("Executing job {}", i);
            thread::sleep(std::time::Duration::from_millis(100));
            println!("Job {} completed", i);
        });
    }

    println!("All jobs submitted");
    thread::sleep(std::time::Duration::from_secs(2));
}
```

</details>

**Learning Points**:
- Thread pool pattern
- Sharing receiver with `Arc<Mutex>`
- Trait objects for generic jobs
- Worker pattern

---

## Exercise 6: Barrier Synchronization

**Difficulty**: Medium

**Problem**: Use a Barrier to synchronize multiple threads at a point.

**Requirements**:
- Create multiple threads
- Use Barrier to synchronize
- All threads wait until all reach the barrier
- Continue after synchronization

**Example**:
```rust
let barrier = Arc::new(Barrier::new(3));
// Threads wait at barrier.wait()
```

**Hints**:
- Use `std::sync::Barrier`
- All threads must call `wait()`
- Threads block until all arrive
- Useful for phased computation

<details>
<summary>Solution</summary>

```rust
use std::sync::{Arc, Barrier};
use std::thread;
use std::time::Duration;

fn barrier_example() {
    let barrier = Arc::new(Barrier::new(3));
    let mut handles = vec![];

    for i in 0..3 {
        let barrier = Arc::clone(&barrier);
        let handle = thread::spawn(move || {
            println!("Thread {} doing phase 1", i);
            thread::sleep(Duration::from_millis(100 * (i as u64 + 1)));
            println!("Thread {} done with phase 1", i);

            barrier.wait();

            println!("Thread {} doing phase 2", i);
            thread::sleep(Duration::from_millis(100));
            println!("Thread {} done with phase 2", i);
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}

fn multi_phase_computation() {
    let num_threads = 4;
    let barrier = Arc::new(Barrier::new(num_threads));
    let data = Arc::new(Mutex::new(vec![0; num_threads]));
    let mut handles = vec![];

    for i in 0..num_threads {
        let barrier = Arc::clone(&barrier);
        let data = Arc::clone(&data);

        let handle = thread::spawn(move || {
            // Phase 1: Initialize
            {
                let mut d = data.lock().unwrap();
                d[i] = i * 10;
            }
            println!("Thread {} initialized its data", i);

            barrier.wait();
            println!("Thread {} starting phase 2", i);

            // Phase 2: Read all data
            {
                let d = data.lock().unwrap();
                let sum: usize = d.iter().sum();
                println!("Thread {} sees total sum: {}", i, sum);
            }

            barrier.wait();
            println!("Thread {} in phase 3", i);

            // Phase 3: Update
            {
                let mut d = data.lock().unwrap();
                d[i] *= 2;
            }

            barrier.wait();

            // Phase 4: Final read
            {
                let d = data.lock().unwrap();
                println!("Thread {} final data: {:?}", i, *d);
            }
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}

fn main() {
    println!("=== Barrier Example ===");
    barrier_example();

    println!("\n=== Multi-Phase Computation ===");
    use std::sync::Mutex;
    multi_phase_computation();
}
```

</details>

**Learning Points**:
- Barrier for synchronization points
- Phased parallel algorithms
- Coordinating multiple threads
- Combining Barrier with other synchronization

---

## Exercise 7: Read-Write Lock (RwLock)

**Difficulty**: Medium

**Problem**: Use RwLock for multiple readers or single writer access.

**Requirements**:
- Allow multiple concurrent readers
- Exclusive access for writers
- Use `read()` and `write()` methods
- Demonstrate performance benefit

**Example**:
```rust
let lock = RwLock::new(data);
let r = lock.read().unwrap(); // Multiple readers OK
let w = lock.write().unwrap(); // Exclusive writer
```

**Hints**:
- Use `std::sync::RwLock`
- `read()` returns read guard
- `write()` returns write guard
- Better than Mutex for read-heavy workloads

<details>
<summary>Solution</summary>

```rust
use std::sync::{Arc, RwLock};
use std::thread;
use std::time::Duration;

fn rwlock_basic() {
    let data = Arc::new(RwLock::new(vec![1, 2, 3]));
    let mut handles = vec![];

    // Spawn readers
    for i in 0..3 {
        let data = Arc::clone(&data);
        let handle = thread::spawn(move || {
            let read_guard = data.read().unwrap();
            println!("Reader {} sees: {:?}", i, *read_guard);
            thread::sleep(Duration::from_millis(100));
        });
        handles.push(handle);
    }

    // Spawn a writer
    {
        let data = Arc::clone(&data);
        let handle = thread::spawn(move || {
            thread::sleep(Duration::from_millis(50));
            let mut write_guard = data.write().unwrap();
            println!("Writer modifying data");
            write_guard.push(4);
            thread::sleep(Duration::from_millis(100));
        });
        handles.push(handle);
    }

    // Spawn more readers
    for i in 3..6 {
        let data = Arc::clone(&data);
        let handle = thread::spawn(move || {
            thread::sleep(Duration::from_millis(200));
            let read_guard = data.read().unwrap();
            println!("Reader {} sees: {:?}", i, *read_guard);
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final data: {:?}", *data.read().unwrap());
}

fn cache_example() {
    use std::collections::HashMap;

    let cache = Arc::new(RwLock::new(HashMap::new()));
    let mut handles = vec![];

    // Writer thread - populates cache
    {
        let cache = Arc::clone(&cache);
        handles.push(thread::spawn(move || {
            for i in 0..5 {
                thread::sleep(Duration::from_millis(100));
                let mut write_guard = cache.write().unwrap();
                write_guard.insert(format!("key{}", i), i * 10);
                println!("Writer added key{}", i);
            }
        }));
    }

    // Reader threads - read from cache
    for reader_id in 0..3 {
        let cache = Arc::clone(&cache);
        handles.push(thread::spawn(move || {
            for i in 0..5 {
                thread::sleep(Duration::from_millis(120));
                let read_guard = cache.read().unwrap();
                if let Some(value) = read_guard.get(&format!("key{}", i)) {
                    println!("Reader {} read key{} = {}", reader_id, i, value);
                } else {
                    println!("Reader {} key{} not yet available", reader_id, i);
                }
            }
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }
}

fn main() {
    println!("=== RwLock Basic ===");
    rwlock_basic();

    println!("\n=== Cache Example ===");
    cache_example();
}
```

</details>

**Learning Points**:
- RwLock for reader-writer pattern
- Multiple concurrent readers
- Exclusive writer access
- Performance benefits for read-heavy workloads

---

## Exercise 8: Atomic Operations

**Difficulty**: Medium

**Problem**: Use atomic types for lock-free concurrent operations.

**Requirements**:
- Use AtomicBool, AtomicUsize, etc.
- Perform atomic operations
- Avoid locks where possible
- Understand memory ordering

**Example**:
```rust
let counter = AtomicUsize::new(0);
counter.fetch_add(1, Ordering::SeqCst);
```

**Hints**:
- Use `std::sync::atomic`
- Common types: AtomicBool, AtomicUsize, AtomicI32
- Operations: fetch_add, compare_exchange, load, store
- Choose appropriate Ordering

<details>
<summary>Solution</summary>

```rust
use std::sync::atomic::{AtomicUsize, AtomicBool, Ordering};
use std::sync::Arc;
use std::thread;
use std::time::Duration;

fn atomic_counter() {
    let counter = Arc::new(AtomicUsize::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            for _ in 0..100 {
                counter.fetch_add(1, Ordering::SeqCst);
            }
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final count: {}", counter.load(Ordering::SeqCst));
}

fn shutdown_flag() {
    let running = Arc::new(AtomicBool::new(true));
    let mut handles = vec![];

    for i in 0..3 {
        let running = Arc::clone(&running);
        let handle = thread::spawn(move || {
            while running.load(Ordering::SeqCst) {
                println!("Worker {} is running", i);
                thread::sleep(Duration::from_millis(100));
            }
            println!("Worker {} shutting down", i);
        });
        handles.push(handle);
    }

    thread::sleep(Duration::from_millis(500));
    println!("Setting shutdown flag");
    running.store(false, Ordering::SeqCst);

    for handle in handles {
        handle.join().unwrap();
    }
}

fn lock_free_stack() {
    use std::sync::atomic::AtomicPtr;
    use std::ptr;

    struct Node {
        value: i32,
        next: *mut Node,
    }

    struct Stack {
        head: AtomicPtr<Node>,
    }

    impl Stack {
        fn new() -> Self {
            Stack {
                head: AtomicPtr::new(ptr::null_mut()),
            }
        }

        fn push(&self, value: i32) {
            let new_node = Box::into_raw(Box::new(Node {
                value,
                next: ptr::null_mut(),
            }));

            loop {
                let head = self.head.load(Ordering::Acquire);
                unsafe {
                    (*new_node).next = head;
                }

                if self.head
                    .compare_exchange(head, new_node, Ordering::Release, Ordering::Acquire)
                    .is_ok()
                {
                    break;
                }
            }
        }

        fn is_empty(&self) -> bool {
            self.head.load(Ordering::Acquire).is_null()
        }
    }

    let stack = Arc::new(Stack::new());
    let mut handles = vec![];

    for i in 0..5 {
        let stack = Arc::clone(&stack);
        let handle = thread::spawn(move || {
            for j in 0..10 {
                stack.push(i * 10 + j);
            }
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Stack populated (lock-free)");
}

fn main() {
    println!("=== Atomic Counter ===");
    atomic_counter();

    println!("\n=== Shutdown Flag ===");
    shutdown_flag();

    println!("\n=== Lock-Free Stack ===");
    lock_free_stack();
}
```

</details>

**Learning Points**:
- Atomic types for lock-free programming
- Atomic operations: fetch_add, load, store, compare_exchange
- Memory ordering considerations
- When to use atomics vs locks

---

## Exercise 9: Deadlock Prevention

**Difficulty**: Hard

**Problem**: Demonstrate and prevent deadlocks.

**Requirements**:
- Show how deadlock can occur
- Implement deadlock prevention strategies
- Use lock ordering
- Use try_lock to avoid blocking

**Example**:
```rust
// Bad: can deadlock
lock1.lock();
lock2.lock();

// Good: consistent ordering
always lock in order: lock1, then lock2
```

**Hints**:
- Deadlock happens with circular waiting
- Always acquire locks in the same order
- Use `try_lock()` for non-blocking attempts
- Consider timeout strategies

<details>
<summary>Solution</summary>

```rust
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

// This CAN deadlock (don't use!)
fn potential_deadlock() {
    let lock1 = Arc::new(Mutex::new(1));
    let lock2 = Arc::new(Mutex::new(2));

    let lock1_clone = Arc::clone(&lock1);
    let lock2_clone = Arc::clone(&lock2);

    let handle1 = thread::spawn(move || {
        let _g1 = lock1_clone.lock().unwrap();
        println!("Thread 1 acquired lock1");
        thread::sleep(Duration::from_millis(10));

        println!("Thread 1 trying to acquire lock2...");
        let _g2 = lock2_clone.lock().unwrap();
        println!("Thread 1 acquired lock2");
    });

    let lock1_clone = Arc::clone(&lock1);
    let lock2_clone = Arc::clone(&lock2);

    let handle2 = thread::spawn(move || {
        let _g2 = lock2_clone.lock().unwrap();
        println!("Thread 2 acquired lock2");
        thread::sleep(Duration::from_millis(10));

        println!("Thread 2 trying to acquire lock1...");
        let _g1 = lock1_clone.lock().unwrap();
        println!("Thread 2 acquired lock1");
    });

    // Note: This might hang forever!
    // Uncomment at your own risk:
    // handle1.join().unwrap();
    // handle2.join().unwrap();

    println!("(Potential deadlock example - not actually executed)");
}

// Safe: consistent lock ordering
fn consistent_ordering() {
    let lock1 = Arc::new(Mutex::new(1));
    let lock2 = Arc::new(Mutex::new(2));

    let mut handles = vec![];

    for i in 0..2 {
        let lock1 = Arc::clone(&lock1);
        let lock2 = Arc::clone(&lock2);

        let handle = thread::spawn(move || {
            // Always acquire in the same order
            let _g1 = lock1.lock().unwrap();
            println!("Thread {} acquired lock1", i);

            thread::sleep(Duration::from_millis(10));

            let _g2 = lock2.lock().unwrap();
            println!("Thread {} acquired lock2", i);

            thread::sleep(Duration::from_millis(10));
            println!("Thread {} releasing locks", i);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Completed without deadlock!");
}

// Safe: using try_lock
fn using_try_lock() {
    let lock1 = Arc::new(Mutex::new(1));
    let lock2 = Arc::new(Mutex::new(2));

    let mut handles = vec![];

    for i in 0..2 {
        let lock1 = Arc::clone(&lock1);
        let lock2 = Arc::clone(&lock2);

        let handle = thread::spawn(move || {
            for attempt in 0..10 {
                if let Ok(_g1) = lock1.try_lock() {
                    println!("Thread {} acquired lock1", i);

                    thread::sleep(Duration::from_millis(10));

                    if let Ok(_g2) = lock2.try_lock() {
                        println!("Thread {} acquired lock2", i);
                        println!("Thread {} completed work", i);
                        return;
                    } else {
                        println!("Thread {} couldn't get lock2, releasing lock1", i);
                        // _g1 dropped here, releasing lock1
                    }
                }

                println!("Thread {} attempt {} failed, retrying...", i, attempt);
                thread::sleep(Duration::from_millis(50));
            }

            println!("Thread {} gave up after 10 attempts", i);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}

fn main() {
    println!("=== Potential Deadlock (not executed) ===");
    potential_deadlock();

    println!("\n=== Consistent Ordering ===");
    consistent_ordering();

    println!("\n=== Using try_lock ===");
    using_try_lock();
}
```

</details>

**Learning Points**:
- How deadlocks occur
- Lock ordering to prevent deadlock
- Using `try_lock()` for non-blocking
- Retry strategies
- Deadlock prevention best practices

---

## Exercise 10: Scoped Threads

**Difficulty**: Medium

**Problem**: Use scoped threads to borrow non-'static data.

**Requirements**:
- Create scoped threads
- Borrow local data
- Wait for all threads in scope
- Avoid data lifetime issues

**Example**:
```rust
let data = vec![1, 2, 3];
thread::scope(|s| {
    s.spawn(|| {
        // Can access &data
    });
});
```

**Hints**:
- Use `thread::scope()` (Rust 1.63+)
- Threads in scope can borrow local variables
- Scope waits for all threads to complete
- No need for Arc in many cases

<details>
<summary>Solution</summary>

```rust
use std::thread;

fn scoped_threads_basic() {
    let mut numbers = vec![1, 2, 3, 4, 5];

    thread::scope(|s| {
        s.spawn(|| {
            println!("Thread 1 can access: {:?}", numbers);
        });

        s.spawn(|| {
            println!("Thread 2 can also access: {:?}", numbers);
        });
    });

    // All threads joined automatically here
    numbers.push(6);
    println!("Modified after scope: {:?}", numbers);
}

fn parallel_processing() {
    let data = vec![1, 2, 3, 4, 5, 6, 7, 8];
    let mut results = vec![0; data.len()];

    thread::scope(|s| {
        let chunk_size = data.len() / 2;

        for i in 0..2 {
            let start = i * chunk_size;
            let end = if i == 1 { data.len() } else { start + chunk_size };

            s.spawn(move || {
                for j in start..end {
                    results[j] = data[j] * 2;
                    println!("Thread {} processed index {}", i, j);
                }
            });
        }
    });

    println!("Results: {:?}", results);
}

fn mutable_access() {
    let mut data = vec![1, 2, 3, 4];

    thread::scope(|s| {
        let chunks = data.chunks_mut(2);

        for (i, chunk) in chunks.enumerate() {
            s.spawn(move || {
                for val in chunk {
                    *val *= 2;
                }
                println!("Thread {} processed its chunk", i);
            });
        }
    });

    println!("Final data: {:?}", data);
}

fn main() {
    println!("=== Scoped Threads Basic ===");
    scoped_threads_basic();

    println!("\n=== Parallel Processing ===");
    parallel_processing();

    println!("\n=== Mutable Access ===");
    mutable_access();
}
```

</details>

**Learning Points**:
- Scoped threads for borrowing local data
- Automatic joining at scope end
- Avoiding unnecessary Arc/Mutex
- Safe parallel access to slices

---

## Concurrency Best Practices

### 1. Choose the Right Tool
```rust
// For simple sharing: Arc
// For mutable sharing: Arc<Mutex<T>> or Arc<RwLock<T>>
// For messaging: Channels (mpsc)
// For lock-free: Atomics
```

### 2. Avoid Locks When Possible
```rust
// Good: Message passing
tx.send(data)?;

// Also good: Atomic for simple counters
counter.fetch_add(1, Ordering::SeqCst);
```

### 3. Lock Ordering
```rust
// Always acquire locks in the same order
let _g1 = lock1.lock();
let _g2 = lock2.lock();
```

### 4. Minimize Critical Sections
```rust
// Bad: Long critical section
let _guard = mutex.lock();
expensive_computation();

// Good: Minimal lock time
let result = expensive_computation();
let _guard = mutex.lock();
use_result(result);
```

## Common Patterns

### Worker Pool
```rust
let (tx, rx) = mpsc::channel();
for _ in 0..num_workers {
    let rx = rx.clone();
    spawn(|| worker(rx));
}
```

### Fan-out, Fan-in
```rust
let handles: Vec<_> = data.chunks()
    .map(|chunk| spawn(|| process(chunk)))
    .collect();
let results: Vec<_> = handles.into_iter()
    .map(|h| h.join().unwrap())
    .collect();
```

## Next Steps

- Study advanced concurrency patterns
- Learn about the `rayon` crate for data parallelism
- Explore `crossbeam` for advanced concurrency
- Move on to async programming exercises
- Build concurrent applications
