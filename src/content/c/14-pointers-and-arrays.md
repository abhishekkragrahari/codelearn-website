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

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int a[] = {5, 10, 15, 20, 25};
      int *p = a + 1;
      printf("%d\n", *p + *(p + 2) + p[-1]);
      return 0;
  }
answer: 35
explain: p points to a[1] = 10. *(p + 2) is a[3] = 20 and p[-1] is a[0] = 5. So 10 + 20 + 5 = 35.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int a[] = {1, 2, 3, 4, 5};
      int *p = a;
      int x = *p++;
      int y = *++p;
      int z = ++*p;
      printf("%d %d %d %d\n", x, y, z, a[2]);
      return 0;
  }
- 1 2 3 3
* 1 3 4 4
- 2 3 4 3
- 1 3 3 4
explain: `*p++` reads a[0] = 1 and then moves p to a[1]. `*++p` first moves p to a[2] and reads 3. `++*p` increments a[2] itself to 4 and gives 4. So x = 1, y = 3, z = 4 and a[2] = 4.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      char *s = "COMPUTER";
      printf("%c%c%c\n", *(s + 3), s[5], *s + 1);
      return 0;
  }
- PTC
* PTD
- MUD
- PUD
explain: In "COMPUTER", index 3 is 'P' and index 5 is 'T'. `*s + 1` is 'C' + 1, which is 'D' (dereference binds tighter than +).
```
