---
title: Framing and Error Detection
chapter: Data Link Layer
description: Byte and bit stuffing, parity, the Internet checksum, CRC by polynomial division, Hamming distance and the number of check bits in a Hamming code.
---
The data link layer delivers **frames** between two directly connected nodes. It has to answer two questions: where does a frame start and end (**framing**), and did it arrive intact (**error detection**)?

## Framing

The receiver sees a continuous stream of bits, so frame boundaries must be marked.

- **Character (byte) count**: a header field gives the frame length. One corrupted count loses the boundary of every later frame, so it is rarely used alone.
- **Byte stuffing**: each frame starts and ends with a special **flag byte**. If the flag byte appears inside the data, an **escape** byte (ESC) is inserted before it, and ESC itself is escaped as ESC ESC. The receiver removes the escapes.
- **Bit stuffing** (used by HDLC): the flag is the bit pattern **01111110**. Inside the data, the sender inserts a **0 after every five consecutive 1s**, so six 1s in a row can only be a flag. The receiver deletes a 0 that follows five 1s.

```python
def bit_stuff(bits):
    out, ones = [], 0
    for b in bits:
        out.append(b)
        ones = ones + 1 if b == "1" else 0
        if ones == 5:            # five 1s in a row: insert a 0
            out.append("0")
            ones = 0
    return "".join(out)

data = "0111111011111011111100"
stuffed = bit_stuff(data)
print("data:   ", data)
print("stuffed:", stuffed)
print("bits added:", len(stuffed) - len(data))
```
```output
data:    0111111011111011111100
stuffed: 0111110101111100111110100
bits added: 3
```

## Parity

A **parity bit** makes the number of 1s even (even parity) or odd. A single parity bit detects any **odd** number of flipped bits, but misses any even number.

**Two-dimensional parity** arranges the data in rows and adds a parity bit to every row and every column. It can **correct** any single-bit error (the bad row and column cross at the bad bit) and detect all 2- and 3-bit errors.

## The Internet checksum

IP, UDP and TCP use a simple 16-bit checksum:

1. Split the data into 16-bit words and add them using **one's complement** arithmetic: any carry out of the top bit is added back at the bottom (**end-around carry**).
2. The checksum is the **complement** (all bits flipped) of the sum.
3. The receiver adds all words *including* the checksum; the result must be all 1s (0xFFFF).

```python
def internet_checksum(words):
    total = 0
    for w in words:
        total += w
        total = (total & 0xFFFF) + (total >> 16)   # end-around carry
    return ~total & 0xFFFF

words = [0x4500, 0x0030, 0x1C46, 0x4000]
c = internet_checksum(words)
print("checksum:", hex(c))
check = 0
for w in words + [c]:
    check += w
    check = (check & 0xFFFF) + (check >> 16)
print("receiver's sum:", hex(check))
```
```output
checksum: 0x5e89
receiver's sum: 0xffff
```

The checksum is cheap to compute in software, but weak: swapping two words, for example, does not change it.

## Cyclic redundancy check (CRC)

Ethernet, Wi-Fi and most link layers use a **CRC**. Bit strings are treated as polynomials with coefficients 0 or 1: `1011` is x³ + x + 1. Sender and receiver agree on a **generator** polynomial G of degree r (r + 1 bits).

To compute the CRC of a message M:

1. Append **r zeros** to M.
2. Divide by G using **modulo-2 arithmetic**: subtraction is XOR, with no borrows.
3. The **remainder** (r bits) is the CRC. Send M followed by the CRC.

The transmitted frame is then exactly divisible by G, so the receiver divides what it gets by G and reports an error if the remainder is not zero.

Example: M = 101110 and G = 1001 (x³ + 1, so r = 3). Divide 101110**000** by 1001:

```text
101110000
1001          XOR at position 0
--------
001010000
  1001        XOR at position 2
--------
000011000
    1001      XOR at position 4
--------
000001010
     1001     XOR at position 5
--------
000000011     remainder = 011
```

The frame sent is 101110**011**.

