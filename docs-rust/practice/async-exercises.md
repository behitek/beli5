# Async Programming Exercises

Master Rust's async/await with these exercises covering async functions, futures, Tokio runtime, error handling, and real-world async patterns.

---

## Prerequisites

Add these dependencies to your `Cargo.toml`:
```toml
[dependencies]
tokio = { version = "1", features = ["full"] }
```

---

## Exercise 1: Basic Async Function

**Difficulty**: Easy

**Problem**: Create and execute a simple async function.

**Requirements**:
- Define an async function
- Use `await` to call it
- Set up Tokio runtime
- Return values from async functions

**Example**:
```rust
async fn hello() -> String {
    "Hello, async!".to_string()
}

#[tokio::main]
async fn main() {
    let msg = hello().await;
    println!("{}", msg);
}
```

**Hints**:
- Use `async fn` syntax
- Call async functions with `.await`
- Use `#[tokio::main]` for async main
- Async functions return `Future<Output = T>`

<details>
<summary>Solution</summary>

```rust
use tokio;

async fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

async fn calculate_sum(a: i32, b: i32) -> i32 {
    a + b
}

async fn delayed_greeting(name: &str, delay_ms: u64) -> String {
    tokio::time::sleep(tokio::time::Duration::from_millis(delay_ms)).await;
    format!("Hello after {}ms, {}!", delay_ms, name)
}

#[tokio::main]
async fn main() {
    let greeting = greet("World").await;
    println!("{}", greeting);

    let sum = calculate_sum(5, 7).await;
    println!("Sum: {}", sum);

    let delayed = delayed_greeting("Alice", 100).await;
    println!("{}", delayed);
}
```

</details>

**Learning Points**:
- Defining async functions
- Using `.await` to get results
- `#[tokio::main]` macro
- Async functions and Future trait

---

## Exercise 2: Concurrent Async Tasks

**Difficulty**: Easy

**Problem**: Run multiple async tasks concurrently.

**Requirements**:
- Spawn multiple async tasks
- Use `tokio::spawn`
- Wait for tasks to complete
- Collect results using `JoinHandle`

**Example**:
```rust
let handle = tokio::spawn(async {
    // async work
});
let result = handle.await?;
```

**Hints**:
- Use `tokio::spawn()` to create tasks
- Tasks run concurrently
- Use `join!` macro for multiple futures
- `JoinHandle` returns Result

<details>
<summary>Solution</summary>

```rust
use tokio;
use tokio::time::{sleep, Duration};

async fn task(id: u32, duration_ms: u64) -> u32 {
    println!("Task {} starting", id);
    sleep(Duration::from_millis(duration_ms)).await;
    println!("Task {} completed", id);
    id * 2
}

#[tokio::main]
async fn main() {
    // Spawn multiple tasks
    let handle1 = tokio::spawn(task(1, 100));
    let handle2 = tokio::spawn(task(2, 200));
    let handle3 = tokio::spawn(task(3, 150));

    // Wait for all tasks
    let result1 = handle1.await.unwrap();
    let result2 = handle2.await.unwrap();
    let result3 = handle3.await.unwrap();

    println!("Results: {}, {}, {}", result1, result2, result3);

    // Using join! macro
    let (r1, r2, r3) = tokio::join!(
        task(4, 100),
        task(5, 200),
        task(6, 150)
    );

    println!("Join results: {}, {}, {}", r1, r2, r3);
}
```

</details>

**Learning Points**:
- Spawning tasks with `tokio::spawn`
- Concurrent task execution
- Awaiting JoinHandles
- `join!` macro for running futures concurrently

---

## Exercise 3: Async Error Handling

**Difficulty**: Medium

**Problem**: Handle errors in async functions properly.

**Requirements**:
- Return `Result` from async functions
- Use `?` operator in async context
- Propagate errors correctly
- Handle errors from spawned tasks

**Example**:
```rust
async fn fallible_operation() -> Result<i32, String> {
    // might fail
}
```

**Hints**:
- Async functions can return `Result<T, E>`
- Use `?` operator as in sync code
- `JoinHandle::await` returns `Result<T, JoinError>`
- Chain error handling

<details>
<summary>Solution</summary>

