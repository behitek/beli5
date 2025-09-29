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
def binh_phuong(x):
    return x * x

# ✅ Lambda - ngắn gọn và súc tích  
binh_phuong_lambda = lambda x: x * x

print(f"Function thường: {binh_phuong(5)}")      # 25
print(f"Lambda function: {binh_phuong_lambda(5)}") # 25
```

## 🔧 Cú pháp Lambda

```python
# Cú pháp cơ bản
# lambda arguments: expression

# Ví dụ đơn giản
cong = lambda a, b: a + b
print(f"2 + 3 = {cong(2, 3)}")  # 5

# Nhiều tham số
tinh_diem = lambda toan, ly, hoa: (toan + ly + hoa) / 3
print(f"Điểm TB: {tinh_diem(8, 9, 7):.1f}")  # 8.0

# Với điều kiện
max_value = lambda a, b: a if a > b else b
print(f"Max(10, 5) = {max_value(10, 5)}")  # 10

# Phức tạp hơn
kiem_tra_chan = lambda n: "Chẵn" if n % 2 == 0 else "Lẻ"
print(f"7 là số: {kiem_tra_chan(7)}")  # Lẻ
```

## 🎯 Lambda với Built-in Functions

### 1. Map() - Áp dụng hàm cho tất cả phần tử

```python
# Chuyển đổi danh sách số
so_list = [1, 2, 3, 4, 5]

# Bình phương tất cả số
binh_phuong_list = list(map(lambda x: x ** 2, so_list))
print(f"📊 Bình phương: {binh_phuong_list}")  # [1, 4, 9, 16, 25]

# Chuyển Celsius sang Fahrenheit
nhiet_do_c = [0, 20, 30, 37, 100]
nhiet_do_f = list(map(lambda c: (c * 9/5) + 32, nhiet_do_c))
print(f"🌡️ Celsius -> Fahrenheit:")
for c, f in zip(nhiet_do_c, nhiet_do_f):
    print(f"   {c}°C = {f}°F")

# Xử lý chuỗi
ten_list = ["nguyễn văn an", "trần thị bình", "lê văn cường"]
ten_format = list(map(lambda ten: ten.title(), ten_list))
print(f"✨ Formatted names: {ten_format}")
```

### 2. Filter() - Lọc phần tử

```python
# Lọc số chẵn
so_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
so_chan = list(filter(lambda x: x % 2 == 0, so_list))
print(f"🔢 Số chẵn: {so_chan}")  # [2, 4, 6, 8, 10]

# Lọc điểm cao
diem_list = [
    {"ten": "An", "diem": 8.5},
    {"ten": "Bình", "diem": 6.0},
    {"ten": "Cường", "diem": 9.2},
    {"ten": "Dung", "diem": 7.8}
]

hoc_sinh_gioi = list(filter(lambda sv: sv["diem"] >= 8.0, diem_list))
print("🌟 Học sinh giỏi:")
for sv in hoc_sinh_gioi:
    print(f"   👤 {sv['ten']}: {sv['diem']} điểm")

# Lọc chuỗi
tu_list = ["Python", "Java", "C++", "JavaScript", "Go", "Rust"]
tu_ngan = list(filter(lambda tu: len(tu) <= 4, tu_list))
print(f"📝 Từ ngắn (≤4 ký tự): {tu_ngan}")  # ['Java', 'C++', 'Go', 'Rust']
```

### 3. Reduce() - Kết hợp phần tử

```python
from functools import reduce

# Tính tổng
so_list = [1, 2, 3, 4, 5]
tong = reduce(lambda x, y: x + y, so_list)
print(f"➕ Tổng: {tong}")  # 15

# Tìm số lớn nhất
so_max = reduce(lambda x, y: x if x > y else y, so_list)
print(f"🔝 Max: {so_max}")  # 5

# Tính giai thừa
n = 5
giai_thua = reduce(lambda x, y: x * y, range(1, n + 1))
print(f"🧮 {n}! = {giai_thua}")  # 120

