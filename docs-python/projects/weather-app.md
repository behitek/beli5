# 🌤️ Weather App - Ứng dụng thời tiết thông minh

:::info
Tạo một ứng dụng thời tiết như một nhà khí tượng học mini - lấy dữ liệu từ internet và hiển thị thông tin thời tiết một cách đẹp mắt!
:::

## 🎯 Mục tiêu dự án

Xây dựng ứng dụng thời tiết với các tính năng:
- 🌡️ Hiển thị nhiệt độ hiện tại và cảm giác như
- 🌤️ Thông tin thời tiết chi tiết (độ ẩm, áp suất, gió)
- 📅 Dự báo 5 ngày tới
- 🏙️ Hỗ trợ nhiều thành phố
- 💾 Lưu danh sách thành phố yêu thích
- 🎨 Giao diện console đẹp mắt với màu sắc

## 🛠️ Chuẩn bị

### Thư viện cần thiết

```python
# Cài đặt thư viện
# pip install requests colorama

import requests
import json
from datetime import datetime, timedelta
from colorama import Fore, Back, Style, init
import os

# Khởi tạo colorama cho Windows
init(autoreset=True)
```

### Đăng ký API Key

```python
# Bước 1: Đăng ký tài khoản miễn phí tại: https://openweathermap.org/api
# Bước 2: Lấy API key từ tài khoản của bạn
# Bước 3: Thay thế API_KEY bên dưới

API_KEY = "your_api_key_here"  # 🔑 Thay bằng API key thật
BASE_URL = "https://api.openweathermap.org/data/2.5"

# Lưu ý: Để demo, chúng ta sẽ tạo dữ liệu giả
DEMO_MODE = True  # Chuyển thành False khi có API key thật
```

## 🏗️ Xây dựng ứng dụng

### 1. Class quản lý thời tiết

```python
class WeatherAPI:
    """
    Class để giao tiếp với API thời tiết
    Giống như một người phiên dịch giữa app và internet!
    """
    
    def __init__(self, api_key=None):
        self.api_key = api_key
        self.base_url = BASE_URL
        self.demo_mode = DEMO_MODE or not api_key
    
    def get_weather_data(self, city_name):
        """Lấy dữ liệu thời tiết hiện tại"""
        if self.demo_mode:
            return self._get_demo_weather(city_name)
        
        try:
            url = f"{self.base_url}/weather"
            params = {
                'q': city_name,
                'appid': self.api_key,
                'units': 'metric',
                'lang': 'vi'
            }
            
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                return response.json()
            elif response.status_code == 404:
                return {"error": f"Không tìm thấy thành phố: {city_name}"}
            else:
                return {"error": f"Lỗi API: {response.status_code}"}
                
        except requests.exceptions.RequestException as e:
            return {"error": f"Lỗi kết nối: {str(e)}"}
    
    def get_forecast_data(self, city_name, days=5):
        """Lấy dự báo thời tiết 5 ngày"""
        if self.demo_mode:
            return self._get_demo_forecast(city_name, days)
        
        try:
            url = f"{self.base_url}/forecast"
            params = {
                'q': city_name,
                'appid': self.api_key,
                'units': 'metric',
                'lang': 'vi'
            }
            
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                return response.json()
            else:
                return {"error": f"Lỗi lấy dự báo: {response.status_code}"}
                
        except requests.exceptions.RequestException as e:
            return {"error": f"Lỗi kết nối: {str(e)}"}
    
    def _get_demo_weather(self, city_name):
        """Tạo dữ liệu thời tiết demo"""
        import random
        
        weather_conditions = [
            ("clear sky", "☀️", "trời quang"),
            ("few clouds", "🌤️", "ít mây"),
            ("scattered clouds", "⛅", "mây rải rác"), 
            ("broken clouds", "☁️", "nhiều mây"),
            ("light rain", "🌦️", "mưa nhỏ"),
            ("moderate rain", "🌧️", "mưa vừa")
        ]
        
        condition = random.choice(weather_conditions)
        
        return {
            "name": city_name.title(),
            "main": {
                "temp": round(random.uniform(20, 35), 1),
                "feels_like": round(random.uniform(20, 35), 1),
                "humidity": random.randint(40, 80),
                "pressure": random.randint(1000, 1020)
            },
            "weather": [{
                "main": condition[0],
                "description": condition[2],
                "icon": condition[1]
            }],
            "wind": {
                "speed": round(random.uniform(2, 15), 1)
            },
            "sys": {
                "country": "VN"
            }
        }
    
    def _get_demo_forecast(self, city_name, days):
        """Tạo dữ liệu dự báo demo"""
        import random
        
        forecast_list = []
        base_date = datetime.now()
        
        for i in range(days):
            date = base_date + timedelta(days=i)
            temp_min = random.randint(20, 28)
            temp_max = temp_min + random.randint(5, 10)
            
            forecast_list.append({
                "dt": date.timestamp(),
                "main": {
                    "temp_min": temp_min,
                    "temp_max": temp_max
                },
                "weather": [{
                    "main": random.choice(["Clear", "Clouds", "Rain"]),
                    "description": random.choice(["trời quang", "có mây", "mưa nhỏ"])
                }]
            })
        
        return {
            "city": {"name": city_name.title()},
            "list": forecast_list
        }
```

