---
title: Conditions with if
chapter: Control Flow
description: Make decisions with if, else, comparison operators and the ternary operator.
---
`if` runs a block of code when its condition is true. Add `else if` and `else` to handle the other cases.

```javascript
const hour = 21;

if (hour < 12) {
  console.log("Good morning");
} else if (hour < 18) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}
```
```output
Good evening
```

## Use === for equality

JavaScript has two equality operators. `==` converts types before comparing, which gives surprising results. `===` (strict equality) compares both the value and the type, so prefer it.

```javascript
console.log(5 == "5");
console.log(5 === "5");
console.log(0 == false);
console.log(0 === false);
```
```output
true
false
true
false
```

## Truthy and falsy values

A condition does not have to be a boolean. The values `false`, `0`, `""` (empty string), `null`, `undefined` and `NaN` count as **falsy**; everything else is **truthy**.

```javascript
const username = "";

if (username) {
  console.log(`Welcome back, ${username}!`);
} else {
  console.log("Please log in.");
}
```
```output
Please log in.
```

## Combining conditions

Use `&&` (and), `||` (or) and `!` (not). The ternary operator `condition ? a : b` picks one of two values.

```javascript
const age = 16;
const withParent = true;

const canWatch = age >= 18 || withParent;
console.log(canWatch ? "Enjoy the movie" : "Sorry, adults only");
console.log(!canWatch);
```
```output
Enjoy the movie
false
```
