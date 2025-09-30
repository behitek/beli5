# 📐 Quy Tắc Viết Code Python - Coding Style Guide

> **Tóm tắt**: Hướng dẫn viết code Python sạch, dễ đọc và professional theo chuẩn PEP 8 và best practices của cộng đồng Python.

## 🎯 Tại Sao Cần Coding Style?

Hãy tưởng tượng bạn đang đọc một cuốn tiểu thuyết 📚. Nếu tác giả viết không có dấu câu, không xuống dòng, không khoảng cách... bạn sẽ rất khó hiểu nội dung!

Code cũng vậy! Coding style như "ngữ pháp" của lập trình - giúp code dễ đọc, dễ hiểu và dễ maintain. Một team có cùng coding style sẽ làm việc hiệu quả hơn rất nhiều!

---

## 📏 1. PEP 8 - CHUẨN PYTHON OFFICIAL

### Indentation (Thụt đầu dòng)
```python
# ✅ Đúng: 4 spaces cho mỗi level
def my_function():
    if True:
        for i in range(3):
            print(f"Number: {i}")
            if i == 2:
                print("Last number!")

# ❌ Sai: dùng tab hoặc spaces không đồng nhất
def bad_function():
	if True:  # Tab
    print("Mixed indentation")  # 4 spaces - BAD!

# ✅ Continuation lines
def long_function_name(
        parameter_one, parameter_two,
        parameter_three, parameter_four):
    return parameter_one + parameter_two

# ✅ Hoặc aligned with opening delimiter
def another_function(parameter_one, parameter_two,
                    parameter_three, parameter_four):
    return parameter_one + parameter_two

# ✅ Hanging indent
result = some_function_that_takes_arguments(
    'first argument',
    'second argument',
    'third argument'
)
```

### Line Length (Độ dài dòng)
```python
# ✅ Tối đa 79 ký tự (PEP 8) hoặc 88-100 (Black formatter)
def calculate_compound_interest(principal, rate, time, compound_frequency):
    """Tính lãi kép với các tham số đầu vào"""
    return principal * (1 + rate / compound_frequency) ** (compound_frequency * time)

# ❌ Quá dài - khó đọc
def calculate_compound_interest(principal, rate, time, compound_frequency):
    return principal * (1 + rate / compound_frequency) ** (compound_frequency * time)  # Quá 79 ký tự

# ✅ Chia nhỏ dòng dài
long_string = (
    "This is a very long string that would exceed the line length limit "
    "so we break it into multiple lines for better readability."
)

# ✅ Long expressions
total_score = (
    math_score * math_weight +
    science_score * science_weight +
    english_score * english_weight
) / total_weight

# ✅ Long if conditions
if (user.is_authenticated() and 
    user.has_permission('edit') and 
    document.is_editable() and
    not document.is_locked()):
    # Allow editing
    pass
```

### Blank Lines (Dòng trống)
```python
# ✅ 2 dòng trống giữa classes và top-level functions
class Student:
    """Class để quản lý thông tin học sinh"""
    pass


class Teacher:
    """Class để quản lý thông tin giáo viên"""
    pass


def global_function():
    """Function global"""
    pass


# ✅ 1 dòng trống giữa methods trong class
class Calculator:
    """Máy tính đơn giản"""
    
    def __init__(self):
        self.result = 0
    
    def add(self, number):
        """Cộng số"""
        self.result += number
        return self
    
    def subtract(self, number):
        """Trừ số"""
        self.result -= number
        return self

# ✅ Dùng dòng trống để nhóm logic
def process_student_data():
    # Đọc dữ liệu
    students = read_student_file()
    
    # Xử lý dữ liệu
    cleaned_data = clean_data(students)
    validated_data = validate_data(cleaned_data)
    
    # Lưu kết quả
    save_results(validated_data)
```

---

## 🏷️ 2. NAMING CONVENTIONS - QUY TẮC ĐẶT TÊN

### Variables và Functions (snake_case)
```python
# ✅ Tên rõ ràng, mô tả được mục đích
student_name = "Nguyễn Văn An"
total_score = 85.5
is_student_passed = True
user_email_address = "student@example.com"

def calculate_final_grade(midterm_score, final_score):
    """Tính điểm cuối kỳ"""
    return (midterm_score * 0.4) + (final_score * 0.6)

def send_email_notification(recipient_email, message_content):
    """Gửi email thông báo"""
    pass

# ❌ Tên không rõ ràng
n = "Nguyễn Văn An"  # n là gì?
ts = 85.5  # total score?
p = True  # passed?

def calc(m, f):  # Không biết calc cái gì
    return (m * 0.4) + (f * 0.6)
```

