---
title: LIS, Edit Distance and Matrix Chain DP
chapter: Algorithm Design Techniques
description: Classic DP problems for GATE and interviews: longest increasing subsequence, edit distance, matrix chain multiplication, subset sum and rod cutting, with recurrences, tables and code.
---
The [first DP lesson](dynamic-programming.html) introduced memoisation, coin change, LCS and 0/1 knapsack. This lesson adds five more classic problems. For each, the work is the same: **define the subproblem, write the recurrence, fill the table in the right order**.

```flowchart
caption: Designing a DP solution
start: Problem
step: Define dp[state] in words
step: Write the recurrence from smaller states
step: Set the base cases
step: Choose an order so smaller states come first
io: Read the answer from the table
end: Done
```

## Longest increasing subsequence (LIS)

**best[i]** = length of the longest strictly increasing subsequence **ending at a[i]**:

best[i] = 1 + max(best[j]) over j < i with a[j] < a[i] (or 1 if none). Answer = max best[i].

O(n²). A cleverer method keeps the smallest tail of each length and uses binary search: **O(n log n)**.

## Edit distance (Levenshtein)

Fewest insertions, deletions and replacements to turn s into t. **d[i][j]** = edit distance between the first i characters of s and the first j of t:

- d[i][0] = i, d[0][j] = j
- d[i][j] = min(d[i−1][j] + 1 (delete), d[i][j−1] + 1 (insert), d[i−1][j−1] + [s_i ≠ t_j] (replace or match))

O(mn) time. Spell checkers and DNA alignment use it. kitten → sitting needs 3 edits (k→s, e→i, insert g).

## Matrix chain multiplication

Multiplying a p × q matrix by a q × r matrix takes **pqr** scalar multiplications. For a chain A₁A₂…Aₙ (Aᵢ is p[i−1] × p[i]), the order of multiplication changes the cost a lot.

**m[i][j]** = least cost to multiply Aᵢ…Aⱼ:

m[i][j] = min over i ≤ k < j of ( m[i][k] + m[k+1][j] + p[i−1]·p[k]·p[j] ), with m[i][i] = 0.

Fill by increasing chain length: **O(n³)** time, O(n²) space. For dimensions 10 × 30, 30 × 5, 5 × 60: (A₁A₂)A₃ costs 1500 + 3000 = **4500**, but A₁(A₂A₃) costs 9000 + 18000 = 27000.

## Subset sum

Is there a subset with sum exactly S? **can[s]** = some subset of the items seen so far sums to s. For each item v, update s from S **down to** v: can[s] |= can[s − v] (going down uses each item at most once). **O(nS)** — pseudo-polynomial, since S can be exponential in the input size (the problem is NP-complete).

## Rod cutting

A rod of length n and price[i] for a piece of length i: **best[n] = max over i of (price[i] + best[n − i])**. This is an **unbounded** knapsack: a length can be used many times.

## The code

