# 📊 Cấu Trúc Dữ Liệu - Data Structures

> **Tóm tắt**: Hướng dẫn chi tiết về các cấu trúc dữ liệu trong Python, từ cơ bản như list, dict đến nâng cao như heap, tree. Mỗi structure được giải thích bằng ví dụ thực tế và code demo.

## 🎯 Tại Sao Cần Hiểu Data Structures?

Hãy tưởng tượng data structures như các loại "container" khác nhau! 📦

- **List** như **tủ có ngăn đánh số** - truy cập theo thứ tự
- **Dictionary** như **từ điển** - tìm theo key
- **Set** như **hộp không trùng lặp** - mỗi item chỉ có 1
- **Stack** như **chồng đĩa** - vào sau, ra trước
- **Queue** như **hàng đợi** - vào trước, ra trước

Chọn đúng structure = code nhanh và hiệu quả! 🚀

---

## 📋 1. BUILT-IN DATA STRUCTURES

### List (Danh sách)
**Đặc điểm**: Có thứ tự, có thể thay đổi, cho phép trùng lặp

```python
class ListDemo:
    """Demo các operations với List."""
    
    def __init__(self):
        self.demo_list = [1, 2, 3, 4, 5]
        self.mixed_list = ["Python", 3.14, True, [1, 2], {"key": "value"}]
    
    def basic_operations(self):
        """Các thao tác cơ bản với list."""
        print("=== LIST BASIC OPERATIONS ===")
        
        # Access - O(1)
        print(f"First element: {self.demo_list[0]}")
        print(f"Last element: {self.demo_list[-1]}")
        print(f"Slice [1:4]: {self.demo_list[1:4]}")
        
        # Modify - O(1)
        original = self.demo_list.copy()
        self.demo_list[0] = 10
        print(f"After modify index 0: {self.demo_list}")
        self.demo_list = original  # Reset
        
        # Add elements
        self.demo_list.append(6)  # O(1) - add to end
        print(f"After append(6): {self.demo_list}")
        
        self.demo_list.insert(0, 0)  # O(n) - add to beginning
        print(f"After insert(0, 0): {self.demo_list}")
        
        # Remove elements
        removed = self.demo_list.pop()  # O(1) - remove from end
        print(f"Popped element: {removed}, List: {self.demo_list}")
        
        self.demo_list.remove(0)  # O(n) - remove by value
        print(f"After remove(0): {self.demo_list}")
    
    def advanced_operations(self):
        """Thao tác nâng cao với list."""
        print(f"\n=== LIST ADVANCED OPERATIONS ===")
        
        numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5]
        
        # Sorting
        print(f"Original: {numbers}")
        print(f"Sorted: {sorted(numbers)}")  # Không thay đổi original
        
        numbers_copy = numbers.copy()
        numbers_copy.sort()  # Thay đổi original
        print(f"After .sort(): {numbers_copy}")
        
        # List comprehension
        squares = [x**2 for x in numbers]
        print(f"Squares: {squares}")
        
        even_numbers = [x for x in numbers if x % 2 == 0]
        print(f"Even numbers: {even_numbers}")
        
        # Statistical operations
        print(f"Count of 1: {numbers.count(1)}")
        print(f"Index of 4: {numbers.index(4)}")
        print(f"Min: {min(numbers)}, Max: {max(numbers)}")
        print(f"Sum: {sum(numbers)}, Length: {len(numbers)}")
    
    def performance_analysis(self):
        """Phân tích performance của list operations."""
        print(f"\n=== LIST PERFORMANCE ===")
        
        import time
        
        # Test với list lớn
        large_list = list(range(100000))
        
        # Access by index - O(1)
        start = time.perf_counter()
        _ = large_list[50000]
        access_time = time.perf_counter() - start
        
        # Append - O(1)
        start = time.perf_counter()
        large_list.append(100000)
        append_time = time.perf_counter() - start
        
        # Insert at beginning - O(n)
        start = time.perf_counter()
        large_list.insert(0, -1)
        insert_time = time.perf_counter() - start
        
        # Search - O(n)
        start = time.perf_counter()
        _ = 50000 in large_list
        search_time = time.perf_counter() - start
        
        print(f"Access by index: {access_time:.8f}s")
        print(f"Append: {append_time:.8f}s")
        print(f"Insert at beginning: {insert_time:.8f}s")
        print(f"Search: {search_time:.8f}s")

# Demo List
list_demo = ListDemo()
list_demo.basic_operations()
list_demo.advanced_operations()
list_demo.performance_analysis()
```

