# 📋 Python Cheatsheet - Bảng Tra Cứu Nhanh

> **Tóm tắt**: Bảng tra cứu nhanh Python với cú pháp cơ bản, hàm thông dụng và các mẹo hữu ích cho lập trình viên.

## 🎯 Tại Sao Cần Cheatsheet?

Thử tưởng tượng bạn là một đầu bếp 👨‍🍳. Có thể bạn biết cách nấu nhiều món, nhưng đôi khi cần tra cứu nhanh tỷ lệ gia vị, thời gian nấu. Python Cheatsheet cũng vậy - giúp bạn tra cứu nhanh cú pháp và hàm cần thiết!

---

## 📝 1. CÚ PHÁP CƠ BẢN

### Biến và Kiểu Dữ Liệu
```python
# Khai báo biến (Variable declarations)
name = "Hieu"           # String - chuỗi
age = 25                # Integer - số nguyên
height = 1.75           # Float - số thập phân
is_student = True       # Boolean - đúng/sai
my_list = [1, 2, 3]     # List - danh sách
my_dict = {"key": "value"}  # Dictionary - từ điển

# Kiểm tra kiểu dữ liệu (Check data types)
print(type(name))       # <class 'str'>
```

### In ra màn hình
```python
# Các cách in cơ bản (Basic printing)
print("Hello World")
print(f"Tôi tên {name}, {age} tuổi")  # f-string
print("Tôi tên {}, {} tuổi".format(name, age))  # format
print("Tôi tên %s, %d tuổi" % (name, age))  # % formatting
```

---

## 🔄 2. CẤU TRÚC ĐIỀU KHIỂN

### Câu lệnh điều kiện
```python
# If-elif-else statement
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

# Conditional expression (ternary operator)
status = "Pass" if score >= 60 else "Fail"
```

### Vòng lặp
```python
# For loop - lặp qua danh sách
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"Tôi thích {fruit}")

# For loop với range
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):       # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8
    print(i)

# While loop
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# Loop control
for i in range(10):
    if i == 3:
        continue    # bỏ qua iteration này
    if i == 7:
        break      # thoát khỏi loop
    print(i)
```

---

## 📋 3. CẤU TRÚC DỮ LIỆU

### List (Danh sách)
```python
# Tạo list (Create list)
numbers = [1, 2, 3, 4, 5]
mixed_list = [1, "hello", 3.14, True]

# Truy cập phần tử (Access elements)
first_item = numbers[0]     # 1
last_item = numbers[-1]     # 5
slice_items = numbers[1:4]  # [2, 3, 4]

# Thêm/xóa phần tử (Add/remove elements)
numbers.append(6)           # thêm vào cuối
numbers.insert(0, 0)        # chèn vào vị trí 0
numbers.remove(3)           # xóa phần tử có giá trị 3
popped = numbers.pop()      # xóa và trả về phần tử cuối
```

### Dictionary (Từ điển)
```python
# Tạo dictionary (Create dictionary)
student = {
    "name": "Hieu",
    "age": 20,
    "major": "Computer Science"
}

# Truy cập và thay đổi (Access and modify)
name = student["name"]          # lấy giá trị
student["gpa"] = 3.8           # thêm key mới
student["age"] = 21            # cập nhật giá trị

# Các phương thức hữu ích (Useful methods)
keys = student.keys()          # tất cả keys
values = student.values()      # tất cả values
items = student.items()        # cặp key-value
```

### Tuple (Bộ giá trị)
```python
# Tạo tuple (Create tuple)
coordinates = (10, 20)
rgb_color = (255, 128, 0)

# Unpacking
x, y = coordinates
red, green, blue = rgb_color
```

### Set (Tập hợp)
```python
# Tạo set (Create set)
unique_numbers = {1, 2, 3, 4, 5}
fruit_set = set(["apple", "banana", "apple"])  # {"apple", "banana"}

# Các phép toán tập hợp (Set operations)
set1 = {1, 2, 3}
set2 = {3, 4, 5}

union = set1 | set2           # {1, 2, 3, 4, 5}
intersection = set1 & set2    # {3}
difference = set1 - set2      # {1, 2}
```

---

## ⚡ 4. HÀM (FUNCTIONS)

