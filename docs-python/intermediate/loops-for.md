---
sidebar_position: 2
title: "🔄 Vòng Lặp For - Dạy Python Lặp Lại Công Việc"
description: "Học cách sử dụng vòng lặp for trong Python để lặp lại công việc một cách thông minh. Python như một robot siêu hiệu quả!"
keywords: ["python", "for loop", "vòng lặp", "iteration", "range", "list", "lặp lại"]
---

# 🔄 Vòng Lặp For - Dạy Python Lặp Lại Công Việc

:::tip 🤖 Ví Dụ Dễ Hiểu
Hãy tưởng tượng Python như một **robot siêu hiệu quả** có thể lặp lại công việc hàng trăm, hàng nghìn lần mà không bao giờ mệt mỏi hay sai sót! Thay vì bạn viết code giống nhau 100 lần, chỉ cần nói "lặp lại 100 lần" là xong!
:::

## 🤔 Tại Sao Cần Vòng Lặp?

Trong cuộc sống, chúng ta thường phải lặp lại những việc giống nhau:

- 📚 **Học bài**: Đọc từ vựng 50 từ, mỗi từ 3 lần
- 🏃 **Tập thể dục**: Chạy quanh sân 10 vòng
- 📝 **Kiểm tra bài tập**: Chấm 30 bài của cả lớp
- 🎵 **Luyện nhạc**: Chơi một đoạn nhạc 20 lần cho thuần thục

Nếu không có vòng lặp, code sẽ như thế này:

```python
# ❌ Cách làm "ngu ngốc" - lặp lại code
print("Xin chào!")
print("Xin chào!")
print("Xin chào!")
print("Xin chào!")
print("Xin chào!")
# ... 95 dòng nữa để có 100 lần!
```

```python
# ✅ Cách làm "thông minh" - dùng vòng lặp
for i in range(100):
    print("Xin chào!")
```

```mermaid
graph TD
    A[🎯 Bắt Đầu Vòng Lặp] --> B{Còn Lần Nào?}
    B -->|✅ Còn| C[🔄 Thực Hiện Công Việc]
    C --> D[📈 Tăng Đếm]
    D --> B
    B -->|❌ Hết| E[🏁 Kết Thúc]
    
    style A fill:#FFE4B5
    style B fill:#98FB98
    style C fill:#87CEEB
    style D fill:#DDA0DD
    style E fill:#FFD700
```

## 🔢 Vòng Lặp For Với Range

### 📌 Cú Pháp Cơ Bản

```python
for counter_variable in range(loop_count):
    # Công việc cần lặp lại
    print("Làm việc gì đó")
```

### 🌟 Ví Dụ Đơn Giản

```python
# Đếm từ 0 đến 4 (5 lần)
print("Đếm từ 0 đến 4:")
for i in range(5):
    print(f"Lần thứ {i}")

print("\n" + "="*30)

# Chào 10 lần
print("Chào bạn 10 lần:")
for turn in range(10):
    print(f"Xin chào lần {turn + 1}!")
```

### 🎯 Range Với Tham Số Khác Nhau

```python
# range(stop) - từ 0 đến stop-1
print("range(5):", list(range(5)))  # [0, 1, 2, 3, 4]

# range(start, stop) - từ start đến stop-1
print("range(2, 8):", list(range(2, 8)))  # [2, 3, 4, 5, 6, 7]

# range(start, stop, step) - với bước nhảy
print("range(0, 10, 2):", list(range(0, 10, 2)))  # [0, 2, 4, 6, 8]
print("range(10, 0, -1):", list(range(10, 0, -1)))  # [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

## 📚 Lặp Qua Danh Sách và Chuỗi

### 🎒 Lặp Qua Danh Sách

```python
# Danh sách môn học
subjects = ["Toán", "Lý", "Hóa", "Văn", "Anh"]

print("Các môn học hôm nay:")
for subject in subjects:
    print(f"📖 {subject}")

print("\n" + "="*30)

# Danh sách điểm số
scores = [8.5, 7.0, 9.0, 6.5, 8.0]