### Constants (UPPER_CASE)
```python
# ✅ Constants - giá trị không thay đổi
MAX_STUDENTS_PER_CLASS = 30
DEFAULT_GRADE = 0.0
PI = 3.14159
DATABASE_URL = "postgresql://localhost:5432/school"
ERROR_MESSAGES = {
    'INVALID_EMAIL': 'Email không hợp lệ',
    'USER_NOT_FOUND': 'Không tìm thấy người dùng',
    'INSUFFICIENT_PERMISSIONS': 'Không đủ quyền truy cập'
}

# ✅ Configuration settings
class Config:
    SECRET_KEY = "your-secret-key-here"
    DEBUG = True
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
```

### Classes (PascalCase)
```python
# ✅ Class names - PascalCase
class Student:
    """Lớp quản lý thông tin học sinh"""
    
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id

class EmailNotificationService:
    """Service gửi email thông báo"""
    
    def send_welcome_email(self, user_email):
        pass

class DatabaseConnectionManager:
    """Quản lý kết nối database"""
    
    def __init__(self, connection_string):
        self._connection_string = connection_string
    
    def connect(self):
        # Kết nối database
        pass

# ✅ Exception classes
class InvalidEmailError(ValueError):
    """Lỗi email không hợp lệ"""
    pass

class StudentNotFoundError(Exception):
    """Lỗi không tìm thấy học sinh"""
    pass
```

### Private/Protected Variables
```python
class BankAccount:
    """Tài khoản ngân hàng"""
    
    def __init__(self, account_number, initial_balance):
        self.account_number = account_number  # Public
        self._balance = initial_balance       # Protected (convention)
        self.__pin = "1234"                  # Private (name mangling)
    
    def get_balance(self):
        """Phương thức public để lấy số dư"""
        return self._balance
    
    def _validate_transaction(self, amount):
        """Protected method - chỉ dùng internal"""
        return amount > 0 and amount <= self._balance
    
    def __encrypt_pin(self, pin):
        """Private method - name mangling"""
        return f"encrypted_{pin}"

# ✅ Module-level private functions
def _internal_helper_function():
    """Function này chỉ dùng trong module này"""
    pass

def public_api_function():
    """Function này có thể import từ module khác"""
    result = _internal_helper_function()
    return result
```

---

## 📝 3. COMMENTS & DOCSTRINGS

### Comments Style
```python
# ✅ Comments giải thích "tại sao", không phải "cái gì"
def calculate_tax(income):
    # Áp dụng thuế lũy tiến theo quy định 2024
    if income <= 5000000:  # 5 triệu đồng
        return income * 0.05
    elif income <= 10000000:  # 10 triệu đồng
        return 250000 + (income - 5000000) * 0.1
    else:
        # Thu nhập trên 10 triệu thuế 15%
        return 750000 + (income - 10000000) * 0.15

# ❌ Comments không cần thiết
def add_numbers(a, b):
    # Cộng a và b - comment này thừa!
    return a + b

# ✅ TODO comments
def process_payment(amount, card_number):
    # TODO: Thêm validation cho card_number
    # FIXME: Xử lý trường hợp amount âm
    # NOTE: Cần test với các loại card khác nhau
    pass

# ✅ Inline comments (ít dùng, chỉ khi cần thiết)
x = x + 1  # Increment x by 1 - chỉ khi logic phức tạp
```