```rust
use tokio;

#[derive(Debug)]
enum AppError {
    InvalidInput(String),
    Timeout,
    NetworkError(String),
}

impl std::fmt::Display for AppError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            AppError::InvalidInput(msg) => write!(f, "Invalid input: {}", msg),
            AppError::Timeout => write!(f, "Operation timed out"),
            AppError::NetworkError(msg) => write!(f, "Network error: {}", msg),
        }
    }
}

impl std::error::Error for AppError {}

async fn parse_number(s: &str) -> Result<i32, AppError> {
    s.parse::<i32>()
        .map_err(|e| AppError::InvalidInput(format!("Parse error: {}", e)))
}

async fn validate_positive(n: i32) -> Result<i32, AppError> {
    if n > 0 {
        Ok(n)
    } else {
        Err(AppError::InvalidInput(format!("{} is not positive", n)))
    }
}

async fn process_with_timeout(s: &str) -> Result<i32, AppError> {
    let num = parse_number(s).await?;
    let validated = validate_positive(num).await?;

    tokio::time::timeout(
        tokio::time::Duration::from_secs(1),
        async { Ok(validated * 2) }
    )
    .await
    .map_err(|_| AppError::Timeout)?
}

async fn fetch_data(id: u32) -> Result<String, AppError> {
    if id == 0 {
        return Err(AppError::InvalidInput("ID cannot be zero".to_string()));
    }

    tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;

    if id > 10 {
        Err(AppError::NetworkError(format!("Failed to fetch ID {}", id)))
    } else {
        Ok(format!("Data for ID {}", id))
    }
}

#[tokio::main]
async fn main() {
    match process_with_timeout("42").await {
        Ok(result) => println!("Success: {}", result),
        Err(e) => println!("Error: {}", e),
    }

    match process_with_timeout("-5").await {
        Ok(result) => println!("Success: {}", result),
        Err(e) => println!("Error: {}", e),
    }

    // Handling errors from spawned tasks
    let handles: Vec<_> = (0..5)
        .map(|id| tokio::spawn(fetch_data(id)))
        .collect();

    for (i, handle) in handles.into_iter().enumerate() {
        match handle.await {
            Ok(Ok(data)) => println!("Task {}: {}", i, data),
            Ok(Err(e)) => println!("Task {} error: {}", i, e),
            Err(e) => println!("Task {} panicked: {}", i, e),
        }
    }
}
```

</details>

**Learning Points**:
- Async functions with Result
- Error propagation with `?`
- Handling task join errors
- Timeout handling
- Custom error types in async

---

## Exercise 4: Select and Race

**Difficulty**: Medium

**Problem**: Use `select!` and `try_join!` to handle multiple futures.

**Requirements**:
- Use `tokio::select!` to wait on multiple futures
- First future to complete wins
- Handle different completion branches
- Use `try_join!` for error handling

**Example**:
```rust
tokio::select! {
    result1 = future1 => { /* handle */ },
    result2 = future2 => { /* handle */ },
}
```

**Hints**:
- `select!` races multiple futures
- Only one branch executes
- Use `try_join!` when all must succeed
- Pattern match on results

<details>
<summary>Solution</summary>

```rust
use tokio;
use tokio::time::{sleep, Duration};

async fn task_a() -> &'static str {
    sleep(Duration::from_millis(100)).await;
    "Task A completed"
}

async fn task_b() -> &'static str {
    sleep(Duration::from_millis(200)).await;
    "Task B completed"
}

async fn select_example() {
    tokio::select! {
        result = task_a() => {
            println!("First to complete: {}", result);
        }
        result = task_b() => {
            println!("First to complete: {}", result);
        }
    }
}

async fn fetch_from_primary() -> Result<String, String> {
    sleep(Duration::from_millis(150)).await;
    Ok("Data from primary".to_string())
}

async fn fetch_from_backup() -> Result<String, String> {
    sleep(Duration::from_millis(100)).await;
    Ok("Data from backup".to_string())
}

async fn fetch_with_fallback() -> Result<String, String> {
    tokio::select! {
        result = fetch_from_primary() => result,
        result = fetch_from_backup() => {
            println!("Using backup");
            result
        }
    }
}

async fn download(url: &str) -> Result<String, String> {
    sleep(Duration::from_millis(100)).await;
    if url.is_empty() {
        Err("Empty URL".to_string())
    } else {
        Ok(format!("Downloaded from {}", url))
    }
}

async fn parallel_downloads() -> Result<(), String> {
    let urls = vec!["url1", "url2", "url3"];

    let results = tokio::try_join!(
        download(urls[0]),
        download(urls[1]),
        download(urls[2])
    )?;

    println!("All downloads complete:");
    println!("  {}", results.0);
    println!("  {}", results.1);
    println!("  {}", results.2);

    Ok(())
}

async fn timeout_example() {
    let operation = async {
        sleep(Duration::from_secs(2)).await;
        "Completed"
    };

    tokio::select! {
        result = operation => {
            println!("Operation completed: {}", result);
        }
        _ = sleep(Duration::from_millis(500)) => {
            println!("Operation timed out");
        }
    }
}

#[tokio::main]
async fn main() {
    println!("=== Select Example ===");
    select_example().await;

    println!("\n=== Fetch with Fallback ===");
    match fetch_with_fallback().await {
        Ok(data) => println!("Got: {}", data),
        Err(e) => println!("Error: {}", e),
    }

    println!("\n=== Parallel Downloads ===");
    parallel_downloads().await.ok();

    println!("\n=== Timeout Example ===");
    timeout_example().await;
}
```

