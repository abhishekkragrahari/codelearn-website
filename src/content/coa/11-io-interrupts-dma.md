---
title: I/O, Interrupts and DMA
chapter: Input/Output
description: I/O interfaces and ports, programmed I/O, interrupt-driven I/O, vectored and prioritised interrupts, daisy chaining, direct memory access in burst and cycle-stealing modes, and calculating the CPU time each method costs.
---
Devices are slow and varied, so the CPU talks to them through **I/O interfaces** (controllers) that have **data, status and control registers**. There are two ways to address those registers:

- **Memory-mapped I/O**: device registers occupy memory addresses; ordinary load and store instructions access them.
- **Isolated (port-mapped) I/O**: a separate I/O address space with special instructions (IN, OUT on x86).

The question is then how the CPU knows **when** a device is ready. There are three methods.

## Programmed I/O (polling)

The CPU repeatedly reads the device's status register until it shows "ready", then transfers one word. Simple, but the CPU does nothing useful while waiting (**busy waiting**), and slow devices waste enormous numbers of cycles.

## Interrupt-driven I/O

The device signals the CPU with an **interrupt** when it is ready. The CPU then:

1. finishes the current instruction,
2. saves the PC and status (and disables or masks interrupts as needed),
3. finds the **interrupt service routine (ISR)** and runs it,
4. restores the saved state and returns to the interrupted program.

Finding the ISR:

- **Vectored interrupts**: the device supplies a number (vector) that indexes a table of ISR addresses.
- **Non-vectored**: the CPU jumps to a fixed address and polls the devices in software to find which one interrupted.

When several devices interrupt at once, **priority** decides:

- **Daisy chaining**: the interrupt-acknowledge signal passes from device to device in a chain; the first requesting device in the chain takes it. Priority is fixed by position, and devices at the end can starve.
- **Priority interrupt controller**: a dedicated chip ranks the request lines and gives the highest-priority vector.
- **Nested interrupts**: a higher-priority interrupt may interrupt a lower-priority ISR.

Interrupts free the CPU while the device works, but every transfer still costs an interrupt (saving and restoring state, running the ISR). For fast devices transferring many words, that overhead is too high.

## Direct memory access (DMA)

A **DMA controller** moves a whole block between the device and memory **without the CPU**. The CPU only:

1. programs the controller (memory address, word count, direction),
2. goes on with other work,
3. receives **one interrupt** when the whole block is done.

The DMA controller needs the memory bus, which it takes from the CPU:

| Mode | How the bus is shared |
| --- | --- |
| **Burst (block) mode** | DMA keeps the bus until the whole block is transferred; the CPU cannot use memory meanwhile. Fastest transfer |
| **Cycle stealing** | DMA takes the bus for one word at a time, between CPU memory cycles; the CPU slows down slightly but keeps running |
| **Transparent (hidden)** | DMA uses the bus only in cycles when the CPU does not need it; no slowdown, slowest transfer |

## How much CPU time does each method cost?

Consider a device that transfers 1 MB (2²⁰ bytes) per second to a 1 GHz CPU:

```python
cpu_hz, rate = 1e9, 2 ** 20                     # bytes per second

interrupt_cycles = 200                           # one interrupt per byte
print(f"interrupt per byte: {rate * interrupt_cycles / cpu_hz:.2%} of the CPU")

block, dma_overhead = 4 * 1024, 1000 + 500       # set-up + completion interrupt per block
blocks = rate / block
print(f"DMA with 4 KB blocks: {blocks:.0f} blocks/s, {blocks * dma_overhead / cpu_hz:.4%} of the CPU")

steal_time, byte_interval = 50e-9, 2e-6          # cycle stealing: 50 ns per byte, a byte every 2 us
print(f"cycle stealing: CPU blocked {steal_time / byte_interval:.1%} of the time")
```
```output
interrupt per byte: 20.97% of the CPU
DMA with 4 KB blocks: 256 blocks/s, 0.0384% of the CPU
cycle stealing: CPU blocked 2.5% of the time
```

A fifth of the CPU goes to handling one interrupt per byte, but DMA costs only a few hundredths of a percent, because the overhead is paid once per 4 KB block.

The general recipe:

- **Fraction of CPU time** = (overhead per event × events per second) / (CPU cycles per second).
- For **cycle stealing**, the fraction of time the CPU is blocked = (time DMA holds the bus per word) / (time between words).
- For **burst** mode, the CPU is blocked for the whole transfer time of the block (block size / transfer rate).

## Practice questions

```quiz
q: A device delivers 10⁵ bytes per second, and the CPU handles each byte with an interrupt that takes 2 µs in total. What percentage of the CPU's time is spent on these interrupts?
answer: 20
verify: round(1e5 * 2e-6 * 100, 6)
explain: 10⁵ interrupts per second × 2 µs = 0.2 s of every second: 20%.
```

```quiz
q: A DMA controller in burst mode transfers a 2 KB (2048-byte) block at 8 × 10⁶ bytes per second. For how many microseconds is the CPU kept off the memory bus?
answer: 256
verify: round(2048 / 8e6 * 1e6, 6)
explain: Burst mode holds the bus for the whole block: 2048 / (8 × 10⁶) s = 256 µs.
```

```quiz
q: In cycle-stealing mode, the DMA controller holds the bus for 40 ns per word, and the device produces one word every 1 µs. What percentage of the time is the CPU blocked from memory?
answer: 4
verify: round(40e-9 / 1e-6 * 100, 6)
explain: The CPU loses the bus 40 ns out of every 1000 ns: 4%.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* With DMA, the CPU is interrupted once per block rather than once per word
* In daisy chaining, the device closest to the CPU in the chain has the highest priority
- Programmed I/O frees the CPU while waiting for the device
* Memory-mapped I/O accesses device registers with ordinary load and store instructions
explain: DMA interrupts only on completion. The acknowledge signal reaches the nearest device first. Programmed I/O makes the CPU busy-wait on the status register. Memory-mapped registers sit in the memory address space.
```
