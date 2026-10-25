---
title: Functions in C
chapter: Functions
description: Split a program into small functions with parameters and return types.
---
A function in C has a **return type**, a name, and a list of parameters, each with its own type. Here is a function that takes two `int` values and returns their larger one.

```c
#include <stdio.h>

int max_of(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}

int main(void) {
    printf("Larger: %d\n", max_of(8, 13));
    printf("Larger: %d\n", max_of(-2, -9));
    return 0;
}
```
```output
Larger: 13
Larger: -2
```

## void functions

If a function does not return anything, its return type is `void`.

```c
#include <stdio.h>

void print_line(int length) {
    for (int i = 0; i < length; i++) {
        printf("-");
    }
    printf("\n");
}

int main(void) {
    print_line(10);
    printf("  Report\n");
    print_line(10);
    return 0;
}
```
```output
----------
  Report
----------
```

## Declaring before use

The compiler reads your file from top to bottom. If you want to put `main` first, write a **prototype** (just the first line of the function followed by a semicolon) above it.

```c
#include <stdio.h>

double celsius_to_fahrenheit(double c);   /* prototype */

int main(void) {
    printf("37 C = %.1f F\n", celsius_to_fahrenheit(37));
    return 0;
}

double celsius_to_fahrenheit(double c) {
    return c * 9 / 5 + 32;
}
```
```output
37 C = 98.6 F
```

> **Tip:** C passes arguments **by value**: the function receives a copy. Changing a parameter inside the function does not change the caller's variable. To change the original you will later learn to pass a pointer.
