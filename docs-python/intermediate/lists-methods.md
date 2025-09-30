---
sidebar_position: 5
title: "🛠️ Phương Thức Của List - Công Cụ Mạnh Mẽ Cho Danh Sách"
description: "Học các phương thức mạnh mẽ của danh sách Python: sort, reverse, copy, và nhiều hơn nữa. Biến danh sách thành công cụ siêu mạnh!"
keywords: ["python", "list methods", "sort", "reverse", "copy", "extend", "count", "index", "phương thức"]
---

# 🛠️ Phương Thức Của List - Công Cụ Mạnh Mẽ Cho Danh Sách

:::tip 🛠️ Ví Dụ Dễ Hiểu
Hãy tưởng tượng danh sách như một **hộp công cụ đa năng**! Mỗi phương thức (method) là một **công cụ chuyên biệt** giúp bạn sắp xếp, tìm kiếm, sao chép và biến đổi danh sách theo ý muốn!
:::

## 🤔 Phương Thức Là Gì?

**Phương thức (Method)** là những **chức năng đặc biệt** mà Python đã tích hợp sẵn cho danh sách. Thay vì bạn phải tự viết code phức tạp, chỉ cần gọi tên phương thức là xong!

```mermaid
graph LR
    A[📚 Danh Sách] --> B[🛠️ Phương Thức]
    B --> C[📊 sort() - Sắp xếp]
    B --> D[🔄 reverse() - Đảo ngược]
    B --> E[🔍 index() - Tìm vị trí]
    B --> F[📋 copy() - Sao chép]
    B --> G[➕ extend() - Mở rộng]
    
    style A fill:#FFE4B5
    style B fill:#98FB98
    style C fill:#87CEEB
    style D fill:#DDA0DD
    style E fill:#FFD700
    style F fill:#FFA07A
    style G fill:#90EE90
```

## 📊 Sắp Xếp Danh Sách

### 🔢 Sort - Sắp Xếp Tăng Dần

```python
# Sắp xếp số
math_scores = [8.5, 6.0, 9.5, 7.0, 8.0]
print("Trước khi sắp xếp:", math_scores)

math_scores.sort()  # Sắp xếp tại chỗ (in-place)
print("Sau khi sắp xếp:", math_scores)  # [6.0, 7.0, 8.0, 8.5, 9.5]

# Sắp xếp tên
student_names = ["Châu", "An", "Bình", "Dung", "Em"]
print("Trước:", student_names)

student_names.sort()
print("Sau:", student_names)  # ['An', 'Bình', 'Châu', 'Dung', 'Em']
```

### 📉 Sort Reverse - Sắp Xếp Giảm Dần

```python
# Sắp xếp từ cao xuống thấp
math_scores = [8.5, 6.0, 9.5, 7.0, 8.0]
math_scores.sort(reverse=True)
print("Điểm từ cao xuống thấp:", math_scores)  # [9.5, 8.5, 8.0, 7.0, 6.0]

# Sắp xếp tên theo thứ tự ngược alphabet
student_names = ["An", "Bình", "Châu", "Dung", "Em"]
student_names.sort(reverse=True)
print("Tên ngược alphabet:", student_names)  # ['Em', 'Dung', 'Châu', 'Bình', 'An']
```

### 🎯 Sorted - Tạo Danh Sách Mới (Không Thay Đổi Gốc)

```python
# Danh sách gốc không thay đổi
original_scores = [8.5, 6.0, 9.5, 7.0, 8.0]
sorted_scores = sorted(original_scores)

print("Danh sách gốc:", original_scores)      # [8.5, 6.0, 9.5, 7.0, 8.0]
print("Danh sách mới:", sorted_scores)        # [6.0, 7.0, 8.0, 8.5, 9.5]

# Sắp xếp giảm dần
descending_scores = sorted(original_scores, reverse=True)
print("Sắp xếp giảm:", descending_scores)     # [9.5, 8.5, 8.0, 7.0, 6.0]
```

## 🔄 Đảo Ngược Danh Sách

### 🔃 Reverse - Đảo Ngược Tại Chỗ

