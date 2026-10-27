---
title: Greedy Algorithms
chapter: Algorithm Design Techniques
description: Make the locally best choice at every step. Activity selection, fractional knapsack and Huffman coding.
---
A **greedy algorithm** builds a solution step by step, always taking the choice that looks best **right now**, and never going back. Greedy algorithms are simple and fast, but they only give the optimal answer for problems with two properties:

- **Greedy-choice property:** some optimal solution starts with the greedy choice.
- **Optimal substructure:** after the greedy choice, what is left is a smaller instance of the same problem.

Kruskal's and Prim's MST algorithms and Dijkstra's shortest paths are greedy. This lesson adds three classics.

## Activity selection

Given activities with start and finish times, choose the **largest** number that do not overlap. Greedy rule: sort by **finish time** and always take the next activity that starts after the last chosen one finishes. Picking the earliest finish leaves the most room for the rest.

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[][] acts = {{1, 4}, {3, 5}, {0, 6}, {5, 7}, {3, 9}, {5, 9}, {6, 10}, {8, 11}, {8, 12}, {2, 14}, {12, 16}};
        Arrays.sort(acts, Comparator.comparingInt(a -> a[1]));      // by finish time
        List<String> chosen = new ArrayList<>();
        int lastFinish = -1;
        for (int[] a : acts) {
            if (a[0] >= lastFinish) {
                chosen.add("[" + a[0] + "," + a[1] + ")");
                lastFinish = a[1];
            }
        }
        System.out.println(chosen.size() + " activities: " + String.join(" ", chosen));
    }
}
```
```output
4 activities: [1,4) [5,7) [8,11) [12,16)
```
```python
acts = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10), (8, 11), (8, 12), (2, 14), (12, 16)]
chosen, last_finish = [], -1
for s, f in sorted(acts, key=lambda a: a[1]):       # by finish time
    if s >= last_finish:
        chosen.append(f"[{s},{f})")
        last_finish = f
print(len(chosen), "activities:", " ".join(chosen))
```
```output
4 activities: [1,4) [5,7) [8,11) [12,16)
```
```c
#include <stdio.h>
#include <stdlib.h>

int by_finish(const void *a, const void *b) {
    return ((const int *)a)[1] - ((const int *)b)[1];
}

int main(void) {
    int acts[][2] = {{1, 4}, {3, 5}, {0, 6}, {5, 7}, {3, 9}, {5, 9}, {6, 10}, {8, 11}, {8, 12}, {2, 14}, {12, 16}};
    int n = 11;
    qsort(acts, n, sizeof(acts[0]), by_finish);          /* by finish time */
    int chosen[11], count = 0, last_finish = -1;
    for (int i = 0; i < n; i++) {
        if (acts[i][0] >= last_finish) {
            chosen[count++] = i;
            last_finish = acts[i][1];
        }
    }
    printf("%d activities:", count);
    for (int i = 0; i < count; i++) printf(" [%d,%d)", acts[chosen[i]][0], acts[chosen[i]][1]);
    printf("\n");
    return 0;
}
```
```output
4 activities: [1,4) [5,7) [8,11) [12,16)
```

## Fractional knapsack

Items have weights and values, and you may take **fractions** of items (like grains or liquids). Greedy rule: take items in decreasing order of **value per unit weight**, and take a fraction of the last one to fill the bag exactly. This is optimal, unlike the **0/1** knapsack, where items cannot be split and greedy can fail (that one needs dynamic programming).

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        double[][] items = {{10, 60}, {20, 100}, {30, 120}};       // {weight, value}
        double capacity = 50, total = 0;
        Arrays.sort(items, (a, b) -> Double.compare(b[1] / b[0], a[1] / a[0]));   // best ratio first
        for (double[] it : items) {
            if (capacity <= 0) break;
            double take = Math.min(it[0], capacity);
            total += take * it[1] / it[0];
            capacity -= take;
            System.out.printf("take %.0f of weight %.0f (ratio %.1f)%n", take, it[0], it[1] / it[0]);
        }
        System.out.printf("total value = %.1f%n", total);
    }
}
```
```output
take 10 of weight 10 (ratio 6.0)
take 20 of weight 20 (ratio 5.0)
take 20 of weight 30 (ratio 4.0)
total value = 240.0
```
```python
items = [(10, 60), (20, 100), (30, 120)]          # (weight, value)
capacity, total = 50, 0.0
for w, v in sorted(items, key=lambda it: it[1] / it[0], reverse=True):   # best ratio first
    if capacity <= 0:
        break
    take = min(w, capacity)
    total += take * v / w
    capacity -= take
    print(f"take {take} of weight {w} (ratio {v / w:.1f})")
print(f"total value = {total:.1f}")
```
```output
take 10 of weight 10 (ratio 6.0)
take 20 of weight 20 (ratio 5.0)
take 20 of weight 30 (ratio 4.0)
total value = 240.0
```
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct { double weight, value; } Item;

