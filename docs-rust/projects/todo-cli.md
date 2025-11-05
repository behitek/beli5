---
sidebar_position: 5
title: 📝 Ứng Dụng Todo CLI
description: Xây dựng ứng dụng quản lý công việc dạng command-line với Rust - File I/O, JSON, và CRUD operations
keywords: [rust, project, todo, cli, json, serde, file io, crud, intermediate, quản lý công việc]
---

# 📝 Ứng Dụng Todo CLI

## 🎯 Mục Tiêu Dự Án

Xây dựng một **ứng dụng quản lý công việc (todo)** chạy trên command-line với các tính năng:
- ➕ Thêm công việc mới (Add task)
- 📋 Liệt kê tất cả công việc (List tasks)
- ✅ Đánh dấu hoàn thành (Mark complete)
- ❌ Xóa công việc (Delete task)
- 💾 Lưu vào file (Save to file)
- 📂 Tải từ file (Load from file)

### Bạn Sẽ Học Được
- ✅ Làm việc với **Vectors** để lưu trữ dữ liệu
- ✅ **File I/O**: Đọc và ghi file
- ✅ Parse **command-line arguments**
- ✅ **JSON serialization** với serde
- ✅ Implement **CRUD operations** cơ bản
- ✅ Xử lý lỗi và validate input

## 📦 Bước 1: Tạo Project

```bash
cargo new todo_cli
cd todo_cli
```

## 🎮 Bước 2: Version 1 - Basic Todo (Chỉ Lưu Trong Memory)

Mở `src/main.rs`:

```rust
use std::io;

#[derive(Debug)]
struct Task {
    id: usize,
    title: String,
    completed: bool,
}

impl Task {
    fn new(id: usize, title: String) -> Self {
        Task {
            id,
            title,
            completed: false,
        }
    }

    fn display(&self) {
        let status = if self.completed { "✅" } else { "⬜" };
        println!("  {}. {} {}", self.id, status, self.title);
    }
}

fn main() {
    println!("📝 Todo CLI - Version 1");
    println!("========================\n");

    let mut tasks: Vec<Task> = Vec::new();
    let mut next_id = 1;

    loop {
        println!("\n💡 Lệnh: add <task> | list | done <id> | delete <id> | exit");
        print!("> ");

        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("❌ Không đọc được input!");

        let input = input.trim();
        let parts: Vec<&str> = input.splitn(2, ' ').collect();

        match parts[0] {
            "add" => {
                if parts.len() < 2 {
                    println!("⚠️  Vui lòng nhập tên công việc!");
                    println!("💡 Ví dụ: add Học Rust");
                    continue;
                }
                let title = parts[1].to_string();
                tasks.push(Task::new(next_id, title));
                println!("✅ Đã thêm công việc #{}", next_id);
                next_id += 1;
            },
            "list" => {
                if tasks.is_empty() {
                    println!("📋 Chưa có công việc nào!");
                } else {
                    println!("\n📋 Danh sách công việc:");
                    for task in &tasks {
                        task.display();
                    }
                }
            },
            "done" => {
                if parts.len() < 2 {
                    println!("⚠️  Vui lòng nhập ID công việc!");
                    continue;
                }
                match parts[1].parse::<usize>() {
                    Ok(id) => {
                        if let Some(task) = tasks.iter_mut().find(|t| t.id == id) {
                            task.completed = true;
                            println!("✅ Đã đánh dấu hoàn thành: {}", task.title);
                        } else {
                            println!("⚠️  Không tìm thấy công việc #{}", id);
                        }
                    },
                    Err(_) => println!("⚠️  ID không hợp lệ!"),
                }
            },
            "delete" => {
                if parts.len() < 2 {
                    println!("⚠️  Vui lòng nhập ID công việc!");
                    continue;
                }
                match parts[1].parse::<usize>() {
                    Ok(id) => {
                        if let Some(pos) = tasks.iter().position(|t| t.id == id) {
                            let task = tasks.remove(pos);
                            println!("🗑️  Đã xóa: {}", task.title);
                        } else {
                            println!("⚠️  Không tìm thấy công việc #{}", id);
                        }
                    },
                    Err(_) => println!("⚠️  ID không hợp lệ!"),
                }
            },
            "exit" => {
                println!("👋 Tạm biệt!");
                break;
            },
            _ => println!("⚠️  Lệnh không hợp lệ!"),
        }
    }
}
```

## 🚀 Chạy Thử

