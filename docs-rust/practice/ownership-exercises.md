# Ownership Exercises

Master Rust's ownership system with these exercises covering move semantics, borrowing, references, and common ownership patterns.

---

## Exercise 1: Fix the Ownership Error

**Difficulty**: Easy

**Problem**: The following code has an ownership error. Fix it without cloning.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    println!("{}", s1);  // Error: value borrowed after move
}
```

**Requirements**:
- Fix the code to print both strings
- Don't use `.clone()`
- Use borrowing instead

**Hints**:
- Think about borrowing instead of moving
- Use references (`&`)

<details>
<summary>Solution</summary>

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = &s1;  // Borrow instead of move
    println!("s1: {}", s1);
    println!("s2: {}", s2);
}

// Alternative: keep ownership with s1
fn main_alt() {
    let s1 = String::from("hello");
    println!("s1: {}", s1);
    let s2 = s1;  // Now move is okay since s1 isn't used after
    println!("s2: {}", s2);
}
```

</details>

**Learning Points**:
- Understanding move semantics
- When to use references vs ownership transfer
- String is not Copy, but &str references are

---

## Exercise 2: String Length Function

**Difficulty**: Easy

**Problem**: Write a function that returns the length of a string without taking ownership.

**Requirements**:
- Function should borrow the string
- Original string should still be usable after the function call
- Return `usize`

**Example**:
```rust
let s = String::from("hello");
let len = string_length(&s);
println!("Length: {}, String: {}", len, s);  // Should work
```

**Hints**:
- Use `&String` or `&str` as parameter type
- `&str` is more flexible

<details>
<summary>Solution</summary>

```rust
fn string_length(s: &str) -> usize {
    s.len()
}

fn main() {
    let s = String::from("hello");
    let len = string_length(&s);
    println!("Length: {}, String: {}", len, s);

    // Also works with string literals
    let len2 = string_length("world");
    println!("Length: {}", len2);
}
```

</details>

**Learning Points**:
- Immutable borrowing with `&`
- `&str` vs `&String` - always prefer `&str` for function parameters
- Borrowing doesn't transfer ownership

---

## Exercise 3: Modify String

**Difficulty**: Easy

**Problem**: Write a function that appends text to a string.

**Requirements**:
- Function should modify the string in place
- Use mutable borrowing
- Don't return anything

**Example**:
```rust
let mut s = String::from("hello");
append_world(&mut s);
println!("{}", s);  // Should print "hello world"
```

**Hints**:
- Use `&mut` for mutable borrowing
- Use `push_str` method

<details>
<summary>Solution</summary>

```rust
fn append_world(s: &mut String) {
    s.push_str(" world");
}

fn main() {
    let mut s = String::from("hello");
    append_world(&mut s);
    println!("{}", s);  // Prints "hello world"
}
```

</details>

**Learning Points**:
- Mutable borrowing with `&mut`
- Only one mutable borrow allowed at a time
- The variable must also be declared `mut`

---

## Exercise 4: Multiple Borrows

**Difficulty**: Medium

**Problem**: Fix the borrowing error in this code.

```rust
fn main() {
    let mut s = String::from("hello");
    let r1 = &s;
    let r2 = &s;
    let r3 = &mut s;  // Error: cannot borrow as mutable
    println!("{}, {}, {}", r1, r2, r3);
}
```

**Requirements**:
- Understand why the error occurs
- Fix it by restructuring the code
- Explain the borrowing rules

**Hints**:
- You can't have mutable and immutable borrows at the same time
- Borrow scope ends at last use
- Consider when each reference is actually used

<details>
<summary>Solution</summary>

