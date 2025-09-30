# 🏆 Thực Hành Tốt Nhất Python - Best Practices

> **Tóm tắt**: Tổng hợp các thực hành tốt nhất, mẹo hay và kinh nghiệm từ cộng đồng Python để viết code chất lượng cao, maintainable và professional.

## 🎯 Tại Sao Cần Best Practices?

Thử tưởng tượng bạn là một thầy thuốc 👨‍⚕️. Có thể bạn biết cách chữa bệnh, nhưng nếu không tuân theo quy trình chuẩn (rửa tay, khử trùng, kiểm tra kỹ...), bạn có thể gây hại cho bệnh nhân!

Lập trình cũng vậy! Best practices như "quy trình chuẩn" giúp code của bạn an toàn, dễ maintain và ít bug. Đây là kinh nghiệm được tích lũy từ hàng triệu lập trình viên trên thế giới!

---

## 🎨 1. CLEAN CODE PRINCIPLES

### Single Responsibility Principle (SRP)
```python
# ❌ Function làm quá nhiều việc
def process_student_data(data):
    # Validate data
    if not data or not isinstance(data, dict):
        raise ValueError("Invalid data")
    
    # Parse name
    full_name = data.get('name', '').strip()
    if not full_name:
        raise ValueError("Name is required")
    
    # Calculate grade
    scores = data.get('scores', [])
    average = sum(scores) / len(scores) if scores else 0
    
    # Determine status
    status = 'PASS' if average >= 5.0 else 'FAIL'
    
    # Format output
    result = f"{full_name}: {average:.2f} ({status})"
    
    # Log result
    print(f"Processed: {result}")
    
    # Save to file
    with open('results.txt', 'a') as f:
        f.write(result + '\n')
    
    return result

# ✅ Chia nhỏ thành các functions riêng biệt
def validate_student_data(data):
    """Validate dữ liệu học sinh."""
    if not data or not isinstance(data, dict):
        raise ValueError("Invalid data format")
    
    if not data.get('name', '').strip():
        raise ValueError("Name is required")
    
    return True

def calculate_average_score(scores):
    """Tính điểm trung bình."""
    if not scores:
        return 0.0
    return sum(scores) / len(scores)

def determine_pass_status(average, passing_grade=5.0):
    """Xác định trạng thái đậu/rớt."""
    return 'PASS' if average >= passing_grade else 'FAIL'

def format_student_result(name, average, status):
    """Format kết quả học sinh."""
    return f"{name.strip()}: {average:.2f} ({status})"

def log_result(message):
    """Ghi log kết quả."""
    print(f"Processed: {message}")

def save_result_to_file(result, filename='results.txt'):
    """Lưu kết quả vào file."""
    with open(filename, 'a', encoding='utf-8') as f:
        f.write(result + '\n')

def process_student_data(data):
    """Xử lý dữ liệu học sinh - orchestrator function."""
    validate_student_data(data)
    
    name = data['name']
    scores = data.get('scores', [])
    
    average = calculate_average_score(scores)
    status = determine_pass_status(average)
    result = format_student_result(name, average, status)
    
    log_result(result)
    save_result_to_file(result)
    
    return result
```

### DRY Principle (Don't Repeat Yourself)
```python
# ❌ Code lặp lại
def calculate_math_grade(scores):
    if not scores:
        return 0
    total = sum(scores)
    count = len(scores)
    average = total / count
    if average >= 8.5:
        return 'A'
    elif average >= 7.0:
        return 'B'
    elif average >= 5.5:
        return 'C'
    else:
        return 'F'

def calculate_science_grade(scores):
    if not scores:
        return 0
    total = sum(scores)
    count = len(scores)
    average = total / count
    if average >= 8.5:
        return 'A'
    elif average >= 7.0:
        return 'B'
    elif average >= 5.5:
        return 'C'
    else:
        return 'F'

# ✅ Tái sử dụng code
def calculate_average(scores):
    """Tính điểm trung bình."""
    if not scores:
        return 0.0
    return sum(scores) / len(scores)

def get_letter_grade(average):
    """Chuyển đổi điểm số thành điểm chữ."""
    grade_scale = [
        (8.5, 'A'),
        (7.0, 'B'), 
        (5.5, 'C'),
        (0.0, 'F')
    ]
    
    for min_score, letter in grade_scale:
        if average >= min_score:
            return letter
    return 'F'

def calculate_subject_grade(scores):
    """Tính điểm môn học."""
    average = calculate_average(scores)
    return get_letter_grade(average)

# Sử dụng
math_grade = calculate_subject_grade(math_scores)
science_grade = calculate_subject_grade(science_scores)
english_grade = calculate_subject_grade(english_scores)
```

