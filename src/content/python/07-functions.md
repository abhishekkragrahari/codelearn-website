---
title: Writing Your Own Functions
chapter: Functions
description: Package code into reusable, named pieces with def.
---
A **function** is a named block of code that you can run whenever you need it. You have already used built-in functions like `print()` and `len()`. Now you will write your own with the `def` keyword.

```python
def greet():
    print("Welcome to CodeShala!")

greet()
greet()
```
```output
Welcome to CodeShala!
Welcome to CodeShala!
```

## Parameters and return values

Values passed into a function are called **arguments**; the names that receive them are **parameters**. The `return` statement sends a result back to whoever called the function.

```python
def area_of_rectangle(width, height):
    return width * height

room = area_of_rectangle(4, 3)
print("Room area:", room)
print("Table area:", area_of_rectangle(1.5, 0.8))
```
```output
Room area: 12
Table area: 1.2000000000000002
```

> **Note:** The long number in the last line is not a bug in your code. Computers store decimals in binary, so tiny rounding errors appear. Use `round(value, 2)` when you want a tidy result.

## Default and keyword arguments

A parameter can have a default value, which is used when the caller leaves it out. Callers can also name arguments, which makes the call easier to read.

```python
def make_tea(cups, sugar=1, milk=True):
    kind = "milk tea" if milk else "black tea"
    return f"{cups} cup(s) of {kind} with {sugar} spoon(s) of sugar"

print(make_tea(2))
print(make_tea(1, sugar=0, milk=False))
```
```output
2 cup(s) of milk tea with 1 spoon(s) of sugar
1 cup(s) of black tea with 0 spoon(s) of sugar
```

## Why use functions?

- **Reuse:** write the logic once and call it many times.
- **Readability:** a good name like `area_of_rectangle` explains what the code does.
- **Testing:** small functions are easy to check one at a time.
