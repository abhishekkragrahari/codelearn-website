---
title: Concurrency Control and Recovery
chapter: Transactions
description: Shared and exclusive locks, two-phase locking and its strict variants, deadlock prevention with wait-die and wound-wait, timestamp ordering with the Thomas write rule, and log-based recovery.
---
The previous lesson defined which schedules are correct. A **concurrency control protocol** makes sure that only such schedules happen, without checking precedence graphs at run time.

## Locks

Before using an item, a transaction must lock it:

- **Shared lock (S)**: needed to read. Many transactions can hold S on the same item.
- **Exclusive lock (X)**: needed to write. Only one transaction can hold it, and no one else can hold S at the same time.

| Held \ Requested | S | X |
| --- | --- | --- |
| **S** | Granted | Wait |
| **X** | Wait | Wait |

Locking alone does not guarantee serializability: if T1 unlocks A too early, T2 can change A and T1 can see an inconsistent mix.

## Two-phase locking (2PL)

A transaction follows **2PL** if all its lock requests come before all its unlocks. It has two phases:

```pipeline
caption: Two-phase locking: once a lock is released, no new lock may be taken
Growing phase | acquire locks, release none
Lock point | the last lock is taken
Shrinking phase | release locks, acquire none
```

- **2PL guarantees conflict serializability.** The equivalent serial order is the order of the transactions' **lock points**.
- 2PL does **not** prevent **deadlocks**: T1 holds X(A) and wants B while T2 holds X(B) and wants A.
- Basic 2PL does **not** prevent **cascading rollbacks**: T1 can release X(A) in its shrinking phase, T2 reads A, and then T1 aborts.

The variants fix the second problem:

| Protocol | Rule | Schedules produced |
| --- | --- | --- |
| Basic 2PL | Growing, then shrinking | Conflict serializable |
| **Strict 2PL** | Hold all **exclusive** locks until commit or abort | Conflict serializable and **strict** (so cascadeless and recoverable) |
| **Rigorous 2PL** | Hold **all** locks until commit or abort | Strict; serial order = commit order |
| Conservative (static) 2PL | Take all locks before starting | Deadlock-free, but needs to know every item in advance |

Most real databases use strict 2PL.

## Deadlocks

A deadlock is detected with a **wait-for graph** (an edge Ti → Tj when Ti waits for a lock held by Tj): a cycle means deadlock, and one transaction in the cycle (the *victim*) is aborted.

Deadlocks can also be **prevented** using transaction timestamps (an older transaction has a smaller timestamp). When Ti requests a lock held by Tj:

| Scheme | Ti older than Tj | Ti younger than Tj |
| --- | --- | --- |
| **Wait-die** (non-preemptive) | Ti **waits** | Ti **dies** (aborts, restarts later with the **same** timestamp) |
| **Wound-wait** (preemptive) | Ti **wounds** Tj (Tj aborts) | Ti **waits** |

In both schemes the older transaction is never aborted on behalf of a younger one, and a restarted transaction keeps its original timestamp, so it eventually becomes the oldest and cannot starve. Waits only ever go in one direction of age, so no cycle can form.

## Timestamp ordering

The **timestamp-ordering (TO) protocol** uses no locks. Each transaction T gets a timestamp TS(T) when it starts, and the schedule must be equivalent to the serial order of timestamps. For every item X the system keeps:

- **RTS(X)**: the largest timestamp of a transaction that read X,
- **WTS(X)**: the largest timestamp of a transaction that wrote X.

| Operation by T | Reject (abort T) if | Otherwise |
| --- | --- | --- |
| Read(X) | TS(T) < WTS(X): a younger transaction already wrote X | Read; RTS(X) = max(RTS(X), TS(T)) |
| Write(X) | TS(T) < RTS(X): a younger transaction already read X | |
| Write(X) | TS(T) < WTS(X): a younger transaction already wrote X | Write; WTS(X) = TS(T) |

**Thomas write rule**: in the last case, the write is *obsolete* (a younger write has already replaced it, and nobody read our value), so instead of aborting T the write is simply **ignored**. This accepts some schedules that are view serializable but not conflict serializable.

TO guarantees conflict serializability and freedom from deadlock (nobody waits), but can starve long transactions and does not by itself ensure recoverable schedules.

A simulation of the protocol makes the rules concrete. TS(T1) = 10, TS(T2) = 20, TS(T3) = 30:

```python
def timestamp_ordering(schedule, ts, thomas=False):
    rts, wts, aborted = {}, {}, set()
    for op in schedule.split():
        kind, t, x = op[0], int(op[1]), op[3]
        if t in aborted:
            continue
        if kind == "R":
            if ts[t] < wts.get(x, 0):
                aborted.add(t); print(op, "-> abort T%d (younger write exists)" % t)
            else:
                rts[x] = max(rts.get(x, 0), ts[t]); print(op, "-> ok")
        elif ts[t] < rts.get(x, 0):
            aborted.add(t); print(op, "-> abort T%d (younger read exists)" % t)
        elif ts[t] < wts.get(x, 0):
            if thomas:
                print(op, "-> ignored (Thomas write rule)")
            else:
                aborted.add(t); print(op, "-> abort T%d (younger write exists)" % t)
        else:
            wts[x] = ts[t]; print(op, "-> ok")
    return aborted

ts = {1: 10, 2: 20, 3: 30}
print("aborted:", timestamp_ordering("R1(A) R2(A) W2(A) W1(A) R3(B) W1(B)", ts))
print()
print("aborted:", timestamp_ordering("R2(B) W3(B) W2(B)", ts, thomas=True))
```
```output
R1(A) -> ok
R2(A) -> ok
W2(A) -> ok
W1(A) -> abort T1 (younger read exists)
R3(B) -> ok
aborted: {1}

R2(B) -> ok
W3(B) -> ok
W2(B) -> ignored (Thomas write rule)
aborted: set()
```

