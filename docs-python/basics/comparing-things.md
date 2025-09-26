# ⚖️ So sánh mọi thứ - Dạy Python phân biệt lớn nhỏ

## 🎯 Bạn sẽ học được gì?

Trong bài học này, bạn sẽ học cách dạy con rắn Python so sánh và phân biệt mọi thứ! Giống như khi bạn so sánh chiều cao, cân nặng, điểm số, Python cũng có thể so sánh số, chữ và đưa ra kết luận đúng/sai.

:::tip 💡 Kiến thức cần có
Bạn nên đã hoàn thành:
- [Chương trình Python đầu tiên](./first-program.md)
- [Nhận thông tin từ người dùng](./getting-input.md)
- [Toán học cơ bản](./basic-math.md)
:::

## 🤔 Tại sao cần học so sánh?

Trong cuộc sống hàng ngày, bạn thường xuyên so sánh:
- 📏 "Tôi cao hơn bạn"
- 🎂 "Hôm nay là sinh nhật tôi" 
- 💰 "Tôi có đủ tiền mua kẹo không?"
- 🌡️ "Trời nóng quá, cần bật quạt"
- 📊 "Điểm tôi cao hơn lần trước"

Python cũng cần biết so sánh để đưa ra quyết định thông minh!

## ⚖️ Các toán tử so sánh

### Bảng toán tử so sánh trong Python

| Toán tử | Ý nghĩa | Ví dụ | Kết quả |
|---------|---------|--------|---------|
| `==` | Bằng nhau | `5 == 5` | `True` |
| `!=` | Không bằng | `5 != 3` | `True` |
| `>` | Lớn hơn | `7 > 4` | `True` |
| `<` | Nhỏ hơn | `3 < 8` | `True` |
| `>=` | Lớn hơn hoặc bằng | `5 >= 5` | `True` |
| `<=` | Nhỏ hơn hoặc bằng | `4 <= 6` | `True` |

### Kết quả so sánh: True hoặc False

```python
# So sánh số
print("5 == 5:", 5 == 5)    # True (đúng)
print("5 == 3:", 5 == 3)    # False (sai)
print("7 > 4:", 7 > 4)      # True (đúng)
print("3 > 8:", 3 > 8)      # False (sai)
```

**Kết quả:**
```
5 == 5: True
5 == 3: False
7 > 4: True
3 > 8: False
```

:::info 🔍 Giải thích
- `True` = Đúng, có thật
- `False` = Sai, không đúng
- Đây là kiểu dữ liệu Boolean (chỉ có 2 giá trị: True/False)
:::

## 🔢 So sánh số

### Ví dụ thực tế: So sánh tuổi

```python
"""
🎂 SO SÁNH TUỔI CỦA HAI BẠN 🎂
"""

print("👫 SO SÁNH TUỔI CỦA HAI BẠN")
print("=" * 35)

# Nhập thông tin hai bạn
ten_ban_1 = input("Tên bạn thứ nhất: ")
tuoi_ban_1 = int(input(f"Tuổi của {ten_ban_1}: "))

ten_ban_2 = input("Tên bạn thứ hai: ")
tuoi_ban_2 = int(input(f"Tuổi của {ten_ban_2}: "))

print(f"\n📊 KẾT QUẢ SO SÁNH:")
print(f"{ten_ban_1}: {tuoi_ban_1} tuổi")
print(f"{ten_ban_2}: {tuoi_ban_2} tuổi")

# Các phép so sánh
print(f"\n🔍 PHÂN TÍCH:")
print(f"{ten_ban_1} lớn tuổi hơn {ten_ban_2}: {tuoi_ban_1 > tuoi_ban_2}")
print(f"{ten_ban_1} nhỏ tuổi hơn {ten_ban_2}: {tuoi_ban_1 < tuoi_ban_2}")
print(f"{ten_ban_1} cùng tuổi với {ten_ban_2}: {tuoi_ban_1 == tuoi_ban_2}")
print(f"{ten_ban_1} khác tuổi với {ten_ban_2}: {tuoi_ban_1 != tuoi_ban_2}")
```

