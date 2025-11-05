---
sidebar_position: 4
title: 🎯 FizzBuzz Challenge
description: Giải bài toán FizzBuzz kinh điển với Rust - Học về loops, điều kiện và modulo
keywords: [rust, project, fizzbuzz, challenge, loops, beginner]
---

# 🎯 FizzBuzz Challenge

## 🎯 Mục Tiêu Dự Án

**FizzBuzz** là một bài toán lập trình kinh điển, thường được dùng trong phỏng vấn! Nhiệm vụ:

In ra các số từ 1 đến N, nhưng:
- Nếu số chia hết cho **3**: In `Fizz`
- Nếu số chia hết cho **5**: In `Buzz`
- Nếu số chia hết cho **cả 3 và 5**: In `FizzBuzz`
- Các trường hợp khác: In số đó

**Ví dụ (1-15):**
```
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz
```

### Bạn Sẽ Học Được
- ✅ Sử dụng loops hiệu quả
- ✅ Điều kiện với modulo operator `%`
- ✅ Thứ tự ưu tiên của điều kiện
- ✅ Refactoring code
- ✅ Viết tests

## 📦 Bước 1: Tạo Project

```bash
cargo new fizzbuzz
cd fizzbuzz
```

## 🎮 Bước 2: Version 1 - Classic FizzBuzz

```rust
fn main() {
    println!("🎯 FizzBuzz Challenge");
    println!("====================\n");

    for i in 1..=100 {
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
```

### Tại Sao Kiểm Tra 15 Trước?

```rust
// ❌ SAI: Kiểm tra 3 trước
if i % 3 == 0 {
    println!("Fizz");  // 15 sẽ in "Fizz" và dừng lại!
} else if i % 5 == 0 {
    println!("Buzz");
} else if i % 15 == 0 {
    println!("FizzBuzz");  // Không bao giờ đến đây!
}

// ✅ ĐÚNG: Kiểm tra 15 trước
if i % 15 == 0 {
    println!("FizzBuzz");
} else if i % 3 == 0 {
    println!("Fizz");
} else if i % 5 == 0 {
    println!("Buzz");
}
```

## 🎨 Bước 3: Version 2 - Với Functions

```rust
fn main() {
    println!("🎯 FizzBuzz Challenge - Version 2");
    println!("==================================\n");

    for i in 1..=100 {
        println!("{}", fizzbuzz(i));
    }
}

fn fizzbuzz(n: u32) -> String {
    match (n % 3 == 0, n % 5 == 0) {
        (true, true) => "FizzBuzz".to_string(),
        (true, false) => "Fizz".to_string(),
        (false, true) => "Buzz".to_string(),
        (false, false) => n.to_string(),
    }
}
```

:::tip Pattern Matching Với Tuples
Match với tuple `(bool, bool)` giúp code ngắn gọn và rõ ràng hơn!
:::

## 🎨 Bước 4: Version 3 - Tương Tác

Cho phép người dùng chọn số lượng:

```rust
use std::io;

fn main() {
    println!("🎯 FizzBuzz Challenge - Interactive");
    println!("===================================\n");

    loop {
        println!("📋 Menu:");
        println!("  1. FizzBuzz kinh điển (1-100)");
        println!("  2. Tùy chỉnh phạm vi");
        println!("  3. Thoát");

        let choice = get_input("\n📝 Chọn: ");

        match choice.trim() {
            "1" => print_fizzbuzz(1, 100),
            "2" => custom_fizzbuzz(),
            "3" => {
                println!("👋 Tạm biệt!");
                break;
            },
            _ => println!("⚠️  Lựa chọn không hợp lệ!"),
        }
    }
}

fn print_fizzbuzz(start: u32, end: u32) {
    println!("\n🎯 FizzBuzz từ {} đến {}:", start, end);
    println!("─────────────────────────────");

    for i in start..=end {
        print!("{:<12}", fizzbuzz(i));

        // In 5 số mỗi dòng
        if (i - start + 1) % 5 == 0 {
            println!();
        }
    }
    println!("\n");
}

fn custom_fizzbuzz() {
    let start = match get_number("📝 Số bắt đầu: ") {
        Some(n) if n > 0 => n,
        _ => {
            println!("⚠️  Số phải lớn hơn 0!");
            return;
        }
    };

    let end = match get_number("📝 Số kết thúc: ") {
        Some(n) if n >= start => n,
        _ => {
            println!("⚠️  Số kết thúc phải >= số bắt đầu!");
            return;
        }
    };

    print_fizzbuzz(start, end);
}

fn fizzbuzz(n: u32) -> String {
    match (n % 3 == 0, n % 5 == 0) {
        (true, true) => "FizzBuzz".to_string(),
        (true, false) => "Fizz".to_string(),
        (false, true) => "Buzz".to_string(),
        (false, false) => n.to_string(),
    }
}

fn get_input(prompt: &str) -> String {
    use std::io::Write;
    print!("{}", prompt);
    std::io::stdout().flush().unwrap();

    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("❌ Không đọc được input!");
    input
}

fn get_number(prompt: &str) -> Option<u32> {
    let input = get_input(prompt);
    match input.trim().parse::<u32>() {
        Ok(n) => Some(n),
        Err(_) => {
            println!("⚠️  Vui lòng nhập số hợp lệ!");
            None
        }
    }
}
```