### Dictionary (Từ điển)
**Đặc điểm**: Key-value pairs, không có thứ tự (Python 3.7+ insertion order preserved), có thể thay đổi

```python
class DictDemo:
    """Demo các operations với Dictionary."""
    
    def __init__(self):
        self.student = {
            "name": "Nguyễn Văn An",
            "age": 20,
            "grades": {"math": 8.5, "physics": 9.0, "chemistry": 7.5},
            "is_active": True
        }
    
    def basic_operations(self):
        """Thao tác cơ bản với dict."""
        print("=== DICT BASIC OPERATIONS ===")
        
        # Access - O(1) average
        print(f"Name: {self.student['name']}")
        print(f"Age: {self.student.get('age', 'Unknown')}")
        print(f"Grade in math: {self.student['grades']['math']}")
        
        # Add/Update - O(1) average
        self.student['email'] = "an@example.com"
        self.student['age'] = 21  # Update existing
        print(f"After updates: {self.student}")
        
        # Delete - O(1) average
        removed_email = self.student.pop('email')
        print(f"Removed email: {removed_email}")
        
        del self.student['is_active']
        print(f"After delete is_active: {list(self.student.keys())}")
    
    def iteration_methods(self):
        """Các cách duyệt dictionary."""
        print(f"\n=== DICT ITERATION ===")
        
        grades = {"math": 8.5, "physics": 9.0, "chemistry": 7.5, "biology": 8.8}
        
        # Iterate keys
        print("Keys:")
        for subject in grades.keys():
            print(f"  {subject}")
        
        # Iterate values
        print("Values:")
        for grade in grades.values():
            print(f"  {grade}")
        
        # Iterate key-value pairs
        print("Key-Value pairs:")
        for subject, grade in grades.items():
            print(f"  {subject}: {grade}")
        
        # Dict comprehension
        high_grades = {k: v for k, v in grades.items() if v >= 8.5}
        print(f"High grades: {high_grades}")
        
        # Transform values
        letter_grades = {k: self._grade_to_letter(v) for k, v in grades.items()}
        print(f"Letter grades: {letter_grades}")
    
    def _grade_to_letter(self, grade):
        """Convert numeric grade to letter."""
        if grade >= 9: return 'A'
        elif grade >= 8: return 'B'
        elif grade >= 7: return 'C'
        elif grade >= 6: return 'D'
        else: return 'F'
    
    def advanced_dict_methods(self):
        """Methods nâng cao của dictionary."""
        print(f"\n=== ADVANCED DICT METHODS ===")
        
        # Merge dictionaries
        dict1 = {"a": 1, "b": 2}
        dict2 = {"b": 3, "c": 4}
        
        # Method 1: update()
        merged1 = dict1.copy()
        merged1.update(dict2)
        print(f"Using update(): {merged1}")
        
        # Method 2: ** unpacking (Python 3.5+)
        merged2 = {**dict1, **dict2}
        print(f"Using unpacking: {merged2}")
        
        # Method 3: | operator (Python 3.9+)
        try:
            merged3 = dict1 | dict2
            print(f"Using | operator: {merged3}")
        except TypeError:
            print("| operator not available (Python < 3.9)")
        
        # setdefault() - set if not exists
        config = {"host": "localhost", "port": 8080}
        config.setdefault("timeout", 30)  # Sets only if 'timeout' doesn't exist
        config.setdefault("port", 3000)   # Won't change existing 'port'
        print(f"Config with defaults: {config}")
        
        # fromkeys() - create dict from keys
        subjects = ["math", "physics", "chemistry"]
        empty_grades = dict.fromkeys(subjects, 0)
        print(f"Empty grades: {empty_grades}")

# Demo Dictionary
dict_demo = DictDemo()
dict_demo.basic_operations()
dict_demo.iteration_methods()
dict_demo.advanced_dict_methods()
```

### Set (Tập hợp)
**Đặc điểm**: Không có thứ tự, không trùng lặp, có thể thay đổi

