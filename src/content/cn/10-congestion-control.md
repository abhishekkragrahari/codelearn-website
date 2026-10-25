---
title: TCP Congestion Control
chapter: Transport Layer
description: Why congestion control is needed, the congestion window, slow start, congestion avoidance (AIMD), timeouts and triple duplicate ACKs in Tahoe and Reno, retransmission timer estimation, and throughput.
---
**Flow control** protects the receiver. **Congestion control** protects the **network**: if every sender transmits as fast as its receiver allows, router queues overflow, packets are dropped and retransmitted, and useful throughput collapses. TCP senders therefore slow down when they see signs of congestion.

## The congestion window

The sender keeps a second window, the **congestion window (cwnd)**, which it adjusts itself. The amount of unacknowledged data is limited by both windows:

**Sending window = min(cwnd, rwnd)**

Below, windows are counted in **MSS** (maximum segment size, one full segment), and time in RTTs ("rounds"), as GATE questions usually do.

## Slow start

A new connection starts with **cwnd = 1 MSS**. Every ACK increases cwnd by 1 MSS, so cwnd **doubles every RTT**: 1, 2, 4, 8, ... The name is historical: the growth is exponential, only the start is small.

Slow start continues until cwnd reaches the **slow-start threshold (ssthresh)**. (In this lesson, a doubling that would pass ssthresh stops at ssthresh.)

## Congestion avoidance (AIMD)

Above ssthresh, TCP grows cwnd by only **1 MSS per RTT** (additive increase), probing gently for more bandwidth. When it detects a loss, it cuts the window (multiplicative decrease). This **AIMD** pattern (additive increase, multiplicative decrease) gives TCP's typical **sawtooth** and shares a bottleneck link fairly between connections.

## Reacting to loss

TCP sees two signals of loss:

| Signal | Meaning | TCP Tahoe | TCP Reno |
| --- | --- | --- | --- |
| **Timeout** | Severe: nothing is getting through | ssthresh = cwnd / 2, cwnd = 1, slow start | Same as Tahoe |
| **3 duplicate ACKs** | Mild: one segment lost, later ones arrive | Same as timeout | **Fast retransmit** of the lost segment, then **fast recovery**: ssthresh = cwnd / 2, cwnd = ssthresh, continue with congestion avoidance |

Three duplicate ACKs (four identical ACKs in a row) mean the receiver keeps getting segments past a gap, so the network is still delivering: there is no need to drop back to 1.

The simulation below shows cwnd at the start of each round, with ssthresh = 16 at first and a loss detected in round 8:

```python
def tcp_cwnd(rounds, ssthresh, losses):
    cwnd, trace = 1, []
    for r in range(1, rounds + 1):
        trace.append(cwnd)
        event = losses.get(r)
        if event == "timeout":                 # Tahoe and Reno
            ssthresh, cwnd = max(cwnd // 2, 2), 1
        elif event == "3 dup ACKs":            # Reno: fast recovery
            ssthresh = max(cwnd // 2, 2)
            cwnd = ssthresh
        elif cwnd < ssthresh:                  # slow start
            cwnd = min(2 * cwnd, ssthresh)
        else:                                  # congestion avoidance
            cwnd += 1
    return trace

print("timeout in round 8:   ", tcp_cwnd(14, 16, {8: "timeout"}))
print("3 dup ACKs in round 8:", tcp_cwnd(14, 16, {8: "3 dup ACKs"}))
```
```output
timeout in round 8:    [1, 2, 4, 8, 16, 17, 18, 19, 1, 2, 4, 8, 9, 10]
3 dup ACKs in round 8: [1, 2, 4, 8, 16, 17, 18, 19, 9, 10, 11, 12, 13, 14]
```

In both cases cwnd grows 1, 2, 4, 8, 16 (slow start), then 17, 18, 19 (congestion avoidance). In round 8 (cwnd = 19), ssthresh becomes 9. After a timeout, cwnd restarts at 1 and slow start runs up to 9; after three duplicate ACKs, Reno continues from 9 with linear growth.

## The retransmission timer

