# 📁 Bài Tập về Thao Tác File trong Python

Chào mừng bạn đến với tập hợp các bài tập về thao tác file trong Python! Các bài tập này sẽ giúp bạn thực hành các kỹ năng đọc, ghi và xử lý file - một kỹ năng cực kỳ quan trọng trong lập trình thực tế.

## 🔰 Bài Tập Mức Cơ Bản

### Bài 1: Đọc và In Nội Dung File
**Yêu cầu:** Tạo một file văn bản có tên `sample.txt` với nội dung bất kỳ. Viết chương trình Python đọc và in ra nội dung của file đó.

<details>
<summary>Xem gợi ý</summary>

```python
# Tạo file mẫu (chỉ cần chạy 1 lần)
with open('sample.txt', 'w', encoding='utf-8') as f:
    f.write("Đây là file mẫu.\nPython rất thú vị!\nTôi đang học thao tác với file.")

# Đọc và in nội dung file
try:
    with open('sample.txt', 'r', encoding='utf-8') as file:
        content = file.read()
        print("Nội dung của file:")
        print(content)
except FileNotFoundError:
    print("Không tìm thấy file 'sample.txt'")
```
</details>

### Bài 2: Đếm Số Dòng, Từ và Ký Tự
**Yêu cầu:** Viết chương trình đếm số dòng, số từ và số ký tự trong một file văn bản.

<details>
<summary>Xem gợi ý</summary>

```python
def count_lines_words_chars(filename):
    """Đếm số dòng, từ và ký tự trong file."""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            # Đọc nội dung file
            content = file.read()
            
            # Đếm số ký tự
            char_count = len(content)
            
            # Đếm số dòng
            lines = content.split('\n')
            line_count = len(lines)
            
            # Đếm số từ
            word_count = 0
            for line in lines:
                words = line.split()
                word_count += len(words)
            
            return line_count, word_count, char_count
    except FileNotFoundError:
        print(f"Không tìm thấy file '{filename}'")
        return 0, 0, 0

# Sử dụng hàm
filename = 'sample.txt'
lines, words, chars = count_lines_words_chars(filename)
print(f"File '{filename}' có:")
print(f"- {lines} dòng")
print(f"- {words} từ")
print(f"- {chars} ký tự")
```
</details>

### Bài 3: Ghi Danh Sách vào File
**Yêu cầu:** Viết chương trình nhận danh sách tên từ người dùng và ghi chúng vào một file, mỗi tên trên một dòng.

<details>
<summary>Xem gợi ý</summary>

```python
def write_names_to_file(filename):
    """Ghi danh sách tên vào file."""
    names = []
    
    print("Nhập danh sách tên (nhập 'done' để kết thúc):")
    while True:
        name = input("> ")
        if name.lower() == 'done':
            break
        names.append(name)
    
    try:
        with open(filename, 'w', encoding='utf-8') as file:
            for name in names:
                file.write(name + '\n')
        print(f"Đã ghi {len(names)} tên vào file '{filename}'")
    except Exception as e:
        print(f"Có lỗi xảy ra: {e}")

# Sử dụng hàm
filename = 'names.txt'
write_names_to_file(filename)
```
</details>

## 🔄 Bài Tập Mức Trung Bình

### Bài 4: Tìm Kiếm Từ trong File
**Yêu cầu:** Viết chương trình tìm kiếm một từ khóa trong file văn bản và in ra các dòng chứa từ khóa đó cùng với số dòng tương ứng.

<details>
<summary>Xem gợi ý</summary>

```python
def search_keyword(filename, keyword):
    """Tìm kiếm từ khóa trong file và hiển thị các dòng chứa từ khóa."""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            lines = file.readlines()
            
            found = False
            for i, line in enumerate(lines, 1):  # Đánh số dòng từ 1
                if keyword.lower() in line.lower():
                    print(f"Dòng {i}: {line.strip()}")
                    found = True
            
            if not found:
                print(f"Không tìm thấy từ khóa '{keyword}' trong file")
    except FileNotFoundError:
        print(f"Không tìm thấy file '{filename}'")

# Sử dụng hàm
filename = 'sample.txt'
keyword = input("Nhập từ khóa cần tìm: ")
search_keyword(filename, keyword)
```
</details>

