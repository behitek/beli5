# 🛡️ Context Managers trong Python - Quản lý tài nguyên an toàn

:::info
Context Manager giống như một người bảo vệ tận tâm - luôn đảm bảo mọi thứ được dọn dẹp sạch sẽ sau khi bạn làm việc xong!
:::

## 🤔 Context Manager là gì?

Context Manager như một người quản gia thông minh:
- **Trước khi vào**: Chuẩn bị mọi thứ cần thiết
- **Trong khi làm việc**: Để bạn tập trung vào công việc chính
- **Sau khi xong**: Tự động dọn dẹp, đóng cửa, tắt đèn

```python
# ❌ Cách thường - dễ quên đóng file
file = open('data.txt', 'r')
content = file.read()
# Ôi không! Quên đóng file rồi!

# ✅ Với Context Manager - tự động đóng
with open('data.txt', 'r') as file:
    content = file.read()
# File tự động được đóng ở đây! 🎉
```

## 🔧 Built-in Context Managers

### 1. File Operations

```python
# Ghi file an toàn
print("📝 Ghi file với context manager:")
with open('du_lieu.txt', 'w', encoding='utf-8') as f:
    f.write("Xin chào Python!\n")
    f.write("Context Manager rất tuyệt vời!\n")
    print("✅ Đã ghi xong file")
# File tự động đóng ở đây

# Đọc file an toàn  
print("\n📖 Đọc file:")
with open('du_lieu.txt', 'r', encoding='utf-8') as f:
    noi_dung = f.read()
    print(f"📄 Nội dung: {noi_dung}")
```

### 2. Threading Locks

```python
import threading
import time

# Tạo lock để đồng bộ
khoa = threading.Lock()
bien_chung = 0

def cong_so(ten):
    global bien_chung
    for i in range(5):
        # Sử dụng lock với context manager
        with khoa:
            gia_tri_cu = bien_chung
            print(f"🔄 {ten}: đọc {gia_tri_cu}")
            time.sleep(0.1)  # Mô phỏng xử lý
            bien_chung = gia_tri_cu + 1
            print(f"✅ {ten}: ghi {bien_chung}")

# Test threading
print("🧵 Demo Threading với Context Manager:")
thread1 = threading.Thread(target=cong_so, args=("Thread-1",))
thread2 = threading.Thread(target=cong_so, args=("Thread-2",))

thread1.start()
thread2.start()
thread1.join()
thread2.join()

print(f"🎯 Kết quả cuối: {bien_chung}")
```

## 🛠️ Tự tạo Context Manager

### 1. Dùng Class (Protocol)

```python
class QuanLyDatabase:
    """
    Context Manager cho kết nối database
    Giống như một người quản lý cafe - mở cửa, phục vụ, đóng cửa
    """
    
    def __init__(self, ten_db):
        self.ten_db = ten_db
        self.ket_noi = None
    
    def __enter__(self):
        """Được gọi khi bắt đầu 'with' block"""
        print(f"🔌 Đang kết nối đến database: {self.ten_db}")
        # Giả lập kết nối database
        self.ket_noi = f"connection_to_{self.ten_db}"
        print(f"✅ Kết nối thành công!")
        return self  # Trả về object để dùng trong 'as'
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Được gọi khi kết thúc 'with' block"""
        if exc_type:
            print(f"❌ Có lỗi xảy ra: {exc_val}")
        
        print(f"🔌 Đang đóng kết nối database: {self.ten_db}")
        self.ket_noi = None
        print(f"✅ Đã đóng kết nối an toàn!")
        
        # Trả về False để không suppress exception
        return False
    
    def truy_van(self, sql):
        """Thực hiện truy vấn"""
        if not self.ket_noi:
            raise Exception("Không có kết nối!")
        
        print(f"📊 Executing: {sql}")
        return f"Kết quả từ {sql}"

# Sử dụng Context Manager tự tạo
print("🗄️ Demo Database Context Manager:")
try:
    with QuanLyDatabase("users_db") as db:
        ket_qua = db.truy_van("SELECT * FROM users")
        print(f"📋 {ket_qua}")
        
        # Giả lập lỗi
        # raise Exception("Lỗi bất ngờ!")
        
except Exception as e:
    print(f"🚨 Xử lý lỗi: {e}")

print("🎉 Chương trình tiếp tục chạy bình thường!")
```

### 2. Dùng `contextlib` decorator