### KISS Principle (Keep It Simple, Stupid)
```python
# ❌ Quá phức tạp
def is_passing_grade(scores, weights=None, curve=None, extra_credit=None):
    if weights is None:
        weights = [1.0] * len(scores)
    
    if curve is None:
        curve = lambda x: x
    
    if extra_credit is None:
        extra_credit = 0
    
    weighted_scores = []
    for i, score in enumerate(scores):
        weight = weights[i] if i < len(weights) else 1.0
        curved_score = curve(score)
        weighted_score = curved_score * weight
        weighted_scores.append(weighted_score)
    
    total_weight = sum(weights)
    weighted_average = sum(weighted_scores) / total_weight
    final_score = weighted_average + extra_credit
    
    return final_score >= 5.0

# ✅ Đơn giản và rõ ràng
def is_passing_grade(scores, passing_threshold=5.0):
    """Kiểm tra có đậu không (đơn giản)."""
    if not scores:
        return False
    
    average = sum(scores) / len(scores)
    return average >= passing_threshold

# Nếu cần tính năng phức tạp, tách riêng
class GradeCalculator:
    """Calculator cho các phép tính điểm phức tạp."""
    
    def __init__(self, passing_threshold=5.0):
        self.passing_threshold = passing_threshold
    
    def calculate_weighted_average(self, scores, weights):
        """Tính trung bình có trọng số."""
        if len(scores) != len(weights):
            raise ValueError("Scores and weights must have same length")
        
        weighted_sum = sum(score * weight for score, weight in zip(scores, weights))
        total_weight = sum(weights)
        
        return weighted_sum / total_weight if total_weight > 0 else 0
    
    def apply_curve(self, score, curve_function):
        """Áp dụng curve cho điểm."""
        return curve_function(score)
    
    def is_passing(self, final_score):
        """Kiểm tra đậu/rớt."""
        return final_score >= self.passing_threshold
```

---

## 🛡️ 2. DEFENSIVE PROGRAMMING

### Input Validation
```python
def create_student(name, age, email, student_id):
    """
    Tạo học sinh mới với validation đầy đủ.
    
    Args:
        name (str): Tên học sinh
        age (int): Tuổi
        email (str): Email
        student_id (str): Mã số học sinh
    
    Returns:
        Student: Đối tượng học sinh
    
    Raises:
        ValueError: Khi dữ liệu không hợp lệ
        TypeError: Khi kiểu dữ liệu sai
    """
    # Type validation
    if not isinstance(name, str):
        raise TypeError(f"Name must be string, got {type(name).__name__}")
    
    if not isinstance(age, int):
        raise TypeError(f"Age must be integer, got {type(age).__name__}")
    
    if not isinstance(email, str):
        raise TypeError(f"Email must be string, got {type(email).__name__}")
    
    if not isinstance(student_id, str):
        raise TypeError(f"Student ID must be string, got {type(student_id).__name__}")
    
    # Value validation
    name = name.strip()
    if not name:
        raise ValueError("Name cannot be empty")
    
    if len(name) > 100:
        raise ValueError("Name too long (max 100 characters)")
    
    if not 16 <= age <= 100:
        raise ValueError("Age must be between 16 and 100")
    
    # Email validation
    import re
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, email):
        raise ValueError("Invalid email format")
    
    # Student ID validation
    student_id = student_id.strip().upper()
    if not student_id:
        raise ValueError("Student ID cannot be empty")
    
    if not re.match(r'^[A-Z0-9]{6,10}$', student_id):
        raise ValueError("Student ID must be 6-10 alphanumeric characters")
    
    return Student(name, age, email, student_id)

# Helper function cho validation
def validate_grade(grade, subject=""):
    """Validate điểm số."""
    if not isinstance(grade, (int, float)):
        raise TypeError(f"Grade must be number, got {type(grade).__name__}")
    
    if not 0 <= grade <= 10:
        subject_info = f" for {subject}" if subject else ""
        raise ValueError(f"Grade{subject_info} must be between 0 and 10, got {grade}")
    
    return float(grade)
```

