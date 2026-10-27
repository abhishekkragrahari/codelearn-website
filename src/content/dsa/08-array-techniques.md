---
title: Two Pointers, Sliding Window, Prefix Sums
chapter: Linear Data Structures
description: Prefix sums for range queries, the two-pointer technique on sorted arrays, fixed and variable sliding windows, Kadane's maximum subarray, and the Dutch national flag partition.
---
Many array problems that look like they need nested loops (O(n²)) can be solved in a single pass (O(n)) with a few standard techniques. They come up constantly in interviews and in GATE's algorithm questions.

## Prefix sums

Store pre[i] = a[0] + a[1] + … + a[i − 1] (with pre[0] = 0). Then the sum of any range a[l..r] is

**sum(l, r) = pre[r + 1] − pre[l]**

After O(n) preprocessing, every range-sum query is O(1). The same idea works in 2D (sum of a sub-rectangle with four lookups) and with XOR instead of addition.

## Two pointers

On a **sorted** array, start one pointer at each end and move them towards each other:

```flowchart
caption: Two pointers: find a pair with a given sum in a sorted array
start: lo = 0, hi = n − 1
while: lo < hi
  if: a[lo] + a[hi] == target?
    yes:
      io: Report the pair
    no:
      step: Sum too small: lo++; too large: hi--
end: Done
```

Each step discards one element for good, so the loop runs at most n times: **O(n)** instead of O(n²). Two pointers also merge sorted arrays, remove duplicates in place, and reverse arrays.

## Sliding window

A **fixed window** of size k moves one step at a time: add the element entering and subtract the one leaving, instead of re-adding all k.

A **variable window** grows its right end and shrinks its left end while a condition holds, for example "the longest substring without repeating characters" or "the shortest subarray with sum ≥ S". Each index enters and leaves the window once: O(n).

## Kadane's algorithm

The **maximum subarray sum** in one pass: at each element, either extend the current run or start a new one there.

**cur = max(a[i], cur + a[i]); best = max(best, cur)**

## Dutch national flag

Sort an array of 0s, 1s and 2s in one pass with three pointers (low, mid, high): swap 0s to the front and 2s to the back. This is the partition step of 3-way quicksort.

## The code

