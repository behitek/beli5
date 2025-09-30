# Bài Tập Về Vòng Lặp (Loops)

## Giới Thiệu

Vòng lặp trong Python như một máy làm việc tự động - nó lặp đi lặp lại một công việc cho đến khi hoàn thành. Có hai loại vòng lặp chính: `for` (biết trước số lần) và `while` (lặp đến khi điều kiện sai).

## Bài Tập 1: Vòng Lặp For Cơ Bản

**Đề bài:** Làm quen với vòng lặp for

```python
# Giải pháp
print("=== VÒNG LẶP FOR CƠ BẢN ===")

# 1. Lặp với range()
print("1. Đếm từ 1 đến 5:")
for i in range(1, 6):
    print(f"Số {i}")

print("\n2. Bảng cửu chương 7:")
for i in range(1, 11):
    result = 7 * i
    print(f"7 x {i} = {result}")

print("\n3. Đếm ngược từ 10 về 0:")
for i in range(10, -1, -1):
    if i == 0:
        print("🚀 Phóng tên lửa!")
    else:
        print(f"Đếm ngược: {i}")

# 4. Lặp qua danh sách
print("\n4. Các môn học yêu thích:")
subjects = ["Toán", "Lý", "Hóa", "Sinh", "Văn"]
for i, subject in enumerate(subjects, 1):
    print(f"Môn {i}: {subject}")

# 5. Lặp qua chuỗi
print("\n5. Phân tích từ 'PYTHON':")
word = "PYTHON"
for i, character in enumerate(word):
    print(f"Vị trí {i}: '{character}'")

# 6. Lặp qua dictionary
print("\n6. Thông tin học sinh:")
student = {
    "tên": "Nguyễn Văn An",
    "tuổi": 16,
    "lớp": "10A1",
    "điểm_tb": 8.5
}

for key, value in student.items():
    print(f"{key.replace('_', ' ').title()}: {value}")
```

## Bài Tập 2: Vòng Lặp While

**Đề bài:** Sử dụng vòng lặp while hiệu quả

```python
# Giải pháp
print("=== VÒNG LẶP WHILE ===")

# 1. Đoán số đơn giản
import random

print("1. Trò chơi đoán số:")
secret_number = random.randint(1, 10)
attempt_count = 0
is_correct = False

while not is_correct and attempt_count < 3:
    try:
        user_guess = int(input(f"Đoán số từ 1-10 (lần {attempt_count + 1}/3): "))
        attempt_count += 1
        
        if user_guess == secret_number:
            print(f"🎉 Chúc mừng! Bạn đoán đúng số {secret_number}")
            is_correct = True
        elif user_guess < secret_number:
            print("📈 Số cần tìm lớn hơn!")
        else:
            print("📉 Số cần tìm nhỏ hơn!")
            
    except ValueError:
        print("❌ Vui lòng nhập số nguyên!")

if not is_correct:
    print(f"😢 Hết lượt! Số bí mật là {secret_number}")

# 2. Menu lựa chọn
print("\n2. Menu máy tính đơn giản:")
while True:
    print("\n--- MÁY TÍNH ĐƠN GIẢN ---")
    print("1. Cộng")
    print("2. Trừ") 
    print("3. Nhân")
    print("4. Chia")
    print("0. Thoát")
    
    choice = input("Chọn phép tính (0-4): ")
    
    if choice == "0":
        print("Tạm biệt! 👋")
        break
    elif choice in ["1", "2", "3", "4"]:
        try:
            first_number = float(input("Nhập số thứ nhất: "))
            second_number = float(input("Nhập số thứ hai: "))
            
            if choice == "1":
                print(f"Kết quả: {first_number} + {second_number} = {first_number + second_number}")
            elif choice == "2":
                print(f"Kết quả: {first_number} - {second_number} = {first_number - second_number}")
            elif choice == "3":
                print(f"Kết quả: {first_number} × {second_number} = {first_number * second_number}")
            elif choice == "4":
                if second_number != 0:
                    print(f"Kết quả: {first_number} ÷ {second_number} = {first_number / second_number:.2f}")
                else:
                    print("❌ Không thể chia cho 0!")
                    
        except ValueError:
            print("❌ Vui lòng nhập số hợp lệ!")
    else:
        print("❌ Lựa chọn không hợp lệ!")

# 3. Tính tổng đến khi nhập 0
print("\n3. Tính tổng các số (nhập 0 để dừng):")
total = 0
count = 0

while True:
    try:
        number = float(input("Nhập số (0 để kết thúc): "))
        if number == 0:
            break
        total += number
        count += 1
        print(f"Tổng hiện tại: {total}")
    except ValueError:
        print("❌ Vui lòng nhập số hợp lệ!")

if count > 0:
    average = total / count
    print(f"📊 Kết quả:")
    print(f"   Tổng: {total}")
    print(f"   Số lượng: {count}")
    print(f"   Trung bình: {average:.2f}")
else:
    print("Không có số nào được nhập!")
```

