---
title: Introduction to Compilers
chapter: Basics
description: What a compiler does, the phases from lexical analysis to code generation, the symbol table and error handling, front end and back end, and compilers versus interpreters.
---
A **compiler** translates a program written in a **source language** (such as C) into an equivalent program in a **target language** (such as x86 machine code), and reports errors in the source program. The translation is split into **phases**, each transforming one representation of the program into the next.

## The phases

```pipeline
caption: The phases of a compiler
Lexical analysis | characters → tokens
Syntax analysis | tokens → parse tree
Semantic analysis | type checking
Intermediate code | three-address code
Optimization | faster, smaller code
Code generation | target machine code
```

Take the statement `position = initial + rate * 60`:

| Phase | Output for the example |
| --- | --- |
| **Lexical analysis** (scanner) | Tokens: ⟨id, 1⟩ ⟨=⟩ ⟨id, 2⟩ ⟨+⟩ ⟨id, 3⟩ ⟨\*⟩ ⟨num, 60⟩ |
| **Syntax analysis** (parser) | A syntax tree with `=` at the root, `+` below it, and `*` below that |
| **Semantic analysis** | Type checking; rate is a float, so 60 is converted: `inttofloat(60)` |
| **Intermediate code generation** | t1 = inttofloat(60); t2 = id3 \* t1; t3 = id2 + t2; id1 = t3 |
| **Code optimization** | t1 = id3 \* 60.0; id1 = id2 + t1 |
| **Code generation** | LDF R2, id3; MULF R2, R2, #60.0; LDF R1, id2; ADDF R1, R1, R2; STF id1, R1 |

Two components are used by every phase:

- The **symbol table** records every identifier with its attributes (type, scope, storage location, for functions the parameters and return type). It must support fast insertion and lookup, so it is usually a hash table, with one table per scope.
- The **error handler** reports errors with useful messages and tries to recover so that compilation can continue and find more errors.

## Front end and back end

- The **front end** (analysis: lexical, syntax and semantic analysis, intermediate code generation) depends on the **source language**.
- The **back end** (synthesis: optimization and code generation) depends on the **target machine**.

With a common intermediate representation, m source languages and n target machines need m front ends and n back ends instead of m × n complete compilers. This is how GCC and LLVM support many languages and processors.

## Which errors are found where?

| Error | Detected by | Example |
| --- | --- | --- |
| Illegal character, malformed number | Lexical analyser | `int x = 3#4;`, `12.3.4` |
| Missing semicolon, unbalanced parentheses | Parser | `a = (b + c;` |
| Undeclared variable, type mismatch, wrong number of arguments | Semantic analyser | `int x = "hello";` |
| Division by zero, array index out of range, null pointer | At **run time** (in general) | `a[i]` with i = 100 |

## Related tools

| Tool | What it does |
| --- | --- |
| **Interpreter** | Executes the source program statement by statement, without producing a target program. Easier debugging, slower execution |
| **Assembler** | Translates assembly language into machine code |
| **Linker** | Combines object files and libraries, resolving external references |
| **Loader** | Places the executable in memory and starts it |
| **Preprocessor** | Expands macros and includes files before compilation (the C preprocessor) |
| Cross-compiler | Runs on one machine and produces code for another |

Java uses both: `javac` compiles to **bytecode**, which the JVM interprets and compiles to machine code at run time (just-in-time compilation).

A compiler may make one **pass** over the source or several. Each pass reads the whole program (or its intermediate form) once; several phases can be combined in one pass.

## Practice questions

```quiz
q: Which phase of a compiler detects the error in `int x = "hello";` (assigning a string to an int)?
- Lexical analysis
- Syntax analysis
* Semantic analysis
- Code generation
explain: The statement has valid tokens and valid syntax (it fits `type id = expression;`), but the types do not match. Type checking is part of semantic analysis.
```

```quiz
q: Which of these errors is detected by the **lexical analyser**?
* An identifier that contains an illegal character such as `#`
- A missing closing parenthesis
- Using an undeclared variable
- Dividing by a variable that turns out to be zero
explain: The scanner cannot form a token from an illegal character. Unbalanced parentheses are a syntax error, undeclared variables a semantic error, and division by zero a run-time error.
```

```quiz
q: A company has compilers for 4 source languages and wants to support 5 target machines. Using a common intermediate representation, how many front ends plus back ends does it need?
answer: 9
verify: 4 + 5
explain: One front end per source language and one back end per target: 4 + 5 = 9, instead of 4 × 5 = 20 separate compilers.
```

```quiz
q: Which statements are **true**? (Select all that apply.)
* The symbol table is used by several phases of the compiler
* The front end of a compiler depends mainly on the source language
- An interpreter produces a target program that is executed later
* Optimization may change the code but must not change what the program computes
explain: Lexical, syntax and semantic analysis and code generation all consult the symbol table. The front end analyses the source language; the back end targets the machine. An interpreter executes the program directly. Optimizations must preserve the program's meaning.
```