### 2. Class hiển thị giao diện

```python
class WeatherUI:
    """
    Class quản lý giao diện người dùng
    Giống như một nghệ sĩ vẽ tranh thời tiết!
    """
    
    def __init__(self):
        self.weather_api = WeatherAPI(API_KEY)
    
    def clear_screen(self):
        """Xóa màn hình console"""
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def print_header(self):
        """In header ứng dụng"""
        print(f"{Fore.CYAN}{Style.BRIGHT}")
        print("=" * 60)
        print("🌤️  WEATHER APP - ỨNG DỤNG THỜI TIẾT THÔNG MINH  🌤️")
        print("=" * 60)
        print(f"{Style.RESET_ALL}")
    
    def print_current_weather(self, weather_data):
        """Hiển thị thời tiết hiện tại"""
        if "error" in weather_data:
            print(f"{Fore.RED}❌ {weather_data['error']}")
            return
        
        # Thông tin cơ bản
        city = weather_data["name"]
        country = weather_data["sys"].get("country", "")
        temp = weather_data["main"]["temp"]
        feels_like = weather_data["main"]["feels_like"]
        humidity = weather_data["main"]["humidity"]
        pressure = weather_data["main"]["pressure"]
        
        # Thông tin thời tiết
        weather = weather_data["weather"][0]
        description = weather["description"]
        icon = weather.get("icon", "🌤️")
        
        # Gió
        wind_speed = weather_data["wind"]["speed"]
        
        print(f"\n{Fore.GREEN}{Style.BRIGHT}📍 THỜI TIẾT HIỆN TẠI")
        print("=" * 40)
        
        # Thành phố
        print(f"{Fore.YELLOW}🏙️  Thành phố: {Style.BRIGHT}{city}")
        if country:
            print(f"🌍 Quốc gia: {country}")
        
        # Nhiệt độ
        temp_color = self._get_temp_color(temp)
        print(f"\n{temp_color}🌡️  Nhiệt độ: {Style.BRIGHT}{temp}°C")
        print(f"{temp_color}🤒 Cảm giác như: {feels_like}°C")
        
        # Thời tiết
        print(f"\n{Fore.CYAN}{icon} Thời tiết: {Style.BRIGHT}{description.title()}")
        
        # Chi tiết
        print(f"\n{Fore.MAGENTA}💧 Độ ẩm: {humidity}%")
        print(f"🌪️  Áp suất: {pressure} hPa")
        print(f"💨 Tốc độ gió: {wind_speed} m/s")
        
        print(f"{Style.RESET_ALL}")
    
    def print_forecast(self, forecast_data):
        """Hiển thị dự báo thời tiết"""
        if "error" in forecast_data:
            print(f"{Fore.RED}❌ {forecast_data['error']}")
            return
        
        city = forecast_data["city"]["name"]
        forecast_list = forecast_data["list"]
        
        print(f"\n{Fore.GREEN}{Style.BRIGHT}📅 DỰ BÁO 5 NGÀY - {city.upper()}")
        print("=" * 60)
        
        for item in forecast_list:
            # Chuyển đổi timestamp thành ngày
            date = datetime.fromtimestamp(item["dt"])
            day_name = self._get_day_name(date)
            date_str = date.strftime("%d/%m/%Y")
            
            # Nhiệt độ
            temp_min = item["main"]["temp_min"]
            temp_max = item["main"]["temp_max"]
            
            # Thời tiết
            weather_desc = item["weather"][0]["description"]
            weather_icon = self._get_weather_icon(item["weather"][0]["main"])
            
            # Màu sắc theo nhiệt độ
            temp_color = self._get_temp_color(temp_max)
            
            print(f"{Fore.YELLOW}📅 {day_name} ({date_str})")
            print(f"{temp_color}   🌡️ {temp_min}°C - {temp_max}°C")
            print(f"{Fore.CYAN}   {weather_icon} {weather_desc.title()}")
            print()
    
    def _get_temp_color(self, temp):
        """Chọn màu theo nhiệt độ"""
        if temp >= 35:
            return f"{Fore.RED}{Style.BRIGHT}"
        elif temp >= 30:
            return f"{Fore.YELLOW}{Style.BRIGHT}"
        elif temp >= 20:
            return f"{Fore.GREEN}{Style.BRIGHT}"
        else:
            return f"{Fore.CYAN}{Style.BRIGHT}"
    
    def _get_day_name(self, date):
        """Lấy tên thứ tiếng Việt"""
        days = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"]
        return days[date.weekday()]
    
    def _get_weather_icon(self, weather_main):
        """Lấy icon thời tiết"""
        icons = {
            "Clear": "☀️",
            "Clouds": "☁️", 
            "Rain": "🌧️",
            "Drizzle": "🌦️",
            "Thunderstorm": "⛈️",
            "Snow": "❄️",
            "Mist": "🌫️"
        }
        return icons.get(weather_main, "🌤️")
```

