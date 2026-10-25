---
title: Deterministic Finite Automata
chapter: Regular Languages
description: The DFA as a 5-tuple, transition tables and diagrams, how a DFA runs, design patterns (remainders, suffixes, substrings, counting) and the product construction.
---
A **finite automaton** is the simplest model of a computer: it reads its input one symbol at a time, from left to right, and its only memory is which of finitely many **states** it is in. When the input ends, it **accepts** if it is in an accepting state.

## Definition

A **deterministic finite automaton (DFA)** is a 5-tuple M = (Q, Σ, δ, q₀, F):

| Part | Meaning |
| --- | --- |
| Q | A finite set of states |
| Σ | The input alphabet |
| δ : Q × Σ → Q | The **transition function**: exactly one next state for every state and symbol |
| q₀ ∈ Q | The start state |
| F ⊆ Q | The set of accepting (final) states |

"Deterministic" means there is never a choice: from each state, each symbol leads to exactly one state. The **extended transition function** δ̂(q, w) follows a whole string: δ̂(q, ε) = q and δ̂(q, wa) = δ(δ̂(q, w), a). M accepts w when δ̂(q₀, w) ∈ F, and the **language** of M, L(M), is the set of all strings it accepts. The languages accepted by DFAs are exactly the **regular languages**.

## Example: binary numbers divisible by 3

Read a binary number from the most significant bit. If the number so far has value v, reading bit b gives value 2v + b. So it is enough to remember **v mod 3**, which needs only three states:

| State (v mod 3) | on 0 | on 1 |
| --- | --- | --- |
| → \*q0 (0) | q0 | q1 |
| q1 (1) | q2 | q0 |
| q2 (2) | q1 | q2 |

(→ marks the start state and \* the accepting state.) From remainder 1, reading 0 gives 2·1 + 0 = 2, reading 1 gives 2·1 + 1 = 3 ≡ 0; and so on.

```automaton
caption: A DFA accepting binary numbers divisible by 3
states: q0 q1 q2
start: q0
accept: q0
q0 -> q0 : 0
q0 -> q1 : 1
q1 -> q0 : 1
q1 -> q2 : 0
q2 -> q1 : 0
q2 -> q2 : 1
```

Running a DFA is a loop of table lookups:

```python
def run_dfa(delta, start, accept, w):
    state = start
    for symbol in w:
        state = delta[state][symbol]
    return state in accept

div3 = {"q0": {"0": "q0", "1": "q1"},
        "q1": {"0": "q2", "1": "q0"},
        "q2": {"0": "q1", "1": "q2"}}

for w in ["0", "11", "110", "1001", "111", "10010"]:
    print(f"{w:>6} = {int(w, 2):2}: {'accept' if run_dfa(div3, 'q0', {'q0'}, w) else 'reject'}")
```
```output
     0 =  0: accept
    11 =  3: accept
   110 =  6: accept
  1001 =  9: accept
   111 =  7: reject
 10010 = 18: accept
```

## Design patterns

Most DFA questions use one of a few ideas. The question to ask is always: **what is the least I must remember about the input so far?**

| Language over {0, 1} | Remember | States in the minimal DFA |
| --- | --- | --- |
| Value divisible by n (binary) | value mod n | n, when n is odd (fewer for even n, e.g. 3 for n = 4) |
| Number of 0s ≡ 0 (mod 3) **and** number of 1s ≡ 0 (mod 2) | Both counts, as a pair | 3 × 2 = 6 |
| Length exactly 3 | Length so far: 0, 1, 2, 3, too long | 5 (including a **dead state**) |
| Ending with `01` | The longest suffix that is a prefix of `01` | 3 |
| Containing `101` as a substring | How much of `101` has been matched | 4 |
| Starting with `11` | The prefix read so far, or "failed" | 4 (including a dead state) |
| The 3rd symbol from the end is 1 | The last 3 symbols | 2³ = 8 |

A **dead state** (trap state) is a non-accepting state that loops to itself on every symbol: once there, the string can never be accepted. A DFA must have a transition for every symbol, so dead states are needed whenever some prefix rules out acceptance. Diagrams often leave them out; GATE answers count them.

Here is the DFA for strings ending in `01`. State A means "no progress", B "just read 0", C "just read 01":

```automaton
caption: A DFA accepting strings that end in 01
states: A B C
start: A
accept: C
A -> A : 1
A -> B : 0
B -> B : 0
B -> C : 1
C -> B : 0
C -> A : 1
```

The last row of the table is interesting: to know whether the 3rd symbol from the end is 1, the DFA must remember **all** of the last 3 symbols, because it never knows which symbol will be the last. In general, "the n-th symbol from the end is 1" needs 2ⁿ states, a striking contrast with the NFA in the next lesson, which needs only n + 1.

## Product construction

If DFAs M₁ and M₂ accept L₁ and L₂, run them **in parallel**: a state of the product DFA is a pair (p, q), and δ((p, q), a) = (δ₁(p, a), δ₂(q, a)). Choosing the accepting pairs gives:

- **L₁ ∩ L₂**: accept (p, q) when p ∈ F₁ **and** q ∈ F₂,
- **L₁ ∪ L₂**: when p ∈ F₁ **or** q ∈ F₂,
- **L₁ − L₂**: when p ∈ F₁ and q ∉ F₂.

The product has |Q₁| × |Q₂| states. And the **complement** of L(M) needs no product at all: swap accepting and non-accepting states (the DFA must be complete, with its dead state included).

```python
from itertools import product

def product_dfa(d1, d2, accept_pair):
    states = list(product(d1["delta"], d2["delta"]))
    delta = {(p, q): {a: (d1["delta"][p][a], d2["delta"][q][a]) for a in "01"} for p, q in states}
    accept = {(p, q) for p, q in states if accept_pair(p in d1["accept"], q in d2["accept"])}
    return delta, (d1["start"], d2["start"]), accept

even_zeros = {"delta": {"E": {"0": "O", "1": "E"}, "O": {"0": "E", "1": "O"}}, "start": "E", "accept": {"E"}}
ends_1 = {"delta": {"N": {"0": "N", "1": "Y"}, "Y": {"0": "N", "1": "Y"}}, "start": "N", "accept": {"Y"}}

delta, start, accept = product_dfa(even_zeros, ends_1, lambda a, b: a and b)
def run(w):
    s = start
    for c in w:
        s = delta[s][c]
    return s in accept
print(len(delta), "states; accepting:", sorted(accept))
print([w for w in ["1", "01", "001", "0101", "100", "0011"] if run(w)])
```
```output
4 states; accepting: [('E', 'Y')]
['1', '001', '0101', '0011']
```

## Practice questions

```quiz
q: What is the number of states in the minimal DFA (including any dead state) accepting binary strings, read from the most significant bit, whose value is divisible by 5?
answer: 5
verify:
  from itertools import product
  strs = lambda k: ["".join(t) for n in range(k + 1) for t in product("01", repeat=n)]
  pred = lambda w: int(w or "0", 2) % 5 == 0
  suffixes = strs(7)
  print(len({tuple(pred(p + s) for s in suffixes) for p in strs(7)}))
explain: The DFA tracks the value mod 5, with δ(r, b) = (2r + b) mod 5. All 5 remainders are distinguishable (from remainders r ≠ s, some suffix leads one to 0 and the other not), so 5 states are needed and enough.
```

```quiz
q: How many states does the minimal DFA have for strings over {0, 1} whose number of 0s is divisible by 3 **and** whose number of 1s is divisible by 2?
answer: 6
verify:
  from itertools import product
  strs = lambda k: ["".join(t) for n in range(k + 1) for t in product("01", repeat=n)]
  pred = lambda w: w.count("0") % 3 == 0 and w.count("1") % 2 == 0
  suffixes = strs(7)
  print(len({tuple(pred(p + s) for s in suffixes) for p in strs(7)}))
explain: The DFA must remember the pair (zeros mod 3, ones mod 2): 3 × 2 = 6 combinations, all distinguishable. It is the product of a 3-state and a 2-state DFA.
```

```quiz
q: How many states does the minimal complete DFA have for strings over {0, 1} that contain `101` as a substring?
answer: 4
verify:
  from itertools import product
  strs = lambda k: ["".join(t) for n in range(k + 1) for t in product("01", repeat=n)]
  pred = lambda w: "101" in w
  suffixes = strs(7)
  print(len({tuple(pred(p + s) for s in suffixes) for p in strs(7)}))
explain: The states record how much of 101 has been matched: nothing, "1", "10", or all of it. The last is accepting and loops on both symbols, since the substring has already appeared. 4 states.
```

```quiz
q: How many states does the minimal complete DFA have for strings over {a, b} of length **exactly 3**?
answer: 5
verify:
  from itertools import product
  strs = lambda k: ["".join(t) for n in range(k + 1) for t in product("ab", repeat=n)]
  pred = lambda w: len(w) == 3
  suffixes = strs(6)
  print(len({tuple(pred(p + s) for s in suffixes) for p in strs(6)}))
explain: The DFA counts the length 0, 1, 2, 3 (accepting), and needs a dead state for length 4 or more: 5 states.
```

```quiz
q: In the DFA for binary numbers divisible by 3 in this lesson, which state is reached after reading `1011`?
code: python
  delta = {"q0": {"0": "q0", "1": "q1"}, "q1": {"0": "q2", "1": "q0"}, "q2": {"0": "q1", "1": "q2"}}
  state = "q0"
  for c in "1011":
      state = delta[state][c]
  print(state)
- `q0`
- `q1`
* `q2`
- It depends on the path taken
explain: q0 −1→ q1 −0→ q2 −1→ q2 −1→ q2. Check: 1011 is 11, and 11 mod 3 = 2. A DFA has exactly one path for every input.
```
