---
title: Loops in C
chapter: Control Flow
description: Repeat work with for, while and do-while loops.
---
C has three loops. They can all do the same job, but each one reads best in a different situation.

## The for loop

A `for` loop packs three parts into its header: a starting step, a condition, and an update that runs after every round.

```c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d squared is %d\n", i, i * i);
    }
    return 0;
}
```
```output
1 squared is 1
2 squared is 4
3 squared is 9
4 squared is 16
5 squared is 25
```

```flowchart
caption: The three parts of a for loop
start: Start
step: int i = 1 (runs once)
while: i <= 5?
  io: printf the square
  step: i++ (after each round)
end: End
```

`i++` is shorthand for `i = i + 1`.

## The while loop

A `while` loop is handy when you do not know in advance how many rounds you need.

```c
#include <stdio.h>

int main(void) {
    int n = 1234;
    int digits = 0;
    while (n > 0) {
        n = n / 10;
        digits++;
    }
    printf("1234 has %d digits\n", digits);
    return 0;
}
```
```output
1234 has 4 digits
```

## do-while

A `do-while` loop checks its condition at the end, so the body always runs at least once.

```c
#include <stdio.h>

int main(void) {
    int count = 0;
    do {
        printf("This runs once even though count is %d\n", count);
    } while (count > 0);
    return 0;
}
```
```output
This runs once even though count is 0
```

## Loops and arrays

Loops are often used to visit every item in an **array**, which is a fixed-size row of values of the same type.

```c
#include <stdio.h>

int main(void) {
    int marks[] = {78, 92, 65, 88};
    int total = 0;
    for (int i = 0; i < 4; i++) {
        total += marks[i];
    }
    printf("Average: %.2f\n", total / 4.0);
    return 0;
}
```
```output
Average: 80.75
```

> **Note:** Array positions start at 0, so the last item of a 4-element array is `marks[3]`. Reading past the end is not caught by C and can crash your program.
