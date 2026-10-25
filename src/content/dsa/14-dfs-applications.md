---
title: DFS Applications (Edge Types, Cycles, Components)
chapter: Graphs
description: Discovery and finish times, classifying edges, detecting cycles and finding strongly connected components.
---
Depth-first search does more than visit every vertex. If we record **when** each vertex is first discovered and when it is finished, the resulting timestamps reveal the structure of the graph.

## Discovery and finish times

Keep a global clock. When DFS first reaches a vertex u, set **d[u]** = ++time and colour u grey ("in progress"). When all its neighbours are done, set **f[u]** = ++time and colour it black ("finished").

```graph
caption: The directed graph used in this lesson
nodes: A B C D E F G
A -> B
A -> C
B -> C
B -> D
C -> A
D -> E
E -> F
F -> D
G -> F
```

## Classifying edges

When DFS at u looks along an edge (u, v):

| Edge type | Colour of v when (u, v) is examined | Meaning |
| --- | --- | --- |
| Tree edge | white (not yet discovered) | DFS goes to v through this edge |
| Back edge | grey (still in progress) | v is an ancestor of u: **there is a cycle** |
| Forward edge | black, and d[u] < d[v] | v is a descendant of u found another way |
| Cross edge | black, and d[u] > d[v] | v is in an already-finished branch |

In an **undirected** graph, DFS only produces tree edges and back edges. A directed graph has a cycle **if and only if** DFS finds a back edge.

```java
import java.util.*;

public class Main {
    static Map<Character, List<Character>> adj = new TreeMap<>();
    static Map<Character, Integer> d = new HashMap<>(), f = new HashMap<>();
    static Map<Character, Character> color = new HashMap<>();   // W, G or B
    static int time = 0;
    static List<String> edges = new ArrayList<>();

    static void dfs(char u) {
        d.put(u, ++time);
        color.put(u, 'G');
        for (char v : adj.get(u)) {
            char c = color.get(v);
            String type = c == 'W' ? "tree" : c == 'G' ? "back" : d.get(u) < d.get(v) ? "forward" : "cross";
            edges.add(u + "->" + v + " " + type);
            if (c == 'W') dfs(v);
        }
        color.put(u, 'B');
        f.put(u, ++time);
    }

    public static void main(String[] args) {
        String[] list = {"AB", "AC", "BC", "BD", "CA", "DE", "EF", "FD", "GF"};
        for (char v = 'A'; v <= 'G'; v++) { adj.put(v, new ArrayList<>()); color.put(v, 'W'); }
        for (String e : list) adj.get(e.charAt(0)).add(e.charAt(1));

        for (char v : adj.keySet()) if (color.get(v) == 'W') dfs(v);

        StringBuilder times = new StringBuilder();
        for (char v : adj.keySet()) times.append(v).append(' ').append(d.get(v)).append('/').append(f.get(v)).append("  ");
        System.out.println("d/f: " + times.toString().trim());
        System.out.println("edges: " + String.join(", ", edges));
        System.out.println("has a cycle: " + edges.stream().anyMatch(s -> s.endsWith("back")));
    }
}
```
```output
d/f: A 1/12  B 2/11  C 3/4  D 5/10  E 6/9  F 7/8  G 13/14
edges: A->B tree, B->C tree, C->A back, B->D tree, D->E tree, E->F tree, F->D back, A->C forward, G->F cross
has a cycle: true
```
```python
adj = {v: [] for v in "ABCDEFG"}
for e in ["AB", "AC", "BC", "BD", "CA", "DE", "EF", "FD", "GF"]:
    adj[e[0]].append(e[1])

d, f, color, edges = {}, {}, {v: "W" for v in adj}, []
time = 0

def dfs(u):
    global time
    time += 1
    d[u] = time
    color[u] = "G"
    for v in adj[u]:
        c = color[v]
        kind = "tree" if c == "W" else "back" if c == "G" else "forward" if d[u] < d[v] else "cross"
        edges.append(f"{u}->{v} {kind}")
        if c == "W":
            dfs(v)
    color[u] = "B"
    time += 1
    f[u] = time

for v in adj:
    if color[v] == "W":
        dfs(v)

print("d/f:", "  ".join(f"{v} {d[v]}/{f[v]}" for v in adj))
print("edges:", ", ".join(edges))
print("has a cycle:", any(e.endswith("back") for e in edges))
```
```output
d/f: A 1/12  B 2/11  C 3/4  D 5/10  E 6/9  F 7/8  G 13/14
edges: A->B tree, B->C tree, C->A back, B->D tree, D->E tree, E->F tree, F->D back, A->C forward, G->F cross
has a cycle: True
```
```c
#include <stdio.h>

#define V 7
int adj[V][V], deg[V];
int d[V], f[V], t = 0;
char color[V];              /* 'W' white, 'G' grey, 'B' black */
char edges_out[20][16];
int ne = 0;

void dfs(int u) {
    d[u] = ++t;
    color[u] = 'G';
    for (int i = 0; i < deg[u]; i++) {
        int v = adj[u][i];
        const char *type = color[v] == 'W' ? "tree" : color[v] == 'G' ? "back" : d[u] < d[v] ? "forward" : "cross";
        snprintf(edges_out[ne++], 16, "%c->%c %s", 'A' + u, 'A' + v, type);
        if (color[v] == 'W') dfs(v);
    }
    color[u] = 'B';
    f[u] = ++t;
}

int main(void) {
    const char *list[] = {"AB", "AC", "BC", "BD", "CA", "DE", "EF", "FD", "GF"};
    for (int i = 0; i < 9; i++) {
        int u = list[i][0] - 'A';
        adj[u][deg[u]++] = list[i][1] - 'A';
    }
    for (int v = 0; v < V; v++) color[v] = 'W';
    for (int v = 0; v < V; v++) if (color[v] == 'W') dfs(v);

    printf("d/f:");
    for (int v = 0; v < V; v++) printf(v ? "  %c %d/%d" : " %c %d/%d", 'A' + v, d[v], f[v]);
    printf("\nedges:");
    int cycle = 0;
    for (int i = 0; i < ne; i++) {
        printf(i ? ", %s" : " %s", edges_out[i]);
        if (edges_out[i][5] == 'b') cycle = 1;       /* "X->Y back" */
    }
    printf("\nhas a cycle: %s\n", cycle ? "true" : "false");
    return 0;
}
```
```output
d/f: A 1/12  B 2/11  C 3/4  D 5/10  E 6/9  F 7/8  G 13/14
edges: A->B tree, B->C tree, C->A back, B->D tree, D->E tree, E->F tree, F->D back, A->C forward, G->F cross
has a cycle: true
```