### 3. Class quản lý dữ liệu

```python
class WeatherDataManager:
    """
    Quản lý dữ liệu ứng dụng
    Giống như một thư ký ghi chép mọi thứ!
    """
    
    def __init__(self, data_file="weather_favorites.json"):
        self.data_file = data_file
        self.favorites = self.load_favorites()
        self.history = []
    
    def load_favorites(self):
        """Tải danh sách thành phố yêu thích"""
        try:
            if os.path.exists(self.data_file):
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    return data.get('favorites', [])
            return []
        except Exception as e:
            print(f"⚠️ Lỗi tải dữ liệu: {e}")
            return []
    
    def save_favorites(self):
        """Lưu danh sách yêu thích"""
        try:
            data = {
                'favorites': self.favorites,
                'last_updated': datetime.now().isoformat()
            }
            with open(self.data_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            return True
        except Exception as e:
            print(f"⚠️ Lỗi lưu dữ liệu: {e}")
            return False
    
    def add_favorite(self, city_name):
        """Thêm thành phố yêu thích"""
        city_name = city_name.title()
        if city_name not in self.favorites:
            self.favorites.append(city_name)
            if self.save_favorites():
                return True
        return False
    
    def remove_favorite(self, city_name):
        """Xóa thành phố yêu thích"""
        city_name = city_name.title()
        if city_name in self.favorites:
            self.favorites.remove(city_name)
            self.save_favorites()
            return True
        return False
    
    def get_favorites(self):
        """Lấy danh sách yêu thích"""
        return self.favorites.copy()
    
    def add_to_history(self, city_name, weather_data):
        """Thêm vào lịch sử tìm kiếm"""
        self.history.append({
            'city': city_name,
            'timestamp': datetime.now().isoformat(),
            'temp': weather_data.get('main', {}).get('temp', 0)
        })
        
        # Giữ tối đa 10 lần tìm kiếm gần nhất
        if len(self.history) > 10:
            self.history = self.history[-10:]
    
    def get_history(self):
        """Lấy lịch sử tìm kiếm"""
        return self.history.copy()
```

### 4. Ứng dụng chính

