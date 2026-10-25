---
title: Classes and Objects
chapter: Object-Oriented Programming
description: Define your own types with fields, constructors and methods.
---
Java is built around **classes**. A class is a blueprint that describes what data an object holds (its **fields**) and what it can do (its **methods**). An **object** is one instance created from that blueprint with `new`.

```java
public class Main {
    public static void main(String[] args) {
        Book b1 = new Book("Godaan", "Premchand", 312);
        Book b2 = new Book("Gitanjali", "Tagore", 103);
        System.out.println(b1.describe());
        System.out.println(b2.title);
    }
}

class Book {
    String title;
    String author;
    int pages;

    Book(String title, String author, int pages) {   // constructor
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    String describe() {
        return title + " by " + author + " (" + pages + " pages)";
    }
}
```
```output
Godaan by Premchand (312 pages)
Gitanjali
```

- The **constructor** has the same name as the class and no return type. It runs when you call `new`.
- `this.title` means "the field of this object", which separates it from the parameter with the same name.

> **Note:** One file can hold several classes, but only one can be `public`, and its name must match the file name. Keep `Main` first in the file: `java Main.java` runs the first class it finds.

## Encapsulation

Good practice is to make fields `private` and expose them through methods. That way the class controls how its data may change.

```java
public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Ravi");
        acc.deposit(1000);
        acc.deposit(-50);
        System.out.println(acc.withdraw(300));
        System.out.println(acc.withdraw(5000));
        System.out.println(acc.getOwner() + ": " + acc.getBalance());
    }
}

class BankAccount {
    private final String owner;
    private double balance;

    BankAccount(String owner) {
        this.owner = owner;
    }

    void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Deposit must be positive");
            return;
        }
        balance += amount;
    }

    boolean withdraw(double amount) {
        if (amount > balance) return false;
        balance -= amount;
        return true;
    }

    double getBalance() {
        return balance;
    }

    String getOwner() {
        return owner;
    }
}
```
```output
Deposit must be positive
true
false
Ravi: 700.0
```

## toString and static members

Override `toString()` to control how an object prints. A `static` field belongs to the class itself, shared by all objects.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(new Ticket("Lagaan"));
        System.out.println(new Ticket("Swades"));
        System.out.println(new Ticket("Lagaan"));
    }
}

class Ticket {
    private static int nextId = 1;
    private final int id;
    private final String movie;

    Ticket(String movie) {
        this.movie = movie;
        this.id = nextId++;
    }

    @Override
    public String toString() {
        return "Ticket #" + id + " for " + movie;
    }
}
```
```output
Ticket #1 for Lagaan
Ticket #2 for Swades
Ticket #3 for Lagaan
```
