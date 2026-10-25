---
title: Classes and Objects
chapter: Object-Oriented Programming
description: Bundle data and behaviour together by defining your own types.
---
So far you have used types that Python provides: `str`, `list`, `dict`. A **class** lets you create your own type. An **object** is one value made from that class, just as `"hi"` is one object of the `str` class.

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name} says woof!"

rex = Dog("Rex", 3)
tommy = Dog("Tommy", 5)
print(rex.bark())
print(tommy.name, tommy.age)
```
```output
Rex says woof!
Tommy 5
```

- `__init__` is the **constructor**. It runs automatically when you create an object and sets up its data.
- `self` refers to the object the method is working on.
- Values stored on `self`, such as `self.name`, are called **attributes**.
- Functions defined inside a class are called **methods**.

## Changing an object's state

Methods can read and update the object's attributes.

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            print("Not enough money!")
            return
        self.balance -= amount

acc = BankAccount("Meera", 1000)
acc.deposit(500)
acc.withdraw(2000)
acc.withdraw(300)
print(acc.owner, acc.balance)
```
```output
Not enough money!
Meera 1200
```

## A readable printout with __str__

By default, printing an object shows something like `<__main__.Point object at 0x...>`. Define `__str__` to control what `print()` shows.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def distance_from_origin(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

    def __str__(self):
        return f"Point({self.x}, {self.y})"

p = Point(3, 4)
print(p)
print(p.distance_from_origin())
```
```output
Point(3, 4)
5.0
```
