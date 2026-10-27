---
title: GATE CS Formula Sheet for Quick Revision
chapter: Revision
description: GATE CS important formulas on one page: algorithms, data structures, OS, networks, COA, digital logic, DBMS, discrete maths and probability, with solved checks.
---
This page collects the formulas that GATE CS numerical questions use most, subject by subject. Use it for last-month revision; each section links to the full lesson.

## Algorithms and data structures

| Formula | Meaning |
| --- | --- |
| T(n) = aT(n/b) + Θ(n^k) | Master theorem: compare a with b^k. a < b^k → Θ(n^k); a = b^k → Θ(n^k log n); a > b^k → Θ(n^(log_b a)) |
| Binary tree with n nodes | n − 1 edges; n₀ = n₂ + 1 (leaves = nodes with two children + 1) |
| Height-h binary tree | At most 2^(h+1) − 1 nodes (root at height 0) |
| Heap of n elements | Height ⌊log₂ n⌋; build-heap is O(n) |
| Number of BSTs with n keys | Catalan number C(2n, n)/(n + 1) |
| Hashing with load factor α | Chaining: expected search ≈ 1 + α; open addressing unsuccessful search ≤ 1/(1 − α) |
| Simple graph with n vertices | At most n(n − 1)/2 edges; a tree has n − 1 edges |

See [Complexity](../dsa/complexity.html), [Recursion and recurrences](../dsa/recursion-recurrences.html) and [Binary trees](../dsa/binary-trees.html).

## Operating systems

| Formula | Meaning |
| --- | --- |
| Turnaround time = completion − arrival | Waiting time = turnaround − burst |
| EAT (paging with TLB) = h(t + m) + (1 − h)(t + 2m) | h = TLB hit ratio, t = TLB time, m = memory time (single-level table) |
| EAT (page faults) = (1 − p)m + p × fault service time | p = page-fault rate |
| Page table size = (number of pages) × (entry size) | Number of pages = 2^(virtual address bits) / page size |
| Deadlock-free with n processes each needing k units | Resources ≥ n(k − 1) + 1 |

See [CPU scheduling](../os/cpu-scheduling.html), [Paging](../os/paging.html) and [Deadlocks](../os/deadlocks.html).

## Computer networks

| Formula | Meaning |
| --- | --- |
| Transmission time = L / B | Propagation time = d / v |
| Stop-and-wait efficiency = 1 / (1 + 2a) | a = propagation time / transmission time |
| Sliding window efficiency = min(1, W / (1 + 2a)) | W = window size |
| Go-Back-N: W ≤ 2^k − 1; Selective Repeat: W ≤ 2^(k−1) | k = sequence number bits |
| /n prefix | 2^(32−n) addresses, 2^(32−n) − 2 usable hosts |
| CSMA/CD minimum frame | L ≥ 2 × B × propagation delay |

See [Flow control](../cn/flow-control.html) and [IP addressing](../cn/ip-addressing.html).

## Computer organization

| Formula | Meaning |
| --- | --- |
| CPU time = IC × CPI × clock period | Speedup = old time / new time |
| Pipeline of k stages, n instructions | (k + n − 1) cycles; ideal speedup → k |
| Average access time = h × c + (1 − h) × (c + m) | Cache with hit ratio h (hierarchical access) |
| Direct-mapped address | tag + index (log₂ lines) + offset (log₂ block size) |
| k-way set associative | sets = lines / k; index = log₂ sets |

See [Pipelining](../coa/pipelining.html) and [Cache memory](../coa/cache-memory.html).

## Digital logic and number systems

- n-bit 2's complement range: −2^(n−1) to 2^(n−1) − 1.
- A function of n variables: 2^(2^n) Boolean functions; 2^n minterms.
- A mod-N counter needs ⌈log₂ N⌉ flip-flops.
- IEEE 754 single precision: 1 sign, 8 exponent (bias 127), 23 mantissa bits.

See [Signed numbers](../dl/signed-numbers.html) and [Floating point](../dl/floating-point.html).

## Databases

- A relation with n attributes has 2^n − 1 non-empty attribute sets, each a possible super key.
- B+ tree of order p (pointers per node): a node other than the root has at least ⌈p/2⌉ children.
- The natural join of R (r tuples) and S (s tuples) has at most r × s tuples.
- Number of serial schedules of n transactions: n!.

See [Normalization](../dbms/normalization.html) and [Indexing](../dbms/indexing.html).

## Discrete mathematics and probability

| Formula | Meaning |
| --- | --- |
| Relations on an n-set | 2^(n²); reflexive 2^(n² − n); symmetric 2^(n(n+1)/2) |
| Functions A → B, A has m and B has n elements | n^m; one-one n!/(n − m)! |
| Derangements D(n) | n! Σ (−1)^k / k! |
| Handshaking lemma | Σ degrees = 2 × edges |
| Euler's formula (planar connected) | V − E + F = 2 |
| Bayes' theorem | P(A given B) = P(B given A) P(A) / P(B) |
| Binomial | mean np, variance np(1 − p) |
| Poisson | mean = variance = λ |
| Exponential | mean 1/λ, variance 1/λ² |

See [Combinatorics](../dm/combinatorics.html), [Relations](../dm/relations.html) and [Probability](../em/probability.html).

## Check yourself

```quiz
q: Using the master theorem, T(n) = 8T(n/2) + n² is:
- Θ(n²)
- Θ(n² log n)
* Θ(n³)
- Θ(n⁴)
explain: a = 8, b = 2, k = 2: b^k = 4 < 8, so T(n) = Θ(n^(log₂ 8)) = Θ(n³).
```

```quiz
q: TLB time 10 ns, memory time 100 ns, TLB hit ratio 0.9, single-level page table. What is the effective access time in ns?
answer: 120
verify: round(0.9 * (10 + 100) + 0.1 * (10 + 200), 6)
explain: EAT = 0.9 × 110 + 0.1 × 210 = 99 + 21 = 120 ns.
```

```quiz
q: A link has transmission time 1 ms and propagation time 2 ms. What is the stop-and-wait efficiency? (Give 2 decimal places.)
answer: 0.20
verify: round(1 / (1 + 2 * 2), 2)
explain: a = 2/1 = 2, efficiency = 1 / (1 + 2 × 2) = 1/5 = 0.20.
```

```quiz
q: A 5-stage pipeline executes 100 instructions with no stalls. How many clock cycles does it take?
answer: 104
verify: 5 + 100 - 1
explain: k + n − 1 = 5 + 100 − 1 = 104 cycles.
```

```quiz
q: How many symmetric relations are there on a set of 4 elements?
answer: 1024
verify: 2 ** (4 * 5 // 2)
explain: 2^(n(n+1)/2) = 2^10 = 1024.
```

```quiz
q: How many usable host addresses does a /27 subnet have?
answer: 30
verify: 2 ** (32 - 27) - 2
explain: 2^5 = 32 addresses, minus the network and broadcast addresses: 30.
```

```quiz
q: 3 processes each need at most 4 units of a resource. What is the minimum number of units that guarantees no deadlock?
answer: 10
verify: 3 * (4 - 1) + 1
explain: n(k − 1) + 1 = 3 × 3 + 1 = 10.
```

```quiz
q: How many structurally different binary search trees can store the keys 1, 2, 3, 4?
answer: 14
verify: __import__("math").comb(8, 4) // 5
explain: Catalan number C(8, 4)/5 = 70/5 = 14.
```
