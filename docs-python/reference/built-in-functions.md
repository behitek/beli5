# 🔧 Hàm Có Sẵn Python - Built-in Functions

> **Tóm tắt**: Tổng hợp đầy đủ các hàm có sẵn trong Python với ví dụ thực tế và giải thích dễ hiểu theo phong cách ELI5.

## 🎯 Hàm Có Sẵn Là Gì?

Thử tưởng tượng Python như một căn bếp đã được trang bị sẵn các dụng cụ cơ bản 🔧. Bạn không cần phải tự chế tạo dao, thớt, chảo... mà có thể dùng ngay! 

Tương tự, Python có sẵn 69 hàm built-in mà bạn có thể sử dụng ngay mà không cần import gì cả. Chúng như những "siêu năng lực" có sẵn của Python!

---

## 📊 1. HÀM THÔNG TIN & KIỂM TRA

### `type()` - Kiểm tra kiểu dữ liệu
```python
# Giống như hỏi "Cái này là loại gì?"
print(type(42))          # <class 'int'>
print(type("hello"))     # <class 'str'>
print(type([1, 2, 3]))   # <class 'list'>
print(type(3.14))        # <class 'float'>

# Sử dụng trong điều kiện (Use in conditions)
data = "123"
if type(data) == str:
    print("Đây là chuỗi!")  # Sẽ in ra
```

### `isinstance()` - Kiểm tra thuộc loại nào (Cách tốt hơn `type()`)
```python
# Kiểm tra một cách thông minh hơn
age = 25
name = "Hieu"

print(isinstance(age, int))     # True
print(isinstance(name, str))    # True
print(isinstance(age, (int, float)))  # True - có thể kiểm tra nhiều type

# Tại sao tốt hơn type()?
class Student:
    pass

class HighSchoolStudent(Student):  # kế thừa từ Student
    pass

student = HighSchoolStudent()
print(isinstance(student, Student))      # True - hiểu được inheritance
print(type(student) == Student)          # False - không hiểu inheritance
```

### `len()` - Độ dài
```python
# Đếm số lượng phần tử - như đếm kẹo trong hũ
print(len("Hello"))           # 5 ký tự
print(len([1, 2, 3, 4]))     # 4 phần tử
print(len({"a": 1, "b": 2})) # 2 cặp key-value
print(len({1, 2, 3, 3}))     # 3 phần tử (set loại bỏ trùng lặp)

# Ứng dụng thực tế (Real application)
password = input("Nhập mật khẩu: ")
if len(password) < 8:
    print("Mật khẩu phải có ít nhất 8 ký tự!")
```

### `id()` - Địa chỉ bộ nhớ
```python
# Xem "địa chỉ nhà" của đối tượng trong bộ nhớ
x = [1, 2, 3]
y = [1, 2, 3]
z = x

print(id(x))  # Ví dụ: 140234567890123
print(id(y))  # Ví dụ: 140234567890456 (khác x)
print(id(z))  # Giống với id(x) vì z trỏ đến x

# Kiểm tra có phải cùng object không (Check if same object)
print(x is z)  # True - cùng object
print(x is y)  # False - khác object nhưng giá trị giống
```

---

## 🔢 2. HÀM TOÁN HỌC

### `abs()` - Giá trị tuyệt đối
```python
# Luôn luôn trả về số dương - như khoảng cách
print(abs(-5))      # 5
print(abs(5))       # 5
print(abs(-3.14))   # 3.14

# Ví dụ thực tế: tính khoảng cách
point_a = 10
point_b = 7
distance = abs(point_a - point_b)  # 3
print(f"Khoảng cách: {distance}")
```

### `round()` - Làm tròn
```python
# Làm tròn số thập phân
print(round(3.14159))      # 3
print(round(3.14159, 2))   # 3.14 (2 chữ số thập phân)
print(round(3.14159, 4))   # 3.1416

# Ứng dụng với tiền bạc (Money application)
price = 99.999
final_price = round(price, 2)  # 100.0
print(f"Giá cuối: {final_price} VND")
```

### `min()`, `max()` - Giá trị nhỏ nhất, lớn nhất
```python
# Tìm số nhỏ nhất/lớn nhất
scores = [85, 92, 78, 96, 88]
print(min(scores))    # 78
print(max(scores))    # 96

# Có thể dùng với nhiều tham số
print(min(10, 5, 15, 3))   # 3
print(max("apple", "banana", "cherry"))  # "cherry" (theo thứ tự alphabet)

# Ứng dụng thực tế (Real application)
temperatures = [25, 28, 22, 30, 26]
print(f"Nhiệt độ thấp nhất: {min(temperatures)}°C")
print(f"Nhiệt độ cao nhất: {max(temperatures)}°C")
```

