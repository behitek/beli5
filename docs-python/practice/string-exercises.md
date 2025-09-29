# Bài Tập Về Chuỗi (Strings)

## Giới Thiệu

Chuỗi trong Python như những câu chuyện được viết ra. Chúng ta có thể đọc, chỉnh sửa, cắt ghép, và trang trí những câu chuyện này theo nhiều cách khác nhau.

## Bài Tập 1: Tạo và Hiển Thị Chuỗi

**Đề bài:** Làm quen với các cách tạo chuỗi

```python
# Giải pháp
# Cách 1: Dấu nháy đơn
ten_1 = 'Nguyễn Văn An'

# Cách 2: Dấu nháy kép
ten_2 = "Trần Thị Bình"

# Cách 3: Ba dấu nháy (cho chuỗi nhiều dòng)
mo_ta = """
Đây là một câu chuyện dài
về một chàng trai tên An
và cô gái tên Bình
"""

# Cách 4: Chuỗi với ký tự đặc biệt
cau_noi = "Anh ấy nói: \"Tôi yêu lập trình Python!\""
duong_dan = "C:\\Users\\An\\Documents\\python_code.py"

print("=== CÁC CÁCH TẠO CHUỖI ===")
print(f"Tên 1: {ten_1}")
print(f"Tên 2: {ten_2}")
print(f"Mô tả: {mo_ta}")
print(f"Câu nói: {cau_noi}")
print(f"Đường dẫn: {duong_dan}")
```

**Giải thích:**
- Dấu nháy đơn và kép như hai cách viết khác nhau
- Ba dấu nháy như viết thư dài nhiều dòng
- `\"` như cách viết dấu nháy trong câu nói
- `\\` như cách viết dấu gạch chéo

## Bài Tập 2: Nối Chuỗi (String Concatenation)

**Đề bài:** Ghép các chuỗi lại với nhau

```python
# Giải pháp
ho = "Nguyễn"
ten_dem = "Văn"  
ten = "An"

# Cách 1: Dùng dấu +
ho_ten_1 = ho + " " + ten_dem + " " + ten
print(f"Cách 1: {ho_ten_1}")

# Cách 2: Dùng join()
ho_ten_2 = " ".join([ho, ten_dem, ten])
print(f"Cách 2: {ho_ten_2}")

# Cách 3: Dùng f-string (tốt nhất)
ho_ten_3 = f"{ho} {ten_dem} {ten}"
print(f"Cách 3: {ho_ten_3}")

# Cách 4: Dùng format()
ho_ten_4 = "{} {} {}".format(ho, ten_dem, ten)
print(f"Cách 4: {ho_ten_4}")

# Cách 5: Dùng % (cách cũ)
ho_ten_5 = "%s %s %s" % (ho, ten_dem, ten)
print(f"Cách 5: {ho_ten_5}")

# Ví dụ thực tế: Tạo thông điệp chào
tuoi = 20
thong_diep = f"Xin chào! Tôi là {ho_ten_3}, {tuoi} tuổi. Rất vui được gặp bạn!"
print(f"\nThông điệp: {thong_diep}")
```

## Bài Tập 3: Độ Dài và Truy Cập Ký Tự

**Đề bài:** Đếm ký tự và truy cập từng ký tự trong chuỗi

```python
# Giải pháp
cau_noi = "Python là ngôn ngữ tuyệt vời!"

# Độ dài chuỗi
do_dai = len(cau_noi)
print(f"Câu: '{cau_noi}'")
print(f"Độ dài: {do_dai} ký tự")

print("\n=== TRUY CẬP KỲ TỰ ===")
# Truy cập ký tự đầu tiên (index 0)
ky_tu_dau = cau_noi[0]
print(f"Ký tự đầu tiên: '{ky_tu_dau}'")

# Truy cập ký tự cuối cùng
ky_tu_cuoi = cau_noi[-1]
print(f"Ký tự cuối cùng: '{ky_tu_cuoi}'")

# Truy cập ký tự ở vị trí 7
ky_tu_7 = cau_noi[7]
print(f"Ký tự ở vị trí 7: '{ky_tu_7}'")

print("\n=== DUYỆT QUA TỪNG KÝ TỰ ===")
# Cách 1: Dùng for trực tiếp
print("Cách 1:")
for ky_tu in cau_noi:
    print(ky_tu, end=" ")
print()

# Cách 2: Dùng index
print("\nCách 2 (với vị trí):")
for i in range(len(cau_noi)):
    print(f"[{i}]: '{cau_noi[i]}'", end=" ")
    if (i + 1) % 10 == 0:  # Xuống dòng sau mỗi 10 ký tự
        print()

print("\n\n=== THỐNG KÊ KÝ TỰ ===")
# Đếm ký tự đặc biệt
chu_cai = sum(1 for c in cau_noi if c.isalpha())
chu_so = sum(1 for c in cau_noi if c.isdigit())
khoang_trang = sum(1 for c in cau_noi if c.isspace())
ky_tu_dac_biet = len(cau_noi) - chu_cai - chu_so - khoang_trang

print(f"Chữ cái: {chu_cai}")
print(f"Chữ số: {chu_so}")
print(f"Khoảng trắng: {khoang_trang}")
print(f"Ký tự đặc biệt: {ky_tu_dac_biet}")
```

