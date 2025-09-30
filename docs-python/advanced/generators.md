# 🎲 Generator trong Python - Tạo dữ liệu thông minh

:::info
Generator là như một chiếc máy sản xuất kẹo thông minh - chỉ tạo ra kẹo khi bạn cần, giúp tiết kiệm nguyên liệu và không gian!
:::

## 🤔 Generator là gì?

Generator giống như một người đầu bếp thông minh:
- **Regular function**: Như một đầu bếp làm sẵn 1000 món ăn rồi đưa cho bạn (tốn bộ nhớ!)
- **Generator**: Như một đầu bếp chỉ nấu món tiếp theo khi bạn đói (tiết kiệm bộ nhớ!)

```python
# ❌ Cách thường - tạo tất cả cùng lúc
def create_numbers_normal():
    """Tạo số theo cách thông thường"""
    result = []
    for i in range(1000000):
        result.append(i * i)
    return result

# ✅ Generator - tạo từng cái một khi cần
def create_numbers_generator():
    """Tạo số bằng generator"""
    for i in range(1000000):
        yield i * i  # 🔑 Keyword "yield"
```

## 🛠️ Cách tạo Generator

### 1. Generator Function (với `yield`)

```python
def count_numbers():
    """Đếm số từ 1 đến 3"""
    print("🏁 Bắt đầu đếm!")
    yield 1
    print("📖 Tiếp tục đếm...")
    yield 2
    print("📚 Gần xong rồi...")
    yield 3
    print("🎉 Hoàn thành!")

# Sử dụng
counter = count_numbers()
print(next(counter))  # 🏁 Bắt đầu đếm! \n 1
print(next(counter))  # 📖 Tiếp tục đếm... \n 2
print(next(counter))  # 📚 Gần xong rồi... \n 3
```

### 2. Generator Expression

```python
# Giống list comprehension nhưng dùng ()
squares = (x * x for x in range(5))
print(list(squares))  # [0, 1, 4, 9, 16]

# So sánh với list comprehension
list_squares = [x * x for x in range(5)]  # Tạo tất cả ngay
gen_squares = (x * x for x in range(5))   # Tạo khi cần
```

## 🎯 Ví dụ thực tế

### Đọc file lớn an toàn

```python
def read_large_file(file_name):
    """
    Đọc file lớn từng dòng một
    Giống như đọc sách từng trang thay vì nuốt cả quyển!
    """
    try:
        with open(file_name, 'r', encoding='utf-8') as file:
            for line in file:
                yield line.strip()
    except FileNotFoundError:
        print(f"❌ Không tìm thấy file: {file_name}")

# Tạo file demo
with open('large_data.txt', 'w', encoding='utf-8') as f:
    for i in range(1000):
        f.write(f"Dòng số {i}: Dữ liệu quan trọng\n")

# Sử dụng generator để đọc
print("🔍 Đọc 5 dòng đầu:")
file_reader = read_large_file('large_data.txt')
for i, line in enumerate(file_reader):
    if i >= 5:
        break
    print(f"  📝 {line}")
```

### Tạo số Fibonacci vô hạn

```python
def fibonacci():
    """
    Tạo dãy Fibonacci vô tận
    Như một cỗ máy tạo số không bao giờ dừng!
    """
    a, b = 0, 1
    while True:  # Vô hạn!
        yield a
        a, b = b, a + b

# Sử dụng
print("🔢 10 số Fibonacci đầu tiên:")
fib = fibonacci()
for i in range(10):
    print(next(fib), end=" ")
print()

# Hoặc dùng với for loop
print("📊 Các số Fibonacci < 100:")
for number in fibonacci():
    if number >= 100:
        break
    print(number, end=" ")
print()
```

### Xử lý dữ liệu pipeline

```python
def get_raw_data():
    """Bước 1: Lấy dữ liệu thô"""
    data = [
        "Nguyễn Văn An - 85",
        "Trần Thị Bình - 92", 
        "Lê Văn Cường - 78",
        "Phạm Thị Dung - 95"
    ]
    for line in data:
        yield line

def process_data(generator):
    """Bước 2: Xử lý dữ liệu"""
    for line in generator:
        name, score_str = line.split(" - ")
        score = int(score_str)
        yield {"name": name, "score": score}

def filter_data(generator, min_score=80):
    """Bước 3: Lọc dữ liệu"""
    for student in generator:
        if student["score"] >= min_score:
            yield student

# Tạo pipeline xử lý
print("🏭 Pipeline xử lý dữ liệu:")
raw_data = get_raw_data()
processed_data = process_data(raw_data)
filtered_data = filter_data(processed_data, 85)

print("🌟 Sinh viên giỏi (≥85 điểm):")
for student in filtered_data:
    print(f"  🎓 {student['name']}: {student['score']} điểm")
```

