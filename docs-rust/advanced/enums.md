---
sidebar_position: 7
title: "Enums: Một Trong Nhiều Khả Năng"
description: "Tìm hiểu cách sử dụng enums để biểu diễn nhiều variants và pattern matching"
---

# 🎲 Enums: Một Trong Nhiều Khả Năng

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được enum là gì và khi nào dùng
- ✅ Định nghĩa enums với các variants
- ✅ Sử dụng enum variants với data
- ✅ Pattern matching với `match`
- ✅ Hiểu preview về `Option` và `Result`
- ✅ Áp dụng enums trong code thực tế

## 🤔 Enum Là Gì?

### Ẩn Dụ Cuộc Sống: Trạng Thái Đơn Hàng

**Enum** giống như **trạng thái đơn hàng**:

📦 **Đơn Hàng**:
- Chỉ có **một trạng thái** tại một thời điểm
- Có thể là: Đang chờ, Đang giao, Đã giao, Đã hủy
- Không thể vừa "Đang giao" vừa "Đã hủy"

🎲 **Enum Trong Rust**:
- Định nghĩa **một tập hợp các khả năng**
- Giá trị chỉ có thể là **một variant**
- Type-safe: Compiler đảm bảo bạn xử lý tất cả cases

### Tại Sao Cần Enums?

**Không dùng enum** (dễ lỗi):
```rust
const PENDING: i32 = 0;
const SHIPPING: i32 = 1;
const DELIVERED: i32 = 2;
const CANCELLED: i32 = 3;

fn main() {
    let status = 1;

    // ❌ Dễ nhầm lẫn, không type-safe
    if status == SHIPPING {
        println!("Đang giao hàng");
    }

    // ❌ Có thể dùng số bất kỳ
    let invalid_status = 99;  // Lỗi logic!
}
```

**Dùng enum** (an toàn):
```rust
enum OrderStatus {
    Pending,
    Shipping,
    Delivered,
    Cancelled,
}

fn main() {
    let status = OrderStatus::Shipping;

    // ✅ Type-safe, compiler kiểm tra
    match status {
        OrderStatus::Pending => println!("Đang chờ"),
        OrderStatus::Shipping => println!("Đang giao"),
        OrderStatus::Delivered => println!("Đã giao"),
        OrderStatus::Cancelled => println!("Đã hủy"),
    }
}
```

## 📦 Định Nghĩa Enums

### Cú Pháp Cơ Bản

```rust
enum Direction {
    North,
    South,
    East,
    West,
}

fn main() {
    let dir = Direction::North;

    match dir {
        Direction::North => println!("Đi Bắc"),
        Direction::South => println!("Đi Nam"),
        Direction::East => println!("Đi Đông"),
        Direction::West => println!("Đi Tây"),
    }
}
```

**Giải thích**:
- `enum Direction` → Định nghĩa enum
- `North`, `South`, ... → Các variants
- `Direction::North` → Tạo giá trị

### Enum Với Data

Variants có thể chứa dữ liệu:

```rust
enum Message {
    Quit,                       // Không có data
    Move { x: i32, y: i32 },   // Struct-like
    Write(String),              // Tuple-like
    ChangeColor(i32, i32, i32), // Multiple values
}

fn main() {
    let msg1 = Message::Quit;
    let msg2 = Message::Move { x: 10, y: 20 };
    let msg3 = Message::Write(String::from("Hello"));
    let msg4 = Message::ChangeColor(255, 0, 0);

    process_message(msg3);
}

fn process_message(msg: Message) {
    match msg {
        Message::Quit => {
            println!("Thoát chương trình");
        }
        Message::Move { x, y } => {
            println!("Di chuyển đến ({}, {})", x, y);
        }
        Message::Write(text) => {
            println!("Viết: {}", text);
        }
        Message::ChangeColor(r, g, b) => {
            println!("Đổi màu RGB({}, {}, {})", r, g, b);
        }
    }
}
```

**Đầu ra**:
```
Viết: Hello
```

## 🎯 Pattern Matching

### Match Expression

```rust
enum TrafficLight {
    Red,
    Yellow,
    Green,
}

fn main() {
    let light = TrafficLight::Red;

    let action = match light {
        TrafficLight::Red => "Dừng",
        TrafficLight::Yellow => "Chuẩn bị",
        TrafficLight::Green => "Đi",
    };

    println!("{}", action);
}
```

