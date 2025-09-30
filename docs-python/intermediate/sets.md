---
sidebar_position: 10
title: "🎯 Sets - Cấu Trúc Dữ Liệu Loại Bỏ Trùng Lặp"
description: "Học về sets trong Python: cấu trúc dữ liệu unique, các phép toán tập hợp, và ứng dụng thực tế. Sets như những túi ma thuật loại bỏ trùng lặp!"
keywords: ["python", "set", "unique", "tập hợp", "union", "intersection", "difference", "symmetric_difference"]
---

# 🎯 Sets - Cấu Trúc Dữ Liệu Loại Bỏ Trùng Lặp

:::tip 🎯 Ví Dụ Dễ Hiểu
Hãy tưởng tượng Set như một **túi ma thuật**! Khi bạn bỏ đồ vào, nó tự động **loại bỏ những thứ trùng lặp**. Bạn có 3 quả táo, 2 quả cam, 3 quả táo nữa → trong túi chỉ còn 1 quả táo và 1 quả cam!
:::

## 🤔 Set Là Gì?

**Set** là cấu trúc dữ liệu chứa các phần tử **duy nhất** (unique) và **không có thứ tự**. Set rất hữu ích để:
- 🎯 Loại bỏ trùng lặp
- 🔍 Tìm kiếm nhanh
- 🧮 Thực hiện phép toán tập hợp

```mermaid
graph LR
    A[📦 List: 1,2,3,2,1] --> B[🎯 Set: 1,2,3]
    C[📋 Dict: a,b,c,b,a] --> D[🎯 Set: a,b,c]
    E[🔍 Tìm kiếm] --> F[⚡ O(1) - Siêu nhanh]
    G[🧮 Phép toán] --> H[∪ ∩ - Δ]
    
    style A fill:#FFB6C1
    style B fill:#98FB98
    style C fill:#FFB6C1
    style D fill:#98FB98
    style F fill:#87CEEB
    style H fill:#DDA0DD
```

### 🆚 So Sánh Với Các Cấu Trúc Khác

```python
# List - có thể trùng lặp, có thứ tự
number_list = [1, 2, 3, 2, 1, 3]
print("List:", number_list)  # [1, 2, 3, 2, 1, 3]

# Set - không trùng lặp, không thứ tự
number_set = {1, 2, 3, 2, 1, 3}
print("Set:", number_set)     # {1, 2, 3} hoặc {2, 1, 3} (thứ tự ngẫu nhiên)

# Tuple - có thể trùng lặp, có thứ tự, không thay đổi
fixed_tuple = (1, 2, 3, 2, 1)
print("Tuple:", fixed_tuple)  # (1, 2, 3, 2, 1)
```

## 🎯 Tạo Set

### 📌 Cách Tạo Cơ Bản

```python
# Cách 1: Dùng dấu ngoặc nhọn
set_1 = {1, 2, 3, 4, 5}
set_2 = {"An", "Bình", "Châu"}

# Cách 2: Dùng set()
set_3 = set([1, 2, 3, 4, 5])
set_4 = set("Python")  # {'P', 'y', 't', 'h', 'o', 'n'}

# Set rỗng (phải dùng set(), không dùng {})
empty_set = set()

# Từ string - loại bỏ ký tự trùng lặp
text = "hello world"
unique_chars = set(text)
print("Ký tự unique:", unique_chars)  # {'h', 'e', 'l', 'o', ' ', 'w', 'r', 'd'}

# Từ list - loại bỏ phần tử trùng lặp
number_list = [1, 2, 3, 2, 1, 4, 3, 5]
unique_numbers = set(number_list)
print("Số unique:", unique_numbers)  # {1, 2, 3, 4, 5}
```

### 🎨 Các Kiểu Dữ Liệu Trong Set

```python
# Set hỗn hợp
mixed_set = {1, "Python", 3.14, True, (1, 2, 3)}

# Set không thể chứa list hoặc dict (vì chúng mutable)
# invalid_set = {1, [2, 3]}  # ❌ Lỗi!

# Set có thể chứa tuple (vì tuple immutable)
valid_set = {1, (2, 3), "Python"}

print("Set hỗn hợp:", mixed_set)
print("Set với tuple:", valid_set)
```

