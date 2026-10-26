---
title: Propositional Logic and Inference
chapter: Logic
description: Knowledge-based agents, propositional syntax and semantics, models, entailment, validity and satisfiability, inference rules, conversion to CNF, resolution refutation, and forward and backward chaining with Horn clauses, for GATE DA.
---
A **knowledge-based agent** stores facts about the world in a **knowledge base** (KB) written in a formal language, and **infers** new facts from them. Logic gives that language a precise meaning, so that inference can be done mechanically and correctly.

## Syntax

The simplest logic is **propositional logic**. Its sentences are built from:

- **atomic propositions** (symbols) such as P, Q, Rain, each of which is true or false;
- the constants True and False;
- **connectives**: ¬ (not), ∧ (and), ∨ (or), → (implies), ↔ (if and only if).

| P | Q | ¬P | P ∧ Q | P ∨ Q | P → Q | P ↔ Q |
| --- | --- | --- | --- | --- | --- | --- |
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

P → Q is false **only** when P is true and Q is false. In particular, "False → anything" is true.

## Semantics: models, entailment, validity

- A **model** is an assignment of true/false to every symbol. With n symbols there are 2ⁿ models.
- A sentence is **satisfiable** if it is true in at least one model, **unsatisfiable** (a contradiction) if it is true in none, and **valid** (a tautology) if it is true in all.
- **α is valid if and only if ¬α is unsatisfiable.**
- **Entailment**: KB ⊨ α means α is true in **every model in which the KB is true**. The KB "rules out" all worlds where α is false.
- **KB ⊨ α if and only if (KB ∧ ¬α) is unsatisfiable.** This is the idea behind proof by contradiction, and behind resolution.
- Two sentences are **logically equivalent** (α ≡ β) if they are true in exactly the same models.

### Useful equivalences

| Name | Equivalence |
| --- | --- |
| Implication elimination | α → β ≡ ¬α ∨ β |
| Biconditional elimination | α ↔ β ≡ (α → β) ∧ (β → α) |
| Contrapositive | α → β ≡ ¬β → ¬α |
| De Morgan | ¬(α ∧ β) ≡ ¬α ∨ ¬β, and ¬(α ∨ β) ≡ ¬α ∧ ¬β |
| Double negation | ¬¬α ≡ α |
| Distributivity | α ∨ (β ∧ γ) ≡ (α ∨ β) ∧ (α ∨ γ) |

The **converse** β → α and the **inverse** ¬α → ¬β are **not** equivalent to α → β.

## Inference by model checking

The most direct way to decide KB ⊨ α is to list all 2ⁿ models and check that α holds wherever the KB holds. It is **sound and complete** but takes exponential time.

```python
from itertools import product

symbols = ["P", "Q", "R"]
# KB: P -> Q, Q -> R, P.   Query: R.
kb = lambda m: ((not m["P"]) or m["Q"]) and ((not m["Q"]) or m["R"]) and m["P"]
alpha = lambda m: m["R"]

models = [dict(zip(symbols, v)) for v in product([True, False], repeat=len(symbols))]
kb_models = [m for m in models if kb(m)]
print("models of the KB:", kb_models)
print("KB entails R:", all(alpha(m) for m in kb_models))

# Validity and satisfiability of single sentences
tests = {
    "(P -> Q) or (Q -> P)": lambda m: (not m["P"] or m["Q"]) or (not m["Q"] or m["P"]),
    "P and not P": lambda m: m["P"] and not m["P"],
    "(P or Q) and (not P or R)": lambda m: (m["P"] or m["Q"]) and (not m["P"] or m["R"]),
}
for name, s in tests.items():
    count = sum(1 for m in models if s(m))
    kind = "valid" if count == len(models) else "unsatisfiable" if count == 0 else "satisfiable"
    print(f"{name}: true in {count} of {len(models)} models -> {kind}")
```
```output
models of the KB: [{'P': True, 'Q': True, 'R': True}]
KB entails R: True
(P -> Q) or (Q -> P): true in 8 of 8 models -> valid
P and not P: true in 0 of 8 models -> unsatisfiable
(P or Q) and (not P or R): true in 4 of 8 models -> satisfiable
```

## Inference rules

An inference procedure is **sound** if it derives only entailed sentences, and **complete** if it can derive every entailed sentence. Common sound rules:

- **Modus ponens**: from α → β and α, infer β.
- **Modus tollens**: from α → β and ¬β, infer ¬α.
- **And-elimination**: from α ∧ β, infer α.
- **Resolution**: from (α ∨ β) and (¬β ∨ γ), infer (α ∨ γ). The complementary literals β and ¬β cancel.

Not sound (common traps): **affirming the consequent** (from α → β and β, infer α) and **denying the antecedent** (from α → β and ¬α, infer ¬β).

## Conjunctive normal form and resolution

A **literal** is a symbol or its negation. A **clause** is a disjunction of literals. A sentence is in **conjunctive normal form (CNF)** if it is a conjunction of clauses. Every sentence can be converted to CNF:

1. Eliminate ↔ and → using the equivalences above.
2. Move ¬ inwards with De Morgan's laws and double negation.
3. Distribute ∨ over ∧.