int by_ratio_desc(const void *a, const void *b) {
    const Item *x = a, *y = b;
    double rx = x->value / x->weight, ry = y->value / y->weight;
    return (ry > rx) - (ry < rx);                      /* best ratio first */
}

int main(void) {
    Item items[] = {{10, 60}, {20, 100}, {30, 120}};
    double capacity = 50, total = 0;
    qsort(items, 3, sizeof(Item), by_ratio_desc);
    for (int i = 0; i < 3 && capacity > 0; i++) {
        double take = items[i].weight < capacity ? items[i].weight : capacity;
        total += take * items[i].value / items[i].weight;
        capacity -= take;
        printf("take %.0f of weight %.0f (ratio %.1f)\n", take, items[i].weight, items[i].value / items[i].weight);
    }
    printf("total value = %.1f\n", total);
    return 0;
}
```
```output
take 10 of weight 10 (ratio 6.0)
take 20 of weight 20 (ratio 5.0)
take 20 of weight 30 (ratio 4.0)
total value = 240.0
```

With the same items in a **0/1** knapsack of capacity 50, the best is items 2 and 3 for value 220; greedy by ratio would take items 1 and 2 for only 160.

## Huffman coding

To compress text, give **frequent** characters **short** binary codes. **Huffman's algorithm** builds an optimal **prefix code** (no code is the start of another, so decoding is unambiguous):

1. Put every character in a min-priority queue keyed by frequency.
2. Repeatedly remove the two smallest, join them under a new node whose frequency is their sum, and put it back.
3. When one tree is left, left edges are 0 and right edges are 1; each character's code is its root-to-leaf path.

```tree
caption: Huffman tree for a:45 b:13 c:12 d:16 e:9 f:5 (frequencies in the note)
100
  a | 45 → code 0
  55
    25
      c | 12 → 100
      b | 13 → 101
    30
      14
        f | 5 → 1100
        e | 9 → 1101
      d | 16 → 111
```

```java
import java.util.*;

public class Main {
    record Node(int freq, int order, char ch, Node left, Node right) { }

    static void codes(Node n, String prefix, Map<Character, String> out) {
        if (n.left() == null) { out.put(n.ch(), prefix); return; }
        codes(n.left(), prefix + "0", out);
        codes(n.right(), prefix + "1", out);
    }

    public static void main(String[] args) {
        char[] chars = {'a', 'b', 'c', 'd', 'e', 'f'};
        int[] freq = {45, 13, 12, 16, 9, 5};
        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(Node::freq).thenComparingInt(Node::order));
        int order = 0;
        for (int i = 0; i < chars.length; i++) pq.add(new Node(freq[i], order++, chars[i], null, null));
        while (pq.size() > 1) {
            Node x = pq.poll(), y = pq.poll();
            pq.add(new Node(x.freq() + y.freq(), order++, '-', x, y));
        }
        Map<Character, String> code = new TreeMap<>();
        codes(pq.poll(), "", code);
        int bits = 0;
        for (int i = 0; i < chars.length; i++) bits += freq[i] * code.get(chars[i]).length();
        System.out.println("codes: " + code);
        System.out.println("total bits = " + bits + " (fixed 3-bit code: " + 3 * 100 + ")");
    }
}
```
```output
codes: {a=0, b=101, c=100, d=111, e=1101, f=1100}
total bits = 224 (fixed 3-bit code: 300)
```
```python
import heapq

freq = {"a": 45, "b": 13, "c": 12, "d": 16, "e": 9, "f": 5}
heap = [(f, i, ch, None, None) for i, (ch, f) in enumerate(freq.items())]
heapq.heapify(heap)
order = len(heap)
while len(heap) > 1:
    x = heapq.heappop(heap)
    y = heapq.heappop(heap)
    heapq.heappush(heap, (x[0] + y[0], order, "-", x, y))
    order += 1

codes = {}
def walk(node, prefix):
    if node[3] is None:
        codes[node[2]] = prefix
        return
    walk(node[3], prefix + "0")
    walk(node[4], prefix + "1")
walk(heap[0], "")

bits = sum(freq[ch] * len(code) for ch, code in codes.items())
print("codes:", dict(sorted(codes.items())))
print(f"total bits = {bits} (fixed 3-bit code: {3 * 100})")
```
```output
codes: {'a': '0', 'b': '101', 'c': '100', 'd': '111', 'e': '1101', 'f': '1100'}
total bits = 224 (fixed 3-bit code: 300)
```
```c
#include <stdio.h>
#include <string.h>

