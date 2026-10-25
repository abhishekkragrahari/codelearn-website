---
title: Pointers
chapter: Pointers and Memory
description: Understand memory addresses and variables that store them.
---
Every variable lives somewhere in memory, and that location has an **address**. A **pointer** is a variable that stores an address. Pointers are what make C powerful: they let functions change their caller's variables, and they are the basis of arrays and dynamic memory.

## & and *

- `&x` gives the address of `x`.
- `int *p` declares `p` as a pointer to an `int`.
- `*p` (called **dereferencing**) means "the value at the address stored in `p`".

```c
#include <stdio.h>

int main(void) {
    int score = 50;
    int *p = &score;     /* p now points to score */

    printf("score = %d\n", score);
    printf("*p = %d\n", *p);

    *p = 75;             /* change score through the pointer */
    printf("score is now %d\n", score);
    return 0;
}
```
```output
score = 50
*p = 50
score is now 75
```

You can print an address with `printf("%p\n", (void *)p);`, but the number will be different every time you run the program.

## Changing a variable inside a function

C passes arguments by value, so a function normally gets a copy. Pass a pointer and the function can change the original.

```c
#include <stdio.h>

void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x = 3, y = 8;
    swap(&x, &y);
    printf("x = %d, y = %d\n", x, y);
    return 0;
}
```
```output
x = 8, y = 3
```

This is exactly why `scanf("%d", &n)` needs the `&`: `scanf` has to write into your variable.

## Returning more than one result

```c
#include <stdio.h>

void divide(int a, int b, int *quotient, int *remainder) {
    *quotient = a / b;
    *remainder = a % b;
}

int main(void) {
    int q, r;
    divide(47, 6, &q, &r);
    printf("47 = 6 * %d + %d\n", q, r);
    return 0;
}
```
```output
47 = 6 * 7 + 5
```

## NULL pointers

A pointer that points to nothing should be set to `NULL`. Always check before dereferencing a pointer that might be `NULL`.

```c
#include <stdio.h>

int main(void) {
    int *p = NULL;
    if (p == NULL) {
        printf("p does not point anywhere yet\n");
    }
    return 0;
}
```
```output
p does not point anywhere yet
```

> **Warning:** Dereferencing `NULL` or an uninitialised pointer is undefined behaviour and usually crashes the program with a "segmentation fault".

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int a = 5, b = 10;
      int *p = &a, *q = &b;
      *p = *q + 1;
      p = q;
      *p = *p * 2;
      printf("%d %d\n", a, b);
      return 0;
  }
- 11 10
* 11 20
- 22 10
- 10 20
explain: *p = *q + 1 stores 10 + 1 = 11 in a. Then p = q makes p point to b, so *p = *p * 2 doubles b to 20.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  void update(int *x, int y) {
      *x = *x + y;
      y = y * 2;
  }
  int main(void) {
      int a = 3, b = 4;
      update(&a, b);
      update(&b, a);
      printf("%d %d\n", a, b);
      return 0;
  }
- 7 4
* 7 11
- 7 15
- 3 11
explain: The first call adds 4 to a through the pointer: a = 7 (changing y inside does not affect b). The second call adds the current a (7) to b: b = 11.
```
