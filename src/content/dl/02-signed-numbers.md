---
title: Signed Numbers and Binary Arithmetic
chapter: Number Representation
description: Sign-magnitude, 1's complement and 2's complement, their ranges, addition and subtraction, overflow detection, and sign extension.
---
An n-bit register holds 2ⁿ patterns. To store negative numbers, some of the patterns must stand for negative values. There are three classic ways to choose them.

## Three representations

| Representation | Negative of x | −45 in 8 bits | Range with n bits | Zeros |
| --- | --- | --- | --- | --- |
| **Sign-magnitude** | Set the sign bit (MSB) to 1 | 1010 1101 | −(2ⁿ⁻¹ − 1) to 2ⁿ⁻¹ − 1 | Two (+0, −0) |
| **1's complement** | Invert every bit | 1101 0010 | −(2ⁿ⁻¹ − 1) to 2ⁿ⁻¹ − 1 | Two (0000…, 1111…) |
| **2's complement** | Invert every bit, then add 1 | 1101 0011 | **−2ⁿ⁻¹ to 2ⁿ⁻¹ − 1** | One |

In all three, positive numbers look the same (45 = 0010 1101) and the MSB is 1 for negative numbers.

Computers use **2's complement**, because:

- there is only one zero;
- addition and subtraction use the same ordinary binary adder for signed and unsigned numbers;
- the MSB has weight **−2ⁿ⁻¹**: an n-bit pattern b<sub>n−1</sub>…b₀ means −b<sub>n−1</sub>·2ⁿ⁻¹ + Σ bᵢ·2ⁱ.

Quick way to negate in 2's complement: copy bits from the right up to and including the first 1, then invert the rest. 0010 1100 (44) → 1101 0100 (−44).

The range is lopsided: 8-bit 2's complement goes from −128 to +127, and −128 (1000 0000) is its own negative.

```python
def encodings(x, n=8):
    mag = format(abs(x), f"0{n - 1}b")
    sm = ("1" if x < 0 else "0") + mag
    ones = sm if x >= 0 else "".join("1" if c == "0" else "0" for c in format(abs(x), f"0{n}b"))
    twos = format(x & (2 ** n - 1), f"0{n}b")
    return sm, ones, twos

def value_twos(bits):
    n = len(bits)
    return int(bits, 2) - (2 ** n if bits[0] == "1" else 0)    # MSB weighs -2^(n-1)

for x in [45, -45, -1, -128]:
    if x == -128:
        print(f"{x:5}: 2's complement {format(x & 255, '08b')} (not representable in the other two)")
        continue
    sm, ones, twos = encodings(x)
    print(f"{x:5}: sign-magnitude {sm}  1's {ones}  2's {twos}")
print("value of 11110011 in 2's complement:", value_twos("11110011"))
```
```output
   45: sign-magnitude 00101101  1's 00101101  2's 00101101
  -45: sign-magnitude 10101101  1's 11010010  2's 11010011
   -1: sign-magnitude 10000001  1's 11111110  2's 11111111
 -128: 2's complement 10000000 (not representable in the other two)
value of 11110011 in 2's complement: -13
```

## Addition and subtraction in 2's complement

Add the bit patterns as unsigned numbers and **discard the carry out** of the MSB. Subtraction A − B is A + (2's complement of B), which hardware computes as A + B̄ + 1 (invert B and set the carry-in to 1).

In 1's complement, a carry out of the MSB must be added back into the result (**end-around carry**), which is one reason 1's complement fell out of use.

## Overflow

The result of adding two n-bit signed numbers may not fit in n bits. **Overflow** happens exactly when:

- two numbers with the **same sign** are added and the result has the **opposite sign** (adding numbers of different signs never overflows), or equivalently
- the carry **into** the MSB differs from the carry **out of** the MSB: V = C<sub>n</sub> ⊕ C<sub>n−1</sub>.

```python
def add8(a, b):
    ua, ub = a & 0xFF, b & 0xFF
    total = ua + ub
    carry_out = total >> 8
    carry_into_msb = ((ua & 0x7F) + (ub & 0x7F)) >> 7
    result = total & 0xFF
    signed = result - 256 if result & 0x80 else result
    return format(result, "08b"), signed, carry_out, carry_out ^ carry_into_msb

for a, b in [(100, 50), (-100, -50), (100, -50), (-1, -1), (64, 64)]:
    bits, signed, c, v = add8(a, b)
    print(f"{a:5} + {b:4} -> {bits} = {signed:5}  carry out {c}  overflow {v}")
```
```output
  100 +   50 -> 10010110 =  -106  carry out 0  overflow 1
 -100 +  -50 -> 01101010 =   106  carry out 1  overflow 1
  100 +  -50 -> 00110010 =    50  carry out 1  overflow 0
   -1 +   -1 -> 11111110 =    -2  carry out 1  overflow 0
   64 +   64 -> 10000000 =  -128  carry out 0  overflow 1
```

100 + 50 = 150 does not fit in −128…127, so the 8-bit result reads as −106: overflow. −1 + −1 produces a carry out, but no overflow: the carry out alone means nothing for signed numbers (it signals overflow only for **unsigned** addition).

## Sign extension

To widen a 2's complement number from n to m bits without changing its value, **copy the sign bit** into the new positions: 1101 (−3) becomes 1111 1101 (still −3), and 0101 (5) becomes 0000 0101. Zero-extension (filling with 0s) is only correct for unsigned numbers.

## Practice questions

```quiz
q: What decimal value does the 8-bit 2's complement pattern 0xF3 represent?
answer: -13
verify: 0xF3 - 256
explain: 0xF3 = 1111 0011. Its MSB is 1, so the value is 243 − 256 = −13. (Check: inverting gives 0000 1100 = 12, plus 1 is 13.)
```

```quiz
q: What is the range of numbers representable in 6-bit 2's complement? Enter the number of distinct values in the range.
answer: 64
verify: 31 - (-32) + 1
explain: The range is −2⁵ = −32 to 2⁵ − 1 = 31, which is 64 values: every one of the 2⁶ patterns is used, with a single zero.
```

```quiz
q: In 8-bit 2's complement arithmetic, which additions **overflow**? (Select all that apply.)
* 100 + 50
* (−100) + (−50)
- 100 + (−50)
- (−1) + (−1)
explain: 150 and −150 are outside −128…127. Adding numbers of opposite sign can never overflow. −1 + −1 = −2 fits, even though the addition produces a carry out of the MSB.
```

```quiz
q: How many different bit patterns represent zero in 8-bit **1's complement**?
answer: 2
verify: len({0b00000000, 0b11111111})
explain: 0000 0000 is +0 and its bitwise inverse 1111 1111 is −0. 2's complement has only one zero, which is why its range has one extra negative value.
```

```quiz
q: The 4-bit 2's complement number 1010 is sign-extended to 8 bits. What is the result?
- `00001010`
* `11111010`
- `10001010`
- `10100000`
explain: Sign extension copies the MSB (1) into the four new positions: 1111 1010. Both patterns represent −6.
```
