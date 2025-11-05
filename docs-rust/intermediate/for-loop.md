---
sidebar_position: 5
title: "For: Lặp Qua Dãy Số và Mảng"
description: "Học cách dùng for loop trong Rust - lặp qua ranges, arrays, vectors một cách an toàn và hiệu quả với iter(), enumerate()!"
keywords: [rust for loop, rust iterator, rust range, rust iter, rust enumerate, rust for each]
---

# 🔢 For: Lặp Qua Dãy Số và Mảng

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Biết cách dùng `for` để lặp qua ranges (`0..5`, `0..=5`)
- ✅ Lặp qua arrays và vectors an toàn
- ✅ Sử dụng `.iter()`, `.iter_mut()`, `.into_iter()`
- ✅ Dùng `.enumerate()` để lấy cả index và giá trị
:::

---

## 🤔 Vấn Đề Với While

Khi lặp qua **dãy số** hoặc **mảng**, `while` khá dài dòng:

```rust
fn main() {
    let danh_sach = [10, 20, 30, 40, 50];
    let mut i = 0;

    while i < danh_sach.len() {
        println!("Phần tử {}: {}", i, danh_sach[i]);
        i += 1;
    }
}
```

**Vấn đề:**
- ❌ Phải quản lý biến `i` thủ công
- ❌ Dễ quên tăng `i` → infinite loop
- ❌ Có thể truy cập ngoài phạm vi mảng → lỗi!

**Giải pháp:** Dùng `for`! 🎯

---

## 📝 For Loop Cơ Bản

`for` lặp qua **collection** (mảng, vector, range) một cách **an toàn**.

### Cú Pháp

```rust
for biến in collection {
    // Code lặp với mỗi phần tử
}
```

### Ví Dụ: Lặp Qua Mảng

```rust
fn main() {
    let danh_sach = [10, 20, 30, 40, 50];

    for phan_tu in danh_sach {
        println!("Giá trị: {}", phan_tu);
    }
}
```

**Kết quả:**
```
Giá trị: 10
Giá trị: 20
Giá trị: 30
Giá trị: 40
Giá trị: 50
```

**Giải thích:**
- `for phan_tu in danh_sach` → Lặp qua từng phần tử
- `phan_tu` tự động nhận giá trị của mỗi phần tử
- Không cần quản lý index!

:::info Ẩn Dụ
Hãy tưởng tượng **for** như **kiểm tra từng đồ bảo hộ trong kho**:

- Lấy **từng chiếc mũ** → Kiểm tra
- Lấy **từng đôi găng** → Kiểm tra
- Lấy **từng đôi giày** → Kiểm tra

Rust tự động duyệt qua **tất cả đồ** mà không cần bạn đếm! 🛡️
:::

---

## 🔢 For Với Ranges

### Range Không Bao Gồm Cuối: `start..end`

```rust
fn main() {
    for i in 0..5 {
        println!("i = {}", i);
    }
}
```

**Kết quả:**
```
i = 0
i = 1
i = 2
i = 3
i = 4
```

**Lưu ý:** `0..5` → Từ 0 đến 4 (**không bao gồm 5**)

### Range Bao Gồm Cuối: `start..=end`

```rust
fn main() {
    for i in 1..=5 {
        println!("i = {}", i);
    }
}
```

**Kết quả:**
```
i = 1
i = 2
i = 3
i = 4
i = 5
```

**Lưu ý:** `1..=5` → Từ 1 đến 5 (**bao gồm 5**)

### So Sánh

```rust
fn main() {
    println!("0..3:");
    for i in 0..3 {
        print!("{} ", i);  // 0 1 2
    }

    println!("\n\n0..=3:");
    for i in 0..=3 {
        print!("{} ", i);  // 0 1 2 3
    }
}
```

**Kết quả:**
```
0..3:
0 1 2

0..=3:
0 1 2 3
```

---

## 🔄 For Với Arrays

### Lặp Qua Giá Trị

```rust
fn main() {
    let so_lieu = [100, 200, 300, 400, 500];

    for so in so_lieu {
        println!("Số: {}", so);
    }
}
```

**Kết quả:**
```
Số: 100
Số: 200
Số: 300
Số: 400
Số: 500
```

### Lặp Qua Chuỗi

```rust
fn main() {
    let mon_hoc = ["Toán", "Lý", "Hóa", "Sinh"];

    for mon in mon_hoc {
        println!("📚 Môn: {}", mon);
    }
}
```

