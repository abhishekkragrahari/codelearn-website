---
title: Regular Expressions
chapter: Regular Languages
description: Regular expressions and their precedence, useful identities, converting a regular expression to an ε-NFA, converting a DFA back to a regular expression with Arden's theorem, and reading tricky expressions.
---
A **regular expression** (RE) describes a language with a formula instead of a machine. REs are exactly as powerful as finite automata: they describe precisely the regular languages.

## Definition

Over an alphabet Σ:

| Expression | Language |
| --- | --- |
| ∅ | The empty language |
| ε | {ε} |
| a (for a ∈ Σ) | {a} |
| R + S (also written R \| S) | L(R) ∪ L(S) (union) |
| RS | L(R)L(S) (concatenation) |
| R\* | L(R)\* (Kleene star) |
| (R) | Grouping |

**Precedence**: star binds tightest, then concatenation, then union. So `ab* + c` means (a(b\*)) + c, not ((ab)\* + c).

R⁺ = RR\* (one or more) and R? = R + ε (optional) are common abbreviations.

## Examples over {a, b}

| Language | Regular expression |
| --- | --- |
| All strings | (a + b)\* |
| Ending in `abb` | (a + b)\*abb |
| Containing `aa` | (a + b)\*aa(a + b)\* |
| The 3rd symbol from the end is a | (a + b)\*a(a + b)(a + b) |
| An even number of a's | b\*(ab\*ab\*)\* |
| No two consecutive b's | (a + ba)\*(b + ε) |
| Length divisible by 3 | ((a + b)(a + b)(a + b))\* |
| Starting and ending with the same symbol | a(a + b)\*a + b(a + b)\*b + a + b |

Programming languages use the same idea with richer syntax. Python's `re.fullmatch` checks whether a whole string matches, so it can test an RE against all short strings (Python writes union as `|` and ε as an empty alternative):

```python
import re
from itertools import product

def matches(regex, max_len, alphabet="ab"):
    return [w for n in range(max_len + 1)
            for w in ("".join(t) for t in product(alphabet, repeat=n))
            if re.fullmatch(regex, w)]

print("no two consecutive b's:", matches(r"(a|ba)*(b|)", 3))
print("even number of a's:    ", matches(r"b*(ab*ab*)*", 3))
print("count of length 4, no bb:", sum(1 for w in matches(r"(a|ba)*(b|)", 4) if len(w) == 4))
```
```output
no two consecutive b's: ['', 'a', 'b', 'aa', 'ab', 'ba', 'aaa', 'aab', 'aba', 'baa', 'bab']
even number of a's:     ['', 'b', 'aa', 'bb', 'aab', 'aba', 'baa', 'bbb']
count of length 4, no bb: 8
```

## Identities

These are useful for simplifying REs and for "which expressions are equivalent?" questions:

| Identity | Identity |
| --- | --- |
| ∅ + R = R | ∅R = R∅ = ∅ |
| εR = Rε = R | ∅\* = ε, ε\* = ε |
| R + R = R | (R\*)\* = R\* |
| R\*R\* = R\* | RR\* = R\*R = R⁺ |
| (R + S)\* = (R\*S\*)\* = (R\* + S\*)\* | (RS)\*R = R(SR)\* |
| R(S + T) = RS + RT | ε + RR\* = R\* |

Some equations that look right are **false**: (R + S)\* ≠ R\* + S\* (the left side contains `ab`, the right side does not), and (RS)\* ≠ R\*S\*.

## From a regular expression to an ε-NFA

**Thompson's construction** builds an ε-NFA by induction on the expression. Every piece has one start and one accepting state:

- For a symbol a: two states joined by an a-move.
- **Union** R + S: a new start state with ε-moves into both machines, and ε-moves from both accepting states to a new accepting state.
- **Concatenation** RS: an ε-move from R's accepting state to S's start state.
- **Star** R\*: a new start state that is also reachable at the end; ε-moves allow skipping R entirely or repeating it.

The result has at most 2 × (number of symbols and operators) states, and the subset construction then turns it into a DFA.

## From a DFA to a regular expression: Arden's theorem

> **Arden's theorem**: if P and Q are REs and P does not contain ε, then the equation **R = Q + RP** has the unique solution **R = QP\***.

To convert a DFA, write one equation per state, saying how each state can be **reached**: the start state gets an extra ε term. Then solve the equations by substitution, using Arden's theorem to remove self-references.

Example: the DFA for "strings ending in `01`" (states A, B, C, start A, accepting C, from the DFA lesson):

- A = ε + A1 + C1 (A is the start, and is entered on 1 from A and from C)
- B = A0 + B0 + C0
- C = B1

Substitute C = B1 into B: B = A0 + B0 + B10 = A0 + B(0 + 10). By Arden, **B = A0(0 + 10)\***.

Substitute into A: A = ε + A1 + A0(0 + 10)\*11 = ε + A(1 + 0(0 + 10)\*11). By Arden, **A = (1 + 0(0 + 10)\*11)\***.

So the language is C = B1 = **(1 + 0(0 + 10)\*11)\* 0(0 + 10)\* 1**. It is equivalent to the much simpler (0 + 1)\*01: different methods give different but equivalent expressions.

The other common method, **state elimination**, removes states one at a time and labels the remaining edges with REs, until only the start and accepting states remain.

## Practice questions

```quiz
q: How many strings of length 5 over {a, b} match (a + b)\*a(a + b)(a + b)?
answer: 16
verify:
  import re
  from itertools import product
  print(sum(1 for t in product("ab", repeat=5) if re.fullmatch(r"(a|b)*a(a|b)(a|b)", "".join(t))))
explain: The RE says the 3rd symbol from the end is a. That fixes one of the 5 positions; the other 4 are free: 2⁴ = 16 strings.
```

```quiz
q: Which regular expression describes the strings over {a, b} with **no two consecutive b's**?
- (a + b)\*bb(a + b)\*
* (a + ba)\*(b + ε)
- (ab)\*
- a\*b\*
explain: Every b must be followed by an a, except possibly a b at the very end, which the (b + ε) part allows. The first option is the complement (strings that do contain bb); (ab)\* and a\*b\* miss strings such as aab and bab.
```

```quiz
q: Which equations are **true** for all regular expressions R and S? (Select all that apply.)
* (R\*)\* = R\*
* (R + S)\* = (R\*S\*)\*
- (R + S)\* = R\* + S\*
* (RS)\*R = R(SR)\*
explain: Starring twice changes nothing. (R\*S\*)\* can produce any sequence of R- and S-pieces, just like (R + S)\*. R\* + S\* cannot mix R and S pieces, so it is smaller. Both sides of the last one describe R, S, R, S, ..., R alternations.
```

```quiz
q: How many strings of length 4 over {a, b} contain an even number of a's?
answer: 8
verify:
  import re
  from itertools import product
  print(sum(1 for t in product("ab", repeat=4) if re.fullmatch(r"b*(ab*ab*)*", "".join(t))))
explain: Half of the 2⁴ = 16 strings have an even number of a's (0, 2 or 4 a's: 1 + 6 + 1 = 8), matched by b\*(ab\*ab\*)\*.
```

```quiz
q: By Arden's theorem, what is the solution of R = 0 + R1?
- 1\*0
* 01\*
- (0 + 1)\*
- 0\*1
explain: Arden's theorem solves R = Q + RP as R = QP\*. Here Q = 0 and P = 1 (which does not contain ε), so R = 01\*.
```
