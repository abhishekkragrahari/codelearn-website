---
title: Combinational Circuits
chapter: Combinational and Sequential Circuits
description: Half and full adders, ripple-carry and carry-lookahead adders with their delays, subtractors, multiplexers and implementing functions with them, decoders, encoders and comparators.
---
In a **combinational circuit** the outputs depend only on the **current** inputs; there is no memory. (Circuits with memory, whose outputs also depend on the past, are **sequential**, the subject of the next lesson.)

## Adders

A **half adder** adds two bits: Sum = A ⊕ B, Carry = AB.

A **full adder** adds two bits and an incoming carry:

- **Sum = A ⊕ B ⊕ C<sub>in</sub>** (1 when an odd number of inputs are 1)
- **C<sub>out</sub> = AB + C<sub>in</sub>(A ⊕ B)** = AB + BC<sub>in</sub> + AC<sub>in</sub> (the majority function)

A full adder can be built from two half adders and an OR gate.

### Ripple-carry adder

Chain n full adders, each carry-out feeding the next carry-in.

```pipeline
caption: A 4-bit ripple-carry adder: the carry passes from stage to stage
FA0 | A0 + B0 + C0 → S0
FA1 | A1 + B1 + C1 → S1
FA2 | A2 + B2 + C2 → S2
FA3 | A3 + B3 + C3 → S3, C4
```
 It is simple, but the carry may have to **ripple** through every stage. If a stage produces its carry after t<sub>c</sub> and its sum after t<sub>s</sub> (once its inputs are ready), the last sum is ready after

**(n − 1) · t<sub>c</sub> + max(t<sub>s</sub>, t<sub>c</sub>)**, which grows linearly with n.

```python
def full_adder(a, b, cin):
    s = a ^ b ^ cin
    cout = (a & b) | (cin & (a ^ b))
    return s, cout

def ripple_add(x, y, n=8):
    carry, bits = 0, []
    for i in range(n):                       # least significant bit first
        s, carry = full_adder((x >> i) & 1, (y >> i) & 1, carry)
        bits.append(s)
    return sum(b << i for i, b in enumerate(bits)), carry

for x, y in [(100, 27), (200, 100), (255, 1)]:
    total, cout = ripple_add(x, y)
    print(f"{x} + {y} = {total} (8 bits), carry out {cout}")
n, tc, ts = 16, 3, 4
print(f"{n}-bit ripple adder delay: {(n - 1) * tc + max(ts, tc)} ns")
```
```output
100 + 27 = 127 (8 bits), carry out 0
200 + 100 = 44 (8 bits), carry out 1
255 + 1 = 0 (8 bits), carry out 1
16-bit ripple adder delay: 49 ns
```

### Carry-lookahead adder

Each stage can compute in advance whether it **generates** a carry, G<sub>i</sub> = A<sub>i</sub>B<sub>i</sub>, or **propagates** an incoming one, P<sub>i</sub> = A<sub>i</sub> ⊕ B<sub>i</sub>. Then C<sub>i+1</sub> = G<sub>i</sub> + P<sub>i</sub>C<sub>i</sub>, which expands to

C₄ = G₃ + P₃G₂ + P₃P₂G₁ + P₃P₂P₁G₀ + P₃P₂P₁P₀C₀,

a two-level AND–OR expression. Every carry is ready after a **constant** number of gate delays (with unlimited fan-in), at the price of many more gates. Real adders use lookahead within groups of 4 bits and ripple or lookahead between groups.

### Subtraction

A − B = A + B′ + 1: invert B (XOR gates controlled by a "subtract" signal) and set the first carry-in to 1. One circuit then adds and subtracts.

## Multiplexers

A **multiplexer (MUX)** selects one of 2ⁿ data inputs using n select lines. A 4:1 MUX computes Y = S₁′S₀′I₀ + S₁′S₀I₁ + S₁S₀′I₂ + S₁S₀I₃.

- **Building larger MUXes**: a 2ⁿ:1 MUX can be built from 2:1 MUXes arranged as a tree, using 2ⁿ − 1 of them (16:1 needs 8 + 4 + 2 + 1 = 15).
- **Implementing a function**: a 2ⁿ:1 MUX implements any function of n variables (connect the variables to the selects and the truth table column, as constants, to the inputs). A function of **n** variables also fits on a **2ⁿ⁻¹:1** MUX: use n − 1 variables as selects and feed each data input with 0, 1, the last variable, or its complement.

