# 📁 Làm Việc với File - Đọc, Ghi và Quản Lý Dữ Liệu

> **Mục tiêu**: Học cách đọc, ghi và quản lý file như một chuyên gia! 🎯

## 🤔 File Là Gì? (Giải Thích Siêu Dễ)

Hãy tưởng tượng **file** như những **cuốn sổ ghi chép** trên máy tính:
- 📔 **File văn bản** = Cuốn sổ viết bằng bút chì (có thể xóa, sửa)
- 📊 **File Excel** = Sổ kế toán với nhiều cột, hàng
- 🖼️ **File hình ảnh** = Album ảnh
- 📝 **File code** = Sổ ghi công thức bí mật

**Python** giống như một **thư ký siêu giỏi** có thể:
- 👀 Đọc nội dung từ cuốn sổ
- ✍️ Viết thông tin vào sổ
- 📋 Sao chép từ sổ này sang sổ khác
- 🗂️ Tạo sổ mới hoặc xóa sổ cũ

## 📖 Đọc File - Như Đọc Sách

### 🔍 Cách Cơ Bản Nhất
```python
# Đọc file giống như mở sách ra xem
with open('danh_sach_mon_an.txt', 'r', encoding='utf-8') as file:
    noi_dung = file.read()
    print(noi_dung)
```

**Giải thích từng phần:**
- `open()` = Mở cuốn sách ra
- `'danh_sach_mon_an.txt'` = Tên cuốn sách
- `'r'` = "Read" - chỉ đọc thôi, không viết
- `encoding='utf-8'` = Đọc tiếng Việt có dấu
- `with` = Tự động đóng sách khi đọc xong

### 📄 Đọc Từng Dòng (Như Đọc Thơ)
```python
# Đọc từng câu thơ một
with open('bai_tho.txt', 'r', encoding='utf-8') as file:
    for dong in file:
        print(f"Câu thơ: {dong.strip()}")
```

### 📋 Đọc Thành Danh Sách
```python
# Biến mỗi dòng thành một phần tử trong list
with open('danh_sach_hoc_sinh.txt', 'r', encoding='utf-8') as file:
    danh_sach = file.readlines()
    
# Xóa bỏ ký tự xuống dòng thừa
danh_sach_sach = [ten.strip() for ten in danh_sach]
print(danh_sach_sach)
```

## ✍️ Viết File - Như Viết Nhật Ký

### 📝 Ghi Đè Hoàn Toàn (Viết Lại Từ Đầu)
```python
# Tạo file mới hoặc xóa hết nội dung cũ
with open('nhat_ky.txt', 'w', encoding='utf-8') as file:
    file.write("Hôm nay tôi học Python!\n")
    file.write("Python thật thú vị!\n")
    file.write("Tôi có thể tạo file rồi! 🎉\n")
```

### 📄 Thêm Nội Dung (Viết Tiếp)
```python
# Viết thêm vào cuối file (không xóa nội dung cũ)
with open('nhat_ky.txt', 'a', encoding='utf-8') as file:
    file.write("Ngày mai tôi sẽ học thêm nhiều điều mới!\n")
```

### 📊 Ghi Nhiều Dòng Cùng Lúc
```python
mon_hoc = ["Toán", "Lý", "Hóa", "Sinh", "Văn"]

with open('mon_hoc_yeu_thich.txt', 'w', encoding='utf-8') as file:
    for mon in mon_hoc:
        file.write(f"Môn {mon} rất thú vị!\n")
```

## 🛠️ Ví Dụ Thực Tế: Quản Lý Điểm Số

```python
def luu_diem_so(ten_hoc_sinh, diem, mon_hoc):
    """Lưu điểm số của học sinh vào file"""
    with open('bang_diem.txt', 'a', encoding='utf-8') as file:
        file.write(f"{ten_hoc_sinh}: {mon_hoc} - {diem} điểm\n")
    print(f"✅ Đã lưu điểm {diem} môn {mon_hoc} cho {ten_hoc_sinh}")

def xem_tat_ca_diem():
    """Xem tất cả điểm số đã lưu"""
    try:
        with open('bang_diem.txt', 'r', encoding='utf-8') as file:
            print("📊 BẢNG ĐIỂM TỔNG HỢP:")
            print("-" * 30)
            for dong in file:
                print(dong.strip())
    except FileNotFoundError:
        print("❌ Chưa có file điểm nào. Hãy nhập điểm trước!")

# Sử dụng chương trình
luu_diem_so("An", 9.5, "Toán")
luu_diem_so("Bình", 8.7, "Lý")
luu_diem_so("Chi", 9.2, "Hóa")

xem_tat_ca_diem()
```

## 🔥 Ví Dụ Nâng Cao: Todo List Lưu File