```java
public class Main {
    static int lis(int[] a) {                      // O(n^2): best[i] = LIS ending at i
        int[] best = new int[a.length];
        int ans = 0;
        for (int i = 0; i < a.length; i++) {
            best[i] = 1;
            for (int j = 0; j < i; j++)
                if (a[j] < a[i]) best[i] = Math.max(best[i], best[j] + 1);
            ans = Math.max(ans, best[i]);
        }
        return ans;
    }

    static int editDistance(String s, String t) {
        int[][] d = new int[s.length() + 1][t.length() + 1];
        for (int i = 0; i <= s.length(); i++) d[i][0] = i;     // delete everything
        for (int j = 0; j <= t.length(); j++) d[0][j] = j;     // insert everything
        for (int i = 1; i <= s.length(); i++)
            for (int j = 1; j <= t.length(); j++) {
                int replace = d[i - 1][j - 1] + (s.charAt(i - 1) == t.charAt(j - 1) ? 0 : 1);
                d[i][j] = Math.min(replace, Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1));
            }
        return d[s.length()][t.length()];
    }

    static int matrixChain(int[] p) {             // matrix i is p[i-1] x p[i]
        int n = p.length - 1;
        int[][] m = new int[n + 1][n + 1];
        for (int len = 2; len <= n; len++)
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                m[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++)         // split between k and k+1
                    m[i][j] = Math.min(m[i][j], m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]);
            }
        return m[1][n];
    }

    static boolean subsetSum(int[] a, int target) {
        boolean[] can = new boolean[target + 1];
        can[0] = true;
        for (int v : a)
            for (int s = target; s >= v; s--)       // go downwards: each item used once
                can[s] = can[s] || can[s - v];
        return can[target];
    }

    static int rodCutting(int[] price, int n) {    // price[i] = price of a piece of length i
        int[] best = new int[n + 1];
        for (int len = 1; len <= n; len++)
            for (int cut = 1; cut <= len; cut++)
                best[len] = Math.max(best[len], price[cut] + best[len - cut]);
        return best[n];
    }

    public static void main(String[] args) {
        System.out.println("LIS of [10, 9, 2, 5, 3, 7, 101, 18] = " + lis(new int[]{10, 9, 2, 5, 3, 7, 101, 18}));
        System.out.println("edit distance(kitten, sitting) = " + editDistance("kitten", "sitting"));
        System.out.println("matrix chain [10, 30, 5, 60] = " + matrixChain(new int[]{10, 30, 5, 60}));
        System.out.println("subset of [3, 34, 4, 12, 5, 2] with sum 9? " + subsetSum(new int[]{3, 34, 4, 12, 5, 2}, 9));
        System.out.println("rod of length 8 = " + rodCutting(new int[]{0, 1, 5, 8, 9, 10, 17, 17, 20}, 8));
    }
}
```
```output
LIS of [10, 9, 2, 5, 3, 7, 101, 18] = 4
edit distance(kitten, sitting) = 3
matrix chain [10, 30, 5, 60] = 4500
subset of [3, 34, 4, 12, 5, 2] with sum 9? true
rod of length 8 = 22
```
```python
def lis(a):                                    # O(n^2): best[i] = LIS ending at i
    best = [1] * len(a)
    for i in range(len(a)):
        for j in range(i):
            if a[j] < a[i]:
                best[i] = max(best[i], best[j] + 1)
    return max(best)

def edit_distance(s, t):
    d = [[0] * (len(t) + 1) for _ in range(len(s) + 1)]
    for i in range(len(s) + 1):
        d[i][0] = i                            # delete everything
    for j in range(len(t) + 1):
        d[0][j] = j                            # insert everything
    for i in range(1, len(s) + 1):
        for j in range(1, len(t) + 1):
            replace = d[i - 1][j - 1] + (s[i - 1] != t[j - 1])
            d[i][j] = min(replace, d[i - 1][j] + 1, d[i][j - 1] + 1)
    return d[len(s)][len(t)]

def matrix_chain(p):                           # matrix i is p[i-1] x p[i]
    n = len(p) - 1
    m = [[0] * (n + 1) for _ in range(n + 1)]
    for length in range(2, n + 1):
        for i in range(1, n - length + 2):
            j = i + length - 1
            m[i][j] = min(m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]
                          for k in range(i, j))   # split between k and k+1
    return m[1][n]

def subset_sum(a, target):
    can = [True] + [False] * target
    for v in a:
        for s in range(target, v - 1, -1):     # go downwards: each item used once
            can[s] = can[s] or can[s - v]
    return can[target]

def rod_cutting(price, n):                     # price[i] = price of a piece of length i
    best = [0] * (n + 1)
    for length in range(1, n + 1):
        best[length] = max(price[cut] + best[length - cut] for cut in range(1, length + 1))
    return best[n]

print("LIS of [10, 9, 2, 5, 3, 7, 101, 18] =", lis([10, 9, 2, 5, 3, 7, 101, 18]))
print("edit distance(kitten, sitting) =", edit_distance("kitten", "sitting"))
print("matrix chain [10, 30, 5, 60] =", matrix_chain([10, 30, 5, 60]))
print("subset of [3, 34, 4, 12, 5, 2] with sum 9?", str(subset_sum([3, 34, 4, 12, 5, 2], 9)).lower())
print("rod of length 8 =", rod_cutting([0, 1, 5, 8, 9, 10, 17, 17, 20], 8))
```
```output
LIS of [10, 9, 2, 5, 3, 7, 101, 18] = 4
edit distance(kitten, sitting) = 3
matrix chain [10, 30, 5, 60] = 4500
subset of [3, 34, 4, 12, 5, 2] with sum 9? true
rod of length 8 = 22
```
```c
#include <stdio.h>
#include <string.h>
#include <limits.h>

int max(int a, int b) { return a > b ? a : b; }
int min(int a, int b) { return a < b ? a : b; }

int lis(int *a, int n) {                       /* O(n^2): best[i] = LIS ending at i */
    int best[32], ans = 0;
    for (int i = 0; i < n; i++) {
        best[i] = 1;
        for (int j = 0; j < i; j++)
            if (a[j] < a[i]) best[i] = max(best[i], best[j] + 1);
        ans = max(ans, best[i]);
    }
    return ans;
}

int edit_distance(const char *s, const char *t) {
    int m = strlen(s), n = strlen(t), d[32][32];
    for (int i = 0; i <= m; i++) d[i][0] = i;  /* delete everything */
    for (int j = 0; j <= n; j++) d[0][j] = j;  /* insert everything */
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++) {
            int replace = d[i - 1][j - 1] + (s[i - 1] != t[j - 1]);
            d[i][j] = min(replace, min(d[i - 1][j] + 1, d[i][j - 1] + 1));
        }
    return d[m][n];
}

int matrix_chain(int *p, int n) {              /* matrix i is p[i-1] x p[i]; n matrices */
    int m[16][16] = {{0}};
    for (int len = 2; len <= n; len++)
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            m[i][j] = INT_MAX;
            for (int k = i; k < j; k++)        /* split between k and k+1 */
                m[i][j] = min(m[i][j], m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]);
        }
    return m[1][n];
}

int subset_sum(int *a, int n, int target) {
    int can[64] = {1};
    for (int i = 0; i < n; i++)
        for (int s = target; s >= a[i]; s--)   /* go downwards: each item used once */
            can[s] = can[s] || can[s - a[i]];
    return can[target];
}

int rod_cutting(int *price, int n) {           /* price[i] = price of a piece of length i */
    int best[32] = {0};
    for (int len = 1; len <= n; len++)
        for (int cut = 1; cut <= len; cut++)
            best[len] = max(best[len], price[cut] + best[len - cut]);
    return best[n];
}

int main(void) {
    int a[] = {10, 9, 2, 5, 3, 7, 101, 18};
    int p[] = {10, 30, 5, 60};
    int items[] = {3, 34, 4, 12, 5, 2};
    int price[] = {0, 1, 5, 8, 9, 10, 17, 17, 20};
    printf("LIS of [10, 9, 2, 5, 3, 7, 101, 18] = %d\n", lis(a, 8));
    printf("edit distance(kitten, sitting) = %d\n", edit_distance("kitten", "sitting"));
    printf("matrix chain [10, 30, 5, 60] = %d\n", matrix_chain(p, 3));
    printf("subset of [3, 34, 4, 12, 5, 2] with sum 9? %s\n", subset_sum(items, 6, 9) ? "true" : "false");
    printf("rod of length 8 = %d\n", rod_cutting(price, 8));
    return 0;
}
```
```output
LIS of [10, 9, 2, 5, 3, 7, 101, 18] = 4
edit distance(kitten, sitting) = 3
matrix chain [10, 30, 5, 60] = 4500
subset of [3, 34, 4, 12, 5, 2] with sum 9? true
rod of length 8 = 22
```

