---
title: Predicate (First-Order) Logic
chapter: Logic
description: Objects, predicates and functions, universal and existential quantifiers, translating English into first-order logic, negating quantifiers, unification and most general unifiers, Skolemization and resolution in first-order logic, for GATE DA.
---
Propositional logic cannot say "every student who studies passes" without writing a separate symbol for every student. **First-order logic** (FOL, predicate logic) adds **objects**, **relations** between them, and **quantifiers**, so one sentence can talk about all objects at once.

## Syntax

- **Constants** name objects: Ravi, 3, Delhi.
- **Variables** stand for objects: x, y, z.
- **Functions** map objects to objects: FatherOf(Ravi), x + 1.
- **Predicates** state properties and relations, and are true or false: Student(Ravi), Loves(x, y), x > 3.
- A **term** is a constant, a variable, or a function applied to terms. An **atomic sentence** is a predicate applied to terms.
- Sentences are combined with the connectives ¬, ∧, ∨, →, ↔ and the **quantifiers**:
  - **∀x P(x)**, "for all x, P(x)" (universal);
  - **∃x P(x)**, "there exists an x such that P(x)" (existential).

A variable is **bound** if it is inside the scope of a quantifier for it, and **free** otherwise.

## Translating English

Two patterns cover most sentences, and mixing them up is the most common error:

| English | FOL | Note |
| --- | --- | --- |
| All students are clever | ∀x (Student(x) **→** Clever(x)) | ∀ goes with → |
| Some student is clever | ∃x (Student(x) **∧** Clever(x)) | ∃ goes with ∧ |
| No student is lazy | ∀x (Student(x) → ¬Lazy(x)), equivalently ¬∃x (Student(x) ∧ Lazy(x)) | |
| Not all students are lazy | ¬∀x (Student(x) → Lazy(x)), equivalently ∃x (Student(x) ∧ ¬Lazy(x)) | |

Why not ∀x (Student(x) ∧ Clever(x))? That says **everything** is a clever student. And ∃x (Student(x) → Clever(x)) is true as soon as there is any non-student, which is not what "some student is clever" means.

### Order of quantifiers matters

- ∀x ∃y Loves(x, y): everybody loves somebody (possibly different people).
- ∃y ∀x Loves(x, y): there is one person whom everybody loves.

The second implies the first, but not the other way round. Quantifiers of the **same** kind can be swapped: ∀x ∀y ≡ ∀y ∀x and ∃x ∃y ≡ ∃y ∃x.

### Negating quantifiers

**¬∀x P(x) ≡ ∃x ¬P(x)** and **¬∃x P(x) ≡ ∀x ¬P(x)**

To negate a sentence, flip every quantifier and push the negation inside. For example:

¬∀x (Student(x) → ∃y Passes(x, y)) ≡ ∃x (Student(x) ∧ ∀y ¬Passes(x, y))

using ¬(A → B) ≡ A ∧ ¬B.

Also: ∀ distributes over ∧ (∀x (P(x) ∧ Q(x)) ≡ ∀x P(x) ∧ ∀x Q(x)), and ∃ distributes over ∨, but **not** the other way round: ∀x (P(x) ∨ Q(x)) does not imply ∀x P(x) ∨ ∀x Q(x).

On a finite domain, quantifiers can be checked directly: ∀ becomes `all` and ∃ becomes `any`.

```python
people = ["Asha", "Bilal", "Chen"]
loves = {("Asha", "Bilal"), ("Bilal", "Chen"), ("Chen", "Bilal")}
L = lambda x, y: (x, y) in loves

print("forall x exists y Loves(x, y):", all(any(L(x, y) for y in people) for x in people))
print("exists y forall x Loves(x, y):", any(all(L(x, y) for x in people) for y in people))
print("exists y forall x (x != y -> Loves(x, y)):",
      any(all(L(x, y) for x in people if x != y) for y in people))
```
```output
forall x exists y Loves(x, y): True
exists y forall x Loves(x, y): False
exists y forall x (x != y -> Loves(x, y)): True
```

Everyone loves somebody, but nobody is loved by all three (in particular, nobody here loves themselves). Bilal, however, is loved by everyone **else**.

