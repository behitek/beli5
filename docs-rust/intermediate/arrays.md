---
sidebar_position: 6
title: "Mảng: Danh Sách Có Độ Dài Cố Định"
description: "Học cách sử dụng arrays trong Rust - lưu trữ nhiều giá trị cùng kiểu với độ dài cố định. Hiểu về truy cập, slicing và khi nào dùng arrays!"
keywords: [rust array, rust fixed size array, rust array slice, rust array methods, rust mảng]
---

# 📦 Mảng: Danh Sách Có Độ Dài Cố Định

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Biết cách khai báo và khởi tạo arrays
- ✅ Truy cập và thay đổi phần tử trong array
- ✅ Hiểu về array slices
- ✅ Biết khi nào dùng array vs vector
:::

---

## 🤔 Tại Sao Cần Arrays?

Giả sử bạn muốn lưu **điểm 5 môn học**:

```rust
// ❌ Cách tệ - Nhiều biến
let diem_mon1 = 85;
let diem_mon2 = 90;
let diem_mon3 = 78;
let diem_mon4 = 92;
let diem_mon5 = 88;
```

**Vấn đề:**
- ❌ Quá nhiều biến riêng lẻ
- ❌ Khó quản lý và xử lý
- ❌ Không thể lặp qua dễ dàng

**Giải pháp:** Dùng **Array**! 📦

```rust
// ✅ Tốt hơn - Một array
let diem = [85, 90, 78, 92, 88];
```

---

## 📝 Array Là Gì?

**Array** (mảng) là một **collection** chứa nhiều giá trị:

- **Cùng kiểu dữ liệu** (tất cả i32, hoặc tất cả &str, ...)
- **Độ dài cố định** (không thay đổi sau khi tạo)
- Lưu trên **stack** (nhanh!)

:::info Ẩn Dụ
Hãy tưởng tượng **array** như **một hàng tủ đồ bảo hộ cố định**:

- 🏷️ **Tủ 1**: Mũ bảo hiểm
- 🏷️ **Tủ 2**: Găng tay
- 🏷️ **Tủ 3**: Giày an toàn
- 🏷️ **Tủ 4**: Kính bảo hộ
- 🏷️ **Tủ 5**: Áo phản quang

**Đặc điểm:**
- Số lượng tủ **cố định** (5 cái)
- Mỗi tủ chỉ chứa **một loại đồ** (cùng kiểu)
- Không thể thêm/bớt tủ sau khi xây! 🛡️
:::

---

## 📝 Khai Báo Array

### Cú Pháp 1: Liệt Kê Giá Trị

```rust
let tên_array: [kiểu; độ_dài] = [giá_trị1, giá_trị2, ...];
```

### Ví Dụ

```rust
fn main() {
    let so: [i32; 5] = [10, 20, 30, 40, 50];
    println!("Array: {:?}", so);
}
```

**Kết quả:**
```
Array: [10, 20, 30, 40, 50]
```

**Giải thích:**
- `[i32; 5]` → Array chứa 5 phần tử kiểu i32
- `[10, 20, 30, 40, 50]` → Các giá trị

### Cú Pháp 2: Giá Trị Giống Nhau

```rust
let tên_array = [giá_trị; số_lượng];
```

```rust
fn main() {
    let zeros = [0; 5];  // [0, 0, 0, 0, 0]
    println!("Zeros: {:?}", zeros);
}
```

**Kết quả:**
```
Zeros: [0, 0, 0, 0, 0]
```

---

## 🔍 Truy Cập Phần Tử

Dùng **index** (chỉ số) để truy cập phần tử. Index **bắt đầu từ 0**!

```rust
fn main() {
    let mon_hoc = ["Toán", "Lý", "Hóa", "Sinh", "Anh"];

    println!("Môn đầu tiên: {}", mon_hoc[0]);  // Index 0
    println!("Môn thứ hai: {}", mon_hoc[1]);   // Index 1
    println!("Môn cuối: {}", mon_hoc[4]);      // Index 4
}
```

**Kết quả:**
```
Môn đầu tiên: Toán
Môn thứ hai: Lý
Môn cuối: Anh
```

**Lưu ý:** Index từ **0 đến n-1** (với n là độ dài array)

```
Array:  ["Toán", "Lý", "Hóa", "Sinh", "Anh"]
Index:     0      1     2      3       4
```

---

## ✏️ Thay Đổi Phần Tử

