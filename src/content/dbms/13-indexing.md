---
title: File Organization and Indexing
chapter: Storage and Indexing
description: Blocking factor and block accesses, primary, clustering and secondary indexes, dense and sparse indexes, multilevel indexes, B-trees and B+ trees, and hashing.
---
Tables live on disk in **blocks** (pages), and reading a block is far slower than any computation in memory. So the cost of a query is measured in **block accesses**, and indexes exist to reduce them.

## Records and blocks

- **Blocking factor** (bfr): the number of records that fit in one block, ⌊block size / record size⌋ for fixed-length records that do not span blocks (**unspanned** organisation).
- Number of blocks for r records: ⌈r / bfr⌉.

| File organisation | Search for a key | Insert |
| --- | --- | --- |
| **Heap** (unordered) | Linear: b/2 blocks on average, b in the worst case | Fast: append at the end |
| **Sorted** on the search key | Binary search: ⌈log₂ b⌉ blocks | Slow: keep the order |
| **Hashed** on the key | About 1 block | Fast, but no range queries |

Example: 30,000 records of 100 bytes, blocks of 1024 bytes. bfr = ⌊1024 / 100⌋ = 10, so the file has 3000 blocks. Binary search on the sorted file needs ⌈log₂ 3000⌉ = 12 block accesses.

## Single-level indexes

An **index** is a small sorted file of (key, block pointer) entries. Because entries are much smaller than records, many fit in one block, so binary search on the index is cheap; one more access reads the data block.

| Index | Built on | Dense or sparse | Entries |
| --- | --- | --- | --- |
| **Primary** | The ordering key field of a sorted file | Sparse | One per data **block** (its first key, the *anchor*) |
| **Clustering** | An ordering **non-key** field | Sparse | One per **distinct value** |
| **Secondary** | Any non-ordering field (key or not) | Dense | One per **record** (for a key field) |

- A **dense** index has an entry for every search-key value (every record); a **sparse** index has entries for only some values, which works only when the file is sorted on that field.
- A file can have **at most one** primary or clustering index (it can be physically sorted in only one way) but many secondary indexes.

Continuing the example, with index entries of a 9-byte key plus a 6-byte block pointer = 15 bytes:

- Index blocking factor = ⌊1024 / 15⌋ = 68 entries per block (the **fan-out**).
- Primary index: 3000 entries (one per data block), in ⌈3000 / 68⌉ = 45 blocks. Search: ⌈log₂ 45⌉ + 1 = **7** accesses, instead of 12.
- Secondary index on a key field: 30,000 entries, in ⌈30000 / 68⌉ = 442 blocks. Search: ⌈log₂ 442⌉ + 1 = **10** accesses, instead of 3000 / 2 = 1500 for a linear search of the unsorted field.

```python
from math import ceil, log2

records, record_size, block = 30000, 100, 1024
entry = 9 + 6                      # key + block pointer

bfr = block // record_size
data_blocks = ceil(records / bfr)
fan_out = block // entry
print("bfr =", bfr, "| data blocks =", data_blocks, "| binary search =", ceil(log2(data_blocks)))

primary = ceil(data_blocks / fan_out)
print("primary index blocks =", primary, "| accesses =", ceil(log2(primary)) + 1)

secondary = ceil(records / fan_out)
print("secondary index blocks =", secondary, "| accesses =", ceil(log2(secondary)) + 1)

levels, blocks = 0, data_blocks
while blocks > 1:                  # multilevel: index the index until one block remains
    blocks = ceil(blocks / fan_out)
    levels += 1
print("multilevel primary index levels =", levels, "| accesses =", levels + 1)
```
```output
bfr = 10 | data blocks = 3000 | binary search = 12
primary index blocks = 45 | accesses = 7
secondary index blocks = 442 | accesses = 10
multilevel primary index levels = 2 | accesses = 3
```

## Multilevel indexes

An index is itself a sorted file, so it can be indexed too. Repeating until the top level fits in one block gives a **multilevel index** with about ⌈log<sub>fo</sub> b⌉ levels, where fo is the fan-out. A search reads one block per level plus the data block. Here the 45-block primary index needs one more level of 1 block: 2 levels, 3 accesses.

## B-trees and B+ trees

A static multilevel index is hard to update. **B-trees** and **B+ trees** are balanced multilevel indexes that stay balanced under inserts and deletes by splitting and merging nodes. A node is one disk block.

In a B+ tree of **order p** (an internal node has at most p child pointers):

- Every internal node except the root has between ⌈p/2⌉ and p children; the root has at least 2 (unless it is a leaf).
- An internal node with k children holds k − 1 keys, used only for navigation.
- **All data pointers are in the leaves**, and the leaves are linked left to right, which makes **range queries** fast.
- All leaves are at the same depth.

