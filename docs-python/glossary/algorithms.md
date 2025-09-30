# 🔄 Thuật Toán Cơ Bản - Basic Algorithms

> **Tóm tắt**: Hướng dẫn các thuật toán cơ bản được sử dụng phổ biến trong lập trình, từ sorting, searching đến graph algorithms. Mỗi thuật toán được giải thích bằng ngôn ngữ dễ hiểu và code Python thực tế.

## 🎯 Tại Sao Cần Học Thuật Toán?

Thuật toán như "công thức nấu ăn" trong lập trình! 👨‍🍳

- **Sorting** như sắp xếp sách trên kệ 📚
- **Searching** như tìm từ trong từ điển 🔍  
- **Graph algorithms** như tìm đường đi ngắn nhất 🗺️
- **Dynamic programming** như ghi nhớ kết quả để tái sử dụng 💾

Hiểu thuật toán giúp bạn:
- **Giải quyết vấn đề** hiệu quả hơn
- **Tối ưu performance** của code
- **Vượt qua phỏng vấn** technical
- **Tư duy logic** tốt hơn

---

## 🔍 1. SEARCHING ALGORITHMS

### Linear Search (Tìm kiếm tuyến tính)
**Đặc điểm**: Tìm từng phần tử một, từ đầu đến cuối
**Time Complexity**: O(n)

```python
def linear_search(arr, target):
    """
    Tìm kiếm tuyến tính - duyệt từng phần tử.
    
    Args:
        arr: Danh sách cần tìm
        target: Giá trị cần tìm
    
    Returns:
        int: Index của phần tử (hoặc -1 nếu không tìm thấy)
    """
    print(f"🔍 Searching for {target} in {arr}")
    
    for i in range(len(arr)):
        print(f"  Checking index {i}: {arr[i]}")
        if arr[i] == target:
            print(f"  ✅ Found {target} at index {i}")
            return i
    
    print(f"  ❌ {target} not found")
    return -1

def linear_search_demo():
    """Demo linear search với ví dụ thực tế."""
    print("=== LINEAR SEARCH DEMO ===")
    
    # Ví dụ: Tìm học sinh trong danh sách
    students = ["An", "Bình", "Cường", "Dung", "Em"]
    
    # Test cases
    test_names = ["Cường", "Phương"]
    
    for name in test_names:
        print(f"\nTìm học sinh '{name}':")
        index = linear_search(students, name)
        if index != -1:
            print(f"Học sinh {name} ở vị trí {index + 1}")
        else:
            print(f"Không tìm thấy học sinh {name}")

# linear_search_demo()
```

### Binary Search (Tìm kiếm nhị phân)
**Đặc điểm**: Chia đôi không gian tìm kiếm (cần mảng đã sắp xếp)
**Time Complexity**: O(log n)

```python
def binary_search(arr, target):
    """
    Tìm kiếm nhị phân - chia đôi không gian tìm kiếm.
    
    Args:
        arr: Danh sách đã sắp xếp
        target: Giá trị cần tìm
    
    Returns:
        int: Index của phần tử (hoặc -1 nếu không tìm thấy)
    """
    left = 0
    right = len(arr) - 1
    
    print(f"🔍 Binary search for {target} in {arr}")
    
    while left <= right:
        mid = (left + right) // 2
        mid_value = arr[mid]
        
        print(f"  Checking middle: arr[{mid}] = {mid_value}")
        
        if mid_value == target:
            print(f"  ✅ Found {target} at index {mid}")
            return mid
        elif mid_value < target:
            print(f"  {mid_value} < {target}, search right half")
            left = mid + 1
        else:
            print(f"  {mid_value} > {target}, search left half")
            right = mid - 1
    
    print(f"  ❌ {target} not found")
    return -1

def binary_search_recursive(arr, target, left=0, right=None):
    """Binary search phiên bản đệ quy."""
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

def binary_search_demo():
    """Demo binary search."""
    print("=== BINARY SEARCH DEMO ===")
    
    # Danh sách điểm số đã sắp xếp
    scores = [65, 70, 75, 80, 85, 90, 95]
    
    # Test cases
    test_scores = [80, 77, 95, 60]
    
    for score in test_scores:
        print(f"\nTìm điểm {score}:")
        index = binary_search(scores, score)
        if index != -1:
            print(f"Điểm {score} ở vị trí {index}")

# binary_search_demo()
```