```python
def mod2_remainder(bits, generator):
    bits = list(bits)
    r = len(generator) - 1
    for i in range(len(bits) - r):
        if bits[i] == "1":                       # divide only where the leading bit is 1
            for j, g in enumerate(generator):
                bits[i + j] = "0" if bits[i + j] == g else "1"   # XOR
    return "".join(bits[-r:])

def crc(message, generator):
    return mod2_remainder(message + "0" * (len(generator) - 1), generator)

print("CRC of 101110 with 1001:", crc("101110", "1001"))
frame = "101110" + crc("101110", "1001")
print("frame sent:", frame)
print("receiver's remainder:", mod2_remainder(frame, "1001"))
damaged = frame[:4] + ("1" if frame[4] == "0" else "0") + frame[5:]
print("remainder after a bit flip:", mod2_remainder(damaged, "1001"))
```
```output
CRC of 101110 with 1001: 011
frame sent: 101110011
receiver's remainder: 000
remainder after a bit flip: 010
```

What a CRC with an r-bit remainder detects:

- all **single-bit** errors (if G has at least two terms),
- all **burst errors of length ≤ r** (a burst is a run of bits from the first to the last flipped bit),
- all errors with an **odd** number of flipped bits, if G has the factor (x + 1).

## Hamming distance

The **Hamming distance** between two code words is the number of positions in which they differ: d(10101, 11110) = 3. The **minimum distance** d<sub>min</sub> of a code is the smallest distance between any two of its code words.

| A code with minimum distance d<sub>min</sub> can | |
| --- | --- |
| **Detect** up to | d<sub>min</sub> − 1 bit errors |
| **Correct** up to | ⌊(d<sub>min</sub> − 1) / 2⌋ bit errors |

To correct t errors you need d<sub>min</sub> ≥ 2t + 1; to detect s errors, d<sub>min</sub> ≥ s + 1.

## Hamming code

A **Hamming code** adds r check bits to m data bits so that any single-bit error can be corrected. The r check bits must be able to name every one of the m + r positions, plus "no error":

**2<sup>r</sup> ≥ m + r + 1**

For m = 7 data bits, r = 4 (16 ≥ 12), giving an 11-bit code word. Check bits sit at the positions that are powers of 2 (1, 2, 4, 8, ...), and check bit 2<sup>k</sup> covers every position whose binary number has bit k set. The receiver recomputes the checks; the failed checks, read as a binary number, give the position of the wrong bit.

## Practice questions

```quiz
q: The message 11010110 is protected with the generator polynomial x³ + x + 1. What are the 3 CRC bits appended to it?
code: python
  def crc(message, generator):
      r = len(generator) - 1
      bits = list(message + "0" * r)
      for i in range(len(message)):
          if bits[i] == "1":
              for j, g in enumerate(generator):
                  bits[i + j] = "0" if bits[i + j] == g else "1"
      return "".join(bits[-r:])

  print(crc("11010110", "1011"))
- `011`
- `100`
* `111`
- `000`
explain: x³ + x + 1 is 1011. Dividing 11010110000 by 1011 with XOR leaves the remainder 111, so the frame sent is 11010110111.
```

```quiz
q: A code has four code words: 00000, 01011, 10101 and 11110. Up to how many bit errors can it **correct**?
answer: 1
verify:
  from itertools import combinations
  words = ["00000", "01011", "10101", "11110"]
  d = min(sum(a != b for a, b in zip(x, y)) for x, y in combinations(words, 2))
  print((d - 1) // 2)
explain: Every pair differs in 3 positions, so d<sub>min</sub> = 3. The code detects up to 2 errors and corrects ⌊(3 − 1) / 2⌋ = 1.
```

```quiz
q: How many check bits does a single-error-correcting Hamming code need for 16 data bits?
answer: 5
verify: next(r for r in range(1, 20) if 2 ** r >= 16 + r + 1)
explain: r = 4 gives 16 < 21, too small. r = 5 gives 32 ≥ 22. So 5 check bits, for a 21-bit code word.
```

```quiz
q: With bit stuffing (flag 01111110), how many bits are stuffed into the data 0111111011111011111100?
answer: 3
verify:
  out, ones, added = [], 0, 0
  for b in "0111111011111011111100":
      ones = ones + 1 if b == "1" else 0
      if ones == 5:
          added += 1
          ones = 0
  print(added)
explain: A 0 is inserted after every run of five 1s. The data contains three such runs (positions 2–6, 9–13 and 15–19, counting from 1), so 3 bits are added.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* A single parity bit detects every error that flips an odd number of bits
- A single parity bit can correct a single-bit error
* A CRC with an r-bit remainder detects every burst error of length r or less
* Two-dimensional parity can correct any single-bit error
explain: One parity bit says only that the number of 1s changed by an odd amount; it cannot locate the bit. A CRC catches all bursts no longer than its degree. Two-dimensional parity locates a single error at the crossing of the bad row and column.
```
