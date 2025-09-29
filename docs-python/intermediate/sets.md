---
sidebar_position: 10
title: "🎯 Sets - Cấu Trúc Dữ Liệu Loại Bỏ Trùng Lặp"
description: "Học về sets trong Python: cấu trúc dữ liệu unique, các phép toán tập hợp, và ứng dụng thực tế. Sets như những túi ma thuật loại bỏ trùng lặp!"
keywords: ["python", "set", "unique", "tập hợp", "union", "intersection", "difference", "symmetric_difference"]
---

# 🎯 Sets - Cấu Trúc Dữ Liệu Loại Bỏ Trùng Lặp

:::tip 🎯 Ví Dụ Dễ Hiểu
Hãy tưởng tượng Set như một **túi ma thuật**! Khi bạn bỏ đồ vào, nó tự động **loại bỏ những thứ trùng lặp**. Bạn có 3 quả táo, 2 quả cam, 3 quả táo nữa → trong túi chỉ còn 1 quả táo và 1 quả cam!
:::

## 🤔 Set Là Gì?

**Set** là cấu trúc dữ liệu chứa các phần tử **duy nhất** (unique) và **không có thứ tự**. Set rất hữu ích để:
- 🎯 Loại bỏ trùng lặp
- 🔍 Tìm kiếm nhanh
- 🧮 Thực hiện phép toán tập hợp

```mermaid
graph LR
    A[📦 List: 1,2,3,2,1] --> B[🎯 Set: 1,2,3]
    C[📋 Dict: a,b,c,b,a] --> D[🎯 Set: a,b,c]
    E[🔍 Tìm kiếm] --> F[⚡ O(1) - Siêu nhanh]
    G[🧮 Phép toán] --> H[∪ ∩ - Δ]
    
    style A fill:#FFB6C1
    style B fill:#98FB98
    style C fill:#FFB6C1
    style D fill:#98FB98
    style F fill:#87CEEB
    style H fill:#DDA0DD
```

### 🆚 So Sánh Với Các Cấu Trúc Khác

```python
# List - có thể trùng lặp, có thứ tự
danh_sach = [1, 2, 3, 2, 1, 3]
print("List:", danh_sach)  # [1, 2, 3, 2, 1, 3]

# Set - không trùng lặp, không thứ tự
tap_hop = {1, 2, 3, 2, 1, 3}
print("Set:", tap_hop)     # {1, 2, 3} hoặc {2, 1, 3} (thứ tự ngẫu nhiên)

# Tuple - có thể trùng lặp, có thứ tự, không thay đổi
tuple_co_dinh = (1, 2, 3, 2, 1)
print("Tuple:", tuple_co_dinh)  # (1, 2, 3, 2, 1)
```

## 🎯 Tạo Set

### 📌 Cách Tạo Cơ Bản

```python
# Cách 1: Dùng dấu ngoặc nhọn
set_1 = {1, 2, 3, 4, 5}
set_2 = {"An", "Bình", "Châu"}

# Cách 2: Dùng set()
set_3 = set([1, 2, 3, 4, 5])
set_4 = set("Python")  # {'P', 'y', 't', 'h', 'o', 'n'}

# Set rỗng (phải dùng set(), không dùng {})
set_rong = set()

# Từ string - loại bỏ ký tự trùng lặp
chuoi = "hello world"
set_ky_tu = set(chuoi)
print("Ký tự unique:", set_ky_tu)  # {'h', 'e', 'l', 'o', ' ', 'w', 'r', 'd'}

# Từ list - loại bỏ phần tử trùng lặp
danh_sach = [1, 2, 3, 2, 1, 4, 3, 5]
set_so = set(danh_sach)
print("Số unique:", set_so)  # {1, 2, 3, 4, 5}
```

### 🎨 Các Kiểu Dữ Liệu Trong Set

```python
# Set hỗn hợp
set_hon_hop = {1, "Python", 3.14, True, (1, 2, 3)}

# Set không thể chứa list hoặc dict (vì chúng mutable)
# set_sai = {1, [2, 3]}  # ❌ Lỗi!

# Set có thể chứa tuple (vì tuple immutable)
set_tot = {1, (2, 3), "Python"}

print("Set hỗn hợp:", set_hon_hop)
print("Set với tuple:", set_tot)
```

## 🔍 Truy Cập và Thao Tác

### ➕ Thêm và Xóa Phần Tử

