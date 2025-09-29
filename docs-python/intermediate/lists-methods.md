---
sidebar_position: 5
title: "🛠️ Phương Thức Của List - Công Cụ Mạnh Mẽ Cho Danh Sách"
description: "Học các phương thức mạnh mẽ của danh sách Python: sort, reverse, copy, và nhiều hơn nữa. Biến danh sách thành công cụ siêu mạnh!"
keywords: ["python", "list methods", "sort", "reverse", "copy", "extend", "count", "index", "phương thức"]
---

# 🛠️ Phương Thức Của List - Công Cụ Mạnh Mẽ Cho Danh Sách

:::tip 🛠️ Ví Dụ Dễ Hiểu
Hãy tưởng tượng danh sách như một **hộp công cụ đa năng**! Mỗi phương thức (method) là một **công cụ chuyên biệt** giúp bạn sắp xếp, tìm kiếm, sao chép và biến đổi danh sách theo ý muốn!
:::

## 🤔 Phương Thức Là Gì?

**Phương thức (Method)** là những **chức năng đặc biệt** mà Python đã tích hợp sẵn cho danh sách. Thay vì bạn phải tự viết code phức tạp, chỉ cần gọi tên phương thức là xong!

```mermaid
graph LR
    A[📚 Danh Sách] --> B[🛠️ Phương Thức]
    B --> C[📊 sort() - Sắp xếp]
    B --> D[🔄 reverse() - Đảo ngược]
    B --> E[🔍 index() - Tìm vị trí]
    B --> F[📋 copy() - Sao chép]
    B --> G[➕ extend() - Mở rộng]
    
    style A fill:#FFE4B5
    style B fill:#98FB98
    style C fill:#87CEEB
    style D fill:#DDA0DD
    style E fill:#FFD700
    style F fill:#FFA07A
    style G fill:#90EE90
```

## 📊 Sắp Xếp Danh Sách

### 🔢 Sort - Sắp Xếp Tăng Dần

```python
# Sắp xếp số
diem_so = [8.5, 6.0, 9.5, 7.0, 8.0]
print("Trước khi sắp xếp:", diem_so)

diem_so.sort()  # Sắp xếp tại chỗ (in-place)
print("Sau khi sắp xếp:", diem_so)  # [6.0, 7.0, 8.0, 8.5, 9.5]

# Sắp xếp tên
ten_hoc_sinh = ["Châu", "An", "Bình", "Dung", "Em"]
print("Trước:", ten_hoc_sinh)

ten_hoc_sinh.sort()
print("Sau:", ten_hoc_sinh)  # ['An', 'Bình', 'Châu', 'Dung', 'Em']
```

### 📉 Sort Reverse - Sắp Xếp Giảm Dần

```python
# Sắp xếp từ cao xuống thấp
diem_so = [8.5, 6.0, 9.5, 7.0, 8.0]
diem_so.sort(reverse=True)
print("Điểm từ cao xuống thấp:", diem_so)  # [9.5, 8.5, 8.0, 7.0, 6.0]

# Sắp xếp tên theo thứ tự ngược alphabet
ten_hoc_sinh = ["An", "Bình", "Châu", "Dung", "Em"]
ten_hoc_sinh.sort(reverse=True)
print("Tên ngược alphabet:", ten_hoc_sinh)  # ['Em', 'Dung', 'Châu', 'Bình', 'An']
```

### 🎯 Sorted - Tạo Danh Sách Mới (Không Thay Đổi Gốc)

```python
# Danh sách gốc không thay đổi
diem_goc = [8.5, 6.0, 9.5, 7.0, 8.0]
diem_sap_xep = sorted(diem_goc)

print("Danh sách gốc:", diem_goc)        # [8.5, 6.0, 9.5, 7.0, 8.0]
print("Danh sách mới:", diem_sap_xep)    # [6.0, 7.0, 8.0, 8.5, 9.5]

# Sắp xếp giảm dần
diem_giam = sorted(diem_goc, reverse=True)
print("Sắp xếp giảm:", diem_giam)        # [9.5, 8.5, 8.0, 7.0, 6.0]
```