### Docstrings
```python
# ✅ Module docstring
"""
Quản lý học sinh và điểm số.

Module này cung cấp các function để:
- Thêm, sửa, xóa thông tin học sinh
- Tính toán điểm trung bình
- Xuất báo cáo điểm số

Author: Behitek Team
Version: 1.0.0
"""

def calculate_gpa(grades, credits):
    """
    Tính điểm trung bình tích lũy (GPA).
    
    Args:
        grades (list): Danh sách điểm số (float)
        credits (list): Danh sách số tín chỉ tương ứng (int)
    
    Returns:
        float: Điểm GPA từ 0.0 đến 4.0
    
    Raises:
        ValueError: Nếu độ dài grades và credits không bằng nhau
        ZeroDivisionError: Nếu tổng tín chỉ bằng 0
    
    Example:
        >>> calculate_gpa([3.5, 4.0, 3.0], [3, 4, 2])
        3.5555555555555554
    """
    if len(grades) != len(credits):
        raise ValueError("Grades và credits phải có cùng độ dài")
    
    if sum(credits) == 0:
        raise ZeroDivisionError("Tổng tín chỉ không thể bằng 0")
    
    total_points = sum(grade * credit for grade, credit in zip(grades, credits))
    total_credits = sum(credits)
    
    return total_points / total_credits

class Student:
    """
    Lớp đại diện cho một học sinh.
    
    Attributes:
        name (str): Tên học sinh
        student_id (str): Mã số học sinh
        grades (dict): Dictionary chứa điểm các môn
        
    Methods:
        add_grade: Thêm điểm cho một môn học
        get_average: Tính điểm trung bình
        is_passed: Kiểm tra có đạt hay không
    """
    
    def __init__(self, name, student_id):
        """
        Khởi tạo học sinh mới.
        
        Args:
            name (str): Tên học sinh
            student_id (str): Mã số học sinh duy nhất
        """
        self.name = name
        self.student_id = student_id
        self.grades = {}
    
    def add_grade(self, subject, grade):
        """
        Thêm điểm cho một môn học.
        
        Args:
            subject (str): Tên môn học
            grade (float): Điểm số (0-10)
        
        Raises:
            ValueError: Nếu điểm không trong khoảng 0-10
        """
        if not 0 <= grade <= 10:
            raise ValueError("Điểm phải trong khoảng 0-10")
        
        self.grades[subject] = grade
```

---

## 🔧 4. IMPORTS & MODULE ORGANIZATION

### Import Order và Style
```python
"""Module example với imports đúng chuẩn."""

# 1. Standard library imports
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

# 2. Related third party imports
import requests
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify

# 3. Local application/library specific imports
from .models import Student, Grade
from .utils import send_email, validate_email
from ..config import DATABASE_URL

# ✅ Import specific items, tránh import *
from math import sqrt, pi, sin, cos  # Thay vì from math import *

# ✅ Long imports
from some_very_long_module_name import (
    some_function,
    another_function,
    yet_another_function,
    one_more_function
)

# ✅ Alias cho tên dài
import matplotlib.pyplot as plt
import tensorflow as tf
from sklearn.model_selection import train_test_split as tts
```

### Module Structure
```python
# my_module.py
"""
Module quản lý học sinh - Student Management Module.

Cung cấp các chức năng cơ bản để quản lý thông tin học sinh
và tính toán điểm số.
"""

# Constants
DEFAULT_PASS_GRADE = 5.0
MAX_GRADE = 10.0
MIN_GRADE = 0.0

# Exceptions
class InvalidGradeError(ValueError):
    """Exception khi điểm số không hợp lệ."""
    pass

# Utility functions
def _validate_grade(grade):
    """Validate điểm số (private function)."""
    if not isinstance(grade, (int, float)):
        raise InvalidGradeError("Điểm phải là số")
    if not MIN_GRADE <= grade <= MAX_GRADE:
        raise InvalidGradeError(f"Điểm phải trong khoảng {MIN_GRADE}-{MAX_GRADE}")

# Main classes
class Student:
    """Main Student class."""
    pass

# Public API functions
def create_student(name, student_id):
    """Factory function để tạo Student."""
    return Student(name, student_id)

def calculate_class_average(students):
    """Tính điểm trung bình của lớp."""
    pass

# Module-level configuration
__version__ = "1.0.0"
__author__ = "Behitek Team"
__all__ = ['Student', 'create_student', 'calculate_class_average']  # Public API
```

---

## 🎨 5. CODE ORGANIZATION & STRUCTURE