</details>

**Learning Points**:
- `select!` for racing futures
- First-to-complete semantics
- `try_join!` for parallel execution with error handling
- Implementing timeouts with select
- Fallback patterns

---

## Exercise 5: Channels in Async

**Difficulty**: Medium

**Problem**: Use async channels for communication between tasks.

**Requirements**:
- Create async channels (mpsc, oneshot)
- Send and receive messages asynchronously
- Handle channel closure
- Implement producer-consumer pattern

**Example**:
```rust
let (tx, mut rx) = mpsc::channel(32);
tokio::spawn(async move {
    tx.send(data).await.unwrap();
});
let msg = rx.recv().await;
```

**Hints**:
- Use `tokio::sync::mpsc` for multiple producer
- Use `tokio::sync::oneshot` for single message
- Channels are async-aware
- Use `.await` on send/recv

<details>
<summary>Solution</summary>

```rust
use tokio;
use tokio::sync::{mpsc, oneshot};
use tokio::time::{sleep, Duration};

async fn mpsc_example() {
    let (tx, mut rx) = mpsc::channel(32);

    // Spawn producers
    for i in 0..3 {
        let tx = tx.clone();
        tokio::spawn(async move {
            for j in 0..3 {
                let msg = format!("Producer {} - Message {}", i, j);
                tx.send(msg).await.unwrap();
                sleep(Duration::from_millis(50)).await;
            }
        });
    }

    drop(tx); // Drop original sender

    // Receive messages
    while let Some(msg) = rx.recv().await {
        println!("Received: {}", msg);
    }
}

async fn oneshot_example() {
    let (tx, rx) = oneshot::channel();

    tokio::spawn(async move {
        sleep(Duration::from_millis(100)).await;
        tx.send("Result from spawned task").unwrap();
    });

    match rx.await {
        Ok(result) => println!("Got: {}", result),
        Err(_) => println!("Sender dropped"),
    }
}

async fn worker_pool() {
    let (job_tx, mut job_rx) = mpsc::channel::<u32>(10);
    let (result_tx, mut result_rx) = mpsc::channel::<u32>(10);

    // Spawn workers
    for worker_id in 0..3 {
        let mut job_rx = job_rx.clone();
        let result_tx = result_tx.clone();

        tokio::spawn(async move {
            while let Some(job) = job_rx.recv().await {
                println!("Worker {} processing job {}", worker_id, job);
                sleep(Duration::from_millis(100)).await;
                let result = job * 2;
                result_tx.send(result).await.unwrap();
            }
        });
    }

    drop(job_rx);
    drop(result_tx);

    // Send jobs
    tokio::spawn(async move {
        for i in 0..9 {
            job_tx.send(i).await.unwrap();
        }
    });

    // Collect results
    let mut results = vec![];
    while let Some(result) = result_rx.recv().await {
        results.push(result);
    }

    println!("Results: {:?}", results);
}

#[tokio::main]
async fn main() {
    println!("=== MPSC Example ===");
    mpsc_example().await;

    println!("\n=== Oneshot Example ===");
    oneshot_example().await;

    println!("\n=== Worker Pool ===");
    worker_pool().await;
}
```

</details>

**Learning Points**:
- Async channels: mpsc and oneshot
- Channel capacity and backpressure
- Async send and receive
- Channel-based task communication

