# 🏗️ Functions and Modules: Building Your Safety Toolkit

🤖 **AI-Generated Content**: This page was created by AI to help explain Rust programming concepts in simple terms. While we've checked it carefully, always ask an adult or teacher if something doesn't make sense!

---

## 🎯 What You'll Learn

By the end of this page, you'll understand:
- How to create functions (your specialized safety tools)
- How to organize code with modules (your organized toolbox system)
- How to build reusable, well-organized Rust programs

---

## 🧰 Functions: Your Specialized Safety Tools

Imagine you're a professional safety inspector with a **toolbox full of specialized tools**. Each tool does one specific job really well:

- **🔧 Wrench**: Tightens bolts on safety equipment
- **📏 Measuring tape**: Checks if equipment fits properly  
- **🔍 Magnifying glass**: Inspects for tiny cracks or damage
- **⚖️ Scale**: Weighs equipment to ensure it meets standards

**Functions in Rust** are exactly like these specialized tools - each one does a specific job, and you can use them whenever you need them!

---

## 🔨 Creating Your First Function Tools

### Basic Function Structure 🏗️

```rust
fn tool_name(input_materials: InputType) -> OutputType {
    // Do the work here
    result
}
```

### Example: Safety Equipment Inspector Tool 🔍

```rust
fn inspect_helmet(helmet_name: &str) -> String {
    println!("🔍 Inspecting helmet: {}", helmet_name);
    
    // Do the inspection work
    let safety_rating = "EXCELLENT";
    
    // Return the result
    format!("{} - Safety Rating: {}", helmet_name, safety_rating)
}

fn main() {
    let helmet1 = "Professional Hard Hat";
    let helmet2 = "Climbing Helmet";
    
    // Use our inspection tool
    let result1 = inspect_helmet(helmet1);
    let result2 = inspect_helmet(helmet2);
    
    println!("📋 Inspection Results:");
    println!("  {}", result1);
    println!("  {}", result2);
}
```

### Breaking It Down 🧩

**Function Declaration**: `fn inspect_helmet`
- `fn` means "function" - like labeling your tool
- `inspect_helmet` is the name - what this tool does

**Parameters**: `helmet_name: &str`
- These are the "materials" your tool works with
- `&str` means "borrowed text" - we can look at it but don't own it

**Return Type**: `-> String`
- This is what your tool produces when it's done
- `String` means it gives back some text

**Function Body**: Everything between `{` and `}`
- This is the actual work your tool does

---

## 🎮 Building a Complete Safety Toolkit

Let's create multiple specialized tools and use them together:

```rust
// Tool 1: Equipment Rating Calculator
fn calculate_safety_rating(durability: i32, comfort: i32, protection: i32) -> i32 {
    let total_score = durability + comfort + protection;
    let rating = total_score / 3; // Average score
    
    println!("📊 Calculating: {} + {} + {} = {} (avg: {})", 
             durability, comfort, protection, total_score, rating);
    
    rating
}

// Tool 2: Safety Level Determiner  
fn determine_safety_level(rating: i32) -> &'static str {
    if rating >= 9 {
        "🟢 EXCELLENT"
    } else if rating >= 7 {
        "🟡 GOOD" 
    } else if rating >= 5 {
        "🟠 ACCEPTABLE"
    } else {
        "🔴 NEEDS IMPROVEMENT"
    }
}

// Tool 3: Equipment Report Generator
fn generate_equipment_report(name: &str, rating: i32, level: &str) -> String {
    format!("🛡️ EQUIPMENT REPORT\n\
             Name: {}\n\
             Rating: {}/10\n\
             Level: {}\n\
             ─────────────────", name, rating, level)
}

// Tool 4: Complete Equipment Analysis
fn analyze_equipment(name: &str, durability: i32, comfort: i32, protection: i32) {
    println!("🔧 Starting analysis for: {}", name);
    
    // Use our specialized tools in sequence
    let rating = calculate_safety_rating(durability, comfort, protection);
    let level = determine_safety_level(rating);
    let report = generate_equipment_report(name, rating, level);
    
    println!("{}", report);
}

fn main() {
    println!("🏭 SAFETY EQUIPMENT ANALYSIS CENTER");
    println!("===================================\n");
    
    // Analyze different pieces of equipment
    analyze_equipment("Professional Hard Hat", 10, 8, 10);
    analyze_equipment("Basic Safety Vest", 6, 9, 7);
    analyze_equipment("Heavy Duty Gloves", 9, 6, 9);
    
    println!("✅ All equipment analysis complete!");
}
```

