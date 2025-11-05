# Popular Crates Reference

A guide to commonly used Rust crates with examples and use cases.

## Table of Contents
- [Serialization](#serialization)
- [Async Runtime](#async-runtime)
- [CLI Tools](#cli-tools)
- [HTTP Clients](#http-clients)
- [Web Frameworks](#web-frameworks)
- [Database Access](#database-access)
- [Logging and Tracing](#logging-and-tracing)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Configuration](#configuration)
- [Date and Time](#date-and-time)
- [Regular Expressions](#regular-expressions)
- [Cryptography](#cryptography)
- [Utilities](#utilities)

## Serialization

### serde - Serialization/Deserialization Framework

**Purpose**: Universal serialization framework for Rust

**Installation**:
```toml
[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

**When to Use**:
- Converting Rust data structures to/from JSON, YAML, TOML, etc.
- Working with APIs
- Configuration files
- Data persistence

**Basic Example**:
```rust
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct User {
    name: String,
    age: u32,
    email: String,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Serialize to JSON
    let user = User {
        name: "Alice".to_string(),
        age: 30,
        email: "alice@example.com".to_string(),
    };
    let json = serde_json::to_string(&user)?;
    println!("JSON: {}", json);

    // Deserialize from JSON
    let user2: User = serde_json::from_str(&json)?;
    println!("User: {:?}", user2);

    Ok(())
}
```

**Advanced Features**:
```rust
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct Config {
    #[serde(rename = "serverPort")]
    server_port: u16,

    #[serde(default = "default_timeout")]
    timeout: u64,

    #[serde(skip_serializing_if = "Option::is_none")]
    api_key: Option<String>,

    #[serde(flatten)]
    extra: std::collections::HashMap<String, serde_json::Value>,
}

fn default_timeout() -> u64 {
    30
}
```

**Related Crates**:
- `serde_json`: JSON support
- `serde_yaml`: YAML support
- `toml`: TOML support
- `bincode`: Binary encoding

## Async Runtime

### tokio - Async Runtime

**Purpose**: Asynchronous runtime for Rust

**Installation**:
```toml
[dependencies]
tokio = { version = "1.0", features = ["full"] }
```

**When to Use**:
- Building async applications
- Network servers
- Concurrent I/O operations
- High-performance services

**Basic Example**:
```rust
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    println!("Starting...");

    // Spawn concurrent tasks
    let task1 = tokio::spawn(async {
        sleep(Duration::from_secs(1)).await;
        println!("Task 1 done");
    });

    let task2 = tokio::spawn(async {
        sleep(Duration::from_secs(2)).await;
        println!("Task 2 done");
    });

    // Wait for both tasks
    let _ = tokio::join!(task1, task2);
    println!("All tasks complete");
}
```

**TCP Server Example**:
```rust
use tokio::net::{TcpListener, TcpStream};
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    println!("Server listening on 8080");

    loop {
        let (socket, addr) = listener.accept().await?;
        println!("New connection from: {}", addr);

        tokio::spawn(async move {
            handle_client(socket).await;
        });
    }
}

async fn handle_client(mut socket: TcpStream) {
    let mut buf = [0; 1024];

    match socket.read(&mut buf).await {
        Ok(n) if n > 0 => {
            socket.write_all(&buf[..n]).await.ok();
        }
        _ => {}
    }
}
```

**Common Features**:
```toml
tokio = { version = "1.0", features = [
    "rt-multi-thread",  # Multi-threaded runtime
    "macros",           # #[tokio::main] and #[tokio::test]
    "fs",               # Async filesystem operations
    "io-util",          # AsyncReadExt, AsyncWriteExt
    "net",              # TCP, UDP networking
    "time",             # Timers and sleep
    "sync",             # Async synchronization primitives
] }
```

### async-std - Alternative Async Runtime

**Purpose**: Standard library-like async runtime

**Installation**:
```toml
[dependencies]
async-std = { version = "1.12", features = ["attributes"] }
```

**Example**:
```rust
use async_std::task;
use async_std::net::TcpListener;

#[async_std::main]
async fn main() -> std::io::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    println!("Server listening");

    Ok(())
}
```

## CLI Tools

### clap - Command Line Argument Parser

**Purpose**: Parse command-line arguments

**Installation**:
```toml
[dependencies]
clap = { version = "4.0", features = ["derive"] }
```

**When to Use**:
- Building CLI applications
- Parsing command-line arguments
- Generating help messages
- Validating input

**Basic Example**:
```rust
use clap::Parser;

#[derive(Parser, Debug)]
#[command(name = "myapp")]
#[command(about = "A simple CLI app", long_about = None)]
struct Args {
    /// Name of the person to greet
    #[arg(short, long)]
    name: String,

    /// Number of times to greet
    #[arg(short, long, default_value_t = 1)]
    count: u8,

    /// Enable verbose mode
    #[arg(short, long)]
    verbose: bool,
}

fn main() {
    let args = Args::parse();

    for _ in 0..args.count {
        println!("Hello, {}!", args.name);
    }

    if args.verbose {
        println!("Verbose mode enabled");
    }
}
```

**Advanced Example**:
```rust
use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "git")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Add files to staging
    Add {
        /// Files to add
        files: Vec<String>,
    },
    /// Commit changes
    Commit {
        /// Commit message
        #[arg(short, long)]
        message: String,
    },
}

fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Add { files } => {
            println!("Adding files: {:?}", files);
        }
        Commands::Commit { message } => {
            println!("Committing with message: {}", message);
        }
    }
}
```

## HTTP Clients

### reqwest - HTTP Client

**Purpose**: High-level HTTP client

**Installation**:
```toml
[dependencies]
reqwest = { version = "0.11", features = ["json"] }
tokio = { version = "1.0", features = ["full"] }
```

**When to Use**:
- Making HTTP requests
- Calling REST APIs
- Downloading files
- Web scraping

**Basic Example**:
```rust
use reqwest;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // GET request
    let response = reqwest::get("https://api.github.com/users/rust-lang")
        .await?
        .text()
        .await?;
    println!("Response: {}", response);

    // POST request with JSON
    let client = reqwest::Client::new();
    let res = client
        .post("https://httpbin.org/post")
        .json(&serde_json::json!({
            "name": "Alice",
            "age": 30
        }))
        .send()
        .await?;

    println!("Status: {}", res.status());

    Ok(())
}
```

**Advanced Example**:
```rust
use reqwest::{Client, header};
use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct User {
    login: String,
    name: Option<String>,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::builder()
        .user_agent("my-app/1.0")
        .timeout(std::time::Duration::from_secs(10))
        .build()?;

    let user: User = client
        .get("https://api.github.com/users/rust-lang")
        .header(header::ACCEPT, "application/json")
        .send()
        .await?
        .json()
        .await?;

    println!("User: {:?}", user);

    Ok(())
}
```

### ureq - Synchronous HTTP Client

**Purpose**: Simple synchronous HTTP client

**Installation**:
```toml
[dependencies]
ureq = { version = "2.9", features = ["json"] }
```

**Example**:
```rust
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let response = ureq::get("https://httpbin.org/get")
        .call()?
        .into_string()?;

    println!("{}", response);
    Ok(())
}
```

## Web Frameworks

### axum - Ergonomic Web Framework

**Purpose**: Web application framework built on tokio

**Installation**:
```toml
[dependencies]
axum = "0.7"
tokio = { version = "1.0", features = ["full"] }
```

**Example**:
```rust
use axum::{
    routing::{get, post},
    Router,
    Json,
    extract::Path,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct User {
    name: String,
}

async fn hello() -> &'static str {
    "Hello, World!"
}

async fn get_user(Path(id): Path<u32>) -> String {
    format!("User ID: {}", id)
}

async fn create_user(Json(user): Json<User>) -> Json<User> {
    Json(user)
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(hello))
        .route("/users/:id", get(get_user))
        .route("/users", post(create_user));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    println!("Server running on http://127.0.0.1:3000");
    axum::serve(listener, app).await.unwrap();
}
```

### actix-web - Powerful Web Framework

**Purpose**: High-performance web framework

**Installation**:
```toml
[dependencies]
actix-web = "4"
```

**Example**:
```rust
use actix_web::{web, App, HttpResponse, HttpServer};

async fn hello() -> HttpResponse {
    HttpResponse::Ok().body("Hello world!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(hello))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
```

## Database Access

### sqlx - Async SQL Toolkit

**Purpose**: Async SQL database access with compile-time query checking

**Installation**:
```toml
[dependencies]
sqlx = { version = "0.7", features = ["runtime-tokio-native-tls", "postgres"] }
tokio = { version = "1.0", features = ["full"] }
```

**When to Use**:
- Async database access
- Type-safe SQL queries
- Database migrations
- Connection pooling

**Example**:
```rust
use sqlx::postgres::PgPoolOptions;
use sqlx::FromRow;

#[derive(FromRow, Debug)]
struct User {
    id: i32,
    name: String,
    email: String,
}

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    // Create connection pool
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect("postgres://user:pass@localhost/db").await?;

    // Query with compile-time checking (requires DATABASE_URL env var)
    let users: Vec<User> = sqlx::query_as!(
        User,
        "SELECT id, name, email FROM users WHERE id = $1",
        1
    )
    .fetch_all(&pool)
    .await?;

    println!("Users: {:?}", users);

    // Insert
    sqlx::query!(
        "INSERT INTO users (name, email) VALUES ($1, $2)",
        "Alice",
        "alice@example.com"
    )
    .execute(&pool)
    .await?;

    Ok(())
}
```

### diesel - ORM and Query Builder

**Purpose**: Safe, extensible ORM and query builder

**Installation**:
```toml
[dependencies]
diesel = { version = "2.1", features = ["postgres"] }
```

**Example**:
```rust
use diesel::prelude::*;

#[derive(Queryable)]
struct User {
    id: i32,
    name: String,
    email: String,
}

fn main() {
    use schema::users::dsl::*;

    let connection = &mut establish_connection();
    let results = users
        .filter(name.eq("Alice"))
        .limit(5)
        .load::<User>(connection)
        .expect("Error loading users");

    for user in results {
        println!("{} - {}", user.name, user.email);
    }
}
```

## Logging and Tracing

### tracing - Application-level Tracing

**Purpose**: Structured logging and tracing

**Installation**:
```toml
[dependencies]
tracing = "0.1"
tracing-subscriber = "0.3"
```

**Example**:
```rust
use tracing::{info, warn, error, debug, trace, instrument};
use tracing_subscriber;

#[instrument]
fn process_data(id: u32) -> Result<(), String> {
    debug!("Processing started");

    if id == 0 {
        error!("Invalid ID: {}", id);
        return Err("Invalid ID".to_string());
    }

    info!("Processing data for ID: {}", id);
    Ok(())
}

fn main() {
    tracing_subscriber::fmt::init();

    info!("Application started");
    process_data(1).ok();
    warn!("This is a warning");
}
```

### log - Logging Facade

**Purpose**: Simple logging facade

**Installation**:
```toml
[dependencies]
log = "0.4"
env_logger = "0.11"
```

**Example**:
```rust
use log::{info, warn, error, debug};

fn main() {
    env_logger::init();

    debug!("Debug message");
    info!("Info message");
    warn!("Warning message");
    error!("Error message");
}
```

## Error Handling

### anyhow - Flexible Error Handling

**Purpose**: Easy error handling for applications

**Installation**:
```toml
[dependencies]
anyhow = "1.0"
```

**When to Use**:
- Application code (not libraries)
- Quick prototyping
- When you don't need specific error types

**Example**:
```rust
use anyhow::{Result, Context, bail};

fn read_config(path: &str) -> Result<String> {
    if path.is_empty() {
        bail!("Path cannot be empty");
    }

    std::fs::read_to_string(path)
        .context("Failed to read config file")
}

fn main() -> Result<()> {
    let config = read_config("config.toml")?;
    println!("Config: {}", config);
    Ok(())
}
```

### thiserror - Custom Error Types

**Purpose**: Derive macro for error types

**Installation**:
```toml
[dependencies]
thiserror = "1.0"
```

**When to Use**:
- Library code
- When you need specific error types
- Better error context

**Example**:
```rust
use thiserror::Error;

#[derive(Error, Debug)]
enum MyError {
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),

    #[error("Parse error: {0}")]
    Parse(String),

    #[error("Not found: {0}")]
    NotFound(String),

    #[error("Invalid data at line {line}: {msg}")]
    Invalid { line: usize, msg: String },
}

fn parse_file(path: &str) -> Result<(), MyError> {
    let content = std::fs::read_to_string(path)?;

    if content.is_empty() {
        return Err(MyError::Invalid {
            line: 0,
            msg: "Empty file".to_string(),
        });
    }

    Ok(())
}
```

## Testing

### criterion - Benchmarking

**Purpose**: Statistical benchmarking library

**Installation**:
```toml
[dev-dependencies]
criterion = { version = "0.5", features = ["html_reports"] }

[[bench]]
name = "my_benchmark"
harness = false
```

**Example**:
```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion};

fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 1,
        1 => 1,
        n => fibonacci(n-1) + fibonacci(n-2),
    }
}

fn criterion_benchmark(c: &mut Criterion) {
    c.bench_function("fib 20", |b| b.iter(|| fibonacci(black_box(20))));
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
```

### proptest - Property Testing

**Purpose**: Property-based testing framework

**Installation**:
```toml
[dev-dependencies]
proptest = "1.4"
```

**Example**:
```rust
use proptest::prelude::*;

fn reverse<T: Clone>(xs: &[T]) -> Vec<T> {
    let mut rev = Vec::new();
    for x in xs.iter().rev() {
        rev.push(x.clone())
    }
    rev
}

proptest! {
    #[test]
    fn test_reverse(ref xs in prop::collection::vec(any::<i32>(), 0..100)) {
        assert_eq!(reverse(&reverse(xs)), *xs);
    }
}
```

## Configuration

### config - Configuration Management

**Purpose**: Layered configuration system

**Installation**:
```toml
[dependencies]
config = "0.14"
serde = { version = "1.0", features = ["derive"] }
```

**Example**:
```rust
use config::{Config, File};
use serde::Deserialize;

#[derive(Deserialize)]
struct AppConfig {
    server: ServerConfig,
    database: DatabaseConfig,
}

#[derive(Deserialize)]
struct ServerConfig {
    host: String,
    port: u16,
}

#[derive(Deserialize)]
struct DatabaseConfig {
    url: String,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = Config::builder()
        .add_source(File::with_name("config"))
        .add_source(config::Environment::with_prefix("APP"))
        .build()?;

    let app_config: AppConfig = config.try_deserialize()?;
    println!("Server: {}:{}", app_config.server.host, app_config.server.port);

    Ok(())
}
```

## Date and Time

### chrono - Date and Time

**Purpose**: Date and time handling

**Installation**:
```toml
[dependencies]
chrono = "0.4"
```

**Example**:
```rust
use chrono::{DateTime, Utc, Local, Duration};

fn main() {
    // Current time
    let now: DateTime<Utc> = Utc::now();
    let local = Local::now();

    println!("UTC: {}", now);
    println!("Local: {}", local);

    // Parsing
    let dt = DateTime::parse_from_rfc3339("2024-01-01T00:00:00Z").unwrap();

    // Arithmetic
    let tomorrow = now + Duration::days(1);
    let week_ago = now - Duration::weeks(1);

    // Formatting
    let formatted = now.format("%Y-%m-%d %H:%M:%S");
    println!("{}", formatted);
}
```

## Regular Expressions

### regex - Regular Expressions

**Purpose**: Regular expression matching

**Installation**:
```toml
[dependencies]
regex = "1"
```

**Example**:
```rust
use regex::Regex;

fn main() {
    let re = Regex::new(r"(\d{4})-(\d{2})-(\d{2})").unwrap();

    if let Some(caps) = re.captures("Date: 2024-01-15") {
        println!("Year: {}", &caps[1]);
        println!("Month: {}", &caps[2]);
        println!("Day: {}", &caps[3]);
    }

    // Replace
    let result = re.replace_all("2024-01-15", "$1/$2/$3");
    println!("{}", result);  // 2024/01/15
}
```

## Cryptography

### ring - Cryptographic Operations

**Purpose**: Safe, fast cryptography

**Installation**:
```toml
[dependencies]
ring = "0.17"
```

### sha2 - SHA-2 Hash Functions

**Purpose**: SHA-256, SHA-512 hashing

**Installation**:
```toml
[dependencies]
sha2 = "0.10"
```

**Example**:
```rust
use sha2::{Sha256, Digest};

fn main() {
    let mut hasher = Sha256::new();
    hasher.update(b"hello world");
    let result = hasher.finalize();

    println!("Hash: {:x}", result);
}
```

## Utilities

### once_cell - Lazy Static Values

**Purpose**: Single assignment cells and lazy values

**Installation**:
```toml
[dependencies]
once_cell = "1.19"
```

**Example**:
```rust
use once_cell::sync::Lazy;
use std::collections::HashMap;

static HASHMAP: Lazy<HashMap<i32, String>> = Lazy::new(|| {
    let mut m = HashMap::new();
    m.insert(0, "foo".to_string());
    m.insert(1, "bar".to_string());
    m
});

fn main() {
    println!("{:?}", *HASHMAP);
}
```

### rayon - Data Parallelism

**Purpose**: Easy data parallelism

**Installation**:
```toml
[dependencies]
rayon = "1.8"
```

**Example**:
```rust
use rayon::prelude::*;

fn main() {
    let sum: i32 = (0..1000000)
        .into_par_iter()
        .map(|x| x * 2)
        .sum();

    println!("Sum: {}", sum);
}
```

## Quick Reference Table

| Use Case | Recommended Crate |
|----------|------------------|
| Serialization | serde, serde_json |
| Async runtime | tokio, async-std |
| CLI parsing | clap |
| HTTP client | reqwest, ureq |
| Web framework | axum, actix-web |
| Database | sqlx, diesel |
| Logging | tracing, log |
| Error handling (apps) | anyhow |
| Error handling (libs) | thiserror |
| Testing | proptest, criterion |
| Configuration | config |
| Date/Time | chrono |
| Regex | regex |
| Parallelism | rayon |
| Lazy statics | once_cell |
