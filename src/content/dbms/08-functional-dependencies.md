---
title: Functional Dependencies
chapter: Database Design
description: Functional dependencies, Armstrong's axioms, attribute closure, finding all candidate keys, equivalence of FD sets and the minimal cover.
---
Good database design starts from the rules that hold in the data. The most important kind of rule is the **functional dependency**.

## Definition

In a relation R, the functional dependency **X → Y** ("X determines Y") holds if any two tuples that agree on the attributes X also agree on Y. In other words, each X value comes with exactly one Y value.

In `Student(roll, name, dept, hod)`:

- `roll → name, dept`: a roll number identifies one student.
- `dept → hod`: each department has one head.
- `name → roll` does **not** hold if two students can have the same name.

An FD is a statement about **every legal instance** of the schema. A single table instance can show that an FD does *not* hold (two rows with the same X and different Y), but it can never prove that an FD holds.

An FD X → Y is **trivial** if Y ⊆ X, such as `roll, name → name`. Trivial FDs hold in every relation.

## Armstrong's axioms

From a given set F of FDs, other FDs follow. Armstrong's axioms derive all of them, and only correct ones (they are **sound and complete**):

| Rule | Statement |
| --- | --- |
| Reflexivity | If Y ⊆ X then X → Y |
| Augmentation | If X → Y then XZ → YZ |
| Transitivity | If X → Y and Y → Z then X → Z |
| Union (derived) | If X → Y and X → Z then X → YZ |
| Decomposition (derived) | If X → YZ then X → Y and X → Z |
| Pseudotransitivity (derived) | If X → Y and WY → Z then WX → Z |

The set of all FDs implied by F is the **closure** F⁺.

> **Warning:** The left side cannot be split. From AB → C it does **not** follow that A → C or B → C.

## Attribute closure

Computing F⁺ is expensive, but we rarely need it. The workhorse is the **closure of an attribute set** X, written X⁺: all attributes that X determines.

```flowchart
caption: Computing the closure X⁺
start: result = X
while: some FD L → R with L ⊆ result adds a new attribute?
  step: result = result ∪ R
end: X⁺ = result
```

Example: R(A, B, C, D, E, F) with F = { A → B, B → C, C → D, AE → F }. To find (AE)⁺: start with {A, E}; A → B adds B; B → C adds C; C → D adds D; AE → F adds F. So (AE)⁺ = {A, B, C, D, E, F}, all of R, which makes AE a superkey.

Attribute closure answers the common questions:

- **Does X → Y follow from F?** Exactly when Y ⊆ X⁺.
- **Is X a superkey?** Exactly when X⁺ contains every attribute of R.
- **Is X a candidate key?** When X is a superkey and no proper subset of X is.

## Finding all candidate keys

A quick observation narrows the search: an attribute that never appears on the **right** side of any FD can never be determined by others, so it must be in **every** candidate key. An attribute that appears only on the right side (never on the left) is in **no** candidate key.

Example: R(A, B, C, D, E) with F = { A → BC, CD → E, B → D, E → A }.

- A⁺ = {A, B, C, D, E} (A → BC, B → D, CD → E): **A** is a candidate key.
- Since E → A, E⁺ ⊇ A⁺, so **E** is a candidate key too.
- (BC)⁺: B → D gives D, CD → E gives E, E → A gives A: **BC** is a key.
- (CD)⁺: CD → E, E → A, A → BC: **CD** is a key.
- (BD)⁺ = {B, D} only, so BD is not a superkey.

This program checks every attribute set in order of size, keeping only the minimal ones:

```python
from itertools import combinations

def closure(attrs, fds):
    result = set(attrs)
    changed = True
    while changed:
        changed = False
        for lhs, rhs in fds:
            if set(lhs) <= result and not set(rhs) <= result:
                result |= set(rhs)
                changed = True
    return result

def candidate_keys(relation, fds):
    keys = []
    for size in range(1, len(relation) + 1):
        for combo in combinations(relation, size):
            if closure(combo, fds) == set(relation) and not any(set(k) <= set(combo) for k in keys):
                keys.append("".join(combo))
    return keys

fds = [("A", "BC"), ("CD", "E"), ("B", "D"), ("E", "A")]
print("(BD)+ =", "".join(sorted(closure("BD", fds))))
print("candidate keys:", candidate_keys("ABCDE", fds))
```
```output
(BD)+ = BD
candidate keys: ['A', 'E', 'BC', 'CD']
```

## Equivalence of FD sets

Two FD sets F and G are **equivalent** if F⁺ = G⁺. To check, test that every FD of G follows from F (using closures under F) and every FD of F follows from G.

Example: F = { A → B, B → C } and G = { A → B, B → C, A → C } are equivalent: A → C follows from F by transitivity, and F ⊆ G.

