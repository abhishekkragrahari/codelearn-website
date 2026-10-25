---
title: Map and Set
chapter: Working with Data
description: Use Map for key-value data and Set for unique values.
---
Plain objects and arrays cover most needs, but JavaScript also has two specialised collections: `Map` and `Set`.

## Set: unique values

A `Set` stores each value at most once. Adding a value that is already there does nothing.

```javascript
const tags = new Set();
tags.add("js");
tags.add("web");
tags.add("js");
console.log(tags);
console.log(tags.size, tags.has("web"));

tags.delete("web");
console.log(tags);
```
```output
Set(2) { 'js', 'web' }
2 true
Set(1) { 'js' }
```

The fastest way to remove duplicates from an array is to pass it through a `Set`:

```javascript
const visits = [3, 1, 3, 2, 1, 3];
const unique = [...new Set(visits)];
console.log(unique);
```
```output
[ 3, 1, 2 ]
```

## Map: key-value pairs

A `Map` is like an object, but any value can be a key (not only strings), it remembers insertion order, and it has a handy `size`.

```javascript
const prices = new Map();
prices.set("tea", 15);
prices.set("coffee", 25);
prices.set("tea", 18);      // replaces the old value

console.log(prices.get("tea"));
console.log(prices.has("juice"));
console.log(prices.size);
console.log(prices);

for (const [item, price] of prices) {
  console.log(`${item}: Rs ${price}`);
}
```
```output
18
false
2
Map(2) { 'tea' => 18, 'coffee' => 25 }
tea: Rs 18
coffee: Rs 25
```

## Counting with a Map

```javascript
const text = "the cat and the hat and the bat";
const counts = new Map();
for (const word of text.split(" ")) {
  counts.set(word, (counts.get(word) ?? 0) + 1);
}
console.log(counts.get("the"), counts.get("and"), counts.get("cat"));

const sorted = [...counts].sort((a, b) => b[1] - a[1]);
console.log(sorted[0]);
```
```output
3 2 1
[ 'the', 3 ]
```

> **Tip:** Use a plain object for fixed records with known keys, such as a user profile. Use a `Map` when keys are added and removed dynamically, or when keys are not strings.
