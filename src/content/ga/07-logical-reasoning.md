---
title: Logical and Analytical Reasoning
chapter: Analytical Reasoning
description: Syllogisms with Venn diagrams, statements and conclusions, direction sense, blood relations, seating arrangements solved systematically, coding and decoding, and number and letter series.
---
Analytical reasoning questions test careful, systematic thinking rather than knowledge. The common types each have a reliable method.

## Syllogisms

Draw **Venn diagrams** for the premises and accept a conclusion only if it is true in **every** possible diagram.

| Statement | Means |
| --- | --- |
| All A are B | The A circle lies inside the B circle |
| No A is B | The circles do not overlap |
| Some A are B | The circles overlap (at least one element in common) |
| Some A are not B | Part of A lies outside B |

Example: "All doctors are graduates. Some graduates are artists."

- "Some doctors are artists" does **not** follow: the artists could all be non-doctor graduates.
- "Some graduates are doctors" **does** follow (as long as doctors exist), because the doctor circle lies inside the graduate circle.

When two conclusions are "Some A are C" and "No A is C" and neither follows on its own, exactly one of them must be true: the answer is "either one or the other follows".

## Direction sense

Track the position with coordinates. Facing north, "turn right" means east, and so on. A person walks 5 km north, turns right and walks 3 km, turns right and walks 9 km, then turns left and walks 2 km.

North +5, east +3, south −9, east +2: the final position is (5, −4), so the person is √(5² + 4²) = √41 ≈ **6.40 km** away, towards the **south-east** of the start.

## Blood relations

Decode the sentence from the inside out. "Pointing to a man, Riya says: his mother is the only daughter of my mother." The only daughter of Riya's mother is Riya herself, so Riya is the man's **mother**. Drawing a small family tree (with generations as levels) avoids most mistakes:

```tree
caption: The family tree for the statement: one generation per level
Riya's mother | her only daughter is Riya
  Riya | the speaker
    The man | Riya's son
```

## Seating arrangements

List the positions, place the fixed clues first, and test the remaining cases one by one. Five friends A, B, C, D and E sit in a row facing north (positions 1 to 5 from the left):

1. C sits in the middle.
2. A does not sit at either end.
3. B sits immediately to the right of D.
4. E does not sit next to C.
5. D sits somewhere to the left of A.

C is at 3, and E (not next to C) must be at 1 or 5. The pair D B needs two adjacent seats, which leaves only seats 1–2 (with E at 5 and A at 4) or 4–5 (with E at 1 and A at 2). Clue 5 rules out the second case. So the order is **D B C A E**. Checking every arrangement by program confirms the answer is unique:

```python
from itertools import permutations

solutions = []
for order in permutations("ABCDE"):
    pos = {person: i + 1 for i, person in enumerate(order)}
    if (pos["C"] == 3 and pos["A"] not in (1, 5) and pos["B"] == pos["D"] + 1
            and abs(pos["E"] - pos["C"]) != 1 and pos["D"] < pos["A"]):
        solutions.append(" ".join(order))
print(solutions)
```
```output
['D B C A E']
```

Without clue 5 there would be two answers (D B C A E and E A C D B), so a well-posed puzzle needs every clue.

## Coding and decoding

Find the rule from the example, then apply it. If COMPUTER is written EQORWVGT, each letter has moved **2 places forward** in the alphabet (C → E, O → Q, …), so GATE becomes **ICVG**. Other common rules: reversing the word, moving letters by their position number, or replacing letters by their alphabet positions (A = 1, …, Z = 26).

## Number and letter series

Look at the differences, then at the differences of the differences, ratios, squares and cubes, or alternate terms:

- 2, 6, 12, 20, 30, **42**: differences 4, 6, 8, 10, 12 (the terms are n(n + 1)).
- 3, 7, 15, 31, **63**: each term is 2 × previous + 1 (the terms are 2ⁿ − 1).
- 1, 4, 9, 16, 25, **36**: squares.
- 2, 3, 5, 7, 11, **13**: primes.

## Practice questions

```quiz
q: Six people P, Q, R, S, T and U sit in a row (positions 1 to 6 from the left). P sits at one end. T is in position 4. S sits two places to the left of T. R sits immediately to the left of Q. U is not at an end, and R sits to the right of U. Who sits at position 6?
code: python
  from itertools import permutations
  sols = []
  for p in permutations("PQRSTU"):
      pos = {c: i + 1 for i, c in enumerate(p)}
      if (pos["P"] in (1, 6) and pos["T"] == 4 and pos["S"] == pos["T"] - 2 and pos["Q"] == pos["R"] + 1
              and pos["U"] not in (1, 6) and pos["R"] > pos["U"]):
          sols.append(p)
  print(sols[0][5] if len(sols) == 1 else "not unique")
- `P`
* `Q`
- `R`
- `U`
explain: T is at 4, so S is at 2. R and Q need adjacent seats with R on the left; the free seats are 1, 3, 5 and 6, so R–Q must be at 5–6. P (at an end) is then at 1, and U at 3, which is to the left of R. The order is P S U T R Q, so Q is at position 6.
```

```quiz
q: What is the next number in the series 3, 7, 15, 31, 63, …?
answer: 127
verify: 2 * 63 + 1
explain: Each term is twice the previous term plus 1 (the terms are 2ⁿ − 1): 2 × 63 + 1 = 127.
```

```quiz
q: In a code, each letter is replaced by the letter one place **before** it in the alphabet. How is LOGIC written?
code: python
  print("".join(chr((ord(c) - 65 - 1) % 26 + 65) for c in "LOGIC"))
- `MPHJD`
* `KNFHB`
- `KNGHB`
- `LNFHB`
explain: L → K, O → N, G → F, I → H, C → B: KNFHB.
```

```quiz
q: Statements: "All pens are tools. Some tools are expensive." Which conclusion definitely follows?
- Some pens are expensive
- No pen is expensive
* Some tools are pens
- All tools are pens
explain: The pen circle lies inside the tool circle, so some tools are pens (assuming pens exist). The expensive tools may or may not include pens, so neither "some pens are expensive" nor "no pen is expensive" follows.
```

```quiz
q: A man walks 6 km east, turns left and walks 8 km, then turns left again and walks 12 km. How far is he from his starting point, in km?
answer: 10
verify:
  import math
  x, y = 6, 0
  y += 8
  x -= 12
  print(round(math.hypot(x, y), 6))
explain: East 6, then north 8, then west 12: he ends 6 km west and 8 km north of the start, √(6² + 8²) = 10 km away.
```
