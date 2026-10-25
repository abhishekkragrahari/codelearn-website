---
title: Type Casting and Wrapper Classes
chapter: Getting Started
description: Convert between numeric types, and use Integer, Double and friends.
---
Java is strict about types, but it lets you convert values from one type to another. Some conversions happen automatically; others need an explicit **cast**.

## Widening (automatic)

Converting a smaller type to a larger one is always safe, so Java does it for you:
`byte → short → int → long → float → double`.

```java
public class Main {
    public static void main(String[] args) {
        int apples = 12;
        long bigger = apples;        // int to long
        double precise = bigger;     // long to double
        System.out.println(bigger);
        System.out.println(precise);

        char letter = 'A';
        int code = letter;           // a char is stored as a number
        System.out.println(code);
    }
}
```
```output
12
12.0
65
```

## Narrowing (explicit cast)

Going to a smaller type can lose information, so you must write the target type in brackets.

```java
public class Main {
    public static void main(String[] args) {
        double price = 99.99;
        int rupees = (int) price;            // decimals are cut off, not rounded
        System.out.println(rupees);
        System.out.println(Math.round(price)); // rounds instead

        int big = 300;
        byte small = (byte) big;             // byte holds -128..127, so it wraps
        System.out.println(small);

        System.out.println((char) 66);
    }
}
```
```output
99
100
44
B
```

## Type promotion in expressions

In arithmetic, `byte`, `short` and `char` are promoted to `int`, and if any operand is `long`, `float` or `double`, the whole expression becomes that type.

```java
public class Main {
    public static void main(String[] args) {
        byte a = 10, b = 20;
        int sum = a + b;               // a + b is an int, not a byte
        System.out.println(sum);
        System.out.println(7 / 2);     // int / int
        System.out.println(7 / 2.0);   // int / double
        System.out.println('a' + 1);   // char promoted to int
        System.out.println((char) ('a' + 1));
    }
}
```
```output
30
3
3.5
98
b
```

## Wrapper classes and autoboxing

Each primitive has a matching **wrapper class**: `int → Integer`, `double → Double`, `char → Character`, `boolean → Boolean`, and so on. Collections such as `ArrayList` can only hold objects, so wrappers are needed there. Java converts automatically: this is called **autoboxing** (primitive to object) and **unboxing** (object to primitive).

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Integer boxed = 42;                  // autoboxing
        int plain = boxed + 8;               // unboxing
        System.out.println(plain);

        ArrayList<Double> temps = new ArrayList<>();
        temps.add(31.5);                     // double boxed to Double
        System.out.println(temps);

        System.out.println(Integer.parseInt("123") + 1);
        System.out.println(Double.parseDouble("2.5") * 2);
        System.out.println(Integer.toBinaryString(10));
        System.out.println(Integer.MAX_VALUE);
        System.out.println(Character.isDigit('7'));
        System.out.println(String.valueOf(3.14) + "!");
    }
}
```
```output
50
[31.5]
124
5.0
1010
2147483647
true
3.14!
```

> **Warning:** Compare wrapper objects with `.equals()`, not `==`. Java caches small `Integer` values (-128 to 127), so `==` may appear to work for small numbers and then fail for larger ones.

```java
public class Main {
    public static void main(String[] args) {
        Integer a = 127, b = 127;
        Integer c = 1000, d = 1000;
        System.out.println(a == b);
        System.out.println(c == d);
        System.out.println(c.equals(d));
    }
}
```
```output
true
false
true
```
