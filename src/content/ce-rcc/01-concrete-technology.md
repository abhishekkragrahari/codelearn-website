---
title: Concrete Technology and Material Properties
chapter: Concrete
description: Cement types and tests, aggregates, water-cement ratio and Abrams' law, workability tests, mix design basics, characteristic strength, modulus of elasticity, creep and shrinkage.
---
Reinforced concrete design starts from the materials. This lesson covers the concrete properties that GATE CE asks about, using the values of IS 456 and related Indian standards.

## Cement

- **Bogue compounds:** C₃S (early strength), C₂S (later strength), C₃A (fast setting, heat; sulphate attack), C₄AF.
- Types: OPC (33, 43, 53 grades), PPC, PSC, rapid hardening, low-heat, sulphate-resisting.
- **Tests:** fineness, normal consistency (Vicat), initial setting time (≥ 30 min for OPC) and final setting time (≤ 600 min), soundness (Le Chatelier, autoclave), compressive strength of mortar cubes.

## Fresh concrete

- **Abrams' law:** strength falls as the **water–cement ratio** rises. Workability rises with water, so admixtures (plasticisers) are used to get both.
- **Workability tests:** slump (most common), compaction factor, Vee-Bee (stiff mixes), flow table.
- Problems: segregation and bleeding.

## Strength

- **Characteristic strength f_ck:** the strength below which not more than **5%** of results fall. Target mean strength for mix design: **f_ck + 1.65 s** (s = standard deviation).
- Grades: M20 means f_ck = 20 MPa (150 mm cubes at 28 days).
- **Flexural strength** (modulus of rupture): f_cr = **0.7 √f_ck**.
- **Modulus of elasticity:** E_c = **5000 √f_ck** (MPa).
- Steel: E_s = 2 × 10⁵ MPa, so the modular ratio m = E_s/E_c (working stress method uses m = 280/(3σ_cbc)).

## Long-term behaviour

- **Creep:** strain growing under sustained load; the creep coefficient is larger for concrete loaded at an early age.
- **Shrinkage:** volume loss as concrete dries, independent of load.
- **Durability:** IS 456 sets a minimum cement content, a maximum w/c ratio and a minimum grade for each exposure condition, and nominal cover (for example 20 mm for mild, 30 mm moderate, 45 mm severe exposure).

## Worked example

M25 concrete has f_ck = 25 MPa, and site control has s = 4 MPa.

- Target mean strength = 25 + 1.65 × 4 = **31.6 MPa**.
- E_c = 5000 √25 = **25,000 MPa**; f_cr = 0.7 × 5 = **3.5 MPa**.

## Practice

```quiz
q: What is the modulus of elasticity of M30 concrete in MPa as per IS 456? (Round to the nearest integer.)
answer: 27386
verify: round(5000 * 30 ** 0.5)
explain: E_c = 5000√30 = 27,386 MPa.
```

```quiz
q: The characteristic strength of concrete is the strength below which not more than what percentage of test results fall?
answer: 5
verify: 5
explain: IS 456 defines f_ck as the 5% fractile of the strength distribution.
```

```quiz
q: For M20 with a standard deviation of 4 MPa, what is the target mean strength in MPa?
answer: 26.6
verify: round(20 + 1.65 * 4, 6)
explain: f_target = 20 + 1.65 × 4 = 26.6 MPa.
```

```quiz
q: Which compound of cement is mainly responsible for early strength?
* C₃S (tricalcium silicate)
- C₂S (dicalcium silicate)
- C₄AF
- Gypsum
explain: C₃S hydrates quickly and gives most of the strength in the first weeks; C₂S adds strength later.
```

```quiz
q: What is the flexural strength (MPa) of M25 concrete as per IS 456 (0.7√f_ck)?
answer: 3.5
verify: round(0.7 * 25 ** 0.5, 6)
explain: f_cr = 0.7√25 = 3.5 MPa.
```

```quiz
q: A concrete mix needs a target mean strength of 38.25 MPa for M30. What standard deviation (MPa) was assumed? (Use f_ck + 1.65s.)
answer: 5
verify: round((38.25 - 30) / 1.65, 6)
explain: s = (38.25 − 30)/1.65 = 5 MPa.
```
