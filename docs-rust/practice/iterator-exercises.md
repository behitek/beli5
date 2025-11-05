# Iterator Exercises

Master Rust's powerful iterator system with these exercises covering transformations, filtering, chaining, custom iterators, and performance optimization.

---

## Exercise 1: Basic Map and Filter

**Difficulty**: Easy

**Problem**: Given a vector of integers, create a new vector with only the even numbers, each doubled.

**Requirements**:
- Use `filter` to keep only even numbers
- Use `map` to double each number
- Use `collect` to create the result vector

**Example**:
```rust
let numbers = vec![1, 2, 3, 4, 5, 6];
let result = transform_numbers(&numbers);
// result should be [4, 8, 12]
```

**Hints**:
- Chain `iter()`, `filter()`, `map()`, and `collect()`
- Use closures for transformation logic
- `filter` takes a predicate returning `bool`

<details>
<summary>Solution</summary>

```rust
fn transform_numbers(numbers: &[i32]) -> Vec<i32> {
    numbers.iter()
        .filter(|&&n| n % 2 == 0)
        .map(|&n| n * 2)
        .collect()
}

fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6];
    let result = transform_numbers(&numbers);
    println!("Input: {:?}", numbers);
    println!("Output: {:?}", result);
}
```

</details>

**Learning Points**:
- Iterator chaining fundamentals
- `filter` for conditional selection
- `map` for transformation
- `collect` to materialize results

---

## Exercise 2: Sum and Product

**Difficulty**: Easy

**Problem**: Calculate both the sum and product of a vector of numbers using iterators.

**Requirements**:
- Use `sum()` for addition
- Use `product()` for multiplication
- Return both values

**Example**:
```rust
let numbers = vec![1, 2, 3, 4];
let (sum, product) = sum_and_product(&numbers);
// sum = 10, product = 24
```

**Hints**:
- Call `iter()` twice (or clone the iterator)
- `sum()` and `product()` are iterator consumers
- Return a tuple

<details>
<summary>Solution</summary>

```rust
fn sum_and_product(numbers: &[i32]) -> (i32, i32) {
    let sum: i32 = numbers.iter().sum();
    let product: i32 = numbers.iter().product();
    (sum, product)
}

// Alternative: use fold for both
fn sum_and_product_fold(numbers: &[i32]) -> (i32, i32) {
    numbers.iter().fold((0, 1), |(sum, product), &n| {
        (sum + n, product * n)
    })
}

fn main() {
    let numbers = vec![1, 2, 3, 4];
    let (sum, product) = sum_and_product(&numbers);
    println!("Numbers: {:?}", numbers);
    println!("Sum: {}", sum);
    println!("Product: {}", product);

    let (sum2, product2) = sum_and_product_fold(&numbers);
    println!("Fold - Sum: {}, Product: {}", sum2, product2);
}
```

</details>

**Learning Points**:
- Terminal operations (`sum`, `product`)
- Multiple iterations vs single pass with `fold`
- Type inference with iterators

---

## Exercise 3: Find and Position

**Difficulty**: Easy

**Problem**: Find the first number greater than 10 and its position in the vector.

**Requirements**:
- Use `find` to get the number
- Use `position` to get the index
- Handle the case where no number matches

**Example**:
```rust
let numbers = vec![5, 8, 12, 3, 15];
let value = find_first_large(&numbers);  // Some(12)
let pos = find_position(&numbers);       // Some(2)
```

**Hints**:
- `find` returns `Option<&T>`
- `position` returns `Option<usize>`
- Both take a closure predicate

<details>
<summary>Solution</summary>

```rust
fn find_first_large(numbers: &[i32]) -> Option<i32> {
    numbers.iter()
        .find(|&&n| n > 10)
        .copied()
}

fn find_position(numbers: &[i32]) -> Option<usize> {
    numbers.iter()
        .position(|&n| n > 10)
}

fn find_both(numbers: &[i32]) -> Option<(usize, i32)> {
    numbers.iter()
        .enumerate()
        .find(|(_, &n)| n > 10)
        .map(|(i, &n)| (i, n))
}

fn main() {
    let numbers = vec![5, 8, 12, 3, 15];

    match find_first_large(&numbers) {
        Some(n) => println!("First number > 10: {}", n),
        None => println!("No number > 10 found"),
    }

    match find_position(&numbers) {
        Some(i) => println!("Position: {}", i),
        None => println!("No position found"),
    }

    match find_both(&numbers) {
        Some((i, n)) => println!("Found {} at position {}", n, i),
        None => println!("Nothing found"),
    }
}
```

