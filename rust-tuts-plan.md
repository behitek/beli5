# 🦀 Kế Hoạch Hướng Dẫn Rust - Phong Cách ELI5

> **Chủ đề**: Rust như "Đồ Bảo Hộ An Toàn Tối Ưu" 🛡️
> **Đối tượng**: Người Việt mới bắt đầu, học sinh, người học muốn lập trình an toàn
> **Phong cách**: Giải thích như cho bạn 5 tuổi (ELI5)

## 📊 Tổng Quan Cấu Trúc

### Thư mục: `docs-rust/`
### Sidebar: `sidebars-rust.js`
### Route: `/rust`

---

## 🎯 1. Trang Giới Thiệu (Intro)

- [ ] **intro.md** - Giới Thiệu Rust: Đồ Bảo Hộ An Toàn Của Lập Trình
  - Rust là gì? (So sánh với đồ bảo hộ cho công nhân xây dựng)
  - Tại sao học Rust? (An toàn, nhanh, được tin dùng)
  - Ai đang dùng Rust? (Firefox, Discord, Dropbox)
  - Lộ trình học Rust từ cơ bản đến nâng cao

---

## 🟢 2. Cơ Bản Siêu Dễ (basics/)

### Khởi Đầu
- [x] **basics/what-is-rust.md** - Rust Là Gì? Tại Sao Nó Đặc Biệt?
  - Lịch sử Rust đơn giản
  - Rust vs Python, Java, C++
  - Ví dụ thực tế về an toàn bộ nhớ
  - Mozilla và cộng đồng Rust

- [x] **basics/installing-rust.md** - Cài Đặt Rust và Công Cụ
  - Cài rustup (công cụ quản lý Rust)
  - Cài đặt trên Windows, Mac, Linux
  - Kiểm tra cài đặt: `rustc --version`, `cargo --version`
  - Thiết lập VS Code / RustRover

- [x] **basics/cargo-basics.md** - Cargo - Trợ Thủ Đắc Lực Của Rust
  - Cargo là gì? (Như npm cho Node.js)
  - Tạo project mới: `cargo new`, `cargo init`
  - Cấu trúc thư mục Rust project
  - Chạy code: `cargo run`, `cargo build`
  - Cargo.toml - File cấu hình quan trọng

- [x] **basics/first-program.md** - Chương Trình Rust Đầu Tiên: Hello, World!
  - Viết Hello World
  - Giải thích từng dòng code
  - Compile và chạy chương trình
  - Hiểu lỗi compiler cơ bản

- [x] **basics/printing-output.md** - In Thông Tin Ra Màn Hình
  - `println!` macro - Dấu chấm than nghĩa là gì?
  - Format strings: `{}`, `{:?}`, `{:#?}`
  - In nhiều giá trị cùng lúc
  - `print!` vs `println!`

- [x] **basics/comments.md** - Viết Ghi Chú Trong Code
  - Comment một dòng: `//`
  - Comment nhiều dòng: `/* */`
  - Doc comments: `///` và `//!`
  - Best practices cho comments

### Biến và Kiểu Dữ Liệu
- [x] **basics/variables-and-mutability.md** - Biến Trong Rust: Không Thay Đổi Theo Mặc Định!
  - Khai báo biến: `let`
  - Immutable vs Mutable: `let` vs `let mut`
  - Tại sao mặc định immutable? (An toàn!)
  - Shadowing - Khi nào dùng?

- [x] **basics/data-types.md** - Các Kiểu Dữ Liệu Cơ Bản
  - Integers: i32, u32, i64, u64, isize, usize
  - Floats: f32, f64
  - Boolean: true, false
  - Characters: 'a', '😊' (Unicode!)
  - Type inference vs explicit types

- [x] **basics/strings-basics.md** - Chuỗi Ký Tự: String vs &str
  - String literals: `"Hello"`
  - String type: `String::from()`
  - String slices: `&str`
  - Sự khác biệt quan trọng giữa String và &str

- [x] **basics/arithmetic-operations.md** - Tính Toán Cơ Bản
  - Cộng, trừ, nhân, chia: `+`, `-`, `*`, `/`
  - Chia lấy dư: `%`
  - Type casting: `as`
  - Overflow và cách Rust xử lý

- [x] **basics/boolean-and-logic.md** - Logic Đúng/Sai
  - Boolean operations: `&&`, `||`, `!`
  - Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
  - Thứ tự ưu tiên của operators

