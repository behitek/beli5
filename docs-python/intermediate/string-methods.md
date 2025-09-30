---
sidebar_position: 12
title: "🧵 String Methods Nâng Cao – Siêu hay mà dễ"
description: "Tổng hợp phương thức chuỗi quan trọng trong Python 3.12: strip, split, join, replace, casefold, startswith/endswith, find/index, is* checks, format, f-strings, translate."
keywords: ["python", "string methods", "chuỗi", "strip", "split", "join", "replace", "format", "f-string"]
---

# 🧵 String Methods Nâng Cao – Siêu hay mà dễ

::::tip Gợi ý thân thiện
Chuỗi như sợi dây: bạn có thể cắt, nối, nhuộm màu (viết hoa/thường), kiểm tra, và dệt thành câu hoàn chỉnh. Đừng lo, từng bước một thôi!
::::

## ✂️ Cắt gọt khoảng trắng: `strip`, `lstrip`, `rstrip`

```python
text = "  xin chao  "
print(text.strip())   # "xin chao"
print(text.lstrip())  # "xin chao "
print(text.rstrip())  # "  xin chao"
```

## 🔡 Viết hoa/thường: `lower`, `upper`, `title`, `capitalize`, `casefold`

```python
text_sample = "TiẾng ViỆt"
print(text_sample.lower())      # tiếng việt
print(text_sample.upper())      # TIẾNG VIỆT
print(text_sample.title())      # Tiếng Việt
print(text_sample.capitalize()) # Tiếng việt
print("ß".casefold())           # ss (so sánh không phân biệt chữ hoa/thường mạnh mẽ)
```

## 🔍 Tìm kiếm: `find`, `rfind`, `index`, `startswith`, `endswith`

```python
message = "hello world"
print(message.find("o"))        # 4 (không lỗi nếu không thấy: trả -1)
print(message.rfind("o"))       # 7
print(message.startswith("he")) # True
print(message.endswith("ld"))   # True
```

## 🔁 Thay thế & chia nhỏ: `replace`, `split`, `rsplit`, `partition`

```python
print("a,b,c".split(","))          # ['a', 'b', 'c']
print("a,b,c".rsplit(",", 1))      # ['a,b', 'c']
print("2025-09-29".partition("-")) # ('2025', '-', '09-29')
print("banana".replace("na", "*"))  # ba**
```

## 🧵 Nối chuỗi: `join`

```python
word_list = ["Python", "dễ", "ghê"]
print(" ".join(word_list))  # "Python dễ ghê"
```

## ✅ Kiểm tra nội dung: nhóm `is*`

```python
print("123".isdecimal())   # True
print("一二三".isdecimal()) # False, nhưng isdigit() có thể True với một số ký tự
print("abc".isalpha())     # True
print("abc123".isalnum())  # True
print("\n\t".isspace())     # True
```

## 🧮 Căn lề & đệm: `center`, `ljust`, `rjust`, `zfill`

```python
print("7".zfill(3))        # 007
print("hi".center(6, "*")) # **hi**
```

## 🧰 Bảng dịch: `maketrans` + `translate`

```python
translation_table = str.maketrans({"a": "@", "s": "$"})
print("password".translate(translation_table))  # p@$$word
```

## 🧩 Định dạng chuỗi: f-strings và `format`

```python
user_name = "Lan"
score = 9.456
print(f"Bạn {user_name} đạt {score:.1f} điểm")        # f-string
print("Bạn {0} đạt {1:.1f} điểm".format(user_name, score))
```

## 🧪 Thực hành nhỏ

1) Tách họ và tên từ chuỗi "  nguyen   van   a  " và in chuẩn hoá: "Nguyen Van A".
2) Viết hàm `mask_email(email)` che tên người dùng: `abc@example.com` → `***@example.com`.
3) Đổi ký tự tiếng Việt có dấu thành không dấu (gợi ý: `translate`).

---

👉 Áp dụng các phương thức này trong dự án `password-generator` để làm sạch input và hiển thị đẹp hơn.

---
sidebar_position: 11
title: "🔤 String Methods - Xử Lý Văn Bản Nâng Cao"
description: "Học các phương thức mạnh mẽ của string trong Python: format, split, join, replace, và nhiều hơn nữa. Biến văn bản thành công cụ siêu mạnh!"
keywords: ["python", "string methods", "text processing", "format", "split", "join", "replace", "xử lý văn bản"]
---

