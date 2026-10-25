---
title: Divide and Conquer
chapter: Algorithm Design Techniques
description: Split, solve recursively, combine. Fast exponentiation, max-min, maximum subarray and fast multiplication.
---
**Divide and conquer** solves a problem in three steps:

1. **Divide** it into smaller subproblems of the same kind.
2. **Conquer** each subproblem recursively (small ones directly).
3. **Combine** the sub-answers into the answer.

You have already seen it in binary search, merge sort and quick sort. Its running time is described by a recurrence, usually solved with the master theorem (see the Recursion and Recurrence Relations lesson).

| Algorithm | Recurrence | Time |
| --- | --- | --- |
| Binary search | T(n) = T(n/2) + O(1) | O(log n) |
| Merge sort | T(n) = 2T(n/2) + O(n) | O(n log n) |
| Fast exponentiation | T(n) = T(n/2) + O(1) | O(log n) |
| Karatsuba multiplication | T(n) = 3T(n/2) + O(n) | O(n^log₂3) ≈ O(n^1.585) |
| Strassen matrix multiplication | T(n) = 7T(n/2) + O(n²) | O(n^log₂7) ≈ O(n^2.81) |

## Fast exponentiation

To compute xⁿ, use xⁿ = (x^(n/2))² when n is even, and x · xⁿ⁻¹ when n is odd. That needs O(log n) multiplications instead of n − 1.

```java
public class Main {
    static int mults = 0;

    static long power(long x, int n) {
        if (n == 0) return 1;
        if (n % 2 == 0) {
            long half = power(x, n / 2);
            mults++;
            return half * half;
        }
        mults++;
        return x * power(x, n - 1);
    }

    public static void main(String[] args) {
        System.out.println("3^13 = " + power(3, 13) + " using " + mults + " multiplications");
        mults = 0;
        System.out.println("2^62 = " + power(2, 62) + " using " + mults + " multiplications");
    }
}
```
```output
3^13 = 1594323 using 6 multiplications
2^62 = 4611686018427387904 using 10 multiplications
```
```python
mults = 0

def power(x, n):
    global mults
    if n == 0:
        return 1
    if n % 2 == 0:
        half = power(x, n // 2)
        mults += 1
        return half * half
    mults += 1
    return x * power(x, n - 1)

print(f"3^13 = {power(3, 13)} using {mults} multiplications")
mults = 0
print(f"2^62 = {power(2, 62)} using {mults} multiplications")
```
```output
3^13 = 1594323 using 6 multiplications
2^62 = 4611686018427387904 using 10 multiplications
```

## Finding the maximum and minimum together

Finding the max and the min separately takes 2(n − 1) comparisons. Divide and conquer does better: split the array in half, find max and min of each half, then combine with just **2** comparisons (max with max, min with min). For n a power of 2, this gives **T(n) = 2T(n/2) + 2** with T(2) = 1, which solves to **3n/2 − 2** comparisons.

```java
public class Main {
    static int comparisons = 0;

    static int[] maxMin(int[] a, int lo, int hi) {           // returns {max, min}
        if (lo == hi) return new int[]{a[lo], a[lo]};
        if (hi == lo + 1) {
            comparisons++;
            return a[lo] > a[hi] ? new int[]{a[lo], a[hi]} : new int[]{a[hi], a[lo]};
        }
        int mid = (lo + hi) / 2;
        int[] left = maxMin(a, lo, mid), right = maxMin(a, mid + 1, hi);
        comparisons += 2;
        return new int[]{Math.max(left[0], right[0]), Math.min(left[1], right[1])};
    }

    public static void main(String[] args) {
        int[] a = {22, 13, -5, -8, 15, 60, 17, 31};
        int[] r = maxMin(a, 0, a.length - 1);
        System.out.println("max=" + r[0] + " min=" + r[1] + " comparisons=" + comparisons + " (3n/2 - 2 = " + (3 * a.length / 2 - 2) + ")");
    }
}
```
```output
max=60 min=-8 comparisons=10 (3n/2 - 2 = 10)
```
```python
comparisons = 0

def max_min(a, lo, hi):                    # returns (max, min)
    global comparisons
    if lo == hi:
        return a[lo], a[lo]
    if hi == lo + 1:
        comparisons += 1
        return (a[lo], a[hi]) if a[lo] > a[hi] else (a[hi], a[lo])
    mid = (lo + hi) // 2
    lmax, lmin = max_min(a, lo, mid)
    rmax, rmin = max_min(a, mid + 1, hi)
    comparisons += 2
    return max(lmax, rmax), min(lmin, rmin)

a = [22, 13, -5, -8, 15, 60, 17, 31]
mx, mn = max_min(a, 0, len(a) - 1)
print(f"max={mx} min={mn} comparisons={comparisons} (3n/2 - 2 = {3 * len(a) // 2 - 2})")
```
```output
max=60 min=-8 comparisons=10 (3n/2 - 2 = 10)
```

