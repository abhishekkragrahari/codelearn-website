---
title: Basic Blocks and Code Optimization
chapter: Back End
description: Partitioning code into basic blocks with leaders, control-flow graphs, local optimizations (constant folding, common subexpressions, copy propagation, dead code), loop optimizations (code motion, induction variables, strength reduction), and peephole optimization.
---
**Code optimization** transforms the intermediate code so that it runs faster or uses less space, **without changing what the program computes**. Most optimizations work on **basic blocks** and the **control-flow graph** that connects them.

## Basic blocks

A **basic block** is a maximal sequence of consecutive instructions that control enters only at the first instruction and leaves only at the last (no jumps into the middle, no jumps out except at the end).

To find them, first find the **leaders**:

1. The **first instruction** of the program is a leader.
2. Every **target** of a jump (conditional or unconditional) is a leader.
3. Every instruction that **immediately follows** a jump is a leader.

Each basic block runs from a leader up to (not including) the next leader.

The **control-flow graph (CFG)** has the basic blocks as nodes, and an edge B → C when C can run right after B: either B ends with a jump to C's leader, or C follows B in the code and B does not end with an unconditional jump.

```python
import re

code = [
    "s = 0",                    # 1
    "i = 1",                    # 2
    "t1 = i * 4",               # 3
    "t2 = a[t1]",               # 4
    "s = s + t2",               # 5
    "i = i + 1",                # 6
    "if i <= n goto 3",         # 7
    "if s > 100 goto 11",       # 8
    "r = 0",                    # 9
    "goto 12",                  # 10
    "r = 1",                    # 11
    "return r",                 # 12
]

def target(instr):
    m = re.search(r"goto (\d+)", instr)
    return int(m.group(1)) if m else None

leaders = {1}
for n, instr in enumerate(code, 1):
    if target(instr):
        leaders.add(target(instr))                   # rule 2
        if n < len(code):
            leaders.add(n + 1)                       # rule 3
leaders = sorted(leaders)
blocks = [(start, (leaders[k + 1] - 1) if k + 1 < len(leaders) else len(code))
          for k, start in enumerate(leaders)]
edges = []
for k, (start, end) in enumerate(blocks):
    last = code[end - 1]
    if target(last):
        edges.append((k, next(b for b, (s, _) in enumerate(blocks) if s == target(last))))
    if not last.startswith("goto") and k + 1 < len(blocks):
        edges.append((k, k + 1))
print("leaders:", leaders)
for k, (start, end) in enumerate(blocks):
    print(f"B{k}: instructions {start}-{end}")
print("edges:", sorted(f"B{a}->B{b}" for a, b in edges))
```
```output
leaders: [1, 3, 8, 9, 11, 12]
B0: instructions 1-2
B1: instructions 3-7
B2: instructions 8-8
B3: instructions 9-10
B4: instructions 11-11
B5: instructions 12-12
edges: ['B0->B1', 'B1->B1', 'B1->B2', 'B2->B3', 'B2->B4', 'B3->B5', 'B4->B5']
```

## Local optimizations (within a basic block)

| Optimization | Before | After |
| --- | --- | --- |
| **Constant folding** | x = 2 \* 3.14 | x = 6.28 |
| **Constant propagation** | n = 10; y = n \* 2 | n = 10; y = 20 |
| **Common subexpression elimination** | a = b + c; d = b + c | a = b + c; d = a |
| **Copy propagation** | x = y; z = x + 1 | x = y; z = y + 1 |
| **Dead code elimination** | x = 5 (x never used afterwards) | (removed) |
| **Algebraic simplification** | x = y \* 1; z = w + 0 | x = y; z = w |
| **Strength reduction** | x = y \* 2; z = w \*\* 2 | x = y + y (or y << 1); z = w \* w |

These often enable each other: copy propagation turns an assignment into dead code, which is then removed. The DAG of a basic block (previous lesson) finds common subexpressions automatically.

## Loop optimizations

Programs spend most of their time in loops, so loop optimizations pay off the most.

- **Loop-invariant code motion**: move a computation whose value does not change inside the loop to just before the loop. `while (i < n) { x = y + z; a[i] = x * i; i++; }` computes y + z once, before the loop.
- **Induction variable elimination and strength reduction**: in the CFG example above, t1 = i \* 4 grows by 4 in every iteration. Replace the multiplication by t1 = t1 + 4 (strength reduction), and if i is then used only for the loop test, test t1 instead (eliminating i).
- **Loop unrolling**: repeat the body several times per iteration, reducing the number of tests and jumps.
- **Loop jamming (fusion)**: merge two loops over the same range into one.

## Peephole optimization

A **peephole optimizer** slides a small window over the target code and replaces short instruction sequences with better ones:

- remove redundant loads and stores (`STORE R1, x` followed by `LOAD R1, x`),
- remove unreachable code and jumps to the next instruction,
- collapse jump chains (`goto L1` where L1: `goto L2` becomes `goto L2`),
- algebraic simplification and use of special instructions (`INC` instead of `ADD 1`).

## Practice questions

```quiz
q: How many basic blocks does this code have? 1: a = 0; 2: b = 1; 3: if a > b goto 7; 4: c = a + b; 5: a = c; 6: goto 3; 7: d = a * 2; 8: if d < 10 goto 2; 9: return d
answer: 6
verify:
  import re
  code = ["a = 0", "b = 1", "if a > b goto 7", "c = a + b", "a = c", "goto 3", "d = a * 2", "if d < 10 goto 2", "return d"]
  leaders = {1}
  for n, ins in enumerate(code, 1):
      m = re.search(r"goto (\d+)", ins)
      if m:
          leaders.add(int(m.group(1)))
          if n < len(code): leaders.add(n + 1)
  print(len(leaders))
explain: The leaders are 1 (first instruction), 2 (target of the jump in 8), 3 (target of the jump in 6), 4 (follows the jump in 3), 7 (target of the jump in 3, and follows the jump in 6) and 9 (follows the jump in 8). Six leaders give six blocks: {1}, {2}, {3}, {4, 5, 6}, {7, 8} and {9}.
```

```quiz
q: Which optimization replaces `t = i * 8` inside a loop, where i increases by 1 each iteration, by `t = t + 8`?
- Constant folding
- Copy propagation
* Strength reduction
- Dead code elimination
explain: A multiplication by a loop induction variable is replaced by a cheaper addition that updates the value incrementally: strength reduction on an induction variable.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The target of any jump is a leader
* An instruction immediately after a conditional jump is a leader
- A basic block may contain a jump in its middle
* Loop-invariant code motion moves computations whose value does not change inside a loop to before the loop
explain: Control can enter at jump targets and at the fall-through after a jump, so both start blocks. Jumps can only be the last instruction of a block. Code motion hoists invariant computations out of the loop.
```