**Đặc điểm**:
- `match` phải **exhaustive** (xử lý tất cả cases)
- Mỗi arm trả về cùng kiểu
- Compiler kiểm tra đầy đủ

### Match Với Data

```rust
enum Shape {
    Circle(f64),              // Radius
    Rectangle(f64, f64),      // Width, Height
    Triangle(f64, f64, f64),  // 3 cạnh
}

fn main() {
    let shape = Shape::Circle(5.0);

    let area = calculate_area(shape);

    println!("Diện tích: {:.2}", area);
}

fn calculate_area(shape: Shape) -> f64 {
    match shape {
        Shape::Circle(radius) => {
            std::f64::consts::PI * radius * radius
        }
        Shape::Rectangle(width, height) => {
            width * height
        }
        Shape::Triangle(a, b, c) => {
            // Heron's formula
            let s = (a + b + c) / 2.0;
            (s * (s - a) * (s - b) * (s - c)).sqrt()
        }
    }
}
```

**Đầu ra**:
```
Diện tích: 78.54
```

### `_` Wildcard

Bắt tất cả cases còn lại:

```rust
enum Number {
    Zero,
    One,
    Two,
    Three,
    // ... nhiều variants khác
}

fn main() {
    let num = Number::Two;

    match num {
        Number::Zero => println!("Không"),
        Number::One => println!("Một"),
        _ => println!("Số khác"),
    }
}
```

### If Let

Shortcut cho match một case:

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn main() {
    let coin = Coin::Quarter;

    // Match đầy đủ
    match coin {
        Coin::Quarter => println!("Quarter!"),
        _ => {},
    }

    // If let - ngắn gọn hơn
    if let Coin::Quarter = coin {
        println!("Quarter!");
    }
}
```

## 🎓 Methods Cho Enums

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

impl Message {
    fn call(&self) {
        match self {
            Message::Quit => println!("Quit called"),
            Message::Move { x, y } => println!("Move to ({}, {})", x, y),
            Message::Write(text) => println!("Write: {}", text),
        }
    }

    fn is_quit(&self) -> bool {
        matches!(self, Message::Quit)
    }
}

fn main() {
    let msg = Message::Write(String::from("Hello"));
    msg.call();

    let quit = Message::Quit;
    println!("Is quit: {}", quit.is_quit());
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: IP Address

```rust
#[derive(Debug)]
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

fn main() {
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));

    println!("{:?}", home);
    println!("{:?}", loopback);

    display_ip(&home);
}

fn display_ip(ip: &IpAddr) {
    match ip {
        IpAddr::V4(a, b, c, d) => {
            println!("IPv4: {}.{}.{}.{}", a, b, c, d);
        }
        IpAddr::V6(addr) => {
            println!("IPv6: {}", addr);
        }
    }
}
```

**Đầu ra**:
```
V4(127, 0, 0, 1)
V6("::1")
IPv4: 127.0.0.1
```

### Ví Dụ 2: Payment Method

```rust
enum PaymentMethod {
    Cash,
    Card { number: String, cvv: String },
    MobilePay { phone: String },
}

fn main() {
    let payment1 = PaymentMethod::Cash;
    let payment2 = PaymentMethod::Card {
        number: String::from("1234-5678-9012-3456"),
        cvv: String::from("123"),
    };
    let payment3 = PaymentMethod::MobilePay {
        phone: String::from("0901234567"),
    };

    process_payment(&payment1);
    process_payment(&payment2);
    process_payment(&payment3);
}

fn process_payment(method: &PaymentMethod) {
    match method {
        PaymentMethod::Cash => {
            println!("Thanh toán tiền mặt");
        }
        PaymentMethod::Card { number, .. } => {
            println!("Thanh toán thẻ: {}", number);
        }
        PaymentMethod::MobilePay { phone } => {
            println!("Thanh toán di động: {}", phone);
        }
    }
}
```

**Đầu ra**:
```
Thanh toán tiền mặt
Thanh toán thẻ: 1234-5678-9012-3456
Thanh toán di động: 0901234567
```

### Ví Dụ 3: Web Event

```rust
enum WebEvent {
    PageLoad,
    PageUnload,
    KeyPress(char),
    Click { x: i32, y: i32 },
    Paste(String),
}

