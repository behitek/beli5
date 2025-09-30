# 📋 Bài Tập về Danh Sách (List) trong Python

Chào bạn! Đây là một tập hợp các bài tập về danh sách trong Python, từ cơ bản đến nâng cao. Hãy thử sức với những bài tập này để củng cố kiến thức của bạn về list trong Python nhé!

## 🔰 Bài Tập Mức Cơ Bản

### Bài 1: Tạo và Truy Cập List
**Yêu cầu:** Tạo một list chứa tên của 5 loại trái cây yêu thích của bạn. In ra màn hình trái cây đầu tiên và trái cây cuối cùng trong danh sách.

<details>
<summary>Xem gợi ý</summary>

```python
# Tạo list các loại trái cây
fruits = ["apple", "banana", "orange", "grape", "watermelon"]

# In ra trái cây đầu tiên và cuối cùng
print(f"Trái cây đầu tiên: {fruits[0]}")
print(f"Trái cây cuối cùng: {fruits[-1]}")
```
</details>

### Bài 2: Thêm và Xóa Phần Tử
**Yêu cầu:** Tiếp tục với list trái cây ở trên, hãy thêm "mango" vào cuối danh sách và xóa "banana" khỏi danh sách. In danh sách sau khi thay đổi.

<details>
<summary>Xem gợi ý</summary>

```python
fruits = ["apple", "banana", "orange", "grape", "watermelon"]

# Thêm mango vào cuối danh sách
fruits.append("mango")

# Xóa banana khỏi danh sách
fruits.remove("banana")

# In danh sách sau thay đổi
print(f"Danh sách sau thay đổi: {fruits}")
```
</details>

### Bài 3: Đảo Ngược List
**Yêu cầu:** Tạo một list chứa các số từ 1 đến 10. Đảo ngược list này mà không dùng phương thức `reverse()`. In kết quả.

<details>
<summary>Xem gợi ý</summary>

```python
# Tạo list các số từ 1 đến 10
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Đảo ngược list (không dùng reverse())
reversed_numbers = numbers[::-1]

# In kết quả
print(f"List ban đầu: {numbers}")
print(f"List đảo ngược: {reversed_numbers}")
```
</details>

## 🔄 Bài Tập Mức Trung Bình

### Bài 4: Đếm Tần Suất Phần Tử
**Yêu cầu:** Cho một list `colors = ["red", "green", "blue", "red", "green", "yellow", "blue", "red"]`. Hãy đếm số lần xuất hiện của mỗi màu và hiển thị kết quả.

<details>
<summary>Xem gợi ý</summary>

```python
colors = ["red", "green", "blue", "red", "green", "yellow", "blue", "red"]

# Phương pháp 1: Dùng dictionary để đếm
color_count = {}
for color in colors:
    if color in color_count:
        color_count[color] += 1
    else:
        color_count[color] = 1

# Hiển thị kết quả
print("Số lần xuất hiện của mỗi màu:")
for color, count in color_count.items():
    print(f"{color}: {count}")

# Phương pháp 2: Dùng count()
print("\nPhương pháp khác:")
unique_colors = set(colors)
for color in unique_colors:
    print(f"{color}: {colors.count(color)}")
```
</details>

### Bài 5: Tách Số Chẵn và Lẻ
**Yêu cầu:** Cho một list các số `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`. Hãy tách thành hai list khác nhau, một chứa các số chẵn và một chứa các số lẻ.

<details>
<summary>Xem gợi ý</summary>

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Tách thành hai list
even_numbers = []
odd_numbers = []

for num in numbers:
    if num % 2 == 0:
        even_numbers.append(num)
    else:
        odd_numbers.append(num)

# Hiển thị kết quả
print(f"Các số chẵn: {even_numbers}")
print(f"Các số lẻ: {odd_numbers}")

# Phương pháp khác: Dùng list comprehension
even = [num for num in numbers if num % 2 == 0]
odd = [num for num in numbers if num % 2 != 0]

