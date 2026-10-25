---
title: K-Maps and Minimization
chapter: Boolean Algebra and Gates
description: Karnaugh maps for 2 to 4 variables, grouping rules, prime and essential prime implicants, don't-care conditions, minimal SOP and POS, and the Quine–McCluskey method.
---
Fewer and smaller terms mean fewer gates. A **Karnaugh map (K-map)** arranges the truth table so that minterms that differ in one variable sit next to each other, and simplification becomes a matter of drawing rectangles.

## The 4-variable K-map

Rows are labelled by AB and columns by CD, both in **Gray code order** (00, 01, 11, 10), so neighbouring cells differ in exactly one bit. The numbers in the cells are minterm indices (ABCD in binary):

| AB \ CD | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| **00** | 0 | 1 | 3 | 2 |
| **01** | 4 | 5 | 7 | 6 |
| **11** | 12 | 13 | 15 | 14 |
| **10** | 8 | 9 | 11 | 10 |

The map **wraps around**: the left and right columns are adjacent, and so are the top and bottom rows. The four corners (0, 2, 8, 10) form one group.

## Grouping rules

1. Group the 1s into rectangles whose sizes are **powers of 2**: 1, 2, 4, 8 or 16 cells.
2. Make each group **as large as possible**: a group of 2ᵏ cells eliminates k variables.
3. Use **as few groups as possible**, so that every 1 is covered. Groups may overlap.
4. Read each group as a product of the variables that stay **constant** across it (A if it is always 1, A′ if always 0).

Example: F(A, B, C, D) = Σm(1, 3, 4, 5, 9, 11, 12, 13).

| AB \ CD | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| **00** | 0 | **1** | **1** | 0 |
| **01** | **1** | **1** | 0 | 0 |
| **11** | **1** | **1** | 0 | 0 |
| **10** | 0 | **1** | **1** | 0 |

- Cells 4, 5, 12, 13 (rows 01 and 11, columns 00 and 01): B = 1, C = 0, so **BC′**.
- Cells 1, 3, 9, 11 (rows 00 and 10, columns 01 and 11): B = 0, D = 1, so **B′D**.
- Cells 1, 5, 9, 13 (the whole 01 column) form a group too, **C′D**, but every one of its cells is already covered.

So **F = BC′ + B′D**.

## Prime and essential prime implicants

- An **implicant** is a product term that is 1 only where F is 1 (a valid group).
- A **prime implicant (PI)** is an implicant that cannot be enlarged (a maximal group). Above: BC′, B′D and C′D.
- An **essential prime implicant (EPI)** is a PI that covers some 1 that no other PI covers. It must appear in every minimal SOP. Above: BC′ (the only PI covering 4 and 12) and B′D (the only PI covering 3 and 11). C′D is not essential.

A minimal SOP = all EPIs + the fewest other PIs needed to cover the remaining 1s. When there are **no** EPIs (a *cyclic* map), there may be several equally good answers.

## Don't-care conditions

Sometimes some input combinations never occur, or their output does not matter (for example the codes 1010–1111 in a BCD circuit). These **don't cares** (marked X, written d(…)) can be treated as 1 or 0, whichever gives larger groups. They are never required to be covered.

## Minimal POS

Group the **0s** instead of the 1s to get F′ as an SOP, then apply De Morgan; equivalently, read each group of 0s as a **sum** term with complemented sense (a variable that is 1 throughout the group appears as A′). For the example above, the 0s give F = (B + D)(B′ + C′).

## The Quine–McCluskey method

K-maps become impractical beyond 5 or 6 variables. The **Quine–McCluskey** (tabular) method does the same thing systematically, and is easy to program:

1. Write the minterms (and don't cares) in binary.
2. Repeatedly combine pairs of terms that differ in exactly one bit, replacing that bit with "−". Terms that can never be combined are the **prime implicants**.
3. Build a chart of which PIs cover which minterms; pick the essential ones, then cover the rest with as few PIs as possible.

```python
from itertools import combinations

def prime_implicants(n, ones, dont_cares=()):
    terms = {format(m, f"0{n}b") for m in set(ones) | set(dont_cares)}
    primes = set()
    while terms:
        merged, used = set(), set()
        for a, b in combinations(sorted(terms), 2):
            diff = [i for i in range(n) if a[i] != b[i]]
            if len(diff) == 1:
                merged.add(a[:diff[0]] + "-" + a[diff[0] + 1:])
                used |= {a, b}
        primes |= terms - used
        terms = merged
    return sorted(primes)

def covers(p, m, n):
    return all(c in ("-", b) for c, b in zip(p, format(m, f"0{n}b")))

def essential(primes, ones, n):
    return [p for p in primes
            if any(covers(p, m, n) and sum(covers(q, m, n) for q in primes) == 1 for m in ones)]

def as_term(p, names="ABCD"):
    return "".join(v + ("'" if c == "0" else "") for v, c in zip(names, p) if c != "-")

for ones, dc in [([1, 3, 4, 5, 9, 11, 12, 13], []), ([2, 3, 7, 9, 11, 13], [1, 10, 15])]:
    pis = prime_implicants(4, ones, dc)
    print(f"Σm{tuple(ones)} + d{tuple(dc)}:")
    print("  prime implicants:", [as_term(p) for p in pis])
    print("  essential:       ", [as_term(p) for p in essential(pis, ones, 4)])
```
```output
Σm(1, 3, 4, 5, 9, 11, 12, 13) + d():
  prime implicants: ["C'D", "B'D", "BC'"]
  essential:        ["B'D", "BC'"]
Σm(2, 3, 7, 9, 11, 13) + d(1, 10, 15):
  prime implicants: ['CD', "B'D", "B'C", 'AD']
  essential:        ['CD', "B'C", 'AD']
```

In the second function, the don't cares 10 and 15 let CD, B′C and AD grow into groups of four (don't care 1 is simply left out); those three essential PIs already cover every required 1, so F = CD + B′C + AD.

## Practice questions

```quiz
q: How many prime implicants does F(A, B, C, D) = Σm(0, 1, 2, 5, 6, 7, 8, 9, 10, 14) have?
answer: 6
verify:
  from itertools import combinations
  n, ones = 4, [0, 1, 2, 5, 6, 7, 8, 9, 10, 14]
  terms, primes = {format(m, "04b") for m in ones}, set()
  while terms:
      nxt, used = set(), set()
      for a, b in combinations(sorted(terms), 2):
          d = [i for i in range(n) if a[i] != b[i]]
          if len(d) == 1:
              nxt.add(a[:d[0]] + "-" + a[d[0] + 1:])
              used |= {a, b}
      primes |= terms - used
      terms = nxt
  print(len(primes))
explain: The prime implicants are B′C′ (0, 1, 8, 9), B′D′ (0, 2, 8, 10), CD′ (2, 6, 10, 14), A′C′D (1, 5), A′BD (5, 7) and A′BC (6, 7): six in all.
```

```quiz
q: For the same function Σm(0, 1, 2, 5, 6, 7, 8, 9, 10, 14), how many of its prime implicants are **essential**?
answer: 2
verify:
  pis = ["-00-", "-0-0", "--10", "0-01", "01-1", "011-"]
  ones = [0, 1, 2, 5, 6, 7, 8, 9, 10, 14]
  cov = lambda p, m: all(c in ("-", b) for c, b in zip(p, format(m, "04b")))
  print(sum(1 for p in pis if any(cov(p, m) and sum(cov(q, m) for q in pis) == 1 for m in ones)))
explain: B′C′ is the only PI covering 9, and CD′ is the only one covering 14. Every other minterm is covered by at least two PIs. A minimal SOP is B′C′ + CD′ + A′BD (A′BD covers 5 and 7, which the two EPIs miss).
```

```quiz
q: F(A, B, C) = Σm(0, 1, 2, 5, 6, 7). How many essential prime implicants does it have?
answer: 0
verify:
  pis = ["-01", "-10", "0-0", "00-", "1-1", "11-"]
  ones = [0, 1, 2, 5, 6, 7]
  cov = lambda p, m: all(c in ("-", b) for c, b in zip(p, format(m, "03b")))
  print(sum(1 for p in pis if any(cov(p, m) and sum(cov(q, m) for q in pis) == 1 for m in ones)))
explain: The six 1s form a ring on the K-map, and each of them is covered by exactly two of the six prime implicants (B′C, BC′, A′C′, A′B′, AC, AB). No PI is essential; there are two minimal SOPs with three terms, such as A′C′ + B′C + AB.
```

```quiz
q: In a 4-variable K-map, a group of 8 cells produces a term with how many literals?
answer: 1
verify: 4 - 3
explain: A group of 2³ = 8 cells eliminates 3 variables, leaving 4 − 3 = 1 literal.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every essential prime implicant appears in every minimal SOP
* Don't-care cells may be included in a group but never have to be covered
- A K-map group may contain 6 cells
* In a 4-variable K-map, the four corner cells are adjacent and form one group
explain: An EPI is the only cover for some 1, so no minimal SOP can drop it. Don't cares are optional. Group sizes must be powers of 2. The map wraps around, so the corners 0, 2, 8 and 10 form the group B′D′.
```
