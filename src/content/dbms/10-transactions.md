---
title: Transactions and Serializability
chapter: Transactions
description: ACID properties, transaction states, schedules, conflict and view serializability with precedence graphs, and recoverable, cascadeless and strict schedules.
---
A **transaction** is a sequence of database operations that must behave as one indivisible unit of work. Transferring ₹500 from account A to B reads and writes both balances; it must never happen halfway.

## ACID

| Property | Meaning | Ensured by |
| --- | --- | --- |
| **Atomicity** | All operations happen, or none do | Recovery manager (undo using the log) |
| **Consistency** | A transaction takes the database from one consistent state to another | The programmer, plus integrity constraints |
| **Isolation** | Concurrent transactions do not see each other's partial results; the outcome equals some serial order | Concurrency control (locking, timestamps) |
| **Durability** | Once committed, changes survive crashes | Recovery manager (redo using the log) |

## Transaction states

```graph
caption: Transaction states (Partial = partially committed: the last operation has run, but the commit is not yet safe)
nodes: Active Partial Committed Aborted Failed
Active -> Partial
Partial -> Committed
Active -> Failed
Partial -> Failed
Failed -> Aborted
```

- **Active**: the transaction is executing its reads and writes.
- **Partially committed**: its last operation has run, but its changes may still be only in memory.
- **Committed**: the commit record is safely on disk; the changes are now permanent.
- **Failed**: normal execution cannot continue (an error, a deadlock, a crash).
- **Aborted**: all its changes have been rolled back; it can be restarted or killed.

## Schedules

A **schedule** is the order in which the operations of concurrent transactions are executed. We write `R1(A)` for "transaction T1 reads A", `W2(B)` for "T2 writes B", and `C1` for "T1 commits".

- A **serial** schedule runs transactions one after another with no interleaving. It is always correct, but slow.
- A **concurrent** (interleaved) schedule mixes their operations. It is correct if it is **serializable**: equivalent to some serial schedule.

