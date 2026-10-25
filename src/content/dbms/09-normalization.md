---
title: Normalization
chapter: Database Design
description: Update anomalies, 1NF, 2NF, 3NF and BCNF, lossless-join and dependency-preserving decompositions, and multivalued dependencies with 4NF.
---
**Normalization** splits a badly designed table into smaller ones so that each fact is stored once. The normal forms are a ladder of tests, each stricter than the last, based on the functional dependencies of the previous lesson.

## Why: update anomalies

Consider one big table:

| roll | name | dept | hod |
| --- | --- | --- | --- |
| 1 | Asha | CSE | Dr. Rao |
| 2 | Ravi | ECE | Dr. Sen |
| 3 | Meena | CSE | Dr. Rao |

with FDs `roll → name, dept` and `dept → hod`. The fact "the HOD of CSE is Dr. Rao" is stored once per CSE student, which causes three **anomalies**:

- **Update anomaly**: when CSE gets a new HOD, every CSE row must change; missing one leaves the data inconsistent.
- **Insertion anomaly**: a new department with no students yet cannot be recorded (roll, the key, would be NULL).
- **Deletion anomaly**: deleting Ravi, the only ECE student, also deletes the fact that Dr. Sen heads ECE.

Splitting it into `Student(roll, name, dept)` and `Dept(dept, hod)` removes all three.

## The normal forms

```tree
caption: Each normal form includes the stricter ones below it
1NF | atomic values
  2NF | no partial dependency
    3NF | no transitive dependency of a non-prime attribute
      BCNF | every determinant is a superkey
        4NF | no non-trivial multivalued dependency
```

Recall: a **prime** attribute belongs to some candidate key; the others are **non-prime**. For each test, look at every non-trivial FD X → A (with a single attribute on the right):

| Normal form | Condition on every non-trivial FD X → A |
| --- | --- |
| **1NF** | Every attribute holds atomic (indivisible) values: no lists or repeating groups |
| **2NF** | 1NF, and no non-prime A depends on a **proper part** of a candidate key (no **partial dependency**) |
| **3NF** | X is a **superkey**, or A is **prime** |
| **BCNF** | X is a **superkey** |

2NF only matters when a candidate key has more than one attribute: if every key is a single attribute, a 1NF relation is automatically in 2NF.

3NF can also be phrased as: no non-prime attribute is **transitively** dependent on a key (key → X → A with X not a superkey). BCNF is 3NF without the "A is prime" escape clause.

## Finding the highest normal form

The procedure: find all candidate keys, mark prime attributes, then check each FD against BCNF, 3NF and 2NF in turn.

| R and F | Candidate keys | Highest NF | Why |
| --- | --- | --- | --- |
| R(A, B, C, D), { AB → C, B → D } | AB | 1NF | B → D: non-prime D depends on part of the key |
| R(A, B, C, D), { AB → C, C → D } | AB | 2NF | C → D: C is not a superkey and D is non-prime (transitive) |
| R(A, B, C, D), { AB → CD, C → A } | AB, BC | 3NF | C → A: C is not a superkey, but A is prime |
| R(A, B, C), { AB → C, C → B } | AB, AC | 3NF | C → B: B is prime, but C is not a superkey |
| R(A, B, C, D, E, F), { A → BCDEF, BC → ADEF, DEF → ABC } | A, BC, DEF | BCNF | Every left side is a key |

The same check as a program:

```python
from itertools import combinations

def closure(attrs, fds):
    result = set(attrs)
    while True:
        new = result | {a for lhs, rhs in fds if set(lhs) <= result for a in rhs}
        if new == result:
            return result
        result = new

def highest_nf(relation, fds):
    keys = []
    for size in range(1, len(relation) + 1):
        for c in combinations(relation, size):
            if closure(c, fds) == set(relation) and not any(set(k) <= set(c) for k in keys):
                keys.append(set(c))
    prime = set().union(*keys)
    single = [(set(l), a) for l, r in fds for a in r if a not in l]
    superkey = lambda x: closure(x, fds) == set(relation)
    if all(superkey(l) for l, a in single):
        return "BCNF"
    if all(superkey(l) or a in prime for l, a in single):
        return "3NF"
    if all(a in prime or not any(l < k for k in keys) for l, a in single):
        return "2NF"
    return "1NF"

print(highest_nf("ABCD", [("AB", "C"), ("B", "D")]))
print(highest_nf("ABCD", [("AB", "C"), ("C", "D")]))
print(highest_nf("ABCD", [("AB", "CD"), ("C", "A")]))
print(highest_nf("ABCDEF", [("A", "BCDEF"), ("BC", "ADEF"), ("DEF", "ABC")]))
```
```output
1NF
2NF
3NF
BCNF
```

## Properties of a decomposition

Splitting R into R₁, R₂, … must not lose information. Two properties matter:

**Lossless join.** Joining the pieces must give back exactly R, with no extra (spurious) tuples. For a split into two, R₁ and R₂, the test is:

> The decomposition is lossless if and only if the common attributes R₁ ∩ R₂ form a superkey of R₁ or of R₂, that is, (R₁ ∩ R₂) → R₁ or (R₁ ∩ R₂) → R₂ is in F⁺.

Here is a lossy split. R(A, B, C) is split on B, but B is a key of neither piece, so the join produces tuples that were never in R:

