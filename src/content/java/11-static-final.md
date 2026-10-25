---
title: static and final
chapter: Methods
description: Understand class-level members, constants, and values that cannot change.
---
Two keywords appear all over Java code: `static` and `final`. They answer two different questions: "does this belong to the class or to each object?" and "can this change?"

## static fields: shared by all objects

An ordinary (instance) field gets a separate copy in every object. A `static` field has **one copy shared by the whole class**.

```java
public class Main {
    public static void main(String[] args) {
        new Visitor("Asha");
        new Visitor("Ravi");
        new Visitor("Meera");
        System.out.println("Total visitors: " + Visitor.count);
    }
}

class Visitor {
    static int count = 0;      // one counter for the class
    String name;               // one name per object

    Visitor(String name) {
        this.name = name;
        count++;
        System.out.println(name + " is visitor #" + count);
    }
}
```
```output
Asha is visitor #1
Ravi is visitor #2
Meera is visitor #3
Total visitors: 3
```

## static methods

A `static` method can be called on the class without creating an object, like `Math.sqrt(16)` or `Integer.parseInt("5")`. Because there is no object, a static method cannot use `this` or instance fields directly.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(MathUtil.square(9));
        System.out.println(MathUtil.isEven(10));
        System.out.println(Math.max(3, 7) + Math.abs(-2));
    }
}

class MathUtil {
    static int square(int x) {
        return x * x;
    }

    static boolean isEven(int x) {
        return x % 2 == 0;
    }
}
```
```output
81
true
9
```

That is also why `main` is `static`: the JVM calls it before any object exists.

## final variables: constants

A `final` variable can be assigned only once. Combined with `static`, it makes a class-wide **constant**, written in `UPPER_SNAKE_CASE` by convention.

```java
public class Main {
    static final double GST_RATE = 0.18;
    static final int MAX_LOGIN_ATTEMPTS = 3;

    public static void main(String[] args) {
        final int base = 1000;
        // base = 2000;   // compile error: cannot assign a value to final variable
        System.out.println(base * (1 + GST_RATE));
        System.out.println("Attempts allowed: " + MAX_LOGIN_ATTEMPTS);

        final int[] marks = {1, 2, 3};
        marks[0] = 99;     // allowed: the array's contents can change
        System.out.println(marks[0]);
    }
}
```
```output
1180.0
Attempts allowed: 3
99
```

`final` on a reference means the variable cannot point to a different object; the object itself can still change unless it is immutable.

## final methods and classes

- A `final` **method** cannot be overridden by a child class.
- A `final` **class** cannot be extended at all. `String` is a final class.

## static blocks

A `static { ... }` block runs once, when the class is first loaded. It is useful for setting up complex static data.

```java
public class Main {
    static final int[] SQUARES = new int[5];

    static {
        for (int i = 0; i < SQUARES.length; i++) {
            SQUARES[i] = i * i;
        }
        System.out.println("static block ran");
    }

    public static void main(String[] args) {
        System.out.println(java.util.Arrays.toString(SQUARES));
    }
}
```
```output
static block ran
[0, 1, 4, 9, 16]
```
