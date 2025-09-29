# 📦 Module và Package - Tổ Chức Code Như Chuyên Gia

> **Mục tiêu**: Học cách chia nhỏ và tổ chức code thành những "hộp công cụ" thông minh! 🧰

## 🤔 Module Là Gì? (Giải Thích Siêu Dễ)

Hãy tưởng tượng **module** như những **hộp đồ nghề chuyên dụng**:

- 🔨 **Hộp đồ nghề sửa chữa** = Module toán học (math)
- 🎨 **Hộp màu vẽ** = Module đồ họa (turtle)
- 🍳 **Hộp đồ nấu ăn** = Module xử lý thời gian (datetime)
- 📞 **Hộp liên lạc** = Module xử lý web (requests)

**Thay vì** mang cả kho đồ nghề đi làm việc nhỏ, chúng ta chỉ **mang theo hộp cần thiết**!

## 📁 Tạo Module Của Riêng Mình

### 🛠️ Bước 1: Tạo File Module
**File: `calculator.py`**
```python
# Module tính toán cho Behitek Academy

def cong(a, b):
    """Cộng hai số"""
    return a + b

def tru(a, b):
    """Trừ hai số"""
    return a - b

def nhan(a, b):
    """Nhân hai số"""
    return a * b

def chia(a, b):
    """Chia hai số (có kiểm tra chia 0)"""
    if b == 0:
        return "❌ Không thể chia cho 0!"
    return a / b

def tinh_dien_tich_hinh_chu_nhat(dai, rong):
    """Tính diện tích hình chữ nhật"""
    return dai * rong

def tinh_chu_vi_hinh_tron(ban_kinh):
    """Tính chu vi hình tròn"""
    PI = 3.14159
    return 2 * PI * ban_kinh

# Biến toàn cục trong module
VERSION = "1.0.0"
AUTHOR = "Behitek Academy"

print(f"📚 Module Calculator v{VERSION} được tải thành công!")
```

### 🎯 Bước 2: Sử Dụng Module
**File: `main.py`**
```python
# Import toàn bộ module
import calculator

# Sử dụng các hàm từ module
ket_qua = calculator.cong(5, 3)
print(f"5 + 3 = {ket_qua}")

dien_tich = calculator.tinh_dien_tich_hinh_chu_nhat(10, 6)
print(f"Diện tích: {dien_tich}")

# Truy cập biến trong module
print(f"Phiên bản: {calculator.VERSION}")
print(f"Tác giả: {calculator.AUTHOR}")
```

## 🚀 Các Cách Import Thông Minh

### 📦 Import Cụ Thể (Recommended)
```python
# Chỉ import những gì cần dùng
from calculator import cong, nhan, VERSION

# Sử dụng trực tiếp, không cần tiền tố
ket_qua = cong(10, 5)
tich = nhan(4, 7)
print(f"Version: {VERSION}")
```

### 🌟 Import Với Tên Ngắn Gọn
```python
# Đặt nickname cho module
import calculator as calc

# Sử dụng với tên ngắn
ket_qua = calc.cong(8, 2)
print(ket_qua)
```

### 💫 Import Tất Cả (Cẩn Thận!)
```python
# Import tất cả - không nên dùng nhiều
from calculator import *

# Có thể dùng trực tiếp mọi thứ
ket_qua = cong(1, 2)  # Nguy hiểm vì có thể conflict
```

## 🏗️ Tạo Package - Hộp Lớn Chứa Nhiều Hộp Nhỏ

### 📂 Cấu Trúc Package
```
behitek_tools/
    __init__.py
    calculator.py
    string_utils.py
    date_helper.py
    games/
        __init__.py
        guessing_game.py
        quiz.py
```