### Bài 5: Sao Chép File
**Yêu cầu:** Viết chương trình sao chép nội dung từ một file nguồn sang một file đích.

<details>
<summary>Xem gợi ý</summary>

```python
def copy_file(source_file, destination_file):
    """Sao chép nội dung từ file nguồn sang file đích."""
    try:
        # Đọc nội dung từ file nguồn
        with open(source_file, 'r', encoding='utf-8') as source:
            content = source.read()
        
        # Ghi nội dung vào file đích
        with open(destination_file, 'w', encoding='utf-8') as destination:
            destination.write(content)
        
        print(f"Đã sao chép nội dung từ '{source_file}' sang '{destination_file}'")
    except FileNotFoundError:
        print(f"Không tìm thấy file nguồn '{source_file}'")
    except Exception as e:
        print(f"Có lỗi xảy ra: {e}")

# Sử dụng hàm
source = 'sample.txt'
destination = 'sample_copy.txt'
copy_file(source, destination)
```
</details>

### Bài 6: Thống Kê Tần Suất Từ
**Yêu cầu:** Viết chương trình đọc một file văn bản và thống kê tần suất xuất hiện của mỗi từ trong file.

<details>
<summary>Xem gợi ý</summary>

```python
def word_frequency(filename):
    """Thống kê tần suất xuất hiện của mỗi từ trong file."""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            # Đọc nội dung và chuyển về chữ thường
            content = file.read().lower()
            
            # Loại bỏ các ký tự đặc biệt và thay thế bằng khoảng trắng
            for char in '.,;:!?"()[]{}':
                content = content.replace(char, ' ')
            
            # Tách thành danh sách các từ
            words = content.split()
            
            # Đếm tần suất
            word_count = {}
            for word in words:
                if word in word_count:
                    word_count[word] += 1
                else:
                    word_count[word] = 1
            
            # Sắp xếp theo tần suất giảm dần
            sorted_words = sorted(word_count.items(), key=lambda x: x[1], reverse=True)
            
            return sorted_words
    except FileNotFoundError:
        print(f"Không tìm thấy file '{filename}'")
        return []

# Sử dụng hàm
filename = 'sample.txt'
frequency = word_frequency(filename)

print(f"Tần suất xuất hiện của các từ trong file '{filename}':")
for word, count in frequency:
    print(f"'{word}': {count} lần")
```
</details>

## 🚀 Bài Tập Mức Nâng Cao

### Bài 7: Ghi Log File
**Yêu cầu:** Viết một chương trình ghi log hoạt động. Chương trình sẽ ghi thời gian hiện tại và một thông điệp tùy chọn vào file log mỗi khi được gọi.

<details>
<summary>Xem gợi ý</summary>

```python
import datetime

def log_activity(message, log_file="activity.log"):
    """Ghi log hoạt động với thời gian hiện tại."""
    try:
        # Lấy thời gian hiện tại
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Định dạng log entry
        log_entry = f"[{current_time}] {message}\n"
        
        # Ghi vào file log (chế độ append)
        with open(log_file, 'a', encoding='utf-8') as file:
            file.write(log_entry)
        
        print(f"Đã ghi log: {log_entry.strip()}")
    except Exception as e:
        print(f"Không thể ghi log: {e}")

# Sử dụng hàm
log_activity("Chương trình bắt đầu chạy")
# Giả lập một số hoạt động
log_activity("Người dùng đăng nhập: user123")
log_activity("Truy cập vào trang chủ")
log_activity("Tải file report.pdf")
log_activity("Người dùng đăng xuất")

print("\nNội dung file log:")
try:
    with open("activity.log", 'r', encoding='utf-8') as file:
        print(file.read())
except FileNotFoundError:
    print("Không tìm thấy file log")
```
</details>

### Bài 8: CSV Parser Đơn Giản
**Yêu cầu:** Viết chương trình đọc một file CSV và chuyển đổi nó thành danh sách các dictionary, với mỗi dictionary tương ứng với một dòng trong file CSV.

