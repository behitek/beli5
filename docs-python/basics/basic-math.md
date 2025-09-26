# 🧮 Toán học cơ bản với Python - Biến Python thành máy tính siêu thông minh

## 🎯 Bạn sẽ học được gì?

Trong bài học này, bạn sẽ khám phá cách biến con rắn Python thành một máy tính siêu thông minh! Từ phép cộng đơn giản đến những phép toán phức tạp, Python sẽ giúp bạn giải quyết mọi bài toán một cách nhanh chóng và chính xác.

:::tip 💡 Kiến thức cần có
Bạn nên đã hoàn thành:
- [Chương trình Python đầu tiên](./first-program.md)
- [Nhận thông tin từ người dùng](./getting-input.md)
- [Ghi chú trong code](./comments.md)
:::

## 🤔 Tại sao Python lại giỏi toán?

Hãy tưởng tượng bạn có một người bạn thông minh có thể:
- 🔢 Tính toán nhanh như máy tính
- 📊 Nhớ kết quả để sử dụng sau
- 🎯 Không bao giờ mắc lỗi tính toán
- 🌟 Làm được cả những phép toán phức tạp

Đó chính là con rắn Python của bạn!

## ➕ Các phép toán cơ bản

### Bảng phép toán trong Python

| Phép toán | Ký hiệu | Ví dụ | Kết quả |
|-----------|---------|-------|---------|
| Cộng | `+` | `5 + 3` | `8` |
| Trừ | `-` | `10 - 4` | `6` |
| Nhân | `*` | `6 * 7` | `42` |
| Chia | `/` | `15 / 3` | `5.0` |
| Chia lấy phần nguyên | `//` | `17 // 5` | `3` |
| Chia lấy phần dư | `%` | `17 % 5` | `2` |
| Lũy thừa | `**` | `2 ** 3` | `8` |

### Thử nghiệm ngay!

```python
# Phép cộng - Ghép hai số lại với nhau
print("5 + 3 =", 5 + 3)

# Phép trừ - Lấy đi một phần
print("10 - 4 =", 10 - 4)

# Phép nhân - Cộng nhiều lần
print("6 × 7 =", 6 * 7)

# Phép chia - Chia đều ra
print("15 ÷ 3 =", 15 / 3)
```

**Kết quả:**
```
5 + 3 = 8
10 - 4 = 6
6 × 7 = 42
15 ÷ 3 = 5.0
```

## 🎨 Ví dụ thực tế với toán học

### 1. Tính tiền mua kẹo

```python
"""
🍬 TÍNH TIỀN MUA KẸO 🍬
Bài toán: Mỗi cái kẹo giá 2000đ. Bạn mua 5 cái. Hết bao nhiêu tiền?
"""

gia_moi_cai_keo = 2000  # đồng
so_luong_keo = 5        # cái

# Tính tổng tiền
tong_tien = gia_moi_cai_keo * so_luong_keo

print(f"Giá mỗi cái kẹo: {gia_moi_cai_keo:,}đ")
print(f"Số lượng mua: {so_luong_keo} cái")
print(f"Tổng tiền phải trả: {tong_tien:,}đ")
```

### 2. Tính điểm trung bình

```python
"""
📚 TÍNH ĐIỂM TRUNG BÌNH 📚
Bài toán: Tính điểm trung bình của 4 môn học
"""

print("🎓 TÍNH ĐIỂM TRUNG BÌNH 🎓")
print("Nhập điểm 4 môn học của bạn:")

# Nhập điểm các môn
diem_toan = float(input("Điểm Toán: "))
diem_van = float(input("Điểm Văn: "))
diem_anh = float(input("Điểm Anh: "))
diem_ly = float(input("Điểm Lý: "))

# Tính tổng điểm và trung bình
tong_diem = diem_toan + diem_van + diem_anh + diem_ly
diem_trung_binh = tong_diem / 4

# Hiển thị kết quả
print(f"\n📊 KẾT QUẢ:")
print(f"Tổng điểm: {tong_diem}")
print(f"Điểm trung bình: {diem_trung_binh:.1f}")

# Xếp loại
if diem_trung_binh >= 8.5:
    print("🏆 Xếp loại: Giỏi")
elif diem_trung_binh >= 7.0:
    print("🥈 Xếp loại: Khá")
elif diem_trung_binh >= 5.5:
    print("🥉 Xếp loại: Trung bình")
else:
    print("📚 Xếp loại: Cần cố gắng hơn")
```