**Kết quả:**
```
📚 Môn: Toán
📚 Môn: Lý
📚 Môn: Hóa
📚 Môn: Sinh
```

---

## 🔍 Enumerate: Lấy Cả Index và Giá Trị

Dùng `.enumerate()` để lấy **cả index và giá trị**:

```rust
fn main() {
    let hoc_sinh = ["An", "Bình", "Chi", "Dũng"];

    for (index, ten) in hoc_sinh.iter().enumerate() {
        println!("Học sinh {} - STT: {}", ten, index + 1);
    }
}
```

**Kết quả:**
```
Học sinh An - STT: 1
Học sinh Bình - STT: 2
Học sinh Chi - STT: 3
Học sinh Dũng - STT: 4
```

**Giải thích:**
- `.iter()` → Tạo iterator từ array
- `.enumerate()` → Trả về `(index, giá_trị)`
- `index` bắt đầu từ 0

---

## 🎯 Iter, Iter_mut, Into_iter

Rust có **3 cách** lặp qua collection:

### 1. `.iter()` - Mượn Không Thay Đổi (Immutable Borrow)

```rust
fn main() {
    let danh_sach = vec![1, 2, 3, 4, 5];

    for item in danh_sach.iter() {
        println!("{}", item);
    }

    // ✅ Vẫn dùng được danh_sach sau khi lặp
    println!("Danh sách: {:?}", danh_sach);
}
```

**Kết quả:**
```
1
2
3
4
5
Danh sách: [1, 2, 3, 4, 5]
```

### 2. `.iter_mut()` - Mượn Có Thể Thay Đổi (Mutable Borrow)

```rust
fn main() {
    let mut danh_sach = vec![1, 2, 3, 4, 5];

    for item in danh_sach.iter_mut() {
        *item *= 2;  // ✅ Thay đổi được giá trị
    }

    println!("Sau khi nhân 2: {:?}", danh_sach);
}
```

**Kết quả:**
```
Sau khi nhân 2: [2, 4, 6, 8, 10]
```

**Giải thích:**
- `*item` → Dereference để truy cập giá trị
- Có thể thay đổi giá trị trong mảng

### 3. `.into_iter()` - Chuyển Ownership (Move)

```rust
fn main() {
    let danh_sach = vec![1, 2, 3, 4, 5];

    for item in danh_sach.into_iter() {
        println!("{}", item);
    }

    // ❌ Lỗi - danh_sach đã bị move!
    // println!("{:?}", danh_sach);
}
```

**Giải thích:**
- `into_iter()` → Chuyển ownership của từng phần tử
- Sau khi lặp, **không dùng được** collection nữa

:::tip Khi Nào Dùng Cái Nào?

| Method | Khi Nào Dùng | Sau Loop |
|--------|--------------|----------|
| `.iter()` | Chỉ đọc, không thay đổi | ✅ Vẫn dùng được |
| `.iter_mut()` | Cần thay đổi giá trị | ✅ Vẫn dùng được |
| `.into_iter()` | Không cần collection sau này | ❌ Không dùng được |

```rust
// ✅ Đọc dữ liệu
for item in collection.iter() { }

// ✅ Thay đổi dữ liệu
for item in collection.iter_mut() { }

// ✅ "Ăn" dữ liệu (không cần sau này)
for item in collection.into_iter() { }
```
:::

---

## 🔄 For Với Vector

```rust
fn main() {
    let mut diem = vec![75, 82, 90, 68, 95];

    println!("Điểm ban đầu:");
    for (i, d) in diem.iter().enumerate() {
        println!("Môn {}: {} điểm", i + 1, d);
    }

    // Cộng thêm 5 điểm cho mỗi môn
    for d in diem.iter_mut() {
        *d += 5;
    }

    println!("\nSau khi cộng 5 điểm:");
    for (i, d) in diem.iter().enumerate() {
        println!("Môn {}: {} điểm", i + 1, d);
    }
}
```

**Kết quả:**
```
Điểm ban đầu:
Môn 1: 75 điểm
Môn 2: 82 điểm
Môn 3: 90 điểm
Môn 4: 68 điểm
Môn 5: 95 điểm

Sau khi cộng 5 điểm:
Môn 1: 80 điểm
Môn 2: 87 điểm
Môn 3: 95 điểm
Môn 4: 73 điểm
Môn 5: 100 điểm
```

