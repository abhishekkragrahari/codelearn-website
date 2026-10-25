---
title: Introduction to Theory of Computation
chapter: Basics
description: Alphabets, strings and languages, operations on languages, the four kinds of machines and grammars of the Chomsky hierarchy, and what "decidable" means.
---
**Theory of Computation** asks what problems machines can solve at all, and with how much memory. It studies simple mathematical models of computers (automata), the languages they recognise, and the grammars that generate those languages.

## Alphabets, strings and languages

- An **alphabet** Σ is a finite, non-empty set of symbols, such as Σ = {0, 1} or Σ = {a, b}.
- A **string** over Σ is a finite sequence of symbols: `0110`, `abba`. The **empty string** is written **ε**, and |w| is the length of w (|ε| = 0).
- **Σ<sup>k</sup>** is the set of all strings of length k; there are |Σ|<sup>k</sup> of them. **Σ\*** is the set of **all** strings (including ε), and Σ⁺ = Σ\* − {ε}.
- A **language** is any set of strings over Σ, that is, any subset of Σ\*. It can be finite ({ε, 01, 10}) or infinite ({0ⁿ1ⁿ | n ≥ 0}).

Two special languages are easy to confuse: **∅** (no strings at all) and **{ε}** (exactly one string, the empty one).

For a string w: a **prefix** is a start of w, a **suffix** an end, and a **substring** a contiguous piece. A string of length n has n + 1 prefixes and n + 1 suffixes (counting ε and w itself), and at most n(n + 1)/2 + 1 distinct substrings.

## Operations on languages

| Operation | Definition | Example with L₁ = {a, ab}, L₂ = {b} |
| --- | --- | --- |
| Union L₁ ∪ L₂ | Strings in either | {a, ab, b} |
| **Concatenation** L₁L₂ | xy with x ∈ L₁, y ∈ L₂ | {ab, abb} |
| Power Lᵏ | L concatenated k times; L⁰ = {ε} | L₂³ = {bbb} |
| **Kleene star** L\* | L⁰ ∪ L¹ ∪ L² ∪ ... | L₂\* = {ε, b, bb, ...} |
| Complement L̄ | Σ\* − L | |
| Reverse Lᴿ | Every string reversed | L₁ᴿ = {a, ba} |

Note that ∅\* = {ε} and ∅L = ∅ for any L, while {ε}L = L.

```python
from itertools import product

def concat(A, B):
    return {x + y for x in A for y in B}

def power(L, k):
    result = {""}
    for _ in range(k):
        result = concat(result, L)
    return result

L1, L2 = {"a", "ab"}, {"b"}
print(sorted(concat(L1, L2)))
print(sorted(power(L1, 2)))
print("strings of length 3 over {0,1}:", len(list(product("01", repeat=3))))
star_up_to_3 = set().union(*(power(L1, k) for k in range(4)))
print("L1* up to 3 factors:", sorted(star_up_to_3, key=lambda s: (len(s), s)))
```
```output
['ab', 'abb']
['aa', 'aab', 'aba', 'abab']
strings of length 3 over {0,1}: 8
L1* up to 3 factors: ['', 'a', 'aa', 'ab', 'aaa', 'aab', 'aba', 'aaab', 'aaba', 'abaa', 'abab', 'aabab', 'abaab', 'ababa', 'ababab']
```

## The Chomsky hierarchy

Languages are classified by the kind of machine that recognises them, or equivalently the kind of grammar that generates them. Each class strictly contains the one below it.

```tree
caption: The Chomsky hierarchy (each class contains the ones below it)
Recursively enumerable (type 0) | Turing machine
  Recursive (decidable) | TM that always halts
    Context-sensitive (type 1) | linear bounded automaton
      Context-free (type 2) | pushdown automaton
        Regular (type 3) | finite automaton
```

| Type | Language class | Grammar rules | Machine | Memory |
| --- | --- | --- | --- | --- |
| 3 | Regular | A → aB or A → a (right-linear) | Finite automaton (DFA/NFA) | Only the current state |
| 2 | Context-free | A → γ (one variable on the left) | Pushdown automaton (PDA) | A stack |
| 1 | Context-sensitive | αAβ → αγβ, \|γ\| ≥ 1 | Linear bounded automaton | Tape as long as the input |
| 0 | Recursively enumerable | Any α → β | Turing machine | Unlimited tape |

Typical examples:

- **Regular**: strings with an even number of 0s; strings ending in `01`; aⁿbᵐ.
- **Context-free but not regular**: aⁿbⁿ; balanced parentheses; palindromes.
- **Context-sensitive but not context-free**: aⁿbⁿcⁿ; ww (a string followed by a copy of itself).
- **Recursively enumerable but not recursive**: the halting problem.
- **Not even recursively enumerable**: the complement of the halting problem.

## Recognising and deciding

A machine **accepts** a language L if it accepts exactly the strings of L. For Turing machines there is an important difference:

- L is **recursive** (decidable) if some machine accepts every string in L and **rejects** (halts saying no) every string not in L.
- L is **recursively enumerable** (semi-decidable) if some machine accepts every string in L, but on strings not in L it may run forever.

Finite automata and PDAs always finish after reading their input, so their languages are all decidable. The later lessons of this track build up the hierarchy from the bottom: finite automata and regular expressions, then context-free grammars and PDAs, then Turing machines and the limits of computation.

## Practice questions

```quiz
q: How many strings of length **at most 3** are there over the alphabet {a, b}, including ε?
answer: 15
verify: sum(2 ** k for k in range(4))
explain: There are 2⁰ + 2¹ + 2² + 2³ = 1 + 2 + 4 + 8 = 15 strings of length 0 to 3.
```

```quiz
q: L₁ = {ε, a} and L₂ = {a, aa}. How many distinct strings are in L₁L₂?
answer: 3
verify: len({x + y for x in ["", "a"] for y in ["a", "aa"]})
explain: The four combinations give a, aa, aa and aaa. The string aa is produced twice, so L₁L₂ = {a, aa, aaa} has 3 strings.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* ∅\* = {ε}
* {ε} is a language with exactly one string
- ∅ and {ε} are the same language
* For every language L, ∅L = ∅
explain: The star always contains ε (zero factors), even for ∅. {ε} contains the empty string, whereas ∅ contains no string. Concatenating with ∅ gives no pairs at all, so ∅L = ∅.
```

```quiz
q: Which machine model recognises exactly the context-free languages?
- Deterministic finite automaton
* Non-deterministic pushdown automaton
- Deterministic pushdown automaton
- Linear bounded automaton
explain: Non-deterministic PDAs accept exactly the context-free languages. Deterministic PDAs accept only a proper subset (the deterministic CFLs), DFAs accept the regular languages, and LBAs the context-sensitive ones.
```

```quiz
q: How many prefixes (including ε and the string itself) does the string `abcab` have?
answer: 6
verify: len({"abcab"[:i] for i in range(len("abcab") + 1)})
explain: A string of length n has n + 1 prefixes: ε, a, ab, abc, abca and abcab.
```
