---
title: Variables and Data Types
chapter: Getting Started
description: let, const, and JavaScript's main value types.
---
JavaScript has two everyday keywords for creating variables:

- `const` for values that will not be reassigned. Use this by default.
- `let` for values that will change later.

You may see `var` in older code; it still works but has confusing scoping rules, so modern code avoids it.

```javascript
const course = "JavaScript Basics";
let lessonsDone = 1;
lessonsDone = lessonsDone + 1;

console.log(course, "-", lessonsDone, "lessons done");
```
```output
JavaScript Basics - 2 lessons done
```

## Types of values

The `typeof` operator tells you the type of a value.

```javascript
console.log(typeof "text");
console.log(typeof 42, typeof 3.5);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof { name: "Asha" });
console.log(typeof [1, 2, 3]);
```
```output
string
number number
boolean
undefined
object
object
```

- **string**: text, in single quotes, double quotes or backticks.
- **number**: whole numbers and decimals are the same type.
- **boolean**: `true` or `false`.
- **undefined**: a variable that has not been given a value yet.
- **object**: groups of named values, and also arrays.

## Template literals

Strings written with backticks can contain `${...}` placeholders. Any expression inside is evaluated and inserted.

```javascript
const item = "notebook";
const price = 45;
const qty = 3;
console.log(`${qty} x ${item} = Rs ${price * qty}`);
```
```output
3 x notebook = Rs 135
```

## Arrays and objects

An **array** is an ordered list. An **object** stores values under names called keys.

```javascript
const scores = [72, 88, 95];
const student = { name: "Asha", year: 2, scores };

console.log(scores.length, scores[0]);
console.log(student.name);
console.log(student);
```
```output
3 72
Asha
{ name: 'Asha', year: 2, scores: [ 72, 88, 95 ] }
```

> **Warning:** `const` stops you from reassigning the variable, but the contents of an array or object can still change. `scores.push(60)` works even though `scores` is a `const`.
