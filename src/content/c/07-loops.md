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

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int count = 0;
      for (int i = 1; i <= 20; i *= 3)
          count++;
      printf("%d\n", count);
      return 0;
  }
answer: 3
explain: i takes the values 1, 3, 9 and then 27, which is greater than 20, so the body runs 3 times.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int i = 0, sum = 0;
      while (i < 10) {
          i++;
          if (i % 3 == 0) continue;
          if (i == 8) break;
          sum += i;
      }
      printf("%d\n", sum);
      return 0;
  }
answer: 19
explain: i is incremented first in every round. i = 3 and i = 6 hit `continue` and are skipped. At i = 8 the loop breaks before adding. So the values added are 1, 2, 4, 5 and 7, and their sum is 19.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int calls = 0;
      for (int i = 0; i < 5; i++)
          for (int j = i; j < 5; j++)
              calls++;
      printf("%d\n", calls);
      return 0;
  }
answer: 15
explain: For i = 0 the inner loop runs 5 times, for i = 1 four times, and so on down to 1 time for i = 4: 5 + 4 + 3 + 2 + 1 = 15.
```