### `sum()` - Tổng
```python
# Cộng tất cả phần tử trong iterable
numbers = [1, 2, 3, 4, 5]
total = sum(numbers)  # 15

# Với giá trị khởi tạo (start value)
total_with_bonus = sum(numbers, 10)  # 25 (15 + 10)

# Ứng dụng thực tế: tính điểm trung bình
test_scores = [85, 90, 78, 92, 88]
average = sum(test_scores) / len(test_scores)
print(f"Điểm trung bình: {average:.2f}")
```

### `pow()` - Lũy thừa
```python
# Tính lũy thừa: pow(base, exponent, modulus)
print(pow(2, 3))      # 8 (2^3)
print(pow(2, 3, 5))   # 3 (2^3 % 5 = 8 % 5 = 3)

# So sánh với ** operator
print(2 ** 3)         # 8 (giống pow(2, 3))

# Ứng dụng: tính lãi kép (compound interest)
principal = 1000000   # 1 triệu VND
rate = 0.05          # 5% mỗi năm
years = 10
final_amount = principal * pow(1 + rate, years)
print(f"Sau {years} năm: {final_amount:,.0f} VND")
```

### `divmod()` - Chia lấy nguyên và dư
```python
# Trả về tuple (thương, dư)
quotient, remainder = divmod(17, 5)
print(f"17 chia 5 = {quotient} dư {remainder}")  # 17 chia 5 = 3 dư 2

# Ứng dụng: chuyển đổi thời gian
total_seconds = 3725
hours, remainder = divmod(total_seconds, 3600)  # 1 giờ = 3600 giây
minutes, seconds = divmod(remainder, 60)
print(f"{total_seconds} giây = {hours}h {minutes}m {seconds}s")
```

---

## 🔤 3. HÀM CHUỖI & ENCODING

### `str()` - Chuyển thành chuỗi
```python
# Chuyển đổi mọi thứ thành string
print(str(123))      # "123"
print(str(3.14))     # "3.14"
print(str([1, 2]))   # "[1, 2]"
print(str(True))     # "True"

# Ứng dụng: tạo thông điệp
age = 25
message = "Tôi " + str(age) + " tuổi"  # "Tôi 25 tuổi"
# Hoặc dùng f-string (tốt hơn)
message = f"Tôi {age} tuổi"
```

### `repr()` - Biểu diễn chính xác
```python
# Hiển thị "developer-friendly" representation
text = "Hello\nWorld"
print(str(text))      # Hello
                      # World
print(repr(text))     # 'Hello\nWorld'

# Hữu ích cho debugging
data = {"name": "Hieu", "items": ["apple", "banana"]}
print("str():", str(data))
print("repr():", repr(data))
```

### `chr()` và `ord()` - Chuyển đổi ASCII
```python
# chr(): số -> ký tự, ord(): ký tự -> số
print(chr(65))     # 'A'
print(chr(97))     # 'a'
print(ord('A'))    # 65
print(ord('a'))    # 97

# Ứng dụng: tạo mật khẩu random
import random
def generate_password(length):
    password = ""
    for i in range(length):
        # Tạo ký tự random từ A-Z (65-90)
        random_char = chr(random.randint(65, 90))
        password += random_char
    return password

print(generate_password(8))  # Ví dụ: "KXMPLQRT"
```

### `format()` - Định dạng chuỗi
```python
# Định dạng chuỗi một cách linh hoạt
name = "Hieu"
age = 25
formatted = "Tên: {}, Tuổi: {}".format(name, age)
print(formatted)  # Tên: Hieu, Tuổi: 25

# Với số và format specifiers
price = 1234.5678
print("Giá: {:,.2f} VND".format(price))  # Giá: 1,234.57 VND

# So sánh với f-string (modern way)
print(f"Tên: {name}, Tuổi: {age}")
print(f"Giá: {price:,.2f} VND")
```

---

## 📋 4. HÀM XỬ LÝ ITERABLE

