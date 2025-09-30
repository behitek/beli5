# 📦 Module Thông Dụng Python - Common Modules

> **Tóm tắt**: Tổng hợp các module quan trọng và thường được sử dụng nhất trong Python, từ cơ bản đến nâng cao với ví dụ thực tế.

## 🎯 Module Là Gì?

Hãy tưởng tượng Python như một chiếc smartphone 📱. Khi mua máy, bạn có sẵn một số app cơ bản, nhưng muốn làm gì đó đặc biệt thì cần tải thêm app từ App Store.

Module trong Python cũng vậy! Python có sẵn một số module cơ bản (standard library), và bạn có thể cài thêm module từ PyPI (như App Store của Python).

---

## 🏗️ 1. MODULE HỆ THỐNG & TỆP TIN

### `os` - Tương tác với hệ điều hành
```python
import os

# Thông tin hệ thống (System information)
print(f"Hệ điều hành: {os.name}")        # nt (Windows), posix (Unix/Linux/Mac)
print(f"Thư mục hiện tại: {os.getcwd()}")  # Current working directory

# Làm việc với thư mục (Working with directories)
os.mkdir("new_folder")                    # Tạo thư mục mới
os.makedirs("path/to/nested/folder")      # Tạo thư mục nested
os.chdir("new_folder")                    # Chuyển đổi thư mục
os.rmdir("empty_folder")                  # Xóa thư mục rỗng

# Liệt kê files và folders
files = os.listdir(".")                   # List files trong thư mục hiện tại
print("Files:", files)

# Kiểm tra tồn tại (Check existence)
if os.path.exists("myfile.txt"):
    print("File tồn tại!")

# Thông tin file (File information)
file_size = os.path.getsize("myfile.txt")
file_modified = os.path.getmtime("myfile.txt")

# Biến môi trường (Environment variables)
home_dir = os.environ.get("HOME", "Unknown")  # Lấy biến môi trường
os.environ["MY_VAR"] = "Hello"                # Set biến môi trường
```

### `os.path` - Xử lý đường dẫn
```python
import os.path

# Xử lý đường dẫn (Path manipulation)
file_path = "/home/user/documents/file.txt"
print(f"Thư mục: {os.path.dirname(file_path)}")   # /home/user/documents
print(f"Tên file: {os.path.basename(file_path)}")  # file.txt
print(f"Phần mở rộng: {os.path.splitext(file_path)[1]}")  # .txt

# Ghép đường dẫn (Join paths) - Tự động xử lý / hoặc \
full_path = os.path.join("home", "user", "documents", "file.txt")
print(full_path)  # home/user/documents/file.txt (Linux/Mac)
                  # home\user\documents\file.txt (Windows)

# Kiểm tra loại (Check type)
print(os.path.isfile("myfile.txt"))     # True nếu là file
print(os.path.isdir("myfolder"))        # True nếu là thư mục
print(os.path.isabs("/absolute/path"))  # True nếu là absolute path

# Ứng dụng: backup files
def backup_important_files(source_dir, backup_dir):
    """Sao lưu tất cả file .txt trong thư mục"""
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)
    
    for filename in os.listdir(source_dir):
        if filename.endswith('.txt'):
            source_path = os.path.join(source_dir, filename)
            backup_path = os.path.join(backup_dir, filename)
            # Copy file logic here...
            print(f"Backed up: {filename}")
```

### `pathlib` - Cách hiện đại xử lý đường dẫn (Python 3.4+)
```python
from pathlib import Path

# Tạo Path object
current_dir = Path(".")
home_dir = Path.home()
documents = home_dir / "Documents"  # Ghép path bằng /

# Thông tin file
file_path = Path("example.txt")
print(f"Tên file: {file_path.name}")        # example.txt
print(f"Phần mở rộng: {file_path.suffix}")  # .txt
print(f"Thư mục cha: {file_path.parent}")   # .

# Kiểm tra và tạo
if not file_path.exists():
    file_path.touch()  # Tạo file rỗng

# Đọc/ghi file
file_path.write_text("Hello World", encoding="utf-8")
content = file_path.read_text(encoding="utf-8")

# Tìm files với pattern
txt_files = list(Path(".").glob("*.txt"))     # Tất cả file .txt
py_files = list(Path(".").rglob("*.py"))      # Tất cả file .py (recursive)
```

### `shutil` - Sao chép, di chuyển files/folders
```python
import shutil

# Sao chép files (Copy files)
shutil.copy("source.txt", "destination.txt")           # Copy file
shutil.copy2("source.txt", "dest_with_metadata.txt")   # Copy với metadata
shutil.copytree("source_folder", "destination_folder") # Copy cả thư mục

# Di chuyển (Move)
shutil.move("old_location.txt", "new_location.txt")

# Xóa thư mục và nội dung (Remove directory and contents)
shutil.rmtree("folder_to_delete")

# Nén và giải nén (Archive)
shutil.make_archive("backup", "zip", "folder_to_compress")
shutil.unpack_archive("backup.zip", "extracted_folder")

# Ứng dụng: organize downloads folder
def organize_downloads():
    """Sắp xếp file downloads theo extension"""
    downloads = Path.home() / "Downloads"
    
    for file_path in downloads.iterdir():
        if file_path.is_file():
            extension = file_path.suffix.lower()
            if extension:
                # Tạo thư mục theo extension
                target_dir = downloads / extension[1:]  # Bỏ dấu .
                target_dir.mkdir(exist_ok=True)
                
                # Di chuyển file
                shutil.move(str(file_path), str(target_dir / file_path.name))
                print(f"Moved {file_path.name} to {extension[1:]} folder")
```

