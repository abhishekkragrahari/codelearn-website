---
title: Input and Output
chapter: Getting Started
description: Read what the user types with input() and format your output neatly.
---
Programs become far more useful when they react to the person using them. The `input()` function pauses the program, waits for the user to type something and press Enter, and gives back what they typed as a string.

```python
name = input("What is your name? ")
print("Nice to meet you,", name)
```

A sample run looks like this (the user typed `Riya`):

```text
What is your name? Riya
Nice to meet you, Riya
```

> **Warning:** `input()` always returns a **string**, even if the user types a number. Convert it with `int()` or `float()` before doing maths.

```python
age = int(input("Your age: "))
print("Next year you will be", age + 1)
```

## Controlling print()

`print()` has two useful options. `sep` sets what goes between values, and `end` sets what goes at the end instead of a new line.

```python
print("2026", "10", "25", sep="-")
print("Loading", end="")
print("...", end="")
print(" done")
```
```output
2026-10-25
Loading... done
```

## Formatting numbers

Inside an f-string you can add a format after a colon. This is the easiest way to line up tables and control decimals.

```python
item = "Pen"
price = 12.5
qty = 4

print(f"{item:<8}|{qty:>4}|{price * qty:>8.2f}")
print(f"{'Total':<8}|{'':>4}|{50:>8.2f}")
print(f"Progress: {0.756:.1%}")
print(f"Big number: {1234567:,}")
```
```output
Pen     |   4|   50.00
Total   |    |   50.00
Progress: 75.6%
Big number: 1,234,567
```

- `<8` means left-align in 8 characters, `>4` means right-align in 4.
- `.2f` means two decimal places.
- `.1%` turns a fraction into a percentage.
- `,` adds thousands separators.