```python
class SetDemo:
    """Demo các operations với Set."""
    
    def __init__(self):
        self.set1 = {1, 2, 3, 4, 5}
        self.set2 = {4, 5, 6, 7, 8}
        self.fruits = {"apple", "banana", "orange", "apple"}  # Duplicate ignored
    
    def basic_operations(self):
        """Thao tác cơ bản với set."""
        print("=== SET BASIC OPERATIONS ===")
        
        print(f"Set1: {self.set1}")
        print(f"Set2: {self.set2}")
        print(f"Fruits (duplicates removed): {self.fruits}")
        
        # Add/Remove - O(1) average
        self.fruits.add("grape")
        print(f"After add grape: {self.fruits}")
        
        self.fruits.discard("banana")  # Won't raise error if not found
        print(f"After discard banana: {self.fruits}")
        
        try:
            self.fruits.remove("kiwi")  # Will raise error if not found
        except KeyError:
            print("Kiwi not found (using remove())")
        
        # Membership test - O(1) average
        print(f"'apple' in fruits: {'apple' in self.fruits}")
        print(f"'kiwi' in fruits: {'kiwi' in self.fruits}")
    
    def set_mathematics(self):
        """Các phép toán tập hợp."""
        print(f"\n=== SET MATHEMATICS ===")
        
        print(f"Set1: {self.set1}")
        print(f"Set2: {self.set2}")
        
        # Union - Hợp
        union = self.set1 | self.set2
        union_method = self.set1.union(self.set2)
        print(f"Union (|): {union}")
        print(f"Union (method): {union_method}")
        
        # Intersection - Giao
        intersection = self.set1 & self.set2
        intersection_method = self.set1.intersection(self.set2)
        print(f"Intersection (&): {intersection}")
        print(f"Intersection (method): {intersection_method}")
        
        # Difference - Hiệu
        difference = self.set1 - self.set2
        difference_method = self.set1.difference(self.set2)
        print(f"Difference (-): {difference}")
        print(f"Difference (method): {difference_method}")
        
        # Symmetric Difference - Hiệu đối xứng
        sym_diff = self.set1 ^ self.set2
        sym_diff_method = self.set1.symmetric_difference(self.set2)
        print(f"Symmetric Difference (^): {sym_diff}")
        print(f"Symmetric Difference (method): {sym_diff_method}")
        
        # Subset/Superset
        small_set = {2, 3}
        print(f"Is {small_set} subset of {self.set1}? {small_set.issubset(self.set1)}")
        print(f"Is {self.set1} superset of {small_set}? {self.set1.issuperset(small_set)}")
        
        # Disjoint
        disjoint_set = {10, 11, 12}
        print(f"Are {self.set1} and {disjoint_set} disjoint? {self.set1.isdisjoint(disjoint_set)}")
    
    def practical_examples(self):
        """Ví dụ thực tế sử dụng set."""
        print(f"\n=== PRACTICAL SET EXAMPLES ===")
        
        # 1. Remove duplicates from list
        numbers_with_dups = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5]
        unique_numbers = list(set(numbers_with_dups))
        print(f"Remove duplicates: {numbers_with_dups} -> {unique_numbers}")
        
        # 2. Find common elements
        class1_students = {"An", "Bình", "Cường", "Dung"}
        class2_students = {"Bình", "Dung", "Em", "Phương"}
        
        common_students = class1_students & class2_students
        print(f"Students in both classes: {common_students}")
        
        # 3. Find unique skills
        job_requirements = {"Python", "SQL", "Git", "Docker"}
        candidate_skills = {"Python", "Java", "Git", "Linux"}
        
        missing_skills = job_requirements - candidate_skills
        extra_skills = candidate_skills - job_requirements
        
        print(f"Missing skills: {missing_skills}")
        print(f"Extra skills: {extra_skills}")
        
        # 4. Fast membership testing
        large_set = set(range(100000))
        large_list = list(range(100000))
        
        import time
        
        # Test set membership
        start = time.perf_counter()
        result = 99999 in large_set
        set_time = time.perf_counter() - start
        
        # Test list membership
        start = time.perf_counter()
        result = 99999 in large_list
        list_time = time.perf_counter() - start
        
        print(f"Set membership: {set_time:.8f}s")
        print(f"List membership: {list_time:.8f}s")
        print(f"Set is {list_time/set_time:.0f}x faster for membership testing")

# Demo Set
set_demo = SetDemo()
set_demo.basic_operations()
set_demo.set_mathematics()
set_demo.practical_examples()
```

### Tuple (Bộ)
**Đặc điểm**: Có thứ tự, không thể thay đổi, cho phép trùng lặp

