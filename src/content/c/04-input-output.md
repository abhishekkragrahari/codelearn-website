---
title: Input and Output
chapter: Getting Started
description: Read numbers and text from the keyboard with scanf and format output with printf.
---
`printf` writes formatted output, and its partner `scanf` reads formatted input. Both live in `stdio.h`.

## Reading a number

`scanf` needs the **address** of the variable to fill, which you get with `&`. You will learn more about addresses in the pointers lesson.

```c
#include <stdio.h>

int main(void) {
    int age;
    printf("Enter your age: ");
    scanf("%d", &age);
    printf("In ten years you will be %d.\n", age + 10);
    return 0;
}
```

A sample run, where the user typed `19`:

```text
Enter your age: 19
In ten years you will be 29.
```

## Reading several values

One `scanf` call can read several values separated by spaces. It returns how many values it read successfully, which is a simple way to check the input.

```c
#include <stdio.h>

int main(void) {
    double length, width;
    printf("Enter length and width: ");
    if (scanf("%lf %lf", &length, &width) != 2) {
        printf("Please enter two numbers.\n");
        return 1;
    }
    printf("Area = %.2f\n", length * width);
    return 0;
}
```

> **Note:** Use `%d` for `int`, `%f` for `float`, `%lf` for `double` and `%c` for `char` when reading with `scanf`.

## Format specifiers for printf

```c
#include <stdio.h>

int main(void) {
    int qty = 3;
    double price = 49.5;
    char grade = 'A';

    printf("[%d]\n", qty);
    printf("[%5d]\n", qty);      /* right-aligned in 5 spaces */
    printf("[%-5d]\n", qty);     /* left-aligned in 5 spaces */
    printf("[%05d]\n", qty);     /* padded with zeros */
    printf("[%.2f]\n", price);
    printf("[%8.1f]\n", price);
    printf("[%c] [%s]\n", grade, "text");
    return 0;
}
```
```output
[3]
[    3]
[3    ]
[00003]
[49.50]
[    49.5]
[A] [text]
```
