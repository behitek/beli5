# 📦 Collections and Vectors: Managing Equipment Inventory

🤖 **AI-Generated Content**: This page was created by AI to help explain Rust programming concepts in simple terms. While we've checked it carefully, always ask an adult or teacher if something doesn't make sense!

---

## 🎯 What You'll Learn

By the end of this page, you'll understand:
- How to use `Vec<T>` to store lists of equipment
- How to use `HashMap` for fast equipment lookups
- How to manage dynamic collections that grow and shrink

---

## 📋 Vectors: Your Dynamic Equipment Lists

Imagine you have a **smart storage system** that can:
- **Expand automatically** when you add more equipment
- **Shrink** when you remove equipment  
- **Keep everything organized** in order
- **Let you access any item instantly** by position

That's exactly what a **Vector** (`Vec<T>`) does in Rust!

### Creating Your First Equipment Vector 🏗️

```rust
fn main() {
    // Create an empty equipment list
    let mut safety_equipment: Vec<String> = Vec::new();
    
    // Add equipment to the list
    safety_equipment.push(String::from("Safety Helmet"));
    safety_equipment.push(String::from("Protective Vest"));
    safety_equipment.push(String::from("Safety Gloves"));
    safety_equipment.push(String::from("Steel-toe Boots"));
    
    println!("📦 Equipment Inventory:");
    for (index, item) in safety_equipment.iter().enumerate() {
        println!("  {}. {}", index + 1, item);
    }
    
    println!("\nTotal items: {}", safety_equipment.len());
}
```

### Vector Operations: Managing Your Inventory 🔧

```rust
fn main() {
    let mut equipment = vec![
        String::from("Hard Hat"),
        String::from("Safety Vest"), 
        String::from("Work Gloves"),
    ];
    
    println!("📋 Initial Inventory:");
    print_inventory(&equipment);
    
    // Add new equipment
    equipment.push(String::from("Safety Goggles"));
    println!("\n➕ Added Safety Goggles");
    print_inventory(&equipment);
    
    // Remove the last item
    if let Some(removed) = equipment.pop() {
        println!("\n➖ Removed: {}", removed);
    }
    print_inventory(&equipment);
    
    // Insert equipment at specific position
    equipment.insert(1, String::from("High-vis Vest"));
    println!("\n📍 Inserted High-vis Vest at position 2");
    print_inventory(&equipment);
    
    // Access specific equipment
    if let Some(first_item) = equipment.get(0) {
        println!("\n👆 First item: {}", first_item);
    }
    
    // Find equipment by name
    let search_item = "Work Gloves";
    match equipment.iter().position(|item| item == search_item) {
        Some(index) => println!("🔍 Found '{}' at position {}", search_item, index + 1),
        None => println!("❌ '{}' not found in inventory", search_item),
    }
}

fn print_inventory(equipment: &Vec<String>) {
    println!("  Current inventory ({} items):", equipment.len());
    for (index, item) in equipment.iter().enumerate() {
        println!("    {}. {}", index + 1, item);
    }
}
```

---

## 🗂️ HashMaps: Fast Equipment Lookup System

A `HashMap` is like a **high-tech filing cabinet** where you can instantly find any equipment by its ID or name:

```rust
use std::collections::HashMap;

fn main() {
    // Create equipment database with ID -> Equipment mapping
    let mut equipment_db: HashMap<u32, String> = HashMap::new();
    
    // Add equipment with IDs
    equipment_db.insert(1001, String::from("Professional Hard Hat"));
    equipment_db.insert(1002, String::from("High-Visibility Safety Vest"));
    equipment_db.insert(1003, String::from("Cut-Resistant Gloves"));
    equipment_db.insert(1004, String::from("Steel-Toe Safety Boots"));
    
    println!("🗃️ Equipment Database:");
    for (id, name) in &equipment_db {
        println!("  ID {}: {}", id, name);
    }
    
    // Look up equipment by ID
    let search_id = 1002;
    match equipment_db.get(&search_id) {
        Some(equipment) => println!("\n🔍 ID {}: {}", search_id, equipment),
        None => println!("\n❌ No equipment found with ID {}", search_id),
    }
    
    // Check if equipment exists
    if equipment_db.contains_key(&1001) {
        println!("✅ Equipment 1001 is in the database");
    }
    
    // Remove equipment
    if let Some(removed) = equipment_db.remove(&1003) {
        println!("🗑️ Removed: {}", removed);
    }
    
    println!("\nUpdated database size: {}", equipment_db.len());
}
```