---

## ⏰ 2. MODULE THỜI GIAN

### `datetime` - Làm việc với ngày tháng
```python
from datetime import datetime, date, time, timedelta

# Ngày giờ hiện tại (Current datetime)
now = datetime.now()
today = date.today()
print(f"Bây giờ: {now}")
print(f"Hôm nay: {today}")

# Tạo datetime cụ thể (Create specific datetime)
birthday = datetime(1995, 5, 15, 14, 30)  # 15/5/1995 14:30
print(f"Sinh nhật: {birthday}")

# Định dạng thời gian (Format datetime)
formatted = now.strftime("%d/%m/%Y %H:%M:%S")
print(f"Định dạng VN: {formatted}")

# Parse string thành datetime
date_string = "2024-12-25 18:30:00"
christmas = datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")

# Tính toán thời gian (Time calculations)
tomorrow = today + timedelta(days=1)
last_week = today - timedelta(weeks=1)
two_hours_later = now + timedelta(hours=2)

# So sánh thời gian (Compare datetime)
if christmas > now:
    days_until = (christmas.date() - today).days
    print(f"Còn {days_until} ngày nữa là Giáng sinh!")

# Ứng dụng: age calculator
def calculate_age(birth_date):
    """Tính tuổi từ ngày sinh"""
    today = date.today()
    age = today.year - birth_date.year
    
    # Kiểm tra đã qua sinh nhật chưa
    if today.month < birth_date.month or \
       (today.month == birth_date.month and today.day < birth_date.day):
        age -= 1
    
    return age

my_birthday = date(1995, 5, 15)
my_age = calculate_age(my_birthday)
print(f"Tôi {my_age} tuổi")
```

### `time` - Đo thời gian và sleep
```python
import time

# Thời gian hiện tại (timestamp)
current_timestamp = time.time()  # Seconds since epoch (1/1/1970)
print(f"Timestamp: {current_timestamp}")

# Sleep - tạm dừng chương trình
print("Bắt đầu...")
time.sleep(2)  # Dừng 2 giây
print("Kết thúc!")

# Đo thời gian thực thi (Measure execution time)
start_time = time.time()

# Code cần đo thời gian
result = sum(range(1000000))

end_time = time.time()
execution_time = end_time - start_time
print(f"Thời gian thực thi: {execution_time:.4f} giây")

# Performance counter (chính xác hơn)
start = time.perf_counter()
# Some code...
end = time.perf_counter()
print(f"Thời gian chính xác: {end - start:.6f} giây")

# Ứng dụng: simple timer
def simple_timer(seconds):
    """Đếm ngược thời gian"""
    for i in range(seconds, 0, -1):
        print(f"Còn {i} giây...", end="\r")
        time.sleep(1)
    print("Hết giờ!           ")  # Spaces để xóa "Còn X giây..."
```

---

## 🎲 3. MODULE NGẪU NHIÊN & TOÁN HỌC

### `random` - Tạo số ngẫu nhiên
```python
import random

# Số ngẫu nhiên cơ bản (Basic random numbers)
print(random.random())        # Float từ 0.0 đến 1.0
print(random.randint(1, 10))  # Integer từ 1 đến 10
print(random.uniform(1.5, 10.5))  # Float từ 1.5 đến 10.5

# Chọn từ list (Choose from list)
colors = ["đỏ", "xanh", "vàng", "tím", "cam"]
print(random.choice(colors))     # Chọn 1 màu ngẫu nhiên
print(random.choices(colors, k=3))  # Chọn 3 màu (có thể trùng)
print(random.sample(colors, k=2))   # Chọn 2 màu (không trùng)

# Xáo trộn list (Shuffle list)
numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)  # Thay đổi numbers trực tiếp
print(numbers)  # Thứ tự đã bị xáo trộn

# Set seed để có kết quả reproducible
random.seed(42)
print(random.randint(1, 100))  # Luôn là 82
random.seed(42)
print(random.randint(1, 100))  # Vẫn là 82

# Ứng dụng: tạo mật khẩu ngẫu nhiên
def generate_password(length=8):
    """Tạo mật khẩu ngẫu nhiên"""
    import string
    
    characters = string.ascii_letters + string.digits + "!@#$%^&*"
    password = ''.join(random.choices(characters, k=length))
    return password

print(f"Mật khẩu: {generate_password(12)}")

# Game: đoán số
def guessing_game():
    """Game đoán số từ 1-100"""
    secret_number = random.randint(1, 100)
    attempts = 0
    
    print("Tôi đã nghĩ ra một số từ 1-100. Hãy đoán xem!")
    
    while True:
        guess = int(input("Số bạn đoán: "))
        attempts += 1
        
        if guess == secret_number:
            print(f"Chính xác! Bạn đoán đúng sau {attempts} lần thử.")
            break
        elif guess < secret_number:
            print("Số bạn đoán nhỏ hơn.")
        else:
            print("Số bạn đoán lớn hơn.")
```