### `sorted()` - Sắp xếp
```python
# Sắp xếp list mà không thay đổi original
numbers = [3, 1, 4, 1, 5, 9]
sorted_numbers = sorted(numbers)
print(sorted_numbers)    # [1, 1, 3, 4, 5, 9]
print(numbers)          # [3, 1, 4, 1, 5, 9] (không thay đổi)

# Sắp xếp ngược (reverse)
print(sorted(numbers, reverse=True))  # [9, 5, 4, 3, 1, 1]

# Sắp xếp chuỗi
fruits = ["banana", "apple", "cherry"]
print(sorted(fruits))   # ['apple', 'banana', 'cherry']

# Sắp xếp theo key function
students = [
    {"name": "An", "grade": 85},
    {"name": "Binh", "grade": 92}, 
    {"name": "Chi", "grade": 78}
]
sorted_by_grade = sorted(students, key=lambda x: x["grade"])
print(sorted_by_grade)  # Sắp xếp theo điểm từ thấp đến cao
```

### `reversed()` - Đảo ngược
```python
# Đảo ngược thứ tự (trả về iterator)
numbers = [1, 2, 3, 4, 5]
reversed_numbers = list(reversed(numbers))
print(reversed_numbers)  # [5, 4, 3, 2, 1]

# Với string
text = "Hello"
reversed_text = "".join(reversed(text))
print(reversed_text)     # "olleH"

# Ứng dụng: kiểm tra palindrome
def is_palindrome(text):
    clean_text = text.lower().replace(" ", "")
    return clean_text == "".join(reversed(clean_text))

print(is_palindrome("racecar"))     # True
print(is_palindrome("hello"))       # False
```

### `enumerate()` - Lấy index và value
```python
# Lấy cả index và giá trị khi loop
fruits = ["apple", "banana", "cherry"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# Output:
# 0: apple
# 1: banana  
# 2: cherry

# Với start parameter
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")
# Output:
# 1. apple
# 2. banana
# 3. cherry

# Ứng dụng: tạo menu
menu_items = ["Phở", "Bún bò", "Cơm tấm"]
print("=== MENU ===")
for i, item in enumerate(menu_items, 1):
    print(f"{i}. {item}")
```

### `zip()` - Ghép các iterable
```python
# Ghép nhiều list thành các tuple
names = ["An", "Binh", "Chi"]
ages = [20, 22, 19]
cities = ["Hanoi", "HCMC", "Danang"]

for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age} tuổi, sống ở {city}")

# Tạo dictionary từ 2 list
keys = ["name", "age", "city"]
values = ["Hieu", 25, "Hanoi"]
person = dict(zip(keys, values))
print(person)  # {'name': 'Hieu', 'age': 25, 'city': 'Hanoi'}

# Unzip (tách ngược lại)
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
numbers, letters = zip(*pairs)
print(numbers)  # (1, 2, 3)
print(letters)  # ('a', 'b', 'c')
```

### `filter()` - Lọc phần tử
```python
# Lọc phần tử thỏa mãn điều kiện
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Lọc số chẵn
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # [2, 4, 6, 8, 10]

# Lọc với function
def is_positive(x):
    return x > 0

mixed_numbers = [-2, -1, 0, 1, 2, 3]
positive_numbers = list(filter(is_positive, mixed_numbers))
print(positive_numbers)  # [1, 2, 3]

# Lọc chuỗi không rỗng
texts = ["hello", "", "world", "", "python"]
non_empty = list(filter(None, texts))  # None làm predicate
print(non_empty)  # ['hello', 'world', 'python']
```

### `map()` - Áp dụng function cho mỗi phần tử
```python
# Áp dụng function cho tất cả phần tử
numbers = [1, 2, 3, 4, 5]

# Bình phương tất cả số
squares = list(map(lambda x: x**2, numbers))
print(squares)  # [1, 4, 9, 16, 25]

# Chuyển đổi kiểu dữ liệu
str_numbers = ["1", "2", "3", "4", "5"]
int_numbers = list(map(int, str_numbers))
print(int_numbers)  # [1, 2, 3, 4, 5]

# Với nhiều iterable
def add_numbers(x, y):
    return x + y

list1 = [1, 2, 3]
list2 = [4, 5, 6]
sums = list(map(add_numbers, list1, list2))
print(sums)  # [5, 7, 9]
```

---

## 🔄 5. HÀM CHUYỂN ĐỔI KIỂU DỮ LIỆU

