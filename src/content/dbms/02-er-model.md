---
title: The ER Model
chapter: Basics
description: Entities, attributes, relationships, cardinality and participation, weak entities, and how to turn an ER design into tables.
---
The **Entity–Relationship (ER) model** is used to *design* a database before any table is created. It describes the things the database is about (entities), their properties (attributes) and how they are connected (relationships).

## Entities and attributes

An **entity** is one real-world thing, such as the student Asha. An **entity set** (or entity type) is the collection of similar entities: all students. In an ER diagram an entity set is drawn as a rectangle.

An **attribute** is a property of an entity (drawn as an oval). Attributes come in several kinds:

| Kind | Meaning | Example |
| --- | --- | --- |
| Simple | Cannot be divided | `roll` |
| Composite | Made of parts | `name` = first + last |
| Single-valued | One value per entity | `date_of_birth` |
| **Multivalued** | Several values per entity (double oval) | `phone_numbers` |
| **Derived** | Computed from others (dashed oval) | `age`, from `date_of_birth` |
| **Key** | Uniquely identifies an entity (underlined) | `roll` |

## Relationships

A **relationship** connects entities, such as "Asha *enrols in* DBMS". A **relationship set** (a diamond in the diagram) is the collection of similar relationships. A relationship can have its own attributes: the `grade` belongs to the enrolment, not to the student or the course alone.

The **degree** of a relationship is the number of entity sets it connects: **binary** (2, the most common), **ternary** (3) or **unary/recursive** (an entity set related to itself, such as *employee manages employee*).

## Cardinality and participation

The **cardinality ratio** of a binary relationship says how many entities on one side can be related to one entity on the other:

| Ratio | Meaning | Example |
| --- | --- | --- |
| 1:1 | Each A with at most one B, and each B with at most one A | person – passport |
| 1:N | Each A with many B, each B with at most one A | department – employee |
| M:N | Each A with many B and each B with many A | student – course |

```graph
caption: A small college design: entities and the cardinality of each relationship
nodes: Department Employee Project Student Course
Department - Employee : 1:N
Employee - Project : M:N
Student - Course : M:N
Department - Course : 1:N
```

**Participation** says whether every entity must take part:

- **Total participation** (double line): every entity is in at least one relationship. Every employee *must* work in some department.
- **Partial participation** (single line): some entities may take part in none. Not every employee manages a department.

## Weak entities

A **weak entity set** has no key of its own; its entities are identified only together with an **owner** (identifying) entity. Example: `Dependent(name, age)` of an employee. Two employees can each have a dependent named "Riya", so `name` alone is not a key. A weak entity has a **partial key** (discriminator, dashed underline), and its full key is *owner's key + partial key*: `(emp_id, dependent_name)`. A weak entity always has **total participation** in its identifying relationship (drawn with double rectangle and double diamond).

## Specialization and generalization

- **Specialization** (top-down): split an entity set into subclasses, such as `Employee` into `Engineer` and `Manager`, each with extra attributes.
- **Generalization** (bottom-up): combine similar entity sets, such as `Car` and `Truck`, into a superclass `Vehicle`.
- Subclasses **inherit** the attributes of the superclass. A specialization can be **disjoint** or **overlapping**, and **total** or **partial**.

## From ER diagram to tables

The mapping rules are a GATE favourite, especially "what is the **minimum number of tables** needed?":

| ER construct | Tables needed |
| --- | --- |
| Strong entity set | One table; its attributes are columns, its key is the primary key. Composite attributes are flattened into their parts; derived attributes are usually not stored. |
| Multivalued attribute | A **separate table** (entity key + the value) |
| Weak entity set | One table including the owner's key; primary key = owner key + partial key |
| **M:N** relationship | A **separate table** with both keys (together the primary key) and the relationship's attributes |
| **1:N** relationship | No new table: put the key of the "1" side as a foreign key in the "N" side's table |
| **1:1** relationship | No new table: a foreign key on either side (prefer the side with total participation). With total participation on **both** sides the two entities can be merged into **one** table. |

Here is the student–course M:N relationship mapped to three tables. The `enrols` table holds one row per relationship, with both keys and the relationship's own attribute.

```sql
CREATE TABLE student (roll INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE course (code TEXT PRIMARY KEY, title TEXT);
CREATE TABLE enrols (
  roll  INTEGER REFERENCES student(roll),
  code  TEXT REFERENCES course(code),
  grade TEXT,
  PRIMARY KEY (roll, code)
);
INSERT INTO student VALUES (1, 'Asha'), (2, 'Ravi');
INSERT INTO course VALUES ('CS301', 'DBMS'), ('CS302', 'OS');
INSERT INTO enrols VALUES (1, 'CS301', 'A'), (1, 'CS302', 'B'), (2, 'CS301', 'A');
SELECT s.name, c.title, e.grade
FROM enrols e JOIN student s ON s.roll = e.roll JOIN course c ON c.code = e.code;
```
```output
name  title  grade
----  -----  -----
Asha  DBMS   A
Asha  OS     B
Ravi  DBMS   A
```

Asha appears twice and DBMS appears twice: that is exactly what "many-to-many" means, and it is why the relationship needs its own table.

## Practice questions

```quiz
q: Entity sets E1(**a1**, a2) and E2(**b1**, b2) are connected by an M:N relationship R that has an attribute r. Both participations are partial. What is the minimum number of tables needed?
answer: 3
verify: 1 + 1 + 1
explain: Each strong entity needs its own table, and an M:N relationship always needs a separate table R(a1, b1, r) with primary key (a1, b1). Total: 3.
```

```quiz
q: E1 and E2 are connected by a **1:N** relationship R (many E2 for each E1), and E2 and E3 by an **M:N** relationship S. All entity sets are strong and all participations are partial. What is the minimum number of tables?
answer: 4
verify: 3 + 0 + 1
explain: E1, E2 and E3 need a table each. The 1:N relationship R is stored as a foreign key (E1's key) in E2's table, so it needs no table. The M:N relationship S needs its own table. Total 4.
```

```quiz
q: An entity set `Employee(emp_id, name, phones)` has one multivalued attribute `phones`. How many tables does it map to?
answer: 2
verify: 1 + 1
explain: The multivalued attribute goes into its own table `EmployeePhone(emp_id, phone)` with primary key (emp_id, phone); the rest stays in `Employee(emp_id, name)`.
```

```quiz
q: Which statements about weak entity sets are **true**? (Select all that apply.)
* A weak entity set has total participation in its identifying relationship
* Its primary key, after mapping to a table, includes the key of the owner entity
- A weak entity set always has a key attribute of its own
- A weak entity set can exist without any owner entity set
explain: A weak entity has only a partial key, so it must be identified through its owner: its key is owner key + partial key, and every weak entity must be related to an owner (total participation).
```

```quiz
q: Two entity sets are in a **1:1** relationship with **total participation on both sides**. What is the minimum number of tables?
answer: 1
verify: 1
explain: Every A has exactly one B and every B has exactly one A, so each pair can be stored as one row of a single merged table.
```
