---
title: AVL Trees (Self-Balancing BSTs)
chapter: Trees
description: Keep a BST balanced with rotations so search, insert and delete stay O(log n) in the worst case.
---
A plain BST can degrade into a chain. An **AVL tree** (named after Adelson-Velsky and Landis) is a BST that stays balanced: for **every** node, the heights of its left and right subtrees differ by at most 1.

The **balance factor** of a node is height(left) − height(right). In an AVL tree every balance factor is −1, 0 or +1. (Height of an empty tree is −1, of a single node 0.)

## Height is always O(log n)

Let N(h) be the **minimum** number of nodes in an AVL tree of height h. The sparsest AVL tree of height h has one subtree of height h − 1 and the other of height h − 2:

**N(h) = N(h − 1) + N(h − 2) + 1**, with N(0) = 1 and N(1) = 2.

This grows like the Fibonacci numbers, so h ≤ about 1.44 log₂ n. Search, insert and delete are all **O(log n)** in the worst case.

| h | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| N(h), minimum nodes | 1 | 2 | 4 | 7 | 12 | 20 | 33 |
| 2^(h+1) − 1, maximum nodes | 1 | 3 | 7 | 15 | 31 | 63 | 127 |

## Rotations

After an insertion, walk back up towards the root. At the first node whose balance factor became ±2, one of four cases applies:

| Case | Where the new key went | Fix |
| --- | --- | --- |
| LL | left subtree of the left child | single right rotation |
| RR | right subtree of the right child | single left rotation |
| LR | right subtree of the left child | left rotation on the child, then right rotation |
| RL | left subtree of the right child | right rotation on the child, then left rotation |

```tree
caption: RR case. Inserting 10, 20, 30 makes 10 right-heavy (balance −2)...
10 | balance −2
  20 | balance −1
    30
```

```tree
caption: ...a left rotation at 10 makes 20 the root and the tree is balanced again
20 | balance 0
  10
  30
```

A rotation only changes a few pointers, so it is O(1), and at most one (single or double) rotation is needed per insertion.

## AVL insertion

```java
public class Main {
    static class Node {
        int key, height = 0;
        Node left, right;
        Node(int key) { this.key = key; }
    }

    static int h(Node n) { return n == null ? -1 : n.height; }
    static void update(Node n) { n.height = 1 + Math.max(h(n.left), h(n.right)); }
    static int balance(Node n) { return h(n.left) - h(n.right); }

    static Node rotateRight(Node y) {
        Node x = y.left;
        y.left = x.right;
        x.right = y;
        update(y);
        update(x);
        return x;
    }

    static Node rotateLeft(Node x) {
        Node y = x.right;
        x.right = y.left;
        y.left = x;
        update(x);
        update(y);
        return y;
    }

    static int rotations = 0;

    static Node insert(Node n, int key) {
        if (n == null) return new Node(key);
        if (key < n.key) n.left = insert(n.left, key);
        else n.right = insert(n.right, key);
        update(n);
        int b = balance(n);
        if (b > 1 && key < n.left.key) { rotations++; return rotateRight(n); }                  // LL
        if (b < -1 && key > n.right.key) { rotations++; return rotateLeft(n); }                 // RR
        if (b > 1) { rotations += 2; n.left = rotateLeft(n.left); return rotateRight(n); }      // LR
        if (b < -1) { rotations += 2; n.right = rotateRight(n.right); return rotateLeft(n); }   // RL
        return n;
    }

    static void preorder(Node n, StringBuilder out) {
        if (n == null) return;
        out.append(n.key).append(' ');
        preorder(n.left, out);
        preorder(n.right, out);
    }

    public static void main(String[] args) {
        Node root = null;
        for (int k : new int[]{10, 20, 30, 40, 50, 25}) {
            root = insert(root, k);
            StringBuilder sb = new StringBuilder();
            preorder(root, sb);
            System.out.println("insert " + k + ": preorder " + sb.toString().trim() + ", height " + h(root));
        }
        System.out.println("rotations used: " + rotations);

        Node chain = null;
        for (int k = 1; k <= 1000; k++) chain = insert(chain, k);
        System.out.println("height after inserting 1..1000 in order: " + h(chain));
    }
}
```
```output
insert 10: preorder 10, height 0
insert 20: preorder 10 20, height 1
insert 30: preorder 20 10 30, height 1
insert 40: preorder 20 10 30 40, height 2
insert 50: preorder 20 10 40 30 50, height 2
insert 25: preorder 30 20 10 25 40 50, height 2
rotations used: 4
height after inserting 1..1000 in order: 9
```
```python
class Node:
    def __init__(self, key):
        self.key, self.left, self.right, self.height = key, None, None, 0

def h(n):
    return -1 if n is None else n.height

def update(n):
    n.height = 1 + max(h(n.left), h(n.right))

def rotate_right(y):
    x = y.left
    y.left, x.right = x.right, y
    update(y)
    update(x)
    return x

def rotate_left(x):
    y = x.right
    x.right, y.left = y.left, x
    update(x)
    update(y)
    return y

rotations = 0

def insert(n, key):
    global rotations
    if n is None:
        return Node(key)
    if key < n.key:
        n.left = insert(n.left, key)
    else:
        n.right = insert(n.right, key)
    update(n)
    b = h(n.left) - h(n.right)
    if b > 1 and key < n.left.key:                       # LL
        rotations += 1
        return rotate_right(n)
    if b < -1 and key > n.right.key:                     # RR
        rotations += 1
        return rotate_left(n)
    if b > 1:                                            # LR
        rotations += 2
        n.left = rotate_left(n.left)
        return rotate_right(n)
    if b < -1:                                           # RL
        rotations += 2
        n.right = rotate_right(n.right)
        return rotate_left(n)
    return n

def preorder(n):
    return [n.key] + preorder(n.left) + preorder(n.right) if n else []

root = None
for k in [10, 20, 30, 40, 50, 25]:
    root = insert(root, k)
    print(f"insert {k}: preorder {' '.join(map(str, preorder(root)))}, height {h(root)}")
print("rotations used:", rotations)

chain = None
for k in range(1, 1001):
    chain = insert(chain, k)
print("height after inserting 1..1000 in order:", h(chain))
```
```output
insert 10: preorder 10, height 0
insert 20: preorder 10 20, height 1
insert 30: preorder 20 10 30, height 1
insert 40: preorder 20 10 30 40, height 2
insert 50: preorder 20 10 40 30 50, height 2
insert 25: preorder 30 20 10 25 40 50, height 2
rotations used: 4
height after inserting 1..1000 in order: 9
```