The edges are printed in the order DFS examines them. `A->C` comes near the end: DFS reaches C through B first, and only looks at A's second edge after B's whole subtree is finished, so by then C is black and the edge is a forward edge. The **parenthesis theorem** holds: for any two vertices, their [d, f] intervals are either nested or disjoint. For example B's interval [2, 11] contains C's [3, 4].

## Connected components

In an **undirected** graph, each call of DFS (or BFS) from an unvisited vertex discovers exactly one **connected component**. Counting the calls counts the components, in O(V + E) time.

## Strongly connected components

In a **directed** graph, a **strongly connected component (SCC)** is a maximal set of vertices in which every vertex can reach every other. In the graph above the SCCs are {A, B, C}, {D, E, F} and {G}.

**Kosaraju's algorithm** finds them in O(V + E):

1. Run DFS on the graph and note the order in which vertices **finish**.
2. Reverse every edge (the **transpose** graph).
3. Run DFS on the transpose, starting vertices in **decreasing finish time**. Each tree of this second DFS is one SCC.

```java
import java.util.*;

public class Main {
    static Map<Character, List<Character>> adj = new TreeMap<>(), rev = new TreeMap<>();
    static Set<Character> seen = new HashSet<>();
    static Deque<Character> finished = new ArrayDeque<>();

    static void dfs1(char u) {
        seen.add(u);
        for (char v : adj.get(u)) if (!seen.contains(v)) dfs1(v);
        finished.push(u);                       // stack: latest finish on top
    }

    static void dfs2(char u, List<Character> comp) {
        seen.add(u);
        comp.add(u);
        for (char v : rev.get(u)) if (!seen.contains(v)) dfs2(v, comp);
    }

    public static void main(String[] args) {
        for (char v = 'A'; v <= 'G'; v++) { adj.put(v, new ArrayList<>()); rev.put(v, new ArrayList<>()); }
        for (String e : new String[]{"AB", "AC", "BC", "BD", "CA", "DE", "EF", "FD", "GF"}) {
            adj.get(e.charAt(0)).add(e.charAt(1));
            rev.get(e.charAt(1)).add(e.charAt(0));
        }
        for (char v : adj.keySet()) if (!seen.contains(v)) dfs1(v);

        seen.clear();
        List<List<Character>> sccs = new ArrayList<>();
        while (!finished.isEmpty()) {
            char u = finished.pop();
            if (seen.contains(u)) continue;
            List<Character> comp = new ArrayList<>();
            dfs2(u, comp);
            Collections.sort(comp);
            sccs.add(comp);
        }
        System.out.println(sccs.size() + " SCCs: " + sccs);
    }
}
```
```output
3 SCCs: [[G], [A, B, C], [D, E, F]]
```
```python
adj = {v: [] for v in "ABCDEFG"}
rev = {v: [] for v in "ABCDEFG"}
for e in ["AB", "AC", "BC", "BD", "CA", "DE", "EF", "FD", "GF"]:
    adj[e[0]].append(e[1])
    rev[e[1]].append(e[0])

seen, finished = set(), []

def dfs1(u):
    seen.add(u)
    for v in adj[u]:
        if v not in seen:
            dfs1(v)
    finished.append(u)

def dfs2(u, comp):
    seen.add(u)
    comp.append(u)
    for v in rev[u]:
        if v not in seen:
            dfs2(v, comp)

for v in adj:
    if v not in seen:
        dfs1(v)

seen.clear()
sccs = []
for u in reversed(finished):          # decreasing finish time
    if u not in seen:
        comp = []
        dfs2(u, comp)
        sccs.append(sorted(comp))
print(len(sccs), "SCCs:", sccs)
```
```output
3 SCCs: [['G'], ['A', 'B', 'C'], ['D', 'E', 'F']]
```
```c
#include <stdio.h>

#define V 7
int adj[V][V], deg[V], rev[V][V], rdeg[V];
int seen[V], finished[V], nf = 0;
int comp[V], nc;

void dfs1(int u) {
    seen[u] = 1;
    for (int i = 0; i < deg[u]; i++) if (!seen[adj[u][i]]) dfs1(adj[u][i]);
    finished[nf++] = u;                    /* record the finish order */
}

void dfs2(int u) {
    seen[u] = 1;
    comp[nc++] = u;
    for (int i = 0; i < rdeg[u]; i++) if (!seen[rev[u][i]]) dfs2(rev[u][i]);
}

int main(void) {
    const char *list[] = {"AB", "AC", "BC", "BD", "CA", "DE", "EF", "FD", "GF"};
    for (int i = 0; i < 9; i++) {
        int u = list[i][0] - 'A', v = list[i][1] - 'A';
        adj[u][deg[u]++] = v;
        rev[v][rdeg[v]++] = u;
    }
    for (int v = 0; v < V; v++) if (!seen[v]) dfs1(v);

    for (int v = 0; v < V; v++) seen[v] = 0;
    char out[200] = "";
    int count = 0, len = 0;
    for (int k = nf - 1; k >= 0; k--) {             /* decreasing finish time */
        int u = finished[k];
        if (seen[u]) continue;
        nc = 0;
        dfs2(u);
        for (int i = 1; i < nc; i++)                   /* sort the component */
            for (int j = i; j > 0 && comp[j - 1] > comp[j]; j--) { int x = comp[j]; comp[j] = comp[j - 1]; comp[j - 1] = x; }
        len += snprintf(out + len, sizeof(out) - len, count ? ", [" : "[");
        for (int i = 0; i < nc; i++) len += snprintf(out + len, sizeof(out) - len, i ? ", %c" : "%c", 'A' + comp[i]);
        len += snprintf(out + len, sizeof(out) - len, "]");
        count++;
    }
    printf("%d SCCs: [%s]\n", count, out);
    return 0;
}
```
```output
3 SCCs: [[G], [A, B, C], [D, E, F]]
```