# 🔤 String Methods - Xử Lý Văn Bản Nâng Cao

:::tip 🔤 Ví Dụ Dễ Hiểu
Hãy tưởng tượng String như một **câu văn** và String Methods như những **công cụ chỉnh sửa văn bản**! Bạn có thể cắt, nối, thay thế, tìm kiếm, và biến đổi văn bản theo ý muốn - giống như một nhà biên tập chuyên nghiệp!
:::

## 🤔 String Methods Là Gì?

**String Methods** là những **chức năng đặc biệt** mà Python đã tích hợp sẵn cho chuỗi ký tự. Thay vì bạn phải tự viết code phức tạp, chỉ cần gọi tên phương thức là xong!

```mermaid
graph LR
    A[📝 String] --> B[🔧 String Methods]
    B --> C[✂️ Cắt & Nối]
    B --> D[🔍 Tìm & Thay]
    B --> E[📊 Kiểm Tra]
    B --> F[🎨 Định Dạng]
    B --> G[🔄 Biến Đổi]
    
    C --> H[split, join]
    D --> I[find, replace]
    E --> J[startswith, endswith]
    F --> K[format, center]
    G --> L[upper, lower, strip]
    
    style A fill:#FFE4B5
    style B fill:#98FB98
    style H fill:#87CEEB
    style I fill:#DDA0DD
    style J fill:#FFD700
    style K fill:#FFA07A
    style L fill:#90EE90
```

### 🆚 So Sánh Với Code Thông Thường

```python
# ❌ Cách cũ - tự viết code phức tạp
def convert_to_uppercase(input_string):
    """Chuyển đổi chuỗi thành chữ hoa"""
    result = ""
    for character in input_string:
        if 'a' <= character <= 'z':
            result += chr(ord(character) - 32)
        else:
            result += character
    return result

# ✅ Cách mới - sử dụng string method
uppercase_string = input_string.upper()  # Đơn giản hơn nhiều!
```

## 🎯 Các Phương Thức Cơ Bản

### 🔄 Biến Đổi Chữ Hoa/Thường

```python
# Chuỗi mẫu
full_name = "Nguyễn Văn An"

# Chuyển thành chữ hoa
uppercase_name = full_name.upper()
print("Chữ hoa:", uppercase_name)  # NGUYỄN VĂN AN

# Chuyển thành chữ thường
lowercase_name = full_name.lower()
print("Chữ thường:", lowercase_name)  # nguyễn văn an

# Chữ hoa đầu từ
title_name = full_name.title()
print("Title case:", title_name)  # Nguyễn Văn An

# Chữ hoa đầu câu
capitalize_name = full_name.capitalize()
print("Capitalize:", capitalize_name)  # Nguyễn văn an

# Đảo ngược chữ hoa/thường
swapcase_name = full_name.swapcase()
print("Swap case:", swapcase_name)  # nGUYỄN vĂN aN
```

### ✂️ Cắt và Nối Chuỗi

```python
# Chuỗi mẫu
sentence = "Python là ngôn ngữ lập trình tuyệt vời"

# Tách chuỗi thành list
word_list = sentence.split()
print("Tách theo khoảng trắng:", word_list)
# ['Python', 'là', 'ngôn', 'ngữ', 'lập', 'trình', 'tuyệt', 'vời']

# Tách theo ký tự cụ thể
email_address = "user@example.com"
email_parts = email_address.split("@")
print("Tách email:", email_parts)  # ['user', 'example.com']

# Nối list thành chuỗi
rejoined_words = " ".join(word_list)
print("Nối lại:", rejoined_words)  # Python là ngôn ngữ lập trình tuyệt vời

# Nối với ký tự khác
hyphenated_words = "-".join(word_list)
print("Nối với gạch ngang:", hyphenated_words)
# Python-là-ngôn-ngữ-lập-trình-tuyệt-vời
```

### 🔍 Tìm Kiếm và Thay Thế

