---
sidebar_position: 14
title: "🧯 Xử Lý Lỗi – Bình tĩnh và chuyên nghiệp"
description: "Sử dụng try/except/else/finally, bắt ngoại lệ cụ thể, raise, tạo ngoại lệ tuỳ chỉnh, with-context để dọn dẹp an toàn."
keywords: ["python", "error handling", "exceptions", "try except", "finally", "raise"]
---

# 🧯 Xử Lý Lỗi – Bình tĩnh và chuyên nghiệp

::::tip Tư duy đúng
Lỗi là bình thường. Mục tiêu của chúng ta: phát hiện sớm, thông báo rõ ràng, và khôi phục an toàn. Đừng lo, điều này dễ hơn bạn nghĩ!
::::

## 🧩 Cấu trúc cơ bản

```python
try:
    value = int(input("Nhập số: "))
except ValueError:
    print("❌ Vui lòng nhập số hợp lệ!")
else:
    print("✅ Giá trị hợp lệ:", value)
finally:
    print("🔚 Hoàn tất.")
```

## 🎯 Bắt ngoại lệ cụ thể

```python
def read_file(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print("❌ Không tìm thấy file")
    except PermissionError:
        print("❌ Không có quyền truy cập")
    except OSError as e:
        print(f"❌ Lỗi hệ thống: {e}")
```

## 🛑 Chủ động báo lỗi: `raise`

```python
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Mẫu số phải khác 0")
    return a / b
```

## 🧰 Tạo ngoại lệ tuỳ chỉnh

```python
class AppError(Exception):
    """Lỗi chung trong ứng dụng."""

class ConfigError(AppError):
    """Lỗi cấu hình."""

def load_config(data):
    if "key" not in data:
        raise ConfigError("Thiếu trường 'key'")
```

## 🧹 Dọn dẹp tài nguyên với context manager

```python
from contextlib import contextmanager

@contextmanager
def managed_resource(name):
    print(f"Mở {name}")
    try:
        yield name
    finally:
        print(f"Đóng {name}")

with managed_resource("kết nối") as r:
    print("Đang dùng:", r)
```

## ✅ Nguyên tắc vàng

- Bắt đúng loại lỗi; đừng dùng `except Exception` chung chung nếu không cần.
- Thông điệp lỗi rõ ràng, thân thiện tiếng Việt.
- Ghi log khi hữu ích, nhưng không làm lộ thông tin nhạy cảm.
- Ưu tiên sửa nguyên nhân gốc thay vì che lỗi.

## 🧪 Bài tập nhanh

1) Viết hàm đọc JSON từ file, bắt `JSONDecodeError` và thông báo dễ hiểu.
2) Viết decorator bắt lỗi và in thông báo gợi ý cho người dùng.
3) Chuyển các thao tác mở/đóng file thủ công sang `with`.

---

👉 Áp dụng trong các dự án: thông báo lỗi ngắn gọn, dễ hiểu; luôn dọn dẹp tài nguyên.

---
sidebar_position: 13
title: "⚠️ Error Handling - Xử Lý Lỗi Chuyên Nghiệp"
description: "Học cách xử lý lỗi trong Python với try/except, finally, và các kỹ thuật nâng cao. Làm cho code của bạn mạnh mẽ và đáng tin cậy!"
keywords: ["python", "error handling", "try except", "exception", "finally", "raise", "xử lý lỗi", "robust code"]
---

# ⚠️ Error Handling - Xử Lý Lỗi Chuyên Nghiệp

:::tip ⚠️ Ví Dụ Dễ Hiểu
Hãy tưởng tượng Error Handling như một **hệ thống bảo vệ thông minh**! Khi có "kẻ xâm nhập" (lỗi) xuất hiện, hệ thống sẽ bắt giữ và xử lý chúng một cách an toàn, thay vì để chúng phá hỏng toàn bộ chương trình!
:::

## 🤔 Tại Sao Cần Error Handling?