### 🎯 File `__init__.py`
**File: `behitek_tools/__init__.py`**
```python
# File đặc biệt để Python nhận diện package
"""
Behitek Tools - Bộ công cụ lập trình cho học sinh Việt Nam
Phiên bản: 1.0.0
Tác giả: Behitek Academy
"""

# Import những thứ quan trọng nhất
from .calculator import cong, tru, nhan, chia
from .string_utils import lam_sach_chuoi, dem_tu
from .date_helper import lay_ngay_hom_nay

# Thông tin package
__version__ = "1.0.0"
__author__ = "Behitek Academy"
__email__ = "info@behitek.com"

# Danh sách những gì được export
__all__ = [
    'cong', 'tru', 'nhan', 'chia',
    'lam_sach_chuoi', 'dem_tu',
    'lay_ngay_hom_nay'
]

print("🎉 Behitek Tools đã sẵn sàng!")
```

### 🛠️ Module Tiện Ích Chuỗi
**File: `behitek_tools/string_utils.py`**
```python
# Các hàm tiện ích cho chuỗi

def lam_sach_chuoi(chuoi):
    """Loại bỏ khoảng trắng thừa và chuyển thành chữ thường"""
    return chuoi.strip().lower()

def dem_tu(chuoi):
    """Đếm số từ trong câu"""
    return len(chuoi.split())

def viet_hoa_chu_cai_dau(chuoi):
    """Viết hoa chữ cái đầu mỗi từ"""
    return chuoi.title()

def dao_nguoc_chuoi(chuoi):
    """Đảo ngược chuỗi"""
    return chuoi[::-1]

def kiem_tra_email(email):
    """Kiểm tra email có hợp lệ không (đơn giản)"""
    return '@' in email and '.' in email.split('@')[1]

def ma_hoa_don_gian(chuoi, buoc=3):
    """Mã hóa Caesar đơn giản"""
    ket_qua = ""
    for ky_tu in chuoi:
        if ky_tu.isalpha():
            # Xử lý cho chữ cái
            ma_ascii = ord(ky_tu)
            if ky_tu.islower():
                ket_qua += chr((ma_ascii - ord('a') + buoc) % 26 + ord('a'))
            else:
                ket_qua += chr((ma_ascii - ord('A') + buoc) % 26 + ord('A'))
        else:
            ket_qua += ky_tu
    return ket_qua
```

### 📅 Module Xử Lý Thời Gian
**File: `behitek_tools/date_helper.py`**
```python
from datetime import datetime, timedelta

def lay_ngay_hom_nay():
    """Lấy ngày hôm nay theo định dạng Việt Nam"""
    return datetime.now().strftime("%d/%m/%Y")

def lay_gio_hien_tai():
    """Lấy giờ hiện tại"""
    return datetime.now().strftime("%H:%M:%S")

def tinh_tuoi(nam_sinh):
    """Tính tuổi từ năm sinh"""
    nam_hien_tai = datetime.now().year
    return nam_hien_tai - nam_sinh

def la_nam_nhuan(nam):
    """Kiểm tra có phải năm nhuận không"""
    return nam % 4 == 0 and (nam % 100 != 0 or nam % 400 == 0)

def dem_ngay_den_tet():
    """Đếm số ngày đến Tết (đơn giản hóa)"""
    hom_nay = datetime.now()
    tet = datetime(hom_nay.year + 1, 1, 22)  # Tết dương lịch ước lượng
    if hom_nay > tet:
        tet = datetime(hom_nay.year + 1, 1, 22)
    
    chenh_lech = tet - hom_nay
    return chenh_lech.days

def dinh_dang_thoi_gian_viet(datetime_obj):
    """Format thời gian theo kiểu Việt Nam"""
    thu_mapping = {
        'Monday': 'Thứ Hai',
        'Tuesday': 'Thứ Ba', 
        'Wednesday': 'Thứ Tư',
        'Thursday': 'Thứ Năm',
        'Friday': 'Thứ Sáu',
        'Saturday': 'Thứ Bảy',
        'Sunday': 'Chủ Nhật'
    }
    
    thu = thu_mapping[datetime_obj.strftime('%A')]
    ngay = datetime_obj.strftime('%d/%m/%Y')
    gio = datetime_obj.strftime('%H:%M')
    
    return f"{thu}, {ngay} lúc {gio}"
```

