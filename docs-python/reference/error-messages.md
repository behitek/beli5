# 🐛 Thông Báo Lỗi Python - Error Messages Guide

> **Tóm tắt**: Hướng dẫn hiểu và xử lý các thông báo lỗi thường gặp trong Python, từ cơ bản đến nâng cao với cách khắc phục cụ thể.

## 🎯 Tại Sao Cần Hiểu Error Messages?

Thử tưởng tượng bạn là một bác sĩ 👨‍⚕️. Khi bệnh nhân nói "đau bụng", bạn cần hỏi thêm: đau ở đâu? đau như thế nào? khi nào? để chẩn đoán chính xác.

Python error messages cũng vậy! Chúng như "triệu chứng" giúp bạn chẩn đoán vấn đề trong code. Hiểu được error message là bước đầu để trở thành lập trình viên giỏi!

---

## 📚 1. CẤU TRÚC CỦA ERROR MESSAGE

### Anatomy of a Python Error
```python
# Code gây lỗi
def divide_numbers(a, b):
    return a / b

result = divide_numbers(10, 0)
```

**Error output:**
```
Traceback (most recent call last):
  File "example.py", line 4, in <module>
    result = divide_numbers(10, 0)
  File "example.py", line 2, in divide_numbers
    return a / b
ZeroDivisionError: division by zero
```

**Giải thích từng phần:**
1. **Traceback** - "Dấu vết" của lỗi
2. **File và line number** - Vị trí lỗi xảy ra  
3. **Function name** - Hàm nào gây lỗi
4. **Code line** - Dòng code gây lỗi
5. **Error type** - Loại lỗi (ZeroDivisionError)
6. **Error message** - Mô tả chi tiết lỗi

---

## 🔤 2. SYNTAX ERRORS - LỖI CÚ PHÁP

### `SyntaxError` - Lỗi cú pháp cơ bản
```python
# ❌ Thiếu dấu hai chấm
if x > 5
    print("x lớn hơn 5")
# SyntaxError: invalid syntax

# ✅ Sửa: thêm dấu hai chấm
if x > 5:
    print("x lớn hơn 5")

# ❌ Thiếu ngoặc đóng
print("Hello World"
# SyntaxError: unexpected EOF while parsing

# ✅ Sửa: thêm ngoặc đóng
print("Hello World")

# ❌ Indentation sai
def my_function():
print("Hello")  # Thiếu indent
# IndentationError: expected an indented block

# ✅ Sửa: thêm indent
def my_function():
    print("Hello")
```

### `IndentationError` - Lỗi thụt đầu dòng
```python
# ❌ Không có indentation
def greet(name):
print(f"Hello {name}")  # IndentationError

# ❌ Indentation không đồng nhất
if True:
    print("Line 1")  # 4 spaces
        print("Line 2")  # 8 spaces - IndentationError

# ✅ Sửa: indentation đồng nhất
if True:
    print("Line 1")  # 4 spaces
    print("Line 2")  # 4 spaces

# Mẹo: sử dụng 4 spaces cho mỗi level indent
def example_function():
    if True:
        for i in range(3):
            print(f"Number: {i}")
```

### `EOFError` - Lỗi kết thúc file bất ngờ
```python
# ❌ Thiếu ngoặc đóng
data = [1, 2, 3
# SyntaxError: unexpected EOF while parsing

# ❌ String không đóng
message = "Hello World
# SyntaxError: EOL while scanning string literal

# ✅ Sửa: đóng đúng cú pháp
data = [1, 2, 3]
message = "Hello World"
```

---

## 🏷️ 3. NAME ERRORS - LỖI TÊN BIẾN

### `NameError` - Tên biến không tồn tại
```python
# ❌ Biến chưa được định nghĩa
print(username)  # NameError: name 'username' is not defined

# ✅ Sửa: định nghĩa biến trước
username = "Hieu"
print(username)

# ❌ Gõ sai tên biến
user_name = "An"
print(user_nam)  # NameError: name 'user_nam' is not defined

# ✅ Sửa: gõ đúng tên biến
user_name = "An"
print(user_name)

# ❌ Biến local không accessible
def my_function():
    local_var = "I'm local"

print(local_var)  # NameError: name 'local_var' is not defined

# ✅ Sửa: return hoặc dùng global
def my_function():
    local_var = "I'm local"
    return local_var

result = my_function()
print(result)
```

