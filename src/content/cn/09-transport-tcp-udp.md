---
title: Transport Layer, UDP, TCP and Sockets
chapter: Transport Layer
description: Ports and multiplexing, UDP, the TCP header, sequence and acknowledgement numbers, the three-way handshake and connection release, TCP flow control, sequence number wraparound, and socket programming.
---
IP delivers datagrams to a **host**. The transport layer delivers data to the right **process** on that host, and (in TCP) makes the delivery reliable.

## Ports and multiplexing

A process is identified by a 16-bit **port number**. Servers listen on **well-known ports** (0–1023); clients get a temporary (**ephemeral**) port from the operating system.

| Port | Protocol | Port | Protocol |
| --- | --- | --- | --- |
| 20, 21 | FTP data, control | 53 | DNS (UDP and TCP) |
| 22 | SSH | 67, 68 | DHCP server, client |
| 23 | Telnet | 80 | HTTP |
| 25 | SMTP | 110 | POP3 |
| 143 | IMAP | 443 | HTTPS |

A TCP connection is identified by the 4-tuple (source IP, source port, destination IP, destination port), so one web server on port 80 can serve thousands of clients at once. A UDP socket is identified by just (destination IP, destination port).

## UDP

**UDP** (User Datagram Protocol) adds almost nothing to IP: ports and a checksum.

| Field | Bits |
| --- | --- |
| Source port | 16 |
| Destination port | 16 |
| Length (header + data, bytes) | 16 |
| Checksum | 16 |

The header is only **8 bytes**. UDP is **connectionless** and **unreliable**: no handshake, no acknowledgements, no ordering, no flow or congestion control. It suits applications that prefer speed to reliability or that do their own: DNS queries, DHCP, streaming media, online games, and QUIC (the transport under HTTP/3).

## TCP

**TCP** (Transmission Control Protocol) gives a **reliable, in-order, full-duplex byte stream** between two processes, over a **connection**. It is byte-oriented: sequence numbers count **bytes**, not segments.

| Field | Bits | Meaning |
| --- | --- | --- |
| Source port, destination port | 16 + 16 | |
| **Sequence number** | 32 | Number of the first data byte in this segment |
| **Acknowledgement number** | 32 | The next byte the sender of this segment expects (cumulative) |
| Header length | 4 | In 4-byte words: 20 to 60 bytes |
| Flags | 6+ | **SYN**, **ACK**, **FIN**, RST, PSH, URG |
| **Window** | 16 | **Receive window**: how many more bytes the receiver can accept (flow control) |
| Checksum | 16 | Over header, data and a pseudo-header with the IP addresses |
| Urgent pointer | 16 | |
| Options | 0–320 | MSS, window scale, timestamps, SACK |

Sequence numbers in practice: if a segment has sequence number 1000 and carries 500 bytes, it holds bytes 1000–1499. The receiver acknowledges it with **ACK 1500**, meaning "send byte 1500 next". SYN and FIN each **consume one sequence number** even though they carry no data.

## Connection setup: the three-way handshake

```pipeline
caption: The three-way handshake (x and y are random initial sequence numbers)
SYN | client → server, seq = x
SYN + ACK | server → client, seq = y, ack = x + 1
ACK | client → server, seq = x + 1, ack = y + 1
```

Each side picks a random **initial sequence number** (ISN), which protects against old duplicate segments and against attackers guessing numbers. After the handshake, the client's first data byte has sequence number x + 1.

A server that receives many SYNs and never the final ACK keeps half-open connections: this is the **SYN flood** attack, defended against with SYN cookies.

## Connection release

Each direction is closed separately (**half-close**): a side sends FIN, the other ACKs it, and later sends its own FIN, which is ACKed. That makes four segments (three if the second ACK and FIN are combined). The side that closes first waits in the **TIME_WAIT** state for 2 × MSL (maximum segment lifetime) before forgetting the connection, so that a lost final ACK can be resent and old segments die out.

## Flow control

The receiver advertises its free buffer space in the **window** field (rwnd). The sender keeps the amount of unacknowledged data at or below it. If the receiver advertises a window of 0, the sender stops and periodically sends a small **window probe** to learn when space frees up.

