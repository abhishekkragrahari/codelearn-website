---
title: Queues and Deques
chapter: Linear Data Structures
description: First in, first out. Circular arrays, double-ended queues and where queues are used.
---
A **queue** is a collection where items leave in the order they arrived: **FIFO** (first in, first out), like people waiting at a ticket counter. New items join at the **rear**; items are removed from the **front**.

| Operation | Meaning | Time |
| --- | --- | --- |
| `enqueue(x)` | add x at the rear | O(1) |
| `dequeue()` | remove and return the front item | O(1) |
| `peek()` | look at the front item | O(1) |

```pipeline
caption: enqueue A, B, C, then dequeue() returns A
front → A | leaves first
B
C | rear: joins last
```

## The circular array

Storing a queue in a plain array and shifting everything left on every dequeue would cost O(n). Instead, a **circular array** keeps two indices, `front` and `rear`, and lets them wrap around to index 0 with the `% capacity` operation. Both operations become O(1) and no space is wasted.

```java
public class Main {
    public static void main(String[] args) {
        CircularQueue q = new CircularQueue(4);
        q.enqueue(10);
        q.enqueue(20);
        q.enqueue(30);
        System.out.println("dequeue: " + q.dequeue());
        System.out.println("dequeue: " + q.dequeue());
        q.enqueue(40);
        q.enqueue(50);
        q.enqueue(60);          // rear has wrapped around to the start of the array
        System.out.println(q);
        System.out.println("full? " + q.isFull());
    }
}

class CircularQueue {
    private final int[] data;
    private int front = 0, size = 0;

    CircularQueue(int capacity) { data = new int[capacity]; }

    boolean isFull() { return size == data.length; }

    void enqueue(int x) {
        if (isFull()) throw new IllegalStateException("queue is full");
        int rear = (front + size) % data.length;
        data[rear] = x;
        size++;
    }

    int dequeue() {
        if (size == 0) throw new IllegalStateException("queue is empty");
        int x = data[front];
        front = (front + 1) % data.length;
        size--;
        return x;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder("front [");
        for (int i = 0; i < size; i++) {
            if (i > 0) sb.append(", ");
            sb.append(data[(front + i) % data.length]);
        }
        return sb.append("] rear").toString();
    }
}
```
```output
dequeue: 10
dequeue: 20
front [30, 40, 50, 60] rear
full? true
```
```python
class CircularQueue:
    def __init__(self, capacity):
        self.data = [None] * capacity
        self.front = 0
        self.size = 0

    def is_full(self):
        return self.size == len(self.data)

    def enqueue(self, x):
        if self.is_full():
            raise OverflowError("queue is full")
        rear = (self.front + self.size) % len(self.data)
        self.data[rear] = x
        self.size += 1

    def dequeue(self):
        if self.size == 0:
            raise IndexError("queue is empty")
        x = self.data[self.front]
        self.front = (self.front + 1) % len(self.data)
        self.size -= 1
        return x

    def __str__(self):
        items = [self.data[(self.front + i) % len(self.data)] for i in range(self.size)]
        return f"front {items} rear"

q = CircularQueue(4)
q.enqueue(10)
q.enqueue(20)
q.enqueue(30)
print("dequeue:", q.dequeue())
print("dequeue:", q.dequeue())
q.enqueue(40)
q.enqueue(50)
q.enqueue(60)          # rear has wrapped around to the start of the array
print(q)
print("full?", q.is_full())
```
```output
dequeue: 10
dequeue: 20
front [30, 40, 50, 60] rear
full? True
```
```c
#include <stdio.h>

#define CAPACITY 4

typedef struct {
    int data[CAPACITY];
    int front, size;
} CircularQueue;

int is_full(const CircularQueue *q) { return q->size == CAPACITY; }

int enqueue(CircularQueue *q, int x) {
    if (is_full(q)) return -1;
    int rear = (q->front + q->size) % CAPACITY;
    q->data[rear] = x;
    q->size++;
    return 0;
}

int dequeue(CircularQueue *q) {
    int x = q->data[q->front];          /* caller checks that the queue is not empty */
    q->front = (q->front + 1) % CAPACITY;
    q->size--;
    return x;
}

void print(const CircularQueue *q) {
    printf("front [");
    for (int i = 0; i < q->size; i++) printf(i ? ", %d" : "%d", q->data[(q->front + i) % CAPACITY]);
    printf("] rear\n");
}

int main(void) {
    CircularQueue q = {.front = 0, .size = 0};
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    printf("dequeue: %d\n", dequeue(&q));
    printf("dequeue: %d\n", dequeue(&q));
    enqueue(&q, 40);
    enqueue(&q, 50);
    enqueue(&q, 60);         /* rear has wrapped around to the start of the array */
    print(&q);
    printf("full? %s\n", is_full(&q) ? "true" : "false");
    return 0;
}
```
```output
dequeue: 10
dequeue: 20
front [30, 40, 50, 60] rear
full? true
```

