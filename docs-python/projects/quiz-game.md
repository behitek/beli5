# 🎮 Quiz Game - Game đố vui thông minh

:::info
Tạo một game quiz giống như "Ai Là Triệu Phú" mini - kiểm tra kiến thức và tranh tài cùng bạn bè!
:::

## 🎯 Mục tiêu dự án

Xây dựng game quiz với các tính năng:
- 🧠 Nhiều chủ đề câu hỏi (Toán, Lịch sử, Khoa học, Python...)
- ⏱️ Hệ thống thời gian đếm ngược
- 🏆 Bảng xếp hạng điểm cao
- 💡 Gợi ý và trợ giúp
- 📊 Thống kê kết quả chi tiết
- 💾 Lưu tiến trình người chơi
- 🎨 Giao diện console đẹp mắt

## 🛠️ Chuẩn bị

### Thư viện cần thiết

```python
import json
import time
import random
import threading
from datetime import datetime, timedelta
from colorama import Fore, Back, Style, init
import os

# Khởi tạo colorama
init(autoreset=True)
```

## 🏗️ Xây dựng game

### 1. Class Question - Câu hỏi

```python
class Question:
    """
    Class đại diện cho một câu hỏi
    Giống như một thẻ flashcard thông minh!
    """
    
    def __init__(self, question_text, options, correct_answer, difficulty="medium", 
                 category="general", explanation="", points=10):
        self.question_text = question_text
        self.options = options  # List of 4 options
        self.correct_answer = correct_answer  # Index 0-3
        self.difficulty = difficulty  # easy, medium, hard
        self.category = category
        self.explanation = explanation
        self.points = points
    
    def is_correct(self, answer_index):
        """Kiểm tra đáp án có đúng không"""
        return answer_index == self.correct_answer
    
    def get_correct_text(self):
        """Lấy text đáp án đúng"""
        return self.options[self.correct_answer]
    
    def to_dict(self):
        """Chuyển thành dictionary để lưu file"""
        return {
            'question': self.question_text,
            'options': self.options,
            'correct': self.correct_answer,
            'difficulty': self.difficulty,
            'category': self.category,
            'explanation': self.explanation,
            'points': self.points
        }
    
    @classmethod
    def from_dict(cls, data):
        """Tạo Question từ dictionary"""
        return cls(
            data['question'],
            data['options'],
            data['correct'],
            data.get('difficulty', 'medium'),
            data.get('category', 'general'),
            data.get('explanation', ''),
            data.get('points', 10)
        )
```

### 2. Class QuestionBank - Ngân hàng câu hỏi

