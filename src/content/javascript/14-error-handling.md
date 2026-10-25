---
title: Error Handling
chapter: Advanced JavaScript
description: Catch and throw errors with try, catch and finally.
---
When something goes wrong at run time, JavaScript **throws** an error. If nothing catches it, the script stops. Wrap risky code in `try` and handle the problem in `catch`.

```javascript
const input = '{"name": "Asha", "age": 21';   // missing closing brace

try {
  const data = JSON.parse(input);
  console.log(data.name);
} catch (err) {
  console.log("Could not read the data:", err.name);
}
console.log("Still running");
```
```output
Could not read the data: SyntaxError
Still running
```

## The error object

The caught value usually has a `name` (the kind of error) and a `message` (what happened).

```javascript
try {
  const user = null;
  console.log(user.name);
} catch (err) {
  console.log(err.name);
  console.log(err instanceof TypeError);
}
```
```output
TypeError
true
```

## Throwing your own errors

Use `throw new Error("...")` when your function receives something it cannot handle. `finally` runs whether or not an error happened.

```javascript
function withdraw(balance, amount) {
  if (amount > balance) {
    throw new RangeError(`Cannot withdraw ${amount}, balance is ${balance}`);
  }
  return balance - amount;
}

for (const amount of [200, 900]) {
  try {
    console.log("New balance:", withdraw(500, amount));
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  } finally {
    console.log("  attempted", amount);
  }
}
```
```output
New balance: 300
  attempted 200
RangeError: Cannot withdraw 900, balance is 500
  attempted 900
```

## Custom error classes

Extending `Error` lets you tell your own errors apart from others.

```javascript
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function register(user) {
  if (!user.email.includes("@")) {
    throw new ValidationError("email", "Email looks invalid");
  }
  return "Registered " + user.email;
}

try {
  console.log(register({ email: "dev@example.com" }));
  console.log(register({ email: "dev.example.com" }));
} catch (err) {
  if (err instanceof ValidationError) {
    console.log(`Problem with ${err.field}: ${err.message}`);
  } else {
    throw err;   // not ours: let it continue upwards
  }
}
```
```output
Registered dev@example.com
Problem with email: Email looks invalid
```

> **Tip:** Press **Run** on an example after deleting its `try`/`catch`. You will see the uncaught error printed in red.