print("Báo cáo điểm số:")
for i in range(len(scores)):
    print(f"{subjects[i]}: {scores[i]} điểm")
```

### 📝 Lặp Qua Chuỗi

```python
# Lặp qua từng ký tự
name = "PYTHON"

print("Phân tích từng chữ cái:")
for letter in name:
    print(f"Chữ '{letter}' - Mã ASCII: {ord(letter)}")

print("\n" + "="*30)

# Đếm ngược từ tên
print("Đếm ngược:")
for i in range(len(name) - 1, -1, -1):
    print(f"Vị trí {i}: {name[i]}")
```

## 🎪 Ví Dụ Thực Tế: Bảng Cửu Chương

```python
# Tạo bảng cửu chương từ 2 đến 9
print("🧮 BẢNG CỬU CHƯƠNG")
print("=" * 50)

for table in range(2, 10):
    print(f"\n📋 Bảng cửu chương {table}:")
    print("-" * 25)
    
    for number in range(1, 11):
        result = table * number
        print(f"{table} × {number:2d} = {result:2d}")
    
    print("-" * 25)

# Tạo bảng cửu chương ngang
print("\n🎯 BẢNG CỬU CHƯƠNG NGANG")
print("=" * 80)

# In header
print("   ", end="")
for i in range(1, 11):
    print(f"{i:4d}", end="")
print()

print("   " + "-" * 40)

# In từng hàng
for table in range(2, 10):
    print(f"{table}: ", end="")
    for number in range(1, 11):
        result = table * number
        print(f"{result:4d}", end="")
    print()
```

## 🎮 Ví Dụ Thực Tế: Hệ Thống Chấm Điểm Lớp

```python
# 📊 Dữ liệu lớp học
student_names = ["An", "Bình", "Châu", "Dung", "Em", "Phong"]
math_scores = [8.5, 7.0, 9.5, 6.0, 8.0, 7.5]
literature_scores = [7.5, 8.0, 8.5, 7.0, 9.0, 6.5]
english_scores = [9.0, 6.5, 8.0, 8.5, 7.5, 8.0]

print("📋 BÁO CÁO ĐIỂM SỐ LỚP 9A")
print("=" * 60)

# Tính điểm trung bình từng học sinh
total_class_score = 0
student_count = len(student_names)

print(f"{'STT':<3} {'Tên':<10} {'Toán':<6} {'Văn':<6} {'Anh':<6} {'TB':<6} {'Xếp Loại'}")
print("-" * 60)

for i in range(student_count):
    # Tính điểm trung bình cá nhân
    average_score = (math_scores[i] + literature_scores[i] + english_scores[i]) / 3
    total_class_score += average_score
    
    # Xếp loại
    if average_score >= 8.5:
        rating = "Giỏi"
        color_icon = "🥇"
    elif average_score >= 8.0:
        rating = "Khá"
        color_icon = "🥈"
    elif average_score >= 6.5:
        rating = "TB"
        color_icon = "🥉"
    else:
        rating = "Yếu"
        color_icon = "📚"
    
    # In thông tin
    print(f"{i+1:<3} {student_names[i]:<10} {math_scores[i]:<6} {literature_scores[i]:<6} {english_scores[i]:<6} {average_score:<6.1f} {color_icon} {rating}")

# Thống kê tổng lớp
class_average = total_class_score / student_count
print("-" * 60)
print(f"📊 THỐNG KÊ TỔNG LỚP:")
print(f"   Sĩ số: {student_count} học sinh")
print(f"   Điểm TB lớp: {class_average:.2f}")

# Đếm số học sinh theo xếp loại
excellent_count = good_count = average_count = poor_count = 0

for i in range(student_count):
    average_score = (math_scores[i] + literature_scores[i] + english_scores[i]) / 3
    if average_score >= 8.5:
        excellent_count += 1
    elif average_score >= 8.0:
        good_count += 1
    elif average_score >= 6.5:
        average_count += 1
    else:
        poor_count += 1

