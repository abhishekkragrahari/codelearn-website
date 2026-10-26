---
title: Electromagnetic Fields
chapter: Circuits and Fields
description: GATE EE syllabus for electromagnetic fields, with Coulomb's and Gauss's laws, fields and potentials of charge distributions, capacitance, Biot-Savart and Ampere's laws, Faraday's law, Lorentz force, magnetic circuits and inductance, with solved examples.
---
## Syllabus

Coulomb's law, electric field intensity and flux density, Gauss's law, divergence, fields and potentials of point, line, plane and spherical charges, dielectrics, capacitance of simple configurations; Biot-Savart law, Ampere's law, curl, Faraday's law, Lorentz force, inductance, magnetomotive force, reluctance, magnetic circuits, self and mutual inductance.

## Key concepts and formulas

**Electrostatics** (ε₀ = 8.854 × 10⁻¹² F/m, 1/(4πε₀) ≈ 9 × 10⁹):

- Coulomb: F = q₁q₂/(4πεr²). Field of a point charge E = q/(4πεr²); potential V = q/(4πεr).
- Gauss's law: ∮ **D**·d**S** = Q<sub>enc</sub>, or ∇·**D** = ρ<sub>v</sub>.
- Infinite line charge: E = ρ<sub>L</sub>/(2πεr). Infinite sheet: E = ρ<sub>s</sub>/(2ε), independent of distance.
- **E** = −∇V. Energy stored in a capacitor W = ½CV².

**Capacitance.** Parallel plate **C = εA/d**; coaxial cable C = 2πεL/ln(b/a); isolated sphere C = 4πεa.

**Magnetostatics** (μ₀ = 4π × 10⁻⁷ H/m):

- Biot-Savart law; field of a long straight wire **B = μ₀I/(2πr)**; at the centre of a circular loop B = μ₀I/(2a); inside a long solenoid B = μ₀nI (n = turns per metre).
- Ampere's law: ∮ **H**·d**l** = I<sub>enc</sub>, or ∇ × **H** = **J**.
- Lorentz force **F** = q(**E** + **v** × **B**); force on a conductor F = BIL sin θ. Force per unit length between parallel wires μ₀I₁I₂/(2πd).

**Faraday's law.** emf = −dΦ/dt = −N dΦ/dt for N turns; motional emf = Blv.

**Magnetic circuits.** mmf = NI; reluctance S = l/(μA); flux Φ = mmf/S. Inductance **L = N²/S = μN²A/l**; energy ½LI². Mutual inductance M = k√(L₁L₂).

**Maxwell's equations** (differential form): ∇·**D** = ρ<sub>v</sub>, ∇·**B** = 0, ∇ × **E** = −∂**B**/∂t, ∇ × **H** = **J** + ∂**D**/∂t.

## Worked example

Find the capacitance of a parallel plate capacitor with plates of 0.02 m² separated by 1 mm of dielectric with ε<sub>r</sub> = 5. Find the field 5 cm from a long wire carrying 10 A. Then find the inductance of a toroid with 500 turns on an iron core (μ<sub>r</sub> = 1000), mean length 0.4 m and cross-section 4 cm².

```python
import math

e0, mu0 = 8.854e-12, 4 * math.pi * 1e-7
C = e0 * 5 * 0.02 / 1e-3
print(f"C = {C * 1e12:.2f} pF")
print(f"B at 5 cm from 10 A wire = {mu0 * 10 / (2 * math.pi * 0.05) * 1e6:.1f} uT")
N, mur, l, A = 500, 1000, 0.4, 4e-4
S = l / (mu0 * mur * A)
print(f"reluctance = {S:.4e} A/Wb, L = {N ** 2 / S:.4f} H")
```
```output
C = 885.40 pF
B at 5 cm from 10 A wire = 40.0 uT
reluctance = 7.9577e+05 A/Wb, L = 0.3142 H
```

## Practice questions

```quiz
q: Two point charges of 1 μC each are 0.3 m apart in air. What is the force between them in N? (Use 1/(4πε₀) = 9 × 10⁹.)
answer: 0.1
verify: round(9e9 * 1e-6 * 1e-6 / 0.3 ** 2, 6)
explain: F = 9 × 10⁹ × 10⁻¹²/0.09 = 0.1 N.
```

```quiz
q: The plate separation of a parallel plate capacitor is doubled and the dielectric constant is tripled. By what factor does the capacitance change?
answer: 1.5
verify: 3 / 2
explain: C = εA/d, so C changes by 3/2 = 1.5.
```

```quiz
q: A coil of 200 turns has its flux changing uniformly from 5 mWb to 1 mWb in 0.02 s. What is the magnitude of the induced emf in volts?
answer: 40
verify: round(200 * (5e-3 - 1e-3) / 0.02, 6)
explain: The magnitude of the emf is N dΦ/dt = 200 × 0.004/0.02 = 40 V.
```

```quiz
q: Two coils have L₁ = 4 mH and L₂ = 9 mH with coupling coefficient 0.5. What is the mutual inductance in mH?
answer: 3
verify: 0.5 * (4 * 9) ** 0.5
explain: M = k√(L₁L₂) = 0.5 × √36 = 3 mH.
```

```quiz
q: Which of Maxwell's equations states that magnetic monopoles do not exist?
- ∇·D = ρ
* ∇·B = 0
- ∇ × E = −∂B/∂t
- ∇ × H = J + ∂D/∂t
explain: ∇·B = 0 says magnetic flux lines have no sources or sinks, so there are no isolated magnetic charges.
```
