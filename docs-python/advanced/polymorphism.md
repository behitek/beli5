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
    
    B --> B1[bay(), đấm()]
    C --> C1[cai_tri(), ra_lenh()]
    D --> D1[ban_hang(), quang_cao()]
```

## 🐾 Ví Dụ Cơ Bản: Động Vật

```python
class DongVat:
    """Class cơ sở cho tất cả động vật"""
    
    def __init__(self, ten, loai):
        self.ten = ten
        self.loai = loai
    
    def keu(self):
        """Phương thức base - sẽ được override"""
        print(f"{self.ten} phát ra âm thanh")
    
    def di_chuyen(self):
        """Phương thức chung"""
        print(f"{self.ten} đang di chuyển")

class Cho(DongVat):
    """Class chó kế thừa từ DongVat"""
    
    def __init__(self, ten):
        super().__init__(ten, "Chó")
    
    def keu(self):
        """Override - Chó kêu khác"""
        print(f"{self.ten}: Gâu gâu! 🐕")
    
    def di_chuyen(self):
        print(f"{self.ten} chạy bằng 4 chân 🏃‍♂️")

class Meo(DongVat):
    """Class mèo"""
    
    def __init__(self, ten):
        super().__init__(ten, "Mèo")
    
    def keu(self):
        print(f"{self.ten}: Meo meo! 🐱")
    
    def di_chuyen(self):
        print(f"{self.ten} đi nhẹ nhàng, thầm lặng 🥷")

class Chim(DongVat):
    """Class chim"""
    
    def __init__(self, ten):
        super().__init__(ten, "Chim")
    
    def keu(self):
        print(f"{self.ten}: Chip chip! 🐦")
    
    def di_chuyen(self):
        print(f"{self.ten} bay lên trời cao 🕊️")

# Đây là POLYMORPHISM!
def cho_dong_vat_bieu_dien(dong_vat):
    """Hàm này nhận bất kỳ loại động vật nào"""
    print(f"🎪 Mời {dong_vat.ten} ({dong_vat.loai}) biểu diễn:")
    dong_vat.keu()        # Polymorphic call
    dong_vat.di_chuyen()  # Polymorphic call
    print("-" * 40)

# Demo polymorphism
print("🎪 BUỔI BIỂU DIỄN ĐỘNG VẬT")
print("=" * 50)

# Tạo danh sách các động vật khác nhau
dong_vat_list = [
    Cho("Vàng"),
    Meo("Mun"),
    Chim("Pi"),
    Cho("Lucky"),
    Meo("Kitty")
]

# Polymorphism: Cùng một hàm, nhưng hành vi khác nhau!
for dong_vat in dong_vat_list:
    cho_dong_vat_bieu_dien(dong_vat)
```

## 🎮 Ví Dụ Game: Nhân Vật RPG

```python
from abc import ABC, abstractmethod
import random

class NhanVat(ABC):
    """Abstract class cho tất cả nhân vật"""
    
    def __init__(self, ten, hp, mp):
        self.ten = ten
        self.hp = hp
        self.hp_max = hp
        self.mp = mp
        self.mp_max = mp
        self.level = 1
    
    @abstractmethod
    def tan_cong(self, muc_tieu):
        """Phương thức trừu tượng - bắt buộc implement"""
        pass
    
    @abstractmethod
    def ky_nang_dac_biet(self):
        """Kỹ năng đặc biệt của từng class"""
        pass
    
    def nhan_sat_thuong(self, sat_thuong):
        """Phương thức chung cho tất cả nhân vật"""
        self.hp = max(0, self.hp - sat_thuong)
        if self.hp == 0:
            print(f"💀 {self.ten} đã bị hạ gục!")
        else:
            print(f"🩹 {self.ten} mất {sat_thuong} HP, còn {self.hp}/{self.hp_max}")
    
    def hoi_phuc(self, amount):
        """Hồi phục HP"""
        self.hp = min(self.hp_max, self.hp + amount)
        print(f"💚 {self.ten} hồi {amount} HP, hiện tại: {self.hp}/{self.hp_max}")

