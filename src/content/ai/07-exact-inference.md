---
title: Exact Inference - Enumeration and Variable Elimination
chapter: Reasoning under Uncertainty
description: Answering queries in a Bayesian network exactly, inference by enumeration, factors, pointwise products and summing out, the variable elimination algorithm, elimination order and complexity, with a fully worked GATE DA example.
---
**Inference** in a Bayesian network means computing the **posterior distribution** P(X | **e**) of a query variable X given observed **evidence** **e**, summing over the remaining **hidden** variables **Y**:

**P(X | e) = α P(X, e) = α Σ<sub>y</sub> P(X, e, y)**

Every term P(X, **e**, **y**) is one entry of the full joint distribution, which the network gives as a product of CPT entries.

This lesson uses the sprinkler network from the previous lesson:

| CPT | Probabilities |
| --- | --- |
| P(C) | 0.5 |
| P(S \| C) | C true: 0.1, C false: 0.5 |
| P(R \| C) | C true: 0.8, C false: 0.2 |
| P(W \| S, R) | S, R: 0.99; S, ¬R: 0.90; ¬S, R: 0.90; ¬S, ¬R: 0.05 |

**Query:** the grass is wet. How likely is it that it rained? We want P(R | w).

## Inference by enumeration

Write out the sum directly:

P(R, w) = Σ<sub>c</sub> Σ<sub>s</sub> P(c) P(s | c) P(R | c) P(w | s, R)

For R = true, the four terms are:

| C | S | P(c) P(s \| c) P(r \| c) P(w \| s, r) | Value |
| --- | --- | --- | --- |
| T | T | 0.5 × 0.1 × 0.8 × 0.99 | 0.0396 |
| T | F | 0.5 × 0.9 × 0.8 × 0.90 | 0.3240 |
| F | T | 0.5 × 0.5 × 0.2 × 0.99 | 0.0495 |
| F | F | 0.5 × 0.5 × 0.2 × 0.90 | 0.0450 |

So P(r, w) = 0.4581. The same sum for R = false gives P(¬r, w) = 0.2035. Normalising:

P(r | w) = 0.4581 / (0.4581 + 0.2035) = 0.4581 / 0.6616 ≈ **0.692**.

Enumeration is simple but wasteful: with n Boolean variables it touches O(2ⁿ) terms, and it recomputes the same sub-products many times. In the table, P(c) P(r | c) is computed twice for each value of C.

## Variable elimination

**Variable elimination** (VE) does the same sum, but pushes each summation as far to the right as possible and stores intermediate results in tables called **factors**:

P(R, w) = Σ<sub>c</sub> P(c) P(R | c) **Σ<sub>s</sub> P(s | c) P(w | s, R)**

Two operations on factors are needed:

- **Pointwise product**: multiply two factors to get a factor over the union of their variables. For example, f(A, B) × g(B, C) = h(A, B, C), where h(a, b, c) = f(a, b) g(b, c).
- **Summing out** a variable: add up the entries of a factor over all values of that variable, which removes it. Σ<sub>b</sub> h(A, B, C) = h′(A, C).

**Step 1: eliminate S.** Multiply the factors that mention S, P(S | C) and P(w | S, R), and sum out S:

f₁(C, R) = Σ<sub>s</sub> P(s | C) P(w | s, R)

| C | R | Calculation | f₁ |
| --- | --- | --- | --- |
| T | T | 0.1 × 0.99 + 0.9 × 0.90 | 0.909 |
| T | F | 0.1 × 0.90 + 0.9 × 0.05 | 0.135 |
| F | T | 0.5 × 0.99 + 0.5 × 0.90 | 0.945 |
| F | F | 0.5 × 0.90 + 0.5 × 0.05 | 0.475 |

**Step 2: eliminate C.** Multiply the factors that mention C, P(C), P(R | C) and f₁(C, R), and sum out C:

f₂(R) = Σ<sub>c</sub> P(c) P(R | c) f₁(c, R)

- f₂(r) = 0.5 × 0.8 × 0.909 + 0.5 × 0.2 × 0.945 = 0.3636 + 0.0945 = **0.4581**
- f₂(¬r) = 0.5 × 0.2 × 0.135 + 0.5 × 0.8 × 0.475 = 0.0135 + 0.19 = **0.2035**

**Step 3: normalise.** P(R | w) = α ⟨0.4581, 0.2035⟩ = ⟨0.692, 0.308⟩, the same answer as enumeration.