```python
# Đảo ngược thứ tự
ordered_numbers = [1, 2, 3, 4, 5]
print("Trước:", ordered_numbers)

ordered_numbers.reverse()
print("Sau:", ordered_numbers)  # [5, 4, 3, 2, 1]

# Đảo ngược tên
class_names = ["An", "Bình", "Châu", "Dung"]
class_names.reverse()
print("Tên đảo ngược:", class_names)  # ['Dung', 'Châu', 'Bình', 'An']
```

### 🔄 Reversed - Tạo Iterator Đảo Ngược

```python
# Tạo iterator đảo ngược (không thay đổi gốc)
original_numbers = [1, 2, 3, 4, 5]
reversed_numbers = list(reversed(original_numbers))

print("Gốc:", original_numbers)         # [1, 2, 3, 4, 5]
print("Đảo ngược:", reversed_numbers)   # [5, 4, 3, 2, 1]
```

## 📋 Sao Chép Danh Sách

### 📄 Copy - Tạo Bản Sao Nông

```python
# Tạo bản sao
original_list = ["An", "Bình", "Châu"]
copied_list = original_list.copy()

print("Gốc:", original_list)
print("Sao:", copied_list)

# Thay đổi bản sao không ảnh hưởng gốc
copied_list.append("Dung")
print("Gốc sau khi thay đổi sao:", original_list)  # ['An', 'Bình', 'Châu']
print("Sao sau khi thay đổi:", copied_list)        # ['An', 'Bình', 'Châu', 'Dung']
```

### 🔗 Các Cách Sao Chép Khác

```python
original_list = [1, 2, 3, 4, 5]

# Cách 1: copy()
copy_1 = original_list.copy()

# Cách 2: list()
copy_2 = list(original_list)

# Cách 3: slicing
copy_3 = original_list[:]

# Cách 4: list comprehension
copy_4 = [x for x in original_list]

print("Tất cả bản sao giống nhau:", copy_1 == copy_2 == copy_3 == copy_4)  # True
```

## 🔍 Tìm Kiếm Nâng Cao

### 📍 Index - Tìm Vị Trí

```python
subjects = ["Toán", "Lý", "Hóa", "Văn", "Anh", "Lý"]

# Tìm vị trí đầu tiên
physics_position = subjects.index("Lý")
print(f"Lý ở vị trí: {physics_position}")  # 1

# Tìm với phạm vi
physics_position_2 = subjects.index("Lý", 2)  # Tìm từ vị trí 2
print(f"Lý thứ 2 ở vị trí: {physics_position_2}")  # 5

# Xử lý lỗi khi không tìm thấy
try:
    biology_position = subjects.index("Sinh")
except ValueError:
    print("Không tìm thấy môn Sinh")
```

### 🔢 Count - Đếm Số Lần Xuất Hiện

```python
exam_scores = [8.5, 7.0, 8.5, 6.0, 8.5, 7.0, 9.0]

# Đếm số lần xuất hiện
count_8_5 = exam_scores.count(8.5)
count_7_0 = exam_scores.count(7.0)
count_10 = exam_scores.count(10.0)

print(f"Điểm 8.5 xuất hiện {count_8_5} lần")  # 3
print(f"Điểm 7.0 xuất hiện {count_7_0} lần")  # 2
print(f"Điểm 10.0 xuất hiện {count_10} lần")  # 0

# Đếm trong danh sách tên
class_names = ["An", "Bình", "An", "Châu", "An", "Dung"]
count_an = class_names.count("An")
print(f"Có {count_an} bạn tên An")  # 3
```

## ➕ Mở Rộng Danh Sách

### 🔗 Extend - Nối Nhiều Phần Tử

```python
# Danh sách ban đầu
semester_1_subjects = ["Toán", "Lý", "Hóa"]
semester_2_subjects = ["Văn", "Anh", "Sử"]

print("Học kỳ 1:", semester_1_subjects)

# Nối danh sách học kỳ 2
semester_1_subjects.extend(semester_2_subjects)
print("Cả năm:", semester_1_subjects)  # ['Toán', 'Lý', 'Hóa', 'Văn', 'Anh', 'Sử']

# Nối với danh sách khác
additional_subjects = ["Địa", "Sinh"]
semester_1_subjects.extend(additional_subjects)
print("Đầy đủ:", semester_1_subjects)
```

### 🆚 So Sánh Extend vs Append

