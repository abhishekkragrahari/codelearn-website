---
title: Memory Hierarchy and Cache Mapping
chapter: Memory
description: Locality and the memory hierarchy, hit ratio and average memory access time, direct-mapped, fully associative and set-associative caches, splitting an address into tag, index and offset, and tag memory size.
---
A processor can execute an instruction in well under a nanosecond, but main memory takes tens of nanoseconds to answer. The **memory hierarchy** hides that gap by keeping recently used data in small, fast memories close to the CPU.

## The hierarchy and locality

| Level | Typical size | Typical access time |
| --- | --- | --- |
| Registers | Hundreds of bytes | < 1 ns |
| L1 cache | 32–64 KB | ~1 ns |
| L2 / L3 cache | MBs | 3–20 ns |
| Main memory (DRAM) | GBs | 50–100 ns |
| SSD / disk | TBs | µs to ms |

Caches work because programs show **locality of reference**:

- **Temporal locality**: data used now is likely to be used again soon (loop variables, the loop's own instructions).
- **Spatial locality**: data near recently used data is likely to be used soon (array elements, sequential instructions). That is why caches move whole **blocks** (lines), not single bytes.

## Hit ratio and access time

The **hit ratio** h is the fraction of accesses found in the cache; the **miss ratio** is 1 − h.

- **Average memory access time (AMAT)** = hit time + miss rate × miss penalty.
- **Hierarchical access** (look in the cache first, then go to memory on a miss): T = h·T<sub>c</sub> + (1 − h)(T<sub>c</sub> + T<sub>m</sub>) = T<sub>c</sub> + (1 − h)T<sub>m</sub>.
- **Simultaneous access** (start both at once, use whichever answers): T = h·T<sub>c</sub> + (1 − h)T<sub>m</sub>.
- **Two levels**: AMAT = T<sub>L1</sub> + m<sub>L1</sub> × (T<sub>L2</sub> + m<sub>L2</sub> × T<sub>mem</sub>), where m<sub>L2</sub> is the **local** miss rate of L2 (misses in L2 / accesses to L2).

Read each question carefully to see which model it intends: with T<sub>c</sub> = 10 ns, T<sub>m</sub> = 100 ns and h = 0.9, hierarchical access gives 20 ns and simultaneous access 19 ns.

## Mapping: where can a block go?

Memory is divided into blocks of the same size as the cache lines. Block number = address / block size.

| Mapping | A memory block can go into | Lookup |
| --- | --- | --- |
| **Direct-mapped** | Exactly one line: (block number) mod (number of lines) | Check one tag; cheap and fast, but blocks that share a line evict each other (**conflict misses**) |
| **Fully associative** | Any line | Compare the tag with every line in parallel; expensive |
| **k-way set-associative** | Any of the k lines of set (block number) mod (number of sets) | Compare k tags; the usual compromise |

Direct-mapped is 1-way set-associative, and fully associative is a single set containing all the lines.

## Splitting the address

A memory address is divided into three fields:

```pipeline
caption: Fields of a memory address as the cache sees it
Tag | identifies the block within its set
Index (set) | log₂(number of sets) bits
Offset | log₂(block size) bits
```

- Offset bits = log₂(block size in bytes)
- Number of lines = cache size / block size; number of sets = lines / associativity
- Index bits = log₂(number of sets) (zero for fully associative)
- **Tag bits = address bits − index bits − offset bits**

```python
from math import log2

def fields(address_bits, cache_bytes, block_bytes, ways):
    lines = cache_bytes // block_bytes
    sets = lines // ways
    offset, index = int(log2(block_bytes)), int(log2(sets))
    return address_bits - index - offset, index, offset

for ways, name in [(1, "direct-mapped"), (4, "4-way"), (1024, "fully associative")]:
    tag, index, offset = fields(32, 64 * 1024, 64, ways)
    print(f"64 KB, 64-byte blocks, {name:17}: tag {tag:2}, index {index:2}, offset {offset}")
```
```output
64 KB, 64-byte blocks, direct-mapped    : tag 16, index 10, offset 6
64 KB, 64-byte blocks, 4-way            : tag 18, index  8, offset 6
64 KB, 64-byte blocks, fully associative: tag 26, index  0, offset 6
```

Doubling the associativity halves the number of sets, so the index loses one bit and the tag gains one.

**Tag memory**: each line stores its tag plus status bits (a **valid** bit, and a **dirty** bit for write-back caches). Tag memory size = number of lines × (tag bits + status bits). For a 16 KB direct-mapped cache with 64-byte lines and 32-bit addresses: 256 lines, a tag of 32 − 8 − 6 = 18 bits; with valid and dirty bits, 256 × 20 = 5120 bits.

## Mapping in action

The program below runs the same sequence of block numbers through an 8-line cache organised three ways, with LRU replacement inside each set:

```python
def simulate(blocks, lines, ways):
    sets = [[] for _ in range(lines // ways)]
    hits, log = 0, ""
    for b in blocks:
        s = sets[b % len(sets)]
        if b in s:
            hits += 1
            s.remove(b)                    # move to most-recently-used position
            log += "H"
        else:
            if len(s) == ways:
                s.pop(0)                   # evict the least recently used block
            log += "M"
        s.append(b)
    return hits, log

blocks = [0, 8, 0, 6, 8, 0, 16, 0, 8, 6]
for ways, name in [(1, "direct-mapped"), (2, "2-way"), (8, "fully associative")]:
    hits, log = simulate(blocks, 8, ways)
    print(f"{name:17} {log}  hits = {hits}")
```
```output
direct-mapped     MMMMMMMMMH  hits = 1
2-way             MMHMHHMHMH  hits = 5
fully associative MMHMHHMHHH  hits = 6
```

Blocks 0, 8 and 16 all map to line 0 of the direct-mapped cache and keep evicting each other, while the associative organisations can hold them together.

## Kinds of misses (the three Cs)

- **Compulsory** (cold) misses: the first access to a block. Even an infinite cache has them.
- **Capacity** misses: the program's working set does not fit in the cache.
- **Conflict** misses: blocks compete for the same set although other sets have room. Higher associativity removes them.

## Practice questions

```quiz
q: A 4-way set-associative cache of 256 KB has 32-byte blocks, and addresses are 32 bits. How many bits is the tag?
answer: 16
verify:
  from math import log2
  lines = 256 * 1024 // 32
  sets = lines // 4
  print(32 - int(log2(sets)) - int(log2(32)))
explain: There are 8192 lines in 2048 sets, so the index is 11 bits and the offset 5 bits. Tag = 32 − 11 − 5 = 16 bits.
```

```quiz
q: The L1 cache has a 1 ns hit time and a 10% miss rate. The L2 cache has a 10 ns hit time and a 20% local miss rate, and main memory takes 100 ns. What is the average memory access time in ns?
answer: 4
verify: round(1 + 0.1 * (10 + 0.2 * 100), 6)
explain: AMAT = 1 + 0.1 × (10 + 0.2 × 100) = 1 + 0.1 × 30 = 4 ns.
```

```quiz
q: A fully associative cache with 4 lines and LRU replacement receives the block sequence 1, 5, 9, 1, 5, 13, 1, 9, 5, 1. How many hits occur?
answer: 6
verify:
  cache, hits = [], 0
  for b in [1, 5, 9, 1, 5, 13, 1, 9, 5, 1]:
      if b in cache:
          hits += 1
          cache.remove(b)
      elif len(cache) == 4:
          cache.pop(0)
      cache.append(b)
  print(hits)
explain: Only 4 distinct blocks appear (1, 5, 9, 13), so after the 4 compulsory misses everything stays in the cache: 10 − 4 = 6 hits. A direct-mapped 4-line cache would get no hits at all, because all four blocks map to line 1.
```

```quiz
q: With a cache access time of 10 ns, a memory access time of 100 ns and a hit ratio of 0.9, what is the average access time under **hierarchical** access (memory is accessed only after a miss)?
answer: 20
verify: round(0.9 * 10 + 0.1 * (10 + 100), 6)
explain: T = 0.9 × 10 + 0.1 × (10 + 100) = 9 + 11 = 20 ns. (With simultaneous access it would be 0.9 × 10 + 0.1 × 100 = 19 ns.)
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Increasing associativity can remove conflict misses
* Larger blocks exploit spatial locality
- Compulsory misses disappear in a large enough cache
* In a direct-mapped cache, each memory block can be placed in only one line
explain: More ways let competing blocks share a set. Larger blocks bring neighbouring data along. The first access to a block always misses, whatever the cache size. Direct mapping fixes the line as block mod lines.
```
