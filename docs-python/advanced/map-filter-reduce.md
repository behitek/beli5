# 🎭 Map, Filter, Reduce - Bộ ba siêu anh hùng của Python

:::info
Map, Filter, Reduce giống như một nhóm siêu anh hùng - mỗi người có một sức mạnh đặc biệt để xử lý dữ liệu!
:::

## 🤔 Tại sao cần Map, Filter, Reduce?

Hãy tưởng tượng bạn có một danh sách sinh viên và cần:
- **Map** 🗺️: Chuyển đổi mỗi phần tử (như một máy biến đổi)
- **Filter** 🔍: Lọc các phần tử theo điều kiện (như một cái rây)  
- **Reduce** ⚡: Kết hợp tất cả thành một kết quả (như một máy nén)

```python
# Ví dụ minh họa
scores = [7, 8.5, 6, 9.2, 5.5, 8.8, 7.5]

# Map: Chuyển điểm thành thang 4
gpa_scores = list(map(lambda x: round(x / 2.5, 1), scores))
print(f"🗺️ Map - Thang 4.0: {gpa_scores}")

# Filter: Lọc điểm >= 8
high_scores = list(filter(lambda x: x >= 8, scores))  
print(f"🔍 Filter - Điểm cao: {high_scores}")

# Reduce: Tính điểm trung bình
from functools import reduce
average_score = reduce(lambda x, y: x + y, scores) / len(scores)
print(f"⚡ Reduce - Điểm TB: {average_score:.1f}")
```

## 🗺️ MAP - Máy biến đổi thần kỳ

Map áp dụng một hàm cho **TẤT CẢ** phần tử trong iterable.

### Cú pháp và cách dùng

```python
# map(function, iterable)
# Trả về map object (cần convert thành list để xem)

# Ví dụ cơ bản
numbers = [1, 2, 3, 4, 5]

# Bình phương tất cả
squared_numbers = list(map(lambda x: x**2, numbers))
print(f"📊 Bình phương: {squared_numbers}")  # [1, 4, 9, 16, 25]

# Với function định sẵn
def convert_to_text(number):
    """Chuyển số thành chữ"""
    digit_names = ["Không", "Một", "Hai", "Ba", "Bốn", "Năm"]
    return digit_names[number] if 0 <= number < len(digit_names) else str(number)

text_numbers = list(map(convert_to_text, numbers))
print(f"🔤 Thành chữ: {text_numbers}")
```

### Map với nhiều iterables

```python
# Map với 2 lists
list_a = [1, 2, 3, 4]
list_b = [10, 20, 30, 40]

# Cộng từng cặp
pair_sums = list(map(lambda x, y: x + y, list_a, list_b))
print(f"➕ Tổng các cặp: {pair_sums}")  # [11, 22, 33, 44]

# Nhân từng cặp
pair_products = list(map(lambda x, y: x * y, list_a, list_b))
print(f"✖️ Nhân các cặp: {pair_products}")  # [10, 40, 90, 160]

# Map với 3 lists
names = ["An", "Bình", "Cường"]
ages = [20, 19, 21]
scores = [8.5, 9.0, 7.8]

student_info = list(map(
    lambda name, age, score: f"{name} ({age} tuổi) - {score} điểm",
    names, ages, scores
))
print("👥 Thông tin sinh viên:")
for info in student_info:
    print(f"   📝 {info}")
```

### Map với String processing

```python
# Xử lý chuỗi
sentences = [
    "python là tuyệt vời",
    "học lập trình rất thú vị", 
    "ai và machine learning"
]

# Capitalize từng từ
formatted_sentences = list(map(lambda sentence: sentence.title(), sentences))
print("✨ Formatted sentences:")
for sentence in formatted_sentences:
    print(f"   📄 {sentence}")

# Đếm từ trong mỗi câu
word_counts = list(map(lambda sentence: len(sentence.split()), sentences))
print(f"📊 Số từ: {word_counts}")

# Thay thế từ khóa
replaced_sentences = list(map(
    lambda sentence: sentence.replace("python", "Python 🐍").replace("ai", "AI 🤖"),
    sentences
))
print("🔄 Sau khi thay thế:")
for sentence in replaced_sentences:
    print(f"   🎯 {sentence}")
```

## 🔍 FILTER - Cái rây thông minh

Filter chỉ giữ lại những phần tử thỏa mãn điều kiện.

### Cú pháp và cách dùng

```python
# filter(function, iterable)
# function trả về True/False

# Lọc số chẵn
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(f"🔢 Số chẵn: {even_numbers}")  # [2, 4, 6, 8, 10]

# Lọc số nguyên tố đơn giản
def is_prime(n):
    """Kiểm tra số nguyên tố"""
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

prime_numbers = list(filter(is_prime, range(2, 30)))
print(f"🔍 Số nguyên tố < 30: {prime_numbers}")

# Lọc chuỗi không rỗng
string_list = ["Python", "", "Java", "   ", "C++", None, "Go"]
valid_strings = list(filter(
    lambda s: s and s.strip(), 
    [s for s in string_list if s is not None]
))
print(f"📝 Chuỗi hợp lệ: {valid_strings}")
```