```python
# Tạo set
so_thich = {"đọc sách", "nghe nhạc"}

# Thêm phần tử
so_thich.add("xem phim")
so_thich.add("chơi game")
print("Sau khi thêm:", so_thich)

# Thêm nhiều phần tử
so_thich.update(["du lịch", "nấu ăn", "vẽ tranh"])
print("Sau khi update:", so_thich)

# Xóa phần tử
so_thich.remove("nghe nhạc")  # Xóa, nếu không có sẽ lỗi
so_thich.discard("không có")  # Xóa, nếu không có không lỗi
print("Sau khi xóa:", so_thich)

# Xóa ngẫu nhiên
phan_tu_ngau_nhien = so_thich.pop()
print(f"Phần tử ngẫu nhiên: {phan_tu_ngau_nhien}")
print("Set còn lại:", so_thich)

# Xóa tất cả
so_thich.clear()
print("Set sau khi clear:", so_thich)
```

### 🔍 Kiểm Tra và Tìm Kiếm

```python
# Tạo set
mon_hoc = {"Toán", "Lý", "Hóa", "Văn", "Anh"}

# Kiểm tra có tồn tại
print("Có môn Toán?", "Toán" in mon_hoc)      # True
print("Có môn Sử?", "Sử" in mon_hoc)          # False

# Độ dài
print("Số môn học:", len(mon_hoc))            # 5

# Kiểm tra set con
mon_khoa_hoc = {"Toán", "Lý", "Hóa"}
mon_xa_hoi = {"Văn", "Sử", "Địa"}

print("Môn khoa học có trong danh sách?", mon_khoa_hoc.issubset(mon_hoc))  # True
print("Môn xã hội có trong danh sách?", mon_xa_hoi.issubset(mon_hoc))      # False
```

## 🧮 Phép Toán Tập Hợp

### 🔗 Union - Hợp

```python
# Tạo 2 set
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

# Union - hợp (tất cả phần tử từ cả 2 set)
hop_1 = set_a.union(set_b)
hop_2 = set_a | set_b  # Toán tử

print("Set A:", set_a)
print("Set B:", set_b)
print("Hợp (union):", hop_1)  # {1, 2, 3, 4, 5, 6, 7, 8}
print("Hợp (|):", hop_2)      # {1, 2, 3, 4, 5, 6, 7, 8}
```

### 🎯 Intersection - Giao

```python
# Giao - chỉ những phần tử có trong cả 2 set
giao_1 = set_a.intersection(set_b)
giao_2 = set_a & set_b  # Toán tử

print("Giao (intersection):", giao_1)  # {4, 5}
print("Giao (&):", giao_2)             # {4, 5}
```

### ➖ Difference - Hiệu

```python
# Hiệu - phần tử có trong A nhưng không có trong B
hieu_1 = set_a.difference(set_b)
hieu_2 = set_a - set_b  # Toán tử

print("Hiệu (difference):", hieu_1)  # {1, 2, 3}
print("Hiệu (-):", hieu_2)           # {1, 2, 3}
```

### ⚡ Symmetric Difference - Hiệu Đối Xứng

```python
# Hiệu đối xứng - phần tử có trong A hoặc B nhưng không có trong cả hai
hieu_doi_xung_1 = set_a.symmetric_difference(set_b)
hieu_doi_xung_2 = set_a ^ set_b  # Toán tử

print("Hiệu đối xứng (symmetric_difference):", hieu_doi_xung_1)  # {1, 2, 3, 6, 7, 8}
print("Hiệu đối xứng (^):", hieu_doi_xung_2)                    # {1, 2, 3, 6, 7, 8}
```

## 🎪 Ví Dụ Thực Tế: Hệ Thống Quản Lý Thành Viên

