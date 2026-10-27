---
title: Vector Calculus
chapter: Vector Calculus
description: Gradient, directional derivative, divergence and curl, vector identities, line, surface and volume integrals, and the theorems of Green, Stokes and Gauss, with solved GATE examples for CE, ME, EE and EC.
---
Vector calculus describes quantities that vary in space: temperature (a scalar field), fluid velocity and electric fields (vector fields). It appears in the Engineering Mathematics section of the CE, ME, EE and EC papers.

## Gradient and directional derivative

For a scalar field φ(x, y, z), the **gradient** is ∇φ = (∂φ/∂x, ∂φ/∂y, ∂φ/∂z).

- ∇φ points in the direction of the **fastest increase** of φ, and its magnitude is that rate.
- ∇φ is **normal** to the level surface φ = constant; the unit normal is ∇φ/|∇φ|.
- The **directional derivative** in the direction of a unit vector **â** is **D<sub>a</sub>φ = ∇φ · â**. Its maximum value is |∇φ|.

**Example.** φ = x²y + yz³ at (1, 2, 1): ∇φ = (2xy, x² + z³, 3yz²) = (4, 2, 6). In the direction of (1, 2, 2), the unit vector is (1, 2, 2)/3, so D = (4 + 4 + 12)/3 = 20/3.

## Divergence and curl

For **F** = (F₁, F₂, F₃):

- **Divergence** ∇·**F** = ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z, a scalar: the net outflow per unit volume. **F** is **solenoidal** if ∇·**F** = 0.
- **Curl** ∇ × **F** = (∂F₃/∂y − ∂F₂/∂z, ∂F₁/∂z − ∂F₃/∂x, ∂F₂/∂x − ∂F₁/∂y), a vector: the rotation. **F** is **irrotational** (conservative) if ∇ × **F** = 0, and then **F** = ∇φ for a scalar potential φ.

**Identities** (always true for smooth fields):

- ∇ × (∇φ) = 0 (the curl of a gradient is zero)
- ∇·(∇ × **F**) = 0 (the divergence of a curl is zero)
- ∇·(∇φ) = ∇²φ (the Laplacian)
- ∇ × (∇ × **F**) = ∇(∇·**F**) − ∇²**F**
- For **r** = (x, y, z): ∇·**r** = 3, ∇ × **r** = 0, ∇r = **r**/r.

## Line, surface and volume integrals

- **Line integral** ∫<sub>C</sub> **F**·d**r**: the work done by **F** along C. For a conservative field it depends only on the end points: ∫ ∇φ·d**r** = φ(B) − φ(A), and it is zero around any closed curve.
- **Surface integral** ∬<sub>S</sub> **F**·**n̂** dS: the flux through S.
- **Volume integral** ∭<sub>V</sub> f dV.

## The three theorems

| Theorem | Statement | Relates |
| --- | --- | --- |
| **Green** (plane) | ∮<sub>C</sub> (P dx + Q dy) = ∬<sub>R</sub> (∂Q/∂x − ∂P/∂y) dA | Line integral around C ↔ double integral over the region inside |
| **Stokes** | ∮<sub>C</sub> **F**·d**r** = ∬<sub>S</sub> (∇ × **F**)·**n̂** dS | Circulation around C ↔ flux of the curl through any surface bounded by C |
| **Gauss** (divergence) | ∯<sub>S</sub> **F**·**n̂** dS = ∭<sub>V</sub> ∇·**F** dV | Flux out of a closed surface ↔ volume integral of the divergence |

A handy special case of Green's theorem: the area of a region is ½∮(x dy − y dx).

## Worked example

Check the directional derivative above, the divergence and curl of **F** = (x²y, yz, xz²) at (1, 1, 1), and verify Gauss's theorem for **F** = (x, y, z) over the unit cube (flux = ∭ 3 dV = 3).

```python
def grad(f, p, h=1e-6):
    return [(f(*[p[j] + (h if j == i else 0) for j in range(3)]) - f(*[p[j] - (h if j == i else 0) for j in range(3)])) / (2 * h) for i in range(3)]

phi = lambda x, y, z: x * x * y + y * z ** 3
g = grad(phi, [1, 2, 1])
print("grad phi at (1, 2, 1):", [round(v, 6) for v in g])
a = [1 / 3, 2 / 3, 2 / 3]
print(f"directional derivative = {sum(gi * ai for gi, ai in zip(g, a)):.6f} (20/3 = {20 / 3:.6f})")

# F = (x^2 y, y z, x z^2): div = 2xy + z + 2xz; curl = (0 - y, 0 - z^2, 0 - x^2)
x, y, z = 1, 1, 1
print("div F at (1,1,1) =", 2 * x * y + z + 2 * x * z, " curl F =", (-y, -z * z, -x * x))

# Gauss: outward flux of F = (x, y, z) through the six faces of the unit cube, by a midpoint sum
F = lambda p: p
n = 50
flux = 0.0
for axis in range(3):
    for side, normal in ((1.0, 1), (0.0, -1)):
        for i in range(n):
            for j in range(n):
                u, v = (i + 0.5) / n, (j + 0.5) / n
                p = [u, v]
                p.insert(axis, side)
                flux += normal * F(p)[axis] / (n * n)
print(f"flux through the unit cube = {flux:.6f}; triple integral of div F (= 3) over the cube = 3")
```
```output
grad phi at (1, 2, 1): [4.0, 2.0, 6.0]
directional derivative = 6.666667 (20/3 = 6.666667)
div F at (1,1,1) = 5  curl F = (-1, -1, -1)
flux through the unit cube = 3.000000; triple integral of div F (= 3) over the cube = 3
```

## Practice questions

```quiz
q: What is the divergence of **F** = (3x², 2y, −z) at the point (1, 2, 3)?
answer: 7
verify: 6 * 1 + 2 - 1
explain: ∇·**F** = 6x + 2 − 1 = 6 + 1 = 7 at x = 1.
```

```quiz
q: What is the maximum directional derivative of φ = x² + y² + z² at the point (1, 2, 2)?
answer: 6
verify: (2 ** 2 + 4 ** 2 + 4 ** 2) ** 0.5
explain: ∇φ = (2x, 2y, 2z) = (2, 4, 4), whose magnitude √(4 + 16 + 16) = 6 is the maximum rate of increase.
```

```quiz
q: Using Gauss's theorem, what is the outward flux of **F** = (x, y, z) through the sphere of radius 2 centred at the origin? Give the answer to two decimal places.
answer: 100.53
verify: round(3 * 4 / 3 * __import__("math").pi * 2 ** 3, 2)
explain: ∇·**F** = 3, so the flux is 3 × volume = 3 × (4/3)π(2³) = 32π ≈ 100.53.
```

```quiz
q: Using Green's theorem, what is ∮(x dy − y dx) around the circle x² + y² = 1 (anticlockwise)? Give the answer to four decimal places.
answer: 6.2832
verify: round(2 * __import__("math").pi, 4)
explain: With P = −y and Q = x, ∂Q/∂x − ∂P/∂y = 2, so the integral is 2 × area = 2π ≈ 6.2832.
```

```quiz
q: Which statements are **always true** for smooth fields? (Select all that apply.)
* The curl of a gradient is zero
* The divergence of a curl is zero
- The gradient of a divergence is zero
* The line integral of a conservative field around a closed curve is zero
explain: ∇ × ∇φ = 0 and ∇·(∇ × F) = 0 are identities. ∇(∇·F) is generally non-zero. A conservative field has a potential, so its circulation is zero.
```