### `UnboundLocalError` - Biến local chưa assign
```python
# ❌ Sử dụng biến trước khi assign trong function
count = 10  # Global variable

def increment():
    print(count)  # UnboundLocalError
    count = count + 1  # Python nghĩ count là local variable

# ✅ Sửa 1: dùng global keyword
count = 10

def increment():
    global count
    print(count)
    count = count + 1

# ✅ Sửa 2: pass parameter
def increment(value):
    print(value)
    return value + 1

count = increment(count)
```

---

## 🔢 4. TYPE ERRORS - LỖI KIỂU DỮ LIỆU

### `TypeError` - Kiểu dữ liệu không phù hợp
```python
# ❌ Cộng string với number
name = "Hieu"
age = 25
message = "Tôi tên " + name + " và " + age + " tuổi"
# TypeError: can only concatenate str (not "int") to str

# ✅ Sửa: chuyển đổi kiểu dữ liệu
message = "Tôi tên " + name + " và " + str(age) + " tuổi"
# Hoặc dùng f-string (tốt hơn)
message = f"Tôi tên {name} và {age} tuổi"

# ❌ Gọi object không phải function
number = 42
result = number()  # TypeError: 'int' object is not callable

# ✅ Sửa: kiểm tra type trước khi gọi
if callable(number):
    result = number()
else:
    print("number không phải là function")

# ❌ Index với string thay vì int
my_list = [1, 2, 3, 4, 5]
index = "2"
item = my_list[index]  # TypeError: list indices must be integers

# ✅ Sửa: chuyển string thành int
index = int("2")
item = my_list[index]

# ❌ Thiếu argument khi gọi function
def greet(name, age):
    print(f"Hello {name}, you are {age} years old")

greet("An")  # TypeError: greet() missing 1 required positional argument: 'age'

# ✅ Sửa: cung cấp đủ arguments
greet("An", 25)
```

### `AttributeError` - Attribute không tồn tại
```python
# ❌ Gọi method không tồn tại
number = 42
number.append(1)  # AttributeError: 'int' object has no attribute 'append'

# ✅ Sửa: sử dụng đúng type
my_list = [42]
my_list.append(1)  # OK

# ❌ Truy cập attribute của None
data = None
length = data.length  # AttributeError: 'NoneType' object has no attribute 'length'

# ✅ Sửa: kiểm tra None trước
if data is not None:
    length = data.length
else:
    length = 0

# ❌ Typo trong tên method/attribute
text = "hello world"
result = text.upper()  # Đúng
result = text.uppor()  # AttributeError: 'str' object has no attribute 'uppor'

# ✅ Sửa: gõ đúng tên method
result = text.upper()

# Debugging tip: dùng dir() để xem các attribute available
print(dir(text))  # Liệt kê tất cả methods của string
```

---

## 📋 5. VALUE ERRORS - LỖI GIÁ TRỊ

### `ValueError` - Giá trị không hợp lệ
```python
# ❌ Chuyển đổi string không phải số thành int
age = int("twenty")  # ValueError: invalid literal for int() with base 10: 'twenty'

# ✅ Sửa: kiểm tra trước khi chuyển đổi
age_str = "twenty"
try:
    age = int(age_str)
except ValueError:
    print(f"'{age_str}' không phải là số hợp lệ")
    age = 0  # Giá trị mặc định

# Hoặc dùng isnumeric()
if age_str.isnumeric():
    age = int(age_str)
else:
    print("Không phải số hợp lệ")

# ❌ Unpack không đúng số lượng
data = [1, 2, 3]
a, b = data  # ValueError: too many values to unpack (expected 2)

# ✅ Sửa: đúng số lượng variables
a, b, c = data  # OK

# ❌ Math domain error
import math
result = math.sqrt(-1)  # ValueError: math domain error

# ✅ Sửa: kiểm tra input
number = -1
if number >= 0:
    result = math.sqrt(number)
else:
    print("Không thể tính căn bậc 2 của số âm")
    # Hoặc dùng complex numbers
    result = complex(0, math.sqrt(abs(number)))
```

