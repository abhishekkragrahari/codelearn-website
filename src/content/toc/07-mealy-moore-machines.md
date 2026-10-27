---
title: Mealy and Moore Machines (Finite Automata with Output)
chapter: Regular Languages
description: Finite-state transducers that produce output: Moore machines (output on states) and Mealy machines (output on transitions), sequence detectors, conversion between the two, and how they relate to DFAs and digital circuits.
---
A DFA only says **accept** or **reject** at the end. A **finite-state transducer** produces an output symbol as it reads each input symbol. There are two kinds, named after Edward Moore and George Mealy, and they are exactly the state machines used to design sequential circuits.

## Moore machine

A Moore machine is (Q, Σ, Δ, δ, λ, q₀) where Δ is the output alphabet and the **output depends only on the current state**: λ : Q → Δ.

- For an input of length n it produces **n + 1** outputs (one for the start state, then one after each symbol).

```automaton
caption: Moore machine: output = (binary number read so far) mod 3
start: r0
r0 -> r0 : 0
r0 -> r1 : 1
r1 -> r2 : 0
r1 -> r0 : 1
r2 -> r1 : 0
r2 -> r2 : 1
```

State rᵢ outputs i. Reading bit b moves remainder r to (2r + b) mod 3.

## Mealy machine

In a Mealy machine the **output depends on the state and the input**: λ : Q × Σ → Δ, written on each transition as input/output.

- For an input of length n it produces **n** outputs.
- It usually needs **fewer states** than an equivalent Moore machine, and reacts in the same step.

```automaton
caption: Mealy machine detecting 101 (overlapping): label = input/output
start: S0
S0 -> S0 : 0/0
S0 -> S1 : 1/0
S1 -> S1 : 1/0
S1 -> S2 : 0/0
S2 -> S0 : 0/0
S2 -> S1 : 1/1
```

## Simulating both

```python
mealy = {                              # state: {input: (next state, output)}
    "S0": {"0": ("S0", "0"), "1": ("S1", "0")},
    "S1": {"0": ("S2", "0"), "1": ("S1", "0")},
    "S2": {"0": ("S0", "0"), "1": ("S1", "1")},
}
x = "1101011010"
state, out = "S0", ""
for c in x:
    state, o = mealy[state][c]
    out += o
print("input:       ", x)
print("Mealy output:", out)

r, moore_out = 0, "0"                  # Moore: output the state's remainder
for c in x:
    r = (2 * r + int(c)) % 3
    moore_out += str(r)
print("Moore output:", moore_out)
```
```output
input:        1101011010
Mealy output: 0001010010
Moore output: 01001222100
```

The Mealy output has a 1 exactly where 101 has just been completed (positions 3, 5 and 8, counting from 0). The Moore output is one symbol longer.

## Converting between them

- **Moore → Mealy:** put each target state's output on every transition into it. Same number of states.
- **Mealy → Moore:** split each state by the different outputs on its incoming transitions (state q becomes q/0 and q/1 if both outputs arrive at q). A Mealy machine with n states and m output symbols needs at most **n × m** Moore states.

Both models are equally powerful (apart from the Moore machine's extra first output).

## Mealy, Moore and circuits

In a sequential circuit, flip-flops hold the state. If the outputs are a function of the flip-flops only, it is a **Moore circuit** (outputs change only at clock edges); if they also depend on the inputs directly, it is a **Mealy circuit** (outputs can change between clock edges). See [Counters and Registers](../dl/counters-registers.html) for circuit design.

## GATE-style practice questions

```quiz
q: A Moore machine reads an input string of length 12. How many output symbols does it produce?
answer: 13
verify: 12 + 1
explain: A Moore machine outputs for the start state and after each input symbol: n + 1.
```

```quiz
q: Using the Moore machine above (remainder mod 3), what is the last output for the input 1001?
answer: 0
verify: int("1001", 2) % 3
explain: 1001₂ = 9, and 9 mod 3 = 0.
```

```quiz
q: For the Mealy 101-detector above, how many 1s are in the output for the input 10101?
answer: 2
verify: sum(1 for i in range(2, 5) if "10101"[i - 2:i + 1] == "101")
explain: 101 is completed at positions 2 and 4 (overlaps allowed).
```

```quiz
q: Which statements are true? (Select all that apply.)
* In a Mealy machine the output depends on the current state and the current input
* Mealy machines often need fewer states than equivalent Moore machines
- A Moore machine produces one output fewer than its input length
- Mealy machines can recognise non-regular languages
explain: Moore outputs n + 1 symbols, and both models have only finitely many states, so neither goes beyond regular behaviour.
```
