---
title: Strings
chapter: Arrays and Strings
description: Work with text as arrays of characters and use the string.h functions.
---
C has no separate string type. A string is an array of `char` that ends with a special **null character** `'\0'`. That final zero tells functions such as `printf` where the text stops.

```c
#include <stdio.h>

int main(void) {
    char word[] = "code";   /* stored as 'c' 'o' 'd' 'e' '\0' */
    printf("%s\n", word);
    printf("%c %c\n", word[0], word[3]);
    printf("array size: %zu\n", sizeof(word));
    return 0;
}
```
```output
code
c e
array size: 5
```

The array holds 5 characters, not 4, because of the hidden `'\0'`.

## The string.h library

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char first[20] = "Data";
    char second[] = "Science";

    printf("length: %zu\n", strlen(first));
    strcat(first, " ");        /* append */
    strcat(first, second);
    printf("joined: %s\n", first);

    char copy[20];
    strcpy(copy, second);      /* copy */
    printf("copy: %s\n", copy);

    printf("compare: %d\n", strcmp("apple", "apple") == 0);
    return 0;
}
```
```output
length: 4
joined: Data Science
copy: Science
compare: 1
```

> **Warning:** `strcpy` and `strcat` do not check the size of the destination. Make sure the target array is big enough, including room for `'\0'`, or use the safer `snprintf`.

## Walking through a string

Because a string ends with `'\0'`, you can loop until you reach it.

```c
#include <stdio.h>
#include <ctype.h>

int main(void) {
    char text[] = "Hello World 2026";
    int vowels = 0, digits = 0;

    for (int i = 0; text[i] != '\0'; i++) {
        char ch = tolower(text[i]);
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
            vowels++;
        } else if (isdigit(ch)) {
            digits++;
        }
        text[i] = toupper(text[i]);
    }
    printf("%s\n", text);
    printf("vowels: %d, digits: %d\n", vowels, digits);
    return 0;
}
```
```output
HELLO WORLD 2026
vowels: 3, digits: 4
```

## Building strings with snprintf

`snprintf` works like `printf` but writes into an array, and never writes more than the size you give it.

```c
#include <stdio.h>

int main(void) {
    char label[32];
    snprintf(label, sizeof(label), "Roll no. %03d (%s)", 7, "B");
    printf("%s\n", label);
    return 0;
}
```
```output
Roll no. 007 (B)
```

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  #include <string.h>
  int main(void) {
      char s[] = "GATE2026";
      printf("%zu %zu\n", strlen(s), sizeof(s));
      return 0;
  }
- 8 8
* 8 9
- 9 9
- 9 8
explain: strlen counts the characters before the terminating '\0': 8. The array also stores that '\0', so sizeof(s) is 9.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      char s[] = "programming";
      char *p = s;
      while (*p) p++;
      printf("%d\n", (int)(p - s));
      return 0;
  }
answer: 11
explain: The loop moves p forward until it reaches the '\0' at the end, so p − s is the length of "programming", which is 11.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      char s[] = "abcdef";
      printf("%s\n", s + s[1] - s[0] + 2);
      return 0;
  }
- cdef
* def
- bcdef
- ef
explain: s[1] − s[0] is 'b' − 'a' = 1, so the expression is s + 1 + 2 = s + 3, which points at "def".
```
