---
title: Database Recovery: Logs, Undo and Redo
chapter: Transactions
description: Failure types, write-ahead logging, deferred and immediate database modification, undo and redo rules, checkpoints, shadow paging and the ARIES idea, with a worked recovery example.
---
**Atomicity** and **durability** (the A and D of ACID) must hold even if the system crashes in the middle of transactions. The **recovery manager** guarantees that after a crash the database contains the effects of every committed transaction and none of the effects of uncommitted ones.

## Kinds of failure

| Failure | Example | Handled by |
| --- | --- | --- |
| Transaction failure | Constraint violated, deadlock victim | Rolling back that transaction (undo) |
| System crash | Power loss; main memory lost, disk intact | Log-based recovery (undo + redo) |
| Media (disk) failure | Disk head crash | Backups (archive) plus the log |

## The log

The **log** is a sequential file on stable storage, with records such as:

- ⟨T start⟩, ⟨T commit⟩, ⟨T abort⟩
- ⟨T, X, old value, new value⟩ for each write

**Write-ahead logging (WAL) rule:** a log record must reach stable storage **before** the data item it describes is written to disk, and all of a transaction's log records (including ⟨T commit⟩) must be on disk before it is considered committed.

## Deferred and immediate modification

- **Deferred update:** the database is changed only after commit. Recovery needs only **redo** (no undo); log records need only the new value.
- **Immediate update:** changes may reach the database before commit. Recovery needs **undo** (for uncommitted transactions, using old values) and **redo** (for committed ones, using new values).

**Rules after a crash (immediate update):**

- **Redo** T if the log has both ⟨T start⟩ and ⟨T commit⟩.
- **Undo** T if the log has ⟨T start⟩ but no ⟨T commit⟩ (or ⟨T abort⟩).
- Undo runs **backwards** through the log, redo **forwards**. Both are **idempotent**: doing them twice gives the same result.

## Checkpoints

Scanning the whole log is slow. A **checkpoint** writes all modified buffers to disk and adds ⟨checkpoint L⟩, where L is the list of active transactions. After a crash:

- Transactions that **committed before the checkpoint** need nothing.
- Start from the last checkpoint: committed after it → **redo**; active at the crash → **undo** (undo may need to go further back to the start of those transactions).

```pipeline
caption: The log in the example below, oldest first
T1 start
T1, A, 100 → 150
T2 start
T1 commit
checkpoint {T2} | T1 is already safe
T2, B, 200 → 250
T3 start
T3, C, 300 → 350
T2 commit
T3, A, 150 → 120
crash | T3 never committed
```

## A worked recovery

```python
log = [
    ("start", "T1"), ("write", "T1", "A", 100, 150), ("start", "T2"),
    ("commit", "T1"), ("checkpoint", ["T2"]),
    ("write", "T2", "B", 200, 250), ("start", "T3"),
    ("write", "T3", "C", 300, 350), ("commit", "T2"),
    ("write", "T3", "A", 150, 120),
]                                                # crash here
db = {"A": 120, "B": 250, "C": 350}              # what happened to reach the disk

ck = max(i for i, rec in enumerate(log) if rec[0] == "checkpoint")
active = set(log[ck][1])                         # active at the checkpoint
committed = set()
for rec in log[ck + 1:]:
    if rec[0] == "start":
        active.add(rec[1])
    elif rec[0] == "commit":
        committed.add(rec[1])
redo = sorted(committed)
undo = sorted(active - committed)
print("redo:", ", ".join(redo), "| undo:", ", ".join(undo))

for rec in reversed(log):                        # undo backwards with old values
    if rec[0] == "write" and rec[1] in undo:
        db[rec[2]] = rec[3]
for rec in log[ck + 1:]:                         # redo forwards with new values
    if rec[0] == "write" and rec[1] in redo:
        db[rec[2]] = rec[4]
print("after recovery:", " ".join(f"{k}={v}" for k, v in sorted(db.items())))
```
```output
redo: T2 | undo: T3
after recovery: A=150 B=250 C=300
```

T1 committed before the checkpoint, so it is ignored. T2 is redone (B = 250). T3 is undone, restoring C = 300 and A = 150 (the value T1 committed).

## Other techniques

- **Shadow paging:** keep the old page table untouched while a transaction writes to new copies of pages; commit by switching a single pointer. No undo or redo, but data gets scattered and garbage must be collected.
- **ARIES** (used by real systems): WAL with log sequence numbers, three passes (**analysis, redo, undo**), "repeating history" during redo, and compensation log records during undo.
- **Steal/no-force** buffer policy (pages of uncommitted transactions may be written, and commits do not force pages to disk) gives the best performance and needs both undo and redo.

## GATE-style practice questions

```quiz
q: A log (immediate update) contains: ⟨T1 start⟩, ⟨T1 commit⟩, ⟨T2 start⟩, ⟨T3 start⟩, ⟨T3 commit⟩, ⟨T4 start⟩, then a crash. Which transactions are undone?
* T2 and T4
- T1 and T3
- T4 only
- T1, T2, T3 and T4
explain: Transactions with start but no commit are undone (T2, T4); committed ones (T1, T3) are redone.
```

```quiz
q: Under deferred database modification, recovery after a crash needs:
- Undo only
* Redo only
- Both undo and redo
- Neither
explain: Uncommitted transactions never touched the database, so there is nothing to undo; committed ones may need redo.
```

```quiz
q: The write-ahead logging rule says:
* A log record must be on stable storage before the data page it describes is written to disk
- Data pages must be written before their log records
- Logs are written only at checkpoints
- Each transaction writes its log after commit
explain: Writing the log first guarantees that the old value is available to undo any change that reached the disk.
```

```quiz
q: In the worked example, suppose T3 had committed just before the crash. What would be the value of A after recovery?
answer: 120
verify: 120
explain: T3 would then be redone, and its write sets A from 150 to 120.
```