## Maximum subarray sum

Find the contiguous part of an array with the largest sum. Divide and conquer splits at the middle: the best subarray is entirely in the left half, entirely in the right half, or **crosses the middle**, and the crossing case is found in linear time. That gives T(n) = 2T(n/2) + O(n) = **O(n log n)**. (Kadane's algorithm, a dynamic-programming idea, does it in O(n).)

```java
public class Main {
    static int maxSub(int[] a, int lo, int hi) {
        if (lo == hi) return a[lo];
        int mid = (lo + hi) / 2;
        int leftBest = Integer.MIN_VALUE, sum = 0;
        for (int i = mid; i >= lo; i--) { sum += a[i]; leftBest = Math.max(leftBest, sum); }
        int rightBest = Integer.MIN_VALUE;
        sum = 0;
        for (int i = mid + 1; i <= hi; i++) { sum += a[i]; rightBest = Math.max(rightBest, sum); }
        int crossing = leftBest + rightBest;
        return Math.max(crossing, Math.max(maxSub(a, lo, mid), maxSub(a, mid + 1, hi)));
    }

    static int kadane(int[] a) {
        int best = a[0], cur = a[0];
        for (int i = 1; i < a.length; i++) {
            cur = Math.max(a[i], cur + a[i]);
            best = Math.max(best, cur);
        }
        return best;
    }

    public static void main(String[] args) {
        int[] a = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("divide and conquer: " + maxSub(a, 0, a.length - 1));
        System.out.println("Kadane:             " + kadane(a));
    }
}
```
```output
divide and conquer: 6
Kadane:             6
```
```python
def max_sub(a, lo, hi):
    if lo == hi:
        return a[lo]
    mid = (lo + hi) // 2
    best, s = float("-inf"), 0
    for i in range(mid, lo - 1, -1):
        s += a[i]
        best = max(best, s)
    left_best, best, s = best, float("-inf"), 0
    for i in range(mid + 1, hi + 1):
        s += a[i]
        best = max(best, s)
    crossing = left_best + best
    return max(crossing, max_sub(a, lo, mid), max_sub(a, mid + 1, hi))

def kadane(a):
    best = cur = a[0]
    for x in a[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best

a = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print("divide and conquer:", max_sub(a, 0, len(a) - 1))
print("Kadane:            ", kadane(a))
```
```output
divide and conquer: 6
Kadane:             6
```

The best subarray is [4, −1, 2, 1] with sum 6.

## Faster multiplication

Multiplying two n-digit numbers the school way takes Θ(n²). **Karatsuba** splits each number into halves and needs only **3** half-size multiplications instead of 4, giving T(n) = 3T(n/2) + O(n) = O(n^1.585). **Strassen** does the same trick for matrices: 7 half-size matrix products instead of 8, giving O(n^2.81) instead of O(n³).

## GATE-style practice questions

```quiz
q: Using the divide-and-conquer max-min algorithm, how many comparisons are needed to find both the maximum and the minimum of 16 numbers?
answer: 22
verify: 3 * 16 // 2 - 2
explain: T(n) = 2T(n/2) + 2 with T(2) = 1 solves to 3n/2 − 2 for n a power of 2: 3 × 16 / 2 − 2 = 22, compared with 2 × 15 = 30 for two separate scans.
```

```quiz
q: Strassen's algorithm multiplies two n × n matrices using 7 recursive multiplications of n/2 × n/2 matrices plus Θ(n²) extra work. What is its running time?
- Θ(n³)
* Θ(n^log₂ 7)
- Θ(n² log n)
- Θ(n^log₂ 8)
explain: T(n) = 7T(n/2) + Θ(n²). Since n^(log₂ 7) ≈ n^2.81 grows faster than n², case 1 of the master theorem gives Θ(n^log₂ 7). Note that n^log₂ 8 = n³, the ordinary method.
```

```quiz
q: The recursive fast-exponentiation function above (square the half for even n, multiply by x for odd n) computes 3^13. How many multiplications does it perform?
answer: 6
verify: (lambda f: f(f, 13))(lambda f, n: 0 if n == 0 else 1 + f(f, n // 2) if n % 2 == 0 else 1 + f(f, n - 1))
explain: 13 is odd (1 multiplication, go to 12), 12 → square of 6 (1), 6 → square of 3 (1), 3 is odd (1, go to 2), 2 → square of 1 (1), 1 is odd (1, go to 0). That is 6 multiplications.
```
