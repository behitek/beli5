---
sidebar_position: 15
title: "Modules: Tổ Chức Code"
description: "Tìm hiểu cách sử dụng modules để tổ chức code trong Rust"
---

# 📁 Modules: Tổ Chức Code

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được module system trong Rust
- ✅ Sử dụng `mod` keyword
- ✅ Kiểm soát visibility với `pub`
- ✅ Tạo nested modules
- ✅ Tổ chức code với files và folders
- ✅ Áp dụng best practices

## 🤔 Module Là Gì?

### Ẩn Dụ Cuộc Sống: Tủ Hồ Sơ

**Module** giống như **tủ hồ sơ trong văn phòng**:

📁 **Tủ Hồ Sơ**:
- Chia thành nhiều ngăn
- Mỗi ngăn chứa tài liệu liên quan
- Có ngăn công khai, có ngăn riêng tư
- Dễ tìm, dễ quản lý

📦 **Module Trong Rust**:
- Tổ chức code thành các phần logic
- Mỗi module chứa functions, structs, ... liên quan
- Kiểm soát public/private
- Namespace riêng

### Ví Dụ Cơ Bản

```rust
mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }

    fn private_helper() {
        println!("This is private");
    }
}

fn main() {
    let result = math::add(5, 3);
    println!("Result: {}", result);

    // math::private_helper(); // ❌ Lỗi - private!
}
```

## 📦 Định Nghĩa Modules

### Inline Module

```rust
mod greetings {
    pub fn hello() {
        println!("Hello!");
    }

    pub fn goodbye() {
        println!("Goodbye!");
    }
}

fn main() {
    greetings::hello();
    greetings::goodbye();
}
```

### Nested Modules

```rust
mod outer {
    pub mod inner {
        pub fn function() {
            println!("Called from inner module");
        }
    }

    pub fn outer_function() {
        println!("Called from outer module");
        inner::function();
    }
}

fn main() {
    outer::outer_function();
    outer::inner::function();
}
```

## 🔒 Visibility với `pub`

### Private by Default

```rust
mod my_module {
    fn private_function() {
        println!("Private");
    }

    pub fn public_function() {
        println!("Public");
        private_function(); // OK - same module
    }
}

fn main() {
    my_module::public_function();
    // my_module::private_function(); // ❌ Lỗi!
}
```

### Struct Fields

```rust
mod person {
    pub struct Person {
        pub name: String,
        age: u32, // private
    }

    impl Person {
        pub fn new(name: String, age: u32) -> Person {
            Person { name, age }
        }

        pub fn age(&self) -> u32 {
            self.age
        }
    }
}

fn main() {
    let p = person::Person::new(String::from("Alice"), 30);
    println!("Name: {}", p.name); // OK - public
    println!("Age: {}", p.age()); // OK - through method
    // println!("Age: {}", p.age); // ❌ Lỗi - private field!
}
```

### Enum Variants

```rust
mod status {
    pub enum Status {
        Active,
        Inactive,
    }
}

fn main() {
    let s = status::Status::Active;
    // Enum variants are public if enum is public
}
```

## 📂 File-Based Modules

### Cấu Trúc Thư Mục

```
src/
├── main.rs
├── math.rs
└── utils/
    ├── mod.rs
    └── helpers.rs
```

### main.rs

```rust
mod math;
mod utils;

fn main() {
    let result = math::add(5, 3);
    println!("5 + 3 = {}", result);

    utils::print_info();
}
```

### math.rs

```rust
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

pub fn subtract(a: i32, b: i32) -> i32 {
    a - b
}
```

### utils/mod.rs

```rust
mod helpers;

pub fn print_info() {
    println!("Utils module");
    helpers::internal_helper();
}
```

### utils/helpers.rs

```rust
pub fn internal_helper() {
    println!("Helper function");
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: User Management

```rust
mod user {
    pub struct User {
        pub username: String,
        password: String, // private!
    }

    impl User {
        pub fn new(username: String, password: String) -> User {
            User { username, password }
        }

        pub fn authenticate(&self, password: &str) -> bool {
            self.password == password
        }

        pub fn change_password(&mut self, old: &str, new: String) -> bool {
            if self.authenticate(old) {
                self.password = new;
                true
            } else {
                false
            }
        }
    }
}

fn main() {
    let mut user = user::User::new(
        String::from("alice"),
        String::from("secret123"),
    );

    println!("Username: {}", user.username);

    if user.authenticate("secret123") {
        println!("Authenticated!");
    }

    if user.change_password("secret123", String::from("newsecret")) {
        println!("Password changed!");
    }
}
```

### Ví Dụ 2: Config Module

```rust
mod config {
    pub struct Config {
        pub host: String,
        pub port: u16,
        api_key: String, // private
    }

