---
title: Dynamic Programming
chapter: Algorithm Design Techniques
description: Solve problems with overlapping subproblems by remembering answers, with Fibonacci, coin change, LCS and knapsack.
---
**Dynamic programming (DP)** solves a problem by breaking it into smaller **subproblems**, solving each subproblem **once**, and storing the answer. It works when a problem has:

- **Optimal substructure:** the best solution is built from best solutions of subproblems.
- **Overlapping subproblems:** the same subproblems come up again and again.

There are two styles:

- **Top-down (memoization):** write the natural recursion and cache results.
- **Bottom-up (tabulation):** fill a table from the smallest subproblems upwards.

## Fibonacci: why remembering matters

The plain recursion `fib(n) = fib(n-1) + fib(n-2)` recomputes the same values exponentially often. Remembering them makes it linear.

```tree
caption: The plain recursion for fib(5) computes fib(3) twice and fib(2) three times
fib(5)
  fib(4)
    fib(3)
      fib(2)
      fib(1)
    fib(2)
  fib(3)
    fib(2)
    fib(1)
```

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    static int calls = 0;
    static long naive(int n) { calls++; return n < 2 ? n : naive(n - 1) + naive(n - 2); }

    static Map<Integer, Long> memo = new HashMap<>();
    static long memoFib(int n) {
        if (n < 2) return n;
        if (memo.containsKey(n)) return memo.get(n);
        long v = memoFib(n - 1) + memoFib(n - 2);
        memo.put(n, v);
        return v;
    }

    static long tableFib(int n) {
        long prev = 0, cur = 1;              // only the last two values are needed
        for (int i = 2; i <= n; i++) { long next = prev + cur; prev = cur; cur = next; }
        return n == 0 ? 0 : cur;
    }

    public static void main(String[] args) {
        System.out.println("naive fib(25) = " + naive(25) + " using " + calls + " calls");
        System.out.println("memo  fib(90) = " + memoFib(90));
        System.out.println("table fib(90) = " + tableFib(90));
    }
}
```
```output
naive fib(25) = 75025 using 242785 calls
memo  fib(90) = 2880067194370816120
table fib(90) = 2880067194370816120
```
```python
from functools import lru_cache

calls = 0
def naive(n):
    global calls
    calls += 1
    return n if n < 2 else naive(n - 1) + naive(n - 2)

@lru_cache(maxsize=None)
def memo_fib(n):
    return n if n < 2 else memo_fib(n - 1) + memo_fib(n - 2)

def table_fib(n):
    prev, cur = 0, 1                     # only the last two values are needed
    for _ in range(2, n + 1):
        prev, cur = cur, prev + cur
    return 0 if n == 0 else cur

print(f"naive fib(25) = {naive(25)} using {calls} calls")
print("memo  fib(90) =", memo_fib(90))
print("table fib(90) =", table_fib(90))
```
```output
naive fib(25) = 75025 using 242785 calls
memo  fib(90) = 2880067194370816120
table fib(90) = 2880067194370816120
```
```c
#include <stdio.h>

int calls = 0;
long long naive(int n) { calls++; return n < 2 ? n : naive(n - 1) + naive(n - 2); }

long long memo[100];                     /* 0 means "not computed yet" */
long long memo_fib(int n) {
    if (n < 2) return n;
    if (memo[n]) return memo[n];
    return memo[n] = memo_fib(n - 1) + memo_fib(n - 2);
}

long long table_fib(int n) {
    long long prev = 0, cur = 1;         /* only the last two values are needed */
    for (int i = 2; i <= n; i++) { long long next = prev + cur; prev = cur; cur = next; }
    return n == 0 ? 0 : cur;
}