### `IndexError` - Index ngoài phạm vi
```python
# ❌ Index vượt quá độ dài list
my_list = [1, 2, 3]
item = my_list[5]  # IndexError: list index out of range

# ✅ Sửa: kiểm tra index trước
index = 5
if 0 <= index < len(my_list):
    item = my_list[index]
else:
    print(f"Index {index} ngoài phạm vi (0-{len(my_list)-1})")
    item = None

# Hoặc dùng try-except
try:
    item = my_list[index]
except IndexError:
    print("Index không hợp lệ")
    item = None

# ❌ Negative index quá mức
item = my_list[-5]  # IndexError: list index out of range

# ✅ Safe get function
def safe_get(lst, index, default=None):
    """Lấy phần tử an toàn từ list"""
    try:
        return lst[index]
    except IndexError:
        return default

item = safe_get(my_list, 5, "Not found")  # "Not found"
```

### `KeyError` - Key không tồn tại trong dictionary
```python
# ❌ Truy cập key không tồn tại
student = {"name": "An", "age": 20}
grade = student["grade"]  # KeyError: 'grade'

# ✅ Sửa 1: dùng get() method
grade = student.get("grade", 0)  # Trả về 0 nếu key không tồn tại

# ✅ Sửa 2: kiểm tra key trước
if "grade" in student:
    grade = student["grade"]
else:
    grade = 0

# ✅ Sửa 3: dùng try-except
try:
    grade = student["grade"]
except KeyError:
    print("Key 'grade' không tồn tại")
    grade = 0

# Utility function để truy cập nested dictionary an toàn
def safe_get_nested(data, keys, default=None):
    """Truy cập nested dictionary an toàn"""
    for key in keys:
        if isinstance(data, dict) and key in data:
            data = data[key]
        else:
            return default
    return data

data = {
    "user": {
        "profile": {
            "name": "Hieu"
        }
    }
}

name = safe_get_nested(data, ["user", "profile", "name"])  # "Hieu"
email = safe_get_nested(data, ["user", "profile", "email"], "No email")  # "No email"
```

---

## 📁 6. FILE & I/O ERRORS

### `FileNotFoundError` - File không tồn tại
```python
# ❌ Mở file không tồn tại
with open("nonexistent.txt", "r") as f:
    content = f.read()
# FileNotFoundError: [Errno 2] No such file or directory: 'nonexistent.txt'

# ✅ Sửa: kiểm tra file tồn tại trước
import os

filename = "nonexistent.txt"
if os.path.exists(filename):
    with open(filename, "r") as f:
        content = f.read()
else:
    print(f"File {filename} không tồn tại")
    content = ""

# ✅ Hoặc dùng try-except
try:
    with open("data.txt", "r", encoding="utf-8") as f:
        content = f.read()
except FileNotFoundError:
    print("File không tồn tại, tạo file mới")
    # Tạo file mới với nội dung mặc định
    with open("data.txt", "w", encoding="utf-8") as f:
        f.write("Default content")
    content = "Default content"
```

### `PermissionError` - Không có quyền truy cập
```python
# ❌ Ghi vào file read-only
try:
    with open("readonly_file.txt", "w") as f:
        f.write("New content")
except PermissionError:
    print("Không có quyền ghi file này")

# ✅ Xử lý: kiểm tra quyền trước
import os
import stat

def can_write_file(filename):
    """Kiểm tra có thể ghi file không"""
    if not os.path.exists(filename):
        return True  # File chưa tồn tại, có thể tạo mới
    
    file_stat = os.stat(filename)
    return file_stat.st_mode & stat.S_IWRITE

filename = "test.txt"
if can_write_file(filename):
    with open(filename, "w") as f:
        f.write("Content")
else:
    print(f"Không thể ghi file {filename}")
```

