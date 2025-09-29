# 🎲 Generator trong Python - Tạo dữ liệu thông minh

:::info
Generator là như một chiếc máy sản xuất kẹo thông minh - chỉ tạo ra kẹo khi bạn cần, giúp tiết kiệm nguyên liệu và không gian!
:::

## 🤔 Generator là gì?

Generator giống như một người đầu bếp thông minh:
- **Regular function**: Như một đầu bếp làm sẵn 1000 món ăn rồi đưa cho bạn (tốn bộ nhớ!)
- **Generator**: Như một đầu bếp chỉ nấu món tiếp theo khi bạn đói (tiết kiệm bộ nhớ!)

```python
# ❌ Cách thường - tạo tất cả cùng lúc
def tao_so_binh_thuong():
    ket_qua = []
    for i in range(1000000):
        ket_qua.append(i * i)
    return ket_qua

# ✅ Generator - tạo từng cái một khi cần
def tao_so_generator():
    for i in range(1000000):
        yield i * i  # 🔑 Keyword "yield"
```

## 🛠️ Cách tạo Generator

### 1. Generator Function (với `yield`)

```python
def dem_so():
    print("🏁 Bắt đầu đếm!")
    yield 1
    print("📖 Tiếp tục đếm...")
    yield 2
    print("📚 Gần xong rồi...")
    yield 3
    print("🎉 Hoàn thành!")

# Sử dụng
bo_dem = dem_so()
print(next(bo_dem))  # 🏁 Bắt đầu đếm! \n 1
print(next(bo_dem))  # 📖 Tiếp tục đếm... \n 2
print(next(bo_dem))  # 📚 Gần xong rồi... \n 3
```

### 2. Generator Expression

```python
# Giống list comprehension nhưng dùng ()
binh_phuong = (x * x for x in range(5))
print(list(binh_phuong))  # [0, 1, 4, 9, 16]

# So sánh với list comprehension
list_binh_phuong = [x * x for x in range(5)]  # Tạo tất cả ngay
gen_binh_phuong = (x * x for x in range(5))   # Tạo khi cần
```

## 🎯 Ví dụ thực tế

### Đọc file lớn an toàn

```python
def doc_file_lon(ten_file):
    """
    Đọc file lớn từng dòng một
    Giống như đọc sách từng trang thay vì nuốt cả quyển!
    """
    try:
        with open(ten_file, 'r', encoding='utf-8') as file:
            for dong in file:
                yield dong.strip()
    except FileNotFoundError:
        print(f"❌ Không tìm thấy file: {ten_file}")

# Tạo file demo
with open('du_lieu_lon.txt', 'w', encoding='utf-8') as f:
    for i in range(1000):
        f.write(f"Dòng số {i}: Dữ liệu quan trọng\n")

# Sử dụng generator để đọc
print("🔍 Đọc 5 dòng đầu:")
bo_doc = doc_file_lon('du_lieu_lon.txt')
for i, dong in enumerate(bo_doc):
    if i >= 5:
        break
    print(f"  📝 {dong}")
```

### Tạo số Fibonacci vô hạn

```python
def fibonacci():
    """
    Tạo dãy Fibonacci vô tận
    Như một cỗ máy tạo số không bao giờ dừng!
    """
    a, b = 0, 1
    while True:  # Vô hạn!
        yield a
        a, b = b, a + b

# Sử dụng
print("🔢 10 số Fibonacci đầu tiên:")
fib = fibonacci()
for i in range(10):
    print(next(fib), end=" ")
print()

# Hoặc dùng với for loop
print("📊 Các số Fibonacci < 100:")
for so in fibonacci():
    if so >= 100:
        break
    print(so, end=" ")
print()
```

### Xử lý dữ liệu pipeline

```python
def lay_du_lieu():
    """Bước 1: Lấy dữ liệu thô"""
    du_lieu = [
        "Nguyễn Văn An - 85",
        "Trần Thị Bình - 92", 
        "Lê Văn Cường - 78",
        "Phạm Thị Dung - 95"
    ]
    for dong in du_lieu:
        yield dong

def xu_ly_du_lieu(generator):
    """Bước 2: Xử lý dữ liệu"""
    for dong in generator:
        ten, diem_str = dong.split(" - ")
        diem = int(diem_str)
        yield {"ten": ten, "diem": diem}

def loc_du_lieu(generator, diem_toi_thieu=80):
    """Bước 3: Lọc dữ liệu"""
    for sinh_vien in generator:
        if sinh_vien["diem"] >= diem_toi_thieu:
            yield sinh_vien

# Tạo pipeline xử lý
print("🏭 Pipeline xử lý dữ liệu:")
du_lieu_thô = lay_du_lieu()
du_lieu_xu_ly = xu_ly_du_lieu(du_lieu_thô)
du_lieu_loc = loc_du_lieu(du_lieu_xu_ly, 85)

print("🌟 Sinh viên giỏi (≥85 điểm):")
for sv in du_lieu_loc:
    print(f"  🎓 {sv['ten']}: {sv['diem']} điểm")
```

