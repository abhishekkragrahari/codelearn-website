---
title: Lambdas and Functional Interfaces
chapter: Functional Programming
description: Pass behaviour as a value with lambda expressions and method references.
---
A **lambda expression** is a short, unnamed function you can store in a variable or pass to a method. Lambdas arrived in Java 8 and made code that works with collections much shorter.

```text
(parameters) -> expression
(parameters) -> { statements; }
```

## Functional interfaces

A lambda needs a target type: a **functional interface**, which is an interface with exactly one abstract method. The lambda becomes the implementation of that method.

```java
public class Main {
    public static void main(String[] args) {
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;
        Calculator power = (a, b) -> {
            int result = 1;
            for (int i = 0; i < b; i++) result *= a;
            return result;
        };

        System.out.println(add.apply(6, 7));
        System.out.println(multiply.apply(6, 7));
        System.out.println(power.apply(2, 10));
    }
}

@FunctionalInterface
interface Calculator {
    int apply(int a, int b);
}
```
```output
13
42
1024
```

`@FunctionalInterface` is optional, but it makes the compiler check that the interface has exactly one abstract method.

## Built-in functional interfaces

`java.util.function` already provides the common shapes, so you rarely need to write your own.

| Interface | Takes | Returns | Method |
| --- | --- | --- | --- |
| `Function<T, R>` | a `T` | an `R` | `apply` |
| `Predicate<T>` | a `T` | `boolean` | `test` |
| `Consumer<T>` | a `T` | nothing | `accept` |
| `Supplier<T>` | nothing | a `T` | `get` |
| `BiFunction<T, U, R>` | a `T` and a `U` | an `R` | `apply` |

```java
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        Function<String, Integer> length = s -> s.length();
        Predicate<Integer> isAdult = age -> age >= 18;
        Consumer<String> shout = msg -> System.out.println(msg.toUpperCase() + "!");
        Supplier<String> greeting = () -> "Good morning";
        BiFunction<Double, Double, Double> bmi = (kg, m) -> kg / (m * m);

        System.out.println(length.apply("lambda"));
        System.out.println(isAdult.test(16) + " " + isAdult.test(21));
        shout.accept("hello");
        System.out.println(greeting.get());
        System.out.printf("%.1f%n", bmi.apply(68.0, 1.75));

        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isBig = n -> n > 100;
        System.out.println(isEven.and(isBig).test(200) + " " + isEven.negate().test(7));

        Function<Integer, Integer> plusOne = n -> n + 1;
        Function<Integer, Integer> doubled = n -> n * 2;
        System.out.println(plusOne.andThen(doubled).apply(5));
    }
}
```
```output
6
false true
HELLO!
Good morning
22.2
true true
12
```

## Method references

When a lambda only calls an existing method, a **method reference** says the same thing more briefly.

| Lambda | Method reference |
| --- | --- |
| `s -> s.toUpperCase()` | `String::toUpperCase` |
| `x -> System.out.println(x)` | `System.out::println` |
| `s -> Integer.parseInt(s)` | `Integer::parseInt` |
| `() -> new ArrayList<>()` | `ArrayList::new` |

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("ravi", "asha", "dev"));

        names.replaceAll(String::toUpperCase);
        names.forEach(System.out::println);

        names.removeIf(n -> n.length() < 4);
        System.out.println(names);
    }
}
```
```output
RAVI
ASHA
DEV
[RAVI, ASHA]
```

## Capturing variables

A lambda can use local variables from the surrounding method, as long as they are **effectively final** (never changed after being assigned).

```java
import java.util.List;

public class Main {
    public static void main(String[] args) {
        int passMark = 40;                 // never reassigned, so it can be captured
        List<Integer> marks = List.of(35, 62, 40, 18, 90);
        marks.stream()
             .filter(m -> m >= passMark)
             .forEach(m -> System.out.println(m + " passed"));
    }
}
```
```output
62 passed
40 passed
90 passed
```
