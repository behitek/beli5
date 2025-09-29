---
sidebar_position: 6
title: "👂 Nhận Thông Tin - Dạy Python Lắng Nghe"
description: "Học cách sử dụng hàm input() để tương tác với người dùng, validation dữ liệu và xử lý lỗi. Dạy Python lắng nghe và phản hồi thông minh!"
keywords: ["python", "input", "user input", "validation", "interactive", "tương tác"]
---

# 👂 Nhận Thông Tin - Dạy Python Lắng Nghe

:::tip 🎧 Ví Dụ Dễ Hiểu
Giống như dạy con rắn pet không chỉ biết "nói" mà còn biết "lắng nghe" và phản hồi với những gì bạn nói. Python sẽ học cách đợi, nghe, hiểu và trả lời người dùng một cách thông minh!
:::

## 🤔 Tại Sao Python Cần Biết Lắng Nghe?

Cho đến giờ, Python chỉ biết "nói" (print). Giờ chúng ta sẽ dạy nó:

- 👂 **Lắng nghe** người dùng gõ thông tin
- 🤝 **Tương tác** hai chiều với con người
- 🎯 **Phản hồi** dựa trên input nhận được
- 🔄 **Tạo chương trình động** thay vì chỉ hiển thị text cố định

```mermaid
graph LR
    A["🧑 Người Dùng"] -->|"Gõ thông tin"| B["👂 input()"]
    B --> C["🐍 Python Xử Lý"]
    C -->|"Phản hồi"| D["📢 print()"]
    D --> A
    
    style A fill:#FFE4B5
    style B fill:#98FB98
    style C fill:#87CEEB
    style D fill:#FFD700
```

## 🎯 Hàm input() Cơ Bản

### 📝 **Cú Pháp Đơn Giản**

```python
# Cách cơ bản nhất
name = input("Tên bạn là gì? ")
print(f"Xin chào {name}!")
```

**Kết quả:**
```
Tên bạn là gì? Minh
Xin chào Minh!
```

### 🔍 **input() Hoạt Động Như Thế Nào?**

```python
# Bước 1: Python hiển thị câu hỏi
# Bước 2: Python dừng lại và đợi
# Bước 3: Người dùng gõ và nhấn Enter
# Bước 4: Python lưu thông tin vào biến
# Bước 5: Tiếp tục chạy chương trình

name = input("Nhập tên: ")  # Python đợi ở đây
print(f"Tên đã nhận: {name}")  # Chạy sau khi có input
```

:::info 💡 Điều Quan Trọng
**input() luôn trả về STRING** (chuỗi text), dù người dùng nhập số hay chữ. Nếu cần số, phải convert!
:::

## 🔢 Nhận Các Loại Dữ Liệu Khác Nhau

### 📝 **Nhận Text (String)**

```python
# Thông tin cá nhân
full_name = input("Họ tên đầy đủ: ")
hometown = input("Quê quán: ")
hobby = input("Sở thích: ")

print(f"\n🎭 THÔNG TIN CỦA BẠN:")
print(f"👤 Tên: {full_name}")
print(f"🏠 Quê: {hometown}")
print(f"❤️ Thích: {hobby}")
```

### 🔢 **Nhận Số (Numbers)**

```python
# ❌ Sai - input() trả về string
age = input("Tuổi của bạn: ")
next_year = age + 1  # Lỗi! Không thể cộng string với số

# ✅ Đúng - Convert string thành int
age = int(input("Tuổi của bạn: "))
next_year = age + 1
print(f"Năm sau bạn sẽ {next_year} tuổi")

# Số thập phân
height = float(input("Chiều cao (m): "))
weight = float(input("Cân nặng (kg): "))
bmi = weight / (height ** 2)
print(f"BMI của bạn: {bmi:.2f}")
```

### ✅ **Nhận True/False (Boolean)**

```python
# Cách 1: So sánh string
likes_python = input("Bạn có thích học Python không? (có/không): ")
if likes_python.lower() == "có":
    print("🎉 Tuyệt vời! Python sẽ giúp bạn rất nhiều!")
else:
    print("😊 Không sao, có thể bạn sẽ thích sau!")

# Cách 2: Chuyển thành boolean
has_girlfriend = input("Bạn có bạn gái/trai không? (y/n): ").lower()
is_in_relationship = has_girlfriend in ['y', 'yes', 'có', 'có chứ']
print(f"Tình trạng: {'Đã có người yêu' if is_in_relationship else 'Độc thân'}")
```

