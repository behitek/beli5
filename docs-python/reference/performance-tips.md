# ⚡ Tối Ưu Hiệu Suất Python - Performance Tips

> **Tóm tắt**: Hướng dẫn tối ưu hiệu suất Python từ cơ bản đến nâng cao, bao gồm profiling, benchmarking và các kỹ thuật optimization thực chiến.

## 🎯 Tại Sao Cần Tối Ưu Performance?

Hãy tưởng tượng bạn đang chạy marathon 🏃‍♂️. Nếu bạn mang theo ba lô nặng 20kg, giày không vừa và chạy sai technique... bạn sẽ rất chậm và mệt!

Code cũng vậy! Performance optimization như "training" để code chạy nhanh hơn, ít tốn tài nguyên hơn. Điều quan trọng: **"Premature optimization is the root of all evil"** - chỉ optimize khi thật sự cần thiết!

---

## 📊 1. PROFILING - ĐO LƯỜNG PERFORMANCE

### Basic Timing
```python
import time
import timeit
from functools import wraps

def timing_decorator(func):
    """Decorator đo thời gian thực thi function."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        print(f"{func.__name__} took {end_time - start_time:.4f} seconds")
        return result
    return wrapper

@timing_decorator
def slow_calculation():
    """Function chậm để test."""
    total = 0
    for i in range(1000000):
        total += i ** 2
    return total

# Sử dụng timeit cho micro-benchmarks
def compare_list_creation():
    """So sánh các cách tạo list."""
    
    # Method 1: For loop
    def create_with_loop():
        result = []
        for i in range(1000):
            result.append(i * 2)
        return result
    
    # Method 2: List comprehension
    def create_with_comprehension():
        return [i * 2 for i in range(1000)]
    
    # Method 3: Map
    def create_with_map():
        return list(map(lambda x: x * 2, range(1000)))
    
    # Benchmark
    loop_time = timeit.timeit(create_with_loop, number=1000)
    comp_time = timeit.timeit(create_with_comprehension, number=1000)
    map_time = timeit.timeit(create_with_map, number=1000)
    
    print(f"For loop: {loop_time:.4f}s")
    print(f"List comprehension: {comp_time:.4f}s") 
    print(f"Map: {map_time:.4f}s")

compare_list_creation()
```

### Professional Profiling
```python
import cProfile
import pstats
from pstats import SortKey

def profile_function(func, *args, **kwargs):
    """Profile một function và hiển thị kết quả."""
    profiler = cProfile.Profile()
    profiler.enable()
    
    # Chạy function
    result = func(*args, **kwargs)
    
    profiler.disable()
    
    # Phân tích kết quả
    stats = pstats.Stats(profiler)
    stats.sort_stats(SortKey.TIME)
    
    print("=== TOP 10 SLOWEST FUNCTIONS ===")
    stats.print_stats(10)
    
    return result

# Ví dụ function phức tạp để profile
def complex_student_processing():
    """Xử lý dữ liệu học sinh phức tạp."""
    students = []
    
    # Tạo dữ liệu
    for i in range(10000):
        student = {
            'id': f'SV{i:05d}',
            'name': f'Student {i}',
            'scores': [random.randint(0, 10) for _ in range(10)]
        }
        students.append(student)
    
    # Xử lý dữ liệu
    processed = []
    for student in students:
        avg_score = sum(student['scores']) / len(student['scores'])
        grade = 'A' if avg_score >= 8 else 'B' if avg_score >= 6 else 'C'
        
        processed.append({
            'id': student['id'],
            'name': student['name'],
            'average': avg_score,
            'grade': grade
        })
    
    return processed

# Profile function
import random
# result = profile_function(complex_student_processing)
```

### Memory Profiling
```python
import tracemalloc
import psutil
import os

def memory_profiler(func):
    """Decorator để đo memory usage."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Start tracing
        tracemalloc.start()
        
        # Get initial memory
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        # Run function
        result = func(*args, **kwargs)
        
        # Get final memory
        final_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        # Get tracemalloc stats
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()
        
        print(f"{func.__name__} Memory Usage:")
        print(f"  Initial: {initial_memory:.2f} MB")
        print(f"  Final: {final_memory:.2f} MB")
        print(f"  Difference: {final_memory - initial_memory:.2f} MB")
        print(f"  Peak traced: {peak / 1024 / 1024:.2f} MB")
        
        return result
    return wrapper

@memory_profiler
def memory_intensive_task():
    """Task tốn nhiều memory."""
    # Tạo list lớn
    big_list = [i for i in range(1000000)]
    
    # Tạo dictionary lớn
    big_dict = {i: f"value_{i}" for i in range(100000)}
    
    # Process data
    result = sum(big_list) + len(big_dict)
    
    return result

# memory_intensive_task()
```

