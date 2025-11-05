---
sidebar_position: 3
title: "Lặp Lại Công Việc: loop"
description: "Học cách lặp lại công việc với loop trong Rust. Hiểu break, continue, và cách trả về giá trị từ loop!"
keywords: [rust loop, rust infinite loop, rust break continue, rust loop label, rust loop return value]
---

# 🔄 Lặp Lại Công Việc: loop

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Biết cách dùng `loop` để lặp vô hạn
- ✅ Sử dụng `break` để thoát loop và `continue` để bỏ qua
- ✅ Trả về giá trị từ loop với `break value`
- ✅ Dùng labels cho nested loops (loop lồng nhau)
:::

---

## 🤔 Tại Sao Cần Loops?

Hãy tưởng tượng bạn đang làm việc trên công trường với **đồ bảo hộ an toàn** (Rust):

- **Kiểm tra thiết bị** mỗi giờ → Lặp lại công việc
- **Đo nhiệt độ** liên tục → Lặp cho đến khi quá nóng
- **Xử lý từng viên gạch** → Lặp qua danh sách

Trong lập trình, chúng ta cần **lặp lại công việc** rất nhiều!

---

## 📝 Loop Cơ Bản

`loop` tạo ra một **vòng lặp vô hạn** - chạy mãi mãi cho đến khi gặp `break`.

### Cú Pháp

```rust
loop {
    // Code lặp lại mãi mãi
}
```

### Ví Dụ Đơn Giản

```rust
fn main() {
    let mut dem = 0;

    loop {
        println!("Lần thứ {}", dem);
        dem += 1;

        if dem >= 5 {
            break;  // ✅ Thoát loop
        }
    }

    println!("Xong!");
}
```

**Kết quả:**
```
Lần thứ 0
Lần thứ 1
Lần thứ 2
Lần thứ 3
Lần thứ 4
Xong!
```

**Giải thích:**
1. `loop` → Bắt đầu vòng lặp vô hạn
2. In giá trị `dem`
3. Tăng `dem` lên 1
4. Nếu `dem >= 5` → `break` (thoát loop)
5. Quay lại bước 2 (nếu chưa break)

:::caution Cảnh Báo Vòng Lặp Vô Hạn
Nếu không có `break`, loop sẽ chạy **mãi mãi**!

```rust
// ❌ Nguy hiểm - Infinite loop!
loop {
    println!("Chạy mãi mãi...");
    // Không có break → Treo chương trình!
}
```

Để dừng chương trình bị treo: Nhấn `Ctrl + C` trong terminal.
:::

---

## 🛑 Break: Thoát Loop

`break` dùng để **thoát khỏi loop** ngay lập tức.

### Ví Dụ: Tìm Số Chẵn Đầu Tiên

```rust
fn main() {
    let mut so = 1;

    loop {
        if so % 2 == 0 {
            println!("Số chẵn đầu tiên: {}", so);
            break;  // ✅ Thoát ngay
        }

        so += 1;
    }
}
```

**Kết quả:**
```
Số chẵn đầu tiên: 2
```

---

## ⏭️ Continue: Bỏ Qua Lần Lặp Hiện Tại

`continue` dùng để **bỏ qua** phần còn lại của lần lặp và **chuyển sang lần lặp tiếp theo**.

### Ví Dụ: Chỉ In Số Chẵn

```rust
fn main() {
    let mut so = 0;

    loop {
        so += 1;

        if so > 10 {
            break;  // Dừng khi > 10
        }

        if so % 2 != 0 {
            continue;  // ⏭️ Bỏ qua số lẻ
        }

        println!("{} là số chẵn", so);
    }
}
```

**Kết quả:**
```
2 là số chẵn
4 là số chẵn
6 là số chẵn
8 là số chẵn
10 là số chẵn
```

**Giải thích:**
1. `so = 1` → Lẻ → `continue` (bỏ qua `println!`)
2. `so = 2` → Chẵn → In "2 là số chẵn"
3. `so = 3` → Lẻ → `continue`
4. Và cứ tiếp tục...

---

## 💡 Trả Về Giá Trị Từ Loop

Điểm **đặc biệt** của Rust: Loop có thể **trả về giá trị** với `break value`!

### Cú Pháp

```rust
let ket_qua = loop {
    // Code lặp
    break giá_trị;  // ✅ Trả về giá trị
};
```

### Ví Dụ: Đếm Đến 5

```rust
fn main() {
    let mut dem = 0;

    let ket_qua = loop {
        dem += 1;

        if dem == 5 {
            break dem * 10;  // ✅ Trả về 50
        }
    };

    println!("Kết quả: {}", ket_qua);
}
```

**Kết quả:**
```
Kết quả: 50
```

**Giải thích:**
- `break dem * 10` → Thoát loop VÀ trả về `50`
- Gán vào biến `ket_qua`

