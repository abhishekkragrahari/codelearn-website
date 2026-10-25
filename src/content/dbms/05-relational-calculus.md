---
title: Relational Calculus
chapter: Relational Model
description: Tuple relational calculus with ∃ and ∀, safe expressions, domain calculus, and how calculus compares with relational algebra.
---
Relational algebra is **procedural**: an expression says *how* to compute the result, step by step. **Relational calculus** is **declarative**: a query only describes *what* the result must satisfy. SQL is based on both: its `SELECT ... FROM ... WHERE` is close to calculus, and the DBMS turns it into algebra to run it.

## Tuple relational calculus (TRC)

A TRC query has the form

**{ t | P(t) }**

meaning "the set of all tuples t for which the formula P(t) is true". Here t is a **tuple variable** and `t.A` (or t[A]) is the value of attribute A in t.

A formula is built from:

- **atoms**: `t ∈ R` (t is a tuple of relation R), `t.A op s.B` or `t.A op constant`, where op is one of =, ≠, <, ≤, >, ≥;
- the connectives ∧ (and), ∨ (or), ¬ (not), ⇒ (implies);
- the **quantifiers** ∃s (there exists a tuple s) and ∀s (for all tuples s).

A variable introduced by ∃ or ∀ is **bound**; the result variable t is **free**.

Using `Student(roll, name, dept)` and `Takes(roll, course)`:

| Question | TRC |
| --- | --- |
| Students in CSE | { t \| t ∈ Student ∧ t.dept = 'CSE' } |
| Names of students who take DBMS | { t.name \| t ∈ Student ∧ ∃s (s ∈ Takes ∧ s.roll = t.roll ∧ s.course = 'DBMS') } |
| Students who take **no** course | { t \| t ∈ Student ∧ ¬∃s (s ∈ Takes ∧ s.roll = t.roll) } |
| Students who take **every** course | { t \| t ∈ Student ∧ ∀c (c ∈ Takes ⇒ ∃s (s ∈ Takes ∧ s.roll = t.roll ∧ s.course = c.course)) } |

Two identities are used constantly when reading or rewriting such queries:

- ∀x P(x) ≡ ¬∃x ¬P(x)
- P ⇒ Q ≡ ¬P ∨ Q

So "takes every course" can also be written "there is **no** course that the student does **not** take", which is exactly how SQL writes it, with `NOT EXISTS ... NOT EXISTS`.

## Quantifiers are just `any` and `all`

Over finite relations, ∃ is Python's `any` and ∀ is `all`. Here are the four queries above, evaluated directly from their formulas:

```python
student = [(1, "Asha", "CSE"), (2, "Ravi", "ECE"), (3, "Meena", "CSE"), (4, "Kiran", "ME")]
takes = [(1, "DBMS"), (1, "OS"), (2, "DBMS"), (3, "DBMS"), (3, "OS")]

cse = [t for t in student if t[2] == "CSE"]
dbms = [t[1] for t in student if any(s[0] == t[0] and s[1] == "DBMS" for s in takes)]
none = [t[1] for t in student if not any(s[0] == t[0] for s in takes)]
every = [t[1] for t in student
         if all(any(s[0] == t[0] and s[1] == c[1] for s in takes) for c in takes)]
print(cse)
print(dbms)
print(none)
print(every)
```
```output
[(1, 'Asha', 'CSE'), (3, 'Meena', 'CSE')]
['Asha', 'Ravi', 'Meena']
['Kiran']
['Asha', 'Meena']
```

## Safe expressions

The query { t | ¬(t ∈ Student) } asks for every tuple that is *not* a student. There are infinitely many such tuples, so the query has no finite answer. An expression is **safe** if its result can only contain values that appear in the database (its *domain*) or in the query itself. Every free variable must be tied to some relation, as in `t ∈ Student ∧ ...`.

## Domain relational calculus (DRC)

DRC uses **domain variables**, which stand for single attribute values, instead of whole tuples:

{ ⟨n⟩ | ∃r ∃d (⟨r, n, d⟩ ∈ Student ∧ d = 'CSE') }

gives the names of CSE students. Query-by-example (QBE) interfaces are based on DRC.

## Expressive power

**Codd's theorem**: relational algebra, **safe** tuple relational calculus and **safe** domain relational calculus have exactly the same expressive power. A language that can express every relational algebra query is called **relationally complete**. SQL is relationally complete, and with aggregation, grouping and recursion it can express more.

Unsafe calculus expressions can describe infinite sets, which no algebra expression can produce, so "TRC is more powerful than RA" is only true for unsafe expressions, which are not allowed as queries.

## Practice questions

```quiz
q: Which TRC query returns the students who take **no** course?
- { t | t ∈ Student ∧ ∃s (s ∈ Takes ∧ s.roll ≠ t.roll) }
* { t | t ∈ Student ∧ ¬∃s (s ∈ Takes ∧ s.roll = t.roll) }
- { t | t ∈ Student ∧ ∀s (s ∈ Takes ∧ s.roll = t.roll) }
- { t | ¬(t ∈ Student) }
explain: "No course" means there is no Takes tuple with this student's roll: ¬∃s (s ∈ Takes ∧ s.roll = t.roll). Option A only says some tuple belongs to a different student, which is almost always true. Option D is unsafe.
```

```quiz
q: ∀x P(x) is equivalent to which formula?
- ∃x ¬P(x)
* ¬∃x ¬P(x)
- ¬∀x ¬P(x)
- ∃x P(x)
explain: P holds for every x exactly when there is no x for which P fails.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Safe tuple relational calculus and relational algebra have the same expressive power
* { t | ¬(t ∈ R) } is an unsafe expression
- Relational algebra is declarative and relational calculus is procedural
* SQL is relationally complete
explain: Codd's theorem gives the first. The second describes infinitely many tuples. Algebra is procedural and calculus declarative, the other way round. SQL can express every relational algebra query.
```

```quiz
q: Student = {(1, CSE), (2, ECE), (3, CSE), (4, CSE)} as (roll, dept) and Takes = {(1, DBMS), (3, OS), (3, DBMS), (5, DBMS)} as (roll, course). How many tuples does { t | t ∈ Student ∧ t.dept = 'CSE' ∧ ∃s (s ∈ Takes ∧ s.roll = t.roll) } return?
answer: 2
verify:
  student = [(1, "CSE"), (2, "ECE"), (3, "CSE"), (4, "CSE")]
  takes = [(1, "DBMS"), (3, "OS"), (3, "DBMS"), (5, "DBMS")]
  print(sum(1 for t in student if t[1] == "CSE" and any(s[0] == t[0] for s in takes)))
explain: CSE students are 1, 3 and 4. Students 1 and 3 have at least one Takes tuple; 4 has none. The result is {(1, CSE), (3, CSE)}: 2 tuples. Roll 5 is not a student, so it cannot appear.
```
