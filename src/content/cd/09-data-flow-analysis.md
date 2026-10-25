---
title: Data-Flow Analysis
chapter: Back End
description: The data-flow framework of gen, kill, in and out sets, liveness analysis (backward), reaching definitions (forward), available expressions, constant propagation, and how each one drives an optimization.
---
Local optimizations look inside one basic block. To optimize across blocks, the compiler must know facts that hold at each point of the control-flow graph, for example "is x used again later?" or "which assignments to x can reach here?". **Data-flow analysis** computes such facts for every block by solving a set of equations iteratively.

## The framework

For each block B:

- **gen[B]** and **kill[B]** (or use and def): what the block itself creates and destroys.
- **in[B]** and **out[B]**: the facts at the block's entry and exit.
- A **transfer function** relates them, and a **meet** operator combines facts from several neighbours: **union** for "may" analyses (true on some path), **intersection** for "must" analyses (true on all paths).

Start from an initial value, apply the equations to all blocks repeatedly, and stop when nothing changes (a **fixed point**).

| Analysis | Direction | Meet | Equation | Used for |
| --- | --- | --- | --- | --- |
| **Liveness** | Backward | ∪ (may) | in = use ∪ (out − def) | Register allocation, dead-code elimination |
| **Reaching definitions** | Forward | ∪ (may) | out = gen ∪ (in − kill) | Constant propagation, use-def chains |
| **Available expressions** | Forward | ∩ (must) | out = e_gen ∪ (in − e_kill) | Global common subexpression elimination |

## Liveness analysis

A variable is **live** at a point if its current value may be **used later** on some path before being redefined. Dead values do not need a register, and an assignment to a variable that is dead right after it is **dead code**.

- **use[B]**: variables used in B **before** any definition in B.
- **def[B]**: variables defined in B.
- out[B] = ∪ in[S] over the successors S of B; in[B] = use[B] ∪ (out[B] − def[B]).

Example CFG (a loop that multiplies y by x while counting x down):

```text
B1: x = 5; y = 1                    → B2
B2: if x > 0                        → B3 (true), B4 (false)
B3: y = y * x; x = x - 1            → B2
B4: z = y + 1; return z
```

```python
import re

blocks = {"B1": ["x = 5", "y = 1"], "B2": ["if x > 0"],
          "B3": ["y = y * x", "x = x - 1"], "B4": ["z = y + 1", "return z"]}
succ = {"B1": ["B2"], "B2": ["B3", "B4"], "B3": ["B2"], "B4": []}

def use_def(stmts):
    use, defined = set(), set()
    for s in stmts:
        m = re.match(r"(\w+) = (.*)", s)
        target, expr = (m.group(1), m.group(2)) if m else (None, s)
        use |= {v for v in re.findall(r"[a-z]\w*", expr) if v not in ("if", "return") and v not in defined}
        if target:
            defined.add(target)
    return use, defined

USE_DEF = {b: use_def(s) for b, s in blocks.items()}
live_in = {b: set() for b in blocks}
live_out = {b: set() for b in blocks}
rounds, changed = 0, True
while changed:
    changed, rounds = False, rounds + 1
    for b in reversed(list(blocks)):                        # backward analysis
        out = set().union(*(live_in[s] for s in succ[b])) if succ[b] else set()
        use, defined = USE_DEF[b]
        inn = use | (out - defined)
        changed |= (inn, out) != (live_in[b], live_out[b])
        live_in[b], live_out[b] = inn, out
for b in blocks:
    print(f"{b}: use {sorted(USE_DEF[b][0])}, def {sorted(USE_DEF[b][1])}, "
          f"live-in {sorted(live_in[b])}, live-out {sorted(live_out[b])}")
print("fixed point after", rounds, "rounds")
```
```output
B1: use [], def ['x', 'y'], live-in [], live-out ['x', 'y']
B2: use ['x'], def [], live-in ['x', 'y'], live-out ['x', 'y']
B3: use ['x', 'y'], def ['x', 'y'], live-in ['x', 'y'], live-out ['x', 'y']
B4: use ['y'], def ['z'], live-in ['y'], live-out []
fixed point after 3 rounds
```