print(f"   Giỏi: {excellent_count} HS ({excellent_count/student_count*100:.1f}%)")
print(f"   Khá: {good_count} HS ({good_count/student_count*100:.1f}%)")
print(f"   TB: {average_count} HS ({average_count/student_count*100:.1f}%)")
print(f"   Yếu: {poor_count} HS ({poor_count/student_count*100:.1f}%)")
```

## 🎨 Vòng Lặp Lồng Nhau (Nested Loops)

### 🏗️ Tạo Hình Tam Giác

```python
# Tam giác sao
print("⭐ TAM GIÁC SAO")
for row in range(1, 6):
    for star in range(row):
        print("⭐", end=" ")
    print()  # Xuống dòng

print("\n" + "="*20)

# Tam giác số
print("🔢 TAM GIÁC SỐ")
for row in range(1, 6):
    for number in range(1, row + 1):
        print(number, end=" ")
    print()

print("\n" + "="*20)

# Hình chữ nhật
print("🟦 HÌNH CHỮ NHẬT 5x3")
for row in range(3):
    for col in range(5):
        print("🟦", end=" ")
    print()
```

### 🎯 Tạo Bảng Toạ Độ

```python
# Tạo bảng toạ độ
print("📍 BẢNG TOẠ ĐỘ")
print("   ", end="")

# In header (trục X)
for x in range(5):
    print(f"{x:3d}", end="")
print()

print("   " + "-" * 15)

# In từng hàng (trục Y)
for y in range(4):
    print(f"{y}: ", end="")
    for x in range(5):
        print(f"({x},{y})", end=" ")
    print()
```

## 🔧 Kỹ Thuật Nâng Cao

### 🎯 Enumerate - Lấy Cả Index và Giá Trị

```python
subjects = ["Toán", "Lý", "Hóa", "Văn", "Anh"]

# Cách thông thường
print("Cách thông thường:")
for i in range(len(subjects)):
    print(f"{i+1}. {subjects[i]}")

print("\n" + "="*30)

# Cách dùng enumerate (thanh lịch hơn)
print("Cách dùng enumerate:")
for i, subject in enumerate(subjects, 1):  # Bắt đầu từ 1
    print(f"{i}. {subject}")
```

### 🔄 Zip - Lặp Nhiều Danh Sách Cùng Lúc

```python
names = ["An", "Bình", "Châu"]
ages = [15, 16, 14]
classes = ["9A", "9B", "9A"]

print("Thông tin học sinh:")
for name, age, class_name in zip(names, ages, classes):
    print(f"Tên: {name}, Tuổi: {age}, Lớp: {class_name}")
```

## 🎯 Bài Tập Thực Hành

### 🥇 Bài Tập 1: Máy Tính Lãi Suất

```python
# TODO: Tính lãi suất kép theo năm
initial_amount = float(input("Số tiền gửi ban đầu (VNĐ): "))
interest_rate = float(input("Lãi suất hàng năm (%): ")) / 100
years = int(input("Số năm gửi: "))

print(f"\n📊 BẢNG TÍNH LÃI SUẤT KÉP")
print("=" * 50)
print(f"{'Năm':<5} {'Tiền Gốc':<15} {'Lãi':<15} {'Tổng Tiền':<15}")
print("-" * 50)

current_amount = initial_amount

for year in range(1, years + 1):
    interest = current_amount * interest_rate
    current_amount += interest
    
    print(f"{year:<5} {initial_amount:,.0f} VNĐ{interest:>10,.0f} VNĐ{current_amount:>12,.0f} VNĐ")

print("-" * 50)
total_interest = current_amount - initial_amount
print(f"💰 Tổng lãi nhận được: {total_interest:,.0f} VNĐ")
print(f"🎯 Tổng tiền cuối kỳ: {current_amount:,.0f} VNĐ")
```

### 🥈 Bài Tập 2: Game Đoán Số Nâng Cao

```python
import random

# TODO: Game đoán số với số lần thử giới hạn
computer_number = random.randint(1, 100)
max_attempts = 7

