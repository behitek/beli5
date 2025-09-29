# 🕐 DateTime - Làm Chủ Thời Gian

> **Mục tiêu**: Học cách xử lý ngày tháng, thời gian trong Python như một chuyên gia! ⏰

## 🤔 Tại Sao Cần DateTime?

Trong lập trình, bạn sẽ thường xuyên làm việc với:
- 📅 **Ngày tháng**: Sinh nhật, deadline, lịch hẹn
- ⏰ **Thời gian**: Timestamp, đo thời gian thực thi
- 🌍 **Múi giờ**: Ứng dụng global, server khác múi giờ
- 📊 **Tính toán**: Khoảng cách thời gian, tuổi, thời hạn

## 📚 Import và Cơ Bản

```python
from datetime import datetime, date, time, timedelta
import calendar
import time as time_module

print("🕐 DATETIME CƠ BẢN")
print("=" * 30)

# Lấy thời gian hiện tại
now = datetime.now()
today = date.today() 
current_time = datetime.now().time()

print(f"⏰ Bây giờ: {now}")
print(f"📅 Hôm nay: {today}")
print(f"🕐 Giờ hiện tại: {current_time}")

# Các thành phần của datetime
print(f"\n📊 Chi tiết thời gian:")
print(f"   Năm: {now.year}")
print(f"   Tháng: {now.month}")
print(f"   Ngày: {now.day}")
print(f"   Giờ: {now.hour}")
print(f"   Phút: {now.minute}")
print(f"   Giây: {now.second}")
print(f"   Microsecond: {now.microsecond}")
print(f"   Ngày trong tuần: {now.weekday()} (0=Monday)")
```

## 📅 Tạo DateTime Cụ Thể

```python
# Tạo datetime cụ thể
my_birthday = datetime(1995, 5, 15, 14, 30, 0)
important_date = date(2024, 12, 25)  # Giáng sinh 2024
meeting_time = time(9, 30, 0)  # 9:30 AM

print(f"\n🎂 THỜI GIAN CỤ THỂ:")
print(f"Sinh nhật tôi: {my_birthday}")
print(f"Giáng sinh 2024: {important_date}")
print(f"Giờ họp: {meeting_time}")

# Tạo từ timestamp
timestamp = 1640995200  # Unix timestamp
dt_from_timestamp = datetime.fromtimestamp(timestamp)
print(f"\nTừ timestamp: {dt_from_timestamp}")

# Lấy timestamp từ datetime
timestamp_now = now.timestamp()
print(f"Timestamp hiện tại: {timestamp_now}")
```

## 🎨 Format và Parse DateTime

```python
print(f"\n🎨 FORMAT DATETIME")
print("=" * 30)

now = datetime.now()

# Các cách format phổ biến
formats = [
    ("%Y-%m-%d", "2024-03-15"),
    ("%d/%m/%Y", "15/03/2024"),
    ("%Y-%m-%d %H:%M:%S", "2024-03-15 14:30:45"),
    ("%A, %B %d, %Y", "Friday, March 15, 2024"),
    ("%d %b %Y", "15 Mar 2024"),
    ("%I:%M %p", "02:30 PM"),
    ("%Y-%m-%d %H:%M:%S.%f", "Với microseconds")
]

print("📝 Các format phổ biến:")
for format_code, description in formats:
    try:
        formatted = now.strftime(format_code)
        print(f"   {format_code:20} -> {formatted}")
    except:
        print(f"   {format_code:20} -> {description}")

# Parse string thành datetime
date_strings = [
    ("2024-03-15", "%Y-%m-%d"),
    ("15/03/2024 14:30", "%d/%m/%Y %H:%M"),
    ("March 15, 2024", "%B %d, %Y"),
    ("2024-03-15T14:30:45", "%Y-%m-%dT%H:%M:%S")
]

print(f"\n🔄 Parse string thành datetime:")
for date_str, format_str in date_strings:
    try:
        parsed = datetime.strptime(date_str, format_str)
        print(f"   '{date_str}' -> {parsed}")
    except ValueError as e:
        print(f"   '{date_str}' -> Lỗi: {e}")
```

## ⏱️ TimeDelta - Khoảng Cách Thời Gian