### `int()`, `float()`, `bool()` - Chuyển đổi cơ bản
```python
# Chuyển đổi sang số nguyên
print(int("123"))      # 123
print(int(3.14))       # 3 (cắt phần thập phân)
print(int(True))       # 1
print(int(False))      # 0

# Với base khác (hệ cơ số)
print(int("1010", 2))  # 10 (binary to decimal)
print(int("FF", 16))   # 255 (hex to decimal)

# Chuyển đổi sang số thập phân
print(float("3.14"))   # 3.14
print(float(5))        # 5.0
print(float("inf"))    # inf (vô cùng)

# Chuyển đổi sang boolean
print(bool(1))         # True
print(bool(0))         # False
print(bool("hello"))   # True (chuỗi không rỗng)
print(bool(""))        # False (chuỗi rỗng)
print(bool([1, 2]))    # True (list không rỗng)
print(bool([]))        # False (list rỗng)
```

### `list()`, `tuple()`, `set()` - Chuyển đổi collection
```python
# Chuyển đổi giữa các collection types
text = "hello"
print(list(text))      # ['h', 'e', 'l', 'l', 'o']
print(tuple(text))     # ('h', 'e', 'l', 'l', 'o')
print(set(text))       # {'h', 'e', 'l', 'o'} (loại bỏ duplicate)

# Từ range thành list
numbers = list(range(5))  # [0, 1, 2, 3, 4]

# Loại bỏ duplicate với set
numbers_with_duplicates = [1, 2, 2, 3, 3, 3, 4]
unique_numbers = list(set(numbers_with_duplicates))
print(unique_numbers)  # [1, 2, 3, 4] (thứ tự có thể thay đổi)
```

### `dict()` - Tạo dictionary
```python
# Tạo dict từ list of tuples
pairs = [("name", "Hieu"), ("age", 25), ("city", "Hanoi")]
person = dict(pairs)
print(person)  # {'name': 'Hieu', 'age': 25, 'city': 'Hanoi'}

# Từ zip
keys = ["a", "b", "c"]
values = [1, 2, 3]
result = dict(zip(keys, values))
print(result)  # {'a': 1, 'b': 2, 'c': 3}

# Với keyword arguments
student = dict(name="An", age=20, grade=85)
print(student)  # {'name': 'An', 'age': 20, 'grade': 85}
```

---

## 🎛️ 6. HÀM INPUT/OUTPUT

### `input()` - Nhận input từ user
```python
# Nhận input cơ bản
name = input("Nhập tên của bạn: ")
print(f"Xin chào, {name}!")

# Chuyển đổi kiểu dữ liệu
age_str = input("Nhập tuổi: ")
age = int(age_str)  # Chuyển từ string sang int

# Hoặc ngắn gọn hơn
age = int(input("Nhập tuổi: "))

# Xử lý lỗi khi input sai
while True:
    try:
        number = int(input("Nhập một số: "))
        break  # Thoát loop nếu thành công
    except ValueError:
        print("Vui lòng nhập một số hợp lệ!")
```

### `print()` - In ra màn hình
```python
# In cơ bản
print("Hello World")

# In nhiều giá trị
name = "Hieu"
age = 25
print("Tên:", name, "Tuổi:", age)

# Tùy chỉnh separator và end
print("A", "B", "C", sep="-")      # A-B-C
print("Hello", end=" ")            # Không xuống dòng
print("World")                     # Hello World (cùng dòng)

# In vào file
with open("output.txt", "w") as f:
    print("Hello File", file=f)    # Ghi vào file thay vì console

# Flush buffer
import time
for i in range(5):
    print(f"Đếm: {i}", end=" ", flush=True)
    time.sleep(1)  # Hiển thị ngay lập tức
```

---

## 🔍 7. HÀM KIỂM TRA & LOGIC

### `all()` và `any()` - Kiểm tra điều kiện
```python
# all(): True nếu TẤT CẢ phần tử đều True
scores = [85, 90, 78, 92]
all_passed = all(score >= 60 for score in scores)
print(all_passed)  # True (tất cả đều >= 60)

grades = [True, True, False, True]
print(all(grades))  # False (có 1 phần tử False)

# any(): True nếu CÓ ÍT NHẤT 1 phần tử True
has_high_score = any(score >= 90 for score in scores)
print(has_high_score)  # True (có điểm >= 90)

print(any(grades))  # True (có ít nhất 1 True)

# Ứng dụng: validation
def validate_password(password):
    checks = [
        len(password) >= 8,           # Ít nhất 8 ký tự
        any(c.isupper() for c in password),  # Có chữ hoa
        any(c.islower() for c in password),  # Có chữ thường
        any(c.isdigit() for c in password),  # Có số
    ]
    return all(checks)  # Tất cả điều kiện phải đúng

print(validate_password("MyPass123"))  # True
print(validate_password("mypass"))     # False
```