### 3. Tính tuổi chính xác

```python
"""
🎂 TÍNH TUỔI CHÍNH XÁC 🎂
Tính tuổi theo ngày, tháng, năm sinh
"""

print("🎂 TÍNH TUỔI CHÍNH XÁC 🎂")

# Thông tin hiện tại (có thể thay đổi)
nam_hien_tai = 2025
thang_hien_tai = 9
ngay_hien_tai = 26

# Nhập thông tin sinh
nam_sinh = int(input("Năm sinh: "))
thang_sinh = int(input("Tháng sinh: "))
ngay_sinh = int(input("Ngày sinh: "))

# Tính tuổi cơ bản
tuoi = nam_hien_tai - nam_sinh

# Điều chỉnh nếu chưa đến sinh nhật
if thang_hien_tai < thang_sinh:
    tuoi = tuoi - 1
elif thang_hien_tai == thang_sinh and ngay_hien_tai < ngay_sinh:
    tuoi = tuoi - 1

print(f"\n🎉 Bạn {tuoi} tuổi!")

# Tính số ngày đã sống (xấp xỉ)
so_ngay_song = tuoi * 365
print(f"Bạn đã sống khoảng {so_ngay_song:,} ngày!")
```

## 🔢 Phép toán đặc biệt

### 1. Chia lấy phần nguyên (`//`) và phần dư (`%`)

```python
"""
🍕 CHIA PIZZA CHO BẠN BÈ 🍕
Ví dụ: 17 miếng pizza chia cho 5 người
"""

tong_pizza = 17
so_nguoi = 5

# Mỗi người được bao nhiêu miếng?
moi_nguoi_duoc = tong_pizza // so_nguoi  # Chia lấy phần nguyên

# Còn thừa bao nhiêu miếng?
pizza_thua = tong_pizza % so_nguoi       # Chia lấy phần dư

print(f"🍕 Tổng pizza: {tong_pizza} miếng")
print(f"👥 Số người: {so_nguoi} người")
print(f"🎯 Mỗi người được: {moi_nguoi_duoc} miếng")
print(f"🍕 Còn thừa: {pizza_thua} miếng")
```

**Kết quả:**
```
🍕 Tổng pizza: 17 miếng
👥 Số người: 5 người  
🎯 Mỗi người được: 3 miếng
🍕 Còn thừa: 2 miếng
```

### 2. Lũy thừa (`**`) - Nhân nhiều lần

```python
"""
📈 SỨC MẠNH CỦA LŨY THỪA 📈
Tính diện tích hình vuông và thể tích hình lập phương
"""

# Diện tích hình vuông = cạnh²
canh_hinh_vuong = 5
dien_tich = canh_hinh_vuong ** 2
print(f"Hình vuông cạnh {canh_hinh_vuong}cm")
print(f"Diện tích: {canh_hinh_vuong}² = {dien_tich} cm²")

print()

# Thể tích hình lập phương = cạnh³
canh_hinh_lap_phuong = 4
the_tich = canh_hinh_lap_phuong ** 3
print(f"Hình lập phương cạnh {canh_hinh_lap_phuong}cm")
print(f"Thể tích: {canh_hinh_lap_phuong}³ = {the_tich} cm³")

print()

# Số lớn với lũy thừa
print("Sức mạnh của lũy thừa:")
print(f"2¹ = {2**1}")
print(f"2² = {2**2}")
print(f"2³ = {2**3}")
print(f"2⁴ = {2**4}")
print(f"2¹⁰ = {2**10}")
```

## 🎯 Thứ tự thực hiện phép toán

Python tuân theo quy tắc toán học: **BODMAS/PEMDAS**

```python
"""
📐 THỨ TỰ THỰC HIỆN PHÉP TOÁN 📐
B - Brackets (Ngoặc đơn)
O - Orders (Lũy thừa)  
D - Division (Chia)
M - Multiplication (Nhân)
A - Addition (Cộng)
S - Subtraction (Trừ)
"""

# Ví dụ 1: Không có ngoặc
ket_qua_1 = 2 + 3 * 4
print(f"2 + 3 × 4 = {ket_qua_1}")  # Kết quả: 14 (không phải 20)

# Ví dụ 2: Có ngoặc đơn
ket_qua_2 = (2 + 3) * 4
print(f"(2 + 3) × 4 = {ket_qua_2}")  # Kết quả: 20

# Ví dụ 3: Phức tạp hơn
ket_qua_3 = 2 ** 3 + 4 * 5 - 6 / 2
print(f"2³ + 4 × 5 - 6 ÷ 2 = {ket_qua_3}")  # 8 + 20 - 3 = 25
```

