# 📁 File Organizer - Trình tự tự động sắp xếp file

:::info
Tạo một trình sắp xếp file tự động giống như một người quản gia thông minh - tự động dọn dẹp và sắp xếp file theo loại một cách khoa học!
:::

## 🎯 Mục tiêu dự án

Xây dựng ứng dụng tự động sắp xếp file với các tính năng:
- 📂 Phân loại file theo định dạng (ảnh, video, tài liệu, âm thanh...)
- 🗂️ Tạo thư mục tự động theo loại file
- 🔄 Theo dõi thư mục và sắp xếp liên tục
- 📊 Thống kê file đã sắp xếp
- ⚙️ Cài đặt quy tắc tùy chỉnh
- 🛡️ An toàn với backup và undo
- 📝 Lưu log hoạt động chi tiết

## 🛠️ Chuẩn bị

### Thư viện cần thiết

```python
import os
import shutil
import json
from pathlib import Path
from datetime import datetime
import time
import threading
from collections import defaultdict, Counter
from colorama import Fore, Back, Style, init
import hashlib

# Khởi tạo colorama
init(autoreset=True)
```

## 🏗️ Xây dựng ứng dụng

### 1. Class FileType - Phân loại file

```python
class FileTypeManager:
    """
    Quản lý phân loại file
    Giống như một chuyên gia phân loại thư viện!
    """
    
    def __init__(self):
        self.file_categories = {
            'images': {
                'extensions': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.ico', '.tiff'],
                'folder': 'Images',
                'icon': '🖼️'
            },
            'videos': {
                'extensions': ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm', '.m4v'],
                'folder': 'Videos', 
                'icon': '🎥'
            },
            'audio': {
                'extensions': ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma', '.m4a'],
                'folder': 'Audio',
                'icon': '🎵'
            },
            'documents': {
                'extensions': ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.odt', '.pages'],
                'folder': 'Documents',
                'icon': '📄'
            },
            'spreadsheets': {
                'extensions': ['.xls', '.xlsx', '.csv', '.ods', '.numbers'],
                'folder': 'Spreadsheets',
                'icon': '📊'
            },
            'presentations': {
                'extensions': ['.ppt', '.pptx', '.odp', '.key'],
                'folder': 'Presentations',
                'icon': '📽️'
            },
            'archives': {
                'extensions': ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2'],
                'folder': 'Archives',
                'icon': '🗜️'
            },
            'code': {
                'extensions': ['.py', '.js', '.html', '.css', '.cpp', '.java', '.php', '.rb', '.go'],
                'folder': 'Code',
                'icon': '💻'
            },
            'executables': {
                'extensions': ['.exe', '.msi', '.dmg', '.pkg', '.deb', '.rpm', '.appimage'],
                'folder': 'Programs',
                'icon': '⚙️'
            },
            'fonts': {
                'extensions': ['.ttf', '.otf', '.woff', '.woff2', '.eot'],
                'folder': 'Fonts',
                'icon': '🔤'
            }
        }
    
    def get_file_category(self, file_path):
        """Xác định loại file từ đường dẫn"""
        file_extension = Path(file_path).suffix.lower()
        
        for category, info in self.file_categories.items():
            if file_extension in info['extensions']:
                return category, info
        
        # Nếu không thuộc loại nào
        return 'others', {
            'extensions': [],
            'folder': 'Others',
            'icon': '📦'
        }
    
    def add_custom_rule(self, category, extensions, folder_name, icon='📁'):
        """Thêm quy tắc phân loại tùy chỉnh"""
        self.file_categories[category] = {
            'extensions': extensions,
            'folder': folder_name,
            'icon': icon
        }
    
    def get_all_categories(self):
        """Lấy tất cả loại file"""
        return self.file_categories
```

### 2. Class FileOrganizer - Trình sắp xếp chính

