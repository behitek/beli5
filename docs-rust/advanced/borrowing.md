---
sidebar_position: 2
title: "Mượn Dữ Liệu: Borrowing"
description: "Tìm hiểu cách mượn dữ liệu trong Rust với references và borrowing rules"
---

# 🔄 Mượn Dữ Liệu: Borrowing

## 🎯 Mục Tiêu Bài Học

Sau khi hoàn thành bài học này, bạn sẽ:

- ✅ Hiểu được borrowing (mượn) trong Rust là gì
- ✅ Sử dụng immutable references (`&T`)
- ✅ Sử dụng mutable references (`&mut T`)
- ✅ Nắm vững quy tắc "một &mut HOẶC nhiều &"
- ✅ Tránh được lỗi borrow checker thường gặp
- ✅ Hiểu lifetime của references

## 🤔 Borrowing Là Gì?

### Ẩn Dụ Cuộc Sống: Mượn Sách

**Borrowing** giống như việc **mượn sách từ bạn**:

🎒 **Ownership (Sở Hữu)**:
- **Bạn sở hữu cuốn sách** → Bạn có thể làm gì tùy thích
- Cho đi, viết vào, bán, giữ lại

📖 **Immutable Borrow (Mượn Đọc)**:
- **Cho nhiều người mượn đọc cùng lúc** → Tất cả chỉ đọc, không sửa
- An toàn vì không ai thay đổi nội dung
- Nhiều người có thể đọc đồng thời

✏️ **Mutable Borrow (Mượn Ghi)**:
- **Chỉ cho 1 người mượn để viết thêm** → Người đó có thể sửa đổi
- Không cho ai khác đọc hoặc viết trong lúc đó
- Tránh xung đột khi sửa đổi

### Tại Sao Cần Borrowing?

```rust
fn main() {
    let s = String::from("xin chào");

    // ❌ Không dùng borrowing - ownership bị move
    in_chuoi(s);
    // println!("{}", s); // Lỗi! s đã bị move

    // ✅ Dùng borrowing - vẫn giữ ownership
    let s2 = String::from("xin chào");
    in_chuoi_borrowed(&s2);
    println!("{}", s2); // OK! s2 vẫn dùng được
}

fn in_chuoi(s: String) {
    println!("{}", s);
}

fn in_chuoi_borrowed(s: &String) {
    println!("{}", s);
}
```

**Lợi ích**:
- ✅ Không mất ownership
- ✅ Không cần clone (tiết kiệm bộ nhớ)
- ✅ An toàn với borrow checker

## 📖 Immutable References (`&T`)

### Cú Pháp Cơ Bản

```rust
fn main() {
    let s = String::from("hello");

    // Tạo reference
    let r = &s;

    println!("s: {}", s);  // OK
    println!("r: {}", r);  // OK
}
```

**Giải thích**:
- `&s` → Tạo reference đến `s`
- `r` → Chứa địa chỉ của `s`, không sở hữu giá trị
- Cả `s` và `r` đều có thể đọc

### Nhiều Immutable References

```rust
fn main() {
    let s = String::from("Rust");

    let r1 = &s;
    let r2 = &s;
    let r3 = &s;

    println!("{} {} {}", r1, r2, r3); // Tất cả OK!
}
```

**Quy tắc**: **Có thể có NHIỀU immutable references cùng lúc**

### Truyền Reference Vào Function

```rust
fn main() {
    let text = String::from("Hello Rust");

    let len = tinh_do_dai(&text);
    println!("Độ dài của '{}' là {}", text, len);
}

fn tinh_do_dai(s: &String) -> usize {
    s.len()
}
```

**Ưu điểm**:
- `text` không bị move
- `tinh_do_dai` chỉ mượn để đọc
- Sau khi gọi hàm, `text` vẫn dùng được

### Reference Trong Struct

```rust
// Sai - cần lifetime annotation
// struct NguoiDoc {
//     ten_sach: &String,  // Lỗi!
// }

// Đúng - sẽ học ở bài lifetime
struct NguoiDoc<'a> {
    ten_sach: &'a String,
}

fn main() {
    let sach = String::from("Rust Programming");
    let doc_gia = NguoiDoc { ten_sach: &sach };

    println!("Đang đọc: {}", doc_gia.ten_sach);
}
```

## ✏️ Mutable References (`&mut T`)

### Cú Pháp Cơ Bản

```rust
fn main() {
    let mut s = String::from("hello");

    // Tạo mutable reference
    let r = &mut s;

    r.push_str(", world");

    println!("{}", r); // "hello, world"
}
```

