# 🎯 Lambda Functions trong Python - Hàm nhỏ gọn siêu mạnh

:::info
Lambda function giống như một chiếc dao Swiss Army - nhỏ gọn nhưng cực kỳ hữu ích trong nhiều tình huống!
:::

## 🤔 Lambda Function là gì?

Lambda function như một nhân viên part-time:
- **Regular function**: Như một nhân viên chính thức - có tên, có chỗ ngồi riêng
- **Lambda function**: Như một freelancer - không tên, làm việc nhanh, xong việc là đi

```python
# ❌ Function thường - dài dòng cho việc đơn giản
def square(x):
    return x * x

# ✅ Lambda - ngắn gọn và súc tích  
square_lambda = lambda x: x * x

print(f"Function thường: {square(5)}")      # 25
print(f"Lambda function: {square_lambda(5)}") # 25
```

## 🔧 Cú pháp Lambda

```python
# Cú pháp cơ bản
# lambda arguments: expression

# Ví dụ đơn giản
add = lambda a, b: a + b
print(f"2 + 3 = {add(2, 3)}")  # 5

# Nhiều tham số
calculate_average = lambda math, physics, chemistry: (math + physics + chemistry) / 3
print(f"Điểm TB: {calculate_average(8, 9, 7):.1f}")  # 8.0

# Với điều kiện
max_value = lambda a, b: a if a > b else b
print(f"Max(10, 5) = {max_value(10, 5)}")  # 10

# Phức tạp hơn
check_even = lambda n: "Chẵn" if n % 2 == 0 else "Lẻ"
print(f"7 là số: {check_even(7)}")  # Lẻ
```

## 🎯 Lambda với Built-in Functions

### 1. Map() - Áp dụng hàm cho tất cả phần tử

```python
# Chuyển đổi danh sách số
number_list = [1, 2, 3, 4, 5]

# Bình phương tất cả số
square_list = list(map(lambda x: x ** 2, number_list))
print(f"📊 Bình phương: {square_list}")  # [1, 4, 9, 16, 25]

# Chuyển Celsius sang Fahrenheit
celsius_temps = [0, 20, 30, 37, 100]
fahrenheit_temps = list(map(lambda c: (c * 9/5) + 32, celsius_temps))
print(f"🌡️ Celsius -> Fahrenheit:")
for c, f in zip(celsius_temps, fahrenheit_temps):
    print(f"   {c}°C = {f}°F")

# Xử lý chuỗi
name_list = ["nguyễn văn an", "trần thị bình", "lê văn cường"]
formatted_names = list(map(lambda name: name.title(), name_list))
print(f"✨ Formatted names: {formatted_names}")
```

### 2. Filter() - Lọc phần tử

```python
# Lọc số chẵn
number_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = list(filter(lambda x: x % 2 == 0, number_list))
print(f"🔢 Số chẵn: {even_numbers}")  # [2, 4, 6, 8, 10]

# Lọc điểm cao
score_list = [
    {"name": "An", "score": 8.5},
    {"name": "Binh", "score": 6.0},
    {"name": "Cuong", "score": 9.2},
    {"name": "Dung", "score": 7.8}
]

excellent_students = list(filter(lambda student: student["score"] >= 8.0, score_list))
print("🌟 Học sinh giỏi:")
for student in excellent_students:
    print(f"   👤 {student['name']}: {student['score']} điểm")

# Lọc chuỗi
word_list = ["Python", "Java", "C++", "JavaScript", "Go", "Rust"]
short_words = list(filter(lambda word: len(word) <= 4, word_list))
print(f"📝 Từ ngắn (≤4 ký tự): {short_words}")  # ['Java', 'C++', 'Go', 'Rust']
```

### 3. Reduce() - Kết hợp phần tử

```python
from functools import reduce

# Tính tổng
number_list = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, number_list)
print(f"➕ Tổng: {total}")  # 15

# Tìm số lớn nhất
max_number = reduce(lambda x, y: x if x > y else y, number_list)
print(f"🔝 Max: {max_number}")  # 5

# Tính giai thừa
n = 5
factorial = reduce(lambda x, y: x * y, range(1, n + 1))
print(f"🧮 {n}! = {factorial}")  # 120

# Nối chuỗi
word_list = ["Python", "is", "awesome"]
sentence = reduce(lambda x, y: x + " " + y, word_list)
print(f"📝 Câu: {sentence}")  # Python is awesome
```