### Performance Comparison
```python
def search_performance_comparison():
    """So sánh performance giữa linear và binary search."""
    print("=== SEARCH PERFORMANCE COMPARISON ===")
    
    import time
    import random
    
    # Tạo data test lớn
    n = 100000
    sorted_data = list(range(0, n * 2, 2))  # Even numbers: 0, 2, 4, ..., 199998
    search_targets = random.sample(sorted_data, 1000)
    
    # Linear search performance
    start_time = time.perf_counter()
    linear_results = []
    for target in search_targets:
        result = target in sorted_data  # Python's built-in linear search
        linear_results.append(result)
    linear_time = time.perf_counter() - start_time
    
    # Binary search performance (using bisect module)
    import bisect
    start_time = time.perf_counter()
    binary_results = []
    for target in search_targets:
        index = bisect.bisect_left(sorted_data, target)
        result = index < len(sorted_data) and sorted_data[index] == target
        binary_results.append(result)
    binary_time = time.perf_counter() - start_time
    
    print(f"Data size: {n:,} elements")
    print(f"Search queries: {len(search_targets)} items")
    print(f"Linear search time: {linear_time:.4f}s")
    print(f"Binary search time: {binary_time:.4f}s")
    
    if binary_time > 0:
        speedup = linear_time / binary_time
        print(f"Binary search is {speedup:.1f}x faster!")

# search_performance_comparison()
```

---

## 📈 2. SORTING ALGORITHMS

### Bubble Sort (Sắp xếp nổi bọt)
**Đặc điểm**: So sánh từng cặp liền kề và đổi chỗ
**Time Complexity**: O(n²)

```python
def bubble_sort(arr):
    """
    Bubble sort - sắp xếp nổi bọt.
    
    Args:
        arr: Danh sách cần sắp xếp
    
    Returns:
        list: Danh sách đã sắp xếp
    """
    arr = arr.copy()  # Không thay đổi mảng gốc
    n = len(arr)
    
    print(f"🫧 Bubble Sort: {arr}")
    
    for i in range(n):
        swapped = False
        print(f"\nPass {i + 1}:")
        
        for j in range(0, n - i - 1):
            print(f"  Compare {arr[j]} and {arr[j + 1]}", end="")
            
            if arr[j] > arr[j + 1]:
                # Swap
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                print(f" → Swap! Array: {arr}")
            else:
                print(f" → No swap")
        
        if not swapped:
            print(f"  No swaps in this pass, array is sorted!")
            break
    
    return arr

def bubble_sort_demo():
    """Demo bubble sort."""
    print("=== BUBBLE SORT DEMO ===")
    
    # Test với điểm số học sinh
    scores = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original scores: {scores}")
    
    sorted_scores = bubble_sort(scores)
    print(f"\nFinal sorted scores: {sorted_scores}")

# bubble_sort_demo()
```

### Selection Sort (Sắp xếp chọn)
**Đặc điểm**: Tìm phần tử nhỏ nhất và đặt vào đầu
**Time Complexity**: O(n²)

```python
def selection_sort(arr):
    """
    Selection sort - sắp xếp chọn.
    
    Args:
        arr: Danh sách cần sắp xếp
    
    Returns:
        list: Danh sách đã sắp xếp
    """
    arr = arr.copy()
    n = len(arr)
    
    print(f"🎯 Selection Sort: {arr}")
    
    for i in range(n):
        # Tìm phần tử nhỏ nhất trong phần chưa sắp xếp
        min_idx = i
        
        print(f"\nStep {i + 1}: Finding minimum from index {i}")
        print(f"  Current minimum: {arr[min_idx]} at index {min_idx}")
        
        for j in range(i + 1, n):
            print(f"  Checking {arr[j]} at index {j}", end="")
            if arr[j] < arr[min_idx]:
                min_idx = j
                print(f" → New minimum!")
            else:
                print("")
        
        # Swap với phần tử đầu tiên của phần chưa sắp xếp
        if min_idx != i:
            print(f"  Swapping {arr[i]} and {arr[min_idx]}")
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
        else:
            print(f"  {arr[i]} is already in correct position")
        
        print(f"  Array after step {i + 1}: {arr}")
    
    return arr

def selection_sort_demo():
    """Demo selection sort."""
    print("=== SELECTION SORT DEMO ===")
    
    # Test với tên học sinh (sắp xếp theo alphabet)
    names = ["Dung", "An", "Em", "Bình", "Cường"]
    print(f"Original names: {names}")
    
    sorted_names = selection_sort(names)
    print(f"\nFinal sorted names: {sorted_names}")

# selection_sort_demo()
```

