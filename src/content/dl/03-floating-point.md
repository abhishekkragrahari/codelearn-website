---
title: Floating-Point Numbers (IEEE 754)
chapter: Number Representation
description: Fixed-point versus floating-point, the IEEE 754 single and double formats, biased exponents, normalised and denormalised numbers, special values, conversions in both directions, and precision.
---
Integers cannot hold 0.375 or 6.02 × 10²³. **Fixed-point** numbers put the binary point at a fixed position (for example 8 integer bits and 8 fraction bits), which is simple but has a small range. **Floating-point** numbers store a significand and an exponent, like scientific notation, trading exact spacing for a huge range.

## The IEEE 754 formats

A floating-point number is (−1)<sup>S</sup> × 1.M × 2<sup>E − bias</sup>:

| Format | Sign S | Exponent E | Mantissa M (fraction) | Bias | Precision |
| --- | --- | --- | --- | --- | --- |
| Single (32-bit, `float`) | 1 bit | 8 bits | 23 bits | 127 | about 7 decimal digits |
| Double (64-bit, `double`) | 1 bit | 11 bits | 52 bits | 1023 | about 16 decimal digits |

- The exponent is stored **biased** (E = true exponent + bias), so it is always non-negative and floats compare like integers. For a k-bit exponent the bias is 2<sup>k−1</sup> − 1.
- A normalised significand always starts with 1, so that 1 is **not stored** (the *hidden bit*), giving one free bit of precision.

## Converting a decimal number to IEEE single

Example: 5.75.

1. Binary: 5.75 = 101.11₂.
2. Normalise: 101.11 = 1.0111 × 2².
3. Sign 0; exponent 2 + 127 = 129 = 1000 0001; mantissa 0111 followed by 19 zeros.
4. Bits: 0 10000001 01110000000000000000000 = **0x40B80000**.

Example: −0.15625 = −0.00101₂ = −1.01 × 2⁻³. Sign 1, exponent −3 + 127 = 124 = 0111 1100, mantissa 01000…: **0xBE200000**.

Going back: 0xC1480000 = 1 10000010 1001000…: sign −, exponent 130 − 127 = 3, significand 1.1001₂ = 1.5625, value −1.5625 × 8 = **−12.5**.

Python's `struct` module shows the real bit patterns:

```python
import struct

def float_bits(x):
    raw = struct.unpack(">I", struct.pack(">f", x))[0]
    b = format(raw, "032b")
    return f"{b[0]} {b[1:9]} {b[9:]}", hex(raw)

def decode(hex_string):
    raw = int(hex_string, 16)
    s, e, m = raw >> 31, (raw >> 23) & 0xFF, raw & 0x7FFFFF
    value = (-1) ** s * (1 + m / 2 ** 23) * 2.0 ** (e - 127)
    return s, e, value

for x in [5.75, -0.15625, 0.1]:
    bits, h = float_bits(x)
    print(f"{x:9}: {bits}  {h}")
print("0xC1480000 -> sign, exponent, value:", decode("C1480000"))
print("0.1 as stored:", f"{struct.unpack('>f', struct.pack('>f', 0.1))[0]:.12f}")
```
```output
     5.75: 0 10000001 01110000000000000000000  0x40b80000
 -0.15625: 1 01111100 01000000000000000000000  0xbe200000
      0.1: 0 01111011 10011001100110011001101  0x3dcccccd
0xC1480000 -> sign, exponent, value: (1, 130, -12.5)
0.1 as stored: 0.100000001490
```

0.1 has an infinite binary expansion, so the stored value is only the nearest representable float: 0.100000001490116…. This is why `0.1 + 0.2 == 0.3` is false in most programming languages.

## Special values

The exponent fields of all 0s and all 1s are reserved:

| Exponent E | Mantissa M | Meaning |
| --- | --- | --- |
| 0 | 0 | **±0** (two zeros) |
| 0 | ≠ 0 | **Denormalised**: (−1)<sup>S</sup> × 0.M × 2<sup>−126</sup> (no hidden 1) |
| 1 to 254 | any | Normalised: (−1)<sup>S</sup> × 1.M × 2<sup>E − 127</sup> |
| 255 | 0 | **±∞** (overflow, or 1/0) |
| 255 | ≠ 0 | **NaN** (not a number: 0/0, √−1) |

Denormalised numbers fill the gap between 0 and the smallest normalised number, giving **gradual underflow**.

| Single precision | Value |
| --- | --- |
| Largest finite | (2 − 2⁻²³) × 2¹²⁷ ≈ 3.4 × 10³⁸ |
| Smallest positive normalised | 2⁻¹²⁶ ≈ 1.18 × 10⁻³⁸ |
| Smallest positive denormalised | 2⁻¹⁴⁹ ≈ 1.4 × 10⁻⁴⁵ |

## Precision and rounding

Floats are not evenly spaced: between consecutive powers of 2 there are always 2²³ single-precision values, so the gap between neighbours doubles with every power of 2. Above 2²⁴ = 16,777,216, a `float` can no longer represent every integer. Results are rounded (by default to the nearest value, ties to even), so floating-point addition is **not associative**: (a + b) + c may differ from a + (b + c).

## Practice questions

```quiz
q: What is the IEEE 754 single-precision bit pattern of −2.5?
code: python
  import struct
  print(hex(struct.unpack(">I", struct.pack(">f", -2.5))[0]).upper().replace("0X", "0x"))
- `0x40200000`
* `0xC0200000`
- `0xC0A00000`
- `0xBF200000`
explain: −2.5 = −10.1₂ = −1.01 × 2¹. Sign 1, exponent 1 + 127 = 128 = 1000 0000, mantissa 0100…: 1100 0000 0010 0000 … = 0xC0200000.
```

```quiz
q: What decimal value does the IEEE single-precision pattern 0x3F400000 represent?
answer: 0.75
verify:
  import struct
  print(struct.unpack(">f", bytes.fromhex("3F400000"))[0])
explain: 0x3F400000 = 0 01111110 1000…: exponent 126 − 127 = −1, significand 1.1₂ = 1.5, value 1.5 × 2⁻¹ = 0.75.
```

```quiz
q: A floating-point format has a 6-bit exponent stored with the usual IEEE-style bias. What is the bias?
answer: 31
verify: 2 ** (6 - 1) - 1
explain: For a k-bit exponent the bias is 2<sup>k−1</sup> − 1 = 2⁵ − 1 = 31.
```

```quiz
q: Which statements about IEEE 754 single precision are **true**? (Select all that apply.)
* The leading 1 of a normalised significand is not stored
* An exponent field of all 1s with a non-zero mantissa means NaN
- Every integer up to 2³² can be represented exactly
* There are two representations of zero
explain: The hidden bit gives 24 bits of precision from 23 stored bits. All-1s exponents mark infinity (mantissa 0) and NaN (mantissa non-zero). Only integers up to 2²⁴ are all exact. +0 and −0 differ in the sign bit.
```
