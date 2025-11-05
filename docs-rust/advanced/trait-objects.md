---
sidebar_position: 14
title: "Trait Objects: Dynamic Dispatch"
description: "Tìm hiểu về dynamic dispatch với dyn Trait và trait objects"
---

# 🎪 Trait Objects: Dynamic Dispatch

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được trait object là gì
- ✅ Sử dụng `dyn Trait`
- ✅ Phân biệt static vs dynamic dispatch
- ✅ Hiểu object safety
- ✅ Áp dụng trait objects trong code thực tế

## 🤔 Trait Object Là Gì?

### Ẩn Dụ Cuộc Sống: Danh Sách Thiết Bị

**Trait Object** giống như **danh sách thiết bị điện tử**:

🔌 **Không Dùng Trait Object**:
- Một hộp chỉ đựng điện thoại
- Một hộp chỉ đựng máy tính
- Một hộp chỉ đựng máy tính bảng

📦 **Dùng Trait Object**:
- **Một hộp** đựng được **mọi thiết bị** có cổng sạc
- Không quan tâm loại gì, miễn sạc được
- Linh hoạt runtime

### Ví Dụ Cơ Bản

```rust
trait Draw {
    fn draw(&self);
}

struct Circle {
    radius: f64,
}

impl Draw for Circle {
    fn draw(&self) {
        println!("Drawing circle with radius {}", self.radius);
    }
}

struct Square {
    side: f64,
}

impl Draw for Square {
    fn draw(&self) {
        println!("Drawing square with side {}", self.side);
    }
}

fn main() {
    // Vec của trait objects
    let shapes: Vec<Box<dyn Draw>> = vec![
        Box::new(Circle { radius: 5.0 }),
        Box::new(Square { side: 10.0 }),
    ];

    for shape in shapes {
        shape.draw();
    }
}
```

**Đầu ra**:
```
Drawing circle with radius 5
Drawing square with side 10
```

## ⚡ Static vs Dynamic Dispatch

### Static Dispatch (Generics)

```rust
fn print_area<T: Shape>(shape: &T) {
    println!("Area: {}", shape.area());
}

// Compiler tạo code cho từng kiểu
// fn print_area_circle(shape: &Circle) { ... }
// fn print_area_square(shape: &Square) { ... }
```

**Ưu điểm**:
- ✅ Nhanh (không overhead)
- ✅ Inline optimization
- ✅ Biết kiểu lúc compile

**Nhược điểm**:
- ❌ Binary size lớn
- ❌ Không thể heterogeneous collections

### Dynamic Dispatch (Trait Objects)

```rust
fn print_area(shape: &dyn Shape) {
    println!("Area: {}", shape.area());
}

// Runtime lookup để gọi đúng method
```

**Ưu điểm**:
- ✅ Binary size nhỏ hơn
- ✅ Heterogeneous collections
- ✅ Flexibility

**Nhược điểm**:
- ❌ Runtime overhead (vtable lookup)
- ❌ Không inline được
- ❌ Phải dùng reference/pointer

## 📦 Box<dyn Trait>

```rust
trait Animal {
    fn make_sound(&self);
}

struct Dog;
impl Animal for Dog {
    fn make_sound(&self) {
        println!("Woof!");
    }
}

struct Cat;
impl Animal for Cat {
    fn make_sound(&self) {
        println!("Meow!");
    }
}

fn main() {
    let animals: Vec<Box<dyn Animal>> = vec![
        Box::new(Dog),
        Box::new(Cat),
        Box::new(Dog),
    ];

    for animal in animals {
        animal.make_sound();
    }
}
```

## 🔒 Object Safety

Không phải trait nào cũng có thể làm trait object. Trait phải "object safe":

```rust
// ✅ Object safe
trait Draw {
    fn draw(&self);
}

// ❌ NOT object safe - có generic method
trait NotObjectSafe {
    fn generic_method<T>(&self, x: T);
}

// ❌ NOT object safe - return Self
trait AlsoNotObjectSafe {
    fn clone_self(&self) -> Self;
}
```

**Quy tắc Object Safety**:
- ✅ Không có generic type parameters trong methods
- ✅ Không return `Self`
- ✅ Không có `Self: Sized` bound

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Plugin System

