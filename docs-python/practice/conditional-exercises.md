# 🔀 Bài Tập về Câu Lệnh Điều Kiện trong Python

Chào mừng bạn đến với các bài tập về câu lệnh điều kiện! Những bài tập này sẽ giúp bạn hiểu sâu hơn về cách sử dụng `if`, `elif` và `else` để kiểm soát luồng chương trình.

## 🔰 Bài Tập Mức Cơ Bản

### Bài 1: Kiểm Tra Số Dương hay Số Âm
**Yêu cầu:** Viết một chương trình nhận vào một số từ người dùng và in ra thông báo cho biết số đó là số dương, số âm hay bằng không.

<details>
<summary>Xem gợi ý</summary>

```python
# Nhập số từ người dùng
number = float(input("Nhập một số: "))

# Kiểm tra và hiển thị kết quả
if number > 0:
    print(f"{number} là số dương")
elif number < 0:
    print(f"{number} là số âm")
else:
    print(f"{number} bằng không")
```
</details>

### Bài 2: Kiểm Tra Số Chẵn hay Số Lẻ
**Yêu cầu:** Viết chương trình kiểm tra một số là chẵn hay lẻ. Nếu số đó chia hết cho 2, thì đó là số chẵn, ngược lại là số lẻ.

<details>
<summary>Xem gợi ý</summary>

```python
# Nhập số từ người dùng
number = int(input("Nhập một số nguyên: "))

# Kiểm tra số chẵn hay lẻ
if number % 2 == 0:
    print(f"{number} là số chẵn")
else:
    print(f"{number} là số lẻ")
```
</details>

### Bài 3: Kiểm Tra Tuổi
**Yêu cầu:** Viết chương trình nhận tuổi của người dùng và in thông báo phù hợp:
- Dưới 13 tuổi: "Bạn là trẻ em"
- Từ 13-17 tuổi: "Bạn là thiếu niên"
- Từ 18-64 tuổi: "Bạn là người trưởng thành" 
- Từ 65 trở lên: "Bạn là người cao tuổi"

<details>
<summary>Xem gợi ý</summary>

```python
# Nhận tuổi từ người dùng
age = int(input("Nhập tuổi của bạn: "))

# Kiểm tra và hiển thị thông báo phù hợp
if age < 0:
    print("Tuổi không hợp lệ!")
elif age < 13:
    print("Bạn là trẻ em")
elif age < 18:
    print("Bạn là thiếu niên")
elif age < 65:
    print("Bạn là người trưởng thành")
else:
    print("Bạn là người cao tuổi")
```
</details>

## 🔄 Bài Tập Mức Trung Bình

### Bài 4: Tính Học Lực
**Yêu cầu:** Viết chương trình nhận điểm trung bình của học sinh (0-10) và hiển thị học lực:
- 9-10: Xuất sắc
- 8-8.9: Giỏi
- 7-7.9: Khá
- 5-6.9: Trung bình
- Dưới 5: Yếu

<details>
<summary>Xem gợi ý</summary>

```python
# Nhận điểm trung bình từ người dùng
average_score = float(input("Nhập điểm trung bình của học sinh (0-10): "))

# Kiểm tra tính hợp lệ của điểm
if average_score < 0 or average_score > 10:
    print("Điểm không hợp lệ! Điểm phải nằm trong khoảng 0-10.")
else:
    # Xác định học lực
    if average_score >= 9:
        print("Học lực: Xuất sắc")
    elif average_score >= 8:
        print("Học lực: Giỏi")
    elif average_score >= 7:
        print("Học lực: Khá")
    elif average_score >= 5:
        print("Học lực: Trung bình")
    else:
        print("Học lực: Yếu")
```
</details>

### Bài 5: Máy Tính Đơn Giản
**Yêu cầu:** Viết một máy tính đơn giản cho phép người dùng nhập hai số và một phép toán (+, -, *, /), sau đó hiển thị kết quả. Đảm bảo xử lý trường hợp chia cho 0.

<details>
<summary>Xem gợi ý</summary>

