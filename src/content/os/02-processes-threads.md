---
title: Processes and Threads
chapter: Process Management
description: The process abstraction, process states, the PCB, context switches, fork(), and threads.
---
A **program** is a passive file on disk. A **process** is a program **in execution**: its code plus everything needed to run it, such as the current instruction, register values, memory and open files. Running the same program twice creates two separate processes.

```tree
caption: The memory layout of a process (addresses grow downwards in this picture)
Process address space
  Text | the program's machine code
  Data | global and static variables
  Heap | malloc / new; grows upwards
  Stack | function calls and local variables; grows downwards
```

## Process states

```graph
caption: Process state transitions
nodes: New Ready Running Waiting Done
New -> Ready
Ready -> Running
Running -> Ready
Running -> Waiting
Waiting -> Ready
Running -> Done
```

| Transition | When it happens |
| --- | --- |
| New → Ready | the process has been created and loaded |
| Ready → Running | the scheduler picks it (dispatch) |
| Running → Ready | its time slice ends (timer interrupt) or a higher-priority process arrives |
| Running → Waiting | it waits for I/O or an event |
| Waiting → Ready | the I/O or event completes |
| Running → Done (terminated) | it finishes or is killed |

Note that a waiting process never goes straight to Running: it first becomes Ready.

## The process control block

The OS keeps one **process control block (PCB)** per process, holding: the process ID, state, program counter, saved CPU registers, scheduling information (priority), memory-management information (page table pointer), open files and accounting data.

A **context switch** saves the running process's state into its PCB and loads the next process's state from its PCB. It is pure overhead: no useful work is done while switching.

## Creating processes with fork()

In Unix, `fork()` creates a **child** process that is an almost exact copy of the parent. It returns **0 in the child** and the **child's process ID (a positive number) in the parent**. `wait()` lets the parent wait for a child to finish.

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("child: fork returned 0\n");
        return 0;
    }
    wait(NULL);                     /* parent waits, so the child prints first */
    printf("parent: fork returned a positive pid? %s\n", pid > 0 ? "yes" : "no");
    return 0;
}
```
```output
child: fork returned 0
parent: fork returned a positive pid? yes
```

Every call to `fork()` doubles the number of processes running the code after it. So n `fork()` calls in a row create **2ⁿ processes** in total, that is **2ⁿ − 1 children**.

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    fork();
    fork();
    fork();
    printf("hello\n");
    fflush(stdout);
    while (wait(NULL) > 0) { }      /* wait for any children */
    return 0;
}
```
```output
hello
hello
hello
hello
hello
hello
hello
hello
```

## Threads

A **thread** is a unit of execution inside a process. Threads of the same process share its code, data, heap and open files, but each thread has its **own** program counter, registers and stack.

| | Process | Thread |
| --- | --- | --- |
| Memory | separate address space | shared with other threads of the process |
| Creation and switching cost | high | low |
| Communication | needs IPC (pipes, sockets, shared memory) | through shared variables |
| A crash affects | only that process | the whole process |

- **User-level threads** are managed by a library without kernel support: fast to switch, but if one thread makes a blocking system call, the whole process blocks.
- **Kernel-level threads** are known to the kernel: a blocked thread does not block the others, and threads can run on several CPUs at once.

## GATE-style practice questions

```quiz
q: A program executes `fork()` 5 times in a row (not inside any condition). How many **child** processes are created?
answer: 31
verify: 2 ** 5 - 1
explain: After n fork() calls there are 2ⁿ processes in total. One of them is the original parent, so 2⁵ − 1 = 31 are children.
```

```quiz
q: Consider the following code. How many times is `X` printed?

`for (int i = 0; i < 3; i++) { fork(); printf("X\n"); }` (stdout is flushed after every printf)
answer: 14
verify: sum(2 ** (i + 1) for i in range(3))
explain: In iteration i (0, 1, 2) the fork doubles the number of processes to 2^(i+1), and each of them prints once. Total prints: 2 + 4 + 8 = 14.
```

```quiz
q: Which items are **shared** by all threads of the same process? (Select all that apply.)
* Global variables
* Heap memory
- Stack
* Open file descriptors
explain: Threads share the whole address space (code, globals, heap) and the open files. Each thread has its own stack, registers and program counter, so that it can run its own sequence of function calls.
```

```quiz
q: Which state transition is **not** possible in the standard five-state process model?
- Running → Ready
- Running → Waiting
* Waiting → Running
- Waiting → Ready
explain: When the event a process is waiting for occurs, the process becomes Ready and must be dispatched by the scheduler again before it runs.
```
