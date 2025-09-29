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
    ket_qua = 7 * i
    print(f"7 x {i} = {ket_qua}")

print("\n3. Đếm ngược từ 10 về 0:")
for i in range(10, -1, -1):
    if i == 0:
        print("🚀 Phóng tên lửa!")
    else:
        print(f"Đếm ngược: {i}")

# 4. Lặp qua danh sách
print("\n4. Các môn học yêu thích:")
mon_hoc = ["Toán", "Lý", "Hóa", "Sinh", "Văn"]
for i, mon in enumerate(mon_hoc, 1):
    print(f"Môn {i}: {mon}")

# 5. Lặp qua chuỗi
print("\n5. Phân tích từ 'PYTHON':")
tu = "PYTHON"
for i, ky_tu in enumerate(tu):
    print(f"Vị trí {i}: '{ky_tu}'")

# 6. Lặp qua dictionary
print("\n6. Thông tin học sinh:")
hoc_sinh = {
    "tên": "Nguyễn Văn An",
    "tuổi": 16,
    "lớp": "10A1",
    "điểm_tb": 8.5
}

for key, value in hoc_sinh.items():
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
so_bi_mat = random.randint(1, 10)
so_lan_doan = 0
doan_dung = False

while not doan_dung and so_lan_doan < 3:
    try:
        du_doan = int(input(f"Đoán số từ 1-10 (lần {so_lan_doan + 1}/3): "))
        so_lan_doan += 1
        
        if du_doan == so_bi_mat:
            print(f"🎉 Chúc mừng! Bạn đoán đúng số {so_bi_mat}")
            doan_dung = True
        elif du_doan < so_bi_mat:
            print("📈 Số cần tìm lớn hơn!")
        else:
            print("📉 Số cần tìm nhỏ hơn!")
            
    except ValueError:
        print("❌ Vui lòng nhập số nguyên!")

if not doan_dung:
    print(f"😢 Hết lượt! Số bí mật là {so_bi_mat}")

# 2. Menu lựa chọn
print("\n2. Menu máy tính đơn giản:")
while True:
    print("\n--- MÁY TÍNH ĐƠN GIẢN ---")
    print("1. Cộng")
    print("2. Trừ") 
    print("3. Nhân")
    print("4. Chia")
    print("0. Thoát")
    
    lua_chon = input("Chọn phép tính (0-4): ")
    
    if lua_chon == "0":
        print("Tạm biệt! 👋")
        break
    elif lua_chon in ["1", "2", "3", "4"]:
        try:
            a = float(input("Nhập số thứ nhất: "))
            b = float(input("Nhập số thứ hai: "))
            
            if lua_chon == "1":
                print(f"Kết quả: {a} + {b} = {a + b}")
            elif lua_chon == "2":
                print(f"Kết quả: {a} - {b} = {a - b}")
            elif lua_chon == "3":
                print(f"Kết quả: {a} × {b} = {a * b}")
            elif lua_chon == "4":
                if b != 0:
                    print(f"Kết quả: {a} ÷ {b} = {a / b:.2f}")
                else:
                    print("❌ Không thể chia cho 0!")
                    
        except ValueError:
            print("❌ Vui lòng nhập số hợp lệ!")
    else:
        print("❌ Lựa chọn không hợp lệ!")

# 3. Tính tổng đến khi nhập 0
print("\n3. Tính tổng các số (nhập 0 để dừng):")
tong = 0
so_luong = 0

while True:
    try:
        so = float(input("Nhập số (0 để kết thúc): "))
        if so == 0:
            break
        tong += so
        so_luong += 1
        print(f"Tổng hiện tại: {tong}")
    except ValueError:
        print("❌ Vui lòng nhập số hợp lệ!")

if so_luong > 0:
    trung_binh = tong / so_luong
    print(f"📊 Kết quả:")
    print(f"   Tổng: {tong}")
    print(f"   Số lượng: {so_luong}")
    print(f"   Trung bình: {trung_binh:.2f}")
else:
    print("Không có số nào được nhập!")
```

## Bài Tập 3: Break và Continue

**Đề bài:** Sử dụng break và continue để kiểm soát vòng lặp

```python
# Giải pháp
print("=== BREAK VÀ CONTINUE ===")

