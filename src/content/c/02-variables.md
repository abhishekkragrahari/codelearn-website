---
title: Variables and Data Types
chapter: Getting Started
description: Declare variables with a type and learn how C stores numbers and characters.
---
In C every variable has a fixed **type** that you write when you declare it. The type tells the compiler how much memory to reserve and how to interpret the bits stored there.

```c
#include <stdio.h>

int main(void) {
    int students = 42;
    float height = 1.68f;
    double pi = 3.14159265;
    char grade = 'A';

    printf("students = %d\n", students);
    printf("height = %.2f m\n", height);
    printf("pi = %.5f\n", pi);
    printf("grade = %c\n", grade);
    return 0;
}
```
```output
students = 42
height = 1.68 m
pi = 3.14159
grade = A
```

## Common types

- `int` holds whole numbers, usually from about minus two billion to plus two billion.
- `float` holds decimals with about 7 digits of precision.
- `double` holds decimals with about 15 digits of precision, and is the usual choice.
- `char` holds a single character, written in single quotes like `'A'`.

You can check how many bytes a type uses with `sizeof`. The exact sizes depend on your machine, but these are typical on a modern computer:

```c
#include <stdio.h>

int main(void) {
    printf("int: %zu bytes\n", sizeof(int));
    printf("double: %zu bytes\n", sizeof(double));
    printf("char: %zu byte\n", sizeof(char));
    return 0;
}
```
```output
int: 4 bytes
double: 8 bytes
char: 1 byte
```

## Integer division

When both sides of `/` are integers, C throws away the fractional part. Make at least one side a decimal to get a decimal result.

```c
#include <stdio.h>

int main(void) {
    int a = 7, b = 2;
    printf("%d / %d = %d\n", a, b, a / b);
    printf("%d %% %d = %d\n", a, b, a % b);
    printf("as double: %.1f\n", (double)a / b);
    return 0;
}
```
```output
7 / 2 = 3
7 % 2 = 1
as double: 3.5
```

> **Note:** `(double)a` is a **cast**. It converts `a` to a `double` just for that calculation. To print a real `%` sign with `printf`, write `%%`.

## Constants

Add `const` to a declaration when a value should never change. The compiler will refuse any later attempt to modify it.

```c
#include <stdio.h>

int main(void) {
    const int DAYS_IN_WEEK = 7;
    int weeks = 3;
    printf("%d weeks = %d days\n", weeks, weeks * DAYS_IN_WEEK);
    return 0;
}
```
```output
3 weeks = 21 days
```

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int a = 7, b = 2;
      float c = a / b;
      float d = (float)a / b;
      printf("%.1f %.1f\n", c, d);
      return 0;
  }
- 3.5 3.5
* 3.0 3.5
- 3.0 3.0
- 3.5 3.0
explain: In `a / b` both operands are int, so integer division gives 3, which is then stored in the float as 3.0. In `(float)a / b` the cast happens first, so the division is done in floating point: 3.5.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      unsigned char c = 250;
      c = c + 10;
      printf("%d\n", c);
      return 0;
  }
answer: 4
explain: An unsigned char holds 0 to 255. 250 + 10 = 260 does not fit, so it wraps around modulo 256: 260 − 256 = 4. Unsigned overflow is well defined in C.
```

```quiz
q: What does the following program print? (Assume 4-byte `int` and 8-byte `double`.)
code: c
  #include <stdio.h>
  int main(void) {
      char c = 'A';
      printf("%zu %zu %zu\n", sizeof(c), sizeof('A'), sizeof(c + 1));
      return 0;
  }
- 1 1 1
* 1 4 4
- 1 1 4
- 4 4 4
explain: c is a char (1 byte). In C (unlike C++), a character constant like 'A' has type int, so sizeof('A') is 4. In `c + 1`, c is promoted to int, so the expression is an int too.
```
