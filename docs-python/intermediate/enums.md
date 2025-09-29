# 🏷️ Enums - Hằng Số Thông Minh

> **Mục tiêu**: Học cách sử dụng Enum để tạo ra các hằng số có ý nghĩa và an toàn! 🎯

## 🤔 Enum Là Gì?

**Enum** (Enumeration - Liệt kê) là một cách để tạo ra một tập hợp các hằng số có tên, thay vì sử dụng những con số hoặc chuỗi "ma thuật".

### 🎭 Ví Dụ Cuộc Sống

Thay vì viết:
```python
# ❌ Magic numbers - khó hiểu
if user_status == 1:
    print("User đang hoạt động")
elif user_status == 2:
    print("User bị khóa")
elif user_status == 3:
    print("User đã xóa")
```

Ta viết:
```python
# ✅ Enum - rõ ràng và dễ hiểu
if user_status == UserStatus.ACTIVE:
    print("User đang hoạt động")
elif user_status == UserStatus.BLOCKED:
    print("User bị khóa")
elif user_status == UserStatus.DELETED:
    print("User đã xóa")
```

## 🚀 Cách Sử Dụng Enum

### Import và tạo Enum cơ bản

```python
from enum import Enum

class Color(Enum):
    """Enum cho các màu sắc"""
    RED = 1
    GREEN = 2
    BLUE = 3
    YELLOW = 4
    BLACK = 5
    WHITE = 6

# Sử dụng Enum
print("🎨 DEMO ENUM CƠ BẢN")
print("=" * 30)

# Truy cập thành viên Enum
favorite_color = Color.BLUE
print(f"Màu yêu thích: {favorite_color}")
print(f"Tên: {favorite_color.name}")
print(f"Giá trị: {favorite_color.value}")

# Kiểm tra type
print(f"Type: {type(favorite_color)}")
print(f"Là Color enum? {isinstance(favorite_color, Color)}")

# So sánh
print(f"BLUE == BLUE: {Color.BLUE == Color.BLUE}")
print(f"BLUE == RED: {Color.BLUE == Color.RED}")
print(f"BLUE is BLUE: {Color.BLUE is Color.BLUE}")
```

### Lặp qua Enum

```python
print(f"\n🔄 LẶP QUA ENUM:")
print("-" * 20)

# Lặp qua tất cả thành viên
for color in Color:
    print(f"🎨 {color.name}: {color.value}")

# Lấy danh sách tên và giá trị
color_names = [color.name for color in Color]
color_values = [color.value for color in Color]

print(f"\nTên các màu: {color_names}")
print(f"Giá trị các màu: {color_values}")
```

## 🎮 Ví Dụ Game: Character Classes

