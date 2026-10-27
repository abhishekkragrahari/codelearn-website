---
title: Paging, TLBs and Page Tables
chapter: Memory Management
description: Splitting addresses into page number and offset, effective access time with a TLB, page table sizes and multilevel paging.
---
**Paging** divides logical memory into fixed-size **pages** and physical memory into frames of the same size. Any page can go into any free frame, so a process no longer needs one contiguous block, and external fragmentation disappears.

## Address translation

With page size 2ᵈ bytes, a logical address splits into a **page number** (high bits) and an **offset** (the low d bits). The **page table** maps each page number to a frame number; the offset stays the same.

```pipeline
caption: Translating a logical address
Logical address | page p, offset d
Page table | look up frame f for page p
Physical address | f × page size + d
```

```python
PAGE_SIZE = 4096
page_table = {0: 5, 1: 9, 2: 2, 3: 7}          # page -> frame

for logical in [100, 4100, 13000]:
    page, offset = divmod(logical, PAGE_SIZE)
    frame = page_table[page]
    physical = frame * PAGE_SIZE + offset
    print(f"logical {logical:5} = page {page}, offset {offset:4} -> frame {frame} -> physical {physical}")
```
```output
logical   100 = page 0, offset  100 -> frame 5 -> physical 20580
logical  4100 = page 1, offset    4 -> frame 9 -> physical 36868
logical 13000 = page 3, offset  712 -> frame 7 -> physical 29384
```

## Page table size

A 32-bit logical address with 4 KB (2¹²) pages has 2³² / 2¹² = 2²⁰ pages. If each page-table entry is 4 bytes, one process's page table needs 2²⁰ × 4 bytes = **4 MB**. That is too big to keep for every process, which leads to multilevel and inverted page tables.

## The TLB

Each memory access now needs **two** memory accesses: one for the page table and one for the data. A **translation lookaside buffer (TLB)** is a small, fast cache of recent page → frame translations.

**Effective memory access time (EMAT)** with TLB access time t, memory access time m and hit ratio h:

EMAT = h × (t + m) + (1 − h) × (t + 2m)

Example: t = 20 ns, m = 100 ns, h = 0.8: EMAT = 0.8 × 120 + 0.2 × 220 = 96 + 44 = **140 ns**.

```python
def emat(tlb, mem, hit, levels=1):
    """Effective access time for a TLB plus a page table with the given number of levels."""
    return hit * (tlb + mem) + (1 - hit) * (tlb + (levels + 1) * mem)

print("1-level, 80% hits:", round(emat(20, 100, 0.80), 2), "ns")
print("1-level, 98% hits:", round(emat(20, 100, 0.98), 2), "ns")
print("2-level, 98% hits:", round(emat(20, 100, 0.98, levels=2), 2), "ns")
```
```output
1-level, 80% hits: 140.0 ns
1-level, 98% hits: 122.0 ns
2-level, 98% hits: 124.0 ns
```

## Multilevel paging

Instead of one huge table, **page the page table**. With 32-bit addresses, 4 KB pages and 4-byte entries, one page holds 4096 / 4 = 1024 = 2¹⁰ entries, so the 20-bit page number splits into a **10-bit outer index** and a **10-bit inner index**:

```pipeline
caption: A 32-bit address in two-level paging
outer index | 10 bits
inner index | 10 bits
offset | 12 bits
```

Only the inner page tables that are actually used need to exist, which saves a lot of memory for sparse address spaces. The cost: a TLB miss now needs one memory access per level, plus one for the data.

**Inverted page tables** keep one entry per physical **frame** (not per page), so their size depends only on the RAM size; looking up a page then needs a search, usually through a hash table.

## GATE-style practice questions

```quiz
q: A system has a TLB access time of 10 ns and a memory access time of 50 ns, with single-level paging. If the TLB hit ratio is 90%, what is the effective memory access time in ns?
answer: 65
verify: 0.9 * (10 + 50) + 0.1 * (10 + 50 + 50)
explain: Hit: 10 + 50 = 60 ns. Miss: 10 (TLB) + 50 (page table) + 50 (data) = 110 ns. EMAT = 0.9 × 60 + 0.1 × 110 = 54 + 11 = 65 ns.
```

```quiz
q: A machine has 36-bit virtual addresses, 8 KB pages and 4-byte page-table entries. With a single-level page table, how many **MB** does one process's page table occupy?
answer: 32
verify: 2 ** (36 - 13) * 4 // 2 ** 20
explain: 8 KB = 2¹³ bytes, so there are 2³⁶ / 2¹³ = 2²³ pages. 2²³ entries × 4 bytes = 2²⁵ bytes = 32 MB.
```

```quiz
q: With 4 KB pages, what is the **page number** of logical address 20,500?
answer: 5
verify: 20500 // 4096
explain: Page number = ⌊20500 / 4096⌋ = 5 (5 × 4096 = 20480), and the offset is 20500 − 20480 = 20.
```

```quiz
q: Which statements about paging are **true**? (Select all that apply.)
* The offset part of the address is not changed by translation
* A TLB miss in two-level paging costs two extra memory accesses before the data access
- Increasing the page size always reduces internal fragmentation
* An inverted page table has one entry per physical frame
explain: Translation replaces only the page number with a frame number. Two-level paging needs two page-table accesses on a TLB miss. Larger pages waste more space in the last page on average, so internal fragmentation grows, not shrinks.
```
