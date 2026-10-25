---
title: DFA Minimization and Myhill–Nerode
chapter: Regular Languages
description: Unreachable and equivalent states, minimizing a DFA by partition refinement (and the table-filling method), and the Myhill–Nerode theorem that gives the number of states of the minimal DFA.
---
Many different DFAs accept the same language. For every regular language there is a **unique smallest DFA** (up to renaming states), and there is an efficient algorithm to find it.

## Two kinds of useless states

1. **Unreachable states**: no input string leads to them from the start state. Delete them.
2. **Equivalent states**: p and q are **equivalent** if, for every string w, δ̂(p, w) is accepting exactly when δ̂(q, w) is. Equivalent states behave the same in every future, so they can be **merged**.

Two states are **distinguishable** if some string w (a *distinguishing string*) leads one of them to an accepting state and the other to a non-accepting state. The empty string ε distinguishes every accepting state from every non-accepting one.

## Partition refinement

The minimization algorithm starts by assuming that states are equivalent whenever it cannot yet tell them apart, and refines that guess:

1. Remove unreachable states.
2. Start with two groups: accepting states and non-accepting states (states that ε cannot distinguish).
3. Split a group whenever two of its states go, on some symbol, to **different** groups.
4. Repeat until no group splits. Each final group becomes one state of the minimal DFA.

After round k, two states are in the same group exactly when no string of length ≤ k distinguishes them.

Example over {0, 1}, with start state A and accepting states C, D and E:

| State | on 0 | on 1 |
| --- | --- | --- |
| → A | B | C |
| B | A | D |
| \*C | E | F |
| \*D | E | F |
| \*E | E | F |
| F | F | F |
| G | G | A |

```python
def minimize(delta, start, accept, alphabet):
    reachable, todo = set(), [start]
    while todo:
        q = todo.pop()
        if q not in reachable:
            reachable.add(q)
            todo += [delta[q][a] for a in alphabet]
    print("unreachable:", sorted(set(delta) - reachable))
    groups = [g for g in (reachable & accept, reachable - accept) if g]
    round_no = 0
    while True:
        print(f"round {round_no}:", sorted(sorted(g) for g in groups))
        group_of = {q: i for i, g in enumerate(groups) for q in g}
        split = {}
        for q in sorted(reachable):
            key = (group_of[q],) + tuple(group_of[delta[q][a]] for a in alphabet)
            split.setdefault(key, set()).add(q)
        if len(split) == len(groups):
            return groups
        groups, round_no = list(split.values()), round_no + 1

delta = {"A": {"0": "B", "1": "C"}, "B": {"0": "A", "1": "D"}, "C": {"0": "E", "1": "F"},
         "D": {"0": "E", "1": "F"}, "E": {"0": "E", "1": "F"}, "F": {"0": "F", "1": "F"},
         "G": {"0": "G", "1": "A"}}
result = minimize(delta, "A", {"C", "D", "E"}, "01")
print("minimal DFA has", len(result), "states")
```
```output
unreachable: ['G']
round 0: [['A', 'B', 'F'], ['C', 'D', 'E']]
round 1: [['A', 'B'], ['C', 'D', 'E'], ['F']]
minimal DFA has 3 states
```

- G is unreachable (nothing leads to it), so it is deleted.
- Round 0 separates {C, D, E} from {A, B, F}.
- In round 1, F leaves {A, B, F}: on 1, A and B go to accepting states (C, D), but F goes to F (non-accepting). The string `1` distinguishes them.
- In round 2 nothing splits, so A ≡ B and C ≡ D ≡ E.

The minimal DFA has 3 states: {A, B} = "no 1 yet", {C, D, E} = "exactly one 1 so far" (accepting), {F} = "two or more 1s" (a dead state). So the language is "strings containing exactly one 1".

```automaton
caption: The minimal DFA: exactly one 1
states: AB CDE F
start: AB
accept: CDE
AB -> AB : 0
AB -> CDE : 1
CDE -> CDE : 0
CDE -> F : 1
F -> F : 0, 1
```

### The table-filling method

Textbooks often present the same idea as a table with one cell for every pair of states:

1. Mark every pair (accepting, non-accepting).
2. Mark a pair (p, q) if, for some symbol a, the pair (δ(p, a), δ(q, a)) is already marked.
3. Repeat until no new pair is marked. The unmarked pairs are the equivalent ones.

It gives exactly the same result; partition refinement is just the faster way to compute it.

## The Myhill–Nerode theorem

Define two strings x and y to be **equivalent with respect to L** (x ≡<sub>L</sub> y) if, for every string z, xz ∈ L exactly when yz ∈ L. In words: no continuation can tell x and y apart.

> **Myhill–Nerode theorem**: L is regular **if and only if** ≡<sub>L</sub> has finitely many equivalence classes. The number of classes equals the number of states of the **minimal DFA** for L.

This gives a direct way to find the size of a minimal DFA: count the classes. For "strings ending in `01`" there are three classes: strings ending in `0`, strings ending in `01`, and all the others (including ε). Every DFA state of the minimal DFA corresponds to one class.

It also proves languages **non-regular**. For L = {0ⁿ1ⁿ | n ≥ 0}, the strings 0, 00, 000, ... are pairwise inequivalent: 0ⁱ followed by 1ⁱ is in L, but 0ʲ followed by 1ⁱ is not (for i ≠ j). Infinitely many classes mean no DFA can accept L.

## Practice questions

```quiz
q: A DFA over {a, b} has start state 1 and accepting state 4, with transitions 1: a→2, b→3; 2: a→4, b→5; 3: a→4, b→5; 4: a→4, b→5; 5: a→4, b→5; 6: a→1, b→6. How many states does the minimal equivalent DFA have?
answer: 3
verify:
  d = {"1": "23", "2": "45", "3": "45", "4": "45", "5": "45", "6": "16"}
  reach, todo = set(), ["1"]
  while todo:
      q = todo.pop()
      if q not in reach:
          reach.add(q)
          todo += list(d[q])
  P = [reach & {"4"}, reach - {"4"}]
  while True:
      g = {q: i for i, B in enumerate(P) for q in B}
      groups = {}
      for q in reach:
          groups.setdefault((g[q], g[d[q][0]], g[d[q][1]]), set()).add(q)
      if len(groups) == len(P): break
      P = list(groups.values())
  print(len(P))
explain: State 6 is unreachable. Round 0: {4} and {1, 2, 3, 5}. On a, states 2, 3 and 5 go to the accepting state 4, but 1 goes to 2, so 1 splits off. Then 2, 3 and 5 behave identically. The minimal DFA has {1}, {2, 3, 5} and {4}: it accepts strings of length at least 2 that end in a.
```

```quiz
q: Which string distinguishes states p and q if δ(p, 0) is accepting, δ(q, 0) is not accepting, and neither p nor q is accepting?
- ε
* `0`
- `1`
- No string distinguishes them
explain: Reading 0 takes p to an accepting state and q to a non-accepting one, so the string 0 tells them apart. ε does not, because neither p nor q is accepting.
```

```quiz
q: How many equivalence classes does the Myhill–Nerode relation have for the language of strings over {0, 1} whose length is divisible by 4?
answer: 4
verify:
  from itertools import product
  strs = lambda k: ["".join(t) for n in range(k + 1) for t in product("01", repeat=n)]
  pred = lambda w: len(w) % 4 == 0
  suffixes = strs(6)
  print(len({tuple(pred(p + s) for s in suffixes) for p in strs(6)}))
explain: Only the length mod 4 matters, and strings with different lengths mod 4 are distinguished by a suffix that brings one of them to a multiple of 4. So there are 4 classes, and the minimal DFA has 4 states.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every regular language has a unique minimal DFA, up to renaming of states
* A language with infinitely many Myhill–Nerode classes is not regular
- Merging two equivalent states can change the language accepted
* Unreachable states can be deleted without changing the language
explain: The minimal DFA is unique, and its states correspond to the Myhill–Nerode classes, so infinitely many classes rule out a DFA. Equivalent states behave the same on every future input, so merging them, or deleting states that are never reached, keeps the language.
```