### Merge Sort (Sắp xếp trộn)
**Đặc điểm**: Chia để trị - chia nhỏ rồi ghép lại
**Time Complexity**: O(n log n)

```python
def merge_sort(arr):
    """
    Merge sort - sắp xếp trộn (divide and conquer).
    
    Args:
        arr: Danh sách cần sắp xếp
    
    Returns:
        list: Danh sách đã sắp xếp
    """
    if len(arr) <= 1:
        return arr.copy()
    
    # Chia mảng thành 2 nửa
    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]
    
    print(f"🔄 Dividing: {arr} → {left_half} | {right_half}")
    
    # Đệ quy sắp xếp từng nửa
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)
    
    # Trộn hai nửa đã sắp xếp
    merged = merge(left_sorted, right_sorted)
    print(f"🔗 Merging: {left_sorted} + {right_sorted} → {merged}")
    
    return merged

def merge(left, right):
    """
    Trộn hai mảng đã sắp xếp thành một.
    
    Args:
        left: Mảng trái đã sắp xếp
        right: Mảng phải đã sắp xếp
    
    Returns:
        list: Mảng đã được trộn và sắp xếp
    """
    result = []
    i = j = 0
    
    # So sánh và trộn
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Thêm phần tử còn lại
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

def merge_sort_demo():
    """Demo merge sort."""
    print("=== MERGE SORT DEMO ===")
    
    # Test với điểm số
    scores = [38, 27, 43, 3, 9, 82, 10]
    print(f"Original scores: {scores}")
    print()
    
    sorted_scores = merge_sort(scores)
    print(f"\nFinal sorted scores: {sorted_scores}")

# merge_sort_demo()
```

### Quick Sort (Sắp xếp nhanh)
**Đặc điểm**: Chọn pivot, phân chia quanh pivot  
**Time Complexity**: O(n log n) average, O(n²) worst case

```python
def quick_sort(arr, low=0, high=None):
    """
    Quick sort - sắp xếp nhanh.
    
    Args:
        arr: Danh sách cần sắp xếp
        low: Chỉ số bắt đầu
        high: Chỉ số kết thúc
    
    Returns:
        list: Danh sách đã sắp xếp
    """
    if high is None:
        arr = arr.copy()
        high = len(arr) - 1
    
    if low < high:
        # Tìm pivot index
        pivot_index = partition(arr, low, high)
        
        print(f"🚀 Pivot {arr[pivot_index]} at index {pivot_index}")
        print(f"   Array: {arr[low:high+1]}")
        
        # Đệ quy sắp xếp hai phần
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    """
    Phân chia mảng quanh pivot.
    
    Args:
        arr: Mảng cần phân chia
        low: Chỉ số bắt đầu
        high: Chỉ số kết thúc
    
    Returns:
        int: Vị trí cuối cùng của pivot
    """
    # Chọn phần tử cuối làm pivot
    pivot = arr[high]
    i = low - 1  # Index của phần tử nhỏ hơn
    
    print(f"  Partitioning around pivot {pivot}:")
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
            print(f"    Swap {arr[j]} and {arr[i]} (both ≤ {pivot})")
    
    # Đặt pivot vào vị trí đúng
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    print(f"    Place pivot {pivot} at index {i + 1}")
    
    return i + 1

def quick_sort_demo():
    """Demo quick sort."""
    print("=== QUICK SORT DEMO ===")
    
    # Test với điểm số
    scores = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original scores: {scores}")
    print()
    
    sorted_scores = quick_sort(scores)
    print(f"\nFinal sorted scores: {sorted_scores}")

# quick_sort_demo()
```

