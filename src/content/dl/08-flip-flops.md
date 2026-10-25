---
title: Latches and Flip-Flops
chapter: Combinational and Sequential Circuits
description: Sequential circuits and memory, the SR latch, level- and edge-triggering, SR, D, JK and T flip-flops with characteristic and excitation tables, race-around, converting between flip-flops, and timing limits.
---
A **sequential circuit** has memory: its outputs depend on the inputs **and** on its current **state**, which is stored in **flip-flops**. In a **synchronous** circuit the state changes only at clock edges, so everything stays in step.

## The SR latch

Two cross-coupled NOR gates store one bit. Inputs S (set) and R (reset):

| S | R | Next Q |
| --- | --- | --- |
| 0 | 0 | Q (hold) |
| 0 | 1 | 0 (reset) |
| 1 | 0 | 1 (set) |
| 1 | 1 | **Invalid**: both outputs forced to 0, and the final state is unpredictable when S and R return to 0 together |

A NAND version has active-low inputs (S′ R′ = 00 is the invalid case).

## Level- versus edge-triggering

- A **latch** is **level-sensitive**: while its enable (clock) is high, the output follows the inputs. Inputs that change during that time pass straight through.
- A **flip-flop** is **edge-triggered**: it samples its inputs only at the clock edge (rising or falling) and holds the result for the whole cycle. This makes synchronous design predictable.

## The four flip-flops

| Flip-flop | Characteristic equation (next state Q⁺) | Behaviour |
| --- | --- | --- |
| **SR** | Q⁺ = S + R′Q (with SR = 0) | Set, reset, hold; S = R = 1 not allowed |
| **D** | Q⁺ = D | Stores D at each clock edge (delay) |
| **JK** | Q⁺ = JQ′ + K′Q | Like SR, but J = K = 1 **toggles** |
| **T** | Q⁺ = T ⊕ Q | T = 1 toggles, T = 0 holds |

JK truth table:

| J | K | Q⁺ |
| --- | --- | --- |
| 0 | 0 | Q (hold) |
| 0 | 1 | 0 (reset) |
| 1 | 0 | 1 (set) |
| 1 | 1 | Q′ (toggle) |

The same behaviour as a state diagram, with the two states Q = 0 and Q = 1 (X = either value):

```automaton
caption: State diagram of a JK flip-flop (labels are J, K)
states: Q=0 Q=1
start: Q=0
Q=0 -> Q=0 : 0X
Q=0 -> Q=1 : 1X
Q=1 -> Q=1 : X0
Q=1 -> Q=0 : X1
```

## Excitation tables

To **design** a circuit, we know the transition we want (Q → Q⁺) and need the inputs that cause it. **X** means "don't care".

| Q → Q⁺ | SR | JK | D | T |
| --- | --- | --- | --- | --- |
| 0 → 0 | 0X | 0X | 0 | 0 |
| 0 → 1 | 10 | 1X | 1 | 1 |
| 1 → 0 | 01 | X1 | 0 | 1 |
| 1 → 1 | X0 | X0 | 1 | 0 |

The many don't cares make JK flip-flops convenient for design by K-map.

```python
def jk(q, j, k):
    return (j & (1 - q)) | ((1 - k) & q)

def t_ff(q, t):
    return q ^ t

q, trace = 0, []
for j, k in [(1, 0), (0, 0), (1, 1), (1, 1), (0, 1), (1, 1)]:
    q = jk(q, j, k)
    trace.append(q)
print("JK, starting at Q = 0:", trace)

q, trace = 1, []
for t in [1, 1, 0, 1, 0, 0, 1]:
    q = t_ff(q, t)
    trace.append(q)
print("T, starting at Q = 1: ", trace)
```
```output
JK, starting at Q = 0: [1, 1, 0, 1, 0, 1]
T, starting at Q = 1:  [0, 1, 1, 0, 0, 0, 1]
```

## Race-around

In a **level-triggered** JK latch with J = K = 1, the output toggles, feeds back, and toggles again, as long as the clock stays high: it oscillates, and the final value is unpredictable. This is the **race-around condition**. It occurs when the clock pulse is longer than the propagation delay. Fixes: a **master–slave** JK flip-flop (the master samples while the clock is high, the slave copies it when the clock goes low) or an **edge-triggered** flip-flop.

## Converting one flip-flop into another

Use the excitation table of the available flip-flop to express its inputs in terms of the desired flip-flop's inputs and Q:

- **JK from D**: D = JQ′ + K′Q (the JK characteristic equation).
- **T from JK**: J = K = T.
- **D from JK**: J = D, K = D′.
- **T from D**: D = T ⊕ Q.
- **D from T**: T = D ⊕ Q.

## Timing

- **Setup time** t<sub>su</sub>: the input must be stable this long **before** the clock edge.
- **Hold time** t<sub>h</sub>: it must stay stable this long **after** the edge.
- **Propagation delay** t<sub>pd</sub> (clock-to-Q): how long after the edge the output changes.

Between two flip-flops with combinational logic in between, the clock period must allow a signal to leave one flip-flop, pass through the logic and settle before the next edge:

**T<sub>clk</sub> ≥ t<sub>pd</sub> + t<sub>comb</sub> + t<sub>su</sub>**, so f<sub>max</sub> = 1 / (t<sub>pd</sub> + t<sub>comb</sub> + t<sub>su</sub>).

## Practice questions

```quiz
q: A flip-flop has a clock-to-Q delay of 5 ns and a setup time of 3 ns, and the combinational logic between flip-flops takes 10 ns. What is the maximum clock frequency in MHz? Give the answer to one decimal place.
answer: 55.6
verify: round(1 / (5e-9 + 10e-9 + 3e-9) / 1e6, 1)
explain: The minimum period is 5 + 10 + 3 = 18 ns, so f<sub>max</sub> = 1 / 18 ns ≈ 55.6 MHz.
```

```quiz
q: A JK flip-flop starts with Q = 0 and receives, at successive clock edges, (J, K) = (1, 0), (0, 0), (1, 1), (1, 1), (0, 1), (1, 1). What is Q after the last edge?
answer: 1
verify:
  q = 0
  for j, k in [(1, 0), (0, 0), (1, 1), (1, 1), (0, 1), (1, 1)]:
      q = (j & (1 - q)) | ((1 - k) & q)
  print(q)
explain: Set → 1, hold → 1, toggle → 0, toggle → 1, reset → 0, toggle → 1.
```

```quiz
q: To make a T flip-flop from a D flip-flop, what must D be?
- D = T
- D = T′
* D = T ⊕ Q
- D = TQ
explain: A T flip-flop needs Q⁺ = T ⊕ Q, and a D flip-flop gives Q⁺ = D, so D = T ⊕ Q (an XOR gate in front of the D input).
```

```quiz
q: In the excitation table of a JK flip-flop, what inputs are needed for the transition Q = 1 → Q⁺ = 0?
- J = 0, K = X
* J = X, K = 1
- J = 1, K = 1 only
- J = 0, K = 0
explain: From Q = 1, K = 1 forces a 0: with J = 0 it resets, with J = 1 it toggles. Either way Q⁺ = 0, so J is a don't care.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The race-around condition occurs in a level-triggered JK latch with J = K = 1
* An edge-triggered flip-flop samples its input only at the clock edge
- In an SR latch built from NOR gates, S = R = 1 stores the previous value
* A master–slave arrangement removes the race-around condition
explain: With J = K = 1 and the clock high, the latch toggles repeatedly. Edge triggering samples once per cycle. S = R = 1 is the invalid input of a NOR latch (S = R = 0 holds). The master–slave design lets the output change only after the inputs have been captured.
```
