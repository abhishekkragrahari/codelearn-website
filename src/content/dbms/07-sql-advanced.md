---
title: Subqueries and NULLs
chapter: SQL
description: NULL and three-valued logic, nested and correlated subqueries, IN, EXISTS, ALL and ANY, the NOT IN trap, and views.
---
Most tricky GATE SQL questions come from two places: how **NULL** behaves, and how **subqueries**, especially correlated ones, are evaluated.

## NULL and three-valued logic

`NULL` means "unknown or missing". Any comparison with NULL, even `NULL = NULL`, gives neither true nor false but **UNKNOWN**. SQL logic therefore has three values:

| p | q | p AND q | p OR q | NOT p |
| --- | --- | --- | --- | --- |
| TRUE | UNKNOWN | UNKNOWN | TRUE | FALSE |
| FALSE | UNKNOWN | FALSE | UNKNOWN | TRUE |
| UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |

The rules that follow from it:

- `WHERE` and `HAVING` keep a row only when the condition is **TRUE**; FALSE and UNKNOWN rows are both dropped.
- To test for NULL, use `IS NULL` / `IS NOT NULL`, never `= NULL`.
- Arithmetic with NULL gives NULL: `salary + NULL` is NULL.
- Aggregates **ignore NULLs**: `SUM`, `AVG`, `MIN`, `MAX` and `COUNT(column)` skip them. Only `COUNT(*)` counts every row.
- `GROUP BY` puts all NULLs in one group, and `DISTINCT` treats NULLs as equal.

```sql
CREATE TABLE emp (name TEXT, bonus INTEGER);
INSERT INTO emp VALUES ('Asha', 100), ('Ravi', NULL), ('Meena', 300), ('Kiran', NULL);
SELECT COUNT(*) AS all_rows, COUNT(bonus) AS with_bonus,
       SUM(bonus) AS total, AVG(bonus) AS average
FROM emp;
SELECT COUNT(*) AS eq_null FROM emp WHERE bonus = NULL;
SELECT COUNT(*) AS is_null FROM emp WHERE bonus IS NULL;
SELECT COUNT(*) AS not_100 FROM emp WHERE bonus <> 100;
```
```output
all_rows  with_bonus  total  average
--------  ----------  -----  -------
4         2           400    200.0

eq_null
-------
0

is_null
-------
2

not_100
-------
1
```

`AVG(bonus)` is 400 / 2 = 200, not 400 / 4 = 100, because the two NULLs are ignored. `bonus = NULL` is never true, and `bonus <> 100` does not include the NULL rows either.

## Subqueries

A **subquery** is a `SELECT` inside another query. It can appear in `WHERE`, in `FROM` (as a derived table) or in `SELECT` (if it returns one value).

- `x IN (subquery)`: true if x equals some value of the subquery.
- `EXISTS (subquery)`: true if the subquery returns at least one row.
- `x > ALL (subquery)`: true if x is greater than **every** value (true when the subquery is empty).
- `x > ANY (subquery)` (or `SOME`): true if x is greater than **at least one** value (false when the subquery is empty).

`ALL` and `ANY` can always be rewritten with aggregates: `x > ALL (...)` is like `x > (SELECT MAX(...))` and `x > ANY (...)` is like `x > (SELECT MIN(...))`, except for the empty-subquery and NULL cases. SQLite, which runs the examples here, has no `ALL`/`ANY`, so the examples use the aggregate forms.

## Correlated subqueries

A subquery is **correlated** when it refers to a column of the outer query. Conceptually it is evaluated **once for every row** of the outer query.

```sql
CREATE TABLE emp (name TEXT, dept TEXT, salary INTEGER);
INSERT INTO emp VALUES
  ('Asha', 'CSE', 90000), ('Meena', 'CSE', 75000), ('Divya', 'CSE', 60000),
  ('Ravi', 'ECE', 60000), ('Arjun', 'ECE', 65000), ('Kiran', 'ME', 50000);
SELECT e.name, e.dept, e.salary FROM emp e
WHERE e.salary > (SELECT AVG(salary) FROM emp WHERE dept = e.dept);
SELECT name, salary FROM emp e
WHERE 1 = (SELECT COUNT(DISTINCT salary) FROM emp WHERE salary > e.salary);
```
```output
name   dept  salary
-----  ----  ------
Asha   CSE   90000
Arjun  ECE   65000

name   salary
-----  ------
Meena  75000
```

- The first query compares each employee with the average **of their own department** (CSE average 75000, ECE 62500, ME 50000). Kiran is not above the ME average, which is their own salary.
- The second finds the **second-highest salary**: the rows for which exactly one distinct salary is larger. Replacing 1 by N − 1 gives the N-th highest salary.

## EXISTS and "for all" queries

`NOT EXISTS` expresses relational division (the "for all" queries from relational calculus). "Students who take every course" becomes "students for whom there is no course they do not take":

```sql
CREATE TABLE student (roll INTEGER, name TEXT);
CREATE TABLE course (code TEXT);
CREATE TABLE takes (roll INTEGER, code TEXT);
INSERT INTO student VALUES (1, 'Asha'), (2, 'Ravi'), (3, 'Meena');
INSERT INTO course VALUES ('DBMS'), ('OS'), ('CN');
INSERT INTO takes VALUES (1, 'DBMS'), (1, 'OS'), (1, 'CN'), (2, 'DBMS'), (3, 'OS'), (3, 'CN');
SELECT s.name FROM student s
WHERE NOT EXISTS (
  SELECT * FROM course c
  WHERE NOT EXISTS (
    SELECT * FROM takes t WHERE t.roll = s.roll AND t.code = c.code
  )
);
```
```output
name
----
Asha
```

