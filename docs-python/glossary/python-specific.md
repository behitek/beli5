# 🐍 Thuật Ngữ Python - Python-Specific Terms

> **Tóm tắt**: Từ điển các thuật ngữ chuyên biệt của Python, bao gồm các khái niệm, cú pháp và tính năng độc đáo mà chỉ có trong Python hoặc được Python định nghĩa theo cách riêng.

## 🎯 Tại Sao Python Có Thuật Ngữ Riêng?

Python như một quốc gia có văn hóa riêng! 🏛️ Mỗi ngôn ngữ lập trình có những đặc trưng và thuật ngữ riêng. Hiểu được "ngôn ngữ Python" giúp bạn:

- **Đọc tài liệu** Python dễ dàng 📖
- **Giao tiếp** với Python developers 🤝
- **Hiểu sâu** triết lý của Python 🧘‍♂️
- **Debug** hiệu quả hơn 🔧

---

## 🐍 THUẬT NGỮ PYTHON THEO ABC

### **A**

#### **`__all__` (All exports)**
**Giải thích đơn giản**: Như danh sách "món ăn được phép mang đi"! 🍽️

`__all__` định nghĩa những gì được "xuất khẩu" khi ai đó dùng `from module import *`.

```python
# file: math_utils.py
"""Module tính toán đơn giản."""

def add(a, b):
    """Hàm cộng công khai."""
    return a + b

def subtract(a, b):
    """Hàm trừ công khai."""
    return a - b

def _private_helper():
    """Hàm riêng tư, không nên export."""
    return "This is private"

def _another_private():
    """Hàm riêng tư khác."""
    return "Also private"

# Định nghĩa những gì được export
__all__ = ['add', 'subtract']  # Chỉ export 2 hàm này

# Khi ai đó dùng: from math_utils import *
# Họ chỉ có thể dùng add() và subtract()
# Không thể dùng _private_helper() và _another_private()
```

```python
# Demo __all__
def demo_all_usage():
    """Demo cách __all__ hoạt động."""
    
    # Giả lập việc import
    print("=== DEMO __all__ ===")
    print("Trong math_utils.py có:")
    print("- add() ✅ (trong __all__)")
    print("- subtract() ✅ (trong __all__)")
    print("- _private_helper() ❌ (không trong __all__)")
    print("- _another_private() ❌ (không trong __all__)")
    
    print("\nKhi dùng: from math_utils import *")
    print("Chỉ có thể dùng: add(), subtract()")

demo_all_usage()
```

#### **Args và Kwargs**
**Giải thích đơn giản**: Như "buffet" và "menu đặc biệt"! 🍤

- `*args`: Nhận **nhiều arguments** (như buffet - ăn bao nhiêu cũng được)
- `**kwargs**: Nhận **keyword arguments** (như menu đặc biệt - gọi theo tên)

```python
def flexible_function(*args, **kwargs):
    """Hàm linh hoạt nhận bất kỳ số lượng arguments nào."""
    print("=== ARGS VÀ KWARGS DEMO ===")
    
    # Xử lý args (positional arguments)
    print(f"Positional arguments (*args): {args}")
    print(f"Số lượng args: {len(args)}")
    
    if args:
        print("Chi tiết từng arg:")
        for i, arg in enumerate(args):
            print(f"  arg[{i}]: {arg} (type: {type(arg).__name__})")
    
    # Xử lý kwargs (keyword arguments)
    print(f"\nKeyword arguments (**kwargs): {kwargs}")
    print(f"Số lượng kwargs: {len(kwargs)}")
    
    if kwargs:
        print("Chi tiết từng kwarg:")
        for key, value in kwargs.items():
            print(f"  {key} = {value} (type: {type(value).__name__})")

# Test với nhiều kiểu arguments
print("Test 1: Chỉ args")
flexible_function(1, "hello", [1, 2, 3])

print("\nTest 2: Chỉ kwargs")
flexible_function(name="An", age=20, grade=8.5)

print("\nTest 3: Cả args và kwargs")
flexible_function("Python", 3.9, True, language="Python", level="intermediate")

# Practical example: Student registration
def register_student(name, *subjects, **info):
    """Đăng ký học sinh với môn học và thông tin bổ sung."""
    print(f"\n=== ĐĂNG KÝ HỌC SINH ===")
    print(f"Tên: {name}")
    
    # Subjects (args)
    if subjects:
        print(f"Môn học ({len(subjects)} môn):")
        for subject in subjects:
            print(f"  - {subject}")
    else:
        print("Chưa đăng ký môn nào")
    
    # Additional info (kwargs)
    if info:
        print("Thông tin bổ sung:")
        for key, value in info.items():
            print(f"  {key}: {value}")
    
    return {
        'name': name,
        'subjects': list(subjects),
        'info': info
    }

# Test student registration
student1 = register_student(
    "Nguyễn Văn An",  # name
    "Toán", "Lý", "Hóa",  # *subjects
    age=18, city="Hà Nội", email="an@example.com"  # **info
)

