---
sidebar_position: 10
title: "📝 Làm Việc Với Chuỗi Cơ Bản - Chơi Với Chữ Và Câu"
description: "Học cách làm việc với chuỗi ký tự trong Python: tạo, nối, cắt và định dạng text. Chuỗi như những sợi dây chữ cái thú vị!"
keywords: ["python", "string", "chuỗi", "text", "văn bản", "nối chuỗi", "định dạng", "f-string"]
---

# 📝 Làm Việc Với Chuỗi Cơ Bản - Chơi Với Chữ Và Câu

:::tip 📝 Ví Dụ Dễ Hiểu
Hãy tưởng tượng chuỗi (string) như những **sợi dây được làm từ các chữ cái**! Bạn có thể nối chúng lại, cắt thành từng đoạn, trang trí và biến đổi theo ý muốn!
:::

## 🤔 Chuỗi Là Gì?

**Chuỗi (String)** là cách Python lưu trữ **chữ, từ, câu, và văn bản**. Mọi thứ bạn gõ trên bàn phím đều có thể trở thành chuỗi!

```mermaid
graph LR
    A[👋 "Xin chào"] --> B[🔤 Chuỗi]
    C[📱 "0987654321"] --> B
    D[🏠 "123 Phố Huế"] --> B
    E[😊 "Hôm nay vui quá!"] --> B
    
    B --> F[💾 Python Lưu Trữ]
    F --> G[🎯 Sử Dụng Linh Hoạt]
    
    style A fill:#FFE4B5
    style C fill:#FFE4B5  
    style D fill:#FFE4B5
    style E fill:#FFE4B5
    style B fill:#98FB98
    style F fill:#87CEEB
    style G fill:#FFD700
```

## 🎯 Cách Tạo Chuỗi

### 📌 1. Dấu Ngoặc Kép ("")

```python
# Cách phổ biến nhất
name = "Nguyễn Văn An"
greeting = "Xin chào các bạn!"
address = "123 Đường Lê Lợi, Hà Nội"

print(name)      # Nguyễn Văn An
print(greeting) # Xin chào các bạn!
```

### 📌 2. Dấu Ngoặc Đơn ('')

```python
# Cũng được, tùy sở thích
subject = 'Toán học'
color = 'Xanh lá cây'
emotion = 'Vui vẻ'

print(subject)  # Toán học
print(color)  # Xanh lá cây
```

### 📌 3. Khi Nào Dùng Ngoặc Nào?

```python
# ✅ Dùng ngoặc kép khi có ngoặc đơn bên trong
sentence = "Tôi nói: 'Hôm nay trời đẹp quá!'"

# ✅ Dùng ngoặc đơn khi có ngoặc kép bên trong  
book_title = 'Cuốn sách "Harry Potter" rất hay'

# ✅ Hoặc dùng dấu \ để "thoát" ký tự đặc biệt
complex_sentence = "Anh ấy nói: \"Tôi thích học Python!\""

print(sentence)
print(book_title) 
print(complex_sentence)
```

## 🔗 Nối Chuỗi (String Concatenation)

### ➕ 1. Dùng Dấu Cộng (+)

```python
# Nối chuỗi đơn giản
last_name = "Trần"
first_name = "Minh"
full_name = last_name + " " + first_name  # Nhớ thêm khoảng trắng!
print(full_name)  # Trần Minh

# Nối nhiều chuỗi
greeting = "Xin chào, "
friend_name = "Lan"
question = "! Hôm nay bạn thế nào?"
sentence = greeting + friend_name + question
print(sentence)  # Xin chào, Lan! Hôm nay bạn thế nào?
```

### 🔢 2. Nối Chuỗi Với Số

```python
# ❌ KHÔNG thể nối trực tiếp chuỗi với số
age = 15
# sentence = "Tôi " + age + " tuổi"  # LỖI!

# ✅ Phải chuyển số thành chuỗi trước
age = 15
sentence = "Tôi " + str(age) + " tuổi"
print(sentence)  # Tôi 15 tuổi

# ✅ Hoặc dùng f-string (dễ hơn!)
f_sentence = f"Tôi {age} tuổi"
print(f_sentence)  # Tôi 15 tuổi
```