### `UnicodeDecodeError` - Lỗi encoding
```python
# ❌ Đọc file với encoding sai
try:
    with open("vietnamese_text.txt", "r", encoding="ascii") as f:
        content = f.read()
except UnicodeDecodeError as e:
    print(f"Encoding error: {e}")

# ✅ Sửa: dùng encoding phù hợp
encodings = ["utf-8", "cp1252", "latin1"]

def read_file_with_fallback(filename, encodings):
    """Đọc file với nhiều encoding fallback"""
    for encoding in encodings:
        try:
            with open(filename, "r", encoding=encoding) as f:
                return f.read()
        except UnicodeDecodeError:
            continue
    
    # Nếu tất cả encoding đều fail
    print(f"Không thể đọc {filename} với các encoding: {encodings}")
    return None

content = read_file_with_fallback("data.txt", ["utf-8", "cp1252", "latin1"])
```

---

## 🔄 7. IMPORT ERRORS

### `ImportError` / `ModuleNotFoundError` - Module không tìm thấy
```python
# ❌ Import module không có
import nonexistent_module  # ModuleNotFoundError: No module named 'nonexistent_module'

# ✅ Sửa: kiểm tra module có sẵn không
try:
    import matplotlib.pyplot as plt
    HAS_MATPLOTLIB = True
except ImportError:
    HAS_MATPLOTLIB = False
    print("matplotlib không có sẵn")

def plot_data(data):
    if not HAS_MATPLOTLIB:
        print("Không thể vẽ đồ thị: matplotlib chưa cài đặt")
        print("Cài đặt bằng: pip install matplotlib")
        return
    
    plt.plot(data)
    plt.show()

# ❌ Import từ module không đúng
from math import nonexistent_function  # ImportError

# ✅ Sửa: kiểm tra function có trong module không
import math

if hasattr(math, 'sqrt'):
    from math import sqrt
else:
    print("sqrt function không có trong math module")

# Graceful degradation
try:
    from rich.console import Console
    from rich.table import Table
    console = Console()
    
    def print_table(data):
        table = Table()
        # ... tạo table với rich
        console.print(table)
        
except ImportError:
    def print_table(data):
        # Fallback: in table đơn giản
        for row in data:
            print("\t".join(str(item) for item in row))
```

---

## ⚠️ 8. RUNTIME ERRORS - LỖI THỜI GIAN CHẠY

### `ZeroDivisionError` - Chia cho 0
```python
# ❌ Chia cho 0
a, b = 10, 0
result = a / b  # ZeroDivisionError: division by zero

# ✅ Sửa: kiểm tra trước khi chia
def safe_divide(a, b):
    """Chia an toàn, tránh ZeroDivisionError"""
    if b == 0:
        print("Cảnh báo: không thể chia cho 0")
        return float('inf') if a > 0 else float('-inf') if a < 0 else float('nan')
    return a / b

result = safe_divide(10, 0)  # inf
print(f"Result: {result}")

# Ứng dụng: tính trung bình an toàn
def safe_average(numbers):
    """Tính trung bình an toàn"""
    if not numbers:  # List rỗng
        return 0
    return sum(numbers) / len(numbers)

scores = []
avg = safe_average(scores)  # 0 thay vì lỗi
```

### `RecursionError` - Đệ quy quá sâu
```python
# ❌ Đệ quy vô hạn
def fibonacci(n):
    return fibonacci(n-1) + fibonacci(n-2)  # Thiếu base case
# RecursionError: maximum recursion depth exceeded

# ✅ Sửa: thêm base case
def fibonacci(n):
    if n <= 1:  # Base case
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# ✅ Tốt hơn: dùng memoization để tránh tính toán lặp lại
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci_memo(n):
    if n <= 1:
        return n
    return fibonacci_memo(n-1) + fibonacci_memo(n-2)

# ✅ Hoặc dùng iterative approach
def fibonacci_iter(n):
    if n <= 1:
        return n
    
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# Tăng recursion limit nếu cần (cẩn thận!)
import sys
print(f"Current recursion limit: {sys.getrecursionlimit()}")
# sys.setrecursionlimit(3000)  # Tăng limit
```

### `OverflowError` - Số quá lớn
```python
# ❌ Tính toán với số quá lớn
import math
result = math.exp(1000)  # OverflowError: math range error

# ✅ Sửa: kiểm tra giới hạn trước
def safe_exp(x, max_value=700):
    """exp an toàn, tránh overflow"""
    if x > max_value:
        print(f"Giá trị {x} quá lớn, trả về inf")
        return float('inf')
    elif x < -max_value:
        return 0.0
    return math.exp(x)

result = safe_exp(1000)  # inf
```

