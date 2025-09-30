# 🎭 Polymorphism - Đa Hình Siêu Thông Minh

> **Mục tiêu**: Hiểu và sử dụng tính đa hình để viết code linh hoạt và mở rộng dễ dàng! 🎯

## 🤔 Polymorphism Là Gì?

**Polymorphism** (Đa hình) là khả năng một đối tượng có thể biểu hiện nhiều hình thái khác nhau tùy vào ngữ cảnh.

### 🎭 Ví Dụ Cuộc Sống

Hãy tưởng tượng một **diễn viên**:
- 🎬 Trong phim hành động → Là siêu anh hùng
- 🎭 Trong kịch → Là hoàng tử
- 📺 Trong quảng cáo → Là người bán hàng

**Cùng một người, nhưng nhiều vai trò khác nhau!**

```mermaid
graph TD
    A[👤 Diễn Viên] --> B[🎬 Siêu Anh Hùng]
    A --> C[🎭 Hoàng Tử]
    A --> D[📺 Người Bán Hàng]
    
    B --> B1[fly(), punch()]
    C --> C1[rule(), command()]
    D --> D1[sell(), advertise()]
```

## 🐾 Ví Dụ Cơ Bản: Động Vật

```python
class Animal:
    """Class cơ sở cho tất cả động vật"""
    
    def __init__(self, name, animal_type):
        self.name = name
        self.animal_type = animal_type
    
    def make_sound(self):
        """Phương thức base - sẽ được override"""
        print(f"{self.name} phát ra âm thanh")
    
    def move(self):
        """Phương thức chung"""
        print(f"{self.name} đang di chuyển")

class Dog(Animal):
    """Class chó kế thừa từ Animal"""
    
    def __init__(self, name):
        super().__init__(name, "Chó")
    
    def make_sound(self):
        """Override - Chó kêu khác"""
        print(f"{self.name}: Gâu gâu! 🐕")
    
    def move(self):
        print(f"{self.name} chạy bằng 4 chân 🏃‍♂️")

class Cat(Animal):
    """Class mèo"""
    
    def __init__(self, name):
        super().__init__(name, "Mèo")
    
    def make_sound(self):
        print(f"{self.name}: Meo meo! 🐱")
    
    def move(self):
        print(f"{self.name} đi nhẹ nhàng, thầm lặng 🥷")

class Bird(Animal):
    """Class chim"""
    
    def __init__(self, name):
        super().__init__(name, "Chim")
    
    def make_sound(self):
        print(f"{self.name}: Chip chip! 🐦")
    
    def move(self):
        print(f"{self.name} bay lên trời cao 🕊️")

# Đây là POLYMORPHISM!
def make_animal_perform(animal):
    """Hàm này nhận bất kỳ loại động vật nào"""
    print(f"🎪 Mời {animal.name} ({animal.animal_type}) biểu diễn:")
    animal.make_sound()        # Polymorphic call
    animal.move()  # Polymorphic call
    print("-" * 40)

# Demo polymorphism
print("🎪 BUỔI BIỂU DIỄN ĐỘNG VẬT")
print("=" * 50)

# Tạo danh sách các động vật khác nhau
animal_list = [
    Dog("Vàng"),
    Cat("Mun"),
    Bird("Pi"),
    Dog("Lucky"),
    Cat("Kitty")
]

# Polymorphism: Cùng một hàm, nhưng hành vi khác nhau!
for animal in animal_list:
    make_animal_perform(animal)
```

## 🎮 Ví Dụ Game: Nhân Vật RPG

