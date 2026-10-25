---
title: Bitwise Operators
chapter: Getting Started
description: Work directly with the bits of integers using &, |, ^, ~, << and >>.
---
Integers are stored in binary. **Bitwise operators** work on each bit separately, which makes them fast and useful for flags, masks, low-level hardware code and many GATE questions.

| Operator | Name | Rule for each bit | Example (a = 12 = 1100₂, b = 10 = 1010₂) |
| --- | --- | --- | --- |
| `a & b` | AND | 1 if both bits are 1 | 1000₂ = 8 |
| `a \| b` | OR | 1 if either bit is 1 | 1110₂ = 14 |
| `a ^ b` | XOR | 1 if the bits differ | 0110₂ = 6 |
| `~a` | NOT | flips every bit | −13 (two's complement) |
| `a << n` | left shift | moves bits left, fills with 0 | 12 << 2 = 48 (× 4) |
| `a >> n` | right shift | moves bits right | 12 >> 2 = 3 (÷ 4) |

```c
#include <stdio.h>

void print_bits(unsigned int x) {
    for (int i = 7; i >= 0; i--) {
        putchar((x >> i) & 1 ? '1' : '0');
    }
}

int main(void) {
    int a = 12, b = 10;
    printf("a & b = %d\n", a & b);
    printf("a | b = %d\n", a | b);
    printf("a ^ b = %d\n", a ^ b);
    printf("~a    = %d\n", ~a);
    printf("a << 2 = %d, a >> 2 = %d\n", a << 2, a >> 2);
    printf("12 in binary: ");
    print_bits(12);
    printf("\n");
    return 0;
}
```
```output
a & b = 8
a | b = 14
a ^ b = 6
~a    = -13
a << 2 = 48, a >> 2 = 3
12 in binary: 00001100
```

`~a` is −13 because C stores negative numbers in **two's complement**: ~x = −x − 1 for every integer x.

## Common bit tricks

| Task | Expression |
| --- | --- |
| Is bit k set? | `(x >> k) & 1` |
| Set bit k | `x \| (1 << k)` |
| Clear bit k | `x & ~(1 << k)` |
| Toggle bit k | `x ^ (1 << k)` |
| Is x odd? | `x & 1` |
| Is x a power of two? (x > 0) | `(x & (x - 1)) == 0` |
| Turn off the lowest set bit | `x & (x - 1)` |

```c
#include <stdio.h>

int count_ones(unsigned int x) {
    int count = 0;
    while (x) {
        x &= x - 1;      /* removes the lowest 1 bit each time */
        count++;
    }
    return count;
}

int main(void) {
    int x = 0;
    x |= 1 << 3;                      /* set bit 3 */
    x |= 1 << 0;                      /* set bit 0 */
    printf("x = %d\n", x);
    printf("bit 3 set? %d\n", (x >> 3) & 1);
    x &= ~(1 << 3);                   /* clear bit 3 */
    printf("after clearing bit 3: %d\n", x);
    printf("ones in 255: %d, ones in 1000: %d\n", count_ones(255), count_ones(1000));
    printf("64 is a power of two? %d\n", (64 & 63) == 0);

    int p = 5, q = 9;                 /* swap with XOR, no temporary */
    p ^= q;
    q ^= p;
    p ^= q;
    printf("p = %d, q = %d\n", p, q);
    return 0;
}
```
```output
x = 9
bit 3 set? 1
after clearing bit 3: 1
ones in 255: 8, ones in 1000: 6
64 is a power of two? 1
p = 9, q = 5
```

> **Warning:** Bitwise operators have **lower precedence** than comparison operators. `x & 1 == 0` means `x & (1 == 0)`, which is always 0. Write `(x & 1) == 0`.

## GATE-style practice questions

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int a = 13, b = 6;
      printf("%d\n", (a & b) | (a ^ b));
      return 0;
  }
answer: 15
explain: 13 = 1101₂ and 6 = 0110₂. a & b = 0100₂ = 4 and a ^ b = 1011₂ = 11. 4 | 11 = 1111₂ = 15. (In fact (a & b) | (a ^ b) always equals a | b.)
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      unsigned int x = 0xF0;
      x = (x >> 4) | (x << 4);
      printf("%u\n", x & 0xFF);
      return 0;
  }
answer: 15
explain: 0xF0 >> 4 = 0x0F and 0xF0 << 4 = 0xF00. ORing gives 0xF0F, and keeping only the low 8 bits with & 0xFF leaves 0x0F = 15.
```

```quiz
q: What does the following program print?
code: c
  #include <stdio.h>
  int main(void) {
      int x = 5;
      if (x & 1 == 0)
          printf("even\n");
      else
          printf("odd\n");
      return 0;
  }
- even
* odd
- Compilation error
- Nothing is printed
explain: `==` binds tighter than `&`, so the condition is `x & (1 == 0)` = `5 & 0` = 0, which is false, and the else branch runs. Here the answer happens to be right for 5, but for x = 4 the program would also print "odd". Always bracket bitwise tests: `(x & 1) == 0`.
```

```quiz
q: For a positive integer x, which expressions are non-zero **exactly** when x is a power of two? (Select all that apply.)
* `(x & (x - 1)) == 0`
* `(x & -x) == x`
- `(x | (x - 1)) == x`
- `(x ^ 1) == 0`
explain: A power of two has a single 1 bit. x & (x − 1) clears the lowest 1 bit, so the result is 0 exactly when there was only one. x & −x isolates the lowest 1 bit, which equals x exactly when it is the only one. The other two fail, for example for x = 4.
```
