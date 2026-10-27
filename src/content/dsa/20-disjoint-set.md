---
title: Disjoint Set Union (Union-Find)
chapter: Advanced Data Structures
description: The union-find data structure: make-set, find and union, union by rank and path compression, the inverse Ackermann bound, and uses in Kruskal's algorithm, cycle detection and connected components.
---
A **disjoint-set** (union-find) structure keeps track of items split into non-overlapping groups. It answers two questions very fast:

- **find(x):** which group is x in? (returns the group's representative, its root)
- **union(x, y):** merge the groups of x and y.

It powers Kruskal's minimum spanning tree algorithm, cycle detection in undirected graphs, connected components of a changing network, and image segmentation.

## Representation

Each group is a tree; every item points to its parent, and the root points to itself and represents the group.

```tree
caption: Two sets {0, 1, 2} and {3, 4, 5, 6} as parent-pointer trees
0 | root
  1
  2
3 | root
  4
  5
    6
```

## Making it fast

Naively, a tree can become a long chain and find becomes O(n). Two simple ideas fix this:

1. **Union by rank (or size):** attach the root of the shorter (smaller) tree under the root of the taller one. Alone, this keeps the height **O(log n)**.
2. **Path compression:** during find(x), make every node on the path point directly to the root. Later finds on those nodes take one step.

With both, a sequence of m operations on n items takes **O(m α(n))**, where α is the inverse Ackermann function. α(n) ≤ 4 for any n that fits in the universe, so each operation is **effectively constant time**.

```flowchart
caption: find with path compression
start: find(x)
if: parent[x] == x?
  yes:
    io: Return x (the root)
  no:
    step: parent[x] = find(parent[x])
    io: Return parent[x]
end: Done
```

## The code

Processing graph edges one by one: each union that joins two different sets reduces the number of components by one, and an edge whose ends are already in the same set closes a **cycle**.

```java
public class Main {
    static int[] parent, rank;

    static int find(int x) {                     // path compression
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    static boolean union(int a, int b) {         // union by rank; false if already joined
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (rank[ra] < rank[rb]) { int t = ra; ra = rb; rb = t; }
        parent[rb] = ra;                         // attach the shorter tree under the taller
        if (rank[ra] == rank[rb]) rank[ra]++;
        return true;
    }

    public static void main(String[] args) {
        int n = 7;
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        int[][] edges = {{0, 1}, {1, 2}, {3, 4}, {5, 6}, {2, 0}, {4, 5}};
        int components = n;
        for (int[] e : edges) {
            if (union(e[0], e[1])) {
                components--;
                System.out.println("union " + e[0] + "-" + e[1] + ": components = " + components);
            } else {
                System.out.println("edge " + e[0] + "-" + e[1] + " closes a cycle");
            }
        }
        System.out.println("0 and 2 connected? " + (find(0) == find(2)));
        System.out.println("0 and 6 connected? " + (find(0) == find(6)));
    }
}
```
```output
union 0-1: components = 6
union 1-2: components = 5
union 3-4: components = 4
union 5-6: components = 3
edge 2-0 closes a cycle
union 4-5: components = 2
0 and 2 connected? true
0 and 6 connected? false
```
```python
n = 7
parent = list(range(n))
rank = [0] * n

def find(x):                                     # path compression
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):                                 # union by rank; False if already joined
    ra, rb = find(a), find(b)
    if ra == rb:
        return False
    if rank[ra] < rank[rb]:
        ra, rb = rb, ra
    parent[rb] = ra                              # attach the shorter tree under the taller
    if rank[ra] == rank[rb]:
        rank[ra] += 1
    return True

components = n
for u, v in [(0, 1), (1, 2), (3, 4), (5, 6), (2, 0), (4, 5)]:
    if union(u, v):
        components -= 1
        print(f"union {u}-{v}: components = {components}")
    else:
        print(f"edge {u}-{v} closes a cycle")
print("0 and 2 connected?", str(find(0) == find(2)).lower())
print("0 and 6 connected?", str(find(0) == find(6)).lower())
```
```output
union 0-1: components = 6
union 1-2: components = 5
union 3-4: components = 4
union 5-6: components = 3
edge 2-0 closes a cycle
union 4-5: components = 2
0 and 2 connected? true
0 and 6 connected? false
```
```c
#include <stdio.h>

int parent[7], rnk[7];

int find(int x) {                               /* path compression */
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
}

int unite(int a, int b) {                       /* union by rank; 0 if already joined */
    int ra = find(a), rb = find(b);
    if (ra == rb) return 0;
    if (rnk[ra] < rnk[rb]) { int t = ra; ra = rb; rb = t; }
    parent[rb] = ra;                            /* attach the shorter tree under the taller */
    if (rnk[ra] == rnk[rb]) rnk[ra]++;
    return 1;
}

int main(void) {
    int n = 7;
    for (int i = 0; i < n; i++) parent[i] = i;
    int edges[][2] = {{0, 1}, {1, 2}, {3, 4}, {5, 6}, {2, 0}, {4, 5}};
    int components = n;
    for (int e = 0; e < 6; e++) {
        int u = edges[e][0], v = edges[e][1];
        if (unite(u, v)) {
            components--;
            printf("union %d-%d: components = %d\n", u, v, components);
        } else {
            printf("edge %d-%d closes a cycle\n", u, v);
        }
    }
    printf("0 and 2 connected? %s\n", find(0) == find(2) ? "true" : "false");
    printf("0 and 6 connected? %s\n", find(0) == find(6) ? "true" : "false");
    return 0;
}
```
```output
union 0-1: components = 6
union 1-2: components = 5
union 3-4: components = 4
union 5-6: components = 3
edge 2-0 closes a cycle
union 4-5: components = 2
0 and 2 connected? true
0 and 6 connected? false
```

## GATE-style practice questions

```quiz
q: 10 items start in separate sets. The unions (1,2), (3,4), (2,4), (5,6), (1,3) and (7,8) are performed. How many sets remain?
answer: 5
verify:
  p = list(range(11))
  def f(x):
      while p[x] != x:
          x = p[x]
      return x
  for a, b in [(1, 2), (3, 4), (2, 4), (5, 6), (1, 3), (7, 8)]:
      p[f(a)] = f(b)
  print(len({f(x) for x in range(1, 11)}))
explain: (1,3) joins items already together, so only 5 unions succeed: 10 − 5 = 5 sets ({1,2,3,4}, {5,6}, {7,8}, {9}, {10}).
```

```quiz
q: With union by rank alone (no path compression), what is the worst-case height of a tree holding n items?
- O(1)
* O(log n)
- O(√n)
- O(n)
explain: A tree's rank grows only when two trees of equal rank merge, which needs at least twice as many nodes each time, so height ≤ log₂ n.
```

```quiz
q: Kruskal's algorithm on a graph with 8 vertices accepts edges until the MST is complete. How many successful union operations does it perform?
answer: 7
verify: 8 - 1
explain: A spanning tree has V − 1 = 7 edges, and each accepted edge is one successful union.
```

```quiz
q: Which statements about union-find with both optimisations are true? (Select all that apply.)
* m operations take O(m α(n)) time
* It can detect a cycle in an undirected graph
- It can find shortest paths
- It supports splitting a set into two efficiently
explain: Union-find only merges sets; it cannot undo a union or split a set, and it gives no distances.
```