### Filter với Objects

```python
# Danh sách sản phẩm
products = [
    {"name": "Laptop", "price": 15000000, "stock": 5, "category": "electronics"},
    {"name": "Mouse", "price": 200000, "stock": 0, "category": "electronics"}, 
    {"name": "Áo thun", "price": 150000, "stock": 20, "category": "clothing"},
    {"name": "Giày", "price": 800000, "stock": 8, "category": "clothing"},
    {"name": "Sách", "price": 50000, "stock": 15, "category": "books"}
]

# Lọc sản phẩm còn hàng
in_stock_products = list(filter(lambda product: product["stock"] > 0, products))
print(f"📦 Sản phẩm còn hàng: {len(in_stock_products)}/{len(products)}")

# Lọc sản phẩm electronics đắt tiền
expensive_electronics = list(filter(
    lambda product: product["category"] == "electronics" and product["price"] >= 500000,
    products
))
print("💻 Electronics đắt tiền:")
for product in expensive_electronics:
    print(f"   🛍️ {product['name']}: {product['price']:,}đ")

# Lọc theo nhiều điều kiện
bestsellers = list(filter(
    lambda product: product["stock"] > 10 and product["price"] <= 500000,
    products
))
print("🔥 Sản phẩm bán chạy (nhiều hàng + giá rẻ):")
for product in bestsellers:
    print(f"   ⭐ {product['name']}: {product['price']:,}đ (còn {product['stock']})")
```

## ⚡ REDUCE - Máy nén siêu mạnh

Reduce kết hợp tất cả phần tử thành một giá trị duy nhất.

### Cú pháp và cách dùng

```python
from functools import reduce

# reduce(function, iterable[, initializer])
# function nhận 2 tham số: accumulator và current_item

# Tính tổng
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers)
print(f"➕ Tổng: {total}")  # 15

# Tính tích
product = reduce(lambda x, y: x * y, numbers)
print(f"✖️ Tích: {product}")  # 120

# Tìm số lớn nhất
max_number = reduce(lambda x, y: x if x > y else y, numbers)
print(f"🔝 Max: {max_number}")  # 5

# Với initial value
total_with_initial = reduce(lambda x, y: x + y, numbers, 100)
print(f"➕ Tổng + 100: {total_with_initial}")  # 115
```

### Reduce nâng cao

```python
# Nối chuỗi
words = ["Python", "is", "really", "awesome"]
sentence = reduce(lambda x, y: x + " " + y, words)
print(f"📝 Câu: {sentence}")

# Tạo dictionary từ lists
keys = ["name", "age", "score"]
values = ["An", 20, 8.5]
student_dict = reduce(
    lambda d, kv: {**d, kv[0]: kv[1]},
    zip(keys, values),
    {}
)
print(f"👤 Sinh viên: {student_dict}")

# Flatten nested list
nested_list = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
flat_list = reduce(lambda x, y: x + y, nested_list)
print(f"📋 Flattened: {flat_list}")

# Tính factorial
def calculate_factorial(n):
    """Tính giai thừa"""
    if n <= 1:
        return 1
    return reduce(lambda x, y: x * y, range(1, n + 1))

print(f"🧮 5! = {calculate_factorial(5)}")  # 120
print(f"🧮 7! = {calculate_factorial(7)}")  # 5040
```

## 🎭 Kết hợp Map, Filter, Reduce

```python
# Dữ liệu bán hàng
sales_data = [
    {"employee": "An", "orders": [100000, 200000, 150000]},
    {"employee": "Bình", "orders": [300000, 250000, 400000]},
    {"employee": "Cường", "orders": [180000, 220000]},
    {"employee": "Dung", "orders": [500000, 120000, 300000, 180000]}
]

print("🏪 Phân tích doanh số bán hàng")
print("="*50)

# Bước 1: Map - Tính tổng doanh thu mỗi nhân viên
employee_revenues = list(map(
    lambda emp: {
        "name": emp["employee"], 
        "total_revenue": sum(emp["orders"]),
        "order_count": len(emp["orders"])
    },
    sales_data
))

for emp in employee_revenues:
    print(f"👤 {emp['name']}: {emp['total_revenue']:,}đ ({emp['order_count']} đơn)")

# Bước 2: Filter - Lọc nhân viên doanh thu cao
top_performers = list(filter(
    lambda emp: emp["total_revenue"] >= 400000,
    employee_revenues
))

print(f"\n🌟 Nhân viên xuất sắc (≥400k):")
for emp in top_performers:
    avg_order = emp["total_revenue"] // emp["order_count"]
    print(f"   🏆 {emp['name']}: {emp['total_revenue']:,}đ (TB: {avg_order:,}đ/đơn)")

# Bước 3: Reduce - Tính tổng doanh thu công ty
company_total = reduce(
    lambda total, emp: total + emp["total_revenue"],
    employee_revenues,
    0
)

print(f"\n💰 Tổng doanh thu công ty: {company_total:,}đ")

# Combo: Tính phần trăm đóng góp
employee_percentages = list(map(
    lambda emp: {
        **emp,
        "percentage": round(emp["total_revenue"] / company_total * 100, 1)
    },
    employee_revenues
))

print(f"\n📊 Phần trăm đóng góp:")
for emp in employee_percentages:
    print(f"   📈 {emp['name']}: {emp['percentage']}%")
```

