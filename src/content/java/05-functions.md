---
title: Methods
chapter: Functions
description: Write reusable methods with parameters, return values and overloading.
---
In Java a function that belongs to a class is called a **method**. Until you learn about objects, you can write `static` methods and call them directly from `main`.

```java
public class Main {
    static int square(int x) {
        return x * x;
    }

    public static void main(String[] args) {
        System.out.println(square(9));
        System.out.println(square(square(2)));
    }
}
```
```output
81
16
```

The method header lists the **return type** (`int`), the name, and each parameter with its type. A method that returns nothing uses `void`.

## Several parameters

```java
public class Main {
    static double simpleInterest(double principal, double ratePercent, int years) {
        return principal * ratePercent * years / 100;
    }

    static void printReceipt(String item, double amount) {
        System.out.printf("%-10s Rs %8.2f%n", item, amount);
    }

    public static void main(String[] args) {
        double interest = simpleInterest(20000, 7.5, 3);
        printReceipt("Principal", 20000);
        printReceipt("Interest", interest);
        printReceipt("Total", 20000 + interest);
    }
}
```
```output
Principal  Rs 20000.00
Interest   Rs  4500.00
Total      Rs 24500.00
```

> **Tip:** `printf` formats output in columns. `%-10s` means a left-aligned text field 10 characters wide, `%8.2f` a number 8 wide with 2 decimals, and `%n` a newline.

## Overloading

Two methods can share a name if their parameter lists differ. Java picks the right one from the arguments you pass.

```java
public class Main {
    static int add(int a, int b) {
        return a + b;
    }

    static double add(double a, double b) {
        return a + b;
    }

    static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
        System.out.println(add(2, 3));
        System.out.println(add(2.5, 0.25));
        System.out.println(add(1, 2, 3));
    }
}
```
```output
5
2.75
6
```