## Bài Tập 4: Cắt Chuỗi (String Slicing)

**Đề bài:** Cắt và lấy một phần của chuỗi

```python
# Giải pháp
van_ban = "Học Python rất thú vị và bổ ích"
print(f"Văn bản gốc: '{van_ban}'")
print(f"Độ dài: {len(van_ban)} ký tự")

print("\n=== CÁC CÁCH CẮT CHUỖI ===")

# Lấy từ đầu đến vị trí 10
phan_1 = van_ban[:11]  # "Học Python"
print(f"Từ đầu đến vị trí 10: '{phan_1}'")

# Lấy từ vị trí 4 đến cuối
phan_2 = van_ban[4:]  # "Python rất thú vị và bổ ích"
print(f"Từ vị trí 4 đến cuối: '{phan_2}'")

# Lấy từ vị trí 4 đến 10
phan_3 = van_ban[4:11]  # "Python"
print(f"Từ vị trí 4 đến 10: '{phan_3}'")

# Lấy 5 ký tự cuối
phan_4 = van_ban[-7:]  # "bổ ích"
print(f"5 ký tự cuối: '{phan_4}'")

# Cắt ngược (từ cuối về đầu)
nguoc = van_ban[::-1]
print(f"Chuỗi ngược: '{nguoc}'")

# Lấy ký tự cách nhau 2 vị trí
cach_2 = van_ban[::2]
print(f"Ký tự cách nhau 2 vị trí: '{cach_2}'")

print("\n=== TÁCH TỪ ===")
# Tách thành danh sách từ
cac_tu = van_ban.split()
print(f"Các từ: {cac_tu}")
print(f"Số từ: {len(cac_tu)}")

# Lấy từ đầu tiên và cuối cùng
tu_dau = cac_tu[0]
tu_cuoi = cac_tu[-1]
print(f"Từ đầu: '{tu_dau}', Từ cuối: '{tu_cuoi}'")
```

## Bài Tập 5: Các Phương Thức Chuỗi Cơ Bản

**Đề bài:** Sử dụng các phương thức để xử lý chuỗi

```python
# Giải pháp
def demo_chuoi_methods():
    """Demo các phương thức xử lý chuỗi"""
    
    # Chuỗi mẫu
    chuoi_goc = "  Python Là Ngôn Ngữ Lập TrìNh Tuyệt Vời!  "
    print(f"Chuỗi gốc: '{chuoi_goc}'")
    
    print("\n=== XỬ LÝ KHOẢNG TRẮNG ===")
    # Xóa khoảng trắng
    xoa_2_dau = chuoi_goc.strip()
    xoa_dau = chuoi_goc.lstrip()
    xoa_cuoi = chuoi_goc.rstrip()
    
    print(f"Xóa 2 đầu: '{xoa_2_dau}'")
    print(f"Xóa đầu: '{xoa_dau}'")
    print(f"Xóa cuối: '{xoa_cuoi}'")
    
    print("\n=== CHUYỂN ĐỔI CHỮ HOA/THƯỜNG ===")
    chu_thuong = xoa_2_dau.lower()
    chu_hoa = xoa_2_dau.upper()
    chu_hoa_dau_tu = xoa_2_dau.title()
    chu_hoa_dau_cau = xoa_2_dau.capitalize()
    
    print(f"Chữ thường: '{chu_thuong}'")
    print(f"Chữ hoa: '{chu_hoa}'")
    print(f"Hoa đầu từ: '{chu_hoa_dau_tu}'")
    print(f"Hoa đầu câu: '{chu_hoa_dau_cau}'")
    
    print("\n=== KIỂM TRA CHUỖI ===")
    print(f"Là chữ cái: {xoa_2_dau.isalpha()}")
    print(f"Là chữ số: {xoa_2_dau.isdigit()}")
    print(f"Là chữ cái + số: {xoa_2_dau.isalnum()}")
    print(f"Chỉ chữ thường: {xoa_2_dau.islower()}")
    print(f"Chỉ chữ hoa: {xoa_2_dau.isupper()}")
    print(f"Bắt đầu bằng 'Python': {xoa_2_dau.startswith('Python')}")
    print(f"Kết thúc bằng 'Vời!': {xoa_2_dau.endswith('Vời!')}")
    
    print("\n=== TÌM KIẾM VÀ THAY THẾ ===")
    # Tìm vị trí
    vi_tri_python = xoa_2_dau.find('Python')
    vi_tri_java = xoa_2_dau.find('Java')  # Không tìm thấy = -1
    
    print(f"Vị trí 'Python': {vi_tri_python}")
    print(f"Vị trí 'Java': {vi_tri_java}")
    
    # Đếm số lần xuất hiện
    so_lan_n = xoa_2_dau.count('n')
    so_lan_la = xoa_2_dau.lower().count('là')
    
    print(f"Số lần xuất hiện 'n': {so_lan_n}")
    print(f"Số lần xuất hiện 'là': {so_lan_la}")
    
    # Thay thế
    thay_the_1 = xoa_2_dau.replace('Python', 'Java')
    thay_the_2 = xoa_2_dau.replace('Tuyệt Vời', 'Fantastic')
    
    print(f"Thay Python thành Java: '{thay_the_1}'")
    print(f"Thay Tuyệt Vời thành Fantastic: '{thay_the_2}'")

demo_chuoi_methods()
```