# Nối chuỗi
tu_list = ["Python", "is", "awesome"]
cau = reduce(lambda x, y: x + " " + y, tu_list)
print(f"📝 Câu: {cau}")  # Python is awesome
```

## 🎮 Lambda trong Sorting

```python
# Danh sách sinh viên
sinh_vien = [
    {"ten": "An", "tuoi": 20, "diem": 8.5},
    {"ten": "Bình", "tuoi": 19, "diem": 9.2},
    {"ten": "Cường", "tuoi": 21, "diem": 7.8},
    {"ten": "Dung", "tuoi": 20, "diem": 9.0}
]

print("👥 Danh sách gốc:")
for sv in sinh_vien:
    print(f"   {sv['ten']} - {sv['tuoi']} tuổi - {sv['diem']} điểm")

# Sắp xếp theo điểm (cao xuống thấp)
print("\n📊 Sắp xếp theo điểm (cao -> thấp):")
sorted_by_diem = sorted(sinh_vien, key=lambda sv: sv["diem"], reverse=True)
for sv in sorted_by_diem:
    print(f"   🏆 {sv['ten']}: {sv['diem']} điểm")

# Sắp xếp theo tuổi rồi theo tên
print("\n📅 Sắp xếp theo tuổi, sau đó theo tên:")
sorted_complex = sorted(sinh_vien, key=lambda sv: (sv["tuoi"], sv["ten"]))
for sv in sorted_complex:
    print(f"   👤 {sv['ten']} - {sv['tuoi']} tuổi")

# Sắp xếp chuỗi theo độ dài
tu_list = ["Python", "AI", "Machine Learning", "Data", "Science"]
sorted_by_length = sorted(tu_list, key=lambda s: len(s))
print(f"\n📏 Sắp xếp theo độ dài: {sorted_by_length}")
```

## 🚀 Lambda nâng cao

### 1. Lambda với Multiple Conditions

```python
# Phân loại học sinh
phan_loai = lambda diem: (
    "Xuất sắc" if diem >= 9 else
    "Giỏi" if diem >= 8 else  
    "Khá" if diem >= 7 else
    "Trung bình" if diem >= 5 else
    "Yếu"
)

diem_list = [9.5, 8.2, 7.8, 6.0, 4.5]
for diem in diem_list:
    print(f"📊 Điểm {diem}: {phan_loai(diem)}")

# Kiểm tra năm nhuận
nam_nhuan = lambda nam: nam % 4 == 0 and (nam % 100 != 0 or nam % 400 == 0)

nam_list = [2020, 2021, 2024, 1900, 2000]
for nam in nam_list:
    status = "nhuận" if nam_nhuan(nam) else "không nhuận"
    print(f"📅 Năm {nam}: {status}")
```

### 2. Lambda với Dictionary Operations

```python
# Xử lý dictionary với lambda
san_pham = [
    {"ten": "Laptop", "gia": 15000000, "so_luong": 5},
    {"ten": "Mouse", "gia": 200000, "so_luong": 20},
    {"ten": "Keyboard", "gia": 800000, "so_luong": 10},
    {"ten": "Monitor", "gia": 5000000, "so_luong": 3}
]

# Tính tổng giá trị kho
tong_gia_tri = sum(map(lambda sp: sp["gia"] * sp["so_luong"], san_pham))
print(f"💰 Tổng giá trị kho: {tong_gia_tri:,}đ")

# Lọc sản phẩm đắt tiền
sp_dat = list(filter(lambda sp: sp["gia"] >= 1000000, san_pham))
print("💎 Sản phẩm đắt tiền:")
for sp in sp_dat:
    print(f"   🛍️ {sp['ten']}: {sp['gia']:,}đ")