student2 = register_student(
    "Trần Thị Bình",
    "Văn", "Sử", "Địa", "Sinh",
    age=17, phone="0123456789"
)
```

### **B**

#### **Built-in (Có sẵn)**
**Giải thích đơn giản**: Như đồ dùng có sẵn trong nhà! 🏠

Built-in functions là những hàm "có sẵn" trong Python, không cần import gì cả.

```python
def demo_builtin_functions():
    """Demo các built-in functions phổ biến."""
    
    print("=== BUILT-IN FUNCTIONS DEMO ===")
    
    # Dữ liệu test
    numbers = [1, 5, 3, 9, 2, 8]
    text = "Hello Python"
    
    # 1. len() - Độ dài
    print(f"len({numbers}) = {len(numbers)}")
    print(f"len('{text}') = {len(text)}")
    
    # 2. max(), min() - Lớn nhất, nhỏ nhất
    print(f"max({numbers}) = {max(numbers)}")
    print(f"min({numbers}) = {min(numbers)}")
    
    # 3. sum() - Tổng
    print(f"sum({numbers}) = {sum(numbers)}")
    
    # 4. sorted() - Sắp xếp
    print(f"sorted({numbers}) = {sorted(numbers)}")
    print(f"sorted('{text}') = {sorted(text)}")
    
    # 5. type() - Kiểu dữ liệu
    print(f"type({numbers}) = {type(numbers).__name__}")
    print(f"type('{text}') = {type(text).__name__}")
    
    # 6. isinstance() - Kiểm tra kiểu
    print(f"isinstance({numbers}, list) = {isinstance(numbers, list)}")
    print(f"isinstance('{text}', str) = {isinstance(text, str)}")
    
    # 7. range() - Dãy số
    print(f"list(range(5)) = {list(range(5))}")
    print(f"list(range(2, 8, 2)) = {list(range(2, 8, 2))}")
    
    # 8. enumerate() - Đánh số thứ tự
    print("enumerate(['a', 'b', 'c']):")
    for i, letter in enumerate(['a', 'b', 'c']):
        print(f"  {i}: {letter}")
    
    # 9. zip() - Ghép đôi
    names = ["An", "Bình", "Cường"]
    ages = [20, 19, 21]
    print("zip(names, ages):")
    for name, age in zip(names, ages):
        print(f"  {name}: {age} tuổi")

# Built-in constants
def demo_builtin_constants():
    """Demo các hằng số built-in."""
    
    print("\n=== BUILT-IN CONSTANTS ===")
    
    # Boolean constants
    print(f"True: {True} (type: {type(True).__name__})")
    print(f"False: {False} (type: {type(False).__name__})")
    
    # None - giá trị "không có gì"
    print(f"None: {None} (type: {type(None).__name__})")
    
    # Ellipsis - dấu "..."
    print(f"Ellipsis (...): {Ellipsis} (type: {type(Ellipsis).__name__})")
    
    # NotImplemented - cho các phép toán chưa implement
    print(f"NotImplemented: {NotImplemented}")

demo_builtin_functions()
demo_builtin_constants()
```

#### **Bytecode (Mã byte)**
**Giải thích đơn giản**: Như "ngôn ngữ trung gian"! 🔄

Python code được chuyển thành bytecode trước khi chạy, giống như phiên dịch từ tiếng Việt sang tiếng Anh rồi mới nói với người nước ngoài.

```python
import dis
import py_compile
import os

def demo_bytecode():
    """Demo bytecode trong Python."""
    
    print("=== BYTECODE DEMO ===")
    
    # Hàm đơn giản để phân tích
    def simple_function(x, y):
        """Hàm đơn giản cộng hai số."""
        result = x + y
        return result
    
    # 1. Xem bytecode của function
    print("Bytecode của simple_function:")
    print("-" * 40)
    dis.dis(simple_function)
    
    # 2. Compile và tạo .pyc file
    print(f"\n=== COMPILE TO BYTECODE ===")
    
    # Tạo file Python
    code = '''
def greet(name):
    """Hàm chào hỏi."""
    message = f"Xin chào {name}!"
    return message

if __name__ == "__main__":
    print(greet("Python"))
'''
    
    filename = "temp_demo.py"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(code)
    
    # Compile thành bytecode
    py_compile.compile(filename)
    
    print(f"✅ Đã compile {filename} thành bytecode")
    print("Tạo ra file .pyc trong __pycache__/")
    
    # 3. Bytecode của string expression
    print(f"\n=== BYTECODE CỦA EXPRESSIONS ===")
    
    # Compile expression thành code object
    expression = "x + y * 2"
    code_obj = compile(expression, '<string>', 'eval')
    
    print(f"Expression: {expression}")
    print("Bytecode:")
    dis.dis(code_obj)
    
    # Cleanup
    if os.path.exists(filename):
        os.remove(filename)
    
    # Remove __pycache__ directory
    import shutil
    if os.path.exists('__pycache__'):
        shutil.rmtree('__pycache__')

# Demo code object
def demo_code_objects():
    """Demo Code Objects trong Python."""
    
    print(f"\n=== CODE OBJECTS ===")
    
    def sample_func(a, b=10, *args, **kwargs):
        """Sample function để phân tích."""
        c = a + b
        return c * 2
    
    code = sample_func.__code__
    
    print(f"Function name: {code.co_name}")
    print(f"Filename: {code.co_filename}")
    print(f"Line number: {code.co_firstlineno}")
    print(f"Argument count: {code.co_argcount}")
    print(f"Local variables: {code.co_varnames}")
    print(f"Constants: {code.co_consts}")
    print(f"Bytecode: {code.co_code[:20]}...")  # First 20 bytes