---

## Exercise 6: Shared State in Async

**Difficulty**: Medium

**Problem**: Share state between async tasks safely.

**Requirements**:
- Use `Arc<Mutex<T>>` or `Arc<RwLock<T>>`
- Access shared data from multiple tasks
- Handle async lock acquisition
- Avoid holding locks across await points

**Example**:
```rust
let data = Arc::new(Mutex::new(vec![]));
// Share between tasks
```

**Hints**:
- Use `tokio::sync::Mutex` for async locks
- Don't hold MutexGuard across `.await`
- Consider using channels instead
- Use `RwLock` for read-heavy workloads

<details>
<summary>Solution</summary>

```rust
use tokio;
use tokio::sync::{Mutex, RwLock};
use std::sync::Arc;
use tokio::time::{sleep, Duration};

async fn shared_counter() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for i in 0..5 {
        let counter = Arc::clone(&counter);
        let handle = tokio::spawn(async move {
            for _ in 0..10 {
                let mut num = counter.lock().await;
                *num += 1;
                println!("Task {} incremented to {}", i, *num);
                drop(num); // Release lock before sleeping
                sleep(Duration::from_millis(10)).await;
            }
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.await.unwrap();
    }

    println!("Final count: {}", *counter.lock().await);
}

async fn shared_cache() {
    use std::collections::HashMap;

    let cache = Arc::new(RwLock::new(HashMap::new()));

    // Writer task
    let cache_writer = Arc::clone(&cache);
    let writer = tokio::spawn(async move {
        for i in 0..5 {
            sleep(Duration::from_millis(100)).await;
            let mut cache = cache_writer.write().await;
            cache.insert(format!("key{}", i), i * 10);
            println!("Writer added key{}", i);
        }
    });

    // Reader tasks
    let mut readers = vec![];
    for reader_id in 0..3 {
        let cache = Arc::clone(&cache);
        let reader = tokio::spawn(async move {
            for i in 0..5 {
                sleep(Duration::from_millis(120)).await;
                let cache = cache.read().await;
                if let Some(value) = cache.get(&format!("key{}", i)) {
                    println!("Reader {} read key{} = {}", reader_id, i, value);
                } else {
                    println!("Reader {} key{} not found", reader_id, i);
                }
            }
        });
        readers.push(reader);
    }

    writer.await.unwrap();
    for reader in readers {
        reader.await.unwrap();
    }
}

// Demonstrating the danger of holding lock across await
async fn bad_example() {
    let data = Arc::new(Mutex::new(0));
    let data_clone = Arc::clone(&data);

    tokio::spawn(async move {
        let mut num = data_clone.lock().await;
        *num += 1;
        // BAD: Holding lock across await
        // sleep(Duration::from_secs(1)).await;
        // This would block other tasks unnecessarily
    });

    // Good: Release lock before await
    let data_clone = Arc::clone(&data);
    tokio::spawn(async move {
        {
            let mut num = data_clone.lock().await;
            *num += 1;
        } // Lock released here
        sleep(Duration::from_secs(1)).await; // Now safe
    });
}

#[tokio::main]
async fn main() {
    println!("=== Shared Counter ===");
    shared_counter().await;

    println!("\n=== Shared Cache ===");
    shared_cache().await;
}
```

</details>

**Learning Points**:
- `tokio::sync::Mutex` for async-aware locking
- `RwLock` for concurrent readers
- Avoiding deadlocks in async
- Not holding locks across await points

---

## Exercise 7: Stream Processing

**Difficulty**: Medium

**Problem**: Work with async streams.

**Requirements**:
- Create and consume streams
- Use StreamExt trait methods
- Transform streams with map, filter
- Collect stream results

**Example**:
```rust
use futures::stream::{self, StreamExt};
let stream = stream::iter(vec![1, 2, 3]);
```

**Hints**:
- Use `futures` crate for Stream trait
- `StreamExt` provides combinators
- Similar to iterators but async
- Use `while let Some(item) = stream.next().await`

<details>
<summary>Solution</summary>