## Minimal (canonical) cover

A **minimal cover** of F is an equivalent set with no redundancy. Build it in three steps:

1. **Split right sides** into single attributes: A → BC becomes A → B and A → C.
2. **Remove extraneous left-side attributes**: in XA → B, attribute A is extraneous if X → B already follows (B ∈ X⁺).
3. **Remove redundant FDs**: drop X → B if B ∈ X⁺ computed with the *other* FDs.

Example: F = { A → B, AB → C, D → AC, D → E }.

1. Split: A → B, AB → C, D → A, D → C, D → E.
2. In AB → C, B is extraneous because A⁺ = {A, B, C} already contains C: it becomes A → C.
3. D → C is redundant: without it, D⁺ = {D, A, E, B, C} still contains C.

Minimal cover: { A → B, A → C, D → A, D → E }, 4 FDs. A set can have more than one minimal cover, depending on the order in which the steps are applied.

## Practice questions

```quiz
q: R(A, B, C, D) has F = { A → B, B → C, C → A }. How many candidate keys does R have?
answer: 3
verify:
  from itertools import combinations
  F = [("A", "B"), ("B", "C"), ("C", "A")]
  def clo(x):
      r = set(x)
      while True:
          n = r | {c for l, rhs in F if set(l) <= r for c in rhs}
          if n == r: return r
          r = n
  keys = []
  for k in range(1, 5):
      for c in combinations("ABCD", k):
          if clo(c) == set("ABCD") and not any(set(q) <= set(c) for q in keys):
              keys.append(c)
  print(len(keys))
explain: D never appears on a right side, so it is in every key. A, B and C determine each other in a cycle, so AD, BD and CD are all keys, and D alone is not. Three candidate keys.
```

```quiz
q: R(A, B, C, D, E, F) has F = { AB → C, C → DE, E → F, F → A }. How many candidate keys does R have?
answer: 4
verify:
  from itertools import combinations
  F = [("AB", "C"), ("C", "DE"), ("E", "F"), ("F", "A")]
  def clo(x):
      r = set(x)
      while True:
          n = r | {c for l, rhs in F if set(l) <= r for c in rhs}
          if n == r: return r
          r = n
  keys = []
  for k in range(1, 7):
      for c in combinations("ABCDEF", k):
          if clo(c) == set("ABCDEF") and not any(set(q) <= set(c) for q in keys):
              keys.append(c)
  print(len(keys))
explain: B is on no right side, so every key contains B. AB is a key (AB → C → DE, E → F). Replacing A by anything that determines A gives more keys: C → DE → F → A makes BC a key, E → F → A makes BE a key, and F → A makes BF a key. D determines nothing, so BD is not a key. Keys: AB, BC, BE, BF.
```

```quiz
q: For R(A, B, C, D, E) with F = { A → BC, CD → E, B → D, E → A }, which FDs are in F⁺? (Select all that apply.)
* E → D
* BC → A
- B → C
* CD → B
explain: E⁺ = {E, A, B, C, D}, so E → D holds. (BC)⁺ includes A (B → D, CD → E, E → A). B⁺ = {B, D}, which lacks C. (CD)⁺ = {C, D, E, A, B}, so CD → B holds.
```

```quiz
q: How many FDs are in a minimal cover of F = { A → BC, B → C, A → B, AB → C }?
answer: 2
verify:
  F = [("A", "B"), ("A", "C"), ("B", "C"), ("A", "B"), ("AB", "C")]
  def clo(x, G):
      r = set(x)
      while True:
          n = r | {c for l, rhs in G if set(l) <= r for c in rhs}
          if n == r: return r
          r = n
  G = []
  for l, r in F:  # drop extraneous left-side attributes, then duplicates
      for a in l:
          if len(l) > 1 and r in clo(l.replace(a, ""), F):
              l = l.replace(a, "")
      if (l, r) not in G:
          G.append((l, r))
  i = 0
  while i < len(G):  # drop redundant FDs
      rest = G[:i] + G[i + 1:]
      if G[i][1] in clo(G[i][0], rest): G = rest
      else: i += 1
  print(len(G))
explain: Split: A → B, A → C, B → C, AB → C. In AB → C, A is extraneous (B → C), giving B → C, a duplicate. A → C is redundant (A → B → C). Minimal cover: { A → B, B → C }.
```

```quiz
q: In a relation instance, two tuples have the same value of X but different values of Y. What can you conclude?
- X → Y holds
* X → Y does not hold
- Y → X holds
- Nothing at all
explain: X → Y requires tuples that agree on X to agree on Y. This pair violates it, so X → Y cannot hold. (One instance can disprove an FD, but never prove one.)
```