```python
from abc import ABC, abstractmethod
import random

class Character(ABC):
    """Abstract class cho tất cả nhân vật"""
    
    def __init__(self, name, hp, mp):
        self.name = name
        self.hp = hp
        self.max_hp = hp
        self.mp = mp
        self.max_mp = mp
        self.level = 1
    
    @abstractmethod
    def attack(self, target):
        """Phương thức trừu tượng - bắt buộc implement"""
        pass
    
    @abstractmethod
    def special_skill(self):
        """Kỹ năng đặc biệt của từng class"""
        pass
    
    def take_damage(self, damage):
        """Phương thức chung cho tất cả nhân vật"""
        self.hp = max(0, self.hp - damage)
        if self.hp == 0:
            print(f"💀 {self.name} đã bị hạ gục!")
        else:
            print(f"🩹 {self.name} mất {damage} HP, còn {self.hp}/{self.max_hp}")
    
    def heal(self, amount):
        """Hồi phục HP"""
        self.hp = min(self.max_hp, self.hp + amount)
        print(f"💚 {self.name} hồi {amount} HP, hiện tại: {self.hp}/{self.max_hp}")

class Warrior(Character):
    """Class Chiến Binh - Tank"""
    
    def __init__(self, name):
        super().__init__(name, hp=120, mp=30)
        self.armor = 15
        self.physical_damage = 25
    
    def attack(self, target):
        """Tấn công vật lý mạnh"""
        damage = self.physical_damage + random.randint(-5, 10)
        print(f"⚔️ {self.name} chém {target.name} gây {damage} sát thương!")
        target.take_damage(damage)
        return damage
    
    def special_skill(self):
        """Kỹ năng: Shield Bash"""
        if self.mp >= 15:
            self.mp -= 15
            damage = self.physical_damage * 2
            print(f"🛡️ {self.name} dùng Shield Bash!")
            return damage
        else:
            print(f"❌ {self.name} không đủ MP!")
            return 0
    
    def defend(self):
        """Kỹ năng đặc biệt của chiến binh"""
        print(f"🛡️ {self.name} tăng cường phòng thủ!")
        self.armor += 5

class Mage(Character):
    """Class Pháp Sư - DPS Magic"""
    
    def __init__(self, name):
        super().__init__(name, hp=80, mp=100)
        self.magic_power = 35
    
    def attack(self, target):
        """Tấn công phép thuật"""
        if self.mp >= 10:
            self.mp -= 10
            damage = self.magic_power + random.randint(-8, 15)
            print(f"🔥 {self.name} dùng phép lửa tấn công {target.name} gây {damage} sát thương!")
            target.take_damage(damage)
            return damage
        else:
            # Tấn công vật lý yếu
            damage = 8 + random.randint(-2, 4)
            print(f"🥄 {self.name} dùng gậy đánh {target.name} gây {damage} sát thương!")
            target.take_damage(damage)
            return damage
    
    def special_skill(self):
        """Kỹ năng: Fireball"""
        if self.mp >= 25:
            self.mp -= 25
            damage = self.magic_power * 2
            print(f"🔥💥 {self.name} dùng Fireball cực mạnh!")
            return damage
        else:
            print(f"❌ {self.name} không đủ MP!")
            return 0

class Archer(Character):
    """Class Cung Thủ - DPS Range"""
    
    def __init__(self, name):
        super().__init__(name, hp=90, mp=50)
        self.accuracy = 80  # %
        self.bow_damage = 30
    
    def attack(self, target):
        """Tấn công tầm xa"""
        # Kiểm tra độ chính xác
        if random.randint(1, 100) <= self.accuracy:
            damage = self.bow_damage + random.randint(-5, 12)
            print(f"🏹 {self.name} bắn trúng {target.name} gây {damage} sát thương!")
            target.take_damage(damage)
            return damage
        else:
            print(f"🏹💨 {self.name} bắn trượt {target.name}!")
            return 0
    
    def special_skill(self):
        """Kỹ năng: Multi Shot"""
        if self.mp >= 20:
            self.mp -= 20
            print(f"🏹🏹🏹 {self.name} dùng Multi Shot!")
            # Bắn 3 mũi tên
            total_damage = 0
            for i in range(3):
                if random.randint(1, 100) <= 90:  # Tăng độ chính xác
                    damage = self.bow_damage + random.randint(-3, 8)
                    total_damage += damage
                    print(f"  🏹 Mũi tên {i+1}: {damage} sát thương!")
            return total_damage
        else:
            print(f"❌ {self.name} không đủ MP!")
            return 0

class Healer(Character):
    """Class Thầy Thuốc - Healer"""
    
    def __init__(self, name):
        super().__init__(name, hp=100, mp=120)
        self.heal_power = 40
    
    def attack(self, target):
        """Tấn công yếu"""
        damage = 12 + random.randint(-3, 6)
        print(f"🔨 {self.name} đánh {target.name} bằng búa nhỏ gây {damage} sát thương!")
        target.take_damage(damage)
        return damage
    
    def special_skill(self):
        """Kỹ năng: Heal"""
        if self.mp >= 15:
            self.mp -= 15
            heal_amount = self.heal_power + random.randint(-5, 10)
            print(f"💚✨ {self.name} dùng phép hồi phục!")
            return heal_amount
        else:
            print(f"❌ {self.name} không đủ MP!")
            return 0
    
    def heal_ally(self, ally):
        """Chữa lành cho đồng minh"""
        if self.mp >= 15:
            self.mp -= 15
            heal_amount = self.heal_power + random.randint(-5, 10)
            print(f"💚 {self.name} chữa lành cho {ally.name}!")
            ally.heal(heal_amount)
        else:
            print(f"❌ {self.name} không đủ MP!")

# Game Combat System với Polymorphism
class GameCombat:
    """Hệ thống chiến đấu game"""
    
    def __init__(self):
        self.party = []  # Nhóm nhân vật
        self.enemies = []  # Kẻ thù
    
    def add_character(self, character):
        """Thêm nhân vật vào party"""
        self.party.append(character)
        print(f"🎮 {character.name} ({character.__class__.__name__}) gia nhập party!")
    
    def create_enemies(self):
        """Tạo kẻ thù ngẫu nhiên"""
        enemy_types = [Warrior, Mage, Archer]
        enemy_names = ["Orc Tối", "Ma Thuật Sư", "Cung Thủ Bóng Tối"]
        
        for i in range(2):
            enemy_class = random.choice(enemy_types)
            name = f"{random.choice(enemy_names)} #{i+1}"
            enemy = enemy_class(name)
            self.enemies.append(enemy)
            print(f"👹 {name} xuất hiện!")
    
    def combat_round(self):
        """Một lượt chiến đấu - Demo Polymorphism"""
        print(f"\n⚔️ LƯỢT CHIẾN ĐẤU")
        print("=" * 40)
        
        # Nhân vật tấn công (Polymorphism!)
        for character in self.party:
            if character.hp > 0 and self.enemies:
                target = random.choice([e for e in self.enemies if e.hp > 0])
                if target:
                    # Tất cả đều gọi attack(), nhưng mỗi class thực hiện khác nhau!
                    character.attack(target)
                    
                    # Loại bỏ kẻ thù đã chết
                    self.enemies = [e for e in self.enemies if e.hp > 0]
        
        # Kẻ thù phản công
        for enemy in self.enemies:
            if enemy.hp > 0 and self.party:
                target = random.choice([p for p in self.party if p.hp > 0])
                if target:
                    enemy.attack(target)
        
        # Loại bỏ nhân vật đã chết
        self.party = [p for p in self.party if p.hp > 0]
    
    def check_game_end(self):
        """Kiểm tra game kết thúc chưa"""
        if not self.party:
            print("💀 THUA CUỘC! Tất cả nhân vật đã bị hạ gục!")
            return True
        elif not self.enemies:
            print("🎉 CHIẾN THẮNG! Đã tiêu diệt tất cả kẻ thù!")
            return True
        return False
    
    def start_game(self):
        """Bắt đầu game"""
        print("🎮 BẮT ĐẦU GAME RPG!")
        print("=" * 50)
        
        # Tạo party
        party_members = [
            Warrior("Arthur"),
            Mage("Merlin"), 
            Archer("Legolas"),
            Healer("Gandalf")
        ]
        
        for member in party_members:
            self.add_character(member)
        
        # Tạo kẻ thù
        self.create_enemies()
        
        # Combat loop
        round_num = 1
        while not self.check_game_end() and round_num <= 10:
            print(f"\n🔄 LƯỢT {round_num}")
            self.combat_round()
            round_num += 1
            
            if round_num <= 10 and not self.check_game_end():
                input("\nNhấn Enter để tiếp tục lượt tiếp theo...")

# Chạy demo game
print("🎮 DEMO POLYMORPHISM TRONG GAME RPG")
print("=" * 50)

game = GameCombat()
game.start_game()
```

