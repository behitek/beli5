# Basic Exercises

Practice fundamental Rust concepts with these exercises covering variables, data types, arithmetic operations, string manipulation, and control flow.

---

## Exercise 1: Temperature Converter

**Difficulty**: Easy

**Problem**: Write a function that converts temperatures between Celsius and Fahrenheit.

**Requirements**:
- Create two functions: `celsius_to_fahrenheit` and `fahrenheit_to_celsius`
- Handle floating-point precision appropriately

**Example**:
```rust
celsius_to_fahrenheit(0.0)    // Should return 32.0
fahrenheit_to_celsius(32.0)   // Should return 0.0
celsius_to_fahrenheit(100.0)  // Should return 212.0
```

**Hints**:
- Formula: F = C × 9/5 + 32
- Formula: C = (F - 32) × 5/9
- Use `f64` for precision

<details>
<summary>Solution</summary>

```rust
fn celsius_to_fahrenheit(celsius: f64) -> f64 {
    celsius * 9.0 / 5.0 + 32.0
}

fn fahrenheit_to_celsius(fahrenheit: f64) -> f64 {
    (fahrenheit - 32.0) * 5.0 / 9.0
}

fn main() {
    println!("0°C = {}°F", celsius_to_fahrenheit(0.0));
    println!("32°F = {}°C", fahrenheit_to_celsius(32.0));
    println!("100°C = {}°F", celsius_to_fahrenheit(100.0));
}
```

</details>

**Learning Points**:
- Working with floating-point arithmetic
- Function parameters and return types
- Order of operations in Rust

---

## Exercise 2: Even or Odd Checker

**Difficulty**: Easy

**Problem**: Write a function that determines if a number is even or odd and returns a string message.

**Requirements**:
- Function should take an `i32` parameter
- Return a descriptive string

**Example**:
```rust
check_even_odd(4)   // "4 is even"
check_even_odd(7)   // "7 is odd"
check_even_odd(-2)  // "-2 is even"
```

**Hints**:
- Use the modulo operator `%`
- Use the `format!` macro for string formatting

<details>
<summary>Solution</summary>

```rust
fn check_even_odd(num: i32) -> String {
    if num % 2 == 0 {
        format!("{} is even", num)
    } else {
        format!("{} is odd", num)
    }
}

fn main() {
    println!("{}", check_even_odd(4));
    println!("{}", check_even_odd(7));
    println!("{}", check_even_odd(-2));
}
```

</details>

**Learning Points**:
- Using the modulo operator
- String formatting with `format!` macro
- Conditional expressions

---

## Exercise 3: Fibonacci Sequence

**Difficulty**: Medium

**Problem**: Write a function that returns the nth Fibonacci number.

**Requirements**:
- Use iteration (not recursion for efficiency)
- Handle n = 0 and n = 1 as base cases
- Return `u64` to handle larger numbers

**Example**:
```rust
fibonacci(0)   // 0
fibonacci(1)   // 1
fibonacci(10)  // 55
fibonacci(20)  // 6765
```

**Hints**:
- Start with two variables for the previous two numbers
- Use a loop to calculate subsequent values
- Remember: F(n) = F(n-1) + F(n-2)

<details>
<summary>Solution</summary>

```rust
fn fibonacci(n: u64) -> u64 {
    if n == 0 {
        return 0;
    }
    if n == 1 {
        return 1;
    }

    let mut prev = 0;
    let mut curr = 1;

    for _ in 2..=n {
        let next = prev + curr;
        prev = curr;
        curr = next;
    }

    curr
}

fn main() {
    for i in 0..=10 {
        println!("F({}) = {}", i, fibonacci(i));
    }
}
```

</details>

**Learning Points**:
- Iterative vs recursive approaches
- Mutable variables in Rust
- Range expressions with `..=`

---

## Exercise 4: String Reversal

**Difficulty**: Easy

**Problem**: Write a function that reverses a string.

