---
title: How Java Works (JDK, JRE, JVM)
chapter: Getting Started
description: What happens between writing Main.java and seeing output, and how Java uses memory.
---
Before writing more code, it helps to know what actually happens when you run a Java program. Java's design goal was "write once, run anywhere", and three pieces make that possible.

## The three pieces

- **JVM (Java Virtual Machine):** a program that runs Java **bytecode**. There is a different JVM for Windows, macOS, Linux and other systems, but they all understand the same bytecode.
- **JRE (Java Runtime Environment):** the JVM plus the standard class library (`String`, `ArrayList`, `Math` and thousands more). It is everything needed to **run** Java programs.
- **JDK (Java Development Kit):** the JRE plus developer tools such as the compiler `javac`, the debugger and `jshell`. You need it to **write** Java programs.

So JDK ⊃ JRE ⊃ JVM. Modern Java versions ship only the JDK, which includes everything.

```tree
caption: The JDK contains the JRE, which contains the JVM
JDK | for writing programs
  Developer tools | javac, jshell, jar
  JRE | for running programs
    Class library | String, ArrayList, ...
    JVM | runs bytecode
```

## From source code to running program

```pipeline
caption: From source code to output
Main.java | source code
javac | compiler
Main.class | bytecode
JVM | java Main
Output | on any OS
```

1. `javac Main.java` checks your code for errors and translates it into bytecode, stored in `Main.class`.
2. `java Main` starts the JVM, which loads `Main.class`, checks the bytecode for safety, and starts running `main`.
3. While the program runs, the **JIT (Just-In-Time) compiler** inside the JVM turns frequently used bytecode into fast native machine code.

Because the `.class` file is the same everywhere, you can compile once on Windows and run the result on Linux.

## Stack and heap memory

The JVM splits memory into two main areas:

- The **stack** holds each method call's local variables and primitive values. Each call gets a frame that disappears when the method returns.
- The **heap** holds all objects created with `new` (and arrays and strings). Variables on the stack only hold **references** that point to objects on the heap.

```tree
caption: In the example below, two stack variables point to the same array on the heap
JVM memory
  Stack | count = 3, scores, sameScores
  Heap | int[] {100, 75, 60}
```

```java
public class Main {
    public static void main(String[] args) {
        int count = 3;                          // the value 3 lives on the stack
        int[] scores = {90, 75, 60};            // the array lives on the heap
        int[] sameScores = scores;              // copies the reference, not the array

        sameScores[0] = 100;
        System.out.println(scores[0]);          // both names see the change
        System.out.println(count);
    }
}
```
```output
100
3
```

## Garbage collection

You never free memory yourself in Java. When no variable refers to an object any more, the **garbage collector** reclaims its memory automatically.

```java
public class Main {
    public static void main(String[] args) {
        StringBuilder note = new StringBuilder("draft");
        note = new StringBuilder("final");   // the "draft" object is now unreachable
        System.out.println(note);
        // The JVM will clean up "draft" whenever it decides to run the collector.
    }
}
```
```output
final
```

> **Tip:** Run `jshell` in a terminal to get an interactive Java prompt. It is a quick way to test a line of code without writing a whole class.