```rust
fn main() {
    let mut s = String::from("hello");
    let r1 = &s;
    let r2 = &s;
    println!("{}, {}", r1, r2);
    // r1 and r2 are no longer used after this point

    let r3 = &mut s;  // Now this is okay
    r3.push_str(" world");
    println!("{}", r3);
}

// Alternative: don't overlap borrows
fn main_alt() {
    let mut s = String::from("hello");

    // Scope for immutable borrows
    {
        let r1 = &s;
        let r2 = &s;
        println!("{}, {}", r1, r2);
    }

    // Now we can have a mutable borrow
    let r3 = &mut s;
    r3.push_str(" world");
    println!("{}", r3);
}
```

</details>

**Learning Points**:
- Borrowing rules: multiple immutable OR one mutable
- Non-lexical lifetimes (NLL) - borrows end at last use
- Scope-based borrow management

---

## Exercise 5: Return a Reference

**Difficulty**: Medium

**Problem**: Write a function that returns a reference to the longer of two strings.

**Requirements**:
- Function should return a reference
- Don't create new strings
- Handle the lifetime annotations correctly

**Example**:
```rust
let s1 = String::from("hello");
let s2 = String::from("world!");
let result = longest(&s1, &s2);
println!("Longest: {}", result);
```

**Hints**:
- You'll need lifetime annotations
- The returned reference's lifetime depends on the input lifetimes
- Use `'a` lifetime parameter

<details>
<summary>Solution</summary>

```rust
fn longest<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() {
        s1
    } else {
        s2
    }
}

fn main() {
    let s1 = String::from("hello");
    let s2 = String::from("world!");
    let result = longest(&s1, &s2);
    println!("Longest: {}", result);
}
```

</details>

**Learning Points**:
- Lifetime annotations with `'a`
- Why lifetimes are needed for references in return types
- The returned reference's lifetime is tied to the shortest input lifetime

---

## Exercise 6: Vector Ownership

**Difficulty**: Easy

**Problem**: Fix the ownership issue with this vector code.

```rust
fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let sum = calculate_sum(v);
    println!("Sum: {}", sum);
    println!("Vector: {:?}", v);  // Error: value used after move
}

fn calculate_sum(v: Vec<i32>) -> i32 {
    v.iter().sum()
}
```

**Requirements**:
- Fix so both prints work
- Use borrowing, not cloning
- Keep the function signature readable

**Hints**:
- Pass a reference to the vector
- Change the function parameter type

<details>
<summary>Solution</summary>

```rust
fn calculate_sum(v: &Vec<i32>) -> i32 {
    v.iter().sum()
}

// Better: use slice instead of Vec reference
fn calculate_sum_better(v: &[i32]) -> i32 {
    v.iter().sum()
}

fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let sum = calculate_sum(&v);
    println!("Sum: {}", sum);
    println!("Vector: {:?}", v);  // Now works!
}
```

</details>

**Learning Points**:
- Passing collections by reference
- `&[T]` (slice) is more flexible than `&Vec<T>`
- Avoiding unnecessary ownership transfers

---

## Exercise 7: String Builder

**Difficulty**: Medium

**Problem**: Create a function that builds a string from multiple string slices.

**Requirements**:
- Take a vector of string slices
- Join them with a separator
- Return an owned String
- Don't modify the input vector

**Example**:
```rust
let words = vec!["hello", "world", "from", "rust"];
let result = join_strings(&words, " ");
println!("{}", result);  // "hello world from rust"
```

**Hints**:
- Create a new String to build the result
- Use `push_str` to add strings
- Add separator between words, not at the end

<details>
<summary>Solution</summary>

```rust
fn join_strings(words: &[&str], separator: &str) -> String {
    let mut result = String::new();

    for (i, word) in words.iter().enumerate() {
        result.push_str(word);
        if i < words.len() - 1 {
            result.push_str(separator);
        }
    }

    result
}

// Using iterator methods (more idiomatic)
fn join_strings_iter(words: &[&str], separator: &str) -> String {
    words.join(separator)
}

fn main() {
    let words = vec!["hello", "world", "from", "rust"];
    let result = join_strings(&words, " ");
    println!("{}", result);
}
```

