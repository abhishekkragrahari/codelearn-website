---
title: Pushdown Automata
chapter: Context-Free Languages
description: The PDA as a finite automaton with a stack, transitions and instantaneous descriptions, acceptance by final state and by empty stack, deterministic versus nondeterministic PDAs, and the equivalence with context-free grammars.
---
A finite automaton cannot recognise {0ⁿ1ⁿ} because it cannot count without bound. Give it a **stack** and it can: push a symbol for every 0, pop one for every 1, and accept if the two run out together. That machine is a **pushdown automaton (PDA)**.

## Definition

A PDA is a 7-tuple (Q, Σ, Γ, δ, q₀, Z₀, F):

| Part | Meaning |
| --- | --- |
| Q, Σ, q₀, F | States, input alphabet, start state, accepting states, as in an NFA |
| Γ | The **stack alphabet** |
| Z₀ ∈ Γ | The initial stack symbol (marks the bottom of the stack) |
| δ | Transitions: δ(q, a, X) is a set of pairs (p, γ) |

A transition (p, γ) ∈ δ(q, a, X) means: in state q, reading input a (or ε, reading nothing), with X on top of the stack, the PDA may go to state p and **replace X by the string γ** (γ = ε pops X; γ = YX pushes Y; γ = X leaves the stack unchanged). In diagrams the transition is labelled **a, X / γ**.

The PDA is **nondeterministic** by default: several moves may be possible, and it accepts if any sequence of moves accepts.

## A PDA for {0ⁿ1ⁿ | n ≥ 1}

```automaton
caption: A PDA for 0ⁿ1ⁿ (n ≥ 1); Z is the bottom-of-stack symbol
states: q0 q1 q2
start: q0
accept: q2
q0 -> q0 : 0,Z/0Z  0,0/00
q0 -> q1 : 1,0/ε
q1 -> q1 : 1,0/ε
q1 -> q2 : ε,Z/Z
```

- In q0, push a 0 for each 0 read.
- On the first 1, pop a 0 and move to q1; keep popping one 0 per 1.
- When the bottom marker Z is on top again, every 0 has been matched: move to the accepting state q2 without reading input.

A 1 before any 0, a 0 after a 1, or a 1 when only Z is left has no move, so the PDA rejects.

## Instantaneous descriptions

The configuration of a PDA is an **instantaneous description (ID)** (q, w, γ): the current state, the input still to read, and the stack contents (top on the left). A move is written ⊢. For input 0011:

(q0, 0011, Z) ⊢ (q0, 011, 0Z) ⊢ (q0, 11, 00Z) ⊢ (q1, 1, 0Z) ⊢ (q1, ε, Z) ⊢ (q2, ε, Z)

Simulating a nondeterministic PDA means exploring all reachable IDs. The program below does that by breadth-first search; it is written for the PDA above, and also for a PDA for even-length palindromes, which **must guess** where the middle is:

```python
from collections import deque

def pda_accepts(delta, start, accept, w, limit=10000):
    # delta: {(state, input or "", top): [(next_state, push_string), ...]}; stack top is index 0
    queue, seen = deque([(start, 0, "Z")]), set()
    while queue and len(seen) < limit:
        state, i, stack = queue.popleft()
        if (state, i, stack) in seen:
            continue
        seen.add((state, i, stack))
        if i == len(w) and state in accept:
            return True
        if not stack:
            continue
        top, rest = stack[0], stack[1:]
        moves = [("", m) for m in delta.get((state, "", top), [])]
        if i < len(w):
            moves += [(w[i], m) for m in delta.get((state, w[i], top), [])]
        for symbol, (nxt, push) in moves:
            queue.append((nxt, i + len(symbol), push + rest))
    return False

zeros_ones = {("q0", "0", "Z"): [("q0", "0Z")], ("q0", "0", "0"): [("q0", "00")],
              ("q0", "1", "0"): [("q1", "")], ("q1", "1", "0"): [("q1", "")],
              ("q1", "", "Z"): [("q2", "Z")]}
print([w for w in ["01", "0011", "001", "0101", "000111", "10"]
       if pda_accepts(zeros_ones, "q0", {"q2"}, w)])

palindrome = {}                                    # w wᴿ over {a, b}
for x in "ab":
    for top in "abZ":
        palindrome[("p", x, top)] = [("p", x + top)]           # push the first half
    palindrome[("q", x, x)] = [("q", "")]                       # pop while matching
for top in "abZ":
    palindrome[("p", "", top)] = [("q", top)]                  # guess the middle
palindrome[("q", "", "Z")] = [("f", "Z")]
print([w for w in ["", "abba", "aa", "aba", "abab", "baab"]
       if pda_accepts(palindrome, "p", {"f"}, w)])
```
```output
['01', '0011', '000111']
['', 'abba', 'aa', 'baab']
```

