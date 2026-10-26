---
title: Adversarial Search - Minimax and Alpha-Beta Pruning
chapter: Search
description: Two-player zero-sum games, game trees, the minimax algorithm, alpha-beta pruning and how move ordering affects it, depth-limited search with evaluation functions, and expectiminimax, for GATE DA.
---
In **adversarial search** there is an opponent who is also choosing moves, and who wants us to lose. Classic examples are chess, tic-tac-toe and checkers: **two-player, turn-taking, zero-sum games of perfect information** (both players see the whole board, and one player's gain is exactly the other's loss).

## Game trees

A game is described by its initial state, the player to move, the legal moves, the result of each move, a **terminal test** (is the game over?), and a **utility** function that scores each terminal state from the first player's point of view (for example +1 win, 0 draw, −1 loss).

The two players are called **MAX** (wants to maximise the utility) and **MIN** (wants to minimise it). The **game tree** alternates MAX levels and MIN levels down to the terminal states.

## Minimax

The **minimax value** of a node is the utility MAX can guarantee from it if both players play optimally:

- terminal node: its utility;
- MAX node: the **maximum** of its children's values;
- MIN node: the **minimum** of its children's values.

MAX should pick the move leading to the child with the highest minimax value. The values are computed bottom-up by a depth-first traversal.

**Example.** MAX moves first and has three moves a, b and c; MIN then has three replies each.

```tree
caption: A two-ply game tree. MIN values are 3, 2 and 2, so the root (MAX) value is 3
MAX = 3
  a: MIN = 3
    3
    12
    8
  b: MIN = 2
    2
    4
    6
  c: MIN = 2
    14
    5
    2
```

MIN picks the smallest leaf under each move: 3, 2 and 2. MAX picks the largest of these, 3, so the best move is **a**.

Minimax is a complete depth-first search: time **O(b<sup>m</sup>)** and space O(b·m) for branching factor b and maximum depth m. For chess (b ≈ 35, m ≈ 100) that is hopeless, which motivates pruning and depth limits.

## Alpha-beta pruning

Alpha-beta pruning computes **the same minimax value** while skipping branches that cannot affect the decision. It carries two bounds down the tree:

- **α** = the best value found so far for **MAX** along the path to the root (MAX can already guarantee at least α);
- **β** = the best value found so far for **MIN** along the path (MIN can already hold MAX to at most β).

At any node, as soon as **α ≥ β**, the remaining children are **pruned**: the player above would never let the game reach this node.

In the example tree:

1. Under a, MIN sees 3, 12, 8 and returns 3. At the root, α = 3.
2. Under b, the first leaf is 2, so MIN can hold this branch to at most 2. MAX already has 3, so b can never be better: the leaves **4 and 6 are pruned**.
3. Under c, the leaves 14 and 5 do not let MIN go below 3, so they must be examined; then 2 arrives. Nothing is left to prune.

Two leaves out of nine are pruned, and the root value is still 3.

```python
def alphabeta(node, maximizing, alpha, beta, visited):
    if isinstance(node, int):
        visited.append(node)
        return node
    best = float("-inf") if maximizing else float("inf")
    for child in node:
        v = alphabeta(child, not maximizing, alpha, beta, visited)
        if maximizing:
            best = max(best, v)
            alpha = max(alpha, best)
        else:
            best = min(best, v)
            beta = min(beta, best)
        if alpha >= beta:
            break          # prune the remaining children
    return best

def minimax(node, maximizing):
    if isinstance(node, int):
        return node
    vals = [minimax(c, not maximizing) for c in node]
    return max(vals) if maximizing else min(vals)

for tree in ([[3, 12, 8], [2, 4, 6], [14, 5, 2]],
             [[2, 4, 6], [14, 5, 2], [3, 12, 8]]):
    visited = []
    v = alphabeta(tree, True, float("-inf"), float("inf"), visited)
    print(f"tree {tree}: minimax = {minimax(tree, True)}, alpha-beta = {v}, "
          f"leaves visited {visited}, pruned {9 - len(visited)}")
```
```output
tree [[3, 12, 8], [2, 4, 6], [14, 5, 2]]: minimax = 3, alpha-beta = 3, leaves visited [3, 12, 8, 2, 14, 5, 2], pruned 2
tree [[2, 4, 6], [14, 5, 2], [3, 12, 8]]: minimax = 3, alpha-beta = 3, leaves visited [2, 4, 6, 14, 5, 2, 3, 12, 8], pruned 0
```

