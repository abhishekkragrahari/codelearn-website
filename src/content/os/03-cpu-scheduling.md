---
title: CPU Scheduling
chapter: Process Management
description: FCFS, SJF, SRTF, priority and Round Robin scheduling, with Gantt charts and waiting-time calculations.
---
When several processes are ready, the **CPU scheduler** decides which one runs next. A scheduler is **non-preemptive** if a process keeps the CPU until it finishes or blocks, and **preemptive** if the OS can take the CPU away (for example when a timer expires or a shorter job arrives).

## The measures

For each process, given its **arrival time (AT)** and **burst time (BT, CPU time needed)**:

| Measure | Formula |
| --- | --- |
| Completion time (CT) | when the process finishes |
| Turnaround time (TAT) | CT − AT |
| Waiting time (WT) | TAT − BT (time spent ready but not running) |
| Response time | first time it runs − AT |

Goals: high CPU utilisation and throughput; low average turnaround, waiting and response times.

## The example used in this lesson

| Process | Arrival | Burst |
| --- | --- | --- |
| P1 | 0 | 5 |
| P2 | 1 | 3 |
| P3 | 2 | 8 |
| P4 | 3 | 6 |

## First Come First Served (FCFS)

Run processes in order of arrival. Simple, non-preemptive, but a long job at the front makes everyone wait (the **convoy effect**).

```pipeline
caption: FCFS Gantt chart (times on the notes)
P1 | 0 to 5
P2 | 5 to 8
P3 | 8 to 16
P4 | 16 to 22
```

## Shortest Job First (SJF) and Shortest Remaining Time First (SRTF)

**SJF** (non-preemptive) picks the ready process with the shortest burst. It gives the **minimum average waiting time** among non-preemptive schedulers, but needs burst times in advance and can **starve** long jobs.

**SRTF** is the preemptive version: whenever a process arrives, if its burst is shorter than the **remaining** time of the running process, it takes over. It gives the minimum average waiting time of all schedulers.

```pipeline
caption: SRTF Gantt chart: P2 arrives at 1 with burst 3 < P1's remaining 4, so it preempts P1
P1 | 0 to 1
P2 | 1 to 4
P1 | 4 to 8
P4 | 8 to 14
P3 | 14 to 22
```

## Round Robin (RR)

Each process runs for at most one **time quantum** q, then goes to the back of the ready queue. RR is fair and gives good response times; a very large q makes it behave like FCFS, and a very small q wastes time on context switches.

> **Note:** When a new process arrives at the same moment a quantum expires, this site (like most textbooks) puts the **new arrival in the queue first**, then the preempted process. GATE questions state their convention when it matters.

## A scheduling simulator

The program below computes the completion time of every process under each algorithm, then the average waiting and turnaround times.

```python
from collections import deque

procs = [("P1", 0, 5), ("P2", 1, 3), ("P3", 2, 8), ("P4", 3, 6)]   # (name, arrival, burst)

def fcfs(ps):
    t, done = 0, {}
    for name, at, bt in sorted(ps, key=lambda p: (p[1], p[0])):
        t = max(t, at) + bt
        done[name] = t
    return done

def sjf(ps):                                   # non-preemptive
    t, done, left = 0, {}, list(ps)
    while left:
        ready = [p for p in left if p[1] <= t]
        if not ready:
            t = min(p[1] for p in left)
            continue
        p = min(ready, key=lambda p: (p[2], p[1]))
        t += p[2]
        done[p[0]] = t
        left.remove(p)
    return done

def srtf(ps):                                  # preemptive, one time unit at a time
    rem = {n: bt for n, at, bt in ps}
    arr = {n: at for n, at, bt in ps}
    t, done = 0, {}
    while rem:
        ready = [n for n in rem if arr[n] <= t]
        if not ready:
            t += 1
            continue
        n = min(ready, key=lambda n: (rem[n], arr[n]))
        rem[n] -= 1
        t += 1
        if rem[n] == 0:
            done[n] = t
            del rem[n]
    return done

def round_robin(ps, q):
    ps = sorted(ps, key=lambda p: (p[1], p[0]))
    rem = {n: bt for n, at, bt in ps}
    t, i, queue, done = 0, 0, deque(), {}
    while len(done) < len(ps):
        while i < len(ps) and ps[i][1] <= t:   # admit arrivals
            queue.append(ps[i][0]); i += 1
        if not queue:
            t = ps[i][1]
            continue
        n = queue.popleft()
        run = min(q, rem[n])
        t += run
        rem[n] -= run
        while i < len(ps) and ps[i][1] <= t:   # arrivals go in before the preempted process
            queue.append(ps[i][0]); i += 1
        if rem[n] == 0:
            done[n] = t
        else:
            queue.append(n)
    return done

for name, algo in [("FCFS", fcfs), ("SJF", sjf), ("SRTF", srtf), ("RR q=2", lambda p: round_robin(p, 2))]:
    ct = algo(procs)
    wt = [ct[n] - at - bt for n, at, bt in procs]
    tat = [ct[n] - at for n, at, bt in procs]
    order = " ".join(sorted(ct, key=ct.get))
    print(f"{name:7} finish order: {order}  avg WT = {sum(wt) / 4:.2f}  avg TAT = {sum(tat) / 4:.2f}")
```
```output
FCFS    finish order: P1 P2 P3 P4  avg WT = 5.75  avg TAT = 11.25
SJF     finish order: P1 P2 P4 P3  avg WT = 5.25  avg TAT = 10.75
SRTF    finish order: P2 P1 P4 P3  avg WT = 5.00  avg TAT = 10.50
RR q=2  finish order: P2 P1 P4 P3  avg WT = 9.75  avg TAT = 15.25
```