# 1. Tìm số nguyên tố đầu tiên > n
def tim_so_nguyen_to_dau_tien(n):
    """Tìm số nguyên tố đầu tiên lớn hơn n"""
    
    def kiem_tra_nguyen_to(so):
        """Kiểm tra số nguyên tố"""
        if so < 2:
            return False
        for i in range(2, int(so ** 0.5) + 1):
            if so % i == 0:
                return False
        return True
    
    # Bắt đầu tìm từ n+1
    so_hien_tai = n + 1
    
    while True:  # Vòng lặp vô tận
        if kiem_tra_nguyen_to(so_hien_tai):
            return so_hien_tai  # Tìm thấy -> thoát bằng return
        so_hien_tai += 1

print("1. Tìm số nguyên tố:")
n = int(input("Nhập số n: "))
so_nguyen_to = tim_so_nguyen_to_dau_tien(n)
print(f"Số nguyên tố đầu tiên > {n} là: {so_nguyen_to}")

# 2. Bỏ qua số chẵn khi tính tổng
print("\n2. Tính tổng các số lẻ từ 1 đến 20:")
tong_le = 0
cac_so_le = []

for i in range(1, 21):
    if i % 2 == 0:  # Số chẵn
        continue    # Bỏ qua, tiếp tục vòng lặp tiếp theo
    
    tong_le += i
    cac_so_le.append(i)

print(f"Các số lẻ: {cac_so_le}")
print(f"Tổng các số lẻ: {tong_le}")

# 3. Dừng khi gặp điều kiện đặc biệt
print("\n3. Nhập danh sách số (dừng khi nhập số âm hoặc đủ 5 số):")
danh_sach = []
so_thu_tu = 1

while len(danh_sach) < 5:  # Tối đa 5 số
    try:
        so = float(input(f"Nhập số thứ {so_thu_tu}: "))
        
        if so < 0:  # Điều kiện dừng
            print("❌ Gặp số âm - Dừng nhập!")
            break
            
        danh_sach.append(so)
        so_thu_tu += 1
        
    except ValueError:
        print("⚠️ Số không hợp lệ - Bỏ qua!")
        continue  # Bỏ qua lần nhập này

print(f"Danh sách cuối cùng: {danh_sach}")

# 4. Xử lý lỗi với continue
print("\n4. Tính căn bậc hai (bỏ qua số âm):")
cac_so = [4, -2, 9, -5, 16, -1, 25]

print("Kết quả:")
for so in cac_so:
    if so < 0:
        print(f"  {so}: Bỏ qua (số âm)")
        continue
    
    can_bac_hai = so ** 0.5
    print(f"  √{so} = {can_bac_hai:.2f}")

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
    khoang_trang = " " * (5 - i)
    sao = "* " * i
    print(khoang_trang + sao)

print("\nc) Kim cương:")
# Nửa trên
for i in range(1, 5):
    khoang_trang = " " * (4 - i)
    sao = "* " * i
    print(khoang_trang + sao)

# Nửa dưới
for i in range(3, 0, -1):
    khoang_trang = " " * (4 - i)
    sao = "* " * i
    print(khoang_trang + sao)

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
        ket_qua = i * j
        print(f"{ket_qua:4}", end="")
    print()

# 3. Ma trận số
print("\n3. Ma trận số đặc biệt:")

print("a) Ma trận đường chéo:")
kich_thuoc = 5
for i in range(kich_thuoc):
    for j in range(kich_thuoc):
        if i == j:  # Đường chéo chính
            print("1 ", end="")
        else:
            print("0 ", end="")
    print()

print("\nb) Ma trận tam giác trên:")
for i in range(kich_thuoc):
    for j in range(kich_thuoc):
        if j >= i:  # Tam giác trên
            print("1 ", end="")
        else:
            print("  ", end="")  # Khoảng trắng
    print()

# 4. Tìm kiếm trong danh sách 2 chiều
print("\n4. Tìm kiếm trong ma trận:")
ma_tran = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]

print("Ma trận:")
for hang in ma_tran:
    for phan_tu in hang:
        print(f"{phan_tu:4}", end="")
    print()

so_can_tim = 7
tim_thay = False

for i in range(len(ma_tran)):
    for j in range(len(ma_tran[i])):
        if ma_tran[i][j] == so_can_tim:
            print(f"Tìm thấy số {so_can_tim} tại vị trí ({i}, {j})")
            tim_thay = True
            break
    if tim_thay:
        break

if not tim_thay:
    print(f"Không tìm thấy số {so_can_tim}")

# 5. Sinh tổ hợp
print("\n5. Tổ hợp 2 phần tử từ danh sách:")
danh_sach = ['A', 'B', 'C', 'D']
to_hop = []

