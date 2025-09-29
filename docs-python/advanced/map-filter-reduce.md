# 🎭 Map, Filter, Reduce - Bộ ba siêu anh hùng của Python

:::info
Map, Filter, Reduce giống như một nhóm siêu anh hùng - mỗi người có một sức mạnh đặc biệt để xử lý dữ liệu!
:::

## 🤔 Tại sao cần Map, Filter, Reduce?

Hãy tưởng tượng bạn có một danh sách sinh viên và cần:
- **Map** 🗺️: Chuyển đổi mỗi phần tử (như một máy biến đổi)
- **Filter** 🔍: Lọc các phần tử theo điều kiện (như một cái rây)  
- **Reduce** ⚡: Kết hợp tất cả thành một kết quả (như một máy nén)

```python
# Ví dụ minh họa
diem_so = [7, 8.5, 6, 9.2, 5.5, 8.8, 7.5]

# Map: Chuyển điểm thành thang 4
diem_thang_4 = list(map(lambda x: round(x / 2.5, 1), diem_so))
print(f"🗺️ Map - Thang 4.0: {diem_thang_4}")

# Filter: Lọc điểm >= 8
diem_cao = list(filter(lambda x: x >= 8, diem_so))  
print(f"🔍 Filter - Điểm cao: {diem_cao}")

# Reduce: Tính điểm trung bình
from functools import reduce
diem_tb = reduce(lambda x, y: x + y, diem_so) / len(diem_so)
print(f"⚡ Reduce - Điểm TB: {diem_tb:.1f}")
```

## 🗺️ MAP - Máy biến đổi thần kỳ

Map áp dụng một hàm cho **TẤT CẢ** phần tử trong iterable.

### Cú pháp và cách dùng

```python
# map(function, iterable)
# Trả về map object (cần convert thành list để xem)

# Ví dụ cơ bản
so_list = [1, 2, 3, 4, 5]

# Bình phương tất cả
binh_phuong = list(map(lambda x: x**2, so_list))
print(f"📊 Bình phương: {binh_phuong}")  # [1, 4, 9, 16, 25]

# Với function định sẵn
def chuyen_thanh_chu(so):
    chu_so = ["Không", "Một", "Hai", "Ba", "Bốn", "Năm"]
    return chu_so[so] if 0 <= so < len(chu_so) else str(so)

chu_list = list(map(chuyen_thanh_chu, so_list))
print(f"🔤 Thành chữ: {chu_list}")
```

### Map với nhiều iterables

```python
# Map với 2 lists
danh_sach_a = [1, 2, 3, 4]
danh_sach_b = [10, 20, 30, 40]

# Cộng từng cặp
tong_cac_cap = list(map(lambda x, y: x + y, danh_sach_a, danh_sach_b))
print(f"➕ Tổng các cặp: {tong_cac_cap}")  # [11, 22, 33, 44]

# Nhân từng cặp
nhan_cac_cap = list(map(lambda x, y: x * y, danh_sach_a, danh_sach_b))
print(f"✖️ Nhân các cặp: {nhan_cac_cap}")  # [10, 40, 90, 160]

# Map với 3 lists
ten_list = ["An", "Bình", "Cường"]
tuoi_list = [20, 19, 21]
diem_list = [8.5, 9.0, 7.8]

thong_tin = list(map(
    lambda ten, tuoi, diem: f"{ten} ({tuoi} tuổi) - {diem} điểm",
    ten_list, tuoi_list, diem_list
))
print("👥 Thông tin sinh viên:")
for tt in thong_tin:
    print(f"   📝 {tt}")
```

### Map với String processing

```python
# Xử lý chuỗi
cau_list = [
    "python là tuyệt vời",
    "học lập trình rất thú vị", 
    "ai và machine learning"
]

# Capitalize từng từ
cau_format = list(map(lambda cau: cau.title(), cau_list))
print("✨ Formatted sentences:")
for cau in cau_format:
    print(f"   📄 {cau}")

# Đếm từ trong mỗi câu
so_tu = list(map(lambda cau: len(cau.split()), cau_list))
print(f"📊 Số từ: {so_tu}")

# Thay thế từ khóa
thay_the = list(map(
    lambda cau: cau.replace("python", "Python 🐍").replace("ai", "AI 🤖"),
    cau_list
))
print("🔄 Sau khi thay thế:")
for cau in thay_the:
    print(f"   🎯 {cau}")
```