## Bài Tập 6: Định Dạng Chuỗi (String Formatting)

**Đề bài:** Học cách định dạng chuỗi chuyên nghiệp

```python
# Giải pháp
def demo_dinh_dang():
    """Demo các cách định dạng chuỗi"""
    
    # Dữ liệu mẫu
    ten = "Nguyễn Văn An"
    tuoi = 25
    diem_tb = 8.567
    tien_luong = 15000000
    ngay_sinh = "15/03/1998"
    
    print("=== F-STRING (CÁCH TỐT NHẤT) ===")
    
    # Cơ bản
    gioi_thieu = f"Tôi tên {ten}, {tuoi} tuổi"
    print(gioi_thieu)
    
    # Làm tròn số
    diem_lam_tron = f"Điểm TB: {diem_tb:.2f}"
    print(diem_lam_tron)
    
    # Định dạng tiền tệ
    tien_dinh_dang = f"Lương: {tien_luong:,} VNĐ"
    print(tien_dinh_dang)
    
    # Căn lề
    ten_can_trai = f"Tên: {ten:<20}|"  # Căn trái, độ rộng 20
    ten_can_phai = f"Tên: {ten:>20}|"  # Căn phải
    ten_can_giua = f"Tên: {ten:^20}|"  # Căn giữa
    
    print(ten_can_trai)
    print(ten_can_phai)
    print(ten_can_giua)
    
    # Padding với ký tự
    so_padding = f"Số: {42:0>5}"  # Thêm số 0 ở đầu
    chuoi_padding = f"Text: {ten:-^30}"  # Thêm dấu - ở 2 bên
    
    print(so_padding)
    print(chuoi_padding)
    
    print("\n=== FORMAT() METHOD ===")
    
    # Cơ bản
    template_1 = "Tên: {}, Tuổi: {}, Điểm: {:.1f}"
    ket_qua_1 = template_1.format(ten, tuoi, diem_tb)
    print(ket_qua_1)
    
    # Với tên tham số
    template_2 = "Tên: {name}, Tuổi: {age}, Điểm: {score:.2f}"
    ket_qua_2 = template_2.format(name=ten, age=tuoi, score=diem_tb)
    print(ket_qua_2)
    
    # Với index
    template_3 = "Tên: {0}, Tuổi: {1}, Tên lại: {0}"
    ket_qua_3 = template_3.format(ten, tuoi)
    print(ket_qua_3)
    
    print("\n=== TEMPLATE STRINGS ===")
    from string import Template
    
    template = Template("Tôi là $name, $age tuổi, điểm TB $score")
    ket_qua = template.substitute(name=ten, age=tuoi, score=diem_tb)
    print(ket_qua)
    
    print("\n=== BÀI TẬP THỰC TẾ: TẠO HÓA ĐƠN ===")
    
    # Dữ liệu hóa đơn
    san_pham = [
        {"ten": "Laptop", "gia": 15000000, "so_luong": 1},
        {"ten": "Chuột", "gia": 200000, "so_luong": 2},
        {"ten": "Bàn phím", "gia": 800000, "so_luong": 1}
    ]
    
    # Header hóa đơn
    print("=" * 60)
    print(f"{'HÓA ĐƠN BÁN HÀNG':^60}")
    print("=" * 60)
    print(f"{'Sản phẩm':<20} {'Giá':<12} {'SL':<4} {'Thành tiền':<15}")
    print("-" * 60)
    
    tong_tien = 0
    for sp in san_pham:
        thanh_tien = sp['gia'] * sp['so_luong']
        tong_tien += thanh_tien
        
        print(f"{sp['ten']:<20} {sp['gia']:>10,} đ {sp['so_luong']:>2} "
              f"{thanh_tien:>12,} đ")
    
    print("-" * 60)
    print(f"{'TỔNG CỘNG:':<37} {tong_tien:>12,} đ")
    print("=" * 60)

demo_dinh_dang()
```

