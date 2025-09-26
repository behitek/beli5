# 📝 Ghi chú trong code - Viết nhật ký cho con rắn Python

## 🎯 Bạn sẽ học được gì?

Trong bài học này, bạn sẽ học cách viết "ghi chú" trong code - giống như viết nhật ký để nhớ những gì bạn đã làm! Điều này giúp bạn và người khác hiểu code dễ dàng hơn, đặc biệt khi quay lại xem sau một thời gian dài.

:::tip 💡 Kiến thức cần có
Bạn nên đã hoàn thành:
- [Chương trình Python đầu tiên](./first-program.md)
- [In thông điệp](./printing-messages.md)
- [Nhận thông tin từ người dùng](./getting-input.md)
:::

## 🤔 Tại sao cần viết ghi chú trong code?

Hãy tưởng tượng bạn viết một cuốn sách mà không có:
- 📖 Tiêu đề chương
- 📝 Ghi chú bên lề
- 💭 Giải thích ý nghĩa
- 🗂️ Mục lục

Sẽ rất khó hiểu phải không? Code cũng vậy!

### 🐍 Ví dụ với con rắn thông minh
Tưởng tượng bạn dạy con rắn Python làm nhiều việc, nhưng không ghi chú lại:
- 6 tháng sau, bạn quên mình đã dạy nó làm gì
- Bạn bè không hiểu con rắn đang làm gì
- Khi muốn sửa đổi, bạn phải đoán lại từ đầu

## 📝 Cách viết ghi chú trong Python

### Ghi chú một dòng với `#`

```python
# Đây là một ghi chú
print("Xin chào!")  # Ghi chú ở cuối dòng
```

:::info 🔍 Giải thích
- Mọi thứ sau dấu `#` sẽ bị Python bỏ qua
- Ghi chú có thể viết ở đầu dòng hoặc cuối dòng
- Ghi chú chỉ dành cho con người đọc, không phải máy tính
:::

### Ghi chú nhiều dòng với `"""`

```python
"""
Đây là ghi chú nhiều dòng.
Tôi có thể viết rất nhiều ở đây.
Thường dùng để giải thích chương trình lớn.
"""
print("Xin chào!")
```

## 🎨 Các loại ghi chú hữu ích

### 1. Ghi chú mô tả chương trình

```python
# Chương trình: Máy tính đơn giản
# Tác giả: Nguyễn Văn A
# Ngày tạo: 26/09/2025
# Mục đích: Cộng hai số do người dùng nhập

print("🧮 Máy tính của tôi 🧮")
so_a = int(input("Số thứ nhất: "))
so_b = int(input("Số thứ hai: "))
ket_qua = so_a + so_b
print("Kết quả:", ket_qua)
```

### 2. Ghi chú giải thích từng bước

```python
# Bước 1: Chào hỏi người dùng
print("Xin chào! Tôi sẽ đoán tuổi của bạn!")

# Bước 2: Hỏi năm sinh
nam_sinh = int(input("Bạn sinh năm nào? "))

# Bước 3: Tính tuổi (năm hiện tại là 2025)
tuoi = 2025 - nam_sinh

# Bước 4: Thông báo kết quả
print("Bạn", tuoi, "tuổi!")
```

### 3. Ghi chú cảnh báo và lưu ý

```python
# ⚠️ CẢNH BÁO: Code này chỉ hoạt động với số nguyên dương
so = int(input("Nhập một số: "))

# TODO: Sau này cần thêm kiểm tra số âm
# FIXME: Chưa xử lý trường hợp nhập chữ
if so > 0:
    print("Số dương!")
else:
    print("Số không dương!")
```

### 4. Ghi chú giải thích công thức phức tạp

```python
# Công thức tính diện tích hình tròn: S = π × r²
import math

ban_kinh = float(input("Bán kính hình tròn: "))

# math.pi = 3.14159... (số pi chính xác)
# ** 2 có nghĩa là "lũy thừa 2" (bình phương)
dien_tich = math.pi * (ban_kinh ** 2)

print(f"Diện tích: {dien_tich:.2f} cm²")
```

## 🎯 Ví dụ thực tế: Chương trình hoàn chỉnh

