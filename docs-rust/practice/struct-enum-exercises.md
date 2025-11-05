# Struct and Enum Exercises

Master Rust's type system with these exercises covering struct definitions, methods, enums, pattern matching, and real-world modeling.

---

## Exercise 1: Basic Rectangle

**Difficulty**: Easy

**Problem**: Create a `Rectangle` struct and implement methods to calculate area and perimeter.

**Requirements**:
- Define a struct with width and height
- Implement `area()` method
- Implement `perimeter()` method
- Implement `can_hold()` to check if another rectangle fits inside

**Example**:
```rust
let rect = Rectangle::new(10, 20);
println!("Area: {}", rect.area());           // 200
println!("Perimeter: {}", rect.perimeter()); // 60
```

**Hints**:
- Use `impl` block for methods
- Use `&self` for methods that don't modify the struct
- Area = width × height, Perimeter = 2 × (width + height)

<details>
<summary>Solution</summary>

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn new(width: u32, height: u32) -> Self {
        Rectangle { width, height }
    }

    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn perimeter(&self) -> u32 {
        2 * (self.width + self.height)
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width >= other.width && self.height >= other.height
    }

    fn is_square(&self) -> bool {
        self.width == self.height
    }
}

fn main() {
    let rect1 = Rectangle::new(10, 20);
    let rect2 = Rectangle::new(5, 10);

    println!("Rectangle: {:?}", rect1);
    println!("Area: {}", rect1.area());
    println!("Perimeter: {}", rect1.perimeter());
    println!("Is square: {}", rect1.is_square());
    println!("Can hold rect2: {}", rect1.can_hold(&rect2));
}
```

</details>

**Learning Points**:
- Defining structs with named fields
- Associated functions (like `new`)
- Methods with `&self`
- Deriving `Debug` trait

---

## Exercise 2: Point and Distance

**Difficulty**: Easy

**Problem**: Create a `Point` struct and calculate distance between two points.

**Requirements**:
- Create a 2D point struct
- Implement `distance_from_origin()` method
- Implement `distance_to()` method for distance to another point
- Use floating-point coordinates

**Example**:
```rust
let p1 = Point::new(0.0, 0.0);
let p2 = Point::new(3.0, 4.0);
println!("Distance: {}", p1.distance_to(&p2));  // 5.0
```

**Hints**:
- Distance formula: √((x2-x1)² + (y2-y1)²)
- Use `f64::sqrt()` for square root
- Use `.powi(2)` for squaring

<details>
<summary>Solution</summary>

```rust
#[derive(Debug, Clone, Copy)]
struct Point {
    x: f64,
    y: f64,
}

impl Point {
    fn new(x: f64, y: f64) -> Self {
        Point { x, y }
    }

    fn distance_from_origin(&self) -> f64 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }

    fn distance_to(&self, other: &Point) -> f64 {
        let dx = self.x - other.x;
        let dy = self.y - other.y;
        (dx.powi(2) + dy.powi(2)).sqrt()
    }

    fn midpoint(&self, other: &Point) -> Point {
        Point {
            x: (self.x + other.x) / 2.0,
            y: (self.y + other.y) / 2.0,
        }
    }
}

fn main() {
    let p1 = Point::new(0.0, 0.0);
    let p2 = Point::new(3.0, 4.0);

    println!("p1: {:?}", p1);
    println!("p2: {:?}", p2);
    println!("Distance from origin: {}", p2.distance_from_origin());
    println!("Distance between points: {}", p1.distance_to(&p2));
    println!("Midpoint: {:?}", p1.midpoint(&p2));
}
```

</details>

**Learning Points**:
- Deriving `Copy` and `Clone` for simple types
- Mathematical operations in Rust
- Methods that return new instances

---

## Exercise 3: Traffic Light Enum

**Difficulty**: Easy

**Problem**: Create a `TrafficLight` enum and implement behavior for each state.

**Requirements**:
- Define enum with Red, Yellow, Green variants
- Implement `duration()` method that returns how long each light lasts
- Implement `next()` method that returns the next light in the sequence

**Example**:
```rust
let light = TrafficLight::Red;
println!("Duration: {} seconds", light.duration());
println!("Next: {:?}", light.next());
```

**Hints**:
- Use `match` for pattern matching
- Each variant can have different behavior
- Use `&self` for methods

<details>
<summary>Solution</summary>

```rust
#[derive(Debug, Clone, Copy, PartialEq)]
enum TrafficLight {
    Red,
    Yellow,
    Green,
}

impl TrafficLight {
    fn duration(&self) -> u32 {
        match self {
            TrafficLight::Red => 60,
            TrafficLight::Yellow => 5,
            TrafficLight::Green => 55,
        }
    }

