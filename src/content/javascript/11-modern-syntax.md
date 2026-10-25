---
title: Destructuring and Spread
chapter: Working with Data
description: Unpack values, merge objects and handle missing data with modern syntax.
---
Modern JavaScript has several short forms that make everyday code much cleaner. You will see them in almost every codebase.

## Destructuring arrays

Destructuring pulls values out of an array into separate variables in one line.

```javascript
const rgb = [255, 140, 0];
const [red, green, blue] = rgb;
console.log(red, green, blue);

const [first, ...others] = [10, 20, 30, 40];
console.log(first, others);

let x = 1, y = 2;
[x, y] = [y, x];          // swap
console.log(x, y);
```
```output
255 140 0
10 [ 20, 30, 40 ]
2 1
```

## Destructuring objects

With objects, you pick values by key name. You can rename them and give defaults.

```javascript
const user = { name: "Meera", city: "Kochi", role: "admin" };

const { name, city } = user;
console.log(name, city);

const { role: position, age = 18 } = user;
console.log(position, age);

function greet({ name, city }) {
  return `Hi ${name} from ${city}`;
}
console.log(greet(user));
```
```output
Meera Kochi
admin 18
Hi Meera from Kochi
```

## The spread operator

`...` spreads the items of an array, or the keys of an object, into a new one.

```javascript
const veg = ["carrot", "pea"];
const fruit = ["apple"];
const basket = [...veg, ...fruit, "rice"];
console.log(basket);

const defaults = { theme: "light", fontSize: 16 };
const choices = { theme: "dark" };
const settings = { ...defaults, ...choices };
console.log(settings);

console.log(Math.max(...[4, 9, 2]));
```
```output
[ 'carrot', 'pea', 'apple', 'rice' ]
{ theme: 'dark', fontSize: 16 }
9
```

Later keys overwrite earlier ones, which is why `theme` ends up `'dark'`.

## Rest parameters

In a function's parameter list, `...` collects any number of arguments into an array.

```javascript
function average(...nums) {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}
console.log(average(2, 4, 6));
console.log(average(10, 20));
```
```output
4
15
```

## Optional chaining

`?.` reads a property only if the thing before it is not `null` or `undefined`; otherwise it gives `undefined` instead of throwing an error.

```javascript
const order = { id: 7, customer: { name: "Dev" } };
const emptyOrder = { id: 8 };

console.log(order.customer?.name);
console.log(emptyOrder.customer?.name);
console.log(emptyOrder.customer?.name ?? "unknown");
```
```output
Dev
undefined
unknown
```