```python
print(f"\n⏱️ TIMEDELTA - KHOẢNG CÁCH THỜI GIAN")
print("=" * 50)

# Tạo timedelta
one_day = timedelta(days=1)
one_week = timedelta(weeks=1)
one_hour = timedelta(hours=1)
mixed_delta = timedelta(days=7, hours=5, minutes=30, seconds=45)

print(f"1 ngày: {one_day}")
print(f"1 tuần: {one_week}")
print(f"1 giờ: {one_hour}")
print(f"Hỗn hợp: {mixed_delta}")

# Tính toán với timedelta
now = datetime.now()
tomorrow = now + one_day
last_week = now - one_week
next_month = now + timedelta(days=30)

print(f"\n📊 Tính toán thời gian:")
print(f"Bây giờ: {now.strftime('%Y-%m-%d %H:%M')}")
print(f"Ngày mai: {tomorrow.strftime('%Y-%m-%d %H:%M')}")
print(f"Tuần trước: {last_week.strftime('%Y-%m-%d %H:%M')}")
print(f"Tháng sau: {next_month.strftime('%Y-%m-%d %H:%M')}")

# Tính khoảng cách giữa 2 datetime
birthday = datetime(1995, 5, 15)
age_delta = now - birthday

print(f"\n🎂 Tính tuổi:")
print(f"Sinh nhật: {birthday.strftime('%d/%m/%Y')}")
print(f"Khoảng cách: {age_delta}")
print(f"Số ngày sống: {age_delta.days:,} ngày")
print(f"Số giây sống: {age_delta.total_seconds():,.0f} giây")

# Tính tuổi chính xác
age_years = age_delta.days // 365
age_days = age_delta.days % 365
print(f"Tuổi: khoảng {age_years} năm {age_days} ngày")
```

## 🎯 Ứng Dụng Thực Tế

### 1. Hệ Thống Chấm Công

```python
from datetime import datetime, timedelta
from typing import List, Dict

class TimeTracker:
    """Hệ thống chấm công đơn giản"""
    
    def __init__(self, employee_name: str):
        self.employee_name = employee_name
        self.records = []  # List of (check_in, check_out) tuples
        self.current_session = None
    
    def check_in(self):
        """Chấm công vào"""
        if self.current_session:
            print(f"⚠️ {self.employee_name} đã chấm công vào rồi!")
            return False
        
        self.current_session = datetime.now()
        print(f"✅ {self.employee_name} chấm công vào lúc {self.current_session.strftime('%H:%M:%S')}")
        return True
    
    def check_out(self):
        """Chấm công ra"""
        if not self.current_session:
            print(f"⚠️ {self.employee_name} chưa chấm công vào!")
            return False
        
        check_out_time = datetime.now()
        self.records.append((self.current_session, check_out_time))
        
        work_duration = check_out_time - self.current_session
        print(f"✅ {self.employee_name} chấm công ra lúc {check_out_time.strftime('%H:%M:%S')}")
        print(f"   ⏱️ Thời gian làm việc: {self.format_duration(work_duration)}")
        
        self.current_session = None
        return True
    
    def format_duration(self, duration: timedelta) -> str:
        """Format duration thành dạng dễ đọc"""
        total_seconds = int(duration.total_seconds())
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        seconds = total_seconds % 60
        
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    
    def get_daily_summary(self, target_date: date = None) -> Dict:
        """Tóm tắt công việc trong ngày"""
        if target_date is None:
            target_date = date.today()
        
        daily_records = [
            (check_in, check_out) for check_in, check_out in self.records
            if check_in.date() == target_date
        ]
        
        if not daily_records:
            return {
                'date': target_date,
                'total_sessions': 0,
                'total_hours': 0,
                'sessions': []
            }
        
        total_duration = timedelta()
        sessions = []
        
        for check_in, check_out in daily_records:
            duration = check_out - check_in
            total_duration += duration
            
            sessions.append({
                'check_in': check_in.strftime('%H:%M:%S'),
                'check_out': check_out.strftime('%H:%M:%S'),
                'duration': self.format_duration(duration)
            })
        
        return {
            'date': target_date,
            'total_sessions': len(daily_records),
            'total_hours': self.format_duration(total_duration),
            'total_hours_decimal': total_duration.total_seconds() / 3600,
            'sessions': sessions
        }
    
    def get_monthly_report(self, year: int, month: int) -> Dict:
        """Báo cáo tháng"""
        monthly_records = []
        total_hours = timedelta()
        
        for check_in, check_out in self.records:
            if check_in.year == year and check_in.month == month:
                duration = check_out - check_in
                total_hours += duration
                monthly_records.append((check_in.date(), duration))
        
        # Group by date
        daily_totals = {}
        for work_date, duration in monthly_records:
            if work_date not in daily_totals:
                daily_totals[work_date] = timedelta()
            daily_totals[work_date] += duration
        
        return {
            'year': year,
            'month': month,
            'total_days_worked': len(daily_totals),
            'total_hours': self.format_duration(total_hours),
            'total_hours_decimal': total_hours.total_seconds() / 3600,
            'average_hours_per_day': total_hours.total_seconds() / 3600 / max(len(daily_totals), 1),
            'daily_breakdown': {
                date_key: self.format_duration(duration) 
                for date_key, duration in sorted(daily_totals.items())
            }
        }

# Demo Time Tracker
print(f"\n⏰ DEMO HỆ THỐNG CHẤM CÔNG")
print("=" * 40)

# Tạo tracker cho nhân viên
tracker = TimeTracker("Nguyễn Văn An")

# Giả lập một ngày làm việc
print("🌅 Sáng:")
tracker.check_in()
# Giả lập làm việc sáng (3.5 giờ)
time_module.sleep(1)  # Simulate time passing
tracker.check_out()

print(f"\n🍽️ Nghỉ trưa và chiều:")
tracker.check_in()
time_module.sleep(1)  # Simulate afternoon work
tracker.check_out()

# Thêm một số records giả lập cho demo
from datetime import datetime
# Giả lập thêm vài ngày trước
tracker.records.extend([
    (datetime(2024, 3, 14, 8, 30), datetime(2024, 3, 14, 17, 45)),
    (datetime(2024, 3, 13, 9, 0), datetime(2024, 3, 13, 18, 0)),
    (datetime(2024, 3, 12, 8, 45), datetime(2024, 3, 12, 17, 30))
])# Xem báo cáo ngày
daily_summary = tracker.get_daily_summary()
print(f"\n📊 BÁO CÁO NGÀY {daily_summary['date']}:")
print(f"   Số lần chấm công: {daily_summary['total_sessions']}")
print(f"   Tổng thời gian: {daily_summary['total_hours']}")
print(f"   Chi tiết:")
for i, session in enumerate(daily_summary['sessions'], 1):
    print(f"      {i}. {session['check_in']} - {session['check_out']} ({session['duration']})")
```