    fn next(&self) -> TrafficLight {
        match self {
            TrafficLight::Red => TrafficLight::Green,
            TrafficLight::Yellow => TrafficLight::Red,
            TrafficLight::Green => TrafficLight::Yellow,
        }
    }

    fn can_cross(&self) -> bool {
        match self {
            TrafficLight::Red => false,
            TrafficLight::Yellow => false,
            TrafficLight::Green => true,
        }
    }
}

fn main() {
    let mut light = TrafficLight::Red;

    for _ in 0..5 {
        println!("{:?}: {} seconds, can cross: {}",
                 light, light.duration(), light.can_cross());
        light = light.next();
    }
}
```

</details>

**Learning Points**:
- Defining enums without data
- Pattern matching with `match`
- Deriving `PartialEq` for comparison
- Methods on enums

---

## Exercise 4: Shape Enum with Data

**Difficulty**: Medium

**Problem**: Create a `Shape` enum that can represent circles, rectangles, and triangles with their dimensions.

**Requirements**:
- Each variant should store appropriate data
- Implement `area()` method for each shape
- Implement `perimeter()` method

**Example**:
```rust
let circle = Shape::Circle(5.0);
let rect = Shape::Rectangle(10.0, 20.0);
println!("Circle area: {}", circle.area());
```

**Hints**:
- Use tuple-like or struct-like variants
- Match on variants and extract data
- π ≈ 3.14159 or use `std::f64::consts::PI`

<details>
<summary>Solution</summary>

```rust
use std::f64::consts::PI;

#[derive(Debug)]
enum Shape {
    Circle(f64),                    // radius
    Rectangle(f64, f64),            // width, height
    Triangle(f64, f64, f64),        // three sides
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(radius) => PI * radius * radius,
            Shape::Rectangle(width, height) => width * height,
            Shape::Triangle(a, b, c) => {
                // Heron's formula
                let s = (a + b + c) / 2.0;
                (s * (s - a) * (s - b) * (s - c)).sqrt()
            }
        }
    }

    fn perimeter(&self) -> f64 {
        match self {
            Shape::Circle(radius) => 2.0 * PI * radius,
            Shape::Rectangle(width, height) => 2.0 * (width + height),
            Shape::Triangle(a, b, c) => a + b + c,
        }
    }
}

fn main() {
    let shapes = vec![
        Shape::Circle(5.0),
        Shape::Rectangle(10.0, 20.0),
        Shape::Triangle(3.0, 4.0, 5.0),
    ];

    for shape in shapes {
        println!("{:?}", shape);
        println!("  Area: {:.2}", shape.area());
        println!("  Perimeter: {:.2}", shape.perimeter());
    }
}
```

</details>

**Learning Points**:
- Enum variants with different types of data
- Pattern matching to extract data
- Using constants from standard library
- Heron's formula for triangle area

---

## Exercise 5: Option and Result Practice

**Difficulty**: Medium

**Problem**: Create a `Person` struct with optional middle name and implement safe division.

**Requirements**:
- Use `Option<String>` for middle name
- Implement `full_name()` method
- Create `divide()` function that returns `Result`
- Handle division by zero

**Example**:
```rust
let person = Person::new("John", Some("Michael"), "Doe");
println!("{}", person.full_name());
```

**Hints**:
- Use `Option` for values that may not exist
- Use `Result<T, E>` for operations that can fail
- Pattern match or use combinators

<details>
<summary>Solution</summary>

```rust
#[derive(Debug)]
struct Person {
    first_name: String,
    middle_name: Option<String>,
    last_name: String,
}

impl Person {
    fn new(first: &str, middle: Option<&str>, last: &str) -> Self {
        Person {
            first_name: first.to_string(),
            middle_name: middle.map(|s| s.to_string()),
            last_name: last.to_string(),
        }
    }

    fn full_name(&self) -> String {
        match &self.middle_name {
            Some(middle) => format!("{} {} {}", self.first_name, middle, self.last_name),
            None => format!("{} {}", self.first_name, self.last_name),
        }
    }

    fn initials(&self) -> String {
        let first = self.first_name.chars().next().unwrap();
        let last = self.last_name.chars().next().unwrap();

        match &self.middle_name {
            Some(middle) => {
                let middle_initial = middle.chars().next().unwrap();
                format!("{}.{}.{}.", first, middle_initial, last)
            }
            None => format!("{}.{}.", first, last),
        }
    }
}

#[derive(Debug)]
enum MathError {
    DivisionByZero,
}

fn divide(a: f64, b: f64) -> Result<f64, MathError> {
    if b == 0.0 {
        Err(MathError::DivisionByZero)
    } else {
        Ok(a / b)
    }
}

