# 🚨 Error Handling with Results: Safety System Alerts

🤖 **AI-Generated Content**: This page was created by AI to help explain Rust programming concepts in simple terms. While we've checked it carefully, always ask an adult or teacher if something doesn't make sense!

---

## 🎯 What You'll Learn

By the end of this page, you'll understand:
- How Rust handles errors safely with `Result` types
- How to create robust programs that handle problems gracefully
- How to build safety systems that never crash unexpectedly

---

## 🛡️ Safety Systems: Expecting the Unexpected

Imagine you're operating a **safety monitoring system** in a factory. Things can go wrong:

- **Equipment might malfunction** 🔧
- **Sensors might fail** 📡  
- **Network connections might drop** 📶
- **Files might be corrupted** 📄

A **good safety system** doesn't crash when problems happen - it **detects issues**, **reports them clearly**, and **continues operating safely**.

This is exactly what **Rust's Result system** does for your programs!

---

## 📊 The Result Type: Success or Failure

In Rust, functions that might fail return a `Result` type:

```rust
enum Result<T, E> {
    Ok(T),    // Success - contains the result
    Err(E),   // Failure - contains error information
}
```

Think of it like a **safety inspection report**:
- **✅ Ok(data)**: "Inspection passed, here's the equipment data"
- **❌ Err(problem)**: "Inspection failed, here's what went wrong"

### Basic Result Example 🔍

```rust
fn inspect_equipment(equipment_id: u32) -> Result<String, String> {
    if equipment_id == 0 {
        Err(String::from("Invalid equipment ID: cannot be zero"))
    } else if equipment_id > 1000 {
        Err(String::from("Equipment ID too high: not in our system"))
    } else {
        Ok(format!("Equipment {} passed inspection", equipment_id))
    }
}

fn main() {
    let test_ids = vec![0, 42, 1001];
    
    for id in test_ids {
        match inspect_equipment(id) {
            Ok(report) => println!("✅ {}", report),
            Err(error) => println!("❌ Error: {}", error),
        }
    }
}
```

---

## 🔧 Handling Results: The Safe Way

### Method 1: Pattern Matching with `match` 🎯

```rust
fn check_safety_rating(rating: i32) -> Result<String, String> {
    if rating < 0 {
        Err(String::from("Rating cannot be negative"))
    } else if rating > 10 {
        Err(String::from("Rating cannot exceed 10"))
    } else if rating < 5 {
        Ok(String::from("⚠️ CAUTION: Low safety rating"))
    } else if rating < 8 {
        Ok(String::from("✅ GOOD: Acceptable safety rating"))
    } else {
        Ok(String::from("🏆 EXCELLENT: High safety rating"))
    }
}

fn main() {
    let ratings = vec![-1, 3, 6, 9, 15];
    
    for rating in ratings {
        match check_safety_rating(rating) {
            Ok(message) => println!("Rating {}: {}", rating, message),
            Err(error) => println!("Rating {}: ❌ {}", rating, error),
        }
    }
}
```

### Method 2: Using `unwrap_or_else` for Defaults 🔄

```rust
fn get_equipment_name(id: u32) -> Result<String, String> {
    match id {
        1 => Ok(String::from("Safety Helmet")),
        2 => Ok(String::from("Safety Vest")),
        3 => Ok(String::from("Safety Gloves")),
        _ => Err(String::from("Equipment not found")),
    }
}

fn main() {
    let ids = vec![1, 2, 99];
    
    for id in ids {
        let name = get_equipment_name(id)
            .unwrap_or_else(|_| String::from("Unknown Equipment"));
        
        println!("Equipment {}: {}", id, name);
    }
}
```

### Method 3: The `?` Operator - Error Propagation 🚀

```rust
fn read_safety_config() -> Result<String, String> {
    // Simulate reading a config file
    Err(String::from("Config file not found"))
}

fn parse_safety_settings(config: String) -> Result<i32, String> {
    // Simulate parsing settings
    if config.contains("safety_level") {
        Ok(8)
    } else {
        Err(String::from("Safety level not specified"))
    }
}

fn initialize_safety_system() -> Result<i32, String> {
    let config = read_safety_config()?; // If this fails, return the error immediately
    let safety_level = parse_safety_settings(config)?; // If this fails, return the error
    
    println!("Safety system initialized with level {}", safety_level);
    Ok(safety_level)
}

fn main() {
    match initialize_safety_system() {
        Ok(level) => println!("✅ System ready at safety level {}", level),
        Err(error) => println!("❌ Failed to initialize: {}", error),
    }
}
```