```rust
use tokio;
use futures::stream::{self, StreamExt};
use tokio::time::{sleep, Duration};

async fn basic_stream() {
    let stream = stream::iter(vec![1, 2, 3, 4, 5]);

    stream
        .for_each(|item| async move {
            println!("Item: {}", item);
        })
        .await;
}

async fn transform_stream() {
    let stream = stream::iter(vec![1, 2, 3, 4, 5]);

    let doubled: Vec<_> = stream
        .map(|x| x * 2)
        .filter(|x| futures::future::ready(*x > 5))
        .collect()
        .await;

    println!("Filtered and doubled: {:?}", doubled);
}

async fn async_stream() {
    let stream = stream::iter(0..5)
        .then(|i| async move {
            sleep(Duration::from_millis(100)).await;
            i * 2
        });

    stream
        .for_each(|item| async move {
            println!("Processed: {}", item);
        })
        .await;
}

async fn buffered_stream() {
    use futures::stream;

    let requests = stream::iter(0..10)
        .map(|i| async move {
            sleep(Duration::from_millis(100)).await;
            println!("Processing request {}", i);
            i * 2
        })
        .buffered(3); // Process up to 3 concurrently

    let results: Vec<_> = requests.collect().await;
    println!("Results: {:?}", results);
}

async fn channel_as_stream() {
    use tokio::sync::mpsc;
    use tokio_stream::wrappers::ReceiverStream;

    let (tx, rx) = mpsc::channel(10);

    tokio::spawn(async move {
        for i in 0..5 {
            tx.send(i).await.unwrap();
            sleep(Duration::from_millis(50)).await;
        }
    });

    let mut stream = ReceiverStream::new(rx);

    while let Some(item) = stream.next().await {
        println!("From channel stream: {}", item);
    }
}

#[tokio::main]
async fn main() {
    println!("=== Basic Stream ===");
    basic_stream().await;

    println!("\n=== Transform Stream ===");
    transform_stream().await;

    println!("\n=== Async Stream ===");
    async_stream().await;

    println!("\n=== Buffered Stream ===");
    buffered_stream().await;

    println!("\n=== Channel as Stream ===");
    channel_as_stream().await;
}
```

**Add to Cargo.toml**:
```toml
[dependencies]
tokio = { version = "1", features = ["full"] }
futures = "0.3"
tokio-stream = "0.1"
```

</details>

**Learning Points**:
- Stream trait for async sequences
- Stream combinators (map, filter, etc.)
- Buffered processing
- Converting channels to streams

---

## Exercise 8: Graceful Shutdown

**Difficulty**: Hard

**Problem**: Implement graceful shutdown for async tasks.

**Requirements**:
- Signal shutdown to all tasks
- Wait for tasks to complete
- Use cancellation tokens or channels
- Clean up resources

**Example**:
```rust
let (shutdown_tx, shutdown_rx) = broadcast::channel(1);
// Tasks listen for shutdown signal
```

**Hints**:
- Use `tokio::sync::broadcast` for shutdown signal
- Use `select!` to listen for shutdown
- Join all task handles
- Use `CancellationToken` from tokio-util

<details>
<summary>Solution</summary>

```rust
use tokio;
use tokio::sync::broadcast;
use tokio::time::{sleep, Duration};

async fn worker(id: u32, mut shutdown: broadcast::Receiver<()>) {
    println!("Worker {} started", id);

    loop {
        tokio::select! {
            _ = sleep(Duration::from_millis(100)) => {
                println!("Worker {} working...", id);
            }
            _ = shutdown.recv() => {
                println!("Worker {} received shutdown signal", id);
                break;
            }
        }
    }

    println!("Worker {} performing cleanup", id);
    sleep(Duration::from_millis(50)).await;
    println!("Worker {} shutdown complete", id);
}

async fn graceful_shutdown_example() {
    let (shutdown_tx, _) = broadcast::channel(1);
    let mut handles = vec![];

    // Spawn workers
    for i in 0..3 {
        let shutdown_rx = shutdown_tx.subscribe();
        let handle = tokio::spawn(worker(i, shutdown_rx));
        handles.push(handle);
    }

    // Let workers run for a bit
    sleep(Duration::from_millis(500)).await;

    // Send shutdown signal
    println!("Sending shutdown signal");
    shutdown_tx.send(()).unwrap();

    // Wait for all workers to finish
    for handle in handles {
        handle.await.unwrap();
    }

    println!("All workers shut down");
}

// Using CancellationToken (requires tokio-util)
async fn worker_with_token(id: u32, token: tokio_util::sync::CancellationToken) {
    println!("Worker {} started", id);

    loop {
        tokio::select! {
            _ = sleep(Duration::from_millis(100)) => {
                println!("Worker {} working...", id);
            }
            _ = token.cancelled() => {
                println!("Worker {} cancelled", id);
                break;
            }
        }
    }

    println!("Worker {} cleanup done", id);
}

async fn cancellation_token_example() {
    let token = tokio_util::sync::CancellationToken::new();
    let mut handles = vec![];

    for i in 0..3 {
        let token = token.clone();
        let handle = tokio::spawn(worker_with_token(i, token));
        handles.push(handle);
    }

    sleep(Duration::from_millis(500)).await;

    println!("Cancelling all workers");
    token.cancel();

    for handle in handles {
        handle.await.unwrap();
    }

    println!("All workers cancelled");
}

#[tokio::main]
async fn main() {
    println!("=== Graceful Shutdown with Broadcast ===");
    graceful_shutdown_example().await;

    println!("\n=== Cancellation Token ===");
    cancellation_token_example().await;
}
```