```python
class WeatherApp:
    """
    Ứng dụng thời tiết chính
    Giống như một chỉ huy điều phối tất cả!
    """
    
    def __init__(self):
        self.ui = WeatherUI()
        self.data_manager = WeatherDataManager()
        self.running = True
    
    def show_menu(self):
        """Hiển thị menu chính"""
        print(f"\n{Fore.CYAN}{Style.BRIGHT}📋 MENU CHÍNH")
        print("=" * 30)
        print(f"{Fore.WHITE}1. 🔍 Xem thời tiết thành phố")
        print("2. 📅 Xem dự báo 5 ngày")
        print("3. ⭐ Quản lý yêu thích")
        print("4. 📊 Xem lịch sử")
        print("5. ℹ️  Thông tin ứng dụng")
        print("0. 🚪 Thoát")
        print("=" * 30)
    
    def get_city_weather(self):
        """Xem thời tiết thành phố"""
        print(f"\n{Fore.YELLOW}🔍 XEM THỜI TIẾT")
        print("-" * 20)
        
        city = input("🏙️ Nhập tên thành phố: ").strip()
        if not city:
            print(f"{Fore.RED}❌ Vui lòng nhập tên thành phố!")
            return
        
        print(f"\n{Fore.CYAN}⏳ Đang lấy dữ liệu thời tiết...")
        
        weather_data = self.ui.weather_api.get_weather_data(city)
        self.ui.print_current_weather(weather_data)
        
        if "error" not in weather_data:
            self.data_manager.add_to_history(city, weather_data)
            
            # Hỏi có muốn thêm vào yêu thích không
            if city.title() not in self.data_manager.favorites:
                choice = input(f"\n💝 Thêm {city} vào yêu thích? (y/n): ")
                if choice.lower() == 'y':
                    if self.data_manager.add_favorite(city):
                        print(f"{Fore.GREEN}✅ Đã thêm vào yêu thích!")
    
    def get_city_forecast(self):
        """Xem dự báo thời tiết"""
        print(f"\n{Fore.YELLOW}📅 DỰ BÁO THỜI TIẾT")
        print("-" * 25)
        
        city = input("🏙️ Nhập tên thành phố: ").strip()
        if not city:
            print(f"{Fore.RED}❌ Vui lòng nhập tên thành phố!")
            return
        
        print(f"\n{Fore.CYAN}⏳ Đang lấy dữ liệu dự báo...")
        
        forecast_data = self.ui.weather_api.get_forecast_data(city)
        self.ui.print_forecast(forecast_data)
    
    def manage_favorites(self):
        """Quản lý thành phố yêu thích"""
        while True:
            print(f"\n{Fore.MAGENTA}{Style.BRIGHT}⭐ QUẢN LÝ YÊU THÍCH")
            print("=" * 30)
            
            favorites = self.data_manager.get_favorites()
            if favorites:
                print("📍 Thành phố yêu thích:")
                for i, city in enumerate(favorites, 1):
                    print(f"   {i}. {city}")
            else:
                print("📭 Chưa có thành phố yêu thích nào.")
            
            print(f"\n{Fore.WHITE}1. 📍 Xem thời tiết yêu thích")
            print("2. ➕ Thêm thành phố")
            print("3. ➖ Xóa thành phố")
            print("0. 🔙 Quay lại")
            
            choice = input(f"\n{Fore.CYAN}Chọn: ").strip()
            
            if choice == "1":
                self.view_favorite_weather(favorites)
            elif choice == "2":
                self.add_favorite_city()
            elif choice == "3":
                self.remove_favorite_city(favorites)
            elif choice == "0":
                break
            else:
                print(f"{Fore.RED}❌ Lựa chọn không hợp lệ!")
    
    def view_favorite_weather(self, favorites):
        """Xem thời tiết các thành phố yêu thích"""
        if not favorites:
            print(f"{Fore.YELLOW}📭 Chưa có thành phố yêu thích!")
            return
        
        print(f"\n{Fore.CYAN}⏳ Đang lấy thời tiết tất cả thành phố...")
        
        for city in favorites:
            print(f"\n{'-' * 50}")
            weather_data = self.ui.weather_api.get_weather_data(city)
            self.ui.print_current_weather(weather_data)
    
    def add_favorite_city(self):
        """Thêm thành phố yêu thích"""
        city = input(f"\n🏙️ Nhập tên thành phố muốn thêm: ").strip()
        if city:
            if self.data_manager.add_favorite(city):
                print(f"{Fore.GREEN}✅ Đã thêm {city} vào yêu thích!")
            else:
                print(f"{Fore.YELLOW}⚠️ {city} đã có trong danh sách!")
    
    def remove_favorite_city(self, favorites):
        """Xóa thành phố yêu thích"""
        if not favorites:
            print(f"{Fore.YELLOW}📭 Chưa có thành phố nào để xóa!")
            return
        
        try:
            choice = int(input(f"\n🗑️ Chọn số thứ tự để xóa (0 để hủy): "))
            if choice == 0:
                return
            elif 1 <= choice <= len(favorites):
                city = favorites[choice - 1]
                if self.data_manager.remove_favorite(city):
                    print(f"{Fore.GREEN}✅ Đã xóa {city} khỏi yêu thích!")
            else:
                print(f"{Fore.RED}❌ Số không hợp lệ!")
        except ValueError:
            print(f"{Fore.RED}❌ Vui lòng nhập số!")
    
    def show_history(self):
        """Hiển thị lịch sử tìm kiếm"""
        print(f"\n{Fore.BLUE}{Style.BRIGHT}📊 LỊCH SỬ TÌM KIẾM")
        print("=" * 40)
        
        history = self.data_manager.get_history()
        if not history:
            print("📭 Chưa có lịch sử tìm kiếm.")
            return
        
        for i, record in enumerate(reversed(history), 1):
            timestamp = datetime.fromisoformat(record['timestamp'])
            time_str = timestamp.strftime("%d/%m/%Y %H:%M")
            
            print(f"{i:2d}. 🏙️ {record['city']}")
            print(f"    ⏰ {time_str}")
            print(f"    🌡️ {record['temp']}°C")
            print()
    
    def show_app_info(self):
        """Hiển thị thông tin ứng dụng"""
        print(f"\n{Fore.GREEN}{Style.BRIGHT}ℹ️  THÔNG TIN ỨNG DỤNG")
        print("=" * 35)
        print(f"{Fore.WHITE}📱 Tên: Weather App")
        print("🏷️ Phiên bản: 1.0.0")
        print("👨‍💻 Phát triển bởi: Behitek")
        print("🎯 Mục đích: Học lập trình Python")
        print("\n🌟 Tính năng:")
        print("   ✅ Xem thời tiết hiện tại")
        print("   ✅ Dự báo 5 ngày")
        print("   ✅ Quản lý yêu thích")
        print("   ✅ Lịch sử tìm kiếm")
        print("   ✅ Giao diện màu sắc")
        
        if DEMO_MODE:
            print(f"\n{Fore.YELLOW}⚠️ Đang chạy ở chế độ DEMO")
            print("🔑 Để sử dụng dữ liệu thật, hãy:")
            print("   1. Đăng ký tại: https://openweathermap.org/api")
            print("   2. Lấy API key miễn phí")
            print("   3. Thay đổi API_KEY trong code")
            print("   4. Đặt DEMO_MODE = False")
    
    def run(self):
        """Chạy ứng dụng chính"""
        try:
            while self.running:
                self.ui.clear_screen()
                self.ui.print_header()
                self.show_menu()
                
                choice = input(f"\n{Fore.CYAN}👉 Chọn chức năng (0-5): ").strip()
                
                if choice == "1":
                    self.get_city_weather()
                elif choice == "2":
                    self.get_city_forecast()
                elif choice == "3":
                    self.manage_favorites()
                elif choice == "4":
                    self.show_history()
                elif choice == "5":
                    self.show_app_info()
                elif choice == "0":
                    print(f"\n{Fore.GREEN}👋 Cảm ơn bạn đã sử dụng Weather App!")
                    print("🌤️ Chúc bạn một ngày tốt lành!")
                    self.running = False
                else:
                    print(f"{Fore.RED}❌ Lựa chọn không hợp lệ!")
                
                if self.running:
                    input(f"\n{Fore.YELLOW}📱 Nhấn Enter để tiếp tục...")
                    
        except KeyboardInterrupt:
            print(f"\n\n{Fore.YELLOW}⚠️ Ứng dụng bị gián đoạn bởi người dùng.")
            print(f"{Fore.GREEN}👋 Tạm biệt!")
        except Exception as e:
            print(f"\n{Fore.RED}❌ Lỗi không mong muốn: {e}")
            print(f"{Fore.GREEN}👋 Ứng dụng sẽ thoát an toàn.")

# Chạy ứng dụng
if __name__ == "__main__":
    print("🌤️ Khởi động Weather App...")
    print("⚠️ Lưu ý: Đang chạy ở chế độ DEMO với dữ liệu giả")
    print("🔑 Để dùng dữ liệu thật, vui lòng đăng ký API key tại OpenWeatherMap")
    
    app = WeatherApp()
    app.run()
```