```python
# Extend - thêm từng phần tử
list_1 = [1, 2, 3]
list_1.extend([4, 5])
print("Extend:", list_1)  # [1, 2, 3, 4, 5]

# Append - thêm toàn bộ như 1 phần tử
list_2 = [1, 2, 3]
list_2.append([4, 5])
print("Append:", list_2)  # [1, 2, 3, [4, 5]]
```

## 🎪 Ví Dụ Thực Tế: Hệ Thống Quản Lý Thư Viện

```python
# 📚 Hệ thống quản lý thư viện với các phương thức list
class Library:
    def __init__(self):
        self.available_books = []
        self.borrowed_books = []
        self.borrowers = []
    
    def add_new_book(self, book_title):
        """Thêm sách mới vào thư viện"""
        if book_title not in self.available_books:
            self.available_books.append(book_title)
            print(f"✅ Đã thêm sách: {book_title}")
        else:
            print(f"⚠️  Sách '{book_title}' đã có trong thư viện")
    
    def borrow_book(self, book_title, borrower_name):
        """Cho mượn sách"""
        if book_title in self.available_books:
            # Chuyển sách từ có sẵn sang đã mượn
            self.available_books.remove(book_title)
            self.borrowed_books.append(book_title)
            self.borrowers.append(borrower_name)
            print(f"📖 {borrower_name} đã mượn sách: {book_title}")
        else:
            print(f"❌ Sách '{book_title}' không có sẵn")
    
    def return_book(self, book_title):
        """Trả sách"""
        if book_title in self.borrowed_books:
            book_index = self.borrowed_books.index(book_title)
            returned_borrower = self.borrowers.pop(book_index)
            self.borrowed_books.remove(book_title)
            self.available_books.append(book_title)
            print(f"📚 {returned_borrower} đã trả sách: {book_title}")
        else:
            print(f"❌ Sách '{book_title}' không có trong danh sách mượn")
    
    def display_books_by_category(self):
        """Hiển thị sách theo loại"""
        print("\n📋 BÁO CÁO THƯ VIỆN")
        print("=" * 50)
        
        # Sắp xếp sách theo alphabet
        sorted_available_books = sorted(self.available_books)
        sorted_borrowed_books = sorted(self.borrowed_books)
        
        print(f"📚 Sách có sẵn ({len(sorted_available_books)} cuốn):")
        for i, book in enumerate(sorted_available_books, 1):
            print(f"   {i}. {book}")
        
        print(f"\n📖 Sách đã mượn ({len(sorted_borrowed_books)} cuốn):")
        for i, book in enumerate(sorted_borrowed_books, 1):
            print(f"   {i}. {book}")
    
    def search_books(self, keyword):
        """Tìm sách theo từ khóa"""
        search_results = []
        keyword_lower = keyword.lower()
        
        # Tìm trong sách có sẵn
        for book in self.available_books:
            if keyword_lower in book.lower():
                search_results.append(f"📚 {book} (có sẵn)")
        
        # Tìm trong sách đã mượn
        for book in self.borrowed_books:
            if keyword_lower in book.lower():
                search_results.append(f"📖 {book} (đã mượn)")
        
        if search_results:
            print(f"🔍 Kết quả tìm kiếm '{keyword}':")
            for result_item in search_results:
                print(f"   {result_item}")
        else:
            print(f"😅 Không tìm thấy sách nào chứa '{keyword}'")
    
    def show_statistics(self):
        """Thống kê thư viện"""
        print("\n📊 THỐNG KÊ THƯ VIỆN")
        print("=" * 30)
        print(f"📚 Tổng số sách: {len(self.available_books) + len(self.borrowed_books)}")
        print(f"📖 Sách có sẵn: {len(self.available_books)}")
        print(f"📋 Sách đã mượn: {len(self.borrowed_books)}")
        
        if self.borrowers:
            # Đếm số lần mượn của mỗi người
            unique_borrowers = list(set(self.borrowers))
            print(f"👥 Số người đang mượn: {len(unique_borrowers)}")
            
            # Tìm người mượn nhiều nhất
            borrow_counts = [self.borrowers.count(borrower) for borrower in unique_borrowers]
            max_borrows = max(borrow_counts)
            top_borrower = unique_borrowers[borrow_counts.index(max_borrows)]
            print(f"🏆 Người mượn nhiều nhất: {top_borrower} ({max_borrows} cuốn)")

# Sử dụng hệ thống thư viện
library = Library()

# Thêm sách
new_books = ["Python Programming", "Data Science", "Machine Learning", "Web Development", "Python Programming"]
for book in new_books:
    library.add_new_book(book)

# Mượn sách
library.borrow_book("Python Programming", "An")
library.borrow_book("Data Science", "Bình")
library.borrow_book("Machine Learning", "Châu")

# Hiển thị trạng thái
library.display_books_by_category()

# Tìm kiếm
library.search_books("Python")

# Thống kê
library.show_statistics()
```