```python
class FileOrganizer:
    """
    Trình sắp xếp file chính
    Giống như một robot dọn dẹp thông minh!
    """
    
    def __init__(self, source_directory, organized_directory=None):
        self.source_dir = Path(source_directory)
        self.organized_dir = Path(organized_directory) if organized_directory else self.source_dir / "Organized"
        
        self.file_type_manager = FileTypeManager()
        self.statistics = defaultdict(int)
        self.moved_files = []
        self.errors = []
        self.backup_info = {}
        
        # Tạo thư mục đích nếu chưa có
        self.organized_dir.mkdir(exist_ok=True)
    
    def scan_directory(self, show_progress=True):
        """Quét thư mục và phân tích file"""
        print(f"\n{Fore.CYAN}🔍 Đang quét thư mục: {self.source_dir}")
        print("-" * 50)
        
        all_files = []
        file_stats = defaultdict(list)
        
        # Duyệt tất cả file trong thư mục
        for file_path in self.source_dir.rglob('*'):
            if file_path.is_file() and not self._should_skip_file(file_path):
                all_files.append(file_path)
                
                # Phân loại file
                category, info = self.file_type_manager.get_file_category(file_path)
                file_stats[category].append(file_path)
        
        if show_progress:
            print(f"📊 Tìm thấy {len(all_files)} file:")
            for category, files in file_stats.items():
                info = self.file_type_manager.file_categories.get(category, {'icon': '📁', 'folder': category})
                print(f"   {info['icon']} {info['folder']}: {len(files)} file")
        
        return all_files, file_stats
    
    def _should_skip_file(self, file_path):
        """Kiểm tra file có nên bỏ qua không"""
        # Bỏ qua file ẩn
        if file_path.name.startswith('.'):
            return True
        
        # Bỏ qua file hệ thống
        system_files = ['Thumbs.db', 'Desktop.ini', '.DS_Store']
        if file_path.name in system_files:
            return True
        
        # Bỏ qua file trong thư mục đích
        try:
            file_path.relative_to(self.organized_dir)
            return True
        except ValueError:
            pass
        
        return False
    
    def organize_files(self, file_list=None, create_backup=True):
        """Sắp xếp file theo loại"""
        if file_list is None:
            file_list, _ = self.scan_directory(show_progress=False)
        
        print(f"\n{Fore.GREEN}📂 BẮT ĐẦU SẮP XẾP FILE")
        print("=" * 50)
        
        if create_backup:
            self._create_backup_info()
        
        success_count = 0
        
        for file_path in file_list:
            try:
                if self._organize_single_file(file_path):
                    success_count += 1
            except Exception as e:
                error_msg = f"Lỗi khi di chuyển {file_path.name}: {str(e)}"
                self.errors.append(error_msg)
                print(f"{Fore.RED}❌ {error_msg}")
        
        print(f"\n{Fore.GREEN}✅ Hoàn thành!")
        print(f"📊 Đã sắp xếp: {success_count}/{len(file_list)} file")
        
        if self.errors:
            print(f"{Fore.YELLOW}⚠️ Có {len(self.errors)} lỗi")
        
        self._update_statistics()
        return success_count
    
    def _organize_single_file(self, file_path):
        """Sắp xếp một file"""
        category, info = self.file_type_manager.get_file_category(file_path)
        
        # Tạo thư mục đích
        dest_folder = self.organized_dir / info['folder']
        dest_folder.mkdir(exist_ok=True)
        
        # Xử lý trùng tên file
        dest_path = self._get_unique_filename(dest_folder / file_path.name)
        
        # Di chuyển file
        shutil.move(str(file_path), str(dest_path))
        
        # Ghi log
        move_info = {
            'source': str(file_path),
            'destination': str(dest_path),
            'category': category,
            'timestamp': datetime.now().isoformat(),
            'size': dest_path.stat().st_size
        }
        self.moved_files.append(move_info)
        
        print(f"{info['icon']} {file_path.name} → {info['folder']}/")
        return True
    
    def _get_unique_filename(self, dest_path):
        """Tạo tên file duy nhất nếu bị trùng"""
        if not dest_path.exists():
            return dest_path
        
        base_name = dest_path.stem
        extension = dest_path.suffix
        counter = 1
        
        while True:
            new_name = f"{base_name}_{counter}{extension}"
            new_path = dest_path.parent / new_name
            if not new_path.exists():
                return new_path
            counter += 1
    
    def _create_backup_info(self):
        """Tạo thông tin backup để có thể undo"""
        backup_file = self.organized_dir / "backup_info.json"
        
        self.backup_info = {
            'timestamp': datetime.now().isoformat(),
            'source_directory': str(self.source_dir),
            'organized_directory': str(self.organized_dir),
            'moved_files': []
        }
        
        with open(backup_file, 'w', encoding='utf-8') as f:
            json.dump(self.backup_info, f, ensure_ascii=False, indent=2)
    
    def _update_statistics(self):
        """Cập nhật thống kê"""
        for move_info in self.moved_files:
            self.statistics[move_info['category']] += 1
            self.statistics['total_size'] += move_info['size']
            self.statistics['total_files'] += 1
    
    def undo_organization(self):
        """Hoàn tác việc sắp xếp"""
        backup_file = self.organized_dir / "backup_info.json"
        
        if not backup_file.exists():
            print(f"{Fore.RED}❌ Không tìm thấy thông tin backup!")
            return False
        
        try:
            with open(backup_file, 'r', encoding='utf-8') as f:
                backup_data = json.load(f)
            
            print(f"\n{Fore.YELLOW}🔄 HOÀN TÁC SẮP XẾP")
            print("=" * 30)
            
            moved_files = backup_data.get('moved_files', [])
            success_count = 0
            
            for move_info in reversed(moved_files):  # Reverse order
                try:
                    dest_path = Path(move_info['destination'])
                    source_path = Path(move_info['source'])
                    
                    if dest_path.exists():
                        # Tạo thư mục gốc nếu cần
                        source_path.parent.mkdir(parents=True, exist_ok=True)
                        shutil.move(str(dest_path), str(source_path))
                        success_count += 1
                        print(f"↩️ {dest_path.name} → {source_path.parent.name}/")
                
                except Exception as e:
                    print(f"{Fore.RED}❌ Lỗi hoàn tác {move_info['destination']}: {e}")
            
            print(f"\n{Fore.GREEN}✅ Đã hoàn tác {success_count}/{len(moved_files)} file")
            
            # Xóa thư mục rỗng
            self._remove_empty_folders()
            
            return True
            
        except Exception as e:
            print(f"{Fore.RED}❌ Lỗi khi hoàn tác: {e}")
            return False
    
    def _remove_empty_folders(self):
        """Xóa các thư mục rỗng"""
        for folder in self.organized_dir.iterdir():
            if folder.is_dir() and folder.name != "backup_info.json":
                try:
                    if not any(folder.iterdir()):  # Thư mục rỗng
                        folder.rmdir()
                        print(f"🗑️ Đã xóa thư mục rỗng: {folder.name}")
                except:
                    pass
```

