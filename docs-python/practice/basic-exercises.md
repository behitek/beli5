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
user_name = input("Tên bạn là gì? ")
print("Xin chào " + user_name + "!")

# Giải pháp 2: Dùng f-string (khuyến nghị)
user_name = input("Tên bạn là gì? ")
print(f"Xin chào {user_name}!")

# Giải pháp 3: Thêm phần thân thiện
user_name = input("Tên bạn là gì? ")
print(f"Xin chào {user_name}! Rất vui được gặp bạn! 😊")
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
birth_year = int(input("Bạn sinh năm nào? "))
age = 2024 - birth_year
print(f"Bạn {age} tuổi!")

# Giải pháp 2: Tự động lấy năm hiện tại
import datetime
birth_year = int(input("Bạn sinh năm nào? "))
current_year = datetime.datetime.now().year
age = current_year - birth_year
print(f"Bạn {age} tuổi!")

# Giải pháp 3: Có kiểm tra
birth_year = int(input("Bạn sinh năm nào? "))
if birth_year > 2024:
    print("Bạn chưa ra đời à? 😄")
else:
    age = 2024 - birth_year
    print(f"Bạn {age} tuổi!")
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

length = float(input("Nhập chiều dài (m): "))
width = float(input("Nhập chiều rộng (m): "))

area = length * width
perimeter = 2 * (length + width)

print(f"\n📊 Kết quả:")
print(f"   📏 Diện tích: {area} m²")
print(f"   🔄 Chu vi: {perimeter} m")

# Thêm phân loại kích thước
if area < 10:
    print("   📦 Kích thước nhỏ")
elif area < 50:
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

total_bill = float(input("💳 Tổng hóa đơn: "))
print("\n📋 Chọn mức tip:")
print("   1. 10% - Dịch vụ bình thường")
print("   2. 15% - Dịch vụ tốt")
print("   3. 20% - Dịch vụ xuất sắc")
print("   4. Tự nhập")

choice = input("👉 Chọn (1-4): ")

if choice == "1":
    tip_percentage = 10
elif choice == "2":
    tip_percentage = 15
elif choice == "3":
    tip_percentage = 20
else:
    tip_percentage = float(input("Nhập % tip: "))

tip_amount = total_bill * tip_percentage / 100
total_amount = total_bill + tip_amount

print(f"\n📊 Chi tiết thanh toán:")
print(f"   💳 Hóa đơn: {total_bill:,.0f}đ")
print(f"   💝 Tip ({tip_percentage}%): {tip_amount:,.0f}đ")
print(f"   💰 Tổng cộng: {total_amount:,.0f}đ")
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

score = float(input("Nhập điểm (0-10): "))

# Kiểm tra điểm hợp lệ
if score < 0 or score > 10:
    print("❌ Điểm không hợp lệ!")
else:
    if score >= 9:
        print(f"🏆 Xuất sắc! Điểm {score} thật tuyệt vời!")
    elif score >= 8:
        print(f"🌟 Giỏi! Điểm {score} rất tốt!")
    elif score >= 7:
        print(f"👍 Khá! Điểm {score} ổn đấy!")
    elif score >= 5:
        print(f"📚 Trung bình. Điểm {score}, cần cố gắng thêm!")
    else:
        print(f"💪 Yếu. Điểm {score}, đừng bỏ cuộc nhé!")

    # Thêm lời khuyên
    if score < 8:
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
        number = int(input("Nhập một số nguyên (0 để thoát): "))
        
        if number == 0:
            print("👋 Tạm biệt!")
            break
        
        if number % 2 == 0:
            print(f"✅ Số {number} là số CHẴN")
        else:
            print(f"❌ Số {number} là số LẺ")
        
        # Thêm thông tin bổ sung
        if number > 0:
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

month = int(input("Nhập tháng (1-12): "))
year = int(input("Nhập năm: "))

# Kiểm tra tháng hợp lệ
if month < 1 or month > 12:
    print("❌ Tháng không hợp lệ!")
else:
    # Tháng có 31 ngày
    if month in [1, 3, 5, 7, 8, 10, 12]:
        days_count = 31
    # Tháng có 30 ngày
    elif month in [4, 6, 9, 11]:
        days_count = 30
    # Tháng 2
    else:
        # Kiểm tra năm nhuận
        if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
            days_count = 29
            is_leap_year = True
        else:
            days_count = 28
            is_leap_year = False
    
    # Tên tháng
    month_names = [
        "", "Một", "Hai", "Ba", "Tư", "Năm", "Sáu",
        "Bảy", "Tám", "Chín", "Mười", "Mười một", "Mười hai"
    ]
    
    print(f"\n📊 Kết quả:")
    print(f"   📅 Tháng {month_names[month]} năm {year}")
    print(f"   🗓️ Có {days_count} ngày")
    
    if month == 2:
        if is_leap_year:
            print(f"   🌟 {year} là năm nhuận!")
        else:
            print(f"   📝 {year} không phải năm nhuận")
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
weight = float(input("⚖️ Cân nặng (kg): "))
height_cm = float(input("📏 Chiều cao (cm): "))

