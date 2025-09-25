# 🧮 Safe Calculator Project: Build Your First Rust Application

🤖 **AI-Generated Content**: This page was created by AI to help explain Rust programming concepts in simple terms. While we've checked it carefully, always ask an adult or teacher if something doesn't make sense!

---

## 🎯 Project Goal

Build a calculator that never crashes, handles errors gracefully, and demonstrates Rust's safety features in a real application.

---

## 🏗️ What You'll Build

A command-line calculator that:
- Performs basic math operations safely
- Handles invalid input without crashing
- Uses proper error handling with Result types
- Demonstrates memory safety in action

```rust
use std::io;

#[derive(Debug)]
enum CalculatorError {
    InvalidInput(String),
    DivisionByZero,
    Overflow,
}

fn main() {
    println!("🧮 SAFE CALCULATOR v1.0");
    println!("=======================");
    
    loop {
        match get_calculation() {
            Ok(result) => println!("✅ Result: {}", result),
            Err(error) => println!("❌ Error: {:?}", error),
        }
        
        if !should_continue() {
            break;
        }
    }
    
    println!("👋 Thanks for using Safe Calculator!");
}

fn get_calculation() -> Result<f64, CalculatorError> {
    let num1 = get_number("Enter first number: ")?;
    let operator = get_operator()?;
    let num2 = get_number("Enter second number: ")?;
    
    calculate(num1, operator, num2)
}

fn calculate(a: f64, op: char, b: f64) -> Result<f64, CalculatorError> {
    match op {
        '+' => Ok(a + b),
        '-' => Ok(a - b),
        '*' => Ok(a * b),
        '/' => {
            if b == 0.0 {
                Err(CalculatorError::DivisionByZero)
            } else {
                Ok(a / b)
            }
        },
        _ => Err(CalculatorError::InvalidInput(format!("Unknown operator: {}", op))),
    }
}
```

This project teaches error handling, user input validation, and building robust applications with Rust's safety features.

---

**Next Project**: [File Organizer](./file-organizer) 📁

*🦀 Your first complete Rust application with professional error handling!*