```python
"""
🎮 TRÒ CHƠI ĐOÁN TUỔI THÔNG MINH
================================
Mô tả: Chương trình sẽ đoán tuổi người dùng bằng cách hỏi năm sinh
Tác giả: Học sinh lớp Python ELI5
Ngày tạo: 26/09/2025
Phiên bản: 1.0

Cách chơi:
1. Người dùng nhập năm sinh
2. Chương trình tính tuổi
3. Đưa ra nhận xét về độ tuổi
"""

# === PHẦN 1: GIỚI THIỆU GAME ===
print("🎮 TRÒ CHƠI ĐOÁN TUỔI THÔNG MINH 🎮")
print("=" * 40)
print("Tôi sẽ đoán tuổi của bạn một cách chính xác!")
print()

# === PHẦN 2: NHẬN THÔNG TIN ===
ten = input("Tên của bạn là gì? ")
print(f"Xin chào {ten}! Rất vui được gặp bạn!")

# Nhập năm sinh (giả sử người dùng nhập đúng)
nam_sinh = int(input("Bạn sinh năm nào? "))

# === PHẦN 3: TÍNH TOÁN ===
nam_hien_tai = 2025  # Có thể thay đổi theo năm thực tế
tuoi = nam_hien_tai - nam_sinh

# === PHẦN 4: PHÂN TÍCH KẾT QUẢ ===
print()
print("🔍 KẾT QUẢ PHÂN TÍCH:")
print(f"Năm sinh: {nam_sinh}")
print(f"Năm hiện tại: {nam_hien_tai}")
print(f"Tuổi của {ten}: {tuoi} tuổi")

# Đưa ra nhận xét dựa trên tuổi
if tuoi < 10:
    nhan_xet = "Bạn còn rất nhỏ! Hãy tận hưởng tuổi thơ nhé! 👶"
elif tuoi < 18:
    nhan_xet = "Bạn đang ở tuổi học trò! Chăm chỉ học hành nhé! 📚"
elif tuoi < 30:
    nhan_xet = "Bạn đang ở độ tuổi thanh niên! Tràn đầy năng lượng! ⚡"
else:
    nhan_xet = "Bạn đã có nhiều kinh nghiệm sống! Tuyệt vời! 🌟"

print(f"Nhận xét: {nhan_xet}")

# === PHẦN 5: KẾT THÚC ===
print()
print("🎉 Cảm ơn bạn đã chơi game!")
print("Hẹn gặp lại lần sau! 👋")

# Ghi chú cho người phát triển:
# - Có thể thêm kiểm tra năm sinh hợp lệ
# - Có thể lấy năm hiện tại tự động
# - Có thể thêm nhiều nhận xét thú vị hơn
```

## 🎨 Trang trí ghi chú đẹp mắt

### Sử dụng ký tự đặc biệt

```python
# ====================================
# 🐍 CHƯƠNG TRÌNH PYTHON TUYỆT VỜI 🐍
# ====================================

# *** PHẦN CHÍNH ***
print("Xin chào!")

# --- Kết thúc phần chính ---

# ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
# ░ Đây là vùng code thử nghiệm     ░
# ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

### Tạo mục lục cho code dài

```python
"""
📚 MỤC LỤC CHƯƠNG TRÌNH:
========================
1. Khai báo biến và hằng số (dòng 15-25)
2. Hàm xử lý đầu vào (dòng 26-40)
3. Hàm tính toán chính (dòng 41-60)
4. Hàm hiển thị kết quả (dòng 61-75)
5. Chương trình chính (dòng 76-90)
"""

# 1. KHAI BÁO BIẾN VÀ HẰNG SỐ
PI = 3.14159  # Hằng số Pi
# ... code ...

# 2. HÀM XỬ LÝ ĐẦU VÀO
def nhap_du_lieu():
    # ... code ...
    pass

# 3. HÀM TÍNH TOÁN CHÍNH
def tinh_toan():
    # ... code ...
    pass
```

## 🚫 Những gì KHÔNG nên làm với ghi chú

### ❌ Ghi chú thừa thãi

```python
# In ra chữ "Xin chào"
print("Xin chào")  # Lệnh print để in ra màn hình

