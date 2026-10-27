---
title: Memory Management Basics
chapter: Memory Management
description: Logical vs physical addresses, contiguous allocation, first/best/worst fit, and fragmentation.
---
Every process believes it has memory starting at address 0. The OS and the hardware's **memory-management unit (MMU)** translate these **logical** (virtual) addresses into **physical** addresses in RAM, and keep processes from touching each other's memory.

## Binding addresses

| When | How |
| --- | --- |
| Compile time | absolute code; the program must always load at the same place |
| Load time | the loader adjusts addresses when the program is loaded |
| Execution time | the MMU translates on every access, so the process can move while running (what modern systems do) |

The simplest MMU uses a **relocation (base) register** and a **limit register**: physical = base + logical, and any logical address ≥ limit causes a trap.

## Contiguous allocation

If each process occupies one contiguous block, free memory becomes a collection of **holes**. When a process of size s arrives, the OS picks a hole:

- **First fit:** the first hole that is big enough. Fast.
- **Best fit:** the smallest hole that is big enough. Leaves the smallest leftover.
- **Worst fit:** the largest hole. Leaves the largest leftover.

```python
holes = [150, 350, 200, 500, 120]      # free blocks, in address order (KB)
requests = [210, 100, 380, 140]

def allocate(strategy):
    free = holes[:]
    placed = []
    for r in requests:
        fits = [i for i, size in enumerate(free) if size >= r]
        if not fits:
            placed.append(f"{r}->none")
            continue
        if strategy == "first":
            i = fits[0]
        elif strategy == "best":
            i = min(fits, key=lambda i: free[i])
        else:
            i = max(fits, key=lambda i: free[i])
        free[i] -= r
        placed.append(f"{r}->hole{i}")
    return placed, free

for strategy in ["first", "best", "worst"]:
    placed, free = allocate(strategy)
    print(f"{strategy:5}: {', '.join(placed)} | holes left {free}")
```
```output
first: 210->hole1, 100->hole0, 380->hole3, 140->hole1 | holes left [50, 0, 200, 120, 120]
best : 210->hole1, 100->hole4, 380->hole3, 140->hole1 | holes left [150, 0, 200, 120, 20]
worst: 210->hole3, 100->hole1, 380->none, 140->hole3 | holes left [150, 250, 200, 150, 120]
```

Here worst fit fails: after giving the 500 KB hole to the 210 KB request and the 350 KB hole to the 100 KB request, no hole is left that can take 380 KB. Simulations show that first fit and best fit usually use memory better than worst fit.

## Fragmentation

- **External fragmentation:** there is enough free memory in total, but it is split into holes that are each too small. **Compaction** (moving processes together) fixes it but is expensive. Paging avoids it entirely.
- **Internal fragmentation:** memory allocated to a process but not used by it, for example the unused part of a fixed-size partition or of the last page.

With paging, a process of size s and page size P wastes P − (s mod P) bytes in its last page (0 if it fits exactly): on average about half a page per process.

## Swapping

When memory is short, the OS can **swap** a whole process out to disk and bring it back later. Modern systems swap individual pages instead (see Virtual Memory).

## GATE-style practice questions

```quiz
q: Memory has free holes of 150, 350, 200, 500 and 120 KB, in that order. Requests of 210, 100, 380 and 140 KB arrive in that order. Under **best fit**, how many KB remain in the hole that was originally 120 KB after all requests are placed?
answer: 20
verify:
  free = [150, 350, 200, 500, 120]
  for r in [210, 100, 380, 140]:
      fits = [i for i, s in enumerate(free) if s >= r]
      i = min(fits, key=lambda i: free[i])
      free[i] -= r
  print(free[4])
explain: 210 goes to 350 (leaving 140), 100 goes to 120, the smallest hole that fits (leaving 20), 380 goes to 500 (leaving 120), and 140 goes into the exactly fitting 140 KB leftover. The original 120 KB hole has 20 KB left.
```

```quiz
q: A process of 7,000 bytes runs on a system with 2 KB (2048-byte) pages. How many bytes are lost to **internal fragmentation** in its last page?
answer: 1192
verify: (-7000) % 2048
explain: The process needs ⌈7000 / 2048⌉ = 4 pages = 8192 bytes. 8192 − 7000 = 1192 bytes of the last page are unused.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Paging eliminates external fragmentation
* Compaction can reduce external fragmentation
- Best fit never fails when first fit succeeds
* Internal fragmentation happens when allocated space is larger than what was requested
explain: Paging uses fixed-size frames, so any free frame can be used and external fragmentation disappears (internal fragmentation in the last page remains). Best fit is not always better: different allocation orders can make either strategy fail on a request the other can satisfy.
```
