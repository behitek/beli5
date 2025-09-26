# 🎪 Trò chơi Mad Libs - Tạo câu chuyện vui nhộn

## 🎯 Dự án này sẽ dạy bạn gì?

Trong dự án đầu tiên này, bạn sẽ tạo ra một trò chơi **Mad Libs** - nơi bạn nhập các từ ngẫu nhiên và Python sẽ tạo ra những câu chuyện cực kỳ vui nhộn! Đây là cách tuyệt vời để thực hành tất cả những gì bạn đã học.

:::tip 💡 Kiến thức cần có
Bạn nên đã hoàn thành các bài học cơ bản:
- [Chương trình Python đầu tiên](../basics/first-program.md)
- [In thông điệp](../basics/printing-messages.md)
- [Nhận thông tin từ người dùng](../basics/getting-input.md)
- [Ghi chú trong code](../basics/comments.md)
:::

## 🤔 Mad Libs là gì?

**Mad Libs** là một trò chơi từ ngữ vui nhộn:
1. 📝 Bạn viết một câu chuyện nhưng bỏ trống một số từ
2. 🎯 Yêu cầu người khác đưa ra các từ (danh từ, tính từ, động từ...)
3. 🎪 Điền các từ đó vào chỗ trống
4. 😂 Đọc câu chuyện hoàn chỉnh và cười thả ga!

### Ví dụ đơn giản:
- **Mẫu câu**: "Hôm nay tôi đi _____ và gặp một con _____ rất _____"
- **Từ của bạn**: "trường", "rồng", "dễ thương"
- **Kết quả**: "Hôm nay tôi đi **trường** và gặp một con **rồng** rất **dễ thương**"

## 🚀 Bắt đầu dự án

### Phiên bản 1: Mad Libs đơn giản

```python
"""
🎪 MAD LIBS - PHIÊN BẢN ĐƠN GIẢN 🎪
Tác giả: [Tên của bạn]
Mô tả: Tạo câu chuyện vui nhộn từ các từ ngẫu nhiên
"""

print("🎪 CHÀO MỪNG ĐẾN VỚI MAD LIBS! 🎪")
print("=" * 40)
print("Hãy nhập các từ theo yêu cầu.")
print("Tôi sẽ tạo ra một câu chuyện thú vị cho bạn!")
print()

# Thu thập các từ từ người chơi
ten_ban = input("Tên của một người bạn: ")
dong_vat = input("Tên một loài động vật: ")
mau_sac = input("Một màu sắc: ")
dia_diem = input("Tên một địa điểm: ")
hoat_dong = input("Một hoạt động (ví dụ: chạy, nhảy, hát): ")
tinh_tu = input("Một tính từ mô tả cảm xúc (vui, buồn, hào hứng): ")
do_vat = input("Tên một đồ vật: ")

# Tạo câu chuyện
print("\n" + "🌟" * 50)
print("📚 CÂU CHUYỆN CỦA BẠN:")
print("🌟" * 50)
print()

print(f"Ngày xửa ngày xưa, có một cô bé tên {ten_ban}.")
print(f"Cô bé có một chú {dong_vat} màu {mau_sac} rất đặc biệt.")
print(f"Một ngày nọ, họ quyết định đi đến {dia_diem} để phiêu lưu.")
print(f"Ở đó, họ thích {hoat_dong} cùng nhau suốt cả ngày.")
print(f"Khi về nhà, cả hai đều cảm thấy rất {tinh_tu}.")
print(f"Và họ tìm thấy một {do_vat} thần kỳ làm kỷ niệm!")
print()
print("🎉 HẾT - Hy vọng bạn thích câu chuyện này! 🎉")
```

### Chạy chương trình và thử nghiệm!

**Ví dụ đầu vào:**
```
Tên của một người bạn: Minh
Tên một loài động vật: mèo
Một màu sắc: xanh lá
Tên một địa điểm: công viên
Một hoạt động: chơi bóng
Một tính từ mô tả cảm xúc: vui vẻ
Tên một đồ vật: chiếc lá
```

