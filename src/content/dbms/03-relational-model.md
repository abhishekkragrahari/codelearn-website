---
title: Relational Model and Keys
chapter: Relational Model
description: Relations, tuples and domains; superkeys, candidate, primary and foreign keys; counting superkeys; and integrity constraints.
---
In the **relational model** all data is stored in **relations**, which we usually call tables.

## Terms

| Formal term | Everyday term | Meaning |
| --- | --- | --- |
| Relation | Table | A set of tuples with the same attributes |
| Tuple | Row | One record |
| Attribute | Column | One named property |
| Domain | Data type | The set of allowed values of an attribute |
| **Degree** (arity) | Number of columns | |
| **Cardinality** | Number of rows | |
| Relation schema | Table definition | `Student(roll, name, dept)` |

Because a relation is a **set** of tuples:

- it has **no duplicate tuples**, and
- the order of tuples does not matter (and neither does the order of attributes, since they are named).

SQL tables relax the first rule: a table without a key can contain duplicate rows, and `SELECT` keeps duplicates unless you write `DISTINCT`.

## Keys

Take the relation `Student(roll, email, name, dept)` where every student has a unique roll number and a unique email.

- A **superkey** is any set of attributes whose values are unique for every tuple: `{roll}`, `{email}`, `{roll, name}`, `{roll, email, name, dept}` and many more.
- A **candidate key** is a **minimal** superkey: no attribute can be removed from it. Here `{roll}` and `{email}` are candidate keys, while `{roll, name}` is a superkey but not minimal.
- The **primary key** is the candidate key chosen by the designer to identify tuples (say `roll`). The other candidate keys are **alternate keys**.
- A **composite key** is a key with more than one attribute, such as `(roll, code)` in an enrolment table.
- Attributes that belong to some candidate key are **prime attributes**; the rest are **non-prime**. This matters for normal forms.
- A **foreign key** is an attribute set in one relation that refers to the primary key of another (or the same) relation.

```tree
caption: Every candidate key is a superkey; the primary key is one chosen candidate key
Superkeys | unique sets of attributes
  Candidate keys | minimal superkeys
    Primary key | the one chosen
    Alternate keys | the others
```

## Counting superkeys

GATE often asks how many superkeys a relation has. The rule: a superkey is any set of attributes that **contains** at least one candidate key.

For a relation with **n** attributes:

- With one candidate key of **k** attributes, the other n − k attributes may each be present or absent: **2ⁿ⁻ᵏ** superkeys.
- With two candidate keys K₁ and K₂, use inclusion–exclusion: |supersets of K₁| + |supersets of K₂| − |supersets of K₁ ∪ K₂|.

Example: R(A, B, C, D, E) with candidate keys {A} and {B, C}. Supersets of {A}: 2⁴ = 16. Supersets of {B, C}: 2³ = 8. Supersets of {A, B, C}: 2² = 4. Total 16 + 8 − 4 = **20**. A brute-force check over all subsets agrees:

```python
from itertools import combinations

attrs = "ABCDE"
keys = [set("A"), set("BC")]
count = 0
for r in range(1, len(attrs) + 1):
    for subset in combinations(attrs, r):
        if any(k <= set(subset) for k in keys):
            count += 1
print(count)
```
```output
20
```

## Integrity constraints

| Constraint | Rule |
| --- | --- |
| Domain constraint | Each value comes from the attribute's domain (type, `CHECK`) |
| Key constraint | No two tuples have the same key value (`PRIMARY KEY`, `UNIQUE`) |
| **Entity integrity** | No part of the primary key may be NULL |
| **Referential integrity** | Every foreign key value must match an existing primary key value in the referenced table, or be NULL |

What happens when a referenced row is deleted? The foreign key decides:

- `ON DELETE RESTRICT` / `NO ACTION` (default): the delete is rejected while rows refer to it.
- `ON DELETE CASCADE`: the referring rows are deleted too.
- `ON DELETE SET NULL`: the referring foreign keys become NULL.