Trong cuộc sống, chúng ta luôn chuẩn bị cho những tình huống bất ngờ:
- 🚗 **Lái xe**: Chuẩn bị phanh khi có chướng ngại vật
- 🏠 **Ở nhà**: Có bảo hiểm khi có thiên tai
- 🎮 **Chơi game**: Có mạng lưới an toàn khi rơi

Python cũng cần **"hệ thống bảo vệ"** tương tự!

```mermaid
graph LR
    A[🚀 Code Chạy] --> B[⚠️ Lỗi Xảy Ra]
    B --> C[🛡️ Try/Except]
    C --> D[✅ Xử Lý An Toàn]
    C --> E[🔄 Tiếp Tục Chạy]
    
    B --> F[❌ Không Xử Lý]
    F --> G[💥 Chương Trình Crash]
    
    style A fill:#98FB98
    style C fill:#87CEEB
    style D fill:#90EE90
    style F fill:#FFB6C1
    style G fill:#FFA07A
```

## 🎯 Try/Except Cơ Bản

### 📌 Cú Pháp

```python
try:
    # Code có thể gây lỗi
    pass
except ExceptionType:
    # Xử lý lỗi
    pass
```

### 🌟 Ví Dụ Cơ Bản

```python
# ❌ Code không xử lý lỗi
so = int(input("Nhập số: "))  # Nếu nhập "abc" sẽ crash!

# ✅ Code có xử lý lỗi
try:
    so = int(input("Nhập số: "))
    print(f"Số bạn nhập: {so}")
except ValueError:
    print("❌ Vui lòng nhập số hợp lệ!")

print("Chương trình tiếp tục chạy...")
```

### 🎯 Các Loại Lỗi Phổ Biến

```python
# ValueError - Giá trị không hợp lệ
try:
    so = int("abc")
except ValueError as e:
    print(f"Lỗi ValueError: {e}")

# ZeroDivisionError - Chia cho 0
try:
    ket_qua = 10 / 0
except ZeroDivisionError as e:
    print(f"Lỗi ZeroDivisionError: {e}")

# IndexError - Truy cập index không tồn tại
try:
    danh_sach = [1, 2, 3]
    phan_tu = danh_sach[10]
except IndexError as e:
    print(f"Lỗi IndexError: {e}")

# KeyError - Truy cập key không tồn tại
try:
    tu_dien = {"a": 1, "b": 2}
    gia_tri = tu_dien["c"]
except KeyError as e:
    print(f"Lỗi KeyError: {e}")

# FileNotFoundError - File không tồn tại
try:
    with open("file_khong_ton_tai.txt", "r") as f:
        noi_dung = f.read()
except FileNotFoundError as e:
    print(f"Lỗi FileNotFoundError: {e}")
```

## 🎨 Xử Lý Nhiều Loại Lỗi

### 🔄 Multiple Except Blocks

```python
def chia_so(a, b):
    try:
        ket_qua = a / b
        return ket_qua
    except ZeroDivisionError:
        print("❌ Không thể chia cho 0!")
        return None
    except TypeError:
        print("❌ Vui lòng nhập số!")
        return None
    except Exception as e:
        print(f"❌ Lỗi không xác định: {e}")
        return None

# Test
print(chia_so(10, 2))    # 5.0
print(chia_so(10, 0))    # None (ZeroDivisionError)
print(chia_so("10", 2))  # None (TypeError)
```

### 🎯 Single Except Block

```python
def xu_ly_so(so_str):
    try:
        so = int(so_str)
        return so * 2
    except (ValueError, TypeError) as e:
        print(f"❌ Lỗi chuyển đổi: {e}")
        return None

# Test
print(xu_ly_so("123"))   # 246
print(xu_ly_so("abc"))   # None
print(xu_ly_so(None))    # None
```

## 🎪 Ví Dụ Thực Tế: Hệ Thống Quản Lý File