</details>

**Learning Points**:
- `find` for searching
- `position` for index finding
- `enumerate` for getting indices
- Combining search operations

---

## Exercise 4: Group By Property

**Difficulty**: Medium

**Problem**: Group strings by their first character.

**Requirements**:
- Take a vector of strings
- Return a `HashMap<char, Vec<String>>`
- Use iterators for processing

**Example**:
```rust
let words = vec!["apple", "banana", "apricot", "berry"];
let grouped = group_by_first_char(&words);
// {'a': ["apple", "apricot"], 'b': ["banana", "berry"]}
```

**Hints**:
- Use `fold` to build the HashMap
- Use `entry` API for inserting
- Extract first character with `chars().next()`

<details>
<summary>Solution</summary>

```rust
use std::collections::HashMap;

fn group_by_first_char(words: &[&str]) -> HashMap<char, Vec<String>> {
    words.iter()
        .fold(HashMap::new(), |mut map, word| {
            if let Some(first_char) = word.chars().next() {
                map.entry(first_char)
                    .or_insert_with(Vec::new)
                    .push(word.to_string());
            }
            map
        })
}

// Alternative using for_each
fn group_by_first_char_alt(words: &[&str]) -> HashMap<char, Vec<String>> {
    let mut map = HashMap::new();

    words.iter()
        .for_each(|word| {
            if let Some(first_char) = word.chars().next() {
                map.entry(first_char)
                    .or_insert_with(Vec::new)
                    .push(word.to_string());
            }
        });

    map
}

fn main() {
    let words = vec!["apple", "banana", "apricot", "berry", "cherry", "avocado"];
    let grouped = group_by_first_char(&words);

    for (letter, words) in grouped.iter() {
        println!("{}: {:?}", letter, words);
    }
}
```

</details>

**Learning Points**:
- `fold` for accumulation
- HashMap entry API
- Building collections with iterators
- `for_each` as an alternative

---

## Exercise 5: Flatten Nested Vectors

**Difficulty**: Medium

**Problem**: Given a vector of vectors, flatten it into a single vector using iterators.

**Requirements**:
- Use `flatten` method
- Preserve order
- Work with any type

**Example**:
```rust
let nested = vec![vec![1, 2], vec![3, 4, 5], vec![6]];
let flat = flatten_vectors(&nested);
// [1, 2, 3, 4, 5, 6]
```

**Hints**:
- Use `iter()` then `flatten()`
- Or use `flat_map` with identity
- Can also chain with other operations

<details>
<summary>Solution</summary>

```rust
fn flatten_vectors<T: Clone>(nested: &[Vec<T>]) -> Vec<T> {
    nested.iter()
        .flatten()
        .cloned()
        .collect()
}

// Using flat_map
fn flatten_vectors_flat_map<T: Clone>(nested: &[Vec<T>]) -> Vec<T> {
    nested.iter()
        .flat_map(|v| v.iter())
        .cloned()
        .collect()
}

// Generic version that works with any nested iterator
fn flatten_generic<T>(nested: Vec<Vec<T>>) -> Vec<T> {
    nested.into_iter()
        .flatten()
        .collect()
}

fn main() {
    let nested = vec![vec![1, 2], vec![3, 4, 5], vec![6]];
    let flat = flatten_vectors(&nested);
    println!("Nested: {:?}", nested);
    println!("Flattened: {:?}", flat);

    // Works with strings too
    let nested_strings = vec![
        vec!["hello", "world"],
        vec!["rust", "is", "great"],
    ];
    let flat_strings = flatten_vectors(&nested_strings);
    println!("Flattened strings: {:?}", flat_strings);
}
```

</details>

**Learning Points**:
- `flatten` for nested iterators
- `flat_map` as alternative
- Difference between `iter()` and `into_iter()`
- Generic functions with iterators

---

## Exercise 6: Take While and Skip While

**Difficulty**: Medium

**Problem**: Extract elements from a sequence until a condition is met, and skip elements while a condition is true.

