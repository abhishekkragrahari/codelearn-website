---
title: Graph Theory
chapter: Graph Theory
description: Graph terms and the handshaking lemma, connectivity, Euler and Hamiltonian paths, trees and Cayley's formula, bipartite graphs, planar graphs and Euler's formula, colouring, matchings, independent sets, cliques and vertex covers.
---
The DSA track covers graph **algorithms**; this lesson covers the **theory** that GATE's discrete mathematics questions ask about.

## Basic terms

A **simple graph** has no loops and no multiple edges. With n vertices it has at most C(n, 2) = n(n − 1)/2 edges (the **complete graph** Kₙ), and there are **2^(n(n−1)/2)** labelled simple graphs on n given vertices.

> **Handshaking lemma**: the sum of all vertex degrees equals **2|E|**, because each edge adds 1 to the degree of each of its two ends. So the number of odd-degree vertices is always **even**.

A graph whose 10 vertices all have degree 3 has 10 × 3 / 2 = 15 edges; a graph with 7 vertices of degree 3 cannot exist.

- A graph is **connected** if there is a path between every pair of vertices. A connected graph on n vertices has at least n − 1 edges.
- A **cut vertex** (articulation point) or **bridge** is a vertex or edge whose removal disconnects the graph.
- The **complement** Ḡ has an edge exactly where G does not; |E(G)| + |E(Ḡ)| = n(n − 1)/2.
- An **isomorphism** is a relabelling of vertices that maps edges to edges. Isomorphic graphs have the same degree sequence (but the same degree sequence does not prove isomorphism).

## Euler and Hamiltonian paths

| | Uses every | Condition (connected graph) |
| --- | --- | --- |
| **Euler circuit** | **edge** exactly once, ending where it started | Every vertex has **even** degree |
| **Euler path** | edge exactly once | Exactly **0 or 2** vertices of odd degree |
| **Hamiltonian cycle** | **vertex** exactly once | No simple test (NP-complete); **Dirac**: n ≥ 3 and every degree ≥ n/2 guarantees one |

## Trees

A **tree** is a connected graph with no cycles. For a graph with n vertices, any two of these imply the third: connected, acyclic, n − 1 edges. Other facts:

- There is exactly one path between any two vertices; adding any edge creates exactly one cycle.
- Every tree with n ≥ 2 vertices has at least 2 leaves.
- **Cayley's formula**: there are **nⁿ⁻²** labelled trees on n vertices (125 for n = 5), which is also the number of spanning trees of Kₙ.
- A forest with n vertices and k trees has n − k edges.

## Bipartite graphs

A graph is **bipartite** if its vertices split into two sets with every edge going between them. **A graph is bipartite if and only if it has no odd cycle**, equivalently, if it can be 2-coloured. K<sub>m,n</sub> has m·n edges.

## Planar graphs

A graph is **planar** if it can be drawn in the plane without crossing edges. For a connected planar graph with V vertices, E edges and F faces (regions, including the outer one):

**Euler's formula: V − E + F = 2**

Consequences for simple planar graphs with V ≥ 3: **E ≤ 3V − 6**, and if the graph has no triangles (for example, if it is bipartite), **E ≤ 2V − 4**. Every planar graph has a vertex of degree at most 5.

- K₅ is not planar: E = 10 > 3 × 5 − 6 = 9.
- K₃,₃ is not planar: it is bipartite and E = 9 > 2 × 6 − 4 = 8.
- **Kuratowski's theorem**: a graph is planar if and only if it contains no subdivision of K₅ or K₃,₃.

## Colouring

The **chromatic number** χ(G) is the fewest colours needed to colour the vertices so that adjacent vertices differ.

| Graph | χ |
| --- | --- |
| Kₙ | n |
| Bipartite graph with at least one edge | 2 |
| Cycle Cₙ | 2 if n is even, 3 if n is odd |
| Wheel (a hub joined to every vertex of Cₙ) | 3 if n is even, 4 if n is odd |
| Tree with at least 2 vertices | 2 |
| Planar graph | at most **4** (the four colour theorem) |

Lower bound: χ(G) ≥ ω(G), the size of the largest clique. Upper bound: χ(G) ≤ Δ(G) + 1, where Δ is the maximum degree. Finding χ is NP-hard in general, but brute force works for small graphs:

```python
from itertools import product, combinations

def chromatic_number(n, edges):
    for k in range(1, n + 1):
        for colouring in product(range(k), repeat=n):
            if all(colouring[a] != colouring[b] for a, b in edges):
                return k

cycle5 = [(i, (i + 1) % 5) for i in range(5)]
wheel6 = cycle5 + [(5, i) for i in range(5)]               # hub 5 joined to a 5-cycle
petersen = cycle5 + [(5 + i, 5 + (i + 2) % 5) for i in range(5)] + [(i, 5 + i) for i in range(5)]
k33 = [(a, b) for a in range(3) for b in range(3, 6)]
k4 = list(combinations(range(4), 2))
for name, n, edges in [("C5", 5, cycle5), ("wheel W6", 6, wheel6), ("Petersen", 10, petersen),
                       ("K3,3", 6, k33), ("K4", 4, k4)]:
    print(f"{name:9} {n:2} vertices, {len(edges):2} edges, chromatic number {chromatic_number(n, edges)}")
```
```output
C5         5 vertices,  5 edges, chromatic number 3
wheel W6   6 vertices, 10 edges, chromatic number 4
Petersen  10 vertices, 15 edges, chromatic number 3
K3,3       6 vertices,  9 edges, chromatic number 2
K4         4 vertices,  6 edges, chromatic number 4
```

## Matchings, independent sets, cliques and covers

| Concept | Definition |
| --- | --- |
| **Matching** | A set of edges with no shared vertex; **perfect** if it covers every vertex |
| **Independent set** | A set of pairwise non-adjacent vertices; its maximum size is α(G) |
| **Clique** | A set of pairwise adjacent vertices; maximum size ω(G) |
| **Vertex cover** | A set of vertices touching every edge; minimum size β(G) |
| **Edge cover** | A set of edges touching every vertex |

Key relations:

- S is an independent set exactly when V − S is a vertex cover, so **α(G) + β(G) = n**.
- An independent set of G is a clique of the complement Ḡ.
- In a **bipartite** graph, the maximum matching size equals the minimum vertex cover size (**König's theorem**).
- **Hall's theorem**: a bipartite graph with parts X and Y has a matching covering X iff every subset S of X has at least |S| neighbours.
- Kₙ with n even has (n − 1)(n − 3)…3·1 perfect matchings (15 for K₆), and K<sub>n,n</sub> has n!.

## Practice questions

```quiz
q: A simple graph has 12 edges and every vertex has degree 4. How many vertices does it have?
answer: 6
verify: 2 * 12 // 4
explain: By the handshaking lemma, 4n = 2 × 12, so n = 6. (The octahedron is such a graph.)
```

```quiz
q: A connected planar simple graph has 10 vertices and divides the plane into 8 regions (including the outer region). How many edges does it have?
answer: 16
verify: 10 + 8 - 2
explain: Euler's formula V − E + F = 2 gives E = V + F − 2 = 10 + 8 − 2 = 16. (Check: 16 ≤ 3 × 10 − 6 = 24.)
```

```quiz
q: What is the chromatic number of the wheel formed by joining a hub vertex to every vertex of a 5-cycle?
answer: 4
verify:
  from itertools import product
  edges = [(i, (i + 1) % 5) for i in range(5)] + [(5, i) for i in range(5)]
  print(next(k for k in range(1, 7) if any(all(c[a] != c[b] for a, b in edges) for c in product(range(k), repeat=6))))
explain: The odd cycle C₅ needs 3 colours, and the hub is adjacent to all five rim vertices, so it needs a fourth colour.
```

```quiz
q: How many labelled trees are there on 6 vertices?
answer: 1296
verify: 6 ** (6 - 2)
explain: By Cayley's formula there are nⁿ⁻² labelled trees: 6⁴ = 1296.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* A connected graph has an Euler circuit if and only if every vertex has even degree
* A graph is bipartite if and only if it contains no odd cycle
- K₃,₃ is planar
* In any graph, α(G) + β(G) equals the number of vertices
explain: The Euler and bipartite characterisations are standard. K₃,₃ is bipartite with 9 edges, but planar bipartite graphs on 6 vertices have at most 2 × 6 − 4 = 8 edges. The complement of a maximum independent set is a minimum vertex cover.
```

```quiz
q: How many perfect matchings does the complete graph K₆ have?
answer: 15
verify:
  def count(vs):
      if not vs: return 1
      return sum(count([w for w in vs[1:] if w != u]) for u in vs[1:])
  print(count(list(range(6))))
explain: Vertex 1 can be matched with any of the other 5; then the next unmatched vertex has 3 choices, and the last pair is forced: 5 × 3 × 1 = 15.
```
