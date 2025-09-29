# 💪 Bài Tập Cơ Bản - Làm quen với Python

:::info
Những bài tập đầu tiên để làm quen với Python - giống như tập thể dục buổi sáng cho lập trình viên!
:::

## 🎯 Mục tiêu

Sau bài này bạn sẽ:
- ✅ Thực hành viết code Python cơ bản
- ✅ Làm quen với biến và kiểu dữ liệu
- ✅ Sử dụng input/output
- ✅ Thực hiện các phép tính đơn giản
- ✅ Tự tin với syntax Python

## 🏋️ Bài Tập Khởi Động

### Bài 1: Chào hỏi thân thiện 👋

**Yêu cầu**: Viết chương trình hỏi tên người dùng và chào họ.

```python
# 💡 Hướng dẫn
# - Dùng input() để nhận tên
# - Dùng print() để chào hỏi
# - Kết hợp chuỗi với +

# ✍️ Viết code của bạn ở đây:

```

<details>
<summary>🔍 Xem đáp án</summary>

```python
# Giải pháp 1: Cơ bản
ten = input("Tên bạn là gì? ")
print("Xin chào " + ten + "!")

# Giải pháp 2: Dùng f-string (khuyến nghị)
ten = input("Tên bạn là gì? ")
print(f"Xin chào {ten}!")

# Giải pháp 3: Thêm phần thân thiện
ten = input("Tên bạn là gì? ")
print(f"Xin chào {ten}! Rất vui được gặp bạn! 😊")
```
</details>

---

### Bài 2: Máy tính tuổi 🎂

**Yêu cầu**: Hỏi năm sinh và tính tuổi hiện tại.

```python
# 💡 Hướng dẫn
# - Lấy năm sinh từ người dùng
# - Tính tuổi = năm hiện tại - năm sinh
# - Nhớ chuyển string thành int

# ✍️ Viết code của bạn ở đây:

```

<details>
<summary>🔍 Xem đáp án</summary>

```python
# Giải pháp 1: Đơn giản
nam_sinh = int(input("Bạn sinh năm nào? "))
tuoi = 2024 - nam_sinh
print(f"Bạn {tuoi} tuổi!")

# Giải pháp 2: Tự động lấy năm hiện tại
import datetime
nam_sinh = int(input("Bạn sinh năm nào? "))
nam_hien_tai = datetime.datetime.now().year
tuoi = nam_hien_tai - nam_sinh
print(f"Bạn {tuoi} tuổi!")

# Giải pháp 3: Có kiểm tra
nam_sinh = int(input("Bạn sinh năm nào? "))
if nam_sinh > 2024:
    print("Bạn chưa ra đời à? 😄")
else:
    tuoi = 2024 - nam_sinh
    print(f"Bạn {tuoi} tuổi!")
```
</details>

---

### Bài 3: Chuyển đổi nhiệt độ 🌡️

**Yêu cầu**: Chuyển đổi từ độ C sang độ F.

```python
# 💡 Hướng dẫn
# - Công thức: F = C * 9/5 + 32
# - Nhận nhiệt độ C từ người dùng
# - Tính và hiển thị kết quả F

# ✍️ Viết code của bạn ở đây:

```

<details>
<summary>🔍 Xem đáp án</summary>

```python
# Giải pháp 1: Cơ bản
celsius = float(input("Nhập nhiệt độ (°C): "))
fahrenheit = celsius * 9/5 + 32
print(f"{celsius}°C = {fahrenheit}°F")

# Giải pháp 2: Làm tròn kết quả
celsius = float(input("Nhập nhiệt độ (°C): "))
fahrenheit = round(celsius * 9/5 + 32, 1)
print(f"{celsius}°C = {fahrenheit}°F")

# Giải pháp 3: Thêm mô tả
celsius = float(input("Nhập nhiệt độ (°C): "))
fahrenheit = round(celsius * 9/5 + 32, 1)
print(f"🌡️ {celsius}°C = {fahrenheit}°F")

# Thêm mô tả thời tiết
if celsius < 0:
    print("🥶 Trời lạnh quá!")
elif celsius > 35:
    print("🥵 Trời nóng quá!")
else:
    print("😊 Thời tiết dễ chịu!")
```
</details>

