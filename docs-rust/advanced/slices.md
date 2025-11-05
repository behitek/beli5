---
sidebar_position: 3
title: "Slices: Tham Chiếu Phần Dữ Liệu"
description: "Tìm hiểu cách sử dụng slices để tham chiếu đến một phần của collections"
---

# 🍕 Slices: Tham Chiếu Phần Dữ Liệu

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được slice là gì và tại sao cần slice
- ✅ Sử dụng string slices (`&str`)
- ✅ Sử dụng array slices (`&[T]`)
- ✅ Hiểu mối quan hệ giữa slice và ownership
- ✅ Tránh được lỗi thường gặp với slices
- ✅ Áp dụng slices trong các tình huống thực tế

## 🤔 Slice Là Gì?

### Ẩn Dụ Cuộc Sống: Cắt Bánh Pizza

**Slice** giống như **một miếng pizza từ cả chiếc bánh**:

🍕 **Whole Pizza (Collection)**:
- Cả chiếc bánh pizza 8 miếng
- Bạn sở hữu toàn bộ

🍕 **Slice (Phần)**:
- **Một hoặc vài miếng** từ chiếc bánh
- Không sở hữu, chỉ **tham chiếu** đến phần đó
- Vẫn thuộc chiếc bánh gốc

### Định Nghĩa Kỹ Thuật

**Slice** là:
- **Reference** đến một phần liên tiếp của collection
- Không sở hữu dữ liệu, chỉ "nhìn" vào một đoạn
- Có 2 thành phần: **con trỏ** + **độ dài**

```rust
fn main() {
    let arr = [10, 20, 30, 40, 50];

    // Slice từ index 1 đến 3 (không bao gồm 4)
    let slice = &arr[1..4]; // [20, 30, 40]

    println!("{:?}", slice);
}
```

**Cấu trúc bên trong**:
```
arr:   [10, 20, 30, 40, 50]
        ^   ^   ^   ^
        0   1   2   3   4

slice: ptr -----> 20
       len = 3
       (trỏ đến arr[1], có 3 phần tử)
```

## 📝 String Slices (`&str`)

### Tạo String Slice

```rust
fn main() {
    let s = String::from("Hello Rust");

    // Slice toàn bộ
    let slice1 = &s[..];       // "Hello Rust"

    // Slice từ đầu đến index 5
    let slice2 = &s[..5];      // "Hello"

    // Slice từ index 6 đến hết
    let slice3 = &s[6..];      // "Rust"

    // Slice từ index 0 đến 5
    let slice4 = &s[0..5];     // "Hello"

    println!("{}", slice1);
    println!("{}", slice2);
    println!("{}", slice3);
    println!("{}", slice4);
}
```

**Cú pháp**:
- `&s[start..end]` → Từ `start` đến `end - 1`
- `&s[..end]` → Từ đầu đến `end - 1`
- `&s[start..]` → Từ `start` đến hết
- `&s[..]` → Toàn bộ

### String Literal Là `&str`

```rust
fn main() {
    // String literal có kiểu &str
    let s: &str = "Hello, world!";

    // Không thể sửa
    // s.push_str("!"); // Lỗi! &str là immutable

    println!("{}", s);
}
```

**Giải thích**:
- `"Hello"` → Kiểu `&str` (string slice)
- Lưu trong **binary**, không thể sửa
- Nhanh và nhẹ vì không cần heap

### `String` vs `&str`

```rust
fn main() {
    // String - sở hữu dữ liệu, có thể sửa
    let mut s1 = String::from("Hello");
    s1.push_str(", world!");
    println!("{}", s1);

    // &str - chỉ tham chiếu, không sửa được
    let s2: &str = "Hello, world!";
    // s2.push_str("!"); // Lỗi!
    println!("{}", s2);

    // Chuyển từ String sang &str
    let s3 = String::from("Rust");
    let slice: &str = &s3;  // Hoặc &s3[..]
    println!("{}", slice);
}
```

**So sánh**:

| Đặc điểm | `String` | `&str` |
|----------|----------|--------|
| **Ownership** | Có | Không (chỉ borrow) |
| **Sửa đổi** | Có (nếu `mut`) | Không |
| **Lưu trữ** | Heap | Stack hoặc Binary |
| **Kích thước** | Dynamic | Fixed |
| **Dùng khi** | Cần sở hữu | Chỉ đọc |

### Hàm Nhận `&str`

```rust
fn main() {
    let s1 = String::from("Hello");
    let s2 = "World";

    in_loi_chao(&s1);  // String → &str tự động
    in_loi_chao(s2);   // &str trực tiếp
}

fn in_loi_chao(s: &str) {
    println!("Xin chào, {}!", s);
}
```

**Lợi ích**:
- Hàm nhận `&str` → Linh hoạt hơn
- Có thể truyền cả `String` (tự chuyển thành `&str`)
- Có thể truyền string literal