---

## 🚀 2. DATA STRUCTURES OPTIMIZATION

### List vs Set vs Dict Performance
```python
import random
import time

def benchmark_data_structures():
    """So sánh performance của các data structures."""
    
    # Tạo test data
    test_data = list(range(100000))
    random.shuffle(test_data)
    
    # Setup data structures
    test_list = test_data.copy()
    test_set = set(test_data)
    test_dict = {item: True for item in test_data}
    
    # Test membership (in operator)
    search_items = random.sample(test_data, 1000)
    
    # List membership - O(n)
    start = time.perf_counter()
    for item in search_items:
        _ = item in test_list
    list_time = time.perf_counter() - start
    
    # Set membership - O(1)
    start = time.perf_counter()
    for item in search_items:
        _ = item in test_set
    set_time = time.perf_counter() - start
    
    # Dict membership - O(1)
    start = time.perf_counter()
    for item in search_items:
        _ = item in test_dict
    dict_time = time.perf_counter() - start
    
    print("Membership Testing (1000 lookups):")
    print(f"List (O(n)): {list_time:.4f}s")
    print(f"Set (O(1)): {set_time:.4f}s")
    print(f"Dict (O(1)): {dict_time:.4f}s")
    print(f"Set is {list_time/set_time:.1f}x faster than list")

# benchmark_data_structures()

def optimize_student_lookup():
    """Tối ưu việc tìm kiếm học sinh."""
    
    # ❌ Slow approach - list of dicts
    students_list = [
        {'id': f'SV{i:05d}', 'name': f'Student {i}', 'grade': random.randint(0, 10)}
        for i in range(10000)
    ]
    
    def find_student_slow(student_id):
        for student in students_list:
            if student['id'] == student_id:
                return student
        return None
    
    # ✅ Fast approach - dict lookup
    students_dict = {
        f'SV{i:05d}': {'name': f'Student {i}', 'grade': random.randint(0, 10)}
        for i in range(10000)
    }
    
    def find_student_fast(student_id):
        return students_dict.get(student_id)
    
    # Benchmark
    test_ids = [f'SV{random.randint(0, 9999):05d}' for _ in range(1000)]
    
    start = time.perf_counter()
    for student_id in test_ids:
        find_student_slow(student_id)
    slow_time = time.perf_counter() - start
    
    start = time.perf_counter()
    for student_id in test_ids:
        find_student_fast(student_id)
    fast_time = time.perf_counter() - start
    
    print(f"Slow lookup: {slow_time:.4f}s")
    print(f"Fast lookup: {fast_time:.4f}s")
    print(f"Speedup: {slow_time/fast_time:.1f}x")

# optimize_student_lookup()
```

### Collections Module Optimizations
```python
from collections import deque, defaultdict, Counter, namedtuple
import time

def compare_list_vs_deque():
    """So sánh list vs deque cho operations ở đầu."""
    
    n = 100000
    
    # List - O(n) for insertions at beginning
    test_list = []
    start = time.perf_counter()
    for i in range(n):
        test_list.insert(0, i)  # O(n) operation
    list_time = time.perf_counter() - start
    
    # Deque - O(1) for insertions at both ends
    test_deque = deque()
    start = time.perf_counter()
    for i in range(n):
        test_deque.appendleft(i)  # O(1) operation
    deque_time = time.perf_counter() - start
    
    print(f"List insert at beginning: {list_time:.4f}s")
    print(f"Deque appendleft: {deque_time:.4f}s")
    print(f"Deque is {list_time/deque_time:.1f}x faster")

def use_defaultdict_efficiently():
    """Sử dụng defaultdict để tránh key checking."""
    
    # ❌ Slow approach - manual key checking
    student_grades = {}
    grades_data = [('SV001', 8), ('SV002', 9), ('SV001', 7), ('SV003', 6)]
    
    start = time.perf_counter()
    for student_id, grade in grades_data * 10000:
        if student_id not in student_grades:
            student_grades[student_id] = []
        student_grades[student_id].append(grade)
    slow_time = time.perf_counter() - start
    
    # ✅ Fast approach - defaultdict
    from collections import defaultdict
    student_grades_fast = defaultdict(list)
    
    start = time.perf_counter()
    for student_id, grade in grades_data * 10000:
        student_grades_fast[student_id].append(grade)  # No key checking needed
    fast_time = time.perf_counter() - start
    
    print(f"Manual key checking: {slow_time:.4f}s")
    print(f"defaultdict: {fast_time:.4f}s")
    print(f"Speedup: {slow_time/fast_time:.1f}x")

def use_counter_for_statistics():
    """Sử dụng Counter cho thống kê hiệu quả."""
    
    # Sample data - grades of many students
    all_grades = [random.choice(['A', 'B', 'C', 'D', 'F']) for _ in range(100000)]
    
    # ❌ Manual counting
    start = time.perf_counter()
    grade_counts = {}
    for grade in all_grades:
        if grade in grade_counts:
            grade_counts[grade] += 1
        else:
            grade_counts[grade] = 1
    manual_time = time.perf_counter() - start
    
    # ✅ Counter
    start = time.perf_counter()
    grade_counter = Counter(all_grades)
    counter_time = time.perf_counter() - start
    
    print(f"Manual counting: {manual_time:.4f}s")
    print(f"Counter: {counter_time:.4f}s")
    print(f"Most common grades: {grade_counter.most_common(3)}")

# compare_list_vs_deque()
# use_defaultdict_efficiently()
# use_counter_for_statistics()
```

