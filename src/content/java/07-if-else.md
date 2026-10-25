---
title: Conditions with if and switch
chapter: Control Flow
description: Branch your program with if, else if, the ternary operator and switch.
---
An `if` statement runs its block only when the condition in brackets evaluates to `true`. In Java the condition must be a real `boolean`; numbers are not accepted.

```java
public class Main {
    public static void main(String[] args) {
        int speed = 72;
        int limit = 60;

        if (speed > limit) {
            System.out.println("Slow down! You are " + (speed - limit) + " km/h over.");
        } else {
            System.out.println("Speed OK.");
        }
    }
}
```
```output
Slow down! You are 12 km/h over.
```

```flowchart
caption: How the speed check above runs
start: Start
step: speed = 72, limit = 60
if: speed > limit?
  yes:
    io: Print "Slow down!"
  no:
    io: Print "Speed OK."
end: End
```

## else if and logical operators
An `else if` chain tests each condition from top to bottom and runs only the first block whose condition is true:

```flowchart
caption: An if / else if / else chain
start: Start
if: condition 1?
  yes:
    step: block 1
  no:
    if: condition 2?
      yes:
        step: block 2
      no:
        step: else block
end: End
```


```java
public class Main {
    public static void main(String[] args) {
        int year = 2024;
        boolean leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

        if (leap) {
            System.out.println(year + " is a leap year");
        } else if (year % 2 == 0) {
            System.out.println(year + " is even but not a leap year");
        } else {
            System.out.println(year + " is an ordinary year");
        }
    }
}
```
```output
2024 is a leap year
```

## The ternary operator

For a simple either-or choice, `condition ? valueIfTrue : valueIfFalse` fits on one line.

```java
public class Main {
    public static void main(String[] args) {
        int stock = 0;
        String label = stock > 0 ? "In stock" : "Sold out";
        System.out.println(label);
    }
}
```
```output
Sold out
```

## switch expressions

Modern Java (14 and newer) lets `switch` produce a value using arrows. There is no fall-through, so no `break` is needed.

```java
public class Main {
    public static void main(String[] args) {
        String planet = "Mars";
        int moons = switch (planet) {
            case "Earth" -> 1;
            case "Mars" -> 2;
            case "Venus", "Mercury" -> 0;
            default -> -1;
        };
        System.out.println(planet + " has " + moons + " moons");
    }
}
```
```output
Mars has 2 moons
```

> **Warning:** Compare strings with `.equals()`, not `==`. For example `name.equals("Asha")`. The `==` operator checks whether two variables point to the same object, not whether the text matches.