```python
# 👥 Hệ thống quản lý thành viên với sets
class QuanLyThanhVien:
    def __init__(self):
        self.thanh_vien = set()
        self.thanh_vien_vip = set()
        self.thanh_vien_moi = set()
        self.so_thich_chung = set()
    
    def them_thanh_vien(self, ten, la_vip=False, la_moi=False, *so_thich):
        """Thêm thành viên mới"""
        self.thanh_vien.add(ten)
        
        if la_vip:
            self.thanh_vien_vip.add(ten)
        
        if la_moi:
            self.thanh_vien_moi.add(ten)
        
        # Thêm sở thích vào sở thích chung
        for thich in so_thich:
            self.so_thich_chung.add(thich)
        
        print(f"✅ Đã thêm thành viên: {ten}")
        if so_thich:
            print(f"   Sở thích: {', '.join(so_thich)}")
    
    def xoa_thanh_vien(self, ten):
        """Xóa thành viên"""
        if ten in self.thanh_vien:
            self.thanh_vien.discard(ten)
            self.thanh_vien_vip.discard(ten)
            self.thanh_vien_moi.discard(ten)
            print(f"🗑️  Đã xóa thành viên: {ten}")
        else:
            print(f"❌ Không tìm thấy thành viên: {ten}")
    
    def tim_thanh_vien_chung(self, *ten_thanh_vien):
        """Tìm thành viên chung trong các nhóm"""
        if not ten_thanh_vien:
            return set()
        
        # Tìm giao của tất cả set
        ket_qua = set(ten_thanh_vien[0])
        for ten in ten_thanh_vien[1:]:
            ket_qua = ket_qua.intersection(set(ten))
        
        return ket_qua
    
    def thong_ke_thanh_vien(self):
        """Thống kê thành viên"""
        print("\n📊 THỐNG KÊ THÀNH VIÊN")
        print("=" * 40)
        
        print(f"👥 Tổng thành viên: {len(self.thanh_vien)}")
        print(f"⭐ Thành viên VIP: {len(self.thanh_vien_vip)}")
        print(f"🆕 Thành viên mới: {len(self.thanh_vien_moi)}")
        
        # Thành viên vừa VIP vừa mới
        vip_moi = self.thanh_vien_vip.intersection(self.thanh_vien_moi)
        print(f"🌟 VIP + Mới: {len(vip_moi)}")
        
        # Thành viên thường
        thuong = self.thanh_vien - self.thanh_vien_vip
        print(f"👤 Thành viên thường: {len(thuong)}")
        
        # Sở thích phổ biến
        print(f"🎯 Sở thích chung: {len(self.so_thich_chung)} loại")
    
    def hien_thi_thanh_vien(self):
        """Hiển thị danh sách thành viên"""
        if not self.thanh_vien:
            print("👥 Chưa có thành viên nào")
            return
        
        print("\n👥 DANH SÁCH THÀNH VIÊN")
        print("=" * 50)
        
        # Tất cả thành viên
        print("Tất cả thành viên:")
        for i, ten in enumerate(sorted(self.thanh_vien), 1):
            loai = []
            if ten in self.thanh_vien_vip:
                loai.append("VIP")
            if ten in self.thanh_vien_moi:
                loai.append("Mới")
            
            loai_str = f" ({', '.join(loai)})" if loai else ""
            print(f"   {i:2d}. {ten}{loai_str}")
        
        # Thành viên VIP
        if self.thanh_vien_vip:
            print(f"\n⭐ Thành viên VIP ({len(self.thanh_vien_vip)}):")
            for ten in sorted(self.thanh_vien_vip):
                print(f"   • {ten}")
        
        # Thành viên mới
        if self.thanh_vien_moi:
            print(f"\n🆕 Thành viên mới ({len(self.thanh_vien_moi)}):")
            for ten in sorted(self.thanh_vien_moi):
                print(f"   • {ten}")
        
        # Sở thích chung
        if self.so_thich_chung:
            print(f"\n🎯 Sở thích chung ({len(self.so_thich_chung)}):")
            for thich in sorted(self.so_thich_chung):
                print(f"   • {thich}")
    
    def tim_thanh_vien_theo_so_thich(self, so_thich_can_tim):
        """Tìm thành viên có sở thích cụ thể"""
        # Giả sử chúng ta có thông tin sở thích của từng thành viên
        # Trong thực tế, cần lưu thông tin này
        print(f"🔍 Tìm thành viên có sở thích: {so_thich_can_tim}")
        print("(Chức năng này cần mở rộng để lưu sở thích cá nhân)")

# Sử dụng hệ thống
quan_ly = QuanLyThanhVien()

# Thêm thành viên
quan_ly.them_thanh_vien("Nguyễn Văn An", la_vip=True, "lập trình", "đọc sách")
quan_ly.them_thanh_vien("Trần Thị Bình", la_moi=True, "vẽ tranh", "nghe nhạc")
quan_ly.them_thanh_vien("Lê Văn Châu", la_vip=True, la_moi=True, "lập trình", "chơi game")
quan_ly.them_thanh_vien("Phạm Thị Dung", "nấu ăn", "du lịch")
quan_ly.them_thanh_vien("Hoàng Văn Em", la_moi=True, "thể thao", "đọc sách")

# Hiển thị thông tin
quan_ly.hien_thi_thanh_vien()
quan_ly.thong_ke_thanh_vien()

# Tìm thành viên chung
print(f"\n🔍 TÌM KIẾM")
print("=" * 30)

# Thành viên vừa VIP vừa mới
vip_moi = quan_ly.thanh_vien_vip.intersection(quan_ly.thanh_vien_moi)
print(f"Thành viên vừa VIP vừa mới: {vip_moi}")

# Thành viên không phải VIP
thuong = quan_ly.thanh_vien - quan_ly.thanh_vien_vip
print(f"Thành viên thường: {thuong}")

# Tất cả loại thành viên
tat_ca_loai = quan_ly.thanh_vien_vip.union(quan_ly.thanh_vien_moi)
print(f"Tất cả VIP và mới: {tat_ca_loai}")
```

