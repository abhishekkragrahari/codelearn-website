---
title: Nested, Inner and Anonymous Classes
chapter: Object-Oriented Programming
description: Define classes inside other classes and create one-off implementations.
---
Java lets you define a class inside another class. This keeps helper classes close to the only place they are used, and gives them access to the outer class's members.

```tree
caption: Kinds of classes defined inside another class
Nested classes
  static nested | no outer object needed
  inner | tied to an outer object
  local | inside a method
  anonymous | no name, used once
```

## Static nested class

A `static` nested class is like a normal class that just lives inside another one. Create it with `Outer.Nested`.

```java
public class Main {
    public static void main(String[] args) {
        Order.Item item = new Order.Item("Notebook", 3, 45);
        System.out.println(item.total());
    }
}

class Order {
    static class Item {
        final String name;
        final int qty, price;
        Item(String name, int qty, int price) {
            this.name = name; this.qty = qty; this.price = price;
        }
        int total() { return qty * price; }
    }
}
```
```output
135
```

## Inner class

A non-static **inner class** belongs to an instance of the outer class, and can read that instance's fields directly, even private ones.

```java
public class Main {
    public static void main(String[] args) {
        Playlist p = new Playlist("Road trip", new String[]{"Song A", "Song B", "Song C"});
        Playlist.Player player = p.new Player();
        player.playAll();
    }
}

class Playlist {
    private final String name;
    private final String[] songs;

    Playlist(String name, String[] songs) {
        this.name = name;
        this.songs = songs;
    }

    class Player {
        void playAll() {
            for (int i = 0; i < songs.length; i++) {   // uses the outer object's field
                System.out.println(name + " " + (i + 1) + ": " + songs[i]);
            }
        }
    }
}
```
```output
Road trip 1: Song A
Road trip 2: Song B
Road trip 3: Song C
```

## Local class

A class declared inside a method is visible only in that method.

```java
public class Main {
    public static void main(String[] args) {
        class Range {
            final int lo, hi;
            Range(int lo, int hi) { this.lo = lo; this.hi = hi; }
            boolean contains(int x) { return x >= lo && x <= hi; }
        }
        Range teen = new Range(13, 19);
        System.out.println(teen.contains(16) + " " + teen.contains(21));
    }
}
```
```output
true false
```

## Anonymous class

An **anonymous class** creates a one-off implementation of an interface or subclass, right where it is needed, without giving it a name.

```java
import java.util.Arrays;
import java.util.Comparator;

public class Main {
    public static void main(String[] args) {
        String[] words = {"banana", "fig", "cherry", "kiwi"};

        Arrays.sort(words, new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return a.length() - b.length();
            }
        });
        System.out.println(Arrays.toString(words));

        Greeting g = new Greeting() {
            public String greet(String name) { return "Namaste, " + name; }
        };
        System.out.println(g.greet("Ravi"));
    }
}

interface Greeting {
    String greet(String name);
}
```
```output
[fig, kiwi, banana, cherry]
Namaste, Ravi
```

> **Tip:** When the interface has exactly one method, a **lambda** does the same job in one line: `Arrays.sort(words, (a, b) -> a.length() - b.length());`. See the Lambdas lesson.