## 🚗 Polymorphism với Phương Tiện

```python
class Vehicle:
    """Base class cho phương tiện"""
    
    def __init__(self, name, max_speed):
        self.name = name
        self.max_speed = max_speed
        self.current_speed = 0
    
    def start_engine(self):
        print(f"🔧 {self.name} đang khởi động...")
    
    def accelerate(self, increase):
        self.current_speed = min(
            self.max_speed, 
            self.current_speed + increase
        )
    
    def decelerate(self, decrease):
        self.current_speed = max(0, self.current_speed - decrease)
    
    def engine_sound(self):
        """Method sẽ được override - Polymorphic!"""
        print(f"🔊 {self.name}: Âm thanh động cơ chung chung...")

class Motorcycle(Vehicle):
    def __init__(self, name):
        super().__init__(name, 120)
    
    def engine_sound(self):
        print(f"🏍️ {self.name}: Brrrr... brrrr... (tiếng xe máy)")
    
    def start_engine(self):
        super().start_engine()
        print(f"   🔑 Xoay chìa khóa xe máy...")
        print(f"   ⚡ Đá khởi động...")

class Car(Vehicle):
    def __init__(self, name):
        super().__init__(name, 200)
    
    def engine_sound(self):
        print(f"🚗 {self.name}: Vroom... vroom... (tiếng xe hơi)")
    
    def start_engine(self):
        super().start_engine()
        print(f"   🔑 Nhấn nút start...")
        print(f"   💺 Điều chỉnh ghế ngồi...")

class Truck(Vehicle):
    def __init__(self, name):
        super().__init__(name, 90)
    
    def engine_sound(self):
        print(f"🚛 {self.name}: VROOOOOM... (tiếng xe tải to lớn)")
    
    def start_engine(self):
        super().start_engine()
        print(f"   🚛 Kiểm tra hàng hóa...")
        print(f"   📋 Xem lộ trình giao hàng...")

class Airplane(Vehicle):
    def __init__(self, name):
        super().__init__(name, 900)
    
    def engine_sound(self):
        print(f"✈️ {self.name}: Whoooosh... (tiếng máy bay)")
    
    def start_engine(self):
        super().start_engine()
        print(f"   ✈️ Kiểm tra hệ thống bay...")
        print(f"   📡 Liên hệ tháp điều khiển...")
    
    def take_off(self):
        print(f"🛫 {self.name} đang cất cánh!")

# Demo Polymorphism với collection
def demo_vehicle_garage():
    """Demo quản lý bãi xe với polymorphism"""
    print("🅿️ QUẢN LÝ BÃI XE ĐA DẠNG")
    print("=" * 40)
    
    # Tạo danh sách các phương tiện khác nhau
    vehicle_list = [
        Motorcycle("Honda Winner"),
        Car("Toyota Camry"),
        Truck("Hyundai Porter"),
        Airplane("Boeing 747"),
        Motorcycle("Yamaha Exciter"),
        Car("Mercedes C300")
    ]
    
    print(f"🚗 Có {len(vehicle_list)} phương tiện trong bãi:")
    
    for i, vehicle in enumerate(vehicle_list, 1):
        print(f"\n{i}. {vehicle.name} ({vehicle.__class__.__name__})")
        print("   🔧 Khởi động:")
        vehicle.start_engine()
        
        print("   🔊 Âm thanh:")
        vehicle.engine_sound()  # Polymorphic call!
        
        # Chỉ máy bay mới có thể cất cánh
        if isinstance(vehicle, Airplane):
            vehicle.take_off()
        
        print("   ✅ Sẵn sàng!")

# Chạy demo
demo_vehicle_garage()
```

