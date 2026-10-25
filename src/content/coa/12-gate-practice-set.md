---
title: COA GATE Practice Set
chapter: GATE Practice
description: Mixed GATE-style questions on performance, instruction formats, addressing, Booth multiplication, microprogramming, pipelining and hazards, caches, memory design and DMA.
---
These questions mix every lesson of the Computer Organization track, in the three GATE formats. Keep units straight (ns versus cycles, bytes versus words) and write each formula before substituting numbers. Every numerical answer is recomputed by a program when the site is built.

## Processor and instructions

```quiz
q: **[Performance]** A program executes 4 × 10⁹ instructions with a CPI of 1.25 on a 2 GHz processor. How many seconds does it run?
answer: 2.5
verify: round(4e9 * 1.25 / 2e9, 6)
explain: CPU time = IC × CPI / f = 4 × 10⁹ × 1.25 / (2 × 10⁹) = 2.5 s.
```

```quiz
q: **[Amdahl]** 70% of a program's time is spent in code that a new unit speeds up 5 times. What is the overall speedup? Give the answer to two decimal places.
answer: 2.27
verify: round(1 / (0.3 + 0.7 / 5), 2)
explain: Speedup = 1 / (0.3 + 0.14) = 1 / 0.44 ≈ 2.27.
```

```quiz
q: **[Instruction format]** A 24-bit instruction contains an opcode, one register field and a signed immediate. There are 64 opcodes and 32 registers. How many bits does the immediate field have?
answer: 13
verify: 24 - 6 - 5
explain: 64 opcodes need 6 bits and 32 registers need 5 bits, leaving 24 − 6 − 5 = 13 bits (immediates from −4096 to 4095).
```

```quiz
q: **[Booth]** How many additions and subtractions does Booth's algorithm perform for the 8-bit multiplier 10110110?
answer: 5
verify:
  m = "10110110"
  b = m + "0"
  print(sum(1 for i in range(len(m)) if b[i] != b[i + 1]))
explain: Append a 0 and count the places where neighbouring bits differ in 10110110|0: between bits 7–6 (10), 6–5 (01), 4–3 (10), 3–2 (01) and 1–0 (10). That is 5 operations.
```

```quiz
q: **[Microprogramming]** A vertical microinstruction encodes three mutually exclusive groups of 7, 15 and 3 control signals (each group also needs a "none" code), selects one of 8 branch conditions, and has a next-address field for a 512-word control memory. How wide is the microinstruction?
answer: 21
verify: sum(__import__("math").ceil(__import__("math").log2(k + 1)) for k in [7, 15, 3]) + 3 + 9
explain: Control fields: ⌈log₂ 8⌉ + ⌈log₂ 16⌉ + ⌈log₂ 4⌉ = 3 + 4 + 2 = 9 bits. Condition select: 3 bits. Next address: log₂ 512 = 9 bits. Total 21.
```

## Pipelining

```quiz
q: **[Pipeline time]** A 5-stage pipeline has stages of 200 ps each and pipeline registers of 20 ps. How many picoseconds do 50 instructions take, with no stalls?
answer: 11880
verify: (5 + 50 - 1) * (200 + 20)
explain: Clock period 220 ps; (5 + 50 − 1) = 54 cycles; 54 × 220 = 11,880 ps.
```

```quiz
q: **[Hazards]** In a 5-stage pipeline with full forwarding, how many stall cycles does this code need? LW R1, 0(R5); LW R2, 0(R6); ADD R3, R1, R2; LW R4, 0(R3); SUB R7, R4, R1.
answer: 2
verify:
  prog = [("LW", "R1", ["R5"]), ("LW", "R2", ["R6"]), ("ADD", "R3", ["R1", "R2"]), ("LW", "R4", ["R3"]), ("SUB", "R7", ["R4", "R1"])]
  ex, prev, stalls = [], 2, 0
  for i, (op, d, srcs) in enumerate(prog):
      e = prev + 1
      need = max([e] + [ex[j] + (2 if prog[j][0] == "LW" else 1) for j in range(i) if prog[j][1] in srcs])
      stalls += need - e
      ex.append(need)
      prev = need
  print(stalls)
explain: ADD uses R2 loaded by the instruction just before it: a load-use stall of 1. The LW R4 uses R3 from ADD, which forwarding handles. SUB uses R4 loaded just before it: 1 more stall. Total 2.
```

```quiz
q: **[Branches]** 20% of instructions are branches, 40% of branches are taken, and a taken branch costs 3 cycles. With a base CPI of 1, what is the effective CPI?
answer: 1.24
verify: round(1 + 0.2 * 0.4 * 3, 6)
explain: CPI = 1 + 0.2 × 0.4 × 3 = 1 + 0.24 = 1.24.
```

## Memory and I/O

```quiz
q: **[Cache fields]** A 32 KB direct-mapped cache has 32-byte blocks, and addresses are 32 bits. How many tag bits are there?
answer: 17
verify:
  from math import log2
  print(32 - int(log2(32 * 1024 // 32)) - int(log2(32)))
explain: 1024 lines give a 10-bit index, 32-byte blocks a 5-bit offset: tag = 32 − 10 − 5 = 17 bits.
```

```quiz
q: **[AMAT]** L1: 2 ns hit time, 5% miss rate. L2: 20 ns hit time, 10% local miss rate. Memory: 200 ns. What is the average memory access time in ns?
answer: 4
verify: round(2 + 0.05 * (20 + 0.1 * 200), 6)
explain: AMAT = 2 + 0.05 × (20 + 0.1 × 200) = 2 + 0.05 × 40 = 4 ns.
```

```quiz
q: **[Cache simulation]** A 4-line, 2-way set-associative cache with LRU replacement receives the block sequence 0, 1, 4, 0, 5, 1, 4, 8, 0, 5. How many hits occur?
answer: 4
verify:
  sets = [[], []]
  hits = 0
  for b in [0, 1, 4, 0, 5, 1, 4, 8, 0, 5]:
      s = sets[b % 2]
      if b in s:
          hits += 1
          s.remove(b)
      elif len(s) == 2:
          s.pop(0)
      s.append(b)
  print(hits)
explain: Even blocks go to set 0 and odd blocks to set 1. Hits: the second 0, the second 1, the second 4 and the last 5. Block 8 evicts 0 (the least recently used in set 0), and then 0 evicts 4. Curiously, a fully associative 4-line LRU cache gets only 3 hits on this sequence, because the odd blocks then compete with the even ones.
```

```quiz
q: **[Memory chips]** How many 16K × 4 chips are needed to build a 128K × 16 memory?
answer: 32
verify: (128 // 16) * (16 // 4)
explain: 128K / 16K = 8 rows, and 16 / 4 = 4 chips per row: 32 chips.
```

```quiz
q: **[DMA]** A device transfers 2²⁰ bytes per second using DMA with 8 KB blocks. Each block costs the 2 GHz CPU 2000 cycles (set-up plus completion interrupt). What percentage of the CPU time is used? Give the answer to four decimal places.
answer: 0.0128
verify: round(2 ** 20 / 8192 * 2000 / 2e9 * 100, 4)
explain: 2²⁰ / 2¹³ = 128 blocks per second × 2000 cycles = 256,000 cycles per second, out of 2 × 10⁹: 0.0128%.
```