### Ví Dụ Thực Tế: Tìm Số Chia Hết

```rust
fn main() {
    let mut so = 10;

    let so_chia_het = loop {
        if so % 7 == 0 {
            break so;  // ✅ Trả về số chia hết cho 7
        }
        so += 1;
    };

    println!("Số nhỏ nhất >= 10 và chia hết cho 7: {}", so_chia_het);
}
```

**Kết quả:**
```
Số nhỏ nhất >= 10 và chia hết cho 7: 14
```

---

## 🏷️ Loop Labels: Cho Loops Lồng Nhau

Khi có **loops lồng nhau**, dùng **labels** để xác định thoát loop nào.

### Cú Pháp

```rust
'label_name: loop {
    // Outer loop
    loop {
        // Inner loop
        break 'label_name;  // ✅ Thoát outer loop
    }
}
```

### Ví Dụ: Không Dùng Label

```rust
fn main() {
    let mut x = 0;

    loop {
        let mut y = 0;

        loop {
            println!("x={}, y={}", x, y);

            y += 1;
            if y >= 3 {
                break;  // ✅ Chỉ thoát inner loop
            }
        }

        x += 1;
        if x >= 2 {
            break;  // ✅ Thoát outer loop
        }
    }
}
```

**Kết quả:**
```
x=0, y=0
x=0, y=1
x=0, y=2
x=1, y=0
x=1, y=1
x=1, y=2
```

### Ví Dụ: Dùng Label Để Thoát Sớm

```rust
fn main() {
    let mut x = 0;

    'outer: loop {
        let mut y = 0;

        loop {
            println!("x={}, y={}", x, y);

            if y == 1 && x == 1 {
                break 'outer;  // ✅ Thoát luôn outer loop!
            }

            y += 1;
            if y >= 3 {
                break;
            }
        }

        x += 1;
        if x >= 3 {
            break;
        }
    }

    println!("Thoát sớm!");
}
```

**Kết quả:**
```
x=0, y=0
x=0, y=1
x=0, y=2
x=1, y=0
x=1, y=1
Thoát sớm!
```

**Giải thích:**
- `'outer:` → Đặt tên cho outer loop
- `break 'outer;` → Thoát outer loop (không chỉ inner loop)

:::tip Mẹo Đặt Tên Label
Labels thường được đặt tên theo mục đích:
- `'outer` - Loop ngoài
- `'inner` - Loop trong
- `'search` - Loop tìm kiếm
- `'process` - Loop xử lý

```rust
'search: loop {
    // Tìm kiếm
    if found {
        break 'search;  // ✅ Rõ ràng!
    }
}
```
:::

---

## 🎮 Ví Dụ Thực Tế: Game Đoán Số

```rust
use std::io;

fn main() {
    let so_bi_mat = 7;
    let mut so_lan_doan = 0;

    println!("🎮 Trò chơi đoán số (1-10)!");

    loop {
        println!("\nNhập số của bạn:");

        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("Lỗi đọc input");

        let so_doan: i32 = match input.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("❌ Vui lòng nhập số!");
                continue;  // ⏭️ Bỏ qua, nhập lại
            }
        };

        so_lan_doan += 1;

        if so_doan < so_bi_mat {
            println!("📈 Số bạn đoán nhỏ quá!");
        } else if so_doan > so_bi_mat {
            println!("📉 Số bạn đoán lớn quá!");
        } else {
            println!("🎉 Chính xác! Bạn đoán đúng sau {} lần!", so_lan_doan);
            break;  // ✅ Thắng rồi, thoát!
        }
    }
}
```

**Ví dụ chạy:**
```
🎮 Trò chơi đoán số (1-10)!

Nhập số của bạn:
5
📈 Số bạn đoán nhỏ quá!

Nhập số của bạn:
8
📉 Số bạn đoán lớn quá!

Nhập số của bạn:
7
🎉 Chính xác! Bạn đoán đúng sau 3 lần!
```

---

## 🧮 Ví Dụ: Tính Tổng Đến Khi Đủ

```rust
fn main() {
    let mut tong = 0;
    let mut so = 1;

    let ket_qua = loop {
        tong += so;
        println!("Tổng hiện tại: {}", tong);

        if tong >= 50 {
            break tong;  // ✅ Trả về tổng
        }

        so += 1;
    };

    println!("\nĐã đạt tổng >= 50: {}", ket_qua);
}
```

**Kết quả:**
```
Tổng hiện tại: 1
Tổng hiện tại: 3
Tổng hiện tại: 6
Tổng hiện tại: 10
Tổng hiện tại: 15
Tổng hiện tại: 21
Tổng hiện tại: 28
Tổng hiện tại: 36
Tổng hiện tại: 45
Tổng hiện tại: 55

Đã đạt tổng >= 50: 55
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Quên Break - Infinite Loop

```rust
// ❌ Lỗi - Chạy mãi mãi!
let mut x = 0;
loop {
    println!("x = {}", x);
    x += 1;
    // Không có break → Infinite loop!
}
```

**Sửa:**
```rust
let mut x = 0;
loop {
    println!("x = {}", x);
    x += 1;

    if x >= 5 {
        break;  // ✅ Thêm break
    }
}
```

### 2. Break Trả Về Kiểu Sai

```rust
// ❌ Lỗi - Kiểu không khớp
let ket_qua: i32 = loop {
    break "text";  // &str, không phải i32
};

