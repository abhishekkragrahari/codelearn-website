---
title: Data Warehousing GATE Practice Set
chapter: GATE Practice
description: Mixed GATE DA style questions on attribute types, normalization, discretization, sampling, warehouse schemas, measures, cuboids and OLAP operations, with answers and explanations.
---
These questions mix every topic in this track, in the GATE formats **MCQ**, **MSQ** and **NAT**. Each numerical answer is recomputed by a program when the site is built. For the database part of the GATE DA syllabus (ER model, relational algebra, tuple calculus, SQL, integrity constraints, normal forms, file organization and indexing), see the [DBMS track](../dbms/index.html).

## Data preparation

```quiz
q: **[Normalization]** The values of an attribute lie between 200 and 1000. They are min-max normalized to the range [−1, 1]. What does 800 become?
answer: 0.5
verify: (800 - 200) / (1000 - 200) * (1 - (-1)) + (-1)
explain: v′ = (800 − 200)/(1000 − 200) × (1 − (−1)) + (−1) = 0.75 × 2 − 1 = 0.5.
```

```quiz
q: **[z-score]** After z-score normalization, an attribute's value 130 became 1.5. The attribute's standard deviation is 20. What is its mean?
answer: 100
verify: 130 - 1.5 * 20
explain: z = (v − μ)/σ gives 1.5 = (130 − μ)/20, so μ = 130 − 30 = 100.
```

```quiz
q: **[Binning]** The sorted values 4, 8, 15, 21, 21, 24, 25, 28, 34 are split into 3 equal-frequency bins and smoothed by **bin means**. What value replaces 25?
answer: 29
verify:
  vals = [4, 8, 15, 21, 21, 24, 25, 28, 34]
  b3 = vals[6:9]
  print(round(sum(b3) / len(b3), 4))
explain: The bins are {4, 8, 15}, {21, 21, 24} and {25, 28, 34}. The third bin's mean is 87/3 = 29, so 25 becomes 29.
```

```quiz
q: **[Attribute types]** Which pairs are correctly matched? (Select all that apply.)
* Blood group (A, B, AB, O): nominal
* Movie rating (1 to 5 stars): ordinal
- Calendar year: ratio
* Weight in kilograms: ratio
explain: Blood groups have no order. Star ratings are ordered but the gaps are not equal in meaning. Year 0 is not "no time", so calendar years are interval-scaled. Weight has a true zero.
```

## Warehouse modelling and OLAP

```quiz
q: **[Cuboids]** A cube has 4 dimensions. Two have no hierarchy, one has a 2-level hierarchy and one has a 3-level hierarchy (levels exclude "all"). How many cuboids are there?
answer: 48
verify: (1 + 1) * (1 + 1) * (2 + 1) * (3 + 1)
explain: A dimension without a hierarchy has 1 level. T = (1 + 1)(1 + 1)(2 + 1)(3 + 1) = 2 × 2 × 3 × 4 = 48.
```

```quiz
q: **[Cube size]** A base cuboid has dimensions time (12 months), item (50 items) and store (20 stores). What is the largest possible number of cells in the base cuboid?
answer: 12000
verify: 12 * 50 * 20
explain: Each cell is a combination of one value from each dimension: 12 × 50 × 20 = 12,000 cells. Real cubes are usually sparse, with many empty cells.
```

```quiz
q: **[Measures]** Which of these measures is **holistic**?
- COUNT
- MAX
- AVG
* MEDIAN
explain: COUNT and MAX are distributive and AVG is algebraic (SUM/COUNT). The median of the whole cannot be computed from a bounded summary of the parts, so it is holistic.
```

```quiz
q: **[OLAP]** An analyst views revenue by (quarter, category) and changes the view to revenue by (month, category). Which operation was performed?
- Roll-up
* Drill-down
- Slice
- Dice
explain: Going from quarter to month moves down the time hierarchy to more detail: drill-down.
```

```quiz
q: **[OLAP]** Which operations produce a sub-cube by selecting values, rather than by changing the level of aggregation? (Select all that apply.)
* Slice
* Dice
- Roll-up
- Drill-down
explain: Slice and dice select part of the cube (on one or several dimensions). Roll-up and drill-down change the level of detail.
```

```quiz
q: **[Schemas]** Which statements are **true**? (Select all that apply.)
* A fact constellation has more than one fact table
* In a star schema, dimension tables are typically denormalised
- A snowflake schema usually needs fewer joins than a star schema
* The fact table holds foreign keys to the dimension tables and the measures
explain: A galaxy schema shares dimensions among several fact tables. Star schemas keep each dimension in one wide table. Snowflaking normalises dimensions, which adds joins. Fact rows are keys plus numeric measures.
```
