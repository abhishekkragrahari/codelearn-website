---
title: Exceptions
chapter: Exceptions and Files
description: Handle errors with try, catch and finally, and throw your own exceptions.
---
An **exception** is an object that signals something went wrong while the program was running, such as dividing by zero or reading past the end of an array. If nothing catches it, the program stops and prints a stack trace. A `try` / `catch` block lets you handle it instead.

```java
public class Main {
    public static void main(String[] args) {
        try {
            int[] data = {1, 2, 3};
            System.out.println(data[5]);
            System.out.println("not reached");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught: " + e.getMessage());
        }
        System.out.println("Program continues");
    }
}
```
```output
Caught: Index 5 out of bounds for length 3
Program continues
```

## Several catch blocks and finally
```flowchart
caption: How try, catch and finally run
start: Start
step: Run the try block
if: Exception thrown?
  yes:
    step: Run the matching catch
    step: Run finally
  no:
    step: Run finally
end: Continue
```


`finally` always runs, whether an exception happened or not.

```java
public class Main {
    static void parseAndDivide(String text) {
        try {
            int n = Integer.parseInt(text);
            System.out.println("100 / " + n + " = " + (100 / n));
        } catch (NumberFormatException e) {
            System.out.println("'" + text + "' is not a number");
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        } finally {
            System.out.println("  done with " + text);
        }
    }

    public static void main(String[] args) {
        parseAndDivide("4");
        parseAndDivide("zero");
        parseAndDivide("0");
    }
}
```
```output
100 / 4 = 25
  done with 4
'zero' is not a number
  done with zero
Cannot divide by zero
  done with 0
```

## Throwing exceptions

Use `throw` when a method receives a value it cannot accept.

```java
public class Main {
    static void setAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("age must not be negative: " + age);
        }
        System.out.println("Age set to " + age);
    }

    public static void main(String[] args) {
        setAge(21);
        try {
            setAge(-3);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
```output
Age set to 21
Error: age must not be negative: -3
```

## Checked and unchecked exceptions
```tree
caption: The exception class hierarchy
Throwable
  Error | serious JVM problems, do not catch
    StackOverflowError
    OutOfMemoryError
  Exception | checked
    IOException
    RuntimeException | unchecked
      ArithmeticException
      NullPointerException
      IllegalArgumentException
```


Java has two kinds of exceptions:

- **Unchecked** exceptions (subclasses of `RuntimeException`), such as `NullPointerException` and `ArithmeticException`, usually mean a bug. You may catch them, but you do not have to.
- **Checked** exceptions, such as `IOException`, describe problems outside your control, like a missing file. The compiler forces you to either catch them or declare them with `throws`.

```java
public class Main {
    static double balance = 500;

    static void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Need " + (amount - balance) + " more");
        }
        balance -= amount;
    }

    public static void main(String[] args) {
        try {
            withdraw(200);
            withdraw(450);
        } catch (InsufficientFundsException e) {
            System.out.println("Failed: " + e.getMessage());
        }
        System.out.println("Balance: " + balance);
    }
}

class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) {
        super(message);
    }
}
```
```output
Failed: Need 150.0 more
Balance: 300.0
```

> **Tip:** Catch the most specific exception you can handle. Catching `Exception` everywhere hides bugs you would rather see.