## 🎪 Generator với Class

```python
class LibraryManager:
    """Quản lý thư viện sách"""
    
    def __init__(self):
        self.books = [
            "Harry Potter và Hòn đá Phù thủy",
            "Dế Mèn Phiêu Lưu Ký", 
            "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
            "Nhà Giả Kim",
            "Doraemon - Tập 1"
        ]
    
    def __iter__(self):
        """Làm cho class có thể dùng trong for loop"""
        return self.read_books()
    
    def read_books(self):
        """Generator method để đọc sách"""
        for i, book in enumerate(self.books, 1):
            print(f"📖 Đang lấy sách thứ {i}...")
            yield book
    
    def search_books(self, keyword):
        """Tìm sách theo từ khóa"""
        for book in self.books:
            if keyword.lower() in book.lower():
                yield book

# Sử dụng
library = LibraryManager()

print("📚 Tất cả sách trong thư viện:")
for book in library:
    print(f"  📖 {book}")

print("\n🔍 Tìm sách có chữ 'Phiêu':")
for book in library.search_books("Phiêu"):
    print(f"  ✨ {book}")
```

## ⚡ Tại sao dùng Generator?

### 1. Tiết kiệm bộ nhớ

```python
import sys

# So sánh kích thước bộ nhớ
numbers_list = [x for x in range(1000000)]
numbers_generator = (x for x in range(1000000))

print(f"📊 List size: {sys.getsizeof(numbers_list):,} bytes")
print(f"📊 Generator size: {sys.getsizeof(numbers_generator):,} bytes")

# Generator nhỏ hơn hàng nghìn lần!
```

### 2. Xử lý dữ liệu lớn

```python
def process_large_csv(file_name):
    """
    Xử lý file CSV lớn mà không tốn nhiều RAM
    """
    def read_csv():
        """Đọc file CSV từng dòng"""
        with open(file_name, 'r', encoding='utf-8') as f:
            for line in f:
                yield line.strip().split(',')
    
    # Thống kê
    total_rows = 0
    total_value = 0
    
    for row in read_csv():
        if len(row) >= 2 and row[1].isdigit():
            total_rows += 1
            total_value += int(row[1])
    
    average = total_value // total_rows if total_rows > 0 else 0
    return total_rows, average

# Tạo file CSV demo
with open('data.csv', 'w', encoding='utf-8') as f:
    f.write("ten,diem,lop\n")
    for i in range(10000):
        f.write(f"SinhVien{i},{85 + i % 15},Lop{i % 10}\n")

rows, avg = process_large_csv('data.csv')
print(f"📈 Xử lý {rows:,} dòng, điểm TB: {avg}")
```

## 🎮 Bài tập thực hành

### Bài 1: Máy tạo mật khẩu

```python
import random
import string

def generate_password(length=8, include_numbers=True, include_special=True):
    """Generator tạo mật khẩu ngẫu nhiên"""
    while True:
        chars = string.ascii_letters  # a-z, A-Z
        
        if include_numbers:
            chars += string.digits  # 0-9
        
        if include_special:
            chars += "!@#$%^&*"
        
        password = ''.join(random.choice(chars) for _ in range(length))
        yield password

# Test máy tạo mật khẩu
print("🔐 Máy tạo mật khẩu:")
password_generator = generate_password(12)
for i in range(5):
    print(f"  🔑 Mật khẩu {i+1}: {next(password_generator)}")
```

### Bài 2: Đếm từ trong text