### 2. Hệ Thống Lịch Hẹn

```python
from enum import Enum
from dataclasses import dataclass
from typing import Optional

class AppointmentStatus(Enum):
    SCHEDULED = "Đã lên lịch"
    CONFIRMED = "Đã xác nhận"
    IN_PROGRESS = "Đang diễn ra"
    COMPLETED = "Hoàn thành"
    CANCELLED = "Đã hủy"
    NO_SHOW = "Không đến"

@dataclass
class Appointment:
    """Lịch hẹn"""
    id: int
    title: str
    start_time: datetime
    end_time: datetime
    client_name: str
    status: AppointmentStatus = AppointmentStatus.SCHEDULED
    notes: str = ""
    
    def __post_init__(self):
        if self.end_time <= self.start_time:
            raise ValueError("Thời gian kết thúc phải sau thời gian bắt đầu")
    
    @property
    def duration(self) -> timedelta:
        """Thời lượng cuộc hẹn"""
        return self.end_time - self.start_time
    
    @property
    def is_today(self) -> bool:
        """Kiểm tra có phải hôm nay không"""
        return self.start_time.date() == date.today()
    
    @property
    def is_upcoming(self) -> bool:
        """Kiểm tra có phải sắp tới không"""
        return self.start_time > datetime.now()
    
    @property
    def is_overdue(self) -> bool:
        """Kiểm tra có quá giờ không"""
        return self.end_time < datetime.now() and self.status == AppointmentStatus.SCHEDULED
    
    def time_until_start(self) -> Optional[timedelta]:
        """Thời gian còn lại đến cuộc hẹn"""
        if self.is_upcoming:
            return self.start_time - datetime.now()
        return None
    
    def __str__(self):
        status_emojis = {
            AppointmentStatus.SCHEDULED: "📅",
            AppointmentStatus.CONFIRMED: "✅",
            AppointmentStatus.IN_PROGRESS: "🔄",
            AppointmentStatus.COMPLETED: "✔️",
            AppointmentStatus.CANCELLED: "❌",
            AppointmentStatus.NO_SHOW: "👻"
        }
        
        emoji = status_emojis.get(self.status, "📅")
        time_string = f"{self.start_time.strftime('%d/%m %H:%M')} - {self.end_time.strftime('%H:%M')}"
        
        return f"{emoji} {self.title} | {self.client_name} | {time_string}"

class AppointmentScheduler:
    """Hệ thống quản lý lịch hẹn"""
    
    def __init__(self):
        self.appointments = []
        self.next_id = 1
    
    def add_appointment(self, title: str, start_time: datetime, 
                       duration_minutes: int, client_name: str, notes: str = "") -> Appointment:
        """Thêm lịch hẹn mới"""
        end_time = start_time + timedelta(minutes=duration_minutes)
        
        # Kiểm tra conflict
        if self.has_time_conflict(start_time, end_time):
            raise ValueError(f"Bị trùng lịch với cuộc hẹn khác!")
        
        appointment = Appointment(
            id=self.next_id,
            title=title,
            start_time=start_time,
            end_time=end_time,
            client_name=client_name,
            notes=notes
        )
        
        self.appointments.append(appointment)
        self.next_id += 1
        
        print(f"✅ Đã thêm lịch hẹn: {appointment}")
        return appointment
    
    def has_time_conflict(self, start_time: datetime, end_time: datetime) -> bool:
        """Kiểm tra xung đột lịch"""
        for apt in self.appointments:
            if apt.status in [AppointmentStatus.CANCELLED, AppointmentStatus.NO_SHOW]:
                continue
            
            # Check overlap
            if (start_time < apt.end_time and end_time > apt.start_time):
                return True
        
        return False
    
    def get_appointments_for_date(self, target_date: date) -> List[Appointment]:
        """Lấy lịch hẹn trong ngày"""
        return [
            apt for apt in self.appointments 
            if apt.start_time.date() == target_date
        ]
    
    def get_upcoming_appointments(self, days_ahead: int = 7) -> List[Appointment]:
        """Lấy lịch hẹn sắp tới"""
        cutoff_time = datetime.now() + timedelta(days=days_ahead)
        
        upcoming = [
            apt for apt in self.appointments
            if apt.is_upcoming and apt.start_time <= cutoff_time
        ]
        
        return sorted(upcoming, key=lambda x: x.start_time)
    
    def get_today_schedule(self) -> Dict:
        """Lịch hôm nay"""
        today_appointments = self.get_appointments_for_date(date.today())
        
        if not today_appointments:
            return {
                'date': date.today(),
                'total_appointments': 0,
                'appointments': [],
                'total_duration': timedelta(),
                'next_appointment': None
            }
        
        # Sắp xếp theo thời gian
        today_appointments.sort(key=lambda x: x.start_time)
        
        # Tính tổng thời gian
        total_duration = sum(
            (apt.duration for apt in today_appointments), 
            timedelta()
        )
        
        # Tìm cuộc hẹn tiếp theo
        next_appointment = None
        for apt in today_appointments:
            if apt.is_upcoming:
                next_appointment = apt
                break
        
        return {
            'date': date.today(),
            'total_appointments': len(today_appointments),
            'appointments': today_appointments,
            'total_duration': total_duration,
            'next_appointment': next_appointment
        }
    
    def update_status(self, appointment_id: int, new_status: AppointmentStatus):
        """Cập nhật trạng thái lịch hẹn"""
        for apt in self.appointments:
            if apt.id == appointment_id:
                old_status = apt.status
                apt.status = new_status
                print(f"🔄 Cập nhật lịch hẹn #{appointment_id}: {old_status.value} → {new_status.value}")
                return True
        
        print(f"❌ Không tìm thấy lịch hẹn #{appointment_id}")
        return False
    
    def cancel_appointment(self, appointment_id: int, reason: str = ""):
        """Hủy lịch hẹn"""
        for apt in self.appointments:
            if apt.id == appointment_id:
                apt.status = AppointmentStatus.CANCELLED
                if reason:
                    apt.notes += f"\nLý do hủy: {reason}"
                print(f"❌ Đã hủy lịch hẹn #{appointment_id}")
                return True
        
        return False
    
    def get_statistics(self) -> Dict:
        """Thống kê lịch hẹn"""
        if not self.appointments:
            return {}
        
        status_count = {}
        for apt in self.appointments:
            status_count[apt.status] = status_count.get(apt.status, 0) + 1
        
        # Tính completion rate
        completed = status_count.get(AppointmentStatus.COMPLETED, 0)
        total_finished = completed + status_count.get(AppointmentStatus.NO_SHOW, 0)
        completion_rate = (completed / total_finished * 100) if total_finished > 0 else 0
        
        return {
            'total_appointments': len(self.appointments),
            'by_status': status_count,
            'completion_rate': completion_rate,
            'upcoming_count': len([apt for apt in self.appointments if apt.is_upcoming]),
            'overdue_count': len([apt for apt in self.appointments if apt.is_overdue])
        }

# Demo Appointment Scheduler
print(f"\n📅 DEMO HỆ THỐNG LỊCH HẸN")
print("=" * 40)

scheduler = AppointmentScheduler()

# Thêm một số lịch hẹn
sample_appointments = [
    ("Tư vấn khóa học Python", datetime(2024, 3, 20, 9, 0), 60, "Nguyễn Văn An"),
    ("Phỏng vấn việc làm", datetime(2024, 3, 20, 10, 30), 45, "Trần Thị Bình"),
    ("Họp nhóm dự án", datetime(2024, 3, 20, 14, 0), 90, "Team Development"),
    ("Khám sức khỏe", datetime(2024, 3, 21, 8, 30), 30, "Lê Văn Cường")
]

for title, start_time, duration, client_name in sample_appointments:
    try:
        scheduler.add_appointment(title, start_time, duration, client_name)
    except ValueError as e:
        print(f"❌ Lỗi: {e}")

# Xem lịch hôm nay
today_schedule = scheduler.get_today_schedule()
print(f"\n📋 LỊCH HÔM NAY ({today_schedule['date']}):")
print(f"   Tổng cuộc hẹn: {today_schedule['total_appointments']}")

if today_schedule['appointments']:
    print(f"   Tổng thời gian: {today_schedule['total_duration']}")
    print(f"   Chi tiết:")
    for apt in today_schedule['appointments']:
        print(f"      {apt}")
        if apt.is_upcoming:
            time_left = apt.time_until_start()
            if time_left:
                hours = int(time_left.total_seconds() // 3600)
                minutes = int((time_left.total_seconds() % 3600) // 60)
                print(f"         ⏰ Còn {hours}h {minutes}m nữa")

# Thống kê
stats = scheduler.get_statistics()
print(f"\n📊 THỐNG KÊ:")
print(f"   Tổng lịch hẹn: {stats['total_appointments']}")
print(f"   Sắp tới: {stats['upcoming_count']}")
if 'completion_rate' in stats:
    print(f"   Tỷ lệ hoàn thành: {stats['completion_rate']:.1f}%")
```