### Ví dụ: Kiểm tra đủ tuổi

```python
"""
🎫 KIỂM TRA ĐỦ TUỔI XEM PHIM 🎫
"""

print("🎬 RẠP CHIẾU PHIM PYTHON 🎬")
print("Phim hôm nay: Avengers (13+)")

tuoi = int(input("Bạn bao nhiêu tuổi? "))
tuoi_toi_thieu = 13

print(f"\nTuổi của bạn: {tuoi}")
print(f"Tuổi tối thiểu: {tuoi_toi_thieu}")

# Kiểm tra điều kiện
du_tuoi = tuoi >= tuoi_toi_thieu
print(f"Đủ tuổi xem phim: {du_tuoi}")

if du_tuoi:
    print("🎉 Chúc bạn xem phim vui vẻ!")
else:
    print("😅 Bạn chưa đủ tuổi. Hãy đợi thêm vài năm nữa nhé!")
```

## 🔤 So sánh chữ (String)

### So sánh tên và từ

```python
"""
📝 SO SÁNH TÊN VÀ TỪ 📝
"""

# So sánh tên
ten_1 = "Minh"
ten_2 = "Lan"
ten_3 = "Minh"

print("So sánh tên:")
print(f"'{ten_1}' == '{ten_2}': {ten_1 == ten_2}")  # False
print(f"'{ten_1}' == '{ten_3}': {ten_1 == ten_3}")  # True
print(f"'{ten_1}' != '{ten_2}': {ten_1 != ten_2}")  # True

# So sánh theo thứ tự ABC
print(f"\nSo sánh theo thứ tự ABC:")
print(f"'A' < 'B': {'A' < 'B'}")      # True
print(f"'apple' < 'banana': {'apple' < 'banana'}")  # True
print(f"'Minh' < 'Lan': {'Minh' < 'Lan'}")         # False (M > L)
```

### Ví dụ thực tế: Đăng nhập đơn giản

```python
"""
🔐 HỆ THỐNG ĐĂNG NHẬP ĐỠN GIẢN 🔐
"""

print("🔐 ĐĂNG NHẬP VÀO HỆ THỐNG")
print("=" * 30)

# Thông tin đăng nhập đúng
ten_dang_nhap_dung = "admin"
mat_khau_dung = "python123"

# Nhập thông tin từ người dùng
ten_dang_nhap = input("Tên đăng nhập: ")
mat_khau = input("Mật khẩu: ")

# Kiểm tra thông tin
ten_dung = ten_dang_nhap == ten_dang_nhap_dung
mat_khau_dung_check = mat_khau == mat_khau_dung

print(f"\n🔍 KẾT QUẢ KIỂM TRA:")
print(f"Tên đăng nhập đúng: {ten_dung}")
print(f"Mật khẩu đúng: {mat_khau_dung_check}")

# Kết luận
if ten_dung and mat_khau_dung_check:
    print("✅ Đăng nhập thành công! Chào mừng!")
else:
    print("❌ Thông tin đăng nhập sai!")
```

## 🧠 Kết hợp nhiều điều kiện

### Toán tử logic

| Toán tử | Ý nghĩa | Ví dụ | Kết quả |
|---------|---------|--------|---------|
| `and` | VÀ (cả hai đều đúng) | `True and True` | `True` |
| `or` | HOẶC (một trong hai đúng) | `True or False` | `True` |
| `not` | KHÔNG (đảo ngược) | `not True` | `False` |

### Ví dụ: Kiểm tra học sinh giỏi

