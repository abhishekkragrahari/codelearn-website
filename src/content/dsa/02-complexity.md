---
title: Time and Space Complexity
chapter: Getting Started
description: Measure how running time grows with input size using Big-O, Big-Omega and Big-Theta.
---
Timing a program with a stopwatch depends on the computer, the language and even the weather in the data centre. Instead, we count how the **number of basic steps** grows as the input size `n` grows. This growth rate is the algorithm's **time complexity**. The extra memory it needs is its **space complexity**.

## Asymptotic notation

| Notation | Meaning | Read as |
| --- | --- | --- |
| f(n) = O(g(n)) | f grows **at most** as fast as g (upper bound) | "Big-O" |
| f(n) = Ω(g(n)) | f grows **at least** as fast as g (lower bound) | "Big-Omega" |
| f(n) = Θ(g(n)) | f grows **exactly** as fast as g (both bounds) | "Big-Theta" |

Formally, f(n) = O(g(n)) if there are constants c > 0 and n₀ such that f(n) ≤ c·g(n) for every n ≥ n₀. Constant factors and lower-order terms are ignored: 3n² + 5n + 100 is Θ(n²).

## Common growth rates

From fastest to slowest:

```pipeline
caption: Common complexities, from best to worst
O(1) | constant
O(log n) | logarithmic
O(n) | linear
O(n log n) | linearithmic
O(n²) | quadratic
O(2ⁿ) | exponential
```

| n | log₂ n | n log₂ n | n² | 2ⁿ |
| --- | --- | --- | --- | --- |
| 16 | 4 | 64 | 256 | 65,536 |
| 1,024 | 10 | 10,240 | 1,048,576 | about 1.8 × 10³⁰⁸ |

## Counting steps in loops

The easiest way to find a complexity is to count how many times the innermost statement runs.

```java
public class Main {
    public static void main(String[] args) {
        int n = 16;

        int single = 0;
        for (int i = 0; i < n; i++) single++;                 // n times

        int nested = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) nested++;             // n * n times

        int triangle = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < i; j++) triangle++;           // 0 + 1 + ... + (n-1)

        int doubling = 0;
        for (int i = 1; i < n; i *= 2) doubling++;            // log2(n) times

        System.out.println("single loop:  " + single);
        System.out.println("nested loops: " + nested);
        System.out.println("triangle:     " + triangle + " = n(n-1)/2");
        System.out.println("doubling i:   " + doubling);
    }
}
```
```output
single loop:  16
nested loops: 256
triangle:     120 = n(n-1)/2
doubling i:   4
```
```python
n = 16

single = sum(1 for i in range(n))                                # n times
nested = sum(1 for i in range(n) for j in range(n))              # n * n times
triangle = sum(1 for i in range(n) for j in range(i))            # 0 + 1 + ... + (n-1)

doubling, i = 0, 1
while i < n:                                                     # log2(n) times
    doubling += 1
    i *= 2

print("single loop: ", single)
print("nested loops:", nested)
print("triangle:    ", triangle, "= n(n-1)/2")
print("doubling i:  ", doubling)
```
```output
single loop:  16
nested loops: 256
triangle:     120 = n(n-1)/2
doubling i:   4
```

- A single loop over `n` items is **Θ(n)**.
- Two nested loops over `n` are **Θ(n²)**; so is the "triangle" loop, because n(n−1)/2 is still quadratic.
- A loop that doubles (or halves) its variable runs **Θ(log n)** times.

## Best, worst and average case

The same algorithm can take different time on different inputs of the same size. Linear search finds the target at position 1 in the **best case** (Θ(1)), at the end or not at all in the **worst case** (Θ(n)), and around the middle on **average** (Θ(n)). When people say "the complexity" without qualification they usually mean the worst case.

## GATE-style practice questions

```quiz
q: What is the time complexity of the following code fragment as a function of `n`?

`for (i = 1; i <= n; i++) for (j = 1; j <= i; j++) count++;`
- Θ(n)
- Θ(n log n)
* Θ(n²)
- Θ(n³)
explain: The inner statement runs 1 + 2 + ... + n = n(n+1)/2 times, which is Θ(n²).
```

```quiz
q: Which of the following statements are **true**? (Select all that apply.)
* n log n = O(n²)
* 2ⁿ⁺¹ = O(2ⁿ)
- 2²ⁿ = O(2ⁿ)
* log(n!) = Θ(n log n)
explain: n log n grows slower than n². 2ⁿ⁺¹ = 2·2ⁿ, only a constant factor more. 2²ⁿ = 4ⁿ = 2ⁿ·2ⁿ, and the ratio 2ⁿ is not bounded by a constant, so it is not O(2ⁿ). By Stirling's approximation log(n!) = n log n − Θ(n) = Θ(n log n).
```

```quiz
q: How many times is `count++` executed when n = 64?

`for (i = n; i > 0; i = i / 2) count++;` (integer division)
answer: 7
verify: (lambda f: f(f, 64))(lambda f, i: 0 if i <= 0 else 1 + f(f, i // 2))
explain: i takes the values 64, 32, 16, 8, 4, 2, 1 and then becomes 0, so the body runs 7 times, that is floor(log₂ 64) + 1.
```

```quiz
q: f(n) = 3n² + 5n log n + 100. Which is the tightest correct description?
- f(n) = Θ(n log n)
* f(n) = Θ(n²)
- f(n) = Θ(n³)
- f(n) = O(n) 
explain: The n² term dominates both n log n and the constant, so f(n) is bounded above and below by constant multiples of n².
```
