---
title: Binary Trees and Traversals
chapter: Trees
description: Tree terminology, the four classic traversals, height and counting nodes.
---
A **tree** is a hierarchy of nodes. The top node is the **root**; every other node has exactly one **parent**. Nodes without children are **leaves**. In a **binary tree** every node has at most two children, called **left** and **right**.

```tree
caption: The binary tree used in this lesson
A | root
  B
    D | leaf
    E | leaf
  C
    F | leaf
```

| Term | Meaning (for the tree above) |
| --- | --- |
| Depth of a node | number of edges from the root (depth of E is 2) |
| Height of the tree | number of edges on the longest root-to-leaf path (2) |
| Degree of a node | number of children (B has 2, C has 1) |
| Internal node | a node with at least one child (A, B, C) |

## Special binary trees

- **Full** (proper): every node has 0 or 2 children.
- **Complete:** every level is full except possibly the last, which is filled from the left. Heaps are complete trees.
- **Perfect:** all internal nodes have 2 children and all leaves are at the same depth. A perfect tree of height h has 2^(h+1) − 1 nodes.

## The four traversals

A **traversal** visits every node once. The depth-first traversals differ only in **when** the node itself is visited relative to its subtrees:

| Traversal | Order | Result for the tree above |
| --- | --- | --- |
| Preorder | node, left, right | A B D E C F |
| Inorder | left, node, right | D B E A F C |
| Postorder | left, right, node | D E B F C A |
| Level order (breadth-first) | level by level, left to right | A B C D E F |

```java
import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    static class Node {
        char val;
        Node left, right;
        Node(char val, Node left, Node right) { this.val = val; this.left = left; this.right = right; }
        Node(char val) { this(val, null, null); }
    }

    static void preorder(Node n, StringBuilder out) {
        if (n == null) return;
        out.append(n.val).append(' ');
        preorder(n.left, out);
        preorder(n.right, out);
    }

    static void inorder(Node n, StringBuilder out) {
        if (n == null) return;
        inorder(n.left, out);
        out.append(n.val).append(' ');
        inorder(n.right, out);
    }

    static void postorder(Node n, StringBuilder out) {
        if (n == null) return;
        postorder(n.left, out);
        postorder(n.right, out);
        out.append(n.val).append(' ');
    }

    static String levelOrder(Node root) {
        StringBuilder out = new StringBuilder();
        Queue<Node> q = new ArrayDeque<>();
        q.add(root);
        while (!q.isEmpty()) {
            Node n = q.poll();
            out.append(n.val).append(' ');
            if (n.left != null) q.add(n.left);
            if (n.right != null) q.add(n.right);
        }
        return out.toString().trim();
    }

    static int height(Node n) { return n == null ? -1 : 1 + Math.max(height(n.left), height(n.right)); }
    static int count(Node n) { return n == null ? 0 : 1 + count(n.left) + count(n.right); }
    static int leaves(Node n) {
        if (n == null) return 0;
        if (n.left == null && n.right == null) return 1;
        return leaves(n.left) + leaves(n.right);
    }

    public static void main(String[] args) {
        Node root = new Node('A',
            new Node('B', new Node('D'), new Node('E')),
            new Node('C', new Node('F'), null));

        StringBuilder pre = new StringBuilder(), in = new StringBuilder(), post = new StringBuilder();
        preorder(root, pre);
        inorder(root, in);
        postorder(root, post);
        System.out.println("preorder:   " + pre.toString().trim());
        System.out.println("inorder:    " + in.toString().trim());
        System.out.println("postorder:  " + post.toString().trim());
        System.out.println("levelorder: " + levelOrder(root));
        System.out.println("height=" + height(root) + " nodes=" + count(root) + " leaves=" + leaves(root));
    }
}
```
```output
preorder:   A B D E C F
inorder:    D B E A F C
postorder:  D E B F C A
levelorder: A B C D E F
height=2 nodes=6 leaves=3
```
```python
from collections import deque

class Node:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def preorder(n):
    return [n.val] + preorder(n.left) + preorder(n.right) if n else []

def inorder(n):
    return inorder(n.left) + [n.val] + inorder(n.right) if n else []

def postorder(n):
    return postorder(n.left) + postorder(n.right) + [n.val] if n else []

def level_order(root):
    out, q = [], deque([root])
    while q:
        n = q.popleft()
        out.append(n.val)
        if n.left:
            q.append(n.left)
        if n.right:
            q.append(n.right)
    return out

def height(n):
    return -1 if n is None else 1 + max(height(n.left), height(n.right))

def count(n):
    return 0 if n is None else 1 + count(n.left) + count(n.right)

def leaves(n):
    if n is None:
        return 0
    if n.left is None and n.right is None:
        return 1
    return leaves(n.left) + leaves(n.right)

root = Node("A",
            Node("B", Node("D"), Node("E")),
            Node("C", Node("F")))
print("preorder:  ", *preorder(root))
print("inorder:   ", *inorder(root))
print("postorder: ", *postorder(root))
print("levelorder:", *level_order(root))
print(f"height={height(root)} nodes={count(root)} leaves={leaves(root)}")
```
```output
preorder:   A B D E C F
inorder:    D B E A F C
postorder:  D E B F C A
levelorder: A B C D E F
height=2 nodes=6 leaves=3
```
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    char val;
    struct Node *left, *right;
} Node;