### `callable()` - Kiểm tra có thể gọi được không
```python
# Kiểm tra object có thể call như function không
def my_function():
    return "Hello"

print(callable(my_function))    # True
print(callable("hello"))        # False
print(callable(list))           # True (constructor)
print(callable(42))             # False

# Ứng dụng: dynamic function calling
def process_data(data, processor=None):
    if processor and callable(processor):
        return processor(data)
    return data

# Sử dụng
numbers = [1, 2, 3, 4, 5]
result1 = process_data(numbers, sum)    # 15
result2 = process_data(numbers, max)    # 5
result3 = process_data(numbers)         # [1, 2, 3, 4, 5]
```

---

## 🎁 8. HÀM NÂNG CAO

### `hasattr()`, `getattr()`, `setattr()` - Làm việc với attributes
```python
class Student:
    def __init__(self, name):
        self.name = name
        self.age = 20

student = Student("Hieu")

# hasattr(): kiểm tra có attribute không
print(hasattr(student, 'name'))    # True
print(hasattr(student, 'grade'))   # False

# getattr(): lấy giá trị attribute
name = getattr(student, 'name')           # "Hieu"
grade = getattr(student, 'grade', 0)      # 0 (default value)

# setattr(): set giá trị attribute
setattr(student, 'grade', 85)
print(student.grade)  # 85

# Ứng dụng: dynamic attribute access
def display_info(obj, attributes):
    for attr in attributes:
        if hasattr(obj, attr):
            value = getattr(obj, attr)
            print(f"{attr}: {value}")
        else:
            print(f"{attr}: Không tồn tại")

display_info(student, ['name', 'age', 'grade', 'city'])
```

### `vars()` và `dir()` - Thông tin về object
```python
# vars(): trả về __dict__ của object
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("An", 25)
print(vars(person))  # {'name': 'An', 'age': 25}

# dir(): liệt kê tất cả attributes và methods
print(dir(person))   # Danh sách dài các attributes/methods

# Ứng dụng: debugging
def debug_object(obj):
    print(f"Type: {type(obj)}")
    print(f"Attributes: {vars(obj) if hasattr(obj, '__dict__') else 'N/A'}")
    print(f"Methods: {[m for m in dir(obj) if not m.startswith('_')]}")

debug_object(person)
```

### `eval()` và `exec()` - Thực thi code động (Cẩn thận!)
```python
# eval(): tính toán expression
expression = "2 + 3 * 4"
result = eval(expression)  # 14

# Với variables
x = 10
y = 20
result = eval("x + y")     # 30

# exec(): thực thi statements
code = """
def greet(name):
    return f'Hello, {name}!'

message = greet('World')
print(message)
"""
exec(code)  # Sẽ in "Hello, World!"

# ⚠️ CẢNH BÁO: Rất nguy hiểm với input từ user!
# KHÔNG BAO GIỜ dùng eval() với untrusted input
# user_input = input("Nhập code: ")  # User có thể nhập: __import__('os').system('rm -rf /')
# eval(user_input)  # CỰC KỲ NGUY HIỂM!
```

### `globals()` và `locals()` - Scope variables
```python
# globals(): tất cả biến global
global_var = "I'm global"

def my_function():
    local_var = "I'm local"
    print("Locals:", locals())    # {'local_var': "I'm local"}
    print("Globals keys:", list(globals().keys()))

my_function()

# Ứng dụng: dynamic variable access
def set_global_var(name, value):
    globals()[name] = value

set_global_var('dynamic_var', 'Created dynamically!')
print(dynamic_var)  # "Created dynamically!"
```

---

## 🎨 9. HÀM FUNCTIONAL PROGRAMMING

### `iter()` và `next()` - Iterator protocol
```python
# Tạo iterator từ iterable
numbers = [1, 2, 3, 4, 5]
number_iter = iter(numbers)

# Lấy từng phần tử
print(next(number_iter))  # 1
print(next(number_iter))  # 2
print(next(number_iter))  # 3

# Với default value khi hết phần tử
print(next(number_iter, "Hết rồi"))  # 4
print(next(number_iter, "Hết rồi"))  # 5
print(next(number_iter, "Hết rồi"))  # "Hết rồi"

# Ứng dụng: xử lý file lớn từng dòng
def process_large_file(filename):
    with open(filename, 'r') as file:
        line_iter = iter(file)
        try:
            while True:
                line = next(line_iter)
                # Xử lý từng dòng...
                process_line(line)
        except StopIteration:
            print("Đã xử lý xong file")
```