**Chú ý**:
- Biến gốc phải là `mut`
- Dùng `&mut s` để tạo mutable reference
- `r` có thể sửa đổi giá trị của `s`

### Sử Dụng Trong Function

```rust
fn main() {
    let mut s = String::from("hello");

    them_cham_than(&mut s);

    println!("{}", s); // "hello!!!"
}

fn them_cham_than(s: &mut String) {
    s.push_str("!!!");
}
```

**Giải thích**:
- `them_cham_than` mượn `s` với quyền sửa đổi
- Sau khi gọi, `s` bị thay đổi
- Không cần return vì sửa trực tiếp

### Quy Tắc Quan Trọng: Một `&mut` HOẶC Nhiều `&`

```rust
fn main() {
    let mut s = String::from("hello");

    // ✅ OK - chỉ một &mut
    let r1 = &mut s;
    r1.push_str(" world");
    println!("{}", r1);
}
```

```rust
fn main() {
    let mut s = String::from("hello");

    // ❌ Lỗi - hai &mut cùng lúc
    let r1 = &mut s;
    let r2 = &mut s;  // Lỗi!

    println!("{} {}", r1, r2);
}
```

**Lỗi**:
```
error[E0499]: cannot borrow `s` as mutable more than once at a time
```

### Không Thể Trộn `&` Và `&mut`

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;      // OK
    let r2 = &s;      // OK
    let r3 = &mut s;  // ❌ Lỗi!

    println!("{} {} {}", r1, r2, r3);
}
```

**Lỗi**:
```
error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
```

**Giải thích**:
- `r1` và `r2` đang đọc
- `r3` muốn sửa
- Rust không cho phép vì người đang đọc có thể thấy dữ liệu thay đổi bất ngờ!

## 🔍 Scope Của References

### Non-Lexical Lifetimes (NLL)

Từ Rust 2018, borrow checker thông minh hơn:

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;
    let r2 = &s;
    println!("{} {}", r1, r2);
    // r1 và r2 không dùng nữa sau đây

    let r3 = &mut s;  // ✅ OK!
    r3.push_str(" world");
    println!("{}", r3);
}
```

**Giải thích**:
- `r1` và `r2` chỉ sống đến `println!`
- Sau đó không dùng nữa
- `r3` được phép tạo vì không còn immutable reference

### Ví Dụ Lỗi

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;
    let r2 = &mut s;  // ❌ Lỗi!

    println!("{} {}", r1, r2); // r1 vẫn còn dùng
}
```

## 🎯 Ví Dụ Thực Tế

### Ví Dụ 1: Đếm Từ Trong Chuỗi

```rust
fn main() {
    let van_ban = String::from("Rust là ngôn ngữ lập trình an toàn");

    let so_tu = dem_tu(&van_ban);

    println!("'{}' có {} từ", van_ban, so_tu);
}

fn dem_tu(s: &String) -> usize {
    s.split_whitespace().count()
}
```

**Đầu ra**:
```
'Rust là ngôn ngữ lập trình an toàn' có 7 từ
```

### Ví Dụ 2: Thêm Tiền Tố

```rust
fn main() {
    let mut cau_chao = String::from("chào bạn!");

    println!("Trước: {}", cau_chao);

    them_tien_to(&mut cau_chao, "Xin ");

    println!("Sau: {}", cau_chao);
}

fn them_tien_to(s: &mut String, prefix: &str) {
    s.insert_str(0, prefix);
}
```

**Đầu ra**:
```
Trước: chào bạn!
Sau: Xin chào bạn!
```

### Ví Dụ 3: Đọc Và Ghi

```rust
fn main() {
    let mut danh_sach = vec![
        String::from("An"),
        String::from("Bình"),
        String::from("Chi"),
    ];

    // Đọc
    in_danh_sach(&danh_sach);

    // Sửa
    them_ten(&mut danh_sach, String::from("Dũng"));

    // Đọc lại
    in_danh_sach(&danh_sach);
}

fn in_danh_sach(ds: &Vec<String>) {
    println!("Danh sách:");
    for ten in ds {
        println!("  - {}", ten);
    }
}

fn them_ten(ds: &mut Vec<String>, ten: String) {
    ds.push(ten);
}
```

**Đầu ra**:
```
Danh sách:
  - An
  - Bình
  - Chi
Danh sách:
  - An
  - Bình
  - Chi
  - Dũng
```

### Ví Dụ 4: Tính Toán Phức Tạp

```rust
struct ThongKe {
    tong: i32,
    trung_binh: f64,
    max: i32,
    min: i32,
}

