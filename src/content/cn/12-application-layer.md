---
title: Application Layer Protocols
chapter: Application Layer
description: DNS names, records and resolution, HTTP requests and responses with persistent and non-persistent connections and RTT counting, email with SMTP, POP3 and IMAP, and FTP.
---
Application-layer protocols define the messages that programs exchange: what a request looks like, what the reply means, and in what order they happen. Most follow the **client–server** model: the server runs all the time at a known address and port, and clients contact it.

## DNS: names to addresses

People use names such as `www.example.com`; IP needs addresses. The **Domain Name System** is a distributed, hierarchical database that maps between them.

```tree
caption: The DNS hierarchy (each level is run by different servers)
. (root) | 13 named root server clusters
  com | top-level domain (TLD)
    example.com | authoritative servers of the organisation
  in | country-code TLD
    ac.in
  org | TLD
```

- **Root servers** know the servers of every top-level domain.
- **TLD servers** (`.com`, `.org`, `.in`) know the authoritative servers of each domain registered under them.
- **Authoritative servers** hold the actual records of a domain.
- A **local DNS server** (resolver), run by the ISP or organisation, does the lookups for its clients and **caches** answers for their TTL.

### Resolution

1. The host asks its local DNS server, which answers **recursively** (it does all the work and returns the final answer).
2. The local server queries **iteratively**: the root replies "ask the `.com` servers", the TLD server replies "ask example.com's servers", and the authoritative server gives the address.

Without any cached entries, resolving one name therefore takes 1 query from the host and 3 from the local server (root, TLD, authoritative): 4 queries and 4 replies. With caching, most lookups stop at the local server.

DNS uses **UDP port 53** for ordinary queries (one small request, one reply, no handshake), and TCP port 53 for large replies and zone transfers between servers.

| Record type | Maps |
| --- | --- |
| **A** | Name → IPv4 address |
| **AAAA** | Name → IPv6 address |
| **CNAME** | Alias name → canonical name |
| **MX** | Domain → its mail server |
| **NS** | Domain → its authoritative name server |
| PTR | Address → name (reverse lookup) |

## HTTP

The **HyperText Transfer Protocol** fetches web objects (HTML pages, images, scripts) over TCP port 80 (**HTTPS**: HTTP over TLS, port 443). HTTP is **stateless**: the server keeps no memory of earlier requests; cookies are used to build sessions on top of it.

A request has a request line, headers and an optional body; the response has a status line, headers and the body:

```text
GET /index.html HTTP/1.1
Host: www.example.com
Accept: text/html

HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1543

<html>...
```

| Method | Purpose |
| --- | --- |
| GET | Fetch a resource |
| POST | Send data to be processed |
| PUT | Store a resource at a URL |
| DELETE | Remove a resource |
| HEAD | Like GET, but headers only |

| Status | Meaning |
| --- | --- |
| 200 | OK |
| 301 / 302 | Moved permanently / temporarily |
| 304 | Not modified (use the cached copy) |
| 404 | Not found |
| 500 | Internal server error |

Here is a real HTTP exchange: a tiny server runs in a thread on the local machine, and a client fetches a page from it.

```python
import http.client
import http.server
import threading

class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        body = b"<h1>Hello from the server</h1>" if self.path == "/" else b"no such page"
        self.send_response(200 if self.path == "/" else 404)
        self.send_header("Content-Type", "text/html")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):        # keep the output quiet
        pass

server = http.server.HTTPServer(("127.0.0.1", 0), Handler)
threading.Thread(target=server.serve_forever, daemon=True).start()

conn = http.client.HTTPConnection("127.0.0.1", server.server_port)
for path in ["/", "/missing"]:
    conn.request("GET", path)                 # same TCP connection: persistent
    resp = conn.getresponse()
    print(path, "->", resp.status, resp.reason, resp.getheader("Content-Type"), resp.read().decode())
conn.close()
server.shutdown()
```
```output
/ -> 200 OK text/html <h1>Hello from the server</h1>
/missing -> 404 Not Found text/html no such page
```

