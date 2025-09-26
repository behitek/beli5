# 🗣️ In thông điệp - Làm Python nói chuyện

## 🎯 Bạn sẽ học được gì?

Trong bài học này, bạn sẽ khám phá tất cả những cách thú vị để làm cho con rắn Python của bạn "nói chuyện"! Giống như việc dạy một người bạn cách kể chuyện hay hơn, chúng ta sẽ học cách làm cho Python trở thành một nhà kể chuyện xuất sắc.

:::tip 💡 Kiến thức cần có
Bạn nên đã hoàn thành bài [Chương trình Python đầu tiên](./first-program.md) trước khi học bài này.
:::

## 🤔 Tại sao cần học về in thông điệp?

Hãy tưởng tượng bạn có một người bạn không thể nhìn thấy (như con rắn Python), và cách duy nhất để giao tiếp với bạn ấy là qua lời nói. Bạn cần biết cách:

- 📢 Nói to, nói nhỏ
- 🎨 Trang trí lời nói cho đẹp
- 📝 Kể nhiều câu chuyện
- 🔢 Nói về số và chữ

## 🐍 Ôn tập: Lệnh print() cơ bản

Bạn đã biết cách này rồi:

```python
print("Xin chào!")
```

Nhưng `print()` có thể làm được nhiều điều thú vị hơn thế!

## 🎨 Các cách in thông điệp đẹp mắt

### 1. In nhiều thứ cùng lúc

```python
print("Tôi tên là", "Minh", "và tôi", 12, "tuổi")
```

**Kết quả:**
```
Tôi tên là Minh và tôi 12 tuổi
```

:::info 🔍 Giải thích
Python tự động thêm dấu cách giữa các phần khi bạn dùng dấu phẩy (`,`)
:::

### 2. In không xuống dòng

```python
print("Đang tải", end="")
print(".", end="")
print(".", end="")
print(".", end="")
print(" Xong!")
```

**Kết quả:**
```
Đang tải... Xong!
```

### 3. Thay đổi ký tự ngăn cách

```python
print("Táo", "Chuối", "Cam", "Xoài", sep=" - ")
```

**Kết quả:**
```
Táo - Chuối - Cam - Xoài
```

### 4. In với ký tự đặc biệt

```python
print("Dòng 1\nDòng 2\nDòng 3")  # \n = xuống dòng
print("Tab\tTab\tTab")             # \t = tab
print("Tiếng kêu: \"Xin chào!\"") # \" = dấu ngoặc kép
```

**Kết quả:**
```
Dòng 1
Dòng 2  
Dòng 3
Tab	Tab	Tab
Tiếng kêu: "Xin chào!"
```

## 🌈 Tạo nghệ thuật bằng chữ (ASCII Art)

### Vẽ hình đơn giản

```python
print("  /\\_/\\  ")
print(" ( o.o ) ")
print("  > ^ <  ")
print("Mèo con đáng yêu!")
```

**Kết quả:**
```
  /\_/\  
 ( o.o ) 
  > ^ <  
Mèo con đáng yêu!
```

### Tạo khung trang trí

```python
print("+" + "-" * 30 + "+")
print("|" + " " * 8 + "CHÀO MỪNG" + " " * 11 + "|")
print("|" + " " * 6 + "ĐẾN VỚI PYTHON!" + " " * 7 + "|") 
print("+" + "-" * 30 + "+")
```

**Kết quả:**
```
+------------------------------+
|        CHÀO MỪNG           |
|      ĐẾN VỚI PYTHON!       |
+------------------------------+
```

## 🎭 Tạo hiệu ứng đặc biệt

### 1. Thanh tiến trình giả lập

```python
print("Đang cài đặt Python...")
print("[████████████████████] 100%")
print("Hoàn thành! 🎉")
```

### 2. Menu lựa chọn

```python
print("🍔 MENU NHÀ HÀNG PYTHON 🍔")
print("=" * 25)
print("1. 🍕 Pizza Python      - 50k")
print("2. 🍔 Burger Biến số    - 45k") 
print("3. 🍜 Phở Function      - 40k")
print("4. 🥤 Nước Loop         - 15k")
print("=" * 25)
print("Mời bạn chọn món!")
```

### 3. Thông báo hệ thống

```python
print("⚠️  THÔNG BÁO QUAN TRỌNG ⚠️")
print("🔄 Hệ thống đang cập nhật...")
print("⏰ Thời gian ước tính: 5 phút")
print("✅ Cảm ơn bạn đã kiên nhẫn!")
```

## 🔢 In số và tính toán

### In kết quả tính toán

```python
print("5 + 3 =", 5 + 3)
print("10 - 4 =", 10 - 4)
print("6 × 7 =", 6 * 7)
print("20 ÷ 4 =", 20 / 4)
```

**Kết quả:**
```
5 + 3 = 8
10 - 4 = 6
6 × 7 = 42
20 ÷ 4 = 5.0
```

### Tạo bảng cửu chương

```python
print("🔢 BẢNG CỬU CHƯƠNG SỐ 2 🔢")
print("2 × 1 =", 2 * 1)
print("2 × 2 =", 2 * 2) 
print("2 × 3 =", 2 * 3)
print("2 × 4 =", 2 * 4)
print("2 × 5 =", 2 * 5)
```

