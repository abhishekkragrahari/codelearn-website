---
title: The Preprocessor and Macros
chapter: Preprocessor and Practice
description: #include, #define, macro pitfalls, conditional compilation and predefined macros.
---
Before the compiler proper sees your code, the **preprocessor** runs. It handles lines starting with `#`: it pastes in header files, replaces macros with their definitions, and keeps or removes code depending on conditions. It works on **text**, not on C values, which is the source of many tricky GATE questions.

```pipeline
caption: How a C program is built
main.c | your code
preprocessor | #include, #define
compiler | to assembly / object code
linker | joins libraries
program | executable
```

You can see the preprocessed text with `gcc -E main.c`.

## Object-like and function-like macros

```c
#include <stdio.h>

#define PI 3.14159
#define MAX_STUDENTS 60
#define SQUARE_BAD(x) x * x
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void) {
    printf("%.2f\n", PI * 2 * 2);
    printf("%d\n", SQUARE_BAD(2 + 3));   /* expands to 2 + 3 * 2 + 3 */
    printf("%d\n", SQUARE(2 + 3));       /* expands to ((2 + 3) * (2 + 3)) */
    printf("%d\n", MAX(7, MAX_STUDENTS));
    return 0;
}
```
```output
12.57
11
25
60
```

Because a macro is pure text substitution, `SQUARE_BAD(2 + 3)` becomes `2 + 3 * 2 + 3`, which is 11, not 25. **Always put brackets around every parameter and around the whole body.**

> **Warning:** Even a fully bracketed macro evaluates its argument more than once. `SQUARE(i++)` becomes `((i++) * (i++))`, which modifies `i` twice: undefined behaviour. Use a function (or an `inline` function) when arguments may have side effects.

## Stringizing and token pasting

Inside a macro, `#x` turns an argument into a string literal, and `a ## b` glues two tokens into one.

```c
#include <stdio.h>

#define SHOW(expr) printf(#expr " = %d\n", expr)
#define MAKE_VAR(n) var_ ## n

int main(void) {
    int MAKE_VAR(1) = 10, MAKE_VAR(2) = 20;   /* declares var_1 and var_2 */
    SHOW(var_1 + var_2);
    SHOW(7 * 6);
    return 0;
}
```
```output
var_1 + var_2 = 30
7 * 6 = 42
```

## Conditional compilation

`#if`, `#ifdef`, `#ifndef`, `#else` and `#endif` keep or drop code before compilation. This is used for debug output, platform-specific code, and **include guards** that stop a header from being included twice.

```c
#include <stdio.h>

#define DEBUG 1
#define VERSION 3

int main(void) {
#if DEBUG
    printf("debug mode is on\n");
#endif

#if VERSION >= 2
    printf("using the new algorithm\n");
#else
    printf("using the old algorithm\n");
#endif

#ifndef MAX_USERS
#define MAX_USERS 100
#endif
    printf("MAX_USERS = %d\n", MAX_USERS);
    printf("compiled from %s, line %d\n", "main.c", __LINE__);
    return 0;
}
```
```output
debug mode is on
using the new algorithm
MAX_USERS = 100
compiled from main.c, line 21
```

```text
/* point.h with an include guard */
#ifndef POINT_H
#define POINT_H
typedef struct { int x, y; } Point;
#endif
```

`__LINE__`, `__FILE__`, `__DATE__` and `__func__` are **predefined** identifiers that are handy in error messages.

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  #define CUBE(x) x * x * x
  int main(void) {
      int a = 3;
      printf("%d\n", CUBE(a + 1));
      return 0;
  }
answer: 10
explain: The macro expands as text to `a + 1 * a + 1 * a + 1` = 3 + 3 + 3 + 1 = 10, not 64. Bracketing as `((x) * (x) * (x))` would give 64.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  #define DOUBLE(x) (x + x)
  #define HALF(x) x / 2
  int main(void) {
      printf("%d\n", DOUBLE(4) * HALF(8 + 2));
      return 0;
  }
answer: 65
explain: DOUBLE(4) expands to `(4 + 4)` and HALF(8 + 2) to `8 + 2 / 2`, so the whole expression is `(4 + 4) * 8 + 2 / 2`. Multiplication and division come before addition: 8 × 8 = 64 and 2 / 2 = 1, giving 65. The intended answer, 8 × 5 = 40, needs brackets in HALF.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  #define PRODUCT(a, b) a * b
  int main(void) {
      int x = 2, y = 3;
      printf("%d\n", PRODUCT(x + 1, y + 1));
      return 0;
  }
- 12
* 6
- 9
- 7
explain: The expansion is `x + 1 * y + 1` = 2 + 3 + 1 = 6. Only with brackets, `((a) * (b))`, would it give 3 × 4 = 12.
```
