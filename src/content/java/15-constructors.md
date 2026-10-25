---
title: Constructors and this
chapter: Object-Oriented Programming
description: Overload constructors, chain them with this(), and use initializer blocks.
---
A **constructor** is a special method that sets up a new object. It has the same name as the class and no return type, and it runs automatically when you write `new`.

## The default constructor

If you write no constructor at all, Java provides an empty one, and fields get default values: `0` for numbers, `false` for booleans and `null` for objects.

```java
public class Main {
    public static void main(String[] args) {
        Settings s = new Settings();
        System.out.println(s.volume + " " + s.muted + " " + s.theme);
    }
}

class Settings {
    int volume;
    boolean muted;
    String theme;
}
```
```output
0 false null
```

As soon as you write any constructor yourself, the free default one disappears.

## Overloading and chaining with this()

A class can have several constructors with different parameter lists. One constructor can call another with `this(...)`, which avoids repeating code. `this(...)` must be the first statement.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(new Pizza());
        System.out.println(new Pizza("large"));
        System.out.println(new Pizza("medium", 3));
    }
}

class Pizza {
    private final String size;
    private final int toppings;

    Pizza() {
        this("small");               // calls Pizza(String)
    }

    Pizza(String size) {
        this(size, 1);               // calls Pizza(String, int)
    }

    Pizza(String size, int toppings) {
        this.size = size;
        this.toppings = toppings;
    }

    public String toString() {
        return size + " pizza with " + toppings + " topping(s)";
    }
}
```
```output
small pizza with 1 topping(s)
large pizza with 1 topping(s)
medium pizza with 3 topping(s)
```

## Uses of this

- `this.field` refers to the current object's field when a parameter has the same name.
- `this(...)` calls another constructor of the same class.
- `return this` returns the current object, which enables method chaining.

```java
public class Main {
    public static void main(String[] args) {
        String text = new Message().to("Asha").subject("Meeting").body("See you at 5").build();
        System.out.println(text);
    }
}

class Message {
    private String to = "", subject = "", body = "";

    Message to(String to) { this.to = to; return this; }
    Message subject(String subject) { this.subject = subject; return this; }
    Message body(String body) { this.body = body; return this; }

    String build() {
        return "To: " + to + " | " + subject + ": " + body;
    }
}
```
```output
To: Asha | Meeting: See you at 5
```

This style is called the **builder pattern**.

## Order of initialization

When an object is created, Java first runs field initializers and instance initializer blocks (`{ ... }`) from top to bottom, then the constructor body. With inheritance, the parent part is always built first.

```java
public class Main {
    public static void main(String[] args) {
        new Child();
    }
}

class Parent {
    Parent() { System.out.println("1. Parent constructor"); }
}

class Child extends Parent {
    { System.out.println("2. Child initializer block"); }

    Child() {
        super();   // implicit even if you do not write it
        System.out.println("3. Child constructor");
    }
}
```
```output
1. Parent constructor
2. Child initializer block
3. Child constructor
```

> **Note:** Java has no destructors. Objects are cleaned up by the garbage collector; for resources such as files, use try-with-resources (see the File Handling lesson).