**Requirements**:
- Implement `take_until_negative` - take numbers until you hit a negative
- Implement `skip_leading_zeros` - skip zeros at the start
- Use `take_while` and `skip_while`

**Example**:
```rust
let numbers = vec![1, 2, 3, -1, 4, 5];
let taken = take_until_negative(&numbers);  // [1, 2, 3]

let numbers2 = vec![0, 0, 1, 2, 0, 3];
let skipped = skip_leading_zeros(&numbers2);  // [1, 2, 0, 3]
```

**Hints**:
- `take_while` takes elements while predicate is true
- `skip_while` skips elements while predicate is true
- Both stop at the first false condition

<details>
<summary>Solution</summary>

```rust
fn take_until_negative(numbers: &[i32]) -> Vec<i32> {
    numbers.iter()
        .take_while(|&&n| n >= 0)
        .copied()
        .collect()
}

fn skip_leading_zeros(numbers: &[i32]) -> Vec<i32> {
    numbers.iter()
        .skip_while(|&&n| n == 0)
        .copied()
        .collect()
}

fn take_and_skip_example(numbers: &[i32]) -> Vec<i32> {
    numbers.iter()
        .skip_while(|&&n| n < 10)  // Skip numbers less than 10
        .take_while(|&&n| n < 100) // Then take until we hit 100+
        .copied()
        .collect()
}

fn main() {
    let numbers1 = vec![1, 2, 3, -1, 4, 5];
    println!("Original: {:?}", numbers1);
    println!("Take until negative: {:?}", take_until_negative(&numbers1));

    let numbers2 = vec![0, 0, 1, 2, 0, 3];
    println!("\nOriginal: {:?}", numbers2);
    println!("Skip leading zeros: {:?}", skip_leading_zeros(&numbers2));

    let numbers3 = vec![1, 5, 8, 12, 25, 50, 120, 150];
    println!("\nOriginal: {:?}", numbers3);
    println!("Skip < 10, take < 100: {:?}", take_and_skip_example(&numbers3));
}
```

</details>

**Learning Points**:
- `take_while` for conditional taking
- `skip_while` for conditional skipping
- Chaining conditional iterators
- Early termination with predicates

---

## Exercise 7: Partition Data

**Difficulty**: Medium

**Problem**: Split a collection into two based on a predicate.

**Requirements**:
- Use `partition` to split numbers into even and odd
- Return tuple of two vectors
- Works in a single pass

**Example**:
```rust
let numbers = vec![1, 2, 3, 4, 5, 6];
let (even, odd) = partition_even_odd(&numbers);
// even = [2, 4, 6], odd = [1, 3, 5]
```

**Hints**:
- `partition` takes a predicate
- Returns tuple of two collections
- More efficient than filtering twice

<details>
<summary>Solution</summary>

```rust
fn partition_even_odd(numbers: &[i32]) -> (Vec<i32>, Vec<i32>) {
    numbers.iter()
        .copied()
        .partition(|&n| n % 2 == 0)
}

fn partition_by_threshold(numbers: &[i32], threshold: i32) -> (Vec<i32>, Vec<i32>) {
    numbers.iter()
        .copied()
        .partition(|&n| n >= threshold)
}

fn partition_strings_by_length(words: &[&str], min_length: usize) -> (Vec<&str>, Vec<&str>) {
    words.iter()
        .copied()
        .partition(|s| s.len() >= min_length)
}

fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let (even, odd) = partition_even_odd(&numbers);
    println!("Even: {:?}", even);
    println!("Odd: {:?}", odd);

    let (high, low) = partition_by_threshold(&numbers, 6);
    println!("\n>= 6: {:?}", high);
    println!("< 6: {:?}", low);

    let words = vec!["hi", "hello", "hey", "greetings", "yo"];
    let (long, short) = partition_strings_by_length(&words, 5);
    println!("\nLong words (>= 5 chars): {:?}", long);
    println!("Short words: {:?}", short);
}
```

</details>

**Learning Points**:
- `partition` for binary split
- Single-pass efficiency
- Working with different types
- Tuple destructuring

---

## Exercise 8: Zip Iterators

**Difficulty**: Medium

**Problem**: Combine two iterators using `zip` and perform operations on pairs.