fn main() {
    let events = vec![
        WebEvent::PageLoad,
        WebEvent::KeyPress('x'),
        WebEvent::Click { x: 100, y: 200 },
        WebEvent::Paste(String::from("Hello")),
        WebEvent::PageUnload,
    ];

    for event in events {
        handle_event(event);
    }
}

fn handle_event(event: WebEvent) {
    match event {
        WebEvent::PageLoad => println!("Trang đã tải"),
        WebEvent::PageUnload => println!("Trang đã đóng"),
        WebEvent::KeyPress(c) => println!("Nhấn phím: '{}'", c),
        WebEvent::Click { x, y } => println!("Click tại ({}, {})", x, y),
        WebEvent::Paste(text) => println!("Dán: {}", text),
    }
}
```

**Đầu ra**:
```
Trang đã tải
Nhấn phím: 'x'
Click tại (100, 200)
Dán: Hello
Trang đã đóng
```

### Ví Dụ 4: Calculator

```rust
enum Operation {
    Add(f64, f64),
    Subtract(f64, f64),
    Multiply(f64, f64),
    Divide(f64, f64),
}

impl Operation {
    fn calculate(&self) -> Option<f64> {
        match self {
            Operation::Add(a, b) => Some(a + b),
            Operation::Subtract(a, b) => Some(a - b),
            Operation::Multiply(a, b) => Some(a * b),
            Operation::Divide(a, b) => {
                if *b != 0.0 {
                    Some(a / b)
                } else {
                    None  // Chia cho 0
                }
            }
        }
    }
}

fn main() {
    let ops = vec![
        Operation::Add(5.0, 3.0),
        Operation::Subtract(10.0, 4.0),
        Operation::Multiply(6.0, 7.0),
        Operation::Divide(20.0, 4.0),
        Operation::Divide(10.0, 0.0),
    ];

    for op in ops {
        match op.calculate() {
            Some(result) => println!("Kết quả: {}", result),
            None => println!("Lỗi: Không thể tính"),
        }
    }
}
```

**Đầu ra**:
```
Kết quả: 8
Kết quả: 6
Kết quả: 42
Kết quả: 5
Lỗi: Không thể tính
```

## 🌟 Preview: Option và Result

### Option<T>

Biểu diễn giá trị có thể có hoặc không có:

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Option<&i32>
    let first = numbers.first();

    match first {
        Some(value) => println!("Đầu tiên: {}", value),
        None => println!("Vector rỗng"),
    }
}
```

**Định nghĩa trong standard library**:
```rust
enum Option<T> {
    Some(T),
    None,
}
```

### Result<T, E>

Biểu diễn thành công hoặc lỗi:

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Chia cho 0!"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(result) => println!("Kết quả: {}", result),
        Err(error) => println!("Lỗi: {}", error),
    }

    match divide(10.0, 0.0) {
        Ok(result) => println!("Kết quả: {}", result),
        Err(error) => println!("Lỗi: {}", error),
    }
}
```

**Đầu ra**:
```
Kết quả: 5
Lỗi: Chia cho 0!
```

**Định nghĩa trong standard library**:
```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

## 🚫 Lỗi Thường Gặp

### Lỗi 1: Match Không Exhaustive

```rust
enum Color {
    Red,
    Green,
    Blue,
}

fn main() {
    let color = Color::Red;

    // ❌ Lỗi - thiếu Blue
    match color {
        Color::Red => println!("Đỏ"),
        Color::Green => println!("Xanh lá"),
    }
}
```

**Sửa**:
```rust
match color {
    Color::Red => println!("Đỏ"),
    Color::Green => println!("Xanh lá"),
    Color::Blue => println!("Xanh dương"),
}
```

### Lỗi 2: Quên Destructure Data

```rust
enum Message {
    Move { x: i32, y: i32 },
}

fn main() {
    let msg = Message::Move { x: 10, y: 20 };

    // ❌ Lỗi - không thể truy cập x, y trực tiếp
    // println!("{}", msg.x);

    // ✅ Đúng - dùng match
    match msg {
        Message::Move { x, y } => println!("({}, {})", x, y),
    }
}
```