print(f"List comprehension - Số chẵn: {even}")
print(f"List comprehension - Số lẻ: {odd}")
```
</details>

### Bài 6: List Con Lớn Nhất
**Yêu cầu:** Cho một list `numbers = [2, -3, 5, 7, -1, -4, 8, 10]`. Tìm list con liên tiếp có tổng lớn nhất và in ra tổng đó.

<details>
<summary>Xem gợi ý</summary>

```python
numbers = [2, -3, 5, 7, -1, -4, 8, 10]

# Thuật toán Kadane để tìm subarray có tổng lớn nhất
max_so_far = numbers[0]
max_ending_here = numbers[0]

for i in range(1, len(numbers)):
    # Hoặc bắt đầu lại từ phần tử hiện tại hoặc thêm vào tổng hiện có
    max_ending_here = max(numbers[i], max_ending_here + numbers[i])
    # Cập nhật max_so_far nếu cần
    max_so_far = max(max_so_far, max_ending_here)

print(f"Tổng lớn nhất của list con liên tiếp: {max_so_far}")
```
</details>

## 🚀 Bài Tập Mức Nâng Cao

### Bài 7: Ma Trận Chuyển Vị
**Yêu cầu:** Cho ma trận 2 chiều `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`. Tạo ma trận chuyển vị (transpose) của nó.

<details>
<summary>Xem gợi ý</summary>

```python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# In ma trận ban đầu
print("Ma trận ban đầu:")
for row in matrix:
    print(row)

# Tạo ma trận chuyển vị
transpose = [[row[i] for row in matrix] for i in range(len(matrix[0]))]

# In ma trận chuyển vị
print("\nMa trận chuyển vị:")
for row in transpose:
    print(row)

# Phương pháp khác
transpose_alt = list(zip(*matrix))
print("\nMa trận chuyển vị (phương pháp zip):")
for row in transpose_alt:
    print(row)
```
</details>

### Bài 8: Lọc Số Nguyên Tố
**Yêu cầu:** Cho một list các số từ 1 đến 50. Hãy lọc ra các số nguyên tố từ list này sử dụng list comprehension.

<details>
<summary>Xem gợi ý</summary>

```python
# Tạo list các số từ 1 đến 50
numbers = list(range(1, 51))

# Hàm kiểm tra số nguyên tố
def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

# Lọc số nguyên tố bằng list comprehension
prime_numbers = [num for num in numbers if is_prime(num)]

print(f"Các số nguyên tố từ 1 đến 50: {prime_numbers}")
```
</details>

### Bài 9: Xóa Trùng Lặp và Giữ Thứ Tự
**Yêu cầu:** Cho một list `items = [3, 5, 2, 5, 8, 3, 9, 2, 1, 5]`. Hãy xóa các phần tử trùng lặp nhưng vẫn giữ nguyên thứ tự ban đầu của các phần tử đầu tiên.

<details>
<summary>Xem gợi ý</summary>

```python
items = [3, 5, 2, 5, 8, 3, 9, 2, 1, 5]

# Xóa trùng lặp và giữ thứ tự
def remove_duplicates(lst):
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

unique_items = remove_duplicates(items)
print(f"List sau khi xóa trùng lặp: {unique_items}")

# Phương pháp khác: Dùng dict.fromkeys() (Python 3.7+ đảm bảo giữ thứ tự)
unique_alt = list(dict.fromkeys(items))
print(f"Phương pháp dict.fromkeys(): {unique_alt}")
```
</details>

### Bài 10: Hợp và Giao của Hai List
**Yêu cầu:** Cho hai list `list1 = [1, 2, 3, 4, 5]` và `list2 = [4, 5, 6, 7, 8]`. Tìm hợp và giao của hai list này.

<details>
<summary>Xem gợi ý</summary>

```python
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]

# Tìm hợp (union)
union = list(set(list1) | set(list2))  # Chuyển về set để lấy hợp, rồi chuyển lại list

