---
title: The Data Cube and OLAP Operations
chapter: Data Warehouse Modelling
description: Cuboids and the lattice of the data cube, counting cuboids with and without concept hierarchies, the OLAP operations roll-up, drill-down, slice, dice and pivot, cube materialization, and ROLAP, MOLAP and HOLAP servers, with SQL examples for GATE DA.
---
OLAP (online analytical processing) lets an analyst look at the data cube from different angles and at different levels of detail. This lesson explains the structure of the cube and the operations that move around it.

## Cuboids and the lattice

With n dimensions, the data can be summarised by **any subset** of them. Each subset gives a **cuboid**, a table of aggregated measures:

- the **base cuboid** uses all n dimensions (the most detailed level);
- the **apex cuboid** uses none: a single cell holding the grand total (for example, total revenue), written "all";
- in between are all the other subsets.

With n dimensions and no hierarchies there are **2ⁿ cuboids**. They form a **lattice**: each cuboid can be computed from any cuboid "below" it that has more dimensions.

For dimensions time, item and location (n = 3), the 8 cuboids are: (), (time), (item), (location), (time, item), (time, location), (item, location) and (time, item, location).

### Cuboids with concept hierarchies

If dimension i has a hierarchy with Lᵢ levels (not counting the top level "all"), then each dimension can be at any of Lᵢ + 1 levels, and the number of cuboids is

**T = (L₁ + 1) × (L₂ + 1) × … × (Lₙ + 1)**

For example, time with levels day < month < quarter < year (L = 4), item with name < brand < category (L = 3) and location with city < state < country (L = 3) give 5 × 4 × 4 = **80 cuboids**. With 10 dimensions of 4 levels each, there are 5¹⁰ ≈ 9.8 million cuboids, which is why cubes are not always fully pre-computed.

## OLAP operations

| Operation | What it does | Example |
| --- | --- | --- |
| **Roll-up** (drill-up) | Aggregates to a coarser level, by climbing a hierarchy or removing a dimension | Monthly sales by city → quarterly sales by state |
| **Drill-down** | The reverse: more detail, by going down a hierarchy or adding a dimension | Yearly sales → monthly sales |
| **Slice** | Fixes **one** dimension to a single value, giving a sub-cube with one fewer dimension | Sales for quarter = Q1 only |
| **Dice** | Selects a sub-cube by conditions on **two or more** dimensions | Sales for Q1 or Q2, in Pune or Mumbai, of Electronics |
| **Pivot** (rotate) | Swaps the axes of the view, without changing the data | Rows = items, columns = quarters → rows = quarters, columns = items |

Other operations include **drill-across** (combining several fact tables) and **drill-through** (going from the cube to the underlying relational rows).

In SQL, roll-up is a GROUP BY on fewer or coarser attributes, slice and dice are WHERE conditions, and pivot is the same aggregate laid out with the dimensions exchanged. Many databases have GROUP BY ROLLUP and GROUP BY CUBE to compute several cuboids at once; the program below builds the same results with UNION ALL, which works everywhere.

```sql
CREATE TABLE sales (quarter TEXT, city TEXT, state TEXT, category TEXT, revenue INTEGER);
INSERT INTO sales VALUES
  ('Q1', 'Pune', 'Maharashtra', 'Electronics', 100), ('Q1', 'Mumbai', 'Maharashtra', 'Electronics', 127),
  ('Q1', 'Jaipur', 'Rajasthan', 'Furniture', 24), ('Q2', 'Pune', 'Maharashtra', 'Electronics', 60),
  ('Q2', 'Pune', 'Maharashtra', 'Furniture', 16), ('Q2', 'Jaipur', 'Rajasthan', 'Electronics', 50);

-- Base view: revenue by quarter and city
SELECT quarter, city, SUM(revenue) AS revenue FROM sales GROUP BY quarter, city ORDER BY quarter, city;

-- Roll-up on location: city -> state
SELECT quarter, state, SUM(revenue) AS revenue FROM sales GROUP BY quarter, state ORDER BY quarter, state;

-- Slice: quarter = 'Q1'
SELECT city, category, revenue FROM sales WHERE quarter = 'Q1' ORDER BY city;

-- Dice: Electronics in Maharashtra, both quarters
SELECT quarter, city, revenue FROM sales
WHERE category = 'Electronics' AND state = 'Maharashtra' ORDER BY quarter, city;

-- ROLLUP(quarter, state) built by hand: detail rows, subtotals per quarter, and the grand total
SELECT quarter, state, SUM(revenue) AS revenue FROM sales GROUP BY quarter, state
UNION ALL
SELECT quarter, 'all', SUM(revenue) FROM sales GROUP BY quarter
UNION ALL
SELECT 'all', 'all', SUM(revenue) FROM sales
ORDER BY 1, 2;
```
```output
quarter  city    revenue
-------  ------  -------
Q1       Jaipur  24
Q1       Mumbai  127
Q1       Pune    100
Q2       Jaipur  50
Q2       Pune    76

quarter  state        revenue
-------  -----------  -------
Q1       Maharashtra  227
Q1       Rajasthan    24
Q2       Maharashtra  76
Q2       Rajasthan    50

city    category     revenue
------  -----------  -------
Jaipur  Furniture    24
Mumbai  Electronics  127
Pune    Electronics  100

quarter  city    revenue
-------  ------  -------
Q1       Mumbai  127
Q1       Pune    100
Q2       Pune    60

quarter  state        revenue
-------  -----------  -------
Q1       Maharashtra  227
Q1       Rajasthan    24
Q1       all          251
Q2       Maharashtra  76
Q2       Rajasthan    50
Q2       all          126
all      all          377
```

