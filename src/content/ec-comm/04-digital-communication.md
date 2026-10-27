---
title: Sampling, PCM and Digital Modulation
chapter: Digital Communication
description: Sampling and quantisation, PCM bit rate and SQNR, delta modulation, line coding, ISI and Nyquist pulse shaping, ASK, FSK, PSK and QAM, matched filter and bit error probability.
---
Digital communication sends bits. An analog message is first sampled and quantised; the bits are then shaped into pulses and modulated onto a carrier.

## Sampling and PCM

- Sample at **f_s ≥ 2W** (Nyquist).
- **Quantisation** with L = 2ⁿ levels; step size Δ = (peak-to-peak range)/L; quantisation noise power **Δ²/12**.
- **SQNR** for a full-scale sinusoid: **6.02n + 1.76 dB** (each extra bit adds about 6 dB).
- **PCM bit rate** R_b = n f_s. Minimum transmission bandwidth (Nyquist) = R_b/2.
- **Companding** (μ-law, A-law) improves SQNR for weak signals.
- **Delta modulation:** 1 bit per sample; **slope overload** if the step δ is too small (avoid by δ f_s ≥ max slope of the message); granular noise if δ is too large. DPCM sends quantised prediction errors.

## Baseband transmission

- **Line codes:** NRZ, RZ, Manchester (no DC, self-clocking, double bandwidth), AMI.
- **ISI** (inter-symbol interference) is avoided by Nyquist pulses: a **raised-cosine** spectrum with roll-off α needs bandwidth **B = R_s(1 + α)/2** at baseband (R_s(1 + α) for passband).
- Eye diagrams show ISI and timing margins.

## Matched filter

The filter that maximises output SNR at the sampling instant has impulse response h(t) = s(T − t). Its maximum SNR = **2E/N₀** (E = symbol energy), independent of the pulse shape.

## Digital modulation

| Scheme | Bits/symbol | Bandwidth (min, null-to-null approx.) | Bit error probability |
| --- | --- | --- | --- |
| **BPSK** | 1 | 2R_b | **Q(√(2E_b/N₀))** |
| QPSK | 2 | R_b | Same as BPSK per bit |
| Coherent BFSK | 1 | Wider | Q(√(E_b/N₀)) |
| ASK (OOK) | 1 | 2R_b | Q(√(E_b/N₀)) (average energy) |
| DPSK | 1 | 2R_b | ½ e^(−E_b/N₀) |
| M-QAM | log₂ M | R_b/log₂ M | Better bandwidth efficiency, needs more SNR |

- BPSK is 3 dB better than coherent BFSK and OOK.
- **Symbol rate** R_s = R_b/log₂ M.
- Constellation: M-PSK points on a circle; QAM points on a grid.

## Worked example

Speech band-limited to 4 kHz is sampled at the Nyquist rate with 8-bit PCM.

- f_s = 8 kHz; R_b = **64 kbit/s**; SQNR ≈ 6.02 × 8 + 1.76 = **49.9 dB**.

## Practice

```quiz
q: A 16-QAM system sends 40 kbit/s. What is the symbol rate in kbaud?
answer: 10
verify: 40 / 4
explain: 16-QAM carries log₂16 = 4 bits per symbol: 40/4 = 10 kbaud.
```

```quiz
q: With raised-cosine pulses of roll-off 0.5 at 10 kbaud, what baseband bandwidth (kHz) is needed?
answer: 7.5
verify: 10 * (1 + 0.5) / 2
explain: B = R_s(1 + α)/2 = 10 × 1.5/2 = 7.5 kHz.
```

```quiz
q: What SQNR (dB) does a 10-bit PCM give for a full-scale sinusoid? (Give 2 decimal places.)
answer: 61.96
verify: round(6.02 * 10 + 1.76, 2)
explain: SQNR = 6.02 × 10 + 1.76 = 61.96 dB.
```

```quiz
q: Which of these need coherent detection (a phase-locked carrier) at the receiver? (Select all that apply.)
* BPSK
* QPSK
- DPSK
- Non-coherent FSK
explain: BPSK and QPSK need carrier phase; DPSK compares consecutive symbols and non-coherent FSK uses envelope detectors.
```