/* Huffman coding with a small array-based priority queue. Ties between equal
   frequencies are broken by creation order, like the Java version. */
typedef struct { int freq, order, left, right; char ch; } Node;
Node nodes[32];
int pq[32], pq_size = 0, node_count = 0;

int before(int a, int b) {
    if (nodes[a].freq != nodes[b].freq) return nodes[a].freq < nodes[b].freq;
    return nodes[a].order < nodes[b].order;
}

int pop_min(void) {
    int best = 0;
    for (int i = 1; i < pq_size; i++) if (before(pq[i], pq[best])) best = i;
    int id = pq[best];
    pq[best] = pq[--pq_size];
    return id;
}

int new_node(int freq, char ch, int left, int right) {
    nodes[node_count] = (Node){freq, node_count, left, right, ch};
    return node_count++;
}

char codes[128][16];
void walk(int id, char *prefix, int depth) {
    if (nodes[id].left < 0) {
        prefix[depth] = '\0';
        strcpy(codes[(int)nodes[id].ch], prefix);
        return;
    }
    prefix[depth] = '0'; walk(nodes[id].left, prefix, depth + 1);
    prefix[depth] = '1'; walk(nodes[id].right, prefix, depth + 1);
}

int main(void) {
    char chars[] = {'a', 'b', 'c', 'd', 'e', 'f'};
    int freq[] = {45, 13, 12, 16, 9, 5};
    for (int i = 0; i < 6; i++) pq[pq_size++] = new_node(freq[i], chars[i], -1, -1);
    while (pq_size > 1) {
        int x = pop_min(), y = pop_min();
        pq[pq_size++] = new_node(nodes[x].freq + nodes[y].freq, '-', x, y);
    }
    char prefix[16];
    walk(pq[0], prefix, 0);

    int bits = 0;
    printf("codes: {");
    for (int i = 0; i < 6; i++) {
        printf(i ? ", %c=%s" : "%c=%s", chars[i], codes[(int)chars[i]]);
        bits += freq[i] * (int)strlen(codes[(int)chars[i]]);
    }
    printf("}\ntotal bits = %d (fixed 3-bit code: %d)\n", bits, 3 * 100);
    return 0;
}
```
```output
codes: {a=0, b=101, c=100, d=111, e=1101, f=1100}
total bits = 224 (fixed 3-bit code: 300)
```

The average code length is 224 / 100 = 2.24 bits per character, against 3 bits for a fixed-length code. Ties between equal frequencies can produce different codes, but the **total** number of bits is always the same optimal value.

## GATE-style practice questions

```quiz
q: Characters with frequencies a:5, b:9, c:12, d:13, e:16, f:45 are Huffman coded. What is the total number of bits needed to encode a message containing exactly these counts (100 characters)?
answer: 224
verify:
  import heapq
  h = [5, 9, 12, 13, 16, 45]
  heapq.heapify(h)
  cost = 0
  while len(h) > 1:
      x = heapq.heappop(h)
      y = heapq.heappop(h)
      cost += x + y
      heapq.heappush(h, x + y)
  print(cost)
explain: The total encoded length equals the sum of all merge costs: 5 + 9 = 14, 12 + 13 = 25, 14 + 16 = 30, 25 + 30 = 55, 45 + 55 = 100. Adding them, 14 + 25 + 30 + 55 + 100 = 224 bits.
```

```quiz
q: In a fractional knapsack of capacity 15, items have (weight, value) = (5, 10), (10, 40), (4, 20), (6, 18). What is the maximum total value?
answer: 63
verify:
  items, cap, total = [(5, 10), (10, 40), (4, 20), (6, 18)], 15, 0
  for w, v in sorted(items, key=lambda t: t[1] / t[0], reverse=True):
      take = min(w, cap)
      total += take * v / w
      cap -= take
  print(int(total) if total == int(total) else total)
explain: Ratios: 20/4 = 5, 40/10 = 4, 18/6 = 3, 10/5 = 2. Take the weight-4 item (20) and the weight-10 item (40): weight 14, value 60. One unit of capacity is left, so take 1/6 of the (6, 18) item for 3 more. Total 63.
```

```quiz
q: For which problems does the greedy strategy described in this lesson always give an optimal solution? (Select all that apply.)
* Activity selection by earliest finish time
* Fractional knapsack by value per unit weight
- 0/1 knapsack by value per unit weight
* Minimum spanning tree with Kruskal's algorithm
explain: Activity selection, fractional knapsack and MST all have the greedy-choice property. For 0/1 knapsack, greedy can fail: with capacity 50 and items (10, 60), (20, 100), (30, 120), greedy gets 160 but the optimum is 220.
```
