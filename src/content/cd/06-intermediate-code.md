---
title: Intermediate Code Generation
chapter: Back End
description: Why compilers use an intermediate representation, syntax trees and DAGs, three-address code, quadruples, triples and indirect triples, translating expressions and control flow, and static single assignment form.
---
After analysis, the compiler translates the program into an **intermediate representation (IR)**: simpler than the source language, independent of the target machine, and easy to optimize.

## Syntax trees and DAGs

A **syntax tree** keeps only the essential structure of the parse tree: operators as interior nodes, operands as leaves. A **directed acyclic graph (DAG)** is a syntax tree in which identical subexpressions are **shared** as one node, so it exposes **common subexpressions**.

For `a = b * -c + b * -c`, the syntax tree contains `b * -c` twice; the DAG has it once, with two edges pointing to it.

## Three-address code

**Three-address code (TAC)** has at most one operator on the right side of each instruction, so complex expressions are broken up with **temporaries**:

| Form | Example |
| --- | --- |
| Assignment with a binary operator | x = y op z |
| Unary operator | x = op y (for example x = minus y) |
| Copy | x = y |
| Unconditional jump | goto L |
| Conditional jump | if x relop y goto L, ifFalse x goto L |
| Procedure call | param x; call p, n; return y |
| Indexed copy | x = y[i], x[i] = y |
| Address and pointer | x = &y, x = \*y, \*x = y |

`a = b * -c + b * -c` becomes (from the syntax tree, without sharing):

```text
t1 = minus c
t2 = b * t1
t3 = minus c
t4 = b * t3
t5 = t2 + t4
a  = t5
```

From the DAG, the common subexpression is computed once: t1 = minus c; t2 = b \* t1; t3 = t2 + t2; a = t3.

## Building the DAG of a basic block

**Value numbering** builds the DAG while reading the code: before creating a node (op, left, right), look it up; if an identical node exists, reuse it.

```python
def build_dag(block):
    nodes, table, current = [], {}, {}            # current: variable -> node number

    def leaf(name):
        if name not in current:
            nodes.append(("leaf", name))
            current[name] = len(nodes) - 1
        return current[name]

    for target, op, *args in block:
        operands = tuple(leaf(a) for a in args)
        key = (op, operands)
        if key not in table:                      # new value: create a node
            nodes.append(key)
            table[key] = len(nodes) - 1
        current[target] = table[key]              # reuse: common subexpression
    return nodes, current

block = [("t1", "minus", "c"), ("t2", "*", "b", "t1"), ("t3", "minus", "c"),
         ("t4", "*", "b", "t3"), ("t5", "+", "t2", "t4"), ("a", "copy", "t5")]
nodes, current = build_dag(block)
for n, node in enumerate(nodes):
    print(n, node)
print("nodes in the DAG:", len(nodes), "| statements:", len(block))
```
```output
0 ('leaf', 'c')
1 ('minus', (0,))
2 ('leaf', 'b')
3 ('*', (2, 1))
4 ('+', (3, 3))
5 ('copy', (4,))
nodes in the DAG: 6 | statements: 6
```

t3 = minus c gets the same node as t1, and t4 = b \* t3 the same as t2, so the DAG has 6 nodes (2 leaves, the operations minus, \*, + and the copy) for 6 statements.

## Quadruples, triples and indirect triples

Three ways to store TAC, shown for `a = b * -c + b * -c`:

| # | Quadruple (op, arg1, arg2, result) | Triple (op, arg1, arg2) |
| --- | --- | --- |
| 0 | (minus, c, –, t1) | (minus, c, –) |
| 1 | (\*, b, t1, t2) | (\*, b, (0)) |
| 2 | (minus, c, –, t3) | (minus, c, –) |
| 3 | (\*, b, t3, t4) | (\*, b, (2)) |
| 4 | (+, t2, t4, t5) | (+, (1), (3)) |
| 5 | (=, t5, –, a) | (=, a, (4)) |