```python
# 📁 Hệ thống quản lý file với error handling
import os
import json

class QuanLyFile:
    def __init__(self):
        self.thu_muc_lam_viec = "data"
        self.tao_thu_muc()
    
    def tao_thu_muc(self):
        """Tạo thư mục làm việc"""
        try:
            if not os.path.exists(self.thu_muc_lam_viec):
                os.makedirs(self.thu_muc_lam_viec)
                print(f"✅ Đã tạo thư mục: {self.thu_muc_lam_viec}")
        except PermissionError:
            print("❌ Không có quyền tạo thư mục!")
        except Exception as e:
            print(f"❌ Lỗi tạo thư mục: {e}")
    
    def ghi_file(self, ten_file, noi_dung):
        """Ghi nội dung vào file"""
        try:
            duong_dan = os.path.join(self.thu_muc_lam_viec, ten_file)
            with open(duong_dan, 'w', encoding='utf-8') as f:
                f.write(noi_dung)
            print(f"✅ Đã ghi file: {ten_file}")
            return True
        except PermissionError:
            print(f"❌ Không có quyền ghi file: {ten_file}")
            return False
        except OSError as e:
            print(f"❌ Lỗi hệ thống khi ghi file: {e}")
            return False
        except Exception as e:
            print(f"❌ Lỗi không xác định: {e}")
            return False
    
    def doc_file(self, ten_file):
        """Đọc nội dung từ file"""
        try:
            duong_dan = os.path.join(self.thu_muc_lam_viec, ten_file)
            with open(duong_dan, 'r', encoding='utf-8') as f:
                noi_dung = f.read()
            print(f"✅ Đã đọc file: {ten_file}")
            return noi_dung
        except FileNotFoundError:
            print(f"❌ File không tồn tại: {ten_file}")
            return None
        except PermissionError:
            print(f"❌ Không có quyền đọc file: {ten_file}")
            return None
        except UnicodeDecodeError:
            print(f"❌ Lỗi mã hóa file: {ten_file}")
            return None
        except Exception as e:
            print(f"❌ Lỗi không xác định: {e}")
            return None
    
    def ghi_json(self, ten_file, du_lieu):
        """Ghi dữ liệu JSON vào file"""
        try:
            duong_dan = os.path.join(self.thu_muc_lam_viec, ten_file)
            with open(duong_dan, 'w', encoding='utf-8') as f:
                json.dump(du_lieu, f, ensure_ascii=False, indent=2)
            print(f"✅ Đã ghi JSON: {ten_file}")
            return True
        except TypeError as e:
            print(f"❌ Dữ liệu không thể serialize: {e}")
            return False
        except Exception as e:
            print(f"❌ Lỗi ghi JSON: {e}")
            return False
    
    def doc_json(self, ten_file):
        """Đọc dữ liệu JSON từ file"""
        try:
            duong_dan = os.path.join(self.thu_muc_lam_viec, ten_file)
            with open(duong_dan, 'r', encoding='utf-8') as f:
                du_lieu = json.load(f)
            print(f"✅ Đã đọc JSON: {ten_file}")
            return du_lieu
        except FileNotFoundError:
            print(f"❌ File JSON không tồn tại: {ten_file}")
            return None
        except json.JSONDecodeError as e:
            print(f"❌ Lỗi định dạng JSON: {e}")
            return None
        except Exception as e:
            print(f"❌ Lỗi đọc JSON: {e}")
            return None
    
    def xoa_file(self, ten_file):
        """Xóa file"""
        try:
            duong_dan = os.path.join(self.thu_muc_lam_viec, ten_file)
            if os.path.exists(duong_dan):
                os.remove(duong_dan)
                print(f"✅ Đã xóa file: {ten_file}")
                return True
            else:
                print(f"⚠️  File không tồn tại: {ten_file}")
                return False
        except PermissionError:
            print(f"❌ Không có quyền xóa file: {ten_file}")
            return False
        except Exception as e:
            print(f"❌ Lỗi xóa file: {e}")
            return False
    
    def hien_thi_danh_sach_file(self):
        """Hiển thị danh sách file"""
        try:
            if os.path.exists(self.thu_muc_lam_viec):
                files = os.listdir(self.thu_muc_lam_viec)
                if files:
                    print(f"\n📁 Danh sách file trong {self.thu_muc_lam_viec}:")
                    for file in files:
                        print(f"   - {file}")
                else:
                    print(f"📁 Thư mục {self.thu_muc_lam_viec} trống")
            else:
                print(f"❌ Thư mục {self.thu_muc_lam_viec} không tồn tại")
        except Exception as e:
            print(f"❌ Lỗi liệt kê file: {e}")

# Sử dụng hệ thống
quan_ly = QuanLyFile()

# Test các chức năng
quan_ly.ghi_file("test.txt", "Hello World!")
quan_ly.doc_file("test.txt")
quan_ly.doc_file("file_khong_ton_tai.txt")

# Test JSON
du_lieu = {"ten": "An", "tuoi": 16, "lop": "9A"}
quan_ly.ghi_json("hoc_sinh.json", du_lieu)
ket_qua = quan_ly.doc_json("hoc_sinh.json")
print(f"Dữ liệu JSON: {ket_qua}")

# Hiển thị danh sách
quan_ly.hien_thi_danh_sach_file()
```

