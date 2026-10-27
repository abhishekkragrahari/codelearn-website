---
title: GATE CS Mock Test 1 (30 Questions, Free)
chapter: Mock Tests
description: A free GATE CS mock test with 30 original questions across aptitude, maths and every CS subject, in MCQ, MSQ and NAT formats with full solutions.
---
This mock test has **30 original GATE-style questions** covering General Aptitude, Engineering Mathematics and every core CS subject, in the same mix of MCQ, MSQ and NAT that GATE uses. It is about half the length of a real paper, so give yourself **90 minutes**.

> **Note:** All questions are written for GateShala. They follow the patterns GATE tests but are not copied from any GATE paper. Every numerical answer is recomputed by a program when the site is built.

How to take it: note your answers on paper first, then open each question to check. Score +1 per correct answer, and −1/3 for each wrong MCQ (as for a one-mark GATE question). Read the [marking scheme](exam-pattern-marking-scheme.html) for details.

## General Aptitude

```quiz
q: **[GA]** Choose the word that best completes the sentence: "The committee's report was so ______ that even experts struggled to follow its argument."
- lucid
* convoluted
- concise
- candid
explain: The second half says experts struggled to follow it, so the report was complicated: convoluted. Lucid and concise mean the opposite.
```

```quiz
q: **[GA]** A shopkeeper marks a price 40% above cost and then gives a 25% discount. What is the profit percentage?
answer: 5
verify: round((1.4 * 0.75 - 1) * 100, 6)
explain: Selling price = 1.4 × 0.75 = 1.05 times cost: a 5% profit.
```

```quiz
q: **[GA]** P, Q, R and S sit in a row. Q is not at either end. R is immediately to the right of P. S is at the right end. Who is at the left end?
* P
- Q
- R
- S
explain: S is at position 4, so Q is at 2 or 3. If Q were at 2, the pair P, R would need positions 3 and 4, but 4 is taken. So Q is at 3, and P, R take positions 1 and 2: the row is P, R, Q, S, with P at the left end.
```

```quiz
q: **[GA]** Pipe A fills a tank in 10 hours and pipe B empties it in 15 hours. If both are open, how many hours does the empty tank take to fill?
answer: 30
verify:
  from fractions import Fraction as F
  print(1 / (F(1, 10) - F(1, 15)))
explain: Net rate = 1/10 − 1/15 = 1/30 of the tank per hour: 30 hours.
```

```quiz
q: **[GA]** What is the next number in the series 3, 7, 15, 31, 63, …?
answer: 127
verify: 2 * 63 + 1
explain: Each term is twice the previous plus 1 (they are 2^n − 1): 2 × 63 + 1 = 127.
```

## Engineering Mathematics

```quiz
q: **[Linear algebra]** The eigenvalues of the matrix [[2, 1], [1, 2]] are:
- 2 and 2
* 1 and 3
- 0 and 4
- −1 and 3
explain: Trace 4 and determinant 3, so λ² − 4λ + 3 = 0, giving λ = 1 and 3.
```

```quiz
q: **[Linear algebra]** What is the rank of [[1, 2, 3], [2, 4, 6], [1, 1, 1]]?
answer: 2
verify:
  from fractions import Fraction as F
  m = [[F(x) for x in r] for r in [[1, 2, 3], [2, 4, 6], [1, 1, 1]]]
  rank, col = 0, 0
  while rank < 3 and col < 3:
      p = next((i for i in range(rank, 3) if m[i][col] != 0), None)
      if p is None:
          col += 1
          continue
      m[rank], m[p] = m[p], m[rank]
      for i in range(3):
          if i != rank and m[i][col] != 0:
              f = m[i][col] / m[rank][col]
              m[i] = [a - f * b for a, b in zip(m[i], m[rank])]
      rank += 1
      col += 1
  print(rank)
explain: Row 2 is twice row 1, and rows 1 and 3 are independent, so the rank is 2.
```

```quiz
q: **[Probability]** Two fair dice are rolled. What is the probability that the sum is 8? (Give 3 decimal places.)
answer: 0.139
verify: round(sum(1 for a in range(1, 7) for b in range(1, 7) if a + b == 8) / 36, 3)
explain: (2,6), (3,5), (4,4), (5,3), (6,2): 5 of 36 outcomes, 5/36 ≈ 0.139.
```

