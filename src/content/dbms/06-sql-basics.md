---
title: SQL Queries
chapter: SQL
description: SELECT, WHERE, ORDER BY, aggregates, GROUP BY and HAVING, joins and set operations, with the order in which SQL evaluates a query.
---
**SQL** (Structured Query Language) is the standard language of relational databases. This lesson covers the queries GATE asks about. Each example creates its own small tables, so it can be read and run on its own; the outputs are real SQLite results.

## SELECT, WHERE and ORDER BY

```sql
CREATE TABLE emp (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, salary INTEGER);
INSERT INTO emp VALUES
  (1, 'Asha', 'CSE', 90000), (2, 'Ravi', 'ECE', 60000), (3, 'Meena', 'CSE', 75000),
  (4, 'Kiran', 'ME', 50000), (5, 'Arjun', 'ECE', 65000), (6, 'Divya', 'CSE', 60000);
SELECT name, salary FROM emp
WHERE dept = 'CSE' AND salary >= 70000
ORDER BY salary DESC;
SELECT DISTINCT dept FROM emp ORDER BY dept;
SELECT name FROM emp WHERE name LIKE 'A%' OR salary BETWEEN 55000 AND 62000;
```
```output
name   salary
-----  ------
Asha   90000
Meena  75000

dept
----
CSE
ECE
ME

name
-----
Asha
Ravi
Arjun
Divya
```

- `WHERE` filters rows. `AND`, `OR`, `NOT`, comparison operators, `IN (...)`, `BETWEEN a AND b` (both ends included) and `LIKE` work as expected.
- In `LIKE`, `%` matches any sequence of characters (including none) and `_` matches exactly one.
- `DISTINCT` removes duplicate rows from the result.
- `ORDER BY` sorts (ascending by default, `DESC` for descending). Without it, the order of rows is not guaranteed.

## Aggregates, GROUP BY and HAVING

The aggregate functions `COUNT`, `SUM`, `AVG`, `MIN` and `MAX` turn many rows into one value. `GROUP BY` splits the rows into groups and computes the aggregates per group; `HAVING` then filters the **groups**.

```sql
CREATE TABLE emp (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, salary INTEGER);
INSERT INTO emp VALUES
  (1, 'Asha', 'CSE', 90000), (2, 'Ravi', 'ECE', 60000), (3, 'Meena', 'CSE', 75000),
  (4, 'Kiran', 'ME', 50000), (5, 'Arjun', 'ECE', 65000), (6, 'Divya', 'CSE', 60000);
SELECT COUNT(*) AS n, MAX(salary) AS top, SUM(salary) AS total FROM emp;
SELECT dept, COUNT(*) AS n, AVG(salary) AS avg_salary
FROM emp
GROUP BY dept
HAVING COUNT(*) >= 2
ORDER BY dept;
```
```output
n  top    total
-  -----  ------
6  90000  400000

dept  n  avg_salary
----  -  ----------
CSE   3  75000.0
ECE   2  62500.0
```

The ME department has only one employee, so `HAVING COUNT(*) >= 2` removes its group.

> **Warning:** `WHERE` cannot use aggregates, because it runs before the groups exist: `WHERE COUNT(*) >= 2` is an error. Conditions on groups belong in `HAVING`. Also, with `GROUP BY`, every column in `SELECT` must either be in the `GROUP BY` list or be inside an aggregate.

## The order of evaluation

A query is written in one order but evaluated in another. Knowing the evaluation order explains most SQL rules:

```pipeline
caption: The logical order in which a SELECT query is evaluated
FROM / JOIN | build the rows
WHERE | filter rows
GROUP BY | form groups
HAVING | filter groups
SELECT | compute columns
DISTINCT | remove duplicates
ORDER BY | sort
```

For example, a column alias defined in `SELECT` can be used in `ORDER BY` (which comes later), but not in `WHERE` (which comes earlier).

## Joins

A join combines rows from two tables. The most common form matches a foreign key with the key it refers to.

```sql
CREATE TABLE dept (code TEXT PRIMARY KEY, building TEXT);
CREATE TABLE emp (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, manager INTEGER);
INSERT INTO dept VALUES ('CSE', 'Block A'), ('ECE', 'Block B'), ('CIVIL', 'Block C');
INSERT INTO emp VALUES (1, 'Asha', 'CSE', NULL), (2, 'Ravi', 'ECE', 1),
  (3, 'Meena', 'CSE', 1), (4, 'Kiran', 'ME', 2);
SELECT e.name, d.building FROM emp e INNER JOIN dept d ON e.dept = d.code;
SELECT d.code, e.name FROM dept d LEFT JOIN emp e ON e.dept = d.code ORDER BY d.code;
SELECT e.name AS employee, m.name AS manager FROM emp e JOIN emp m ON e.manager = m.id;
```
```output
name   building
-----  --------
Asha   Block A
Ravi   Block B
Meena  Block A

code   name
-----  -----
CIVIL  NULL
CSE    Asha
CSE    Meena
ECE    Ravi

employee  manager
--------  -------
Ravi      Asha
Meena     Asha
Kiran     Ravi
```

