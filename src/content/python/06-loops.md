---
title: Repeating Code with Loops
chapter: Control Flow
description: Use for and while loops to do the same work many times.
---
A **loop** repeats a block of code. Python has two kinds: `for` loops, which go through a collection of items, and `while` loops, which keep going as long as a condition is true.

## The for loop

`range(n)` produces the numbers from `0` up to, but not including, `n`. It is the usual way to repeat something a fixed number of times.

```python
for i in range(5):
    print("Round", i)
```
```output
Round 0
Round 1
Round 2
Round 3
Round 4
```

A `for` loop can also walk through a list, a string, or any other collection.

```python
fruits = ["mango", "banana", "guava"]
for fruit in fruits:
    print(fruit.upper())

for letter in "abc":
    print(letter * 3)
```
```output
MANGO
BANANA
GUAVA
aaa
bbb
ccc
```

## The while loop
```flowchart
caption: How the interest example below runs
start: Start
step: balance = 1000, years = 0
while: balance < 2000?
  step: balance = balance * 1.1
  step: years += 1
io: Print years
end: End
```


A `while` loop checks its condition before every round. Make sure something inside the loop changes so that the condition eventually becomes false.

```python
balance = 1000
years = 0
while balance < 2000:
    balance = balance * 1.1
    years += 1
print(f"It takes {years} years to double at 10% interest.")
```
```output
It takes 8 years to double at 10% interest.
```

## break and continue

`break` leaves the loop straight away. `continue` skips the rest of the current round and moves on to the next one.

```python
for n in range(1, 10):
    if n % 2 == 0:
        continue   # skip even numbers
    if n > 7:
        break      # stop once we pass 7
    print(n)
```
```output
1
3
5
7
```