## Bài Tập 3: Break và Continue

**Đề bài:** Sử dụng break và continue để kiểm soát vòng lặp

```python
# Giải pháp
print("=== BREAK VÀ CONTINUE ===")

# 1. Tìm số nguyên tố đầu tiên > n
def find_first_prime(n):
    """Tìm số nguyên tố đầu tiên lớn hơn n"""
    
    def is_prime(number):
        """Kiểm tra số nguyên tố"""
        if number < 2:
            return False
        for i in range(2, int(number ** 0.5) + 1):
            if number % i == 0:
                return False
        return True
    
    # Bắt đầu tìm từ n+1
    current_number = n + 1
    
    while True:  # Vòng lặp vô tận
        if is_prime(current_number):
            return current_number  # Tìm thấy -> thoát bằng return
        current_number += 1

print("1. Tìm số nguyên tố:")
n = int(input("Nhập số n: "))
first_prime = find_first_prime(n)
print(f"Số nguyên tố đầu tiên > {n} là: {first_prime}")

# 2. Bỏ qua số chẵn khi tính tổng
print("\n2. Tính tổng các số lẻ từ 1 đến 20:")
odd_sum = 0
odd_numbers = []

for i in range(1, 21):
    if i % 2 == 0:  # Số chẵn
        continue    # Bỏ qua, tiếp tục vòng lặp tiếp theo
    
    odd_sum += i
    odd_numbers.append(i)

print(f"Các số lẻ: {odd_numbers}")
print(f"Tổng các số lẻ: {odd_sum}")

# 3. Dừng khi gặp điều kiện đặc biệt
print("\n3. Nhập danh sách số (dừng khi nhập số âm hoặc đủ 5 số):")
number_list = []
order = 1

while len(number_list) < 5:  # Tối đa 5 số
    try:
        number = float(input(f"Nhập số thứ {order}: "))
        
        if number < 0:  # Điều kiện dừng
            print("❌ Gặp số âm - Dừng nhập!")
            break
            
        number_list.append(number)
        order += 1
        
    except ValueError:
        print("⚠️ Số không hợp lệ - Bỏ qua!")
        continue  # Bỏ qua lần nhập này

print(f"Danh sách cuối cùng: {number_list}")

# 4. Xử lý lỗi với continue
print("\n4. Tính căn bậc hai (bỏ qua số âm):")
numbers = [4, -2, 9, -5, 16, -1, 25]

print("Kết quả:")
for number in numbers:
    if number < 0:
        print(f"  {number}: Bỏ qua (số âm)")
        continue
    
    square_root = number ** 0.5
    print(f"  √{number} = {square_root:.2f}")

# 5. Vòng lặp lồng nhau với break/continue
print("\n5. Tìm cặp số có tổng = 10:")
found_pair = False

for i in range(1, 8):
    for j in range(i + 1, 10):  # j > i để tránh lặp
        if i + j == 10:
            print(f"Tìm thấy cặp: {i} + {j} = 10")
            found_pair = True
            break  # Thoát vòng lặp trong
    
    if found_pair:
        break  # Thoát vòng lặp ngoài

if not found_pair:
    print("Không tìm thấy cặp nào!")
```

## Bài Tập 4: Vòng Lặp Lồng Nhau (Nested Loops)

**Đề bài:** Sử dụng vòng lặp lồng nhau cho các bài toán phức tạp

