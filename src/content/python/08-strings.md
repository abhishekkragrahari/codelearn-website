---
title: Working with Strings
chapter: Data Structures
description: Index, slice, search and transform text.
---
A string is a sequence of characters. You can look at single characters by their position, called an **index**, starting from 0. Negative indexes count from the end.

```python
word = "Python"
print(word[0])
print(word[5])
print(word[-1])
print(len(word))
```
```output
P
n
n
6
```

## Slicing

`text[start:stop]` gives the part from `start` up to, but not including, `stop`. Leave out either number to go from the beginning or to the end.

```python
s = "Hello, world"
print(s[0:5])
print(s[7:])
print(s[:5])
print(s[::-1])   # a step of -1 reverses the string
```
```output
Hello
world
Hello
dlrow ,olleH
```

## Useful string methods

Strings come with many built-in methods. None of them change the original string; they return a new one.

```python
title = "  learning python is fun  "
print(title.strip())
print(title.strip().title())
print(title.upper().strip())
print(title.count("n"))
print(title.replace("fun", "useful").strip())
print("python" in title)
```
```output
learning python is fun
Learning Python Is Fun
LEARNING PYTHON IS FUN
4
learning python is useful
True
```

## Splitting and joining

`split()` breaks a string into a list of pieces, and `join()` glues a list back together.

```python
csv_line = "Asha,21,Pune"
parts = csv_line.split(",")
print(parts)

words = ["code", "every", "day"]
print(" ".join(words))
print("-".join(words).upper())
```
```output
['Asha', '21', 'Pune']
code every day
CODE-EVERY-DAY
```

> **Note:** Strings are **immutable**: you cannot change a character in place. `word[0] = "J"` raises an error. Build a new string instead, for example `"J" + word[1:]`.
