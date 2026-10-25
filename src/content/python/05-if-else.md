---
title: Making Decisions with if
chapter: Control Flow
description: Run different code depending on whether a condition is true.
---
Programs often need to choose between actions. The `if` statement runs a block of code only when its condition is `True`.

```python
temperature = 34

if temperature > 30:
    print("It is hot today.")
    print("Drink plenty of water.")

print("Have a nice day!")
```
```output
It is hot today.
Drink plenty of water.
Have a nice day!
```

The indented lines belong to the `if`. The last line is not indented, so it runs every time.

> **Warning:** Indentation matters in Python. Use four spaces for each level and do not mix tabs and spaces.

```flowchart
caption: How the temperature check above runs
start: Start
step: temperature = 34
if: temperature > 30?
  yes:
    io: Print the hot-day tips
end: Print "Have a nice day!"
```

## else and elif

Use `else` for "otherwise", and `elif` (short for "else if") to check more conditions in order. Python runs the first branch whose condition is true and skips the rest.

```python
marks = 72

if marks >= 90:
    grade = "A"
elif marks >= 75:
    grade = "B"
elif marks >= 60:
    grade = "C"
else:
    grade = "D"

print("Grade:", grade)
```
```output
Grade: C
```

## Comparing and combining

Comparison operators give back a `bool`: `==` (equal), `!=` (not equal), `<`, `>`, `<=` and `>=`. Join conditions with `and`, `or` and `not`.

```python
age = 19
has_ticket = True

if age >= 18 and has_ticket:
    print("You may enter.")

if not has_ticket or age < 18:
    print("Sorry, no entry.")
else:
    print("Enjoy the show!")
```
```output
You may enter.
Enjoy the show!
```
