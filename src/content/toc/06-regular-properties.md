---
title: Properties of Regular Languages
chapter: Regular Languages
description: Closure properties, the pumping lemma for regular languages and how to use it, decision problems, and a checklist for deciding whether a language is regular.
---
## Closure properties

The regular languages are **closed** under an operation if applying it to regular languages always gives a regular language. They are closed under nearly everything:

| Operation | Closed? | Why |
| --- | --- | --- |
| Union, concatenation, Kleene star | Yes | Regular expressions use exactly these |
| Complement | Yes | Swap accepting and non-accepting states of a complete DFA |
| Intersection, difference | Yes | Product construction (or L₁ ∩ L₂ = complement of (L̄₁ ∪ L̄₂)) |
| Reversal | Yes | Reverse every arrow of an NFA and swap start and accept |
| Homomorphism, inverse homomorphism | Yes | Substitute strings for symbols in the RE; simulate on the DFA |
| Quotient L₁ / L₂ (with L₂ any language) | Yes | Change which DFA states accept |
| **Infinite** union | **No** | {aⁿbⁿ} is a union of infinitely many one-string languages |
| Subset | **No** | {aⁿbⁿ} ⊆ a\*b\*, which is regular |

The last two rows explain some GATE traps: every **finite** language is regular, but a subset or an infinite union of regular languages need not be.

Closure gives quick proofs. If L ∩ a\*b\* is not regular, then L is not regular either (otherwise the intersection would be regular). For example, L = { w | w has equally many a's and b's } is not regular, because L ∩ a\*b\* = {aⁿbⁿ}.

## The pumping lemma

A DFA with p states that reads a string of length ≥ p must visit some state twice, so the part of the string read between the two visits forms a loop that can be repeated or skipped. This gives a property that every regular language has:

> **Pumping lemma**: if L is regular, there is a number p (the pumping length) such that every string s ∈ L with |s| ≥ p can be split as s = xyz where
> 1. |xy| ≤ p,
> 2. |y| ≥ 1, and
> 3. xyⁱz ∈ L for **every** i ≥ 0.

The lemma is used in the contrapositive, to prove that a language is **not** regular. The proof is a game against an opponent:

1. The opponent picks p.
2. **You** pick a string s ∈ L with |s| ≥ p (choose it cleverly).
3. The opponent picks any split xyz satisfying conditions 1 and 2.
4. **You** pick an i with xyⁱz ∉ L.

If you can always win, L is not regular.

**Example: L = {0ⁿ1ⁿ | n ≥ 0} is not regular.** Pick s = 0ᵖ1ᵖ. Because |xy| ≤ p, both x and y lie inside the block of 0s, so y = 0ᵏ with k ≥ 1. Then xy²z = 0ᵖ⁺ᵏ1ᵖ has more 0s than 1s, so it is not in L.

The program below plays the opponent's side for p = 4: it tries every legal split of 0⁴1⁴ and shows that pumping up (i = 2) always leaves the language:

```python
def in_L(w):
    n = len(w) // 2
    return w == "0" * n + "1" * n

p = 4
s = "0" * p + "1" * p
for xy_len in range(1, p + 1):
    for y_len in range(1, xy_len + 1):
        x, y, z = s[:xy_len - y_len], s[xy_len - y_len:xy_len], s[xy_len:]
        pumped = x + y * 2 + z
        print(f"x={x or 'ε':4} y={y:4} -> xy²z = {pumped:12} in L? {in_L(pumped)}")
```
```output
x=ε    y=0    -> xy²z = 000001111    in L? False
x=0    y=0    -> xy²z = 000001111    in L? False
x=ε    y=00   -> xy²z = 0000001111   in L? False
x=00   y=0    -> xy²z = 000001111    in L? False
x=0    y=00   -> xy²z = 0000001111   in L? False
x=ε    y=000  -> xy²z = 00000001111  in L? False
x=000  y=0    -> xy²z = 000001111    in L? False
x=00   y=00   -> xy²z = 0000001111   in L? False
x=0    y=000  -> xy²z = 00000001111  in L? False
x=ε    y=0000 -> xy²z = 000000001111 in L? False
```

Other languages proved non-regular the same way: {aⁿ² | n ≥ 0} (the gaps between squares grow), {aᵖ | p prime}, {wwᴿ} (palindromes of even length), {ww}.