## GATE-style practice questions

```quiz
q: Matrices A (10 × 20), B (20 × 5) and C (5 × 30) are multiplied. What is the minimum number of scalar multiplications?
answer: 2500
verify: min(10 * 20 * 5 + 10 * 5 * 30, 20 * 5 * 30 + 10 * 20 * 30)
explain: (AB)C = 1000 + 1500 = 2500, while A(BC) = 3000 + 6000 = 9000.
```

```quiz
q: What is the edit distance between "sunday" and "saturday"?
answer: 3
verify:
  s, t = "sunday", "saturday"
  d = [[i + j if i * j == 0 else 0 for j in range(len(t) + 1)] for i in range(len(s) + 1)]
  for i in range(1, len(s) + 1):
      for j in range(1, len(t) + 1):
          d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (s[i - 1] != t[j - 1]))
  print(d[-1][-1])
explain: Insert "a" and "t" after "s", and replace "n" with "r": 3 edits.
```

```quiz
q: What is the length of the longest strictly increasing subsequence of [3, 10, 2, 1, 20, 4, 6, 7]?
answer: 4
verify:
  a = [3, 10, 2, 1, 20, 4, 6, 7]
  b = [1] * len(a)
  for i in range(len(a)):
      for j in range(i):
          if a[j] < a[i]:
              b[i] = max(b[i], b[j] + 1)
  print(max(b))
explain: For example 3, 4, 6, 7 (or 2, 4, 6, 7).
```

```quiz
q: How many subproblems m[i][j] with i < j does matrix chain multiplication fill for a chain of 6 matrices?
answer: 15
verify: 6 * 5 // 2
explain: One entry for every pair i < j: C(6, 2) = 15 (plus 6 zero entries on the diagonal).
```

```quiz
q: The subset-sum DP runs in O(nS) time. Why is subset sum still NP-complete?
* S can be exponential in the number of bits needed to write the input
- The DP is wrong for negative numbers only
- The DP needs O(2ⁿ) memory
- Subset sum is not NP-complete
explain: O(nS) is pseudo-polynomial: polynomial in the value S, not in its length log S.
```
