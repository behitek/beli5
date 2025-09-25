# 🏗️ Structs and Enums: Custom Safety Equipment Blueprints

🤖 **AI-Generated Content**: This page was created by AI to help explain Rust programming concepts in simple terms. While we've checked it carefully, always ask an adult or teacher if something doesn't make sense!

---

## 🎯 What You'll Learn

By the end of this page, you'll understand:
- How to create custom data types with structs (equipment blueprints)
- How to use enums for different options (equipment categories)
- How to build complex safety systems with custom types

---

## 🧰 Structs: Your Equipment Blueprints

Imagine you're designing **custom safety equipment**. Instead of just saying "helmet," you want to track:
- Brand name
- Safety rating  
- Color
- Size
- Manufacturing date
- Is it currently in use?

**Structs** let you create a **blueprint** for this complex equipment data!

### Creating Your First Equipment Struct 🎨

```rust
// Define the blueprint for safety equipment
struct SafetyEquipment {
    name: String,
    brand: String, 
    safety_rating: i32,
    color: String,
    size: String,
    in_use: bool,
}

fn main() {
    // Create actual equipment using the blueprint
    let helmet = SafetyEquipment {
        name: String::from("Professional Hard Hat"),
        brand: String::from("SafetyPro"),
        safety_rating: 10,
        color: String::from("Bright Yellow"),
        size: String::from("Medium"),
        in_use: false,
    };
    
    println!("🛡️ Equipment: {}", helmet.name);
    println!("   Brand: {}", helmet.brand);
    println!("   Rating: {}/10", helmet.safety_rating);
    println!("   Status: {}", if helmet.in_use { "In Use" } else { "Available" });
}
```

### Adding Methods to Your Structs 🔧

```rust
impl SafetyEquipment {
    // Constructor function
    fn new(name: String, brand: String, rating: i32, color: String, size: String) -> Self {
        SafetyEquipment {
            name,
            brand,
            safety_rating: rating,
            color,
            size,
            in_use: false, // New equipment starts as available
        }
    }
    
    // Method to check out equipment
    fn check_out(&mut self) -> bool {
        if !self.in_use {
            self.in_use = true;
            println!("✅ {} checked out successfully", self.name);
            true
        } else {
            println!("❌ {} is already in use", self.name);
            false
        }
    }
    
    // Method to return equipment
    fn check_in(&mut self) {
        self.in_use = false;
        println!("📥 {} returned and available", self.name);
    }
    
    // Method to get safety status
    fn is_safe_to_use(&self) -> bool {
        self.safety_rating >= 7 && !self.in_use
    }
}

fn main() {
    let mut helmet = SafetyEquipment::new(
        String::from("Professional Hard Hat"),
        String::from("SafetyPro"),
        10,
        String::from("Bright Yellow"),
        String::from("Medium")
    );
    
    println!("Safe to use: {}", helmet.is_safe_to_use());
    helmet.check_out();
    println!("Safe to use: {}", helmet.is_safe_to_use());
    helmet.check_in();
}
```

---

## 🎭 Enums: Equipment Categories and States

**Enums** are like having **predefined categories** or **states** that your equipment can be in. Think of them as **multiple choice options**.

### Basic Equipment Categories 📋

```rust
#[derive(Debug)]
enum EquipmentType {
    Helmet,
    Vest,
    Gloves,
    Boots,
    Harness,
}

#[derive(Debug)]
enum EquipmentStatus {
    Available,
    InUse,
    UnderMaintenance,
    Damaged,
    Retired,
}

struct SafetyItem {
    name: String,
    equipment_type: EquipmentType,
    status: EquipmentStatus,
    safety_rating: i32,
}

fn main() {
    let helmet = SafetyItem {
        name: String::from("Hard Hat Pro"),
        equipment_type: EquipmentType::Helmet,
        status: EquipmentStatus::Available,
        safety_rating: 9,
    };
    
    println!("Equipment: {}", helmet.name);
    println!("Type: {:?}", helmet.equipment_type);
    println!("Status: {:?}", helmet.status);
    
    // Using match to handle different statuses
    match helmet.status {
        EquipmentStatus::Available => println!("✅ Ready to use!"),
        EquipmentStatus::InUse => println!("🔄 Currently being used"),
        EquipmentStatus::UnderMaintenance => println!("🔧 Being serviced"),
        EquipmentStatus::Damaged => println!("⚠️ Needs repair"),
        EquipmentStatus::Retired => println!("📦 No longer in service"),
    }
}
```

### Enums with Data 📊

