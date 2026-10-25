---
title: Digital Logic GATE Practice Set
chapter: GATE Practice
description: Mixed GATE-style questions on number systems, 2's complement, IEEE 754, Boolean functions, K-map minimization, combinational circuits, flip-flops and counters.
---
These questions mix every lesson of the Digital Logic track, in the three GATE formats. Write the bits out in full for representation questions, and draw the K-map for minimization questions. Every numerical answer is recomputed by a program when the site is built.

## Number representation

```quiz
q: **[Bases]** What is (2026)₁₀ in hexadecimal?
code: python
  print(format(2026, "X"))
- `7AE`
* `7EA`
- `8EA`
- `7E2`
explain: 2026 = 7 × 256 + 234, and 234 = 14 × 16 + 10, so the digits are 7, 14 (E), 10 (A): 7EA.
```

```quiz
q: **[2's complement]** What is the decimal value of the 8-bit 2's complement number 10110110?
answer: -74
verify: int("10110110", 2) - 256
explain: The MSB is 1, so the value is 182 − 256 = −74. (Check: invert to 01001001 = 73 and add 1 to get 74.)
```

```quiz
q: **[IEEE 754]** What decimal value does the single-precision pattern 0xC2C80000 represent?
answer: -100
verify:
  import struct
  print(int(struct.unpack(">f", bytes.fromhex("C2C80000"))[0]))
explain: 0xC2C80000 = 1 10000101 1001000…: sign −, exponent 133 − 127 = 6, significand 1.1001₂ = 1.5625. Value −1.5625 × 64 = −100.
```

```quiz
q: **[Overflow]** In 8-bit 2's complement, which sums produce **overflow**? (Select all that apply.)
* 0x70 + 0x10
- 0x90 + 0x10
* 0x80 + 0xFF
- 0x7F + 0x80
explain: 0x70 + 0x10 = 112 + 16 = 128 > 127. 0x90 + 0x10 = −112 + 16 = −96 fits. 0x80 + 0xFF = −128 + (−1) = −129 < −128. 0x7F + 0x80 = 127 + (−128) = −1 fits (opposite signs never overflow).
```

## Boolean algebra and minimization

```quiz
q: **[Counting functions]** How many Boolean functions f(A, B) satisfy f(A, B) = f(B, A) for all inputs?
answer: 8
verify:
  from itertools import product
  rows = list(product([0, 1], repeat=2))
  print(sum(1 for code in range(16) if all(((code >> rows.index((a, b))) & 1) == ((code >> rows.index((b, a))) & 1) for a, b in rows)))
explain: Symmetry ties f(0, 1) to f(1, 0), leaving 3 free values: f(0, 0), f(0, 1) = f(1, 0) and f(1, 1). That gives 2³ = 8 functions (the formula 2ⁿ⁺¹ for symmetric functions).
```

```quiz
q: **[K-map]** What is the minimal SOP of F(A, B, C, D) = Σm(0, 2, 3, 4, 6, 7, 8, 10, 12, 14)?
- D′ + A′B
* D′ + A′C
- B′D′ + A′C
- A′ + D′
explain: All eight minterms with D = 0 (0, 2, 4, 6, 8, 10, 12, 14) form one group of 8: D′. The remaining 3 and 7 (A′CD with B = 0 or 1) join 2 and 6 in the group A′C. So F = D′ + A′C.
```

```quiz
q: **[Prime implicants]** F(A, B, C, D) = Σm(1, 5, 6, 7, 11, 12, 13, 15) has 5 prime implicants. How many terms does its minimal SOP have?
answer: 4
verify:
  from itertools import combinations
  n, ones = 4, [1, 5, 6, 7, 11, 12, 13, 15]
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
  cov = lambda p, m: all(c in ("-", b) for c, b in zip(p, format(m, "04b")))
  best = next(k for k in range(1, len(primes) + 1)
              if any(all(any(cov(p, m) for p in combo) for m in ones) for combo in combinations(sorted(primes), k)))
  print(best)
explain: The prime implicants are A′C′D, A′BC, ACD, ABC′ and BD. The first four are essential (each is the only PI covering 1, 6, 11 and 12 respectively), and together they already cover 5, 7, 13 and 15. So BD, the largest group, is redundant: F = A′C′D + A′BC + ACD + ABC′.
```

## Circuits

```quiz
q: **[MUX]** How many 2:1 multiplexers are needed to build a 32:1 multiplexer?
answer: 31
verify: 16 + 8 + 4 + 2 + 1
explain: A tree of 2:1 MUXes halves the number of signals at each level: 16 + 8 + 4 + 2 + 1 = 31 (in general 2ⁿ − 1 for a 2ⁿ:1 MUX).
```

```quiz
q: **[Decoder]** A 3-to-8 decoder and OR gates implement a full adder. Which minterms are ORed for the **carry** output?
* m₃, m₅, m₆, m₇
- m₁, m₂, m₄, m₇
- m₄, m₅, m₆, m₇
- m₁, m₃, m₅, m₇
explain: The carry is 1 when at least two of the three inputs are 1: 011, 101, 110 and 111, which are minterms 3, 5, 6 and 7. (m₁, m₂, m₄, m₇ give the sum.)
```

```quiz
q: **[Counters]** How many states does a Johnson counter with 5 flip-flops go through?
answer: 10
verify: 2 * 5
explain: A Johnson (twisted ring) counter with n flip-flops has 2n states: 10.
```

```quiz
q: **[Flip-flops]** A T flip-flop starts at Q = 0. The inputs T = 1, 0, 1, 1, 1, 0, 1 are applied at successive clock edges. What is Q at the end?
answer: 1
verify:
  q = 0
  for t in [1, 0, 1, 1, 1, 0, 1]:
      q ^= t
  print(q)
explain: Q toggles once for each T = 1. There are five 1s, an odd number, so Q ends at 1.
```

```quiz
q: **[Timing]** In a synchronous circuit the flip-flops have t<sub>pd</sub> = 4 ns and t<sub>su</sub> = 2 ns, and the slowest combinational path takes 14 ns. What is the maximum clock frequency in MHz?
answer: 50
verify: round(1 / (4e-9 + 14e-9 + 2e-9) / 1e6, 6)
explain: The clock period must be at least 4 + 14 + 2 = 20 ns, so f<sub>max</sub> = 1 / 20 ns = 50 MHz.
```