```python
class TodoList:
    def __init__(self, file_name="todo_list.txt"):
        self.file_name = file_name
        self.tasks = self.load_tasks()
    
    def load_tasks(self):
        """Đọc danh sách việc cần làm từ file"""
        try:
            with open(self.file_name, 'r', encoding='utf-8') as file:
                return [task.strip() for task in file.readlines()]
        except FileNotFoundError:
            print("📝 Tạo todo list mới!")
            return []
    
    def save_tasks(self):
        """Lưu danh sách việc vào file"""
        with open(self.file_name, 'w', encoding='utf-8') as file:
            for task in self.tasks:
                file.write(f"{task}\n")
        print("💾 Đã lưu danh sách công việc!")
    
    def add_task(self, task):
        """Thêm việc cần làm"""
        self.tasks.append(f"⭕ {task}")
        self.save_tasks()
        print(f"✅ Đã thêm: {task}")
    
    def complete_task(self, index):
        """Đánh dấu hoàn thành"""
        if 0 <= index < len(self.tasks):
            self.tasks[index] = self.tasks[index].replace("⭕", "✅")
            self.save_tasks()
            print(f"🎉 Hoàn thành: {self.tasks[index]}")
    
    def show_tasks(self):
        """Hiển thị tất cả việc cần làm"""
        print("📋 DANH SÁCH VIỆC CẦN LÀM:")
        print("-" * 40)
        for i, task in enumerate(self.tasks):
            print(f"{i+1}. {task}")

# Sử dụng Todo List với file
todo = TodoList("cong_viec_behitek.txt")

# Thêm một số việc
todo.add_task("Học Python file handling")
todo.add_task("Viết blog về lập trình")
todo.add_task("Tập thể dục 30 phút")

# Hiển thị danh sách
todo.show_tasks()

# Hoàn thành việc đầu tiên
todo.complete_task(0)
todo.show_tasks()
```

## 🚨 Xử Lý Lỗi Thông Minh

```python
def doc_file_an_toan(file_name):
    """Đọc file một cách an toàn với xử lý lỗi"""
    try:
        with open(file_name, 'r', encoding='utf-8') as file:
            return file.read()
    except FileNotFoundError:
        print(f"❌ Không tìm thấy file: {file_name}")
        return None
    except PermissionError:
        print(f"🚫 Không có quyền đọc file: {file_name}")
        return None
    except UnicodeDecodeError:
        print(f"🔤 File có ký tự lạ, thử encoding khác")
        try:
            with open(file_name, 'r', encoding='utf-16') as file:
                return file.read()
        except:
            print("😵 Không thể đọc file này")
            return None

# Test với file không tồn tại
noi_dung = doc_file_an_toan("file_khong_ton_tai.txt")
if noi_dung:
    print(noi_dung)
else:
    print("Không đọc được file")
```

## 🎯 Các Chế Độ Mở File Quan Trọng

| Chế độ | Ý nghĩa | Giống như... |
|--------|---------|--------------|
| `'r'` | Read - Chỉ đọc | Đọc sách trong thư viện 📚 |
| `'w'` | Write - Ghi đè | Viết lại cuốn sổ từ đầu ✏️ |
| `'a'` | Append - Viết thêm | Viết tiếp vào cuối sổ 📝 |
| `'x'` | Create - Tạo mới | Tạo sổ mới (lỗi nếu đã có) ✨ |
| `'r+'` | Read+Write - Đọc và viết | Sổ có thể đọc và sửa 📖✏️ |

## 🎮 Bài Tập Thực Hành

### 🏆 Bài 1: Sổ Ghi Chú Cá Nhân
Tạo chương trình cho phép:
- Viết ghi chú hàng ngày
- Xem lại ghi chú cũ
- Tìm kiếm ghi chú theo từ khóa

### 🏆 Bài 2: Quản Lý Thông Tin Học Sinh
Tạo file lưu trữ:
- Tên, tuổi, lớp của học sinh
- Thêm, sửa, xóa thông tin
- Xuất báo cáo tổng hợp

### 🏆 Bài 3: Trò Chơi Đoán Từ với File
- Đọc danh sách từ từ file
- Lưu điểm cao nhất vào file
- Ghi lại lịch sử chơi

## 🔗 Kiến Thức Liên Quan

- **[Xử Lý Lỗi với Try/Except](../intermediate/error-handling.md)** - Để xử lý lỗi file
- **[Làm Việc với JSON](./working-with-json.md)** - Lưu trữ dữ liệu phức tạp
- **[Module và Package](./modules-and-packages.md)** - Tổ chức code tốt hơn

## 💡 Mẹo Hay Ho

1. **Luôn dùng `with open()`** - Tự động đóng file
2. **Nhớ `encoding='utf-8'`** - Để đọc tiếng Việt
3. **Kiểm tra file tồn tại** - Dùng `os.path.exists()`
4. **Backup dữ liệu quan trọng** - Tạo file sao lưu
5. **Đặt tên file có ý nghĩa** - Dễ nhận biết sau này

---

*🎉 **Chúc mừng!** Bạn đã biết cách làm việc với file rồi! Giờ bạn có thể lưu trữ và quản lý dữ liệu như một lập trình viên thật sự! 🚀*
