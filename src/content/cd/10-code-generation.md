---
title: Code Generation and Register Allocation
chapter: Back End
description: The final compiler phase: target machine model, instruction selection, the Sethi-Ullman (Ershov) labelling for minimum registers, register allocation by graph colouring, spilling, and instruction scheduling.
---
The **code generator** turns intermediate code into instructions for the target machine. It has three jobs: **instruction selection** (which instructions), **register allocation** (which values live in registers), and **instruction ordering** (in what order). Doing all three optimally is NP-hard, so compilers use good heuristics.

## A simple target machine

A typical load/store machine has registers R0, R1, … and instructions such as:

| Instruction | Meaning |
| --- | --- |
| LD R, x | R = x (load from memory) |
| ST x, R | x = R (store to memory) |
| ADD R1, R2, R3 | R1 = R2 + R3 (also SUB, MUL) |

Memory access is far slower than a register, so the main goal is to keep values in registers and avoid loads and stores.

## Instruction selection

Each intermediate-code pattern is matched to target instructions, often by **tree pattern matching** (tiling the expression tree with instruction patterns of known cost). Special instructions help: x = x + 1 can become INC x.

## How many registers does an expression need?

The **Sethi–Ullman (Ershov) number** of each node of an expression tree:

- A leaf gets label 1.
- An interior node with children labelled l₁ and l₂ gets **max(l₁, l₂) if they differ**, and **l₁ + 1 if they are equal**.

The root's label is the minimum number of registers needed to evaluate the tree without storing temporaries. The algorithm evaluates the child with the **larger** label first.

```tree
caption: Ershov numbers for (a + b) * (c − (d + e))
* | 3
  + | 2
    a | 1
    b | 1
  − | 2
    c | 1
    + | 2
      d | 1
      e | 1
```

```python
tree = ("*", ("+", "a", "b"), ("-", "c", ("+", "d", "e")))
OPS = {"+": "ADD", "-": "SUB", "*": "MUL"}

def label(n):                          # Sethi-Ullman (Ershov) number
    if isinstance(n, str):
        return 1
    l, r = label(n[1]), label(n[2])
    return l + 1 if l == r else max(l, r)

code = []
def gen(n, base):                      # leaves the value of n in register R{base}
    if isinstance(n, str):
        code.append(f"LD R{base}, {n}")
        return
    op, left, right = n
    if label(right) > label(left):     # evaluate the needier side first
        gen(right, base)
        gen(left, base + 1)
        code.append(f"{OPS[op]} R{base}, R{base + 1}, R{base}")
    else:
        gen(left, base)
        gen(right, base + 1)
        code.append(f"{OPS[op]} R{base}, R{base}, R{base + 1}")

print("registers needed:", label(tree))
gen(tree, 0)
print("\n".join(code))
```
```output
registers needed: 3
LD R0, a
LD R1, b
ADD R0, R0, R1
LD R1, d
LD R2, e
ADD R1, R1, R2
LD R2, c
SUB R1, R2, R1
MUL R0, R0, R1
```

## Register allocation by graph colouring

1. Find the **live ranges** of variables (using [liveness analysis](data-flow-analysis.html)).
2. Build the **interference graph**: one node per variable, an edge between two variables that are live at the same time.
3. **Colour** the graph with k colours, k = number of registers. Variables with the same colour share a register.
4. If the graph cannot be coloured with k colours, **spill** a variable to memory (store after definition, load before use) and try again. Chaitin's heuristic repeatedly removes nodes with degree < k.

The minimum number of registers needed equals the **chromatic number** of the interference graph, which is at least the size of its largest clique (the maximum number of variables live at one point).

## Instruction scheduling

Reordering independent instructions hides latency, for example starting a load early so its result is ready when needed and filling pipeline delay slots, without changing the program's meaning (data dependences must be kept).

## GATE-style practice questions

```quiz
q: What is the Ershov number (minimum registers without spilling) of the expression a + b?
answer: 2
verify: 1 + 1
explain: Both leaves have label 1; equal labels give 1 + 1 = 2.
```

```quiz
q: What is the minimum number of registers needed to evaluate (a + b) + (c + d) + (e + f), parsed left to right as ((a + b) + (c + d)) + (e + f), without storing temporaries?
answer: 3
verify:
  def lab(n):
      if isinstance(n, str):
          return 1
      l, r = lab(n[1]), lab(n[2])
      return l + 1 if l == r else max(l, r)
  print(lab(("+", ("+", ("+", "a", "b"), ("+", "c", "d")), ("+", "e", "f"))))
explain: (a + b) and (c + d) have label 2, so their sum has 3; adding (e + f) (label 2) keeps the maximum, 3.
```

```quiz
q: At one program point, 5 variables are live at the same time, and no point has more. What is the least number of registers that avoids spilling, if the interference graph is a clique there?
answer: 5
verify: 5
explain: Five simultaneously live variables form a clique in the interference graph, needing 5 different colours (registers).
```

```quiz
q: In register allocation by graph colouring, two variables are joined by an edge when:
* They are live at the same time
- They appear in the same expression
- One is defined before the other
- They have the same type
explain: Interfering (simultaneously live) variables cannot share a register.
```
