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
