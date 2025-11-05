---
sidebar_position: 17
title: "Use và Paths: Import Items"
description: "Tìm hiểu cách sử dụng use keyword và paths để import items"
---

# 🛣️ Use và Paths: Import Items

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Sử dụng `use` keyword để import
- ✅ Hiểu absolute và relative paths
- ✅ Re-export với `pub use`
- ✅ Import nhiều items
- ✅ Áp dụng use idioms và best practices

## 🤔 Use Là Gì?

### Ẩn Dụ Cuộc Sống: Tạo Shortcut

**use** giống như **tạo shortcut trên desktop**:

🖥️ **Không Dùng Shortcut**:
- Phải mở `C:\Program Files\App\bin\program.exe` mỗi lần
- Dài dòng, khó nhớ

⚡ **Dùng Shortcut**:
- Click icon trên desktop
- Nhanh, tiện lợi

📝 **use Trong Rust**:
- Tạo shortcut cho paths dài
- Gọn code, dễ đọc

### Ví Dụ Cơ Bản

```rust
// Không dùng use
mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }
}

fn main() {
    let result = math::add(5, 3);  // Gọi đầy đủ
}

// Dùng use
mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }
}

use math::add;

fn main() {
    let result = add(5, 3);  // Gọn hơn!
}
```

## 📍 Absolute vs Relative Paths

### Absolute Path

Bắt đầu từ crate root:

```rust
use crate::module::function;
use std::collections::HashMap;
```

### Relative Path

Bắt đầu từ module hiện tại:

```rust
use self::submodule::function;
use super::parent_function;
```

### Ví Dụ

```rust
mod parent {
    pub fn parent_fn() {}

    pub mod child {
        pub fn child_fn() {}

        pub fn use_parent() {
            // Absolute path
            crate::parent::parent_fn();

            // Relative path với super
            super::parent_fn();
        }
    }
}

use parent::child::child_fn;  // Absolute từ crate root

fn main() {
    child_fn();
}
```

## 📦 Import Patterns

### Single Item

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert("key", "value");
}
```

### Multiple Items

```rust
use std::collections::{HashMap, HashSet, BTreeMap};

fn main() {
    let map = HashMap::new();
    let set = HashSet::new();
    let btree = BTreeMap::new();
}
```

### Nested Paths

```rust
use std::{
    collections::HashMap,
    io::{self, Write},
    fmt::Display,
};
```

### Glob Import

```rust
use std::collections::*;

fn main() {
    let map = HashMap::new();
    let set = HashSet::new();
    // Tất cả items từ collections
}
```

**Cảnh báo**: Tránh glob import! Dễ confusing.

### Aliasing

```rust
use std::collections::HashMap as Map;

fn main() {
    let mut map = Map::new();
    map.insert("key", "value");
}
```

## 🔄 Re-exporting với `pub use`

### Flatten Module Structure

```rust
mod inner {
    pub mod deep {
        pub fn function() {
            println!("Deep function");
        }
    }
}

// Re-export
pub use inner::deep::function;

fn main() {
    // Thay vì
    // inner::deep::function();

    // Có thể gọi
    function();
}
```

### Create Public API

```rust
mod internal {
    pub fn helper1() {}
    pub fn helper2() {}
    fn private_helper() {}  // Không export
}

// Public API
pub use internal::{helper1, helper2};
// private_helper không available từ bên ngoài
```

## 🎯 Use Idioms

### Idiomatic Imports

```rust
// ✅ Good - import module
use std::collections::HashMap;
let map = HashMap::new();

// ✅ Good - import trait để dùng methods
use std::io::Write;
file.write_all(b"text")?;

// ❌ Avoid - import function directly
use std::collections::HashMap::new;
let map = new();  // Confusing!
```

### Traits

```rust
use std::fmt::Display;

fn print_it<T: Display>(value: T) {
    println!("{}", value);
}
```

### Standard Library

```rust
// Prefer
use std::collections::HashMap;

// Over
use std::collections::*;  // Too broad
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Project Structure

```rust
// src/lib.rs
mod database;
mod api;

pub use database::{connect, query};
pub use api::Router;

// External users can use:
// use my_lib::{connect, query, Router};
```

### Ví Dụ 2: Prelude Pattern

```rust
// src/prelude.rs
pub use crate::errors::Error;
pub use crate::config::Config;
pub use crate::utils::helpers::*;

// src/lib.rs
pub mod prelude;

// Users can do:
// use my_lib::prelude::*;
// Gets Error, Config, helpers in one go
```

### Ví Dụ 3: Organized Imports

```rust
// Standard library
use std::collections::HashMap;
use std::io::{self, Write};

// External crates
use serde::{Deserialize, Serialize};
use tokio::runtime::Runtime;

// Internal modules
use crate::config::Config;
use crate::database::connect;

fn main() {
    // ...
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Use Statement

```rust
mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }

    pub fn multiply(a: i32, b: i32) -> i32 {
        a * b
    }
}

// TODO: Import add và multiply
// use ...

fn main() {
    println!("{}", add(5, 3));
    println!("{}", multiply(5, 3));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use math::{add, multiply};
```
</details>

### Bài 2: Re-export

```rust
mod internal {
    pub mod helpers {
        pub fn helper_fn() {
            println!("Helper");
        }
    }
}

// TODO: Re-export helper_fn để gọi trực tiếp
// pub use ...

fn main() {
    helper_fn();  // Should work
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
pub use internal::helpers::helper_fn;
```
</details>

## 🎯 Tóm Tắt

| Pattern | Cú Pháp | Khi Nào Dùng |
|---------|---------|--------------|
| **Basic** | `use mod::item` | Import single item |
| **Multiple** | `use mod::{A, B}` | Import nhiều items |
| **Nested** | `use std::{io, fs}` | Organize imports |
| **Alias** | `use mod::item as X` | Avoid naming conflicts |
| **Re-export** | `pub use` | Create public API |
| **Glob** | `use mod::*` | Tránh! (trừ prelude) |

**Quy tắc vàng**:
- ✅ Import modules, not functions (trừ traits)
- ✅ Group imports: std → external → internal
- ✅ Use `pub use` để flatten public API
- ✅ Tránh glob imports
- ✅ Alias để tránh naming conflicts

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Paths](https://doc.rust-lang.org/book/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html)
- [Rust Book - use Keyword](https://doc.rust-lang.org/book/ch07-04-bringing-paths-into-scope-with-the-use-keyword.html)

---

**Bài tiếp theo**: [HashMap →](./hashmap.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **HashMap** - collection key-value!