fn main() {
    let person1 = Person::new("John", Some("Michael"), "Doe");
    let person2 = Person::new("Jane", None, "Smith");

    println!("{}", person1.full_name());
    println!("{}", person2.full_name());
    println!("{}", person1.initials());

    match divide(10.0, 2.0) {
        Ok(result) => println!("10 / 2 = {}", result),
        Err(e) => println!("Error: {:?}", e),
    }

    match divide(10.0, 0.0) {
        Ok(result) => println!("10 / 0 = {}", result),
        Err(e) => println!("Error: {:?}", e),
    }
}
```

</details>

**Learning Points**:
- Using `Option` for optional fields
- Using `Result` for error handling
- Pattern matching on Option and Result
- Custom error types

---

## Exercise 6: Linked List Node

**Difficulty**: Hard

**Problem**: Implement a simple singly linked list node using enums.

**Requirements**:
- Use `Box` for heap allocation
- Each node contains data and optional next node
- Implement methods to add and traverse

**Example**:
```rust
let mut list = List::new();
list.push(1);
list.push(2);
list.push(3);
```

**Hints**:
- Use `Option<Box<Node>>` for the next pointer
- `Box` allows recursive types
- Implement iteratively to avoid deep recursion

<details>
<summary>Solution</summary>

```rust
#[derive(Debug)]
struct Node<T> {
    data: T,
    next: Option<Box<Node<T>>>,
}

#[derive(Debug)]
struct List<T> {
    head: Option<Box<Node<T>>>,
}

impl<T> List<T> {
    fn new() -> Self {
        List { head: None }
    }

    fn push(&mut self, data: T) {
        let new_node = Box::new(Node {
            data,
            next: self.head.take(),
        });
        self.head = Some(new_node);
    }

    fn pop(&mut self) -> Option<T> {
        self.head.take().map(|node| {
            self.head = node.next;
            node.data
        })
    }

    fn peek(&self) -> Option<&T> {
        self.head.as_ref().map(|node| &node.data)
    }
}

impl<T: std::fmt::Display> List<T> {
    fn print(&self) {
        let mut current = &self.head;
        while let Some(node) = current {
            print!("{} -> ", node.data);
            current = &node.next;
        }
        println!("None");
    }
}

fn main() {
    let mut list = List::new();

    list.push(1);
    list.push(2);
    list.push(3);

    println!("List:");
    list.print();

    println!("Peek: {:?}", list.peek());

    println!("Pop: {:?}", list.pop());
    println!("After pop:");
    list.print();
}
```

</details>

**Learning Points**:
- Using `Box` for heap-allocated recursive types
- `Option` for representing null pointers
- `take()` method to move out of an Option
- Generic types with trait bounds

---

## Exercise 7: JSON-like Value Enum

**Difficulty**: Medium

**Problem**: Create an enum to represent JSON-like values.

**Requirements**:
- Support Null, Bool, Number, String, Array, Object
- Implement `to_string()` method for each variant
- Support nested structures

**Example**:
```rust
let value = JsonValue::Object(vec![
    ("name", JsonValue::String("John")),
    ("age", JsonValue::Number(30)),
]);
```

**Hints**:
- Use `HashMap` or `Vec<(String, JsonValue)>` for objects
- Make it recursive for arrays and objects
- Use `Box` if needed for size

<details>
<summary>Solution</summary>

```rust
use std::collections::HashMap;

#[derive(Debug, Clone)]
enum JsonValue {
    Null,
    Bool(bool),
    Number(f64),
    String(String),
    Array(Vec<JsonValue>),
    Object(HashMap<String, JsonValue>),
}

impl JsonValue {
    fn to_string(&self) -> String {
        match self {
            JsonValue::Null => "null".to_string(),
            JsonValue::Bool(b) => b.to_string(),
            JsonValue::Number(n) => n.to_string(),
            JsonValue::String(s) => format!("\"{}\"", s),
            JsonValue::Array(arr) => {
                let items: Vec<String> = arr.iter()
                    .map(|v| v.to_string())
                    .collect();
                format!("[{}]", items.join(", "))
            }
            JsonValue::Object(obj) => {
                let items: Vec<String> = obj.iter()
                    .map(|(k, v)| format!("\"{}\": {}", k, v.to_string()))
                    .collect();
                format!("{{{}}}", items.join(", "))
            }
        }
    }

    fn get_type(&self) -> &str {
        match self {
            JsonValue::Null => "null",
            JsonValue::Bool(_) => "boolean",
            JsonValue::Number(_) => "number",
            JsonValue::String(_) => "string",
            JsonValue::Array(_) => "array",
            JsonValue::Object(_) => "object",
        }
    }
}