## Inference in first-order logic

### Unification

Inference rules need to match sentences that contain variables. A **substitution** θ replaces variables with terms; **unification** finds a θ that makes two expressions identical.

- Unify(Knows(Ravi, x), Knows(Ravi, Meera)) = {x/Meera}
- Unify(Knows(Ravi, x), Knows(y, Mother(y))) = {y/Ravi, x/Mother(Ravi)}
- Unify(Knows(Ravi, x), Knows(x, Meera)) = **fail**: x cannot be both Ravi and Meera. (Renaming the variables of one sentence apart, to Knows(x₂, Meera), fixes this: {x/Meera, x₂/Ravi}.)

The **most general unifier** (MGU) is the unifier that commits to as little as possible; every other unifier is an instance of it. Unifying P(x, y) with P(z, z) has the MGU {x/z, y/z}; {x/A, y/A, z/A} is also a unifier, but less general.

A variable may not be unified with a term that contains it: x and f(x) do not unify (the **occurs check**).

```python
def is_var(t):
    return isinstance(t, str) and t[0].islower()

def walk(t, s):
    while is_var(t) and t in s:
        t = s[t]
    return t

def occurs(v, t, s):
    t = walk(t, s)
    return t == v or (isinstance(t, tuple) and any(occurs(v, a, s) for a in t[1:]))

def unify(a, b, s):
    if s is None:
        return None
    a, b = walk(a, s), walk(b, s)
    if a == b:
        return s
    if is_var(a):
        return None if occurs(a, b, s) else {**s, a: b}
    if is_var(b):
        return unify(b, a, s)
    if isinstance(a, tuple) and isinstance(b, tuple) and a[0] == b[0] and len(a) == len(b):
        for x, y in zip(a[1:], b[1:]):
            s = unify(x, y, s)
        return s
    return None

def resolve_all(t, s):
    t = walk(t, s)
    return (t[0],) + tuple(resolve_all(a, s) for a in t[1:]) if isinstance(t, tuple) else t

tests = [
    (("Knows", "Ravi", "x"), ("Knows", "Ravi", "Meera")),
    (("Knows", "Ravi", "x"), ("Knows", "y", ("Mother", "y"))),
    (("Knows", "Ravi", "x"), ("Knows", "x", "Meera")),
    (("P", "x", ("f", "y")), ("P", ("g", "z"), ("f", "A"))),
    (("Q", "x"), ("Q", ("f", "x"))),
]
for a, b in tests:
    s = unify(a, b, {})
    print(a, "and", b, "->", "fail" if s is None else {v: resolve_all(t, s) for v, t in s.items()})
```
```output
('Knows', 'Ravi', 'x') and ('Knows', 'Ravi', 'Meera') -> {'x': 'Meera'}
('Knows', 'Ravi', 'x') and ('Knows', 'y', ('Mother', 'y')) -> {'y': 'Ravi', 'x': ('Mother', 'Ravi')}
('Knows', 'Ravi', 'x') and ('Knows', 'x', 'Meera') -> fail
('P', 'x', ('f', 'y')) and ('P', ('g', 'z'), ('f', 'A')) -> {'x': ('g', 'z'), 'y': 'A'}
('Q', 'x') and ('Q', ('f', 'x')) -> fail
```

### Generalized modus ponens and resolution

**Generalized modus ponens** lifts modus ponens to FOL: from p₁′, …, pₙ′ and (p₁ ∧ … ∧ pₙ → q), if a substitution θ makes each pᵢ′ match pᵢ, infer qθ. For example, from King(John), Greedy(John) and ∀x (King(x) ∧ Greedy(x) → Evil(x)), infer Evil(John) with θ = {x/John}. Forward and backward chaining work as in propositional logic, using unification.

**Resolution** is also lifted: convert every sentence to clause form, then resolve two clauses containing literals that unify with opposite signs. Converting to clause form adds two steps to the propositional procedure:

1. **Standardize apart**: rename variables so that each quantifier uses a different one.
2. **Skolemize**: remove each ∃ by replacing its variable with a new **Skolem constant**, or with a **Skolem function** of the universally quantified variables it lies inside. ∃x Loves(x, Ravi) becomes Loves(C₁, Ravi); ∀x ∃y Loves(x, y) becomes ∀x Loves(x, F(x)), because the y may depend on x.
3. Drop the remaining ∀ (all variables are now universal) and convert to CNF.

Resolution is **refutation complete** for FOL: if KB ⊨ α, resolution on KB ∧ ¬α eventually derives the empty clause. But entailment in FOL is only **semi-decidable**: if KB does not entail α, the procedure may run forever.

## Practice questions

```quiz
q: Which formula correctly expresses "Every student who studies passes"?
* ∀x ((Student(x) ∧ Studies(x)) → Passes(x))
- ∀x (Student(x) ∧ Studies(x) ∧ Passes(x))
- ∃x ((Student(x) ∧ Studies(x)) → Passes(x))
- ∀x (Student(x) → (Studies(x) ∧ Passes(x)))
explain: "Every ... who ..." is a universal implication: for anything that is a student and studies, it passes. The second says everything is a studying, passing student. The third is true if there is any non-student. The fourth says every student studies, which was not claimed.
```

```quiz
q: Which formula is equivalent to ¬∀x ∃y P(x, y)?
- ∀x ∃y ¬P(x, y)
* ∃x ∀y ¬P(x, y)
- ∃x ∃y ¬P(x, y)
- ∀x ∀y ¬P(x, y)
explain: Push the negation inwards, flipping each quantifier: ¬∀x ∃y P ≡ ∃x ¬∃y P ≡ ∃x ∀y ¬P(x, y).
```

```quiz
q: What is the most general unifier of P(x, f(y), z) and P(a, f(b), g(x)), where a and b are constants?
- {x/a, y/b}
* {x/a, y/b, z/g(a)}
- {x/a, y/b, z/g(x)}
- They do not unify
verify:
  def var(t): return isinstance(t, str) and t in ("x", "y", "z")
  def walk(t, s):
      while var(t) and t in s: t = s[t]
      return t
  def uni(a, b, s):
      a, b = walk(a, s), walk(b, s)
      if a == b: return s
      if var(a): return {**s, a: b}
      if var(b): return uni(b, a, s)
      if isinstance(a, tuple) and isinstance(b, tuple) and len(a) == len(b) and a[0] == b[0]:
          for p, q in zip(a[1:], b[1:]): s = uni(p, q, s)
          return s
  def full(t, s):
      t = walk(t, s)
      return (t[0],) + tuple(full(u, s) for u in t[1:]) if isinstance(t, tuple) else t
  s = uni(("P", "x", ("f", "y"), "z"), ("P", "a", ("f", "b"), ("g", "x")), {})
  show = lambda t: t if isinstance(t, str) else f"{t[0]}({','.join(show(u) for u in t[1:])})"
  print("{" + ", ".join(f"{v}/{show(full(s[v], s))}" for v in sorted(s)) + "}")
explain: x unifies with a, f(y) with f(b) gives y/b, and z with g(x) gives z/g(x); applying x/a makes it z/g(a). The MGU is {x/a, y/b, z/g(a)}.
```

```quiz
q: Skolemizing ∀x ∃y (Person(x) → Parent(y, x)) gives:
- ∀x (Person(x) → Parent(C, x)) for a new constant C
* ∀x (Person(x) → Parent(F(x), x)) for a new function F
- ∃y (Person(y) → Parent(y, y))
- ∀x ∀y (Person(x) → Parent(y, x))
explain: y lies inside ∀x, so it may depend on x: it is replaced by a Skolem function F(x). A constant would wrongly say that one person is everyone's parent.
```

```quiz
q: On the domain {1, 2, 3}, let Less(x, y) mean x < y. Which sentences are **true**? (Select all that apply.)
* ∃x ∀y (x ≠ y → Less(x, y))
- ∀x ∃y Less(x, y)
* ∀x ∃y (Less(x, y) ∨ x = y)
- ∃y ∀x Less(x, y)
explain: x = 1 is less than every other value, so the first is true. The second fails for x = 3 (nothing is larger). The third is true because y = x always works. The fourth would need a y larger than itself.
```