demo_bytecode()
demo_code_objects()
```

### **C**

#### **Comprehension (Biểu thức rút gọn)**
**Giải thích đơn giản**: Như "công thức nấu ăn một dòng"! 👨‍🍳

Comprehension cho phép tạo list, dict, set trong một dòng code, thay vì viết vòng lặp dài.

```python
def demo_comprehensions():
    """Demo tất cả các loại comprehensions."""
    
    print("=== COMPREHENSIONS DEMO ===")
    
    # Dữ liệu test
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    students = [
        {"name": "An", "age": 20, "grade": 8.5},
        {"name": "Bình", "age": 19, "grade": 9.0},  
        {"name": "Cường", "age": 21, "grade": 7.5},
        {"name": "Dung", "age": 20, "grade": 8.8}
    ]
    
    print("=== 1. LIST COMPREHENSION ===")
    
    # Cách truyền thống
    squares_traditional = []
    for num in numbers:
        squares_traditional.append(num ** 2)
    
    # List comprehension
    squares_comp = [num ** 2 for num in numbers]
    
    print(f"Số gốc: {numbers}")
    print(f"Bình phương (traditional): {squares_traditional}")
    print(f"Bình phương (comprehension): {squares_comp}")
    
    # Với điều kiện
    even_squares = [num ** 2 for num in numbers if num % 2 == 0]
    print(f"Bình phương số chẵn: {even_squares}")
    
    # Nested comprehension
    matrix = [[i*j for j in range(1, 4)] for i in range(1, 4)]
    print(f"Ma trận 3x3: {matrix}")
    
    print(f"\n=== 2. DICT COMPREHENSION ===")
    
    # Tạo dict từ list
    number_squares = {num: num**2 for num in range(1, 6)}
    print(f"Dict bình phương: {number_squares}")
    
    # Từ students list
    name_grades = {student["name"]: student["grade"] for student in students}
    print(f"Tên-Điểm: {name_grades}")
    
    # Với điều kiện
    high_achievers = {
        student["name"]: student["grade"] 
        for student in students 
        if student["grade"] >= 8.0
    }
    print(f"Học sinh giỏi: {high_achievers}")
    
    print(f"\n=== 3. SET COMPREHENSION ===")
    
    # Tạo set các độ tuổi
    ages = {student["age"] for student in students}
    print(f"Các độ tuổi: {ages}")
    
    # Set bình phương số lẻ
    odd_squares = {num**2 for num in numbers if num % 2 == 1}
    print(f"Bình phương số lẻ: {odd_squares}")
    
    print(f"\n=== 4. GENERATOR COMPREHENSION ===")
    
    # Generator (lazy evaluation)
    squares_gen = (num**2 for num in numbers)
    print(f"Generator object: {squares_gen}")
    print(f"Generator values: {list(squares_gen)}")
    
    # Memory efficient cho big data
    big_squares = (x**2 for x in range(1000000) if x % 1000 == 0)
    first_10 = [next(big_squares) for _ in range(10)]
    print(f"First 10 big squares: {first_10}")

def advanced_comprehensions():
    """Advanced comprehension examples."""
    
    print(f"\n=== ADVANCED COMPREHENSIONS ===")
    
    # Nested loops trong comprehension
    colors = ['red', 'blue']
    sizes = ['S', 'M', 'L']
    
    # Tạo tất cả combinations
    products = [f"{color}-{size}" for color in colors for size in sizes]
    print(f"Products: {products}")
    
    # Flatten nested list
    nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    flattened = [item for sublist in nested_list for item in sublist]
    print(f"Nested: {nested_list}")
    print(f"Flattened: {flattened}")
    
    # Conditional expression trong comprehension
    numbers = range(-5, 6)
    abs_or_zero = [x if x >= 0 else 0 for x in numbers]
    print(f"Numbers: {list(numbers)}")
    print(f"Abs or zero: {abs_or_zero}")
    
    # Multiple conditions
    text = "Hello World Python Programming"
    words = text.split()
    long_words = [
        word.upper() 
        for word in words 
        if len(word) > 5 and word.startswith('P')
    ]
    print(f"Words: {words}")
    print(f"Long words starting with P: {long_words}")

demo_comprehensions()
advanced_comprehensions()
```

#### **CPython (Cài đặt C của Python)**
**Giải thích đơn giản**: Như "động cơ" của Python! 🚗

CPython là cài đặt chính thức của Python, được viết bằng ngôn ngữ C. Đây là "động cơ" chạy code Python của bạn.

```python
import sys
import platform

def demo_cpython_info():
    """Hiển thị thông tin về CPython implementation."""
    
    print("=== CPYTHON INFORMATION ===")
    
    # Python version và implementation
    print(f"Python version: {sys.version}")
    print(f"Python implementation: {platform.python_implementation()}")
    print(f"Python compiler: {platform.python_compiler()}")
    
    # System information
    print(f"\nSystem: {platform.system()} {platform.release()}")
    print(f"Architecture: {platform.architecture()}")
    print(f"Machine: {platform.machine()}")
    
    # Python paths
    print(f"\nPython executable: {sys.executable}")
    print(f"Python path: {sys.path[0]}")
    
    # Memory and reference counting (CPython specific)
    print(f"\n=== CPYTHON SPECIFICS ===")
    
    # Reference counting example
    import gc
    
    class TestObject:
        def __init__(self, name):
            self.name = name
        
        def __del__(self):
            print(f"Object {self.name} is being deleted")
    
    # Tạo object và check reference count
    obj = TestObject("test")
    print(f"Reference count of obj: {sys.getrefcount(obj)}")
    
    # Tạo thêm reference
    another_ref = obj
    print(f"Reference count after another_ref: {sys.getrefcount(obj)}")
    
    # Xóa reference
    del another_ref
    print(f"Reference count after del another_ref: {sys.getrefcount(obj)}")
    
    # Garbage collection info
    print(f"\nGarbage collection stats: {gc.get_stats()}")
    print(f"GC counts: {gc.get_count()}")

