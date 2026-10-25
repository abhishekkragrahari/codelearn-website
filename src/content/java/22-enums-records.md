---
title: Enums and Records
chapter: Object-Oriented Programming
description: Model fixed sets of values with enum, and simple data carriers with record.
---
## Enums

An **enum** is a type with a fixed set of named values, such as days of the week or the states of an order. Using an enum instead of strings or numbers lets the compiler catch typos and invalid values.

```java
public class Main {
    public static void main(String[] args) {
        Level current = Level.MEDIUM;
        System.out.println(current);
        System.out.println(current.ordinal());          // position, from 0
        System.out.println(Level.valueOf("HIGH"));

        for (Level l : Level.values()) {
            System.out.print(l + " ");
        }
        System.out.println();

        switch (current) {
            case LOW -> System.out.println("Relax");
            case MEDIUM -> System.out.println("Pay attention");
            case HIGH -> System.out.println("Act now!");
        }
    }
}

enum Level { LOW, MEDIUM, HIGH }
```
```output
MEDIUM
1
HIGH
LOW MEDIUM HIGH 
Pay attention
```

## Enums with fields and methods

Enums are full classes: each constant can carry data, and the enum can have a constructor and methods.

```java
public class Main {
    public static void main(String[] args) {
        for (Planet p : Planet.values()) {
            System.out.printf("%-8s %6.2f kg%n", p, p.weightOf(60));
        }
    }
}

enum Planet {
    MERCURY(0.38), EARTH(1.0), MARS(0.38), JUPITER(2.53);

    private final double gravity;     // relative to Earth

    Planet(double gravity) {
        this.gravity = gravity;
    }

    double weightOf(double earthKg) {
        return earthKg * gravity;
    }
}
```
```output
MERCURY   22.80 kg
EARTH     60.00 kg
MARS      22.80 kg
JUPITER  151.80 kg
```

## Records

Many classes exist only to hold some data. Writing the fields, constructor, getters, `equals`, `hashCode` and `toString` by hand is long and error prone. A **record** (Java 16+) generates all of that from one line.

```java
public class Main {
    public static void main(String[] args) {
        Student a = new Student("Asha", 21, 9.1);
        Student b = new Student("Asha", 21, 9.1);

        System.out.println(a);
        System.out.println(a.name() + " is " + a.age());   // accessors, not getName()
        System.out.println(a.equals(b));
        System.out.println(a.hashCode() == b.hashCode());
    }
}

record Student(String name, int age, double cgpa) { }
```
```output
Student[name=Asha, age=21, cgpa=9.1]
Asha is 21
true
true
```

Records are **immutable**: their fields are `final`, and there are no setters.

## Validation and methods in a record

A record can have a compact constructor for validation, and its own methods.

```java
public class Main {
    public static void main(String[] args) {
        Range r = new Range(10, 20);
        System.out.println(r.length() + " " + r.contains(15));
        try {
            new Range(5, 1);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

record Range(int start, int end) {
    Range {
        if (start > end) throw new IllegalArgumentException("start must be <= end");
    }

    int length() { return end - start; }

    boolean contains(int x) { return x >= start && x <= end; }
}
```
```output
10 true
Error: start must be <= end
```

> **Tip:** Use an enum when the set of values is known in advance and fixed. Use a record when you need many different values of a simple data shape.
