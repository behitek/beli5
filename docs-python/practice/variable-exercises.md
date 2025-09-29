# Bài Tập Về Biến (Variables)

## Giới Thiệu

Biến như những chiếc hộp đựng đồ trong phòng của bạn. Mỗi chiếc hộp có tên riêng và chứa những thứ khác nhau. Trong Python, biến giúp chúng ta lưu trữ thông tin để sử dụng sau này.

## Bài Tập 1: Tạo Biến Đơn Giản

**Đề bài:** Tạo các biến để lưu thông tin cá nhân của bạn

```python
# Giải pháp
ten = "Nguyễn Văn An"
tuoi = 20
chieu_cao = 1.75
la_hoc_sinh = True

print(f"Tên: {ten}")
print(f"Tuổi: {tuoi}")
print(f"Chiều cao: {chieu_cao}m")
print(f"Là học sinh: {la_hoc_sinh}")
```

**Giải thích:**
- `ten` là biến kiểu string (chuỗi) - như nhãn dán trên hộp
- `tuoi` là biến kiểu integer (số nguyên) - như đếm kẹo trong hộp
- `chieu_cao` là biến kiểu float (số thập phân) - như đo nước trong cốc
- `la_hoc_sinh` là biến kiểu boolean (đúng/sai) - như công tắc bật/tắt

## Bài Tập 2: Hoán Đổi Giá Trị

**Đề bài:** Hoán đổi giá trị của hai biến như đổi chỗ đồ trong hai chiếc hộp

```python
# Giải pháp
a = 10
b = 20

print(f"Trước khi đổi: a = {a}, b = {b}")

# Cách 1: Sử dụng biến tạm (như dùng hộp thứ 3)
temp = a
a = b
b = temp

print(f"Sau khi đổi (cách 1): a = {a}, b = {b}")

# Khôi phục để thử cách 2
a, b = 10, 20

# Cách 2: Python magic (như phép thuật Python)
a, b = b, a

print(f"Sau khi đổi (cách 2): a = {a}, b = {b}")
```

**Giải thích:**
- Cách 1 giống như dùng hộp thứ 3 để chuyển đồ
- Cách 2 là tính năng đặc biệt của Python - rất tiện lợi!

## Bài Tập 3: Tính Toán Với Biến

**Đề bài:** Tính diện tích và chu vi hình chữ nhật

```python
# Giải pháp
import math

# Nhập dữ liệu
chieu_dai = float(input("Nhập chiều dài: "))
chieu_rong = float(input("Nhập chiều rộng: "))

# Tính toán
dien_tich = chieu_dai * chieu_rong
chu_vi = 2 * (chieu_dai + chieu_rong)
duong_cheo = math.sqrt(chieu_dai**2 + chieu_rong**2)

# Hiển thị kết quả
print(f"\n--- THÔNG TIN HÌNH CHỮ NHẬT ---")
print(f"Chiều dài: {chieu_dai}")
print(f"Chiều rộng: {chieu_rong}")
print(f"Diện tích: {dien_tich}")
print(f"Chu vi: {chu_vi}")
print(f"Đường chéo: {duong_cheo:.2f}")
```

**Giải thích:**
- Biến giúp lưu trữ kết quả tính toán
- `:.2f` làm tròn số thập phân đến 2 chữ số

## Bài Tập 4: Kiểu Dữ Liệu Khác Nhau

**Đề bài:** Thực hành với nhiều kiểu dữ liệu khác nhau

```python
# Giải pháp
# Số nguyên (int) - như đếm táo
so_tao = 5
print(f"Số táo: {so_tao} (kiểu: {type(so_tao)})")

# Số thập phân (float) - như đo nước
luong_nuoc = 3.14
print(f"Lượng nước: {luong_nuoc} lít (kiểu: {type(luong_nuoc)})")

# Chuỗi (string) - như ghi chú
ghi_chu = "Hôm nay trời đẹp"
print(f"Ghi chú: {ghi_chu} (kiểu: {type(ghi_chu)})")

# Boolean - như công tắc
den_bat = True
print(f"Đèn bật: {den_bat} (kiểu: {type(den_bat)})")

# Danh sách (list) - như giỏ đựng nhiều thứ
gio_hang = ["táo", "cam", "chuối"]
print(f"Giỏ hàng: {gio_hang} (kiểu: {type(gio_hang)})")
```

## Bài Tập 5: Chuyển Đổi Kiểu Dữ Liệu

**Đề bài:** Chuyển đổi giữa các kiểu dữ liệu

```python
# Giải pháp
# Từ string sang số
chuoi_so = "123"
so_nguyen = int(chuoi_so)
so_thap_phan = float(chuoi_so)

print(f"Chuỗi '{chuoi_so}' thành số nguyên: {so_nguyen}")
print(f"Chuỗi '{chuoi_so}' thành số thập phân: {so_thap_phan}")

# Từ số sang string
so = 456
chuoi = str(so)
print(f"Số {so} thành chuỗi: '{chuoi}'")

# Boolean sang số
dung = True
sai = False
print(f"True thành số: {int(dung)}")  # 1
print(f"False thành số: {int(sai)}")  # 0

# Số sang boolean
print(f"Số 5 thành boolean: {bool(5)}")     # True
print(f"Số 0 thành boolean: {bool(0)}")     # False
```