Dùng `mut` để array có thể thay đổi:

```rust
fn main() {
    let mut diem = [75, 82, 90, 68, 95];

    println!("Trước: {:?}", diem);

    diem[1] = 85;  // Thay đổi phần tử thứ 2
    diem[3] = 72;  // Thay đổi phần tử thứ 4

    println!("Sau: {:?}", diem);
}
```

**Kết quả:**
```
Trước: [75, 82, 90, 68, 95]
Sau: [75, 85, 90, 72, 95]
```

---

## 📏 Độ Dài Array

Dùng `.len()` để lấy độ dài:

```rust
fn main() {
    let numbers = [10, 20, 30, 40, 50];

    println!("Độ dài array: {}", numbers.len());
    println!("Phần tử cuối: {}", numbers[numbers.len() - 1]);
}
```

**Kết quả:**
```
Độ dài array: 5
Phần tử cuối: 50
```

---

## 🔄 Lặp Qua Array

### Cách 1: For Loop Đơn Giản

```rust
fn main() {
    let fruits = ["Táo", "Cam", "Chuối", "Xoài"];

    for fruit in fruits {
        println!("🍎 {}", fruit);
    }
}
```

**Kết quả:**
```
🍎 Táo
🍎 Cam
🍎 Chuối
🍎 Xoài
```

### Cách 2: Với Index

```rust
fn main() {
    let diem = [85, 92, 78, 95, 88];

    for i in 0..diem.len() {
        println!("Môn {} - Điểm: {}", i + 1, diem[i]);
    }
}
```

**Kết quả:**
```
Môn 1 - Điểm: 85
Môn 2 - Điểm: 92
Môn 3 - Điểm: 78
Môn 4 - Điểm: 95
Môn 5 - Điểm: 88
```

### Cách 3: Với Enumerate

```rust
fn main() {
    let colors = ["Đỏ", "Xanh", "Vàng"];

    for (index, color) in colors.iter().enumerate() {
        println!("Màu {} - {}", index + 1, color);
    }
}
```

**Kết quả:**
```
Màu 1 - Đỏ
Màu 2 - Xanh
Màu 3 - Vàng
```

---

## 🔪 Array Slices

**Slice** là một "lát cắt" của array - tham chiếu đến một phần của array.

### Cú Pháp

```rust
let slice = &array[start..end];
```

### Ví Dụ

```rust
fn main() {
    let numbers = [10, 20, 30, 40, 50];

    let slice1 = &numbers[1..4];  // Index 1-3 (không bao gồm 4)
    let slice2 = &numbers[..3];   // Từ đầu đến index 2
    let slice3 = &numbers[2..];   // Từ index 2 đến cuối
    let slice4 = &numbers[..];    // Toàn bộ array

    println!("Slice 1: {:?}", slice1);  // [20, 30, 40]
    println!("Slice 2: {:?}", slice2);  // [10, 20, 30]
    println!("Slice 3: {:?}", slice3);  // [30, 40, 50]
    println!("Slice 4: {:?}", slice4);  // [10, 20, 30, 40, 50]
}
```

**Kết quả:**
```
Slice 1: [20, 30, 40]
Slice 2: [10, 20, 30]
Slice 3: [30, 40, 50]
Slice 4: [10, 20, 30, 40, 50]
```

:::tip Mẹo Nhớ
- `a..b` → Từ a đến b-1
- `..b` → Từ đầu đến b-1
- `a..` → Từ a đến cuối
- `..` → Toàn bộ

```rust
let arr = [1, 2, 3, 4, 5];
//         0  1  2  3  4  (index)

&arr[1..4]  // [2, 3, 4]
&arr[..3]   // [1, 2, 3]
&arr[2..]   // [3, 4, 5]
&arr[..]    // [1, 2, 3, 4, 5]
```
:::

---

## 🎮 Ví Dụ Thực Tế: Tính Điểm Trung Bình

```rust
fn main() {
    let diem_thi = [85, 92, 78, 95, 88];
    let mut tong = 0;

    println!("📊 Điểm các môn:");
    for (i, &diem) in diem_thi.iter().enumerate() {
        println!("Môn {}: {}", i + 1, diem);
        tong += diem;
    }

    let trung_binh = tong as f64 / diem_thi.len() as f64;
    println!("\n📈 Điểm trung bình: {:.2}", trung_binh);

    if trung_binh >= 80.0 {
        println!("🎉 Học lực: Giỏi!");
    } else if trung_binh >= 65.0 {
        println!("😊 Học lực: Khá!");
    } else {
        println!("😐 Học lực: Trung bình!");
    }
}
```

