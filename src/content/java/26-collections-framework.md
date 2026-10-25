---
title: The Collections Framework
chapter: Collections and Generics
description: An overview of List, Set, Queue, Deque and Map, and when to use each.
---
The **Java Collections Framework** is a set of interfaces and classes in `java.util` for storing groups of objects. You have already met `ArrayList` and `HashMap`. This lesson shows the whole family and how to choose between them.

```tree
caption: The main collection interfaces (top) and their common implementations
Collection | interface
  List | ordered, allows duplicates
    ArrayList
    LinkedList
  Set | no duplicates
    HashSet
    LinkedHashSet
    TreeSet
  Queue | process in order
    PriorityQueue
    ArrayDeque
Map | key-value, separate family
  HashMap
  LinkedHashMap
  TreeMap
```

## Choosing a collection

| Need | Use |
| --- | --- |
| Ordered list, fast access by index | `ArrayList` |
| Many inserts and removals at both ends | `ArrayDeque` (or `LinkedList`) |
| Unique items, order does not matter | `HashSet` |
| Unique items, keep insertion order | `LinkedHashSet` |
| Unique items, always sorted | `TreeSet` |
| Always take the smallest (or highest priority) next | `PriorityQueue` |
| Look up values by key | `HashMap` (sorted keys: `TreeMap`) |

## Sets

```java
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        String[] visits = {"Delhi", "Agra", "Delhi", "Jaipur", "Agra"};

        Set<String> inOrder = new LinkedHashSet<>();
        Set<String> sorted = new TreeSet<>();
        for (String city : visits) {
            inOrder.add(city);
            sorted.add(city);
        }
        System.out.println(inOrder);
        System.out.println(sorted);
        System.out.println(inOrder.contains("Agra"));

        TreeSet<Integer> scores = new TreeSet<>(Set.of(45, 72, 88, 91, 60));
        System.out.println(scores.first() + " " + scores.last());
        System.out.println(scores.headSet(70));     // everything below 70
    }
}
```
```output
[Delhi, Agra, Jaipur]
[Agra, Delhi, Jaipur]
true
45 91
[45, 60]
```

## Queues and stacks with ArrayDeque

A **queue** is first in, first out (FIFO), like a line at a ticket counter. A **stack** is last in, first out (LIFO), like a pile of plates. `ArrayDeque` can be both.

```pipeline
caption: Queue (FIFO): items leave in the order they arrived
offer("A") | enters at the back
offer("B")
offer("C")
poll() | returns "A"
```

```java
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Queue<String> line = new ArrayDeque<>();
        line.offer("Asha");
        line.offer("Ravi");
        line.offer("Meera");
        System.out.println(line.peek());     // look at the front
        System.out.println(line.poll());     // remove the front
        System.out.println(line);

        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        System.out.println(stack.pop());     // last in, first out
        System.out.println(stack);
    }
}
```
```output
Asha
Asha
[Ravi, Meera]
3
[2, 1]
```

## PriorityQueue

A `PriorityQueue` always hands out the smallest element first (or the "highest priority" one, if you give it a comparator).

```java
import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> tasks = new PriorityQueue<>();
        tasks.add(30);
        tasks.add(5);
        tasks.add(18);
        tasks.add(1);
        while (!tasks.isEmpty()) {
            System.out.print(tasks.poll() + " ");
        }
        System.out.println();
    }
}
```
```output
1 5 18 30 
```

## Iterator and the Collections class

Every collection can be walked with an `Iterator`, which also lets you remove items safely while looping. The `Collections` helper class has ready-made algorithms.

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(4, 9, 2, 7, 6, 1));

        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) it.remove();    // safe removal
        }
        System.out.println(nums);

        Collections.sort(nums);
        System.out.println(nums);
        Collections.reverse(nums);
        System.out.println(nums);
        System.out.println(Collections.max(nums) + " " + Collections.frequency(nums, 7));

        List<String> fixed = List.of("read", "only");
        try {
            fixed.add("more");
        } catch (UnsupportedOperationException e) {
            System.out.println("List.of(...) lists cannot be changed");
        }
    }
}
```
```output
[9, 7, 1]
[1, 7, 9]
[9, 7, 1]
9 1
List.of(...) lists cannot be changed
```
