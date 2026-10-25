---
title: OS GATE Practice Set
chapter: GATE Practice
description: Mixed GATE-style questions on processes, scheduling, synchronization, deadlocks, memory, file systems and disks.
---
These questions mix every lesson in the Operating Systems track, in the GATE formats (MCQ, MSQ, NAT). Work each one on paper first, writing out Gantt charts, frame contents or head movements, before checking. Every numerical answer on this page is recomputed by a program when the site is built.

## Processes and scheduling

```quiz
q: **[fork]** How many processes in total (including the original) exist after this code runs, assuming no fork fails?

`fork(); if (fork() == 0) fork();`
answer: 6
verify:
  count = 1
  count *= 2          # fork(): every process becomes two
  count *= 3          # each process forks; its child (which sees 0) forks once more
  print(count)
explain: After the first fork there are 2 processes. Each of them executes the second fork and becomes a parent and a child; only the child (for which fork returned 0) forks again. So each of the 2 processes turns into 3, giving 6 processes.
```

```quiz
q: **[Round Robin]** Processes P1, P2 and P3 all arrive at time 0, in that order, with bursts 5, 3 and 1. With Round Robin and quantum 2 (ignoring context-switch time), what is the **completion time of P1**?
answer: 9
verify:
  from collections import deque
  q, rem, t, done = deque(["P1", "P2", "P3"]), {"P1": 5, "P2": 3, "P3": 1}, 0, {}
  while q:
      n = q.popleft(); run = min(2, rem[n]); t += run; rem[n] -= run
      if rem[n]: q.append(n)
      else: done[n] = t
  print(done["P1"])
explain: P1 runs 0–2, P2 2–4, P3 4–5 (done), P1 5–7, P2 7–8 (done), P1 8–9 (done). P1 completes at time 9.
```

```quiz
q: **[SJF]** Five jobs arrive at time 0 with bursts 6, 2, 8, 3 and 4. What is the **average waiting time** under non-preemptive SJF?
answer: 6.2
verify:
  t, waits = 0, []
  for b in sorted([6, 2, 8, 3, 4]):
      waits.append(t); t += b
  print(sum(waits) / len(waits))
explain: SJF runs the jobs in order of burst: 2, 3, 4, 6, 8. Each waits for all the shorter jobs: 0, 2, 2 + 3 = 5, 5 + 4 = 9 and 9 + 6 = 15. The total is 31, so the average is 31 / 5 = 6.2.
```

## Synchronization and deadlocks

```quiz
q: **[Semaphores]** Binary semaphores S and T both start at 1. Process A runs `wait(S); wait(T); ... signal(T); signal(S);` and process B runs `wait(T); wait(S); ... signal(S); signal(T);`. What can happen?
- Nothing bad; this is a correct solution
* Deadlock
- Starvation of B, but never deadlock
- A and B can both be inside their critical sections at once
explain: If A takes S and B takes T before either takes its second semaphore, A waits for T (held by B) and B waits for S (held by A): a circular wait, so a deadlock. Acquiring S and T in the same order in both processes removes it.
```

```quiz
q: **[Semaphores]** A counting semaphore starts at 3. Eight wait (P) and four signal (V) operations are then performed. Assuming a blocked process counts as one negative unit of the semaphore value, how many processes are blocked at the end?
answer: 1
verify: max(0, -(3 - 8 + 4))
explain: The final value is 3 − 8 + 4 = −1, whatever the order of operations. A value of −1 means one process is waiting on the semaphore.
```

```quiz
q: **[Deadlock]** Three processes share 5 identical tape drives, and each process may need up to 3 drives. Which statement is **true**?
- Deadlock is impossible, because 5 drives are more than any single process needs
* Deadlock is possible
- Deadlock is possible only if the processes request all drives at once
- Deadlock is impossible if requests are granted in arrival order
explain: The processes could hold 2, 2 and 1 drives: all 5 are allocated, no drive is free, and every process still needs more, so all three wait forever. Deadlock is ruled out only with at least n(k − 1) + 1 = 3 × 2 + 1 = 7 drives.
```