int main(void) {
    long long r = naive(25);
    printf("naive fib(25) = %lld using %d calls\n", r, calls);
    printf("memo  fib(90) = %lld\n", memo_fib(90));
    printf("table fib(90) = %lld\n", table_fib(90));
    return 0;
}
```
```output
naive fib(25) = 75025 using 242785 calls
memo  fib(90) = 2880067194370816120
table fib(90) = 2880067194370816120
```

## Coin change: fewest coins

Given coin values and an amount, what is the **fewest** number of coins that adds up to the amount? The greedy idea (always take the biggest coin) fails for coins {1, 3, 4} and amount 6: greedy takes 4 + 1 + 1 (3 coins), but 3 + 3 uses only 2.

DP recurrence: **best[a] = 1 + min over coins c ≤ a of best[a − c]**, with best[0] = 0.

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] coins = {1, 3, 4};
        int amount = 6;
        int[] best = new int[amount + 1];
        Arrays.fill(best, Integer.MAX_VALUE);
        best[0] = 0;
        for (int a = 1; a <= amount; a++)
            for (int c : coins)
                if (c <= a && best[a - c] != Integer.MAX_VALUE)
                    best[a] = Math.min(best[a], best[a - c] + 1);
        System.out.println("table: " + Arrays.toString(best));
        System.out.println("fewest coins for " + amount + ": " + best[amount]);
    }
}
```
```output
table: [0, 1, 2, 1, 1, 2, 2]
fewest coins for 6: 2
```
```python
coins, amount = [1, 3, 4], 6
INF = float("inf")
best = [0] + [INF] * amount
for a in range(1, amount + 1):
    for c in coins:
        if c <= a:
            best[a] = min(best[a], best[a - c] + 1)
print("table:", best)
print(f"fewest coins for {amount}: {best[amount]}")
```
```output
table: [0, 1, 2, 1, 1, 2, 2]
fewest coins for 6: 2
```
```c
#include <stdio.h>
#include <limits.h>

int main(void) {
    int coins[] = {1, 3, 4}, amount = 6;
    int best[7];
    best[0] = 0;
    for (int a = 1; a <= amount; a++) {
        best[a] = INT_MAX;
        for (int i = 0; i < 3; i++)
            if (coins[i] <= a && best[a - coins[i]] != INT_MAX && best[a - coins[i]] + 1 < best[a])
                best[a] = best[a - coins[i]] + 1;
    }
    printf("table: [");
    for (int a = 0; a <= amount; a++) printf(a ? ", %d" : "%d", best[a]);
    printf("]\nfewest coins for %d: %d\n", amount, best[amount]);
    return 0;
}
```
```output
table: [0, 1, 2, 1, 1, 2, 2]
fewest coins for 6: 2
```

## Longest common subsequence (LCS)

A **subsequence** keeps the order of characters but may skip some ("ACE" is a subsequence of "ABCDE"). The LCS of two strings is the longest subsequence of both. Let L[i][j] be the LCS length of the first i characters of X and the first j of Y:

- if X[i] = Y[j]: L[i][j] = L[i−1][j−1] + 1
- otherwise: L[i][j] = max(L[i−1][j], L[i][j−1])

The table has (m + 1) × (n + 1) cells, so LCS takes **Θ(m·n)** time.

```java
public class Main {
    public static void main(String[] args) {
        String x = "ABCBDAB", y = "BDCABA";
        int m = x.length(), n = y.length();
        int[][] L = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                L[i][j] = x.charAt(i - 1) == y.charAt(j - 1) ? L[i - 1][j - 1] + 1 : Math.max(L[i - 1][j], L[i][j - 1]);

        StringBuilder lcs = new StringBuilder();          // walk back through the table
        for (int i = m, j = n; i > 0 && j > 0; ) {
            if (x.charAt(i - 1) == y.charAt(j - 1)) { lcs.append(x.charAt(i - 1)); i--; j--; }
            else if (L[i - 1][j] >= L[i][j - 1]) i--;
            else j--;
        }
        System.out.println("LCS length = " + L[m][n] + ", one LCS = " + lcs.reverse());
    }
}
```
```output
LCS length = 4, one LCS = BCBA
```
```python
x, y = "ABCBDAB", "BDCABA"
m, n = len(x), len(y)
L = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(1, m + 1):
    for j in range(1, n + 1):
        if x[i - 1] == y[j - 1]:
            L[i][j] = L[i - 1][j - 1] + 1
        else:
            L[i][j] = max(L[i - 1][j], L[i][j - 1])

lcs, i, j = [], m, n                          # walk back through the table
while i > 0 and j > 0:
    if x[i - 1] == y[j - 1]:
        lcs.append(x[i - 1]); i -= 1; j -= 1
    elif L[i - 1][j] >= L[i][j - 1]:
        i -= 1
    else:
        j -= 1
print(f"LCS length = {L[m][n]}, one LCS = {''.join(reversed(lcs))}")
```
```output
LCS length = 4, one LCS = BCBA
```
```c
#include <stdio.h>
#include <string.h>

int main(void) {
    const char *x = "ABCBDAB", *y = "BDCABA";
    int m = strlen(x), n = strlen(y);
    int L[16][16] = {{0}};
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (x[i - 1] == y[j - 1]) L[i][j] = L[i - 1][j - 1] + 1;
            else L[i][j] = L[i - 1][j] > L[i][j - 1] ? L[i - 1][j] : L[i][j - 1];

    char lcs[16];
    int k = L[m][n];
    lcs[k] = '\0';
    for (int i = m, j = n; i > 0 && j > 0; ) {      /* walk back through the table */
        if (x[i - 1] == y[j - 1]) { lcs[--k] = x[i - 1]; i--; j--; }
        else if (L[i - 1][j] >= L[i][j - 1]) i--;
        else j--;
    }
    printf("LCS length = %d, one LCS = %s\n", L[m][n], lcs);
    return 0;
}
```
```output
LCS length = 4, one LCS = BCBA
```

