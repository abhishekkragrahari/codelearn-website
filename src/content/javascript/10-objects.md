---
title: Objects
chapter: Working with Data
description: Group related data with key-value pairs and add methods to objects.
---
An **object** groups related values under named keys. Objects are everywhere in JavaScript: settings, data from servers, and even arrays and functions are objects under the hood.

```javascript
const book = {
  title: "Malgudi Days",
  author: "R. K. Narayan",
  year: 1943,
};

console.log(book.title);
console.log(book["author"]);
book.year = 1982;          // change a value
book.pages = 256;          // add a new key
delete book.author;        // remove a key
console.log(book);
```
```output
Malgudi Days
R. K. Narayan
{ title: 'Malgudi Days', year: 1982, pages: 256 }
```

Use square brackets when the key is stored in a variable: `book[keyName]`.

## Methods and this

A function stored in an object is called a **method**. Inside it, `this` refers to the object.

```javascript
const cart = {
  items: [],
  add(name, price) {
    this.items.push({ name, price });
  },
  total() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  },
};

cart.add("Notebook", 60);
cart.add("Pen", 15);
console.log(cart.items.length, cart.total());
```
```output
2 75
```

`{ name, price }` is shorthand for `{ name: name, price: price }`.

## Looping over objects

```javascript
const marks = { maths: 88, science: 92, english: 79 };

for (const subject in marks) {
  console.log(subject, marks[subject]);
}

console.log(Object.keys(marks));
console.log(Object.values(marks));
for (const [subject, score] of Object.entries(marks)) {
  if (score > 85) console.log(`Great in ${subject}!`);
}
```
```output
maths 88
science 92
english 79
[ 'maths', 'science', 'english' ]
[ 88, 92, 79 ]
Great in maths!
Great in science!
```

## Objects are shared by reference

Assigning an object to another variable does not copy it; both names refer to the same object.

```javascript
const a = { score: 1 };
const b = a;
b.score = 99;
console.log(a.score);

const c = { ...a };   // a shallow copy
c.score = 5;
console.log(a.score, c.score);
```
```output
99
99 5
```
