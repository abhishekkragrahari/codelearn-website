---
title: Backtracking (N-Queens and Subset Sum)
chapter: Algorithm Design Techniques
description: Build a solution one choice at a time and undo choices that cannot work: the state-space tree, pruning, N-Queens, subset sum, permutations and graph colouring.
---
**Backtracking** searches for solutions by making one choice at a time. As soon as a partial solution cannot possibly lead to a valid answer, it **undoes** the last choice (backtracks) and tries the next option. It is a depth-first search of the **state-space tree** of all choices, with branches cut off early (**pruning**).

## The pattern

```flowchart
caption: The backtracking pattern
start: solve(partial)
if: partial is a complete solution?
  yes:
    io: Record it
  no:
    step: For each choice that keeps partial valid
    step: Make the choice (choose)
    step: solve(extended partial) (explore)
    step: Undo the choice (unchoose)
end: Return
```

Every backtracking program has the same three steps: **choose, explore, unchoose**. Pruning is what makes it faster than trying everything blindly.

## N-Queens

Place n queens on an n × n board so that no two attack each other (same row, column or diagonal). Put one queen per row; in row r, try each column c that is not attacked:

- Same column: col[i] = c.
- Same diagonal: |col[i] − c| = r − i.

```tree
caption: Part of the state-space tree for 4-Queens (row 0, column chosen at each level)
start
  Q0 at 0
    Q1 at 2 | dead end
    Q1 at 3
      Q2 at 1 | dead end
  Q0 at 1
    Q1 at 3
      Q2 at 0
        Q3 at 2 | solution
```

The 4-Queens problem has 2 solutions, 6-Queens has 4 and 8-Queens has 92.

## Subset sum

Find subsets of a set that add up to a target. At each element, branch on **take** or **skip**, and prune when the remaining target goes negative.

## The code

