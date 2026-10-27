---
title: Properties of Context-Free Languages
chapter: Context-Free Languages
description: Closure and non-closure properties of context-free languages, the pumping lemma for CFLs, decidable and undecidable questions about grammars, and a checklist for deciding whether a language is context-free.
---
## Closure properties

| Operation | CFLs closed? | DCFLs closed? |
| --- | --- | --- |
| Union | Yes: S → S₁ \| S₂ | **No** |
| Concatenation | Yes: S → S₁S₂ | **No** |
| Kleene star | Yes: S → SS₁ \| ε | **No** |
| Reversal | Yes: reverse every right side | **No** |
| Homomorphism, inverse homomorphism | Yes | Inverse homomorphism only |
| **Intersection with a regular language** | **Yes**: run a PDA and a DFA together | **Yes** |
| Intersection | **No** | **No** |
| Complement | **No** | **Yes** |
| Difference | **No** (but L − R with R regular is a CFL) | |

Why not intersection? {aⁿbⁿcᵐ} and {aᵐbⁿcⁿ} are both context-free, but their intersection is {aⁿbⁿcⁿ}, which is not (shown below). And since L₁ ∩ L₂ = complement of (L̄₁ ∪ L̄₂), closure under union plus complement would give closure under intersection; so CFLs cannot be closed under complement either.

**Intersection with a regular language** is the most useful closure property for proofs: if L ∩ R is not context-free for some regular R, then L is not context-free.

## The pumping lemma for CFLs

A parse tree for a long enough string must have a long path, on which some variable repeats. The part of the tree between the two occurrences can be repeated or removed:

> **Pumping lemma for CFLs**: if L is context-free, there is a number p such that every s ∈ L with |s| ≥ p can be split as s = uvxyz where
> 1. |vxy| ≤ p,
> 2. |vy| ≥ 1 (v and y are not both empty), and
> 3. uvⁱxyⁱz ∈ L for **every** i ≥ 0.

Two pieces, v and y, are pumped **together**. That is why a CFL can match two counts (aⁿbⁿ) but not three.

**Example: {aⁿbⁿcⁿ | n ≥ 0} is not context-free.** Pick s = aᵖbᵖcᵖ. Because |vxy| ≤ p, the window vxy cannot contain both a's and c's (the b-block of length p lies between them). So pumping changes at most two of the three counts, and uv²xy²z has unequal counts (or symbols out of order), so it is not in L.

```python
def in_L(w):
    n = len(w) // 3
    return w == "a" * n + "b" * n + "c" * n

p = 3
s = "a" * p + "b" * p + "c" * p
splits = survivors = 0
for start in range(len(s)):                          # vxy = s[start:end], |vxy| <= p
    for end in range(start + 1, min(start + p, len(s)) + 1):
        for v_len in range(end - start + 1):
            for y_len in range(end - start - v_len + 1):
                if v_len + y_len == 0:
                    continue
                u, v = s[:start], s[start:start + v_len]
                x = s[start + v_len:end - y_len]
                y, z = s[end - y_len:end], s[end:]
                splits += 1
                if all(in_L(u + v * i + x + y * i + z) for i in (0, 2)):
                    survivors += 1
print(f"{splits} legal splits of {s}; splits that survive pumping with i = 0 and 2: {survivors}")
```
```output
121 legal splits of aaabbbccc; splits that survive pumping with i = 0 and 2: 0
```

Every legal split fails, as the argument predicts. The same reasoning shows that {ww}, {aⁿ²}, {aᵖ : p prime} and {aⁱbʲcᵏ : i < j < k} are not context-free.

## Decision problems

| Question about CFGs | Decidable? |
| --- | --- |
| Membership: is w ∈ L(G)? | **Yes** (CYK, O(n³)) |
| Emptiness: is L(G) = ∅? | **Yes** (is S generating?) |
| Finiteness: is L(G) finite? | **Yes** (look for cycles among useful variables) |
| Is L(G) = Σ\*? | **No** |
| Equivalence: L(G₁) = L(G₂)? | **No** |
| Is L(G₁) ∩ L(G₂) = ∅? | **No** |
| Is G ambiguous? | **No** |
| Is L(G) regular? | **No** |
| Is the complement of L(G) context-free? | **No** |

For **DCFLs** (given as DPDAs), equivalence is decidable (a deep result from 1997) and so is "is L = Σ\*" (because DCFLs are closed under complement).

## Is it context-free? A checklist

A PDA has one stack, so it can match **one** pair of counts at a time, in nested (last-in, first-out) order.

| Language | Context-free? | Reason |
| --- | --- | --- |
| aⁿbⁿ | Yes | One stack, one comparison |
| aⁿbᵐcⁿ | Yes | Push a's, skip b's, pop on c's (nested) |
| aⁿbⁿcᵐ, aᵐbⁿcⁿ | Yes | Compare one pair, ignore the third count |
| aⁿbᵐcᵏ with n = m or m = k | Yes | Union of two CFLs |
| aⁿbⁿcⁿ | No | Three equal counts |
| aⁿbᵐcⁿdᵐ | No | Crossing comparisons, not nested |
| wwᴿ, palindromes | Yes | Nested matching |
| ww | No | Matching in the same order, not reversed |
| { w : #a = #b } | Yes | The stack holds the surplus |
| { w : #a = #b = #c } | No | Intersect with a\*b\*c\* to get aⁿbⁿcⁿ |
| { aⁿ² }, { aᵖ : p prime } | No | Over one letter, CFLs are regular |

The last row uses a fact worth remembering: every context-free language over a **one-letter alphabet** is regular (Parikh's theorem).

## Practice questions

```quiz
q: Which of these languages are context-free? (Select all that apply.)
* { aⁿbᵐcⁿ : n, m ≥ 0 }
- { aⁿbⁿcⁿ : n ≥ 0 }
* { aⁱbʲcᵏ : i = j or j = k }
- { ww : w ∈ {a, b}\* }
explain: aⁿbᵐcⁿ is nested matching. The "or" language is a union of two CFLs. aⁿbⁿcⁿ needs three equal counts, and ww matches in the same order, which a stack cannot do.
```

```quiz
q: L₁ and L₂ are context-free and R is regular. Which of these is **always** context-free?
- L₁ ∩ L₂
- The complement of L₁
* L₁ ∩ R
- L₁ − L₂
explain: A PDA and a DFA can run in parallel, so L₁ ∩ R is context-free. CFLs are not closed under intersection, complement or difference.
```

```quiz
q: Which questions about context-free grammars are **decidable**? (Select all that apply.)
* Is L(G) empty?
* Is a given string w in L(G)?
- Is G ambiguous?
- Do G₁ and G₂ generate the same language?
explain: Emptiness and membership have algorithms (generating symbols, CYK). Ambiguity and equivalence of CFGs are undecidable.
```

```quiz
q: Which intersection of two context-free languages is **not** context-free?
- { aⁿbⁿ } ∩ { aⁿbᵐ : n ≤ m }
* { aⁿbⁿcᵐ } ∩ { aᵐbⁿcⁿ }
- { wwᴿ } ∩ a\*b\*a\*
- { aⁿbⁿ } ∩ a\*b\*
explain: The second intersection forces the a's to equal the b's and the b's to equal the c's: { aⁿbⁿcⁿ }, which is not context-free. The first is { aⁿbⁿ } again. The last two are intersections with regular languages, which are always context-free.
```