```python
class TupleDemo:
    """Demo các operations với Tuple."""
    
    def __init__(self):
        self.point = (3, 4)  # 2D point
        self.rgb_color = (255, 128, 0)  # RGB color
        self.student_record = ("SV001", "Nguyễn Văn An", 20, 8.5)
    
    def basic_operations(self):
        """Thao tác cơ bản với tuple."""
        print("=== TUPLE BASIC OPERATIONS ===")
        
        # Access - O(1)
        print(f"Point: {self.point}")
        print(f"X coordinate: {self.point[0]}")
        print(f"Y coordinate: {self.point[1]}")
        
        # Unpacking
        x, y = self.point
        print(f"Unpacked coordinates: x={x}, y={y}")
        
        # Multiple assignment
        student_id, name, age, grade = self.student_record
        print(f"Student: {name} (ID: {student_id}, Age: {age}, Grade: {grade})")
        
        # Slicing
        print(f"RGB color: {self.rgb_color}")
        print(f"Red component: {self.rgb_color[0]}")
        print(f"RGB slice [0:2]: {self.rgb_color[0:2]}")
        
        # Count and index
        numbers = (1, 2, 3, 2, 4, 2, 5)
        print(f"Numbers: {numbers}")
        print(f"Count of 2: {numbers.count(2)}")
        print(f"Index of first 3: {numbers.index(3)}")
    
    def tuple_as_keys(self):
        """Sử dụng tuple làm keys trong dictionary."""
        print(f"\n=== TUPLE AS DICTIONARY KEYS ===")
        
        # Geographic coordinates as keys
        city_coordinates = {
            (21.0285, 105.8542): "Hà Nội",
            (10.8231, 106.6297): "TP.HCM",
            (16.0544, 108.2022): "Đà Nẵng",
            (10.0452, 105.7469): "Cần Thơ"
        }
        
        # Access by coordinate
        hanoi_coord = (21.0285, 105.8542)
        print(f"City at {hanoi_coord}: {city_coordinates[hanoi_coord]}")
        
        # Student grades by (subject, semester)
        grades = {
            ("Math", "2023-1"): 8.5,
            ("Math", "2023-2"): 9.0,
            ("Physics", "2023-1"): 8.0,
            ("Physics", "2023-2"): 8.5
        }
        
        print(f"Math grade in 2023-1: {grades[('Math', '2023-1')]}")
        
        # Iterate through coordinate-based dict
        print("All cities:")
        for (lat, lon), city in city_coordinates.items():
            print(f"  {city}: ({lat}, {lon})")
    
    def named_tuples(self):
        """Sử dụng namedtuple để tạo tuple có tên."""
        print(f"\n=== NAMED TUPLES ===")
        
        from collections import namedtuple
        
        # Define named tuple types
        Point = namedtuple('Point', ['x', 'y'])
        Student = namedtuple('Student', ['id', 'name', 'age', 'grade'])
        
        # Create instances
        p1 = Point(3, 4)
        p2 = Point(x=5, y=12)  # Can use keyword arguments
        
        student = Student('SV001', 'Nguyễn Văn An', 20, 8.5)
        
        # Access by name (more readable)
        print(f"Point 1: ({p1.x}, {p1.y})")
        print(f"Point 2: ({p2.x}, {p2.y})")
        print(f"Student: {student.name}, Grade: {student.grade}")
        
        # Still works as regular tuple
        print(f"Point 1[0]: {p1[0]}")
        print(f"Point 1 + Point 2: ({p1.x + p2.x}, {p1.y + p2.y})")
        
        # Named tuple methods
        print(f"Student fields: {student._fields}")
        print(f"Student as dict: {student._asdict()}")
        
        # Create new instance with some fields changed
        older_student = student._replace(age=21)
        print(f"Older student: {older_student}")
    
    def performance_comparison(self):
        """So sánh performance tuple vs list."""
        print(f"\n=== TUPLE VS LIST PERFORMANCE ===")
        
        import time
        import sys
        
        # Memory usage
        tuple_data = tuple(range(1000))
        list_data = list(range(1000))
        
        print(f"Tuple memory: {sys.getsizeof(tuple_data)} bytes")
        print(f"List memory: {sys.getsizeof(list_data)} bytes")
        print(f"Memory difference: {sys.getsizeof(list_data) - sys.getsizeof(tuple_data)} bytes")
        
        # Creation time
        start = time.perf_counter()
        for _ in range(10000):
            t = tuple(range(100))
        tuple_creation_time = time.perf_counter() - start
        
        start = time.perf_counter()
        for _ in range(10000):
            l = list(range(100))
        list_creation_time = time.perf_counter() - start
        
        print(f"Tuple creation: {tuple_creation_time:.4f}s")
        print(f"List creation: {list_creation_time:.4f}s")
        print(f"Tuple is {list_creation_time/tuple_creation_time:.1f}x faster to create")

# Demo Tuple
tuple_demo = TupleDemo()
tuple_demo.basic_operations()
tuple_demo.tuple_as_keys()
tuple_demo.named_tuples()
tuple_demo.performance_comparison()
```

