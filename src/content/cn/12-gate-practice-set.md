---
title: CN GATE Practice Set
chapter: GATE Practice
description: Mixed GATE-style questions on delays, error detection, sliding windows, MAC, subnetting, fragmentation, routing, TCP and application protocols.
---
These questions mix every lesson of the Computer Networks track, in the three GATE formats. Most are numericals: write down the formula, put in the units carefully (bits versus bytes, ms versus µs), and only then calculate. Every numerical answer on this page is recomputed by a program when the site is built.

## Links and the data link layer

```quiz
q: **[Delay]** A 1000-byte packet crosses 2 links (one store-and-forward router in between). Each link is 8 Mbps with a propagation delay of 1 ms. Ignoring queuing and processing, what is the end-to-end delay in **ms**?
answer: 4
verify: round(2 * (8000 / 8e6 + 0.001) * 1000, 6)
explain: Per link: transmission 8000 bits / 8 × 10⁶ bps = 1 ms, plus 1 ms propagation, so 2 ms. The router must receive the whole packet before forwarding, so the two links add up: 4 ms.
```

```quiz
q: **[Sliding window]** In Go-Back-N, the window is 7 frames and the propagation delay is 5 times the frame transmission time. What is the link utilisation? Give the answer to two decimal places.
answer: 0.64
verify: round(min(1, 7 / (1 + 2 * 5)), 2)
explain: a = 5, so one cycle lasts 1 + 2a = 11 frame times, of which 7 are used: η = 7/11 ≈ 0.64.
```

```quiz
q: **[CRC]** The message 1010001101 is sent with the generator 110101. What is the CRC appended to it?
code: python
  def crc(message, generator):
      bits = list(message + "0" * (len(generator) - 1))
      for i in range(len(message)):
          if bits[i] == "1":
              for j, g in enumerate(generator):
                  bits[i + j] = "0" if bits[i + j] == g else "1"
      return "".join(bits[-(len(generator) - 1):])

  print(crc("1010001101", "110101"))
- `11010`
* `01110`
- `10011`
- `00000`
explain: The generator has 6 bits (degree 5), so 5 zeros are appended and the remainder of the modulo-2 division is 5 bits long: 01110. The frame sent is 101000110101110.
```

```quiz
q: **[CSMA/CD]** A 100 Mbps CSMA/CD network uses a 2 km cable with a signal speed of 2 × 10⁸ m/s. What is the minimum frame size in **bytes**?
answer: 250
verify: round(2 * (2000 / 2e8) * 1e8 / 8)
explain: T<sub>p</sub> = 2000 / (2 × 10⁸) = 10 µs. L<sub>min</sub> = 2 T<sub>p</sub> R = 2 × 10⁻⁵ × 10⁸ = 2000 bits = 250 bytes.
```

```quiz
q: **[ALOHA]** A slotted ALOHA channel runs at 1 Mbps with 1000-bit frames. What is the maximum number of frames per second it can carry successfully? (Round down to a whole number.)
answer: 367
verify: int(1e6 / 1000 * __import__("math").exp(-1))
explain: There are 10⁶ / 1000 = 1000 slots per second, and at best a fraction 1/e ≈ 0.368 of them succeed: about 367.9, so at most 367 complete frames per second.
```

## Network layer

```quiz
q: **[Subnetting]** What is the network address of the host 172.16.45.130/20?
code: python
  import ipaddress
  print(ipaddress.ip_interface("172.16.45.130/20").network.network_address)
- `172.16.45.0`
- `172.16.40.0`
* `172.16.32.0`
- `172.16.0.0`
explain: /20 leaves 4 network bits in the third byte, so the mask there is 240. 45 = 00101101, and 00101101 AND 11110000 = 00100000 = 32. The network is 172.16.32.0 (broadcast 172.16.47.255).
```

```quiz
q: **[Subnetting]** How many usable host addresses does a /23 network have?
answer: 510
verify: 2 ** (32 - 23) - 2
explain: 9 host bits give 2⁹ = 512 addresses, minus the network and broadcast addresses: 510.
```

```quiz
q: **[Fragmentation]** A datagram with total length 3000 bytes and a 20-byte header must cross a link with MTU 1000. What is the fragment offset of the **last** fragment?
answer: 366
verify:
  data, per = 3000 - 20, (1000 - 20) // 8 * 8
  print(list(range(0, data, per))[-1] // 8)
explain: Each fragment carries at most ⌊980 / 8⌋ × 8 = 976 data bytes. The 2980 bytes split as 976 + 976 + 976 + 52, starting at bytes 0, 976, 1952 and 2928. The last offset is 2928 / 8 = 366.
```

```quiz
q: **[Routing]** Which statement about distance vector routing is **true**?
- Each router floods its link costs to every router
* Each router sends its distance vector only to its neighbours
- It never suffers from count-to-infinity
- It uses Dijkstra's algorithm at every router
explain: Distance vector routers exchange vectors with neighbours and apply Bellman-Ford. Flooding link costs and running Dijkstra is link state routing. Count-to-infinity is a known problem of distance vector.
```

## Transport and application layers

```quiz
q: **[TCP]** A TCP segment has sequence number 5000 and carries 1460 bytes. The receiver had already received everything before it. What acknowledgement number does the receiver send?
answer: 6460
verify: 5000 + 1460
explain: The segment carries bytes 5000 to 6459, so the receiver asks for byte 6460 next.
```

```quiz
q: **[Congestion control]** TCP Reno starts with cwnd = 1 MSS and ssthresh = 8 MSS. Three duplicate ACKs arrive in round 6. Using the rules of the congestion control lesson (slow start stops at ssthresh), what is cwnd in round 9?
answer: 7
verify:
  cwnd, ssthresh, trace = 1, 8, []
  for r in range(1, 10):
      trace.append(cwnd)
      if r == 6:
          ssthresh = cwnd // 2
          cwnd = ssthresh
      elif cwnd < ssthresh:
          cwnd = min(2 * cwnd, ssthresh)
      else:
          cwnd += 1
  print(trace[8])
explain: Rounds 1–6: 1, 2, 4, 8, 9, 10. In round 6 the duplicate ACKs halve the window: ssthresh = cwnd = 5. Then congestion avoidance adds 1 per round: 5, 6, 7 in rounds 7, 8 and 9.
```

```quiz
q: **[HTTP]** A page consists of a base file and 6 embedded objects, fetched over one persistent HTTP connection **without** pipelining. Ignoring transmission times and DNS, how many RTTs are needed?
answer: 8
verify: 1 + 1 + 6
explain: 1 RTT for the TCP handshake, 1 for the base file, and 1 for each of the 6 objects requested one after another: 8 RTTs.
```

```quiz
q: **[Protocols]** Which pairs of protocol and transport are correct? (Select all that apply.)
* DNS queries: UDP port 53
* SMTP: TCP port 25
- DHCP: TCP ports 67 and 68
* HTTP: TCP port 80
explain: DNS queries use UDP 53, SMTP uses TCP 25 and HTTP uses TCP 80. DHCP uses UDP (server 67, client 68), since the client has no address to set up a TCP connection with.
```