```tree
caption: A small B+ tree: internal keys guide the search, all keys appear in the leaves, and the leaves are chained
30 · 60
  10 · 20 | leaf → 30 · 45
  30 · 45 | leaf → 60 · 75 · 90
  60 · 75 · 90 | leaf
```

| | B-tree | B+ tree |
| --- | --- | --- |
| Data (record) pointers | In every node | Only in the leaves |
| Keys repeated? | Each key appears once | Internal keys are copies of leaf keys |
| Fan-out of internal nodes | Lower (nodes also hold record pointers) | Higher, so the tree is shorter |
| Range query | In-order traversal of the tree | Scan along the linked leaves |

### Computing the order

With block size B, key size K, block (tree) pointer size P and record pointer size Pᵣ:

- **B+ tree internal node**: p·P + (p − 1)·K ≤ B.
- **B+ tree leaf**: n·(K + Pᵣ) + P ≤ B (n key–record-pointer pairs plus one pointer to the next leaf).
- **B-tree node**: p·P + (p − 1)·(K + Pᵣ) ≤ B.

Example: B = 512, K = 10, P = 8, Pᵣ = 9.

- B+ internal: 8p + 10(p − 1) ≤ 512, so 18p ≤ 522 and p = **29**.
- B+ leaf: 19n + 8 ≤ 512, so n = ⌊504 / 19⌋ = **26**.
- B-tree: 8p + 19(p − 1) ≤ 512, so 27p ≤ 531 and p = **19**.

The B+ tree has the larger fan-out, which is why databases use it.

### Height and capacity

With internal fan-out p and at most n keys per leaf, a B+ tree whose root is at level 1 and leaves at level h holds at most p<sup>h−1</sup> leaves, so at most p<sup>h−1</sup> · n keys. With p = 100 and n = 99, three levels hold up to 100² · 99 = 990,000 keys, and any of them is found in 3 block accesses (plus 1 for the record).

## Hashing

A hash function maps a key to a **bucket** (one or more blocks). An equality search costs about one access, but range queries cannot use a hash index.

- **Static hashing**: a fixed number of buckets; overflow chains grow as the file grows.
- **Extendible hashing**: a directory of 2<sup>d</sup> pointers, where d is the **global depth**, indexed by d bits of the hash. A full bucket splits; if its local depth equals the global depth, the directory doubles.
- **Linear hashing**: buckets split one at a time in a fixed order, with no directory.

## Practice questions

```quiz
q: A file has 1,000,000 records of 200 bytes each, stored unspanned in 4096-byte blocks and sorted on the key. How many block accesses does a binary search need in the worst case?
answer: 16
verify:
  from math import ceil, log2
  blocks = ceil(10 ** 6 / (4096 // 200))
  print(ceil(log2(blocks)))
explain: bfr = ⌊4096 / 200⌋ = 20, so there are 10⁶ / 20 = 50,000 blocks. Binary search needs ⌈log₂ 50000⌉ = 16 accesses (2¹⁵ = 32768 < 50000 ≤ 65536 = 2¹⁶).
```

```quiz
q: Blocks are 4096 bytes, keys 12 bytes and block pointers 8 bytes. What is the maximum order p (number of child pointers) of an internal node of a B+ tree?
answer: 205
verify: (4096 + 12) // (8 + 12)
explain: p·8 + (p − 1)·12 ≤ 4096 gives 20p ≤ 4108, so p = ⌊4108 / 20⌋ = 205.
```

```quiz
q: Blocks are 512 bytes, keys 10 bytes, block pointers 8 bytes and record pointers 9 bytes. What is the maximum order of a **B-tree** node (each key is stored with its record pointer)?
answer: 19
verify: (512 + 10 + 9) // (8 + 10 + 9)
explain: p·8 + (p − 1)·(10 + 9) ≤ 512 gives 27p ≤ 531, so p = 19. A B+ tree internal node, with no record pointers, would reach order 29.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* A file can have several secondary indexes but at most one primary or clustering index
* A primary index is sparse
- A secondary index on a non-ordering field can be sparse
* In a B+ tree, all record pointers are in the leaf nodes
explain: The file is physically ordered in only one way, so only one ordering index exists. A primary index has one entry per block. A secondary index must be dense, because the file is not sorted on that field. B+ trees keep record pointers only in the leaves.
```

```quiz
q: A B+ tree has internal nodes with at most 50 children and leaves with at most 40 keys. The root is at level 1 and the leaves are at level 3. What is the maximum number of keys it can index?
answer: 100000
verify: 50 ** 2 * 40
explain: The root has up to 50 children, each with up to 50 children (the leaves), giving 50² = 2500 leaves of 40 keys each: 100,000 keys.
```

```quiz
q: In a B+ tree of order p = 7 (at most 7 children per internal node), what is the minimum number of children of an internal node other than the root?
answer: 4
verify: -(-7 // 2)
explain: Every non-root internal node is at least half full: ⌈7 / 2⌉ = 4 children (so at least 3 keys).
```
