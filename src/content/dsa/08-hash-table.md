---
title: Hash Tables
chapter: Hashing
description: Average O(1) search, insert and delete using a hash function, with chaining or open addressing.
---
A **hash table** stores key-value pairs in an array of **buckets**. A **hash function** turns each key into a bucket index, so the table can jump straight to where a key belongs instead of searching. With a good hash function, search, insert and delete take **O(1) time on average**.

A simple hash function for integer keys in a table of size m is **h(k) = k mod m**.

## Collisions

Two different keys can hash to the same bucket. This is a **collision**, and every hash table needs a strategy for it:

- **Separate chaining:** each bucket holds a small list of all keys that hash there.
- **Open addressing:** all keys live in the array itself; on a collision, try other slots in a fixed order (**probing**).

```tree
caption: Chaining with h(k) = k mod 7 after inserting 15, 11, 27, 8, 22, 4
Hash table | m = 7
  0 | empty
  1 | 15 → 8 → 22
  4 | 11 → 4
  6 | 27
```

## Separate chaining

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        ChainedHashTable t = new ChainedHashTable(7);
        for (int k : new int[]{15, 11, 27, 8, 22, 4}) t.put(k, "v" + k);
        t.print();
        System.out.println("get(22) = " + t.get(22));
        System.out.println("get(5) = " + t.get(5));
        System.out.printf("load factor = %.2f%n", t.loadFactor());
    }
}

class ChainedHashTable {
    record Entry(int key, String value) { }

    private final List<LinkedList<Entry>> buckets = new ArrayList<>();
    private int size = 0;

    ChainedHashTable(int m) {
        for (int i = 0; i < m; i++) buckets.add(new LinkedList<>());
    }

    private int hash(int key) { return Math.floorMod(key, buckets.size()); }

    void put(int key, String value) {
        LinkedList<Entry> chain = buckets.get(hash(key));
        chain.removeIf(e -> e.key() == key);     // replace an existing key
        chain.addLast(new Entry(key, value));
        size++;
    }

    String get(int key) {
        for (Entry e : buckets.get(hash(key))) if (e.key() == key) return e.value();
        return null;
    }

    double loadFactor() { return (double) size / buckets.size(); }

    void print() {
        for (int i = 0; i < buckets.size(); i++) {
            StringBuilder sb = new StringBuilder();
            for (Entry e : buckets.get(i)) sb.append(" ").append(e.key());
            System.out.println(i + ":" + sb);
        }
    }
}
```
```output
0:
1: 15 8 22
2:
3:
4: 11 4
5:
6: 27
get(22) = v22
get(5) = null
load factor = 0.86
```
```python
class ChainedHashTable:
    def __init__(self, m):
        self.buckets = [[] for _ in range(m)]
        self.size = 0

    def _hash(self, key):
        return key % len(self.buckets)

    def put(self, key, value):
        chain = self.buckets[self._hash(key)]
        chain[:] = [(k, v) for k, v in chain if k != key]   # replace an existing key
        chain.append((key, value))
        self.size += 1

    def get(self, key):
        for k, v in self.buckets[self._hash(key)]:
            if k == key:
                return v
        return None

    def load_factor(self):
        return self.size / len(self.buckets)

t = ChainedHashTable(7)
for k in [15, 11, 27, 8, 22, 4]:
    t.put(k, f"v{k}")
for i, chain in enumerate(t.buckets):
    print(f"{i}:", *[k for k, _ in chain])