```bash
cargo run
```

**Output mẫu:**
```
📝 Todo CLI - Version 1
========================

💡 Lệnh: add <task> | list | done <id> | delete <id> | exit
> add Học Rust
✅ Đã thêm công việc #1

💡 Lệnh: add <task> | list | done <id> | delete <id> | exit
> add Làm bài tập
✅ Đã thêm công việc #2

💡 Lệnh: add <task> | list | done <id> | delete <id> | exit
> list

📋 Danh sách công việc:
  1. ⬜ Học Rust
  2. ⬜ Làm bài tập

💡 Lệnh: add <task> | list | done <id> | delete <id> | exit
> done 1
✅ Đã đánh dấu hoàn thành: Học Rust
```

## 📖 Giải Thích Code

### 1. Struct Task

```rust
#[derive(Debug)]
struct Task {
    id: usize,          // ID duy nhất
    title: String,      // Tên công việc
    completed: bool,    // Trạng thái hoàn thành
}
```

- `#[derive(Debug)]`: Tự động tạo trait Debug để in ra
- `usize`: Kiểu số nguyên không dấu (cho ID)

### 2. Vector để Lưu Trữ

```rust
let mut tasks: Vec<Task> = Vec::new();
```

- `Vec<Task>`: Vector chứa các Task
- `mut`: Có thể thay đổi (thêm, xóa)

### 3. Parse Command

```rust
let parts: Vec<&str> = input.splitn(2, ' ').collect();
```

- `splitn(2, ' ')`: Tách tối đa thành 2 phần
- Ví dụ: `"add Học Rust"` → `["add", "Học Rust"]`

### 4. Tìm và Cập Nhật

```rust
if let Some(task) = tasks.iter_mut().find(|t| t.id == id) {
    task.completed = true;
}
```

- `iter_mut()`: Iterator có thể thay đổi
- `find()`: Tìm phần tử đầu tiên thỏa điều kiện

## 🎨 Bước 3: Version 2 - Lưu Vào File Text

Thêm chức năng lưu/tải từ file:

```rust
use std::io::{self, Write};
use std::fs;

#[derive(Debug)]
struct Task {
    id: usize,
    title: String,
    completed: bool,
}

impl Task {
    fn new(id: usize, title: String) -> Self {
        Task {
            id,
            title,
            completed: false,
        }
    }

    fn display(&self) {
        let status = if self.completed { "✅" } else { "⬜" };
        println!("  {}. {} {}", self.id, status, self.title);
    }

    // Chuyển thành string để lưu file
    fn to_file_string(&self) -> String {
        format!("{}|{}|{}", self.id, self.title, self.completed)
    }

    // Tạo Task từ string trong file
    fn from_file_string(s: &str) -> Option<Self> {
        let parts: Vec<&str> = s.split('|').collect();
        if parts.len() != 3 {
            return None;
        }

        let id = parts[0].parse().ok()?;
        let title = parts[1].to_string();
        let completed = parts[2].parse().ok()?;

        Some(Task { id, title, completed })
    }
}

fn save_tasks(tasks: &Vec<Task>, filename: &str) -> std::io::Result<()> {
    let mut content = String::new();
    for task in tasks {
        content.push_str(&task.to_file_string());
        content.push('\n');
    }
    fs::write(filename, content)?;
    Ok(())
}

fn load_tasks(filename: &str) -> std::io::Result<Vec<Task>> {
    match fs::read_to_string(filename) {
        Ok(content) => {
            let tasks = content
                .lines()
                .filter_map(|line| Task::from_file_string(line))
                .collect();
            Ok(tasks)
        },
        Err(_) => Ok(Vec::new()), // File không tồn tại
    }
}

fn main() {
    println!("📝 Todo CLI - Version 2 (With File Storage)");
    println!("============================================\n");

    let filename = "tasks.txt";
    let mut tasks = load_tasks(filename).unwrap_or_else(|_| Vec::new());
    let mut next_id = tasks.iter().map(|t| t.id).max().unwrap_or(0) + 1;

    println!("✅ Đã tải {} công việc từ file", tasks.len());

    loop {
        println!("\n💡 Lệnh: add | list | done | delete | save | exit");
        print!("> ");
        io::stdout().flush().unwrap();

        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("❌ Không đọc được input!");

        let input = input.trim();
        let parts: Vec<&str> = input.splitn(2, ' ').collect();

        match parts[0] {
            "add" => {
                if parts.len() < 2 {
                    println!("⚠️  Vui lòng nhập tên công việc!");
                    continue;
                }
                let title = parts[1].to_string();
                tasks.push(Task::new(next_id, title));
                println!("✅ Đã thêm công việc #{}", next_id);
                next_id += 1;
            },
            "list" => {
                if tasks.is_empty() {
                    println!("📋 Chưa có công việc nào!");
                } else {
                    println!("\n📋 Danh sách công việc:");
                    for task in &tasks {
                        task.display();
                    }
                }
            },
            "done" => {
                if parts.len() < 2 {
                    println!("⚠️  Vui lòng nhập ID công việc!");
                    continue;
                }
                match parts[1].parse::<usize>() {
                    Ok(id) => {
                        if let Some(task) = tasks.iter_mut().find(|t| t.id == id) {
                            task.completed = true;
                            println!("✅ Đã đánh dấu hoàn thành: {}", task.title);
                        } else {
                            println!("⚠️  Không tìm thấy công việc #{}", id);
                        }
                    },
                    Err(_) => println!("⚠️  ID không hợp lệ!"),
                }
            },
            "delete" => {
                if parts.len() < 2 {
                    println!("⚠️  Vui lòng nhập ID công việc!");
                    continue;
                }
                match parts[1].parse::<usize>() {
                    Ok(id) => {
                        if let Some(pos) = tasks.iter().position(|t| t.id == id) {
                            let task = tasks.remove(pos);
                            println!("🗑️  Đã xóa: {}", task.title);
                        } else {
                            println!("⚠️  Không tìm thấy công việc #{}", id);
                        }
                    },
                    Err(_) => println!("⚠️  ID không hợp lệ!"),
                }
            },
            "save" => {
                match save_tasks(&tasks, filename) {
                    Ok(_) => println!("💾 Đã lưu {} công việc vào {}", tasks.len(), filename),
                    Err(e) => println!("❌ Lỗi khi lưu: {}", e),
                }
            },
            "exit" => {
                // Auto-save khi thoát
                let _ = save_tasks(&tasks, filename);
                println!("💾 Đã tự động lưu!");
                println!("👋 Tạm biệt!");
                break;
            },
            _ => println!("⚠️  Lệnh không hợp lệ!"),
        }
    }
}
```

