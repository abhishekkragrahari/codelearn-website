---
title: Flow Control and Sliding Windows
chapter: Data Link Layer
description: Stop-and-wait, Go-Back-N and Selective Repeat; link utilisation, the window needed to fill a link, sequence number bits, and counting retransmissions.
---
**Flow control** stops a fast sender from overwhelming a slow receiver, and **ARQ** (automatic repeat request) recovers lost or damaged frames by retransmitting them. Both use **acknowledgements** (ACKs) and **timeouts**. The same ideas appear at the data link layer and in TCP.

Two quantities decide how well a protocol uses a link:

- T<sub>t</sub> = frame length / bandwidth, the transmission time of one frame,
- T<sub>p</sub>, the one-way propagation delay, and their ratio **a = T<sub>p</sub> / T<sub>t</sub>**.

## Stop-and-wait

The sender transmits one frame and waits for its ACK before sending the next. If the ACK does not arrive before the timer runs out, it resends the frame. A 1-bit sequence number (0, 1, 0, 1, ...) lets the receiver recognise a duplicate when an ACK was lost.

One cycle takes T<sub>t</sub> + 2T<sub>p</sub> (ignoring the ACK's own transmission time and processing), of which only T<sub>t</sub> is useful:

**Efficiency η = T<sub>t</sub> / (T<sub>t</sub> + 2T<sub>p</sub>) = 1 / (1 + 2a)**

**Throughput = η × bandwidth.**

Example: a 1 Mbps link, 1000-bit frames (T<sub>t</sub> = 1 ms) and T<sub>p</sub> = 10 ms. Then a = 10 and η = 1/21 ≈ 4.76%: the link is idle more than 95% of the time.

## Sliding windows

The fix is to keep sending without waiting: the sender may have up to **N** unacknowledged frames outstanding (its **window**). If N frames can be sent within one cycle, the link never goes idle:

**η = min(1, N / (1 + 2a))**, so the window needed for 100% utilisation is **N ≥ 1 + 2a**.

```python
import math

R, frame_bits, Tp = 1_000_000, 1000, 0.010
Tt = frame_bits / R
a = Tp / Tt
print(f"a = {a:.0f}")
print(f"stop-and-wait efficiency = {1 / (1 + 2 * a):.4f}")
print(f"throughput = {R / (1 + 2 * a) / 1000:.1f} kbps")
for N in (5, 10, 21, 30):
    print(f"window {N:2}: efficiency {min(1, N / (1 + 2 * a)):.3f}")
need = math.ceil(1 + 2 * a)
print("window for full use:", need)
```
```output
a = 10
stop-and-wait efficiency = 0.0476
throughput = 47.6 kbps
window  5: efficiency 0.238
window 10: efficiency 0.476
window 21: efficiency 1.000
window 30: efficiency 1.000
window for full use: 21
```

### Go-Back-N (GBN)

- The sender window has size N; the **receiver window has size 1**: the receiver accepts only the next expected frame and discards anything out of order.
- ACKs are **cumulative**: ACK n means "everything up to n arrived".
- On a timeout, the sender **resends the lost frame and every frame after it** that was already sent.
- With k-bit sequence numbers (0 to 2<sup>k</sup> − 1): **N ≤ 2<sup>k</sup> − 1**.

### Selective Repeat (SR)

- Sender and receiver windows both have size N. The receiver **buffers** out-of-order frames.
- Each frame is acknowledged individually, and only the **lost frames** are resent.
- With k-bit sequence numbers: **N ≤ 2<sup>k − 1</sup>** (half the sequence space).

Why the limits? If all ACKs of a full window are lost, the sender resends the old frames. The receiver must be able to tell them apart from the new frames it now expects. In GBN with N = 2<sup>k</sup>, the receiver would expect exactly the sequence number of the resent first frame; in SR the old window and the new window must not overlap.

| | Stop-and-wait | Go-Back-N | Selective Repeat |
| --- | --- | --- | --- |
| Sender window | 1 | N ≤ 2<sup>k</sup> − 1 | N ≤ 2<sup>k−1</sup> |
| Receiver window | 1 | 1 | N |
| Retransmits | The lost frame | The lost frame and all after it | Only the lost frame |
| ACKs | Per frame | Cumulative | Individual |
| Receiver buffering | None | None | Up to N frames |

For the example above, N = 21 is needed. GBN needs 2<sup>k</sup> − 1 ≥ 21, so k = **5** bits; SR needs 2<sup>k−1</sup> ≥ 21, so k = **6** bits.

## Counting transmissions

A classic GATE question: "every k-th frame the sender transmits is lost". In GBN a loss also wastes every frame sent after it in the window, so the count is best found by tracing (or simulating) the protocol. Here 9 frames are sent with window 3, and every 5th transmission is lost:

```python
def go_back_n(frames, window, every):
    sent, base, nxt, lost = 0, 1, 1, None
    log = []
    while base <= frames:
        if nxt < base + window and nxt <= frames:
            sent += 1
            dropped = sent % every == 0
            if dropped and lost is None:
                lost = nxt                     # the receiver discards everything after this
            if lost is None:
                base = nxt + 1                 # ACK arrives, the window slides
            log.append(f"{nxt}{'x' if dropped else ''}")
            nxt += 1
        else:
            nxt = base = lost                  # timeout: go back to the lost frame
            lost = None
    return sent, log

def selective_repeat(frames, every):
    sent = delivered = 0
    while delivered < frames:
        sent += 1
        if sent % every:
            delivered += 1
    return sent

count, log = go_back_n(9, 3, 5)
print("GBN transmissions:", " ".join(log))
print("GBN total:", count)
print("SR total:", selective_repeat(9, 5))
```
```output
GBN transmissions: 1 2 3 4 5x 6 7 5 6 7x 8 9 7 8 9x 9
GBN total: 16
SR total: 11
```

Frame 5 is lost, but 6 and 7 are already on their way, so all three are sent again; then the 10th transmission (frame 7) is lost, and so on. Selective Repeat resends only the two lost frames: 11 transmissions.

## Practice questions

```quiz
q: A 1 Mbps link has a one-way propagation delay of 20 ms. Frames are 1000 bytes. What is the **minimum number of sequence number bits** for Selective Repeat to keep the link fully used?
answer: 4
verify:
  import math
  Tt = 8000 / 1e6
  N = math.ceil(1 + 2 * 0.020 / Tt)
  print(next(k for k in range(1, 20) if 2 ** (k - 1) >= N))
explain: T<sub>t</sub> = 8000 bits / 10⁶ bps = 8 ms, so a = 20 / 8 = 2.5 and N ≥ 1 + 2a = 6. Selective Repeat needs 2<sup>k−1</sup> ≥ 6, so k = 4. (Go-Back-N would need 2<sup>k</sup> − 1 ≥ 6, so k = 3.)
```

```quiz
q: What is the efficiency of stop-and-wait when the propagation delay is 4 times the transmission time? Give a fraction between 0 and 1, to two decimal places.
answer: 0.11
verify: round(1 / (1 + 2 * 4), 2)
explain: a = 4, so η = 1 / (1 + 2 × 4) = 1/9 ≈ 0.11.
```

```quiz
q: A sender has 10 frames to send using Go-Back-N with window size 4. Every 6th frame it transmits is lost (no ACKs are lost). How many transmissions are needed in total?
answer: 17
verify:
  def gbn(n, N, k):
      sent, base, nxt, lost = 0, 1, 1, None
      while base <= n:
          if nxt < base + N and nxt <= n:
              sent += 1
              if sent % k == 0 and lost is None:
                  lost = nxt
              if lost is None:
                  base = nxt + 1
              nxt += 1
          else:
              nxt = base = lost
              lost = None
      return sent
  print(gbn(10, 4, 6))
explain: Transmissions: 1 2 3 4 5 6✗ 7 8 9 | 6 7 8✗ 9 10 | 8 9 10. The 6th transmission (frame 6) is lost, so 7, 8 and 9 are wasted and resent; the 12th transmission (frame 8) is lost, so 9 and 10 are resent with it. Total 9 + 5 + 3 = 17.
```

```quiz
q: With 3-bit sequence numbers, what are the maximum sender window sizes for Go-Back-N and Selective Repeat?
- 8 and 8
* 7 and 4
- 7 and 7
- 8 and 4
explain: Go-Back-N allows 2³ − 1 = 7 and Selective Repeat 2³⁻¹ = 4.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* In Go-Back-N the receiver window size is 1
* Selective Repeat needs buffers at the receiver for out-of-order frames
- Go-Back-N uses only individual (non-cumulative) acknowledgements
* Increasing the window size cannot raise efficiency above 1
explain: A GBN receiver accepts frames only in order and acknowledges cumulatively. SR keeps out-of-order frames until the gap is filled. η = min(1, N / (1 + 2a)) is capped at 1.
```
