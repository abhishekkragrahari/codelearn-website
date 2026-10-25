---
title: The Object Class
chapter: Object-Oriented Programming
description: toString, equals and hashCode, the methods every Java class inherits.
---
Every class in Java extends `java.lang.Object`, directly or indirectly, even if you never write `extends`. That means every object has a few methods inherited from `Object`. The three you will override most often are `toString`, `equals` and `hashCode`.

```tree
caption: Every class sits somewhere below Object
Object | toString, equals, hashCode, getClass
  String
  Integer
  Student | your own classes
    Topper
```

## toString

`toString()` returns a text form of the object. It is called automatically when you print an object or join it with a string. The inherited version prints the class name and a hash code, such as `Book@1b6d3586`, which is rarely useful.

```java
public class Main {
    public static void main(String[] args) {
        Book b = new Book("Wings of Fire", 1999);
        System.out.println(b);
        System.out.println("Reading: " + b);
    }
}

class Book {
    private final String title;
    private final int year;

    Book(String title, int year) {
        this.title = title;
        this.year = year;
    }

    @Override
    public String toString() {
        return title + " (" + year + ")";
    }
}
```
```output
Wings of Fire (1999)
Reading: Wings of Fire (1999)
```

## equals: comparing contents

`==` checks whether two references point to the **same object**. `equals()` should check whether two objects are **meaningfully equal**. The inherited version behaves just like `==`, so override it for value-like classes.

```java
import java.util.Objects;

public class Main {
    public static void main(String[] args) {
        Point a = new Point(2, 3);
        Point b = new Point(2, 3);
        Point c = a;

        System.out.println(a == b);       // different objects
        System.out.println(a.equals(b));  // same contents
        System.out.println(a == c);       // same object
    }
}

class Point {
    private final int x, y;

    Point(int x, int y) { this.x = x; this.y = y; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Point other)) return false;
        return x == other.x && y == other.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }
}
```
```output
false
true
true
```

## hashCode: the equals contract

Hash-based collections such as `HashSet` and `HashMap` first use `hashCode()` to find the right bucket, then `equals()` to compare. So Java has a rule: **if two objects are equal, they must have the same hash code**. Override both together, or neither.

```java
import java.util.HashSet;
import java.util.Objects;

public class Main {
    public static void main(String[] args) {
        HashSet<Point> visited = new HashSet<>();
        visited.add(new Point(1, 1));
        visited.add(new Point(1, 1));     // equal to the first, so not added again
        visited.add(new Point(2, 5));
        System.out.println(visited.size());
        System.out.println(visited.contains(new Point(2, 5)));

        HashSet<NoHashPoint> broken = new HashSet<>();
        broken.add(new NoHashPoint(1, 1));
        broken.add(new NoHashPoint(1, 1));
        System.out.println(broken.size());   // 2: the set cannot tell they are equal
    }
}

class Point {
    final int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
    @Override public boolean equals(Object o) {
        return o instanceof Point p && p.x == x && p.y == y;
    }
    @Override public int hashCode() { return Objects.hash(x, y); }
}

class NoHashPoint {
    final int x, y;
    NoHashPoint(int x, int y) { this.x = x; this.y = y; }
    @Override public boolean equals(Object o) {
        return o instanceof NoHashPoint p && p.x == x && p.y == y;
    }
    // hashCode() not overridden: equal objects get different hash codes
}
```
```output
2
true
2
```

## getClass

`getClass()` tells you the real class of an object at run time.

```java
public class Main {
    public static void main(String[] args) {
        Object[] things = {"text", 42, 3.14, new int[0]};
        for (Object t : things) {
            System.out.println(t.getClass().getSimpleName());
        }
    }
}
```
```output
String
Integer
Double
int[]
```

> **Tip:** For simple data classes, a `record` (see the Enums and Records lesson) generates `toString`, `equals` and `hashCode` for you.
