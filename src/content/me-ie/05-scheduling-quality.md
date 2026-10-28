---
title: Scheduling, Work Study and Quality Control
chapter: Operations Management
description: Sequencing rules (SPT, EDD), Johnson's rule for two machines, work study and standard time, break-even analysis, control charts and acceptance sampling.
---
This lesson covers short-term **scheduling**, **work study** (how long a job should take), **break-even analysis**, and **statistical quality control**.

## Sequencing jobs on one machine

| Rule | Order jobs by | Minimises |
| --- | --- | --- |
| **SPT** (shortest processing time) | Increasing processing time | Mean flow time, mean waiting time |
| **EDD** (earliest due date) | Increasing due date | Maximum lateness (tardiness) |
| FCFS | Arrival order | Nothing in particular; it is simple and fair |

## Johnson's rule (n jobs, 2 machines)

Every job goes through machine 1 then machine 2. To minimise the **makespan**:

1. Find the smallest time among all jobs on both machines.
2. If it is on machine 1, put that job as **early** as possible; if on machine 2, as **late** as possible.
3. Remove the job and repeat.

## Work study

- **Method study** finds a better way to do the job (process charts, therbligs).
- **Time study:** observed time × **rating factor** = **normal time**. **Standard time** = normal time × (1 + allowance fraction).
- **Work sampling:** many random observations estimate the fraction of time spent on each activity.

## Break-even analysis

With fixed cost F, selling price p and variable cost v per unit:

- **Break-even quantity** = F/(p − v). (p − v) is the contribution per unit.
- Profit at quantity Q = Q(p − v) − F.

## Statistical quality control

- **Control charts for variables:** X̄ chart (mean) and R chart (range). Control limits for X̄: X̿ ± A₂R̄.
- **Control charts for attributes:** **p chart** (fraction defective): p̄ ± 3√(p̄(1 − p̄)/n); **c chart** (defects per unit): c̄ ± 3√c̄.
- A point outside the limits means an **assignable cause** to investigate.
- **Acceptance sampling:** inspect a sample of n and accept the lot if defects ≤ c. The **OC curve** shows the probability of accepting lots of each quality. Producer's risk α (rejecting a good lot), consumer's risk β (accepting a bad lot).

## Worked example

Observed time 2.0 min, rating 110%, allowances 10%.

- Normal time = 2.0 × 1.10 = 2.2 min. **Standard time = 2.2 × 1.10 = 2.42 min**.

## Practice

```quiz
q: Jobs with processing times 6, 2, 8 and 4 hours are done in SPT order. What is the mean flow time in hours?
answer: 10
verify: sum([2, 6, 12, 20]) / 4
explain: SPT order 2, 4, 6, 8 gives completion times 2, 6, 12, 20; mean = 40/4 = 10 hours.
```

```quiz
q: Three jobs pass through machines M1 then M2 with times A (3, 6), B (5, 2), C (1, 4). What is the minimum makespan using Johnson's rule?
answer: 13
verify:
  jobs = {"A": (3, 6), "B": (5, 2), "C": (1, 4)}
  best = None
  from itertools import permutations
  for order in permutations(jobs):
      t1 = t2 = 0
      for j in order:
          t1 += jobs[j][0]
          t2 = max(t2, t1) + jobs[j][1]
      best = t2 if best is None else min(best, t2)
  print(best)
explain: The smallest time is C on M1 (1), so C goes first; next is B on M2 (2), so B goes last; the order is C, A, B. M1 finishes the jobs at 1, 4 and 9. M2 finishes C at 5, A at max(5, 4) + 6 = 11 and B at max(11, 9) + 2 = 13.
```

```quiz
q: A c chart has an average of 9 defects per unit. What is its upper control limit?
answer: 18
verify: 9 + 3 * 9 ** 0.5
explain: UCL = c̄ + 3√c̄ = 9 + 3 × 3 = 18.
```

```quiz
q: To minimise the maximum lateness on a single machine, jobs should be sequenced by:
- Shortest processing time
* Earliest due date
- Longest processing time
- First come first served
explain: EDD order minimises the maximum lateness; SPT minimises mean flow time.
```

```quiz
q: Fixed cost ₹50,000, price ₹100 and variable cost ₹60 per unit. What is the break-even quantity?
answer: 1250
verify: 50000 // (100 - 60)
explain: BEP = 50,000/40 = 1250 units.
```

```quiz
q: A p chart uses samples of 100 with p̄ = 0.04. What is the upper control limit? (Give 4 decimal places.)
answer: 0.0988
verify: round(0.04 + 3 * (0.04 * 0.96 / 100) ** 0.5, 4)
explain: UCL = p̄ + 3√(p̄(1 − p̄)/n) = 0.04 + 3 × 0.0196 = 0.0988.
```