---

## 🧮 Bài Tập Toán Học

### Bài 4: Tính diện tích hình chữ nhật 📐

**Yêu cầu**: Tính diện tích và chu vi hình chữ nhật.

```python
# 💡 Hướng dẫn
# - Nhận chiều dài và chiều rộng
# - Diện tích = dài × rộng
# - Chu vi = 2 × (dài + rộng)

# ✍️ Viết code của bạn ở đây:

```

<details>
<summary>🔍 Xem đáp án</summary>

```python
# Giải pháp hoàn chỉnh
print("📐 TÍNH DIỆN TÍCH HÌNH CHỮ NHẬT")
print("=" * 35)

chieu_dai = float(input("Nhập chiều dài (m): "))
chieu_rong = float(input("Nhập chiều rộng (m): "))

dien_tich = chieu_dai * chieu_rong
chu_vi = 2 * (chieu_dai + chieu_rong)

print(f"\n📊 Kết quả:")
print(f"   📏 Diện tích: {dien_tich} m²")
print(f"   🔄 Chu vi: {chu_vi} m")

# Thêm phân loại kích thước
if dien_tich < 10:
    print("   📦 Kích thước nhỏ")
elif dien_tich < 50:
    print("   🏠 Kích thước trung bình")
else:
    print("   🏢 Kích thước lớn")
```
</details>

---

### Bài 5: Máy tính tip nhà hàng 💰

**Yêu cầu**: Tính tiền tip và tổng tiền phải trả.

```python
# 💡 Hướng dẫn
# - Nhận tổng hóa đơn
# - Nhận % tip (thường 10-20%)
# - Tính tiền tip và tổng cộng

# ✍️ Viết code của bạn ở đây:

```

<details>
<summary>🔍 Xem đáp án</summary>

```python
# Giải pháp với nhiều tùy chọn
print("💰 MÁY TÍNH TIP NHÀ HÀNG")
print("=" * 30)

tong_hoa_don = float(input("💳 Tổng hóa đơn: "))
print("\n📋 Chọn mức tip:")
print("   1. 10% - Dịch vụ bình thường")
print("   2. 15% - Dịch vụ tốt")
print("   3. 20% - Dịch vụ xuất sắc")
print("   4. Tự nhập")

lua_chon = input("👉 Chọn (1-4): ")

if lua_chon == "1":
    phan_tram_tip = 10
elif lua_chon == "2":
    phan_tram_tip = 15
elif lua_chon == "3":
    phan_tram_tip = 20
else:
    phan_tram_tip = float(input("Nhập % tip: "))

tien_tip = tong_hoa_don * phan_tram_tip / 100
tong_cong = tong_hoa_don + tien_tip

print(f"\n📊 Chi tiết thanh toán:")
print(f"   💳 Hóa đơn: {tong_hoa_don:,.0f}đ")
print(f"   💝 Tip ({phan_tram_tip}%): {tien_tip:,.0f}đ")
print(f"   💰 Tổng cộng: {tong_cong:,.0f}đ")
```
</details>

---

## 🎮 Bài Tập Tư Duy

### Bài 6: Phân loại điểm số 📊

**Yêu cầu**: Nhận điểm và phân loại học lực.

```python
# 💡 Hướng dẫn
# - Nhận điểm từ 0-10
# - Phân loại: Xuất sắc (9-10), Giỏi (8-8.9), Khá (7-7.9), 
#   Trung bình (5-6.9), Yếu (<5)

# ✍️ Viết code của bạn ở đây:

```

<details>
<summary>🔍 Xem đáp án</summary>

