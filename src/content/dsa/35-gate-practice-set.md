---
title: GATE Practice Set (Mixed Topics)
chapter: GATE Practice
description: A mixed set of GATE-style MCQ, MSQ and NAT questions covering the whole data structures and algorithms syllabus.
---
This set mixes questions from every lesson in this track, in the three GATE formats:

- **MCQ:** exactly one option is correct.
- **MSQ:** one or more options are correct, and you must pick all of them.
- **NAT:** type a number.

Work each question out on paper before pressing **Check answer**. Each explanation names the lesson to revise if you got it wrong. Every numerical answer on this page has been recomputed by a program.

## Data structures

```quiz
q: **[Heaps]** A binary min-heap contains 1000 elements. How many of its nodes are **leaves**?
answer: 500
verify: 1000 - 1000 // 2
explain: In a heap (a complete binary tree) stored in an array, the nodes at indices ⌊n/2⌋ to n − 1 (0-based) are leaves, so there are n − ⌊n/2⌋ = 500 leaves. Revise: Heaps and Priority Queues.
```

```quiz
q: **[Stacks]** What is the value of the **prefix** expression `- + 8 / 6 3 2`?
answer: 8
verify: (8 + 6 // 3) - 2
explain: Read it as − ( + 8 ( / 6 3 ) ) 2 = (8 + 2) − 2 = 8. A prefix expression is evaluated like postfix, but scanning from right to left. Revise: Stacks.
```

```quiz
q: **[Hashing]** Keys 22, 33 and 44 are inserted in that order into an empty table of size 11 with h(k) = k mod 11 and **quadratic probing** (try h, h + 1², h + 2², ... mod 11). In which slot is 44 stored?
answer: 4
verify:
  table = [None] * 11
  for k in [22, 33, 44]:
      i = 0
      while table[(k % 11 + i * i) % 11] is not None:
          i += 1
      table[(k % 11 + i * i) % 11] = k
  print(table.index(44))
explain: All three keys hash to 0. 22 goes to 0. 33 tries 0, then 0 + 1 = 1. 44 tries 0, 1 (both taken), then 0 + 4 = 4. Revise: Hash Tables.
```

```quiz
q: **[BST]** The preorder traversal of a binary search tree is `30 20 10 25 40 35 50`. What is the **4th** element of its postorder traversal?
answer: 35
verify:
  def insert(t, k):
      if t is None:
          return [k, None, None]
      i = 1 if k < t[0] else 2
      t[i] = insert(t[i], k)
      return t
  def post(t):
      return post(t[1]) + post(t[2]) + [t[0]] if t else []
  root = None
  for k in [30, 20, 10, 25, 40, 35, 50]:
      root = insert(root, k)
  print(post(root)[3])
explain: Inserting the keys in preorder rebuilds the BST: 30 with left subtree 20 (children 10, 25) and right subtree 40 (children 35, 50). Postorder is 10 25 20 35 50 40 30, and its 4th element is 35. Revise: Binary Search Trees.
```

```quiz
q: **[AVL trees]** What is the maximum possible height of an AVL tree with 12 nodes? (A single node has height 0.)
answer: 4
verify:
  N = [1, 2]
  while len(N) < 10:
      N.append(N[-1] + N[-2] + 1)
  print(max(h for h, n in enumerate(N) if n <= 12))
explain: The minimum node counts are N(0..5) = 1, 2, 4, 7, 12, 20. N(4) = 12 ≤ 12 < 20 = N(5), so the height is at most 4. Revise: AVL Trees.
```

```quiz
q: **[Linked lists]** Which pair of structures gives an **LRU cache** with O(1) `get` and O(1) `put` (evicting the least recently used item)?
- A stack and a queue
- A binary heap and an array
* A hash table and a doubly linked list
- A binary search tree and a singly linked list
explain: The hash table finds an item's node in O(1). The doubly linked list keeps items in order of use: a used item is unlinked and moved to the front in O(1), and the item at the back is evicted in O(1). A singly linked list cannot unlink a node in O(1) without its predecessor. Revise: Linked Lists and Hash Tables.
```

```quiz
q: **[Trees]** Which statements are **true** for every binary tree with n ≥ 1 nodes? (Select all that apply.)
* It has exactly n − 1 edges
* Its height is at least ⌈log₂(n + 1)⌉ − 1
- It has at least n/2 leaves
* The number of leaves is one more than the number of nodes with two children
explain: Every node except the root has one parent edge, so there are n − 1 edges. A tree of height h holds at most 2^(h+1) − 1 nodes, which gives the height bound. A chain (every node with one child) has just 1 leaf, so "at least n/2 leaves" is false. The last fact holds for every binary tree. Revise: Binary Trees and Traversals.
```

