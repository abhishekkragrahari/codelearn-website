---
title: Shortest Paths (Dijkstra and Bellman-Ford)
chapter: Graphs
description: Find the cheapest route in a weighted graph, and know when negative edges break things.
---
In a **weighted** graph, the shortest path is the one with the smallest **total weight**, not the fewest edges. BFS no longer works; we need algorithms that take weights into account.

```graph
caption: A weighted directed graph (edge labels are distances)
nodes: S A C D B
S -> A : 4
S -> B : 1
B -> A : 2
A -> C : 1
B -> C : 5
C -> D : 3
```

## Dijkstra's algorithm

Dijkstra's algorithm works when **all edge weights are non-negative**. It keeps a tentative distance for every vertex (∞ at first, 0 for the source) and repeatedly:

1. picks the unvisited vertex u with the **smallest** tentative distance (a min-heap makes this fast),
2. marks it final, and
3. **relaxes** each edge (u, v): if dist[u] + w(u, v) < dist[v], update dist[v].

With a binary heap it runs in **O((V + E) log V)**.

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Map<String, Integer>> g = new TreeMap<>();
        String[][] edges = {{"S", "A", "4"}, {"S", "B", "1"}, {"B", "A", "2"}, {"A", "C", "1"}, {"B", "C", "5"}, {"C", "D", "3"}};
        for (String[] e : edges) {
            g.computeIfAbsent(e[0], k -> new TreeMap<>()).put(e[1], Integer.parseInt(e[2]));
            g.computeIfAbsent(e[1], k -> new TreeMap<>());
        }

        Map<String, Integer> dist = new TreeMap<>();
        Map<String, String> prev = new HashMap<>();
        for (String v : g.keySet()) dist.put(v, Integer.MAX_VALUE);
        dist.put("S", 0);
        PriorityQueue<Object[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> (int) a[0]));
        pq.add(new Object[]{0, "S"});

        while (!pq.isEmpty()) {
            Object[] top = pq.poll();
            int d = (int) top[0];
            String u = (String) top[1];
            if (d > dist.get(u)) continue;                 // stale entry
            for (Map.Entry<String, Integer> e : g.get(u).entrySet()) {
                String v = e.getKey();
                int nd = d + e.getValue();
                if (nd < dist.get(v)) {                    // relax
                    dist.put(v, nd);
                    prev.put(v, u);
                    pq.add(new Object[]{nd, v});
                }
            }
        }

        System.out.println("distances from S: " + dist);
        LinkedList<String> path = new LinkedList<>();
        for (String v = "D"; v != null; v = prev.get(v)) path.addFirst(v);
        System.out.println("shortest path to D: " + String.join(" -> ", path));
    }
}
```
```output
distances from S: {A=3, B=1, C=4, D=7, S=0}
shortest path to D: S -> B -> A -> C -> D
```
```python
import heapq

g = {}
for u, v, w in [("S", "A", 4), ("S", "B", 1), ("B", "A", 2), ("A", "C", 1), ("B", "C", 5), ("C", "D", 3)]:
    g.setdefault(u, {})[v] = w
    g.setdefault(v, {})

dist = {v: float("inf") for v in g}
prev = {}
dist["S"] = 0
pq = [(0, "S")]
while pq:
    d, u = heapq.heappop(pq)
    if d > dist[u]:
        continue                                 # stale entry
    for v, w in g[u].items():
        if d + w < dist[v]:                      # relax
            dist[v] = d + w
            prev[v] = u
            heapq.heappush(pq, (dist[v], v))

print("distances from S:", dict(sorted(dist.items())))
path, v = [], "D"
while v:
    path.append(v)
    v = prev.get(v)
print("shortest path to D:", " -> ".join(reversed(path)))
```
```output
distances from S: {'A': 3, 'B': 1, 'C': 4, 'D': 7, 'S': 0}
shortest path to D: S -> B -> A -> C -> D
```
```c
#include <stdio.h>
#include <limits.h>

/* Dijkstra with a simple O(V^2) scan instead of a heap: fine for small graphs. */
#define V 5
const char names[V] = {'A', 'B', 'C', 'D', 'S'};      /* alphabetical, S = index 4 */
int w[V][V];                                           /* 0 = no edge */

int idx(char c) { for (int i = 0; i < V; i++) if (names[i] == c) return i; return -1; }