<details>
<summary>Xem gợi ý</summary>

```python
def parse_csv(filename, delimiter=','):
    """Phân tích file CSV thành danh sách các dictionary."""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            lines = file.readlines()
            
            if not lines:
                return []
            
            # Lấy tên các cột từ dòng đầu tiên
            headers = [header.strip() for header in lines[0].split(delimiter)]
            
            # Chuyển đổi mỗi dòng thành một dictionary
            result = []
            for i in range(1, len(lines)):
                values = [value.strip() for value in lines[i].split(delimiter)]
                if len(values) == len(headers):  # Kiểm tra số lượng giá trị phù hợp với số cột
                    row_dict = {}
                    for j in range(len(headers)):
                        row_dict[headers[j]] = values[j]
                    result.append(row_dict)
            
            return result
    except FileNotFoundError:
        print(f"Không tìm thấy file '{filename}'")
        return []

# Tạo file CSV mẫu (chỉ chạy một lần)
with open('data.csv', 'w', encoding='utf-8') as f:
    f.write("id,name,age,city\n")
    f.write("1,Alice,25,New York\n")
    f.write("2,Bob,30,San Francisco\n")
    f.write("3,Charlie,22,Chicago\n")
    f.write("4,David,35,Seattle\n")

# Sử dụng hàm
data = parse_csv('data.csv')
print("Dữ liệu từ file CSV:")
for row in data:
    print(row)
```
</details>

### Bài 9: Tạo File Cấu Hình
**Yêu cầu:** Viết chương trình tạo và đọc file cấu hình dạng INI đơn giản. Chương trình cần có khả năng:
1. Tạo file cấu hình với các phần (sections) và cặp key-value
2. Đọc và phân tích file cấu hình
3. Cập nhật giá trị trong file cấu hình

<details>
<summary>Xem gợi ý</summary>

```python
def create_config(filename, config_data):
    """Tạo file cấu hình từ dictionary."""
    try:
        with open(filename, 'w', encoding='utf-8') as file:
            for section, values in config_data.items():
                file.write(f"[{section}]\n")
                for key, value in values.items():
                    file.write(f"{key} = {value}\n")
                file.write("\n")  # Thêm dòng trống giữa các phần
        print(f"Đã tạo file cấu hình '{filename}'")
    except Exception as e:
        print(f"Lỗi khi tạo file cấu hình: {e}")

def read_config(filename):
    """Đọc và phân tích file cấu hình."""
    config = {}
    current_section = None
    
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            lines = file.readlines()
            
            for line in lines:
                line = line.strip()
                
                # Bỏ qua dòng trống và dòng comment
                if not line or line.startswith('#'):
                    continue
                
                # Kiểm tra phần (section)
                if line.startswith('[') and line.endswith(']'):
                    current_section = line[1:-1]  # Lấy tên section
                    if current_section not in config:
                        config[current_section] = {}
                # Kiểm tra cặp key-value
                elif '=' in line and current_section:
                    key, value = line.split('=', 1)
                    config[current_section][key.strip()] = value.strip()
            
            return config
    except FileNotFoundError:
        print(f"Không tìm thấy file '{filename}'")
        return {}

def update_config(filename, section, key, value):
    """Cập nhật giá trị trong file cấu hình."""
    # Đọc cấu hình hiện tại
    config = read_config(filename)
    
    # Cập nhật giá trị
    if section in config:
        config[section][key] = value
    else:
        config[section] = {key: value}
    
    # Ghi lại file cấu hình
    create_config(filename, config)
    print(f"Đã cập nhật '{key}' trong phần '{section}' thành '{value}'")

# Sử dụng các hàm
# 1. Tạo file cấu hình mới
config_data = {
    'Database': {
        'host': 'localhost',
        'port': '3306',
        'username': 'user',
        'password': 'pass123'
    },
    'Server': {
        'host': '0.0.0.0',
        'port': '8080',
        'debug': 'True'
    }
}

config_file = 'config.ini'
create_config(config_file, config_data)

# 2. Đọc file cấu hình
config = read_config(config_file)
print("\nCấu hình đã đọc:")
for section, values in config.items():
    print(f"[{section}]")
    for key, value in values.items():
        print(f"{key} = {value}")
    print()

# 3. Cập nhật một giá trị
update_config(config_file, 'Database', 'password', 'new_secure_password')
update_config(config_file, 'Server', 'debug', 'False')
update_config(config_file, 'Logging', 'level', 'INFO')  # Thêm phần mới

# Đọc lại để kiểm tra
config = read_config(config_file)
print("\nCấu hình sau khi cập nhật:")
for section, values in config.items():
    print(f"[{section}]")
    for key, value in values.items():
        print(f"{key} = {value}")
    print()
```
</details>