### Safe Operations
```python
def safe_divide(dividend, divisor, default=0):
    """Chia an toàn, tránh ZeroDivisionError."""
    try:
        if divisor == 0:
            return default
        return dividend / divisor
    except (TypeError, ValueError):
        return default

def safe_get_item(collection, key, default=None):
    """Lấy item an toàn từ collection."""
    try:
        if isinstance(collection, dict):
            return collection.get(key, default)
        elif isinstance(collection, (list, tuple)):
            if isinstance(key, int) and 0 <= key < len(collection):
                return collection[key]
            return default
        else:
            return getattr(collection, key, default)
    except (KeyError, IndexError, AttributeError, TypeError):
        return default

def safe_int_conversion(value, default=0):
    """Chuyển đổi thành int an toàn."""
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

# Ví dụ sử dụng
student_data = {"name": "An", "scores": [8, 9, "invalid", 7]}

# Safe processing
processed_scores = []
for score in student_data["scores"]:
    safe_score = safe_int_conversion(score)
    if safe_score > 0:  # Chỉ lấy điểm hợp lệ
        processed_scores.append(safe_score)

average = safe_divide(sum(processed_scores), len(processed_scores))
print(f"Average: {average}")
```

### Error Recovery
```python
import logging
from typing import Optional, Any

class DataProcessor:
    """Xử lý dữ liệu với error recovery."""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.failed_items = []
    
    def process_student_list(self, students_data):
        """Xử lý danh sách học sinh với error recovery."""
        processed_students = []
        
        for i, student_data in enumerate(students_data):
            try:
                student = self.process_single_student(student_data)
                if student:
                    processed_students.append(student)
            except Exception as e:
                self.logger.error(f"Failed to process student {i}: {e}")
                self.failed_items.append((i, student_data, str(e)))
                continue  # Tiếp tục với student tiếp theo
        
        # Report summary
        total = len(students_data)
        success = len(processed_students)
        failed = len(self.failed_items)
        
        self.logger.info(f"Processed {success}/{total} students successfully")
        if failed > 0:
            self.logger.warning(f"{failed} students failed to process")
        
        return processed_students
    
    def process_single_student(self, data):
        """Xử lý một học sinh với fallback values."""
        try:
            # Primary processing
            return self.create_student_from_data(data)
        except ValueError as e:
            # Try to recover with default values
            self.logger.warning(f"Using default values for student: {e}")
            return self.create_student_with_defaults(data)
    
    def create_student_with_defaults(self, data):
        """Tạo student với giá trị mặc định."""
        name = data.get('name', 'Unknown Student')
        age = safe_int_conversion(data.get('age'), 18)
        email = data.get('email', 'no-email@example.com')
        student_id = data.get('id', f"TEMP_{hash(name) % 10000:04d}")
        
        return {
            'name': name,
            'age': age,
            'email': email,
            'student_id': student_id,
            'status': 'incomplete_data'
        }
    
    def get_failed_items(self):
        """Lấy danh sách items failed để review."""
        return self.failed_items
```

---

## 🎭 3. DESIGN PATTERNS

