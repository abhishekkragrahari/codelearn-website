---
title: File Systems
chapter: Storage
description: Files and directories, contiguous, linked and indexed allocation, inodes and maximum file size, free-space management.
---
A **file system** organises data on a disk into **files** (named sequences of bytes) and **directories** (which map names to files). The disk itself only offers numbered **blocks**; the file system decides which blocks belong to which file.

## Directory structures

| Structure | Idea | Problem it solves |
| --- | --- | --- |
| Single-level | one directory for everyone | simple, but names clash |
| Two-level | one directory per user | separates users |
| Tree | directories inside directories, paths like `/home/asha/notes.txt` | natural grouping |
| Acyclic graph | allows shared files and directories (links) | sharing without copying |

## Allocation methods

| Method | How blocks are found | Random access | Problems |
| --- | --- | --- | --- |
| Contiguous | start block + length | fast, O(1) | external fragmentation; hard to grow a file |
| Linked | each block points to the next | slow, O(n) | a broken pointer loses the rest; pointer space in every block |
| Linked with FAT | the "next" pointers are kept in a File Allocation Table | faster (the FAT can be cached) | the FAT itself takes memory |
| Indexed | an index block lists all the file's blocks | fast | index block overhead; big files need several levels |

## Inodes (Unix)

Unix keeps each file's metadata (size, owner, permissions, times) and block pointers in an **inode**. A typical inode has some **direct** pointers to data blocks plus one **single indirect** (points to a block full of pointers), one **double indirect** and one **triple indirect** pointer.

```tree
caption: Block pointers in an inode
Inode
  Direct pointers | point straight to data blocks
  Single indirect | → block of pointers → data
  Double indirect | → pointers → pointers → data
  Triple indirect | three levels of pointer blocks
```

If a block holds B bytes and a pointer takes P bytes, one pointer block holds k = B / P pointers. The maximum file size is:

**(direct + k + k² + k³) × B**

```python
def max_file_size(block, pointer, direct, single=1, double=1, triple=1):
    k = block // pointer                       # pointers per block
    blocks = direct + single * k + double * k ** 2 + triple * k ** 3
    return blocks * block

size = max_file_size(block=4096, pointer=4, direct=12)
print("pointers per block:", 4096 // 4)
print("max file size:", size, "bytes")
print(f"about {size / 2**40:.2f} TB")

small = max_file_size(block=1024, pointer=4, direct=10, triple=0)
print("1 KB blocks, 10 direct, single + double indirect:", small // 1024, "KB")
```
```output
pointers per block: 1024
max file size: 4402345721856 bytes
about 4.00 TB
1 KB blocks, 10 direct, single + double indirect: 65802 KB
```

## Free-space management

- **Bit vector (bitmap):** one bit per block (1 = free). Compact and fast to find runs of free blocks. A disk of N blocks needs N bits.
- **Linked list:** free blocks point to each other; no extra space, but slow to traverse.
- **Grouping / counting:** store addresses of several free blocks, or (start, count) runs.

## GATE-style practice questions

```quiz
q: A file system uses 1 KB blocks and 4-byte block addresses. Each inode has 10 direct pointers, 1 single-indirect and 1 double-indirect pointer (no triple indirect). What is the maximum file size in **KB**?
answer: 65802
verify: (10 + 256 + 256 ** 2) * 1
explain: One block holds 1024 / 4 = 256 pointers. The file can have 10 + 256 + 256² = 10 + 256 + 65,536 = 65,802 blocks of 1 KB each, which is 65,802 KB.
```

```quiz
q: A disk of 64 GB uses 4 KB blocks, and free space is tracked with a bit vector. How many **KB** does the bit vector occupy?
answer: 2048
verify: (64 * 2**30 // 4096) // 8 // 1024
explain: The disk has 64 GB / 4 KB = 2³⁶ / 2¹² = 2²⁴ blocks, so the bitmap needs 2²⁴ bits = 2²¹ bytes = 2048 KB (2 MB).
```

```quiz
q: Which allocation method supports **fast random access** and suffers from **no external fragmentation**?
- Contiguous allocation
- Linked allocation
* Indexed allocation
- None of these
explain: Contiguous allocation has fast random access but external fragmentation. Linked allocation has no external fragmentation but slow random access. Indexed allocation looks up any block directly in the index block and can use any free block.
```