---

## 🏗️ 2. ADVANCED DATA STRUCTURES

### Stack (Ngăn xếp)
**Đặc điểm**: LIFO (Last In, First Out) - vào sau, ra trước

```python
class Stack:
    """Implementation của Stack sử dụng list."""
    
    def __init__(self):
        self._items = []
    
    def push(self, item):
        """Thêm phần tử vào đỉnh stack - O(1)."""
        self._items.append(item)
    
    def pop(self):
        """Lấy và xóa phần tử từ đỉnh stack - O(1)."""
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()
    
    def peek(self):
        """Xem phần tử ở đỉnh stack mà không xóa - O(1)."""
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._items[-1]
    
    def is_empty(self):
        """Kiểm tra stack có rỗng không - O(1)."""
        return len(self._items) == 0
    
    def size(self):
        """Số phần tử trong stack - O(1)."""
        return len(self._items)
    
    def __str__(self):
        """String representation."""
        return f"Stack({self._items})"

def demo_stack():
    """Demo stack và các ứng dụng."""
    print("=== STACK DEMO ===")
    
    stack = Stack()
    
    # Basic operations
    print("Pushing elements: 1, 2, 3")
    stack.push(1)
    stack.push(2)
    stack.push(3)
    print(f"Stack: {stack}")
    print(f"Size: {stack.size()}")
    
    print(f"Peek: {stack.peek()}")  # Should be 3
    print(f"Pop: {stack.pop()}")    # Should be 3
    print(f"Pop: {stack.pop()}")    # Should be 2
    print(f"Stack after pops: {stack}")
    
    # Practical applications
    print(f"\n=== STACK APPLICATIONS ===")
    
    # 1. Balanced parentheses checker
    def is_balanced_parentheses(expression):
        """Kiểm tra dấu ngoặc có cân bằng không."""
        stack = Stack()
        opening = "([{"
        closing = ")]}"
        pairs = {"(": ")", "[": "]", "{": "}"}
        
        for char in expression:
            if char in opening:
                stack.push(char)
            elif char in closing:
                if stack.is_empty():
                    return False
                if pairs[stack.pop()] != char:
                    return False
        
        return stack.is_empty()
    
    # Test balanced parentheses
    test_expressions = [
        "()",
        "(())",
        "([{}])",
        "(((",
        "()))",
        "([)]"
    ]
    
    print("Balanced parentheses check:")
    for expr in test_expressions:
        result = "✅ Balanced" if is_balanced_parentheses(expr) else "❌ Not balanced"
        print(f"  '{expr}': {result}")
    
    # 2. Undo functionality simulation
    class TextEditor:
        """Giả lập text editor với undo functionality."""
        def __init__(self):
            self.text = ""
            self.history = Stack()
        
        def type(self, characters):
            """Type characters."""
            self.history.push(self.text)  # Save current state
            self.text += characters
            print(f"Typed '{characters}': '{self.text}'")
        
        def delete(self, count):
            """Delete characters."""
            self.history.push(self.text)  # Save current state
            self.text = self.text[:-count]
            print(f"Deleted {count} chars: '{self.text}'")
        
        def undo(self):
            """Undo last operation."""
            if not self.history.is_empty():
                self.text = self.history.pop()
                print(f"Undo: '{self.text}'")
            else:
                print("Nothing to undo")
    
    print(f"\nText editor with undo:")
    editor = TextEditor()
    editor.type("Hello")
    editor.type(" World")
    editor.delete(2)
    editor.type("!!")
    editor.undo()  # Back to "Hello Wor"
    editor.undo()  # Back to "Hello World"
    editor.undo()  # Back to "Hello"

demo_stack()
```

