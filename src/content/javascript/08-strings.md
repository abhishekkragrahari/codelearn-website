---
title: Strings
chapter: Working with Data
description: Search, slice, split and transform text.
---
Strings hold text. You can write them with single quotes, double quotes or backticks; backticks also allow `${}` placeholders and line breaks.

```javascript
const lang = "JavaScript";
console.log(lang.length);
console.log(lang[0], lang.at(-1));
console.log(lang.toUpperCase());
console.log(lang.indexOf("Script"));
console.log(lang.includes("java"));   // case sensitive
```
```output
10
J t
JAVASCRIPT
4
false
```

## Extracting parts

`slice(start, end)` returns the characters from `start` up to, but not including, `end`. Negative numbers count from the end.

```javascript
const email = "asha.k@example.com";
const at = email.indexOf("@");
console.log(email.slice(0, at));
console.log(email.slice(at + 1));
console.log(email.slice(-3));
```
```output
asha.k
example.com
com
```

## Cleaning and changing text

String methods never modify the original; they return a new string.

```javascript
const raw = "   hello world   ";
console.log(`[${raw.trim()}]`);
console.log(raw.trim().replace("world", "there"));
console.log("a-b-c".replaceAll("-", "+"));
console.log("7".padStart(3, "0"));
console.log("ha".repeat(3));
```
```output
[hello world]
hello there
a+b+c
007
hahaha
```

## Splitting and joining

```javascript
const sentence = "learn a little every day";
const words = sentence.split(" ");
console.log(words);
console.log(words.length);

const title = words
  .map((w) => w[0].toUpperCase() + w.slice(1))
  .join(" ");
console.log(title);

console.log("racecar".split("").reverse().join(""));
```
```output
[ 'learn', 'a', 'little', 'every', 'day' ]
5
Learn A Little Every Day
racecar
```

> **Tip:** To compare strings without worrying about case, convert both sides first: `a.toLowerCase() === b.toLowerCase()`.