### Nhập Dữ Liệu
- [x] **basics/input-output.md** - Nhận Thông Tin Từ Người Dùng
  - Đọc input từ console
  - Module `std::io`
  - `read_line()` và xử lý Result
  - Chuyển đổi String thành số

### Xử Lý Lỗi Cơ Bản
- [x] **basics/error-basics.md** - Lỗi Là Bạn, Không Phải Kẻ Thù!
  - Compiler errors - Rust giúp bạn sửa lỗi
  - Runtime errors
  - Đọc hiểu error messages
  - Tìm và sửa lỗi thường gặp

---

## 🟡 3. Trung Bình Thú Vị (intermediate/)

### Control Flow
- [x] **intermediate/if-else.md** - Câu Lệnh Điều Kiện: Nếu... Thì...
  - if, else if, else
  - if expressions (trả về giá trị!)
  - Nested conditions
  - Pattern với boolean logic

- [x] **intermediate/match.md** - Match: If-Else Siêu Cấp!
  - Match expressions
  - Pattern matching cơ bản
  - Match với numbers, strings
  - `_` wildcard pattern

### Loops
- [x] **intermediate/loop-basic.md** - Lặp Lại Công Việc: loop
  - `loop` - lặp vô hạn
  - `break` và `continue`
  - Trả về giá trị từ loop
  - Labels cho nested loops

- [x] **intermediate/while-loop.md** - While: Lặp Khi Điều Kiện Đúng
  - While loops
  - While vs loop với break
  - Tránh infinite loops

- [x] **intermediate/for-loop.md** - For: Lặp Qua Dãy Số và Mảng
  - For loops với ranges: `0..5`, `0..=5`
  - Iterate qua arrays
  - `.iter()`, `.iter_mut()`, `.into_iter()`
  - Enumerate với index

### Collections
- [x] **intermediate/arrays.md** - Mảng: Danh Sách Có Độ Dài Cố Định
  - Khai báo arrays
  - Truy cập elements
  - Fixed size - Ưu và nhược điểm
  - Array slices

- [x] **intermediate/vectors.md** - Vector: Danh Sách Có Thể Mở Rộng
  - Tạo vectors: `vec![]`, `Vec::new()`
  - Push, pop, insert, remove
  - Truy cập elements an toàn: `.get()`
  - Iterate qua vectors

- [x] **intermediate/tuples.md** - Tuple: Gói Nhiều Giá Trị Lại
  - Tạo tuples
  - Destructuring tuples
  - Truy cập elements: `.0`, `.1`
  - Khi nào dùng tuples?

### Functions
- [x] **intermediate/functions-basics.md** - Hàm: Đóng Gói Code Có Thể Tái Sử Dụng
  - Định nghĩa functions
  - Parameters và arguments
  - Return values
  - Expression vs statement

- [x] **intermediate/function-parameters.md** - Tham Số Hàm: Truyền Dữ Liệu Vào
  - Multiple parameters
  - Type annotations bắt buộc
  - Mutable parameters
  - Pass by value vs reference (preview)

- [x] **intermediate/closures.md** - Closures: Hàm Ẩn Danh
  - Syntax của closures
  - Capturing environment
  - Closures vs functions
  - Sử dụng với iterators

### String Manipulation
- [x] **intermediate/string-methods.md** - Làm Việc Với Chuỗi
  - `.len()`, `.is_empty()`
  - `.to_uppercase()`, `.to_lowercase()`
  - `.trim()`, `.split()`
  - String concatenation: `+`, `format!`

- [x] **intermediate/string-slicing.md** - Cắt Chuỗi và Indexing
  - String slicing: `&s[0..5]`
  - UTF-8 và vấn đề indexing
  - `.chars()` và `.bytes()`
  - Safe string manipulation

---

## 🔴 4. Nâng Cao Pro (advanced/)

### Ownership - Trái Tim Của Rust
- [x] **advanced/ownership-basics.md** - Ownership: Chỉ Có Một Chủ!
  - Ba quy tắc ownership
  - Move semantics
  - Scope và drop
  - Ví dụ với String và integers

- [x] **advanced/borrowing.md** - Mượn Dữ Liệu: Borrowing
  - References: `&T` và `&mut T`
  - Immutable borrowing
  - Mutable borrowing
  - Quy tắc: Một &mut HOẶC nhiều &

- [x] **advanced/slices.md** - Slices: Xem Một Phần Dữ Liệu
  - String slices: `&str`
  - Array slices: `&[T]`
  - Slices và ownership
  - Practical examples