for i in range(len(danh_sach)):
    for j in range(i + 1, len(danh_sach)):
        to_hop.append((danh_sach[i], danh_sach[j]))

print("Các tổ hợp:")
for i, (a, b) in enumerate(to_hop, 1):
    print(f"{i:2}. ({a}, {b})")
```

## Bài Tập 5: List Comprehension

**Đề bài:** Viết vòng lặp một cách ngắn gọn với list comprehension

```python
# Giải pháp
print("=== LIST COMPREHENSION ===")

# 1. Cơ bản - tạo danh sách
print("1. Tạo danh sách:")

# Cách truyền thống
binh_phuong_1 = []
for i in range(1, 6):
    binh_phuong_1.append(i ** 2)
print(f"Cách 1 (for thường): {binh_phuong_1}")

# List comprehension
binh_phuong_2 = [i ** 2 for i in range(1, 6)]
print(f"Cách 2 (comprehension): {binh_phuong_2}")

# 2. Với điều kiện
print("\n2. Lọc với điều kiện:")

so_chan = [i for i in range(1, 21) if i % 2 == 0]
print(f"Số chẵn từ 1-20: {so_chan}")

so_le_binh_phuong = [i ** 2 for i in range(1, 11) if i % 2 == 1]
print(f"Bình phương số lẻ: {so_le_binh_phuong}")

# 3. Xử lý chuỗi
print("\n3. Xử lý chuỗi:")

cau = "Python là ngôn ngữ tuyệt vời"
cac_tu = cau.split()

# Độ dài của mỗi từ
do_dai_tu = [len(tu) for tu in cac_tu]
print(f"Độ dài từ: {do_dai_tu}")

# Từ có độ dài > 4
tu_dai = [tu for tu in cac_tu if len(tu) > 4]
print(f"Từ dài (>4 ký tự): {tu_dai}")

# Viết hoa từ đầu tiên của mỗi từ
tu_viet_hoa = [tu.capitalize() for tu in cac_tu]
print(f"Viết hoa: {' '.join(tu_viet_hoa)}")

# 4. Nested comprehension (lồng nhau)
print("\n4. List comprehension lồng nhau:")

# Ma trận 3x3
ma_tran_3x3 = [[i + j for j in range(3)] for i in range(0, 9, 3)]
print("Ma trận 3x3:")
for hang in ma_tran_3x3:
    print(hang)

# Flatten ma trận (chuyển 2D thành 1D)
ma_tran_2d = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
ma_tran_1d = [phan_tu for hang in ma_tran_2d for phan_tu in hang]
print(f"Ma trận 2D: {ma_tran_2d}")
print(f"Ma trận 1D: {ma_tran_1d}")

# 5. Dictionary và Set comprehension
print("\n5. Dictionary và Set comprehension:")

# Dictionary comprehension
binh_phuong_dict = {i: i ** 2 for i in range(1, 6)}
print(f"Dict bình phương: {binh_phuong_dict}")

# Set comprehension
ky_tu_unique = {ky_tu.lower() for ky_tu in "Python Programming"}
print(f"Ký tự unique: {sorted(ky_tu_unique)}")

# 6. Ví dụ thực tế - xử lý dữ liệu học sinh
print("\n6. Ví dụ thực tế:")

hoc_sinh = [
    {"ten": "An", "toan": 8, "ly": 7, "hoa": 9},
    {"ten": "Bình", "toan": 6, "ly": 8, "hoa": 7},
    {"ten": "Chi", "toan": 9, "ly": 9, "hoa": 8},
    {"ten": "Dung", "toan": 5, "ly": 6, "hoa": 6}
]

# Tính điểm trung bình
diem_tb = [{
    "ten": hs["ten"], 
    "diem_tb": (hs["toan"] + hs["ly"] + hs["hoa"]) / 3
} for hs in hoc_sinh]

print("Điểm trung bình:")
for hs in diem_tb:
    print(f"  {hs['ten']}: {hs['diem_tb']:.1f}")

# Học sinh giỏi (điểm TB >= 8)
hoc_sinh_gioi = [hs["ten"] for hs in diem_tb if hs["diem_tb"] >= 8]
print(f"Học sinh giỏi: {hoc_sinh_gioi}")

