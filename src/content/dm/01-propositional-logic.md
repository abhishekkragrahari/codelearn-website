---
title: Propositional Logic
chapter: Logic
description: Propositions and connectives, truth tables, tautologies and contradictions, logical equivalences, converse, inverse and contrapositive, normal forms, and checking arguments with rules of inference.
---
**Logic** gives precise meaning to statements and arguments. It underlies circuit design, program verification and database queries, and GATE asks about it every year.

## Propositions and connectives

A **proposition** is a statement that is either true (T, 1) or false (F, 0): "7 is prime" is a proposition, "x > 3" is not (until x is known). Compound propositions are built with **connectives**:

| Connective | Symbol | Read as | True when |
| --- | --- | --- | --- |
| Negation | ¬p | not p | p is false |
| Conjunction | p ∧ q | p and q | both are true |
| Disjunction | p ∨ q | p or q | at least one is true |
| Exclusive or | p ⊕ q | p xor q | exactly one is true |
| **Implication** | p → q | if p then q | **unless p is true and q is false** |
| Biconditional | p ↔ q | p if and only if q | p and q have the same value |

The implication is the one people get wrong: p → q is **true whenever p is false** ("if pigs fly, then I am the Pope" is true). It is equivalent to ¬p ∨ q. Ways of saying p → q in English: "p only if q", "q if p", "q whenever p", "p is sufficient for q", "q is necessary for p".

Precedence: ¬ first, then ∧, then ∨, then →, then ↔.

## Converse, inverse and contrapositive

For the implication p → q:

| Name | Form | Equivalent to p → q? |
| --- | --- | --- |
| Converse | q → p | No |
| Inverse | ¬p → ¬q | No (it is equivalent to the converse) |
| **Contrapositive** | ¬q → ¬p | **Yes** |

## Tautologies, contradictions and equivalence

- A **tautology** is true in every row of its truth table (p ∨ ¬p); a **contradiction** is false in every row (p ∧ ¬p); otherwise the formula is **contingent**.
- A formula is **satisfiable** if at least one row makes it true (every formula that is not a contradiction).
- p and q are **logically equivalent** (p ≡ q) if p ↔ q is a tautology.

A truth table with n variables has 2ⁿ rows, so a program can check any small formula:

```python
from itertools import product

implies = lambda a, b: (not a) or b

formulas = {
    "(p -> q) <-> (~q -> ~p)":           lambda p, q, r: implies(p, q) == implies(not q, not p),
    "((p -> q) & (q -> r)) -> (p -> r)": lambda p, q, r: implies(implies(p, q) and implies(q, r), implies(p, r)),
    "(p -> q) -> (q -> p)":              lambda p, q, r: implies(implies(p, q), implies(q, p)),
    "(p -> (q -> r)) <-> ((p & q) -> r)": lambda p, q, r: implies(p, implies(q, r)) == implies(p and q, r),
    "(p | q) -> (p & q)":                lambda p, q, r: implies(p or q, p and q),
}
for text, f in formulas.items():
    true_rows = sum(bool(f(*row)) for row in product([False, True], repeat=3))
    kind = "tautology" if true_rows == 8 else "contradiction" if true_rows == 0 else "contingent"
    print(f"{text:38} true in {true_rows}/8 rows: {kind}")
```
```output
(p -> q) <-> (~q -> ~p)                true in 8/8 rows: tautology
((p -> q) & (q -> r)) -> (p -> r)      true in 8/8 rows: tautology
(p -> q) -> (q -> p)                   true in 6/8 rows: contingent
(p -> (q -> r)) <-> ((p & q) -> r)     true in 8/8 rows: tautology
(p | q) -> (p & q)                     true in 4/8 rows: contingent
```

## Important equivalences

