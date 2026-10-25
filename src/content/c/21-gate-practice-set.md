---
title: C GATE Practice Set
chapter: Preprocessor and Practice
description: Mixed GATE-style questions on C programming. Predict the output of each program, then check your answer.
---
GATE tests C mainly by showing a short program and asking what it prints. These questions mix every topic from this track: operators, control flow, recursion, static variables, pointers, arrays, strings, structures and function pointers.

How to practise:

1. Read the program carefully and trace it **on paper**, writing down the value of every variable as it changes.
2. Type or choose your answer and press **Check answer**.
3. Open the explanation even when you were right; it often shows a faster way to reason.

Every program on this page has been compiled and run with GCC, and its real output is the stated answer. The questions assume a typical 64-bit system with 4-byte `int` and 8-byte pointers.

```quiz
q: **[static, recursion]** What does the following program print?
code: c
  #include <stdio.h>
  int f(int n) {
      static int i = 1;
      if (n >= 5) return n;
      n = n + i;
      i++;
      return f(n);
  }
  int main(void) {
      printf("%d\n", f(1));
      return 0;
  }
answer: 7
explain: i is static, so it keeps growing across the recursive calls. f(1): n = 1 + 1 = 2, i = 2. f(2): n = 2 + 2 = 4, i = 3. f(4): n = 4 + 3 = 7, i = 4. f(7): 7 ≥ 5, so it returns 7.
```

```quiz
q: **[2-D arrays and pointers]** What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int a[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
      printf("%d\n", *(*(a + 2) + 1) - **(a + 1) + *(a[0] + 2));
      return 0;
  }
answer: 7
explain: *(*(a + 2) + 1) is a[2][1] = 8, **(a + 1) is a[1][0] = 4 and *(a[0] + 2) is a[0][2] = 3. So 8 − 4 + 3 = 7.
```

```quiz
q: **[comma operator]** What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int x = (1, 2, 3);
      int y = 0;
      y = x++, x += 10;
      printf("%d %d\n", x, y);
      return 0;
  }
* 14 3
- 4 3
- 14 14
- 3 3
explain: In `(1, 2, 3)` the comma operator evaluates each operand and gives the last, so x = 3. In `y = x++, x += 10;` assignment binds tighter than the comma, so it means `(y = x++), (x += 10)`: y gets 3, x becomes 4 and then 14.
```

```quiz
q: **[arrays as parameters]** What does the following program print?
code: c
  #include <stdio.h>
  int count(int a[]) {
      return sizeof(a) / sizeof(a[0]);
  }
  int main(void) {
      int a[10];
      printf("%zu %d\n", sizeof(a) / sizeof(a[0]), count(a));
      return 0;
  }
- 10 10
* 10 2
- 10 1
- 2 2
explain: In main, a is a real array of 10 ints: 40 / 4 = 10. A parameter declared as `int a[]` is really a pointer, so inside count, sizeof(a) is the size of a pointer (8), and 8 / 4 = 2. This is why array functions need the length as a separate parameter.
```

```quiz
q: **[type conversion]** What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int a = -1;
      unsigned int b = 1;
      if (a < b) printf("less\n");
      else printf("not less\n");
      return 0;
  }
- less
* not less
- Compilation error
- The output is undefined
explain: When an int is compared with an unsigned int, the int is converted to unsigned. −1 becomes the largest unsigned value (4294967295 with 32-bit unsigned), which is not less than 1.
```

```quiz
q: **[function pointers]** What does the following program print?
code: c
  #include <stdio.h>
  int add(int a, int b) { return a + b; }
  int sub(int a, int b) { return a - b; }
  int mul(int a, int b) { return a * b; }
  int main(void) {
      int (*ops[])(int, int) = {add, sub, mul};
      printf("%d\n", ops[2](ops[0](2, 3), ops[1](7, 4)));
      return 0;
  }
answer: 15
explain: ops[0] is add, ops[1] is sub and ops[2] is mul. The call is mul(add(2, 3), sub(7, 4)) = mul(5, 3) = 15.
```

