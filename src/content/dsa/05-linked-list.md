---
title: Linked Lists
chapter: Linear Data Structures
description: Nodes connected by pointers, with O(1) insertion at the front and no fixed size.
---
A **linked list** is a chain of **nodes**. Each node holds a value and a reference (pointer) to the next node. The list itself only remembers the first node, called the **head**; the last node points to `null`.

```pipeline
caption: A singly linked list holding 10, 20, 30
head | points to first node
10 | next →
20 | next →
30 | next →
null | end of list
```

Unlike an array, the nodes can be anywhere in memory, so the list can grow one node at a time without copying. The price is that there is no direct indexing: to reach the k-th node you must follow k pointers.

| Operation | Array | Singly linked list |
| --- | --- | --- |
| Access k-th element | O(1) | O(k) |
| Insert / delete at front | O(n) | O(1) |
| Insert / delete after a known node | O(n) | O(1) |
| Insert at end (with a tail pointer) | O(1) amortised | O(1) |
| Delete the last node | O(1) | O(n), the node before it must be found |
| Extra memory per element | none | one pointer |

## Implementing a singly linked list

```java
public class Main {
    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.addLast(20);
        list.addLast(30);
        list.addFirst(10);
        list.addLast(40);
        System.out.println(list + "  size=" + list.size);

        list.remove(30);
        System.out.println("after remove(30): " + list);
        System.out.println("contains 40? " + list.contains(40));

        list.reverse();
        System.out.println("reversed: " + list);
    }
}

class LinkedList {
    static class Node {
        int value;
        Node next;
        Node(int value) { this.value = value; }
    }

    Node head, tail;
    int size;

    void addFirst(int v) {
        Node n = new Node(v);
        n.next = head;
        head = n;
        if (tail == null) tail = n;
        size++;
    }

    void addLast(int v) {
        Node n = new Node(v);
        if (tail == null) head = tail = n;
        else { tail.next = n; tail = n; }
        size++;
    }

    boolean contains(int v) {
        for (Node cur = head; cur != null; cur = cur.next)
            if (cur.value == v) return true;
        return false;
    }

    void remove(int v) {
        Node prev = null, cur = head;
        while (cur != null && cur.value != v) { prev = cur; cur = cur.next; }
        if (cur == null) return;                    // not found
        if (prev == null) head = cur.next;          // removing the head
        else prev.next = cur.next;                  // bypass the node
        if (cur == tail) tail = prev;
        size--;
    }

    void reverse() {
        Node prev = null, cur = head;
        tail = head;
        while (cur != null) {
            Node next = cur.next;   // remember the rest of the list
            cur.next = prev;        // turn this pointer around
            prev = cur;
            cur = next;
        }
        head = prev;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (Node cur = head; cur != null; cur = cur.next) sb.append(cur.value).append(" -> ");
        return sb.append("null").toString();
    }
}
```
```output
10 -> 20 -> 30 -> 40 -> null  size=4
after remove(30): 10 -> 20 -> 40 -> null
contains 40? true
reversed: 40 -> 20 -> 10 -> null
```
```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = self.tail = None
        self.size = 0

    def add_first(self, v):
        n = Node(v)
        n.next = self.head
        self.head = n
        if self.tail is None:
            self.tail = n
        self.size += 1

    def add_last(self, v):
        n = Node(v)
        if self.tail is None:
            self.head = self.tail = n
        else:
            self.tail.next = n
            self.tail = n
        self.size += 1

    def contains(self, v):
        cur = self.head
        while cur:
            if cur.value == v:
                return True
            cur = cur.next
        return False

    def remove(self, v):
        prev, cur = None, self.head
        while cur and cur.value != v:
            prev, cur = cur, cur.next
        if cur is None:
            return                          # not found
        if prev is None:
            self.head = cur.next            # removing the head
        else:
            prev.next = cur.next            # bypass the node
        if cur is self.tail:
            self.tail = prev
        self.size -= 1

    def reverse(self):
        prev, cur = None, self.head
        self.tail = self.head
        while cur:
            nxt = cur.next                  # remember the rest of the list
            cur.next = prev                 # turn this pointer around
            prev, cur = cur, nxt
        self.head = prev

    def __str__(self):
        parts, cur = [], self.head
        while cur:
            parts.append(str(cur.value))
            cur = cur.next
        return " -> ".join(parts + ["null"])

lst = LinkedList()
lst.add_last(20)
lst.add_last(30)
lst.add_first(10)
lst.add_last(40)
print(lst, f" size={lst.size}")
lst.remove(30)
print("after remove(30):", lst)
print("contains 40?", lst.contains(40))
lst.reverse()
print("reversed:", lst)
```
```output
10 -> 20 -> 30 -> 40 -> null  size=4
after remove(30): 10 -> 20 -> 40 -> null
contains 40? True
reversed: 40 -> 20 -> 10 -> null
```

