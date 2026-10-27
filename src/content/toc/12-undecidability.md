---
title: Decidability and Undecidability
chapter: Turing Machines
description: Why some languages cannot be recognised at all, the halting problem and its diagonal proof, reductions, Rice's theorem, Post's correspondence problem, and a table of decidable and undecidable problems.
---
Some problems have no algorithm at all, no matter how much time or memory is allowed. This lesson shows why, and how to recognise such problems.

## There are more languages than machines

Every TM can be written as a finite string, so the TMs can be listed one by one: there are **countably** many. But the languages over {0, 1} are all subsets of the countable set Σ\*, and there are **uncountably** many of them (Cantor's diagonal argument). So **most languages are not recognised by any TM**, not even as RE languages. The interesting question is which natural problems fall outside.

## The halting problem

HALT<sub>TM</sub> = { ⟨M, w⟩ : TM M halts on input w }

> **Theorem**: HALT<sub>TM</sub> is undecidable.

**Proof by contradiction.** Suppose a TM H decides it: H(⟨M, w⟩) always halts, answering "yes" if M halts on w and "no" otherwise. Build a new machine D that uses H on a machine's own description:

```text
D(⟨M⟩):
    if H(⟨M, ⟨M⟩⟩) says "M halts on its own description":
        loop forever
    else:
        halt
```

Now run D on its own description ⟨D⟩:

- If D halts on ⟨D⟩, then H says "halts", so D loops forever. Contradiction.
- If D loops on ⟨D⟩, then H says "does not halt", so D halts. Contradiction.

Either way we have a contradiction, so H cannot exist. This is a **diagonal argument**: D is built to differ from every machine M on the input ⟨M⟩.

HALT<sub>TM</sub> **is** recursively enumerable: a universal TM simulates M on w and accepts if the simulation halts. So:

- HALT<sub>TM</sub> and A<sub>TM</sub> = { ⟨M, w⟩ : M accepts w } are **RE but not recursive**.
- Their complements are **not RE** (if both a language and its complement were RE, it would be recursive).

## Reductions

To show that a new problem B is undecidable, **reduce** a known undecidable problem A to it: give an algorithm that turns every instance x of A into an instance f(x) of B, with x ∈ A ⟺ f(x) ∈ B. Written **A ≤ B**.

| If A ≤ B and ... | then ... |
| --- | --- |
| B is decidable | A is decidable |
| B is RE | A is RE |
| A is undecidable | **B is undecidable** |
| A is not RE | **B is not RE** |

The direction matters: reduce **from** the known hard problem **to** the new one. Reducing the new problem to a hard one proves nothing.

Example: E<sub>TM</sub> = { ⟨M⟩ : L(M) = ∅ } is undecidable. Given ⟨M, w⟩, build a machine M′ that ignores its own input and runs M on w, accepting if M accepts. Then L(M′) is Σ\* if M accepts w and ∅ otherwise. A decider for emptiness would therefore decide A<sub>TM</sub>.

## Rice's theorem

> **Rice's theorem**: every **non-trivial property of the language** recognised by a TM is undecidable.

- "Property of the language" means it depends only on L(M), not on how M is built: "L(M) is empty", "L(M) is finite", "L(M) is regular", "L(M) contains 'abc'", "L(M) = Σ\*".
- "Non-trivial" means some TMs have the property and some do not.

Rice's theorem does **not** apply to properties of the machine itself: "M has more than 5 states" or "M moves left at least once on input ε within 100 steps" are decidable, because they can be checked directly.

## Post's correspondence problem

Given a list of dominoes, each with a string on top and a string at the bottom, is there a sequence of dominoes (repetition allowed) in which the top strings and the bottom strings spell the same word? **PCP is undecidable**, even though every single candidate sequence is easy to check. Because it involves only strings, PCP is the usual starting point for proving grammar problems undecidable, such as ambiguity of CFGs and emptiness of the intersection of two CFLs.

## Decidable or not? A summary

| Problem | Regular (DFA) | CFL (CFG/PDA) | Recursive (halting TM) | RE (TM) |
| --- | --- | --- | --- | --- |
| Membership w ∈ L | D | D | D | **U** (semi-decidable) |
| Emptiness L = ∅ | D | D | U | U |
| Finiteness | D | D | U | U |
| L = Σ\* | D | U | U | U |
| Equivalence L₁ = L₂ | D | U | U | U |
| Subset L₁ ⊆ L₂ | D | U | U | U |
| L₁ ∩ L₂ = ∅ | D | U | U | U |
| Is L regular? | D (trivially yes) | U | U | U |

(D = decidable, U = undecidable.)

Other famous undecidable problems: whether a program has an infinite loop, whether two programs compute the same function, Hilbert's tenth problem (does a polynomial equation have an integer solution?), and the totality problem (does M halt on **every** input?), which is not even RE or co-RE.

## Practice questions

```quiz
q: Which problems are **undecidable**? (Select all that apply.)
* Given a TM M, is L(M) regular?
* Given two CFGs, do they generate the same language?
- Given a DFA, is its language infinite?
- Given a TM M, does M have more than 10 states?
explain: Regularity of L(M) is a non-trivial language property, so Rice's theorem applies. CFG equivalence is undecidable. DFA finiteness is decidable (look for a useful cycle). The number of states is a property of the machine, not of its language, and is checked by reading ⟨M⟩.
```

```quiz
q: Problem A is known to be undecidable. To prove that problem B is undecidable, you should show:
* A reduces to B (A ≤ B)
- B reduces to A (B ≤ A)
- A and B have the same alphabet
- B is recursively enumerable
explain: If A ≤ B and B were decidable, the reduction would give a decider for A. So the reduction must go from the known undecidable problem to the new one.
```

```quiz
q: L is recursively enumerable but not recursive. What can be said about its complement L̄?
- L̄ is recursive
- L̄ is recursively enumerable but not recursive
* L̄ is not recursively enumerable
- L̄ is context-free
explain: If L̄ were RE as well, L would be recursive (run both recognisers in parallel). So L̄ is not RE. Example: the complement of the halting problem.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The halting problem is recursively enumerable
* There are languages that no Turing machine recognises
- Rice's theorem says every property of Turing machines is undecidable
* Membership is decidable for context-free languages
explain: A universal TM recognises the halting problem by simulation. There are countably many TMs but uncountably many languages. Rice's theorem covers only non-trivial properties of the language, not of the machine. CYK decides CFL membership.
```