class ChienBinh(NhanVat):
    """Class Chiến Binh - Tank"""
    
    def __init__(self, ten):
        super().__init__(ten, hp=120, mp=30)
        self.giap = 15
        self.sat_thuong_vat_ly = 25
    
    def tan_cong(self, muc_tieu):
        """Tấn công vật lý mạnh"""
        sat_thuong = self.sat_thuong_vat_ly + random.randint(-5, 10)
        print(f"⚔️ {self.ten} chém {muc_tieu.ten} gây {sat_thuong} sát thương!")
        muc_tieu.nhan_sat_thuong(sat_thuong)
        return sat_thuong
    
    def ky_nang_dac_biet(self):
        """Kỹ năng: Shield Bash"""
        if self.mp >= 15:
            self.mp -= 15
            sat_thuong = self.sat_thuong_vat_ly * 2
            print(f"🛡️ {self.ten} dùng Shield Bash!")
            return sat_thuong
        else:
            print(f"❌ {self.ten} không đủ MP!")
            return 0
    
    def phong_thu(self):
        """Kỹ năng đặc biệt của chiến binh"""
        print(f"🛡️ {self.ten} tăng cường phòng thủ!")
        self.giap += 5

class PhapSu(NhanVat):
    """Class Pháp Sư - DPS Magic"""
    
    def __init__(self, ten):
        super().__init__(ten, hp=80, mp=100)
        self.suc_manh_phep = 35
    
    def tan_cong(self, muc_tieu):
        """Tấn công phép thuật"""
        if self.mp >= 10:
            self.mp -= 10
            sat_thuong = self.suc_manh_phep + random.randint(-8, 15)
            print(f"🔥 {self.ten} dùng phép lửa tấn công {muc_tieu.ten} gây {sat_thuong} sát thương!")
            muc_tieu.nhan_sat_thuong(sat_thuong)
            return sat_thuong
        else:
            # Tấn công vật lý yếu
            sat_thuong = 8 + random.randint(-2, 4)
            print(f"🥄 {self.ten} dùng gậy đánh {muc_tieu.ten} gây {sat_thuong} sát thương!")
            muc_tieu.nhan_sat_thuong(sat_thuong)
            return sat_thuong
    
    def ky_nang_dac_biet(self):
        """Kỹ năng: Fireball"""
        if self.mp >= 25:
            self.mp -= 25
            sat_thuong = self.suc_manh_phep * 2
            print(f"🔥💥 {self.ten} dùng Fireball cực mạnh!")
            return sat_thuong
        else:
            print(f"❌ {self.ten} không đủ MP!")
            return 0

class CungThu(NhanVat):
    """Class Cung Thủ - DPS Range"""
    
    def __init__(self, ten):
        super().__init__(ten, hp=90, mp=50)
        self.do_chinh_xac = 80  # %
        self.sat_thuong_cung = 30
    
    def tan_cong(self, muc_tieu):
        """Tấn công tầm xa"""
        # Kiểm tra độ chính xác
        if random.randint(1, 100) <= self.do_chinh_xac:
            sat_thuong = self.sat_thuong_cung + random.randint(-5, 12)
            print(f"🏹 {self.ten} bắn trúng {muc_tieu.ten} gây {sat_thuong} sát thương!")
            muc_tieu.nhan_sat_thuong(sat_thuong)
            return sat_thuong
        else:
            print(f"🏹💨 {self.ten} bắn trượt {muc_tieu.ten}!")
            return 0
    
    def ky_nang_dac_biet(self):
        """Kỹ năng: Multi Shot"""
        if self.mp >= 20:
            self.mp -= 20
            print(f"🏹🏹🏹 {self.ten} dùng Multi Shot!")
            # Bắn 3 mũi tên
            tong_sat_thuong = 0
            for i in range(3):
                if random.randint(1, 100) <= 90:  # Tăng độ chính xác
                    sat_thuong = self.sat_thuong_cung + random.randint(-3, 8)
                    tong_sat_thuong += sat_thuong
                    print(f"  🏹 Mũi tên {i+1}: {sat_thuong} sát thương!")
            return tong_sat_thuong
        else:
            print(f"❌ {self.ten} không đủ MP!")
            return 0