### 3. Class AutoWatcher - Theo dõi tự động

```python
class AutoWatcher:
    """
    Theo dõi thư mục và sắp xếp tự động
    Giống như một bảo vệ canh gác 24/7!
    """
    
    def __init__(self, organizer, watch_interval=5):
        self.organizer = organizer
        self.watch_interval = watch_interval
        self.is_watching = False
        self.watch_thread = None
        self.last_scan_time = time.time()
        self.processed_files = set()
    
    def start_watching(self):
        """Bắt đầu theo dõi"""
        if self.is_watching:
            print(f"{Fore.YELLOW}⚠️ Đang theo dõi rồi!")
            return
        
        self.is_watching = True
        self.watch_thread = threading.Thread(target=self._watch_loop, daemon=True)
        self.watch_thread.start()
        
        print(f"{Fore.GREEN}👁️ Bắt đầu theo dõi thư mục: {self.organizer.source_dir}")
        print(f"⏰ Kiểm tra mỗi {self.watch_interval} giây")
    
    def stop_watching(self):
        """Dừng theo dõi"""
        self.is_watching = False
        if self.watch_thread:
            self.watch_thread.join()
        print(f"{Fore.RED}⏹️ Đã dừng theo dõi")
    
    def _watch_loop(self):
        """Vòng lặp theo dõi"""
        while self.is_watching:
            try:
                new_files = self._detect_new_files()
                if new_files:
                    print(f"\n{Fore.CYAN}🔔 Phát hiện {len(new_files)} file mới:")
                    for file_path in new_files:
                        print(f"   📄 {file_path.name}")
                    
                    # Sắp xếp file mới
                    organized_count = self.organizer.organize_files(new_files, create_backup=False)
                    print(f"{Fore.GREEN}✅ Đã sắp xếp {organized_count} file mới")
                
                time.sleep(self.watch_interval)
                
            except Exception as e:
                print(f"{Fore.RED}❌ Lỗi khi theo dõi: {e}")
                time.sleep(self.watch_interval)
    
    def _detect_new_files(self):
        """Phát hiện file mới"""
        current_files = []
        
        for file_path in self.organizer.source_dir.rglob('*'):
            if (file_path.is_file() and 
                not self.organizer._should_skip_file(file_path) and
                str(file_path) not in self.processed_files):
                
                # Kiểm tra file có được tạo sau lần quét cuối không
                file_modified_time = file_path.stat().st_mtime
                if file_modified_time > self.last_scan_time:
                    current_files.append(file_path)
                    self.processed_files.add(str(file_path))
        
        self.last_scan_time = time.time()
        return current_files
```

### 4. Class Statistics - Thống kê và báo cáo