# Cập nhật giá (giảm 10%)
sp_giam_gia = list(map(
    lambda sp: {**sp, "gia": int(sp["gia"] * 0.9)}, 
    san_pham
))
print("🏷️ Sau khi giảm giá 10%:")
for sp in sp_giam_gia:
    print(f"   💸 {sp['ten']}: {sp['gia']:,}đ")
```

### 3. Lambda với String Processing

```python
# Xử lý văn bản
van_ban = [
    "Python là ngôn ngữ lập trình tuyệt vời",
    "Học Python rất dễ và thú vị", 
    "AI và Machine Learning với Python",
    "Web development bằng Python Django"
]

# Đếm từ trong mỗi câu
dem_tu = list(map(lambda cau: len(cau.split()), van_ban))
print("📝 Số từ trong mỗi câu:", dem_tu)

# Lọc câu có chứa "Python"
cau_python = list(filter(lambda cau: "Python" in cau, van_ban))
print("🐍 Câu chứa 'Python':")
for cau in cau_python:
    print(f"   📄 {cau}")

# Chuyển thành uppercase và lấy 3 từ đầu
processed = list(map(
    lambda cau: " ".join(cau.upper().split()[:3]), 
    van_ban
))
print("🔤 3 từ đầu (uppercase):")
for cau in processed:
    print(f"   📢 {cau}")
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
def tao_du_lieu_ban_hang():
    """Tạo dữ liệu bán hàng mẫu"""
    san_pham = ["Laptop", "Mouse", "Keyboard", "Monitor", "Headphone", "Webcam"]
    nhan_vien = ["An", "Bình", "Cường", "Dung", "Em"]
    
    du_lieu = []
    start_date = datetime.now() - timedelta(days=30)
    
    for i in range(200):  # 200 đơn hàng
        ngay = start_date + timedelta(days=random.randint(0, 30))
        don_hang = {
            "id": f"DH{i+1:03d}",
            "san_pham": random.choice(san_pham),
            "so_luong": random.randint(1, 5),
            "gia": random.randint(200000, 20000000),
            "nhan_vien": random.choice(nhan_vien),
            "ngay": ngay,
            "khach_vip": random.choice([True, False])
        }
        don_hang["tong_tien"] = don_hang["so_luong"] * don_hang["gia"]
        du_lieu.append(don_hang)
    
    return du_lieu