```python
from enum import Enum, auto

class CharacterClass(Enum):
    """Enum cho các class nhân vật game"""
    WARRIOR = auto()    # auto() tự động gán giá trị
    MAGE = auto()
    ARCHER = auto()
    HEALER = auto()
    ROGUE = auto()

class Difficulty(Enum):
    """Enum cho độ khó"""
    EASY = ("Dễ", 1.0, "🟢")
    NORMAL = ("Bình thường", 1.5, "🟡") 
    HARD = ("Khó", 2.0, "🟠")
    NIGHTMARE = ("Ác mộng", 3.0, "🔴")
    
    def __init__(self, vietnamese_name, multiplier, icon):
        self.vietnamese_name = vietnamese_name
        self.multiplier = multiplier
        self.icon = icon

class GameCharacter:
    """Class nhân vật game sử dụng Enum"""
    
    def __init__(self, name, character_class, difficulty):
        self.name = name
        self.character_class = character_class
        self.difficulty = difficulty
        self.level = 1
        self.base_stats = self._get_base_stats()
    
    def _get_base_stats(self):
        """Lấy stats cơ bản theo class"""
        base_stats = {
            CharacterClass.WARRIOR: {"hp": 120, "mp": 30, "attack": 25, "defense": 20},
            CharacterClass.MAGE: {"hp": 80, "mp": 100, "attack": 35, "defense": 10},
            CharacterClass.ARCHER: {"hp": 95, "mp": 50, "attack": 30, "defense": 15},
            CharacterClass.HEALER: {"hp": 100, "mp": 120, "attack": 18, "defense": 15},
            CharacterClass.ROGUE: {"hp": 90, "mp": 60, "attack": 28, "defense": 12}
        }
        
        stats = base_stats[self.character_class].copy()
        
        # Áp dụng multiplier từ difficulty
        for stat in ['hp', 'attack']:
            stats[stat] = int(stats[stat] * self.difficulty.multiplier)
        
        return stats
    
    def get_class_description(self):
        """Mô tả class"""
        descriptions = {
            CharacterClass.WARRIOR: "🛡️ Chiến binh dũng mãnh với khả năng phòng thủ cao",
            CharacterClass.MAGE: "🔮 Pháp sư quyền năng với phép thuật hủy diệt",
            CharacterClass.ARCHER: "🏹 Cung thủ thiện xạ với tấn công tầm xa",
            CharacterClass.HEALER: "✨ Thầy thuốc với khả năng hồi phục kỳ diệu",
            CharacterClass.ROGUE: "🗡️ Sát thủ nhanh nhẹn với đòn tấn công bất ngờ"
        }
        return descriptions[self.character_class]
    
    def __str__(self):
        return (f"{self.difficulty.icon} {self.name} - {self.character_class.name.title()} "
                f"(Level {self.level}, {self.difficulty.vietnamese_name})")
    
    def show_stats(self):
        """Hiển thị stats chi tiết"""
        print(f"\n👤 {self.name}")
        print(f"🎭 Class: {self.character_class.name.title()}")
        print(f"⚔️ Difficulty: {self.difficulty.vietnamese_name} {self.difficulty.icon}")
        print(f"📊 Stats:")
        for stat_name, value in self.base_stats.items():
            print(f"   {stat_name.upper()}: {value}")
        print(f"📝 {self.get_class_description()}")

# Demo Game Character với Enum
print(f"\n🎮 DEMO GAME CHARACTER VỚI ENUM")
print("=" * 50)

# Tạo các nhân vật khác nhau
characters = [
    GameCharacter("Arthur", CharacterClass.WARRIOR, Difficulty.NORMAL),
    GameCharacter("Merlin", CharacterClass.MAGE, Difficulty.HARD),
    GameCharacter("Robin", CharacterClass.ARCHER, Difficulty.EASY),
    GameCharacter("Gandalf", CharacterClass.HEALER, Difficulty.NIGHTMARE),
    GameCharacter("Shadow", CharacterClass.ROGUE, Difficulty.HARD)
]

# Hiển thị danh sách nhân vật
print("🏆 PARTY MEMBERS:")
for char in characters:
    print(f"  {char}")

# Hiển thị stats chi tiết của một nhân vật
characters[0].show_stats()
```

## 📅 Enum cho Ngày Tháng