```python
# Giải pháp
print("=== VÒNG LẶP LỒNG NHAU ===")

# 1. Vẽ hình tam giác bằng *
print("1. Các hình tam giác:")

print("a) Tam giác vuông:")
for i in range(1, 6):
    print("* " * i)

print("\nb) Tam giác cân:")
for i in range(1, 6):
    spaces = " " * (5 - i)
    stars = "* " * i
    print(spaces + stars)

print("\nc) Kim cương:")
# Nửa trên
for i in range(1, 5):
    spaces = " " * (4 - i)
    stars = "* " * i
    print(spaces + stars)

# Nửa dưới
for i in range(3, 0, -1):
    spaces = " " * (4 - i)
    stars = "* " * i
    print(spaces + stars)

# 2. Bảng cửu chương đầy đủ
print("\n2. Bảng cửu chương:")
print("     ", end="")
for j in range(1, 11):
    print(f"{j:4}", end="")
print()

print("   " + "-" * 40)

for i in range(1, 11):
    print(f"{i:2} | ", end="")
    for j in range(1, 11):
        result = i * j
        print(f"{result:4}", end="")
    print()

# 3. Ma trận số
print("\n3. Ma trận số đặc biệt:")

print("a) Ma trận đường chéo:")
size = 5
for i in range(size):
    for j in range(size):
        if i == j:  # Đường chéo chính
            print("1 ", end="")
        else:
            print("0 ", end="")
    print()

print("\nb) Ma trận tam giác trên:")
for i in range(size):
    for j in range(size):
        if j >= i:  # Tam giác trên
            print("1 ", end="")
        else:
            print("  ", end="")  # Khoảng trắng
    print()

# 4. Tìm kiếm trong danh sách 2 chiều
print("\n4. Tìm kiếm trong ma trận:")
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]

print("Ma trận:")
for row in matrix:
    for element in row:
        print(f"{element:4}", end="")
    print()

target_number = 7
found = False

for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        if matrix[i][j] == target_number:
            print(f"Tìm thấy số {target_number} tại vị trí ({i}, {j})")
            found = True
            break
    if found:
        break

if not found:
    print(f"Không tìm thấy số {target_number}")

# 5. Sinh tổ hợp
print("\n5. Tổ hợp 2 phần tử từ danh sách:")
items = ['A', 'B', 'C', 'D']
combinations = []

for i in range(len(items)):
    for j in range(i + 1, len(items)):
        combinations.append((items[i], items[j]))

print("Các tổ hợp:")
for i, (first, second) in enumerate(combinations, 1):
    print(f"{i:2}. ({first}, {second})")
```

## Bài Tập 5: List Comprehension

**Đề bài:** Viết vòng lặp một cách ngắn gọn với list comprehension

```python
# Giải pháp
print("=== LIST COMPREHENSION ===")

# 1. Cơ bản - tạo danh sách
print("1. Tạo danh sách:")

# Cách truyền thống
squares_1 = []
for i in range(1, 6):
    squares_1.append(i ** 2)
print(f"Cách 1 (for thường): {squares_1}")

# List comprehension
squares_2 = [i ** 2 for i in range(1, 6)]
print(f"Cách 2 (comprehension): {squares_2}")

# 2. Với điều kiện
print("\n2. Lọc với điều kiện:")

even_numbers = [i for i in range(1, 21) if i % 2 == 0]
print(f"Số chẵn từ 1-20: {even_numbers}")

odd_squares = [i ** 2 for i in range(1, 11) if i % 2 == 1]
print(f"Bình phương số lẻ: {odd_squares}")

# 3. Xử lý chuỗi
print("\n3. Xử lý chuỗi:")

sentence = "Python là ngôn ngữ tuyệt vời"
words = sentence.split()

# Độ dài của mỗi từ
word_lengths = [len(word) for word in words]
print(f"Độ dài từ: {word_lengths}")

# Từ có độ dài > 4
long_words = [word for word in words if len(word) > 4]
print(f"Từ dài (>4 ký tự): {long_words}")

# Viết hoa từ đầu tiên của mỗi từ
capitalized_words = [word.capitalize() for word in words]
print(f"Viết hoa: {' '.join(capitalized_words)}")

# 4. Nested comprehension (lồng nhau)
print("\n4. List comprehension lồng nhau:")

# Ma trận 3x3
matrix_3x3 = [[i + j for j in range(3)] for i in range(0, 9, 3)]
print("Ma trận 3x3:")
for row in matrix_3x3:
    print(row)

# Flatten ma trận (chuyển 2D thành 1D)
matrix_2d = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
matrix_1d = [element for row in matrix_2d for element in row]
print(f"Ma trận 2D: {matrix_2d}")
print(f"Ma trận 1D: {matrix_1d}")

# 5. Dictionary và Set comprehension
print("\n5. Dictionary và Set comprehension:")

# Dictionary comprehension
squares_dict = {i: i ** 2 for i in range(1, 6)}
print(f"Dict bình phương: {squares_dict}")

# Set comprehension
unique_chars = {char.lower() for char in "Python Programming"}
print(f"Ký tự unique: {sorted(unique_chars)}")

# 6. Ví dụ thực tế - xử lý dữ liệu học sinh
print("\n6. Ví dụ thực tế:")

students = [
    {"tên": "An", "toán": 8, "lý": 7, "hóa": 9},
    {"tên": "Bình", "toán": 6, "lý": 8, "hóa": 7},
    {"tên": "Chi", "toán": 9, "lý": 9, "hóa": 8},
    {"tên": "Dung", "toán": 5, "lý": 6, "hóa": 6}
]

# Tính điểm trung bình
average_scores = [{
    "tên": student["tên"], 
    "điểm_tb": (student["toán"] + student["lý"] + student["hóa"]) / 3
} for student in students]

print("Điểm trung bình:")
for student in average_scores:
    print(f"  {student['tên']}: {student['điểm_tb']:.1f}")

# Học sinh giỏi (điểm TB >= 8)
excellent_students = [student["tên"] for student in average_scores if student["điểm_tb"] >= 8]
print(f"Học sinh giỏi: {excellent_students}")

# Điểm cao nhất mỗi môn
highest_scores = {
    "toán": max(student["toán"] for student in students),
    "lý": max(student["lý"] for student in students),
    "hóa": max(student["hóa"] for student in students)
}
print(f"Điểm cao nhất: {highest_scores}")
```