```python
class StatisticsManager:
    """
    Quản lý thống kê và báo cáo
    Giống như một nhà phân tích dữ liệu chuyên nghiệp!
    """
    
    def __init__(self, organizer):
        self.organizer = organizer
    
    def generate_report(self, detailed=True):
        """Tạo báo cáo thống kê"""
        print(f"\n{Fore.BLUE}{Style.BRIGHT}📊 BÁO CÁO THỐNG KÊ")
        print("=" * 50)
        
        if not self.organizer.moved_files:
            print(f"{Fore.YELLOW}📭 Chưa có file nào được sắp xếp!")
            return
        
        # Thống kê tổng quan
        total_files = len(self.organizer.moved_files)
        total_size = sum(info['size'] for info in self.organizer.moved_files)
        
        print(f"{Fore.WHITE}📁 Tổng số file đã sắp xếp: {Fore.GREEN}{total_files:,}")
        print(f"{Fore.WHITE}💾 Tổng dung lượng: {Fore.GREEN}{self._format_size(total_size)}")
        
        # Thống kê theo loại
        category_stats = defaultdict(lambda: {'count': 0, 'size': 0})
        
        for move_info in self.organizer.moved_files:
            category = move_info['category']
            category_stats[category]['count'] += 1
            category_stats[category]['size'] += move_info['size']
        
        print(f"\n{Fore.CYAN}📋 Thống kê theo loại file:")
        print("-" * 40)
        
        # Sắp xếp theo số lượng file
        sorted_categories = sorted(
            category_stats.items(), 
            key=lambda x: x[1]['count'], 
            reverse=True
        )
        
        for category, stats in sorted_categories:
            info = self.organizer.file_type_manager.file_categories.get(
                category, {'icon': '📁', 'folder': category}
            )
            
            percentage = (stats['count'] / total_files) * 100
            size_str = self._format_size(stats['size'])
            
            print(f"{info['icon']} {info['folder']:15} | "
                  f"{stats['count']:4} file ({percentage:5.1f}%) | "
                  f"{size_str:>10}")
        
        if detailed:
            self._show_detailed_stats()
    
    def _show_detailed_stats(self):
        """Hiển thị thống kê chi tiết"""
        print(f"\n{Fore.MAGENTA}📈 THỐNG KÊ CHI TIẾT")
        print("-" * 30)
        
        # Top 10 file lớn nhất
        large_files = sorted(
            self.organizer.moved_files,
            key=lambda x: x['size'],
            reverse=True
        )[:10]
        
        if large_files:
            print(f"{Fore.YELLOW}🔍 Top 10 file lớn nhất:")
            for i, file_info in enumerate(large_files, 1):
                file_name = Path(file_info['destination']).name
                size_str = self._format_size(file_info['size'])
                print(f"   {i:2d}. {file_name[:30]:30} | {size_str:>10}")
        
        # Thống kê theo thời gian
        time_stats = defaultdict(int)
        for move_info in self.organizer.moved_files:
            timestamp = datetime.fromisoformat(move_info['timestamp'])
            hour = timestamp.hour
            time_stats[hour] += 1
        
        if time_stats:
            print(f"\n{Fore.BLUE}⏰ Thống kê theo giờ sắp xếp:")
            busiest_hour = max(time_stats.items(), key=lambda x: x[1])
            print(f"   📊 Giờ bận nhất: {busiest_hour[0]:02d}:00 ({busiest_hour[1]} file)")
    
    def _format_size(self, size_bytes):
        """Format kích thước file"""
        if size_bytes == 0:
            return "0 B"
        
        size_names = ["B", "KB", "MB", "GB", "TB"]
        i = 0
        
        while size_bytes >= 1024 and i < len(size_names) - 1:
            size_bytes /= 1024.0
            i += 1
        
        return f"{size_bytes:.1f} {size_names[i]}"
    
    def export_report(self, filename="organization_report.json"):
        """Xuất báo cáo ra file"""
        report_data = {
            'timestamp': datetime.now().isoformat(),
            'source_directory': str(self.organizer.source_dir),
            'organized_directory': str(self.organizer.organized_dir),
            'total_files': len(self.organizer.moved_files),
            'total_size': sum(info['size'] for info in self.organizer.moved_files),
            'moved_files': self.organizer.moved_files,
            'errors': self.organizer.errors,
            'statistics': dict(self.organizer.statistics)
        }
        
        report_path = self.organizer.organized_dir / filename
        
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report_data, f, ensure_ascii=False, indent=2)
        
        print(f"{Fore.GREEN}📄 Đã xuất báo cáo: {report_path}")
        return report_path
```

### 5. Ứng dụng chính FileOrganizerApp