```python
class QuestionBank:
    """
    Quản lý tất cả câu hỏi
    Giống như một thư viện câu hỏi khổng lồ!
    """
    
    def __init__(self, data_file="questions.json"):
        self.data_file = data_file
        self.questions = []
        self.load_questions()
    
    def load_questions(self):
        """Tải câu hỏi từ file hoặc tạo mặc định"""
        try:
            if os.path.exists(self.data_file):
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.questions = [Question.from_dict(q) for q in data]
            else:
                self.create_default_questions()
                self.save_questions()
        except Exception as e:
            print(f"⚠️ Lỗi tải câu hỏi: {e}")
            self.create_default_questions()
    
    def create_default_questions(self):
        """Tạo bộ câu hỏi mặc định"""
        default_questions = [
            # Toán học
            {
                'question': "Kết quả của 7 × 8 là gì?",
                'options': ["54", "56", "58", "64"],
                'correct': 1,
                'difficulty': "easy",
                'category': "math",
                'explanation': "7 × 8 = 56",
                'points': 5
            },
            {
                'question': "Căn bậc hai của 144 là?",
                'options': ["11", "12", "13", "14"],
                'correct': 1,
                'difficulty': "medium",
                'category': "math", 
                'explanation': "√144 = 12 vì 12² = 144",
                'points': 10
            },
            
            # Lịch sử Việt Nam
            {
                'question': "Ai là vua sáng lập nhà Lý?",
                'options': ["Lý Thái Tổ", "Lý Thái Tông", "Lý Thánh Tông", "Lý Nhân Tông"],
                'correct': 0,
                'difficulty': "medium",
                'category': "history",
                'explanation': "Lý Thái Tổ (Lý Công Uẩn) sáng lập nhà Lý năm 1009",
                'points': 10
            },
            {
                'question': "Chiến thắng Điện Biên Phủ diễn ra năm nào?",
                'options': ["1953", "1954", "1955", "1956"],
                'correct': 1,
                'difficulty': "easy",
                'category': "history",
                'explanation': "Chiến thắng Điện Biên Phủ diễn ra ngày 7/5/1954",
                'points': 5
            },
            
            # Khoa học
            {
                'question': "Công thức hóa học của nước là gì?",
                'options': ["H2O", "CO2", "NaCl", "O2"],
                'correct': 0,
                'difficulty': "easy",
                'category': "science",
                'explanation': "H2O - 2 nguyên tử Hydrogen và 1 nguyên tử Oxygen",
                'points': 5
            },
            {
                'question': "Hành tinh nào gần Mặt Trời nhất?",
                'options': ["Sao Kim", "Sao Thủy", "Trái Đất", "Sao Hỏa"],
                'correct': 1,
                'difficulty': "medium",
                'category': "science",
                'explanation': "Sao Thủy (Mercury) là hành tinh gần Mặt Trời nhất",
                'points': 10
            },
            
            # Python Programming
            {
                'question': "Từ khóa nào dùng để tạo hàm trong Python?",
                'options': ["function", "def", "func", "create"],
                'correct': 1,
                'difficulty': "easy",
                'category': "python",
                'explanation': "Dùng từ khóa 'def' để định nghĩa hàm trong Python",
                'points': 5
            },
            {
                'question': "Kết quả của len('Hello') trong Python?",
                'options': ["4", "5", "6", "Error"],
                'correct': 1,
                'difficulty': "easy",
                'category': "python",
                'explanation': "len('Hello') = 5 vì chuỗi 'Hello' có 5 ký tự",
                'points': 5
            },
            
            # Địa lý
            {
                'question': "Thủ đô của Nhật Bản là?",
                'options': ["Kyoto", "Tokyo", "Osaka", "Hiroshima"],
                'correct': 1,
                'difficulty': "easy",
                'category': "geography",
                'explanation': "Tokyo là thủ đô của Nhật Bản",
                'points': 5
            },
            {
                'question': "Sông dài nhất thế giới là?",
                'options': ["Amazon", "Nile", "Yangtze", "Mississippi"],
                'correct': 1,
                'difficulty': "medium", 
                'category': "geography",
                'explanation': "Sông Nile dài 6.650km, là sông dài nhất thế giới",
                'points': 10
            }
        ]
        
        self.questions = [Question.from_dict(q) for q in default_questions]
    
    def save_questions(self):
        """Lưu câu hỏi ra file"""
        try:
            data = [q.to_dict() for q in self.questions]
            with open(self.data_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"⚠️ Lỗi lưu câu hỏi: {e}")
    
    def get_questions_by_category(self, category):
        """Lấy câu hỏi theo chủ đề"""
        return [q for q in self.questions if q.category == category]
    
    def get_questions_by_difficulty(self, difficulty):
        """Lấy câu hỏi theo độ khó"""
        return [q for q in self.questions if q.difficulty == difficulty]
    
    def get_random_questions(self, count=10, category=None, difficulty=None):
        """Lấy câu hỏi ngẫu nhiên"""
        filtered_questions = self.questions.copy()
        
        if category:
            filtered_questions = [q for q in filtered_questions if q.category == category]
        
        if difficulty:
            filtered_questions = [q for q in filtered_questions if q.difficulty == difficulty]
        
        if len(filtered_questions) < count:
            count = len(filtered_questions)
        
        return random.sample(filtered_questions, count)
    
    def get_categories(self):
        """Lấy danh sách chủ đề"""
        categories = set(q.category for q in self.questions)
        return sorted(list(categories))
    
    def add_question(self, question):
        """Thêm câu hỏi mới"""
        self.questions.append(question)
        self.save_questions()
```

### 3. Class Player - Người chơi

```python
class Player:
    """
    Thông tin người chơi
    Giống như một thẻ người chơi trong game!
    """
    
    def __init__(self, name):
        self.name = name
        self.total_score = 0
        self.games_played = 0
        self.questions_answered = 0
        self.correct_answers = 0
        self.best_score = 0
        self.favorite_category = None
        self.created_date = datetime.now().isoformat()
        self.last_played = None
    
    def update_stats(self, game_score, questions_count, correct_count, category):
        """Cập nhật thống kê người chơi"""
        self.total_score += game_score
        self.games_played += 1
        self.questions_answered += questions_count
        self.correct_answers += correct_count
        self.last_played = datetime.now().isoformat()
        
        if game_score > self.best_score:
            self.best_score = game_score
        
        # Cập nhật chủ đề yêu thích (đơn giản)
        self.favorite_category = category
    
    def get_accuracy(self):
        """Tính độ chính xác"""
        if self.questions_answered == 0:
            return 0
        return round((self.correct_answers / self.questions_answered) * 100, 1)
    
    def get_average_score(self):
        """Tính điểm trung bình mỗi game"""
        if self.games_played == 0:
            return 0
        return round(self.total_score / self.games_played, 1)
    
    def to_dict(self):
        """Chuyển thành dict để lưu file"""
        return {
            'name': self.name,
            'total_score': self.total_score,
            'games_played': self.games_played,
            'questions_answered': self.questions_answered,
            'correct_answers': self.correct_answers,
            'best_score': self.best_score,
            'favorite_category': self.favorite_category,
            'created_date': self.created_date,
            'last_played': self.last_played
        }
    
    @classmethod
    def from_dict(cls, data):
        """Tạo Player từ dict"""
        player = cls(data['name'])
        player.total_score = data.get('total_score', 0)
        player.games_played = data.get('games_played', 0)
        player.questions_answered = data.get('questions_answered', 0)
        player.correct_answers = data.get('correct_answers', 0)
        player.best_score = data.get('best_score', 0)
        player.favorite_category = data.get('favorite_category')
        player.created_date = data.get('created_date', datetime.now().isoformat())
        player.last_played = data.get('last_played')
        return player
```

