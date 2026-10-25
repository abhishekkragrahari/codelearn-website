---
title: Tuples and Sets
chapter: Data Structures
description: Fixed groups of values, and collections without duplicates.
---
## Tuples

A **tuple** is like a list that cannot be changed after it is created. It is written with round brackets. Use tuples for small groups of values that belong together, such as coordinates.

```python
point = (3, 4)
print(point[0], point[1])

rgb = (255, 128, 0)
r, g, b = rgb          # unpacking into separate variables
print(f"red={r} green={g} blue={b}")
```
```output
3 4
red=255 green=128 blue=0
```

Functions often return several values as a tuple:

```python
def min_max(values):
    return min(values), max(values)

low, high = min_max([12, 5, 30, 8])
print(low, high)
```
```output
5 30
```

> **Tip:** Unpacking gives a neat way to swap two variables: `a, b = b, a`.

## Sets

A **set** stores unique values with no particular order. Adding a value that is already there does nothing. Sets are written with curly braces.

```python
visits = [3, 1, 3, 2, 1, 3]
unique = set(visits)
print(unique)
print(len(unique))
print(2 in unique)
```
```output
{1, 2, 3}
3
True
```

## Set operations

Sets support the same operations you learned in maths: union, intersection and difference.

```python
python_club = {101, 102, 103, 104}
chess_club = {103, 104, 105}

print(sorted(python_club | chess_club))   # in either club
print(sorted(python_club & chess_club))   # in both clubs
print(sorted(python_club - chess_club))   # only in the Python club
```
```output
[101, 102, 103, 104, 105]
[103, 104]
[101, 102]
```

We wrap each result in `sorted()` because a set does not keep its items in a fixed order; sorting makes the output predictable.

> **Note:** Because sets have no order, you cannot write `my_set[0]`. Convert to a sorted list first if you need positions: `sorted(my_set)`.
