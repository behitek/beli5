---
sidebar_position: 9
title: 🌐 Multi-threaded Web Server
description: Xây dựng HTTP web server đa luồng từ đầu với Rust - TCP, HTTP protocol, thread pool, và routing
keywords: [rust, project, web server, tcp, http, multithreading, thread pool, advanced, networking]
---

# 🌐 Multi-threaded Web Server

## 🎯 Mục Tiêu Dự Án

Xây dựng một **HTTP web server đa luồng** hoàn chỉnh từ đầu (không dùng framework) với các tính năng:
- 🔌 TCP listener và connection handling
- 📡 HTTP request/response parsing
- 🧵 Multi-threading với thread pool
- 🛣️ Routing system
- 📁 Serving static files
- ⚡ Concurrent request handling
- 🔒 Graceful shutdown

### Bạn Sẽ Học Được
- ✅ **Low-level networking** với `std::net::TcpListener`
- ✅ **HTTP protocol** cơ bản (requests, responses, headers)
- ✅ **Multi-threading** và concurrency
- ✅ **Thread pool pattern** để quản lý threads
- ✅ **Routing** và URL parsing
- ✅ **File I/O** và serving static content
- ✅ **Error handling** trong networking context
- ✅ **Graceful shutdown** với signals

## 📦 Bước 1: Tạo Project

```bash
cargo new web_server
cd web_server
```

## 🎮 Bước 2: Version 1 - Single-threaded TCP Server

Tạo server đơn giản nhất, chỉ xử lý 1 request tại một thời điểm:

```rust
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};

fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 1024];

    // Đọc request từ client
    stream.read(&mut buffer).unwrap();

    // In request ra console
    let request = String::from_utf8_lossy(&buffer[..]);
    println!("Request:\n{}", request);

    // Tạo HTTP response đơn giản
    let response = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h1>Hello from Rust!</h1>";

    // Gửi response
    stream.write_all(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    println!("🚀 Server đang chạy tại http://127.0.0.1:7878");

    for stream in listener.incoming() {
        let stream = stream.unwrap();
        handle_connection(stream);
    }
}
```

**Chạy thử:**
```bash
cargo run
```

Truy cập `http://127.0.0.1:7878` trong browser - bạn sẽ thấy "Hello from Rust!"

## 📖 Giải Thích Code

### 1. TCP Listener

```rust
let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
```
- `TcpListener::bind()`: Lắng nghe kết nối TCP trên địa chỉ và port
- `127.0.0.1`: localhost (chỉ truy cập từ máy local)
- `7878`: Port number (có thể dùng port nào cũng được > 1024)

### 2. Accept Connections

```rust
for stream in listener.incoming() {
    let stream = stream.unwrap();
    handle_connection(stream);
}
```
- `incoming()`: Iterator qua các incoming connections
- Mỗi `stream` là một `TcpStream` - kết nối với client
- **Blocking**: Server chờ và xử lý từng request tuần tự

### 3. HTTP Response Format

```rust
let response = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h1>Hello!</h1>";
```

HTTP response gồm 3 phần:
1. **Status line**: `HTTP/1.1 200 OK`
2. **Headers**: `Content-Type: text/html`
3. **Blank line**: `\r\n\r\n` (phân cách headers và body)
4. **Body**: `<h1>Hello!</h1>`

## 🎨 Bước 3: Version 2 - HTTP Request Parsing và Routing

Tạo struct để parse HTTP requests:

```rust
use std::io::{Read, Write, BufRead, BufReader};
use std::net::{TcpListener, TcpStream};
use std::fs;

#[derive(Debug)]
struct HttpRequest {
    method: String,
    path: String,
    version: String,
    headers: Vec<(String, String)>,
}

impl HttpRequest {
    fn parse(stream: &mut TcpStream) -> std::io::Result<Self> {
        let mut reader = BufReader::new(stream);

        // Đọc request line
        let mut request_line = String::new();
        reader.read_line(&mut request_line)?;

        let parts: Vec<&str> = request_line.trim().split_whitespace().collect();
        if parts.len() < 3 {
            return Err(std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                "Invalid request line"
            ));
        }

        let method = parts[0].to_string();
        let path = parts[1].to_string();
        let version = parts[2].to_string();

        // Đọc headers
        let mut headers = Vec::new();
        loop {
            let mut line = String::new();
            reader.read_line(&mut line)?;

            if line.trim().is_empty() {
                break; // Empty line = end of headers
            }

            if let Some(pos) = line.find(':') {
                let key = line[..pos].trim().to_string();
                let value = line[pos + 1..].trim().to_string();
                headers.push((key, value));
            }
        }

        Ok(HttpRequest {
            method,
            path,
            version,
            headers,
        })
    }
}

struct HttpResponse {
    status_code: u16,
    status_text: String,
    headers: Vec<(String, String)>,
    body: String,
}

impl HttpResponse {
    fn new(status_code: u16, status_text: &str, body: String) -> Self {
        let mut headers = vec![
            ("Content-Type".to_string(), "text/html; charset=utf-8".to_string()),
            ("Content-Length".to_string(), body.len().to_string()),
        ];

        HttpResponse {
            status_code,
            status_text: status_text.to_string(),
            headers,
            body,
        }
    }

    fn ok(body: String) -> Self {
        Self::new(200, "OK", body)
    }

    fn not_found() -> Self {
        Self::new(404, "Not Found", "<h1>404 Not Found</h1>".to_string())
    }

    fn to_bytes(&self) -> Vec<u8> {
        let mut response = format!(
            "HTTP/1.1 {} {}\r\n",
            self.status_code,
            self.status_text
        );

        for (key, value) in &self.headers {
            response.push_str(&format!("{}: {}\r\n", key, value));
        }

        response.push_str("\r\n");
        response.push_str(&self.body);

        response.into_bytes()
    }
}

fn route_request(request: &HttpRequest) -> HttpResponse {
    match (request.method.as_str(), request.path.as_str()) {
        ("GET", "/") => {
            let html = fs::read_to_string("static/index.html")
                .unwrap_or_else(|_| "<h1>Welcome to Rust Web Server!</h1>".to_string());
            HttpResponse::ok(html)
        },
        ("GET", "/about") => {
            HttpResponse::ok("<h1>About Page</h1><p>This is a Rust web server!</p>".to_string())
        },
        ("GET", "/hello") => {
            HttpResponse::ok("<h1>Hello, World!</h1>".to_string())
        },
        ("GET", path) if path.starts_with("/static/") => {
            // Serve static files
            let file_path = &path[1..]; // Remove leading '/'
            match fs::read_to_string(file_path) {
                Ok(content) => HttpResponse::ok(content),
                Err(_) => HttpResponse::not_found(),
            }
        },
        _ => HttpResponse::not_found(),
    }
}

fn handle_connection(mut stream: TcpStream) {
    match HttpRequest::parse(&mut stream) {
        Ok(request) => {
            println!("📥 {} {}", request.method, request.path);

            let response = route_request(&request);
            stream.write_all(&response.to_bytes()).unwrap();
            stream.flush().unwrap();
        },
        Err(e) => {
            eprintln!("❌ Error parsing request: {}", e);
        }
    }
}

fn main() {
    // Tạo thư mục static nếu chưa có
    fs::create_dir_all("static").ok();

    // Tạo index.html mẫu
    if !std::path::Path::new("static/index.html").exists() {
        fs::write("static/index.html", r#"
<!DOCTYPE html>
<html>
<head>
    <title>Rust Web Server</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; }
        h1 { color: #ce422b; }
        a { color: #ce422b; text-decoration: none; margin-right: 20px; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>🦀 Welcome to Rust Web Server!</h1>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/hello">Hello</a>
    </nav>
    <p>This is a simple HTTP server built from scratch with Rust!</p>
</body>
</html>
        "#).unwrap();
    }

    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    println!("🚀 Server running at http://127.0.0.1:7878");
    println!("📁 Serving static files from ./static/");

    for stream in listener.incoming() {
        let stream = stream.unwrap();
        handle_connection(stream);
    }
}
```

**Chạy thử:**
```bash
cargo run
```

Thử truy cập:
- `http://127.0.0.1:7878/` - Home page
- `http://127.0.0.1:7878/about` - About page
- `http://127.0.0.1:7878/hello` - Hello page
- `http://127.0.0.1:7878/notfound` - 404 page

## 🎨 Bước 4: Version 3 - Thread Pool cho Multi-threading