```python
# Chuỗi mẫu
text_content = "Python là ngôn ngữ lập trình Python tuyệt vời"

# Tìm vị trí
first_position = text_content.find("Python")
print("Vị trí đầu tiên của 'Python':", first_position)  # 0

last_position = text_content.rfind("Python")
print("Vị trí cuối cùng của 'Python':", last_position)  # 25

# Đếm số lần xuất hiện
occurrence_count = text_content.count("Python")
print("Số lần xuất hiện 'Python':", occurrence_count)  # 2

# Kiểm tra bắt đầu/kết thúc
starts_with_python = text_content.startswith("Python")
ends_with_great = text_content.endswith("tuyệt vời")
print("Bắt đầu với 'Python':", starts_with_python)  # True
print("Kết thúc với 'tuyệt vời':", ends_with_great)  # True

# Thay thế
new_text = text_content.replace("Python", "Java")
print("Sau khi thay thế:", new_text)
# Java là ngôn ngữ lập trình Java tuyệt vời
```

## 🎨 Định Dạng Chuỗi

### 📊 Format và F-strings

```python
# F-strings (Python 3.6+)
student_name = "An"
student_age = 16
student_score = 8.5

# F-string cơ bản
student_info = f"Tên: {student_name}, Tuổi: {student_age}, Điểm: {student_score}"
print("F-string:", student_info)

# F-string với định dạng
formatted_info = f"Tên: {student_name:>10}, Tuổi: {student_age:>3}, Điểm: {student_score:>5.1f}"
print("F-string định dạng:", formatted_info)

# Format method
format_info = "Tên: {}, Tuổi: {}, Điểm: {}".format(student_name, student_age, student_score)
print("Format method:", format_info)

# Format với chỉ số
indexed_format = "Tên: {0}, Tuổi: {1}, Điểm: {2:.1f}".format(student_name, student_age, student_score)
print("Format với chỉ số:", indexed_format)
```

### 🎯 Căn Chỉnh và Padding

```python
# Chuỗi mẫu
language_name = "Python"

# Căn giữa
centered_name = language_name.center(20, "-")
print("Căn giữa:", centered_name)  # -------Python-------

# Căn trái
left_justified = language_name.ljust(20, ".")
print("Căn trái:", left_justified)  # Python..............

# Căn phải
right_justified = language_name.rjust(20, ".")
print("Căn phải:", right_justified)  # ..............Python

# Padding với số
number_string = "42"
zero_padded = number_string.zfill(5)
print("Zero padding:", zero_padded)  # 00042
```

## 🧹 Làm Sạch Chuỗi

### 🗑️ Loại Bỏ Khoảng Trắng

```python
# Chuỗi có khoảng trắng thừa
raw_string = "   Python Programming   "

# Loại bỏ khoảng trắng đầu và cuối
cleaned_string = raw_string.strip()
print("Strip:", f"'{cleaned_string}'")  # 'Python Programming'

# Loại bỏ khoảng trắng bên trái
left_stripped = raw_string.lstrip()
print("Lstrip:", f"'{left_stripped}'")  # 'Python Programming   '

# Loại bỏ khoảng trắng bên phải
right_stripped = raw_string.rstrip()
print("Rstrip:", f"'{right_stripped}'")  # '   Python Programming'

# Loại bỏ ký tự cụ thể
asterisk_string = "***Python***"
character_stripped = asterisk_string.strip("*")
print("Strip ký tự:", character_stripped)  # Python
```

### 🔤 Kiểm Tra Loại Ký Tự

```python
# Chuỗi mẫu
number_string = "12345"
letter_string = "Python"
uppercase_string = "PYTHON"
lowercase_string = "python"
titlecase_string = "Python"

# Kiểm tra số
print("Chỉ chứa số:", number_string.isdigit())  # True
print("Chỉ chứa chữ:", letter_string.isalpha())  # True
print("Chỉ chứa chữ và số:", "Python123".isalnum())  # True

# Kiểm tra chữ hoa/thường
print("Tất cả chữ hoa:", uppercase_string.isupper())  # True
print("Tất cả chữ thường:", lowercase_string.islower())  # True
print("Chữ hoa đầu từ:", titlecase_string.istitle())  # True

# Kiểm tra khoảng trắng
print("Chỉ khoảng trắng:", "   ".isspace())  # True
print("Có thể in được:", "Hello World!".isprintable())  # True
```

## 🎪 Ví Dụ Thực Tế: Hệ Thống Xử Lý Văn Bản

