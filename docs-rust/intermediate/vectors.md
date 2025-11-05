---
sidebar_position: 7
title: "Vector: Danh Sách Có Thể Mở Rộng"
description: "Học cách sử dụng Vec<T> trong Rust - collection linh hoạt có thể thêm/xóa phần tử. Hiểu push, pop, insert, remove và các methods hữu ích!"
keywords: [rust vector, rust vec, rust dynamic array, rust vec methods, rust push pop]
---

# 📚 Vector: Danh Sách Có Thể Mở Rộng

:::tip Mục Tiêu Bài Học
Sau bài này, bạn sẽ:
- ✅ Biết cách tạo và khởi tạo vectors
- ✅ Thêm/xóa phần tử với push, pop, insert, remove
- ✅ Truy cập phần tử an toàn với get()
- ✅ Hiểu sự khác biệt giữa Vector và Array
:::

---

## 🤔 Vấn Đề Với Arrays

Arrays rất tốt, nhưng có **giới hạn lớn**: **Độ dài cố định**!

```rust
fn main() {
    let mut arr = [1, 2, 3];  // Cố định 3 phần tử

    // ❌ Không thể thêm phần tử thứ 4!
    // arr.push(4);  // Không có method này

    // ❌ Không thể xóa phần tử!
    // arr.remove(0);  // Không có method này
}
```

**Giải pháp:** Dùng **Vector**! 🚀

---

## 📝 Vector Là Gì?

**Vector** (`Vec<T>`) là một **collection động**:

- **Có thể thêm/xóa** phần tử
- **Độ dài thay đổi** được
- **Cùng kiểu dữ liệu** (giống array)
- Lưu trên **heap** (linh hoạt hơn stack)

:::info Ẩn Dụ
Hãy tưởng tượng **vector** như **một kho đồ bảo hộ linh hoạt**:

- 📦 **Ban đầu**: 3 mũ bảo hiểm
- ➕ **Thêm**: Mua thêm 2 mũ → Giờ có 5 mũ
- ➖ **Xóa**: Cho đi 1 mũ → Còn 4 mũ
- 🔄 **Linh hoạt**: Kho tự động mở rộng/thu nhỏ!

Khác với array (tủ cố định), vector như **kho động** thay đổi theo nhu cầu! 🛡️
:::

---

## 📝 Tạo Vector

### Cách 1: Vec::new()

```rust
fn main() {
    let mut vec: Vec<i32> = Vec::new();  // Vector rỗng
    println!("Vector: {:?}", vec);
}
```

**Kết quả:**
```
Vector: []
```

**Giải thích:**
- `Vec::new()` → Tạo vector rỗng
- `Vec<i32>` → Vector chứa kiểu i32
- `mut` → Cần mut để thêm/xóa phần tử

### Cách 2: vec! Macro

```rust
fn main() {
    let vec = vec![10, 20, 30, 40, 50];
    println!("Vector: {:?}", vec);
}
```

**Kết quả:**
```
Vector: [10, 20, 30, 40, 50]
```

**Giải thích:**
- `vec![...]` → Macro tạo vector với giá trị sẵn
- Rust tự suy luận kiểu (type inference)

### Cách 3: Giá Trị Giống Nhau

```rust
fn main() {
    let zeros = vec![0; 5];  // 5 phần tử giá trị 0
    println!("Zeros: {:?}", zeros);
}
```

**Kết quả:**
```
Zeros: [0, 0, 0, 0, 0]
```

---

## ➕ Thêm Phần Tử: push()

Dùng `.push()` để thêm phần tử vào **cuối** vector:

```rust
fn main() {
    let mut danh_sach = Vec::new();

    danh_sach.push(10);
    danh_sach.push(20);
    danh_sach.push(30);

    println!("Danh sách: {:?}", danh_sach);
}
```

**Kết quả:**
```
Danh sách: [10, 20, 30]
```

### Ví Dụ Thực Tế: Thêm Điểm