## 💪 Bài Tập Thử Thách

### Bài 10: Trình Soạn Thảo Văn Bản Đơn Giản
**Yêu cầu:** Viết một chương trình soạn thảo văn bản đơn giản trong terminal, cho phép người dùng:
1. Tạo mới hoặc mở một file
2. Thêm/sửa nội dung
3. Lưu file
4. Thoát khỏi chương trình

<details>
<summary>Xem gợi ý</summary>

```python
def simple_text_editor():
    """Trình soạn thảo văn bản đơn giản trong terminal."""
    filename = None
    content = []
    saved = True
    
    def display_menu():
        """Hiển thị menu chức năng."""
        print("\n=== TRÌNH SOẠN THẢO VĂN BẢN ĐƠN GIẢN ===")
        print(f"File hiện tại: {filename or 'Không có'}")
        print("1. Tạo file mới")
        print("2. Mở file")
        print("3. Hiển thị nội dung")
        print("4. Thêm dòng mới")
        print("5. Sửa dòng")
        print("6. Xóa dòng")
        print("7. Lưu file")
        print("8. Lưu file với tên khác")
        print("9. Thoát")
        print("==========================================")
    
    def create_new_file():
        nonlocal filename, content, saved
        if not saved:
            choice = input("Nội dung chưa được lưu. Bạn có muốn lưu không? (y/n): ")
            if choice.lower() == 'y':
                save_file()
        
        filename = input("Nhập tên file mới: ")
        content = []
        saved = True
        print(f"Đã tạo file mới: {filename}")
    
    def open_file():
        nonlocal filename, content, saved
        if not saved:
            choice = input("Nội dung chưa được lưu. Bạn có muốn lưu không? (y/n): ")
            if choice.lower() == 'y':
                save_file()
        
        file_to_open = input("Nhập tên file cần mở: ")
        try:
            with open(file_to_open, 'r', encoding='utf-8') as file:
                content = file.read().splitlines()
            filename = file_to_open
            saved = True
            print(f"Đã mở file: {filename}")
        except FileNotFoundError:
            print(f"Không tìm thấy file '{file_to_open}'")
        except Exception as e:
            print(f"Lỗi khi mở file: {e}")
    
    def display_content():
        if not content:
            print("File trống hoặc chưa có file nào được mở.")
        else:
            print("\n=== NỘI DUNG FILE ===")
            for i, line in enumerate(content, 1):
                print(f"{i}: {line}")
            print("=====================")
    
    def add_line():
        nonlocal saved
        print("Nhập nội dung (nhập dòng trống để kết thúc):")
        while True:
            line = input()
            if not line:
                break
            content.append(line)
            saved = False
        print("Đã thêm nội dung vào file.")
    
    def edit_line():
        nonlocal saved
        display_content()
        if not content:
            return
        
        try:
            line_number = int(input("Nhập số dòng cần sửa: "))
            if 1 <= line_number <= len(content):
                print(f"Nội dung hiện tại: {content[line_number - 1]}")
                new_content = input("Nhập nội dung mới: ")
                content[line_number - 1] = new_content
                saved = False
                print(f"Đã sửa dòng {line_number}.")
            else:
                print("Số dòng không hợp lệ.")
        except ValueError:
            print("Vui lòng nhập một số nguyên.")
    
    def delete_line():
        nonlocal saved
        display_content()
        if not content:
            return
        
        try:
            line_number = int(input("Nhập số dòng cần xóa: "))
            if 1 <= line_number <= len(content):
                deleted_line = content.pop(line_number - 1)
                saved = False
                print(f"Đã xóa dòng {line_number}: {deleted_line}")
            else:
                print("Số dòng không hợp lệ.")
        except ValueError:
            print("Vui lòng nhập một số nguyên.")
    
    def save_file():
        nonlocal saved
        if not filename:
            save_as()
            return
        
        try:
            with open(filename, 'w', encoding='utf-8') as file:
                for line in content:
                    file.write(line + '\n')
            saved = True
            print(f"Đã lưu nội dung vào file '{filename}'")
        except Exception as e:
            print(f"Lỗi khi lưu file: {e}")
    
    def save_as():
        nonlocal filename, saved
        new_filename = input("Nhập tên file để lưu: ")
        if new_filename:
            filename = new_filename
            save_file()
    
    def exit_editor():
        if not saved:
            choice = input("Nội dung chưa được lưu. Bạn có muốn lưu không? (y/n): ")
            if choice.lower() == 'y':
                save_file()
        print("Tạm biệt!")
        return True
    
    # Vòng lặp chính của chương trình
    while True:
        display_menu()
        choice = input("Nhập lựa chọn của bạn: ")
        
        if choice == '1':
            create_new_file()
        elif choice == '2':
            open_file()
        elif choice == '3':
            display_content()
        elif choice == '4':
            add_line()
        elif choice == '5':
            edit_line()
        elif choice == '6':
            delete_line()
        elif choice == '7':
            save_file()
        elif choice == '8':
            save_as()
        elif choice == '9':
            if exit_editor():
                break
        else:
            print("Lựa chọn không hợp lệ. Vui lòng thử lại.")

# Chạy trình soạn thảo văn bản
if __name__ == "__main__":
    simple_text_editor()
```
</details>

