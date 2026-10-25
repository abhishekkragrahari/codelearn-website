---
title: Arrays
chapter: Arrays and Strings
description: Store many values of the same type in one variable.
---
An **array** is a fixed-size row of values of the same type, stored next to each other in memory. You choose its size when you declare it, and you reach each element by its index, starting at 0.

```c
#include <stdio.h>

int main(void) {
    int temps[5] = {31, 29, 33, 35, 30};

    printf("First: %d\n", temps[0]);
    printf("Last: %d\n", temps[4]);

    temps[1] = 28;   /* change an element */
    for (int i = 0; i < 5; i++) {
        printf("%d ", temps[i]);
    }
    printf("\n");
    return 0;
}
```
```output
First: 31
Last: 30
31 28 33 35 30 
```

## Finding the size

`sizeof` on an array gives its total size in bytes. Dividing by the size of one element gives the number of elements.

```c
#include <stdio.h>

int main(void) {
    double prices[] = {9.5, 12.0, 4.25, 30.0};
    int n = sizeof(prices) / sizeof(prices[0]);

    double max = prices[0];
    for (int i = 1; i < n; i++) {
        if (prices[i] > max) {
            max = prices[i];
        }
    }
    printf("%d prices, highest is %.2f\n", n, max);
    return 0;
}
```
```output
4 prices, highest is 30.00
```

## Passing arrays to functions

When you pass an array to a function, pass its length too; the function cannot work it out on its own.

```c
#include <stdio.h>

void reverse(int arr[], int n) {
    for (int i = 0; i < n / 2; i++) {
        int tmp = arr[i];
        arr[i] = arr[n - 1 - i];
        arr[n - 1 - i] = tmp;
    }
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5, 6};
    reverse(nums, 6);
    for (int i = 0; i < 6; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");
    return 0;
}
```
```output
6 5 4 3 2 1 
```

Unlike ordinary variables, the function changes the caller's array. The reason is explained in the lesson on pointers and arrays.

## Two-dimensional arrays

```c
#include <stdio.h>

int main(void) {
    int grid[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            printf("%3d", grid[r][c] * 10);
        }
        printf("\n");
    }
    return 0;
}
```
```output
 10 20 30
 40 50 60
```

> **Warning:** C does not check array bounds. Writing to `temps[5]` in a 5-element array silently corrupts other memory. Always keep your loop limits correct.