```python
# 📝 Hệ thống xử lý văn bản với string methods
class TextProcessor:
    def __init__(self):
        self.original_text = ""
        self.processed_text = ""
    
    def input_text(self, text):
        """Nhập văn bản cần xử lý"""
        self.original_text = text
        self.processed_text = text
        print(f"✅ Đã nhập văn bản: {len(text)} ký tự")
    
    def clean_text(self):
        """Làm sạch văn bản"""
        # Loại bỏ khoảng trắng thừa
        self.processed_text = self.processed_text.strip()
        
        # Thay thế nhiều khoảng trắng bằng một
        import re
        self.processed_text = re.sub(r'\s+', ' ', self.processed_text)
        
        print("🧹 Đã làm sạch văn bản")
        return self.processed_text
    
    def normalize_names(self):
        """Chuẩn hóa tên riêng"""
        # Tách thành từng từ
        words = self.processed_text.split()
        
        # Chuẩn hóa từng từ
        normalized_words = []
        for word in words:
            # Chuyển thành chữ thường rồi title case
            normalized_words.append(word.lower().title())
        
        self.processed_text = " ".join(normalized_words)
        print("📝 Đã chuẩn hóa tên riêng")
        return self.processed_text
    
    def create_slug(self):
        """Tạo slug từ văn bản"""
        # Chuyển thành chữ thường
        slug = self.processed_text.lower()
        
        # Thay thế khoảng trắng bằng gạch ngang
        slug = slug.replace(" ", "-")
        
        # Loại bỏ ký tự đặc biệt (giữ lại chữ, số, gạch ngang)
        import re
        slug = re.sub(r'[^a-z0-9\-]', '', slug)
        
        # Loại bỏ nhiều gạch ngang liên tiếp
        slug = re.sub(r'-+', '-', slug)
        
        # Loại bỏ gạch ngang đầu và cuối
        slug = slug.strip('-')
        
        print("🔗 Đã tạo slug")
        return slug
    
    def count_words(self):
        """Đếm từ trong văn bản"""
        words = self.processed_text.split()
        word_count = len(words)
        
        print(f"📊 Số từ: {word_count}")
        return word_count
    
    def count_characters(self):
        """Đếm ký tự trong văn bản"""
        total_chars = len(self.processed_text)
        chars_no_spaces = len(self.processed_text.replace(" ", ""))
        
        print(f"📊 Tổng ký tự: {total_chars}")
        print(f"📊 Ký tự (không tính khoảng trắng): {chars_no_spaces}")
        
        return total_chars, chars_no_spaces
    
    def find_common_words(self, top_count=5):
        """Tìm từ phổ biến nhất"""
        # Tách từ và làm sạch
        words = self.processed_text.lower().split()
        clean_words = [word.strip(".,!?;:") for word in words]
        
        # Đếm tần suất
        word_frequency = {}
        for word in clean_words:
            if len(word) > 2:  # Bỏ qua từ quá ngắn
                word_frequency[word] = word_frequency.get(word, 0) + 1
        
        # Sắp xếp theo tần suất
        common_words = sorted(word_frequency.items(), key=lambda x: x[1], reverse=True)
        
        print(f"📈 {top_count} từ phổ biến nhất:")
        for i, (word, count) in enumerate(common_words[:top_count], 1):
            print(f"   {i}. '{word}': {count} lần")
        
        return common_words[:top_count]
    
    def create_summary(self, max_length=100):
        """Tạo tóm tắt văn bản"""
        if len(self.processed_text) <= max_length:
            summary = self.processed_text
        else:
            # Cắt tại từ gần nhất
            summary = self.processed_text[:max_length]
            last_space = summary.rfind(" ")
            if last_space > 0:
                summary = summary[:last_space]
            summary += "..."
        
        print(f"📄 Tóm tắt ({len(summary)} ký tự): {summary}")
        return summary
    
    def display_results(self):
        """Hiển thị kết quả xử lý"""
        print("\n📋 KẾT QUẢ XỬ LÝ VĂN BẢN")
        print("=" * 50)
        print(f"📝 Văn bản gốc: {self.original_text}")
        print(f"✨ Văn bản đã xử lý: {self.processed_text}")
        
        # Thống kê
        self.count_words()
        self.count_characters()
        
        # Slug
        slug = self.create_slug()
        print(f"🔗 Slug: {slug}")
        
        # Tóm tắt
        self.create_summary()
        
        # Từ phổ biến
        self.find_common_words()

# Sử dụng hệ thống
processor = TextProcessor()

# Văn bản mẫu
sample_text = "   Python là ngôn ngữ lập trình tuyệt vời. Python rất dễ học và mạnh mẽ.   "

# Xử lý văn bản
processor.input_text(sample_text)
processor.clean_text()
processor.normalize_names()
processor.display_results()
```