**Requirements**:
- Zip two vectors together
- Calculate dot product of two vectors
- Pair up names with scores

**Example**:
```rust
let v1 = vec![1, 2, 3];
let v2 = vec![4, 5, 6];
let dot = dot_product(&v1, &v2);  // 1*4 + 2*5 + 3*6 = 32
```

**Hints**:
- `zip` combines two iterators
- Stops at the shorter iterator
- Use `map` on zipped pairs

<details>
<summary>Solution</summary>

```rust
fn dot_product(v1: &[i32], v2: &[i32]) -> i32 {
    v1.iter()
        .zip(v2.iter())
        .map(|(a, b)| a * b)
        .sum()
}

fn pair_names_scores(names: &[&str], scores: &[i32]) -> Vec<(String, i32)> {
    names.iter()
        .zip(scores.iter())
        .map(|(name, score)| (name.to_string(), *score))
        .collect()
}

fn element_wise_add(v1: &[i32], v2: &[i32]) -> Vec<i32> {
    v1.iter()
        .zip(v2.iter())
        .map(|(a, b)| a + b)
        .collect()
}

// Zip with index
fn annotate_with_index<T: Clone>(items: &[T]) -> Vec<(usize, T)> {
    items.iter()
        .enumerate()
        .map(|(i, item)| (i, item.clone()))
        .collect()
}

fn main() {
    let v1 = vec![1, 2, 3];
    let v2 = vec![4, 5, 6];
    println!("Dot product: {}", dot_product(&v1, &v2));

    println!("Element-wise sum: {:?}", element_wise_add(&v1, &v2));

    let names = vec!["Alice", "Bob", "Carol"];
    let scores = vec![95, 87, 92];
    let pairs = pair_names_scores(&names, &scores);
    for (name, score) in pairs {
        println!("{}: {}", name, score);
    }

    let items = vec!["a", "b", "c"];
    println!("\nWith indices: {:?}", annotate_with_index(&items));
}
```

</details>

**Learning Points**:
- `zip` for parallel iteration
- Tuple destructuring in closures
- Length mismatch handling
- `enumerate` as special zip case

---

## Exercise 9: Custom Iterator - Range

**Difficulty**: Hard

**Problem**: Create a custom iterator that generates a range of numbers with a step.

**Requirements**:
- Implement `Iterator` trait
- Support custom start, end, step
- Handle edge cases

**Example**:
```rust
let range = StepRange::new(0, 10, 2);
// Yields: 0, 2, 4, 6, 8
```

**Hints**:
- Implement `Iterator` trait
- `next()` method returns `Option<T>`
- Track current position

<details>
<summary>Solution</summary>

```rust
struct StepRange {
    current: i32,
    end: i32,
    step: i32,
}

impl StepRange {
    fn new(start: i32, end: i32, step: i32) -> Self {
        StepRange {
            current: start,
            end,
            step,
        }
    }
}

impl Iterator for StepRange {
    type Item = i32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.current < self.end {
            let result = self.current;
            self.current += self.step;
            Some(result)
        } else {
            None
        }
    }
}

// Bonus: implement DoubleEndedIterator
impl DoubleEndedIterator for StepRange {
    fn next_back(&mut self) -> Option<Self::Item> {
        if self.current < self.end {
            self.end -= self.step;
            if self.end >= self.current {
                Some(self.end)
            } else {
                None
            }
        } else {
            None
        }
    }
}

fn main() {
    println!("Range 0..10 step 2:");
    for n in StepRange::new(0, 10, 2) {
        print!("{} ", n);
    }
    println!();

    println!("\nRange 5..20 step 3:");
    for n in StepRange::new(5, 20, 3) {
        print!("{} ", n);
    }
    println!();

    println!("\nCollected to vector:");
    let vec: Vec<i32> = StepRange::new(0, 10, 2).collect();
    println!("{:?}", vec);

    println!("\nWith iterator methods:");
    let sum: i32 = StepRange::new(0, 10, 2).sum();
    println!("Sum: {}", sum);
}
```

</details>

**Learning Points**:
- Implementing `Iterator` trait
- `next()` method and state management
- Associated types (`type Item`)
- Optional: `DoubleEndedIterator`

---

## Exercise 10: Chain Multiple Iterators

**Difficulty**: Medium