### Function Organization
```python
# ✅ Functions ngắn gọn, làm một việc
def is_valid_email(email):
    """Kiểm tra email có hợp lệ không."""
    import re
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(pattern, email))

def is_student_passed(grades):
    """Kiểm tra học sinh có đậu không."""
    if not grades:
        return False
    average = sum(grades) / len(grades)
    return average >= DEFAULT_PASS_GRADE

def format_grade_report(student):
    """Format báo cáo điểm cho học sinh."""
    lines = [f"Báo cáo điểm - {student.name}"]
    lines.append("=" * 30)
    
    for subject, grade in student.grades.items():
        lines.append(f"{subject}: {grade:.1f}")
    
    average = calculate_average(student.grades.values())
    lines.append(f"Trung bình: {average:.2f}")
    
    return "\n".join(lines)

# ❌ Function quá dài, làm nhiều việc
def process_student_data_bad(data):
    # Validate data
    if not data:
        raise ValueError("Data is empty")
    
    # Parse data
    students = []
    for line in data.split('\n'):
        if line.strip():
            parts = line.split(',')
            if len(parts) >= 3:
                name = parts[0].strip()
                student_id = parts[1].strip()
                grades = [float(x.strip()) for x in parts[2:]]
                
                # Validate grades
                for grade in grades:
                    if not 0 <= grade <= 10:
                        raise ValueError(f"Invalid grade: {grade}")
                
                # Create student
                student = Student(name, student_id)
                for i, grade in enumerate(grades):
                    student.add_grade(f"Subject_{i+1}", grade)
                
                # Check if passed
                if sum(grades) / len(grades) >= 5.0:
                    student.status = "PASSED"
                else:
                    student.status = "FAILED"
                
                students.append(student)
    
    # Generate report
    report = "Student Report\n"
    report += "=" * 50 + "\n"
    for student in students:
        report += f"{student.name} - {student.status}\n"
    
    return students, report  # Trả về nhiều thứ - không tốt
```

### Error Handling Organization
```python
# ✅ Custom exceptions hierarchy
class StudentError(Exception):
    """Base exception cho student-related errors."""
    pass

class InvalidStudentDataError(StudentError):
    """Exception khi dữ liệu học sinh không hợp lệ."""
    pass

class StudentNotFoundError(StudentError):
    """Exception khi không tìm thấy học sinh."""
    pass

class GradeError(StudentError):
    """Base exception cho grade-related errors."""
    pass

class InvalidGradeError(GradeError):
    """Exception khi điểm số không hợp lệ."""
    pass

# ✅ Centralized error handling
def handle_student_error(func):
    """Decorator để handle student errors."""
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except StudentError as e:
            logger.error(f"Student error in {func.__name__}: {e}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error in {func.__name__}: {e}")
            raise
    return wrapper

@handle_student_error
def find_student_by_id(student_id):
    """Tìm học sinh theo ID."""
    # Implementation here
    pass
```

---

## 📐 6. FORMATTING & SPACING

### Operators và Expressions
```python
# ✅ Spaces around operators
result = (a + b) * (c - d)
is_valid = (score >= passing_grade) and (attendance > min_attendance)
total = first_value + second_value + third_value

# ❌ Không có spaces
result=(a+b)*(c-d)
is_valid=(score>=passing_grade)and(attendance>min_attendance)

# ✅ Function calls
send_email(recipient='student@example.com', subject='Grade Report')
students = get_students(grade_level=10, status='active')

# ✅ List, dict, tuple formatting
grades = [8.5, 9.0, 7.5, 8.0]
student_info = {
    'name': 'Nguyễn Văn An',
    'id': 'SV001',
    'email': 'an@example.com'
}

# ✅ Long lists/dicts
long_list = [
    'first_item',
    'second_item', 
    'third_item',
    'fourth_item'
]

complex_dict = {
    'personal_info': {
        'name': 'Nguyễn Văn An',
        'age': 20,
        'address': 'Hà Nội'
    },
    'academic_info': {
        'student_id': 'SV001',
        'major': 'Computer Science',
        'year': 2
    }
}
```

### Control Structures
```python
# ✅ If statements
if student.grade >= passing_grade:
    student.status = 'PASSED'
    send_congratulations_email(student.email)
elif student.grade >= make_up_threshold:
    student.status = 'MAKEUP_REQUIRED'
    schedule_makeup_exam(student)
else:
    student.status = 'FAILED'
    send_support_resources(student.email)

# ✅ For loops
for student in students:
    if student.is_active():
        process_student_grades(student)
        update_student_status(student)

# ✅ List comprehensions
passed_students = [
    student for student in students 
    if student.calculate_average() >= passing_grade
]

# ✅ Dictionary comprehensions
grade_summary = {
    student.name: student.calculate_average()
    for student in students
    if student.has_grades()
}
```

---

## 🧪 7. TESTING & DOCUMENTATION