**Kết quả:**
```
📚 CÂU CHUYỆN CỦA BẠN:
🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟

Ngày xửa ngày xưa, có một cô bé tên Minh.
Cô bé có một chú mèo màu xanh lá rất đặc biệt.
Một ngày nọ, họ quyết định đi đến công viên để phiêu lưu.
Ở đó, họ thích chơi bóng cùng nhau suốt cả ngày.
Khi về nhà, cả hai đều cảm thấy rất vui vẻ.
Và họ tìm thấy một chiếc lá thần kỳ làm kỷ niệm!

🎉 HẾT - Hy vọng bạn thích câu chuyện này! 🎉
```

## 🎨 Phiên bản 2: Mad Libs nâng cao

```python
"""
🎪 MAD LIBS NÂNG CAO - NHIỀU CÂU CHUYỆN 🎪
Có thể chọn từ nhiều mẫu câu chuyện khác nhau
"""

import random

def hien_thi_menu():
    print("🎪 MAD LIBS NÂNG CAO 🎪")
    print("=" * 30)
    print("Chọn chủ đề câu chuyện:")
    print("1. 🏫 Trường học vui vẻ")
    print("2. 🚀 Cuộc phiêu lưu vũ trụ") 
    print("3. 🏰 Lâu đài phép thuật")
    print("4. 🎲 Ngẫu nhiên (máy chọn)")
    print("=" * 30)

def cau_chuyen_truong_hoc():
    print("\n📚 CHỦ ĐỀ: TRƯỜNG HỌC VUI VẺ")
    print("Hãy nhập các thông tin sau:")
    
    ten_ban = input("Tên bạn thân nhất: ")
    mon_hoc = input("Môn học yêu thích: ")
    giao_vien = input("Tên một giáo viên: ")
    hoat_dong = input("Hoạt động trong giờ ra chơi: ")
    mon_an = input("Món ăn trong căn tin: ")
    cam_xuc = input("Cảm xúc khi đi học: ")
    
    print(f"\n📖 CÂU CHUYỆN:")
    print(f"Sáng nay, tôi và {ten_ban} đến trường rất sớm.")
    print(f"Tiết học đầu tiên là môn {mon_hoc} với cô {giao_vien}.")
    print(f"Giờ ra chơi, chúng tôi {hoat_dong} trong sân trường.")
    print(f"Trưa ăn {mon_an} ngon tuyệt trong căn tin.")
    print(f"Cả ngày tôi cảm thấy {cam_xuc} khi ở trường!")

def cau_chuyen_vu_tru():
    print("\n🚀 CHỦ ĐỀ: CUỘC PHIÊU LƯU VŨ TRỤ")
    print("Hãy nhập các thông tin sau:")
    
    ten_phi_hanh_gia = input("Tên phi hành gia: ")
    hanh_tinh = input("Tên một hành tinh: ")
    phuong_tien = input("Phương tiện di chuyển: ")
    sinh_vat = input("Sinh vật ngoài hành tinh: ")
    mau_sac = input("Màu sắc kỳ lạ: ")
    suc_manh = input("Sức mạnh đặc biệt: ")
    
    print(f"\n🌌 CÂU CHUYỆN:")
    print(f"Phi hành gia {ten_phi_hanh_gia} lái {phuong_tien} đến hành tinh {hanh_tinh}.")
    print(f"Ở đó, họ gặp những {sinh_vat} màu {mau_sac} rất thân thiện.")
    print(f"Những sinh vật này có sức mạnh {suc_manh} tuyệt vời.")
    print(f"Cuối cùng, {ten_phi_hanh_gia} trở về Trái Đất với nhiều kỷ niệm đẹp!")

def cau_chuyen_lau_dai():
    print("\n🏰 CHỦ ĐỀ: LÂU ĐÀI PHÉP THUẬT")
    print("Hãy nhập các thông tin sau:")
    
    cong_chua = input("Tên công chúa/hoàng tử: ")
    phep_thuat = input("Loại phép thuật: ")
    quai_vat = input("Tên quái vật: ")
    bo_vat = input("Bảo vật thần kỳ: ")
    dia_diem = input("Nơi ẩn náu: ")
    ket_cuc = input("Cách kết thúc (vui/buồn/bất ngờ): ")
    
    print(f"\n🏰 CÂU CHUYỆN:")
    print(f"Trong lâu đài cổ, công chúa {cong_chua} biết phép {phep_thuat}.")
    print(f"Một ngày, quái vật {quai_vat} đến tấn công lâu đài.")
    print(f"Công chúa phải tìm {bo_vat} ẩn giấu ở {dia_diem}.")
    print(f"Cuối cùng, câu chuyện có kết thúc {ket_cuc}!")

def cau_chuyen_ngau_nhien():
    # Danh sách các mẫu câu ngẫu nhiên
    mau_cau = [
        "Hôm nay tôi {dong_tu} đến {dia_diem} và gặp một {danh_tu} {tinh_tu}.",
        "Con {dong_vat} {mau_sac} thích {hoat_dong} trong {thoi_gian}.",
        "Ở {dia_diem}, có một {do_vat} {tinh_tu} làm từ {chat_lieu}."
    ]
    
    print("\n🎲 CHỦ ĐỀ: NGẪU NHIÊN")
    print("Máy tính sẽ tạo câu chuyện bất ngờ!")
    
    # Thu thập từ ngẫu nhiên
    dong_tu = input("Một động từ (đi, chạy, bay): ")
    dia_diem = input("Một địa điểm: ")
    danh_tu = input("Một danh từ: ")
    tinh_tu = input("Một tính từ: ")
    dong_vat = input("Một con vật: ")
    mau_sac = input("Một màu sắc: ")
    hoat_dong = input("Một hoạt động: ")
    thoi_gian = input("Thời gian trong ngày: ")
    do_vat = input("Một đồ vật: ")
    chat_lieu = input("Một chất liệu: ")
    
    # Chọn mẫu câu ngẫu nhiên
    mau_duoc_chon = random.choice(mau_cau)
    
    print(f"\n🎭 CÂU CHUYỆN NGẪU NHIÊN:")
    print(mau_duoc_chon.format(
        dong_tu=dong_tu, dia_diem=dia_diem, danh_tu=danh_tu,
        tinh_tu=tinh_tu, dong_vat=dong_vat, mau_sac=mau_sac,
        hoat_dong=hoat_dong, thoi_gian=thoi_gian, do_vat=do_vat,
        chat_lieu=chat_lieu
    ))

# Chương trình chính
def main():
    while True:
        hien_thi_menu()
        lua_chon = input("Chọn chủ đề (1-4) hoặc 'q' để thoát: ")
        
        if lua_chon == "1":
            cau_chuyen_truong_hoc()
        elif lua_chon == "2":
            cau_chuyen_vu_tru()
        elif lua_chon == "3":
            cau_chuyen_lau_dai()
        elif lua_chon == "4":
            cau_chuyen_ngau_nhien()
        elif lua_chon.lower() == "q":
            print("👋 Cảm ơn bạn đã chơi Mad Libs!")
            break
        else:
            print("❌ Lựa chọn không hợp lệ!")
            continue
        
        # Hỏi có muốn chơi tiếp không
        tiep_tuc = input("\n🎮 Chơi thêm câu chuyện khác? (y/n): ")
        if tiep_tuc.lower() != "y":
            print("👋 Cảm ơn bạn đã chơi Mad Libs!")
            break

# Chạy chương trình
if __name__ == "__main__":
    main()
```