> **Warning:** the pumping lemma is a **necessary** condition only. Some non-regular languages satisfy it, so a language that "can be pumped" is not thereby proved regular. To prove a language **is** regular, give a DFA, NFA or regular expression, or use closure properties.

## Decision problems

For regular languages (given as DFAs, NFAs or REs), all the natural questions can be answered by an algorithm:

| Problem | How |
| --- | --- |
| Membership: is w ∈ L? | Run the DFA on w |
| Emptiness: is L = ∅? | Is any accepting state reachable from the start? |
| Finiteness: is L finite? | L is infinite iff some cycle lies on a path from the start to an accepting state |
| Equivalence: is L₁ = L₂? | Minimize both DFAs and compare, or check that (L₁ − L₂) ∪ (L₂ − L₁) is empty |
| Universality: is L = Σ\*? | Is the complement empty? |
| Subset: is L₁ ⊆ L₂? | Is L₁ ∩ L̄₂ empty? |

## Is it regular? A checklist

A finite automaton has only finitely many states, so it can count only up to a fixed bound, or modulo a fixed number. That is the key test: **does recognising the language require unbounded counting or comparing?**

| Language | Regular? | Reason |
| --- | --- | --- |
| aⁿbᵐ (n, m ≥ 0) | Yes | a\*b\* |
| aⁿbⁿ | No | Must compare two unbounded counts |
| aⁿbⁿ with n ≤ 100 | Yes | Finite language |
| aⁿbᵐ with n + m even | Yes | Count modulo 2 |
| aⁿbᵐ with n = m (mod 3) | Yes | Count modulo 3 |
| aⁿbᵐ with n ≥ m | No | Unbounded comparison |
| { w : #a(w) = #b(w) } | No | Intersect with a\*b\* to get aⁿbⁿ |
| { w : #a(w) − #b(w) ≡ 0 (mod 3) } | Yes | Track the difference mod 3 |
| { wwᴿ }, { ww } | No | Must remember all of w |
| { wxwᴿ : w, x ∈ Σ⁺ } | Yes | It is just "first and last symbols are equal, length ≥ 3" |
| { aᵖ : p prime }, { aⁿ² } | No | Gaps between lengths grow without bound |
| { aⁿ : n = 2 + 5j, j ≥ 0 } (lengths in an arithmetic progression) | Yes | Count modulo 5: a²(a⁵)\* |

The row { wxwᴿ } is a classic trap: since w may be a single symbol and x can absorb everything else, the language is simply the strings of length ≥ 3 that start and end with the same symbol.

## Practice questions

```quiz
q: Which of these languages are **regular**? (Select all that apply.)
* { aⁿbᵐ : n + m is even }
- { aⁿbⁿ : n ≥ 0 }
* { aⁿbⁿ : 0 ≤ n ≤ 1000 }
* { wxwᴿ : w, x ∈ {a, b}⁺ }
explain: n + m even needs only a count modulo 2. aⁿbⁿ compares two unbounded counts. With n ≤ 1000 the language is finite, hence regular. { wxwᴿ } with non-empty w and x equals "length at least 3, first symbol equals last symbol".
```

```quiz
q: L₁ is regular and L₂ is not regular. Which statement is **always** true?
- L₁ ∪ L₂ is not regular
- L₁ ∩ L₂ is not regular
* The complement of L₂ is not regular
- L₁L₂ is not regular
explain: If the complement of L₂ were regular, complementing it again would make L₂ regular. The other combinations can go either way: for example with L₁ = Σ\*, L₁ ∪ L₂ = Σ\* is regular, and with L₁ = ∅, L₁ ∩ L₂ = L₁L₂ = ∅ is regular.
```

```quiz
q: For L = {0ⁿ1ⁿ} with pumping length p = 4 and s = 0⁴1⁴, how many splits s = xyz satisfy |xy| ≤ 4 and |y| ≥ 1?
answer: 10
verify: sum(1 for xy in range(1, 5) for y in range(1, xy + 1))
explain: For |xy| = 1, 2, 3, 4 there are 1, 2, 3, 4 choices for |y|: 10 splits in all. The program in this lesson shows that every one of them fails when pumped with i = 2.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every finite language is regular
* Equivalence of two DFAs is decidable
- If a language satisfies the pumping lemma, it is regular
- Every subset of a regular language is regular
explain: A finite language is a finite union of single strings. DFA equivalence is decidable by minimization. The pumping lemma is only a necessary condition, and aⁿbⁿ is a non-regular subset of the regular language a\*b\*.
```
