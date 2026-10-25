---
title: Heaps and Priority Queues
chapter: Trees
description: A complete binary tree stored in an array that always gives you the smallest (or largest) item fast.
---
A **binary heap** is a **complete** binary tree that satisfies the **heap property**:

- **Min-heap:** every parent is ≤ its children, so the minimum is at the root.
- **Max-heap:** every parent is ≥ its children, so the maximum is at the root.

Because the tree is complete, it fits perfectly in an array with no gaps. For the node at index i (0-indexed):

| Relative | Index |
| --- | --- |
| Parent | (i − 1) / 2 (integer division) |
| Left child | 2i + 1 |
| Right child | 2i + 2 |

```tree
caption: The min-heap [1, 3, 2, 7, 4, 5] drawn as a tree (array index in the note)
1 | index 0
  3 | index 1
    7 | index 3
    4 | index 4
  2 | index 2
    5 | index 5
```

## Operations

- **insert(x):** put x at the end of the array, then **sift up**: swap it with its parent while it is smaller. O(log n).
- **extractMin():** take the root, move the last element to the root, then **sift down**: swap it with its smaller child while it is larger. O(log n).
- **peek():** read index 0. O(1).
- **buildHeap(array):** sift down every non-leaf from the last one up to the root. Surprisingly, this takes only **O(n)**.

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        MinHeap h = new MinHeap();
        for (int x : new int[]{5, 3, 8, 1, 4, 2}) {
            h.insert(x);
            System.out.println("insert " + x + " -> " + h.data);
        }
        StringBuilder sorted = new StringBuilder();
        while (!h.data.isEmpty()) sorted.append(h.extractMin()).append(' ');
        System.out.println("extract all: " + sorted.toString().trim());
    }
}

class MinHeap {
    List<Integer> data = new ArrayList<>();

    void insert(int x) {
        data.add(x);
        int i = data.size() - 1;
        while (i > 0 && data.get((i - 1) / 2) > data.get(i)) {     // sift up
            swap(i, (i - 1) / 2);
            i = (i - 1) / 2;
        }
    }

    int extractMin() {
        int min = data.get(0);
        int last = data.remove(data.size() - 1);
        if (!data.isEmpty()) {
            data.set(0, last);
            int i = 0;
            while (true) {                                            // sift down
                int l = 2 * i + 1, r = 2 * i + 2, smallest = i;
                if (l < data.size() && data.get(l) < data.get(smallest)) smallest = l;
                if (r < data.size() && data.get(r) < data.get(smallest)) smallest = r;
                if (smallest == i) break;
                swap(i, smallest);
                i = smallest;
            }
        }
        return min;
    }

    private void swap(int a, int b) {
        int t = data.get(a);
        data.set(a, data.get(b));
        data.set(b, t);
    }
}
```
```output
insert 5 -> [5]
insert 3 -> [3, 5]
insert 8 -> [3, 5, 8]
insert 1 -> [1, 3, 8, 5]
insert 4 -> [1, 3, 8, 5, 4]
insert 2 -> [1, 3, 2, 5, 4, 8]
extract all: 1 2 3 4 5 8
```
```python
class MinHeap:
    def __init__(self):
        self.data = []

    def insert(self, x):
        a = self.data
        a.append(x)
        i = len(a) - 1
        while i > 0 and a[(i - 1) // 2] > a[i]:              # sift up
            a[i], a[(i - 1) // 2] = a[(i - 1) // 2], a[i]
            i = (i - 1) // 2

    def extract_min(self):
        a = self.data
        smallest_item = a[0]
        last = a.pop()
        if a:
            a[0] = last
            i = 0
            while True:                                       # sift down
                l, r, s = 2 * i + 1, 2 * i + 2, i
                if l < len(a) and a[l] < a[s]:
                    s = l
                if r < len(a) and a[r] < a[s]:
                    s = r
                if s == i:
                    break
                a[i], a[s] = a[s], a[i]
                i = s
        return smallest_item

h = MinHeap()
for x in [5, 3, 8, 1, 4, 2]:
    h.insert(x)
    print(f"insert {x} -> {h.data}")
print("extract all:", *[h.extract_min() for _ in range(6)])
```
```output
insert 5 -> [5]
insert 3 -> [3, 5]
insert 8 -> [3, 5, 8]
insert 1 -> [1, 3, 8, 5]
insert 4 -> [1, 3, 8, 5, 4]
insert 2 -> [1, 3, 2, 5, 4, 8]
extract all: 1 2 3 4 5 8
```
```c
#include <stdio.h>

int heap[64];
int n = 0;

void swap(int i, int j) { int t = heap[i]; heap[i] = heap[j]; heap[j] = t; }

void insert(int x) {
    heap[n] = x;
    int i = n++;
    while (i > 0 && heap[(i - 1) / 2] > heap[i]) {      /* sift up */
        swap(i, (i - 1) / 2);
        i = (i - 1) / 2;
    }
}

int extract_min(void) {
    int min = heap[0];
    heap[0] = heap[--n];
    int i = 0;
    while (1) {                                          /* sift down */
        int l = 2 * i + 1, r = 2 * i + 2, smallest = i;
        if (l < n && heap[l] < heap[smallest]) smallest = l;
        if (r < n && heap[r] < heap[smallest]) smallest = r;
        if (smallest == i) break;
        swap(i, smallest);
        i = smallest;
    }
    return min;
}

void print_heap(void) {
    printf("[");
    for (int i = 0; i < n; i++) printf(i ? ", %d" : "%d", heap[i]);
    printf("]\n");
}

int main(void) {
    int xs[] = {5, 3, 8, 1, 4, 2};
    for (int i = 0; i < 6; i++) {
        insert(xs[i]);
        printf("insert %d -> ", xs[i]);
        print_heap();
    }
    printf("extract all:");
    while (n > 0) printf(" %d", extract_min());
    printf("\n");
    return 0;
}
```
```output
insert 5 -> [5]
insert 3 -> [3, 5]
insert 8 -> [3, 5, 8]
insert 1 -> [1, 3, 8, 5]
insert 4 -> [1, 3, 8, 5, 4]
insert 2 -> [1, 3, 2, 5, 4, 8]
extract all: 1 2 3 4 5 8
```

Taking items out one by one gives them in sorted order. That is **heapsort**: build a heap in O(n), then extract n times at O(log n) each, for **O(n log n)** total with O(1) extra space when done in place.

## The library versions

Both languages ship a ready-made binary min-heap: Java's `PriorityQueue` and Python's `heapq` module.

```java
import java.util.Collections;
import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int x : new int[]{42, 7, 19, 88, 3}) { minHeap.add(x); maxHeap.add(x); }
        System.out.println("smallest: " + minHeap.poll() + ", then " + minHeap.poll());
        System.out.println("largest:  " + maxHeap.poll() + ", then " + maxHeap.poll());
    }
}
```
```output
smallest: 3, then 7
largest:  88, then 42
```
```python
import heapq