---

## 🔄 3. ALGORITHM OPTIMIZATION

### Loop Optimization
```python
def optimize_loops():
    """Các kỹ thuật tối ưu loops."""
    
    # ❌ Slow: Function calls inside loop
    def slow_sum_of_squares(numbers):
        total = 0
        for num in numbers:
            total += pow(num, 2)  # Function call mỗi iteration
        return total
    
    # ✅ Fast: Avoid function calls
    def fast_sum_of_squares(numbers):
        total = 0
        for num in numbers:
            total += num * num  # Direct operation
        return total
    
    # ✅ Fastest: List comprehension + built-in sum
    def fastest_sum_of_squares(numbers):
        return sum(num * num for num in numbers)
    
    # Benchmark
    test_numbers = list(range(100000))
    
    slow_time = timeit.timeit(lambda: slow_sum_of_squares(test_numbers), number=10)
    fast_time = timeit.timeit(lambda: fast_sum_of_squares(test_numbers), number=10)
    fastest_time = timeit.timeit(lambda: fastest_sum_of_squares(test_numbers), number=10)
    
    print(f"Slow (with pow): {slow_time:.4f}s")
    print(f"Fast (direct): {fast_time:.4f}s")
    print(f"Fastest (comprehension): {fastest_time:.4f}s")

def optimize_string_operations():
    """Tối ưu string operations."""
    
    # ❌ Slow: String concatenation in loop
    def slow_string_building(items):
        result = ""
        for item in items:
            result += str(item) + ", "  # Creates new string each time
        return result.rstrip(", ")
    
    # ✅ Fast: Join method
    def fast_string_building(items):
        return ", ".join(str(item) for item in items)
    
    # ✅ Fast: f-string formatting
    def fast_string_formatting(items):
        return ", ".join(f"Item: {item}" for item in items)
    
    # Benchmark
    test_items = list(range(10000))
    
    slow_time = timeit.timeit(lambda: slow_string_building(test_items), number=10)
    fast_time = timeit.timeit(lambda: fast_string_building(test_items), number=10)
    format_time = timeit.timeit(lambda: fast_string_formatting(test_items), number=10)
    
    print(f"Slow concatenation: {slow_time:.4f}s")
    print(f"Fast join: {fast_time:.4f}s")
    print(f"Fast formatting: {format_time:.4f}s")

# optimize_loops()
# optimize_string_operations()
```