## 🎯 Thử thách mở rộng

### Thử thách 1: Thêm chủ đề mới
Tạo thêm 2 chủ đề câu chuyện mới:
- 🦸‍♀️ Siêu anh hùng
- 🍳 Nấu ăn phiêu lưu

### Thử thách 2: Lưu câu chuyện
Thêm chức năng lưu câu chuyện vào file để đọc lại sau:

```python
def luu_cau_chuyen(cau_chuyen, ten_file):
    """Lưu câu chuyện vào file"""
    with open(ten_file, "w", encoding="utf-8") as file:
        file.write(cau_chuyen)
    print(f"✅ Đã lưu câu chuyện vào {ten_file}")
```

### Thử thách 3: Mad Libs với ảnh
Thêm ASCII art để trang trí câu chuyện:

```python
def ve_khung_trang_tri():
    print("╔" + "═" * 50 + "╗")
    print("║" + " " * 50 + "║")
    print("║" + "    🎪 MAD LIBS - CÂU CHUYỆN CỦA BẠN 🎪    ".center(50) + "║")
    print("║" + " " * 50 + "║")
    print("╚" + "═" * 50 + "╝")
```

## 🎨 Tùy chỉnh và sáng tạo

### Thêm emoji và màu sắc

```python
# Thêm emoji phù hợp với từng từ loại
def them_emoji(tu_loai, noi_dung):
    emoji_dict = {
        "dong_vat": "🐶🐱🐭🐹🐰🦊🐻🐼",
        "dia_diem": "🏠🏫🏥🏪🏰🗼🎡🎢",
        "hoat_dong": "🏃‍♂️🏊‍♀️🚴‍♂️🎮🎨🎵📚⚽",
        "cam_xuc": "😊😢😍😴😮😎🤔🥳"
    }
    
    if tu_loai in emoji_dict:
        emoji_list = list(emoji_dict[tu_loai])
        emoji = random.choice(emoji_list)
        return f"{emoji} {noi_dung}"
    return noi_dung
```