class DataAnalyzer:
    """Phân tích dữ liệu với Lambda functions"""
    
    def __init__(self, du_lieu):
        self.du_lieu = du_lieu
    
    def thong_ke_tong_quan(self):
        """Thống kê tổng quan"""
        print("📊 THỐNG KÊ TỔNG QUAN")
        print("="*50)
        
        # Tổng doanh thu
        tong_dt = sum(map(lambda dh: dh["tong_tien"], self.du_lieu))
        print(f"💰 Tổng doanh thu: {tong_dt:,}đ")
        
        # Số đơn hàng
        so_don = len(self.du_lieu)
        print(f"📦 Tổng số đơn: {so_don}")
        
        # Đơn hàng trung bình
        tb_don = tong_dt // so_don if so_don > 0 else 0
        print(f"📈 Giá trị TB/đơn: {tb_don:,}đ")
        
        # Đơn hàng lớn nhất
        don_max = max(self.du_lieu, key=lambda dh: dh["tong_tien"])
        print(f"🏆 Đơn lớn nhất: {don_max['id']} - {don_max['tong_tien']:,}đ")
    
    def top_san_pham(self, top_n=3):
        """Top sản phẩm bán chạy"""
        print(f"\n🏅 TOP {top_n} SẢN PHẨM BÁN CHẠY")
        print("="*50)
        
        # Nhóm theo sản phẩm
        sp_stats = defaultdict(lambda: {"so_luong": 0, "doanh_thu": 0})
        
        for dh in self.du_lieu:
            sp = dh["san_pham"]
            sp_stats[sp]["so_luong"] += dh["so_luong"]
            sp_stats[sp]["doanh_thu"] += dh["tong_tien"]
        
        # Sắp xếp theo doanh thu
        top_sp = sorted(
            sp_stats.items(),
            key=lambda item: item[1]["doanh_thu"],
            reverse=True
        )[:top_n]
        
        for i, (sp, stats) in enumerate(top_sp, 1):
            print(f"{i}. 🛍️ {sp}")
            print(f"   📦 Bán: {stats['so_luong']} sản phẩm")
            print(f"   💰 Doanh thu: {stats['doanh_thu']:,}đ")
    
    def phan_tich_nhan_vien(self):
        """Phân tích hiệu suất nhân viên"""
        print(f"\n👥 HIỆU SUẤT NHÂN VIÊN")
        print("="*50)
        
        # Nhóm theo nhân viên
        nv_stats = defaultdict(lambda: {"don_hang": 0, "doanh_thu": 0})
        
        for dh in self.du_lieu:
            nv = dh["nhan_vien"]
            nv_stats[nv]["don_hang"] += 1
            nv_stats[nv]["doanh_thu"] += dh["tong_tien"]
        
        # Sắp xếp theo doanh thu
        sorted_nv = sorted(
            nv_stats.items(),
            key=lambda item: item[1]["doanh_thu"],
            reverse=True
        )
        
        for nv, stats in sorted_nv:
            tb_don = stats["doanh_thu"] // stats["don_hang"] if stats["don_hang"] > 0 else 0
            print(f"👤 {nv}:")
            print(f"   📦 {stats['don_hang']} đơn hàng")
            print(f"   💰 {stats['doanh_thu']:,}đ")
            print(f"   📊 TB/đơn: {tb_don:,}đ")
    
    def loc_du_lieu(self):
        """Lọc và phân tích dữ liệu theo tiêu chí"""
        print(f"\n🔍 PHÂN TÍCH THEO TIÊU CHÍ")
        print("="*50)
        
        # Đơn hàng lớn (>= 5 triệu)
        don_lon = list(filter(lambda dh: dh["tong_tien"] >= 5000000, self.du_lieu))
        print(f"💎 Đơn hàng lớn (≥5tr): {len(don_lon)}/{len(self.du_lieu)}")
        
        if don_lon:
            dt_don_lon = sum(map(lambda dh: dh["tong_tien"], don_lon))
            print(f"   💰 Doanh thu từ đơn lớn: {dt_don_lon:,}đ")
        
        # Khách VIP
        don_vip = list(filter(lambda dh: dh["khach_vip"], self.du_lieu))
        print(f"⭐ Đơn hàng VIP: {len(don_vip)}/{len(self.du_lieu)}")
        
        if don_vip:
            dt_vip = sum(map(lambda dh: dh["tong_tien"], don_vip))
            print(f"   💰 Doanh thu từ VIP: {dt_vip:,}đ")
        
        # Đơn hàng tuần này
        today = datetime.now()
        tuan_truoc = today - timedelta(days=7)
        
        don_tuan = list(filter(
            lambda dh: dh["ngay"] >= tuan_truoc, 
            self.du_lieu
        ))
        print(f"📅 Đơn hàng 7 ngày qua: {len(don_tuan)}")
        
        if don_tuan:
            dt_tuan = sum(map(lambda dh: dh["tong_tien"], don_tuan))
            print(f"   💰 Doanh thu 7 ngày: {dt_tuan:,}đ")

# Chạy phân tích
print("🏪 HỆ THỐNG PHÂN TÍCH BÁN HÀNG")
print("Sử dụng Lambda Functions để xử lý dữ liệu\n")

# Tạo dữ liệu
du_lieu = tao_du_lieu_ban_hang()
print(f"📋 Đã tạo {len(du_lieu)} đơn hàng mẫu")

# Phân tích
analyzer = DataAnalyzer(du_lieu)
analyzer.thong_ke_tong_quan()
analyzer.top_san_pham(3)
analyzer.phan_tich_nhan_vien()
analyzer.loc_du_lieu()

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