```java
public class Main {
    public static void main(String[] args) {
        int[] a = {2, 7, 1, 8, 2, 8, 1, 8};

        // Prefix sums: pre[i] = a[0] + ... + a[i-1], so any range sum is one subtraction.
        int[] pre = new int[a.length + 1];
        for (int i = 0; i < a.length; i++) pre[i + 1] = pre[i] + a[i];
        System.out.println("sum of a[2..5] = " + (pre[6] - pre[2]));

        // Sliding window: best sum of k consecutive elements in O(n).
        int k = 3, window = 0, best;
        for (int i = 0; i < k; i++) window += a[i];
        best = window;
        for (int i = k; i < a.length; i++) {
            window += a[i] - a[i - k];          // slide: add the new, drop the old
            best = Math.max(best, window);
        }
        System.out.println("best sum of 3 in a row = " + best);

        // Two pointers on a sorted array: find a pair with a given sum.
        int[] s = {1, 3, 4, 6, 8, 11};
        int target = 10, lo = 0, hi = s.length - 1;
        while (lo < hi) {
            int sum = s[lo] + s[hi];
            if (sum == target) break;
            if (sum < target) lo++; else hi--;
        }
        System.out.println("pair with sum 10: " + s[lo] + " + " + s[hi]);

        // Kadane: maximum subarray sum in one pass.
        int[] b = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        int cur = 0, max = Integer.MIN_VALUE;
        for (int v : b) {
            cur = Math.max(v, cur + v);         // extend the run or start again at v
            max = Math.max(max, cur);
        }
        System.out.println("maximum subarray sum = " + max);
    }
}
```
```output
sum of a[2..5] = 19
best sum of 3 in a row = 18
pair with sum 10: 4 + 6
maximum subarray sum = 6
```
```python
a = [2, 7, 1, 8, 2, 8, 1, 8]

# Prefix sums: pre[i] = a[0] + ... + a[i-1], so any range sum is one subtraction.
pre = [0]
for v in a:
    pre.append(pre[-1] + v)
print("sum of a[2..5] =", pre[6] - pre[2])

# Sliding window: best sum of k consecutive elements in O(n).
k = 3
window = sum(a[:k])
best = window
for i in range(k, len(a)):
    window += a[i] - a[i - k]           # slide: add the new, drop the old
    best = max(best, window)
print("best sum of 3 in a row =", best)

# Two pointers on a sorted array: find a pair with a given sum.
s = [1, 3, 4, 6, 8, 11]
target, lo, hi = 10, 0, len(s) - 1
while lo < hi:
    total = s[lo] + s[hi]
    if total == target:
        break
    if total < target:
        lo += 1
    else:
        hi -= 1
print(f"pair with sum 10: {s[lo]} + {s[hi]}")

# Kadane: maximum subarray sum in one pass.
cur, best = 0, float("-inf")
for v in [-2, 1, -3, 4, -1, 2, 1, -5, 4]:
    cur = max(v, cur + v)               # extend the run or start again at v
    best = max(best, cur)
print("maximum subarray sum =", best)
```
```output
sum of a[2..5] = 19
best sum of 3 in a row = 18
pair with sum 10: 4 + 6
maximum subarray sum = 6
```
```c
#include <stdio.h>
#include <limits.h>

int max(int x, int y) { return x > y ? x : y; }

int main(void) {
    int a[] = {2, 7, 1, 8, 2, 8, 1, 8}, n = 8;

    /* Prefix sums: pre[i] = a[0] + ... + a[i-1], so any range sum is one subtraction. */
    int pre[9] = {0};
    for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + a[i];
    printf("sum of a[2..5] = %d\n", pre[6] - pre[2]);

    /* Sliding window: best sum of k consecutive elements in O(n). */
    int k = 3, window = 0, best;
    for (int i = 0; i < k; i++) window += a[i];
    best = window;
    for (int i = k; i < n; i++) {
        window += a[i] - a[i - k];      /* slide: add the new, drop the old */
        best = max(best, window);
    }
    printf("best sum of 3 in a row = %d\n", best);

    /* Two pointers on a sorted array: find a pair with a given sum. */
    int s[] = {1, 3, 4, 6, 8, 11};
    int target = 10, lo = 0, hi = 5;
    while (lo < hi) {
        int sum = s[lo] + s[hi];
        if (sum == target) break;
        if (sum < target) lo++; else hi--;
    }
    printf("pair with sum 10: %d + %d\n", s[lo], s[hi]);

    /* Kadane: maximum subarray sum in one pass. */
    int b[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int cur = 0, mx = INT_MIN;
    for (int i = 0; i < 9; i++) {
        cur = max(b[i], cur + b[i]);    /* extend the run or start again at b[i] */
        mx = max(mx, cur);
    }
    printf("maximum subarray sum = %d\n", mx);
    return 0;
}
```
```output
sum of a[2..5] = 19
best sum of 3 in a row = 18
pair with sum 10: 4 + 6
maximum subarray sum = 6
```

## GATE-style practice questions

```quiz
q: For a = [3, 1, 4, 1, 5, 9, 2, 6], prefix sums are built with pre[0] = 0. What is pre[7] − pre[3]?
answer: 17
verify: sum([3, 1, 4, 1, 5, 9, 2, 6][3:7])
explain: pre[7] − pre[3] = a[3] + a[4] + a[5] + a[6] = 1 + 5 + 9 + 2 = 17.
```

```quiz
q: What is the maximum subarray sum of [5, −9, 6, −2, 3]?
answer: 7
verify: max(sum([5, -9, 6, -2, 3][i:j]) for i in range(5) for j in range(i + 1, 6))
explain: The best run is [6, −2, 3] with sum 7.
```

```quiz
q: What is the largest sum of 4 consecutive elements in [1, 4, 2, 10, 2, 3, 1, 0, 20]?
answer: 24
verify: max(sum([1, 4, 2, 10, 2, 3, 1, 0, 20][i:i + 4]) for i in range(6))
explain: Windows of 4: 17, 18, 17, 16, 6, 24 — the last window [3, 1, 0, 20] gives 24.
```

```quiz
q: The two-pointer method for finding a pair with a given sum runs in O(n) only if:
* The array is sorted
- The array has no duplicates
- The array length is a power of 2
- The target is positive
explain: Moving lo up or hi down is correct only because the array is sorted; otherwise sort first in O(n log n).
```