---

## 🏗️ 9. CUSTOM ERROR HANDLING STRATEGIES

### Defensive Programming
```python
def process_user_data(data):
    """Xử lý dữ liệu user với defensive programming"""
    
    # Validate input type
    if not isinstance(data, dict):
        raise TypeError(f"Expected dict, got {type(data).__name__}")
    
    # Validate required fields
    required_fields = ["name", "age", "email"]
    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")
    
    # Validate data types
    if not isinstance(data["name"], str):
        raise TypeError("Name must be a string")
    
    if not isinstance(data["age"], int) or data["age"] < 0:
        raise ValueError("Age must be a non-negative integer")
    
    # Validate email format
    import re
    email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(email_pattern, data["email"]):
        raise ValueError("Invalid email format")
    
    return f"User {data['name']} processed successfully"

# Sử dụng
try:
    result = process_user_data({
        "name": "Hieu",
        "age": 25,
        "email": "hieu@example.com"
    })
    print(result)
except (TypeError, ValueError) as e:
    print(f"Data validation error: {e}")
```

### Context Managers cho Error Handling
```python
import contextlib
import logging

@contextlib.contextmanager
def error_handler(operation_name):
    """Context manager để handle errors với logging"""
    try:
        print(f"Bắt đầu {operation_name}...")
        yield
        print(f"Hoàn thành {operation_name}")
    except Exception as e:
        logging.error(f"Lỗi trong {operation_name}: {e}")
        print(f"Lỗi: {e}")
        raise  # Re-raise nếu cần

# Sử dụng
with error_handler("đọc file"):
    with open("data.txt", "r") as f:
        content = f.read()

with error_handler("tính toán"):
    result = 10 / 2
```

### Error Recovery Patterns
```python
def retry_operation(func, max_retries=3, delay=1):
    """Thử lại operation khi gặp lỗi"""
    import time
    
    for attempt in range(max_retries):
        try:
            result = func()
            return result
        except Exception as e:
            if attempt == max_retries - 1:  # Lần cuối
                print(f"Thất bại sau {max_retries} lần thử: {e}")
                raise
            else:
                print(f"Lần thử {attempt + 1} thất bại: {e}")
                print(f"Thử lại sau {delay} giây...")
                time.sleep(delay)

# Ví dụ: kết nối mạng có thể fail
def unreliable_network_call():
    import random
    if random.random() < 0.7:  # 70% chance fail
        raise ConnectionError("Network error")
    return "Success!"

# Sử dụng
try:
    result = retry_operation(unreliable_network_call, max_retries=5)
    print(f"Kết quả: {result}")
except ConnectionError:
    print("Không thể kết nối sau nhiều lần thử")
```

---

## 📊 10. ERROR LOGGING & DEBUGGING

### Logging Errors Professionally
```python
import logging
import traceback
from datetime import datetime

# Cấu hình logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('errors.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

def log_error(e, context=""):
    """Log error với full stack trace"""
    error_info = {
        'timestamp': datetime.now().isoformat(),
        'error_type': type(e).__name__,
        'error_message': str(e),
        'context': context,
        'traceback': traceback.format_exc()
    }
    
    logger.error(f"Error occurred: {error_info}")
    return error_info

# Ví dụ sử dụng
def risky_function():
    try:
        # Code có thể gây lỗi
        result = 10 / 0
        return result
    except Exception as e:
        error_info = log_error(e, "risky_function execution")
        # Có thể gửi notification, email, etc.
        return None

result = risky_function()
```

### Debug Helper Functions
```python
def debug_variables(*variables):
    """In thông tin debug cho variables"""
    import inspect
    
    frame = inspect.currentframe().f_back
    local_vars = frame.f_locals
    
    print("=== DEBUG INFO ===")
    for var_name, var_value in local_vars.items():
        if not var_name.startswith('_'):
            print(f"{var_name} = {var_value} (type: {type(var_value).__name__})")
    print("==================")

def safe_execute(func, *args, **kwargs):
    """Thực thi function an toàn với debug info"""
    try:
        return func(*args, **kwargs)
    except Exception as e:
        print(f"Error in {func.__name__}:")
        print(f"Args: {args}")
        print(f"Kwargs: {kwargs}")
        print(f"Error: {e}")
        traceback.print_exc()
        return None

# Sử dụng
def problematic_function(x, y):
    return x / y

result = safe_execute(problematic_function, 10, 0)
```

