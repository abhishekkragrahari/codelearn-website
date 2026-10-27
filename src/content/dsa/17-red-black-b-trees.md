---
title: Red-Black Trees, B-Trees and B+ Trees
chapter: Trees
description: Red-black tree properties and height bound, recolouring and rotations, B-trees of order m with node splitting, B+ trees for database indexes, and height and capacity calculations.
---
AVL trees keep a BST balanced very strictly. Two other balanced trees are used even more in practice: **red-black trees** (inside Java's `TreeMap`, C++'s `std::map` and the Linux kernel) and **B-trees / B+ trees** (inside almost every database and file system).

## Red-black trees

A red-black tree is a BST where every node is **red** or **black** and:

1. The root is black.
2. Every leaf (NIL) is black.
3. A red node has **no red child** (no two reds in a row).
4. Every path from a node down to its NIL leaves has the **same number of black nodes** (the black-height).

```tree
caption: A valid red-black tree (B = black, R = red)
20 | B
  10 | B
    5 | R
    15 | R
  30 | B
    25 | R
    40 | R
```

**Height bound:** the shortest root-to-leaf path is all black, and the longest alternates red and black, so no path is more than twice as long as another: **h ≤ 2 log₂(n + 1)**. Search, insert and delete are all **O(log n)**.

**Insertion:** insert as in a BST and colour the new node red. If its parent is also red:

- **Uncle red:** recolour parent and uncle black and grandparent red; continue upward.
- **Uncle black:** one or two **rotations** plus recolouring fix it locally.

At most **2 rotations** per insertion (and 3 per deletion), fewer than AVL needs on average, which is why red-black trees are preferred when updates are frequent. AVL trees are more tightly balanced (height ≤ 1.44 log₂ n), so lookups are slightly faster.

## B-trees

Disks and SSDs read data in blocks. A **B-tree** keeps many keys in each node so that the tree is very short, and each node fits one block.

A B-tree of **order m** (maximum m children):

- Every node has at most **m − 1 keys** and m children.
- Every node except the root has at least **⌈m/2⌉ children** (⌈m/2⌉ − 1 keys).
- The root has at least 2 children (if it is not a leaf).
- **All leaves are at the same depth.**
- Keys in a node are sorted and separate the key ranges of its children.

```tree
caption: A B-tree of order 3 (2-3 tree) holding 10, 20, 30, 40, 50, 60, 70
40
  20
    10
    30
  60
    50
    70
```

**Insertion:** insert into the right leaf; if it overflows (m keys), **split** it: the middle key moves up to the parent, which may split in turn. The tree grows **at the root**, which keeps all leaves at the same level.

**Deletion:** remove the key; if a node underflows, **borrow** from a sibling or **merge** with it.

**Height:** with minimum degree t = ⌈m/2⌉, a B-tree with n keys has height h ≤ log_t((n + 1)/2). With m = 200, three levels hold millions of keys, so a lookup costs only about three disk reads.

## B+ trees

A B+ tree stores **all records (or record pointers) in the leaves**; internal nodes hold only keys for routing, and the **leaves are linked** in sorted order.

| Feature | B-tree | B+ tree |
| --- | --- | --- |
| Data pointers | In every node | Only in leaves |
| Keys repeated? | No | Internal keys are copies of leaf keys |
| Range queries | Need tree traversal | Scan along the linked leaves |
| Fan-out | Lower | Higher (internal nodes are smaller) |

That is why database indexes use B+ trees. The [Indexing](../dbms/indexing.html) lesson computes their order from block sizes.

## Order of a B+ tree node

With block size B, key size K and pointer size P:

- Internal node of order p (p pointers, p − 1 keys): **p·P + (p − 1)·K ≤ B**.
- Example: B = 1024 bytes, K = 9, P = 7 → 7p + 9(p − 1) ≤ 1024 → 16p ≤ 1033 → **p = 64**.

## GATE-style practice questions

```quiz
q: What is the maximum height of a red-black tree with 15 internal nodes, using h ≤ 2 log₂(n + 1)?
answer: 8
verify: 2 * __import__("math").log2(15 + 1)
explain: 2 log₂ 16 = 8.
```

```quiz
q: A B+ tree internal node must fit in a 512-byte block. Keys are 10 bytes and child pointers 6 bytes. What is the largest possible order p?
answer: 32
verify: max(p for p in range(1, 200) if 6 * p + 10 * (p - 1) <= 512)
explain: 6p + 10(p − 1) ≤ 512 gives 16p ≤ 522, so p = 32.
```

```quiz
q: In a B-tree of order 5, what is the minimum number of keys in a non-root node?
answer: 2
verify: -(-5 // 2) - 1
explain: A non-root node has at least ⌈5/2⌉ = 3 children, hence at least 2 keys.
```

```quiz
q: Which statements are true? (Select all that apply.)
* All leaves of a B-tree are at the same level
* A B-tree grows in height only when the root splits
* Red-black trees need at most two rotations per insertion
- In a red-black tree a red node may have a red child
explain: Property 3 forbids two consecutive red nodes; the other three statements are standard facts.
```

```quiz
q: Database indexes prefer B+ trees over B-trees mainly because:
* Linked leaves make range queries fast and internal nodes have higher fan-out
- B+ trees never need to split nodes
- B+ trees store fewer keys
- B+ trees are binary trees
explain: Routing-only internal nodes hold more keys per block, and the leaf chain gives sequential access for ranges.
```
