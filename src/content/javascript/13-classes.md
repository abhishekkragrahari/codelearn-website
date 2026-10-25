---
title: Classes
chapter: Advanced JavaScript
description: Create objects from blueprints with class, constructor, methods and inheritance.
---
A `class` is a blueprint for creating many objects with the same shape and behaviour. The `constructor` runs when you create an object with `new`.

```javascript
class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  }

  average() {
    const total = this.marks.reduce((a, b) => a + b, 0);
    return total / this.marks.length;
  }

  describe() {
    return `${this.name} averages ${this.average().toFixed(1)}`;
  }
}

const s = new Student("Asha", [88, 92, 79]);
console.log(s.describe());
console.log(s);
```
```output
Asha averages 86.3
Student { name: 'Asha', marks: [ 88, 92, 79 ] }
```

## Getters and private fields

Fields that start with `#` are **private**: they can only be used inside the class. A `get` method looks like a property from outside.

```javascript
class Account {
  #balance = 0;

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.#balance += amount;
    return this;
  }

  get balance() {
    return this.#balance;
  }
}

const acc = new Account("Ravi");
acc.deposit(500).deposit(250);
console.log(acc.owner, acc.balance);
console.log(acc);
```
```output
Ravi 750
Account { owner: 'Ravi' }
```

Returning `this` from `deposit` allows **chaining** calls one after another.

## Inheritance

`extends` creates a child class. Call `super(...)` in the constructor before using `this`.

```javascript
class Shape {
  constructor(name) {
    this.name = name;
  }
  area() {
    return 0;
  }
  toString() {
    return `${this.name} with area ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(r) {
    super("Circle");
    this.r = r;
  }
  area() {
    return Math.PI * this.r ** 2;
  }
}

class Square extends Shape {
  constructor(side) {
    super("Square");
    this.side = side;
  }
  area() {
    return this.side ** 2;
  }
}

for (const shape of [new Circle(1), new Square(3)]) {
  console.log(String(shape));
}
console.log(new Square(2) instanceof Shape);
```
```output
Circle with area 3.14
Square with area 9.00
true
```

## Static methods

A `static` method belongs to the class itself, not to each object. It is often used for helper functions that create objects.

```javascript
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  static fromFahrenheit(f) {
    return new Temperature(((f - 32) * 5) / 9);
  }
}

const t = Temperature.fromFahrenheit(212);
console.log(t.celsius);
```
```output
100
```
