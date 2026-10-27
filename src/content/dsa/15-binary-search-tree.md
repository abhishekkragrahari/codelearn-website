---
title: Binary Search Trees
chapter: Trees
description: Keep keys ordered so search, insert and delete take time proportional to the height.
---
A **binary search tree (BST)** is a binary tree with an ordering rule: for every node, all keys in its **left** subtree are smaller and all keys in its **right** subtree are larger. That rule lets search throw away half of the tree at each step, like binary search on a sorted array.

```tree
caption: The BST built by inserting 50, 30, 70, 20, 40, 60, 80
50 | root
  30
    20
    40
  70
    60
    80
```

An **inorder** traversal of a BST visits the keys in **sorted** order: 20 30 40 50 60 70 80.

## Search, insert and delete

- **Search / insert:** start at the root and go left if the key is smaller, right if it is larger.
- **Delete** has three cases:
  1. The node is a leaf: just remove it.
  2. The node has one child: replace the node with that child.
  3. The node has two children: copy in its **inorder successor** (the smallest key in its right subtree), then delete that successor from the right subtree.

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        BST t = new BST();
        for (int k : new int[]{50, 30, 70, 20, 40, 60, 80}) t.insert(k);
        System.out.println("inorder: " + t.inorder());
        System.out.println("contains 60? " + t.contains(60) + ", contains 65? " + t.contains(65));
        System.out.println("min=" + t.min() + " max=" + t.max() + " height=" + t.height());

        t.delete(20);   // leaf
        t.delete(30);   // one child (40)
        t.delete(50);   // two children: replaced by its successor 60
        System.out.println("after deletes: " + t.inorder() + ", root = " + t.root.key);
    }
}

class BST {
    static class Node {
        int key;
        Node left, right;
        Node(int key) { this.key = key; }
    }

    Node root;

    void insert(int key) { root = insert(root, key); }

    private Node insert(Node n, int key) {
        if (n == null) return new Node(key);
        if (key < n.key) n.left = insert(n.left, key);
        else if (key > n.key) n.right = insert(n.right, key);
        return n;                                   // duplicates are ignored
    }

    boolean contains(int key) {
        Node n = root;
        while (n != null) {
            if (key == n.key) return true;
            n = key < n.key ? n.left : n.right;
        }
        return false;
    }

    int min() { Node n = root; while (n.left != null) n = n.left; return n.key; }
    int max() { Node n = root; while (n.right != null) n = n.right; return n.key; }

    int height() { return height(root); }
    private int height(Node n) { return n == null ? -1 : 1 + Math.max(height(n.left), height(n.right)); }

    void delete(int key) { root = delete(root, key); }

    private Node delete(Node n, int key) {
        if (n == null) return null;
        if (key < n.key) n.left = delete(n.left, key);
        else if (key > n.key) n.right = delete(n.right, key);
        else {
            if (n.left == null) return n.right;          // cases 1 and 2
            if (n.right == null) return n.left;
            Node succ = n.right;                          // case 3: inorder successor
            while (succ.left != null) succ = succ.left;
            n.key = succ.key;
            n.right = delete(n.right, succ.key);
        }
        return n;
    }

    List<Integer> inorder() { List<Integer> out = new ArrayList<>(); inorder(root, out); return out; }
    private void inorder(Node n, List<Integer> out) {
        if (n == null) return;
        inorder(n.left, out);
        out.add(n.key);
        inorder(n.right, out);
    }
}
```
```output
inorder: [20, 30, 40, 50, 60, 70, 80]
contains 60? true, contains 65? false
min=20 max=80 height=2
after deletes: [40, 60, 70, 80], root = 60
```
```python
class Node:
    def __init__(self, key):
        self.key, self.left, self.right = key, None, None

def insert(n, key):
    if n is None:
        return Node(key)
    if key < n.key:
        n.left = insert(n.left, key)
    elif key > n.key:
        n.right = insert(n.right, key)
    return n                                   # duplicates are ignored

def contains(n, key):
    while n:
        if key == n.key:
            return True
        n = n.left if key < n.key else n.right
    return False

def height(n):
    return -1 if n is None else 1 + max(height(n.left), height(n.right))

def delete(n, key):
    if n is None:
        return None
    if key < n.key:
        n.left = delete(n.left, key)
    elif key > n.key:
        n.right = delete(n.right, key)
    else:
        if n.left is None:                     # cases 1 and 2
            return n.right
        if n.right is None:
            return n.left
        succ = n.right                         # case 3: inorder successor
        while succ.left:
            succ = succ.left
        n.key = succ.key
        n.right = delete(n.right, succ.key)
    return n

def inorder(n):
    return inorder(n.left) + [n.key] + inorder(n.right) if n else []

root = None
for k in [50, 30, 70, 20, 40, 60, 80]:
    root = insert(root, k)
print("inorder:", inorder(root))
print("contains 60?", contains(root, 60), "contains 65?", contains(root, 65))
print("height =", height(root))

for k in [20, 30, 50]:          # a leaf, a node with one child, a node with two
    root = delete(root, k)
