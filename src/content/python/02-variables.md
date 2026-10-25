---
title: Variables and Data Types
chapter: Getting Started
description: Store values in named boxes and meet Python's basic types.
---
A **variable** is a name that refers to a value. You create one with the `=` sign. There is no need to say what type of value it holds; Python works that out for you.

```python
city = "Pune"
population = 7_400_000
area_km2 = 331.3
is_capital = False

print(city, population, area_km2, is_capital)
```
```output
Pune 7400000 331.3 False
```

> **Note:** Underscores inside a number, as in `7_400_000`, are only there to make it easier to read. Python ignores them.

## The basic types

Every value has a type. You can ask for it with the `type()` function.

```python
print(type("hello"))
print(type(42))
print(type(3.14))
print(type(True))
```
```output
<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>
```

- `str` holds text.
- `int` holds whole numbers of any size.
- `float` holds numbers with a decimal point.
- `bool` is either `True` or `False`.

## Changing and converting values

A variable can be given a new value at any time. You can also turn one type into another with functions such as `int()`, `float()` and `str()`.

```python
score = 10
score = score + 5
print("Score:", score)

age_text = "21"
age = int(age_text)
print(age + 1)

price = 49.99
print("Price is " + str(price) + " rupees")
```
```output
Score: 15
22
Price is 49.99 rupees
```

## f-strings

Putting an `f` before a string lets you place variables straight inside it using curly braces. This is usually the neatest way to build a message.

```python
name = "Meera"
marks = 87.456
print(f"{name} scored {marks:.1f} marks")
```
```output
Meera scored 87.5 marks
```

The `:.1f` part means "show one digit after the decimal point".