# Demo CPython vs other implementations
def demo_python_implementations():
    """So sánh các implementation khác nhau."""
    
    print(f"\n=== PYTHON IMPLEMENTATIONS ===")
    
    implementations = {
        'CPython': {
            'description': 'Implementation chính thức, viết bằng C',
            'pros': ['Tương thích tốt nhất', 'Nhiều thư viện C extensions'],
            'cons': ['GIL làm chậm multithreading'],
            'use_case': 'General purpose, most common'
        },
        'PyPy': {
            'description': 'Implementation nhanh hơn với JIT compiler',
            'pros': ['Nhanh hơn CPython 2-10x', 'Tương thích tốt'],
            'cons': ['Startup chậm hơn', 'Memory usage cao hơn'],
            'use_case': 'CPU-intensive applications'
        },
        'Jython': {
            'description': 'Python chạy trên Java Virtual Machine',
            'pros': ['Tích hợp với Java', 'Access Java libraries'],
            'cons': ['Không support C extensions', 'Chậm hơn CPython'],
            'use_case': 'Java integration'
        },
        'IronPython': {
            'description': 'Python cho .NET Framework',
            'pros': ['Tích hợp với .NET', 'Access .NET libraries'],
            'cons': ['Chỉ cho Windows/.NET', 'Development chậm'],
            'use_case': '.NET integration'
        }
    }
    
    current_impl = platform.python_implementation()
    print(f"Current implementation: {current_impl}")
    
    for name, info in implementations.items():
        print(f"\n{name}:")
        print(f"  Description: {info['description']}")
        print(f"  Pros: {', '.join(info['pros'])}")
        print(f"  Cons: {', '.join(info['cons'])}")
        print(f"  Use case: {info['use_case']}")
        
        if name == current_impl:
            print("  >>> BẠN ĐANG DÙNG IMPLEMENTATION NÀY! <<<")

demo_cpython_info()
demo_python_implementations()
```

### **D**

#### **Decorator (Trang trí)**
**Giải thích đơn giản**: Như "wrapper quà tặng"! 🎁

Decorator "bọc" một function để thêm tính năng mà không cần sửa code gốc.

```python
import functools
import time
from datetime import datetime

# Basic decorator
def my_decorator(func):
    """Decorator cơ bản."""
    @functools.wraps(func)  # Giữ lại metadata của function gốc
    def wrapper(*args, **kwargs):
        print(f"🎯 Trước khi chạy {func.__name__}")
        result = func(*args, **kwargs)
        print(f"✅ Sau khi chạy {func.__name__}")
        return result
    return wrapper

# Timing decorator
def timing_decorator(func):
    """Đo thời gian thực thi."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = end_time - start_time
        print(f"⏱️ {func.__name__} took {execution_time:.4f} seconds")
        return result
    return wrapper

# Logging decorator
def log_calls(func):
    """Log tất cả function calls."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"📝 [{timestamp}] Calling {func.__name__} with args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"📝 [{timestamp}] {func.__name__} returned: {result}")
        return result
    return wrapper

# Sử dụng decorators
@my_decorator
@timing_decorator
@log_calls
def calculate_sum(n):
    """Tính tổng từ 1 đến n."""
    total = sum(range(1, n + 1))
    time.sleep(0.1)  # Giả lập tính toán phức tạp
    return total

# Test decorated function
print("=== DECORATOR DEMO ===")
result = calculate_sum(1000)
print(f"Final result: {result}")

# Decorator với parameters
def retry(max_attempts=3, delay=1):
    """Decorator thử lại function nếu bị lỗi."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    print(f"🔄 Attempt {attempt}/{max_attempts} for {func.__name__}")
                    result = func(*args, **kwargs)
                    print(f"✅ Success on attempt {attempt}")
                    return result
                except Exception as e:
                    print(f"❌ Attempt {attempt} failed: {e}")
                    if attempt == max_attempts:
                        print(f"💥 All {max_attempts} attempts failed!")
                        raise
                    time.sleep(delay)
        return wrapper
    return decorator

# Validation decorator
def validate_types(**type_checks):
    """Decorator kiểm tra kiểu dữ liệu."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Get function signature
            import inspect
            sig = inspect.signature(func)
            bound_args = sig.bind(*args, **kwargs)
            bound_args.apply_defaults()
            
            # Check types
            for param_name, expected_type in type_checks.items():
                if param_name in bound_args.arguments:
                    value = bound_args.arguments[param_name]
                    if not isinstance(value, expected_type):
                        raise TypeError(
                            f"Parameter '{param_name}' must be {expected_type.__name__}, "
                            f"got {type(value).__name__}"
                        )
            
            return func(*args, **kwargs)
        return wrapper
    return decorator

