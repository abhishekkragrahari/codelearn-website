---
title: Informed Search - Greedy Best-First and A*
chapter: Search
description: Heuristic functions, greedy best-first search, A* search with f(n) = g(n) + h(n), admissible and consistent heuristics, optimality of A*, dominance, and designing heuristics by relaxation, for GATE DA.
---
**Informed** (heuristic) search uses extra knowledge about the problem: a **heuristic function h(n)** that estimates the cost of the cheapest path from node n to a goal. A good heuristic lets the search head straight for the goal instead of exploring blindly.

For route finding, the straight-line distance to the destination is a natural heuristic. For the 8-puzzle, the number of misplaced tiles is one.

## Greedy best-first search

Greedy best-first search expands the node with the **smallest h(n)**: the node that **looks** closest to the goal, ignoring how much it cost to get there.

- It is often fast, but **not optimal**: it may follow a path that looks good early and turns out expensive.
- It is **not complete** in tree search (it can loop); graph search makes it complete in finite spaces.
- Worst-case time and space O(b<sup>m</sup>), though a good heuristic cuts this dramatically.

## A* search

A* expands the node with the smallest

**f(n) = g(n) + h(n)**

where g(n) is the cost of the path found so far from the start to n, and h(n) estimates the remaining cost. So f(n) estimates the cost of the cheapest solution **through** n. A* combines the cost-awareness of uniform-cost search (h = 0 gives UCS) with the goal-direction of greedy search.

### Admissible and consistent heuristics

- h is **admissible** if it **never overestimates**: h(n) ≤ h\*(n) for every n, where h\*(n) is the true cheapest cost from n to a goal. Also h(goal) = 0.
- h is **consistent** (monotone) if for every edge n → n′ with cost c(n, n′): **h(n) ≤ c(n, n′) + h(n′)**. This is a triangle inequality.

Every consistent heuristic is admissible. The converse is not always true, but most natural admissible heuristics are also consistent.

**Optimality of A\*:**

- With an **admissible** heuristic, A\* **tree search** is optimal.
- With a **consistent** heuristic, A\* **graph search** is optimal, and f(n) never decreases along a path, so the first time A\* expands a node it has found the cheapest path to it.
- A\* is **optimally efficient**: no other optimal algorithm using the same heuristic is guaranteed to expand fewer nodes.

With an inadmissible heuristic that overestimates, A\* can return a suboptimal path.

## Worked example

The graph from the previous lesson, with heuristic values written next to each node:

```graph
caption: The same graph; h values are S 7, A 6, B 4, C 2, D 1, G 0
nodes: S A C G D B
S -> A : 1
S -> B : 4
A -> B : 2
A -> C : 5
A -> D : 12
B -> C : 2
C -> D : 1
C -> G : 4
D -> G : 2
```

| Node | S | A | B | C | D | G |
| --- | --- | --- | --- | --- | --- | --- |
| h(n) | 7 | 6 | 4 | 2 | 1 | 0 |
| True cost to G, h\*(n) | 8 | 7 | 5 | 3 | 2 | 0 |

Every h(n) ≤ h\*(n), so h is admissible. The program also checks every edge for consistency.

```python
import heapq

graph = {"S": {"A": 1, "B": 4}, "A": {"B": 2, "C": 5, "D": 12}, "B": {"C": 2},
         "C": {"D": 1, "G": 4}, "D": {"G": 2}, "G": {}}
h = {"S": 7, "A": 6, "B": 4, "C": 2, "D": 1, "G": 0}

consistent = all(h[n] <= c + h[m] for n in graph for m, c in graph[n].items())
print("consistent:", consistent)

def search(start, goal, priority):
    frontier, explored, order = [(priority(0, start), start, 0, [start])], set(), []
    while frontier:
        f, node, g, path = heapq.heappop(frontier)
        if node in explored:
            continue
        explored.add(node)
        order.append(f"{node}(f={f})")
        if node == goal:
            return order, path, g
        for nxt, c in graph[node].items():
            if nxt not in explored:
                heapq.heappush(frontier, (priority(g + c, nxt), nxt, g + c, path + [nxt]))

for name, pr in [("Greedy", lambda g, n: h[n]), ("A*", lambda g, n: g + h[n]), ("UCS", lambda g, n: g)]:
    order, path, g = search("S", "G", pr)
    print(f"{name:6}: expanded {' '.join(order)}")
    print(f"        path {'-'.join(path)}, cost {g}, {len(order)} expansions")
```
```output
consistent: True
Greedy: expanded S(f=7) B(f=4) C(f=2) G(f=0)
        path S-B-C-G, cost 10, 4 expansions
A*    : expanded S(f=7) A(f=7) B(f=7) C(f=7) D(f=7) G(f=8)
        path S-A-B-C-D-G, cost 8, 6 expansions
UCS   : expanded S(f=0) A(f=1) B(f=3) C(f=5) D(f=6) G(f=8)
        path S-A-B-C-D-G, cost 8, 6 expansions
```

