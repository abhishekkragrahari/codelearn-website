---
title: Medium Access Control and Ethernet
chapter: Data Link Layer
description: ALOHA and slotted ALOHA throughput, CSMA and CSMA/CD, minimum frame size, Ethernet frames and binary exponential backoff, and how learning switches and bridges forward frames.
---
When many stations share one channel (a bus cable, a radio frequency), two stations transmitting at once **collide** and both frames are lost. A **medium access control (MAC)** protocol decides who may send when.

## ALOHA

In **pure ALOHA**, a station sends whenever it has a frame. If a collision happens, it waits a random time and tries again.

A frame of duration T collides with any other frame that starts within T before or T after it, so its **vulnerable period is 2T**. If G is the average number of frames offered per frame time (new and retransmitted, as a Poisson process), the probability that no other frame starts in 2T is e<sup>−2G</sup>, so:

- **Pure ALOHA throughput: S = G · e<sup>−2G</sup>**, maximum **1/(2e) ≈ 18.4%** at G = 0.5.

In **slotted ALOHA**, time is divided into slots of one frame time, and stations may start only at the beginning of a slot. The vulnerable period shrinks to T:

- **Slotted ALOHA throughput: S = G · e<sup>−G</sup>**, maximum **1/e ≈ 36.8%** at G = 1.

With N stations that each transmit in a slot with probability p, a slot succeeds when exactly one station sends: **S = N · p · (1 − p)<sup>N−1</sup>**.

```python
import math

for G in (0.25, 0.5, 1.0, 2.0):
    print(f"G = {G:4}: pure {G * math.exp(-2 * G):.3f}   slotted {G * math.exp(-G):.3f}")
N, p = 4, 0.25
print(f"slotted, N = {N}, p = {p}: {N * p * (1 - p) ** (N - 1):.4f}")
```
```output
G = 0.25: pure 0.152   slotted 0.195
G =  0.5: pure 0.184   slotted 0.303
G =  1.0: pure 0.135   slotted 0.368
G =  2.0: pure 0.037   slotted 0.271
slotted, N = 4, p = 0.25: 0.4219
```

## CSMA

**Carrier sense multiple access (CSMA)**: listen before talking; send only if the channel is idle. Collisions still happen, because a station far away may have started sending a moment ago and its signal has not arrived yet (propagation delay).

| Variant | When the channel is busy |
| --- | --- |
| 1-persistent | Keep listening; send the moment it becomes idle (Ethernet) |
| Non-persistent | Wait a random time, then listen again |
| p-persistent (slotted) | When idle, send with probability p, otherwise wait one slot |

## CSMA/CD and the minimum frame size

**CSMA with collision detection** (classic Ethernet): while sending, a station also listens. If it detects a collision, it stops at once, sends a short **jam** signal, and backs off.

A station can only detect a collision **while it is still transmitting**. In the worst case, station A starts, and just before A's signal reaches the far end, station B starts. B's signal then needs another T<sub>p</sub> to come back to A: a total of **2T<sub>p</sub>**. So A must still be transmitting after 2T<sub>p</sub>:

**T<sub>t</sub> ≥ 2T<sub>p</sub>, that is, minimum frame length L<sub>min</sub> = 2 · T<sub>p</sub> · R**

Example: R = 10 Mbps and T<sub>p</sub> = 12.5 µs (2.5 km of cable at 2 × 10⁸ m/s): L<sub>min</sub> = 2 × 12.5 × 10⁻⁶ × 10⁷ = 250 bits. Classic Ethernet chose a 512-bit (64-byte) minimum frame, which also covers repeaters and the jam signal.

The efficiency of CSMA/CD is approximately **1 / (1 + 6.44a)** with a = T<sub>p</sub> / T<sub>t</sub>: short cables and long frames work best.

## Binary exponential backoff

After the **n-th** collision of the same frame, a station picks K uniformly at random from {0, 1, ..., 2<sup>m</sup> − 1}, where m = min(n, 10), and waits K × 512 bit times. After 16 failed attempts it gives up.

So after the first collision K ∈ {0, 1}; after the second K ∈ {0, 1, 2, 3}; and so on. Doubling the range makes repeated collisions less and less likely as the load grows.

Example: stations A and B collide on their first attempt. Both pick K from {0, 1}, so they collide again (pick the same K) with probability 2/4 = 1/2. If they collide a second time, both pick from {0, 1, 2, 3}, and they collide yet again with probability 4/16 = 1/4.

## Ethernet frames