In the first schedule, W1(A) fails because T2 (younger) has already read A, so T1 is aborted and its later W1(B) is skipped. In the second, W2(B) is obsolete because T3 already wrote B, and nobody read T2's value; the Thomas write rule ignores it instead of aborting T2.

## Log-based recovery

To provide atomicity and durability, the DBMS writes a **log** of every change *before* the change reaches the disk (**write-ahead logging**, WAL). A log record looks like `<T1, A, 500, 400>`: T1 changed A from 500 (old value, for undo) to 400 (new value, for redo). `<T1 start>`, `<T1 commit>` and `<T1 abort>` mark the transaction boundaries.

After a crash, with **immediate update** (changes may reach the disk before commit):

- **Redo** every transaction whose `<commit>` is in the log (its changes may not have reached the disk).
- **Undo** every transaction that has a `<start>` but no `<commit>` or `<abort>` (its partial changes may have reached the disk). Undo goes backwards through the log.

A **checkpoint** writes all modified pages to disk and records `<checkpoint L>`, where L lists the active transactions. Recovery then only needs to look back to the last checkpoint: a transaction that committed **before** the checkpoint needs nothing.

Example log, crash after the last line:

```text
<T1 start>
<T1, A, 100, 150>
<T2 start>
<T1 commit>
<checkpoint {T2}>
<T3 start>
<T2, B, 200, 250>
<T3, C, 300, 350>
<T3 commit>
<T4 start>
<T4, D, 400, 450>
```

T1 committed before the checkpoint, so it is ignored. T3 committed after it, so **redo T3**. T2 and T4 never committed, so **undo T2 and T4**: B goes back to 200 and D to 400.

## Practice questions

```quiz
q: TS(T1) = 5, TS(T2) = 10, TS(T3) = 15. Under the basic timestamp-ordering protocol (no Thomas write rule), how many transactions are aborted while running S = W1(A) R2(A) W3(B) R1(B) W2(B) R3(A)? (An aborted transaction's later operations are skipped.)
answer: 2
verify:
  ts = {1: 5, 2: 10, 3: 15}
  rts, wts, aborted = {}, {}, set()
  for op in "W1(A) R2(A) W3(B) R1(B) W2(B) R3(A)".split():
      k, t, x = op[0], int(op[1]), op[3]
      if t in aborted: continue
      if k == "R":
          if ts[t] < wts.get(x, 0): aborted.add(t)
          else: rts[x] = max(rts.get(x, 0), ts[t])
      elif ts[t] < rts.get(x, 0) or ts[t] < wts.get(x, 0): aborted.add(t)
      else: wts[x] = ts[t]
  print(len(aborted))
explain: W1(A) and R2(A) are fine. W3(B) sets WTS(B) = 15. R1(B): 5 < WTS(B) = 15, so T1 aborts. W2(B): 10 < WTS(B) = 15, so T2 aborts. R3(A): 15 ≥ WTS(A) = 5, fine. Two transactions abort.
```

```quiz
q: Which statements about two-phase locking are **true**? (Select all that apply.)
* Basic 2PL guarantees conflict serializability
- Basic 2PL guarantees freedom from deadlock
* Strict 2PL produces cascadeless schedules
- Basic 2PL guarantees freedom from cascading rollback
explain: 2PL orders transactions by their lock points, so schedules are conflict serializable, but transactions can still wait for each other in a cycle. Only the strict variant, which keeps exclusive locks until commit, stops others from reading uncommitted data.
```

```quiz
q: Under **wound-wait**, an older transaction T1 requests a lock held by a younger transaction T2. What happens?
- T1 waits
- T1 is aborted
* T2 is aborted (wounded) and T1 gets the lock
- Both are aborted
explain: In wound-wait, an older requester preempts the younger holder. A younger requester waits for an older holder. (In wait-die it is the other way round: the older one waits and the younger one dies.)
```

```quiz
q: With TS(T1) < TS(T2), the schedule R1(A) W2(A) W1(A) runs under timestamp ordering **with** the Thomas write rule. What happens to W1(A)?
- T1 is aborted
* W1(A) is ignored and T1 continues
- W1(A) is executed, overwriting T2's value
- T2 is aborted
explain: When W1(A) arrives, RTS(A) = TS(T1), so no younger transaction has read A, but WTS(A) = TS(T2) > TS(T1): T1's write is obsolete. The Thomas write rule skips it. The final value of A is T2's, exactly as in the serial order T1, T2.
```

```quiz
q: For the example log in this lesson (crash after `<T4, D, 400, 450>`), which transactions must be **undone**? (Select all that apply.)
- T1
* T2
- T3
* T4
explain: Undo applies to transactions with a start record but no commit: T2 and T4. T3 committed after the checkpoint, so it is redone. T1 committed before the checkpoint, so it needs nothing.
```