### Sorting Performance Comparison
```python
def sorting_performance_comparison():
    """So sánh performance của các thuật toán sorting."""
    print("=== SORTING PERFORMANCE COMPARISON ===")
    
    import time
    import random
    
    # Tạo test data với sizes khác nhau
    sizes = [100, 1000, 5000]
    
    for size in sizes:
        print(f"\n📊 Testing with {size} elements:")
        
        # Tạo random data
        original_data = [random.randint(1, 1000) for _ in range(size)]
        
        # Test bubble sort (chỉ với data nhỏ)
        if size <= 1000:
            data = original_data.copy()
            start = time.perf_counter()
            bubble_sort_simple(data)
            bubble_time = time.perf_counter() - start
            print(f"  Bubble Sort: {bubble_time:.4f}s")
        
        # Test selection sort (chỉ với data nhỏ)
        if size <= 1000:
            data = original_data.copy()
            start = time.perf_counter()
            selection_sort_simple(data)
            selection_time = time.perf_counter() - start
            print(f"  Selection Sort: {selection_time:.4f}s")
        
        # Test merge sort
        data = original_data.copy()
        start = time.perf_counter()
        merge_sort_simple(data)
        merge_time = time.perf_counter() - start
        print(f"  Merge Sort: {merge_time:.4f}s")
        
        # Test Python's built-in sort (Timsort)
        data = original_data.copy()
        start = time.perf_counter()
        data.sort()
        builtin_time = time.perf_counter() - start
        print(f"  Python Built-in: {builtin_time:.4f}s")

def bubble_sort_simple(arr):
    """Bubble sort đơn giản cho performance test."""
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

def selection_sort_simple(arr):
    """Selection sort đơn giản cho performance test."""
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

def merge_sort_simple(arr):
    """Merge sort đơn giản cho performance test."""
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort_simple(arr[:mid])
    right = merge_sort_simple(arr[mid:])
    
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# sorting_performance_comparison()
```

---

## 🌐 3. GRAPH ALGORITHMS

### Graph Representation
```python
class Graph:
    """Biểu diễn đồ thị bằng adjacency list."""
    
    def __init__(self):
        self.vertices = {}
    
    def add_vertex(self, vertex):
        """Thêm đỉnh vào đồ thị."""
        if vertex not in self.vertices:
            self.vertices[vertex] = []
    
    def add_edge(self, from_vertex, to_vertex, weight=1):
        """Thêm cạnh vào đồ thị."""
        self.add_vertex(from_vertex)
        self.add_vertex(to_vertex)
        self.vertices[from_vertex].append((to_vertex, weight))
    
    def add_undirected_edge(self, vertex1, vertex2, weight=1):
        """Thêm cạnh không có hướng."""
        self.add_edge(vertex1, vertex2, weight)
        self.add_edge(vertex2, vertex1, weight)
    
    def get_neighbors(self, vertex):
        """Lấy danh sách neighbors của một vertex."""
        return self.vertices.get(vertex, [])
    
    def __str__(self):
        """String representation của graph."""
        result = "Graph:\n"
        for vertex, neighbors in self.vertices.items():
            neighbor_str = ", ".join([f"{n[0]}({n[1]})" for n in neighbors])
            result += f"  {vertex} → [{neighbor_str}]\n"
        return result

def create_sample_graph():
    """Tạo đồ thì mẫu - mạng lưới thành phố."""
    graph = Graph()
    
    # Thêm các thành phố và kết nối
    cities = [
        ("Hà Nội", "Hải Phòng", 120),
        ("Hà Nội", "Vinh", 300),
        ("Hà Nội", "Huế", 540),
        ("Vinh", "Huế", 240),
        ("Huế", "Đà Nẵng", 100),
        ("Đà Nẵng", "Nha Trang", 530),
        ("Huế", "TP.HCM", 980),
        ("Nha Trang", "TP.HCM", 450)
    ]
    
    for city1, city2, distance in cities:
        graph.add_undirected_edge(city1, city2, distance)
    
    return graph
```