### Tạo độ khó khác nhau

```python
def chon_do_kho():
    print("Chọn độ khó:")
    print("1. 🟢 Dễ (5-7 từ)")
    print("2. 🟡 Trung bình (8-12 từ)")
    print("3. 🔴 Khó (13-20 từ)")
    
    do_kho = input("Chọn độ khó (1-3): ")
    
    if do_kho == "1":
        return "de"
    elif do_kho == "2":
        return "trung_binh"
    else:
        return "kho"
```

## 📚 Kiến thức học được

Qua dự án Mad Libs này, bạn đã thực hành:

### ✅ Kỹ năng cơ bản:
- **Input/Output**: Nhận thông tin và hiển thị kết quả
- **String formatting**: Ghép chuỗi với f-strings
- **Print statements**: In ra màn hình với định dạng đẹp
- **Comments**: Ghi chú code rõ ràng

### ✅ Kỹ năng nâng cao:
- **Functions**: Tạo hàm cho từng chức năng
- **Conditionals**: Sử dụng if/elif/else
- **Loops**: Vòng lặp while cho menu
- **Random module**: Tạo tính ngẫu nhiên
- **File handling**: Lưu/đọc file (trong thử thách)

### ✅ Tư duy lập trình:
- **Chia nhỏ vấn đề**: Tách thành nhiều hàm nhỏ
- **User Experience**: Thiết kế giao diện thân thiện
- **Error handling**: Xử lý lựa chọn sai
- **Code organization**: Sắp xếp code có logic

## 🎊 Chúc mừng bạn!

🎉 Bạn đã hoàn thành dự án Python đầu tiên! Mad Libs không chỉ vui mà còn giúp bạn thực hành nhiều kỹ năng quan trọng.

### 🏆 Những gì bạn có thể làm tiếp:
1. **Chia sẻ với bạn bè** - Cho họ chơi Mad Libs của bạn
2. **Tạo thêm chủ đề** - Phát triển trí tưởng tượng
3. **Cải thiện giao diện** - Thêm màu sắc và hiệu ứng
4. **Học thêm kỹ thuật** - Chuẩn bị cho dự án tiếp theo

### Dự án tiếp theo:
Trong dự án tiếp theo, chúng ta sẽ tạo một **Máy tính thông minh** với nhiều chức năng hữu ích!

---

:::tip 🤝 Cần trợ giúp?
- 👨‍👩‍👧‍👦 Chơi Mad Libs với gia đình để test
- 📝 Viết thêm mẫu câu chuyện của riêng bạn
- 🎨 Thêm ASCII art và emoji sáng tạo
- 🔍 Tìm hiểu thêm về "string formatting" trong Python
:::

**Chúc mừng bạn đã tạo ra trò chơi đầu tiên! Hãy tiếp tục phát triển và sáng tạo! 🐍🎪✨**