## 🧠 Toán học thông minh với module `math`

```python
"""
🔬 TOÁN HỌC NÂNG CAO VỚI MODULE MATH 🔬
"""
import math

print("🔬 CÁC HÀM TOÁN HỌC NÂNG CAO:")

# Căn bậc hai
so = 16
can_bac_hai = math.sqrt(so)
print(f"√{so} = {can_bac_hai}")

# Làm tròn lên và xuống
so_thap_phan = 3.7
lam_tron_len = math.ceil(so_thap_phan)
lam_tron_xuong = math.floor(so_thap_phan)
print(f"Làm tròn {so_thap_phan}: lên = {lam_tron_len}, xuống = {lam_tron_xuong}")

# Số Pi
ban_kinh = 5
chu_vi_hinh_tron = 2 * math.pi * ban_kinh
dien_tich_hinh_tron = math.pi * ban_kinh ** 2
print(f"Hình tròn bán kính {ban_kinh}:")
print(f"Chu vi: {chu_vi_hinh_tron:.2f}")
print(f"Diện tích: {dien_tich_hinh_tron:.2f}")

# Giá trị tuyệt đối
so_am = -15
gia_tri_tuyet_doi = abs(so_am)
print(f"Giá trị tuyệt đối của {so_am} là {gia_tri_tuyet_doi}")
```

## 🎮 Dự án: Máy tính đa năng

```python
"""
🧮 MÁY TÍNH ĐA NĂNG 🧮
Chương trình máy tính có nhiều chức năng
"""
import math

def hien_thi_menu():
    print("\n🧮 MÁY TÍNH ĐA NĂNG 🧮")
    print("=" * 30)
    print("1. ➕ Cộng hai số")
    print("2. ➖ Trừ hai số")
    print("3. ✖️  Nhân hai số")
    print("4. ➗ Chia hai số")
    print("5. 📐 Tính diện tích hình vuông")
    print("6. 🔄 Tính diện tích hình tròn")
    print("7. 📏 Tính căn bậc hai")
    print("8. 🚪 Thoát")
    print("=" * 30)

def cong_hai_so():
    a = float(input("Số thứ nhất: "))
    b = float(input("Số thứ hai: "))
    ket_qua = a + b
    print(f"🎯 Kết quả: {a} + {b} = {ket_qua}")

def tru_hai_so():
    a = float(input("Số bị trừ: "))
    b = float(input("Số trừ: "))
    ket_qua = a - b
    print(f"🎯 Kết quả: {a} - {b} = {ket_qua}")

def nhan_hai_so():
    a = float(input("Số thứ nhất: "))
    b = float(input("Số thứ hai: "))
    ket_qua = a * b
    print(f"🎯 Kết quả: {a} × {b} = {ket_qua}")

def chia_hai_so():
    a = float(input("Số bị chia: "))
    b = float(input("Số chia: "))
    if b != 0:
        ket_qua = a / b
        print(f"🎯 Kết quả: {a} ÷ {b} = {ket_qua}")
    else:
        print("❌ Lỗi: Không thể chia cho 0!")

def dien_tich_hinh_vuong():
    canh = float(input("Độ dài cạnh hình vuông: "))
    dien_tich = canh ** 2
    print(f"🎯 Diện tích hình vuông: {canh}² = {dien_tich}")

def dien_tich_hinh_tron():
    ban_kinh = float(input("Bán kính hình tròn: "))
    dien_tich = math.pi * ban_kinh ** 2
    print(f"🎯 Diện tích hình tròn: π × {ban_kinh}² = {dien_tich:.2f}")

def can_bac_hai():
    so = float(input("Nhập số cần tính căn bậc hai: "))
    if so >= 0:
        ket_qua = math.sqrt(so)
        print(f"🎯 Căn bậc hai của {so} = {ket_qua}")
    else:
        print("❌ Lỗi: Không thể tính căn bậc hai của số âm!")

# Chương trình chính
while True:
    hien_thi_menu()
    lua_chon = input("Chọn chức năng (1-8): ")
    
    if lua_chon == "1":
        cong_hai_so()
    elif lua_chon == "2":
        tru_hai_so()
    elif lua_chon == "3":
        nhan_hai_so()
    elif lua_chon == "4":
        chia_hai_so()
    elif lua_chon == "5":
        dien_tich_hinh_vuong()
    elif lua_chon == "6":
        dien_tich_hinh_tron()
    elif lua_chon == "7":
        can_bac_hai()
    elif lua_chon == "8":
        print("👋 Cảm ơn bạn đã sử dụng máy tính!")
        break
    else:
        print("❌ Lựa chọn không hợp lệ!")
    
    input("\n⏸️  Nhấn Enter để tiếp tục...")
```