### Caching và Memoization
```python
from functools import lru_cache, cache
import time

# ❌ Slow: Recursive without memoization
def fibonacci_slow(n):
    """Fibonacci chậm - O(2^n)."""
    if n <= 1:
        return n
    return fibonacci_slow(n-1) + fibonacci_slow(n-2)

# ✅ Fast: With memoization
@lru_cache(maxsize=None)
def fibonacci_fast(n):
    """Fibonacci nhanh với memoization - O(n)."""
    if n <= 1:
        return n
    return fibonacci_fast(n-1) + fibonacci_fast(n-2)

# ✅ Fastest: Iterative approach
def fibonacci_iterative(n):
    """Fibonacci iterative - O(n) time, O(1) space."""
    if n <= 1:
        return n
    
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

def benchmark_fibonacci():
    """Benchmark các implementation fibonacci."""
    n = 35
    
    # Slow version
    start = time.perf_counter()
    result_slow = fibonacci_slow(n)
    slow_time = time.perf_counter() - start
    
    # Fast version (cached)
    start = time.perf_counter()
    result_fast = fibonacci_fast(n)
    fast_time = time.perf_counter() - start
    
    # Iterative version
    start = time.perf_counter()
    result_iter = fibonacci_iterative(n)
    iter_time = time.perf_counter() - start
    
    print(f"Fibonacci({n}) = {result_slow}")
    print(f"Recursive: {slow_time:.4f}s")
    print(f"Memoized: {fast_time:.4f}s") 
    print(f"Iterative: {iter_time:.4f}s")
    print(f"Memoized is {slow_time/fast_time:.0f}x faster than recursive")

# benchmark_fibonacci()

# Custom caching for complex objects
class StudentGradeCache:
    """Cache cho grade calculations."""
    
    def __init__(self):
        self._cache = {}
        self._hits = 0
        self._misses = 0
    
    def get_student_gpa(self, student_id, grades):
        """Get GPA với caching."""
        # Create cache key từ student_id và grades hash
        grades_hash = hash(tuple(sorted(grades.items())))
        cache_key = (student_id, grades_hash)
        
        if cache_key in self._cache:
            self._hits += 1
            return self._cache[cache_key]
        
        # Calculate GPA (expensive operation)
        self._misses += 1
        gpa = self._calculate_gpa(grades)
        self._cache[cache_key] = gpa
        
        return gpa
    
    def _calculate_gpa(self, grades):
        """Simulate expensive GPA calculation."""
        time.sleep(0.01)  # Simulate slow calculation
        if not grades:
            return 0.0
        return sum(grades.values()) / len(grades)
    
    def get_cache_stats(self):
        """Get cache statistics."""
        total = self._hits + self._misses
        hit_rate = self._hits / total if total > 0 else 0
        return {
            'hits': self._hits,
            'misses': self._misses,
            'hit_rate': hit_rate
        }

# Test caching
cache = StudentGradeCache()
test_grades = {'Math': 8.5, 'Science': 9.0, 'English': 7.5}

# First call - cache miss
gpa1 = cache.get_student_gpa('SV001', test_grades)

# Second call - cache hit
gpa2 = cache.get_student_gpa('SV001', test_grades)

print(f"Cache stats: {cache.get_cache_stats()}")
```

---

## 🧠 4. MEMORY OPTIMIZATION

### Generator vs List
```python
import sys

def memory_comparison():
    """So sánh memory usage giữa generator và list."""
    
    # List - stores all items in memory
    def create_large_list(n):
        return [i ** 2 for i in range(n)]
    
    # Generator - lazy evaluation
    def create_large_generator(n):
        return (i ** 2 for i in range(n))
    
    n = 1000000
    
    # Memory usage of list
    large_list = create_large_list(n)
    list_size = sys.getsizeof(large_list)
    
    # Memory usage of generator
    large_generator = create_large_generator(n)
    generator_size = sys.getsizeof(large_generator)
    
    print(f"List size: {list_size:,} bytes")
    print(f"Generator size: {generator_size:,} bytes")
    print(f"List uses {list_size/generator_size:.0f}x more memory")
    
    # Performance comparison for iteration
    start = time.perf_counter()
    total_list = sum(large_list)
    list_time = time.perf_counter() - start
    
    start = time.perf_counter()
    total_gen = sum(large_generator)
    gen_time = time.perf_counter() - start
    
    print(f"List iteration: {list_time:.4f}s")
    print(f"Generator iteration: {gen_time:.4f}s")

# memory_comparison()

def optimize_file_processing():
    """Tối ưu xử lý file lớn."""
    
    # ❌ Memory inefficient - load entire file
    def process_file_bad(filename):
        with open(filename, 'r') as f:
            lines = f.readlines()  # Load tất cả vào memory
        
        processed = []
        for line in lines:
            if line.strip():  # Process non-empty lines
                processed.append(line.strip().upper())
        
        return processed
    
    # ✅ Memory efficient - process line by line
    def process_file_good(filename):
        with open(filename, 'r') as f:
            for line in f:  # Generator - one line at a time
                line = line.strip()
                if line:
                    yield line.upper()
    
    # Create test file
    with open('test_large_file.txt', 'w') as f:
        for i in range(100000):
            f.write(f"Line {i}: This is test data\n")
    
    # Compare memory usage
    print("Processing large file...")
    
    # Bad approach
    start = time.perf_counter()
    result_bad = process_file_bad('test_large_file.txt')
    bad_time = time.perf_counter() - start
    
    # Good approach
    start = time.perf_counter()
    result_good = list(process_file_good('test_large_file.txt'))
    good_time = time.perf_counter() - start
    
    print(f"Load all: {bad_time:.4f}s")
    print(f"Line by line: {good_time:.4f}s")
    
    # Cleanup
    import os
    os.remove('test_large_file.txt')

# optimize_file_processing()
```

