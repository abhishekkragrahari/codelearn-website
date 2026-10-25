---
title: Scope and Storage Classes
chapter: Functions
description: Where a variable is visible, how long it lives, and what auto, static, extern and register mean.
---
Every C variable has a **scope** (where in the code its name is visible) and a **lifetime** (how long its storage exists). The **storage class** keywords control them.

| Storage class | Declared | Scope | Lifetime | Default initial value |
| --- | --- | --- | --- | --- |
| `auto` (the default for locals) | inside a block | that block | until the block ends | garbage (indeterminate) |
| `register` | inside a block | that block | until the block ends | garbage; you cannot take its address |
| `static` (local) | inside a block | that block | the **whole program** | 0 |
| `static` (global) | outside functions | **this file only** | the whole program | 0 |
| global (no keyword) | outside functions | whole program (with `extern` in other files) | the whole program | 0 |
| `extern` | anywhere | declares a global defined elsewhere | — | — |

## Block scope and shadowing

A variable declared inside `{ }` exists only inside those braces. An inner variable with the same name **shadows** the outer one.

```c
#include <stdio.h>

int x = 100;                 /* global */

int main(void) {
    printf("global x = %d\n", x);
    int x = 10;              /* local x shadows the global one */
    {
        int x = 1;           /* shadows the outer local x */
        printf("inner block x = %d\n", x);
    }
    printf("main's x = %d\n", x);
    return 0;
}
```
```output
global x = 100
inner block x = 1
main's x = 10
```

## static local variables keep their value

An ordinary local variable is created fresh on every call. A **static** local is created **once**, initialised once, and keeps its value between calls. This is one of the most frequently asked C topics in GATE.

```c
#include <stdio.h>

int counter(void) {
    static int calls = 0;    /* initialised only once */
    int fresh = 0;           /* re-created on every call */
    calls++;
    fresh++;
    printf("calls = %d, fresh = %d\n", calls, fresh);
    return calls;
}

int main(void) {
    counter();
    counter();
    counter();
    return 0;
}
```
```output
calls = 1, fresh = 1
calls = 2, fresh = 1
calls = 3, fresh = 1
```

## Globals, static globals and extern

In a program made of several `.c` files:

```text
/* file a.c */
int shared = 5;          /* global: other files may use it */
static int hidden = 7;   /* static global: visible only inside a.c */

/* file b.c */
extern int shared;       /* declaration: "shared is defined in another file" */
void show(void) { printf("%d\n", shared); }   /* OK */
/* using hidden here would fail to link */
```

`static` on a global (or a function) gives it **internal linkage**: it is private to its file. This avoids name clashes in large programs.

## Recursion with static variables

Static variables are shared by **all** calls of a function, including recursive ones. Trace such code carefully.

```c
#include <stdio.h>

int f(int n) {
    static int total = 0;
    if (n == 0) return total;
    total += n;
    return f(n - 1);
}

int main(void) {
    printf("%d\n", f(4));    /* 4 + 3 + 2 + 1 */
    printf("%d\n", f(2));    /* total was NOT reset: 10 + 2 + 1 */
    return 0;
}
```
```output
10
13
```

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int fun(void) {
      static int n = 5;
      return n--;
  }
  int main(void) {
      int a = fun();
      int b = fun();
      int c = fun();
      printf("%d\n", a + b + c);
      return 0;
  }
answer: 12
explain: n is static, so it survives between calls and is initialised to 5 only once. `return n--` returns the old value and then decrements, so the three calls return 5, 4 and 3. Their sum is 12.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int x = 10;
  void change(void) {
      int x = 20;
      x++;
  }
  int main(void) {
      change();
      x += 5;
      printf("%d\n", x);
      return 0;
  }
answer: 15
explain: Inside change(), the local x (20) shadows the global, so x++ changes only the local copy, which disappears when the function returns. main then adds 5 to the global x: 10 + 5 = 15.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int count(int n) {
      static int calls = 0;
      calls++;
      if (n <= 1) return calls;
      return count(n / 2);
  }
  int main(void) {
      printf("%d ", count(16));
      printf("%d\n", count(4));
      return 0;
  }
- 5 3
* 5 8
- 4 7
- 5 5
explain: count(16) recurses through 16, 8, 4, 2, 1: five calls, so it returns 5. The static counter is not reset, so count(4) adds three more calls (4, 2, 1) and returns 8.
```

```quiz
q: Which statements about storage classes in C are **true**? (Select all that apply.)
* A static local variable is initialised only once, before the first call
* An uninitialised global variable starts with the value 0
- A static global variable can be accessed from other source files using extern
* The address of a register variable cannot be taken with &
explain: A static global has internal linkage, so other files cannot see it, even with extern. The other three statements are rules of the C standard.
```
