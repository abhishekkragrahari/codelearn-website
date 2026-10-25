---
title: Searching (Linear and Binary Search)
chapter: Searching and Sorting
description: Linear search, binary search and its variants, and searching on the answer.
---
**Searching** means finding the position of a target value, or deciding it is absent.

## Linear search

Check the items one by one. It works on **any** array, sorted or not.

| Case | Comparisons for n items |
| --- | --- |
| Best (target is first) | 1 |
| Worst (target is last or absent) | n |
| Average (target present, each position equally likely) | (n + 1) / 2 |

## Binary search

On a **sorted** array, compare the target with the middle item and discard the half that cannot contain it. Each step halves the range, so it needs at most **⌊log₂ n⌋ + 1** comparisons: **O(log n)**.

```flowchart
caption: Binary search for target in a[lo..hi]
start: lo = 0, hi = n - 1
while: lo <= hi?
  step: mid = (lo + hi) / 2
  if: a[mid] == target?
    yes:
      step: return mid
    no:
      step: move lo or hi past mid
end: return -1 (not found)
```

> **Warning:** In languages with fixed-size integers, `(lo + hi) / 2` can overflow for huge arrays. `lo + (hi - lo) / 2` computes the same value safely.

## Variants: first and last occurrence

With duplicates, plain binary search returns *some* matching index. To find the **first** occurrence (the "lower bound"), keep searching to the left even after a match. The count of a value is then last − first + 1, still in O(log n).

```java
public class Main {
    static int binarySearch(int[] a, int target) {
        int lo = 0, hi = a.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (a[mid] == target) return mid;
            if (a[mid] < target) lo = mid + 1; else hi = mid - 1;
        }
        return -1;
    }

    // index of the first element >= target (a.length if none)
    static int lowerBound(int[] a, int target) {
        int lo = 0, hi = a.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (a[mid] < target) lo = mid + 1; else hi = mid;
        }
        return lo;
    }

    public static void main(String[] args) {
        int[] a = {2, 4, 4, 4, 7, 9, 12, 15};
        System.out.println("binarySearch(9) = " + binarySearch(a, 9));
        System.out.println("binarySearch(5) = " + binarySearch(a, 5));
        int first = lowerBound(a, 4), afterLast = lowerBound(a, 5);
        System.out.println("first 4 at index " + first + ", count of 4 = " + (afterLast - first));
        System.out.println("insert position for 10 = " + lowerBound(a, 10));
    }
}
```
```output
binarySearch(9) = 5
binarySearch(5) = -1
first 4 at index 1, count of 4 = 3
insert position for 10 = 6
```
```python
from bisect import bisect_left, bisect_right

def binary_search(a, target):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if a[mid] == target:
            return mid
        if a[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

a = [2, 4, 4, 4, 7, 9, 12, 15]
print("binary_search(9) =", binary_search(a, 9))
print("binary_search(5) =", binary_search(a, 5))
first, after_last = bisect_left(a, 4), bisect_right(a, 4)    # Python's built-in lower/upper bound
print(f"first 4 at index {first}, count of 4 = {after_last - first}")
print("insert position for 10 =", bisect_left(a, 10))
```
```output
binary_search(9) = 5
binary_search(5) = -1
first 4 at index 1, count of 4 = 3
insert position for 10 = 6
```

## Binary search on the answer

Binary search also works on any **monotonic** yes/no question, not just arrays. For example, the integer square root of n is the largest x with x² ≤ n: the answer "is x² ≤ n?" is yes, yes, ..., yes, no, no, ..., so we can binary search for the boundary.

```java
public class Main {
    static long isqrt(long n) {
        long lo = 0, hi = n, ans = 0;
        while (lo <= hi) {
            long mid = lo + (hi - lo) / 2;
            if (mid <= n / Math.max(mid, 1)) { ans = mid; lo = mid + 1; } else hi = mid - 1;   // mid * mid <= n, without overflow
        }
        return ans;
    }

    public static void main(String[] args) {
        System.out.println(isqrt(50) + " " + isqrt(1_000_000) + " " + isqrt(999_999_999_999L));
    }
}
```
```output
7 1000 999999
```
```python
def isqrt(n):
    lo, hi, ans = 0, n, 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid <= n:
            ans, lo = mid, mid + 1
        else:
            hi = mid - 1
    return ans

print(isqrt(50), isqrt(1_000_000), isqrt(999_999_999_999))
```
```output
7 1000 999999
```

> **Warning:** In Java, writing the test as `mid * mid <= n` overflows `long` once mid passes about 3 × 10⁹, and the loop then returns a wrong answer for large n. Dividing instead (`mid <= n / mid`) avoids the overflow. Python integers never overflow, so the Python version can square directly.

| Method | Requirement | Time |
| --- | --- | --- |
| Linear search | none | O(n) |
| Binary search | sorted, random access | O(log n) |
| Hash table lookup | a hash table built in advance | O(1) average |
| BST search (balanced) | a balanced search tree | O(log n) |

## GATE-style practice questions

```quiz
q: Binary search is applied to a sorted array of 100 distinct elements. What is the maximum number of comparisons with array elements needed to find an element or report that it is absent?
answer: 7
verify:
  def steps(a, t):
      lo, hi, s = 0, len(a) - 1, 0
      while lo <= hi:
          s += 1
          mid = (lo + hi) // 2
          if a[mid] == t:
              break
          if a[mid] < t:
              lo = mid + 1
          else:
              hi = mid - 1
      return s
  a = list(range(0, 200, 2))
  print(max(steps(a, t) for t in range(-1, 201)))
explain: The worst case is ⌊log₂ 100⌋ + 1 = 6 + 1 = 7 comparisons, since 2⁶ = 64 < 100 < 128 = 2⁷.
```

```quiz
q: In linear search on an array of n elements, the target is present and equally likely to be at any position. What is the average number of comparisons?
- n
- n / 2
* (n + 1) / 2
- log₂ n
explain: If the target is at position i (1-based), the search makes i comparisons. The average is (1 + 2 + ... + n) / n = (n + 1) / 2.
```

```quiz
q: Which of the following can be done in O(log n) time on a **sorted** array of n integers? (Select all that apply.)
* Find the first occurrence of a given value
* Count how many times a given value appears
- Find the median of the array after inserting a new element in place
* Find the smallest element greater than or equal to a given value
explain: First occurrence, count (last − first + 1) and the lower bound all use binary search. Inserting a new element into a sorted array in place needs shifting, which is O(n).
```
