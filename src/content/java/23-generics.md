---
title: Generics
chapter: Collections and Generics
description: Write classes and methods that work with any type while staying type safe.
---
**Generics** let you write code once and use it with many types, while the compiler still checks that the types are right. You have already used them: `ArrayList<String>` is a list that only holds strings.

## Why generics?

Without generics, a container would have to hold `Object`, and you would need risky casts every time you read from it. With generics, mistakes are caught at compile time.

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Asha");
        // names.add(42);          // compile error: 42 is not a String
        String first = names.get(0);   // no cast needed
        System.out.println(first.toUpperCase());
    }
}
```
```output
ASHA
```

## A generic class

The letter in angle brackets, usually `T` for "type", is a **type parameter**. It is replaced by a real type when the class is used.

```java
public class Main {
    public static void main(String[] args) {
        Box<Integer> numberBox = new Box<>(42);
        Box<String> textBox = new Box<>("hello");
        System.out.println(numberBox.get() + 8);
        System.out.println(textBox.get().length());

        Pair<String, Double> price = new Pair<>("Tea", 15.0);
        System.out.println(price);
    }
}

class Box<T> {
    private final T value;
    Box(T value) { this.value = value; }
    T get() { return value; }
}

class Pair<K, V> {
    private final K key;
    private final V value;
    Pair(K key, V value) { this.key = key; this.value = value; }
    public String toString() { return key + " = " + value; }
}
```
```output
50
5
Tea = 15.0
```

Common type parameter names: `T` (type), `E` (element), `K` and `V` (key and value), `R` (result).

## Generic methods

A single method can also have its own type parameter, written before the return type.

```java
import java.util.List;

public class Main {
    static <T> T lastOf(List<T> list) {
        return list.get(list.size() - 1);
    }

    static <T> void printAll(T[] items) {
        for (T item : items) System.out.print(item + " ");
        System.out.println();
    }

    public static void main(String[] args) {
        System.out.println(lastOf(List.of("a", "b", "c")));
        System.out.println(lastOf(List.of(10, 20, 30)));
        printAll(new Integer[]{1, 2, 3});
        printAll(new String[]{"x", "y"});
    }
}
```
```output
c
30
1 2 3 
x y 
```

## Bounded types

`<T extends Number>` means "any type that is a `Number` or a subclass of it". That lets the method call `Number` methods such as `doubleValue()`.

```java
import java.util.List;

public class Main {
    static <T extends Number> double sum(List<T> nums) {
        double total = 0;
        for (T n : nums) total += n.doubleValue();
        return total;
    }

    static <T extends Comparable<T>> T maxOf(List<T> items) {
        T best = items.get(0);
        for (T item : items) {
            if (item.compareTo(best) > 0) best = item;
        }
        return best;
    }

    public static void main(String[] args) {
        System.out.println(sum(List.of(1, 2, 3)));
        System.out.println(sum(List.of(1.5, 2.5)));
        System.out.println(maxOf(List.of("mango", "apple", "pear")));
    }
}
```
```output
6.0
4.0
pear
```

## Wildcards

`List<?>` means "a list of some unknown type". `List<? extends Number>` accepts a list of `Integer`, `Double` and so on, for reading.

```java
import java.util.List;

public class Main {
    static void describe(List<?> list) {
        System.out.println(list.size() + " items, first is " + list.get(0));
    }

    static double average(List<? extends Number> nums) {
        double total = 0;
        for (Number n : nums) total += n.doubleValue();
        return total / nums.size();
    }

    public static void main(String[] args) {
        describe(List.of("x", "y"));
        describe(List.of(7, 8, 9));
        System.out.println(average(List.of(90, 80, 70)));
    }
}
```
```output
2 items, first is x
3 items, first is 7
80.0
```

> **Note:** Generics only work with objects, so you write `List<Integer>`, not `List<int>`. Autoboxing converts between `int` and `Integer` for you.