- [x] **advanced/lifetimes.md** - Lifetimes: Dữ Liệu Sống Bao Lâu?
  - Lifetime annotations: `'a`
  - Lifetime trong functions
  - Lifetime trong structs
  - Lifetime elision rules

### Structs và Enums
- [x] **advanced/structs-basics.md** - Structs: Tạo Kiểu Dữ Liệu Riêng
  - Định nghĩa structs
  - Creating instances
  - Accessing fields
  - Method syntax: `impl`

- [x] **advanced/struct-methods.md** - Methods: Hàm Bên Trong Struct
  - `impl` blocks
  - `&self`, `&mut self`, `self`
  - Associated functions
  - Multiple impl blocks

- [x] **advanced/enums.md** - Enums: Một Trong Nhiều Khả Năng
  - Defining enums
  - Enum variants với data
  - Match với enums
  - Option và Result (preview)

- [x] **advanced/option.md** - Option: Có Hoặc Không Có
  - `Option<T>`: Some và None
  - Tại sao không có null?
  - Pattern matching với Option
  - `.unwrap()`, `.expect()`, và cách an toàn hơn

- [x] **advanced/result.md** - Result: Thành Công Hay Lỗi?
  - `Result<T, E>`: Ok và Err
  - Error handling với match
  - `?` operator - Cú pháp ngắn gọn
  - Creating custom errors

### Error Handling
- [x] **advanced/error-handling-advanced.md** - Xử Lý Lỗi Chuyên Nghiệp
  - `panic!` vs Result
  - Khi nào dùng panic?
  - Propagating errors với `?`
  - Custom error types

- [x] **advanced/thiserror-anyhow.md** - Thư Viện Xử Lý Lỗi: thiserror & anyhow
  - Crate thiserror cho library code
  - Crate anyhow cho application code
  - Kết hợp nhiều loại errors
  - Best practices

### Generics và Traits
- [x] **advanced/generics.md** - Generics: Code Cho Nhiều Kiểu Dữ Liệu
  - Generic functions
  - Generic structs
  - Generic enums
  - Constraints với traits

- [x] **advanced/traits.md** - Traits: Hành Vi Chung
  - Defining traits
  - Implementing traits
  - Trait bounds
  - Default implementations

- [x] **advanced/trait-objects.md** - Trait Objects: Dynamic Dispatch
  - `dyn Trait`
  - Box<dyn Trait>
  - Static vs dynamic dispatch
  - Object safety

### Modules và Packages
- [x] **advanced/modules.md** - Modules: Tổ Chức Code
  - Module system
  - `mod` keyword
  - `pub` visibility
  - Nested modules

- [x] **advanced/packages-crates.md** - Packages và Crates
  - Workspace structure
  - Binary vs library crates
  - Dependencies trong Cargo.toml
  - Publishing crates

- [x] **advanced/use-and-paths.md** - Import và Paths
  - `use` keyword
  - Absolute vs relative paths
  - `pub use` - Re-exporting
  - `use` idioms

### Collections Nâng Cao
- [ ] **advanced/hashmap.md** - HashMap: Từ Điển Key-Value
  - Creating HashMaps
  - Insert, get, remove
  - Iteration
  - Updating values

- [ ] **advanced/hashset.md** - HashSet: Tập Hợp Duy Nhất
  - Creating sets
  - Union, intersection, difference
  - Checking membership
  - Practical uses

### Iterators
- [ ] **advanced/iterators.md** - Iterators: Xử Lý Dãy Dữ Liệu Hiệu Quả
  - Iterator trait
  - `.map()`, `.filter()`, `.collect()`
  - `.fold()`, `.sum()`
  - Lazy evaluation

- [ ] **advanced/iterator-adapters.md** - Iterator Adapters Nâng Cao
  - `.zip()`, `.enumerate()`
  - `.take()`, `.skip()`
  - `.chain()`, `.flatten()`
  - Creating custom iterators

### Smart Pointers
- [ ] **advanced/box.md** - Box: Con Trỏ Thông Minh
  - Heap allocation với Box
  - Recursive types
  - Deref trait
  - Khi nào dùng Box?

- [ ] **advanced/rc-arc.md** - Rc và Arc: Chia Sẻ Ownership
  - Reference counting với Rc
  - Thread-safe với Arc
  - Weak references
  - Memory leaks và cách tránh

