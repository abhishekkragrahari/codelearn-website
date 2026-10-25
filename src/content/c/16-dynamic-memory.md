---
title: Dynamic Memory
chapter: Pointers and Memory
description: Allocate memory at run time with malloc and release it with free.
---
Ordinary arrays need their size fixed when you write the program. When the size is only known while the program runs, for example after asking the user how many items there are, you can request memory from the **heap** with `malloc` from `stdlib.h`.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *squares = malloc(n * sizeof(int));
    if (squares == NULL) {
        printf("Out of memory\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        squares[i] = (i + 1) * (i + 1);
    }
    for (int i = 0; i < n; i++) {
        printf("%d ", squares[i]);
    }
    printf("\n");

    free(squares);   /* give the memory back */
    return 0;
}
```
```output
1 4 9 16 25 
```

- `malloc(bytes)` returns a pointer to a new block, or `NULL` if it fails.
- The block can be used just like an array.
- `free(pointer)` returns the memory when you no longer need it.

## calloc and realloc

`calloc` allocates memory and sets it all to zero. `realloc` resizes a block you already have, keeping its contents.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int size = 2;
    int *list = calloc(size, sizeof(int));
    if (list == NULL) return 1;

    printf("after calloc: %d %d\n", list[0], list[1]);

    int *bigger = realloc(list, 4 * sizeof(int));
    if (bigger == NULL) {
        free(list);
        return 1;
    }
    list = bigger;
    list[2] = 30;
    list[3] = 40;
    for (int i = 0; i < 4; i++) {
        printf("%d ", list[i]);
    }
    printf("\n");

    free(list);
    return 0;
}
```
```output
after calloc: 0 0
0 0 30 40 
```

## Rules to remember

- Every `malloc`, `calloc` or `realloc` must be matched by exactly one `free`.
- Forgetting to free causes a **memory leak**: the program holds memory it can never use again.
- Never use a pointer after freeing it, and never free the same block twice.
- Setting a pointer to `NULL` right after `free` makes accidental reuse easier to spot.

> **Tip:** On Linux and macOS, tools such as Valgrind or compiling with `-fsanitize=address` can find leaks and invalid memory use automatically.

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  #include <stdlib.h>
  int main(void) {
      int *a = malloc(4 * sizeof(int));
      for (int i = 0; i < 4; i++) a[i] = i * i;
      int *b = realloc(a, 6 * sizeof(int));
      b[4] = 16;
      b[5] = 25;
      int s = 0;
      for (int i = 0; i < 6; i++) s += b[i];
      printf("%d\n", s);
      free(b);
      return 0;
  }
answer: 55
explain: malloc gives room for 4 ints, filled with 0, 1, 4, 9. realloc grows the block to 6 ints and keeps the old values; b[4] and b[5] become 16 and 25. The sum is 0 + 1 + 4 + 9 + 16 + 25 = 55.
```

```quiz
q: Which statements about dynamic memory in C are **true**? (Select all that apply.)
* `malloc` returns `NULL` when it cannot allocate the memory
* Memory from `malloc` that is never passed to `free` is a memory leak
- `free(p)` also sets `p` to `NULL`
* `calloc(n, size)` sets all the allocated bytes to zero
explain: free releases the memory but leaves p holding the old address (a dangling pointer), which is why setting p = NULL afterwards is good practice. The other statements are true.
```
