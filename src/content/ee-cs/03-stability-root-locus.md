---
title: Stability: Routh-Hurwitz and Root Locus
chapter: Stability
description: BIBO stability, Routh-Hurwitz criterion and special cases, range of K for stability, root locus rules (asymptotes, centroid, breakaway points, jω crossing) and effect of adding poles and zeros.
---
A closed-loop system is stable when all its poles lie in the **left half of the s-plane**. Routh's test checks this without finding the roots; the root locus shows how the poles move as the gain changes.

## Routh–Hurwitz criterion

For the characteristic equation a₀sⁿ + a₁sⁿ⁻¹ + … + aₙ = 0:

1. Necessary: all coefficients present and of the same sign.
2. Build the Routh array: first two rows from alternate coefficients; each next entry = (product cross-difference)/(first element of the row above).
3. **The number of sign changes in the first column = the number of right-half-plane roots.**

**Special cases:**

- A **zero in the first column** (rest non-zero): replace it by a small ε and continue.
- A **whole row of zeros:** form the auxiliary polynomial from the row above, differentiate it, and use its coefficients. It signals symmetric roots (for example on the jω axis → sustained oscillation).

For **s³ + a s² + b s + c**: stable if a, b, c > 0 and **ab > c**.

## Root locus

The root locus traces the closed-loop poles of 1 + K G(s)H(s) = 0 as K goes from 0 to ∞.

- Starts at the open-loop **poles** (K = 0), ends at the open-loop **zeros** (or at infinity).
- Number of branches = number of poles (n).
- **On the real axis:** a point is on the locus if the number of real poles and zeros to its right is **odd**.
- **Asymptotes:** n − m of them, at angles (2q + 1)180°/(n − m).
- **Centroid:** σ = (Σ poles − Σ zeros)/(n − m).
- **Breakaway points:** solve dK/ds = 0.
- **jω-axis crossing:** from the Routh array (marginal K and the oscillation frequency).
- Angle condition ∠GH = ±180°(2q + 1); magnitude condition |KGH| = 1.

Adding a pole pushes the locus to the right (less stable); adding a zero pulls it to the left (more stable).

## Worked example

G(s)H(s) = K/(s(s + 2)(s + 4)), unity feedback.

- Characteristic equation: s³ + 6s² + 8s + K = 0.
- Stable if K > 0 and 6 × 8 > K: **0 < K < 48**.
- At K = 48 the auxiliary equation 6s² + 48 = 0 gives oscillation at **ω = 2√2 = 2.83 rad/s**.
- Asymptote centroid = (0 − 2 − 4)/3 = **−2**, at ±60° and 180°.

## Practice

```quiz
q: For s³ + 4s² + 5s + K = 0, what is the largest K for stability?
answer: 20
verify: 4 * 5
explain: Stable when 4 × 5 > K, so K < 20 (the marginal value is 20).
```

```quiz
q: G(s)H(s) = K(s + 1)/(s(s + 3)(s + 5)). Where is the centroid of the asymptotes?
answer: -3.5
verify: ((0 - 3 - 5) - (-1)) / (3 - 1)
explain: σ = (Σp − Σz)/(n − m) = (−8 + 1)/2 = −3.5.
```

```quiz
q: How many roots of s³ − s² + 2s + 8 = 0 lie in the right half-plane? (Use Routh's array.)
answer: 2
verify:
  a = [1, -1, 2, 8]
  b1 = (a[1] * a[2] - a[0] * a[3]) / a[1]
  col = [a[0], a[1], b1, a[3]]
  print(sum(1 for x, y in zip(col, col[1:]) if x * y < 0))
explain: First column: 1, −1, (−2 − 8)/(−1) = 10, 8. Two sign changes: two RHP roots.
```

```quiz
q: On the real axis, a point lies on the root locus if the total number of real poles and zeros to its right is:
* Odd
- Even
- Zero
- Equal to the number of asymptotes
explain: Only then does the angle condition (an odd multiple of 180°) hold.
```