# Tìm giao (intersection)
intersection = list(set(list1) & set(list2))  # Chuyển về set để lấy giao, rồi chuyển lại list

print(f"Hợp của hai list: {union}")
print(f"Giao của hai list: {intersection}")

# Phương pháp thủ công (không dùng set)
manual_union = list1.copy()
for item in list2:
    if item not in manual_union:
        manual_union.append(item)

manual_intersection = []
for item in list1:
    if item in list2:
        manual_intersection.append(item)

print(f"Hợp (thủ công): {manual_union}")
print(f"Giao (thủ công): {manual_intersection}")
```
</details>

## 💪 Bài Tập Thử Thách

### Bài 11: Sắp Xếp Theo Tần Suất
**Yêu cầu:** Cho một list `data = [3, 1, 2, 2, 4, 1, 2, 5, 3, 1, 1, 5]`. Sắp xếp list này theo thứ tự giảm dần của tần suất xuất hiện. Nếu hai phần tử có cùng tần suất, sắp xếp theo giá trị.

<details>
<summary>Xem gợi ý</summary>

```python
data = [3, 1, 2, 2, 4, 1, 2, 5, 3, 1, 1, 5]

# Đếm tần suất
frequency = {}
for item in data:
    if item in frequency:
        frequency[item] += 1
    else:
        frequency[item] = 1

# Sắp xếp theo tần suất giảm dần, nếu bằng nhau thì theo giá trị
sorted_data = sorted(data, key=lambda x: (-frequency[x], x))

print(f"List gốc: {data}")
print(f"Tần suất xuất hiện: {frequency}")
print(f"List sau khi sắp xếp theo tần suất: {sorted_data}")
```
</details>

### Bài 12: Tìm Tất Cả Hoán Vị
**Yêu cầu:** Viết một hàm để tìm tất cả các hoán vị có thể của một list.

<details>
<summary>Xem gợi ý</summary>

```python
def generate_permutations(lst):
    # Trường hợp cơ sở: list rỗng hoặc chỉ có một phần tử
    if len(lst) <= 1:
        return [lst]
    
    result = []
    # Lặp qua mỗi phần tử trong list
    for i in range(len(lst)):
        # Lấy phần tử hiện tại
        current = lst[i]
        # Lấy list còn lại sau khi bỏ phần tử hiện tại
        remaining_list = lst[:i] + lst[i+1:]
        # Tìm tất cả hoán vị của list còn lại
        for p in generate_permutations(remaining_list):
            # Thêm phần tử hiện tại vào mỗi hoán vị của list còn lại
            result.append([current] + p)
    
    return result

# Ví dụ sử dụng
test_list = [1, 2, 3]
permutations = generate_permutations(test_list)
print(f"Tất cả hoán vị của {test_list}:")
for i, perm in enumerate(permutations, 1):
    print(f"{i}. {perm}")

# Phương pháp sử dụng thư viện (hiệu quả hơn)
from itertools import permutations
print("\nSử dụng thư viện itertools:")
perms = list(permutations(test_list))
for i, perm in enumerate(perms, 1):
    print(f"{i}. {perm}")
```
</details>

## 🎯 Thực Hành Thêm

Hãy thử thực hiện các bài tập sau đây để nâng cao kỹ năng của bạn:

1. Viết chương trình tìm phần tử thứ k lớn nhất trong một list không sắp xếp
2. Viết chương trình ghép hai list đã sắp xếp thành một list mới cũng được sắp xếp
3. Viết chương trình tính tích vô hướng của hai vector (hai list số)
4. Viết chương trình tìm tất cả các cặp số trong list có tổng bằng một giá trị cho trước

---

Chúc bạn học tập hiệu quả! Nếu gặp khó khăn với bài tập nào, hãy xem lại kiến thức về list trong các bài học trước hoặc tìm kiếm thêm tài liệu tham khảo nhé.