### Object Pooling
```python
class Student:
    """Student class với object pooling."""
    
    _pool = []
    _pool_size = 0
    _max_pool_size = 100
    
    def __new__(cls, *args, **kwargs):
        if cls._pool:
            instance = cls._pool.pop()
            cls._pool_size -= 1
            return instance
        return super().__new__(cls)
    
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = {}
    
    def reset(self):
        """Reset object state để tái sử dụng."""
        self.name = ""
        self.student_id = ""
        self.grades.clear()
    
    def release(self):
        """Trả object về pool."""
        if self._pool_size < self._max_pool_size:
            self.reset()
            self._pool.append(self)
            self._pool_size += 1
    
    @classmethod
    def get_pool_stats(cls):
        """Thống kê pool."""
        return {
            'pool_size': cls._pool_size,
            'max_pool_size': cls._max_pool_size
        }

def benchmark_object_creation():
    """Benchmark object creation với và không có pooling."""
    
    # Without pooling
    start = time.perf_counter()
    students = []
    for i in range(10000):
        student = Student(f"Student {i}", f"SV{i:05d}")
        students.append(student)
    creation_time = time.perf_counter() - start
    
    # With pooling
    start = time.perf_counter()
    pooled_students = []
    for i in range(10000):
        student = Student(f"Pooled Student {i}", f"PS{i:05d}")
        pooled_students.append(student)
        
    # Release objects back to pool
    for student in pooled_students:
        student.release()
    
    pooling_time = time.perf_counter() - start
    
    print(f"Normal creation: {creation_time:.4f}s")
    print(f"With pooling: {pooling_time:.4f}s")
    print(f"Pool stats: {Student.get_pool_stats()}")

# benchmark_object_creation()
```

---

## 📊 5. DATABASE OPTIMIZATION

### Query Optimization
```python
import sqlite3
import time
from contextlib import contextmanager

class OptimizedStudentDB:
    """Database operations được tối ưu."""
    
    def __init__(self, db_path):
        self.db_path = db_path
        self.setup_database()
    
    @contextmanager
    def get_connection(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
        finally:
            conn.close()
    
    def setup_database(self):
        """Setup database với proper indexes."""
        with self.get_connection() as conn:
            # Create tables
            conn.execute('''
                CREATE TABLE IF NOT EXISTS students (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id TEXT UNIQUE NOT NULL,
                    name TEXT NOT NULL,
                    department TEXT,
                    year INTEGER,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            conn.execute('''
                CREATE TABLE IF NOT EXISTS grades (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    grade REAL NOT NULL,
                    semester TEXT,
                    FOREIGN KEY (student_id) REFERENCES students (student_id)
                )
            ''')
            
            # Create indexes for performance
            conn.execute('CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id)')
            conn.execute('CREATE INDEX IF NOT EXISTS idx_students_department ON students(department)')
            conn.execute('CREATE INDEX IF NOT EXISTS idx_grades_student_id ON grades(student_id)')
            conn.execute('CREATE INDEX IF NOT EXISTS idx_grades_subject ON grades(subject)')
            conn.execute('CREATE INDEX IF NOT EXISTS idx_grades_semester ON grades(subject, semester)')
            
            conn.commit()
    
    def bulk_insert_students(self, students_data):
        """Bulk insert - hiệu quả hơn insert từng cái."""
        with self.get_connection() as conn:
            conn.executemany('''
                INSERT OR REPLACE INTO students (student_id, name, department, year)
                VALUES (?, ?, ?, ?)
            ''', students_data)
            conn.commit()
    
    def get_student_grades_optimized(self, student_id):
        """Lấy grades với single query thay vì multiple queries."""
        with self.get_connection() as conn:
            cursor = conn.execute('''
                SELECT s.name, s.department, g.subject, g.grade, g.semester
                FROM students s
                JOIN grades g ON s.student_id = g.student_id
                WHERE s.student_id = ?
                ORDER BY g.semester, g.subject
            ''', (student_id,))
            
            results = cursor.fetchall()
            if not results:
                return None
            
            # Group results
            student_info = {
                'name': results[0]['name'],
                'department': results[0]['department'],
                'grades': {}
            }
            
            for row in results:
                semester = row['semester']
                if semester not in student_info['grades']:
                    student_info['grades'][semester] = {}
                student_info['grades'][semester][row['subject']] = row['grade']
            
            return student_info
    
    def get_department_statistics(self, department):
        """Thống kê department với single query."""
        with self.get_connection() as conn:
            cursor = conn.execute('''
                SELECT 
                    COUNT(DISTINCT s.student_id) as total_students,
                    AVG(g.grade) as avg_grade,
                    MIN(g.grade) as min_grade,
                    MAX(g.grade) as max_grade,
                    COUNT(g.grade) as total_grades
                FROM students s
                LEFT JOIN grades g ON s.student_id = g.student_id
                WHERE s.department = ?
            ''', (department,))
            
            return dict(cursor.fetchone())

def benchmark_database_operations():
    """Benchmark database operations."""
    db = OptimizedStudentDB('test_optimized.db')
    
    # Generate test data
    students_data = [
        (f'SV{i:05d}', f'Student {i}', f'Dept_{i%10}', 2020 + (i % 4))
        for i in range(10000)
    ]
    
    grades_data = []
    subjects = ['Math', 'Science', 'English', 'History', 'Physics']
    semesters = ['2023-1', '2023-2', '2024-1']
    
    for i in range(10000):
        student_id = f'SV{i:05d}'
        for subject in subjects[:random.randint(2, 5)]:
            for semester in semesters[:random.randint(1, 3)]:
                grade = random.uniform(5.0, 10.0)
                grades_data.append((student_id, subject, grade, semester))
    
    # Benchmark bulk insert
    start = time.perf_counter()
    db.bulk_insert_students(students_data)
    
    with db.get_connection() as conn:
        conn.executemany('''
            INSERT INTO grades (student_id, subject, grade, semester)
            VALUES (?, ?, ?, ?)
        ''', grades_data)
        conn.commit()
    
    insert_time = time.perf_counter() - start
    
    # Benchmark queries
    test_student_ids = random.sample([f'SV{i:05d}' for i in range(10000)], 100)
    
    start = time.perf_counter()
    for student_id in test_student_ids:
        db.get_student_grades_optimized(student_id)
    query_time = time.perf_counter() - start
    
    print(f"Bulk insert time: {insert_time:.4f}s")
    print(f"100 optimized queries: {query_time:.4f}s")
    
    # Cleanup
    import os
    os.remove('test_optimized.db')

# benchmark_database_operations()
```

