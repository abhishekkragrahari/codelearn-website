---
title: Operators
chapter: Getting Started
description: Do arithmetic, compare values and combine conditions.
---
An **operator** is a symbol that does something with values. You have already seen `+` and `=`. Python has a few more that are worth knowing early.

## Arithmetic operators

```python
a = 17
b = 5

print(a + b)    # addition
print(a - b)    # subtraction
print(a * b)    # multiplication
print(a / b)    # division always gives a float
print(a // b)   # floor division drops the decimals
print(a % b)    # remainder (modulo)
print(a ** 2)   # power
```
```output
22
12
85
3.4
3
2
289
```

> **Tip:** `%` is handy for checking whether a number is even: `n % 2 == 0` is `True` for even numbers.

## Assignment shortcuts

Instead of writing `x = x + 3`, you can write `x += 3`. The same works for the other arithmetic operators.

```python
steps = 100
steps += 50
steps -= 20
steps *= 2
print(steps)
```
```output
260
```

## Comparison operators

Comparisons answer a yes-or-no question, so they always give a `bool`.

```python
print(10 == 10)
print(10 != 7)
print(3 < 8 <= 8)   # Python lets you chain comparisons
print("apple" < "banana")
```
```output
True
True
True
True
```

Strings are compared letter by letter, in dictionary order.

## Logical operators

`and` is true only when both sides are true. `or` is true when at least one side is. `not` flips a value.

```python
is_weekend = True
is_raining = False

print(is_weekend and not is_raining)
print(is_weekend or is_raining)
print(not is_weekend)
```
```output
True
True
False
```

## Order of operations

Python follows the usual maths rules: brackets first, then `**`, then `*`, `/`, `//`, `%`, and finally `+` and `-`. When in doubt, add brackets. They also make code easier to read.

```python
print(2 + 3 * 4)
print((2 + 3) * 4)
print(-2 ** 2)
```
```output
14
20
-4
```

The last line surprises many people: `**` happens before the minus sign, so it means `-(2 ** 2)`.
