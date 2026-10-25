---
title: Cache Replacement, Writes and Access Patterns
chapter: Memory
description: Replacement policies (LRU, FIFO, optimal), write-through and write-back with write-allocate options, the cost of writes, and how row-major versus column-major loops change the number of cache misses.
---
## Replacement policies

When a miss occurs in a full set, one block must be evicted. (A direct-mapped cache has no choice.)

| Policy | Evicts | Notes |
| --- | --- | --- |
| **LRU** (least recently used) | The block unused for the longest time | Good in practice; costly to track exactly for many ways |
| **FIFO** | The block loaded earliest | Simple; ignores reuse |
| **Random** | Any block | Cheap; surprisingly close to LRU for large caches |
| **Optimal** (Belady) | The block used farthest in the future | Not implementable; the benchmark for others |

No policy wins on every sequence. On the block sequence 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 with a 3-block fully associative cache, LRU gets 2 hits and FIFO 3:

```python
def hits(sequence, capacity, policy):
    cache, count = [], 0
    for b in sequence:
        if b in cache:
            count += 1
            if policy == "LRU":
                cache.remove(b)
                cache.append(b)
            continue
        if len(cache) == capacity:
            cache.pop(0)                      # LRU and FIFO both evict the front of the list
        cache.append(b)
    return count

seq = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
for policy in ("LRU", "FIFO"):
    print(policy, hits(seq, 3, policy), "hits")
```
```output
LRU 2 hits
FIFO 3 hits
```

## Write policies

When the CPU writes a word that is in the cache:

| Policy | On a write hit | Pros and cons |
| --- | --- | --- |
| **Write-through** | Update the cache **and** main memory | Memory always up to date; every write goes to memory (a **write buffer** hides the delay) |
| **Write-back** | Update only the cache and set the line's **dirty** bit; write the block to memory when it is evicted | Far fewer memory writes; evicting a dirty block costs a write-back |

When the CPU writes a word that is **not** in the cache:

- **Write-allocate** (fetch on write): bring the block into the cache, then write. Usually paired with write-back.
- **No-write-allocate** (write around): write directly to memory without loading the block. Usually paired with write-through.

Timing models vary from question to question, so set them up carefully. A common one: with write-through, every write costs a memory access, so for a fraction w of writes and hit ratio h for reads, the average time is (1 − w)[h·T<sub>c</sub> + (1 − h)(T<sub>c</sub> + T<sub>m</sub>)] + w·T<sub>m</sub>. With write-back, a miss may need to write a dirty block back first, so the miss penalty becomes T<sub>m</sub> × (1 + fraction of evicted blocks that are dirty).

## Access patterns: row-major versus column-major

C stores a 2-D array **row by row** (row-major): a[i][j] and a[i][j + 1] are adjacent in memory. Looping in the same order as the layout uses every byte of each block loaded; looping across it can miss on every access.

Take `int a[64][64]` (4-byte ints, 16 KB in all) starting at address 0, and a direct-mapped cache with 64-byte blocks (16 ints per block):

```python
def count_misses(addresses, cache_bytes, block_bytes):
    lines = cache_bytes // block_bytes
    tags, misses = [None] * lines, 0
    for a in addresses:
        block = a // block_bytes
        if tags[block % lines] != block:
            tags[block % lines] = block
            misses += 1
    return misses

N, size = 64, 4
row_major = [(i * N + j) * size for i in range(N) for j in range(N)]   # for i: for j: a[i][j]
col_major = [(i * N + j) * size for j in range(N) for i in range(N)]   # for j: for i: a[i][j]
for cache_kb in (4, 16):
    print(f"{cache_kb:2} KB cache: row-wise loop {count_misses(row_major, cache_kb * 1024, 64)} misses, "
          f"column-wise loop {count_misses(col_major, cache_kb * 1024, 64)} misses")
```
```output
 4 KB cache: row-wise loop 256 misses, column-wise loop 4096 misses
16 KB cache: row-wise loop 256 misses, column-wise loop 256 misses
```

- **Row-wise**: one miss per block, then 15 hits: 4096 / 16 = **256 misses**, whatever the cache size.
- **Column-wise** with a 4 KB cache: consecutive accesses are 256 bytes apart, so each touches a new block, and by the time the loop returns to a block (the next column), 64 other blocks have been loaded into the 64-line cache, and those that share its line have evicted it: **every access misses**, 4096 misses.
- **Column-wise** with a 16 KB cache: the whole array fits, so each block is loaded only once: 256 misses again.

This is why loop order matters so much for performance, and why GATE likes these questions: compute the stride, the number of blocks touched, and whether they survive until reuse.

## Practice questions

```quiz
q: A 3-block fully associative cache uses FIFO replacement. How many hits does the block sequence 2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2 produce?
answer: 3
verify:
  cache, hits = [], 0
  for b in [2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2]:
      if b in cache:
          hits += 1
          continue
      if len(cache) == 3:
          cache.pop(0)
      cache.append(b)
  print(hits)
explain: Misses: 2, 3, 1 (filling), 5 (evicts 2), 2 (evicts 3), 4 (evicts 1), 3 (evicts 5), 5 (evicts 2) and the last 2 (evicts 4). Hits: the 2 at position 3, the 5 at position 8 and the 2 at position 10. That is 3 hits and 9 misses, the same as FIFO page replacement on this string.
```

```quiz
q: The array int a[64][64] (4-byte ints, row-major, starting at address 0) is read column by column (for j: for i: a[i][j]) through a 4 KB direct-mapped cache with 64-byte blocks. How many misses occur?
answer: 4096
verify:
  lines, tags, misses = 4096 // 64, [None] * 64, 0
  for j in range(64):
      for i in range(64):
          b = (i * 64 + j) * 4 // 64
          if tags[b % lines] != b:
              tags[b % lines] = b
              misses += 1
  print(misses)
explain: Each column access moves 256 bytes, so every access is to a new block. A row of the array spans 4 blocks, so rows 0, 16, 32 and 48 map to the same set of lines; before the loop comes back to a block in the next column, it has been evicted. Every one of the 4096 accesses misses.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* With write-back, a block is written to memory only when it is evicted and dirty
* Write-allocate brings the block into the cache on a write miss
- Write-through caches need a dirty bit per line
* The optimal (Belady) replacement policy cannot be implemented in real hardware
explain: Write-back defers memory writes until eviction, and only for modified (dirty) blocks. Write-allocate fetches the block on a write miss. Write-through keeps memory current, so it needs no dirty bit. Optimal replacement needs knowledge of future accesses.
```