### 4. Class GameSession - Phiên chơi

```python
class GameSession:
    """
    Quản lý một phiên chơi game
    Giống như một trọng tài điều khiển game!
    """
    
    def __init__(self, player, questions, time_limit=30):
        self.player = player
        self.questions = questions
        self.time_limit = time_limit
        self.current_question = 0
        self.score = 0
        self.correct_count = 0
        self.start_time = None
        self.hints_used = 0
        self.max_hints = 3
        self.answers_log = []  # Lưu log đáp án
        
    def start_game(self):
        """Bắt đầu game"""
        self.start_time = datetime.now()
        print(f"\n{Fore.GREEN}{Style.BRIGHT}🎮 BẮT ĐẦU GAME!")
        print("=" * 50)
        print(f"👤 Người chơi: {self.player.name}")
        print(f"❓ Số câu hỏi: {len(self.questions)}")
        print(f"⏰ Thời gian mỗi câu: {self.time_limit} giây")
        print(f"💡 Gợi ý có thể dùng: {self.max_hints}")
        print("=" * 50)
        
        input(f"\n{Fore.YELLOW}📱 Nhấn Enter để bắt đầu...")
        
    def play_question(self, question_index):
        """Chơi một câu hỏi"""
        if question_index >= len(self.questions):
            return False
            
        question = self.questions[question_index]
        self.current_question = question_index + 1
        
        print(f"\n{Fore.CYAN}{Style.BRIGHT}")
        print("=" * 60)
        print(f"❓ CÂU {self.current_question}/{len(self.questions)} - {question.category.upper()}")
        print("=" * 60)
        
        # Hiển thị câu hỏi
        print(f"{Fore.WHITE}{Style.BRIGHT}{question.question_text}")
        print()
        
        # Hiển thị lựa chọn
        for i, option in enumerate(question.options):
            print(f"{Fore.YELLOW}  {chr(65+i)}. {option}")
        
        print(f"\n{Fore.MAGENTA}💰 Điểm: {question.points} | 💡 Gợi ý còn: {self.max_hints - self.hints_used}")
        
        # Đếm ngược thời gian
        answer = self.get_timed_answer()
        
        # Kiểm tra đáp án
        is_correct = False
        if answer is not None:
            if answer == "hint":
                return self.show_hint(question_index)
            elif 0 <= answer <= 3:
                is_correct = question.is_correct(answer)
        
        # Xử lý kết quả
        self.process_answer(question, answer, is_correct)
        return True
    
    def get_timed_answer(self):
        """Lấy đáp án với thời gian giới hạn"""
        import select
        import sys
        
        print(f"\n{Fore.GREEN}⏰ Bạn có {self.time_limit} giây để trả lời!")
        print(f"{Fore.CYAN}Nhập A, B, C, D hoặc 'hint' để gợi ý: ", end="", flush=True)
        
        start_time = time.time()
        answer = None
        
        # Countdown timer trong thread riêng
        def countdown():
            for remaining in range(self.time_limit, 0, -1):
                time.sleep(1)
                if answer is not None:
                    break
                print(f"\r{Fore.RED}⏰ Còn {remaining-1} giây...   ", end="", flush=True)
        
        # Bắt đầu countdown
        timer_thread = threading.Thread(target=countdown)
        timer_thread.daemon = True
        timer_thread.start()
        
        # Lấy input từ user
        try:
            user_input = input().strip().upper()
            
            if user_input == "HINT":
                answer = "hint"
            elif user_input in ["A", "B", "C", "D"]:
                answer = ord(user_input) - ord("A")  # Chuyển A,B,C,D thành 0,1,2,3
            else:
                answer = -1  # Invalid
                
        except:
            answer = None
        
        return answer
    
    def show_hint(self, question_index):
        """Hiển thị gợi ý"""
        if self.hints_used >= self.max_hints:
            print(f"\n{Fore.RED}❌ Bạn đã hết lượt gợi ý!")
            return self.play_question(question_index)
        
        self.hints_used += 1
        question = self.questions[question_index]
        
        # Loại bỏ 2 đáp án sai
        correct_index = question.correct_answer
        wrong_indices = [i for i in range(4) if i != correct_index]
        remove_indices = random.sample(wrong_indices, 2)
        
        print(f"\n{Fore.YELLOW}💡 GỢI Ý: Loại bỏ 2 đáp án sai!")
        for i, option in enumerate(question.options):
            if i in remove_indices:
                print(f"{Fore.RED}  {chr(65+i)}. ❌ (Đã loại bỏ)")
            else:
                print(f"{Fore.YELLOW}  {chr(65+i)}. {option}")
        
        print(f"\n{Fore.MAGENTA}💡 Gợi ý còn: {self.max_hints - self.hints_used}")
        
        # Tiếp tục nhận đáp án
        answer = self.get_timed_answer()
        if answer == "hint":
            print(f"\n{Fore.RED}❌ Bạn đã dùng gợi ý rồi!")
            return self.play_question(question_index)
        
        is_correct = False
        if answer is not None and 0 <= answer <= 3:
            is_correct = question.is_correct(answer)
        
        self.process_answer(question, answer, is_correct)
        return True
    
    def process_answer(self, question, answer, is_correct):
        """Xử lý kết quả đáp án"""
        # Ghi log
        log_entry = {
            'question': question.question_text,
            'user_answer': answer,
            'correct_answer': question.correct_answer,
            'is_correct': is_correct,
            'points': question.points if is_correct else 0
        }
        self.answers_log.append(log_entry)
        
        print(f"\n{'-' * 50}")
        
        if answer is None:
            print(f"{Fore.RED}⏰ HẾT THỜI GIAN!")
            print(f"{Fore.YELLOW}💡 Đáp án đúng: {chr(65 + question.correct_answer)}. {question.get_correct_text()}")
        elif answer == -1:
            print(f"{Fore.RED}❌ ĐÁP ÁN KHÔNG HỢP LỆ!")
            print(f"{Fore.YELLOW}💡 Đáp án đúng: {chr(65 + question.correct_answer)}. {question.get_correct_text()}")
        elif is_correct:
            points_earned = question.points
            if self.hints_used > 0:
                points_earned = max(1, points_earned // 2)  # Giảm điểm khi dùng gợi ý
            
            self.score += points_earned
            self.correct_count += 1
            
            print(f"{Fore.GREEN}✅ CHÍNH XÁC!")
            print(f"{Fore.GREEN}🎉 +{points_earned} điểm")
            print(f"{Fore.CYAN}💰 Tổng điểm: {self.score}")
        else:
            print(f"{Fore.RED}❌ SAI RỒI!")
            print(f"{Fore.YELLOW}💡 Đáp án đúng: {chr(65 + question.correct_answer)}. {question.get_correct_text()}")
        
        # Hiển thị giải thích nếu có
        if question.explanation:
            print(f"{Fore.BLUE}📖 Giải thích: {question.explanation}")
        
        print(f"{'-' * 50}")
        input(f"\n{Fore.YELLOW}📱 Nhấn Enter để tiếp tục...")
    
    def end_game(self):
        """Kết thúc game"""
        end_time = datetime.now()
        duration = end_time - self.start_time
        
        print(f"\n{Fore.GREEN}{Style.BRIGHT}🏁 KẾT THÚC GAME!")
        print("=" * 50)
        print(f"👤 Người chơi: {self.player.name}")
        print(f"⏰ Thời gian chơi: {duration.seconds // 60}:{duration.seconds % 60:02d}")
        print(f"❓ Tổng câu hỏi: {len(self.questions)}")
        print(f"✅ Trả lời đúng: {self.correct_count}")
        print(f"❌ Trả lời sai: {len(self.questions) - self.correct_count}")
        print(f"💡 Gợi ý đã dùng: {self.hints_used}")
        print(f"💰 Tổng điểm: {self.score}")
        
        accuracy = (self.correct_count / len(self.questions)) * 100
        print(f"🎯 Độ chính xác: {accuracy:.1f}%")
        
        # Đánh giá
        if accuracy >= 90:
            print(f"{Fore.YELLOW}🏆 Xuất sắc! Bạn là thiên tài!")
        elif accuracy >= 70:
            print(f"{Fore.GREEN}🌟 Giỏi lắm! Tiếp tục phát huy!")
        elif accuracy >= 50:
            print(f"{Fore.BLUE}👍 Khá ổn! Cố gắng hơn nữa!")
        else:
            print(f"{Fore.RED}💪 Cần cố gắng thêm! Đừng bỏ cuộc!")
        
        print("=" * 50)
        
        # Cập nhật thống kê player
        category = self.questions[0].category if self.questions else "mixed"
        self.player.update_stats(self.score, len(self.questions), self.correct_count, category)
        
        return {
            'score': self.score,
            'correct': self.correct_count,
            'total': len(self.questions),
            'accuracy': accuracy,
            'duration': duration.seconds,
            'hints_used': self.hints_used
        }
```

