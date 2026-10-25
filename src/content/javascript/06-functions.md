---
title: Functions
chapter: Functions
description: Declare functions, use arrow functions, default parameters and callbacks.
---
A function is a reusable block of code. You give it inputs (parameters), it does some work, and it can hand back a result with `return`.

```javascript
function bmi(weightKg, heightM) {
  return weightKg / (heightM * heightM);
}

const value = bmi(68, 1.75);
console.log("BMI:", value.toFixed(1));
```
```output
BMI: 22.2
```

## Arrow functions

Arrow functions are a shorter way to write a function. When the body is a single expression, its value is returned automatically.

```javascript
const double = (n) => n * 2;
const greet = (name) => `Hi, ${name}!`;

console.log(double(21));
console.log(greet("Dev"));
```
```output
42
Hi, Dev!
```

## Default parameters

```javascript
function makeTag(text, tag = "p") {
  return `<${tag}>${text}</${tag}>`;
}

console.log(makeTag("Hello"));
console.log(makeTag("Title", "h1"));
```
```output
<p>Hello</p>
<h1>Title</h1>
```

## Functions as values

In JavaScript a function is a value like any other. You can store it in a variable or pass it to another function. A function passed in this way is called a **callback**.

```javascript
function repeat(times, action) {
  for (let i = 1; i <= times; i++) {
    action(i);
  }
}

repeat(3, (n) => console.log(`Step ${n}`));
```
```output
Step 1
Step 2
Step 3
```

## Waiting with setTimeout

`setTimeout` runs a callback later. The rest of the program keeps going in the meantime, which is why "Start" and "End" print before the delayed message.

```javascript
console.log("Start");
setTimeout(() => console.log("Half a second later"), 500);
console.log("End");
```
```output
Start
End
Half a second later
```