### Bài 11: Phân Tích File Log
**Yêu cầu:** Viết chương trình phân tích file log server (định dạng tùy chọn) và tạo báo cáo với các thông tin:
- Số lượng yêu cầu mỗi giờ
- Các URL được truy cập nhiều nhất
- Mã lỗi (status code) phổ biến nhất
- Danh sách các địa chỉ IP đã truy cập

<details>
<summary>Xem gợi ý</summary>

```python
import re
from datetime import datetime
from collections import Counter

# Tạo file log mẫu (chỉ chạy một lần)
log_sample = """
192.168.1.1 - - [29/Sep/2023:10:15:32 +0700] "GET /index.html HTTP/1.1" 200 1234
192.168.1.2 - - [29/Sep/2023:10:18:45 +0700] "POST /login HTTP/1.1" 302 0
192.168.1.3 - - [29/Sep/2023:10:22:11 +0700] "GET /dashboard HTTP/1.1" 200 5678
192.168.1.1 - - [29/Sep/2023:10:25:40 +0700] "GET /images/logo.png HTTP/1.1" 200 4567
192.168.1.4 - - [29/Sep/2023:10:30:15 +0700] "GET /contact HTTP/1.1" 404 1023
192.168.1.5 - - [29/Sep/2023:11:05:22 +0700] "GET /products HTTP/1.1" 200 8901
192.168.1.2 - - [29/Sep/2023:11:15:42 +0700] "GET /api/data HTTP/1.1" 403 789
192.168.1.6 - - [29/Sep/2023:11:25:18 +0700] "POST /checkout HTTP/1.1" 500 246
192.168.1.1 - - [29/Sep/2023:11:35:51 +0700] "GET /about HTTP/1.1" 200 2345
192.168.1.3 - - [29/Sep/2023:12:05:33 +0700] "GET /services HTTP/1.1" 200 5432
192.168.1.7 - - [29/Sep/2023:12:10:45 +0700] "GET /blog HTTP/1.1" 200 7654
192.168.1.4 - - [29/Sep/2023:12:15:22 +0700] "GET /faq HTTP/1.1" 404 876
192.168.1.2 - - [29/Sep/2023:12:25:13 +0700] "POST /subscribe HTTP/1.1" 201 123
192.168.1.8 - - [29/Sep/2023:13:05:42 +0700] "GET /support HTTP/1.1" 200 4321
192.168.1.1 - - [29/Sep/2023:13:15:18 +0700] "GET /news HTTP/1.1" 304 0
"""

with open('server.log', 'w', encoding='utf-8') as f:
    f.write(log_sample)

def parse_log_file(filename):
    """Phân tích file log server."""
    # Biểu thức chính quy để phân tích log
    log_pattern = r'(\d+\.\d+\.\d+\.\d+).*\[(\d+/\w+/\d+):(\d+):(\d+):(\d+).*\] "(\w+) ([^"]*) HTTP.*" (\d+) (\d+)'
    
    # Cấu trúc dữ liệu để lưu thông tin phân tích
    hourly_requests = {}
    url_counts = Counter()
    status_codes = Counter()
    ip_addresses = set()
    
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            for line in file:
                match = re.search(log_pattern, line)
                if match:
                    ip = match.group(1)
                    date = match.group(2)
                    hour = match.group(3)
                    method = match.group(6)
                    url = match.group(7)
                    status = match.group(8)
                    size = match.group(9)
                    
                    # Lưu thông tin
                    ip_addresses.add(ip)
                    
                    # Đếm theo giờ
                    hour_key = f"{date} {hour}:00"
                    if hour_key in hourly_requests:
                        hourly_requests[hour_key] += 1
                    else:
                        hourly_requests[hour_key] = 1
                    
                    # Đếm URL
                    url_counts[url] += 1
                    
                    # Đếm status code
                    status_codes[status] += 1
        
        return {
            'hourly_requests': hourly_requests,
            'url_counts': url_counts,
            'status_codes': status_codes,
            'ip_addresses': ip_addresses
        }
    except FileNotFoundError:
        print(f"Không tìm thấy file '{filename}'")
        return None
    except Exception as e:
        print(f"Lỗi khi phân tích log: {e}")
        return None

def generate_log_report(log_data, output_filename='log_report.txt'):
    """Tạo báo cáo từ dữ liệu log đã phân tích."""
    if not log_data:
        print("Không có dữ liệu để tạo báo cáo.")
        return
    
    try:
        with open(output_filename, 'w', encoding='utf-8') as report_file:
            # Tiêu đề báo cáo
            report_file.write("=== BÁO CÁO PHÂN TÍCH FILE LOG SERVER ===\n\n")
            report_file.write(f"Thời gian tạo báo cáo: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            
            # Phần 1: Số lượng yêu cầu mỗi giờ
            report_file.write("1. SỐ LƯỢNG YÊU CẦU MỖI GIỜ\n")
            report_file.write("--------------------------\n")
            for hour, count in sorted(log_data['hourly_requests'].items()):
                report_file.write(f"{hour}: {count} yêu cầu\n")
            
            # Phần 2: URL được truy cập nhiều nhất
            report_file.write("\n2. URL ĐƯỢC TRUY CẬP NHIỀU NHẤT\n")
            report_file.write("------------------------------\n")
            for url, count in log_data['url_counts'].most_common(10):  # Top 10 URLs
                report_file.write(f"{url}: {count} lần\n")
            
            # Phần 3: Status code phổ biến nhất
            report_file.write("\n3. MÃ TRẠNG THÁI (STATUS CODE) PHỔ BIẾN\n")
            report_file.write("--------------------------------------\n")
            for code, count in log_data['status_codes'].most_common():
                status_message = {
                    '200': 'OK',
                    '201': 'Created',
                    '301': 'Moved Permanently',
                    '302': 'Found/Redirect',
                    '304': 'Not Modified',
                    '400': 'Bad Request',
                    '401': 'Unauthorized',
                    '403': 'Forbidden',
                    '404': 'Not Found',
                    '500': 'Internal Server Error'
                }.get(code, 'Unknown')
                report_file.write(f"{code} ({status_message}): {count} lần\n")
            
            # Phần 4: Danh sách IP đã truy cập
            report_file.write("\n4. DANH SÁCH ĐỊA CHỈ IP ĐÃ TRUY CẬP\n")
            report_file.write("-----------------------------------\n")
            for ip in sorted(log_data['ip_addresses']):
                report_file.write(f"{ip}\n")
            
            # Thống kê tổng hợp
            total_requests = sum(log_data['hourly_requests'].values())
            unique_urls = len(log_data['url_counts'])
            unique_ips = len(log_data['ip_addresses'])
            
            report_file.write("\n=== THỐNG KÊ TỔNG HỢP ===\n")
            report_file.write(f"Tổng số yêu cầu: {total_requests}\n")
            report_file.write(f"Số URL duy nhất: {unique_urls}\n")
            report_file.write(f"Số địa chỉ IP duy nhất: {unique_ips}\n")
        
        print(f"Đã tạo báo cáo tại '{output_filename}'")
    except Exception as e:
        print(f"Lỗi khi tạo báo cáo: {e}")

# Sử dụng các hàm
log_filename = 'server.log'
log_data = parse_log_file(log_filename)
if log_data:
    generate_log_report(log_data)
    
    # In một số thông tin tổng quan ra màn hình
    print("\nTHÔNG TIN TỔNG QUAN:")
    print(f"Tổng số yêu cầu: {sum(log_data['hourly_requests'].values())}")
    print("Top 3 URL được truy cập nhiều nhất:")
    for url, count in log_data['url_counts'].most_common(3):
        print(f"- {url}: {count} lần")
    print("Phân bố mã trạng thái:")
    for code, count in log_data['status_codes'].items():
        print(f"- {code}: {count} lần")
```
</details>

