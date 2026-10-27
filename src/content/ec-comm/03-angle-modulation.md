---
title: Frequency and Phase Modulation
chapter: Analog Modulation
description: FM and PM signals, frequency deviation and modulation index, narrowband and wideband FM, Bessel spectrum, Carson's rule, generation and detection, pre-emphasis, and noise performance.
---
**Angle modulation** varies the carrier's phase or frequency. It uses more bandwidth than AM but gives much better noise immunity.

## FM and PM

- **PM:** phase ∝ message: s(t) = A cos(ω_c t + k_p m(t)).
- **FM:** instantaneous frequency f_i = f_c + k_f m(t).
- For a tone m(t) = A_m cos ω_m t in FM: **frequency deviation** Δf = k_f A_m and **modulation index β = Δf/f_m**.
- In FM, Δf depends only on the message amplitude; in PM, the deviation also grows with message frequency.
- The amplitude is constant, so the **power is A²/2 regardless of β**.

## Spectrum

s(t) = A Σ J_n(β) cos((ω_c + nω_m)t): sidebands at every multiple of f_m, with Bessel function amplitudes.

- **Narrowband FM** (β ≪ 1): like AM, bandwidth ≈ 2f_m.
- **Carson's rule:** **B ≈ 2(Δf + f_m) = 2f_m(β + 1)**.
- At certain β (2.405, 5.52, …) J₀(β) = 0: the carrier vanishes.
- Commercial FM broadcast: Δf = 75 kHz, f_m = 15 kHz → B ≈ 180 kHz.

## Generation and detection

- **Direct** (VCO, varactor) and **indirect (Armstrong)** methods: NBFM followed by frequency multiplication. **Frequency multiplication by n multiplies both f_c and Δf by n**; mixing shifts f_c without changing Δf.
- **Detection:** slope detector, Foster–Seeley discriminator, ratio detector, PLL.

## Noise

- For a tone, wideband FM gives an output SNR of about **(3/2)β²** times the baseband SNR, as long as the input stays above the **threshold**. Below threshold, performance collapses.
- Noise at the FM detector output rises with frequency (parabolic PSD), so FM uses **pre-emphasis** (boost high frequencies before transmission) and **de-emphasis** at the receiver.

## Worked example

An FM signal has Δf = 50 kHz and f_m = 10 kHz.

- β = **5**; Carson bandwidth = 2(50 + 10) = **120 kHz**.

## Practice

```quiz
q: An NBFM signal at 200 kHz carrier with Δf = 25 Hz passes through a ×64 multiplier. What is the new frequency deviation in kHz?
answer: 1.6
verify: 25 * 64 / 1000
explain: Multiplication scales Δf by 64: 1600 Hz = 1.6 kHz (the carrier becomes 12.8 MHz).
```

```quiz
q: A tone of 5 kHz frequency-modulates a carrier with β = 3. What is the Carson's rule bandwidth in kHz?
answer: 40
verify: 2 * 5 * (3 + 1)
explain: B = 2f_m(β + 1) = 2 × 5 × 4 = 40 kHz.
```

```quiz
q: An FM transmitter has an unmodulated carrier power of 50 W. What is its power when modulated with β = 2?
answer: 50
verify: 50
explain: FM has constant envelope, so the total power is unchanged; it is only redistributed among the sidebands.
```

```quiz
q: Pre-emphasis is used in FM systems because:
* The output noise power spectral density rises with frequency
- The message has no high-frequency content
- It reduces the transmitted bandwidth
- It removes the carrier
explain: FM detector noise grows as f², so boosting high message frequencies before transmission improves their SNR.
```