### `math` - Hàm toán học
```python
import math

# Hằng số toán học (Mathematical constants)
print(f"Pi: {math.pi}")        # 3.141592653589793
print(f"E: {math.e}")          # 2.718281828459045

# Hàm lũy thừa và căn (Power and root functions)
print(math.sqrt(16))           # 4.0 (căn bậc 2)
print(math.pow(2, 3))          # 8.0 (2^3)
print(math.exp(1))             # 2.718... (e^1)
print(math.log(10))            # 2.302... (ln(10))
print(math.log10(100))         # 2.0 (log base 10)

# Hàm lượng giác (Trigonometric functions)
angle_degrees = 45
angle_radians = math.radians(angle_degrees)  # Chuyển độ sang radian
print(f"sin(45°): {math.sin(angle_radians):.3f}")  # 0.707
print(f"cos(45°): {math.cos(angle_radians):.3f}")  # 0.707

# Làm tròn (Rounding)
print(math.ceil(3.2))    # 4 (làm tròn lên)
print(math.floor(3.8))   # 3 (làm tròn xuống)
print(math.trunc(3.8))   # 3 (cắt phần thập phân)

# Hàm khác (Other functions)
print(math.factorial(5))      # 120 (5!)
print(math.gcd(48, 18))       # 6 (ước chung lớn nhất)
print(math.fabs(-5))          # 5.0 (giá trị tuyệt đối float)

# Ứng dụng: tính khoảng cách giữa 2 điểm
def distance(x1, y1, x2, y2):
    """Tính khoảng cách Euclidean giữa 2 điểm"""
    return math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

print(f"Khoảng cách: {distance(0, 0, 3, 4)}")  # 5.0

# Tính diện tích hình tròn
def circle_area(radius):
    """Tính diện tích hình tròn"""
    return math.pi * radius ** 2

print(f"Diện tích hình tròn bán kính 5: {circle_area(5):.2f}")
```

---

## 🌐 4. MODULE MẠNG & WEB

### `requests` - HTTP requests (Cần cài đặt: pip install requests)
```python
import requests

# GET request cơ bản (Basic GET request)
response = requests.get("https://api.github.com/users/octocat")
print(f"Status code: {response.status_code}")  # 200 = OK

# Xử lý JSON response
if response.status_code == 200:
    data = response.json()
    print(f"Tên: {data['name']}")
    print(f"Công ty: {data['company']}")
    print(f"Followers: {data['followers']}")

# POST request với data
post_data = {
    "title": "Test Post",
    "body": "This is a test",
    "userId": 1
}
post_response = requests.post(
    "https://jsonplaceholder.typicode.com/posts",
    json=post_data
)
print(f"POST response: {post_response.json()}")

# Headers và authentication
headers = {
    "User-Agent": "My Python App 1.0",
    "Authorization": "Bearer your_token_here"
}
auth_response = requests.get("https://api.example.com/data", headers=headers)

# Download file
def download_file(url, filename):
    """Download file từ URL"""
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Downloaded: {filename}")
    else:
        print(f"Failed to download: {response.status_code}")

# Ứng dụng: weather app
def get_weather(city):
    """Lấy thông tin thời tiết (cần API key)"""
    api_key = "your_api_key"
    url = f"http://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": api_key,
        "units": "metric",
        "lang": "vi"
    }
    
    try:
        response = requests.get(url, params=params, timeout=5)
        if response.status_code == 200:
            data = response.json()
            temp = data['main']['temp']
            description = data['weather'][0]['description']
            return f"{city}: {temp}°C, {description}"
        else:
            return f"Không thể lấy thông tin thời tiết cho {city}"
    except requests.exceptions.RequestException as e:
        return f"Lỗi kết nối: {e}"
```

### `urllib` - Built-in HTTP client
```python
import urllib.request
import urllib.parse
from urllib.error import URLError, HTTPError

# GET request đơn giản
try:
    with urllib.request.urlopen("https://httpbin.org/json") as response:
        data = response.read().decode('utf-8')
        print(data)
except HTTPError as e:
    print(f"HTTP Error: {e.code}")
except URLError as e:
    print(f"URL Error: {e.reason}")

# POST request với data
post_data = urllib.parse.urlencode({'key': 'value'}).encode('utf-8')
req = urllib.request.Request("https://httpbin.org/post", data=post_data)
with urllib.request.urlopen(req) as response:
    result = response.read().decode('utf-8')

# Parse URL
parsed_url = urllib.parse.urlparse("https://example.com/path?param=value")
print(f"Domain: {parsed_url.netloc}")
print(f"Path: {parsed_url.path}")
print(f"Query: {parsed_url.query}")
```

---

## 📄 5. MODULE XỬ LÝ DỮ LIỆU