**Problem**: Combine multiple vectors into a single iterator chain.

**Requirements**:
- Use `chain` to combine iterators
- Apply transformations to the combined result
- Avoid creating intermediate collections

**Example**:
```rust
let v1 = vec![1, 2, 3];
let v2 = vec![4, 5, 6];
let v3 = vec![7, 8, 9];
let result = chain_and_filter(&v1, &v2, &v3);
```

**Hints**:
- `chain` connects two iterators
- Chain multiple times for more iterators
- Can apply operations after chaining

<details>
<summary>Solution</summary>

```rust
fn chain_and_filter(v1: &[i32], v2: &[i32], v3: &[i32]) -> Vec<i32> {
    v1.iter()
        .chain(v2.iter())
        .chain(v3.iter())
        .filter(|&&n| n % 2 == 0)
        .copied()
        .collect()
}

fn chain_and_transform(v1: &[i32], v2: &[i32]) -> Vec<i32> {
    v1.iter()
        .chain(v2.iter())
        .map(|&n| n * 2)
        .collect()
}

// Chain with different types using map
fn chain_different_types() -> Vec<String> {
    let numbers = vec![1, 2, 3];
    let words = vec!["hello", "world"];

    numbers.iter()
        .map(|n| n.to_string())
        .chain(words.iter().map(|s| s.to_string()))
        .collect()
}

fn main() {
    let v1 = vec![1, 2, 3];
    let v2 = vec![4, 5, 6];
    let v3 = vec![7, 8, 9];

    println!("Chained and filtered (even only): {:?}",
             chain_and_filter(&v1, &v2, &v3));

    println!("Chained and doubled: {:?}",
             chain_and_transform(&v1, &v2));

    println!("Different types chained: {:?}",
             chain_different_types());
}
```

</details>

**Learning Points**:
- `chain` for concatenating iterators
- Chaining multiple iterators
- Applying transformations to combined data
- Zero-cost abstractions

---

## Exercise 11: Window and Chunks

**Difficulty**: Medium

**Problem**: Process a sequence in overlapping windows and non-overlapping chunks.

**Requirements**:
- Use `windows` for sliding window
- Use `chunks` for non-overlapping segments
- Calculate moving average using windows

**Example**:
```rust
let data = vec![1, 2, 3, 4, 5];
let windows = sliding_windows(&data, 3);  // [[1,2,3], [2,3,4], [3,4,5]]
let chunks = split_chunks(&data, 2);      // [[1,2], [3,4], [5]]
```

**Hints**:
- `windows(n)` creates overlapping slices of size n
- `chunks(n)` creates non-overlapping slices
- Both return iterators over slices

<details>
<summary>Solution</summary>

```rust
fn moving_average(data: &[f64], window_size: usize) -> Vec<f64> {
    data.windows(window_size)
        .map(|window| {
            let sum: f64 = window.iter().sum();
            sum / window_size as f64
        })
        .collect()
}

fn max_in_windows(data: &[i32], window_size: usize) -> Vec<i32> {
    data.windows(window_size)
        .map(|window| *window.iter().max().unwrap())
        .collect()
}

fn sum_chunks(data: &[i32], chunk_size: usize) -> Vec<i32> {
    data.chunks(chunk_size)
        .map(|chunk| chunk.iter().sum())
        .collect()
}

fn chunk_strings(text: &str, size: usize) -> Vec<String> {
    text.chars()
        .collect::<Vec<_>>()
        .chunks(size)
        .map(|chunk| chunk.iter().collect())
        .collect()
}

fn main() {
    let data = vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
    println!("Data: {:?}", data);
    println!("Moving average (window=3): {:?}", moving_average(&data, 3));

    let numbers = vec![1, 5, 3, 9, 2, 8, 4];
    println!("\nNumbers: {:?}", numbers);
    println!("Max in windows of 3: {:?}", max_in_windows(&numbers, 3));

    println!("\nSum of chunks (size=3): {:?}", sum_chunks(&numbers, 3));

    let text = "hello world";
    println!("\nText chunked by 3: {:?}", chunk_strings(text, 3));
}
```

</details>

**Learning Points**:
- `windows` for sliding windows
- `chunks` for fixed-size segments
- Computing aggregates over windows
- Practical applications: moving average, max pooling

---

