---
title: Routing Algorithms
chapter: Network Layer
description: Forwarding versus routing, flooding, distance vector routing with Bellman-Ford and the count-to-infinity problem, link state routing with Dijkstra, and RIP, OSPF and BGP.
---
A router does two different jobs:

- **Forwarding** (data plane): for each arriving packet, look up the destination in the forwarding table and send it out on the right link. This happens in nanoseconds, in hardware.
- **Routing** (control plane): build those tables, by running a **routing algorithm** that finds good paths through the network. This happens in software, over seconds.

The network is modelled as a graph: routers are nodes and links are edges with a **cost** (a metric such as delay, distance or simply 1 per hop).

```graph
caption: The example network used in this lesson (link costs on the edges)
nodes: A B D E C
A - B : 2
A - C : 5
B - C : 1
B - D : 4
C - E : 3
D - E : 1
```

## Flooding

The simplest method needs no tables at all: every router sends each incoming packet out on **every link except the one it came in on**. Flooding certainly finds the destination (along every path, including the shortest), but it creates huge numbers of duplicates. They are limited with a **hop counter** (decremented at each hop, the packet is discarded at 0) or by having each router remember the packets it has already flooded (sequence numbers). Flooding is used where robustness matters most, for example to spread link-state packets.

## Distance vector routing

Each router keeps a **distance vector**: its best known cost to every destination, and the neighbour (next hop) to use. Periodically, every router sends its vector to its **neighbours only**. On receiving them, router x updates each destination y with the **Bellman-Ford equation**:

**D<sub>x</sub>(y) = min over neighbours v of { c(x, v) + D<sub>v</sub>(y) }**

Each router knows only its neighbours and what they claim, never the whole topology. The algorithm is **distributed**, **iterative** (repeated until nothing changes) and **asynchronous**.

The program below runs the exchanges in synchronous rounds on the example network, starting from tables that only know direct links:

```python
INF = float("inf")
links = {("A", "B"): 2, ("A", "C"): 5, ("B", "C"): 1, ("B", "D"): 4, ("C", "E"): 3, ("D", "E"): 1}
graph = {}
for (u, v), w in links.items():
    graph.setdefault(u, {})[v] = w
    graph.setdefault(v, {})[u] = w
nodes = sorted(graph)

dist = {u: {v: 0 if u == v else graph[u].get(v, INF) for v in nodes} for u in nodes}
print("round 0, A's vector:", dist["A"])
rounds = 0
while True:
    new = {u: {v: min([dist[u][v]] + [graph[u][n] + dist[n][v] for n in graph[u]])
               for v in nodes} for u in nodes}
    if new == dist:
        break
    dist, rounds = new, rounds + 1
    print(f"round {rounds}, A's vector:", dist["A"])
print("stable after", rounds, "rounds")
```
```output
round 0, A's vector: {'A': 0, 'B': 2, 'C': 5, 'D': inf, 'E': inf}
round 1, A's vector: {'A': 0, 'B': 2, 'C': 3, 'D': 6, 'E': 8}
round 2, A's vector: {'A': 0, 'B': 2, 'C': 3, 'D': 6, 'E': 6}
stable after 2 rounds
```

After round 1, A knows E only through C's original estimate (5 + 3 = 8). In round 2 it hears that B can reach E at cost 4 (through C), and improves to 2 + 4 = 6.

### Count to infinity

Good news (a cheaper path) spreads quickly, one hop per exchange. **Bad news spreads slowly.** Take a chain A – B – C with cost 1 on each link. B reaches A at cost 1 and C at cost 2 (through B). Now the link A–B fails:

- B no longer has a direct route, but C still advertises "A at cost 2". B does not know that C's route goes through B itself, so B sets its cost to 1 + 2 = **3**, via C.
- C hears B's new value and updates to 1 + 3 = **4**.
- B updates to 5, C to 6, and so on: the two routers bounce the route between them, adding 1 each time, until the cost reaches "infinity".

Fixes:

- Define a small **infinity**: RIP uses 16, so the counting stops after a few rounds.
- **Split horizon**: do not advertise a route back to the neighbour you learned it from.
- **Poisoned reverse**: advertise it back to that neighbour, but with cost infinity.

These fix loops between two routers, but not every loop that involves three or more.

## Link state routing

Each router learns the **complete topology** and computes the shortest paths itself:

1. Discover its neighbours and measure the cost to each.
2. Build a **link-state packet** (LSP) listing its neighbours and costs, stamped with a sequence number and an age.
3. **Flood** its LSP to every router in the network (sequence numbers make each router forward each LSP only once).
4. With every LSP in hand, run **Dijkstra's algorithm** to find the shortest path to every destination, and fill the forwarding table with the first hop of each path.