## 🔄 Đảo Ngược Danh Sách

### 🔃 Reverse - Đảo Ngược Tại Chỗ

```python
# Đảo ngược thứ tự
so_thu_tu = [1, 2, 3, 4, 5]
print("Trước:", so_thu_tu)

so_thu_tu.reverse()
print("Sau:", so_thu_tu)  # [5, 4, 3, 2, 1]

# Đảo ngược tên
ten_lop = ["An", "Bình", "Châu", "Dung"]
ten_lop.reverse()
print("Tên đảo ngược:", ten_lop)  # ['Dung', 'Châu', 'Bình', 'An']
```

### 🔄 Reversed - Tạo Iterator Đảo Ngược

```python
# Tạo iterator đảo ngược (không thay đổi gốc)
so_nguyen = [1, 2, 3, 4, 5]
so_dao_nguoc = list(reversed(so_nguyen))

print("Gốc:", so_nguyen)           # [1, 2, 3, 4, 5]
print("Đảo ngược:", so_dao_nguoc)  # [5, 4, 3, 2, 1]
```

## 📋 Sao Chép Danh Sách

### 📄 Copy - Tạo Bản Sao Nông

```python
# Tạo bản sao
danh_sach_goc = ["An", "Bình", "Châu"]
danh_sach_sao = danh_sach_goc.copy()

print("Gốc:", danh_sach_goc)
print("Sao:", danh_sach_sao)

# Thay đổi bản sao không ảnh hưởng gốc
danh_sach_sao.append("Dung")
print("Gốc sau khi thay đổi sao:", danh_sach_goc)  # ['An', 'Bình', 'Châu']
print("Sao sau khi thay đổi:", danh_sach_sao)      # ['An', 'Bình', 'Châu', 'Dung']
```

### 🔗 Các Cách Sao Chép Khác

```python
danh_sach_goc = [1, 2, 3, 4, 5]

# Cách 1: copy()
sao_1 = danh_sach_goc.copy()

# Cách 2: list()
sao_2 = list(danh_sach_goc)

# Cách 3: slicing
sao_3 = danh_sach_goc[:]

# Cách 4: list comprehension
sao_4 = [x for x in danh_sach_goc]

print("Tất cả bản sao giống nhau:", sao_1 == sao_2 == sao_3 == sao_4)  # True
```

## 🔍 Tìm Kiếm Nâng Cao

### 📍 Index - Tìm Vị Trí

```python
mon_hoc = ["Toán", "Lý", "Hóa", "Văn", "Anh", "Lý"]

# Tìm vị trí đầu tiên
vi_tri_ly = mon_hoc.index("Lý")
print(f"Lý ở vị trí: {vi_tri_ly}")  # 1

# Tìm với phạm vi
vi_tri_ly_2 = mon_hoc.index("Lý", 2)  # Tìm từ vị trí 2
print(f"Lý thứ 2 ở vị trí: {vi_tri_ly_2}")  # 5

# Xử lý lỗi khi không tìm thấy
try:
    vi_tri_sinh = mon_hoc.index("Sinh")
except ValueError:
    print("Không tìm thấy môn Sinh")
```

### 🔢 Count - Đếm Số Lần Xuất Hiện

```python
diem_thi = [8.5, 7.0, 8.5, 6.0, 8.5, 7.0, 9.0]

# Đếm số lần xuất hiện
so_lan_8_5 = diem_thi.count(8.5)
so_lan_7_0 = diem_thi.count(7.0)
so_lan_10 = diem_thi.count(10.0)

print(f"Điểm 8.5 xuất hiện {so_lan_8_5} lần")  # 3
print(f"Điểm 7.0 xuất hiện {so_lan_7_0} lần")  # 2
print(f"Điểm 10.0 xuất hiện {so_lan_10} lần")  # 0

# Đếm trong danh sách tên
ten_lop = ["An", "Bình", "An", "Châu", "An", "Dung"]
so_an = ten_lop.count("An")
print(f"Có {so_an} bạn tên An")  # 3
```