## 🛡️ Validation - Kiểm Tra Dữ Liệu

### 🔍 **Kiểm Tra Số Hợp Lệ**
### 🔍 **Kiểm Tra Số Hợp Lệ**

```python
# Cách 1: Sử dụng try-except (Khuyến nghị)
def input_age():
    while True:
        try:
            age = int(input("Nhập tuổi của bạn: "))
            if age < 0:
                print("❌ Tuổi không thể âm! Thử lại.")
                continue
            elif age > 150:
                print("❌ Tuổi quá lớn! Thử lại.")
                continue
            return age
        except ValueError:
            print("❌ Vui lòng nhập số nguyên! Thử lại.")

# Sử dụng
age = input_age()
print(f"✅ Tuổi hợp lệ: {age}")
```

### 🔤 **Kiểm Tra Text Hợp Lệ**

```python
def input_name():
    while True:
        name = input("Nhập tên của bạn: ").strip()
        
        if not name:  # Kiểm tra rỗng
            print("❌ Tên không được để trống!")
            continue
        
        if len(name) < 2:
            print("❌ Tên phải có ít nhất 2 ký tự!")
            continue
            
        if not name.replace(" ", "").isalpha():
            print("❌ Tên chỉ được chứa chữ cái!")
            continue
            
        return name.title()  # Viết hoa chữ cái đầu

# Sử dụng
name = input_name()
print(f"✅ Tên hợp lệ: {name}")
```

### 📧 **Kiểm Tra Email**

```python
import re

def input_email():
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    while True:
        email = input("Nhập email: ").strip().lower()
        
        if not email:
            print("❌ Email không được để trống!")
            continue
            
        if re.match(pattern, email):
            return email
        else:
            print("❌ Email không hợp lệ! (vd: ten@gmail.com)")

# Sử dụng
email = input_email()
print(f"✅ Email hợp lệ: {email}")
```

## 🎮 Tương Tác Nâng Cao

### 🔄 **Menu Lựa Chọn**

```python
def display_menu():
    print("\n🎯 MENU CHÍNH")
    print("=" * 30)
    print("1. 📊 Tính BMI")
    print("2. 🎲 Chơi game đoán số")
    print("3. 📝 Ghi chú cá nhân")
    print("4. ❌ Thoát")
    print("=" * 30)

def select_menu():
    while True:
        display_menu()
        choice = input("Chọn chức năng (1-4): ").strip()
        
        if choice in ['1', '2', '3', '4']:
            return int(choice)
        else:
            print("❌ Lựa chọn không hợp lệ! Vui lòng chọn 1-4.")

# Sử dụng
while True:
    selection = select_menu()
    
    if selection == 1:
        print("🔄 Đang tính BMI...")
    elif selection == 2:
        print("🎲 Bắt đầu game...")
    elif selection == 3:
        print("📝 Mở ghi chú...")
    elif selection == 4:
        print("👋 Tạm biệt!")
        break
```

### 💬 **Chatbot Đơn Giản**

```python
import random

def chatbot():
    print("🤖 Xin chào! Tôi là Python Bot!")
    print("💬 Hãy nói chuyện với tôi (gõ 'bye' để thoát)")
    
    responses = {
        "xin chào": ["Xin chào bạn! 😊", "Chào bạn nhé! 👋", "Hello! 🌟"],
        "tên": ["Tôi là Python Bot! 🤖", "Tôi tên là Bot, còn bạn?", "Bot là tên tôi!"],
        "tuổi": ["Tôi vừa được tạo ra! 🆕", "Tôi còn rất trẻ!", "Tuổi? Tôi là AI mà! 😄"],
        "python": ["Python tuyệt vời! 🐍", "Tôi yêu Python!", "Python là ngôn ngữ tốt nhất!"],
        "bye": ["Tạm biệt! 👋", "Bye bye! 🌟", "Hẹn gặp lại! 😊"]
    }
    
    while True:
        user_input = input("\n👤 Bạn: ").lower().strip()
        
        if user_input == "bye":
            print(f"🤖 Bot: {random.choice(responses['bye'])}")
            break
        
        # Tìm từ khóa trong input
        found = False
        for keyword, reply_list in responses.items():
            if keyword in user_input:
                print(f"🤖 Bot: {random.choice(reply_list)}")
                found = True
                break
        
        if not found:
            default_replies = [
                "Thú vị quá! Kể thêm đi! 🤔",
                "Tôi chưa hiểu lắm... 😅",
                "Wow, điều đó thật tuyệt! 🎉",
                "Hm, bạn có thể nói rõ hơn không? 🤷‍♂️"
            ]
            print(f"🤖 Bot: {random.choice(default_replies)}")

# Chạy chatbot
chatbot()
```