```python
from contextlib import contextmanager

@contextmanager
def quan_ly_timer(ten_hoat_dong):
    """
    Context Manager đo thời gian thực hiện
    Như một chiếc đồng hồ bấm giờ thông minh!
    """
    import time
    
    print(f"⏰ Bắt đầu: {ten_hoat_dong}")
    start_time = time.time()
    
    try:
        yield f"Timer cho {ten_hoat_dong}"  # Giá trị trả về cho 'as'
    except Exception as e:
        print(f"❌ Lỗi trong {ten_hoat_dong}: {e}")
        raise  # Re-raise exception
    finally:
        end_time = time.time()
        thoi_gian = end_time - start_time
        print(f"⏱️ Hoàn thành {ten_hoat_dong} trong {thoi_gian:.2f} giây")

# Sử dụng
print("⏰ Demo Timer Context Manager:")
with quan_ly_timer("Tính toán phức tạp") as timer:
    print(f"🔄 Đang sử dụng: {timer}")
    
    # Giả lập công việc mất thời gian
    tong = 0
    for i in range(1000000):
        tong += i
    
    print(f"🧮 Kết quả tính toán: {tong}")
```

## 🎯 Ví dụ thực tế nâng cao

### 1. Context Manager cho API calls

```python
from contextlib import contextmanager
import time

class APIRateLimit:
    def __init__(self, max_calls=10, thoi_gian_cho=60):
        self.max_calls = max_calls
        self.thoi_gian_cho = thoi_gian_cho
        self.calls = []
    
    def cho_phep_goi(self):
        now = time.time()
        # Loại bỏ calls cũ hơn thời_gian_cho
        self.calls = [call_time for call_time in self.calls 
                     if now - call_time < self.thoi_gian_cho]
        
        if len(self.calls) < self.max_calls:
            self.calls.append(now)
            return True
        return False

@contextmanager
def quan_ly_api_call(api_name, rate_limiter=None):
    """Context Manager cho API calls với rate limiting"""
    
    if rate_limiter and not rate_limiter.cho_phep_goi():
        print(f"🚫 Rate limit exceeded cho {api_name}. Đợi một chút...")
        time.sleep(1)
        if not rate_limiter.cho_phep_goi():
            raise Exception(f"Rate limit vẫn exceeded cho {api_name}")
    
    print(f"📡 Bắt đầu API call: {api_name}")
    start_time = time.time()
    
    try:
        yield f"API connection to {api_name}"
    except Exception as e:
        print(f"❌ API call failed: {e}")
        raise
    finally:
        end_time = time.time()
        print(f"📡 Hoàn thành {api_name} ({end_time - start_time:.2f}s)")

# Demo
rate_limiter = APIRateLimit(max_calls=3, thoi_gian_cho=10)

print("📡 Demo API Context Manager:")
for i in range(5):
    try:
        with quan_ly_api_call(f"WeatherAPI-Call-{i+1}", rate_limiter) as api:
            print(f"   🌤️ Lấy dữ liệu thời tiết từ {api}")
            time.sleep(0.5)  # Giả lập API call
            
    except Exception as e:
        print(f"   🚨 {e}")
        break
```

### 2. Context Manager cho Transaction

```python
class Transaction:
    """
    Giống như giao dịch ngân hàng - hoặc thành công hoàn toàn, 
    hoặc rollback về trạng thái ban đầu!
    """
    
    def __init__(self):
        self.operations = []
        self.backup_data = {}
        self.committed = False
    
    def __enter__(self):
        print("🏦 Bắt đầu transaction")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None and self.committed:
            print("✅ Transaction committed thành công!")
        else:
            print("🔄 Rolling back transaction...")
            self.rollback()
            
        return False  # Không suppress exceptions
    
    def backup(self, key, value):
        """Backup dữ liệu trước khi thay đổi"""
        if key not in self.backup_data:
            self.backup_data[key] = value
            
    def add_operation(self, operation):
        """Thêm operation vào transaction"""
        self.operations.append(operation)
        
    def commit(self):
        """Commit transaction"""
        self.committed = True
        
    def rollback(self):
        """Rollback về trạng thái ban đầu"""
        for key, value in self.backup_data.items():
            print(f"   🔄 Khôi phục {key} = {value}")

# Demo với bank account
class TaiKhoan:
    def __init__(self, ten, so_du):
        self.ten = ten
        self.so_du = so_du
    
    def chuyen_tien(self, so_tien, tai_khoan_nhan, transaction):
        """Chuyển tiền với transaction"""
        # Backup trước khi thay đổi
        transaction.backup(f"{self.ten}_so_du", self.so_du)
        transaction.backup(f"{tai_khoan_nhan.ten}_so_du", tai_khoan_nhan.so_du)
        
        # Kiểm tra số dư
        if self.so_du < so_tien:
            raise Exception(f"Không đủ tiền! Số dư hiện tại: {self.so_du}")
        
        # Thực hiện giao dịch
        self.so_du -= so_tien
        tai_khoan_nhan.so_du += so_tien
        
        transaction.add_operation(f"Chuyển {so_tien} từ {self.ten} đến {tai_khoan_nhan.ten}")
        
    def __str__(self):
        return f"{self.ten}: {self.so_du:,}đ"

# Demo transaction
print("🏦 Demo Banking Transaction:")
alice = TaiKhoan("Alice", 1000000)
bob = TaiKhoan("Bob", 500000)

print("💰 Trước giao dịch:")
print(f"  👤 {alice}")
print(f"  👤 {bob}")

# Giao dịch thành công
try:
    with Transaction() as tx:
        alice.chuyen_tien(200000, bob, tx)
        print(f"💸 {tx.operations[-1]}")
        tx.commit()
        
    print("\n💰 Sau giao dịch thành công:")
    print(f"  👤 {alice}")
    print(f"  👤 {bob}")
    
except Exception as e:
    print(f"❌ Lỗi giao dịch: {e}")

# Giao dịch thất bại (rollback)
print("\n" + "="*50)
print("🔄 Demo giao dịch thất bại:")
try:
    with Transaction() as tx:
        alice.chuyen_tien(2000000, bob, tx)  # Số tiền quá lớn!
        tx.commit()
        
except Exception as e:
    print(f"❌ Lỗi: {e}")

print("\n💰 Sau giao dịch thất bại (đã rollback):")
print(f"  👤 {alice}")
print(f"  👤 {bob}")
```