## 🎨 F-String - Cách Định Dạng Chuỗi Thông Minh

**F-string** là cách **hiện đại và dễ nhất** để tạo chuỗi có chứa biến:

```python
# Thông tin cá nhân
name = "Mai"
age = 16
math_score = 8.75
city = "Hồ Chí Minh"

# ✅ Dùng f-string - Dễ đọc và dễ hiểu
introduction = f"Tôi là {name}, {age} tuổi, sống ở {city}"
score_announcement = f"Điểm toán của {name} là {math_score}"

print(introduction)     # Tôi là Mai, 16 tuổi, sống ở Hồ Chí Minh
print(score_announcement) # Điểm toán của Mai là 8.75
```

### 🎯 Định Dạng Số Trong F-String

```python
# Số thập phân
price = 123456.789
print(f"Giá: {price:.2f} VNĐ")        # Giá: 123456.79 VNĐ
print(f"Giá: {price:,.0f} VNĐ")       # Giá: 123,457 VNĐ

# Phần trăm
pass_rate = 0.85
print(f"Tỷ lệ đỗ: {pass_rate:.1%}")          # Tỷ lệ đỗ: 85.0%

# Căn lề
subject = "Python"
print(f"Môn học: '{subject:>10}'")           # Môn học: '    Python'
print(f"Môn học: '{subject:<10}'")           # Môn học: 'Python    '
print(f"Môn học: '{subject:^10}'")           # Môn học: '  Python  '
```

## ✂️ Cắt Chuỗi (String Slicing)

Mỗi ký tự trong chuỗi có một **vị trí (index)**:

```python
greeting = "Xin chào Python!"
#           0123456789...   (index từ 0)

# Lấy ký tự đầu tiên
print(greeting[0])    # X

# Lấy ký tự cuối cùng
print(greeting[-1])   # !

# Lấy từ vị trí 4 đến 8
print(greeting[4:9])  # chào

# Lấy 5 ký tự đầu
print(greeting[:5])   # Xin c

# Lấy từ vị trí 10 đến cuối
print(greeting[10:])  # Python!
```

## 📏 Độ Dài Chuỗi

```python
# Đếm số ký tự trong chuỗi
full_name = "Nguyễn Thị Hoa"
character_count = len(full_name)
print(f"Tên '{full_name}' có {character_count} ký tự")  # 14 ký tự

# Kiểm tra chuỗi rỗng
empty_string = ""
if len(empty_string) == 0:
    print("Chuỗi này rỗng!")

# Chuỗi dài nhất
name_1 = "An"
name_2 = "Bình" 
name_3 = "Châu"

if len(name_1) > len(name_2) and len(name_1) > len(name_3):
    print(f"{name_1} có tên dài nhất")
```

## 🔍 Kiểm Tra Nội Dung Chuỗi

```python
sentence = "Tôi yêu học Python!"

# Kiểm tra có chứa từ nào đó không
if "Python" in sentence:
    print("Câu này nói về Python!")

if "Java" not in sentence:
    print("Câu này không nói về Java")

# Kiểm tra bắt đầu bằng gì
if sentence.startswith("Tôi"):
    print("Câu bắt đầu bằng 'Tôi'")

# Kiểm tra kết thúc bằng gì  
if sentence.endswith("!"):
    print("Câu kết thúc bằng dấu chấm than")
```

## 🎪 Ví Dụ Thực Tế: Tạo Thẻ Học Sinh

