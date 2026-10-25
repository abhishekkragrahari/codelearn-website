---
title: Turing Machines
chapter: Turing Machines
description: The Turing machine model, transitions and instantaneous descriptions, designing and simulating TMs, variants that add no power, the Church–Turing thesis, recursive and recursively enumerable languages, and the universal TM.
---
A **Turing machine (TM)** is a finite control with an unlimited **tape** that it can read, write and move along in both directions. Despite its simplicity, it can compute anything any real computer can, which is why it is the standard definition of "algorithm".

## Definition

A TM is a 7-tuple (Q, Σ, Γ, δ, q₀, B, F):

| Part | Meaning |
| --- | --- |
| Q, q₀, F | States, start state, accepting (halting) states |
| Σ | Input alphabet |
| Γ ⊇ Σ | Tape alphabet, which includes the **blank** B (written ␣) |
| δ | δ(q, X) = (p, Y, D): in state q reading X, write Y, move the head **D** (L or R), go to state p |

The input is written on the tape, surrounded by blanks, with the head on its first symbol. The machine runs until no move is defined; it **accepts** if it halts in an accepting state. Unlike a finite automaton or PDA, a TM need **not** halt: it may run forever.

An instantaneous description is written as the tape contents with the state inserted just before the scanned symbol: 0 q₁ 01 means tape "001", state q₁, head on the second symbol.

## A TM for {0ⁿ1ⁿ | n ≥ 1}

Strategy: repeatedly cross off the leftmost 0 (write X) and the leftmost 1 (write Y). Accept when everything is crossed off evenly.

| State | Reads 0 | Reads 1 | Reads X | Reads Y | Reads ␣ |
| --- | --- | --- | --- | --- | --- |
| q0: find a 0 | X, R, q1 | | | Y, R, q3 | |
| q1: go right to a 1 | 0, R, q1 | Y, L, q2 | | Y, R, q1 | |
| q2: go back left to X | 0, L, q2 | | X, R, q0 | Y, L, q2 | |
| q3: check only Y's remain | | | | Y, R, q3 | ␣, R, q4 |
| q4 | accept | | | | |

```python
def run_tm(delta, start, accept, tape_input, max_steps=10000):
    tape = dict(enumerate(tape_input))
    state, head, steps = start, 0, 0
    while state not in accept and steps < max_steps:
        symbol = tape.get(head, "_")
        if (state, symbol) not in delta:
            return False, steps, tape                 # no move: halt and reject
        state, write, move = delta[(state, symbol)]
        tape[head] = write
        head += 1 if move == "R" else -1
        steps += 1
    return state in accept, steps, tape

zeros_ones = {
    ("q0", "0"): ("q1", "X", "R"), ("q0", "Y"): ("q3", "Y", "R"),
    ("q1", "0"): ("q1", "0", "R"), ("q1", "Y"): ("q1", "Y", "R"), ("q1", "1"): ("q2", "Y", "L"),
    ("q2", "0"): ("q2", "0", "L"), ("q2", "Y"): ("q2", "Y", "L"), ("q2", "X"): ("q0", "X", "R"),
    ("q3", "Y"): ("q3", "Y", "R"), ("q3", "_"): ("q4", "_", "R"),
}
for w in ["01", "0011", "000111", "001", "0101", "011"]:
    ok, steps, tape = run_tm(zeros_ones, "q0", {"q4"}, w)
    final = "".join(tape[i] for i in sorted(tape)).strip("_")
    print(f"{w:7} {'accept' if ok else 'reject'} after {steps:2} steps, tape {final}")
```
```output
01      accept after  5 steps, tape XY
0011    accept after 13 steps, tape XXYY
000111  accept after 25 steps, tape XXXYYY
001     reject after  7 steps, tape XXY
0101    reject after  4 steps, tape XY01
011     reject after  4 steps, tape XY1
```

For 0ⁿ1ⁿ the machine sweeps back and forth n times over about 2n cells, so it takes O(n²) steps. (A two-tape TM could do it in O(n).)

## TMs that compute

A TM can also compute a function: the output is what is left on the tape when it halts. A **binary increment** machine moves to the right end of the number, then adds 1 with carry:

```python
def run_tm(delta, start, accept, tape_input):
    tape = dict(enumerate(tape_input))
    state, head = start, 0
    while state not in accept:
        state, write, move = delta[(state, tape.get(head, "_"))]
        tape[head] = write
        head += 1 if move == "R" else -1
    return "".join(tape[i] for i in sorted(tape)).strip("_")

increment = {
    ("right", "0"): ("right", "0", "R"), ("right", "1"): ("right", "1", "R"),
    ("right", "_"): ("carry", "_", "L"),
    ("carry", "1"): ("carry", "0", "L"),       # 1 + carry = 0, carry on
    ("carry", "0"): ("done", "1", "L"),        # 0 + carry = 1, stop
    ("carry", "_"): ("done", "1", "L"),        # carry out of the top: new digit
}
for n in ["0", "1011", "111", "1000"]:
    print(n, "+ 1 =", run_tm(increment, "right", {"done"}, n))
```
```output
0 + 1 = 1
1011 + 1 = 1100
111 + 1 = 1000
1000 + 1 = 1001
```

## Variants: no extra power

All of these accept exactly the same languages as the basic one-tape TM:

| Variant | Simulation cost on a one-tape TM |
| --- | --- |
| Two-way infinite tape | Fold the tape in half: linear |
| **Multitape TM** (k tapes, k heads) | O(t²) for t steps |
| **Nondeterministic TM** | Breadth-first search over computations: exponential time |
| Multi-head, two-dimensional tape | Polynomial |
| TM with a "stay" move | Trivial |
| Enumerator (prints the strings of L) | Equivalent to recognising L |

Weaker models: a TM whose head stays within the input is a **linear bounded automaton** (LBA), which accepts the context-sensitive languages. A finite automaton with **two stacks** is as powerful as a TM (the two stacks act as the tape to the left and right of the head), while one stack gives only a PDA.

## The Church–Turing thesis

> Every function that can be computed by an effective procedure (an algorithm) can be computed by a Turing machine.

It is a thesis, not a theorem, because "effective procedure" is an informal idea. But every model of computation ever proposed (lambda calculus, general recursive functions, RAM machines, real programming languages) turned out to be equivalent to the TM.

## Recursive and recursively enumerable languages

| Class | Definition | Closed under complement? |
| --- | --- | --- |
| **Recursive** (decidable) | Some TM **halts on every input**, accepting exactly L | **Yes** |
| **Recursively enumerable** (RE, semi-decidable) | Some TM accepts exactly L; on strings not in L it may loop | **No** |

Key facts:

- Recursive ⊂ RE, strictly (the halting problem is RE but not recursive).
- **L is recursive if and only if both L and its complement are RE.** (Run both recognisers in parallel; one of them must accept.)
- So if L is RE but not recursive, its complement is **not even RE**.
- Both classes are closed under union, intersection, concatenation and star. Recursive languages are also closed under complement and difference; RE languages are not.

## The universal Turing machine

A TM can be encoded as a string ⟨M⟩ (for example, by listing its transitions in binary). A **universal TM** U takes ⟨M, w⟩ as input and simulates M on w: it accepts if M accepts, rejects if M rejects, and loops if M loops. U is the theoretical ancestor of the stored-program computer, and it shows that the language

A<sub>TM</sub> = { ⟨M, w⟩ : M accepts w }

is recursively enumerable. The next lesson shows it is not recursive.

## Practice questions

```quiz
q: How many steps does the 0ⁿ1ⁿ machine of this lesson take on input 0011 before it accepts?
code: python
  delta = {
      ("q0", "0"): ("q1", "X", "R"), ("q0", "Y"): ("q3", "Y", "R"),
      ("q1", "0"): ("q1", "0", "R"), ("q1", "Y"): ("q1", "Y", "R"), ("q1", "1"): ("q2", "Y", "L"),
      ("q2", "0"): ("q2", "0", "L"), ("q2", "Y"): ("q2", "Y", "L"), ("q2", "X"): ("q0", "X", "R"),
      ("q3", "Y"): ("q3", "Y", "R"), ("q3", "_"): ("q4", "_", "R"),
  }
  tape, state, head, steps = dict(enumerate("0011")), "q0", 0, 0
  while state != "q4":
      state, tape[head], move = delta[(state, tape.get(head, "_"))]
      head += 1 if move == "R" else -1
      steps += 1
  print(steps)
answer: 13
explain: Round 1 (5 steps): cross off the first 0, move right over the second 0, turn the first 1 into Y and move left, move left over the 0, see X and move right. Round 2 (5 steps): cross off the second 0, move right over Y, turn the second 1 into Y and move left, move left over Y, see X and move right. Check (3 steps): q0 sees Y and enters q3, q3 moves right over the second Y, then reads the blank and enters q4. Total 5 + 5 + 3 = 13.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* A language is recursive if and only if both it and its complement are recursively enumerable
* Nondeterministic TMs accept exactly the same languages as deterministic TMs
- Recursively enumerable languages are closed under complement
* A finite automaton with two stacks is as powerful as a Turing machine
explain: Running recognisers for L and L̄ side by side always halts, which gives a decider. Nondeterminism adds no power to TMs (only possibly speed). RE languages are not closed under complement (the halting problem's complement is not RE). Two stacks can simulate a tape.
```

```quiz
q: Using the binary increment TM of this lesson, what does the tape hold after it halts on input 10111?
code: python
  delta = {("right", "0"): ("right", "0", "R"), ("right", "1"): ("right", "1", "R"),
           ("right", "_"): ("carry", "_", "L"), ("carry", "1"): ("carry", "0", "L"),
           ("carry", "0"): ("done", "1", "L"), ("carry", "_"): ("done", "1", "L")}
  tape, state, head = dict(enumerate("10111")), "right", 0
  while state != "done":
      state, tape[head], move = delta[(state, tape.get(head, "_"))]
      head += 1 if move == "R" else -1
  print("".join(tape[i] for i in sorted(tape)).strip("_"))
- `10110`
* `11000`
- `101110`
- `11111`
explain: The three trailing 1s become 0s while the carry moves left, and the 0 before them becomes 1: 10111 (23) + 1 = 11000 (24).
```

```quiz
q: Which machine model accepts exactly the context-sensitive languages?
- Pushdown automaton
* Linear bounded automaton
- Turing machine with two tapes
- Finite automaton with two stacks
explain: A linear bounded automaton is a nondeterministic TM restricted to the cells holding its input, and it accepts the context-sensitive languages. Two-tape TMs and two-stack automata are as powerful as ordinary TMs.
```