The window field is 16 bits, so the largest window is 65,535 bytes, and at most one window can be sent per RTT:

**Maximum throughput ≤ window / RTT.** With a 100 ms RTT that is 65,535 × 8 / 0.1 ≈ 5.24 Mbps, however fast the link. The **window scale** option multiplies the window by up to 2¹⁴ for fast, long links.

## Sequence number wraparound

Sequence numbers are 32 bits, so they repeat after 2³² bytes. The **wraparound time** is 2³² bytes / bandwidth. It must be longer than the maximum segment lifetime, or an old segment could be mistaken for a new one.

- At 1 Gbps: 2³² × 8 / 10⁹ ≈ 34.4 s.
- At 10 Gbps: ≈ 3.4 s, shorter than a typical MSL of 120 s, so fast links use the **timestamp** option (PAWS) to tell old segments apart.

## Socket programming

A **socket** is the interface an application uses to send and receive through the transport layer.

| Server | Client |
| --- | --- |
| `socket()` create | `socket()` create |
| `bind()` to an address and port | |
| `listen()` for connections | |
| `accept()` waits; returns a new socket per client | `connect()` performs the three-way handshake |
| `recv()` / `send()` | `send()` / `recv()` |
| `close()` | `close()` |

Here is a complete TCP server and client in one program. The server runs in a thread on the local machine and sends back each message in capitals:

```python
import socket
import threading

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)   # TCP
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind(("127.0.0.1", 0))        # port 0: let the OS choose a free port
server.listen(1)
port = server.getsockname()[1]

def serve():
    conn, _ = server.accept()        # one socket per connected client
    with conn:
        while data := conn.recv(1024):
            conn.sendall(data.upper())

thread = threading.Thread(target=serve)
thread.start()

with socket.create_connection(("127.0.0.1", port)) as client:   # handshake here
    for message in [b"hello", b"gate cs"]:
        client.sendall(message)
        print(client.recv(1024).decode())
thread.join()
server.close()
```
```output
HELLO
GATE CS
```

A UDP version would use `SOCK_DGRAM`, skip `listen`, `accept` and `connect`, and use `sendto` and `recvfrom`, with each message an independent datagram.

## Practice questions

```quiz
q: A TCP sender's current sequence number is 1000. It sends three segments carrying 500, 300 and 200 bytes. What acknowledgement number does the receiver send after getting all three?
answer: 2000
verify: 1000 + 500 + 300 + 200
explain: The segments hold bytes 1000–1499, 1500–1799 and 1800–1999. The ACK names the next byte expected: 2000.
```

```quiz
q: How long, in seconds, does it take for 32-bit TCP sequence numbers to wrap around on a 10 Gbps link? Give the answer to one decimal place.
answer: 3.4
verify: round(2 ** 32 * 8 / 10e9, 1)
explain: 2³² bytes = 2³² × 8 bits ≈ 3.44 × 10¹⁰ bits, which takes 3.44 × 10¹⁰ / 10¹⁰ ≈ 3.4 s at 10 Gbps.
```

```quiz
q: A TCP connection has an RTT of 50 ms and no window scaling, so the window is at most 65,535 bytes. What is the maximum throughput in Mbps? Give the answer to one decimal place.
answer: 10.5
verify: round(65535 * 8 / 0.050 / 1e6, 1)
explain: At most one window per RTT: 65,535 × 8 bits / 0.05 s ≈ 10.49 × 10⁶ bps ≈ 10.5 Mbps.
```

```quiz
q: In a three-way handshake the client's initial sequence number is 4000 and the server's is 9000. What is the acknowledgement number in the server's SYN+ACK segment?
answer: 4001
verify: 4000 + 1
explain: The SYN consumes one sequence number, so the server acknowledges 4000 + 1 = 4001: the client's first data byte will be byte 4001.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The UDP header is 8 bytes long
* TCP sequence numbers count bytes, not segments
- UDP provides flow control through its window field
* A TCP receiver can stop the sender by advertising a window of 0
explain: UDP has four 16-bit fields and no window or acknowledgements. TCP numbers every byte of the stream, and its receive window implements flow control, including a zero window.
```