### 3. Deadline Tracker

```python
class DeadlineTracker:
    """Theo dõi deadline của các task"""
    
    def __init__(self):
        self.tasks = []
        self.next_id = 1
    
    def add_task(self, title: str, deadline: datetime, priority: str = "Medium"):
        """Thêm task với deadline"""
        task = {
            'id': self.next_id,
            'title': title,
            'deadline': deadline,
            'priority': priority,
            'created_at': datetime.now(),
            'completed': False
        }
        
        self.tasks.append(task)
        self.next_id += 1
        
        # Tính thời gian còn lại
        time_left = deadline - datetime.now()
        
        if time_left.total_seconds() > 0:
            days_left = time_left.days
            hours_left = int(time_left.seconds // 3600)
            print(f"✅ Thêm task: {title}")
            print(f"   ⏰ Deadline: {deadline.strftime('%d/%m/%Y %H:%M')}")
            print(f"   📊 Còn lại: {days_left} ngày {hours_left} giờ")
        else:
            print(f"⚠️ Task '{title}' đã quá hạn!")
        
        return task
    
    def get_urgent_tasks(self, hours_threshold: int = 24):
        """Lấy tasks cần làm gấp"""
        now = datetime.now()
        threshold_time = now + timedelta(hours=hours_threshold)
        
        urgent = []
        for task in self.tasks:
            if (not task['completed'] and 
                task['deadline'] <= threshold_time and 
                task['deadline'] > now):
                urgent.append(task)
        
        return sorted(urgent, key=lambda x: x['deadline'])
    
    def get_overdue_tasks(self):
        """Lấy tasks quá hạn"""
        now = datetime.now()
        overdue = []
        
        for task in self.tasks:
            if not task['completed'] and task['deadline'] < now:
                overdue.append(task)
        
        return sorted(overdue, key=lambda x: x['deadline'])
    
    def complete_task(self, task_id: int):
        """Hoàn thành task"""
        for task in self.tasks:
            if task['id'] == task_id:
                task['completed'] = True
                task['completed_at'] = datetime.now()
                print(f"🎉 Hoàn thành task: {task['title']}")
                return True
        return False
    
    def get_deadline_report(self):
        """Báo cáo deadline"""
        now = datetime.now()
        
        active_tasks = [t for t in self.tasks if not t['completed']]
        completed_tasks = [t for t in self.tasks if t['completed']]
        
        urgent = self.get_urgent_tasks()
        overdue = self.get_overdue_tasks()
        
        print(f"⏰ BÁO CÁO DEADLINE")
        print("=" * 30)
        print(f"📊 Tổng quan:")
        print(f"   Tổng tasks: {len(self.tasks)}")
        print(f"   Đang làm: {len(active_tasks)}")
        print(f"   Hoàn thành: {len(completed_tasks)}")
        print(f"   🚨 Quá hạn: {len(overdue)}")
        print(f"   ⚠️ Cần làm gấp: {len(urgent)}")
        
        if overdue:
            print(f"\n🚨 TASKS QUÁ HẠN:")
            for task in overdue:
                days_overdue = (now - task['deadline']).days
                print(f"   ❌ {task['title']} (quá {days_overdue} ngày)")
        
        if urgent:
            print(f"\n⚠️ TASKS CẦN LÀM GẤP:")
            for task in urgent:
                time_left = task['deadline'] - now
                hours_left = int(time_left.total_seconds() // 3600)
                print(f"   🔥 {task['title']} (còn {hours_left} giờ)")

# Demo Deadline Tracker
print(f"\n⏰ DEMO DEADLINE TRACKER")
print("=" * 40)

tracker = DeadlineTracker()

# Thêm các tasks với deadline khác nhau
sample_tasks = [
    ("Hoàn thành báo cáo tháng", datetime.now() + timedelta(hours=2), "High"),
    ("Học xong khóa Python", datetime.now() + timedelta(days=7), "Medium"),
    ("Nộp thuế", datetime.now() + timedelta(days=15), "High"),
    ("Task đã quá hạn", datetime.now() - timedelta(days=2), "Low"),
    ("Meeting với client", datetime.now() + timedelta(hours=6), "Critical")
]

for task_title, task_deadline, task_priority in sample_tasks:
    tracker.add_task(task_title, task_deadline, task_priority)

print()
tracker.get_deadline_report()
```

