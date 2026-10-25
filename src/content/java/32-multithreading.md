---
title: Multithreading
chapter: Advanced Topics
description: Run tasks at the same time with Thread, Runnable, synchronized and ExecutorService.
---
A **thread** is an independent path of execution inside a program. Every Java program starts with one thread (the one running `main`), and you can start more so that several tasks run at the same time, for example downloading files while the user keeps working.

```flowchart
caption: The life cycle of a thread
start: New (created with new Thread)
step: Runnable (after start())
if: Needs to wait?
  yes:
    step: Waiting / Blocked
    step: Back to Runnable
  no:
    step: Running its run() method
end: Terminated (run() finished)
```

## Creating threads

Give a `Thread` a `Runnable` (often a lambda) describing the work, then call `start()`. `join()` waits for a thread to finish.

```java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        int[] results = new int[2];

        Thread evens = new Thread(() -> {
            int sum = 0;
            for (int i = 0; i <= 100; i += 2) sum += i;
            results[0] = sum;
        });
        Thread odds = new Thread(() -> {
            int sum = 0;
            for (int i = 1; i <= 100; i += 2) sum += i;
            results[1] = sum;
        });

        evens.start();          // both threads now run at the same time
        odds.start();
        evens.join();           // wait for both to finish
        odds.join();

        System.out.println("Even sum: " + results[0]);
        System.out.println("Odd sum: " + results[1]);
        System.out.println("Total: " + (results[0] + results[1]));
    }
}
```
```output
Even sum: 2550
Odd sum: 2500
Total: 5050
```

> **Warning:** Call `start()`, not `run()`. Calling `run()` directly just runs the code on the current thread, with no concurrency at all.

## Race conditions and synchronized

When two threads update the same variable, their steps can interleave and updates get lost. This is a **race condition**. Marking a method `synchronized` lets only one thread run it at a time.

```java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        Runnable task = () -> {
            for (int i = 0; i < 100_000; i++) counter.increment();
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Count: " + counter.get());   // always 200000
    }
}

class Counter {
    private int count = 0;

    synchronized void increment() {    // remove "synchronized" and the total comes out wrong
        count++;
    }

    synchronized int get() {
        return count;
    }
}
```
```output
Count: 200000
```

`count++` looks like one step but is really three (read, add, write). Without `synchronized`, two threads can read the same old value and one increment is lost.

## ExecutorService: a pool of threads

Creating threads by hand gets messy. An `ExecutorService` manages a pool of reusable threads; you submit tasks and get back `Future` objects that hold the results.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

public class Main {
    static long countPrimes(int from, int to) {
        long count = 0;
        for (int n = Math.max(2, from); n < to; n++) {
            boolean prime = true;
            for (int d = 2; (long) d * d <= n; d++) {
                if (n % d == 0) { prime = false; break; }
            }
            if (prime) count++;
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(4);
        List<Future<Long>> parts = new ArrayList<>();
        for (int start = 0; start < 100_000; start += 25_000) {
            final int s = start;
            parts.add(pool.submit(() -> countPrimes(s, s + 25_000)));
        }

        long total = 0;
        for (Future<Long> f : parts) {
            total += f.get();                 // waits for that task's result
        }
        pool.shutdown();
        System.out.println("Primes below 100000: " + total);
    }
}
```
```output
Primes below 100000: 9592
```

## Thread-safe tools

Instead of writing `synchronized` yourself, you can often use classes from `java.util.concurrent` that are already safe to share between threads:

- `AtomicInteger`, `AtomicLong`: counters with atomic `incrementAndGet()`.
- `ConcurrentHashMap`: a map many threads can update at once.
- `CompletableFuture`: chain asynchronous tasks, similar to promises in JavaScript.

```java
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger hits = new AtomicInteger();
        Thread[] workers = new Thread[4];
        for (int i = 0; i < workers.length; i++) {
            workers[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) hits.incrementAndGet();
            });
            workers[i].start();
        }
        for (Thread w : workers) w.join();
        System.out.println("Hits: " + hits.get());
    }
}
```
```output
Hits: 4000
```

> **Note:** The order in which threads run is decided by the operating system and changes between runs. That is why the examples above only print after `join()` or `get()`, so their output is always the same.