## 🎯 Bài Tập Thực Hành

### 🥇 Bài Tập 1: Hệ Thống Quản Lý Email

```python
# TODO: Tạo hệ thống quản lý email với string methods
class EmailManager:
    def __init__(self):
        self.email_list = []
    
    def add_email(self, email):
        """Thêm email mới"""
        if self.validate_email(email):
            normalized_email = self.normalize_email(email)
            if normalized_email not in self.email_list:
                self.email_list.append(normalized_email)
                print(f"✅ Đã thêm email: {normalized_email}")
            else:
                print(f"⚠️  Email đã tồn tại: {normalized_email}")
        else:
            print(f"❌ Email không hợp lệ: {email}")
    
    def validate_email(self, email):
        """Kiểm tra email có hợp lệ không"""
        email = email.strip().lower()
        
        # Kiểm tra cơ bản
        if "@" not in email:
            return False
        
        # Tách phần local và domain
        parts = email.split("@")
        if len(parts) != 2:
            return False
        
        local_part, domain_part = parts
        
        # Kiểm tra phần local
        if not local_part or len(local_part) > 64:
            return False
        
        # Kiểm tra phần domain
        if not domain_part or "." not in domain_part:
            return False
        
        # Kiểm tra ký tự hợp lệ
        if not local_part.replace(".", "").replace("_", "").replace("-", "").isalnum():
            return False
        
        return True
    
    def normalize_email(self, email):
        """Chuẩn hóa email"""
        # Loại bỏ khoảng trắng và chuyển thành chữ thường
        email = email.strip().lower()
        
        # Loại bỏ ký tự đặc biệt không cần thiết
        email = email.replace(" ", "")
        
        return email
    
    def extract_domain(self, email):
        """Lấy tên miền từ email"""
        if "@" in email:
            return email.split("@")[1]
        return None
    
    def filter_by_domain(self, domain_name):
        """Lọc email theo tên miền"""
        domain_emails = []
        for email in self.email_list:
            if self.extract_domain(email) == domain_name.lower():
                domain_emails.append(email)
        
        return domain_emails
    
    def generate_report(self):
        """Tạo báo cáo thống kê"""
        if not self.email_list:
            print("📊 Chưa có email nào")
            return
        
        print("\n📊 BÁO CÁO EMAIL")
        print("=" * 40)
        print(f"📧 Tổng số email: {len(self.email_list)}")
        
        # Thống kê theo tên miền
        domain_stats = {}
        for email in self.email_list:
            domain = self.extract_domain(email)
            if domain:
                domain_stats[domain] = domain_stats.get(domain, 0) + 1
        
        print(f"\n🌐 Thống kê theo tên miền:")
        for domain, count in sorted(domain_stats.items()):
            print(f"   {domain}: {count} email")
        
        # Email phổ biến nhất
        popular_domain = max(domain_stats.items(), key=lambda x: x[1])
        print(f"\n🏆 Tên miền phổ biến nhất: {popular_domain[0]} ({popular_domain[1]} email)")

# Sử dụng hệ thống
manager = EmailManager()

# Thêm email
email_samples = [
    "  user@example.com  ",
    "ADMIN@GMAIL.COM",
    "test.user@yahoo.com",
    "invalid-email",
    "another@example.com",
    "user123@gmail.com"
]

for email in email_samples:
    manager.add_email(email)

# Tạo báo cáo
manager.generate_report()

# Lọc email theo miền
gmail_emails = manager.filter_by_domain("gmail.com")
print(f"\n📧 Email Gmail: {gmail_emails}")
```

### 🥈 Bài Tập 2: Game Đoán Từ Với String Methods