**File format (`tasks.txt`):**
```
1|Học Rust|false
2|Làm bài tập|true
3|Đọc sách|false
```

## 🎨 Bước 4: Version 3 - JSON với Serde

Thêm `serde` vào `Cargo.toml`:

```toml
[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

Code hoàn chỉnh:

```rust
use serde::{Deserialize, Serialize};
use std::fs;
use std::io::{self, Write};

#[derive(Debug, Serialize, Deserialize)]
struct Task {
    id: usize,
    title: String,
    completed: bool,
}

impl Task {
    fn new(id: usize, title: String) -> Self {
        Task {
            id,
            title,
            completed: false,
        }
    }

    fn display(&self) {
        let status = if self.completed { "✅" } else { "⬜" };
        println!("  {}. {} {}", self.id, status, self.title);
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct TodoList {
    tasks: Vec<Task>,
    next_id: usize,
}

impl TodoList {
    fn new() -> Self {
        TodoList {
            tasks: Vec::new(),
            next_id: 1,
        }
    }

    fn add_task(&mut self, title: String) {
        self.tasks.push(Task::new(self.next_id, title));
        println!("✅ Đã thêm công việc #{}", self.next_id);
        self.next_id += 1;
    }

    fn list_tasks(&self) {
        if self.tasks.is_empty() {
            println!("📋 Chưa có công việc nào!");
            return;
        }

        println!("\n📋 Danh sách công việc:");
        let total = self.tasks.len();
        let completed = self.tasks.iter().filter(|t| t.completed).count();
        let pending = total - completed;

        for task in &self.tasks {
            task.display();
        }

        println!("\n📊 Tổng: {} | Hoàn thành: {} | Còn lại: {}", total, completed, pending);
    }

    fn complete_task(&mut self, id: usize) -> Result<(), String> {
        if let Some(task) = self.tasks.iter_mut().find(|t| t.id == id) {
            if task.completed {
                return Err(format!("Công việc #{} đã hoàn thành rồi!", id));
            }
            task.completed = true;
            println!("✅ Đã đánh dấu hoàn thành: {}", task.title);
            Ok(())
        } else {
            Err(format!("Không tìm thấy công việc #{}", id))
        }
    }

    fn delete_task(&mut self, id: usize) -> Result<(), String> {
        if let Some(pos) = self.tasks.iter().position(|t| t.id == id) {
            let task = self.tasks.remove(pos);
            println!("🗑️  Đã xóa: {}", task.title);
            Ok(())
        } else {
            Err(format!("Không tìm thấy công việc #{}", id))
        }
    }

    fn save_to_file(&self, filename: &str) -> Result<(), String> {
        let json = serde_json::to_string_pretty(self)
            .map_err(|e| format!("Lỗi serialize: {}", e))?;

        fs::write(filename, json)
            .map_err(|e| format!("Lỗi ghi file: {}", e))?;

        Ok(())
    }

    fn load_from_file(filename: &str) -> Result<Self, String> {
        let content = fs::read_to_string(filename)
            .map_err(|_| "File không tồn tại".to_string())?;

        let todo_list = serde_json::from_str(&content)
            .map_err(|e| format!("Lỗi parse JSON: {}", e))?;

        Ok(todo_list)
    }
}

fn print_help() {
    println!("\n💡 Các lệnh có sẵn:");
    println!("  add <task>     - Thêm công việc mới");
    println!("  list           - Xem danh sách");
    println!("  done <id>      - Đánh dấu hoàn thành");
    println!("  delete <id>    - Xóa công việc");
    println!("  save           - Lưu vào file");
    println!("  help           - Hiển thị trợ giúp");
    println!("  exit           - Thoát (tự động lưu)");
}

fn main() {
    println!("📝 Todo CLI - Version 3 (JSON Storage)");
    println!("=======================================\n");

    let filename = "tasks.json";
    let mut todo_list = TodoList::load_from_file(filename).unwrap_or_else(|_| {
        println!("📄 Tạo file mới: {}", filename);
        TodoList::new()
    });

    println!("✅ Đã tải {} công việc", todo_list.tasks.len());
    print_help();

    loop {
        print!("\n> ");
        io::stdout().flush().unwrap();

        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("❌ Không đọc được input!");

        let input = input.trim();
        if input.is_empty() {
            continue;
        }

        let parts: Vec<&str> = input.splitn(2, ' ').collect();

        match parts[0] {
            "add" => {
                if parts.len() < 2 {
                    println!("⚠️  Vui lòng nhập tên công việc!");
                    println!("💡 Ví dụ: add Học Rust");
                } else {
                    todo_list.add_task(parts[1].to_string());
                }
            },
            "list" => todo_list.list_tasks(),
            "done" => {
                if parts.len() < 2 {
                    println!("⚠️  Vui lòng nhập ID công việc!");
                } else {
                    match parts[1].parse::<usize>() {
                        Ok(id) => {
                            if let Err(e) = todo_list.complete_task(id) {
                                println!("⚠️  {}", e);
                            }
                        },
                        Err(_) => println!("⚠️  ID không hợp lệ!"),
                    }
                }
            },
            "delete" => {
                if parts.len() < 2 {
                    println!("⚠️  Vui lòng nhập ID công việc!");
                } else {
                    match parts[1].parse::<usize>() {
                        Ok(id) => {
                            if let Err(e) = todo_list.delete_task(id) {
                                println!("⚠️  {}", e);
                            }
                        },
                        Err(_) => println!("⚠️  ID không hợp lệ!"),
                    }
                }
            },
            "save" => {
                match todo_list.save_to_file(filename) {
                    Ok(_) => println!("💾 Đã lưu thành công!"),
                    Err(e) => println!("❌ {}", e),
                }
            },
            "help" => print_help(),
            "exit" | "quit" => {
                if let Err(e) = todo_list.save_to_file(filename) {
                    println!("❌ Lỗi khi lưu: {}", e);
                } else {
                    println!("💾 Đã tự động lưu!");
                }
                println!("👋 Tạm biệt!");
                break;
            },
            _ => println!("⚠️  Lệnh không hợp lệ! Gõ 'help' để xem hướng dẫn."),
        }
    }
}
```

**File JSON (`tasks.json`):**
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Học Rust",
      "completed": true
    },
    {
      "id": 2,
      "title": "Làm bài tập",
      "completed": false
    }
  ],
  "next_id": 3
}
```

## 🐛 Lỗi Thường Gặp

### Lỗi 1: ID Bị Trùng Sau Khi Load

```rust
// ❌ SAI: Luôn bắt đầu từ 1
let mut next_id = 1;

// ✅ ĐÚNG: Tìm ID lớn nhất + 1
let mut next_id = tasks.iter()
    .map(|t| t.id)
    .max()
    .unwrap_or(0) + 1;
```

### Lỗi 2: File Không Tồn Tại

```rust
// ❌ SAI: Crash nếu file không có
let content = fs::read_to_string(filename).unwrap();

// ✅ ĐÚNG: Xử lý lỗi gracefully
let content = fs::read_to_string(filename)
    .unwrap_or_else(|_| String::new());
```

### Lỗi 3: Không Flush stdout

```rust
// ❌ SAI: Prompt không hiện ngay
print!("> ");

// ✅ ĐÚNG: Flush để hiện ngay
print!("> ");
io::stdout().flush().unwrap();
```

### Lỗi 4: Xóa Task Trong Loop

```rust
// ❌ SAI: Không thể xóa trong iter()
for task in &tasks {
    if task.id == id {
        tasks.remove(task); // Compile error!
    }
}

// ✅ ĐÚNG: Dùng position()
if let Some(pos) = tasks.iter().position(|t| t.id == id) {
    tasks.remove(pos);
}
```

## 💪 Thử Thách Nâng Cao

### Thử Thách 1: Thêm Priority (Độ Ưu Tiên)

Thêm field `priority` (High, Medium, Low) và sắp xếp theo priority.

<details>
<summary>💡 Gợi ý</summary>

```rust
#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
enum Priority {
    Low,
    Medium,
    High,
}

#[derive(Debug, Serialize, Deserialize)]
struct Task {
    id: usize,
    title: String,
    completed: bool,
    priority: Priority,
}

// Sắp xếp
tasks.sort_by(|a, b| b.priority.cmp(&a.priority));
```
</details>

### Thử Thách 2: Thêm Due Date (Hạn Chót)

Thêm ngày hết hạn và cảnh báo tasks sắp tới hạn.

<details>
<summary>💡 Gợi ý</summary>

Dùng crate `chrono`:
```rust
use chrono::{DateTime, Local, Duration};

struct Task {
    // ...
    due_date: Option<DateTime<Local>>,
}

fn is_overdue(&self) -> bool {
    if let Some(due) = self.due_date {
        due < Local::now()
    } else {
        false
    }
}
```
</details>

### Thử Thách 3: Sub-tasks (Công Việc Con)

Cho phép mỗi task có sub-tasks.

<details>
<summary>💡 Gợi ý</summary>

```rust
struct Task {
    id: usize,
    title: String,
    completed: bool,
    subtasks: Vec<Task>, // Recursive!
}
```
</details>

### Thử Thách 4: Command-line Arguments

Chạy các lệnh trực tiếp từ terminal:
```bash
./todo_cli add "Học Rust"
./todo_cli list
./todo_cli done 1
```

<details>
<summary>💡 Gợi ý</summary>

```rust
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        // Interactive mode
    } else {
        // Command mode
        match args[1].as_str() {
            "add" => { /* ... */ },
            "list" => { /* ... */ },
            _ => {}
        }
    }
}
```
</details>

### Thử Thách 5: Search và Filter

Tìm kiếm tasks theo từ khóa:
```bash
> search rust
> filter completed
> filter pending
```

## 📚 Kiến Thức Đã Học

✅ **Vectors**: Lưu trữ và quản lý danh sách động
✅ **Structs**: Tổ chức dữ liệu phức tạp
✅ **File I/O**: Đọc/ghi file với `std::fs`
✅ **JSON Serialization**: Serde để chuyển đổi dữ liệu
✅ **CRUD Operations**: Create, Read, Update, Delete
✅ **Error Handling**: Result type và xử lý lỗi
✅ **Iterator Methods**: `find()`, `position()`, `filter()`, `map()`
✅ **String Parsing**: `splitn()`, `parse()`
✅ **Option Type**: Xử lý giá trị có thể null

## 🎯 Bước Tiếp Theo

➡️ **Tiếp theo**: [Password Generator](password-generator.md)
➡️ **Hoặc**: [Markdown Parser](markdown-parser.md)
➡️ **Hoặc**: [Mini Grep Tool](grep-clone.md)

---

🎉 **Tuyệt vời! Bạn đã xây dựng ứng dụng Todo CLI hoàn chỉnh!** 📝