```python
def count_words_in_text(text):
    """Đếm số lần xuất hiện của mỗi từ"""
    from collections import defaultdict
    
    word_dict = defaultdict(int)
    for word in text.lower().split():
        # Loại bỏ dấu câu
        clean_word = ''.join(c for c in word if c.isalnum())
        if clean_word:
            word_dict[clean_word] += 1
    
    # Generator trả về từ và số lần xuất hiện
    for word, count in sorted(word_dict.items(), 
                            key=lambda x: x[1], 
                            reverse=True):
        yield word, count

# Test
text = """
Python là ngôn ngữ lập trình tuyệt vời.
Python dễ học và Python rất mạnh mẽ.
Học Python sẽ giúp bạn làm nhiều việc thú vị.
"""

print("📝 Thống kê từ trong văn bản:")
for word, count in count_words_in_text(text):
    if count > 1:  # Chỉ hiện từ xuất hiện > 1 lần
        print(f"  📊 '{word}': {count} lần")
```

## 🏆 Dự án: Hệ thống streaming dữ liệu

```python
import time
import random
from datetime import datetime

class DataStreamer:
    """
    Hệ thống streaming dữ liệu thời gian thực
    Giống như một đài phát thanh phát sóng liên tục!
    """
    
    def __init__(self):
        self.is_running = False
        
    def sensor_data(self):
        """Generator mô phỏng dữ liệu từ cảm biến"""
        self.is_running = True
        read_count = 0
        
        while self.is_running:
            temperature = round(random.uniform(20, 35), 1)
            humidity = round(random.uniform(40, 80), 1)
            pressure = round(random.uniform(990, 1020), 1)
            
            data = {
                'timestamp': datetime.now().strftime('%H:%M:%S'),
                'temperature': temperature,
                'humidity': humidity, 
                'pressure': pressure,
                'read_count': read_count + 1
            }
            
            read_count += 1
            yield data
            time.sleep(1)  # Đọc mỗi giây
    
    def filter_anomalies(self, data_stream):
        """Lọc dữ liệu bất thường"""
        for data in data_stream:
            # Kiểm tra ngưỡng cảnh báo
            warnings = []
            
            if data['temperature'] > 30:
                warnings.append("🌡️ Nhiệt độ cao")
            if data['humidity'] > 70:
                warnings.append("💧 Độ ẩm cao")
            if data['pressure'] < 1000:
                warnings.append("🌪️ Áp suất thấp")
            
            if warnings:
                data['warnings'] = warnings
                yield data
    
    def stop_stream(self):
        """Dừng streaming"""
        self.is_running = False

# Sử dụng hệ thống
print("🌡️ Hệ thống monitoring thời tiết:")
print("📊 Chỉ hiển thị dữ liệu bất thường...")
print("⏹️  Nhấn Ctrl+C để dừng\n")

streamer = DataStreamer()

try:
    # Tạo pipeline xử lý dữ liệu
    raw_data = streamer.sensor_data()
    filtered_data = streamer.filter_anomalies(raw_data)
    
    for data in filtered_data:
        print(f"⚠️  {data['timestamp']} - Lần đọc #{data['read_count']}")
        print(f"   🌡️ Nhiệt độ: {data['temperature']}°C")
        print(f"   💧 Độ ẩm: {data['humidity']}%") 
        print(f"   🌪️ Áp suất: {data['pressure']} hPa")
        print(f"   🚨 Cảnh báo: {', '.join(data['warnings'])}")
        print("-" * 40)
        
        # Demo chỉ chạy 10 lần
        if data['read_count'] >= 20:
            break
            
except KeyboardInterrupt:
    print("\n👋 Dừng hệ thống monitoring!")
finally:
    streamer.stop_stream()
```

## 🎯 Tóm tắt

:::tip Nhớ 5 điều này về Generator:
1. **`yield`** thay cho `return` - tạo từng giá trị một
2. **Tiết kiệm bộ nhớ** - không tạo tất cả cùng lúc  
3. **Lazy evaluation** - chỉ tính khi cần
4. **Iterator protocol** - có thể dùng trong for loop
5. **Pipeline processing** - xử lý dữ liệu theo chuỗi
:::

Generator là công cụ siêu mạnh để:
- 🔋 Xử lý dữ liệu lớn hiệu quả
- 💾 Tiết kiệm bộ nhớ
- ⚡ Tạo infinite sequence  
- 🔄 Stream processing
- 🎭 Lazy loading

**Bước tiếp theo**: Học về [Context Managers](./context-managers.md) để quản lý tài nguyên một cách an toàn! 

---
*💡 Tip: Generator như một người bạn thông minh - chỉ đưa cho bạn những gì bạn cần, khi bạn cần!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