## 🎯 Kết quả và Demo

```python
# Output mẫu khi chạy ứng dụng:
"""
============================================================
🌤️  WEATHER APP - ỨNG DỤNG THỜI TIẾT THÔNG MINH  🌤️
============================================================

📋 MENU CHÍNH
==============================
1. 🔍 Xem thời tiết thành phố
2. 📅 Xem dự báo 5 ngày
3. ⭐ Quản lý yêu thích
4. 📊 Xem lịch sử
5. ℹ️  Thông tin ứng dụng
0. 🚪 Thoát
==============================

👉 Chọn chức năng (0-5): 1

🔍 XEM THỜI TIẾT
--------------------
🏙️ Nhập tên thành phố: Ho Chi Minh

⏳ Đang lấy dữ liệu thời tiết...

📍 THỜI TIẾT HIỆN TẠI
========================================
🏙️  Thành phố: Ho Chi Minh
🌍 Quốc gia: VN

🌡️  Nhiệt độ: 32.5°C
🤒 Cảm giác như: 35.2°C

🌤️ Thời tiết: Ít Mây

💧 Độ ẩm: 65%
🌪️  Áp suất: 1015 hPa
💨 Tốc độ gió: 8.5 m/s

💝 Thêm Ho Chi Minh vào yêu thích? (y/n): y
✅ Đã thêm vào yêu thích!
"""
```

