---
title: Arrays and Dynamic Arrays
chapter: Linear Data Structures
description: Constant-time indexing, address calculation, and how growable arrays stay fast.
---
An **array** stores elements of the same size in one contiguous block of memory. Because every element has the same size, the address of element `i` can be computed directly, so reading or writing `a[i]` takes **O(1)** time.

```pipeline
caption: An int array of 5 elements starting at address 1000 (4 bytes each)
a[0] | 1000
a[1] | 1004
a[2] | 1008
a[3] | 1012
a[4] | 1016
```

address of `a[i]` = base + i × size of one element

## Two-dimensional arrays

A 2-D array `A[R][C]` is stored row by row (**row-major**, as in C and Java) or column by column (**column-major**, as in Fortran and MATLAB):

- Row-major: address of `A[i][j]` = base + (i × C + j) × size
- Column-major: address of `A[i][j]` = base + (j × R + i) × size

## Operation costs

| Operation | Time | Why |
| --- | --- | --- |
| Read or write `a[i]` | O(1) | address computed directly |
| Search (unsorted) | O(n) | may need to look at every element |
| Insert or delete at the end | O(1) amortised | see dynamic arrays below |
| Insert or delete at index i | O(n − i) | later elements must shift by one |

## Dynamic arrays

A plain array has a fixed size. A **dynamic array** (Java's `ArrayList`, Python's `list`) keeps a larger internal array and, when it fills up, allocates a new one of **double** the size and copies everything across. Copying is expensive, but it happens so rarely that the **amortised** (average) cost of an append is still O(1).

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        DynamicArray arr = new DynamicArray();
        for (int i = 1; i <= 9; i++) arr.append(i * 10);
        System.out.println(arr);
        System.out.println("size = " + arr.size() + ", capacity = " + arr.capacity());
        System.out.println("elements copied while growing: " + arr.copies);
        System.out.println("arr.get(4) = " + arr.get(4));
    }
}

class DynamicArray {
    private int[] data = new int[1];
    private int size = 0;
    int copies = 0;

    void append(int value) {
        if (size == data.length) {                 // full: double the capacity
            int[] bigger = new int[data.length * 2];
            for (int i = 0; i < size; i++) {
                bigger[i] = data[i];
                copies++;
            }
            data = bigger;
        }
        data[size++] = value;
    }

    int get(int i) {
        if (i < 0 || i >= size) throw new IndexOutOfBoundsException("index " + i);
        return data[i];
    }

    int size() { return size; }
    int capacity() { return data.length; }

    public String toString() { return Arrays.toString(Arrays.copyOf(data, size)); }
}
```
```output
[10, 20, 30, 40, 50, 60, 70, 80, 90]
size = 9, capacity = 16
elements copied while growing: 15
arr.get(4) = 50
```
```python
class DynamicArray:
    def __init__(self):
        self.data = [None]          # capacity 1
        self.size = 0
        self.copies = 0

    def append(self, value):
        if self.size == len(self.data):            # full: double the capacity
            bigger = [None] * (2 * len(self.data))
            for i in range(self.size):
                bigger[i] = self.data[i]
                self.copies += 1
            self.data = bigger
        self.data[self.size] = value
        self.size += 1

    def get(self, i):
        if not 0 <= i < self.size:
            raise IndexError(f"index {i}")
        return self.data[i]

    def __str__(self):
        return str(self.data[:self.size])

arr = DynamicArray()
for i in range(1, 10):
    arr.append(i * 10)
print(arr)
print(f"size = {arr.size}, capacity = {len(arr.data)}")
print("elements copied while growing:", arr.copies)
print("arr.get(4) =", arr.get(4))
```
```output
[10, 20, 30, 40, 50, 60, 70, 80, 90]
size = 9, capacity = 16
elements copied while growing: 15
arr.get(4) = 50
```

Nine appends caused only 1 + 2 + 4 + 8 = 15 copies. In general, n appends cause fewer than 2n copies, so the average cost per append is constant.

## GATE-style practice questions

```quiz
q: A 2-D array `A[10][20]` of 4-byte integers is stored in **row-major** order starting at address 1000. Indices start at 0. What is the address of `A[5][7]`?
answer: 1428
verify: 1000 + (5 * 20 + 7) * 4
explain: Row-major: base + (i × C + j) × size = 1000 + (5 × 20 + 7) × 4 = 1000 + 107 × 4 = 1428.
```

```quiz
q: The same array `A[10][20]` of 4-byte integers is stored in **column-major** order starting at address 1000. What is the address of `A[5][7]`?
answer: 1300
verify: 1000 + (7 * 10 + 5) * 4
explain: Column-major: base + (j × R + i) × size = 1000 + (7 × 10 + 5) × 4 = 1000 + 75 × 4 = 1300.
```

```quiz
q: A dynamic array doubles its capacity whenever it is full, starting from capacity 1. What is the **amortised** time per append over a long sequence of n appends?
* O(1)
- O(log n)
- O(n)
- O(n log n)
explain: The total copying work is 1 + 2 + 4 + ... < 2n, plus n writes, so n appends cost O(n) in total and O(1) each on average, even though a single append can cost O(n).
```

```quiz
q: An array holds 100 elements in positions 0 to 99. How many existing elements must be shifted to insert a new element at position 0 while keeping the order?
answer: 100
verify: 100 - 0
explain: Every one of the 100 elements moves one place to the right to make room at index 0. Inserting at index i shifts n − i elements.
```