## Other kinds of linked list

- **Doubly linked list:** each node also points to the previous node, so you can walk backwards and delete a known node in O(1).
- **Circular linked list:** the last node points back to the head instead of `null`, useful for round-robin scheduling.

## Finding the middle and detecting cycles

The **two-pointer** (tortoise and hare) trick moves a slow pointer one step and a fast pointer two steps at a time. When the fast pointer reaches the end, the slow one is at the middle. If the list has a cycle, the fast pointer eventually lands on the slow one (Floyd's cycle detection). Both use O(1) extra space.

```java
public class Main {
    static class Node { int v; Node next; Node(int v) { this.v = v; } }

    static Node build(int... values) {
        Node head = null;
        for (int i = values.length - 1; i >= 0; i--) { Node n = new Node(values[i]); n.next = head; head = n; }
        return head;
    }

    static int middle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }
        return slow.v;
    }

    static boolean hasCycle(Node head) {
        Node slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        Node list = build(1, 2, 3, 4, 5);
        System.out.println("middle: " + middle(list));
        System.out.println("cycle? " + hasCycle(list));
        list.next.next.next.next.next = list.next.next;     // 5 now points back to 3
        System.out.println("cycle after linking 5 -> 3? " + hasCycle(list));
    }
}
```
```output
middle: 3
cycle? false
cycle after linking 5 -> 3? true
```
```python
class Node:
    def __init__(self, v, nxt=None):
        self.v, self.next = v, nxt

def build(*values):
    head = None
    for v in reversed(values):
        head = Node(v, head)
    return head

def middle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    return slow.v

def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast:
            return True
    return False

lst = build(1, 2, 3, 4, 5)
print("middle:", middle(lst))
print("cycle?", has_cycle(lst))
lst.next.next.next.next.next = lst.next.next     # 5 now points back to 3
print("cycle after linking 5 -> 3?", has_cycle(lst))
```
```output
middle: 3
cycle? False
cycle after linking 5 -> 3? True
```

## GATE-style practice questions

```quiz
q: A singly linked list has a `head` pointer and a `tail` pointer. Which operation **cannot** be done in O(1) time?
- Insert a node at the front
- Insert a node at the end
- Delete the first node
* Delete the last node
explain: To delete the last node, the second-to-last node's `next` must be set to null, and finding that node requires walking from the head, which is Θ(n). A tail pointer does not help because the links only go forward.
```

```quiz
q: Which of the following are advantages of a linked list over an array? (Select all that apply.)
* Inserting at the front takes O(1) time
* The size does not need to be known in advance
- Accessing the k-th element takes O(1) time
- It uses less memory per element
explain: Front insertion is O(1) and the list grows node by node. But reaching the k-th element takes O(k), and each node needs extra memory for its pointer.
```

```quiz
q: In Floyd's cycle detection on a list, the slow pointer moves 1 step and the fast pointer 2 steps per iteration. For an **acyclic** list of 9 nodes, how many iterations of the loop `while (fast != null && fast.next != null)` run before it stops?
answer: 4
verify: (lambda n: (lambda f: f(f, 0, 0))(lambda f, fast, loops: loops if fast >= n or fast + 1 >= n else f(f, fast + 2, loops + 1)))(9)
explain: The fast pointer visits node positions 0, 2, 4, 6, 8 (0-indexed). After 4 iterations it is at position 8, the last node, whose next is null, so the loop stops. In general the loop runs floor(n / 2) times.
```