## 🎯 Bài Tập Thực Hành

### 🥇 Bài Tập 1: Máy Tính An Toàn

```python
# TODO: Tạo máy tính an toàn với error handling
class MayTinhAnToan:
    def __init__(self):
        self.lich_su = []
    
    def cong(self, a, b):
        """Phép cộng an toàn"""
        try:
            a = float(a)
            b = float(b)
            ket_qua = a + b
            self.lich_su.append(f"{a} + {b} = {ket_qua}")
            return ket_qua
        except (ValueError, TypeError) as e:
            print(f"❌ Lỗi: {e}")
            return None
    
    def tru(self, a, b):
        """Phép trừ an toàn"""
        try:
            a = float(a)
            b = float(b)
            ket_qua = a - b
            self.lich_su.append(f"{a} - {b} = {ket_qua}")
            return ket_qua
        except (ValueError, TypeError) as e:
            print(f"❌ Lỗi: {e}")
            return None
    
    def nhan(self, a, b):
        """Phép nhân an toàn"""
        try:
            a = float(a)
            b = float(b)
            ket_qua = a * b
            self.lich_su.append(f"{a} × {b} = {ket_qua}")
            return ket_qua
        except (ValueError, TypeError) as e:
            print(f"❌ Lỗi: {e}")
            return None
    
    def chia(self, a, b):
        """Phép chia an toàn"""
        try:
            a = float(a)
            b = float(b)
            
            if b == 0:
                print("❌ Không thể chia cho 0!")
                return None
            
            ket_qua = a / b
            self.lich_su.append(f"{a} ÷ {b} = {ket_qua}")
            return ket_qua
        except (ValueError, TypeError) as e:
            print(f"❌ Lỗi: {e}")
            return None
        except ZeroDivisionError:
            print("❌ Không thể chia cho 0!")
            return None
    
    def can_bac_hai(self, a):
        """Căn bậc hai an toàn"""
        try:
            a = float(a)
            
            if a < 0:
                print("❌ Không thể tính căn bậc hai của số âm!")
                return None
            
            ket_qua = a ** 0.5
            self.lich_su.append(f"√{a} = {ket_qua}")
            return ket_qua
        except (ValueError, TypeError) as e:
            print(f"❌ Lỗi: {e}")
            return None
    
    def tinh_bieu_thuc(self, bieu_thuc):
        """Tính biểu thức an toàn"""
        try:
            # Loại bỏ khoảng trắng
            bieu_thuc = bieu_thuc.replace(" ", "")
            
            # Kiểm tra ký tự hợp lệ
            if not all(c.isdigit() or c in "+-*/.()" for c in bieu_thuc):
                print("❌ Biểu thức chứa ký tự không hợp lệ!")
                return None
            
            # Tính toán (chỉ cho phép các phép tính cơ bản)
            ket_qua = eval(bieu_thuc)
            self.lich_su.append(f"{bieu_thuc} = {ket_qua}")
            return ket_qua
        except ZeroDivisionError:
            print("❌ Lỗi: Chia cho 0!")
            return None
        except SyntaxError:
            print("❌ Lỗi: Biểu thức không hợp lệ!")
            return None
        except Exception as e:
            print(f"❌ Lỗi: {e}")
            return None
    
    def hien_thi_lich_su(self):
        """Hiển thị lịch sử tính toán"""
        if self.lich_su:
            print("\n📋 LỊCH SỬ TÍNH TOÁN")
            print("=" * 30)
            for i, tinh_toan in enumerate(self.lich_su, 1):
                print(f"{i:2d}. {tinh_toan}")
        else:
            print("📋 Chưa có lịch sử tính toán")
    
    def chay_may_tinh(self):
        """Chạy máy tính tương tác"""
        print("🧮 MÁY TÍNH AN TOÀN")
        print("=" * 30)
        print("Các phép tính: +, -, *, /, √, biểu thức")
        print("Gõ 'history' để xem lịch sử")
        print("Gõ 'quit' để thoát")
        print("-" * 30)
        
        while True:
            try:
                nhap = input("\nNhập phép tính: ").strip()
                
                if nhap.lower() == 'quit':
                    print("👋 Tạm biệt!")
                    break
                elif nhap.lower() == 'history':
                    self.hien_thi_lich_su()
                    continue
                
                # Xử lý phép tính
                if nhap.startswith('√'):
                    so = nhap[1:]
                    ket_qua = self.can_bac_hai(so)
                elif '+' in nhap and len(nhap.split('+')) == 2:
                    a, b = nhap.split('+')
                    ket_qua = self.cong(a, b)
                elif '-' in nhap and len(nhap.split('-')) == 2:
                    a, b = nhap.split('-')
                    ket_qua = self.tru(a, b)
                elif '*' in nhap and len(nhap.split('*')) == 2:
                    a, b = nhap.split('*')
                    ket_qua = self.nhan(a, b)
                elif '/' in nhap and len(nhap.split('/')) == 2:
                    a, b = nhap.split('/')
                    ket_qua = self.chia(a, b)
                else:
                    ket_qua = self.tinh_bieu_thuc(nhap)
                
                if ket_qua is not None:
                    print(f"📊 Kết quả: {ket_qua}")
                
            except KeyboardInterrupt:
                print("\n👋 Tạm biệt!")
                break
            except Exception as e:
                print(f"❌ Lỗi không mong muốn: {e}")

# Chạy máy tính
may_tinh = MayTinhAnToan()
may_tinh.chay_may_tinh()
```

## 🎊 Tóm Tắt

Trong bài này, bạn đã học được:

✅ **Try/Except cơ bản** - Xử lý lỗi cơ bản  
✅ **Multiple except blocks** - Xử lý nhiều loại lỗi  
✅ **Exception types** - ValueError, ZeroDivisionError, FileNotFoundError  
✅ **Finally block** - Code luôn chạy  
✅ **Raise exceptions** - Tạo lỗi tùy chỉnh  
✅ **Ứng dụng thực tế** - Quản lý file, máy tính an toàn  

## 🚀 Bước Tiếp Theo

Tuyệt vời! Bây giờ bạn đã biết cách **xử lý lỗi chuyên nghiệp**! Tiếp theo, chúng ta sẽ tạo [Password Generator Project](/python/projects/password-generator) - một dự án thực tế và hữu ích!

:::tip 🎯 Thử Thách Nhỏ
Hãy thử tạo một "hệ thống đăng nhập an toàn" với error handling! Xử lý lỗi nhập sai, file không tồn tại, và các tình huống bất ngờ khác!
:::

---

*🔗 **Dự án tiếp theo**: [Password Generator - Tạo Mật Khẩu An Toàn](/python/projects/password-generator)*
