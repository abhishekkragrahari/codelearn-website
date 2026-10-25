---
title: Introduction and Layering
chapter: Basics
description: What a network is, the OSI and TCP/IP models, encapsulation, which device works at which layer, and the four kinds of delay.
---
A **computer network** is a set of devices (hosts, switches, routers) connected by links that carry data between them. The Internet is a network of networks, all speaking the same protocols.

## Why layers

Sending a web page involves many separate problems: turning bits into signals, getting a frame to the next machine, finding a route across the world, recovering lost data, and understanding HTTP. **Layering** gives each problem to one layer. Each layer:

- offers a **service** to the layer above it,
- uses the service of the layer below it, and
- talks to the **same layer** on the other machine using a **protocol**.

A layer can change its implementation (for example, Wi-Fi instead of Ethernet) without the others noticing.

## The OSI and TCP/IP models

| # | OSI layer | Job | Unit of data (PDU) | TCP/IP model |
| --- | --- | --- | --- | --- |
| 7 | Application | Services for applications (HTTP, DNS, SMTP) | Message | Application |
| 6 | Presentation | Data format, encryption, compression | Message | Application |
| 5 | Session | Dialogue control, checkpoints | Message | Application |
| 4 | Transport | **Process-to-process** delivery, reliability, flow and congestion control | **Segment** (TCP) / datagram (UDP) | Transport |
| 3 | Network | **Host-to-host** delivery across networks: addressing and routing | **Packet** (datagram) | Internet |
| 2 | Data link | **Node-to-node** delivery on one link: framing, MAC addresses, error detection | **Frame** | Link |
| 1 | Physical | Bits as signals on the medium | Bit | Link |

The TCP/IP model merges OSI layers 5–7 into one application layer, and layers 1–2 into the link layer (some books count physical separately and call it a five-layer model).

A mnemonic for OSI from the bottom: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way.

## Encapsulation

On the way down, each layer adds its own **header** (and the data link layer also a trailer) to what it gets from above. The receiver strips them in reverse order.

```pipeline
caption: Encapsulation of an HTTP request on the sender
Application | HTTP message
Transport | TCP header + message = segment
Network | IP header + segment = packet
Data link | Ethernet header + packet + trailer = frame
Physical | bits on the wire
```

## Addresses at each layer

| Layer | Address | Example | Identifies |
| --- | --- | --- | --- |
| Transport | **Port number** (16 bits) | 443 | A process on a host |
| Network | **IP address** (32 bits in IPv4) | 192.168.1.10 | A host interface, globally |
| Data link | **MAC address** (48 bits) | 3c:22:fb:1a:09:7e | A network card, on the local link |

## Devices and layers

| Device | Highest layer it understands | What it does |
| --- | --- | --- |
| Repeater, hub | Physical (1) | Regenerates bits; a hub repeats them to every port |
| Bridge, switch | Data link (2) | Forwards frames using MAC addresses |
| Router | Network (3) | Forwards packets between networks using IP addresses |
| Gateway, firewall, proxy | Up to application (7) | Translates or filters at higher layers |

A hub forms one **collision domain** and one **broadcast domain**. A switch splits collision domains (one per port) but keeps one broadcast domain. A router splits broadcast domains too.

## Delays

The time for one packet to cross one link is the sum of four delays:

| Delay | Formula | Depends on |
| --- | --- | --- |
| **Transmission** delay | T<sub>t</sub> = L / R (packet length / bandwidth) | Packet size and link speed |
| **Propagation** delay | T<sub>p</sub> = d / v (distance / signal speed) | Link length (v ≈ 2 × 10⁸ m/s in copper or fibre) |
| Queuing delay | Waiting in the router's buffer | Traffic load |
| Processing delay | Checking headers, looking up routes | Router speed |

Transmission delay is the time to *push* all bits onto the link; propagation delay is the time for one bit to *travel* to the other end. A wide motorway (high bandwidth) gets the cars on faster, but does not make the journey shorter.

The **bandwidth–delay product** R × T<sub>p</sub> is the number of bits "in flight" on the link at once: the link's capacity as a pipe.

```python
L = 1000 * 8          # packet: 1000 bytes, in bits
R = 1_000_000         # bandwidth: 1 Mbps
d = 2_000_000         # distance: 2000 km, in metres
v = 2e8               # signal speed in m/s

Tt = L / R
Tp = d / v
print(f"transmission delay = {Tt * 1000:.1f} ms")
print(f"propagation delay  = {Tp * 1000:.1f} ms")
print(f"total (no queuing) = {(Tt + Tp) * 1000:.1f} ms")
print(f"bandwidth-delay product = {R * Tp:.0f} bits")
```
```output
transmission delay = 8.0 ms
propagation delay  = 10.0 ms
total (no queuing) = 18.0 ms
bandwidth-delay product = 10000 bits
```

## Practice questions

```quiz
q: A 1500-byte packet is sent over a 10 Mbps link that is 3000 km long, with a signal speed of 2 × 10⁸ m/s. Ignoring queuing and processing, how many **milliseconds** does it take from the first bit leaving the sender to the last bit arriving?
answer: 16.2
verify: round((1500 * 8 / 10e6 + 3000e3 / 2e8) * 1000, 3)
explain: Transmission delay = 12,000 bits / 10⁷ bps = 1.2 ms. Propagation delay = 3 × 10⁶ m / 2 × 10⁸ m/s = 15 ms. The last bit leaves after 1.2 ms and arrives 15 ms later: 16.2 ms.
```

```quiz
q: A 100 Mbps link has a round-trip time of 40 ms. How many **bytes** can the sender transmit during one round-trip time?
answer: 500000
verify: int(100e6 * 0.040 / 8)
explain: Bits in one RTT = 10⁸ × 0.04 = 4 × 10⁶ bits = 500,000 bytes. This is why TCP needs large windows on fast long-distance links.
```

```quiz
q: Which layer is responsible for **process-to-process** delivery?
- Network
* Transport
- Data link
- Session
explain: The network layer delivers packets from host to host; the transport layer uses port numbers to deliver data to the right process on that host.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* A switch separates collision domains but not broadcast domains
* A router separates broadcast domains
- A hub separates collision domains
* Routers forward using IP addresses and switches using MAC addresses
explain: Each switch port is its own collision domain, but broadcasts still reach every port. A router does not forward link-layer broadcasts. A hub repeats every bit to every port, so all its ports share one collision domain.
```

```quiz
q: Doubling the bandwidth of a link changes which delay?
* Transmission delay (it halves)
- Propagation delay (it halves)
- Both transmission and propagation delay
- Neither
explain: Transmission delay is L / R, so doubling R halves it. Propagation delay d / v depends only on distance and the medium.
```