## Bài Tập 7: Xử Lý Chuỗi Nâng Cao

**Đề bài:** Các kỹ thuật xử lý chuỗi phức tạp

```python
# Giải pháp
import re
from collections import Counter

def xu_ly_chuoi_nang_cao():
    """Các kỹ thuật xử lý chuỗi nâng cao"""
    
    van_ban = """
    Python là một ngôn ngữ lập trình bậc cao, 
    thông dịch, tương tác và hướng đối tượng. 
    Python được thiết kế với triết lý mã nguồn 
    rất dễ đọc và cú pháp cho phép lập trình viên 
    diễn đạt ý tưởng bằng ít dòng code hơn.
    """
    
    print("=== VĂN BẢN GỐC ===")
    print(van_ban.strip())
    
    print("\n=== TIỀN XỬ LÝ ===")
    # Làm sạch văn bản
    van_ban_sach = re.sub(r'\s+', ' ', van_ban.strip())  # Gộp khoảng trắng
    van_ban_sach = re.sub(r'[^\w\sàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]', '', van_ban_sach)
    print(f"Sau khi làm sạch: {van_ban_sach}")
    
    print("\n=== THỐNG KÊ TỪযখন ===")
    # Tách từ
    cac_tu = van_ban_sach.lower().split()
    
    # Đếm từ
    dem_tu = Counter(cac_tu)
    
    print(f"Tổng số từ: {len(cac_tu)}")
    print(f"Số từ unique: {len(dem_tu)}")
    
    print("\n5 từ xuất hiện nhiều nhất:")
    for tu, so_lan in dem_tu.most_common(5):
        print(f"  '{tu}': {so_lan} lần")
    
    print("\n=== TÌM KIẾM PATTERN ===")
    # Tìm từ có chứa "trình"
    tu_chua_trinh = [tu for tu in cac_tu if 'trình' in tu]
    print(f"Từ chứa 'trình': {tu_chua_trinh}")
    
    # Tìm từ bắt đầu bằng "th"
    tu_bat_dau_th = [tu for tu in cac_tu if tu.startswith('th')]
    print(f"Từ bắt đầu 'th': {tu_bat_dau_th}")
    
    # Tìm từ có độ dài > 5 ký tự
    tu_dai = [tu for tu in cac_tu if len(tu) > 5]
    print(f"Từ dài (>5 ký tự): {tu_dai}")
    
    print("\n=== REGEX PATTERNS ===")
    # Tìm email (giả định có email trong text)
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, van_ban)
    print(f"Emails tìm được: {emails}")
    
    # Tìm số điện thoại (pattern Việt Nam)
    phone_pattern = r'(0|\+84)[3|5|7|8|9][0-9]{8}'
    phones = re.findall(phone_pattern, van_ban)
    print(f"Số điện thoại: {phones}")
    
    print("\n=== TẠO CHỈ MỤC TỪ ===")
    # Tạo chỉ mục cho mỗi từ
    chi_muc_tu = {}
    for i, tu in enumerate(cac_tu):
        if tu not in chi_muc_tu:
            chi_muc_tu[tu] = []
        chi_muc_tu[tu].append(i)
    
    # Hiển thị chỉ mục của một số từ
    tu_quan_trong = ['python', 'ngôn', 'lập', 'trình']
    for tu in tu_quan_trong:
        if tu in chi_muc_tu:
            print(f"Từ '{tu}' xuất hiện ở vị trí: {chi_muc_tu[tu]}")

xu_ly_chuoi_nang_cao()
```

## Bài Tập 8: Mã Hóa và Giải Mã Chuỗi

**Đề bài:** Tạo chương trình mã hóa/giải mã đơn giản

