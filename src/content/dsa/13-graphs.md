---
title: Graphs, BFS and DFS
chapter: Graphs
description: Represent networks with adjacency lists and matrices, and explore them breadth-first and depth-first.
---
A **graph** G = (V, E) is a set of **vertices** (nodes) V connected by **edges** E. Roads between cities, friendships, web links and course prerequisites are all graphs.

- **Undirected:** an edge {u, v} can be travelled both ways. **Directed:** an edge (u, v) goes from u to v only.
- **Weighted:** each edge has a cost, such as a distance.
- The **degree** of a vertex is its number of edges (in a directed graph: **in-degree** and **out-degree**).
- A graph is **connected** if every vertex can reach every other vertex.

```graph
caption: The undirected graph used in this lesson
nodes: A B D E F C
A - B
A - C
B - D
C - D
D - E
E - F
```

## Representations

| | Adjacency matrix | Adjacency list |
| --- | --- | --- |
| Idea | V × V table, cell [u][v] = 1 if there is an edge | for each vertex, a list of its neighbours |
| Space | Θ(V²) | Θ(V + E) |
| Is (u, v) an edge? | O(1) | O(degree of u) |
| Visit all neighbours of u | Θ(V) | Θ(degree of u) |
| Best for | dense graphs | sparse graphs (most real graphs) |

In an undirected graph the sum of all degrees is **2E**, because each edge adds 1 to the degree of both its ends (the *handshaking lemma*).

## Breadth-first search (BFS)

BFS explores the graph in **layers**: first the start vertex, then all its neighbours, then their unvisited neighbours, and so on. It uses a **queue**. In an unweighted graph, BFS finds the **shortest path** (fewest edges) from the start to every vertex.

## Depth-first search (DFS)

DFS goes as **deep** as possible along one path before backtracking. It uses a **stack**, usually the call stack through recursion. DFS is the basis for detecting cycles, topological sorting and finding connected components.

Both run in **O(V + E)** time with an adjacency list.

