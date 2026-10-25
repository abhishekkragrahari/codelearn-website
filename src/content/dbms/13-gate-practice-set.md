---
title: DBMS GATE Practice Set
chapter: GATE Practice
description: Mixed GATE-style questions on ER mapping, keys, relational algebra, SQL, functional dependencies, normal forms, transactions and indexing.
---
These questions mix every lesson of the Databases track in the three GATE formats. Work each one out on paper first: write the closures, draw the precedence graph, or trace the query row by row. Every numerical answer is recomputed by a program when the site is built, and every SQL question is run on a real SQLite database.

## Design and keys

```quiz
q: **[ER model]** E1 and E2 are in a 1:N relationship, E2 and E3 are in an M:N relationship, and E3 has one multivalued attribute. All entity sets are strong and all participations are partial. What is the minimum number of tables?
answer: 5
verify: 3 + 1 + 1
explain: E1, E2 and E3 need a table each. The 1:N relationship becomes a foreign key in E2. The M:N relationship needs its own table, and so does the multivalued attribute. 3 + 1 + 1 = 5.
```

```quiz
q: **[Superkeys]** R(A, B, C, D, E, F) has exactly two candidate keys, {A, B} and {C, D}. How many superkeys does R have?
answer: 28
verify:
  from itertools import combinations
  keys = [set("AB"), set("CD")]
  print(sum(1 for r in range(1, 7) for s in combinations("ABCDEF", r) if any(k <= set(s) for k in keys)))
explain: Supersets of {A, B}: 2⁴ = 16. Supersets of {C, D}: 2⁴ = 16. Supersets of both, {A, B, C, D}: 2² = 4. Total 16 + 16 − 4 = 28.
```

```quiz
q: **[Candidate keys]** R(A, B, C, D, E, F, G, H) has F = { AB → C, BC → D, D → E, E → AB, F → GH }. How many candidate keys does R have?
answer: 4
verify:
  from itertools import combinations
  F = [("AB", "C"), ("BC", "D"), ("D", "E"), ("E", "AB"), ("F", "GH")]
  def clo(x):
      r = set(x)
      while True:
          n = r | {c for l, rhs in F if set(l) <= r for c in rhs}
          if n == r: return r
          r = n
  keys = []
  for k in range(1, 9):
      for c in combinations("ABCDEFGH", k):
          if clo(c) == set("ABCDEFGH") and not any(set(q) <= set(c) for q in keys):
              keys.append(c)
  print(len(keys))
explain: F appears on no right side, so it is in every key, and F → GH covers G and H. The rest must determine A to E: D → E → AB and then AB → C, so D works; E → AB → C → (BC → D), so E works; AB → C → D works; BC → D → E → A works. Keys: DF, EF, ABF, BCF.
```

```quiz
q: **[Normal forms]** R(A, B, C, D, E) has F = { AB → C, C → D, D → B }. What is the highest normal form of R?
- 1NF
- 2NF
* 3NF
- BCNF
explain: E is on no right side and the keys are ABE, ACE and ADE, so A, B, C, D and E are all prime. Every FD has a prime right side, so R is in 3NF. None of AB, C, D is a superkey (none contains E), so R is not in BCNF.
```

```quiz
q: **[Normal forms]** R(A, B, C, D, E, F) has F = { AB → C, C → D, D → E, E → F }. What is the highest normal form of R?
- 1NF
* 2NF
- 3NF
- BCNF
explain: The only key is AB. Nothing depends on A or B alone, so R is in 2NF. C → D has a non-superkey left side and a non-prime right side (a transitive dependency), so R is not in 3NF.
```

```quiz
q: **[Minimal cover]** How many FDs are in a minimal cover of F = { AB → C, A → D, D → B, C → E, AD → E }?
answer: 4
verify:
  F = [("AB", "C"), ("A", "D"), ("D", "B"), ("C", "E"), ("AD", "E")]
  def clo(x, G):
      r = set(x)
      while True:
          n = r | {c for l, rhs in G if set(l) <= r for c in rhs}
          if n == r: return r
          r = n
  G = []
  for l, r in F:
      for a in l:
          if len(l) > 1 and r in clo(l.replace(a, ""), F):
              l = l.replace(a, "")
      if (l, r) not in G:
          G.append((l, r))
  i = 0
  while i < len(G):
      rest = G[:i] + G[i + 1:]
      if G[i][1] in clo(G[i][0], rest): G = rest
      else: i += 1
  print(len(G))
explain: A⁺ = {A, D, B, C, E}, so in AB → C the B is extraneous (A → C), and in AD → E the D is extraneous (A → E). Then A → E is redundant (A → C → E). The minimal cover is { A → C, A → D, D → B, C → E }: 4 FDs.
```