## 🎯 Bài Tập Thực Hành

### 🥇 Bài Tập 1: Sắp Xếp Điểm Số

```python
# TODO: Tạo chương trình sắp xếp và phân tích điểm số
import random

# Tạo danh sách điểm ngẫu nhiên
exam_scores = [random.uniform(5.0, 10.0) for _ in range(20)]
exam_scores = [round(score, 1) for score in exam_scores]  # Làm tròn 1 chữ số

print("📊 PHÂN TÍCH ĐIỂM SỐ LỚP HỌC")
print("=" * 40)

# Hiển thị điểm gốc
print("Điểm gốc:", exam_scores)

# Tạo bản sao để sắp xếp
ascending_scores = exam_scores.copy()
descending_scores = exam_scores.copy()

# Sắp xếp tăng dần
ascending_scores.sort()
print(f"\n📈 Điểm tăng dần: {ascending_scores}")

# Sắp xếp giảm dần
descending_scores.sort(reverse=True)
print(f"📉 Điểm giảm dần: {descending_scores}")

# Thống kê
print(f"\n📊 THỐNG KÊ:")
print(f"   Điểm cao nhất: {max(exam_scores)}")
print(f"   Điểm thấp nhất: {min(exam_scores)}")
print(f"   Điểm trung bình: {sum(exam_scores)/len(exam_scores):.1f}")

# Đếm theo mức điểm
excellent_scores = [score for score in exam_scores if score >= 8.0]
good_scores = [score for score in exam_scores if 6.5 <= score < 8.0]
average_scores = [score for score in exam_scores if 5.0 <= score < 6.5]
poor_scores = [score for score in exam_scores if score < 5.0]

print(f"   Giỏi (≥8.0): {len(excellent_scores)} HS")
print(f"   Khá (6.5-7.9): {len(good_scores)} HS")
print(f"   TB (5.0-6.4): {len(average_scores)} HS")
print(f"   Yếu (<5.0): {len(poor_scores)} HS")
```

### 🥈 Bài Tập 2: Game Đoán Từ

