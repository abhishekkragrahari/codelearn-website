---
title: Inheritance
chapter: Object-Oriented Programming
description: Extend classes, override methods and use polymorphism.
---
**Inheritance** lets a class build on another class. The child class uses the `extends` keyword and automatically gets the parent's fields and methods. It can then add new ones or **override** existing ones.

```tree
caption: Bicycle and Truck inherit everything from Vehicle
Vehicle | name, wheels, info()
  Bicycle | 2 wheels
  Truck | adds loadTons, overrides info()
```

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(new Bicycle().info());
        System.out.println(new Truck(10).info());
    }
}

class Vehicle {
    protected String name;
    protected int wheels;

    Vehicle(String name, int wheels) {
        this.name = name;
        this.wheels = wheels;
    }

    String info() {
        return name + " has " + wheels + " wheels";
    }
}

class Bicycle extends Vehicle {
    Bicycle() {
        super("Bicycle", 2);      // call the parent constructor
    }
}

class Truck extends Vehicle {
    private final int loadTons;

    Truck(int loadTons) {
        super("Truck", 6);
        this.loadTons = loadTons;
    }

    @Override
    String info() {
        return super.info() + " and carries " + loadTons + " tons";
    }
}
```
```output
Bicycle has 2 wheels
Truck has 6 wheels and carries 10 tons
```

- `super(...)` calls the parent's constructor and must be the first line.
- `super.info()` calls the parent's version of an overridden method.
- `protected` fields are visible to child classes.
- `@Override` asks the compiler to check that you really are overriding a parent method.

## Polymorphism

A variable of the parent type can hold any child object. When you call a method, Java runs the version that belongs to the actual object.

```java
public class Main {
    public static void main(String[] args) {
        Shape[] shapes = {new Circle(1), new Rectangle(3, 4), new Circle(2)};
        double total = 0;
        for (Shape s : shapes) {
            System.out.printf("%-10s %.2f%n", s.name(), s.area());
            total += s.area();
        }
        System.out.printf("total      %.2f%n", total);
    }
}

class Shape {
    double area() { return 0; }
    String name() { return "shape"; }
}

class Circle extends Shape {
    private final double r;
    Circle(double r) { this.r = r; }
    @Override double area() { return Math.PI * r * r; }
    @Override String name() { return "circle"; }
}

class Rectangle extends Shape {
    private final double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    @Override double area() { return w * h; }
    @Override String name() { return "rectangle"; }
}
```
```output
circle     3.14
rectangle  12.00
circle     12.57
total      27.71
```

## Abstract classes

The plain `Shape` above has a meaningless `area()` of 0. Marking the class `abstract` lets you declare a method without a body, and forces every child to provide one. You cannot create an object of an abstract class directly.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(new Dog().speak());
        System.out.println(new Cat().speak());
    }
}

abstract class Animal {
    abstract String sound();
    String speak() { return getClass().getSimpleName() + " says " + sound(); }
}

class Dog extends Animal { String sound() { return "woof"; } }

class Cat extends Animal { String sound() { return "meow"; } }
```
```output
Dog says woof
Cat says meow
```

> **Note:** A Java class can extend only one parent class. To share behaviour across unrelated classes, use interfaces, covered in the Interfaces lesson.