**Requirements**:
- Handle Unicode characters correctly
- Return a new String (don't modify in place)

**Example**:
```rust
reverse_string("hello")     // "olleh"
reverse_string("Rust")      // "tsuR"
reverse_string("a")         // "a"
reverse_string("")          // ""
```

**Hints**:
- Strings in Rust are UTF-8 encoded
- Use `.chars()` to iterate over characters
- Collect the reversed characters

<details>
<summary>Solution</summary>

```rust
fn reverse_string(s: &str) -> String {
    s.chars().rev().collect()
}

fn main() {
    println!("{}", reverse_string("hello"));
    println!("{}", reverse_string("Rust"));
    println!("{}", reverse_string("a"));
    println!("{}", reverse_string(""));
}
```

</details>

**Learning Points**:
- Working with string slices (`&str`)
- Character iteration with `.chars()`
- Iterator methods: `.rev()` and `.collect()`

---

## Exercise 5: Prime Number Checker

**Difficulty**: Medium

**Problem**: Write a function that checks if a number is prime.

**Requirements**:
- Handle edge cases (numbers less than 2)
- Optimize by only checking up to the square root
- Return a boolean

**Example**:
```rust
is_prime(2)    // true
is_prime(17)   // true
is_prime(4)    // false
is_prime(1)    // false
```

**Hints**:
- Numbers less than 2 are not prime
- Only check divisors up to √n
- If any divisor is found, it's not prime

<details>
<summary>Solution</summary>

```rust
fn is_prime(n: u32) -> bool {
    if n < 2 {
        return false;
    }
    if n == 2 {
        return true;
    }
    if n % 2 == 0 {
        return false;
    }

    let limit = (n as f64).sqrt() as u32;
    for i in (3..=limit).step_by(2) {
        if n % i == 0 {
            return false;
        }
    }

    true
}

fn main() {
    let test_numbers = vec![1, 2, 3, 4, 5, 17, 20, 23, 100];
    for num in test_numbers {
        println!("{} is prime: {}", num, is_prime(num));
    }
}
```

</details>

**Learning Points**:
- Early returns for efficiency
- Type casting with `as`
- Using `.step_by()` for iterating by steps

---

## Exercise 6: Count Vowels

**Difficulty**: Easy

**Problem**: Write a function that counts the number of vowels in a string.

**Requirements**:
- Count both uppercase and lowercase vowels (a, e, i, o, u)
- Return the count as `usize`

**Example**:
```rust
count_vowels("hello")           // 2
count_vowels("AEIOU")           // 5
count_vowels("rhythm")          // 0
count_vowels("Programming")     // 3
```

**Hints**:
- Convert characters to lowercase for comparison
- Use a match expression or contains check
- Filter and count vowels

<details>
<summary>Solution</summary>

```rust
fn count_vowels(s: &str) -> usize {
    s.chars()
        .filter(|c| matches!(c.to_ascii_lowercase(), 'a' | 'e' | 'i' | 'o' | 'u'))
        .count()
}

// Alternative solution using a string check
fn count_vowels_alt(s: &str) -> usize {
    s.chars()
        .filter(|c| "aeiouAEIOU".contains(*c))
        .count()
}

fn main() {
    println!("vowels in 'hello': {}", count_vowels("hello"));
    println!("vowels in 'AEIOU': {}", count_vowels("AEIOU"));
    println!("vowels in 'rhythm': {}", count_vowels("rhythm"));
    println!("vowels in 'Programming': {}", count_vowels("Programming"));
}
```

</details>

**Learning Points**:
- Pattern matching with `matches!` macro
- Using `filter` and `count` on iterators
- Multiple solution approaches

---

## Exercise 7: Sum of Digits

**Difficulty**: Easy

**Problem**: Write a function that calculates the sum of all digits in a number.

**Requirements**:
- Handle both positive and negative numbers
- Return the sum as `u32`

**Example**:
```rust
sum_of_digits(123)    // 6 (1+2+3)
sum_of_digits(4567)   // 22 (4+5+6+7)
sum_of_digits(-123)   // 6
sum_of_digits(0)      // 0
```

**Hints**:
- Convert the number to a string
- Filter out non-digit characters
- Parse each digit and sum them

<details>
<summary>Solution</summary>

```rust
fn sum_of_digits(n: i32) -> u32 {
    n.abs()
        .to_string()
        .chars()
        .filter_map(|c| c.to_digit(10))
        .sum()
}

// Alternative solution using mathematical approach
fn sum_of_digits_math(n: i32) -> u32 {
    let mut num = n.abs() as u32;
    let mut sum = 0;

    while num > 0 {
        sum += num % 10;
        num /= 10;
    }

    sum
}

fn main() {
    println!("Sum of digits in 123: {}", sum_of_digits(123));
    println!("Sum of digits in 4567: {}", sum_of_digits(4567));
    println!("Sum of digits in -123: {}", sum_of_digits(-123));
    println!("Sum of digits in 0: {}", sum_of_digits(0));
}
```

</details>

**Learning Points**:
- Using `abs()` for absolute value
- `filter_map` for filtering and transforming
- Mathematical vs string-based approaches

---

## Exercise 8: FizzBuzz

**Difficulty**: Easy

**Problem**: Implement the classic FizzBuzz problem.

**Requirements**:
- For numbers 1 to n:
  - Print "Fizz" if divisible by 3
  - Print "Buzz" if divisible by 5
  - Print "FizzBuzz" if divisible by both
  - Otherwise, print the number

**Example**:
```rust
fizzbuzz(15)
// Output:
// 1
// 2
// Fizz
// 4
// Buzz
// ...
// FizzBuzz
```

**Hints**:
- Check divisibility by 15 first
- Use modulo operator `%`
- Consider using a match expression

<details>
<summary>Solution</summary>

```rust
fn fizzbuzz(n: u32) {
    for i in 1..=n {
        match (i % 3, i % 5) {
            (0, 0) => println!("FizzBuzz"),
            (0, _) => println!("Fizz"),
            (_, 0) => println!("Buzz"),
            _ => println!("{}", i),
        }
    }
}

// Alternative solution with if-else
fn fizzbuzz_if(n: u32) {
    for i in 1..=n {
        if i % 15 == 0 {
            println!("FizzBuzz");
        } else if i % 3 == 0 {
            println!("Fizz");
        } else if i % 5 == 0 {
            println!("Buzz");
        } else {
            println!("{}", i);
        }
    }
}

fn main() {
    fizzbuzz(15);
}
```

</details>

**Learning Points**:
- Pattern matching with tuples
- Multiple conditions in match expressions
- Using underscore `_` for "don't care" values

---

## Exercise 9: Palindrome Checker

**Difficulty**: Easy

**Problem**: Write a function that checks if a string is a palindrome (reads the same forwards and backwards).

**Requirements**:
- Ignore case sensitivity
- Ignore spaces and punctuation
- Return boolean

**Example**:
```rust
is_palindrome("racecar")           // true
is_palindrome("A man a plan a canal Panama")  // true
is_palindrome("hello")             // false
is_palindrome("Was it a car or a cat I saw")  // true
```

**Hints**:
- Filter out non-alphanumeric characters
- Convert to lowercase
- Compare with its reverse

<details>
<summary>Solution</summary>

```rust
fn is_palindrome(s: &str) -> bool {
    let cleaned: String = s.chars()
        .filter(|c| c.is_alphanumeric())
        .map(|c| c.to_ascii_lowercase())
        .collect();

    cleaned == cleaned.chars().rev().collect::<String>()
}

// Alternative solution comparing from both ends
fn is_palindrome_alt(s: &str) -> bool {
    let cleaned: Vec<char> = s.chars()
        .filter(|c| c.is_alphanumeric())
        .map(|c| c.to_ascii_lowercase())
        .collect();

    let len = cleaned.len();
    for i in 0..len / 2 {
        if cleaned[i] != cleaned[len - 1 - i] {
            return false;
        }
    }
    true
}

fn main() {
    println!("'racecar' is palindrome: {}", is_palindrome("racecar"));
    println!("'A man a plan a canal Panama' is palindrome: {}",
             is_palindrome("A man a plan a canal Panama"));
    println!("'hello' is palindrome: {}", is_palindrome("hello"));
}
```

</details>

**Learning Points**:
- Chaining iterator methods
- Character classification with `is_alphanumeric()`
- Different algorithmic approaches

---

## Exercise 10: Greatest Common Divisor (GCD)

**Difficulty**: Medium

**Problem**: Implement the Euclidean algorithm to find the GCD of two numbers.

**Requirements**:
- Use the Euclidean algorithm
- Handle the case where one or both numbers are zero
- Return `u32`

**Example**:
```rust
gcd(48, 18)    // 6
gcd(100, 50)   // 50
gcd(17, 19)    // 1
gcd(0, 5)      // 5
```

**Hints**:
- The Euclidean algorithm: gcd(a, b) = gcd(b, a mod b)
- Base case: gcd(a, 0) = a
- Can be implemented recursively or iteratively

<details>
<summary>Solution</summary>

```rust
// Iterative approach
fn gcd(mut a: u32, mut b: u32) -> u32 {
    while b != 0 {
        let temp = b;
        b = a % b;
        a = temp;
    }
    a
}

// Recursive approach
fn gcd_recursive(a: u32, b: u32) -> u32 {
    if b == 0 {
        a
    } else {
        gcd_recursive(b, a % b)
    }
}

fn main() {
    println!("GCD of 48 and 18: {}", gcd(48, 18));
    println!("GCD of 100 and 50: {}", gcd(100, 50));
    println!("GCD of 17 and 19: {}", gcd(17, 19));
    println!("GCD of 0 and 5: {}", gcd(0, 5));
}
```

</details>

**Learning Points**:
- Euclidean algorithm implementation
- Mutable variables in iterative approach
- Recursion vs iteration trade-offs

---

## Exercise 11: Array Statistics

**Difficulty**: Medium

**Problem**: Write functions to calculate min, max, mean, and median of an array of integers.

**Requirements**:
- Create separate functions for each statistic
- Handle empty arrays appropriately
- For median, assume the array can be modified (sorted)

**Example**:
```rust
let numbers = vec![5, 2, 8, 1, 9];
min(&numbers)      // Some(1)
max(&numbers)      // Some(9)
mean(&numbers)     // Some(5.0)
median(&mut numbers)  // Some(5.0)
```

**Hints**:
- Return `Option<T>` to handle empty arrays
- For mean, convert to f64
- For median, sort first, then take middle value(s)

<details>
<summary>Solution</summary>

```rust
fn min(numbers: &[i32]) -> Option<i32> {
    numbers.iter().min().copied()
}

fn max(numbers: &[i32]) -> Option<i32> {
    numbers.iter().max().copied()
}

fn mean(numbers: &[i32]) -> Option<f64> {
    if numbers.is_empty() {
        return None;
    }
    let sum: i32 = numbers.iter().sum();
    Some(sum as f64 / numbers.len() as f64)
}

fn median(numbers: &mut [i32]) -> Option<f64> {
    if numbers.is_empty() {
        return None;
    }

    numbers.sort();
    let len = numbers.len();
    let median = if len % 2 == 0 {
        (numbers[len / 2 - 1] + numbers[len / 2]) as f64 / 2.0
    } else {
        numbers[len / 2] as f64
    };

    Some(median)
}

fn main() {
    let numbers = vec![5, 2, 8, 1, 9];
    println!("Numbers: {:?}", numbers);
    println!("Min: {:?}", min(&numbers));
    println!("Max: {:?}", max(&numbers));
    println!("Mean: {:?}", mean(&numbers));

    let mut numbers_for_median = numbers.clone();
    println!("Median: {:?}", median(&mut numbers_for_median));
}
```

</details>

**Learning Points**:
- Working with slices
- Using `Option` for edge cases
- Iterator methods like `min()`, `max()`, `sum()`
- Mutable vs immutable borrows

---

## Exercise 12: Caesar Cipher

**Difficulty**: Medium

**Problem**: Implement a Caesar cipher encoder and decoder.

**Requirements**:
- Shift alphabetic characters by a specified amount
- Preserve case (uppercase stays uppercase)
- Leave non-alphabetic characters unchanged
- Support both encoding and decoding

**Example**:
```rust
caesar_encode("Hello, World!", 3)   // "Khoor, Zruog!"
caesar_decode("Khoor, Zruog!", 3)   // "Hello, World!"
```

**Hints**:
- Use modulo 26 for wrapping around the alphabet
- Handle uppercase and lowercase separately
- Decoding is just encoding with negative shift

<details>
<summary>Solution</summary>

```rust
fn caesar_encode(text: &str, shift: i32) -> String {
    text.chars()
        .map(|c| {
            if c.is_ascii_alphabetic() {
                let base = if c.is_ascii_lowercase() { b'a' } else { b'A' };
                let offset = (c as u8 - base) as i32;
                let shifted = (offset + shift).rem_euclid(26) as u8;
                (base + shifted) as char
            } else {
                c
            }
        })
        .collect()
}

fn caesar_decode(text: &str, shift: i32) -> String {
    caesar_encode(text, -shift)
}

fn main() {
    let original = "Hello, World!";
    let encoded = caesar_encode(original, 3);
    let decoded = caesar_decode(&encoded, 3);

    println!("Original: {}", original);
    println!("Encoded: {}", encoded);
    println!("Decoded: {}", decoded);
}
```

</details>

**Learning Points**:
- Character arithmetic
- Using `rem_euclid` for proper modulo with negatives
- Type conversions between `char` and `u8`
- Map transformation on iterators

---

## Exercise 13: Number Guessing Game

**Difficulty**: Medium

**Problem**: Create a number guessing game where the computer picks a random number and gives hints.

**Requirements**:
- Generate a random number between 1 and 100
- Accept user input
- Provide "too high" or "too low" hints
- Count the number of attempts

**Example**:
```
Guess the number between 1 and 100
Your guess: 50
Too low!
Your guess: 75
Too high!
Your guess: 62
Correct! You guessed in 3 attempts.
```

**Hints**:
- Use `rand` crate for random number generation
- Use `std::io` for user input
- Parse string input to integer
- Loop until correct guess

<details>
<summary>Solution</summary>

```rust
use std::io;
use rand::Rng;

fn number_guessing_game() {
    let secret_number = rand::thread_rng().gen_range(1..=100);
    let mut attempts = 0;

    println!("Guess the number between 1 and 100");

    loop {
        let mut guess = String::new();

        print!("Your guess: ");
        io::Write::flush(&mut io::stdout()).unwrap();

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("Please enter a valid number!");
                continue;
            }
        };

        attempts += 1;

        match guess.cmp(&secret_number) {
            std::cmp::Ordering::Less => println!("Too low!"),
            std::cmp::Ordering::Greater => println!("Too high!"),
            std::cmp::Ordering::Equal => {
                println!("Correct! You guessed in {} attempts.", attempts);
                break;
            }
        }
    }
}

fn main() {
    number_guessing_game();
}
```

**Note**: Add `rand = "0.8"` to your `Cargo.toml` dependencies.

</details>

**Learning Points**:
- User input with `std::io`
- Error handling with `match` and `Result`
- Using external crates (rand)
- Comparison with `cmp` method

---

## Exercise 14: Word Counter

**Difficulty**: Medium

**Problem**: Write a function that counts the frequency of each word in a string.

**Requirements**:
- Split text into words
- Count occurrences of each word
- Return a HashMap with word frequencies
- Ignore case and punctuation

**Example**:
```rust
word_count("Hello world! Hello Rust. Rust is great.")
// HashMap: {"hello": 2, "world": 1, "rust": 2, "is": 1, "great": 1}
```

**Hints**:
- Use `HashMap` to store counts
- Split on whitespace
- Remove punctuation from words
- Convert to lowercase

<details>
<summary>Solution</summary>

```rust
use std::collections::HashMap;

fn word_count(text: &str) -> HashMap<String, usize> {
    let mut counts = HashMap::new();

    for word in text.split_whitespace() {
        let word = word
            .chars()
            .filter(|c| c.is_alphanumeric())
            .collect::<String>()
            .to_lowercase();

        if !word.is_empty() {
            *counts.entry(word).or_insert(0) += 1;
        }
    }

    counts
}

fn main() {
    let text = "Hello world! Hello Rust. Rust is great.";
    let counts = word_count(text);

    println!("Word frequencies:");
    for (word, count) in counts.iter() {
        println!("{}: {}", word, count);
    }
}
```

</details>

**Learning Points**:
- Using `HashMap` for counting
- Entry API with `entry()` and `or_insert()`
- String processing and filtering
- Iterating over HashMap

---

## Exercise 15: Leap Year Checker

**Difficulty**: Easy

**Problem**: Write a function to determine if a year is a leap year.

**Requirements**:
- A year is a leap year if:
  - It's divisible by 4
  - Unless it's divisible by 100
  - Unless it's also divisible by 400

**Example**:
```rust
is_leap_year(2000)   // true (divisible by 400)
is_leap_year(2001)   // false
is_leap_year(2004)   // true (divisible by 4)
is_leap_year(1900)   // false (divisible by 100 but not 400)
```

**Hints**:
- Check conditions in the right order
- Use logical operators `&&` and `||`
- The most specific condition should be checked first

<details>
<summary>Solution</summary>

```rust
fn is_leap_year(year: u32) -> bool {
    (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
}

// Alternative with if-else
fn is_leap_year_verbose(year: u32) -> bool {
    if year % 400 == 0 {
        true
    } else if year % 100 == 0 {
        false
    } else if year % 4 == 0 {
        true
    } else {
        false
    }
}

fn main() {
    let test_years = vec![2000, 2001, 2004, 1900, 2020, 2100];

    for year in test_years {
        println!("{} is leap year: {}", year, is_leap_year(year));
    }
}
```

</details>

**Learning Points**:
- Logical operators in Rust
- Complex boolean conditions
- Concise vs verbose code styles

---

## Additional Practice Ideas

1. **Rock, Paper, Scissors** - Create a game against the computer
2. **Factorial Calculator** - Both recursive and iterative versions
3. **Binary to Decimal Converter** - Convert between number systems
4. **Anagram Checker** - Check if two strings are anagrams
5. **Perfect Number Finder** - Find perfect numbers in a range

## Tips for Success

- Start with the easy exercises to build confidence
- Read the hints if you're stuck, but try without them first
- Compare your solution with the provided one - there are often multiple approaches
- Experiment with the code - modify it and see what happens
- Focus on understanding the concepts, not just copying solutions

## Next Steps

Once you're comfortable with these basics:
- Move on to ownership exercises
- Practice with more complex data structures
- Learn about Rust's type system in depth
- Start building small projects