### `json` - Làm việc với JSON
```python
import json

# Python object to JSON string
data = {
    "name": "Hieu",
    "age": 25,
    "hobbies": ["đọc sách", "lập trình", "du lịch"],
    "is_student": True,
    "address": None
}

# Serialize to JSON string
json_string = json.dumps(data, ensure_ascii=False, indent=2)
print(json_string)

# JSON string to Python object
parsed_data = json.loads(json_string)
print(f"Tên: {parsed_data['name']}")

# Làm việc với file JSON
# Ghi JSON file
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Đọc JSON file
with open("data.json", "r", encoding="utf-8") as f:
    loaded_data = json.load(f)
    print(loaded_data)

# Xử lý lỗi JSON
invalid_json = '{"name": "Hieu", "age": 25,}'  # Dấu phẩy thừa
try:
    result = json.loads(invalid_json)
except json.JSONDecodeError as e:
    print(f"JSON Error: {e}")

# Ứng dụng: config file management
class ConfigManager:
    def __init__(self, config_file):
        self.config_file = config_file
        self.config = self.load_config()
    
    def load_config(self):
        """Load config từ file JSON"""
        try:
            with open(self.config_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            return self.default_config()
    
    def save_config(self):
        """Lưu config vào file JSON"""
        with open(self.config_file, 'w', encoding='utf-8') as f:
            json.dump(self.config, f, ensure_ascii=False, indent=2)
    
    def default_config(self):
        return {
            "theme": "dark",
            "language": "vi",
            "auto_save": True
        }
    
    def get(self, key, default=None):
        return self.config.get(key, default)
    
    def set(self, key, value):
        self.config[key] = value
        self.save_config()
```

### `csv` - Làm việc với file CSV
```python
import csv

# Đọc CSV file
with open("students.csv", "r", encoding="utf-8") as file:
    csv_reader = csv.reader(file)
    header = next(csv_reader)  # Đọc header
    print(f"Columns: {header}")
    
    for row in csv_reader:
        print(f"Student: {row[0]}, Grade: {row[1]}")

# Đọc CSV thành dictionary
with open("students.csv", "r", encoding="utf-8") as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        print(f"Name: {row['name']}, Grade: {row['grade']}")

# Ghi CSV file
students = [
    ["Tên", "Tuổi", "Điểm"],
    ["An", 20, 85],
    ["Bình", 21, 92],
    ["Chi", 19, 78]
]

with open("output.csv", "w", newline="", encoding="utf-8") as file:
    csv_writer = csv.writer(file)
    csv_writer.writerows(students)

# Ghi CSV từ dictionary
fieldnames = ["name", "age", "grade"]
students_dict = [
    {"name": "An", "age": 20, "grade": 85},
    {"name": "Bình", "age": 21, "grade": 92}
]

with open("output_dict.csv", "w", newline="", encoding="utf-8") as file:
    csv_writer = csv.DictWriter(file, fieldnames=fieldnames)
    csv_writer.writeheader()
    csv_writer.writerows(students_dict)

# Ứng dụng: phân tích dữ liệu học sinh
def analyze_student_grades(csv_file):
    """Phân tích điểm số học sinh từ file CSV"""
    grades = []
    
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            grade = float(row['grade'])
            grades.append(grade)
    
    # Tính toán thống kê
    total_students = len(grades)
    average_grade = sum(grades) / total_students
    highest_grade = max(grades)
    lowest_grade = min(grades)
    
    # Phân loại
    excellent = len([g for g in grades if g >= 90])
    good = len([g for g in grades if 80 <= g < 90])
    fair = len([g for g in grades if 70 <= g < 80])
    poor = len([g for g in grades if g < 70])
    
    print(f"Tổng số học sinh: {total_students}")
    print(f"Điểm trung bình: {average_grade:.2f}")
    print(f"Điểm cao nhất: {highest_grade}")
    print(f"Điểm thấp nhất: {lowest_grade}")
    print(f"Xuất sắc (>=90): {excellent} học sinh")
    print(f"Giỏi (80-89): {good} học sinh")
    print(f"Khá (70-79): {fair} học sinh")
    print(f"Yếu (<70): {poor} học sinh")
```

---

## 🔤 6. MODULE CHUỖI & PATTERN

### `re` - Regular Expressions
```python
import re

# Tìm kiếm pattern cơ bản (Basic pattern matching)
text = "Số điện thoại của tôi là 0123456789 và email là hieu@example.com"

# Tìm số điện thoại
phone_pattern = r'\d{10}'
phone_match = re.search(phone_pattern, text)
if phone_match:
    print(f"Số điện thoại: {phone_match.group()}")  # 0123456789

# Tìm email
email_pattern = r'\w+@\w+\.\w+'
email_match = re.search(email_pattern, text)
if email_match:
    print(f"Email: {email_match.group()}")  # hieu@example.com

# Tìm tất cả matches
all_numbers = re.findall(r'\d+', text)
print(f"Tất cả số: {all_numbers}")  # ['0123456789']

# Thay thế (Replace)
censored = re.sub(r'\d{10}', 'XXX-XXX-XXXX', text)
print(f"Đã che số: {censored}")

# Tách chuỗi (Split)
data = "apple,banana;orange:grape"
fruits = re.split(r'[,;:]', data)
print(f"Fruits: {fruits}")  # ['apple', 'banana', 'orange', 'grape']

# Groups - nhóm các phần
date_text = "Hôm nay là 25/12/2024"
date_pattern = r'(\d{2})/(\d{2})/(\d{4})'
date_match = re.search(date_pattern, date_text)
if date_match:
    day, month, year = date_match.groups()
    print(f"Ngày: {day}, Tháng: {month}, Năm: {year}")

# Named groups
date_pattern_named = r'(?P<day>\d{2})/(?P<month>\d{2})/(?P<year>\d{4})'
date_match_named = re.search(date_pattern_named, date_text)
if date_match_named:
    print(f"Ngày: {date_match_named.group('day')}")

# Compile pattern để tái sử dụng
email_regex = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
text_with_emails = "Liên hệ: admin@site.com hoặc support@company.org"
emails = email_regex.findall(text_with_emails)
print(f"Emails tìm thấy: {emails}")

# Ứng dụng: validate input
def validate_inputs(data):
    """Validate các loại input thường gặp"""
    validators = {
        'phone': r'^0\d{9}$',                    # Số điện thoại VN
        'email': r'^[\w\.-]+@[\w\.-]+\.\w+$',    # Email
        'id_card': r'^\d{9}$|^\d{12}$',          # CMND/CCCD
        'postal_code': r'^\d{5}$|^\d{6}$',       # Mã bưu chính
    }
    
    results = {}
    for field, pattern in validators.items():
        if field in data:
            results[field] = bool(re.match(pattern, data[field]))
    
    return results

# Test validation
user_data = {
    'phone': '0123456789',
    'email': 'user@example.com',
    'id_card': '123456789'
}
validation_results = validate_inputs(user_data)
print(f"Validation results: {validation_results}")
```