## 🔍 FILTER - Cái rây thông minh

Filter chỉ giữ lại những phần tử thỏa mãn điều kiện.

### Cú pháp và cách dùng

```python
# filter(function, iterable)
# function trả về True/False

# Lọc số chẵn
so_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
so_chan = list(filter(lambda x: x % 2 == 0, so_list))
print(f"🔢 Số chẵn: {so_chan}")  # [2, 4, 6, 8, 10]

# Lọc số nguyên tố đơn giản
def la_so_nguyen_to(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

so_nguyen_to = list(filter(la_so_nguyen_to, range(2, 30)))
print(f"🔍 Số nguyên tố < 30: {so_nguyen_to}")

# Lọc chuỗi không rỗng
chuoi_list = ["Python", "", "Java", "   ", "C++", None, "Go"]
chuoi_hop_le = list(filter(
    lambda s: s and s.strip(), 
    [s for s in chuoi_list if s is not None]
))
print(f"📝 Chuỗi hợp lệ: {chuoi_hop_le}")
```

### Filter với Objects

```python
# Danh sách sản phẩm
san_pham = [
    {"ten": "Laptop", "gia": 15000000, "ton_kho": 5, "loai": "electronics"},
    {"ten": "Mouse", "gia": 200000, "ton_kho": 0, "loai": "electronics"}, 
    {"ten": "Áo thun", "gia": 150000, "ton_kho": 20, "loai": "clothing"},
    {"ten": "Giày", "gia": 800000, "ton_kho": 8, "loai": "clothing"},
    {"ten": "Sách", "gia": 50000, "ton_kho": 15, "loai": "books"}
]

# Lọc sản phẩm còn hàng
con_hang = list(filter(lambda sp: sp["ton_kho"] > 0, san_pham))
print(f"📦 Sản phẩm còn hàng: {len(con_hang)}/{len(san_pham)}")

# Lọc sản phẩm electronics đắt tiền
electronics_dat = list(filter(
    lambda sp: sp["loai"] == "electronics" and sp["gia"] >= 500000,
    san_pham
))
print("💻 Electronics đắt tiền:")
for sp in electronics_dat:
    print(f"   🛍️ {sp['ten']}: {sp['gia']:,}đ")

# Lọc theo nhiều điều kiện
sp_ban_chay = list(filter(
    lambda sp: sp["ton_kho"] > 10 and sp["gia"] <= 500000,
    san_pham
))
print("🔥 Sản phẩm bán chạy (nhiều hàng + giá rẻ):")
for sp in sp_ban_chay:
    print(f"   ⭐ {sp['ten']}: {sp['gia']:,}đ (còn {sp['ton_kho']})")
```

## ⚡ REDUCE - Máy nén siêu mạnh

Reduce kết hợp tất cả phần tử thành một giá trị duy nhất.

### Cú pháp và cách dùng

```python
from functools import reduce

# reduce(function, iterable[, initializer])
# function nhận 2 tham số: accumulator và current_item

# Tính tổng
so_list = [1, 2, 3, 4, 5]
tong = reduce(lambda x, y: x + y, so_list)
print(f"➕ Tổng: {tong}")  # 15

# Tính tích
tich = reduce(lambda x, y: x * y, so_list)
print(f"✖️ Tích: {tich}")  # 120

# Tìm số lớn nhất
so_max = reduce(lambda x, y: x if x > y else y, so_list)
print(f"🔝 Max: {so_max}")  # 5

# Với initial value
tong_co_initial = reduce(lambda x, y: x + y, so_list, 100)
print(f"➕ Tổng + 100: {tong_co_initial}")  # 115
```

### Reduce nâng cao

