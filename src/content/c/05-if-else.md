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