- **INNER JOIN** keeps only matching pairs. Kiran (department ME, which is not in `dept`) and the CIVIL department disappear.
- **LEFT JOIN** keeps every row of the left table; CIVIL appears with NULL for the employee. `RIGHT JOIN` and `FULL OUTER JOIN` keep the right table or both.
- A **self join** joins a table with itself under two aliases, here to pair each employee with their manager. Asha has no manager, so she does not appear as an employee.
- `NATURAL JOIN` joins on all columns with the same name, and `CROSS JOIN` is the Cartesian product.

## Set operations

`UNION`, `INTERSECT` and `EXCEPT` (called `MINUS` in Oracle) combine the results of two queries with the same columns. They **remove duplicates**; `UNION ALL` keeps them.

```sql
CREATE TABLE a (x INTEGER);
CREATE TABLE b (x INTEGER);
INSERT INTO a VALUES (1), (2), (2), (3);
INSERT INTO b VALUES (2), (3), (4);
SELECT COUNT(*) AS union_rows FROM (SELECT x FROM a UNION SELECT x FROM b);
SELECT COUNT(*) AS union_all_rows FROM (SELECT x FROM a UNION ALL SELECT x FROM b);
SELECT x FROM a INTERSECT SELECT x FROM b;
SELECT x FROM a EXCEPT SELECT x FROM b;
```
```output
union_rows
----------
4

union_all_rows
--------------
7

x
-
2
3

x
-
1
```

## Changing data

```sql
CREATE TABLE emp (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER);
INSERT INTO emp VALUES (1, 'Asha', 90000), (2, 'Ravi', 60000), (3, 'Meena', 75000);
UPDATE emp SET salary = salary + 5000 WHERE salary < 80000;
DELETE FROM emp WHERE name = 'Asha';
SELECT * FROM emp;
```
```output
id  name   salary
--  -----  ------
2   Ravi   65000
3   Meena  80000
```

`UPDATE` and `DELETE` without a `WHERE` clause change **every** row of the table.

## Practice questions

```quiz
q: What does this query print?
code: sql
  CREATE TABLE t (g TEXT, v INTEGER);
  INSERT INTO t VALUES ('a', 5), ('a', 7), ('b', 3), ('b', 4), ('b', 9), ('c', 10);
  SELECT COUNT(*) FROM (SELECT g FROM t GROUP BY g HAVING SUM(v) > 11);
answer: 2
explain: The group sums are a: 5 + 7 = 12, b: 3 + 4 + 9 = 16 and c: 10. Groups a and b pass `SUM(v) > 11`, so the outer query counts 2 groups.
```

```quiz
q: Table `r(x)` has rows 1, 1, 2, 3, 3, 3 and table `s(x)` has rows 3, 3, 4. How many rows does `SELECT x FROM r UNION ALL SELECT x FROM s` return?
code: sql
  CREATE TABLE r (x INTEGER);
  CREATE TABLE s (x INTEGER);
  INSERT INTO r VALUES (1), (1), (2), (3), (3), (3);
  INSERT INTO s VALUES (3), (3), (4);
  SELECT COUNT(*) FROM (SELECT x FROM r UNION ALL SELECT x FROM s);
answer: 9
explain: UNION ALL keeps every row: 6 + 3 = 9. Plain UNION removes duplicates and returns {1, 2, 3, 4}, 4 rows.
```

```quiz
q: In which clause can an aggregate condition such as `COUNT(*) > 3` **not** appear?
* WHERE
- HAVING
- SELECT
- ORDER BY
explain: WHERE filters individual rows before grouping, so aggregates are not available there. HAVING, SELECT and ORDER BY are evaluated after grouping.
```

```quiz
q: `emp(id, dept)` has 5 rows with dept values CSE, CSE, ECE, ME, ME, and `dept(code)` has 4 rows CSE, ECE, CIVIL, EEE. How many rows does `dept LEFT JOIN emp ON emp.dept = dept.code` return?
code: sql
  CREATE TABLE emp (id INTEGER, dept TEXT);
  CREATE TABLE dept (code TEXT);
  INSERT INTO emp VALUES (1, 'CSE'), (2, 'CSE'), (3, 'ECE'), (4, 'ME'), (5, 'ME');
  INSERT INTO dept VALUES ('CSE'), ('ECE'), ('CIVIL'), ('EEE');
  SELECT COUNT(*) FROM dept LEFT JOIN emp ON emp.dept = dept.code;
answer: 5
explain: CSE matches 2 employees and ECE matches 1 (3 rows). CIVIL and EEE have no employees, but a left join keeps them with NULLs (2 rows). The ME employees match no row of `dept`, the left table, so they do not appear. Total 5.
```

```quiz
q: A query uses `SELECT dept, AVG(salary) AS a FROM emp GROUP BY dept HAVING ... ORDER BY a`. Which clause is evaluated **last**?
- HAVING
- SELECT
* ORDER BY
- GROUP BY
explain: The logical order is FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. That is why ORDER BY can use the alias `a` defined in SELECT.
```