---

## ⚡ 6. PARALLEL PROCESSING

### Threading cho I/O Bound Tasks
```python
import threading
import concurrent.futures
import requests
import time

def download_student_data(student_id):
    """Simulate downloading student data from API."""
    # Simulate network delay
    time.sleep(0.1)
    return {
        'student_id': student_id,
        'name': f'Student {student_id}',
        'data': f'Data for {student_id}'
    }

def benchmark_threading():
    """Benchmark sequential vs threaded execution."""
    student_ids = [f'SV{i:03d}' for i in range(50)]
    
    # Sequential execution
    start = time.perf_counter()
    sequential_results = []
    for student_id in student_ids:
        result = download_student_data(student_id)
        sequential_results.append(result)
    sequential_time = time.perf_counter() - start
    
    # Threaded execution
    start = time.perf_counter()
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        threaded_results = list(executor.map(download_student_data, student_ids))
    threaded_time = time.perf_counter() - start
    
    print(f"Sequential: {sequential_time:.4f}s")
    print(f"Threaded: {threaded_time:.4f}s")
    print(f"Speedup: {sequential_time/threaded_time:.1f}x")

# benchmark_threading()
```

### Multiprocessing cho CPU Bound Tasks
```python
import multiprocessing
import concurrent.futures
import math

def cpu_intensive_task(n):
    """CPU intensive task - tính số prime."""
    def is_prime(num):
        if num < 2:
            return False
        for i in range(2, int(math.sqrt(num)) + 1):
            if num % i == 0:
                return False
        return True
    
    primes = []
    for i in range(n * 1000, (n + 1) * 1000):
        if is_prime(i):
            primes.append(i)
    
    return len(primes)

def benchmark_multiprocessing():
    """Benchmark sequential vs multiprocessing."""
    tasks = list(range(8))  # 8 tasks
    
    # Sequential execution
    start = time.perf_counter()
    sequential_results = []
    for task in tasks:
        result = cpu_intensive_task(task)
        sequential_results.append(result)
    sequential_time = time.perf_counter() - start
    
    # Multiprocessing execution
    start = time.perf_counter()
    with concurrent.futures.ProcessPoolExecutor() as executor:
        mp_results = list(executor.map(cpu_intensive_task, tasks))
    mp_time = time.perf_counter() - start
    
    print(f"Sequential: {sequential_time:.4f}s")
    print(f"Multiprocessing: {mp_time:.4f}s") 
    print(f"Speedup: {sequential_time/mp_time:.1f}x")
    print(f"CPU cores: {multiprocessing.cpu_count()}")

# benchmark_multiprocessing()
```

---

## 🎯 7. SPECIFIC OPTIMIZATIONS