# Class decorator
def add_methods(cls):
    """Class decorator thêm methods."""
    def to_dict(self):
        """Convert object to dictionary."""
        return {
            attr: getattr(self, attr)
            for attr in dir(self)
            if not attr.startswith('_') and not callable(getattr(self, attr))
        }
    
    def __str__(self):
        """String representation."""
        attrs = self.to_dict()
        attr_strs = [f"{k}={v}" for k, v in attrs.items()]
        return f"{cls.__name__}({', '.join(attr_strs)})"
    
    # Add methods to class
    cls.to_dict = to_dict
    cls.__str__ = __str__
    
    return cls

# Examples with decorators
@retry(max_attempts=3, delay=0.5)
def unreliable_function():
    """Function that randomly fails."""
    import random
    if random.random() < 0.7:  # 70% chance of failure
        raise Exception("Random failure!")
    return "Success!"

@validate_types(name=str, age=int, grade=float)
def create_student(name, age, grade):
    """Tạo thông tin học sinh với validation."""
    return {
        'name': name,
        'age': age,
        'grade': grade
    }

@add_methods
class Student:
    """Student class với decorator."""
    def __init__(self, name, age, grade):
        self.name = name
        self.age = age
        self.grade = grade

# Test advanced decorators
print(f"\n=== ADVANCED DECORATORS ===")

# Test retry decorator
try:
    unreliable_result = unreliable_function()
    print(f"Result: {unreliable_result}")
except Exception as e:
    print(f"Final failure: {e}")

# Test validation decorator
print(f"\n--- Validation Decorator ---")
try:
    student_data = create_student("An", 20, 8.5)
    print(f"Valid student: {student_data}")
    
    # This will raise TypeError
    create_student("An", "twenty", 8.5)  # Wrong type for age
except TypeError as e:
    print(f"Validation error: {e}")

# Test class decorator
print(f"\n--- Class Decorator ---")
student = Student("Bình", 19, 9.0)
print(f"Student object: {student}")
print(f"Student dict: {student.to_dict()}")
```

#### **Duck Typing (Kiểu vịt)**
**Giải thích đơn giản**: "Nếu nó kêu như vịt, bơi như vịt... thì nó là vịt!" 🦆

Python không quan tâm object thuộc class nào, chỉ quan tâm nó có methods/attributes cần thiết không.

```python
class Duck:
    """Class Duck thật."""
    def quack(self):
        return "Quack quack!"
    
    def swim(self):
        return "Duck is swimming"
    
    def fly(self):
        return "Duck is flying"

class Dog:
    """Class Dog - không phải vịt nhưng có thể 'giả vịt'."""
    def quack(self):
        return "Woof! (pretending to be a duck)"
    
    def swim(self):
        return "Dog is swimming (doggy paddle)"
    
    def fly(self):
        return "Dog can't fly, but trying..."

class Robot:
    """Robot có thể làm như vịt."""
    def quack(self):
        return "BEEP BEEP (robot quack)"
    
    def swim(self):
        return "Robot swimming with propellers"
    
    def fly(self):
        return "Robot flying with jets"

# Function sử dụng duck typing
def make_it_quack(duck_like_object):
    """Function không quan tâm object thuộc class nào."""
    print(f"Making it quack: {duck_like_object.quack()}")

def duck_activities(duck_like_object):
    """Các hoạt động của 'vịt'."""
    print(f"Quacking: {duck_like_object.quack()}")
    print(f"Swimming: {duck_like_object.swim()}")
    print(f"Flying: {duck_like_object.fly()}")
    print("-" * 40)

# Demo duck typing
print("=== DUCK TYPING DEMO ===")

# Tạo các objects
duck = Duck()
dog = Dog()
robot = Robot()

# Test với tất cả objects
animals = [duck, dog, robot]

for animal in animals:
    print(f"Testing {animal.__class__.__name__}:")
    try:
        duck_activities(animal)
    except AttributeError as e:
        print(f"❌ Error: {e}")

# Protocol example
class Drawable:
    """Protocol - không phải class thật, chỉ là 'hợp đồng'."""
    def draw(self):
        pass

class Circle:
    """Hình tròn - implement draw method."""
    def __init__(self, radius):
        self.radius = radius
    
    def draw(self):
        return f"Drawing circle with radius {self.radius}"

class Square:
    """Hình vuông - implement draw method."""
    def __init__(self, side):
        self.side = side
    
    def draw(self):
        return f"Drawing square with side {self.side}"

class Text:
    """Text - cũng có thể draw."""
    def __init__(self, content):
        self.content = content
    
    def draw(self):
        return f"Drawing text: '{self.content}'"

def draw_all(drawable_objects):
    """Vẽ tất cả objects có method draw()."""
    print("\n=== DRAWING ALL OBJECTS ===")
    for obj in drawable_objects:
        try:
            print(obj.draw())
        except AttributeError:
            print(f"❌ {obj.__class__.__name__} cannot be drawn")

# Test protocol
shapes = [
    Circle(5),
    Square(10),
    Text("Hello World"),
    Duck()  # Duck không có draw() method
]

draw_all(shapes)