```quiz
q: **[Calculus]** What is the limit of (1 − cos x) / x² as x → 0? (Give 1 decimal place.)
answer: 0.5
verify: round((1 - __import__("math").cos(1e-4)) / 1e-8, 1)
explain: 1 − cos x ≈ x²/2 for small x, so the limit is 1/2.
```

```quiz
q: **[Discrete maths]** How many onto functions are there from a set of 4 elements to a set of 3 elements?
answer: 36
verify: sum(1 for f in __import__("itertools").product(range(3), repeat=4) if len(set(f)) == 3)
explain: By inclusion–exclusion: 3⁴ − 3 × 2⁴ + 3 × 1⁴ = 81 − 48 + 3 = 36.
```

```quiz
q: **[Discrete maths]** Which of the following are tautologies? (Select all that apply.)
* (p → q) ∨ (q → p)
* p ∨ ¬p
- p → (p ∧ q)
* (p ∧ q) → p
explain: p → (p ∧ q) is false when p is true and q is false. The other three are true for every assignment.
```

## Programming, Data Structures and Algorithms

```quiz
q: **[C]** What does this program print?
code: c
  #include <stdio.h>
  int f(int n) { return n <= 1 ? 1 : n * f(n - 2); }
  int main(void) { printf("%d\n", f(7)); return 0; }
answer: 105
explain: f(7) = 7 × 5 × 3 × f(1) = 105.
```

```quiz
q: **[DS]** The keys 50, 30, 70, 20, 40, 60, 80, 35 are inserted in that order into an empty BST. What is the height of the tree? (A single node has height 0.)
answer: 3
verify:
  def ins(t, k):
      if t is None: return [k, None, None]
      if k < t[0]: t[1] = ins(t[1], k)
      else: t[2] = ins(t[2], k)
      return t
  def h(t): return -1 if t is None else 1 + max(h(t[1]), h(t[2]))
  t = None
  for k in [50, 30, 70, 20, 40, 60, 80, 35]: t = ins(t, k)
  print(h(t))
explain: The longest path is 50 → 30 → 40 → 35, which has 3 edges.
```

```quiz
q: **[DS]** A max-heap is stored in an array (index 1 is the root). Which index holds the parent of the element at index 13?
answer: 6
verify: 13 // 2
explain: The parent of index i is ⌊i/2⌋ = 6.
```

```quiz
q: **[Algorithms]** What is the time complexity of T(n) = 2T(n/2) + n log n?
- Θ(n log n)
* Θ(n log² n)
- Θ(n²)
- Θ(n)
explain: Each of the log n levels does about n log n work in total (shrinking slowly), which sums to Θ(n log² n).
```

```quiz
q: **[Algorithms]** What is the minimum number of comparisons needed to find both the maximum and the minimum of 100 numbers?
answer: 148
verify: 3 * 100 // 2 - 2
explain: Compare in pairs: ⌈3n/2⌉ − 2 = 150 − 2 = 148 for n = 100.
```

```quiz
q: **[Algorithms]** Which of the following are true about Dijkstra's algorithm? (Select all that apply.)
* With a binary heap it runs in O((V + E) log V)
* It may give wrong answers when some edge weights are negative
- It finds a minimum spanning tree
- It works only on undirected graphs
explain: Dijkstra finds shortest paths (not an MST) on directed or undirected graphs with non-negative weights.
```

## Digital Logic and Computer Organization

```quiz
q: **[Digital logic]** What is the decimal value of the 8-bit 2's complement number 11101100?
answer: -20
verify: int("11101100", 2) - 256
explain: 236 − 256 = −20.
```

```quiz
q: **[Digital logic]** How many minterms does the function F(A, B, C) = A + BC have?
answer: 5
verify: sum(1 for a in range(2) for b in range(2) for c in range(2) if a or (b and c))
explain: A = 1 gives 4 minterms; A = 0 with B = C = 1 gives one more: 5.
```