## 🎪 Dự án vui: Tạo poster quảng cáo

Hãy tạo một poster quảng cáo cho lớp học Python:

```python
print("🌟" + "=" * 40 + "🌟")
print("|" + " " * 16 + "LỚP HỌC PYTHON" + " " * 10 + "|")
print("|" + " " * 12 + "Dành cho trẻ em 8-16 tuổi" + " " * 5 + "|")
print("🌟" + "=" * 40 + "🌟")
print()
print("📚 BẠN SẼ HỌC:")
print("   🐍 Lập trình với con rắn thông minh")
print("   🎮 Tạo game đơn giản")
print("   🤖 Xây dựng chatbot")
print("   🎨 Vẽ tranh bằng code")
print()
print("📞 LIÊN HỆ: 0123-456-789")
print("🌐 WEBSITE: python-cho-tre-em.vn")
print("📍 ĐỊA CHỈ: 123 Đường Python, Hà Nội")
print()
print("🎁 ĐĂNG KÝ NGAY HÔM NAY - GIẢM 50%! 🎁")
```

## 🎯 Thử thách thực hành

### Thử thách 1: Thiết kế danh thiếp
Tạo danh thiếp điện tử cho bản thân:

```python
# Ví dụ mẫu - hãy thay thông tin của bạn
print("╔" + "═" * 30 + "╗")
print("║" + " " * 8 + "NGUYỄN VĂN A" + " " * 9 + "║")
print("║" + " " * 6 + "Học sinh lớp 7A" + " " * 7 + "║")
print("╠" + "═" * 30 + "╣")
print("║ 📧 Email: a@gmail.com        ║")
print("║ 📱 SĐT: 0123456789           ║") 
print("║ 🎂 Tuổi: 13                  ║")
print("║ 💡 Sở thích: Lập trình       ║")
print("╚" + "═" * 30 + "╝")
```

### Thử thách 2: Tạo lịch tháng
Vẽ một tháng trong lịch:

```python
print("📅 THÁNG 9 NĂM 2025")
print("T2  T3  T4  T5  T6  T7  CN")
print("-" * 28)
print(" 1   2   3   4   5   6   7")
print(" 8   9  10  11  12  13  14")
print("15  16  17  18  19  20  21")
print("22  23  24  25  26  27  28")
print("29  30")
```

### Thử thách 3: Tạo biểu đồ cột đơn giản
Hiển thị điểm số bằng ký tự:

```python
print("📊 BẢNG ĐIỂM CỦA BẠN")
print("Toán:    " + "█" * 9 + " (9 điểm)")
print("Văn:     " + "█" * 8 + " (8 điểm)")
print("Anh:     " + "█" * 7 + " (7 điểm)")
print("Lý:      " + "█" * 10 + " (10 điểm)")
print("Hóa:     " + "█" * 6 + " (6 điểm)")
```

## ❗ Lỗi thường gặp và cách khắc phục

### Lỗi 1: Quên đóng dấu ngoặc kép
❌ **Sai:**
```python
print("Xin chào
```

✅ **Đúng:**
```python
print("Xin chào")
```

### Lỗi 2: Dùng sai dấu ngoặc kép
❌ **Sai:**
```python
print("Tôi nói: "Xin chào"")
```

✅ **Đúng:**
```python
print("Tôi nói: \"Xin chào\"")
# hoặc
print('Tôi nói: "Xin chào"')
```

### Lỗi 3: Quên dấu phẩy khi in nhiều thứ
❌ **Sai:**
```python
print("Tên:" "Minh" "Tuổi:" 12)
```

✅ **Đúng:**
```python
print("Tên:", "Minh", "Tuổi:", 12)
```

## 🎊 Tóm tắt bài học

🎉 Tuyệt vời! Bạn đã học được rất nhiều cách để làm Python "nói chuyện"!

### Bạn đã thành thạo:
- ✅ In nhiều thứ cùng lúc với dấu phẩy
- ✅ Điều khiển xuống dòng với `end=""`
- ✅ Thay đổi ký tự ngăn cách với `sep=""`
- ✅ Sử dụng ký tự đặc biệt như `\n`, `\t`
- ✅ Tạo nghệ thuật ASCII đơn giản
- ✅ In số và kết quả tính toán

### Bước tiếp theo:
Trong bài học tiếp theo, chúng ta sẽ học cách làm cho chương trình **lắng nghe** bạn bằng cách nhận thông tin từ bàn phím!

---

:::tip 🤝 Cần trợ giúp?
- 👨‍👩‍👧‍👦 Hỏi bố mẹ hoặc anh chị về ý tưởng thiết kế
- 📚 Thử lại các ví dụ để hiểu rõ hơn
- 🎨 Sáng tạo thêm những mẫu ASCII art của riêng bạn
- 🔍 Tìm kiếm "Python ASCII art" để có thêm ý tưởng
:::

**Chúc bạn có những giờ phút vui vẻ với việc tạo ra những thông điệp đẹp mắt! 🐍🎨**
