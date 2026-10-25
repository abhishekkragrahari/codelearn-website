---
title: Structures
chapter: Structures and Files
description: Group related values into one custom type with struct.
---
A **structure** (`struct`) groups several variables, possibly of different types, under one name. It is C's way of describing a "thing" that has several properties, such as a student with a name, roll number and marks.

```c
#include <stdio.h>

struct Student {
    char name[30];
    int roll;
    float marks;
};

int main(void) {
    struct Student s = {"Asha", 12, 88.5f};
    printf("%s (roll %d) scored %.1f\n", s.name, s.roll, s.marks);

    s.marks = 91.0f;   /* access members with a dot */
    printf("Updated marks: %.1f\n", s.marks);
    return 0;
}
```
```output
Asha (roll 12) scored 88.5
Updated marks: 91.0
```

## typedef

`typedef` gives a type a shorter name, so you can write `Point` instead of `struct Point`.

```c
#include <stdio.h>

typedef struct {
    double x;
    double y;
} Point;

Point midpoint(Point a, Point b) {
    Point m = {(a.x + b.x) / 2, (a.y + b.y) / 2};
    return m;
}

int main(void) {
    Point p = {0, 0}, q = {4, 6};
    Point m = midpoint(p, q);
    printf("midpoint = (%.1f, %.1f)\n", m.x, m.y);
    return 0;
}
```
```output
midpoint = (2.0, 3.0)
```

## Arrays of structs and pointers to structs

When you have a pointer to a struct, use the arrow operator `->` to reach its members. `p->marks` is shorthand for `(*p).marks`.

```c
#include <stdio.h>

typedef struct {
    char name[20];
    int marks;
} Student;

void add_bonus(Student *s, int bonus) {
    s->marks += bonus;
}

int main(void) {
    Student cls[3] = {{"Ravi", 70}, {"Meera", 85}, {"Kabir", 64}};

    add_bonus(&cls[2], 10);

    int best = 0;
    for (int i = 0; i < 3; i++) {
        printf("%-6s %d\n", cls[i].name, cls[i].marks);
        if (cls[i].marks > cls[best].marks) best = i;
    }
    printf("Top: %s\n", cls[best].name);
    return 0;
}
```
```output
Ravi   70
Meera  85
Kabir  74
Top: Meera
```

> **Tip:** Passing a large struct by value copies all of it. Passing a pointer, as `add_bonus` does, is faster and lets the function modify the original.

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  struct P { int x; int y; };
  void move(struct P p) { p.x += 10; }
  void move_ptr(struct P *p) { p->y += 10; }
  int main(void) {
      struct P a = {1, 2};
      move(a);
      move_ptr(&a);
      printf("%d %d\n", a.x, a.y);
      return 0;
  }
- 11 12
* 1 12
- 11 2
- 1 2
explain: move receives a copy of the struct, so a.x stays 1. move_ptr receives the address, so p->y += 10 changes a.y to 12.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  struct Node { int val; struct Node *next; };
  int main(void) {
      struct Node c = {3, NULL}, b = {2, &c}, a = {1, &b};
      struct Node *p = &a;
      int s = 0;
      while (p) { s = s * 10 + p->val; p = p->next; }
      printf("%d %d\n", s, a.next->next->val);
      return 0;
  }
- 321 3
* 123 3
- 123 2
- 6 3
explain: The nodes form the list a → b → c. Walking it, s becomes 1, then 12, then 123. a.next->next is c, whose val is 3.
```
