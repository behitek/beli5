---
sidebar_position: 11
title: Boolean và Logic Operators
description: Học về boolean logic, comparison operators, và logical operators trong Rust
keywords: [rust, boolean, logic, operators, comparison, AND, OR, NOT, if, conditions, eli5]
---

# ✅ Boolean và Logic Operators

## Giới Thiệu

**Boolean logic** là nền tảng của mọi quyết định trong programming. Mỗi điều kiện cuối cùng đều trả về `true` hoặc `false`.

:::tip Giải Thích Cho Bạn 5 Tuổi
Boolean logic giống như **trả lời câu hỏi có/không**:
- ❓ "Trời có mưa không?" → ✅ Có (true) / ❌ Không (false)
- ❓ "Bạn đói không?" → ✅ Có / ❌ Không
- ❓ "Tuổi >= 18?" → ✅ Đúng / ❌ Sai

Máy tính chỉ hiểu **2 trạng thái**: Đúng hoặc Sai! 🎭

**Logic operators** giống như **câu hỏi kép**:
- 🍕 "Bạn có đói **VÀ** có tiền?" → Cả hai đều phải đúng!
- ☔ "Trời mưa **HOẶC** nắng?" → Một trong hai đúng!
- 🚫 "**KHÔNG** phải ban ngày?" → Đảo ngược!
:::

## ✅ Boolean Type

### Hai Giá Trị

```rust
fn main() {
    let is_raining = true;
    let is_sunny = false;

    println!("Trời mưa: {}", is_raining);
    println!("Trời nắng: {}", is_sunny);
}
```

**Kết quả:**
```
Trời mưa: true
Trời nắng: false
```

### Từ Biểu Thức

```rust
fn main() {
    let age = 20;
    let is_adult = age >= 18;  // Boolean từ comparison

    println!("Là người lớn: {}", is_adult);
}
```

## 🔍 Comparison Operators (So Sánh)

### Equal `==` và Not Equal `!=`

```rust
fn main() {
    let a = 10;
    let b = 20;
    let c = 10;

    println!("{} == {} : {}", a, b, a == b);  // false
    println!("{} == {} : {}", a, c, a == c);  // true
    println!("{} != {} : {}", a, b, a != b);  // true
}
```

**Kết quả:**
```
10 == 20 : false
10 == 10 : true
10 != 20 : true
```

### Greater Than `>` và Less Than `<`

```rust
fn main() {
    let score = 85;

    println!("{} > 90: {}", score, score > 90);   // false
    println!("{} < 90: {}", score, score < 90);   // true
    println!("{} >= 85: {}", score, score >= 85); // true
    println!("{} <= 85: {}", score, score <= 85); // true
}
```

**Kết quả:**
```
85 > 90: false
85 < 90: true
85 >= 85: true
85 <= 85: true
```

### Bảng Tổng Hợp

| Operator | Ý nghĩa | Ví dụ | Kết quả |
|----------|---------|-------|---------|
| `==` | Bằng | `5 == 5` | `true` |
| `!=` | Không bằng | `5 != 3` | `true` |
| `>` | Lớn hơn | `5 > 3` | `true` |
| `<` | Nhỏ hơn | `5 < 3` | `false` |
| `>=` | Lớn hơn hoặc bằng | `5 >= 5` | `true` |
| `<=` | Nhỏ hơn hoặc bằng | `5 <= 3` | `false` |

### So Sánh Strings

```rust
fn main() {
    let name1 = "An";
    let name2 = "Bình";
    let name3 = "An";

    println!("{} == {}: {}", name1, name2, name1 == name2);  // false
    println!("{} == {}: {}", name1, name3, name1 == name3);  // true
}
```

## 🔗 Logical AND `&&`

**Cả hai phải đúng** để kết quả là `true`.

### Syntax

```rust
condition1 && condition2
```

### Truth Table

| A | B | A && B |
|---|---|--------|
| true | true | **true** |
| true | false | false |
| false | true | false |
| false | false | false |

### Ví Dụ

```rust
fn main() {
    let age = 20;
    let has_id = true;

    // Cần cả tuổi >= 18 VÀ có ID
    let can_enter = age >= 18 && has_id;

    println!("Tuổi: {}", age);
    println!("Có ID: {}", has_id);
    println!("Được vào: {}", can_enter);
}
```

**Kết quả:**
```
Tuổi: 20
Có ID: true
Được vào: true
```

### Multiple Conditions

```rust
fn main() {
    let age = 25;
    let has_ticket = true;
    let has_money = true;

    let can_watch_movie = age >= 13 && has_ticket && has_money;

    println!("Có thể xem phim: {}", can_watch_movie);
}
```

## 🔀 Logical OR `||`

**Một trong các điều kiện đúng** là kết quả `true`.

### Syntax

```rust
condition1 || condition2
```

### Truth Table

| A | B | A \|\| B |
|---|---|----------|
| true | true | **true** |
| true | false | **true** |
| false | true | **true** |
| false | false | false |

### Ví Dụ