## ➕ Mở Rộng Danh Sách

### 🔗 Extend - Nối Nhiều Phần Tử

```python
# Danh sách ban đầu
mon_hoc_ky_1 = ["Toán", "Lý", "Hóa"]
mon_hoc_ky_2 = ["Văn", "Anh", "Sử"]

print("Học kỳ 1:", mon_hoc_ky_1)

# Nối danh sách học kỳ 2
mon_hoc_ky_1.extend(mon_hoc_ky_2)
print("Cả năm:", mon_hoc_ky_1)  # ['Toán', 'Lý', 'Hóa', 'Văn', 'Anh', 'Sử']

# Nối với danh sách khác
mon_hoc_them = ["Địa", "Sinh"]
mon_hoc_ky_1.extend(mon_hoc_them)
print("Đầy đủ:", mon_hoc_ky_1)
```

### 🆚 So Sánh Extend vs Append

```python
# Extend - thêm từng phần tử
danh_sach_1 = [1, 2, 3]
danh_sach_1.extend([4, 5])
print("Extend:", danh_sach_1)  # [1, 2, 3, 4, 5]

# Append - thêm toàn bộ như 1 phần tử
danh_sach_2 = [1, 2, 3]
danh_sach_2.append([4, 5])
print("Append:", danh_sach_2)  # [1, 2, 3, [4, 5]]
```

## 🎪 Ví Dụ Thực Tế: Hệ Thống Quản Lý Thư Viện