| Field | Size (bytes) | Purpose |
| --- | --- | --- |
| Preamble + start frame delimiter | 7 + 1 | Clock synchronisation, frame start |
| Destination MAC address | 6 | |
| Source MAC address | 6 | |
| Type / length | 2 | Which network protocol is inside (0x0800 = IPv4) |
| Data (payload) | 46 to 1500 | Padded up to 46 if shorter |
| CRC (frame check sequence) | 4 | CRC-32 error detection |

Without the preamble, frames are 64 to 1518 bytes. The maximum payload of 1500 bytes is Ethernet's **MTU**. MAC address FF:FF:FF:FF:FF:FF is the **broadcast** address.

Modern Ethernet is **switched** and **full duplex**: each station has its own link to a switch, so there are no collisions and CSMA/CD is no longer used, but the frame format is unchanged.

## Learning switches and bridges

A **bridge** (a switch is a many-port bridge) connects LAN segments and forwards frames by MAC address. It builds its forwarding table by itself (**backward learning**):

1. When a frame arrives on port p from source address S, record "S is reachable via port p".
2. If the destination is in the table, forward the frame only to that port (or drop it if that is the port it came in on: **filtering**).
3. If the destination is unknown or is the broadcast address, **flood** the frame to all ports except the incoming one.

```python
def learning_switch(frames):
    table = {}
    for src, dst, port in frames:
        table[src] = port                      # learn where src lives
        if dst in table:
            action = "filter" if table[dst] == port else f"forward to port {table[dst]}"
        else:
            action = "flood"
        print(f"{src} -> {dst} on port {port}: {action}")
    return table

table = learning_switch([("A", "B", 1), ("B", "A", 2), ("C", "A", 3), ("A", "C", 1), ("D", "C", 3)])
print(table)
```
```output
A -> B on port 1: flood
B -> A on port 2: forward to port 1
C -> A on port 3: forward to port 1
A -> C on port 1: forward to port 3
D -> C on port 3: filter
{'A': 1, 'B': 2, 'C': 3, 'D': 3}
```

D and C are on the same port, so the switch filters the frame: D's segment already carried it to C.

If bridges are connected in a loop, flooded frames would circulate forever. The **Spanning Tree Protocol (STP)** prevents this: the bridges elect a **root bridge** (the lowest bridge ID), every bridge finds its shortest path to the root, and ports that are not on the resulting tree are **blocked**.

## Practice questions

```quiz
q: In slotted ALOHA, 4 stations each transmit in a given slot with probability 0.25, independently. What is the probability that a slot carries a successful transmission? Give your answer to two decimal places.
answer: 0.42
verify: round(4 * 0.25 * 0.75 ** 3, 2)
explain: Success needs exactly one of the 4 stations to transmit: 4 × 0.25 × 0.75³ = 0.421875 ≈ 0.42.
```

```quiz
q: A CSMA/CD network runs at 1 Gbps over a 1 km cable with a signal speed of 2 × 10⁸ m/s. What is the minimum frame size in **bytes**?
answer: 1250
verify: int(2 * (1000 / 2e8) * 1e9 / 8)
explain: T<sub>p</sub> = 1000 / (2 × 10⁸) = 5 µs. L<sub>min</sub> = 2 × 5 × 10⁻⁶ × 10⁹ = 10,000 bits = 1250 bytes.
```

```quiz
q: Stations A and B collide. For A it is the 1st collision of its frame and for B the 2nd collision of its frame, so A picks K from {0, 1} and B picks K from {0, 1, 2, 3}. What is the probability that A transmits first (A's K strictly smaller than B's)?
answer: 0.625
verify:
  from fractions import Fraction
  p = sum(Fraction(1, 2 * 4) for a in range(2) for b in range(4) if a < b)
  print(float(p))
explain: Of the 2 × 4 = 8 equally likely pairs, A's K is smaller in (0, 1), (0, 2), (0, 3), (1, 2) and (1, 3): 5/8 = 0.625.
```

```quiz
q: What is the maximum throughput of **pure** ALOHA, and at which offered load G is it reached?
- 36.8% at G = 1
* 18.4% at G = 0.5
- 18.4% at G = 1
- 50% at G = 0.5
explain: S = G·e<sup>−2G</sup> is largest at G = 0.5, giving 0.5 × e<sup>−1</sup> ≈ 0.184. Slotted ALOHA reaches 36.8% at G = 1.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* A learning switch floods a frame whose destination address is not in its table
* The Spanning Tree Protocol blocks some ports to remove loops
- A switch forwards a frame to the port it arrived on if the destination is on that port
* In CSMA/CD, a frame must take at least twice the propagation delay to transmit
explain: Unknown destinations are flooded. STP keeps a loop-free tree by blocking ports. A frame whose destination is on the incoming port is filtered (dropped), not sent back. T<sub>t</sub> ≥ 2T<sub>p</sub> guarantees the sender is still transmitting when a collision is detected.
```