Tạo file `src/thread_pool.rs`:

```rust
use std::sync::{mpsc, Arc, Mutex};
use std::thread;

type Job = Box<dyn FnOnce() + Send + 'static>;

pub struct ThreadPool {
    workers: Vec<Worker>,
    sender: Option<mpsc::Sender<Job>>,
}

impl ThreadPool {
    pub fn new(size: usize) -> Result<ThreadPool, String> {
        if size == 0 {
            return Err("Thread pool size must be greater than 0".to_string());
        }

        let (sender, receiver) = mpsc::channel();
        let receiver = Arc::new(Mutex::new(receiver));

        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            workers.push(Worker::new(id, Arc::clone(&receiver)));
        }

        Ok(ThreadPool {
            workers,
            sender: Some(sender),
        })
    }

    pub fn execute<F>(&self, f: F)
    where
        F: FnOnce() + Send + 'static,
    {
        let job = Box::new(f);

        self.sender.as_ref().unwrap().send(job).unwrap();
    }
}

impl Drop for ThreadPool {
    fn drop(&mut self) {
        // Close the channel
        drop(self.sender.take());

        // Wait for all workers to finish
        for worker in &mut self.workers {
            println!("Shutting down worker {}", worker.id);

            if let Some(thread) = worker.thread.take() {
                thread.join().unwrap();
            }
        }
    }
}

struct Worker {
    id: usize,
    thread: Option<thread::JoinHandle<()>>,
}

impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || loop {
            let message = receiver.lock().unwrap().recv();

            match message {
                Ok(job) => {
                    println!("Worker {id} got a job; executing.");
                    job();
                },
                Err(_) => {
                    println!("Worker {id} disconnected; shutting down.");
                    break;
                }
            }
        });

        Worker {
            id,
            thread: Some(thread),
        }
    }
}
```

Cập nhật `src/main.rs` để sử dụng thread pool:

```rust
mod thread_pool;

use std::io::{BufRead, BufReader, Write};
use std::net::{TcpListener, TcpStream};
use std::fs;
use thread_pool::ThreadPool;

// ... (giữ nguyên HttpRequest, HttpResponse, route_request)

fn handle_connection(mut stream: TcpStream) {
    match HttpRequest::parse(&mut stream) {
        Ok(request) => {
            println!("📥 [{}] {} {}",
                std::thread::current().name().unwrap_or("unknown"),
                request.method,
                request.path
            );

            let response = route_request(&request);
            stream.write_all(&response.to_bytes()).unwrap();
            stream.flush().unwrap();
        },
        Err(e) => {
            eprintln!("❌ Error parsing request: {}", e);
        }
    }
}

fn main() {
    // Setup static files
    fs::create_dir_all("static").ok();

    if !std::path::Path::new("static/index.html").exists() {
        fs::write("static/index.html", r#"<!DOCTYPE html>
<html>
<head>
    <title>Rust Multi-threaded Web Server</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; }
        h1 { color: #ce422b; }
        .feature { background: #f0f0f0; padding: 15px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🦀 Rust Multi-threaded Web Server</h1>
    <div class="feature">
        <h3>✨ Features</h3>
        <ul>
            <li>Multi-threaded request handling</li>
            <li>HTTP request/response parsing</li>
            <li>Static file serving</li>
            <li>Custom routing</li>
        </ul>
    </div>
    <p>This server can handle multiple concurrent requests!</p>
</body>
</html>"#).unwrap();
    }

    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(4).unwrap();

    println!("🚀 Multi-threaded server running at http://127.0.0.1:7878");
    println!("🧵 Thread pool size: 4 workers");
    println!("📁 Serving static files from ./static/");
    println!("\nPress Ctrl+C to stop\n");

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        pool.execute(|| {
            handle_connection(stream);
        });
    }

    println!("🛑 Shutting down gracefully...");
}
```

## 🎨 Bước 5: Version 4 - Advanced Features

Tạo file `src/router.rs` với routing system hoàn chỉnh:

```rust
use std::collections::HashMap;
use std::sync::Arc;

type HandlerFn = Arc<dyn Fn(&HttpRequest) -> HttpResponse + Send + Sync>;

pub struct Router {
    routes: HashMap<(String, String), HandlerFn>, // (method, path) -> handler
}

impl Router {
    pub fn new() -> Self {
        Router {
            routes: HashMap::new(),
        }
    }

    pub fn add_route<F>(&mut self, method: &str, path: &str, handler: F)
    where
        F: Fn(&HttpRequest) -> HttpResponse + Send + Sync + 'static,
    {
        self.routes.insert(
            (method.to_uppercase(), path.to_string()),
            Arc::new(handler),
        );
    }

    pub fn get<F>(&mut self, path: &str, handler: F)
    where
        F: Fn(&HttpRequest) -> HttpResponse + Send + Sync + 'static,
    {
        self.add_route("GET", path, handler);
    }

    pub fn post<F>(&mut self, path: &str, handler: F)
    where
        F: Fn(&HttpRequest) -> HttpResponse + Send + Sync + 'static,
    {
        self.add_route("POST", path, handler);
    }

    pub fn route(&self, request: &HttpRequest) -> HttpResponse {
        let key = (request.method.clone(), request.path.clone());

        if let Some(handler) = self.routes.get(&key) {
            handler(request)
        } else {
            HttpResponse::not_found()
        }
    }
}

// Struct definitions từ version trước
#[derive(Debug, Clone)]
pub struct HttpRequest {
    pub method: String,
    pub path: String,
    pub version: String,
    pub headers: Vec<(String, String)>,
    pub body: String,
}

pub struct HttpResponse {
    pub status_code: u16,
    pub status_text: String,
    pub headers: Vec<(String, String)>,
    pub body: String,
}

impl HttpResponse {
    pub fn new(status_code: u16, status_text: &str, body: String) -> Self {
        HttpResponse {
            status_code,
            status_text: status_text.to_string(),
            headers: vec![
                ("Content-Type".to_string(), "text/html; charset=utf-8".to_string()),
                ("Content-Length".to_string(), body.len().to_string()),
            ],
            body,
        }
    }

    pub fn ok(body: String) -> Self {
        Self::new(200, "OK", body)
    }

    pub fn json(body: String) -> Self {
        let mut response = Self::new(200, "OK", body);
        response.headers[0].1 = "application/json".to_string();
        response
    }

    pub fn not_found() -> Self {
        Self::new(404, "Not Found", "<h1>404 Not Found</h1>".to_string())
    }

    pub fn to_bytes(&self) -> Vec<u8> {
        let mut response = format!(
            "HTTP/1.1 {} {}\r\n",
            self.status_code,
            self.status_text
        );

        for (key, value) in &self.headers {
            response.push_str(&format!("{}: {}\r\n", key, value));
        }

        response.push_str("\r\n");
        response.push_str(&self.body);

        response.into_bytes()
    }
}
```

Main file với advanced features:

```rust
mod thread_pool;
mod router;

use std::io::{BufRead, BufReader, Write};
use std::net::{TcpListener, TcpStream};
use std::sync::Arc;
use thread_pool::ThreadPool;
use router::{Router, HttpRequest, HttpResponse};

impl HttpRequest {
    fn parse(stream: &mut TcpStream) -> std::io::Result<Self> {
        let mut reader = BufReader::new(stream);

        let mut request_line = String::new();
        reader.read_line(&mut request_line)?;

        let parts: Vec<&str> = request_line.trim().split_whitespace().collect();
        if parts.len() < 3 {
            return Err(std::io::Error::new(
                std::io::ErrorKind::InvalidData,
                "Invalid request line"
            ));
        }

        let method = parts[0].to_string();
        let path = parts[1].to_string();
        let version = parts[2].to_string();

        let mut headers = Vec::new();
        let mut content_length = 0;

        loop {
            let mut line = String::new();
            reader.read_line(&mut line)?;

            if line.trim().is_empty() {
                break;
            }

            if let Some(pos) = line.find(':') {
                let key = line[..pos].trim().to_string();
                let value = line[pos + 1..].trim().to_string();

                if key.to_lowercase() == "content-length" {
                    content_length = value.parse().unwrap_or(0);
                }

                headers.push((key, value));
            }
        }

        let mut body = String::new();
        if content_length > 0 {
            let mut buffer = vec![0; content_length];
            reader.read_exact(&mut buffer)?;
            body = String::from_utf8_lossy(&buffer).to_string();
        }

        Ok(HttpRequest {
            method,
            path,
            version,
            headers,
            body,
        })
    }
}

fn setup_routes() -> Router {
    let mut router = Router::new();

    router.get("/", |_req| {
        HttpResponse::ok(r#"
<!DOCTYPE html>
<html>
<head>
    <title>Rust Web Server</title>
    <style>
        body { font-family: Arial; max-width: 800px; margin: 50px auto; }
        h1 { color: #ce422b; }
        .endpoint { background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 5px; }
        code { background: #e0e0e0; padding: 2px 5px; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>🦀 Rust Multi-threaded Web Server</h1>
    <h2>Available Endpoints:</h2>
    <div class="endpoint"><code>GET /</code> - This page</div>
    <div class="endpoint"><code>GET /api/status</code> - Server status (JSON)</div>
    <div class="endpoint"><code>GET /api/time</code> - Current server time (JSON)</div>
    <div class="endpoint"><code>GET /hello/:name</code> - Personalized greeting</div>
</body>
</html>
        "#.to_string())
    });

    router.get("/api/status", |_req| {
        let json = r#"{"status": "ok", "server": "Rust Web Server", "version": "1.0"}"#;
        HttpResponse::json(json.to_string())
    });

    router.get("/api/time", |_req| {
        use std::time::{SystemTime, UNIX_EPOCH};
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();
        let json = format!(r#"{{"timestamp": {}, "readable": "{}"}}"#, now, chrono::Local::now().format("%Y-%m-%d %H:%M:%S"));
        HttpResponse::json(json)
    });

    router
}

fn handle_connection(mut stream: TcpStream, router: Arc<Router>) {
    match HttpRequest::parse(&mut stream) {
        Ok(request) => {
            println!("📥 {} {}", request.method, request.path);

            let response = router.route(&request);
            stream.write_all(&response.to_bytes()).unwrap();
            stream.flush().unwrap();
        },
        Err(e) => {
            eprintln!("❌ Error: {}", e);
        }
    }
}

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(4).unwrap();
    let router = Arc::new(setup_routes());

    println!("🚀 Server running at http://127.0.0.1:7878");
    println!("🧵 Thread pool: 4 workers");
    println!("\nPress Ctrl+C to stop\n");

    for stream in listener.incoming() {
        let stream = stream.unwrap();
        let router = Arc::clone(&router);

        pool.execute(move || {
            handle_connection(stream, router);
        });
    }
}
```

Thêm dependencies vào `Cargo.toml`:

```toml
[dependencies]
chrono = "0.4"
```

## 🐛 Lỗi Thường Gặp

### Lỗi 1: Address Already in Use

```rust
// ❌ Port đã được dùng bởi process khác
Error: Address already in use (os error 98)

// ✅ Giải pháp:
// 1. Dùng port khác
let listener = TcpListener::bind("127.0.0.1:8080").unwrap();

// 2. Hoặc kill process đang dùng port
// Linux/Mac: lsof -i :7878 | grep LISTEN
// Windows: netstat -ano | findstr :7878
```

### Lỗi 2: Broken Pipe

```rust
// ❌ Client đóng connection trước khi server gửi response
stream.write_all(&response).unwrap(); // Panic!

// ✅ Xử lý error gracefully
match stream.write_all(&response) {
    Ok(_) => println!("Response sent"),
    Err(e) => eprintln!("Failed to send response: {}", e),
}
```

### Lỗi 3: Thread Pool Size = 0

```rust
// ❌ Không thể tạo thread pool size 0
let pool = ThreadPool::new(0); // Panic!

// ✅ Validate input
pub fn new(size: usize) -> Result<ThreadPool, String> {
    if size == 0 {
        return Err("Size must be > 0".to_string());
    }
    // ...
}
```

### Lỗi 4: Sharing Mutable State

```rust
// ❌ Không thể share mutable state giữa threads
let mut counter = 0;
pool.execute(|| {
    counter += 1; // Error: cannot capture mutable variable
});

// ✅ Dùng Arc<Mutex<T>>
use std::sync::{Arc, Mutex};
let counter = Arc::new(Mutex::new(0));
let counter_clone = Arc::clone(&counter);
pool.execute(move || {
    let mut num = counter_clone.lock().unwrap();
    *num += 1;
});
```