## 🎮 Lambda trong Sorting

```python
# Danh sách sinh viên
students = [
    {"name": "An", "age": 20, "score": 8.5},
    {"name": "Binh", "age": 19, "score": 9.2},
    {"name": "Cuong", "age": 21, "score": 7.8},
    {"name": "Dung", "age": 20, "score": 9.0}
]

print("👥 Danh sách gốc:")
for student in students:
    print(f"   {student['name']} - {student['age']} tuổi - {student['score']} điểm")

# Sắp xếp theo điểm (cao xuống thấp)
print("\n📊 Sắp xếp theo điểm (cao -> thấp):")
sorted_by_score = sorted(students, key=lambda student: student["score"], reverse=True)
for student in sorted_by_score:
    print(f"   🏆 {student['name']}: {student['score']} điểm")

# Sắp xếp theo tuổi rồi theo tên
print("\n📅 Sắp xếp theo tuổi, sau đó theo tên:")
sorted_complex = sorted(students, key=lambda student: (student["age"], student["name"]))
for student in sorted_complex:
    print(f"   👤 {student['name']} - {student['age']} tuổi")

# Sắp xếp chuỗi theo độ dài
word_list = ["Python", "AI", "Machine Learning", "Data", "Science"]
sorted_by_length = sorted(word_list, key=lambda s: len(s))
print(f"\n📏 Sắp xếp theo độ dài: {sorted_by_length}")
```

## 🚀 Lambda nâng cao

### 1. Lambda với Multiple Conditions

```python
# Phân loại học sinh
classify_grade = lambda score: (
    "Xuất sắc" if score >= 9 else
    "Giỏi" if score >= 8 else  
    "Khá" if score >= 7 else
    "Trung bình" if score >= 5 else
    "Yếu"
)

score_list = [9.5, 8.2, 7.8, 6.0, 4.5]
for score in score_list:
    print(f"📊 Điểm {score}: {classify_grade(score)}")

# Kiểm tra năm nhuận
is_leap_year = lambda year: year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

year_list = [2020, 2021, 2024, 1900, 2000]
for year in year_list:
    status = "nhuận" if is_leap_year(year) else "không nhuận"
    print(f"📅 Năm {year}: {status}")
```

### 2. Lambda với Dictionary Operations

```python
# Xử lý dictionary với lambda
products = [
    {"name": "Laptop", "price": 15000000, "quantity": 5},
    {"name": "Mouse", "price": 200000, "quantity": 20},
    {"name": "Keyboard", "price": 800000, "quantity": 10},
    {"name": "Monitor", "price": 5000000, "quantity": 3}
]

# Tính tổng giá trị kho
total_value = sum(map(lambda product: product["price"] * product["quantity"], products))
print(f"💰 Tổng giá trị kho: {total_value:,}đ")

# Lọc sản phẩm đắt tiền
expensive_products = list(filter(lambda product: product["price"] >= 1000000, products))
print("💎 Sản phẩm đắt tiền:")
for product in expensive_products:
    print(f"   🛍️ {product['name']}: {product['price']:,}đ")

# Cập nhật giá (giảm 10%)
discounted_products = list(map(
    lambda product: {**product, "price": int(product["price"] * 0.9)}, 
    products
))
print("🏷️ Sau khi giảm giá 10%:")
for product in discounted_products:
    print(f"   💸 {product['name']}: {product['price']:,}đ")
```

### 3. Lambda với String Processing

```python
# Xử lý văn bản
texts = [
    "Python là ngôn ngữ lập trình tuyệt vời",
    "Học Python rất dễ và thú vị", 
    "AI và Machine Learning với Python",
    "Web development bằng Python Django"
]

# Đếm từ trong mỗi câu
word_counts = list(map(lambda sentence: len(sentence.split()), texts))
print("📝 Số từ trong mỗi câu:", word_counts)

# Lọc câu có chứa "Python"
python_sentences = list(filter(lambda sentence: "Python" in sentence, texts))
print("🐍 Câu chứa 'Python':")
for sentence in python_sentences:
    print(f"   📄 {sentence}")

# Chuyển thành uppercase và lấy 3 từ đầu
processed_texts = list(map(
    lambda sentence: " ".join(sentence.upper().split()[:3]), 
    texts
))
print("🔤 3 từ đầu (uppercase):")
for text in processed_texts:
    print(f"   📢 {text}")
```

