---
title: Fast Sorting (Merge, Quick, Counting)
chapter: Searching and Sorting
description: Divide-and-conquer sorts in O(n log n), the comparison lower bound, and linear-time counting sort.
---
The simple sorts compare many pairs of items again and again. **Divide and conquer** avoids that: split the problem into smaller pieces, solve them recursively, and combine the answers.

## Merge sort

1. Split the array into two halves.
2. Sort each half recursively.
3. **Merge** the two sorted halves by repeatedly taking the smaller front item.

```tree
caption: Merge sort on [38, 27, 43, 3]: split down, then merge back up
38 27 43 3 | merged: 3 27 38 43
  38 27 | merged: 27 38
    38
    27
  43 3 | merged: 3 43
    43
    3
```

The recursion has log₂ n levels, and each level does O(n) merging work, so merge sort takes **Θ(n log n)** in every case. Its recurrence is T(n) = 2T(n/2) + Θ(n). It is stable, but needs O(n) extra memory for merging.

## Quick sort

1. Choose a **pivot**.
2. **Partition**: move smaller items to the left of the pivot and larger ones to the right. The pivot is now in its final place.
3. Sort the two sides recursively.

Quick sort is **O(n log n) on average** and in place, and is usually the fastest in practice. But if the pivot is always the smallest or largest item (for example, the last element of an already sorted array), the split is 0 and n − 1, and the time becomes **Θ(n²)**. Choosing a random pivot makes that very unlikely.