```python
# TODO: Tạo game đoán từ với danh sách từ vựng
import random

# Danh sách từ vựng
vocabulary = [
    "python", "programming", "computer", "algorithm", "function",
    "variable", "loop", "condition", "string", "number",
    "list", "dictionary", "class", "object", "method"
]

# Chọn từ ngẫu nhiên
target_word = random.choice(vocabulary)
guessed_words = []
attempt_count = 0
max_attempts = len(target_word) + 3

print("🎯 GAME ĐOÁN TỪ VỰNG LẬP TRÌNH")
print("=" * 40)
print(f"Từ có {len(target_word)} chữ cái")
print(f"Bạn có {max_attempts} lần đoán")
print("Gõ 'quit' để thoát")
print("-" * 40)

while attempt_count < max_attempts:
    attempt_count += 1
    print(f"\n🔤 Lần thử {attempt_count}/{max_attempts}")
    
    # Hiển thị từ đã đoán
    if guessed_words:
        print(f"Từ đã đoán: {', '.join(guessed_words)}")
    
    # Nhập từ đoán
    guessed_word = input("Nhập từ bạn đoán: ").lower().strip()
    
    if guessed_word == 'quit':
        print("👋 Tạm biệt!")
        break
    
    if guessed_word == target_word:
        print("🎉 CHÍNH XÁC! Bạn đã đoán đúng!")
        print(f"🏆 Từ đúng là: {target_word.upper()}")
        print(f"📊 Số lần thử: {attempt_count}")
        
        # Đánh giá
        if attempt_count <= 3:
            print("🌟 XUẤT SẮC! Bạn thật giỏi!")
        elif attempt_count <= 5:
            print("👍 RẤT TỐT! Kỹ năng ổn định!")
        else:
            print("😊 KHÔNG SAO! Lần sau sẽ tốt hơn!")
        break
    
    elif guessed_word in guessed_words:
        print("⚠️  Bạn đã đoán từ này rồi!")
        attempt_count -= 1  # Không tính lần thử này
    
    elif len(guessed_word) != len(target_word):
        print(f"❌ Từ phải có {len(target_word)} chữ cái!")
        attempt_count -= 1
    
    elif guessed_word not in vocabulary:
        print("❌ Từ này không có trong danh sách từ vựng!")
        attempt_count -= 1
    
    else:
        guessed_words.append(guessed_word)
        
        # Đếm số chữ cái đúng vị trí
        correct_positions = 0
        for i in range(len(target_word)):
            if guessed_word[i] == target_word[i]:
                correct_positions += 1
        
        print(f"📊 Có {correct_positions}/{len(target_word)} chữ cái đúng vị trí")
        
        if correct_positions == 0:
            print("😅 Chưa có chữ cái nào đúng vị trí!")
        elif correct_positions < len(target_word) // 2:
            print("🤔 Một vài chữ cái đúng, cố gắng thêm!")
        else:
            print("🔥 Gần đúng rồi, cố lên!")

else:
    print(f"\n💔 HẾT LƯỢT! Từ đúng là: {target_word.upper()}")
    print("🎯 Lần sau hãy thử chiến lược khác nhé!")

# Hiển thị tất cả từ đã đoán
if guessed_words:
    print(f"\n📝 Tất cả từ đã đoán: {', '.join(guessed_words)}")
```

### 🥉 Bài Tập 3: Quản Lý Danh Sách Nhạc