## The NOT IN trap

`x NOT IN (a, b, NULL)` means `x <> a AND x <> b AND x <> NULL`. The last part is UNKNOWN, so the whole condition can never be TRUE. **If the subquery of `NOT IN` returns a NULL, `NOT IN` returns no rows at all.** `NOT EXISTS` does not have this problem.

```sql
CREATE TABLE emp (id INTEGER, name TEXT, manager INTEGER);
INSERT INTO emp VALUES (1, 'Asha', NULL), (2, 'Ravi', 1), (3, 'Meena', 1), (4, 'Kiran', 2);
SELECT COUNT(*) AS not_in FROM emp WHERE id NOT IN (SELECT manager FROM emp);
SELECT COUNT(*) AS not_exists FROM emp e
WHERE NOT EXISTS (SELECT * FROM emp x WHERE x.manager = e.id);
```
```output
not_in
------
0

not_exists
----------
2
```

Both queries try to find employees who manage nobody (Meena and Kiran). `NOT IN` returns 0 rows because Asha's manager is NULL; `NOT EXISTS` correctly returns 2.

## Views

A **view** is a named query that behaves like a table. It stores no data of its own (unless it is a *materialised* view); every use re-runs the query, so it always shows current data. Views give logical data independence and can hide columns from some users.

```sql
CREATE TABLE emp (name TEXT, dept TEXT, salary INTEGER);
INSERT INTO emp VALUES ('Asha', 'CSE', 90000), ('Ravi', 'ECE', 60000), ('Meena', 'CSE', 75000);
CREATE VIEW dept_pay AS
  SELECT dept, COUNT(*) AS n, SUM(salary) AS total FROM emp GROUP BY dept;
INSERT INTO emp VALUES ('Divya', 'ECE', 70000);
SELECT * FROM dept_pay;
```
```output
dept  n  total
----  -  ------
CSE   2  165000
ECE   2  130000
```

The view includes Divya even though she was inserted after the view was created.

## Practice questions

```quiz
q: What does this query print?
code: sql
  CREATE TABLE t (a INTEGER);
  INSERT INTO t VALUES (10), (NULL), (20), (NULL), (30);
  SELECT COUNT(*) - COUNT(a) + AVG(a) FROM t;
answer: 22.0
explain: COUNT(*) = 5 counts all rows; COUNT(a) = 3 skips NULLs. AVG(a) = (10 + 20 + 30) / 3 = 20. So 5 − 3 + 20 = 22 (SQLite prints 22.0 because AVG is a real number).
```

```quiz
q: `r(x)` contains 1, 2, 3, 4 and `s(y)` contains 2, NULL. How many rows does `SELECT x FROM r WHERE x NOT IN (SELECT y FROM s)` return?
code: sql
  CREATE TABLE r (x INTEGER);
  CREATE TABLE s (y INTEGER);
  INSERT INTO r VALUES (1), (2), (3), (4);
  INSERT INTO s VALUES (2), (NULL);
  SELECT COUNT(*) FROM r WHERE x NOT IN (SELECT y FROM s);
answer: 0
explain: For x = 2 the condition is false. For x = 1, 3, 4 it is `x <> 2 AND x <> NULL`, which is TRUE AND UNKNOWN = UNKNOWN. WHERE keeps only TRUE rows, so no row is returned.
```

```quiz
q: How many employees earn **more than the average salary of their own department**?
code: sql
  CREATE TABLE emp (name TEXT, dept TEXT, salary INTEGER);
  INSERT INTO emp VALUES
    ('A', 'X', 100), ('B', 'X', 200), ('C', 'X', 300),
    ('D', 'Y', 400), ('E', 'Y', 400), ('F', 'Z', 50), ('G', 'Z', 150);
  SELECT COUNT(*) FROM emp e
  WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept = e.dept);
answer: 2
explain: Averages: X = 200, Y = 400, Z = 100. Above their average: C (300 > 200) and G (150 > 100). B equals the X average, and D and E equal the Y average, so they do not count. Answer 2.
```

```quiz
q: Which statements are **true** in SQL? (Select all that apply.)
* `COUNT(*)` counts rows even when every column is NULL
* `x > ALL (subquery)` is true when the subquery returns no rows
- `NULL = NULL` evaluates to TRUE
- `AVG(c)` treats NULL values in c as 0
explain: COUNT(*) counts rows, not values. ALL over an empty set is vacuously true. A comparison with NULL is UNKNOWN, and aggregates skip NULLs instead of treating them as 0.
```

```quiz
q: Table `t(v)` has values 5, 8, 8, 3, 10, 10, 7. The query below finds rows whose value is exceeded by exactly two **distinct** values. What does it print?
code: sql
  CREATE TABLE t (v INTEGER);
  INSERT INTO t VALUES (5), (8), (8), (3), (10), (10), (7);
  SELECT DISTINCT v FROM t x
  WHERE 2 = (SELECT COUNT(DISTINCT v) FROM t WHERE v > x.v);
answer: 7
explain: The distinct values in decreasing order are 10, 8, 7, 5, 3. Value 7 is exceeded by exactly two distinct values (8 and 10), so the query returns the third-highest distinct value, 7.
```