### Định nghĩa hàm cơ bản
```python
# Hàm đơn giản (Simple function)
def greet(name):
    """Chào hỏi người dùng"""
    return f"Xin chào, {name}!"

# Hàm với tham số mặc định (Default parameters)
def power(base, exponent=2):
    """Tính lũy thừa"""
    return base ** exponent

# Hàm với *args và **kwargs
def flexible_function(*args, **kwargs):
    """Hàm nhận tham số linh hoạt"""
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

# Sử dụng (Usage)
result = greet("Hieu")
power_result = power(3)      # 3^2 = 9
power_result2 = power(2, 3)  # 2^3 = 8
flexible_function(1, 2, 3, name="Hieu", age=25)
```

### Lambda functions
```python
# Lambda function - hàm ẩn danh
square = lambda x: x ** 2
add = lambda x, y: x + y

# Sử dụng với map, filter
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))    # [1, 4, 9, 16, 25]
evens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]
```

---

## 📄 5. XỬ LÝ FILE

```python
# Đọc file (Read file)
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()        # đọc toàn bộ
    # hoặc
    lines = file.readlines()     # đọc từng dòng

# Ghi file (Write file)
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Hello World")
    file.writelines(["Line 1\n", "Line 2\n"])

# Thêm vào file (Append to file)
with open("log.txt", "a", encoding="utf-8") as file:
    file.write("New log entry\n")
```

---

## 🔧 6. XỬ LÝ LỖI

```python
# Try-except cơ bản (Basic exception handling)
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Không thể chia cho 0!")
except Exception as e:
    print(f"Lỗi: {e}")
else:
    print("Không có lỗi xảy ra")
finally:
    print("Luôn được thực thi")

# Raise exception
def divide(a, b):
    if b == 0:
        raise ValueError("Số chia không thể bằng 0")
    return a / b
```

---

## 🎨 7. LIST COMPREHENSION & GENERATORS

```python
# List comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]                    # [1, 4, 9, 16, 25]
evens = [x for x in numbers if x % 2 == 0]          # [2, 4]
pairs = [(x, y) for x in range(3) for y in range(3)] # [(0,0), (0,1), ...]

# Dictionary comprehension
word_lengths = {word: len(word) for word in ["hello", "world", "python"]}

# Generator expression
squares_gen = (x**2 for x in numbers)  # generator object
```

---

## 📚 8. MODULE & PACKAGE

```python
# Import module
import math
import datetime as dt
from random import randint, choice
from os.path import exists, join

# Sử dụng (Usage)
sqrt_value = math.sqrt(16)      # 4.0
current_time = dt.datetime.now()
random_number = randint(1, 100)
random_fruit = choice(["apple", "banana", "orange"])
```

---

## 🔍 9. HÀM BUILT-IN THÔNG DỤNG

### String methods
```python
text = "  Hello World  "
text.strip()            # "Hello World" - xóa khoảng trắng
text.lower()            # "  hello world  " - chữ thường
text.upper()            # "  HELLO WORLD  " - chữ hoa
text.replace("World", "Python")  # "  Hello Python  "
text.split()            # ["Hello", "World"] - tách chuỗi
"_".join(["a", "b", "c"])  # "a_b_c" - nối chuỗi
```

### Utility functions
```python
# len() - độ dài
len([1, 2, 3])          # 3
len("hello")            # 5

# min(), max(), sum()
numbers = [1, 5, 3, 9, 2]
min(numbers)            # 1
max(numbers)            # 9
sum(numbers)            # 20

# sorted() - sắp xếp
sorted(numbers)         # [1, 2, 3, 5, 9]
sorted(["banana", "apple", "cherry"])  # ['apple', 'banana', 'cherry']

# enumerate() - lấy index và value
for i, value in enumerate(["a", "b", "c"]):
    print(f"{i}: {value}")  # 0: a, 1: b, 2: c

# zip() - ghép các iterable
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name}: {age}")

# range() - tạo dãy số
list(range(5))          # [0, 1, 2, 3, 4]
list(range(2, 8, 2))    # [2, 4, 6]
```

---

## 🌟 10. MẸO VÀ TRICKS HẮY ÍCH

### Swapping variables
```python
# Hoán đổi biến (Variable swapping)
a, b = 5, 10
a, b = b, a  # a=10, b=5
```

