---
title: IPv4 Addressing, Subnets and CIDR
chapter: Network Layer
description: IPv4 addresses, classful addressing, subnet masks, CIDR notation, subnetting and VLSM, route aggregation and longest prefix matching.
---
Every interface on the Internet has an **IP address**. An IPv4 address is 32 bits, written as four decimal bytes: `192.168.10.77` is 11000000.10101000.00001010.01001101.

An address has two parts: a **network prefix** (which network) and a **host part** (which interface on that network). Routers only look at the prefix, which keeps routing tables small.

## Classful addressing (historical)

Originally the class, and so the split, was fixed by the first bits of the address:

| Class | First bits | First byte | Default mask | Networks | Hosts per network |
| --- | --- | --- | --- | --- | --- |
| A | 0 | 0–127 | /8 (255.0.0.0) | 2⁷ (126 usable) | 2²⁴ − 2 |
| B | 10 | 128–191 | /16 (255.255.0.0) | 2¹⁴ | 2¹⁶ − 2 = 65,534 |
| C | 110 | 192–223 | /24 (255.255.255.0) | 2²¹ | 2⁸ − 2 = 254 |
| D | 1110 | 224–239 | | Multicast | |
| E | 1111 | 240–255 | | Reserved | |

Fixed sizes wasted addresses: an organisation with 300 hosts needed a class B network of 65,534 addresses. Classless addressing (CIDR) replaced this.

## Masks and CIDR notation

A **subnet mask** has 1s over the network part and 0s over the host part. **CIDR** notation writes the number of 1s after a slash: `192.168.10.77/26` means mask 255.255.255.192.

For an address with prefix length n (h = 32 − n host bits):

- **Network address** = address AND mask (all host bits 0). It names the network and is not given to a host.
- **Broadcast address** = all host bits 1. Also not given to a host.
- **Usable host addresses** = 2<sup>h</sup> − 2.

Example: 192.168.10.77/26. The last byte 77 is 01|001101; the first 2 bits belong to the prefix. Blocks of 2⁶ = 64 start at 0, 64, 128, 192, so 77 is in the block starting at 64:

- network 192.168.10.64, broadcast 192.168.10.127,
- hosts .65 to .126, which is 62 usable addresses.

Python's `ipaddress` module does the same calculation:

```python
import ipaddress

net = ipaddress.ip_interface("192.168.10.77/26").network
hosts = list(net.hosts())
print("network:  ", net.network_address)
print("broadcast:", net.broadcast_address)
print("mask:     ", net.netmask)
print("hosts:    ", hosts[0], "to", hosts[-1], f"({len(hosts)} usable)")
```
```output
network:   192.168.10.64
broadcast: 192.168.10.127
mask:      255.255.255.192
hosts:     192.168.10.65 to 192.168.10.126 (62 usable)
```

## Subnetting

An organisation can split its block into smaller **subnets** by **borrowing** bits from the host part. Borrowing s bits gives 2<sup>s</sup> subnets with 2<sup>h − s</sup> − 2 hosts each.

Example: split 200.10.20.0/24 into at least 6 subnets. 2³ = 8 ≥ 6, so borrow 3 bits: the subnets are /27, each with 2⁵ − 2 = 30 hosts, starting at .0, .32, .64, ..., .224.

**Variable-length subnet masks (VLSM)** give each subnet just the size it needs. To carve subnets for 100, 50 and 25 hosts out of 172.16.0.0/24, allocate the largest first:

- 100 hosts need 7 host bits (126 usable): 172.16.0.0/25,
- 50 hosts need 6 host bits (62 usable): 172.16.0.128/26,
- 25 hosts need 5 host bits (30 usable): 172.16.0.192/27,

leaving 172.16.0.224/27 free.

```python
import ipaddress

block = ipaddress.ip_network("200.10.20.0/24")
subnets = list(block.subnets(new_prefix=27))
print(len(subnets), "subnets of", subnets[0].num_addresses - 2, "hosts each")
for s in subnets[:3]:
    print(" ", s, "broadcast", s.broadcast_address)

free = [ipaddress.ip_network("172.16.0.0/24")]
for need in (100, 50, 25):                       # VLSM: biggest first
    bits = next(h for h in range(2, 33) if 2 ** h - 2 >= need)
    free.sort(key=lambda n: (n.prefixlen, n))
    for i, f in enumerate(free):
        if f.prefixlen <= 32 - bits:
            chosen, *rest = f.subnets(new_prefix=32 - bits)
            free[i:i + 1] = rest
            print(f"{need} hosts -> {chosen}")
            break
print("left over:", sorted(free))
```
```output
8 subnets of 30 hosts each
  200.10.20.0/27 broadcast 200.10.20.31
  200.10.20.32/27 broadcast 200.10.20.63
  200.10.20.64/27 broadcast 200.10.20.95
100 hosts -> 172.16.0.0/25
50 hosts -> 172.16.0.128/26
25 hosts -> 172.16.0.192/27
left over: [IPv4Network('172.16.0.224/27')]
```

