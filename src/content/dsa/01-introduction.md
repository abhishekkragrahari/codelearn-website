---
title: Introduction to Data Structures
chapter: Getting Started
description: What data structures and algorithms are, the main kinds, and why the choice matters.
---
A **data structure** is a way of organising data in memory so that the operations you need (search, insert, delete, find the smallest, ...) are fast. An **algorithm** is a finite sequence of well-defined steps that solves a problem. The two go together: a good algorithm is usually a good idea about how to arrange the data.

```tree
caption: The main families of data structures covered in this track
Data structures
  Linear | items in a sequence
    Array
    Linked list
    Stack
    Queue
  Non-linear | items in a hierarchy or network
    Tree
    Heap
    Graph
  Hash-based | items found by key
    Hash table
```

- **Linear** structures store items one after another; each item has at most one predecessor and one successor.
- **Non-linear** structures let an item connect to several others, like a family tree or a road map.
- **Hash-based** structures jump straight to an item computed from its key.

## Why the choice matters

Suppose you need to check whether a number is in a collection of 1000 sorted numbers. Checking one by one (linear search) can take 1000 comparisons. Because the data is sorted, you can instead look at the middle and throw away half each time (binary search), which needs at most 10 comparisons. The data is the same; the algorithm makes it 100 times faster.

```java
public class Main {
    static int linearSteps(int[] a, int target) {
        int steps = 0;
        for (int x : a) {
            steps++;
            if (x == target) break;
        }
        return steps;
    }

    static int binarySteps(int[] a, int target) {
        int lo = 0, hi = a.length - 1, steps = 0;
        while (lo <= hi) {
            steps++;
            int mid = (lo + hi) / 2;
            if (a[mid] == target) break;
            if (a[mid] < target) lo = mid + 1; else hi = mid - 1;
        }
        return steps;
    }

    public static void main(String[] args) {
        int[] nums = new int[1000];
        for (int i = 0; i < nums.length; i++) nums[i] = i + 1;   // 1, 2, ..., 1000
        System.out.println("Linear search for 999: " + linearSteps(nums, 999) + " comparisons");
        System.out.println("Binary search for 999: " + binarySteps(nums, 999) + " comparisons");
    }
}
```
```output
Linear search for 999: 999 comparisons
Binary search for 999: 9 comparisons
```
```python
def linear_steps(a, target):
    steps = 0
    for x in a:
        steps += 1
        if x == target:
            break
    return steps

def binary_steps(a, target):
    lo, hi, steps = 0, len(a) - 1, 0
    while lo <= hi:
        steps += 1
        mid = (lo + hi) // 2
        if a[mid] == target:
            break
        if a[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return steps

nums = list(range(1, 1001))      # 1, 2, ..., 1000
print("Linear search for 999:", linear_steps(nums, 999), "comparisons")
print("Binary search for 999:", binary_steps(nums, 999), "comparisons")
```
```output
Linear search for 999: 999 comparisons
Binary search for 999: 9 comparisons
```

> **Tip:** Use the **Java / Python** tabs above each example to pick your language. The site remembers your choice for every lesson.

## Abstract data types

An **abstract data type (ADT)** describes *what* operations are allowed, not *how* they are implemented. A stack ADT promises `push`, `pop` and `peek`; it could be built on an array or on a linked list. Separating the "what" from the "how" lets you swap implementations without changing the code that uses them.

| ADT | Main operations | Common implementations |
| --- | --- | --- |
| List | get, insert, delete by position | array, linked list |
| Stack | push, pop, peek (last in, first out) | array, linked list |
| Queue | enqueue, dequeue (first in, first out) | circular array, linked list |
| Map / dictionary | put, get, remove by key | hash table, balanced search tree |
| Priority queue | insert, remove the minimum | binary heap |

## GATE CS syllabus map

This track covers the GATE Computer Science syllabus for **Programming and Data Structures** and **Algorithms**. (Programming in C itself is taught in the [C tutorial](../c/index.html).)

| GATE syllabus topic | Lessons |
| --- | --- |
| Recursion | [Recursion and Recurrence Relations](recursion-recurrences.html) |
| Asymptotic worst-case time and space complexity | [Time and Space Complexity](complexity.html), [Recurrence Relations](recursion-recurrences.html) |
| Arrays | [Arrays and Dynamic Arrays](arrays.html) |
| Stacks and queues | [Stacks](stack.html), [Queues and Deques](queue.html) |
| Linked lists | [Linked Lists](linked-list.html) |
| Trees and binary search trees | [Binary Trees](binary-trees.html), [Binary Search Trees](binary-search-tree.html), [AVL Trees](avl-trees.html) |
| Binary heaps | [Heaps and Priority Queues](heap.html) |
| Graphs and graph traversals | [Graphs, BFS and DFS](graphs.html), [DFS Applications](dfs-applications.html) |
| Shortest paths | [Shortest Paths](shortest-paths.html) |
| Minimum spanning trees | [Minimum Spanning Trees](minimum-spanning-tree.html) |
| Searching | [Searching](searching.html) |
| Sorting | [Simple Sorting](sorting-basics.html), [Fast Sorting](sorting-advanced.html), [Heapsort](heap.html) |
| Hashing | [Hash Tables](hash-table.html) |
| Divide and conquer | [Divide and Conquer](divide-and-conquer.html) |
| Greedy algorithms | [Greedy Algorithms](greedy.html) |
| Dynamic programming | [Dynamic Programming](dynamic-programming.html) |
| Mixed revision | [GATE Practice Set](gate-practice-set.html) |

## GATE-style practice questions

```quiz
q: Which of the following is a **non-linear** data structure?
- Stack
- Queue
* Binary tree
- Array
explain: In a binary tree a node can have two children, so items are arranged in a hierarchy rather than a single sequence. Stacks, queues and arrays are all linear.
```

```quiz
q: Which of the following are **abstract data types** rather than concrete implementations? (Select all that apply.)
* Stack
* Priority queue
- Singly linked list
- Binary heap stored in an array
explain: A stack and a priority queue only specify operations. A singly linked list and an array-based binary heap are concrete ways of storing data, and can be used to implement those ADTs.
```

```quiz
q: Binary search is run on a sorted array of 1000 distinct elements. What is the **maximum** number of element comparisons (each comparison of the target with `a[mid]` counts as one) needed to decide whether a value is present?
answer: 10
verify: (lambda a: max((lambda t: (lambda f: f(f, 0, len(a) - 1, 0))(lambda f, lo, hi, s: s if lo > hi else (s + 1 if a[(lo + hi) // 2] == t else (f(f, (lo + hi) // 2 + 1, hi, s + 1) if a[(lo + hi) // 2] < t else f(f, lo, (lo + hi) // 2 - 1, s + 1)))))(t) for t in range(0, 1002)))(list(range(1, 1001)))
explain: Each comparison halves the remaining range. After k comparisons at most 1000 / 2^k elements remain, and the worst case needs floor(log2 1000) + 1 = 9 + 1 = 10 comparisons.
```