```rust
fn main() {
    let mut diem = vec![];

    println!("Nhập điểm 5 môn:");
    diem.push(85);
    diem.push(92);
    diem.push(78);
    diem.push(95);
    diem.push(88);

    println!("\n📊 Điểm các môn: {:?}", diem);
}
```

**Kết quả:**
```
Nhập điểm 5 môn:

📊 Điểm các môn: [85, 92, 78, 95, 88]
```

---

## ➖ Xóa Phần Tử Cuối: pop()

Dùng `.pop()` để **xóa và trả về** phần tử cuối:

```rust
fn main() {
    let mut stack = vec![10, 20, 30];

    println!("Stack ban đầu: {:?}", stack);

    let last = stack.pop();  // Xóa 30
    println!("Lấy ra: {:?}", last);
    println!("Stack hiện tại: {:?}", stack);

    let last = stack.pop();  // Xóa 20
    println!("Lấy ra: {:?}", last);
    println!("Stack hiện tại: {:?}", stack);
}
```

**Kết quả:**
```
Stack ban đầu: [10, 20, 30]
Lấy ra: Some(30)
Stack hiện tại: [10, 20]
Lấy ra: Some(20)
Stack hiện tại: [10]
```

**Giải thích:**
- `.pop()` trả về `Option<T>`
- `Some(giá_trị)` nếu có phần tử
- `None` nếu vector rỗng

```rust
fn main() {
    let mut vec = vec![];
    let result = vec.pop();

    match result {
        Some(val) => println!("Lấy ra: {}", val),
        None => println!("Vector rỗng!"),
    }
}
```

**Kết quả:**
```
Vector rỗng!
```

---

## 🔍 Truy Cập Phần Tử

### Cách 1: Dùng Index []

```rust
fn main() {
    let vec = vec![10, 20, 30, 40, 50];

    println!("Phần tử đầu: {}", vec[0]);
    println!("Phần tử cuối: {}", vec[4]);
}
```

**Kết quả:**
```
Phần tử đầu: 10
Phần tử cuối: 50
```

:::caution Cảnh Báo
Truy cập index không tồn tại → **Panic**!

```rust
let vec = vec![1, 2, 3];
// ❌ Panic! Index 10 không tồn tại
// println!("{}", vec[10]);
```
:::

### Cách 2: Dùng get() - An Toàn Hơn

```rust
fn main() {
    let vec = vec![10, 20, 30];

    match vec.get(1) {
        Some(val) => println!("Giá trị tại index 1: {}", val),
        None => println!("Index không tồn tại"),
    }

    match vec.get(10) {
        Some(val) => println!("Giá trị tại index 10: {}", val),
        None => println!("Index 10 không tồn tại"),
    }
}
```

**Kết quả:**
```
Giá trị tại index 1: 20
Index 10 không tồn tại
```

:::tip Nên Dùng Cái Nào?

| Method | Khi Nào Dùng | Khi Index Không Tồn Tại |
|--------|--------------|--------------------------|
| `vec[i]` | Chắc chắn index hợp lệ | ❌ Panic (crash) |
| `vec.get(i)` | Không chắc index hợp lệ | ✅ Trả về `None` |

```rust
// ✅ Dùng [] khi chắc chắn
for i in 0..vec.len() {
    println!("{}", vec[i]);  // An toàn
}

// ✅ Dùng get() khi không chắc
let user_input = 100;  // Từ người dùng
match vec.get(user_input) {
    Some(val) => println!("{}", val),
    None => println!("Không tồn tại"),
}
```
:::

---

## 🔧 Các Methods Hữu Ích

### len() - Độ Dài

```rust
fn main() {
    let vec = vec![1, 2, 3, 4, 5];
    println!("Độ dài: {}", vec.len());
}
```

**Kết quả:**
```
Độ dài: 5
```

### is_empty() - Kiểm Tra Rỗng