```python
# TODO: Tạo ứng dụng quản lý playlist nhạc
class PlaylistManager:
    def __init__(self):
        self.playlist = []
        self.artists = []
        self.genres = []
    
    def add_song(self, song_title, artist_name, genre):
        """Thêm bài hát mới"""
        song = {
            'title': song_title,
            'artist': artist_name,
            'genre': genre
        }
        
        if song not in self.playlist:
            self.playlist.append(song)
            if artist_name not in self.artists:
                self.artists.append(artist_name)
            if genre not in self.genres:
                self.genres.append(genre)
            print(f"✅ Đã thêm: {song_title} - {artist_name}")
        else:
            print(f"⚠️  Bài hát đã có trong playlist")
    
    def remove_song(self, song_title):
        """Xóa bài hát"""
        for i, song in enumerate(self.playlist):
            if song['title'].lower() == song_title.lower():
                removed_song = self.playlist.pop(i)
                print(f"🗑️  Đã xóa: {removed_song['title']} - {removed_song['artist']}")
                return
        print(f"❌ Không tìm thấy bài hát: {song_title}")
    
    def sort_by_title(self):
        """Sắp xếp theo tên bài hát"""
        self.playlist.sort(key=lambda x: x['title'].lower())
        print("📝 Đã sắp xếp theo tên bài hát")
    
    def sort_by_artist(self):
        """Sắp xếp theo tên ca sĩ"""
        self.playlist.sort(key=lambda x: x['artist'].lower())
        print("🎤 Đã sắp xếp theo tên ca sĩ")
    
    def search_songs(self, keyword):
        """Tìm bài hát theo từ khóa"""
        search_results = []
        keyword_lower = keyword.lower()
        
        for song in self.playlist:
            if (keyword_lower in song['title'].lower() or 
                keyword_lower in song['artist'].lower() or 
                keyword_lower in song['genre'].lower()):
                search_results.append(song)
        
        if search_results:
            print(f"🔍 Tìm thấy {len(search_results)} bài hát:")
            for song in search_results:
                print(f"   🎵 {song['title']} - {song['artist']} ({song['genre']})")
        else:
            print(f"😅 Không tìm thấy bài hát nào chứa '{keyword}'")
    
    def filter_by_genre(self, genre):
        """Lọc bài hát theo thể loại"""
        songs_by_genre = [song for song in self.playlist if song['genre'].lower() == genre.lower()]
        
        if songs_by_genre:
            print(f"🎭 Bài hát thể loại '{genre}':")
            for song in songs_by_genre:
                print(f"   🎵 {song['title']} - {song['artist']}")
        else:
            print(f"😅 Không có bài hát nào thuộc thể loại '{genre}'")
    
    def display_playlist(self):
        """Hiển thị toàn bộ playlist"""
        if not self.playlist:
            print("📝 Playlist trống")
            return
        
        print(f"\n🎵 PLAYLIST ({len(self.playlist)} bài)")
        print("=" * 50)
        
        for i, song in enumerate(self.playlist, 1):
            print(f"{i:2d}. {song['title']} - {song['artist']} ({song['genre']})")
    
    def show_statistics(self):
        """Thống kê playlist"""
        if not self.playlist:
            print("📊 Playlist trống, không có thống kê")
            return
        
        print("\n📊 THỐNG KÊ PLAYLIST")
        print("=" * 30)
        print(f"🎵 Tổng số bài: {len(self.playlist)}")
        print(f"🎤 Số ca sĩ: {len(self.artists)}")
        print(f"🎭 Số thể loại: {len(self.genres)}")
        
        # Thống kê theo thể loại
        genre_counts = {}
        for song in self.playlist:
            genre = song['genre']
            genre_counts[genre] = genre_counts.get(genre, 0) + 1
        
        print(f"\n🎭 Phân bố theo thể loại:")
        for genre, count in sorted(genre_counts.items()):
            print(f"   {genre}: {count} bài")

# Sử dụng PlaylistManager
playlist = PlaylistManager()

# Thêm một số bài hát mẫu
sample_songs = [
    ("Shape of You", "Ed Sheeran", "Pop"),
    ("Blinding Lights", "The Weeknd", "Pop"),
    ("Watermelon Sugar", "Harry Styles", "Pop"),
    ("Levitating", "Dua Lipa", "Pop"),
    ("Good 4 U", "Olivia Rodrigo", "Pop Rock"),
    ("Industry Baby", "Lil Nas X", "Hip Hop"),
    ("Stay", "The Kid LAROI", "Pop"),
    ("Heat Waves", "Glass Animals", "Indie"),
    ("Bad Habits", "Ed Sheeran", "Pop"),
    ("Peaches", "Justin Bieber", "Pop")
]

for title, artist, genre in sample_songs:
    playlist.add_song(title, artist, genre)

# Hiển thị playlist
playlist.display_playlist()

# Thống kê
playlist.show_statistics()

# Tìm kiếm
playlist.search_songs("Ed")

# Lọc theo thể loại
playlist.filter_by_genre("Pop")

# Sắp xếp
playlist.sort_by_title()
playlist.display_playlist()
```

## 🎊 Tóm Tắt

Trong bài này, bạn đã học được:

✅ **Sắp xếp danh sách** - `sort()`, `sorted()`, `reverse=True`  
✅ **Đảo ngược** - `reverse()`, `reversed()`  
✅ **Sao chép** - `copy()`, `list()`, slicing  
✅ **Tìm kiếm nâng cao** - `index()`, `count()`  
✅ **Mở rộng** - `extend()` vs `append()`  
✅ **Ứng dụng thực tế** - Thư viện, playlist, game  

## 🚀 Bước Tiếp Theo

Tuyệt vời! Bây giờ bạn đã thành thạo **tất cả công cụ mạnh mẽ** của danh sách! Tiếp theo, chúng ta sẽ học về [Dictionaries (Từ Điển)](/python/intermediate/dictionaries) - cấu trúc dữ liệu **key-value** siêu mạnh mẽ!

:::tip 🎯 Thử Thách Nhỏ
Hãy thử tạo một "hệ thống quản lý điểm danh lớp học" sử dụng tất cả phương thức list! Cho phép điểm danh, xem danh sách có mặt/vắng mặt, thống kê tỷ lệ chuyên cần, và tìm kiếm học sinh!
:::

---

*🔗 **Bài tiếp theo**: [Dictionaries - Cấu Trúc Key-Value Siêu Mạnh](/python/intermediate/dictionaries)*