## 🔍 Truy Cập và Thao Tác

### ➕ Thêm và Xóa Phần Tử

```python
# Tạo set
hobbies = {"đọc sách", "nghe nhạc"}

# Thêm phần tử
hobbies.add("xem phim")
hobbies.add("chơi game")
print("Sau khi thêm:", hobbies)

# Thêm nhiều phần tử
hobbies.update(["du lịch", "nấu ăn", "vẽ tranh"])
print("Sau khi update:", hobbies)

# Xóa phần tử
hobbies.remove("nghe nhạc")  # Xóa, nếu không có sẽ lỗi
hobbies.discard("không có")  # Xóa, nếu không có không lỗi
print("Sau khi xóa:", hobbies)

# Xóa ngẫu nhiên
random_element = hobbies.pop()
print(f"Phần tử ngẫu nhiên: {random_element}")
print("Set còn lại:", hobbies)

# Xóa tất cả
hobbies.clear()
print("Set sau khi clear:", hobbies)
```

### 🔍 Kiểm Tra và Tìm Kiếm

```python
# Tạo set
subjects = {"Toán", "Lý", "Hóa", "Văn", "Anh"}

# Kiểm tra có tồn tại
print("Có môn Toán?", "Toán" in subjects)      # True
print("Có môn Sử?", "Sử" in subjects)          # False

# Độ dài
print("Số môn học:", len(subjects))            # 5

# Kiểm tra set con
science_subjects = {"Toán", "Lý", "Hóa"}
social_subjects = {"Văn", "Sử", "Địa"}

print("Môn khoa học có trong danh sách?", science_subjects.issubset(subjects))  # True
print("Môn xã hội có trong danh sách?", social_subjects.issubset(subjects))      # False
```

## 🧮 Phép Toán Tập Hợp

### 🔗 Union - Hợp

```python
# Tạo 2 set
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

# Union - hợp (tất cả phần tử từ cả 2 set)
union_result_1 = set_a.union(set_b)
union_result_2 = set_a | set_b  # Toán tử

print("Set A:", set_a)
print("Set B:", set_b)
print("Hợp (union):", union_result_1)  # {1, 2, 3, 4, 5, 6, 7, 8}
print("Hợp (|):", union_result_2)      # {1, 2, 3, 4, 5, 6, 7, 8}
```

### 🎯 Intersection - Giao

```python
# Giao - chỉ những phần tử có trong cả 2 set
intersection_result_1 = set_a.intersection(set_b)
intersection_result_2 = set_a & set_b  # Toán tử

print("Giao (intersection):", intersection_result_1)  # {4, 5}
print("Giao (&):", intersection_result_2)             # {4, 5}
```

### ➖ Difference - Hiệu

```python
# Hiệu - phần tử có trong A nhưng không có trong B
difference_result_1 = set_a.difference(set_b)
difference_result_2 = set_a - set_b  # Toán tử

print("Hiệu (difference):", difference_result_1)  # {1, 2, 3}
print("Hiệu (-):", difference_result_2)           # {1, 2, 3}
```

### ⚡ Symmetric Difference - Hiệu Đối Xứng

```python
# Hiệu đối xứng - phần tử có trong A hoặc B nhưng không có trong cả hai
sym_diff_result_1 = set_a.symmetric_difference(set_b)
sym_diff_result_2 = set_a ^ set_b  # Toán tử

print("Hiệu đối xứng (symmetric_difference):", sym_diff_result_1)  # {1, 2, 3, 6, 7, 8}
print("Hiệu đối xứng (^):", sym_diff_result_2)                    # {1, 2, 3, 6, 7, 8}
```

## 🎪 Ví Dụ Thực Tế: Hệ Thống Quản Lý Thành Viên