## Exercise 12: Cycle and Repeat

**Difficulty**: Easy

**Problem**: Use `cycle` to repeat a sequence and `repeat` to create infinite sequences.

**Requirements**:
- Create a cycling iterator
- Take a specific number of elements
- Use with `zip` to repeat patterns

**Example**:
```rust
let pattern = vec![1, 2, 3];
let repeated = cycle_n(&pattern, 10);
// [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
```

**Hints**:
- `cycle()` repeats indefinitely
- Must use `take()` to limit
- `repeat(value)` creates infinite copies

<details>
<summary>Solution</summary>

```rust
use std::iter;

fn cycle_n<T: Clone>(pattern: &[T], n: usize) -> Vec<T> {
    pattern.iter()
        .cycle()
        .take(n)
        .cloned()
        .collect()
}

fn repeat_n<T: Clone>(value: T, n: usize) -> Vec<T> {
    iter::repeat(value)
        .take(n)
        .collect()
}

fn interleave_pattern<T: Clone>(data: &[T], pattern: &[T]) -> Vec<(T, T)> {
    data.iter()
        .zip(pattern.iter().cycle())
        .map(|(a, b)| (a.clone(), b.clone()))
        .collect()
}

fn main() {
    let pattern = vec![1, 2, 3];
    println!("Pattern cycled 10 times: {:?}", cycle_n(&pattern, 10));

    println!("Repeat 'X' 5 times: {:?}", repeat_n('X', 5));

    let data = vec!["a", "b", "c", "d", "e"];
    let labels = vec![1, 2];
    println!("Interleaved: {:?}", interleave_pattern(&data, &labels));

    // Practical example: round-robin assignment
    let tasks = vec!["task1", "task2", "task3", "task4", "task5"];
    let workers = vec!["Alice", "Bob"];
    let assignments: Vec<_> = tasks.iter()
        .zip(workers.iter().cycle())
        .collect();

    println!("\nTask assignments:");
    for (task, worker) in assignments {
        println!("{} -> {}", task, worker);
    }
}
```

</details>

**Learning Points**:
- `cycle` for repeating patterns
- `repeat` for infinite sequences
- Must use `take` to limit infinite iterators
- Practical use: round-robin, patterns

---

## Exercise 13: Scan for Running State

**Difficulty**: Medium

**Problem**: Use `scan` to maintain running state during iteration.

**Requirements**:
- Calculate running sum
- Calculate running maximum
- Track state across iterations

**Example**:
```rust
let numbers = vec![1, 2, 3, 4];
let running_sum = calculate_running_sum(&numbers);
// [1, 3, 6, 10]
```

**Hints**:
- `scan` is like `fold` but yields intermediate values
- State is passed to closure
- Returns iterator of intermediate results

<details>
<summary>Solution</summary>

```rust
fn calculate_running_sum(numbers: &[i32]) -> Vec<i32> {
    numbers.iter()
        .scan(0, |state, &x| {
            *state += x;
            Some(*state)
        })
        .collect()
}

fn running_maximum(numbers: &[i32]) -> Vec<i32> {
    numbers.iter()
        .scan(i32::MIN, |max, &x| {
            if x > *max {
                *max = x;
            }
            Some(*max)
        })
        .collect()
}

fn running_average(numbers: &[f64]) -> Vec<f64> {
    numbers.iter()
        .scan((0.0, 0), |(sum, count), &x| {
            *sum += x;
            *count += 1;
            Some(*sum / *count as f64)
        })
        .collect()
}

fn fibonacci_sequence(n: usize) -> Vec<u64> {
    (0..n)
        .scan((0, 1), |state, _| {
            let current = state.0;
            *state = (state.1, state.0 + state.1);
            Some(current)
        })
        .collect()
}

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    println!("Numbers: {:?}", numbers);
    println!("Running sum: {:?}", calculate_running_sum(&numbers));

    let numbers2 = vec![3, 1, 4, 1, 5, 9, 2, 6];
    println!("\nNumbers: {:?}", numbers2);
    println!("Running maximum: {:?}", running_maximum(&numbers2));

    let floats = vec![10.0, 20.0, 30.0, 40.0];
    println!("\nNumbers: {:?}", floats);
    println!("Running average: {:?}", running_average(&floats));

    println!("\nFirst 10 Fibonacci numbers:");
    println!("{:?}", fibonacci_sequence(10));
}
```