```python
# TODO: Tạo game đoán từ với string methods
import random

class WordGuessGame:
    def __init__(self):
        self.word_bank = [
            "python", "programming", "computer", "algorithm", "function",
            "variable", "loop", "condition", "string", "number",
            "list", "dictionary", "class", "object", "method"
        ]
        self.target_word = ""
        self.guessed_words = []
        self.guessed_letters = set()
        self.attempt_count = 0
        self.max_attempts = 0
    
    def start_game(self):
        """Bắt đầu game mới"""
        self.target_word = random.choice(self.word_bank)
        self.guessed_words = []
        self.guessed_letters = set()
        self.attempt_count = 0
        self.max_attempts = len(self.target_word) + 3
        
        print(f"🎮 GAME ĐOÁN TỪ VỰNG LẬP TRÌNH")
        print("=" * 50)
        print(f"Từ có {len(self.target_word)} chữ cái")
        print(f"Bạn có {self.max_attempts} lần đoán")
        print("Gõ 'quit' để thoát, 'hint' để gợi ý")
        print("-" * 50)
    
    def display_hidden_word(self):
        """Hiển thị từ ẩn với ký tự đã đoán"""
        display = ""
        for letter in self.target_word:
            if letter in self.guessed_letters:
                display += letter
            else:
                display += "_"
        return display
    
    def process_word_guess(self, guess):
        """Xử lý đoán từ"""
        guess = guess.strip().lower()
        
        if guess == self.target_word:
            return "correct"
        elif guess in self.guessed_words:
            return "already_guessed"
        elif len(guess) != len(self.target_word):
            return "wrong_length"
        elif not guess.isalpha():
            return "invalid"
        else:
            self.guessed_words.append(guess)
            return "wrong"
    
    def process_letter_guess(self, letter):
        """Xử lý đoán ký tự"""
        letter = letter.strip().lower()
        
        if len(letter) != 1:
            return "invalid_length"
        elif not letter.isalpha():
            return "invalid_char"
        elif letter in self.guessed_letters:
            return "already_guessed"
        else:
            self.guessed_letters.add(letter)
            if letter in self.target_word:
                return "correct"
            else:
                return "wrong"
    
    def generate_hint(self):
        """Tạo gợi ý thông minh"""
        unguessed_letters = set(self.target_word) - self.guessed_letters
        
        if not unguessed_letters:
            return "Bạn đã đoán hết ký tự rồi!"
        
        # Chọn ký tự phổ biến nhất chưa đoán
        most_common_letter = max(unguessed_letters, key=lambda x: self.target_word.count(x))
        
        # Tạo gợi ý dựa trên vị trí
        position = self.target_word.find(most_common_letter)
        if position == 0:
            position_desc = "đầu"
        elif position == len(self.target_word) - 1:
            position_desc = "cuối"
        else:
            position_desc = f"vị trí {position + 1}"
        
        return f"💡 Gợi ý: Từ có chứa ký tự '{most_common_letter}' ở {position_desc}"
    
    def calculate_score(self):
        """Tính điểm dựa trên hiệu suất"""
        correct_letters = len(self.guessed_letters.intersection(set(self.target_word)))
        wrong_letters = len(self.guessed_letters - set(self.target_word))
        
        base_score = len(self.target_word) * 10
        bonus_score = correct_letters * 5
        penalty_wrong = wrong_letters * 2
        penalty_attempts = self.attempt_count * 1
        
        total_score = base_score + bonus_score - penalty_wrong - penalty_attempts
        return max(0, total_score)
    
    def play_game(self):
        """Chơi game chính"""
        self.start_game()
        
        while self.attempt_count < self.max_attempts:
            self.attempt_count += 1
            remaining = self.max_attempts - self.attempt_count + 1
            
            # Hiển thị trạng thái
            hidden_word = self.display_hidden_word()
            print(f"\n🔤 Lần thử {self.attempt_count}/{self.max_attempts} (Còn {remaining} lần)")
            print(f"Từ: {hidden_word}")
            
            # Hiển thị ký tự đã đoán
            if self.guessed_letters:
                letters_str = ", ".join(sorted(self.guessed_letters))
                print(f"Ký tự đã đoán: {letters_str}")
            
            # Hiển thị từ đã đoán
            if self.guessed_words:
                words_str = ", ".join(self.guessed_words)
                print(f"Từ đã đoán: {words_str}")
            
            # Nhập đoán
            try:
                user_guess = input("Nhập ký tự hoặc từ: ").strip()
                
                if user_guess.lower() == 'quit':
                    print("👋 Tạm biệt!")
                    return
                
                if user_guess.lower() == 'hint':
                    print(self.generate_hint())
                    self.attempt_count -= 1
                    continue
                
                # Xử lý đoán
                if len(user_guess) == 1:
                    # Đoán ký tự
                    result = self.process_letter_guess(user_guess)
                    
                    if result == "correct":
                        print("✅ Đúng! Ký tự có trong từ")
                        
                        # Kiểm tra đã đoán hết chưa
                        if set(self.target_word).issubset(self.guessed_letters):
                            score = self.calculate_score()
                            print(f"\n🎉 HOÀN THÀNH! Từ đúng là: {self.target_word}")
                            print(f"🏆 Điểm: {score}")
                            return
                    
                    elif result == "wrong":
                        print("❌ Sai! Ký tự không có trong từ")
                    
                    elif result == "already_guessed":
                        print("⚠️  Bạn đã đoán ký tự này rồi!")
                        self.attempt_count -= 1
                    
                    elif result == "invalid_length":
                        print("❌ Vui lòng nhập 1 ký tự!")
                        self.attempt_count -= 1
                    
                    elif result == "invalid_char":
                        print("❌ Vui lòng nhập ký tự hợp lệ!")
                        self.attempt_count -= 1
                
                else:
                    # Đoán từ
                    result = self.process_word_guess(user_guess)
                    
                    if result == "correct":
                        score = self.calculate_score()
                        print(f"\n🎉 CHÍNH XÁC! Từ đúng là: {self.target_word}")
                        print(f"🏆 Điểm: {score}")
                        return
                    
                    elif result == "wrong":
                        print("❌ Từ không đúng!")
                    
                    elif result == "already_guessed":
                        print("⚠️  Bạn đã đoán từ này rồi!")
                        self.attempt_count -= 1
                    
                    elif result == "wrong_length":
                        print(f"❌ Từ phải có {len(self.target_word)} chữ cái!")
                        self.attempt_count -= 1
                    
                    elif result == "invalid":
                        print("❌ Vui lòng nhập từ hợp lệ!")
                        self.attempt_count -= 1
            
            except KeyboardInterrupt:
                print("\n👋 Tạm biệt!")
                return
        
        # Hết lượt
        score = self.calculate_score()
        print(f"\n💔 HẾT LƯỢT! Từ đúng là: {self.target_word}")
        print(f"🏆 Điểm: {score}")

# Chạy game
game = WordGuessGame()
game.play_game()
```

