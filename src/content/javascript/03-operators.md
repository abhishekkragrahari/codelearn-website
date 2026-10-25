---
title: Operators
chapter: Getting Started
description: Arithmetic, assignment, comparison and logical operators, plus a few JavaScript surprises.
---
Operators work on values to produce new values. Most of JavaScript's operators behave as you would expect, but the language's automatic type conversion leads to a few surprises worth knowing.

## Arithmetic

```javascript
const a = 17;
const b = 5;
console.log(a + b, a - b, a * b);
console.log(a / b);     // always a decimal division
console.log(a % b);     // remainder
console.log(a ** 2);    // power
console.log(Math.floor(a / b));
```
```output
22 12 85
3.4
2
289
3
```

There is only one number type, so `17 / 5` gives `3.4`. Use `Math.floor` or `Math.trunc` when you want a whole number.

## Assignment shortcuts

```javascript
let score = 10;
score += 5;
score *= 2;
score -= 4;
score++;
console.log(score);
```
```output
27
```

## + with strings

When either side of `+` is a string, JavaScript joins instead of adding. The other operators convert strings to numbers.

```javascript
console.log(1 + 2);
console.log("1" + 2);
console.log(1 + 2 + "3");
console.log("10" - 4);
console.log("5" * "2");
console.log(Number("42") + 1);
```
```output
3
12
33
6
10
43
```

> **Tip:** Convert input to a number explicitly with `Number(value)` before doing maths. Text from forms and prompts is always a string.

## Logical operators

`&&`, `||` and `!` work on booleans, but `&&` and `||` actually return one of their operands. That makes `||` and the newer `??` handy for default values.

```javascript
const isMember = true;
const cartTotal = 1200;
console.log(isMember && cartTotal > 1000);
console.log(!isMember);

const nickname = "";
console.log(nickname || "Guest");   // "" is falsy, so we get the default
console.log(nickname ?? "Guest");   // ?? only replaces null and undefined
console.log(null ?? "Guest");
```
```output
true
false
Guest

Guest
```

The empty line in the output is the empty string `nickname`, printed by the `??` line.