---

## 📦 Modules: Your Organized Toolbox System

As your toolkit grows, you need a **organized storage system**. Modules are like having **separate toolboxes** for different types of work:

- **🔧 Mechanical Tools Box**: Wrenches, screwdrivers, pliers
- **📏 Measuring Tools Box**: Rulers, calipers, gauges
- **🔍 Inspection Tools Box**: Magnifiers, lights, cameras
- **📋 Documentation Tools Box**: Forms, clipboards, pens

### Creating Your First Module 📦

```rust
// Module: inspection_tools
mod inspection_tools {
    pub fn visual_check(item: &str) -> bool {
        println!("👀 Visual inspection of {}", item);
        // Simulate inspection logic
        true
    }
    
    pub fn measure_dimensions(item: &str) -> (f32, f32, f32) {
        println!("📏 Measuring dimensions of {}", item);
        // Return width, height, depth
        (10.5, 15.2, 8.7)
    }
    
    pub fn test_durability(item: &str) -> i32 {
        println!("🔨 Testing durability of {}", item);
        // Return durability score out of 10
        8
    }
}

// Module: reporting_tools  
mod reporting_tools {
    pub fn create_header(title: &str) -> String {
        format!("🏭 {}\n{}", title, "=".repeat(title.len() + 4))
    }
    
    pub fn format_result(test_name: &str, result: &str) -> String {
        format!("  ✅ {}: {}", test_name, result)
    }
    
    pub fn create_summary(total_tests: i32, passed: i32) -> String {
        format!("📊 Summary: {}/{} tests passed", passed, total_tests)
    }
}

fn main() {
    println!("{}", reporting_tools::create_header("EQUIPMENT TESTING FACILITY"));
    
    let helmet = "Safety Helmet Model X1";
    
    // Use tools from inspection_tools module
    let visual_ok = inspection_tools::visual_check(helmet);
    let dimensions = inspection_tools::measure_dimensions(helmet);
    let durability = inspection_tools::test_durability(helmet);
    
    // Use tools from reporting_tools module
    println!("{}", reporting_tools::format_result("Visual Check", 
        if visual_ok { "PASSED" } else { "FAILED" }));
    println!("{}", reporting_tools::format_result("Dimensions", 
        &format!("{:.1} x {:.1} x {:.1} cm", dimensions.0, dimensions.1, dimensions.2)));
    println!("{}", reporting_tools::format_result("Durability", 
        &format!("{}/10", durability)));
    
    println!("\n{}", reporting_tools::create_summary(3, 3));
}
```

### Understanding Module Syntax 🔍

**Module Declaration**: `mod inspection_tools { ... }`
- Creates a new "toolbox" called `inspection_tools`
- Everything inside `{ }` belongs to this module

**Public Functions**: `pub fn visual_check(...)`
- `pub` means "public" - other modules can use this tool
- Without `pub`, the function is private (only usable within the module)

**Using Module Functions**: `inspection_tools::visual_check(helmet)`
- `::` is like opening a specific toolbox and taking out a tool
- `module_name::function_name` tells Rust exactly which tool you want

---

## 🚀 Advanced Function Features

### Functions That Take Functions (Higher-Order Functions) 🎯

```rust
// A function that applies a test to equipment
fn apply_test<F>(equipment: &str, test_name: &str, test_function: F) 
where 
    F: Fn(&str) -> bool 
{
    println!("🧪 Running {} on {}", test_name, equipment);
    let result = test_function(equipment);
    println!("   Result: {}", if result { "✅ PASS" } else { "❌ FAIL" });
}

// Test functions
fn strength_test(item: &str) -> bool {
    println!("   💪 Testing strength of {}", item);
    true // Simulate test result
}

fn flexibility_test(item: &str) -> bool {
    println!("   🤸 Testing flexibility of {}", item);
    true // Simulate test result
}

fn main() {
    let helmet = "Advanced Safety Helmet";
    
    // Use the same test runner with different tests
    apply_test(helmet, "Strength Test", strength_test);
    apply_test(helmet, "Flexibility Test", flexibility_test);
    
    // Use a closure (inline function)
    apply_test(helmet, "Water Resistance Test", |item| {
        println!("   💧 Testing water resistance of {}", item);
        true
    });
}
```

### Functions with Default Values (Using Option) 🎛️