```python
from enum import Enum
from datetime import datetime, timedelta

class DayOfWeek(Enum):
    """Enum cho các ngày trong tuần"""
    MONDAY = (1, "Thứ Hai", "T2", "📅")
    TUESDAY = (2, "Thứ Ba", "T3", "📅")
    WEDNESDAY = (3, "Thứ Tư", "T4", "📅")
    THURSDAY = (4, "Thứ Năm", "T5", "📅")
    FRIDAY = (5, "Thứ Sáu", "T6", "🎉")  # Friday emoji khác
    SATURDAY = (6, "Thứ Bảy", "T7", "🏖️")
    SUNDAY = (7, "Chủ Nhật", "CN", "😴")
    
    def __init__(self, number, vietnamese_name, short_name, emoji):
        self.number = number
        self.vietnamese_name = vietnamese_name
        self.short_name = short_name
        self.emoji = emoji
    
    @classmethod
    def from_datetime(cls, dt):
        """Tạo DayOfWeek từ datetime"""
        # datetime.weekday() trả về 0-6 (Monday=0)
        # Ta cần 1-7 (Monday=1)
        weekday_map = {
            0: cls.MONDAY,
            1: cls.TUESDAY,
            2: cls.WEDNESDAY, 
            3: cls.THURSDAY,
            4: cls.FRIDAY,
            5: cls.SATURDAY,
            6: cls.SUNDAY
        }
        return weekday_map[dt.weekday()]
    
    def is_weekend(self):
        """Kiểm tra có phải cuối tuần không"""
        return self in [DayOfWeek.SATURDAY, DayOfWeek.SUNDAY]
    
    def is_workday(self):
        """Kiểm tra có phải ngày làm việc không"""
        return not self.is_weekend()

class Month(Enum):
    """Enum cho các tháng"""
    JANUARY = (1, "Tháng Một", "❄️")
    FEBRUARY = (2, "Tháng Hai", "💝")
    MARCH = (3, "Tháng Ba", "🌸")
    APRIL = (4, "Tháng Tư", "🌷")
    MAY = (5, "Tháng Năm", "🌺")
    JUNE = (6, "Tháng Sáu", "☀️")
    JULY = (7, "Tháng Bảy", "🏖️")
    AUGUST = (8, "Tháng Tám", "🌻")
    SEPTEMBER = (9, "Tháng Chín", "🍂")
    OCTOBER = (10, "Tháng Mười", "🎃")
    NOVEMBER = (11, "Tháng Mười Một", "🦃")
    DECEMBER = (12, "Tháng Mười Hai", "🎄")
    
    def __init__(self, number, vietnamese_name, emoji):
        self.number = number
        self.vietnamese_name = vietnamese_name
        self.emoji = emoji
    
    @classmethod
    def from_number(cls, month_number):
        """Tạo Month từ số tháng"""
        for month in cls:
            if month.number == month_number:
                return month
        raise ValueError(f"Invalid month number: {month_number}")
    
    def get_season(self):
        """Lấy mùa"""
        if self.number in [12, 1, 2]:
            return "Mùa đông ❄️"
        elif self.number in [3, 4, 5]:
            return "Mùa xuân 🌸"
        elif self.number in [6, 7, 8]:
            return "Mùa hè ☀️"
        else:
            return "Mùa thu 🍂"

# Demo Date Enums
print(f"\n📅 DEMO DATE ENUMS")
print("=" * 30)

# Hôm nay
today = datetime.now()
current_day = DayOfWeek.from_datetime(today)
current_month = Month.from_number(today.month)

print(f"🗓️ Hôm nay:")
print(f"   Ngày: {current_day.emoji} {current_day.vietnamese_name}")
print(f"   Tháng: {current_month.emoji} {current_month.vietnamese_name}")
print(f"   Mùa: {current_month.get_season()}")

print(f"   Weekend? {'Có' if current_day.is_weekend() else 'Không'}")
print(f"   Ngày làm việc? {'Có' if current_day.is_workday() else 'Không'}")

# Lịch tuần
print(f"\n📆 LỊCH TUẦN:")
for day in DayOfWeek:
    status = "🏖️ Nghỉ" if day.is_weekend() else "💼 Làm việc"
    print(f"   {day.emoji} {day.short_name}: {status}")
```

## 🏬 Enum cho Ứng Dụng Thực Tế