```quiz
q: **[do-while, post-decrement]** What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int i = 3;
      do {
          printf("%d", i);
      } while (i-- > 1);
      printf(" %d\n", i);
      return 0;
  }
* 321 0
- 32 1
- 3210 -1
- 321 1
explain: The body runs before the first test. It prints 3; the test 3 > 1 is true and i becomes 2. It prints 2; 2 > 1 is true and i becomes 1. It prints 1; 1 > 1 is false, but the post-decrement still makes i 0. So it prints 321 and then 0.
```

```quiz
q: **[strings, pointers]** What does the following program print?
code: c
  #include <stdio.h>
  void rev(char *s) {
      char *e = s;
      while (*e) e++;
      e--;
      while (s < e) {
          char t = *s;
          *s++ = *e;
          *e-- = t;
      }
  }
  int main(void) {
      char w[] = "GATECSE";
      rev(w);
      printf("%s\n", w);
      return 0;
  }
* ESCETAG
- GATECSE
- ESCGATE
- ESCETGA
explain: rev moves s forward and e backward from the two ends, swapping characters until they meet, which reverses the string in place.
```

```quiz
q: **[static and global variables]** What does the following program print?
code: c
  #include <stdio.h>
  int g = 10;
  int f(int x) {
      static int s = 0;
      s += x;
      g -= x;
      return s + g;
  }
  int main(void) {
      int a = f(2);
      int b = f(3);
      printf("%d %d %d\n", a, b, g);
      return 0;
  }
* 10 10 5
- 10 13 5
- 12 15 5
- 10 10 10
explain: f(2): s = 2, g = 8, returns 10. f(3): s = 2 + 3 = 5 (static, so it is kept), g = 8 − 3 = 5, returns 10. Finally g is 5.
```

```quiz
q: **[pointer subtraction]** What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int arr[] = {2, 4, 6, 8, 10};
      int *p = arr + 4, *q = arr;
      printf("%d %d\n", (int)(p - q), *p - *q);
      return 0;
  }
* 4 8
- 16 8
- 4 4
- 8 8
explain: Subtracting two pointers into the same array gives the number of elements between them, not bytes: p − q = 4. *p − *q = 10 − 2 = 8.
```

```quiz
q: **[recursion]** What does the following program print?
code: c
  #include <stdio.h>
  int fun(int n) {
      if (n == 0) return 0;
      return (n % 10) + fun(n / 10);
  }
  int main(void) {
      printf("%d\n", fun(fun(98765)));
      return 0;
  }
answer: 8
explain: fun returns the sum of the decimal digits. fun(98765) = 9 + 8 + 7 + 6 + 5 = 35, and fun(35) = 3 + 5 = 8.
```

```quiz
q: **[string library]** What does the following program print?
code: c
  #include <stdio.h>
  #include <string.h>
  int main(void) {
      char a[20] = "GATE";
      char *b = "2026";
      strcat(a, b);
      printf("%s %zu %d\n", a, strlen(a), strcmp("abc", "abd") < 0);
      return 0;
  }
* GATE2026 8 1
- GATE2026 9 1
- GATE 4 0
- GATE2026 8 -1
explain: strcat appends "2026" to "GATE" (the array has room for 20 chars). strlen gives 8. strcmp("abc", "abd") is negative because 'c' < 'd', so the comparison `< 0` is 1.
```

```quiz
q: **[pointer to pointer]** What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int x = 5;
      int *p = &x, **pp = &p;
      **pp += 3;
      *p *= 2;
      printf("%d\n", x);
      return 0;
  }
answer: 16
explain: pp points to p, which points to x. **pp += 3 makes x = 8, then *p *= 2 makes x = 16.
```

```quiz
q: **[nested loops, break, continue]** What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int i, j, c = 0;
      for (i = 1; i <= 4; i++)
          for (j = 1; j <= 4; j++) {
              if (j == i) continue;
              if (i + j > 5) break;
              c++;
          }
      printf("%d\n", c);
      return 0;
  }
answer: 8
explain: For each i, j runs from 1 upwards: j == i is skipped with continue, and the inner loop stops at the first j with i + j > 5. Counted pairs: i = 1: j = 2, 3, 4 (3); i = 2: j = 1, 3 (2, then j = 4 breaks); i = 3: j = 1, 2 (2, then j = 4 breaks); i = 4: j = 1 (1, then j = 2 breaks). Total 3 + 2 + 2 + 1 = 8.
```