## 🎪 Generator với Class

```python
class QuanLyThuVien:
    def __init__(self):
        self.sach = [
            "Harry Potter và Hòn đá Phù thủy",
            "Dế Mèn Phiêu Lưu Ký", 
            "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
            "Nhà Giả Kim",
            "Doraemon - Tập 1"
        ]
    
    def __iter__(self):
        """Làm cho class có thể dùng trong for loop"""
        return self.doc_sach()
    
    def doc_sach(self):
        """Generator method"""
        for i, sach in enumerate(self.sach, 1):
            print(f"📖 Đang lấy sách thứ {i}...")
            yield sach
    
    def tim_sach(self, tu_khoa):
        """Tìm sách theo từ khóa"""
        for sach in self.sach:
            if tu_khoa.lower() in sach.lower():
                yield sach

# Sử dụng
thu_vien = QuanLyThuVien()

print("📚 Tất cả sách trong thư viện:")
for sach in thu_vien:
    print(f"  📖 {sach}")

print("\n🔍 Tìm sách có chữ 'Phiêu':")
for sach in thu_vien.tim_sach("Phiêu"):
    print(f"  ✨ {sach}")
```

## ⚡ Tại sao dùng Generator?

### 1. Tiết kiệm bộ nhớ

```python
import sys

# So sánh kích thước bộ nhớ
danh_sach = [x for x in range(1000000)]
generator = (x for x in range(1000000))

print(f"📊 List size: {sys.getsizeof(danh_sach):,} bytes")
print(f"📊 Generator size: {sys.getsizeof(generator):,} bytes")

# Generator nhỏ hơn hàng nghìn lần!
```

### 2. Xử lý dữ liệu lớn

```python
def xu_ly_file_csv_lon(ten_file):
    """
    Xử lý file CSV lớn mà không tốn nhiều RAM
    """
    def doc_csv():
        with open(ten_file, 'r', encoding='utf-8') as f:
            for dong in f:
                yield dong.strip().split(',')
    
    # Thống kê
    tong_dong = 0
    tong_gia_tri = 0
    
    for dong in doc_csv():
        if len(dong) >= 2 and dong[1].isdigit():
            tong_dong += 1
            tong_gia_tri += int(dong[1])
    
    return tong_dong, tong_gia_tri // tong_dong if tong_dong > 0 else 0

# Tạo file CSV demo
with open('du_lieu.csv', 'w', encoding='utf-8') as f:
    f.write("ten,diem,lop\n")
    for i in range(10000):
        f.write(f"SinhVien{i},{85 + i % 15},Lop{i % 10}\n")

dong, tb = xu_ly_file_csv_lon('du_lieu.csv')
print(f"📈 Xử lý {dong:,} dòng, điểm TB: {tb}")
```

## 🎮 Bài tập thực hành

### Bài 1: Máy tạo mật khẩu

```python
import random
import string

def tao_mat_khau(do_dai=8, bao_gom_so=True, bao_gom_ky_tu_dac_biet=True):
    """Generator tạo mật khẩu ngẫu nhiên"""
    while True:
        ky_tu = string.ascii_letters  # a-z, A-Z
        
        if bao_gom_so:
            ky_tu += string.digits  # 0-9
        
        if bao_gom_ky_tu_dac_biet:
            ky_tu += "!@#$%^&*"
        
        mat_khau = ''.join(random.choice(ky_tu) for _ in range(do_dai))
        yield mat_khau

# Test máy tạo mật khẩu
print("🔐 Máy tạo mật khẩu:")
may_tao = tao_mat_khau(12)
for i in range(5):
    print(f"  🔑 Mật khẩu {i+1}: {next(may_tao)}")
```

### Bài 2: Đếm từ trong text

```python
def dem_tu_trong_text(text):
    """Đếm số lần xuất hiện của mỗi từ"""
    from collections import defaultdict
    
    tu_dict = defaultdict(int)
    for tu in text.lower().split():
        # Loại bỏ dấu câu
        tu_sach = ''.join(c for c in tu if c.isalnum())
        if tu_sach:
            tu_dict[tu_sach] += 1
    
    # Generator trả về từ và số lần xuất hiện
    for tu, so_lan in sorted(tu_dict.items(), 
                            key=lambda x: x[1], 
                            reverse=True):
        yield tu, so_lan

# Test
van_ban = """
Python là ngôn ngữ lập trình tuyệt vời.
Python dễ học và Python rất mạnh mẽ.
Học Python sẽ giúp bạn làm nhiều việc thú vị.
"""

print("📝 Thống kê từ trong văn bản:")
for tu, so_lan in dem_tu_trong_text(van_ban):
    if so_lan > 1:  # Chỉ hiện từ xuất hiện > 1 lần
        print(f"  📊 '{tu}': {so_lan} lần")
```

