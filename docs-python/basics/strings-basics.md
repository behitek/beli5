---
sidebar_position: 10
title: "📝 Làm Việc Với Chuỗi Cơ Bản - Chơi Với Chữ Và Câu"
description: "Học cách làm việc với chuỗi ký tự trong Python: tạo, nối, cắt và định dạng text. Chuỗi như những sợi dây chữ cái thú vị!"
keywords: ["python", "string", "chuỗi", "text", "văn bản", "nối chuỗi", "định dạng", "f-string"]
---

# 📝 Làm Việc Với Chuỗi Cơ Bản - Chơi Với Chữ Và Câu

:::tip 📝 Ví Dụ Dễ Hiểu
Hãy tưởng tượng chuỗi (string) như những **sợi dây được làm từ các chữ cái**! Bạn có thể nối chúng lại, cắt thành từng đoạn, trang trí và biến đổi theo ý muốn!
:::

## 🤔 Chuỗi Là Gì?

**Chuỗi (String)** là cách Python lưu trữ **chữ, từ, câu, và văn bản**. Mọi thứ bạn gõ trên bàn phím đều có thể trở thành chuỗi!

```mermaid
graph LR
    A[👋 "Xin chào"] --> B[🔤 Chuỗi]
    C[📱 "0987654321"] --> B
    D[🏠 "123 Phố Huế"] --> B
    E[😊 "Hôm nay vui quá!"] --> B
    
    B --> F[💾 Python Lưu Trữ]
    F --> G[🎯 Sử Dụng Linh Hoạt]
    
    style A fill:#FFE4B5
    style C fill:#FFE4B5  
    style D fill:#FFE4B5
    style E fill:#FFE4B5
    style B fill:#98FB98
    style F fill:#87CEEB
    style G fill:#FFD700
```

## 🎯 Cách Tạo Chuỗi

### 📌 1. Dấu Ngoặc Kép ("")

```python
# Cách phổ biến nhất
ten = "Nguyễn Văn An"
loi_chao = "Xin chào các bạn!"
dia_chi = "123 Đường Lê Lợi, Hà Nội"

print(ten)      # Nguyễn Văn An
print(loi_chao) # Xin chào các bạn!
```

### 📌 2. Dấu Ngoặc Đơn ('')

```python
# Cũng được, tùy sở thích
mon_hoc = 'Toán học'
mau_sac = 'Xanh lá cây'
cam_xuc = 'Vui vẻ'

print(mon_hoc)  # Toán học
print(mau_sac)  # Xanh lá cây
```

### 📌 3. Khi Nào Dùng Ngoặc Nào?

```python
# ✅ Dùng ngoặc kép khi có ngoặc đơn bên trong
cau_noi = "Tôi nói: 'Hôm nay trời đẹp quá!'"

# ✅ Dùng ngoặc đơn khi có ngoặc kép bên trong  
ten_sach = 'Cuốn sách "Harry Potter" rất hay'

# ✅ Hoặc dùng dấu \ để "thoát" ký tự đặc biệt
cau_kho = "Anh ấy nói: \"Tôi thích học Python!\""

print(cau_noi)
print(ten_sach) 
print(cau_kho)
```

## 🔗 Nối Chuỗi (String Concatenation)

### ➕ 1. Dùng Dấu Cộng (+)

```python
# Nối chuỗi đơn giản
ho = "Trần"
ten = "Minh"
ho_ten = ho + " " + ten  # Nhớ thêm khoảng trắng!
print(ho_ten)  # Trần Minh

# Nối nhiều chuỗi
chao = "Xin chào, "
ten_ban = "Lan"
cam_thay = "! Hôm nay bạn thế nào?"
cau_hoi = chao + ten_ban + cam_thay
print(cau_hoi)  # Xin chào, Lan! Hôm nay bạn thế nào?
```

### 🔢 2. Nối Chuỗi Với Số

```python
# ❌ KHÔNG thể nối trực tiếp chuỗi với số
tuoi = 15
# cau_noi = "Tôi " + tuoi + " tuổi"  # LỖI!

# ✅ Phải chuyển số thành chuỗi trước
tuoi = 15
cau_noi = "Tôi " + str(tuoi) + " tuổi"
print(cau_noi)  # Tôi 15 tuổi

# ✅ Hoặc dùng f-string (dễ hơn!)
cau_noi_f = f"Tôi {tuoi} tuổi"
print(cau_noi_f)  # Tôi 15 tuổi
```