- [ ] **advanced/refcell.md** - RefCell: Interior Mutability
  - `.borrow()` và `.borrow_mut()`
  - Runtime borrow checking
  - Rc<RefCell<T>> pattern
  - When to use?

### Concurrency
- [ ] **advanced/threads.md** - Threads: Chạy Đa Nhiệm
  - Creating threads
  - `thread::spawn`
  - Joining threads
  - Thread safety

- [ ] **advanced/message-passing.md** - Message Passing: Giao Tiếp Giữa Threads
  - Channels: `mpsc`
  - Sending và receiving
  - Multiple producers
  - Synchronous vs asynchronous

- [ ] **advanced/shared-state.md** - Shared State: Mutex và RwLock
  - `Mutex<T>` - Khóa để truy cập
  - `Arc<Mutex<T>>` pattern
  - `RwLock<T>` - Multiple readers
  - Deadlocks và cách tránh

### Async Programming
- [ ] **advanced/async-basics.md** - Async/Await: Lập Trình Bất Đồng Bộ
  - `async fn`
  - `.await` keyword
  - Futures
  - Tokio runtime (giới thiệu)

- [ ] **advanced/async-tokio.md** - Tokio: Async Runtime Phổ Biến
  - Setting up Tokio
  - `#[tokio::main]`
  - Async tasks
  - Select và timeout

### Testing
- [ ] **advanced/unit-testing.md** - Unit Testing: Kiểm Tra Code
  - `#[test]` attribute
  - `assert!`, `assert_eq!`, `assert_ne!`
  - `cargo test`
  - Test organization

- [ ] **advanced/integration-testing.md** - Integration Testing
  - Tests directory
  - Testing public API
  - Common test utilities
  - Test coverage

### Macros
- [ ] **advanced/declarative-macros.md** - Declarative Macros: Viết Code Sinh Code
  - `macro_rules!`
  - Pattern matching
  - Creating reusable macros
  - Common macro patterns

---

## 🎮 5. Dự Án Thực Hành (projects/)

### Beginner Projects
- [ ] **projects/guessing-game.md** - Trò Chơi Đoán Số
  - Random number generation
  - User input handling
  - Loop và match
  - Error handling

- [ ] **projects/calculator.md** - Máy Tính Đơn Giản
  - Arithmetic operations
  - Input parsing
  - Error handling
  - Match expressions

- [ ] **projects/temperature-converter.md** - Chuyển Đổi Nhiệt Độ
  - Celsius ↔ Fahrenheit ↔ Kelvin
  - Functions
  - User interface
  - Input validation

- [ ] **projects/fizzbuzz.md** - FizzBuzz Challenge
  - Loops và conditions
  - Modulo operator
  - Printing patterns
  - Code organization

### Intermediate Projects
- [ ] **projects/todo-cli.md** - Ứng Dụng Todo Command Line
  - Vectors để lưu tasks
  - File I/O - Lưu và đọc file
  - Command parsing
  - CRUD operations

- [ ] **projects/password-generator.md** - Tạo Mật Khẩu Ngẫu Nhiên
  - Random generation
  - Character sets
  - Customization options
  - Clipboard integration (bonus)

- [ ] **projects/markdown-parser.md** - Chuyển Markdown Thành HTML
  - String manipulation
  - Pattern matching
  - File reading/writing
  - Testing với examples

- [ ] **projects/grep-clone.md** - Tự Làm Grep (Tìm Kiếm File)
  - Command-line arguments
  - File reading
  - String searching
  - Error handling

### Advanced Projects
- [ ] **projects/web-server.md** - Web Server Đơn Giản
  - TCP listeners
  - HTTP basics
  - Request/response handling
  - Multi-threading

- [ ] **projects/rest-api.md** - REST API Với Actix/Axum
  - Web framework
  - JSON serialization
  - Database connection
  - CRUD endpoints

- [ ] **projects/chat-app.md** - Ứng Dụng Chat Real-time
  - WebSocket
  - Message broadcasting
  - User management
  - Async programming

- [ ] **projects/cli-tool.md** - CLI Tool Với Clap
  - Argument parsing
  - Subcommands
  - Configuration files
  - Error messages

---

## 💪 6. Bài Tập Luyện Tập (practice/)

- [ ] **practice/basic-exercises.md** - Bài Tập Cơ Bản
  - Variables và data types
  - Arithmetic operations
  - String manipulation
  - Control flow

- [ ] **practice/ownership-exercises.md** - Bài Tập Ownership
  - Move semantics
  - Borrowing
  - References
  - Common patterns