```sql
CREATE TABLE r (a INTEGER, b TEXT, c TEXT);
INSERT INTO r VALUES (1, 'x', 'p'), (2, 'x', 'q'), (3, 'y', 'p');
CREATE TABLE r1 AS SELECT DISTINCT a, b FROM r;
CREATE TABLE r2 AS SELECT DISTINCT b, c FROM r;
SELECT COUNT(*) AS original FROM r;
SELECT * FROM r1 NATURAL JOIN r2 ORDER BY a, c;
```
```output
original
--------
3

a  b  c
-  -  -
1  x  p
1  x  q
2  x  p
2  x  q
3  y  p
```

Two spurious tuples, (1, x, q) and (2, x, p), appear. "Lossy" means we lose the information of *which* tuples were real, even though the result has more rows.

**Dependency preservation.** Every FD of F should be checkable inside a single piece, so the DBMS does not need a join to enforce it. Formally, the union of the FDs that hold on each piece (their projections) must be equivalent to F.

## 3NF versus BCNF

| | 3NF decomposition | BCNF decomposition |
| --- | --- | --- |
| Lossless join | Always achievable | Always achievable |
| Dependency preservation | **Always achievable** | **Not always** |
| Redundancy left | A little may remain | None due to FDs |

The standard counterexample: R(A, B, C) with F = { AB → C, C → B }. Keys are AB and AC, so R is in 3NF but not BCNF (C → B, C not a superkey). The BCNF decomposition is R₁(C, B) and R₂(A, C). It is lossless (the common attribute C is a key of R₁), but AB → C can no longer be checked within one table. Any BCNF decomposition of this R loses that FD, so designers often stop at 3NF.

**3NF synthesis** algorithm: compute a minimal cover, make one table for each FD X → A (merging FDs with the same left side), and if no table contains a candidate key, add one table that is a candidate key. **BCNF decomposition**: while some table has an FD X → Y with X not a superkey, split it into (X ∪ Y) and (R − Y).

## Multivalued dependencies and 4NF

Suppose a teacher teaches several subjects and speaks several languages, independently, stored as `Teacher(name, subject, language)`. There are no non-trivial FDs, so the table is in BCNF, yet every subject is repeated for every language. This is a **multivalued dependency** (MVD), written name →→ subject (and so name →→ language): the set of subjects of a teacher does not depend on the language.

**4NF**: for every non-trivial MVD X →→ Y, X is a superkey. The fix is the same as before: split into `(name, subject)` and `(name, language)`. Every FD is also an MVD, so 4NF implies BCNF.

## Practice questions

```quiz
q: R(A, B, C, D, E) has F = { AB → CDE, D → E }. What is the highest normal form of R?
- 1NF
* 2NF
- 3NF
- BCNF
explain: The only key is AB. No non-prime attribute depends on A or B alone, so R is in 2NF. D → E violates 3NF: D is not a superkey and E is non-prime (a transitive dependency AB → D → E).
```

```quiz
q: R(A, B, C, D) has F = { A → B, B → C, C → A }. What is the highest normal form of R?
- 1NF
- 2NF
* 3NF
- BCNF
explain: The candidate keys are AD, BD and CD, so every attribute is prime. That satisfies 3NF for every FD. But A → B has a left side A that is not a superkey (A⁺ = {A, B, C}), so R is not in BCNF.
```

```quiz
q: R(A, B, C, D) with F = { A → B, C → D } is decomposed into R₁(A, B) and R₂(C, D). Which statement is **true**?
- The decomposition is lossless and dependency preserving
* The decomposition is dependency preserving but lossy
- The decomposition is lossless but not dependency preserving
- The decomposition is neither
explain: A → B lies inside R₁ and C → D inside R₂, so both FDs are preserved. But R₁ ∩ R₂ is empty, which is not a superkey of either piece: the join is a Cartesian product, so the decomposition is lossy.
```

```quiz
q: R(A, B, C) has rows (1, p, x), (2, p, y), (3, q, x), (4, q, y), (5, r, x). It is split into R₁ = π<sub>A,B</sub>(R) and R₂ = π<sub>B,C</sub>(R). How many rows does R₁ ⋈ R₂ have?
code: sql
  CREATE TABLE r (a INTEGER, b TEXT, c TEXT);
  INSERT INTO r VALUES (1, 'p', 'x'), (2, 'p', 'y'), (3, 'q', 'x'), (4, 'q', 'y'), (5, 'r', 'x');
  SELECT COUNT(*) FROM (SELECT DISTINCT a, b FROM r) NATURAL JOIN (SELECT DISTINCT b, c FROM r);
answer: 9
explain: B = p joins A ∈ {1, 2} with C ∈ {x, y}: 4 rows. B = q joins {3, 4} with {x, y}: 4 rows. B = r joins {5} with {x}: 1 row. Total 9, so 4 of them are spurious.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every relation can be decomposed into BCNF in a lossless-join way
* A dependency-preserving, lossless 3NF decomposition always exists
- A dependency-preserving, lossless BCNF decomposition always exists
* A relation in BCNF is also in 3NF
explain: BCNF decomposition is always lossless but may lose dependencies (R(A, B, C) with AB → C, C → B is the example). 3NF synthesis guarantees both. BCNF is stricter than 3NF.
```

```quiz
q: A relation has only single-attribute candidate keys and is in 1NF. In which normal form is it guaranteed to be?
- None beyond 1NF
* 2NF
- 3NF
- BCNF
explain: A partial dependency needs a proper subset of a candidate key, and a single-attribute key has no non-empty proper subset. So the relation is in 2NF, but it can still violate 3NF through a transitive dependency.
```