## 💪 Thử Thách Nâng Cao

### Thử Thách 1: HTTPS Support

Thêm TLS/SSL với `rustls`:

<details>
<summary>💡 Gợi ý</summary>

```rust
use rustls::{ServerConfig, NoClientAuth};
use std::sync::Arc;

let mut config = ServerConfig::new(NoClientAuth::new());
config.set_single_cert(certs, key)?;

let acceptor = TlsAcceptor::from(Arc::new(config));
let stream = acceptor.accept(tcp_stream)?;
```
</details>

### Thử Thách 2: WebSocket Support

Implement WebSocket protocol để support real-time communication.

### Thử Thách 3: HTTP/2 Support

Upgrade lên HTTP/2 với multiplexing và server push.

### Thử Thách 4: Request Logging Middleware

```rust
fn logging_middleware(request: &HttpRequest) {
    let timestamp = chrono::Local::now();
    println!("[{}] {} {} - {}",
        timestamp.format("%Y-%m-%d %H:%M:%S"),
        request.method,
        request.path,
        request.headers.get("user-agent").unwrap_or("unknown")
    );
}
```

### Thử Thách 5: Rate Limiting

Giới hạn số requests từ mỗi IP trong một khoảng thời gian.

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::collections::HashMap;
use std::time::Instant;

struct RateLimiter {
    requests: Arc<Mutex<HashMap<String, Vec<Instant>>>>,
    max_requests: usize,
    window: Duration,
}
```
</details>

## 📚 Kiến Thức Đã Học

✅ **TCP Networking**: Socket programming với `std::net`
✅ **HTTP Protocol**: Request/response format, headers, status codes
✅ **Multi-threading**: Thread pool pattern, concurrent request handling
✅ **Channels**: Message passing với `mpsc`
✅ **Synchronization**: Arc, Mutex cho shared state
✅ **Routing**: URL matching và handler functions
✅ **Graceful Shutdown**: Cleanup resources properly
✅ **Error Handling**: Network errors, parsing errors

## 🔒 Security Best Practices

1. **Input Validation**: Luôn validate và sanitize user input
2. **Path Traversal**: Prevent `../../` attacks khi serve files
3. **DoS Protection**: Rate limiting, request size limits
4. **Error Messages**: Không expose internal details
5. **HTTPS**: Dùng TLS cho production

## ⚡ Performance Considerations

1. **Thread Pool Size**: Điều chỉnh dựa trên số CPU cores
2. **Buffer Sizes**: Optimize buffer allocation
3. **Connection Pooling**: Reuse connections khi có thể
4. **Async I/O**: Consider async/await với Tokio cho scale lớn hơn

## 🚀 Deployment Tips

```bash
# Build release version
cargo build --release

# Binary ở ./target/release/web_server

# Run với port 80 (cần sudo/admin)
sudo ./target/release/web_server

# Run as systemd service (Linux)
# Tạo /etc/systemd/system/web-server.service
```

## 🧪 Testing

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_http_response_format() {
        let response = HttpResponse::ok("Hello".to_string());
        let bytes = response.to_bytes();
        let text = String::from_utf8(bytes).unwrap();

        assert!(text.starts_with("HTTP/1.1 200 OK"));
        assert!(text.contains("Content-Length: 5"));
        assert!(text.ends_with("Hello"));
    }

    #[test]
    fn test_router() {
        let mut router = Router::new();
        router.get("/test", |_| HttpResponse::ok("OK".to_string()));

        let request = HttpRequest {
            method: "GET".to_string(),
            path: "/test".to_string(),
            version: "HTTP/1.1".to_string(),
            headers: vec![],
            body: String::new(),
        };

        let response = router.route(&request);
        assert_eq!(response.status_code, 200);
    }
}
```

## 🎯 Bước Tiếp Theo

➡️ **Tiếp theo**: [REST API với Actix-Web](rest-api.md)
➡️ **Hoặc**: [Real-time Chat Application](chat-app.md)
➡️ **Quay lại**: [Mini Grep Tool](grep-clone.md)

---

🎉 **Xuất sắc! Bạn đã xây dựng một multi-threaded web server hoàn chỉnh!** 🌐