</details>

**Learning Points**:
- Building owned data from borrowed data
- String concatenation strategies
- Standard library methods like `join`

---

## Exercise 8: First Word

**Difficulty**: Medium

**Problem**: Write a function that returns a reference to the first word in a string.

**Requirements**:
- Return a string slice
- A word ends at the first space
- If no space, return the entire string

**Example**:
```rust
let s = String::from("hello world");
let word = first_word(&s);
println!("{}", word);  // "hello"
```

**Hints**:
- Use `find` method to locate the first space
- Return a slice of the string
- Handle the case where there's no space

<details>
<summary>Solution</summary>

```rust
fn first_word(s: &str) -> &str {
    match s.find(' ') {
        Some(index) => &s[..index],
        None => s,
    }
}

// Alternative using split
fn first_word_alt(s: &str) -> &str {
    s.split_whitespace().next().unwrap_or("")
}

fn main() {
    let s1 = String::from("hello world");
    let s2 = String::from("hello");

    println!("First word of '{}': '{}'", s1, first_word(&s1));
    println!("First word of '{}': '{}'", s2, first_word(&s2));
}
```

</details>

**Learning Points**:
- String slicing with `&s[..]`
- Returning slices that point into the original data
- Pattern matching with `Option`

---

## Exercise 9: Swap Values

**Difficulty**: Medium

**Problem**: Write a function that swaps two values using mutable references.

**Requirements**:
- Take two mutable references
- Swap their values
- Work with any type that implements Copy

**Example**:
```rust
let mut x = 5;
let mut y = 10;
swap(&mut x, &mut y);
println!("x: {}, y: {}", x, y);  // x: 10, y: 5
```

**Hints**:
- Use `std::mem::swap` or implement manually
- Need a temporary variable if implementing manually
- Generic function with `Copy` bound

<details>
<summary>Solution</summary>

```rust
use std::mem;

// Using std::mem::swap (preferred)
fn swap<T>(a: &mut T, b: &mut T) {
    mem::swap(a, b);
}

// Manual implementation (for learning)
fn swap_manual<T: Copy>(a: &mut T, b: &mut T) {
    let temp = *a;
    *a = *b;
    *b = temp;
}

fn main() {
    let mut x = 5;
    let mut y = 10;
    println!("Before: x = {}, y = {}", x, y);

    swap(&mut x, &mut y);
    println!("After: x = {}, y = {}", x, y);

    // Works with other types too
    let mut s1 = String::from("hello");
    let mut s2 = String::from("world");
    swap(&mut s1, &mut s2);
    println!("s1: {}, s2: {}", s1, s2);
}
```

</details>

**Learning Points**:
- Mutable reference patterns
- `std::mem::swap` for safe swapping
- Generic functions with trait bounds
- Dereferencing with `*`

---

## Exercise 10: Data Race Prevention

**Difficulty**: Hard

**Problem**: Explain why this code won't compile and fix it.

```rust
fn main() {
    let mut data = vec![1, 2, 3];
    let ptr = &data[0];
    data.push(4);  // Error
    println!("First element: {}", ptr);
}
```

**Requirements**:
- Explain the borrowing conflict
- Fix the code
- Understand why Rust prevents this

**Hints**:
- Think about what `push` might do internally
- Consider vector reallocation
- The borrow must end before the mutation

<details>
<summary>Solution</summary>

```rust
fn main() {
    let mut data = vec![1, 2, 3];

    // Fix 1: End the borrow before mutating
    {
        let ptr = &data[0];
        println!("First element: {}", ptr);
    }  // ptr goes out of scope here
    data.push(4);

    // Fix 2: Don't hold reference across mutation
    let first = data[0];  // Copy the value instead
    data.push(4);
    println!("First element: {}", first);

    // Fix 3: Reorder operations
    let mut data2 = vec![1, 2, 3];
    data2.push(4);  // Mutate first
    let ptr = &data2[0];  // Then borrow
    println!("First element: {}", ptr);
}
```

