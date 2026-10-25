---
title: Simple Sorting (Bubble, Selection, Insertion)
chapter: Searching and Sorting
description: Three easy O(n²) sorts, how many swaps and comparisons they make, and when they are still useful.
---
**Sorting** arranges items in order. It is one of the most studied problems in computing, because sorted data makes searching (binary search), finding duplicates and merging much faster. This lesson covers three simple algorithms; the next one covers the fast ones.

Two properties matter when comparing sorts:

- **Stable:** equal keys keep their original relative order.
- **In place:** only O(1) extra memory is used.

## Bubble sort

Repeatedly walk through the array and **swap neighbours** that are out of order. After pass k, the k largest items have "bubbled" to the end. If a pass makes no swaps, the array is sorted and we can stop early.

## Selection sort

For each position i, find the **smallest** item in the unsorted part and swap it into position i. It makes at most n − 1 swaps, the fewest of the three.

## Insertion sort

Take the items one by one and **insert** each into its correct place in the already-sorted part on the left, shifting bigger items right, like sorting playing cards in your hand. It is very fast on **nearly sorted** data.

```flowchart
caption: Insertion sort: placing one item, key = a[i]
start: key = a[i], j = i - 1
while: j >= 0 and a[j] > key?
  step: a[j + 1] = a[j] (shift right)
  step: j = j - 1
step: a[j + 1] = key
end: next i
```

```java
import java.util.Arrays;

public class Main {
    static int comparisons, swaps;

    static void bubble(int[] a) {
        for (int pass = 0; pass < a.length - 1; pass++) {
            boolean swapped = false;
            for (int j = 0; j < a.length - 1 - pass; j++) {
                comparisons++;
                if (a[j] > a[j + 1]) { int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; swaps++; swapped = true; }
            }
            if (!swapped) break;              // already sorted: stop early
        }
    }

    static void selection(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {
            int min = i;
            for (int j = i + 1; j < a.length; j++) {
                comparisons++;
                if (a[j] < a[min]) min = j;
            }
            if (min != i) { int t = a[i]; a[i] = a[min]; a[min] = t; swaps++; }
        }
    }

    static void insertion(int[] a) {
        for (int i = 1; i < a.length; i++) {
            int key = a[i], j = i - 1;
            while (j >= 0) {
                comparisons++;
                if (a[j] <= key) break;
                a[j + 1] = a[j];              // shift right (counted as a move)
                swaps++;
                j--;
            }
            a[j + 1] = key;
        }
    }

    static void run(String name, int[] data, java.util.function.Consumer<int[]> sorter) {
        int[] a = data.clone();
        comparisons = swaps = 0;
        sorter.accept(a);
        System.out.printf("%-10s %s  comparisons=%d swaps/shifts=%d%n", name, Arrays.toString(a), comparisons, swaps);
    }

    public static void main(String[] args) {
        int[] data = {5, 1, 4, 2, 8};
        run("bubble", data, Main::bubble);
        run("selection", data, Main::selection);
        run("insertion", data, Main::insertion);
    }
}
```
```output
bubble     [1, 2, 4, 5, 8]  comparisons=9 swaps/shifts=4
selection  [1, 2, 4, 5, 8]  comparisons=10 swaps/shifts=2
insertion  [1, 2, 4, 5, 8]  comparisons=7 swaps/shifts=4
```
```python
def bubble(a, stats):
    n = len(a)
    for p in range(n - 1):
        swapped = False
        for j in range(n - 1 - p):
            stats["comparisons"] += 1
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                stats["swaps"] += 1
                swapped = True
        if not swapped:                       # already sorted: stop early
            break

def selection(a, stats):
    n = len(a)
    for i in range(n - 1):
        m = i
        for j in range(i + 1, n):
            stats["comparisons"] += 1
            if a[j] < a[m]:
                m = j
        if m != i:
            a[i], a[m] = a[m], a[i]
            stats["swaps"] += 1

def insertion(a, stats):
    for i in range(1, len(a)):
        key, j = a[i], i - 1
        while j >= 0:
            stats["comparisons"] += 1
            if a[j] <= key:
                break
            a[j + 1] = a[j]                   # shift right (counted as a move)
            stats["swaps"] += 1
            j -= 1
        a[j + 1] = key

data = [5, 1, 4, 2, 8]
for name, sorter in [("bubble", bubble), ("selection", selection), ("insertion", insertion)]:
    a, stats = data[:], {"comparisons": 0, "swaps": 0}
    sorter(a, stats)
    print(f"{name:<10} {a}  comparisons={stats['comparisons']} swaps/shifts={stats['swaps']}")
```
```output
bubble     [1, 2, 4, 5, 8]  comparisons=9 swaps/shifts=4
selection  [1, 2, 4, 5, 8]  comparisons=10 swaps/shifts=2
insertion  [1, 2, 4, 5, 8]  comparisons=7 swaps/shifts=4
```

## Inversions

An **inversion** is a pair of positions i < j with a[i] > a[j]. Each swap of neighbours in bubble sort, and each shift in insertion sort, fixes exactly **one** inversion. So both make exactly as many swaps/shifts as there are inversions: [5, 1, 4, 2, 8] has 4 inversions, (5,1), (5,4), (5,2) and (4,2), which matches the output above.

| Algorithm | Best | Average | Worst | Stable | In place |
| --- | --- | --- | --- | --- | --- |
| Bubble sort (with early exit) | O(n) | O(n²) | O(n²) | yes | yes |
| Selection sort | O(n²) | O(n²) | O(n²) | no | yes |
| Insertion sort | O(n) | O(n²) | O(n²) | yes | yes |

> **Tip:** Insertion sort is the best choice for small arrays (around 10 to 20 items) and nearly sorted data. Fast library sorts such as Timsort, used by Python and by Java for objects, switch to insertion sort for small pieces.

## GATE-style practice questions

```quiz
q: How many **inversions** does the array [4, 3, 2, 1, 5] contain?
answer: 6
verify: (lambda a: sum(a[i] > a[j] for i in range(len(a)) for j in range(i + 1, len(a))))([4, 3, 2, 1, 5])
explain: Every pair among 4, 3, 2, 1 is inverted: C(4, 2) = 6 pairs. 5 is larger than everything before it, so it adds none.
```

```quiz
q: Insertion sort is run on an array that is already sorted in **increasing** order. How many key comparisons does it make for n = 10?
answer: 9
verify: 10 - 1
explain: Each new item is compared once with its left neighbour, finds it smaller or equal, and stops. Items 2 to 10 make one comparison each, so n − 1 = 9 comparisons, which is why insertion sort is O(n) in the best case.
```

```quiz
q: Which of these sorting algorithms are **stable** in their standard form? (Select all that apply.)
* Bubble sort
* Insertion sort
- Selection sort
* Merge sort
explain: Bubble and insertion sort only move an item past a strictly greater neighbour, and merge sort takes from the left half on ties, so equal keys keep their order. Selection sort's long-distance swap can jump an item over an equal one, for example [2a, 2b, 1] becomes [1, 2b, 2a].
```

```quiz
q: Selection sort is run on an array of n distinct elements. What is the **maximum** number of swaps it performs?
- n²/2
- n log n
* n − 1
- n
explain: Selection sort does at most one swap per outer iteration, and there are n − 1 outer iterations. That makes it useful when writing to memory is expensive.
```
