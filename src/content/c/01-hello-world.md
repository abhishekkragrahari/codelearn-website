---
title: Your First C Program
chapter: Getting Started
description: What C is, how a C program is compiled, and the classic hello program.
---
C is a compact language created in the early 1970s. It gives you direct control over memory and produces very fast programs, which is why it is still used for operating systems, microcontrollers and performance-critical libraries.

Unlike Python, C is **compiled**: a program called a compiler turns your source file into a machine-code executable, and then you run that executable.

## Setting up a compiler

- **Linux:** install `gcc` from your package manager (for example `sudo apt install build-essential`).
- **macOS:** run `xcode-select --install` to get `clang`, which works the same way.
- **Windows:** install MSYS2 or MinGW-w64 to get `gcc`, or use an IDE such as Code::Blocks.

## Hello, world

Save this as `hello.c`:

```c
#include <stdio.h>

int main(void) {
    printf("Hello, world!\n");
    return 0;
}
```
```output
Hello, world!
```

Compile and run it from a terminal:

```text
gcc hello.c -o hello
./hello
```

## What each line does

- `#include <stdio.h>` brings in the standard input/output library, which provides `printf`.
- `int main(void)` is where every C program starts. It returns an `int` to the operating system.
- `printf(...)` prints text. The `\n` at the end means "new line"; C does not add one for you.
- `return 0;` tells the system the program finished without errors.
- Every statement ends with a semicolon `;`, and curly braces `{ }` group statements together.

> **Tip:** If you forget a semicolon, the compiler will stop and point to the line. Reading compiler errors carefully is a skill worth practising early.

## Printing numbers

`printf` uses **format specifiers** to insert values into text: `%d` for whole numbers and `%f` for decimals.

```c
#include <stdio.h>

int main(void) {
    printf("%d + %d = %d\n", 7, 5, 7 + 5);
    printf("Half of 9 is %.1f\n", 9 / 2.0);
    return 0;
}
```
```output
7 + 5 = 12
Half of 9 is 4.5
```

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      printf("GATE");
      printf(" %d\n", printf("CS"));
      return 0;
  }
- GATE CS 2
* GATECS 2
- GATE 2CS
- CS GATE 2
explain: `printf` returns the number of characters it printed. The inner `printf("CS")` must run before the outer call (its result is an argument), so it prints CS right after GATE and returns 2. The outer call then prints " 2" and a newline.
```

```quiz
q: Which statements about a C program's `main` function are **true**? (Select all that apply.)
* Execution of the program starts at `main`
* `return 0;` from main usually tells the operating system the program succeeded
- A program may define two functions named `main`
* `int main(void)` declares a main that takes no arguments
explain: There must be exactly one main. It is where execution begins, and its return value (0 for success) goes back to the operating system.
```
