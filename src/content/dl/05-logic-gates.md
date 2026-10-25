---
title: Logic Gates and Universal Gates
chapter: Boolean Algebra and Gates
description: The basic gates and their truth tables, XOR and XNOR properties, NAND and NOR as universal gates, gate counts for common functions, and analysing gate circuits.
---
A **logic gate** is a circuit that computes a Boolean function of its inputs. Every digital system, from a calculator to a CPU, is built from a few kinds of gates.

## The basic gates

| Gate | Expression | Output is 1 when |
| --- | --- | --- |
| NOT | A′ | A = 0 |
| AND | AB | all inputs are 1 |
| OR | A + B | at least one input is 1 |
| NAND | (AB)′ | at least one input is 0 |
| NOR | (A + B)′ | all inputs are 0 |
| XOR | A ⊕ B = A′B + AB′ | the inputs differ (an odd number of 1s) |
| XNOR | (A ⊕ B)′ = AB + A′B′ | the inputs are equal (an even number of 1s) |

```python
from itertools import product

gates = {
    "AND": lambda a, b: a & b, "OR": lambda a, b: a | b,
    "NAND": lambda a, b: 1 - (a & b), "NOR": lambda a, b: 1 - (a | b),
    "XOR": lambda a, b: a ^ b, "XNOR": lambda a, b: 1 - (a ^ b),
}
print("A B  " + "  ".join(f"{g:>4}" for g in gates))
for a, b in product([0, 1], repeat=2):
    print(f"{a} {b}  " + "  ".join(f"{fn(a, b):>4}" for fn in gates.values()))
```
```output
A B   AND    OR  NAND   NOR   XOR  XNOR
0 0     0     0     1     1     0     1
0 1     0     1     1     0     1     0
1 0     0     1     1     0     1     0
1 1     1     1     0     0     0     1
```

## XOR properties

XOR appears in adders, parity circuits, comparators and error detection. Its algebra:

- A ⊕ 0 = A, A ⊕ 1 = A′, A ⊕ A = 0, A ⊕ A′ = 1
- Commutative and associative, so A ⊕ B ⊕ C is well defined: it is 1 when an **odd** number of inputs are 1 (an **odd parity** function).
- If A ⊕ B = C then A ⊕ C = B (XOR undoes itself, which is why it is used in simple encryption and RAID parity).
- A ⊕ B = (A + B)(AB)′.

## Universal gates

A gate is **universal** if NOT, AND and OR (and therefore every Boolean function) can be built from it alone. **NAND and NOR are both universal.**

With NAND (written ↑):

- NOT A = A ↑ A (1 gate)
- A AND B = (A ↑ B) ↑ (A ↑ B) (2 gates)
- A OR B = (A ↑ A) ↑ (B ↑ B) (3 gates)

With NOR (written ↓), everything is dual: NOT needs 1, **OR** needs 2, **AND** needs 3.

| Function | Minimum NAND gates | Minimum NOR gates |
| --- | --- | --- |
| NOT | 1 | 1 |
| AND | 2 | 3 |
| OR | 3 | 2 |
| XOR | **4** | 5 |
| XNOR | 5 | **4** |

XOR from four NANDs: with N = A ↑ B, the output is (A ↑ N) ↑ (B ↑ N). The program checks this, and the NOR-only XNOR, against the truth tables:

```python
from itertools import product

nand = lambda a, b: 1 - (a & b)
nor = lambda a, b: 1 - (a | b)

def xor_from_nand(a, b):
    n = nand(a, b)
    return nand(nand(a, n), nand(b, n))          # 4 NAND gates

def xnor_from_nor(a, b):
    n = nor(a, b)
    return nor(nor(a, n), nor(b, n))             # 4 NOR gates

print(all(xor_from_nand(a, b) == a ^ b for a, b in product([0, 1], repeat=2)))
print(all(xnor_from_nor(a, b) == 1 - (a ^ b) for a, b in product([0, 1], repeat=2)))
```
```output
True
True
```

The same 4-gate structure gives XOR with NAND and XNOR with NOR, by duality.

## Two-level NAND and NOR circuits

- An **SOP** expression (AND gates feeding an OR gate) becomes a circuit of **NAND gates only** by replacing every gate with a NAND: NAND–NAND = AND–OR.
- A **POS** expression (OR gates feeding an AND gate) becomes **NOR gates only**: NOR–NOR = OR–AND.

Both follow from De Morgan: ((AB)′(CD)′)′ = AB + CD.

## Analysing a circuit

To find what a circuit computes, write the expression at each gate output, from the inputs forward, then simplify. For example, a NAND of (A NAND B) and (A NAND C) gives ((AB)′(AC)′)′ = AB + AC = A(B + C).

## Practice questions

```quiz
q: What is the minimum number of 2-input NOR gates needed to build a 2-input XOR?
answer: 5
verify: 5
explain: Four NOR gates in the standard arrangement give XNOR; one more NOR used as an inverter turns it into XOR. (With NAND gates it is the other way round: 4 for XOR, 5 for XNOR.)
```

```quiz
q: What does this circuit compute? Y = NAND(NAND(A, B), NAND(A, C)).
code: python
  from itertools import product
  nand = lambda a, b: 1 - (a & b)
  rows = list(product([0, 1], repeat=3))
  y = [nand(nand(a, b), nand(a, c)) for a, b, c in rows]
  candidates = {"A(B + C)": lambda a, b, c: a & (b | c), "AB + C": lambda a, b, c: (a & b) | c,
                "A + BC": lambda a, b, c: a | (b & c), "ABC": lambda a, b, c: a & b & c}
  print(next(k for k, f in candidates.items() if [f(*r) for r in rows] == y))
* `A(B + C)`
- `AB + C`
- `A + BC`
- `ABC`
explain: By De Morgan, ((AB)′(AC)′)′ = AB + AC = A(B + C). This is the NAND–NAND form of an AND–OR circuit.
```

```quiz
q: For how many of the 16 input combinations of A, B, C, D is A ⊕ B ⊕ C ⊕ D equal to 1?
answer: 8
verify:
  from itertools import product
  print(sum(a ^ b ^ c ^ d for a, b, c, d in product([0, 1], repeat=4)))
explain: A chain of XORs is 1 exactly when an odd number of inputs are 1. Half of the 16 combinations have odd parity: C(4,1) + C(4,3) = 4 + 4 = 8.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Any Boolean function can be built using only NAND gates
* An AND–OR circuit can be converted to a NAND–NAND circuit with the same structure
- XOR is a universal gate
* A ⊕ A′ = 1
explain: NAND is universal, and replacing every gate of a two-level AND–OR circuit by NAND keeps the function (De Morgan). XOR gates, even with the constant 1, only build functions of the form A ⊕ B ⊕ … ⊕ constant, which never include AND, so XOR is not universal. A and A′ always differ, so their XOR is 1.
```