## 🎯 Dự Án Thực Hành

### 📋 **Dự Án 1: Hồ Sơ Cá Nhân**

```python
def create_personal_profile():
    print("🌟 TẠO HỒ SƠ CÁ NHÂN 🌟")
    print("=" * 40)
    
    # Thu thập thông tin
    full_name = input("👤 Họ tên: ").title()
    age = int(input("🎂 Tuổi: "))
    hometown = input("🏠 Quê quán: ").title()
    occupation = input("💼 Nghề nghiệp: ")
    hobby = input("❤️ Sở thích: ")
    description = input("📝 Mô tả bản thân (1 câu): ")
    
    # Hiển thị hồ sơ đẹp
    print("\n" + "🌟" * 50)
    print(f"{'📋 HỒ SƠ CÁ NHÂN':^50}")
    print("🌟" * 50)
    print(f"👤 Tên: {full_name}")
    print(f"🎂 Tuổi: {age} tuổi")
    print(f"🏠 Quê: {hometown}")
    print(f"💼 Nghề: {occupation}")
    print(f"❤️ Thích: {hobby}")
    print(f"📝 Giới thiệu: {description}")
    print(f"📅 Năm sinh: {2024 - age}")
    print("🌟" * 50)
    
    # Lưu vào file (nâng cao)
    with open("profile.txt", "w", encoding="utf-8") as file:
        file.write(f"Hồ sơ của {full_name}\n")
        file.write(f"Tuổi: {age}\n")
        file.write(f"Quê: {hometown}\n")
        file.write(f"Nghề: {occupation}\n")
        file.write(f"Sở thích: {hobby}\n")
        file.write(f"Mô tả: {description}\n")
    
    print("💾 Đã lưu hồ sơ vào file 'profile.txt'")

# Chạy dự án
create_personal_profile()
```

### 🧮 **Dự Án 2: Máy Tính Cá Nhân**

```python
def personal_calculator():
    print("🧮 MÁY TÍNH CÁ NHÂN 🧮")
    
    while True:
        print("\n📊 Các phép tính:")
        print("1. ➕ Cộng")
        print("2. ➖ Trừ") 
        print("3. ✖️ Nhân")
        print("4. ➗ Chia")
        print("5. 🔢 Lũy thừa")
        print("6. ❌ Thoát")
        
        choice = input("\nChọn phép tính (1-6): ").strip()
        
        if choice == '6':
            print("👋 Tạm biệt!")
            break
        
        if choice not in ['1', '2', '3', '4', '5']:
            print("❌ Lựa chọn không hợp lệ!")
            continue
        
        try:
            a = float(input("Nhập số thứ nhất: "))
            b = float(input("Nhập số thứ hai: "))
            
            if choice == '1':
                result = a + b
                print(f"📊 {a} + {b} = {result}")
            elif choice == '2':
                result = a - b
                print(f"📊 {a} - {b} = {result}")
            elif choice == '3':
                result = a * b
                print(f"📊 {a} × {b} = {result}")
            elif choice == '4':
                if b == 0:
                    print("❌ Không thể chia cho 0!")
                else:
                    result = a / b
                    print(f"📊 {a} ÷ {b} = {result}")
            elif choice == '5':
                result = a ** b
                print(f"📊 {a}^{b} = {result}")
                
        except ValueError:
            print("❌ Vui lòng nhập số hợp lệ!")

# Chạy máy tính
personal_calculator()
```

## 🔧 Xử Lý Lỗi Input Thường Gặp

### ❌ **Lỗi: ValueError**

