---
title: Introduction to Operating Systems
chapter: Basics
description: What an operating system does, user and kernel mode, system calls, interrupts and kernel designs.
---
An **operating system (OS)** is the software layer between application programs and the hardware. It has two main jobs:

- **Resource manager:** share the CPU, memory, disks and devices among many programs, fairly and safely.
- **Extended machine:** hide messy hardware details behind clean abstractions such as processes, files and sockets.

```tree
caption: Layers of a computer system
Users
  Application programs | browser, compiler, editor
    Operating system | kernel + system libraries
      Hardware | CPU, memory, disks, devices
```

## User mode and kernel mode

The CPU has (at least) two modes, selected by a **mode bit**:

- **Kernel mode** (supervisor mode): every instruction is allowed, including **privileged instructions** such as changing the page table, disabling interrupts, starting I/O or halting the CPU.
- **User mode:** privileged instructions are forbidden. If a user program tries one, the CPU raises an exception and the OS takes over.

This separation stops a buggy or malicious program from crashing the whole machine or reading another program's memory.

## System calls

A program in user mode asks the OS for a service (read a file, create a process, send data) through a **system call**. The call executes a special **trap** instruction that switches the CPU to kernel mode and jumps to a fixed OS entry point.

```pipeline
caption: What happens during a system call such as read()
User program | calls read()
Library wrapper | puts the call number in a register
Trap instruction | switch to kernel mode
Kernel handler | does the work
Return | back to user mode
```

Common system calls in Unix-like systems: `fork`, `exec`, `exit`, `wait` (processes); `open`, `read`, `write`, `close` (files); `mmap` (memory); `socket`, `send` (networking).

## Interrupts

An **interrupt** is a signal that makes the CPU pause what it is doing and run an **interrupt handler**:

| Kind | Caused by | Example |
| --- | --- | --- |
| Hardware interrupt | a device | disk finished a read, key pressed, timer tick |
| Trap (software interrupt) | an instruction, on purpose | system call |
| Exception (fault) | an instruction, by error | divide by zero, page fault, illegal instruction |

The **timer interrupt** is what lets the OS take the CPU back from a program that never gives it up: this is the basis of **preemptive** multitasking.

## Kinds of operating systems

| Type | Idea |
| --- | --- |
| Batch | run jobs one after another with no interaction |
| Multiprogramming | keep several jobs in memory; when one waits for I/O, run another (better CPU use) |
| Time-sharing (multitasking) | switch between programs so quickly that every user gets a fast response |
| Real-time | must meet deadlines (hard real-time: missing one is a failure) |
| Distributed | several connected machines appear as one system |

## Kernel designs

- **Monolithic kernel:** the whole OS (file systems, drivers, scheduling) runs in kernel mode as one program. Fast, but a bug anywhere can crash everything. Linux is monolithic (with loadable modules).
- **Microkernel:** only the essentials (scheduling, memory, message passing) run in kernel mode; file systems and drivers are user-mode servers. More robust, but extra message passing costs time. Examples: MINIX 3, QNX.
- **Hybrid:** a mix of both, for example Windows NT and macOS (XNU).

## GATE-style practice questions

```quiz
q: Which of the following instructions should be **privileged** (allowed only in kernel mode)? (Select all that apply.)
* Disable all interrupts
* Change the base register of the page table
- Read the current time of day
* Start an I/O operation on a disk controller
explain: Disabling interrupts, changing the page table and directly starting device I/O could let a program take over the machine or read other programs' data, so they must be privileged. Reading the clock is harmless and is allowed in user mode.
```

```quiz
q: A user program executes a system call. Which sequence describes what happens?
- The program jumps directly to the kernel function, which runs in user mode
* A trap switches the CPU to kernel mode, the kernel's handler runs, and control returns to user mode
- The OS copies the program into kernel memory and runs it there
- The hardware raises a page fault, which the kernel handles as the system call
explain: The trap instruction is the controlled way into the kernel: it changes the mode bit and jumps to a fixed entry point, so user code can never choose where in the kernel to start.
```

```quiz
q: Which statement about multiprogramming is **true**?
* It improves CPU utilisation by running another job while one job waits for I/O
- It requires a computer with more than one CPU
- It guarantees that every job finishes before its deadline
- It means one program is split into several threads
explain: Multiprogramming keeps several jobs in memory so that the CPU is not idle while a job waits for I/O. It works on a single CPU. Deadlines are the concern of real-time systems.
```
