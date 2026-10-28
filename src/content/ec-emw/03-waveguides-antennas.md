---
title: Waveguides and Antennas
chapter: Waveguides and Antennas
description: Rectangular waveguide TE and TM modes, cutoff frequency, dominant TE10 mode, guide wavelength and phase and group velocity, antenna parameters, dipoles, arrays and the Friis transmission equation.
---
At microwave frequencies, power travels in **waveguides** and is launched into space by **antennas**.

## Rectangular waveguides

For inner dimensions a × b (a > b), a hollow guide supports TE_mn and TM_mn modes but **not TEM**.

- **Cutoff frequency f_c = (c/2)√((m/a)² + (n/b)²)**.
- **Dominant mode TE₁₀:** f_c = **c/(2a)**, λ_c = 2a. TM₁₁ is the lowest TM mode (TM₁₀ and TM₀₁ do not exist).
- Only frequencies above f_c propagate; below it, the mode decays (evanescent).
- **Guide wavelength** λ_g = λ/√(1 − (f_c/f)²) (longer than in free space).
- **Phase velocity** v_p = c/√(1 − (f_c/f)²) > c; **group velocity** v_g = c√(1 − (f_c/f)²) < c; **v_p v_g = c²**.
- Wave impedance (TE): η/√(1 − (f_c/f)²).

## Antenna parameters

- **Radiation pattern**, beamwidth (half-power), side lobes.
- **Directivity** D = maximum radiation intensity/average; **gain** G = η_rad D.
- **Effective aperture** A_e = Gλ²/(4π).
- **Radiation resistance** R_r: power radiated = ½ I² R_r.
- Polarisation, bandwidth, input impedance.

## Common antennas

| Antenna | Key values |
| --- | --- |
| Hertzian (short) dipole, length dl | R_r = 80π²(dl/λ)²; D = 1.5 |
| **Half-wave dipole** | **R_r ≈ 73 Ω**; D = 1.64 (2.15 dBi) |
| Quarter-wave monopole on a ground plane | R_r ≈ 36.5 Ω |
| Small loop | Very low R_r |
| Horn, parabolic dish, patch, Yagi | High gain and directivity |

**Arrays:** the total pattern = element pattern × **array factor**. Broadside arrays radiate perpendicular to the line of elements (zero progressive phase); end-fire arrays along it.

## Link budget

**Friis transmission equation:** **P_r = P_t G_t G_r (λ/(4πd))²**

Free-space path loss (dB) = 20 log(4πd/λ).

## Worked example

A standard X-band guide has a = 2.286 cm. At 10 GHz:

- f_c = 3 × 10⁸/(2 × 0.02286) = **6.56 GHz**.
- λ = 3 cm; λ_g = 3/√(1 − 0.656²) = **3.98 cm**.

## Practice

```quiz
q: A rectangular guide has a = 3 cm. What is the TE₁₀ cutoff frequency in GHz?
answer: 5
verify: round(3e8 / (2 * 0.03) / 1e9, 6)
explain: f_c = c/(2a) = 3 × 10⁸/0.06 = 5 GHz.
```

```quiz
q: A waveguide carries a mode with phase velocity 5 × 10⁸ m/s. What is the group velocity in units of 10⁸ m/s?
answer: 1.8
verify: 3 ** 2 / 5
explain: v_p v_g = c², so v_g = 9 × 10¹⁶/(5 × 10⁸) = 1.8 × 10⁸ m/s.
```

```quiz
q: An antenna has directivity 10 and radiation efficiency 0.8. What is its gain in dB? (Give 2 decimal places.)
answer: 9.03
verify: round(10 * __import__("math").log10(10 * 0.8), 2)
explain: G = 0.8 × 10 = 8, which is 10 log 8 = 9.03 dB.
```

```quiz
q: Which mode cannot propagate in a hollow rectangular waveguide?
* TEM
- TE₁₀
- TE₂₀
- TM₁₁
explain: A TEM wave needs two separate conductors; a hollow guide has only one.
```

```quiz
q: A rectangular guide has a = 4 cm. What is the TE₁₀ cutoff frequency in GHz?
answer: 3.75
verify: round(3e8 / (2 * 0.04) / 1e9, 6)
explain: f_c = c/(2a) = 3 × 10⁸/0.08 = 3.75 GHz.
```

```quiz
q: A half-wave dipole carries 2 A (peak) with R_r = 73 Ω. What power (W) does it radiate?
answer: 146
verify: 0.5 * 2 ** 2 * 73
explain: P = ½I²R_r = ½ × 4 × 73 = 146 W.
```
