---
title: HashMap
chapter: Collections and Errors
description: Look values up by key with HashMap and TreeMap.
---
A **map** stores key-value pairs: give it a key and it returns the matching value. `HashMap` is the most used implementation. Like `ArrayList`, it lives in `java.util` and uses generics: `HashMap<String, Integer>` maps strings to integers.

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> stock = new HashMap<>();
        stock.put("pens", 40);
        stock.put("notebooks", 25);
        stock.put("pens", 35);        // same key: replaces the value

        System.out.println(stock.get("pens"));
        System.out.println(stock.get("erasers"));
        System.out.println(stock.getOrDefault("erasers", 0));
        System.out.println(stock.containsKey("notebooks"));
        System.out.println(stock.size());

        stock.remove("notebooks");
        System.out.println(stock.size());
    }
}
```
```output
35
null
0
true
2
1
```

## Counting things

`merge` adds to an existing value, or inserts the starting value if the key is new. It is perfect for counting.

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        String text = "to be or not to be";
        HashMap<String, Integer> counts = new HashMap<>();
        for (String word : text.split(" ")) {
            counts.merge(word, 1, Integer::sum);
        }
        System.out.println("to: " + counts.get("to"));
        System.out.println("be: " + counts.get("be"));
        System.out.println("not: " + counts.get("not"));
    }
}
```
```output
to: 2
be: 2
not: 1
```

## Looping in a predictable order

A `HashMap` does not keep its keys in any particular order. When order matters, use `TreeMap` (sorted by key) or `LinkedHashMap` (in insertion order). They have the same methods.

```java
import java.util.Map;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        Map<String, Double> cgpa = new TreeMap<>();
        cgpa.put("Ravi", 7.9);
        cgpa.put("Asha", 9.1);
        cgpa.put("Meera", 8.4);

        for (Map.Entry<String, Double> e : cgpa.entrySet()) {
            System.out.println(e.getKey() + " -> " + e.getValue());
        }
        System.out.println(cgpa);
    }
}
```
```output
Asha -> 9.1
Meera -> 8.4
Ravi -> 7.9
{Asha=9.1, Meera=8.4, Ravi=7.9}
```

> **Note:** Keys are compared with `equals`, so two different `String` objects with the same text are the same key.