- **Quadruples** name every result explicitly with a temporary. Instructions can be moved freely during optimization, since references are by name. They need more space and many temporaries in the symbol table.
- **Triples** refer to earlier results by their **position**, so no temporaries are needed, but moving an instruction changes every reference to it.
- **Indirect triples** keep a separate list of pointers to triples; optimization reorders the pointer list, and the triples themselves stay put.

## Control flow

`if (a < b) x = 1; else x = 2;` becomes

```text
    if a < b goto L1
    x = 2
    goto L2
L1: x = 1
L2:
```

and `while (i < n) i = i + 1;` becomes

```text
L1: ifFalse i < n goto L2
    i = i + 1
    goto L1
L2:
```

Boolean expressions are often translated with **short-circuit** code: in `a < b || c < d`, the second comparison is skipped when the first is true. **Backpatching** fills in jump targets that are not yet known when the jump is generated.

## Static single assignment (SSA)

In **SSA form**, every variable is assigned **exactly once**. Each new assignment creates a new version (x₁, x₂, …). Where control-flow paths join, a **φ-function** chooses the version from the path actually taken: x₃ = φ(x₁, x₂). SSA makes many optimizations (constant propagation, dead-code elimination) simpler, because each use has exactly one definition. LLVM IR and GCC's GIMPLE use SSA.

For straight-line code, converting to SSA just renames each assignment:

```text
x = a + b        x1 = a + b
y = x * c        y1 = x1 * c
x = y - a   →    x2 = y1 - a
z = x + y        z1 = x2 + y1
```

The SSA version uses the 3 inputs (a, b, c) and 4 assigned versions: 7 variables in all.

## Practice questions

```quiz
q: How many nodes does the DAG for the basic block `p = x + y; q = x + y; r = p * q; s = r - z` have (count leaves and interior nodes, not the variable labels)?
answer: 6
verify:
  nodes, table, cur = [], {}, {}
  def leaf(n):
      if n not in cur:
          nodes.append(n); cur[n] = len(nodes) - 1
      return cur[n]
  for t, op, a, b in [("p", "+", "x", "y"), ("q", "+", "x", "y"), ("r", "*", "p", "q"), ("s", "-", "r", "z")]:
      key = (op, leaf(a), leaf(b))
      if key not in table:
          nodes.append(key); table[key] = len(nodes) - 1
      cur[t] = table[key]
  print(len(nodes))
explain: Leaves x, y and z, plus the interior nodes x + y (shared by p and q), (x + y) * (x + y) and the subtraction: 3 + 3 = 6.
```

```quiz
q: Which representation refers to earlier instructions by their position, so it needs no temporary names?
- Quadruples
* Triples
- Syntax trees
- SSA form
explain: A triple (op, arg1, arg2) uses the index of an earlier triple as an operand. Quadruples name results with temporaries; indirect triples add a list of pointers to triples so they can be reordered.
```

```quiz
q: The straight-line code `a = b + c; b = a - d; c = b + c; d = a - d` is converted to SSA form. How many distinct variables (original inputs plus new versions) does the SSA code use?
answer: 7
verify:
  code = [("a", ["b", "c"]), ("b", ["a", "d"]), ("c", ["b", "c"]), ("d", ["a", "d"])]
  inputs, assigned = set(), set()
  for target, uses in code:
      inputs |= {u for u in uses if u not in assigned}
      assigned.add(target)
  print(len(inputs) + len(code))
explain: The inputs used before being assigned are b, c and d (3 variables: a is assigned before its first use). Each of the 4 assignments creates a new version: a1, b1, c1, d1. Total 3 + 4 = 7.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* A DAG exposes common subexpressions in a basic block
* In SSA form, every variable is assigned exactly once
- Three-address code allows any number of operators on the right side of an assignment
* Indirect triples make it easy to reorder instructions during optimization
explain: Identical subexpressions share one DAG node. SSA's defining property is single assignment (with φ-functions at joins). TAC has at most one operator per instruction. Indirect triples reorder a list of pointers instead of the triples.
```