Inserting 1 to 1000 in sorted order, which turns a plain BST into a chain of height 999, gives an AVL tree of height only 9.

- Inserting 30 was an **RR** case (one left rotation at 10).
- Inserting 50 was **RR** at 30.
- Inserting 25 made 20 unbalanced through its right child's **left** subtree, an **RL** case (two rotations).

## AVL vs red-black trees

**Red-black trees** use a looser rule (no path is more than twice as long as another), so they need fewer rotations on insert and delete, but searches can be slightly deeper. Both guarantee O(log n). Java's `TreeMap` and C++'s `std::map` use red-black trees.

## GATE-style practice questions

```quiz
q: What is the **minimum** number of nodes in an AVL tree of height 5? (A single node has height 0.)
answer: 20
verify: (lambda f: f(f, 5))(lambda f, h: 1 if h == 0 else 2 if h == 1 else f(f, h - 1) + f(f, h - 2) + 1)
explain: N(h) = N(h − 1) + N(h − 2) + 1 with N(0) = 1 and N(1) = 2 gives 1, 2, 4, 7, 12, 20.
```

```quiz
q: What is the **maximum** possible height of an AVL tree with 7 nodes? (A single node has height 0.)
answer: 3
verify: max(h for h in range(10) if (lambda f: f(f, h))(lambda f, k: 1 if k == 0 else 2 if k == 1 else f(f, k - 1) + f(f, k - 2) + 1) <= 7)
explain: An AVL tree of height h needs at least N(h) nodes. N(3) = 7 ≤ 7 but N(4) = 12 > 7, so the height can be at most 3.
```

```quiz
q: The keys 50, 20, 30 are inserted in this order into an empty AVL tree. Which rotation happens, and what is the root afterwards?
- A single right rotation; the root is 20
- A single left rotation; the root is 50
* A left-right double rotation; the root is 30
- No rotation is needed; the root is 50
explain: 20 goes left of 50, and 30 goes right of 20. Node 50 now has balance +2, caused by the right subtree of its left child: the LR case. Rotating left at 20 and then right at 50 makes 30 the root with children 20 and 50.
```

```quiz
q: Which statements about AVL trees are **true**? (Select all that apply.)
* Search takes O(log n) time in the worst case
* An insertion needs at most one single or double rotation to restore balance
- The balance factor of every node is either 0 or 1
* An inorder traversal visits the keys in sorted order
explain: The balance factor may be −1, 0 or +1. An AVL tree is still a BST, so inorder gives sorted keys, and its O(log n) height gives worst-case O(log n) search. After an insertion, one rotation (single or double) at the lowest unbalanced node restores the height of that subtree, so no further fixes are needed.
```
