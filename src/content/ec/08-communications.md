---
title: Communications
chapter: Control and Communication
description: GATE EC syllabus for communications, with random processes and noise, AM and FM, superheterodyne receivers, entropy and channel capacity, PCM and DPCM, digital modulation, matched filters, BER and error-correcting codes, with solved examples.
---
## Syllabus

Random processes (autocorrelation, power spectral density, white noise, filtering through LTI systems); analog communications (AM and angle modulation, their spectra, demodulation, superheterodyne receivers); information theory (entropy, mutual information, channel capacity theorem); digital communications (PCM, DPCM, ASK, PSK, FSK, QAM, bandwidth, ISI, MAP and ML detection, matched filter receiver, SNR and BER); error correction, Hamming codes, CRC.

## Key concepts and formulas

**Random processes.** The PSD is the Fourier transform of the autocorrelation (Wiener-Khinchin). White noise has a flat PSD N₀/2 and an impulse autocorrelation. Through an LTI system: S<sub>y</sub>(f) = |H(f)|²S<sub>x</sub>(f). Noise power in bandwidth B (white noise, ideal filter): N₀B.

**Amplitude modulation.** s(t) = A<sub>c</sub>[1 + μ cos ω<sub>m</sub>t] cos ω<sub>c</sub>t, modulation index μ = A<sub>m</sub>/A<sub>c</sub>.

- Total power **P<sub>t</sub> = P<sub>c</sub>(1 + μ²/2)**; power efficiency **η = μ²/(2 + μ²)** (33.3% at μ = 1).
- Bandwidth: DSB 2f<sub>m</sub>, SSB f<sub>m</sub>.
- An envelope detector needs μ ≤ 1 (no overmodulation).

**Angle modulation.** FM: frequency deviation Δf = k<sub>f</sub>A<sub>m</sub>, modulation index β = Δf/f<sub>m</sub>. **Carson's rule**: B ≈ 2(Δf + f<sub>m</sub>) = 2(β + 1)f<sub>m</sub>. Narrowband FM (β ≪ 1) has bandwidth about 2f<sub>m</sub>, like AM.

**Superheterodyne receiver.** Image frequency f<sub>image</sub> = f<sub>s</sub> + 2f<sub>IF</sub> (when the local oscillator is above the signal); AM broadcast IF = 455 kHz, FM IF = 10.7 MHz.

**Information theory.** Entropy **H = −Σ pᵢ log₂ pᵢ** bits/symbol, largest (log₂ M) for M equally likely symbols. **Shannon-Hartley**: C = B log₂(1 + S/N) bits/s.

**PCM.** Bit rate = n f<sub>s</sub> (n bits per sample); for M levels n = log₂M. **SQNR ≈ 6.02n + 1.76 dB** for a full-scale sine; each extra bit adds about 6 dB. Minimum (Nyquist) transmission bandwidth nf<sub>s</sub>/2. DPCM transmits the difference between a sample and its prediction, needing fewer bits.

**Digital modulation.**

- BPSK and QPSK: BER = Q(√(2E<sub>b</sub>/N₀)); QPSK has the same BER as BPSK with half the bandwidth.
- Coherent BFSK: Q(√(E<sub>b</sub>/N₀)), 3 dB worse than BPSK.
- M-ary schemes send log₂M bits per symbol.
- The **matched filter** h(t) = s(T − t) maximises the output SNR, which is 2E/N₀.
- Nyquist criterion for zero ISI: with raised-cosine pulses of roll-off α, the bandwidth is R<sub>s</sub>(1 + α)/2.

**Error control.** A code with minimum Hamming distance d<sub>min</sub> detects d<sub>min</sub> − 1 errors and corrects ⌊(d<sub>min</sub> − 1)/2⌋. A Hamming (n, k) code with r parity bits satisfies 2ʳ ≥ n + 1 (the (7, 4) code corrects one error). CRC detects errors using polynomial division.

## Worked example

An AM signal has a carrier power of 1000 W and μ = 0.8: find the total power and efficiency. An FM signal has Δf = 75 kHz and f<sub>m</sub> = 15 kHz: find β and the Carson bandwidth. A source emits four symbols with probabilities 1/2, 1/4, 1/8 and 1/8: find its entropy. Finally, find the capacity of a 3 kHz channel with an SNR of 30 dB.

```python
import math

Pc, mu = 1000, 0.8
print(f"AM: Pt = {Pc * (1 + mu ** 2 / 2):.0f} W, efficiency = {mu ** 2 / (2 + mu ** 2) * 100:.2f}%")
df, fm = 75, 15
print(f"FM: beta = {df / fm:.0f}, Carson bandwidth = {2 * (df + fm)} kHz")
p = [1 / 2, 1 / 4, 1 / 8, 1 / 8]
print(f"entropy = {-sum(x * math.log2(x) for x in p):.2f} bits/symbol")
B, snr = 3000, 10 ** (30 / 10)
print(f"capacity = {B * math.log2(1 + snr):.1f} bit/s")
print(f"PCM: 8 bits at 8 kHz = {8 * 8} kbit/s, SQNR = {6.02 * 8 + 1.76:.2f} dB")
```
```output
AM: Pt = 1320 W, efficiency = 24.24%
FM: beta = 5, Carson bandwidth = 180 kHz
entropy = 1.75 bits/symbol
capacity = 29901.7 bit/s
PCM: 8 bits at 8 kHz = 64 kbit/s, SQNR = 49.92 dB
```

## Practice questions

```quiz
q: What is the power efficiency (in percent) of AM with modulation index 1? Give the answer to two decimal places.
answer: 33.33
verify: round(100 * 1 / (2 + 1), 2)
explain: η = μ²/(2 + μ²) = 1/3 ≈ 33.33%. Two thirds of the power is in the carrier, which carries no information.
```

```quiz
q: An FM signal has a frequency deviation of 50 kHz and a modulating frequency of 10 kHz. What is its bandwidth by Carson's rule, in kHz?
answer: 120
verify: 2 * (50 + 10)
explain: B = 2(Δf + f<sub>m</sub>) = 2(50 + 10) = 120 kHz.
```

```quiz
q: A source emits 8 equally likely symbols. What is its entropy in bits per symbol?
answer: 3
verify: __import__("math").log2(8)
explain: H = log₂ 8 = 3 bits/symbol, the maximum for 8 symbols.
```

```quiz
q: A signal band-limited to 4 kHz is sampled at the Nyquist rate and quantised to 256 levels. What is the PCM bit rate in kbit/s?
answer: 64
verify: 2 * 4 * 8
explain: f<sub>s</sub> = 8 kHz and n = log₂ 256 = 8 bits, so the bit rate is 8 × 8 = 64 kbit/s.
```

```quiz
q: A block code has minimum Hamming distance 5. How many errors per codeword can it correct?
answer: 2
verify: (5 - 1) // 2
explain: t = ⌊(d<sub>min</sub> − 1)/2⌋ = ⌊4/2⌋ = 2 errors (it can detect up to 4).
```