### Factory Pattern
```python
from abc import ABC, abstractmethod
from enum import Enum

class StudentType(Enum):
    REGULAR = "regular"
    INTERNATIONAL = "international"
    EXCHANGE = "exchange"

class Student(ABC):
    """Base class cho tất cả loại học sinh."""
    
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
    
    @abstractmethod
    def calculate_tuition(self):
        """Tính học phí."""
        pass
    
    @abstractmethod
    def get_graduation_requirements(self):
        """Lấy yêu cầu tốt nghiệp."""
        pass

class RegularStudent(Student):
    """Học sinh thường."""
    
    def calculate_tuition(self):
        return 5000000  # 5 triệu VND
    
    def get_graduation_requirements(self):
        return {
            'min_credits': 120,
            'min_gpa': 2.0,
            'thesis_required': True
        }

class InternationalStudent(Student):
    """Học sinh quốc tế."""
    
    def __init__(self, name, student_id, country):
        super().__init__(name, student_id)
        self.country = country
    
    def calculate_tuition(self):
        return 15000000  # 15 triệu VND
    
    def get_graduation_requirements(self):
        return {
            'min_credits': 120,
            'min_gpa': 2.5,
            'thesis_required': True,
            'language_test': True
        }

class ExchangeStudent(Student):
    """Học sinh trao đổi."""
    
    def __init__(self, name, student_id, home_university, duration):
        super().__init__(name, student_id)
        self.home_university = home_university
        self.duration = duration
    
    def calculate_tuition(self):
        return 0  # Miễn học phí
    
    def get_graduation_requirements(self):
        return {
            'min_credits': 30,
            'min_gpa': 2.0,
            'thesis_required': False
        }

class StudentFactory:
    """Factory để tạo các loại học sinh."""
    
    @staticmethod
    def create_student(student_type: StudentType, **kwargs):
        """
        Tạo học sinh theo type.
        
        Args:
            student_type: Loại học sinh
            **kwargs: Các tham số cần thiết
        
        Returns:
            Student: Instance của học sinh
        """
        if student_type == StudentType.REGULAR:
            return RegularStudent(
                kwargs['name'],
                kwargs['student_id']
            )
        elif student_type == StudentType.INTERNATIONAL:
            return InternationalStudent(
                kwargs['name'],
                kwargs['student_id'],
                kwargs['country']
            )
        elif student_type == StudentType.EXCHANGE:
            return ExchangeStudent(
                kwargs['name'],
                kwargs['student_id'],
                kwargs['home_university'],
                kwargs['duration']
            )
        else:
            raise ValueError(f"Unknown student type: {student_type}")

# Sử dụng Factory
regular_student = StudentFactory.create_student(
    StudentType.REGULAR,
    name="Nguyễn Văn An",
    student_id="SV001"
)

international_student = StudentFactory.create_student(
    StudentType.INTERNATIONAL,
    name="John Smith",
    student_id="IS001",
    country="USA"
)
```

### Observer Pattern
```python
from typing import List, Protocol

class Observer(Protocol):
    """Interface cho Observer."""
    
    def update(self, student, event_type, data):
        """Được gọi khi có sự kiện."""
        pass

class GradeNotificationService:
    """Service gửi thông báo điểm."""
    
    def update(self, student, event_type, data):
        if event_type == 'grade_added':
            subject = data['subject']
            grade = data['grade']
            print(f"📧 Gửi email: {student.name} có điểm {grade} môn {subject}")
        elif event_type == 'grade_updated':
            subject = data['subject']
            old_grade = data['old_grade']
            new_grade = data['new_grade']
            print(f"📧 Điểm {subject} của {student.name} đã thay đổi: {old_grade} → {new_grade}")

class StatisticsService:
    """Service thống kê."""
    
    def update(self, student, event_type, data):
        if event_type in ['grade_added', 'grade_updated']:
            print(f"📊 Cập nhật thống kê cho {student.name}")

class ObservableStudent:
    """Student class với Observer pattern."""
    
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}
        self._observers: List[Observer] = []
    
    def add_observer(self, observer: Observer):
        """Thêm observer."""
        self._observers.append(observer)
    
    def remove_observer(self, observer: Observer):
        """Xóa observer."""
        if observer in self._observers:
            self._observers.remove(observer)
    
    def notify_observers(self, event_type, data):
        """Thông báo tất cả observers."""
        for observer in self._observers:
            observer.update(self, event_type, data)
    
    def add_grade(self, subject, grade):
        """Thêm điểm và thông báo observers."""
        old_grade = self.grades.get(subject)
        self.grades[subject] = grade
        
        if old_grade is None:
            # Điểm mới
            self.notify_observers('grade_added', {
                'subject': subject,
                'grade': grade
            })
        else:
            # Cập nhật điểm
            self.notify_observers('grade_updated', {
                'subject': subject,
                'old_grade': old_grade,
                'new_grade': grade
            })

# Sử dụng Observer Pattern
student = ObservableStudent("Nguyễn Văn An", "SV001")

# Đăng ký observers
notification_service = GradeNotificationService()
statistics_service = StatisticsService()

student.add_observer(notification_service)
student.add_observer(statistics_service)

# Thêm điểm - sẽ trigger notifications
student.add_grade("Toán", 8.5)
student.add_grade("Lý", 9.0)
student.add_grade("Toán", 9.0)  # Update điểm Toán
```

---

