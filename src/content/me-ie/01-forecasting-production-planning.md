---
title: Forecasting and Production Planning
chapter: Production Planning
description: Moving average, weighted average and exponential smoothing forecasts, linear regression, forecast errors (MAD, MSE, bias), aggregate planning, MRP and line balancing.
---
Production planning starts with a **forecast** of demand, then decides how much to make, when, and with what resources.

## Forecasting methods

- **Simple moving average** (n periods): F_{t+1} = (D_t + D_{t−1} + … + D_{t−n+1})/n.
- **Weighted moving average:** recent periods get larger weights (weights sum to 1).
- **Exponential smoothing:** **F_{t+1} = F_t + α(D_t − F_t) = αD_t + (1 − α)F_t**, with 0 < α < 1. Larger α reacts faster to changes; smaller α smooths more.
- **Linear regression (trend):** D = a + bt with b = (nΣtD − ΣtΣD)/(nΣt² − (Σt)²) and a = D̄ − b t̄.

## Forecast errors

With error e_t = D_t − F_t:

- **MAD** = Σ|e|/n; **MSE** = Σe²/n.
- **Bias** (mean error) = Σe/n; a forecast is unbiased if this is near zero.
- **Tracking signal** = Σe/MAD; values beyond about ±4 mean the forecast should be revised.

## Aggregate planning

Matches capacity to demand over the medium term using: changing the workforce (hire/fire), overtime, inventory, subcontracting, or backorders. A **level** strategy keeps output constant and uses inventory; a **chase** strategy changes output to follow demand.

## MRP

**Material requirements planning** works backward from the master production schedule using the **bill of materials** and lead times:

Net requirement = gross requirement − on-hand inventory − scheduled receipts.

## Line balancing

For an assembly line with task times tᵢ and cycle time C:

- **Cycle time** C = available time / required output.
- **Minimum number of stations** = ⌈Σtᵢ/C⌉.
- **Line efficiency** = Σtᵢ/(n × C); **balance delay** = 1 − efficiency.

## Worked example

Demand for three months was 100, 120 and 110. The last forecast was 105 with α = 0.2, and actual demand was 110.

- Next forecast = 105 + 0.2 × (110 − 105) = **106**.
- 3-month moving average = (100 + 120 + 110)/3 = **110**.

## Practice

```quiz
q: With α = 0.3, the last forecast was 200 and actual demand was 240. What is the next forecast?
answer: 212
verify: round(200 + 0.3 * (240 - 200), 6)
explain: F = 200 + 0.3 × 40 = 212.
```

```quiz
q: Forecast errors over four periods are 5, −3, 4 and −2. What is the MAD?
answer: 3.5
verify: (5 + 3 + 4 + 2) / 4
explain: MAD = (5 + 3 + 4 + 2)/4 = 14/4 = 3.5.
```

```quiz
q: Tasks on a line total 40 minutes and the cycle time is 10 minutes. Using 5 stations, what is the line efficiency?
answer: 0.8
verify: 40 / (5 * 10)
explain: Efficiency = Σt/(nC) = 40/50 = 0.8 (minimum stations would be ⌈40/10⌉ = 4).
```

```quiz
q: In exponential smoothing, a larger smoothing constant α makes the forecast:
* Respond faster to recent changes in demand
- Smoother and slower to respond
- Independent of recent demand
- Always equal to the average demand
explain: α is the weight on the latest demand, so a larger α follows changes faster.
```

```quiz
q: Demands for four months are 80, 90, 100 and 110. What is the 3-month moving-average forecast for month 5?
answer: 100
verify: (90 + 100 + 110) / 3
explain: (90 + 100 + 110)/3 = 100.
```

```quiz
q: A line must produce 480 units in an 8-hour shift. What is the cycle time in minutes?
answer: 1
verify: 8 * 60 / 480
explain: C = available time/output = 480 min/480 = 1 minute.
```