fn main() {
    let mut person = HashMap::new();
    person.insert("name".to_string(), JsonValue::String("John".to_string()));
    person.insert("age".to_string(), JsonValue::Number(30.0));
    person.insert("active".to_string(), JsonValue::Bool(true));

    let hobbies = JsonValue::Array(vec![
        JsonValue::String("reading".to_string()),
        JsonValue::String("coding".to_string()),
    ]);
    person.insert("hobbies".to_string(), hobbies);

    let value = JsonValue::Object(person);
    println!("{}", value.to_string());
    println!("Type: {}", value.get_type());
}
```

</details>

**Learning Points**:
- Complex enum structures
- Recursive types
- Pattern matching on complex enums
- Building domain-specific types

---

## Exercise 8: State Machine

**Difficulty**: Medium

**Problem**: Model a connection state machine using enums.

**Requirements**:
- States: Disconnected, Connecting, Connected, Error
- Each state can transition to specific other states
- Implement `transition()` method
- Store state-specific data

**Example**:
```rust
let mut conn = Connection::new();
conn.connect("server.com");
conn.send_data("hello");
```

**Hints**:
- Use enum variants with different data
- Some transitions are invalid
- Return `Result` for transitions

<details>
<summary>Solution</summary>

```rust
#[derive(Debug)]
enum ConnectionState {
    Disconnected,
    Connecting { server: String },
    Connected { server: String, session_id: u32 },
    Error { message: String },
}

#[derive(Debug)]
struct Connection {
    state: ConnectionState,
}

impl Connection {
    fn new() -> Self {
        Connection {
            state: ConnectionState::Disconnected,
        }
    }

    fn connect(&mut self, server: &str) -> Result<(), String> {
        match &self.state {
            ConnectionState::Disconnected => {
                self.state = ConnectionState::Connecting {
                    server: server.to_string(),
                };
                // Simulate connection
                self.state = ConnectionState::Connected {
                    server: server.to_string(),
                    session_id: 12345,
                };
                Ok(())
            }
            _ => Err("Can only connect from disconnected state".to_string()),
        }
    }

    fn send_data(&self, data: &str) -> Result<(), String> {
        match &self.state {
            ConnectionState::Connected { server, session_id } => {
                println!("Sending '{}' to {} (session: {})", data, server, session_id);
                Ok(())
            }
            _ => Err("Not connected".to_string()),
        }
    }

    fn disconnect(&mut self) -> Result<(), String> {
        match &self.state {
            ConnectionState::Connected { .. } => {
                self.state = ConnectionState::Disconnected;
                Ok(())
            }
            _ => Err("Not connected".to_string()),
        }
    }

    fn get_status(&self) -> String {
        match &self.state {
            ConnectionState::Disconnected => "Disconnected".to_string(),
            ConnectionState::Connecting { server } => {
                format!("Connecting to {}...", server)
            }
            ConnectionState::Connected { server, session_id } => {
                format!("Connected to {} (session: {})", server, session_id)
            }
            ConnectionState::Error { message } => {
                format!("Error: {}", message)
            }
        }
    }
}

fn main() {
    let mut conn = Connection::new();
    println!("Status: {}", conn.get_status());

    conn.connect("server.com").unwrap();
    println!("Status: {}", conn.get_status());

    conn.send_data("hello").unwrap();

    conn.disconnect().unwrap();
    println!("Status: {}", conn.get_status());
}
```

</details>

**Learning Points**:
- State machines with enums
- Struct-like enum variants
- Enforcing valid state transitions
- Extracting data from enum variants

---

## Exercise 9: Generic Container

**Difficulty**: Medium

**Problem**: Create a generic `Container` struct that can hold any type.

**Requirements**:
- Use generics
- Implement methods: `new`, `set`, `get`
- Implement `map` to transform the value
- Add trait bounds where needed

**Example**:
```rust
let mut container = Container::new(5);
container.set(10);
let doubled = container.map(|x| x * 2);
```

**Hints**:
- Use `<T>` for generic type parameter
- `Clone` bound might be needed
- `map` creates a new container

<details>
<summary>Solution</summary>

```rust
#[derive(Debug)]
struct Container<T> {
    value: T,
}

impl<T> Container<T> {
    fn new(value: T) -> Self {
        Container { value }
    }

    fn set(&mut self, value: T) {
        self.value = value;
    }

    fn get(&self) -> &T {
        &self.value
    }

    fn get_mut(&mut self) -> &mut T {
        &mut self.value
    }

    fn into_inner(self) -> T {
        self.value
    }

    fn map<U, F>(self, f: F) -> Container<U>
    where
        F: FnOnce(T) -> U,
    {
        Container {
            value: f(self.value),
        }
    }
}

impl<T: Clone> Container<T> {
    fn cloned(&self) -> Container<T> {
        Container {
            value: self.value.clone(),
        }
    }
}