## 🚀 4. PERFORMANCE BEST PRACTICES

### Efficient Data Structures
```python
# ✅ Sử dụng set cho membership testing
def find_students_by_ids(all_students, target_ids):
    """Tìm học sinh theo danh sách IDs."""
    # Convert to set for O(1) lookup thay vì O(n)
    target_ids_set = set(target_ids)
    
    found_students = []
    for student in all_students:
        if student.id in target_ids_set:  # O(1) instead of O(n)
            found_students.append(student)
    
    return found_students

# ✅ Sử dụng dict cho lookup nhanh
def create_student_lookup(students):
    """Tạo lookup dictionary cho students."""
    return {student.id: student for student in students}

def find_student_by_id(student_lookup, student_id):
    """Tìm student bằng lookup dict - O(1)."""
    return student_lookup.get(student_id)

# ✅ List comprehension vs for loop
def get_passing_students_fast(students, min_grade=5.0):
    """Lấy danh sách học sinh đậu - cách nhanh."""
    return [
        student for student in students 
        if student.calculate_average() >= min_grade
    ]

# ✅ Generator cho memory efficiency
def get_high_achievers(students, min_gpa=3.5):
    """Generator cho học sinh giỏi - tiết kiệm memory."""
    for student in students:
        if student.gpa >= min_gpa:
            yield student

# Sử dụng generator
high_achievers = get_high_achievers(all_students)
for student in high_achievers:  # Lazy evaluation
    print(f"High achiever: {student.name}")
```

### Caching và Memoization
```python
from functools import lru_cache, cache
from typing import Dict, Any
import time

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}
        self._cache = {}
    
    @lru_cache(maxsize=128)
    def calculate_gpa(self):
        """Tính GPA với caching."""
        # Expensive calculation
        time.sleep(0.1)  # Simulate slow calculation
        
        if not self.grades:
            return 0.0
        
        total_points = sum(self.grades.values()) 
        return total_points / len(self.grades)
    
    def add_grade(self, subject, grade):
        """Thêm điểm và clear cache."""
        self.grades[subject] = grade
        # Clear cache khi data thay đổi
        self.calculate_gpa.cache_clear()
    
    def get_letter_grade(self):
        """Lấy điểm chữ với manual caching."""
        cache_key = 'letter_grade'
        
        # Check cache
        if cache_key in self._cache:
            return self._cache[cache_key]
        
        # Calculate và cache
        gpa = self.calculate_gpa()
        if gpa >= 3.5:
            letter = 'A'
        elif gpa >= 2.5:
            letter = 'B'
        elif gpa >= 1.5:
            letter = 'C'
        else:
            letter = 'F'
        
        self._cache[cache_key] = letter
        return letter

# Global cache cho expensive operations
@cache  # Python 3.9+
def get_university_ranking(university_name):
    """Lấy ranking trường đại học - cached."""
    # Simulate expensive API call
    time.sleep(2)
    return {"ranking": 100, "score": 85.5}

# Usage
student = Student("An", "SV001")
student.add_grade("Math", 3.5)
student.add_grade("Science", 4.0)

# First call - slow
start = time.time()
gpa1 = student.calculate_gpa()
print(f"First call: {time.time() - start:.2f}s")

# Second call - fast (cached)
start = time.time()
gpa2 = student.calculate_gpa()
print(f"Second call: {time.time() - start:.2f}s")
```