## 🚀 Ví dụ thực tế: Xử lý dữ liệu học sinh

```python
# Dữ liệu học sinh
students = [
    {"name": "Nguyễn Văn An", "class": "10A", "subjects": {"math": 8, "physics": 7, "chemistry": 9}},
    {"name": "Trần Thị Bình", "class": "10A", "subjects": {"math": 9, "physics": 8, "chemistry": 8}},
    {"name": "Lê Văn Cường", "class": "10B", "subjects": {"math": 6, "physics": 7, "chemistry": 6}},
    {"name": "Phạm Thị Dung", "class": "10B", "subjects": {"math": 9, "physics": 9, "chemistry": 10}},
    {"name": "Hoàng Văn Em", "class": "10A", "subjects": {"math": 7, "physics": 6, "chemistry": 8}}
]

class StudentManager:
    """Quản lý học sinh với Map, Filter, Reduce"""
    
    def __init__(self, students_list):
        self.students = students_list
    
    def calculate_average_scores(self):
        """Map: Tính điểm trung bình cho mỗi học sinh"""
        return list(map(
            lambda student: {
                **student,
                "average_score": round(sum(student["subjects"].values()) / len(student["subjects"]), 1)
            },
            self.students
        ))
    
    def filter_excellent_students(self, students_with_avg):
        """Filter: Lọc học sinh giỏi (≥8.0)"""
        return list(filter(
            lambda student: student["average_score"] >= 8.0,
            students_with_avg
        ))
    
    def analyze_by_class(self, students_with_avg):
        """Thống kê theo lớp"""
        # Nhóm theo lớp
        class_groups = {}
        for student in students_with_avg:
            class_name = student["class"]
            if class_name not in class_groups:
                class_groups[class_name] = []
            class_groups[class_name].append(student)
        
        # Tính thống kê cho mỗi lớp
        statistics = {}
        for class_name, students_list in class_groups.items():
            # Map: lấy điểm TB của từng HS trong lớp
            class_scores = list(map(lambda student: student["average_score"], students_list))
            
            # Reduce: tính điểm TB lớp
            class_average = reduce(lambda x, y: x + y, class_scores) / len(class_scores)
            
            # Filter: đếm số HS giỏi trong lớp
            excellent_students = list(filter(lambda student: student["average_score"] >= 8.0, students_list))
            
            statistics[class_name] = {
                "student_count": len(students_list),
                "class_average": round(class_average, 1),
                "excellent_count": len(excellent_students),
                "excellent_rate": round(len(excellent_students) / len(students_list) * 100, 1)
            }
        
        return statistics
    
    def find_hardest_subject(self, students_with_avg):
        """Tìm môn khó nhất (điểm TB thấp nhất)"""
        # Map: lấy điểm từng môn của tất cả HS
        all_subject_scores = {}
        
        for student in students_with_avg:
            for subject, score in student["subjects"].items():
                if subject not in all_subject_scores:
                    all_subject_scores[subject] = []
                all_subject_scores[subject].append(score)
        
        # Tính TB từng môn
        subject_averages = {}
        for subject, scores_list in all_subject_scores.items():
            subject_avg = reduce(lambda x, y: x + y, scores_list) / len(scores_list)
            subject_averages[subject] = round(subject_avg, 1)
        
        # Tìm môn có điểm thấp nhất
        hardest_subject = reduce(
            lambda subj1, subj2: subj1 if subject_averages[subj1] < subject_averages[subj2] else subj2,
            subject_averages.keys()
        )
        
        return hardest_subject, subject_averages

# Sử dụng hệ thống
manager = StudentManager(students)

print("🎓 HỆ THỐNG QUẢN LÝ HỌC SINH")
print("="*50)

# Bước 1: Tính điểm TB
students_with_avg = manager.calculate_average_scores()
print("📊 Điểm trung bình:")
for student in students_with_avg:
    print(f"   👤 {student['name']}: {student['average_score']} điểm")

# Bước 2: Lọc học sinh giỏi  
excellent_students = manager.filter_excellent_students(students_with_avg)
print(f"\n🌟 Học sinh giỏi ({len(excellent_students)}/{len(students)}):")
for student in excellent_students:
    print(f"   🏆 {student['name']} ({student['class']}): {student['average_score']} điểm")

# Bước 3: Thống kê theo lớp
class_statistics = manager.analyze_by_class(students_with_avg)
print(f"\n📈 Thống kê theo lớp:")
for class_name, stats in class_statistics.items():
    print(f"   🏫 Lớp {class_name}:")
    print(f"      👥 Số HS: {stats['student_count']}")
    print(f"      📊 Điểm TB: {stats['class_average']}")
    print(f"      🌟 HS giỏi: {stats['excellent_count']} ({stats['excellent_rate']}%)")

# Bước 4: Tìm môn khó nhất
hardest_subject, subject_averages = manager.find_hardest_subject(students_with_avg)
print(f"\n📚 Thống kê môn học:")
for subject, avg in subject_averages.items():
    icon = "😰" if subject == hardest_subject else "😊"
    print(f"   {icon} {subject.capitalize()}: {avg} điểm")
print(f"\n🎯 Môn khó nhất: {hardest_subject.capitalize()} ({subject_averages[hardest_subject]} điểm)")
```

