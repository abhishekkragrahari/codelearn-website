---
title: GATE CS Syllabus 2027 Subject-wise
chapter: Know the Exam
description: The GATE Computer Science syllabus for GATE 2027 aspirants, subject by subject, with the topics to study and links to free lessons for each section.
---
The GATE CS syllabus has a General Aptitude section and ten technical sections. This page lists every section with its topics, and links each one to the free lessons on this site.

> **Note:** This list follows the official GATE CS syllabus as published by the organising institute. The GATE 2027 syllabus is on the official website, [gate2027.iitm.ac.in](https://gate2027.iitm.ac.in/); check it once for any change before you finalise your plan.

## General Aptitude (15 marks)

Verbal, quantitative, analytical and spatial aptitude. Study it in the [General Aptitude](../ga/index.html) track.

## Section 1: Engineering Mathematics

- **Discrete Mathematics:** propositional and first-order logic; sets, relations, functions, partial orders and lattices; monoids and groups; graphs: connectivity, matching, colouring; combinatorics: counting, recurrence relations, generating functions. See [Discrete Mathematics](../dm/index.html).
- **Linear Algebra:** matrices, determinants, systems of linear equations, eigenvalues and eigenvectors, LU decomposition. See [Matrices](../em/matrices-determinants.html), [Linear equations](../em/linear-equations.html) and [Eigenvalues](../em/eigenvalues.html).
- **Calculus:** limits, continuity and differentiability, maxima and minima, mean value theorem, integration. See [Calculus](../em/calculus.html) and [Integration](../em/integration.html).
- **Probability and Statistics:** random variables; uniform, normal, exponential, Poisson and binomial distributions; mean, median, mode and standard deviation; conditional probability and Bayes' theorem. See [Probability](../em/probability.html), [Random variables](../em/random-variables.html) and [Statistics](../em/statistics.html).

## Section 2: Digital Logic

Boolean algebra; combinational and sequential circuits; minimization; number representations and computer arithmetic (fixed and floating point). See [Digital Logic](../dl/index.html).

## Section 3: Computer Organization and Architecture

Machine instructions and addressing modes; ALU, data path and control unit; instruction pipelining and pipeline hazards; memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode). See [Computer Organization](../coa/index.html).

## Section 4: Programming and Data Structures

Programming in C; recursion; arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs. See [C Programming](../c/index.html) and [Data Structures & Algorithms](../dsa/index.html).

## Section 5: Algorithms

Searching, sorting, hashing; asymptotic worst-case time and space complexity; algorithm design techniques: greedy, dynamic programming and divide-and-conquer; graph traversals, minimum spanning trees, shortest paths. See [Complexity](../dsa/complexity.html), [Sorting](../dsa/sorting-advanced.html), [Greedy](../dsa/greedy.html) and [Dynamic programming](../dsa/dynamic-programming.html).

## Section 6: Theory of Computation

Regular expressions and finite automata; context-free grammars and push-down automata; regular and context-free languages, pumping lemma; Turing machines and undecidability. See [Theory of Computation](../toc/index.html).

## Section 7: Compiler Design

Lexical analysis, parsing, syntax-directed translation; runtime environments; intermediate code generation; local optimisation; data flow analyses: constant propagation, liveness analysis, common subexpression elimination. See [Compiler Design](../cd/index.html).

## Section 8: Operating System

System calls, processes, threads, inter-process communication, concurrency and synchronization; deadlock; CPU and I/O scheduling; memory management and virtual memory; file systems. See [Operating Systems](../os/index.html).

## Section 9: Databases

ER model; relational model: relational algebra, tuple calculus, SQL; integrity constraints, normal forms; file organization, indexing (for example B and B+ trees); transactions and concurrency control. See [Databases](../dbms/index.html).

## Section 10: Computer Networks

Concept of layering: OSI and TCP/IP protocol stacks; basics of packet, circuit and virtual circuit switching; data link layer: framing, error detection, medium access control, Ethernet bridging; routing protocols: shortest path, flooding, distance vector and link state routing; fragmentation and IP addressing, IPv4, CIDR notation; basics of IP support protocols (ARP, DHCP, ICMP), network address translation (NAT); transport layer: flow control and congestion control, UDP, TCP, sockets; application layer protocols: DNS, SMTP, HTTP, FTP, email. See [Computer Networks](../cn/index.html).

## How to use the syllabus

- Print this list and tick each topic as you finish its lesson and its practice questions.
- Topics that cut across subjects (recursion, recurrences, counting, probability) pay off several times: learn them early.
- After the syllabus, follow a [6-month study plan](six-month-study-plan.html) or a [3-month study plan](three-month-study-plan.html), and revise with the [formula sheet](formula-sheet.html).

## Practice

```quiz
q: Which of these topics are part of the GATE CS syllabus? (Select all that apply.)
* Liveness analysis
* CIDR notation
* LU decomposition
- Fourier series
explain: Liveness analysis (Compiler Design), CIDR (Computer Networks) and LU decomposition (Linear Algebra) are in the CS syllabus. Fourier series is in the CE, ME, EE and EC papers, not CS.
```

```quiz
q: Under which GATE CS section are B and B+ trees listed?
- Algorithms
- Programming and Data Structures
* Databases
- Operating System
explain: B and B+ trees appear under Databases, as part of file organization and indexing.
```

```quiz
q: How many technical sections does the GATE CS syllabus have, not counting General Aptitude?
answer: 10
verify: len(["EM", "DL", "COA", "PDS", "Algo", "TOC", "CD", "OS", "DB", "CN"])
explain: Engineering Mathematics, Digital Logic, COA, Programming and Data Structures, Algorithms, TOC, Compiler Design, OS, Databases and Computer Networks: 10 sections.
```