// ✅ Đúng
let ket_qua: i32 = loop {
    break 42;  // i32
};
```

### 3. Continue Sau Code Không Chạy Được

```rust
loop {
    if dieu_kien {
        continue;
    }

    println!("Dòng này có thể bị bỏ qua");  // ⚠️ Không chạy nếu continue
}
```

### 4. Label Sai Tên

```rust
'outer: loop {
    loop {
        break 'inner;  // ❌ Lỗi - Không có label 'inner
    }
}

// ✅ Đúng
'outer: loop {
    'inner: loop {
        break 'inner;
    }
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Đếm Ngược

Viết chương trình đếm ngược từ 10 về 1, sau đó in "🚀 Phóng!"

```rust
fn main() {
    let mut dem = 10;

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let mut dem = 10;

    loop {
        println!("{}", dem);
        dem -= 1;

        if dem == 0 {
            break;
        }
    }

    println!("🚀 Phóng!");
}
```

**Kết quả:**
```
10
9
8
7
6
5
4
3
2
1
🚀 Phóng!
```
</details>

---

### Bài 2: Tìm Số Fibonacci

Viết chương trình tìm số Fibonacci đầu tiên lớn hơn 100.

```rust
fn main() {
    let mut a = 0;
    let mut b = 1;

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let mut a = 0;
    let mut b = 1;

    let ket_qua = loop {
        let tiep_theo = a + b;

        if tiep_theo > 100 {
            break tiep_theo;  // ✅ Trả về số > 100
        }

        a = b;
        b = tiep_theo;
    };

    println!("Số Fibonacci đầu tiên > 100: {}", ket_qua);
}
```

**Kết quả:**
```
Số Fibonacci đầu tiên > 100: 144
```

**Giải thích:** Dãy Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...
</details>

---

### Bài 3: Tổng Các Số Chia Hết Cho 3

Viết chương trình tính tổng các số từ 1-50 mà chia hết cho 3, dùng `continue` để bỏ qua số không chia hết.

```rust
fn main() {
    let mut so = 0;
    let mut tong = 0;

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let mut so = 0;
    let mut tong = 0;

    loop {
        so += 1;

        if so > 50 {
            break;
        }

        if so % 3 != 0 {
            continue;  // ⏭️ Bỏ qua số không chia hết cho 3
        }

        tong += so;
    }

    println!("Tổng các số chia hết cho 3 (1-50): {}", tong);
}
```

**Kết quả:**
```
Tổng các số chia hết cho 3 (1-50): 408
```

**Giải thích:** 3 + 6 + 9 + 12 + ... + 48 = 408
</details>

---

## 📝 Tóm Tắt

| Khái Niệm | Cú Pháp | Mục Đích |
|-----------|---------|----------|
| `loop` | `loop { }` | Vòng lặp vô hạn |
| `break` | `break;` | Thoát loop |
| `break value` | `break giá_trị;` | Thoát và trả về giá trị |
| `continue` | `continue;` | Bỏ qua lần lặp hiện tại |
| Loop label | `'name: loop { }` | Đặt tên cho loop |
| Break label | `break 'name;` | Thoát loop có tên |

**Điểm Quan Trọng:**
- ✅ `loop` tạo vòng lặp **vô hạn** (cần `break` để thoát)
- ✅ `break` có thể **trả về giá trị**
- ✅ `continue` **bỏ qua** phần còn lại, chuyển sang lần lặp tiếp theo
- ✅ Dùng **labels** cho loops lồng nhau

---

## 🎯 Khi Nào Dùng Loop?

### Dùng `loop` khi:
- ✅ Không biết trước **bao nhiêu lần lặp**
- ✅ Lặp **cho đến khi** điều kiện nào đó xảy ra
- ✅ Cần **trả về giá trị** từ loop

### Ví Dụ:
- Game loop (chạy đến khi người chơi thoát)
- Đọc input (đến khi input hợp lệ)
- Tìm kiếm (đến khi tìm thấy)

---

## 🎯 Bước Tiếp Theo

Bạn đã biết `loop` rồi! Nhưng nếu có **điều kiện cụ thể** để lặp, có cách ngắn gọn hơn.

Bài tiếp theo, chúng ta sẽ học **`while`** - lặp khi điều kiện đúng! 🔄

➡️ **Tiếp theo**: [While: Lặp Khi Điều Kiện Đúng](while-loop)