impl<T: std::fmt::Display> Container<T> {
    fn print(&self) {
        println!("Container contains: {}", self.value);
    }
}

fn main() {
    let mut container = Container::new(5);
    container.print();

    container.set(10);
    container.print();

    let doubled = container.map(|x| x * 2);
    doubled.print();

    let string_container = Container::new("hello".to_string());
    string_container.print();

    let length = string_container.map(|s| s.len());
    println!("Length: {:?}", length);
}
```

</details>

**Learning Points**:
- Generic structs
- Generic methods
- Trait bounds (`Clone`, `Display`)
- Method chaining with generics
- `FnOnce` for closures

---

## Exercise 10: Employee Database

**Difficulty**: Medium

**Problem**: Create an employee management system with different employee types.

**Requirements**:
- Base `Employee` struct
- `EmployeeType` enum (FullTime, PartTime, Contractor)
- Each type has different payment calculation
- Implement `calculate_salary()` method

**Example**:
```rust
let emp = Employee::new("John", EmployeeType::FullTime(50000));
println!("Salary: {}", emp.monthly_salary());
```

**Hints**:
- Store employee type as enum with data
- Match on type for salary calculation
- Consider adding more methods

<details>
<summary>Solution</summary>

```rust
#[derive(Debug)]
enum EmployeeType {
    FullTime { annual_salary: u32 },
    PartTime { hourly_rate: u32, hours_per_week: u32 },
    Contractor { hourly_rate: u32 },
}

#[derive(Debug)]
struct Employee {
    name: String,
    id: u32,
    employee_type: EmployeeType,
}

impl Employee {
    fn new(name: &str, id: u32, employee_type: EmployeeType) -> Self {
        Employee {
            name: name.to_string(),
            id,
            employee_type,
        }
    }

    fn monthly_salary(&self) -> u32 {
        match &self.employee_type {
            EmployeeType::FullTime { annual_salary } => annual_salary / 12,
            EmployeeType::PartTime { hourly_rate, hours_per_week } => {
                hourly_rate * hours_per_week * 4
            }
            EmployeeType::Contractor { hourly_rate } => {
                // Contractors bill variable hours, return base rate
                *hourly_rate * 160  // Assume 160 hours/month
            }
        }
    }

    fn employment_status(&self) -> &str {
        match &self.employee_type {
            EmployeeType::FullTime { .. } => "Full-Time",
            EmployeeType::PartTime { .. } => "Part-Time",
            EmployeeType::Contractor { .. } => "Contractor",
        }
    }

    fn give_raise(&mut self, percentage: f64) {
        match &mut self.employee_type {
            EmployeeType::FullTime { annual_salary } => {
                *annual_salary = (*annual_salary as f64 * (1.0 + percentage / 100.0)) as u32;
            }
            EmployeeType::PartTime { hourly_rate, .. } => {
                *hourly_rate = (*hourly_rate as f64 * (1.0 + percentage / 100.0)) as u32;
            }
            EmployeeType::Contractor { hourly_rate } => {
                *hourly_rate = (*hourly_rate as f64 * (1.0 + percentage / 100.0)) as u32;
            }
        }
    }
}

fn main() {
    let mut employees = vec![
        Employee::new("Alice", 1, EmployeeType::FullTime { annual_salary: 60000 }),
        Employee::new("Bob", 2, EmployeeType::PartTime {
            hourly_rate: 20,
            hours_per_week: 20,
        }),
        Employee::new("Carol", 3, EmployeeType::Contractor { hourly_rate: 50 }),
    ];

    for emp in &employees {
        println!("{} ({}): ${}/month",
                 emp.name, emp.employment_status(), emp.monthly_salary());
    }

    // Give Alice a 10% raise
    employees[0].give_raise(10.0);
    println!("\nAfter Alice's raise:");
    println!("{}: ${}/month", employees[0].name, employees[0].monthly_salary());
}
```

</details>

**Learning Points**:
- Modeling domain entities
- Enum variants with named fields
- Mutable references to enum data
- Business logic in methods

---

## Exercise 11: Builder Pattern

**Difficulty**: Medium

**Problem**: Implement the builder pattern for a `User` struct.

**Requirements**:
- Create `UserBuilder` struct
- Required fields: username
- Optional fields: email, age, location
- Chain methods together
- `build()` returns `Result<User, String>`

**Example**:
```rust
let user = User::builder()
    .username("john_doe")
    .email("john@example.com")
    .age(30)
    .build()?;
```

**Hints**:
- Builder methods take `self` and return `Self`
- Use `Option` for optional fields
- Validate in `build()` method

<details>
<summary>Solution</summary>

```rust
#[derive(Debug)]
struct User {
    username: String,
    email: Option<String>,
    age: Option<u32>,
    location: Option<String>,
}