### NumPy cho Numerical Operations
```python
import numpy as np
import time

def benchmark_numpy():
    """So sánh Python lists vs NumPy arrays."""
    
    # Create test data
    size = 1000000
    python_list1 = list(range(size))
    python_list2 = list(range(size, 2 * size))
    
    numpy_array1 = np.arange(size)
    numpy_array2 = np.arange(size, 2 * size)
    
    # Python list operations
    start = time.perf_counter()
    python_result = [x + y for x, y in zip(python_list1, python_list2)]
    python_time = time.perf_counter() - start
    
    # NumPy array operations
    start = time.perf_counter()
    numpy_result = numpy_array1 + numpy_array2
    numpy_time = time.perf_counter() - start
    
    print(f"Python list addition: {python_time:.4f}s")
    print(f"NumPy array addition: {numpy_time:.4f}s")
    print(f"NumPy is {python_time/numpy_time:.1f}x faster")
    
    # Mathematical operations
    start = time.perf_counter()
    python_math = [math.sqrt(x) for x in python_list1]
    python_math_time = time.perf_counter() - start
    
    start = time.perf_counter()
    numpy_math = np.sqrt(numpy_array1)
    numpy_math_time = time.perf_counter() - start
    
    print(f"Python sqrt: {python_math_time:.4f}s")
    print(f"NumPy sqrt: {numpy_math_time:.4f}s")
    print(f"NumPy sqrt is {python_math_time/numpy_math_time:.1f}x faster")

# Chỉ chạy nếu có NumPy
try:
    # benchmark_numpy()
    pass
except ImportError:
    print("NumPy not installed, skipping NumPy benchmarks")
```

### String Optimization với f-strings
```python
def benchmark_string_formatting():
    """Benchmark các cách format string."""
    
    name = "Nguyễn Văn An"
    age = 25
    grade = 8.75
    
    n = 100000
    
    # % formatting
    start = time.perf_counter()
    for _ in range(n):
        result = "Tên: %s, Tuổi: %d, Điểm: %.2f" % (name, age, grade)
    percent_time = time.perf_counter() - start
    
    # .format() method
    start = time.perf_counter()
    for _ in range(n):
        result = "Tên: {}, Tuổi: {}, Điểm: {:.2f}".format(name, age, grade)
    format_time = time.perf_counter() - start
    
    # f-strings (Python 3.6+)
    start = time.perf_counter()
    for _ in range(n):
        result = f"Tên: {name}, Tuổi: {age}, Điểm: {grade:.2f}"
    fstring_time = time.perf_counter() - start
    
    print(f"% formatting: {percent_time:.4f}s")
    print(f".format() method: {format_time:.4f}s")
    print(f"f-strings: {fstring_time:.4f}s")
    print(f"f-strings are {format_time/fstring_time:.1f}x faster than .format()")

# benchmark_string_formatting()
```

---

## 🔧 8. TOOLS VÀ MONITORING

### Code Profiling Tools
```python
def setup_profiling():
    """Setup các tools profiling."""
    
    # 1. line_profiler - profile từng dòng code
    # pip install line_profiler
    # Sử dụng: @profile decorator và chạy kernprof -l -v script.py
    
    # 2. memory_profiler - profile memory usage
    # pip install memory_profiler
    # Sử dụng: @profile decorator và chạy python -m memory_profiler script.py
    
    # 3. py-spy - sampling profiler (production)
    # pip install py-spy
    # Sử dụng: py-spy record -o profile.svg -- python script.py
    
    print("Profiling tools setup guide:")
    print("1. line_profiler: Detailed line-by-line profiling")
    print("2. memory_profiler: Memory usage profiling")
    print("3. py-spy: Production profiling without code changes")

# Example với memory_profiler
# @profile  # Uncomment to use with memory_profiler
def memory_intensive_function():
    """Function để test memory profiling."""
    # Create large data structures
    big_list = [i for i in range(1000000)]
    big_dict = {i: f"value_{i}" for i in range(100000)}
    
    # Process data
    result = sum(big_list)
    
    # Clean up
    del big_list
    del big_dict
    
    return result

# setup_profiling()
```

