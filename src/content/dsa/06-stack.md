---
title: Stacks
chapter: Linear Data Structures
description: Last in, first out. Function calls, undo, bracket matching and postfix evaluation.
---
A **stack** is a collection where the last item added is the first one removed: **LIFO** (last in, first out). Think of a pile of plates: you put plates on top and take them from the top.

| Operation | Meaning | Time |
| --- | --- | --- |
| `push(x)` | put x on top | O(1) |
| `pop()` | remove and return the top item | O(1) |
| `peek()` | look at the top item without removing it | O(1) |
| `isEmpty()` | is the stack empty? | O(1) |

```pipeline
caption: push(1), push(2), push(3), then pop() returns 3
push(1) | [1]
push(2) | [1, 2]
push(3) | [1, 2, 3]
pop() → 3 | [1, 2]
```

Stacks are everywhere: the **call stack** keeps track of function calls (that is why deep recursion causes a "stack overflow"), editors use one for **undo**, and compilers use them to check brackets and evaluate expressions.

## An array-based stack

```java
public class Main {
    public static void main(String[] args) {
        Stack s = new Stack(4);
        s.push(1);
        s.push(2);
        s.push(3);
        System.out.println("peek: " + s.peek());
        System.out.println("pop: " + s.pop());
        System.out.println("pop: " + s.pop());
        System.out.println("size: " + s.size());
        s.pop();
        try {
            s.pop();
        } catch (IllegalStateException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

class Stack {
    private final int[] data;
    private int top = -1;              // index of the top item, -1 when empty

    Stack(int capacity) { data = new int[capacity]; }

    void push(int x) {
        if (top == data.length - 1) throw new IllegalStateException("stack overflow");
        data[++top] = x;
    }

    int pop() {
        if (top == -1) throw new IllegalStateException("stack underflow");
        return data[top--];
    }

    int peek() { return data[top]; }
    int size() { return top + 1; }
}
```
```output
peek: 3
pop: 3
pop: 2
size: 1
Error: stack underflow
```
```python
class Stack:
    def __init__(self):
        self.items = []

    def push(self, x):
        self.items.append(x)            # the end of the list is the top

    def pop(self):
        if not self.items:
            raise IndexError("stack underflow")
        return self.items.pop()

    def peek(self):
        return self.items[-1]

    def __len__(self):
        return len(self.items)

s = Stack()
s.push(1)
s.push(2)
s.push(3)
print("peek:", s.peek())
print("pop:", s.pop())
print("pop:", s.pop())
print("size:", len(s))
s.pop()
try:
    s.pop()
except IndexError as e:
    print("Error:", e)
```
```output
peek: 3
pop: 3
pop: 2
size: 1
Error: stack underflow
```

## Checking balanced brackets

Push every opening bracket. For every closing bracket, the top of the stack must be the matching opener. At the end the stack must be empty.

```flowchart
caption: Checking one character of the expression
start: Read next character c
if: c is an opening bracket?
  yes:
    step: push(c)
  no:
    if: c is a closing bracket?
      yes:
        step: pop and compare with c
end: Next character (at the end, the stack must be empty)
```

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    static boolean balanced(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else if (c == ')' || c == ']' || c == '}') {
                if (stack.isEmpty()) return false;
                char open = stack.pop();
                if ((c == ')' && open != '(') || (c == ']' && open != '[') || (c == '}' && open != '{')) return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        for (String s : new String[]{"{a[b(c)]}", "(a+b))", "([)]", "((x)"}) {
            System.out.println(s + " -> " + balanced(s));
        }
    }
}
```
```output
{a[b(c)]} -> true
(a+b)) -> false
([)] -> false
((x) -> false
```
```python
def balanced(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for c in s:
        if c in "([{":
            stack.append(c)
        elif c in pairs:
            if not stack or stack.pop() != pairs[c]:
                return False
    return not stack

for s in ["{a[b(c)]}", "(a+b))", "([)]", "((x)"]:
    print(s, "->", balanced(s))
```
```output
{a[b(c)]} -> True
(a+b)) -> False
([)] -> False
((x) -> False
```

## Evaluating postfix expressions

In **postfix** (Reverse Polish) notation the operator comes after its operands: `3 4 +` means 3 + 4, and `5 1 2 + 4 * + 3 -` means 5 + (1 + 2) × 4 − 3. Postfix needs no brackets, and a stack evaluates it in one pass: push numbers; on an operator, pop two values, apply it, and push the result.

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    static int evalPostfix(String expr) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (String tok : expr.split(" ")) {
            switch (tok) {
                case "+", "-", "*", "/" -> {
                    int b = stack.pop(), a = stack.pop();     // note the order
                    stack.push(switch (tok) {
                        case "+" -> a + b;
                        case "-" -> a - b;
                        case "*" -> a * b;
                        default -> a / b;
                    });
                }
                default -> stack.push(Integer.parseInt(tok));
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        System.out.println(evalPostfix("3 4 +"));
        System.out.println(evalPostfix("5 1 2 + 4 * + 3 -"));
        System.out.println(evalPostfix("8 2 3 * - 4 2 / +"));
    }
}
```
```output
7
14
4
```
```python
def eval_postfix(expr):
    stack = []
    for tok in expr.split():
        if tok in "+-*/":
            b, a = stack.pop(), stack.pop()        # note the order
            stack.append({"+": a + b, "-": a - b, "*": a * b, "/": a // b}[tok])
        else:
            stack.append(int(tok))
    return stack.pop()

print(eval_postfix("3 4 +"))
print(eval_postfix("5 1 2 + 4 * + 3 -"))
print(eval_postfix("8 2 3 * - 4 2 / +"))
```
```output
7
14
4
```

## GATE-style practice questions

```quiz
q: The numbers 1, 2, 3, 4 are pushed onto an empty stack **in this order**, and pops may happen at any time in between. Which output sequence is **impossible**?
- 1 2 3 4
- 4 3 2 1
* 3 1 2 4
- 2 1 4 3
explain: To output 3 first, 1 and 2 must already be on the stack with 2 on top. The next pop must then give 2, not 1, so 3 1 2 4 cannot happen. The others are possible, for example 2 1 4 3 is push 1, push 2, pop, pop, push 3, push 4, pop, pop.
```

```quiz
q: What is the value of the postfix expression `9 3 / 4 2 * + 5 -` ? (All operators are binary; / is integer division.)
answer: 6
verify: (9 // 3 + 4 * 2) - 5
explain: 9 3 / gives 3; 4 2 * gives 8; 3 8 + gives 11; 11 5 - gives 6.
```

```quiz
q: A stack is used to check the bracket string `( ( [ ] ) ( ) )`. What is the **maximum** number of items on the stack at any time?
answer: 3
verify: max(__import__('itertools').accumulate(1 if c in '([' else -1 for c in '(([])())'))
explain: After reading `(`, `(`, `[` the stack holds 3 items. `]` and `)` then pop two, `(` pushes one (2 items), and the rest only pop. So the maximum is 3.
```

```quiz
q: Which of the following are typical applications of a stack? (Select all that apply.)
* Managing function calls and recursion
* Undo in a text editor
- Serving print jobs in the order they arrive
* Converting infix expressions to postfix
explain: Function calls, undo and infix-to-postfix conversion all need the most recent item first (LIFO). Print jobs in arrival order need a queue (FIFO).
```
