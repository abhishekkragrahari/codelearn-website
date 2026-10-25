---
title: Relational Algebra
chapter: Relational Model
description: Selection, projection, set operations, Cartesian product, joins, outer joins and division, with result sizes and a small Python implementation.
---
**Relational algebra** is a set of operators that take relations as input and produce a relation as output. It is the mathematical basis of SQL: a DBMS turns every SQL query into a relational algebra expression before running it. Because each result is again a relation, operators can be nested freely.

We use these two relations throughout:

**Student**

| roll | name | dept |
| --- | --- | --- |
| 1 | Asha | CSE |
| 2 | Ravi | ECE |
| 3 | Meena | CSE |

**Takes**

| roll | course |
| --- | --- |
| 1 | DBMS |
| 1 | OS |
| 2 | DBMS |
| 3 | DBMS |
| 3 | OS |

## The basic operators

| Operator | Symbol | Result |
| --- | --- | --- |
| Selection | σ<sub>condition</sub>(R) | The tuples of R that satisfy the condition (rows) |
| Projection | π<sub>attributes</sub>(R) | Only the listed attributes (columns), **duplicates removed** |
| Union | R ∪ S | Tuples in R or S |
| Set difference | R − S | Tuples in R but not in S |
| Cartesian product | R × S | Every tuple of R paired with every tuple of S |
| Rename | ρ<sub>new</sub>(R) | The same relation under a new name |

These six are **complete**: every other operator can be written using them. Union, intersection and difference need **union-compatible** relations: the same number of attributes, with matching domains.

Examples:

- σ<sub>dept = 'CSE'</sub>(Student) gives Asha and Meena.
- π<sub>course</sub>(Takes) gives {DBMS, OS}: 2 tuples, not 5, because projection removes duplicates.
- π<sub>roll</sub>(Student) − π<sub>roll</sub>(σ<sub>course = 'OS'</sub>(Takes)) gives {2}: the student who does not take OS.

## Derived operators

| Operator | Definition with basic operators |
| --- | --- |
| Intersection R ∩ S | R − (R − S) |
| Theta join R ⋈<sub>θ</sub> S | σ<sub>θ</sub>(R × S) |
| Equijoin | A theta join whose condition uses only `=` |
| **Natural join** R ⋈ S | Equijoin on **all** attributes with the same name, keeping one copy of each |
| Division R ÷ S | See below |

## Result sizes

For R with m tuples and S with n tuples:

| Expression | Number of tuples |
| --- | --- |
| R × S | exactly m × n (degree adds up) |
| R ∪ S | between max(m, n) and m + n |
| R ∩ S | between 0 and min(m, n) |
| R − S | between 0 and m |
| R ⋈ S (natural) | between 0 and m × n |
| R ⋈ S where the common attribute is a **foreign key in R** referencing S's key (not NULL) | exactly m |
| R ⋈ S with **no** common attributes | m × n (it becomes a Cartesian product) |

## Outer joins

A natural join drops tuples that have no match. **Outer joins** keep them, filling the missing side with NULL:

- **Left outer join** (⟕): all tuples of the left relation.
- **Right outer join** (⟖): all tuples of the right relation.
- **Full outer join** (⟗): all tuples of both.

## Division

R(A, B) ÷ S(B) gives the A values that are paired in R with **every** B value of S. It answers "for all" questions: *which students take all courses?*

π<sub>roll, course</sub>(Takes) ÷ π<sub>course</sub>(Takes) = {1, 3}, because Asha and Meena take both DBMS and OS, while Ravi takes only DBMS.

Using basic operators: R ÷ S = π<sub>A</sub>(R) − π<sub>A</sub>((π<sub>A</sub>(R) × S) − R). The inner part, (π<sub>A</sub>(R) × S) − R, lists the (A, B) pairs that are *missing*; any A with a missing pair is removed.

## Relational algebra in Python

Here the operators are written as small Python functions on relations stored as sets of tuples, so you can see exactly what each one computes:

```python
student = {"attrs": ("roll", "name", "dept"),
           "rows": {(1, "Asha", "CSE"), (2, "Ravi", "ECE"), (3, "Meena", "CSE")}}
takes = {"attrs": ("roll", "course"),
         "rows": {(1, "DBMS"), (1, "OS"), (2, "DBMS"), (3, "DBMS"), (3, "OS")}}

def select(r, pred):
    return {"attrs": r["attrs"],
            "rows": {t for t in r["rows"] if pred(dict(zip(r["attrs"], t)))}}

def project(r, attrs):
    idx = [r["attrs"].index(a) for a in attrs]
    return {"attrs": tuple(attrs), "rows": {tuple(t[i] for i in idx) for t in r["rows"]}}

def natural_join(r, s):
    common = [a for a in r["attrs"] if a in s["attrs"]]
    extra = [a for a in s["attrs"] if a not in common]
    rows = set()
    for t in r["rows"]:
        for u in s["rows"]:
            d, e = dict(zip(r["attrs"], t)), dict(zip(s["attrs"], u))
            if all(d[a] == e[a] for a in common):
                rows.add(t + tuple(e[a] for a in extra))
    return {"attrs": r["attrs"] + tuple(extra), "rows": rows}

def divide(r, s):
    a_attrs = [a for a in r["attrs"] if a not in s["attrs"]]
    candidates = project(r, a_attrs)["rows"]
    pairs = project(r, a_attrs + list(s["attrs"]))["rows"]
    return {x for x in candidates if all(x + y in pairs for y in s["rows"])}

print(sorted(select(student, lambda t: t["dept"] == "CSE")["rows"]))
print(sorted(project(takes, ["course"])["rows"]))
print(len(natural_join(student, takes)["rows"]), "tuples in Student ⋈ Takes")
print(sorted(divide(takes, project(takes, ["course"]))))
```
```output
[(1, 'Asha', 'CSE'), (3, 'Meena', 'CSE')]
[('DBMS',), ('OS',)]
5 tuples in Student ⋈ Takes
[(1,), (3,)]
```