## 🌍 Múi Giờ (Timezone)

```python
from datetime import datetime, timezone, timedelta
import pytz  # pip install pytz

print(f"\n🌍 XỬ LÝ MÚI GIỜ")
print("=" * 30)

# UTC time
utc_now = datetime.now(timezone.utc)
print(f"UTC: {utc_now}")

# Tạo timezone
# Vietnam timezone (UTC+7)
vietnam_timezone = timezone(timedelta(hours=7))
vietnam_time = datetime.now(vietnam_timezone)
print(f"Vietnam: {vietnam_time}")

# Sử dụng pytz (nếu có cài)
try:
    import pytz
    
    # Một số timezone phổ biến
    timezones = [
        ('Asia/Ho_Chi_Minh', 'Vietnam'),
        ('US/Eastern', 'New York'),
        ('Europe/London', 'London'),
        ('Asia/Tokyo', 'Tokyo'),
        ('Australia/Sydney', 'Sydney')
    ]
    
    print(f"\n🌏 Thời gian thế giới:")
    for tz_name, city in timezones:
        tz = pytz.timezone(tz_name)
        local_time = datetime.now(tz)
        print(f"   {city:10}: {local_time.strftime('%H:%M %d/%m')}")
        
except ImportError:
    print("💡 Cài pytz để làm việc với timezone: pip install pytz")

# Convert timezone
utc_time = datetime(2024, 3, 15, 14, 30, 0, tzinfo=timezone.utc)
vietnam_time = utc_time.astimezone(vietnam_timezone)

print(f"\n🔄 Chuyển đổi múi giờ:")
print(f"UTC:     {utc_time}")
print(f"Vietnam: {vietnam_time}")
```