```java
import java.util.*;

public class Main {
    static int n, count;
    static int[] col;                       // col[r] = column of the queen in row r

    static boolean safe(int r, int c) {
        for (int i = 0; i < r; i++)
            if (col[i] == c || Math.abs(col[i] - c) == r - i) return false;
        return true;
    }

    static void place(int r, boolean print) {
        if (r == n) {                       // all rows filled: a solution
            count++;
            if (print) System.out.println("solution: " + Arrays.toString(col));
            return;
        }
        for (int c = 0; c < n; c++) {
            if (safe(r, c)) {
                col[r] = c;                 // choose
                place(r + 1, print);        // explore
            }                               // undo is implicit: col[r] is overwritten
        }
    }

    static void subsets(int[] a, int i, int target, List<Integer> chosen) {
        if (target == 0) { System.out.println("sum found: " + chosen); return; }
        if (i == a.length || target < 0) return;   // prune
        chosen.add(a[i]);
        subsets(a, i + 1, target - a[i], chosen);  // take a[i]
        chosen.remove(chosen.size() - 1);
        subsets(a, i + 1, target, chosen);         // skip a[i]
    }

    public static void main(String[] args) {
        n = 4; col = new int[n]; count = 0;
        place(0, true);
        for (int size : new int[]{6, 8}) {
            n = size; col = new int[n]; count = 0;
            place(0, false);
            System.out.println(size + "-queens solutions: " + count);
        }
        subsets(new int[]{3, 4, 5, 2}, 0, 9, new ArrayList<>());
    }
}
```
```output
solution: [1, 3, 0, 2]
solution: [2, 0, 3, 1]
6-queens solutions: 4
8-queens solutions: 92
sum found: [3, 4, 2]
sum found: [4, 5]
```
```python
def safe(col, r, c):
    return all(col[i] != c and abs(col[i] - c) != r - i for i in range(r))

def place(col, r, n, out):
    if r == n:                          # all rows filled: a solution
        out.append(col[:])
        return
    for c in range(n):
        if safe(col, r, c):
            col[r] = c                  # choose
            place(col, r + 1, n, out)   # explore
                                        # undo is implicit: col[r] is overwritten

def subsets(a, i, target, chosen):
    if target == 0:
        print("sum found:", chosen)
        return
    if i == len(a) or target < 0:       # prune
        return
    chosen.append(a[i])
    subsets(a, i + 1, target - a[i], chosen)   # take a[i]
    chosen.pop()
    subsets(a, i + 1, target, chosen)          # skip a[i]

sols = []
place([0] * 4, 0, 4, sols)
for s in sols:
    print("solution:", s)
for size in (6, 8):
    sols = []
    place([0] * size, 0, size, sols)
    print(f"{size}-queens solutions: {len(sols)}")
subsets([3, 4, 5, 2], 0, 9, [])
```
```output
solution: [1, 3, 0, 2]
solution: [2, 0, 3, 1]
6-queens solutions: 4
8-queens solutions: 92
sum found: [3, 4, 2]
sum found: [4, 5]
```
```c
#include <stdio.h>
#include <stdlib.h>

int n, count, col[8];
int a[] = {3, 4, 5, 2}, chosen[4], nchosen = 0;

int safe(int r, int c) {
    for (int i = 0; i < r; i++)
        if (col[i] == c || abs(col[i] - c) == r - i) return 0;
    return 1;
}

void print_list(const char *label, int *v, int len) {
    printf("%s[", label);
    for (int i = 0; i < len; i++) printf(i ? ", %d" : "%d", v[i]);
    printf("]\n");
}

void place(int r, int print) {
    if (r == n) {                       /* all rows filled: a solution */
        count++;
        if (print) print_list("solution: ", col, n);
        return;
    }
    for (int c = 0; c < n; c++) {
        if (safe(r, c)) {
            col[r] = c;                 /* choose */
            place(r + 1, print);        /* explore */
        }                               /* undo is implicit: col[r] is overwritten */
    }
}

void subsets(int i, int target) {
    if (target == 0) { print_list("sum found: ", chosen, nchosen); return; }
    if (i == 4 || target < 0) return;  /* prune */
    chosen[nchosen++] = a[i];
    subsets(i + 1, target - a[i]);      /* take a[i] */
    nchosen--;
    subsets(i + 1, target);             /* skip a[i] */
}

int main(void) {
    n = 4; count = 0;
    place(0, 1);
    int sizes[] = {6, 8};
    for (int k = 0; k < 2; k++) {
        n = sizes[k]; count = 0;
        place(0, 0);
        printf("%d-queens solutions: %d\n", n, count);
    }
    subsets(0, 9);
    return 0;
}
```
```output
solution: [1, 3, 0, 2]
solution: [2, 0, 3, 1]
6-queens solutions: 4
8-queens solutions: 92
sum found: [3, 4, 2]
sum found: [4, 5]
```

## Other backtracking problems

- **Permutations** of n items: n! leaves; swap an item into place, recurse, swap back.
- **Graph colouring** with m colours: give each vertex a colour different from its coloured neighbours.
- **Hamiltonian cycle**, **Sudoku**, **word search** in a grid, **rat in a maze**.

Backtracking is still exponential in the worst case; pruning only reduces how much of the tree is explored. **Branch and bound** adds a bound on the best possible answer from a node, to prune optimisation problems.

## GATE-style practice questions

```quiz
q: How many solutions does the 5-Queens problem have?
answer: 10
verify:
  def solve(n, r=0, col=[]):
      if r == n:
          return 1
      return sum(solve(n, r + 1, col + [c]) for c in range(n)
                 if all(col[i] != c and abs(col[i] - c) != r - i for i in range(r)))
  print(solve(5))
explain: Backtracking over one queen per row finds 10 placements for a 5 × 5 board.
```

```quiz
q: How many subsets of {1, 2, 3, 4, 5} have a sum of exactly 7?
answer: 3
verify: sum(1 for m in range(32) if sum(v for i, v in enumerate([1, 2, 3, 4, 5]) if m >> i & 1) == 7)
explain: {2, 5}, {3, 4} and {1, 2, 4}.
```

```quiz
q: Backtracking explores the state-space tree in which order?
- Breadth-first
* Depth-first
- Best-first by cost
- Random
explain: It follows one branch down until it finds a solution or a dead end, then backs up: a depth-first search with pruning.
```

```quiz
q: How many leaves does the full state-space tree for generating all permutations of 5 distinct items have?
answer: 120
verify: __import__("math").factorial(5)
explain: There are 5! = 120 permutations, one per leaf.
```