**Add to Cargo.toml**:
```toml
[dependencies]
tokio = { version = "1", features = ["full"] }
tokio-util = "0.7"
```

</details>

**Learning Points**:
- Shutdown signaling patterns
- `broadcast` channel for notifications
- `CancellationToken` for cancellation
- Graceful cleanup
- Coordinating task termination

---

## Exercise 9: Rate Limiting

**Difficulty**: Medium

**Problem**: Implement rate limiting for async operations.

**Requirements**:
- Limit requests per time period
- Use `tokio::time::interval`
- Implement token bucket or similar
- Handle backpressure

**Example**:
```rust
let mut interval = interval(Duration::from_millis(100));
interval.tick().await; // Wait for next tick
```

**Hints**:
- Use `tokio::time::interval`
- Combine with channels for backpressure
- Consider semaphores for concurrency limits
- Use governor crate for advanced rate limiting

<details>
<summary>Solution</summary>

```rust
use tokio;
use tokio::time::{interval, sleep, Duration, Instant};

async fn simple_rate_limit() {
    let mut interval = interval(Duration::from_millis(200));

    for i in 0..5 {
        interval.tick().await;
        println!("Request {} at {:?}", i, Instant::now());
    }
}

async fn process_with_rate_limit(id: u32) {
    println!("Processing request {}", id);
    sleep(Duration::from_millis(50)).await;
}

async fn rate_limited_worker() {
    let mut interval = interval(Duration::from_millis(100));
    let requests = vec![0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    for request in requests {
        interval.tick().await;
        tokio::spawn(process_with_rate_limit(request));
    }

    sleep(Duration::from_millis(200)).await;
}

// Using Semaphore for concurrency limiting
async fn concurrent_requests(id: u32) {
    println!("Request {} starting", id);
    sleep(Duration::from_millis(100)).await;
    println!("Request {} complete", id);
}

async fn semaphore_example() {
    use tokio::sync::Semaphore;
    use std::sync::Arc;

    let semaphore = Arc::new(Semaphore::new(3)); // Max 3 concurrent
    let mut handles = vec![];

    for i in 0..10 {
        let permit = semaphore.clone().acquire_owned().await.unwrap();
        let handle = tokio::spawn(async move {
            concurrent_requests(i).await;
            drop(permit); // Release permit
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.await.unwrap();
    }
}

// Token bucket implementation
struct TokenBucket {
    tokens: tokio::sync::Mutex<f64>,
    capacity: f64,
    refill_rate: f64, // tokens per second
    last_refill: tokio::sync::Mutex<Instant>,
}

impl TokenBucket {
    fn new(capacity: f64, refill_rate: f64) -> Self {
        TokenBucket {
            tokens: tokio::sync::Mutex::new(capacity),
            capacity,
            refill_rate,
            last_refill: tokio::sync::Mutex::new(Instant::now()),
        }
    }

    async fn acquire(&self) -> bool {
        self.refill().await;

        let mut tokens = self.tokens.lock().await;
        if *tokens >= 1.0 {
            *tokens -= 1.0;
            true
        } else {
            false
        }
    }

    async fn refill(&self) {
        let now = Instant::now();
        let mut last_refill = self.last_refill.lock().await;
        let elapsed = now.duration_since(*last_refill).as_secs_f64();

        let mut tokens = self.tokens.lock().await;
        *tokens = (*tokens + elapsed * self.refill_rate).min(self.capacity);
        *last_refill = now;
    }
}

async fn token_bucket_example() {
    use std::sync::Arc;

    let bucket = Arc::new(TokenBucket::new(5.0, 2.0)); // 5 tokens, refill 2/sec

    for i in 0..10 {
        if bucket.acquire().await {
            println!("Request {} accepted", i);
        } else {
            println!("Request {} rate limited", i);
        }
        sleep(Duration::from_millis(100)).await;
    }
}

#[tokio::main]
async fn main() {
    println!("=== Simple Rate Limit ===");
    simple_rate_limit().await;

    println!("\n=== Rate Limited Worker ===");
    rate_limited_worker().await;

    println!("\n=== Semaphore Example ===");
    semaphore_example().await;

    println!("\n=== Token Bucket ===");
    token_bucket_example().await;
}
```