### Testable Code Structure
```python
# ✅ Pure functions - dễ test
def calculate_letter_grade(numeric_grade):
    """
    Chuyển điểm số thành điểm chữ.
    
    Args:
        numeric_grade (float): Điểm số từ 0-10
        
    Returns:
        str: Điểm chữ (A, B, C, D, F)
    """
    if numeric_grade >= 8.5:
        return 'A'
    elif numeric_grade >= 7.0:
        return 'B'
    elif numeric_grade >= 5.5:
        return 'C'
    elif numeric_grade >= 4.0:
        return 'D'
    else:
        return 'F'

# ✅ Test-friendly class design
class GradeCalculator:
    """Calculator cho điểm số với dependency injection."""
    
    def __init__(self, grading_scale=None):
        self.grading_scale = grading_scale or self._default_grading_scale()
    
    def _default_grading_scale(self):
        return {
            'A': (8.5, 10.0),
            'B': (7.0, 8.4),
            'C': (5.5, 6.9),
            'D': (4.0, 5.4),
            'F': (0.0, 3.9)
        }
    
    def get_letter_grade(self, numeric_grade):
        """Lấy điểm chữ từ điểm số."""
        for letter, (min_grade, max_grade) in self.grading_scale.items():
            if min_grade <= numeric_grade <= max_grade:
                return letter
        raise ValueError(f"Invalid grade: {numeric_grade}")
```

### Code Examples in Docstrings
```python
def format_student_name(first_name, last_name, title=None):
    """
    Format tên học sinh theo chuẩn.
    
    Args:
        first_name (str): Tên
        last_name (str): Họ
        title (str, optional): Danh xưng (Anh, Chị, Em)
    
    Returns:
        str: Tên đã được format
    
    Examples:
        >>> format_student_name("An", "Nguyễn")
        'Nguyễn An'
        
        >>> format_student_name("An", "Nguyễn", "Anh")
        'Anh Nguyễn An'
        
        >>> format_student_name("", "Nguyễn")
        'Nguyễn'
    """
    parts = []
    if title:
        parts.append(title)
    if last_name:
        parts.append(last_name)
    if first_name:
        parts.append(first_name)
    
    return ' '.join(parts)
```

---

## 🛠️ 8. TOOLS & AUTOMATION

### Code Formatters
```python
# Sử dụng Black formatter
# pip install black
# black my_file.py

# Trước Black:
def function(arg1,arg2,arg3,arg4):
    return{'key1':arg1,'key2':arg2,'key3':arg3,'key4':arg4}

# Sau Black:
def function(arg1, arg2, arg3, arg4):
    return {
        "key1": arg1,
        "key2": arg2, 
        "key3": arg3,
        "key4": arg4
    }
```

### Linters
```python
# flake8 - check PEP 8 compliance
# pip install flake8
# flake8 my_file.py

# pylint - more comprehensive
# pip install pylint  
# pylint my_file.py

# Ví dụ .flake8 config file:
"""
[flake8]
max-line-length = 88
extend-ignore = E203, W503
exclude = 
    .git,
    __pycache__,
    build,
    dist
"""
```

### Type Hints (Python 3.5+)
```python
from typing import List, Dict, Optional, Union, Tuple

def calculate_average_grade(grades: List[float]) -> float:
    """Tính điểm trung bình từ danh sách điểm."""
    if not grades:
        return 0.0
    return sum(grades) / len(grades)

def find_student_by_id(
    students: List[Dict[str, Union[str, int, float]]], 
    student_id: str
) -> Optional[Dict[str, Union[str, int, float]]]:
    """Tìm học sinh theo ID."""
    for student in students:
        if student.get('id') == student_id:
            return student
    return None

class Student:
    """Lớp học sinh với type hints."""
    
    def __init__(self, name: str, student_id: str) -> None:
        self.name = name
        self.student_id = student_id
        self.grades: Dict[str, float] = {}
    
    def add_grade(self, subject: str, grade: float) -> None:
        """Thêm điểm cho môn học."""
        self.grades[subject] = grade
    
    def get_average(self) -> float:
        """Tính điểm trung bình."""
        if not self.grades:
            return 0.0
        return sum(self.grades.values()) / len(self.grades)
```

---

## 🎯 9. PROJECT STRUCTURE