## Route aggregation (supernetting)

The reverse of subnetting: contiguous blocks can be advertised as one shorter prefix. 200.1.0.0/24, 200.1.1.0/24, 200.1.2.0/24 and 200.1.3.0/24 agree in their first 22 bits, so a router can advertise just **200.1.0.0/22**. For this to work, the number of blocks must be a power of 2 and the first block must start on a matching boundary.

## Longest prefix match

With CIDR, several routing-table entries can match one destination. The router uses the entry with the **longest matching prefix**, the most specific route. The **default route** 0.0.0.0/0 matches everything and is used when nothing else does.

| Prefix | Next hop |
| --- | --- |
| 131.23.0.0/16 | A |
| 131.23.128.0/17 | B |
| 131.23.151.0/24 | C |
| 0.0.0.0/0 | D |

```python
import ipaddress

table = [("131.23.0.0/16", "A"), ("131.23.128.0/17", "B"),
         ("131.23.151.0/24", "C"), ("0.0.0.0/0", "D")]
table = [(ipaddress.ip_network(p), hop) for p, hop in table]

def next_hop(address):
    a = ipaddress.ip_address(address)
    matches = [(net, hop) for net, hop in table if a in net]
    return max(matches, key=lambda m: m[0].prefixlen)[1]

for dest in ["131.23.151.76", "131.23.180.9", "131.23.21.5", "140.1.1.1"]:
    print(dest, "->", next_hop(dest))
```
```output
131.23.151.76 -> C
131.23.180.9 -> B
131.23.21.5 -> A
140.1.1.1 -> D
```

131.23.151.76 matches all four entries; /24 is the longest, so it goes to C. 131.23.180.9 has third byte 180 = 10110100, which starts with 1, so it matches the /17 (B) but not the /24.

## Special addresses

| Address | Meaning |
| --- | --- |
| 0.0.0.0 | "This host" (used before an address is assigned) |
| 255.255.255.255 | Limited broadcast on the local network |
| 127.0.0.0/8 | Loopback (127.0.0.1 is this machine) |
| 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 | **Private** addresses, not routed on the Internet (used behind NAT) |
| 169.254.0.0/16 | Link-local (self-assigned when DHCP fails) |

## Practice questions

```quiz
q: What is the broadcast address of the subnet containing 10.20.30.200/27?
- 10.20.30.255
* 10.20.30.223
- 10.20.30.207
- 10.20.30.192
explain: /27 leaves 5 host bits, so blocks of 32: ..., 192–223, 224–255. 200 lies in 192–223, so the network is 10.20.30.192 and the broadcast address 10.20.30.223.
```

```quiz
q: How many usable host addresses does a subnet with mask 255.255.248.0 have?
answer: 2046
verify: 2 ** (32 - 21) - 2
explain: 248 = 11111000, so the mask has 8 + 8 + 5 = 21 one-bits and 11 host bits: 2¹¹ − 2 = 2046 hosts.
```

```quiz
q: A router has the routing table shown in this lesson (131.23.0.0/16 → A, 131.23.128.0/17 → B, 131.23.151.0/24 → C, default → D). Where does it send a packet for 131.23.127.200?
- B
- C
* A
- D
explain: 127 = 01111111 starts with 0, so the address is not in 131.23.128.0/17 (which needs a leading 1 in the third byte) and not in 131.23.151.0/24. It matches only 131.23.0.0/16 and the default; the longer match is /16, so it goes to A.
```

```quiz
q: An organisation has the block 200.10.20.0/24 and needs at least 6 subnets of equal size. What is the largest number of usable hosts each subnet can have?
answer: 30
verify: 2 ** (8 - 3) - 2
explain: 6 subnets need 3 borrowed bits (2³ = 8 ≥ 6), leaving 5 host bits: 2⁵ − 2 = 30 usable hosts per subnet.
```

```quiz
q: Which single prefix aggregates 200.1.0.0/24, 200.1.1.0/24, 200.1.2.0/24 and 200.1.3.0/24 exactly?
code: python
  import ipaddress
  blocks = [ipaddress.ip_network(f"200.1.{i}.0/24") for i in range(4)]
  print(*ipaddress.collapse_addresses(blocks))
- `200.1.0.0/23`
* `200.1.0.0/22`
- `200.1.0.0/21`
- `200.1.0.0/16`
explain: The third bytes 0–3 are 000000xx: they share the first 6 bits of the third byte, so the common prefix is 8 + 8 + 6 = 22 bits. /23 would cover only two of the blocks, and /21 or /16 would cover more than the four.
```