## 🎯 Lambda vs Regular Functions

```python
import time

# So sánh performance
def test_performance():
    # Tạo dữ liệu test
    numbers = list(range(100000))
    
    # Test với regular function
    def square_func(x):
        return x * x
    
    start_time = time.time()
    result1 = list(map(square_func, numbers))
    time1 = time.time() - start_time
    
    # Test với lambda
    start_time = time.time()
    result2 = list(map(lambda x: x * x, numbers))
    time2 = time.time() - start_time
    
    print(f"⚡ Performance Comparison (100k items):")
    print(f"   Regular function: {time1:.4f}s")
    print(f"   Lambda function:  {time2:.4f}s")
    print(f"   Difference: {abs(time1-time2):.4f}s")

test_performance()

# Khi nào nên dùng gì?
print("\n📋 Khi nào dùng Lambda vs Regular Function:")
print("✅ Dùng Lambda khi:")
print("   - Logic đơn giản (1 dòng)")
print("   - Dùng với map/filter/reduce")
print("   - Callback functions")
print("   - Sorting keys")

print("\n✅ Dùng Regular Function khi:")  
print("   - Logic phức tạp (nhiều dòng)")
print("   - Cần documentation")
print("   - Tái sử dụng nhiều lần")
print("   - Cần debug dễ dàng")
```

## 🏆 Dự án: Data Analysis với Lambda