**Example:** P ↔ (Q ∨ R) becomes (¬P ∨ Q ∨ R) ∧ (¬Q ∨ P) ∧ (¬R ∨ P).

**Resolution refutation.** To prove KB ⊨ α:

1. Convert KB ∧ ¬α to CNF.
2. Repeatedly resolve pairs of clauses and add the results.
3. If the **empty clause** (a contradiction) appears, KB ⊨ α. If no new clauses can be added, KB does not entail α.

Resolution is **sound and complete** for propositional logic (it is "refutation complete").

```python
from itertools import combinations

def resolve(c1, c2):
    out = []
    for lit in c1:
        neg = lit[1:] if lit.startswith("~") else "~" + lit
        if neg in c2:
            out.append(frozenset((c1 - {lit}) | (c2 - {neg})))
    return out

def entails(kb, query):
    neg = query[1:] if query.startswith("~") else "~" + query
    clauses = set(kb) | {frozenset([neg])}
    step = 0
    while True:
        new = set()
        # Sorted so that the steps are printed in the same order on every run.
        for a, b in combinations(sorted(clauses, key=lambda c: (len(c), sorted(c))), 2):
            for r in resolve(a, b):
                if not r:
                    step += 1
                    print(f"  step {step}: {sorted(a)} + {sorted(b)} -> empty clause")
                    return True
                if r not in clauses and r not in new:
                    step += 1
                    print(f"  step {step}: {sorted(a)} + {sorted(b)} -> {sorted(r)}")
                new.add(r)
        if new <= clauses:
            return False
        clauses |= new

# KB: P -> Q, Q -> R, P  in clause form: {~P, Q}, {~Q, R}, {P}
kb = [frozenset(["~P", "Q"]), frozenset(["~Q", "R"]), frozenset(["P"])]
print("Does the KB entail R?")
print("answer:", entails(kb, "R"))
```
```output
Does the KB entail R?
  step 1: ['P'] + ['Q', '~P'] -> ['Q']
  step 2: ['~R'] + ['R', '~Q'] -> ['~Q']
  step 3: ['Q', '~P'] + ['R', '~Q'] -> ['R', '~P']
  step 4: ['P'] + ['R', '~P'] -> ['R']
  step 5: ['Q'] + ['~Q'] -> empty clause
answer: True
```

## Horn clauses, forward and backward chaining

A **Horn clause** has **at most one positive literal**. A **definite clause** has exactly one, and can be written as an implication with a conjunction of positive symbols on the left: (A ∧ B ∧ C) → D. Facts are definite clauses with an empty left side.

For KBs of definite clauses, inference is much cheaper than general resolution:

- **Forward chaining** (data-driven): start from the known facts; whenever all premises of a rule are known, add its conclusion; repeat until the query is derived or nothing new appears. It runs in **linear time** in the size of the KB.
- **Backward chaining** (goal-driven): start from the query; to prove it, find a rule that concludes it and prove each premise recursively. It only touches facts relevant to the query.

Both are sound and complete for definite clauses.

## Practice questions

```quiz
q: How many of the 8 models over P, Q and R satisfy (P → Q) ∧ (Q → R)?
answer: 4
verify:
  from itertools import product
  print(sum(1 for p, q, r in product([True, False], repeat=3) if ((not p) or q) and ((not q) or r)))
explain: The sentence says P → Q → R in a chain. The satisfying models (P, Q, R) are (T, T, T), (F, T, T), (F, F, T) and (F, F, F): 4 models. Any model with P true and Q false, or Q true and R false, fails.
```

```quiz
q: Which sentence is logically equivalent to P → Q?
- Q → P
- ¬P → ¬Q
* ¬Q → ¬P
- ¬(P ∨ Q)
explain: The contrapositive ¬Q → ¬P is equivalent to P → Q (both are ¬P ∨ Q). Q → P is the converse and ¬P → ¬Q is the inverse; neither is equivalent.
```

```quiz
q: Which of the following sentences are **valid** (tautologies)? (Select all that apply.)
* P ∨ ¬P
* (P ∧ (P → Q)) → Q
- (Q ∧ (P → Q)) → P
* (P → Q) ∨ (Q → P)
explain: P ∨ ¬P is always true. The second is modus ponens written as a sentence, so it is valid. The third is affirming the consequent: with P false and Q true it is false. The last is valid: if Q is true the first disjunct holds, and if Q is false the second (Q → P) holds.
```

```quiz
q: What is the result of resolving the clauses (A ∨ ¬B ∨ C) and (B ∨ D)?
- (A ∨ C)
* (A ∨ C ∨ D)
- (A ∨ ¬B ∨ C ∨ D)
- The empty clause
explain: The complementary pair ¬B and B cancels, and the remaining literals are combined: A ∨ C ∨ D.
```

```quiz
q: Which of these clauses is a **Horn clause**?
- P ∨ Q ∨ ¬R
* ¬P ∨ ¬Q ∨ R
- P ∨ Q
- P ∨ ¬Q ∨ R
explain: A Horn clause has at most one positive literal. ¬P ∨ ¬Q ∨ R has exactly one (R); it is the rule (P ∧ Q) → R. The others have two positive literals.
```