</details>

**Learning Points**:
- `scan` for stateful transformations
- Maintaining running calculations
- Difference between `scan` and `fold`
- State can be complex types (tuples, structs)

---

## Exercise 14: Efficient Counting

**Difficulty**: Medium

**Problem**: Count occurrences efficiently without collecting intermediate results.

**Requirements**:
- Count elements matching a predicate
- Count by groups
- Use iterator methods, not manual loops

**Example**:
```rust
let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8];
let even_count = count_even(&numbers);  // 4
```

**Hints**:
- Use `filter().count()`
- Use `fold` with HashMap for grouping
- Avoid unnecessary allocations

<details>
<summary>Solution</summary>

```rust
use std::collections::HashMap;

fn count_even(numbers: &[i32]) -> usize {
    numbers.iter()
        .filter(|&&n| n % 2 == 0)
        .count()
}

fn count_by_length(words: &[&str]) -> HashMap<usize, usize> {
    words.iter()
        .fold(HashMap::new(), |mut map, word| {
            *map.entry(word.len()).or_insert(0) += 1;
            map
        })
}

fn count_occurrences<T>(items: &[T]) -> HashMap<T, usize>
where
    T: Eq + std::hash::Hash + Clone,
{
    items.iter()
        .fold(HashMap::new(), |mut map, item| {
            *map.entry(item.clone()).or_insert(0) += 1;
            map
        })
}

// Count elements in ranges
fn count_in_ranges(numbers: &[i32]) -> (usize, usize, usize) {
    let low = numbers.iter().filter(|&&n| n < 10).count();
    let medium = numbers.iter().filter(|&&n| n >= 10 && n < 100).count();
    let high = numbers.iter().filter(|&&n| n >= 100).count();
    (low, medium, high)
}

fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    println!("Even count: {}", count_even(&numbers));

    let words = vec!["hi", "hello", "hey", "greetings", "yo"];
    let counts = count_by_length(&words);
    println!("\nWords by length: {:?}", counts);

    let items = vec!["apple", "banana", "apple", "cherry", "banana", "apple"];
    let occurrences = count_occurrences(&items);
    println!("\nOccurrences: {:?}", occurrences);

    let mixed_numbers = vec![5, 15, 150, 25, 3, 200, 8];
    let (low, med, high) = count_in_ranges(&mixed_numbers);
    println!("\nRanges: <10: {}, 10-99: {}, >=100: {}", low, med, high);
}
```

</details>

**Learning Points**:
- `count()` for simple counting
- `fold` with HashMap for grouping
- Single-pass counting
- Generic counting functions

---

## Exercise 15: Performance: Lazy vs Eager

**Difficulty**: Hard

**Problem**: Compare lazy iterator chains with eager collection-based approaches.

**Requirements**:
- Implement both lazy and eager versions
- Measure conceptual efficiency
- Understand when each is appropriate

**Example**:
```rust
// Lazy: no intermediate collections
// Eager: creates Vec at each step
```

**Hints**:
- Iterators are lazy until consumed
- Chaining doesn't create intermediate vectors
- Early termination benefits from laziness

<details>
<summary>Solution</summary>

