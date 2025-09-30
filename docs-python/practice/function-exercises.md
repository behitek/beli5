# 🧩 Bài Tập về Hàm (Functions) trong Python

Chào mừng bạn đến với tập hợp các bài tập về hàm trong Python! Những bài tập này sẽ giúp bạn luyện tập và hiểu sâu hơn về cách tạo và sử dụng hàm trong Python.

## 🔰 Bài Tập Mức Cơ Bản

### Bài 1: Hàm Tính Tổng
**Yêu cầu:** Viết một hàm tên là `calculate_sum` nhận vào hai số và trả về tổng của chúng. Sau đó gọi hàm với các cặp số khác nhau.

<details>
<summary>Xem gợi ý</summary>

```python
def calculate_sum(a, b):
    """
    Tính tổng của hai số
    
    Args:
        a: Số thứ nhất
        b: Số thứ hai
        
    Returns:
        Tổng của hai số
    """
    return a + b

# Kiểm tra hàm
print(f"5 + 3 = {calculate_sum(5, 3)}")
print(f"10 + 20 = {calculate_sum(10, 20)}")
print(f"-7 + 7 = {calculate_sum(-7, 7)}")
```
</details>

### Bài 2: Hàm Kiểm Tra Số Chẵn/Lẻ
**Yêu cầu:** Viết một hàm tên là `is_even` nhận vào một số và trả về `True` nếu số đó là số chẵn, ngược lại trả về `False`.

<details>
<summary>Xem gợi ý</summary>

```python
def is_even(number):
    """
    Kiểm tra một số có phải là số chẵn hay không
    
    Args:
        number: Số cần kiểm tra
        
    Returns:
        True nếu số chẵn, False nếu số lẻ
    """
    return number % 2 == 0

# Kiểm tra hàm
test_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for num in test_numbers:
    if is_even(num):
        print(f"{num} là số chẵn")
    else:
        print(f"{num} là số lẻ")
```
</details>

### Bài 3: Hàm Tính Chu Vi và Diện Tích Hình Chữ Nhật
**Yêu cầu:** Viết hai hàm `calculate_rectangle_perimeter` và `calculate_rectangle_area` để tính chu vi và diện tích của một hình chữ nhật với chiều dài và chiều rộng cho trước.

<details>
<summary>Xem gợi ý</summary>

```python
def calculate_rectangle_perimeter(length, width):
    """
    Tính chu vi hình chữ nhật
    
    Args:
        length: Chiều dài
        width: Chiều rộng
        
    Returns:
        Chu vi hình chữ nhật
    """
    return 2 * (length + width)

def calculate_rectangle_area(length, width):
    """
    Tính diện tích hình chữ nhật
    
    Args:
        length: Chiều dài
        width: Chiều rộng
        
    Returns:
        Diện tích hình chữ nhật
    """
    return length * width

# Kiểm tra hàm
length = 5
width = 3
print(f"Hình chữ nhật có chiều dài {length} và chiều rộng {width}:")
print(f"Chu vi: {calculate_rectangle_perimeter(length, width)}")
print(f"Diện tích: {calculate_rectangle_area(length, width)}")
```
</details>

## 🔄 Bài Tập Mức Trung Bình

### Bài 4: Hàm với Tham Số Mặc Định
**Yêu cầu:** Viết một hàm `greet` nhận vào tên của người dùng và một lời chào tùy chọn (mặc định là "Xin chào"). Hàm sẽ trả về một chuỗi là lời chào kèm theo tên người dùng.

<details>
<summary>Xem gợi ý</summary>

```python
def greet(name, greeting="Xin chào"):
    """
    Tạo lời chào với tên người dùng
    
    Args:
        name: Tên người dùng
        greeting: Lời chào (mặc định là "Xin chào")
        
    Returns:
        Chuỗi chứa lời chào kèm tên
    """
    return f"{greeting}, {name}!"

# Kiểm tra hàm
print(greet("Alice"))                  # Sử dụng lời chào mặc định
print(greet("Bob", "Chào buổi sáng"))  # Chỉ định lời chào
print(greet("Charlie", "Welcome"))     # Lời chào khác
```
</details>

### Bài 5: Hàm với Số Lượng Tham Số Không Xác Định
**Yêu cầu:** Viết một hàm `calculate_average` nhận vào một số không xác định các số và trả về giá trị trung bình của chúng.

<details>
<summary>Xem gợi ý</summary>