```quiz
q: **[Deadlock]** Which conditions must **all** hold for a deadlock to occur? (Select all that apply.)
* Mutual exclusion
* Hold and wait
* Circular wait
- Preemption of resources
explain: The four necessary conditions are mutual exclusion, hold and wait, **no** preemption and circular wait. Allowing preemption breaks one of the conditions.
```

## Memory

```quiz
q: **[Paging]** Pages are 1 KB (1024 bytes) and the page table maps page 0 → frame 3, page 1 → frame 7, page 2 → frame 1. What physical address does logical address 2100 map to?
answer: 1076
verify: {0: 3, 1: 7, 2: 1}[2100 // 1024] * 1024 + 2100 % 1024
explain: 2100 = 2 × 1024 + 52, so it is page 2, offset 52. Page 2 is in frame 1, so the physical address is 1 × 1024 + 52 = 1076.
```

```quiz
q: **[TLB]** A system uses two-level paging. A TLB lookup takes 5 ns and a memory access 100 ns, and the TLB hit ratio is 95%. What is the effective memory access time in ns?
answer: 115
verify: 0.95 * (5 + 100) + 0.05 * (5 + 3 * 100)
explain: Hit: 5 + 100 = 105 ns. Miss: 5 + 100 (outer table) + 100 (inner table) + 100 (data) = 305 ns. EMAT = 0.95 × 105 + 0.05 × 305 = 99.75 + 15.25 = 115 ns.
```

```quiz
q: **[Page replacement]** The reference string 2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2 runs with 3 initially empty frames. How many page faults does **FIFO** cause?
answer: 9
verify:
  mem, faults = [], 0
  for p in [2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2]:
      if p not in mem:
          faults += 1
          if len(mem) == 3:
              mem.pop(0)
          mem.append(p)
  print(faults)
explain: Faults happen on 2, 3, 1 (filling), 5 (evicts 2), 2 (evicts 3), 4 (evicts 1), 3 (evicts 5), 5 (evicts 2) and 2 (evicts 4). The other references (the second 2, then 5 and 2 in the middle) are hits. Total: 9.
```

```quiz
q: **[Page replacement]** For the same string and 3 frames, how many page faults does **LRU** cause?
answer: 7
verify:
  mem, faults = [], 0
  for p in [2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2]:
      if p in mem:
          mem.remove(p)
      else:
          faults += 1
          if len(mem) == 3:
              mem.pop(0)
      mem.append(p)
  print(faults)
explain: Faults on 2, 3, 1, then 5 (evicts 3, least recently used), 4 (evicts 1), 3 (evicts 2) and 2 (evicts 4). The other five references are hits, so there are 7 faults, fewer than FIFO's 9.
```

## Storage

```quiz
q: **[Inodes]** Blocks are 2 KB and block pointers are 4 bytes. An inode has 8 direct pointers, one single-indirect and one double-indirect pointer. What is the maximum file size in **KB**?
answer: 525328
verify: (8 + 512 + 512 ** 2) * 2
explain: One block holds 2048 / 4 = 512 pointers, so the file can have 8 + 512 + 512² = 262,664 blocks of 2 KB each: 525,328 KB.
```

```quiz
q: **[Disk scheduling]** Cylinders are numbered 0 to 199. The head is at 60 moving towards higher numbers, and the requests are 25, 120, 75, 10, 180, 95, 40. What is the total head movement with **SCAN** (the head goes to the end of the disk before reversing)?
answer: 328
verify: (199 - 60) + (199 - 10)
explain: The head moves up from 60, serving 75, 95, 120 and 180, continues to the end at 199 (139 cylinders in total), then reverses down to 10, serving 40, 25 and 10 (189 cylinders). Total = 328.
```

```quiz
q: **[Disk]** What is the average rotational latency, in ms, of a disk spinning at 7500 RPM?
answer: 4
verify: 30 / 7500 * 1000
explain: One rotation takes 60 / 7500 s = 8 ms, and on average the sector is half a rotation away: 4 ms.
```