```python
from itertools import product

def mux(inputs, selects):
    index = int("".join(map(str, selects)), 2)
    return inputs[index]

# F(A, B, C) = Σm(1, 2, 6, 7) on a 4:1 MUX with selects A, B; inputs are functions of C.
F = lambda a, b, c: int(4 * a + 2 * b + c in (1, 2, 6, 7))
data = []
for a, b in product([0, 1], repeat=2):
    col = (F(a, b, 0), F(a, b, 1))
    data.append({(0, 0): "0", (1, 1): "1", (0, 1): "C", (1, 0): "C'"}[col])
print("data inputs I0..I3:", data)
value = {"0": lambda c: 0, "1": lambda c: 1, "C": lambda c: c, "C'": lambda c: 1 - c}
print(all(mux([value[d](c) for d in data], [a, b]) == F(a, b, c)
          for a, b, c in product([0, 1], repeat=3)))
```
```output
data inputs I0..I3: ['C', "C'", '0', '1']
True
```

A **demultiplexer** does the reverse: it routes one input to one of 2ⁿ outputs.

## Decoders and encoders

- An **n-to-2ⁿ decoder** activates exactly one of its 2ⁿ outputs: output i is the minterm mᵢ of the inputs. Any function can therefore be built from a decoder and an OR gate per output: a full adder needs one 3-to-8 decoder and two OR gates (Sum = Σm(1, 2, 4, 7), C<sub>out</sub> = Σm(3, 5, 6, 7)).
- Larger decoders are built from smaller ones with enable inputs: a 4-to-16 decoder uses one 2-to-4 decoder to enable four 2-to-4 decoders (5 in all).
- An **encoder** does the reverse: 2ⁿ inputs (exactly one active) to an n-bit code. A **priority encoder** handles several active inputs by reporting the highest-priority one, plus a "valid" output.

## Comparators

A **magnitude comparator** produces A > B, A = B and A < B. Bitwise equality is xᵢ = (Aᵢ ⊕ Bᵢ)′ (XNOR), and A = B is the AND of all xᵢ. A > B is decided by the most significant bit where they differ.

## Practice questions

```quiz
q: In a 16-bit ripple-carry adder, each full adder produces its carry 3 ns and its sum 4 ns after its inputs are ready. When is the final sum bit ready (in ns)?
answer: 49
verify: (16 - 1) * 3 + max(4, 3)
explain: The carry ripples through the first 15 stages (15 × 3 = 45 ns); the last stage then needs 4 ns to produce its sum: 49 ns.
```

```quiz
q: How many 4:1 multiplexers are needed to build a 64:1 multiplexer?
answer: 21
verify:
  n, total = 64, 0
  while n > 1:
      n //= 4
      total += n
  print(total)
explain: The first level needs 64 / 4 = 16 MUXes, the next 16 / 4 = 4, and the last 1: 16 + 4 + 1 = 21.
```

```quiz
q: F(A, B, C) = Σm(1, 2, 6, 7) is implemented on a 4:1 MUX with A and B as select lines (A is the more significant). What are the data inputs I₀, I₁, I₂, I₃?
code: python
  from itertools import product
  F = lambda a, b, c: int(4 * a + 2 * b + c in (1, 2, 6, 7))
  names = {(0, 0): "0", (1, 1): "1", (0, 1): "C", (1, 0): "C'"}
  print(", ".join(names[(F(a, b, 0), F(a, b, 1))] for a, b in product([0, 1], repeat=2)))
* `C, C', 0, 1`
- `C, C', 1, 0`
- `C', C, 1, 0`
- `0, 1, C, C'`
explain: For AB = 00, F is 1 only at C = 1 (minterm 1): I₀ = C. For AB = 01, F is 1 only at C = 0 (minterm 2): I₁ = C′. For AB = 10 (minterms 4 and 5), F is 0 for both values of C: I₂ = 0. For AB = 11 (minterms 6 and 7), F is 1 for both: I₃ = 1.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* A full adder's carry-out is the majority function of its three inputs
* A 3-to-8 decoder with two OR gates can implement a full adder
- A ripple-carry adder's delay is independent of the number of bits
* Any function of 4 variables can be implemented with one 8:1 multiplexer and an inverter
explain: C<sub>out</sub> is 1 when at least two inputs are 1. The decoder outputs are the minterms, so OR gates on Σm(1, 2, 4, 7) and Σm(3, 5, 6, 7) give Sum and Carry. The ripple delay grows with n. Using 3 variables as selects, each data input is 0, 1, the 4th variable or its complement.
```