---

## 🏭 Building a Complete Equipment Management System

```rust
use std::collections::HashMap;

#[derive(Debug, Clone)]
struct Equipment {
    id: u32,
    name: String,
    category: String,
    safety_rating: u8,
    in_use: bool,
    last_inspection: String,
}

impl Equipment {
    fn new(id: u32, name: String, category: String, safety_rating: u8) -> Self {
        Equipment {
            id,
            name,
            category,
            safety_rating,
            in_use: false,
            last_inspection: String::from("Never"),
        }
    }
    
    fn is_available(&self) -> bool {
        !self.in_use && self.safety_rating >= 7
    }
}

struct EquipmentManager {
    equipment: HashMap<u32, Equipment>,
    categories: HashMap<String, Vec<u32>>, // Category -> List of equipment IDs
    next_id: u32,
}

impl EquipmentManager {
    fn new() -> Self {
        EquipmentManager {
            equipment: HashMap::new(),
            categories: HashMap::new(),
            next_id: 1001,
        }
    }
    
    fn add_equipment(&mut self, name: String, category: String, safety_rating: u8) -> u32 {
        let id = self.next_id;
        let equipment = Equipment::new(id, name.clone(), category.clone(), safety_rating);
        
        // Add to main equipment database
        self.equipment.insert(id, equipment);
        
        // Add to category index
        self.categories
            .entry(category.clone())
            .or_insert_with(Vec::new)
            .push(id);
        
        self.next_id += 1;
        
        println!("➕ Added: {} (ID: {}, Category: {})", name, id, category);
        id
    }
    
    fn list_all_equipment(&self) {
        println!("📋 ALL EQUIPMENT:");
        println!("================");
        
        for (id, equipment) in &self.equipment {
            let status = if equipment.is_available() { "✅ Available" } else { "🔄 In Use" };
            println!("ID {}: {} - {} - Rating: {}/10 - {}",
                    id, equipment.name, equipment.category, equipment.safety_rating, status);
        }
        
        println!("Total equipment: {}", self.equipment.len());
    }
    
    fn list_equipment_by_category(&self, category: &str) {
        println!("📂 EQUIPMENT IN CATEGORY: {}", category.to_uppercase());
        println!("{}", "=".repeat(25 + category.len()));
        
        match self.categories.get(category) {
            Some(equipment_ids) => {
                for &id in equipment_ids {
                    if let Some(equipment) = self.equipment.get(&id) {
                        let status = if equipment.is_available() { "✅" } else { "🔄" };
                        println!("  {} ID {}: {} - Rating: {}/10",
                                status, id, equipment.name, equipment.safety_rating);
                    }
                }
                println!("Items in category: {}", equipment_ids.len());
            },
            None => println!("❌ No equipment found in category '{}'", category),
        }
    }
    
    fn find_available_equipment(&self) -> Vec<&Equipment> {
        self.equipment
            .values()
            .filter(|equipment| equipment.is_available())
            .collect()
    }
    
    fn check_out_equipment(&mut self, id: u32, user: &str) -> Result<(), String> {
        match self.equipment.get_mut(&id) {
            Some(equipment) => {
                if equipment.is_available() {
                    equipment.in_use = true;
                    println!("✅ {} checked out '{}' (ID: {})",
                            user, equipment.name, id);
                    Ok(())
                } else {
                    Err(format!("Equipment {} is not available", id))
                }
            },
            None => Err(format!("Equipment with ID {} not found", id)),
        }
    }
    
    fn check_in_equipment(&mut self, id: u32) -> Result<(), String> {
        match self.equipment.get_mut(&id) {
            Some(equipment) => {
                if equipment.in_use {
                    equipment.in_use = false;
                    println!("📥 '{}' (ID: {}) returned and available",
                            equipment.name, id);
                    Ok(())
                } else {
                    Err(format!("Equipment {} was not checked out", id))
                }
            },
            None => Err(format!("Equipment with ID {} not found", id)),
        }
    }
    
    fn get_statistics(&self) {
        let total = self.equipment.len();
        let available = self.find_available_equipment().len();
        let in_use = total - available;
        
        println!("📊 EQUIPMENT STATISTICS:");
        println!("========================");
        println!("Total Equipment: {}", total);
        println!("Available: {} ({}%)", available, (available * 100) / total.max(1));
        println!("In Use: {} ({}%)", in_use, (in_use * 100) / total.max(1));
        
        println!("\n📂 By Category:");
        for (category, ids) in &self.categories {
            println!("  {}: {} items", category, ids.len());
        }
    }
}

fn main() {
    println!("🏭 EQUIPMENT MANAGEMENT SYSTEM v2.0");
    println!("===================================");
    
    let mut manager = EquipmentManager::new();
    
    // Add various equipment
    let helmet_id = manager.add_equipment(
        String::from("Professional Hard Hat"),
        String::from("Head Protection"),
        10
    );
    
    let vest_id = manager.add_equipment(
        String::from("High-Vis Safety Vest"),
        String::from("Body Protection"),
        9
    );
    
    manager.add_equipment(
        String::from("Cut-Resistant Gloves"),
        String::from("Hand Protection"),
        8
    );
    
    manager.add_equipment(
        String::from("Safety Goggles"),
        String::from("Eye Protection"),
        9
    );
    
    manager.add_equipment(
        String::from("Steel-Toe Boots"),
        String::from("Foot Protection"),
        10
    );
    
    println!();
    manager.list_all_equipment();
    
    println!();
    manager.list_equipment_by_category("Head Protection");
    
    println!();
    manager.get_statistics();
    
    // Test checkout/checkin system
    println!("\n🔄 TESTING CHECKOUT SYSTEM:");
    println!("===========================");
    
    match manager.check_out_equipment(helmet_id, "Alice") {
        Ok(()) => println!("Checkout successful!"),
        Err(msg) => println!("Checkout failed: {}", msg),
    }
    
    match manager.check_out_equipment(vest_id, "Bob") {
        Ok(()) => println!("Checkout successful!"),
        Err(msg) => println!("Checkout failed: {}", msg),
    }
    
    println!("\n📊 Updated Statistics:");
    manager.get_statistics();
    
    // Check in equipment
    println!("\n📥 CHECKING IN EQUIPMENT:");
    match manager.check_in_equipment(helmet_id) {
        Ok(()) => println!("Check-in successful!"),
        Err(msg) => println!("Check-in failed: {}", msg),
    }
    
    println!("\n📊 Final Statistics:");
    manager.get_statistics();
}
```