### `string` - String constants và utilities
```python
import string

# Constants - hằng số chuỗi hữu ích
print(f"Chữ cái: {string.ascii_letters}")      # abcdefg...ABCDEFG...
print(f"Chữ thường: {string.ascii_lowercase}") # abcdefghijk...
print(f"Chữ hoa: {string.ascii_uppercase}")    # ABCDEFGHIJK...
print(f"Số: {string.digits}")                  # 0123456789
print(f"Dấu câu: {string.punctuation}")        # !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~

# Template strings
template = string.Template("Xin chào $name, bạn có $count tin nhắn mới.")
message = template.substitute(name="Hieu", count=5)
print(message)  # Xin chào Hieu, bạn có 5 tin nhắn mới.

# Safe substitute (không raise lỗi nếu thiếu variable)
incomplete_message = template.safe_substitute(name="Bình")
print(incomplete_message)  # Xin chào Bình, bạn có $count tin nhắn mới.

# Ứng dụng: tạo mật khẩu mạnh
def generate_strong_password(length=12):
    """Tạo mật khẩu mạnh với đủ loại ký tự"""
    import random
    
    # Đảm bảo có ít nhất 1 ký tự mỗi loại
    password = [
        random.choice(string.ascii_uppercase),  # 1 chữ hoa
        random.choice(string.ascii_lowercase),  # 1 chữ thường
        random.choice(string.digits),           # 1 số
        random.choice(string.punctuation)       # 1 ký tự đặc biệt
    ]
    
    # Thêm các ký tự ngẫu nhiên để đủ độ dài
    all_chars = string.ascii_letters + string.digits + string.punctuation
    for _ in range(length - 4):
        password.append(random.choice(all_chars))
    
    # Xáo trộn để không có pattern cố định
    random.shuffle(password)
    return ''.join(password)

print(f"Mật khẩu mạnh: {generate_strong_password()}")
```

---

## 🎨 7. MODULE TIỆN ÍCH

### `itertools` - Iterator utilities
```python
import itertools

# count() - đếm vô hạn
counter = itertools.count(start=1, step=2)  # 1, 3, 5, 7, 9, ...
first_5_odds = [next(counter) for _ in range(5)]
print(f"5 số lẻ đầu: {first_5_odds}")  # [1, 3, 5, 7, 9]

# cycle() - lặp lại vô hạn
colors = itertools.cycle(['red', 'green', 'blue'])
first_10_colors = [next(colors) for _ in range(10)]
print(f"10 màu đầu: {first_10_colors}")  # red, green, blue, red, green, ...

# repeat() - lặp lại một giá trị
repeated = list(itertools.repeat('hello', 3))
print(f"Repeat: {repeated}")  # ['hello', 'hello', 'hello']

# chain() - nối các iterable
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list3 = [7, 8, 9]
chained = list(itertools.chain(list1, list2, list3))
print(f"Chained: {chained}")  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# combinations() - tổ hợp
people = ['An', 'Bình', 'Chi', 'Dung']
pairs = list(itertools.combinations(people, 2))
print(f"Các cặp: {pairs}")  # ('An', 'Bình'), ('An', 'Chi'), ...

# permutations() - hoán vị
perms = list(itertools.permutations(['A', 'B', 'C'], 2))
print(f"Hoán vị: {perms}")  # ('A', 'B'), ('A', 'C'), ('B', 'A'), ...

# product() - tích Descartes
suits = ['♠', '♥', '♦', '♣']
ranks = ['A', 'K', 'Q', 'J']
cards = list(itertools.product(suits, ranks))
print(f"Một số lá bài: {cards[:4]}")  # [('♠', 'A'), ('♠', 'K'), ...]

# groupby() - nhóm các phần tử liền kề giống nhau
data = [1, 1, 2, 2, 2, 3, 1, 1]
groups = [(key, list(group)) for key, group in itertools.groupby(data)]
print(f"Groups: {groups}")  # [(1, [1, 1]), (2, [2, 2, 2]), (3, [3]), (1, [1, 1])]

# Ứng dụng: tạo lịch làm việc
def create_work_schedule(employees, days):
    """Tạo lịch làm việc xoay vòng cho nhân viên"""
    schedule = {}
    employee_cycle = itertools.cycle(employees)
    
    for day in days:
        schedule[day] = next(employee_cycle)
    
    return schedule

employees = ['An', 'Bình', 'Chi']
week_days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6']
schedule = create_work_schedule(employees, week_days)
for day, employee in schedule.items():
    print(f"{day}: {employee}")
```