### Database Best Practices
```python
import sqlite3
from contextlib import contextmanager
from typing import List, Optional

class StudentDatabase:
    """Database operations với best practices."""
    
    def __init__(self, db_path):
        self.db_path = db_path
        self.init_database()
    
    @contextmanager
    def get_connection(self):
        """Context manager cho database connection."""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row  # Enable dict-like access
        try:
            yield conn
        finally:
            conn.close()
    
    def init_database(self):
        """Khởi tạo database với indexes."""
        with self.get_connection() as conn:
            conn.execute('''
                CREATE TABLE IF NOT EXISTS students (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id TEXT UNIQUE NOT NULL,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Tạo indexes cho performance
            conn.execute('CREATE INDEX IF NOT EXISTS idx_student_id ON students(student_id)')
            conn.execute('CREATE INDEX IF NOT EXISTS idx_email ON students(email)')
            
            conn.commit()
    
    def add_students_batch(self, students_data):
        """Thêm nhiều students cùng lúc - hiệu quả hơn."""
        with self.get_connection() as conn:
            conn.executemany('''
                INSERT OR IGNORE INTO students (student_id, name, email)
                VALUES (?, ?, ?)
            ''', students_data)
            conn.commit()
            return conn.total_changes
    
    def find_students_by_name_pattern(self, pattern):
        """Tìm students theo pattern - sử dụng prepared statement."""
        with self.get_connection() as conn:
            cursor = conn.execute('''
                SELECT * FROM students 
                WHERE name LIKE ? 
                ORDER BY name
            ''', (f'%{pattern}%',))
            return [dict(row) for row in cursor.fetchall()]
    
    def get_student_statistics(self):
        """Lấy thống kê với single query."""
        with self.get_connection() as conn:
            cursor = conn.execute('''
                SELECT 
                    COUNT(*) as total_students,
                    COUNT(DISTINCT SUBSTR(student_id, 1, 2)) as departments,
                    MIN(created_at) as first_registration,
                    MAX(created_at) as last_registration
                FROM students
            ''')
            return dict(cursor.fetchone())
```

---

## 🧪 5. TESTING BEST PRACTICES

### Unit Testing
```python
import unittest
from unittest.mock import Mock, patch
import tempfile
import os

class TestStudent(unittest.TestCase):
    """Test cases cho Student class."""
    
    def setUp(self):
        """Setup chạy trước mỗi test."""
        self.student = Student("Nguyễn Văn An", "SV001")
    
    def tearDown(self):
        """Cleanup sau mỗi test."""
        # Cleanup nếu cần
        pass
    
    def test_student_creation(self):
        """Test tạo student."""
        self.assertEqual(self.student.name, "Nguyễn Văn An")
        self.assertEqual(self.student.student_id, "SV001")
        self.assertEqual(self.student.grades, {})
    
    def test_add_grade_valid(self):
        """Test thêm điểm hợp lệ."""
        self.student.add_grade("Math", 8.5)
        self.assertEqual(self.student.grades["Math"], 8.5)
    
    def test_add_grade_invalid(self):
        """Test thêm điểm không hợp lệ."""
        with self.assertRaises(ValueError):
            self.student.add_grade("Math", 11)  # > 10
        
        with self.assertRaises(ValueError):
            self.student.add_grade("Math", -1)  # < 0
    
    def test_calculate_average_empty(self):
        """Test tính trung bình khi chưa có điểm."""
        self.assertEqual(self.student.calculate_average(), 0.0)
    
    def test_calculate_average_with_grades(self):
        """Test tính trung bình có điểm."""
        self.student.add_grade("Math", 8.0)
        self.student.add_grade("Science", 9.0)
        self.assertAlmostEqual(self.student.calculate_average(), 8.5)
    
    @patch('builtins.print')  # Mock print function
    def test_display_info(self, mock_print):
        """Test display info với mock."""
        self.student.display_info()
        mock_print.assert_called_once()
    
    def test_student_equality(self):
        """Test so sánh students."""
        student2 = Student("Nguyễn Văn An", "SV001")
        self.assertEqual(self.student, student2)
        
        student3 = Student("Trần Thị B", "SV002")
        self.assertNotEqual(self.student, student3)

class TestStudentDatabase(unittest.TestCase):
    """Test cases cho StudentDatabase."""
    
    def setUp(self):
        """Setup với temporary database."""
        self.temp_db = tempfile.NamedTemporaryFile(delete=False)
        self.temp_db.close()
        self.db = StudentDatabase(self.temp_db.name)
    
    def tearDown(self):
        """Cleanup temporary database."""
        os.unlink(self.temp_db.name)
    
    def test_add_student(self):
        """Test thêm student vào database."""
        student_data = ("SV001", "Nguyễn Văn An", "an@example.com")
        changes = self.db.add_students_batch([student_data])
        self.assertEqual(changes, 1)
    
    def test_find_student_by_pattern(self):
        """Test tìm student theo pattern."""
        # Setup data
        students_data = [
            ("SV001", "Nguyễn Văn An", "an@example.com"),
            ("SV002", "Trần Thị Bình", "binh@example.com"),
            ("SV003", "Lê Văn Chi", "chi@example.com")
        ]
        self.db.add_students_batch(students_data)
        
        # Test search
        results = self.db.find_students_by_name_pattern("Văn")
        self.assertEqual(len(results), 2)  # An và Chi
        
        names = [student['name'] for student in results]
        self.assertIn("Nguyễn Văn An", names)
        self.assertIn("Lê Văn Chi", names)

# Chạy tests
if __name__ == '__main__':
    unittest.main()
```