## 🎊 Tóm Tắt

Trong bài này, bạn đã học được:

✅ **Biến đổi chữ hoa/thường** - `upper()`, `lower()`, `title()`, `capitalize()`  
✅ **Cắt và nối chuỗi** - `split()`, `join()`  
✅ **Tìm kiếm và thay thế** - `find()`, `count()`, `replace()`  
✅ **Định dạng chuỗi** - F-strings, `format()`, `center()`, `just()`  
✅ **Làm sạch chuỗi** - `strip()`, `lstrip()`, `rstrip()`  
✅ **Kiểm tra loại ký tự** - `isdigit()`, `isalpha()`, `isupper()`  
✅ **Ứng dụng thực tế** - Xử lý văn bản, quản lý email, game đoán từ  

## 🚀 Bước Tiếp Theo

Tuyệt vời! Bây giờ bạn đã thành thạo **xử lý văn bản nâng cao**! Tiếp theo, chúng ta sẽ học về [List Comprehension](/python/intermediate/list-comprehension) - cú pháp Pythonic siêu mạnh mẽ!

:::tip 🎯 Thử Thách Nhỏ
Hãy thử tạo một "hệ thống phân tích văn bản" sử dụng tất cả string methods! Phân tích độ dài, tần suất từ, sentiment, và tạo báo cáo chi tiết!
:::

---

*🔗 **Bài tiếp theo**: [List Comprehension - Cú Pháp Pythonic Siêu Mạnh](/python/intermediate/list-comprehension)*