### `collections` - Specialized container datatypes
```python
from collections import Counter, defaultdict, namedtuple, deque

# Counter - đếm phần tử
text = "hello world"
char_count = Counter(text)
print(f"Đếm ký tự: {char_count}")  # Counter({'l': 3, 'o': 2, 'h': 1, ...})

# Các phương thức hữu ích của Counter
print(f"Ký tự phổ biến nhất: {char_count.most_common(3)}")  # [('l', 3), ('o', 2), ...]
print(f"Tổng số ký tự: {sum(char_count.values())}")

# defaultdict - dict với giá trị mặc định
dd = defaultdict(list)  # Giá trị mặc định là list rỗng
dd['fruits'].append('apple')
dd['fruits'].append('banana')
dd['vegetables'].append('carrot')
print(f"defaultdict: {dict(dd)}")  # {'fruits': ['apple', 'banana'], 'vegetables': ['carrot']}

# namedtuple - tuple có tên cho các field
Student = namedtuple('Student', ['name', 'age', 'grade'])
student1 = Student('An', 20, 85)
print(f"Tên: {student1.name}, Tuổi: {student1.age}, Điểm: {student1.grade}")

# Có thể access như tuple bình thường
print(f"Phần tử đầu: {student1[0]}")  # An

# deque - double-ended queue (hiệu quả cho thêm/xóa ở 2 đầu)
dq = deque([1, 2, 3])
dq.appendleft(0)    # Thêm vào đầu: [0, 1, 2, 3]
dq.append(4)        # Thêm vào cuối: [0, 1, 2, 3, 4]
print(f"deque: {dq}")

first = dq.popleft()  # Lấy từ đầu: 0
last = dq.pop()       # Lấy từ cuối: 4
print(f"Còn lại: {dq}")  # [1, 2, 3]

# Ứng dụng: log analyzer
def analyze_log_file(log_lines):
    """Phân tích file log"""
    # Đếm các loại log
    log_levels = Counter()
    
    # Nhóm theo IP
    ip_requests = defaultdict(list)
    
    # Log entry structure
    LogEntry = namedtuple('LogEntry', ['timestamp', 'ip', 'method', 'url', 'status'])
    
    for line in log_lines:
        # Parse log line (simplified)
        parts = line.split()
        if len(parts) >= 5:
            entry = LogEntry(parts[0], parts[1], parts[2], parts[3], parts[4])
            
            # Đếm status codes
            log_levels[entry.status] += 1
            
            # Nhóm theo IP
            ip_requests[entry.ip].append(entry.url)
    
    print("Status codes:")
    for status, count in log_levels.most_common():
        print(f"  {status}: {count}")
    
    print("\nTop requesting IPs:")
    for ip, requests in sorted(ip_requests.items(), key=lambda x: len(x[1]), reverse=True)[:5]:
        print(f"  {ip}: {len(requests)} requests")

# Test với dữ liệu mẫu
sample_logs = [
    "2024-01-01 192.168.1.1 GET /home 200",
    "2024-01-01 192.168.1.2 POST /login 200",
    "2024-01-01 192.168.1.1 GET /dashboard 200",
    "2024-01-01 192.168.1.3 GET /nonexistent 404",
]
analyze_log_file(sample_logs)
```

---

## 🔧 8. MODULE HỆ THỐNG & DEBUG

### `sys` - System-specific parameters
```python
import sys

# Thông tin Python interpreter
print(f"Python version: {sys.version}")
print(f"Python path: {sys.executable}")
print(f"Platform: {sys.platform}")

# Command line arguments
print(f"Script name: {sys.argv[0]}")
if len(sys.argv) > 1:
    print(f"Arguments: {sys.argv[1:]}")

# Module search paths
print("Python paths:")
for path in sys.path[:3]:  # Chỉ in 3 đường dẫn đầu
    print(f"  {path}")

# Memory usage của objects
import sys
numbers = [1, 2, 3, 4, 5]
print(f"Size of list: {sys.getsizeof(numbers)} bytes")

# Exit program
def check_python_version():
    if sys.version_info < (3, 6):
        print("Yêu cầu Python 3.6 hoặc cao hơn!")
        sys.exit(1)  # Thoát với error code
    print("Python version OK!")

check_python_version()

# Redirect stdout (useful for logging)
original_stdout = sys.stdout
with open('output.log', 'w') as f:
    sys.stdout = f
    print("Dòng này sẽ được ghi vào file")
sys.stdout = original_stdout  # Restore stdout
```