## Two ways to accept

- **By final state**: the input is used up and the PDA is in a state of F (as above).
- **By empty stack**: the input is used up and the stack is empty (F is ignored).

For nondeterministic PDAs the two are **equivalent**: each kind of PDA can be converted into the other. For deterministic PDAs, acceptance by empty stack is weaker (it accepts only languages where no accepted string is a prefix of another).

## Deterministic PDAs

A **DPDA** never has a choice: for every state, input symbol and stack top there is at most one move, and an ε-move is allowed only if no move on a real input symbol exists for the same state and stack top.

**DPDAs are strictly weaker than NPDAs.** The languages they accept are the **deterministic context-free languages (DCFLs)**, a proper subset of the CFLs:

| Language | DPDA? | Why |
| --- | --- | --- |
| {0ⁿ1ⁿ} | Yes | The PDA above is deterministic |
| { wcwᴿ } (a centre marker c) | Yes | The c tells the PDA when to switch from pushing to popping |
| { wwᴿ } (no marker) | **No** | The PDA must guess where the middle is |
| { aⁿbⁿ } ∪ { aⁿb²ⁿ } | **No** | It cannot know in advance whether to match one or two b's per a |

DCFLs matter in practice: they are exactly the languages of LR(k) grammars, which parsers handle in linear time, and every DCFL is unambiguous. Unlike CFLs, DCFLs are **closed under complement**.

## PDAs and grammars

> A language is context-free **if and only if** some (nondeterministic) PDA accepts it.

- **CFG → PDA**: a one-state PDA simulates leftmost derivations. With a variable A on top, it guesses a production A → α and replaces A by α; with a terminal on top, it matches it against the input.
- **PDA → CFG**: build variables [pXq] meaning "go from state p to state q while popping X", with productions describing each move.

## Practice questions

```quiz
q: Which of these languages can be accepted by a **deterministic** PDA? (Select all that apply.)
* { aⁿbⁿ : n ≥ 0 }
* { wcwᴿ : w ∈ {a, b}\* }
- { wwᴿ : w ∈ {a, b}\* }
* { aⁿbᵐ : n ≠ m }
explain: aⁿbⁿ and wcwᴿ need no guessing. For aⁿbᵐ with n ≠ m, a DPDA counts the a's on the stack, pops one per b, and can tell at the end whether something is left over or b's ran past the bottom marker. For wwᴿ the machine must guess the middle, which no DPDA can do.
```

```quiz
q: The PDA for 0ⁿ1ⁿ in this lesson reads the input 000111. How many moves does it make in total, including the final ε-move into q2?
answer: 7
verify: 6 + 1
explain: One move per input symbol (3 pushes and 3 pops), plus one ε-move from q1 to q2 when Z is on top: 7 moves.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* For nondeterministic PDAs, acceptance by final state and by empty stack accept the same class of languages
* Every language accepted by a DPDA is unambiguous
- DPDAs and NPDAs accept the same class of languages
* Deterministic context-free languages are closed under complement
explain: NPDA acceptance modes are interchangeable. DCFLs have unambiguous (LR) grammars and are closed under complement. NPDAs are strictly more powerful: wwᴿ is context-free but not deterministic context-free.
```

```quiz
q: A PDA is in state q with A on top of its stack. It reads a and uses the transition (p, BA) ∈ δ(q, a, A). What is on top of the stack afterwards?
- A
* B
- a
- The stack is empty
explain: The top symbol A is replaced by the string BA, whose first symbol becomes the new top: B is pushed on top of A.
```