## 🎮 Sử Dụng Package Hoàn Chỉnh

**File: `test_behitek_tools.py`**
```python
# Import package và sử dụng
import behitek_tools
from behitek_tools import string_utils, date_helper
from behitek_tools.games import guessing_game

# Test các chức năng calculator
print("🧮 TEST CALCULATOR:")
print(f"5 + 3 = {behitek_tools.cong(5, 3)}")
print(f"10 - 4 = {behitek_tools.tru(10, 4)}")

# Test string utils
print("\n📝 TEST STRING UTILS:")
chuoi_test = "  XIN CHÀO BEHITEK ACADEMY  "
print(f"Chuỗi gốc: '{chuoi_test}'")
print(f"Làm sạch: '{string_utils.lam_sach_chuoi(chuoi_test)}'")
print(f"Số từ: {string_utils.dem_tu(chuoi_test)}")
print(f"Viết hoa đầu từ: '{string_utils.viet_hoa_chu_cai_dau(chuoi_test)}'")
print(f"Đảo ngược: '{string_utils.dao_nguoc_chuoi(chuoi_test.strip())}'")

email = "hoc_vien@behitek.com"
print(f"Email '{email}' hợp lệ: {string_utils.kiem_tra_email(email)}")

# Test mã hóa
ma_hoa = string_utils.ma_hoa_don_gian("Hello Behitek", 3)
print(f"Mã hóa 'Hello Behitek': '{ma_hoa}'")

# Test date helper
print(f"\n📅 TEST DATE HELPER:")
print(f"Ngày hôm nay: {date_helper.lay_ngay_hom_nay()}")
print(f"Giờ hiện tại: {date_helper.lay_gio_hien_tai()}")
print(f"Tuổi (sinh 2005): {date_helper.tinh_tuoi(2005)}")
print(f"2024 là năm nhuận: {date_helper.la_nam_nhuan(2024)}")
print(f"Số ngày đến Tết: {date_helper.dem_ngay_den_tet()}")

# Hiển thị thông tin package
print(f"\n📦 PACKAGE INFO:")
print(f"Version: {behitek_tools.__version__}")
print(f"Author: {behitek_tools.__author__}")
```

## 🌟 Module Có Sẵn Hữu Ích

### 🔢 Module `math` - Toán Học Siêu Mạnh
```python
import math

print(f"Căn bậc 2 của 16: {math.sqrt(16)}")
print(f"2 mũ 8: {math.pow(2, 8)}")
print(f"Pi: {math.pi}")
print(f"Sin 90°: {math.sin(math.radians(90))}")
print(f"Làm tròn xuống: {math.floor(3.7)}")
print(f"Làm tròn lên: {math.ceil(3.2)}")
```

### 🎲 Module `random` - Số Ngẫu Nhiên
```python
import random

print(f"Số ngẫu nhiên 1-100: {random.randint(1, 100)}")
print(f"Chọn món ăn: {random.choice(['Phở', 'Bún bò', 'Cơm tấm'])}")

danh_sach = ['An', 'Bình', 'Chi', 'Dũng']
random.shuffle(danh_sach)
print(f"Danh sách xáo trộn: {danh_sach}")

print(f"Số thực ngẫu nhiên: {random.random()}")
```

### 📅 Module `datetime` - Thời Gian
```python
from datetime import datetime, date, timedelta

# Thời gian hiện tại
gio_hien_tai = datetime.now()
print(f"Bây giờ: {gio_hien_tai}")

# Ngày hôm nay
ngay_hom_nay = date.today()
print(f"Hôm nay: {ngay_hom_nay}")

# Thời gian tương lai
ngay_mai = ngay_hom_nay + timedelta(days=1)
print(f"Ngày mai: {ngay_mai}")

# Format theo ý muốn
print(f"Định dạng Việt: {gio_hien_tai.strftime('%d/%m/%Y %H:%M')}")
```

## 🎯 Ví Dụ Thực Tế: Hệ Thống Quản Lý Học Sinh