## 🎨 Bước 5: Version 4 - Customizable

Cho phép tùy chỉnh các số chia:

```rust
use std::io;

struct FizzBuzzRule {
    divisor: u32,
    word: String,
}

impl FizzBuzzRule {
    fn new(divisor: u32, word: &str) -> Self {
        FizzBuzzRule {
            divisor,
            word: word.to_string(),
        }
    }
}

fn main() {
    println!("🎯 FizzBuzz Challenge - Customizable");
    println!("====================================\n");

    // Quy tắc mặc định
    let mut rules = vec![
        FizzBuzzRule::new(3, "Fizz"),
        FizzBuzzRule::new(5, "Buzz"),
    ];

    loop {
        println!("\n📋 Menu:");
        println!("  1. Chạy FizzBuzz (1-100)");
        println!("  2. Xem quy tắc hiện tại");
        println!("  3. Thêm quy tắc mới");
        println!("  4. Reset quy tắc mặc định");
        println!("  5. Thoát");

        let choice = get_input("\n📝 Chọn: ");

        match choice.trim() {
            "1" => run_fizzbuzz(&rules, 1, 100),
            "2" => show_rules(&rules),
            "3" => add_rule(&mut rules),
            "4" => {
                rules = vec![
                    FizzBuzzRule::new(3, "Fizz"),
                    FizzBuzzRule::new(5, "Buzz"),
                ];
                println!("✅ Đã reset về quy tắc mặc định!");
            },
            "5" => {
                println!("👋 Tạm biệt!");
                break;
            },
            _ => println!("⚠️  Lựa chọn không hợp lệ!"),
        }
    }
}

fn run_fizzbuzz(rules: &[FizzBuzzRule], start: u32, end: u32) {
    println!("\n🎯 Kết quả FizzBuzz:");
    println!("─────────────────────");

    for i in start..=end {
        let result = apply_rules(i, rules);
        print!("{:<15}", result);

        if (i - start + 1) % 5 == 0 {
            println!();
        }
    }
    println!("\n");
}

fn apply_rules(n: u32, rules: &[FizzBuzzRule]) -> String {
    let mut result = String::new();

    for rule in rules {
        if n % rule.divisor == 0 {
            result.push_str(&rule.word);
        }
    }

    if result.is_empty() {
        n.to_string()
    } else {
        result
    }
}

fn show_rules(rules: &[FizzBuzzRule]) {
    println!("\n📜 Quy tắc hiện tại:");
    for (i, rule) in rules.iter().enumerate() {
        println!("  {}. Chia hết cho {} → {}", i + 1, rule.divisor, rule.word);
    }
}

fn add_rule(rules: &mut Vec<FizzBuzzRule>) {
    println!("\n➕ Thêm quy tắc mới");

    let divisor = match get_number("📝 Số chia: ") {
        Some(n) if n > 0 => n,
        _ => {
            println!("⚠️  Số chia phải > 0!");
            return;
        }
    };

    let word = get_input("📝 Từ thay thế: ").trim().to_string();

    if word.is_empty() {
        println!("⚠️  Từ không được rỗng!");
        return;
    }

    rules.push(FizzBuzzRule::new(divisor, &word));
    println!("✅ Đã thêm quy tắc: {} → {}", divisor, word);
}

fn get_input(prompt: &str) -> String {
    use std::io::Write;
    print!("{}", prompt);
    std::io::stdout().flush().unwrap();

    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("❌ Không đọc được input!");
    input
}

fn get_number(prompt: &str) -> Option<u32> {
    let input = get_input(prompt);
    match input.trim().parse::<u32>() {
        Ok(n) => Some(n),
        Err(_) => None,
    }
}
```