```python
# 📋 Thông tin học sinh
last_name = "Nguyễn"
middle_name = "Văn" 
first_name = "Minh"
class_name = "9A"
school = "THCS Lê Quý Đôn"
average_score = 8.65
grade_level = "Giỏi"

# 🎨 Tạo thẻ học sinh đẹp
full_name = f"{last_name} {middle_name} {first_name}"
class_info = f"{class_name} - {school}"

print("=" * 40)
print("        THẺ HỌC SINH        ")
print("=" * 40)
print(f"Họ và tên: {full_name}")
print(f"Lớp:       {class_info}")
print(f"Điểm TB:   {average_score:.2f} ({grade_level})")
print("=" * 40)

# 🏆 Tạo thông báo động viên
if average_score >= 8.5:
    encouragement = f"Chúc mừng {first_name}! Bạn đã đạt thành tích xuất sắc!"
elif average_score >= 7.0:
    encouragement = f"Tốt lắm {first_name}! Hãy cố gắng thêm để đạt điểm cao hơn!"
else:
    encouragement = f"Đừng nản lòng {first_name}! Cố gắng lên nhé!"

print(f"\n💬 {encouragement}")
```

## 🎯 Bài Tập Thực Hành

### 🥇 Bài Tập 1: Tự Giới Thiệu Bằng F-String

```python
# TODO: Điền thông tin của bạn
full_name = "..."
age = ...
class_grade = "..."
hobby = "..."
favorite_subject = "..."

# Tạo đoạn giới thiệu bằng f-string
introduction = f"""
Xin chào! Tôi là {full_name}, năm nay {age} tuổi.
Tôi đang học lớp {class_grade}.
Sở thích của tôi là {hobby}.
Môn học tôi yêu thích nhất là {favorite_subject}.
Rất vui được làm quen với các bạn!
"""

print(introduction)
```

### 🥈 Bài Tập 2: Tạo Email Tự Động

```python
# Thông tin
last_name = "Tran"
first_name = "Mai"
birth_year = 2008
school_name = "thcs-le-quy-don"

# TODO: Tạo email theo format: ten.ho.namsinh@tentruong.edu.vn
email = f"{first_name.lower()}.{last_name.lower()}.{birth_year}@{school_name}.edu.vn"
print(f"Email: {email}")

# Tạo mật khẩu tạm thời: 3 ký tự đầu của tên + năm sinh + 3 ký tự đầu của họ
password = f"{first_name[:3].lower()}{birth_year}{last_name[:3].lower()}"
print(f"Mật khẩu tạm: {password}")
```

### 🥉 Bài Tập 3: Phân Tích Tên

```python
full_name = "Nguyễn Thị Hương Lan"

# TODO: Tách thành các phần
# Gợi ý: dùng split() để tách chuỗi theo khoảng trắng
name_parts = full_name.split()
last_name = name_parts[0]
first_name = name_parts[-1]  # Phần tử cuối cùng
middle_name = " ".join(name_parts[1:-1])  # Các phần ở giữa

print(f"Họ: {last_name}")
print(f"Tên đệm: {middle_name}")  
print(f"Tên: {first_name}")
print(f"Tên viết tắt: {last_name[0]}.{first_name[0]}.")
print(f"Độ dài tên: {len(full_name)} ký tự")
```

## 🎊 Tóm Tắt

Trong bài này, bạn đã học được:

✅ **Tạo chuỗi**: Dùng `"..."` hoặc `'...'`  
✅ **Nối chuỗi**: Dùng `+` hoặc f-string  
✅ **F-string**: `f"Tôi {tuoi} tuổi"` - Cách hiện đại nhất  
✅ **Cắt chuỗi**: `chuoi[start:end]`  
✅ **Độ dài**: `len(chuoi)`  
✅ **Kiểm tra nội dung**: `in`, `startswith()`, `endswith()`  

## 🚀 Bước Tiếp Theo

Bây giờ bạn đã biết làm việc với chữ và số! Tiếp theo, chúng ta sẽ học về **Boolean và Logic** - cách dạy Python phân biệt đúng/sai trong bài [Boolean và Logic Cơ Bản](/python/basics/boolean-and-logic).

:::tip 🎯 Thử Thách Nhỏ
Hãy thử tạo một "máy tạo username" tự động từ họ tên! Ví dụ: "Nguyễn Văn An" → "nguyenvanan2024" (tên + họ + năm hiện tại, tất cả viết thường, bỏ dấu cách)
:::

---

*🔗 **Bài tiếp theo**: [Boolean và Logic Cơ Bản - Dạy Python Phân Biệt Đúng Sai](/python/basics/boolean-and-logic)*
