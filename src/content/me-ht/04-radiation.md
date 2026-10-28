---
title: Radiation Heat Transfer
chapter: Radiation
description: Black body radiation, Stefan-Boltzmann and Wien's laws, emissivity and Kirchhoff's law, view factors and their rules, radiation between surfaces and radiation shields.
---
All bodies above absolute zero emit **thermal radiation**. It needs no medium, and it grows with the fourth power of temperature, so it dominates at high temperatures.

## Black body laws

- **Stefan–Boltzmann law:** a black body emits E_b = σT⁴, with **σ = 5.67 × 10⁻⁸ W/m²·K⁴** (T in kelvin).
- **Wien's displacement law:** the wavelength of peak emission λ_max T = **2898 µm·K**. The sun (≈ 5800 K) peaks at about 0.5 µm (visible light).
- **Planck's law** gives the full spectrum.

## Real surfaces

- **Emissivity** ε = E/E_b (0 to 1). A **grey** body has the same ε at all wavelengths.
- Incident radiation is absorbed, reflected or transmitted: **α + ρ + τ = 1** (τ = 0 for opaque bodies).
- **Kirchhoff's law:** at thermal equilibrium, **ε = α**. Good absorbers are good emitters.

## View factors

F₁₂ is the fraction of radiation leaving surface 1 that reaches surface 2.

- **Reciprocity:** A₁F₁₂ = A₂F₂₁.
- **Summation:** Σ F₁ⱼ = 1 for an enclosure.
- A flat or convex surface cannot see itself: F₁₁ = 0.
- Small body inside a large enclosure: F₁₂ = 1.

## Radiation exchange

Between two grey surfaces, use the network of resistances: surface resistance (1 − ε)/(εA) and space resistance 1/(A₁F₁₂).

- **Two large parallel plates:** q = σ(T₁⁴ − T₂⁴) / (1/ε₁ + 1/ε₂ − 1).
- **Small body in a large enclosure:** Q = ε₁ A₁ σ (T₁⁴ − T₂⁴).
- **Radiation shields:** with n shields of the same emissivity as the plates, the heat flow is divided by **(n + 1)**.

## Worked example

Two large parallel plates at 800 K and 400 K have ε = 0.8 each.

- σ(T₁⁴ − T₂⁴) = 5.67 × 10⁻⁸ × (4.096 × 10¹¹ − 2.56 × 10¹⁰) = 21,773 W/m².
- Factor 1/(1/0.8 + 1/0.8 − 1) = 1/1.5 = 0.667.
- **q = 14,515 W/m²**. With one shield of ε = 0.8 in between: 7,258 W/m².

## Practice

```quiz
q: What is the emissive power of a black body at 1000 K in kW/m²? (Give 2 decimal places.)
answer: 56.7
verify: round(5.67e-8 * 1000 ** 4 / 1000, 2)
explain: E_b = σT⁴ = 5.67 × 10⁻⁸ × 10¹² = 56,700 W/m² = 56.7 kW/m².
```

```quiz
q: At what wavelength (µm) does a black body at 2000 K emit most strongly? (Give 3 decimal places.)
answer: 1.449
verify: round(2898 / 2000, 3)
explain: λ_max = 2898/T = 1.449 µm (infrared).
```

```quiz
q: A small sphere (area A₁) sits inside a large cubical enclosure. What is the view factor from the sphere to the enclosure?
answer: 1
verify: 1
explain: All radiation leaving the small convex sphere reaches the enclosure, and F₁₁ = 0, so F₁₂ = 1.
```

```quiz
q: Inserting 3 radiation shields (same emissivity as the plates) between two parallel plates reduces the heat flow to what fraction?
answer: 0.25
verify: 1 / (3 + 1)
explain: With n shields of equal emissivity, the heat flow becomes 1/(n + 1) = 1/4.
```

```quiz
q: A grey surface (ε = 0.5) at 600 K radiates to large cold surroundings at 0 K. What is the emitted flux in kW/m²? (σ = 5.67 × 10⁻⁸; give 3 decimal places.)
answer: 3.674
verify: round(0.5 * 5.67e-8 * 600 ** 4 / 1000, 3)
explain: q = εσT⁴ = 0.5 × 5.67 × 10⁻⁸ × 1.296 × 10¹¹ = 3674 W/m².
```

```quiz
q: Surface 1 (area 2 m²) has F₁₂ = 0.3 to surface 2 of area 3 m². What is F₂₁?
answer: 0.2
verify: round(2 * 0.3 / 3, 6)
explain: Reciprocity: A₁F₁₂ = A₂F₂₁, so F₂₁ = 0.6/3 = 0.2.
```
