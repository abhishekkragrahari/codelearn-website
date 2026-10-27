---
title: Virtual Memory and Page Replacement
chapter: Memory Management
description: Demand paging, page faults, FIFO, LRU and Optimal replacement, Belady's anomaly and thrashing.
---
**Virtual memory** lets a process use more memory than physically exists. With **demand paging**, a page is loaded from disk only when it is first used. Each page-table entry has a **valid bit**: if a process touches a page that is not in memory, the hardware raises a **page fault**.

## Handling a page fault

```flowchart
caption: What the OS does on a page fault
start: Process touches a page that is not in memory
step: Trap to the OS (page fault)
if: Is there a free frame?
  yes:
    step: Use the free frame
  no:
    step: Choose a victim page; write it to disk if dirty
step: Read the page from disk into the frame
step: Update the page table, set the valid bit
end: Restart the instruction
```

Page faults are very expensive because disk access takes milliseconds, while memory access takes nanoseconds:

**EAT = (1 − p) × memory access time + p × page-fault service time**

With 200 ns memory access and an 8 ms (8,000,000 ns) fault service time, even p = 0.001 (one fault per 1000 accesses) gives EAT = 0.999 × 200 + 0.001 × 8,000,000 ≈ **8,200 ns**: about 40 times slower than memory.

## Page-replacement algorithms

When memory is full, the OS must choose a **victim** page to evict:

- **FIFO:** evict the page that has been in memory longest.
- **Optimal (OPT):** evict the page that will not be used for the longest time in the future. It gives the fewest faults possible, but needs the future, so it is used only as a benchmark.
- **LRU (least recently used):** evict the page unused for the longest time in the past, approximating OPT by assuming the recent past predicts the near future.

```python
def fifo(refs, frames):
    memory, queue, faults = set(), [], 0
    for page in refs:
        if page not in memory:
            faults += 1
            if len(memory) == frames:
                memory.remove(queue.pop(0))      # oldest page out
            memory.add(page)
            queue.append(page)
    return faults

def lru(refs, frames):
    memory, faults = [], 0                       # least recently used at the front
    for page in refs:
        if page in memory:
            memory.remove(page)
        else:
            faults += 1
            if len(memory) == frames:
                memory.pop(0)
        memory.append(page)
    return faults

def optimal(refs, frames):
    memory, faults = [], 0
    for i, page in enumerate(refs):
        if page in memory:
            continue
        faults += 1
        if len(memory) == frames:
            future = refs[i + 1:]
            victim = max(memory, key=lambda p: future.index(p) if p in future else len(refs))
            memory.remove(victim)
        memory.append(page)
    return faults

refs = [1, 3, 0, 3, 5, 6, 3, 1, 2, 0, 1, 2]
for algo in (fifo, lru, optimal):
    print(f"{algo.__name__:7} with 3 frames: {algo(refs, 3)} faults")

belady = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
print("FIFO 3 frames:", fifo(belady, 3), "faults; FIFO 4 frames:", fifo(belady, 4), "faults")
print("LRU  3 frames:", lru(belady, 3), "faults; LRU  4 frames:", lru(belady, 4), "faults")
```
```output
fifo    with 3 frames: 9 faults
lru     with 3 frames: 8 faults
optimal with 3 frames: 7 faults
FIFO 3 frames: 9 faults; FIFO 4 frames: 10 faults
LRU  3 frames: 10 faults; LRU  4 frames: 8 faults
```

## Belady's anomaly

Normally, more frames means fewer faults. But for FIFO the reference string above gives **more** faults with 4 frames than with 3: this is **Belady's anomaly**. LRU and OPT are **stack algorithms** (the pages in memory with n frames are always a subset of those with n + 1 frames), so they never suffer from it.

## Thrashing and the working set

If processes do not have enough frames for the pages they are actively using, they fault constantly, the CPU sits idle waiting for the disk, and the OS may even add more processes to "use the idle CPU", making it worse. This collapse is **thrashing**.

The **working set** of a process is the set of pages it referenced in the last Δ references. Giving each process enough frames for its working set, and suspending processes when the total demand exceeds memory, prevents thrashing.

## GATE-style practice questions

```quiz
q: The reference string 4, 7, 6, 1, 7, 6, 1, 2, 7, 2 is run with 3 initially empty frames. How many page faults occur with **LRU**?
answer: 6
verify:
  mem, faults = [], 0
  for p in [4, 7, 6, 1, 7, 6, 1, 2, 7, 2]:
      if p in mem:
          mem.remove(p)
      else:
          faults += 1
          if len(mem) == 3:
              mem.pop(0)
      mem.append(p)
  print(faults)
explain: Faults on 4, 7, 6 (filling the frames), on 1 (evicts 4), then 7, 6, 1 are hits. 2 faults and evicts 7 (least recently used), so 7 faults again (evicting 6), and the last 2 is a hit. Total: 4, 7, 6, 1, 2, 7 = 6 faults.
```

```quiz
q: For the same reference string 4, 7, 6, 1, 7, 6, 1, 2, 7, 2 and 3 frames, how many page faults does the **Optimal** algorithm cause?
answer: 5
verify:
  refs = [4, 7, 6, 1, 7, 6, 1, 2, 7, 2]
  mem, faults = [], 0
  for i, p in enumerate(refs):
      if p in mem:
          continue
      faults += 1
      if len(mem) == 3:
          fut = refs[i + 1:]
          mem.remove(max(mem, key=lambda q: fut.index(q) if q in fut else 99))
      mem.append(p)
  print(faults)
explain: 4, 7, 6 fault. 1 faults and evicts 4, which is never used again. 7, 6, 1 hit. 2 faults and evicts 6 or 1 (neither is used again), keeping 7. Then 7 and 2 hit. Total 5 faults.
```

```quiz
q: Memory access takes 100 ns and servicing a page fault takes 10 ms. What is the maximum page-fault rate p for which the effective access time stays at or below 200 ns? Give p × 10⁶ (that is, faults per million accesses, rounded down).
answer: 10
verify: int(100 / (10_000_000 - 100) * 10**6)
explain: EAT = (1 − p) × 100 + p × 10,000,000 ≤ 200 gives p × (10,000,000 − 100) ≤ 100, so p ≤ 100 / 9,999,900 ≈ 1.00001 × 10⁻⁵. That is about 10 faults per million accesses.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* FIFO page replacement can suffer from Belady's anomaly
* LRU never suffers from Belady's anomaly
- The optimal algorithm can be implemented exactly in a real OS
* Thrashing occurs when processes do not have enough frames for their working sets
explain: LRU and OPT are stack algorithms, which are immune to Belady's anomaly. OPT needs to know future references, so it cannot be implemented exactly; it is a benchmark.
```
