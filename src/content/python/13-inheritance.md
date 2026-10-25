---
title: Inheritance
chapter: Object-Oriented Programming
description: Build new classes on top of existing ones and override their behaviour.
---
**Inheritance** lets one class reuse the code of another. The new class (the **child**) gets all the attributes and methods of the existing class (the **parent**) and can add or change things.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

    def introduce(self):
        return f"I am {self.name} and I say {self.speak()}"

class Cat(Animal):
    def speak(self):
        return "meow"

class Cow(Animal):
    def speak(self):
        return "moo"

for pet in [Cat("Kitty"), Cow("Gauri"), Animal("Mystery")]:
    print(pet.introduce())
```
```output
I am Kitty and I say meow
I am Gauri and I say moo
I am Mystery and I say ...
```

`Cat` and `Cow` **override** `speak()`, but they reuse `__init__` and `introduce()` from `Animal`. Calling the same method on different types and getting type-specific behaviour is called **polymorphism**.

## Extending the parent with super()

When the child needs extra data, call the parent's constructor with `super()` and then add the new parts.

```python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def yearly_pay(self):
        return self.salary * 12

class Manager(Employee):
    def __init__(self, name, salary, bonus):
        super().__init__(name, salary)
        self.bonus = bonus

    def yearly_pay(self):
        return super().yearly_pay() + self.bonus

e = Employee("Ravi", 50000)
m = Manager("Anita", 80000, 100000)
print(e.name, e.yearly_pay())
print(m.name, m.yearly_pay())
```
```output
Ravi 600000
Anita 1060000
```

## Checking types

`isinstance()` checks whether an object belongs to a class, including any parent class.

```python
class Employee:
    pass

class Manager(Employee):
    pass

e = Employee()
m = Manager()
print(isinstance(m, Manager))
print(isinstance(m, Employee))
print(isinstance(e, Manager))
```
```output
True
True
False
```

A `Manager` **is an** `Employee`, but not every `Employee` is a `Manager`.

> **Tip:** Use inheritance when the child really "is a" kind of the parent. If one object simply "has" another (a car has an engine), store it as an attribute instead.
