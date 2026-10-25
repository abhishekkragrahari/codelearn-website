---
title: Circuit and Packet Switching
chapter: Basics
description: Circuit switching, datagram packet switching and virtual circuits, store-and-forward delay over several hops, and why splitting a message into packets helps.
---
A network must decide how data from many users shares the links. There are two basic approaches.

## Circuit switching

Before any data is sent, a **dedicated path** (a circuit) with a fixed share of bandwidth on every link is reserved from sender to receiver, as in the old telephone network.

- Three phases: **setup**, **data transfer**, **teardown**.
- During transfer, data flows with no queuing and in order, at a guaranteed rate.
- The reserved bandwidth is wasted whenever the users are silent, which for bursty computer traffic is most of the time.
- Time to send a message of L bits over a circuit of rate R: setup time + L/R + propagation delay. The message is not stored at intermediate switches.

## Packet switching

Data is cut into **packets**, each carrying a header with the destination. Links are shared on demand (**statistical multiplexing**); a packet that finds its link busy waits in a queue.

Routers work **store-and-forward**: a router must receive the **whole** packet before sending it on. So each hop costs a full transmission delay.

For a path of **N links** (N − 1 routers), all of rate R, ignoring queuing and processing:

| Sending | Total time |
| --- | --- |
| One packet of L bits | N · L/R + N · T<sub>p</sub> |
| P packets of L bits each, back to back | (N + P − 1) · L/R + N · T<sub>p</sub> |

The second formula comes from **pipelining**: the first packet needs N transmission times to arrive, and each of the remaining P − 1 packets arrives one transmission time after the previous one.

```python
def message_time(message_bits, packet_payload, header, links, rate):
    packets = -(-message_bits // packet_payload)          # ceiling division
    t_packet = (packet_payload + header) / rate
    return (links + packets - 1) * t_packet

msg, rate, links = 8000, 1_000_000, 3
print(f"one 8000-bit packet:  {message_time(msg, 8000, 0, links, rate) * 1000:.1f} ms")
print(f"8 packets, no header: {message_time(msg, 1000, 0, links, rate) * 1000:.1f} ms")
print(f"8 packets, 100-bit header each: {message_time(msg, 1000, 100, links, rate) * 1000:.1f} ms")
```
```output
one 8000-bit packet:  24.0 ms
8 packets, no header: 10.0 ms
8 packets, 100-bit header each: 11.0 ms
```

Splitting the message lets the links work in parallel: while router 1 forwards packet 1, the sender is already sending packet 2. But every packet carries a header, so packets that are too small waste bandwidth. GATE often asks for the packet size that gives the minimum total time.

## Datagrams and virtual circuits

Packet switching itself comes in two kinds:

| | Datagram network (IP) | Virtual-circuit network |
| --- | --- | --- |
| Setup before data | None | A path is set up first |
| Each packet carries | The full destination address | A short **virtual circuit identifier** (VCI) |
| Route of each packet | Chosen independently; packets may take different paths and arrive **out of order** | All packets follow the same path, **in order** |
| State in routers | Only a routing table | An entry for every circuit passing through |
| If a router fails | Packets are routed around it | Circuits through it are lost |
| Examples | The Internet (IP) | ATM, Frame Relay, MPLS |

A virtual circuit is still packet switching: the path is fixed, but bandwidth is not reserved, and packets queue as usual.

## Practice questions

```quiz
q: A 10,000-bit file is sent over 4 links of 1 Mbps each (3 store-and-forward routers). It is split into packets of 1000 data bits, each with a 100-bit header. Ignoring propagation, queuing and processing delays, how many **milliseconds** does the transfer take?
answer: 14.3
verify: round((4 + 10 - 1) * 1100 / 1e6 * 1000, 3)
explain: There are 10 packets of 1100 bits, each taking 1.1 ms per link. With pipelining, the time is (N + P − 1) × 1.1 ms = (4 + 10 − 1) × 1.1 = 14.3 ms.
```

```quiz
q: A 1000-byte message goes over 3 links (2 store-and-forward routers) of equal rate. Every packet has a 50-byte header. Which packet **payload** size gives the smallest total time?
code: python
  def time_units(payload, message=1000, header=50, links=3):
      packets = message // payload
      return (links + packets - 1) * (payload + header)

  print(min([100, 200, 500, 1000], key=time_units))
- `100`
* `200`
- `500`
- `1000`
explain: The time is proportional to (3 + P − 1) × (payload + 50), with P = 1000 / payload. Payload 100: 12 × 150 = 1800. Payload 200: 7 × 250 = 1750. Payload 500: 4 × 550 = 2200. Payload 1000: 3 × 1050 = 3150. The minimum is at 200 bytes.
```

```quiz
q: Which statements are **true** of virtual-circuit packet switching? (Select all that apply.)
* All packets of a connection follow the same path
* Routers keep state for each circuit
- Bandwidth is reserved on every link, as in circuit switching
- Each packet carries the full destination address
explain: A virtual circuit fixes the path at setup time and routers store per-circuit entries, so packets carry only a short circuit identifier. Bandwidth is still shared on demand: packets queue as in any packet network.
```

```quiz
q: A single 5000-bit packet crosses 5 links of 1 Mbps each, with a propagation delay of 2 ms on each link. Ignoring queuing and processing, what is the end-to-end delay in **ms**?
answer: 35
verify: round(5 * (5000 / 1e6 + 0.002) * 1000, 3)
explain: Each link costs a transmission delay of 5000 / 10⁶ s = 5 ms (store-and-forward) plus 2 ms of propagation: 7 ms per link, 35 ms for 5 links.
```