---

## 🎯 11. BEST PRACTICES

### Error Handling Checklist
```python
# ✅ Do's
def good_error_handling():
    try:
        # Risky code
        with open("file.txt", "r") as f:
            data = f.read()
        
        # Process data
        result = process_data(data)
        return result
        
    except FileNotFoundError:
        logger.error("File not found")
        return None
    except ValueError as e:
        logger.error(f"Data processing error: {e}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return None
    finally:
        # Cleanup code
        cleanup_resources()

# ❌ Don'ts
def bad_error_handling():
    try:
        # Risky code
        result = risky_operation()
    except:  # Too broad
        pass  # Silent failure - very bad!
    
    return result  # Might return undefined variable

# ✅ Specific exception handling
def specific_error_handling():
    try:
        value = int(input("Enter a number: "))
        result = 100 / value
        return result
    except ValueError:
        print("Please enter a valid number")
    except ZeroDivisionError:
        print("Cannot divide by zero")
    except KeyboardInterrupt:
        print("Operation cancelled by user")
        return None
```

### Error Prevention Strategies
```python
# Input validation
def validate_input(data, expected_type, constraints=None):
    """Validate input data"""
    if not isinstance(data, expected_type):
        raise TypeError(f"Expected {expected_type.__name__}, got {type(data).__name__}")
    
    if constraints:
        for constraint, message in constraints.items():
            if constraint == 'min_value' and data < constraints['min_value']:
                raise ValueError(message)
            elif constraint == 'max_value' and data > constraints['max_value']:
                raise ValueError(message)
            elif constraint == 'not_empty' and not data:
                raise ValueError(message)
    
    return True

# Sử dụng
try:
    age = int(input("Enter age: "))
    validate_input(age, int, {
        'min_value': 0,
        'max_value': 150,
        'min_message': 'Age cannot be negative',
        'max_message': 'Age cannot exceed 150'
    })
    print(f"Age {age} is valid")
except (ValueError, TypeError) as e:
    print(f"Invalid input: {e}")
```

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [📋 Python Cheatsheet](./python-cheatsheet.md) - Bảng tra cứu nhanh
- [🔧 Hàm có sẵn](./built-in-functions.md) - Chi tiết về built-in functions
- [🛠️ Xử lý lỗi](../intermediate/error-handling.md) - Try/except cơ bản
- [⚡ Tối ưu hiệu suất](./performance-tips.md) - Mẹo tăng tốc code

---

## 🎯 Tóm Tắt

### 🔥 **Lỗi thường gặp nhất:**
1. **SyntaxError** - Lỗi cú pháp (thiếu dấu hai chấm, ngoặc...)
2. **NameError** - Biến chưa định nghĩa
3. **TypeError** - Kiểu dữ liệu sai
4. **ValueError** - Giá trị không hợp lệ
5. **IndexError** - Index ngoài phạm vi
6. **KeyError** - Key không tồn tại
7. **FileNotFoundError** - File không tìm thấy

### 🛡️ **Chiến lược xử lý lỗi:**
1. **Dự đoán** - Validate input trước khi xử lý
2. **Cụ thể** - Catch specific exceptions thay vì Exception chung
3. **Ghi log** - Log errors để debug sau này
4. **Graceful degradation** - Cung cấp fallback options
5. **Thông báo rõ ràng** - Error messages dễ hiểu cho user

### 💡 **Mẹo quan trọng:**
- Đọc error message từ dưới lên (error type + message đầu tiên)
- Sử dụng debugger hoặc print statements để trace
- Viết tests để catch errors sớm
- Không bao giờ dùng `except: pass` (silent failures)
- Luôn có plan B khi main functionality fail

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: Lỗi là cơ hội để học - đừng sợ mà hãy hiểu nguyên nhân!*
