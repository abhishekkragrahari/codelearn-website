---
title: Number Systems and Codes
chapter: Number Representation
description: Positional number systems, converting between decimal, binary, octal and hexadecimal (integers and fractions), BCD, Gray code and other codes.
---
Digital circuits work with two voltage levels, so they store numbers in **binary**. People prefer decimal, and programmers often use octal and hexadecimal as short forms of binary. This lesson covers moving between them.

## Positional notation

In base (radix) r, the digits are 0 to r − 1 and each position is worth a power of r:

(d<sub>n−1</sub> … d₁ d₀ . d₋₁ d₋₂ …)<sub>r</sub> = Σ dᵢ × rⁱ

For example (1011.101)₂ = 8 + 0 + 2 + 1 + 0.5 + 0 + 0.125 = (11.625)₁₀, and (3A7)₁₆ = 3 × 256 + 10 × 16 + 7 = (935)₁₀.

| Base | Name | Digits |
| --- | --- | --- |
| 2 | Binary | 0, 1 |
| 8 | Octal | 0–7 |
| 10 | Decimal | 0–9 |
| 16 | Hexadecimal | 0–9, A–F (A = 10, …, F = 15) |

An n-digit base-r number can represent rⁿ values, from 0 to rⁿ − 1.

## Converting from decimal

- **Integer part**: divide by r repeatedly; the remainders, read from **last to first**, are the digits.
- **Fraction part**: multiply by r repeatedly; the integer parts, read from **first to last**, are the digits. The process may never end (0.1 in decimal is 0.000110011… in binary, repeating), so it is cut off at the precision needed.

```python
DIGITS = "0123456789ABCDEF"

def to_base(value, base, frac_digits=6):
    whole, frac = int(value), value - int(value)
    int_digits = ""
    while True:
        whole, rem = divmod(whole, base)
        int_digits = DIGITS[rem] + int_digits      # remainders, last to first
        if whole == 0:
            break
    frac_part = ""
    while frac and len(frac_part) < frac_digits:
        frac *= base
        frac_part += DIGITS[int(frac)]             # integer parts, first to last
        frac -= int(frac)
    return int_digits + ("." + frac_part if frac_part else "")

for v in [156, 11.625, 0.1, 935]:
    print(f"{v:>7}: binary {to_base(v, 2)}, octal {to_base(v, 8)}, hex {to_base(v, 16)}")
```
```output
    156: binary 10011100, octal 234, hex 9C
 11.625: binary 1011.101, octal 13.5, hex B.A
    0.1: binary 0.000110, octal 0.063146, hex 0.199999
    935: binary 1110100111, octal 1647, hex 3A7
```

## Binary, octal and hexadecimal

Since 8 = 2³ and 16 = 2⁴, each octal digit is exactly **3 bits** and each hex digit exactly **4 bits**. Convert by grouping bits from the binary point outwards (padding with zeros at the ends):

- (10011100)₂ → 010 011 100 → (234)₈
- (10011100)₂ → 1001 1100 → (9C)₁₆
- (725)₈ → 111 010 101 → (111010101)₂

To convert between octal and hex, go through binary.

## Finding an unknown base

A typical question: if (121)ₓ = (100)₁₀, what is x? Expand: x² + 2x + 1 = 100, so (x + 1)² = 100 and x = 9. Remember that every digit must be smaller than the base.

## Binary-coded decimal (BCD)

**BCD** (8421 code) stores each decimal digit in its own 4 bits: (947)₁₀ = 1001 0100 0111 in BCD. The bit patterns 1010 to 1111 are invalid. BCD is easy to convert to and from decimal (for displays), but wastes space: 4 bits per digit store only 10 of the 16 possible values. When two BCD digits are added and the sum exceeds 9 (or a carry occurs), **6 (0110) is added** to correct the result.

**Excess-3** code is BCD + 3 (decimal 4 → 0111). It is **self-complementing**: the 9's complement of a digit is obtained by inverting its bits.

## Gray code

In a **Gray code**, consecutive values differ in exactly **one bit**. This avoids glitches when a value changes (rotary encoders) and is used to order Karnaugh maps.

| Decimal | Binary | Gray |
| --- | --- | --- |
| 0 | 000 | 000 |
| 1 | 001 | 001 |
| 2 | 010 | 011 |
| 3 | 011 | 010 |
| 4 | 100 | 110 |
| 5 | 101 | 111 |
| 6 | 110 | 101 |
| 7 | 111 | 100 |

- **Binary to Gray**: keep the leftmost bit; each next Gray bit is the XOR of neighbouring binary bits. In one step: G = B XOR (B >> 1).
- **Gray to binary**: keep the leftmost bit; each next binary bit is the previous **binary** bit XOR the current Gray bit.

```python
def to_gray(b):
    return b ^ (b >> 1)

def from_gray(g):
    b = 0
    while g:
        b ^= g
        g >>= 1
    return b

print([format(to_gray(i), "03b") for i in range(8)])
print("13 in Gray:", format(to_gray(13), "04b"))
print("Gray 1011 in binary:", format(from_gray(0b1011), "04b"))
```
```output
['000', '001', '011', '010', '110', '111', '101', '100']
13 in Gray: 1011
Gray 1011 in binary: 1101
```

## Practice questions

```quiz
q: If (121)ₓ = (100)₁₀, what is the base x?
answer: 9
verify: next(x for x in range(3, 100) if x * x + 2 * x + 1 == 100)
explain: x² + 2x + 1 = (x + 1)² = 100, so x + 1 = 10 and x = 9. The digits 1 and 2 are valid in base 9.
```

```quiz
q: What is (3A7)₁₆ in decimal?
answer: 935
verify: int("3A7", 16)
explain: 3 × 16² + 10 × 16 + 7 = 768 + 160 + 7 = 935.
```

```quiz
q: What is the Gray code of decimal 13?
code: python
  print(format(13 ^ (13 >> 1), "04b"))
- `1101`
* `1011`
- `1110`
- `0111`
explain: 13 = 1101. Keep the first bit 1; then 1⊕1 = 0, 1⊕0 = 1, 0⊕1 = 1: Gray 1011.
```

```quiz
q: How many bits are needed to represent the decimal number 2026 in plain binary, and how many in BCD? Enter the **difference** (BCD bits − binary bits).
answer: 5
verify: 4 * len("2026") - (2026).bit_length()
explain: 2026 < 2048 = 2¹¹ needs 11 binary bits. BCD uses 4 bits per digit: 4 × 4 = 16 bits. The difference is 16 − 11 = 5.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Each hexadecimal digit corresponds to exactly 4 bits
* Consecutive Gray code values differ in exactly one bit
- (0.1)₁₀ has a finite binary representation
* Excess-3 is a self-complementing code
explain: 16 = 2⁴ gives the 4-bit grouping. The one-bit change is what defines a Gray code. 0.1 in binary is 0.0001100110011… repeating forever. Inverting an excess-3 code gives the 9's complement of the digit.
```