# Tăng biến i lên 1
i = i + 1  # Cộng 1 vào biến i
```

:::warning ⚠️ Tại sao không tốt?
Ghi chú này chỉ lặp lại những gì code đã nói rõ, không mang thêm thông tin hữu ích.
:::

### ❌ Ghi chú sai hoặc cũ

```python
# Tính diện tích hình vuông
dien_tich = 3.14 * ban_kinh * ban_kinh  # Thực ra đang tính diện tích hình tròn!
```

### ❌ Ghi chú quá dài và phức tạp

```python
# Đây là một chương trình rất phức tạp được viết bởi tôi vào ngày hôm qua sau khi tôi đã học Python được 3 tuần và tôi nghĩ rằng nó sẽ rất hữu ích cho mọi người...
print("Hello")  # Code đơn giản nhưng ghi chú quá dài!
```

## ✅ Ghi chú tốt là gì?

### 1. Giải thích "TẠI SAO", không phải "LÀM GÌ"

✅ **Tốt:**
```python
# Sử dụng công thức Heron để tính diện tích tam giác
# vì không biết chiều cao
s = (a + b + c) / 2
dien_tich = math.sqrt(s * (s-a) * (s-b) * (s-c))
```

❌ **Không tốt:**
```python
# Chia tổng cho 2
s = (a + b + c) / 2
# Tính căn bậc hai
dien_tich = math.sqrt(s * (s-a) * (s-b) * (s-c))
```

### 2. Cảnh báo về những điều đặc biệt

```python
# QUAN TRỌNG: Hàm này chỉ hoạt động với số dương
def tinh_can_bac_hai(so):
    return math.sqrt(so)

# BUG: Chưa xử lý trường hợp chia cho 0
ket_qua = a / b
```

### 3. Ghi lại nguồn tham khảo

```python
# Công thức từ: https://vi.wikipedia.org/wiki/Công_thức_Heron
# Được phát minh bởi Heron of Alexandria (khoảng 60 AD)
dien_tich = math.sqrt(s * (s-a) * (s-b) * (s-c))
```

## 🎯 Thử thách thực hành

### Thử thách 1: Thêm ghi chú vào code cũ

Lấy một chương trình bạn đã viết trước đây và thêm ghi chú chi tiết:

```python
# Thêm ghi chú vào chương trình này:
ten = input("Tên: ")
tuoi = int(input("Tuổi: "))
if tuoi >= 18:
    print("Bạn đã trưởng thành")
else:
    print("Bạn còn nhỏ")
```

### Thử thách 2: Tạo chương trình với ghi chú hoàn chỉnh

Viết chương trình tính điểm trung bình với ghi chú đầy đủ:

```python
"""
Chương trình tính điểm trung bình học kỳ
Yêu cầu: Nhập điểm 5 môn, tính trung bình và xếp loại
"""

# TODO: Thêm code ở đây với ghi chú chi tiết
```

### Thử thách 3: Sửa ghi chú sai

Tìm và sửa những ghi chú sai trong code này:

```python
# Tính chu vi hình tròn
dien_tich = 3.14 * r * r

# Kiểm tra số chẵn
if so % 2 == 1:
    print("Số lẻ")

# Chuyển đổi từ độ C sang độ F
fahrenheit = celsius * 9/5 + 32
```

## 🎊 Tóm tắt bài học

🎉 Tuyệt vời! Bạn đã học được cách viết ghi chú như một lập trình viên chuyên nghiệp!

### Bạn đã thành thạo:
- ✅ Sử dụng `#` cho ghi chú một dòng
- ✅ Sử dụng `"""` cho ghi chú nhiều dòng
- ✅ Viết ghi chú mô tả chương trình
- ✅ Giải thích từng bước logic
- ✅ Cảnh báo và ghi chú quan trọng
- ✅ Trang trí ghi chú đẹp mắt
- ✅ Phân biệt ghi chú tốt và xấu

### Lời khuyên từ các lập trình viên chuyên nghiệp:
1. 📝 **Viết ghi chú ngay khi viết code**, đừng để sau
2. 🤔 **Giải thích "tại sao"**, không chỉ "làm gì"
3. 🔄 **Cập nhật ghi chú** khi thay đổi code
4. 👥 **Viết cho người khác đọc**, kể cả "bản thân tương lai"
5. ⚖️ **Cân bằng**: Đủ chi tiết nhưng không quá dài dòng

### Bước tiếp theo:
Trong bài học tiếp theo, chúng ta sẽ học cách làm **toán học** với Python - cộng, trừ, nhân, chia và nhiều hơn nữa!

---

:::tip 🤝 Cần trợ giúp?
- 👨‍👩‍👧‍👦 Nhờ bố mẹ đọc ghi chú của bạn xem có hiểu không
- 📚 Đọc lại code cũ và thêm ghi chú
- 💭 Tập thói quen viết ghi chú ngay từ bây giờ
- 🔍 Xem code của các lập trình viên khác để học cách viết ghi chú hay
:::

**Hãy luôn nhớ: Code tốt là code mà người khác (và chính bạn sau 6 tháng) có thể hiểu được! 🐍📝**