```rust
fn main() {
    let is_weekend = true;
    let is_holiday = false;

    // Cuối tuần HOẶC ngày lễ
    let can_rest = is_weekend || is_holiday;

    println!("Cuối tuần: {}", is_weekend);
    println!("Ngày lễ: {}", is_holiday);
    println!("Được nghỉ: {}", can_rest);
}
```

**Kết quả:**
```
Cuối tuần: true
Ngày lễ: false
Được nghỉ: true
```

### Multiple Conditions

```rust
fn main() {
    let payment_method = "card";

    let is_cash = payment_method == "cash";
    let is_card = payment_method == "card";
    let is_transfer = payment_method == "transfer";

    let can_pay = is_cash || is_card || is_transfer;

    println!("Có thể thanh toán: {}", can_pay);
}
```

## ❗ Logical NOT `!`

**Đảo ngược** giá trị boolean.

### Syntax

```rust
!condition
```

### Truth Table

| A | !A |
|---|-----|
| true | **false** |
| false | **true** |

### Ví Dụ

```rust
fn main() {
    let is_raining = false;
    let is_not_raining = !is_raining;

    println!("Trời mưa: {}", is_raining);
    println!("Trời không mưa: {}", is_not_raining);
}
```

**Kết quả:**
```
Trời mưa: false
Trời không mưa: true
```

### Với Biểu Thức

```rust
fn main() {
    let age = 15;
    let is_adult = age >= 18;
    let is_minor = !is_adult;

    println!("Tuổi: {}", age);
    println!("Là người lớn: {}", is_adult);
    println!("Là trẻ vị thành niên: {}", is_minor);
}
```

## 🎭 Kết Hợp Operators

### AND + OR

```rust
fn main() {
    let age = 16;
    let has_parent = true;
    let has_ticket = true;

    // (Trên 13 tuổi) HOẶC (có phụ huynh VÀ có vé)
    let can_watch = (age >= 13) || (has_parent && has_ticket);

    println!("Có thể xem phim: {}", can_watch);
}
```

### Thứ Tự Ưu Tiên

**Ưu tiên (cao → thấp):**
1. `!` - NOT
2. `&&` - AND
3. `||` - OR

```rust
fn main() {
    let a = true;
    let b = false;
    let c = true;

    // ! có ưu tiên cao nhất
    let result1 = !a && b;  // (!a) && b = false && false = false

    // && trước ||
    let result2 = a || b && c;  // a || (b && c) = true || false = true

    println!("!{} && {}: {}", a, b, result1);
    println!("{} || {} && {}: {}", a, b, c, result2);
}
```

**Khuyến nghị:** Dùng `()` để rõ ràng!

```rust
fn main() {
    // ✅ TỐT - Rõ ràng
    let result = (age >= 18) && (has_id || has_passport);

    // ❌ TỆ - Khó đọc
    let result = age >= 18 && has_id || has_passport;
}
```

## 🎯 Short-Circuit Evaluation

Rust đánh giá **lười biếng** (lazy evaluation).

### AND `&&`

Nếu điều kiện đầu **false**, không check điều kiện sau!

```rust
fn main() {
    let x = 5;

    // x < 10 = false → không check x > 0
    if x < 10 && x > 0 {
        println!("x trong khoảng (0, 10)");
    }

    // Hữu ích để tránh panic
    let numbers = vec![1, 2, 3];
    let index = 5;

    // Check index trước khi access!
    if index < numbers.len() && numbers[index] > 0 {
        println!("Số dương");
    } else {
        println!("Index không hợp lệ hoặc số không dương");
    }
}
```

### OR `||`

Nếu điều kiện đầu **true**, không check điều kiện sau!

```rust
fn main() {
    let is_admin = true;
    let is_owner = false;

    // is_admin = true → không check is_owner
    if is_admin || is_owner {
        println!("Có quyền truy cập");
    }
}
```

## 📋 Ví Dụ Thực Tế

### 1. Kiểm Tra Độ Tuổi

```rust
fn main() {
    let age = 17;

    if age < 13 {
        println!("Trẻ em");
    } else if age >= 13 && age < 18 {
        println!("Thiếu niên");
    } else if age >= 18 && age < 60 {
        println!("Người lớn");
    } else {
        println!("Người cao tuổi");
    }
}
```

### 2. Đăng Nhập

```rust
fn main() {
    let username = "admin";
    let password = "12345";
    let is_active = true;

    let correct_user = username == "admin";
    let correct_pass = password == "12345";

    if correct_user && correct_pass && is_active {
        println!("Đăng nhập thành công!");
    } else if !correct_user {
        println!("Sai tên đăng nhập!");
    } else if !correct_pass {
        println!("Sai mật khẩu!");
    } else {
        println!("Tài khoản bị khóa!");
    }
}
```

### 3. Giảm Giá

