---
sidebar_position: 11
title: "🧠 Scope & Biến – Phạm Vi Biến Trong Python"
description: "Hiểu rõ phạm vi biến (local, enclosing, global, builtins) với quy tắc LEGB bằng ví dụ siêu dễ hiểu."
keywords: ["python", "scope", "LEGB", "global", "nonlocal", "biến", "hàm"]
---

# 🧠 Scope & Biến – Phạm Vi Biến Trong Python

::::tip Ý tưởng dễ hiểu
Hãy tưởng tượng lớp học có nhiều "khu vực": trong ngăn bàn, trong lớp, ngoài hành lang, và cả trường. Biến cũng có "khu vực sử dụng" giống vậy. Đừng lo, điều này dễ hơn bạn nghĩ!
::::

## 🔭 LEGB là gì?

- **L – Local**: Bên trong hàm hiện tại
- **E – Enclosing**: Bên trong hàm bao ngoài (nested function)
- **G – Global**: Cấp module (file .py hiện tại)
- **B – Builtins**: Hàm/const có sẵn của Python (`len`, `print`, ...)

Python tìm biến theo thứ tự: Local → Enclosing → Global → Builtins.

## 📦 Ví dụ cơ bản

```python
# Ví dụ minh họa LEGB
message = "from global"  # Biến global

def outer():
    message = "from outer"  # Enclosing

    def inner():
        message = "from inner"  # Local
        print(message)  # -> "from inner"

    inner()
    print(message)  # -> "from outer"

outer()
print(message)  # -> "from global"
```

## 🌍 Từ khóa global

```python
# Cẩn thận khi dùng global (nên hạn chế)
counter = 0  # Global

def increase():
    global counter  # Cho biết sẽ sửa biến global
    counter += 1

increase()
increase()
print(counter)  # -> 2
```

## 🧩 Từ khóa nonlocal (cho nested function)

```python
def make_counter():
    count = 0  # Enclosing

    def inc():
        nonlocal count  # Sửa biến ở scope bao ngoài gần nhất
        count += 1
        return count

    return inc

counter = make_counter()
print(counter())  # -> 1
print(counter())  # -> 2
```

## 🚫 Lỗi thường gặp

```python
total = 10

def add():
    # total += 5  # ❌ UnboundLocalError nếu không khai báo global
    pass
```

Vì có phép gán `+=`, Python nghĩ `total` là biến Local nhưng chưa được tạo. Cách sửa:

```python
total = 10

def add_ok():
    global total
    total += 5

add_ok()
print(total)  # -> 15
```

Hoặc tốt hơn: tránh sửa global, hãy trả về giá trị mới.

## ✅ Thực hành nhanh

1) Viết hàm `make_multiplier(factor)` trả về hàm nhân số bằng `factor` (dùng `nonlocal` nếu cần).

2) Viết chương trình đếm số lần gọi hàm `log()` mà không dùng biến global.

## 💡 Best practices (gợi ý)

- Tránh dùng `global` khi có thể. Dùng tham số, giá trị trả về, hoặc class.
- Dùng `nonlocal` cho closure khi cần cập nhật state.
- Đặt tên biến rõ ràng, tránh trùng với builtins như `list`, `str`.

---

👉 Bước tiếp theo: Ôn lại `functions-parameters` và áp dụng LEGB vào các bài tập nhỏ.