fn main() {
    let diem = vec![85, 92, 78, 95, 88];

    let tk = tinh_thong_ke(&diem);

    println!("Tổng: {}", tk.tong);
    println!("Trung bình: {:.2}", tk.trung_binh);
    println!("Cao nhất: {}", tk.max);
    println!("Thấp nhất: {}", tk.min);
}

fn tinh_thong_ke(diem: &Vec<i32>) -> ThongKe {
    let tong: i32 = diem.iter().sum();
    let trung_binh = tong as f64 / diem.len() as f64;
    let max = *diem.iter().max().unwrap();
    let min = *diem.iter().min().unwrap();

    ThongKe {
        tong,
        trung_binh,
        max,
        min,
    }
}
```

**Đầu ra**:
```
Tổng: 438
Trung bình: 87.60
Cao nhất: 95
Thấp nhất: 78
```

## 🚫 Lỗi Thường Gặp

### Lỗi 1: Dangling Reference

```rust
// ❌ Lỗi - reference đến giá trị đã bị drop
fn tao_string() -> &String {
    let s = String::from("hello");
    &s  // Lỗi! s sẽ bị drop khi ra khỏi hàm
}
```

**Sửa**:
```rust
// ✅ Trả về ownership
fn tao_string() -> String {
    let s = String::from("hello");
    s
}
```

### Lỗi 2: Hai Mutable References

```rust
fn main() {
    let mut s = String::from("hello");

    // ❌ Lỗi
    let r1 = &mut s;
    let r2 = &mut s;

    r1.push_str(" world");
    r2.push_str("!!!");
}
```

**Sửa**:
```rust
fn main() {
    let mut s = String::from("hello");

    // ✅ Dùng scope để tách biệt
    {
        let r1 = &mut s;
        r1.push_str(" world");
    } // r1 hết scope

    {
        let r2 = &mut s;
        r2.push_str("!!!");
    } // r2 hết scope

    println!("{}", s);
}
```

### Lỗi 3: Trộn Immutable Và Mutable

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;

    // ❌ Lỗi - đang có immutable borrow
    s.push_str(" world");

    println!("{}", r1);
}
```

**Sửa**:
```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;
    println!("{}", r1); // Dùng r1 xong
    // r1 hết scope

    s.push_str(" world"); // ✅ OK

    println!("{}", s);
}
```

### Lỗi 4: Reference Đến Temporary Value

```rust
fn main() {
    // ❌ Lỗi
    let r = &String::from("hello");
    println!("{}", r);
}
```

**Sửa**:
```rust
fn main() {
    // ✅ Lưu vào biến trước
    let s = String::from("hello");
    let r = &s;
    println!("{}", r);
}
```

## 🎓 Quy Tắc Borrowing (Tổng Kết)

### Quy Tắc 1: Số Lượng References

Tại một thời điểm, bạn có thể có:

- **MỘT mutable reference (`&mut T`)**
- HOẶC
- **NHIỀU immutable references (`&T`)**

```rust
// ✅ Một &mut
let r = &mut s;

// ✅ Nhiều &
let r1 = &s;
let r2 = &s;
let r3 = &s;

// ❌ Không được trộn
let r1 = &s;
let r2 = &mut s; // Lỗi!
```

### Quy Tắc 2: Scope Của References

References phải luôn valid:

```rust
// ❌ Lỗi - s bị drop trước khi r dùng
{
    let r;
    {
        let s = String::from("hello");
        r = &s;
    } // s drop ở đây
    println!("{}", r); // Lỗi!
}

// ✅ OK - s sống đủ lâu
{
    let s = String::from("hello");
    let r = &s;
    println!("{}", r);
} // s và r cùng drop
```

### Quy Tắc 3: Không Dangling References

Rust không cho phép reference đến giá trị đã bị drop:

```rust
// ❌ Lỗi
fn dang() -> &String {
    let s = String::from("hello");
    &s  // Lỗi! s drop khi ra khỏi hàm
}

// ✅ Trả về ownership
fn ok() -> String {
    String::from("hello")
}
```

## 💻 Bài Tập Thực Hành

### Bài 1: Đọc Thông Tin

Viết hàm nhận reference đến `Vec<i32>` và in ra tổng, trung bình:

```rust
fn main() {
    let numbers = vec![10, 20, 30, 40, 50];
    in_thong_tin(&numbers);
    println!("Vector vẫn dùng được: {:?}", numbers);
}

fn in_thong_tin(nums: &Vec<i32>) {
    // TODO: Tính và in tổng, trung bình
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn in_thong_tin(nums: &Vec<i32>) {
    let tong: i32 = nums.iter().sum();
    let trung_binh = tong as f64 / nums.len() as f64;

    println!("Tổng: {}", tong);
    println!("Trung bình: {:.2}", trung_binh);
}
```
</details>

