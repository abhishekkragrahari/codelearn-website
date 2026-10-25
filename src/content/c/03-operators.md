---
title: Operators
chapter: Getting Started
description: Arithmetic, comparison, logical and increment operators in C.
---
C has a rich set of operators. Most look the same as in other languages, but a few, such as `++` and the way integer division works, deserve special attention.

## Arithmetic

```c
#include <stdio.h>

int main(void) {
    int a = 17, b = 5;
    printf("a + b = %d\n", a + b);
    printf("a - b = %d\n", a - b);
    printf("a * b = %d\n", a * b);
    printf("a / b = %d\n", a / b);
    printf("a %% b = %d\n", a % b);
    printf("17.0 / 5 = %.1f\n", 17.0 / 5);
    return 0;
}
```
```output
a + b = 22
a - b = 12
a * b = 85
a / b = 3
a % b = 2
17.0 / 5 = 3.4
```

Remember: with two integers, `/` throws away the remainder.

## Increment, decrement and compound assignment

`x++` adds one to `x`, and `x--` subtracts one. Compound operators such as `+=` and `*=` update a variable in place.

```c
#include <stdio.h>

int main(void) {
    int count = 10;
    count++;
    count += 5;
    count *= 2;
    count--;
    printf("count = %d\n", count);

    int i = 5;
    int x = i++;   /* x gets the old value, then i becomes 6 */
    int y = ++i;   /* i becomes 7 first, then y gets 7 */
    printf("x = %d, y = %d, i = %d\n", x, y, i);
    return 0;
}
```
```output
count = 31
x = 5, y = 7, i = 7
```

> **Tip:** The difference between `i++` and `++i` only matters when you use the result in the same expression. On a line by itself, both simply add one.

## Comparison and logical operators

In C, a comparison gives `1` for true and `0` for false.

```c
#include <stdio.h>

int main(void) {
    int age = 20;
    int has_id = 1;

    printf("%d\n", age >= 18);
    printf("%d\n", age == 21);
    printf("%d\n", age >= 18 && has_id);
    printf("%d\n", age < 13 || age > 65);
    printf("%d\n", !has_id);
    return 0;
}
```
```output
1
0
1
0
0
```

## The ternary operator

`condition ? a : b` picks one of two values.

```c
#include <stdio.h>

int main(void) {
    int n = 7;
    printf("%d is %s\n", n, n % 2 == 0 ? "even" : "odd");
    return 0;
}
```
```output
7 is odd
```

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int i = 5;
      int j = i++ + 10;
      int k = ++i * 2;
      printf("%d %d %d\n", i, j, k);
      return 0;
  }
- 7 16 14
* 7 15 14
- 6 15 12
- 7 15 12
explain: `i++ + 10` uses the old value 5 (j = 15) and then i becomes 6. `++i * 2` first makes i 7, then k = 14. Each statement modifies i only once, so the behaviour is well defined.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int a = 0, b = 5;
      if (a && ++b)
          printf("inside ");
      printf("%d\n", b);
      return 0;
  }
answer: 5
explain: `&&` short-circuits: since a is 0 (false), the right side `++b` is never evaluated, so b stays 5 and "inside" is not printed.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int x = 10;
      int y = x > 5 ? x < 8 ? 1 : 2 : 3;
      printf("%d\n", y + (17 % 5) * 2 - 7 / 2);
      return 0;
  }
answer: 3
explain: The ternary groups right to left: x > 5 is true, then x < 8 is false, so y = 2. Then 17 % 5 = 2 and 7 / 2 = 3 (integer division): 2 + 2 × 2 − 3 = 3.
```