**Giải thích:**
- `int()` chuyển thành số nguyên
- `float()` chuyển thành số thập phân  
- `str()` chuyển thành chuỗi
- `bool()` chuyển thành True/False

## Bài Tập 6: Phạm Vi Biến (Variable Scope)

**Đề bài:** Hiểu về phạm vi của biến

```python
# Giải pháp
# Biến toàn cục (global) - như đồ dùng chung
ten_truong = "Trường THPT ABC"

def thong_tin_hoc_sinh():
    # Biến cục bộ (local) - như đồ dùng riêng trong phòng
    ten_hoc_sinh = "Nguyễn Văn An"
    lop = "12A1"
    
    print(f"Tên trường: {ten_truong}")  # Dùng biến toàn cục
    print(f"Tên học sinh: {ten_hoc_sinh}")  # Biến cục bộ
    print(f"Lớp: {lop}")  # Biến cục bộ

# Gọi hàm
thong_tin_hoc_sinh()

# Thử truy cập biến cục bộ bên ngoài hàm (sẽ lỗi)
try:
    print(ten_hoc_sinh)  # Lỗi!
except NameError as e:
    print(f"Lỗi: {e}")
    print("Không thể dùng biến cục bộ bên ngoài hàm!")
```

## Bài Tập 7: Biến Hằng Số

**Đề bài:** Sử dụng hằng số (constants)

```python
# Giải pháp
# Hằng số - như quy tắc không đổi
PI = 3.14159
TIEN_LUONG_TOI_THIEU = 4680000
TEN_CONG_TY = "Công ty ABC"

def tinh_dien_tich_hinh_tron(ban_kinh):
    """Tính diện tích hình tròn sử dụng hằng số PI"""
    dien_tich = PI * ban_kinh ** 2
    return dien_tich

def tinh_luong_thuc_linh(he_so_luong):
    """Tính lương thực lĩnh"""
    luong_co_ban = TIEN_LUONG_TOI_THIEU * he_so_luong
    return luong_co_ban

# Sử dụng
ban_kinh = 5
print(f"Diện tích hình tròn bán kính {ban_kinh}: {tinh_dien_tich_hinh_tron(ban_kinh):.2f}")

he_so = 2.5
print(f"Lương với hệ số {he_so}: {tinh_luong_thuc_linh(he_so):,.0f} VNĐ")
```

**Giải thích:**
- Hằng số được viết HOA để dễ nhận biết
- Hằng số giúp code dễ đọc và bảo trì hơn

## Bài Tập 8: Biến Môi Trường

**Đề bài:** Làm việc với biến môi trường

```python
# Giải pháp
import os

# Đọc biến môi trường
ten_nguoi_dung = os.getenv('USER', 'Không rõ')  # Trên Mac/Linux
# ten_nguoi_dung = os.getenv('USERNAME', 'Không rõ')  # Trên Windows

duong_dan_home = os.getenv('HOME', 'Không rõ')
python_path = os.getenv('PYTHONPATH', 'Chưa thiết lập')

print(f"Tên người dùng: {ten_nguoi_dung}")
print(f"Thư mục home: {duong_dan_home}")
print(f"Python path: {python_path}")

# Tạo biến môi trường mới
os.environ['MON_HOC_YEU_THICH'] = 'Python'
mon_hoc = os.getenv('MON_HOC_YEU_THICH')
print(f"Môn học yêu thích: {mon_hoc}")

# Liệt kê một số biến môi trường quan trọng
print("\n--- BIẾN MÔI TRƯỜNG QUAN TRỌNG ---")
bien_quan_trong = ['PATH', 'HOME', 'USER', 'SHELL']
for bien in bien_quan_trong:
    gia_tri = os.getenv(bien, 'Không tồn tại')
    print(f"{bien}: {gia_tri}")
```

## Bài Tập 9: Bài Tập Tổng Hợp

**Đề bài:** Tạo chương trình quản lý thông tin sinh viên

