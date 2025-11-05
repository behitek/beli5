---
sidebar_position: 32
title: "Declarative Macros: Code Sinh Code"
description: "Tìm hiểu cách viết macros với macro_rules!"
---

# 🎭 Declarative Macros: Viết Code Sinh Code

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu macros là gì và tại sao dùng
- ✅ Viết macros với `macro_rules!`
- ✅ Pattern matching trong macros
- ✅ Repetition patterns
- ✅ Tạo reusable macros
- ✅ Common macro patterns

## 🤔 Macros Là Gì?

### Ẩn Dụ Cuộc Sống: Template Văn Bản

**Macros** giống như **template tự động điền**:

📝 **Template**:
- **Mẫu có sẵn** với chỗ trống
- Điền thông tin → văn bản hoàn chỉnh
- Tái sử dụng nhiều lần
- Tiết kiệm thời gian

🦀 **Macros Trong Rust**:
- **Code template** tạo code
- Compile-time code generation
- Giảm code lặp lại
- Meta-programming

### Macros vs Functions

```rust
// Function - runtime
fn add(a: i32, b: i32) -> i32 {
    a + b
}

// Macro - compile time
macro_rules! add_macro {
    ($a:expr, $b:expr) => {
        $a + $b
    };
}

fn main() {
    println!("{}", add(2, 3));
    println!("{}", add_macro!(2, 3));
}
```

| Feature | Functions | Macros |
|---------|-----------|--------|
| **Execution** | Runtime | Compile-time |
| **Parameters** | Fixed types | Any pattern |
| **Flexibility** | Limited | Very flexible |
| **Performance** | Can inline | Always expands |
| **Syntax** | `fn name()` | `macro_rules! name` |

## 📝 macro_rules! Basics

### Simple Macro

```rust
macro_rules! say_hello {
    () => {
        println!("Hello, World!");
    };
}

fn main() {
    say_hello!();
}
```

### Macro with Arguments

```rust
macro_rules! greet {
    ($name:expr) => {
        println!("Hello, {}!", $name);
    };
}

fn main() {
    greet!("Alice");
    greet!("Bob");
}
```

### Multiple Patterns

```rust
macro_rules! calculate {
    (add $a:expr, $b:expr) => {
        $a + $b
    };
    (mul $a:expr, $b:expr) => {
        $a * $b
    };
}

fn main() {
    println!("{}", calculate!(add 2, 3));  // 5
    println!("{}", calculate!(mul 2, 3));  // 6
}
```

## 🎯 Pattern Matching

### Designators

```rust
macro_rules! create_function {
    // $name:ident - identifier
    // $body:expr - expression
    ($name:ident) => {
        fn $name() {
            println!("Function {} called", stringify!($name));
        }
    };
}

create_function!(foo);

fn main() {
    foo();  // Function foo called
}
```

**Common Designators**:
- `ident` - identifier (function/variable names)
- `expr` - expression
- `ty` - type
- `pat` - pattern
- `stmt` - statement
- `block` - block of code
- `item` - item (function, struct, etc.)
- `tt` - token tree (any token)

### Multiple Arguments

```rust
macro_rules! print_result {
    ($label:expr, $value:expr) => {
        println!("{}: {}", $label, $value);
    };
}

fn main() {
    print_result!("Result", 42);
    print_result!("Sum", 2 + 2);
}
```

### Type Matching

```rust
macro_rules! create_struct {
    ($name:ident, $field:ident: $type:ty) => {
        struct $name {
            $field: $type,
        }
    };
}

create_struct!(Point, x: i32);
create_struct!(Person, name: String);

fn main() {
    let p = Point { x: 10 };
    println!("{}", p.x);
}
```

## 🔄 Repetition Patterns

### Basic Repetition

```rust
macro_rules! vec_of_strings {
    ($($x:expr),*) => {
        {
            let mut v = Vec::new();
            $(
                v.push($x.to_string());
            )*
            v
        }
    };
}

fn main() {
    let v = vec_of_strings!("hello", "world", "rust");
    println!("{:?}", v);
}
```

**Repetition Syntax**:
- `$(...)*` - 0 or more times
- `$(...)+` - 1 or more times
- `$(...)?` - 0 or 1 time

### Comma-Separated Repetition

```rust
macro_rules! sum {
    ($($x:expr),+) => {
        {
            let mut total = 0;
            $(
                total += $x;
            )+
            total
        }
    };
}

fn main() {
    println!("{}", sum!(1));           // 1
    println!("{}", sum!(1, 2, 3));     // 6
    println!("{}", sum!(1, 2, 3, 4, 5)); // 15
}
```

