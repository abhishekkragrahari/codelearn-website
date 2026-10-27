---
title: The IP Protocol, Fragmentation, ARP, DHCP, ICMP and NAT
chapter: Network Layer
description: The IPv4 header field by field, fragmentation and offsets, TTL, and the protocols that support IP (ARP, DHCP, ICMP, NAT), with a look at IPv6.
---
IP delivers **datagrams** from a source host to a destination host across many networks. It is **connectionless** and **best effort**: datagrams may be lost, duplicated or delivered out of order, and IP does nothing about it. Reliability is left to TCP.

## The IPv4 header

The header is 20 bytes without options, and at most 60 bytes.

| Field | Bits | Meaning |
| --- | --- | --- |
| Version | 4 | 4 for IPv4 |
| **HLEN** (header length) | 4 | Header length in **4-byte words**: 5 (20 bytes) to 15 (60 bytes) |
| Type of service / DSCP | 8 | Priority and congestion marking |
| **Total length** | 16 | Header + data, in bytes: at most 65,535 |
| **Identification** | 16 | The same for all fragments of one datagram |
| Flags | 3 | **DF** (don't fragment), **MF** (more fragments follow) |
| **Fragment offset** | 13 | Position of this fragment's data, in **units of 8 bytes** |
| **TTL** (time to live) | 8 | Decremented by every router; the datagram is discarded at 0 |
| Protocol | 8 | What is inside: 1 = ICMP, 6 = TCP, 17 = UDP |
| Header checksum | 16 | Covers the header only; recomputed at every router, because the TTL changes |
| Source address, destination address | 32 + 32 | |
| Options | 0–320 | Rarely used |

Two quick consequences:

- Data length = total length − 4 × HLEN. With HLEN = 8 and total length 1000, the header is 32 bytes and the data 968 bytes.
- TTL stops a datagram from looping forever when routing tables are wrong. `traceroute` sends datagrams with TTL = 1, 2, 3, ... and collects the ICMP "time exceeded" messages each router returns.

## Fragmentation

Every link has a **maximum transmission unit (MTU)**, the largest IP datagram it can carry (1500 bytes on Ethernet). A router that must forward a datagram larger than the next link's MTU splits it into **fragments**, each a datagram with its own header. Fragments are **reassembled only at the destination**, never by routers.

Rules for each fragment:

1. The data in every fragment except the last must be a **multiple of 8 bytes** (because the offset counts 8-byte units).
2. **Offset** = (position of the fragment's first data byte in the original data) / 8.
3. **MF = 1** on every fragment except the last; the identification is copied from the original.
4. If **DF = 1** and fragmentation is needed, the router drops the datagram and sends an ICMP error.

Example: a 4000-byte datagram (20-byte header, 3980 bytes of data) reaches a link with MTU 1500. Each fragment can carry at most ⌊(1500 − 20) / 8⌋ × 8 = 1480 bytes of data.

```python
def fragment(total_length, mtu, header=20):
    data = total_length - header
    per_fragment = (mtu - header) // 8 * 8      # multiple of 8 bytes
    frags, start = [], 0
    while start < data:
        size = min(per_fragment, data - start)
        more = start + size < data
        frags.append((size + header, start // 8, int(more)))
        start += size
    return frags

print("total length  offset  MF")
for length, offset, mf in fragment(4000, 1500):
    print(f"{length:12}  {offset:6}  {mf:2}")
```
```output
total length  offset  MF
        1500       0   1
        1500     185   1
        1040     370   0
```

The offsets 0, 185 and 370 mean the data starts at bytes 0, 185 × 8 = 1480 and 370 × 8 = 2960. Fragmentation adds overhead: three headers (60 bytes) instead of one.

The receiver knows it has every fragment when the pieces cover the data from offset 0 to the fragment with MF = 0 without gaps. If any fragment is lost, the **whole** datagram is discarded. Because of this, modern hosts prefer **path MTU discovery** (send with DF = 1 and shrink the size whenever an ICMP "fragmentation needed" error comes back) instead of relying on fragmentation.

## ARP: from IP address to MAC address

To send a datagram to the next hop on an Ethernet, the sender needs the next hop's **MAC address**. The **Address Resolution Protocol (ARP)** finds it:

1. The sender **broadcasts** an ARP request: "Who has 192.168.1.1? Tell 192.168.1.10."
2. The owner of that address **unicasts** an ARP reply with its MAC address.
3. Both sides store the mapping in their **ARP cache** for a few minutes.

If the destination is on another network, the sender resolves the MAC address of its **default gateway** (router), not of the final destination. The IP addresses in the datagram stay the same along the path; the MAC addresses change at every hop.

## DHCP: getting an address

A new host has no IP address. The **Dynamic Host Configuration Protocol** gives it one, together with the subnet mask, default gateway and DNS server, as a time-limited **lease**. It runs over UDP (server port 67, client port 68) in four steps, known as **DORA**:

```pipeline
caption: Getting an address with DHCP
Discover | client broadcasts
Offer | server proposes an address
Request | client broadcasts its choice
Acknowledge | server confirms the lease
```

The client uses 0.0.0.0 as its source address and 255.255.255.255 as the destination until it has an address.

## ICMP: errors and diagnostics

The **Internet Control Message Protocol** carries error reports and queries for IP. ICMP messages travel inside IP datagrams (protocol 1).

| Message | Sent when |
| --- | --- |
| Echo request / echo reply | `ping` tests whether a host is reachable |
| Destination unreachable | No route, host down, port closed, or fragmentation needed with DF = 1 |
| Time exceeded | TTL reached 0 (used by `traceroute`), or reassembly timed out |
| Redirect | A better first-hop router exists |

No ICMP error is ever sent about an ICMP error message, a fragment other than the first, or a broadcast datagram, so errors cannot multiply.

## NAT: many hosts behind one address

**Network Address Translation** lets a whole private network (addresses such as 192.168.x.x) share one public IP address. The NAT router rewrites each outgoing datagram's source (private address, port) to (public address, new port), records the mapping in a **translation table**, and reverses the rewrite for replies.

| Private side | Public side |
| --- | --- |
| 192.168.1.10 : 51000 | 203.0.113.5 : 40001 |
| 192.168.1.11 : 51000 | 203.0.113.5 : 40002 |

NAT saves IPv4 addresses, but it breaks the end-to-end model: a host outside cannot start a connection to a host inside unless a mapping (port forwarding) is set up. Because it rewrites addresses and ports, NAT must also recompute the IP and TCP/UDP checksums.

## IPv6 in brief

| | IPv4 | IPv6 |
| --- | --- | --- |
| Address size | 32 bits | **128 bits**, written as 8 groups of hex: 2001:db8::1 |
| Header | 20–60 bytes, with options | Fixed **40 bytes**; options moved to extension headers |
| Header checksum | Yes | **No** (left to link and transport layers) |
| Fragmentation | By routers and hosts | **Only by the source host** |
| Address configuration | DHCP or manual | Also stateless autoconfiguration |
| Broadcast | Yes | No (multicast instead) |

## Practice questions

```quiz
q: A datagram with total length 2400 bytes (20-byte header) is sent over a link with MTU 820 bytes. What is the fragment offset field of the **last** fragment?
answer: 200
verify:
  data, per = 2400 - 20, (820 - 20) // 8 * 8
  starts = list(range(0, data, per))
  print(starts[-1] // 8)
explain: Each fragment carries at most ⌊800 / 8⌋ × 8 = 800 data bytes. The 2380 data bytes split into 800 + 800 + 780, starting at bytes 0, 800 and 1600. The last offset is 1600 / 8 = 200.
```

```quiz
q: For the same datagram (2400 bytes total, 20-byte header, MTU 820), how many bytes in total (headers included) are sent over the link after fragmentation?
answer: 2440
verify:
  data, per = 2400 - 20, (820 - 20) // 8 * 8
  frags = [min(per, data - s) for s in range(0, data, per)]
  print(sum(frags) + 20 * len(frags))
explain: There are 3 fragments, each with its own 20-byte header: 2380 + 3 × 20 = 2440 bytes, 40 more than the original datagram.
```

```quiz
q: An IPv4 header has HLEN = 7 and the total length field is 500. How many bytes of data does the datagram carry?
answer: 472
verify: 500 - 7 * 4
explain: HLEN counts 4-byte words, so the header is 7 × 4 = 28 bytes and the data 500 − 28 = 472 bytes.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* IP fragments are reassembled only at the final destination
* The IPv4 header checksum is recomputed at every router
- ARP replies are always broadcast
* The IPv6 header has no checksum field
explain: Routers forward fragments independently and never reassemble them. The checksum must be recomputed because the TTL changes at each hop. ARP requests are broadcast, but replies are unicast. IPv6 dropped the header checksum.
```

```quiz
q: Host H on network N1 sends an IP datagram to host K on another network, through router R. In the Ethernet frame that leaves H, what are the destination MAC and destination IP addresses?
- K's MAC address and K's IP address
* R's MAC address and K's IP address
- R's MAC address and R's IP address
- K's MAC address and R's IP address
explain: The frame only goes to the next hop, the router, so it carries R's MAC address (found with ARP). The datagram inside keeps the final destination's IP address, K's, all the way.
```