**Explanation**:
When you borrow `&data[0]`, you get a reference into the vector. If the vector reallocates during `push`, that reference would become invalid (dangling pointer). Rust prevents this at compile time by not allowing mutable operations on `data` while an immutable borrow exists.

</details>

**Learning Points**:
- Understanding Rust's prevention of dangling pointers
- Vector reallocation and its implications
- Why borrowing rules exist: memory safety without runtime cost

---

## Exercise 11: Split String Mutably

**Difficulty**: Hard

**Problem**: Write a function that splits a vector at a given index into two mutable slices.

**Requirements**:
- Return two mutable slices
- Use the `split_at_mut` pattern
- Both slices should be usable simultaneously

**Example**:
```rust
let mut v = vec![1, 2, 3, 4, 5];
let (left, right) = split_vec(&mut v, 2);
left[0] = 10;
right[0] = 20;
// v is now [10, 2, 20, 4, 5]
```

**Hints**:
- Use `split_at_mut` method
- Return a tuple of slices
- Both slices are mutable but non-overlapping

<details>
<summary>Solution</summary>

```rust
fn split_vec(v: &mut Vec<i32>, index: usize) -> (&mut [i32], &mut [i32]) {
    v.split_at_mut(index)
}

fn main() {
    let mut v = vec![1, 2, 3, 4, 5];
    println!("Original: {:?}", v);

    let (left, right) = split_vec(&mut v, 2);
    left[0] = 10;
    right[0] = 20;

    // Can't use left and right here as v is borrowed
    drop(left);
    drop(right);

    println!("Modified: {:?}", v);
}

// More practical example: process both halves
fn process_halves(v: &mut [i32], index: usize) {
    let (left, right) = v.split_at_mut(index);

    for val in left.iter_mut() {
        *val *= 2;
    }

    for val in right.iter_mut() {
        *val *= 3;
    }
}
```

</details>

**Learning Points**:
- Multiple mutable borrows are okay if they don't overlap
- `split_at_mut` is safe because slices are disjoint
- Rust's borrow checker can reason about non-overlapping borrows

---

## Exercise 12: Reference Counter

**Difficulty**: Medium

**Problem**: Use `Rc` (Reference Counted) to share ownership of data.

**Requirements**:
- Create shared ownership of a value
- Multiple owners should be able to read the value
- Use `Rc<T>`

**Example**:
```rust
// Create a value that can be shared
// Multiple variables should own it
```

**Hints**:
- Import `std::rc::Rc`
- Use `Rc::new()` to create
- Use `Rc::clone()` to share (not `.clone()`)
- Check reference count with `Rc::strong_count()`

<details>
<summary>Solution</summary>

```rust
use std::rc::Rc;

fn main() {
    let data = Rc::new(String::from("Hello, Rc!"));
    println!("Reference count: {}", Rc::strong_count(&data));

    let data2 = Rc::clone(&data);
    println!("Reference count: {}", Rc::strong_count(&data));

    let data3 = Rc::clone(&data);
    println!("Reference count: {}", Rc::strong_count(&data));

    println!("data: {}", data);
    println!("data2: {}", data2);
    println!("data3: {}", data3);

    drop(data3);
    println!("After dropping data3, count: {}", Rc::strong_count(&data));
}

// Practical example: shared data in a tree structure
struct Node {
    value: i32,
    parent: Option<Rc<Node>>,
}

fn create_tree() {
    let parent = Rc::new(Node {
        value: 1,
        parent: None,
    });

    let child1 = Node {
        value: 2,
        parent: Some(Rc::clone(&parent)),
    };

    let child2 = Node {
        value: 3,
        parent: Some(Rc::clone(&parent)),
    };

    println!("Parent reference count: {}", Rc::strong_count(&parent));
}
```

</details>