**Ví dụ với quy tắc tùy chỉnh:**
- Chia hết cho 3 → "Fizz"
- Chia hết cho 5 → "Buzz"
- Chia hết cho 7 → "Boom"

Số 105 (chia hết cho cả 3, 5, 7) → "FizzBuzzBoom"

## 🧪 Bước 6: Thêm Unit Tests

```rust
fn fizzbuzz(n: u32) -> String {
    match (n % 3 == 0, n % 5 == 0) {
        (true, true) => "FizzBuzz".to_string(),
        (true, false) => "Fizz".to_string(),
        (false, true) => "Buzz".to_string(),
        (false, false) => n.to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_normal_numbers() {
        assert_eq!(fizzbuzz(1), "1");
        assert_eq!(fizzbuzz(2), "2");
        assert_eq!(fizzbuzz(4), "4");
    }

    #[test]
    fn test_fizz() {
        assert_eq!(fizzbuzz(3), "Fizz");
        assert_eq!(fizzbuzz(6), "Fizz");
        assert_eq!(fizzbuzz(9), "Fizz");
    }

    #[test]
    fn test_buzz() {
        assert_eq!(fizzbuzz(5), "Buzz");
        assert_eq!(fizzbuzz(10), "Buzz");
        assert_eq!(fizzbuzz(20), "Buzz");
    }

    #[test]
    fn test_fizzbuzz() {
        assert_eq!(fizzbuzz(15), "FizzBuzz");
        assert_eq!(fizzbuzz(30), "FizzBuzz");
        assert_eq!(fizzbuzz(45), "FizzBuzz");
    }

    #[test]
    fn test_large_numbers() {
        assert_eq!(fizzbuzz(300), "FizzBuzz");
        assert_eq!(fizzbuzz(301), "301");
    }
}
```

Chạy tests:

```bash
cargo test
```

**Output:**
```
running 5 tests
test tests::test_buzz ... ok
test tests::test_fizz ... ok
test tests::test_fizzbuzz ... ok
test tests::test_large_numbers ... ok
test tests::test_normal_numbers ... ok

test result: ok. 5 passed; 0 failed; 0 ignored; 0 measured
```

## 📊 Phân Tích Hiệu Suất

### Cách 1: If-Else Chain

```rust
// Đơn giản, dễ đọc
if i % 15 == 0 {
    "FizzBuzz"
} else if i % 3 == 0 {
    "Fizz"
} else if i % 5 == 0 {
    "Buzz"
} else {
    // number
}
```

### Cách 2: Match Tuple

```rust
// Ngắn gọn, functional
match (n % 3 == 0, n % 5 == 0) {
    (true, true) => "FizzBuzz",
    (true, false) => "Fizz",
    (false, true) => "Buzz",
    (false, false) => // number
}
```

### Cách 3: String Building

```rust
// Linh hoạt, mở rộng dễ
let mut result = String::new();
if n % 3 == 0 { result.push_str("Fizz"); }
if n % 5 == 0 { result.push_str("Buzz"); }
if result.is_empty() { result = n.to_string(); }
result
```

## 💪 Thử Thách Nâng Cao

### Thử Thách 1: FizzBuzzBazz
Thêm quy tắc:
- Chia hết cho 7 → "Bazz"

Số 105 (3×5×7) → "FizzBuzzBazz"

### Thử Thách 2: Reverse FizzBuzz
Cho chuỗi "Fizz, Buzz, 3", tìm số ban đầu (1, 2, 3)

<details>
<summary>💡 Gợi ý</summary>

