---
title: Introduction to DBMS
chapter: Basics
description: What a database management system does, the three-schema architecture, data independence and the main database languages.
---
A **database** is an organised collection of related data, for example the students, courses and marks of a college. A **database management system (DBMS)** is the software that stores this data and lets many users read and change it safely: MySQL, PostgreSQL, Oracle and SQLite are DBMSs.

## Why not just use files?

Before DBMSs, every program kept its own files. That caused problems a DBMS is designed to solve:

| Problem with plain files | What a DBMS provides |
| --- | --- |
| The same data stored in many files (**redundancy**), so copies disagree (**inconsistency**) | One shared copy of the data, defined once |
| A new question needs a new program | A query language (SQL) to ask any question |
| Rules such as "marks are between 0 and 100" are buried in program code | **Integrity constraints** declared with the data and checked automatically |
| Two users editing at once can overwrite each other | **Concurrency control** |
| A crash halfway through an update leaves broken data | **Transactions** and **recovery** |
| Anyone who can open the file can read everything | **Access control** per user and table |

## The three-schema architecture

A DBMS separates **how users see the data** from **how it is stored**, using three levels:

```tree
caption: The three levels (ANSI/SPARC architecture)
External level | many views, one per user group
  Conceptual level | one logical schema: tables, columns, keys
    Internal level | storage: files, records, indexes
```

- The **external level** holds **views**: a fees clerk sees names and fees, an examiner sees names and marks.
- The **conceptual level** describes the whole database logically: which tables exist, their columns, data types, keys and constraints.
- The **internal level** describes physical storage: file organisation, record layout, indexes and compression.

A **schema** is the description of the database (its design), which rarely changes. An **instance** (or state) is the data stored at one moment, which changes with every insert, update and delete.

## Data independence

Because of the levels, a change at one level need not affect the level above it:

- **Physical data independence**: the internal schema can change (for example, adding an index or moving to new disks) without changing the conceptual schema or the programs.
- **Logical data independence**: the conceptual schema can change (for example, adding a column or splitting a table) without changing the external views that do not use the change.

Logical data independence is harder to achieve, because programs and views refer directly to tables and columns.

## Database languages

| Language | Purpose | SQL examples |
| --- | --- | --- |
| **DDL** (data definition) | Define and change the schema | `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE` |
| **DML** (data manipulation) | Read and change the data | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| **DCL** (data control) | Permissions | `GRANT`, `REVOKE` |
| **TCL** (transaction control) | Group changes into transactions | `COMMIT`, `ROLLBACK` |

Here is a complete small example: DDL creates a table with constraints, DML adds rows and asks a question. Every SQL example in this track is run on a real SQLite database when the site is built, and the output shown is the actual result.

```sql
CREATE TABLE student (
  roll  INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  marks INTEGER CHECK (marks BETWEEN 0 AND 100)
);
INSERT INTO student VALUES (1, 'Asha', 82), (2, 'Ravi', 67), (3, 'Meena', 91);
SELECT name, marks FROM student WHERE marks > 70;
```
```output
name   marks
-----  -----
Asha   82
Meena  91
```

The `CHECK` constraint is enforced by the DBMS: an insert with `marks = 120` would be rejected, whatever program tries it.

## Data models

A **data model** is the set of concepts used to describe data:

- **Relational model**: data in tables (relations). Used by almost all databases today and by the rest of this track.
- **Entity–Relationship (ER) model**: a diagram-based model used to design a database before creating tables (next lesson).
- Older models: **hierarchical** (a tree of records) and **network** (a graph of records).
- **NoSQL** models (key–value, document, column-family, graph) trade some relational features for scale or flexibility.

## Practice questions

```quiz
q: Adding an index on a column changes which schema, and which kind of data independence lets programs stay unchanged?
- Conceptual schema; logical data independence
* Internal schema; physical data independence
- External schema; logical data independence
- Internal schema; logical data independence
explain: An index is part of physical storage, the internal schema. Programs work with tables and columns (the conceptual level), which do not change, so this is physical data independence.
```

```quiz
q: Which of these statements are **DDL**? (Select all that apply.)
* `CREATE TABLE`
* `ALTER TABLE`
- `UPDATE`
* `DROP TABLE`
explain: DDL statements define or change the schema: `CREATE`, `ALTER` and `DROP`. `UPDATE` changes data, so it is DML.
```

```quiz
q: Which statement about schema and instance is **true**?
- The instance is defined once, and the schema changes with every update
* The schema is the design of the database and changes rarely; the instance is the data at a moment and changes often
- Schema and instance are two names for the same thing
- An instance can exist without a schema
explain: The schema describes the structure (tables, columns, constraints). The instance is the set of rows currently stored, which changes with each insert, update and delete.
```

```quiz
q: How many levels does the ANSI/SPARC architecture have?
answer: 3
verify: len(['external', 'conceptual', 'internal'])
explain: External (views), conceptual (logical schema) and internal (physical storage).
```
