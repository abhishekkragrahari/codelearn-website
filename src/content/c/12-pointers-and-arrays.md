---
title: Pointers and Arrays
chapter: Pointers and Memory
description: See how arrays and pointers are related, and use pointer arithmetic.
---
In most expressions, the name of an array turns into a pointer to its first element. That is why a function receiving an array can change it: it receives the address, not a copy.

```c
#include <stdio.h>

int main(void) {
    int nums[] = {10, 20, 30, 40};
    int *p = nums;          /* same as &nums[0] */

    printf("%d %d\n", *p, nums[0]);
    printf("%d %d\n", *(p + 2), nums[2]);
    return 0;
}
```
```output
10 10
30 30
```

## Pointer arithmetic

Adding 1 to a pointer moves it to the **next element**, not the next byte. The compiler multiplies by the element size for you. In fact `arr[i]` is defined as `*(arr + i)`.

```c
#include <stdio.h>

int main(void) {
    double values[] = {1.5, 2.5, 3.5};
    double *end = values + 3;
    double total = 0;

    for (double *p = values; p < end; p++) {
        total += *p;
    }
    printf("total = %.1f\n", total);
    printf("elements between: %ld\n", (long)(end - values));
    return 0;
}
```
```output
total = 7.5
elements between: 3
```

## Strings as char pointers

A string literal can be stored through a `const char *`. Walking through it with a pointer is a common C idiom.

```c
#include <stdio.h>

int my_strlen(const char *s) {
    const char *start = s;
    while (*s != '\0') {
        s++;
    }
    return (int)(s - start);
}

int main(void) {
    const char *msg = "pointers";
    printf("%d\n", my_strlen(msg));
    printf("%s\n", msg + 5);   /* the text starting at index 5 */
    return 0;
}
```
```output
8
ers
```

> **Note:** `const` here promises that the function will not modify the characters. Modifying a string literal is not allowed in C, so marking such pointers `const` lets the compiler catch mistakes.
