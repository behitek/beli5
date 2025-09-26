# 👂 Nhận thông tin từ người dùng - Lắng nghe và phản hồi

## 🎯 Bạn sẽ học được gì?

Trong bài học này, bạn sẽ học cách làm cho con rắn Python không chỉ biết "nói" mà còn biết "lắng nghe"! Giống như khi bạn trò chuyện với bạn bè, chương trình sẽ có thể hỏi bạn câu hỏi và đợi bạn trả lời.

:::tip 💡 Kiến thức cần có
Bạn nên đã hoàn thành:
- [Chương trình Python đầu tiên](./first-program.md)
- [In thông điệp](./printing-messages.md)
:::

## 🤔 Tại sao cần học về nhận thông tin?

Hãy tưởng tượng bạn có một người bạn chỉ biết nói một câu duy nhất "Xin chào!" mãi mãi. Sẽ rất nhàm chán phải không? 

Nhưng nếu người bạn đó có thể:
- 🗣️ Hỏi tên bạn và gọi đúng tên
- 🎂 Hỏi tuổi và chúc mừng sinh nhật
- 🎮 Hỏi trò chơi yêu thích và trò chuyện về nó
- 🍕 Hỏi món ăn và gợi ý nhà hàng

Thì sẽ thú vị hơn rất nhiều!

## 🐍 Lệnh input() - Tai của con rắn

### Cách sử dụng cơ bản

```python
input("Bạn tên gì? ")
```

Khi chạy, chương trình sẽ:
1. 📢 Hiển thị câu hỏi "Bạn tên gì? "
2. ⏸️ Dừng lại và đợi bạn gõ
3. ⌨️ Nhận những gì bạn gõ
4. ⏎ Đợi bạn nhấn Enter

### Lưu thông tin vào biến

```python
ten = input("Bạn tên gì? ")
print("Xin chào", ten, "!")
```

**Chạy chương trình:**
```
Bạn tên gì? Minh
Xin chào Minh !
```

:::info 🔍 Giải thích
- `ten` là một "hộp" (biến) để lưu tên người dùng nhập
- `input()` lấy thông tin từ bàn phím và bỏ vào hộp `ten`
- `print()` lấy thông tin từ hộp `ten` ra để hiển thị
:::

## 🎪 Chương trình tương tác đầu tiên

### Trò chuyện đơn giản

```python
print("🐍 Xin chào! Tôi là Python, con rắn thông minh!")
ten = input("Bạn tên gì? ")
print("Rất vui được gặp bạn,", ten, "!")

tuoi = input("Bạn bao nhiêu tuổi? ")
print("Wow!", tuoi, "tuổi! Bạn thật tuyệt vời!")

mau_yeu_thich = input("Màu yêu thích của bạn là gì? ")
print("Tôi cũng thích màu", mau_yeu_thich, "! Chúng ta hợp nhau quá!")
```

**Ví dụ chạy:**
```
🐍 Xin chào! Tôi là Python, con rắn thông minh!
Bạn tên gì? Lan
Rất vui được gặp bạn, Lan !
Bạn bao nhiêu tuổi? 12
Wow! 12 tuổi! Bạn thật tuyệt vời!
Màu yêu thích của bạn là gì? xanh lá
Tôi cũng thích màu xanh lá ! Chúng ta hợp nhau quả!
```

## 🔢 Làm việc với số

### Vấn đề: input() luôn cho ra chữ

```python
tuoi = input("Bạn bao nhiêu tuổi? ")
tuoi_sau_10_nam = tuoi + 10  # ❌ Lỗi!
```

:::warning ⚠️ Lỗi thường gặp
`input()` luôn trả về **chữ** (string), không phải số! Bạn cần chuyển đổi.
:::

### Giải pháp: Chuyển đổi sang số

```python
tuoi = input("Bạn bao nhiêu tuổi? ")
tuoi = int(tuoi)  # Chuyển từ chữ sang số nguyên
tuoi_sau_10_nam = tuoi + 10
print("Sau 10 năm nữa bạn sẽ", tuoi_sau_10_nam, "tuổi!")
```

### Cách viết ngắn gọn

```python
tuoi = int(input("Bạn bao nhiêu tuổi? "))
tuoi_sau_10_nam = tuoi + 10
print("Sau 10 năm nữa bạn sẽ", tuoi_sau_10_nam, "tuổi!")
```

## 🧮 Máy tính đơn giản