```python
# 👥 Hệ thống quản lý thành viên với sets
class MemberManager:
    def __init__(self):
        self.members = set()
        self.vip_members = set()
        self.new_members = set()
        self.common_interests = set()
    
    def add_member(self, name, is_vip=False, is_new=False, *interests):
        """Thêm thành viên mới"""
        self.members.add(name)
        
        if is_vip:
            self.vip_members.add(name)
        
        if is_new:
            self.new_members.add(name)
        
        # Thêm sở thích vào sở thích chung
        for interest in interests:
            self.common_interests.add(interest)
        
        print(f"✅ Đã thêm thành viên: {name}")
        if interests:
            print(f"   Sở thích: {', '.join(interests)}")
    
    def remove_member(self, name):
        """Xóa thành viên"""
        if name in self.members:
            self.members.discard(name)
            self.vip_members.discard(name)
            self.new_members.discard(name)
            print(f"🗑️  Đã xóa thành viên: {name}")
        else:
            print(f"❌ Không tìm thấy thành viên: {name}")
    
    def find_common_members(self, *member_groups):
        """Tìm thành viên chung trong các nhóm"""
        if not member_groups:
            return set()
        
        # Tìm giao của tất cả set
        result = set(member_groups[0])
        for group in member_groups[1:]:
            result = result.intersection(set(group))
        
        return result
    
    def show_statistics(self):
        """Thống kê thành viên"""
        print("\n📊 THỐNG KÊ THÀNH VIÊN")
        print("=" * 40)
        
        print(f"👥 Tổng thành viên: {len(self.members)}")
        print(f"⭐ Thành viên VIP: {len(self.vip_members)}")
        print(f"🆕 Thành viên mới: {len(self.new_members)}")
        
        # Thành viên vừa VIP vừa mới
        vip_new = self.vip_members.intersection(self.new_members)
        print(f"🌟 VIP + Mới: {len(vip_new)}")
        
        # Thành viên thường
        regular_members = self.members - self.vip_members
        print(f"👤 Thành viên thường: {len(regular_members)}")
        
        # Sở thích phổ biến
        print(f"🎯 Sở thích chung: {len(self.common_interests)} loại")
    
    def display_members(self):
        """Hiển thị danh sách thành viên"""
        if not self.members:
            print("👥 Chưa có thành viên nào")
            return
        
        print("\n👥 DANH SÁCH THÀNH VIÊN")
        print("=" * 50)
        
        # Tất cả thành viên
        print("Tất cả thành viên:")
        for i, name in enumerate(sorted(self.members), 1):
            member_types = []
            if name in self.vip_members:
                member_types.append("VIP")
            if name in self.new_members:
                member_types.append("Mới")
            
            type_str = f" ({', '.join(member_types)})" if member_types else ""
            print(f"   {i:2d}. {name}{type_str}")
        
        # Thành viên VIP
        if self.vip_members:
            print(f"\n⭐ Thành viên VIP ({len(self.vip_members)}):")
            for name in sorted(self.vip_members):
                print(f"   • {name}")
        
        # Thành viên mới
        if self.new_members:
            print(f"\n🆕 Thành viên mới ({len(self.new_members)}):")
            for name in sorted(self.new_members):
                print(f"   • {name}")
        
        # Sở thích chung
        if self.common_interests:
            print(f"\n🎯 Sở thích chung ({len(self.common_interests)}):")
            for interest in sorted(self.common_interests):
                print(f"   • {interest}")
    
    def find_members_by_interest(self, target_interest):
        """Tìm thành viên có sở thích cụ thể"""
        # Giả sử chúng ta có thông tin sở thích của từng thành viên
        # Trong thực tế, cần lưu thông tin này
        print(f"🔍 Tìm thành viên có sở thích: {target_interest}")
        print("(Chức năng này cần mở rộng để lưu sở thích cá nhân)")

# Sử dụng hệ thống
manager = MemberManager()

# Thêm thành viên
manager.add_member("Nguyễn Văn An", is_vip=True, "lập trình", "đọc sách")
manager.add_member("Trần Thị Bình", is_new=True, "vẽ tranh", "nghe nhạc")
manager.add_member("Lê Văn Châu", is_vip=True, is_new=True, "lập trình", "chơi game")
manager.add_member("Phạm Thị Dung", "nấu ăn", "du lịch")
manager.add_member("Hoàng Văn Em", is_new=True, "thể thao", "đọc sách")

# Hiển thị thông tin
manager.display_members()
manager.show_statistics()

# Tìm thành viên chung
print(f"\n🔍 TÌM KIẾM")
print("=" * 30)

# Thành viên vừa VIP vừa mới
vip_new = manager.vip_members.intersection(manager.new_members)
print(f"Thành viên vừa VIP vừa mới: {vip_new}")

# Thành viên không phải VIP
regular_members = manager.members - manager.vip_members
print(f"Thành viên thường: {regular_members}")

# Tất cả loại thành viên
all_special = manager.vip_members.union(manager.new_members)
print(f"Tất cả VIP và mới: {all_special}")
```