```python
# 📚 Hệ thống quản lý thư viện với các phương thức list
class ThuVien:
    def __init__(self):
        self.sach_co_san = []
        self.sach_da_muon = []
        self.nguoi_muon = []
    
    def them_sach_moi(self, ten_sach):
        """Thêm sách mới vào thư viện"""
        if ten_sach not in self.sach_co_san:
            self.sach_co_san.append(ten_sach)
            print(f"✅ Đã thêm sách: {ten_sach}")
        else:
            print(f"⚠️  Sách '{ten_sach}' đã có trong thư viện")
    
    def muon_sach(self, ten_sach, ten_nguoi):
        """Cho mượn sách"""
        if ten_sach in self.sach_co_san:
            # Chuyển sách từ có sẵn sang đã mượn
            self.sach_co_san.remove(ten_sach)
            self.sach_da_muon.append(ten_sach)
            self.nguoi_muon.append(ten_nguoi)
            print(f"📖 {ten_nguoi} đã mượn sách: {ten_sach}")
        else:
            print(f"❌ Sách '{ten_sach}' không có sẵn")
    
    def tra_sach(self, ten_sach):
        """Trả sách"""
        if ten_sach in self.sach_da_muon:
            vi_tri = self.sach_da_muon.index(ten_sach)
            nguoi_tra = self.nguoi_muon.pop(vi_tri)
            self.sach_da_muon.remove(ten_sach)
            self.sach_co_san.append(ten_sach)
            print(f"📚 {nguoi_tra} đã trả sách: {ten_sach}")
        else:
            print(f"❌ Sách '{ten_sach}' không có trong danh sách mượn")
    
    def hien_thi_sach_theo_loai(self):
        """Hiển thị sách theo loại"""
        print("\n📋 BÁO CÁO THƯ VIỆN")
        print("=" * 50)
        
        # Sắp xếp sách theo alphabet
        sach_co_san_sap_xep = sorted(self.sach_co_san)
        sach_da_muon_sap_xep = sorted(self.sach_da_muon)
        
        print(f"📚 Sách có sẵn ({len(sach_co_san_sap_xep)} cuốn):")
        for i, sach in enumerate(sach_co_san_sap_xep, 1):
            print(f"   {i}. {sach}")
        
        print(f"\n📖 Sách đã mượn ({len(sach_da_muon_sap_xep)} cuốn):")
        for i, sach in enumerate(sach_da_muon_sap_xep, 1):
            print(f"   {i}. {sach}")
    
    def tim_sach(self, tu_khoa):
        """Tìm sách theo từ khóa"""
        ket_qua = []
        tu_khoa_lower = tu_khoa.lower()
        
        # Tìm trong sách có sẵn
        for sach in self.sach_co_san:
            if tu_khoa_lower in sach.lower():
                ket_qua.append(f"📚 {sach} (có sẵn)")
        
        # Tìm trong sách đã mượn
        for sach in self.sach_da_muon:
            if tu_khoa_lower in sach.lower():
                ket_qua.append(f"📖 {sach} (đã mượn)")
        
        if ket_qua:
            print(f"🔍 Kết quả tìm kiếm '{tu_khoa}':")
            for ket_qua_item in ket_qua:
                print(f"   {ket_qua_item}")
        else:
            print(f"😅 Không tìm thấy sách nào chứa '{tu_khoa}'")
    
    def thong_ke(self):
        """Thống kê thư viện"""
        print("\n📊 THỐNG KÊ THƯ VIỆN")
        print("=" * 30)
        print(f"📚 Tổng số sách: {len(self.sach_co_san) + len(self.sach_da_muon)}")
        print(f"📖 Sách có sẵn: {len(self.sach_co_san)}")
        print(f"📋 Sách đã mượn: {len(self.sach_da_muon)}")
        
        if self.nguoi_muon:
            # Đếm số lần mượn của mỗi người
            nguoi_muon_unique = list(set(self.nguoi_muon))
            print(f"👥 Số người đang mượn: {len(nguoi_muon_unique)}")
            
            # Tìm người mượn nhiều nhất
            so_lan_muon = [self.nguoi_muon.count(nguoi) for nguoi in nguoi_muon_unique]
            max_muon = max(so_lan_muon)
            nguoi_muon_nhieu_nhat = nguoi_muon_unique[so_lan_muon.index(max_muon)]
            print(f"🏆 Người mượn nhiều nhất: {nguoi_muon_nhieu_nhat} ({max_muon} cuốn)")

# Sử dụng hệ thống thư viện
thu_vien = ThuVien()

# Thêm sách
sach_moi = ["Python Programming", "Data Science", "Machine Learning", "Web Development", "Python Programming"]
for sach in sach_moi:
    thu_vien.them_sach_moi(sach)

# Mượn sách
thu_vien.muon_sach("Python Programming", "An")
thu_vien.muon_sach("Data Science", "Bình")
thu_vien.muon_sach("Machine Learning", "Châu")

# Hiển thị trạng thái
thu_vien.hien_thi_sach_theo_loai()

# Tìm kiếm
thu_vien.tim_sach("Python")

# Thống kê
thu_vien.thong_ke()
```

## 🎯 Bài Tập Thực Hành

### 🥇 Bài Tập 1: Sắp Xếp Điểm Số

