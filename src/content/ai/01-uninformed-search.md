---
title: Problem Solving and Uninformed Search
chapter: Search
description: Formulating a search problem, tree search versus graph search, and the uninformed strategies BFS, DFS, uniform-cost search, depth-limited and iterative deepening search, with their completeness, optimality and complexity, for GATE DA.
---
Many AI problems can be framed as **search**: find a sequence of actions that leads from a start state to a goal state. Route finding, puzzles like the 8-puzzle, and planning a robot's moves all fit this pattern.

## Formulating a search problem

A search problem has five parts:

- the **initial state** (where we start);
- the **actions** available in each state;
- the **transition model**: the state that results from each action;
- the **goal test**: is this state a goal?
- the **path cost**: the sum of the step costs of the actions taken.

The states and actions form a **state space graph**. A search algorithm explores it by building a **search tree**: the root is the initial state, and **expanding** a node generates its children (its successors). The set of generated but not yet expanded nodes is the **frontier** (or fringe). Strategies differ only in **which frontier node they expand next**.

**Tree search** may visit the same state many times along different paths. **Graph search** keeps an **explored set** and never expands a state twice, which avoids loops and repeated work.

**Uninformed** (blind) strategies use only the problem definition. They have no idea how close a state is to the goal; that is what heuristics add in the next lesson.

## The example graph

All the strategies below are run on this directed graph from S to G. When nodes tie, they are taken in alphabetical order, and the goal test is applied when a node is **expanded**.

```graph
caption: A directed graph with step costs, start S and goal G
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

## Breadth-first search (BFS)

BFS expands the **shallowest** node first, using a **FIFO queue** as the frontier. It explores the graph level by level.

- **Complete**: yes, if the branching factor b is finite.
- **Optimal**: yes, when all step costs are equal (it finds the path with the fewest edges), but not in general.
- **Time and space**: O(b<sup>d</sup>), where d is the depth of the shallowest goal. The memory cost is the real problem: BFS stores the whole frontier.

## Depth-first search (DFS)

DFS expands the **deepest** node first, using a **LIFO stack**.

- **Complete**: no in infinite spaces or with loops in tree search (it can go down an infinite branch forever); yes for graph search in finite spaces.
- **Optimal**: no: it returns the first goal it reaches.
- **Time**: O(b<sup>m</sup>), where m is the maximum depth. **Space**: only O(b·m), because it keeps just the current path and the siblings along it. This small memory use is its main advantage.

## Uniform-cost search (UCS)

UCS expands the node with the **lowest path cost g(n)**, using a **priority queue**. It is Dijkstra's algorithm with a goal test.

- **Complete and optimal** as long as every step cost is at least some ε > 0.
- The goal test must be done when a node is **expanded**, not when it is generated: a cheaper path to the goal might still be found later.
- Time and space: O(b<sup>1 + ⌊C\*/ε⌋</sup>), where C\* is the optimal cost.
- With equal step costs, UCS behaves like BFS.

```python
import heapq
from collections import deque

graph = {"S": {"A": 1, "B": 4}, "A": {"B": 2, "C": 5, "D": 12}, "B": {"C": 2},
         "C": {"D": 1, "G": 4}, "D": {"G": 2}, "G": {}}

def cost(path):
    return sum(graph[a][b] for a, b in zip(path, path[1:]))

def bfs(start, goal):
    frontier, explored, order = deque([[start]]), set(), []
    while frontier:
        path = frontier.popleft()
        node = path[-1]
        if node in explored:
            continue
        explored.add(node)
        order.append(node)
        if node == goal:
            return order, path
        for nxt in sorted(graph[node]):
            if nxt not in explored:
                frontier.append(path + [nxt])

def dfs(start, goal):
    frontier, explored, order = [[start]], set(), []
    while frontier:
        path = frontier.pop()
        node = path[-1]
        if node in explored:
            continue
        explored.add(node)
        order.append(node)
        if node == goal:
            return order, path
        for nxt in sorted(graph[node], reverse=True):   # so the alphabetically first child is on top
            if nxt not in explored:
                frontier.append(path + [nxt])

def ucs(start, goal):
    frontier, explored, order = [(0, [start])], set(), []
    while frontier:
        g, path = heapq.heappop(frontier)
        node = path[-1]
        if node in explored:
            continue
        explored.add(node)
        order.append(f"{node}({g})")
        if node == goal:
            return order, path
        for nxt, c in graph[node].items():
            if nxt not in explored:
                heapq.heappush(frontier, (g + c, path + [nxt]))

for name, search in [("BFS", bfs), ("DFS", dfs), ("UCS", ucs)]:
    order, path = search("S", "G")
    print(f"{name}: expanded {' '.join(order)}; path {'-'.join(path)}, cost {cost(path)}")