## 🎯 Bài Tập Thực Hành

### 🥇 Bài Tập 1: Hệ Thống Quản Lý Từ Vựng

```python
# TODO: Tạo hệ thống quản lý từ vựng với sets
def create_vocabulary_dictionary():
    """Tạo từ điển từ vựng với sets"""
    
    # Set chứa tất cả từ vựng
    all_vocabulary = set()
    
    # Set chứa từ vựng theo chủ đề
    vocabulary_by_topic = {
        "lập trình": set(),
        "toán học": set(),
        "khoa học": set(),
        "nghệ thuật": set(),
        "thể thao": set()
    }
    
    # Set chứa từ vựng theo độ khó
    vocabulary_by_difficulty = {
        "dễ": set(),
        "trung bình": set(),
        "khó": set()
    }
    
    return all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty

def add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, word, topic, difficulty):
    """Thêm từ vựng mới"""
    all_vocabulary.add(word)
    
    if topic in vocabulary_by_topic:
        vocabulary_by_topic[topic].add(word)
    
    if difficulty in vocabulary_by_difficulty:
        vocabulary_by_difficulty[difficulty].add(word)
    
    print(f"✅ Đã thêm từ: {word} ({topic}, {difficulty})")

def find_common_vocabulary(vocabulary_by_topic, *topic_list):
    """Tìm từ vựng chung giữa các chủ đề"""
    if not topic_list:
        return set()
    
    # Tìm giao của tất cả chủ đề
    result = vocabulary_by_topic[topic_list[0]].copy()
    for topic in topic_list[1:]:
        if topic in vocabulary_by_topic:
            result = result.intersection(vocabulary_by_topic[topic])
    
    return result

def show_vocabulary_statistics(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty):
    """Thống kê từ vựng"""
    print("\n📊 THỐNG KÊ TỪ VỰNG")
    print("=" * 40)
    
    print(f"📚 Tổng từ vựng: {len(all_vocabulary)}")
    
    print(f"\n🎯 Theo chủ đề:")
    for topic, word_set in vocabulary_by_topic.items():
        print(f"   {topic}: {len(word_set)} từ")
    
    print(f"\n📈 Theo độ khó:")
    for difficulty, word_set in vocabulary_by_difficulty.items():
        print(f"   {difficulty}: {len(word_set)} từ")
    
    # Từ vựng phổ biến (có trong nhiều chủ đề)
    popular_words = set()
    for topic, word_set in vocabulary_by_topic.items():
        popular_words = popular_words.union(word_set)
    
    print(f"\n🌟 Từ vựng phổ biến: {len(popular_words)} từ")

def display_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty):
    """Hiển thị từ vựng"""
    print("\n📚 TỪ VỰNG THEO CHỦ ĐỀ")
    print("=" * 50)
    
    for topic, word_set in vocabulary_by_topic.items():
        if word_set:
            print(f"\n🎯 {topic.upper()} ({len(word_set)} từ):")
            for word in sorted(word_set):
                print(f"   • {word}")
    
    print(f"\n📈 TỪ VỰNG THEO ĐỘ KHÓ")
    print("=" * 30)
    
    for difficulty, word_set in vocabulary_by_difficulty.items():
        if word_set:
            print(f"\n{difficulty.upper()} ({len(word_set)} từ):")
            for word in sorted(word_set):
                print(f"   • {word}")

# Sử dụng hệ thống
all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty = create_vocabulary_dictionary()

# Thêm từ vựng
add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, "variable", "lập trình", "dễ")
add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, "function", "lập trình", "trung bình")
add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, "algorithm", "lập trình", "khó")
add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, "equation", "toán học", "trung bình")
add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, "calculus", "toán học", "khó")
add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, "gravity", "khoa học", "trung bình")
add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, "quantum", "khoa học", "khó")
add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, "painting", "nghệ thuật", "dễ")
add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, "sculpture", "nghệ thuật", "trung bình")
add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, "football", "thể thao", "dễ")
add_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty, "basketball", "thể thao", "dễ")

# Hiển thị thông tin
display_vocabulary(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty)
show_vocabulary_statistics(all_vocabulary, vocabulary_by_topic, vocabulary_by_difficulty)

# Tìm từ vựng chung
print(f"\n🔍 TÌM KIẾM")
print("=" * 30)

# Từ vựng khó
hard_words = vocabulary_by_difficulty["khó"]
print(f"Từ vựng khó: {hard_words}")

# Từ vựng chung giữa lập trình và toán học
common_words = find_common_vocabulary(vocabulary_by_topic, "lập trình", "toán học")
print(f"Từ chung (lập trình + toán): {common_words}")

# Từ vựng chỉ có trong một chủ đề
unique_programming_words = vocabulary_by_topic["lập trình"] - vocabulary_by_topic["toán học"] - vocabulary_by_topic["khoa học"]
print(f"Từ riêng lập trình: {unique_programming_words}")
```

