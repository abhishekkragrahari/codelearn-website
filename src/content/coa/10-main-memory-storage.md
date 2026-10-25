---
title: Main Memory and Secondary Storage
chapter: Memory
description: SRAM and DRAM, refresh, building a memory from smaller chips, address decoding, memory interleaving, and disk capacity and access time.
---
## SRAM and DRAM

| | SRAM (static) | DRAM (dynamic) |
| --- | --- | --- |
| Bit stored in | A flip-flop (about 6 transistors) | A capacitor and 1 transistor |
| Refresh | Not needed | **Needed**: the charge leaks away within milliseconds |
| Speed | Fast | Slower |
| Density and cost per bit | Low density, expensive | High density, cheap |
| Used for | Caches, registers | Main memory |

Both are **volatile** (lose their contents without power). ROM, PROM, EPROM, EEPROM and flash are non-volatile.

**DRAM refresh**: every row must be read and rewritten within the refresh period. With 8192 rows and a 64 ms period, a row must be refreshed every 64 ms / 8192 ≈ 7.8 µs (distributed refresh), or all rows can be refreshed in one burst (burst refresh, during which memory is unavailable).

## Building memory from chips

Memory chips are organised as **words × bits** (for example 8K × 8: 8192 locations of 8 bits). To build a larger memory:

- **Wider words**: place chips side by side, sharing the address lines (16 bits from two ×8 chips).
- **More words**: stack rows of chips and use the high-order address bits, through a **decoder**, to select the row (chip select).

**Number of chips** = (total words / words per chip) × (bits per word / bits per chip).

Example: a 64K × 16 memory from 8K × 8 chips needs (64K / 8K) × (16 / 8) = 8 × 2 = **16 chips**, arranged as 8 rows of 2. The address has 16 bits: the low 13 go to every chip, and the high 3 drive a 3-to-8 decoder that selects one row.

```python
from math import log2

def memory_design(total_words, word_bits, chip_words, chip_bits):
    rows, cols = total_words // chip_words, word_bits // chip_bits
    return {"chips": rows * cols, "rows": rows, "chips per row": cols,
            "address bits": int(log2(total_words)), "bits to each chip": int(log2(chip_words)),
            "decoder": f"{int(log2(rows))}-to-{rows}"}

print(memory_design(64 * 1024, 16, 8 * 1024, 8))
print(memory_design(256 * 1024, 32, 16 * 1024, 8))
```
```output
{'chips': 16, 'rows': 8, 'chips per row': 2, 'address bits': 16, 'bits to each chip': 13, 'decoder': '3-to-8'}
{'chips': 64, 'rows': 16, 'chips per row': 4, 'address bits': 18, 'bits to each chip': 14, 'decoder': '4-to-16'}
```

## Memory interleaving

Memory is split into several **modules (banks)** that can work in parallel.

- **Low-order interleaving**: consecutive addresses go to consecutive modules (module = address mod m). A block transfer can start accesses in all m modules at once, so sequential reads get up to m times the bandwidth. This is what caches need when they fetch a block.
- **High-order interleaving**: the high address bits choose the module, so consecutive addresses stay in the same module. Simple to expand, but no parallelism for sequential access.

## Disks

A disk has several **platters** with two **surfaces** each; each surface has **tracks**, divided into **sectors**. The tracks at the same position on all surfaces form a **cylinder**.

**Capacity = surfaces × tracks per surface × sectors per track × bytes per sector.**

Example: 16 surfaces, 1024 tracks, 256 sectors of 512 bytes: 2⁴ × 2¹⁰ × 2⁸ × 2⁹ = 2³¹ bytes = 2 GiB.

**Access time = seek time + rotational latency + transfer time (+ controller overhead).**

- Seek time: moving the arm to the track (an average is usually given).
- Rotational latency: on average **half a rotation**. At 6000 RPM, one rotation takes 10 ms, so the average latency is 5 ms.
- Transfer time: (bytes to transfer) / (transfer rate), or for one sector, rotation time / sectors per track (10 ms / 256 ≈ 0.039 ms above).

The OS lessons on file systems and disk scheduling cover how the OS uses the disk.

## Practice questions

```quiz
q: How many 16K × 8 memory chips are needed to build a 256K × 32 memory?
answer: 64
verify: (256 // 16) * (32 // 8)
explain: 256K / 16K = 16 rows, and 32 / 8 = 4 chips per row: 16 × 4 = 64 chips. The row is selected by a 4-to-16 decoder from the top 4 of the 18 address bits.
```

```quiz
q: A DRAM has 8192 rows that must all be refreshed every 64 ms, using distributed refresh. How often (in µs) must a row refresh happen? Give the answer to two decimal places.
answer: 7.81
verify: round(64e-3 / 8192 * 1e6, 2)
explain: 64 ms / 8192 = 7.8125 µs ≈ 7.81 µs between row refreshes.
```

```quiz
q: A disk spins at 7200 RPM and has an average seek time of 5 ms. Reading a 4 KB block takes 4096 bytes at 100 MB/s (10⁸ bytes per second). What is the average time to read the block, in ms? Give the answer to two decimal places.
answer: 9.21
verify: round(5 + 60 / 7200 * 1000 / 2 + 4096 / 100e6 * 1000, 2)
explain: Seek 5 ms + average rotational latency (half of 60 / 7200 s = 8.33 ms) 4.17 ms + transfer 4096 / 10⁸ s ≈ 0.04 ms ≈ 9.21 ms.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* DRAM needs periodic refresh, SRAM does not
* Low-order interleaving puts consecutive addresses in different modules
- SRAM is denser and cheaper per bit than DRAM
* Average rotational latency is half the time of one rotation
explain: DRAM capacitors leak, SRAM flip-flops do not. Low-order interleaving uses the low address bits to choose the module. SRAM needs about 6 transistors per bit, so it is less dense and more expensive. On average the wanted sector is half a turn away.
```