## 0/1 knapsack

Each item has a weight and a value; choose a subset with total weight ≤ W and maximum value (each item at most once). With K[i][w] = best value using the first i items and capacity w:

K[i][w] = max(K[i−1][w], value[i] + K[i−1][w − weight[i]]) when weight[i] ≤ w.

```java
public class Main {
    public static void main(String[] args) {
        int[] wt = {1, 3, 4, 5}, val = {1, 4, 5, 7};
        int W = 7;
        int[] K = new int[W + 1];                     // one row is enough if w goes downwards
        for (int i = 0; i < wt.length; i++)
            for (int w = W; w >= wt[i]; w--)
                K[w] = Math.max(K[w], val[i] + K[w - wt[i]]);
        System.out.println("best value with capacity " + W + " = " + K[W]);
    }
}
```
```output
best value with capacity 7 = 9
```
```python
wt, val, W = [1, 3, 4, 5], [1, 4, 5, 7], 7
K = [0] * (W + 1)                    # one row is enough if w goes downwards
for i in range(len(wt)):
    for w in range(W, wt[i] - 1, -1):
        K[w] = max(K[w], val[i] + K[w - wt[i]])
print(f"best value with capacity {W} = {K[W]}")
```
```output
best value with capacity 7 = 9
```
```c
#include <stdio.h>

int main(void) {
    int wt[] = {1, 3, 4, 5}, val[] = {1, 4, 5, 7};
    int W = 7;
    int K[8] = {0};                        /* one row is enough if w goes downwards */
    for (int i = 0; i < 4; i++)
        for (int w = W; w >= wt[i]; w--)
            if (val[i] + K[w - wt[i]] > K[w]) K[w] = val[i] + K[w - wt[i]];
    printf("best value with capacity %d = %d\n", W, K[W]);
    return 0;
}
```
```output
best value with capacity 7 = 9
```

The best choice is the items of weight 3 and 4 (value 4 + 5 = 9). The DP takes **Θ(n·W)** time. That is "pseudo-polynomial": polynomial in the *value* of W, not in the number of bits needed to write W.

## GATE-style practice questions

```quiz
q: What is the length of the longest common subsequence of `PRESIDENT` and `PROVIDENCE`?
answer: 6
verify:
  x, y = "PRESIDENT", "PROVIDENCE"
  L = [[0] * (len(y) + 1) for _ in range(len(x) + 1)]
  for i in range(1, len(x) + 1):
      for j in range(1, len(y) + 1):
          L[i][j] = L[i - 1][j - 1] + 1 if x[i - 1] == y[j - 1] else max(L[i - 1][j], L[i][j - 1])
  print(L[-1][-1])
explain: One longest common subsequence is P R I D E N (P R from the start, then I, D, E, N in order in both strings), which has length 6. The DP table confirms that no longer one exists.
```

```quiz
q: Using coins of value 1, 5 and 6 (unlimited supply), what is the **minimum** number of coins needed to make 10?
answer: 2
verify:
  coins, amount = [1, 5, 6], 10
  best = [0] + [float('inf')] * amount
  for a in range(1, amount + 1):
      best[a] = min(best[a - c] + 1 for c in coins if c <= a)
  print(best[amount])
explain: 5 + 5 = 10 uses 2 coins. Greedy would take 6 first and then needs 1 + 1 + 1 + 1, which is 5 coins, so this is a case where DP is required.
```

```quiz
q: The naive recursive Fibonacci function makes `fib(n-1)` and `fib(n-2)` calls with base cases n = 0 and n = 1. How many **calls** in total does `fib(6)` make, counting the first one?
answer: 25
verify: (lambda f: f(f, 6))(lambda f, n: 1 if n < 2 else 1 + f(f, n - 1) + f(f, n - 2))
explain: Let C(n) be the number of calls: C(0) = C(1) = 1 and C(n) = 1 + C(n−1) + C(n−2). This gives 1, 1, 3, 5, 9, 15, 25 for n = 0 to 6.
```

```quiz
q: Which problems are typically solved with **dynamic programming**? (Select all that apply.)
* 0/1 knapsack
* Longest common subsequence
- Finding the maximum of an unsorted array
* Matrix chain multiplication order
explain: Knapsack, LCS and matrix chain ordering all have optimal substructure with overlapping subproblems. Finding a maximum needs just one linear scan; there are no overlapping subproblems to reuse.
```