## 🎯 Thử thách thực hành

### Thử thách 1: Tính tiền mua sắm

```python
"""
🛒 CHƯƠNG TRÌNH TÍNH TIỀN MUA SẮM 🛒
Yêu cầu: Tính tổng tiền và tiền thừa
"""

# TODO: Viết chương trình:
# 1. Nhập giá 3 món hàng
# 2. Tính tổng tiền
# 3. Nhập số tiền đưa
# 4. Tính tiền thừa
# 5. Hiển thị hóa đơn đẹp
```

### Thử thách 2: Máy tính BMI cho trẻ em

```python
"""
⚖️ TÍNH CHỈ SỐ BMI ⚖️
BMI = cân nặng (kg) / (chiều cao (m))²
"""

# TODO: Viết chương trình:
# 1. Nhập cân nặng và chiều cao
# 2. Tính BMI
# 3. Đưa ra lời khuyên phù hợp với trẻ em
```

### Thử thách 3: Trò chơi toán học

```python
"""
🎮 TRÒ CHƠI TOÁN HỌC 🎮
Tạo 10 câu hỏi toán ngẫu nhiên và tính điểm
"""

# TODO: Viết chương trình:
# 1. Tạo câu hỏi toán ngẫu nhiên
# 2. Nhận đáp án từ người chơi
# 3. Kiểm tra đúng/sai
# 4. Tính điểm cuối cùng
```

## ❗ Lỗi thường gặp và cách khắc phục

### Lỗi 1: Chia cho số 0

❌ **Lỗi:**
```python
ket_qua = 10 / 0  # ZeroDivisionError!
```

✅ **Cách sửa:**
```python
a = 10
b = 0
if b != 0:
    ket_qua = a / b
    print("Kết quả:", ket_qua)
else:
    print("Không thể chia cho 0!")
```

### Lỗi 2: Nhầm lẫn `/` và `//`

```python
print("10 / 3 =", 10 / 3)    # 3.3333... (số thập phân)
print("10 // 3 =", 10 // 3)  # 3 (số nguyên)
```

### Lỗi 3: Quên thứ tự thực hiện phép toán

```python
# Sai: 2 + 3 × 4 = 20 ❌
print(2 + 3 * 4)  # Kết quả: 14

# Đúng: (2 + 3) × 4 = 20 ✅
print((2 + 3) * 4)  # Kết quả: 20
```

## 🎊 Tóm tắt bài học

🎉 Tuyệt vời! Bạn đã biến Python thành một máy tính siêu thông minh!

### Bạn đã thành thạo:
- ✅ Các phép toán cơ bản: `+`, `-`, `*`, `/`
- ✅ Phép toán đặc biệt: `//`, `%`, `**`
- ✅ Thứ tự thực hiện phép toán (BODMAS)
- ✅ Sử dụng module `math` cho toán học nâng cao
- ✅ Tạo ứng dụng máy tính thực tế
- ✅ Xử lý lỗi toán học phổ biến

### Kiến thức quan trọng:
1. 🔢 **Python rất mạnh về toán học** - có thể tính toán phức tạp
2. ⚠️ **Cẩn thận với chia cho 0** - luôn kiểm tra trước
3. 📐 **Thứ tự phép toán quan trọng** - sử dụng ngoặc đơn khi cần
4. 🎯 **Làm tròn kết quả** để dễ đọc với `:.2f`

### Bước tiếp theo:
Trong bài học tiếp theo, chúng ta sẽ học cách **so sánh** các giá trị - lớn hơn, nhỏ hơn, bằng nhau để Python có thể đưa ra quyết định!

---

:::tip 🤝 Cần trợ giúp?
- 👨‍👩‍👧‍👦 Nhờ bố mẹ kiểm tra kết quả tính toán
- 📚 Thử áp dụng vào bài tập toán ở trường
- 🧮 So sánh kết quả với máy tính thật
- 🔍 Tìm hiểu thêm về module `math` của Python
:::

**Python là máy tính mạnh nhất mà bạn từng có! Hãy tận dụng sức mạnh này! 🐍🧮✨**