class ThayThuoc(NhanVat):
    """Class Thầy Thuốc - Healer"""
    
    def __init__(self, ten):
        super().__init__(ten, hp=100, mp=120)
        self.suc_manh_hoi_phuc = 40
    
    def tan_cong(self, muc_tieu):
        """Tấn công yếu"""
        sat_thuong = 12 + random.randint(-3, 6)
        print(f"🔨 {self.ten} đánh {muc_tieu.ten} bằng búa nhỏ gây {sat_thuong} sát thương!")
        muc_tieu.nhan_sat_thuong(sat_thuong)
        return sat_thuong
    
    def ky_nang_dac_biet(self):
        """Kỹ năng: Heal"""
        if self.mp >= 15:
            self.mp -= 15
            hoi_phuc = self.suc_manh_hoi_phuc + random.randint(-5, 10)
            print(f"💚✨ {self.ten} dùng phép hồi phục!")
            return hoi_phuc
        else:
            print(f"❌ {self.ten} không đủ MP!")
            return 0
    
    def chua_lanh_dong_minh(self, dong_minh):
        """Chữa lành cho đồng minh"""
        if self.mp >= 15:
            self.mp -= 15
            hoi_phuc = self.suc_manh_hoi_phuc + random.randint(-5, 10)
            print(f"💚 {self.ten} chữa lành cho {dong_minh.ten}!")
            dong_minh.hoi_phuc(hoi_phuc)
        else:
            print(f"❌ {self.ten} không đủ MP!")

# Game Combat System với Polymorphism
class GameCombat:
    """Hệ thống chiến đấu game"""
    
    def __init__(self):
        self.party = []  # Nhóm nhân vật
        self.enemies = []  # Kẻ thù
    
    def them_nhan_vat(self, nhan_vat):
        """Thêm nhân vật vào party"""
        self.party.append(nhan_vat)
        print(f"🎮 {nhan_vat.ten} ({nhan_vat.__class__.__name__}) gia nhập party!")
    
    def tao_ke_thu(self):
        """Tạo kẻ thù ngẫu nhiên"""
        ke_thu_types = [ChienBinh, PhapSu, CungThu]
        ke_thu_names = ["Orc Tối", "Ma Thuật Sư", "Cung Thủ Bóng Tối"]
        
        for i in range(2):
            ke_thu_class = random.choice(ke_thu_types)
            ten = f"{random.choice(ke_thu_names)} #{i+1}"
            ke_thu = ke_thu_class(ten)
            self.enemies.append(ke_thu)
            print(f"👹 {ten} xuất hiện!")
    
    def chien_dau_mot_luot(self):
        """Một lượt chiến đấu - Demo Polymorphism"""
        print(f"\n⚔️ LƯỢT CHIẾN ĐẤU")
        print("=" * 40)
        
        # Nhân vật tấn công (Polymorphism!)
        for nhan_vat in self.party:
            if nhan_vat.hp > 0 and self.enemies:
                muc_tieu = random.choice([e for e in self.enemies if e.hp > 0])
                if muc_tieu:
                    # Tất cả đều gọi tan_cong(), nhưng mỗi class thực hiện khác nhau!
                    nhan_vat.tan_cong(muc_tieu)
                    
                    # Loại bỏ kẻ thù đã chết
                    self.enemies = [e for e in self.enemies if e.hp > 0]
        
        # Kẻ thù phản công
        for ke_thu in self.enemies:
            if ke_thu.hp > 0 and self.party:
                muc_tieu = random.choice([p for p in self.party if p.hp > 0])
                if muc_tieu:
                    ke_thu.tan_cong(muc_tieu)
        
        # Loại bỏ nhân vật đã chết
        self.party = [p for p in self.party if p.hp > 0]
    
    def kiem_tra_ket_thuc(self):
        """Kiểm tra game kết thúc chưa"""
        if not self.party:
            print("💀 THUA CUỘC! Tất cả nhân vật đã bị hạ gục!")
            return True
        elif not self.enemies:
            print("🎉 CHIẾN THẮNG! Đã tiêu diệt tất cả kẻ thù!")
            return True
        return False
    
    def bat_dau_game(self):
        """Bắt đầu game"""
        print("🎮 BẮT ĐẦU GAME RPG!")
        print("=" * 50)
        
        # Tạo party
        party_members = [
            ChienBinh("Arthur"),
            PhapSu("Merlin"), 
            CungThu("Legolas"),
            ThayThuoc("Gandalf")
        ]
        
        for member in party_members:
            self.them_nhan_vat(member)
        
        # Tạo kẻ thù
        self.tao_ke_thu()
        
        # Combat loop
        luot = 1
        while not self.kiem_tra_ket_thuc() and luot <= 10:
            print(f"\n🔄 LƯỢT {luot}")
            self.chien_dau_mot_luot()
            luot += 1
            
            if luot <= 10 and not self.kiem_tra_ket_thuc():
                input("\nNhấn Enter để tiếp tục lượt tiếp theo...")