**Learning Points**:
- `Rc<T>` for shared ownership
- Reference counting in Rust
- When to use `Rc` vs regular references
- `Rc` is not thread-safe (use `Arc` for threads)

---

## Exercise 13: Interior Mutability

**Difficulty**: Hard

**Problem**: Use `RefCell` to mutate data through an immutable reference.

**Requirements**:
- Understand when to use `RefCell`
- Combine with `Rc` for shared mutable state
- Handle borrowing at runtime

**Example**:
```rust
// Create a value that can be mutated even through shared references
```

**Hints**:
- Import `std::cell::RefCell`
- Use `borrow()` for immutable access
- Use `borrow_mut()` for mutable access
- Runtime borrow checking

<details>
<summary>Solution</summary>

```rust
use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    // Simple RefCell usage
    let data = RefCell::new(5);

    // Immutable borrow
    {
        let borrowed = data.borrow();
        println!("Value: {}", borrowed);
    }

    // Mutable borrow
    {
        let mut borrowed = data.borrow_mut();
        *borrowed += 1;
    }

    println!("Modified value: {}", data.borrow());
}

// Practical example: shared mutable state
#[derive(Debug)]
struct SharedCounter {
    count: RefCell<i32>,
}

impl SharedCounter {
    fn new() -> Rc<Self> {
        Rc::new(SharedCounter {
            count: RefCell::new(0),
        })
    }

    fn increment(&self) {
        *self.count.borrow_mut() += 1;
    }

    fn get(&self) -> i32 {
        *self.count.borrow()
    }
}

fn use_shared_counter() {
    let counter = SharedCounter::new();
    let counter2 = Rc::clone(&counter);

    counter.increment();
    counter2.increment();

    println!("Count: {}", counter.get());  // 2
}
```

</details>

**Learning Points**:
- Interior mutability pattern
- `RefCell` for runtime borrow checking
- Combining `Rc` and `RefCell` for shared mutable data
- Panics if borrow rules are violated at runtime

---

## Exercise 14: Lifetime Elision

**Difficulty**: Medium

**Problem**: Rewrite these functions without explicit lifetime annotations where possible.

```rust
fn first_word<'a>(s: &'a str) -> &'a str {
    s.split_whitespace().next().unwrap_or("")
}

fn longer<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() { s1 } else { s2 }
}
```

**Requirements**:
- Understand lifetime elision rules
- Remove annotations where compiler can infer them
- Keep annotations where necessary

**Hints**:
- Rule 1: Each parameter gets its own lifetime
- Rule 2: If one input lifetime, output gets that lifetime
- Rule 3: If `&self`, output gets `self`'s lifetime

<details>
<summary>Solution</summary>

```rust
// Can elide - only one input lifetime
fn first_word(s: &str) -> &str {
    s.split_whitespace().next().unwrap_or("")
}

// Cannot elide - multiple input lifetimes, compiler can't infer
fn longer<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() { s1 } else { s2 }
}

// Methods with self can often elide
struct StringWrapper {
    data: String,
}

impl StringWrapper {
    // Can elide - output lifetime tied to &self
    fn get_data(&self) -> &str {
        &self.data
    }

    // Cannot elide - multiple input lifetimes
    fn longest_with<'a>(&'a self, other: &'a str) -> &'a str {
        if self.data.len() > other.len() {
            &self.data
        } else {
            other
        }
    }
}

fn main() {
    println!("{}", first_word("hello world"));

    let s1 = "hello";
    let s2 = "world!";
    println!("{}", longer(s1, s2));
}
```

</details>

**Learning Points**:
- Three lifetime elision rules
- When explicit annotations are needed
- Compiler's lifetime inference capabilities

---

## Exercise 15: Avoiding Clone

**Difficulty**: Hard

**Problem**: Refactor this code to avoid unnecessary clones.

