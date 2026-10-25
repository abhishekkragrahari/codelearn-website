---
title: Reading User Input
chapter: Getting Started
description: Read numbers and text from the keyboard with the Scanner class.
---
Java reads keyboard input through the `Scanner` class, which lives in the `java.util` package. You need to **import** it at the top of your file before you can use it.

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = in.nextLine();

        System.out.print("Enter your age: ");
        int age = in.nextInt();

        System.out.println("Hello " + name + ", next year you will be " + (age + 1));
        in.close();
    }
}
```

A sample run:

```text
Enter your name: Kabir Singh
Enter your age: 20
Hello Kabir Singh, next year you will be 21
```

## Useful Scanner methods

- `nextLine()` reads a whole line of text, including spaces.
- `next()` reads a single word.
- `nextInt()`, `nextDouble()` and `nextBoolean()` read a value of that type.
- `hasNextInt()` checks whether the next input is a valid `int`, without reading it.

## A common trap

`nextInt()` reads the number but leaves the Enter key (a newline) waiting. A following `nextLine()` then reads that empty leftover line. Call `nextLine()` once to clear it:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.print("Roll number: ");
        int roll = in.nextInt();
        in.nextLine();                 // throw away the rest of the line
        System.out.print("Full name: ");
        String name = in.nextLine();
        System.out.println(roll + " - " + name);
    }
}
```

## Validating input

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.print("Enter a whole number: ");
        while (!in.hasNextInt()) {
            System.out.print("That is not a number, try again: ");
            in.next();                 // discard the bad word
        }
        int n = in.nextInt();
        System.out.println("Its square is " + n * n);
    }
}
```

> **Note:** The online playground on this site cannot read keyboard input. Run these examples on your own computer with `java Main.java` to try them.
