---
title: Graph Connectivity and Network Flow
chapter: Graphs
description: Checking bipartiteness by BFS colouring, finding articulation points and bridges with DFS low-link values, Euler paths, and maximum flow with Ford-Fulkerson and Edmonds-Karp and the max-flow min-cut theorem.
---
This lesson covers graph questions about **structure**: can the vertices be split into two sides, which single vertex or edge would disconnect the network, and how much can flow from a source to a sink.

## Bipartite graphs

A graph is **bipartite** if its vertices can be coloured with two colours so that every edge joins different colours (for example students and courses).

- **Test:** BFS (or DFS) from each uncoloured vertex, giving neighbours the opposite colour. A conflict means it is not bipartite.
- **Theorem:** a graph is bipartite **if and only if it has no odd-length cycle**. Trees and even cycles are bipartite; a triangle is not.
- Time O(V + E).

## Articulation points and bridges

An **articulation point** (cut vertex) is a vertex whose removal increases the number of connected components; a **bridge** is such an edge. They show the weak spots of a network.

```graph
caption: Vertices 1, 3 and 4 are articulation points; 1-3 and 4-6 are bridges
nodes: 0 1 3 4 6 5 2
0 - 1
1 - 2
2 - 0
1 - 3
3 - 4
4 - 5
5 - 3
4 - 6
```

**Tarjan's method** (one DFS, O(V + E)): record each vertex's discovery time disc[u] and **low[u]**, the earliest discovery time reachable from u's subtree using at most one back edge.

- A non-root u is a cut vertex if some child v has **low[v] ≥ disc[u]**.
- The DFS root is a cut vertex if it has **two or more DFS children**.
- Edge u–v (tree edge) is a bridge if **low[v] > disc[u]**.

## Euler paths and circuits

- **Euler circuit** (uses every edge once, returns to start): connected and **every vertex has even degree**.
- **Euler path:** exactly **0 or 2 vertices of odd degree**.
- A Hamiltonian cycle (every vertex once) has no such simple test: deciding it is NP-complete.

## Maximum flow

A **flow network** has a source s, a sink t and edge capacities. A flow obeys the capacities and conserves flow at every other vertex. The goal is to send as much as possible from s to t.

**Ford–Fulkerson:** while the **residual graph** has an s–t path with spare capacity (an **augmenting path**), push the bottleneck amount along it; pushing flow on u→v adds residual capacity on v→u, which lets later paths undo earlier choices.

- **Edmonds–Karp** picks the shortest augmenting path by BFS: **O(V E²)**.
- **Max-flow min-cut theorem:** the maximum flow equals the capacity of the **minimum s–t cut** (the cheapest set of edges whose removal separates s from t).
- Applications: bipartite matching, project selection, image segmentation.

## The code