# Chạy demo game
print("🎮 DEMO POLYMORPHISM TRONG GAME RPG")
print("=" * 50)

game = GameCombat()
game.bat_dau_game()
```

## 🚗 Polymorphism với Phương Tiện

```python
class PhuongTien:
    """Base class cho phương tiện"""
    
    def __init__(self, ten, toc_do_toi_da):
        self.ten = ten
        self.toc_do_toi_da = toc_do_toi_da
        self.toc_do_hien_tai = 0
    
    def khoi_dong(self):
        print(f"🔧 {self.ten} đang khởi động...")
    
    def tang_toc(self, muc_tang):
        self.toc_do_hien_tai = min(
            self.toc_do_toi_da, 
            self.toc_do_hien_tai + muc_tang
        )
    
    def giam_toc(self, muc_giam):
        self.toc_do_hien_tai = max(0, self.toc_do_hien_tai - muc_giam)
    
    def tieng_dong_co(self):
        """Method sẽ được override - Polymorphic!"""
        print(f"🔊 {self.ten}: Âm thanh động cơ chung chung...")

class XeMay(PhuongTien):
    def __init__(self, ten):
        super().__init__(ten, 120)
    
    def tieng_dong_co(self):
        print(f"🏍️ {self.ten}: Brrrr... brrrr... (tiếng xe máy)")
    
    def khoi_dong(self):
        super().khoi_dong()
        print(f"   🔑 Xoay chìa khóa xe máy...")
        print(f"   ⚡ Đá khởi động...")

class XeHoi(PhuongTien):
    def __init__(self, ten):
        super().__init__(ten, 200)
    
    def tieng_dong_co(self):
        print(f"🚗 {self.ten}: Vroom... vroom... (tiếng xe hơi)")
    
    def khoi_dong(self):
        super().khoi_dong()
        print(f"   🔑 Nhấn nút start...")
        print(f"   💺 Điều chỉnh ghế ngồi...")

class XeTai(PhuongTien):
    def __init__(self, ten):
        super().__init__(ten, 90)
    
    def tieng_dong_co(self):
        print(f"🚛 {self.ten}: VROOOOOM... (tiếng xe tải to lớn)")
    
    def khoi_dong(self):
        super().khoi_dong()
        print(f"   🚛 Kiểm tra hàng hóa...")
        print(f"   📋 Xem lộ trình giao hàng...")

class MayBay(PhuongTien):
    def __init__(self, ten):
        super().__init__(ten, 900)
    
    def tieng_dong_co(self):
        print(f"✈️ {self.ten}: Whoooosh... (tiếng máy bay)")
    
    def khoi_dong(self):
        super().khoi_dong()
        print(f"   ✈️ Kiểm tra hệ thống bay...")
        print(f"   📡 Liên hệ tháp điều khiển...")
    
    def cat_canh(self):
        print(f"🛫 {self.ten} đang cất cánh!")

# Demo Polymorphism với collection
def demo_bai_xe():
    """Demo quản lý bãi xe với polymorphism"""
    print("🅿️ QUẢN LÝ BÃI XE ĐA DẠNG")
    print("=" * 40)
    
    # Tạo danh sách các phương tiện khác nhau
    phuong_tien_list = [
        XeMay("Honda Winner"),
        XeHoi("Toyota Camry"),
        XeTai("Hyundai Porter"),
        MayBay("Boeing 747"),
        XeMay("Yamaha Exciter"),
        XeHoi("Mercedes C300")
    ]
    
    print(f"🚗 Có {len(phuong_tien_list)} phương tiện trong bãi:")
    
    for i, xe in enumerate(phuong_tien_list, 1):
        print(f"\n{i}. {xe.ten} ({xe.__class__.__name__})")
        print("   🔧 Khởi động:")
        xe.khoi_dong()
        
        print("   🔊 Âm thanh:")
        xe.tieng_dong_co()  # Polymorphic call!
        
        # Chỉ máy bay mới có thể cất cánh
        if isinstance(xe, MayBay):
            xe.cat_canh()
        
        print("   ✅ Sẵn sàng!")

# Chạy demo
demo_bai_xe()
```

## 🎨 Duck Typing - "Nếu nó kêu như vịt..."

Python có một dạng polymorphism đặc biệt gọi là **Duck Typing**:

> "Nếu nó bước như vịt và kêu như vịt, thì nó là vịt!"

```python
class Vit:
    def keu(self):
        print("Quạc quạc! 🦆")
    
    def boi(self):
        print("Bơi lội tài giỏi! 🏊‍♀️")