## 🎨 F-String - Cách Định Dạng Chuỗi Thông Minh

**F-string** là cách **hiện đại và dễ nhất** để tạo chuỗi có chứa biến:

```python
# Thông tin cá nhân
ten = "Mai"
tuoi = 16
diem_toan = 8.75
thanh_pho = "Hồ Chí Minh"

# ✅ Dùng f-string - Dễ đọc và dễ hiểu
gioi_thieu = f"Tôi là {ten}, {tuoi} tuổi, sống ở {thanh_pho}"
thong_bao_diem = f"Điểm toán của {ten} là {diem_toan}"

print(gioi_thieu)     # Tôi là Mai, 16 tuổi, sống ở Hồ Chí Minh
print(thong_bao_diem) # Điểm toán của Mai là 8.75
```

### 🎯 Định Dạng Số Trong F-String

```python
# Số thập phân
gia_tien = 123456.789
print(f"Giá: {gia_tien:.2f} VNĐ")        # Giá: 123456.79 VNĐ
print(f"Giá: {gia_tien:,.0f} VNĐ")       # Giá: 123,457 VNĐ

# Phần trăm
ti_le = 0.85
print(f"Tỷ lệ đỗ: {ti_le:.1%}")          # Tỷ lệ đỗ: 85.0%

# Căn lề
ten = "Python"
print(f"Môn học: '{ten:>10}'")           # Môn học: '    Python'
print(f"Môn học: '{ten:<10}'")           # Môn học: 'Python    '
print(f"Môn học: '{ten:^10}'")           # Môn học: '  Python  '
```

## ✂️ Cắt Chuỗi (String Slicing)

Mỗi ký tự trong chuỗi có một **vị trí (index)**:

```python
cau_chao = "Xin chào Python!"
#           0123456789...   (index từ 0)

# Lấy ký tự đầu tiên
print(cau_chao[0])    # X

# Lấy ký tự cuối cùng
print(cau_chao[-1])   # !

# Lấy từ vị trí 4 đến 8
print(cau_chao[4:9])  # chào

# Lấy 5 ký tự đầu
print(cau_chao[:5])   # Xin c

# Lấy từ vị trí 10 đến cuối
print(cau_chao[10:])  # Python!
```

## 📏 Độ Dài Chuỗi

```python
# Đếm số ký tự trong chuỗi
ho_ten = "Nguyễn Thị Hoa"
so_ky_tu = len(ho_ten)
print(f"Tên '{ho_ten}' có {so_ky_tu} ký tự")  # 14 ký tự

# Kiểm tra chuỗi rỗng
chuoi_rong = ""
if len(chuoi_rong) == 0:
    print("Chuỗi này rỗng!")

# Chuỗi dài nhất
ten_1 = "An"
ten_2 = "Bình" 
ten_3 = "Châu"

if len(ten_1) > len(ten_2) and len(ten_1) > len(ten_3):
    print(f"{ten_1} có tên dài nhất")
```

## 🔍 Kiểm Tra Nội Dung Chuỗi

```python
cau_van = "Tôi yêu học Python!"

# Kiểm tra có chứa từ nào đó không
if "Python" in cau_van:
    print("Câu này nói về Python!")

if "Java" not in cau_van:
    print("Câu này không nói về Java")

# Kiểm tra bắt đầu bằng gì
if cau_van.startswith("Tôi"):
    print("Câu bắt đầu bằng 'Tôi'")

# Kiểm tra kết thúc bằng gì  
if cau_van.endswith("!"):
    print("Câu kết thúc bằng dấu chấm than")
```

## 🎪 Ví Dụ Thực Tế: Tạo Thẻ Học Sinh