### `slice()` - Tạo slice object
```python
# Tạo slice object để tái sử dụng
first_three = slice(0, 3)    # Tương đương [0:3]
last_two = slice(-2, None)   # Tương đương [-2:]
every_second = slice(None, None, 2)  # Tương đương [::2]

data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(data[first_three])    # [0, 1, 2]
print(data[last_two])       # [8, 9]
print(data[every_second])   # [0, 2, 4, 6, 8]

# Ứng dụng: data analysis
def analyze_data(data):
    recent_data = slice(-10, None)  # 10 điểm gần nhất
    sample_data = slice(None, None, 5)  # Mỗi 5 điểm lấy 1
    
    print("Recent:", data[recent_data])
    print("Sample:", data[sample_data])
```

---

## 💡 10. TIPS & TRICKS VỚI BUILT-IN FUNCTIONS

### Combine multiple functions
```python
# Kết hợp nhiều hàm để giải quyết vấn đề phức tạp
data = ["10", "20", "abc", "30", "def", "40"]

# Lọc số hợp lệ, chuyển đổi và tính tổng
def is_number(s):
    try:
        int(s)
        return True
    except ValueError:
        return False

valid_numbers = filter(is_number, data)       # Filter valid numbers
int_numbers = map(int, valid_numbers)         # Convert to int
total = sum(int_numbers)                      # Sum them up
print(f"Tổng: {total}")  # 100

# Hoặc viết ngắn gọn
total = sum(int(x) for x in data if x.isdigit())
print(f"Tổng (ngắn gọn): {total}")
```

### Performance comparison
```python
import time

# So sánh performance của các cách khác nhau
data = list(range(1000000))

# Cách 1: List comprehension
start = time.time()
squares1 = [x**2 for x in data]
time1 = time.time() - start

# Cách 2: map()
start = time.time()
squares2 = list(map(lambda x: x**2, data))
time2 = time.time() - start

# Cách 3: for loop
start = time.time()
squares3 = []
for x in data:
    squares3.append(x**2)
time3 = time.time() - start

print(f"List comprehension: {time1:.4f}s")
print(f"map(): {time2:.4f}s")
print(f"for loop: {time3:.4f}s")
```

### Memory efficient processing
```python
# Sử dụng generators để tiết kiệm memory
def process_big_data():
    # Thay vì tạo list lớn trong memory
    # big_list = [expensive_operation(x) for x in range(1000000)]
    
    # Dùng generator
    big_generator = (expensive_operation(x) for x in range(1000000))
    
    # Xử lý từng phần tử
    for item in big_generator:
        # Process item...
        pass

def expensive_operation(x):
    return x ** 2 + x ** 3
```

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [📋 Python Cheatsheet](./python-cheatsheet.md) - Bảng tra cứu nhanh
- [📦 Module thông dụng](./common-modules.md) - Các module hay dùng
- [⚡ Tối ưu hiệu suất](./performance-tips.md) - Mẹo tăng tốc code
- [🐛 Thông báo lỗi](./error-messages.md) - Hiểu các lỗi thường gặp

---

## 🎯 Tóm Tắt

Python có **69 hàm built-in** được chia thành các nhóm chính:

1. **Thông tin & Kiểm tra**: `type()`, `isinstance()`, `len()`, `id()`
2. **Toán học**: `abs()`, `round()`, `min()`, `max()`, `sum()`, `pow()`, `divmod()`
3. **Chuỗi & Encoding**: `str()`, `repr()`, `chr()`, `ord()`, `format()`
4. **Xử lý Iterable**: `sorted()`, `reversed()`, `enumerate()`, `zip()`, `filter()`, `map()`
5. **Chuyển đổi**: `int()`, `float()`, `bool()`, `list()`, `tuple()`, `set()`, `dict()`
6. **Input/Output**: `input()`, `print()`
7. **Kiểm tra & Logic**: `all()`, `any()`, `callable()`
8. **Nâng cao**: `hasattr()`, `getattr()`, `setattr()`, `vars()`, `dir()`, `eval()`, `exec()`
9. **Functional**: `iter()`, `next()`, `slice()`

**Mẹo quan trọng**:
- Luôn sử dụng built-in functions khi có thể (nhanh hơn, tối ưu hơn)
- Kết hợp nhiều functions để giải quyết vấn đề phức tạp
- Cẩn thận với `eval()` và `exec()` - có thể nguy hiểm
- Sử dụng generators cho dữ liệu lớn để tiết kiệm memory

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: Hãy thực hành từng hàm để nhớ lâu hơn!*