```python
# Giải pháp với emoji và màu sắc
print("📊 PHÂN LOẠI HỌC LỰC")
print("=" * 25)

diem = float(input("Nhập điểm (0-10): "))

# Kiểm tra điểm hợp lệ
if diem < 0 or diem > 10:
    print("❌ Điểm không hợp lệ!")
else:
    if diem >= 9:
        print(f"🏆 Xuất sắc! Điểm {diem} thật tuyệt vời!")
    elif diem >= 8:
        print(f"🌟 Giỏi! Điểm {diem} rất tốt!")
    elif diem >= 7:
        print(f"👍 Khá! Điểm {diem} ổn đấy!")
    elif diem >= 5:
        print(f"📚 Trung bình. Điểm {diem}, cần cố gắng thêm!")
    else:
        print(f"💪 Yếu. Điểm {diem}, đừng bỏ cuộc nhé!")

    # Thêm lời khuyên
    if diem < 8:
        print("💡 Lời khuyên: Hãy ôn tập thêm và không ngừng cố gắng!")
```
</details>

---

### Bài 7: Kiểm tra số chẵn lẻ 🔢

**Yêu cầu**: Kiểm tra số người dùng nhập là chẵn hay lẻ.

```python
# 💡 Hướng dẫn
# - Dùng phép chia lấy dư (%)
# - Số chẵn: n % 2 == 0
# - Số lẻ: n % 2 == 1

# ✍️ Viết code của bạn ở đây:

```

<details>
<summary>🔍 Xem đáp án</summary>

```python
# Giải pháp với nhiều số
print("🔢 KIỂM TRA SỐ CHẴN LẺ")
print("=" * 30)

while True:
    try:
        so = int(input("Nhập một số nguyên (0 để thoát): "))
        
        if so == 0:
            print("👋 Tạm biệt!")
            break
        
        if so % 2 == 0:
            print(f"✅ Số {so} là số CHẴN")
        else:
            print(f"❌ Số {so} là số LẺ")
        
        # Thêm thông tin bổ sung
        if so > 0:
            print(f"   📈 Đây là số dương")
        else:
            print(f"   📉 Đây là số âm")
        
        print("-" * 20)
        
    except ValueError:
        print("⚠️ Vui lòng nhập số nguyên!")
```
</details>

---

### Bài 8: Tính số ngày trong tháng 📅

**Yêu cầu**: Nhận tháng và năm, tính số ngày trong tháng đó.

```python
# 💡 Hướng dẫn
# - Tháng 1,3,5,7,8,10,12: 31 ngày
# - Tháng 4,6,9,11: 30 ngày  
# - Tháng 2: 28 ngày (29 nếu năm nhuận)

# ✍️ Viết code của bạn ở đây:

```

<details>
<summary>🔍 Xem đáp án</summary>

```python
print("📅 TÍNH SỐ NGÀY TRONG THÁNG")
print("=" * 35)

thang = int(input("Nhập tháng (1-12): "))
nam = int(input("Nhập năm: "))

# Kiểm tra tháng hợp lệ
if thang < 1 or thang > 12:
    print("❌ Tháng không hợp lệ!")
else:
    # Tháng có 31 ngày
    if thang in [1, 3, 5, 7, 8, 10, 12]:
        so_ngay = 31
    # Tháng có 30 ngày
    elif thang in [4, 6, 9, 11]:
        so_ngay = 30
    # Tháng 2
    else:
        # Kiểm tra năm nhuận
        if (nam % 4 == 0 and nam % 100 != 0) or (nam % 400 == 0):
            so_ngay = 29
            nam_nhuan = True
        else:
            so_ngay = 28
            nam_nhuan = False
    
    # Tên tháng
    ten_thang = [
        "", "Một", "Hai", "Ba", "Tư", "Năm", "Sáu",
        "Bảy", "Tám", "Chín", "Mười", "Mười một", "Mười hai"
    ]
    
    print(f"\n📊 Kết quả:")
    print(f"   📅 Tháng {ten_thang[thang]} năm {nam}")
    print(f"   🗓️ Có {so_ngay} ngày")
    
    if thang == 2:
        if nam_nhuan:
            print(f"   🌟 {nam} là năm nhuận!")
        else:
            print(f"   📝 {nam} không phải năm nhuận")
```
</details>

---

## 🎯 Bài Tập Tổng Hợp

### Bài 9: Máy tính BMI 🏃‍♂️

**Yêu cầu**: Tính chỉ số BMI và phân loại sức khỏe.