```java
import java.util.Arrays;

public class Main {
    static int[] mergeSort(int[] a) {
        if (a.length <= 1) return a;
        int mid = a.length / 2;
        int[] left = mergeSort(Arrays.copyOfRange(a, 0, mid));
        int[] right = mergeSort(Arrays.copyOfRange(a, mid, a.length));
        int[] out = new int[a.length];
        int i = 0, j = 0, k = 0;
        while (i < left.length && j < right.length)
            out[k++] = left[i] <= right[j] ? left[i++] : right[j++];   // <= keeps it stable
        while (i < left.length) out[k++] = left[i++];
        while (j < right.length) out[k++] = right[j++];
        return out;
    }

    static int partitions = 0;

    // Lomuto partition: the last element is the pivot.
    static void quickSort(int[] a, int lo, int hi) {
        if (lo >= hi) return;
        int pivot = a[hi], i = lo;
        for (int j = lo; j < hi; j++) {
            if (a[j] < pivot) { int t = a[i]; a[i] = a[j]; a[j] = t; i++; }
        }
        int t = a[i]; a[i] = a[hi]; a[hi] = t;       // pivot into its final place
        partitions++;
        quickSort(a, lo, i - 1);
        quickSort(a, i + 1, hi);
    }

    public static void main(String[] args) {
        int[] data = {38, 27, 43, 3, 9, 82, 10};
        System.out.println("merge sort: " + Arrays.toString(mergeSort(data)));

        int[] b = data.clone();
        quickSort(b, 0, b.length - 1);
        System.out.println("quick sort: " + Arrays.toString(b) + " (" + partitions + " partitions)");

        int[] first = {10, 80, 30, 90, 40, 50, 70};
        int pivot = first[first.length - 1], i = 0;
        for (int j = 0; j < first.length - 1; j++) if (first[j] < pivot) { int s = first[i]; first[i] = first[j]; first[j] = s; i++; }
        int s = first[i]; first[i] = first[first.length - 1]; first[first.length - 1] = s;
        System.out.println("one partition of [10, 80, 30, 90, 40, 50, 70]: " + Arrays.toString(first) + ", pivot at index " + i);
    }
}
```
```output
merge sort: [3, 9, 10, 27, 38, 43, 82]
quick sort: [3, 9, 10, 27, 38, 43, 82] (4 partitions)
one partition of [10, 80, 30, 90, 40, 50, 70]: [10, 30, 40, 50, 70, 90, 80], pivot at index 4
```
```python
def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:                     # <= keeps it stable
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out + left[i:] + right[j:]

def partition(a, lo, hi):                           # Lomuto: last element is the pivot
    pivot, i = a[hi], lo
    for j in range(lo, hi):
        if a[j] < pivot:
            a[i], a[j] = a[j], a[i]
            i += 1
    a[i], a[hi] = a[hi], a[i]                       # pivot into its final place
    return i

def quick_sort(a, lo, hi, stats):
    if lo < hi:
        p = partition(a, lo, hi)
        stats["partitions"] += 1
        quick_sort(a, lo, p - 1, stats)
        quick_sort(a, p + 1, hi, stats)

data = [38, 27, 43, 3, 9, 82, 10]
print("merge sort:", merge_sort(data))
b, stats = data[:], {"partitions": 0}
quick_sort(b, 0, len(b) - 1, stats)
print(f"quick sort: {b} ({stats['partitions']} partitions)")

first = [10, 80, 30, 90, 40, 50, 70]
p = partition(first, 0, len(first) - 1)
print(f"one partition of [10, 80, 30, 90, 40, 50, 70]: {first}, pivot at index {p}")
```
```output
merge sort: [3, 9, 10, 27, 38, 43, 82]
quick sort: [3, 9, 10, 27, 38, 43, 82] (4 partitions)
one partition of [10, 80, 30, 90, 40, 50, 70]: [10, 30, 40, 50, 70, 90, 80], pivot at index 4
```
```c
#include <stdio.h>
#include <string.h>

void merge_sort(int a[], int tmp[], int lo, int hi) {      /* sorts a[lo..hi] */
    if (lo >= hi) return;
    int mid = (lo + hi) / 2;
    merge_sort(a, tmp, lo, mid);
    merge_sort(a, tmp, mid + 1, hi);
    int i = lo, j = mid + 1, k = lo;
    while (i <= mid && j <= hi) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];   /* <= keeps it stable */
    while (i <= mid) tmp[k++] = a[i++];
    while (j <= hi) tmp[k++] = a[j++];
    memcpy(a + lo, tmp + lo, (hi - lo + 1) * sizeof(int));
}

int partitions = 0;

int partition(int a[], int lo, int hi) {                   /* Lomuto: last element is the pivot */
    int pivot = a[hi], i = lo;
    for (int j = lo; j < hi; j++)
        if (a[j] < pivot) { int t = a[i]; a[i] = a[j]; a[j] = t; i++; }
    int t = a[i]; a[i] = a[hi]; a[hi] = t;                  /* pivot into its final place */
    return i;
}

void quick_sort(int a[], int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(a, lo, hi);
    partitions++;
    quick_sort(a, lo, p - 1);
    quick_sort(a, p + 1, hi);
}

void print(const char *label, const int a[], int n) {
    printf("%s[", label);
    for (int i = 0; i < n; i++) printf(i ? ", %d" : "%d", a[i]);
    printf("]");
}

int main(void) {
    int data[] = {38, 27, 43, 3, 9, 82, 10}, a[7], tmp[7];
    memcpy(a, data, sizeof(data));
    merge_sort(a, tmp, 0, 6);
    print("merge sort: ", a, 7);
    printf("\n");

    memcpy(a, data, sizeof(data));
    quick_sort(a, 0, 6);
    print("quick sort: ", a, 7);
    printf(" (%d partitions)\n", partitions);

    int first[] = {10, 80, 30, 90, 40, 50, 70};
    int p = partition(first, 0, 6);
    print("one partition of [10, 80, 30, 90, 40, 50, 70]: ", first, 7);
    printf(", pivot at index %d\n", p);
    return 0;
}
```
```output
merge sort: [3, 9, 10, 27, 38, 43, 82]
quick sort: [3, 9, 10, 27, 38, 43, 82] (4 partitions)
one partition of [10, 80, 30, 90, 40, 50, 70]: [10, 30, 40, 50, 70, 90, 80], pivot at index 4
```

## The Ω(n log n) lower bound

Any sort that only **compares** items needs at least log₂(n!) comparisons in the worst case, because there are n! possible orders and each comparison has two outcomes. Since log₂(n!) = Θ(n log n), merge sort and heapsort are **asymptotically optimal** comparison sorts.

## Counting sort: beating n log n

If the keys are small integers in a range 0..k, you do not need comparisons at all: **count** how many times each key appears, then write them out in order. This takes **O(n + k)** time. It is the building block of **radix sort**, which sorts numbers digit by digit.

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] marks = {4, 2, 2, 8, 3, 3, 1, 0, 8};
        int k = 8;
        int[] count = new int[k + 1];
        for (int m : marks) count[m]++;
        int[] out = new int[marks.length];
        int pos = 0;
        for (int v = 0; v <= k; v++)
            for (int c = 0; c < count[v]; c++) out[pos++] = v;
        System.out.println("counts: " + Arrays.toString(count));
        System.out.println("sorted: " + Arrays.toString(out));
    }
}
```
```output
counts: [1, 1, 2, 2, 1, 0, 0, 0, 2]
sorted: [0, 1, 2, 2, 3, 3, 4, 8, 8]
```
```python
marks = [4, 2, 2, 8, 3, 3, 1, 0, 8]
k = 8
count = [0] * (k + 1)
for m in marks:
    count[m] += 1
