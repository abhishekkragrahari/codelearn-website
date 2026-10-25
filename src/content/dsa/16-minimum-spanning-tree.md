---
title: Minimum Spanning Trees (Kruskal and Prim)
chapter: Graphs
description: Connect every vertex with the least total edge weight, using greedy algorithms.
---
A **spanning tree** of a connected, undirected graph is a subset of edges that connects all V vertices with no cycle; it always has exactly **V − 1** edges. A **minimum spanning tree (MST)** is a spanning tree whose total weight is as small as possible, for example the cheapest way to lay cables between cities.

```graph
caption: A weighted undirected graph
nodes: A B D E C
A - B : 4
A - C : 1
B - C : 2
B - D : 5
C - D : 8
C - E : 10
D - E : 3
```

Both classic MST algorithms are **greedy**: they repeatedly take the cheapest edge that is still safe to add.

## Kruskal's algorithm

1. Sort all edges by weight.
2. Go through them in order; add an edge if it joins two **different** components (that is, it does not create a cycle).
3. Stop after V − 1 edges.

A **disjoint-set (union-find)** structure answers "are these two vertices already connected?" almost in O(1). Kruskal runs in **O(E log E)**, dominated by sorting.

```java
import java.util.*;

public class Main {
    static int[] parent;

    static int find(int x) {                       // with path compression
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    public static void main(String[] args) {
        String names = "ABCDE";
        int[][] edges = {{0, 1, 4}, {0, 2, 1}, {1, 2, 2}, {1, 3, 5}, {2, 3, 8}, {2, 4, 10}, {3, 4, 3}};
        Arrays.sort(edges, Comparator.comparingInt(e -> e[2]));
        parent = new int[names.length()];
        for (int i = 0; i < parent.length; i++) parent[i] = i;

        int total = 0;
        for (int[] e : edges) {
            int ru = find(e[0]), rv = find(e[1]);
            if (ru != rv) {                            // different components: safe
                parent[ru] = rv;
                total += e[2];
                System.out.println("take " + names.charAt(e[0]) + "-" + names.charAt(e[1]) + " (" + e[2] + ")");
            } else {
                System.out.println("skip " + names.charAt(e[0]) + "-" + names.charAt(e[1]) + " (" + e[2] + "), would make a cycle");
            }
        }
        System.out.println("MST weight = " + total);
    }
}
```
```output
take A-C (1)
take B-C (2)
take D-E (3)
skip A-B (4), would make a cycle
take B-D (5)
skip C-D (8), would make a cycle
skip C-E (10), would make a cycle
MST weight = 11
```
```python
names = "ABCDE"
edges = [(0, 1, 4), (0, 2, 1), (1, 2, 2), (1, 3, 5), (2, 3, 8), (2, 4, 10), (3, 4, 3)]
parent = list(range(len(names)))

def find(x):                                     # with path compression
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

total = 0
for u, v, w in sorted(edges, key=lambda e: e[2]):
    ru, rv = find(u), find(v)
    if ru != rv:                                 # different components: safe
        parent[ru] = rv
        total += w
        print(f"take {names[u]}-{names[v]} ({w})")
    else:
        print(f"skip {names[u]}-{names[v]} ({w}), would make a cycle")
print("MST weight =", total)
```
```output
take A-C (1)
take B-C (2)
take D-E (3)
skip A-B (4), would make a cycle
take B-D (5)
skip C-D (8), would make a cycle
skip C-E (10), would make a cycle
MST weight = 11
```
```c
#include <stdio.h>
#include <stdlib.h>

int parent[5];

int find(int x) {                                   /* with path compression */
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
}

int by_weight(const void *a, const void *b) {
    return ((const int *)a)[2] - ((const int *)b)[2];
}

int main(void) {
    const char *names = "ABCDE";
    int edges[][3] = {{0, 1, 4}, {0, 2, 1}, {1, 2, 2}, {1, 3, 5}, {2, 3, 8}, {2, 4, 10}, {3, 4, 3}};
    int m = 7;
    qsort(edges, m, sizeof(edges[0]), by_weight);
    for (int i = 0; i < 5; i++) parent[i] = i;

    int total = 0;
    for (int e = 0; e < m; e++) {
        int u = edges[e][0], v = edges[e][1], w = edges[e][2];
        int ru = find(u), rv = find(v);
        if (ru != rv) {                                 /* different components: safe */
            parent[ru] = rv;
            total += w;
            printf("take %c-%c (%d)\n", names[u], names[v], w);
        } else {
            printf("skip %c-%c (%d), would make a cycle\n", names[u], names[v], w);
        }
    }
    printf("MST weight = %d\n", total);
    return 0;
}
```
```output
take A-C (1)
take B-C (2)
take D-E (3)
skip A-B (4), would make a cycle
take B-D (5)
skip C-D (8), would make a cycle
skip C-E (10), would make a cycle
MST weight = 11
```

## Prim's algorithm