```rust
fn main() {
    let total = 1_200_000;
    let is_member = true;
    let is_holiday = false;

    let has_discount = (total >= 1_000_000) || is_member || is_holiday;

    if has_discount {
        let discount = if total >= 1_000_000 { 0.10 }
                      else if is_member { 0.05 }
                      else { 0.15 };

        let final_price = total as f64 * (1.0 - discount);
        println!("Giảm giá: {}%", (discount * 100.0) as i32);
        println!("Giá cuối: {:.0}đ", final_price);
    } else {
        println!("Không có giảm giá");
    }
}
```

### 4. Kiểm Tra Năm Nhuận

```rust
fn main() {
    let year = 2024;

    let is_leap_year = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);

    if is_leap_year {
        println!("{} là năm nhuận", year);
    } else {
        println!("{} không phải năm nhuận", year);
    }
}
```

## 🎯 Thực Hành

### Bài Tập 1: Kiểm Tra Số

Viết code kiểm tra số:
- Dương và chẵn
- Âm và lẻ
- Bằng 0

```rust
fn main() {
    let num = 10;

    // TODO: Check và in kết quả
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let num = 10;

    if num == 0 {
        println!("Số 0");
    } else if num > 0 && num % 2 == 0 {
        println!("Số dương chẵn");
    } else if num > 0 && num % 2 != 0 {
        println!("Số dương lẻ");
    } else if num < 0 && num % 2 == 0 {
        println!("Số âm chẵn");
    } else {
        println!("Số âm lẻ");
    }
}
```

</details>

### Bài Tập 2: Phân Loại Điểm

Phân loại học lực:
- Giỏi: >= 8.0
- Khá: 6.5 - 7.9
- Trung bình: 5.0 - 6.4
- Yếu: < 5.0

```rust
fn main() {
    let score = 7.5;

    // TODO: Phân loại
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let score = 7.5;

    if score >= 8.0 {
        println!("Giỏi");
    } else if score >= 6.5 && score < 8.0 {
        println!("Khá");
    } else if score >= 5.0 && score < 6.5 {
        println!("Trung bình");
    } else {
        println!("Yếu");
    }
}
```

</details>

### Bài Tập 3: Kiểm Tra Tam Giác

Kiểm tra 3 cạnh có tạo thành tam giác hợp lệ không:
- Cả 3 cạnh > 0
- Tổng 2 cạnh > cạnh còn lại

```rust
fn main() {
    let a = 3.0;
    let b = 4.0;
    let c = 5.0;

    // TODO: Kiểm tra
}
```

<details>
<summary>💡 Xem đáp án</summary>

```rust
fn main() {
    let a = 3.0;
    let b = 4.0;
    let c = 5.0;

    let all_positive = a > 0.0 && b > 0.0 && c > 0.0;
    let valid_sides = (a + b > c) && (a + c > b) && (b + c > a);

    if all_positive && valid_sides {
        println!("Tam giác hợp lệ!");

        // Bonus: Loại tam giác
        if a == b && b == c {
            println!("Tam giác đều");
        } else if a == b || b == c || a == c {
            println!("Tam giác cân");
        } else if a*a + b*b == c*c || a*a + c*c == b*b || b*b + c*c == a*a {
            println!("Tam giác vuông");
        } else {
            println!("Tam giác thường");
        }
    } else {
        println!("Không phải tam giác hợp lệ!");
    }
}
```

</details>

## 📚 Tóm Tắt

**Boolean:**
- `true` / `false`
- Kết quả từ comparisons

**Comparison operators:**
- `==` - Bằng
- `!=` - Không bằng
- `>`, `<` - Lớn hơn, nhỏ hơn
- `>=`, `<=` - Lớn hơn hoặc bằng, nhỏ hơn hoặc bằng

**Logical operators:**
- `&&` - AND (cả hai đúng)
- `||` - OR (một trong hai đúng)
- `!` - NOT (đảo ngược)

**Ưu tiên:**
1. `!` - NOT
2. `&&` - AND
3. `||` - OR

**Short-circuit:**
- `&&`: False đầu → không check tiếp
- `||`: True đầu → không check tiếp

**Best practices:**
- Dùng `()` để rõ ràng
- Viết điều kiện đơn giản
- Short-circuit cho performance

## 🚀 Bước Tiếp Theo

Bạn đã hiểu về boolean và logic! Tiếp theo, học cách nhận input từ người dùng:

➡️ **Tiếp theo**: [Nhận Input Từ Người Dùng](input-output)

---

:::tip Lời Khuyên Vàng
**"Boolean logic là trái tim của programming!"**

Mọi quyết định trong code đều dựa trên boolean:
- 🔀 If/else statements
- 🔄 While loops
- ✅ Validation
- 🔐 Authentication
- 🎮 Game logic

**Mẹo nhớ:**
- **AND** `&&`: **CẢ HAI** phải đúng (nghiêm ngặt hơn)
- **OR** `||`: **MỘT TRONG HAI** đúng (dễ dãi hơn)
- **NOT** `!`: **ĐẢO NGƯỢC** (trái ngược)

Thành thạo boolean = Viết code logic tốt! 🧠✨
:::

**Tiếp theo**: [Nhận Input Từ Người Dùng →](input-output)