### Breadth-First Search (BFS)
**Đặc điểm**: Duyệt theo chiều rộng, dùng queue
**Time Complexity**: O(V + E)

```python
from collections import deque

def bfs(graph, start_vertex):
    """
    Breadth-First Search - duyệt theo chiều rộng.
    
    Args:
        graph: Đồ thị cần duyệt
        start_vertex: Đỉnh bắt đầu
    
    Returns:
        list: Thứ tự duyệt các đỉnh
    """
    visited = set()
    queue = deque([start_vertex])
    result = []
    
    print(f"🌊 BFS starting from {start_vertex}")
    
    while queue:
        current = queue.popleft()
        
        if current not in visited:
            visited.add(current)
            result.append(current)
            print(f"  Visiting: {current}")
            
            # Thêm neighbors chưa visited vào queue
            neighbors = [neighbor[0] for neighbor in graph.get_neighbors(current)]
            for neighbor in neighbors:
                if neighbor not in visited and neighbor not in queue:
                    queue.append(neighbor)
                    print(f"    Added to queue: {neighbor}")
        
        print(f"    Queue: {list(queue)}")
    
    return result

def bfs_shortest_path(graph, start, end):
    """
    Tìm đường đi ngắn nhất bằng BFS (số bước ít nhất).
    
    Args:
        graph: Đồ thị
        start: Đỉnh bắt đầu  
        end: Đỉnh kết thúc
    
    Returns:
        list: Đường đi ngắn nhất (hoặc None nếu không có)
    """
    if start == end:
        return [start]
    
    visited = set()
    queue = deque([(start, [start])])  # (current_vertex, path_to_current)
    
    print(f"🎯 Finding shortest path from {start} to {end}")
    
    while queue:
        current, path = queue.popleft()
        
        if current not in visited:
            visited.add(current)
            
            # Check neighbors
            neighbors = [neighbor[0] for neighbor in graph.get_neighbors(current)]
            for neighbor in neighbors:
                new_path = path + [neighbor]
                
                if neighbor == end:
                    print(f"  ✅ Found path: {' → '.join(new_path)}")
                    return new_path
                
                if neighbor not in visited:
                    queue.append((neighbor, new_path))
    
    print(f"  ❌ No path found from {start} to {end}")
    return None

def bfs_demo():
    """Demo BFS algorithm."""
    print("=== BFS DEMO ===")
    
    graph = create_sample_graph()
    print(graph)
    
    # Test BFS traversal
    traversal = bfs(graph, "Hà Nội")
    print(f"BFS traversal from Hà Nội: {traversal}")
    
    # Test shortest path
    print(f"\n" + "="*50)
    path = bfs_shortest_path(graph, "Hà Nội", "TP.HCM")
    if path:
        print(f"Shortest path (by steps): {' → '.join(path)}")

# bfs_demo()
```

### Depth-First Search (DFS)
**Đặc điểm**: Duyệt theo chiều sâu, dùng stack (hoặc đệ quy)
**Time Complexity**: O(V + E)