```rust
enum TestResult {
    Passed,
    Failed(String), // Failed with a reason
    PartialPass { score: i32, max_score: i32 },
    NotTested,
}

fn evaluate_equipment(test_result: TestResult) {
    match test_result {
        TestResult::Passed => {
            println!("🎉 Equipment passed all tests!");
        },
        TestResult::Failed(reason) => {
            println!("❌ Equipment failed: {}", reason);
        },
        TestResult::PartialPass { score, max_score } => {
            let percentage = (score * 100) / max_score;
            println!("⚠️ Partial pass: {}/{} ({}%)", score, max_score, percentage);
        },
        TestResult::NotTested => {
            println!("❓ Equipment not yet tested");
        }
    }
}

fn main() {
    evaluate_equipment(TestResult::Passed);
    evaluate_equipment(TestResult::Failed(String::from("Cracked surface detected")));
    evaluate_equipment(TestResult::PartialPass { score: 7, max_score: 10 });
    evaluate_equipment(TestResult::NotTested);
}
```

---

## 🏭 Building a Complete Safety Management System

```rust
#[derive(Debug, Clone)]
enum EquipmentCategory {
    HeadProtection,
    EyeProtection, 
    HandProtection,
    FootProtection,
    FallProtection,
}

#[derive(Debug)]
enum MaintenanceStatus {
    Good,
    NeedsMaintenance(String),
    OutOfService,
}

struct Equipment {
    id: u32,
    name: String,
    category: EquipmentCategory,
    safety_rating: u8,
    maintenance_status: MaintenanceStatus,
    checked_out_to: Option<String>,
}

impl Equipment {
    fn new(id: u32, name: String, category: EquipmentCategory, safety_rating: u8) -> Self {
        Equipment {
            id,
            name,
            category,
            safety_rating,
            maintenance_status: MaintenanceStatus::Good,
            checked_out_to: None,
        }
    }
    
    fn is_available(&self) -> bool {
        matches!(self.maintenance_status, MaintenanceStatus::Good) 
            && self.checked_out_to.is_none()
    }
    
    fn check_out(&mut self, user: String) -> Result<(), String> {
        if !self.is_available() {
            return Err(format!("Equipment {} is not available", self.name));
        }
        
        self.checked_out_to = Some(user.clone());
        println!("✅ {} checked out to {}", self.name, user);
        Ok(())
    }
    
    fn check_in(&mut self) -> Result<(), String> {
        match &self.checked_out_to {
            Some(user) => {
                println!("📥 {} returned by {}", self.name, user);
                self.checked_out_to = None;
                Ok(())
            },
            None => Err(format!("Equipment {} was not checked out", self.name)),
        }
    }
}

struct SafetyManager {
    equipment: Vec<Equipment>,
    next_id: u32,
}

impl SafetyManager {
    fn new() -> Self {
        SafetyManager {
            equipment: Vec::new(),
            next_id: 1,
        }
    }
    
    fn add_equipment(&mut self, name: String, category: EquipmentCategory, rating: u8) {
        let equipment = Equipment::new(self.next_id, name, category, rating);
        println!("➕ Added equipment: {} (ID: {})", equipment.name, equipment.id);
        self.equipment.push(equipment);
        self.next_id += 1;
    }
    
    fn list_available_equipment(&self) {
        println!("📋 Available Equipment:");
        for item in &self.equipment {
            if item.is_available() {
                println!("  🟢 {} - Rating: {}/10 - Category: {:?}", 
                        item.name, item.safety_rating, item.category);
            }
        }
    }
    
    fn check_out_equipment(&mut self, equipment_id: u32, user: String) {
        if let Some(equipment) = self.equipment.iter_mut().find(|e| e.id == equipment_id) {
            match equipment.check_out(user) {
                Ok(()) => println!("Success!"),
                Err(msg) => println!("Error: {}", msg),
            }
        } else {
            println!("❌ Equipment with ID {} not found", equipment_id);
        }
    }
}

fn main() {
    println!("🏭 SAFETY EQUIPMENT MANAGEMENT SYSTEM");
    println!("====================================");
    
    let mut manager = SafetyManager::new();
    
    // Add equipment to inventory
    manager.add_equipment(String::from("Professional Hard Hat"), EquipmentCategory::HeadProtection, 10);
    manager.add_equipment(String::from("Safety Goggles"), EquipmentCategory::EyeProtection, 9);
    manager.add_equipment(String::from("Cut-Resistant Gloves"), EquipmentCategory::HandProtection, 8);
    
    println!();
    manager.list_available_equipment();
    
    println!();
    manager.check_out_equipment(1, String::from("Alice"));
    manager.check_out_equipment(2, String::from("Bob"));
    
    println!();
    manager.list_available_equipment();
}
```

---

## 🎯 Key Takeaways

✅ **Structs** group related data together into custom types  
✅ **Methods** add behavior to structs with `impl` blocks  
✅ **Enums** represent choices and different states  
✅ **Pattern matching** with `match` handles enum variants  
✅ **Custom types** make code more organized and safer

---

**Next up**: Learn about [Error Handling with Results](./error-handling-results) - how to handle problems gracefully in your safety systems! 🚨

---

*🦀 You're building sophisticated data structures now! Structs and enums are the building blocks of complex Rust applications.*