Working FCFS by hand: P1 waits 0, P2 waits 5 − 1 = 4, P3 waits 8 − 2 = 6 and P4 waits 16 − 3 = 13, so the average is 23 / 4 = 5.75. SRTF gives the smallest average waiting time, as the theory promises.

## Priority scheduling

Each process has a priority and the highest-priority ready process runs (it can be preemptive or not). Low-priority processes can **starve**; the fix is **aging**: gradually raise the priority of processes that have waited a long time.

| Algorithm | Preemptive? | Starvation possible? | Notes |
| --- | --- | --- | --- |
| FCFS | no | no | convoy effect |
| SJF | no | yes | optimal average WT among non-preemptive |
| SRTF | yes | yes | optimal average WT overall |
| Priority | either | yes (fix with aging) | |
| Round Robin | yes | no | response time depends on q |

## GATE-style practice questions

```quiz
q: Four processes arrive at times 0, 1, 2 and 4 with burst times 4, 2, 6 and 3 respectively (P1 to P4). What is the **average waiting time** under **SRTF** (preemptive SJF)?
answer: 2.75
verify:
  procs = [("P1", 0, 4), ("P2", 1, 2), ("P3", 2, 6), ("P4", 4, 3)]
  rem = {n: b for n, a, b in procs}; arr = {n: a for n, a, b in procs}
  t, done = 0, {}
  while rem:
      ready = [n for n in rem if arr[n] <= t]
      if not ready:
          t += 1
          continue
      n = min(ready, key=lambda n: (rem[n], arr[n]))
      rem[n] -= 1; t += 1
      if rem[n] == 0:
          done[n] = t; del rem[n]
  print(sum(done[n] - a - b for n, a, b in procs) / 4)
explain: Timeline: P1 runs 0–1; P2 arrives with burst 2 < P1's remaining 3 and runs 1–3; P1 runs 3–6; P4 (3) beats P3 (6) and runs 6–9; P3 runs 9–15. Waiting times: P1 = 6 − 0 − 4 = 2, P2 = 0, P3 = 15 − 2 − 6 = 7, P4 = 9 − 4 − 3 = 2. Average = 11 / 4 = 2.75.
```

```quiz
q: For the same four processes (arrivals 0, 1, 2, 4; bursts 4, 2, 6, 3), what is the **average turnaround time** under **FCFS**?
answer: 7.5
verify: (lambda ct: sum(c - a for c, a in zip(ct, [0, 1, 2, 4])) / 4)([4, 6, 12, 15])
explain: FCFS runs P1 0–4, P2 4–6, P3 6–12, P4 12–15. Turnaround times are 4 − 0 = 4, 6 − 1 = 5, 12 − 2 = 10 and 15 − 4 = 11. Average = 30 / 4 = 7.5.
```

```quiz
q: Which scheduling algorithm can cause **starvation**? (Select all that apply.)
* Shortest Job First
* Non-preemptive priority scheduling without aging
- Round Robin
- First Come First Served
explain: SJF and priority scheduling can keep postponing a long or low-priority job forever if shorter or higher-priority jobs keep arriving. Round Robin and FCFS serve every process in turn, so every process eventually runs.
```

```quiz
q: In Round Robin scheduling, what happens as the time quantum becomes very large?
* It behaves like FCFS
- It behaves like SJF
- The average waiting time always becomes zero
- Context-switch overhead becomes very large
explain: If the quantum is larger than every burst, each process runs to completion in turn, exactly like FCFS. A very small quantum is the case where context-switch overhead dominates.
```