### `logging` - Professional logging
```python
import logging

# Cấu hình logging cơ bản
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log', encoding='utf-8'),
        logging.StreamHandler()  # Console output
    ]
)

logger = logging.getLogger(__name__)

# Các mức độ logging
logger.debug("Thông tin debug - chỉ hiện khi debug")
logger.info("Thông tin chung")
logger.warning("Cảnh báo - có thể có vấn đề")
logger.error("Lỗi - nhưng chương trình vẫn chạy")
logger.critical("Lỗi nghiêm trọng - chương trình có thể dừng")

# Logging với exception
try:
    result = 10 / 0
except ZeroDivisionError:
    logger.exception("Lỗi chia cho 0")  # Tự động log stack trace

# Custom formatter
class ColoredFormatter(logging.Formatter):
    """Formatter có màu sắc cho console"""
    
    COLORS = {
        'DEBUG': '\033[36m',    # Cyan
        'INFO': '\033[32m',     # Green
        'WARNING': '\033[33m',  # Yellow
        'ERROR': '\033[31m',    # Red
        'CRITICAL': '\033[35m', # Magenta
    }
    RESET = '\033[0m'
    
    def format(self, record):
        log_color = self.COLORS.get(record.levelname, self.RESET)
        record.levelname = f"{log_color}{record.levelname}{self.RESET}"
        return super().format(record)

# Ứng dụng: system monitor
def system_monitor():
    """Monitor hệ thống với logging"""
    import psutil  # Cần cài: pip install psutil
    
    logger = logging.getLogger('SystemMonitor')
    
    # CPU usage
    cpu_percent = psutil.cpu_percent(interval=1)
    if cpu_percent > 80:
        logger.warning(f"CPU sử dụng cao: {cpu_percent}%")
    else:
        logger.info(f"CPU usage: {cpu_percent}%")
    
    # Memory usage
    memory = psutil.virtual_memory()
    memory_percent = memory.percent
    if memory_percent > 85:
        logger.error(f"RAM sử dụng quá cao: {memory_percent}%")
    else:
        logger.info(f"RAM usage: {memory_percent}%")
    
    # Disk usage
    disk = psutil.disk_usage('/')
    disk_percent = (disk.used / disk.total) * 100
    if disk_percent > 90:
        logger.critical(f"Disk sắp đầy: {disk_percent:.1f}%")
    else:
        logger.info(f"Disk usage: {disk_percent:.1f}%")

# Uncomment để test (cần cài psutil)
# system_monitor()
```

---

## 🎯 9. MODULE CHUYÊN BIỆT

### `sqlite3` - Database operations
```python
import sqlite3
from datetime import datetime

# Kết nối database (tạo file nếu chưa có)
conn = sqlite3.connect('students.db')
cursor = conn.cursor()

# Tạo bảng
cursor.execute('''
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        grade REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

# Thêm dữ liệu
students_data = [
    ('Nguyễn Văn An', 20, 85.5),
    ('Trần Thị Bình', 19, 92.0),
    ('Lê Văn Chi', 21, 78.5)
]

cursor.executemany('INSERT INTO students (name, age, grade) VALUES (?, ?, ?)', students_data)

# Truy vấn dữ liệu
cursor.execute('SELECT * FROM students WHERE grade >= ?', (80,))
high_grade_students = cursor.fetchall()

print("Học sinh điểm cao:")
for student in high_grade_students:
    print(f"ID: {student[0]}, Tên: {student[1]}, Tuổi: {student[2]}, Điểm: {student[3]}")

# Update dữ liệu
cursor.execute('UPDATE students SET grade = ? WHERE name = ?', (88.0, 'Lê Văn Chi'))

# Xóa dữ liệu
cursor.execute('DELETE FROM students WHERE grade < ?', (70,))

# Commit và đóng kết nối
conn.commit()
conn.close()

# Ứng dụng: Student Management System
class StudentDB:
    def __init__(self, db_file):
        self.db_file = db_file
        self.init_db()
    
    def init_db(self):
        """Khởi tạo database"""
        with sqlite3.connect(self.db_file) as conn:
            conn.execute('''
                CREATE TABLE IF NOT EXISTS students (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE,
                    age INTEGER,
                    grade REAL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
    
    def add_student(self, name, email, age, grade):
        """Thêm học sinh mới"""
        try:
            with sqlite3.connect(self.db_file) as conn:
                conn.execute(
                    'INSERT INTO students (name, email, age, grade) VALUES (?, ?, ?, ?)',
                    (name, email, age, grade)
                )
            return True
        except sqlite3.IntegrityError:
            print(f"Email {email} đã tồn tại!")
            return False
    
    def get_students(self, min_grade=None):
        """Lấy danh sách học sinh"""
        with sqlite3.connect(self.db_file) as conn:
            if min_grade:
                cursor = conn.execute(
                    'SELECT * FROM students WHERE grade >= ? ORDER BY grade DESC',
                    (min_grade,)
                )
            else:
                cursor = conn.execute('SELECT * FROM students ORDER BY name')
            return cursor.fetchall()
    
    def update_grade(self, student_id, new_grade):
        """Cập nhật điểm"""
        with sqlite3.connect(self.db_file) as conn:
            conn.execute(
                'UPDATE students SET grade = ? WHERE id = ?',
                (new_grade, student_id)
            )
    
    def get_statistics(self):
        """Thống kê"""
        with sqlite3.connect(self.db_file) as conn:
            cursor = conn.execute('''
                SELECT 
                    COUNT(*) as total,
                    AVG(grade) as avg_grade,
                    MAX(grade) as max_grade,
                    MIN(grade) as min_grade
                FROM students
            ''')
            return cursor.fetchone()

# Sử dụng
# db = StudentDB('school.db')
# db.add_student('Nguyễn Văn A', 'a@email.com', 20, 85)
# students = db.get_students(min_grade=80)
# stats = db.get_statistics()
```

