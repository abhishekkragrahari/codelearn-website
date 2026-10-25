---
title: Recursion
chapter: Functions
description: Solve problems with functions that call themselves.
---
A **recursive** function is one that calls itself. Each call works on a smaller version of the problem until it reaches a case simple enough to answer directly, called the **base case**.

## Factorial

The factorial of `n` (written `n!`) is `n * (n-1) * ... * 1`. Notice that `n! = n * (n-1)!`, which translates straight into code.

```c
#include <stdio.h>

long factorial(int n) {
    if (n <= 1) {
        return 1;              /* base case */
    }
    return n * factorial(n - 1);  /* recursive case */
}

int main(void) {
    for (int i = 1; i <= 6; i++) {
        printf("%d! = %ld\n", i, factorial(i));
    }
    return 0;
}
```
```output
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
```

## How the calls unfold

Each call waits for the one below it to finish. You can see this by printing on the way down and on the way back up.

```c
#include <stdio.h>

void countdown(int n) {
    if (n == 0) {
        printf("Liftoff!\n");
        return;
    }
    printf("%d...\n", n);
    countdown(n - 1);
    printf("back in call %d\n", n);
}

int main(void) {
    countdown(3);
    return 0;
}
```
```output
3...
2...
1...
Liftoff!
back in call 1
back in call 2
back in call 3
```

## Sum of digits

```c
#include <stdio.h>

int digit_sum(int n) {
    if (n < 10) {
        return n;
    }
    return n % 10 + digit_sum(n / 10);
}

int main(void) {
    printf("%d\n", digit_sum(4096));
    return 0;
}
```
```output
19
```

> **Warning:** Every recursive function needs a base case that is always reached. Without one, the function calls itself forever until the program runs out of stack memory and crashes.

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  void fun(int n) {
      if (n > 0) {
          fun(n - 1);
          printf("%d ", n);
          fun(n - 1);
      }
  }
  int main(void) {
      fun(3);
      printf("\n");
      return 0;
  }
- 3 2 1 1 2 1 1
* 1 2 1 3 1 2 1
- 1 2 3 1 2 1 1
- 1 1 2 1 3 1 2
explain: fun(1) prints "1". fun(2) prints fun(1), 2, fun(1) = "1 2 1". fun(3) prints fun(2), 3, fun(2) = "1 2 1 3 1 2 1". This is the same pattern as the Tower of Hanoi moves.
```

```quiz
q: What value does `f(5)` return?
code: c
  #include <stdio.h>
  int f(int n) {
      if (n <= 1) return 1;
      if (n % 2 == 0) return f(n / 2) + 1;
      return f(n - 1) + f(n - 2);
  }
  int main(void) {
      printf("%d\n", f(5));
      return 0;
  }
answer: 6
explain: Build the values from the bottom: f(1) = 1, f(2) = f(1) + 1 = 2 (even), f(3) = f(2) + f(1) = 3 (odd), f(4) = f(2) + 1 = 3 (even) and f(5) = f(4) + f(3) = 3 + 3 = 6 (odd).
```

```quiz
q: How many times is the function `count` called (including the first call) when `count(10)` runs?
code: c
  #include <stdio.h>
  int calls = 0;
  int count(int n) {
      calls++;
      if (n <= 2) return 1;
      return count(n - 1) + count(n - 3);
  }
  int main(void) {
      count(10);
      printf("%d\n", calls);
      return 0;
  }
answer: 55
explain: Let C(n) be the number of calls made by count(n): C(n) = 1 for n ≤ 2, and C(n) = 1 + C(n − 1) + C(n − 3) otherwise. Starting from C(0) = C(1) = C(2) = 1, the values for n = 3 to 10 are 3, 5, 7, 11, 17, 25, 37 and 55. For example C(10) = 1 + C(9) + C(7) = 1 + 37 + 17 = 55.
```