```python
# 💡 Hướng dẫn
# - BMI = cân nặng (kg) / (chiều cao (m))²
# - Phân loại: Gầy (<18.5), Bình thường (18.5-24.9), 
#   Thừa cân (25-29.9), Béo phì (≥30)

# ✍️ Viết code của bạn ở đây:

```

<details>
<summary>🔍 Xem đáp án</summary>

```python
print("🏃‍♂️ TÍNH CHỈ SỐ BMI")
print("=" * 25)

print("📝 Nhập thông tin của bạn:")
can_nang = float(input("⚖️ Cân nặng (kg): "))
chieu_cao = float(input("📏 Chiều cao (cm): "))

# Chuyển cm thành m
chieu_cao_m = chieu_cao / 100

# Tính BMI
bmi = can_nang / (chieu_cao_m ** 2)

print(f"\n📊 Kết quả:")
print(f"   📏 Chiều cao: {chieu_cao} cm")
print(f"   ⚖️ Cân nặng: {can_nang} kg")
print(f"   📈 BMI: {bmi:.1f}")

# Phân loại
if bmi < 18.5:
    print(f"   🥺 Gầy - Cần tăng cân")
    loi_khuyen = "Hãy ăn uống đủ chất và tập thể dục!"
elif bmi < 25:
    print(f"   😊 Bình thường - Tuyệt vời!")
    loi_khuyen = "Hãy duy trì lối sống lành mạnh!"
elif bmi < 30:
    print(f"   😐 Thừa cân - Cần chú ý")
    loi_khuyen = "Hãy ăn ít hơn và vận động nhiều hơn!"
else:
    print(f"   😰 Béo phì - Cần giảm cân")
    loi_khuyen = "Hãy tham khảo ý kiến bác sĩ và có chế độ lành mạnh!"

print(f"   💡 Lời khuyên: {loi_khuyen}")
```
</details>

---

### Bài 10: Game đoán số mini 🎲

**Yêu cầu**: Tạo game đoán số từ 1-10.

```python
# 💡 Hướng dẫn
# - Tạo số ngẫu nhiên từ 1-10
# - Cho người dùng đoán
# - Đưa ra gợi ý "lớn hơn" hoặc "nhỏ hơn"

# ✍️ Viết code của bạn ở đây:

```

<details>
<summary>🔍 Xem đáp án</summary>

```python
import random

print("🎲 GAME ĐOÁN SỐ MINI")
print("=" * 25)
print("🎯 Tôi đang nghĩ một số từ 1 đến 10")
print("🤔 Bạn có thể đoán được không?")

# Tạo số ngẫu nhiên
so_may_tinh = random.randint(1, 10)
so_lan_doan = 0
max_lan_doan = 3

while so_lan_doan < max_lan_doan:
    try:
        so_lan_doan += 1
        so_du_doan = int(input(f"\n🎯 Lần đoán {so_lan_doan}: "))
        
        if so_du_doan == so_may_tinh:
            print(f"🎉 Chính xác! Số đó là {so_may_tinh}")
            print(f"🏆 Bạn đoán đúng trong {so_lan_doan} lần!")
            
            if so_lan_doan == 1:
                print("🌟 Xuất sắc! Đoán trúng ngay lần đầu!")
            elif so_lan_doan == 2:
                print("👍 Giỏi lắm! Nhanh như chớp!")
            else:
                print("😊 Cuối cùng cũng đúng!")
            break
            
        elif so_du_doan < so_may_tinh:
            print("📈 Số tôi nghĩ LỚN HƠN!")
        else:
            print("📉 Số tôi nghĩ NHỎ HƠN!")
        
        # Kiểm tra hết lượt
        if so_lan_doan == max_lan_doan:
            print(f"\n😅 Hết lượt rồi! Số đó là {so_may_tinh}")
            print("🎮 Chơi lại lần sau nhé!")
        else:
            con_lai = max_lan_doan - so_lan_doan
            print(f"⏰ Còn {con_lai} lần đoán!")
            
    except ValueError:
        print("⚠️ Vui lòng nhập số từ 1 đến 10!")
        so_lan_doan -= 1  # Không tính lần nhập sai
```
</details>

