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

def add(a, b):
    """Cộng hai số"""
    return a + b

def subtract(a, b):
    """Trừ hai số"""
    return a - b

def multiply(a, b):
    """Nhân hai số"""
    return a * b

def divide(a, b):
    """Chia hai số (có kiểm tra chia 0)"""
    if b == 0:
        return "❌ Không thể chia cho 0!"
    return a / b

def calculate_rectangle_area(length, width):
    """Tính diện tích hình chữ nhật"""
    return length * width

def calculate_circle_perimeter(radius):
    """Tính chu vi hình tròn"""
    PI = 3.14159
    return 2 * PI * radius

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
result = calculator.add(5, 3)
print(f"5 + 3 = {result}")

area = calculator.calculate_rectangle_area(10, 6)
print(f"Diện tích: {area}")

# Truy cập biến trong module
print(f"Phiên bản: {calculator.VERSION}")
print(f"Tác giả: {calculator.AUTHOR}")
```

## 🚀 Các Cách Import Thông Minh

### 📦 Import Cụ Thể (Recommended)
```python
# Chỉ import những gì cần dùng
from calculator import add, multiply, VERSION

# Sử dụng trực tiếp, không cần tiền tố
result = add(10, 5)
product = multiply(4, 7)
print(f"Version: {VERSION}")
```

### 🌟 Import Với Tên Ngắn Gọn
```python
# Đặt nickname cho module
import calculator as calc

# Sử dụng với tên ngắn
result = calc.add(8, 2)
print(result)
```

### 💫 Import Tất Cả (Cẩn Thận!)
```python
# Import tất cả - không nên dùng nhiều
from calculator import *

# Có thể dùng trực tiếp mọi thứ
result = add(1, 2)  # Nguy hiểm vì có thể conflict
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
from .calculator import add, subtract, multiply, divide
from .string_utils import clean_string, count_words
from .date_helper import get_today

# Thông tin package
__version__ = "1.0.0"
__author__ = "Behitek Academy"
__email__ = "info@behitek.com"

# Danh sách những gì được export
__all__ = [
    'add', 'subtract', 'multiply', 'divide',
    'clean_string', 'count_words',
    'get_today'
]

print("🎉 Behitek Tools đã sẵn sàng!")
```

### 🛠️ Module Tiện Ích Chuỗi
**File: `behitek_tools/string_utils.py`**
```python
# Các hàm tiện ích cho chuỗi

def clean_string(text):
    """Loại bỏ khoảng trắng thừa và chuyển thành chữ thường"""
    return text.strip().lower()

def count_words(text):
    """Đếm số từ trong câu"""
    return len(text.split())

def capitalize_words(text):
    """Viết hoa chữ cái đầu mỗi từ"""
    return text.title()

def reverse_string(text):
    """Đảo ngược chuỗi"""
    return text[::-1]

def validate_email(email):
    """Kiểm tra email có hợp lệ không (đơn giản)"""
    return '@' in email and '.' in email.split('@')[1]

def simple_encrypt(text, step=3):
    """Mã hóa Caesar đơn giản"""
    result = ""
    for character in text:
        if character.isalpha():
            # Xử lý cho chữ cái
            ascii_code = ord(character)
            if character.islower():
                result += chr((ascii_code - ord('a') + step) % 26 + ord('a'))
            else:
                result += chr((ascii_code - ord('A') + step) % 26 + ord('A'))
        else:
            result += character
    return result
```

### 📅 Module Xử Lý Thời Gian
**File: `behitek_tools/date_helper.py`**
```python
from datetime import datetime, timedelta

def get_today():
    """Lấy ngày hôm nay theo định dạng Việt Nam"""
    return datetime.now().strftime("%d/%m/%Y")

def get_current_time():
    """Lấy giờ hiện tại"""
    return datetime.now().strftime("%H:%M:%S")

def calculate_age(birth_year):
    """Tính tuổi từ năm sinh"""
    current_year = datetime.now().year
    return current_year - birth_year

def is_leap_year(year):
    """Kiểm tra có phải năm nhuận không"""
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

def count_days_to_tet():
    """Đếm số ngày đến Tết (đơn giản hóa)"""
    today = datetime.now()
    tet = datetime(today.year + 1, 1, 22)  # Tết dương lịch ước lượng
    if today > tet:
        tet = datetime(today.year + 1, 1, 22)
    
    difference = tet - today
    return difference.days

