---
title: Access Modifiers and Packages
chapter: Object-Oriented Programming
description: Control who can see your classes and members, and organize code into packages.
---
**Access modifiers** decide which other code may use a class, field, method or constructor. They are the main tool for **encapsulation**: hiding the inner details of a class and exposing only a safe public surface.

## The four levels

| Modifier | Same class | Same package | Subclass (other package) | Everywhere |
| --- | --- | --- | --- | --- |
| `private` | yes | no | no | no |
| *(none)*, "package-private" | yes | yes | no | no |
| `protected` | yes | yes | yes | no |
| `public` | yes | yes | yes | yes |

A good default: make fields `private`, and make methods `public` only when other code really needs them.

## Encapsulation with private fields

```java
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Kabir");
        s.setMarks(87);
        s.setMarks(140);                 // rejected by the setter
        System.out.println(s.getName() + ": " + s.getMarks() + " (" + s.getGrade() + ")");
        // s.marks = 140;                // compile error: marks has private access
    }
}

class Student {
    private final String name;
    private int marks;

    Student(String name) {
        this.name = name;
    }

    public String getName() { return name; }
    public int getMarks() { return marks; }

    public void setMarks(int marks) {
        if (marks < 0 || marks > 100) {
            System.out.println("Invalid marks: " + marks);
            return;
        }
        this.marks = marks;
    }

    public String getGrade() {
        return marks >= 75 ? "A" : marks >= 50 ? "B" : "C";
    }
}
```
```output
Invalid marks: 140
Kabir: 87 (A)
```

Methods like `getMarks` and `setMarks` are called **getters** and **setters**. The setter can validate input, which is impossible if the field is public.

## protected

`protected` members are visible to subclasses, even in other packages, and to classes in the same package.

```java
public class Main {
    public static void main(String[] args) {
        SavingsAccount acc = new SavingsAccount(10000);
        acc.addInterest();
        System.out.println(acc.report());
    }
}

class Account {
    protected double balance;          // subclasses may use it
    Account(double balance) { this.balance = balance; }
}

class SavingsAccount extends Account {
    private static final double RATE = 0.04;
    SavingsAccount(double balance) { super(balance); }

    void addInterest() { balance += balance * RATE; }
    String report() { return "Balance: " + balance; }
}
```
```output
Balance: 10400.0
```

## Packages

A **package** is a folder of related classes with a unique name, such as `java.util` or `com.codeshala.bank`. Packages prevent name clashes and work together with access modifiers. A project might look like this:

```text
src/
  com/codeshala/bank/Account.java
  com/codeshala/bank/Bank.java
  com/codeshala/app/Main.java
```

The first line of each file declares its package, and other packages use `import`:

```text
// File: com/codeshala/bank/Account.java
package com.codeshala.bank;

public class Account {
    private double balance;
    public void deposit(double amount) { balance += amount; }
    public double getBalance() { return balance; }
}

// File: com/codeshala/app/Main.java
package com.codeshala.app;

import com.codeshala.bank.Account;   // or: import com.codeshala.bank.*;

public class Main {
    public static void main(String[] args) {
        Account a = new Account();
        a.deposit(500);
        System.out.println(a.getBalance());
    }
}
```

Compile and run from the `src` folder with `javac com/codeshala/*/*.java` and then `java com.codeshala.app.Main`.

> **Note:** Classes in `java.lang`, such as `String`, `Math` and `System`, are imported automatically. Everything else, like `java.util.ArrayList`, needs an `import`.
