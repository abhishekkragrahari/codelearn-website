---
title: Variables and Data Types
chapter: Getting Started
description: Primitive types, String, type conversion and the var keyword.
---
Every Java variable has a type, written before its name. The compiler checks that you only store values of that type in it, which catches many mistakes before the program ever runs.

```java
public class Main {
    public static void main(String[] args) {
        int age = 20;
        double cgpa = 8.7;
        char section = 'B';
        boolean isEnrolled = true;
        String name = "Kabir";

        System.out.println(name + " is " + age + " years old.");
        System.out.println("CGPA: " + cgpa + ", section " + section);
        System.out.println("Enrolled? " + isEnrolled);
    }
}
```
```output
Kabir is 20 years old.
CGPA: 8.7, section B
Enrolled? true
```

## Primitive types and String

- `int` and `long` store whole numbers (`long` for very big ones).
- `double` stores decimals.
- `char` stores one character in single quotes.
- `boolean` is `true` or `false`.
- `String` (capital S) stores text in double quotes. It is a class, not a primitive, so it comes with useful methods.

```java
public class Main {
    public static void main(String[] args) {
        String word = "Programming";
        System.out.println(word.length());
        System.out.println(word.toUpperCase());
        System.out.println(word.substring(0, 7));
        System.out.println(word.contains("gram"));
    }
}
```
```output
11
PROGRAMMING
Program
true
```

## Converting between types

Java converts a smaller type to a larger one automatically, but going the other way needs an explicit **cast**. To turn text into a number, use `Integer.parseInt` or `Double.parseDouble`.

```java
public class Main {
    public static void main(String[] args) {
        int items = 7;
        double perPerson = items / 2.0;      // int widened to double
        int rounded = (int) perPerson;        // cast drops the decimals
        int fromText = Integer.parseInt("250");

        System.out.println(perPerson);
        System.out.println(rounded);
        System.out.println(fromText * 2);
    }
}
```
```output
3.5
3
500
```

## var and final

Inside a method you can write `var` and let the compiler work out the type from the value. Mark a variable `final` when it must never be reassigned.

```java
public class Main {
    public static void main(String[] args) {
        var city = "Jaipur";          // compiler infers String
        final double GST_RATE = 0.18;
        double bill = 500 * (1 + GST_RATE);
        System.out.println(city + " bill: " + bill);
    }
}
```
```output
Jaipur bill: 590.0
```
