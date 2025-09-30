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
with open('data.txt', 'w', encoding='utf-8') as f:
    f.write("Xin chào Python!\n")
    f.write("Context Manager rất tuyệt vời!\n")
    print("✅ Đã ghi xong file")
# File tự động đóng ở đây

# Đọc file an toàn  
print("\n📖 Đọc file:")
with open('data.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(f"📄 Nội dung: {content}")
```

### 2. Threading Locks

```python
import threading
import time

# Tạo lock để đồng bộ
lock = threading.Lock()
shared_variable = 0

def add_number(name):
    global shared_variable
    for i in range(5):
        # Sử dụng lock với context manager
        with lock:
            old_value = shared_variable
            print(f"🔄 {name}: đọc {old_value}")
            time.sleep(0.1)  # Mô phỏng xử lý
            shared_variable = old_value + 1
            print(f"✅ {name}: ghi {shared_variable}")

# Test threading
print("🧵 Demo Threading với Context Manager:")
thread1 = threading.Thread(target=add_number, args=("Thread-1",))
thread2 = threading.Thread(target=add_number, args=("Thread-2",))

thread1.start()
thread2.start()
thread1.join()
thread2.join()

print(f"🎯 Kết quả cuối: {shared_variable}")
```

## 🛠️ Tự tạo Context Manager

### 1. Dùng Class (Protocol)

```python
class DatabaseManager:
    """
    Context Manager cho kết nối database
    Giống như một người quản lý cafe - mở cửa, phục vụ, đóng cửa
    """
    
    def __init__(self, db_name):
        self.db_name = db_name
        self.connection = None
    
    def __enter__(self):
        """Được gọi khi bắt đầu 'with' block"""
        print(f"🔌 Đang kết nối đến database: {self.db_name}")
        # Giả lập kết nối database
        self.connection = f"connection_to_{self.db_name}"
        print(f"✅ Kết nối thành công!")
        return self  # Trả về object để dùng trong 'as'
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Được gọi khi kết thúc 'with' block"""
        if exc_type:
            print(f"❌ Có lỗi xảy ra: {exc_val}")
        
        print(f"🔌 Đang đóng kết nối database: {self.db_name}")
        self.connection = None
        print(f"✅ Đã đóng kết nối an toàn!")
        
        # Trả về False để không suppress exception
        return False
    
    def execute_query(self, sql):
        """Thực hiện truy vấn"""
        if not self.connection:
            raise Exception("Không có kết nối!")
        
        print(f"📊 Executing: {sql}")
        return f"Kết quả từ {sql}"

# Sử dụng Context Manager tự tạo
print("🗄️ Demo Database Context Manager:")
try:
    with DatabaseManager("users_db") as db:
        result = db.execute_query("SELECT * FROM users")
        print(f"📋 {result}")
        
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
def timer_manager(activity_name):
    """
    Context Manager đo thời gian thực hiện
    Như một chiếc đồng hồ bấm giờ thông minh!
    """
    import time
    
    print(f"⏰ Bắt đầu: {activity_name}")
    start_time = time.time()
    
    try:
        yield f"Timer cho {activity_name}"  # Giá trị trả về cho 'as'
    except Exception as e:
        print(f"❌ Lỗi trong {activity_name}: {e}")
        raise  # Re-raise exception
    finally:
        end_time = time.time()
        duration = end_time - start_time
        print(f"⏱️ Hoàn thành {activity_name} trong {duration:.2f} giây")

# Sử dụng
print("⏰ Demo Timer Context Manager:")
with timer_manager("Tính toán phức tạp") as timer:
    print(f"🔄 Đang sử dụng: {timer}")
    
    # Giả lập công việc mất thời gian
    total = 0
    for i in range(1000000):
        total += i
    
    print(f"🧮 Kết quả tính toán: {total}")
```

## 🎯 Ví dụ thực tế nâng cao

### 1. Context Manager cho API calls

```python
from contextlib import contextmanager
import time

class APIRateLimit:
    def __init__(self, max_calls=10, time_window=60):
        self.max_calls = max_calls
        self.time_window = time_window
        self.calls = []
    
    def is_allowed(self):
        now = time.time()
        # Loại bỏ calls cũ hơn time_window
        self.calls = [call_time for call_time in self.calls 
                     if now - call_time < self.time_window]
        
        if len(self.calls) < self.max_calls:
            self.calls.append(now)
            return True
        return False

@contextmanager
def api_call_manager(api_name, rate_limiter=None):
    """Context Manager cho API calls với rate limiting"""
    
    if rate_limiter and not rate_limiter.is_allowed():
        print(f"🚫 Rate limit exceeded cho {api_name}. Đợi một chút...")
        time.sleep(1)
        if not rate_limiter.is_allowed():
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
rate_limiter = APIRateLimit(max_calls=3, time_window=10)

print("📡 Demo API Context Manager:")
for i in range(5):
    try:
        with api_call_manager(f"WeatherAPI-Call-{i+1}", rate_limiter) as api:
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
class Account:
    def __init__(self, name, balance):
        self.name = name
        self.balance = balance
    
    def transfer_money(self, amount, recipient_account, transaction):
        """Chuyển tiền với transaction"""
        # Backup trước khi thay đổi
        transaction.backup(f"{self.name}_balance", self.balance)
        transaction.backup(f"{recipient_account.name}_balance", recipient_account.balance)
        
        # Kiểm tra số dư
        if self.balance < amount:
            raise Exception(f"Không đủ tiền! Số dư hiện tại: {self.balance}")
        
        # Thực hiện giao dịch
        self.balance -= amount
        recipient_account.balance += amount
        
        transaction.add_operation(f"Chuyển {amount} từ {self.name} đến {recipient_account.name}")
        
    def __str__(self):
        return f"{self.name}: {self.balance:,}đ"

# Demo transaction
print("🏦 Demo Banking Transaction:")
alice = Account("Alice", 1000000)
bob = Account("Bob", 500000)

print("💰 Trước giao dịch:")
print(f"  👤 {alice}")
print(f"  👤 {bob}")

# Giao dịch thành công
try:
    with Transaction() as tx:
        alice.transfer_money(200000, bob, tx)
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
        alice.transfer_money(2000000, bob, tx)  # Số tiền quá lớn!
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
def temp_files_manager(*file_names):
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
with temp_files_manager("data", "log", "config") as files:
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
    def use_resource(self, resource_type, resource_name):
        """Context manager cho việc sử dụng tài nguyên"""
        
        start_time = time.time()
        thread_id = threading.current_thread().name
        
        with self.lock:
            self.resources[resource_type].append({
                'name': resource_name,
                'thread': thread_id,
                'start_time': start_time
            })
            self.stats[f'{resource_type}_total'] += 1
            
        print(f"🔋 [{thread_id}] Bắt đầu dùng {resource_type}: {resource_name}")
        
        try:
            yield {
                'type': resource_type,
                'name': resource_name,
                'thread': thread_id
            }
            
        except Exception as e:
            print(f"❌ [{thread_id}] Lỗi khi dùng {resource_name}: {e}")
            with self.lock:
                self.stats[f'{resource_type}_errors'] += 1
            raise
            
        finally:
            end_time = time.time()
            usage_time = end_time - start_time
            
            with self.lock:
                # Xóa khỏi danh sách đang sử dụng
                self.resources[resource_type] = [
                    r for r in self.resources[resource_type]
                    if not (r['name'] == resource_name and r['thread'] == thread_id)
                ]
                
                self.stats[f'{resource_type}_time'] += usage_time
                
            print(f"✅ [{thread_id}] Hoàn thành {resource_name} ({usage_time:.2f}s)")
    
    def display_status(self):
        """Hiển thị trạng thái hiện tại của tài nguyên"""
        with self.lock:
            print("\n" + "="*50)
            print("📊 TRẠNG THÁI TÀI NGUYÊN")
            print("="*50)
            
            for resource_type, resource_list in self.resources.items():
                if resource_list:
                    print(f"\n🔋 {resource_type.upper()} đang sử dụng ({len(resource_list)}):")
                    for resource in resource_list:
                        elapsed_time = time.time() - resource['start_time']
                        print(f"  └─ {resource['name']} ({resource['thread']}) - {elapsed_time:.1f}s")
            
            print(f"\n📈 THỐNG KÊ:")
            for key, value in self.stats.items():
                if 'time' in key:
                    print(f"  ⏱️ {key}: {value:.2f}s")
                else:
                    print(f"  📊 {key}: {value}")
            print("="*50)

# Demo functions sử dụng resources
def process_data(monitor, file_name):
    """Mô phỏng xử lý dữ liệu"""
    with monitor.use_resource('database', f'db_conn_{file_name}'):
        with monitor.use_resource('memory', f'buffer_{file_name}'):
            # Giả lập xử lý
            print(f"  📊 Đang xử lý {file_name}...")
            time.sleep(2)
            
            if 'error' in file_name:
                raise Exception("Lỗi xử lý dữ liệu!")

def download_file(monitor, file_name):
    """Mô phỏng tải file"""
    with monitor.use_resource('network', f'download_{file_name}'):
        print(f"  ⬇️ Đang tải {file_name}...")
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
            target=process_data, 
            args=(monitor, file_name),
            name=f"Worker-{i+1}"
        )
    else:
        thread = threading.Thread(
            target=download_file,
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
        monitor.display_status()

monitor_t = threading.Thread(target=monitor_thread, name="Monitor")
monitor_t.start()

# Đợi tất cả hoàn thành
for thread in threads:
    thread.join()

monitor_t.join()

# Hiển thị kết quả cuối
print("\n🎉 TẤT CẢ ĐÃ HOÀN THÀNH!")
monitor.display_status()
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