```java
import java.util.*;

public class Main {
    static List<List<Integer>> adj = new ArrayList<>();
    static int[] disc, low;
    static int timer = 0;
    static TreeSet<Integer> cutVertices = new TreeSet<>();
    static List<String> bridges = new ArrayList<>();

    static void dfs(int u, int parent) {
        disc[u] = low[u] = ++timer;
        int children = 0;
        for (int v : adj.get(u)) {
            if (disc[v] == 0) {
                children++;
                dfs(v, u);
                low[u] = Math.min(low[u], low[v]);
                if (parent != -1 && low[v] >= disc[u]) cutVertices.add(u);
                if (low[v] > disc[u]) bridges.add(u + "-" + v);
            } else if (v != parent) {
                low[u] = Math.min(low[u], disc[v]);      // back edge
            }
        }
        if (parent == -1 && children > 1) cutVertices.add(u);   // root rule
    }

    static boolean bipartite(int n) {                     // BFS 2-colouring
        int[] colour = new int[n];
        Arrays.fill(colour, -1);
        for (int s = 0; s < n; s++) {
            if (colour[s] != -1) continue;
            colour[s] = 0;
            Deque<Integer> q = new ArrayDeque<>(List.of(s));
            while (!q.isEmpty()) {
                int u = q.poll();
                for (int v : adj.get(u)) {
                    if (colour[v] == -1) { colour[v] = 1 - colour[u]; q.add(v); }
                    else if (colour[v] == colour[u]) return false;   // same colour: odd cycle
                }
            }
        }
        return true;
    }

    static int maxFlow(int[][] cap, int s, int t) {      // Edmonds-Karp: BFS augmenting paths
        int n = cap.length, flow = 0;
        while (true) {
            int[] prev = new int[n];
            Arrays.fill(prev, -1);
            prev[s] = s;
            Deque<Integer> q = new ArrayDeque<>(List.of(s));
            while (!q.isEmpty() && prev[t] == -1) {
                int u = q.poll();
                for (int v = 0; v < n; v++)
                    if (prev[v] == -1 && cap[u][v] > 0) { prev[v] = u; q.add(v); }
            }
            if (prev[t] == -1) return flow;               // no augmenting path left
            int push = Integer.MAX_VALUE;
            for (int v = t; v != s; v = prev[v]) push = Math.min(push, cap[prev[v]][v]);
            for (int v = t; v != s; v = prev[v]) { cap[prev[v]][v] -= push; cap[v][prev[v]] += push; }
            flow += push;
        }
    }

    public static void main(String[] args) {
        int n = 7;
        int[][] edges = {{0, 1}, {1, 2}, {2, 0}, {1, 3}, {3, 4}, {4, 5}, {5, 3}, {4, 6}};
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        disc = new int[n];
        low = new int[n];
        dfs(0, -1);
        System.out.println("articulation points: " + cutVertices);
        System.out.println("bridges: " + bridges);
        System.out.println("bipartite? " + bipartite(n));

        int[][] cap = {                                    // s = 0, t = 5
            {0, 10, 8, 0, 0, 0},
            {0, 0, 2, 5, 0, 0},
            {0, 0, 0, 0, 10, 0},
            {0, 0, 0, 0, 0, 7},
            {0, 0, 0, 8, 0, 10},
            {0, 0, 0, 0, 0, 0}};
        System.out.println("maximum flow = " + maxFlow(cap, 0, 5));
    }
}
```
```output
articulation points: [1, 3, 4]
bridges: [4-6, 1-3]
bipartite? false
maximum flow = 15
```
```python
from collections import deque

n = 7
edges = [(0, 1), (1, 2), (2, 0), (1, 3), (3, 4), (4, 5), (5, 3), (4, 6)]
adj = [[] for _ in range(n)]
for u, v in edges:
    adj[u].append(v)
    adj[v].append(u)

disc, low = [0] * n, [0] * n
timer = 0
cut_vertices, bridges = set(), []

def dfs(u, parent):
    global timer
    timer += 1
    disc[u] = low[u] = timer
    children = 0
    for v in adj[u]:
        if disc[v] == 0:
            children += 1
            dfs(v, u)
            low[u] = min(low[u], low[v])
            if parent != -1 and low[v] >= disc[u]:
                cut_vertices.add(u)
            if low[v] > disc[u]:
                bridges.append(f"{u}-{v}")
        elif v != parent:
            low[u] = min(low[u], disc[v])            # back edge
    if parent == -1 and children > 1:                # root rule
        cut_vertices.add(u)

def bipartite():                                     # BFS 2-colouring
    colour = [-1] * n
    for s in range(n):
        if colour[s] != -1:
            continue
        colour[s] = 0
        q = deque([s])
        while q:
            u = q.popleft()
            for v in adj[u]:
                if colour[v] == -1:
                    colour[v] = 1 - colour[u]
                    q.append(v)
                elif colour[v] == colour[u]:         # same colour: odd cycle
                    return False
    return True

def max_flow(cap, s, t):                             # Edmonds-Karp: BFS augmenting paths
    flow = 0
    while True:
        prev = [-1] * len(cap)
        prev[s] = s
        q = deque([s])
        while q and prev[t] == -1:
            u = q.popleft()
            for v in range(len(cap)):
                if prev[v] == -1 and cap[u][v] > 0:
                    prev[v] = u
                    q.append(v)
        if prev[t] == -1:                            # no augmenting path left
            return flow
        push, v = float("inf"), t
        while v != s:
            push = min(push, cap[prev[v]][v])
            v = prev[v]
        v = t
        while v != s:
            cap[prev[v]][v] -= push
            cap[v][prev[v]] += push
            v = prev[v]
        flow += push

dfs(0, -1)
print("articulation points:", sorted(cut_vertices))
print("bridges: [" + ", ".join(bridges) + "]")
print("bipartite?", str(bipartite()).lower())
cap = [[0, 10, 8, 0, 0, 0],                          # s = 0, t = 5
       [0, 0, 2, 5, 0, 0],
       [0, 0, 0, 0, 10, 0],
       [0, 0, 0, 0, 0, 7],
       [0, 0, 0, 8, 0, 10],
       [0, 0, 0, 0, 0, 0]]
print("maximum flow =", max_flow(cap, 0, 5))
```
```output
articulation points: [1, 3, 4]
bridges: [4-6, 1-3]
bipartite? false
maximum flow = 15
```
```c
#include <stdio.h>
#include <string.h>

#define N 7
int adj[N][N], deg[N], disc[N], low[N], timer = 0, is_cut[N];
int bridge_u[N], bridge_v[N], nb = 0;

int min(int a, int b) { return a < b ? a : b; }

void dfs(int u, int parent) {
    disc[u] = low[u] = ++timer;
    int children = 0;
    for (int k = 0; k < deg[u]; k++) {
        int v = adj[u][k];
        if (disc[v] == 0) {
            children++;
            dfs(v, u);
            low[u] = min(low[u], low[v]);
            if (parent != -1 && low[v] >= disc[u]) is_cut[u] = 1;
            if (low[v] > disc[u]) { bridge_u[nb] = u; bridge_v[nb++] = v; }
        } else if (v != parent) {
            low[u] = min(low[u], disc[v]);              /* back edge */
        }
    }
    if (parent == -1 && children > 1) is_cut[u] = 1;   /* root rule */
}

int bipartite(void) {                                   /* BFS 2-colouring */
    int colour[N], q[N];
    memset(colour, -1, sizeof colour);
    for (int s = 0; s < N; s++) {
        if (colour[s] != -1) continue;
        int head = 0, tail = 0;
        colour[s] = 0;
        q[tail++] = s;
        while (head < tail) {
            int u = q[head++];
            for (int k = 0; k < deg[u]; k++) {
                int v = adj[u][k];
                if (colour[v] == -1) { colour[v] = 1 - colour[u]; q[tail++] = v; }
                else if (colour[v] == colour[u]) return 0;   /* same colour: odd cycle */
            }
        }
    }
    return 1;
}

int max_flow(int cap[6][6], int s, int t) {             /* Edmonds-Karp: BFS augmenting paths */
    int flow = 0;
    for (;;) {
        int prev[6], q[6], head = 0, tail = 0;
        memset(prev, -1, sizeof prev);
        prev[s] = s;
        q[tail++] = s;
        while (head < tail && prev[t] == -1) {
            int u = q[head++];
            for (int v = 0; v < 6; v++)
                if (prev[v] == -1 && cap[u][v] > 0) { prev[v] = u; q[tail++] = v; }
        }
        if (prev[t] == -1) return flow;                  /* no augmenting path left */
        int push = 1 << 30;
        for (int v = t; v != s; v = prev[v]) push = min(push, cap[prev[v]][v]);
        for (int v = t; v != s; v = prev[v]) { cap[prev[v]][v] -= push; cap[v][prev[v]] += push; }
        flow += push;
    }
}

int main(void) {
    int edges[][2] = {{0, 1}, {1, 2}, {2, 0}, {1, 3}, {3, 4}, {4, 5}, {5, 3}, {4, 6}};
    for (int e = 0; e < 8; e++) {
        int u = edges[e][0], v = edges[e][1];
        adj[u][deg[u]++] = v;
        adj[v][deg[v]++] = u;
    }
    dfs(0, -1);
    printf("articulation points: [");
    for (int u = 0, first = 1; u < N; u++)
        if (is_cut[u]) { printf(first ? "%d" : ", %d", u); first = 0; }
    printf("]\nbridges: [");
    for (int i = 0; i < nb; i++) printf(i ? ", %d-%d" : "%d-%d", bridge_u[i], bridge_v[i]);
    printf("]\nbipartite? %s\n", bipartite() ? "true" : "false");

    int cap[6][6] = {{0, 10, 8, 0, 0, 0},                 /* s = 0, t = 5 */
                     {0, 0, 2, 5, 0, 0},
                     {0, 0, 0, 0, 10, 0},
                     {0, 0, 0, 0, 0, 7},
                     {0, 0, 0, 8, 0, 10},
                     {0, 0, 0, 0, 0, 0}};
    printf("maximum flow = %d\n", max_flow(cap, 0, 5));
    return 0;
}
```
```output
articulation points: [1, 3, 4]
bridges: [4-6, 1-3]
bipartite? false
maximum flow = 15
```

## GATE-style practice questions

```quiz
q: Which of these graphs are bipartite? (Select all that apply.)
* A cycle with 6 vertices
* Any tree
- A cycle with 5 vertices
- The complete graph K₃
explain: A graph is bipartite exactly when it has no odd cycle; C₅ and K₃ (a triangle) have odd cycles.
```

```quiz
q: A connected graph has vertex degrees 2, 4, 3, 3, 2 and 2. Which is true?
- It has an Euler circuit
* It has an Euler path but no Euler circuit
- It has neither
- It must be bipartite
explain: Exactly two vertices have odd degree, so an Euler path exists between them, but not a circuit.
```

```quiz
q: In the flow network of the code above, what is the capacity of the cut separating {s, 1, 2} from {3, 4, t}?
answer: 15
verify: 5 + 10
explain: Edges crossing from the source side: 1→3 (5) and 2→4 (10), total 15 — equal to the maximum flow, so it is a minimum cut.
```

```quiz
q: How many bridges does a tree with 9 vertices have?
answer: 8
verify: 9 - 1
explain: Removing any edge of a tree disconnects it, so all V − 1 = 8 edges are bridges.
```