# Advanced duck typing với hasattr
def safe_duck_typing(obj, method_name):
    """An toàn hơn với hasattr."""
    if hasattr(obj, method_name):
        method = getattr(obj, method_name)
        if callable(method):
            return method()
        else:
            return f"{method_name} is not callable"
    else:
        return f"Object doesn't have {method_name} method"

print(f"\n=== SAFE DUCK TYPING ===")
test_objects = [duck, dog, robot, "string", 123]

for obj in test_objects:
    print(f"{obj.__class__.__name__}: {safe_duck_typing(obj, 'quack')}")
```

### **E**

#### **Else Clause trong Loops**
**Giải thích đơn giản**: Như "kế hoạch B" khi loop không bị break! 🔄

Trong Python, `else` không chỉ dùng với `if`, mà còn dùng với `for`, `while`, và `try`.

```python
def demo_loop_else():
    """Demo else clause trong loops."""
    
    print("=== LOOP ELSE DEMO ===")
    
    # 1. For-else: else chạy khi loop kết thúc tự nhiên (không break)
    print("1. FOR-ELSE:")
    
    def find_even_number(numbers):
        """Tìm số chẵn đầu tiên."""
        for num in numbers:
            print(f"  Checking {num}")
            if num % 2 == 0:
                print(f"  ✅ Found even number: {num}")
                break
        else:
            # Chạy khi loop kết thúc mà không break
            print("  ❌ No even number found!")
    
    print("Case 1: List có số chẵn")
    find_even_number([1, 3, 7, 8, 9])
    
    print("\nCase 2: List không có số chẵn")  
    find_even_number([1, 3, 5, 7, 9])
    
    # 2. While-else
    print(f"\n2. WHILE-ELSE:")
    
    def countdown_with_else(start):
        """Đếm ngược với else."""
        current = start
        while current > 0:
            print(f"  Countdown: {current}")
            current -= 1
            
            # Có thể break sớm trong điều kiện nào đó
            if current == 2:  # Giả sử có lý do break
                print("  💥 Emergency stop!")
                break
        else:
            # Chạy khi while kết thúc tự nhiên (current <= 0)
            print("  🎉 Countdown completed normally!")
    
    print("Case 1: Countdown bình thường")
    countdown_with_else(3)
    
    print("\nCase 2: Countdown với break")
    countdown_with_else(5)
    
    # 3. Try-else
    print(f"\n3. TRY-ELSE:")
    
    def process_number(value):
        """Xử lý số với try-else."""
        try:
            number = int(value)
            result = 100 / number
        except ValueError:
            print(f"  ❌ '{value}' is not a valid number")
        except ZeroDivisionError:
            print(f"  ❌ Cannot divide by zero")
        else:
            # Chạy khi KHÔNG có exception
            print(f"  ✅ Success: 100 / {number} = {result}")
        finally:
            # Luôn chạy
            print(f"  📝 Finished processing '{value}'")
    
    test_values = ["10", "0", "abc", "5"]
    for value in test_values:
        print(f"Processing '{value}':")
        process_number(value)
        print()

def practical_examples():
    """Ví dụ thực tế sử dụng else trong loops."""
    
    print("=== PRACTICAL EXAMPLES ===")
    
    # 1. Kiểm tra số nguyên tố
    def is_prime(n):
        """Kiểm tra số nguyên tố bằng for-else."""
        if n < 2:
            return False
        
        for i in range(2, int(n**0.5) + 1):
            if n % i == 0:
                return False  # Found divisor, not prime
        else:
            # Loop completed without finding divisor
            return True
    
    print("1. Prime number checker:")
    test_numbers = [2, 3, 4, 17, 25, 29]
    for num in test_numbers:
        result = "prime" if is_prime(num) else "not prime"
        print(f"  {num} is {result}")
    
    # 2. Tìm kiếm trong nested structure
    def find_student_by_id(students, target_id):
        """Tìm học sinh theo ID."""
        for student in students:
            if student.get('id') == target_id:
                return student
        else:
            return None  # Not found
    
    students = [
        {'id': 'SV001', 'name': 'An', 'grade': 8.5},
        {'id': 'SV002', 'name': 'Bình', 'grade': 9.0},
        {'id': 'SV003', 'name': 'Cường', 'grade': 7.5}
    ]
    
    print(f"\n2. Student search:")
    search_ids = ['SV002', 'SV999']
    for sid in search_ids:
        student = find_student_by_id(students, sid)
        if student:
            print(f"  Found {sid}: {student['name']} (Grade: {student['grade']})")
        else:
            print(f"  Student {sid} not found")
    
    # 3. Validation với while-else
    def get_valid_input(prompt, validator, max_attempts=3):
        """Lấy input hợp lệ với số lần thử giới hạn."""
        attempts = 0
        while attempts < max_attempts:
            user_input = input(f"{prompt} (Attempt {attempts + 1}/{max_attempts}): ")
            if validator(user_input):
                return user_input
            else:
                print("  ❌ Invalid input, please try again")
                attempts += 1
        else:
            # Hết số lần thử
            print(f"  💥 Maximum attempts ({max_attempts}) reached!")
            return None
    
    def is_valid_age(age_str):
        """Validator cho tuổi."""
        try:
            age = int(age_str)
            return 0 <= age <= 120
        except ValueError:
            return False
    
    print(f"\n3. Input validation demo:")
    print("(This is just a demo - actual input would be interactive)")
    
    # Simulate valid input
    mock_inputs = ["abc", "-5", "25"]  # Invalid, Invalid, Valid
    for i, mock_input in enumerate(mock_inputs):
        print(f"Simulated input {i+1}: '{mock_input}'")
        if is_valid_age(mock_input):
            print(f"  ✅ Valid age: {mock_input}")
            break
        else:
            print(f"  ❌ Invalid age: {mock_input}")
    else:
        print("  💥 All inputs were invalid!")

