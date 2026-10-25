---
title: Loops
chapter: Control Flow
description: Repeat code with for, for...of, while and array methods.
---
Loops repeat a block of code. JavaScript offers several kinds; pick the one that reads most clearly.

## The classic for loop

```javascript
for (let i = 1; i <= 5; i++) {
  console.log("*".repeat(i));
}
```
```output
*
**
***
****
*****
```

```flowchart
caption: How the for loop above runs
start: Start
step: let i = 1
while: i <= 5?
  io: Print i stars
  step: i++
end: End
```

## for...of

`for...of` walks through each item of an array (or the characters of a string) without needing an index.

```javascript
const cities = ["Delhi", "Chennai", "Kolkata"];
for (const city of cities) {
  console.log(`${city} has ${city.length} letters`);
}
```
```output
Delhi has 5 letters
Chennai has 7 letters
Kolkata has 7 letters
```

## while

```javascript
let guess = 1;
let attempts = 0;
while (guess * guess < 200) {
  guess++;
  attempts++;
}
console.log(`${guess} is the first number whose square is at least 200`);
console.log("Attempts:", attempts);
```
```output
15 is the first number whose square is at least 200
Attempts: 14
```

> **Tip:** On this site the Run button stops code that runs for more than 5 seconds, so an accidental endless loop will not freeze your browser. Try changing `guess++` to `guess--` to see it.

## Array methods instead of loops

Arrays come with methods that loop for you. `map` transforms every item, `filter` keeps the items that pass a test, and `reduce` combines them into one value.

```javascript
const prices = [120, 45, 300, 80];

const withTax = prices.map((p) => p * 1.05);
const cheap = prices.filter((p) => p < 100);
const total = prices.reduce((sum, p) => sum + p, 0);

console.log(withTax);
console.log(cheap);
console.log("Total:", total);
```
```output
[ 126, 47.25, 315, 84 ]
[ 45, 80 ]
Total: 545
```