## 🎮 Context Manager với Multiple Resources

```python
from contextlib import ExitStack
import tempfile
import os

@contextmanager 
def quan_ly_temp_files(*file_names):
    """
    Quản lý nhiều temporary files cùng lúc
    Như một người dọn phòng chuyên nghiệp!
    """
    files = []
    try:
        for name in file_names:
            # Tạo temporary file
            temp_file = tempfile.NamedTemporaryFile(
                mode='w+', 
                suffix=f'_{name}.txt', 
                delete=False,
                encoding='utf-8'
            )
            files.append(temp_file)
            print(f"📄 Tạo temp file: {temp_file.name}")
        
        yield files  # Trả về list các files
        
    finally:
        # Dọn dẹp tất cả files
        for temp_file in files:
            temp_file.close()
            try:
                os.unlink(temp_file.name)
                print(f"🗑️ Đã xóa: {temp_file.name}")
            except FileNotFoundError:
                pass

# Sử dụng Multiple Context Manager
print("📁 Demo Multiple Temp Files:")
with quan_ly_temp_files("data", "log", "config") as files:
    data_file, log_file, config_file = files
    
    # Ghi dữ liệu vào từng file
    data_file.write("Dữ liệu quan trọng\n")
    log_file.write("2024-01-01 10:00:00 - App started\n")
    config_file.write("debug=True\nmax_users=100\n")
    
    print("✅ Đã ghi dữ liệu vào tất cả files")
    
    # Files sẽ tự động được đóng và xóa ở đây
```

## 🏆 Dự án: Smart Resource Manager