```python
# Giải pháp
class QuanLySinhVien:
    """Lớp quản lý thông tin sinh viên - như sổ ghi chép điện tử"""
    
    # Hằng số lớp
    DIEM_TOI_DA = 10.0
    DIEM_TOI_THIEU = 0.0
    
    def __init__(self):
        # Biến instance - như thông tin riêng của mỗi đối tượng
        self.danh_sach_sinh_vien = []
        self.so_luong_sinh_vien = 0
    
    def them_sinh_vien(self, ma_sv, ten, diem_toan, diem_ly, diem_hoa):
        """Thêm sinh viên mới"""
        # Biến cục bộ
        diem_trung_binh = (diem_toan + diem_ly + diem_hoa) / 3
        
        # Xác định xếp loại
        if diem_trung_binh >= 8.5:
            xep_loai = "Xuất sắc"
        elif diem_trung_binh >= 7.0:
            xep_loai = "Khá"
        elif diem_trung_binh >= 5.5:
            xep_loai = "Trung bình"
        else:
            xep_loai = "Yếu"
        
        sinh_vien = {
            'ma_sv': ma_sv,
            'ten': ten,
            'diem_toan': diem_toan,
            'diem_ly': diem_ly,
            'diem_hoa': diem_hoa,
            'diem_tb': round(diem_trung_binh, 2),
            'xep_loai': xep_loai
        }
        
        self.danh_sach_sinh_vien.append(sinh_vien)
        self.so_luong_sinh_vien += 1
        print(f"✅ Đã thêm sinh viên {ten}")
    
    def hien_thi_danh_sach(self):
        """Hiển thị danh sách sinh viên"""
        if not self.danh_sach_sinh_vien:
            print("📝 Danh sách trống!")
            return
        
        print(f"\n{'='*60}")
        print(f"{'DANH SÁCH SINH VIÊN':^60}")
        print(f"{'='*60}")
        print(f"{'Mã SV':<8} {'Tên':<20} {'Toán':<6} {'Lý':<6} {'Hóa':<6} {'TB':<6} {'Xếp loại'}")
        print(f"{'-'*60}")
        
        for sv in self.danh_sach_sinh_vien:
            print(f"{sv['ma_sv']:<8} {sv['ten']:<20} {sv['diem_toan']:<6} "
                  f"{sv['diem_ly']:<6} {sv['diem_hoa']:<6} {sv['diem_tb']:<6} {sv['xep_loai']}")
    
    def thong_ke(self):
        """Thống kê tổng quan"""
        if not self.danh_sach_sinh_vien:
            return
        
        # Biến cục bộ cho thống kê
        tong_diem = sum(sv['diem_tb'] for sv in self.danh_sach_sinh_vien)
        diem_tb_lop = tong_diem / self.so_luong_sinh_vien
        
        diem_cao_nhat = max(sv['diem_tb'] for sv in self.danh_sach_sinh_vien)
        diem_thap_nhat = min(sv['diem_tb'] for sv in self.danh_sach_sinh_vien)
        
        # Đếm theo xếp loại
        xuat_sac = len([sv for sv in self.danh_sach_sinh_vien if sv['xep_loai'] == 'Xuất sắc'])
        kha = len([sv for sv in self.danh_sach_sinh_vien if sv['xep_loai'] == 'Khá'])
        trung_binh = len([sv for sv in self.danh_sach_sinh_vien if sv['xep_loai'] == 'Trung bình'])
        yeu = len([sv for sv in self.danh_sach_sinh_vien if sv['xep_loai'] == 'Yếu'])
        
        print(f"\n📊 THỐNG KÊ")
        print(f"Tổng số sinh viên: {self.so_luong_sinh_vien}")
        print(f"Điểm trung bình lớp: {diem_tb_lop:.2f}")
        print(f"Điểm cao nhất: {diem_cao_nhat}")
        print(f"Điểm thấp nhất: {diem_thap_nhat}")
        print(f"Xuất sắc: {xuat_sac}, Khá: {kha}, Trung bình: {trung_binh}, Yếu: {yeu}")

# Demo chương trình
def demo():
    """Chương trình demo"""
    ql = QuanLySinhVien()
    
    # Thêm một số sinh viên mẫu
    ql.them_sinh_vien("SV001", "Nguyễn Văn An", 8.5, 7.5, 9.0)
    ql.them_sinh_vien("SV002", "Trần Thị Bình", 7.0, 8.0, 7.5)
    ql.them_sinh_vien("SV003", "Lê Văn Cường", 5.0, 6.0, 5.5)
    ql.them_sinh_vien("SV004", "Phạm Thị Dung", 9.0, 9.5, 8.5)
    
    # Hiển thị kết quả
    ql.hien_thi_danh_sach()
    ql.thong_ke()

if __name__ == "__main__":
    demo()
```

## Tổng Kết

Qua các bài tập này, bạn đã học được:

1. **Tạo và sử dụng biến** - như đặt tên cho những chiếc hộp
2. **Các kiểu dữ liệu** - như phân loại đồ vật trong hộp
3. **Chuyển đổi kiểu** - như đóng gói lại đồ vật
4. **Phạm vi biến** - như quy tắc sử dụng đồ dùng chung/riêng
5. **Hằng số** - như quy tắc không thay đổi
6. **Biến môi trường** - như thông tin hệ thống
7. **Ứng dụng thực tế** - như quản lý thông tin sinh viên

**Mẹo nhớ:**
- Biến như chiếc hộp có nhãn
- Kiểu dữ liệu như loại đồ vật
- Phạm vi như phạm vi sử dụng đồ dùng
- Hằng số như quy tắc cố định

Tiếp tục luyện tập để thành thạo hơn! 🚀
