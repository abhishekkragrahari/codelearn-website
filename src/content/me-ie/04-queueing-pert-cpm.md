---
title: Queueing Theory, PERT and CPM
chapter: Operations Research
description: M/M/1 queue formulas (utilisation, queue length, waiting time, Little's law), network diagrams, critical path, floats, and PERT expected time and variance.
---
Queueing theory predicts waiting lines; **CPM** and **PERT** plan projects made of many activities. Both appear every year in GATE ME as short numerical questions.

## The M/M/1 queue

Poisson arrivals at rate λ, exponential service at rate μ, one server, with **ρ = λ/μ < 1**:

| Quantity | Formula |
| --- | --- |
| Utilisation (probability server busy) | ρ = λ/μ |
| Probability system is empty | P₀ = 1 − ρ |
| Probability of n in system | Pₙ = (1 − ρ)ρⁿ |
| Average number in system | L = λ/(μ − λ) = ρ/(1 − ρ) |
| Average number in queue | L_q = λ²/(μ(μ − λ)) = ρ L |
| Average time in system | W = 1/(μ − λ) |
| Average time in queue | W_q = λ/(μ(μ − λ)) |

**Little's law:** **L = λW** and L_q = λW_q (valid for almost any queue).

## Project networks (CPM)

Draw activities as arrows (AOA) or nodes (AON) in order of precedence. For each activity:

- **Earliest start (ES)** and **earliest finish** EF = ES + duration (forward pass, take the maximum at merges).
- **Latest finish (LF)** and **latest start** LS = LF − duration (backward pass, take the minimum at bursts).
- **Total float** = LS − ES = LF − EF. **Free float** = ES of the next activity − EF.

The **critical path** is the longest path through the network; its activities have **zero total float**, and its length is the project duration. Delaying a critical activity delays the whole project.

**Crashing:** shorten critical activities with the lowest cost per unit time first, until another path becomes critical.

## PERT

For uncertain activity times with optimistic a, most likely m and pessimistic b:

- **Expected time** t_e = (a + 4m + b)/6.
- **Variance** σ² = ((b − a)/6)².
- Project variance = sum of the variances on the critical path. The probability of finishing by time T uses z = (T − T_e)/σ_project with the normal table.

## Worked example

Customers arrive at 6 per hour; the server handles 10 per hour.

- ρ = 0.6. L = 6/(10 − 6) = **1.5 customers**. W = 1/4 h = **15 minutes**.
- L_q = 0.6 × 1.5 = 0.9; W_q = 0.9/6 h = 9 minutes.

## Practice

```quiz
q: An M/M/1 queue has λ = 8 per hour and μ = 12 per hour. What is the average time a customer spends in the system, in minutes?
answer: 15
verify: 60 / (12 - 8)
explain: W = 1/(μ − λ) = 1/4 hour = 15 minutes.
```

```quiz
q: For the same queue, what is the average number of customers waiting in the queue? (Give 3 decimal places.)
answer: 1.333
verify: round(8 ** 2 / (12 * (12 - 8)), 3)
explain: L_q = λ²/(μ(μ − λ)) = 64/48 = 1.333.
```

```quiz
q: A PERT activity has a = 2, m = 5 and b = 14 days. What is its expected time in days?
answer: 6
verify: (2 + 4 * 5 + 14) / 6
explain: t_e = (2 + 20 + 14)/6 = 36/6 = 6 days.
```

```quiz
q: What is the variance of the same activity in days²?
answer: 4
verify: ((14 - 2) / 6) ** 2
explain: σ² = ((b − a)/6)² = (12/6)² = 4.
```

```quiz
q: Activities on the critical path have:
* Zero total float
- Maximum free float
- The shortest durations
- Negative float always
explain: The critical path is the longest path; any delay on it delays the project, so its total float is zero.
```

```quiz
q: An M/M/1 queue has λ = 3 and μ = 4 per hour. What is the average number of customers in the system?
answer: 3
verify: 3 / (4 - 3)
explain: L = λ/(μ − λ) = 3/1 = 3.
```

```quiz
q: An activity has optimistic 4, most likely 6 and pessimistic 14 days. What is its expected time in days?
answer: 7
verify: (4 + 4 * 6 + 14) / 6
explain: t_e = (4 + 24 + 14)/6 = 7 days.
```