## 🎨 Duck Typing - "Nếu nó kêu như vịt..."

Python có một dạng polymorphism đặc biệt gọi là **Duck Typing**:

> "Nếu nó bước như vịt và kêu như vịt, thì nó là vịt!"

```python
class Duck:
    def make_sound(self):
        print("Quạc quạc! 🦆")
    
    def swim(self):
        print("Bơi lội tài giỏi! 🏊‍♀️")

class Goose:
    def make_sound(self):
        print("Nga nga! 🪿") 
    
    def swim(self):
        print("Bơi nhanh như tên lửa! 🚀")

class RobotDuck:
    def make_sound(self):
        print("BEEP BEEP - Mô phỏng tiếng vịt! 🤖")
    
    def swim(self):
        print("Chế độ bơi lội được kích hoạt! 🤖🏊‍♀️")

# Duck Typing - không cần kiểm tra type!
def make_swimming_performance(animal):
    """Hàm này nhận bất cứ gì có thể make_sound() và swim()"""
    print(f"🏊‍♀️ Biểu diễn bơi lội:")
    animal.make_sound()   # Duck typing!
    animal.swim()   # Duck typing!
    print("-" * 30)

# Tất cả đều "như vịt" - có make_sound() và swim()
swimming_animals = [
    Duck(),
    Goose(), 
    RobotDuck()
]

print("🏊‍♀️ SHOW BIỂU DIỄN HỒ BƠI")
print("=" * 40)

for animal in swimming_animals:
    make_swimming_performance(animal)
```