| Name | Equivalence |
| --- | --- |
| Implication | p → q ≡ ¬p ∨ q |
| Contrapositive | p → q ≡ ¬q → ¬p |
| Biconditional | p ↔ q ≡ (p → q) ∧ (q → p) |
| De Morgan | ¬(p ∧ q) ≡ ¬p ∨ ¬q, ¬(p ∨ q) ≡ ¬p ∧ ¬q |
| Negated implication | ¬(p → q) ≡ p ∧ ¬q |
| Exportation | p → (q → r) ≡ (p ∧ q) → r |
| Distributive | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) |
| Absorption | p ∨ (p ∧ q) ≡ p |

Note that implication is **not associative**: (p → q) → r and p → (q → r) differ (try p = q = r = F).

## Normal forms

- **CNF** (conjunctive normal form): an AND of clauses, each an OR of literals: (p ∨ ¬q) ∧ (q ∨ r).
- **DNF** (disjunctive normal form): an OR of terms, each an AND of literals.

Every formula has equivalent CNF and DNF forms (read them off the truth table, as with minterms and maxterms in Boolean algebra). Deciding whether a CNF formula is satisfiable (**SAT**) is the classic NP-complete problem.

## Arguments and rules of inference

An **argument** with premises P₁, …, Pₙ and conclusion C is **valid** if (P₁ ∧ … ∧ Pₙ) → C is a tautology: whenever all premises are true, the conclusion is true.

| Rule | Premises | Conclusion |
| --- | --- | --- |
| Modus ponens | p, p → q | q |
| Modus tollens | ¬q, p → q | ¬p |
| Hypothetical syllogism | p → q, q → r | p → r |
| Disjunctive syllogism | p ∨ q, ¬p | q |
| Resolution | p ∨ q, ¬p ∨ r | q ∨ r |
| Addition | p | p ∨ q |
| Simplification | p ∧ q | p |

Two common **fallacies**: affirming the consequent (from p → q and q, conclude p) and denying the antecedent (from p → q and ¬p, conclude ¬q). Both are invalid.

## Practice questions

```quiz
q: How many rows of the truth table of (p → q) ∧ (q → r) are true?
answer: 4
verify:
  from itertools import product
  imp = lambda a, b: (not a) or b
  print(sum(bool(imp(p, q) and imp(q, r)) for p, q, r in product([0, 1], repeat=3)))
explain: The formula is true exactly when the truth values never drop from T to F along p, q, r: FFF, FFT, FTT and TTT. Four rows.
```

```quiz
q: Which formula is equivalent to ¬(p → q)?
- ¬p → ¬q
- ¬p ∧ q
* p ∧ ¬q
- ¬p ∨ q
explain: p → q ≡ ¬p ∨ q, and by De Morgan ¬(¬p ∨ q) ≡ p ∧ ¬q: the implication fails only when p is true and q is false.
```

```quiz
q: Which of these are **tautologies**? (Select all that apply.)
* (p ∧ (p → q)) → q
* ((p → q) ∧ (q → r)) → (p → r)
- (p → q) → (q → p)
* (p → (q → r)) ↔ ((p ∧ q) → r)
explain: Modus ponens, hypothetical syllogism and exportation are all tautologies. The third fails when p is false and q is true: p → q is true but q → p is false.
```

```quiz
q: "You can access the server only if you have a password" is written as p → q. What are p and q?
* p = you can access the server, q = you have a password
- p = you have a password, q = you can access the server
- It is p ↔ q
- It is ¬p → q
explain: "p only if q" means p → q: accessing the server requires (implies) having a password. Having a password does not by itself guarantee access.
```

```quiz
q: From the premises "If it rains, the ground is wet" and "The ground is wet", someone concludes "It rained". Which statement is **true**?
- The argument is valid by modus ponens
- The argument is valid by modus tollens
* The argument is invalid: it affirms the consequent
- The argument is invalid: it denies the antecedent
explain: From p → q and q nothing follows about p (the ground might be wet from a sprinkler). Concluding p is the fallacy of affirming the consequent.
```