The second tree has the same branches in a worse order, and pruning saves less: **move ordering matters**.

### How much does alpha-beta save?

- With **perfect move ordering** (best moves examined first), alpha-beta examines about **O(b<sup>m/2</sup>)** nodes instead of O(b<sup>m</sup>). The effective branching factor drops from b to √b, so the search can go **twice as deep** in the same time.
- With random ordering it is about O(b<sup>3m/4</sup>).
- With the worst ordering it prunes nothing.
- Pruning **never changes the value** computed at the root.

## Imperfect real-time decisions

For real games the tree is cut off at a depth limit, and non-terminal leaves are scored by an **evaluation function**: an estimate of the utility, such as a weighted sum of material in chess (queen 9, rook 5, and so on). **Iterative deepening** is used so that a move is always ready when time runs out, and its earlier iterations give a good move ordering for alpha-beta.

## Games of chance: expectiminimax

In backgammon a dice roll decides which moves are possible. The tree gets **chance nodes**, whose value is the **expected value** (probability-weighted average) of their children:

- MAX node: max of children; MIN node: min of children;
- chance node: Σ P(outcome) × value(outcome).

Unlike minimax, the result now depends on the actual scale of the utilities, not just their order.

## Practice questions

```quiz
q: A MAX root has two MIN children. The first MIN node has leaves 5, 8 and 6; the second has leaves 9, 4 and 7. What is the minimax value of the root?
answer: 5
verify: max(min(5, 8, 6), min(9, 4, 7))
explain: The MIN nodes take 5 and 4. MAX takes the larger, 5.
```

```quiz
q: For the same tree (first MIN node: 5, 8, 6; second MIN node: 9, 4, 7), evaluated left to right with alpha-beta pruning, how many leaves are **pruned**?
answer: 1
verify:
  def ab(n, mx, a, b, seen):
      if isinstance(n, int):
          seen.append(n)
          return n
      best = float("-inf") if mx else float("inf")
      for c in n:
          v = ab(c, not mx, a, b, seen)
          if mx:
              best = max(best, v)
              a = max(a, best)
          else:
              best = min(best, v)
              b = min(b, best)
          if a >= b:
              break
      return best
  seen = []
  ab([[5, 8, 6], [9, 4, 7]], True, float("-inf"), float("inf"), seen)
  print(6 - len(seen))
explain: The first MIN node is fully examined and gives 5, so α = 5 at the root. In the second MIN node, 9 does not help (MIN could still go lower), but after 4 MIN can hold this branch to at most 4 < 5, so the last leaf, 7, is pruned.
```

```quiz
q: A game tree has a uniform branching factor of 4 and depth 6. With perfect move ordering, alpha-beta examines about b<sup>m/2</sup> leaves. About how many is that?
answer: 64
verify: 4 ** (6 // 2)
explain: b<sup>m/2</sup> = 4³ = 64, compared with 4⁶ = 4096 leaves for plain minimax.
```

```quiz
q: A chance node has three outcomes with probabilities 0.5, 0.3 and 0.2, whose values are 4, −2 and 10. What is the expectiminimax value of the chance node?
answer: 3.4
verify: round(0.5 * 4 + 0.3 * -2 + 0.2 * 10, 9)
explain: 0.5 × 4 + 0.3 × (−2) + 0.2 × 10 = 2 − 0.6 + 2 = 3.4.
```

```quiz
q: Which statements about alpha-beta pruning are **true**? (Select all that apply.)
* It returns the same root value as minimax
* Its effectiveness depends on the order in which moves are examined
- It always prunes at least half of the leaves
- It can be used unchanged in games with chance nodes
explain: Pruning only skips branches that cannot change the decision, so the value is unchanged. Good ordering prunes much more; the worst ordering prunes nothing. Chance nodes average their children, so the simple α ≥ β cut-off no longer applies without bounds on the utilities.
```