```python
# Nối chuỗi
tu_list = ["Python", "is", "really", "awesome"]
cau = reduce(lambda x, y: x + " " + y, tu_list)
print(f"📝 Câu: {cau}")

# Tạo dictionary từ lists
keys = ["ten", "tuoi", "diem"]
values = ["An", 20, 8.5]
sinh_vien_dict = reduce(
    lambda d, kv: {**d, kv[0]: kv[1]},
    zip(keys, values),
    {}
)
print(f"👤 Sinh viên: {sinh_vien_dict}")

# Flatten nested list
nested_list = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
flat_list = reduce(lambda x, y: x + y, nested_list)
print(f"📋 Flattened: {flat_list}")

# Tính factorial
def factorial(n):
    if n <= 1:
        return 1
    return reduce(lambda x, y: x * y, range(1, n + 1))

print(f"🧮 5! = {factorial(5)}")  # 120
print(f"🧮 7! = {factorial(7)}")  # 5040
```

## 🎭 Kết hợp Map, Filter, Reduce

```python
# Dữ liệu bán hàng
ban_hang = [
    {"nhan_vien": "An", "don_hang": [100000, 200000, 150000]},
    {"nhan_vien": "Bình", "don_hang": [300000, 250000, 400000]},
    {"nhan_vien": "Cường", "don_hang": [180000, 220000]},
    {"nhan_vien": "Dung", "don_hang": [500000, 120000, 300000, 180000]}
]

print("🏪 Phân tích doanh số bán hàng")
print("="*50)

# Bước 1: Map - Tính tổng doanh thu mỗi nhân viên
nv_doanh_thu = list(map(
    lambda nv: {
        "ten": nv["nhan_vien"], 
        "tong_dt": sum(nv["don_hang"]),
        "so_don": len(nv["don_hang"])
    },
    ban_hang
))

for nv in nv_doanh_thu:
    print(f"👤 {nv['ten']}: {nv['tong_dt']:,}đ ({nv['so_don']} đơn)")

# Bước 2: Filter - Lọc nhân viên doanh thu cao
nv_xuat_sac = list(filter(
    lambda nv: nv["tong_dt"] >= 400000,
    nv_doanh_thu
))

print(f"\n🌟 Nhân viên xuất sắc (≥400k):")
for nv in nv_xuat_sac:
    tb_don = nv["tong_dt"] // nv["so_don"]
    print(f"   🏆 {nv['ten']}: {nv['tong_dt']:,}đ (TB: {tb_don:,}đ/đơn)")

# Bước 3: Reduce - Tính tổng doanh thu công ty
tong_cong_ty = reduce(
    lambda total, nv: total + nv["tong_dt"],
    nv_doanh_thu,
    0
)

print(f"\n💰 Tổng doanh thu công ty: {tong_cong_ty:,}đ")

# Combo: Tính phần trăm đóng góp
nv_phan_tram = list(map(
    lambda nv: {
        **nv,
        "phan_tram": round(nv["tong_dt"] / tong_cong_ty * 100, 1)
    },
    nv_doanh_thu
))

print(f"\n📊 Phần trăm đóng góp:")
for nv in nv_phan_tram:
    print(f"   📈 {nv['ten']}: {nv['phan_tram']}%")
```

## 🚀 Ví dụ thực tế: Xử lý dữ liệu học sinh