## 🏆 Dự án: Hệ thống streaming dữ liệu

```python
import time
import random
from datetime import datetime

class DataStreamer:
    """
    Hệ thống streaming dữ liệu thời gian thực
    Giống như một đài phát thanh phát sóng liên tục!
    """
    
    def __init__(self):
        self.dang_chay = False
        
    def du_lieu_cam_bien(self):
        """Generator mô phỏng dữ liệu từ cảm biến"""
        self.dang_chay = True
        so_lan_doc = 0
        
        while self.dang_chay:
            nhiet_do = round(random.uniform(20, 35), 1)
            do_am = round(random.uniform(40, 80), 1)
            ap_suat = round(random.uniform(990, 1020), 1)
            
            du_lieu = {
                'timestamp': datetime.now().strftime('%H:%M:%S'),
                'nhiet_do': nhiet_do,
                'do_am': do_am, 
                'ap_suat': ap_suat,
                'lan_doc': so_lan_doc + 1
            }
            
            so_lan_doc += 1
            yield du_lieu
            time.sleep(1)  # Đọc mỗi giây
    
    def loc_du_lieu_bat_thuong(self, data_stream):
        """Lọc dữ liệu bất thường"""
        for du_lieu in data_stream:
            # Kiểm tra ngưỡng cảnh báo
            canh_bao = []
            
            if du_lieu['nhiet_do'] > 30:
                canh_bao.append("🌡️ Nhiệt độ cao")
            if du_lieu['do_am'] > 70:
                canh_bao.append("💧 Độ ẩm cao")
            if du_lieu['ap_suat'] < 1000:
                canh_bao.append("🌪️ Áp suất thấp")
            
            if canh_bao:
                du_lieu['canh_bao'] = canh_bao
                yield du_lieu
    
    def dung_stream(self):
        """Dừng streaming"""
        self.dang_chay = False

# Sử dụng hệ thống
print("🌡️ Hệ thống monitoring thời tiết:")
print("📊 Chỉ hiển thị dữ liệu bất thường...")
print("⏹️  Nhấn Ctrl+C để dừng\n")

streamer = DataStreamer()

try:
    # Tạo pipeline xử lý dữ liệu
    du_lieu_tho = streamer.du_lieu_cam_bien()
    du_lieu_loc = streamer.loc_du_lieu_bat_thuong(du_lieu_tho)
    
    for du_lieu in du_lieu_loc:
        print(f"⚠️  {du_lieu['timestamp']} - Lần đọc #{du_lieu['lan_doc']}")
        print(f"   🌡️ Nhiệt độ: {du_lieu['nhiet_do']}°C")
        print(f"   💧 Độ ẩm: {du_lieu['do_am']}%") 
        print(f"   🌪️ Áp suất: {du_lieu['ap_suat']} hPa")
        print(f"   🚨 Cảnh báo: {', '.join(du_lieu['canh_bao'])}")
        print("-" * 40)
        
        # Demo chỉ chạy 10 lần
        if du_lieu['lan_doc'] >= 20:
            break
            
except KeyboardInterrupt:
    print("\n👋 Dừng hệ thống monitoring!")
finally:
    streamer.dung_stream()
```

## 🎯 Tóm tắt

:::tip Nhớ 5 điều này về Generator:
1. **`yield`** thay cho `return` - tạo từng giá trị một
2. **Tiết kiệm bộ nhớ** - không tạo tất cả cùng lúc  
3. **Lazy evaluation** - chỉ tính khi cần
4. **Iterator protocol** - có thể dùng trong for loop
5. **Pipeline processing** - xử lý dữ liệu theo chuỗi
:::

Generator là công cụ siêu mạnh để:
- 🔋 Xử lý dữ liệu lớn hiệu quả
- 💾 Tiết kiệm bộ nhớ
- ⚡ Tạo infinite sequence  
- 🔄 Stream processing
- 🎭 Lazy loading

**Bước tiếp theo**: Học về [Context Managers](./context-managers.md) để quản lý tài nguyên một cách an toàn! 

---
*💡 Tip: Generator như một người bạn thông minh - chỉ đưa cho bạn những gì bạn cần, khi bạn cần!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
