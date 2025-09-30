# 📖 Thuật Ngữ Lập Trình - Programming Terms

> **Tóm tắt**: Từ điển các thuật ngữ lập trình cơ bản được giải thích theo phong cách ELI5 (Explain Like I'm 5), giúp người mới bắt đầu hiểu rõ các khái niệm từ A đến Z.

## 🎯 Tại Sao Cần Hiểu Thuật Ngữ?

Hãy tưởng tượng bạn đi du lịch nước ngoài mà không biết ngôn ngữ địa phương 🗺️. Lập trình cũng vậy! Các thuật ngữ giống như "ngôn ngữ chung" mà tất cả lập trình viên sử dụng để giao tiếp.

Hiểu thuật ngữ giúp bạn:
- **Đọc tài liệu** dễ dàng hơn 📚
- **Giao tiếp** với developer khác 💬
- **Tìm kiếm** giải pháp trên Google 🔍
- **Học** các ngôn ngữ khác nhanh hơn 🚀

---

## 🔤 THUẬT NGỮ THEO THỨ TỰ ABC

### **A**

#### **Algorithm (Thuật toán)**
**Giải thích đơn giản**: Như một công thức nấu ăn! 👨‍🍳

Thuật toán là một chuỗi các bước cụ thể để giải quyết một vấn đề. Giống như khi bạn nấu phở, bạn phải làm theo thứ tự: luộc xương → nấu nước dùng → chuẩn bị bánh phở → pha chén.

```python
# Ví dụ: Thuật toán tìm số lớn nhất trong danh sách
def find_maximum(numbers):
    """Thuật toán tìm số lớn nhất."""
    if not numbers:  # Nếu danh sách trống
        return None
    
    max_num = numbers[0]  # Giả sử số đầu tiên là lớn nhất
    
    for num in numbers[1:]:  # Kiểm tra từng số còn lại
        if num > max_num:
            max_num = num
    
    return max_num

# Sử dụng
scores = [85, 92, 78, 96, 89]
highest_score = find_maximum(scores)
print(f"Điểm cao nhất: {highest_score}")  # Kết quả: 96
```

#### **API (Application Programming Interface)**
**Giải thích đơn giản**: Như menu nhà hàng! 🍽️

API là "thực đơn" của một chương trình. Nó cho bạn biết bạn có thể "gọi món" gì (function nào) và cần "nguyên liệu" gì (parameters).

```python
# Ví dụ: API của một "nhà hàng" (class)
class Restaurant:
    """API của nhà hàng - menu các món có thể gọi."""
    
    def __init__(self):
        self.menu = {
            'pho': 50000,
            'bun_bo': 45000,
            'com_tam': 40000
        }
    
    def order_food(self, dish_name, quantity=1):
        """API method - gọi món ăn."""
        if dish_name not in self.menu:
            return f"Xin lỗi, không có món {dish_name}"
        
        price = self.menu[dish_name] * quantity
        return f"Đã gọi {quantity} {dish_name}, tổng: {price:,}đ"
    
    def get_menu(self):
        """API method - xem thực đơn."""
        return self.menu

# Sử dụng API
restaurant = Restaurant()
print(restaurant.order_food('pho', 2))  # Gọi món qua API
print(restaurant.get_menu())  # Xem menu qua API
```

#### **Array (Mảng)**
**Giải thích đơn giản**: Như dãy tủ có số thứ tự! 🗄️

Mảng là cách lưu trữ nhiều giá trị cùng kiểu trong một "container", mỗi giá trị có một vị trí (index) cụ thể.

```python
# Trong Python, list hoạt động như array
students = ["An", "Bình", "Cường", "Dung", "Em"]
#           [0]   [1]    [2]      [3]    [4]  <- Index

print(f"Học sinh thứ nhất: {students[0]}")  # An
print(f"Học sinh cuối cùng: {students[-1]}")  # Em
print(f"Tổng số học sinh: {len(students)}")  # 5

# Duyệt qua mảng
for i, student in enumerate(students):
    print(f"Vị trí {i}: {student}")
```

### **B**

#### **Bug (Lỗi)**
**Giải thích đơn giản**: Như con kiến trong máy tính! 🐛

Bug là lỗi trong code khiến chương trình hoạt động không đúng. Tên gọi này xuất phát từ việc tìm thấy con bướm đêm trong máy tính đời đầu!

```python
# Ví dụ các loại bug phổ biến

# 1. Syntax Error - Lỗi cú pháp
# print("Hello World"  # Thiếu dấu ngoặc đóng

# 2. Logic Error - Lỗi logic
def calculate_average(numbers):
    """Tính trung bình - có bug logic."""
    total = sum(numbers)
    # Bug: chia cho 0 khi danh sách trống
    return total / len(numbers)  # Sẽ lỗi nếu numbers = []

# Sửa bug:
def calculate_average_fixed(numbers):
    """Tính trung bình - đã sửa bug."""
    if not numbers:  # Kiểm tra danh sách trống
        return 0
    return sum(numbers) / len(numbers)

# 3. Runtime Error - Lỗi khi chạy
def divide_numbers(a, b):
    """Chia hai số - có thể có bug."""
    return a / b  # Bug: chia cho 0

# Test
try:
    result = divide_numbers(10, 0)  # Sẽ gây lỗi
except ZeroDivisionError:
    print("Bug đã được bắt: không thể chia cho 0!")
```

#### **Boolean (Kiểu Bool)**
**Giải thích đơn giản**: Như công tắc đèn! 💡

Boolean chỉ có 2 giá trị: `True` (bật) hoặc `False` (tắt). Được đặt tên theo nhà toán học George Boole.

```python
# Boolean cơ bản
is_student = True
is_graduated = False

print(f"Là học sinh: {is_student}")
print(f"Đã tốt nghiệp: {is_graduated}")

# Boolean từ so sánh
age = 18
is_adult = age >= 18  # True
is_child = age < 13   # False

print(f"Đã thành niên: {is_adult}")

# Boolean trong điều kiện
if is_student and not is_graduated:
    print("Đang còn đi học")
elif is_graduated:
    print("Đã tốt nghiệp")
else:
    print("Không rõ trạng thái")

# Boolean với các phép toán logic
has_id = True
has_money = True
can_buy_ticket = has_id and has_money  # True

print(f"Có thể mua vé: {can_buy_ticket}")
```

### **C**

#### **Class (Lớp)**
**Giải thích đơn giản**: Như bản thiết kế nhà! 🏠

Class là "bản thiết kế" để tạo ra các object (đối tượng). Giống như bản vẽ kiến trúc, từ một class bạn có thể tạo ra nhiều object.

```python
class Student:
    """Class Student - bản thiết kế của học sinh."""
    
    def __init__(self, name, age, student_id):
        """Constructor - hàm khởi tạo."""
        self.name = name  # Thuộc tính (attribute)
        self.age = age
        self.student_id = student_id
        self.grades = []  # Danh sách điểm
    
    def add_grade(self, subject, score):
        """Method - phương thức thêm điểm."""
        grade = {
            'subject': subject,
            'score': score
        }
        self.grades.append(grade)
    
    def get_average(self):
        """Method - tính điểm trung bình."""
        if not self.grades:
            return 0
        total = sum(grade['score'] for grade in self.grades)
        return total / len(self.grades)
    
    def introduce(self):
        """Method - tự giới thiệu."""
        avg = self.get_average()
        return f"Xin chào, tôi là {self.name}, {self.age} tuổi, MSSV: {self.student_id}, ĐTB: {avg:.1f}"

# Tạo object từ class
student1 = Student("Nguyễn Văn An", 20, "SV001")
student2 = Student("Trần Thị Bình", 19, "SV002")

# Sử dụng methods
student1.add_grade("Toán", 8.5)
student1.add_grade("Lý", 9.0)

print(student1.introduce())
```

#### **Compiler (Trình biên dịch)**
**Giải thích đơn giản**: Như thông dịch viên! 🗣️

Compiler chuyển đổi code từ ngôn ngữ lập trình sang ngôn ngữ máy (machine code) mà máy tính hiểu được.

```python
# Python là interpreted language, không cần compile trước
# Nhưng có thể dùng py_compile để tạo bytecode

import py_compile
import os

# Tạo file Python đơn giản
simple_code = '''
def greet(name):
    """Hàm chào hỏi."""
    return f"Xin chào {name}!"

if __name__ == "__main__":
    print(greet("Python"))
'''

# Ghi vào file
with open('simple_program.py', 'w', encoding='utf-8') as f:
    f.write(simple_code)

# "Compile" thành bytecode
py_compile.compile('simple_program.py')

print("Đã tạo file .pyc (bytecode)")
print("Trong Python:")
print("  Source code (.py) → Bytecode (.pyc) → Machine code")

# Cleanup
if os.path.exists('simple_program.py'):
    os.remove('simple_program.py')
```

### **D**

#### **Database (Cơ sở dữ liệu)**
**Giải thích đơn giản**: Như tủ hồ sơ khổng lồ! 🗃️

Database là nơi lưu trữ và tổ chức dữ liệu một cách có hệ thống, giúp tìm kiếm và quản lý thông tin dễ dàng.

```python
import sqlite3
from datetime import datetime

class StudentDatabase:
    """Ví dụ về database đơn giản với SQLite."""
    
    def __init__(self, db_name="students.db"):
        self.connection = sqlite3.connect(db_name)
        self.create_table()
    
    def create_table(self):
        """Tạo bảng students."""
        self.connection.execute('''
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                age INTEGER,
                email TEXT UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        self.connection.commit()
    
    def add_student(self, name, age, email):
        """Thêm học sinh vào database."""
        try:
            self.connection.execute('''
                INSERT INTO students (name, age, email)
                VALUES (?, ?, ?)
            ''', (name, age, email))
            self.connection.commit()
            print(f"✅ Đã thêm {name} vào database")
        except sqlite3.IntegrityError:
            print(f"❌ Email {email} đã tồn tại!")
    
    def find_student(self, name):
        """Tìm học sinh theo tên."""
        cursor = self.connection.execute('''
            SELECT * FROM students WHERE name LIKE ?
        ''', (f'%{name}%',))
        
        results = cursor.fetchall()
        return results
    
    def close(self):
        """Đóng kết nối database."""
        self.connection.close()

# Sử dụng database
db = StudentDatabase()

# Thêm dữ liệu
db.add_student("Nguyễn Văn An", 20, "an@example.com")
db.add_student("Trần Thị Bình", 19, "binh@example.com")

# Tìm kiếm
results = db.find_student("An")
print(f"Kết quả tìm kiếm: {results}")

db.close()
```

#### **Debug (Gỡ lỗi)**
**Giải thích đơn giản**: Như thám tử điều tra! 🕵️‍♂️

Debug là quá trình tìm và sửa lỗi trong code. Giống như thám tử, bạn phải theo dõi manh mối để tìm ra nguyên nhân.

```python
import pdb  # Python Debugger

def calculate_grade(scores):
    """Tính điểm trung bình - có thể có lỗi."""
    print(f"📊 Đầu vào: {scores}")
    
    # Breakpoint để debug
    # pdb.set_trace()  # Uncomment để dừng tại đây
    
    total = 0
    count = 0
    
    for score in scores:
        print(f"  Đang xử lý điểm: {score}")
        if score >= 0:  # Chỉ tính điểm hợp lệ
            total += score
            count += 1
    
    if count == 0:
        print("⚠️ Không có điểm hợp lệ!")
        return 0
    
    average = total / count
    print(f"📈 Kết quả: {total}/{count} = {average:.2f}")
    return average

# Debug techniques
def debug_example():
    """Các kỹ thuật debug phổ biến."""
    
    # 1. Print debugging - cách đơn giản nhất
    test_scores = [8.5, 9.0, -1, 7.5, 10.0]
    print("=== PRINT DEBUGGING ===")
    result = calculate_grade(test_scores)
    
    # 2. Assert statements - kiểm tra giả định
    print("\n=== ASSERT DEBUGGING ===")
    assert result > 0, "Điểm trung bình phải > 0"
    assert result <= 10, "Điểm trung bình phải <= 10"
    print("✅ Tất cả assertions đều passed!")
    
    # 3. Try-except để bắt lỗi
    print("\n=== EXCEPTION HANDLING ===")
    try:
        empty_scores = []
        result2 = calculate_grade(empty_scores)
        print(f"Kết quả với list rỗng: {result2}")
    except Exception as e:
        print(f"❌ Lỗi: {e}")

# Chạy debug example
debug_example()

# 4. Logging - ghi lại quá trình
import logging

logging.basicConfig(level=logging.DEBUG, 
                   format='%(asctime)s - %(levelname)s - %(message)s')

def logged_function(x, y):
    """Function có logging để debug."""
    logging.debug(f"Bắt đầu với x={x}, y={y}")
    
    if y == 0:
        logging.error("Lỗi: Không thể chia cho 0!")
        return None
    
    result = x / y
    logging.info(f"Kết quả: {x}/{y} = {result}")
    return result

# Test logging
print("\n=== LOGGING DEBUGGING ===")
logged_function(10, 2)
logged_function(10, 0)
```

### **E**

#### **Exception (Ngoại lệ)**
**Giải thích đơn giản**: Như báo động cháy! 🚨

Exception là "tín hiệu báo động" khi có gì đó bất thường xảy ra trong chương trình.

```python
# Các loại exception phổ biến
def exception_examples():
    """Ví dụ các loại exception thường gặp."""
    
    print("=== CÁC LOẠI EXCEPTION PHỔ BIẾN ===")
    
    # 1. ValueError - Giá trị không hợp lệ
    try:
        age = int("abc")  # Không thể chuyển "abc" thành số
    except ValueError as e:
        print(f"1. ValueError: {e}")
    
    # 2. ZeroDivisionError - Chia cho 0
    try:
        result = 10 / 0
    except ZeroDivisionError as e:
        print(f"2. ZeroDivisionError: {e}")
    
    # 3. KeyError - Key không tồn tại
    try:
        student = {"name": "An", "age": 20}
        grade = student["grade"]  # Key "grade" không tồn tại
    except KeyError as e:
        print(f"3. KeyError: {e}")
    
    # 4. IndexError - Index ngoài phạm vi
    try:
        numbers = [1, 2, 3]
        item = numbers[10]  # Index 10 không tồn tại
    except IndexError as e:
        print(f"4. IndexError: {e}")
    
    # 5. FileNotFoundError - File không tồn tại
    try:
        with open("nonexistent_file.txt", "r") as f:
            content = f.read()
    except FileNotFoundError as e:
        print(f"5. FileNotFoundError: {e}")

# Custom Exception
class StudentError(Exception):
    """Custom exception cho student-related errors."""
    pass

class Student:
    """Class Student với exception handling."""
    
    def __init__(self, name, age):
        if not name or not name.strip():
            raise StudentError("Tên học sinh không được để trống!")
        
        if age < 0 or age > 100:
            raise StudentError(f"Tuổi {age} không hợp lệ (phải từ 0-100)!")
        
        self.name = name.strip()
        self.age = age
        self.grades = []
    
    def add_grade(self, subject, score):
        """Thêm điểm với validation."""
        if not subject or not subject.strip():
            raise StudentError("Tên môn học không được để trống!")
        
        if not (0 <= score <= 10):
            raise StudentError(f"Điểm {score} phải từ 0-10!")
        
        self.grades.append({
            'subject': subject.strip(),
            'score': score
        })
    
    def get_average(self):
        """Tính điểm trung bình."""
        if not self.grades:
            raise StudentError("Chưa có điểm nào để tính trung bình!")
        
        total = sum(grade['score'] for grade in self.grades)
        return total / len(self.grades)

# Test custom exceptions
def test_student_exceptions():
    """Test các exception của Student class."""
    print("\n=== CUSTOM EXCEPTION EXAMPLES ===")
    
    # Test case 1: Tên rỗng
    try:
        student = Student("", 20)
    except StudentError as e:
        print(f"❌ {e}")
    
    # Test case 2: Tuổi không hợp lệ
    try:
        student = Student("An", -5)
    except StudentError as e:
        print(f"❌ {e}")
    
    # Test case 3: Điểm không hợp lệ
    try:
        student = Student("An", 20)
        student.add_grade("Toán", 15)  # Điểm > 10
    except StudentError as e:
        print(f"❌ {e}")
    
    # Test case 4: Tính trung bình khi chưa có điểm
    try:
        student = Student("An", 20)
        avg = student.get_average()
    except StudentError as e:
        print(f"❌ {e}")
    
    # Test case 5: Thành công
    try:
        student = Student("Nguyễn Văn An", 20)
        student.add_grade("Toán", 8.5)
        student.add_grade("Lý", 9.0)
        avg = student.get_average()
        print(f"✅ Thành công! Điểm TB của {student.name}: {avg:.1f}")
    except StudentError as e:
        print(f"❌ {e}")

# Chạy examples
exception_examples()
test_student_exceptions()
```

### **F**

#### **Function (Hàm)**
**Giải thích đơn giản**: Như máy pha cà phê! ☕

Function là một "máy" nhận đầu vào (input), xử lý, và trả về kết quả (output). Giống như máy pha cà phê: bỏ bột vào → ấn nút → có cà phê.

```python
# Function cơ bản
def greet(name):
    """Hàm chào hỏi - input: tên, output: lời chào."""
    return f"Xin chào {name}!"

# Sử dụng function
message = greet("Python")
print(message)  # Xin chào Python!

# Function với nhiều parameters
def calculate_bmi(weight, height):
    """Tính chỉ số BMI."""
    bmi = weight / (height ** 2)
    
    if bmi < 18.5:
        category = "Gầy"
    elif bmi < 25:
        category = "Bình thường"
    elif bmi < 30:
        category = "Thừa cân"
    else:
        category = "Béo phì"
    
    return {
        'bmi': round(bmi, 2),
        'category': category
    }

# Test BMI function
result = calculate_bmi(65, 1.7)  # 65kg, 1.7m
print(f"BMI: {result['bmi']}, Phân loại: {result['category']}")

# Function với default parameters
def make_coffee(coffee_type="cà phê đen", sugar_level=1, milk=False):
    """Pha cà phê với các tùy chọn."""
    coffee = f"Một ly {coffee_type}"
    
    if sugar_level > 0:
        coffee += f" với {sugar_level} thìa đường"
    
    if milk:
        coffee += " và sữa"
    
    return coffee

# Sử dụng với default values
print(make_coffee())  # Cà phê đen, 1 thìa đường
print(make_coffee("cappuccino", 2, True))  # Custom coffee
print(make_coffee(milk=True))  # Chỉ đổi milk, giữ defaults khác
```

### **G**

#### **Git (Hệ thống quản lý phiên bản)**
**Giải thích đơn giản**: Như máy time travel! ⏰

Git giúp bạn lưu lại lịch sử thay đổi của code, có thể quay về phiên bản trước nếu cần.

```bash
# Các lệnh Git cơ bản (chạy trong terminal)

# Khởi tạo git repository
git init

# Thêm files vào staging area
git add .

# Commit với message
git commit -m "Thêm function tính BMI"

# Xem lịch sử commit
git log --oneline

# Tạo branch mới
git branch feature-calculator

# Chuyển sang branch khác
git checkout feature-calculator

# Merge branch
git merge feature-calculator
```

```python
# Trong Python, có thể dùng GitPython library
# pip install GitPython

try:
    import git
    
    def git_info(repo_path="."):
        """Lấy thông tin Git repository."""
        try:
            repo = git.Repo(repo_path)
            
            # Thông tin cơ bản
            info = {
                'current_branch': repo.active_branch.name,
                'last_commit': repo.head.commit.hexsha[:7],
                'commit_message': repo.head.commit.message.strip(),
                'author': repo.head.commit.author.name,
                'commit_date': repo.head.commit.committed_datetime.strftime('%Y-%m-%d %H:%M:%S')
            }
            
            print("=== GIT REPOSITORY INFO ===")
            for key, value in info.items():
                print(f"{key}: {value}")
            
            return info
            
        except git.InvalidGitRepositoryError:
            print("❌ Không phải Git repository!")
            return None
    
    # git_info()  # Uncomment nếu đang trong Git repo
    
except ImportError:
    print("GitPython chưa được cài đặt")
    print("Cài đặt: pip install GitPython")
```

### **H**

#### **Hash (Băm)**
**Giải thích đơn giản**: Như dấu vân tay! 👆

Hash biến đổi dữ liệu thành một chuỗi có độ dài cố định, như "dấu vân tay" duy nhất của dữ liệu đó.

```python
import hashlib

def demonstrate_hashing():
    """Demo các loại hash function."""
    
    # Dữ liệu test
    password = "my_secret_password"
    
    print("=== HASH FUNCTIONS ===")
    print(f"Original: {password}")
    
    # MD5 (không an toàn cho security)
    md5_hash = hashlib.md5(password.encode()).hexdigest()
    print(f"MD5: {md5_hash}")
    
    # SHA-256 (an toàn hơn)
    sha256_hash = hashlib.sha256(password.encode()).hexdigest()
    print(f"SHA-256: {sha256_hash}")
    
    # SHA-512 (an toàn nhất)
    sha512_hash = hashlib.sha512(password.encode()).hexdigest()
    print(f"SHA-512: {sha512_hash[:64]}...")  # Chỉ hiển thị 64 ký tự đầu

# Password hashing with salt
import secrets

class PasswordManager:
    """Quản lý mật khẩu an toàn với salt."""
    
    @staticmethod
    def hash_password(password):
        """Hash password với salt ngẫu nhiên."""
        # Tạo salt ngẫu nhiên
        salt = secrets.token_hex(16)
        
        # Kết hợp password với salt
        password_salt = password + salt
        
        # Hash
        hashed = hashlib.sha256(password_salt.encode()).hexdigest()
        
        # Trả về salt và hash
        return {
            'salt': salt,
            'hash': hashed
        }
    
    @staticmethod
    def verify_password(password, stored_salt, stored_hash):
        """Kiểm tra password có đúng không."""
        # Hash password với salt đã lưu
        password_salt = password + stored_salt
        hashed = hashlib.sha256(password_salt.encode()).hexdigest()
        
        # So sánh với hash đã lưu
        return hashed == stored_hash

# Test password manager
print("\n=== PASSWORD HASHING ===")
password_mgr = PasswordManager()

# Hash password
user_password = "super_secret_123"
stored_data = password_mgr.hash_password(user_password)

print(f"Original password: {user_password}")
print(f"Salt: {stored_data['salt']}")
print(f"Hash: {stored_data['hash'][:32]}...")

# Verify password
is_correct = password_mgr.verify_password(
    user_password, 
    stored_data['salt'], 
    stored_data['hash']
)
print(f"Password verification: {'✅ Correct' if is_correct else '❌ Wrong'}")

# Test wrong password
wrong_password = "wrong_password"
is_wrong = password_mgr.verify_password(
    wrong_password, 
    stored_data['salt'], 
    stored_data['hash']
)
print(f"Wrong password test: {'❌ Should be False' if is_wrong else '✅ Correctly rejected'}")

demonstrate_hashing()
```

---

## 🔍 TÌM KIẾM NHANH

### Tìm theo chữ cái đầu
- **[A](#a)**: Algorithm, API, Array
- **[B](#b)**: Bug, Boolean 
- **[C](#c)**: Class, Compiler
- **[D](#d)**: Database, Debug
- **[E](#e)**: Exception
- **[F](#f)**: Function
- **[G](#g)**: Git
- **[H](#h)**: Hash

### Tìm theo chủ đề
- **Cấu trúc dữ liệu**: Array, Boolean, Class
- **Lỗi & Debug**: Bug, Debug, Exception
- **Lập trình**: Algorithm, Function, API
- **Công cụ**: Git, Compiler, Database
- **Bảo mật**: Hash

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [🐍 Thuật Ngữ Python](./python-specific.md) - Thuật ngữ riêng của Python
- [📊 Cấu Trúc Dữ Liệu](./data-structures.md) - Chi tiết về data structures
- [🔄 Thuật Toán](./algorithms.md) - Các thuật toán cơ bản
- [📋 Python Cheatsheet](../reference/python-cheatsheet.md) - Tra cứu nhanh

---

## 💡 Lời Khuyên Học Thuật Ngữ

### 🎯 **Chiến lược học hiệu quả:**
1. **Học từng nhóm** - Nhóm các thuật ngữ liên quan
2. **Thực hành code** - Áp dụng ngay vào bài tập
3. **Tạo flashcards** - Ôn tập thường xuyên
4. **Giải thích cho người khác** - Cách học tốt nhất
5. **Đọc code người khác** - Thấy thuật ngữ trong context

### 📚 **Tài nguyên bổ sung:**
- **Google Translate** - Dịch thuật ngữ sang tiếng Việt
- **Stack Overflow** - Xem cách sử dụng thực tế
- **GitHub** - Đọc code của projects khác
- **Documentation** - Tài liệu chính thức
- **YouTube** - Video giải thích visual

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: "Thuật ngữ là chìa khóa mở cửa vào thế giới lập trình!"*