### Queue (Hàng đợi)
**Đặc điểm**: FIFO (First In, First Out) - vào trước, ra trước

```python
from collections import deque

class Queue:
    """Implementation của Queue sử dụng deque."""
    
    def __init__(self):
        self._items = deque()
    
    def enqueue(self, item):
        """Thêm phần tử vào cuối queue - O(1)."""
        self._items.append(item)
    
    def dequeue(self):
        """Lấy và xóa phần tử từ đầu queue - O(1)."""
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self._items.popleft()
    
    def front(self):
        """Xem phần tử đầu queue mà không xóa - O(1)."""
        if self.is_empty():
            raise IndexError("front from empty queue")
        return self._items[0]
    
    def is_empty(self):
        """Kiểm tra queue có rỗng không - O(1)."""
        return len(self._items) == 0
    
    def size(self):
        """Số phần tử trong queue - O(1)."""
        return len(self._items)
    
    def __str__(self):
        """String representation."""
        return f"Queue({list(self._items)})"

def demo_queue():
    """Demo queue và các ứng dụng."""
    print("=== QUEUE DEMO ===")
    
    queue = Queue()
    
    # Basic operations
    print("Enqueuing: A, B, C")
    queue.enqueue("A")
    queue.enqueue("B")
    queue.enqueue("C")
    print(f"Queue: {queue}")
    
    print(f"Front: {queue.front()}")      # Should be A
    print(f"Dequeue: {queue.dequeue()}")  # Should be A
    print(f"Dequeue: {queue.dequeue()}")  # Should be B
    print(f"Queue after dequeues: {queue}")
    
    # Practical applications
    print(f"\n=== QUEUE APPLICATIONS ===")
    
    # 1. Task scheduling simulation
    class TaskScheduler:
        """Giả lập task scheduler."""
        def __init__(self):
            self.tasks = Queue()
            self.completed_tasks = []
        
        def add_task(self, task_name):
            """Thêm task vào queue."""
            self.tasks.enqueue(task_name)
            print(f"Added task: {task_name}")
        
        def process_next_task(self):
            """Xử lý task tiếp theo."""
            if not self.tasks.is_empty():
                task = self.tasks.dequeue()
                self.completed_tasks.append(task)
                print(f"Processing task: {task}")
                return task
            else:
                print("No tasks to process")
                return None
        
        def show_status(self):
            """Hiển thị trạng thái."""
            print(f"Pending tasks: {self.tasks}")
            print(f"Completed tasks: {self.completed_tasks}")
    
    scheduler = TaskScheduler()
    scheduler.add_task("Send email")
    scheduler.add_task("Process payment")
    scheduler.add_task("Generate report")
    scheduler.show_status()
    
    print(f"\nProcessing tasks:")
    while not scheduler.tasks.is_empty():
        scheduler.process_next_task()
    
    scheduler.show_status()
    
    # 2. Breadth-First Search simulation
    def bfs_demo():
        """Demo BFS sử dụng queue."""
        # Simple tree: A -> B, C; B -> D, E; C -> F
        graph = {
            'A': ['B', 'C'],
            'B': ['D', 'E'],
            'C': ['F'],
            'D': [],
            'E': [],
            'F': []
        }
        
        def bfs(graph, start):
            """Breadth-First Search."""
            visited = set()
            queue = Queue()
            result = []
            
            queue.enqueue(start)
            visited.add(start)
            
            while not queue.is_empty():
                node = queue.dequeue()
                result.append(node)
                
                for neighbor in graph[node]:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.enqueue(neighbor)
            
            return result
        
        print(f"\nBFS traversal from 'A': {bfs(graph, 'A')}")
    
    bfs_demo()

demo_queue()
```

### Binary Tree (Cây nhị phân)
**Đặc điểm**: Mỗi node có tối đa 2 con (left, right)