Each roll-up row is the sum of the detail rows beneath it. This works because SUM is **distributive**; for a holistic measure like MEDIAN, the subtotals could not be computed from the detail aggregates.

## Materializing the cube

There are three strategies for pre-computing cuboids:

- **No materialization**: compute every query from the base data. Uses no extra space, but queries are slow.
- **Full materialization**: pre-compute every cuboid. Queries are fast, but the space can be enormous (every cuboid of the lattice).
- **Partial materialization**: pre-compute a chosen subset (for example, the cuboids most used, or an **iceberg cube** that keeps only cells whose count or measure passes a threshold). This is what real systems do.

A query is answered from the smallest materialized cuboid that contains all the dimensions (at fine enough levels) that the query needs.

## OLAP servers

- **ROLAP** (relational OLAP): stores the data in relational tables (star schemas) and translates OLAP operations into SQL. Scales to very large data.
- **MOLAP** (multidimensional OLAP): stores the cube in multidimensional arrays. Very fast for dense, pre-computed cubes, but less scalable and wasteful for sparse data.
- **HOLAP** (hybrid OLAP): keeps detailed data in a relational store and aggregates in a multidimensional store, combining both.

## Practice questions

```quiz
q: A data cube has 5 dimensions and no concept hierarchies. How many cuboids does it have, including the base and apex cuboids?
answer: 32
verify: 2 ** 5
explain: Each cuboid is a subset of the 5 dimensions, so there are 2⁵ = 32 cuboids.
```

```quiz
q: A cube has three dimensions. Time has the hierarchy day < month < year, product has product < category, and location has city < state < region < country. How many cuboids does the cube have?
answer: 60
verify: (3 + 1) * (2 + 1) * (4 + 1)
explain: The numbers of levels (excluding "all") are 3, 2 and 4. T = (3 + 1)(2 + 1)(4 + 1) = 4 × 3 × 5 = 60.
```

```quiz
q: An analyst moves from viewing sales by **city** to viewing sales by **country**. Which OLAP operation is this?
* Roll-up
- Drill-down
- Slice
- Pivot
explain: Moving up the location hierarchy (city → state → country) aggregates the data to a coarser level: a roll-up.
```

```quiz
q: Selecting the sub-cube "time = Q1" from a 3-dimensional cube (time, item, location) is a:
- Dice, giving a 3-dimensional cube
* Slice, giving a 2-dimensional cube
- Roll-up, giving a 2-dimensional cube
- Pivot, giving a 3-dimensional cube
explain: Fixing one dimension to a single value is a slice; the remaining dimensions, item and location, form a 2-dimensional sub-cube.
```

```quiz
q: In the SQL example, what is the total revenue for quarter Q1, across all states?
answer: 251
verify: 100 + 127 + 24
explain: The Q1 rows have revenues 100 (Pune), 127 (Mumbai) and 24 (Jaipur): 251, the ('Q1', 'all') row of the roll-up.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* MOLAP stores aggregated data in multidimensional arrays
* A query can be answered from any materialized cuboid that includes all the dimensions it needs at fine enough levels
- Full materialization always uses less space than partial materialization
* Pivoting changes the presentation of the data but not its values
explain: MOLAP uses arrays; ROLAP uses relational tables. Coarser cuboids can be computed from finer ones. Full materialization stores every cuboid, so it uses the most space. A pivot only rotates the axes of the view.
```