## 📊 Ví Dụ Thực Tế: Hệ Thống Báo Cáo

```python
from abc import ABC, abstractmethod
from datetime import datetime
import json

class ReportBase(ABC):
    """Abstract class cho tất cả loại báo cáo"""
    
    def __init__(self, title, data):
        self.title = title
        self.data = data
        self.created_time = datetime.now()
    
    @abstractmethod
    def generate_content(self):
        """Abstract method - bắt buộc implement"""
        pass
    
    @abstractmethod
    def export_file(self, filename):
        """Abstract method cho xuất file"""
        pass
    
    def display_info(self):
        """Method chung cho tất cả báo cáo"""
        print(f"📊 Báo cáo: {self.title}")
        print(f"📅 Tạo lúc: {self.created_time.strftime('%d/%m/%Y %H:%M:%S')}")
        print(f"📈 Số dữ liệu: {len(self.data)}")

class JSONReport(ReportBase):
    """Báo cáo định dạng JSON"""
    
    def generate_content(self):
        content = {
            "title": self.title,
            "created_time": self.created_time.isoformat(),
            "data": self.data,
            "summary": self.calculate_summary()
        }
        return json.dumps(content, ensure_ascii=False, indent=2)
    
    def export_file(self, filename):
        with open(f"{filename}.json", 'w', encoding='utf-8') as f:
            f.write(self.generate_content())
        print(f"💾 Đã xuất báo cáo JSON: {filename}.json")
    
    def calculate_summary(self):
        if isinstance(self.data[0], (int, float)):
            return {
                "total": sum(self.data),
                "average": sum(self.data) / len(self.data),
                "max": max(self.data),
                "min": min(self.data)
            }
        return {"count": len(self.data)}

class CSVReport(ReportBase):
    """Báo cáo định dạng CSV"""
    
    def generate_content(self):
        lines = [f"# Báo cáo: {self.title}"]
        lines.append(f"# Tạo lúc: {self.created_time}")
        lines.append("STT,Dữ liệu")
        
        for i, item in enumerate(self.data, 1):
            lines.append(f"{i},{item}")
        
        return "\n".join(lines)
    
    def export_file(self, filename):
        with open(f"{filename}.csv", 'w', encoding='utf-8') as f:
            f.write(self.generate_content())
        print(f"📊 Đã xuất báo cáo CSV: {filename}.csv")

class HTMLReport(ReportBase):
    """Báo cáo định dạng HTML"""
    
    def generate_content(self):
        html = f"""
<!DOCTYPE html>
<html>
<head>
    <title>{self.title}</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; }}
        table {{ border-collapse: collapse; width: 100%; }}
        th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
        th {{ background-color: #4CAF50; color: white; }}
        .header {{ background-color: #f2f2f2; padding: 20px; }}
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 {self.title}</h1>
        <p><strong>Thời gian tạo:</strong> {self.created_time.strftime('%d/%m/%Y %H:%M:%S')}</p>
        <p><strong>Tổng số dữ liệu:</strong> {len(self.data)}</p>
    </div>
    
    <table>
        <tr><th>STT</th><th>Dữ Liệu</th></tr>
"""
        
        for i, item in enumerate(self.data, 1):
            html += f"        <tr><td>{i}</td><td>{item}</td></tr>\n"
        
        html += """
    </table>
</body>
</html>
"""
        return html
    
    def export_file(self, filename):
        with open(f"{filename}.html", 'w', encoding='utf-8') as f:
            f.write(self.generate_content())
        print(f"🌐 Đã xuất báo cáo HTML: {filename}.html")

# Hệ thống quản lý báo cáo với Polymorphism
class ReportManager:
    """Quản lý nhiều loại báo cáo"""
    
    def __init__(self):
        self.report_list = []
    
    def create_report(self, report_type, title, data):
        """Factory method tạo báo cáo"""
        type_map = {
            'json': JSONReport,
            'csv': CSVReport,
            'html': HTMLReport
        }
        
        if report_type.lower() in type_map:
            report = type_map[report_type.lower()](title, data)
            self.report_list.append(report)
            print(f"✅ Tạo báo cáo {report_type.upper()} thành công!")
            return report
        else:
            print(f"❌ Loại báo cáo không hỗ trợ: {report_type}")
            return None
    
    def export_all_reports(self, prefix="report"):
        """Polymorphism: Xuất tất cả báo cáo, mỗi loại một cách"""
        print(f"\n📤 XUẤT TẤT CẢ BÁO CÁO")
        print("=" * 40)
        
        for i, report in enumerate(self.report_list):
            filename = f"{prefix}_{i+1}"
            
            # Polymorphic call - mỗi class sẽ xuất theo cách riêng!
            report.display_info()
            report.export_file(filename)
            print()
    
    def display_all_content(self):
        """Hiển thị nội dung tất cả báo cáo"""
        print(f"\n👀 XEM TRƯỚC NỘI DUNG")
        print("=" * 50)
        
        for i, report in enumerate(self.report_list, 1):
            print(f"\n📋 BÁO CÁO {i}: {report.title}")
            print("-" * 30)
            
            # Polymorphic call - tạo nội dung theo format riêng!
            content = report.generate_content()
            print(content[:300] + "..." if len(content) > 300 else content)

# Demo hệ thống báo cáo
print("📊 HỆ THỐNG BÁO CÁO ĐA DẠNG")
print("=" * 50)

# Tạo dữ liệu mẫu
class_scores = [8.5, 9.0, 7.8, 6.5, 9.5, 8.2, 7.9, 8.8, 9.2, 7.5]
best_selling_products = ["Laptop", "Mouse", "Keyboard", "Monitor", "Headphone"]
monthly_revenue = [15000000, 18000000, 22000000, 19000000, 25000000, 21000000]

# Tạo hệ thống quản lý
manager = ReportManager()

# Tạo các loại báo cáo khác nhau cho cùng dữ liệu
manager.create_report("json", "Báo Cáo Điểm Số Lớp 10A", class_scores)
manager.create_report("csv", "Danh Sách Sản Phẩm Bán Chạy", best_selling_products)  
manager.create_report("html", "Báo Cáo Doanh Thu 6 Tháng", monthly_revenue)

# Hiển thị nội dung
manager.display_all_content()

# Xuất tất cả báo cáo - Polymorphism in action!
manager.export_all_reports("behitek_report")
```

## 🏆 Tóm Tắt Polymorphism

:::tip Nhớ 5 điều này về Polymorphism:
1. **Cùng Interface, Khác Implementation** - Cùng method name, khác cách thực hiện
2. **Override Methods** - Class con ghi đè method của class cha
3. **Duck Typing** - "Nếu nó có method cần thiết thì dùng được"
4. **Flexible Code** - Code linh hoạt, dễ mở rộng
5. **Real-world Applications** - Game systems, Report systems, UI frameworks
:::

### 🌟 Lợi Ích Của Polymorphism:
- 🔄 **Code Reusability** - Tái sử dụng code hiệu quả
- 🚀 **Extensibility** - Dễ dàng thêm class mới
- 🧹 **Clean Code** - Code sạch, dễ hiểu
- 🔧 **Maintainability** - Dễ bảo trì và nâng cấp
- 🎯 **Single Interface** - Một cách gọi, nhiều hành vi

**Polymorphism** là chìa khóa để viết code OOP linh hoạt và mạnh mẽ! 🎭✨

---

*💡 Tip: Polymorphism giúp bạn viết code "một lần, chạy nhiều cách" - đây là sức mạnh thực sự của OOP!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**

