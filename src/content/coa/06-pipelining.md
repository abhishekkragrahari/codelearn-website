---
title: Instruction Pipelining
chapter: Pipelining
description: How a pipeline overlaps instructions, the classic five stages, clock period with unequal stages and latches, total time for n instructions, speedup, efficiency and throughput.
---
Washing, drying and folding clothes one load at a time wastes the washer while the dryer runs. Starting the next load as soon as the washer is free keeps every machine busy. A **pipeline** does the same with instructions: it splits instruction execution into **stages** and works on several instructions at once, each in a different stage.

## The five classic stages

| Stage | Work |
| --- | --- |
| **IF** (instruction fetch) | Read the instruction at PC; PC ← PC + 4 |
| **ID** (decode) | Decode, read source registers |
| **EX** (execute) | ALU operation, or compute a memory address |
| **MEM** (memory) | Load or store data |
| **WB** (write back) | Write the result to the register file |

```python
stages = ["IF", "ID", "EX", "MEM", "WB"]
program = ["I1", "I2", "I3", "I4"]
cycles = len(stages) + len(program) - 1
print("     " + " ".join(f"{c:>3}" for c in range(1, cycles + 1)))
for i, name in enumerate(program):
    row = ["   "] * cycles
    for s, stage in enumerate(stages):
        row[i + s] = f"{stage:>3}"
    print(f"{name:4} " + " ".join(row))
print(f"{len(program)} instructions finish in {cycles} cycles instead of {len(program) * len(stages)}")
```
```output
       1   2   3   4   5   6   7   8
I1    IF  ID  EX MEM  WB
I2        IF  ID  EX MEM  WB
I3            IF  ID  EX MEM  WB
I4                IF  ID  EX MEM  WB
4 instructions finish in 8 cycles instead of 20
```

Once the pipeline is full, **one instruction completes every cycle**, even though each instruction still takes 5 cycles from start to finish (its **latency** does not improve; the **throughput** does).

## Timing

With k stages, stage delays d₁, …, d<sub>k</sub>, and a pipeline register (latch) delay d<sub>latch</sub> between stages:

- **Clock period** T<sub>p</sub> = max(dᵢ) + d<sub>latch</sub>: the slowest stage sets the pace.
- **Time for n instructions** = (k + n − 1) × T<sub>p</sub>: the first instruction needs k cycles, then one more finishes every cycle.
- **Non-pipelined time** = n × Σdᵢ (one instruction at a time, no latches).
- **Speedup** = non-pipelined time / pipelined time. As n grows, it approaches Σdᵢ / T<sub>p</sub>, and in the ideal case (equal stages, no latch delay) it approaches **k**.
- **Efficiency** = speedup / k, and **throughput** = n / (pipelined time).

Example: stages of 150, 120, 160, 140 and 130 ps with 10 ps latches.

```python
stages = [150, 120, 160, 140, 130]       # ps
latch, n, k = 10, 1000, len(stages)
clock = max(stages) + latch
pipelined = (k + n - 1) * clock
unpipelined = n * sum(stages)
print(f"clock period = {clock} ps")
print(f"{n} instructions: pipelined {pipelined} ps, non-pipelined {unpipelined} ps")
print(f"speedup = {unpipelined / pipelined:.3f}, limit for large n = {sum(stages) / clock:.3f}, ideal = {k}")
print(f"throughput = {n / pipelined * 1e12 / 1e9:.2f} billion instructions per second")
```
```output
clock period = 170 ps
1000 instructions: pipelined 170680 ps, non-pipelined 700000 ps
speedup = 4.101, limit for large n = 4.118, ideal = 5
throughput = 5.86 billion instructions per second
```

The speedup is about 4.1, not 5, because the stages are unequal (the 160 ps stage forces every stage to take 170 ps) and because of the latch overhead.

## Why real speedup is lower

- **Unbalanced stages**: the clock fits the slowest stage.
- **Latch overhead**: every stage pays the pipeline register delay.
- **Fill and drain**: the k − 1 cycles at the start and end do less useful work (significant for small n).
- **Hazards**: dependences between instructions force **stalls** (next lesson).

With stalls, the average CPI becomes 1 + (stall cycles per instruction), and **speedup = pipeline depth / (1 + stalls per instruction)** in the ideal-stage case.

Making the pipeline deeper (more, shorter stages) raises the clock rate, but the latch overhead becomes a larger fraction of each stage and hazards cost more cycles, so very deep pipelines stop paying off.

## Practice questions

```quiz
q: A 4-stage pipeline has stage delays of 60, 50, 90 and 80 ns, and each pipeline register adds 10 ns. How many nanoseconds does it take to execute 100 instructions?
answer: 10300
verify: (4 + 100 - 1) * (max(60, 50, 90, 80) + 10)
explain: The clock period is 90 + 10 = 100 ns. 100 instructions take (4 + 100 − 1) × 100 = 10,300 ns.
```

```quiz
q: For the pipeline in the previous question, what is the speedup over a non-pipelined processor (280 ns per instruction, no latches) for those 100 instructions? Give the answer to two decimal places.
answer: 2.72
verify: round(100 * 280 / ((4 + 100 - 1) * 100), 2)
explain: Non-pipelined: 100 × 280 = 28,000 ns. Speedup = 28,000 / 10,300 ≈ 2.72, well below 4 because the stages are unbalanced.
```

```quiz
q: An ideal 6-stage pipeline (equal stages, no latch delay, no stalls) executes a very large number of instructions. What speedup does it approach?
answer: 6
verify: 6
explain: With k equal stages, the clock period is 1/k of the non-pipelined time, and (k + n − 1)/n → 1, so the speedup approaches k = 6.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Pipelining increases throughput but does not reduce the latency of a single instruction
* The pipeline clock period is set by the slowest stage plus the latch delay
- A k-stage pipeline always achieves a speedup of exactly k
* Pipelining n instructions through k stages takes k + n − 1 cycles when there are no stalls
explain: Each instruction still passes through every stage (often slightly slower, because of latches). Unequal stages, latches, fill time and stalls all keep the speedup below k.
```