## 🏆 Tips và Best Practices

```python
print(f"\n💡 TIPS VÀ BEST PRACTICES")
print("=" * 40)

# 1. So sánh datetime
dt1 = datetime(2024, 3, 15, 10, 30)
dt2 = datetime(2024, 3, 15, 14, 45)

print("⚖️ So sánh datetime:")
print(f"   {dt1} < {dt2}: {dt1 < dt2}")
print(f"   Khoảng cách: {dt2 - dt1}")

# 2. Xử lý ngày cuối tháng
def get_last_day_of_month(year: int, month: int) -> int:
    """Lấy ngày cuối tháng"""
    return calendar.monthrange(year, month)[1]

def get_first_day_next_month(dt: datetime) -> datetime:
    """Lấy ngày đầu tháng sau"""
    if dt.month == 12:
        return datetime(dt.year + 1, 1, 1)
    else:
        return datetime(dt.year, dt.month + 1, 1)

print(f"\n📅 Xử lý cuối tháng:")
current = datetime.now()
last_day = get_last_day_of_month(current.year, current.month)
next_month = get_first_day_next_month(current)

print(f"   Ngày cuối tháng này: {last_day}")
print(f"   Đầu tháng sau: {next_month}")

# 3. Validate datetime
def is_business_day(dt: datetime) -> bool:
    """Kiểm tra có phải ngày làm việc không"""
    return dt.weekday() < 5  # Monday=0, Friday=4

def is_business_hours(dt: datetime) -> bool:
    """Kiểm tra có phải giờ làm việc không"""
    return 8 <= dt.hour < 18

now = datetime.now()
print(f"\n💼 Kiểm tra ngày làm việc:")
print(f"   Hôm nay là ngày làm việc? {is_business_day(now)}")
print(f"   Giờ làm việc? {is_business_hours(now)}")

# 4. Format cho người dùng Việt Nam
def format_vietnamese_datetime(dt: datetime) -> str:
    """Format datetime theo kiểu Việt Nam"""
    vietnamese_weekdays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]
    current_weekday = vietnamese_weekdays[dt.weekday()]
    
    return f"{current_weekday}, ngày {dt.day} tháng {dt.month} năm {dt.year}, {dt.hour}:{dt.minute:02d}"

print(f"\n🇻🇳 Format Việt Nam:")
print(f"   {format_vietnamese_datetime(now)}")

# 5. Performance tip - cache datetime.now()
def slow_function():
    """Hàm chậm - gọi datetime.now() nhiều lần"""
    for i in range(3):
        now = datetime.now()  # ❌ Gọi nhiều lần
        print(f"   Loop {i}: {now}")

def fast_function():
    """Hàm nhanh - cache datetime.now()"""
    now = datetime.now()  # ✅ Gọi 1 lần
    for i in range(3):
        print(f"   Loop {i}: {now}")

print(f"\n⚡ Performance tip:")
print("Slow function:")
slow_function()
print("Fast function:")
fast_function()
```