```python
"""
🏆 KIỂM TRA HỌC SINH GIỎI 🏆
Điều kiện: Điểm TB >= 8.0 VÀ không có môn nào dưới 6.5
"""

print("🎓 KIỂM TRA HỌC SINH GIỎI 🎓")
print("=" * 35)

# Nhập điểm các môn
diem_toan = float(input("Điểm Toán: "))
diem_van = float(input("Điểm Văn: "))
diem_anh = float(input("Điểm Anh: "))

# Tính điểm trung bình
diem_tb = (diem_toan + diem_van + diem_anh) / 3

# Kiểm tra điều kiện
diem_tb_dat = diem_tb >= 8.0
khong_co_mon_yeu = (diem_toan >= 6.5) and (diem_van >= 6.5) and (diem_anh >= 6.5)

print(f"\n📊 KẾT QUẢ:")
print(f"Điểm trung bình: {diem_tb:.1f}")
print(f"Điểm TB đạt yêu cầu (>= 8.0): {diem_tb_dat}")
print(f"Không có môn yếu (< 6.5): {khong_co_mon_yeu}")

# Kết luận cuối cùng
hoc_sinh_gioi = diem_tb_dat and khong_co_mon_yeu
print(f"\n🏆 Học sinh giỏi: {hoc_sinh_gioi}")

if hoc_sinh_gioi:
    print("🎉 Chúc mừng! Bạn là học sinh giỏi!")
else:
    print("📚 Hãy cố gắng hơn nữa nhé!")
```

## 🎮 Ví dụ thực tế: Trò chơi đoán số

```python
"""
🎯 TRÒ CHƠI ĐOÁN SỐ NÂNG CAO 🎯
"""
import random

print("🎯 TRÒ CHƠI ĐOÁN SỐ NÂNG CAO 🎯")
print("=" * 40)
print("Tôi đang nghĩ về một số từ 1 đến 100")
print("Bạn có 7 lần đoán để tìm ra số đó!")

# Tạo số ngẫu nhiên
so_bi_mat = random.randint(1, 100)
so_lan_doan = 0
so_lan_toi_da = 7

while so_lan_doan < so_lan_toi_da:
    so_lan_doan += 1
    print(f"\n🔢 Lần đoán thứ {so_lan_doan}/{so_lan_toi_da}:")
    
    # Nhập số đoán
    try:
        so_doan = int(input("Bạn đoán số mấy? "))
    except:
        print("❌ Vui lòng nhập một số!")
        so_lan_doan -= 1  # Không tính lần đoán này
        continue
    
    # So sánh và đưa ra gợi ý
    if so_doan == so_bi_mat:
        print(f"🎉 CHÍNH XÁC! Số tôi nghĩ là {so_bi_mat}")
        print(f"🏆 Bạn đã đoán đúng trong {so_lan_doan} lần!")
        break
    elif so_doan < so_bi_mat:
        print("📈 Số tôi nghĩ LỚN HƠN số bạn đoán!")
        chenh_lech = so_bi_mat - so_doan
        if chenh_lech <= 5:
            print("🔥 Rất gần rồi!")
        elif chenh_lech <= 15:
            print("🎯 Khá gần!")
        else:
            print("❄️ Còn xa lắm!")
    else:  # so_doan > so_bi_mat
        print("📉 Số tôi nghĩ NHỎ HƠN số bạn đoán!")
        chenh_lech = so_doan - so_bi_mat
        if chenh_lech <= 5:
            print("🔥 Rất gần rồi!")
        elif chenh_lech <= 15:
            print("🎯 Khá gần!")
        else:
            print("❄️ Còn xa lắm!")
    
    # Kiểm tra còn lần đoán không
    so_lan_con_lai = so_lan_toi_da - so_lan_doan
    if so_lan_con_lai > 0:
        print(f"⏳ Còn {so_lan_con_lai} lần đoán!")
    else:
        print(f"💔 Hết lần đoán! Số tôi nghĩ là {so_bi_mat}")
        print("🎮 Chơi lại lần sau nhé!")
```

## 🎯 Thử thách thực hành

### Thử thách 1: Máy so sánh thông minh

```python
"""
🤖 MÁY SO SÁNH THÔNG MINH 🤖
Tạo chương trình so sánh 2 số và đưa ra nhận xét chi tiết
"""

# TODO: Viết chương trình:
# 1. Nhập 2 số từ người dùng
# 2. So sánh và cho biết số nào lớn hơn
# 3. Tính hiệu số (chênh lệch)
# 4. Cho biết chúng có cùng chẵn/lẻ không
# 5. Cho biết chúng có cùng số chữ số không
```

### Thử thách 2: Kiểm tra tam giác