```python
def calculate_average(*args):
    """
    Tính giá trị trung bình của một danh sách các số
    
    Args:
        *args: Danh sách các số cần tính trung bình
        
    Returns:
        Giá trị trung bình, hoặc 0 nếu không có số nào được cung cấp
    """
    if len(args) == 0:
        return 0
    return sum(args) / len(args)

# Kiểm tra hàm
print(f"Trung bình của 1, 2, 3: {calculate_average(1, 2, 3)}")
print(f"Trung bình của 10, 20: {calculate_average(10, 20)}")
print(f"Trung bình của nhiều số: {calculate_average(5, 10, 15, 20, 25)}")
print(f"Không có số nào: {calculate_average()}")
```
</details>

### Bài 6: Hàm với Tham Số Từ Khóa (Keyword Arguments)
**Yêu cầu:** Viết một hàm `create_profile` nhận vào thông tin cá nhân (tên, tuổi, thành phố, nghề nghiệp) và trả về một dictionary chứa các thông tin đó.

<details>
<summary>Xem gợi ý</summary>

```python
def create_profile(name, age, city="Không xác định", occupation="Không xác định"):
    """
    Tạo profile người dùng dạng dictionary
    
    Args:
        name: Tên người dùng
        age: Tuổi
        city: Thành phố (mặc định là "Không xác định")
        occupation: Nghề nghiệp (mặc định là "Không xác định")
        
    Returns:
        Dictionary chứa thông tin profile
    """
    profile = {
        "name": name,
        "age": age,
        "city": city,
        "occupation": occupation
    }
    return profile

# Kiểm tra hàm
profile1 = create_profile("Alice", 25, "Hà Nội", "Lập trình viên")
profile2 = create_profile("Bob", 30, occupation="Kỹ sư")
profile3 = create_profile(name="Charlie", age=22)

print("Profile 1:", profile1)
print("Profile 2:", profile2)
print("Profile 3:", profile3)
```
</details>

## 🚀 Bài Tập Mức Nâng Cao

### Bài 7: Hàm Đệ Quy Tính Giai Thừa
**Yêu cầu:** Viết một hàm đệ quy `factorial` để tính giai thừa của một số nguyên không âm.

<details>
<summary>Xem gợi ý</summary>

```python
def factorial(n):
    """
    Tính giai thừa của một số nguyên không âm bằng đệ quy
    
    Args:
        n: Số nguyên không âm cần tính giai thừa
        
    Returns:
        Giai thừa của n
        
    Raises:
        ValueError: Nếu n là số âm
    """
    if n < 0:
        raise ValueError("Không thể tính giai thừa của số âm")
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Kiểm tra hàm
for i in range(6):
    print(f"{i}! = {factorial(i)}")

# Xử lý ngoại lệ
try:
    print(factorial(-1))
except ValueError as e:
    print(f"Lỗi: {e}")
```
</details>

### Bài 8: Hàm Sinh Số Fibonacci
**Yêu cầu:** Viết một hàm `fibonacci` để tính số Fibonacci thứ n sử dụng đệ quy có nhớ (memoization).

<details>
<summary>Xem gợi ý</summary>

```python
def fibonacci(n, memo={}):
    """
    Tính số Fibonacci thứ n sử dụng đệ quy có nhớ (memoization)
    
    Args:
        n: Vị trí của số Fibonacci cần tính
        memo: Dictionary để lưu trữ các kết quả đã tính
        
    Returns:
        Số Fibonacci thứ n
    """
    if n in memo:
        return memo[n]
    
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
        return memo[n]

# Kiểm tra hàm
print("Dãy số Fibonacci:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

# Fibonacci lớn
print(f"F(30) = {fibonacci(30)}")
print(f"F(40) = {fibonacci(40)}")
```
</details>

### Bài 9: Hàm Bậc Cao (Higher-Order Function)
**Yêu cầu:** Viết một hàm bậc cao `apply_operation` nhận vào một hàm toán học và một danh sách các số, sau đó áp dụng hàm toán học đó cho mỗi số trong danh sách và trả về kết quả.

<details>
<summary>Xem gợi ý</summary>

```python
def apply_operation(func, numbers):
    """
    Áp dụng một hàm cho mỗi số trong danh sách
    
    Args:
        func: Hàm toán học cần áp dụng
        numbers: Danh sách các số
        
    Returns:
        Danh sách kết quả sau khi áp dụng hàm
    """
    return [func(num) for num in numbers]

# Một số hàm toán học để kiểm tra
def square(x):
    return x * x

def cube(x):
    return x * x * x

def double(x):
    return x * 2

def add_five(x):
    return x + 5

# Kiểm tra hàm
numbers = [1, 2, 3, 4, 5]
print(f"Danh sách ban đầu: {numbers}")
print(f"Bình phương: {apply_operation(square, numbers)}")
print(f"Lập phương: {apply_operation(cube, numbers)}")
print(f"Nhân đôi: {apply_operation(double, numbers)}")
print(f"Cộng 5: {apply_operation(add_five, numbers)}")

# Sử dụng lambda
print(f"Chia 2: {apply_operation(lambda x: x / 2, numbers)}")
```
</details>