### 5. Ứng dụng chính QuizGame

```python
class QuizGame:
    """
    Ứng dụng Quiz Game chính
    Giống như một MC điều khiển gameshow!
    """
    
    def __init__(self):
        self.question_bank = QuestionBank()
        self.players = {}
        self.current_player = None
        self.load_players()
    
    def load_players(self):
        """Tải thông tin người chơi"""
        try:
            if os.path.exists("players.json"):
                with open("players.json", 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.players = {name: Player.from_dict(info) 
                                  for name, info in data.items()}
        except Exception as e:
            print(f"⚠️ Lỗi tải dữ liệu người chơi: {e}")
    
    def save_players(self):
        """Lưu thông tin người chơi"""
        try:
            data = {name: player.to_dict() 
                   for name, player in self.players.items()}
            with open("players.json", 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"⚠️ Lỗi lưu dữ liệu: {e}")
    
    def clear_screen(self):
        """Xóa màn hình"""
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def print_logo(self):
        """In logo game"""
        print(f"{Fore.CYAN}{Style.BRIGHT}")
        print("=" * 60)
        print("🎮           QUIZ GAME - GAME ĐỐ VUI THÔNG MINH           🎮")
        print("=" * 60)
        print(f"{Style.RESET_ALL}")
    
    def main_menu(self):
        """Menu chính"""
        while True:
            self.clear_screen()
            self.print_logo()
            
            if self.current_player:
                print(f"{Fore.GREEN}👤 Xin chào, {self.current_player.name}!")
                print(f"🏆 Điểm cao nhất: {self.current_player.best_score}")
                print(f"🎮 Đã chơi: {self.current_player.games_played} game")
            
            print(f"\n{Fore.YELLOW}{Style.BRIGHT}📋 MENU CHÍNH")
            print("=" * 30)
            print(f"{Fore.WHITE}1. 🎮 Chơi game mới")
            print("2. 👤 Đăng nhập/Đăng ký")
            print("3. 🏆 Bảng xếp hạng")
            print("4. 📊 Thống kê cá nhân")
            print("5. ⚙️ Cài đặt")
            print("6. ℹ️ Thông tin game")
            print("0. 🚪 Thoát")
            print("=" * 30)
            
            choice = input(f"\n{Fore.CYAN}👉 Chọn (0-6): ").strip()
            
            if choice == "1":
                if self.current_player:
                    self.play_game_menu()
                else:
                    print(f"{Fore.RED}❌ Vui lòng đăng nhập trước!")
                    input("📱 Nhấn Enter để tiếp tục...")
            elif choice == "2":
                self.login_menu()
            elif choice == "3":
                self.show_leaderboard()
            elif choice == "4":
                self.show_player_stats()
            elif choice == "5":
                self.settings_menu()
            elif choice == "6":
                self.show_game_info()
            elif choice == "0":
                self.exit_game()
                break
            else:
                print(f"{Fore.RED}❌ Lựa chọn không hợp lệ!")
                input("📱 Nhấn Enter để tiếp tục...")
    
    def login_menu(self):
        """Menu đăng nhập"""
        print(f"\n{Fore.CYAN}👤 ĐĂNG NHẬP / ĐĂNG KÝ")
        print("-" * 30)
        
        name = input("📝 Nhập tên của bạn: ").strip()
        if not name:
            print(f"{Fore.RED}❌ Tên không được để trống!")
            input("📱 Nhấn Enter để tiếp tục...")
            return
        
        if name in self.players:
            self.current_player = self.players[name]
            print(f"{Fore.GREEN}✅ Chào mừng trở lại, {name}!")
            
            # Hiển thị thống kê nhanh
            if self.current_player.games_played > 0:
                print(f"🏆 Điểm cao nhất: {self.current_player.best_score}")
                print(f"🎯 Độ chính xác: {self.current_player.get_accuracy()}%")
        else:
            self.current_player = Player(name)
            self.players[name] = self.current_player
            self.save_players()
            print(f"{Fore.GREEN}✅ Đã tạo tài khoản mới cho {name}!")
        
        input("📱 Nhấn Enter để tiếp tục...")
    
    def play_game_menu(self):
        """Menu chọn chế độ chơi"""
        print(f"\n{Fore.GREEN}🎮 CHỌN CHẾ ĐỘ CHƠI")
        print("=" * 30)
        
        categories = self.question_bank.get_categories()
        
        print(f"{Fore.WHITE}1. 🎲 Chơi ngẫu nhiên (tất cả chủ đề)")
        
        for i, category in enumerate(categories, 2):
            category_display = {
                'math': '🧮 Toán học',
                'science': '🔬 Khoa học',
                'history': '📚 Lịch sử',
                'geography': '🌍 Địa lý', 
                'python': '🐍 Python',
                'general': '🎯 Tổng hợp'
            }
            display_name = category_display.get(category, category.title())
            print(f"{i}. {display_name}")
        
        print("0. 🔙 Quay lại")
        
        try:
            choice = int(input(f"\n{Fore.CYAN}👉 Chọn: "))
            
            if choice == 0:
                return
            elif choice == 1:
                self.start_game(category=None)
            elif 2 <= choice <= len(categories) + 1:
                selected_category = categories[choice - 2]
                self.start_game(category=selected_category)
            else:
                print(f"{Fore.RED}❌ Lựa chọn không hợp lệ!")
                
        except ValueError:
            print(f"{Fore.RED}❌ Vui lòng nhập số!")
        
        input("📱 Nhấn Enter để tiếp tục...")
    
    def start_game(self, category=None):
        """Bắt đầu game"""
        print(f"\n{Fore.YELLOW}⚙️ CÀI ĐẶT GAME")
        print("-" * 20)
        
        # Chọn số câu hỏi
        try:
            num_questions = int(input("❓ Số câu hỏi (5-20, mặc định 10): ") or "10")
            num_questions = max(5, min(20, num_questions))
        except ValueError:
            num_questions = 10
        
        # Chọn thời gian
        try:
            time_limit = int(input("⏰ Thời gian mỗi câu (10-60s, mặc định 30s): ") or "30")
            time_limit = max(10, min(60, time_limit))
        except ValueError:
            time_limit = 30
        
        # Lấy câu hỏi
        questions = self.question_bank.get_random_questions(
            count=num_questions, 
            category=category
        )
        
        if not questions:
            print(f"{Fore.RED}❌ Không có câu hỏi phù hợp!")
            return
        
        # Bắt đầu game session
        session = GameSession(self.current_player, questions, time_limit)
        session.start_game()
        
        # Chơi từng câu hỏi
        for i in range(len(questions)):
            if not session.play_question(i):
                break
        
        # Kết thúc game
        results = session.end_game()
        self.save_players()
        
        # Hiển thị kết quả chi tiết
        self.show_game_results(session, results)
    
    def show_game_results(self, session, results):
        """Hiển thị kết quả game chi tiết"""
        print(f"\n{Fore.BLUE}{Style.BRIGHT}📊 KẾT QUẢ CHI TIẾT")
        print("=" * 50)
        
        for i, log in enumerate(session.answers_log, 1):
            status_icon = "✅" if log['is_correct'] else "❌"
            status_color = Fore.GREEN if log['is_correct'] else Fore.RED
            
            print(f"\n{Fore.YELLOW}Câu {i}: {log['question'][:50]}...")
            
            if log['user_answer'] is None:
                print(f"{Fore.RED}   ⏰ Hết thời gian")
            elif log['user_answer'] == -1:
                print(f"{Fore.RED}   ❌ Đáp án không hợp lệ")
            else:
                user_letter = chr(65 + log['user_answer'])
                print(f"   📝 Bạn chọn: {user_letter}")
            
            correct_letter = chr(65 + log['correct_answer'])
            print(f"   💡 Đáp án đúng: {correct_letter}")
            print(f"{status_color}   {status_icon} {log['points']} điểm")
        
        input(f"\n{Fore.YELLOW}📱 Nhấn Enter để tiếp tục...")
    
    def show_leaderboard(self):
        """Hiển thị bảng xếp hạng"""
        print(f"\n{Fore.YELLOW}{Style.BRIGHT}🏆 BẢNG XẾP HẠNG")
        print("=" * 60)
        
        if not self.players:
            print("📭 Chưa có người chơi nào!")
            input("📱 Nhấn Enter để tiếp tục...")
            return
        
        # Sắp xếp theo điểm cao nhất
        sorted_players = sorted(
            self.players.values(),
            key=lambda p: p.best_score,
            reverse=True
        )
        
        print(f"{'Hạng':>4} {'Tên':^15} {'Điểm cao':>8} {'Số game':>8} {'Độ chính xác':>12}")
        print("-" * 60)
        
        for i, player in enumerate(sorted_players[:10], 1):  # Top 10
            rank_icon = ["🥇", "🥈", "🥉"] if i <= 3 else [f"{i:2d}"]
            rank_display = rank_icon[0] if i <= 3 else f"{i:2d}"
            
            accuracy = player.get_accuracy()
            
            print(f"{rank_display:>4} {player.name:^15} "
                  f"{player.best_score:>8} {player.games_played:>8} "
                  f"{accuracy:>10.1f}%")
        
        input(f"\n📱 Nhấn Enter để tiếp tục...")
    
    def show_player_stats(self):
        """Hiển thị thống kê cá nhân"""
        if not self.current_player:
            print(f"{Fore.RED}❌ Vui lòng đăng nhập trước!")
            input("📱 Nhấn Enter để tiếp tục...")
            return
        
        player = self.current_player
        
        print(f"\n{Fore.GREEN}{Style.BRIGHT}📊 THỐNG KÊ CÁ NHÂN - {player.name.upper()}")
        print("=" * 50)
        
        print(f"{Fore.WHITE}🏆 Điểm cao nhất: {Fore.YELLOW}{player.best_score}")
        print(f"{Fore.WHITE}🎮 Tổng số game: {Fore.CYAN}{player.games_played}")
        print(f"{Fore.WHITE}💰 Tổng điểm: {Fore.GREEN}{player.total_score}")
        print(f"{Fore.WHITE}📈 Điểm TB/game: {Fore.MAGENTA}{player.get_average_score()}")
        
        if player.questions_answered > 0:
            print(f"{Fore.WHITE}❓ Câu hỏi đã trả lời: {Fore.BLUE}{player.questions_answered}")
            print(f"{Fore.WHITE}✅ Trả lời đúng: {Fore.GREEN}{player.correct_answers}")
            print(f"{Fore.WHITE}🎯 Độ chính xác: {Fore.YELLOW}{player.get_accuracy()}%")
        
        if player.favorite_category:
            print(f"{Fore.WHITE}❤️ Chủ đề yêu thích: {Fore.RED}{player.favorite_category}")
        
        if player.last_played:
            last_played = datetime.fromisoformat(player.last_played)
            print(f"{Fore.WHITE}⏰ Chơi lần cuối: {Fore.CYAN}{last_played.strftime('%d/%m/%Y %H:%M')}")
        
        # Tính level dựa trên tổng điểm
        levels = [
            (0, "🐣 Mới bắt đầu"),
            (100, "🌱 Học sinh"),
            (500, "📚 Sinh viên"),
            (1000, "🎓 Cử nhân"),
            (2000, "🏆 Thạc sĩ"),
            (5000, "👨‍🎓 Tiến sĩ"),
            (10000, "🧠 Thiên tài")
        ]
        
        current_level = "🐣 Mới bắt đầu"
        for threshold, level in levels:
            if player.total_score >= threshold:
                current_level = level
        
        print(f"{Fore.WHITE}🎖️ Cấp độ: {Fore.YELLOW}{current_level}")
        
        input(f"\n📱 Nhấn Enter để tiếp tục...")
    
    def settings_menu(self):
        """Menu cài đặt"""
        print(f"\n{Fore.MAGENTA}⚙️ CÀI ĐẶT")
        print("-" * 15)
        print("1. 📝 Thêm câu hỏi mới")
        print("2. 👀 Xem câu hỏi theo chủ đề")
        print("3. 🗑️ Xóa dữ liệu người chơi")
        print("0. 🔙 Quay lại")
        
        choice = input(f"\n{Fore.CYAN}👉 Chọn: ").strip()
        
        if choice == "1":
            self.add_custom_question()
        elif choice == "2":
            self.view_questions_by_category()
        elif choice == "3":
            self.reset_player_data()
        
        input("📱 Nhấn Enter để tiếp tục...")
    
    def add_custom_question(self):
        """Thêm câu hỏi tự tạo"""
        print(f"\n{Fore.GREEN}📝 THÊM CÂU HỎI MỚI")
        print("-" * 25)
        
        question_text = input("❓ Nhập câu hỏi: ").strip()
        if not question_text:
            print("❌ Câu hỏi không được để trống!")
            return
        
        options = []
        for i in range(4):
            option = input(f"📋 Lựa chọn {chr(65+i)}: ").strip()
            if not option:
                print("❌ Lựa chọn không được để trống!")
                return
            options.append(option)
        
        try:
            correct = input("✅ Đáp án đúng (A/B/C/D): ").strip().upper()
            correct_index = ord(correct) - ord('A')
            if not (0 <= correct_index <= 3):
                raise ValueError()
        except:
            print("❌ Đáp án không hợp lệ!")
            return
        
        category = input("🏷️ Chủ đề (mặc định: custom): ").strip() or "custom"
        difficulty = input("⭐ Độ khó (easy/medium/hard, mặc định: medium): ").strip() or "medium"
        points = input("💰 Điểm (mặc định: 10): ").strip()
        
        try:
            points = int(points) if points else 10
        except:
            points = 10
        
        explanation = input("📖 Giải thích (tùy chọn): ").strip()
        
        # Tạo và thêm câu hỏi
        new_question = Question(
            question_text, options, correct_index, 
            difficulty, category, explanation, points
        )
        
        self.question_bank.add_question(new_question)
        print(f"{Fore.GREEN}✅ Đã thêm câu hỏi mới!")
    
    def view_questions_by_category(self):
        """Xem câu hỏi theo chủ đề"""
        categories = self.question_bank.get_categories()
        
        print(f"\n{Fore.BLUE}👀 XEM CÂU HỎI THEO CHỦ ĐỀ")
        print("-" * 35)
        
        for i, category in enumerate(categories, 1):
            count = len(self.question_bank.get_questions_by_category(category))
            print(f"{i}. {category.title()}: {count} câu")
        
        try:
            choice = int(input("\n👉 Chọn chủ đề: "))
            if 1 <= choice <= len(categories):
                selected_category = categories[choice - 1]
                questions = self.question_bank.get_questions_by_category(selected_category)
                
                print(f"\n📚 CÂU HỎI CHỦ ĐỀ: {selected_category.upper()}")
                print("-" * 40)
                
                for i, q in enumerate(questions, 1):
                    print(f"\n{i}. {q.question_text}")
                    for j, option in enumerate(q.options):
                        mark = "✅" if j == q.correct_answer else "  "
                        print(f"   {chr(65+j)}. {option} {mark}")
                    print(f"   💰 Điểm: {q.points} | ⭐ Độ khó: {q.difficulty}")
        except:
            print("❌ Lựa chọn không hợp lệ!")
    
    def reset_player_data(self):
        """Xóa dữ liệu người chơi"""
        confirm = input(f"\n{Fore.RED}⚠️ Xác nhận xóa TẤT CẢ dữ liệu? (yes/no): ")
        if confirm.lower() == "yes":
            self.players.clear()
            self.current_player = None
            
            try:
                os.remove("players.json")
            except:
                pass
            
            print(f"{Fore.GREEN}✅ Đã xóa tất cả dữ liệu!")
        else:
            print("❌ Hủy thao tác!")
    
    def show_game_info(self):
        """Hiển thị thông tin game"""
        print(f"\n{Fore.BLUE}{Style.BRIGHT}ℹ️ THÔNG TIN GAME")
        print("=" * 30)
        print(f"{Fore.WHITE}🎮 Tên: Quiz Game")
        print("🏷️ Phiên bản: 2.0.0")
        print("👨‍💻 Phát triển: Behitek")
        print("🎯 Mục đích: Học lập trình Python")
        
        print(f"\n🌟 Tính năng:")
        print("   ✅ Nhiều chủ đề câu hỏi")
        print("   ✅ Hệ thống thời gian")
        print("   ✅ Gợi ý thông minh")
        print("   ✅ Bảng xếp hạng")
        print("   ✅ Thống kê chi tiết")
        print("   ✅ Thêm câu hỏi tùy chọn")
        
        print(f"\n📊 Thống kê hệ thống:")
        print(f"   ❓ Tổng câu hỏi: {len(self.question_bank.questions)}")
        print(f"   🏷️ Số chủ đề: {len(self.question_bank.get_categories())}")
        print(f"   👥 Số người chơi: {len(self.players)}")
        
        input(f"\n📱 Nhấn Enter để tiếp tục...")
    
    def exit_game(self):
        """Thoát game"""
        print(f"\n{Fore.GREEN}👋 Cảm ơn bạn đã chơi Quiz Game!")
        print("🎮 Hẹn gặp lại lần sau!")
        print("📚 Chúc bạn học tập tốt!")
        
        if self.current_player:
            print(f"🏆 Điểm cao nhất của {self.current_player.name}: {self.current_player.best_score}")

# Chạy game
if __name__ == "__main__":
    print("🎮 Khởi động Quiz Game...")
    print("📚 Tải câu hỏi và dữ liệu...")
    
    game = QuizGame()
    game.main_menu()
```