```python
class FileOrganizerApp:
    """
    Ứng dụng File Organizer chính
    Giống như một trung tâm điều khiển thông minh!
    """
    
    def __init__(self):
        self.organizer = None
        self.auto_watcher = None
        self.stats_manager = None
    
    def clear_screen(self):
        """Xóa màn hình"""
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def print_logo(self):
        """In logo ứng dụng"""
        print(f"{Fore.CYAN}{Style.BRIGHT}")
        print("=" * 60)
        print("📁        FILE ORGANIZER - TRÌNH SẮP XẾP FILE THÔNG MINH        📁")
        print("=" * 60)
        print(f"{Style.RESET_ALL}")
    
    def main_menu(self):
        """Menu chính"""
        while True:
            self.clear_screen()
            self.print_logo()
            
            if self.organizer:
                print(f"{Fore.GREEN}📂 Thư mục nguồn: {self.organizer.source_dir}")
                print(f"🎯 Thư mục đích: {self.organizer.organized_dir}")
                
                if self.auto_watcher and self.auto_watcher.is_watching:
                    print(f"{Fore.YELLOW}👁️ Đang theo dõi tự động...")
            
            print(f"\n{Fore.YELLOW}{Style.BRIGHT}📋 MENU CHÍNH")
            print("=" * 30)
            print(f"{Fore.WHITE}1. 📁 Chọn thư mục để sắp xếp")
            print("2. 🔍 Quét và xem trước")
            print("3. 🚀 Bắt đầu sắp xếp")
            print("4. 👁️ Theo dõi tự động")
            print("5. 📊 Xem thống kê")
            print("6. ⚙️ Cài đặt")
            print("7. 🔄 Hoàn tác")
            print("8. ℹ️ Thông tin")
            print("0. 🚪 Thoát")
            print("=" * 30)
            
            choice = input(f"\n{Fore.CYAN}👉 Chọn chức năng (0-8): ").strip()
            
            if choice == "1":
                self.select_directory()
            elif choice == "2":
                self.preview_organization()
            elif choice == "3":
                self.start_organization()
            elif choice == "4":
                self.manage_auto_watch()
            elif choice == "5":
                self.show_statistics()
            elif choice == "6":
                self.settings_menu()
            elif choice == "7":
                self.undo_organization()
            elif choice == "8":
                self.show_app_info()
            elif choice == "0":
                self.exit_app()
                break
            else:
                print(f"{Fore.RED}❌ Lựa chọn không hợp lệ!")
            
            input(f"\n{Fore.YELLOW}📱 Nhấn Enter để tiếp tục...")
    
    def select_directory(self):
        """Chọn thư mục để sắp xếp"""
        print(f"\n{Fore.CYAN}📁 CHỌN THỦ MỤC")
        print("-" * 20)
        
        # Nhập đường dẫn thư mục nguồn
        while True:
            source_path = input("📂 Nhập đường dẫn thư mục nguồn: ").strip()
            
            if not source_path:
                print(f"{Fore.RED}❌ Đường dẫn không được để trống!")
                continue
            
            source_dir = Path(source_path)
            
            if not source_dir.exists():
                print(f"{Fore.RED}❌ Thư mục không tồn tại!")
                continue
            
            if not source_dir.is_dir():
                print(f"{Fore.RED}❌ Đây không phải là thư mục!")
                continue
            
            break
        
        # Nhập đường dẫn thư mục đích (tùy chọn)
        dest_path = input("🎯 Nhập thư mục đích (Enter để tự tạo): ").strip()
        dest_dir = Path(dest_path) if dest_path else None
        
        # Tạo organizer
        self.organizer = FileOrganizer(source_dir, dest_dir)
        self.stats_manager = StatisticsManager(self.organizer)
        
        print(f"{Fore.GREEN}✅ Đã chọn thư mục:")
        print(f"   📂 Nguồn: {self.organizer.source_dir}")
        print(f"   🎯 Đích: {self.organizer.organized_dir}")
    
    def preview_organization(self):
        """Xem trước việc sắp xếp"""
        if not self.organizer:
            print(f"{Fore.RED}❌ Vui lòng chọn thư mục trước!")
            return
        
        print(f"\n{Fore.BLUE}🔍 XEM TRƯỚC SẮP XẾP")
        print("=" * 30)
        
        all_files, file_stats = self.organizer.scan_directory()
        
        if not all_files:
            print(f"{Fore.YELLOW}📭 Không tìm thấy file nào để sắp xếp!")
            return
        
        print(f"\n{Fore.GREEN}📋 Chi tiết sắp xếp:")
        print("-" * 40)
        
        for category, files in file_stats.items():
            info = self.organizer.file_type_manager.file_categories.get(
                category, {'icon': '📁', 'folder': category}
            )
            
            dest_folder = self.organizer.organized_dir / info['folder']
            
            print(f"\n{info['icon']} {info['folder']} ({len(files)} file):")
            print(f"   📁 Thư mục đích: {dest_folder}")
            
            # Hiện 5 file đầu tiên
            for i, file_path in enumerate(files[:5]):
                print(f"   📄 {file_path.name}")
            
            if len(files) > 5:
                print(f"   📄 ... và {len(files) - 5} file khác")
    
    def start_organization(self):
        """Bắt đầu sắp xếp file"""
        if not self.organizer:
            print(f"{Fore.RED}❌ Vui lòng chọn thư mục trước!")
            return
        
        print(f"\n{Fore.YELLOW}⚠️ CHUẨN BỊ SẮP XẾP")
        print("-" * 25)
        
        # Xác nhận
        confirm = input("🤔 Bạn có chắc muốn sắp xếp file? (y/n): ").strip().lower()
        if confirm != 'y':
            print(f"{Fore.YELLOW}❌ Đã hủy!")
            return
        
        # Tùy chọn backup
        backup = input("💾 Tạo backup để có thể hoàn tác? (Y/n): ").strip().lower()
        create_backup = backup != 'n'
        
        # Bắt đầu sắp xếp
        start_time = time.time()
        success_count = self.organizer.organize_files(create_backup=create_backup)
        end_time = time.time()
        
        duration = end_time - start_time
        
        print(f"\n{Fore.GREEN}🎉 HOÀN THÀNH SẮP XẾP!")
        print(f"⏱️ Thời gian: {duration:.2f} giây")
        print(f"✅ Thành công: {success_count} file")
        
        if self.organizer.errors:
            print(f"⚠️ Lỗi: {len(self.organizer.errors)}")
            
        # Hiển thị thống kê ngay
        if success_count > 0:
            self.stats_manager.generate_report(detailed=False)
    
    def manage_auto_watch(self):
        """Quản lý theo dõi tự động"""
        if not self.organizer:
            print(f"{Fore.RED}❌ Vui lòng chọn thư mục trước!")
            return
        
        print(f"\n{Fore.MAGENTA}👁️ THEO DÕI TỰ ĐỘNG")
        print("-" * 25)
        
        if not self.auto_watcher:
            self.auto_watcher = AutoWatcher(self.organizer)
        
        if self.auto_watcher.is_watching:
            print(f"{Fore.GREEN}✅ Đang theo dõi thư mục...")
            print(f"⏰ Kiểm tra mỗi {self.auto_watcher.watch_interval} giây")
            
            choice = input("🛑 Dừng theo dõi? (y/n): ").strip().lower()
            if choice == 'y':
                self.auto_watcher.stop_watching()
                self.auto_watcher = None
        else:
            print(f"{Fore.YELLOW}⏹️ Chưa bật theo dõi")
            
            # Cài đặt interval
            try:
                interval = input("⏰ Khoảng thời gian kiểm tra (giây, mặc định 5): ").strip()
                interval = int(interval) if interval else 5
                interval = max(1, interval)
            except ValueError:
                interval = 5
            
            self.auto_watcher.watch_interval = interval
            
            choice = input("▶️ Bắt đầu theo dõi? (y/n): ").strip().lower()
            if choice == 'y':
                self.auto_watcher.start_watching()
    
    def show_statistics(self):
        """Hiển thị thống kê"""
        if not self.organizer or not self.stats_manager:
            print(f"{Fore.RED}❌ Chưa có dữ liệu thống kê!")
            return
        
        self.stats_manager.generate_report(detailed=True)
        
        if self.organizer.moved_files:
            export_choice = input(f"\n📄 Xuất báo cáo ra file? (y/n): ").strip().lower()
            if export_choice == 'y':
                self.stats_manager.export_report()
    
    def settings_menu(self):
        """Menu cài đặt"""
        if not self.organizer:
            print(f"{Fore.RED}❌ Vui lòng chọn thư mục trước!")
            return
        
        while True:
            print(f"\n{Fore.MAGENTA}⚙️ CÀI ĐẶT")
            print("-" * 15)
            print("1. 📝 Xem quy tắc phân loại")
            print("2. ➕ Thêm quy tắc tùy chỉnh")
            print("3. 🗂️ Xem cấu trúc thư mục")
            print("0. 🔙 Quay lại")
            
            choice = input(f"\n{Fore.CYAN}👉 Chọn: ").strip()
            
            if choice == "1":
                self.show_classification_rules()
            elif choice == "2":
                self.add_custom_rule()
            elif choice == "3":
                self.show_folder_structure()
            elif choice == "0":
                break
            else:
                print(f"{Fore.RED}❌ Lựa chọn không hợp lệ!")
            
            input(f"\n📱 Nhấn Enter để tiếp tục...")
    
    def show_classification_rules(self):
        """Hiển thị quy tắc phân loại"""
        print(f"\n{Fore.BLUE}📋 QUY TẮC PHÂN LOẠI FILE")
        print("=" * 40)
        
        categories = self.organizer.file_type_manager.get_all_categories()
        
        for category, info in categories.items():
            print(f"\n{info['icon']} {info['folder']}:")
            extensions = ", ".join(info['extensions'][:10])  # Hiện 10 đầu tiên
            if len(info['extensions']) > 10:
                extensions += f" ... ({len(info['extensions'])} tổng cộng)"
            print(f"   📝 {extensions}")
    
    def add_custom_rule(self):
        """Thêm quy tắc phân loại tùy chỉnh"""
        print(f"\n{Fore.GREEN}➕ THÊM QUY TẮC TÙY CHỈNH")
        print("-" * 30)
        
        category = input("📂 Tên loại file: ").strip().lower()
        if not category:
            print(f"{Fore.RED}❌ Tên không được để trống!")
            return
        
        extensions_str = input("📝 Phần mở rộng (cách nhau bởi dấu phẩy): ").strip()
        if not extensions_str:
            print(f"{Fore.RED}❌ Phần mở rộng không được để trống!")
            return
        
        extensions = [ext.strip() for ext in extensions_str.split(",")]
        extensions = [ext if ext.startswith('.') else f'.{ext}' for ext in extensions]
        
        folder_name = input("🗂️ Tên thư mục: ").strip()
        if not folder_name:
            folder_name = category.title()
        
        icon = input("🎨 Icon (tùy chọn): ").strip() or "📁"
        
        self.organizer.file_type_manager.add_custom_rule(
            category, extensions, folder_name, icon
        )
        
        print(f"{Fore.GREEN}✅ Đã thêm quy tắc:")
        print(f"   {icon} {folder_name}: {', '.join(extensions)}")
    
    def show_folder_structure(self):
        """Hiển thị cấu trúc thư mục sẽ tạo"""
        print(f"\n{Fore.CYAN}🗂️ CẤU TRÚC THƯ MỤC SẮP XẾP")
        print("=" * 35)
        
        print(f"📁 {self.organizer.organized_dir.name}/")
        
        categories = self.organizer.file_type_manager.get_all_categories()
        for category, info in categories.items():
            print(f"├── {info['icon']} {info['folder']}/")
        
        print("└── 📄 backup_info.json")
    
    def undo_organization(self):
        """Hoàn tác sắp xếp"""
        if not self.organizer:
            print(f"{Fore.RED}❌ Vui lòng chọn thư mục trước!")
            return
        
        print(f"\n{Fore.YELLOW}🔄 HOÀN TÁC SẮP XẾP")
        print("-" * 25)
        
        backup_file = self.organizer.organized_dir / "backup_info.json"
        if not backup_file.exists():
            print(f"{Fore.RED}❌ Không tìm thấy thông tin backup!")
            return
        
        confirm = input("⚠️ Bạn có chắc muốn hoàn tác? (y/n): ").strip().lower()
        if confirm == 'y':
            success = self.organizer.undo_organization()
            if success:
                print(f"{Fore.GREEN}✅ Hoàn tác thành công!")
            else:
                print(f"{Fore.RED}❌ Có lỗi khi hoàn tác!")
    
    def show_app_info(self):
        """Hiển thị thông tin ứng dụng"""
        print(f"\n{Fore.BLUE}{Style.BRIGHT}ℹ️ THÔNG TIN ỨNG DỤNG")
        print("=" * 35)
        print(f"{Fore.WHITE}📁 Tên: File Organizer")
        print("🏷️ Phiên bản: 1.0.0")
        print("👨‍💻 Phát triển: Behitek")
        print("🎯 Mục đích: Học lập trình Python")
        
        print(f"\n🌟 Tính năng:")
        print("   ✅ Phân loại file tự động")
        print("   ✅ Theo dõi thư mục real-time")
        print("   ✅ Thống kê chi tiết")
        print("   ✅ Hoàn tác an toàn")
        print("   ✅ Quy tắc tùy chỉnh")
        print("   ✅ Xuất báo cáo")
        
        print(f"\n📊 Loại file hỗ trợ:")
        categories = self.organizer.file_type_manager.get_all_categories() if self.organizer else {}
        total_extensions = sum(len(info['extensions']) for info in categories.values())
        print(f"   📁 {len(categories)} loại file")
        print(f"   📝 {total_extensions} phần mở rộng")
    
    def exit_app(self):
        """Thoát ứng dụng"""
        if self.auto_watcher and self.auto_watcher.is_watching:
            self.auto_watcher.stop_watching()
        
        print(f"\n{Fore.GREEN}👋 Cảm ơn bạn đã sử dụng File Organizer!")
        print("🗂️ Chúc bạn luôn có thư mục gọn gàng!")
        print("📚 Chúc bạn học tập tốt!")

# Chạy ứng dụng
if __name__ == "__main__":
    print("📁 Khởi động File Organizer...")
    print("🤖 Chuẩn bị trình sắp xếp tự động...")
    
    app = FileOrganizerApp()
    try:
        app.main_menu()
    except KeyboardInterrupt:
        print(f"\n\n{Fore.YELLOW}⚠️ Ứng dụng bị gián đoạn!")
        if app.auto_watcher and app.auto_watcher.is_watching:
            app.auto_watcher.stop_watching()
        print(f"{Fore.GREEN}👋 Tạm biệt!")
```