```
```output
BFS: expanded S A B C D G; path S-A-C-G, cost 10
DFS: expanded S A B C D G; path S-A-B-C-D-G, cost 8
UCS: expanded S(0) A(1) B(3) C(5) D(6) G(8); path S-A-B-C-D-G, cost 8
```

BFS finds a path with the fewest edges (3) but cost 10. DFS dives down the alphabetically first branch, S-A-B-C-D-G, which here happens to be the cheapest path (cost 8), but only by luck of the alphabetical tie-breaking: DFS returns whichever path it reaches first, whatever its cost. UCS is the only one of the three that is **guaranteed** to return the cheapest path, and it expands nodes in order of their cost from S: 0, 1, 3, 5, 6, 8.

## Depth-limited and iterative deepening search

**Depth-limited search** is DFS that does not go below a depth limit ℓ. It cannot loop forever, but it misses goals deeper than ℓ.

**Iterative deepening DFS (IDDFS)** runs depth-limited search with ℓ = 0, 1, 2, … until a goal is found. It combines the strengths of both:

- complete and optimal (for unit step costs), like BFS;
- O(b·d) memory, like DFS.

It looks wasteful because the shallow levels are generated again and again, but most nodes are at the deepest level. With branching factor b and goal depth d, nodes at depth i are generated (d − i + 1) times, so the total is

N = (d + 1)·1 + d·b + (d − 1)·b² + … + 1·b<sup>d</sup> = O(b<sup>d</sup>).

For b = 10 and d = 5, IDDFS generates 123,456 nodes compared with 111,111 for BFS: only about 11% more.

**Bidirectional search** runs two searches, forward from the start and backward from the goal, and stops when they meet. Each search only needs to reach depth d/2, so the cost is O(b<sup>d/2</sup>) instead of O(b<sup>d</sup>).

## Summary

| Strategy | Complete? | Optimal? | Time | Space |
| --- | --- | --- | --- | --- |
| BFS | Yes | Yes, for equal costs | O(b<sup>d</sup>) | O(b<sup>d</sup>) |
| UCS | Yes (costs ≥ ε) | Yes | O(b<sup>1 + ⌊C\*/ε⌋</sup>) | same |
| DFS | No (yes in finite graphs) | No | O(b<sup>m</sup>) | O(b·m) |
| Depth-limited | No | No | O(b<sup>ℓ</sup>) | O(b·ℓ) |
| IDDFS | Yes | Yes, for equal costs | O(b<sup>d</sup>) | O(b·d) |
| Bidirectional | Yes (with BFS) | Yes, for equal costs | O(b<sup>d/2</sup>) | O(b<sup>d/2</sup>) |

## Practice questions

```quiz
q: A search tree has branching factor 3 and the shallowest goal is at depth 4. In the worst case, how many nodes does BFS generate up to and including depth 4 (count the root as depth 0)?
answer: 121
verify: sum(3 ** i for i in range(5))
explain: 1 + 3 + 9 + 27 + 81 = 121 nodes at depths 0 to 4.
```

```quiz
q: With branching factor b = 2 and goal depth d = 3, how many nodes does iterative deepening search generate in total, counting every repeated generation (use N = Σ (d − i + 1) bⁱ for i = 0 to d)?
answer: 26
verify: sum((3 - i + 1) * 2 ** i for i in range(4))
explain: N = 4·1 + 3·2 + 2·4 + 1·8 = 4 + 6 + 8 + 8 = 26. BFS would generate 1 + 2 + 4 + 8 = 15 nodes.
```

```quiz
q: Which search strategy uses a **priority queue ordered by path cost g(n)**?
- Breadth-first search
- Depth-first search
* Uniform-cost search
- Iterative deepening search
explain: UCS always expands the frontier node with the lowest g(n), so it keeps the frontier in a priority queue. BFS uses a FIFO queue and DFS a LIFO stack.
```

```quiz
q: In the example graph of this lesson, what is the cost of the cheapest path from A to G?
answer: 7
verify:
  import heapq
  g = {"S": {"A": 1, "B": 4}, "A": {"B": 2, "C": 5, "D": 12}, "B": {"C": 2}, "C": {"D": 1, "G": 4}, "D": {"G": 2}, "G": {}}
  pq, seen = [(0, "A")], set()
  while pq:
      d, n = heapq.heappop(pq)
      if n == "G":
          print(d)
          break
      if n in seen:
          continue
      seen.add(n)
      for m, c in g[n].items():
          heapq.heappush(pq, (d + c, m))
explain: A → B → C → D → G costs 2 + 2 + 1 + 2 = 7. The alternatives are worse: A → C → D → G costs 5 + 1 + 2 = 8 and A → B → C → G costs 2 + 2 + 4 = 8.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* DFS needs memory proportional to b·m, where m is the maximum depth
* Iterative deepening search is complete when the branching factor is finite
- BFS always finds the lowest-cost path, even when step costs differ
- Uniform-cost search can stop as soon as the goal is generated
explain: DFS stores one path plus the unexpanded siblings along it. IDDFS eventually reaches every finite depth. BFS minimises the number of edges, not the cost. UCS must wait until the goal is expanded, because a cheaper path may still be in the frontier.
```