---

## 🏆 Thử Thách Bonus

### Bài 11: Máy tính tiền điện ⚡

**Yêu cầu**: Tính tiền điện theo bậc thang VN.

```python
# 💡 Bậc thang điện (đơn giản):
# - 0-50 kWh: 1,806đ/kWh
# - 51-100 kWh: 1,866đ/kWh  
# - 101-200 kWh: 2,167đ/kWh
# - >200 kWh: 2,729đ/kWh

# ✍️ Viết code của bạn ở đây:

```

<details>
<summary>🔍 Xem đáp án</summary>

```python
print("⚡ MÁY TÍNH TIỀN ĐIỆN")
print("=" * 30)

so_dien = float(input("📊 Nhập số điện đã dùng (kWh): "))

if so_dien <= 0:
    print("❌ Số điện không hợp lệ!")
else:
    tien_dien = 0
    
    # Bậc 1: 0-50 kWh
    if so_dien <= 50:
        tien_dien = so_dien * 1806
    else:
        tien_dien += 50 * 1806
        so_dien_con_lai = so_dien - 50
        
        # Bậc 2: 51-100 kWh
        if so_dien_con_lai <= 50:
            tien_dien += so_dien_con_lai * 1866
        else:
            tien_dien += 50 * 1866
            so_dien_con_lai -= 50
            
            # Bậc 3: 101-200 kWh
            if so_dien_con_lai <= 100:
                tien_dien += so_dien_con_lai * 2167
            else:
                tien_dien += 100 * 2167
                so_dien_con_lai -= 100
                
                # Bậc 4: >200 kWh
                tien_dien += so_dien_con_lai * 2729
    
    # Thêm VAT 10%
    tien_vat = tien_dien * 0.1
    tong_tien = tien_dien + tien_vat
    
    print(f"\n💡 HÓA ĐƠN ĐIỆN")
    print("-" * 25)
    print(f"⚡ Số điện: {so_dien:.1f} kWh")
    print(f"💰 Tiền điện: {tien_dien:,.0f}đ")
    print(f"📊 VAT (10%): {tien_vat:,.0f}đ")
    print(f"💳 Tổng cộng: {tong_tien:,.0f}đ")
    
    # Lời khuyên tiết kiệm
    if so_dien > 200:
        print("\n💡 Lời khuyên: Bạn dùng nhiều điện quá!")
        print("🔌 Hãy tắt các thiết bị không cần thiết")
    elif so_dien > 100:
        print("\n👍 Mức tiêu thụ ở mức trung bình")
        print("💡 Có thể tiết kiệm thêm một chút")
    else:
        print("\n🌟 Excellent! Bạn rất tiết kiệm điện!")
        print("🌱 Góp phần bảo vệ môi trường!")
```
</details>

---

## 📝 Tự Kiểm Tra

:::tip Checklist hoàn thành:
- [ ] Làm được ít nhất 8/11 bài
- [ ] Hiểu cách sử dụng input/output
- [ ] Biết chuyển đổi kiểu dữ liệu (int, float, string)
- [ ] Sử dụng được if/elif/else
- [ ] Làm được phép tính cơ bản
- [ ] Viết code có cấu trúc rõ ràng
- [ ] Thêm được emoji và làm đẹp output
:::

## 🎯 Bước tiếp theo

Sau khi hoàn thành bài này, hãy chuyển sang:
- 📝 [Bài tập về biến](./variable-exercises.md)
- 🔤 [Bài tập về chuỗi](./string-exercises.md)
- 🔄 [Bài tập về vòng lặp](./loop-exercises.md)

## 💡 Tips thành công

1. **Đừng copy-paste** - Hãy gõ lại từng dòng
2. **Thử nghiệm** - Thay đổi giá trị và xem chuyện gì xảy ra
3. **Debug** - Nếu lỗi, đọc thông báo lỗi cẩn thận
4. **Cải tiến** - Thêm tính năng mới vào bài tập
5. **Thực hành hàng ngày** - 30 phút/ngày là đủ

---
*💪 Remember: Lập trình giống như học lái xe - cần thực hành nhiều mới thành thạo!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