## Bài Tập 6: Các Thuật Toán Sắp Xếp

**Đề bài:** Cài đặt các thuật toán sắp xếp sử dụng vòng lặp

```python
# Giải pháp
import random
import time

print("=== THUẬT TOÁN SẮP XẾP ===")

def create_random_array(size, min_val=1, max_val=100):
    """Tạo mảng số ngẫu nhiên"""
    return [random.randint(min_val, max_val) for _ in range(size)]

def bubble_sort(arr):
    """Sắp xếp nổi bọt (Bubble Sort)"""
    arr = arr.copy()  # Không thay đổi mảng gốc
    n = len(arr)
    comparison_count = 0
    swap_count = 0
    
    print("Quá trình Bubble Sort:")
    
    for i in range(n):
        has_swapped = False
        
        for j in range(0, n - i - 1):
            comparison_count += 1
            
            if arr[j] > arr[j + 1]:
                # Hoán vị
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                has_swapped = True
                swap_count += 1
        
        print(f"  Lần {i + 1}: {arr}")
        
        if not has_swapped:  # Đã sắp xếp xong
            break
    
    print(f"Số lần so sánh: {comparison_count}")
    print(f"Số lần hoán vị: {swap_count}")
    return arr

def selection_sort(arr):
    """Sắp xếp chọn (Selection Sort)"""
    arr = arr.copy()
    n = len(arr)
    
    print("Quá trình Selection Sort:")
    
    for i in range(n):
        # Tìm phần tử nhỏ nhất trong đoạn còn lại
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Hoán vị
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
        
        print(f"  Lần {i + 1}: {arr} (chọn {arr[i]})")
    
    return arr

def insertion_sort(arr):
    """Sắp xếp chèn (Insertion Sort)"""
    arr = arr.copy()
    
    print("Quá trình Insertion Sort:")
    print(f"  Ban đầu: {arr}")
    
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Dịch chuyển các phần tử lớn hơn key về bên phải
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key
        print(f"  Lần {i}: {arr} (chèn {key})")
    
    return arr

# Demo các thuật toán
original_array = create_random_array(8)
print(f"Mảng gốc: {original_array}")

print(f"\n{'='*50}")
result_1 = bubble_sort(original_array)
print(f"Kết quả Bubble Sort: {result_1}")

print(f"\n{'='*50}")
result_2 = selection_sort(original_array)
print(f"Kết quả Selection Sort: {result_2}")

print(f"\n{'='*50}")
result_3 = insertion_sort(original_array)
print(f"Kết quả Insertion Sort: {result_3}")

# So sánh hiệu suất
print(f"\n{'='*50}")
print("SO SÁNH HIỆU SUẤT:")

test_size = 1000
test_array = create_random_array(test_size)

# Test Bubble Sort
start_time = time.time()
bubble_sort(test_array)
bubble_time = time.time() - start_time

# Test Selection Sort
start_time = time.time()
selection_sort(test_array)
selection_time = time.time() - start_time

# Test Insertion Sort
start_time = time.time()
insertion_sort(test_array)
insertion_time = time.time() - start_time

print(f"Mảng {test_size} phần tử:")
print(f"  Bubble Sort: {bubble_time:.4f}s")
print(f"  Selection Sort: {selection_time:.4f}s") 
print(f"  Insertion Sort: {insertion_time:.4f}s")
```

## Bài Tập 7: Trò Chơi Rắn Săn Mồi (Console)

**Đề bài:** Tạo trò chơi đơn giản sử dụng vòng lặp