```rust
fn process_data(data: Vec<String>) -> Vec<String> {
    let mut result = Vec::new();
    for item in data.clone() {
        if item.len() > 5 {
            result.push(item.clone());
        }
    }
    result
}
```

**Requirements**:
- Remove all unnecessary `.clone()` calls
- Maintain the same functionality
- Use appropriate borrowing

**Hints**:
- Iterate by reference
- Use `to_string()` only when needed
- Think about what ownership is actually needed

<details>
<summary>Solution</summary>

```rust
// Solution 1: If we need to consume the input
fn process_data_consume(data: Vec<String>) -> Vec<String> {
    data.into_iter()
        .filter(|item| item.len() > 5)
        .collect()
}

// Solution 2: If we need to keep the input
fn process_data_borrow(data: &[String]) -> Vec<String> {
    data.iter()
        .filter(|item| item.len() > 5)
        .cloned()  // Only clone the items we keep
        .collect()
}

// Solution 3: Return references if possible
fn process_data_refs(data: &[String]) -> Vec<&String> {
    data.iter()
        .filter(|item| item.len() > 5)
        .collect()
}

// Solution 4: Return indices
fn process_data_indices(data: &[String]) -> Vec<usize> {
    data.iter()
        .enumerate()
        .filter(|(_, item)| item.len() > 5)
        .map(|(i, _)| i)
        .collect()
}

fn main() {
    let data = vec![
        String::from("hi"),
        String::from("hello"),
        String::from("world"),
        String::from("hello world"),
    ];

    let result = process_data_consume(data.clone());
    println!("Filtered: {:?}", result);

    let result_refs = process_data_refs(&data);
    println!("Filtered refs: {:?}", result_refs);
}
```

</details>

**Learning Points**:
- Avoiding unnecessary clones for performance
- Different strategies based on use case
- `into_iter()` vs `iter()` vs `iter_mut()`
- When cloning is actually necessary vs when it's not

---

## Common Ownership Patterns

### Pattern 1: Builder Pattern
```rust
struct Config {
    host: String,
    port: u16,
}

impl Config {
    fn builder() -> ConfigBuilder {
        ConfigBuilder::default()
    }
}

struct ConfigBuilder {
    host: Option<String>,
    port: Option<u16>,
}

impl ConfigBuilder {
    fn host(mut self, host: String) -> Self {
        self.host = Some(host);
        self  // Return self for chaining
    }

    fn port(mut self, port: u16) -> Self {
        self.port = Some(port);
        self
    }

    fn build(self) -> Config {
        Config {
            host: self.host.unwrap_or_else(|| "localhost".to_string()),
            port: self.port.unwrap_or(8080),
        }
    }
}
```

### Pattern 2: Splitting Borrows
```rust
struct Data {
    field1: i32,
    field2: i32,
}

impl Data {
    fn modify_both(&mut self) {
        // Can borrow different fields mutably at same time
        let f1 = &mut self.field1;
        let f2 = &mut self.field2;
        *f1 += 1;
        *f2 += 2;
    }
}
```

### Pattern 3: Using Entry API
```rust
use std::collections::HashMap;

fn word_count(text: &str) -> HashMap<String, usize> {
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        *map.entry(word.to_string()).or_insert(0) += 1;
    }
    map
}
```

## Tips for Mastering Ownership

1. **Think about ownership from the start** - Design your APIs with ownership in mind
2. **Prefer borrowing** - Use references by default, move only when necessary
3. **Use slices** - `&[T]` and `&str` are more flexible than `&Vec<T>` and `&String`
4. **Understand the rules** - One mutable OR multiple immutable borrows
5. **Let the compiler guide you** - Error messages are very helpful
6. **Practice** - Ownership becomes intuitive with experience

## Next Steps

- Study lifetime annotations in depth
- Learn about smart pointers (`Box`, `Rc`, `Arc`)
- Understand interior mutability (`Cell`, `RefCell`)
- Practice with real-world code
- Move on to struct and enum exercises