```rust
fn main() {
    let vec1 = vec![];
    let vec2 = vec![1, 2, 3];

    println!("vec1 rỗng? {}", vec1.is_empty());
    println!("vec2 rỗng? {}", vec2.is_empty());
}
```

**Kết quả:**
```
vec1 rỗng? true
vec2 rỗng? false
```

### clear() - Xóa Tất Cả

```rust
fn main() {
    let mut vec = vec![1, 2, 3, 4, 5];

    println!("Trước: {:?}", vec);
    vec.clear();
    println!("Sau: {:?}", vec);
}
```

**Kết quả:**
```
Trước: [1, 2, 3, 4, 5]
Sau: []
```

### insert() - Chèn Vào Vị Trí

```rust
fn main() {
    let mut vec = vec![1, 2, 4, 5];

    println!("Trước: {:?}", vec);
    vec.insert(2, 3);  // Chèn 3 vào index 2
    println!("Sau: {:?}", vec);
}
```

**Kết quả:**
```
Trước: [1, 2, 4, 5]
Sau: [1, 2, 3, 4, 5]
```

### remove() - Xóa Tại Vị Trí

```rust
fn main() {
    let mut vec = vec![10, 20, 30, 40, 50];

    println!("Trước: {:?}", vec);
    let removed = vec.remove(2);  // Xóa index 2
    println!("Đã xóa: {}", removed);
    println!("Sau: {:?}", vec);
}
```

**Kết quả:**
```
Trước: [10, 20, 30, 40, 50]
Đã xóa: 30
Sau: [10, 20, 40, 50]
```

### contains() - Kiểm Tra Tồn Tại

```rust
fn main() {
    let vec = vec![10, 20, 30, 40];

    println!("Có 30? {}", vec.contains(&30));
    println!("Có 50? {}", vec.contains(&50));
}
```

**Kết quả:**
```
Có 30? true
Có 50? false
```

---

## 🔄 Lặp Qua Vector

### Cách 1: For Loop

```rust
fn main() {
    let vec = vec![10, 20, 30, 40];

    for val in &vec {
        println!("{}", val);
    }
}
```

**Kết quả:**
```
10
20
30
40
```

### Cách 2: Với Index

```rust
fn main() {
    let vec = vec!["Táo", "Cam", "Chuối"];

    for (i, fruit) in vec.iter().enumerate() {
        println!("{}. {}", i + 1, fruit);
    }
}
```

**Kết quả:**
```
1. Táo
2. Cam
3. Chuối
```

### Cách 3: Thay Đổi Giá Trị

```rust
fn main() {
    let mut vec = vec![1, 2, 3, 4, 5];

    println!("Trước: {:?}", vec);

    for val in &mut vec {
        *val *= 2;  // Nhân đôi
    }

    println!("Sau: {:?}", vec);
}
```

**Kết quả:**
```
Trước: [1, 2, 3, 4, 5]
Sau: [2, 4, 6, 8, 10]
```

---

## 🎮 Ví Dụ Thực Tế: Quản Lý Danh Sách Việc

```rust
fn main() {
    let mut todo_list: Vec<String> = Vec::new();

    // Thêm việc cần làm
    todo_list.push(String::from("Học Rust"));
    todo_list.push(String::from("Làm bài tập"));
    todo_list.push(String::from("Đọc tài liệu"));

    println!("📝 Danh sách việc cần làm:");
    for (i, task) in todo_list.iter().enumerate() {
        println!("{}. {}", i + 1, task);
    }

    // Hoàn thành việc đầu tiên
    if !todo_list.is_empty() {
        let done = todo_list.remove(0);
        println!("\n✅ Đã hoàn thành: {}", done);
    }

    println!("\n📝 Còn lại:");
    for (i, task) in todo_list.iter().enumerate() {
        println!("{}. {}", i + 1, task);
    }
}
```

**Kết quả:**
```
📝 Danh sách việc cần làm:
1. Học Rust
2. Làm bài tập
3. Đọc tài liệu

✅ Đã hoàn thành: Học Rust

📝 Còn lại:
1. Làm bài tập
2. Đọc tài liệu
```