### Key-Value Pairs

```rust
macro_rules! hashmap {
    ($($key:expr => $value:expr),*) => {
        {
            let mut map = std::collections::HashMap::new();
            $(
                map.insert($key, $value);
            )*
            map
        }
    };
}

fn main() {
    let map = hashmap!(
        "name" => "Alice",
        "age" => "30",
        "city" => "Hanoi"
    );
    println!("{:?}", map);
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: vec! Macro

```rust
macro_rules! my_vec {
    ($($x:expr),*) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

fn main() {
    let v = my_vec![1, 2, 3, 4, 5];
    println!("{:?}", v);
}
```

### Ví Dụ 2: println! Style Macro

```rust
macro_rules! log {
    ($msg:expr) => {
        println!("[LOG] {}", $msg);
    };
    ($fmt:expr, $($arg:expr),+) => {
        println!("[LOG] {}", format!($fmt, $($arg),+));
    };
}

fn main() {
    log!("Application started");
    log!("User {} logged in", "Alice");
    log!("Processing {} items", 42);
}
```

### Ví Dụ 3: Test Helper

```rust
macro_rules! test_case {
    ($name:ident, $input:expr, $expected:expr) => {
        #[test]
        fn $name() {
            assert_eq!($input, $expected);
        }
    };
}

test_case!(test_add, 2 + 2, 4);
test_case!(test_mul, 3 * 3, 9);
test_case!(test_sub, 10 - 5, 5);
```

### Ví Dụ 4: Struct Builder

```rust
macro_rules! builder {
    ($name:ident {
        $($field:ident: $type:ty),*
    }) => {
        struct $name {
            $($field: $type,)*
        }

        impl $name {
            fn new() -> Self {
                $name {
                    $($field: Default::default(),)*
                }
            }

            $(
                fn $field(mut self, value: $type) -> Self {
                    self.$field = value;
                    self
                }
            )*
        }
    };
}

builder!(Person {
    name: String,
    age: u32
});

fn main() {
    let person = Person::new()
        .name("Alice".to_string())
        .age(30);

    println!("{} is {} years old", person.name, person.age);
}
```

### Ví Dụ 5: Enum From String

```rust
macro_rules! string_enum {
    ($name:ident { $($variant:ident),* }) => {
        enum $name {
            $($variant,)*
        }

        impl $name {
            fn from_str(s: &str) -> Option<Self> {
                match s {
                    $(
                        stringify!($variant) => Some($name::$variant),
                    )*
                    _ => None,
                }
            }

            fn as_str(&self) -> &str {
                match self {
                    $(
                        $name::$variant => stringify!($variant),
                    )*
                }
            }
        }
    };
}

string_enum!(Color {
    Red,
    Green,
    Blue
});

fn main() {
    let color = Color::from_str("Red").unwrap();
    println!("Color: {}", color.as_str());
}
```

### Ví Dụ 6: Measure Time

```rust
macro_rules! measure_time {
    ($name:expr, $code:block) => {
        {
            let start = std::time::Instant::now();
            let result = $code;
            let duration = start.elapsed();
            println!("{} took {:?}", $name, duration);
            result
        }
    };
}

fn main() {
    let result = measure_time!("Computation", {
        std::thread::sleep(std::time::Duration::from_millis(100));
        2 + 2
    });
    println!("Result: {}", result);
}
```

## 🎓 Advanced Patterns

### Recursive Macros

```rust
macro_rules! count {
    () => (0);
    ($head:expr) => (1);
    ($head:expr, $($tail:expr),+) => (1 + count!($($tail),+));
}

fn main() {
    println!("{}", count!());           // 0
    println!("{}", count!(1));          // 1
    println!("{}", count!(1, 2, 3));    // 3
}
```

### Nested Repetition

```rust
macro_rules! matrix {
    ($([$($x:expr),*]),*) => {
        {
            let mut v = Vec::new();
            $(
                let mut row = Vec::new();
                $(
                    row.push($x);
                )*
                v.push(row);
            )*
            v
        }
    };
}

fn main() {
    let m = matrix!(
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    );
    println!("{:?}", m);
}
```

### Internal Rules

```rust
macro_rules! complex_macro {
    // Public rule
    ($x:expr) => {
        complex_macro!(@internal $x, 10)
    };

    // Internal rule (private)
    (@internal $x:expr, $default:expr) => {
        $x + $default
    };
}

fn main() {
    println!("{}", complex_macro!(5));  // 15
}
```

## 🔧 Common Macro Patterns

### Assert With Message

```rust
macro_rules! assert_msg {
    ($cond:expr, $msg:expr) => {
        if !$cond {
            panic!("Assertion failed: {}", $msg);
        }
    };
}

fn main() {
    let x = 5;
    assert_msg!(x > 0, "x must be positive");
}
```

### Option/Result Helpers

```rust
macro_rules! unwrap_or_return {
    ($expr:expr) => {
        match $expr {
            Some(val) => val,
            None => return,
        }
    };
}

fn process(x: Option<i32>) -> i32 {
    let value = unwrap_or_return!(x);
    value * 2
}

fn main() {
    println!("{}", process(Some(5)));  // 10
    process(None);  // Returns early
}
```

### Debug Print

```rust
macro_rules! dbg_var {
    ($var:expr) => {
        println!("{} = {:?}", stringify!($var), $var);
    };
}

fn main() {
    let x = 42;
    let name = "Alice";

    dbg_var!(x);     // x = 42
    dbg_var!(name);  // name = "Alice"
}
```

## 🎯 Macro Hygiene

### Variable Hygiene

```rust
macro_rules! safe_macro {
    ($x:expr) => {
        {
            let temp = $x;
            temp * 2
        }
    };
}

fn main() {
    let temp = 10;
    // safe_macro creates its own 'temp', doesn't conflict
    println!("{}", safe_macro!(5));
    println!("{}", temp);
}
```

### Using $crate

```rust
// In a library crate
macro_rules! my_macro {
    () => {
        // Use $crate to refer to current crate
        $crate::internal_function()
    };
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Simple Macro

```rust
// TODO: Viết macro print_twice!
// print_twice!("hello") in ra "hello" hai lần

fn main() {
    // print_twice!("hello");
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
macro_rules! print_twice {
    ($msg:expr) => {
        println!("{}", $msg);
        println!("{}", $msg);
    };
}

fn main() {
    print_twice!("hello");
}
```
</details>

### Bài 2: Max Macro

```rust
// TODO: Viết macro max! tìm số lớn nhất
// max!(1, 2, 3, 4, 5) => 5

fn main() {
    // println!("{}", max!(1, 2, 3, 4, 5));
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
macro_rules! max {
    ($x:expr) => ($x);
    ($x:expr, $($rest:expr),+) => {
        {
            let rest_max = max!($($rest),+);
            if $x > rest_max { $x } else { rest_max }
        }
    };
}

fn main() {
    println!("{}", max!(1, 2, 3, 4, 5));  // 5
}
```
</details>

### Bài 3: Struct Generator

```rust
// TODO: Viết macro để tạo struct với getters
// create_struct!(Person { name: String, age: u32 })

fn main() {
    // let p = Person::new("Alice".to_string(), 30);
    // println!("{}", p.name());
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
macro_rules! create_struct {
    ($name:ident { $($field:ident: $type:ty),* }) => {
        struct $name {
            $($field: $type,)*
        }

        impl $name {
            fn new($($field: $type),*) -> Self {
                $name { $($field),* }
            }

            $(
                fn $field(&self) -> &$type {
                    &self.$field
                }
            )*
        }
    };
}

create_struct!(Person { name: String, age: u32 });

fn main() {
    let p = Person::new("Alice".to_string(), 30);
    println!("{}", p.name());
}
```
</details>

## 🎯 Tóm Tắt

| Pattern | Syntax | Use Case |
|---------|--------|----------|
| **Simple** | `() => {}` | No arguments |
| **Expression** | `($x:expr)` | Single expression |
| **Multiple** | `($x:expr, $y:expr)` | Multiple args |
| **Repetition** | `($($x:expr),*)` | Variable args |
| **Type** | `($t:ty)` | Type parameter |
| **Identifier** | `($name:ident)` | Names |

**Quy tắc vàng**:
- ✅ Macros cho repetitive code
- ✅ Compile-time code generation
- ✅ Use hygiene để tránh conflicts
- ✅ Document macros như functions
- ✅ Test macros thoroughly
- ✅ Prefer functions when possible

## 🔗 Liên Kết Hữu Ích

- [The Little Book of Rust Macros](https://veykril.github.io/tlborm/)
- [macro_rules!](https://doc.rust-lang.org/reference/macros-by-example.html)

---

**Congratulations! 🎉** Bạn đã hoàn thành phần **Advanced** của Rust tutorials!

**Các phần tiếp theo**:
- 🎮 Projects - Dự án thực hành
- 💪 Practice - Bài tập luyện tập
- 📚 Reference - Tài liệu tham khảo
- 📖 Glossary - Từ điển thuật ngữ

Keep coding and happy Rusting! 🦀