print("get(22) =", t.get(22))
print("get(5) =", t.get(5))
print(f"load factor = {t.load_factor():.2f}")
```
```output
0:
1: 15 8 22
2:
3:
4: 11 4
5:
6: 27
get(22) = v22
get(5) = None
load factor = 0.86
```

The **load factor** α = n / m (keys per bucket) controls performance: with chaining, an average search looks at about 1 + α keys. Real implementations resize (usually double m) when α passes a threshold, about 0.75 in Java's `HashMap`.

## Open addressing with linear probing

With **linear probing**, if slot h(k) is taken, try h(k)+1, h(k)+2, ... (wrapping around) until a free slot is found. Searching follows the same sequence.

```java
public class Main {
    public static void main(String[] args) {
        int m = 10;
        Integer[] table = new Integer[m];
        int totalProbes = 0;
        for (int key : new int[]{12, 18, 13, 2, 3, 23, 5, 15}) {
            int i = key % m, probes = 1;
            while (table[i] != null) {        // collision: try the next slot
                i = (i + 1) % m;
                probes++;
            }
            table[i] = key;
            totalProbes += probes;
            System.out.println("insert " + key + " -> slot " + i + " (" + probes + " probe" + (probes > 1 ? "s" : "") + ")");
        }
        System.out.println(java.util.Arrays.toString(table));
        System.out.println("total probes: " + totalProbes);
    }
}
```
```output
insert 12 -> slot 2 (1 probe)
insert 18 -> slot 8 (1 probe)
insert 13 -> slot 3 (1 probe)
insert 2 -> slot 4 (3 probes)
insert 3 -> slot 5 (3 probes)
insert 23 -> slot 6 (4 probes)
insert 5 -> slot 7 (3 probes)
insert 15 -> slot 9 (5 probes)
[null, null, 12, 13, 2, 3, 23, 5, 18, 15]
total probes: 21
```
```python
m = 10
table = [None] * m
total_probes = 0
for key in [12, 18, 13, 2, 3, 23, 5, 15]:
    i, probes = key % m, 1
    while table[i] is not None:        # collision: try the next slot
        i = (i + 1) % m
        probes += 1
    table[i] = key
    total_probes += probes
    print(f"insert {key} -> slot {i} ({probes} probe{'s' if probes > 1 else ''})")
print(table)
print("total probes:", total_probes)
```
```output
insert 12 -> slot 2 (1 probe)
insert 18 -> slot 8 (1 probe)
insert 13 -> slot 3 (1 probe)
insert 2 -> slot 4 (3 probes)
insert 3 -> slot 5 (3 probes)
insert 23 -> slot 6 (4 probes)
insert 5 -> slot 7 (3 probes)
insert 15 -> slot 9 (5 probes)
[None, None, 12, 13, 2, 3, 23, 5, 18, 15]
total probes: 21
```

Notice how keys pile up in one long run (slots 2 to 9). This **primary clustering** is the weakness of linear probing. **Quadratic probing** (try h + 1², h + 2², ...) and **double hashing** (step size given by a second hash function) spread keys out better.

| Strategy | Pros | Cons |
| --- | --- | --- |
| Separate chaining | simple, load factor can exceed 1, deletion is easy | extra memory for lists |
| Linear probing | cache friendly, no extra memory | primary clustering, deletion needs care |
| Double hashing | avoids clustering | more computation per probe |

## GATE-style practice questions

```quiz
q: Keys 15, 11, 27, 8, 22, 4 are inserted in that order into a hash table of size 7 using h(k) = k mod 7 and **separate chaining**. What is the length of the longest chain?
answer: 3
verify: max(sum(1 for k in [15, 11, 27, 8, 22, 4] if k % 7 == b) for b in range(7))
explain: 15, 8 and 22 all hash to 1 (chain of 3); 11 and 4 hash to 4; 27 hashes to 6.
```

```quiz
q: Keys 43, 36, 92, 87, 11, 4, 71 are inserted in that order into an empty table of size 10 with h(k) = k mod 10 and **linear probing**. In which slot does 71 end up?
answer: 5
verify: (lambda t: [t.__setitem__(next((k % 10 + j) % 10 for j in range(10) if t[(k % 10 + j) % 10] is None), k) for k in [43, 36, 92, 87, 11, 4, 71]] and t.index(71))([None] * 10)
explain: 43 → 3, 36 → 6, 92 → 2, 87 → 7, 11 → 1, 4 → 4 (free). 71 hashes to 1, which is taken; 2, 3 and 4 are taken too, so 71 goes to slot 5.
```

```quiz
q: In a hash table with separate chaining, n keys are stored in m buckets and the hash function spreads keys uniformly. What is the **expected** time for an unsuccessful search?
- Θ(1) regardless of n and m
* Θ(1 + n/m)
- Θ(log n)
- Θ(n)
explain: An unsuccessful search hashes the key (O(1)) and then scans the whole chain in that bucket, whose expected length is the load factor α = n/m. So the expected time is Θ(1 + α).
```

```quiz
q: Which statements about hashing are **true**? (Select all that apply.)
* Linear probing suffers from primary clustering
* With separate chaining, the load factor can be greater than 1
- With open addressing, the load factor can be greater than 1
- A hash table always guarantees O(1) worst-case search
explain: Open addressing stores every key in the array, so it can hold at most m keys (α ≤ 1). Chaining has no such limit. In the worst case every key collides, so search is Θ(n); O(1) is only the average.
```