### Performance Monitoring
```python
import psutil
import os
import threading
import time

class PerformanceMonitor:
    """Monitor performance metrics của application."""
    
    def __init__(self):
        self.process = psutil.Process(os.getpid())
        self.monitoring = False
        self.metrics = []
    
    def start_monitoring(self, interval=1.0):
        """Bắt đầu monitoring."""
        if self.monitoring:
            return
        
        self.monitoring = True
        self.monitor_thread = threading.Thread(target=self._monitor_loop, args=(interval,))
        self.monitor_thread.daemon = True
        self.monitor_thread.start()
    
    def stop_monitoring(self):
        """Dừng monitoring."""
        self.monitoring = False
        if hasattr(self, 'monitor_thread'):
            self.monitor_thread.join()
    
    def _monitor_loop(self, interval):
        """Loop monitoring chính."""
        while self.monitoring:
            try:
                # CPU usage
                cpu_percent = self.process.cpu_percent()
                
                # Memory usage
                memory_info = self.process.memory_info()
                memory_mb = memory_info.rss / 1024 / 1024
                
                # Thread count
                thread_count = self.process.num_threads()
                
                # File descriptors (Unix only)
                try:
                    fd_count = self.process.num_fds()
                except AttributeError:
                    fd_count = 0  # Windows doesn't have num_fds
                
                metric = {
                    'timestamp': time.time(),
                    'cpu_percent': cpu_percent,
                    'memory_mb': memory_mb,
                    'thread_count': thread_count,
                    'fd_count': fd_count
                }
                
                self.metrics.append(metric)
                
                # Keep only last 100 metrics
                if len(self.metrics) > 100:
                    self.metrics.pop(0)
                
            except psutil.NoSuchProcess:
                break
            
            time.sleep(interval)
    
    def get_current_stats(self):
        """Lấy stats hiện tại."""
        if not self.metrics:
            return None
        return self.metrics[-1]
    
    def get_peak_memory(self):
        """Lấy peak memory usage."""
        if not self.metrics:
            return 0
        return max(metric['memory_mb'] for metric in self.metrics)
    
    def get_average_cpu(self):
        """Lấy average CPU usage."""
        if not self.metrics:
            return 0
        return sum(metric['cpu_percent'] for metric in self.metrics) / len(self.metrics)

# Sử dụng monitor
def demo_performance_monitoring():
    """Demo performance monitoring."""
    monitor = PerformanceMonitor()
    monitor.start_monitoring(0.5)  # Monitor every 0.5 seconds
    
    # Simulate some work
    print("Starting work simulation...")
    
    # CPU intensive task
    for i in range(3):
        _ = [x**2 for x in range(100000)]
        time.sleep(1)
    
    # Memory intensive task
    big_data = [list(range(1000)) for _ in range(1000)]
    time.sleep(2)
    del big_data
    
    monitor.stop_monitoring()
    
    # Print results
    print(f"Peak memory: {monitor.get_peak_memory():.2f} MB")
    print(f"Average CPU: {monitor.get_average_cpu():.2f}%")
    print(f"Final stats: {monitor.get_current_stats()}")

# demo_performance_monitoring()
```

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [📋 Python Cheatsheet](./python-cheatsheet.md) - Bảng tra cứu nhanh
- [🏆 Best Practices](./best-practices.md) - Thực hành tốt nhất
- [📐 Coding Style](./coding-style.md) - Quy tắc viết code
- [🐛 Error Messages](./error-messages.md) - Xử lý lỗi

---

## 🎯 Tóm Tắt

### 📊 **Profiling & Measurement:**
- **timeit** - Micro-benchmarks
- **cProfile** - Function-level profiling  
- **memory_profiler** - Memory usage
- **line_profiler** - Line-by-line analysis

### 🚀 **Data Structure Optimization:**
- **set/dict** cho lookup (O(1) vs O(n))
- **deque** cho insertions ở đầu
- **defaultdict** để tránh key checking
- **Counter** cho statistics

### 🧠 **Memory Optimization:**
- **Generators** thay vì lists cho dữ liệu lớn
- **Object pooling** cho frequent creation/destruction
- **del** để release memory sớm
- **__slots__** cho classes với nhiều instances

### 🔄 **Algorithm Optimization:**
- **Avoid function calls** trong loops
- **List comprehensions** vs for loops
- **join()** thay vì string concatenation
- **Memoization** cho recursive functions

### ⚡ **Parallel Processing:**
- **Threading** cho I/O bound tasks
- **Multiprocessing** cho CPU bound tasks
- **concurrent.futures** cho clean API
- **asyncio** cho async operations

### 📈 **Database Optimization:**
- **Indexes** cho frequent queries
- **Bulk operations** thay vì single inserts
- **Connection pooling**
- **Query optimization** với EXPLAIN

### 🛠️ **Tools:**
- **NumPy** cho numerical operations
- **f-strings** cho string formatting
- **lru_cache** cho memoization
- **psutil** cho system monitoring

### 💡 **Golden Rules:**
1. **Measure first** - Don't guess, profile
2. **Optimize bottlenecks** - 80/20 rule applies
3. **Choose right data structures** - Algorithm complexity matters
4. **Cache expensive operations** - Time vs space tradeoff
5. **Use built-ins** - They're usually optimized
6. **Profile in production** - Real data behaves differently

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: "Premature optimization is the root of all evil" - Donald Knuth*
