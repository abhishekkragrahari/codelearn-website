---
title: File Handling
chapter: Structures and Files
description: Write data to files and read it back with fopen, fprintf and fgets.
---
To keep data after a program ends, write it to a file. C uses the `FILE` type from `stdio.h`, together with a handful of functions that mirror the ones you already know: `fprintf` is `printf` for files, and `fscanf` is `scanf` for files.

## Writing a file

`fopen(name, mode)` opens a file and returns a `FILE *`, or `NULL` on failure. Mode `"w"` creates the file or empties an existing one.

```c
#include <stdio.h>

int main(void) {
    FILE *fp = fopen("scores.txt", "w");
    if (fp == NULL) {
        printf("Could not open file\n");
        return 1;
    }
    fprintf(fp, "Asha 88\n");
    fprintf(fp, "Ravi 72\n");
    fprintf(fp, "Meera 95\n");
    fclose(fp);
    printf("File written.\n");
    return 0;
}
```
```output
File written.
```

> **Warning:** Always call `fclose` when you are done. It makes sure everything is actually written to disk and frees the file handle.

## Reading line by line

`fgets(buffer, size, fp)` reads one line, up to `size - 1` characters, and returns `NULL` at the end of the file.

```c
#include <stdio.h>

int main(void) {
    FILE *fp = fopen("notes.txt", "w");
    if (fp == NULL) return 1;
    fputs("first line\nsecond line\n", fp);
    fclose(fp);

    char line[100];
    int n = 0;
    fp = fopen("notes.txt", "r");
    if (fp == NULL) return 1;
    while (fgets(line, sizeof(line), fp) != NULL) {
        n++;
        printf("%d: %s", n, line);
    }
    fclose(fp);
    return 0;
}
```
```output
1: first line
2: second line
```

`fgets` keeps the newline at the end of each line, so the `printf` above does not add another one.

## Reading formatted data

`fscanf` reads values in the same way as `scanf`, and returns how many it matched. That makes it easy to loop until the data runs out.

```c
#include <stdio.h>

int main(void) {
    FILE *fp = fopen("scores.txt", "w");
    if (fp == NULL) return 1;
    fprintf(fp, "Asha 88\nRavi 72\nMeera 95\n");
    fclose(fp);

    fp = fopen("scores.txt", "r");
    if (fp == NULL) return 1;
    char name[30];
    int score, total = 0, count = 0;
    while (fscanf(fp, "%29s %d", name, &score) == 2) {
        total += score;
        count++;
    }
    fclose(fp);
    printf("%d students, average %.1f\n", count, (double)total / count);
    return 0;
}
```
```output
3 students, average 85.0
```

## File modes

- `"r"`: read. The file must exist.
- `"w"`: write. Creates the file, or erases it if it exists.
- `"a"`: append. Adds to the end, creating the file if needed.
- Add `b` (for example `"rb"`) to work with binary files.