### 🥈 Bài Tập 2: Game Đoán Từ Với Sets

```python
# TODO: Tạo game đoán từ với sets
import random

def create_word_guessing_game():
    """Tạo game đoán từ với sets"""
    
    # Set chứa tất cả từ
    all_words = {
        "python", "programming", "computer", "algorithm", "function",
        "variable", "loop", "condition", "string", "number",
        "list", "dictionary", "class", "object", "method"
    }
    
    # Set chứa từ đã đoán
    guessed_words = set()
    
    # Set chứa ký tự đã đoán
    guessed_letters = set()
    
    return all_words, guessed_words, guessed_letters

def choose_random_word(all_words):
    """Chọn từ ngẫu nhiên"""
    return random.choice(list(all_words))

def display_hidden_word(word_to_guess, guessed_letters):
    """Hiển thị từ ẩn với ký tự đã đoán"""
    display = ""
    for letter in word_to_guess:
        if letter in guessed_letters:
            display += letter
        else:
            display += "_"
    return display

def check_letter_in_word(word_to_guess, letter):
    """Kiểm tra ký tự có trong từ không"""
    return letter in word_to_guess

def calculate_score(word_to_guess, attempts_count, guessed_letters):
    """Tính điểm dựa trên hiệu suất"""
    correct_letters = len(guessed_letters.intersection(set(word_to_guess)))
    wrong_letters = len(guessed_letters - set(word_to_guess))
    
    base_score = len(word_to_guess) * 10
    bonus_score = correct_letters * 5
    penalty_wrong = wrong_letters * 2
    penalty_attempts = attempts_count * 1
    
    total_score = base_score + bonus_score - penalty_wrong - penalty_attempts
    return max(0, total_score)

def word_guessing_game():
    """Game đoán từ chính"""
    print("🎮 GAME ĐOÁN TỪ VỰNG LẬP TRÌNH")
    print("=" * 50)
    
    all_words, guessed_words, guessed_letters = create_word_guessing_game()
    word_to_guess = choose_random_word(all_words)
    attempts_count = 0
    max_attempts = len(word_to_guess) + 5
    
    print(f"Từ có {len(word_to_guess)} chữ cái")
    print(f"Bạn có {max_attempts} lần đoán")
    print("Gõ 'quit' để thoát, 'hint' để gợi ý")
    print("-" * 50)
    
    while attempts_count < max_attempts:
        attempts_count += 1
        
        # Hiển thị từ ẩn
        hidden_word = display_hidden_word(word_to_guess, guessed_letters)
        print(f"\n🔤 Lần thử {attempts_count}/{max_attempts}")
        print(f"Từ: {hidden_word}")
        
        # Hiển thị ký tự đã đoán
        if guessed_letters:
            letters_str = ", ".join(sorted(guessed_letters))
            print(f"Ký tự đã đoán: {letters_str}")
        
        # Nhập ký tự
        try:
            user_input = input("Nhập ký tự hoặc từ: ").lower().strip()
            
            if user_input == 'quit':
                print("👋 Tạm biệt!")
                break
            
            if user_input == 'hint':
                # Gợi ý: hiển thị một ký tự chưa đoán
                unguessed_letters = set(word_to_guess) - guessed_letters
                if unguessed_letters:
                    hint_letter = random.choice(list(unguessed_letters))
                    print(f"💡 Gợi ý: Từ có chứa ký tự '{hint_letter}'")
                else:
                    print("💡 Bạn đã đoán hết ký tự rồi!")
                attempts_count -= 1
                continue
            
            # Kiểm tra từ hoàn chỉnh
            if len(user_input) > 1:
                if user_input == word_to_guess:
                    print("🎉 CHÍNH XÁC! Bạn đã đoán đúng từ!")
                    score = calculate_score(word_to_guess, attempts_count, guessed_letters)
                    print(f"🏆 Điểm: {score}")
                    break
                else:
                    print("❌ Từ không đúng!")
                    continue
            
            # Kiểm tra ký tự
            if len(user_input) == 1:
                if user_input in guessed_letters:
                    print("⚠️  Bạn đã đoán ký tự này rồi!")
                    attempts_count -= 1
                    continue
                
                guessed_letters.add(user_input)
                
                if check_letter_in_word(word_to_guess, user_input):
                    print("✅ Đúng! Ký tự có trong từ")
                    
                    # Kiểm tra đã đoán hết chưa
                    if set(word_to_guess).issubset(guessed_letters):
                        print("🎉 HOÀN THÀNH! Bạn đã đoán hết ký tự!")
                        score = calculate_score(word_to_guess, attempts_count, guessed_letters)
                        print(f"🏆 Điểm: {score}")
                        break
                else:
                    print("❌ Sai! Ký tự không có trong từ")
            else:
                print("❌ Vui lòng nhập 1 ký tự hoặc từ hoàn chỉnh!")
                attempts_count -= 1
        
        except KeyboardInterrupt:
            print("\n👋 Tạm biệt!")
            break
    
    else:
        print(f"\n💔 HẾT LƯỢT! Từ đúng là: {word_to_guess}")
        score = calculate_score(word_to_guess, attempts_count, guessed_letters)
        print(f"🏆 Điểm: {score}")

# Chạy game
word_guessing_game()
```