</details>

**Learning Points**:
- Rate limiting with intervals
- Concurrency limiting with Semaphore
- Token bucket algorithm
- Backpressure handling

---

## Exercise 10: Retry Logic

**Difficulty**: Medium

**Problem**: Implement retry logic with exponential backoff.

**Requirements**:
- Retry failed operations
- Implement exponential backoff
- Set maximum retry attempts
- Handle permanent vs temporary failures

**Example**:
```rust
async fn with_retry<F, T>(f: F, max_attempts: u32) -> Result<T, Error>
where
    F: Fn() -> Future<Output = Result<T, Error>>
```

**Hints**:
- Use loop for retry attempts
- Increase delay exponentially
- Use `tokio::time::sleep`
- Consider using `tokio-retry` crate

<details>
<summary>Solution</summary>

```rust
use tokio;
use tokio::time::{sleep, Duration};

#[derive(Debug, Clone)]
enum AppError {
    Temporary(String),
    Permanent(String),
}

async fn unreliable_operation(attempt: u32) -> Result<String, AppError> {
    println!("Attempt {}", attempt);

    if attempt < 3 {
        Err(AppError::Temporary(format!("Failed on attempt {}", attempt)))
    } else {
        Ok(format!("Success on attempt {}", attempt))
    }
}

async fn retry_with_backoff<F, Fut, T>(
    mut operation: F,
    max_attempts: u32,
) -> Result<T, AppError>
where
    F: FnMut() -> Fut,
    Fut: std::future::Future<Output = Result<T, AppError>>,
{
    let mut attempt = 0;
    let mut delay = Duration::from_millis(100);

    loop {
        attempt += 1;

        match operation().await {
            Ok(result) => return Ok(result),
            Err(AppError::Permanent(msg)) => {
                return Err(AppError::Permanent(msg));
            }
            Err(AppError::Temporary(msg)) if attempt >= max_attempts => {
                return Err(AppError::Temporary(format!(
                    "Max attempts reached. Last error: {}",
                    msg
                )));
            }
            Err(AppError::Temporary(msg)) => {
                println!("Temporary error: {}. Retrying in {:?}...", msg, delay);
                sleep(delay).await;
                delay *= 2; // Exponential backoff
            }
        }
    }
}

async fn fetch_data(url: &str, attempt: &mut u32) -> Result<String, AppError> {
    *attempt += 1;
    println!("Fetching {} (attempt {})", url, *attempt);

    sleep(Duration::from_millis(50)).await;

    if *attempt < 3 {
        Err(AppError::Temporary("Network timeout".to_string()))
    } else {
        Ok(format!("Data from {}", url))
    }
}

async fn retry_example() {
    let mut attempt = 0;

    let result = retry_with_backoff(
        || async {
            unreliable_operation(attempt).await
        },
        5,
    )
    .await;

    match result {
        Ok(data) => println!("Success: {}", data),
        Err(e) => println!("Failed: {:?}", e),
    }
}

// Circuit breaker pattern
enum CircuitState {
    Closed,
    Open(Instant),
    HalfOpen,
}

struct CircuitBreaker {
    state: tokio::sync::Mutex<CircuitState>,
    failure_threshold: u32,
    failures: tokio::sync::Mutex<u32>,
    timeout: Duration,
}

impl CircuitBreaker {
    fn new(failure_threshold: u32, timeout: Duration) -> Self {
        CircuitBreaker {
            state: tokio::sync::Mutex::new(CircuitState::Closed),
            failure_threshold,
            failures: tokio::sync::Mutex::new(0),
            timeout,
        }
    }

    async fn call<F, Fut, T>(&self, operation: F) -> Result<T, AppError>
    where
        F: FnOnce() -> Fut,
        Fut: std::future::Future<Output = Result<T, AppError>>,
    {
        use tokio::time::Instant;

        let mut state = self.state.lock().await;

        match *state {
            CircuitState::Open(opened_at) => {
                if opened_at.elapsed() > self.timeout {
                    *state = CircuitState::HalfOpen;
                    println!("Circuit: Closed -> HalfOpen");
                } else {
                    return Err(AppError::Temporary("Circuit is open".to_string()));
                }
            }
            _ => {}
        }

        drop(state);

        match operation().await {
            Ok(result) => {
                let mut failures = self.failures.lock().await;
                *failures = 0;
                let mut state = self.state.lock().await;
                *state = CircuitState::Closed;
                Ok(result)
            }
            Err(e) => {
                let mut failures = self.failures.lock().await;
                *failures += 1;

                if *failures >= self.failure_threshold {
                    let mut state = self.state.lock().await;
                    *state = CircuitState::Open(Instant::now());
                    println!("Circuit opened due to failures");
                }

                Err(e)
            }
        }
    }
}

#[tokio::main]
async fn main() {
    use tokio::time::Instant;

    println!("=== Retry Example ===");
    retry_example().await;

    println!("\n=== Circuit Breaker ===");
    let breaker = CircuitBreaker::new(3, Duration::from_secs(2));

    for i in 0..10 {
        let result = breaker
            .call(|| async {
                if i < 4 {
                    Err(AppError::Temporary("Simulated failure".to_string()))
                } else {
                    Ok(format!("Success {}", i))
                }
            })
            .await;

        println!("Request {}: {:?}", i, result);
        sleep(Duration::from_millis(300)).await;
    }
}
```