```python
print("🧮 MÁY TÍNH PYTHON 🧮")
print("Hãy nhập hai số để tôi cộng cho bạn!")

so_thu_nhat = int(input("Số thứ nhất: "))
so_thu_hai = int(input("Số thứ hai: "))

ket_qua = so_thu_nhat + so_thu_hai

print("Kết quả:", so_thu_nhat, "+", so_thu_hai, "=", ket_qua)
```

**Ví dụ chạy:**
```
🧮 MÁY TÍNH PYTHON 🧮
Hãy nhập hai số để tôi cộng cho bạn!
Số thứ nhất: 25
Số thứ hai: 17
Kết quả: 25 + 17 = 42
```

## 🎨 Tạo chương trình cá nhân hóa

### Tạo lời chào theo thời gian

```python
print("🌅 CHÀO BUỔI SÁNG! 🌅")
ten = input("Bạn tên gì? ")
mon_an = input("Bạn muốn ăn gì cho bữa sáng? ")

print("Chào buổi sáng,", ten, "!")
print("Hy vọng bạn có một bữa", mon_an, "thật ngon miệng!")
print("Chúc bạn một ngày tốt lành! 🌞")
```

### Tạo thẻ thông tin cá nhân

```python
print("📝 TẠO THẺ THÔNG TIN CÁ NHÂN 📝")
print("=" * 35)

ten = input("Họ và tên: ")
tuoi = input("Tuổi: ")
lop = input("Lớp: ")
so_thich = input("Sở thích: ")
mau_yeu_thich = input("Màu yêu thích: ")

print("\n🎫 THẺ THÔNG TIN CỦA BẠN 🎫")
print("╔" + "═" * 33 + "╗")
print("║ Tên:", ten.ljust(26), "║")
print("║ Tuổi:", tuoi.ljust(25), "║")
print("║ Lớp:", lop.ljust(26), "║")
print("║ Sở thích:", so_thich.ljust(21), "║")
print("║ Màu yêu thích:", mau_yeu_thich.ljust(16), "║")
print("╚" + "═" * 33 + "╝")
```

## 🎮 Trò chơi tương tác đơn giản

### Trò chơi đoán số

```python
print("🎯 TRÒ CHƠI ĐOÁN SỐ 🎯")
print("Tôi đang nghĩ về một số từ 1 đến 10...")
print("Bạn có thể đoán được không?")

so_bi_mat = 7  # Số bí mật (sau này sẽ học cách tạo số ngẫu nhiên)
doan = int(input("Bạn đoán số mấy? "))

if doan == so_bi_mat:
    print("🎉 Chính xác! Bạn thật thông minh!")
else:
    print("😅 Chưa đúng! Số tôi nghĩ là", so_bi_mat)
    print("Lần sau bạn sẽ đoán đúng thôi!")
```

### Trò chuyện với robot

```python
print("🤖 XIN CHÀO! TÔI LÀ ROBOT PYTHON 🤖")
print("Tôi có thể trả lời một vài câu hỏi đơn giản!")

ten = input("Bạn tên gì? ")
print("Xin chào", ten, "! Rất vui được gặp bạn!")

cau_hoi = input("Bạn muốn hỏi gì? (tuổi/màu/thức ăn): ")

if cau_hoi == "tuổi":
    print("Tôi được tạo ra năm 2025, nên tôi còn rất trẻ!")
elif cau_hoi == "màu":
    print("Tôi thích màu xanh lá như logo Python! 🐍")
elif cau_hoi == "thức ăn":
    print("Tôi ăn... điện năng! ⚡ Và thỉnh thoảng ăn bugs! 🐛")
else:
    print("Xin lỗi, tôi chưa học cách trả lời câu hỏi này!")
```

## 🎯 Thử thách thực hành

### Thử thách 1: Máy tính BMI trẻ em

```python
print("⚖️ TÍNH CHỈ SỐ BMI CHO TRẺ EM ⚖️")
print("(Chỉ để tham khảo, không thay thế ý kiến bác sĩ)")

ten = input("Tên của bạn: ")
can_nang = float(input("Cân nặng (kg): "))
chieu_cao = float(input("Chiều cao (m, ví dụ: 1.5): "))

bmi = can_nang / (chieu_cao * chieu_cao)

print(f"\n📊 KẾT QUẢ CHO {ten}:")
print(f"BMI của bạn là: {bmi:.1f}")

if bmi < 18.5:
    print("Bạn hơi gầy, hãy ăn nhiều hơn nhé! 🍎")
elif bmi <= 24.9:
    print("Tuyệt vời! Bạn có cân nặng lý tưởng! 👍")
else:
    print("Bạn nên tập thể dục nhiều hơn! 🏃‍♂️")
```

