---
title: Disk Structure and Disk Scheduling
chapter: Storage
description: Seek time, rotational latency, and the FCFS, SSTF, SCAN, C-SCAN, LOOK and C-LOOK algorithms.
---
A hard disk stores data on spinning platters. To read a block, the arm first moves the head to the right **track** (cylinder), then waits for the right **sector** to rotate under it, then transfers the data.

| Component | Meaning | Typical size |
| --- | --- | --- |
| Seek time | moving the head to the right cylinder | a few ms |
| Rotational latency | waiting for the sector; on average **half** a rotation | 4.17 ms at 7200 RPM |
| Transfer time | reading the bits | small for one block |

Access time = seek time + rotational latency + transfer time. At r revolutions per minute, one rotation takes 60 / r seconds, so the average rotational latency is **30 / r seconds**.

Since seeks dominate, the OS reorders pending requests to reduce **total head movement**. (SSDs have no moving parts, so these algorithms matter much less for them.)

## The algorithms

| Algorithm | Rule |
| --- | --- |
| FCFS | serve requests in arrival order |
| SSTF | serve the request closest to the current head position next; can starve far requests |
| SCAN (elevator) | move in one direction to the **end of the disk**, serving requests, then reverse |
| C-SCAN | move in one direction to the end, **jump back** to the start, and continue in the same direction (more uniform waiting times) |
| LOOK | like SCAN, but reverse at the **last request** instead of the disk end |
| C-LOOK | like C-SCAN, but only go as far as the last request, then jump to the lowest request |

## Example

Disk cylinders 0 to 199. The head is at **50** and moving towards larger numbers. Pending requests: 82, 170, 43, 140, 24, 16, 190.

```python
head, low, high = 50, 0, 199
requests = [82, 170, 43, 140, 24, 16, 190]

def movement(path):
    return sum(abs(a - b) for a, b in zip(path, path[1:]))

up = sorted(r for r in requests if r >= head)
down = sorted((r for r in requests if r < head), reverse=True)

sstf_path, pos, left = [head], head, requests[:]
while left:
    nxt = min(left, key=lambda r: (abs(r - pos), r))
    sstf_path.append(nxt)
    left.remove(nxt)
    pos = nxt

paths = {
    "FCFS":   [head] + requests,
    "SSTF":   sstf_path,
    "SCAN":   [head] + up + [high] + down,
    "C-SCAN": [head] + up + [high, low] + sorted(down),
    "LOOK":   [head] + up + down,
    "C-LOOK": [head] + up + sorted(down),
}
for name, path in paths.items():
    print(f"{name:6} total movement {movement(path):3}   order {path[1:]}")
```
```output
FCFS   total movement 642   order [82, 170, 43, 140, 24, 16, 190]
SSTF   total movement 208   order [43, 24, 16, 82, 140, 170, 190]
SCAN   total movement 332   order [82, 140, 170, 190, 199, 43, 24, 16]
C-SCAN total movement 391   order [82, 140, 170, 190, 199, 0, 16, 24, 43]
LOOK   total movement 314   order [82, 140, 170, 190, 43, 24, 16]
C-LOOK total movement 341   order [82, 140, 170, 190, 16, 24, 43]
```

> **Note:** For C-SCAN and C-LOOK, this program counts the return jump as head movement, as many textbooks and GATE answer keys do. Some sources leave the jump out; GATE questions say which convention they use.

SSTF looks best here, but it can starve requests at the far end if new nearby requests keep arriving. SCAN and LOOK bound the waiting time; C-SCAN and C-LOOK make it more uniform across cylinders.

## GATE-style practice questions

```quiz
q: A disk spins at 6000 RPM. What is its average rotational latency in **milliseconds**?
answer: 5
verify: 30 / 6000 * 1000
explain: One rotation takes 60 / 6000 s = 10 ms. On average the sector is half a rotation away, so the average latency is 5 ms.
```

```quiz
q: For the example in this lesson (head at 50, requests 82, 170, 43, 140, 24, 16, 190), what is the total head movement with **SSTF**?
answer: 208
verify:
  pos, left, total = 50, [82, 170, 43, 140, 24, 16, 190], 0
  while left:
      nxt = min(left, key=lambda r: (abs(r - pos), r))
      total += abs(nxt - pos); pos = nxt; left.remove(nxt)
  print(total)
explain: From 50 the closest request is 43 (7), then 24 (19), then 16 (8). Now the closest is 82 (66), then 140 (58), 170 (30) and 190 (20). Total = 7 + 19 + 8 + 66 + 58 + 30 + 20 = 208.
```

```quiz
q: With the head at 50 moving towards larger cylinder numbers and the same requests, what is the total head movement with **LOOK**?
answer: 314
verify: (190 - 50) + (190 - 16)
explain: LOOK goes up serving 82, 140, 170 and 190 (a movement of 190 − 50 = 140), then reverses at the last request and goes down to 16, serving 43, 24 and 16 (190 − 16 = 174). Total = 314.
```

```quiz
q: Which disk-scheduling algorithm can cause **starvation**?
* SSTF
- SCAN
- C-SCAN
- FCFS
explain: SSTF always picks the nearest request, so a request far from a busy region can wait indefinitely. SCAN and C-SCAN sweep the whole disk, so every request is reached within one or two sweeps; FCFS serves requests in order.
```