```rust
fn create_safety_report(equipment: &str, rating: Option<i32>) -> String {
    let rating_text = match rating {
        Some(score) => format!("{}/10", score),
        None => "Not Rated".to_string(),
    };
    
    format!("🛡️ Equipment: {}\n   Rating: {}", equipment, rating_text)
}

fn main() {
    // With rating
    println!("{}", create_safety_report("Helmet A", Some(9)));
    
    // Without rating  
    println!("{}", create_safety_report("Helmet B", None));
}
```

---

## 🏗️ Organizing Large Projects

### File-Based Modules 📁

For larger projects, you can put modules in separate files:

**File: `src/safety_tools.rs`**
```rust
pub fn inspect_equipment(name: &str) -> bool {
    println!("🔍 Inspecting {}", name);
    true
}

pub fn rate_equipment(name: &str) -> i32 {
    println!("⭐ Rating {}", name);
    8
}
```

**File: `src/main.rs`**
```rust
mod safety_tools; // Import the module from safety_tools.rs

fn main() {
    let helmet = "Professional Helmet";
    
    let inspection_passed = safety_tools::inspect_equipment(helmet);
    let rating = safety_tools::rate_equipment(helmet);
    
    println!("Inspection: {}, Rating: {}/10", 
             if inspection_passed { "PASSED" } else { "FAILED" }, rating);
}
```

---

## 🎯 Best Practices for Functions and Modules

### Function Design Principles 🎨

**1. Single Responsibility**: Each function should do one thing well
```rust
// ✅ Good - does one thing
fn calculate_safety_score(durability: i32, comfort: i32) -> i32 {
    (durability + comfort) / 2
}

// ❌ Not ideal - does too many things
fn calculate_and_print_and_save_score(durability: i32, comfort: i32) -> i32 {
    let score = (durability + comfort) / 2;
    println!("Score: {}", score);
    // save_to_file(score); // Multiple responsibilities
    score
}
```

**2. Clear Naming**: Function names should explain what they do
```rust
// ✅ Good - clear what it does
fn is_equipment_safe(rating: i32) -> bool {
    rating >= 7
}

// ❌ Unclear - what does this do?
fn check(rating: i32) -> bool {
    rating >= 7
}
```

**3. Reasonable Parameter Count**: Don't pass too many parameters
```rust
// ✅ Good - reasonable number of parameters
fn create_equipment(name: &str, rating: i32) -> Equipment {
    // Implementation
}

// ❌ Too many parameters - consider using a struct instead
fn create_equipment(name: &str, rating: i32, color: &str, weight: f32, 
                   manufacturer: &str, model: &str, year: i32) -> Equipment {
    // Implementation
}
```

### Module Organization Tips 📚

**1. Group Related Functionality**
```rust
mod safety_equipment {
    pub mod helmets { /* helmet-specific functions */ }
    pub mod vests { /* vest-specific functions */ }
    pub mod gloves { /* glove-specific functions */ }
}

mod testing {
    pub mod durability_tests { /* durability testing functions */ }
    pub mod comfort_tests { /* comfort testing functions */ }
}
```

**2. Use Clear Module Names**
```rust
mod user_interface;     // ✅ Clear purpose
mod database_access;    // ✅ Clear purpose
mod utils;              // ❌ Too vague - what kind of utilities?
```

---

## 🎉 What You've Accomplished!

Congratulations! You now understand:

✅ **Functions** are specialized tools that do specific jobs  
✅ **Parameters** are the materials functions work with  
✅ **Return values** are what functions produce  
✅ **Modules** organize related functions together  
✅ **Public/private** controls what other modules can access  
✅ **Best practices** for writing clean, maintainable code

---

## 🔥 Why This Matters

**Code Organization**: Your programs are now structured and easy to understand  
**Reusability**: Write once, use many times  
**Maintainability**: Easy to find and fix issues  
**Collaboration**: Others can understand and work with your code  
**Scalability**: Your code can grow from small scripts to large applications

---

## 🆘 Need Help?

- **Function errors?** Check parameter types and return types match
- **Module confusion?** Remember `pub` makes things accessible from outside
- **Can't find a function?** Make sure you're using the right module path
- **Code getting messy?** Time to organize into modules!
- Check our [Help and Tips](../help-and-tips) page for more guidance

---

**Next up**: Let's learn about [Structs and Enums](./structs-and-enums) - discover how to create custom data types for your safety equipment! 🏗️

---

*🦀 You're building real programming skills now! Functions and modules are the foundation of all serious Rust programs. You're well on your way to becoming a Rust expert!*