```python
# TODO: Tạo chương trình sắp xếp và phân tích điểm số
import random

# Tạo danh sách điểm ngẫu nhiên
diem_so = [random.uniform(5.0, 10.0) for _ in range(20)]
diem_so = [round(diem, 1) for diem in diem_so]  # Làm tròn 1 chữ số

print("📊 PHÂN TÍCH ĐIỂM SỐ LỚP HỌC")
print("=" * 40)

# Hiển thị điểm gốc
print("Điểm gốc:", diem_so)

# Tạo bản sao để sắp xếp
diem_tang = diem_so.copy()
diem_giam = diem_so.copy()

# Sắp xếp tăng dần
diem_tang.sort()
print(f"\n📈 Điểm tăng dần: {diem_tang}")

# Sắp xếp giảm dần
diem_giam.sort(reverse=True)
print(f"📉 Điểm giảm dần: {diem_giam}")

# Thống kê
print(f"\n📊 THỐNG KÊ:")
print(f"   Điểm cao nhất: {max(diem_so)}")
print(f"   Điểm thấp nhất: {min(diem_so)}")
print(f"   Điểm trung bình: {sum(diem_so)/len(diem_so):.1f}")

# Đếm theo mức điểm
diem_gioi = [d for d in diem_so if d >= 8.0]
diem_kha = [d for d in diem_so if 6.5 <= d < 8.0]
diem_tb = [d for d in diem_so if 5.0 <= d < 6.5]
diem_yeu = [d for d in diem_so if d < 5.0]

print(f"   Giỏi (≥8.0): {len(diem_gioi)} HS")
print(f"   Khá (6.5-7.9): {len(diem_kha)} HS")
print(f"   TB (5.0-6.4): {len(diem_tb)} HS")
print(f"   Yếu (<5.0): {len(diem_yeu)} HS")
```

### 🥈 Bài Tập 2: Game Đoán Từ

```python
# TODO: Tạo game đoán từ với danh sách từ vựng
import random

# Danh sách từ vựng
tu_vung = [
    "python", "programming", "computer", "algorithm", "function",
    "variable", "loop", "condition", "string", "number",
    "list", "dictionary", "class", "object", "method"
]

# Chọn từ ngẫu nhiên
tu_can_doan = random.choice(tu_vung)
tu_da_doan = []
so_lan_thu = 0
so_lan_thu_toi_da = len(tu_can_doan) + 3

print("🎯 GAME ĐOÁN TỪ VỰNG LẬP TRÌNH")
print("=" * 40)
print(f"Từ có {len(tu_can_doan)} chữ cái")
print(f"Bạn có {so_lan_thu_toi_da} lần đoán")
print("Gõ 'quit' để thoát")
print("-" * 40)

while so_lan_thu < so_lan_thu_toi_da:
    so_lan_thu += 1
    print(f"\n🔤 Lần thử {so_lan_thu}/{so_lan_thu_toi_da}")
    
    # Hiển thị từ đã đoán
    if tu_da_doan:
        print(f"Từ đã đoán: {', '.join(tu_da_doan)}")
    
    # Nhập từ đoán
    tu_doan = input("Nhập từ bạn đoán: ").lower().strip()
    
    if tu_doan == 'quit':
        print("👋 Tạm biệt!")
        break
    
    if tu_doan == tu_can_doan:
        print("🎉 CHÍNH XÁC! Bạn đã đoán đúng!")
        print(f"🏆 Từ đúng là: {tu_can_doan.upper()}")
        print(f"📊 Số lần thử: {so_lan_thu}")
        
        # Đánh giá
        if so_lan_thu <= 3:
            print("🌟 XUẤT SẮC! Bạn thật giỏi!")
        elif so_lan_thu <= 5:
            print("👍 RẤT TỐT! Kỹ năng ổn định!")
        else:
            print("😊 KHÔNG SAO! Lần sau sẽ tốt hơn!")
        break
    
    elif tu_doan in tu_da_doan:
        print("⚠️  Bạn đã đoán từ này rồi!")
        so_lan_thu -= 1  # Không tính lần thử này
    
    elif len(tu_doan) != len(tu_can_doan):
        print(f"❌ Từ phải có {len(tu_can_doan)} chữ cái!")
        so_lan_thu -= 1
    
    elif tu_doan not in tu_vung:
        print("❌ Từ này không có trong danh sách từ vựng!")
        so_lan_thu -= 1
    
    else:
        tu_da_doan.append(tu_doan)
        
        # Đếm số chữ cái đúng vị trí
        so_chu_dung = 0
        for i in range(len(tu_can_doan)):
            if tu_doan[i] == tu_can_doan[i]:
                so_chu_dung += 1
        
        print(f"📊 Có {so_chu_dung}/{len(tu_can_doan)} chữ cái đúng vị trí")
        
        if so_chu_dung == 0:
            print("😅 Chưa có chữ cái nào đúng vị trí!")
        elif so_chu_dung < len(tu_can_doan) // 2:
            print("🤔 Một vài chữ cái đúng, cố gắng thêm!")
        else:
            print("🔥 Gần đúng rồi, cố lên!")

else:
    print(f"\n💔 HẾT LƯỢT! Từ đúng là: {tu_can_doan.upper()}")
    print("🎯 Lần sau hãy thử chiến lược khác nhé!")

# Hiển thị tất cả từ đã đoán
if tu_da_doan:
    print(f"\n📝 Tất cả từ đã đoán: {', '.join(tu_da_doan)}")
```