### Thử thách 2: Tạo câu chuyện Mad Libs

```python
print("📚 TẠO CÂU CHUYỆN VUI 📚")
print("Hãy nhập các từ theo yêu cầu, tôi sẽ tạo câu chuyện thú vị!")

ten_nhan_vat = input("Tên nhân vật chính: ")
dong_vat = input("Một loài động vật: ")
mau_sac = input("Một màu sắc: ")
dia_diem = input("Một địa điểm: ")
hoat_dong = input("Một hoạt động (ví dụ: chạy, nhảy): ")
cam_xuc = input("Một cảm xúc (ví dụ: vui, buồn): ")

print(f"\n📖 CÂU CHUYỆN CỦA BẠN:")
print(f"Ngày xửa ngày xưa, có một cô bé tên {ten_nhan_vat}.")
print(f"Cô bé có một chú {dong_vat} màu {mau_sac} rất đáng yêu.")
print(f"Một ngày nọ, họ cùng nhau đi đến {dia_diem}.")
print(f"Ở đó, họ thích {hoat_dong} cùng nhau.")
print(f"Cuối cùng, cả hai đều cảm thấy rất {cam_xuc}!")
print("Hết. 📚✨")
```

### Thử thách 3: Phiên dịch viên emoji

```python
print("😀 PHIÊN DỊCH VIÊN EMOJI 😀")
print("Nhập cảm xúc bằng tiếng Việt, tôi sẽ dịch thành emoji!")

cam_xuc = input("Bạn cảm thấy thế nào? (vui/buồn/giận/yêu/ngạc nhiên): ")

if cam_xuc == "vui":
    emoji = "😊"
elif cam_xuc == "buồn":
    emoji = "😢"
elif cam_xuc == "giận":
    emoji = "😠"
elif cam_xuc == "yêu":
    emoji = "😍"
elif cam_xuc == "ngạc nhiên":
    emoji = "😲"
else:
    emoji = "🤔"

print(f"Cảm xúc của bạn: {emoji}")
print(f"Hy vọng bạn sẽ luôn 😊 vui vẻ!")
```

## ❗ Lỗi thường gặp và cách khắc phục

### Lỗi 1: Quên chuyển đổi kiểu dữ liệu
❌ **Sai:**
```python
tuoi = input("Tuổi: ")
tuoi_moi = tuoi + 1  # Lỗi: không thể cộng chữ với số
```

✅ **Đúng:**
```python
tuoi = int(input("Tuổi: "))
tuoi_moi = tuoi + 1
```

### Lỗi 2: Nhập số thập phân nhưng dùng int()
❌ **Sai:**
```python
chieu_cao = int(input("Chiều cao (m): "))  # Nếu nhập 1.75 sẽ lỗi
```

✅ **Đúng:**
```python
chieu_cao = float(input("Chiều cao (m): "))  # Cho phép số thập phân
```

### Lỗi 3: Không xử lý khi người dùng nhập sai
❌ **Có thể gây lỗi:**
```python
so = int(input("Nhập một số: "))  # Nếu nhập chữ sẽ lỗi
```

✅ **An toàn hơn:**
```python
try:
    so = int(input("Nhập một số: "))
    print("Số bạn nhập:", so)
except:
    print("Bạn phải nhập số, không phải chữ!")
```

## 🎊 Tóm tắt bài học

🎉 Tuyệt vời! Bạn đã học được cách làm cho Python lắng nghe và phản hồi!

### Bạn đã thành thạo:
- ✅ Sử dụng `input()` để nhận thông tin từ người dùng
- ✅ Lưu thông tin vào biến để sử dụng sau
- ✅ Chuyển đổi từ chữ sang số với `int()` và `float()`
- ✅ Tạo chương trình tương tác đơn giản
- ✅ Xử lý và hiển thị thông tin người dùng nhập
- ✅ Tạo trò chơi và ứng dụng vui nhộn

### Bước tiếp theo:
Trong bài học tiếp theo, chúng ta sẽ học cách viết **ghi chú** trong code để nhớ những gì mình đã làm!

---

:::tip 🤝 Cần trợ giúp?
- 👨‍👩‍👧‍👦 Nhờ bố mẹ test chương trình của bạn
- 📚 Thử tạo thêm nhiều câu hỏi thú vị
- 🎮 Nghĩ ra những trò chơi tương tác mới
- 🔍 Tìm hiểu thêm về "user input" trong Python
:::

**Chúc bạn tạo ra được những chương trình tương tác thú vị! 🐍💬**