```python
from itertools import product

# A factor is (variables, table) where table maps a tuple of values to a number.
def make(vars_, fn):
    return (vars_, {vals: fn(*vals) for vals in product([True, False], repeat=len(vars_))})

def multiply(f, g):
    vs = f[0] + tuple(v for v in g[0] if v not in f[0])
    def val(*vals):
        a = dict(zip(vs, vals))
        return f[1][tuple(a[v] for v in f[0])] * g[1][tuple(a[v] for v in g[0])]
    return make(vs, val)

def sum_out(var, f):
    vs = tuple(v for v in f[0] if v != var)
    def val(*vals):
        a = dict(zip(vs, vals))
        return sum(f[1][tuple(a[v] if v != var else x for v in f[0])] for x in (True, False))
    return make(vs, val)

pS = {True: 0.1, False: 0.5}
pR = {True: 0.8, False: 0.2}
pW = {(True, True): 0.99, (True, False): 0.90, (False, True): 0.90, (False, False): 0.05}

fC = make(("C",), lambda c: 0.5)
fS = make(("S", "C"), lambda s, c: pS[c] if s else 1 - pS[c])
fR = make(("R", "C"), lambda r, c: pR[c] if r else 1 - pR[c])
fW = make(("S", "R"), lambda s, r: pW[(s, r)])          # evidence w = true is already fixed

f1 = sum_out("S", multiply(fS, fW))
print("f1(C, R):", {k: round(v, 4) for k, v in f1[1].items()}, "over", f1[0])
f2 = sum_out("C", multiply(multiply(fC, fR), f1))
print("f2(R):", {k: round(v, 4) for k, v in f2[1].items()})
total = sum(f2[1].values())
print(f"P(w) = {total:.4f}, P(r | w) = {f2[1][(True,)] / total:.4f}")
```
```output
f1(C, R): {(True, True): 0.909, (True, False): 0.135, (False, True): 0.945, (False, False): 0.475} over ('C', 'R')
f2(R): {(True,): 0.4581, (False,): 0.2035}
P(w) = 0.6616, P(r | w) = 0.6924
```

## Elimination order and complexity

VE gives the same answer for **any** order of elimination, but the cost depends on the order, because the cost is dominated by the **largest factor** created along the way (a factor over k Boolean variables has 2ᵏ entries).

- For **polytrees** (networks with at most one undirected path between any two nodes, i.e. no undirected cycles), VE takes time **linear** in the size of the network with a good order.
- In general, exact inference in Bayesian networks is **NP-hard** (it includes propositional satisfiability as a special case). This is why approximate methods (next lesson) are needed for large networks.
- **Irrelevant variables** can be dropped before starting: any variable that is not an ancestor of the query or evidence variables sums to 1 and can be removed. To compute P(R | c) in the sprinkler network, S and W are irrelevant.

## Practice questions

```quiz
q: Using the sprinkler network, what is P(w), the probability that the grass is wet (with no other evidence)? Give the answer to four decimal places.
answer: 0.6616
verify:
  from itertools import product
  pS, pR = {1: 0.1, 0: 0.5}, {1: 0.8, 0: 0.2}
  pW = {(1, 1): 0.99, (1, 0): 0.9, (0, 1): 0.9, (0, 0): 0.05}
  print(round(sum(0.5 * (pS[c] if s else 1 - pS[c]) * (pR[c] if r else 1 - pR[c]) * pW[(s, r)] for c, s, r in product([1, 0], repeat=3)), 4))
explain: P(w) = P(r, w) + P(¬r, w) = 0.4581 + 0.2035 = 0.6616, the normalising constant from the worked example.
```

```quiz
q: Using the sprinkler network, what is P(c | w), the probability that it was cloudy given that the grass is wet? Give the answer to three decimal places.
answer: 0.570
verify:
  from itertools import product
  pS, pR = {1: 0.1, 0: 0.5}, {1: 0.8, 0: 0.2}
  pW = {(1, 1): 0.99, (1, 0): 0.9, (0, 1): 0.9, (0, 0): 0.05}
  j = lambda c, s, r: 0.5 * (pS[c] if s else 1 - pS[c]) * (pR[c] if r else 1 - pR[c]) * pW[(s, r)]
  num = sum(j(1, s, r) for s, r in product([1, 0], repeat=2))
  den = sum(j(c, s, r) for c, s, r in product([1, 0], repeat=3))
  print(f"{num / den:.3f}")
explain: P(c, w) = Σ<sub>s,r</sub> P(c) P(s | c) P(r | c) P(w | s, r) = 0.5 × (0.1 × 0.8 × 0.99 + 0.1 × 0.2 × 0.90 + 0.9 × 0.8 × 0.90 + 0.9 × 0.2 × 0.05) = 0.5 × 0.7542 = 0.3771. Dividing by P(w) = 0.6616 gives about 0.570.
```

```quiz
q: Two factors f(A, B) and g(B, C, D) over Boolean variables are multiplied pointwise. How many entries does the resulting factor have?
answer: 16
verify: 2 ** len({"A", "B"} | {"B", "C", "D"})
explain: The product is a factor over the union {A, B, C, D}: 2⁴ = 16 entries.
```

```quiz
q: To compute P(R | c) in the sprinkler network (C → S, C → R, S → W, R → W), which variables are **irrelevant** and can be removed before inference? (Select all that apply.)
* S
* W
- C
- R
explain: A variable that is not an ancestor of the query (R) or the evidence (C) sums out to 1. S and W are descendants only, so they can be dropped. Then P(R | c) is just read from the CPT: 0.8.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Variable elimination gives the same answer for every elimination order
- Exact inference takes polynomial time in every Bayesian network
* Exact inference is linear-time in polytrees with a good elimination order
- Enumeration is always faster than variable elimination
explain: The order changes only the cost, not the result. Exact inference is NP-hard in general but easy in polytrees. Enumeration repeats work that VE caches in factors, so VE is never slower by more than a constant factor and is usually much faster.
```