```python
import heapq

def dijkstra(graph, source):
    dist, first_hop = {source: 0}, {}
    queue, done = [(0, source, None)], set()
    while queue:
        d, u, hop = heapq.heappop(queue)
        if u in done:
            continue
        done.add(u)
        if hop:
            first_hop[u] = hop
        for v, w in graph[u].items():
            if d + w < dist.get(v, float("inf")):
                dist[v] = d + w
                heapq.heappush(queue, (d + w, v, hop or v))
    return dist, first_hop

links = {("A", "B"): 2, ("A", "C"): 5, ("B", "C"): 1, ("B", "D"): 4, ("C", "E"): 3, ("D", "E"): 1}
graph = {}
for (u, v), w in links.items():
    graph.setdefault(u, {})[v] = w
    graph.setdefault(v, {})[u] = w

dist, hop = dijkstra(graph, "A")
print("destination  cost  first hop")
for node in sorted(dist):
    if node != "A":
        print(f"{node:>11}  {dist[node]:4}  {hop[node]:>9}")
```
```output
destination  cost  first hop
          B     2          B
          C     3          B
          D     6          B
          E     6          B
```

Every destination is reached through B: even C, whose direct link costs 5, is cheaper via B (2 + 1 = 3).

## Comparison

| | Distance vector | Link state |
| --- | --- | --- |
| A router knows | Its neighbours' distance vectors | The whole topology |
| Sends | Its whole vector, to neighbours only | Its own links, flooded to everyone |
| Computes with | Bellman-Ford (distributed) | Dijkstra (locally) |
| Convergence | Slow; count-to-infinity possible | Fast |
| Memory and CPU | Low | Higher |
| Example protocol | **RIP** | **OSPF**, IS-IS |

## Routing on the Internet

The Internet is divided into **autonomous systems** (ASes), each run by one organisation (an ISP, a university).

- **Intra-domain routing** inside an AS (an **interior gateway protocol**) aims for the shortest paths:
  - **RIP**: distance vector, hop count as metric, infinity = 16, updates every 30 seconds, runs over UDP port 520.
  - **OSPF**: link state, configurable costs, divides a large AS into areas, runs directly over IP (protocol 89).
- **Inter-domain routing** between ASes uses **BGP** (Border Gateway Protocol), a **path vector** protocol: routes are advertised with the full list of ASes they pass through, which prevents loops, and routes are chosen by **policy** (business agreements), not only by length. BGP runs over TCP port 179.

## Practice questions

```quiz
q: Router X has three neighbours: A (link cost 2), B (link cost 5) and C (link cost 1). Their distance vectors give the costs 7, 3 and 9 to destination D. What is X's new cost to D under distance vector routing?
answer: 8
verify: min(2 + 7, 5 + 3, 1 + 9)
explain: X computes min(2 + 7, 5 + 3, 1 + 9) = min(9, 8, 10) = 8, with next hop B. The cheapest first link (to C) does not give the cheapest path.
```

```quiz
q: Link costs: P–Q 4, P–R 1, R–Q 2, Q–S 5, R–S 8, S–T 3, R–T 12. Using Dijkstra's algorithm from P, what is the cost of the shortest path from P to T?
answer: 11
verify:
  import heapq
  links = {("P", "Q"): 4, ("P", "R"): 1, ("R", "Q"): 2, ("Q", "S"): 5, ("R", "S"): 8, ("S", "T"): 3, ("R", "T"): 12}
  g = {}
  for (u, v), w in links.items():
      g.setdefault(u, {})[v] = w
      g.setdefault(v, {})[u] = w
  dist, pq = {"P": 0}, [(0, "P")]
  while pq:
      d, u = heapq.heappop(pq)
      if d > dist[u]: continue
      for v, w in g[u].items():
          if d + w < dist.get(v, 1e9):
              dist[v] = d + w
              heapq.heappush(pq, (d + w, v))
  print(dist["T"])
explain: P → R costs 1 and R → Q costs 2, so Q is at 3 (cheaper than the direct 4). S is at 3 + 5 = 8 (versus 1 + 8 = 9 directly from R), and T at 8 + 3 = 11 (versus 1 + 12 = 13 from R). The path is P–R–Q–S–T.
```

```quiz
q: What does **split horizon** do?
- Splits the network into areas so that link-state packets stay small
* Stops a router from advertising a route back to the neighbour it learned that route from
- Sends updates to half of the neighbours at a time
- Limits the hop count to 16
explain: Split horizon prevents the two-router bounce behind count-to-infinity: B learned its route to A from A's side, so it never tells A about it. (Areas belong to OSPF, and the limit of 16 is RIP's infinity.)
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* In link state routing, every router computes routes from a complete map of the network
* RIP is a distance vector protocol whose metric is the hop count
- BGP is a link state protocol used inside an autonomous system
* Flooding delivers a packet along the shortest path, among many others
explain: Link state routers flood their LSPs and run Dijkstra on the full map. RIP counts hops, up to 15. BGP is a path vector protocol used between autonomous systems. Flooding sends copies along every path, so one copy follows the shortest path.
```
