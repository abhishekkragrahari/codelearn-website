---
title: Approximate Inference by Sampling
chapter: Reasoning under Uncertainty
description: Monte Carlo estimation in Bayesian networks, prior (direct) sampling, rejection sampling, likelihood weighting, and Gibbs sampling (Markov chain Monte Carlo), with their strengths and weaknesses, for GATE DA.
---
Exact inference is NP-hard in general, so large networks are handled with **approximate inference**: generate many random samples from the network and estimate probabilities by counting. By the law of large numbers, the estimates converge to the true values as the number of samples N grows; the error typically shrinks like 1/√N.

All examples use the sprinkler network from the previous lessons, where the exact answer to the query is **P(r | w) ≈ 0.692**.

| CPT | Probabilities |
| --- | --- |
| P(C) | 0.5 |
| P(S \| C) | C true: 0.1, C false: 0.5 |
| P(R \| C) | C true: 0.8, C false: 0.2 |
| P(W \| S, R) | S, R: 0.99; S, ¬R: 0.90; ¬S, R: 0.90; ¬S, ¬R: 0.05 |

## Prior (direct) sampling

Sample each variable **in topological order** (parents before children), using its CPT with the parents' already-sampled values:

1. Sample C from P(C): say C = true.
2. Sample S from P(S | c) = 0.1: say S = false.
3. Sample R from P(R | c) = 0.8: say R = true.
4. Sample W from P(W | ¬s, r) = 0.9: say W = true.

Each complete sample is drawn with exactly its joint probability, so the fraction of samples with some property estimates its probability. For example, P(c, ¬s, r, w) = 0.324 means about 32% of samples should be (true, false, true, true).

## Rejection sampling

To estimate P(X | **e**): generate prior samples, **throw away** those that do not match the evidence **e**, and count X in the rest.

It is correct (consistent), but wasteful: the fraction of samples kept is P(**e**). With rare evidence (say P(**e**) = 0.001), 999 of every 1000 samples are discarded. With many evidence variables, P(**e**) shrinks exponentially.

## Likelihood weighting

**Likelihood weighting** avoids rejection by **fixing** the evidence variables and sampling only the others. To make up for not sampling the evidence, each sample gets a **weight** equal to the probability of the evidence given its parents:

1. Start with weight w = 1.
2. Go through the variables in topological order. For a non-evidence variable, sample it from its CPT. For an evidence variable, set it to its observed value and multiply w by P(observed value | parents).
3. Estimate P(x | **e**) as (total weight of samples with X = x) / (total weight of all samples).

For the query P(R | w): sample C, S and R as usual; then W is fixed to true and the weight is P(w | s, r). A sample with S = false and R = false gets weight 0.05, while one with S = true and R = true gets 0.99.

Every sample is used, but if the evidence is mostly **downstream** of the sampled variables, the samples are drawn without regard to the evidence and many get tiny weights, so a few samples dominate the estimate.

## Gibbs sampling (Markov chain Monte Carlo)

**Gibbs sampling** wanders through the space of complete assignments instead of generating each sample from scratch:

1. Fix the evidence variables, and give every other variable an arbitrary initial value.
2. Repeatedly pick a non-evidence variable Xᵢ and **resample** it from P(Xᵢ | **mb**(Xᵢ)), its distribution given its **Markov blanket**: its parents, its children and its children's other parents. Given its Markov blanket, a node is independent of every other node.
3. After a **burn-in** period, count how often X = x among the visited states.

The sequence of states is a **Markov chain** whose stationary distribution is exactly P(non-evidence variables | **e**), so the long-run frequencies converge to the right answer. Successive samples are correlated, so more samples are needed than with independent draws.