```java
import java.util.*;

public class Main {
    static Map<String, List<String>> graph = new LinkedHashMap<>();

    static void addEdge(String u, String v) {
        graph.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
        graph.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
    }

    static Map<String, Integer> bfs(String start) {
        Map<String, Integer> dist = new LinkedHashMap<>();
        Queue<String> q = new ArrayDeque<>();
        dist.put(start, 0);
        q.add(start);
        while (!q.isEmpty()) {
            String u = q.poll();
            for (String v : graph.get(u)) {
                if (!dist.containsKey(v)) {          // first time we see v
                    dist.put(v, dist.get(u) + 1);
                    q.add(v);
                }
            }
        }
        return dist;
    }

    static void dfs(String u, Set<String> seen, List<String> order) {
        seen.add(u);
        order.add(u);
        for (String v : graph.get(u)) {
            if (!seen.contains(v)) dfs(v, seen, order);
        }
    }

    public static void main(String[] args) {
        String[][] edges = {{"A", "B"}, {"A", "C"}, {"B", "D"}, {"C", "D"}, {"D", "E"}, {"E", "F"}};
        for (String[] e : edges) addEdge(e[0], e[1]);

        System.out.println("adjacency list: " + graph);
        Map<String, Integer> dist = bfs("A");
        System.out.println("BFS order:      " + String.join(" ", dist.keySet()));
        System.out.println("BFS distances:  " + dist);
        List<String> order = new ArrayList<>();
        dfs("A", new HashSet<>(), order);
        System.out.println("DFS order:      " + String.join(" ", order));
    }
}
```
```output
adjacency list: {A=[B, C], B=[A, D], C=[A, D], D=[B, C, E], E=[D, F], F=[E]}
BFS order:      A B C D E F
BFS distances:  {A=0, B=1, C=1, D=2, E=3, F=4}
DFS order:      A B D C E F
```
```python
from collections import deque

graph = {}
def add_edge(u, v):
    graph.setdefault(u, []).append(v)
    graph.setdefault(v, []).append(u)

def bfs(start):
    dist = {start: 0}
    q = deque([start])
    while q:
        u = q.popleft()
        for v in graph[u]:
            if v not in dist:                # first time we see v
                dist[v] = dist[u] + 1
                q.append(v)
    return dist

def dfs(u, seen, order):
    seen.add(u)
    order.append(u)
    for v in graph[u]:
        if v not in seen:
            dfs(v, seen, order)
    return order

for u, v in [("A", "B"), ("A", "C"), ("B", "D"), ("C", "D"), ("D", "E"), ("E", "F")]:
    add_edge(u, v)

print("adjacency list:", graph)
dist = bfs("A")
print("BFS order:     ", *dist)
print("BFS distances: ", dist)
print("DFS order:     ", *dfs("A", set(), []))
```
```output
adjacency list: {'A': ['B', 'C'], 'B': ['A', 'D'], 'C': ['A', 'D'], 'D': ['B', 'C', 'E'], 'E': ['D', 'F'], 'F': ['E']}
BFS order:      A B C D E F
BFS distances:  {'A': 0, 'B': 1, 'C': 1, 'D': 2, 'E': 3, 'F': 4}
DFS order:      A B D C E F
```
```c
#include <stdio.h>

#define V 6
/* adjacency lists for vertices A..F, stored as indices 0..5 */
int adj[V][V], deg[V];

void add_edge(int u, int v) {
    adj[u][deg[u]++] = v;
    adj[v][deg[v]++] = u;
}

int dist[V];
void bfs(int start, int order[]) {
    int queue[V], head = 0, tail = 0, k = 0;
    for (int i = 0; i < V; i++) dist[i] = -1;
    dist[start] = 0;
    queue[tail++] = start;
    while (head < tail) {
        int u = queue[head++];
        order[k++] = u;
        for (int i = 0; i < deg[u]; i++) {
            int v = adj[u][i];
            if (dist[v] == -1) {             /* first time we see v */
                dist[v] = dist[u] + 1;
                queue[tail++] = v;
            }
        }
    }
}

int seen[V];
void dfs(int u) {
    seen[u] = 1;
    printf(" %c", 'A' + u);
    for (int i = 0; i < deg[u]; i++)
        if (!seen[adj[u][i]]) dfs(adj[u][i]);
}

int main(void) {
    const char *edges[] = {"AB", "AC", "BD", "CD", "DE", "EF"};
    for (int i = 0; i < 6; i++) add_edge(edges[i][0] - 'A', edges[i][1] - 'A');

    printf("adjacency list: {");
    for (int u = 0; u < V; u++) {
        printf(u ? ", %c=[" : "%c=[", 'A' + u);
        for (int i = 0; i < deg[u]; i++) printf(i ? ", %c" : "%c", 'A' + adj[u][i]);
        printf("]");
    }
    printf("}\n");

    int order[V];
    bfs(0, order);
    printf("BFS order:     ");
    for (int i = 0; i < V; i++) printf(" %c", 'A' + order[i]);
    printf("\nBFS distances:  {");
    for (int i = 0; i < V; i++) printf(i ? ", %c=%d" : "%c=%d", 'A' + order[i], dist[order[i]]);
    printf("}\nDFS order:     ");
    dfs(0);
    printf("\n");
    return 0;
}
```
```output
adjacency list: {A=[B, C], B=[A, D], C=[A, D], D=[B, C, E], E=[D, F], F=[E]}
BFS order:      A B C D E F
BFS distances:  {A=0, B=1, C=1, D=2, E=3, F=4}
DFS order:      A B D C E F
```

The order in which neighbours are stored decides which of several valid BFS or DFS orders you get.

## Topological sort

A **topological order** of a directed acyclic graph (DAG) lists the vertices so that every edge goes from earlier to later, like an order to take courses so that prerequisites come first. **Kahn's algorithm** repeatedly removes a vertex with in-degree 0.

```graph
caption: Course prerequisites as a directed acyclic graph
nodes: Maths Algo DS Prog DB
Maths -> DS
Prog -> DS
DS -> Algo
Prog -> DB
Maths -> Algo
```

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        String[][] edges = {{"Maths", "DS"}, {"Prog", "DS"}, {"DS", "Algo"}, {"Prog", "DB"}, {"Maths", "Algo"}};
        Map<String, List<String>> out = new TreeMap<>();
        Map<String, Integer> indeg = new TreeMap<>();
        for (String[] e : edges) {
            out.computeIfAbsent(e[0], k -> new ArrayList<>()).add(e[1]);
            out.computeIfAbsent(e[1], k -> new ArrayList<>());
            indeg.merge(e[1], 1, Integer::sum);
            indeg.putIfAbsent(e[0], 0);
        }
        PriorityQueue<String> ready = new PriorityQueue<>();     // alphabetical among the ready ones
        indeg.forEach((v, d) -> { if (d == 0) ready.add(v); });
        List<String> order = new ArrayList<>();
        while (!ready.isEmpty()) {
            String u = ready.poll();
            order.add(u);
            for (String v : out.get(u)) if (indeg.merge(v, -1, Integer::sum) == 0) ready.add(v);
        }
        System.out.println(String.join(" -> ", order));
    }
}
```
```output
Maths -> Prog -> DB -> DS -> Algo
```
```python
import heapq