# Điểm cao nhất mỗi môn
diem_cao_nhat = {
    "toan": max(hs["toan"] for hs in hoc_sinh),
    "ly": max(hs["ly"] for hs in hoc_sinh),
    "hoa": max(hs["hoa"] for hs in hoc_sinh)
}
print(f"Điểm cao nhất: {diem_cao_nhat}")
```

## Bài Tập 6: Các Thuật Toán Sắp Xếp

**Đề bài:** Cài đặt các thuật toán sắp xếp sử dụng vòng lặp

```python
# Giải pháp
import random
import time

print("=== THUẬT TOÁN SẮP XẾP ===")

def tao_mang_ngau_nhien(kich_thuoc, min_val=1, max_val=100):
    """Tạo mảng số ngẫu nhiên"""
    return [random.randint(min_val, max_val) for _ in range(kich_thuoc)]

def bubble_sort(arr):
    """Sắp xếp nổi bọt (Bubble Sort)"""
    arr = arr.copy()  # Không thay đổi mảng gốc
    n = len(arr)
    so_lan_so_sanh = 0
    so_lan_hoan_vi = 0
    
    print("Quá trình Bubble Sort:")
    
    for i in range(n):
        co_hoan_vi = False
        
        for j in range(0, n - i - 1):
            so_lan_so_sanh += 1
            
            if arr[j] > arr[j + 1]:
                # Hoán vị
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                co_hoan_vi = True
                so_lan_hoan_vi += 1
        
        print(f"  Lần {i + 1}: {arr}")
        
        if not co_hoan_vi:  # Đã sắp xếp xong
            break
    
    print(f"Số lần so sánh: {so_lan_so_sanh}")
    print(f"Số lần hoán vị: {so_lan_hoan_vi}")
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
mang_goc = tao_mang_ngau_nhien(8)
print(f"Mảng gốc: {mang_goc}")

print(f"\n{'='*50}")
ket_qua_1 = bubble_sort(mang_goc)
print(f"Kết quả Bubble Sort: {ket_qua_1}")

print(f"\n{'='*50}")
ket_qua_2 = selection_sort(mang_goc)
print(f"Kết quả Selection Sort: {ket_qua_2}")

print(f"\n{'='*50}")
ket_qua_3 = insertion_sort(mang_goc)
print(f"Kết quả Insertion Sort: {ket_qua_3}")

# So sánh hiệu suất
print(f"\n{'='*50}")
print("SO SÁNH HIỆU SUẤT:")

kich_thuoc_test = 1000
mang_test = tao_mang_ngau_nhien(kich_thuoc_test)

# Test Bubble Sort
start_time = time.time()
bubble_sort(mang_test)
bubble_time = time.time() - start_time

# Test Selection Sort
start_time = time.time()
selection_sort(mang_test)
selection_time = time.time() - start_time

# Test Insertion Sort
start_time = time.time()
insertion_sort(mang_test)
insertion_time = time.time() - start_time

print(f"Mảng {kich_thuoc_test} phần tử:")
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