    impl Config {
        pub fn new(host: String, port: u16, api_key: String) -> Config {
            Config {
                host,
                port,
                api_key,
            }
        }

        pub fn get_connection_string(&self) -> String {
            format!("{}:{}", self.host, self.port)
        }

        pub fn has_api_key(&self) -> bool {
            !self.api_key.is_empty()
        }
    }
}

fn main() {
    let config = config::Config::new(
        String::from("localhost"),
        8080,
        String::from("secret_key"),
    );

    println!("Connecting to: {}", config.get_connection_string());
    println!("Has API key: {}", config.has_api_key());
}
```

### Ví Dụ 3: Database Module

```rust
mod database {
    pub mod connection {
        pub struct Connection {
            url: String,
        }

        impl Connection {
            pub fn new(url: String) -> Connection {
                Connection { url }
            }

            pub fn connect(&self) {
                println!("Connecting to {}", self.url);
            }
        }
    }

    pub mod query {
        pub fn execute(sql: &str) {
            println!("Executing: {}", sql);
        }
    }
}

fn main() {
    let conn = database::connection::Connection::new(
        String::from("postgres://localhost"),
    );
    conn.connect();

    database::query::execute("SELECT * FROM users");
}
```

## 🔄 `super` Keyword

Truy cập parent module:

```rust
mod parent {
    pub fn parent_function() {
        println!("Parent");
    }

    pub mod child {
        pub fn child_function() {
            println!("Child");
            super::parent_function(); // Call parent function
        }
    }
}

fn main() {
    parent::child::child_function();
}
```

## 🌟 Best Practices

### 1. Tổ Chức Theo Chức Năng

```rust
mod authentication {
    pub fn login() {}
    pub fn logout() {}
}

mod database {
    pub fn connect() {}
    pub fn query() {}
}

mod api {
    pub fn handle_request() {}
}
```

### 2. Giữ Module Nhỏ và Tập Trung

```rust
// ✅ Good - focused
mod user_validation {
    pub fn validate_email(email: &str) -> bool {
        email.contains('@')
    }

    pub fn validate_password(password: &str) -> bool {
        password.len() >= 8
    }
}

// ❌ Bad - too broad
mod everything {
    pub fn validate_email() {}
    pub fn connect_db() {}
    pub fn send_email() {}
    // Too many unrelated functions!
}
```

### 3. Sử Dụng `pub(crate)` Cho Internal API

```rust
mod internal {
    pub(crate) fn helper_function() {
        // Available within this crate only
    }
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Math Module

```rust
mod math {
    // TODO: Implement add, subtract, multiply, divide
    // Make them public
}

fn main() {
    println!("10 + 5 = {}", math::add(10, 5));
    println!("10 - 5 = {}", math::subtract(10, 5));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }

    pub fn subtract(a: i32, b: i32) -> i32 {
        a - b
    }

    pub fn multiply(a: i32, b: i32) -> i32 {
        a * b
    }

    pub fn divide(a: i32, b: i32) -> Option<i32> {
        if b != 0 {
            Some(a / b)
        } else {
            None
        }
    }
}
```
</details>

### Bài 2: Nested Modules

```rust
mod library {
    pub mod books {
        // TODO: Add book-related functions
    }

    pub mod members {
        // TODO: Add member-related functions
    }
}

fn main() {
    library::books::list_books();
    library::members::add_member("Alice");
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
mod library {
    pub mod books {
        pub fn list_books() {
            println!("Listing books...");
        }

        pub fn add_book(title: &str) {
            println!("Adding book: {}", title);
        }
    }

    pub mod members {
        pub fn add_member(name: &str) {
            println!("Adding member: {}", name);
        }

        pub fn list_members() {
            println!("Listing members...");
        }
    }
}
```
</details>

## 🎯 Tóm Tắt

| Concept | Cú Pháp | Ví Dụ |
|---------|---------|-------|
| **Define module** | `mod name { }` | `mod math { }` |
| **Public** | `pub` | `pub fn add()` |
| **Access** | `module::item` | `math::add(1, 2)` |
| **Nested** | `mod outer { mod inner { } }` | Multi-level |
| **Parent** | `super::` | `super::function()` |
| **File module** | `mod name;` | Links to name.rs |

**Quy tắc vàng**:
- ✅ Modules giúp tổ chức code logic
- ✅ Mọi thứ private by default
- ✅ Dùng `pub` để export
- ✅ Tổ chức theo chức năng, không theo kiểu
- ✅ Giữ modules focused và cohesive

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Modules](https://doc.rust-lang.org/book/ch07-02-defining-modules-to-control-scope-and-privacy.html)
- [Rust By Example - Modules](https://doc.rust-lang.org/rust-by-example/mod.html)

---

**Bài tiếp theo**: [Packages và Crates →](./packages-crates.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Packages và Crates** - cấu trúc dự án Rust!