Shrinking every SCC to a single vertex always leaves a **directed acyclic graph** (the condensation), which can then be topologically sorted.

## GATE-style practice questions

```quiz
q: During DFS of a **directed** graph, an edge (u, v) is examined when v is grey (discovered but not finished). What kind of edge is it, and what does it tell you?
- A tree edge; v is a child of u
* A back edge; the graph has a cycle
- A cross edge; v is in another DFS tree
- A forward edge; v is a descendant of u
explain: A grey vertex is still on the recursion stack, so it is an ancestor of u. The edge u → v closes a path v → ... → u → v, which is a cycle.
```

```quiz
q: In a DFS of an **undirected** graph, which kinds of edges can appear? (Select all that apply.)
* Tree edges
* Back edges
- Forward edges
- Cross edges
explain: In an undirected graph every edge is explored from both ends. If (u, v) were a forward or cross edge from u's side, DFS would already have explored it from v's side earlier as a tree or back edge. So only tree and back edges occur.
```

```quiz
q: How many strongly connected components does the directed graph with vertices 1 to 6 and edges 1→2, 2→3, 3→1, 3→4, 4→5, 5→4, 5→6 have?
answer: 3
verify:
  edges = [(1, 2), (2, 3), (3, 1), (3, 4), (4, 5), (5, 4), (5, 6)]
  V = range(1, 7)
  reach = {u: {u} for u in V}
  changed = True
  while changed:
      changed = False
      for u, v in edges:
          for w in list(reach):
              if u in reach[w] and v not in reach[w]:
                  reach[w].add(v)
                  changed = True
  print(len({frozenset(x for x in V if x in reach[u] and u in reach[x]) for u in V}))
explain: {1, 2, 3} form a cycle, {4, 5} form a cycle, and 6 cannot reach anything else, so it is alone. The SCCs are {1, 2, 3}, {4, 5} and {6}.
```

```quiz
q: An undirected graph has 15 vertices and 10 edges and contains no cycle. How many connected components does it have?
answer: 5
verify: 15 - 10
explain: A forest (an acyclic undirected graph) with V vertices and E edges has exactly V − E components, because each tree with k vertices has k − 1 edges. So 15 − 10 = 5.
```
