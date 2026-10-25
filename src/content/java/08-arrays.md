---
title: Arrays
chapter: Arrays and Strings
description: Create, loop over, sort and copy arrays.
---
An **array** stores a fixed number of values of the same type. Its length is set when it is created and cannot change afterwards.

```java
public class Main {
    public static void main(String[] args) {
        int[] marks = {78, 92, 65, 88};
        System.out.println(marks[0]);
        System.out.println(marks.length);

        marks[2] = 70;
        int total = 0;
        for (int m : marks) {
            total += m;
        }
        System.out.println("Average: " + (double) total / marks.length);
    }
}
```
```output
78
4
Average: 82.0
```

## Creating an empty array

`new int[5]` creates an array of five zeros. Arrays of objects, such as `String`, start filled with `null`.

```java
public class Main {
    public static void main(String[] args) {
        int[] squares = new int[5];
        for (int i = 0; i < squares.length; i++) {
            squares[i] = (i + 1) * (i + 1);
        }
        String[] names = new String[2];
        System.out.println(squares[4]);
        System.out.println(names[0]);
    }
}
```
```output
25
null
```

## The Arrays helper class

`java.util.Arrays` has ready-made methods for printing, sorting, searching and copying.

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] nums = {42, 7, 19, 88, 3};
        System.out.println(Arrays.toString(nums));

        Arrays.sort(nums);
        System.out.println(Arrays.toString(nums));
        System.out.println(Arrays.binarySearch(nums, 42));

        int[] firstThree = Arrays.copyOf(nums, 3);
        System.out.println(Arrays.toString(firstThree));
    }
}
```
```output
[42, 7, 19, 88, 3]
[3, 7, 19, 42, 88]
3
[3, 7, 19]
```

> **Warning:** Printing an array directly, as in `System.out.println(nums)`, shows something like `[I@1b6d3586`, not the values. Use `Arrays.toString(nums)` instead.

## Two-dimensional arrays

```java
public class Main {
    public static void main(String[] args) {
        int[][] table = new int[3][3];
        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < 3; c++) {
                table[r][c] = (r + 1) * (c + 1);
            }
        }
        for (int[] row : table) {
            for (int value : row) {
                System.out.printf("%3d", value);
            }
            System.out.println();
        }
    }
}
```
```output
  1  2  3
  2  4  6
  3  6  9
```

Accessing an index outside the array, such as `marks[4]` above, throws an `ArrayIndexOutOfBoundsException`.