```rust
// Eager approach - creates intermediate vectors
fn process_eager(data: &[i32]) -> Vec<i32> {
    let filtered: Vec<i32> = data.iter()
        .filter(|&&n| n % 2 == 0)
        .copied()
        .collect();

    let mapped: Vec<i32> = filtered.iter()
        .map(|&n| n * 2)
        .collect();

    let taken: Vec<i32> = mapped.iter()
        .take(5)
        .copied()
        .collect();

    taken
}

// Lazy approach - single pass, no intermediate collections
fn process_lazy(data: &[i32]) -> Vec<i32> {
    data.iter()
        .filter(|&&n| n % 2 == 0)
        .map(|&n| n * 2)
        .take(5)
        .collect()
}

// Example where lazy helps with early termination
fn find_first_matching_eager(data: &[i32]) -> Option<i32> {
    let filtered: Vec<i32> = data.iter()
        .filter(|&&n| n > 100)
        .copied()
        .collect();  // Processes entire collection!

    filtered.first().copied()
}

fn find_first_matching_lazy(data: &[i32]) -> Option<i32> {
    data.iter()
        .filter(|&&n| n > 100)
        .next()  // Stops at first match
        .copied()
}

// Lazy is more efficient for chained operations
fn complex_chain_lazy(data: &[i32]) -> i32 {
    data.iter()
        .filter(|&&n| n % 2 == 0)
        .map(|&n| n * 2)
        .filter(|&n| n > 10)
        .take(10)
        .sum()
}

// When eager might be better: multiple uses of the same transformation
fn multiple_uses_example(data: &[i32]) -> (i32, i32, usize) {
    // If we need to use the filtered data multiple times,
    // collecting once might be better
    let filtered: Vec<i32> = data.iter()
        .filter(|&&n| n % 2 == 0)
        .copied()
        .collect();

    let sum: i32 = filtered.iter().sum();
    let max: i32 = *filtered.iter().max().unwrap_or(&0);
    let count = filtered.len();

    (sum, max, count)
}

fn main() {
    let data: Vec<i32> = (1..=100).collect();

    println!("Eager result: {:?}", process_eager(&data));
    println!("Lazy result: {:?}", process_lazy(&data));

    // Large dataset to show early termination benefit
    let large_data: Vec<i32> = (1..=1000000).collect();

    println!("\nEarly termination example (large dataset):");
    println!("First > 100 (lazy): {:?}", find_first_matching_lazy(&large_data));

    println!("\nComplex chain sum: {}", complex_chain_lazy(&data));

    let (sum, max, count) = multiple_uses_example(&data);
    println!("\nMultiple uses - Sum: {}, Max: {}, Count: {}", sum, max, count);

    // Demonstration of iterator overhead
    println!("\nIterator Chains:");
    println!("Lazy chains don't allocate intermediate collections");
    println!("Eager approaches allocate at each step");
    println!("Use lazy for: single pass, early termination, transformations");
    println!("Use eager for: multiple passes over same transformed data");
}
```

</details>

**Learning Points**:
- Iterator laziness and efficiency
- Avoiding intermediate allocations
- Early termination benefits
- When to collect vs when to stay lazy
- Performance implications

---

## Advanced Iterator Patterns

### Pattern 1: Iterator Adaptor Chain
```rust
fn analyze_data(data: &[i32]) -> HashMap<&str, i32> {
    let mut stats = HashMap::new();

    stats.insert("sum", data.iter().sum());
    stats.insert("count", data.len() as i32);
    stats.insert("max", *data.iter().max().unwrap_or(&0));
    stats.insert("min", *data.iter().min().unwrap_or(&0));
    stats.insert("even_count", data.iter().filter(|&&n| n % 2 == 0).count() as i32);

    stats
}
```

### Pattern 2: Combining Multiple Collections
```rust
fn combine_results(v1: &[i32], v2: &[i32], v3: &[i32]) -> i32 {
    v1.iter()
        .chain(v2.iter())
        .chain(v3.iter())
        .filter(|&&n| n > 0)
        .sum()
}
```

### Pattern 3: Stateful Processing
```rust
fn deduplicate_consecutive<T: PartialEq + Clone>(items: &[T]) -> Vec<T> {
    items.iter()
        .scan(None, |prev, item| {
            let should_include = prev.as_ref() != Some(item);
            *prev = Some(item.clone());
            if should_include {
                Some(Some(item.clone()))
            } else {
                Some(None)
            }
        })
        .flatten()
        .collect()
}
```

## Tips for Mastering Iterators

1. **Think in Transformations** - Chain operations instead of loops
2. **Stay Lazy** - Don't collect until necessary
3. **Use Type Annotations** - Help the compiler when needed
4. **Learn the Adapters** - Know your map, filter, fold, scan, etc.
5. **Profile When Optimizing** - Measure don't guess
6. **Read the Docs** - Many useful methods exist

## Common Pitfalls

- Collecting too early in the chain
- Not using `copied()` or `cloned()` when needed
- Forgetting iterators are lazy
- Re-iterating when `collect()` once would suffice
- Using manual loops when iterators are clearer

## Next Steps

- Study iterator trait implementations
- Learn about iterator combinators
- Practice with real-world data processing
- Move on to error handling exercises
- Build data processing pipelines
