---
title: Lists
chapter: Data Structures
description: Store an ordered collection of items and change it as you go.
---
A **list** holds several values in order, inside square brackets. Lists can grow, shrink and change, which makes them Python's most used collection.

```python
marks = [78, 92, 65]
print(marks)
print(marks[0], marks[-1])
print(len(marks))
```
```output
[78, 92, 65]
78 65
3
```

## Changing a list

```python
tasks = ["read", "code"]
tasks.append("sleep")         # add to the end
tasks.insert(0, "wake up")    # add at a position
tasks[2] = "write code"       # replace an item
print(tasks)

tasks.remove("read")          # remove by value
last = tasks.pop()            # remove and return the last item
print(tasks, last)
```
```output
['wake up', 'read', 'write code', 'sleep']
['wake up', 'write code'] sleep
```

## Sorting and searching

```python
nums = [42, 7, 19, 7, 88]
print(sorted(nums))           # new sorted list
print(max(nums), min(nums), sum(nums))
print(nums.count(7), nums.index(19))

nums.sort(reverse=True)       # sorts the list itself
print(nums)
```
```output
[7, 7, 19, 42, 88]
88 7 163
2 2
[88, 42, 19, 7, 7]
```

## List comprehensions

A **list comprehension** builds a new list from an existing one in a single line. Read it as "give me this expression, for each item, if a condition holds".

```python
numbers = range(1, 11)
squares = [n * n for n in numbers]
evens = [n for n in numbers if n % 2 == 0]
print(squares)
print(evens)
```
```output
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
[2, 4, 6, 8, 10]
```

> **Warning:** `b = a` does not copy a list; both names point to the same list. Use `b = a.copy()` when you need an independent copy.