```python
from enum import Enum, Flag, auto
from dataclasses import dataclass
from typing import List

class OrderStatus(Enum):
    """Enum trạng thái đơn hàng"""
    PENDING = ("pending", "Chờ xác nhận", "⏳", "#FFA500")
    CONFIRMED = ("confirmed", "Đã xác nhận", "✅", "#32CD32")
    PREPARING = ("preparing", "Đang chuẩn bị", "👨‍🍳", "#1E90FF")
    SHIPPING = ("shipping", "Đang giao hàng", "🚚", "#FF6347")
    DELIVERED = ("delivered", "Đã giao", "📦", "#228B22")
    CANCELLED = ("cancelled", "Đã hủy", "❌", "#DC143C")
    REFUNDED = ("refunded", "Đã hoàn tiền", "💰", "#9932CC")
    
    def __init__(self, code, vietnamese_name, emoji, color):
        self.code = code
        self.vietnamese_name = vietnamese_name
        self.emoji = emoji
        self.color = color
    
    def can_cancel(self):
        """Kiểm tra có thể hủy đơn không"""
        return self in [OrderStatus.PENDING, OrderStatus.CONFIRMED]
    
    def can_refund(self):
        """Kiểm tra có thể hoàn tiền không"""
        return self in [OrderStatus.DELIVERED, OrderStatus.CANCELLED]
    
    def get_next_status(self):
        """Lấy trạng thái tiếp theo"""
        transitions = {
            OrderStatus.PENDING: OrderStatus.CONFIRMED,
            OrderStatus.CONFIRMED: OrderStatus.PREPARING,
            OrderStatus.PREPARING: OrderStatus.SHIPPING,
            OrderStatus.SHIPPING: OrderStatus.DELIVERED
        }
        return transitions.get(self)

class Priority(Enum):
    """Enum mức độ ưu tiên"""
    LOW = (1, "Thấp", "🟢")
    MEDIUM = (2, "Trung bình", "🟡")
    HIGH = (3, "Cao", "🟠")
    URGENT = (4, "Khẩn cấp", "🔴")
    CRITICAL = (5, "Cực kỳ khẩn cấp", "💀")
    
    def __init__(self, level, vietnamese_name, emoji):
        self.level = level
        self.vietnamese_name = vietnamese_name
        self.emoji = emoji
    
    def __lt__(self, other):
        """So sánh priority"""
        if isinstance(other, Priority):
            return self.level < other.level
        return NotImplemented
    
    def __gt__(self, other):
        """So sánh priority"""
        if isinstance(other, Priority):
            return self.level > other.level
        return NotImplemented

# Flag Enum - Cho permissions
class Permission(Flag):
    """Flag enum cho quyền hạn (có thể kết hợp)"""
    READ = auto()       # 1
    WRITE = auto()      # 2
    EXECUTE = auto()    # 4
    DELETE = auto()     # 8
    ADMIN = auto()      # 16
    
    # Combinations
    READ_WRITE = READ | WRITE
    ALL_PERMISSIONS = READ | WRITE | EXECUTE | DELETE | ADMIN

@dataclass
class Order:
    """Class đơn hàng sử dụng Enum"""
    id: int
    customer_name: str
    status: OrderStatus
    priority: Priority
    items: List[str]
    
    def update_status(self, new_status: OrderStatus):
        """Cập nhật trạng thái đơn hàng"""
        print(f"🔄 Cập nhật đơn hàng #{self.id}:")
        print(f"   Từ: {self.status.emoji} {self.status.vietnamese_name}")
        print(f"   Sang: {new_status.emoji} {new_status.vietnamese_name}")
        self.status = new_status
    
    def can_cancel(self):
        """Kiểm tra có thể hủy không"""
        return self.status.can_cancel()
    
    def get_status_display(self):
        """Hiển thị trạng thái đẹp"""
        return f"{self.status.emoji} {self.status.vietnamese_name}"
    
    def get_priority_display(self):
        """Hiển thị priority đẹp"""
        return f"{self.priority.emoji} {self.priority.vietnamese_name}"
    
    def __str__(self):
        return (f"📋 Đơn hàng #{self.id} - {self.customer_name}\n"
                f"   Trạng thái: {self.get_status_display()}\n"
                f"   Ưu tiên: {self.get_priority_display()}\n"
                f"   Sản phẩm: {', '.join(self.items)}")

class OrderManager:
    """Quản lý đơn hàng với Enum"""
    
    def __init__(self):
        self.orders = []
    
    def add_order(self, customer_name, items, priority=Priority.MEDIUM):
        """Thêm đơn hàng mới"""
        order_id = len(self.orders) + 1
        order = Order(
            id=order_id,
            customer_name=customer_name,
            status=OrderStatus.PENDING,
            priority=priority,
            items=items
        )
        self.orders.append(order)
        print(f"✅ Đã tạo đơn hàng #{order_id}")
        return order
    
    def get_orders_by_status(self, status: OrderStatus):
        """Lấy đơn hàng theo trạng thái"""
        return [order for order in self.orders if order.status == status]
    
    def get_orders_by_priority(self, min_priority: Priority):
        """Lấy đơn hàng theo mức ưu tiên tối thiểu"""
        return [order for order in self.orders if order.priority >= min_priority]
    
    def process_order(self, order_id):
        """Xử lý đơn hàng - chuyển sang trạng thái tiếp theo"""
        if order_id <= len(self.orders):
            order = self.orders[order_id - 1]
            next_status = order.status.get_next_status()
            
            if next_status:
                order.update_status(next_status)
                return True
            else:
                print(f"❌ Đơn hàng #{order_id} không thể chuyển trạng thái")
                return False
        else:
            print(f"❌ Không tìm thấy đơn hàng #{order_id}")
            return False
    
    def get_status_report(self):
        """Báo cáo trạng thái đơn hàng"""
        status_count = {}
        priority_count = {}
        
        for order in self.orders:
            # Count by status
            status = order.status
            status_count[status] = status_count.get(status, 0) + 1
            
            # Count by priority
            priority = order.priority
            priority_count[priority] = priority_count.get(priority, 0) + 1
        
        return {
            'total_orders': len(self.orders),
            'by_status': status_count,
            'by_priority': priority_count
        }

# Demo Order Management System
print(f"\n🏬 DEMO ORDER MANAGEMENT SYSTEM")
print("=" * 50)

# Tạo order manager
manager = OrderManager()

# Thêm một số đơn hàng
orders_data = [
    ("Nguyễn Văn An", ["iPhone 15", "AirPods"], Priority.HIGH),
    ("Trần Thị Bình", ["Laptop Dell", "Mouse"], Priority.MEDIUM),
    ("Lê Văn Cường", ["Áo thun", "Quần jean"], Priority.LOW),
    ("Phạm Thị Dung", ["Máy ảnh Canon"], Priority.URGENT)
]

for customer, items, priority in orders_data:
    manager.add_order(customer, items, priority)

print(f"\n📋 DANH SÁCH ĐỞN HÀNG:")
for order in manager.orders:
    print(order)
    print()

# Process một số đơn hàng
print("🔄 XỬ LÝ ĐỢN HÀNG:")
manager.process_order(1)  # An: Pending -> Confirmed
manager.process_order(1)  # An: Confirmed -> Preparing
manager.process_order(2)  # Bình: Pending -> Confirmed

# Báo cáo trạng thái
print(f"\n📊 BÁO CÁO TRẠNG THÁI:")
report = manager.get_status_report()
print(f"Tổng đơn hàng: {report['total_orders']}")

print("Theo trạng thái:")
for status, count in report['by_status'].items():
    print(f"   {status.emoji} {status.vietnamese_name}: {count}")

print("Theo ưu tiên:")
for priority, count in report['by_priority'].items():
    print(f"   {priority.emoji} {priority.vietnamese_name}: {count}")

# Demo Flag Enum
print(f"\n🔐 DEMO PERMISSION FLAGS:")
user_permissions = Permission.READ | Permission.WRITE
admin_permissions = Permission.ALL_PERMISSIONS

print(f"User permissions: {user_permissions}")
print(f"Admin permissions: {admin_permissions}")

print(f"User có quyền READ? {Permission.READ in user_permissions}")
print(f"User có quyền DELETE? {Permission.DELETE in user_permissions}")
print(f"Admin có quyền DELETE? {Permission.DELETE in admin_permissions}")
```