demo_loop_else()
practical_examples()
```

### **F**

#### **f-string (Formatted String Literals)**
**Giải thích đơn giản**: Như "template" với chỗ trống để điền! 📝

f-string là cách format string hiện đại và mạnh mẽ nhất trong Python (từ Python 3.6+).

```python
import math
from datetime import datetime, date

def demo_fstring_basics():
    """Demo cơ bản về f-strings."""
    
    print("=== F-STRING BASICS ===")
    
    # Variables
    name = "Nguyễn Văn An"
    age = 20
    grade = 8.75
    
    # Basic f-string
    message = f"Tên: {name}, Tuổi: {age}, Điểm: {grade}"
    print(f"Basic: {message}")
    
    # Expressions trong f-string
    print(f"Năm sinh: {2024 - age}")
    print(f"Điểm làm tròn: {round(grade)}")
    print(f"Điểm phần trăm: {grade * 10}%")
    
    # Method calls
    print(f"Tên viết hoa: {name.upper()}")
    print(f"Số ký tự trong tên: {len(name)}")
    
    # Nested f-strings
    greeting = f"Xin chào, {f'anh {name}' if age >= 18 else f'em {name}'}"
    print(f"Conditional greeting: {greeting}")

def demo_fstring_formatting():
    """Demo formatting options trong f-strings."""
    
    print(f"\n=== F-STRING FORMATTING ===")
    
    # Number formatting
    pi = math.pi
    big_number = 1234567.89
    
    print("Number formatting:")
    print(f"  Pi: {pi}")
    print(f"  Pi (2 decimals): {pi:.2f}")
    print(f"  Pi (6 decimals): {pi:.6f}")
    print(f"  Big number: {big_number:,}")  # Comma separator
    print(f"  Big number (2 decimals): {big_number:,.2f}")
    
    # Integer formatting
    number = 42
    print(f"\nInteger formatting:")
    print(f"  Decimal: {number:d}")
    print(f"  Binary: {number:b}")
    print(f"  Octal: {number:o}")
    print(f"  Hexadecimal: {number:x}")
    print(f"  Hexadecimal (uppercase): {number:X}")
    
    # Padding and alignment
    text = "Python"
    print(f"\nAlignment and padding:")
    print(f"  Left aligned: '{text:<10}'")
    print(f"  Right aligned: '{text:>10}'")
    print(f"  Center aligned: '{text:^10}'")
    print(f"  Zero padded: '{number:05d}'")
    print(f"  Custom padding: '{text:*^10}'")
    
    # Percentage
    ratio = 0.75
    print(f"\nPercentage:")
    print(f"  Ratio: {ratio:.1%}")
    print(f"  Ratio (2 decimals): {ratio:.2%}")

def demo_fstring_advanced():
    """Advanced f-string features."""
    
    print(f"\n=== ADVANCED F-STRINGS ===")
    
    # Date formatting
    now = datetime.now()
    today = date.today()
    
    print("Date formatting:")
    print(f"  Current time: {now}")
    print(f"  Formatted time: {now:%Y-%m-%d %H:%M:%S}")
    print(f"  Date only: {today:%d/%m/%Y}")
    print(f"  Vietnamese date: {now:%A, %d tháng %m năm %Y}")
    
    # Dictionary access
    student = {
        'name': 'Trần Thị Bình',
        'grades': {'math': 9.0, 'physics': 8.5, 'chemistry': 8.8}
    }
    
    print(f"\nDictionary access:")
    print(f"  Student: {student['name']}")
    print(f"  Math grade: {student['grades']['math']}")
    print(f"  Average: {sum(student['grades'].values()) / len(student['grades']):.2f}")
    
    # List indexing
    subjects = ['Toán', 'Lý', 'Hóa', 'Sinh', 'Văn']
    print(f"\nList indexing:")
    print(f"  First subject: {subjects[0]}")
    print(f"  Last subject: {subjects[-1]}")
    print(f"  Middle subjects: {subjects[1:4]}")
    
    # Function calls
    def get_grade_letter(score):
        if score >= 9: return 'A'
        elif score >= 8: return 'B'
        elif score >= 7: return 'C'
        elif score >= 6: return 'D'
        else: return 'F'
    
    scores = [9.2, 8.1, 6.8, 5.5]
    print(f"\nFunction calls:")
    for score in scores:
        print(f"  Score {score} = Grade {get_grade_letter(score)}")
    
    # Debug f-strings (Python 3.8+)
    x = 10
    y = 20
    print(f"\nDebug f-strings:")
    print(f"  {x=}")  # Shows x=10
    print(f"  {y=}")  # Shows y=20
    print(f"  {x + y=}")  # Shows x + y=30