def format_vietnamese_time(datetime_obj):
    """Format thời gian theo kiểu Việt Nam"""
    day_mapping = {
        'Monday': 'Thứ Hai',
        'Tuesday': 'Thứ Ba', 
        'Wednesday': 'Thứ Tư',
        'Thursday': 'Thứ Năm',
        'Friday': 'Thứ Sáu',
        'Saturday': 'Thứ Bảy',
        'Sunday': 'Chủ Nhật'
    }
    
    day = day_mapping[datetime_obj.strftime('%A')]
    date = datetime_obj.strftime('%d/%m/%Y')
    time = datetime_obj.strftime('%H:%M')
    
    return f"{day}, {date} lúc {time}"
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
print(f"5 + 3 = {behitek_tools.add(5, 3)}")
print(f"10 - 4 = {behitek_tools.subtract(10, 4)}")

# Test string utils
print("\n📝 TEST STRING UTILS:")
test_string = "  XIN CHÀO BEHITEK ACADEMY  "
print(f"Chuỗi gốc: '{test_string}'")
print(f"Làm sạch: '{string_utils.clean_string(test_string)}'")
print(f"Số từ: {string_utils.count_words(test_string)}")
print(f"Viết hoa đầu từ: '{string_utils.capitalize_words(test_string)}'")
print(f"Đảo ngược: '{string_utils.reverse_string(test_string.strip())}'")

email = "hoc_vien@behitek.com"
print(f"Email '{email}' hợp lệ: {string_utils.validate_email(email)}")

# Test mã hóa
encrypted = string_utils.simple_encrypt("Hello Behitek", 3)
print(f"Mã hóa 'Hello Behitek': '{encrypted}'")

# Test date helper
print(f"\n📅 TEST DATE HELPER:")
print(f"Ngày hôm nay: {date_helper.get_today()}")
print(f"Giờ hiện tại: {date_helper.get_current_time()}")
print(f"Tuổi (sinh 2005): {date_helper.calculate_age(2005)}")
print(f"2024 là năm nhuận: {date_helper.is_leap_year(2024)}")
print(f"Số ngày đến Tết: {date_helper.count_days_to_tet()}")

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

name_list = ['An', 'Bình', 'Chi', 'Dũng']
random.shuffle(name_list)
print(f"Danh sách xáo trộn: {name_list}")

print(f"Số thực ngẫu nhiên: {random.random()}")
```

### 📅 Module `datetime` - Thời Gian
```python
from datetime import datetime, date, timedelta

# Thời gian hiện tại
current_time = datetime.now()
print(f"Bây giờ: {current_time}")

# Ngày hôm nay
today = date.today()
print(f"Hôm nay: {today}")

# Thời gian tương lai
tomorrow = today + timedelta(days=1)
print(f"Ngày mai: {tomorrow}")

# Format theo ý muốn
print(f"Định dạng Việt: {current_time.strftime('%d/%m/%Y %H:%M')}")
```

## 🎯 Ví Dụ Thực Tế: Hệ Thống Quản Lý Học Sinh

### 📂 Cấu Trúc Dự Án
```
student_management/
    __init__.py
    student.py
    grade.py
    report.py
    utils/
        __init__.py
        validation.py
        file_handler.py
```

### 👨‍🎓 Module Học Sinh
**File: `student_management/student.py`**
```python
class Student:
    def __init__(self, student_id, full_name, age, class_name):
        self.student_id = student_id
        self.full_name = full_name
        self.age = age
        self.class_name = class_name
        self.grades = {}
    
    def add_grade(self, subject, grade):
        """Thêm điểm cho môn học"""
        if subject not in self.grades:
            self.grades[subject] = []
        self.grades[subject].append(grade)
    
    def calculate_average_grade(self, subject):
        """Tính điểm trung bình môn học"""
        if subject in self.grades and self.grades[subject]:
            return sum(self.grades[subject]) / len(self.grades[subject])
        return 0
    
    def __str__(self):
        return f"HS{self.student_id}: {self.full_name} ({self.age} tuổi, {self.class_name})"

def create_sample_students():
    """Tạo dữ liệu học sinh mẫu"""
    student_list = [
        Student("001", "Nguyễn Văn An", 16, "10A1"),
        Student("002", "Trần Thị Bình", 15, "9B2"),
        Student("003", "Lê Hoàng Chi", 17, "11C3")
    ]
    
    # Thêm điểm mẫu
    student_list[0].add_grade("Toán", 8.5)
    student_list[0].add_grade("Toán", 9.0)
    student_list[0].add_grade("Văn", 7.5)
    
    return student_list
```

### 📊 Sử Dụng Hệ Thống
**File: `main.py`**
```python
from student_management import student
from student_management.utils import validation

# Tạo danh sách học sinh
student_list = student.create_sample_students()

# Hiển thị thông tin
for hs in student_list:
    print(hs)
    for subject in hs.grades:
        average = hs.calculate_average_grade(subject)
        print(f"  {subject}: {average:.1f}")
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
