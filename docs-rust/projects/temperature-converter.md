---
sidebar_position: 3
title: 🌡️ Chuyển Đổi Nhiệt Độ
description: Xây dựng ứng dụng chuyển đổi nhiệt độ giữa Celsius, Fahrenheit và Kelvin
keywords: [rust, project, temperature, converter, functions, beginner]
---

# 🌡️ Chuyển Đổi Nhiệt Độ

## 🎯 Mục Tiêu Dự Án

Xây dựng ứng dụng chuyển đổi nhiệt độ giữa ba đơn vị:
- 🌡️ **Celsius (°C)** - Thông dụng ở châu Âu, Việt Nam
- 🌡️ **Fahrenheit (°F)** - Dùng ở Mỹ
- 🌡️ **Kelvin (K)** - Đơn vị khoa học

### Bạn Sẽ Học Được
- ✅ Tạo functions với nhiều tham số
- ✅ Sử dụng enums cho các lựa chọn
- ✅ Xây dựng menu tương tác
- ✅ Format số với độ chính xác
- ✅ Validate input người dùng

## 📐 Công Thức Chuyển Đổi

### Celsius ↔ Fahrenheit
```
°F = (°C × 9/5) + 32
°C = (°F - 32) × 5/9
```

### Celsius ↔ Kelvin
```
K = °C + 273.15
°C = K - 273.15
```

### Fahrenheit ↔ Kelvin
```
K = (°F - 32) × 5/9 + 273.15
°F = (K - 273.15) × 9/5 + 32
```

## 📦 Bước 1: Tạo Project

```bash
cargo new temperature_converter
cd temperature_converter
```

## 🎮 Bước 2: Version 1 - Basic Converter

```rust
use std::io;

fn main() {
    println!("🌡️  Chuyển Đổi Nhiệt Độ");
    println!("======================");

    loop {
        println!("\n📋 Menu:");
        println!("  1. Celsius → Fahrenheit");
        println!("  2. Fahrenheit → Celsius");
        println!("  3. Celsius → Kelvin");
        println!("  4. Kelvin → Celsius");
        println!("  5. Thoát");

        print!("\n📝 Chọn (1-5): ");

        let choice = get_input();

        match choice.trim() {
            "1" => convert_celsius_to_fahrenheit(),
            "2" => convert_fahrenheit_to_celsius(),
            "3" => convert_celsius_to_kelvin(),
            "4" => convert_kelvin_to_celsius(),
            "5" => {
                println!("👋 Tạm biệt!");
                break;
            },
            _ => println!("⚠️  Lựa chọn không hợp lệ!"),
        }
    }
}

fn get_input() -> String {
    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("❌ Không đọc được input!");
    input
}

fn get_temperature() -> f64 {
    loop {
        print!("📝 Nhập nhiệt độ: ");
        let input = get_input();

        match input.trim().parse::<f64>() {
            Ok(temp) => return temp,
            Err(_) => println!("⚠️  Vui lòng nhập số hợp lệ!"),
        }
    }
}

fn convert_celsius_to_fahrenheit() {
    let celsius = get_temperature();
    let fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
    println!("✅ {}°C = {:.2}°F", celsius, fahrenheit);
}

fn convert_fahrenheit_to_celsius() {
    let fahrenheit = get_temperature();
    let celsius = (fahrenheit - 32.0) * 5.0 / 9.0;
    println!("✅ {}°F = {:.2}°C", fahrenheit, celsius);
}

fn convert_celsius_to_kelvin() {
    let celsius = get_temperature();
    let kelvin = celsius + 273.15;
    println!("✅ {}°C = {:.2}K", celsius, kelvin);
}

fn convert_kelvin_to_celsius() {
    let kelvin = get_temperature();

    if kelvin < 0.0 {
        println!("⚠️  Kelvin không thể âm!");
        return;
    }

    let celsius = kelvin - 273.15;
    println!("✅ {}K = {:.2}°C", kelvin, celsius);
}
```

## 🚀 Chạy Thử

```bash
cargo run
```

**Output mẫu:**
```
🌡️  Chuyển Đổi Nhiệt Độ
======================

📋 Menu:
  1. Celsius → Fahrenheit
  2. Fahrenheit → Celsius
  3. Celsius → Kelvin
  4. Kelvin → Celsius
  5. Thoát

📝 Chọn (1-5): 1

📝 Nhập nhiệt độ: 25
✅ 25°C = 77.00°F
```

## 🎨 Bước 3: Version 2 - Với Enum

Sử dụng enum để code rõ ràng hơn:

```rust
use std::io;

#[derive(Debug, Clone, Copy)]
enum TemperatureUnit {
    Celsius,
    Fahrenheit,
    Kelvin,
}

impl TemperatureUnit {
    fn symbol(&self) -> &str {
        match self {
            TemperatureUnit::Celsius => "°C",
            TemperatureUnit::Fahrenheit => "°F",
            TemperatureUnit::Kelvin => "K",
        }
    }

    fn name(&self) -> &str {
        match self {
            TemperatureUnit::Celsius => "Celsius",
            TemperatureUnit::Fahrenheit => "Fahrenheit",
            TemperatureUnit::Kelvin => "Kelvin",
        }
    }
}

struct Temperature {
    value: f64,
    unit: TemperatureUnit,
}

impl Temperature {
    fn new(value: f64, unit: TemperatureUnit) -> Result<Self, String> {
        // Kiểm tra Kelvin không âm
        if matches!(unit, TemperatureUnit::Kelvin) && value < 0.0 {
            return Err("Kelvin không thể âm!".to_string());
        }

        // Kiểm tra absolute zero
        let absolute_zero_celsius = -273.15;
        let temp_celsius = match unit {
            TemperatureUnit::Celsius => value,
            TemperatureUnit::Fahrenheit => (value - 32.0) * 5.0 / 9.0,
            TemperatureUnit::Kelvin => value - 273.15,
        };

        if temp_celsius < absolute_zero_celsius {
            return Err("Nhiệt độ không thể thấp hơn absolute zero (-273.15°C)!".to_string());
        }

        Ok(Temperature { value, unit })
    }

    fn convert_to(&self, target_unit: TemperatureUnit) -> Temperature {
        if matches!(self.unit, target_unit) {
            return Temperature {
                value: self.value,
                unit: self.unit,
            };
        }

        // Chuyển về Celsius trước
        let celsius = match self.unit {
            TemperatureUnit::Celsius => self.value,
            TemperatureUnit::Fahrenheit => (self.value - 32.0) * 5.0 / 9.0,
            TemperatureUnit::Kelvin => self.value - 273.15,
        };

        // Chuyển từ Celsius sang đơn vị đích
        let value = match target_unit {
            TemperatureUnit::Celsius => celsius,
            TemperatureUnit::Fahrenheit => (celsius * 9.0 / 5.0) + 32.0,
            TemperatureUnit::Kelvin => celsius + 273.15,
        };

        Temperature {
            value,
            unit: target_unit,
        }
    }

    fn display(&self) -> String {
        format!("{:.2}{}", self.value, self.unit.symbol())
    }
}

fn main() {
    println!("🌡️  Chuyển Đổi Nhiệt Độ - Version 2");
    println!("===================================");

    loop {
        println!("\n📋 Chọn đơn vị nguồn:");
        println!("  1. Celsius (°C)");
        println!("  2. Fahrenheit (°F)");
        println!("  3. Kelvin (K)");
        println!("  4. Thoát");

        let choice = get_input("📝 Chọn (1-4): ");

        let from_unit = match choice.trim() {
            "1" => TemperatureUnit::Celsius,
            "2" => TemperatureUnit::Fahrenheit,
            "3" => TemperatureUnit::Kelvin,
            "4" => {
                println!("👋 Tạm biệt!");
                break;
            },
            _ => {
                println!("⚠️  Lựa chọn không hợp lệ!");
                continue;
            }
        };

        let value = match get_number(&format!("📝 Nhập nhiệt độ ({}): ", from_unit.symbol())) {
            Some(v) => v,
            None => continue,
        };

        let temp = match Temperature::new(value, from_unit) {
            Ok(t) => t,
            Err(e) => {
                println!("⚠️  {}", e);
                continue;
            }
        };

        println!("\n🔄 Kết quả chuyển đổi:");

        // Hiển thị tất cả đơn vị
        for unit in [TemperatureUnit::Celsius, TemperatureUnit::Fahrenheit, TemperatureUnit::Kelvin] {
            let converted = temp.convert_to(unit);
            println!("  {} → {}", from_unit.name(), converted.display());
        }
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

fn get_number(prompt: &str) -> Option<f64> {
    let input = get_input(prompt);
    match input.trim().parse::<f64>() {
        Ok(n) => Some(n),
        Err(_) => {
            println!("⚠️  Vui lòng nhập số hợp lệ!");
            None
        }
    }
}
```

## 🎨 Bước 4: Version 3 - Table Display

Hiển thị bảng chuyển đổi đẹp mắt:

```rust
use std::io;

#[derive(Debug, Clone, Copy, PartialEq)]
enum TemperatureUnit {
    Celsius,
    Fahrenheit,
    Kelvin,
}

impl TemperatureUnit {
    fn symbol(&self) -> &str {
        match self {
            TemperatureUnit::Celsius => "°C",
            TemperatureUnit::Fahrenheit => "°F",
            TemperatureUnit::Kelvin => "K",
        }
    }
}

struct Temperature {
    value: f64,
    unit: TemperatureUnit,
}

impl Temperature {
    fn new(value: f64, unit: TemperatureUnit) -> Result<Self, String> {
        let absolute_zero_celsius = -273.15;
        let temp_celsius = match unit {
            TemperatureUnit::Celsius => value,
            TemperatureUnit::Fahrenheit => (value - 32.0) * 5.0 / 9.0,
            TemperatureUnit::Kelvin => value - 273.15,
        };

        if temp_celsius < absolute_zero_celsius - 0.01 {
            return Err("Nhiệt độ thấp hơn absolute zero!".to_string());
        }

        Ok(Temperature { value, unit })
    }

    fn to_celsius(&self) -> f64 {
        match self.unit {
            TemperatureUnit::Celsius => self.value,
            TemperatureUnit::Fahrenheit => (self.value - 32.0) * 5.0 / 9.0,
            TemperatureUnit::Kelvin => self.value - 273.15,
        }
    }

    fn convert_to(&self, target_unit: TemperatureUnit) -> f64 {
        let celsius = self.to_celsius();
        match target_unit {
            TemperatureUnit::Celsius => celsius,
            TemperatureUnit::Fahrenheit => (celsius * 9.0 / 5.0) + 32.0,
            TemperatureUnit::Kelvin => celsius + 273.15,
        }
    }
}

fn main() {
    println!("🌡️  Chuyển Đổi Nhiệt Độ - Ultimate Edition");
    println!("==========================================");

    loop {
        println!("\n📋 Menu:");
        println!("  1. Chuyển đổi đơn lẻ");
        println!("  2. Hiển thị bảng chuyển đổi");
        println!("  3. So sánh nhiệt độ");
        println!("  4. Thoát");

        let choice = get_input("📝 Chọn: ");

        match choice.trim() {
            "1" => convert_single(),
            "2" => show_conversion_table(),
            "3" => compare_temperatures(),
            "4" => {
                println!("👋 Tạm biệt!");
                break;
            },
            _ => println!("⚠️  Lựa chọn không hợp lệ!"),
        }
    }
}

fn convert_single() {
    let (value, from_unit) = match get_temperature_input() {
        Some(t) => t,
        None => return,
    };

    let temp = match Temperature::new(value, from_unit) {
        Ok(t) => t,
        Err(e) => {
            println!("⚠️  {}", e);
            return;
        }
    };

    println!("\n╔════════════════════════╗");
    println!("║  Kết Quả Chuyển Đổi   ║");
    println!("╠════════════════════════╣");
    println!("║ Celsius    │ {:>8.2}°C ║", temp.convert_to(TemperatureUnit::Celsius));
    println!("║ Fahrenheit │ {:>8.2}°F ║", temp.convert_to(TemperatureUnit::Fahrenheit));
    println!("║ Kelvin     │ {:>9.2}K ║", temp.convert_to(TemperatureUnit::Kelvin));
    println!("╚════════════════════════╝");
}

fn show_conversion_table() {
    println!("\n🌡️  Bảng Chuyển Đổi Nhiệt Độ Thông Dụng");
    println!("═══════════════════════════════════════");

    let reference_temps = vec![
        ("Absolute Zero", -273.15),
        ("Nước đóng băng", 0.0),
        ("Nhiệt độ phòng", 20.0),
        ("Nhiệt độ cơ thể", 37.0),
        ("Nước sôi", 100.0),
    ];

    println!("\n┌────────────────────┬─────────┬─────────┬─────────┐");
    println!("│ Sự kiện            │   °C    │   °F    │    K    │");
    println!("├────────────────────┼─────────┼─────────┼─────────┤");

    for (name, celsius) in reference_temps {
        let temp = Temperature::new(celsius, TemperatureUnit::Celsius).unwrap();
        println!(
            "│ {:18} │ {:>7.2} │ {:>7.2} │ {:>7.2} │",
            name,
            celsius,
            temp.convert_to(TemperatureUnit::Fahrenheit),
            temp.convert_to(TemperatureUnit::Kelvin)
        );
    }

    println!("└────────────────────┴─────────┴─────────┴─────────┘");
}

fn compare_temperatures() {
    println!("\n🔍 So Sánh Hai Nhiệt Độ");

    println!("\n--- Nhiệt độ thứ nhất ---");
    let (value1, unit1) = match get_temperature_input() {
        Some(t) => t,
        None => return,
    };

    println!("\n--- Nhiệt độ thứ hai ---");
    let (value2, unit2) = match get_temperature_input() {
        Some(t) => t,
        None => return,
    };

    let temp1 = match Temperature::new(value1, unit1) {
        Ok(t) => t,
        Err(e) => {
            println!("⚠️  Nhiệt độ 1: {}", e);
            return;
        }
    };

    let temp2 = match Temperature::new(value2, unit2) {
        Ok(t) => t,
        Err(e) => {
            println!("⚠️  Nhiệt độ 2: {}", e);
            return;
        }
    };

    let celsius1 = temp1.to_celsius();
    let celsius2 = temp2.to_celsius();

    println!("\n📊 Kết quả so sánh:");
    println!("  Nhiệt độ 1: {:.2}°C", celsius1);
    println!("  Nhiệt độ 2: {:.2}°C", celsius2);

    if (celsius1 - celsius2).abs() < 0.01 {
        println!("  ➡️  Hai nhiệt độ bằng nhau!");
    } else if celsius1 > celsius2 {
        println!("  ➡️  Nhiệt độ 1 cao hơn {:.2}°C", celsius1 - celsius2);
    } else {
        println!("  ➡️  Nhiệt độ 2 cao hơn {:.2}°C", celsius2 - celsius1);
    }
}

fn get_temperature_input() -> Option<(f64, TemperatureUnit)> {
    println!("\nChọn đơn vị: 1=Celsius, 2=Fahrenheit, 3=Kelvin");
    let unit_choice = get_input("📝 Đơn vị: ");

    let unit = match unit_choice.trim() {
        "1" => TemperatureUnit::Celsius,
        "2" => TemperatureUnit::Fahrenheit,
        "3" => TemperatureUnit::Kelvin,
        _ => {
            println!("⚠️  Lựa chọn không hợp lệ!");
            return None;
        }
    };

    let value = match get_number("📝 Giá trị: ") {
        Some(v) => v,
        None => return None,
    };

    Some((value, unit))
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

fn get_number(prompt: &str) -> Option<f64> {
    let input = get_input(prompt);
    match input.trim().parse::<f64>() {
        Ok(n) => Some(n),
        Err(_) => {
            println!("⚠️  Vui lòng nhập số hợp lệ!");
            None
        }
    }
}
```

