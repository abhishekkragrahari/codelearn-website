---
title: Recursion
chapter: Methods
description: Write methods that call themselves to solve problems step by step.
---
A **recursive** method calls itself with a smaller version of the problem. Every recursive method needs two parts:

- a **base case** that is simple enough to answer directly, and
- a **recursive case** that moves closer to the base case.

## Factorial

```java
public class Main {
    static long factorial(int n) {
        if (n <= 1) return 1;           // base case
        return n * factorial(n - 1);    // recursive case
    }

    public static void main(String[] args) {
        for (int i = 0; i <= 5; i++) {
            System.out.println(i + "! = " + factorial(i));
        }
        System.out.println("20! = " + factorial(20));
    }
}
```
```output
0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
20! = 2432902008176640000
```

```pipeline
caption: factorial(4) keeps calling itself until it reaches the base case, then the results multiply back up
factorial(4) | 4 * factorial(3)
factorial(3) | 3 * factorial(2)
factorial(2) | 2 * factorial(1)
factorial(1) | base case: 1
```

## Fibonacci and the cost of repeated work

The Fibonacci sequence starts 0, 1 and each next number is the sum of the previous two. The direct recursive version is elegant but recomputes the same values many times. Storing results that were already computed (**memoization**) makes it fast.

```tree
caption: The calls made by fibSlow(4): fib(2) is computed twice, fib(1) three times
fib(4)
  fib(3)
    fib(2)
      fib(1)
      fib(0)
    fib(1)
  fib(2)
    fib(1)
    fib(0)
```

```java
public class Main {
    static int calls = 0;

    static long fibSlow(int n) {
        calls++;
        if (n < 2) return n;
        return fibSlow(n - 1) + fibSlow(n - 2);
    }

    static long[] memo = new long[100];

    static long fibFast(int n) {
        if (n < 2) return n;
        if (memo[n] != 0) return memo[n];
        return memo[n] = fibFast(n - 1) + fibFast(n - 2);
    }

    public static void main(String[] args) {
        System.out.println(fibSlow(20) + " using " + calls + " calls");
        System.out.println(fibFast(80));
    }
}
```
```output
6765 using 21891 calls
23416728348467685
```

## Recursion on strings and arrays

```java
public class Main {
    static String reverse(String s) {
        if (s.isEmpty()) return "";
        return reverse(s.substring(1)) + s.charAt(0);
    }

    static boolean isPalindrome(String s) {
        if (s.length() <= 1) return true;
        if (s.charAt(0) != s.charAt(s.length() - 1)) return false;
        return isPalindrome(s.substring(1, s.length() - 1));
    }

    static int binarySearch(int[] arr, int target, int lo, int hi) {
        if (lo > hi) return -1;
        int mid = (lo + hi) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) return binarySearch(arr, target, mid + 1, hi);
        return binarySearch(arr, target, lo, mid - 1);
    }

    public static void main(String[] args) {
        System.out.println(reverse("recursion"));
        System.out.println(isPalindrome("malayalam"));
        System.out.println(isPalindrome("java"));
        int[] sorted = {3, 8, 15, 23, 42, 57};
        System.out.println(binarySearch(sorted, 42, 0, sorted.length - 1));
    }
}
```
```output
noisrucer
true
false
4
```

> **Warning:** Each call uses a frame on the stack. Recursing too deeply, or forgetting the base case, throws a `StackOverflowError`. For simple counting loops, an ordinary loop is usually clearer.