```python
# Giải pháp
import base64
import string

class MaHoaChuoi:
    """Lớp mã hóa chuỗi với nhiều phương pháp"""
    
    def __init__(self):
        self.bang_chu_cai = string.ascii_lowercase
        self.so_ky_tu = len(self.bang_chu_cai)
    
    def caesar_cipher_ma_hoa(self, van_ban, bu_dich):
        """Mã hóa Caesar (dịch chuyển ký tự)"""
        ket_qua = ""
        
        for ky_tu in van_ban:
            if ky_tu.lower() in self.bang_chu_cai:
                # Tìm vị trí trong bảng chữ cái
                vi_tri_cu = self.bang_chu_cai.index(ky_tu.lower())
                # Dịch chuyển
                vi_tri_moi = (vi_tri_cu + bu_dich) % self.so_ky_tu
                ky_tu_moi = self.bang_chu_cai[vi_tri_moi]
                
                # Giữ nguyên chữ hoa/thường
                if ky_tu.isupper():
                    ket_qua += ky_tu_moi.upper()
                else:
                    ket_qua += ky_tu_moi
            else:
                # Giữ nguyên ký tự không phải chữ cái
                ket_qua += ky_tu
        
        return ket_qua
    
    def caesar_cipher_giai_ma(self, van_ban_ma_hoa, bu_dich):
        """Giải mã Caesar"""
        return self.caesar_cipher_ma_hoa(van_ban_ma_hoa, -bu_dich)
    
    def morse_code_ma_hoa(self, van_ban):
        """Mã hóa Morse"""
        morse_dict = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
            'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
            'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
            'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
            '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
            '8': '---..', '9': '----.', ' ': '/'
        }
        
        ket_qua = ""
        for ky_tu in van_ban.upper():
            if ky_tu in morse_dict:
                ket_qua += morse_dict[ky_tu] + " "
        
        return ket_qua.strip()
    
    def morse_code_giai_ma(self, ma_morse):
        """Giải mã Morse"""
        morse_dict = {
            '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
            '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
            '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
            '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
            '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
            '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
            '---..': '8', '----.': '9', '/': ' '
        }
        
        cac_ma = ma_morse.split(' ')
        ket_qua = ""
        
        for ma in cac_ma:
            if ma in morse_dict:
                ket_qua += morse_dict[ma]
        
        return ket_qua
    
    def base64_ma_hoa(self, van_ban):
        """Mã hóa Base64"""
        byte_data = van_ban.encode('utf-8')
        encoded = base64.b64encode(byte_data)
        return encoded.decode('utf-8')
    
    def base64_giai_ma(self, ma_base64):
        """Giải mã Base64"""
        try:
            decoded_bytes = base64.b64decode(ma_base64)
            return decoded_bytes.decode('utf-8')
        except:
            return "Lỗi giải mã Base64"
    
    def thay_the_ky_tu(self, van_ban, key="QWERTYUIOPASDFGHJKLZXCVBNM"):
        """Mã hóa thay thế ký tự"""
        alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        ket_qua = ""
        
        for ky_tu in van_ban.upper():
            if ky_tu in alphabet:
                vi_tri = alphabet.index(ky_tu)
                ket_qua += key[vi_tri]
            else:
                ket_qua += ky_tu
        
        return ket_qua

def demo_ma_hoa():
    """Demo các phương pháp mã hóa"""
    
    ma_hoa = MaHoaChuoi()
    van_ban_goc = "Học Python rất thú vị!"
    
    print(f"Văn bản gốc: '{van_ban_goc}'")
    print("=" * 50)
    
    # Caesar Cipher
    print("\n=== CAESAR CIPHER ===")
    bu_dich = 3
    caesar_ma = ma_hoa.caesar_cipher_ma_hoa(van_ban_goc, bu_dich)
    caesar_giai_ma = ma_hoa.caesar_cipher_giai_ma(caesar_ma, bu_dich)
    
    print(f"Mã hóa (bù dịch {bu_dich}): '{caesar_ma}'")
    print(f"Giải mã: '{caesar_giai_ma}'")
    
    # Morse Code
    print("\n=== MORSE CODE ===")
    morse_ma = ma_hoa.morse_code_ma_hoa(van_ban_goc)
    morse_giai_ma = ma_hoa.morse_code_giai_ma(morse_ma)
    
    print(f"Mã Morse: {morse_ma}")
    print(f"Giải mã: '{morse_giai_ma}'")
    
    # Base64
    print("\n=== BASE64 ===")
    base64_ma = ma_hoa.base64_ma_hoa(van_ban_goc)
    base64_giai_ma = ma_hoa.base64_giai_ma(base64_ma)
    
    print(f"Mã Base64: {base64_ma}")
    print(f"Giải mã: '{base64_giai_ma}'")
    
    # Thay thế ký tự
    print("\n=== THAY THẾ KÝ TỰ ===")
    thay_the_ma = ma_hoa.thay_the_ky_tu(van_ban_goc)
    print(f"Mã hóa thay thế: '{thay_the_ma}'")
    
    print("\n=== CHƯƠNG TRÌNH TƯƠNG TÁC ===")
    while True:
        print("\nChọn chức năng:")
        print("1. Caesar Cipher")
        print("2. Morse Code")
        print("3. Base64")
        print("0. Thoát")
        
        lua_chon = input("Nhập lựa chọn (0-3): ")
        
        if lua_chon == "0":
            print("Tạm biệt! 👋")
            break
        elif lua_chon == "1":
            text = input("Nhập văn bản: ")
            shift = int(input("Nhập bù dịch: "))
            encrypted = ma_hoa.caesar_cipher_ma_hoa(text, shift)
            print(f"Kết quả mã hóa: {encrypted}")
            
        elif lua_chon == "2":
            text = input("Nhập văn bản: ")
            morse = ma_hoa.morse_code_ma_hoa(text)
            print(f"Mã Morse: {morse}")
            
        elif lua_chon == "3":
            text = input("Nhập văn bản: ")
            encoded = ma_hoa.base64_ma_hoa(text)
            print(f"Mã Base64: {encoded}")
        else:
            print("Lựa chọn không hợp lệ!")

if __name__ == "__main__":
    demo_ma_hoa()
```

