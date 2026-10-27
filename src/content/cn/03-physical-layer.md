---
title: Physical Layer: Encoding and Multiplexing
chapter: Basics
description: Transmission media, bandwidth, bit rate and baud rate, Nyquist and Shannon limits, line coding (NRZ, NRZI, Manchester), modulation, and multiplexing (FDM, TDM, WDM).
---
The **physical layer** moves raw bits over a wire, fibre or radio channel. It decides how a 0 and a 1 look as a signal, how fast bits can be sent, and how several signals share one medium.

## Transmission media

| Medium | Typical use | Notes |
| --- | --- | --- |
| Twisted pair | Ethernet (Cat 5e/6), telephone | Twisting reduces interference |
| Coaxial cable | Cable TV, older Ethernet | Better shielding |
| Optical fibre | Backbones, long distances | Light by total internal reflection; huge bandwidth, no electrical interference |
| Radio / microwave | Wi-Fi, mobile, satellite | Unguided, shared, affected by noise and distance |

## Data rate limits

- **Bit rate** = bits per second; **baud rate** = signal changes (symbols) per second. With L signal levels, each symbol carries log₂ L bits: **bit rate = baud × log₂ L**.
- **Nyquist (noiseless channel):** maximum bit rate = **2 B log₂ L** (B = bandwidth in Hz).
- **Shannon (noisy channel):** capacity **C = B log₂(1 + S/N)**, whatever the number of levels. SNR in dB = 10 log₁₀(S/N).
- Use Shannon for the upper limit, then Nyquist for the number of levels needed.

## Line coding

Line coding maps bits to voltage levels:

| Code | Rule | Notes |
| --- | --- | --- |
| **NRZ-L** | 1 = high, 0 = low | Long runs lose synchronisation; has a DC component |
| **NRZ-I** | 1 = invert the level, 0 = no change | Runs of 0s still a problem |
| **Manchester** (IEEE 802.3) | 0 = high→low, 1 = low→high in mid-bit | Self-clocking, no DC; needs **twice the bandwidth** (baud = 2 × bit rate) |
| Differential Manchester | Transition at the start of a bit for 0, none for 1; always a mid-bit transition | Used in Token Ring |
| AMI (bipolar) | 0 = zero volts, 1 = alternating + and − | No DC component |

Block codes such as **4B/5B** and **8B/10B** add extra bits to guarantee enough transitions.

```python
bits = "1011001"
nrz_l = "".join("+" if b == "1" else "-" for b in bits)

level, nrz_i = "-", ""
for b in bits:                          # NRZ-I: a 1 flips the level
    if b == "1":
        level = "+" if level == "-" else "-"
    nrz_i += level

manchester = " ".join("-+" if b == "1" else "+-" for b in bits)   # IEEE 802.3
print("NRZ-L     ", nrz_l)
print("NRZ-I     ", nrz_i)
print("Manchester", manchester)
```
```output
NRZ-L      +-++--+
NRZ-I      ++-+++-
Manchester -+ +- -+ -+ +- +- -+
```

## Modulation

To send digital data over an analog (band-pass) channel, a carrier is modulated: **ASK** (amplitude), **FSK** (frequency), **PSK** (phase) and **QAM** (amplitude and phase together; 16-QAM carries 4 bits per symbol).

## Multiplexing

| Technique | Shares | Example |
| --- | --- | --- |
| **FDM** | Frequency bands, with guard bands | Radio, cable TV |
| **TDM** (synchronous) | Time slots in a fixed order | T1/E1 lines |
| Statistical TDM | Slots given on demand | Packet networks |
| **WDM** | Light wavelengths | Optical fibre |
| **CDMA** | Codes (all send at once) | Older mobile networks |

**T1 line:** 24 voice channels × 8 bits + 1 framing bit = 193 bits per frame, 8000 frames per second = **1.544 Mbps**.

## GATE-style practice questions

```quiz
q: A noiseless channel of bandwidth 3 kHz uses 4 signal levels. What is its maximum bit rate in kbit/s (Nyquist)?
answer: 12
verify: 2 * 3 * __import__("math").log2(4)
explain: 2 × 3 kHz × log₂ 4 = 12 kbit/s.
```

```quiz
q: A channel of bandwidth 4 kHz has an SNR of 15 (linear). What is its Shannon capacity in kbit/s?
answer: 16
verify: 4 * __import__("math").log2(1 + 15)
explain: C = 4 × log₂ 16 = 16 kbit/s.
```

```quiz
q: Data at 10 Mbps is sent using Manchester encoding. What is the baud rate in Mbaud?
answer: 20
verify: 2 * 10
explain: Manchester has a transition in the middle of every bit, so the signal rate is twice the bit rate.
```

```quiz
q: What is the data rate of a T1 line in Mbps? (Give 3 decimal places.)
answer: 1.544
verify: (24 * 8 + 1) * 8000 / 1e6
explain: 193 bits per frame × 8000 frames per second = 1,544,000 bit/s.
```

```quiz
q: Which line codes have no DC component? (Select all that apply.)
* Manchester
* AMI (bipolar)
- NRZ-L
- Unipolar NRZ
explain: Manchester has equal high and low time in every bit, and AMI alternates the polarity of 1s; NRZ codes can drift.
```