## 🔧 String Enum và Functional API

```python
from enum import Enum, IntEnum

# String Enum
class HttpStatus(Enum):
    """HTTP status codes như String Enum"""
    OK = "200 OK"
    NOT_FOUND = "404 Not Found"
    SERVER_ERROR = "500 Internal Server Error"
    BAD_REQUEST = "400 Bad Request"
    UNAUTHORIZED = "401 Unauthorized"
    FORBIDDEN = "403 Forbidden"
    
    def get_code(self):
        """Lấy mã status"""
        return int(self.value.split()[0])
    
    def get_message(self):
        """Lấy message"""
        return " ".join(self.value.split()[1:])

# Int Enum
class Size(IntEnum):
    """Size enum có thể so sánh như integer"""
    XS = 1
    S = 2
    M = 3
    L = 4
    XL = 5
    XXL = 6
    
    def get_name(self):
        size_names = {
            1: "Extra Small",
            2: "Small", 
            3: "Medium",
            4: "Large",
            5: "Extra Large",
            6: "Double Extra Large"
        }
        return size_names[self.value]

# Functional API - Tạo Enum từ list
Color = Enum('Color', 'RED GREEN BLUE YELLOW')
Animal = Enum('Animal', ['CAT', 'DOG', 'BIRD', 'FISH'])

# Enum với giá trị tự động
class Direction(Enum):
    """Hướng di chuyển với auto()"""
    NORTH = auto()
    SOUTH = auto()
    EAST = auto()
    WEST = auto()
    
    def opposite(self):
        """Lấy hướng ngược lại"""
        opposites = {
            Direction.NORTH: Direction.SOUTH,
            Direction.SOUTH: Direction.NORTH,
            Direction.EAST: Direction.WEST,
            Direction.WEST: Direction.EAST
        }
        return opposites[self]
    
    def turn_right(self):
        """Rẽ phải"""
        turns = {
            Direction.NORTH: Direction.EAST,
            Direction.EAST: Direction.SOUTH,
            Direction.SOUTH: Direction.WEST,
            Direction.WEST: Direction.NORTH
        }
        return turns[self]
    
    def turn_left(self):
        """Rẽ trái"""
        return self.turn_right().turn_right().turn_right()

# Demo các loại Enum khác
print(f"\n🔧 DEMO ADVANCED ENUMS")
print("=" * 40)

# HTTP Status
print("🌐 HTTP Status:")
status = HttpStatus.NOT_FOUND
print(f"   Status: {status.value}")
print(f"   Code: {status.get_code()}")
print(f"   Message: {status.get_message()}")

# Size comparison
print(f"\n👕 Size Comparison:")
my_size = Size.M
friend_size = Size.XL

print(f"   My size: {my_size} ({my_size.get_name()})")
print(f"   Friend size: {friend_size} ({friend_size.get_name()})")
print(f"   Friend size > My size? {friend_size > my_size}")
print(f"   Numeric values: {my_size.value} vs {friend_size.value}")

# Direction
print(f"\n🧭 Direction:")
current = Direction.NORTH
print(f"   Current: {current.name}")
print(f"   Opposite: {current.opposite().name}")
print(f"   Turn right: {current.turn_right().name}")
print(f"   Turn left: {current.turn_left().name}")

# Functional API
print(f"\n🎨 Functional API Colors:")
for color in Color:
    print(f"   {color.name}: {color.value}")
```