**Kết quả:**
```
📊 Điểm các môn:
Môn 1: 85
Môn 2: 92
Môn 3: 78
Môn 4: 95
Môn 5: 88

📈 Điểm trung bình: 87.60
🎉 Học lực: Giỏi!
```

---

## 🔍 Ví Dụ: Tìm Số Lớn Nhất và Nhỏ Nhất

```rust
fn main() {
    let so_lieu = [45, 23, 67, 12, 89, 34, 56];

    let mut max = so_lieu[0];
    let mut min = so_lieu[0];

    for &so in so_lieu.iter() {
        if so > max {
            max = so;
        }
        if so < min {
            min = so;
        }
    }

    println!("📊 Số liệu: {:?}", so_lieu);
    println!("📈 Số lớn nhất: {}", max);
    println!("📉 Số nhỏ nhất: {}", min);
    println!("📊 Chênh lệch: {}", max - min);
}
```

**Kết quả:**
```
📊 Số liệu: [45, 23, 67, 12, 89, 34, 56]
📈 Số lớn nhất: 89
📉 Số nhỏ nhất: 12
📊 Chênh lệch: 77
```

---

## 🔄 Ví Dụ: Đảo Ngược Array

```rust
fn main() {
    let mut arr = [1, 2, 3, 4, 5];

    println!("Trước: {:?}", arr);

    // Đảo ngược bằng cách hoán đổi
    let len = arr.len();
    for i in 0..len / 2 {
        let temp = arr[i];
        arr[i] = arr[len - 1 - i];
        arr[len - 1 - i] = temp;
    }

    println!("Sau: {:?}", arr);
}
```

**Kết quả:**
```
Trước: [1, 2, 3, 4, 5]
Sau: [5, 4, 3, 2, 1]
```

---

## 🔢 Array Đa Chiều (Multidimensional)

Array có thể chứa array khác:

```rust
fn main() {
    let bang = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];

    println!("Bảng 3x3:");
    for hang in bang.iter() {
        for &so in hang.iter() {
            print!("{:3}", so);
        }
        println!();
    }
}
```