### Bài 12: Đồng Bộ Hóa Hai Thư Mục
**Yêu cầu:** Viết chương trình so sánh và đồng bộ hóa nội dung của hai thư mục, đảm bảo thư mục đích chứa tất cả các file mới nhất từ thư mục nguồn.

<details>
<summary>Xem gợi ý</summary>

```python
import os
import shutil
import time
import datetime

def sync_directories(source_dir, target_dir, simulate=True):
    """
    Đồng bộ hóa hai thư mục, đảm bảo thư mục đích chứa tất cả các file mới nhất từ thư mục nguồn.
    
    Args:
        source_dir: Đường dẫn đến thư mục nguồn
        target_dir: Đường dẫn đến thư mục đích
        simulate: Nếu True, chỉ mô phỏng các thay đổi mà không thực hiện
    """
    if not os.path.exists(source_dir):
        print(f"Thư mục nguồn '{source_dir}' không tồn tại.")
        return
    
    # Tạo thư mục đích nếu chưa tồn tại
    if not os.path.exists(target_dir):
        if not simulate:
            os.makedirs(target_dir)
        print(f"Đã tạo thư mục đích '{target_dir}'")
    
    # Các biến thống kê
    stats = {
        'new_files': 0,
        'updated_files': 0,
        'deleted_files': 0,
        'unchanged_files': 0
    }
    
    # Danh sách các file trong thư mục nguồn
    source_files = {}
    for root, _, files in os.walk(source_dir):
        for file in files:
            source_path = os.path.join(root, file)
            # Tính đường dẫn tương đối để dùng trong thư mục đích
            rel_path = os.path.relpath(source_path, source_dir)
            source_files[rel_path] = os.path.getmtime(source_path)
    
    # Danh sách các file trong thư mục đích
    target_files = {}
    for root, _, files in os.walk(target_dir):
        for file in files:
            target_path = os.path.join(root, file)
            # Tính đường dẫn tương đối để so sánh với thư mục nguồn
            rel_path = os.path.relpath(target_path, target_dir)
            target_files[rel_path] = os.path.getmtime(target_path)
    
    # Xử lý từng file trong thư mục nguồn
    for rel_path, source_mtime in source_files.items():
        target_path = os.path.join(target_dir, rel_path)
        source_path = os.path.join(source_dir, rel_path)
        
        # Tạo thư mục cha nếu cần
        target_dir_path = os.path.dirname(target_path)
        if not os.path.exists(target_dir_path) and not simulate:
            os.makedirs(target_dir_path, exist_ok=True)
        
        if rel_path in target_files:
            target_mtime = target_files[rel_path]
            # So sánh thời gian sửa đổi (với độ lệch nhỏ để tránh vấn đề về độ chính xác)
            if source_mtime > target_mtime + 0.1:  # Thêm 0.1 giây để xử lý sai số
                # File nguồn mới hơn, cần cập nhật
                print(f"Cập nhật: {rel_path}")
                print(f"  - Thời gian nguồn: {datetime.datetime.fromtimestamp(source_mtime)}")
                print(f"  - Thời gian đích: {datetime.datetime.fromtimestamp(target_mtime)}")
                if not simulate:
                    shutil.copy2(source_path, target_path)
                stats['updated_files'] += 1
            else:
                # File giống nhau, không cần thay đổi
                print(f"Không thay đổi: {rel_path}")
                stats['unchanged_files'] += 1
        else:
            # File mới, chưa có trong thư mục đích
            print(f"Mới: {rel_path}")
            if not simulate:
                shutil.copy2(source_path, target_path)
            stats['new_files'] += 1
    
    # Xóa các file trong thư mục đích nhưng không có trong nguồn (nếu được yêu cầu)
    delete_extra_files = input("Bạn có muốn xóa các file trong thư mục đích mà không có trong thư mục nguồn? (y/n): ")
    if delete_extra_files.lower() == 'y':
        for rel_path in target_files:
            if rel_path not in source_files:
                target_path = os.path.join(target_dir, rel_path)
                print(f"Xóa: {rel_path}")
                if not simulate:
                    os.remove(target_path)
                stats['deleted_files'] += 1
    
    # Hiển thị thống kê
    print("\n=== THỐNG KÊ ĐỒNG BỘ HÓA ===")
    print(f"Thư mục nguồn: {source_dir}")
    print(f"Thư mục đích: {target_dir}")
    print(f"Chế độ: {'Mô phỏng' if simulate else 'Thực thi'}")
    print(f"File mới: {stats['new_files']}")
    print(f"File cập nhật: {stats['updated_files']}")
    print(f"File không thay đổi: {stats['unchanged_files']}")
    print(f"File xóa: {stats['deleted_files']}")
    
    return stats

# Sử dụng chương trình
if __name__ == "__main__":
    print("CHƯƠNG TRÌNH ĐỒNG BỘ HÓA THƯ MỤC")
    print("=================================")
    
    # Nhập thư mục nguồn và đích
    source = input("Nhập đường dẫn thư mục nguồn: ")
    target = input("Nhập đường dẫn thư mục đích: ")
    
    # Kiểm tra chế độ mô phỏng
    simulate_mode = input("Bạn có muốn chạy ở chế độ mô phỏng? (y/n, mặc định: y): ")
    simulate = simulate_mode.lower() != 'n'
    
    # Thực hiện đồng bộ hóa
    sync_directories(source, target, simulate)
```
</details>

## 🎯 Thực Hành Thêm

Hãy thử thực hiện các bài tập sau đây để nâng cao kỹ năng xử lý file của bạn:

1. Viết chương trình đếm số từ trong một file text dựa trên tần suất xuất hiện
2. Viết chương trình tách một file lớn thành nhiều file nhỏ hơn với kích thước cho trước
3. Tạo một chương trình ghi dữ liệu từ API thời tiết vào file CSV định kỳ (sử dụng thư viện requests)
4. Viết chương trình quản lý thư viện đơn giản, lưu thông tin sách trong file JSON
5. Tạo một công cụ tìm kiếm văn bản trong nhiều file và thư mục (giống grep)

---

Chúc bạn học tập hiệu quả! Kỹ năng làm việc với file là một trong những kỹ năng thiết thực nhất khi lập trình với Python. Các chương trình thực tế thường xuyên phải đọc, ghi và xử lý file, vì vậy hãy thực hành nhiều để trở nên thành thạo nhé!