int main(void) {
    const char *edges[] = {"SA4", "SB1", "BA2", "AC1", "BC5", "CD3"};
    for (int i = 0; i < 6; i++) w[idx(edges[i][0])][idx(edges[i][1])] = edges[i][2] - '0';

    int dist[V], prev[V], done[V] = {0};
    for (int i = 0; i < V; i++) { dist[i] = INT_MAX; prev[i] = -1; }
    dist[idx('S')] = 0;

    for (int round = 0; round < V; round++) {
        int u = -1;
        for (int i = 0; i < V; i++)                    /* closest unfinished vertex */
            if (!done[i] && dist[i] != INT_MAX && (u == -1 || dist[i] < dist[u])) u = i;
        if (u == -1) break;
        done[u] = 1;
        for (int v = 0; v < V; v++)
            if (w[u][v] && dist[u] + w[u][v] < dist[v]) {      /* relax */
                dist[v] = dist[u] + w[u][v];
                prev[v] = u;
            }
    }

    printf("distances from S: {");
    for (int i = 0; i < V; i++) printf(i ? ", %c=%d" : "%c=%d", names[i], dist[i]);
    printf("}\n");

    int path[V], len = 0;
    for (int v = idx('D'); v != -1; v = prev[v]) path[len++] = v;
    printf("shortest path to D: ");
    for (int i = len - 1; i >= 0; i--) printf(i == len - 1 ? "%c" : " -> %c", names[path[i]]);
    printf("\n");
    return 0;
}
```
```output
distances from S: {A=3, B=1, C=4, D=7, S=0}
shortest path to D: S -> B -> A -> C -> D
```

The direct edge S → A costs 4, but going S → B → A costs only 1 + 2 = 3. Dijkstra discovers this because it finalises B (distance 1) before A.

## Negative edges and Bellman-Ford

Dijkstra assumes that once a vertex is finalised, no cheaper path can appear later. A **negative** edge breaks that assumption. **Bellman-Ford** handles negative weights by simply relaxing **every** edge V − 1 times, in **O(V·E)** time. One more round that still improves a distance proves there is a **negative cycle**, in which case shortest paths are not defined.

```java
public class Main {
    public static void main(String[] args) {
        String[] names = {"S", "A", "B", "C"};
        int[][] edges = {{0, 1, 4}, {0, 2, 5}, {1, 3, 3}, {2, 1, -3}, {3, 2, 2}};
        long INF = Long.MAX_VALUE / 2;
        long[] dist = {0, INF, INF, INF};

        for (int round = 1; round < names.length; round++)
            for (int[] e : edges)
                if (dist[e[0]] + e[2] < dist[e[1]]) dist[e[1]] = dist[e[0]] + e[2];

        boolean negativeCycle = false;
        for (int[] e : edges) if (dist[e[0]] + e[2] < dist[e[1]]) negativeCycle = true;

        for (int i = 0; i < names.length; i++) System.out.println(names[i] + ": " + dist[i]);
        System.out.println("negative cycle? " + negativeCycle);
    }
}
```
```output
S: 0
A: 2
B: 5
C: 5
negative cycle? false
```
```python
names = ["S", "A", "B", "C"]
edges = [(0, 1, 4), (0, 2, 5), (1, 3, 3), (2, 1, -3), (3, 2, 2)]
INF = float("inf")
dist = [0, INF, INF, INF]

for _ in range(len(names) - 1):
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w

negative_cycle = any(dist[u] + w < dist[v] for u, v, w in edges)
for name, d in zip(names, dist):
    print(f"{name}: {d}")
print("negative cycle?", negative_cycle)
```
```output
S: 0
A: 2
B: 5
C: 5
negative cycle? False
```
```c
#include <stdio.h>

int main(void) {
    const char *names[] = {"S", "A", "B", "C"};
    int edges[][3] = {{0, 1, 4}, {0, 2, 5}, {1, 3, 3}, {2, 1, -3}, {3, 2, 2}};
    const long INF = 1000000000L;
    long dist[4] = {0, INF, INF, INF};

    for (int round = 1; round < 4; round++)
        for (int e = 0; e < 5; e++) {
            int u = edges[e][0], v = edges[e][1], w = edges[e][2];
            if (dist[u] != INF && dist[u] + w < dist[v]) dist[v] = dist[u] + w;
        }

    int negative_cycle = 0;
    for (int e = 0; e < 5; e++)
        if (dist[edges[e][0]] != INF && dist[edges[e][0]] + edges[e][2] < dist[edges[e][1]]) negative_cycle = 1;

    for (int i = 0; i < 4; i++) printf("%s: %ld\n", names[i], dist[i]);
    printf("negative cycle? %s\n", negative_cycle ? "true" : "false");
    return 0;
}
```
```output
S: 0
A: 2
B: 5
C: 5
negative cycle? false
```

Here S → B → A (5 − 3 = 2) beats the direct S → A (4). The cycle A → C → B → A has total weight 3 + 2 − 3 = 2 > 0, so it is not a negative cycle.

## All pairs: Floyd-Warshall

To get the shortest distance between **every** pair of vertices, **Floyd-Warshall** uses dynamic programming. Let dist[i][j] start as the edge weight (∞ if there is no edge, 0 on the diagonal). Then, for each vertex k in turn, allow paths to go through k:

**dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])**

Three nested loops give **Θ(V³)** time and Θ(V²) space. It works with negative edges (a negative value on the diagonal reveals a negative cycle).

```java
public class Main {
    public static void main(String[] args) {
        final int INF = 1_000_000;
        int[][] dist = {
            {0, 3, INF, 7},
            {8, 0, 2, INF},
            {5, INF, 0, 1},
            {2, INF, INF, 0},
        };
        int n = dist.length;
        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];