## 🎊 Tóm Tắt

Trong bài này, bạn đã học được:

✅ **Set là gì** - Cấu trúc dữ liệu unique, không thứ tự  
✅ **Tạo set** - `{}`, `set()`, từ list/string  
✅ **Thao tác cơ bản** - `add()`, `remove()`, `discard()`, `clear()`  
✅ **Phép toán tập hợp** - Union, Intersection, Difference, Symmetric Difference  
✅ **Ứng dụng thực tế** - Quản lý thành viên, từ vựng, game  
✅ **Tối ưu tìm kiếm** - O(1) lookup time  

## 🚀 Bước Tiếp Theo

Tuyệt vời! Bây giờ bạn đã hoàn thành **tất cả cấu trúc dữ liệu cơ bản** của Python! Tiếp theo, chúng ta sẽ tạo [Guessing Game Project](/python/projects/guessing-game) - một dự án thú vị áp dụng tất cả kiến thức đã học!

:::tip 🎯 Thử Thách Nhỏ
Hãy thử tạo một "hệ thống quản lý thẻ thành viên" sử dụng sets! Mỗi thành viên có thể có nhiều thẻ (VIP, Student, Senior), tìm thành viên có thẻ chung, và thống kê các loại thẻ!
:::

---

*🔗 **Dự án tiếp theo**: [Guessing Game - Dự Án Thứ Hai](/python/projects/guessing-game)*