```python
class TreeNode:
    """Node của binary tree."""
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
    
    def __str__(self):
        return str(self.value)

class BinaryTree:
    """Implementation của Binary Tree."""
    
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        """Thêm node vào tree (BST style)."""
        if self.root is None:
            self.root = TreeNode(value)
        else:
            self._insert_recursive(self.root, value)
    
    def _insert_recursive(self, node, value):
        """Helper method cho insert."""
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
            else:
                self._insert_recursive(node.right, value)
    
    def inorder_traversal(self):
        """Duyệt cây theo thứ tự: Left -> Root -> Right."""
        result = []
        self._inorder_recursive(self.root, result)
        return result
    
    def _inorder_recursive(self, node, result):
        """Helper method cho inorder traversal."""
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.value)
            self._inorder_recursive(node.right, result)
    
    def preorder_traversal(self):
        """Duyệt cây theo thứ tự: Root -> Left -> Right."""
        result = []
        self._preorder_recursive(self.root, result)
        return result
    
    def _preorder_recursive(self, node, result):
        """Helper method cho preorder traversal."""
        if node:
            result.append(node.value)
            self._preorder_recursive(node.left, result)
            self._preorder_recursive(node.right, result)
    
    def postorder_traversal(self):
        """Duyệt cây theo thứ tự: Left -> Right -> Root."""
        result = []
        self._postorder_recursive(self.root, result)
        return result
    
    def _postorder_recursive(self, node, result):
        """Helper method cho postorder traversal."""
        if node:
            self._postorder_recursive(node.left, result)
            self._postorder_recursive(node.right, result)
            result.append(node.value)
    
    def search(self, value):
        """Tìm kiếm value trong tree."""
        return self._search_recursive(self.root, value)
    
    def _search_recursive(self, node, value):
        """Helper method cho search."""
        if node is None or node.value == value:
            return node
        
        if value < node.value:
            return self._search_recursive(node.left, value)
        else:
            return self._search_recursive(node.right, value)
    
    def height(self):
        """Tính chiều cao của tree."""
        return self._height_recursive(self.root)
    
    def _height_recursive(self, node):
        """Helper method cho height calculation."""
        if node is None:
            return 0
        
        left_height = self._height_recursive(node.left)
        right_height = self._height_recursive(node.right)
        
        return max(left_height, right_height) + 1

def demo_binary_tree():
    """Demo binary tree operations."""
    print("=== BINARY TREE DEMO ===")
    
    # Create tree
    tree = BinaryTree()
    values = [50, 30, 70, 20, 40, 60, 80]
    
    print(f"Inserting values: {values}")
    for value in values:
        tree.insert(value)
    
    # Tree structure visualization (conceptual):
    #       50
    #      /  \
    #     30   70
    #    / |   | \
    #   20 40  60 80
    
    # Traversals
    print(f"Inorder (sorted): {tree.inorder_traversal()}")
    print(f"Preorder: {tree.preorder_traversal()}")
    print(f"Postorder: {tree.postorder_traversal()}")
    
    # Search
    search_values = [40, 90]
    for val in search_values:
        found = tree.search(val)
        result = "Found" if found else "Not found"
        print(f"Search {val}: {result}")
    
    # Height
    print(f"Tree height: {tree.height()}")

demo_binary_tree()
```

---

## 📊 3. PERFORMANCE COMPARISON

```python
def performance_comparison():
    """So sánh performance của các data structures."""
    print("=== PERFORMANCE COMPARISON ===")
    
    import time
    import random
    
    # Setup data
    n = 10000
    test_data = list(range(n))
    random.shuffle(test_data)
    
    # Test data structures
    test_list = []
    test_set = set()
    test_dict = {}
    
    # 1. Insertion performance
    print("1. INSERTION PERFORMANCE")
    
    # List append - O(1)
    start = time.perf_counter()
    for item in test_data:
        test_list.append(item)
    list_insert_time = time.perf_counter() - start
    
    # Set add - O(1) average
    start = time.perf_counter()
    for item in test_data:
        test_set.add(item)
    set_insert_time = time.perf_counter() - start
    
    # Dict insert - O(1) average
    start = time.perf_counter()
    for item in test_data:
        test_dict[item] = True
    dict_insert_time = time.perf_counter() - start
    
    print(f"  List append: {list_insert_time:.4f}s")
    print(f"  Set add: {set_insert_time:.4f}s")
    print(f"  Dict insert: {dict_insert_time:.4f}s")
    
    # 2. Search performance
    print(f"\n2. SEARCH PERFORMANCE")
    
    search_items = random.sample(test_data, 1000)
    
    # List search - O(n)
    start = time.perf_counter()
    for item in search_items:
        _ = item in test_list
    list_search_time = time.perf_counter() - start
    
    # Set search - O(1) average
    start = time.perf_counter()
    for item in search_items:
        _ = item in test_set
    set_search_time = time.perf_counter() - start
    
    # Dict search - O(1) average
    start = time.perf_counter()
    for item in search_items:
        _ = item in test_dict
    dict_search_time = time.perf_counter() - start
    
    print(f"  List search: {list_search_time:.4f}s")
    print(f"  Set search: {set_search_time:.4f}s")
    print(f"  Dict search: {dict_search_time:.4f}s")
    
    # Speed comparison
    if set_search_time > 0:
        print(f"  Set is {list_search_time/set_search_time:.0f}x faster than list for search")
    
    # 3. Memory usage
    print(f"\n3. MEMORY USAGE")
    import sys
    
    print(f"  List memory: {sys.getsizeof(test_list):,} bytes")
    print(f"  Set memory: {sys.getsizeof(test_set):,} bytes")
    print(f"  Dict memory: {sys.getsizeof(test_dict):,} bytes")

performance_comparison()
```