### 🥉 Bài Tập 3: Quản Lý Danh Sách Nhạc

```python
# TODO: Tạo ứng dụng quản lý playlist nhạc
class PlaylistManager:
    def __init__(self):
        self.playlist = []
        self.artists = []
        self.genres = []
    
    def them_bai_hat(self, ten_bai, ca_si, the_loai):
        """Thêm bài hát mới"""
        bai_hat = {
            'ten': ten_bai,
            'ca_si': ca_si,
            'the_loai': the_loai
        }
        
        if bai_hat not in self.playlist:
            self.playlist.append(bai_hat)
            if ca_si not in self.artists:
                self.artists.append(ca_si)
            if the_loai not in self.genres:
                self.genres.append(the_loai)
            print(f"✅ Đã thêm: {ten_bai} - {ca_si}")
        else:
            print(f"⚠️  Bài hát đã có trong playlist")
    
    def xoa_bai_hat(self, ten_bai):
        """Xóa bài hát"""
        for i, bai in enumerate(self.playlist):
            if bai['ten'].lower() == ten_bai.lower():
                bai_da_xoa = self.playlist.pop(i)
                print(f"🗑️  Đã xóa: {bai_da_xoa['ten']} - {bai_da_xoa['ca_si']}")
                return
        print(f"❌ Không tìm thấy bài hát: {ten_bai}")
    
    def sap_xep_theo_ten(self):
        """Sắp xếp theo tên bài hát"""
        self.playlist.sort(key=lambda x: x['ten'].lower())
        print("📝 Đã sắp xếp theo tên bài hát")
    
    def sap_xep_theo_ca_si(self):
        """Sắp xếp theo tên ca sĩ"""
        self.playlist.sort(key=lambda x: x['ca_si'].lower())
        print("🎤 Đã sắp xếp theo tên ca sĩ")
    
    def tim_bai_hat(self, tu_khoa):
        """Tìm bài hát theo từ khóa"""
        ket_qua = []
        tu_khoa_lower = tu_khoa.lower()
        
        for bai in self.playlist:
            if (tu_khoa_lower in bai['ten'].lower() or 
                tu_khoa_lower in bai['ca_si'].lower() or 
                tu_khoa_lower in bai['the_loai'].lower()):
                ket_qua.append(bai)
        
        if ket_qua:
            print(f"🔍 Tìm thấy {len(ket_qua)} bài hát:")
            for bai in ket_qua:
                print(f"   🎵 {bai['ten']} - {bai['ca_si']} ({bai['the_loai']})")
        else:
            print(f"😅 Không tìm thấy bài hát nào chứa '{tu_khoa}'")
    
    def loc_theo_the_loai(self, the_loai):
        """Lọc bài hát theo thể loại"""
        bai_theo_loai = [bai for bai in self.playlist if bai['the_loai'].lower() == the_loai.lower()]
        
        if bai_theo_loai:
            print(f"🎭 Bài hát thể loại '{the_loai}':")
            for bai in bai_theo_loai:
                print(f"   🎵 {bai['ten']} - {bai['ca_si']}")
        else:
            print(f"😅 Không có bài hát nào thuộc thể loại '{the_loai}'")
    
    def hien_thi_playlist(self):
        """Hiển thị toàn bộ playlist"""
        if not self.playlist:
            print("📝 Playlist trống")
            return
        
        print(f"\n🎵 PLAYLIST ({len(self.playlist)} bài)")
        print("=" * 50)
        
        for i, bai in enumerate(self.playlist, 1):
            print(f"{i:2d}. {bai['ten']} - {bai['ca_si']} ({bai['the_loai']})")
    
    def thong_ke(self):
        """Thống kê playlist"""
        if not self.playlist:
            print("📊 Playlist trống, không có thống kê")
            return
        
        print("\n📊 THỐNG KÊ PLAYLIST")
        print("=" * 30)
        print(f"🎵 Tổng số bài: {len(self.playlist)}")
        print(f"🎤 Số ca sĩ: {len(self.artists)}")
        print(f"🎭 Số thể loại: {len(self.genres)}")
        
        # Thống kê theo thể loại
        the_loai_count = {}
        for bai in self.playlist:
            the_loai = bai['the_loai']
            the_loai_count[the_loai] = the_loai_count.get(the_loai, 0) + 1
        
        print(f"\n🎭 Phân bố theo thể loại:")
        for the_loai, so_luong in sorted(the_loai_count.items()):
            print(f"   {the_loai}: {so_luong} bài")

# Sử dụng PlaylistManager
playlist = PlaylistManager()

# Thêm một số bài hát mẫu
bai_hat_mau = [
    ("Shape of You", "Ed Sheeran", "Pop"),
    ("Blinding Lights", "The Weeknd", "Pop"),
    ("Watermelon Sugar", "Harry Styles", "Pop"),
    ("Levitating", "Dua Lipa", "Pop"),
    ("Good 4 U", "Olivia Rodrigo", "Pop Rock"),
    ("Industry Baby", "Lil Nas X", "Hip Hop"),
    ("Stay", "The Kid LAROI", "Pop"),
    ("Heat Waves", "Glass Animals", "Indie"),
    ("Bad Habits", "Ed Sheeran", "Pop"),
    ("Peaches", "Justin Bieber", "Pop")
]

for ten, ca_si, the_loai in bai_hat_mau:
    playlist.them_bai_hat(ten, ca_si, the_loai)

# Hiển thị playlist
playlist.hien_thi_playlist()

# Thống kê
playlist.thong_ke()

# Tìm kiếm
playlist.tim_bai_hat("Ed")

# Lọc theo thể loại
playlist.loc_theo_the_loai("Pop")

# Sắp xếp
playlist.sap_xep_theo_ten()
playlist.hien_thi_playlist()
```