---

## 🎮 Ví Dụ Thực Tế: Tính Tổng và Trung Bình

```rust
fn main() {
    let diem_thi = [85, 92, 78, 95, 88];
    let mut tong = 0;

    println!("📊 Điểm các môn:");
    for (i, diem) in diem_thi.iter().enumerate() {
        println!("Môn {}: {}", i + 1, diem);
        tong += diem;
    }

    let trung_binh = tong as f64 / diem_thi.len() as f64;

    println!("\n📈 Tổng điểm: {}", tong);
    println!("📊 Điểm trung bình: {:.2}", trung_binh);
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

📈 Tổng điểm: 438
📊 Điểm trung bình: 87.60
```

---

## 🔍 Ví Dụ: Tìm Số Lớn Nhất

```rust
fn main() {
    let so_lieu = [45, 23, 67, 12, 89, 34, 56];
    let mut max = so_lieu[0];

    for &so in so_lieu.iter() {
        if so > max {
            max = so;
        }
    }

    println!("Số lớn nhất: {}", max);
}
```

**Kết quả:**
```
Số lớn nhất: 89
```

**Giải thích:**
- `&so` → Pattern matching, lấy giá trị (không phải reference)
- Hoặc có thể viết: `for so in so_lieu.iter() { if *so > max ... }`

---

## 🔄 Nested For Loops (Loops Lồng Nhau)

```rust
fn main() {
    println!("🔢 Bảng cửu chương:");

    for i in 1..=3 {
        println!("\nBảng {}", i);
        for j in 1..=5 {
            println!("{} × {} = {}", i, j, i * j);
        }
    }
}
```

**Kết quả:**
```
🔢 Bảng cửu chương:

Bảng 1
1 × 1 = 1
1 × 2 = 2
1 × 3 = 3
1 × 4 = 4
1 × 5 = 5

Bảng 2
2 × 1 = 2
2 × 2 = 4
2 × 3 = 6
2 × 4 = 8
2 × 5 = 10

Bảng 3
3 × 1 = 3
3 × 2 = 6
3 × 3 = 9
3 × 4 = 12
3 × 5 = 15
```

---

## 🎯 For Với Break và Continue

`break` và `continue` cũng hoạt động trong `for`:

### Break: Thoát Sớm

```rust
fn main() {
    let danh_sach = [10, 25, 30, 42, 55];
    let tim_kiem = 30;

    for (i, &so) in danh_sach.iter().enumerate() {
        if so == tim_kiem {
            println!("✅ Tìm thấy {} ở vị trí {}", tim_kiem, i);
            break;  // ✅ Thoát ngay khi tìm thấy
        }
    }
}
```

**Kết quả:**
```
✅ Tìm thấy 30 ở vị trí 2
```

### Continue: Bỏ Qua

```rust
fn main() {
    for i in 1..=10 {
        if i % 2 == 0 {
            continue;  // ⏭️ Bỏ qua số chẵn
        }
        println!("{} là số lẻ", i);
    }
}
```

**Kết quả:**
```
1 là số lẻ
3 là số lẻ
5 là số lẻ
7 là số lẻ
9 là số lẻ
```

---

## 🔄 Rev: Lặp Ngược

Dùng `.rev()` để lặp **ngược** từ cuối về đầu:

```rust
fn main() {
    println!("Đếm ngược:");
    for i in (1..=5).rev() {
        println!("{}", i);
    }
    println!("🚀 Phóng!");
}
```

**Kết quả:**
```
Đếm ngược:
5
4
3
2
1
🚀 Phóng!
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Quên .iter() Với Collection

```rust
// ❌ Lỗi với một số loại collection
let vec = vec![1, 2, 3];
for item in vec {
    // vec bị move!
}
// println!("{:?}", vec);  // ❌ Lỗi

// ✅ Đúng - Dùng .iter()
let vec = vec![1, 2, 3];
for item in vec.iter() {
    println!("{}", item);
}
println!("{:?}", vec);  // ✅ OK
```

### 2. Dùng .. Thay Vì ..=

```rust
// ❌ Sai - Không bao gồm 10
for i in 1..10 {
    println!("{}", i);  // 1-9
}