---

## 🎯 4. CHOOSING THE RIGHT DATA STRUCTURE

```python
def choosing_guide():
    """Hướng dẫn chọn data structure phù hợp."""
    print("=== CHOOSING THE RIGHT DATA STRUCTURE ===")
    
    scenarios = [
        {
            "scenario": "Lưu trữ danh sách học sinh có thể sửa đổi",
            "best_choice": "List",
            "reason": "Ordered, mutable, allows duplicates"
        },
        {
            "scenario": "Tìm kiếm nhanh ID học sinh",
            "best_choice": "Set or Dict",
            "reason": "O(1) average lookup time"
        },
        {
            "scenario": "Lưu thông tin học sinh với key-value",
            "best_choice": "Dictionary",
            "reason": "Key-value mapping, fast lookup"
        },
        {
            "scenario": "Tọa độ điểm không thay đổi",
            "best_choice": "Tuple", 
            "reason": "Immutable, can be dict key"
        },
        {
            "scenario": "Danh sách môn học không trùng lặp",
            "best_choice": "Set",
            "reason": "Automatically removes duplicates"
        },
        {
            "scenario": "Undo functionality",
            "best_choice": "Stack",
            "reason": "LIFO - last action undone first"
        },
        {
            "scenario": "Task queue processing",
            "best_choice": "Queue",
            "reason": "FIFO - first task processed first"
        },
        {
            "scenario": "Hierarchical data (org chart)",
            "best_choice": "Tree",
            "reason": "Natural hierarchy representation"
        }
    ]
    
    for i, item in enumerate(scenarios, 1):
        print(f"{i}. {item['scenario']}")
        print(f"   → Best choice: {item['best_choice']}")
        print(f"   → Reason: {item['reason']}\n")

choosing_guide()
```

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [📖 Thuật Ngữ Lập Trình](./programming-terms.md) - Thuật ngữ cơ bản
- [🐍 Thuật Ngữ Python](./python-specific.md) - Thuật ngữ Python
- [🔄 Thuật Toán](./algorithms.md) - Algorithms sử dụng data structures
- [📋 Python Cheatsheet](../reference/python-cheatsheet.md) - Tra cứu nhanh

---

## 💡 Tóm Tắt Data Structures

### 📊 **Quick Reference:**

| Structure | Ordered | Mutable | Duplicates | Use Case |
|-----------|---------|---------|------------|----------|
| **List** | ✅ | ✅ | ✅ | General purpose, sequences |
| **Tuple** | ✅ | ❌ | ✅ | Immutable data, dict keys |
| **Set** | ❌ | ✅ | ❌ | Unique items, fast lookup |
| **Dict** | ✅* | ✅ | ❌ keys | Key-value mapping |

*\*Insertion order preserved (Python 3.7+)*

### ⚡ **Performance (Big O):**

| Operation | List | Set | Dict | 
|-----------|------|-----|------|
| **Access** | O(1) | - | O(1) |
| **Search** | O(n) | O(1)* | O(1)* |
| **Insert** | O(1)** | O(1)* | O(1)* |
| **Delete** | O(n) | O(1)* | O(1)* |

*\*Average case, worst case O(n)*  
*\*\*Append only, insert at beginning is O(n)*

### 🎯 **Choosing Guidelines:**
- **Need order + mutability** → List
- **Need fast lookup** → Set/Dict
- **Need immutable** → Tuple
- **Need key-value** → Dict
- **Need LIFO** → Stack
- **Need FIFO** → Queue
- **Need hierarchy** → Tree

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: "Right data structure = Half the battle won!"*