---

## 🏭 Building a Robust Safety Monitoring System

```rust
#[derive(Debug)]
struct SafetyAlert {
    equipment_id: u32,
    alert_type: String,
    severity: u8, // 1-10, where 10 is critical
    message: String,
}

#[derive(Debug)]
enum SafetyError {
    EquipmentNotFound(u32),
    SensorFailure(String),
    CriticalAlert(SafetyAlert),
    NetworkError,
}

impl std::fmt::Display for SafetyError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            SafetyError::EquipmentNotFound(id) => 
                write!(f, "Equipment {} not found in system", id),
            SafetyError::SensorFailure(sensor) => 
                write!(f, "Sensor '{}' is not responding", sensor),
            SafetyError::CriticalAlert(alert) => 
                write!(f, "CRITICAL: {} (Equipment {})", alert.message, alert.equipment_id),
            SafetyError::NetworkError => 
                write!(f, "Network connection lost"),
        }
    }
}

struct SafetyMonitor {
    equipment_status: std::collections::HashMap<u32, String>,
}

impl SafetyMonitor {
    fn new() -> Self {
        let mut equipment_status = std::collections::HashMap::new();
        equipment_status.insert(1, String::from("Normal"));
        equipment_status.insert(2, String::from("Normal"));
        equipment_status.insert(3, String::from("Warning"));
        
        SafetyMonitor { equipment_status }
    }
    
    fn check_equipment_status(&self, equipment_id: u32) -> Result<String, SafetyError> {
        match self.equipment_status.get(&equipment_id) {
            Some(status) => {
                if status == "Critical" {
                    let alert = SafetyAlert {
                        equipment_id,
                        alert_type: String::from("Equipment Failure"),
                        severity: 10,
                        message: String::from("Immediate attention required"),
                    };
                    Err(SafetyError::CriticalAlert(alert))
                } else {
                    Ok(status.clone())
                }
            },
            None => Err(SafetyError::EquipmentNotFound(equipment_id)),
        }
    }
    
    fn perform_safety_scan(&self) -> Result<Vec<String>, Vec<SafetyError>> {
        let mut results = Vec::new();
        let mut errors = Vec::new();
        
        for &equipment_id in self.equipment_status.keys() {
            match self.check_equipment_status(equipment_id) {
                Ok(status) => results.push(format!("Equipment {}: {}", equipment_id, status)),
                Err(error) => errors.push(error),
            }
        }
        
        if errors.is_empty() {
            Ok(results)
        } else {
            Err(errors)
        }
    }
    
    fn generate_safety_report(&self) -> Result<String, SafetyError> {
        let scan_results = self.perform_safety_scan();
        
        match scan_results {
            Ok(results) => {
                let mut report = String::from("🛡️ SAFETY SCAN REPORT\n");
                report.push_str("=====================\n");
                
                for result in results {
                    report.push_str(&format!("✅ {}\n", result));
                }
                
                report.push_str("\n📊 Overall Status: ALL SYSTEMS NORMAL");
                Ok(report)
            },
            Err(errors) => {
                // Handle multiple errors - return the most severe
                for error in &errors {
                    if matches!(error, SafetyError::CriticalAlert(_)) {
                        return Err(error.clone()); // Clone the error to return it
                    }
                }
                // If no critical alerts, return the first error
                Err(errors.into_iter().next().unwrap())
            }
        }
    }
}

// Need to implement Clone for SafetyError to use clone() above
impl Clone for SafetyError {
    fn clone(&self) -> Self {
        match self {
            SafetyError::EquipmentNotFound(id) => SafetyError::EquipmentNotFound(*id),
            SafetyError::SensorFailure(sensor) => SafetyError::SensorFailure(sensor.clone()),
            SafetyError::CriticalAlert(alert) => SafetyError::CriticalAlert(SafetyAlert {
                equipment_id: alert.equipment_id,
                alert_type: alert.alert_type.clone(),
                severity: alert.severity,
                message: alert.message.clone(),
            }),
            SafetyError::NetworkError => SafetyError::NetworkError,
        }
    }
}

fn main() {
    println!("🏭 SAFETY MONITORING SYSTEM STARTUP");
    println!("===================================");
    
    let monitor = SafetyMonitor::new();
    
    // Test individual equipment checks
    let test_equipment = vec![1, 2, 3, 99];
    
    println!("\n🔍 Individual Equipment Status:");
    for equipment_id in test_equipment {
        match monitor.check_equipment_status(equipment_id) {
            Ok(status) => println!("  Equipment {}: ✅ {}", equipment_id, status),
            Err(error) => println!("  Equipment {}: ❌ {}", equipment_id, error),
        }
    }
    
    // Generate comprehensive safety report
    println!("\n📋 Generating Safety Report:");
    match monitor.generate_safety_report() {
        Ok(report) => println!("{}", report),
        Err(error) => {
            println!("🚨 SAFETY REPORT FAILED:");
            println!("   {}", error);
            
            // Implement emergency protocols
            println!("\n🚨 EMERGENCY PROTOCOLS ACTIVATED:");
            println!("   1. Alerting safety personnel");
            println!("   2. Initiating backup systems");
            println!("   3. Logging incident for review");
        }
    }
}
```