## 🎯 Demo và kết quả

```python
# Kết quả mẫu khi chạy ứng dụng:
"""
============================================================
📁        FILE ORGANIZER - TRÌNH SẮP XẾP FILE THÔNG MINH        📁
============================================================

📂 Thư mục nguồn: /Users/example/Downloads
🎯 Thư mục đích: /Users/example/Downloads/Organized

🔍 Đang quét thư mục: /Users/example/Downloads
--------------------------------------------------
📊 Tìm thấy 156 file:
   🖼️ Images: 45 file
   📄 Documents: 23 file
   🎥 Videos: 12 file
   💻 Code: 8 file
   🗜️ Archives: 5 file
   📦 Others: 63 file

📂 BẮT ĐẦU SẮP XẾP FILE
==================================================
🖼️ photo1.jpg → Images/
🖼️ screenshot.png → Images/
📄 report.pdf → Documents/
💻 script.py → Code/
🗜️ archive.zip → Archives/
...

✅ Hoàn thành!
📊 Đã sắp xếp: 156/156 file

📊 BÁO CÁO THỐNG KÊ
==================================================
📁 Tổng số file đã sắp xếp: 156
💾 Tổng dung lượng: 2.3 GB

📋 Thống kê theo loại file:
----------------------------------------
🖼️ Images          |   45 file (28.8%) |    1.2 GB
📄 Documents       |   23 file (14.7%) |  456.7 MB
🎥 Videos          |   12 file ( 7.7%) |  678.9 MB
💻 Code            |    8 file ( 5.1%) |   12.3 MB
🗜️ Archives        |    5 file ( 3.2%) |   89.4 MB
📦 Others          |   63 file (40.4%) |   45.2 MB
"""
```