```python
# Nhận đầu vào từ người dùng
num1 = float(input("Nhập số thứ nhất: "))
num2 = float(input("Nhập số thứ hai: "))
operation = input("Nhập phép toán (+, -, *, /): ")

# Thực hiện phép tính dựa trên phép toán được chọn
if operation == "+":
    result = num1 + num2
    print(f"{num1} + {num2} = {result}")
elif operation == "-":
    result = num1 - num2
    print(f"{num1} - {num2} = {result}")
elif operation == "*":
    result = num1 * num2
    print(f"{num1} * {num2} = {result}")
elif operation == "/":
    # Kiểm tra chia cho 0
    if num2 == 0:
        print("Lỗi: Không thể chia cho 0!")
    else:
        result = num1 / num2
        print(f"{num1} / {num2} = {result}")
else:
    print("Phép toán không hợp lệ! Vui lòng chỉ sử dụng +, -, *, /")
```
</details>

### Bài 6: Kiểm Tra Năm Nhuận
**Yêu cầu:** Viết chương trình kiểm tra một năm có phải là năm nhuận hay không. Một năm là năm nhuận nếu:
- Năm đó chia hết cho 4 nhưng không chia hết cho 100, hoặc
- Năm đó chia hết cho 400

<details>
<summary>Xem gợi ý</summary>

```python
# Nhận năm từ người dùng
year = int(input("Nhập năm cần kiểm tra: "))

# Kiểm tra năm nhuận
if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print(f"{year} là năm nhuận")
else:
    print(f"{year} không phải là năm nhuận")
```
</details>

## 🚀 Bài Tập Mức Nâng Cao

### Bài 7: Giải Phương Trình Bậc 2
**Yêu cầu:** Viết chương trình giải phương trình bậc 2: ax² + bx + c = 0. Chương trình cần xử lý tất cả các trường hợp có thể xảy ra.

<details>
<summary>Xem gợi ý</summary>

```python
import math

# Nhập các hệ số
a = float(input("Nhập hệ số a: "))
b = float(input("Nhập hệ số b: "))
c = float(input("Nhập hệ số c: "))

# Kiểm tra loại phương trình
if a == 0:
    # Phương trình bậc 1: bx + c = 0
    if b == 0:
        if c == 0:
            print("Phương trình có vô số nghiệm")
        else:
            print("Phương trình vô nghiệm")
    else:
        x = -c / b
        print(f"Phương trình có một nghiệm: x = {x}")
else:
    # Phương trình bậc 2: ax² + bx + c = 0
    # Tính delta
    delta = b**2 - 4*a*c
    
    # Kiểm tra delta để xác định số nghiệm
    if delta < 0:
        print("Phương trình không có nghiệm thực")
    elif delta == 0:
        x = -b / (2*a)
        print(f"Phương trình có nghiệm kép: x = {x}")
    else:
        x1 = (-b + math.sqrt(delta)) / (2*a)
        x2 = (-b - math.sqrt(delta)) / (2*a)
        print(f"Phương trình có hai nghiệm phân biệt:")
        print(f"x1 = {x1}")
        print(f"x2 = {x2}")
```
</details>

### Bài 8: Xếp Loại BMI
**Yêu cầu:** Viết chương trình tính chỉ số BMI (Body Mass Index) và phân loại dựa trên chỉ số đó:
- BMI < 18.5: Gầy
- 18.5 ≤ BMI < 25: Bình thường
- 25 ≤ BMI < 30: Thừa cân
- BMI ≥ 30: Béo phì

Công thức: BMI = cân nặng (kg) / (chiều cao (m))²

<details>
<summary>Xem gợi ý</summary>

```python
# Nhập cân nặng và chiều cao
weight = float(input("Nhập cân nặng của bạn (kg): "))
height = float(input("Nhập chiều cao của bạn (m): "))

# Kiểm tra đầu vào hợp lệ
if weight <= 0 or height <= 0:
    print("Cân nặng và chiều cao phải là số dương!")
else:
    # Tính BMI
    bmi = weight / (height ** 2)
    print(f"Chỉ số BMI của bạn là: {bmi:.2f}")
    
    # Phân loại BMI
    if bmi < 18.5:
        print("Phân loại: Gầy")
        print("Lời khuyên: Bạn nên tăng cân một cách lành mạnh")
    elif bmi < 25:
        print("Phân loại: Bình thường")
        print("Lời khuyên: Tiếp tục duy trì lối sống lành mạnh")
    elif bmi < 30:
        print("Phân loại: Thừa cân")
        print("Lời khuyên: Bạn nên tập thể dục thường xuyên và điều chỉnh chế độ ăn")
    else:
        print("Phân loại: Béo phì")
        print("Lời khuyên: Bạn nên tham khảo ý kiến bác sĩ để có phương pháp giảm cân phù hợp")
```
</details>