class TroChoiRanSanMoi:
    """Trò chơi rắn săn mồi chạy trên console"""
    
    def __init__(self, rong=20, cao=10):
        self.rong = rong
        self.cao = cao
        self.ran = deque([(cao//2, rong//2)])  # Vị trí đầu rắn
        self.huong = (0, 1)  # Di chuyển sang phải
        self.moi = self.tao_moi()
        self.diem = 0
        self.game_over = False
        
        # Ký tự hiển thị
        self.ky_tu_ran_dau = "🟢"
        self.ky_tu_ran_than = "🟩" 
        self.ky_tu_moi = "🍎"
        self.ky_tu_trong = "⬜"
        self.ky_tu_tuong = "⬛"
    
    def tao_moi(self):
        """Tạo mồi ở vị trí ngẫu nhiên"""
        while True:
            moi = (random.randint(1, self.cao-2), 
                   random.randint(1, self.rong-2))
            if moi not in self.ran:
                return moi
    
    def di_chuyen(self):
        """Di chuyển rắn"""
        dau_cu = self.ran[0]
        dau_moi = (dau_cu[0] + self.huong[0], 
                   dau_cu[1] + self.huong[1])
        
        # Kiểm tra va chạm tường
        if (dau_moi[0] <= 0 or dau_moi[0] >= self.cao-1 or
            dau_moi[1] <= 0 or dau_moi[1] >= self.rong-1):
            self.game_over = True
            return
        
        # Kiểm tra va chạm thân
        if dau_moi in self.ran:
            self.game_over = True
            return
        
        # Thêm đầu mới
        self.ran.appendleft(dau_moi)
        
        # Kiểm tra ăn mồi
        if dau_moi == self.moi:
            self.diem += 1
            self.moi = self.tao_moi()
        else:
            # Bỏ đuôi (nếu không ăn mồi)
            self.ran.pop()
    
    def thay_doi_huong(self, huong_moi):
        """Thay đổi hướng (không cho phép quay đầu)"""
        # Không cho phép đi ngược lại
        if (huong_moi[0] + self.huong[0] == 0 and 
            huong_moi[1] + self.huong[1] == 0):
            return
        self.huong = huong_moi
    
    def ve_man_hinh(self):
        """Vẽ màn hình game"""
        os.system('clear' if os.name == 'posix' else 'cls')  # Xóa màn hình
        
        print(f"🎮 RẮSĂN MỒI | Điểm: {self.diem} | Độ dài: {len(self.ran)}")
        print("=" * (self.rong * 2))
        
        for hang in range(self.cao):
            for cot in range(self.rong):
                vi_tri = (hang, cot)
                
                # Tường
                if hang == 0 or hang == self.cao-1 or cot == 0 or cot == self.rong-1:
                    print(self.ky_tu_tuong, end="")
                # Đầu rắn
                elif vi_tri == self.ran[0]:
                    print(self.ky_tu_ran_dau, end="")
                # Thân rắn
                elif vi_tri in self.ran:
                    print(self.ky_tu_ran_than, end="")
                # Mồi
                elif vi_tri == self.moi:
                    print(self.ky_tu_moi, end="")
                # Chỗ trống
                else:
                    print(self.ky_tu_trong, end="")
            print()  # Xuống dòng
        
        print("=" * (self.rong * 2))
        print("Điều khiển: W(↑) A(←) S(↓) D(→) Q(Thoát)")
    
    def chay_game(self):
        """Chạy game chính"""
        print("🎮 Chào mừng đến với Rắn Săn Mồi!")
        print("Nhấn Enter để bắt đầu...")
        input()
        
        while not self.game_over:
            self.ve_man_hinh()
            
            # Tự động di chuyển (demo mode)
            print("Game đang chạy tự động (demo)...")
            
            # AI đơn giản - di chuyển về phía mồi
            dau_ran = self.ran[0]
            
            # Tính hướng tối ưu đến mồi
            dy = self.moi[0] - dau_ran[0]
            dx = self.moi[1] - dau_ran[1]
            
            # Chọn hướng ưu tiên
            if abs(dx) > abs(dy):
                if dx > 0:
                    huong_moi = (0, 1)  # Phải
                else:
                    huong_moi = (0, -1)  # Trái
            else:
                if dy > 0:
                    huong_moi = (1, 0)  # Xuống
                else:
                    huong_moi = (-1, 0)  # Lên
            
            self.thay_doi_huong(huong_moi)
            self.di_chuyen()
            
            time.sleep(0.5)  # Nghỉ 0.5 giây
            
            # Dừng khi rắn đủ dài hoặc điểm cao
            if len(self.ran) > 15 or self.diem > 10:
                print("🎉 Demo hoàn thành!")
                break
        
        # Kết thúc game
        self.ve_man_hinh()
        if self.game_over:
            print("💀 GAME OVER!")
        print(f"🏆 Điểm cuối cùng: {self.diem}")
        print(f"📏 Độ dài rắn: {len(self.ran)}")

# Chạy trò chơi
def demo_ran_san_moi():
    """Chạy demo trò chơi rắn săn mồi"""
    game = TroChoiRanSanMoi(rong=15, cao=8)
    game.chay_game()

if __name__ == "__main__":
    demo_ran_san_moi()
```

## Bài Tập 8: Bài Tập Tổng Hợp

**Đề bài:** Tạo hệ thống quản lý thư viện sử dụng vòng lặp

```python
# Giải pháp
import json
from datetime import datetime, timedelta
import os

class QuanLyThuVien:
    """Hệ thống quản lý thư viện đơn giản"""
    
    def __init__(self):
        self.sach = {}  # Dictionary lưu thông tin sách
        self.ban_doc = {}  # Dictionary lưu thông tin bạn đọc
        self.muon_tra = []  # List lưu lịch sử mượn/trả
        self.file_data = "thu_vien_data.json"
        self.load_data()
    
    def load_data(self):
        """Tải dữ liệu từ file"""
        if os.path.exists(self.file_data):
            try:
                with open(self.file_data, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.sach = data.get('sach', {})
                    self.ban_doc = data.get('ban_doc', {})
                    self.muon_tra = data.get('muon_tra', [])
                print("✅ Đã tải dữ liệu từ file")
            except Exception as e:
                print(f"⚠️ Lỗi tải dữ liệu: {e}")
    
    def save_data(self):
        """Lưu dữ liệu vào file"""
        try:
            data = {
                'sach': self.sach,
                'ban_doc': self.ban_doc,
                'muon_tra': self.muon_tra
            }
            with open(self.file_data, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print("✅ Đã lưu dữ liệu")
        except Exception as e:
            print(f"⚠️ Lỗi lưu dữ liệu: {e}")
    
    def them_sach(self):
        """Thêm sách mới"""
        print("\n📚 THÊM SÁCH MỚI")
        print("-" * 30)
        
        while True:
            ma_sach = input("Mã sách (hoặc 'q' để thoát): ")
            if ma_sach.lower() == 'q':
                break
                
            if ma_sach in self.sach:
                print("❌ Mã sách đã tồn tại!")
                continue
            
            ten_sach = input("Tên sách: ")
            tac_gia = input("Tác giả: ")
            
            try:
                nam_xb = int(input("Năm xuất bản: "))
                so_luong = int(input("Số lượng: "))
            except ValueError:
                print("❌ Năm và số lượng phải là số!")
                continue
            
            the_loai = input("Thể loại: ")
            
            self.sach[ma_sach] = {
                'ten': ten_sach,
                'tac_gia': tac_gia,
                'nam_xb': nam_xb,
                'so_luong': so_luong,
                'so_luong_con': so_luong,
                'the_loai': the_loai
            }
            
            print(f"✅ Đã thêm sách '{ten_sach}'")
            
            tiep_tuc = input("Thêm sách khác? (y/n): ")
            if tiep_tuc.lower() != 'y':
                break
    
    def them_ban_doc(self):
        """Thêm bạn đọc mới"""
        print("\n👤 THÊM BẠN ĐỌC MỚI")
        print("-" * 30)
        
        while True:
            ma_bd = input("Mã bạn đọc (hoặc 'q' để thoát): ")
            if ma_bd.lower() == 'q':
                break
                
            if ma_bd in self.ban_doc:
                print("❌ Mã bạn đọc đã tồn tại!")
                continue
            
            ten_bd = input("Tên bạn đọc: ")
            
            try:
                tuoi = int(input("Tuổi: "))
            except ValueError:
                print("❌ Tuổi phải là số!")
                continue
                
            sdt = input("Số điện thoại: ")
            dia_chi = input("Địa chỉ: ")
            
            self.ban_doc[ma_bd] = {
                'ten': ten_bd,
                'tuoi': tuoi,
                'sdt': sdt,
                'dia_chi': dia_chi,
                'sach_dang_muon': [],
                'lich_su_muon': []
            }
            
            print(f"✅ Đã thêm bạn đọc '{ten_bd}'")
            
            tiep_tuc = input("Thêm bạn đọc khác? (y/n): ")
            if tiep_tuc.lower() != 'y':
                break
    
    def muon_sach(self):
        """Mượn sách"""
        print("\n📖 MƯỢN SÁCH")
        print("-" * 30)
        
        ma_bd = input("Mã bạn đọc: ")
        if ma_bd not in self.ban_doc:
            print("❌ Không tìm thấy bạn đọc!")
            return
        
        ban_doc = self.ban_doc[ma_bd]
        print(f"Bạn đọc: {ban_doc['ten']}")
        print(f"Sách đang mượn: {len(ban_doc['sach_dang_muon'])}")
        
        if len(ban_doc['sach_dang_muon']) >= 3:
            print("❌ Bạn đọc đã mượn tối đa 3 sách!")
            return
        
        ma_sach = input("Mã sách muốn mượn: ")
        if ma_sach not in self.sach:
            print("❌ Không tìm thấy sách!")
            return
        
        sach = self.sach[ma_sach]
        if sach['so_luong_con'] <= 0:
            print("❌ Sách đã hết!")
            return
        
        # Thực hiện mượn sách
        ngay_muon = datetime.now().strftime("%Y-%m-%d")
        ngay_tra_du_kien = (datetime.now() + timedelta(days=14)).strftime("%Y-%m-%d")
        
        thong_tin_muon = {
            'ma_sach': ma_sach,
            'ten_sach': sach['ten'],
            'ngay_muon': ngay_muon,
            'ngay_tra_du_kien': ngay_tra_du_kien,
            'trang_thai': 'dang_muon'
        }
        
        # Cập nhật dữ liệu
        ban_doc['sach_dang_muon'].append(thong_tin_muon)
        ban_doc['lich_su_muon'].append(thong_tin_muon.copy())
        sach['so_luong_con'] -= 1
        
        self.muon_tra.append({
            'ma_bd': ma_bd,
            'ten_bd': ban_doc['ten'],
            'ma_sach': ma_sach,
            'ten_sach': sach['ten'],
            'ngay_muon': ngay_muon,
            'ngay_tra_du_kien': ngay_tra_du_kien,
            'loai': 'muon'
        })
        
        print(f"✅ Đã cho mượn sách '{sach['ten']}'")
        print(f"📅 Ngày trả dự kiến: {ngay_tra_du_kien}")
    
    def tra_sach(self):
        """Trả sách"""
        print("\n📚 TRẢ SÁCH")
        print("-" * 30)
        
        ma_bd = input("Mã bạn đọc: ")
        if ma_bd not in self.ban_doc:
            print("❌ Không tìm thấy bạn đọc!")
            return
        
        ban_doc = self.ban_doc[ma_bd]
        sach_dang_muon = ban_doc['sach_dang_muon']
        
        if not sach_dang_muon:
            print("❌ Bạn đọc không mượn sách nào!")
            return
        
        print(f"Bạn đọc: {ban_doc['ten']}")
        print("Sách đang mượn:")
        
        for i, sach_muon in enumerate(sach_dang_muon):
            print(f"{i+1}. {sach_muon['ten_sach']} (Mã: {sach_muon['ma_sach']})")
            print(f"   Ngày mượn: {sach_muon['ngay_muon']}")
            print(f"   Ngày trả DK: {sach_muon['ngay_tra_du_kien']}")
        
        try:
            lua_chon = int(input("Chọn sách cần trả (số thứ tự): ")) - 1
            if lua_chon < 0 or lua_chon >= len(sach_dang_muon):
                print("❌ Lựa chọn không hợp lệ!")
                return
        except ValueError:
            print("❌ Vui lòng nhập số!")
            return
        
        # Thực hiện trả sách
        sach_tra = sach_dang_muon.pop(lua_chon)
        ma_sach = sach_tra['ma_sach']
        
        # Cập nhật số lượng sách
        self.sach[ma_sach]['so_luong_con'] += 1
        
        # Ghi nhận lịch sử trả
        ngay_tra = datetime.now().strftime("%Y-%m-%d")
        self.muon_tra.append({
            'ma_bd': ma_bd,
            'ten_bd': ban_doc['ten'],
            'ma_sach': ma_sach,
            'ten_sach': sach_tra['ten_sach'],
            'ngay_tra': ngay_tra,
            'loai': 'tra'
        })
        
        print(f"✅ Đã trả sách '{sach_tra['ten_sach']}'")
    
    def tim_kiem_sach(self):
        """Tìm kiếm sách"""
        print("\n🔍 TÌM KIẾM SÁCH")
        print("-" * 30)
        
        tu_khoa = input("Nhập từ khóa (tên sách/tác giả/thể loại): ").lower()
        
        ket_qua = []
        for ma_sach, thong_tin in self.sach.items():
            if (tu_khoa in thong_tin['ten'].lower() or
                tu_khoa in thong_tin['tac_gia'].lower() or
                tu_khoa in thong_tin['the_loai'].lower()):
                ket_qua.append((ma_sach, thong_tin))
        
        if not ket_qua:
            print("❌ Không tìm thấy sách nào!")
            return
        
        print(f"🔍 Tìm thấy {len(ket_qua)} sách:")
        print("-" * 80)
        print(f"{'Mã':<8} {'Tên sách':<30} {'Tác giả':<20} {'Còn lại':<10}")
        print("-" * 80)
        
        for ma_sach, thong_tin in ket_qua:
            print(f"{ma_sach:<8} {thong_tin['ten']:<30} "
                  f"{thong_tin['tac_gia']:<20} {thong_tin['so_luong_con']:<10}")
    
    def thong_ke(self):
        """Thống kê tổng quan"""
        print("\n📊 THỐNG KÊ TỔNG QUAN")
        print("=" * 50)
        
        # Thống kê sách
        tong_sach = len(self.sach)
        tong_so_luong = sum(s['so_luong'] for s in self.sach.values())
        sach_con_lai = sum(s['so_luong_con'] for s in self.sach.values())
        sach_dang_muon = tong_so_luong - sach_con_lai
        
        print(f"📚 SÁCH:")
        print(f"  Tổng đầu sách: {tong_sach}")
        print(f"  Tổng số lượng: {tong_so_luong}")
        print(f"  Đang được mượn: {sach_dang_muon}")
        print(f"  Còn lại: {sach_con_lai}")
        
        # Thống kê bạn đọc
        tong_ban_doc = len(self.ban_doc)
        ban_doc_dang_muon = sum(1 for bd in self.ban_doc.values() 
                               if bd['sach_dang_muon'])
        
        print(f"\n👤 BẠN ĐỌC:")
        print(f"  Tổng bạn đọc: {tong_ban_doc}")
        print(f"  Đang mượn sách: {ban_doc_dang_muon}")
        
        # Top sách được mượn nhiều
        thong_ke_muon = {}
        for giao_dich in self.muon_tra:
            if giao_dich['loai'] == 'muon':
                ma_sach = giao_dich['ma_sach']
                thong_ke_muon[ma_sach] = thong_ke_muon.get(ma_sach, 0) + 1
        
        if thong_ke_muon:
            print(f"\n🏆 TOP SÁCH ĐƯỢC MƯỢN NHIỀU:")
            sorted_books = sorted(thong_ke_muon.items(), 
                                key=lambda x: x[1], reverse=True)[:5]
            
            for i, (ma_sach, so_lan) in enumerate(sorted_books, 1):
                ten_sach = self.sach.get(ma_sach, {}).get('ten', 'N/A')
                print(f"  {i}. {ten_sach} ({so_lan} lần)")
    
    def menu_chinh(self):
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
            
            lua_chon = input("Chọn chức năng (0-7): ")
            
            if lua_chon == "0":
                print("💾 Đang lưu dữ liệu...")
                self.save_data()
                print("👋 Tạm biệt!")
                break
            elif lua_chon == "1":
                self.them_sach()
            elif lua_chon == "2":
                self.them_ban_doc()
            elif lua_chon == "3":
                self.muon_sach()
            elif lua_chon == "4":
                self.tra_sach()
            elif lua_chon == "5":
                self.tim_kiem_sach()
            elif lua_chon == "6":
                self.thong_ke()
            elif lua_chon == "7":
                self.save_data()
            else:
                print("❌ Lựa chọn không hợp lệ!")

# Demo hệ thống
def demo_quan_ly_thu_vien():
    """Demo hệ thống quản lý thư viện"""
    
    # Tạo dữ liệu mẫu
    thu_vien = QuanLyThuVien()
    
    # Thêm sách mẫu nếu chưa có
    if not thu_vien.sach:
        sach_mau = [
            ("PY001", "Học Python Cơ Bản", "Nguyễn Văn A", 2023, 5, "Lập trình"),
            ("PY002", "Python Nâng Cao", "Trần Thị B", 2023, 3, "Lập trình"),
            ("VL001", "Vật Lý Đại Cương", "Lê Văn C", 2022, 4, "Khoa học"),
            ("TH001", "Toán Học Cao Cấp", "Phạm Thị D", 2022, 6, "Toán học"),
        ]
        
        for ma, ten, tac_gia, nam, sl, the_loai in sach_mau:
            thu_vien.sach[ma] = {
                'ten': ten,
                'tac_gia': tac_gia,
                'nam_xb': nam,
                'so_luong': sl,
                'so_luong_con': sl,
                'the_loai': the_loai
            }
    
    # Thêm bạn đọc mẫu nếu chưa có
    if not thu_vien.ban_doc:
        ban_doc_mau = [
            ("BD001", "Nguyễn Văn An", 20, "0123456789", "Hà Nội"),
            ("BD002", "Trần Thị Bình", 21, "0987654321", "TP.HCM"),
        ]
        
        for ma, ten, tuoi, sdt, dia_chi in ban_doc_mau:
            thu_vien.ban_doc[ma] = {
                'ten': ten,
                'tuoi': tuoi,
                'sdt': sdt,
                'dia_chi': dia_chi,
                'sach_dang_muon': [],
                'lich_su_muon': []
            }
    
    print("📚 Hệ thống đã được khởi tạo với dữ liệu mẫu!")
    
    # Chạy menu chính
    thu_vien.menu_chinh()

if __name__ == "__main__":
    demo_quan_ly_thu_vien()
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