## ⚡ Performance và Best Practices

```python
import time

def benchmark_processing():
    """So sánh hiệu suất các cách xử lý dữ liệu"""
    
    # Tạo dữ liệu lớn
    data = list(range(100000))
    
    print("⚡ BENCHMARK: Xử lý 100,000 số")
    print("="*50)
    
    # Cách 1: For loop truyền thống
    start = time.time()
    result1 = []
    for x in data:
        if x % 2 == 0:
            result1.append(x * x)
    time1 = time.time() - start
    
    # Cách 2: List comprehension
    start = time.time()
    result2 = [x * x for x in data if x % 2 == 0]
    time2 = time.time() - start
    
    # Cách 3: Map + Filter
    start = time.time()
    filtered_data = filter(lambda x: x % 2 == 0, data)
    result3 = list(map(lambda x: x * x, filtered_data))
    time3 = time.time() - start
    
    print(f"🐌 For loop:         {time1:.4f}s")
    print(f"🚀 List comprehension: {time2:.4f}s")
    print(f"🎭 Map + Filter:     {time3:.4f}s")
    
    # Verify results are same
    print(f"\n✅ Kết quả giống nhau: {result1 == result2 == result3}")
    print(f"📊 Số phần tử kết quả: {len(result1):,}")

benchmark_processing()

# Best Practices
print(f"\n📋 BEST PRACTICES")
print("="*50)
print("✅ Khi nào dùng Map/Filter/Reduce:")
print("   📌 Logic đơn giản, một dòng")
print("   📌 Functional programming style")  
print("   📌 Xử lý dữ liệu pipeline")
print("   📌 Làm việc với iterables")

print("\n✅ Khi nào dùng List Comprehension:")
print("   📌 Cần tạo list mới")
print("   📌 Logic phức tạp hơn lambda")
print("   📌 Dễ đọc và hiểu hơn")
print("   📌 Performance tốt hơn")

print("\n✅ Khi nào dùng For loop:")
print("   📌 Logic phức tạp, nhiều bước")
print("   📌 Cần side effects")
print("   📌 Dễ debug")
print("   📌 Có nhiều điều kiện phức tạp")
```

## 🎯 Tóm tắt

:::tip Nhớ 5 điều này về Map/Filter/Reduce:
1. **Map** 🗺️ - Biến đổi mỗi phần tử: `map(function, iterable)`
2. **Filter** 🔍 - Lọc phần tử theo điều kiện: `filter(function, iterable)`  
3. **Reduce** ⚡ - Kết hợp thành một giá trị: `reduce(function, iterable)`
4. **Lazy evaluation** - Chỉ tính khi cần (trừ reduce)
5. **Functional style** - Không thay đổi dữ liệu gốc
:::

Bộ ba Map, Filter, Reduce giúp bạn:
- 🎭 Functional programming style
- 🔄 Xử lý dữ liệu pipeline  
- 📊 Data transformation mạnh mẽ
- 🧹 Code sạch và dễ hiểu
- ⚡ Performance tối ưu cho nhiều case

**Bước tiếp theo**: Chúng ta đã hoàn thành phần Advanced! Hãy chuyển sang mục [Projects](/python/projects/calculator) để thực hành những gì đã học!

---
*💡 Tip: Map/Filter/Reduce như ba anh em siêu nhân - hợp lực để xử lý mọi dữ liệu!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**

