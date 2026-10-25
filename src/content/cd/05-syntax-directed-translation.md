---
title: Syntax-Directed Translation
chapter: Front End
description: Attributes and semantic rules, synthesized and inherited attributes, annotated parse trees, S-attributed and L-attributed definitions, translation schemes with embedded actions, and evaluating them.
---
Parsing only checks structure. To compute something from that structure (a value, a type, intermediate code), the compiler attaches **attributes** to grammar symbols and **semantic rules** to productions. This is **syntax-directed translation**.

## Syntax-directed definitions

A **syntax-directed definition (SDD)** gives each production a set of rules that compute attributes. For an expression calculator:

| Production | Semantic rule |
| --- | --- |
| L → E | print(E.val) |
| E → E₁ + T | E.val = E₁.val + T.val |
| E → T | E.val = T.val |
| T → T₁ \* F | T.val = T₁.val × F.val |
| T → F | T.val = F.val |
| F → ( E ) | F.val = E.val |
| F → digit | F.val = digit.lexval |

A parse tree with the attribute values written at each node is an **annotated parse tree**. For `3 * 5 + 4` the root gets E.val = 19.

## Synthesized and inherited attributes

- A **synthesized** attribute of a node is computed from its **children** (and itself): information flows **up** the tree. `val` above is synthesized.
- An **inherited** attribute of a node is computed from its **parent and siblings**: information flows **down** or **sideways**.

Inherited attributes are natural for declarations, where the type comes first and must be passed to every name:

| Production | Semantic rules |
| --- | --- |
| D → T L | L.inh = T.type |
| T → int | T.type = integer |
| T → float | T.type = float |
| L → L₁ , id | L₁.inh = L.inh; addtype(id.entry, L.inh) |
| L → id | addtype(id.entry, L.inh) |

For `float a, b, c` the type float flows down through every L node to each identifier.

## Evaluation order

The rules impose a **dependency graph** on the attribute instances; they must be evaluated in a **topological order** of that graph. A cycle means no order exists. Two classes of SDDs can always be evaluated during parsing:

- **S-attributed**: uses **only synthesized** attributes. Evaluated bottom-up, so it fits **LR parsers** naturally (compute the attribute when reducing).
- **L-attributed**: each inherited attribute of a symbol Xᵢ in A → X₁ … Xₙ depends only on A's inherited attributes and on attributes of the symbols **to its left** (X₁ … Xᵢ₋₁). Evaluated in one **left-to-right depth-first** pass, so it fits **LL / recursive-descent parsers**.

Every S-attributed definition is L-attributed. An SDD whose rule for X₁ uses an attribute of X₂ (a sibling on the right) is not L-attributed.

## Translation schemes

A **syntax-directed translation scheme (SDT)** embeds **actions** inside the right sides of productions; an action runs when the parser reaches its position. For example, this scheme translates infix expressions to postfix:

E → E + T { print('+') } | T
T → T \* F { print('\*') } | F
F → num { print(num.val) }

Each operator is printed after both of its operands, so `2 + 3 * 4` becomes `2 3 4 * +`. Moving each action to the front of its right side would produce prefix notation instead. A recursive-descent implementation (left recursion turned into loops) shows the order in which actions fire:

```python
import re

def translate(text, prefix=False):
    tokens, pos, out = re.findall(r"\d+|[-+*/()]", text), 0, []

    def peek():
        return tokens[pos] if pos < len(tokens) else None

    def take():
        nonlocal pos
        pos += 1
        return tokens[pos - 1]

    def expr():                       # E -> T { + T print('+') }
        left = term()
        while peek() == "+":
            take()
            right = term()
            left = ["+", left, right] if prefix else left + right + ["+"]
        return left

    def term():                       # T -> F { * F print('*') }
        left = factor()
        while peek() == "*":
            take()
            right = factor()
            left = ["*", left, right] if prefix else left + right + ["*"]
        return left

    def factor():                     # F -> num | ( E )
        if peek() == "(":
            take(); inner = expr(); take()
            return inner
        return [take()]

    def flatten(t):
        return [t] if isinstance(t, str) else [x for part in t for x in flatten(part)]

    return " ".join(flatten(expr()))

for e in ["2 + 3 * 4", "(2 + 3) * 4", "8 * 2 + 5 * 3"]:
    print(f"{e:14} postfix: {translate(e):14} prefix: {translate(e, prefix=True)}")
```
```output
2 + 3 * 4      postfix: 2 3 4 * +      prefix: + 2 * 3 4
(2 + 3) * 4    postfix: 2 3 + 4 *      prefix: * + 2 3 4
8 * 2 + 5 * 3  postfix: 8 2 * 5 3 * +  prefix: + * 8 2 * 5 3
```

## Reading operator precedence from a grammar

GATE often gives a grammar with unusual operators and asks for the value of an expression. The grammar itself fixes the meaning:

- An operator in a production **closer to the start symbol** has **lower** precedence (it is applied last).
- **Left recursion** (E → E op T) makes the operator **left-associative**; right recursion (E → T op E) makes it right-associative.

Example: E → E # T { E.val = E.val × T.val } | T, T → T & F { T.val = T.val + F.val } | F, F → num. Here `#` means multiplication but has the **lower** precedence, and `&` means addition with the **higher** precedence. So 2 # 3 & 5 # 6 & 4 = 2 × (3 + 5) × (6 + 4) = 160.

## Practice questions

```quiz
q: Using the grammar E → E # T { E.val = E.val × T.val } | T, T → T & F { T.val = T.val + F.val } | F, F → num, what is the value of 3 & 2 # 4 & 1?
code: python
  import re
  def evaluate(s):
      toks, pos = re.findall(r"\d+|\S", s), [0]
      def F():
          pos[0] += 1
          return int(toks[pos[0] - 1])
      def T():
          v = F()
          while pos[0] < len(toks) and toks[pos[0]] == "&":
              pos[0] += 1
              v = v + F()
          return v
      def E():
          v = T()
          while pos[0] < len(toks) and toks[pos[0]] == "#":
              pos[0] += 1
              v = v * T()
          return v
      return E()
  print(evaluate("3 & 2 # 4 & 1"))
answer: 25
explain: & (addition) is deeper in the grammar, so it binds tighter: (3 + 2) × (4 + 1) = 5 × 5 = 25.
```

```quiz
q: The translation scheme E → E + T { print('+') } | T, T → T \* F { print('\*') } | F, F → num { print(num.val) } is applied to `5 * 2 + 3`. What is printed?
- `+ * 5 2 3`
* `5 2 * 3 +`
- `5 2 3 * +`
- `5 * 2 + 3`
explain: The actions print each operator after its operands (postfix). `*` binds tighter, so `5 * 2` is translated first (`5 2 *`), then `+ 3` gives `5 2 * 3 +`.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Every S-attributed definition is also L-attributed
* S-attributed definitions can be evaluated during bottom-up (LR) parsing
- An inherited attribute is always computed from the node's children
* In an L-attributed definition, an inherited attribute may depend on attributes of siblings to its left
explain: S-attributed definitions have no inherited attributes, so they trivially meet the L-attributed condition, and synthesized attributes are computed at each reduction. Attributes computed from children are synthesized; inherited ones come from the parent and siblings (only left siblings in L-attributed definitions).
```

```quiz
q: In the declaration SDD (D → T L, L.inh = T.type, …), what kind of attribute is L.inh?
- Synthesized
* Inherited
- Lexical
- Neither: it is a semantic action
explain: L.inh gets its value from T, a sibling to its left, through the parent production D → T L. Values flowing from the parent or siblings are inherited attributes.
```
