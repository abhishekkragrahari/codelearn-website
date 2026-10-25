---
title: Process Synchronization
chapter: Synchronization
description: Race conditions, the critical-section problem, Peterson's solution, hardware locks and semaphores.
---
When processes or threads share data, the result can depend on the exact order in which their instructions interleave. That is a **race condition**, and it causes some of the hardest bugs to find.

## A race condition, step by step

`count++` looks like one step but compiles to three machine instructions: **load** count into a register, **add** 1, **store** it back. If two threads interleave those steps, one update can be lost. The simulation below replays one such interleaving deterministically.

```python
count = 5
reg_a = reg_b = None

schedule = [
    ("A", "load"), ("B", "load"),     # both read 5
    ("A", "add"), ("B", "add"),       # both compute 6
    ("A", "store"), ("B", "store"),   # both write 6
]
for thread, step in schedule:
    if step == "load":
        if thread == "A": reg_a = count
        else: reg_b = count
    elif step == "add":
        if thread == "A": reg_a += 1
        else: reg_b += 1
    else:
        count = reg_a if thread == "A" else reg_b
    print(f"{thread} {step:5} -> count = {count}")
print("Two increments, but count went from 5 to", count)
```
```output
A load  -> count = 5
B load  -> count = 5
A add   -> count = 5
B add   -> count = 5
A store -> count = 6
B store -> count = 6
Two increments, but count went from 5 to 6
```

## The critical-section problem

The part of the code that touches shared data is the **critical section**. A correct solution must guarantee three properties:

1. **Mutual exclusion:** at most one process is in its critical section at a time.
2. **Progress:** if nobody is in the critical section, the choice of who enters next cannot be postponed forever, and only processes that want to enter take part in the choice.
3. **Bounded waiting:** after a process asks to enter, there is a limit on how many times others can enter before it.

## Peterson's solution (two processes)

```text
// shared: bool flag[2] = {false, false}; int turn;
// code for process i (the other process is j = 1 - i)
flag[i] = true;          // I want to enter
turn = j;                // but you go first if you also want to
while (flag[j] && turn == j)
    ;                    // busy wait
// ---- critical section ----
flag[i] = false;         // I am done
```

Peterson's algorithm satisfies all three properties for two processes. It uses **busy waiting** (spinning in a loop), and on modern CPUs it needs memory barriers because the hardware may reorder the loads and stores.

## Hardware support: test-and-set

A **test-and-set** instruction atomically reads a memory word and sets it to true, returning the old value. A spin lock built on it:

```text
// shared: bool lock = false;
while (test_and_set(&lock))
    ;                    // spin until the old value was false
// ---- critical section ----
lock = false;
```

This gives mutual exclusion but **not** bounded waiting: an unlucky process can keep losing the race.

## Semaphores

A **semaphore** S is an integer accessed only through two atomic operations:

- **wait(S)** (also called P or down): decrement S; if the result is negative, the caller blocks.
- **signal(S)** (also called V or up): increment S; if a process is blocked on S, wake one up.

A **binary semaphore** (values 0 and 1, also called a mutex) protects a critical section. A **counting semaphore** initialised to n allows up to n processes in at once, which is useful for pools of identical resources.

```text
// mutual exclusion with a semaphore
semaphore mutex = 1;
wait(mutex);
// ---- critical section ----
signal(mutex);
```

Semaphores can also enforce **ordering**: to make statement S2 in process B run after S1 in process A, use `semaphore done = 0`; A runs `S1; signal(done);` and B runs `wait(done); S2;`.

```python
# Tracking the value of a counting semaphore through a sequence of operations
S = 7
ops = ["P"] * 20 + ["V"] * 15
for op in ops:
    S += -1 if op == "P" else 1
print("final value of S:", S)
```
```output
final value of S: 2
```

When a semaphore's value is negative, its magnitude is the number of processes blocked on it.

## GATE-style practice questions

```quiz
q: A counting semaphore S is initialised to 10. Then 12 wait (P) operations and 7 signal (V) operations are performed in some order. What is the final value of S?
answer: 5
verify: 10 - 12 + 7
explain: Each P subtracts 1 and each V adds 1, whatever the order, so the final value is 10 − 12 + 7 = 5.
```

```quiz
q: Which properties does Peterson's algorithm guarantee for two processes? (Select all that apply.)
* Mutual exclusion
* Progress
* Bounded waiting
- Absence of busy waiting
explain: Peterson's solution satisfies all three critical-section requirements. It does busy-wait: a process loops on `while (flag[j] && turn == j)` until it may enter.
```

```quiz
q: Two threads each execute `x = x + 1` once on a shared variable x that starts at 0, without any synchronization. Which final values of x are possible? (Select all that apply.)
* 1
* 2
- 0
- 3
explain: If one thread finishes its load-add-store before the other starts, x becomes 2. If both load 0 before either stores, both store 1 and one update is lost. x cannot stay 0 (someone stores a value of at least 1) and cannot exceed 2.
```

```quiz
q: A lock is built with the test-and-set instruction as `while (test_and_set(&lock)); /* CS */ lock = false;`. Which requirement can it violate?
- Mutual exclusion
- Progress
* Bounded waiting
- It cannot violate any of them
explain: Test-and-set is atomic, so two processes cannot both see false: mutual exclusion holds. But nothing forces fairness; a process can keep losing the race to others, so bounded waiting is not guaranteed.
```
