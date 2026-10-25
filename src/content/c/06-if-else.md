---
title: Decisions with if and switch
chapter: Control Flow
description: Choose between paths with if, else if, else and switch.
---
An `if` statement checks a condition in round brackets. If the condition is true (any non-zero value), the block in curly braces runs.

```c
#include <stdio.h>

int main(void) {
    int battery = 15;

    if (battery < 20) {
        printf("Battery low: %d%%\n", battery);
    } else {
        printf("Battery fine.\n");
    }
    return 0;
}
```
```output
Battery low: 15%
```

```flowchart
caption: How the battery check above runs
start: Start
step: battery = 15
if: battery < 20?
  yes:
    io: Print "Battery low"
  no:
    io: Print "Battery fine."
end: return 0
```

## else if chains

Conditions are tested from top to bottom, and only the first matching block runs.

```c
#include <stdio.h>

int main(void) {
    int hour = 14;

    if (hour < 12) {
        printf("Good morning\n");
    } else if (hour < 17) {
        printf("Good afternoon\n");
    } else {
        printf("Good evening\n");
    }
    return 0;
}
```
```output
Good afternoon
```

Use `&&` for "and", `||` for "or" and `!` for "not" when you need to combine conditions.

## switch

When you compare one value against many fixed options, `switch` can be clearer than a long `else if` chain. Each `case` needs a `break`, otherwise execution "falls through" into the next case.

```c
#include <stdio.h>

int main(void) {
    int day = 3;

    switch (day) {
        case 1: printf("Monday\n"); break;
        case 2: printf("Tuesday\n"); break;
        case 3: printf("Wednesday\n"); break;
        default: printf("Another day\n");
    }
    return 0;
}
```
```output
Wednesday
```

> **Warning:** A common bug is writing `if (x = 5)` instead of `if (x == 5)`. A single `=` assigns, so the condition is always true. Compile with `-Wall` and the compiler will warn you.

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int x = 3;
      switch (x) {
          case 1: printf("one ");
          case 3: printf("three ");
          case 4: printf("four ");
          default: printf("other ");
          case 5: printf("five ");
      }
      printf("\n");
      return 0;
  }
- three
- three four
* three four other five
- three four other
explain: There are no `break` statements, so after jumping to `case 3` execution falls through every following label, including `default` and `case 5`, to the end of the switch.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int a = 5;
      if (a = 0)
          printf("zero ");
      else
          printf("nonzero ");
      printf("%d\n", a);
      return 0;
  }
- zero 0
* nonzero 0
- nonzero 5
- zero 5
explain: `a = 0` is an assignment, not a comparison. It sets a to 0, and the value of the expression is 0, which is false, so the else branch runs. a is now 0.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int i = 2, j = 0;
      if (i > 1)
          if (j > 0)
              printf("A\n");
      else
          printf("B\n");
      return 0;
  }
- A
* B
- Nothing
- A and B
explain: This is the "dangling else": an else always pairs with the nearest unmatched if, regardless of indentation. So the else belongs to `if (j > 0)`. i > 1 is true and j > 0 is false, so it prints B.
```
