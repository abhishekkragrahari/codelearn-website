---
title: Unions, Enums and typedef
chapter: Structures and Files
description: Share memory between members with unions, name constants with enums, and understand struct sizes and padding.
---
## Unions

A **union** looks like a struct, but all its members share the **same memory**. Its size is the size of its largest member (plus any padding), and only one member holds a meaningful value at a time. Unions save memory when a value can be one of several types.

```c
#include <stdio.h>

union Value {
    int i;
    float f;
    char c;
};

struct Both {
    int i;
    float f;
    char c;
};

int main(void) {
    union Value v;
    v.i = 65;
    printf("as int: %d, as char: %c\n", v.i, v.c);   /* low byte of 65 is 'A' on little-endian machines */
    v.f = 1.5f;                                       /* overwrites the same bytes */
    printf("as float: %.1f\n", v.f);
    printf("sizeof(union Value) = %zu, sizeof(struct Both) = %zu\n", sizeof(union Value), sizeof(struct Both));
    return 0;
}
```
```output
as int: 65, as char: A
as float: 1.5
sizeof(union Value) = 4, sizeof(struct Both) = 12
```

## Struct padding

Compilers insert **padding** bytes so that each member starts at an address that is a multiple of its own size (its *alignment*), and round the whole struct up to a multiple of its largest alignment. So the order of members changes the size.

```c
#include <stdio.h>

struct A { char c1; int i; char c2; };    /* 1 + 3 pad + 4 + 1 + 3 pad */
struct B { int i; char c1; char c2; };    /* 4 + 1 + 1 + 2 pad */
struct C { char c; double d; };           /* 1 + 7 pad + 8 */

int main(void) {
    printf("A: %zu, B: %zu, C: %zu\n", sizeof(struct A), sizeof(struct B), sizeof(struct C));
    return 0;
}
```
```output
A: 12, B: 8, C: 16
```

The exact sizes depend on the platform; the values above are for a typical 64-bit system with 4-byte `int` and 8-byte `double`.

## Enums

An **enum** gives names to integer constants. Values start at 0 and go up by 1 unless you set them.

```c
#include <stdio.h>

enum Color { RED, GREEN, BLUE };                 /* 0, 1, 2 */
enum Level { LOW = 10, MEDIUM, HIGH = 50, MAX }; /* 10, 11, 50, 51 */

int main(void) {
    enum Color c = BLUE;
    printf("RED=%d GREEN=%d BLUE=%d\n", RED, GREEN, BLUE);
    printf("LOW=%d MEDIUM=%d HIGH=%d MAX=%d\n", LOW, MEDIUM, HIGH, MAX);
    switch (c) {
        case RED:   printf("stop\n");  break;
        case GREEN: printf("go\n");    break;
        case BLUE:  printf("calm\n");  break;
    }
    return 0;
}
```
```output
RED=0 GREEN=1 BLUE=2
LOW=10 MEDIUM=11 HIGH=50 MAX=51
calm
```

## typedef

`typedef` creates a new name for an existing type. It is often combined with structs, unions and function pointers to make code readable.

```c
#include <stdio.h>

typedef unsigned long ulong;
typedef struct { int x, y; } Point;
typedef int (*BinaryOp)(int, int);

int sub(int a, int b) { return a - b; }

int main(void) {
    ulong big = 4000000000UL;
    Point p = {3, 4};
    BinaryOp op = sub;
    printf("%lu %d %d\n", big, p.x + p.y, op(10, 3));
    return 0;
}
```
```output
4000000000 7 7
```

## GATE-style practice questions

```quiz
q: What does the following program print? (Assume 4-byte `int`, 8-byte `double`, and the usual alignment rules of a 64-bit system.)
code: c
  #include <stdio.h>
  union U { int a; double b; char c[10]; };
  int main(void) {
      printf("%zu\n", sizeof(union U));
      return 0;
  }
answer: 16
explain: A union is as large as its largest member, here the 10-byte char array, rounded up to a multiple of the strictest alignment among its members (8, for double). The smallest multiple of 8 that holds 10 bytes is 16.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  enum E { A = 3, B, C = 1, D, F = B + D };
  int main(void) {
      printf("%d\n", F);
      return 0;
  }
answer: 6
explain: A = 3, so B = 4. C is set to 1, so D = 2. F = B + D = 4 + 2 = 6.
```

```quiz
q: What does the following program print? (Assume 4-byte `int` and 1-byte `char` with natural alignment.)
code: c
  #include <stdio.h>
  struct S1 { char a; int b; char c; };
  struct S2 { int b; char a; char c; };
  int main(void) {
      printf("%zu %zu\n", sizeof(struct S1), sizeof(struct S2));
      return 0;
  }
- 6 6
- 12 12
* 12 8
- 8 12
explain: In S1, `a` takes 1 byte, 3 padding bytes align `b` to offset 4, `c` is at offset 8, and the struct is padded to a multiple of 4: 12. In S2, b (4) + a (1) + c (1) = 6, padded to 8.
```

```quiz
q: Which statements about unions are **true**? (Select all that apply.)
* All members of a union start at the same memory address
* The size of a union is at least the size of its largest member
- Each member of a union has its own separate storage
* Writing one member and then reading a different one reinterprets the same bytes
explain: Members share one block of memory starting at the same address, so a union is at least as large as its largest member, and writing one member overwrites the others' bytes.
```