### Ví Dụ: Tìm Từ Đầu Tiên

```rust
fn main() {
    let cau = String::from("Hello Rust programming");

    let tu_dau = tu_dau_tien(&cau);

    println!("Từ đầu tiên: {}", tu_dau);
}

fn tu_dau_tien(s: &str) -> &str {
    for (i, byte) in s.bytes().enumerate() {
        if byte == b' ' {
            return &s[..i];
        }
    }
    &s[..]  // Không có khoảng trắng → toàn bộ
}
```

**Đầu ra**:
```
Từ đầu tiên: Hello
```

## 📊 Array Slices (`&[T]`)

### Tạo Array Slice

```rust
fn main() {
    let arr = [10, 20, 30, 40, 50];

    let slice1 = &arr[1..4];   // [20, 30, 40]
    let slice2 = &arr[..3];    // [10, 20, 30]
    let slice3 = &arr[2..];    // [30, 40, 50]
    let slice4 = &arr[..];     // [10, 20, 30, 40, 50]

    println!("{:?}", slice1);
    println!("{:?}", slice2);
    println!("{:?}", slice3);
    println!("{:?}", slice4);
}
```

### Slice Với Vector

```rust
fn main() {
    let vec = vec![1, 2, 3, 4, 5];

    let slice = &vec[1..4];  // [2, 3, 4]

    println!("Slice: {:?}", slice);
    println!("Vector: {:?}", vec);  // vec vẫn dùng được
}
```

### Hàm Nhận Slice

```rust
fn main() {
    let arr = [10, 20, 30, 40, 50];
    let vec = vec![1, 2, 3, 4, 5];

    println!("Tổng arr: {}", tinh_tong(&arr));
    println!("Tổng vec: {}", tinh_tong(&vec));
    println!("Tổng slice: {}", tinh_tong(&arr[1..4]));
}

fn tinh_tong(slice: &[i32]) -> i32 {
    slice.iter().sum()
}
```

**Lợi ích**:
- Một hàm hoạt động với cả array, vector, và slice
- Linh hoạt và tái sử dụng

### Duyệt Qua Slice

```rust
fn main() {
    let numbers = vec![10, 20, 30, 40, 50];
    let slice = &numbers[1..4];

    // Cách 1: for loop
    for &num in slice {
        println!("{}", num);
    }

    // Cách 2: iter()
    for num in slice.iter() {
        println!("{}", num);
    }

    // Cách 3: với index
    for (i, &num) in slice.iter().enumerate() {
        println!("Index {}: {}", i, num);
    }
}
```

## 🔄 Slice Và Ownership

### Slice Là Immutable Borrow

```rust
fn main() {
    let mut vec = vec![1, 2, 3, 4, 5];

    let slice = &vec[1..4];

    // ❌ Lỗi - không thể sửa vec khi có immutable borrow
    // vec.push(6);

    println!("{:?}", slice);
}
```

**Giải thích**:
- `slice` là immutable borrow của `vec`
- Không thể sửa `vec` trong khi `slice` còn sống

### Sửa: Tách Scope

```rust
fn main() {
    let mut vec = vec![1, 2, 3, 4, 5];

    {
        let slice = &vec[1..4];
        println!("{:?}", slice);
    } // slice hết scope

    vec.push(6);  // ✅ OK

    println!("{:?}", vec);
}
```

### Mutable Slice

```rust
fn main() {
    let mut arr = [10, 20, 30, 40, 50];

    // Mutable slice
    let slice = &mut arr[1..4];

    // Sửa đổi qua slice
    for num in slice.iter_mut() {
        *num *= 2;
    }

    println!("{:?}", arr); // [10, 40, 60, 80, 50]
}
```

**Chú ý**:
- `&mut arr[..]` → Mutable slice
- Có thể sửa phần tử qua slice
- Array gốc cũng thay đổi

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Tách Dòng Đầu Tiên

```rust
fn main() {
    let text = "Dòng 1\nDòng 2\nDòng 3";

    match dong_dau_tien(text) {
        Some(dong) => println!("Dòng đầu: {}", dong),
        None => println!("Không có dòng"),
    }
}

fn dong_dau_tien(s: &str) -> Option<&str> {
    s.lines().next()
}
```

**Đầu ra**:
```
Dòng đầu: Dòng 1
```

### Ví Dụ 2: Tìm Số Lớn Nhất Trong Đoạn

```rust
fn main() {
    let numbers = vec![5, 12, 8, 20, 3, 15, 7];

    // Tìm max trong đoạn index 2..5
    let slice = &numbers[2..5];
    let max = tim_max(slice);

    println!("Max trong {:?}: {:?}", slice, max);
}

fn tim_max(slice: &[i32]) -> Option<&i32> {
    slice.iter().max()
}
```