## 🎯 Bài Tập Thực Hành

### 🥇 Bài Tập 1: Hệ Thống Quản Lý Từ Vựng

```python
# TODO: Tạo hệ thống quản lý từ vựng với sets
def tao_tu_dien_tu_vung():
    """Tạo từ điển từ vựng với sets"""
    
    # Set chứa tất cả từ vựng
    tu_vung_tat_ca = set()
    
    # Set chứa từ vựng theo chủ đề
    tu_vung_chu_de = {
        "lập trình": set(),
        "toán học": set(),
        "khoa học": set(),
        "nghệ thuật": set(),
        "thể thao": set()
    }
    
    # Set chứa từ vựng theo độ khó
    tu_vung_do_kho = {
        "dễ": set(),
        "trung bình": set(),
        "khó": set()
    }
    
    return tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho

def them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, tu, chu_de, do_kho):
    """Thêm từ vựng mới"""
    tu_vung_tat_ca.add(tu)
    
    if chu_de in tu_vung_chu_de:
        tu_vung_chu_de[chu_de].add(tu)
    
    if do_kho in tu_vung_do_kho:
        tu_vung_do_kho[do_kho].add(tu)
    
    print(f"✅ Đã thêm từ: {tu} ({chu_de}, {do_kho})")

def tim_tu_vung_chung(tu_vung_chu_de, *chu_de_list):
    """Tìm từ vựng chung giữa các chủ đề"""
    if not chu_de_list:
        return set()
    
    # Tìm giao của tất cả chủ đề
    ket_qua = tu_vung_chu_de[chu_de_list[0]].copy()
    for chu_de in chu_de_list[1:]:
        if chu_de in tu_vung_chu_de:
            ket_qua = ket_qua.intersection(tu_vung_chu_de[chu_de])
    
    return ket_qua

def thong_ke_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho):
    """Thống kê từ vựng"""
    print("\n📊 THỐNG KÊ TỪ VỰNG")
    print("=" * 40)
    
    print(f"📚 Tổng từ vựng: {len(tu_vung_tat_ca)}")
    
    print(f"\n🎯 Theo chủ đề:")
    for chu_de, tu_set in tu_vung_chu_de.items():
        print(f"   {chu_de}: {len(tu_set)} từ")
    
    print(f"\n📈 Theo độ khó:")
    for do_kho, tu_set in tu_vung_do_kho.items():
        print(f"   {do_kho}: {len(tu_set)} từ")
    
    # Từ vựng phổ biến (có trong nhiều chủ đề)
    tu_pho_bien = set()
    for chu_de, tu_set in tu_vung_chu_de.items():
        tu_pho_bien = tu_pho_bien.union(tu_set)
    
    print(f"\n🌟 Từ vựng phổ biến: {len(tu_pho_bien)} từ")

def hien_thi_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho):
    """Hiển thị từ vựng"""
    print("\n📚 TỪ VỰNG THEO CHỦ ĐỀ")
    print("=" * 50)
    
    for chu_de, tu_set in tu_vung_chu_de.items():
        if tu_set:
            print(f"\n🎯 {chu_de.upper()} ({len(tu_set)} từ):")
            for tu in sorted(tu_set):
                print(f"   • {tu}")
    
    print(f"\n📈 TỪ VỰNG THEO ĐỘ KHÓ")
    print("=" * 30)
    
    for do_kho, tu_set in tu_vung_do_kho.items():
        if tu_set:
            print(f"\n{do_kho.upper()} ({len(tu_set)} từ):")
            for tu in sorted(tu_set):
                print(f"   • {tu}")

# Sử dụng hệ thống
tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho = tao_tu_dien_tu_vung()

# Thêm từ vựng
them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, "variable", "lập trình", "dễ")
them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, "function", "lập trình", "trung bình")
them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, "algorithm", "lập trình", "khó")
them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, "equation", "toán học", "trung bình")
them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, "calculus", "toán học", "khó")
them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, "gravity", "khoa học", "trung bình")
them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, "quantum", "khoa học", "khó")
them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, "painting", "nghệ thuật", "dễ")
them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, "sculpture", "nghệ thuật", "trung bình")
them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, "football", "thể thao", "dễ")
them_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho, "basketball", "thể thao", "dễ")

# Hiển thị thông tin
hien_thi_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho)
thong_ke_tu_vung(tu_vung_tat_ca, tu_vung_chu_de, tu_vung_do_kho)

# Tìm từ vựng chung
print(f"\n🔍 TÌM KIẾM")
print("=" * 30)

# Từ vựng khó
tu_kho = tu_vung_do_kho["khó"]
print(f"Từ vựng khó: {tu_kho}")

# Từ vựng chung giữa lập trình và toán học
tu_chung = tim_tu_vung_chung(tu_vung_chu_de, "lập trình", "toán học")
print(f"Từ chung (lập trình + toán): {tu_chung}")

# Từ vựng chỉ có trong một chủ đề
tu_rieng_lap_trinh = tu_vung_chu_de["lập trình"] - tu_vung_chu_de["toán học"] - tu_vung_chu_de["khoa học"]
print(f"Từ riêng lập trình: {tu_rieng_lap_trinh}")
```