```python
import random

random.seed(42)
pS = {True: 0.1, False: 0.5}
pR = {True: 0.8, False: 0.2}
pW = {(True, True): 0.99, (True, False): 0.90, (False, True): 0.90, (False, False): 0.05}
flip = lambda p: random.random() < p
N = 20000

# Rejection sampling for P(r | w)
kept = rain = 0
for _ in range(N):
    c = flip(0.5); s = flip(pS[c]); r = flip(pR[c]); w = flip(pW[(s, r)])
    if w:
        kept += 1
        rain += r
print(f"rejection sampling:  kept {kept} of {N}, P(r | w) ~ {rain / kept:.3f}")

# Likelihood weighting for P(r | w)
total = rain_w = 0.0
for _ in range(N):
    c = flip(0.5); s = flip(pS[c]); r = flip(pR[c])
    weight = pW[(s, r)]                     # W is fixed to true
    total += weight
    rain_w += weight * r
print(f"likelihood weighting: P(r | w) ~ {rain_w / total:.3f}")

# Gibbs sampling for P(r | w): resample C, S, R in turn from their Markov blankets.
def cond(var, st):
    def joint(x):
        t = dict(st, **{var: x})
        c, s, r = t["C"], t["S"], t["R"]
        return (0.5 * (pS[c] if s else 1 - pS[c]) * (pR[c] if r else 1 - pR[c]) * pW[(s, r)])
    a, b = joint(True), joint(False)
    return a / (a + b)

state = {"C": True, "S": True, "R": False}
count = steps = 0
for i in range(N):
    for var in ["C", "S", "R"]:
        state[var] = flip(cond(var, state))
    if i >= 1000:                            # burn-in
        steps += 1
        count += state["R"]
print(f"Gibbs sampling:       P(r | w) ~ {count / steps:.3f}")
print("exact answer:         P(r | w) = 0.692")
```
```output
rejection sampling:  kept 13283 of 20000, P(r | w) ~ 0.697
likelihood weighting: P(r | w) ~ 0.698
Gibbs sampling:       P(r | w) ~ 0.694
exact answer:         P(r | w) = 0.692
```

All three estimates land close to the exact 0.692. Rejection sampling kept only about two thirds of its samples, because P(w) ≈ 0.66; with rarer evidence it would keep far fewer.

## Summary

| Method | Evidence handled by | Main weakness |
| --- | --- | --- |
| Prior sampling | Not handled (no evidence) | Only for unconditional probabilities |
| Rejection sampling | Discarding inconsistent samples | Wastes samples when P(e) is small |
| Likelihood weighting | Fixing evidence, weighting samples | Weights degenerate when evidence is downstream |
| Gibbs sampling | Fixing evidence, resampling from Markov blankets | Correlated samples, needs burn-in |

## Practice questions

```quiz
q: In rejection sampling, the evidence has probability P(e) = 0.02. About how many prior samples must be generated to keep 500 samples?
answer: 25000
verify: round(500 / 0.02)
explain: On average a fraction P(e) = 0.02 of samples is kept, so 500 / 0.02 = 25,000 samples are needed.
```

```quiz
q: In likelihood weighting for P(R | w) in the sprinkler network, a sample has C = false, S = true and R = false. What is its weight?
answer: 0.9
verify: 0.90
explain: Only W is evidence, so the weight is P(w | s, ¬r) = 0.90. C, S and R were sampled, so they do not contribute to the weight.
```

```quiz
q: In likelihood weighting with evidence w and c (both observed), a sample has S = false and R = true. What is its weight?
answer: 0.45
verify: round(0.5 * 0.90, 9)
explain: The weight multiplies the probabilities of all evidence values given their parents: P(c) × P(w | ¬s, r) = 0.5 × 0.90 = 0.45.
```

```quiz
q: In the sprinkler network (C → S, C → R, S → W, R → W), what is the **Markov blanket** of S?
- {C}
- {C, W}
* {C, W, R}
- {C, R}
explain: The Markov blanket is the parents (C), the children (W) and the children's other parents (R). Given C, W and R, S is independent of everything else.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Rejection sampling becomes very inefficient when the evidence is unlikely
* Gibbs sampling produces correlated samples
- Likelihood weighting discards samples that contradict the evidence
* All these sampling methods converge to the exact answer as the number of samples grows
explain: Rejection sampling keeps only a fraction P(e) of samples. Each Gibbs state depends on the previous one. Likelihood weighting never discards a sample; it weights it. All of them are consistent estimators.
```