**Đầu ra**:
```
Max trong [8, 20, 3]: Some(20)
```

### Ví Dụ 3: Trích Xuất Tên File

```rust
fn main() {
    let path = "folder/subfolder/file.txt";

    let filename = lay_ten_file(path);

    println!("Tên file: {}", filename);
}

fn lay_ten_file(path: &str) -> &str {
    match path.rfind('/') {
        Some(pos) => &path[pos + 1..],
        None => path,
    }
}
```

**Đầu ra**:
```
Tên file: file.txt
```

### Ví Dụ 4: Tính Trung Bình Đoạn

```rust
fn main() {
    let diem = vec![85, 92, 78, 95, 88, 76, 90];

    // Trung bình 3 điểm giữa
    let slice = &diem[2..5];
    let tb = trung_binh(slice);

    println!("Điểm: {:?}", slice);
    println!("Trung bình: {:.2}", tb);
}

fn trung_binh(slice: &[i32]) -> f64 {
    let tong: i32 = slice.iter().sum();
    tong as f64 / slice.len() as f64
}
```

**Đầu ra**:
```
Điểm: [78, 95, 88]
Trung bình: 87.00
```

### Ví Dụ 5: Chia String Thành Nhiều Phần

```rust
fn main() {
    let text = "apple,banana,orange,grape";

    let parts: Vec<&str> = text.split(',').collect();

    println!("Có {} phần:", parts.len());
    for (i, part) in parts.iter().enumerate() {
        println!("  {}: {}", i + 1, part);
    }
}
```

**Đầu ra**:
```
Có 4 phần:
  1: apple
  2: banana
  3: orange
  4: grape
```

### Ví Dụ 6: Đảo Ngược Slice

```rust
fn main() {
    let mut arr = [1, 2, 3, 4, 5];

    println!("Trước: {:?}", arr);

    // Đảo ngược đoạn giữa
    dao_nguoc(&mut arr[1..4]);

    println!("Sau: {:?}", arr);
}

fn dao_nguoc(slice: &mut [i32]) {
    slice.reverse();
}
```

**Đầu ra**:
```
Trước: [1, 2, 3, 4, 5]
Sau: [1, 4, 3, 2, 5]
```

## 🚫 Lỗi Thường Gặp

### Lỗi 1: Index Out Of Bounds

```rust
fn main() {
    let arr = [10, 20, 30];

    // ❌ Panic! Index 5 vượt quá length 3
    let slice = &arr[1..5];
}
```

**Lỗi**:
```
thread 'main' panicked at 'range end index 5 out of range for slice of length 3'
```

**Sửa**:
```rust
fn main() {
    let arr = [10, 20, 30];

    // ✅ Kiểm tra trước
    let end = 5.min(arr.len());
    let slice = &arr[1..end];

    println!("{:?}", slice);
}
```

### Lỗi 2: Slice UTF-8 Không An Toàn

```rust
fn main() {
    let s = String::from("Xin chào");

    // ❌ Panic! Cắt giữa ký tự UTF-8
    // let slice = &s[0..4];  // Lỗi!

    // ✅ Dùng chars()
    let safe_slice: String = s.chars().take(4).collect();
    println!("{}", safe_slice);
}
```

### Lỗi 3: Borrow Checker Với Slice

```rust
fn main() {
    let mut vec = vec![1, 2, 3, 4, 5];

    let slice = &vec[..];

    // ❌ Lỗi - vec bị borrow
    // vec.push(6);

    println!("{:?}", slice);
}
```

**Sửa**:
```rust
fn main() {
    let mut vec = vec![1, 2, 3, 4, 5];

    {
        let slice = &vec[..];
        println!("{:?}", slice);
    } // slice hết scope

    vec.push(6);  // ✅ OK
}
```

### Lỗi 4: Slice Không Thể Outlive Source

```rust
// ❌ Lỗi
fn tao_slice() -> &[i32] {
    let arr = [1, 2, 3];
    &arr[..]  // Lỗi! arr sẽ bị drop
}
```

**Sửa**:
```rust
// ✅ Trả về Vec
fn tao_vec() -> Vec<i32> {
    vec![1, 2, 3]
}

// ✅ Hoặc dùng static
fn tao_slice_static() -> &'static [i32] {
    &[1, 2, 3]
}
```

## 🎓 So Sánh Các Loại Tham Chiếu

| Kiểu | Ví Dụ | Ownership | Kích Thước | Dùng Khi |
|------|-------|-----------|------------|----------|
| **`String`** | `String::from("hi")` | Có | Dynamic | Cần sở hữu, sửa đổi |
| **`&str`** | `"hello"` hoặc `&s[..]` | Không | Fixed | Chỉ đọc string |
| **`Vec<T>`** | `vec![1, 2, 3]` | Có | Dynamic | Cần sở hữu, sửa đổi |
| **`&[T]`** | `&arr[..]` hoặc `&vec[..]` | Không | Fixed | Chỉ đọc array/vec |
| **`&T`** | `&x` | Không | - | Tham chiếu đơn |
| **`&mut T`** | `&mut x` | Không | - | Tham chiếu sửa đổi |

