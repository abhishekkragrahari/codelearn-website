---
title: Data Warehouse Modelling - Star, Snowflake and Fact Constellation Schemas
chapter: Data Warehouse Modelling
description: What a data warehouse is, OLTP versus OLAP, the ETL process, the multidimensional model with fact tables, dimensions and measures, star, snowflake and fact constellation schemas, concept hierarchies, and distributive, algebraic and holistic measures, for GATE DA.
---
An operational database records each sale, booking or payment as it happens. To answer questions like "how did sales of each product category change by region over the last three years?", organisations copy that data into a separate **data warehouse**, organised for analysis rather than for updates.

## What is a data warehouse?

A classic definition (Inmon) says a data warehouse is:

- **subject-oriented**: organised around subjects such as customers, products and sales, not around applications;
- **integrated**: data from many sources is cleaned and made consistent (one code for "male", one currency, one date format);
- **time-variant**: it keeps history (years of data), and every record is tied to a time;
- **non-volatile**: data is loaded and read, but not updated in place; old data is not overwritten.

## OLTP versus OLAP

| | OLTP (operational database) | OLAP (data warehouse) |
| --- | --- | --- |
| Purpose | Run the day-to-day business | Analyse and support decisions |
| Users | Clerks, customers, applications | Analysts, managers |
| Typical operation | Short read/write transactions | Long, complex read-only queries |
| Data | Current, detailed | Historical, summarised and detailed |
| Design | Normalised (3NF) to avoid update anomalies | Denormalised (star schema) for fast queries |
| Size | Gigabytes | Terabytes and more |

Data reaches the warehouse through **ETL**: **extract** from the sources, **transform** (clean, integrate, aggregate), and **load** into the warehouse, typically on a schedule (nightly). A **data mart** is a smaller warehouse for one department or subject.

## The multidimensional model

The warehouse views data as a **data cube**:

- **Facts** are the numeric quantities to analyse: units sold, revenue, profit. They are stored in a **fact table**.
- **Dimensions** are the perspectives for analysing them: time, product, store (location), customer. Each dimension has a **dimension table** of descriptive attributes.
- Each row of the fact table holds **foreign keys** to the dimension tables plus the **measures**. The combination of foreign keys identifies the cell of the cube.
- The **grain** of the fact table is what one row represents, for example "one product sold in one store on one day".

## Schemas

### Star schema

One central **fact table** joined directly to one **denormalised table per dimension**. Diagrammed, the dimensions surround the fact table like the points of a star.

```tree
caption: A star schema for sales: every dimension table joins the fact table directly
Sales fact table | time_key, item_key, store_key, units, revenue
  Time dimension | day, month, quarter, year
  Item dimension | name, brand, category
  Store dimension | city, state, country
```

Queries need only **one join per dimension**, which makes them simple and fast. The cost is **redundancy**: in the store dimension, "Maharashtra, India" is repeated for every store in Maharashtra.

### Snowflake schema

A star schema in which some dimension tables are **normalised** into several tables: the store table keeps only a city key, and a separate city table holds the state and country. The diagram branches out like a snowflake.

- Less redundancy and easier maintenance of the dimension tables.
- More joins per query, so it is usually **slower** to query than a star schema. Dimension tables are small compared with the fact table, so the space saved is often small.

### Fact constellation (galaxy schema)

**Several fact tables share dimension tables**: for example, a sales fact table and a shipping fact table both use the time and item dimensions. It models several related business processes at once and is typical of enterprise warehouses.

## Concept hierarchies

A **concept hierarchy** maps low-level values of a dimension to higher-level, more general concepts:

- Time: day < month < quarter < year (and day < week < year: hierarchies need not be a single chain; this kind is a **lattice**).
- Location: street < city < state < country.
- Item: product < brand < category.

Hierarchies can be **schema hierarchies** (defined by the attributes, like city < state) or **set-grouping hierarchies** (defined by ranges of values, like price ranges or age groups, often built by discretization). They are what OLAP roll-up and drill-down move along.

## Measures: distributive, algebraic, holistic

How a measure can be computed from partial results decides how efficiently a cube can be built:

- **Distributive**: the result for the whole equals the same function applied to the results for the parts. **COUNT, SUM, MIN, MAX** (the count of the whole is the sum of the parts' counts).
- **Algebraic**: computable from a bounded number of distributive results. **AVG** = SUM/COUNT, standard deviation (from SUM, SUM of squares and COUNT), min-N/max-N.
- **Holistic**: no constant-size summary of the parts is enough. **MEDIAN, MODE, RANK**. These are hard to pre-compute for large cubes.

## A star schema in SQL

```sql
CREATE TABLE dim_time  (time_key INTEGER PRIMARY KEY, month TEXT, quarter TEXT, year INTEGER);
CREATE TABLE dim_item  (item_key INTEGER PRIMARY KEY, name TEXT, category TEXT);
CREATE TABLE dim_store (store_key INTEGER PRIMARY KEY, city TEXT, state TEXT);
CREATE TABLE fact_sales (time_key INTEGER, item_key INTEGER, store_key INTEGER, units INTEGER, revenue INTEGER);

INSERT INTO dim_time VALUES (1, 'Jan', 'Q1', 2025), (2, 'Feb', 'Q1', 2025), (3, 'Apr', 'Q2', 2025);
INSERT INTO dim_item VALUES (1, 'Laptop', 'Electronics'), (2, 'Phone', 'Electronics'), (3, 'Desk', 'Furniture');
INSERT INTO dim_store VALUES (1, 'Pune', 'Maharashtra'), (2, 'Mumbai', 'Maharashtra'), (3, 'Jaipur', 'Rajasthan');
INSERT INTO fact_sales VALUES
  (1, 1, 1, 2, 100000), (1, 2, 2, 5, 75000), (2, 3, 3, 3, 24000), (2, 1, 2, 1, 52000),
  (3, 2, 1, 4, 60000), (3, 3, 1, 2, 16000), (3, 1, 3, 1, 50000);

-- Revenue by category and quarter: one join per dimension
SELECT i.category, t.quarter, SUM(f.revenue) AS revenue, SUM(f.units) AS units
FROM fact_sales f
JOIN dim_item i ON f.item_key = i.item_key
JOIN dim_time t ON f.time_key = t.time_key
GROUP BY i.category, t.quarter
ORDER BY i.category, t.quarter;

-- Average revenue per sale (an algebraic measure) by state
SELECT s.state, COUNT(*) AS sales, SUM(f.revenue) AS total, ROUND(AVG(f.revenue), 1) AS average
FROM fact_sales f JOIN dim_store s ON f.store_key = s.store_key
GROUP BY s.state;
```
```output
category     quarter  revenue  units
-----------  -------  -------  -----
Electronics  Q1       227000   8
Electronics  Q2       110000   5
Furniture    Q1       24000    3
Furniture    Q2       16000    2

state        sales  total   average
-----------  -----  ------  -------
Maharashtra  5      303000  60600.0
Rajasthan    2      74000   37000.0
```

## Practice questions

```quiz
q: A star schema has a fact table and 4 dimension tables. A query uses attributes from all 4 dimensions. How many joins does it need?
answer: 4
verify: 4
explain: In a star schema every dimension table joins the fact table directly, so the query needs one join per dimension: 4.
```

```quiz
q: Which property of a data warehouse means that data, once loaded, is not updated or deleted in place?
- Subject-oriented
- Integrated
- Time-variant
* Non-volatile
explain: Non-volatile means the warehouse is loaded and queried, but its data is not changed by day-to-day transactions.
```

```quiz
q: Which of these aggregate functions are **algebraic** (but not distributive)? (Select all that apply.)
* AVG
* Standard deviation
- SUM
- MEDIAN
explain: AVG and standard deviation can be computed from a fixed number of distributive values (SUM, COUNT, SUM of squares). SUM itself is distributive. MEDIAN is holistic.
```

```quiz
q: How does a snowflake schema differ from a star schema?
* Some dimension tables are normalised into several related tables
- It has several fact tables sharing dimension tables
- It has no fact table
- Its fact table is normalised into third normal form
explain: Snowflaking normalises dimension tables (store → city → state). Several fact tables sharing dimensions is a fact constellation.
```

```quiz
q: Which statements about OLTP and OLAP are **true**? (Select all that apply.)
* OLTP systems are usually normalised to avoid update anomalies
* OLAP queries usually read large amounts of historical data
- A data warehouse is mainly designed for many short update transactions
* A star schema is denormalised to make analytical queries faster
explain: Operational databases favour normalised designs for frequent updates. Warehouses hold history for complex read-mostly queries, and star schemas trade redundancy for fewer joins.
```