```python
# Dữ liệu học sinh
hoc_sinh = [
    {"ten": "Nguyễn Văn An", "lop": "10A", "mon": {"toan": 8, "ly": 7, "hoa": 9}},
    {"ten": "Trần Thị Bình", "lop": "10A", "mon": {"toan": 9, "ly": 8, "hoa": 8}},
    {"ten": "Lê Văn Cường", "lop": "10B", "mon": {"toan": 6, "ly": 7, "hoa": 6}},
    {"ten": "Phạm Thị Dung", "lop": "10B", "mon": {"toan": 9, "ly": 9, "hoa": 10}},
    {"ten": "Hoàng Văn Em", "lop": "10A", "mon": {"toan": 7, "ly": 6, "hoa": 8}}
]

class QuanLyHocSinh:
    """Quản lý học sinh với Map, Filter, Reduce"""
    
    def __init__(self, ds_hoc_sinh):
        self.hoc_sinh = ds_hoc_sinh
    
    def tinh_diem_tb(self):
        """Map: Tính điểm trung bình cho mỗi học sinh"""
        return list(map(
            lambda hs: {
                **hs,
                "diem_tb": round(sum(hs["mon"].values()) / len(hs["mon"]), 1)
            },
            self.hoc_sinh
        ))
    
    def loc_hoc_sinh_gioi(self, ds_co_diem_tb):
        """Filter: Lọc học sinh giỏi (≥8.0)"""
        return list(filter(
            lambda hs: hs["diem_tb"] >= 8.0,
            ds_co_diem_tb
        ))
    
    def thong_ke_lop(self, ds_co_diem_tb):
        """Thống kê theo lớp"""
        # Nhóm theo lớp
        lop_groups = {}
        for hs in ds_co_diem_tb:
            lop = hs["lop"]
            if lop not in lop_groups:
                lop_groups[lop] = []
            lop_groups[lop].append(hs)
        
        # Tính thống kê cho mỗi lớp
        thong_ke = {}
        for lop, ds_hs in lop_groups.items():
            # Map: lấy điểm TB của từng HS trong lớp
            diem_tb_lop = list(map(lambda hs: hs["diem_tb"], ds_hs))
            
            # Reduce: tính điểm TB lớp
            tb_lop = reduce(lambda x, y: x + y, diem_tb_lop) / len(diem_tb_lop)
            
            # Filter: đếm số HS giỏi trong lớp
            hs_gioi = list(filter(lambda hs: hs["diem_tb"] >= 8.0, ds_hs))
            
            thong_ke[lop] = {
                "so_hs": len(ds_hs),
                "diem_tb": round(tb_lop, 1),
                "hs_gioi": len(hs_gioi),
                "ty_le_gioi": round(len(hs_gioi) / len(ds_hs) * 100, 1)
            }
        
        return thong_ke
    
    def tim_mon_kho_nhat(self, ds_co_diem_tb):
        """Tìm môn khó nhất (điểm TB thấp nhất)"""
        # Map: lấy điểm từng môn của tất cả HS
        tat_ca_diem_mon = {}
        
        for hs in ds_co_diem_tb:
            for mon, diem in hs["mon"].items():
                if mon not in tat_ca_diem_mon:
                    tat_ca_diem_mon[mon] = []
                tat_ca_diem_mon[mon].append(diem)
        
        # Tính TB từng môn
        tb_cac_mon = {}
        for mon, danh_sach_diem in tat_ca_diem_mon.items():
            tb_mon = reduce(lambda x, y: x + y, danh_sach_diem) / len(danh_sach_diem)
            tb_cac_mon[mon] = round(tb_mon, 1)
        
        # Tìm môn có điểm thấp nhất
        mon_kho_nhat = reduce(
            lambda mon1, mon2: mon1 if tb_cac_mon[mon1] < tb_cac_mon[mon2] else mon2,
            tb_cac_mon.keys()
        )
        
        return mon_kho_nhat, tb_cac_mon

# Sử dụng hệ thống
ql = QuanLyHocSinh(hoc_sinh)

print("🎓 HỆ THỐNG QUẢN LÝ HỌC SINH")
print("="*50)

# Bước 1: Tính điểm TB
hs_co_diem_tb = ql.tinh_diem_tb()
print("📊 Điểm trung bình:")
for hs in hs_co_diem_tb:
    print(f"   👤 {hs['ten']}: {hs['diem_tb']} điểm")

# Bước 2: Lọc học sinh giỏi  
hs_gioi = ql.loc_hoc_sinh_gioi(hs_co_diem_tb)
print(f"\n🌟 Học sinh giỏi ({len(hs_gioi)}/{len(hoc_sinh)}):")
for hs in hs_gioi:
    print(f"   🏆 {hs['ten']} ({hs['lop']}): {hs['diem_tb']} điểm")

# Bước 3: Thống kê theo lớp
thong_ke_lop = ql.thong_ke_lop(hs_co_diem_tb)
print(f"\n📈 Thống kê theo lớp:")
for lop, stats in thong_ke_lop.items():
    print(f"   🏫 Lớp {lop}:")
    print(f"      👥 Số HS: {stats['so_hs']}")
    print(f"      📊 Điểm TB: {stats['diem_tb']}")
    print(f"      🌟 HS giỏi: {stats['hs_gioi']} ({stats['ty_le_gioi']}%)")

# Bước 4: Tìm môn khó nhất
mon_kho, tb_mon = ql.tim_mon_kho_nhat(hs_co_diem_tb)
print(f"\n📚 Thống kê môn học:")
for mon, tb in tb_mon.items():
    icon = "😰" if mon == mon_kho else "😊"
    print(f"   {icon} {mon.capitalize()}: {tb} điểm")
print(f"\n🎯 Môn khó nhất: {mon_kho.capitalize()} ({tb_mon[mon_kho]} điểm)")
```