```python
# 📋 Thông tin học sinh
ho = "Nguyễn"
ten_dem = "Văn" 
ten = "Minh"
lop = "9A"
truong = "THCS Lê Quý Đôn"
diem_tb = 8.65
xep_loai = "Giỏi"

# 🎨 Tạo thẻ học sinh đẹp
ho_ten_day_du = f"{ho} {ten_dem} {ten}"
thong_tin_lop = f"{lop} - {truong}"

print("=" * 40)
print("        THẺ HỌC SINH        ")
print("=" * 40)
print(f"Họ và tên: {ho_ten_day_du}")
print(f"Lớp:       {thong_tin_lop}")
print(f"Điểm TB:   {diem_tb:.2f} ({xep_loai})")
print("=" * 40)

# 🏆 Tạo thông báo động viên
if diem_tb >= 8.5:
    loi_chuc = f"Chúc mừng {ten}! Bạn đã đạt thành tích xuất sắc!"
elif diem_tb >= 7.0:
    loi_chuc = f"Tốt lắm {ten}! Hãy cố gắng thêm để đạt điểm cao hơn!"
else:
    loi_chuc = f"Đừng nản lòng {ten}! Cố gắng lên nhé!"

print(f"\n💬 {loi_chuc}")
```

## 🎯 Bài Tập Thực Hành

### 🥇 Bài Tập 1: Tự Giới Thiệu Bằng F-String

```python
# TODO: Điền thông tin của bạn
ho_ten = "..."
tuoi = ...
lop = "..."
so_thich = "..."
mon_hoc_yeu_thich = "..."

# Tạo đoạn giới thiệu bằng f-string
gioi_thieu = f"""
Xin chào! Tôi là {ho_ten}, năm nay {tuoi} tuổi.
Tôi đang học lớp {lop}.
Sở thích của tôi là {so_thich}.
Môn học tôi yêu thích nhất là {mon_hoc_yeu_thich}.
Rất vui được làm quen với các bạn!
"""

print(gioi_thieu)
```

### 🥈 Bài Tập 2: Tạo Email Tự Động

```python
# Thông tin
ho = "Tran"
ten = "Mai"
nam_sinh = 2008
ten_truong = "thcs-le-quy-don"

# TODO: Tạo email theo format: ten.ho.namsinh@tentruong.edu.vn
email = f"{ten.lower()}.{ho.lower()}.{nam_sinh}@{ten_truong}.edu.vn"
print(f"Email: {email}")

# Tạo mật khẩu tạm thời: 3 ký tự đầu của tên + năm sinh + 3 ký tự đầu của họ
mat_khau = f"{ten[:3].lower()}{nam_sinh}{ho[:3].lower()}"
print(f"Mật khẩu tạm: {mat_khau}")
```

### 🥉 Bài Tập 3: Phân Tích Tên

```python
ho_ten_day_du = "Nguyễn Thị Hương Lan"

# TODO: Tách thành các phần
# Gợi ý: dùng split() để tách chuỗi theo khoảng trắng
cac_phan = ho_ten_day_du.split()
ho = cac_phan[0]
ten = cac_phan[-1]  # Phần tử cuối cùng
ten_dem = " ".join(cac_phan[1:-1])  # Các phần ở giữa

print(f"Họ: {ho}")
print(f"Tên đệm: {ten_dem}")  
print(f"Tên: {ten}")
print(f"Tên viết tắt: {ho[0]}.{ten[0]}.")
print(f"Độ dài tên: {len(ho_ten_day_du)} ký tự")
```

## 🎊 Tóm Tắt

Trong bài này, bạn đã học được:

✅ **Tạo chuỗi**: Dùng `"..."` hoặc `'...'`  
✅ **Nối chuỗi**: Dùng `+` hoặc f-string  
✅ **F-string**: `f"Tôi {tuoi} tuổi"` - Cách hiện đại nhất  
✅ **Cắt chuỗi**: `chuoi[start:end]`  
✅ **Độ dài**: `len(chuoi)`  
✅ **Kiểm tra nội dung**: `in`, `startswith()`, `endswith()`  

## 🚀 Bước Tiếp Theo

Bây giờ bạn đã biết làm việc với chữ và số! Tiếp theo, chúng ta sẽ học về **Boolean và Logic** - cách dạy Python phân biệt đúng/sai trong bài [Boolean và Logic Cơ Bản](/python/basics/boolean-and-logic).

:::tip 🎯 Thử Thách Nhỏ
Hãy thử tạo một "máy tạo username" tự động từ họ tên! Ví dụ: "Nguyễn Văn An" → "nguyenvanan2024" (tên + họ + năm hiện tại, tất cả viết thường, bỏ dấu cách)
:::

---

*🔗 **Bài tiếp theo**: [Boolean và Logic Cơ Bản - Dạy Python Phân Biệt Đúng Sai](/python/basics/boolean-and-logic)*