Prim grows **one** tree from a start vertex. At each step it adds the cheapest edge that connects a tree vertex to a non-tree vertex. With a binary heap it runs in **O(E log V)**, and it suits dense graphs well.

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        String names = "ABCDE";
        int[][] edges = {{0, 1, 4}, {0, 2, 1}, {1, 2, 2}, {1, 3, 5}, {2, 3, 8}, {2, 4, 10}, {3, 4, 3}};
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < names.length(); i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(new int[]{e[1], e[2]});
            adj.get(e[1]).add(new int[]{e[0], e[2]});
        }

        boolean[] inTree = new boolean[names.length()];
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));   // {weight, to, from}
        pq.add(new int[]{0, 0, -1});
        int total = 0;
        StringBuilder order = new StringBuilder();
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int v = top[1];
            if (inTree[v]) continue;
            inTree[v] = true;
            total += top[0];
            if (top[2] >= 0) order.append(names.charAt(top[2])).append('-').append(names.charAt(v)).append(' ');
            for (int[] nb : adj.get(v)) if (!inTree[nb[0]]) pq.add(new int[]{nb[1], nb[0], v});
        }
        System.out.println("edges in the order Prim adds them: " + order.toString().trim());
        System.out.println("MST weight = " + total);
    }
}
```
```output
edges in the order Prim adds them: A-C C-B B-D D-E
MST weight = 11
```
```python
import heapq

names = "ABCDE"
edges = [(0, 1, 4), (0, 2, 1), (1, 2, 2), (1, 3, 5), (2, 3, 8), (2, 4, 10), (3, 4, 3)]
adj = {i: [] for i in range(len(names))}
for u, v, w in edges:
    adj[u].append((v, w))
    adj[v].append((u, w))

in_tree, total, order = set(), 0, []
pq = [(0, 0, -1)]                              # (weight, to, from)
while pq:
    w, v, frm = heapq.heappop(pq)
    if v in in_tree:
        continue
    in_tree.add(v)
    total += w
    if frm >= 0:
        order.append(f"{names[frm]}-{names[v]}")
    for nb, nw in adj[v]:
        if nb not in in_tree:
            heapq.heappush(pq, (nw, nb, v))
print("edges in the order Prim adds them:", *order)
print("MST weight =", total)
```
```output
edges in the order Prim adds them: A-C C-B B-D D-E
MST weight = 11
```
```c
#include <stdio.h>
#include <limits.h>

/* Prim's algorithm with an O(V^2) scan (no heap needed for a small graph). */
#define V 5

int main(void) {
    const char *names = "ABCDE";
    int edges[][3] = {{0, 1, 4}, {0, 2, 1}, {1, 2, 2}, {1, 3, 5}, {2, 3, 8}, {2, 4, 10}, {3, 4, 3}};
    int w[V][V] = {{0}};
    for (int e = 0; e < 7; e++) {
        w[edges[e][0]][edges[e][1]] = edges[e][2];
        w[edges[e][1]][edges[e][0]] = edges[e][2];
    }

    int in_tree[V] = {0}, best[V], from[V], total = 0;
    for (int i = 0; i < V; i++) { best[i] = INT_MAX; from[i] = -1; }
    best[0] = 0;
    printf("edges in the order Prim adds them:");
    for (int k = 0; k < V; k++) {
        int v = -1;
        for (int i = 0; i < V; i++)                 /* cheapest vertex to attach */
            if (!in_tree[i] && (v == -1 || best[i] < best[v])) v = i;
        in_tree[v] = 1;
        total += best[v];
        if (from[v] >= 0) printf(" %c-%c", names[from[v]], names[v]);
        for (int u = 0; u < V; u++)
            if (w[v][u] && !in_tree[u] && w[v][u] < best[u]) { best[u] = w[v][u]; from[u] = v; }
    }
    printf("\nMST weight = %d\n", total);
    return 0;
}
```
```output
edges in the order Prim adds them: A-C C-B B-D D-E
MST weight = 11
```

Both algorithms find the same MST weight (11), even though they add the edges in a different order.

## Useful facts

- If all edge weights are **distinct**, the MST is **unique**.
- **Cut property:** the lightest edge crossing any cut of the graph belongs to some MST. Both algorithms rely on it.
- **Cycle property:** the heaviest edge on any cycle is not in any MST (if it is the unique heaviest).

## GATE-style practice questions

```quiz
q: What is the weight of a minimum spanning tree of the graph with vertices 1 to 5 and edges (1,2) = 2, (1,3) = 3, (2,3) = 1, (2,4) = 4, (3,4) = 5, (3,5) = 6, (4,5) = 2?
answer: 9
verify:
  edges = [(1, 2, 2), (1, 3, 3), (2, 3, 1), (2, 4, 4), (3, 4, 5), (3, 5, 6), (4, 5, 2)]
  parent = {v: v for v in range(1, 6)}
  def find(x):
      while parent[x] != x:
          x = parent[x]
      return x
  total = 0
  for u, v, w in sorted(edges, key=lambda e: e[2]):
      if find(u) != find(v):
          parent[find(u)] = find(v)
          total += w
  print(total)
explain: Kruskal takes (2,3) = 1, then (1,2) = 2 and (4,5) = 2, skips (1,3) = 3 because 1, 2 and 3 are already connected, then takes (2,4) = 4. That is 4 edges for 5 vertices: 1 + 2 + 2 + 4 = 9.
```

```quiz
q: A connected undirected graph has 12 vertices and 30 edges. How many edges are in each of its spanning trees?
answer: 11
verify: 12 - 1
explain: Every spanning tree of a connected graph with V vertices has exactly V − 1 edges, whatever the number of edges in the graph.
```

```quiz
q: Which statements about minimum spanning trees are **true**? (Select all that apply.)
* If all edge weights are distinct, the MST is unique
* Kruskal's algorithm can be implemented in O(E log E) time
- Prim's algorithm can produce a spanning tree with a cycle when weights are negative
* Adding the same constant to every edge weight does not change which edges form an MST
explain: Spanning trees never contain cycles, and both algorithms work with negative weights. Adding a constant c to every edge adds (V − 1)·c to every spanning tree equally, so the relative order of trees, and therefore the MST, is unchanged. The other two statements are standard results.
```