### 🥈 Bài Tập 2: Game Đoán Từ Với Sets

```python
# TODO: Tạo game đoán từ với sets
import random

def tao_game_doan_tu():
    """Tạo game đoán từ với sets"""
    
    # Set chứa tất cả từ
    tu_tat_ca = {
        "python", "programming", "computer", "algorithm", "function",
        "variable", "loop", "condition", "string", "number",
        "list", "dictionary", "class", "object", "method"
    }
    
    # Set chứa từ đã đoán
    tu_da_doan = set()
    
    # Set chứa ký tự đã đoán
    ky_tu_da_doan = set()
    
    return tu_tat_ca, tu_da_doan, ky_tu_da_doan

def chon_tu_ngau_nhien(tu_tat_ca):
    """Chọn từ ngẫu nhiên"""
    return random.choice(list(tu_tat_ca))

def hien_thi_tu_an(tu_can_doan, ky_tu_da_doan):
    """Hiển thị từ ẩn với ký tự đã đoán"""
    hien_thi = ""
    for ky_tu in tu_can_doan:
        if ky_tu in ky_tu_da_doan:
            hien_thi += ky_tu
        else:
            hien_thi += "_"
    return hien_thi

def kiem_tra_ky_tu(tu_can_doan, ky_tu):
    """Kiểm tra ký tự có trong từ không"""
    return ky_tu in tu_can_doan

def tinh_diem(tu_can_doan, so_lan_thu, ky_tu_da_doan):
    """Tính điểm dựa trên hiệu suất"""
    so_ky_tu_dung = len(ky_tu_da_doan.intersection(set(tu_can_doan)))
    so_ky_tu_sai = len(ky_tu_da_doan - set(tu_can_doan))
    
    diem_co_ban = len(tu_can_doan) * 10
    diem_bo_sung = so_ky_tu_dung * 5
    diem_tru = so_ky_tu_sai * 2
    diem_tru_lan_thu = so_lan_thu * 1
    
    diem_tong = diem_co_ban + diem_bo_sung - diem_tru - diem_tru_lan_thu
    return max(0, diem_tong)

def game_doan_tu():
    """Game đoán từ chính"""
    print("🎮 GAME ĐOÁN TỪ VỰNG LẬP TRÌNH")
    print("=" * 50)
    
    tu_tat_ca, tu_da_doan, ky_tu_da_doan = tao_game_doan_tu()
    tu_can_doan = chon_tu_ngau_nhien(tu_tat_ca)
    so_lan_thu = 0
    so_lan_thu_toi_da = len(tu_can_doan) + 5
    
    print(f"Từ có {len(tu_can_doan)} chữ cái")
    print(f"Bạn có {so_lan_thu_toi_da} lần đoán")
    print("Gõ 'quit' để thoát, 'hint' để gợi ý")
    print("-" * 50)
    
    while so_lan_thu < so_lan_thu_toi_da:
        so_lan_thu += 1
        
        # Hiển thị từ ẩn
        tu_an = hien_thi_tu_an(tu_can_doan, ky_tu_da_doan)
        print(f"\n🔤 Lần thử {so_lan_thu}/{so_lan_thu_toi_da}")
        print(f"Từ: {tu_an}")
        
        # Hiển thị ký tự đã đoán
        if ky_tu_da_doan:
            ky_tu_str = ", ".join(sorted(ky_tu_da_doan))
            print(f"Ký tự đã đoán: {ky_tu_str}")
        
        # Nhập ký tự
        try:
            nhap = input("Nhập ký tự hoặc từ: ").lower().strip()
            
            if nhap == 'quit':
                print("👋 Tạm biệt!")
                break
            
            if nhap == 'hint':
                # Gợi ý: hiển thị một ký tự chưa đoán
                ky_tu_chua_doan = set(tu_can_doan) - ky_tu_da_doan
                if ky_tu_chua_doan:
                    ky_tu_gợi_ý = random.choice(list(ky_tu_chua_doan))
                    print(f"💡 Gợi ý: Từ có chứa ký tự '{ky_tu_gợi_ý}'")
                else:
                    print("💡 Bạn đã đoán hết ký tự rồi!")
                so_lan_thu -= 1
                continue
            
            # Kiểm tra từ hoàn chỉnh
            if len(nhap) > 1:
                if nhap == tu_can_doan:
                    print("🎉 CHÍNH XÁC! Bạn đã đoán đúng từ!")
                    diem = tinh_diem(tu_can_doan, so_lan_thu, ky_tu_da_doan)
                    print(f"🏆 Điểm: {diem}")
                    break
                else:
                    print("❌ Từ không đúng!")
                    continue
            
            # Kiểm tra ký tự
            if len(nhap) == 1:
                if nhap in ky_tu_da_doan:
                    print("⚠️  Bạn đã đoán ký tự này rồi!")
                    so_lan_thu -= 1
                    continue
                
                ky_tu_da_doan.add(nhap)
                
                if kiem_tra_ky_tu(tu_can_doan, nhap):
                    print("✅ Đúng! Ký tự có trong từ")
                    
                    # Kiểm tra đã đoán hết chưa
                    if set(tu_can_doan).issubset(ky_tu_da_doan):
                        print("🎉 HOÀN THÀNH! Bạn đã đoán hết ký tự!")
                        diem = tinh_diem(tu_can_doan, so_lan_thu, ky_tu_da_doan)
                        print(f"🏆 Điểm: {diem}")
                        break
                else:
                    print("❌ Sai! Ký tự không có trong từ")
            else:
                print("❌ Vui lòng nhập 1 ký tự hoặc từ hoàn chỉnh!")
                so_lan_thu -= 1
        
        except KeyboardInterrupt:
            print("\n👋 Tạm biệt!")
            break
    
    else:
        print(f"\n💔 HẾT LƯỢT! Từ đúng là: {tu_can_doan}")
        diem = tinh_diem(tu_can_doan, so_lan_thu, ky_tu_da_doan)
        print(f"🏆 Điểm: {diem}")

# Chạy game
game_doan_tu()
```

