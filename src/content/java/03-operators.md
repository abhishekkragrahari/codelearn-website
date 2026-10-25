---
title: Operators
chapter: Getting Started
description: Arithmetic, assignment, comparison and logical operators in Java.
---
Operators combine values into new values. Java's operators will look familiar if you have seen C or JavaScript, but Java is stricter about types, which affects division and comparisons.

## Arithmetic

```java
public class Main {
    public static void main(String[] args) {
        int a = 17, b = 5;
        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);      // int / int drops the remainder
        System.out.println(a % b);      // remainder
        System.out.println(a / 5.0);    // one double makes the result a double
        System.out.println(Math.pow(2, 10));
    }
}
```
```output
22
12
85
3
2
3.4
1024.0
```

`Math.pow` always returns a `double`, which is why it prints `1024.0`.

## Assignment and increment

```java
public class Main {
    public static void main(String[] args) {
        int points = 10;
        points += 15;
        points -= 5;
        points *= 3;
        points /= 4;
        points++;
        System.out.println(points);

        int i = 3;
        System.out.println(i++);   // prints 3, then i becomes 4
        System.out.println(++i);   // i becomes 5, then prints 5
    }
}
```
```output
16
3
5
```

## Comparison and logical operators

Comparisons produce a `boolean`. Combine them with `&&` (and), `||` (or) and `!` (not).

```java
public class Main {
    public static void main(String[] args) {
        int marks = 72;
        boolean submitted = true;

        System.out.println(marks >= 40);
        System.out.println(marks == 100);
        System.out.println(marks >= 40 && submitted);
        System.out.println(marks > 90 || !submitted);
    }
}
```
```output
true
false
true
false
```

> **Tip:** `&&` and `||` are **short-circuit** operators. In `a && b`, if `a` is false Java does not even evaluate `b`. This lets you write safe checks such as `name != null && name.length() > 0`.

## Integer overflow

Each numeric type has a limit. Going past it wraps around without any error, so pick `long` when values can get large.

```java
public class Main {
    public static void main(String[] args) {
        int big = Integer.MAX_VALUE;
        System.out.println(big);
        System.out.println(big + 1);
        long safe = big + 1L;
        System.out.println(safe);
    }
}
```
```output
2147483647
-2147483648
2147483648
```