# Chuyển cm thành m
height_m = height_cm / 100

# Tính BMI
bmi = weight / (height_m ** 2)

print(f"\n📊 Kết quả:")
print(f"   📏 Chiều cao: {height_cm} cm")
print(f"   ⚖️ Cân nặng: {weight} kg")
print(f"   📈 BMI: {bmi:.1f}")

# Phân loại
if bmi < 18.5:
    print(f"   🥺 Gầy - Cần tăng cân")
    advice = "Hãy ăn uống đủ chất và tập thể dục!"
elif bmi < 25:
    print(f"   😊 Bình thường - Tuyệt vời!")
    advice = "Hãy duy trì lối sống lành mạnh!"
elif bmi < 30:
    print(f"   😐 Thừa cân - Cần chú ý")
    advice = "Hãy ăn ít hơn và vận động nhiều hơn!"
else:
    print(f"   😰 Béo phì - Cần giảm cân")
    advice = "Hãy tham khảo ý kiến bác sĩ và có chế độ lành mạnh!"

print(f"   💡 Lời khuyên: {advice}")
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
computer_number = random.randint(1, 10)
attempt_count = 0
max_attempts = 3

while attempt_count < max_attempts:
    try:
        attempt_count += 1
        guessed_number = int(input(f"\n🎯 Lần đoán {attempt_count}: "))
        
        if guessed_number == computer_number:
            print(f"🎉 Chính xác! Số đó là {computer_number}")
            print(f"🏆 Bạn đoán đúng trong {attempt_count} lần!")
            
            if attempt_count == 1:
                print("🌟 Xuất sắc! Đoán trúng ngay lần đầu!")
            elif attempt_count == 2:
                print("👍 Giỏi lắm! Nhanh như chớp!")
            else:
                print("😊 Cuối cùng cũng đúng!")
            break
            
        elif guessed_number < computer_number:
            print("📈 Số tôi nghĩ LỚN HƠN!")
        else:
            print("📉 Số tôi nghĩ NHỎ HƠN!")
        
        # Kiểm tra hết lượt
        if attempt_count == max_attempts:
            print(f"\n😅 Hết lượt rồi! Số đó là {computer_number}")
            print("🎮 Chơi lại lần sau nhé!")
        else:
            remaining_attempts = max_attempts - attempt_count
            print(f"⏰ Còn {remaining_attempts} lần đoán!")
            
    except ValueError:
        print("⚠️ Vui lòng nhập số từ 1 đến 10!")
        attempt_count -= 1  # Không tính lần nhập sai
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

electricity_usage = float(input("📊 Nhập số điện đã dùng (kWh): "))

if electricity_usage <= 0:
    print("❌ Số điện không hợp lệ!")
else:
    electricity_cost = 0
    
    # Bậc 1: 0-50 kWh
    if electricity_usage <= 50:
        electricity_cost = electricity_usage * 1806
    else:
        electricity_cost += 50 * 1806
        remaining_usage = electricity_usage - 50
        
        # Bậc 2: 51-100 kWh
        if remaining_usage <= 50:
            electricity_cost += remaining_usage * 1866
        else:
            electricity_cost += 50 * 1866
            remaining_usage -= 50
            
            # Bậc 3: 101-200 kWh
            if remaining_usage <= 100:
                electricity_cost += remaining_usage * 2167
            else:
                electricity_cost += 100 * 2167
                remaining_usage -= 100
                
                # Bậc 4: >200 kWh
                electricity_cost += remaining_usage * 2729
    
    # Thêm VAT 10%
    vat_amount = electricity_cost * 0.1
    total_amount = electricity_cost + vat_amount
    
    print(f"\n💡 HÓA ĐƠN ĐIỆN")
    print("-" * 25)
    print(f"⚡ Số điện: {electricity_usage:.1f} kWh")
    print(f"💰 Tiền điện: {electricity_cost:,.0f}đ")
    print(f"📊 VAT (10%): {vat_amount:,.0f}đ")
    print(f"💳 Tổng cộng: {total_amount:,.0f}đ")
    
    # Lời khuyên tiết kiệm
    if electricity_usage > 200:
        print("\n💡 Lời khuyên: Bạn dùng nhiều điện quá!")
        print("🔌 Hãy tắt các thiết bị không cần thiết")
    elif electricity_usage > 100:
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
