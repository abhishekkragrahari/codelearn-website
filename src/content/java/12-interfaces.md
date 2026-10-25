---
title: Interfaces
chapter: Object-Oriented Programming
description: Define contracts that many unrelated classes can implement.
---
An **interface** lists methods that a class promises to provide, without saying how. A class `implements` an interface and must then write those methods. Unlike inheritance, a class can implement many interfaces.

```java
public class Main {
    public static void main(String[] args) {
        Payable[] bills = {new Invoice(1200), new Employee("Asha", 45000), new Invoice(800)};
        double sum = 0;
        for (Payable p : bills) {
            sum += p.amountDue();
        }
        System.out.println("Total to pay: " + sum);
    }
}

interface Payable {
    double amountDue();
}

class Invoice implements Payable {
    private final double total;
    Invoice(double total) { this.total = total; }
    public double amountDue() { return total; }
}

class Employee implements Payable {
    private final String name;
    private final double monthlySalary;
    Employee(String name, double monthlySalary) {
        this.name = name;
        this.monthlySalary = monthlySalary;
    }
    public double amountDue() { return monthlySalary; }
    public String toString() { return "Employee " + name; }
}
```
```output
Total to pay: 47000.0
```

`Invoice` and `Employee` have nothing else in common, but both can be treated as `Payable`.

> **Note:** Methods in an interface are `public` automatically, so the implementing methods must also be `public`.

## Default methods

An interface can include a `default` method with a body. Implementing classes get it for free and may override it.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(new Student().greet());
        System.out.println(new Robot().greet());
    }
}

interface Greeter {
    String name();

    default String greet() {
        return "Hello, " + name() + "!";
    }
}

class Student implements Greeter {
    public String name() { return "Meera"; }
}

class Robot implements Greeter {
    public String name() { return "R2"; }
    public String greet() { return "BEEP. GREETINGS " + name(); }
}
```
```output
Hello, Meera!
BEEP. GREETINGS R2
```

## Comparable: an interface from the library

Many Java library features work with any class that implements a certain interface. For example, `Arrays.sort` can sort your own objects if they implement `Comparable`.

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Player[] board = {new Player("Ravi", 40), new Player("Asha", 95), new Player("Dev", 70)};
        Arrays.sort(board);
        System.out.println(Arrays.toString(board));
    }
}

class Player implements Comparable<Player> {
    final String name;
    final int score;
    Player(String name, int score) { this.name = name; this.score = score; }

    public int compareTo(Player other) {
        return Integer.compare(other.score, this.score);   // highest first
    }

    public String toString() { return name + "=" + score; }
}
```
```output
[Asha=95, Dev=70, Ravi=40]
```
