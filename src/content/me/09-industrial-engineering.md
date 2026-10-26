---
title: Industrial Engineering and Operations Research
chapter: Materials, Manufacturing and Industrial Engineering
description: GATE ME syllabus for industrial engineering, with forecasting, aggregate planning, scheduling (SPT, Johnson's rule), MRP, inventory models (EOQ), linear programming, transportation and assignment, queuing (M/M/1) and PERT/CPM, with solved examples.
---
## Syllabus

- **Production planning and control**: forecasting models, aggregate production planning, scheduling, materials requirement planning, lean manufacturing.
- **Inventory control**: deterministic models, safety stock inventory control systems.
- **Operations research**: linear programming, simplex method, transportation, assignment, network flow models, simple queuing models, PERT and CPM.

## Key concepts and formulas

**Forecasting.** Simple moving average of the last n periods. **Exponential smoothing**: F<sub>t+1</sub> = αD<sub>t</sub> + (1 − α)F<sub>t</sub>. Errors: MAD = mean |error|; tracking signal = running sum of errors/MAD.

**Inventory.**

- **Economic order quantity** EOQ = **√(2DS/H)**, where D is annual demand, S the ordering cost and H the holding cost per unit per year. At the EOQ, annual ordering cost = annual holding cost.
- Total cost at EOQ = √(2DSH).
- Production (EPQ) model: Q* = √(2DS/(H(1 − d/p))).
- Reorder point = demand during lead time + safety stock.

**Scheduling.** On one machine, **SPT** (shortest processing time) minimises the mean flow time; **EDD** (earliest due date) minimises the maximum lateness. For two machines in series, **Johnson's rule** minimises the makespan: pick the smallest time; if it is on machine 1, schedule the job first, otherwise last; repeat.

**Linear programming.** Optimum at a corner point of the feasible region. The simplex method moves between corner points. Transportation problems are balanced when total supply = total demand; a basic feasible solution has m + n − 1 allocations. Assignment problems are solved by the Hungarian method.

**Queuing (M/M/1).** With arrival rate λ and service rate μ (ρ = λ/μ < 1):

| Measure | Formula |
| --- | --- |
| Number in system L | ρ/(1 − ρ) = λ/(μ − λ) |
| Number in queue L<sub>q</sub> | ρ²/(1 − ρ) |
| Time in system W | 1/(μ − λ) |
| Time in queue W<sub>q</sub> | ρ/(μ − λ) |
| Probability the system is empty | 1 − ρ |

Little's law L = λW holds for any stable queue.

**PERT/CPM.** Critical path = longest path; total float = LS − ES; PERT t<sub>e</sub> = (a + 4m + b)/6, σ = (b − a)/6. **Break-even** quantity = fixed cost/(price − variable cost per unit).

## Worked example

Annual demand is 12000 units, ordering cost ₹300 per order and holding cost ₹20 per unit per year: find the EOQ and the total cost. For an M/M/1 queue with λ = 8 per hour and μ = 10 per hour, find L, L<sub>q</sub>, W and W<sub>q</sub>. Then sequence five jobs on two machines with Johnson's rule.

```python
import math

D, S, H = 12000, 300, 20
Q = math.sqrt(2 * D * S / H)
print(f"EOQ = {Q:.1f} units, orders per year = {D / Q:.2f}, total cost = {math.sqrt(2 * D * S * H):.1f}")
lam, mu = 8, 10
rho = lam / mu
print(f"L = {rho / (1 - rho):.2f}, Lq = {rho ** 2 / (1 - rho):.2f}, W = {60 / (mu - lam):.0f} min, Wq = {60 * rho / (mu - lam):.0f} min")

jobs = {"A": (5, 2), "B": (1, 6), "C": (9, 7), "D": (3, 8), "E": (10, 4)}
front, back, left = [], [], dict(jobs)
while left:
    j = min(left, key=lambda k: (min(left[k]), k))   # job with the smallest time on either machine
    if left[j][0] <= left[j][1]:
        front.append(j)          # smallest time on machine 1: schedule as early as possible
    else:
        back.insert(0, j)        # smallest time on machine 2: schedule as late as possible
    del left[j]
order = front + back
t1 = t2 = 0
for j in order:
    t1 += jobs[j][0]
    t2 = max(t1, t2) + jobs[j][1]
print("Johnson sequence:", "-".join(order), " makespan =", t2)
```
```output
EOQ = 600.0 units, orders per year = 20.00, total cost = 12000.0
L = 4.00, Lq = 3.20, W = 30 min, Wq = 24 min
Johnson sequence: B-D-C-E-A  makespan = 30
```

## Practice questions

```quiz
q: Annual demand is 8000 units, ordering cost is ₹100 per order and holding cost is ₹4 per unit per year. What is the EOQ? Give the answer to two decimal places.
answer: 632.46
verify: round((2 * 8000 * 100 / 4) ** 0.5, 2)
explain: EOQ = √(2 × 8000 × 100/4) = √400000 ≈ 632.46 units.
```

```quiz
q: In an M/M/1 queue, customers arrive at 6 per hour and are served at 9 per hour. What is the average number of customers in the system?
answer: 2
verify: 6 / (9 - 6)
explain: L = λ/(μ − λ) = 6/3 = 2 customers.
```

```quiz
q: For the same queue (λ = 6, μ = 9 per hour), what is the average waiting time in the queue, in minutes?
answer: 13.3333
verify: round(60 * (6 / 9) / (9 - 6), 4)
explain: W<sub>q</sub> = ρ/(μ − λ) = (2/3)/3 h = 2/9 h ≈ 13.33 min.
```

```quiz
q: Using exponential smoothing with α = 0.2, the forecast for March was 100 and actual March demand was 120. What is the forecast for April?
answer: 104
verify: 0.2 * 120 + 0.8 * 100
explain: F = αD + (1 − α)F<sub>prev</sub> = 0.2 × 120 + 0.8 × 100 = 104.
```

```quiz
q: A product sells for ₹50 with a variable cost of ₹30 per unit and fixed costs of ₹40000. What is the break-even quantity?
answer: 2000
verify: 40000 / (50 - 30)
explain: Break-even quantity = 40000/(50 − 30) = 2000 units.
```
