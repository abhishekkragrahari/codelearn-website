---
title: Advanced Pointers
chapter: Pointers and Memory
description: Pointers to pointers, pointers and 2-D arrays, arrays of pointers, and function pointers.
---
Once single pointers are comfortable, GATE questions combine them: pointers to pointers, pointers into 2-D arrays and pointers to functions. The key skill is reading the **type** of each expression.

## Pointer to pointer

A pointer is a variable too, so it has an address, and another pointer can store that address.

```pipeline
caption: pp points to p, and p points to x
pp | int ** : address of p
p | int * : address of x
x | int : 42
```

```c
#include <stdio.h>

void set_to_null(int **pp) {   /* change the caller's pointer */
    *pp = NULL;
}

int main(void) {
    int x = 42;
    int *p = &x;
    int **pp = &p;

    printf("x = %d, *p = %d, **pp = %d\n", x, *p, **pp);
    **pp = 50;                    /* changes x through two levels */
    printf("x is now %d\n", x);

    set_to_null(&p);
    printf("p is %s\n", p == NULL ? "NULL" : "not NULL");
    return 0;
}
```
```output
x = 42, *p = 42, **pp = 42
x is now 50
p is NULL
```

To let a function change a variable you pass its address; to let a function change a **pointer**, you pass the address of the pointer (`int **`).

## Pointers and 2-D arrays

For `int a[3][4]`, the name `a` decays to a pointer to its first **row**, of type `int (*)[4]`. So `a + 1` skips a whole row of 4 ints, while `*(a + 1)` is that row (an `int *` to its first element).

| Expression | Type | Meaning |
| --- | --- | --- |
| `a` | `int (*)[4]` | address of row 0 |
| `a + i` | `int (*)[4]` | address of row i |
| `*(a + i)` or `a[i]` | `int *` (decayed) | address of `a[i][0]` |
| `*(a + i) + j` | `int *` | address of `a[i][j]` |
| `*(*(a + i) + j)` | `int` | the value `a[i][j]` |

```c
#include <stdio.h>

int main(void) {
    int a[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    printf("%d %d\n", *(*(a + 1) + 2), a[1][2]);
    printf("sizeof(a) = %zu, sizeof(a[0]) = %zu, sizeof(a[0][0]) = %zu\n",
           sizeof(a), sizeof(a[0]), sizeof(a[0][0]));

    int (*row)[4] = a;            /* pointer to an array of 4 ints */
    row++;                        /* now points to row 1 */
    printf("first element of the next row: %d\n", (*row)[0]);

    int *flat = &a[0][0];         /* the 12 ints are contiguous */
    printf("flat[7] = %d\n", flat[7]);
    return 0;
}
```
```output
7 7
sizeof(a) = 48, sizeof(a[0]) = 16, sizeof(a[0][0]) = 4
first element of the next row: 5
flat[7] = 8
```

## Arrays of pointers

`char *names[3]` is an array of 3 pointers; each can point to a string of any length. Compare `int (*p)[4]` (one pointer to an array of 4 ints) with `int *p[4]` (an array of 4 pointers): the brackets change everything.

```c
#include <stdio.h>

int main(void) {
    const char *days[] = {"Mon", "Tue", "Wednesday"};
    for (int i = 0; i < 3; i++) {
        printf("%s has first letter %c\n", days[i], *days[i]);
    }
    printf("%c\n", days[2][3]);   /* the 4th character of "Wednesday" */
    return 0;
}
```
```output
Mon has first letter M
Tue has first letter T
Wednesday has first letter W
n
```

## Function pointers

A function also has an address. A **function pointer** stores it, so you can choose which function to call at run time, as callbacks and `qsort` do.

```c
#include <stdio.h>
#include <stdlib.h>

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int apply(int (*op)(int, int), int x, int y) {
    return op(x, y);
}

int compare_desc(const void *a, const void *b) {
    return *(const int *)b - *(const int *)a;
}

int main(void) {
    int (*f)(int, int) = add;          /* f points to add */
    printf("%d\n", f(3, 4));
    f = mul;
    printf("%d\n", f(3, 4));
    printf("%d\n", apply(add, 10, 5));

    int nums[] = {4, 9, 1, 7};
    qsort(nums, 4, sizeof(int), compare_desc);
    printf("%d %d %d %d\n", nums[0], nums[1], nums[2], nums[3]);
    return 0;
}
```
```output
7
12
15
9 7 4 1
```

> **Tip:** Read complex declarations from the name outwards, going right before left: `int (*f)(int, int)` is "f is a pointer to a function taking (int, int) and returning int".

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
      int *p = &a[0][0];
      printf("%d\n", *(p + 4) + *(*(a + 1)) + **a);
      return 0;
  }
answer: 10
explain: The 6 ints are stored row by row: 1 2 3 4 5 6. p + 4 points to the 5th one, 5. *(a + 1) is row 1, and * of it is a[1][0] = 4. **a is a[0][0] = 1. So 5 + 4 + 1 = 10.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  void f(int **q) {
      static int y = 30;
      **q = 20;
      *q = &y;
  }
  int main(void) {
      int x = 10, *p = &x;
      f(&p);
      printf("%d %d\n", x, *p);
      return 0;
  }
- 10 30
* 20 30
- 20 20
- 30 30
explain: Inside f, q points to p. `**q = 20` writes through p into x, so x becomes 20. `*q = &y` then makes p point to the static y (30). Back in main, x is 20 and *p is 30.
```

```quiz
q: On a system where `int` is 4 bytes, `int a[5][6];` starts at address 1000. What is the value of `(char *)(a + 2) - (char *)a`, the number of bytes between `a` and `a + 2`?
answer: 48
verify: 2 * 6 * 4
explain: a decays to a pointer to a row of 6 ints (24 bytes), so a + 2 is 2 rows = 48 bytes further on.
```

```quiz
q: Which declaration declares `p` as a **pointer to an array of 10 integers**?
- `int *p[10];`
* `int (*p)[10];`
- `int *(p[10]);`
- `int **p;`
explain: Without brackets, `[]` binds tighter than `*`, so `int *p[10]` and `int *(p[10])` both declare an array of 10 pointers. The brackets in `int (*p)[10]` make p a pointer first, to an array of 10 ints.
```