### Integration Testing
```python
import pytest
import requests_mock
import json

class TestStudentAPI:
    """Integration tests cho Student API."""
    
    @pytest.fixture
    def student_service(self):
        """Fixture cho StudentService."""
        return StudentService(base_url="https://api.example.com")
    
    def test_get_student_success(self, student_service):
        """Test lấy thông tin student thành công."""
        with requests_mock.Mocker() as m:
            # Mock API response
            mock_response = {
                "id": "SV001",
                "name": "Nguyễn Văn An",
                "email": "an@example.com"
            }
            m.get("https://api.example.com/students/SV001", json=mock_response)
            
            # Test
            student = student_service.get_student("SV001")
            assert student['name'] == "Nguyễn Văn An"
            assert student['email'] == "an@example.com"
    
    def test_get_student_not_found(self, student_service):
        """Test student không tìm thấy."""
        with requests_mock.Mocker() as m:
            m.get("https://api.example.com/students/SV999", status_code=404)
            
            with pytest.raises(StudentNotFoundError):
                student_service.get_student("SV999")
    
    @pytest.mark.parametrize("student_id,expected_department", [
        ("CS001", "Computer Science"),
        ("ME001", "Mechanical Engineering"),
        ("EE001", "Electrical Engineering")
    ])
    def test_get_department_by_id(self, student_id, expected_department):
        """Test lấy department theo student ID pattern."""
        department = get_department_from_id(student_id)
        assert department == expected_department
```

---

## 🔒 6. SECURITY BEST PRACTICES

### Input Sanitization
```python
import re
import html
from urllib.parse import quote

def sanitize_student_input(data):
    """Sanitize input data từ user."""
    sanitized = {}
    
    # Name sanitization
    if 'name' in data:
        name = str(data['name']).strip()
        # Remove potentially dangerous characters
        name = re.sub(r'[<>"\']', '', name)
        # Limit length
        sanitized['name'] = name[:100]
    
    # Email sanitization
    if 'email' in data:
        email = str(data['email']).strip().lower()
        # Basic email validation
        if re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
            sanitized['email'] = email
        else:
            raise ValueError("Invalid email format")
    
    # Phone sanitization
    if 'phone' in data:
        phone = re.sub(r'[^\d+]', '', str(data['phone']))
        if len(phone) >= 10:
            sanitized['phone'] = phone
        else:
            raise ValueError("Invalid phone number")
    
    return sanitized

def escape_html_output(text):
    """Escape HTML để tránh XSS."""
    return html.escape(str(text))

def safe_filename(filename):
    """Tạo filename an toàn."""
    # Remove path separators và special chars
    safe_name = re.sub(r'[^\w\-_\.]', '', filename)
    # Limit length
    return safe_name[:100]
```

### Configuration Management
```python
import os
from typing import Optional

class Config:
    """Configuration management với environment variables."""
    
    def __init__(self):
        self.database_url = self._get_env_var('DATABASE_URL', 'sqlite:///default.db')
        self.secret_key = self._get_env_var('SECRET_KEY', required=True)
        self.debug = self._get_env_bool('DEBUG', False)
        self.max_file_size = self._get_env_int('MAX_FILE_SIZE', 16 * 1024 * 1024)
        self.allowed_origins = self._get_env_list('ALLOWED_ORIGINS', ['localhost'])
    
    def _get_env_var(self, key: str, default: Optional[str] = None, required: bool = False) -> str:
        """Lấy environment variable."""
        value = os.getenv(key, default)
        if required and not value:
            raise ValueError(f"Required environment variable {key} is not set")
        return value
    
    def _get_env_bool(self, key: str, default: bool = False) -> bool:
        """Lấy boolean environment variable."""
        value = os.getenv(key, '').lower()
        return value in ('true', '1', 'yes', 'on')
    
    def _get_env_int(self, key: str, default: int) -> int:
        """Lấy integer environment variable."""
        try:
            return int(os.getenv(key, str(default)))
        except ValueError:
            return default
    
    def _get_env_list(self, key: str, default: list) -> list:
        """Lấy list environment variable (comma-separated)."""
        value = os.getenv(key)
        if not value:
            return default
        return [item.strip() for item in value.split(',')]

# Sử dụng
config = Config()
```