```rust
fn reverse_fizzbuzz(s: &str) -> Option<u32> {
    match s {
        "Fizz" => {
            // Có thể là 3, 6, 9, 12 (không phải bội của 5)
            None  // Không xác định được chính xác
        },
        "FizzBuzz" => {
            // Bội của 15
            None  // Cần thêm thông tin
        },
        _ => s.parse().ok()  // Nếu là số
    }
}
```
</details>

### Thử Thách 3: FizzBuzz Generator

Tạo iterator vô hạn:

```rust
struct FizzBuzzIterator {
    current: u32,
}

impl Iterator for FizzBuzzIterator {
    type Item = String;

    fn next(&mut self) -> Option<Self::Item> {
        self.current += 1;
        Some(fizzbuzz(self.current))
    }
}

// Sử dụng
let fizzer = FizzBuzzIterator { current: 0 };
for item in fizzer.take(20) {
    println!("{}", item);
}
```

### Thử Thách 4: FizzBuzz Benchmark

Đo tốc độ các cách implement khác nhau:

```toml
[dev-dependencies]
criterion = "0.5"
```

```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion};

fn fizzbuzz_v1(n: u32) -> String {
    // Implementation 1
}

fn fizzbuzz_v2(n: u32) -> String {
    // Implementation 2
}

fn benchmark_fizzbuzz(c: &mut Criterion) {
    c.bench_function("fizzbuzz v1", |b| {
        b.iter(|| {
            for i in 1..=100 {
                black_box(fizzbuzz_v1(i));
            }
        })
    });

    c.bench_function("fizzbuzz v2", |b| {
        b.iter(|| {
            for i in 1..=100 {
                black_box(fizzbuzz_v2(i));
            }
        })
    });
}

criterion_group!(benches, benchmark_fizzbuzz);
criterion_main!(benches);
```

## 🎓 Biến Thể FizzBuzz

### FizzBuzz SQL
```sql
SELECT
    CASE
        WHEN n % 15 = 0 THEN 'FizzBuzz'
        WHEN n % 3 = 0 THEN 'Fizz'
        WHEN n % 5 = 0 THEN 'Buzz'
        ELSE CAST(n AS VARCHAR)
    END
FROM numbers;
```

### FizzBuzz Regex
Kiểm tra output có đúng format không:

```rust
use regex::Regex;

fn validate_fizzbuzz_output(output: &str) -> bool {
    let re = Regex::new(r"^(Fizz|Buzz|FizzBuzz|\d+)$").unwrap();
    re.is_match(output)
}
```

## 🐛 Lỗi Thường Gặp

### Lỗi 1: Sai Thứ Tự

```rust
// ❌ SAI
if i % 3 == 0 { return "Fizz"; }  // 15 sẽ return sớm!
if i % 15 == 0 { return "FizzBuzz"; }  // Không bao giờ đến

// ✅ ĐÚNG
if i % 15 == 0 { return "FizzBuzz"; }
if i % 3 == 0 { return "Fizz"; }
```

### Lỗi 2: Quên Return String

```rust
// ❌ SAI: Trả về &str, expect String
fn fizzbuzz(n: u32) -> String {
    if n % 3 == 0 { "Fizz" }  // Type mismatch!
}

// ✅ ĐÚNG
fn fizzbuzz(n: u32) -> String {
    if n % 3 == 0 { "Fizz".to_string() }
}
```

## 📚 Kiến Thức Đã Học

✅ **Loops**: For loops với ranges
✅ **Modulo**: Operator `%` để kiểm tra chia hết
✅ **Conditional Logic**: If-else và match
✅ **Pattern Matching**: Match với tuples
✅ **String Building**: Tạo strings động
✅ **Testing**: Viết unit tests
✅ **Refactoring**: Cải thiện code structure

## 🎯 Bước Tiếp Theo

Bạn đã hoàn thành tất cả **Beginner Projects**! 🎉

Sẵn sàng cho thử thách lớn hơn?

➡️ **Intermediate Projects**: [Todo CLI App](todo-cli.md)
➡️ **Practice**: [Basic Exercises](../practice/basic-exercises.md)

---

🎉 **Chúc mừng! Bạn đã chinh phục FizzBuzz!** 🎯
