---
title: ArrayList
chapter: Collections and Errors
description: Use a resizable list that grows and shrinks as you add and remove items.
---
Arrays have a fixed size. An `ArrayList` (from `java.util`) is a list that grows automatically, which makes it the most common way to store a collection of objects in Java.

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> cities = new ArrayList<>();
        cities.add("Delhi");
        cities.add("Mumbai");
        cities.add("Chennai");
        cities.add(1, "Jaipur");      // insert at index 1

        System.out.println(cities);
        System.out.println(cities.size());
        System.out.println(cities.get(2));

        cities.set(0, "New Delhi");
        cities.remove("Chennai");
        System.out.println(cities);
        System.out.println(cities.contains("Mumbai"));
    }
}
```
```output
[Delhi, Jaipur, Mumbai, Chennai]
4
Mumbai
[New Delhi, Jaipur, Mumbai]
true
```

The type in angle brackets, `<String>`, is a **generic** type parameter. It tells Java what the list holds, so the compiler can stop you from adding the wrong kind of value.

## Lists of numbers

Generics only work with objects, so use the wrapper classes `Integer`, `Double` and so on instead of `int` and `double`. Java converts between them automatically.

```java
import java.util.ArrayList;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();
        int[] raw = {72, 95, 60, 88, 95};
        for (int s : raw) scores.add(s);

        Collections.sort(scores);
        System.out.println(scores);
        System.out.println("max: " + Collections.max(scores));

        int total = 0;
        for (int s : scores) total += s;
        System.out.println("average: " + total / scores.size());
    }
}
```
```output
[60, 72, 88, 95, 95]
max: 95
average: 82
```

## Removing items safely

Removing items while looping with a for-each loop throws an error. Use `removeIf` instead.

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8));
        nums.removeIf(n -> n % 2 == 0);
        System.out.println(nums);

        nums.forEach(n -> System.out.print(n * 10 + " "));
        System.out.println();
    }
}
```
```output
[1, 3, 5, 7]
10 30 50 70 
```

`n -> n % 2 == 0` is a **lambda expression**: a short, unnamed function you pass to a method.

> **Tip:** Declare variables with the interface type, `List<Integer> nums = new ArrayList<>()`. Your code then works with any kind of list, and you can switch the implementation later.