### Multiple assignment
```python
# Gán nhiều biến cùng lúc (Multiple assignment)
name, age, city = "Hieu", 25, "Hanoi"
x = y = z = 0  # tất cả đều bằng 0
```

### Check if variable exists
```python
# Kiểm tra biến có tồn tại (Check if variable exists)
if 'variable_name' in locals():
    print("Biến tồn tại trong local scope")

if 'variable_name' in globals():
    print("Biến tồn tại trong global scope")
```

### String formatting
```python
name = "Hieu"
age = 25
salary = 50000.5

# f-string (Python 3.6+)
print(f"Tên: {name}, Tuổi: {age}, Lương: {salary:,.2f}")

# format method
print("Tên: {}, Tuổi: {}, Lương: {:,.2f}".format(name, age, salary))

# % formatting (cũ)
print("Tên: %s, Tuổi: %d, Lương: %.2f" % (name, age, salary))
```

---

## 🚀 11. REGULAR EXPRESSIONS (REGEX)

```python
import re

# Tìm kiếm pattern (Search pattern)
text = "Số điện thoại: 0123456789"
phone_pattern = r'\d{10}'
match = re.search(phone_pattern, text)
if match:
    print(f"Tìm thấy: {match.group()}")

# Thay thế (Replace)
new_text = re.sub(r'\d+', 'XXX', text)  # "Số điện thoại: XXX"

# Tách chuỗi (Split)
data = "apple,banana;orange:grape"
fruits = re.split(r'[,;:]', data)  # ['apple', 'banana', 'orange', 'grape']
```

---

## 📊 12. DATETIME

```python
from datetime import datetime, date, timedelta

# Ngày giờ hiện tại (Current datetime)
now = datetime.now()
today = date.today()

# Định dạng ngày tháng (Format datetime)
formatted = now.strftime("%Y-%m-%d %H:%M:%S")  # "2024-01-15 14:30:45"

# Parse string thành datetime
date_string = "2024-01-15"
parsed_date = datetime.strptime(date_string, "%Y-%m-%d")

# Tính toán thời gian (Time calculations)
tomorrow = today + timedelta(days=1)
last_week = today - timedelta(weeks=1)
```

---

## 💡 13. TIPS QUAN TRỌNG

### Performance Tips
```python
# Sử dụng list comprehension thay vì loop
# Chậm (Slow)
squares = []
for x in range(1000):
    squares.append(x**2)

# Nhanh (Fast)
squares = [x**2 for x in range(1000)]

# Sử dụng set cho membership testing
# Chậm với list
big_list = list(range(10000))
if 5000 in big_list:  # O(n)
    print("Found")

# Nhanh với set
big_set = set(range(10000))
if 5000 in big_set:   # O(1)
    print("Found")
```

### Memory Tips
```python
# Sử dụng generator thay vì list cho dữ liệu lớn
# Tốn memory
big_list = [x**2 for x in range(1000000)]

# Tiết kiệm memory
big_generator = (x**2 for x in range(1000000))
```

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [🐍 Python là gì?](../basics/what-is-python.md) - Tìm hiểu về Python
- [🔧 Hàm có sẵn](./built-in-functions.md) - Chi tiết về các hàm built-in
- [📦 Module thông dụng](./common-modules.md) - Các module hay dùng
- [⚡ Tối ưu hiệu suất](./performance-tips.md) - Mẹo tăng tốc code

---

## 🎯 Tóm Tắt

Cheatsheet này như một cuốn từ điển mini 📖 cho Python:

1. **Cú pháp cơ bản** - Nền tảng để viết code
2. **Cấu trúc điều khiển** - If/else, loops
3. **Cấu trúc dữ liệu** - List, dict, tuple, set
4. **Hàm** - Định nghĩa và sử dụng functions
5. **Xử lý file** - Đọc/ghi file
6. **Xử lý lỗi** - Try/except
7. **List comprehension** - Code ngắn gọn hơn
8. **Module** - Import và sử dụng
9. **Built-in functions** - Hàm có sẵn
10. **Tips & tricks** - Mẹo hữu ích

**Mẹo sử dụng**: Bookmark trang này và quay lại tra cứu bất cứ khi nào cần! 🔖

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: Hãy thực hành các ví dụ trên để nhớ lâu hơn!*
