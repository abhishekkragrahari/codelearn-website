---
title: Classic Synchronization Problems
chapter: Synchronization
description: Producer-consumer, readers-writers and dining philosophers solved with semaphores.
---
Three standard problems capture most real synchronization situations. Each is solved with semaphores (see the previous lesson).

## Producer-consumer (bounded buffer)

Producers put items into a buffer of size n and consumers take them out. Producers must wait when the buffer is full, and consumers when it is empty.

```text
semaphore mutex = 1;     // protects the buffer itself
semaphore empty = n;     // number of empty slots
semaphore full  = 0;     // number of filled slots

producer:                       consumer:
  item = produce();               wait(full);
  wait(empty);                    wait(mutex);
  wait(mutex);                    item = remove();
  insert(item);                   signal(mutex);
  signal(mutex);                  signal(empty);
  signal(full);                   consume(item);
```

> **Warning:** The order of the waits matters. If the producer did `wait(mutex)` **before** `wait(empty)` and the buffer was full, it would sleep while holding the mutex, and the consumer could never get in to make room: a deadlock.

Python's `queue.Queue(maxsize=n)` is a ready-made bounded buffer. The final total below is always the same, whatever order the threads run in:

```python
import threading, queue

buffer = queue.Queue(maxsize=5)        # blocks the producer when full, the consumer when empty
total = 0

def producer():
    for item in range(1, 101):
        buffer.put(item)
    buffer.put(None)                   # tells the consumer to stop

def consumer():
    global total
    while (item := buffer.get()) is not None:
        total += item

threads = [threading.Thread(target=producer), threading.Thread(target=consumer)]
for t in threads: t.start()
for t in threads: t.join()
print("sum of everything consumed:", total)
```
```output
sum of everything consumed: 5050
```

## Readers-writers

Many readers may read shared data at the same time, but a writer needs exclusive access. The "first readers-writers" solution favours readers:

```text
semaphore rw_mutex = 1;   // writers' lock, also taken by the first reader
semaphore mutex = 1;      // protects read_count
int read_count = 0;

writer:                     reader:
  wait(rw_mutex);             wait(mutex);
  // write                    read_count++;
  signal(rw_mutex);           if (read_count == 1) wait(rw_mutex);   // first reader locks out writers
                              signal(mutex);
                              // read
                              wait(mutex);
                              read_count--;
                              if (read_count == 0) signal(rw_mutex); // last reader lets writers in
                              signal(mutex);
```

Writers can **starve** in this version if readers keep arriving. The "second" version gives writers priority instead.

## Dining philosophers

Five philosophers sit at a round table with one chopstick between each pair. A philosopher needs both neighbouring chopsticks to eat.

```graph
caption: Five philosophers (P) and five chopsticks (C) around the table
nodes: P0 C0 P1 C1 P2 C2 P3 C3 P4 C4
P0 - C0
C0 - P1
P1 - C1
C1 - P2
P2 - C2
C2 - P3
P3 - C3
C3 - P4
P4 - C4
C4 - P0
```

If every philosopher picks up the **left** chopstick first, all five can hold one chopstick and wait forever for the other: a **deadlock**. Standard fixes:

- Let at most **four** philosophers sit at the table at once (a counting semaphore initialised to 4).
- Make one philosopher pick up the **right** chopstick first (this breaks the circular wait).
- Pick up both chopsticks only if both are free (inside a critical section).

## GATE-style practice questions

```quiz
q: In the bounded-buffer solution, the producer executes `wait(mutex); wait(empty);` instead of `wait(empty); wait(mutex);`. What can happen?
- Nothing changes; the order of waits does not matter
* Deadlock, when the buffer is full
- Two producers can be inside the buffer at the same time
- The consumer can remove an item from an empty buffer
explain: If the buffer is full, the producer acquires mutex and then blocks on empty while still holding mutex. The consumer then blocks on mutex and can never free a slot, so both wait forever.
```

```quiz
q: In the dining philosophers problem with 5 philosophers, at most how many philosophers can be allowed to sit at the table at the same time while still guaranteeing that deadlock is impossible?
answer: 4
verify: 5 - 1
explain: With at most 4 philosophers competing for 5 chopsticks, by the pigeonhole principle at least one of them can get both chopsticks, eat, and release them, so the system always makes progress. With all 5, they can each hold one chopstick and deadlock.
```

```quiz
q: In the first readers-writers solution, which statements are **true**? (Select all that apply.)
* Several readers can read at the same time
* A writer has exclusive access while writing
- Writers can never starve
* The first reader to arrive locks out writers
explain: Readers share access and the first reader takes rw_mutex, keeping writers out until the last reader leaves. Because new readers can keep arriving, a waiting writer can starve in this version.
```