## 🎊 Tóm Tắt

Trong bài này, bạn đã học được:

✅ **Sắp xếp danh sách** - `sort()`, `sorted()`, `reverse=True`  
✅ **Đảo ngược** - `reverse()`, `reversed()`  
✅ **Sao chép** - `copy()`, `list()`, slicing  
✅ **Tìm kiếm nâng cao** - `index()`, `count()`  
✅ **Mở rộng** - `extend()` vs `append()`  
✅ **Ứng dụng thực tế** - Thư viện, playlist, game  

## 🚀 Bước Tiếp Theo

Tuyệt vời! Bây giờ bạn đã thành thạo **tất cả công cụ mạnh mẽ** của danh sách! Tiếp theo, chúng ta sẽ học về [Dictionaries (Từ Điển)](/python/intermediate/dictionaries) - cấu trúc dữ liệu **key-value** siêu mạnh mẽ!

:::tip 🎯 Thử Thách Nhỏ
Hãy thử tạo một "hệ thống quản lý điểm danh lớp học" sử dụng tất cả phương thức list! Cho phép điểm danh, xem danh sách có mặt/vắng mặt, thống kê tỷ lệ chuyên cần, và tìm kiếm học sinh!
:::

---

*🔗 **Bài tiếp theo**: [Dictionaries - Cấu Trúc Key-Value Siêu Mạnh](/python/intermediate/dictionaries)*