print("🎮 GAME ĐOÁN SỐ NÂNG CAO")
print("=" * 40)
print("🎯 Tôi đã nghĩ ra một số từ 1-100")
print(f"🎪 Bạn có {max_attempts} lần đoán!")
print("💡 Mẹo: Tôi sẽ gợi ý 'cao hơn' hoặc 'thấp hơn'")
print("-" * 40)

for attempt in range(1, max_attempts + 1):
    print(f"\n🔢 Lần thử {attempt}/{max_attempts}")
    
    try:
        guessed_number = int(input("Nhập số bạn đoán: "))
    except ValueError:
        print("❌ Vui lòng nhập một số hợp lệ!")
        continue
    
    if guessed_number == computer_number:
        print(f"🎉 CHÍNH XÁC! Số tôi nghĩ là {computer_number}")
        print(f"🏆 Bạn đã đoán đúng trong {attempt} lần thử!")
        
        # Đánh giá kết quả
        if attempt <= 3:
            print("🌟 XUẤT SẮC! Bạn là cao thủ đoán số!")
        elif attempt <= 5:
            print("👍 RẤT TỐT! Kỹ năng ổn định!")
        else:
            print("😊 KHÔNG SAO! Lần sau sẽ tốt hơn!")
        break
    elif guessed_number < computer_number:
        print("📈 Số tôi nghĩ CAO HÔN!")
    else:
        print("📉 Số tôi nghĩ THẤP HƠN!")
        
    # Kiểm tra lần cuối
    if attempt == max_attempts:
        print(f"\n💔 HẾT LƯỢT! Số tôi nghĩ là {computer_number}")
        print("🎯 Lần sau hãy thử chiến lược khác nhé!")
```

### 🥉 Bài Tập 3: Vẽ Hình Bằng Ký Tự

```python
# TODO: Vẽ kim tự tháp và các hình khác
print("🏛️ KIM TỰ THÁP")

# Kim tự tháp
height = int(input("Nhập chiều cao kim tự tháp: "))

for row in range(height):
    # In khoảng trắng
    for space in range(height - row - 1):
        print(" ", end="")
    
    # In dấu sao
    for star in range(2 * row + 1):
        print("*", end="")
    
    print()  # Xuống dòng

print("\n" + "="*40)

# Hình thoi
print("💎 HÌNH THOI")
size = 5

# Nửa trên
for i in range(size):
    for j in range(size - i - 1):
        print(" ", end="")
    for j in range(2 * i + 1):
        print("💎", end="")
    print()

# Nửa dưới
for i in range(size - 2, -1, -1):
    for j in range(size - i - 1):
        print(" ", end="")
    for j in range(2 * i + 1):
        print("💎", end="")
    print()
```

## 🎊 Tóm Tắt

Trong bài này, bạn đã học được:

✅ **Vòng lặp for cơ bản** - Lặp với `range()`  
✅ **Range linh hoạt** - start, stop, step  
✅ **Lặp qua dữ liệu** - list, string  
✅ **Vòng lặp lồng nhau** - Tạo hình, bảng  
✅ **Kỹ thuật nâng cao** - enumerate, zip  
✅ **Ứng dụng thực tế** - Chấm điểm, game, vẽ hình  

## 🚀 Bước Tiếp Theo

Tuyệt vời! Python giờ đã biết **lặp lại công việc hiệu quả** rồi! Tiếp theo, chúng ta sẽ học về [Vòng Lặp While](/python/intermediate/loops-while) - loại vòng lặp **linh hoạt hơn** có thể chạy đến khi điều kiện thay đổi!

:::tip 🎯 Thử Thách Nhỏ
Hãy thử tạo một "máy tạo mật khẩu ngẫu nhiên" sử dụng vòng lặp for! Tạo mật khẩu gồm 12 ký tự ngẫu nhiên (chữ hoa, chữ thường, số, ký tự đặc biệt) và cho phép người dùng tạo nhiều mật khẩu cùng lúc!
:::

---

*🔗 **Bài tiếp theo**: [Vòng Lặp While - Lặp Đến Khi Điều Kiện Thay Đổi](/python/intermediate/loops-while)*