### `pickle` - Object serialization
```python
import pickle

# Serialize Python objects
data = {
    'name': 'Hieu',
    'scores': [85, 90, 78, 92],
    'metadata': {
        'created': '2024-01-01',
        'version': 1.0
    }
}

# Lưu object vào file
with open('data.pickle', 'wb') as f:
    pickle.dump(data, f)

# Đọc object từ file
with open('data.pickle', 'rb') as f:
    loaded_data = pickle.load(f)
    print(f"Loaded data: {loaded_data}")

# Serialize thành bytes
data_bytes = pickle.dumps(data)
print(f"Serialized size: {len(data_bytes)} bytes")

# Deserialize từ bytes
restored_data = pickle.loads(data_bytes)

# Serialize custom objects
class Student:
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades
        self.average = sum(grades) / len(grades)
    
    def __repr__(self):
        return f"Student(name='{self.name}', average={self.average:.2f})"

# Serialize custom object
student = Student("An", [85, 90, 78, 92])
with open('student.pickle', 'wb') as f:
    pickle.dump(student, f)

# Load custom object
with open('student.pickle', 'rb') as f:
    loaded_student = pickle.load(f)
    print(f"Loaded student: {loaded_student}")

# ⚠️ Cảnh báo: Pickle không an toàn với untrusted data!
# Không pickle data từ nguồn không tin cậy
```

---

## 🎨 10. TIPS & BEST PRACTICES

### Module import best practices
```python
# ❌ Tránh import *
# from math import *  # Không nên

# ✅ Import cụ thể những gì cần
from math import sqrt, pi, sin, cos

# ✅ Import với alias để tránh conflict
import numpy as np
import pandas as pd

# ✅ Import modules trong function nếu chỉ dùng ở đó
def process_data():
    import pandas as pd  # Chỉ import khi cần
    # ...

# ✅ Nhóm imports theo thứ tự
# 1. Standard library
import os
import sys
from datetime import datetime

# 2. Third-party packages
import requests
import numpy as np

# 3. Local imports
from my_module import my_function
```

### Error handling with modules
```python
# Xử lý lỗi khi import optional modules
try:
    import matplotlib.pyplot as plt
    HAS_MATPLOTLIB = True
except ImportError:
    HAS_MATPLOTLIB = False
    print("matplotlib not available, plotting disabled")

def plot_data(data):
    if not HAS_MATPLOTLIB:
        print("Cannot plot: matplotlib not installed")
        return
    
    plt.plot(data)
    plt.show()

# Graceful degradation
def get_system_info():
    info = {}
    
    # Basic info (always available)
    import platform
    info['platform'] = platform.system()
    
    # Advanced info (optional)
    try:
        import psutil
        info['cpu_count'] = psutil.cpu_count()
        info['memory'] = psutil.virtual_memory().total
    except ImportError:
        info['cpu_count'] = 'Unknown'
        info['memory'] = 'Unknown'
    
    return info
```

### Performance tips
```python
# Cache expensive imports
import functools

@functools.lru_cache(maxsize=None)
def get_heavy_module():
    """Cache expensive module imports"""
    import tensorflow  # Heavy import
    return tensorflow

# Lazy imports in functions
def process_images(image_paths):
    # Import chỉ khi function được gọi
    from PIL import Image
    
    for path in image_paths:
        img = Image.open(path)
        # Process image...

# Use __all__ để control public API
__all__ = ['important_function', 'ImportantClass']

def important_function():
    pass

def _private_function():  # Không export
    pass

class ImportantClass:
    pass
```

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [📋 Python Cheatsheet](./python-cheatsheet.md) - Bảng tra cứu nhanh
- [🔧 Hàm có sẵn](./built-in-functions.md) - Chi tiết về built-in functions
- [⚡ Tối ưu hiệu suất](./performance-tips.md) - Mẹo tăng tốc code
- [🐛 Thông báo lỗi](./error-messages.md) - Hiểu các lỗi thường gặp

---

## 🎯 Tóm Tắt

Các module quan trọng được chia thành các nhóm chính:

### 🏗️ **Hệ thống & File**
- `os`, `os.path` - Tương tác hệ điều hành
- `pathlib` - Xử lý đường dẫn modern
- `shutil` - Copy, move files/folders

### ⏰ **Thời gian**
- `datetime` - Ngày tháng năm
- `time` - Đo thời gian, sleep

### 🎲 **Toán học & Random**
- `math` - Hàm toán học
- `random` - Số ngẫu nhiên

### 🌐 **Mạng & Web**
- `requests` - HTTP requests (third-party)
- `urllib` - HTTP client built-in

### 📄 **Dữ liệu**
- `json` - Làm việc với JSON
- `csv` - File CSV
- `sqlite3` - Database SQLite
- `pickle` - Serialize objects

### 🔤 **Text & Pattern**
- `re` - Regular expressions
- `string` - String constants

### 🎨 **Utilities**
- `itertools` - Iterator tools
- `collections` - Specialized containers
- `sys` - System parameters
- `logging` - Professional logging

**Mẹo quan trọng**:
- Luôn đọc documentation trước khi dùng module mới
- Sử dụng virtual environment cho projects
- Import chỉ những gì cần thiết
- Xử lý lỗi khi module không có sẵn
- Cache expensive imports khi cần

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: Thực hành với từng module để nắm vững cách sử dụng!*
