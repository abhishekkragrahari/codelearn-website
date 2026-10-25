---
title: Deadlocks
chapter: Synchronization
description: The four necessary conditions, resource-allocation graphs, prevention, avoidance with the Banker's algorithm, and detection.
---
A **deadlock** is a situation where a set of processes are each waiting for a resource held by another process in the set, so none of them can ever proceed.

## The four necessary conditions (Coffman conditions)

A deadlock can happen only if **all four** hold at the same time:

1. **Mutual exclusion:** a resource can be held by only one process at a time.
2. **Hold and wait:** a process holds some resources while waiting for others.
3. **No preemption:** a resource cannot be taken away from a process; it is released only voluntarily.
4. **Circular wait:** there is a cycle P₀ → P₁ → ... → P₀, where each process waits for a resource held by the next.

## Resource-allocation graphs

Draw processes and resources as nodes. An edge **P → R** means P is waiting for R (a request edge); **R → P** means R is held by P (an assignment edge).

```graph
caption: P1 holds R1 and wants R2; P2 holds R2 and wants R1: a cycle, so (with one instance of each resource) a deadlock
nodes: P1 R2 P2 R1
R1 -> P1
P1 -> R2
R2 -> P2
P2 -> R1
```

- If every resource has **one instance**, a cycle means a deadlock.
- If resources have **several instances**, a cycle means a deadlock is *possible*, not certain.

## Handling deadlocks

| Strategy | Idea |
| --- | --- |
| Prevention | make one of the four conditions impossible (for example, request all resources at once to break hold-and-wait, or number resources and always request them in increasing order to break circular wait) |
| Avoidance | before granting a request, check that the system stays in a **safe state** (Banker's algorithm) |
| Detection and recovery | let deadlocks happen, detect cycles, then kill processes or preempt resources |
| Ignore | assume deadlocks are rare (the "ostrich algorithm", used by most desktop OSes) |

## The Banker's algorithm

A state is **safe** if there is some order (a **safe sequence**) in which every process can get its maximum need, finish, and release everything. The Banker's algorithm grants a request only if the state after granting it is still safe.

For each process: **Need = Max − Allocation**. The safety check repeatedly finds a process whose Need ≤ Available, pretends it finishes (Available += its Allocation), and repeats.

```python
names = ["P0", "P1", "P2", "P3", "P4"]
allocation = [[1, 0, 1], [2, 1, 0], [0, 1, 1], [1, 0, 0], [0, 0, 2]]
maximum    = [[4, 2, 3], [3, 2, 1], [2, 3, 2], [2, 1, 2], [1, 1, 3]]
available  = [2, 1, 1]

need = [[m - a for m, a in zip(mx, al)] for mx, al in zip(maximum, allocation)]
print("Need:", {n: nd for n, nd in zip(names, need)})

work, finished, sequence = available[:], [False] * 5, []
progress = True
while progress:
    progress = False
    for i in range(5):                 # scan the processes in order, again and again
        if not finished[i] and all(nd <= w for nd, w in zip(need[i], work)):
            work = [w + a for w, a in zip(work, allocation[i])]
            finished[i] = True
            sequence.append(names[i])
            progress = True
print("safe" if all(finished) else "unsafe", "sequence:", " -> ".join(sequence))
print("available at the end:", work)
```
```output
Need: {'P0': [3, 2, 2], 'P1': [1, 1, 1], 'P2': [2, 2, 1], 'P3': [1, 1, 2], 'P4': [1, 1, 1]}
safe sequence: P1 -> P2 -> P3 -> P4 -> P0
available at the end: [6, 3, 5]
```

The program scans P0 to P4 in order, over and over, taking every process it can as it goes. Other scan orders can give a different safe sequence; several may exist, and any one of them proves that the state is safe.

## How many resources rule out deadlock?

If n processes each need at most k instances of a resource type, deadlock is impossible when there are at least **n(k − 1) + 1** instances: even if every process holds k − 1 and waits, one spare instance lets some process finish.

## GATE-style practice questions

```quiz
q: A system has 4 processes, each of which needs at most 3 instances of a resource type R. What is the **minimum** number of instances of R that guarantees the system can never deadlock?
answer: 9
verify: 4 * (3 - 1) + 1
explain: In the worst case every process holds k − 1 = 2 instances and waits for one more: 4 × 2 = 8 instances in use. One more instance (9 in total) lets some process finish and release its resources.
```

```quiz
q: Using the Banker's algorithm data in this lesson (Available = [2, 1, 1]), what is the **Need** of P0 for the third resource type?
answer: 2
verify: 3 - 1
explain: Need = Max − Allocation. For P0, Max = [4, 2, 3] and Allocation = [1, 0, 1], so Need = [3, 2, 2], and its third component is 2.
```

```quiz
q: Which technique prevents deadlock by making **circular wait** impossible?
- Allowing resources to be preempted
* Numbering all resource types and requiring processes to request them in increasing order
- Requiring each process to request all its resources at once
- Using spooling for printers
explain: With a global ordering, a process holding resource number i can only wait for resources numbered above i, so no cycle of waits can form. Requesting everything at once breaks hold-and-wait instead, and preemption breaks no-preemption.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* With single-instance resources, a cycle in the resource-allocation graph implies deadlock
* An unsafe state does not necessarily lead to a deadlock
- If the system is in a safe state, deadlock has already been avoided forever whatever requests come next
* The Banker's algorithm needs to know each process's maximum demand in advance
explain: An unsafe state only means deadlock may occur. A safe state can become unsafe if requests are granted carelessly; the Banker's algorithm checks every request to stay safe. It requires the maximum demands up front.
```