### Recommended Project Layout
```
my_student_app/
├── README.md
├── requirements.txt
├── setup.py
├── .gitignore
├── .flake8
├── pyproject.toml  # Black, isort config
├── src/
│   └── student_app/
│       ├── __init__.py
│       ├── main.py
│       ├── config.py
│       ├── models/
│       │   ├── __init__.py
│       │   ├── student.py
│       │   └── grade.py
│       ├── services/
│       │   ├── __init__.py
│       │   ├── student_service.py
│       │   └── grade_service.py
│       ├── utils/
│       │   ├── __init__.py
│       │   ├── validators.py
│       │   └── formatters.py
│       └── exceptions/
│           ├── __init__.py
│           └── custom_exceptions.py
├── tests/
│   ├── __init__.py
│   ├── test_models/
│   ├── test_services/
│   └── test_utils/
├── docs/
│   ├── api.md
│   └── user_guide.md
└── scripts/
    ├── deploy.py
    └── migrate_data.py
```

### Configuration Files
```python
# pyproject.toml - Modern Python project config
[tool.black]
line-length = 88
target-version = ['py38']
include = '\.pyi?$'
extend-exclude = '''
/(
  # directories
  \.eggs
  | \.git
  | \.venv
  | build
  | dist
)/
'''

[tool.isort]
profile = "black"
multi_line_output = 3
line_length = 88

[tool.pylint.messages_control]
disable = "C0330, C0326"

[tool.mypy]
python_version = "3.8"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
```

---

## ✨ 10. BEST PRACTICES SUMMARY

### The Zen of Python
```python
import this
# Beautiful is better than ugly.
# Explicit is better than implicit.
# Simple is better than complex.
# Complex is better than complicated.
# Flat is better than nested.
# Sparse is better than dense.
# Readability counts.
```

### Code Review Checklist
```python
# ✅ Checklist for code review
"""
□ Có docstrings cho functions/classes public?
□ Variable names mô tả rõ mục đích?
□ Functions ngắn gọn, làm một việc?
□ Error handling đầy đủ và cụ thể?
□ Có type hints khi cần thiết?
□ Comments giải thích "tại sao" không phải "cái gì"?
□ Indentation đồng nhất (4 spaces)?
□ Line length không quá 79-88 characters?
□ Imports được organize đúng thứ tự?
□ Constants được define ở đầu module?
□ No magic numbers/strings?
□ Có tests cho logic quan trọng?
"""
```

### Performance vs Readability
```python
# ✅ Readable code (prefer this)
def calculate_student_gpa(student):
    """Tính GPA cho học sinh."""
    total_points = 0
    total_credits = 0
    
    for course in student.courses:
        grade_points = convert_grade_to_points(course.grade)
        total_points += grade_points * course.credits
        total_credits += course.credits
    
    if total_credits == 0:
        return 0.0
    
    return total_points / total_credits

# ❌ "Clever" but hard to read
def calculate_student_gpa(s):
    return sum(convert_grade_to_points(c.grade) * c.credits for c in s.courses) / sum(c.credits for c in s.courses) if s.courses else 0.0
```

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [📋 Python Cheatsheet](./python-cheatsheet.md) - Bảng tra cứu nhanh
- [🔧 Hàm có sẵn](./built-in-functions.md) - Built-in functions
- [⚡ Tối ưu hiệu suất](./performance-tips.md) - Performance tips
- [🏗️ Best Practices](./best-practices.md) - Thực hành tốt nhất

---

## 🎯 Tóm Tắt

### 📏 **PEP 8 Essentials:**
- **4 spaces** cho indentation
- **79-88 characters** max line length
- **snake_case** cho variables/functions
- **PascalCase** cho classes
- **UPPER_CASE** cho constants

### 🏷️ **Naming Principles:**
- Tên phải **mô tả rõ mục đích**
- Tránh abbreviations không cần thiết
- Consistent naming trong toàn project
- Private: `_private`, Very private: `__private`

### 📝 **Documentation:**
- Docstrings cho tất cả public functions/classes
- Comments giải thích "tại sao", không phải "cái gì"
- Examples trong docstrings
- Type hints khi có thể

### 🔧 **Tools:**
- **Black** - Auto formatter
- **flake8** - Linter
- **isort** - Import organizer
- **mypy** - Type checker

### 💡 **Golden Rules:**
1. **Readability counts** - Code được đọc nhiều hơn viết
2. **Consistency** - Cùng style trong toàn project
3. **Explicit is better than implicit** - Rõ ràng hơn ngầm hiểu
4. **Simple is better than complex** - Đơn giản hơn phức tạp

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: Good code is like a good joke - it needs no explanation!*