### Counting round-trip times

GATE often asks how long it takes to load a page with several embedded objects. Each TCP connection costs **1 RTT** for the handshake, and each request–response costs **1 RTT** (plus the transmission time of the object, which questions often ignore).

For a base page with **n** embedded objects (n + 1 objects in total):

| Connection style | RTTs (ignoring transmission) |
| --- | --- |
| **Non-persistent** (HTTP/1.0), one object at a time | 2(n + 1): a new connection per object |
| Non-persistent with **p parallel** connections | 2 + 2⌈n / p⌉ |
| **Persistent** without pipelining | 2 + n: one handshake, then one RTT per object |
| **Persistent with pipelining** | 2 + 1 = 3: all n requests sent back to back |

Add DNS lookup time if the name is not cached.

## Email: SMTP, POP3 and IMAP

```pipeline
caption: How an email travels
Sender's mail client | SMTP push
Sender's mail server | SMTP push, TCP 25
Receiver's mail server | stored in mailbox
Receiver's mail client | POP3 or IMAP pull
```

- **SMTP** (Simple Mail Transfer Protocol, TCP port 25) **pushes** mail from the client to its server and from server to server. Messages were originally 7-bit ASCII; **MIME** encodes attachments, images and non-English text.
- **POP3** (port 110) and **IMAP** (port 143) let the recipient **pull** mail from the mailbox. POP3 typically downloads and deletes; IMAP keeps mail on the server, with folders, so it stays in sync across devices.
- **Webmail** uses HTTP between the browser and the mail server, but servers still talk SMTP to each other.

## FTP

The **File Transfer Protocol** uses **two TCP connections**:

- a **control connection** on port 21, open for the whole session, for commands (USER, PASS, RETR, STOR, LIST) and replies;
- a **data connection** (port 20 in active mode), opened for each file transfer and closed after it.

Because commands travel separately from the data, FTP is said to send control information **out of band**. Unlike HTTP, an FTP server is **stateful**: it remembers the user and current directory for each session.

## Practice questions

```quiz
q: A web page has a base HTML file and 4 embedded images. Using **non-persistent** HTTP with one connection at a time, and ignoring transmission times and DNS, how many RTTs does it take to fetch everything?
answer: 10
verify: 2 * (4 + 1)
explain: Each of the 5 objects needs its own TCP connection (1 RTT) and its own request (1 RTT): 5 × 2 = 10 RTTs.
```

```quiz
q: The same page (base file + 4 images) is fetched over one **persistent connection with pipelining**. How many RTTs does it take, ignoring transmission times and DNS?
answer: 3
verify: 1 + 1 + 1
explain: 1 RTT for the TCP handshake, 1 RTT for the base page, then all 4 image requests are sent together and answered within 1 more RTT: 3 RTTs.
```

```quiz
q: A base page references 10 objects, fetched with non-persistent HTTP using 5 parallel connections. How many RTTs are needed, ignoring transmission times?
answer: 6
verify: 2 + 2 * -(-10 // 5)
explain: The base page takes 2 RTTs. The 10 objects go in ⌈10 / 5⌉ = 2 batches of 5 parallel connections, 2 RTTs each: 2 + 4 = 6 RTTs.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* SMTP is a push protocol, while POP3 and IMAP are pull protocols
* FTP sends its control information out of band, on a separate connection
- HTTP servers keep the state of every client between requests
* DNS normally uses UDP port 53 for queries
explain: SMTP delivers mail towards the recipient's server; the recipient fetches it with POP3 or IMAP. FTP keeps commands on port 21 and data on separate connections. HTTP is stateless (cookies add state on top). Ordinary DNS queries fit in one UDP datagram.
```

```quiz
q: Which DNS record type gives the mail server of a domain?
- A
- CNAME
* MX
- NS
explain: MX (mail exchanger) records name the domain's mail servers. A gives an IPv4 address, CNAME an alias, and NS the domain's name servers.
```