```python
"""
📐 KIỂM TRA TAM GIÁC HỢP LỆ 📐
Kiểm tra 3 cạnh có tạo thành tam giác không
Quy tắc: Tổng 2 cạnh bất kỳ > cạnh còn lại
"""

# TODO: Viết chương trình:
# 1. Nhập 3 cạnh của tam giác
# 2. Kiểm tra quy tắc tam giác
# 3. Phân loại tam giác (đều, cân, vuông, thường)
# 4. Tính chu vi và diện tích (nếu hợp lệ)
```

### Thử thách 3: Hệ thống chấm điểm

```python
"""
🎯 HỆ THỐNG CHẤM ĐIỂM TỰ ĐỘNG 🎯
Chấm điểm bài kiểm tra trắc nghiệm
"""

# TODO: Viết chương trình:
# 1. Tạo đáp án đúng cho 10 câu hỏi
# 2. Nhập đáp án của học sinh
# 3. So sánh và tính số câu đúng
# 4. Tính điểm (thang 10)
# 5. Xếp loại kết quả
```

## ❗ Lỗi thường gặp và cách khắc phục

### Lỗi 1: Nhầm lẫn `=` và `==`

❌ **Sai:**
```python
if tuoi = 18:  # SyntaxError!
    print("Đủ tuổi")
```

✅ **Đúng:**
```python
if tuoi == 18:  # So sánh bằng
    print("Đủ tuổi")
```

:::warning ⚠️ Ghi nhớ
- `=` để **gán giá trị** cho biến
- `==` để **so sánh** hai giá trị
:::

### Lỗi 2: So sánh số và chữ

❌ **Có thể gây nhầm lẫn:**
```python
tuoi = input("Tuổi: ")  # tuoi là string "18"
if tuoi > 18:  # So sánh string, không phải số!
    print("Lớn tuổi")
```

✅ **Đúng:**
```python
tuoi = int(input("Tuổi: "))  # Chuyển thành số
if tuoi > 18:
    print("Lớn tuổi")
```

### Lỗi 3: So sánh số thập phân

❌ **Có thể không chính xác:**
```python
if 0.1 + 0.2 == 0.3:  # Có thể False do làm tròn!
    print("Bằng nhau")
```

✅ **Cách an toàn:**
```python
import math
if math.isclose(0.1 + 0.2, 0.3):
    print("Bằng nhau")
```

## 🎊 Tóm tắt bài học

🎉 Tuyệt vời! Bạn đã dạy Python cách so sánh và phân biệt mọi thứ!

### Bạn đã thành thạo:
- ✅ Các toán tử so sánh: `==`, `!=`, `>`, `<`, `>=`, `<=`
- ✅ Hiểu về giá trị Boolean: `True` và `False`
- ✅ So sánh số và chuỗi
- ✅ Kết hợp điều kiện với `and`, `or`, `not`
- ✅ Tạo chương trình có logic quyết định
- ✅ Xử lý các lỗi thường gặp

### Kiến thức quan trọng:
1. 🔍 **So sánh là nền tảng** của lập trình - giúp chương trình đưa ra quyết định
2. 📊 **True/False** là kết quả của mọi phép so sánh
3. ⚠️ **Cẩn thận với kiểu dữ liệu** - số và chữ so sánh khác nhau
4. 🧠 **Kết hợp điều kiện** để tạo logic phức tạp

### Bước tiếp theo:
Bây giờ bạn đã biết cách so sánh, chúng ta sẽ học cách sử dụng kết quả so sánh để **đưa ra quyết định** với câu lệnh `if/else` trong các bài học trung cấp!

---

:::tip 🤝 Cần trợ giúp?
- 👨‍👩‍👧‍👦 Thực hành so sánh với bố mẹ (chiều cao, tuổi tác...)
- 📚 Áp dụng vào bài tập toán ở trường
- 🎮 Tạo thêm trò chơi đoán số với gợi ý
- 🔍 Tìm hiểu về "Boolean logic" và "conditional statements"
:::

**Giờ đây Python đã biết phân biệt đúng sai! Đây là bước quan trọng để tạo ra những chương trình thông minh! 🐍⚖️✨**