---

## 🎯 Error Handling Best Practices

### 1. Use Descriptive Error Types 📝

```rust
// ❌ Not very helpful
fn process_data() -> Result<String, String> {
    Err(String::from("Error"))
}

// ✅ Much better - specific error types
#[derive(Debug)]
enum ProcessingError {
    InvalidInput(String),
    NetworkTimeout,
    InsufficientPermissions,
    DataCorrupted { expected_checksum: String, actual_checksum: String },
}
```

### 2. Handle Errors at the Right Level 🎚️

```rust
// Low-level function: propagate errors up
fn read_sensor_data(sensor_id: u32) -> Result<f32, SafetyError> {
    // Implementation that might fail
    Ok(42.5) // Simplified
}

// Mid-level function: handle some errors, propagate others
fn collect_all_sensor_data() -> Result<Vec<f32>, SafetyError> {
    let mut data = Vec::new();
    
    for sensor_id in 1..=5 {
        match read_sensor_data(sensor_id) {
            Ok(value) => data.push(value),
            Err(SafetyError::SensorFailure(_)) => {
                // Handle this specific error locally
                println!("⚠️ Sensor {} offline, using backup", sensor_id);
                data.push(0.0); // Use default value
            },
            Err(other_error) => return Err(other_error), // Propagate other errors
        }
    }
    
    Ok(data)
}

// High-level function: handle errors for the user
fn display_sensor_dashboard() {
    match collect_all_sensor_data() {
        Ok(data) => {
            println!("📊 Sensor Dashboard:");
            for (i, value) in data.iter().enumerate() {
                println!("  Sensor {}: {:.1}", i + 1, value);
            }
        },
        Err(error) => {
            println!("❌ Dashboard unavailable: {}", error);
            println!("🔄 Retrying in 30 seconds...");
        }
    }
}
```

### 3. Provide Recovery Options 🔄

```rust
fn connect_to_safety_server() -> Result<String, String> {
    // Simulate connection attempt
    Err(String::from("Primary server unreachable"))
}

fn connect_to_backup_server() -> Result<String, String> {
    // Simulate backup connection
    Ok(String::from("Connected to backup server"))
}

fn establish_connection() -> Result<String, String> {
    // Try primary server first
    match connect_to_safety_server() {
        Ok(connection) => Ok(connection),
        Err(primary_error) => {
            println!("⚠️ Primary server failed: {}", primary_error);
            println!("🔄 Trying backup server...");
            
            // Try backup server
            match connect_to_backup_server() {
                Ok(backup_connection) => {
                    println!("✅ Backup connection established");
                    Ok(backup_connection)
                },
                Err(backup_error) => {
                    Err(format!("Both servers failed. Primary: {}. Backup: {}", 
                               primary_error, backup_error))
                }
            }
        }
    }
}
```

---

## 🎉 What You've Mastered!

Congratulations! You now understand:

✅ **Result types** represent success or failure safely  
✅ **Pattern matching** handles different outcomes  
✅ **Error propagation** with `?` operator  
✅ **Custom error types** provide detailed information  
✅ **Recovery strategies** keep systems running  
✅ **Best practices** for robust error handling

---

## 🔥 Why This Matters

**No More Crashes**: Your programs handle problems gracefully  
**Better User Experience**: Clear error messages instead of mysterious failures  
**Robust Systems**: Programs that keep working even when things go wrong  
**Easier Debugging**: Detailed error information helps you fix issues faster  
**Production Ready**: Code that's reliable enough for real-world use

---

**Next up**: Learn about [Collections and Vectors](./collections-vectors) - managing groups of safety equipment efficiently! 📦

---

*🦀 You're writing industrial-strength code now! Error handling is what separates hobby projects from professional software.*