nums = [42, 7, 19, 88, 3]
min_heap = nums[:]
heapq.heapify(min_heap)                 # O(n) build-heap
print("smallest:", heapq.heappop(min_heap), "then", heapq.heappop(min_heap))

max_heap = [-x for x in nums]           # heapq is a min-heap: negate for a max-heap
heapq.heapify(max_heap)
print("largest: ", -heapq.heappop(max_heap), "then", -heapq.heappop(max_heap))
print("3 smallest:", heapq.nsmallest(3, nums))
```
```output
smallest: 3 then 7
largest:  88 then 42
3 smallest: [3, 7, 19]
```
```c
#include <stdio.h>
#include <stdlib.h>

/* C has no priority queue in its standard library, so heapsort-style helpers
   are written by hand. Here: build a heap with sift-down, then pop twice. */
void sift_down(int a[], int n, int i, int (*before)(int, int)) {
    while (1) {
        int l = 2 * i + 1, r = l + 1, best = i;
        if (l < n && before(a[l], a[best])) best = l;
        if (r < n && before(a[r], a[best])) best = r;
        if (best == i) return;
        int t = a[i]; a[i] = a[best]; a[best] = t;
        i = best;
    }
}

void build_heap(int a[], int n, int (*before)(int, int)) {
    for (int i = n / 2 - 1; i >= 0; i--) sift_down(a, n, i, before);     /* O(n) */
}

int pop(int a[], int *n, int (*before)(int, int)) {
    int top = a[0];
    a[0] = a[--*n];
    sift_down(a, *n, 0, before);
    return top;
}

int smaller(int x, int y) { return x < y; }
int larger(int x, int y) { return x > y; }

int main(void) {
    int min_heap[] = {42, 7, 19, 88, 3}, max_heap[] = {42, 7, 19, 88, 3};
    int n1 = 5, n2 = 5;
    build_heap(min_heap, n1, smaller);
    build_heap(max_heap, n2, larger);
    int a = pop(min_heap, &n1, smaller), b = pop(min_heap, &n1, smaller);
    printf("smallest: %d, then %d\n", a, b);
    a = pop(max_heap, &n2, larger);
    b = pop(max_heap, &n2, larger);
    printf("largest:  %d, then %d\n", a, b);
    return 0;
}
```
```output
smallest: 3, then 7
largest:  88, then 42
```

## GATE-style practice questions

```quiz
q: The keys 5, 3, 8, 1, 4, 2 are inserted one by one into an empty **min-heap** (stored in an array, index 0 is the root). What is the array after all insertions?
- 1 2 3 4 5 8
* 1 3 2 5 4 8
- 1 3 2 4 5 8
- 1 2 3 5 4 8
explain: Inserting 1 sifts it up past 3 to the root, giving 1 3 8 5. 4 stays under 3. 2 is placed at index 5, whose parent is 8 at index 2, so they swap; 2 is larger than the root 1, so it stops: 1 3 2 5 4 8.
```

```quiz
q: In a max-heap stored in an array with the root at index 1 (1-indexed), what is the index of the parent of the element at index 50?
answer: 25
verify: 50 // 2
explain: With 1-based indexing, the children of i are 2i and 2i + 1, so the parent of i is floor(i / 2) = 25.
```

```quiz
q: What is the worst-case time to **build** a binary heap from an unsorted array of n elements using the bottom-up sift-down method?
* O(n)
- O(log n)
- O(n log n)
- O(n²)
explain: Nodes near the bottom, which are most of the nodes, can only sift down a short distance. Summing the heights gives n·Σ h/2^(h+1) = O(n). Inserting the elements one by one would cost O(n log n).
```

```quiz
q: In a **min-heap** of n distinct elements, where can the **maximum** element be?
- At the root
- At any internal node
* At any leaf
- Only at the last position of the array
explain: A non-leaf node is smaller than its children, so it cannot be the maximum. The maximum must be a leaf, and it can be any leaf, which is why finding the maximum in a min-heap takes Θ(n).
```
