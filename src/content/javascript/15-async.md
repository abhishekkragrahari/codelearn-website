---
title: Promises and async/await
chapter: Advanced JavaScript
description: Work with tasks that finish later, such as timers and network requests.
---
Some work takes time: waiting for a timer, a file or a server. JavaScript does not stop and wait; it starts the task and keeps running other code. A **Promise** represents a value that will be ready later.

## Callbacks and timers

```javascript
console.log("Order placed");
setTimeout(() => console.log("Food is ready"), 300);
console.log("Waiting...");
```
```output
Order placed
Waiting...
Food is ready
```

## Creating and using a Promise

A promise is either **resolved** with a value or **rejected** with an error. `.then()` runs when it resolves and `.catch()` when it rejects.

```javascript
function wait(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

wait(200, "done!")
  .then((result) => {
    console.log("First:", result);
    return wait(100, "also done");
  })
  .then((result) => console.log("Second:", result));
```
```output
First: done!
Second: also done
```

## async and await

`async`/`await` lets you write the same thing as if it were ordinary step-by-step code. `await` pauses the async function until the promise settles, without blocking the rest of the page.

```javascript
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function makeTea() {
  console.log("Boiling water...");
  await wait(200);
  console.log("Adding tea leaves...");
  await wait(100);
  return "Tea is ready";
}

const message = await makeTea();
console.log(message);
```
```output
Boiling water...
Adding tea leaves...
Tea is ready
```

> **Note:** Using `await` outside a function, as on the last lines above, works in modules, in browser consoles and in this site's runner. In older scripts, put the code in an `async` function.

## Errors and running tasks in parallel

With `await`, rejected promises become ordinary errors you can catch with `try`/`catch`. `Promise.all` waits for several promises at once.

```javascript
const wait = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

function fetchScore(student) {
  if (student === "unknown") {
    return Promise.reject(new Error("No such student"));
  }
  return wait(100, student.length * 10);
}

try {
  const scores = await Promise.all([fetchScore("Asha"), fetchScore("Ravi"), fetchScore("Meera")]);
  console.log(scores);
  await fetchScore("unknown");
} catch (err) {
  console.log("Failed:", err.message);
}
```
```output
[ 40, 40, 50 ]
Failed: No such student
```

## Fetching data from the web

In a browser, `fetch` downloads data from a URL and returns a promise. This pattern is how web pages load data from servers:

```text
async function loadUser(id) {
  const response = await fetch(`https://example.com/api/users/${id}`);
  if (!response.ok) throw new Error("HTTP " + response.status);
  const user = await response.json();
  console.log(user.name);
}
```