## 🚀 Mở rộng và cải tiến

### 1. Thêm tính năng mới

```python
# Có thể thêm các tính năng:
class WeatherAppAdvanced(WeatherApp):
    """Phiên bản nâng cao với nhiều tính năng"""
    
    def get_weather_alerts(self, city):
        """Cảnh báo thời tiết nguy hiểm"""
        # Cảnh báo nhiệt độ cao, bão, mưa lớn...
        pass
    
    def compare_cities(self):
        """So sánh thời tiết giữa các thành phố"""
        pass
    
    def export_data(self):
        """Xuất dữ liệu ra file Excel/PDF"""
        pass
    
    def send_notifications(self):
        """Gửi thông báo email/SMS"""
        pass
```

### 2. Cải thiện giao diện

```python
# Có thể sử dụng:
# - tkinter cho GUI desktop
# - Flask/Django cho web app
# - Kivy cho mobile app
```

## 🏆 Điểm nổi bật của dự án

### Kỹ thuật được sử dụng:
- 🌐 **API Integration** - Gọi API thời tiết
- 💾 **File I/O** - Lưu trữ dữ liệu JSON
- 🎨 **Console UI** - Giao diện màu sắc với colorama
- 🏗️ **OOP Design** - Thiết kế hướng đối tượng
- 🔄 **Exception Handling** - Xử lý lỗi toàn diện
- 📊 **Data Processing** - Xử lý và hiển thị dữ liệu
- ⏰ **DateTime Handling** - Làm việc với thời gian

### Tính năng nổi bật:
- ✅ Giao diện đẹp mắt với màu sắc
- ✅ Hỗ trợ chế độ demo và thật
- ✅ Quản lý danh sách yêu thích
- ✅ Lịch sử tìm kiếm
- ✅ Dự báo nhiều ngày
- ✅ Xử lý lỗi thông minh
- ✅ Dữ liệu persistent

## 🎯 Bài học rút ra

:::tip Những điều học được:
1. **API Integration** - Cách gọi và xử lý API
2. **Error Handling** - Xử lý lỗi mạng và dữ liệu
3. **Data Persistence** - Lưu trữ dữ liệu người dùng
4. **User Experience** - Thiết kế giao diện thân thiện
5. **Code Organization** - Tổ chức code theo OOP
:::

**Bước tiếp theo**: Thử tạo [Quiz Game](./quiz-game.md) để học cách xây dựng game đơn giản!

---
*💡 Tip: Weather App là dự án tuyệt vời để học API, JSON, và UI design!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