// ✅ Đúng - Bao gồm 10
for i in 1..=10 {
    println!("{}", i);  // 1-10
}
```

### 3. Quên Dấu * Khi Thay Đổi

```rust
let mut vec = vec![1, 2, 3];

// ❌ Lỗi - Không thể gán trực tiếp
for item in vec.iter_mut() {
    item = 10;  // ❌ item là &mut i32, không phải i32
}

// ✅ Đúng - Dùng *
for item in vec.iter_mut() {
    *item = 10;  // ✅ Dereference
}
```

### 4. Index Ngoài Phạm Vi

```rust
let arr = [10, 20, 30];

// ❌ Có thể lỗi runtime
for i in 0..10 {
    println!("{}", arr[i]);  // ❌ Index 3-9 không tồn tại!
}

// ✅ Đúng - An toàn
for item in arr.iter() {
    println!("{}", item);
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Tính Tổng Các Số Chẵn

Viết chương trình tính tổng các số chẵn từ 1-20.

```rust
fn main() {
    let mut tong = 0;

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let mut tong = 0;

    for i in 1..=20 {
        if i % 2 == 0 {
            tong += i;
        }
    }

    println!("Tổng các số chẵn (1-20): {}", tong);
}
```

**Kết quả:**
```
Tổng các số chẵn (1-20): 110
```

**Giải thích:** 2 + 4 + 6 + ... + 20 = 110
</details>

---

### Bài 2: Đảo Ngược Mảng

Viết chương trình in mảng theo thứ tự ngược lại.

```rust
fn main() {
    let arr = [10, 20, 30, 40, 50];

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let arr = [10, 20, 30, 40, 50];

    println!("Mảng ngược:");
    for item in arr.iter().rev() {
        println!("{}", item);
    }
}
```

**Kết quả:**
```
Mảng ngược:
50
40
30
20
10
```
</details>

---

### Bài 3: Nhân Tất Cả Phần Tử Với 3

Viết chương trình nhân tất cả phần tử trong vector với 3.

```rust
fn main() {
    let mut numbers = vec![5, 10, 15, 20, 25];

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let mut numbers = vec![5, 10, 15, 20, 25];

    println!("Trước: {:?}", numbers);

    for num in numbers.iter_mut() {
        *num *= 3;
    }

    println!("Sau: {:?}", numbers);
}
```

**Kết quả:**
```
Trước: [5, 10, 15, 20, 25]
Sau: [15, 30, 45, 60, 75]
```
</details>

---

## 📝 Tóm Tắt

| Khái Niệm | Cú Pháp | Mục Đích |
|-----------|---------|----------|
| For loop | `for item in collection { }` | Lặp qua collection |
| Range | `0..5` hoặc `0..=5` | Dãy số |
| `.iter()` | `collection.iter()` | Mượn immutable |
| `.iter_mut()` | `collection.iter_mut()` | Mượn mutable |
| `.into_iter()` | `collection.into_iter()` | Move ownership |
| `.enumerate()` | `.iter().enumerate()` | Lấy (index, value) |
| `.rev()` | `(0..5).rev()` | Lặp ngược |

**Điểm Quan Trọng:**
- ✅ For an toàn hơn while (không lo index ngoài phạm vi)
- ✅ `..` không bao gồm cuối, `..=` bao gồm cuối
- ✅ Dùng `.iter()` để giữ collection sau khi lặp
- ✅ Dùng `.iter_mut()` để thay đổi giá trị

---

## 🎯 So Sánh: Loop vs While vs For

| Loại | Khi Nào Dùng | Ví Dụ |
|------|--------------|-------|
| `loop` | Vô hạn, điều kiện phức tạp | Game loop, server |
| `while` | Điều kiện đơn giản | `while x < 10` |
| `for` | Lặp qua collection/range | Mảng, vector, 1..10 |

```rust
// Loop - Vô hạn
loop {
    if complex_condition() {
        break;
    }
}

// While - Điều kiện đơn giản
while x < 10 {
    x += 1;
}

// For - Collection/Range
for i in 0..10 {
    println!("{}", i);
}
```

---

## 🎯 Bước Tiếp Theo

Bạn đã biết **control flow** (if/match) và **loops** rồi! 🎉

Bài tiếp theo, chúng ta sẽ học về **Arrays** - cách lưu trữ nhiều giá trị cùng loại! 📦

➡️ **Tiếp theo**: [Mảng: Danh Sách Có Độ Dài Cố Định](arrays)
