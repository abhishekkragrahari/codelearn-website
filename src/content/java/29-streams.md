---
title: The Stream API
chapter: Functional Programming
description: Filter, transform, group and summarize collections in a readable pipeline.
---
A **stream** is a sequence of elements that you process with a chain of operations, like an assembly line. Streams do not store data; they read from a source such as a list, push the data through the steps, and produce a result.

```pipeline
caption: A stream pipeline: one source, any number of intermediate steps, one terminal step
Source | list.stream()
filter | keep some
map | transform each
sorted | order them
collect | build a result
```

- **Intermediate operations** (`filter`, `map`, `sorted`, `distinct`, `limit`) return a new stream. They are lazy: nothing happens until a terminal operation runs.
- **Terminal operations** (`collect`, `forEach`, `count`, `sum`, `reduce`) produce the final result and close the stream.

## filter, map and collect

```java
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("asha", "ravi", "meera", "dev", "anita");

        List<String> result = names.stream()
            .filter(n -> n.startsWith("a"))     // keep names starting with 'a'
            .map(String::toUpperCase)           // transform
            .sorted()
            .collect(Collectors.toList());
        System.out.println(result);

        String joined = names.stream()
            .map(n -> n.substring(0, 1).toUpperCase() + n.substring(1))
            .collect(Collectors.joining(", "));
        System.out.println(joined);
    }
}
```
```output
[ANITA, ASHA]
Asha, Ravi, Meera, Dev, Anita
```

## Numbers: sum, average, max

`mapToInt` turns a stream into an `IntStream`, which has number methods built in.

```java
import java.util.List;
import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) {
        List<Integer> marks = List.of(78, 92, 65, 88, 71);

        int total = marks.stream().mapToInt(Integer::intValue).sum();
        double avg = marks.stream().mapToInt(Integer::intValue).average().orElse(0);
        int best = marks.stream().mapToInt(Integer::intValue).max().getAsInt();
        long above75 = marks.stream().filter(m -> m > 75).count();

        System.out.println(total + " " + avg + " " + best + " " + above75);

        int sumOfSquares = IntStream.rangeClosed(1, 5).map(n -> n * n).sum();
        System.out.println(sumOfSquares);

        int product = marks.stream().limit(2).reduce(1, (a, b) -> a * b);
        System.out.println(product);
    }
}
```
```output
394 78.8 92 3
55
7176
```

## Grouping and counting

`Collectors.groupingBy` sorts elements into buckets, like a GROUP BY in SQL.

```java
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Order> orders = List.of(
            new Order("Asha", "Books", 450),
            new Order("Ravi", "Electronics", 12000),
            new Order("Asha", "Electronics", 3000),
            new Order("Meera", "Books", 300),
            new Order("Ravi", "Books", 150));

        Map<String, Long> countByCategory = orders.stream()
            .collect(Collectors.groupingBy(Order::category, TreeMap::new, Collectors.counting()));
        System.out.println(countByCategory);

        Map<String, Integer> spendByCustomer = orders.stream()
            .collect(Collectors.groupingBy(Order::customer, TreeMap::new, Collectors.summingInt(Order::amount)));
        System.out.println(spendByCustomer);

        Map<Boolean, List<String>> bigOrders = orders.stream()
            .collect(Collectors.partitioningBy(o -> o.amount() > 1000,
                     Collectors.mapping(Order::customer, Collectors.toList())));
        System.out.println(bigOrders);
    }
}

record Order(String customer, String category, int amount) { }
```
```output
{Books=3, Electronics=2}
{Asha=3450, Meera=300, Ravi=12150}
{false=[Asha, Meera, Ravi], true=[Ravi, Asha]}
```

## Optional: a value that may be missing

Some terminal operations, such as `findFirst` and `max`, return an `Optional`, because the stream might be empty. `Optional` forces you to think about the "no result" case instead of getting a `NullPointerException`.

```java
import java.util.List;
import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        List<String> cities = List.of("Pune", "Patna", "Surat");

        Optional<String> found = cities.stream().filter(c -> c.startsWith("P")).findFirst();
        Optional<String> missing = cities.stream().filter(c -> c.startsWith("Z")).findFirst();

        System.out.println(found.isPresent() + " " + found.get());
        System.out.println(missing.isPresent());
        System.out.println(missing.orElse("none"));
        found.ifPresent(c -> System.out.println("First P-city: " + c));
        System.out.println(found.map(String::length).orElse(0));
    }
}
```
```output
true Pune
false
none
First P-city: Pune
4
```

> **Tip:** A stream can be used only once. If you need the data again, call `.stream()` on the collection again.
