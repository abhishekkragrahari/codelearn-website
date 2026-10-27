---
title: Bit Manipulation
chapter: Getting Started
description: Bitwise AND, OR, XOR, NOT and shifts, testing, setting, clearing and toggling bits, x & (x - 1) tricks, counting set bits, the XOR single-number trick and generating subsets with bitmasks.
---
Computers store integers in binary, and **bitwise operators** work on all the bits at once in a single instruction. Bit tricks give compact, very fast solutions to many problems, and GATE often asks what a short bitwise expression computes.

## The operators

| Operator | Java / C / Python | Rule per bit |
| --- | --- | --- |
| AND | `a & b` | 1 only if both are 1 |
| OR | `a \| b` | 1 if either is 1 |
| XOR | `a ^ b` | 1 if they differ |
| NOT | `~a` | Flips every bit (`~a = −a − 1` in two's complement) |
| Left shift | `a << k` | Multiply by 2ᵏ |
| Right shift | `a >> k` | Divide by 2ᵏ (rounding down for non-negative a) |

**XOR facts:** a ^ a = 0, a ^ 0 = a, and XOR is commutative and associative, so pairs cancel in any order.

## Working with bit i

```pipeline
caption: x = 44 in binary (bit 5 on the left, bit 0 on the right)
1 | bit 5
0 | bit 4
1 | bit 3
1 | bit 2
0 | bit 1
0 | bit 0
```

| Task | Expression |
| --- | --- |
| Test bit i | `(x >> i) & 1` |
| Set bit i | `x \| (1 << i)` |
| Clear bit i | `x & ~(1 << i)` |
| Toggle bit i | `x ^ (1 << i)` |
| Lowest set bit | `x & -x` |
| Clear lowest set bit | `x & (x - 1)` |
| Is x a power of 2? | `x > 0 && (x & (x - 1)) == 0` |

**Counting set bits (Kernighan):** repeat x &= x − 1 until x = 0; the number of steps is the number of 1s. It runs in O(number of set bits).

## Bitmasks as sets

An n-bit integer can stand for a subset of n items: bit i is 1 when item i is in the set. All 2ⁿ masks from 0 to 2ⁿ − 1 list every subset, which is the basis of bitmask DP (for example the travelling salesman problem in O(2ⁿ n²)). Union is `|`, intersection `&`, and difference `a & ~b`.

## The code

```java
public class Main {
    static int popcount(int x) {          // Kernighan: each step clears the lowest set bit
        int c = 0;
        while (x != 0) { x &= x - 1; c++; }
        return c;
    }

    public static void main(String[] args) {
        int x = 44;                       // 101100 in binary
        System.out.println("x = " + x + " = " + Integer.toBinaryString(x));
        System.out.println("bit 2 set? " + ((x >> 2 & 1) == 1));
        System.out.println("set bit 0:   " + (x | 1));
        System.out.println("clear bit 3: " + (x & ~(1 << 3)));
        System.out.println("toggle bit 5: " + (x ^ (1 << 5)));
        System.out.println("lowest set bit: " + (x & -x));
        System.out.println("set bits: " + popcount(x));
        System.out.println("64 is a power of 2? " + ((64 & 63) == 0));

        int[] a = {7, 3, 5, 3, 7};        // every value twice except one
        int single = 0;
        for (int v : a) single ^= v;      // pairs cancel: v ^ v = 0
        System.out.println("appears once: " + single);

        int[] items = {1, 2, 3};
        StringBuilder all = new StringBuilder();
        for (int mask = 0; mask < (1 << items.length); mask++) {   // each mask is one subset
            StringBuilder s = new StringBuilder("{");
            for (int i = 0; i < items.length; i++)
                if ((mask >> i & 1) == 1) s.append(s.length() > 1 ? "," : "").append(items[i]);
            all.append(mask > 0 ? " " : "").append(s).append("}");
        }
        System.out.println("subsets: " + all);
    }
}
```
```output
x = 44 = 101100
bit 2 set? true
set bit 0:   45
clear bit 3: 36
toggle bit 5: 12
lowest set bit: 4
set bits: 3
64 is a power of 2? true
appears once: 5
subsets: {} {1} {2} {1,2} {3} {1,3} {2,3} {1,2,3}
```
```python
def popcount(x):                  # Kernighan: each step clears the lowest set bit
    c = 0
    while x:
        x &= x - 1
        c += 1
    return c

x = 44                            # 101100 in binary
print(f"x = {x} = {x:b}")
print("bit 2 set?", str((x >> 2 & 1) == 1).lower())
print("set bit 0:  ", x | 1)
print("clear bit 3:", x & ~(1 << 3))
print("toggle bit 5:", x ^ (1 << 5))
print("lowest set bit:", x & -x)
print("set bits:", popcount(x))
print("64 is a power of 2?", str(64 & 63 == 0).lower())

single = 0
for v in [7, 3, 5, 3, 7]:         # every value twice except one
    single ^= v                   # pairs cancel: v ^ v = 0
print("appears once:", single)

items = [1, 2, 3]
subsets = []
for mask in range(1 << len(items)):          # each mask is one subset
    subsets.append("{" + ",".join(str(items[i]) for i in range(len(items)) if mask >> i & 1) + "}")
print("subsets:", " ".join(subsets))
```
```output
x = 44 = 101100
bit 2 set? true
set bit 0:   45
clear bit 3: 36
toggle bit 5: 12
lowest set bit: 4
set bits: 3
64 is a power of 2? true
appears once: 5
subsets: {} {1} {2} {1,2} {3} {1,3} {2,3} {1,2,3}
```
```c
#include <stdio.h>

int popcount(int x) {             /* Kernighan: each step clears the lowest set bit */
    int c = 0;
    while (x != 0) { x &= x - 1; c++; }
    return c;
}

int main(void) {
    int x = 44;                   /* 101100 in binary */
    printf("x = %d = ", x);
    for (int i = 5; i >= 0; i--) printf("%d", x >> i & 1);
    printf("\n");
    printf("bit 2 set? %s\n", (x >> 2 & 1) ? "true" : "false");
    printf("set bit 0:   %d\n", x | 1);
    printf("clear bit 3: %d\n", x & ~(1 << 3));
    printf("toggle bit 5: %d\n", x ^ (1 << 5));
    printf("lowest set bit: %d\n", x & -x);
    printf("set bits: %d\n", popcount(x));
    printf("64 is a power of 2? %s\n", (64 & 63) == 0 ? "true" : "false");

    int a[] = {7, 3, 5, 3, 7};    /* every value twice except one */
    int single = 0;
    for (int i = 0; i < 5; i++) single ^= a[i];   /* pairs cancel: v ^ v = 0 */
    printf("appears once: %d\n", single);

    int items[] = {1, 2, 3};
    printf("subsets:");
    for (int mask = 0; mask < (1 << 3); mask++) {  /* each mask is one subset */
        printf(" {");
        int first = 1;
        for (int i = 0; i < 3; i++)
            if (mask >> i & 1) { printf(first ? "%d" : ",%d", items[i]); first = 0; }
        printf("}");
    }
    printf("\n");
    return 0;
}
```
```output
x = 44 = 101100
bit 2 set? true
set bit 0:   45
clear bit 3: 36
toggle bit 5: 12
lowest set bit: 4
set bits: 3
64 is a power of 2? true
appears once: 5
subsets: {} {1} {2} {1,2} {3} {1,3} {2,3} {1,2,3}
```

## GATE-style practice questions

```quiz
q: What is the value of 29 & (29 − 1)?
answer: 28
verify: 29 & 28
explain: 29 = 11101 and 28 = 11100; x & (x − 1) clears the lowest set bit, giving 11100 = 28.
```

```quiz
q: How many set bits does 255 ^ 170 have?
answer: 4
verify: bin(255 ^ 170).count("1")
explain: 11111111 ^ 10101010 = 01010101, which has 4 ones.
```

```quiz
q: What does this program print?
code: c
  #include <stdio.h>
  int main(void) {
      int x = 12, c = 0;
      while (x) { c += x & 1; x >>= 1; }
      printf("%d\n", c);
      return 0;
  }
answer: 2
explain: The loop counts the 1 bits of 12 = 1100: two of them.
```

```quiz
q: For a positive integer x, the expression x & (x − 1) equals 0 exactly when:
* x is a power of 2
- x is odd
- x is even
- x is a multiple of 3
explain: A power of 2 has a single 1 bit; clearing it leaves 0.
```

```quiz
q: Which expression gives the value of the lowest set bit of x (for x > 0)?
- x | (x − 1)
* x & (−x)
- x ^ (x + 1)
- ~x & x
explain: In two's complement, −x = ~x + 1, which keeps only the lowest 1 bit in common with x.
```