## ⚡ Performance và Best Practices

```python
import time

def benchmark_processing():
    """So sánh hiệu suất các cách xử lý dữ liệu"""
    
    # Tạo dữ liệu lớn
    data = list(range(100000))
    
    print("⚡ BENCHMARK: Xử lý 100,000 số")
    print("="*50)
    
    # Cách 1: For loop truyền thống
    start = time.time()
    result1 = []
    for x in data:
        if x % 2 == 0:
            result1.append(x * x)
    time1 = time.time() - start
    
    # Cách 2: List comprehension
    start = time.time()
    result2 = [x * x for x in data if x % 2 == 0]
    time2 = time.time() - start
    
    # Cách 3: Map + Filter
    start = time.time()
    filtered = filter(lambda x: x % 2 == 0, data)
    result3 = list(map(lambda x: x * x, filtered))
    time3 = time.time() - start
    
    print(f"🐌 For loop:         {time1:.4f}s")
    print(f"🚀 List comprehension: {time2:.4f}s")
    print(f"🎭 Map + Filter:     {time3:.4f}s")
    
    # Verify results are same
    print(f"\n✅ Kết quả giống nhau: {result1 == result2 == result3}")
    print(f"📊 Số phần tử kết quả: {len(result1):,}")

benchmark_processing()

# Best Practices
print(f"\n📋 BEST PRACTICES")
print("="*50)
print("✅ Khi nào dùng Map/Filter/Reduce:")
print("   📌 Logic đơn giản, một dòng")
print("   📌 Functional programming style")  
print("   📌 Xử lý dữ liệu pipeline")
print("   📌 Làm việc với iterables")

print("\n✅ Khi nào dùng List Comprehension:")
print("   📌 Cần tạo list mới")
print("   📌 Logic phức tạp hơn lambda")
print("   📌 Dễ đọc và hiểu hơn")
print("   📌 Performance tốt hơn")

print("\n✅ Khi nào dùng For loop:")
print("   📌 Logic phức tạp, nhiều bước")
print("   📌 Cần side effects")
print("   📌 Dễ debug")
print("   📌 Có nhiều điều kiện phức tạp")
```

## 🎯 Tóm tắt

:::tip Nhớ 5 điều này về Map/Filter/Reduce:
1. **Map** 🗺️ - Biến đổi mỗi phần tử: `map(function, iterable)`
2. **Filter** 🔍 - Lọc phần tử theo điều kiện: `filter(function, iterable)`  
3. **Reduce** ⚡ - Kết hợp thành một giá trị: `reduce(function, iterable)`
4. **Lazy evaluation** - Chỉ tính khi cần (trừ reduce)
5. **Functional style** - Không thay đổi dữ liệu gốc
:::

Bộ ba Map, Filter, Reduce giúp bạn:
- 🎭 Functional programming style
- 🔄 Xử lý dữ liệu pipeline  
- 📊 Data transformation mạnh mẽ
- 🧹 Code sạch và dễ hiểu
- ⚡ Performance tối ưu cho nhiều case

**Bước tiếp theo**: Chúng ta đã hoàn thành phần Advanced! Hãy chuyển sang [Projects](../projects/) để thực hành những gì đã học!

---
*💡 Tip: Map/Filter/Reduce như ba anh em siêu nhân - hợp lực để xử lý mọi dữ liệu!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
