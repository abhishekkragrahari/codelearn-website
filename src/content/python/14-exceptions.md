---
title: Handling Errors
chapter: Errors and Files
description: Catch exceptions with try and except so your program does not crash.
---
When something goes wrong while a program runs, such as dividing by zero or converting `"abc"` to a number, Python raises an **exception**. If nothing handles it, the program stops with an error message. A `try` / `except` block lets you catch the exception and decide what to do.

```python
try:
    result = 10 / 0
    print("This line is skipped")
except ZeroDivisionError:
    print("You cannot divide by zero.")

print("The program carries on.")
```
```output
You cannot divide by zero.
The program carries on.
```

## Catching different errors

You can have several `except` blocks, one for each kind of error. Add `as e` to get the error object and its message.

```python
def to_number(text):
    try:
        return int(text)
    except ValueError as e:
        print("Bad input:", e)
        return None

print(to_number("42"))
print(to_number("forty-two"))
```
```output
42
Bad input: invalid literal for int() with base 10: 'forty-two'
None
```

## else and finally

The `else` block runs only if no exception happened. The `finally` block always runs, error or not, which makes it the right place for clean-up.

```python
for value in ["8", "0", "x"]:
    try:
        n = 100 / int(value)
    except ZeroDivisionError:
        print(value, "-> division by zero")
    except ValueError:
        print(value, "-> not a number")
    else:
        print(value, "->", n)
    finally:
        print("  checked", value)
```
```output
8 -> 12.5
  checked 8
0 -> division by zero
  checked 0
x -> not a number
  checked x
```

## Raising your own errors

Use `raise` when your code receives something it cannot work with.

```python
def set_age(age):
    if age < 0:
        raise ValueError("age cannot be negative")
    return age

try:
    set_age(-5)
except ValueError as e:
    print("Error:", e)
```
```output
Error: age cannot be negative
```

> **Tip:** Catch the specific exceptions you expect. A bare `except:` hides every error, including typos in your own code, which makes bugs hard to find.
