---
title: Amortized Analysis
chapter: Getting Started
description: Why some operations are cheap on average even when a few are expensive: aggregate, accounting and potential methods, with dynamic arrays, multipop stacks and binary counters.
---
Some data structures do an expensive operation now and then, but most operations are cheap. **Amortized analysis** finds the average cost per operation over the **worst-case sequence** of operations. Unlike average-case analysis, it involves no probability: it is a guarantee for every sequence.

## The dynamic array

A dynamic array (Python `list`, Java `ArrayList`, C++ `vector`) doubles its capacity when it is full and copies every element into the new array. One append can cost O(n), yet n appends cost only O(n) in total.

```pipeline
caption: Capacity doubling as elements are appended
1 | full after 1 append
2 | copy 1
4 | copy 2
8 | copy 4
16 | copy 8
```

Copies for n appends (n a power of 2): 1 + 2 + 4 + … + n/2 = n − 1 < n. Adding the n writes, the total is under **2n**, so each append costs **O(1) amortized**.

## Three methods

| Method | Idea |
| --- | --- |
| **Aggregate** | Find the total cost T(n) of n operations; amortized cost = T(n)/n |
| **Accounting** | Charge each operation a fixed fee; cheap operations save credit that pays for expensive ones later. Credit must never go negative |
| **Potential** | Define a potential Φ(state) ≥ 0. Amortized cost = actual cost + ΔΦ |

**Accounting for the dynamic array:** charge 3 units per append: 1 for the write, 2 saved. When the array doubles from k to 2k, the k/2 elements added since the last doubling have saved k credits, enough to copy all k elements.

## Two more classic examples

**Stack with MULTIPOP(k):** pops up to k items. One multipop may cost O(n), but each item is popped at most once after being pushed, so n operations cost O(n) in total: **O(1) amortized**.

**Binary counter:** incrementing flips the trailing 1s to 0 and one 0 to 1. Bit 0 flips every time, bit 1 every second time, bit 2 every fourth time… Total flips over n increments < n(1 + ½ + ¼ + …) = **2n**, so O(1) amortized, even though one increment can flip all bits.

## Counting it

```java
public class Main {
    public static void main(String[] args) {
        // Dynamic array: double the capacity when full, and count element copies.
        int capacity = 1, size = 0, copies = 0;
        int n = 16;
        for (int i = 0; i < n; i++) {
            if (size == capacity) {
                copies += size;            // copy every element into the new array
                capacity *= 2;
            }
            size++;
        }
        System.out.println("appends = " + n + ", copies = " + copies + ", capacity = " + capacity);
        System.out.println("average cost per append = " + (double) (n + copies) / n);

        // Binary counter: count how many bits flip over n increments.
        int[] bits = new int[8];
        int flips = 0;
        for (int i = 0; i < n; i++) {
            int j = 0;
            while (j < bits.length && bits[j] == 1) {   // trailing 1s become 0
                bits[j++] = 0;
                flips++;
            }
            if (j < bits.length) {                     // first 0 becomes 1
                bits[j] = 1;
                flips++;
            }
        }
        System.out.println("increments = " + n + ", bit flips = " + flips);
    }
}
```
```output
appends = 16, copies = 15, capacity = 16
average cost per append = 1.9375
increments = 16, bit flips = 31
```
```python
# Dynamic array: double the capacity when full, and count element copies.
capacity, size, copies = 1, 0, 0
n = 16
for _ in range(n):
    if size == capacity:
        copies += size              # copy every element into the new array
        capacity *= 2
    size += 1
print(f"appends = {n}, copies = {copies}, capacity = {capacity}")
print("average cost per append =", (n + copies) / n)

# Binary counter: count how many bits flip over n increments.
bits = [0] * 8
flips = 0
for _ in range(n):
    j = 0
    while j < len(bits) and bits[j] == 1:   # trailing 1s become 0
        bits[j] = 0
        j += 1
        flips += 1
    if j < len(bits):                       # first 0 becomes 1
        bits[j] = 1
        flips += 1
print(f"increments = {n}, bit flips = {flips}")
```
```output
appends = 16, copies = 15, capacity = 16
average cost per append = 1.9375
increments = 16, bit flips = 31
```
```c
#include <stdio.h>

int main(void) {
    /* Dynamic array: double the capacity when full, and count element copies. */
    int capacity = 1, size = 0, copies = 0;
    int n = 16;
    for (int i = 0; i < n; i++) {
        if (size == capacity) {
            copies += size;            /* copy every element into the new array */
            capacity *= 2;
        }
        size++;
    }
    printf("appends = %d, copies = %d, capacity = %d\n", n, copies, capacity);
    printf("average cost per append = %.4f\n", (double)(n + copies) / n);

    /* Binary counter: count how many bits flip over n increments. */
    int bits[8] = {0};
    int flips = 0;
    for (int i = 0; i < n; i++) {
        int j = 0;
        while (j < 8 && bits[j] == 1) {   /* trailing 1s become 0 */
            bits[j++] = 0;
            flips++;
        }
        if (j < 8) {                      /* first 0 becomes 1 */
            bits[j] = 1;
            flips++;
        }
    }
    printf("increments = %d, bit flips = %d\n", n, flips);
    return 0;
}
```
```output
appends = 16, copies = 15, capacity = 16
average cost per append = 1.9375
increments = 16, bit flips = 31
```

## GATE-style practice questions

```quiz
q: A dynamic array starts with capacity 1 and doubles when full. How many element copies happen in total while appending 64 elements?
answer: 63
verify:
  cap, size, copies = 1, 0, 0
  for _ in range(64):
      if size == cap:
          copies += size
          cap *= 2
      size += 1
  print(copies)
explain: Copies happen at sizes 1, 2, 4, 8, 16, 32: total 63 = n − 1.
```

```quiz
q: An 8-bit binary counter starts at 0 and is incremented 32 times. How many bit flips occur in total?
answer: 63
verify:
  bits, flips = [0] * 8, 0
  for _ in range(32):
      j = 0
      while j < 8 and bits[j] == 1:
          bits[j] = 0
          j += 1
          flips += 1
      if j < 8:
          bits[j] = 1
          flips += 1
  print(flips)
explain: Bit i flips ⌊32/2ⁱ⌋ times: 32 + 16 + 8 + 4 + 2 + 1 = 63.
```

```quiz
q: If a dynamic array grows by adding a constant 10 slots (instead of doubling) when full, the amortized cost of an append is:
- O(1)
- O(log n)
* O(n)
- O(n log n)
explain: Copies happen every 10 appends and cost 10, 20, 30, …, which sums to Θ(n²) for n appends: Θ(n) per append.
```

```quiz
q: Which statements about amortized analysis are true? (Select all that apply.)
* It gives a worst-case bound on the total cost of a sequence of operations
* It does not use probability
- It assumes the input is random
- A single operation can never cost more than the amortized cost
explain: Amortized cost averages over a worst-case sequence; individual operations (like a doubling) may be much more expensive.
```
