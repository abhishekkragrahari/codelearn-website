---
title: Water Demand, Population Forecasting and Water Quality
chapter: Water Supply
description: Per capita demand and peak factors, population forecasting methods, physical, chemical and biological water quality parameters, hardness, alkalinity, pH and drinking water standards.
---
A water supply scheme starts with two questions: how much water will the town need over the design period, and what must be removed to make it safe?

## Water demand

- Per capita demand in India: about **135 litres per capita per day (lpcd)** for cities with full sewerage (CPHEEO), with lower values for smaller towns.
- **Peak factors** (fire demand aside): maximum daily demand ≈ 1.8 × average; maximum hourly demand ≈ 1.5 × maximum daily = **2.7 × average**.
- **Fire demand:** Kuichling's formula Q = 3182 √P (L/min, P in thousands), or as specified locally.
- Design periods: about 30 years for the scheme as a whole.

## Population forecasting

With past census populations:

| Method | Formula | Suits |
| --- | --- | --- |
| Arithmetic increase | P_n = P₀ + n x̄ | Old, stable cities |
| **Geometric increase** | P_n = P₀ (1 + r)ⁿ | Young, fast-growing cities |
| Incremental increase | P_n = P₀ + n x̄ + n(n + 1) ȳ/2 | Average cities |
| Logistic curve | S-shaped growth to a saturation value | Long-term planning |

x̄ = average increase per decade, ȳ = average increment of the increases, r = geometric mean growth rate per decade.

## Water quality

**Physical:** turbidity (NTU), colour, taste and odour, temperature.

**Chemical:**

- **pH** = −log₁₀[H⁺]; drinking water 6.5–8.5.
- **Hardness** (Ca²⁺ and Mg²⁺) as mg/L CaCO₃: hardness = Σ (concentration × 50/equivalent weight). Carbonate hardness ≤ alkalinity; the rest is non-carbonate hardness.
- **Alkalinity:** OH⁻, CO₃²⁻ and HCO₃⁻, also expressed as CaCO₃.
- Chlorides, nitrates (blue-baby syndrome above about 45 mg/L as NO₃), fluoride (dental and skeletal fluorosis above 1.5 mg/L), iron, manganese, arsenic.

**Biological:** coliforms indicate faecal contamination. **MPN** (most probable number) test, membrane filter test. Drinking water must have no E. coli in 100 mL.

Standards: **IS 10500** (Indian drinking water specification).

## Worked example

Water contains 40 mg/L Ca²⁺ and 12 mg/L Mg²⁺ (equivalent weights 20 and 12).

- Hardness = 40 × 50/20 + 12 × 50/12 = 100 + 50 = **150 mg/L as CaCO₃**.

## Practice

```quiz
q: A town has 50,000 people now and grows geometrically at 20% per decade. What is the population after 2 decades?
answer: 72000
verify: round(50000 * 1.2 ** 2)
explain: P = 50,000 × 1.2² = 72,000.
```

```quiz
q: A city of 1 lakh people uses 135 lpcd. What is the maximum hourly demand in MLD, taking 2.7 × average? (Give 3 decimal places.)
answer: 36.45
verify: round(100000 * 135 * 2.7 / 1e6, 3)
explain: Average = 13.5 MLD; × 2.7 = 36.45 MLD (rate).
```

```quiz
q: A water sample has pH 5. What is its hydrogen ion concentration in mol/L?
* 10⁻⁵
- 10⁵
- 5
- 10⁻⁹
explain: pH = −log[H⁺], so [H⁺] = 10⁻⁵ mol/L.
```

```quiz
q: Water has 60 mg/L Ca²⁺ (equivalent weight 20) and no magnesium. What is its total hardness as mg/L CaCO₃?
answer: 150
verify: 60 * 50 / 20
explain: Hardness = 60 × 50/20 = 150 mg/L as CaCO₃.
```