## 💡 Thông Tin Thú Vị

### Absolute Zero
- **-273.15°C** = **-459.67°F** = **0K**
- Nhiệt độ thấp nhất có thể có trong vũ trụ!

### Nhiệt Độ Cơ Thể
- **Người**: 37°C (98.6°F)
- **Chim**: 40-42°C
- **Chó, mèo**: 38-39°C

### Kỷ Lục Thế Giới
- **Nóng nhất**: 56.7°C (Death Valley, USA, 1913)
- **Lạnh nhất**: -89.2°C (Nam Cực, 1983)

## 🐛 Lỗi Thường Gặp

### Lỗi 1: Kelvin Âm

```rust
// ❌ SAI: Không kiểm tra
if matches!(unit, TemperatureUnit::Kelvin) && value < 0.0 {
    return Err("Kelvin không thể âm!");
}
```

### Lỗi 2: Công Thức Sai

```rust
// ❌ SAI
celsius * 9 / 5 + 32  // Integer division!

// ✅ ĐÚNG
celsius * 9.0 / 5.0 + 32.0
```

## 💪 Thử Thách

### Thử Thách 1: Thêm Rankine
Thêm đơn vị Rankine (°R) - dùng trong kỹ thuật

### Thử Thách 2: Lưu Lịch Sử
Lưu các phép chuyển đổi đã thực hiện

### Thử Thách 3: GUI
Tạo giao diện đồ họa với crate `iced` hoặc `egui`

## 📚 Kiến Thức Đã Học

✅ **Enums**: Định nghĩa types với variants
✅ **Impl Blocks**: Methods cho struct và enum
✅ **Result**: Error handling với custom messages
✅ **Pattern Matching**: `matches!` macro
✅ **Formatting**: Format số với độ chính xác
✅ **Validation**: Kiểm tra input hợp lệ

## 🎯 Bước Tiếp Theo

➡️ [FizzBuzz Challenge](fizzbuzz.md) - Thử thách kinh điển!

---

🎉 **Tuyệt vời! Bạn đã master temperature conversion!** 🌡️