x and y are live around the whole loop. In B4 only y is live on entry: x is never used again after the loop, so its register can be reused, and z is defined before it is used.

## Reaching definitions

A **definition** d of x (an assignment to x) **reaches** a point p if there is a path from d to p on which x is not reassigned. If exactly one definition of x reaches a use, and it assigns a constant, the use can be replaced by that constant (**constant propagation**).

- gen[B]: definitions in B that reach its end.
- kill[B]: all **other** definitions of the variables that B defines.
- in[B] = ∪ out[P] over predecessors P; out[B] = gen[B] ∪ (in[B] − kill[B]).

In the loop above, number the definitions d1: x = 5, d2: y = 1, d3: y = y \* x, d4: x = x − 1, d5: z = y + 1. Then in[B2] = {d1, d2, d3, d4}: both definitions of x (d1 from B1, d4 around the loop) reach the test x > 0, so x is **not** a constant there. In B3, d3 kills d2 and d4 kills d1, so out[B3] = {d3, d4}.

## Available expressions

An expression x + y is **available** at a point if on **every** path to it, x + y has been computed and neither x nor y has been reassigned since. Then a later computation of x + y can reuse the earlier result (**global common subexpression elimination**). Because it is a "must" analysis, the meet is intersection, and the initial value of in[B] (for blocks other than the entry) is the set of **all** expressions.

## Constant propagation

Constant propagation tracks, for every variable, whether it is a known constant at each point. It combines values with a lattice: "undefined" (no value seen yet) ≤ a specific constant ≤ "not a constant". If two paths bring different constants for x, x becomes "not a constant". The result lets the compiler fold expressions, remove branches whose condition is known, and then delete unreachable code.

## Practice questions

```quiz
q: In the CFG B1: a = 3; b = 4 → B2; B2: c = a + b; if c > 10 → B3, B4; B3: a = c − 1 → B2; B4: d = b \* 2; print(d), which variables are live at the exit of B2?
code: python
  import re
  blocks = {"B1": ["a = 3", "b = 4"], "B2": ["c = a + b", "if c > 10"], "B3": ["a = c - 1"], "B4": ["d = b * 2", "print(d)"]}
  succ = {"B1": ["B2"], "B2": ["B3", "B4"], "B3": ["B2"], "B4": []}
  def ud(stmts):
      use, de = set(), set()
      for s in stmts:
          m = re.match(r"(\w+) = (.*)", s)
          lhs, rhs = (m.group(1), m.group(2)) if m else (None, s)
          use |= {v for v in re.findall(r"[a-z]\w*", rhs) if v not in ("if", "print") and v not in de}
          if lhs: de.add(lhs)
      return use, de
  U = {b: ud(s) for b, s in blocks.items()}
  live_in = {b: set() for b in blocks}
  for _ in range(10):
      for b in blocks:
          out = set().union(*(live_in[s] for s in succ[b])) if succ[b] else set()
          live_in[b] = U[b][0] | (out - U[b][1])
  print("{" + ", ".join(sorted(live_in["B3"] | live_in["B4"])) + "}")
- `{a, b}`
* `{b, c}`
- `{a, b, c}`
- `{c}`
explain: live-in(B2) = {a, b}, so live-out(B3) = {a, b} and live-in(B3) = use(B3) ∪ (live-out(B3) − def(B3)) = {c} ∪ ({a, b} − {a}) = {b, c}. live-in(B4) = {b}. Hence live-out(B2) = {b, c} ∪ {b} = {b, c}. a is dead at that point: B3 redefines it before using it, and B4 never uses it.
```

```quiz
q: Which data-flow analysis is a **backward** analysis?
* Liveness analysis
- Reaching definitions
- Available expressions
- Constant propagation
explain: Liveness asks whether a value will be used in the future, so information flows from the uses backwards. The other three flow forward from definitions or computations.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Available-expressions analysis uses intersection as its meet operator
* An assignment to a variable that is not live afterwards is dead code (if it has no side effects)
- Reaching definitions is a "must" analysis
* Liveness information is used for register allocation
explain: An expression must be available along every path, hence intersection. A dead assignment's value is never used. Reaching definitions is a "may" analysis (union over paths). Two variables that are never live at the same time can share a register.
```
