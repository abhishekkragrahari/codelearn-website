---
title: Inventory Control and EOQ Models
chapter: Inventory
description: Inventory costs, the economic order quantity model, total cost, production (EPQ) model, quantity discounts, safety stock and reorder point, and ABC analysis.
---
Inventory models decide **how much** to order and **when**. The classic answer is the **economic order quantity (EOQ)**, which balances ordering cost against holding cost.

## Costs

- **Ordering (setup) cost** S per order.
- **Holding (carrying) cost** H per unit per year (often a percentage of unit price).
- **Shortage cost** if demand cannot be met.

## Basic EOQ model

Assumptions: constant known demand D per year, instant replenishment, no shortages.

- Annual ordering cost = (D/Q) S. Annual holding cost = (Q/2) H.
- **EOQ: Q* = √(2DS/H)**.
- At Q*, ordering cost = holding cost, and **total cost** (excluding purchase) = √(2DSH).
- Number of orders = D/Q*; time between orders = Q*/D.

The total cost curve is flat near Q*: ordering 20% more or less than EOQ raises cost only a little.

## Production (EPQ) model

When stock is produced at rate P (> demand rate d), not received at once:

**Q* = √(2DS/(H(1 − d/P)))**, maximum inventory = Q(1 − d/P).

## Model with planned shortages (backorders)

With backorder cost B per unit per year: Q* = √(2DS/H) × √((H + B)/B).

## Quantity discounts

Compute EOQ at each price; if it is below the price break, raise it to the break quantity. Then compare total cost (purchase + ordering + holding) at each candidate and choose the lowest.

## Reorder point and safety stock

- **Reorder point** = demand during lead time + safety stock = d L + SS.
- With uncertain demand: SS = z σ_L (z from the normal table for the desired service level).

## ABC analysis

Classifies items by annual value: **A** items (about 10–20% of items, 70–80% of value) get tight control; **C** items (many items, little value) get simple control. **VED** analysis classifies by criticality (vital, essential, desirable).

## Worked example

D = 12,000 units/year, S = ₹100 per order, H = ₹6 per unit per year.

- Q* = √(2 × 12,000 × 100/6) = √400,000 = **632.5 units**.
- Total cost = √(2 × 12,000 × 100 × 6) = **₹3794.7**.

## Practice

```quiz
q: Annual demand is 2000 units, ordering cost ₹40 per order and holding cost ₹4 per unit per year. What is the EOQ?
answer: 200
verify: (2 * 2000 * 40 / 4) ** 0.5
explain: Q* = √(2 × 2000 × 40/4) = √40,000 = 200 units.
```

```quiz
q: For the same data, what is the minimum annual total of ordering and holding cost in ₹?
answer: 800
verify: (2 * 2000 * 40 * 4) ** 0.5
explain: TC = √(2DSH) = √640,000 = 800 (ordering 400 + holding 400).
```

```quiz
q: Daily demand is 50 units, lead time 6 days and safety stock 100 units. What is the reorder point?
answer: 400
verify: 50 * 6 + 100
explain: ROP = dL + SS = 300 + 100 = 400 units.
```

```quiz
q: If annual demand becomes 4 times larger (other costs the same), the EOQ becomes:
- 4 times
* 2 times
- 16 times
- Unchanged
explain: Q* ∝ √D, so it doubles.
```

```quiz
q: In the EPQ model, D = 6000/year, S = 300, H = 4, and production rate is twice the demand rate. What is the optimal lot size? (Round to the nearest integer.)
answer: 1342
verify: round((2 * 6000 * 300 / (4 * (1 - 0.5))) ** 0.5)
explain: Q* = √(2 × 6000 × 300/(4 × 0.5)) = √1,800,000 = 1341.6 ≈ 1342.
```
