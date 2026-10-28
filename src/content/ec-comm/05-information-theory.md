---
title: Information Theory and Coding
chapter: Information Theory
description: Information and entropy, source coding with Huffman and Shannon-Fano, coding efficiency, mutual information, channel capacity of binary symmetric and AWGN channels, and linear block codes.
---
Information theory sets the limits of communication: how much a source can be compressed, and how fast data can cross a noisy channel without errors.

## Information and entropy

- Information of a symbol with probability p: **I = log₂(1/p)** bits.
- **Entropy** H = −Σ pᵢ log₂ pᵢ: the average information per symbol. Maximum **log₂ M** for M equally likely symbols.
- Information rate R = r H (r = symbols per second).
- Binary source: H(p) = −p log₂p − (1 − p) log₂(1 − p), maximum 1 bit at p = 0.5.

## Source coding

- **Shannon's source coding theorem:** the average code length L̄ ≥ H.
- **Coding efficiency** η = H/L̄; redundancy = 1 − η.
- **Huffman coding** (optimal prefix code): repeatedly merge the two least probable symbols.
- Shannon–Fano coding: split into nearly equal-probability halves.
- **Kraft inequality** for prefix codes: Σ 2^(−lᵢ) ≤ 1.

## Channels

- **Mutual information** I(X; Y) = H(X) − H(X|Y).
- **Channel capacity** C = max I(X; Y).
- **Binary symmetric channel** with error probability p: **C = 1 − H(p)** bits per use.
- **AWGN channel (Shannon–Hartley):** **C = B log₂(1 + S/N)** bit/s. Raising the bandwidth to infinity gives C → 1.44 S/N₀.
- **Channel coding theorem:** error-free transmission is possible at any rate below C.

## Error control coding

- **(n, k) linear block code:** k message bits, n − k parity bits; code rate k/n.
- **Minimum Hamming distance** d_min: detects up to d_min − 1 errors, corrects up to ⌊(d_min − 1)/2⌋.
- **Hamming codes:** (2ᵐ − 1, 2ᵐ − 1 − m) with d_min = 3: correct 1 error. Example (7, 4).
- Syndrome decoding with the parity-check matrix H; cyclic codes and CRC; convolutional codes decoded by the Viterbi algorithm.

## Worked example

A source emits 4 symbols with probabilities 1/2, 1/4, 1/8, 1/8.

- H = 0.5 + 0.5 + 0.375 + 0.375 = **1.75 bits/symbol**.
- Huffman codes 0, 10, 110, 111 give L̄ = 1.75: **100% efficiency**.

## Practice

```quiz
q: A binary symmetric channel has error probability 0.1. What is its capacity in bits per use? (Give 3 decimal places.)
answer: 0.531
verify: round(1 + 0.1 * __import__("math").log2(0.1) + 0.9 * __import__("math").log2(0.9), 3)
explain: C = 1 − H(0.1) = 1 − 0.469 = 0.531 bit per use.
```

```quiz
q: A telephone channel has B = 3 kHz and SNR = 30 dB. What is its capacity in kbit/s? (Give 2 decimal places.)
answer: 29.9
verify: round(3 * __import__("math").log2(1 + 1000), 2)
explain: SNR = 1000; C = 3 × log₂ 1001 = 3 × 9.967 = 29.90 kbit/s.
```

```quiz
q: A block code has d_min = 5. How many errors per codeword can it correct?
answer: 2
verify: (5 - 1) // 2
explain: t = ⌊(d_min − 1)/2⌋ = 2.
```

```quiz
q: A source emits symbols with probabilities 0.5, 0.25, 0.125 and 0.125, coded with average length 2 bits. What is the coding efficiency in percent? (Give 1 decimal place.)
answer: 87.5
verify: round(1.75 / 2 * 100, 1)
explain: H = 1.75 bits; η = 1.75/2 = 87.5% (Huffman coding would reach 100%).
```

```quiz
q: A source emits 8 equally likely symbols. What is its entropy in bits per symbol?
answer: 3
verify: __import__("math").log2(8)
explain: H = log₂ 8 = 3 bits.
```

```quiz
q: A Hamming code has d_min = 3. How many errors can it correct?
answer: 1
verify: (3 - 1) // 2
explain: t = ⌊(d_min − 1)/2⌋ = 1.
```