**Kết quả:**
```
Bảng 3x3:
  1  2  3
  4  5  6
  7  8  9
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Index Ngoài Phạm Vi

```rust
fn main() {
    let arr = [10, 20, 30];

    // ❌ Panic! Index 5 không tồn tại
    // println!("{}", arr[5]);
}
```

**Lỗi runtime:**
```
thread 'main' panicked at 'index out of bounds: the len is 3 but the index is 5'
```

**Sửa:** Dùng `.get()` để truy cập an toàn:

```rust
fn main() {
    let arr = [10, 20, 30];

    match arr.get(5) {
        Some(value) => println!("Giá trị: {}", value),
        None => println!("Index không tồn tại!"),
    }
}
```

**Kết quả:**
```
Index không tồn tại!
```

### 2. Quên Mut Khi Thay Đổi

```rust
fn main() {
    let arr = [1, 2, 3];
    // ❌ Lỗi - arr không phải mut
    // arr[0] = 10;

    // ✅ Đúng
    let mut arr = [1, 2, 3];
    arr[0] = 10;
    println!("{:?}", arr);
}
```

### 3. Kiểu Dữ Liệu Không Khớp

```rust
fn main() {
    // ❌ Lỗi - Không thể trộn kiểu
    // let arr = [1, 2, "ba"];

    // ✅ Đúng - Cùng kiểu
    let arr = [1, 2, 3];
}
```

### 4. Độ Dài Không Khớp

```rust
fn main() {
    // ❌ Lỗi - Khai báo 3, nhưng chỉ có 2 giá trị
    // let arr: [i32; 3] = [1, 2];

    // ✅ Đúng
    let arr: [i32; 3] = [1, 2, 3];
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Đếm Số Chẵn

Viết chương trình đếm số lượng số chẵn trong array.

```rust
fn main() {
    let numbers = [12, 5, 8, 19, 24, 7, 36];

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let numbers = [12, 5, 8, 19, 24, 7, 36];
    let mut dem_chan = 0;

    for &so in numbers.iter() {
        if so % 2 == 0 {
            dem_chan += 1;
        }
    }

    println!("Mảng: {:?}", numbers);
    println!("Số lượng số chẵn: {}", dem_chan);
}
```

**Kết quả:**
```
Mảng: [12, 5, 8, 19, 24, 7, 36]
Số lượng số chẵn: 4
```
</details>

---

### Bài 2: Tính Tổng Các Phần Tử

Viết chương trình tính tổng tất cả phần tử trong array.

```rust
fn main() {
    let values = [10, 25, 30, 15, 20];

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let values = [10, 25, 30, 15, 20];
    let mut tong = 0;

    for &val in values.iter() {
        tong += val;
    }

    println!("Mảng: {:?}", values);
    println!("Tổng: {}", tong);
}
```

**Kết quả:**
```
Mảng: [10, 25, 30, 15, 20]
Tổng: 100
```
</details>

---

### Bài 3: Nhân Đôi Tất Cả Phần Tử

Viết chương trình nhân đôi tất cả phần tử trong array.

```rust
fn main() {
    let mut arr = [5, 10, 15, 20, 25];

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let mut arr = [5, 10, 15, 20, 25];

    println!("Trước: {:?}", arr);

    for i in 0..arr.len() {
        arr[i] *= 2;
    }

    println!("Sau: {:?}", arr);
}
```

**Hoặc dùng iter_mut:**

```rust
fn main() {
    let mut arr = [5, 10, 15, 20, 25];

    println!("Trước: {:?}", arr);

    for val in arr.iter_mut() {
        *val *= 2;
    }

    println!("Sau: {:?}", arr);
}
```

**Kết quả:**
```
Trước: [5, 10, 15, 20, 25]
Sau: [10, 20, 30, 40, 50]
```
</details>

---

## 📝 Tóm Tắt

| Khái Niệm | Cú Pháp | Mô Tả |
|-----------|---------|-------|
| Khai báo | `[i32; 5]` | Array 5 phần tử kiểu i32 |
| Khởi tạo | `[1, 2, 3, 4, 5]` | Liệt kê giá trị |
| Giống nhau | `[0; 5]` | 5 phần tử giá trị 0 |
| Truy cập | `arr[0]` | Phần tử đầu tiên |
| Độ dài | `.len()` | Số phần tử |
| Slice | `&arr[1..4]` | Phần từ index 1-3 |
| Lặp | `for item in arr` | Lặp qua array |

**Điểm Quan Trọng:**
- ✅ Độ dài **cố định** (không thay đổi)
- ✅ **Cùng kiểu** dữ liệu
- ✅ Lưu trên **stack** (nhanh)
- ✅ Index bắt đầu từ **0**
- ✅ Truy cập ngoài phạm vi → **panic**

---

## 🎯 Ưu và Nhược Điểm

### ✅ Ưu Điểm

- **Nhanh**: Lưu trên stack
- **An toàn**: Rust kiểm tra bounds tại compile time (khi có thể)
- **Hiệu quả**: Không có overhead
- **Đơn giản**: Dễ hiểu, dễ dùng

### ❌ Nhược Điểm

- **Độ dài cố định**: Không thể thay đổi kích thước
- **Phải biết trước kích thước**: Khai báo lúc compile time
- **Không linh hoạt**: Không thể push/pop

:::tip Khi Nào Dùng Array?

**Dùng Array khi:**
- ✅ Biết trước **số lượng phần tử** (cố định)
- ✅ Cần **hiệu suất tối đa** (stack allocation)
- ✅ Số lượng **nhỏ** (vài chục phần tử)

**Ví dụ:**
- Ngày trong tuần (7 ngày)
- Tháng trong năm (12 tháng)
- Điểm 5 môn học
- RGB colors (3 giá trị)

**Không dùng Array khi:**
- ❌ Không biết trước số lượng
- ❌ Cần thêm/xóa phần tử thường xuyên
- ❌ Kích thước thay đổi linh hoạt

→ Dùng **Vector** thay thế! (Bài tiếp theo)
:::

---

## 🎯 Bước Tiếp Theo

Bạn đã hiểu Arrays rồi! Nhưng nếu cần **độ dài thay đổi được**, thì sao?

Bài tiếp theo, chúng ta sẽ học **Vector** - mảng linh hoạt có thể thêm/xóa phần tử! 🚀

➡️ **Tiếp theo**: [Vector: Danh Sách Có Thể Mở Rộng](vectors)
