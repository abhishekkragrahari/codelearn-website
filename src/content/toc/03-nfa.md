---
title: Nondeterministic Finite Automata
chapter: Regular Languages
description: NFAs and ε-NFAs, how a nondeterministic machine accepts, ε-closure, the subset construction from NFA to DFA, and the exponential blow-up.
---
In a DFA every state has exactly one move on every symbol. A **nondeterministic finite automaton (NFA)** relaxes this: a state may have **several** moves on a symbol, or **none** at all.

## Definition and acceptance

An NFA is a 5-tuple (Q, Σ, δ, q₀, F) like a DFA, except that the transition function returns a **set** of states:

**δ : Q × Σ → 2<sup>Q</sup>** (the power set of Q)

An NFA **accepts** a string if **at least one** sequence of choices ends in an accepting state. Paths that get stuck (no move) or end in a non-accepting state simply die. You can think of the NFA as guessing correctly, or as exploring all paths at once.

Here is an NFA for strings over {a, b} that **end in `ab`**. In state p it loops on everything; when it reads an `a` it may also *guess* that this `a` is the second-to-last symbol and move to q:

```automaton
caption: An NFA for strings ending in ab
states: p q r
start: p
accept: r
p -> p : a, b
p -> q : a
q -> r : b
```

There is no move from q on `a` or from r on anything; such paths just die. The NFA is simpler than the equivalent DFA because it does not have to keep track of every possibility itself.

## ε-NFAs

An **ε-NFA** may also move **without reading a symbol**, along ε-transitions. The **ε-closure** of a state q, ECLOSE(q), is the set of states reachable from q using ε-moves only (including q itself). ε-moves make it easy to glue machines together, which is how regular expressions are turned into automata in a later lesson.

## NFAs are no more powerful than DFAs

Surprisingly, nondeterminism adds **no** power: every NFA (and ε-NFA) has an equivalent DFA. The proof is the **subset construction**:

- Each DFA state is a **set of NFA states**: all states the NFA could be in.
- The start state is ECLOSE(q₀).
- From a set S on symbol a, go to the ε-closure of all states reachable from S by an a-move.
- A DFA state is accepting if it **contains** at least one accepting NFA state.

Only the subsets that can actually be reached need to be built:

```python
def subset_construction(delta, start, accept, alphabet):
    start_set = frozenset([start])
    dfa, todo = {}, [start_set]
    while todo:
        S = todo.pop()
        if S in dfa:
            continue
        dfa[S] = {}
        for a in alphabet:
            T = frozenset(q for s in S for q in delta.get((s, a), ()))
            dfa[S][a] = T
            todo.append(T)
    return dfa, start_set, {S for S in dfa if S & accept}

nfa = {("p", "a"): {"p", "q"}, ("p", "b"): {"p"}, ("q", "b"): {"r"}}
dfa, start, accepting = subset_construction(nfa, "p", {"r"}, "ab")
name = lambda S: "{" + ",".join(sorted(S)) + "}" if S else "∅"
for S in sorted(dfa, key=lambda S: (len(S), sorted(S))):
    mark = ("→" if S == start else " ") + ("*" if S in accepting else " ")
    print(f"{mark} {name(S):8} a: {name(dfa[S]['a']):8} b: {name(dfa[S]['b'])}")
print(len(dfa), "reachable DFA states")
```
```output
→  {p}      a: {p,q}    b: {p}
   {p,q}    a: {p,q}    b: {p,r}
 * {p,r}    a: {p,q}    b: {p}
3 reachable DFA states
```

The DFA has 3 reachable states, {p}, {p, q} and {p, r}, out of the 2³ = 8 possible subsets. ({p, q} means "the last symbol was `a`", and {p, r} means "the string ends in `ab`".)

## The exponential blow-up

An NFA with n states can need up to **2ⁿ** DFA states, and sometimes all of them are necessary. The standard example is L<sub>n</sub> = { strings whose **n-th symbol from the end** is 1 }:

- An NFA needs only **n + 1** states: loop in the start state, guess the position of that 1, then count n − 1 more symbols.
- Any DFA needs **2ⁿ** states, because it must remember the last n symbols (two different n-symbol suffixes can always be told apart by a later string).

