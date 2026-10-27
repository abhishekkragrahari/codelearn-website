---
title: IPC, Mutexes and Monitors
chapter: Synchronization
description: How processes exchange data: shared memory and message passing, pipes, message queues and sockets, direct and indirect communication, mutex locks, condition variables and monitors.
---
Processes have separate address spaces, so they cannot simply read each other's variables. **Inter-process communication (IPC)** is the set of mechanisms the operating system provides for them to exchange data and coordinate. Threads of one process share memory, but they still need **mutexes**, **condition variables** or **monitors** to use it safely.

## Two models of IPC

| Model | How it works | Speed | Synchronisation |
| --- | --- | --- | --- |
| **Shared memory** | The OS maps one region into both address spaces; processes read and write it directly | Fast: no kernel call per access | The processes must synchronise themselves (semaphores, mutexes) |
| **Message passing** | Processes call send() and receive(); the kernel copies the data | Slower: a system call per message | Built in: receive waits for a message |

```pipeline
caption: Message passing through the kernel
Process A | send(msg)
Kernel buffer | copy of msg
Process B | receive(msg)
```

**Design choices in message passing:**

- **Direct** (send to a named process) or **indirect** communication (through a **mailbox/port** that many processes can share).
- **Blocking (synchronous)** or **non-blocking (asynchronous)** send and receive. When both are blocking, the exchange is a **rendezvous**.
- **Buffering:** zero capacity (sender waits for receiver), bounded capacity, or unbounded.

## IPC mechanisms in practice

- **Pipes:** a one-way byte stream. An **ordinary (anonymous) pipe** connects a parent and its child (created by `pipe()` before `fork()`); a **named pipe (FIFO)** has a name in the file system and can connect unrelated processes.
- **Message queues:** the kernel keeps a list of typed messages.
- **Shared memory segments** (`shmget`, `mmap`), usually with a semaphore.
- **Signals:** short asynchronous notifications (SIGINT, SIGKILL).
- **Sockets:** communication between processes on the same or different machines.

A pipe in Python on Unix: the child writes and the parent reads.

```python
import os

r, w = os.pipe()                      # r: read end, w: write end
pid = os.fork()
if pid == 0:                          # child: write into the pipe and exit
    os.close(r)
    os.write(w, b"hello from the child")
    os._exit(0)
os.close(w)                           # parent: read what the child wrote
os.waitpid(pid, 0)
print("parent read:", os.read(r, 100).decode())
```
```output
parent read: hello from the child
```

## Mutex locks

A **mutex** (mutual-exclusion lock) is a binary lock with an owner: acquire() before the critical section, release() after. Only the thread that locked it may unlock it (unlike a binary semaphore).

- A **spinlock** waits in a busy loop; good only for very short critical sections on multiprocessors.
- A **blocking mutex** puts the waiting thread to sleep.

## Condition variables and monitors

A **condition variable** lets a thread sleep until some condition becomes true:

- **wait(c):** atomically release the lock and sleep; reacquire the lock when woken.
- **signal(c)** (notify): wake one waiting thread; **broadcast** wakes all.
- Always re-check the condition in a **while** loop after waking (a spurious or stolen wake-up is possible).

A **monitor** is a high-level construct (Java's `synchronized` methods, Python's `threading.Condition`): shared data plus procedures, where **only one thread can be active inside the monitor at a time**, and condition variables for waiting. The compiler or runtime inserts the locking, so it is harder to get wrong than raw semaphores.

| Signalling rule | After signal(c) |
| --- | --- |
| **Signal and wait** (Hoare) | The woken thread runs at once; the signaller waits |
| **Signal and continue** (Mesa, used by Java and Python) | The signaller keeps running; the woken thread runs later, so it must re-check its condition |

A bounded buffer written as a monitor with two conditions:

```python
import threading

class BoundedBuffer:                  # a monitor: one lock guards all the data
    def __init__(self, size):
        self.items, self.size = [], size
        self.lock = threading.Lock()
        self.not_full = threading.Condition(self.lock)
        self.not_empty = threading.Condition(self.lock)

    def put(self, item):
        with self.lock:
            while len(self.items) == self.size:   # re-check after every wake-up
                self.not_full.wait()
            self.items.append(item)
            self.not_empty.notify()

    def get(self):
        with self.lock:
            while not self.items:
                self.not_empty.wait()
            item = self.items.pop(0)
            self.not_full.notify()
            return item

buf, total = BoundedBuffer(3), 0

def producer():
    for i in range(1, 51):
        buf.put(i)
    buf.put(None)                     # tells the consumer to stop

def consumer():
    global total
    while (item := buf.get()) is not None:
        total += item

threads = [threading.Thread(target=producer), threading.Thread(target=consumer)]
for t in threads: t.start()
for t in threads: t.join()
print("sum consumed:", total)
```
```output
sum consumed: 1275
```

## GATE-style practice questions

```quiz
q: Which IPC model needs no system call for each exchange of data once it is set up?
* Shared memory
- Message passing
- Pipes
- Sockets
explain: After the region is mapped, processes access it with ordinary loads and stores; message passing, pipes and sockets go through the kernel each time.
```

```quiz
q: Which statements about pipes are true? (Select all that apply.)
* An ordinary pipe carries data in one direction
* An ordinary pipe is normally shared between a parent and its child
- An ordinary pipe can connect two processes on different machines
- A named pipe has no name in the file system
explain: Ordinary pipes are one-way and inherited across fork(); named pipes (FIFOs) have file-system names; network communication needs sockets.
```

```quiz
q: Under Mesa (signal-and-continue) semantics, why must a waiting thread re-check its condition in a while loop?
* Another thread may change the state between the signal and the time the woken thread runs
- The signal is always lost
- The lock is never released by wait()
- Mesa monitors allow two threads inside at once
explain: The signaller continues and other threads may run first, so the condition may be false again when the woken thread resumes.
```

```quiz
q: A producer and consumer exchange 50 items through a bounded buffer of size 3, as in the code above. What is the sum of the items consumed?
answer: 1275
verify: sum(range(1, 51))
explain: Every item 1 to 50 is consumed exactly once, whatever the interleaving: 50 × 51/2 = 1275.
```
