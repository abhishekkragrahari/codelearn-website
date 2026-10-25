---
title: Recursion and Recurrence Relations
chapter: Getting Started
description: How recursive calls run, and how to find their running time with recursion trees and the master theorem.
---
A **recursive** function solves a problem by calling itself on smaller inputs. Every recursive function needs:

- a **base case** that is answered directly, and
- a **recursive case** that makes progress towards the base case.

Each call gets its own **stack frame** with its own local variables. The frames pile up on the call stack until a base case returns, and then unwind in reverse order. A recursion that is d calls deep uses O(d) stack space.

## Tower of Hanoi

Move n discs from peg A to peg C, one disc at a time, never putting a larger disc on a smaller one. The recursive idea: move n − 1 discs out of the way to B, move the biggest disc to C, then move the n − 1 discs from B onto it.

```flowchart
caption: hanoi(n, from, to, via)
start: hanoi(n, from, to, via)
if: n == 0?
  yes:
    step: return (nothing to move)
  no:
    step: hanoi(n-1, from, via, to)
    step: move disc n: from → to
    step: hanoi(n-1, via, to, from)
end: return
```

```java
public class Main {
    static int moves = 0;
    static boolean show = true;

    static void hanoi(int n, char from, char to, char via) {
        if (n == 0) return;
        hanoi(n - 1, from, via, to);
        moves++;
        if (show) System.out.println("move disc " + n + ": " + from + " -> " + to);
        hanoi(n - 1, via, to, from);
    }

    public static void main(String[] args) {
        hanoi(3, 'A', 'C', 'B');
        System.out.println("moves for 3 discs: " + moves);
        moves = 0;
        show = false;
        hanoi(10, 'A', 'C', 'B');
        System.out.println("moves for 10 discs: " + moves);
    }
}
```
```output
move disc 1: A -> C
move disc 2: A -> B
move disc 1: C -> B
move disc 3: A -> C
move disc 1: B -> A
move disc 2: B -> C
move disc 1: A -> C
moves for 3 discs: 7
moves for 10 discs: 1023
```
```python
moves = 0

def hanoi(n, frm, to, via, show):
    global moves
    if n == 0:
        return
    hanoi(n - 1, frm, via, to, show)
    moves += 1
    if show:
        print(f"move disc {n}: {frm} -> {to}")
    hanoi(n - 1, via, to, frm, show)

hanoi(3, "A", "C", "B", show=True)
print("moves for 3 discs:", moves)
moves = 0
hanoi(10, "A", "C", "B", show=False)
print("moves for 10 discs:", moves)
```
```output
move disc 1: A -> C
move disc 2: A -> B
move disc 1: C -> B
move disc 3: A -> C
move disc 1: B -> A
move disc 2: B -> C
move disc 1: A -> C
moves for 3 discs: 7
moves for 10 discs: 1023
```
```c
#include <stdio.h>

int moves = 0;
int show = 1;

void hanoi(int n, char from, char to, char via) {
    if (n == 0) return;
    hanoi(n - 1, from, via, to);
    moves++;
    if (show) printf("move disc %d: %c -> %c\n", n, from, to);
    hanoi(n - 1, via, to, from);
}

int main(void) {
    hanoi(3, 'A', 'C', 'B');
    printf("moves for 3 discs: %d\n", moves);
    moves = 0;
    show = 0;
    hanoi(10, 'A', 'C', 'B');
    printf("moves for 10 discs: %d\n", moves);
    return 0;
}
```
```output
move disc 1: A -> C
move disc 2: A -> B
move disc 1: C -> B
move disc 3: A -> C
move disc 1: B -> A
move disc 2: B -> C
move disc 1: A -> C
moves for 3 discs: 7
moves for 10 discs: 1023
```

The number of moves satisfies **M(n) = 2M(n − 1) + 1** with M(0) = 0, whose solution is **M(n) = 2ⁿ − 1**.

## Recurrence relations

The running time of a recursive algorithm is naturally written as a **recurrence**: the time for size n in terms of the time for smaller sizes.

| Algorithm | Recurrence | Solution |
| --- | --- | --- |
| Binary search | T(n) = T(n/2) + O(1) | Θ(log n) |
| Merge sort | T(n) = 2T(n/2) + Θ(n) | Θ(n log n) |
| Tower of Hanoi | T(n) = 2T(n − 1) + O(1) | Θ(2ⁿ) |
| Linear recursion (e.g. factorial) | T(n) = T(n − 1) + O(1) | Θ(n) |
| Quick sort, worst case | T(n) = T(n − 1) + Θ(n) | Θ(n²) |

## The recursion tree method

Draw the calls as a tree, write the work done at each node, and add up level by level. For merge sort, T(n) = 2T(n/2) + n:

```tree
caption: Recursion tree for T(n) = 2T(n/2) + n: every level does n work, and there are log₂ n levels
n | level 0: n
  n/2 | level 1: n/2 + n/2 = n
    n/4 | level 2: 4 × n/4 = n
    n/4
  n/2
    n/4
    n/4
```

Total = n × (number of levels) = n log₂ n, so T(n) = Θ(n log n).

## The master theorem

For recurrences of the form **T(n) = a·T(n/b) + f(n)** with a ≥ 1 and b > 1, compare f(n) with **n^(log_b a)**:

| Case | Condition | Result |
| --- | --- | --- |
| 1 | f(n) = O(n^(log_b a − ε)) for some ε > 0 (the leaves dominate) | T(n) = Θ(n^(log_b a)) |
| 2 | f(n) = Θ(n^(log_b a) · logᵏ n), k ≥ 0 (every level equal) | T(n) = Θ(n^(log_b a) · logᵏ⁺¹ n) |
| 3 | f(n) = Ω(n^(log_b a + ε)) and a·f(n/b) ≤ c·f(n) for some c < 1 (the root dominates) | T(n) = Θ(f(n)) |

Examples:

- T(n) = 4T(n/2) + n: n^(log₂ 4) = n² beats n → case 1 → **Θ(n²)**.
- T(n) = 2T(n/2) + n: n^(log₂ 2) = n, same as f(n) → case 2 → **Θ(n log n)**.
- T(n) = 2T(n/2) + n²: f(n) = n² beats n → case 3 → **Θ(n²)**.
- T(n) = 7T(n/2) + n²: n^(log₂ 7) ≈ n^2.81 beats n² → case 1 → **Θ(n^2.81)** (Strassen's matrix multiplication).

The master theorem does not apply to recurrences like T(n) = T(n − 1) + n; use the recursion tree or substitution for those.

## Reading recursive code

GATE often shows a short recursive function and asks what it returns. Trace the calls carefully, from the base case upwards.

```java
public class Main {
    // returns the number of 1 bits in n
    static int ones(int n) {
        if (n == 0) return 0;
        return (n % 2) + ones(n / 2);
    }

    // f(n) = f(n-1) + 2 * f(n-2), f(0) = 0, f(1) = 1
    static int f(int n) {
        if (n <= 1) return n;
        return f(n - 1) + 2 * f(n - 2);
    }

    public static void main(String[] args) {
        System.out.println("ones(45) = " + ones(45));
        for (int n = 0; n <= 6; n++) System.out.print("f(" + n + ")=" + f(n) + " ");
        System.out.println();
    }
}
```
```output
ones(45) = 4
f(0)=0 f(1)=1 f(2)=1 f(3)=3 f(4)=5 f(5)=11 f(6)=21 
```
```python
def ones(n):                 # number of 1 bits in n
    return 0 if n == 0 else (n % 2) + ones(n // 2)

def f(n):                    # f(n) = f(n-1) + 2 f(n-2)
    return n if n <= 1 else f(n - 1) + 2 * f(n - 2)

print("ones(45) =", ones(45))
print(*[f"f({n})={f(n)}" for n in range(7)])
```
```output
ones(45) = 4
f(0)=0 f(1)=1 f(2)=1 f(3)=3 f(4)=5 f(5)=11 f(6)=21
```
```c
#include <stdio.h>

/* returns the number of 1 bits in n */
int ones(int n) {
    if (n == 0) return 0;
    return (n % 2) + ones(n / 2);
}

/* f(n) = f(n-1) + 2 * f(n-2), f(0) = 0, f(1) = 1 */
int f(int n) {
    if (n <= 1) return n;
    return f(n - 1) + 2 * f(n - 2);
}

int main(void) {
    printf("ones(45) = %d\n", ones(45));
    for (int n = 0; n <= 6; n++) printf("f(%d)=%d ", n, f(n));
    printf("\n");
    return 0;
}
```
```output
ones(45) = 4
f(0)=0 f(1)=1 f(2)=1 f(3)=3 f(4)=5 f(5)=11 f(6)=21
```

## GATE-style practice questions

```quiz
q: What is the solution of the recurrence T(n) = 4T(n/2) + n² with T(1) = 1?
- Θ(n²)
* Θ(n² log n)
- Θ(n³)
- Θ(n log n)
explain: Here a = 4, b = 2, so n^(log₂ 4) = n², exactly the same as f(n) = n². This is case 2 of the master theorem with k = 0, giving Θ(n² log n).
```

```quiz
q: What is the solution of T(n) = T(n − 1) + n with T(1) = 1?
- Θ(n)
- Θ(n log n)
* Θ(n²)
- Θ(2ⁿ)
explain: Unrolling gives T(n) = n + (n − 1) + ... + 1 = n(n + 1)/2 = Θ(n²). The master theorem does not apply because the subproblem is n − 1, not n/b.
```

```quiz
q: How many moves does the Tower of Hanoi need for 8 discs?
answer: 255
verify: 2 ** 8 - 1
explain: M(n) = 2M(n − 1) + 1 with M(0) = 0 gives M(n) = 2ⁿ − 1 = 255.
```

```quiz
q: Consider the function

`int g(int n) { if (n <= 2) return 1; return g(n - 1) + g(n - 3); }`

What does g(8) return?
answer: 13
verify: (lambda h: h(h, 8))(lambda h, n: 1 if n <= 2 else h(h, n - 1) + h(h, n - 3))
explain: Every call with n ≤ 2 returns 1, including the calls g(0) and below reached through g(n − 3). Building upwards: g(3) = g(2) + g(0) = 2, g(4) = g(3) + g(1) = 3, g(5) = g(4) + g(2) = 4, g(6) = g(5) + g(3) = 6, g(7) = g(6) + g(4) = 9 and g(8) = g(7) + g(5) = 13.
```