```python
import time
import threading
from contextlib import contextmanager
from collections import defaultdict

class ResourceMonitor:
    """
    Hệ thống giám sát tài nguyên thông minh
    Như một người quản lý tòa nhà hiện đại!
    """
    
    def __init__(self):
        self.resources = defaultdict(list)
        self.stats = defaultdict(int)
        self.lock = threading.Lock()
    
    @contextmanager
    def su_dung_tai_nguyen(self, loai_tai_nguyen, ten_tai_nguyen):
        """Context manager cho việc sử dụng tài nguyên"""
        
        start_time = time.time()
        thread_id = threading.current_thread().name
        
        with self.lock:
            self.resources[loai_tai_nguyen].append({
                'ten': ten_tai_nguyen,
                'thread': thread_id,
                'start_time': start_time
            })
            self.stats[f'{loai_tai_nguyen}_total'] += 1
            
        print(f"🔋 [{thread_id}] Bắt đầu dùng {loai_tai_nguyen}: {ten_tai_nguyen}")
        
        try:
            yield {
                'loai': loai_tai_nguyen,
                'ten': ten_tai_nguyen,
                'thread': thread_id
            }
            
        except Exception as e:
            print(f"❌ [{thread_id}] Lỗi khi dùng {ten_tai_nguyen}: {e}")
            with self.lock:
                self.stats[f'{loai_tai_nguyen}_errors'] += 1
            raise
            
        finally:
            end_time = time.time()
            thoi_gian_su_dung = end_time - start_time
            
            with self.lock:
                # Xóa khỏi danh sách đang sử dụng
                self.resources[loai_tai_nguyen] = [
                    r for r in self.resources[loai_tai_nguyen]
                    if not (r['ten'] == ten_tai_nguyen and r['thread'] == thread_id)
                ]
                
                self.stats[f'{loai_tai_nguyen}_time'] += thoi_gian_su_dung
                
            print(f"✅ [{thread_id}] Hoàn thành {ten_tai_nguyen} ({thoi_gian_su_dung:.2f}s)")
    
    def hien_thi_trang_thai(self):
        """Hiển thị trạng thái hiện tại của tài nguyên"""
        with self.lock:
            print("\n" + "="*50)
            print("📊 TRẠNG THÁI TÀI NGUYÊN")
            print("="*50)
            
            for loai, danh_sach in self.resources.items():
                if danh_sach:
                    print(f"\n🔋 {loai.upper()} đang sử dụng ({len(danh_sach)}):")
                    for resource in danh_sach:
                        thoi_gian = time.time() - resource['start_time']
                        print(f"  └─ {resource['ten']} ({resource['thread']}) - {thoi_gian:.1f}s")
            
            print(f"\n📈 THỐNG KÊ:")
            for key, value in self.stats.items():
                if 'time' in key:
                    print(f"  ⏱️ {key}: {value:.2f}s")
                else:
                    print(f"  📊 {key}: {value}")
            print("="*50)

# Demo functions sử dụng resources
def xu_ly_du_lieu(monitor, ten_file):
    """Mô phỏng xử lý dữ liệu"""
    with monitor.su_dung_tai_nguyen('database', f'db_conn_{ten_file}'):
        with monitor.su_dung_tai_nguyen('memory', f'buffer_{ten_file}'):
            # Giả lập xử lý
            print(f"  📊 Đang xử lý {ten_file}...")
            time.sleep(2)
            
            if 'error' in ten_file:
                raise Exception("Lỗi xử lý dữ liệu!")

def tai_file(monitor, ten_file):
    """Mô phỏng tải file"""
    with monitor.su_dung_tai_nguyen('network', f'download_{ten_file}'):
        print(f"  ⬇️ Đang tải {ten_file}...")
        time.sleep(1.5)

# Main demo
print("🏢 Smart Resource Manager Demo")
print("Mô phỏng hệ thống với nhiều threads sử dụng tài nguyên")

monitor = ResourceMonitor()

# Tạo threads
threads = []
files = ['data1.csv', 'data2.json', 'config.txt', 'error_file.txt', 'log.txt']

for i, file_name in enumerate(files):
    if i % 2 == 0:
        thread = threading.Thread(
            target=xu_ly_du_lieu, 
            args=(monitor, file_name),
            name=f"Worker-{i+1}"
        )
    else:
        thread = threading.Thread(
            target=tai_file,
            args=(monitor, file_name), 
            name=f"Downloader-{i+1}"
        )
    
    threads.append(thread)

# Chạy tất cả threads
for thread in threads:
    thread.start()
    time.sleep(0.3)  # Stagger start times

# Monitor thread để hiển thị trạng thái
def monitor_thread():
    for _ in range(6):
        time.sleep(1)
        monitor.hien_thi_trang_thai()

monitor_t = threading.Thread(target=monitor_thread, name="Monitor")
monitor_t.start()

# Đợi tất cả hoàn thành
for thread in threads:
    thread.join()

monitor_t.join()

# Hiển thị kết quả cuối
print("\n🎉 TẤT CẢ ĐÃ HOÀN THÀNH!")
monitor.hien_thi_trang_thai()
```

## 🎯 Tóm tắt

:::tip Nhớ 5 điều này về Context Managers:
1. **`with` statement** - cú pháp chuẩn để sử dụng
2. **`__enter__` và `__exit__`** - hai phương thức cần thiết
3. **`@contextmanager`** - decorator để tạo đơn giản hơn
4. **Auto cleanup** - tự động dọn dẹp dù có lỗi hay không
5. **Resource safety** - đảm bảo tài nguyên được giải phóng
:::

Context Manager giúp bạn:
- 🛡️ Quản lý tài nguyên an toàn
- 🧹 Tự động dọn dẹp
- 🚫 Tránh memory leaks
- ⚡ Code sạch và đáng tin cậy
- 🔒 Đảm bảo consistency

**Bước tiếp theo**: Học về [Lambda Functions](./lambda-functions.md) để viết code ngắn gọn và mạnh mẽ!

---
*💡 Tip: Context Manager như một người bạn đáng tin cậy - luôn đảm bảo mọi thứ được xử lý đúng cách!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
