---
title: Polymorphism
chapter: Object-Oriented Programming
description: Compile-time and run-time polymorphism, upcasting, downcasting and instanceof.
---
**Polymorphism** means "many forms": the same call can behave differently depending on the object it is made on. Java has two kinds.

| Kind | Also called | Decided when | Achieved by |
| --- | --- | --- | --- |
| Compile-time | static polymorphism | while compiling | method **overloading** |
| Run-time | dynamic polymorphism | while running | method **overriding** |

## Compile-time: overloading

Several methods share a name but take different parameters. The compiler picks one by looking at the argument types.

```java
public class Main {
    public static void main(String[] args) {
        Printer p = new Printer();
        p.print(42);
        p.print(3.5);
        p.print("hello");
        p.print("tea", 3);
    }
}

class Printer {
    void print(int x) { System.out.println("int: " + x); }
    void print(double x) { System.out.println("double: " + x); }
    void print(String s) { System.out.println("String: " + s); }
    void print(String s, int times) { System.out.println((s + " ").repeat(times).trim()); }
}
```
```output
int: 42
double: 3.5
String: hello
tea tea tea
```

## Run-time: overriding and dynamic dispatch

A parent-type variable can refer to any child object. When you call an overridden method, the JVM looks at the **actual object** at run time and calls its version.

```tree
caption: Every Payment is handled through the same parent type
Payment | pay(amount)
  UpiPayment | adds no fee
  CardPayment | adds 2% fee
  CashPayment | rounds to whole rupees
```

```java
public class Main {
    public static void main(String[] args) {
        Payment[] payments = {new UpiPayment(), new CardPayment(), new CashPayment()};
        for (Payment p : payments) {
            System.out.println(p.pay(499.6));
        }
    }
}

class Payment {
    String pay(double amount) { return "Paid " + amount; }
}

class UpiPayment extends Payment {
    @Override String pay(double amount) { return "UPI: Rs " + amount; }
}

class CardPayment extends Payment {
    @Override String pay(double amount) { return "Card: Rs " + Math.round(amount * 1.02 * 100) / 100.0 + " (incl. fee)"; }
}

class CashPayment extends Payment {
    @Override String pay(double amount) { return "Cash: Rs " + Math.round(amount); }
}
```
```output
UPI: Rs 499.6
Card: Rs 509.59 (incl. fee)
Cash: Rs 500
```

The loop does not know or care which kind of payment each one is. New payment types can be added later without changing the loop.

## Upcasting and downcasting

- **Upcasting** (child to parent) is automatic and always safe: `Payment p = new UpiPayment();`
- **Downcasting** (parent to child) needs an explicit cast and is only safe if the object really is that child. Check first with `instanceof`.

```java
public class Main {
    public static void main(String[] args) {
        Animal[] zoo = {new Dog(), new Cat(), new Dog()};
        for (Animal a : zoo) {
            a.eat();                          // available on every Animal
            if (a instanceof Dog d) {         // check and cast in one step
                d.fetch();                    // only dogs can fetch
            }
        }
    }
}

class Animal {
    void eat() { System.out.println(getClass().getSimpleName() + " is eating"); }
}

class Dog extends Animal {
    void fetch() { System.out.println("  Dog fetches the ball"); }
}

class Cat extends Animal { }
```
```output
Dog is eating
  Dog fetches the ball
Cat is eating
Dog is eating
  Dog fetches the ball
```

`a instanceof Dog d` is **pattern matching** (Java 16+): if the test passes, `d` is already the cast variable. In older code you will see `if (a instanceof Dog) { Dog d = (Dog) a; ... }`.

> **Warning:** Casting to the wrong type, such as `(Dog) new Cat()`, compiles but throws a `ClassCastException` at run time. Always check with `instanceof` first.

## Rules for overriding

- The method name and parameter list must match exactly.
- The return type must be the same or a subtype.
- The access cannot be more restrictive (a `public` method cannot become `private`).
- `static`, `final` and `private` methods cannot be overridden.