class Ngan:
    def keu(self):
        print("Nga nga! 🪿") 
    
    def boi(self):
        print("Bơi nhanh như tên lửa! 🚀")

class RobotVit:
    def keu(self):
        print("BEEP BEEP - Mô phỏng tiếng vịt! 🤖")
    
    def boi(self):
        print("Chế độ bơi lội được kích hoạt! 🤖🏊‍♀️")

# Duck Typing - không cần kiểm tra type!
def cho_dong_vat_bieu_dien_ho_boi(dong_vat):
    """Hàm này nhận bất cứ gì có thể kêu() và boi()"""
    print(f"🏊‍♀️ Biểu diễn bơi lội:")
    dong_vat.keu()   # Duck typing!
    dong_vat.boi()   # Duck typing!
    print("-" * 30)

# Tất cả đều "như vịt" - có keu() và boi()
dong_vat_ho_boi = [
    Vit(),
    Ngan(), 
    RobotVit()
]

print("🏊‍♀️ SHOW BIỂU DIỄN HỒ BƠI")
print("=" * 40)

for dong_vat in dong_vat_ho_boi:
    cho_dong_vat_bieu_dien_ho_boi(dong_vat)
```

## 📊 Ví Dụ Thực Tế: Hệ Thống Báo Cáo

```python
from abc import ABC, abstractmethod
from datetime import datetime
import json

class BaoCaoBase(ABC):
    """Abstract class cho tất cả loại báo cáo"""
    
    def __init__(self, tieu_de, du_lieu):
        self.tieu_de = tieu_de
        self.du_lieu = du_lieu
        self.thoi_gian_tao = datetime.now()
    
    @abstractmethod
    def tao_noi_dung(self):
        """Abstract method - bắt buộc implement"""
        pass
    
    @abstractmethod
    def xuat_file(self, ten_file):
        """Abstract method cho xuất file"""
        pass
    
    def hien_thi_thong_tin(self):
        """Method chung cho tất cả báo cáo"""
        print(f"📊 Báo cáo: {self.tieu_de}")
        print(f"📅 Tạo lúc: {self.thoi_gian_tao.strftime('%d/%m/%Y %H:%M:%S')}")
        print(f"📈 Số dữ liệu: {len(self.du_lieu)}")

class BaoCaoJSON(BaoCaoBase):
    """Báo cáo định dạng JSON"""
    
    def tao_noi_dung(self):
        noi_dung = {
            "tieu_de": self.tieu_de,
            "thoi_gian": self.thoi_gian_tao.isoformat(),
            "du_lieu": self.du_lieu,
            "tong_ket": self.tinh_tong_ket()
        }
        return json.dumps(noi_dung, ensure_ascii=False, indent=2)
    
    def xuat_file(self, ten_file):
        with open(f"{ten_file}.json", 'w', encoding='utf-8') as f:
            f.write(self.tao_noi_dung())
        print(f"💾 Đã xuất báo cáo JSON: {ten_file}.json")
    
    def tinh_tong_ket(self):
        if isinstance(self.du_lieu[0], (int, float)):
            return {
                "tong": sum(self.du_lieu),
                "trung_binh": sum(self.du_lieu) / len(self.du_lieu),
                "lon_nhat": max(self.du_lieu),
                "nho_nhat": min(self.du_lieu)
            }
        return {"so_luong": len(self.du_lieu)}

class BaoCaoCSV(BaoCaoBase):
    """Báo cáo định dạng CSV"""
    
    def tao_noi_dung(self):
        lines = [f"# Báo cáo: {self.tieu_de}"]
        lines.append(f"# Tạo lúc: {self.thoi_gian_tao}")
        lines.append("STT,Dữ liệu")
        
        for i, item in enumerate(self.du_lieu, 1):
            lines.append(f"{i},{item}")
        
        return "\n".join(lines)
    
    def xuat_file(self, ten_file):
        with open(f"{ten_file}.csv", 'w', encoding='utf-8') as f:
            f.write(self.tao_noi_dung())
        print(f"📊 Đã xuất báo cáo CSV: {ten_file}.csv")