### Bài 2: Sửa Đổi Vector

Viết hàm nhận mutable reference và nhân đôi tất cả phần tử:

```rust
fn main() {
    let mut numbers = vec![1, 2, 3, 4, 5];
    println!("Trước: {:?}", numbers);

    nhan_doi(&mut numbers);

    println!("Sau: {:?}", numbers);
}

fn nhan_doi(nums: &mut Vec<i32>) {
    // TODO: Nhân đôi từng phần tử
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn nhan_doi(nums: &mut Vec<i32>) {
    for num in nums.iter_mut() {
        *num *= 2;
    }
}
```
</details>

### Bài 3: Tìm Từ Dài Nhất

Viết hàm tìm từ dài nhất trong chuỗi:

```rust
fn main() {
    let text = "Rust là ngôn ngữ lập trình an toàn";

    match tim_tu_dai_nhat(&text) {
        Some(tu) => println!("Từ dài nhất: {}", tu),
        None => println!("Không có từ nào"),
    }
}

fn tim_tu_dai_nhat(s: &str) -> Option<&str> {
    // TODO: Tìm từ dài nhất
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn tim_tu_dai_nhat(s: &str) -> Option<&str> {
    s.split_whitespace()
        .max_by_key(|word| word.len())
}
```
</details>

### Bài 4: Cập Nhật Struct

```rust
struct HocSinh {
    ten: String,
    diem: i32,
}

fn main() {
    let mut hs = HocSinh {
        ten: String::from("An"),
        diem: 80,
    };

    println!("Trước: {} - {}", hs.ten, hs.diem);

    tang_diem(&mut hs, 10);

    println!("Sau: {} - {}", hs.ten, hs.diem);
}

fn tang_diem(hs: &mut HocSinh, tang: i32) {
    // TODO: Tăng điểm
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn tang_diem(hs: &mut HocSinh, tang: i32) {
    hs.diem += tang;
}
```
</details>

### Bài 5: Xử Lý Phức Tạp

Viết các hàm xử lý danh sách học sinh:

```rust
struct HocSinh {
    ten: String,
    diem: i32,
}

fn main() {
    let mut danh_sach = vec![
        HocSinh { ten: String::from("An"), diem: 85 },
        HocSinh { ten: String::from("Bình"), diem: 70 },
        HocSinh { ten: String::from("Chi"), diem: 92 },
    ];

    // Đọc
    let tb = tinh_trung_binh(&danh_sach);
    println!("Điểm trung bình: {:.2}", tb);

    // Sửa
    cong_diem_tat_ca(&mut danh_sach, 5);

    // Đọc lại
    let tb2 = tinh_trung_binh(&danh_sach);
    println!("Sau khi cộng: {:.2}", tb2);
}

fn tinh_trung_binh(ds: &Vec<HocSinh>) -> f64 {
    // TODO
}

fn cong_diem_tat_ca(ds: &mut Vec<HocSinh>, cong: i32) {
    // TODO
}
```

<details>
<summary>💡 Gợi ý</summary>

```rust
fn tinh_trung_binh(ds: &Vec<HocSinh>) -> f64 {
    let tong: i32 = ds.iter().map(|hs| hs.diem).sum();
    tong as f64 / ds.len() as f64
}

fn cong_diem_tat_ca(ds: &mut Vec<HocSinh>, cong: i32) {
    for hs in ds.iter_mut() {
        hs.diem += cong;
    }
}
```
</details>

## 🎯 Tóm Tắt

| Khái Niệm | Cú Pháp | Quy Tắc |
|-----------|---------|---------|
| **Immutable Borrow** | `&T` | Nhiều `&` cùng lúc OK |
| **Mutable Borrow** | `&mut T` | Chỉ một `&mut`, không có `&` khác |
| **Dereferencing** | `*r` | Truy cập giá trị qua reference |
| **Scope** | `{ }` | Reference phải valid trong scope |
| **NLL** | Tự động | Borrow checker thông minh từ Rust 2018 |

**Quy tắc vàng**:
- ✅ Một `&mut` HOẶC nhiều `&`
- ✅ References luôn valid
- ✅ Không dangling references

## 🔗 Liên Kết Hữu Ích

- [Rust Book - References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)
- [Rust By Example - Borrowing](https://doc.rust-lang.org/rust-by-example/scope/borrow.html)

---

**Bài tiếp theo**: [Slices →](./slices.md)

Trong bài tiếp theo, chúng ta sẽ tìm hiểu về **slices** - cách để tham chiếu đến một phần của collection!