edges = [("Maths", "DS"), ("Prog", "DS"), ("DS", "Algo"), ("Prog", "DB"), ("Maths", "Algo")]
out, indeg = {}, {}
for u, v in edges:
    out.setdefault(u, []).append(v)
    out.setdefault(v, [])
    indeg[v] = indeg.get(v, 0) + 1
    indeg.setdefault(u, 0)

ready = [v for v, d in indeg.items() if d == 0]
heapq.heapify(ready)                         # alphabetical among the ready ones
order = []
while ready:
    u = heapq.heappop(ready)
    order.append(u)
    for v in out[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            heapq.heappush(ready, v)
print(" -> ".join(order))
```
```output
Maths -> Prog -> DB -> DS -> Algo
```
```c
#include <stdio.h>
#include <string.h>

/* Kahn's algorithm. Vertices are kept in alphabetical order so that, among the
   vertices that are ready, the alphabetically smallest is taken first. */
#define V 5
const char *names[V] = {"Algo", "DB", "DS", "Maths", "Prog"};
int adj[V][V], deg[V], indeg[V];

int id(const char *s) {
    for (int i = 0; i < V; i++) if (strcmp(names[i], s) == 0) return i;
    return -1;
}

int main(void) {
    const char *edges[][2] = {{"Maths", "DS"}, {"Prog", "DS"}, {"DS", "Algo"}, {"Prog", "DB"}, {"Maths", "Algo"}};
    for (int i = 0; i < 5; i++) {
        int u = id(edges[i][0]), v = id(edges[i][1]);
        adj[u][deg[u]++] = v;
        indeg[v]++;
    }
    int done[V] = {0};
    for (int k = 0; k < V; k++) {
        int u = -1;
        for (int i = 0; i < V; i++)                  /* smallest ready vertex */
            if (!done[i] && indeg[i] == 0) { u = i; break; }
        if (u == -1) { printf("cycle!\n"); return 1; }
        done[u] = 1;
        printf(k ? " -> %s" : "%s", names[u]);
        for (int i = 0; i < deg[u]; i++) indeg[adj[u][i]]--;
    }
    printf("\n");
    return 0;
}
```
```output
Maths -> Prog -> DB -> DS -> Algo
```

If the loop ends before every vertex is output, the graph has a cycle and no topological order exists.

## GATE-style practice questions

```quiz
q: An undirected graph has 10 vertices and every vertex has degree 3. How many edges does it have?
answer: 15
verify: 10 * 3 // 2
explain: By the handshaking lemma, the sum of degrees is 2E, so 10 × 3 = 2E and E = 15.
```

```quiz
q: BFS is run from vertex A on the graph shown at the top of this lesson (neighbours visited in alphabetical order). What is the BFS distance from A to F?
answer: 4
verify:
  from collections import deque
  g = {'A': 'BC', 'B': 'AD', 'C': 'AD', 'D': 'BCE', 'E': 'DF', 'F': 'E'}
  dist, q = {'A': 0}, deque('A')
  while q:
      u = q.popleft()
      for v in g[u]:
          if v not in dist:
              dist[v] = dist[u] + 1
              q.append(v)
  print(dist['F'])
explain: The layers are {A}, {B, C}, {D}, {E}, {F}, so F is 4 edges away (for example A → B → D → E → F).
```

```quiz
q: Which statements are **true** for a graph with V vertices and E edges? (Select all that apply.)
* BFS and DFS take O(V + E) time with an adjacency list
* An adjacency matrix needs Θ(V²) space even when E is small
- DFS always finds the shortest path in an unweighted graph
* BFS uses a queue and DFS can be written with a stack
explain: BFS, not DFS, finds shortest paths in unweighted graphs, because it explores vertices in order of distance. The other statements are standard facts.
```

```quiz
q: How many different **topological orderings** does the DAG with edges a → b, a → c, b → d, c → d have?
answer: 2
verify:
  from itertools import permutations
  edges = [('a', 'b'), ('a', 'c'), ('b', 'd'), ('c', 'd')]
  print(sum(all(p.index(u) < p.index(v) for u, v in edges) for p in permutations('abcd')))
explain: a must come first and d last. b and c can appear in either order, so the orderings are a b c d and a c b d.
```