```rust
trait Plugin {
    fn name(&self) -> &str;
    fn execute(&self);
}

struct LoggerPlugin;
impl Plugin for LoggerPlugin {
    fn name(&self) -> &str {
        "Logger"
    }

    fn execute(&self) {
        println!("[LOG] Logging...");
    }
}

struct CachePlugin;
impl Plugin for CachePlugin {
    fn name(&self) -> &str {
        "Cache"
    }

    fn execute(&self) {
        println!("[CACHE] Caching...");
    }
}

struct PluginManager {
    plugins: Vec<Box<dyn Plugin>>,
}

impl PluginManager {
    fn new() -> Self {
        PluginManager {
            plugins: Vec::new(),
        }
    }

    fn add_plugin(&mut self, plugin: Box<dyn Plugin>) {
        self.plugins.push(plugin);
    }

    fn run_all(&self) {
        for plugin in &self.plugins {
            println!("Running plugin: {}", plugin.name());
            plugin.execute();
        }
    }
}

fn main() {
    let mut manager = PluginManager::new();

    manager.add_plugin(Box::new(LoggerPlugin));
    manager.add_plugin(Box::new(CachePlugin));

    manager.run_all();
}
```

**Đầu ra**:
```
Running plugin: Logger
[LOG] Logging...
Running plugin: Cache
[CACHE] Caching...
```

### Ví Dụ 2: Event System

```rust
trait EventHandler {
    fn handle(&self, event: &str);
}

struct ClickHandler;
impl EventHandler for ClickHandler {
    fn handle(&self, event: &str) {
        println!("Click: {}", event);
    }
}

struct KeypressHandler;
impl EventHandler for KeypressHandler {
    fn handle(&self, event: &str) {
        println!("Keypress: {}", event);
    }
}

struct EventDispatcher {
    handlers: Vec<Box<dyn EventHandler>>,
}

impl EventDispatcher {
    fn new() -> Self {
        EventDispatcher {
            handlers: Vec::new(),
        }
    }

    fn register(&mut self, handler: Box<dyn EventHandler>) {
        self.handlers.push(handler);
    }

    fn dispatch(&self, event: &str) {
        for handler in &self.handlers {
            handler.handle(event);
        }
    }
}

fn main() {
    let mut dispatcher = EventDispatcher::new();

    dispatcher.register(Box::new(ClickHandler));
    dispatcher.register(Box::new(KeypressHandler));

    dispatcher.dispatch("User action");
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Shape Renderer

```rust
trait Render {
    fn render(&self);
}

struct Image {
    path: String,
}

// TODO: Implement Render for Image

struct Text {
    content: String,
}

// TODO: Implement Render for Text

fn main() {
    let components: Vec<Box<dyn Render>> = vec![
        Box::new(Image {
            path: String::from("logo.png"),
        }),
        Box::new(Text {
            content: String::from("Hello"),
        }),
    ];

    for component in components {
        component.render();
    }
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
impl Render for Image {
    fn render(&self) {
        println!("Rendering image: {}", self.path);
    }
}

impl Render for Text {
    fn render(&self) {
        println!("Rendering text: {}", self.content);
    }
}
```
</details>

## 🎯 Tóm Tắt

| Concept | Static Dispatch | Dynamic Dispatch |
|---------|----------------|------------------|
| **Cú pháp** | `<T: Trait>` | `&dyn Trait` |
| **Performance** | Nhanh | Chậm hơn một chút |
| **Binary size** | Lớn hơn | Nhỏ hơn |
| **Collections** | Homogeneous | Heterogeneous |
| **Use when** | Biết kiểu lúc compile | Cần flexibility runtime |

**Quy tắc vàng**:
- ✅ Dùng trait objects cho heterogeneous collections
- ✅ Trait phải object-safe
- ✅ Dùng `Box<dyn Trait>` cho ownership
- ✅ Dùng `&dyn Trait` cho borrowing
- ✅ Static dispatch nhanh hơn, dynamic linh hoạt hơn

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Trait Objects](https://doc.rust-lang.org/book/ch17-02-trait-objects.html)
- [Object Safety](https://doc.rust-lang.org/reference/items/traits.html#object-safety)

---

**Bài tiếp theo**: [Modules →](./modules.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **Modules** - tổ chức code trong Rust!