## 💻 Bài Tập Thực Hành

### Bài 1: Lấy 3 Phần Tử Đầu

Viết hàm trả về slice gồm 3 phần tử đầu:

```rust
fn main() {
    let numbers = vec![10, 20, 30, 40, 50];

    let slice = ba_phan_tu_dau(&numbers);

    println!("{:?}", slice); // [10, 20, 30]
}

fn ba_phan_tu_dau(nums: &[i32]) -> &[i32] {
    // TODO
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn ba_phan_tu_dau(nums: &[i32]) -> &[i32] {
    &nums[..3.min(nums.len())]
}
```
</details>

### Bài 2: Tìm Từ Dài Nhất

```rust
fn main() {
    let text = "Rust is a systems programming language";

    let longest = tu_dai_nhat(text);

    println!("Từ dài nhất: {}", longest);
}

fn tu_dai_nhat(s: &str) -> &str {
    // TODO
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn tu_dai_nhat(s: &str) -> &str {
    s.split_whitespace()
        .max_by_key(|word| word.len())
        .unwrap_or("")
}
```
</details>

### Bài 3: Tính Tổng Đoạn Giữa

Viết hàm tính tổng các phần tử giữa (bỏ đầu, cuối):

```rust
fn main() {
    let numbers = vec![10, 20, 30, 40, 50];

    let tong = tong_phan_tu_giua(&numbers);

    println!("Tổng giữa: {}", tong); // 20 + 30 + 40 = 90
}

fn tong_phan_tu_giua(nums: &[i32]) -> i32 {
    // TODO: Bỏ phần tử đầu và cuối
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn tong_phan_tu_giua(nums: &[i32]) -> i32 {
    if nums.len() <= 2 {
        return 0;
    }
    nums[1..nums.len() - 1].iter().sum()
}
```
</details>

### Bài 4: Kiểm Tra Substring

```rust
fn main() {
    let text = "Hello Rust programming";

    println!("{}", chua_chuoi_con(text, "Rust"));  // true
    println!("{}", chua_chuoi_con(text, "Python")); // false
}

fn chua_chuoi_con(s: &str, sub: &str) -> bool {
    // TODO
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn chua_chuoi_con(s: &str, sub: &str) -> bool {
    s.contains(sub)
}
```
</details>

### Bài 5: Nhân Đôi Một Phần

Viết hàm nhân đôi phần tử từ index `start` đến `end`:

```rust
fn main() {
    let mut arr = [10, 20, 30, 40, 50];

    println!("Trước: {:?}", arr);

    nhan_doi_doan(&mut arr, 1, 4);

    println!("Sau: {:?}", arr); // [10, 40, 60, 80, 50]
}

fn nhan_doi_doan(arr: &mut [i32], start: usize, end: usize) {
    // TODO
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn nhan_doi_doan(arr: &mut [i32], start: usize, end: usize) {
    for num in &mut arr[start..end] {
        *num *= 2;
    }
}
```
</details>

## 🎯 Tóm Tắt

| Khái Niệm | Cú Pháp | Ý Nghĩa |
|-----------|---------|---------|
| **String Slice** | `&str` | Tham chiếu đến chuỗi |
| **Array Slice** | `&[T]` | Tham chiếu đến array/vec |
| **Toàn bộ** | `&s[..]` | Slice toàn bộ |
| **Từ đầu** | `&s[..n]` | Slice từ 0 đến n-1 |
| **Đến hết** | `&s[n..]` | Slice từ n đến hết |
| **Đoạn giữa** | `&s[a..b]` | Slice từ a đến b-1 |
| **Mutable Slice** | `&mut s[..]` | Slice có thể sửa |

**Quy tắc vàng**:
- ✅ Slice là borrow, không sở hữu
- ✅ Dùng `&str` thay vì `String` cho tham số hàm
- ✅ Dùng `&[T]` để làm việc với cả array và vec
- ✅ Cẩn thận với UTF-8 khi slice string
- ✅ Kiểm tra bounds để tránh panic

## 🔗 Liên Kết Hữu Ích

- [Rust Book - The Slice Type](https://doc.rust-lang.org/book/ch04-03-slices.html)
- [Rust By Example - Slices](https://doc.rust-lang.org/rust-by-example/primitives/array.html)

---

**Bài tiếp theo**: Lifetimes (Sắp ra mắt!)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **lifetimes** - cách Rust theo dõi thời gian sống của references!
