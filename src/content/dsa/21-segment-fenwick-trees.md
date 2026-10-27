---
title: Segment Trees and Fenwick Trees
chapter: Advanced Data Structures
description: Range queries with point updates: building a segment tree, querying by overlap cases, updates, lazy propagation, the Fenwick (binary indexed) tree with i & -i, and comparing them with prefix sums.
---
Prefix sums answer range-sum queries in O(1), but a single update can cost O(n), because many prefix values change. When an array is both **queried** and **updated** often, two tree structures give **O(log n) for both**.

| Structure | Build | Range query | Point update | Space |
| --- | --- | --- | --- | --- |
| Plain array | O(1) | O(n) | O(1) | n |
| Prefix sums | O(n) | O(1) | O(n) | n |
| **Segment tree** | O(n) | **O(log n)** | **O(log n)** | about 4n |
| **Fenwick tree** | O(n log n) | **O(log n)** | **O(log n)** | n + 1 |

## Segment tree

A **segment tree** is a binary tree in which each node stores the answer (sum, minimum, maximum, gcd…) for a range of the array. The root covers a[0..n−1]; each node's children cover the two halves of its range; leaves are single elements.

```tree
caption: Segment tree of sums for a = [5, 2, 6, 1, 3, 4]
21 | a[0..5]
  13 | a[0..2]
    7 | a[0..1]
      5 | a[0]
      2 | a[1]
    6 | a[2]
  8 | a[3..5]
    4 | a[3..4]
      1 | a[3]
      3 | a[4]
    4 | a[5]
```

Stored in an array: node i has children 2i and 2i + 1, and an array of size 4n is always enough.

**Query a[l..r]** at a node covering [lo, hi]:

1. **No overlap** (r < lo or hi < l): return 0.
2. **Full overlap** (l ≤ lo and hi ≤ r): return the stored value.
3. **Partial overlap:** ask both children and combine.

At most about 4 nodes per level are visited, so a query is **O(log n)**. An **update** changes one leaf and recomputes the O(log n) nodes on its path to the root.

**Lazy propagation** handles **range updates** (add v to every element of a[l..r]) in O(log n) by storing pending updates at nodes and pushing them down only when needed.

## Fenwick tree (binary indexed tree)

A shorter, faster structure for prefix sums (and any invertible operation). With 1-based index i, **bit[i] stores the sum of the last (i & −i) elements ending at i**.

- **Prefix sum(i):** add bit[i], then i −= i & −i, until i = 0.
- **Add v at i:** bit[i] += v, then i += i & −i, until i > n.
- Range sum(l, r) = prefix(r) − prefix(l − 1).

Each loop removes or adds the lowest set bit, so it runs at most log₂ n times. See [Bit Manipulation](bit-manipulation.html) for why i & −i is the lowest set bit.

## The code