```quiz
q: **[COA]** A cache has 64 lines of 32 bytes each and is 4-way set associative. With 32-bit addresses, how many tag bits are there?
answer: 23
verify: 32 - 4 - 5
explain: Sets = 64/4 = 16 (4 index bits), offset = 5 bits, so tag = 32 − 4 − 5 = 23.
```

```quiz
q: **[COA]** A non-pipelined processor takes 10 ns per instruction. A 5-stage pipeline has a 2.5 ns clock. What is the speedup for a very long program with no stalls?
answer: 4
verify: 10 / 2.5
explain: In the steady state one instruction finishes per cycle: 10 / 2.5 = 4.
```

## Operating Systems

```quiz
q: **[OS]** Processes P1, P2, P3 arrive at time 0 with bursts 6, 3, 1 ms. What is the average waiting time under SJF? (Give 2 decimal places.)
answer: 1.67
verify: round((0 + 1 + 4) / 3, 2)
explain: Order P3, P2, P1: waits 0, 1 and 4. Average 5/3 ≈ 1.67 ms.
```

```quiz
q: **[OS]** With 3 frames and FIFO replacement, how many page faults occur for the reference string 1 2 3 4 1 2 5 1 2 3 4 5?
answer: 9
verify:
  from collections import deque
  q, faults = deque(), 0
  for p in [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]:
      if p not in q:
          faults += 1
          if len(q) == 3: q.popleft()
          q.append(p)
  print(faults)
explain: Simulating FIFO gives 9 faults. (With 4 frames it gives 10: Belady's anomaly.)
```

```quiz
q: **[OS]** A system has 32-bit virtual addresses, 4 KB pages and 4-byte page table entries. What is the size of a single-level page table in MB?
answer: 4
verify: 2 ** 32 // 2 ** 12 * 4 // 2 ** 20
explain: 2^20 pages × 4 bytes = 4 MB.
```

## Databases

```quiz
q: **[DBMS]** R(A, B, C, D) has FDs A → B, B → C, C → D. Which is the highest normal form R satisfies?
* 2NF
- 3NF
- BCNF
- 1NF only
explain: The key is A. No partial dependencies (single-attribute key), so 2NF holds; B → C is transitive, so it is not 3NF.
```

```quiz
q: **[DBMS]** Relation R has 10 tuples and S has 20. What is the maximum number of tuples in R ⋈ S (natural join) when they share no attributes?
answer: 200
verify: 10 * 20
explain: With no common attributes, the natural join is the Cartesian product: 10 × 20 = 200.
```

## Computer Networks and TOC / Compilers

```quiz
q: **[CN]** How many /26 subnets can be made from the block 192.168.10.0/24?
answer: 4
verify: 2 ** (26 - 24)
explain: Borrowing 2 bits gives 2² = 4 subnets of 64 addresses each.
```

```quiz
q: **[CN]** A sender uses Go-Back-N with 3-bit sequence numbers. What is the maximum sender window size?
answer: 7
verify: 2 ** 3 - 1
explain: For Go-Back-N, W ≤ 2^k − 1 = 7.
```

```quiz
q: **[TOC]** What is the minimum number of states in a DFA over {0, 1} that accepts binary numbers divisible by 3 (read most significant bit first)?
answer: 3
verify: len({n % 3 for n in range(100)})
explain: The DFA tracks the remainder mod 3 (0, 1 or 2); all three states are distinguishable.
```

```quiz
q: **[TOC]** Which of these languages are context-free but not regular? (Select all that apply.)
* { aⁿbⁿ : n ≥ 0 }
* Strings of balanced parentheses
- { aⁿbⁿcⁿ : n ≥ 0 }
- Strings over {a, b} with an even number of a's
explain: aⁿbⁿ and balanced parentheses need a stack. aⁿbⁿcⁿ is not context-free; an even number of a's is regular.
```

## Your score

| Score (out of 30) | What it means |
| --- | --- |
| 24 and above | Strong: focus on speed with full-length papers |
| 15 – 23 | Good base: revise the subjects where you lost marks |
| Below 15 | Go back to the lessons of your weakest subjects, then retake this test after two weeks |

Next steps: revise with the [formula sheet](formula-sheet.html) and solve each subject's practice set.