```python
import random
from datetime import datetime, timedelta
from collections import defaultdict

# Tạo dữ liệu bán hàng demo
def create_sales_data():
    """Tạo dữ liệu bán hàng mẫu"""
    products = ["Laptop", "Mouse", "Keyboard", "Monitor", "Headphone", "Webcam"]
    employees = ["An", "Binh", "Cuong", "Dung", "Em"]
    
    data = []
    start_date = datetime.now() - timedelta(days=30)
    
    for i in range(200):  # 200 đơn hàng
        date = start_date + timedelta(days=random.randint(0, 30))
        order = {
            "id": f"DH{i+1:03d}",
            "product": random.choice(products),
            "quantity": random.randint(1, 5),
            "price": random.randint(200000, 20000000),
            "employee": random.choice(employees),
            "date": date,
            "is_vip_customer": random.choice([True, False])
        }
        order["total_amount"] = order["quantity"] * order["price"]
        data.append(order)
    
    return data

class DataAnalyzer:
    """Phân tích dữ liệu với Lambda functions"""
    
    def __init__(self, data):
        self.data = data
    
    def general_statistics(self):
        """Thống kê tổng quan"""
        print("📊 THỐNG KÊ TỔNG QUAN")
        print("="*50)
        
        # Tổng doanh thu
        total_revenue = sum(map(lambda order: order["total_amount"], self.data))
        print(f"💰 Tổng doanh thu: {total_revenue:,}đ")
        
        # Số đơn hàng
        order_count = len(self.data)
        print(f"📦 Tổng số đơn: {order_count}")
        
        # Đơn hàng trung bình
        avg_order = total_revenue // order_count if order_count > 0 else 0
        print(f"📈 Giá trị TB/đơn: {avg_order:,}đ")
        
        # Đơn hàng lớn nhất
        max_order = max(self.data, key=lambda order: order["total_amount"])
        print(f"🏆 Đơn lớn nhất: {max_order['id']} - {max_order['total_amount']:,}đ")
    
    def top_products(self, top_n=3):
        """Top sản phẩm bán chạy"""
        print(f"\n🏅 TOP {top_n} SẢN PHẨM BÁN CHẠY")
        print("="*50)
        
        # Nhóm theo sản phẩm
        product_stats = defaultdict(lambda: {"quantity": 0, "revenue": 0})
        
        for order in self.data:
            product = order["product"]
            product_stats[product]["quantity"] += order["quantity"]
            product_stats[product]["revenue"] += order["total_amount"]
        
        # Sắp xếp theo doanh thu
        top_products = sorted(
            product_stats.items(),
            key=lambda item: item[1]["revenue"],
            reverse=True
        )[:top_n]
        
        for i, (product, stats) in enumerate(top_products, 1):
            print(f"{i}. 🛍️ {product}")
            print(f"   📦 Bán: {stats['quantity']} sản phẩm")
            print(f"   💰 Doanh thu: {stats['revenue']:,}đ")
    
    def employee_analysis(self):
        """Phân tích hiệu suất nhân viên"""
        print(f"\n👥 HIỆU SUẤT NHÂN VIÊN")
        print("="*50)
        
        # Nhóm theo nhân viên
        employee_stats = defaultdict(lambda: {"orders": 0, "revenue": 0})
        
        for order in self.data:
            employee = order["employee"]
            employee_stats[employee]["orders"] += 1
            employee_stats[employee]["revenue"] += order["total_amount"]
        
        # Sắp xếp theo doanh thu
        sorted_employees = sorted(
            employee_stats.items(),
            key=lambda item: item[1]["revenue"],
            reverse=True
        )
        
        for employee, stats in sorted_employees:
            avg_order = stats["revenue"] // stats["orders"] if stats["orders"] > 0 else 0
            print(f"👤 {employee}:")
            print(f"   📦 {stats['orders']} đơn hàng")
            print(f"   💰 {stats['revenue']:,}đ")
            print(f"   📊 TB/đơn: {avg_order:,}đ")
    
    def filter_analysis(self):
        """Lọc và phân tích dữ liệu theo tiêu chí"""
        print(f"\n🔍 PHÂN TÍCH THEO TIÊU CHÍ")
        print("="*50)
        
        # Đơn hàng lớn (>= 5 triệu)
        large_orders = list(filter(lambda order: order["total_amount"] >= 5000000, self.data))
        print(f"💎 Đơn hàng lớn (≥5tr): {len(large_orders)}/{len(self.data)}")
        
        if large_orders:
            large_orders_revenue = sum(map(lambda order: order["total_amount"], large_orders))
            print(f"   💰 Doanh thu từ đơn lớn: {large_orders_revenue:,}đ")
        
        # Khách VIP
        vip_orders = list(filter(lambda order: order["is_vip_customer"], self.data))
        print(f"⭐ Đơn hàng VIP: {len(vip_orders)}/{len(self.data)}")
        
        if vip_orders:
            vip_revenue = sum(map(lambda order: order["total_amount"], vip_orders))
            print(f"   💰 Doanh thu từ VIP: {vip_revenue:,}đ")
        
        # Đơn hàng tuần này
        today = datetime.now()
        week_ago = today - timedelta(days=7)
        
        recent_orders = list(filter(
            lambda order: order["date"] >= week_ago, 
            self.data
        ))
        print(f"📅 Đơn hàng 7 ngày qua: {len(recent_orders)}")
        
        if recent_orders:
            recent_revenue = sum(map(lambda order: order["total_amount"], recent_orders))
            print(f"   💰 Doanh thu 7 ngày: {recent_revenue:,}đ")

# Chạy phân tích
print("🏪 HỆ THỐNG PHÂN TÍCH BÁN HÀNG")
print("Sử dụng Lambda Functions để xử lý dữ liệu\n")

# Tạo dữ liệu
data = create_sales_data()
print(f"📋 Đã tạo {len(data)} đơn hàng mẫu")

# Phân tích
analyzer = DataAnalyzer(data)
analyzer.general_statistics()
analyzer.top_products(3)
analyzer.employee_analysis()
analyzer.filter_analysis()

print(f"\n🎉 Hoàn thành phân tích!")
print("💡 Tất cả phép tính đều sử dụng Lambda functions!")
```

## 🎯 Tóm tắt

:::tip Nhớ 5 điều này về Lambda:
1. **`lambda args: expression`** - cú pháp đơn giản
2. **Chỉ 1 expression** - không thể có nhiều statements  
3. **Không có tên** - anonymous functions
4. **Dùng với map/filter/reduce** - rất hữu ích
5. **Ngắn gọn cho logic đơn giản** - không thay thế được function phức tạp
:::

Lambda functions giúp bạn:
- ⚡ Viết code ngắn gọn và súc tích
- 🎯 Xử lý dữ liệu nhanh chóng
- 🔄 Functional programming style
- 📊 Data manipulation hiệu quả
- 🛠️ Callbacks và event handling

**Bước tiếp theo**: Học về [Map, Filter, Reduce](./map-filter-reduce.md) để master functional programming!

---
*💡 Tip: Lambda như chiếc dao nhỏ trong túi - không làm được mọi thứ nhưng cực kỳ tiện lợi!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