## 🏆 Best Practices và Tips

```python
# ✅ Best Practices cho Enum

class Status(Enum):
    """Good enum practices"""
    # 1. Sử dụng UPPER_CASE cho tên
    ACTIVE = "active"
    INACTIVE = "inactive"
    PENDING = "pending"
    
    # 2. Thêm method hữu ích
    def is_active(self):
        return self == Status.ACTIVE
    
    # 3. Validation method
    @classmethod
    def from_string(cls, value):
        """Tạo enum từ string an toàn"""
        for status in cls:
            if status.value == value.lower():
                return status
        raise ValueError(f"Invalid status: {value}")

# ❌ Common Mistakes
class BadEnum(Enum):
    # Đừng dùng camelCase
    activeStatus = 1
    # Đừng dùng giá trị trùng lặp (trừ khi dùng @unique)
    ACTIVE = 1
    ENABLED = 1  # This creates an alias

# ✅ Sử dụng @unique decorator
from enum import unique

@unique
class GoodEnum(Enum):
    """Enum với unique decorator"""
    FIRST = 1
    SECOND = 2
    THIRD = 3
    # FOURTH = 1  # Sẽ raise error nếu uncomment

print(f"\n✅ BEST PRACTICES DEMO")
print("=" * 30)

# Safe string conversion
try:
    status = Status.from_string("ACTIVE")
    print(f"✅ Status created: {status}")
    print(f"   Is active? {status.is_active()}")
except ValueError as e:
    print(f"❌ Error: {e}")

# Enum comparison best practices
status1 = Status.ACTIVE
status2 = Status.ACTIVE

print(f"\n🔍 Comparison:")
print(f"   status1 == status2: {status1 == status2}")
print(f"   status1 is status2: {status1 is status2}")
print(f"   isinstance(status1, Status): {isinstance(status1, Status)}")

# Don't compare with raw values
print(f"\n⚠️ Raw value comparison (avoid this):")
print(f"   status1 == 'active': {status1 == 'active'}")  # False!
print(f"   status1.value == 'active': {status1.value == 'active'}")  # True
```

## 🎯 Tóm Tắt Enum

:::tip Nhớ 5 điều này về Enum:
1. **Readability** - Thay thế magic numbers/strings bằng tên có ý nghĩa
2. **Type Safety** - Compiler/IDE có thể check type và suggest
3. **Immutable** - Enum members không thể thay đổi sau khi tạo
4. **Comparable** - Có thể so sánh equality, IntEnum có thể so sánh order
5. **Extensible** - Có thể thêm methods và properties vào Enum
:::

### 🌟 Khi Nào Dùng Enum:

- 🎮 **Game States** - Status, difficulty levels, character classes
- 🌐 **API Response Codes** - HTTP status, error codes
- 📅 **Date/Time** - Days of week, months, seasons
- 🏬 **Business Logic** - Order status, priority levels, user roles
- ⚙️ **Configuration** - Environment types, log levels

### 📋 Các Loại Enum:

| Loại | Mô Tả | Ví Dụ |
|------|-------|-------|
| `Enum` | Base enum class | `Color.RED` |
| `IntEnum` | Enum với integer values | `Size.L > Size.M` |
| `Flag` | Bitwise operations | `Permission.READ \| WRITE` |
| `auto()` | Tự động gán giá trị | `Status = auto()` |
| `@unique` | Đảm bảo giá trị unique | Không có alias |

**Enum** giúp code bạn rõ ràng, an toàn và dễ bảo trì hơn rất nhiều! 🏷️✨

---

*💡 Tip: Enum là cách tuyệt vời để thay thế "magic numbers" và làm code self-documenting!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