## 🎯 Demo và kết quả

```python
# Kết quả mẫu khi chạy game:
"""
============================================================
🎮           QUIZ GAME - GAME ĐỐ VUI THÔNG MINH           🎮
============================================================

📋 MENU CHÍNH
==============================
1. 🎮 Chơi game mới
2. 👤 Đăng nhập/Đăng ký
3. 🏆 Bảng xếp hạng
4. 📊 Thống kê cá nhân
5. ⚙️ Cài đặt
6. ℹ️ Thông tin game
0. 🚪 Thoát
==============================

============================================================
❓ CÂU 1/5 - MATH
============================================================
Kết quả của 7 × 8 là gì?

  A. 54
  B. 56
  C. 58
  D. 64

💰 Điểm: 5 | 💡 Gợi ý còn: 3

⏰ Bạn có 30 giây để trả lời!
Nhập A, B, C, D hoặc 'hint' để gợi ý: B

--------------------------------------------------
✅ CHÍNH XÁC!
🎉 +5 điểm
💰 Tổng điểm: 5
📖 Giải thích: 7 × 8 = 56
--------------------------------------------------
"""
```

## 🏆 Điểm nổi bật

### Kỹ thuật được sử dụng:
- 🏗️ **OOP Design** - Classes cho Question, Player, GameSession
- 💾 **Data Persistence** - JSON để lưu câu hỏi và người chơi
- ⏰ **Threading** - Đếm ngược thời gian với timer
- 🎨 **Console UI** - Giao diện màu sắc đẹp mắt
- 📊 **Statistics** - Thống kê chi tiết và bảng xếp hạng
- 🎲 **Randomization** - Trộn câu hỏi và gợi ý
- 🔄 **Exception Handling** - Xử lý lỗi toàn diện

### Tính năng nổi bật:
- ✅ Nhiều chủ đề câu hỏi đa dạng
- ✅ Hệ thống thời gian thực tế
- ✅ Gợi ý thông minh (loại bỏ 2 đáp án sai)
- ✅ Bảng xếp hạng và thống kê
- ✅ Thêm câu hỏi tùy chỉnh
- ✅ Lưu tiến trình người chơi
- ✅ Phân cấp người chơi theo điểm

## 🎯 Bài học rút ra

:::tip Những điều học được:
1. **Game Design** - Thiết kế luật chơi và cân bằng
2. **User Experience** - Giao diện thân thiện và tương tác
3. **Data Management** - Quản lý câu hỏi và người chơi
4. **Real-time Processing** - Xử lý thời gian thực
5. **Statistics & Analytics** - Thống kê và phân tích dữ liệu
:::

**Bước tiếp theo**: Thử tạo [File Organizer](./file-organizer.md) để học cách làm việc với hệ thống file!

---
*💡 Tip: Quiz Game là dự án tuyệt vời để học OOP, threading và data persistence!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