## 🎯 Tóm Tắt DateTime

:::tip Nhớ 5 điều này về DateTime:
1. **datetime.now()** - Thời gian hiện tại
2. **strftime()** - Format datetime thành string
3. **strptime()** - Parse string thành datetime  
4. **timedelta** - Tính toán khoảng cách thời gian
5. **timezone** - Xử lý múi giờ cho ứng dụng global
:::

### 🌟 Các Use Cases Thường Gặp:

- ⏰ **Logging**: Timestamp cho log entries
- 📅 **Scheduling**: Lập lịch tasks, appointments
- 🎂 **Age Calculation**: Tính tuổi, thời gian sử dụng
- ⏱️ **Performance Monitoring**: Đo thời gian thực thi
- 🌍 **Global Apps**: Xử lý múi giờ khác nhau

### 📋 Format Codes Quan Trọng:

| Code | Mô Tả | Ví Dụ |
|------|-------|-------|
| `%Y` | Năm 4 chữ số | 2024 |
| `%m` | Tháng số | 03 |
| `%d` | Ngày | 15 |
| `%H` | Giờ (24h) | 14 |
| `%M` | Phút | 30 |
| `%S` | Giây | 45 |
| `%A` | Tên thứ | Friday |
| `%B` | Tên tháng | March |

**DateTime** là công cụ mạnh mẽ để làm chủ thời gian trong Python! 🕐✨

---

*💡 Tip: Luôn sử dụng timezone-aware datetime cho ứng dụng thực tế!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