### Logging Security
```python
import logging
import re
from logging.handlers import RotatingFileHandler

class SecureFormatter(logging.Formatter):
    """Formatter loại bỏ sensitive information."""
    
    def __init__(self):
        super().__init__(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        # Patterns để ẩn sensitive data
        self.sensitive_patterns = [
            (re.compile(r'password["\']?\s*[:=]\s*["\']?([^"\'&\s]+)', re.IGNORECASE), 'password=***'),
            (re.compile(r'token["\']?\s*[:=]\s*["\']?([^"\'&\s]+)', re.IGNORECASE), 'token=***'),
            (re.compile(r'key["\']?\s*[:=]\s*["\']?([^"\'&\s]+)', re.IGNORECASE), 'key=***'),
            (re.compile(r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b'), '****-****-****-****'),  # Credit card
        ]
    
    def format(self, record):
        # Format message normally
        formatted = super().format(record)
        
        # Remove sensitive information
        for pattern, replacement in self.sensitive_patterns:
            formatted = pattern.sub(replacement, formatted)
        
        return formatted

def setup_secure_logging():
    """Setup logging với security measures."""
    # Create logger
    logger = logging.getLogger('student_app')
    logger.setLevel(logging.INFO)
    
    # File handler với rotation
    file_handler = RotatingFileHandler(
        'app.log',
        maxBytes=10*1024*1024,  # 10MB
        backupCount=5
    )
    file_handler.setFormatter(SecureFormatter())
    
    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(SecureFormatter())
    
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    
    return logger

# Usage
logger = setup_secure_logging()
logger.info("User login attempt: username=admin, password=secret123")
# Log output: "User login attempt: username=admin, password=***"
```

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [📋 Python Cheatsheet](./python-cheatsheet.md) - Bảng tra cứu nhanh
- [📐 Quy tắc viết code](./coding-style.md) - Coding style guide
- [⚡ Tối ưu hiệu suất](./performance-tips.md) - Performance optimization
- [🐛 Thông báo lỗi](./error-messages.md) - Error handling

---

## 🎯 Tóm Tắt

### 🎨 **Clean Code Principles:**
- **Single Responsibility** - Mỗi function làm một việc
- **DRY** - Don't Repeat Yourself
- **KISS** - Keep It Simple, Stupid
- **Readable** - Code phải dễ đọc như văn xuôi

### 🛡️ **Defensive Programming:**
- **Validate inputs** - Luôn kiểm tra dữ liệu đầu vào
- **Handle errors gracefully** - Xử lý lỗi một cách elegantly
- **Fail fast** - Phát hiện lỗi sớm nhất có thể
- **Provide fallbacks** - Luôn có plan B

### 🎭 **Design Patterns:**
- **Factory** - Tạo objects một cách linh hoạt
- **Observer** - Loose coupling between components
- **Singleton** - Đảm bảo chỉ có một instance
- **Strategy** - Algorithms có thể thay đổi được

### 🚀 **Performance:**
- **Choose right data structures** - set cho lookup, dict cho mapping
- **Use caching** - Cache expensive operations
- **Lazy evaluation** - Generators thay vì lists khi có thể
- **Database optimization** - Indexes, batch operations

### 🧪 **Testing:**
- **Unit tests** - Test từng component riêng lẻ
- **Integration tests** - Test các components work together
- **Mocking** - Isolate components under test
- **Parametrized tests** - Test nhiều cases cùng lúc

### 🔒 **Security:**
- **Validate và sanitize inputs** - Never trust user input
- **Environment variables** - Không hardcode secrets
- **Secure logging** - Mask sensitive information
- **Principle of least privilege** - Chỉ cho permissions cần thiết

### 💡 **Golden Rules:**
1. **Code for humans** - Machines don't care, humans do
2. **Test early, test often** - Bugs are cheaper to fix early
3. **Measure before optimizing** - Don't guess, profile
4. **Security by design** - Not an afterthought
5. **Document your assumptions** - Future you will thank you

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: Best practices are guidelines, not laws - use judgment!*