```python
def dfs_recursive(graph, start_vertex, visited=None, result=None):
    """
    Depth-First Search đệ quy - duyệt theo chiều sâu.
    
    Args:
        graph: Đồ thị cần duyệt
        start_vertex: Đỉnh bắt đầu
        visited: Set các đỉnh đã thăm
        result: List kết quả duyệt
    
    Returns:
        list: Thứ tự duyệt các đỉnh
    """
    if visited is None:
        visited = set()
        result = []
        print(f"🏔️ DFS starting from {start_vertex}")
    
    if start_vertex not in visited:
        visited.add(start_vertex)
        result.append(start_vertex)
        print(f"  Visiting: {start_vertex}")
        
        # Recursively visit neighbors
        neighbors = [neighbor[0] for neighbor in graph.get_neighbors(start_vertex)]
        for neighbor in neighbors:
            if neighbor not in visited:
                print(f"    Going deeper to: {neighbor}")
                dfs_recursive(graph, neighbor, visited, result)
    
    return result

def dfs_iterative(graph, start_vertex):
    """
    Depth-First Search iterative - dùng stack.
    
    Args:
        graph: Đồ thị cần duyệt
        start_vertex: Đỉnh bắt đầu
    
    Returns:
        list: Thứ tự duyệt các đỉnh
    """
    visited = set()
    stack = [start_vertex]
    result = []
    
    print(f"🏔️ DFS (iterative) starting from {start_vertex}")
    
    while stack:
        current = stack.pop()
        
        if current not in visited:
            visited.add(current)
            result.append(current)
            print(f"  Visiting: {current}")
            
            # Add neighbors to stack (in reverse order for consistent results)
            neighbors = [neighbor[0] for neighbor in graph.get_neighbors(current)]
            for neighbor in reversed(neighbors):
                if neighbor not in visited:
                    stack.append(neighbor)
                    print(f"    Added to stack: {neighbor}")
        
        print(f"    Stack: {stack}")
    
    return result

def dfs_demo():
    """Demo DFS algorithm."""
    print("=== DFS DEMO ===")
    
    graph = create_sample_graph()
    print(graph)
    
    # Test DFS recursive
    print("DFS Recursive:")
    traversal_recursive = dfs_recursive(graph, "Hà Nội")
    print(f"Result: {traversal_recursive}")
    
    print(f"\n" + "="*50)
    
    # Test DFS iterative  
    print("DFS Iterative:")
    traversal_iterative = dfs_iterative(graph, "Hà Nội")
    print(f"Result: {traversal_iterative}")

# dfs_demo()
```

### Dijkstra's Algorithm (Tìm đường đi ngắn nhất)
**Đặc điểm**: Tìm đường đi ngắn nhất từ một điểm đến tất cả điểm khác
**Time Complexity**: O((V + E) log V)

```python
import heapq

def dijkstra(graph, start_vertex):
    """
    Dijkstra's algorithm - tìm đường đi ngắn nhất.
    
    Args:
        graph: Đồ thị có trọng số
        start_vertex: Đỉnh bắt đầu
    
    Returns:
        tuple: (distances, previous) - khoảng cách và đường đi
    """
    # Khởi tạo
    distances = {vertex: float('infinity') for vertex in graph.vertices}
    distances[start_vertex] = 0
    previous = {vertex: None for vertex in graph.vertices}
    
    # Priority queue: (distance, vertex)
    pq = [(0, start_vertex)]
    visited = set()
    
    print(f"🗺️ Dijkstra's algorithm from {start_vertex}")
    
    while pq:
        current_distance, current_vertex = heapq.heappop(pq)
        
        if current_vertex in visited:
            continue
        
        visited.add(current_vertex)
        print(f"  Processing {current_vertex} (distance: {current_distance})")
        
        # Check neighbors
        for neighbor, weight in graph.get_neighbors(current_vertex):
            if neighbor not in visited:
                new_distance = current_distance + weight
                
                if new_distance < distances[neighbor]:
                    distances[neighbor] = new_distance
                    previous[neighbor] = current_vertex
                    heapq.heappush(pq, (new_distance, neighbor))
                    
                    print(f"    Updated {neighbor}: distance = {new_distance} via {current_vertex}")
    
    return distances, previous

def reconstruct_path(previous, start, end):
    """
    Tái tạo đường đi từ kết quả Dijkstra.
    
    Args:
        previous: Dict chứa vertex trước đó trong đường đi tối ưu
        start: Đỉnh bắt đầu
        end: Đỉnh kết thúc
    
    Returns:
        list: Đường đi từ start đến end
    """
    path = []
    current = end
    
    while current is not None:
        path.append(current)
        current = previous[current]
    
    path.reverse()
    
    # Check if path is valid
    if path[0] == start:
        return path
    else:
        return None

def dijkstra_demo():
    """Demo Dijkstra's algorithm."""
    print("=== DIJKSTRA'S ALGORITHM DEMO ===")
    
    graph = create_sample_graph()
    print(graph)
    
    # Run Dijkstra
    distances, previous = dijkstra(graph, "Hà Nội")
    
    print(f"\n📊 Shortest distances from Hà Nội:")
    for city, distance in sorted(distances.items()):
        if distance != float('infinity'):
            print(f"  {city}: {distance} km")
    
    # Show paths to specific cities
    target_cities = ["TP.HCM", "Đà Nẵng"]
    
    print(f"\n🛣️ Shortest paths:")
    for city in target_cities:
        path = reconstruct_path(previous, "Hà Nội", city)
        if path:
            path_str = " → ".join(path)
            distance = distances[city]
            print(f"  To {city}: {path_str} ({distance} km)")

# dijkstra_demo()
```

