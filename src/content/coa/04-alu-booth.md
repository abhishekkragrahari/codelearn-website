---
title: The ALU and Multiplication
chapter: Arithmetic
description: What the ALU does, status flags, shift operations, shift-and-add multiplication, Booth's algorithm for signed multiplication with a full trace, the number of additions and subtractions it needs, and division.
---
The **arithmetic logic unit (ALU)** performs the arithmetic (add, subtract, compare) and logic (AND, OR, XOR, NOT, shifts) operations of the CPU. A control input selects the operation; the result goes to a register and the **status flags** are updated.

## Status flags

| Flag | Set when |
| --- | --- |
| Z (zero) | The result is 0 |
| N or S (sign) | The result's MSB is 1 (negative in 2's complement) |
| C (carry) | An addition produced a carry out of the MSB (unsigned overflow), or a subtraction needed a borrow |
| V (overflow) | Signed overflow: carry into the MSB ≠ carry out of it |

Conditional branches test these flags: "branch if equal" checks Z after a compare (which is a subtraction whose result is discarded).

## Shifts

| Shift | Effect on an n-bit value |
| --- | --- |
| Logical left | Fill with 0 on the right; multiplies by 2 (unsigned) |
| Logical right | Fill with 0 on the left; divides an unsigned number by 2 |
| **Arithmetic right** | **Copy the sign bit** on the left; divides a signed number by 2 (rounding towards −∞) |
| Rotate | Bits shifted out at one end come back at the other |

## Shift-and-add multiplication

Multiplying unsigned numbers works like long multiplication on paper: for each 1 bit of the multiplier, add the (shifted) multiplicand to the product. n-bit by n-bit gives a 2n-bit product, using up to n additions.

## Booth's algorithm

**Booth's algorithm** multiplies **signed** (2's complement) numbers directly, and skips over runs of identical bits in the multiplier. The idea: a run of 1s from bit i to bit j equals 2ʲ⁺¹ − 2ⁱ, so it costs one subtraction and one addition instead of j − i + 1 additions.

Registers: A (accumulator, initially 0), Q (the multiplier), an extra bit Q₋₁ (initially 0) and M (the multiplicand). Repeat n times:

| Q₀ Q₋₁ | Action |
| --- | --- |
| 0 0 or 1 1 | No operation (inside a run) |
| 1 0 | A ← A − M (a run of 1s begins) |
| 0 1 | A ← A + M (a run of 1s ends) |

then **arithmetic shift right** A, Q, Q₋₁ together. The product is in A:Q.

Here is a full trace of 7 × (−3) with 4-bit registers (M = 0111, Q = 1101):

```python
def booth(multiplicand, multiplier, n):
    mask = (1 << n) - 1
    A, Q, Q_1, M = 0, multiplier & mask, 0, multiplicand & mask
    fmt = lambda v: format(v, f"0{n}b")
    print(f"{'step':5} {'action':8} {'A':>{n}} {'Q':>{n}} Q-1")
    print(f"{'init':5} {'':8} {fmt(A)} {fmt(Q)}  {Q_1}")
    for step in range(1, n + 1):
        pair = (Q & 1, Q_1)
        action = {(1, 0): "A-M", (0, 1): "A+M"}.get(pair, "none")
        if action == "A-M":
            A = (A - M) & mask
        elif action == "A+M":
            A = (A + M) & mask
        Q_1 = Q & 1                                        # arithmetic shift right of A:Q:Q-1
        Q = (Q >> 1) | ((A & 1) << (n - 1))
        A = (A >> 1) | (A & (1 << (n - 1)))
        print(f"{step:<5} {action:8} {fmt(A)} {fmt(Q)}  {Q_1}")
    product = (A << n) | Q
    return product - (1 << 2 * n) if product >> (2 * n - 1) else product

print("product:", booth(7, -3, 4))
```
```output
step  action      A    Q Q-1
init           0000 1101  0
1     A-M      1100 1110  1
2     A+M      0001 1111  0
3     A-M      1101 0111  1
4     none     1110 1011  1
product: -21
```