- [ ] **practice/struct-enum-exercises.md** - Bài Tập Struct và Enum
  - Defining types
  - Implementing methods
  - Pattern matching
  - Real-world examples

- [ ] **practice/iterator-exercises.md** - Bài Tập Iterators
  - Map, filter, collect
  - Chain operations
  - Custom iterators
  - Performance optimization

- [ ] **practice/error-handling-exercises.md** - Bài Tập Xử Lý Lỗi
  - Result và Option
  - `?` operator
  - Custom errors
  - Error propagation

- [ ] **practice/concurrency-exercises.md** - Bài Tập Concurrency
  - Threads
  - Message passing
  - Shared state
  - Race conditions

- [ ] **practice/async-exercises.md** - Bài Tập Async
  - Async functions
  - Tokio tasks
  - Error handling
  - Real-world scenarios

---

## 📚 7. Tài Liệu Tham Khảo (reference/)

- [ ] **reference/rust-cheatsheet.md** - Bảng Tra Cứu Nhanh Rust
  - Syntax overview
  - Common patterns
  - Quick references
  - Code snippets

- [ ] **reference/std-library.md** - Thư Viện Chuẩn Phổ Biến
  - Collections
  - I/O
  - Filesystem
  - Networking

- [ ] **reference/cargo-commands.md** - Lệnh Cargo Thường Dùng
  - Build và run
  - Testing
  - Documentation
  - Publishing

- [ ] **reference/popular-crates.md** - Crates Phổ Biến
  - serde (serialization)
  - tokio (async)
  - clap (CLI)
  - reqwest (HTTP)
  - sqlx (database)

- [ ] **reference/best-practices.md** - Best Practices Rust
  - Code organization
  - Error handling patterns
  - Performance tips
  - Security considerations

- [ ] **reference/compiler-errors.md** - Hiểu Lỗi Compiler
  - Common error messages
  - How to read errors
  - Fixing strategies
  - Learning from errors

- [ ] **reference/ownership-patterns.md** - Ownership Patterns
  - Common borrowing patterns
  - When to use Clone
  - Smart pointer patterns
  - Builder pattern

- [ ] **reference/performance-tips.md** - Tối Ưu Hiệu Năng
  - Zero-cost abstractions
  - Profiling tools
  - Common bottlenecks
  - Memory optimization

---

## 📖 8. Từ Điển Thuật Ngữ (glossary/)

- [ ] **glossary/rust-specific.md** - Thuật Ngữ Rust
  - Ownership, borrowing, lifetime
  - Trait, impl, dyn
  - Macro, crate, cargo
  - Unsafe, FFI

- [ ] **glossary/programming-terms.md** - Thuật Ngữ Lập Trình Chung
  - Variable, function, type
  - Compile, runtime
  - Memory, stack, heap
  - Concurrency, parallelism

- [ ] **glossary/data-structures.md** - Cấu Trúc Dữ Liệu
  - Vector, HashMap, HashSet
  - Array, slice, tuple
  - String, str
  - Box, Rc, Arc

- [ ] **glossary/rust-ecosystem.md** - Hệ Sinh Thái Rust
  - Rustup, rustc, cargo
  - Crates.io
  - Rust Foundation
  - Community resources

---

## 🆘 9. Trợ Giúp & Mẹo Hay (support/)

- [ ] **help-and-tips.md** - Trợ Giúp Và Mẹo Học Rust
  - Cách học hiệu quả
  - Resources bổ sung
  - Community hỗ trợ
  - Common pitfalls

- [ ] **debugging-tips.md** - Mẹo Debug Code Rust
  - Using println! debugging
  - VS Code debugger
  - Understanding compiler messages
  - Common mistakes

---

## 🚀 10. Bước Tiếp Theo (next-steps/)

- [ ] **whats-next.md** - Tiếp Tục Hành Trình Rust
  - Advanced topics to explore
  - Specialized domains (web, systems, embedded)
  - Contributing to open source
  - Building portfolio projects

---

## 📊 Thống Kê

**Tổng số bài viết cần viết**: ~110 bài

### Phân bổ:
- 🟢 **Cơ Bản (Basics)**: ~20 bài
- 🟡 **Trung Bình (Intermediate)**: ~18 bài
- 🔴 **Nâng Cao (Advanced)**: ~42 bài
- 🎮 **Dự Án (Projects)**: ~12 bài
- 💪 **Luyện Tập (Practice)**: ~7 bài
- 📚 **Tham Khảo (Reference)**: ~8 bài
- 📖 **Từ Điển (Glossary)**: ~4 bài

