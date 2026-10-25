---
title: Scope and Closures
chapter: Functions
description: Understand where variables are visible and how functions remember their surroundings.
---
**Scope** decides where a variable can be used. Variables declared with `let` and `const` are **block scoped**: they exist only inside the nearest pair of curly braces.

```javascript
const site = "CodeShala";     // global: visible everywhere below

function show() {
  const message = "inside the function";
  console.log(site, "-", message);
}
show();

if (true) {
  let blockOnly = 42;
  console.log(blockOnly);
}
console.log(typeof blockOnly);   // not defined out here
```
```output
CodeShala - inside the function
42
undefined
```

## Shadowing

A variable in an inner scope can have the same name as one outside. Inside, the inner one wins; outside, nothing changes.

```javascript
let level = "outer";
function test() {
  let level = "inner";
  console.log(level);
}
test();
console.log(level);
```
```output
inner
outer
```

## Closures

A function remembers the variables that were in scope when it was created, even after the outer function has finished. This combination is called a **closure**.

```javascript
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counterA = makeCounter();
const counterB = makeCounter();
console.log(counterA(), counterA(), counterA());
console.log(counterB());
```
```output
1 2 3
1
```

Each call to `makeCounter` creates a fresh `count`. Nobody outside can change it directly: closures give you private state.

## A practical closure

```javascript
function makeMultiplier(factor) {
  return (n) => n * factor;
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);
console.log(double(7), triple(7));
console.log([1, 2, 3].map(triple));
```
```output
14 21
[ 3, 6, 9 ]
```

> **Warning:** Avoid `var` in new code. It is function scoped instead of block scoped, which causes classic bugs, especially in loops with callbacks.
