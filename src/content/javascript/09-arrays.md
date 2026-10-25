---
title: Arrays
chapter: Working with Data
description: Add, remove, search and sort items in arrays.
---
An array is an ordered list of values. Arrays in JavaScript can grow and shrink, and can hold values of any type.

```javascript
const fruits = ["mango", "apple"];
fruits.push("banana");        // add to the end
fruits.unshift("guava");      // add to the start
console.log(fruits, fruits.length);

const last = fruits.pop();    // remove from the end
const first = fruits.shift(); // remove from the start
console.log(last, first, fruits);
```
```output
[ 'guava', 'mango', 'apple', 'banana' ] 4
banana guava [ 'mango', 'apple' ]
```

## Finding things

```javascript
const scores = [45, 82, 67, 91, 58];
console.log(scores.includes(91));
console.log(scores.indexOf(67));
console.log(scores.find((s) => s > 80));
console.log(scores.findIndex((s) => s > 80));
console.log(scores.some((s) => s < 50));
console.log(scores.every((s) => s > 40));
```
```output
true
2
82
1
true
true
```

## slice and splice

`slice` copies part of an array without changing it. `splice` changes the array in place: it can remove items and insert new ones.

```javascript
const letters = ["a", "b", "c", "d", "e"];
console.log(letters.slice(1, 3));
console.log(letters);

const removed = letters.splice(1, 2, "X", "Y", "Z");
console.log(removed);
console.log(letters);
```
```output
[ 'b', 'c' ]
[ 'a', 'b', 'c', 'd', 'e' ]
[ 'b', 'c' ]
[ 'a', 'X', 'Y', 'Z', 'd', 'e' ]
```

## Sorting

By default `sort` compares items as **strings**, which gives odd results for numbers. Pass a compare function to sort numerically.

```javascript
const nums = [10, 9, 100, 1];
console.log([...nums].sort());
console.log([...nums].sort((a, b) => a - b));
console.log([...nums].sort((a, b) => b - a));

const people = [
  { name: "Ravi", age: 30 },
  { name: "Asha", age: 24 },
];
people.sort((p, q) => p.age - q.age);
console.log(people.map((p) => p.name));
```
```output
[ 1, 10, 100, 9 ]
[ 1, 9, 10, 100 ]
[ 100, 10, 9, 1 ]
[ 'Asha', 'Ravi' ]
```

`[...nums]` makes a copy first, because `sort` changes the array it is called on.