## 💪 Bài Tập Thử Thách

### Bài 10: Decorator Đơn Giản
**Yêu cầu:** Viết một decorator `timer` để đo thời gian thực thi của một hàm và in ra kết quả.

<details>
<summary>Xem gợi ý</summary>

```python
import time
import functools

def timer(func):
    """
    Decorator để đo thời gian thực thi của một hàm
    
    Args:
        func: Hàm cần đo thời gian
        
    Returns:
        Hàm wrapper đo thời gian
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Hàm '{func.__name__}' chạy mất {end_time - start_time:.6f} giây")
        return result
    return wrapper

# Kiểm tra decorator
@timer
def slow_function(n):
    """Một hàm chạy chậm để kiểm tra decorator timer"""
    time.sleep(n)  # Giả lập một hàm mất n giây để chạy
    return f"Hoàn thành sau {n} giây"

print(slow_function(1))
print(slow_function(0.5))
```
</details>

### Bài 11: Closure và Function Factory
**Yêu cầu:** Viết một hàm `create_multiplier` nhận vào một số n và trả về một hàm mới, hàm mới này sẽ nhân bất kỳ tham số đầu vào nào với n.

<details>
<summary>Xem gợi ý</summary>

```python
def create_multiplier(n):
    """
    Tạo một hàm nhân số với n
    
    Args:
        n: Số nhân
        
    Returns:
        Một hàm mới nhận một số x và trả về x * n
    """
    def multiplier(x):
        return x * n
    return multiplier

# Kiểm tra hàm
double = create_multiplier(2)
triple = create_multiplier(3)
quadruple = create_multiplier(4)

print(f"Double 5: {double(5)}")
print(f"Triple 5: {triple(5)}")
print(f"Quadruple 5: {quadruple(5)}")

# Kiểm tra với nhiều giá trị
numbers = [1, 2, 3, 4, 5]
print(f"Doubled list: {[double(num) for num in numbers]}")
print(f"Tripled list: {[triple(num) for num in numbers]}")
```
</details>

### Bài 12: Generator Function
**Yêu cầu:** Viết một generator function `prime_generator` để tạo ra các số nguyên tố, bắt đầu từ 2 và tiếp tục vô hạn hoặc đến một giới hạn cho trước.

<details>
<summary>Xem gợi ý</summary>

```python
def is_prime(n):
    """
    Kiểm tra số có phải là số nguyên tố hay không
    
    Args:
        n: Số cần kiểm tra
        
    Returns:
        True nếu n là số nguyên tố, ngược lại False
    """
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

def prime_generator(limit=None):
    """
    Generator tạo ra các số nguyên tố
    
    Args:
        limit: Giới hạn trên (không bao gồm) cho các số nguyên tố,
               nếu là None thì sẽ tạo vô hạn
    
    Yields:
        Các số nguyên tố lần lượt
    """
    n = 2
    while limit is None or n < limit:
        if is_prime(n):
            yield n
        n += 1

# Kiểm tra generator
print("10 số nguyên tố đầu tiên:")
prime_gen = prime_generator()
for _ in range(10):
    print(next(prime_gen), end=" ")
print()

# Tạo các số nguyên tố nhỏ hơn 50
print("\nCác số nguyên tố nhỏ hơn 50:")
for prime in prime_generator(50):
    print(prime, end=" ")
print()
```
</details>

## 🎯 Thực Hành Thêm

Hãy thử thực hiện các bài tập sau đây để nâng cao kỹ năng của bạn:

1. Viết hàm kiểm tra một chuỗi có phải là palindrome (đọc xuôi ngược đều giống nhau) hay không
2. Viết hàm sắp xếp một list các số theo thứ tự tăng dần
3. Viết hàm chuyển đổi số thập phân sang số nhị phân
4. Viết hàm tạo ra một password ngẫu nhiên với độ dài cho trước
5. Viết một decorator ghi log mỗi khi một hàm được gọi (thời gian, tên hàm, tham số, kết quả trả về)

---

Chúc bạn học tập hiệu quả! Hãy nhớ rằng cách tốt nhất để học lập trình là thông qua thực hành nhiều bài tập, vì vậy hãy cố gắng giải quyết tất cả các bài tập trên và tự tạo ra các biến thể hoặc mở rộng của chúng!