```python
# Giải pháp
import random
import time
import os
from collections import deque

class SnakeGame:
    """Trò chơi rắn săn mồi chạy trên console"""
    
    def __init__(self, width=20, height=10):
        self.width = width
        self.height = height
        self.snake = deque([(height//2, width//2)])  # Vị trí đầu rắn
        self.direction = (0, 1)  # Di chuyển sang phải
        self.food = self.create_food()
        self.score = 0
        self.game_over = False
        
        # Ký tự hiển thị
        self.snake_head_char = "🟢"
        self.snake_body_char = "🟩" 
        self.food_char = "🍎"
        self.empty_char = "⬜"
        self.wall_char = "⬛"
    
    def create_food(self):
        """Tạo mồi ở vị trí ngẫu nhiên"""
        while True:
            food = (random.randint(1, self.height-2), 
                   random.randint(1, self.width-2))
            if food not in self.snake:
                return food
    
    def move(self):
        """Di chuyển rắn"""
        old_head = self.snake[0]
        new_head = (old_head[0] + self.direction[0], 
                   old_head[1] + self.direction[1])
        
        # Kiểm tra va chạm tường
        if (new_head[0] <= 0 or new_head[0] >= self.height-1 or
            new_head[1] <= 0 or new_head[1] >= self.width-1):
            self.game_over = True
            return
        
        # Kiểm tra va chạm thân
        if new_head in self.snake:
            self.game_over = True
            return
        
        # Thêm đầu mới
        self.snake.appendleft(new_head)
        
        # Kiểm tra ăn mồi
        if new_head == self.food:
            self.score += 1
            self.food = self.create_food()
        else:
            # Bỏ đuôi (nếu không ăn mồi)
            self.snake.pop()
    
    def change_direction(self, new_direction):
        """Thay đổi hướng (không cho phép quay đầu)"""
        # Không cho phép đi ngược lại
        if (new_direction[0] + self.direction[0] == 0 and 
            new_direction[1] + self.direction[1] == 0):
            return
        self.direction = new_direction
    
    def draw_screen(self):
        """Vẽ màn hình game"""
        os.system('clear' if os.name == 'posix' else 'cls')  # Xóa màn hình
        
        print(f"🎮 RẮN SĂN MỒI | Điểm: {self.score} | Độ dài: {len(self.snake)}")
        print("=" * (self.width * 2))
        
        for row in range(self.height):
            for col in range(self.width):
                position = (row, col)
                
                # Tường
                if row == 0 or row == self.height-1 or col == 0 or col == self.width-1:
                    print(self.wall_char, end="")
                # Đầu rắn
                elif position == self.snake[0]:
                    print(self.snake_head_char, end="")
                # Thân rắn
                elif position in self.snake:
                    print(self.snake_body_char, end="")
                # Mồi
                elif position == self.food:
                    print(self.food_char, end="")
                # Chỗ trống
                else:
                    print(self.empty_char, end="")
            print()  # Xuống dòng
        
        print("=" * (self.width * 2))
        print("Điều khiển: W(↑) A(←) S(↓) D(→) Q(Thoát)")
    
    def run_game(self):
        """Chạy game chính"""
        print("🎮 Chào mừng đến với Rắn Săn Mồi!")
        print("Nhấn Enter để bắt đầu...")
        input()
        
        while not self.game_over:
            self.draw_screen()
            
            # Tự động di chuyển (demo mode)
            print("Game đang chạy tự động (demo)...")
            
            # AI đơn giản - di chuyển về phía mồi
            snake_head = self.snake[0]
            
            # Tính hướng tối ưu đến mồi
            dy = self.food[0] - snake_head[0]
            dx = self.food[1] - snake_head[1]
            
            # Chọn hướng ưu tiên
            if abs(dx) > abs(dy):
                if dx > 0:
                    new_direction = (0, 1)  # Phải
                else:
                    new_direction = (0, -1)  # Trái
            else:
                if dy > 0:
                    new_direction = (1, 0)  # Xuống
                else:
                    new_direction = (-1, 0)  # Lên
            
            self.change_direction(new_direction)
            self.move()
            
            time.sleep(0.5)  # Nghỉ 0.5 giây
            
            # Dừng khi rắn đủ dài hoặc điểm cao
            if len(self.snake) > 15 or self.score > 10:
                print("🎉 Demo hoàn thành!")
                break
        
        # Kết thúc game
        self.draw_screen()
        if self.game_over:
            print("💀 GAME OVER!")
        print(f"🏆 Điểm cuối cùng: {self.score}")
        print(f"📏 Độ dài rắn: {len(self.snake)}")

# Chạy trò chơi
def demo_snake_game():
    """Chạy demo trò chơi rắn săn mồi"""
    game = SnakeGame(width=15, height=8)
    game.run_game()

if __name__ == "__main__":
    demo_snake_game()
```

## Bài Tập 8: Bài Tập Tổng Hợp

**Đề bài:** Tạo hệ thống quản lý thư viện sử dụng vòng lặp

