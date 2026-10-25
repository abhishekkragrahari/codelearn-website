---
title: Your First Java Program
chapter: Getting Started
description: What Java is, how to install the JDK, and how a Java program is structured.
---
Java is a strongly typed, object-oriented language. Java source code is compiled into **bytecode**, which runs on the Java Virtual Machine (JVM). Because a JVM exists for almost every operating system, the same compiled program can run on Windows, macOS and Linux without changes.

## Installing Java

Download a **JDK** (Java Development Kit) version 17 or newer, for example from adoptium.net. After installing, open a terminal and check:

```text
java -version
javac -version
```

## Hello, world

In Java, all code lives inside a **class**. The file name must match the public class name, so save this as `Main.java`:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```
```output
Hello, world!
```

Compile and run it:

```text
javac Main.java
java Main
```

## Reading the code

- `public class Main` declares a class called `Main`.
- `public static void main(String[] args)` is the entry point. The JVM looks for exactly this method when it starts your program.
- `System.out.println(...)` prints a line of text and then moves to a new line.
- Statements end with `;` and blocks are wrapped in `{ }`.

> **Tip:** Since Java 11 you can also run a single file directly with `java Main.java`, which compiles and runs it in one step.

## print versus println

`System.out.print` prints without a newline, which lets you build a line in pieces.

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("Java ");
        System.out.print("is ");
        System.out.println("everywhere.");
        System.out.println("Sum: " + (10 + 20));
    }
}
```
```output
Java is everywhere.
Sum: 30
```

The brackets around `10 + 20` matter. Without them Java would join `"Sum: "` and `10` first, and print `Sum: 1020`.
