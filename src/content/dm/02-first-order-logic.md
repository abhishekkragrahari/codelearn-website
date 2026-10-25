---
title: First-Order (Predicate) Logic
chapter: Logic
description: Predicates and domains, the universal and existential quantifiers, negating quantified statements, nested quantifiers and their order, translating English, and which quantifier laws are valid.
---
Propositional logic cannot express "every student has a roll number" or "some number is larger than all others". **First-order (predicate) logic** adds variables that range over a **domain**, **predicates** about them, and **quantifiers**.

## Predicates and quantifiers

A **predicate** P(x) becomes a proposition once x is given a value: with P(x) = "x > 3", P(5) is true and P(2) is false.

| Quantifier | Written | True when |
| --- | --- | --- |
| **Universal** | ∀x P(x) | P(x) is true for **every** x in the domain |
| **Existential** | ∃x P(x) | P(x) is true for **at least one** x in the domain |

The truth value depends on the domain: ∀x (x² ≥ x) is true over the integers but false over the reals (x = 0.5). Over a finite domain {a₁, …, aₙ}, ∀x P(x) is P(a₁) ∧ … ∧ P(aₙ) and ∃x P(x) is P(a₁) ∨ … ∨ P(aₙ).

## Negation

Negation swaps the quantifiers (De Morgan's laws for quantifiers):

- ¬∀x P(x) ≡ ∃x ¬P(x) ("not everyone passed" = "someone failed")
- ¬∃x P(x) ≡ ∀x ¬P(x) ("no one passed" = "everyone failed")

Pushing negations inward through nested quantifiers flips each one: ¬∀x ∃y P(x, y) ≡ ∃x ∀y ¬P(x, y).

## Translating English

The two standard patterns:

- "All A are B": **∀x (A(x) → B(x))**. Using ∧ instead would claim everything is both A and B.
- "Some A are B": **∃x (A(x) ∧ B(x))**. Using → instead would be true as soon as anything is not an A.

| English | Logic (domain: people; S = student, L(x, y) = x likes y) |
| --- | --- |
| Every student likes someone | ∀x (S(x) → ∃y L(x, y)) |
| Some student likes everyone | ∃x (S(x) ∧ ∀y L(x, y)) |
| No student likes everyone | ¬∃x (S(x) ∧ ∀y L(x, y)) ≡ ∀x (S(x) → ∃y ¬L(x, y)) |
| Everyone is liked by someone | ∀y ∃x L(x, y) |
| There is someone whom everyone likes | ∃y ∀x L(x, y) |

## The order of quantifiers matters

Quantifiers of the same kind can be swapped (∀x ∀y ≡ ∀y ∀x, ∃x ∃y ≡ ∃y ∃x), but **mixed** quantifiers cannot:

- ∃y ∀x P(x, y) → ∀x ∃y P(x, y) is **valid**: if one y works for every x, then every x has some y.
- The converse is **not** valid: "every person has a mother" (∀x ∃y) does not mean "someone is everyone's mother" (∃y ∀x).

Evaluating over a small finite domain makes the differences visible:

```python
D = range(1, 5)

different = lambda x, y: x != y
print("for all x, exists y with y != x:", all(any(different(x, y) for y in D) for x in D))
print("exists y, for all x with y != x:", any(all(different(x, y) for x in D) for y in D))

even = lambda x: x % 2 == 0
odd = lambda x: x % 2 == 1
print("forall x (even or odd):         ", all(even(x) or odd(x) for x in D))
print("(forall x even) or (forall x odd):", all(even(x) for x in D) or all(odd(x) for x in D))
print("exists x (even and odd):        ", any(even(x) and odd(x) for x in D))
print("(exists x even) and (exists x odd):", any(even(x) for x in D) and any(odd(x) for x in D))
```
```output
for all x, exists y with y != x: True
exists y, for all x with y != x: False
forall x (even or odd):          True
(forall x even) or (forall x odd): False
exists x (even and odd):         False
(exists x even) and (exists x odd): True
```

## Which laws hold?

| Statement | Valid? |
| --- | --- |
| ∀x (P(x) ∧ Q(x)) ↔ ∀x P(x) ∧ ∀x Q(x) | **Yes** (∀ distributes over ∧) |
| ∃x (P(x) ∨ Q(x)) ↔ ∃x P(x) ∨ ∃x Q(x) | **Yes** (∃ distributes over ∨) |
| ∀x P(x) ∨ ∀x Q(x) → ∀x (P(x) ∨ Q(x)) | Yes, but **not** the converse |
| ∃x (P(x) ∧ Q(x)) → ∃x P(x) ∧ ∃x Q(x) | Yes, but **not** the converse |
| ∃y ∀x P(x, y) → ∀x ∃y P(x, y) | Yes, but **not** the converse |
| ∀x P(x) → ∃x P(x) | Yes (domains are non-empty) |

The program above shows the failures: every number is even or odd, but not all numbers are even and not all are odd; and some number is even and some is odd, but no number is both.

A variable in the scope of a quantifier is **bound**; otherwise it is **free**. A formula with free variables is not a proposition until they are given values.

## Practice questions

```quiz
q: Which formula expresses "Not every student passed the exam" (S(x): x is a student, P(x): x passed)?
- ∀x (S(x) → ¬P(x))
* ∃x (S(x) ∧ ¬P(x))
- ¬∃x (S(x) ∧ P(x))
- ∃x (S(x) → ¬P(x))
explain: ¬∀x (S(x) → P(x)) ≡ ∃x ¬(S(x) → P(x)) ≡ ∃x (S(x) ∧ ¬P(x)): some student did not pass. The first option says no student passed, and the last is true as soon as any non-student exists.
```

```quiz
q: Which of these are **valid** (true in every interpretation)? (Select all that apply.)
* ∃y ∀x P(x, y) → ∀x ∃y P(x, y)
* ∀x (P(x) ∧ Q(x)) → ∀x P(x)
- ∀x ∃y P(x, y) → ∃y ∀x P(x, y)
- ∃x P(x) ∧ ∃x Q(x) → ∃x (P(x) ∧ Q(x))
explain: A single y that works for every x is in particular a y for each x. If everything satisfies P ∧ Q, everything satisfies P. The third fails for "everyone has a mother", and the fourth fails when P and Q hold for different elements (even and odd numbers).
```

```quiz
q: Over the domain {1, 2, 3, 4}, how many values of x satisfy ∀y (y ≤ x)?
answer: 1
verify: sum(1 for x in range(1, 5) if all(y <= x for y in range(1, 5)))
explain: Only x = 4 is at least as large as every element of the domain.
```

```quiz
q: What is the negation of ∀x ∃y (x + y = 0)?
- ∀x ∃y (x + y ≠ 0)
* ∃x ∀y (x + y ≠ 0)
- ∃x ∃y (x + y ≠ 0)
- ∀x ∀y (x + y ≠ 0)
explain: Each quantifier flips as the negation moves inward: ¬∀x ∃y φ ≡ ∃x ¬∃y φ ≡ ∃x ∀y ¬φ.
```