```quiz
q: **[Decomposition]** R(A, B, C, D) has F = { A → B, B → C }. Which decompositions are lossless? (Select all that apply.)
* R₁(A, B), R₂(A, C, D)
* R₁(B, C), R₂(A, B, D)
- R₁(A, B), R₂(C, D)
- R₁(A, C), R₂(B, C, D)
explain: Test the common attributes. A is a key of R₁(A, B): lossless. B is a key of R₁(B, C): lossless. No common attribute: lossy. Common attribute C determines nothing: lossy.
```

## Queries

```quiz
q: **[Relational algebra]** R and S are union-compatible, with 100 and 50 tuples. What is the **minimum** possible number of tuples in R ∪ S?
answer: 100
verify: max(100, 50)
explain: The union is smallest when every tuple of S is also in R; then R ∪ S = R, with 100 tuples. The maximum, with no common tuple, is 150.
```

```quiz
q: **[SQL]** What does the query print?
code: sql
  CREATE TABLE emp (id INTEGER, dept TEXT, salary INTEGER, bonus INTEGER);
  INSERT INTO emp VALUES (1, 'A', 100, 10), (2, 'A', 200, NULL), (3, 'B', 150, 20),
    (4, 'B', 250, 30), (5, 'B', 300, NULL), (6, 'C', 400, NULL), (7, 'C', 100, 40);
  SELECT SUM(salary) FROM emp WHERE bonus IS NULL OR bonus > 25;
answer: 1250
explain: Rows with a NULL bonus are 2, 5 and 6 (200 + 300 + 400), and rows with bonus > 25 are 4 and 7 (250 + 100). The sum is 1250.
```

```quiz
q: **[SQL]** For the same `emp` table, what does this query print?
code: sql
  CREATE TABLE emp (id INTEGER, dept TEXT, salary INTEGER, bonus INTEGER);
  INSERT INTO emp VALUES (1, 'A', 100, 10), (2, 'A', 200, NULL), (3, 'B', 150, 20),
    (4, 'B', 250, 30), (5, 'B', 300, NULL), (6, 'C', 400, NULL), (7, 'C', 100, 40);
  SELECT COUNT(*) FROM (SELECT dept FROM emp GROUP BY dept HAVING AVG(salary) > 180);
answer: 2
explain: Average salaries: A = 150, B = 700 / 3 ≈ 233.3 and C = 250. Groups B and C pass, so the count is 2.
```

```quiz
q: **[SQL NULLs]** Table t(x) holds 3, NULL, 5. Which conditions select **no** rows? (Select all that apply.)
* `x = NULL`
* `x NOT IN (3, NULL)`
- `x IS NULL`
- `x <> 3`
explain: A comparison with NULL is UNKNOWN, so `x = NULL` never holds. `x NOT IN (3, NULL)` is `x <> 3 AND x <> NULL`, which is FALSE or UNKNOWN for every row. `x IS NULL` selects the NULL row, and `x <> 3` selects 5.
```

## Transactions and indexing

```quiz
q: **[Serializability]** S = R1(A) R2(B) R3(C) W1(B) W2(C) W3(D). To which serial order is S conflict equivalent?
- T1, T2, T3
- It is not conflict serializable
* T3, T2, T1
- T2, T1, T3
explain: R2(B) before W1(B) gives T2 → T1. R3(C) before W2(C) gives T3 → T2. The graph T3 → T2 → T1 has no cycle, and its only topological order is T3, T2, T1.
```

```quiz
q: **[Recoverability]** Which schedules are **recoverable**? (Select all that apply.)
* W1(A) R2(A) C1 C2
- W1(A) R2(A) C2 C1
* W1(A) C1 R2(A) C2
* R1(A) W2(A) C2 C1
explain: A schedule is recoverable when every transaction that reads from another commits after it. In the first, T2 reads from T1 and commits after it. In the second, T2 commits before T1, its source. In the third, T2 reads committed data. In the fourth, nobody reads uncommitted data (T1 read before T2 wrote).
```

```quiz
q: **[B+ tree]** Blocks are 1024 bytes, keys 14 bytes and block pointers 6 bytes. What is the maximum number of child pointers in an internal node of a B+ tree?
answer: 51
verify: (1024 + 14) // (14 + 6)
explain: 6p + 14(p − 1) ≤ 1024 gives 20p ≤ 1038, so p = 51.
```

```quiz
q: **[Indexing]** A file of 50,000 records of 256 bytes is stored in 2048-byte blocks, unsorted on the key. A dense secondary index uses 10-byte keys and 6-byte block pointers. How many block accesses does a search through the index need (binary search on the index plus one data block)?
answer: 10
verify:
  from math import ceil, log2
  fan_out = 2048 // (10 + 6)
  index_blocks = ceil(50000 / fan_out)
  print(ceil(log2(index_blocks)) + 1)
explain: 2048 / 16 = 128 entries per index block. A dense index has 50,000 entries, so ⌈50000 / 128⌉ = 391 blocks. Binary search takes ⌈log₂ 391⌉ = 9 accesses, plus 1 for the data block: 10. A linear search of the 6250-block data file would average 3125.
```