out = [v for v in range(k + 1) for _ in range(count[v])]
print("counts:", count)
print("sorted:", out)
```
```output
counts: [1, 1, 2, 2, 1, 0, 0, 0, 2]
sorted: [0, 1, 2, 2, 3, 3, 4, 8, 8]
```
```c
#include <stdio.h>

int main(void) {
    int marks[] = {4, 2, 2, 8, 3, 3, 1, 0, 8};
    int n = 9, k = 8;
    int count[9] = {0}, out[9];
    for (int i = 0; i < n; i++) count[marks[i]]++;
    int pos = 0;
    for (int v = 0; v <= k; v++)
        for (int c = 0; c < count[v]; c++) out[pos++] = v;

    printf("counts: [");
    for (int v = 0; v <= k; v++) printf(v ? ", %d" : "%d", count[v]);
    printf("]\nsorted: [");
    for (int i = 0; i < n; i++) printf(i ? ", %d" : "%d", out[i]);
    printf("]\n");
    return 0;
}
```
```output
counts: [1, 1, 2, 2, 1, 0, 0, 0, 2]
sorted: [0, 1, 2, 2, 3, 3, 4, 8, 8]
```

## Summary

| Algorithm | Best | Average | Worst | Extra space | Stable |
| --- | --- | --- | --- | --- | --- |
| Merge sort | n log n | n log n | n log n | O(n) | yes |
| Quick sort | n log n | n log n | n² | O(log n) stack | no |
| Heapsort | n log n | n log n | n log n | O(1) | no |
| Counting sort | n + k | n + k | n + k | O(n + k) | yes (standard version) |

## GATE-style practice questions

```quiz
q: The recurrence T(n) = 2T(n/2) + n, with T(1) = 1, describes merge sort. Which is its solution?
- Θ(n)
* Θ(n log n)
- Θ(n²)
- Θ(log n)
explain: By the master theorem with a = 2, b = 2 and f(n) = n = n^(log₂ 2), we are in case 2, so T(n) = Θ(n log n). Intuitively there are log₂ n levels, each doing n work.
```

```quiz
q: Quick sort always picks the **last** element as pivot. On an array of n = 20 elements that is already sorted, how many element comparisons does the partitioning do in total (Lomuto scheme, each `a[j] < pivot` test counts as one)?
answer: 190
verify:
  count = 0
  def qs(a, lo, hi):
      global count
      if lo >= hi:
          return
      pivot, i = a[hi], lo
      for j in range(lo, hi):
          count += 1
          if a[j] < pivot:
              a[i], a[j] = a[j], a[i]
              i += 1
      a[i], a[hi] = a[hi], a[i]
      qs(a, lo, i - 1)
      qs(a, i + 1, hi)
  qs(list(range(20)), 0, 19)
  print(count)
explain: Each partition of a sorted range of size m makes m − 1 comparisons and leaves a range of size m − 1. The total is 19 + 18 + ... + 1 = 20 × 19 / 2 = 190, which is the Θ(n²) worst case.
```

```quiz
q: Which statements about sorting are **true**? (Select all that apply.)
* Any comparison-based sort needs Ω(n log n) comparisons in the worst case
* Merge sort runs in Θ(n log n) time even in the worst case
- Quick sort runs in O(n log n) time in the worst case
* Counting sort can sort n integers in the range 0..n in O(n) time
explain: Quick sort's worst case is Θ(n²), when the pivot is always an extreme element. Counting sort is not comparison-based, so the n log n bound does not apply: with k = n it runs in O(n + k) = O(n).
```

```quiz
q: How many element **comparisons** does merging two sorted lists of lengths 5 and 3 need in the **worst** case?
answer: 7
verify: 5 + 3 - 1
explain: Each comparison outputs one element, and the merge can stop comparing once one list is empty. In the worst case the lists run out together, so 5 + 3 − 1 = 7 comparisons are needed.
```