The natural join has 5 tuples, one per `Takes` tuple, because `roll` in `Takes` refers to the key of `Student`. The division gives rolls 1 and 3.

## The same queries in SQL

SQL keeps duplicates by default, so π corresponds to `SELECT DISTINCT`. SQL has no division operator; "for all" is written with `NOT EXISTS` or by counting, as in the last query below.

```sql
CREATE TABLE student (roll INTEGER PRIMARY KEY, name TEXT, dept TEXT);
CREATE TABLE takes (roll INTEGER, course TEXT);
INSERT INTO student VALUES (1, 'Asha', 'CSE'), (2, 'Ravi', 'ECE'), (3, 'Meena', 'CSE');
INSERT INTO takes VALUES (1, 'DBMS'), (1, 'OS'), (2, 'DBMS'), (3, 'DBMS'), (3, 'OS');
SELECT DISTINCT course FROM takes;
SELECT roll FROM student
EXCEPT
SELECT roll FROM takes WHERE course = 'OS';
SELECT roll FROM takes GROUP BY roll
HAVING COUNT(DISTINCT course) = (SELECT COUNT(DISTINCT course) FROM takes);
```
```output
course
------
DBMS
OS

roll
----
2

roll
----
1
3
```

## Practice questions

```quiz
q: R has 8 tuples and S has 6 tuples, and they have no attribute in common. How many tuples does the natural join R ⋈ S have?
answer: 48
verify: 8 * 6
explain: With no common attribute, the join condition is empty (always true), so the natural join is the Cartesian product: 8 × 6 = 48 tuples.
```

```quiz
q: R(A, B) has 20 tuples and S(B, C) has 15 tuples. B is the primary key of S, and B in R is a foreign key referencing S that is never NULL. How many tuples does R ⋈ S have?
answer: 20
verify: 20
explain: Every tuple of R has a B value that appears in exactly one tuple of S (B is S's key and the foreign key guarantees the value exists), so each R tuple joins with exactly one S tuple: 20.
```

```quiz
q: R(A, B) = {(1, x), (1, y), (2, x), (3, y), (3, x), (4, z)} and S(B) = {(x), (y)}. How many tuples are in R ÷ S?
answer: 2
verify:
  R = {(1, "x"), (1, "y"), (2, "x"), (3, "y"), (3, "x"), (4, "z")}
  S = {"x", "y"}
  print(len({a for a, _ in R if all((a, b) in R for b in S)}))
explain: R ÷ S keeps the A values paired with both x and y. A = 1 has (1, x), (1, y) and A = 3 has (3, x), (3, y). A = 2 lacks y and A = 4 has neither. Answer: {1, 3}, 2 tuples.
```

```quiz
q: Which of these are among the six **basic** (complete set of) relational algebra operators? (Select all that apply.)
* Set difference
* Cartesian product
- Intersection
- Natural join
* Projection
explain: The complete set is selection, projection, union, set difference, Cartesian product and rename. Intersection is R − (R − S) and a natural join is a selection over a product followed by a projection, so both are derived.
```

```quiz
q: R(A, B) = {(1, 2), (1, 3), (2, 2), (4, 3), (4, 2)}. How many tuples are in π<sub>A</sub>(R)?
answer: 3
verify: len({a for a, b in [(1, 2), (1, 3), (2, 2), (4, 3), (4, 2)]})
explain: Projection removes duplicates: the A values are {1, 2, 4}, so there are 3 tuples.
```

```quiz
q: `Emp(id, dept)` has 4 rows: (1, 10), (2, 20), (3, 10), (4, 30). `Dept(dept, name)` has 3 rows: (10, CSE), (20, ECE), (40, ME). How many rows does Emp **full outer join** Dept on dept have?
code: sql
  CREATE TABLE emp (id INTEGER, dept INTEGER);
  CREATE TABLE dept (dept INTEGER, name TEXT);
  INSERT INTO emp VALUES (1, 10), (2, 20), (3, 10), (4, 30);
  INSERT INTO dept VALUES (10, 'CSE'), (20, 'ECE'), (40, 'ME');
  SELECT COUNT(*) FROM emp FULL OUTER JOIN dept ON emp.dept = dept.dept;
answer: 5
explain: Matched pairs: employees 1, 2 and 3 (3 rows). Employee 4 (department 30) has no match and is kept with NULLs. Department 40 has no employee and is kept with NULLs. Total 3 + 1 + 1 = 5.
```
