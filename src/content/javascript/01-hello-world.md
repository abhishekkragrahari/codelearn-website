---
title: Your First JavaScript Program
chapter: Getting Started
description: What JavaScript is, where it runs, and how to print with console.log.
---
JavaScript is the programming language of the web. Every modern browser has a JavaScript engine built in, so you already have everything you need to start. Outside the browser, tools such as Node.js let you run JavaScript on servers and on your own computer.

On this site, every JavaScript example has a **Run** button. Press it and the code runs right here in your browser, safely in the background.

## Hello, world

The simplest way to show something is `console.log()`. It prints its arguments to the **console**, a text panel used by developers.

```javascript
console.log("Hello, world!");
```
```output
Hello, world!
```

> **Tip:** In any browser, press F12 (or Ctrl+Shift+I, or Cmd+Option+I on a Mac) and open the Console tab. You can type JavaScript there and see the result straight away.

## Logging several values

`console.log` accepts any number of values and puts a space between them. Numbers are calculated before they are printed.

```javascript
console.log("Minutes in a day:", 24 * 60);
console.log("Is 10 greater than 3?", 10 > 3);
// This is a comment. JavaScript ignores it.
console.log("Done");
```
```output
Minutes in a day: 1440
Is 10 greater than 3? true
Done
```

## Running JavaScript on your computer

To run a file outside the browser, install Node.js from nodejs.org, save your code as `hello.js`, and run:

```text
node hello.js
```

Try editing the examples above: change the text, press **Run**, and see what happens. Breaking things on purpose is a great way to learn.