## 🎊 Tóm Tắt

Trong bài này, bạn đã học được:

✅ **Set là gì** - Cấu trúc dữ liệu unique, không thứ tự  
✅ **Tạo set** - `{}`, `set()`, từ list/string  
✅ **Thao tác cơ bản** - `add()`, `remove()`, `discard()`, `clear()`  
✅ **Phép toán tập hợp** - Union, Intersection, Difference, Symmetric Difference  
✅ **Ứng dụng thực tế** - Quản lý thành viên, từ vựng, game  
✅ **Tối ưu tìm kiếm** - O(1) lookup time  

## 🚀 Bước Tiếp Theo

Tuyệt vời! Bây giờ bạn đã hoàn thành **tất cả cấu trúc dữ liệu cơ bản** của Python! Tiếp theo, chúng ta sẽ tạo [Guessing Game Project](/python/projects/guessing-game) - một dự án thú vị áp dụng tất cả kiến thức đã học!

:::tip 🎯 Thử Thách Nhỏ
Hãy thử tạo một "hệ thống quản lý thẻ thành viên" sử dụng sets! Mỗi thành viên có thể có nhiều thẻ (VIP, Student, Senior), tìm thành viên có thẻ chung, và thống kê các loại thẻ!
:::

---

*🔗 **Dự án tiếp theo**: [Guessing Game - Dự Án Thứ Hai](/python/projects/guessing-game)*
