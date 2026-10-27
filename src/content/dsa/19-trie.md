---
title: Trie (Prefix Tree)
chapter: Advanced Data Structures
description: The trie data structure for strings: insert, search and prefix queries in O(length), counting words with a prefix, autocomplete, memory trade-offs and compressed tries.
---
A **trie** (from re*trie*val, also called a **prefix tree**) stores a set of strings so that each node represents a prefix. Words that share a beginning share the same path from the root. Autocomplete, spell checkers and IP routing tables all use tries.

```tree
caption: A trie holding car, cart, care, cat and dog (* marks the end of a word)
root
  c
    a
      r | * car
        t | * cart
        e | * care
      t | * cat
  d
    o
      g | * dog
```

## Structure

- Each node has up to Σ children (Σ = alphabet size, 26 for lowercase English), one per next character.
- A flag marks nodes where a complete word **ends** (car ends at r even though cart continues).
- The root represents the empty string.

## Operations

| Operation | How | Time |
| --- | --- | --- |
| Insert word w | Walk down, creating missing nodes; mark the last node | O(\|w\|) |
| Search w | Walk down; succeed if every node exists **and** the last is marked | O(\|w\|) |
| Starts-with prefix p | Walk down p; succeed if every node exists | O(\|p\|) |
| Count words with prefix p | Keep a pass-count in each node | O(\|p\|) |
| Delete w | Unmark, then remove nodes that are no longer used | O(\|w\|) |

The time depends only on the length of the string, **not on the number of words stored**. A hash table also gives O(|w|) lookups, but it cannot answer prefix queries or list words in sorted order.

**Space:** up to (total characters) × Σ pointers, which can be large. A **compressed trie (radix tree)** merges chains of single-child nodes into one edge labelled with a string. A **suffix trie** of a text holds all its suffixes and answers "is P a substring?" in O(|P|).

## The code

```java
public class Main {
    static class Node {
        Node[] next = new Node[26];
        boolean isWord;
        int passCount;                       // how many words pass through this node
    }

    static Node root = new Node();
    static int nodes = 1;

    static void insert(String w) {
        Node cur = root;
        for (char ch : w.toCharArray()) {
            int c = ch - 'a';
            if (cur.next[c] == null) { cur.next[c] = new Node(); nodes++; }
            cur = cur.next[c];
            cur.passCount++;
        }
        cur.isWord = true;
    }

    static Node walk(String s) {             // follow s from the root, or null
        Node cur = root;
        for (char ch : s.toCharArray()) {
            cur = cur.next[ch - 'a'];
            if (cur == null) return null;
        }
        return cur;
    }

    public static void main(String[] args) {
        for (String w : new String[]{"car", "cart", "care", "cat", "dog"}) insert(w);
        System.out.println("trie nodes (with root): " + nodes);
        for (String q : new String[]{"car", "ca", "cow"}) {
            Node n = walk(q);
            System.out.println(q + ": word? " + (n != null && n.isWord) + ", words with this prefix: " + (n == null ? 0 : n.passCount));
        }
    }
}
```
```output
trie nodes (with root): 10
car: word? true, words with this prefix: 3
ca: word? false, words with this prefix: 4
cow: word? false, words with this prefix: 0
```
```python
class Node:
    def __init__(self):
        self.next = {}
        self.is_word = False
        self.pass_count = 0                  # how many words pass through this node

root = Node()
nodes = 1

def insert(w):
    global nodes
    cur = root
    for ch in w:
        if ch not in cur.next:
            cur.next[ch] = Node()
            nodes += 1
        cur = cur.next[ch]
        cur.pass_count += 1
    cur.is_word = True

def walk(s):                                 # follow s from the root, or None
    cur = root
    for ch in s:
        cur = cur.next.get(ch)
        if cur is None:
            return None
    return cur

for w in ["car", "cart", "care", "cat", "dog"]:
    insert(w)
print("trie nodes (with root):", nodes)
for q in ["car", "ca", "cow"]:
    n = walk(q)
    is_word = "true" if n is not None and n.is_word else "false"
    print(f"{q}: word? {is_word}, words with this prefix: {n.pass_count if n else 0}")
```
```output
trie nodes (with root): 10
car: word? true, words with this prefix: 3
ca: word? false, words with this prefix: 4
cow: word? false, words with this prefix: 0
```
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    struct Node *next[26];
    int is_word;
    int pass_count;                         /* how many words pass through this node */
} Node;

int nodes = 1;

Node *new_node(void) { return calloc(1, sizeof(Node)); }

void insert(Node *root, const char *w) {
    Node *cur = root;
    for (; *w; w++) {
        int c = *w - 'a';
        if (!cur->next[c]) { cur->next[c] = new_node(); nodes++; }
        cur = cur->next[c];
        cur->pass_count++;
    }
    cur->is_word = 1;
}

Node *walk(Node *root, const char *s) {     /* follow s from the root, or NULL */
    Node *cur = root;
    for (; *s && cur; s++) cur = cur->next[*s - 'a'];
    return cur;
}

int main(void) {
    Node *root = new_node();
    const char *words[] = {"car", "cart", "care", "cat", "dog"};
    for (int i = 0; i < 5; i++) insert(root, words[i]);
    printf("trie nodes (with root): %d\n", nodes);
    const char *queries[] = {"car", "ca", "cow"};
    for (int i = 0; i < 3; i++) {
        Node *n = walk(root, queries[i]);
        printf("%s: word? %s, words with this prefix: %d\n", queries[i],
               n && n->is_word ? "true" : "false", n ? n->pass_count : 0);
    }
    return 0;
}
```
```output
trie nodes (with root): 10
car: word? true, words with this prefix: 3
ca: word? false, words with this prefix: 4
cow: word? false, words with this prefix: 0
```

## GATE-style practice questions

```quiz
q: The words "tea", "ten", "to", "in" and "inn" are inserted into an empty trie. How many nodes does it have, including the root?
answer: 9
verify:
  root, count = {}, 1
  for w in ["tea", "ten", "to", "in", "inn"]:
      cur = root
      for ch in w:
          if ch not in cur:
              cur[ch] = {}
              count += 1
          cur = cur[ch]
  print(count)
explain: root, t, e, a, n (ten), o, i, n (in), n (inn): 9 nodes.
```

```quiz
q: A trie stores n words over an alphabet of size Σ. The time to search for a word of length L is:
- O(log n)
* O(L)
- O(n L)
- O(Σ n)
explain: The search follows one edge per character (with an array of children each step is O(1)), whatever the number of stored words.
```

```quiz
q: Which queries does a trie support efficiently but a hash table does not? (Select all that apply.)
* Listing all words with a given prefix
* Listing words in alphabetical order
- Checking whether a whole word is present
- Inserting a new word
explain: Both handle exact lookups and inserts; only the trie keeps the prefix structure and order.
```

```quiz
q: A trie node uses an array of 26 child pointers. The words "a", "ab" and "abc" are stored. How many pointer slots (including null ones) are there in total, counting the root?
answer: 104
verify: 26 * 4
explain: 4 nodes (root, a, b, c) × 26 slots = 104, of which only 3 are used: tries trade memory for speed.
```
