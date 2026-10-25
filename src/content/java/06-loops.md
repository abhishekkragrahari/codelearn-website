---
title: Loops in Java
chapter: Control Flow
description: Repeat code with for, enhanced for, while and do-while.
---
Loops let you run the same code many times. Java's loops look much like C's, plus an extra "for-each" form for collections.

## The for loop

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println("7 x " + i + " = " + (7 * i));
        }
    }
}
```
```output
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
```

## The enhanced for loop

When you just want every item of an array or list, the enhanced `for` loop is shorter and avoids index mistakes.

```java
public class Main {
    public static void main(String[] args) {
        String[] languages = {"Python", "C", "Java", "JavaScript"};
        for (String lang : languages) {
            System.out.println(lang + " has " + lang.length() + " letters");
        }
    }
}
```
```output
Python has 6 letters
C has 1 letters
Java has 4 letters
JavaScript has 10 letters
```

## while and do-while

A `while` loop checks first; a `do-while` loop runs once before checking.

```java
public class Main {
    public static void main(String[] args) {
        int n = 27;
        int steps = 0;
        while (n != 1) {
            n = (n % 2 == 0) ? n / 2 : 3 * n + 1;
            steps++;
        }
        System.out.println("Reached 1 after " + steps + " steps");

        int tries = 0;
        do {
            tries++;
        } while (tries < 3);
        System.out.println("tries = " + tries);
    }
}
```
```output
Reached 1 after 111 steps
tries = 3
```

## break and continue

```java
public class Main {
    public static void main(String[] args) {
        int[] readings = {12, -1, 15, 999, 8};
        int sum = 0;
        for (int r : readings) {
            if (r < 0) continue;   // ignore bad readings
            if (r == 999) break;   // 999 marks the end
            sum += r;
        }
        System.out.println("Sum = " + sum);
    }
}
```
```output
Sum = 27
```
