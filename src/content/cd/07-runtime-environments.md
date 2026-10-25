---
title: Runtime Environments
chapter: Back End
description: How a running program's memory is organised, activation records and the control stack, static versus dynamic scoping, access links, parameter passing (value, reference, value-result, name), and heap management.
---
A compiler must also arrange how the program's data lives in memory while it runs: where variables are stored, how procedures call each other and return, and how names are connected to storage.

## Memory layout

```tree
caption: Typical memory layout of a running program
Process memory
  Code | machine instructions, read-only
  Static data | globals and static variables, fixed size
  Heap | malloc / new, grows upward
  Free space
  Stack | activation records, grows downward
```

- **Static allocation**: the address is fixed at compile time. Used for globals and static locals. (Early Fortran allocated everything statically, which ruled out recursion.)
- **Stack allocation**: each procedure call pushes an **activation record** and each return pops it. This gives recursion and automatic local variables.
- **Heap allocation**: data whose lifetime does not match calls (objects, linked structures), freed explicitly or by a **garbage collector**.

## Activation records

An **activation record** (stack frame) holds everything one call needs:

| Field | Purpose |
| --- | --- |
| Actual parameters | Values (or addresses) passed by the caller |
| Returned value | Space for the result |
| **Control link** (dynamic link) | Points to the **caller's** activation record |
| **Access link** (static link) | Points to the record of the **lexically enclosing** procedure (for nested procedures) |
| Saved machine status | Return address, saved registers |
| Local data | Local variables |
| Temporaries | Values computed during expression evaluation |

The sequence of active calls forms the **control stack**; drawn as a tree over the whole run, the calls form the **activation tree**.

## Static and dynamic scoping

Which declaration does a non-local name refer to?

- **Static (lexical) scoping**: the declaration in the closest **enclosing block in the program text**. Determined at compile time. Used by C, Java, Python.
- **Dynamic scoping**: the most recent declaration **still active at run time**, found by following the chain of callers. Used by early Lisp and some shell languages.

```text
int x = 10;
void show() { print(x); }
void g()    { int x = 20; show(); }
main()      { g(); show(); }
```

The simulator below runs this program under both rules by looking names up either in the global (lexical) scope or along the call chain:

```python
def run(scoping):
    output, call_stack = [], [{"x": 10}]          # bottom frame: globals

    def lookup(name, lexical_env):
        if scoping == "static":
            return lexical_env[name]               # show() is defined at the top level
        for frame in reversed(call_stack):         # dynamic: most recent active binding
            if name in frame:
                return frame[name]

    def show():
        call_stack.append({})
        output.append(lookup("x", call_stack[0]))
        call_stack.pop()

    def g():
        call_stack.append({"x": 20})
        show()
        call_stack.pop()

    g()
    show()
    return output

print("static scoping: ", run("static"))
print("dynamic scoping:", run("dynamic"))
```
```output
static scoping:  [10, 10]
dynamic scoping: [20, 10]
```

Under dynamic scoping, the call to show() from g sees g's local x = 20; under static scoping, show() always sees the global x.

## Parameter passing

| Method | The callee gets | Changes to the parameter |
| --- | --- | --- |
| **Call by value** | A copy of the argument's value | Do not affect the caller |
| **Call by reference** | The argument's **address** | Change the caller's variable immediately |
| **Call by value-result** (copy-in copy-out) | A copy; at return, the final value is **copied back** | Visible to the caller only after the return |
| **Call by name** | The argument **expression itself**, re-evaluated at every use | Behaves like textual substitution (with renaming) |

The methods differ when the argument is an expression with side effects, or when the same variable is reachable in two ways. Consider:

```text
int i = 1;  int A[3] = {10, 20, 30};
void p(int x) { i = i + 1; x = x + 5; }
p(A[i]);
```

```python
def call(method):
    env = {"i": 1, "A": [10, 20, 30]}
    if method == "value":
        x = env["A"][env["i"]]
        env["i"] += 1
        x = x + 5                                  # lost when p returns
    elif method == "reference":
        idx = env["i"]                             # address of A[1] fixed at the call
        env["i"] += 1
        env["A"][idx] = env["A"][idx] + 5
    elif method == "value-result":
        idx = env["i"]                             # copy-out address computed at the call
        x = env["A"][idx]
        env["i"] += 1
        x = x + 5
        env["A"][idx] = x                          # copied back on return
    elif method == "name":
        env["i"] += 1                              # every use of x re-evaluates A[i]
        env["A"][env["i"]] = env["A"][env["i"]] + 5
    return env

for m in ["value", "reference", "value-result", "name"]:
    e = call(m)
    print(f"{m:13} i = {e['i']}, A = {e['A']}")
```
```output
value         i = 2, A = [10, 20, 30]
reference     i = 2, A = [10, 25, 30]
value-result  i = 2, A = [10, 25, 30]
name          i = 2, A = [10, 20, 35]
```

By name, `x` stands for `A[i]` itself, so after i becomes 2 the assignment changes A[2] instead of A[1]. (For value-result, languages differ on whether the copy-back address is computed at the call or at the return; this example computes it at the call.)

## Heap management

The heap is managed by an allocator (`malloc`/`free`) that keeps a list of free blocks and chooses one with **first fit**, **best fit** or similar strategies, the same ideas as contiguous memory allocation in operating systems. Freeing memory too early creates **dangling pointers**; forgetting to free it creates **memory leaks**. **Garbage collection** (reference counting, or mark-and-sweep tracing from the roots) frees unreachable objects automatically.

## Practice questions

```quiz
q: Under **dynamic** scoping, what does this program print? `int x = 1; void f() { print(x); } void g() { int x = 2; f(); } void h() { int x = 3; g(); } main() { h(); f(); }`
code: python
  stack, out = [{"x": 1}], []
  def look(n):
      for fr in reversed(stack):
          if n in fr: return fr[n]
  def f():
      stack.append({}); out.append(look("x")); stack.pop()
  def g():
      stack.append({"x": 2}); f(); stack.pop()
  def h():
      stack.append({"x": 3}); g(); stack.pop()
  h(); f()
  print(" ".join(map(str, out)))
- `1 1`
* `2 1`
- `3 1`
- `2 2`
explain: From main → h → g → f, the most recent active x is g's (2). The second call f() comes directly from main, where only the global x = 1 is active. Under static scoping it would print 1 1.
```

```quiz
q: Using the example in this lesson (i = 1, A = {10, 20, 30}, p(int x) { i = i + 1; x = x + 5; }), what is A[2] after the call p(A[i]) with **call by name**?
answer: 35
verify:
  i, A = 1, [10, 20, 30]
  i += 1
  A[i] = A[i] + 5
  print(A[2])
explain: Call by name re-evaluates A[i] at each use of x. After i = i + 1, i is 2, so x = x + 5 means A[2] = A[2] + 5 = 35.
```

```quiz
q: Which field of an activation record points to the activation record of the **caller**?
* The control (dynamic) link
- The access (static) link
- The return address
- The saved registers
explain: The control link chains each frame to its caller's frame, so the stack can be unwound on return. The access link points to the lexically enclosing procedure's frame and is used for non-local names under static scoping.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* Recursion requires stack (or heap) allocation of activation records
* Under call by reference, assignments to the parameter change the caller's variable immediately
- Static scoping resolves names using the run-time chain of callers
* Garbage collection reclaims heap objects that are no longer reachable
explain: Each recursive call needs its own locals, which static allocation cannot provide. A reference parameter aliases the caller's variable. Static scoping uses the program text; the caller chain is dynamic scoping. Collectors free unreachable objects.
```