### Bài 9: Tính Tiền Điện
**Yêu cầu:** Viết chương trình tính tiền điện dựa trên số kWh tiêu thụ với biểu giá như sau:
- 50 kWh đầu tiên: 1,678 đồng/kWh
- Từ kWh 51 - 100: 1,734 đồng/kWh
- Từ kWh 101 - 200: 2,014 đồng/kWh
- Từ kWh 201 - 300: 2,536 đồng/kWh
- Từ kWh 301 - 400: 2,834 đồng/kWh
- Từ kWh 401 trở lên: 2,927 đồng/kWh

<details>
<summary>Xem gợi ý</summary>

```python
# Khai báo biểu giá
TIER_1_RATE = 1678  # 0-50 kWh
TIER_2_RATE = 1734  # 51-100 kWh
TIER_3_RATE = 2014  # 101-200 kWh
TIER_4_RATE = 2536  # 201-300 kWh
TIER_5_RATE = 2834  # 301-400 kWh
TIER_6_RATE = 2927  # 401+ kWh

# Nhập số kWh tiêu thụ
consumption = float(input("Nhập số kWh điện đã tiêu thụ: "))

# Kiểm tra tính hợp lệ của đầu vào
if consumption < 0:
    print("Số kWh không hợp lệ! Vui lòng nhập số không âm.")
else:
    # Tính tiền điện
    bill = 0
    
    if consumption > 400:
        bill += (consumption - 400) * TIER_6_RATE
        consumption = 400
        
    if consumption > 300:
        bill += (consumption - 300) * TIER_5_RATE
        consumption = 300
        
    if consumption > 200:
        bill += (consumption - 200) * TIER_4_RATE
        consumption = 200
        
    if consumption > 100:
        bill += (consumption - 100) * TIER_3_RATE
        consumption = 100
        
    if consumption > 50:
        bill += (consumption - 50) * TIER_2_RATE
        consumption = 50
        
    if consumption > 0:
        bill += consumption * TIER_1_RATE
    
    # Hiển thị kết quả
    print(f"Tiền điện của bạn là: {bill:,.0f} đồng")
```
</details>

## 💪 Bài Tập Thử Thách

### Bài 10: Xác Định Tam Giác
**Yêu cầu:** Viết chương trình nhận ba cạnh của một tam giác và xác định loại tam giác (đều, cân, vuông, vuông cân, thường) hoặc không phải tam giác.

<details>
<summary>Xem gợi ý</summary>

```python
# Nhập độ dài ba cạnh
a = float(input("Nhập độ dài cạnh thứ nhất: "))
b = float(input("Nhập độ dài cạnh thứ hai: "))
c = float(input("Nhập độ dài cạnh thứ ba: "))

# Kiểm tra điều kiện tạo thành tam giác
if a <= 0 or b <= 0 or c <= 0:
    print("Các cạnh phải là số dương!")
elif a + b <= c or a + c <= b or b + c <= a:
    print("Ba cạnh này không tạo thành tam giác!")
else:
    # Xác định loại tam giác
    is_equilateral = (a == b == c)
    is_isosceles = (a == b) or (b == c) or (a == c)
    
    # Kiểm tra tam giác vuông (định lý Pytago)
    sides = [a, b, c]
    sides.sort()  # Sắp xếp các cạnh
    is_right = abs(sides[0]**2 + sides[1]**2 - sides[2]**2) < 0.000001  # So sánh với sai số nhỏ
    
    if is_equilateral:
        print("Đây là tam giác đều")
    elif is_right and is_isosceles:
        print("Đây là tam giác vuông cân")
    elif is_right:
        print("Đây là tam giác vuông")
    elif is_isosceles:
        print("Đây là tam giác cân")
    else:
        print("Đây là tam giác thường")
```
</details>