struct UserBuilder {
    username: Option<String>,
    email: Option<String>,
    age: Option<u32>,
    location: Option<String>,
}

impl User {
    fn builder() -> UserBuilder {
        UserBuilder {
            username: None,
            email: None,
            age: None,
            location: None,
        }
    }
}

impl UserBuilder {
    fn username(mut self, username: &str) -> Self {
        self.username = Some(username.to_string());
        self
    }

    fn email(mut self, email: &str) -> Self {
        self.email = Some(email.to_string());
        self
    }

    fn age(mut self, age: u32) -> Self {
        self.age = Some(age);
        self
    }

    fn location(mut self, location: &str) -> Self {
        self.location = Some(location.to_string());
        self
    }

    fn build(self) -> Result<User, String> {
        let username = self.username
            .ok_or("Username is required")?;

        // Validate username
        if username.len() < 3 {
            return Err("Username must be at least 3 characters".to_string());
        }

        // Validate age if provided
        if let Some(age) = self.age {
            if age < 13 {
                return Err("User must be at least 13 years old".to_string());
            }
        }

        Ok(User {
            username,
            email: self.email,
            age: self.age,
            location: self.location,
        })
    }
}

fn main() {
    let user1 = User::builder()
        .username("john_doe")
        .email("john@example.com")
        .age(30)
        .location("New York")
        .build();

    match user1 {
        Ok(user) => println!("Created user: {:?}", user),
        Err(e) => println!("Error: {}", e),
    }

    // Missing username
    let user2 = User::builder()
        .email("jane@example.com")
        .build();

    match user2 {
        Ok(user) => println!("Created user: {:?}", user),
        Err(e) => println!("Error: {}", e),
    }

    // Invalid age
    let user3 = User::builder()
        .username("kid")
        .age(10)
        .build();

    match user3 {
        Ok(user) => println!("Created user: {:?}", user),
        Err(e) => println!("Error: {}", e),
    }
}
```

</details>

**Learning Points**:
- Builder pattern in Rust
- Method chaining
- Validation in constructors
- Using `Result` for fallible construction

---

## Exercise 12: Binary Tree

**Difficulty**: Hard

**Problem**: Implement a simple binary search tree.

**Requirements**:
- Create `TreeNode` with left and right children
- Implement `insert()` method
- Implement `contains()` method
- Implement in-order traversal

**Example**:
```rust
let mut tree = BinaryTree::new();
tree.insert(5);
tree.insert(3);
tree.insert(7);
println!("Contains 3: {}", tree.contains(3));
```

**Hints**:
- Use `Option<Box<TreeNode>>`
- Recursive insertion and search
- Compare values for BST property

<details>
<summary>Solution</summary>

```rust
#[derive(Debug)]
struct TreeNode<T: Ord> {
    value: T,
    left: Option<Box<TreeNode<T>>>,
    right: Option<Box<TreeNode<T>>>,
}

#[derive(Debug)]
struct BinaryTree<T: Ord> {
    root: Option<Box<TreeNode<T>>>,
}

impl<T: Ord> BinaryTree<T> {
    fn new() -> Self {
        BinaryTree { root: None }
    }

    fn insert(&mut self, value: T) {
        self.root = Self::insert_node(self.root.take(), value);
    }

    fn insert_node(node: Option<Box<TreeNode<T>>>, value: T) -> Option<Box<TreeNode<T>>> {
        match node {
            None => Some(Box::new(TreeNode {
                value,
                left: None,
                right: None,
            })),
            Some(mut n) => {
                if value < n.value {
                    n.left = Self::insert_node(n.left.take(), value);
                } else if value > n.value {
                    n.right = Self::insert_node(n.right.take(), value);
                }
                // If equal, don't insert (no duplicates)
                Some(n)
            }
        }
    }

    fn contains(&self, value: &T) -> bool {
        Self::contains_node(&self.root, value)
    }

    fn contains_node(node: &Option<Box<TreeNode<T>>>, value: &T) -> bool {
        match node {
            None => false,
            Some(n) => {
                if value == &n.value {
                    true
                } else if value < &n.value {
                    Self::contains_node(&n.left, value)
                } else {
                    Self::contains_node(&n.right, value)
                }
            }
        }
    }

    fn inorder(&self) -> Vec<&T> {
        let mut result = Vec::new();
        Self::inorder_node(&self.root, &mut result);
        result
    }

    fn inorder_node<'a>(node: &'a Option<Box<TreeNode<T>>>, result: &mut Vec<&'a T>) {
        if let Some(n) = node {
            Self::inorder_node(&n.left, result);
            result.push(&n.value);
            Self::inorder_node(&n.right, result);
        }
    }
}