---

## 🧮 4. DYNAMIC PROGRAMMING

### Fibonacci with Memoization
```python
def fibonacci_dynamic():
    """Demo dynamic programming với Fibonacci."""
    print("=== FIBONACCI DYNAMIC PROGRAMMING ===")
    
    # Naive recursive (exponential time)
    def fib_naive(n):
        if n <= 1:
            return n
        return fib_naive(n-1) + fib_naive(n-2)
    
    # Memoization (top-down)
    memo = {}
    def fib_memo(n):
        if n in memo:
            return memo[n]
        
        if n <= 1:
            result = n
        else:
            result = fib_memo(n-1) + fib_memo(n-2)
        
        memo[n] = result
        return result
    
    # Tabulation (bottom-up)
    def fib_tabulation(n):
        if n <= 1:
            return n
        
        dp = [0] * (n + 1)
        dp[1] = 1
        
        for i in range(2, n + 1):
            dp[i] = dp[i-1] + dp[i-2]
        
        return dp[n]
    
    # Test performance
    import time
    
    n = 35
    
    # Naive (only for small n)
    if n <= 35:
        start = time.perf_counter()
        result_naive = fib_naive(n)
        naive_time = time.perf_counter() - start
        print(f"Naive fib({n}) = {result_naive}, Time: {naive_time:.4f}s")
    
    # Memoization
    start = time.perf_counter()
    result_memo = fib_memo(n)
    memo_time = time.perf_counter() - start
    print(f"Memo fib({n}) = {result_memo}, Time: {memo_time:.6f}s")
    
    # Tabulation
    start = time.perf_counter()
    result_tab = fib_tabulation(n)
    tab_time = time.perf_counter() - start
    print(f"Tabulation fib({n}) = {result_tab}, Time: {tab_time:.6f}s")
    
    print(f"\nSpeedup: Memoization is {naive_time/memo_time:.0f}x faster than naive")

# fibonacci_dynamic()
```

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [📊 Cấu Trúc Dữ Liệu](./data-structures.md) - Data structures cho algorithms
- [📖 Thuật Ngữ Lập Trình](./programming-terms.md) - Thuật ngữ cơ bản
- [🐍 Thuật Ngữ Python](./python-specific.md) - Python-specific terms
- [📋 Python Cheatsheet](../reference/python-cheatsheet.md) - Tra cứu nhanh

---

## 💡 Tóm Tắt Algorithms

### 🔍 **Searching:**
| Algorithm | Time | Space | Best Use Case |
|-----------|------|-------|---------------|
| **Linear Search** | O(n) | O(1) | Unsorted data, small datasets |
| **Binary Search** | O(log n) | O(1) | Sorted data, large datasets |

### 📈 **Sorting:**
| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |

### 🌐 **Graph Algorithms:**
| Algorithm | Time | Space | Purpose |
|-----------|------|-------|---------|
| **BFS** | O(V + E) | O(V) | Shortest path (unweighted) |
| **DFS** | O(V + E) | O(V) | Connectivity, topological sort |
| **Dijkstra** | O((V + E) log V) | O(V) | Shortest path (weighted) |

### 🧮 **Optimization Techniques:**
- **Memoization** - Cache results to avoid recomputation
- **Tabulation** - Build solutions bottom-up
- **Divide & Conquer** - Break into smaller subproblems
- **Greedy** - Make locally optimal choices

### 🎯 **Choosing Guidelines:**
- **Small data** → Simple algorithms (Bubble, Linear)
- **Large data** → Efficient algorithms (Merge, Binary)
- **Memory constrained** → In-place algorithms
- **Stability required** → Stable sorts (Merge, Bubble)
- **Graph problems** → BFS/DFS for connectivity, Dijkstra for shortest path

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: "Algorithm is the recipe, Data Structure is the ingredient!"*