class BaoCaoHTML(BaoCaoBase):
    """Báo cáo định dạng HTML"""
    
    def tao_noi_dung(self):
        html = f"""
<!DOCTYPE html>
<html>
<head>
    <title>{self.tieu_de}</title>
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
        <h1>📊 {self.tieu_de}</h1>
        <p><strong>Thời gian tạo:</strong> {self.thoi_gian_tao.strftime('%d/%m/%Y %H:%M:%S')}</p>
        <p><strong>Tổng số dữ liệu:</strong> {len(self.du_lieu)}</p>
    </div>
    
    <table>
        <tr><th>STT</th><th>Dữ Liệu</th></tr>
"""
        
        for i, item in enumerate(self.du_lieu, 1):
            html += f"        <tr><td>{i}</td><td>{item}</td></tr>\n"
        
        html += """
    </table>
</body>
</html>
"""
        return html
    
    def xuat_file(self, ten_file):
        with open(f"{ten_file}.html", 'w', encoding='utf-8') as f:
            f.write(self.tao_noi_dung())
        print(f"🌐 Đã xuất báo cáo HTML: {ten_file}.html")

# Hệ thống quản lý báo cáo với Polymorphism
class QuanLyBaoCao:
    """Quản lý nhiều loại báo cáo"""
    
    def __init__(self):
        self.danh_sach_bao_cao = []
    
    def tao_bao_cao(self, loai_bao_cao, tieu_de, du_lieu):
        """Factory method tạo báo cáo"""
        loai_map = {
            'json': BaoCaoJSON,
            'csv': BaoCaoCSV,
            'html': BaoCaoHTML
        }
        
        if loai_bao_cao.lower() in loai_map:
            bao_cao = loai_map[loai_bao_cao.lower()](tieu_de, du_lieu)
            self.danh_sach_bao_cao.append(bao_cao)
            print(f"✅ Tạo báo cáo {loai_bao_cao.upper()} thành công!")
            return bao_cao
        else:
            print(f"❌ Loại báo cáo không hỗ trợ: {loai_bao_cao}")
            return None
    
    def xuat_tat_ca_bao_cao(self, prefix="report"):
        """Polymorphism: Xuất tất cả báo cáo, mỗi loại một cách"""
        print(f"\n📤 XUẤT TẤT CẢ BÁO CÁO")
        print("=" * 40)
        
        for i, bao_cao in enumerate(self.danh_sach_bao_cao):
            ten_file = f"{prefix}_{i+1}"
            
            # Polymorphic call - mỗi class sẽ xuất theo cách riêng!
            bao_cao.hien_thi_thong_tin()
            bao_cao.xuat_file(ten_file)
            print()
    
    def hien_thi_tat_ca_noi_dung(self):
        """Hiển thị nội dung tất cả báo cáo"""
        print(f"\n👀 XEM TRƯỚC NỘI DUNG")
        print("=" * 50)
        
        for i, bao_cao in enumerate(self.danh_sach_bao_cao, 1):
            print(f"\n📋 BÁO CÁO {i}: {bao_cao.tieu_de}")
            print("-" * 30)
            
            # Polymorphic call - tạo nội dung theo format riêng!
            noi_dung = bao_cao.tao_noi_dung()
            print(noi_dung[:300] + "..." if len(noi_dung) > 300 else noi_dung)

# Demo hệ thống báo cáo
print("📊 HỆ THỐNG BÁO CÁO ĐA DẠNG")
print("=" * 50)

# Tạo dữ liệu mẫu
diem_so_lop = [8.5, 9.0, 7.8, 6.5, 9.5, 8.2, 7.9, 8.8, 9.2, 7.5]
san_pham_ban = ["Laptop", "Mouse", "Keyboard", "Monitor", "Headphone"]
doanh_thu_thang = [15000000, 18000000, 22000000, 19000000, 25000000, 21000000]

# Tạo hệ thống quản lý
quan_ly = QuanLyBaoCao()

# Tạo các loại báo cáo khác nhau cho cùng dữ liệu
quan_ly.tao_bao_cao("json", "Báo Cáo Điểm Số Lớp 10A", diem_so_lop)
quan_ly.tao_bao_cao("csv", "Danh Sách Sản Phẩm Bán Chạy", san_pham_ban)  
quan_ly.tao_bao_cao("html", "Báo Cáo Doanh Thu 6 Tháng", doanh_thu_thang)

# Hiển thị nội dung
quan_ly.hien_thi_tat_ca_noi_dung()

# Xuất tất cả báo cáo - Polymorphism in action!
quan_ly.xuat_tat_ca_bao_cao("behitek_report")
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