## 🏆 Điểm nổi bật

### Kỹ thuật được sử dụng:
- 🗂️ **File System Operations** - shutil, pathlib, os operations
- 🧵 **Threading** - Theo dõi thư mục real-time
- 💾 **Data Persistence** - JSON cho backup và cài đặt
- 📊 **Statistics & Analytics** - Phân tích và báo cáo chi tiết
- 🎨 **Console UI** - Giao diện đẹp với colorama
- 🔄 **Error Handling** - Xử lý lỗi toàn diện
- 🏗️ **OOP Design** - Architecture sạch và mở rộng

### Tính năng nổi bật:
- ✅ Phân loại file thông minh theo 10+ loại
- ✅ Theo dõi thư mục tự động real-time
- ✅ Backup và khôi phục an toàn
- ✅ Thống kê chi tiết với báo cáo
- ✅ Quy tắc phân loại tùy chỉnh
- ✅ Xử lý trùng tên file thông minh
- ✅ Xuất báo cáo JSON

## 🎯 Bài học rút ra

:::tip Những điều học được:
1. **File Operations** - Làm việc với hệ thống file nâng cao
2. **Threading** - Xử lý đa luồng cho real-time monitoring
3. **Data Analysis** - Phân tích và thống kê dữ liệu
4. **System Integration** - Tương tác với hệ điều hành
5. **Error Recovery** - Backup và khôi phục dữ liệu
:::

**Bước tiếp theo**: Thử tạo [Web Scraper](./web-scraper.md) để học cách thu thập dữ liệu từ web!

---
*💡 Tip: File Organizer là dự án tuyệt vời để học file operations, threading và system programming!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