### Lỗi 3: Sai Kiểu Trong Match Arms

```rust
enum Value {
    Number(i32),
    Text(String),
}

fn main() {
    let val = Value::Number(42);

    // ❌ Lỗi - arms trả về kiểu khác nhau
    let result = match val {
        Value::Number(n) => n,         // i32
        Value::Text(s) => s,           // String
    };
}
```

**Sửa**:
```rust
let result = match val {
    Value::Number(n) => n.to_string(),
    Value::Text(s) => s,
};
```

## 💻 Bài Tập Thực Hành

### Bài 1: Day of Week

```rust
enum DayOfWeek {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

fn main() {
    let day = DayOfWeek::Friday;

    // TODO: In ra "Thứ X" hoặc "Cuối tuần"
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let day = DayOfWeek::Friday;

    match day {
        DayOfWeek::Monday => println!("Thứ 2"),
        DayOfWeek::Tuesday => println!("Thứ 3"),
        DayOfWeek::Wednesday => println!("Thứ 4"),
        DayOfWeek::Thursday => println!("Thứ 5"),
        DayOfWeek::Friday => println!("Thứ 6"),
        DayOfWeek::Saturday | DayOfWeek::Sunday => println!("Cuối tuần"),
    }
}
```
</details>

### Bài 2: Temperature

```rust
enum Temperature {
    Celsius(f64),
    Fahrenheit(f64),
}

impl Temperature {
    fn to_celsius(&self) -> f64 {
        // TODO
    }
}

fn main() {
    let temp1 = Temperature::Celsius(25.0);
    let temp2 = Temperature::Fahrenheit(77.0);

    println!("{}°C", temp1.to_celsius());
    println!("{}°C", temp2.to_celsius());
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
impl Temperature {
    fn to_celsius(&self) -> f64 {
        match self {
            Temperature::Celsius(c) => *c,
            Temperature::Fahrenheit(f) => (f - 32.0) * 5.0 / 9.0,
        }
    }
}
```
</details>

### Bài 3: Animal Sound

```rust
enum Animal {
    Dog,
    Cat,
    Cow,
    Bird,
}

fn main() {
    let animals = vec![Animal::Dog, Animal::Cat, Animal::Cow];

    for animal in animals {
        // TODO: In ra âm thanh của từng con vật
    }
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn main() {
    let animals = vec![Animal::Dog, Animal::Cat, Animal::Cow];

    for animal in animals {
        let sound = match animal {
            Animal::Dog => "Gâu gâu",
            Animal::Cat => "Meo meo",
            Animal::Cow => "Ò ó",
            Animal::Bird => "Chíp chíp",
        };
        println!("{}", sound);
    }
}
```
</details>

## 🎯 Tóm Tắt

| Khái Niệm | Cú Pháp | Ví Dụ |
|-----------|---------|-------|
| **Định nghĩa** | `enum Name { ... }` | `enum Color { Red, Green, Blue }` |
| **Variant đơn giản** | `VariantName` | `Color::Red` |
| **Variant với data** | `Variant(T)` | `Message::Write(String)` |
| **Struct-like variant** | `Variant { field: T }` | `Move { x: i32, y: i32 }` |
| **Match** | `match value { ... }` | Xử lý tất cả variants |
| **If let** | `if let Pattern = value` | Match một case |
| **Wildcard** | `_` | Bắt tất cả còn lại |

**Quy tắc vàng**:
- ✅ Dùng enum khi giá trị chỉ có thể là một trong nhiều khả năng
- ✅ Match phải exhaustive (xử lý tất cả cases)
- ✅ Enum variants có thể chứa data
- ✅ Dùng `Option` cho giá trị có thể null
- ✅ Dùng `Result` cho operations có thể fail

## 🔗 Liên Kết Hữu Ích

- [Rust Book - Enums and Pattern Matching](https://doc.rust-lang.org/book/ch06-00-enums.html)
- [Rust By Example - Enums](https://doc.rust-lang.org/rust-by-example/custom_types/enum.html)

---

**Bài tiếp theo**: [Option →](./option.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu chi tiết về **Option** - cách Rust xử lý giá trị có thể không tồn tại!