fn main() {
    let mut tree = BinaryTree::new();

    let values = vec![5, 3, 7, 1, 4, 6, 9];
    for val in values {
        tree.insert(val);
    }

    println!("Tree: {:?}", tree);
    println!("Inorder traversal: {:?}", tree.inorder());
    println!("Contains 4: {}", tree.contains(&4));
    println!("Contains 8: {}", tree.contains(&8));
}
```

</details>

**Learning Points**:
- Recursive data structures
- `Box` for owned heap data
- Recursive algorithms
- Binary search tree properties
- Generic types with trait bounds (`Ord`)

---

## Exercise 13: Card Deck

**Difficulty**: Medium

**Problem**: Model a deck of playing cards.

**Requirements**:
- Create `Suit` and `Rank` enums
- Create `Card` struct
- Create `Deck` struct with shuffle and deal methods
- Implement comparison for cards

**Example**:
```rust
let mut deck = Deck::new();
deck.shuffle();
let card = deck.deal();
```

**Hints**:
- Use `rand` crate for shuffling
- Derive necessary traits
- Implement ordering for poker rules

<details>
<summary>Solution</summary>

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Suit {
    Hearts,
    Diamonds,
    Clubs,
    Spades,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
enum Rank {
    Two = 2,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
struct Card {
    suit: Suit,
    rank: Rank,
}

impl Card {
    fn new(suit: Suit, rank: Rank) -> Self {
        Card { suit, rank }
    }
}

impl std::fmt::Display for Card {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{:?} of {:?}", self.rank, self.suit)
    }
}

#[derive(Debug)]
struct Deck {
    cards: Vec<Card>,
}

impl Deck {
    fn new() -> Self {
        let mut cards = Vec::new();

        for &suit in &[Suit::Hearts, Suit::Diamonds, Suit::Clubs, Suit::Spades] {
            for &rank in &[
                Rank::Two, Rank::Three, Rank::Four, Rank::Five,
                Rank::Six, Rank::Seven, Rank::Eight, Rank::Nine,
                Rank::Ten, Rank::Jack, Rank::Queen, Rank::King, Rank::Ace,
            ] {
                cards.push(Card::new(suit, rank));
            }
        }

        Deck { cards }
    }

    fn shuffle(&mut self) {
        use rand::seq::SliceRandom;
        let mut rng = rand::thread_rng();
        self.cards.shuffle(&mut rng);
    }

    fn deal(&mut self) -> Option<Card> {
        self.cards.pop()
    }

    fn cards_remaining(&self) -> usize {
        self.cards.len()
    }
}

fn main() {
    let mut deck = Deck::new();
    println!("New deck has {} cards", deck.cards_remaining());

    deck.shuffle();
    println!("Shuffled!");

    println!("\nDealing 5 cards:");
    for _ in 0..5 {
        if let Some(card) = deck.deal() {
            println!("  {}", card);
        }
    }

    println!("\nCards remaining: {}", deck.cards_remaining());
}
```

**Note**: Add `rand = "0.8"` to your `Cargo.toml`.

</details>

**Learning Points**:
- Modeling real-world entities
- Multiple related enums
- Implementing traits (`Display`, `PartialOrd`)
- Using external crates for functionality

---

## Exercise 14: Message Types

**Difficulty**: Medium

**Problem**: Create a messaging system with different message types.

**Requirements**:
- `Message` enum with Text, Image, Video variants
- Each variant stores relevant data
- Implement `size()` method
- Implement `preview()` method

**Example**:
```rust
let msg = Message::Text("Hello".to_string());
println!("Size: {} bytes", msg.size());
```

**Hints**:
- Store metadata for each type
- Size calculation differs by type
- Preview should be concise

<details>
<summary>Solution</summary>

```rust
#[derive(Debug, Clone)]
enum Message {
    Text {
        content: String,
    },
    Image {
        url: String,
        width: u32,
        height: u32,
        size_bytes: usize,
    },
    Video {
        url: String,
        duration_seconds: u32,
        size_bytes: usize,
    },
}

impl Message {
    fn size(&self) -> usize {
        match self {
            Message::Text { content } => content.len(),
            Message::Image { size_bytes, .. } => *size_bytes,
            Message::Video { size_bytes, .. } => *size_bytes,
        }
    }

    fn preview(&self) -> String {
        match self {
            Message::Text { content } => {
                if content.len() <= 50 {
                    content.clone()
                } else {
                    format!("{}...", &content[..47])
                }
            }
            Message::Image { url, width, height, .. } => {
                format!("Image: {} ({}x{})", url, width, height)
            }
            Message::Video { url, duration_seconds, .. } => {
                let minutes = duration_seconds / 60;
                let seconds = duration_seconds % 60;
                format!("Video: {} ({}:{:02})", url, minutes, seconds)
            }
        }
    }

    fn message_type(&self) -> &str {
        match self {
            Message::Text { .. } => "text",
            Message::Image { .. } => "image",
            Message::Video { .. } => "video",
        }
    }
}

fn main() {
    let messages = vec![
        Message::Text {
            content: "Hello, World!".to_string(),
        },
        Message::Image {
            url: "photo.jpg".to_string(),
            width: 1920,
            height: 1080,
            size_bytes: 524288,
        },
        Message::Video {
            url: "video.mp4".to_string(),
            duration_seconds: 125,
            size_bytes: 10485760,
        },
        Message::Text {
            content: "This is a very long message that should be truncated in the preview".to_string(),
        },
    ];

    for msg in messages {
        println!("{} - {} bytes", msg.preview(), msg.size());
        println!("  Type: {}\n", msg.message_type());
    }
}
```

