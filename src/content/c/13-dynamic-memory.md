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