Two transactions with m and n operations can be interleaved in C(m + n, m) ways (keeping each transaction's own order); with 3 and 2 operations that is C(5, 3) = 10 schedules.

Problems that bad interleavings cause:

| Problem | Pattern | Example |
| --- | --- | --- |
| **Lost update** | Both read A, both write A | One deposit disappears |
| **Dirty read** | T2 reads a value written by T1, then T1 aborts | T2 used a value that never existed |
| **Unrepeatable read** | T1 reads A twice and T2 changes A in between | T1 sees two different values |

## Conflict serializability

Two operations **conflict** if they belong to **different** transactions, access the **same** item, and **at least one is a write**: R–W, W–R or W–W. Two reads never conflict.

Swapping adjacent non-conflicting operations does not change the result. A schedule is **conflict serializable** if such swaps can turn it into a serial schedule.

**Test with a precedence graph**: draw a node for each transaction, and an edge Ti → Tj whenever an operation of Ti conflicts with a *later* operation of Tj. The schedule is conflict serializable **if and only if the graph has no cycle**. Each **topological order** of the graph is an equivalent serial schedule.

Example: S = R1(A) R2(B) W1(B) R3(A) W2(C) W3(C).

- R2(B) before W1(B) on B: edge **T2 → T1**.
- W2(C) before W3(C) on C: edge **T2 → T3**.
- R1(A) and R3(A) are both reads: no edge.

```graph
caption: Precedence graph of S: acyclic, so S is conflict serializable
nodes: T1 T2 T3
T2 -> T1
T2 -> T3
```

There is no cycle, and both T2, T1, T3 and T2, T3, T1 are topological orders, so S is equivalent to either serial schedule. The program below builds the graph and lists the serial orders:

```python
from itertools import permutations

def parse(schedule):
    # "R1(A)" -> ("R", 1, "A")
    return [(op[0], int(op[1]), op[3]) for op in schedule.split()]

def precedence_edges(ops):
    edges = set()
    for i, (a, ti, x) in enumerate(ops):
        for b, tj, y in ops[i + 1:]:
            if ti != tj and x == y and "W" in (a, b):
                edges.add((ti, tj))
    return edges

def serial_orders(schedule):
    ops = parse(schedule)
    txns = sorted({t for _, t, _ in ops})
    edges = precedence_edges(ops)
    return edges, [p for p in permutations(txns)
                   if all(p.index(i) < p.index(j) for i, j in edges)]

for s in ["R1(A) R2(B) W1(B) R3(A) W2(C) W3(C)",
          "R1(A) R2(A) W1(A) W2(A)",
          "R1(A) W2(A) W1(A) W3(A)"]:
    edges, orders = serial_orders(s)
    print(s, "| edges:", sorted(edges), "| serial orders:", orders)
```
```output
R1(A) R2(B) W1(B) R3(A) W2(C) W3(C) | edges: [(2, 1), (2, 3)] | serial orders: [(2, 1, 3), (2, 3, 1)]
R1(A) R2(A) W1(A) W2(A) | edges: [(1, 2), (2, 1)] | serial orders: []
R1(A) W2(A) W1(A) W3(A) | edges: [(1, 2), (1, 3), (2, 1), (2, 3)] | serial orders: []
```

The second schedule is the lost update: T1 → T2 (R1(A) before W2(A)) and T2 → T1 (R2(A) before W1(A)) form a cycle.

## View serializability

Conflict serializability is sufficient but not necessary. Two schedules are **view equivalent** if, for every item:

1. the same transaction does the **initial read** (reads the original value),
2. every read reads the value written by the **same** transaction (the same "reads-from"), and
3. the same transaction does the **final write**.

A schedule is **view serializable** if it is view equivalent to some serial schedule. Every conflict serializable schedule is view serializable. The extra view-serializable schedules always contain **blind writes** (a write with no earlier read of the item by that transaction).

The third schedule above, R1(A) W2(A) W1(A) W3(A), has a cycle T1 ⇄ T2, so it is not conflict serializable. But compare it with the serial order T1, T2, T3: T1 does the initial read of A in both, and T3 does the final write in both, so it **is** view serializable. W2(A) and W3(A) are blind writes.

Testing view serializability is NP-complete, so real systems enforce conflict serializability.

## Recoverability

Serializability ignores aborts. These classes describe what happens when a transaction aborts. Say Tj **reads from** Ti if Tj reads a value that Ti wrote.

| Class | Rule | Example |
| --- | --- | --- |
| **Recoverable** | If Tj reads from Ti, then Ti commits **before** Tj commits | W1(A) R2(A) C1 C2 |
| **Cascadeless** (avoids cascading aborts) | Transactions read only **committed** values | W1(A) C1 R2(A) C2 |
| **Strict** | No transaction reads **or writes** an item until the last transaction that wrote it has committed or aborted | W1(A) C1 W2(A) C2 |

- W1(A) R2(A) C2 C1 is **not recoverable**: T2 commits a value read from T1; if T1 then aborts, T2 cannot be undone.
- W1(A) R2(A) C1 C2 is recoverable but **not cascadeless**: if T1 aborted before committing, T2 would have to abort too (a **cascading rollback**).
- W1(A) W2(A) C1 C2 is cascadeless (no read at all) but **not strict**: T2 overwrites a value T1 has not committed.

Strict ⊂ cascadeless ⊂ recoverable, and **strict two-phase locking** (next lesson) produces strict schedules.

## Practice questions

```quiz
q: How many serial schedules are conflict equivalent to S = R1(A) R2(B) W1(B) R3(A) W2(C) W3(C)?
answer: 2
verify:
  from itertools import permutations
  ops = [(o[0], int(o[1]), o[3]) for o in "R1(A) R2(B) W1(B) R3(A) W2(C) W3(C)".split()]
  E = {(t, u) for i, (a, t, x) in enumerate(ops) for b, u, y in ops[i + 1:] if t != u and x == y and "W" in (a, b)}
  print(sum(all(p.index(i) < p.index(j) for i, j in E) for p in permutations([1, 2, 3])))
explain: The precedence graph has edges T2 → T1 (on B) and T2 → T3 (on C). T2 must come first; T1 and T3 can then go in either order: T2 T1 T3 and T2 T3 T1.
```

```quiz
q: Is S = R2(A) R1(B) W2(A) R3(A) W1(B) W3(A) R2(B) W2(B) conflict serializable, and if so, to which serial order is it equivalent?
- It is not conflict serializable
- T2, T1, T3
* T1, T2, T3
- T3, T2, T1
explain: On A: R2(A) and W2(A) come before W3(A) and R3(A), giving T2 → T3. On B: W1(B) comes before R2(B) and W2(B), giving T1 → T2. The graph T1 → T2 → T3 has no cycle, and its only topological order is T1, T2, T3.
```

```quiz
q: Which schedules are conflict serializable? (Select all that apply.)
* R1(A) W1(A) R2(A) W2(A) R1(B) W1(B) R2(B) W2(B)
- R1(X) R2(Y) R3(X) W1(Y) W2(X) W3(Z) R2(Z)
- R2(X) W3(X) R1(Y) W2(Y) R3(Z) W1(Z)
* R1(A) R2(B) W1(A) W2(B) R2(A)
explain: First: all conflicts go T1 → T2 (no cycle). Second: R1(X) before W2(X) gives T1 → T2, R2(Y) before W1(Y) gives T2 → T1, a cycle. Third: T2 → T3 (X), T1 → T2 (Y), T3 → T1 (Z), a cycle. Fourth: the only conflict is W1(A) before R2(A), giving T1 → T2, so it is equivalent to T1, T2.
```

```quiz
q: Transactions T1 and T2 have 4 and 3 operations. In how many ways can their operations be interleaved, keeping each transaction's own order?
answer: 35
verify: __import__("math").comb(4 + 3, 3)
explain: Choose which 3 of the 7 positions hold T2's operations: C(7, 3) = 35.
```

```quiz
q: Schedule S = W1(A) R2(A) W2(B) C1 C2. Which statement is **true**?
- S is not recoverable
* S is recoverable but not cascadeless
- S is cascadeless but not strict
- S is strict
explain: T2 reads A written by T1 before T1 commits (a dirty read), so S is not cascadeless. T1 commits before T2, so S is recoverable.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every conflict serializable schedule is view serializable
* A view serializable schedule that is not conflict serializable contains a blind write
- Every view serializable schedule is conflict serializable
* Every strict schedule is cascadeless
explain: Conflict ⊂ view serializability, and the gap is made of schedules with blind writes. Strict schedules forbid reading uncommitted data, so they are cascadeless.
```