```java
public class Main {
    static int n;
    static int[] tree;                               // segment tree for range sums

    static void build(int[] a, int node, int lo, int hi) {
        if (lo == hi) { tree[node] = a[lo]; return; }
        int mid = (lo + hi) / 2;
        build(a, 2 * node, lo, mid);
        build(a, 2 * node + 1, mid + 1, hi);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    static int query(int node, int lo, int hi, int l, int r) {
        if (r < lo || hi < l) return 0;              // no overlap
        if (l <= lo && hi <= r) return tree[node];   // full overlap
        int mid = (lo + hi) / 2;                     // partial overlap: ask both halves
        return query(2 * node, lo, mid, l, r) + query(2 * node + 1, mid + 1, hi, l, r);
    }

    static void update(int node, int lo, int hi, int i, int value) {
        if (lo == hi) { tree[node] = value; return; }
        int mid = (lo + hi) / 2;
        if (i <= mid) update(2 * node, lo, mid, i, value);
        else update(2 * node + 1, mid + 1, hi, i, value);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    // Fenwick (binary indexed) tree: bit[i] covers the last (i & -i) positions up to i.
    static int[] bit;
    static void add(int i, int delta) { for (i++; i <= n; i += i & -i) bit[i] += delta; }
    static int prefix(int i) { int s = 0; for (i++; i > 0; i -= i & -i) s += bit[i]; return s; }

    public static void main(String[] args) {
        int[] a = {5, 2, 6, 1, 3, 4};
        n = a.length;
        tree = new int[4 * n];
        build(a, 1, 0, n - 1);
        System.out.println("segment tree: sum a[1..4] = " + query(1, 0, n - 1, 1, 4));
        update(1, 0, n - 1, 3, 10);                  // a[3] = 10
        System.out.println("after a[3] = 10: sum a[1..4] = " + query(1, 0, n - 1, 1, 4));

        bit = new int[n + 1];
        for (int i = 0; i < n; i++) add(i, a[i]);
        System.out.println("Fenwick: sum a[1..4] = " + (prefix(4) - prefix(0)));
        add(3, 10 - a[3]);
        System.out.println("after a[3] = 10: sum a[1..4] = " + (prefix(4) - prefix(0)));
    }
}
```
```output
segment tree: sum a[1..4] = 12
after a[3] = 10: sum a[1..4] = 21
Fenwick: sum a[1..4] = 12
after a[3] = 10: sum a[1..4] = 21
```
```python
a = [5, 2, 6, 1, 3, 4]
n = len(a)
tree = [0] * (4 * n)                             # segment tree for range sums

def build(node, lo, hi):
    if lo == hi:
        tree[node] = a[lo]
        return
    mid = (lo + hi) // 2
    build(2 * node, lo, mid)
    build(2 * node + 1, mid + 1, hi)
    tree[node] = tree[2 * node] + tree[2 * node + 1]

def query(node, lo, hi, l, r):
    if r < lo or hi < l:                         # no overlap
        return 0
    if l <= lo and hi <= r:                      # full overlap
        return tree[node]
    mid = (lo + hi) // 2                         # partial overlap: ask both halves
    return query(2 * node, lo, mid, l, r) + query(2 * node + 1, mid + 1, hi, l, r)

def update(node, lo, hi, i, value):
    if lo == hi:
        tree[node] = value
        return
    mid = (lo + hi) // 2
    if i <= mid:
        update(2 * node, lo, mid, i, value)
    else:
        update(2 * node + 1, mid + 1, hi, i, value)
    tree[node] = tree[2 * node] + tree[2 * node + 1]

build(1, 0, n - 1)
print("segment tree: sum a[1..4] =", query(1, 0, n - 1, 1, 4))
update(1, 0, n - 1, 3, 10)                       # a[3] = 10
print("after a[3] = 10: sum a[1..4] =", query(1, 0, n - 1, 1, 4))

# Fenwick (binary indexed) tree: bit[i] covers the last (i & -i) positions up to i.
bit = [0] * (n + 1)

def add(i, delta):
    i += 1
    while i <= n:
        bit[i] += delta
        i += i & -i

def prefix(i):
    i += 1
    s = 0
    while i > 0:
        s += bit[i]
        i -= i & -i
    return s

for i, v in enumerate(a):
    add(i, v)
print("Fenwick: sum a[1..4] =", prefix(4) - prefix(0))
add(3, 10 - a[3])
print("after a[3] = 10: sum a[1..4] =", prefix(4) - prefix(0))
```
```output
segment tree: sum a[1..4] = 12
after a[3] = 10: sum a[1..4] = 21
Fenwick: sum a[1..4] = 12
after a[3] = 10: sum a[1..4] = 21
```
```c
#include <stdio.h>

#define N 6
int tree[4 * N], bit[N + 1];

void build(int *a, int node, int lo, int hi) {
    if (lo == hi) { tree[node] = a[lo]; return; }
    int mid = (lo + hi) / 2;
    build(a, 2 * node, lo, mid);
    build(a, 2 * node + 1, mid + 1, hi);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

int query(int node, int lo, int hi, int l, int r) {
    if (r < lo || hi < l) return 0;             /* no overlap */
    if (l <= lo && hi <= r) return tree[node];  /* full overlap */
    int mid = (lo + hi) / 2;                    /* partial overlap: ask both halves */
    return query(2 * node, lo, mid, l, r) + query(2 * node + 1, mid + 1, hi, l, r);
}

void update(int node, int lo, int hi, int i, int value) {
    if (lo == hi) { tree[node] = value; return; }
    int mid = (lo + hi) / 2;
    if (i <= mid) update(2 * node, lo, mid, i, value);
    else update(2 * node + 1, mid + 1, hi, i, value);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

/* Fenwick (binary indexed) tree: bit[i] covers the last (i & -i) positions up to i. */
void add(int i, int delta) { for (i++; i <= N; i += i & -i) bit[i] += delta; }
int prefix(int i) { int s = 0; for (i++; i > 0; i -= i & -i) s += bit[i]; return s; }

int main(void) {
    int a[N] = {5, 2, 6, 1, 3, 4};
    build(a, 1, 0, N - 1);
    printf("segment tree: sum a[1..4] = %d\n", query(1, 0, N - 1, 1, 4));
    update(1, 0, N - 1, 3, 10);                 /* a[3] = 10 */
    printf("after a[3] = 10: sum a[1..4] = %d\n", query(1, 0, N - 1, 1, 4));

    for (int i = 0; i < N; i++) add(i, a[i]);
    printf("Fenwick: sum a[1..4] = %d\n", prefix(4) - prefix(0));
    add(3, 10 - a[3]);
    printf("after a[3] = 10: sum a[1..4] = %d\n", prefix(4) - prefix(0));
    return 0;
}
```
```output
segment tree: sum a[1..4] = 12
after a[3] = 10: sum a[1..4] = 21
Fenwick: sum a[1..4] = 12
after a[3] = 10: sum a[1..4] = 21
```

## GATE-style practice questions

```quiz
q: A segment tree is built over an array of 8 elements (n a power of 2). How many nodes does it have?
answer: 15
verify: 2 * 8 - 1
explain: A full binary tree with 8 leaves has 2n − 1 = 15 nodes.
```

```quiz
q: In a Fenwick tree (1-based), how many elements does bit[12] cover?
answer: 4
verify: 12 & -12
explain: 12 = 1100₂; its lowest set bit is 4, so bit[12] holds the sum of positions 9 to 12.
```

```quiz
q: Which indices does a Fenwick prefix-sum query for i = 13 visit (1-based)?
* 13, 12, 8
- 13, 14, 16
- 13, 11, 7
- 13, 6, 3
explain: Remove the lowest set bit each time: 13 (1101) → 12 (1100) → 8 (1000) → 0.
```

```quiz
q: An array receives many range-sum queries and many point updates, mixed together. Which structure gives O(log n) for both?
- A plain prefix-sum array
* A segment tree or a Fenwick tree
- A sorted array
- A hash table
explain: Prefix sums make each update O(n); segment and Fenwick trees keep both operations logarithmic.
```