```python
# Giải pháp
import json
from datetime import datetime, timedelta
import os

class LibraryManager:
    """Hệ thống quản lý thư viện đơn giản"""
    
    def __init__(self):
        self.books = {}  # Dictionary lưu thông tin sách
        self.readers = {}  # Dictionary lưu thông tin bạn đọc
        self.borrow_history = []  # List lưu lịch sử mượn/trả
        self.data_file = "thu_vien_data.json"
        self.load_data()
    
    def load_data(self):
        """Tải dữ liệu từ file"""
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.books = data.get('books', {})
                    self.readers = data.get('readers', {})
                    self.borrow_history = data.get('borrow_history', [])
                print("✅ Đã tải dữ liệu từ file")
            except Exception as e:
                print(f"⚠️ Lỗi tải dữ liệu: {e}")
    
    def save_data(self):
        """Lưu dữ liệu vào file"""
        try:
            data = {
                'books': self.books,
                'readers': self.readers,
                'borrow_history': self.borrow_history
            }
            with open(self.data_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print("✅ Đã lưu dữ liệu")
        except Exception as e:
            print(f"⚠️ Lỗi lưu dữ liệu: {e}")
    
    def add_book(self):
        """Thêm sách mới"""
        print("\n📚 THÊM SÁCH MỚI")
        print("-" * 30)
        
        while True:
            book_id = input("Mã sách (hoặc 'q' để thoát): ")
            if book_id.lower() == 'q':
                break
                
            if book_id in self.books:
                print("❌ Mã sách đã tồn tại!")
                continue
            
            book_title = input("Tên sách: ")
            author = input("Tác giả: ")
            
            try:
                publish_year = int(input("Năm xuất bản: "))
                quantity = int(input("Số lượng: "))
            except ValueError:
                print("❌ Năm và số lượng phải là số!")
                continue
            
            genre = input("Thể loại: ")
            
            self.books[book_id] = {
                'title': book_title,
                'author': author,
                'publish_year': publish_year,
                'quantity': quantity,
                'available_quantity': quantity,
                'genre': genre
            }
            
            print(f"✅ Đã thêm sách '{book_title}'")
            
            continue_choice = input("Thêm sách khác? (y/n): ")
            if continue_choice.lower() != 'y':
                break
    
    def add_reader(self):
        """Thêm bạn đọc mới"""
        print("\n👤 THÊM BẠN ĐỌC MỚI")
        print("-" * 30)
        
        while True:
            reader_id = input("Mã bạn đọc (hoặc 'q' để thoát): ")
            if reader_id.lower() == 'q':
                break
                
            if reader_id in self.readers:
                print("❌ Mã bạn đọc đã tồn tại!")
                continue
            
            reader_name = input("Tên bạn đọc: ")
            
            try:
                age = int(input("Tuổi: "))
            except ValueError:
                print("❌ Tuổi phải là số!")
                continue
                
            phone = input("Số điện thoại: ")
            address = input("Địa chỉ: ")
            
            self.readers[reader_id] = {
                'name': reader_name,
                'age': age,
                'phone': phone,
                'address': address,
                'borrowed_books': [],
                'borrow_history': []
            }
            
            print(f"✅ Đã thêm bạn đọc '{reader_name}'")
            
            continue_choice = input("Thêm bạn đọc khác? (y/n): ")
            if continue_choice.lower() != 'y':
                break
    
    def borrow_book(self):
        """Mượn sách"""
        print("\n📖 MƯỢN SÁCH")
        print("-" * 30)
        
        reader_id = input("Mã bạn đọc: ")
        if reader_id not in self.readers:
            print("❌ Không tìm thấy bạn đọc!")
            return
        
        reader = self.readers[reader_id]
        print(f"Bạn đọc: {reader['name']}")
        print(f"Sách đang mượn: {len(reader['borrowed_books'])}")
        
        if len(reader['borrowed_books']) >= 3:
            print("❌ Bạn đọc đã mượn tối đa 3 sách!")
            return
        
        book_id = input("Mã sách muốn mượn: ")
        if book_id not in self.books:
            print("❌ Không tìm thấy sách!")
            return
        
        book = self.books[book_id]
        if book['available_quantity'] <= 0:
            print("❌ Sách đã hết!")
            return
        
        # Thực hiện mượn sách
        borrow_date = datetime.now().strftime("%Y-%m-%d")
        return_date = (datetime.now() + timedelta(days=14)).strftime("%Y-%m-%d")
        
        borrow_info = {
            'book_id': book_id,
            'book_title': book['title'],
            'borrow_date': borrow_date,
            'expected_return_date': return_date,
            'status': 'borrowed'
        }
        
        # Cập nhật dữ liệu
        reader['borrowed_books'].append(borrow_info)
        reader['borrow_history'].append(borrow_info.copy())
        book['available_quantity'] -= 1
        
        self.borrow_history.append({
            'reader_id': reader_id,
            'reader_name': reader['name'],
            'book_id': book_id,
            'book_title': book['title'],
            'borrow_date': borrow_date,
            'expected_return_date': return_date,
            'type': 'borrow'
        })
        
        print(f"✅ Đã cho mượn sách '{book['title']}'")
        print(f"📅 Ngày trả dự kiến: {return_date}")
    
    def return_book(self):
        """Trả sách"""
        print("\n📚 TRẢ SÁCH")
        print("-" * 30)
        
        reader_id = input("Mã bạn đọc: ")
        if reader_id not in self.readers:
            print("❌ Không tìm thấy bạn đọc!")
            return
        
        reader = self.readers[reader_id]
        borrowed_books = reader['borrowed_books']
        
        if not borrowed_books:
            print("❌ Bạn đọc không mượn sách nào!")
            return
        
        print(f"Bạn đọc: {reader['name']}")
        print("Sách đang mượn:")
        
        for i, borrowed_book in enumerate(borrowed_books):
            print(f"{i+1}. {borrowed_book['book_title']} (Mã: {borrowed_book['book_id']})")
            print(f"   Ngày mượn: {borrowed_book['borrow_date']}")
            print(f"   Ngày trả DK: {borrowed_book['expected_return_date']}")
        
        try:
            choice = int(input("Chọn sách cần trả (số thứ tự): ")) - 1
            if choice < 0 or choice >= len(borrowed_books):
                print("❌ Lựa chọn không hợp lệ!")
                return
        except ValueError:
            print("❌ Vui lòng nhập số!")
            return
        
        # Thực hiện trả sách
        returned_book = borrowed_books.pop(choice)
        book_id = returned_book['book_id']
        
        # Cập nhật số lượng sách
        self.books[book_id]['available_quantity'] += 1
        
        # Ghi nhận lịch sử trả
        return_date = datetime.now().strftime("%Y-%m-%d")
        self.borrow_history.append({
            'reader_id': reader_id,
            'reader_name': reader['name'],
            'book_id': book_id,
            'book_title': returned_book['book_title'],
            'return_date': return_date,
            'type': 'return'
        })
        
        print(f"✅ Đã trả sách '{returned_book['book_title']}'")
    
    def search_book(self):
        """Tìm kiếm sách"""
        print("\n🔍 TÌM KIẾM SÁCH")
        print("-" * 30)
        
        keyword = input("Nhập từ khóa (tên sách/tác giả/thể loại): ").lower()
        
        results = []
        for book_id, book_info in self.books.items():
            if (keyword in book_info['title'].lower() or
                keyword in book_info['author'].lower() or
                keyword in book_info['genre'].lower()):
                results.append((book_id, book_info))
        
        if not results:
            print("❌ Không tìm thấy sách nào!")
            return
        
        print(f"🔍 Tìm thấy {len(results)} sách:")
        print("-" * 80)
        print(f"{'Mã':<8} {'Tên sách':<30} {'Tác giả':<20} {'Còn lại':<10}")
        print("-" * 80)
        
        for book_id, book_info in results:
            print(f"{book_id:<8} {book_info['title']:<30} "
                  f"{book_info['author']:<20} {book_info['available_quantity']:<10}")
    
    def statistics(self):
        """Thống kê tổng quan"""
        print("\n📊 THỐNG KÊ TỔNG QUAN")
        print("=" * 50)
        
        # Thống kê sách
        total_books = len(self.books)
        total_quantity = sum(book['quantity'] for book in self.books.values())
        available_books = sum(book['available_quantity'] for book in self.books.values())
        borrowed_books = total_quantity - available_books
        
        print(f"📚 SÁCH:")
        print(f"  Tổng đầu sách: {total_books}")
        print(f"  Tổng số lượng: {total_quantity}")
        print(f"  Đang được mượn: {borrowed_books}")
        print(f"  Còn lại: {available_books}")
        
        # Thống kê bạn đọc
        total_readers = len(self.readers)
        readers_with_books = sum(1 for reader in self.readers.values() 
                               if reader['borrowed_books'])
        
        print(f"\n👤 BẠN ĐỌC:")
        print(f"  Tổng bạn đọc: {total_readers}")
        print(f"  Đang mượn sách: {readers_with_books}")
        
        # Top sách được mượn nhiều
        borrow_stats = {}
        for transaction in self.borrow_history:
            if transaction['type'] == 'borrow':
                book_id = transaction['book_id']
                borrow_stats[book_id] = borrow_stats.get(book_id, 0) + 1
        
        if borrow_stats:
            print(f"\n🏆 TOP SÁCH ĐƯỢC MƯỢN NHIỀU:")
            sorted_books = sorted(borrow_stats.items(), 
                                key=lambda x: x[1], reverse=True)[:5]
            
            for i, (book_id, count) in enumerate(sorted_books, 1):
                book_title = self.books.get(book_id, {}).get('title', 'N/A')
                print(f"  {i}. {book_title} ({count} lần)")
    
    def main_menu(self):
        """Menu chính của hệ thống"""
        while True:
            print("\n" + "="*50)
            print("🏛️  HỆ THỐNG QUẢN LÝ THƯ VIỆN")
            print("="*50)
            print("1. Thêm sách")
            print("2. Thêm bạn đọc")
            print("3. Mượn sách")
            print("4. Trả sách")
            print("5. Tìm kiếm sách")
            print("6. Thống kê")
            print("7. Lưu dữ liệu")
            print("0. Thoát")
            print("-"*50)
            
            choice = input("Chọn chức năng (0-7): ")
            
            if choice == "0":
                print("💾 Đang lưu dữ liệu...")
                self.save_data()
                print("👋 Tạm biệt!")
                break
            elif choice == "1":
                self.add_book()
            elif choice == "2":
                self.add_reader()
            elif choice == "3":
                self.borrow_book()
            elif choice == "4":
                self.return_book()
            elif choice == "5":
                self.search_book()
            elif choice == "6":
                self.statistics()
            elif choice == "7":
                self.save_data()
            else:
                print("❌ Lựa chọn không hợp lệ!")

# Demo hệ thống
def demo_library_system():
    """Demo hệ thống quản lý thư viện"""
    
    # Tạo dữ liệu mẫu
    library = LibraryManager()
    
    # Thêm sách mẫu nếu chưa có
    if not library.books:
        sample_books = [
            ("PY001", "Học Python Cơ Bản", "Nguyễn Văn A", 2023, 5, "Lập trình"),
            ("PY002", "Python Nâng Cao", "Trần Thị B", 2023, 3, "Lập trình"),
            ("VL001", "Vật Lý Đại Cương", "Lê Văn C", 2022, 4, "Khoa học"),
            ("TH001", "Toán Học Cao Cấp", "Phạm Thị D", 2022, 6, "Toán học"),
        ]
        
        for book_id, title, author, year, quantity, genre in sample_books:
            library.books[book_id] = {
                'title': title,
                'author': author,
                'publish_year': year,
                'quantity': quantity,
                'available_quantity': quantity,
                'genre': genre
            }
    
    # Thêm bạn đọc mẫu nếu chưa có
    if not library.readers:
        sample_readers = [
            ("BD001", "Nguyễn Văn An", 20, "0123456789", "Hà Nội"),
            ("BD002", "Trần Thị Bình", 21, "0987654321", "TP.HCM"),
        ]
        
        for reader_id, name, age, phone, address in sample_readers:
            library.readers[reader_id] = {
                'name': name,
                'age': age,
                'phone': phone,
                'address': address,
                'borrowed_books': [],
                'borrow_history': []
            }
    
    print("📚 Hệ thống đã được khởi tạo với dữ liệu mẫu!")
    
    # Chạy menu chính
    library.main_menu()

if __name__ == "__main__":
    demo_library_system()
```

## Tổng Kết

Qua các bài tập về vòng lặp, bạn đã học được:

1. **Vòng lặp for** - Lặp với số lần xác định
2. **Vòng lặp while** - Lặp theo điều kiện
3. **Break và Continue** - Kiểm soát luồng lặp
4. **Vòng lặp lồng nhau** - Xử lý dữ liệu 2 chiều
5. **List Comprehension** - Viết vòng lặp ngắn gọn
6. **Thuật toán sắp xếp** - Ứng dụng vòng lặp trong thuật toán
7. **Trò chơi console** - Ứng dụng thực tế thú vị
8. **Hệ thống quản lý** - Ứng dụng tổng hợp

**Mẹo nhớ:**
- `for` khi biết số lần lặp
- `while` khi lặp theo điều kiện
- `break` để thoát sớm
- `continue` để bỏ qua lần lặp hiện tại
- List comprehension làm code ngắn gọn hơn

**Lưu ý quan trọng:**
- Luôn đảm bảo vòng lặp có điều kiện dừng
- Tránh vòng lặp vô tận
- Sử dụng vòng lặp phù hợp với từng bài toán

Tiếp tục luyện tập để thành thạo! 🔄