Greedy search rushes along the nodes with small h (S, B, C, G) and returns S-B-C-G, which costs 10. A\* finds the optimal path of cost 8. Notice that every node A\* expands before the goal has f = 7: h is so close to the true cost that f stays nearly constant along the optimal path. On this tiny graph UCS happens to expand the same six nodes; on large graphs, where UCS spreads out in every direction, a good heuristic saves A\* an enormous number of expansions.

## Comparing heuristics: dominance

If h₁ and h₂ are both admissible and h₂(n) ≥ h₁(n) for every n, then h₂ **dominates** h₁. A\* with h₂ never expands more nodes than with h₁: a larger admissible heuristic is a better-informed one. The ideal is h = h\*, with which A\* expands only nodes on an optimal path; h = 0 gives no information (UCS).

If h₁ and h₂ are both admissible, **max(h₁, h₂)** is admissible too and dominates both.

## Designing heuristics: relaxed problems

An admissible heuristic is often the exact cost of a **relaxed problem**, a version of the problem with some constraints removed. Removing constraints can only make solutions cheaper, so the relaxed cost never overestimates.

For the **8-puzzle** (slide tiles into the blank to reach the goal arrangement):

- **h₁ = number of misplaced tiles**: exact if a tile could jump to any square in one move.
- **h₂ = sum of Manhattan distances** of each tile from its goal square: exact if a tile could slide into any adjacent square, even an occupied one.

Both are admissible, and h₂ dominates h₁ (a misplaced tile is at least 1 square away). The blank is never counted.

```python
start = [[7, 2, 4],
         [5, 0, 6],
         [8, 3, 1]]
goal = [[0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]]
where = {goal[r][c]: (r, c) for r in range(3) for c in range(3)}
tiles = [(start[r][c], r, c) for r in range(3) for c in range(3) if start[r][c] != 0]
h1 = sum(1 for t, r, c in tiles if (r, c) != where[t])
h2 = sum(abs(r - where[t][0]) + abs(c - where[t][1]) for t, r, c in tiles)
print("misplaced tiles h1 =", h1)
print("Manhattan distance h2 =", h2)
```
```output
misplaced tiles h1 = 8
Manhattan distance h2 = 18
```

## Practice questions

```quiz
q: During A\* search, a node n has g(n) = 12 and h(n) = 7. Another frontier node m has g(m) = 15 and h(m) = 3. Which node does A\* expand first?
- n, because its g value is smaller
* m, because its f value is smaller
- n, because its h value is larger
- They tie
verify: "m, because its f value is smaller" if 15 + 3 < 12 + 7 else "n"
explain: f(n) = 12 + 7 = 19 and f(m) = 15 + 3 = 18. A\* expands the smallest f, so m comes first.
```

```quiz
q: For the 8-puzzle state with rows (1, 2, 3), (4, 0, 6), (7, 5, 8), where 0 is the blank and the goal is (1, 2, 3), (4, 5, 6), (7, 8, 0), what is the sum of the Manhattan distances of the tiles?
answer: 2
verify:
  s = [[1, 2, 3], [4, 0, 6], [7, 5, 8]]
  g = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]
  w = {g[r][c]: (r, c) for r in range(3) for c in range(3)}
  print(sum(abs(r - w[s[r][c]][0]) + abs(c - w[s[r][c]][1]) for r in range(3) for c in range(3) if s[r][c]))
explain: Only tiles 5 and 8 are out of place. Tile 5 is at row 3, column 2 and belongs at row 2, column 2: distance 1. Tile 8 is at row 3, column 3 and belongs at row 3, column 2: distance 1. Total 2.
```

```quiz
q: An edge n → n′ has cost 3, and h(n′) = 5. For h to be **consistent** on this edge, what is the largest value h(n) can have?
answer: 8
verify: 3 + 5
explain: Consistency requires h(n) ≤ c(n, n′) + h(n′) = 3 + 5 = 8.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* A* with h(n) = 0 for every n behaves like uniform-cost search
* Every consistent heuristic is admissible
- Greedy best-first search always returns an optimal path
* If h₁ and h₂ are admissible, max(h₁, h₂) is admissible
explain: With h = 0, f = g. Consistency implies admissibility by induction along the optimal path. Greedy search ignores g, so it can return expensive paths. The maximum of two values that each never overestimate also never overestimates.
```

```quiz
q: An admissible heuristic h for a problem has h(start) = 14. Which of the following could be the cost of the optimal solution?
- 10
- 13
* 14
- Any of these
explain: Admissible means h(start) ≤ h\*(start), the optimal cost. So the optimal cost is at least 14; of the options, only 14 is possible.
```