## Deque: a double-ended queue

A **deque** ("deck") allows adding and removing at **both** ends in O(1). It can act as a stack or a queue. Java has `ArrayDeque`; Python has `collections.deque`.

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        Deque<String> d = new ArrayDeque<>();
        d.addLast("B");
        d.addLast("C");
        d.addFirst("A");
        System.out.println(d);
        System.out.println(d.pollFirst() + " " + d.pollLast());
        System.out.println(d);
    }
}
```
```output
[A, B, C]
A C
[B]
```
```python
from collections import deque

d = deque()
d.append("B")
d.append("C")
d.appendleft("A")
print(list(d))
print(d.popleft(), d.pop())
print(list(d))
```
```output
['A', 'B', 'C']
A C
['B']
```
```c
#include <stdio.h>

/* A deque in a circular array: add and remove at both ends in O(1). */
#define CAP 8
char items[CAP];
int front = 0, count = 0;

void add_last(char c) { items[(front + count++) % CAP] = c; }
void add_first(char c) { front = (front - 1 + CAP) % CAP; items[front] = c; count++; }
char poll_first(void) { char c = items[front]; front = (front + 1) % CAP; count--; return c; }
char poll_last(void) { count--; return items[(front + count) % CAP]; }

void print(void) {
    printf("[");
    for (int i = 0; i < count; i++) printf(i ? ", %c" : "%c", items[(front + i) % CAP]);
    printf("]\n");
}

int main(void) {
    add_last('B');
    add_last('C');
    add_first('A');
    print();
    char a = poll_first();
    char c = poll_last();
    printf("%c %c\n", a, c);
    print();
    return 0;
}
```
```output
[A, B, C]
A C
[B]
```

## Where queues are used

- **Scheduling:** CPU process scheduling (round robin), printer queues, request queues in web servers.
- **Breadth-first search** in graphs and level-order traversal of trees (later lessons).
- **Buffers** between a fast producer and a slow consumer, such as keyboard input or network packets.

> **Note:** A **priority queue** is not FIFO: it always removes the item with the highest priority. It is usually implemented with a heap, covered in the Heaps lesson.

## GATE-style practice questions

```quiz
q: A circular queue is stored in an array of size 6 (indices 0 to 5) and keeps `front` (index of the first item) and `size`. Currently front = 4 and size = 3. At which index will the next enqueued item be stored?
answer: 1
verify: (4 + 3) % 6
explain: The items are at indices 4, 5 and 0. The next free slot is (front + size) mod capacity = (4 + 3) mod 6 = 1.
```

```quiz
q: A queue is implemented using **two stacks** S1 and S2: enqueue pushes onto S1; dequeue pops from S2, and if S2 is empty it first pops every item of S1 and pushes it onto S2. What is the **amortised** cost per operation over a sequence of n operations?
* O(1)
- O(log n)
- O(n)
- O(n²)
explain: Each item is pushed onto S1 once, moved to S2 at most once and popped from S2 once, so every item costs at most 4 stack operations in total. A single dequeue can cost O(n), but the average over the sequence is O(1).
```

```quiz
q: Which of the following problems are naturally solved with a **queue**? (Select all that apply.)
* Breadth-first search of a graph
* Round-robin CPU scheduling
- Checking whether brackets are balanced
* Level-order traversal of a binary tree
explain: BFS, round-robin scheduling and level-order traversal all process items in the order they were discovered (FIFO). Bracket matching needs the most recent opener first, which is a stack.
```