```python
# ❌ Lỗi khi convert
try:
    tuoi = int(input("Tuổi: "))  # User nhập "abc"
except ValueError:
    print("❌ Vui lòng nhập số!")

# ✅ Cách xử lý tốt
def nhap_so_an_toan(prompt, loai_so=int):
    while True:
        try:
            return loai_so(input(prompt))
        except ValueError:
            print(f"❌ Vui lòng nhập {loai_so.__name__} hợp lệ!")

# Sử dụng
tuoi = nhap_so_an_toan("Tuổi: ", int)
diem = nhap_so_an_toan("Điểm: ", float)
```

### ❌ **Lỗi: KeyboardInterrupt**

```python
# Xử lý khi user nhấn Ctrl+C
try:
    ten = input("Tên: ")
    tuoi = int(input("Tuổi: "))
except KeyboardInterrupt:
    print("\n\n👋 Chương trình bị dừng bởi người dùng!")
    print("Tạm biệt! 😊")
```

### ❌ **Lỗi: EOFError**

```python
# Xử lý khi không có input (file rỗng)
try:
    ten = input("Tên: ")
except EOFError:
    print("❌ Không có dữ liệu đầu vào!")
    ten = "Khách"  # Giá trị mặc định
```

## 💡 Mẹo Pro Cho Input

### 🎨 **Input Đẹp Mắt**

```python
def input_dep(prompt, icon="🔸"):
    """Tạo input prompt đẹp mắt"""
    return input(f"{icon} {prompt}: ").strip()

# Sử dụng
ten = input_dep("Tên của bạn", "👤")
tuoi = input_dep("Tuổi", "🎂")
email = input_dep("Email", "📧")
```

### ⏱️ **Input Với Timeout** (Nâng Cao)

```python
import signal
import sys

def timeout_handler(signum, frame):
    raise TimeoutError("Hết thời gian!")

def input_with_timeout(prompt, timeout=10):
    """Input với giới hạn thời gian"""
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(timeout)
    
    try:
        result = input(f"{prompt} (có {timeout}s): ")
        signal.alarm(0)  # Tắt timeout
        return result
    except TimeoutError:
        print(f"\n⏰ Hết {timeout} giây! Sử dụng giá trị mặc định.")
        return ""

# Sử dụng (chỉ hoạt động trên Unix/Linux/Mac)
# name = input_with_timeout("Tên", 5)
```

### 🔒 **Input Mật Khẩu** (Ẩn Text)

```python
import getpass

def input_password():
    """Nhập mật khẩu không hiển thị trên màn hình"""
    while True:
        password = getpass.getpass("🔒 Mật khẩu: ")
        
        if len(password) < 6:
            print("❌ Mật khẩu phải có ít nhất 6 ký tự!")
            continue
        
        confirm = getpass.getpass("🔒 Xác nhận mật khẩu: ")
        
        if password == confirm:
            print("✅ Mật khẩu hợp lệ!")
            return password
        else:
            print("❌ Mật khẩu không khớp!")

# Sử dụng
# password = input_password()
```

## 🎊 Tóm Tắt

:::success 🌟 Những Gì Bạn Đã Học
- 👂 **input()** - Nhận thông tin từ người dùng
- 🔄 **Type conversion** - Chuyển đổi string thành int/float
- 🛡️ **Validation** - Kiểm tra dữ liệu hợp lệ
- ⚠️ **Error handling** - Xử lý lỗi với try-except
- 🎮 **Interactive programs** - Tạo chương trình tương tác
- 💬 **User experience** - Làm input thân thiện và đẹp mắt
:::

### 🚀 **Bước Tiếp Theo:**

Bây giờ Python đã biết "nói" và "nghe", hãy dạy nó "ghi nhớ":

1. 💭 **[Ghi chú trong code](/python/basics/comments)** - Dạy Python ghi nhớ và giải thích
2. 📦 **Biến số** - Dạy Python lưu trữ thông tin (sắp ra mắt!)
3. 🧮 **Toán học cơ bản** - Dạy Python tính toán (sắp ra mắt!)

:::tip 💡 Lời Khuyên
**Input validation là rất quan trọng!** Luôn giả định người dùng sẽ nhập sai, và chuẩn bị sẵn cách xử lý. Một chương trình tốt là chương trình không bao giờ crash vì input không mong đợi!
:::

---

*👂 **Ghi nhớ**: Input tốt tạo nên trải nghiệm người dùng tuyệt vời. Hãy làm cho việc tương tác với chương trình Python của bạn trở thành niềm vui!*
