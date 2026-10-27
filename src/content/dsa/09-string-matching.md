---
title: Pattern Matching: Naive, KMP and Rabin-Karp
chapter: Linear Data Structures
description: String basics, the naive matcher, the KMP algorithm and its LPS (failure) array, Rabin-Karp rolling hashes, and when to use each, with code in Java, Python and C.
---
A **string** is an array of characters. The most common string problem is **pattern matching**: find every position where a pattern P of length m occurs in a text T of length n. Editors, search engines and DNA tools all depend on it.

## The naive matcher

Try every shift s from 0 to n − m and compare P with T[s..s + m − 1] character by character.

- Worst case **O((n − m + 1) m)**, for example T = AAAA…A and P = AA…AB.
- It throws away what it learned: after a mismatch it moves P by only one position and starts comparing again from P[0].

## KMP (Knuth–Morris–Pratt)

KMP never moves backwards in the text. When a mismatch happens after j matched characters, it already knows the last j characters of the text, so it shifts the pattern using the **LPS array** (longest proper prefix that is also a suffix):

**lps[i]** = length of the longest proper prefix of P[0..i] that is also a suffix of P[0..i].

| i | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P[i] | A | B | A | B | C | A | B | A | B |
| lps[i] | 0 | 0 | 1 | 2 | 0 | 1 | 2 | 3 | 4 |

```flowchart
caption: One step of the KMP search
start: Compare T[i] with P[j]
if: T[i] == P[j]?
  yes:
    step: i++, j++
    if: j == m?
      yes:
        io: Match at i − m; j = lps[j − 1]
  no:
    if: j > 0?
      yes:
        step: j = lps[j − 1] (i stays)
      no:
        step: i++
end: Next step
```

Building the LPS array takes O(m) and the search O(n): **O(n + m) in the worst case**.

## Rabin–Karp

Compare **hash values** instead of strings. The hash of each text window is updated in O(1) from the previous one (a **rolling hash**):

hash(s + 1) = (hash(s) − T[s]·B^(m−1))·B + T[s + m]  (mod q)

- Equal hashes are checked character by character, because different strings can collide (**spurious hits**).
- Expected time **O(n + m)**; worst case O(nm) when many hashes collide.
- It extends easily to searching for many patterns at once.

## The code