</details>

**Learning Points**:
- Retry logic with exponential backoff
- Distinguishing temporary vs permanent errors
- Circuit breaker pattern
- Graceful degradation

---

## Async Best Practices

### 1. Don't Block the Runtime
```rust
// Bad: Blocking operation
std::thread::sleep(Duration::from_secs(1));

// Good: Async sleep
tokio::time::sleep(Duration::from_secs(1)).await;
```

### 2. Use Structured Concurrency
```rust
// Good: Use join or select
tokio::join!(task1(), task2(), task3());

// Or spawn with tracking
let handles = vec![
    tokio::spawn(task1()),
    tokio::spawn(task2()),
];
```

### 3. Avoid Holding Locks Across Await
```rust
// Bad
let guard = mutex.lock().await;
some_async_operation().await; // Still holding lock!

// Good
{
    let guard = mutex.lock().await;
    // Use guard
} // Lock released
some_async_operation().await;
```

### 4. Choose the Right Runtime
```rust
// For most applications
#[tokio::main]
async fn main() { }

// For libraries, let users choose
pub async fn my_function() { }
```

## Common Patterns

### Request-Response
```rust
let (tx, rx) = oneshot::channel();
tokio::spawn(async move {
    let result = process().await;
    tx.send(result).unwrap();
});
let response = rx.await?;
```

### Fan-out Fan-in
```rust
let futures: Vec<_> = items.iter()
    .map(|item| process(item))
    .collect();
let results = futures::future::join_all(futures).await;
```

### Timeout Pattern
```rust
match tokio::time::timeout(Duration::from_secs(5), operation()).await {
    Ok(result) => // operation completed
    Err(_) => // timeout
}
```

## Performance Tips

1. **Batch operations** when possible
2. **Use buffered streams** for parallel processing
3. **Avoid excessive task spawning** - use streams or channels
4. **Profile async code** with tokio-console
5. **Set appropriate channel buffer sizes**

## Next Steps

- Study the Tokio documentation
- Learn about async traits (RPITIT)
- Explore `async-std` as alternative runtime
- Read about async Drop and cancellation safety
- Build real async applications (web servers, clients)
- Learn async stream processing with tokio-stream

## Recommended Crates

- `tokio` - The async runtime
- `async-trait` - Async methods in traits
- `futures` - Async utilities
- `tokio-util` - Additional Tokio utilities
- `tower` - Async service composition
- `hyper` - Async HTTP
