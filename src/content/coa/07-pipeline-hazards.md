---
title: Pipeline Hazards
chapter: Pipelining
description: Structural, data and control hazards, RAW, WAR and WAW dependences, stalls and operand forwarding, the load-use hazard, branch penalties and their effect on CPI, and a pipeline simulator that counts stalls.
---
A **hazard** is a situation that prevents the next instruction from executing in its planned cycle. The pipeline must then **stall** (insert bubbles) or use extra hardware to keep going.

## Three kinds of hazards

| Hazard | Cause | Remedies |
| --- | --- | --- |
| **Structural** | Two instructions need the same hardware in the same cycle (for example one memory for both instruction fetch and data access) | Duplicate resources (separate instruction and data caches), or stall |
| **Data** | An instruction needs a result that an earlier instruction has not produced yet | Forwarding, stalls, instruction reordering by the compiler |
| **Control** | The next instruction to fetch depends on a branch that has not been resolved yet | Stall, branch prediction, delayed branches, resolving branches early |

## Data dependences

For instructions I (earlier) and J (later):

| Dependence | Meaning | Example | Hazard in a simple in-order pipeline? |
| --- | --- | --- | --- |
| **RAW** (read after write), true dependence | J reads what I writes | ADD **R1**, R2, R3 / SUB R4, **R1**, R5 | **Yes** |
| **WAR** (write after read), anti-dependence | J writes what I reads | ADD R4, **R1**, R5 / SUB **R1**, R2, R3 | Only with out-of-order execution |
| **WAW** (write after write), output dependence | Both write the same register | ADD **R1**, … / SUB **R1**, … | Only with out-of-order execution or varying latencies |

WAR and WAW are **name** dependences: they disappear if the second instruction writes a different register (**register renaming**).

## Stalls and forwarding

In the 5-stage pipeline, a result is written in WB, but the next instruction reads its registers in ID, three stages earlier.

- **Without forwarding**, a dependent instruction must wait until the producer's WB. If the register file is written in the first half of a cycle and read in the second half, the consumer's ID can share the cycle with the producer's WB. An instruction that uses the result of the one right before it then stalls **2 cycles**.
- **With forwarding** (bypassing), the ALU result is sent straight from the EX/MEM pipeline register to the ALU input of the next instruction: **no stall** for ALU-to-ALU dependences.
- **Load-use hazard**: a load's data is only available at the end of MEM, so an instruction that uses it immediately must stall **1 cycle even with forwarding**. Compilers try to put an independent instruction after each load to fill that slot.

The simulator below computes when each instruction can execute, for the program

```text
LW   R1, 0(R2)
ADD  R3, R1, R4      ; uses the loaded R1 right away
SUB  R5, R3, R6      ; uses the ADD result
SW   R5, 8(R2)       ; uses the SUB result
ADD  R7, R8, R9      ; independent
```

```python
def schedule(program, forwarding):
    ex, prev_ex, stalls = [], 2, 0          # the first instruction executes in cycle 3
    for i, (op, dest, sources) in enumerate(program):
        earliest = prev_ex + 1
        need = earliest
        for j in range(i):
            p_op, p_dest, _ = program[j]
            if p_dest and p_dest in sources:            # RAW dependence on instruction j
                if forwarding:
                    need = max(need, ex[j] + (2 if p_op == "LW" else 1))
                else:
                    need = max(need, ex[j] + 3)         # wait for j's write back
        stalls += need - earliest
        ex.append(need)
        prev_ex = need
    return ex[-1] + 2, stalls                           # last instruction: MEM, WB

program = [("LW", "R1", ["R2"]), ("ADD", "R3", ["R1", "R4"]), ("SUB", "R5", ["R3", "R6"]),
           ("SW", None, ["R5", "R2"]), ("ADD", "R7", ["R8", "R9"])]
for fwd in (False, True):
    total, stalls = schedule(program, fwd)
    print(f"forwarding={fwd!s:5}: {total} cycles, {stalls} stall cycles (no hazards: {len(program) + 4})")
```
```output
forwarding=False: 15 cycles, 6 stall cycles (no hazards: 9)
forwarding=True : 10 cycles, 1 stall cycles (no hazards: 9)
```

Without forwarding, each of the three back-to-back dependences costs 2 stalls. With forwarding only the load-use pair costs 1.

## Control hazards

A branch is resolved late (say in EX), and meanwhile the pipeline has fetched the following instructions. If the branch is taken, those must be **flushed**: the **branch penalty** is the number of wasted cycles.

**CPI = 1 + (fraction of branches) × (fraction that cause a penalty) × (penalty in cycles)**

Example: 20% of instructions are branches with a 3-cycle penalty on every branch: CPI = 1 + 0.2 × 3 = 1.6.

Remedies:

- **Resolve branches earlier** (compute the target and the condition in ID): penalty 1 cycle.
- **Predict not taken**: keep fetching sequentially and flush only if the branch is taken.
- **Dynamic branch prediction**: a branch history table with 1-bit or 2-bit saturating counters, plus a **branch target buffer** to know the target address at fetch time.
- **Delayed branch**: the instruction right after the branch (the **delay slot**) is always executed; the compiler fills it with something useful.

## Practice questions

```quiz
q: In a 5-stage pipeline without forwarding (registers written in the first half of a cycle and read in the second), how many stall cycles does this sequence need? ADD R1, R2, R3; SUB R4, R1, R5; AND R6, R1, R7; OR R8, R4, R6.
answer: 4
verify:
  prog = [("ADD", "R1", ["R2", "R3"]), ("SUB", "R4", ["R1", "R5"]), ("AND", "R6", ["R1", "R7"]), ("OR", "R8", ["R4", "R6"])]
  ex, prev, stalls = [], 2, 0
  for i, (op, d, srcs) in enumerate(prog):
      e = prev + 1
      need = max([e] + [ex[j] + 3 for j in range(i) if prog[j][1] in srcs])
      stalls += need - e
      ex.append(need)
      prev = need
  print(stalls)
explain: SUB needs R1 from the ADD just before it: 2 stalls. AND also needs R1, but by then ADD has written it, so no stall. OR needs R6 from the AND right before it: 2 stalls (R4 from SUB is ready by then). Total 4.
```

```quiz
q: The same sequence runs **with** full forwarding. How many stall cycles are needed?
answer: 0
verify: 0
explain: All the dependences are ALU-to-ALU, and forwarding delivers each ALU result to the next instruction's EX stage just in time. Only loads followed immediately by a use would still stall.
```

```quiz
q: 25% of the instructions in a program are branches, 60% of them are taken, and each taken branch costs 2 cycles. Otherwise the pipeline has CPI 1. What is the effective CPI?
answer: 1.3
verify: round(1 + 0.25 * 0.6 * 2, 6)
explain: CPI = 1 + 0.25 × 0.6 × 2 = 1 + 0.3 = 1.3.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* A load followed immediately by an instruction that uses the loaded value stalls even with forwarding
* WAR and WAW hazards can be removed by register renaming
- Separate instruction and data caches cause structural hazards
* A RAW dependence is a true data dependence
explain: The loaded value only exists after MEM, one cycle too late for the next EX. WAR and WAW are name dependences. Split caches remove the structural hazard of fetching and accessing data in the same cycle. RAW is the only true dependence.
```