```python
def reachable_dfa_states(delta, start, alphabet):
    seen, todo = set(), [frozenset([start])]
    while todo:
        S = todo.pop()
        if S not in seen:
            seen.add(S)
            todo += [frozenset(q for s in S for q in delta.get((s, a), ())) for a in alphabet]
    return len(seen)

def nfa_nth_from_end(n):
    delta = {(0, "0"): {0}, (0, "1"): {0, 1}}
    for i in range(1, n):
        delta[(i, "0")] = {i + 1}
        delta[(i, "1")] = {i + 1}
    return delta

for n in range(1, 6):
    print(f"n = {n}: NFA {n + 1} states, DFA {reachable_dfa_states(nfa_nth_from_end(n), 0, '01')} states")
```
```output
n = 1: NFA 2 states, DFA 2 states
n = 2: NFA 3 states, DFA 4 states
n = 3: NFA 4 states, DFA 8 states
n = 4: NFA 5 states, DFA 16 states
n = 5: NFA 6 states, DFA 32 states
```

## DFA, NFA and ε-NFA compared

| | DFA | NFA | ε-NFA |
| --- | --- | --- | --- |
| Moves per state and symbol | Exactly 1 | 0 or more | 0 or more, plus ε-moves |
| Accepts when | The single path ends in F | **Some** path ends in F | Some path ends in F |
| Languages accepted | Regular | Regular | Regular |
| Size compared with a DFA | | Up to exponentially smaller | Up to exponentially smaller |
| Running time on a string of length m | O(m) | O(m · \|Q\|²) by tracking the set of states | Same, with ε-closures |

## Practice questions

```quiz
q: The NFA with transitions p –a→ {p, q}, p –b→ {p}, q –a→ {r}, q –b→ {r}, start p and accepting state r accepts strings whose second-to-last symbol is `a`. How many states does the DFA built by the subset construction have (reachable states only)?
answer: 4
verify:
  delta = {("p", "a"): {"p", "q"}, ("p", "b"): {"p"}, ("q", "a"): {"r"}, ("q", "b"): {"r"}}
  seen, todo = set(), [frozenset({"p"})]
  while todo:
      S = todo.pop()
      if S in seen: continue
      seen.add(S)
      for c in "ab":
          todo.append(frozenset(t for s in S for t in delta.get((s, c), ())))
  print(len(seen))
explain: The reachable subsets are {p} (the string ends in bb, or is too short to contain an a in the right place), {p, q} (it ends in a, after b or at the start), {p, q, r} (it ends in aa) and {p, r} (it ends in ab). That is 2² = 4 states, one for each possible pair of last two symbols.
```

```quiz
q: An NFA has 6 states. What is the largest number of states the DFA from the subset construction can have?
answer: 64
verify: 2 ** 6
explain: Each DFA state is a subset of the 6 NFA states (the empty set acts as the dead state), so there are at most 2⁶ = 64.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every language accepted by an NFA is accepted by some DFA
* An NFA accepts a string if at least one computation path ends in an accepting state
- An NFA must have a move for every state and symbol
* The minimal DFA for "the 4th symbol from the end is 1" has 16 states
explain: The subset construction converts any NFA to a DFA. Acceptance needs just one successful path, and missing moves are allowed (that path dies). Remembering the last 4 symbols needs 2⁴ = 16 states.
```

```quiz
q: In an ε-NFA, q0 has ε-moves to q1 and q3, q1 has an ε-move to q2, and q3 has an a-move to q4. How many states are in ECLOSE(q0)?
answer: 4
verify:
  eps = {"q0": ["q1", "q3"], "q1": ["q2"]}
  closure, todo = set(), ["q0"]
  while todo:
      q = todo.pop()
      if q not in closure:
          closure.add(q)
          todo += eps.get(q, [])
  print(len(closure))
explain: From q0, ε-moves reach q1 and q3, and from q1 another ε-move reaches q2. The a-move to q4 does not count. ECLOSE(q0) = {q0, q1, q2, q3}.
```