print("after deletes:", inorder(root), "root =", root.key)
```
```output
inorder: [20, 30, 40, 50, 60, 70, 80]
contains 60? True contains 65? False
height = 2
after deletes: [40, 60, 70, 80] root = 60
```
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int key;
    struct Node *left, *right;
} Node;

Node *insert(Node *n, int key) {
    if (!n) {
        n = calloc(1, sizeof(Node));
        n->key = key;
        return n;
    }
    if (key < n->key) n->left = insert(n->left, key);
    else if (key > n->key) n->right = insert(n->right, key);
    return n;                                    /* duplicates are ignored */
}

int contains(Node *n, int key) {
    while (n) {
        if (key == n->key) return 1;
        n = key < n->key ? n->left : n->right;
    }
    return 0;
}

int min_key(Node *n) { while (n->left) n = n->left; return n->key; }
int max_key(Node *n) { while (n->right) n = n->right; return n->key; }
int height(Node *n) {
    if (!n) return -1;
    int l = height(n->left), r = height(n->right);
    return 1 + (l > r ? l : r);
}

Node *delete(Node *n, int key) {
    if (!n) return NULL;
    if (key < n->key) n->left = delete(n->left, key);
    else if (key > n->key) n->right = delete(n->right, key);
    else {
        if (!n->left) { Node *r = n->right; free(n); return r; }     /* cases 1 and 2 */
        if (!n->right) { Node *l = n->left; free(n); return l; }
        Node *succ = n->right;                                        /* case 3: inorder successor */
        while (succ->left) succ = succ->left;
        n->key = succ->key;
        n->right = delete(n->right, succ->key);
    }
    return n;
}

int first;
void inorder(Node *n) {
    if (!n) return;
    inorder(n->left);
    printf(first ? "%d" : ", %d", n->key);
    first = 0;
    inorder(n->right);
}
void print_inorder(Node *root) { first = 1; printf("["); inorder(root); printf("]"); }

int main(void) {
    Node *root = NULL;
    int keys[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) root = insert(root, keys[i]);
    printf("inorder: "); print_inorder(root); printf("\n");
    printf("contains 60? %s, contains 65? %s\n", contains(root, 60) ? "true" : "false", contains(root, 65) ? "true" : "false");
    printf("min=%d max=%d height=%d\n", min_key(root), max_key(root), height(root));

    root = delete(root, 20);    /* leaf */
    root = delete(root, 30);    /* one child (40) */
    root = delete(root, 50);    /* two children: replaced by its successor 60 */
    printf("after deletes: "); print_inorder(root); printf(", root = %d\n", root->key);
    return 0;
}
```
```output
inorder: [20, 30, 40, 50, 60, 70, 80]
contains 60? true, contains 65? false
min=20 max=80 height=2
after deletes: [40, 60, 70, 80], root = 60
```

## Why balance matters

Every operation walks one root-to-leaf path, so it takes **O(h)** time. If keys arrive in random order, h is about 1.39 log₂ n on average. But inserting keys in **sorted** order gives a "tree" that is just a chain, with h = n − 1, and every operation becomes O(n).

```pipeline
caption: Inserting 10, 20, 30, 40 in order produces a chain, not a bushy tree
10 | root
20 | right child
30 | right child
40 | right child
```

**Self-balancing** BSTs such as **AVL trees** (heights of the two subtrees of every node differ by at most 1) and **red-black trees** rotate nodes during insert and delete to keep h = O(log n) always. Java's `TreeMap` and C++'s `std::map` are red-black trees.

| Operation | BST average | BST worst | AVL / red-black worst |
| --- | --- | --- | --- |
| Search | O(log n) | O(n) | O(log n) |
| Insert | O(log n) | O(n) | O(log n) |
| Delete | O(log n) | O(n) | O(log n) |

## GATE-style practice questions

```quiz
q: The keys 45, 20, 60, 10, 30, 50, 70, 25 are inserted in this order into an empty BST. What is the **height** of the resulting tree? (A single node has height 0.)
answer: 3
verify: (lambda keys: (lambda ins, h: h(h, __import__('functools').reduce(lambda t, k: ins(ins, t, k), keys, None)))(lambda f, t, k: (k, None, None) if t is None else ((t[0], f(f, t[1], k), t[2]) if k < t[0] else (t[0], t[1], f(f, t[2], k))), lambda f, t: -1 if t is None else 1 + max(f(f, t[1]), f(f, t[2]))))([45, 20, 60, 10, 30, 50, 70, 25])
explain: 45 is the root; 20 and 60 are its children; 10 and 30 go under 20; 50 and 70 under 60; 25 goes left of 30. The longest path is 45 → 20 → 30 → 25, which has 3 edges.
```

```quiz
q: In the BST built from 50, 30, 70, 20, 40, 60, 80, the root 50 is deleted using the **inorder successor**. Which key becomes the new root?
- 40
- 30
* 60
- 70
explain: The inorder successor of 50 is the smallest key in its right subtree, which is 60 (go right to 70, then all the way left). 60 is copied into the root and the original 60, a leaf, is removed.
```

```quiz
q: Which statements about binary search trees are **true**? (Select all that apply.)
* An inorder traversal visits the keys in increasing order
* Inserting n keys in sorted order into an empty plain BST gives height n − 1
- Search in any BST with n nodes takes O(log n) time in the worst case
* In an AVL tree, the heights of the two subtrees of every node differ by at most 1
explain: Search takes O(h), and h can be n − 1 for an unbalanced BST, so O(log n) worst-case search needs a balanced tree such as AVL or red-black. The other three statements follow directly from the definitions.
```

```quiz
q: What is the **minimum** possible height of a BST containing 100 keys? (A single node has height 0.)
answer: 6
verify: next(h for h in range(100) if 2 ** (h + 1) - 1 >= 100)
explain: A tree of height h holds at most 2^(h+1) − 1 keys. 2^6 − 1 = 63 < 100 but 2^7 − 1 = 127 ≥ 100, so the height is at least 6, and a balanced tree achieves it.
```