def demo_fstring_vs_alternatives():
    """So sánh f-string với các phương pháp khác."""
    
    print(f"\n=== F-STRING VS ALTERNATIVES ===")
    
    name = "Python"
    version = 3.9
    
    # 1. Old % formatting
    old_style = "Language: %s, Version: %.1f" % (name, version)
    
    # 2. .format() method
    format_style = "Language: {}, Version: {:.1f}".format(name, version)
    
    # 3. f-string
    fstring_style = f"Language: {name}, Version: {version:.1f}"
    
    print("Comparison:")
    print(f"  Old % style: {old_style}")
    print(f"  .format() style: {format_style}")
    print(f"  f-string style: {fstring_style}")
    
    # Performance comparison (conceptual)
    import timeit
    
    def test_old_style():
        return "Name: %s, Age: %d" % ("Test", 25)
    
    def test_format_style():
        return "Name: {}, Age: {}".format("Test", 25)
    
    def test_fstring():
        return f"Name: {'Test'}, Age: {25}"
    
    print(f"\nPerformance (relative):")
    print("  f-strings are typically fastest")
    print("  .format() is slower than f-strings")
    print("  % formatting is oldest and slowest")

def practical_fstring_examples():
    """Ví dụ thực tế sử dụng f-strings."""
    
    print(f"\n=== PRACTICAL EXAMPLES ===")
    
    # 1. Report generation
    students = [
        {'name': 'An', 'math': 8.5, 'physics': 9.0, 'chemistry': 7.5},
        {'name': 'Bình', 'math': 9.2, 'physics': 8.8, 'chemistry': 9.5},
        {'name': 'Cường', 'math': 7.8, 'physics': 8.2, 'chemistry': 8.0}
    ]
    
    print("1. Student Report:")
    print(f"{'Name':<10} {'Math':<6} {'Physics':<8} {'Chemistry':<10} {'Average':<8}")
    print("-" * 50)
    
    for student in students:
        avg = (student['math'] + student['physics'] + student['chemistry']) / 3
        print(f"{student['name']:<10} {student['math']:<6.1f} {student['physics']:<8.1f} {student['chemistry']:<10.1f} {avg:<8.2f}")
    
    # 2. File paths
    base_dir = "/home/user/documents"
    filename = "report.txt"
    date_str = datetime.now().strftime("%Y%m%d")
    
    full_path = f"{base_dir}/{date_str}_{filename}"
    print(f"\n2. File path: {full_path}")
    
    # 3. SQL queries (conceptual)
    table_name = "students"
    min_grade = 8.0
    
    query = f"""
    SELECT name, grade 
    FROM {table_name} 
    WHERE grade >= {min_grade:.1f}
    ORDER BY grade DESC
    """
    print(f"\n3. SQL Query:")
    print(query.strip())
    
    # 4. API URLs
    base_url = "https://api.example.com"
    endpoint = "students"
    student_id = "SV001"
    
    api_url = f"{base_url}/{endpoint}/{student_id}"
    print(f"\n4. API URL: {api_url}")
    
    # 5. Logging messages
    level = "INFO"
    timestamp = datetime.now()
    message = "User logged in successfully"
    
    log_entry = f"[{timestamp:%Y-%m-%d %H:%M:%S}] {level}: {message}"
    print(f"\n5. Log entry: {log_entry}")

# Run all demos
demo_fstring_basics()
demo_fstring_formatting()
demo_fstring_advanced()
demo_fstring_vs_alternatives()
practical_fstring_examples()
```

---

## 🔍 TÌM KIẾM NHANH

### Tìm theo chữ cái đầu
- **[A](#a)**: `__all__`, Args/Kwargs
- **[B](#b)**: Built-in, Bytecode  
- **[C](#c)**: Comprehension, CPython
- **[D](#d)**: Decorator, Duck Typing
- **[E](#e)**: Else Clause
- **[F](#f)**: f-string

### Tìm theo chủ đề
- **Cú pháp Python**: f-string, Comprehension, Args/Kwargs
- **Tính năng nâng cao**: Decorator, Duck Typing, Else Clause
- **Hệ thống**: CPython, Bytecode, Built-in
- **Module**: `__all__`

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [📖 Thuật Ngữ Lập Trình](./programming-terms.md) - Thuật ngữ chung
- [📊 Cấu Trúc Dữ Liệu](./data-structures.md) - Data structures Python
- [🔄 Thuật Toán](./algorithms.md) - Algorithms trong Python
- [📋 Python Cheatsheet](../reference/python-cheatsheet.md) - Tra cứu nhanh

---

## 💡 Lời Khuyên Học Thuật Ngữ Python

### 🎯 **Cách học hiệu quả:**
1. **Thực hành ngay** - Code ví dụ cho mỗi thuật ngữ
2. **Tìm hiểu nguồn gốc** - Tại sao Python thiết kế như vậy?
3. **So sánh với ngôn ngữ khác** - Python khác gì Java/C++?
4. **Đọc PEP** - Python Enhancement Proposals
5. **Tham gia cộng đồng** - Stack Overflow, Reddit r/Python

### 🐍 **Python Philosophy (Zen of Python):**
```python
import this  # Chạy để xem "The Zen of Python"
```

**Những nguyên tắc quan trọng:**
- **Simple is better than complex**
- **Readability counts** 
- **There should be one obvious way to do it**
- **Beautiful is better than ugly**

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: "Python không chỉ là ngôn ngữ, mà là một triết lý lập trình!"*