Node *node(char val, Node *left, Node *right) {
    Node *n = malloc(sizeof(Node));
    n->val = val;
    n->left = left;
    n->right = right;
    return n;
}

void preorder(Node *n) {
    if (!n) return;
    printf(" %c", n->val);
    preorder(n->left);
    preorder(n->right);
}

void inorder(Node *n) {
    if (!n) return;
    inorder(n->left);
    printf(" %c", n->val);
    inorder(n->right);
}

void postorder(Node *n) {
    if (!n) return;
    postorder(n->left);
    postorder(n->right);
    printf(" %c", n->val);
}

void level_order(Node *root) {
    Node *queue[64];
    int head = 0, tail = 0;
    queue[tail++] = root;
    while (head < tail) {
        Node *n = queue[head++];
        printf(" %c", n->val);
        if (n->left) queue[tail++] = n->left;
        if (n->right) queue[tail++] = n->right;
    }
}

int max(int a, int b) { return a > b ? a : b; }
int height(Node *n) { return n ? 1 + max(height(n->left), height(n->right)) : -1; }
int count(Node *n) { return n ? 1 + count(n->left) + count(n->right) : 0; }
int leaves(Node *n) {
    if (!n) return 0;
    if (!n->left && !n->right) return 1;
    return leaves(n->left) + leaves(n->right);
}

int main(void) {
    Node *root = node('A',
        node('B', node('D', NULL, NULL), node('E', NULL, NULL)),
        node('C', node('F', NULL, NULL), NULL));
    printf("preorder:  "); preorder(root); printf("\n");
    printf("inorder:   "); inorder(root); printf("\n");
    printf("postorder: "); postorder(root); printf("\n");
    printf("levelorder:"); level_order(root); printf("\n");
    printf("height=%d nodes=%d leaves=%d\n", height(root), count(root), leaves(root));
    return 0;
}
```
```output
preorder:   A B D E C F
inorder:    D B E A F C
postorder:  D E B F C A
levelorder: A B C D E F
height=2 nodes=6 leaves=3
```

Each traversal visits every node once, so it takes **Θ(n)** time. The recursive versions use O(h) stack space, where h is the height.

## Rebuilding a tree from traversals

Preorder (or postorder) **together with inorder** identifies a binary tree uniquely: the first preorder item is the root, and its position in the inorder sequence splits the remaining nodes into left and right subtrees. Preorder with postorder alone is not enough in general.

## Useful counting facts

- A binary tree of height h has at most 2^(h+1) − 1 nodes, so a tree with n nodes has height at least ⌈log₂(n+1)⌉ − 1.
- In any binary tree, the number of leaves = (number of nodes with two children) + 1.
- The number of structurally different binary trees with n nodes is the Catalan number C(2n, n) / (n + 1): 1, 2, 5, 14, 42, ...

## GATE-style practice questions

```quiz
q: The preorder traversal of a binary tree is `P Q S T R U` and its inorder traversal is `S Q T P U R`. What is its **postorder** traversal?
- S T Q R U P
* S T Q U R P
- T S Q U R P
- S Q T U R P
explain: P is the root (first in preorder). In inorder, `S Q T` is the left subtree and `U R` the right. In the left part Q is the root (next in preorder) with children S and T. In the right part R is the root with left child U. Postorder: S T Q, then U R, then P.
```

```quiz
q: A binary tree has 20 nodes with two children each. How many **leaves** does it have?
answer: 21
verify: 20 + 1
explain: In every binary tree, leaves = nodes with two children + 1. Count edges two ways: n − 1 edges, and also 2·n₂ + 1·n₁ edges, with n = n₀ + n₁ + n₂. Solving gives n₀ = n₂ + 1 = 21.
```

```quiz
q: How many structurally different binary trees can be formed with **4** nodes?
answer: 14
verify: __import__('math').comb(8, 4) // 5
explain: The count is the 4th Catalan number C(2n, n) / (n + 1) = C(8, 4) / 5 = 70 / 5 = 14.
```

```quiz
q: What is the **maximum** number of nodes in a binary tree of height 5? (A single node has height 0.)
answer: 63
verify: 2 ** (5 + 1) - 1
explain: Level d holds at most 2^d nodes, so a tree of height h has at most 1 + 2 + ... + 2^h = 2^(h+1) − 1 = 63 nodes.
```