### Bài 11: Kiểm Tra Ngày Hợp Lệ
**Yêu cầu:** Viết chương trình nhận ngày, tháng, năm từ người dùng và kiểm tra xem ngày đó có hợp lệ hay không, tính cả năm nhuận.

<details>
<summary>Xem gợi ý</summary>

```python
# Nhập ngày, tháng, năm
day = int(input("Nhập ngày: "))
month = int(input("Nhập tháng: "))
year = int(input("Nhập năm: "))

# Kiểm tra năm nhuận
def is_leap_year(year):
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

# Kiểm tra ngày tháng hợp lệ
is_valid = True
reason = ""

# Kiểm tra năm
if year < 1:
    is_valid = False
    reason = "Năm không hợp lệ"
# Kiểm tra tháng
elif month < 1 or month > 12:
    is_valid = False
    reason = "Tháng không hợp lệ"
# Kiểm tra ngày dựa trên tháng và năm
else:
    # Tạo danh sách số ngày trong mỗi tháng
    days_in_month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    # Điều chỉnh tháng 2 nếu là năm nhuận
    if is_leap_year(year):
        days_in_month[2] = 29
    
    # Kiểm tra ngày
    if day < 1 or day > days_in_month[month]:
        is_valid = False
        reason = f"Ngày không hợp lệ cho tháng {month}"

# Hiển thị kết quả
if is_valid:
    print(f"Ngày {day}/{month}/{year} là ngày hợp lệ")
else:
    print(f"Ngày {day}/{month}/{year} không hợp lệ. Lý do: {reason}")
```
</details>

### Bài 12: Xếp Loại Học Sinh
**Yêu cầu:** Viết chương trình nhận điểm của học sinh cho ba môn Toán, Văn, Anh và tính điểm trung bình, sau đó xếp loại học sinh như sau:
- Điểm trung bình ≥ 8.0 và không có môn nào dưới 6.5: Giỏi
- Điểm trung bình ≥ 6.5 và không có môn nào dưới 5.0: Khá
- Điểm trung bình ≥ 5.0 và không có môn nào dưới 3.5: Trung bình
- Còn lại: Yếu

<details>
<summary>Xem gợi ý</summary>

```python
# Nhập điểm ba môn
math_score = float(input("Nhập điểm Toán: "))
literature_score = float(input("Nhập điểm Văn: "))
english_score = float(input("Nhập điểm Anh: "))

# Kiểm tra tính hợp lệ của điểm số
if (math_score < 0 or math_score > 10 or 
    literature_score < 0 or literature_score > 10 or 
    english_score < 0 or english_score > 10):
    print("Điểm không hợp lệ! Mỗi môn phải có điểm từ 0-10.")
else:
    # Tính điểm trung bình
    average = (math_score + literature_score + english_score) / 3
    print(f"Điểm trung bình: {average:.2f}")
    
    # Xếp loại học sinh
    if average >= 8.0 and min(math_score, literature_score, english_score) >= 6.5:
        print("Xếp loại: Giỏi")
    elif average >= 6.5 and min(math_score, literature_score, english_score) >= 5.0:
        print("Xếp loại: Khá")
    elif average >= 5.0 and min(math_score, literature_score, english_score) >= 3.5:
        print("Xếp loại: Trung bình")
    else:
        print("Xếp loại: Yếu")
```
</details>

## 🎯 Thực Hành Thêm

Hãy thử thực hiện các bài tập sau đây để nâng cao kỹ năng của bạn:

1. Viết chương trình mô phỏng ATM, cho phép người dùng rút tiền, gửi tiền, kiểm tra số dư
2. Viết chương trình dự đoán cung hoàng đạo dựa trên ngày tháng sinh
3. Viết chương trình chuyển đổi số thành chữ (ví dụ: 1 -> "một", 15 -> "mười lăm")
4. Viết chương trình kiểm tra tính hợp lệ của mật khẩu (ví dụ: phải có ít nhất 8 ký tự, chứa chữ hoa, chữ thường, số)
5. Viết chương trình tính thuế thu nhập cá nhân dựa trên mức thu nhập

---

Chúc bạn học tập hiệu quả! Câu lệnh điều kiện là một trong những kiến thức nền tảng quan trọng nhất trong lập trình, vì vậy hãy cố gắng làm thật nhiều bài tập để thành thạo nhé!