</details>

**Learning Points**:
- Enum variants with struct-like syntax
- Pattern matching on complex variants
- String truncation and formatting
- Domain modeling

---

## Exercise 15: Type-Safe IDs

**Difficulty**: Medium

**Problem**: Create type-safe wrapper types for different ID types.

**Requirements**:
- Create `UserId`, `ProductId`, `OrderId` newtypes
- Prevent mixing different ID types
- Implement `Display` and `From<u32>`
- Add validation

**Example**:
```rust
let user_id = UserId::new(1);
let product_id = ProductId::new(100);
// user_id == product_id  // Compile error!
```

**Hints**:
- Use tuple structs for newtypes
- Implement traits for convenience
- Can't accidentally mix different ID types

<details>
<summary>Solution</summary>

```rust
use std::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
struct UserId(u32);

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
struct ProductId(u32);

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
struct OrderId(u32);

impl UserId {
    fn new(id: u32) -> Result<Self, String> {
        if id == 0 {
            Err("User ID cannot be zero".to_string())
        } else {
            Ok(UserId(id))
        }
    }

    fn value(&self) -> u32 {
        self.0
    }
}

impl ProductId {
    fn new(id: u32) -> Result<Self, String> {
        if id == 0 {
            Err("Product ID cannot be zero".to_string())
        } else {
            Ok(ProductId(id))
        }
    }

    fn value(&self) -> u32 {
        self.0
    }
}

impl OrderId {
    fn new(id: u32) -> Result<Self, String> {
        if id == 0 {
            Err("Order ID cannot be zero".to_string())
        } else {
            Ok(OrderId(id))
        }
    }

    fn value(&self) -> u32 {
        self.0
    }
}

impl fmt::Display for UserId {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "User#{}", self.0)
    }
}

impl fmt::Display for ProductId {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Product#{}", self.0)
    }
}

impl fmt::Display for OrderId {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Order#{}", self.0)
    }
}

struct Order {
    id: OrderId,
    user_id: UserId,
    product_ids: Vec<ProductId>,
}

impl Order {
    fn new(id: OrderId, user_id: UserId, product_ids: Vec<ProductId>) -> Self {
        Order {
            id,
            user_id,
            product_ids,
        }
    }

    fn print_summary(&self) {
        println!("Order: {}", self.id);
        println!("  User: {}", self.user_id);
        println!("  Products:");
        for product_id in &self.product_ids {
            println!("    {}", product_id);
        }
    }
}

fn main() {
    let user_id = UserId::new(42).unwrap();
    let product1 = ProductId::new(100).unwrap();
    let product2 = ProductId::new(101).unwrap();
    let order_id = OrderId::new(1000).unwrap();

    let order = Order::new(order_id, user_id, vec![product1, product2]);
    order.print_summary();

    // This would be a compile error - can't mix ID types:
    // let order_bad = Order::new(user_id, order_id, vec![]);

    // Validation works:
    match UserId::new(0) {
        Ok(id) => println!("Created: {}", id),
        Err(e) => println!("Error: {}", e),
    }
}
```

</details>

**Learning Points**:
- Newtype pattern for type safety
- Preventing type confusion at compile time
- Implementing traits for custom types
- Validation in constructors
- Using `Hash` for use in collections

---

## Tips for Success

1. **Start Simple** - Begin with basic structs and enums before complex patterns
2. **Think About Ownership** - Consider whether methods need `&self`, `&mut self`, or `self`
3. **Use Derive** - Automatically implement common traits with `#[derive(...)]`
4. **Pattern Match** - Enums and pattern matching go hand in hand
5. **Model Your Domain** - Use types to represent your problem domain accurately

## Next Steps

- Learn about trait objects and dynamic dispatch
- Explore advanced pattern matching
- Study smart pointers (`Box`, `Rc`, `Arc`, `RefCell`)
- Practice with iterator exercises
- Build larger projects combining these concepts