## Algorithms

```quiz
q: **[Recurrences]** What is the solution of T(n) = 2T(√n) + log₂ n?
- Θ(log n)
* Θ(log n · log log n)
- Θ(√n log n)
- Θ(n)
explain: Substitute m = log₂ n, so √n corresponds to m/2. With S(m) = T(2^m), the recurrence becomes S(m) = 2S(m/2) + m, which is Θ(m log m) by the master theorem. Substituting back gives Θ(log n · log log n). Revise: Recursion and Recurrence Relations.
```

```quiz
q: **[Sorting]** How many swaps does bubble sort make on the array [3, 1, 4, 1, 5, 9, 2, 6]? (Equal elements are never swapped.)
answer: 8
verify: (lambda a: sum(a[i] > a[j] for i in range(len(a)) for j in range(i + 1, len(a))))([3, 1, 4, 1, 5, 9, 2, 6])
explain: Bubble sort makes exactly one swap per inversion. The inversions are (3,1), (3,1), (3,2), (4,1), (4,2), (5,2), (9,2) and (9,6), which is 8 in total. Revise: Simple Sorting.
```

```quiz
q: **[Sorting]** Which algorithm sorts in Θ(n log n) time in the **worst** case using only O(1) extra memory?
- Merge sort
- Quick sort
* Heapsort
- Counting sort
explain: Merge sort needs O(n) extra memory. Quick sort is Θ(n²) in the worst case. Counting sort is not a general comparison sort and needs O(n + k) memory. Heapsort is Θ(n log n) in every case and sorts in place. Revise: Fast Sorting.
```

```quiz
q: **[Graphs]** How many edges does a complete undirected graph on 10 vertices have?
answer: 45
verify: 10 * 9 // 2
explain: Every pair of vertices is joined by one edge, so there are C(10, 2) = 10 × 9 / 2 = 45 edges. Revise: Graphs, BFS and DFS.
```

```quiz
q: **[Graphs]** How many topological orderings does a DAG with 4 vertices and exactly two edges, a → b and c → d, have?
answer: 6
verify:
  from itertools import permutations
  print(sum(p.index('a') < p.index('b') and p.index('c') < p.index('d') for p in permutations('abcd')))
explain: Out of the 4! = 24 orderings, a must come before b (half of them) and c before d (half again): 24 / 4 = 6. Revise: Graphs, BFS and DFS.
```

```quiz
q: **[Shortest paths and MST]** Which statements are **true**? (Select all that apply.)
* Dijkstra's algorithm may give wrong distances if some edge weights are negative
* Bellman-Ford can detect a negative-weight cycle reachable from the source
- The shortest path between two vertices always uses only edges of the minimum spanning tree
* If all edge weights are distinct, the minimum spanning tree is unique
explain: A minimum spanning tree minimises the total weight of a tree, not individual paths. In a triangle with edges 1, 1 and 1.5, the direct 1.5 edge is the shortest path between its ends but is not in the MST. The other statements are standard results. Revise: Shortest Paths and Minimum Spanning Trees.
```

```quiz
q: **[Dynamic programming]** In how many different ways can you climb a staircase of 10 steps if each move climbs either 1 or 2 steps?
answer: 89
verify:
  ways = [1, 1]
  for n in range(2, 11):
      ways.append(ways[-1] + ways[-2])
  print(ways[10])
explain: Let W(n) be the number of ways. The last move is 1 step (from n − 1) or 2 steps (from n − 2), so W(n) = W(n − 1) + W(n − 2) with W(0) = W(1) = 1. This is the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89. Revise: Dynamic Programming.
```

```quiz
q: **[Greedy and divide and conquer]** Which statements are **true**? (Select all that apply.)
* Huffman coding produces an optimal prefix code
* Fast exponentiation computes xⁿ with O(log n) multiplications
- Greedy selection by value-per-weight always solves 0/1 knapsack optimally
- The maximum and minimum of n numbers cannot be found together with fewer than 2n − 2 comparisons
explain: Greedy fails for 0/1 knapsack (it needs dynamic programming). The divide-and-conquer max-min method needs only about 3n/2 − 2 comparisons, fewer than 2n − 2. Revise: Greedy Algorithms and Divide and Conquer.
```

```quiz
q: **[Complexity]** An algorithm takes 1 second for an input of size 1000. Assuming its running time is exactly c·n², about how many seconds will it take for size 4000?
answer: 16
verify: (4000 / 1000) ** 2 and int((4000 / 1000) ** 2)
explain: Multiplying n by 4 multiplies n² by 4² = 16, so it takes about 16 seconds. Revise: Time and Space Complexity.
```