---

## 🎯 Collection Best Practices

### Choosing the Right Collection 🤔

| Collection | Best For | Example Use |
|------------|----------|-------------|
| `Vec<T>` | Ordered lists, frequent additions | Equipment inventory, user lists |
| `HashMap<K,V>` | Fast lookups by key | Equipment database, user profiles |
| `HashSet<T>` | Unique items, membership testing | Active user IDs, equipment categories |
| `BTreeMap<K,V>` | Sorted key-value pairs | Alphabetical equipment lists |

### Performance Tips ⚡

```rust
fn main() {
    // Pre-allocate capacity if you know the size
    let mut equipment = Vec::with_capacity(100); // More efficient than growing
    
    // Use iterators for better performance
    let safety_equipment: Vec<String> = vec![
        "Helmet", "Vest", "Gloves", "Boots"
    ].into_iter()
     .map(|item| format!("Safety {}", item))
     .collect();
    
    // Filter and collect in one step
    let available_equipment: Vec<&String> = safety_equipment
        .iter()
        .filter(|item| item.contains("Safety"))
        .collect();
    
    println!("Available equipment: {:?}", available_equipment);
}
```

---

## 🎉 What You've Mastered!

Congratulations! You now understand:

✅ **Vectors** for dynamic, ordered collections  
✅ **HashMaps** for fast key-value lookups  
✅ **Collection operations** like push, pop, insert, remove  
✅ **Iterators** for processing collections efficiently  
✅ **Performance considerations** for choosing collections  
✅ **Real-world applications** in equipment management

---

## 🔥 Why This Matters

**Dynamic Data**: Handle collections that change size at runtime  
**Performance**: Choose the right collection for optimal speed  
**Organization**: Structure complex data relationships  
**Scalability**: Build systems that handle thousands of items  
**Real Applications**: Essential for any serious Rust program

---

**Next up**: Ready for advanced concepts? Let's explore [Ownership and Borrowing](../advanced/ownership-and-borrowing) in depth! 🚀

---

*🦀 You're handling complex data structures like a pro! Collections are the foundation of most real-world applications.*