---

## 🔍 Ví Dụ: Lọc Số Chẵn

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let mut even_numbers = Vec::new();

    for &num in &numbers {
        if num % 2 == 0 {
            even_numbers.push(num);
        }
    }

    println!("Số ban đầu: {:?}", numbers);
    println!("Số chẵn: {:?}", even_numbers);
}
```

**Kết quả:**
```
Số ban đầu: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Số chẵn: [2, 4, 6, 8, 10]
```

---

## 📊 Ví Dụ: Tính Thống Kê

```rust
fn main() {
    let diem = vec![85, 92, 78, 95, 88, 76, 90];

    // Tính tổng
    let mut tong = 0;
    for &d in &diem {
        tong += d;
    }

    // Trung bình
    let trung_binh = tong as f64 / diem.len() as f64;

    // Tìm max/min
    let mut max = diem[0];
    let mut min = diem[0];
    for &d in &diem {
        if d > max {
            max = d;
        }
        if d < min {
            min = d;
        }
    }

    println!("📊 Thống kê điểm:");
    println!("Số lượng: {}", diem.len());
    println!("Tổng: {}", tong);
    println!("Trung bình: {:.2}", trung_binh);
    println!("Cao nhất: {}", max);
    println!("Thấp nhất: {}", min);
}
```

**Kết quả:**
```
📊 Thống kê điểm:
Số lượng: 7
Tổng: 604
Trung bình: 86.29
Cao nhất: 95
Thấp nhất: 76
```

---

## ⚠️ Lỗi Thường Gặp

### 1. Quên Mut

```rust
fn main() {
    let vec = Vec::new();  // ❌ Không mut
    // vec.push(1);  // Lỗi!

    let mut vec = Vec::new();  // ✅ Đúng
    vec.push(1);
}
```

### 2. Sử Dụng Sau Khi Move

```rust
fn main() {
    let vec = vec![1, 2, 3];

    for item in vec {  // ❌ vec bị move
        println!("{}", item);
    }

    // println!("{:?}", vec);  // ❌ Lỗi!

    // ✅ Đúng - Dùng reference
    let vec = vec![1, 2, 3];
    for item in &vec {
        println!("{}", item);
    }
    println!("{:?}", vec);  // ✅ OK
}
```

### 3. Index Ngoài Phạm Vi

```rust
fn main() {
    let vec = vec![1, 2, 3];

    // ❌ Panic!
    // println!("{}", vec[10]);

    // ✅ An toàn
    match vec.get(10) {
        Some(val) => println!("{}", val),
        None => println!("Không tồn tại"),
    }
}
```

---

## 💪 Bài Tập Thực Hành

### Bài 1: Thêm và Xóa

Tạo vector, thêm 5 số, sau đó xóa 3 số cuối.

```rust
fn main() {
    let mut numbers = Vec::new();

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let mut numbers = Vec::new();

    // Thêm 5 số
    for i in 1..=5 {
        numbers.push(i);
    }
    println!("Sau khi thêm: {:?}", numbers);

    // Xóa 3 số cuối
    for _ in 0..3 {
        numbers.pop();
    }
    println!("Sau khi xóa: {:?}", numbers);
}
```

**Kết quả:**
```
Sau khi thêm: [1, 2, 3, 4, 5]
Sau khi xóa: [1, 2]
```
</details>

---

### Bài 2: Lọc Số Lớn Hơn 50

Từ vector cho trước, tạo vector mới chỉ chứa số > 50.

```rust
fn main() {
    let numbers = vec![25, 60, 45, 80, 30, 90, 55];

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let numbers = vec![25, 60, 45, 80, 30, 90, 55];
    let mut large_numbers = Vec::new();

    for &num in &numbers {
        if num > 50 {
            large_numbers.push(num);
        }
    }

    println!("Số ban đầu: {:?}", numbers);
    println!("Số > 50: {:?}", large_numbers);
}
```

**Kết quả:**
```
Số ban đầu: [25, 60, 45, 80, 30, 90, 55]
Số > 50: [60, 80, 90, 55]
```
</details>

---

### Bài 3: Ghép Hai Vector

Ghép hai vectors thành một.

```rust
fn main() {
    let vec1 = vec![1, 2, 3];
    let vec2 = vec![4, 5, 6];

    // Viết code của bạn ở đây
}
```

<details>
<summary>💡 Xem Đáp Án</summary>

```rust
fn main() {
    let vec1 = vec![1, 2, 3];
    let vec2 = vec![4, 5, 6];
    let mut combined = Vec::new();

    for &val in &vec1 {
        combined.push(val);
    }
    for &val in &vec2 {
        combined.push(val);
    }

    println!("Vec 1: {:?}", vec1);
    println!("Vec 2: {:?}", vec2);
    println!("Ghép: {:?}", combined);
}
```

**Hoặc dùng extend:**

```rust
fn main() {
    let vec1 = vec![1, 2, 3];
    let vec2 = vec![4, 5, 6];
    let mut combined = vec1.clone();
    combined.extend(vec2);

    println!("Ghép: {:?}", combined);
}
```

**Kết quả:**
```
Vec 1: [1, 2, 3]
Vec 2: [4, 5, 6]
Ghép: [1, 2, 3, 4, 5, 6]
```
</details>

---

## 📝 Tóm Tắt

| Method | Mô Tả | Ví Dụ |
|--------|-------|-------|
| `Vec::new()` | Tạo vector rỗng | `let v: Vec<i32> = Vec::new();` |
| `vec![...]` | Tạo với giá trị | `let v = vec![1, 2, 3];` |
| `.push(val)` | Thêm cuối | `v.push(10);` |
| `.pop()` | Xóa cuối | `v.pop();` |
| `.insert(i, val)` | Chèn vào vị trí | `v.insert(1, 5);` |
| `.remove(i)` | Xóa tại vị trí | `v.remove(2);` |
| `.len()` | Độ dài | `v.len()` |
| `.is_empty()` | Kiểm tra rỗng | `v.is_empty()` |
| `.clear()` | Xóa tất cả | `v.clear();` |
| `.contains(&val)` | Kiểm tra tồn tại | `v.contains(&5)` |
| `.get(i)` | Truy cập an toàn | `v.get(10)` |

---

## 🆚 Vector vs Array

| Đặc Điểm | Array | Vector |
|----------|-------|--------|
| Độ dài | Cố định | Thay đổi được |
| Khai báo | `[i32; 5]` | `Vec<i32>` |
| Khởi tạo | `[1, 2, 3]` | `vec![1, 2, 3]` |
| Thêm/xóa | ❌ Không | ✅ Có |
| Lưu trữ | Stack | Heap |
| Hiệu suất | Nhanh hơn | Chậm hơn một chút |
| Linh hoạt | Thấp | Cao |

:::tip Khi Nào Dùng Cái Nào?

**Dùng Array khi:**
- ✅ Biết trước số lượng cố định
- ✅ Không cần thêm/xóa
- ✅ Cần hiệu suất tối đa

**Dùng Vector khi:**
- ✅ Không biết trước số lượng
- ✅ Cần thêm/xóa thường xuyên
- ✅ Cần tính linh hoạt

**Trong thực tế**: Vector được dùng **nhiều hơn** vì linh hoạt!
:::

---

## 🎯 Bước Tiếp Theo

Bạn đã biết Arrays và Vectors rồi! Nhưng nếu muốn **gộp nhiều kiểu dữ liệu khác nhau**, thì sao?

Bài tiếp theo, chúng ta sẽ học **Tuple** - gộp nhiều giá trị khác kiểu lại với nhau! 🎁

➡️ **Tiếp theo**: [Tuple: Gói Nhiều Giá Trị Lại](tuples)