        for (int[] row : dist) {
            StringBuilder sb = new StringBuilder();
            for (int x : row) sb.append(String.format("%4d", x));
            System.out.println(sb);
        }
    }
}
```
```output
   0   3   5   6
   5   0   2   3
   3   6   0   1
   2   5   7   0
```
```python
INF = float("inf")
dist = [
    [0, 3, INF, 7],
    [8, 0, 2, INF],
    [5, INF, 0, 1],
    [2, INF, INF, 0],
]
n = len(dist)
for k in range(n):
    for i in range(n):
        for j in range(n):
            dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

for row in dist:
    print("".join(f"{x:4}" for x in row))
```
```output
   0   3   5   6
   5   0   2   3
   3   6   0   1
   2   5   7   0
```
```c
#include <stdio.h>

#define INF 1000000

int main(void) {
    int dist[4][4] = {
        {0, 3, INF, 7},
        {8, 0, 2, INF},
        {5, INF, 0, 1},
        {2, INF, INF, 0},
    };
    int n = 4;
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) printf("%4d", dist[i][j]);
        printf("\n");
    }
    return 0;
}
```
```output
   0   3   5   6
   5   0   2   3
   3   6   0   1
   2   5   7   0
```

| Algorithm | Handles negative edges | Time | Use for |
| --- | --- | --- | --- |
| BFS | weights must all be equal | O(V + E) | unweighted graphs |
| Dijkstra (binary heap) | no | O((V + E) log V) | non-negative weights |
| Bellman-Ford | yes, and detects negative cycles | O(V·E) | negative weights |
| Floyd-Warshall | yes | O(V³) | all pairs of vertices |

## GATE-style practice questions

```quiz
q: Dijkstra's algorithm is run from S on the graph at the top of this lesson. What is the shortest distance from S to C?
answer: 4
verify:
  import heapq
  g = {'S': {'A': 4, 'B': 1}, 'A': {'C': 1}, 'B': {'A': 2, 'C': 5}, 'C': {'D': 3}, 'D': {}}
  dist = {v: float('inf') for v in g}
  dist['S'] = 0
  pq = [(0, 'S')]
  while pq:
      d, u = heapq.heappop(pq)
      if d > dist[u]:
          continue
      for v, w in g[u].items():
          if d + w < dist[v]:
              dist[v] = d + w
              heapq.heappush(pq, (d + w, v))
  print(dist['C'])
explain: The cheapest route is S → B → A → C with cost 1 + 2 + 1 = 4. The direct-looking alternatives S → A → C (5) and S → B → C (6) are longer.
```

```quiz
q: Which algorithm should be used to find single-source shortest paths in a directed graph that has some **negative** edge weights but no negative cycles?
- Dijkstra's algorithm
* Bellman-Ford algorithm
- Breadth-first search
- Prim's algorithm
explain: Dijkstra can give wrong answers with negative edges because it finalises vertices too early. Bellman-Ford relaxes all edges V − 1 times and is correct whenever there is no negative cycle. Prim's algorithm finds a minimum spanning tree, not shortest paths.
```

```quiz
q: What is the time complexity of Dijkstra's algorithm with a **binary heap** on a connected graph with V vertices and E edges?
- O(V²)
* O(E log V)
- O(V + E)
- O(V·E)
explain: Each edge relaxation may push into the heap (O(log V)) and each vertex is extracted once, giving O((V + E) log V), which is O(E log V) for a connected graph. With a simple array instead of a heap it is O(V²).
```

```quiz
q: Floyd-Warshall is run on the 4-vertex graph in this lesson (vertices 0 to 3). What is the final shortest distance from vertex 1 to vertex 0?
answer: 5
verify:
  INF = float('inf')
  d = [[0, 3, INF, 7], [8, 0, 2, INF], [5, INF, 0, 1], [2, INF, INF, 0]]
  for k in range(4):
      for i in range(4):
          for j in range(4):
              d[i][j] = min(d[i][j], d[i][k] + d[k][j])
  print(d[1][0])
explain: The direct edge 1 → 0 costs 8, but 1 → 2 → 3 → 0 costs 2 + 1 + 2 = 5, which is the shortest.
```