---

## 🎯 Nguyên Tắc Viết Nội Dung ELI5 Cho Rust

### 1. Sử Dụng Ẩn Dụ "Đồ Bảo Hộ An Toàn"
- **Ownership**: Như mũ bảo hiểm - chỉ một người đội được
- **Borrowing**: Như mượn đồ - phải trả lại, không làm hỏng
- **Lifetime**: Như hạn sử dụng của đồ bảo hộ
- **Type system**: Như kiểm tra đồ bảo hộ trước khi vào công trường

### 2. Giải Thích Tại Sao Rust Khác Biệt
- Không có garbage collector - tại sao đây là điều tốt?
- Compiler nghiêm ngặt - như người thầy tốt, chỉ ra lỗi trước
- Zero-cost abstractions - an toàn mà không chậm

### 3. So Sánh Với Ngôn Ngữ Khác
- Rust vs C/C++: An toàn hơn nhưng vẫn nhanh
- Rust vs Python/Java: Phức tạp hơn nhưng không lo lỗi bộ nhớ
- Rust vs Go: Khác nhau về cách xử lý memory

### 4. Ví Dụ Thực Tế Việt Nam
- Xây nhà cần đồ bảo hộ (an toàn)
- Mượn xe bạn (borrowing)
- Sở hữu đất đai (ownership)
- Hạn sử dụng thực phẩm (lifetime)

### 5. Tone Khuyến Khích
- "Compiler báo lỗi là điều TỐT! Nó giúp bạn tránh bug!"
- "Ownership có vẻ khó lúc đầu, nhưng sau khi hiểu, bạn sẽ thích!"
- "Đừng lo nếu code không compile ngay - đây là bình thường!"
- "Rust khó hơn Python, nhưng bạn sẽ viết code an toàn hơn!"

### 6. Cấu Trúc Mỗi Bài
1. **Mục tiêu** - Học gì trong bài này?
2. **Tại sao quan trọng** - Liên quan gì đến thực tế?
3. **Ví dụ đơn giản** - Code dễ hiểu nhất
4. **Giải thích chi tiết** - Từng dòng code
5. **Lỗi thường gặp** - Và cách sửa
6. **Bài tập** - Thực hành ngay
7. **Tóm tắt** - Những điểm chính

### 7. Xử Lý Khái Niệm Khó
- **Ownership**: Giải thích qua 3-4 bài, không gộp chung
- **Lifetime**: Bắt đầu từ ví dụ đơn giản, tránh syntax phức tạp
- **Traits**: So sánh với interface trong Java
- **Macros**: Để cuối, không bắt buộc cho beginner

---

## 🗓️ Đề Xuất Lộ Trình Thực Hiện

### Phase 1: Foundation (Tuần 1-2)
- Intro và basics (20 bài đầu)
- Setup environment
- First programs

### Phase 2: Core Concepts (Tuần 3-4)
- Intermediate topics
- Control flow, collections, functions
- 2-3 beginner projects

### Phase 3: Ownership Deep Dive (Tuần 5-6)
- Advanced ownership topics
- Borrowing, lifetimes
- Practical examples

### Phase 4: Advanced Topics (Tuần 7-10)
- Traits, generics
- Error handling
- Concurrency
- 2-3 intermediate projects

### Phase 5: Real-World (Tuần 11-12)
- Advanced projects
- Best practices
- Reference materials
- Polishing và review

---

## ✅ Checklist Trước Khi Publish Mỗi Bài

- [ ] Có frontmatter đầy đủ (title, description, keywords)
- [ ] Code examples đã test và chạy được
- [ ] Có giải thích bằng tiếng Việt đơn giản
- [ ] Có ví dụ thực tế dễ hiểu
- [ ] Có section "Lỗi thường gặp"
- [ ] Có bài tập cuối bài
- [ ] Emoji phù hợp với nội dung
- [ ] Links đến bài trước/sau nếu cần
- [ ] Đã thêm vào sidebar tương ứng

---

## 🔗 Tài Nguyên Tham Khảo

- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings](https://github.com/rust-lang/rustlings)
- [Comprehensive Rust](https://google.github.io/comprehensive-rust/)
- [Rust for Rustaceans](https://rust-for-rustaceans.com/)

---

**Ghi chú**: File này sẽ được cập nhật theo tiến độ. Đánh dấu ✅ khi hoàn thành mỗi bài.
