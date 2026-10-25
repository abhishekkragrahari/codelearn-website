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

## GATE-style practice questions

```quiz
q: What does the following program print? (The `_` characters are not printed; they are only to show where the output starts and ends.)
code: c
  #include <stdio.h>
  int main(void) {
      printf("_%5.2f_%-4d_%04d_\n", 3.14159, 42, 42);
      return 0;
  }
- _3.14_42_0042_
* _ 3.14_42  _0042_
- _3.14 _  42_42  _
- _ 3.14_  42_0042_
explain: `%5.2f` prints 3.14 (4 characters) right-aligned in width 5, adding one space in front. `%-4d` prints 42 left-aligned in width 4, adding two spaces after. `%04d` pads with zeros to width 4: 0042.
```

```quiz
q: The call `scanf("%d %d", &a, &b)` is given the input `12 abc`. What value does `scanf` return?
answer: 1
verify: 1
explain: scanf returns the number of items successfully read and stored. 12 is read into a, then reading an int from "abc" fails, so it stops and returns 1.
```