## Bài Tập 9: Bài Tập Tổng Hợp

**Đề bài:** Tạo chương trình xử lý văn bản thông minh

```python
# Giải pháp
import re
from collections import Counter, defaultdict
import json

class XuLyVanBan:
    """Lớp xử lý văn bản thông minh"""
    
    def __init__(self):
        self.stop_words = {
            'là', 'của', 'và', 'có', 'được', 'cho', 'với', 'từ', 'trong', 'một',
            'này', 'đó', 'những', 'các', 'để', 'không', 'về', 'sau', 'trước',
            'khi', 'như', 'thì', 'sẽ', 'đã', 'đang', 'nếu', 'mà', 'hay'
        }
        
        self.thong_ke = {
            'so_cau': 0,
            'so_tu': 0,
            'so_ky_tu': 0,
            'do_dai_trung_binh_tu': 0,
            'do_dai_trung_binh_cau': 0
        }
    
    def tien_xu_ly(self, van_ban):
        """Tiền xử lý văn bản"""
        # Chuyển thành chữ thường
        van_ban = van_ban.lower()
        
        # Loại bỏ ký tự đặc biệt (giữ lại dấu câu cơ bản)
        van_ban = re.sub(r'[^\w\s.!?,:;àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]', '', van_ban)
        
        # Chuẩn hóa khoảng trắng
        van_ban = re.sub(r'\s+', ' ', van_ban.strip())
        
        return van_ban
    
    def tach_cau(self, van_ban):
        """Tách văn bản thành các câu"""
        # Tách theo dấu câu
        cac_cau = re.split(r'[.!?]+', van_ban)
        
        # Lọc câu rỗng
        cac_cau = [cau.strip() for cau in cac_cau if cau.strip()]
        
        return cac_cau
    
    def tach_tu(self, cau):
        """Tách câu thành từ"""
        # Loại bỏ dấu câu
        cau_sach = re.sub(r'[^\w\sàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]', '', cau)
        
        # Tách từ
        cac_tu = cau_sach.split()
        
        # Lọc stop words
        cac_tu_co_nghia = [tu for tu in cac_tu if tu not in self.stop_words and len(tu) > 1]
        
        return cac_tu_co_nghia
    
    def thong_ke_co_ban(self, van_ban):
        """Thống kê cơ bản về văn bản"""
        van_ban_sach = self.tien_xu_ly(van_ban)
        cac_cau = self.tach_cau(van_ban_sach)
        
        tat_ca_tu = []
        for cau in cac_cau:
            cac_tu = cau.split()
            tat_ca_tu.extend(cac_tu)
        
        # Tính thống kê
        self.thong_ke['so_cau'] = len(cac_cau)
        self.thong_ke['so_tu'] = len(tat_ca_tu)
        self.thong_ke['so_ky_tu'] = len(van_ban)
        
        if tat_ca_tu:
            self.thong_ke['do_dai_trung_binh_tu'] = sum(len(tu) for tu in tat_ca_tu) / len(tat_ca_tu)
        
        if cac_cau:
            self.thong_ke['do_dai_trung_binh_cau'] = sum(len(cau) for cau in cac_cau) / len(cac_cau)
        
        return self.thong_ke
    
    def phan_tich_tu_khoa(self, van_ban, top_n=10):
        """Phân tích từ khóa quan trọng"""
        van_ban_sach = self.tien_xu_ly(van_ban)
        cac_cau = self.tach_cau(van_ban_sach)
        
        tu_khoa = []
        for cau in cac_cau:
            cac_tu = self.tach_tu(cau)
            tu_khoa.extend(cac_tu)
        
        # Đếm tần suất
        tan_suat_tu = Counter(tu_khoa)
        
        return tan_suat_tu.most_common(top_n)
    
    def tim_cau_chua_tu_khoa(self, van_ban, tu_khoa):
        """Tìm câu chứa từ khóa"""
        van_ban_sach = self.tien_xu_ly(van_ban)
        cac_cau = self.tach_cau(van_ban_sach)
        
        cac_cau_khop = []
        for i, cau in enumerate(cac_cau):
            if tu_khoa.lower() in cau:
                cac_cau_khop.append((i + 1, cau))
        
        return cac_cau_khop
    
    def tao_tom_tat(self, van_ban, so_cau_tom_tat=3):
        """Tạo tóm tắt văn bản đơn giản"""
        van_ban_sach = self.tien_xu_ly(van_ban)
        cac_cau = self.tach_cau(van_ban_sach)
        
        if len(cac_cau) <= so_cau_tom_tat:
            return '. '.join(cac_cau) + '.'
        
        # Tính điểm cho mỗi câu dựa trên từ khóa quan trọng
        tu_khoa_quan_trong = self.phan_tich_tu_khoa(van_ban, 20)
        tu_khoa_dict = dict(tu_khoa_quan_trong)
        
        diem_cau = []
        for cau in cac_cau:
            cac_tu = self.tach_tu(cau)
            diem = sum(tu_khoa_dict.get(tu, 0) for tu in cac_tu)
            diem_cau.append(diem)
        
        # Lấy các câu có điểm cao nhất
        cac_index_tot = sorted(range(len(diem_cau)), key=lambda i: diem_cau[i], reverse=True)[:so_cau_tom_tat]
        cac_index_tot.sort()  # Sắp xếp theo thứ tự xuất hiện
        
        cac_cau_tom_tat = [cac_cau[i] for i in cac_index_tot]
        return '. '.join(cac_cau_tom_tat) + '.'
    
    def xuat_bao_cao(self, van_ban, ten_file="bao_cao_van_ban.json"):
        """Xuất báo cáo phân tích văn bản"""
        bao_cao = {
            'thong_ke_co_ban': self.thong_ke_co_ban(van_ban),
            'tu_khoa_quan_trong': self.phan_tich_tu_khoa(van_ban, 15),
            'tom_tat': self.tao_tom_tat(van_ban, 3)
        }
        
        with open(ten_file, 'w', encoding='utf-8') as f:
            json.dump(bao_cao, f, ensure_ascii=False, indent=2)
        
        return bao_cao

def demo_xu_ly_van_ban():
    """Demo chương trình xử lý văn bản"""
    
    # Văn bản mẫu
    van_ban_mau = """
    Python là một ngôn ngữ lập trình bậc cao được phát triển bởi Guido van Rossum và được phát hành lần đầu vào năm 1991. 
    Python có cú pháp đơn giản, dễ học và dễ sử dụng, điều này làm cho Python trở thành một trong những ngôn ngữ lập trình phổ biến nhất hiện nay. 
    Python được sử dụng rộng rãi trong nhiều lĩnh vực như phát triển web, khoa học dữ liệu, trí tuệ nhân tạo, và tự động hóa.
    Với một cộng đồng lớn và thư viện phong phú, Python giúp các lập trình viên phát triển ứng dụng một cách nhanh chóng và hiệu quả.
    Python không chỉ phù hợp cho người mới học lập trình mà còn được các chuyên gia sử dụng trong các dự án lớn.
    """
    
    # Khởi tạo bộ xử lý
    xu_ly = XuLyVanBan()
    
    print("=== CHƯƠNG TRÌNH XỬ LÝ VĂN BẢN THÔNG MINH ===")
    print(f"Văn bản gốc:\n{van_ban_mau.strip()}")
    
    print("\n" + "="*60)
    print("📊 THỐNG KÊ CƠ BẢN")
    print("="*60)
    thong_ke = xu_ly.thong_ke_co_ban(van_ban_mau)
    
    for key, value in thong_ke.items():
        if isinstance(value, float):
            print(f"{key.replace('_', ' ').title()}: {value:.2f}")
        else:
            print(f"{key.replace('_', ' ').title()}: {value}")
    
    print("\n" + "="*60)
    print("🔑 TỪ KHÓA QUAN TRỌNG")
    print("="*60)
    tu_khoa = xu_ly.phan_tich_tu_khoa(van_ban_mau, 10)
    
    for i, (tu, tan_suat) in enumerate(tu_khoa, 1):
        print(f"{i:2d}. {tu:<15} ({tan_suat} lần)")
    
    print("\n" + "="*60)
    print("🔍 TÌM KIẾM TỪ KHÓA")
    print("="*60)
    tu_tim = "python"
    cac_cau_khop = xu_ly.tim_cau_chua_tu_khoa(van_ban_mau, tu_tim)
    
    print(f"Tìm thấy {len(cac_cau_khop)} câu chứa từ '{tu_tim}':")
    for so_cau, cau in cac_cau_khop:
        print(f"Câu {so_cau}: {cau}")
    
    print("\n" + "="*60)
    print("📝 TÓM TẮT VĂN BẢN")
    print("="*60)
    tom_tat = xu_ly.tao_tom_tat(van_ban_mau, 2)
    print(tom_tat)
    
    print("\n" + "="*60)
    print("💾 XUẤT BÁO CÁO")
    print("="*60)
    bao_cao = xu_ly.xuat_bao_cao(van_ban_mau)
    print("Đã xuất báo cáo ra file 'bao_cao_van_ban.json'")
    
    # Chương trình tương tác
    print("\n" + "="*60)
    print("🎯 CHƯƠNG TRÌNH TƯƠNG TÁC")
    print("="*60)
    
    while True:
        print("\nChọn chức năng:")
        print("1. Nhập văn bản mới")
        print("2. Tìm kiếm từ khóa")
        print("3. Tạo tóm tắt")
        print("0. Thoát")
        
        lua_chon = input("Nhập lựa chọn: ")
        
        if lua_chon == "0":
            print("Cảm ơn bạn đã sử dụng! 👋")
            break
            
        elif lua_chon == "1":
            van_ban_moi = input("Nhập văn bản: ")
            if van_ban_moi.strip():
                thong_ke_moi = xu_ly.thong_ke_co_ban(van_ban_moi)
                print("Thống kê:")
                for k, v in thong_ke_moi.items():
                    print(f"  {k}: {v}")
                    
        elif lua_chon == "2":
            tu_khoa_tim = input("Nhập từ khóa cần tìm: ")
            if tu_khoa_tim.strip():
                ket_qua = xu_ly.tim_cau_chua_tu_khoa(van_ban_mau, tu_khoa_tim)
                print(f"Tìm thấy {len(ket_qua)} câu:")
                for so, cau in ket_qua:
                    print(f"  Câu {so}: {cau}")
                    
        elif lua_chon == "3":
            so_cau = input("Số câu tóm tắt (mặc định 2): ")
            try:
                so_cau = int(so_cau) if so_cau.strip() else 2
                tom_tat_moi = xu_ly.tao_tom_tat(van_ban_mau, so_cau)
                print(f"Tóm tắt ({so_cau} câu):")
                print(tom_tat_moi)
            except ValueError:
                print("Số không hợp lệ!")
                
        else:
            print("Lựa chọn không hợp lệ!")

if __name__ == "__main__":
    demo_xu_ly_van_ban()
```

## Tổng Kết

Qua các bài tập về chuỗi, bạn đã học được:

1. **Tạo chuỗi** - Các cách khác nhau để tạo chuỗi
2. **Nối chuỗi** - Ghép các chuỗi lại với nhau
3. **Truy cập ký tự** - Lấy từng ký tự trong chuỗi
4. **Cắt chuỗi** - Lấy một phần của chuỗi
5. **Phương thức chuỗi** - Các hàm xử lý chuỗi có sẵn
6. **Định dạng chuỗi** - Làm đẹp chuỗi hiển thị
7. **Xử lý nâng cao** - Regex, thống kê, phân tích
8. **Mã hóa/giải mã** - Bảo mật thông tin
9. **Ứng dụng thực tế** - Xử lý văn bản thông minh

**Mẹo nhớ:**
- Chuỗi như câu chuyện có thể đọc và chỉnh sửa
- f-string là cách tốt nhất để định dạng
- Regular expression giúp tìm kiếm pattern phức tạp
- Luôn xử lý encoding UTF-8 cho tiếng Việt

Tiếp tục luyện tập để thành thạo! 🎯