```java
import java.util.*;

public class Main {
    // lps[i] = length of the longest proper prefix of p[0..i] that is also a suffix of it.
    static int[] buildLps(String p) {
        int[] lps = new int[p.length()];
        int len = 0;
        for (int i = 1; i < p.length(); ) {
            if (p.charAt(i) == p.charAt(len)) lps[i++] = ++len;
            else if (len > 0) len = lps[len - 1];   // fall back, do not move i
            else lps[i++] = 0;
        }
        return lps;
    }

    static List<Integer> kmp(String t, String p) {
        int[] lps = buildLps(p);
        List<Integer> found = new ArrayList<>();
        for (int i = 0, j = 0; i < t.length(); ) {
            if (t.charAt(i) == p.charAt(j)) {
                i++; j++;
                if (j == p.length()) { found.add(i - j); j = lps[j - 1]; }
            } else if (j > 0) j = lps[j - 1];       // the text pointer never moves back
            else i++;
        }
        return found;
    }

    static List<Integer> rabinKarp(String t, String p) {
        final int B = 256, M = 101;
        int m = p.length(), h = 1, hp = 0, ht = 0;
        for (int i = 0; i < m - 1; i++) h = h * B % M;          // B^(m-1) mod M
        for (int i = 0; i < m; i++) {
            hp = (hp * B + p.charAt(i)) % M;
            ht = (ht * B + t.charAt(i)) % M;
        }
        List<Integer> found = new ArrayList<>();
        for (int s = 0; s + m <= t.length(); s++) {
            if (hp == ht && t.regionMatches(s, p, 0, m)) found.add(s);  // check on hash hit
            if (s + m < t.length()) {                               // roll the hash
                ht = ((ht - t.charAt(s) * h % M + M) * B + t.charAt(s + m)) % M;
            }
        }
        return found;
    }

    public static void main(String[] args) {
        String p = "ABABCABAB";
        System.out.println("lps of " + p + " = " + Arrays.toString(buildLps(p)));
        String t = "ABABDABACDABABCABABCABAB";
        System.out.println("KMP matches at " + kmp(t, p));
        System.out.println("Rabin-Karp matches at " + rabinKarp(t, p));
    }
}
```
```output
lps of ABABCABAB = [0, 0, 1, 2, 0, 1, 2, 3, 4]
KMP matches at [10, 15]
Rabin-Karp matches at [10, 15]
```
```python
def build_lps(p):
    """lps[i] = length of the longest proper prefix of p[:i+1] that is also its suffix."""
    lps = [0] * len(p)
    length, i = 0, 1
    while i < len(p):
        if p[i] == p[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length - 1]        # fall back, do not move i
        else:
            lps[i] = 0
            i += 1
    return lps

def kmp(t, p):
    lps, found = build_lps(p), []
    i = j = 0
    while i < len(t):
        if t[i] == p[j]:
            i += 1
            j += 1
            if j == len(p):
                found.append(i - j)
                j = lps[j - 1]
        elif j > 0:
            j = lps[j - 1]                  # the text pointer never moves back
        else:
            i += 1
    return found

def rabin_karp(t, p, B=256, M=101):
    m = len(p)
    h = pow(B, m - 1, M)                    # B^(m-1) mod M
    hp = ht = 0
    for i in range(m):
        hp = (hp * B + ord(p[i])) % M
        ht = (ht * B + ord(t[i])) % M
    found = []
    for s in range(len(t) - m + 1):
        if hp == ht and t[s:s + m] == p:    # check on hash hit
            found.append(s)
        if s + m < len(t):                  # roll the hash
            ht = ((ht - ord(t[s]) * h) * B + ord(t[s + m])) % M
    return found

p = "ABABCABAB"
print(f"lps of {p} = {build_lps(p)}")
t = "ABABDABACDABABCABABCABAB"
print("KMP matches at", kmp(t, p))
print("Rabin-Karp matches at", rabin_karp(t, p))
```
```output
lps of ABABCABAB = [0, 0, 1, 2, 0, 1, 2, 3, 4]
KMP matches at [10, 15]
Rabin-Karp matches at [10, 15]
```
```c
#include <stdio.h>
#include <string.h>

void build_lps(const char *p, int m, int *lps) {
    int len = 0;
    lps[0] = 0;
    for (int i = 1; i < m; ) {
        if (p[i] == p[len]) lps[i++] = ++len;
        else if (len > 0) len = lps[len - 1];   /* fall back, do not move i */
        else lps[i++] = 0;
    }
}

void print_list(const char *label, int *v, int k) {
    printf("%s[", label);
    for (int i = 0; i < k; i++) printf(i ? ", %d" : "%d", v[i]);
    printf("]\n");
}

int main(void) {
    const char *p = "ABABCABAB", *t = "ABABDABACDABABCABABCABAB";
    int m = strlen(p), n = strlen(t), lps[16], found[16], k = 0;

    build_lps(p, m, lps);
    printf("lps of %s = ", p);
    print_list("", lps, m);

    for (int i = 0, j = 0; i < n; ) {           /* KMP */
        if (t[i] == p[j]) {
            i++; j++;
            if (j == m) { found[k++] = i - j; j = lps[j - 1]; }
        } else if (j > 0) j = lps[j - 1];       /* the text pointer never moves back */
        else i++;
    }
    print_list("KMP matches at ", found, k);

    const int B = 256, M = 101;                 /* Rabin-Karp */
    int h = 1, hp = 0, ht = 0;
    for (int i = 0; i < m - 1; i++) h = h * B % M;
    for (int i = 0; i < m; i++) {
        hp = (hp * B + p[i]) % M;
        ht = (ht * B + t[i]) % M;
    }
    k = 0;
    for (int s = 0; s + m <= n; s++) {
        if (hp == ht && strncmp(t + s, p, m) == 0) found[k++] = s;   /* check on hash hit */
        if (s + m < n) ht = ((ht - t[s] * h % M + M) * B + t[s + m]) % M;  /* roll */
    }
    print_list("Rabin-Karp matches at ", found, k);
    return 0;
}
```
```output
lps of ABABCABAB = [0, 0, 1, 2, 0, 1, 2, 3, 4]
KMP matches at [10, 15]
Rabin-Karp matches at [10, 15]
```

## Choosing a method

| Method | Preprocessing | Search (worst) | Notes |
| --- | --- | --- | --- |
| Naive | none | O(nm) | Fine for short patterns |
| **KMP** | O(m) | **O(n)** | Never re-reads the text |
| Rabin–Karp | O(m) | O(nm), expected O(n + m) | Many patterns, plagiarism checks |
| Finite automaton | O(m·Σ) | O(n) | Σ = alphabet size |

## GATE-style practice questions

```quiz
q: What is the last value of the LPS (failure) array for the pattern "AABAACAABAA"?
answer: 5
verify:
  p = "AABAACAABAA"
  lps, k = [0] * len(p), 0
  for i in range(1, len(p)):
      while k and p[i] != p[k]:
          k = lps[k - 1]
      if p[i] == p[k]:
          k += 1
      lps[i] = k
  print(lps[-1])
explain: The LPS array is [0, 1, 0, 1, 2, 0, 1, 2, 3, 4, 5]; "AABAA" is both a prefix and a suffix of the whole pattern.
```

```quiz
q: The naive matcher compares P = "AAAB" against T = "AAAAAAAA" (8 characters). How many character comparisons does it make in total?
answer: 20
verify: sum(next((k + 1 for k in range(4) if "AAAAAAAA"[s + k] != "AAAB"[k]), 4) for s in range(5))
explain: Each of the 5 shifts matches three A's and fails on the 4th character: 5 × 4 = 20 comparisons.
```

```quiz
q: What is the worst-case time of the KMP search phase on a text of length n (after preprocessing)?
- O(nm)
* O(n)
- O(n log m)
- O(m²)
explain: The text index never moves back and each fallback is paid for by earlier progress, so the search is linear in n.
```

```quiz
q: In Rabin–Karp, a "spurious hit" is:
* A window whose hash equals the pattern's hash but whose text does not match
- A match the algorithm misses
- A hash value larger than the modulus
- A pattern longer than the text
explain: Different strings can share a hash value, so every hash match must be confirmed character by character.
```