TCP must guess how long to wait for an ACK. Too short a timeout causes needless retransmissions; too long reacts slowly to loss. TCP keeps a smoothed RTT and its variation (Jacobson's algorithm, with α = 1/8 and β = 1/4):

- DevRTT = (1 − β) · DevRTT + β · |SampleRTT − EstimatedRTT|
- EstimatedRTT = (1 − α) · EstimatedRTT + α · SampleRTT
- **Timeout = EstimatedRTT + 4 · DevRTT**

(DevRTT is updated first, with the old EstimatedRTT.) After a timeout, the timer value is doubled (exponential backoff).

**Karn's algorithm**: never take an RTT sample from a segment that was retransmitted, because it is unknown which transmission the ACK belongs to.

```python
est, dev = 100.0, 10.0               # ms
for sample in [120, 90, 140]:
    dev = 0.75 * dev + 0.25 * abs(sample - est)
    est = 0.875 * est + 0.125 * sample
    print(f"sample {sample}: estimated {est:.2f}, dev {dev:.2f}, timeout {est + 4 * dev:.2f} ms")
```
```output
sample 120: estimated 102.50, dev 12.50, timeout 152.50 ms
sample 90: estimated 100.94, dev 12.50, timeout 150.94 ms
sample 140: estimated 105.82, dev 19.14, timeout 182.38 ms
```

## Throughput

If a connection's window oscillates between W/2 and W (the AIMD sawtooth), its average window is about 3W/4, so its **average throughput ≈ 0.75 · W · MSS / RTT**.

## Practice questions

```quiz
q: A TCP connection starts with cwnd = 1 MSS and ssthresh = 20 MSS. A timeout occurs in round 7, when cwnd is 21. Using the rules of this lesson (slow start stops at ssthresh), what is cwnd in round 12?
answer: 10
verify:
  cwnd, ssthresh, trace = 1, 20, []
  for r in range(1, 13):
      trace.append(cwnd)
      if r == 7:
          ssthresh, cwnd = cwnd // 2, 1
      elif cwnd < ssthresh:
          cwnd = min(2 * cwnd, ssthresh)
      else:
          cwnd += 1
  print(trace[11])
explain: Rounds 1–7: 1, 2, 4, 8, 16, 20 (slow start capped at 20), 21. The timeout sets ssthresh = 10 and cwnd = 1. Rounds 8–12: 1, 2, 4, 8, 10 (capped at the new ssthresh). So cwnd = 10 in round 12.
```

```quiz
q: EstimatedRTT is 80 ms and DevRTT is 10 ms. A new sample of 96 ms arrives. With α = 1/8 and β = 1/4, what is the new timeout value in ms?
answer: 128
verify:
  est, dev, s = 80, 10, 96
  dev = 0.75 * dev + 0.25 * abs(s - est)
  est = 0.875 * est + 0.125 * s
  print(est + 4 * dev)
explain: DevRTT = 0.75 × 10 + 0.25 × |96 − 80| = 7.5 + 4 = 11.5. EstimatedRTT = 0.875 × 80 + 0.125 × 96 = 70 + 12 = 82. Timeout = 82 + 4 × 11.5 = 128 ms.
```

```quiz
q: In TCP Reno, what happens when the sender receives three duplicate ACKs while cwnd = 24 MSS?
- cwnd becomes 1 and slow start begins
* The lost segment is retransmitted, ssthresh becomes 12 and cwnd becomes 12
- cwnd becomes 25
- The connection is reset
explain: Reno treats three duplicate ACKs as mild congestion: fast retransmit, then fast recovery with ssthresh = cwnd / 2 = 12 and cwnd = ssthresh, followed by linear growth. Only a timeout sends cwnd back to 1.
```

```quiz
q: A TCP connection's window follows a sawtooth between 10 and 20 segments of 1500 bytes, with an RTT of 100 ms. What is its average throughput in **Mbps**?
answer: 1.8
verify: round(0.75 * 20 * 1500 * 8 / 0.1 / 1e6, 2)
explain: The average window is 3/4 × 20 = 15 segments per RTT: 15 × 1500 × 8 bits / 0.1 s = 1.8 × 10⁶ bps.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The sending window is the minimum of the congestion window and the receive window
* During slow start, cwnd roughly doubles every RTT
- During congestion avoidance, cwnd doubles every RTT
* Karn's algorithm ignores RTT samples of retransmitted segments
explain: Both windows limit the sender. Slow start adds 1 MSS per ACK, so the window doubles each round trip; congestion avoidance adds only 1 MSS per RTT. Karn's rule avoids ambiguous RTT samples.
```
