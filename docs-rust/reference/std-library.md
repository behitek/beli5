# Common Standard Library Items

A reference guide to frequently used items from the Rust standard library.

## Table of Contents
- [Collections](#collections)
- [String Handling](#string-handling)
- [I/O Operations](#io-operations)
- [Filesystem Operations](#filesystem-operations)
- [Networking](#networking)
- [Threading](#threading)
- [Time and Duration](#time-and-duration)
- [Memory Management](#memory-management)
- [Environment and Process](#environment-and-process)

## Collections

### `Vec<T>` - Dynamic Array
```rust
use std::vec::Vec;

// Creation
let v: Vec<i32> = Vec::new();
let v = vec![1, 2, 3];
let v = Vec::with_capacity(10);

// Adding elements
v.push(4);
v.extend([5, 6, 7]);
v.insert(0, 0);  // Insert at index

// Removing elements
v.pop();         // Returns Option<T>
v.remove(0);     // Returns T, panics if out of bounds
v.clear();       // Remove all

// Accessing
let first = &v[0];           // Panics if out of bounds
let first = v.get(0);        // Returns Option<&T>
let first = v.first();       // Returns Option<&T>
let last = v.last();         // Returns Option<&T>

// Iteration
for item in &v { }           // Immutable iteration
for item in &mut v { }       // Mutable iteration
for item in v { }            // Consuming iteration

// Other operations
let len = v.len();
let is_empty = v.is_empty();
v.sort();
v.reverse();
v.retain(|x| x % 2 == 0);    // Keep only even numbers
```

### `HashMap<K, V>` - Hash Table
```rust
use std::collections::HashMap;

// Creation
let mut map = HashMap::new();
let map: HashMap<_, _> = [("a", 1), ("b", 2)].iter().cloned().collect();

// Insertion
map.insert("key", "value");
map.entry("key").or_insert("default");
map.entry("key").and_modify(|v| *v = "new").or_insert("default");

// Access
let value = map.get("key");              // Returns Option<&V>
let value = map.get_mut("key");          // Returns Option<&mut V>
let value = map.get("key").unwrap_or(&default);

// Removal
map.remove("key");                       // Returns Option<V>
map.clear();

// Checking
map.contains_key("key");

// Iteration
for (key, value) in &map { }
for key in map.keys() { }
for value in map.values() { }

// Useful methods
let len = map.len();
let is_empty = map.is_empty();
```

### `HashSet<T>` - Hash Set
```rust
use std::collections::HashSet;

// Creation
let mut set = HashSet::new();
let set: HashSet<_> = [1, 2, 3].iter().cloned().collect();

// Insertion
set.insert(1);

// Removal
set.remove(&1);
set.clear();

// Checking
set.contains(&1);

// Set operations
let union: HashSet<_> = set1.union(&set2).collect();
let intersection: HashSet<_> = set1.intersection(&set2).collect();
let difference: HashSet<_> = set1.difference(&set2).collect();
let symmetric_diff: HashSet<_> = set1.symmetric_difference(&set2).collect();

// Subset/superset
set1.is_subset(&set2);
set1.is_superset(&set2);
set1.is_disjoint(&set2);

// Iteration
for item in &set { }
```

### `VecDeque<T>` - Double-Ended Queue
```rust
use std::collections::VecDeque;

let mut deque = VecDeque::new();

// Add elements
deque.push_back(1);
deque.push_front(0);

// Remove elements
deque.pop_back();        // Returns Option<T>
deque.pop_front();       // Returns Option<T>

// Access
deque.front();           // Returns Option<&T>
deque.back();            // Returns Option<&T>
```

### `BTreeMap<K, V>` - Sorted Map
```rust
use std::collections::BTreeMap;

let mut map = BTreeMap::new();
map.insert(3, "c");
map.insert(1, "a");
map.insert(2, "b");

// Ordered iteration
for (key, value) in &map {
    // Always in sorted order by key
}

// Range queries
for (key, value) in map.range(1..3) { }
```

### `BTreeSet<T>` - Sorted Set
```rust
use std::collections::BTreeSet;

let mut set = BTreeSet::new();
set.insert(3);
set.insert(1);
set.insert(2);

// Ordered iteration
for item in &set {
    // Always in sorted order
}
```

## String Handling

### String vs &str
```rust
// String - owned, growable
let mut s = String::new();
let s = String::from("hello");
let s = "hello".to_string();

// &str - string slice, borrowed
let s: &str = "hello";
let s: &str = &String::from("hello");
```

### String Operations
```rust
// Concatenation
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2;  // s1 is moved

// Format macro
let s = format!("{} {}", "Hello,", "world!");

// Modification
let mut s = String::from("hello");
s.push_str(", world");
s.push('!');
s.insert(0, 'H');
s.insert_str(5, " there");

// Substring operations
s.truncate(5);       // Shorten to 5 bytes
s.clear();           // Empty the string
let s = s.replace("world", "Rust");
let trimmed = s.trim();
let upper = s.to_uppercase();
let lower = s.to_lowercase();

// Splitting
let parts: Vec<&str> = s.split_whitespace().collect();
let parts: Vec<&str> = s.split(',').collect();
let lines: Vec<&str> = s.lines().collect();

// Checking
s.starts_with("hello");
s.ends_with("world");
s.contains("test");
s.is_empty();
let len = s.len();  // Length in bytes, not characters

// Character iteration
for c in s.chars() { }       // Unicode scalar values
for b in s.bytes() { }       // Raw bytes

// Parsing
let num: i32 = "42".parse().unwrap();
let num: Result<i32, _> = "42".parse();
```

## I/O Operations

### Reading from stdin
```rust
use std::io::{self, BufRead, Write};

// Read a line
let mut input = String::new();
io::stdin().read_line(&mut input)?;

// Read all lines
let stdin = io::stdin();
for line in stdin.lock().lines() {
    let line = line?;
    println!("{}", line);
}

// Buffered reading
use std::io::BufReader;
let stdin = io::stdin();
let reader = BufReader::new(stdin);
for line in reader.lines() {
    println!("{}", line?);
}
```

### Writing to stdout/stderr
```rust
use std::io::{self, Write};

// Print to stdout
println!("Hello, world!");
print!("No newline");

// Write to stdout
io::stdout().write_all(b"Hello, world!\n")?;

// Write to stderr
eprintln!("Error occurred!");
io::stderr().write_all(b"Error!\n")?;

// Flush output
io::stdout().flush()?;
```

### File I/O
```rust
use std::fs::File;
use std::io::{Read, Write, BufReader, BufRead};

// Read entire file to string
let contents = std::fs::read_to_string("file.txt")?;

// Read entire file to bytes
let bytes = std::fs::read("file.txt")?;

// Write entire string to file
std::fs::write("file.txt", "Hello, world!")?;

// Manual file reading
let mut file = File::open("file.txt")?;
let mut contents = String::new();
file.read_to_string(&mut contents)?;

// Buffered reading
let file = File::open("file.txt")?;
let reader = BufReader::new(file);
for line in reader.lines() {
    println!("{}", line?);
}

// Writing to file
let mut file = File::create("output.txt")?;
file.write_all(b"Hello, world!\n")?;

// Append to file
use std::fs::OpenOptions;
let mut file = OpenOptions::new()
    .append(true)
    .open("file.txt")?;
file.write_all(b"Appended text\n")?;
```

## Filesystem Operations

### Path Manipulation
```rust
use std::path::{Path, PathBuf};

// Create paths
let path = Path::new("/home/user/file.txt");
let mut pathbuf = PathBuf::from("/home/user");
pathbuf.push("file.txt");

// Path components
let parent = path.parent();              // Option<&Path>
let file_name = path.file_name();        // Option<&OsStr>
let extension = path.extension();        // Option<&OsStr>
let stem = path.file_stem();             // Option<&OsStr>

// Checking
path.exists();
path.is_file();
path.is_dir();
path.is_absolute();
path.is_relative();

// Conversion
let str_path = path.to_str();            // Option<&str>
let string_path = path.to_string_lossy(); // Cow<str>
let path_buf = path.to_path_buf();       // PathBuf

// Joining paths
let new_path = path.join("subdir/file.txt");
```

### Directory Operations
```rust
use std::fs;

// Create directory
fs::create_dir("new_dir")?;
fs::create_dir_all("path/to/new/dir")?;  // Create all parent dirs

// Remove directory
fs::remove_dir("dir")?;                   // Must be empty
fs::remove_dir_all("dir")?;              // Recursive removal

// Read directory
for entry in fs::read_dir(".")? {
    let entry = entry?;
    let path = entry.path();
    let metadata = entry.metadata()?;

    if metadata.is_file() {
        println!("File: {:?}", path);
    } else if metadata.is_dir() {
        println!("Directory: {:?}", path);
    }
}

// Copy and move
fs::copy("source.txt", "dest.txt")?;
fs::rename("old.txt", "new.txt")?;

// Remove file
fs::remove_file("file.txt")?;
```

### Metadata
```rust
use std::fs;

let metadata = fs::metadata("file.txt")?;

metadata.is_file();
metadata.is_dir();
metadata.len();                  // File size in bytes
metadata.modified()?;            // SystemTime
metadata.accessed()?;            // SystemTime
metadata.created()?;             // SystemTime

// Permissions
let permissions = metadata.permissions();
permissions.readonly();

#[cfg(unix)]
{
    use std::os::unix::fs::PermissionsExt;
    let mode = permissions.mode();
}
```

## Networking

### TCP Client
```rust
use std::net::TcpStream;
use std::io::{Read, Write};

// Connect to server
let mut stream = TcpStream::connect("127.0.0.1:8080")?;

// Write data
stream.write_all(b"GET / HTTP/1.0\r\n\r\n")?;

// Read response
let mut buffer = [0; 1024];
let bytes_read = stream.read(&mut buffer)?;
println!("Received: {}", String::from_utf8_lossy(&buffer[..bytes_read]));

// Set timeouts
use std::time::Duration;
stream.set_read_timeout(Some(Duration::from_secs(5)))?;
stream.set_write_timeout(Some(Duration::from_secs(5)))?;
```

### TCP Server
```rust
use std::net::TcpListener;
use std::io::{Read, Write};

// Bind to address
let listener = TcpListener::bind("127.0.0.1:8080")?;
println!("Server listening on port 8080");

// Accept connections
for stream in listener.incoming() {
    let mut stream = stream?;

    // Handle client
    let mut buffer = [0; 1024];
    let bytes_read = stream.read(&mut buffer)?;

    // Echo back
    stream.write_all(&buffer[..bytes_read])?;
}
```

### UDP Socket
```rust
use std::net::UdpSocket;

// Bind socket
let socket = UdpSocket::bind("127.0.0.1:8080")?;

// Send data
socket.send_to(b"Hello", "127.0.0.1:8081")?;

// Receive data
let mut buffer = [0; 1024];
let (bytes_received, src_addr) = socket.recv_from(&mut buffer)?;
println!("Received {} bytes from {}", bytes_received, src_addr);
```

## Threading

### Basic Threading
```rust
use std::thread;
use std::time::Duration;

// Spawn thread
let handle = thread::spawn(|| {
    println!("Thread running");
});

// Wait for thread to finish
handle.join().unwrap();

// With move closure
let data = vec![1, 2, 3];
let handle = thread::spawn(move || {
    println!("Data: {:?}", data);
});
handle.join().unwrap();
```

### Channels
```rust
use std::sync::mpsc;
use std::thread;

// Create channel
let (tx, rx) = mpsc::channel();

// Spawn sender thread
thread::spawn(move || {
    tx.send("Hello from thread").unwrap();
});

// Receive in main thread
let received = rx.recv().unwrap();
println!("{}", received);

// Multiple senders
let (tx, rx) = mpsc::channel();
let tx1 = tx.clone();

thread::spawn(move || tx.send(1).unwrap());
thread::spawn(move || tx1.send(2).unwrap());

for received in rx {
    println!("Got: {}", received);
}
```

### Mutex
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

### RwLock
```rust
use std::sync::{Arc, RwLock};
use std::thread;

let data = Arc::new(RwLock::new(vec![1, 2, 3]));

// Read lock (multiple readers allowed)
{
    let r = data.read().unwrap();
    println!("{:?}", *r);
}

// Write lock (exclusive)
{
    let mut w = data.write().unwrap();
    w.push(4);
}
```

## Time and Duration

### Duration
```rust
use std::time::Duration;

let duration = Duration::from_secs(60);
let duration = Duration::from_millis(1000);
let duration = Duration::from_micros(1_000_000);
let duration = Duration::from_nanos(1_000_000_000);

// Components
let secs = duration.as_secs();
let millis = duration.as_millis();
let micros = duration.as_micros();
let nanos = duration.as_nanos();

// Arithmetic
let total = duration1 + duration2;
let diff = duration1 - duration2;
let doubled = duration * 2;
```

### Instant (Monotonic Time)
```rust
use std::time::Instant;

let start = Instant::now();

// Do some work
expensive_operation();

let elapsed = start.elapsed();
println!("Time elapsed: {:?}", elapsed);
```

### SystemTime (Wall Clock Time)
```rust
use std::time::{SystemTime, UNIX_EPOCH};

let now = SystemTime::now();
let since_epoch = now.duration_since(UNIX_EPOCH).unwrap();
println!("Seconds since epoch: {}", since_epoch.as_secs());

// Get current timestamp
let timestamp = SystemTime::now()
    .duration_since(UNIX_EPOCH)
    .unwrap()
    .as_secs();
```

## Memory Management

### Smart Pointers
```rust
use std::rc::Rc;
use std::sync::Arc;
use std::cell::RefCell;

// Box - heap allocation
let b = Box::new(5);

// Rc - reference counting (single-threaded)
let rc1 = Rc::new(5);
let rc2 = Rc::clone(&rc1);
println!("Count: {}", Rc::strong_count(&rc1));

// Arc - atomic reference counting (thread-safe)
let arc1 = Arc::new(5);
let arc2 = Arc::clone(&arc1);

// RefCell - interior mutability
let data = RefCell::new(5);
*data.borrow_mut() = 6;
println!("{}", data.borrow());
```

### Cow (Clone on Write)
```rust
use std::borrow::Cow;

fn process(input: Cow<str>) -> Cow<str> {
    if input.contains("bad") {
        Cow::Owned(input.replace("bad", "good"))
    } else {
        input  // No allocation if no modification needed
    }
}

let s1 = process(Cow::Borrowed("hello world"));
let s2 = process(Cow::Borrowed("bad world"));
```

## Environment and Process

### Environment Variables
```rust
use std::env;

// Get environment variable
let path = env::var("PATH").unwrap();
let home = env::var("HOME").unwrap_or_else(|_| String::from("/"));

// Get all environment variables
for (key, value) in env::vars() {
    println!("{}: {}", key, value);
}

// Set environment variable (current process only)
env::set_var("MY_VAR", "value");
env::remove_var("MY_VAR");
```

### Command Line Arguments
```rust
use std::env;

let args: Vec<String> = env::args().collect();
println!("Program: {}", args[0]);
println!("Arguments: {:?}", &args[1..]);
```

### Current Directory
```rust
use std::env;

// Get current directory
let current_dir = env::current_dir()?;
println!("Current directory: {:?}", current_dir);

// Set current directory
env::set_current_dir("/tmp")?;
```

### Process Execution
```rust
use std::process::Command;

// Run command
let output = Command::new("ls")
    .arg("-la")
    .output()?;

println!("Status: {}", output.status);
println!("Stdout: {}", String::from_utf8_lossy(&output.stdout));
println!("Stderr: {}", String::from_utf8_lossy(&output.stderr));

// Spawn process
let child = Command::new("sleep")
    .arg("5")
    .spawn()?;

let status = child.wait_with_output()?;

// Exit current process
use std::process;
process::exit(0);
```

## Quick Reference Table

| Category | Common Types | Module |
|----------|--------------|--------|
| Collections | `Vec`, `HashMap`, `HashSet` | `std::collections` |
| Strings | `String`, `&str` | `std::string`, built-in |
| I/O | `Read`, `Write`, `BufReader` | `std::io` |
| Files | `File`, `OpenOptions` | `std::fs` |
| Paths | `Path`, `PathBuf` | `std::path` |
| Networking | `TcpStream`, `TcpListener`, `UdpSocket` | `std::net` |
| Threading | `thread`, `Mutex`, `Arc` | `std::thread`, `std::sync` |
| Time | `Duration`, `Instant`, `SystemTime` | `std::time` |
| Process | `Command`, `exit` | `std::process` |
| Environment | `args`, `var`, `current_dir` | `std::env` |
