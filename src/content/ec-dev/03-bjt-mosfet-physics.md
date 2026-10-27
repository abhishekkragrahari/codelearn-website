---
title: BJT and MOS Device Physics
chapter: Transistors
description: BJT current components, emitter efficiency, base transport factor, Early effect, MOS capacitor regions, threshold voltage, oxide capacitance, MOSFET I-V, channel-length modulation and body effect.
---
This lesson explains how transistors work inside. Their circuit use (amplifiers and biasing) is covered in [BJT and MOSFET amplifiers](../ee-elec/transistor-amplifiers.html).

## Bipolar junction transistor

In active mode (BE forward, BC reverse biased), the emitter injects carriers that diffuse across a thin base and are swept into the collector.

- **α = I_C/I_E = γ × α_T** (emitter injection efficiency × base transport factor).
- **β = α/(1 − α)**; α = β/(1 + β).
- High β needs a heavily doped emitter, a lightly doped and **thin** base.
- **Early effect (base-width modulation):** a higher V_CE narrows the effective base, raising I_C: output resistance r_o = V_A/I_C.
- **Punch-through:** at very high V_CB, the depletion region crosses the whole base.
- Ebers–Moll model covers all regions.

## MOS capacitor

Applying gate voltage to a p-type substrate:

| V_G | Region |
| --- | --- |
| Negative | Accumulation (holes at the surface) |
| Small positive | Depletion |
| Above V_T | **Inversion** (electron channel forms) |

- **Oxide capacitance per area** C_ox = ε_ox/t_ox (ε_ox = 3.9 ε₀ ≈ 3.45 × 10⁻¹³ F/cm).
- **Threshold voltage** V_T = V_FB + 2φ_F + Q_dep/C_ox. It increases with substrate doping and oxide thickness.
- **Body effect:** a reverse source–body voltage V_SB raises V_T: V_T = V_T0 + γ(√(2φ_F + V_SB) − √(2φ_F)).
- C–V curve: high capacitance in accumulation, falling in depletion, and (at low frequency) rising again in inversion.

## MOSFET characteristics

- Linear (triode): I_D = μ_n C_ox (W/L)[(V_GS − V_T)V_DS − V_DS²/2].
- **Saturation** (V_DS ≥ V_GS − V_T): **I_D = ½ μ_n C_ox (W/L)(V_GS − V_T)²**.
- **Channel-length modulation:** I_D(1 + λV_DS), r_o ≈ 1/(λI_D).
- Short-channel effects: velocity saturation, drain-induced barrier lowering.

## IC fabrication (overview)

Oxidation, photolithography, diffusion and ion implantation, deposition, etching and metallisation. **CMOS** uses n- and p-channel MOSFETs in wells.

## Worked example

A MOSFET has t_ox = 10 nm, μ_nC_ox = 200 µA/V², W/L = 10, V_GS − V_T = 0.5 V.

- C_ox = 3.45 × 10⁻¹³/10⁻⁶ = **0.345 µF/cm²**.
- I_D = ½ × 200 × 10 × 0.25 = **250 µA**.

## Practice

```quiz
q: A BJT has α = 0.99. What is β?
answer: 99
verify: round(0.99 / (1 - 0.99))
explain: β = α/(1 − α) = 0.99/0.01 = 99.
```

```quiz
q: A MOSFET has μ_nC_ox = 100 µA/V², W/L = 20 and V_GS − V_T = 1 V in saturation. What is I_D in mA?
answer: 1
verify: 0.5 * 100e-6 * 20 * 1 ** 2 * 1000
explain: I_D = ½ × 100 µA × 20 × 1 = 1 mA.
```

```quiz
q: A BJT has V_A = 100 V and I_C = 2 mA. What is its output resistance in kΩ?
answer: 50
verify: 100 / 2e-3 / 1000
explain: r_o = V_A/I_C = 100/0.002 = 50 kΩ.
```

```quiz
q: Increasing the substrate doping of an n-channel MOSFET:
* Increases the threshold voltage
- Decreases the threshold voltage
- Has no effect on the threshold voltage
- Makes it a depletion-mode device
explain: More acceptors mean more depletion charge must be balanced before inversion, so V_T rises.
```