### 📂 Cấu Trúc Dự Án
```
quan_ly_hoc_sinh/
    __init__.py
    hoc_sinh.py
    diem_so.py
    bao_cao.py
    utils/
        __init__.py
        validation.py
        file_handler.py
```

### 👨‍🎓 Module Học Sinh
**File: `quan_ly_hoc_sinh/hoc_sinh.py`**
```python
class HocSinh:
    def __init__(self, ma_so, ho_ten, tuoi, lop):
        self.ma_so = ma_so
        self.ho_ten = ho_ten
        self.tuoi = tuoi
        self.lop = lop
        self.diem_so = {}
    
    def them_diem(self, mon_hoc, diem):
        """Thêm điểm cho môn học"""
        if mon_hoc not in self.diem_so:
            self.diem_so[mon_hoc] = []
        self.diem_so[mon_hoc].append(diem)
    
    def tinh_diem_trung_binh(self, mon_hoc):
        """Tính điểm trung bình môn học"""
        if mon_hoc in self.diem_so and self.diem_so[mon_hoc]:
            return sum(self.diem_so[mon_hoc]) / len(self.diem_so[mon_hoc])
        return 0
    
    def __str__(self):
        return f"HS{self.ma_so}: {self.ho_ten} ({self.tuoi} tuổi, {self.lop})"

def tao_hoc_sinh_mau():
    """Tạo dữ liệu học sinh mẫu"""
    hoc_sinh_list = [
        HocSinh("001", "Nguyễn Văn An", 16, "10A1"),
        HocSinh("002", "Trần Thị Bình", 15, "9B2"),
        HocSinh("003", "Lê Hoàng Chi", 17, "11C3")
    ]
    
    # Thêm điểm mẫu
    hoc_sinh_list[0].them_diem("Toán", 8.5)
    hoc_sinh_list[0].them_diem("Toán", 9.0)
    hoc_sinh_list[0].them_diem("Văn", 7.5)
    
    return hoc_sinh_list
```

### 📊 Sử Dụng Hệ Thống
**File: `main.py`**
```python
from quan_ly_hoc_sinh import hoc_sinh
from quan_ly_hoc_sinh.utils import validation

# Tạo danh sách học sinh
danh_sach = hoc_sinh.tao_hoc_sinh_mau()

# Hiển thị thông tin
for hs in danh_sach:
    print(hs)
    for mon in hs.diem_so:
        dtb = hs.tinh_diem_trung_binh(mon)
        print(f"  {mon}: {dtb:.1f}")
```

## 💡 Mẹo Hay Ho Về Module

1. **Đặt tên module rõ ràng** - `calculator.py`, không phải `calc.py`
2. **Docstring đầy đủ** - Giải thích module làm gì
3. **`if __name__ == "__main__"`** - Code test trong module
4. **Import ở đầu file** - Dễ nhìn và quản lý
5. **Không import quá nhiều** - Chỉ lấy những gì cần

## 🎮 Bài Tập Thực Hành

### 🏆 Bài 1: Tạo Game Package
Tạo package `behitek_games` với:
- Module `guessing_game` (đoán số)
- Module `quiz` (câu hỏi trắc nghiệm)
- Module `word_game` (trò chơi từ)

### 🏆 Bài 2: Utils Package
Tạo package tiện ích với:
- Module xử lý file
- Module validation dữ liệu
- Module format text

### 🏆 Bài 3: Behitek Academy System
Tạo hệ thống quản lý học viện với:
- Module học sinh
- Module khóa học
- Module báo cáo

## 🔗 Kiến Thức Liên Quan

- **[Lập Trình Hướng Đối Tượng](./classes-and-objects.md)** - Tạo class trong module
- **[Xử Lý File](./file-handling.md)** - Lưu/đọc dữ liệu module
- **[Làm Việc với JSON](./working-with-json.md)** - Cấu hình module

---

*🎉 **Chúc mừng!** Bạn đã biết cách tổ chức code như một lập trình viên chuyên nghiệp! Module và Package giúp code dễ đọc, dễ bảo trì và có thể tái sử dụng! 🚀*