```sql
CREATE TABLE dept (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE emp (
  id      INTEGER PRIMARY KEY,
  name    TEXT,
  dept_id INTEGER REFERENCES dept(id) ON DELETE CASCADE
);
CREATE TABLE project (
  id      INTEGER PRIMARY KEY,
  title   TEXT,
  dept_id INTEGER REFERENCES dept(id) ON DELETE SET NULL
);
INSERT INTO dept VALUES (1, 'CSE'), (2, 'ECE');
INSERT INTO emp VALUES (10, 'Asha', 1), (11, 'Ravi', 2), (12, 'Meena', 1);
INSERT INTO project VALUES (100, 'Compiler', 1), (101, 'Router', 2);
DELETE FROM dept WHERE id = 1;
SELECT * FROM emp;
SELECT * FROM project;
```
```output
id  name  dept_id
--  ----  -------
11  Ravi  2

id   title     dept_id
---  --------  -------
100  Compiler  NULL
101  Router    2
```

Deleting department 1 removed its two employees (cascade) and left project 100 without a department (set null).

> **Note:** Inserting a row whose foreign key value does not exist in the referenced table (for example an employee in department 9) is always rejected, whatever the `ON DELETE` rule. The rules only control what happens to referring rows when the *referenced* row is deleted or updated.

## Practice questions

```quiz
q: A relation R has 6 attributes and exactly one candidate key, which consists of 2 attributes. How many superkeys does R have?
answer: 16
verify: 2 ** (6 - 2)
explain: Every superkey must contain both key attributes; each of the other 4 attributes is either in or out, so there are 2⁴ = 16 superkeys.
```

```quiz
q: R(A, B, C, D) has candidate keys {A, B} and {C}. How many superkeys does R have?
answer: 10
verify:
  from itertools import combinations
  keys = [set("AB"), set("C")]
  print(sum(1 for r in range(1, 5) for s in combinations("ABCD", r) if any(k <= set(s) for k in keys)))
explain: Supersets of {A, B}: 2² = 4. Supersets of {C}: 2³ = 8. Supersets of both, {A, B, C}: 2¹ = 2. Total 4 + 8 − 2 = 10.
```

```quiz
q: Which of these are **true**? (Select all that apply.)
* Every candidate key is a superkey
- Every superkey is a candidate key
* A relation can have more than one candidate key
- The primary key may contain NULL values if they are unique
explain: A candidate key is a minimal superkey, so it is a superkey, but a superkey with extra attributes is not minimal. A relation can have several candidate keys. Entity integrity forbids NULL in any part of the primary key.
```

```quiz
q: Tables `a` and `b` are created and filled as below. What does the final query print?
code: sql
  CREATE TABLE a (id INTEGER PRIMARY KEY);
  CREATE TABLE b (
    id   INTEGER PRIMARY KEY,
    a_id INTEGER REFERENCES a(id) ON DELETE CASCADE
  );
  INSERT INTO a VALUES (1), (2), (3);
  INSERT INTO b VALUES (1, 1), (2, 1), (3, 2), (4, 3), (5, NULL);
  DELETE FROM a WHERE id IN (1, 3);
  SELECT COUNT(*) FROM b;
answer: 2
explain: Deleting a-rows 1 and 3 cascades to b-rows 1, 2 (referring to 1) and 4 (referring to 3). Rows 3 (referring to 2) and 5 (NULL foreign key, referring to nothing) remain: 2 rows.
```

```quiz
q: Relation `Enrol(roll, code, grade)` has primary key (roll, code). Which inserted tuple violates **entity integrity**?
- (5, 'CS301', NULL)
* (NULL, 'CS301', 'A')
- (5, 'CS302', 'B')
- (6, 'CS301', 'A')
explain: Entity integrity forbids NULL in any attribute of the primary key, and roll is part of the key. A NULL grade is allowed, since grade is not a key attribute.
```
