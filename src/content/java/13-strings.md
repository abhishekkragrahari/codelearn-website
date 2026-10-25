---
title: Strings
chapter: Arrays and Strings
description: Compare, search, split and build strings efficiently.
---
`String` is the class Java uses for text. Strings are **immutable**: methods like `toUpperCase()` never change the original string, they return a new one.

```java
public class Main {
    public static void main(String[] args) {
        String s = "  Hello, Java  ";
        String t = s.trim();
        System.out.println("[" + t + "]");
        System.out.println(t.length());
        System.out.println(t.charAt(0));
        System.out.println(t.indexOf("Java"));
        System.out.println(t.replace("Java", "World"));
        System.out.println(t.startsWith("Hell"));
        System.out.println("[" + s + "]");   // unchanged
    }
}
```
```output
[Hello, Java]
11
H
7
Hello, World
true
[  Hello, Java  ]
```

## Comparing strings

Use `equals` to compare text. `==` only checks whether two variables refer to the very same object, which is not what you usually want.

```java
public class Main {
    public static void main(String[] args) {
        String a = "java";
        String b = new String("java");
        System.out.println(a == b);
        System.out.println(a.equals(b));
        System.out.println("JAVA".equalsIgnoreCase(a));
        System.out.println("apple".compareTo("banana") < 0);
    }
}
```
```output
false
true
true
true
```

## Splitting and joining

```java
public class Main {
    public static void main(String[] args) {
        String line = "Asha,21,Pune";
        String[] parts = line.split(",");
        System.out.println(parts[0] + " lives in " + parts[2]);

        String joined = String.join(" | ", parts);
        System.out.println(joined);
    }
}
```
```output
Asha lives in Pune
Asha | 21 | Pune
```

## StringBuilder

Joining strings with `+` inside a loop creates a new string every time. `StringBuilder` builds text efficiently in place.

```java
public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            sb.append(i);
            if (i < 5) sb.append(", ");
        }
        System.out.println(sb.toString());
        System.out.println(sb.reverse());
    }
}
```
```output
1, 2, 3, 4, 5
5 ,4 ,3 ,2 ,1
```

## Formatting

`String.format` builds a string with the same placeholders as `printf`.

```java
public class Main {
    public static void main(String[] args) {
        String msg = String.format("%s scored %.1f%% in %d subjects", "Meera", 91.25, 6);
        System.out.println(msg);
    }
}
```
```output
Meera scored 91.3% in 6 subjects
```
