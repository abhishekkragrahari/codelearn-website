---
title: Dictionaries
chapter: Data Structures
description: Store values by name using key-value pairs.
---
A **dictionary** maps **keys** to **values**. Instead of looking items up by position, you look them up by name. Dictionaries are written with curly braces and colons.

```python
student = {"name": "Kabir", "age": 20, "city": "Bhopal"}
print(student["name"])
print(student)
print(len(student))
```
```output
Kabir
{'name': 'Kabir', 'age': 20, 'city': 'Bhopal'}
3
```

## Adding, changing and removing

```python
stock = {"apples": 10, "bananas": 6}
stock["oranges"] = 12        # add a new key
stock["apples"] -= 3         # change a value
del stock["bananas"]         # remove a key
print(stock)

print(stock.get("grapes"))       # missing key gives None
print(stock.get("grapes", 0))    # or a default you choose
```
```output
{'apples': 7, 'oranges': 12}
None
0
```

> **Warning:** `stock["grapes"]` with a missing key raises a `KeyError`. Use `.get()` or check with `"grapes" in stock` first.

## Looping over a dictionary

`.items()` gives you each key and value together.

```python
prices = {"tea": 15, "coffee": 25, "samosa": 12}
for item, price in prices.items():
    print(f"{item:<8} Rs {price}")

print(list(prices.keys()))
print(sum(prices.values()))
```
```output
tea      Rs 15
coffee   Rs 25
samosa   Rs 12
['tea', 'coffee', 'samosa']
52
```

## Counting with a dictionary

A classic use is counting how often things appear.

```python
text = "the cat and the hat and the bat"
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
print(counts)
```
```output
{'the': 3, 'cat': 1, 'and': 2, 'hat': 1, 'bat': 1}
```

Since Python 3.7, dictionaries remember the order in which keys were added.