The result A:Q = 1110 1011 is −21 in 8-bit 2's complement.

### How many additions and subtractions?

Append a 0 to the right of the multiplier and count the positions where adjacent bits **differ** (each 10 pair is a subtraction, each 01 pair an addition):

- Multiplier 0011 1100: pairs give one subtraction (start of the run of 1s) and one addition (its end): **2** operations.
- Multiplier 0101 0101: the bits alternate, so every position is a boundary: **8** operations, the **worst case**, worse than plain shift-and-add.

```python
def booth_operations(multiplier_bits):
    bits = multiplier_bits + "0"                 # the implicit Q-1 = 0
    return sum(1 for i in range(len(multiplier_bits)) if bits[i] != bits[i + 1])

for m in ["00111100", "01010101", "0110110", "11111111"]:
    print(m, "->", booth_operations(m), "additions/subtractions")
```
```output
00111100 -> 2 additions/subtractions
01010101 -> 8 additions/subtractions
0110110 -> 4 additions/subtractions
11111111 -> 1 additions/subtractions
```

**Bit-pair (modified) Booth recoding** looks at three bits at a time and handles two multiplier bits per step, so at most n/2 operations are needed.

## Division

**Restoring division** repeats n times: shift the remainder–quotient pair left, subtract the divisor; if the result is negative, add the divisor back (**restore**) and set the quotient bit to 0, otherwise set it to 1. **Non-restoring division** skips the restore step: after a negative result it adds the divisor in the next step instead of subtracting, saving one operation per negative step.

## Practice questions

```quiz
q: How many additions and subtractions does Booth's algorithm perform for the multiplier 0110110?
answer: 4
verify:
  m = "0110110"
  b = m + "0"
  print(sum(1 for i in range(len(m)) if b[i] != b[i + 1]))
explain: With a 0 appended, 0110110|0 has boundaries at the start and end of each run of 1s: the runs 11 (bits 5–4) and 11 (bits 2–1) give 2 subtractions and 2 additions, 4 operations in total.
```

```quiz
q: What product does Booth's algorithm give for (−6) × 5 with 4-bit operands (as a signed decimal number)?
code: python
  def booth(m, q, n):
      mask = (1 << n) - 1
      A, Q, Q1, M = 0, q & mask, 0, m & mask
      for _ in range(n):
          if (Q & 1, Q1) == (1, 0): A = (A - M) & mask
          elif (Q & 1, Q1) == (0, 1): A = (A + M) & mask
          Q1 = Q & 1
          Q = (Q >> 1) | ((A & 1) << (n - 1))
          A = (A >> 1) | (A & (1 << (n - 1)))
      p = (A << n) | Q
      return p - (1 << 2 * n) if p >> (2 * n - 1) else p
  print(booth(-6, 5, 4))
answer: -30
explain: Booth's algorithm handles the signs automatically: the 8-bit result 1110 0010 is −30.
```

```quiz
q: For 8-bit multipliers, which pattern makes Booth's algorithm perform the most additions and subtractions?
- 11111111
- 00000000
* 01010101
- 00001111
explain: Every boundary between a 0 and a 1 costs one operation. 01010101 (with the appended 0) has a boundary at all 8 positions. 11111111 needs only 1 (one subtraction at the start; the run continues past the MSB), and 00001111 needs 2.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* An arithmetic right shift copies the sign bit
* Booth's algorithm multiplies 2's complement numbers without correcting for the signs
- The carry flag indicates signed overflow
* Non-restoring division avoids adding the divisor back after a negative result
explain: Arithmetic shifts preserve the sign. Booth's recoding works directly on signed values. Signed overflow is the V flag; C is unsigned overflow. Non-restoring division folds the restore into the next step.
```
